import { DashboardLive } from "@/components/dashboard/DashboardLive";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Rotas monitoradas</h1>
      <DashboardLive />
    </main>
  );
}
