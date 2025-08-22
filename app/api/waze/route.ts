import { WazeRoute } from "@/lib/definitions";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Add timestamp for cache busting and tracking
    const requestTime = new Date().toISOString();

    console.log(`Fetching Waze data at ${requestTime}`);

    const res = await fetch(
      "https://www.waze.com/row-partnerhub-api/feeds-tvt/?id=11072621667",
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "User-Agent": "Traffic-Dashboard/1.0",
          Accept: "application/json",
        },
        // Shorter cache for more real-time data
        next: {
          revalidate: 30, // 30 seconds
          tags: ["waze-traffic-data"],
        },
      }
    );

    if (!res.ok) {
      console.error(`Waze API error: ${res.status} ${res.statusText}`);
      return Response.json(
        {
          error: "Erro ao buscar dados do Waze",
          status: res.status,
          statusText: res.statusText,
          timestamp: requestTime,
          success: false,
        },
        {
          status: res.status,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const data = await res.json();

    // Validate data structure
    if (!data || !data.routes || !Array.isArray(data.routes)) {
      console.warn("Invalid data structure received from Waze API");
      return Response.json(
        {
          error: "Estrutura de dados inválida",
          timestamp: requestTime,
          success: false,
        },
        { status: 422 }
      );
    }

    // Enrich data with server metadata
    const enrichedData = {
      ...data,
      serverTimestamp: requestTime,
      routeCount: data.routes.length,
      success: true,
      // Add data validation
      isValid: data.routes.every(
        (route: WazeRoute) =>
          route.id && route.name && typeof route.time === "number"
      ),
    };

    console.log(`Successfully fetched ${data.routes.length} routes`);

    return Response.json(enrichedData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30, s-maxage=30", // 30 seconds cache
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Last-Modified": new Date().toUTCString(),
      },
    });
  } catch (err) {
    const errorTime = new Date().toISOString();
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";

    console.error("Waze API Error:", {
      error: errorMessage,
      timestamp: errorTime,
      stack: err instanceof Error ? err.stack : undefined,
    });

    return Response.json(
      {
        error: "Erro interno do servidor",
        message: errorMessage,
        timestamp: errorTime,
        success: false,
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
