import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import {
  AlreadyExists,
  IdempotencyError,
  InvalidRequest,
  PaymentMethodRequired,
} from "../errors";

// Input Schema
export const ImportSolanaAccountInput = Schema.Struct({
  encryptedPrivateKey: Schema.String,
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/v2/solana/accounts/import" }),
  T.WalletAuth(),
);
export type ImportSolanaAccountInput = typeof ImportSolanaAccountInput.Type;

// Output Schema
export const ImportSolanaAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type ImportSolanaAccountOutput = typeof ImportSolanaAccountOutput.Type;

// The operation
/**
 * Import a Solana account
 *
 * Import an existing Solana account into the developer's CDP Project. This API should be called from the [CDP SDK](https://github.com/coinbase/cdp-sdk) to ensure that the associated private key is properly encrypted.
 */
export const importSolanaAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportSolanaAccountInput,
  outputSchema: ImportSolanaAccountOutput,
  errors: [
    AlreadyExists,
    IdempotencyError,
    InvalidRequest,
    PaymentMethodRequired,
  ],
  walletAuth: true,
}));
