import { Sidebar } from "@/components/atoms/sidebar";
import { LoginFooter, LoginNavbar } from "@/components/organisms/login";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const hasUser = false;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex bg-white">
      {!hasUser ? (
        <div className="w-full">
          <LoginNavbar />
          {children}
          <LoginFooter />
        </div>
      ) : (
        <>
          <Sidebar />
          {children}
        </>
      )
      }
    </div >
  );
}
