import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetUserOperationInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  userOpHash: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/smart-accounts/{address}/user-operations/{userOpHash}" }));
export type GetUserOperationInput = typeof GetUserOperationInput.Type;

// Output Schema
export const GetUserOperationOutput = Schema.Struct({
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
export type GetUserOperationOutput = typeof GetUserOperationOutput.Type;

// The operation
/**
 * Get a user operation
 *
 * Gets a user operation by its hash.
 *
 * @param address - The address of the Smart Account the user operation belongs to.
 * @param userOpHash - The hash of the user operation to fetch.
 */
export const getUserOperation = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetUserOperationInput,
  outputSchema: GetUserOperationOutput,
}));
