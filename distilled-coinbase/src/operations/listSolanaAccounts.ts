import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListSolanaAccountsInput = Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/solana/accounts" }));
export type ListSolanaAccountsInput = typeof ListSolanaAccountsInput.Type;

// Output Schema
export const ListSolanaAccountsOutput = Schema.Struct({
  accounts: Schema.Array(Schema.Struct({
    address: Schema.String,
    name: Schema.optional(Schema.String),
    policies: Schema.optional(Schema.Array(Schema.String)),
    createdAt: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  })),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListSolanaAccountsOutput = typeof ListSolanaAccountsOutput.Type;

// The operation
/**
 * List Solana accounts or get account by name
 *
 * Lists the Solana accounts belonging to the developer.
 * The response is paginated, and by default, returns 20 accounts per page.
 * If a name is provided, the response will contain only the account with that name.
 *
 * @param pageSize - The number of resources to return per page.
 * @param pageToken - The token for the next page of resources, if any.
 */
export const listSolanaAccounts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListSolanaAccountsInput,
  outputSchema: ListSolanaAccountsOutput,
}));
