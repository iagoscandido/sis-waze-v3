// app/dashboard/page.tsx
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { LogoutButton } from "@/components/logout/LogoutButton";
import { auth } from "@/lib/auth.server";
import { mapRoutes, sortRoutes } from "@/lib/route-utils";
import { fetchWazeRoutes } from "@/lib/server/fetchWazeRoutes";
import { redirect } from "next/navigation";

export default async function DashboardPageTest() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const data = await fetchWazeRoutes();

  const routes = mapRoutes(data.routes);
  const sortedRoutes = sortRoutes(routes, "trend_desc");

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b justify-between">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard de Tráfego
              </h1>
              <p className="text-gray-600 mt-1">Monitoramento em tempo real</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Bem-vindo, {session.user.name || session?.user.email}
              </p>
              <p>
                <LogoutButton text="Sair" />
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <DashboardContent initialRoutes={sortedRoutes} />
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>
            Dashboard de Tráfego • Dados fornecidos por Waze • Atualizado
            automaticamente
          </p>
        </div>
      </footer>
    </div>
  );
}
