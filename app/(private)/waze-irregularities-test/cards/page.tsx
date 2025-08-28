import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentIrregularities } from "@/components/waze-irregularities/irregularity-content";
import type { Irregularities } from "@/lib/types/irregularities";
import {
  mapIrregularities,
  sortIrregularities,
} from "@/lib/utils/irregularitites-utils";

export default async function IrregularitiesPage() {
  const initialIrregularities: Irregularities[] = [];

  const irregularities = sortIrregularities(
    mapIrregularities(initialIrregularities),
    "delay_desc",
  );

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
          <ContentIrregularities initialIrregularities={irregularities} />
        </Suspense>
      </main>
    </div>
  );
}
