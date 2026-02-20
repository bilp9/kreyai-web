import { Suspense } from "react";
import UploadClient from "./upload-client";

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <UploadClient />
    </Suspense>
  );
}