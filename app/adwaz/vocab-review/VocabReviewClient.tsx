"use client";

import { useEffect, useMemo, useState } from "react";

type ReviewDecision = "approved" | "rejected" | "skipped";

export interface WordCandidate {
  word: string;
  count: number;
  confidence: string;
  confidenceScore: number;
  source: string;
  preferredVariant: string;
  contexts: string[];
}

interface DecisionRecord {
  word: string;
  decision: ReviewDecision;
  note: string;
  reviewedAt: string;
  candidate: WordCandidate;
}

interface VocabReviewClientProps {
  candidates: WordCandidate[];
  title: string;
  description: string;
  confidenceLabel: string;
  storageNamespace: string;
  exportSource: string;
  exportFilenamePrefix: string;
}

const ACCESS_KEY = "adwaz.vocabReview.access.v1";
const DEFAULT_ADWAZ_API_BASE_URL = "https://adwaz-core-engine-98057750771.us-central1.run.app";

function normalizeApiBase(value: string | undefined) {
  return (value || DEFAULT_ADWAZ_API_BASE_URL).trim().replace(/\/$/, "");
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function decisionTone(decision?: ReviewDecision) {
  if (decision === "approved") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (decision === "rejected") return "border-rose-200 bg-rose-50 text-rose-800";
  if (decision === "skipped") return "border-slate-200 bg-slate-50 text-slate-700";
  return "border-[var(--brand-border)] bg-white text-[#101426]";
}

function parseDecisionCache(raw: string | null): Record<string, DecisionRecord> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, DecisionRecord>;
    }
  } catch {
    return {};
  }
  return {};
}

export default function VocabReviewClient({
  candidates,
  title,
  description,
  confidenceLabel,
  storageNamespace,
  exportSource,
  exportFilenamePrefix,
}: VocabReviewClientProps) {
  const [passcode, setPasscode] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [accessError, setAccessError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [note, setNote] = useState("");
  const [decisions, setDecisions] = useState<Record<string, DecisionRecord>>({});
  const [syncStatus, setSyncStatus] = useState("");
  const decisionsKey = `adwaz.vocabReview.${storageNamespace}.decisions.v1`;
  const apiBase = useMemo(
    () =>
      normalizeApiBase(
        process.env.NEXT_PUBLIC_ADWAZ_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
      ),
    [],
  );

  useEffect(() => {
    const uploadMissingLocalDecisions = async (
      code: string,
      sharedDecisions: Record<string, DecisionRecord>,
      cachedDecisions: Record<string, DecisionRecord>,
    ) => {
      const missingRecords = Object.values(cachedDecisions).filter(
        (record) => !sharedDecisions[record.word],
      );
      if (missingRecords.length === 0) return;

      await Promise.allSettled(
        missingRecords.map((record) =>
          fetch(`${apiBase}/api/v1/vocab-review/${storageNamespace}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Adwaz-Review-Key": code,
            },
            body: JSON.stringify({
              namespace: storageNamespace,
              record,
            }),
          }),
        ),
      );
    };

    const loadSharedDecisions = async (
      code: string,
      cachedDecisions: Record<string, DecisionRecord>,
    ) => {
      try {
        const response = await fetch(`${apiBase}/api/v1/vocab-review/${storageNamespace}`, {
          cache: "no-store",
          headers: { "X-Adwaz-Review-Key": code },
        });
        if (!response.ok) throw new Error(`review state ${response.status}`);
        const data = (await response.json()) as { decisions?: Record<string, DecisionRecord> };
        const sharedDecisions = data.decisions || {};
        const mergedDecisions = { ...sharedDecisions, ...cachedDecisions };
        if (data.decisions) {
          setDecisions(mergedDecisions);
          try {
            window.localStorage.setItem(decisionsKey, JSON.stringify(mergedDecisions));
          } catch {
            // Shared state still loaded; local cache is optional.
          }
        }
        await uploadMissingLocalDecisions(code, sharedDecisions, cachedDecisions);
        setSyncStatus("Review progress is synced across browsers.");
      } catch {
        setSyncStatus("Could not sync shared review progress. Using this browser's saved copy.");
      }
    };

    try {
      const storedCode = window.sessionStorage.getItem(ACCESS_KEY);
      const storedAccess = Boolean(storedCode);
      setHasAccess(storedAccess);
      const cachedDecisions = parseDecisionCache(window.localStorage.getItem(decisionsKey));
      setDecisions(cachedDecisions);
      if (storedAccess && storedCode) {
        void loadSharedDecisions(storedCode, cachedDecisions);
      }
    } catch {
      setHasAccess(false);
    }
  }, [apiBase, decisionsKey, storageNamespace]);

  const activeCandidate = candidates[activeIndex];
  const activeDecision = activeCandidate ? decisions[activeCandidate.word] : undefined;
  const approvedCount = Object.values(decisions).filter(
    (item) => item.decision === "approved",
  ).length;
  const rejectedCount = Object.values(decisions).filter(
    (item) => item.decision === "rejected",
  ).length;
  const skippedCount = Object.values(decisions).filter(
    (item) => item.decision === "skipped",
  ).length;
  const reviewedCount = Object.keys(decisions).length;

  const nextUnreviewedIndex = useMemo(() => {
    return candidates.findIndex((candidate) => !decisions[candidate.word]);
  }, [candidates, decisions]);

  const unlock = async () => {
    const code = passcode.trim();
    if (!code) {
      setAccessError("That review code is not active.");
      return;
    }

    setAccessError("");
    setSyncStatus("Loading shared review progress...");

    try {
      const cachedDecisions = parseDecisionCache(window.localStorage.getItem(decisionsKey));
      const response = await fetch(`${apiBase}/api/v1/vocab-review/${storageNamespace}`, {
        cache: "no-store",
        headers: { "X-Adwaz-Review-Key": code },
      });
      if (!response.ok) throw new Error(`review state ${response.status}`);
      try {
        window.sessionStorage.setItem(ACCESS_KEY, code);
      } catch {
        // Access can still work for this tab if session storage is unavailable.
      }
      setHasAccess(true);
      const data = (await response.json()) as { decisions?: Record<string, DecisionRecord> };
      const sharedDecisions = data.decisions || {};
      const mergedDecisions = { ...sharedDecisions, ...cachedDecisions };
      setDecisions(mergedDecisions);
      try {
        window.localStorage.setItem(decisionsKey, JSON.stringify(mergedDecisions));
      } catch {
        // Local cache is optional.
      }
      await Promise.allSettled(
        Object.values(cachedDecisions)
          .filter((record) => !sharedDecisions[record.word])
          .map((record) =>
            fetch(`${apiBase}/api/v1/vocab-review/${storageNamespace}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Adwaz-Review-Key": code,
              },
              body: JSON.stringify({
                namespace: storageNamespace,
                record,
              }),
            }),
          ),
      );
      setSyncStatus("Review progress is synced across browsers.");
    } catch {
      setHasAccess(false);
      setAccessError("That review code is not active.");
      setSyncStatus("Could not sync shared review progress. Using this browser's saved copy.");
    }
  };

  const saveDecision = async (decision: ReviewDecision) => {
    if (!activeCandidate) return;

    const record: DecisionRecord = {
      word: activeCandidate.word,
      decision,
      note: note.trim(),
      reviewedAt: new Date().toISOString(),
      candidate: activeCandidate,
    };

    setDecisions((current) => {
      const next = { ...current, [activeCandidate.word]: record };
      try {
        window.localStorage.setItem(decisionsKey, JSON.stringify(next));
      } catch {
        // The in-memory state still keeps this session usable.
      }
      return next;
    });

    try {
      const code = window.sessionStorage.getItem(ACCESS_KEY) || "";
      const response = await fetch(`${apiBase}/api/v1/vocab-review/${storageNamespace}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Adwaz-Review-Key": code,
        },
        body: JSON.stringify({
          namespace: storageNamespace,
          record,
        }),
      });
      if (!response.ok) throw new Error(`review save ${response.status}`);
      const data = (await response.json()) as { decisions?: Record<string, DecisionRecord> };
      if (data.decisions) {
        setDecisions(data.decisions);
        try {
          window.localStorage.setItem(decisionsKey, JSON.stringify(data.decisions));
        } catch {
          // Local cache is optional.
        }
      }
      setSyncStatus("Saved to shared review progress.");
    } catch {
      setSyncStatus("Saved in this browser only. Shared sync failed.");
    }

    setNote("");
    setActiveIndex((current) => Math.min(current + 1, candidates.length - 1));
  };

  const goToCandidate = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, candidates.length - 1)));
    const candidate = candidates[index];
    setNote(candidate ? decisions[candidate.word]?.note || "" : "");
  };

  const exportDecisions = () => {
    const records = Object.values(decisions).sort((a, b) => a.word.localeCompare(b.word));
    downloadJson(`${exportFilenamePrefix}-vocabulary-review.json`, {
      source: exportSource,
      exportedAt: new Date().toISOString(),
      totalCandidates: candidates.length,
      reviewedCount: records.length,
      approvedCount,
      rejectedCount,
      skippedCount,
      records,
    });
  };

  const exportApprovedWords = () => {
    const approvedWords = Object.values(decisions)
      .filter((item) => item.decision === "approved")
      .map((item) => item.word)
      .sort((a, b) => a.localeCompare(b));

    downloadJson(`${exportFilenamePrefix}-approved-words.json`, {
      source: exportSource,
      exportedAt: new Date().toISOString(),
      words: approvedWords,
    });
  };

  const resetReview = async () => {
    setDecisions({});
    setNote("");
    setActiveIndex(0);
    try {
      window.localStorage.removeItem(decisionsKey);
    } catch {
      // Ignore storage cleanup failures.
    }

    try {
      const code = window.sessionStorage.getItem(ACCESS_KEY) || "";
      const response = await fetch(`${apiBase}/api/v1/vocab-review/${storageNamespace}`, {
        method: "DELETE",
        headers: { "X-Adwaz-Review-Key": code },
      });
      if (!response.ok) throw new Error(`review reset ${response.status}`);
      setSyncStatus("Shared review progress reset.");
    } catch {
      setSyncStatus("Reset this browser only. Shared reset failed.");
    }
  };

  if (!hasAccess) {
    return (
      <section className="page-shell">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="brand-panel w-full rounded-lg p-6 sm:p-8">
            <p className="page-eyebrow">Adwaz reviewer</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[#101426]">
              Vocabulary review
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
              {description}
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                unlock();
              }}
            >
              <label className="sr-only" htmlFor="vocab-review-code">
                Review passcode
              </label>
              <input
                id="vocab-review-code"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                className="brand-input min-h-12 flex-1 rounded-lg px-4 py-3 text-base"
                placeholder="Review passcode"
                autoComplete="off"
              />
              <button type="submit" className="rounded-lg brand-button px-5 py-3 text-sm font-semibold">
                Enter
              </button>
            </form>
            {accessError ? (
              <p className="mt-3 text-sm font-medium text-rose-700">{accessError}</p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border-b border-[var(--brand-border)] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="page-eyebrow">Adwaz reviewer</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal text-[#101426]">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--brand-muted)]">
              {description} Decisions are saved to shared reviewer progress when the API is reachable.
            </p>
            {syncStatus ? (
              <p className="mt-2 text-xs font-semibold text-[var(--brand-muted)]">{syncStatus}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportDecisions}
              className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
            >
              Export decisions
            </button>
            <button
              type="button"
              onClick={exportApprovedWords}
              className="rounded-lg brand-button px-3 py-2 text-sm font-semibold"
            >
              Export approved
            </button>
            <button
              type="button"
              onClick={resetReview}
              className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <main className="brand-panel rounded-lg p-5">
            {activeCandidate ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
                      Candidate {activeIndex + 1} of {candidates.length}
                    </p>
                    <h2 className="mt-3 text-5xl font-semibold tracking-normal text-[#101426]">
                      {activeCandidate.word}
                    </h2>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${decisionTone(
                      activeDecision?.decision,
                    )}`}
                  >
                    {activeDecision?.decision || "unreviewed"}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-[var(--brand-border)] bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
                      Count
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-[#101426]">
                      {activeCandidate.count}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[var(--brand-border)] bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
                      Confidence
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-[#101426]">
                      {Math.round(activeCandidate.confidenceScore * 100)}%
                    </p>
                    <p className="mt-1 text-xs font-medium text-[var(--brand-muted)]">
                      {confidenceLabel}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[var(--brand-border)] bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
                      Source
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#101426]">
                      {activeCandidate.source.replaceAll("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold text-[#101426]">Context</p>
                  {activeCandidate.contexts.map((context) => (
                    <p
                      key={context}
                      className="rounded-lg border border-[var(--brand-border)] bg-white px-4 py-3 text-sm leading-7 text-[var(--brand-muted)]"
                    >
                      {context}
                    </p>
                  ))}
                </div>

                <label className="mt-5 block text-sm font-semibold text-[#101426]" htmlFor="review-note">
                  Reviewer note
                </label>
                <textarea
                  id="review-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value.slice(0, 500))}
                  className="brand-input mt-2 min-h-24 w-full resize-y rounded-lg px-3 py-2 text-sm leading-6"
                  placeholder="Optional: proper noun, medical term, reject reason, alternate spelling..."
                />

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => saveDecision("approved")}
                    className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    Yes, approve
                  </button>
                  <button
                    type="button"
                    onClick={() => saveDecision("rejected")}
                    className="rounded-lg bg-rose-700 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800"
                  >
                    No, reject
                  </button>
                  <button
                    type="button"
                    onClick={() => saveDecision("skipped")}
                    className="rounded-lg border border-[var(--brand-border)] bg-white px-4 py-3 text-sm font-semibold text-[#101426]"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={() => goToCandidate(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    className="rounded-lg border border-[var(--brand-border)] bg-white px-4 py-3 text-sm font-semibold text-[#101426] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => goToCandidate(activeIndex + 1)}
                    disabled={activeIndex === candidates.length - 1}
                    className="rounded-lg border border-[var(--brand-border)] bg-white px-4 py-3 text-sm font-semibold text-[#101426] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : null}
          </main>

          <aside className="brand-panel rounded-lg p-4">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
              Progress
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex justify-between">
                <span className="text-[var(--brand-muted)]">Reviewed</span>
                <span className="font-semibold text-[#101426]">
                  {reviewedCount} / {candidates.length}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-[var(--brand-muted)]">Approved</span>
                <span className="font-semibold text-emerald-700">{approvedCount}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[var(--brand-muted)]">Rejected</span>
                <span className="font-semibold text-rose-700">{rejectedCount}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[var(--brand-muted)]">Skipped</span>
                <span className="font-semibold text-slate-700">{skippedCount}</span>
              </p>
            </div>

            {nextUnreviewedIndex >= 0 ? (
              <button
                type="button"
                onClick={() => goToCandidate(nextUnreviewedIndex)}
                className="mt-5 w-full rounded-lg brand-button px-3 py-2 text-sm font-semibold"
              >
                Next unreviewed
              </button>
            ) : (
              <p className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
                Review complete.
              </p>
            )}

            <div className="mt-5 max-h-[28rem] overflow-auto rounded-lg border border-[var(--brand-border)] bg-slate-50 p-2">
              {candidates.map((candidate, index) => (
                <button
                  key={candidate.word}
                  type="button"
                  onClick={() => goToCandidate(index)}
                  className={`mb-2 flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm ${decisionTone(
                    decisions[candidate.word]?.decision,
                  )} ${index === activeIndex ? "ring-2 ring-[var(--brand-blue)]" : ""}`}
                >
                  <span className="font-semibold">{candidate.word}</span>
                  <span className="text-xs">{candidate.count}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
