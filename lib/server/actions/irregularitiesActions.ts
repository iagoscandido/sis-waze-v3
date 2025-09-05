import type { Irregularities } from "@/lib/types/irregularities";
import { mapIrregularities } from "@/lib/utils/irregularitites-utils";

type FetchResult = { irregularities: Irregularities[] };

export const dynamic = "force-dynamic";

export async function fetchLatestIrregularitiesAction(): Promise<
  Irregularities[]
> {
  try {
    const baseUrl = process.env.WAZE_GERAL_API_URL ?? "";
    if (!baseUrl) {
      console.warn("WAZE_GERAL_API_URL não definido. Retornando vazio.");
      return [];
    }
    // const url = "/api/tests/external/waze-geral";

    const url = baseUrl
      ? `${baseUrl}/api/tests/external/waze-geral`
      : "/api/tests/external/waze-geral";

    console.log("[fetchIrregularities] URL:", url);

    const res = await fetch(url, {
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
