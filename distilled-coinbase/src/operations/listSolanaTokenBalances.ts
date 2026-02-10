import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListSolanaTokenBalancesInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  network: Schema.Literal("solana", "solana-devnet").pipe(T.PathParam()),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/solana/token-balances/{network}/{address}" }));
export type ListSolanaTokenBalancesInput = typeof ListSolanaTokenBalancesInput.Type;

// Output Schema
export const ListSolanaTokenBalancesOutput = Schema.Struct({
  balances: Schema.Array(Schema.Struct({
    amount: Schema.Struct({
      amount: Schema.String,
      decimals: Schema.Number,
    }),
    token: Schema.Struct({
      symbol: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      mintAddress: Schema.String,
    }),
  })),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListSolanaTokenBalancesOutput = typeof ListSolanaTokenBalancesOutput.Type;

// The operation
/**
 * List Solana token balances
 *
 * Lists the token balances of a Solana address on a given network. The balances include SPL tokens and the native SOL token. The response is paginated, and by default, returns 20 balances per page.
 * **Note:** This endpoint is still under development and does not yet provide strong availability or freshness guarantees. Freshness and availability of new token balances will improve over the coming weeks.
 *
 * @param address - The base58 encoded Solana address to get balances for.
 * @param network - The human-readable network name to get the balances for.
 * @param pageSize - The number of balances to return per page.
 * @param pageToken - The token for the next page of balances. Will be empty if there are no more balances to fetch.
 */
export const listSolanaTokenBalances = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListSolanaTokenBalancesInput,
  outputSchema: ListSolanaTokenBalancesOutput,
}));
