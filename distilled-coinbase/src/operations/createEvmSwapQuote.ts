import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, InvalidRequest } from "../errors";

// Input Schema
export const CreateEvmSwapQuoteInput = Schema.Struct({
  network: Schema.Literal("base", "ethereum", "arbitrum", "optimism"),
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
export const CreateEvmSwapQuoteOutput = Schema.Union(Schema.Struct({
  permit2: Schema.NullOr(Schema.Struct({
    hash: Schema.String,
    eip712: Schema.Struct({
      domain: Schema.Struct({
        name: Schema.optional(Schema.String),
        version: Schema.optional(Schema.String),
        chainId: Schema.optional(Schema.Number),
        verifyingContract: Schema.optional(Schema.String),
        salt: Schema.optional(Schema.String),
      }),
      types: Schema.Unknown,
      primaryType: Schema.String,
      message: Schema.Unknown,
    }),
  })),
  transaction: Schema.Struct({
    to: Schema.String,
    data: Schema.String,
    gas: Schema.String,
    gasPrice: Schema.String,
    value: Schema.String,
  }),
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
}), Schema.Struct({
  liquidityAvailable: Schema.Literal(false),
}));
export type CreateEvmSwapQuoteOutput = typeof CreateEvmSwapQuoteOutput.Type;

// The operation
/**
 * Create a swap quote
 *
 * Create a swap quote, which includes the payload to sign as well as the transaction data needed to execute the swap. The developer is responsible for signing the payload and submitting the transaction to the network in order to execute the swap.
 */
export const createEvmSwapQuote = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEvmSwapQuoteInput,
  outputSchema: CreateEvmSwapQuoteOutput,
  errors: [Forbidden, InvalidRequest],
}));
