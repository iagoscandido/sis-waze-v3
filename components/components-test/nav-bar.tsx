"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

export type NavbarProps = {
  navItems?: NavItem[];
  actions?: ReactNode;
  showLogin?: boolean;
};

const pageMeta: Record<
  string,
  { title: string; description: string; legend?: ReactNode }
> = {
  "/tests/card": {
    title: "Unusual - Cards",
    description: "Página de visualização de cards de irregularidades",
  },
};

/* --------------------- Desktop Legend Dropdown --------------------- */
const LegendDropdown = ({ legend }: { legend: ReactNode }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="sm" variant="ghost" className="p-1">
        Legenda
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-56 p-2">
      {legend}
    </DropdownMenuContent>
  </DropdownMenu>
);

/* ----------------------------- Desktop Menu ----------------------------- */
const DesktopMenu = ({ navItems }: { navItems: NavItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex space-x-6">
      {navItems.map((item) =>
        item.subItems ? (
          <DropdownMenu key={item.href}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">{item.label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {item.subItems.map((sub) => (
                <Button
                  key={sub.href}
                  variant={"primary"}
                  appearance={pathname === sub.href ? "default" : "ghost"}
                >
                  <Link href={sub.href}>{sub.label}</Link>
                </Button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            key={item.href}
            variant={"primary"}
            appearance={pathname === item.href ? "default" : "ghost"}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ),
      )}
    </div>
  );
};

/* ----------------------------- Mobile Menu ----------------------------- */
const MobileMenu = ({
  navItems,
  actions,
  showLogin,
  legend,
  toggle,
}: {
  navItems: NavItem[];
  actions?: ReactNode;
  showLogin?: boolean;
  legend?: ReactNode;
  toggle: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="md:hidden mt-2 rounded-lg shadow-lg border divide-y divide-gray-200 p-4 space-y-2">
      {navItems.map((item) =>
        item.subItems ? (
          <div key={item.href} className="space-y-1">
            <Button
              variant={"primary"}
              appearance={pathname === item.href ? "default" : "ghost"}
              onClick={() => {
                const el = document.getElementById(item.href);
                if (el) el.classList.toggle("hidden");
              }}
            >
              {item.label}
              <span>&#9662;</span>
            </Button>
            <div id={item.href} className="hidden pl-4 space-y-1">
              {item.subItems.map((sub) => (
                <Button
                  key={sub.href}
                  variant={"primary"}
                  appearance={pathname === sub.href ? "default" : "ghost"}
                  onClick={toggle}
                >
                  <Link href={sub.href}>{sub.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block px-3 py-2 rounded-md font-medium",
              pathname === item.href && "font-bold underline",
            )}
            onClick={toggle}
          >
            {item.label}
          </Link>
        ),
      )}

      {legend && <LegendDropdown legend={legend} />}

      <div className="flex flex-row items-center space-y-2 mt-2">
        {actions}
        {showLogin && (
          <Button variant={"mono"} appearance={"ghost"} size="sm">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

/* ----------------------------- Navbar ----------------------------- */
export default function Navbar({
  navItems = [],
  actions,
  showLogin = false,
}: NavbarProps) {
  const [isOpen, toggle] = useActionState((open: boolean) => !open, false);
  const pathname = usePathname();

  const { title, description, legend } = pageMeta[pathname] || {
    title: "Dashboard",
    description: "Bem-vindo ao sistema",
    legend: undefined,
  };

  return (
    <nav className="border-b bg-background shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          {/* Title & Description */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              {title && <h1 className="text-xl font-bold">{title}</h1>}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>

            {legend && (
              <div className="hidden md:block ml-2">
                <LegendDropdown legend={legend} />
              </div>
            )}
          </div>
          {/* Desktop Menu */}
          <DesktopMenu navItems={navItems} />
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {actions}
            {showLogin && (
              <Button size="sm" variant="primary">
                Login
              </Button>
            )}
          </div>
          {/* Mobile Toggle */}
          <Button onClick={toggle} className="rounded-md p-2 md:hidden">
            {isOpen ? <MenuIcon /> : <MenuIcon />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <MobileMenu
            navItems={navItems}
            actions={actions}
            showLogin={showLogin}
            legend={legend}
            toggle={toggle}
          />
        )}
      </div>
    </nav>
  );
}
