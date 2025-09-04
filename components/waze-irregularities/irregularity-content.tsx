"use client";

import { useEffect, useState, useTransition } from "react";
import { CityFilter } from "@/components/city-filter";
import { type SortOption, SortSelect } from "@/components/SortSelect";
import { Skeleton } from "@/components/ui/skeleton";
import CardIrregularity from "@/components/waze-irregularities/irregularity-card";
import { fetchLatestIrregularitiesAction } from "@/lib/server/actions/irregularitiesActions";
import type { Irregularities } from "@/lib/types/irregularities";
import { sortIrregularities } from "@/lib/utils/irregularitites-utils";

interface ContentIrregularitiesProps {
  initialIrregularities: Irregularities[];
}

export const ContentIrregularities = ({
  initialIrregularities,
}: ContentIrregularitiesProps) => {
  const [irregularities, setIrregularities] = useState<Irregularities[]>(
    initialIrregularities,
  );
  const [filteredIrregularities, setFilteredIrregularities] = useState<
    Irregularities[]
  >([]);
  const [sortValue, setSortValue] = useState("trend_desc");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isPending, startTransition] = useTransition();

  const selectedCity = "Rio de Janeiro";

  const sortOptions: SortOption[] = [
    { label: "A → Z", value: "name_asc" },
    { label: "Maior tempo", value: "time_desc" },
    { label: "Maior delay", value: "delay_desc" },
    { label: "Maior Percentual", value: "trend_desc" },
  ];

  useEffect(() => {
    const filtered = irregularities.filter(
      (item) => item.city === selectedCity,
    );
    setFilteredIrregularities(sortIrregularities(filtered, sortValue));
  }, [irregularities, sortValue]);

  const handleSort = (value: string) => {
    setSortValue(value);
    setFilteredIrregularities((prev) => sortIrregularities(prev, value));
  };

  useEffect(() => {
    let mounted = true;

    const fetchAndApply = async () => {
      try {
        const latest = await fetchLatestIrregularitiesAction();
        if (!mounted) return;

        startTransition(() => {
          setIrregularities(latest);
          setLastUpdated(new Date());
        });
      } catch (err) {
        console.error("Erro ao buscar irregularidades (server action):", err);
      }
    };

    fetchAndApply();

    const interval = setInterval(async () => {
      try {
        const latest = await fetchLatestIrregularitiesAction();
        if (!mounted) return;
        startTransition(() => {
          setIrregularities(latest);
          setLastUpdated(new Date());
        });
      } catch (err) {
        console.error("Erro ao atualizar irregularidades:", err);
      }
    }, 60_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <CityFilter selectedCity={selectedCity} />
          <SortSelect
            options={sortOptions}
            defaultValue={sortValue}
            onSort={handleSort}
          />
          <div className="text-sm text-gray-500">
            Última atualização:{" "}
            {lastUpdated.toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
              timeZone: "America/Sao_Paulo",
            })}
            {isPending && (
              <span className="ml-2 animate-pulse text-blue-500">
                Atualizando...
              </span>
            )}
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredIrregularities.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIrregularities.map((i) => (
            <CardIrregularity
              key={i.id}
              id={i.id}
              city={i.city}
              street={i.street}
              seconds={i.seconds}
              delaySeconds={i.delaySeconds}
              regularSpeed={i.regularSpeed}
              length={i.length}
              speed={i.speed}
              severity={i.severity}
              jamLevel={i.jamLevel}
              isUpdating={isPending}
              startNode={i.startNode}
              endNode={i.endNode}
              causeType={i.causeType}
              trendPercentage={i.speed / i.regularSpeed / 100}
              fromLat={i.line[0].y}
              fromLon={i.line[0].x}
              lat={i.line[i.line.length - 1].y}
              lon={i.line[i.line.length - 1].x}
            />
          ))}
        </div>
      ) : (
        <p>Nenhuma irregularidade encontrada para a cidade selecionada.</p>
      )}
    </div>
  );
};
