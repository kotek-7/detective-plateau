import { OnError } from "@/socket/events/commonType.js";

export interface CurrentGameServerToClientEvents {
  "currentGame:updated": (payload: { gameId: string | null }) => void;
}

export interface CurrentGameClientToServerEvents {
  "currentGame:get": (callback: (result: { gameId: string | null } | OnError) => void) => void;
  "currentGame:set": (
    payload: {
      gameId: string | null;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
}
