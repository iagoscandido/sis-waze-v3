import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";
import Topbar from "@/components/components-test/top-bar";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/components/ui/theme-toggle";

export const experimental_ppr = true;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="gap-2 m-3">
      <header className="flex flex-wrap m-3">
        <Topbar
          leftContent={
            <h1 className="text-lg font-semibold">🚦 Waze Dashboard</h1>
          }
          rightContent={<ThemeToggle />}
        />
      </header>

      <main className="flex flex-wrap justify-center items-center gap-1 m-1">
        <Suspense fallback={<Skeleton className="h-screen w-full" />}>
          {children}
        </Suspense>
      </main>
      <footer className="flex justify-center items-center gap-2 border-t">
        Dados fornecidos pelo Waze App. Saiba mais em{" "}
        <Link
          href={"https://waze.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Waze.com
        </Link>
        <Image src="/waze-logo.png" alt="Waze Logo" width={64} height={64} />
      </footer>
    </div>
  );
};

export default Layout;
