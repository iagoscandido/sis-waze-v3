import { DashboardLive } from "@/components/dashboard/DashboardLive";
import { auth } from "@/lib/auth.server";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

const DashboardPage = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== Role.ADMIN) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Rotas monitoradas</h1>
      <DashboardLive />
    </main>
  );
};

export default DashboardPage;
