import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_PLATFORM = "macos";
const DEFAULT_SOURCE = "website";
const DEFAULT_WINDOWS_DOWNLOAD_URL =
  "https://storage.googleapis.com/kreyai-downloads/releases/dekk/0.1.6/KreyAI-Dekk-0.1.6-windows-x64-setup.exe";
const DOWNLOAD_URLS: Record<string, string | undefined> = {
  macos: process.env.NEXT_PUBLIC_DEKK_DOWNLOAD_URL,
  windows: process.env.NEXT_PUBLIC_DEKK_WINDOWS_DOWNLOAD_URL || DEFAULT_WINDOWS_DOWNLOAD_URL,
};

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    ""
  );
}

async function recordDownload(request: NextRequest, downloadUrl: URL) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) {
    return;
  }

  const version = downloadUrl.searchParams.get("version") || process.env.NEXT_PUBLIC_DEKK_VERSION || "0.1.6";
  const platform = downloadUrl.searchParams.get("platform") || DEFAULT_PLATFORM;
  const source = downloadUrl.searchParams.get("source") || DEFAULT_SOURCE;
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || "";

  await fetch(`${apiBase.replace(/\/$/, "")}/api/dekk/download-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      version,
      platform,
      source,
      ip_hash: ip ? sha256(ip) : null,
      user_agent_hash: userAgent ? sha256(userAgent) : null,
      referer,
    }),
    cache: "no-store",
  });
}

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

  const downloadUrl = new URL(request.url);
  downloadUrl.searchParams.set("platform", platform);
  const redirectUrl = new URL(target);

  try {
    await recordDownload(request, downloadUrl);
  } catch (error) {
    console.error("Unable to record Dekk download event", error);
  }

  return NextResponse.redirect(redirectUrl, 302);
}
