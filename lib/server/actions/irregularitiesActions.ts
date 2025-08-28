"use server";

import { Irregularities } from "@/lib/types/irregularities";
import { mapIrregularities } from "@/lib/utils/irregularitites-utils";

type FetchResult = { irregularities: Irregularities[] };

export async function fetchLatestIrregularitiesAction(): Promise<
  Irregularities[]
> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/tests/external/waze-geral`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao buscar dados externos: ${res.status}`);
  }

  const data: FetchResult = await res.json();

  const mapped = mapIrregularities(data.irregularities ?? []);

  return mapped;
}
