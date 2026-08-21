"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";


type FormState = "idle" | "submitting" | "success" | "error";


export default function LinguistPartnerForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const products = data.getAll("products").map(String);
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (products.length === 0) {
      setStatus("error");
      setMessage("Select at least one product to test.");
      return;
    }

    if (!apiBase) {
      setStatus("error");
      setMessage("Applications are temporarily unavailable. Please email support@kreyai.com.");
      return;
    }

    try {
      const response = await fetch(`${apiBase.replace(/\/$/, "")}/api/linguist-partner/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          languages: data.get("languages"),
          products,
          platform: data.get("platform"),
          experience: data.get("experience"),
          current_tools: data.get("current_tools"),
          testing_interests: data.get("testing_interests"),
          feedback_commitment: data.get("feedback_commitment") === "on",
          privacy_consent: data.get("privacy_consent") === "on",
          website: data.get("website"),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.detail || "We could not submit your application. Please review the form and try again.");
      }

      form.reset();
      setStatus("success");
      setMessage("Application received. We’ll contact you if there’s a fit for the current partner group.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit your application. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section className="surface-panel rounded-[28px] p-7" aria-live="polite">
        <p className="page-eyebrow">Application received</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Thank you for your interest.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">{message}</p>
        <Link href="/products" className="brand-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-semibold">
          Explore KreyAI products
        </Link>
      </section>
    );
  }

  const fieldClass = "brand-input mt-2 w-full rounded-xl px-4 py-3 text-sm";
  const labelClass = "text-sm font-semibold text-[#20253a]";

  return (
    <form onSubmit={submitApplication} className="surface-panel rounded-[28px] p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Full name
          <input className={fieldClass} name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label className={labelClass}>
          Email
          <input className={fieldClass} type="email" name="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>

      <label className={`${labelClass} mt-6 block`}>
        Working languages
        <input
          className={fieldClass}
          name="languages"
          required
          maxLength={300}
          placeholder="For example: Haitian Creole, English, French"
        />
      </label>

      <fieldset className="mt-7">
        <legend className={labelClass}>Which products would you like to test?</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--brand-muted)]">
          <label className="flex items-center gap-2"><input type="checkbox" name="products" value="atelier" /> aTelier</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="products" value="dekk" /> Dekk</label>
        </div>
      </fieldset>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Computer
          <select className={fieldClass} name="platform" required defaultValue="">
            <option value="" disabled>Select a platform</option>
            <option value="macos">macOS</option>
            <option value="windows">Windows</option>
            <option value="both">Both</option>
          </select>
        </label>
        <label className={labelClass}>
          Professional language experience
          <select className={fieldClass} name="experience" required defaultValue="">
            <option value="" disabled>Select experience</option>
            <option value="new">Less than 1 year</option>
            <option value="1-3">1–3 years</option>
            <option value="4-7">4–7 years</option>
            <option value="8+">8+ years</option>
          </select>
        </label>
      </div>

      <label className={`${labelClass} mt-6 block`}>
        Tools you currently use <span className="font-normal text-[var(--brand-muted)]">(optional)</span>
        <input className={fieldClass} name="current_tools" maxLength={500} placeholder="CAT tools, media players, or other workflow software" />
      </label>

      <label className={`${labelClass} mt-6 block`}>
        What would you like to test?
        <textarea
          className={`${fieldClass} min-h-32 resize-y leading-6`}
          name="testing_interests"
          required
          minLength={20}
          maxLength={1500}
          placeholder="Tell us briefly about your work and the workflows you would evaluate."
        />
      </label>

      <div className="mt-7 grid gap-4 border-t border-[var(--brand-border)] pt-6 text-sm leading-6 text-[var(--brand-muted)]">
        <label className="flex items-start gap-3">
          <input className="mt-1" type="checkbox" name="feedback_commitment" required />
          <span>I can use the selected product in real work and share occasional, candid feedback by email or survey.</span>
        </label>
        <label className="flex items-start gap-3">
          <input className="mt-1" type="checkbox" name="privacy_consent" required />
          <span>
            I agree that KreyAI may use this application information to evaluate and contact me about the program. See the{" "}
            <Link className="soft-link underline underline-offset-4" href="/privacy">Privacy Policy</Link>.
          </span>
        </label>
      </div>

      <label className="absolute -left-[10000px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {message ? (
        <p className={`mt-6 text-sm ${status === "error" ? "text-red-700" : "text-[var(--brand-muted)]"}`} role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="brand-button mt-7 rounded-xl px-6 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Apply to the program"}
      </button>
    </form>
  );
}
