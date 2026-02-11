import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const AddEndUserEvmSmartAccountInput = Schema.Struct({
  userId: Schema.String.pipe(T.PathParam()),
  enableSpendPermissions: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "POST", path: "/v2/end-users/{userId}/evm-smart-account" }), T.WalletAuth());
export type AddEndUserEvmSmartAccountInput = typeof AddEndUserEvmSmartAccountInput.Type;

// Output Schema
export const AddEndUserEvmSmartAccountOutput = Schema.Struct({
  evmSmartAccount: Schema.Struct({
    address: Schema.String,
    ownerAddresses: Schema.Array(Schema.String),
    createdAt: Schema.String,
  }),
});
export type AddEndUserEvmSmartAccountOutput = typeof AddEndUserEvmSmartAccountOutput.Type;

// The operation
/**
 * Add an EVM smart account to an end user
 *
 * Creates an EVM smart account for an existing end user. The backend will create a new EVM EOA account to serve as the owner of the smart account.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 *
 * @param userId - The ID of the end user to add the smart account to.
 */
export const addEndUserEvmSmartAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddEndUserEvmSmartAccountInput,
  outputSchema: AddEndUserEvmSmartAccountOutput,
  errors: [IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
