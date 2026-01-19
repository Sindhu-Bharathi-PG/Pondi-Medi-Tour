import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "./components/ClientProviders";
import "./globals.css";

import { FloatingQuoteWidget } from "./components/common";
import { QuoteProvider } from "./context/QuoteContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pondy HealthPort | Medical Tourism & Wellness in Pondicherry",
  description: "World-class medical tourism and wellness retreats in Pondicherry, India. NABH-accredited hospitals, AYUSH therapies, and serene recovery experiences.",
  keywords: "medical tourism, Pondicherry, wellness, AYUSH, Ayurveda, hospitals, healthcare, India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth a11y-font-normal" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <ClientProviders>
          <QuoteProvider>
            {children}
            <FloatingQuoteWidget />
          </QuoteProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
