"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/nav-bar";
import { LogoutButton } from "./logout/LogoutButton";

// Mapeamento de títulos e descrições por rota
const pageMeta: Record<string, { title: string; description: string }> = {
  "/waze-routes-test/tabela": {
    title: "Rotas - Tabela",
    description: "Visualização das rotas em formato de tabela.",
  },
  "/waze-routes-test/cards": {
    title: "Rotas - Cards",
    description: "Visualização das rotas em formato de cards.",
  },
  "/waze-irregularities-test/tabela": {
    title: "Irregularidades - Tabela",
    description: "Visualização das irregularidades em tabela.",
  },
  "/waze-irregularitites-test/cards": {
    title: "Irregularidades - Cards",
    description: "Visualização das irregularidades em cards.",
  },
  "/rotas": { title: "Rotas", description: "Visualização geral das rotas." },
  "/irregularidades": {
    title: "Irregularidades",
    description: "Visualização geral das irregularidades.",
  },
};

const Topbar = () => {
  const pathname = usePathname();

  const { title, description } = pageMeta[pathname] || {
    title: "Dashboard",
    description: "Bem-vindo ao sistema",
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <div>
          <LogoutButton text="Sair" />
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Topbar;
