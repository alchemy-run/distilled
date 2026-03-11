import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PrepareAndSendUserOperationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    address: Schema.String.pipe(T.PathParam()),
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
    calls: Schema.Array(
      Schema.Struct({
        to: Schema.String,
        value: Schema.String,
        data: Schema.String,
        overrideGasLimit: Schema.optional(Schema.String),
      }),
    ),
    paymasterUrl: Schema.optional(Schema.Struct({})),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/evm/smart-accounts/{address}/user-operations/prepare-and-send",
    }),
  );
export type PrepareAndSendUserOperationInput =
  typeof PrepareAndSendUserOperationInput.Type;

// Output Schema
export const PrepareAndSendUserOperationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PrepareAndSendUserOperationOutput =
  typeof PrepareAndSendUserOperationOutput.Type;

// The operation
/**
 * Prepare and send a user operation for EVM Smart Account
 *
 * Prepares, signs, and sends a user operation for an EVM Smart Account. This API can be used only if the owner on Smart Account is a CDP EVM Account.
 *
 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param address - The address of the EVM Smart Account to execute the user operation from.
 */
export const prepareAndSendUserOperation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrepareAndSendUserOperationInput,
    outputSchema: PrepareAndSendUserOperationOutput,
  }),
);
