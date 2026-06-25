// app/verify/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyClient from "./verify-client";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Verify",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <VerifyClient />
    </Suspense>
  );
}
