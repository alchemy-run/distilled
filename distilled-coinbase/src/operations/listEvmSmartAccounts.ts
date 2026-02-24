import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest } from "../errors";

// Input Schema
export const ListEvmSmartAccountsInput = Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/smart-accounts" }));
export type ListEvmSmartAccountsInput = typeof ListEvmSmartAccountsInput.Type;

// Output Schema
export const ListEvmSmartAccountsOutput = Schema.Struct({
  accounts: Schema.Array(
    Schema.Struct({
      address: Schema.String,
      owners: Schema.Array(Schema.String),
      name: Schema.optional(Schema.String),
      policies: Schema.optional(Schema.Array(Schema.String)),
      createdAt: Schema.optional(Schema.String),
      updatedAt: Schema.optional(Schema.String),
    }),
  ),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListEvmSmartAccountsOutput = typeof ListEvmSmartAccountsOutput.Type;

// The operation
/**
 * List Smart Accounts
 *
 * Lists the Smart Accounts belonging to the developer's CDP Project.
 * The response is paginated, and by default, returns 20 accounts per page.
 *
 * @param pageSize - The number of resources to return per page.
 * @param pageToken - The token for the next page of resources, if any.
 */
export const listEvmSmartAccounts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListEvmSmartAccountsInput,
    outputSchema: ListEvmSmartAccountsOutput,
    errors: [InvalidRequest],
  }),
);
