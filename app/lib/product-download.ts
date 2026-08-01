import crypto from "node:crypto";
import { NextRequest } from "next/server";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "";
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "";
}

export async function recordProductDownload(
  request: NextRequest,
  product: "dekk" | "atelier",
  defaults: { version: string; platform?: string; source?: string },
) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) return;

  const url = new URL(request.url);
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "";
  const response = await fetch(`${apiBase.replace(/\/$/, "")}/api/dekk/download-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product,
      version: url.searchParams.get("version") || defaults.version,
      platform: url.searchParams.get("platform") || defaults.platform || "macos",
      source: url.searchParams.get("source") || defaults.source || "website",
      ip_hash: ip ? sha256(ip) : null,
      user_agent_hash: userAgent ? sha256(userAgent) : null,
      referer: request.headers.get("referer") || "",
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Download event API returned ${response.status}`);
}
