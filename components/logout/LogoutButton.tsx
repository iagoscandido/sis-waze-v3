"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  text?: string;
}

const LogoutButton = ({ text = "Sair" }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      {text}
    </Button>
  );
};

export { LogoutButton };
