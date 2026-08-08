import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_DOWNLOAD_URL =
  "https://storage.googleapis.com/kreyai-downloads/releases/atelier/0.1.10/aTelier-0.1.10.dmg";
const DEFAULT_WINDOWS_DOWNLOAD_URL =
  "https://storage.googleapis.com/kreyai-downloads/releases/atelier/0.1.9/aTelier-0.1.9-windows-x64-setup.exe";

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
      ? process.env.NEXT_PUBLIC_ATELIER_WINDOWS_DOWNLOAD_URL || DEFAULT_WINDOWS_DOWNLOAD_URL
      : process.env.NEXT_PUBLIC_ATELIER_DOWNLOAD_URL || DEFAULT_DOWNLOAD_URL;
  const target = validHttpUrl(configuredTarget);

  if (!target) {
    return NextResponse.redirect(new URL("/atelier?download_error=1#download", request.url), 302);
  }

  return NextResponse.redirect(target, 302);
}
