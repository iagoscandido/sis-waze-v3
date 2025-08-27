export interface Bbox {
  minY: number;
  minX: number;
  maxY: number;
  maxX: number;
}
export interface IrregularitiesJsonData {
  alerts: [];
  endTimeMillis: number;
  irregularitites: Irregularities[];
  startTimeMillis: number;
  startTime: number;
  endTime: number;
  jams: [];
}

export interface Line {
  x: number;
  y: number;
}

export interface Irregularities {
  country: string;
  nThumbsUp: number;
  updateDate: string;
  trend: number;
  city: string;
  line: Line[];
  detectionDateMillis: number;
  type: string;
  endNode?: string;
  speed: number;
  seconds: number;
  street: string;
  jamLevel: number;
  id: string;
  nComents: number;
  highway: boolean;
  delaySeconds: number;
  severity: number;
  driversCount: number;
  alertsCount: number;
  length: number;
  updateMillis: number;
  nImages: number;
  alerts: [];
  detectionDate: string;
  regularSpeed: number;
  causeType?: string;
  causeAlert?: CauseAlert;
  startNode: string;
}

export interface CauseAlert {
  country: string;
  city: string;

  reportRating: number;
  reportByMunicipalityUser: boolean;

  confidence: number;
  reliability: number;

  type: string;

  uuid: string;

  roadType: number;
  magvar: number;

  subtype?: string;
  street: string;

  location: Line;
  pubMillis: number;
}

export interface WazeLocalIrregularities {
  id: string;
  city: string;
  street: string;

  secontds: number;
  delaySeconds: number;

  startNode: string;
  endNode: string;

  causeType?: string;
  causeAlert?: CauseAlert;

  regularSpeed: number;
  speed: number;

  jamLevel: number;
  length: number;

  updateDate: string;
  detectionDate: string;
}
