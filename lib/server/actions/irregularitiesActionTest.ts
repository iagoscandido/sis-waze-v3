"use server";
import type { Irregularities } from "@/lib/types/irregularities";

// "https://www.waze.com/row-partnerhub-api/partners/11633596527/waze-feeds/e8185b12-350b-47cc-88fd-44b72765d111";

export const fetchIrregularities = async (): Promise<Irregularities[]> => {
  try {
    const url =
      process.env.WAZE_GERAL_API_URL ??
      `${
        process.env.NEXT_PUBLIC_APP_URL ?? process.env.HOST
      }/api/tests/external/waze-geral`;
    const res = await fetch(url, {
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
