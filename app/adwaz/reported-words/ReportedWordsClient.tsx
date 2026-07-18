"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import VocabReviewClient, { type WordCandidate } from "../vocab-review/VocabReviewClient";

const ACCESS_KEY = "adwaz.vocabReview.access.v1";
const DEFAULT_ADWAZ_API_BASE_URL = "https://adwaz-core-engine-98057750771.us-central1.run.app";

function normalizeApiBase(value: string | undefined) {
  return (value || DEFAULT_ADWAZ_API_BASE_URL).trim().replace(/\/$/, "");
}

export default function ReportedWordsClient() {
  const [passcode, setPasscode] = useState("");
  const [candidates, setCandidates] = useState<WordCandidate[]>([]);
  const [status, setStatus] = useState("Enter the reviewer code to load reported words.");
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiBase = useMemo(
    () =>
      normalizeApiBase(
        process.env.NEXT_PUBLIC_ADWAZ_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
      ),
    [],
  );

  const loadReportedWords = useCallback(async (code: string) => {
    setIsLoading(true);
    setStatus("Loading reported words...");
    try {
      const response = await fetch(`${apiBase}/api/v1/reported-words`, {
        cache: "no-store",
        headers: { "X-Adwaz-Review-Key": code },
      });
      if (!response.ok) throw new Error(`reported words ${response.status}`);
      const data = (await response.json()) as { candidates?: WordCandidate[]; candidate_count?: number };
      const nextCandidates = data.candidates || [];
      setCandidates(nextCandidates);
      setHasAccess(true);
      try {
        window.sessionStorage.setItem(ACCESS_KEY, code);
      } catch {
        // This session can continue even when local storage is unavailable.
      }
      setStatus(
        nextCandidates.length
          ? `Loaded ${nextCandidates.length} reported word${nextCandidates.length === 1 ? "" : "s"}.`
          : "No reported words are waiting for review.",
      );
    } catch {
      setStatus("Could not load reported words. Check the code or API connection.");
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    try {
      const storedCode = window.sessionStorage.getItem(ACCESS_KEY);
      if (storedCode) {
        void loadReportedWords(storedCode);
      }
    } catch {
      // The manual passcode form remains available.
    }
  }, [loadReportedWords]);

  if (!hasAccess) {
    return (
      <section className="page-shell">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="brand-panel w-full rounded-lg p-6 sm:p-8">
            <p className="page-eyebrow">Adwaz reviewer</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[#101426]">
              Reported words
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
              Review words users reported from the editor as valid words that Adwaz should know.
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                void loadReportedWords(passcode.trim());
              }}
            >
              <label className="sr-only" htmlFor="reported-words-code">
                Review passcode
              </label>
              <input
                id="reported-words-code"
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
    <VocabReviewClient
      candidates={candidates}
      title="Reported words"
      description="Private review page for words users reported from the Adwaz editor as valid words that should be known."
      confidenceLabel="reported from editor"
      storageNamespace="reported"
      exportSource="adwaz_editor_unknown_word_reports"
      exportFilenamePrefix="adwaz-reported"
    />
  );
}
