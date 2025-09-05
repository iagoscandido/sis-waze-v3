"use server";

import type { Irregularities } from "@/lib/types/irregularities";
import { mapIrregularities } from "@/lib/utils/irregularitites-utils";

type FetchResult = { irregularities: Irregularities[] };

export async function fetchLatestIrregularitiesAction(): Promise<
  Irregularities[]
> {
  try {
    const baseUrl = process.env.WAZE_GERAL_API_URL;
    if (!baseUrl) {
      console.warn("WAZE_GERAL_API_URL não definido. Retornando vazio.");
      return [];
    }

    const res = await fetch(`${baseUrl}/api/tests/external/waze-geral`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Falha ao buscar dados externos: ${res.status}`);
    }

    const data: FetchResult = await res.json();
    const mapped = mapIrregularities(data.irregularities ?? []);
    return mapped;
  } catch (error) {
    console.error("Erro ao buscar dados externos:", error);
    return [];
  }
}
