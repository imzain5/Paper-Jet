import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paperjet.app"),
  title: {
    default: "PaperJet — Documents, only better.",
    template: "%s · PaperJet",
  },
  description:
    "Convert anything to PDF in seconds. Word, images, text — beautifully turned into pixel-perfect PDFs. Free, fast, and private. Files never leave your browser.",
  keywords: [
    "pdf converter",
    "word to pdf",
    "image to pdf",
    "merge pdf",
    "free pdf tools",
    "online pdf",
  ],
  openGraph: {
    title: "PaperJet — Documents, only better.",
    description: "The PDF toolkit for modern teams. Convert, merge, and refine — all in your browser.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperJet — Documents, only better.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* AdSense — replace ca-pub-XXXX with your real publisher ID once approved */}
        {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" strategy="afterInteractive" /> */}
      </head>
      <body className="antialiased">
        {/* Aurora light show */}
        <div className="aurora-stage">
          <div
            className="aurora-blob animate-aurora-1"
            style={{
              width: "55vw",
              height: "55vw",
              top: "-10vw",
              left: "-15vw",
              background: "radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)",
            }}
          />
          <div
            className="aurora-blob animate-aurora-2"
            style={{
              width: "60vw",
              height: "60vw",
              top: "30vw",
              right: "-20vw",
              background: "radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)",
              opacity: 0.4,
            }}
          />
          <div
            className="aurora-blob animate-aurora-3"
            style={{
              width: "50vw",
              height: "50vw",
              bottom: "-10vw",
              left: "20vw",
              background: "radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)",
              opacity: 0.35,
            }}
          />
        </div>
        <div className="grid-veil" />
        <div className="grain" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
