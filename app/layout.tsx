import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Source_Code_Pro  } from '@next/font/google';
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'], // For language support
  weight: ['200','300','400','500', '700'], // Adjust weights based on your needs
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MLExplain",
  description: " Explore machine learning concepts interactively with this dynamic visualization platform. Understand algorithms like Linear Regression through hands-on experiments, data visualization, and parameter adjustments. Perfect for students, educators, and professionals looking to deepen their ML knowledge intuitively",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <link rel="icon" href="/favicon.ico" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceCodePro.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
