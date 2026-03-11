import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ExportSolanaAccountByNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.PathParam()),
    exportEncryptionKey: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/solana/accounts/export/by-name/{name}",
    }),
  );
export type ExportSolanaAccountByNameInput =
  typeof ExportSolanaAccountByNameInput.Type;

// Output Schema
export const ExportSolanaAccountByNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    encryptedPrivateKey: Schema.String,
  });
export type ExportSolanaAccountByNameOutput =
  typeof ExportSolanaAccountByNameOutput.Type;

// The operation
/**
 * Export a Solana account by name
 *
 * Export an existing Solana account's private key by its name. It is important to store the private key in a secure place after it's exported.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param name - The name of the Solana account.
 */
export const exportSolanaAccountByName = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExportSolanaAccountByNameInput,
    outputSchema: ExportSolanaAccountByNameOutput,
  }),
);
