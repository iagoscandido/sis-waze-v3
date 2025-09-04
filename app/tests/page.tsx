import { Suspense, use } from "react";
import { CardTest } from "@/components/components-test/card-test";
import { MapButton } from "@/components/map-button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Irregularities } from "@/lib/types/irregularities";
import { secondsToMinutes } from "@/lib/utils/date-time";

export const experimental_ppr = true;

async function fetchIrregularities(): Promise<Irregularities[]> {
  const res = await fetch(
    "http://localhost:3000/api/tests/external/waze-geral",
    {
      next: { revalidate: 10 },
    },
  );
  const data = await res.json();
  console.log("fetch");
  return data.irregularities;
}

const PageTest = () => {
  const irregularities = use(fetchIrregularities());

  return (
    <main className="flex flex-wrap justify-center gap-2 m-2">
      {irregularities.map((ir) => (
        <Suspense
          key={ir.id}
          fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
        >
          <CardTest
            key={ir.id}
            title={ir.street}
            description={ir.causeType}
            seconds={ir.seconds}
            delay={ir.delaySeconds}
            action={
              <MapButton
                fromLat={ir.line[0].y}
                fromLon={ir.line[0].x}
                toLat={ir.line[ir.line.length - 1].y}
                toLon={ir.line[ir.line.length - 1].x}
              />
            }
          >
            <p>tempo atual: {secondsToMinutes(ir.seconds).toFixed(0)}</p>
            <p>atraso: {secondsToMinutes(ir.delaySeconds).toFixed(0)}</p>
          </CardTest>
        </Suspense>
      ))}
    </main>
  );
};

export default PageTest;
