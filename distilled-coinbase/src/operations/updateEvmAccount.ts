import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { AlreadyExists, IdempotencyError, InvalidRequest, NotFound } from "../errors";

// Input Schema
export const UpdateEvmAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/v2/evm/accounts/{address}" }));
export type UpdateEvmAccountInput = typeof UpdateEvmAccountInput.Type;

// Output Schema
export const UpdateEvmAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type UpdateEvmAccountOutput = typeof UpdateEvmAccountOutput.Type;

// The operation
/**
 * Update an EVM account
 *
 * Updates an existing EVM account. Use this to update the account's name or account-level policy.
 *
 * @param address - The 0x-prefixed address of the EVM account. The address does not need to be checksummed.
 */
export const updateEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateEvmAccountInput,
  outputSchema: UpdateEvmAccountOutput,
  errors: [AlreadyExists, IdempotencyError, InvalidRequest, NotFound],
}));
