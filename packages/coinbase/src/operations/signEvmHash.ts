import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignEvmHashInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  hash: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/sign" }));
export type SignEvmHashInput = typeof SignEvmHashInput.Type;

// Output Schema
export const SignEvmHashOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  signature: Schema.String,
});
export type SignEvmHashOutput = typeof SignEvmHashOutput.Type;

// The operation
/**
 * Sign a hash
 *
 * Signs an arbitrary 32 byte hash with the given EVM account.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmHash = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmHashInput,
  outputSchema: SignEvmHashOutput,
}));
