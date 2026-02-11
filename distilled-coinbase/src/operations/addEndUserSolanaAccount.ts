import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const AddEndUserSolanaAccountInput = Schema.Struct({
  userId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/v2/end-users/{userId}/solana" }), T.WalletAuth());
export type AddEndUserSolanaAccountInput = typeof AddEndUserSolanaAccountInput.Type;

// Output Schema
export const AddEndUserSolanaAccountOutput = Schema.Struct({
  solanaAccount: Schema.Struct({
    address: Schema.String,
    createdAt: Schema.String,
  }),
});
export type AddEndUserSolanaAccountOutput = typeof AddEndUserSolanaAccountOutput.Type;

// The operation
/**
 * Add a Solana account to an end user
 *
 * Adds a new Solana account to an existing end user. End users can have  up to 10 Solana accounts.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 *
 * @param userId - The ID of the end user to add the account to.
 */
export const addEndUserSolanaAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddEndUserSolanaAccountInput,
  outputSchema: AddEndUserSolanaAccountOutput,
  errors: [IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
