import { NextResponse } from "next/server";

const WINDOWS_INSTALLER_URL =
  "https://github.com/bilp9/kreyai-atelier/releases/download/v0.1.13/aTelier-0.1.13-windows-x64-setup.exe";

export function GET() {
  return NextResponse.redirect(WINDOWS_INSTALLER_URL, 302);
}
