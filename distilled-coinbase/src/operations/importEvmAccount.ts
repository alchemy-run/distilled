import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ImportEvmAccountInput = Schema.Struct({
  encryptedPrivateKey: Schema.String,
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/import" }), T.WalletAuth());
export type ImportEvmAccountInput = typeof ImportEvmAccountInput.Type;

// Output Schema
export const ImportEvmAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type ImportEvmAccountOutput = typeof ImportEvmAccountOutput.Type;

// The operation
/**
 * Import an EVM account
 *
 * Import an existing EVM account into the developer's CDP Project. This API should be called from the [CDP SDK](https://github.com/coinbase/cdp-sdk) to ensure that the associated private key is properly encrypted.
 */
export const importEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportEvmAccountInput,
  outputSchema: ImportEvmAccountOutput,
  walletAuth: true,
}));
