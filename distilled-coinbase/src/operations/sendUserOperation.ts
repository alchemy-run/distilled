import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import {
  Forbidden,
  InvalidSignature,
  NotFound,
  PaymentMethodRequired,
} from "../errors";

// Input Schema
export const SendUserOperationInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  userOpHash: Schema.String.pipe(T.PathParam()),
  signature: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/v2/evm/smart-accounts/{address}/user-operations/{userOpHash}/send",
  }),
);
export type SendUserOperationInput = typeof SendUserOperationInput.Type;

// Output Schema
export const SendUserOperationOutput = Schema.Struct({
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
export type SendUserOperationOutput = typeof SendUserOperationOutput.Type;

// The operation
/**
 * Send a user operation
 *
 * Sends a user operation with a signature.
 * The payload to sign must be the `userOpHash` field of the user operation. This hash should be signed directly (not using `personal_sign` or EIP-191 message hashing).
 * The signature must be 65 bytes in length, consisting of: - 32 bytes for the `r` value - 32 bytes for the `s` value - 1 byte for the `v` value (must be 27 or 28)
 * If using the CDP Paymaster, the user operation must be signed and sent within 2 minutes of being prepared.
 *
 * @param address - The address of the Smart Account to send the user operation from.
 * @param userOpHash - The hash of the user operation to send.
 */
export const sendUserOperation = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SendUserOperationInput,
  outputSchema: SendUserOperationOutput,
  errors: [Forbidden, InvalidSignature, NotFound, PaymentMethodRequired],
}));
