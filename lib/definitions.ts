export interface WazeRoute {
  id: string;
  name: string;
  time: number;
  historicTime: number;
  jamLevel: number;
}

export interface WazeData {
  updateTime: number;
  routes: WazeRoute[];
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Line {
  x: number;
  y: number;
}

export interface Bbox {
  minY: number;
  minX: number;
  maxY: number;
  maxX: number;
}

export interface SubRoute {
  toName: string;
  historicTime: number;
  line: Line[];
  bbox: Bbox[];
  fromName: string;
  lenght: number;
  jamLevel: number;
  time: number;
}

export interface Route {
  subRoutes: SubRoute[];
  toName: string;
  historicTime: number;
  line: Line[];
  bbox: Bbox[];
  name: string;
  fromName: string;
  length: number;
  jamLevel: number;
  id: string;
  time: number;
  type: string;
}

export interface UsersOnJam {
  wazersCount: number;
  jamLevel: number;
}

export interface leadAlert {
  numComents: number;
  city: string;
  externalImageId: string;
  numThumbsUp: number;
  street: string;
  subType: string;
  id: string;
  position: [number, number];
  type: string;
  numNotThereReports: number;
}

export interface Irregularities {
  subRoutes: SubRoute[];
  historicTime: number;
  line: Line[];
  leadAlert: leadAlert[];
  length: number;
  type: string;
  toName: string;
  name: string;
  fromName: string;
  jamLevel: number;
  id: string;
  time: number;
}
export interface lengthOfJams {
  jamLevel: number;
  jamLength: number;
}
export interface JsonData {
  usersOnJam: UsersOnJam[];
  routes: Route[];
  irregularities: Irregularities[];
  broadcasterId: string;
  areaName: string;
  bbox: Bbox[];
  name: string;
  isMetric: boolean;
  lengthOfJams: lengthOfJams[];
  updateTime: number;
}
