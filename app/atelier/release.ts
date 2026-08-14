import manifest from "../../public/atelier/releases/latest.json";

export const atelierRelease = manifest;
export const atelierMacRelease = manifest.platforms.macos;
export const atelierWindowsRelease = manifest.platforms.windows;

export function releaseVersionFromUrl(url: string) {
  return url.match(/atelier\/(\d+\.\d+\.\d+)\//)?.[1] ?? manifest.version;
}
