import { Irregularities } from "@/lib/types/irregularities";

export function mapIrregularities(irregularities?: Irregularities[]) {
  return (irregularities || []).map((irregularity) => ({ ...irregularity }));
}

export function sortIrregularities(
  irregularities: Irregularities[],
  value: string
) {
  return [...irregularities].sort((a, b) => {
    switch (value) {
      case "name_asc":
        return a.street.localeCompare(b.street);

      case "time_desc": {
        return b.seconds - a.seconds;
      }
      case "delay_desc":
        return b.delaySeconds - a.delaySeconds;
      case "perc_desc":
      default:
        return (
          (b.speed / b.regularSpeed) * 100 - (a.speed / a.regularSpeed) * 100
        );
    }
  });
}
