import { Game, GameId } from "@/domain/game/game.js";
import { Result } from "neverthrow";

export interface GameRepository {
  save(game: Game): Promise<Result<void, string>>;
  findById(id: GameId): Promise<Result<Game, string>>;
  findAll(): Promise<Result<Game[], string>>;
  delete(id: GameId): Promise<Result<void, string>>;
}
