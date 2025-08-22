import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { auth } from "@/lib/auth.server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout/LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard de Tráfego - Rotas Monitoradas",
  description: "Monitoramento em tempo real de anomalias de tráfego",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
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
                Bem-vindo, {session.user.name || session.user.email}
              </p>
              <p>
                <LogoutButton>Sair</LogoutButton>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DashboardContent />
      </main>

      {/* Footer */}
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
};

export default DashboardPage;
