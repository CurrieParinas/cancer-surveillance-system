import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
