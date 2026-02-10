import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListEvmTokenBalancesInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  network: Schema.Literal("base", "base-sepolia", "ethereum").pipe(T.PathParam()),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/token-balances/{network}/{address}" }));
export type ListEvmTokenBalancesInput = typeof ListEvmTokenBalancesInput.Type;

// Output Schema
export const ListEvmTokenBalancesOutput = Schema.Struct({
  balances: Schema.Array(Schema.Struct({
    amount: Schema.Struct({
      amount: Schema.String,
      decimals: Schema.Number,
    }),
    token: Schema.Struct({
      network: Schema.Literal("base", "base-sepolia", "ethereum"),
      symbol: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      contractAddress: Schema.String,
    }),
  })),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListEvmTokenBalancesOutput = typeof ListEvmTokenBalancesOutput.Type;

// The operation
/**
 * List EVM token balances
 *
 * Lists the token balances of an EVM address on a given network. The balances include ERC-20 tokens and the native gas token (usually ETH). The response is paginated, and by default, returns 20 balances per page.
 * **Note:** This endpoint is still under development and does not yet provide strong freshness guarantees. Specifically, balances of new tokens can, on occasion, take up to ~30 seconds to appear, while balances of tokens already belonging to an address will generally be close to chain tip. Freshness of new token balances will improve over the coming weeks.
 *
 * @param address - The 0x-prefixed EVM address to get balances for. The address does not need to be checksummed.
 * @param network - The human-readable network name to get the balances for.
 * @param pageSize - The number of resources to return per page.
 * @param pageToken - The token for the next page of resources, if any.
 */
export const listEvmTokenBalances = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListEvmTokenBalancesInput,
  outputSchema: ListEvmTokenBalancesOutput,
}));
