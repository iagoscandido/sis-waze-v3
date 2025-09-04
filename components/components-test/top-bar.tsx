import type { ReactNode } from "react";

interface TopbarProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default function Topbar({ leftContent, rightContent }: TopbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">{leftContent}</div>
        <div className="flex items-center gap-2">{rightContent}</div>
      </div>
    </header>
  );
}
