import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateSpendPermissionInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  network: Schema.Literal("base", "base-sepolia", "ethereum", "ethereum-sepolia", "optimism", "arbitrum", "avalanche", "polygon"),
  spender: Schema.String,
  token: Schema.String,
  allowance: Schema.String,
  period: Schema.String,
  start: Schema.String,
  end: Schema.String,
  salt: Schema.optional(Schema.String),
  extraData: Schema.optional(Schema.String),
  paymasterUrl: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/smart-accounts/{address}/spend-permissions" }), T.WalletAuth());
export type CreateSpendPermissionInput = typeof CreateSpendPermissionInput.Type;

// Output Schema
export const CreateSpendPermissionOutput = Schema.Struct({
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
export type CreateSpendPermissionOutput = typeof CreateSpendPermissionOutput.Type;

// The operation
/**
 * Create a spend permission
 *
 * Creates a spend permission for the given smart account address.
 *
 * @param address - The address of the Smart Account to create the spend permission for.
 */
export const createSpendPermission = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateSpendPermissionInput,
  outputSchema: CreateSpendPermissionOutput,
  walletAuth: true,
}));
