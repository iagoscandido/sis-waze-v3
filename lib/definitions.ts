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
