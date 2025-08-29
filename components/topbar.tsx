"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/nav-bar";

// Mapeamento de títulos e descrições por rota
const pageMeta: Record<string, { title: string; description: string }> = {
  "/waze-routes-test/tables": {
    title: "Rotas - Tabela",
    description: "Visualização das rotas em formato de tabela.",
  },
  "/waze-routes-test/cards": {
    title: "Rotas - Cards",
    description: "Visualização das rotas em formato de cards.",
  },
  "/waze-irregularities-test/tables": {
    title: "Unusual - Tabela",
    description: "Visualização das Unusual em tabela.",
  },
  "/waze-irregularities-test/cards": {
    title: "Unusual - Cards",
    description: "Visualização das Unusual em cards.",
  },
  "/routes": { title: "Rotas", description: "Visualização geral das rotas." },
  "/irregularities": {
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
        <Navbar />
      </div>
    </header>
  );
};

export default Topbar;
