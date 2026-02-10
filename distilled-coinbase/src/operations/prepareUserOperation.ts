import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PrepareUserOperationInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  network: Schema.Literal("base-sepolia", "base", "arbitrum", "optimism", "zora", "polygon", "bnb", "avalanche", "ethereum", "ethereum-sepolia"),
  calls: Schema.Array(Schema.Struct({
    to: Schema.String,
    value: Schema.String,
    data: Schema.String,
    overrideGasLimit: Schema.optional(Schema.String),
  })),
  paymasterUrl: Schema.optional(Schema.String),
  dataSuffix: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/smart-accounts/{address}/user-operations" }));
export type PrepareUserOperationInput = typeof PrepareUserOperationInput.Type;

// Output Schema
export const PrepareUserOperationOutput = Schema.Struct({
  network: Schema.Literal("base-sepolia", "base", "arbitrum", "optimism", "zora", "polygon", "bnb", "avalanche", "ethereum", "ethereum-sepolia"),
  userOpHash: Schema.String,
  calls: Schema.Array(Schema.Struct({
    to: Schema.String,
    value: Schema.String,
    data: Schema.String,
    overrideGasLimit: Schema.optional(Schema.String),
  })),
  status: Schema.Literal("pending", "signed", "broadcast", "complete", "dropped", "failed"),
  transactionHash: Schema.optional(Schema.String),
  receipts: Schema.optional(Schema.Array(Schema.Struct({
    revert: Schema.optional(Schema.Struct({
      data: Schema.String,
      message: Schema.String,
    })),
    transactionHash: Schema.optional(Schema.String),
    blockHash: Schema.optional(Schema.String),
    blockNumber: Schema.optional(Schema.Number),
    gasUsed: Schema.optional(Schema.String),
  }))),
});
export type PrepareUserOperationOutput = typeof PrepareUserOperationOutput.Type;

// The operation
/**
 * Prepare a user operation
 *
 * Prepares a new user operation on a Smart Account for a specific network.
 *
 * @param address - The address of the Smart Account to create the user operation on.
 */
export const prepareUserOperation = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrepareUserOperationInput,
  outputSchema: PrepareUserOperationOutput,
}));
