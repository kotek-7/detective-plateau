import { Team } from "@/socket/events/commonType.js";
import { OnError } from "@/socket/events/commonType.js";

export interface TeamServerToClientEvents {}

export interface TeamClientToServerEvents {
  "team:list": (callback: (result: { count: number; teams: Team[]; } | OnError) => void) => void;
}
