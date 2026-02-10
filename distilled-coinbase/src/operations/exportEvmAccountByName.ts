import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ExportEvmAccountByNameInput = Schema.Struct({
  name: Schema.String.pipe(T.PathParam()),
  exportEncryptionKey: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/export/by-name/{name}" }), T.WalletAuth());
export type ExportEvmAccountByNameInput = typeof ExportEvmAccountByNameInput.Type;

// Output Schema
export const ExportEvmAccountByNameOutput = Schema.Struct({
  encryptedPrivateKey: Schema.String,
});
export type ExportEvmAccountByNameOutput = typeof ExportEvmAccountByNameOutput.Type;

// The operation
/**
 * Export an EVM account by name
 *
 * Export an existing EVM account's private key by its name. It is important to store the private key in a secure place after it's exported.
 *
 * @param name - The name of the EVM account.
 */
export const exportEvmAccountByName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportEvmAccountByNameInput,
  outputSchema: ExportEvmAccountByNameOutput,
  walletAuth: true,
}));
