import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const ExportSolanaAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  exportEncryptionKey: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/solana/accounts/{address}/export" }), T.WalletAuth());
export type ExportSolanaAccountInput = typeof ExportSolanaAccountInput.Type;

// Output Schema
export const ExportSolanaAccountOutput = Schema.Struct({
  encryptedPrivateKey: Schema.String,
});
export type ExportSolanaAccountOutput = typeof ExportSolanaAccountOutput.Type;

// The operation
/**
 * Export an Solana account
 *
 * Export an existing Solana account's private key. It is important to store the private key in a secure place after it's exported.
 *
 * @param address - The base58 encoded address of the Solana account.
 */
export const exportSolanaAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportSolanaAccountInput,
  outputSchema: ExportSolanaAccountOutput,
  errors: [IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
