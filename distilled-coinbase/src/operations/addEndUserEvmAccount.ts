import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const AddEndUserEvmAccountInput = Schema.Struct({
  userId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/v2/end-users/{userId}/evm" }), T.WalletAuth());
export type AddEndUserEvmAccountInput = typeof AddEndUserEvmAccountInput.Type;

// Output Schema
export const AddEndUserEvmAccountOutput = Schema.Struct({
  evmAccount: Schema.Struct({
    address: Schema.String,
    createdAt: Schema.String,
  }),
});
export type AddEndUserEvmAccountOutput = typeof AddEndUserEvmAccountOutput.Type;

// The operation
/**
 * Add an EVM account to an end user
 *
 * Adds a new EVM EOA account to an existing end user. End users can have up to 10 EVM accounts.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 *
 * @param userId - The ID of the end user to add the account to.
 */
export const addEndUserEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddEndUserEvmAccountInput,
  outputSchema: AddEndUserEvmAccountOutput,
  errors: [IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
