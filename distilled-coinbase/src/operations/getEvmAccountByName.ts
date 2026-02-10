import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmAccountByNameInput = Schema.Struct({
  name: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/accounts/by-name/{name}" }));
export type GetEvmAccountByNameInput = typeof GetEvmAccountByNameInput.Type;

// Output Schema
export const GetEvmAccountByNameOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type GetEvmAccountByNameOutput = typeof GetEvmAccountByNameOutput.Type;

// The operation
/**
 * Get an EVM account by name
 *
 * Gets an EVM account by its name.
 *
 * @param name - The name of the EVM account.
 */
export const getEvmAccountByName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEvmAccountByNameInput,
  outputSchema: GetEvmAccountByNameOutput,
}));
