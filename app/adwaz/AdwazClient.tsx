"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import mammoth from "mammoth";

interface CorrectionIssue {
  id: string;
  original: string;
  replacement: string;
  index: number;
  length: number;
  category: string;
  message: string;
  explanation: string;
  confidence?: number;
  source?: string;
  severity?: string;
  rule_id?: string;
}

interface VerificationResult {
  input_text: string;
  corrected_text: string;
  issues: CorrectionIssue[];
  issue_count?: number;
  returned_issue_count?: number;
  issue_limit_reached?: boolean;
}

type FeedbackType =
  | "wrong_correction"
  | "missing_correction"
  | "unknown_word_should_be_known"
  | "general";

type FeedbackReason =
  | "wrong_replacement"
  | "valid_original"
  | "missed_error"
  | "unclear_explanation"
  | "context_needed"
  | "ux_issue"
  | "other";

interface FeedbackDraft {
  type: FeedbackType;
  issue?: CorrectionIssue;
  reason: FeedbackReason;
  note: string;
  context: string;
}

interface ReviewSuggestion {
  id: string;
  issue: CorrectionIssue;
  issues: CorrectionIssue[];
  repeatCount: number;
  isGroupedUnknown: boolean;
}

const SAMPLE_TEXT = "mwen tap ale lekol ye men profese a pat vini";
const PERSONAL_DICTIONARY_KEY = "adwaz.personalDictionary.v1";
const BETA_ACCESS_KEY = "adwaz.betaAccess.v1";
const MAX_TEXT_LENGTH = 120000;
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const MAX_VISIBLE_ISSUES = 500;
const ISSUES_PER_PAGE = 5;
const FEEDBACK_CONTEXT_CHARS = 160;
const ISSUE_PREVIEW_CHARS = 54;

const MODES = [
  { value: "general", label: "General" },
  { value: "professional", label: "Professional" },
  { value: "academic", label: "Academic" },
  { value: "legal", label: "Legal" },
  { value: "medical", label: "Medical" },
  { value: "church", label: "Church / Religious" },
  { value: "casual", label: "Casual" },
  { value: "immigration", label: "Immigration Documentation" },
];

const FEEDBACK_REASON_OPTIONS: Record<FeedbackType, { value: FeedbackReason; label: string }[]> = {
  wrong_correction: [
    { value: "wrong_replacement", label: "The replacement is wrong" },
    { value: "valid_original", label: "The original is valid" },
    { value: "context_needed", label: "It depends on context" },
    { value: "unclear_explanation", label: "The explanation is unclear" },
    { value: "other", label: "Something else" },
  ],
  missing_correction: [
    { value: "missed_error", label: "Adwaz missed an error" },
    { value: "context_needed", label: "This passage needs context" },
    { value: "other", label: "Something else" },
  ],
  unknown_word_should_be_known: [
    { value: "valid_original", label: "This word is valid" },
    { value: "context_needed", label: "This word is valid in context" },
    { value: "other", label: "Something else" },
  ],
  general: [
    { value: "ux_issue", label: "Something was hard to use" },
    { value: "unclear_explanation", label: "Something was unclear" },
    { value: "other", label: "Something else" },
  ],
};

function normalizeApiBase(value: string | undefined) {
  return (value || "http://127.0.0.1:8000").trim().replace(/\/$/, "");
}

function replaceIssueInText(text: string, issue: CorrectionIssue) {
  const expected = text.slice(issue.index, issue.index + issue.length);

  if (expected.toLowerCase() === issue.original.toLowerCase()) {
    return text.slice(0, issue.index) + issue.replacement + text.slice(issue.index + issue.length);
  }

  const fallbackIndex = text.toLowerCase().indexOf(issue.original.toLowerCase());
  if (fallbackIndex === -1) return text;

  return (
    text.slice(0, fallbackIndex) +
    issue.replacement +
    text.slice(fallbackIndex + issue.original.length)
  );
}

function unknownWordKey(issue: CorrectionIssue) {
  return issue.category === "unknown_word" ? issue.original.trim().toLocaleLowerCase() : "";
}

function isSameUnknownWord(issue: CorrectionIssue, target: CorrectionIssue) {
  const key = unknownWordKey(issue);
  return Boolean(key) && key === unknownWordKey(target);
}

function issueTone(issue: CorrectionIssue) {
  if (issue.category === "unknown_word") return "border-amber-200 bg-amber-50 text-amber-800";
  if (issue.severity === "warning") return "border-amber-200 bg-amber-50 text-amber-800";
  if (issue.category === "spelling") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (issue.category === "interference") return "border-rose-200 bg-rose-50 text-rose-800";
  if (issue.category === "style") return "border-indigo-200 bg-indigo-50 text-indigo-800";
  return "border-blue-200 bg-blue-50 text-blue-800";
}

function formatIssueCategory(category: string) {
  return category
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function apiErrorMessage(status: number) {
  if (status === 413 || status === 422) {
    return `That text is too long or could not be validated. Keep beta reviews under ${MAX_TEXT_LENGTH.toLocaleString()} characters.`;
  }
  if (status >= 500) {
    return "Adwaz core engine had a temporary problem. Try again with a shorter passage.";
  }
  return `Adwaz core engine returned ${status}. Try again or shorten the text.`;
}

function feedbackTitle(type: FeedbackType) {
  if (type === "wrong_correction") return "Report wrong correction";
  if (type === "missing_correction") return "Report missing correction";
  if (type === "unknown_word_should_be_known") return "Report valid word";
  return "Send beta feedback";
}

function clipContext(value: string) {
  return value.trim().slice(0, 500);
}

function estimateTextareaScrollTop(textarea: HTMLTextAreaElement, text: string, index: number) {
  const computed = window.getComputedStyle(textarea);
  const fontSize = Number.parseFloat(computed.fontSize) || 18;
  const lineHeight = Number.parseFloat(computed.lineHeight) || fontSize * 1.75;
  const horizontalPadding =
    (Number.parseFloat(computed.paddingLeft) || 0) +
    (Number.parseFloat(computed.paddingRight) || 0);
  const availableWidth = Math.max(1, textarea.clientWidth - horizontalPadding);
  const averageCharacterWidth = fontSize * 0.55;
  const charactersPerLine = Math.max(24, Math.floor(availableWidth / averageCharacterWidth));
  const lines = text.slice(0, index).split("\n").reduce((total, line) => {
    return total + Math.max(1, Math.ceil((line.length || 1) / charactersPerLine));
  }, 0);

  return Math.max(0, lines * lineHeight - textarea.clientHeight * 0.35);
}

export default function AdwazClient() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [mode, setMode] = useState("general");
  const [issues, setIssues] = useState<CorrectionIssue[]>([]);
  const [correctedText, setCorrectedText] = useState(SAMPLE_TEXT);
  const [betaCode, setBetaCode] = useState("");
  const [hasBetaAccess, setHasBetaAccess] = useState(false);
  const [betaAccessError, setBetaAccessError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [reviewNotice, setReviewNotice] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [feedbackDraft, setFeedbackDraft] = useState<FeedbackDraft | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);
  const [issueFilter, setIssueFilter] = useState("all");
  const [issuePage, setIssuePage] = useState(0);
  const [personalDictionary, setPersonalDictionary] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const mirrorRef = useRef<HTMLPreElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const issueCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const apiBase = useMemo(
    () =>
      normalizeApiBase(
        process.env.NEXT_PUBLIC_ADWAZ_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
      ),
    [],
  );

  const requiredBetaCode = (process.env.NEXT_PUBLIC_ADWAZ_BETA_CODE || "").trim();

  const activeIssue = issues.find((issue) => issue.id === activeIssueId) || null;
  const issueCategoryCounts = useMemo(() => {
    return issues.reduce<Record<string, number>>((counts, issue) => {
      counts[issue.category] = (counts[issue.category] || 0) + 1;
      return counts;
    }, {});
  }, [issues]);
  const issueCategories = useMemo(
    () => Object.keys(issueCategoryCounts).sort((a, b) => a.localeCompare(b)),
    [issueCategoryCounts],
  );
  const filteredIssues = useMemo(() => {
    if (issueFilter === "all") return issues;
    return issues.filter((issue) => issue.category === issueFilter);
  }, [issueFilter, issues]);
  const reviewSuggestions = useMemo(() => {
    const grouped = new Map<string, ReviewSuggestion>();
    const next: ReviewSuggestion[] = [];

    filteredIssues.forEach((issue) => {
      const key = unknownWordKey(issue);

      if (!key) {
        next.push({
          id: issue.id,
          issue,
          issues: [issue],
          repeatCount: 1,
          isGroupedUnknown: false,
        });
        return;
      }

      const groupId = `unknown:${key}`;
      const existing = grouped.get(groupId);

      if (existing) {
        existing.issues.push(issue);
        existing.repeatCount = existing.issues.length;
        return;
      }

      const group = {
        id: groupId,
        issue,
        issues: [issue],
        repeatCount: 1,
        isGroupedUnknown: true,
      };
      grouped.set(groupId, group);
      next.push(group);
    });

    return next;
  }, [filteredIssues]);
  const pageCount = Math.max(1, Math.ceil(reviewSuggestions.length / ISSUES_PER_PAGE));
  const currentPage = Math.min(issuePage, pageCount - 1);
  const pageStart = reviewSuggestions.length === 0 ? 0 : currentPage * ISSUES_PER_PAGE + 1;
  const pageEnd = Math.min(reviewSuggestions.length, (currentPage + 1) * ISSUES_PER_PAGE);
  const visibleSuggestions = reviewSuggestions.slice(
    currentPage * ISSUES_PER_PAGE,
    (currentPage + 1) * ISSUES_PER_PAGE,
  );

  useEffect(() => {
    if (!requiredBetaCode) {
      setHasBetaAccess(true);
      return;
    }

    try {
      setHasBetaAccess(window.localStorage.getItem(BETA_ACCESS_KEY) === requiredBetaCode);
    } catch {
      setHasBetaAccess(false);
    }
  }, [requiredBetaCode]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PERSONAL_DICTIONARY_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setPersonalDictionary(parsed.filter((item) => typeof item === "string"));
      }
    } catch {
      setPersonalDictionary([]);
    }
  }, []);

  const unlockBeta = () => {
    if (!requiredBetaCode) {
      setHasBetaAccess(true);
      return;
    }

    if (betaCode.trim() !== requiredBetaCode) {
      setBetaAccessError("That beta code is not active.");
      return;
    }

    try {
      window.localStorage.setItem(BETA_ACCESS_KEY, requiredBetaCode);
    } catch {
      // Local storage can be unavailable in strict browser modes; access still works for this session.
    }
    setHasBetaAccess(true);
    setBetaAccessError("");
  };

  useEffect(() => {
    const controller = new AbortController();
    const debounce = window.setTimeout(async () => {
      if (!hasBetaAccess) return;

      if (!text.trim()) {
        setIssues([]);
        setCorrectedText(text);
        setApiError("");
        setReviewNotice("");
        return;
      }

      if (text.length > MAX_TEXT_LENGTH) {
        setIssues([]);
        setCorrectedText(text);
        setApiError(`Adwaz can review up to ${MAX_TEXT_LENGTH.toLocaleString()} characters at a time.`);
        setReviewNotice("");
        return;
      }

      setIsProcessing(true);
      setApiError("");
      setReviewNotice("");

      try {
        const response = await fetch(`${apiBase}/api/v1/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            mode,
            personal_dictionary: personalDictionary,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          setIssues([]);
          setCorrectedText(text);
          setApiError(apiErrorMessage(response.status));
          setReviewNotice("");
          return;
        }

        const data = (await response.json()) as VerificationResult;
        setIssues((data.issues || []).slice(0, MAX_VISIBLE_ISSUES));
        setIssueFilter("all");
        setIssuePage(0);
        setFeedbackDraft(null);
        setActiveIssueId(null);
        setCorrectedText(data.corrected_text || text);
        setReviewNotice(
          data.issue_limit_reached
            ? `Adwaz found ${data.issue_count?.toLocaleString()} suggestions and is showing the first ${data.returned_issue_count?.toLocaleString()}. Accept all still applies every deterministic correction.`
            : "",
        );
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setApiError("Adwaz core engine is not reachable. Start the API or check the API URL.");
        }
      } finally {
        setIsProcessing(false);
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(debounce);
    };
  }, [apiBase, hasBetaAccess, mode, personalDictionary, text]);

  useEffect(() => {
    setIssuePage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  useEffect(() => {
    if (activeIssueId && !issues.some((issue) => issue.id === activeIssueId)) {
      setActiveIssueId(null);
    }
  }, [activeIssueId, issues]);

  const handleScroll = () => {
    if (!textareaRef.current || !mirrorRef.current) return;
    mirrorRef.current.scrollTop = textareaRef.current.scrollTop;
    mirrorRef.current.scrollLeft = textareaRef.current.scrollLeft;
  };

  const acceptIssue = (issue: CorrectionIssue) => {
    setText((current) => replaceIssueInText(current, issue));
    setIssues((current) => current.filter((item) => item.id !== issue.id));
    setActiveIssueId(null);
    setFeedbackDraft(null);
  };

  const dismissIssue = (issue: CorrectionIssue) => {
    setIssues((current) =>
      unknownWordKey(issue)
        ? current.filter((item) => !isSameUnknownWord(item, issue))
        : current.filter((item) => item.id !== issue.id),
    );
    setActiveIssueId(null);
    setFeedbackDraft(null);
  };

  const saveWord = (issue: CorrectionIssue) => {
    const word = issue.original.trim().toLowerCase();
    if (!word) return;

    setPersonalDictionary((current) => {
      const next = Array.from(new Set([...current, word])).sort();
      window.localStorage.setItem(PERSONAL_DICTIONARY_KEY, JSON.stringify(next));
      return next;
    });
    dismissIssue(issue);
  };

  const acceptAll = () => {
    setText(correctedText);
    setIssues([]);
    setActiveIssueId(null);
    setFeedbackDraft(null);
    setIssuePage(0);
  };

  const resetEditor = () => {
    setText(SAMPLE_TEXT);
    setCorrectedText(SAMPLE_TEXT);
    setIssues([]);
    setApiError("");
    setUploadError("");
    setReviewNotice("");
    setFeedbackStatus("");
    setFeedbackDraft(null);
    setActiveIssueId(null);
    setIssueFilter("all");
    setIssuePage(0);
  };

  const copyCorrectedText = async () => {
    await navigator.clipboard.writeText(correctedText || text);
  };

  const exportText = () => {
    const blob = new Blob([correctedText || text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "adwaz-corrected.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");

    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError("Upload a file smaller than 2 MB for this beta.");
      event.target.value = "";
      return;
    }

    try {
      if (file.name.toLowerCase().endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const uploadedText = result.value.trim();

        if (!uploadedText) {
          setUploadError("No readable text was found in that DOCX file.");
          return;
        }

        if (uploadedText.length > MAX_TEXT_LENGTH) {
          setUploadError(`That document is too long for beta review. Keep it under ${MAX_TEXT_LENGTH.toLocaleString()} characters.`);
          return;
        }

        setText(uploadedText);
        return;
      }

      if (file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt")) {
        const uploadedText = (await file.text()).trim();
        if (uploadedText.length > MAX_TEXT_LENGTH) {
          setUploadError(`That file is too long for beta review. Keep it under ${MAX_TEXT_LENGTH.toLocaleString()} characters.`);
          return;
        }

        setText(uploadedText);
        return;
      }

      setUploadError("Upload a .txt or .docx file.");
    } catch {
      setUploadError("Adwaz could not read that file. Try a .txt or standard .docx file.");
    } finally {
      event.target.value = "";
    }
  };

  const previewIssue = (issue: CorrectionIssue) => {
    setActiveIssueId(issue.id);
  };

  const getIssuePreview = (issue: CorrectionIssue) => {
    const start = Math.max(0, issue.index - ISSUE_PREVIEW_CHARS);
    const end = Math.min(text.length, issue.index + issue.length + ISSUE_PREVIEW_CHARS);
    const prefix = start > 0 ? "..." : "";
    const suffix = end < text.length ? "..." : "";

    return `${prefix}${text.slice(start, end).replace(/\s+/g, " ").trim()}${suffix}`;
  };

  const getSelectedContext = () => {
    const textarea = textareaRef.current;
    if (!textarea) return "";

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    if (selectionStart === selectionEnd) return "";

    return clipContext(text.slice(selectionStart, selectionEnd));
  };

  const getIssueContext = (issue: CorrectionIssue) => {
    const start = Math.max(0, issue.index - FEEDBACK_CONTEXT_CHARS);
    const end = Math.min(text.length, issue.index + issue.length + FEEDBACK_CONTEXT_CHARS);
    return clipContext(text.slice(start, end));
  };

  const scrollIssueCardIntoView = (issueId: string) => {
    window.requestAnimationFrame(() => {
      issueCardRefs.current[issueId]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    });
  };

  const showIssueCard = (issue: CorrectionIssue) => {
    const nextFilter =
      issueFilter !== "all" && issue.category !== issueFilter ? "all" : issueFilter;
    const nextIssues =
      nextFilter === "all"
        ? issues
        : issues.filter((item) => item.category === nextFilter);
    const nextReviewSuggestions = (() => {
      const grouped = new Map<string, ReviewSuggestion>();
      const next: ReviewSuggestion[] = [];

      nextIssues.forEach((item) => {
        const key = unknownWordKey(item);

        if (!key) {
          next.push({
            id: item.id,
            issue: item,
            issues: [item],
            repeatCount: 1,
            isGroupedUnknown: false,
          });
          return;
        }

        const groupId = `unknown:${key}`;
        const existing = grouped.get(groupId);

        if (existing) {
          existing.issues.push(item);
          existing.repeatCount = existing.issues.length;
          return;
        }

        const group = {
          id: groupId,
          issue: item,
          issues: [item],
          repeatCount: 1,
          isGroupedUnknown: true,
        };
        grouped.set(groupId, group);
        next.push(group);
      });

      return next;
    })();
    const nextIndex = nextReviewSuggestions.findIndex((item) =>
      unknownWordKey(issue) ? item.issues.some((candidate) => isSameUnknownWord(candidate, issue)) : item.id === issue.id,
    );

    if (nextIndex === -1) {
      setActiveIssueId(issue.id);
      return;
    }

    if (nextFilter !== issueFilter) {
      setIssueFilter(nextFilter);
    }

    setIssuePage(Math.floor(nextIndex / ISSUES_PER_PAGE));
    setActiveIssueId(issue.id);
    scrollIssueCardIntoView(issue.id);
  };

  const syncIssueFromEditorSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea || issues.length === 0) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const matchingIssue = issues.find((issue) => {
      const issueStart = issue.index;
      const issueEnd = issue.index + issue.length;

      if (selectionStart !== selectionEnd) {
        return selectionStart < issueEnd && selectionEnd > issueStart;
      }

      return selectionStart >= issueStart && selectionStart <= issueEnd;
    });

    if (matchingIssue) {
      showIssueCard(matchingIssue);
    }
  };

  const openFeedback = (feedbackType: FeedbackType, issue?: CorrectionIssue) => {
    const reasonOptions = FEEDBACK_REASON_OPTIONS[feedbackType];
    const selectedContext = getSelectedContext();
    setFeedbackStatus("");
    if (issue) {
      previewIssue(issue);
    }

    setFeedbackDraft({
      type: feedbackType,
      issue,
      reason: reasonOptions[0].value,
      note: "",
      context: issue ? getIssueContext(issue) : selectedContext,
    });
  };

  const changeIssueFilter = (nextFilter: string) => {
    setIssueFilter(nextFilter);
    setIssuePage(0);
    setFeedbackDraft(null);
    setActiveIssueId(null);
  };

  const changeIssuePage = (nextPage: number) => {
    setIssuePage(Math.max(0, Math.min(nextPage, pageCount - 1)));
    setFeedbackDraft(null);
    setActiveIssueId(null);
  };

  const sendFeedback = async () => {
    if (!feedbackDraft) return;

    setFeedbackStatus("");
    setIsSendingFeedback(true);

    const issue = feedbackDraft.issue;

    try {
      const response = await fetch(`${apiBase}/api/v1/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback_type: feedbackDraft.type,
          mode,
          reason: feedbackDraft.reason,
          issue_id: issue?.id,
          category: issue?.category,
          original: issue?.original,
          replacement: issue?.replacement,
          context_excerpt: feedbackDraft.context || undefined,
          note: feedbackDraft.note || undefined,
          text_length: text.length,
          word_count: text.split(/\s+/).filter(Boolean).length,
        }),
      });

      if (!response.ok) {
        throw new Error(`feedback ${response.status}`);
      }

      const data = (await response.json()) as { feedback_id?: string };
      setFeedbackStatus(
        data.feedback_id
          ? `Thanks. Added to the beta review queue as ${data.feedback_id}.`
          : "Thanks. Added to the beta review queue.",
      );
      if (issue) {
        setIssues((current) =>
          unknownWordKey(issue)
            ? current.filter((item) => !isSameUnknownWord(item, issue))
            : current.filter((item) => item.id !== issue.id),
        );
        setActiveIssueId(null);
      }
      setFeedbackDraft(null);
    } catch {
      setFeedbackStatus("Could not send feedback right now.");
    } finally {
      setIsSendingFeedback(false);
    }
  };

  const locateIssue = (issue: CorrectionIssue) => {
    showIssueCard(issue);

    if (!textareaRef.current || issue.length === 0) return;

    const start = Math.max(0, Math.min(issue.index, text.length));
    const end = Math.max(start, Math.min(start + issue.length, text.length));

    window.requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.scrollTop = estimateTextareaScrollTop(textarea, text, start);
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(start, end);

      if (mirrorRef.current) {
        mirrorRef.current.scrollTop = textarea.scrollTop;
        mirrorRef.current.scrollLeft = textarea.scrollLeft;
      }
    });
  };

  const renderMirrorText = () => {
    if (!activeIssue) return text || "Mete tèks ou la...";

    const start = Math.max(0, Math.min(activeIssue.index, text.length));
    const end = Math.max(start, Math.min(start + activeIssue.length, text.length));

    return (
      <>
        {text.slice(0, start)}
        <mark className="rounded-md bg-[var(--brand-blue-soft)] px-1 text-[#101426] shadow-[0_0_0_3px_rgba(40,41,126,0.18)] ring-2 ring-[var(--brand-blue)]">
          {text.slice(start, end)}
        </mark>
        {text.slice(end)}
      </>
    );
  };

  const renderFeedbackForm = (idPrefix: string) => {
    if (!feedbackDraft) return null;

    const reasonId = `${idPrefix}-feedback-reason`;
    const contextId = `${idPrefix}-feedback-context`;
    const noteId = `${idPrefix}-feedback-note`;

    return (
      <div
        className="mt-3 rounded-lg border border-[var(--brand-border)] bg-white p-3"
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#101426]">
              {feedbackTitle(feedbackDraft.type)}
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--brand-muted)]">
              Do not include sensitive personal details. A short excerpt helps us reproduce the issue.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackDraft(null)}
            className="rounded-md px-2 py-1 text-xs font-semibold text-[var(--brand-muted)] hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <label className="mt-3 block text-xs font-semibold text-[#101426]" htmlFor={reasonId}>
          Reason
        </label>
        <select
          id={reasonId}
          value={feedbackDraft.reason}
          onChange={(event) =>
            setFeedbackDraft((current) =>
              current
                ? { ...current, reason: event.target.value as FeedbackReason }
                : current,
            )
          }
          className="brand-input mt-1 min-h-10 w-full rounded-lg px-3 py-2 text-sm"
        >
          {FEEDBACK_REASON_OPTIONS[feedbackDraft.type].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label className="mt-3 block text-xs font-semibold text-[#101426]" htmlFor={contextId}>
          Context excerpt
        </label>
        <textarea
          id={contextId}
          value={feedbackDraft.context}
          onChange={(event) =>
            setFeedbackDraft((current) =>
              current
                ? { ...current, context: clipContext(event.target.value) }
                : current,
            )
          }
          placeholder="Select text in the editor first, or add a short excerpt here."
          className="brand-input mt-1 min-h-20 w-full resize-y rounded-lg px-3 py-2 text-sm leading-5"
        />

        <label className="mt-3 block text-xs font-semibold text-[#101426]" htmlFor={noteId}>
          Note
        </label>
        <textarea
          id={noteId}
          value={feedbackDraft.note}
          onChange={(event) =>
            setFeedbackDraft((current) =>
              current
                ? { ...current, note: event.target.value.slice(0, 1000) }
                : current,
            )
          }
          placeholder="What should Adwaz have done?"
          className="brand-input mt-1 min-h-20 w-full resize-y rounded-lg px-3 py-2 text-sm leading-5"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={sendFeedback}
            disabled={isSendingFeedback}
            className="rounded-lg brand-button px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isSendingFeedback ? "Sending..." : "Send feedback"}
          </button>
          <button
            type="button"
            onClick={() => setFeedbackDraft(null)}
            className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  if (!hasBetaAccess) {
    return (
      <section className="page-shell">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="brand-panel w-full rounded-lg p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <img
                src="/adwaz-mark.svg"
                alt=""
                className="h-14 w-14 shrink-0 rounded-[18px]"
                aria-hidden="true"
              />
              <div>
                <p className="page-eyebrow">Private beta</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-normal text-[#101426]">
                  Adwaz
                </h1>
              </div>
            </div>
            <p className="mt-4 text-base leading-7 text-[var(--brand-muted)]">
              Write Haitian Creole with confidence. Adwaz is currently open to invited beta testers.
            </p>

            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                unlockBeta();
              }}
            >
              <label className="sr-only" htmlFor="adwaz-beta-code">
                Beta access code
              </label>
              <input
                id="adwaz-beta-code"
                value={betaCode}
                onChange={(event) => setBetaCode(event.target.value)}
                className="brand-input min-h-12 flex-1 rounded-lg px-4 py-3 text-base"
                placeholder="Enter beta access code"
                autoComplete="off"
              />
              <button type="submit" className="rounded-lg brand-button px-5 py-3 text-sm font-semibold">
                Enter beta
              </button>
            </form>
            {betaAccessError ? (
              <p className="mt-3 text-sm font-medium text-rose-700">{betaAccessError}</p>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-[var(--brand-muted)]">
              Please avoid testing with sensitive legal, medical, financial, or personal documents during the private beta.
            </p>
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
            <div className="flex items-center gap-4">
              <img
                src="/adwaz-mark.svg"
                alt=""
                className="h-16 w-16 shrink-0 rounded-[20px]"
                aria-hidden="true"
              />
              <div>
                <p className="page-eyebrow">Powered by KreyAI</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-normal text-[#101426] sm:text-5xl">
                  Adwaz
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--brand-muted)]">
              Write Haitian Creole with confidence. Asistan entèlijan pou ekri pi byen an kreyòl.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--brand-muted)]">
              Private beta: text is sent to the Adwaz API for review and is not saved by default. Feedback reports may include the correction, your note, and a short excerpt you choose.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-sm font-semibold text-[var(--brand-muted)]" htmlFor="adwaz-mode">
              Writing mode
            </label>
            <select
              id="adwaz-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value)}
              className="brand-input min-h-11 rounded-lg px-3 py-2 text-sm font-medium"
            >
              {MODES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid min-h-[720px] gap-5 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="brand-panel flex min-h-[34rem] flex-col overflow-hidden rounded-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--brand-border)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#101426]">Editor</p>
                <p className="text-xs text-[var(--brand-muted)]">
                  {text.length.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()} characters · {text.split(/\s+/).filter(Boolean).length} words
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleUpload}
                  className="hidden"
                  aria-label="Upload a TXT or DOCX file"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426] hover:border-[var(--brand-border-strong)]"
                >
                  Upload .txt/.docx
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  disabled={issues.length === 0}
                  className="rounded-lg brand-button px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Accept all
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-white">
              <pre
                ref={mirrorRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-auto whitespace-pre-wrap break-words px-5 py-5 text-lg leading-8 text-[#101426]"
              >
                {renderMirrorText()}
              </pre>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(event) => setText(event.target.value)}
                onScroll={handleScroll}
                onClick={syncIssueFromEditorSelection}
                onKeyUp={syncIssueFromEditorSelection}
                onSelect={syncIssueFromEditorSelection}
                placeholder="Mete tèks ou la..."
                aria-label="Haitian Creole text editor"
                spellCheck={false}
                className="brand-input absolute inset-0 z-10 h-full w-full resize-none border-0 bg-transparent px-5 py-5 text-lg leading-8 text-transparent caret-[#101426] outline-none placeholder:text-slate-400 focus:ring-0"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-[var(--brand-border)] bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-5 text-sm">
                {isProcessing ? (
                  <span className="font-medium text-[var(--brand-blue)]">Checking text...</span>
                ) : uploadError ? (
                  <span className="font-medium text-rose-700">{uploadError}</span>
                ) : apiError ? (
                  <span className="font-medium text-rose-700">{apiError}</span>
                ) : reviewNotice ? (
                  <span className="font-medium text-amber-700">{reviewNotice}</span>
                ) : (
                  <span className="text-[var(--brand-muted)]">Corrected preview is ready as you type.</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyCorrectedText}
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426] hover:border-[var(--brand-border-strong)]"
                >
                  Copy corrected
                </button>
                <button
                  type="button"
                  onClick={exportText}
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426] hover:border-[var(--brand-border-strong)]"
                >
                  Export
                </button>
                <button
                  type="button"
                  onClick={resetEditor}
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426] hover:border-[var(--brand-border-strong)]"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <aside className="brand-panel flex min-h-[34rem] flex-col overflow-hidden rounded-lg">
            <div className="border-b border-[var(--brand-border)] px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
                  Suggestions
                </h2>
                <span className="rounded-full bg-[var(--brand-blue-soft)] px-3 py-1 text-sm font-semibold text-[var(--brand-blue)]">
                  {issueFilter === "all" ? issues.length : `${filteredIssues.length} / ${issues.length}`}
                </span>
              </div>
              {issues.length === MAX_VISIBLE_ISSUES ? (
                <p className="mt-2 text-xs leading-5 text-amber-700">
                  Showing the first {MAX_VISIBLE_ISSUES} suggestions. Accept or dismiss some to continue reviewing.
                </p>
              ) : null}
              {issues.length > 0 ? (
                <div className="mt-3 rounded-lg border border-[var(--brand-border)] bg-slate-50 p-3">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]"
                      htmlFor="adwaz-issue-filter"
                    >
                      Review category
                    </label>
                    <select
                      id="adwaz-issue-filter"
                      value={issueFilter}
                      onChange={(event) => changeIssueFilter(event.target.value)}
                      className="brand-input min-h-10 rounded-lg px-3 py-2 text-sm font-medium"
                    >
                      <option value="all">All categories ({issues.length})</option>
                      {issueCategories.map((category) => (
                        <option key={category} value={category}>
                          {formatIssueCategory(category)} ({issueCategoryCounts[category]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-medium text-[var(--brand-muted)]">
                      {reviewSuggestions.length > 0
                        ? `Showing ${pageStart}-${pageEnd} of ${reviewSuggestions.length} cards`
                        : "No suggestions in this category"}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => changeIssuePage(currentPage - 1)}
                        disabled={currentPage === 0 || reviewSuggestions.length === 0}
                        className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-xs font-semibold text-[#101426] disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => changeIssuePage(currentPage + 1)}
                        disabled={currentPage >= pageCount - 1 || reviewSuggestions.length === 0}
                        className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-xs font-semibold text-[#101426] disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openFeedback("missing_correction")}
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-xs font-semibold text-[#101426]"
                >
                  Report missing correction
                </button>
                <button
                  type="button"
                  onClick={() => openFeedback("general")}
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-xs font-semibold text-[#101426]"
                >
                  General feedback
                </button>
              </div>
              {feedbackStatus ? (
                <p className="mt-2 text-xs leading-5 text-[var(--brand-muted)]">{feedbackStatus}</p>
              ) : null}
              {feedbackDraft && !feedbackDraft.issue ? renderFeedbackForm("adwaz-sidebar") : null}
            </div>

            <div className="flex-1 overflow-auto bg-slate-50 p-3">
              {issues.length === 0 ? (
                <div className="flex h-full min-h-72 flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-xl font-bold text-emerald-700">
                    OK
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#101426]">No active suggestions.</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                    Paste or type Haitian Creole text to see orthography, grammar, and style guidance.
                  </p>
                </div>
              ) : reviewSuggestions.length === 0 ? (
                <div className="flex h-full min-h-72 flex-col items-center justify-center px-6 text-center">
                  <p className="text-sm font-semibold text-[#101426]">No suggestions in this category.</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                    Choose another category or continue reviewing all suggestions.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {visibleSuggestions.map((suggestion) => {
                    const issue = suggestion.issue;
                    const isActive = suggestion.issues.some((item) => item.id === activeIssueId);

                    return (
                    <div
                      key={suggestion.id}
                      ref={(element) => {
                        issueCardRefs.current[suggestion.id] = element;
                        suggestion.issues.forEach((item) => {
                          issueCardRefs.current[item.id] = element;
                        });
                      }}
                      onMouseEnter={() => previewIssue(issue)}
                      onFocus={() => previewIssue(issue)}
                      className={`rounded-lg border bg-white p-4 shadow-sm outline-none ${
                        isActive
                          ? "border-[var(--brand-blue)] ring-4 ring-[rgba(40,41,126,0.1)]"
                          : "border-[var(--brand-border)]"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`rounded border px-2 py-1 text-sm font-semibold ${
                              issue.category === "unknown_word"
                                ? "border-amber-200 bg-amber-50 text-amber-800"
                                : "border-rose-100 bg-rose-50 text-rose-700 line-through"
                            }`}
                          >
                            {issue.original}
                          </span>
                          {issue.category !== "unknown_word" && issue.replacement ? (
                            <span className="rounded border border-emerald-100 bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-800">
                              {issue.replacement}
                            </span>
                          ) : null}
                        </div>
                        <span className={`rounded-full border px-2 py-1 text-xs font-bold uppercase ${issueTone(issue)}`}>
                          {issue.category}
                        </span>
                      </div>
                      {suggestion.isGroupedUnknown && suggestion.repeatCount > 1 ? (
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-amber-700">
                          Appears {suggestion.repeatCount} times in this text
                        </p>
                      ) : null}

                      <p className="mt-3 text-sm font-semibold leading-6 text-[#101426]">{issue.message}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{issue.explanation}</p>
                      {text.length > 700 ? (
                        <p className="mt-3 rounded-md border border-[var(--brand-border)] bg-slate-50 px-2.5 py-2 text-xs leading-5 text-[var(--brand-muted)]">
                          <span className="font-semibold text-[#101426]">Near:</span>{" "}
                          {getIssuePreview(issue)}
                        </p>
                      ) : null}

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => locateIssue(issue)}
                          className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
                        >
                          Locate
                        </button>
                        {issue.category !== "unknown_word" && issue.replacement ? (
                          <button
                            type="button"
                            onClick={() => acceptIssue(issue)}
                            className="rounded-lg brand-button px-3 py-2 text-sm font-semibold"
                          >
                            Accept
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => dismissIssue(issue)}
                          className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
                        >
                          {suggestion.isGroupedUnknown && suggestion.repeatCount > 1 ? "Dismiss all" : "Dismiss"}
                        </button>
                        {issue.category === "unknown_word" ? (
                          <button
                            type="button"
                            onClick={() => saveWord(issue)}
                            className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
                          >
                            {suggestion.repeatCount > 1 ? "Save word + clear all" : "Save word"}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() =>
                            openFeedback(
                              issue.category === "unknown_word"
                                ? "unknown_word_should_be_known"
                                : "wrong_correction",
                              issue,
                            )
                          }
                          className="rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-sm font-semibold text-[#101426]"
                        >
                          Report
                        </button>
                      </div>
                      {feedbackDraft?.issue?.id === issue.id ? renderFeedbackForm(`adwaz-${issue.id}`) : null}
                    </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-[var(--brand-border)] bg-white px-4 py-3">
              <p className="text-xs leading-5 text-[var(--brand-muted)]">
                Personal dictionary: {personalDictionary.length} saved words. Saved locally in this browser.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
