import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest, NotFound } from "../errors";

// Input Schema
export const GetSolanaAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/solana/accounts/{address}" }));
export type GetSolanaAccountInput = typeof GetSolanaAccountInput.Type;

// Output Schema
export const GetSolanaAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type GetSolanaAccountOutput = typeof GetSolanaAccountOutput.Type;

// The operation
/**
 * Get a Solana account by address
 *
 * Gets a Solana account by its address.
 *
 * @param address - The base58 encoded address of the Solana account.
 */
export const getSolanaAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSolanaAccountInput,
  outputSchema: GetSolanaAccountOutput,
  errors: [InvalidRequest, NotFound],
}));
