import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLIP - From Twitch to Rich",
  description:
    "Turn entertainment into finance. Connect streamers, clippers, and agencies.",
  keywords: ["streaming", "clips", "twitch", "gaming", "creator economy"],
  authors: [{ name: "CLIP Platform" }],
  creator: "CLIP Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clip-platform.com",
    siteName: "CLIP",
    title: "CLIP - From Twitch to Rich",
    description:
      "Turn entertainment into finance. Connect streamers, clippers, and agencies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLIP - From Twitch to Rich",
    description:
      "Turn entertainment into finance. Connect streamers, clippers, and agencies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
