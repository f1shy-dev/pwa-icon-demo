import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { getIconSetFromCookies } from "@/lib/utils";
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const iconSet = getIconSetFromCookies(cookieHeader);

  return {
    title: "PWA Icon Selector",
    description: "Choose your preferred PWA icon set",
    manifest: "/manifest.json",
    icons: {
      apple: `/iconsets/${iconSet}/apple-touch-icon-180x180.png`,
      icon: [
        {
          url: `/iconsets/${iconSet}/pwa-64x64.png`,
          sizes: "64x64",
          type: "image/png",
        },
        {
          url: `/iconsets/${iconSet}/pwa-192x192.png`,
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: `/iconsets/${iconSet}/pwa-512x512.png`,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "PWA Icon Selector",
    },
    formatDetection: {
      telephone: false,
    },
    themeColor: "#1e293b",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="none" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerProvider />
        {children}
      </body>
    </html>
  );
}
