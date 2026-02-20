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
export const CreateSolanaAccountInput = Schema.Struct({
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/v2/solana/accounts" }),
  T.WalletAuth(),
);
export type CreateSolanaAccountInput = typeof CreateSolanaAccountInput.Type;

// Output Schema
export const CreateSolanaAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type CreateSolanaAccountOutput = typeof CreateSolanaAccountOutput.Type;

// The operation
/**
 * Create a Solana account
 *
 * Creates a new Solana account.
 */
export const createSolanaAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateSolanaAccountInput,
  outputSchema: CreateSolanaAccountOutput,
  errors: [
    AlreadyExists,
    IdempotencyError,
    InvalidRequest,
    PaymentMethodRequired,
  ],
  walletAuth: true,
}));
