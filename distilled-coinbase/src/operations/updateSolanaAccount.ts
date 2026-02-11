import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { AlreadyExists, IdempotencyError, InvalidRequest, NotFound } from "../errors";

// Input Schema
export const UpdateSolanaAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/v2/solana/accounts/{address}" }));
export type UpdateSolanaAccountInput = typeof UpdateSolanaAccountInput.Type;

// Output Schema
export const UpdateSolanaAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type UpdateSolanaAccountOutput = typeof UpdateSolanaAccountOutput.Type;

// The operation
/**
 * Update a Solana account
 *
 * Updates an existing Solana account. Use this to update the account's name or account-level policy.
 *
 * @param address - The base58 encoded address of the Solana account.
 */
export const updateSolanaAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateSolanaAccountInput,
  outputSchema: UpdateSolanaAccountOutput,
  errors: [AlreadyExists, IdempotencyError, InvalidRequest, NotFound],
}));
