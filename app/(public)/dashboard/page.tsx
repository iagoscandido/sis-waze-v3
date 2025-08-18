// app/page.tsx
import { AnomalyCard } from "@/components/AnomalyCard";
import { WazeData } from "@/lib/definitions";

async function getData(): Promise<WazeData> {
  const res = await fetch(
    "https://www.waze.com/row-partnerhub-api/feeds-tvt/?id=1747914316263",
    {
      next: { revalidate: 120 },
    }
  );

  if (!res.ok) throw new Error("Erro ao carregar dados da Waze API");

  return res.json();
}

export default async function HomePage() {
  const data = await getData();
  const routes = data.routes;

  const updatedAt = new Date(data.updateTime);
  const updatedAtFormatted = updatedAt.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Rotas monitoradas</h1>
        <p className="text-sm text-gray-500">
          Atualizado em{" "}
          <span className="font-medium">{updatedAtFormatted}</span>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {routes.map((route) => (
          <AnomalyCard
            key={route.id}
            route={route.name}
            averageTravelTime={Math.round(route.historicTime / 60)}
            currentTravelTime={Math.round(route.time / 60)}
            jamLevel={route.jamLevel}
          />
        ))}
      </div>
    </main>
  );
}
