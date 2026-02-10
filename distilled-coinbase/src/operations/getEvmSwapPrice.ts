import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmSwapPriceInput = Schema.Struct({
  network: Schema.Literal("base", "ethereum", "arbitrum", "optimism"),
  toToken: Schema.String,
  fromToken: Schema.String,
  fromAmount: Schema.String,
  taker: Schema.String,
  signerAddress: Schema.optional(Schema.String),
  gasPrice: Schema.optional(Schema.String),
  slippageBps: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/swaps/quote" }));
export type GetEvmSwapPriceInput = typeof GetEvmSwapPriceInput.Type;

// Output Schema
export const GetEvmSwapPriceOutput = Schema.Union(Schema.Struct({
  blockNumber: Schema.String,
  toAmount: Schema.String,
  toToken: Schema.String,
  fees: Schema.Struct({
    gasFee: Schema.Struct({
      amount: Schema.String,
      token: Schema.String,
    }),
    protocolFee: Schema.Struct({
      amount: Schema.String,
      token: Schema.String,
    }),
  }),
  issues: Schema.Struct({
    allowance: Schema.NullOr(Schema.Struct({
      currentAllowance: Schema.String,
      spender: Schema.String,
    })),
    balance: Schema.NullOr(Schema.Struct({
      token: Schema.String,
      currentBalance: Schema.String,
      requiredBalance: Schema.String,
    })),
    simulationIncomplete: Schema.Boolean,
  }),
  liquidityAvailable: Schema.Literal(true),
  minToAmount: Schema.String,
  fromAmount: Schema.String,
  fromToken: Schema.String,
  gas: Schema.NullOr(Schema.String),
  gasPrice: Schema.String,
}), Schema.Struct({
  liquidityAvailable: Schema.Literal(false),
}));
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
