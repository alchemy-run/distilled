import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { AlreadyExists, IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired } from "../errors";

// Input Schema
export const SignEvmHashInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  hash: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/sign" }), T.WalletAuth());
export type SignEvmHashInput = typeof SignEvmHashInput.Type;

// Output Schema
export const SignEvmHashOutput = Schema.Struct({
  signature: Schema.String,
});
export type SignEvmHashOutput = typeof SignEvmHashOutput.Type;

// The operation
/**
 * Sign a hash
 *
 * Signs an arbitrary 32 byte hash with the given EVM account.
 *
 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmHash = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmHashInput,
  outputSchema: SignEvmHashOutput,
  errors: [AlreadyExists, IdempotencyError, InvalidRequest, NotFound, PaymentMethodRequired],
  walletAuth: true,
}));
