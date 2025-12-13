import { GameClientToServerEvents, GameServerToClientEvents } from "@/socket/events/game.js";
import {
  ScoreFragmentClientToServerEvents,
  ScoreFragmentServerToClientEvents,
} from "@/socket/events/scoreFragment.js";
import { TeamClientToServerEvents, TeamServerToClientEvents } from "@/socket/events/team.js";
import { TournamentClientToServerEvents, TournamentServerToClientEvents } from "@/socket/events/tournament.js";
import { LeagueClientToServerEvents, LeagueServerToClientEvents } from "@/socket/events/league.js";
import { GameTimerClientToServerEvents, GameTimerServerToClientEvents } from "@/socket/events/gameTimer.js";

export type ServerToClientEvents = GameServerToClientEvents &
  ScoreFragmentServerToClientEvents &
  TeamServerToClientEvents &
  TournamentServerToClientEvents &
  LeagueServerToClientEvents &
  GameTimerServerToClientEvents;

export type ClientToServerEvents = GameClientToServerEvents &
  ScoreFragmentClientToServerEvents &
  TeamClientToServerEvents &
  TournamentClientToServerEvents &
  LeagueClientToServerEvents &
  GameTimerClientToServerEvents;

export interface InterServerEvents {}

export interface SocketData {}
