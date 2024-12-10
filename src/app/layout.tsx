import "./globals.css";
import type { Metadata } from "next";
import { Charm } from "next/font/google"

const charm = Charm({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-charm",
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
    <html lang="en" className={`${charm.variable}`}>
      <body>{children}</body>
    </html>
  );
}
