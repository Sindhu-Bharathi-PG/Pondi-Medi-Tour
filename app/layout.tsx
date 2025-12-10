import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./components/ClientProviders";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
