import type { WazeRoute } from "@/lib/types/definitions";

export async function fetchWazeRoutes(): Promise<{
  routes: WazeRoute[];
}> {
  const url =
    process.env.WAZE_API_URL ??
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/waze`;
  const res = await fetch(url, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error(`Falha ao buscar rotas: ${res.status}`);
  }
  return res.json();
}
