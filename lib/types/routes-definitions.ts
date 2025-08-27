import { Bbox, leadAlert } from "@/lib/types/definitions";

export interface UsersOnJam {
  wazersCount: number;
  jamLevel: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface WazeData {
  usersOnJams: UsersOnJam[];
  routes: Routes[];
  irregularities: Irregularities[];
  broadcasterId?: string;
  areaName: string;
  bbox: Bbox[];
  name: string;
  isMetric: boolean;
  lengthOfJams: LengthOfJams[];
  updateTime: number;
}

export interface Routes {
  subRoutes?: RoutesSubRoutes[];
  toName: string;
  historicTime: number;
  line: Coordinates[];
  bbox: Bbox;
  fromName: string;
  length: number;
  jamLevel: number;
  id: string;
  time: number;
  type: string;
}

export interface RoutesSubRoutes {
  toName: string;
  historicTime: number;
  line: Coordinates[];
  bbox: Bbox;
  fromName: string;
  length: number;
  jamLevel: number;
}

export interface LengthOfJams {
  jamLevel: number;
  jamLength: number; // em metros
}

export interface IrregularitiesSubRoutes extends RoutesSubRoutes {
  leadAlert: leadAlert[];
}
export interface Irregularities {
  country: string;
  city: string;
  street: string;
  line: Coordinates[];

  seconds: number;
  delaySeconds: number;

  startNode?: string;
  endNode?: string;

  nThumbsUp: number;
  trend: number;

  detectionDate: string;
  detectionDateMillis: number;

  type: string;

  speed: number;
  regularSpeed: number;

  jamLevel: number;
  severity: number;
  length: number;
  causeType?: string;
  causeAlert?: CauseAlert;

  updateMillis: number;
  updateDate: string;

  highway: boolean;

  nImages: number;
  nComents: number;

  driversCount: number;

  alertsCount: number;
  alerts: Alerts[];
}

export interface Alerts {
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
  location: Coordinates;
  pubMillis: number;
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

  location: Coordinates;

  pubMillis: number;
}
