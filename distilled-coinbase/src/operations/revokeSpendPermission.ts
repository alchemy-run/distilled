import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest, NotFound } from "../errors";

// Input Schema
export const RevokeSpendPermissionInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  network: Schema.Literals([
    "base",
    "base-sepolia",
    "ethereum",
    "ethereum-sepolia",
    "optimism",
    "arbitrum",
    "avalanche",
    "polygon",
  ]),
  permissionHash: Schema.String,
  paymasterUrl: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v2/evm/smart-accounts/{address}/spend-permissions/revoke",
  }),
  T.WalletAuth(),
);
export type RevokeSpendPermissionInput = typeof RevokeSpendPermissionInput.Type;

// Output Schema
export const RevokeSpendPermissionOutput = Schema.Struct({
  network: Schema.Literals([
    "base-sepolia",
    "base",
    "arbitrum",
    "optimism",
    "zora",
    "polygon",
    "bnb",
    "avalanche",
    "ethereum",
    "ethereum-sepolia",
  ]),
  userOpHash: Schema.String,
  calls: Schema.Array(
    Schema.Struct({
      to: Schema.String,
      value: Schema.String,
      data: Schema.String,
      overrideGasLimit: Schema.optional(Schema.String),
    }),
  ),
  status: Schema.Literals([
    "pending",
    "signed",
    "broadcast",
    "complete",
    "dropped",
    "failed",
  ]),
  transactionHash: Schema.optional(Schema.String),
  receipts: Schema.optional(
    Schema.Array(
      Schema.Struct({
        revert: Schema.optional(
          Schema.Struct({
            data: Schema.String,
            message: Schema.String,
          }),
        ),
        transactionHash: Schema.optional(Schema.String),
        blockHash: Schema.optional(Schema.String),
        blockNumber: Schema.optional(Schema.Number),
        gasUsed: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type RevokeSpendPermissionOutput =
  typeof RevokeSpendPermissionOutput.Type;

// The operation
/**
 * Revoke a spend permission
 *
 * Revokes an existing spend permission.
 *
 * @param address - The address of the Smart account this spend permission is valid for.
 */
export const revokeSpendPermission = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RevokeSpendPermissionInput,
    outputSchema: RevokeSpendPermissionOutput,
    errors: [InvalidRequest, NotFound],
    walletAuth: true,
  }),
);
