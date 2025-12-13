export type TeamColor = "red" | "blue";

export type GamePhase = "setting" | "in_game" | "ended";

export type TimerStatus = "running" | "paused" | "stopped";

export interface Game {
  id: string;
  winnerColor: TeamColor | null;
  note: string;
  createdAt: string;
  redTeamId: string;
  blueTeamId: string;
}

export interface ScoreFragment {
  id: string;
  time: number;
  scoreType: string;
  redFluc: number;
  blueFluc: number;
  createdAt: string;
  gameId: string;
}

export interface Team {
  id: string;
  name: string;
  universityName: string;
  universityAbbrev: string;
  createdAt: string;
}

export interface League {
  id: string;
  leagueName: string;
  leagueOrder: number;
  createdAt: string;
  gameId: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  gameId: string | null;
  createdAt: string;
}

export interface OnError {
  error: string;
}