import Header from "@/app/_components/Header";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "./_components/Footer";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Preview Image + SEO metadata
export const metadata: Metadata = {
  title: "Movie Z",
  description: "Discover movies by genre, popularity and more.",
  openGraph: {
    title: "Movie Z",
    description: "Explore movies on Movie Z with clean UI.",
    images: [
      {
        url: "/custom-preview.png", // 👉 public/custom-preview.png байх ёстой
        width: 1200,
        height: 630,
        alt: "Movie Z Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Z",
    description: "Explore movies on Movie Z with clean UI.",
    images: ["/custom-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
