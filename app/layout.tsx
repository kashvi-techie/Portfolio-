import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kashvi Pundir — AI-Native Product Designer & Engineer",
  description:
    "Design systems, AI workflows, and production-ready products. Premium portfolio of Kashvi Pundir.",
  openGraph: {
    title: "Kashvi Pundir — AI-Native Portfolio",
    description: "Design Systems. AI Workflows. Real Products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${greatVibes.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-lg focus:bg-[#0a0612] focus:px-4 focus:py-2 focus:text-gold-light focus:outline-2 focus:outline-gold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
