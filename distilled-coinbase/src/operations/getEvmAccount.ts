import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/accounts/{address}" }));
export type GetEvmAccountInput = typeof GetEvmAccountInput.Type;

// Output Schema
export const GetEvmAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type GetEvmAccountOutput = typeof GetEvmAccountOutput.Type;

// The operation
/**
 * Get an EVM account by address
 *
 * Gets an EVM account by its address.
 *
 * @param address - The 0x-prefixed address of the EVM account. The address does not need to be checksummed.
 */
export const getEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEvmAccountInput,
  outputSchema: GetEvmAccountOutput,
}));
