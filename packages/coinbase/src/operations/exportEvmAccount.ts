import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ExportEvmAccountInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  exportEncryptionKey: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/export" }));
export type ExportEvmAccountInput = typeof ExportEvmAccountInput.Type;

// Output Schema
export const ExportEvmAccountOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    encryptedPrivateKey: Schema.String,
  },
);
export type ExportEvmAccountOutput = typeof ExportEvmAccountOutput.Type;

// The operation
/**
 * Export an EVM account
 *
 * Export an existing EVM account's private key. It is important to store the private key in a secure place after it's exported.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account. The address does not need to be checksummed.
 */
export const exportEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportEvmAccountInput,
  outputSchema: ExportEvmAccountOutput,
}));
