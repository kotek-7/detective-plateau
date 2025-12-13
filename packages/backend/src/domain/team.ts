import { Brand, NanoId } from "@/domain/shared.js";
import { Result } from "neverthrow";

export type TeamId = Brand<string, "TeamId">;
export const TeamId = {
  new: (): TeamId => NanoId.new() as unknown as TeamId,
  reconstruct: (id: string): Result<TeamId, string> => NanoId.reconstruct(id) as unknown as Result<TeamId, string>,
};

export type Team = {
  readonly id: TeamId;
  readonly name: string;
  readonly universityName: string;
  readonly universityAbbrev: string;
  readonly createdAt: Date;
}
