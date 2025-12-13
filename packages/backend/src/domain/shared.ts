import { customAlphabet } from "nanoid";
import { err, ok, Result } from "neverthrow";

declare const brand: unique symbol;
export type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

export type NanoId = Brand<string, "NanoId">;
export const NanoId = {
  new: (): NanoId => {
    const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 12);
    return nanoid() as NanoId;
  },
  reconstruct: (id: string): Result<NanoId, string> => {
    if (!isValidNanoId(id)) return err("invalid nanoid format");
    return ok(id);
  },
};
const isValidNanoId = (value: string): value is NanoId => {
  const nanoidRegex = /^[0-9a-zA-Z]{12}$/;
  return nanoidRegex.test(value);
}