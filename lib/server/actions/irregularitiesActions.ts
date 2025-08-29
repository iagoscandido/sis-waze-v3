"use server";

import type { Irregularities } from "@/lib/types/irregularities";
import { mapIrregularities } from "@/lib/utils/irregularitites-utils";

type FetchResult = { irregularities: Irregularities[] };
export async function fetchLatestIrregularitiesAction(): Promise<
  Irregularities[]
> {
  const url =
    process.env.WAZE_GERAL_API_URL ??
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/tests/external/waze-geral`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Falha ao buscar dados externos: ${res.status}`);
  }

  const data: FetchResult = await res.json();

  const mapped = mapIrregularities(data.irregularities ?? []);

  return mapped;
}
