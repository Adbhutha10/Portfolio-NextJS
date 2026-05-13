import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adbhutha.me"),
  title: "Adbhutha Beere | Full Stack, ML & Cloud Engineer",
  description: "Portfolio of Adbhutha Beere, focusing on scalable AI-driven solutions, full-stack development, and cloud computing. semi-finalist in Flipkart GRID 7.0 and IEEE Published researcher.",
  keywords: ["Adbhutha Beere", "Portfolio", "Full Stack Developer", "Machine Learning Engineer", "Cloud Computing", "BVRIT", "IEEE Researcher"],
  authors: [{ name: "Adbhutha Beere" }],
  openGraph: {
    title: "Adbhutha Beere | Portfolio",
    description: "Building scalable AI solutions and full-stack applications.",
    url: "https://sravyachowdery.me",
    siteName: "Adbhutha Beere Portfolio",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Adbhutha Beere Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adbhutha Beere | Portfolio",
    description: "Full Stack, ML & Cloud Engineer Portfolio",
    images: ["/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
