"use server";

import { revalidateTag } from "next/cache";
import { Irregularities } from "@/lib/types/irregularities";
import { mapIrregularities } from "@/lib/utils/irregularitites-utils";

type FetchResult = { irregularities: Irregularities[] };

const EXTERNAL_URL =
  process.env.WAZE_GERAL_API_URL ??
  `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/tests/external/waze-geral`;

export async function fetchLatestIrregularitiesAction(): Promise<
  Irregularities[]
> {
  const url = EXTERNAL_URL;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao buscar dados externos: ${res.status}`);
  }

  const data: FetchResult = await res.json();

  const mapped = mapIrregularities(data.irregularities ?? []);

  try {
    revalidateTag("irregularities");
  } catch {}

  return mapped;
}
