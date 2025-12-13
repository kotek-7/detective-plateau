import { Game, GameId, newGame } from "@/domain/game/game.js";
import { GameRepository } from "@/domain/game/gameRepositoroy.js";
import { TeamId } from "@/domain/team.js";
import { Result } from "neverthrow";

export const listGames = async (gameRepository: GameRepository): Promise<Result<Game[], string>> => {
  const games = await gameRepository.findAll();
  return games;
};

export const getGameById = async (gameRepository: GameRepository, id: GameId): Promise<Result<Game, string>> => {
  const game = await gameRepository.findById(id);
  return game;
}

export interface createGameDto {
  readonly redTeamId: TeamId;
  readonly blueTeamId: TeamId;
  readonly winnerColor: "red" | "blue" | null;
  readonly note: string;
}

export const createGame = async (
  gameRepository: GameRepository,
  gameData: createGameDto,
): Promise<Result<void, string>> => {
  const gameResult = newGame(GameId.new(0), gameData.redTeamId, gameData.blueTeamId, gameData.winnerColor, [], gameData.note, new Date());  // なおす
  if (gameResult.isErr()) {
    return gameResult.map(() => {});
  }
  const result = await gameRepository.save(gameResult.value);
  return result;
};