import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AddEndUserEvmSmartAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.PathParam()),
    enableSpendPermissions: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/end-users/{userId}/evm-smart-account",
    }),
  );
export type AddEndUserEvmSmartAccountInput =
  typeof AddEndUserEvmSmartAccountInput.Type;

// Output Schema
export const AddEndUserEvmSmartAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    evmSmartAccount: Schema.Struct({
      address: Schema.String,
      ownerAddresses: Schema.Array(Schema.String),
      createdAt: Schema.String,
    }),
  });
export type AddEndUserEvmSmartAccountOutput =
  typeof AddEndUserEvmSmartAccountOutput.Type;

// The operation
/**
 * Add an EVM smart account to an end user
 *
 * Creates an EVM smart account for an existing end user. The backend will create a new EVM EOA account to serve as the owner of the smart account.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 *
 * @param userId - The ID of the end user to add the smart account to.
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const addEndUserEvmSmartAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddEndUserEvmSmartAccountInput,
    outputSchema: AddEndUserEvmSmartAccountOutput,
  }),
);
