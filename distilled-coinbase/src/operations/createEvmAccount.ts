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
export const CreateEvmAccountInput = Schema.Struct({
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts" }), T.WalletAuth());
export type CreateEvmAccountInput = typeof CreateEvmAccountInput.Type;

// Output Schema
export const CreateEvmAccountOutput = Schema.Struct({
  address: Schema.String,
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type CreateEvmAccountOutput = typeof CreateEvmAccountOutput.Type;

// The operation
/**
 * Create an EVM account
 *
 * Creates a new EVM account.
 */
export const createEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEvmAccountInput,
  outputSchema: CreateEvmAccountOutput,
  errors: [
    AlreadyExists,
    IdempotencyError,
    InvalidRequest,
    PaymentMethodRequired,
  ],
  walletAuth: true,
}));
