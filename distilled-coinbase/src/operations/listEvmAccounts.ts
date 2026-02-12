import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListEvmAccountsInput = Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/accounts" }));
export type ListEvmAccountsInput = typeof ListEvmAccountsInput.Type;

// Output Schema
export const ListEvmAccountsOutput = Schema.Struct({
  accounts: Schema.Array(Schema.Struct({
    address: Schema.String,
    name: Schema.optional(Schema.String),
    policies: Schema.optional(Schema.Array(Schema.String)),
    createdAt: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  })),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListEvmAccountsOutput = typeof ListEvmAccountsOutput.Type;

// The operation
/**
 * List EVM accounts
 *
 * Lists the EVM accounts belonging to the developer's CDP Project.
 * The response is paginated, and by default, returns 20 accounts per page.
 *
 * @param pageSize - The number of resources to return per page.
 * @param pageToken - The token for the next page of resources, if any.
 */
export const listEvmAccounts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListEvmAccountsInput,
  outputSchema: ListEvmAccountsOutput,
}));
