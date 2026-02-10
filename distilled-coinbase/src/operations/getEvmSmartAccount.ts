import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmSmartAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/smart-accounts/{address}" }));
export type GetEvmSmartAccountInput = typeof GetEvmSmartAccountInput.Type;

// Output Schema
export const GetEvmSmartAccountOutput = Schema.Struct({
  address: Schema.String,
  owners: Schema.Array(Schema.String),
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type GetEvmSmartAccountOutput = typeof GetEvmSmartAccountOutput.Type;

// The operation
/**
 * Get a Smart Account by address
 *
 * Gets a Smart Account by its address.
 *
 * @param address - The 0x-prefixed address of the Smart Account.
 */
export const getEvmSmartAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEvmSmartAccountInput,
  outputSchema: GetEvmSmartAccountOutput,
}));
