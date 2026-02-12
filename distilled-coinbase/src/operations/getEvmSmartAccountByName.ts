import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest, NotFound } from "../errors";

// Input Schema
export const GetEvmSmartAccountByNameInput = Schema.Struct({
  name: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/smart-accounts/by-name/{name}" }));
export type GetEvmSmartAccountByNameInput = typeof GetEvmSmartAccountByNameInput.Type;

// Output Schema
export const GetEvmSmartAccountByNameOutput = Schema.Struct({
  address: Schema.String,
  owners: Schema.Array(Schema.String),
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type GetEvmSmartAccountByNameOutput = typeof GetEvmSmartAccountByNameOutput.Type;

// The operation
/**
 * Get a Smart Account by name
 *
 * Gets a Smart Account by its name.
 *
 * @param name - The name of the Smart Account.
 */
export const getEvmSmartAccountByName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEvmSmartAccountByNameInput,
  outputSchema: GetEvmSmartAccountByNameOutput,
  errors: [InvalidRequest, NotFound],
}));
