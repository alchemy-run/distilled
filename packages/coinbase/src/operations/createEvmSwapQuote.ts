import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateEvmSwapQuoteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    network: Schema.Literals([
      "base",
      "ethereum",
      "arbitrum",
      "optimism",
      "polygon",
    ]),
    toToken: Schema.String,
    fromToken: Schema.String,
    fromAmount: Schema.String,
    taker: Schema.String,
    signerAddress: Schema.optional(Schema.String),
    gasPrice: Schema.optional(Schema.String),
    slippageBps: Schema.optional(Schema.Number),
  }).pipe(T.Http({ method: "POST", path: "/v2/evm/swaps" }));
export type CreateEvmSwapQuoteInput = typeof CreateEvmSwapQuoteInput.Type;

// Output Schema
export const CreateEvmSwapQuoteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type CreateEvmSwapQuoteOutput = typeof CreateEvmSwapQuoteOutput.Type;

// The operation
/**
 * Create a swap quote
 *
 * Create a swap quote, which includes the payload to sign as well as the transaction data needed to execute the swap. The developer is responsible for signing the payload and submitting the transaction to the network in order to execute the swap.
 *
 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const createEvmSwapQuote = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEvmSwapQuoteInput,
  outputSchema: CreateEvmSwapQuoteOutput,
}));
