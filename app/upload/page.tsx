"use client";

import { useState } from "react";

export default function UploadClient() {
  const [language, setLanguage] = useState("en");
  const [file, setFile] = useState<File | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const canSubmit = file && acceptedTerms;

  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-xl space-y-8">

        <h1 className="text-3xl font-semibold text-center">
          Upload Audio or Video
        </h1>

        {/* Language Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            File
          </label>

          <input
            type="file"
            accept="audio/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
        </div>

        {file && (
          <div className="text-sm text-neutral-600">
            Selected: {file.name}
          </div>
        )}

        {/* Terms Checkbox */}
        <div className="space-y-2">
          <label className="flex items-start space-x-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                className="underline hover:text-black"
              >
                Terms of Service
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          disabled={!canSubmit}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition
            ${
              canSubmit
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
        >
          Continue
        </button>

      </div>
    </main>
  );
}