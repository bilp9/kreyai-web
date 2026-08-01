import { NextRequest, NextResponse } from "next/server";
import { recordProductDownload } from "../../lib/product-download";

export const runtime = "nodejs";

const DEFAULT_PLATFORM = "macos";
const DEFAULT_SOURCE = "website";
const DOWNLOAD_URLS: Record<string, string | undefined> = {
  macos: process.env.NEXT_PUBLIC_DEKK_DOWNLOAD_URL,
  windows: process.env.NEXT_PUBLIC_DEKK_WINDOWS_DOWNLOAD_URL,
};

function normalizePlatform(value: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (["mac", "macos", "darwin", "osx"].includes(normalized)) {
    return "macos";
  }
  if (["win", "windows", "pc"].includes(normalized)) {
    return "windows";
  }
  return null;
}

function detectPlatform(request: NextRequest) {
  const platformParam = normalizePlatform(new URL(request.url).searchParams.get("platform"));
  if (platformParam) {
    return platformParam;
  }

  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  if (userAgent.includes("windows")) {
    return "windows";
  }
  return DEFAULT_PLATFORM;
}

export async function GET(request: NextRequest) {
  const platform = detectPlatform(request);
  const target = DOWNLOAD_URLS[platform] || DOWNLOAD_URLS[DEFAULT_PLATFORM];
  if (!target) {
    return NextResponse.redirect(new URL("/dekk?download_error=1#download", request.url), 302);
  }

  const redirectUrl = new URL(target);

  try {
    await recordProductDownload(request, "dekk", {
      version: process.env.NEXT_PUBLIC_DEKK_VERSION || "0.1.6",
      platform,
      source: DEFAULT_SOURCE,
    });
  } catch (error) {
    console.error("Unable to record Dekk download event", error);
  }

  return NextResponse.redirect(redirectUrl, 302);
}
