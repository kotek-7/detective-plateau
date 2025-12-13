import { OnError, Tournament } from "@/socket/events/commonType.js";

export interface TournamentServerToClientEvents {
  "tournament:updated": (payload: { tournaments: Tournament[]; }) => void;
}

export interface TournamentClientToServerEvents {
  "tournament:list": (
    callback: (result: { count: number; tournaments: Tournament[]; } | OnError) => void,
  ) => void;
  "tournament:setGame": (
    payload: {
      tournamentId: string;
      gameId: string | null;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
}
