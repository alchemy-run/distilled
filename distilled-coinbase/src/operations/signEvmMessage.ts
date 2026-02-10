import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignEvmMessageInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  message: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/sign/message" }), T.WalletAuth());
export type SignEvmMessageInput = typeof SignEvmMessageInput.Type;

// Output Schema
export const SignEvmMessageOutput = Schema.Struct({
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
 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmMessage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmMessageInput,
  outputSchema: SignEvmMessageOutput,
  walletAuth: true,
}));
