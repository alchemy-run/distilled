import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignSolanaMessageInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  message: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/solana/accounts/{address}/sign/message" }), T.WalletAuth());
export type SignSolanaMessageInput = typeof SignSolanaMessageInput.Type;

// Output Schema
export const SignSolanaMessageOutput = Schema.Struct({
  signature: Schema.String,
});
export type SignSolanaMessageOutput = typeof SignSolanaMessageOutput.Type;

// The operation
/**
 * Sign a message
 *
 * Signs an arbitrary message with the given Solana account.
 * **WARNING:** Never sign a message that you didn't generate, as it can be an arbitrary transaction. For example, it might send all of your funds to an attacker.
 *
 * @param address - The base58 encoded address of the Solana account.
 */
export const signSolanaMessage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignSolanaMessageInput,
  outputSchema: SignSolanaMessageOutput,
  walletAuth: true,
}));
