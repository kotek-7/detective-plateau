import { Brand, NanoId } from "@/domain/shared.js";
import { err, ok, Result } from "neverthrow";

export type ScoreFragmentId = Brand<string, "ScoreFragmentId">;
export const ScoreFragmentId = {
  new: (): ScoreFragmentId => NanoId.new() as unknown as ScoreFragmentId,
  reconstruct: (id: string): Result<ScoreFragmentId, string> => NanoId.reconstruct(id) as unknown as Result<ScoreFragmentId, string>,
};

export type ScoreFragment = {
  readonly id: ScoreFragmentId;
  readonly time: number;
  readonly scoreType: string;
  readonly redFluc: number;
  readonly blueFluc: number;
  readonly createdAt: string;
  readonly gameId: number;
}

export const newScoreFragment = (
  id: ScoreFragmentId,
  time: number,
  scoreType: string,
  redFluc: number,
  blueFluc: number,
  createdAt: string,
  gameId: number,
): ScoreFragment => {
  return {
    id,
    time,
    scoreType,
    redFluc,
    blueFluc,
    createdAt,
    gameId,
  };
}

export const deleteScoreFragment = (scoreFragment: ScoreFragment): Result<void, string> => {
  return ok();
};