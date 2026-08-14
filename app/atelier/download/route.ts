import { NextRequest, NextResponse } from "next/server";

import { atelierMacRelease, atelierWindowsRelease } from "../release";

export const runtime = "nodejs";

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
      ? process.env.NEXT_PUBLIC_ATELIER_WINDOWS_DOWNLOAD_URL || atelierWindowsRelease.download_url
      : process.env.NEXT_PUBLIC_ATELIER_DOWNLOAD_URL || atelierMacRelease.download_url;
  const target = validHttpUrl(configuredTarget);

  if (!target) {
    return NextResponse.redirect(new URL("/atelier?download_error=1#download", request.url), 302);
  }

  return NextResponse.redirect(target, 302);
}
