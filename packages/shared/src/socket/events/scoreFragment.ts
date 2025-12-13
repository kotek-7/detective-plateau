import { OnError, ScoreFragment } from "@/socket/events/commonType.js";

export interface ScoreFragmentServerToClientEvents {
  "scoreFragment:updated": (payload: { gameId: string; scoreFragments: ScoreFragment[] }) => void;
}

export interface ScoreFragmentClientToServerEvents {
  "scoreFragment:list": (
    payload: {
      gameId: string;
    },
    callback: (result: { count: number; scoreFragments: ScoreFragment[] } | OnError) => void,
  ) => void;
  "scoreFragment:create": (
    payload: {
      time: number;
      scoreType: string;
      redFluc: number;
      blueFluc: number;
      gameId: string;
    },
    callback: (
      result:
        | {
            scoreFragmentId: string;
          }
        | OnError,
    ) => void,
  ) => void;
  "scoreFragment:delete": (
    payload: {
      scoreFragmentId: string;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
  "scoreFragment:update": (
    payload: {
      scoreFragmentId: string;
      time: number;
      scoreType: string;
      redFluc: number;
      blueFluc: number;
    },
    callback: (result: {} | OnError) => void,
  ) => void;
}
