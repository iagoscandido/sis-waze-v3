// components/Footer.tsx
import type React from "react";

interface FooterProps {
  children: React.ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer className="border-t text-gray-400 py-8">
      <div className="flex items-center  justify-center space-x-2 text-sm text-center md:text-left">
        {children}
      </div>
    </footer>
  );
}
