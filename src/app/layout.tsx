import "./globals.css";
import type { Metadata } from "next";
import { Kalam } from "next/font/google"

const kalam = Kalam({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  title: "Home - Cancer Surveillance System",
  description: "Cancer Surveillance System | Magkasama natin puksain ang kanser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kalam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
