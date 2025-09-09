export interface WazeIrregularityData {
  id: number;
  detectionDateMillis: number;
  updateDateMillis: number;
  line: Line[];
  speed: number; // Velocidade do trânsito irregular
  regularSpeed: number; // velocidade normal histórica do trecho
  delaySeconds: number; // Atraso em segundos em relação à velocidade normal
  seconds: number; // velocidade atual do trecho
  length: number; // Extensão da irregularidade
  trend: number; // -1 melhorando, 0 constante, 1 piorando
  street: string; // nome da rua
  city: string; // nome da cidade
  severity: number; // Gravidade calculada da irregularidade de 0 a 5 (5 = mais grave)
  jamLevel: number; // 1 a 4, sendo 4 o pior nível de congestionamento
  type?: string; //tipo de evento
}

interface Line {
  x: number;
  y: number;
}
