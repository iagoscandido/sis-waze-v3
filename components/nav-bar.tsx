"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Categoria {
  title: string;
  href: string;
}

interface TipoVisualizacao {
  title: string;
  href: string;
}

const categorias: Categoria[] = [
  { title: "Rotas", href: "/waze-routes-test/" },
  { title: "Irregularidades", href: "/waze-irregularities-test/" },
];

const tiposVisualizacao: TipoVisualizacao[] = [
  { title: "Tabela", href: "tables" },
  { title: "Cards", href: "cards" },
];

export const Navbar = () => {
  const pathname = usePathname();

  // Determina a categoria baseada na rota atual
  const categoriaInicial =
    categorias.find((cat) => pathname.startsWith(cat.href)) || categorias[0];

  const [categoriaSelecionada, setCategoriaSelecionada] =
    React.useState<Categoria>(categoriaInicial);

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {/* Categoria */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categoria</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              {categorias.map((categoria) => (
                <li key={categoria.title}>
                  <Link
                    href={categoria.href}
                    className={`block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-black ${
                      categoriaSelecionada.title === categoria.title
                        ? "bg-gray-200 text-black"
                        : ""
                    }`}
                    onClick={() => setCategoriaSelecionada(categoria)}
                  >
                    {categoria.title}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Tipo de Visualização */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tipo de visualização</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              {tiposVisualizacao.map((tipo) => (
                <li key={tipo.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`${categoriaSelecionada.href}/${tipo.href}`}
                      className="block p-2 rounded hover:bg-gray-100 hover:text-black"
                    >
                      {tipo.title}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
