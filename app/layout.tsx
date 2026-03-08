import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { Cursor } from "@/components/ui/Cursor";

import ClickSpark from "@/components/ui/ClickSpark";

import { ThemeProvider } from "@/components/ui/ThemeProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aze Synclare — Designer, Developer & Creator", // TODO: your name & tagline
  description:
    "A personal digital world — work, art, taste, personality, and online presence.", // TODO: your meta description
  openGraph: {
    title: "Aze Synclare", // TODO: your name
    description: "Designer, developer & occasional dreamer.", // TODO: your tagline
    images: ["/og-image.png"], // TODO: add your OG image to /public/og-image.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-bg text-ink font-body antialiased transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClickSpark
            sparkColor="#D6C8AE"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <LenisProvider>
              <Cursor />
              {children}
            </LenisProvider>
          </ClickSpark>
        </ThemeProvider>
      </body>
    </html>
  );
}
