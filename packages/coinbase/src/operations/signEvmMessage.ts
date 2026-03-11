import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignEvmMessageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  message: Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/sign/message" }),
);
export type SignEvmMessageInput = typeof SignEvmMessageInput.Type;

// Output Schema
export const SignEvmMessageOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  signature: Schema.String,
});
export type SignEvmMessageOutput = typeof SignEvmMessageOutput.Type;

// The operation
/**
 * Sign an EIP-191 message
 *
 * Signs an [EIP-191](https://eips.ethereum.org/EIPS/eip-191) message with the given EVM account.
 * Per the specification, the message in the request body is prepended with `0x19 <0x45 (E)> <thereum Signed Message:\\n" + len(message)>` before being signed.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmMessage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmMessageInput,
  outputSchema: SignEvmMessageOutput,
}));
