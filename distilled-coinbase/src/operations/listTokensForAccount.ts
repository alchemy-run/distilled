import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest } from "../errors";

// Input Schema
export const ListTokensForAccountInput = Schema.Struct({
  network: Schema.Literals(["base", "base-sepolia"]).pipe(T.PathParam()),
  address: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v2/data/evm/token-ownership/{network}/{address}",
  }),
);
export type ListTokensForAccountInput = typeof ListTokensForAccountInput.Type;

// Output Schema
export const ListTokensForAccountOutput = Schema.Struct({
  accountAddress: Schema.optional(Schema.String),
  tokenAddresses: Schema.optional(Schema.Array(Schema.String)),
  totalCount: Schema.optional(Schema.Number),
});
export type ListTokensForAccountOutput = typeof ListTokensForAccountOutput.Type;

// The operation
/**
 * List token addresses for account
 *
 * Retrieve all ERC-20 token contract addresses that an account has ever received tokens from.
 * Analyzes transaction history to discover token interactions.
 *
 * @param network - The blockchain network to query.
 * @param address - The account address to analyze for token interactions.
 */
export const listTokensForAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListTokensForAccountInput,
    outputSchema: ListTokensForAccountOutput,
    errors: [InvalidRequest],
  }),
);
