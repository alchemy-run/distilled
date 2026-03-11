import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AddEndUserEvmAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "POST", path: "/v2/end-users/{userId}/evm" }));
export type AddEndUserEvmAccountInput = typeof AddEndUserEvmAccountInput.Type;

// Output Schema
export const AddEndUserEvmAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    evmAccount: Schema.Struct({
      address: Schema.String,
      createdAt: Schema.String,
    }),
  });
export type AddEndUserEvmAccountOutput = typeof AddEndUserEvmAccountOutput.Type;

// The operation
/**
 * Add an EVM account to an end user
 *
 * Adds a new EVM EOA account to an existing end user. End users can have up to 10 EVM accounts.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 *
 * @param userId - The ID of the end user to add the account to.
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const addEndUserEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddEndUserEvmAccountInput,
    outputSchema: AddEndUserEvmAccountOutput,
  }),
);
