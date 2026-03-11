import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmSwapPriceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  network: Schema.String,
  toToken: Schema.String,
  fromToken: Schema.String,
  fromAmount: Schema.String,
  taker: Schema.String,
  signerAddress: Schema.optional(Schema.String),
  gasPrice: Schema.optional(Schema.String),
  slippageBps: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/swaps/quote" }));
export type GetEvmSwapPriceInput = typeof GetEvmSwapPriceInput.Type;

// Output Schema
export const GetEvmSwapPriceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetEvmSwapPriceOutput = typeof GetEvmSwapPriceOutput.Type;

// The operation
/**
 * Get a price estimate for a swap
 *
 * Get a price estimate for a swap between two tokens on an EVM network.
 */
export const getEvmSwapPrice = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetEvmSwapPriceInput,
  outputSchema: GetEvmSwapPriceOutput,
}));
