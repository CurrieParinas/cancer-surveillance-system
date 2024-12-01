"use client"
import { Sidebar } from "@/components/atoms/sidebar";
import { LoginFooter, LoginNavbar } from "@/components/organisms/login";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="flex bg-white ">
      {!isAuthenticated ? (
        <div className="w-full h-screen">
          {children}
          <LoginNavbar />
          <Toaster />
          <LoginFooter />
        </div>
      ) : (
        <div className="w-screen flex">
          <Sidebar />
          {children}
          <Toaster />
        </div>
      )
      }
    </div >
  );
}
