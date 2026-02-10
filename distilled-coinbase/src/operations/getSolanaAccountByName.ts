import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSolanaAccountByNameInput = Schema.Struct({
  name: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/solana/accounts/by-name/{name}" }));
export type GetSolanaAccountByNameInput = typeof GetSolanaAccountByNameInput.Type;

// Output Schema
export const GetSolanaAccountByNameOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type GetSolanaAccountByNameOutput = typeof GetSolanaAccountByNameOutput.Type;

// The operation
/**
 * Get a Solana account by name
 *
 * Gets a Solana account by its name.
 *
 * @param name - The name of the Solana account.
 */
export const getSolanaAccountByName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSolanaAccountByNameInput,
  outputSchema: GetSolanaAccountByNameOutput,
}));
