import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ImportEvmAccountInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  encryptedPrivateKey: Schema.String,
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/import" }));
export type ImportEvmAccountInput = typeof ImportEvmAccountInput.Type;

// Output Schema
export const ImportEvmAccountOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    address: Schema.String,
    name: Schema.optional(Schema.String),
    policies: Schema.optional(Schema.Array(Schema.String)),
    createdAt: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  },
);
export type ImportEvmAccountOutput = typeof ImportEvmAccountOutput.Type;

// The operation
/**
 * Import an EVM account
 *
 * Import an existing EVM account into the developer's CDP Project. This API should be called from the [CDP SDK](https://github.com/coinbase/cdp-sdk) to ensure that the associated private key is properly encrypted.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const importEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportEvmAccountInput,
  outputSchema: ImportEvmAccountOutput,
}));
