import { WazeRoute } from "@/lib/types/definitions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface WazeApiResponse {
  routes: WazeRoute[];
  [key: string]: unknown;
}

export interface EnrichedWazeData extends WazeApiResponse {
  serverTimestamp: string;
  routeCount: number;
  success: boolean;
  isValid: boolean;
}

// Constantes da API
const WAZE_API_URL =
  "https://www.waze.com/row-partnerhub-api/feeds-tvt/?id=11072621667";
const WAZE_HEADERS = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "User-Agent": "Traffic-Dashboard/1.0",
  Accept: "application/json",
};

// ----------------- UTILITÁRIOS -----------------

// Cria respostas JSON padronizadas
const jsonResponse = (
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
) =>
  Response.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      ...extraHeaders,
    },
  });

// Valida se as rotas têm os campos esperados
const validateRoutes = (routes: WazeRoute[]) =>
  routes.every((r) => r.id && r.name && typeof r.time === "number");

// Faz o fetch da API Waze
async function fetchWazeData(): Promise<WazeApiResponse> {
  const res = await fetch(WAZE_API_URL, {
    headers: WAZE_HEADERS,
    next: { revalidate: 30, tags: ["waze-traffic-data"] },
  });

  if (!res.ok) throw { status: res.status, statusText: res.statusText };
  const data: WazeApiResponse = await res.json();
  if (!data?.routes || !Array.isArray(data.routes))
    throw { invalidStructure: true };
  return data;
}

// Enriquecimento dos dados com timestamp e validação
const enrichData = (data: WazeApiResponse, timestamp: string) => ({
  ...data,
  serverTimestamp: timestamp,
  routeCount: data.routes.length,
  success: true,
  isValid: validateRoutes(data.routes),
});

// ----------------- HANDLER -----------------

export async function GET() {
  const timestamp = new Date().toISOString();
  console.log(`Fetching Waze data at ${timestamp}`);

  try {
    const data = await fetchWazeData();
    const enriched = enrichData(data, timestamp);

    console.log(`Successfully fetched ${data.routes.length} routes`);

    return jsonResponse(enriched, 200, {
      "Cache-Control": "public, max-age=30, s-maxage=30",
      "Access-Control-Allow-Methods": "GET",
      "Last-Modified": new Date().toUTCString(),
    });
  } catch (err: unknown) {
    // Erros de fetch ou estrutura inválida
    if (typeof err === "object" && err !== null && "invalidStructure" in err) {
      console.warn("Invalid data structure from Waze API");
      return jsonResponse(
        { error: "Estrutura de dados inválida", timestamp, success: false },
        422
      );
    }

    if (typeof err === "object" && err !== null && "status" in err) {
      const e = err as { status: number; statusText: string };
      console.error(`Waze API error: ${e.status} ${e.statusText}`);
      return jsonResponse(
        {
          error: "Erro ao buscar dados do Waze",
          ...e,
          timestamp,
          success: false,
        },
        e.status
      );
    }

    // Erro interno desconhecido
    console.error("Unexpected Waze API error:", err);
    return jsonResponse(
      {
        error: "Erro interno do servidor",
        message: err instanceof Error ? err.message : "Desconhecido",
        timestamp,
        success: false,
      },
      500
    );
  }
}
