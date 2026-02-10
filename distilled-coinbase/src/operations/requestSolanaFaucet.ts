import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RequestSolanaFaucetInput = Schema.Struct({
  address: Schema.String,
  token: Schema.Literal("sol", "usdc"),
}).pipe(T.Http({ method: "POST", path: "/v2/solana/faucet" }));
export type RequestSolanaFaucetInput = typeof RequestSolanaFaucetInput.Type;

// Output Schema
export const RequestSolanaFaucetOutput = Schema.Struct({
  transactionSignature: Schema.String,
});
export type RequestSolanaFaucetOutput = typeof RequestSolanaFaucetOutput.Type;

// The operation
/**
 * Request funds on Solana devnet
 *
 * Request funds from the CDP Faucet on Solana devnet.
 * Faucets are available for SOL.
 * To prevent abuse, we enforce rate limits within a rolling 24-hour window to control the amount of funds that can be requested.
 * These limits are applied at both the CDP Project level and the blockchain address level.
 * A single blockchain address cannot exceed the specified limits, even if multiple users submit requests to the same address.
 */
export const requestSolanaFaucet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RequestSolanaFaucetInput,
  outputSchema: RequestSolanaFaucetOutput,
}));
