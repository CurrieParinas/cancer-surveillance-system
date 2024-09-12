import { Sidebar } from "@/components/atoms/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex screen">
      <Sidebar />
      {children}
    </div>
  );
}