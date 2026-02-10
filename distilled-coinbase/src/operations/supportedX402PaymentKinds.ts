import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SupportedX402PaymentKindsInput = Schema.Struct({

}).pipe(T.Http({ method: "GET", path: "/v2/x402/supported" }));
export type SupportedX402PaymentKindsInput = typeof SupportedX402PaymentKindsInput.Type;

// Output Schema
export const SupportedX402PaymentKindsOutput = Schema.Struct({
  kinds: Schema.Array(Schema.Struct({
    x402Version: Schema.Literal(1, 2),
    scheme: Schema.Literal("exact"),
    network: Schema.Literal("base-sepolia", "base", "solana-devnet", "solana", "eip155:8453", "eip155:84532", "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"),
    extra: Schema.optional(Schema.Unknown),
  })),
  extensions: Schema.Array(Schema.String),
  signers: Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) }),
});
export type SupportedX402PaymentKindsOutput = typeof SupportedX402PaymentKindsOutput.Type;

// The operation
/**
 * Get supported payment schemes and networks
 *
 * Get the supported x402 protocol payment schemes and networks that the facilitator is able to verify and settle payments for.
 */
export const supportedX402PaymentKinds = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SupportedX402PaymentKindsInput,
  outputSchema: SupportedX402PaymentKindsOutput,
}));
