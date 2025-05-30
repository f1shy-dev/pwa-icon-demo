import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export type IconSet = "a" | "b";

export function generateCacheBustId(): string {
  return nanoid(8);
}

export function getCacheBustId(cookieHeader?: string): string {
  if (!cookieHeader) return generateCacheBustId();

  const cookies = {} as Record<string, string>;
  for (const cookie of cookieHeader.split(";")) {
    const [key, value] = cookie.trim().split("=");
    if (key && value) {
      cookies[key] = value;
    }
  }

  return cookies["pwa-cache-bust"] || generateCacheBustId();
}

export function getIconSetFromCookies(cookieHeader?: string): IconSet {
  if (!cookieHeader) return "a";

  const cookies = {} as Record<string, string>;
  for (const cookie of cookieHeader.split(";")) {
    const [key, value] = cookie.trim().split("=");
    if (key && value) {
      cookies[key] = value;
    }
  }

  const iconSet = cookies["pwa-iconset"];
  return iconSet === "b" ? "b" : "a";
}

export function getIconUrlWithCacheBust(
  iconSet: IconSet,
  iconPath: string,
  cookieHeader?: string
): string {
  const cacheBustId = getCacheBustId(cookieHeader);
  return `/iconsets/${iconSet}/${iconPath}?v=${cacheBustId}`;
}
