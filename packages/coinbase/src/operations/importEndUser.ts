import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ImportEndUserInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String,
  authenticationMethods: Schema.Array(Schema.Unknown),
  encryptedPrivateKey: Schema.String,
  keyType: Schema.Literals(["evm", "solana"]),
}).pipe(T.Http({ method: "POST", path: "/v2/end-users/import" }));
export type ImportEndUserInput = typeof ImportEndUserInput.Type;

// Output Schema
export const ImportEndUserOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String,
  authenticationMethods: Schema.Array(Schema.Unknown),
  mfaMethods: Schema.optional(
    Schema.Struct({
      enrollmentPromptedAt: Schema.optional(Schema.String),
      totp: Schema.optional(
        Schema.Struct({
          enrolledAt: Schema.String,
        }),
      ),
      sms: Schema.optional(
        Schema.Struct({
          enrolledAt: Schema.String,
        }),
      ),
    }),
  ),
  evmAccounts: Schema.Array(Schema.String),
  evmAccountObjects: Schema.Array(
    Schema.Struct({
      address: Schema.String,
      createdAt: Schema.String,
    }),
  ),
  evmSmartAccounts: Schema.Array(Schema.String),
  evmSmartAccountObjects: Schema.Array(
    Schema.Struct({
      address: Schema.String,
      ownerAddresses: Schema.Array(Schema.String),
      createdAt: Schema.String,
    }),
  ),
  solanaAccounts: Schema.Array(Schema.String),
  solanaAccountObjects: Schema.Array(
    Schema.Struct({
      address: Schema.String,
      createdAt: Schema.String,
    }),
  ),
  createdAt: Schema.String,
});
export type ImportEndUserOutput = typeof ImportEndUserOutput.Type;

// The operation
/**
 * Import a private key for an end user
 *
 * Imports an existing private key for an end user into the developer's CDP Project. The private key must be encrypted using the CDP SDK's encryption scheme before being sent to this endpoint. This API should be called from the [CDP SDK](https://github.com/coinbase/cdp-sdk) to ensure that the associated private key is properly encrypted.
 * This endpoint allows developers to import existing keys for their end users, supporting both EVM and Solana key types. The end user must have at least one authentication method configured.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const importEndUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportEndUserInput,
  outputSchema: ImportEndUserOutput,
}));
