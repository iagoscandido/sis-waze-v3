"use server";
import type { Irregularities } from "@/lib/types/irregularities";
import type { WazeIrregularityData } from "@/types/wazeData";

// export const dynamic = "force-dynamic";

export const fetchIrregularities = async (): Promise<
  WazeIrregularityData[]
> => {
  try {
    // const localUrl = "http://localhost:3000";
    const baseUrl = process.env.WAZE_GERAL_API_URL;
    if (!baseUrl) {
      console.warn("WAZE_GERAL_API_URL não definido. Retornando vazio.");
      return [];
    }

    const res = await fetch(`${baseUrl}/api/tests/external/waze-geral`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Erro ao buscar irregularidades");

    const data = await res.json();
    return data.irregularities ?? [];
  } catch (error) {
    console.error("fetchIrregularities error:", error);
    return [];
  }
};
