//SeverityLevel: Gravidade calculada da irregularidade de 0 a 5 (5 = mais grave)
//JamLevel:  1 a 4, sendo 4 o pior nível de congestionamento
export type SeverityLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type JamLevel = 1 | 2 | 3 | 4;

const severityDescription: Record<SeverityLevel, string> = {
  0: "Sem trânsito",
  1: "Trânsito livre",
  2: "Trânsito leve",
  3: "Trânsito moderado",
  4: "Trânsito intenso",
  5: "Parado / Congestionado",
};

export function getTrafficDescription(level: number): string {
  return (
    severityDescription[level as SeverityLevel] ??
    "Nível de trânsito desconhecido"
  );
}
