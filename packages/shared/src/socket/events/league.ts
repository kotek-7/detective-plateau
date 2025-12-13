import { League, OnError } from "@/socket/events/commonType.js";

export interface LeagueServerToClientEvents {
  "league:updated": (payload: { leagues: League[]; }) => void;
}

export interface LeagueClientToServerEvents {
  "league:list": (callback: (result: { count: number; leagues: League[]; } | OnError) => void) => void;
  "league:setGame": (
    payload: {
      leagueId: string;
      gameId: string | null;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
}
