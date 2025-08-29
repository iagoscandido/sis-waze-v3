import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentRoutes } from "@/components/waze-routes/route-content";
import { fetchWazeRoutes } from "@/lib/server/fetchWazeRoutes";
import { mapRoutes, sortRoutes } from "@/lib/utils/route-utils";

export default async function RoutesPage() {
  const data = await fetchWazeRoutes();

  const routes = mapRoutes(data.routes);
  const sortedRoutes = sortRoutes(routes, "trend_desc");

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
          <ContentRoutes initialRoutes={sortedRoutes} />
        </Suspense>
      </main>
    </div>
  );
}
