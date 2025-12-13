import { GamePhase, OnError, TimerStatus } from "@/socket/events/commonType.js";

export interface GameTimerServerToClientEvents {
  "gameTimer:updated": (payload: {
    phase: GamePhase;
    timerStatus: TimerStatus;
    elapsedMs: number;
    resumedAt: string | null;
  }) => void;
}
export interface GameTimerClientToServerEvents {
  "gameTimer:get": (
    callback: (
      result: { phase: GamePhase; timerStatus: TimerStatus; elapsedMs: number; resumedAt: string | null } | OnError,
    ) => void,
  ) => void;
  "gameTimer:resume": (callback: (result: {} | OnError) => void) => void;
  "gameTimer:pause": (callback: (result: {} | OnError) => void) => void;
  "gameTimer:skip": (callback: (result: {} | OnError) => void) => void;
  "gameTimer:reset": (callback: (result: {} | OnError) => void) => void;
}
