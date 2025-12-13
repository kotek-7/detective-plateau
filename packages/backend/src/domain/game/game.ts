import * as scoreFragment from "@/domain/scoreFragment.js";
import { Brand, NanoId } from "@/domain/shared.js";
import { TeamId } from "@/domain/team.js";
import { err, ok, Result } from "neverthrow";

export type GameId = Brand<string, "GameId">;
export const GameId = {
  new: (): GameId => NanoId.new() as unknown as GameId,
  reconstruct: (id: string): Result<GameId, string> => NanoId.reconstruct(id) as unknown as Result<GameId, string>,
};

export type Game = {
  readonly id: GameId;
  readonly redTeamId: TeamId;
  readonly blueTeamId: TeamId;
  readonly winnerColor: "red" | "blue" | null;
  readonly scoreFragments: scoreFragment.ScoreFragment[];
  readonly note: string;
  readonly createdAt: Date;
};

export const newGame = (
  id: GameId,
  redTeamId: TeamId,
  blueTeamId: TeamId,
  winnerColor: "red" | "blue" | null,
  scoreFragments: scoreFragment.ScoreFragment[],
  note: string,
  createdAt: Date,
): Result<Game, string> => {
  if (redTeamId === blueTeamId) {
    return err("red team and blue team cannot be the same");
  }

  return ok({
    id,
    redTeamId,
    blueTeamId,
    winnerColor,
    scoreFragments,
    note,
    createdAt,
  });
};

export const reconstructGame = (
  id: GameId,
  redTeamId: TeamId,
  blueTeamId: TeamId,
  winnerColor: "red" | "blue" | null,
  scoreFragments: scoreFragment.ScoreFragment[],
  note: string,
  createdAt: Date,
): Result<Game, string> => {
  if (redTeamId === blueTeamId) {
    return err("red team and blue team cannot be the same");
  }

  return ok({
    id,
    redTeamId,
    blueTeamId,
    winnerColor,
    scoreFragments,
    note,
    createdAt,
  });
};

export const setTeam = (game: Game, redTeamId: TeamId, blueTeamId: TeamId): Result<Game, string> => {
  if (redTeamId === blueTeamId) {
    return err("red team and blue team cannot be the same");
  }

  return ok({
    ...game,
    redTeamId,
    blueTeamId,
  });
};

export const setWinnerColor = (game: Game, winnerColor: "red" | "blue" | null): Game => {
  return {
    ...game,
    winnerColor,
  };
};

export const setNote = (game: Game, note: string): Game => {
  return {
    ...game,
    note,
  };
};

export const setScoreFragments = (game: Game, scoreFragments: scoreFragment.ScoreFragment[]): Result<Game, string> => {
  if (new Set(scoreFragments.map((sf) => sf.id)).size !== scoreFragments.length) {
    return err("duplicate scoreFragment IDs found");
  }

  return ok({
    ...game,
    scoreFragments,
  });
};

export const addScoreFragment = (game: Game, scoreFragment: scoreFragment.ScoreFragment): Result<Game, string> => {
  if (game.scoreFragments.some((sf) => sf.id === scoreFragment.id)) {
    return err("scoreFragment with the same ID already exists in the game");
  }

  return ok({
    ...game,
    scoreFragments: [...game.scoreFragments, scoreFragment],
  });
};

export const updateScoreFragment = (
  game: Game,
  updatedScoreFragment: scoreFragment.ScoreFragment,
): Result<Game, string> => {
  if (!game.scoreFragments.some((sf) => sf.id === updatedScoreFragment.id)) {
    return err("scoreFragment to update not found in the game");
  }

  return ok({
    ...game,
    scoreFragments: game.scoreFragments.map((sf) => (sf.id === updatedScoreFragment.id ? updatedScoreFragment : sf)),
  });
};

export const deleteScoreFragment = (
  game: Game,
  scoreFragmentId: scoreFragment.ScoreFragmentId,
): Result<Game, string> => {
  if (!game.scoreFragments.some((sf) => sf.id === scoreFragmentId)) {
    return err("scoreFragment to delete not found in the game");
  }

  return ok({
    ...game,
    scoreFragments: game.scoreFragments.filter((sf) => sf.id !== scoreFragmentId),
  });
};

export const deleteGame = (game: Game): Result<void, string> => {
  for (const sf of game.scoreFragments) {
    const result = scoreFragment.deleteScoreFragment(sf);
    if (result.isErr()) {
      return err("failed to delete scoreFragment");
    }
  }
  return ok();
};
