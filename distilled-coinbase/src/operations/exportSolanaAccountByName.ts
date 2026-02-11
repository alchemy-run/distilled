import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const ExportSolanaAccountByNameInput = Schema.Struct({
  name: Schema.String.pipe(T.PathParam()),
  exportEncryptionKey: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/solana/accounts/export/by-name/{name}" }), T.WalletAuth());
export type ExportSolanaAccountByNameInput = typeof ExportSolanaAccountByNameInput.Type;

// Output Schema
export const ExportSolanaAccountByNameOutput = Schema.Struct({
  encryptedPrivateKey: Schema.String,
});
export type ExportSolanaAccountByNameOutput = typeof ExportSolanaAccountByNameOutput.Type;

// The operation
/**
 * Export a Solana account by name
 *
 * Export an existing Solana account's private key by its name. It is important to store the private key in a secure place after it's exported.
 *
 * @param name - The name of the Solana account.
 */
export const exportSolanaAccountByName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportSolanaAccountByNameInput,
  outputSchema: ExportSolanaAccountByNameOutput,
  errors: [IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
