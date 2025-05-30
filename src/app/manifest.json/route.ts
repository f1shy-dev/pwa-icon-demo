import { cookies } from "next/headers";
import { getIconSetFromCookies, getIconUrlWithCacheBust } from "@/lib/utils";

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const iconSet = getIconSetFromCookies(cookieHeader);

  const manifest = {
    name: "PWA Icon Selector",
    short_name: "PWA Icons",
    description: "Dynamic PWA icon selection app",
    start_url: "/",
    display: "standalone",
    background_color: "hsl(var(--background))",
    theme_color: "hsl(var(--background))",
    orientation: "portrait-primary",
    icons: [
      {
        src: getIconUrlWithCacheBust(iconSet, "pwa-64x64.png", cookieHeader),
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: getIconUrlWithCacheBust(iconSet, "pwa-192x192.png", cookieHeader),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: getIconUrlWithCacheBust(iconSet, "pwa-512x512.png", cookieHeader),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: getIconUrlWithCacheBust(
          iconSet,
          "maskable-icon-512x512.png",
          cookieHeader
        ),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["utilities", "productivity"],
    lang: "en-US",
    dir: "ltr",
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
