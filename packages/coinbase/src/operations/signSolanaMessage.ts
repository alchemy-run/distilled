import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignSolanaMessageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    address: Schema.String.pipe(T.PathParam()),
    message: Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v2/solana/accounts/{address}/sign/message",
  }),
);
export type SignSolanaMessageInput = typeof SignSolanaMessageInput.Type;

// Output Schema
export const SignSolanaMessageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The base58 encoded address of the Solana account.
 */
export const signSolanaMessage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignSolanaMessageInput,
  outputSchema: SignSolanaMessageOutput,
}));
