"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ApprovedWordDecision = "approved" | "rejected";

interface ApprovedWordRecord {
  word: string;
  decision: ApprovedWordDecision;
  namespace: string;
  note: string;
  reviewedAt: string;
  revokedAt: string;
  source: string;
  candidate?: {
    count: number;
    confidence: string;
    source: string;
    contexts: string[];
  } | null;
}

const REVIEW_PASSCODE = "5414";
const ACCESS_KEY = "adwaz.vocabReview.access.v1";
const DEFAULT_ADWAZ_API_BASE_URL = "https://adwaz-core-engine-98057750771.us-central1.run.app";

function normalizeApiBase(value: string | undefined) {
  return (value || DEFAULT_ADWAZ_API_BASE_URL).trim().replace(/\/$/, "");
}

function decisionTone(decision: ApprovedWordDecision) {
  if (decision === "approved") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  return "border-rose-200 bg-rose-50 text-rose-800";
}

function formatDate(value: string) {
  if (!value) return "Not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export default function ApprovedWordsClient() {
  const [passcode, setPasscode] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [records, setRecords] = useState<ApprovedWordRecord[]>([]);
  const [status, setStatus] = useState("Enter the reviewer code to load approved words.");
  const [query, setQuery] = useState("");
  const [decisionFilter, setDecisionFilter] = useState<"all" | ApprovedWordDecision>("approved");
  const [revokeWord, setRevokeWord] = useState<ApprovedWordRecord | null>(null);
  const [revokeNote, setRevokeNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const apiBase = useMemo(
    () =>
      normalizeApiBase(
        process.env.NEXT_PUBLIC_ADWAZ_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
      ),
    [],
  );

  const loadApprovedWords = useCallback(async (code: string) => {
    setIsLoading(true);
    setStatus("Loading approved words...");

    try {
      const response = await fetch(
        `${apiBase}/api/v1/approved-words?passcode=${encodeURIComponent(code)}`,
        { cache: "no-store" },
      );
      if (!response.ok) throw new Error(`approved words ${response.status}`);
      const data = (await response.json()) as { words?: ApprovedWordRecord[]; word_count?: number };
      const nextRecords = data.words || [];
      setRecords(nextRecords);
      setHasAccess(true);
      try {
        window.localStorage.setItem(ACCESS_KEY, code);
      } catch {
        // The page can still work for this session.
      }
      setStatus(`Loaded ${nextRecords.length} approved-word record${nextRecords.length === 1 ? "" : "s"}.`);
    } catch {
      setStatus("Could not load approved words. Check the code or API connection.");
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    try {
      const storedCode = window.localStorage.getItem(ACCESS_KEY);
      if (storedCode === REVIEW_PASSCODE) {
        void loadApprovedWords(storedCode);
      }
    } catch {
      // The manual passcode form remains available.
    }
  }, [loadApprovedWords]);

  const approvedCount = records.filter((record) => record.decision === "approved").length;
  const revokedCount = records.filter((record) => record.decision === "rejected").length;

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      if (decisionFilter !== "all" && record.decision !== decisionFilter) return false;
      if (!normalizedQuery) return true;
      return (
        record.word.toLowerCase().includes(normalizedQuery) ||
        record.namespace.toLowerCase().includes(normalizedQuery) ||
        record.note.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [decisionFilter, query, records]);

  const revokeSelectedWord = async () => {
    if (!revokeWord) return;

    setIsRevoking(true);
    setStatus(`Revoking ${revokeWord.word}...`);

    try {
      const code = window.localStorage.getItem(ACCESS_KEY) || REVIEW_PASSCODE;
      const response = await fetch(
        `${apiBase}/api/v1/approved-words/${encodeURIComponent(revokeWord.word)}/revoke`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passcode: code,
            note: revokeNote.trim() || "Revoked from approved-word admin.",
          }),
        },
      );
      if (!response.ok) throw new Error(`revoke ${response.status}`);
      setRevokeWord(null);
      setRevokeNote("");
      await loadApprovedWords(code);
      setStatus("Word revoked. The validator cache can take up to 60 seconds to refresh.");
    } catch {
      setStatus("Could not revoke that word right now.");
    } finally {
      setIsRevoking(false);
    }
  };

  if (!hasAccess) {
    return (
      <section className="page-shell">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="brand-panel w-full rounded-lg p-6 sm:p-8">
            <p className="page-eyebrow">Adwaz admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[#101426]">
              Approved words
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
              Review and revoke words that have been approved into the shared Adwaz validator.
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                void loadApprovedWords(passcode.trim());
              }}
            >
              <label className="sr-only" htmlFor="approved-words-code">
                Review passcode
              </label>
              <input
                id="approved-words-code"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                className="brand-input min-h-12 flex-1 rounded-lg px-4 py-3 text-base"
                placeholder="Review passcode"
                autoComplete="off"
              />
              <button
                type="submit"
                className="rounded-lg brand-button px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Enter"}
              </button>
            </form>
            <p className="mt-3 text-sm font-medium text-[var(--brand-muted)]">{status}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-[var(--brand-border)] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="page-eyebrow">Adwaz admin</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal text-[#101426]">
              Approved words
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--brand-muted)]">
              Approved words are available to the validator through Firestore. Revoked words override other validator sources after the short cache refresh.
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--brand-muted)]">{status}</p>
          </div>
          <button
            type="button"
            onClick={() => void loadApprovedWords(window.localStorage.getItem(ACCESS_KEY) || REVIEW_PASSCODE)}
            className="rounded-lg brand-button px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Refreshing" : "Refresh"}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="brand-panel rounded-lg p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">Approved</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-700">{approvedCount}</p>
          </div>
          <div className="brand-panel rounded-lg p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">Revoked</p>
            <p className="mt-2 text-3xl font-semibold text-rose-700">{revokedCount}</p>
          </div>
          <div className="brand-panel rounded-lg p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">Visible</p>
            <p className="mt-2 text-3xl font-semibold text-[#101426]">{filteredRecords.length}</p>
          </div>
        </div>

        <div className="brand-panel rounded-lg p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_14rem]">
            <label className="sr-only" htmlFor="approved-word-search">
              Search approved words
            </label>
            <input
              id="approved-word-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="brand-input min-h-11 rounded-lg px-3 py-2 text-sm"
              placeholder="Search word, source, or note"
            />
            <label className="sr-only" htmlFor="approved-word-filter">
              Filter approved words
            </label>
            <select
              id="approved-word-filter"
              value={decisionFilter}
              onChange={(event) => setDecisionFilter(event.target.value as "all" | ApprovedWordDecision)}
              className="brand-input min-h-11 rounded-lg px-3 py-2 text-sm"
            >
              <option value="approved">Approved only</option>
              <option value="rejected">Revoked only</option>
              <option value="all">All records</option>
            </select>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-[var(--brand-border)]">
            <div className="grid grid-cols-[minmax(9rem,1fr)_8rem_9rem_8rem] gap-3 bg-slate-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand-muted)]">
              <span>Word</span>
              <span>Status</span>
              <span>Source</span>
              <span>Action</span>
            </div>
            <div className="divide-y divide-[var(--brand-border)]">
              {filteredRecords.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-[var(--brand-muted)]">
                  No records match this filter.
                </p>
              ) : (
                filteredRecords.map((record) => (
                  <div
                    key={`${record.word}-${record.decision}`}
                    className="grid grid-cols-[minmax(9rem,1fr)_8rem_9rem_8rem] items-start gap-3 px-3 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-[#101426]">{record.word}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--brand-muted)]">
                        {record.decision === "approved"
                          ? `Reviewed ${formatDate(record.reviewedAt)}`
                          : `Revoked ${formatDate(record.revokedAt)}`}
                      </p>
                      {record.note ? (
                        <p className="mt-1 text-xs leading-5 text-[var(--brand-muted)]">{record.note}</p>
                      ) : null}
                    </div>
                    <span className={`w-fit rounded-full border px-2 py-1 text-xs font-bold uppercase ${decisionTone(record.decision)}`}>
                      {record.decision === "approved" ? "approved" : "revoked"}
                    </span>
                    <div className="text-xs leading-5 text-[var(--brand-muted)]">
                      <p className="font-semibold text-[#101426]">{record.namespace || "unknown"}</p>
                      <p>{record.candidate?.source?.replaceAll("_", " ") || record.source || "manual"}</p>
                    </div>
                    <div>
                      {record.decision === "approved" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setRevokeWord(record);
                            setRevokeNote("");
                          }}
                          className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700"
                        >
                          Revoke
                        </button>
                      ) : (
                        <span className="text-xs text-[var(--brand-muted)]">No action</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {revokeWord ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="brand-panel w-full max-w-lg rounded-lg p-5 shadow-xl">
            <p className="page-eyebrow">Revoke approved word</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#101426]">{revokeWord.word}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
              Revoking this word removes it from the shared validator after the cache refresh. It also overrides static validator sources.
            </p>
            <label className="mt-4 block text-sm font-semibold text-[#101426]" htmlFor="revoke-note">
              Reason
            </label>
            <textarea
              id="revoke-note"
              value={revokeNote}
              onChange={(event) => setRevokeNote(event.target.value.slice(0, 500))}
              className="brand-input mt-2 min-h-24 w-full resize-y rounded-lg px-3 py-2 text-sm leading-6"
              placeholder="Why should this word be revoked?"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={revokeSelectedWord}
                disabled={isRevoking}
                className="rounded-lg bg-rose-700 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRevoking ? "Revoking" : "Revoke word"}
              </button>
              <button
                type="button"
                onClick={() => setRevokeWord(null)}
                className="rounded-lg border border-[var(--brand-border)] bg-white px-4 py-3 text-sm font-semibold text-[#101426]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
