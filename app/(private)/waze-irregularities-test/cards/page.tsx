import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentIrregularities } from "@/components/waze-irregularities/irregularity-content";
import { fetchLatestIrregularitiesAction } from "@/lib/server/actions/irregularitiesActions";
import {
  mapIrregularities,
  sortIrregularities,
} from "@/lib/utils/irregularitites-utils";

export default async function IrregularitiesPage() {
  const data = await fetchLatestIrregularitiesAction();

  const irregularities = mapIrregularities(data);

  const sortedIrregularities = sortIrregularities(irregularities, "delay_desc");

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ContentIrregularities initialIrregularities={sortedIrregularities} />
      </main>
    </div>
  );
}
