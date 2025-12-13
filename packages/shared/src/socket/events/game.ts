import { Game, OnError, TeamColor } from "@/socket/events/commonType.js";
export interface GameServerToClientEvents {
  "game:updated": (payload: { updatedGame: Game }) => void;
}

export interface GameClientToServerEvents {
  "game:list": (callback: (result: { count: string; games: Game[] } | OnError) => void) => void;
  "game:get": (
    payload: {
      gameId: string;
    },
    callback: (result: Game | OnError) => void,
  ) => void;
  "game:create": (
    payload: {
      winnerColor: TeamColor | null;
      note: string;
      redTeamId: string | null;
      blueTeamId: string | null;
    },
    callback: (
      result:
        | {
            gameId: string;
          }
        | OnError,
    ) => void,
  ) => void;
  "game:setWinner": (
    payload: {
      id: string;
      winnerColor: TeamColor | null;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
  "game:setNote": (
    payload: {
      gameId: string;
      note: string;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
  "game:setTeams": (
    payload: {
      gameId: string;
      redTeamId: string;
      blueTeamId: string;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
  "game:update": (
    payload: {
      id: string;
      winnerColor: TeamColor | null;
      note: string;
      redTeamId: string | null;
      blueTeamId: string | null;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
}
