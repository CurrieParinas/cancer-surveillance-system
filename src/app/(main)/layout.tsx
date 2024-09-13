import { Sidebar } from "@/components/atoms/sidebar";
import { LoginFooter, Login, LoginNavbar } from "@/components/organisms/login";

interface RootLayoutProps {
  children: React.ReactNode;
}

const hasUser = false;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen bg-white ">
      {!hasUser ? (
        <div className="h-full w-full flex flex-col items-center">
          <LoginNavbar />
          <Login />
          <LoginFooter />
        </div>
      ) : (
        <>
          <Sidebar />
          {children}
        </>
      )}
    </div>
  );
}
