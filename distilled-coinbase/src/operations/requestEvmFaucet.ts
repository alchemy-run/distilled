import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RequestEvmFaucetInput = Schema.Struct({
  network: Schema.Literal("base-sepolia", "ethereum-sepolia", "ethereum-hoodi"),
  address: Schema.String,
  token: Schema.Literal("eth", "usdc", "eurc", "cbbtc"),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/faucet" }));
export type RequestEvmFaucetInput = typeof RequestEvmFaucetInput.Type;

// Output Schema
export const RequestEvmFaucetOutput = Schema.Struct({
  transactionHash: Schema.String,
});
export type RequestEvmFaucetOutput = typeof RequestEvmFaucetOutput.Type;

// The operation
/**
 * Request funds on EVM test networks
 *
 * Request funds from the CDP Faucet on supported EVM test networks.
 * Faucets are available for ETH, USDC, EURC, and cbBTC on Base Sepolia and Ethereum Sepolia, and for ETH only on Ethereum Hoodi.
 * To prevent abuse, we enforce rate limits within a rolling 24-hour window to control the amount of funds that can be requested.
 * These limits are applied at both the CDP User level and the blockchain address level.
 * A single blockchain address cannot exceed the specified limits, even if multiple users submit requests to the same address.
 */
export const requestEvmFaucet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RequestEvmFaucetInput,
  outputSchema: RequestEvmFaucetOutput,
}));
