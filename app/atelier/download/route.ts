import { NextRequest, NextResponse } from "next/server";
import { recordProductDownload } from "../../lib/product-download";

export const runtime = "nodejs";

const DEFAULT_DOWNLOAD_URL =
  "https://storage.googleapis.com/kreyai-downloads/releases/atelier/0.1.2/aTelier-0.1.2.dmg";

function validHttpUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const platform = request.nextUrl.searchParams.get("platform") || "macos";
  const configuredTarget =
    platform === "windows"
      ? process.env.NEXT_PUBLIC_ATELIER_WINDOWS_DOWNLOAD_URL
      : process.env.NEXT_PUBLIC_ATELIER_DOWNLOAD_URL || DEFAULT_DOWNLOAD_URL;
  const target = validHttpUrl(configuredTarget);

  if (!target) {
    const fallback = platform === "windows" ? "/atelier?windows=coming-soon#download" : "/atelier?download_error=1#download";
    return NextResponse.redirect(new URL(fallback, request.url), 302);
  }

  try {
    await recordProductDownload(request, "atelier", {
      version: process.env.NEXT_PUBLIC_ATELIER_VERSION || "0.1.6",
      platform,
      source: "website",
    });
  } catch (error) {
    console.error("Unable to record aTelier download event", error);
  }

  return NextResponse.redirect(target, 302);
}
