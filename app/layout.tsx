import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VisitorGate from "./components/VisitorGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "台灣芒果 | Taiwan Mango",
  description: "來自台南、屏東果園的台灣芒果，愛文、金煌、玉文當季直採直送。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${geistSans.variable} ${fraunces.variable} h-full`}>
      <body
        id="top"
        className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased"
      >
        <VisitorGate>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </VisitorGate>
      </body>
    </html>
  );
}
