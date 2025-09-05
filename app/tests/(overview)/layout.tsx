import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";
import { Footer } from "@/components/components-test/footer";
import NavbarTest from "@/components/components-test/nav-bar-test";
import { Skeleton } from "@/components/ui/skeleton";

export const experimental_ppr = true;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen  text-white">
      <header className="m-3">
        <NavbarTest />
      </header>

      <main className="flex flex-grow flex-wrap justify-center items-center gap-1 m-3">
        <Suspense
          fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
        >
          {children}
        </Suspense>
      </main>

      <footer className="m-3">
        <Footer>
          <div className="flex items-center gap-2">
            <Link
              href="https://waze.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Dados fornecidos pelo Waze App. Saiba mais em Waze.com
            </Link>
            <Image
              src="/waze-logo.png"
              alt="Waze Logo"
              width={24}
              height={24}
            />
          </div>
        </Footer>
      </footer>
    </div>
  );
};

export default Layout;
