import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const ExportEvmAccountInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  exportEncryptionKey: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/export" }), T.WalletAuth());
export type ExportEvmAccountInput = typeof ExportEvmAccountInput.Type;

// Output Schema
export const ExportEvmAccountOutput = Schema.Struct({
  encryptedPrivateKey: Schema.String,
});
export type ExportEvmAccountOutput = typeof ExportEvmAccountOutput.Type;

// The operation
/**
 * Export an EVM account
 *
 * Export an existing EVM account's private key. It is important to store the private key in a secure place after it's exported.
 *
 * @param address - The 0x-prefixed address of the EVM account. The address does not need to be checksummed.
 */
export const exportEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportEvmAccountInput,
  outputSchema: ExportEvmAccountOutput,
  errors: [IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
