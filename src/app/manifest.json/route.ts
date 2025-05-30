import { cookies } from "next/headers";
import { getIconSetFromCookies } from "@/lib/utils";

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
    background_color: "#1e293b",
    theme_color: "#1e293b",
    orientation: "portrait-primary",
    icons: [
      {
        src: `/iconsets/${iconSet}/pwa-64x64.png`,
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/iconsets/${iconSet}/pwa-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/iconsets/${iconSet}/pwa-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/iconsets/${iconSet}/maskable-icon-512x512.png`,
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
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
