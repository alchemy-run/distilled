import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateEvmSmartAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/v2/evm/smart-accounts/{address}" }));
export type UpdateEvmSmartAccountInput = typeof UpdateEvmSmartAccountInput.Type;

// Output Schema
export const UpdateEvmSmartAccountOutput = Schema.Struct({
  address: Schema.String,
  owners: Schema.Array(Schema.String),
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type UpdateEvmSmartAccountOutput = typeof UpdateEvmSmartAccountOutput.Type;

// The operation
/**
 * Update an EVM Smart Account
 *
 * Updates an existing EVM smart account. Use this to update the smart account's name.
 *
 * @param address - The 0x-prefixed address of the EVM smart account. The address does not need to be checksummed.
 */
export const updateEvmSmartAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateEvmSmartAccountInput,
  outputSchema: UpdateEvmSmartAccountOutput,
}));
