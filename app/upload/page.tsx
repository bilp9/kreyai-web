import type { Metadata } from "next";
import { Suspense } from "react";
import UploadClient from "./upload-client";

export const metadata: Metadata = {
  title: "Upload",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <UploadClient />
    </Suspense>
  );
}
