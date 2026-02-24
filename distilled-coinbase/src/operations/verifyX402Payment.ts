import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest } from "../errors";

// Input Schema
export const VerifyX402PaymentInput = Schema.Struct({
  x402Version: Schema.Literals([1, 2]),
  paymentPayload: Schema.Union([
    Schema.Struct({
      x402Version: Schema.Literals([1, 2]),
      scheme: Schema.Literals(["exact"]),
      network: Schema.Literals([
        "base-sepolia",
        "base",
        "solana-devnet",
        "solana",
      ]),
      payload: Schema.Union([
        Schema.Struct({
          signature: Schema.String,
          authorization: Schema.Struct({
            from: Schema.String,
            to: Schema.String,
            value: Schema.String,
            validAfter: Schema.String,
            validBefore: Schema.String,
            nonce: Schema.String,
          }),
        }),
        Schema.Struct({
          transaction: Schema.String,
        }),
      ]),
    }),
    Schema.Struct({
      x402Version: Schema.Literals([1, 2]),
      payload: Schema.Union([
        Schema.Struct({
          signature: Schema.String,
          authorization: Schema.Struct({
            from: Schema.String,
            to: Schema.String,
            value: Schema.String,
            validAfter: Schema.String,
            validBefore: Schema.String,
            nonce: Schema.String,
          }),
        }),
        Schema.Struct({
          transaction: Schema.String,
        }),
      ]),
      accepted: Schema.Struct({
        scheme: Schema.Literals(["exact"]),
        network: Schema.String,
        asset: Schema.String,
        amount: Schema.String,
        payTo: Schema.String,
        maxTimeoutSeconds: Schema.Number,
        extra: Schema.optional(Schema.Unknown),
      }),
      resource: Schema.optional(
        Schema.Struct({
          url: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          mimeType: Schema.optional(Schema.String),
        }),
      ),
      extensions: Schema.optional(Schema.Unknown),
    }),
  ]),
  paymentRequirements: Schema.Union([
    Schema.Struct({
      scheme: Schema.Literals(["exact"]),
      network: Schema.Literals([
        "base-sepolia",
        "base",
        "solana-devnet",
        "solana",
      ]),
      maxAmountRequired: Schema.String,
      resource: Schema.String,
      description: Schema.String,
      mimeType: Schema.String,
      outputSchema: Schema.optional(Schema.Unknown),
      payTo: Schema.String,
      maxTimeoutSeconds: Schema.Number,
      asset: Schema.String,
      extra: Schema.optional(Schema.Unknown),
    }),
    Schema.Struct({
      scheme: Schema.Literals(["exact"]),
      network: Schema.String,
      asset: Schema.String,
      amount: Schema.String,
      payTo: Schema.String,
      maxTimeoutSeconds: Schema.Number,
      extra: Schema.optional(Schema.Unknown),
    }),
  ]),
}).pipe(T.Http({ method: "POST", path: "/v2/x402/verify" }));
export type VerifyX402PaymentInput = typeof VerifyX402PaymentInput.Type;

// Output Schema
export const VerifyX402PaymentOutput = Schema.Struct({
  isValid: Schema.Boolean,
  invalidReason: Schema.optional(
    Schema.Literals([
      "insufficient_funds",
      "invalid_scheme",
      "invalid_network",
      "invalid_x402_version",
      "invalid_payment_requirements",
      "invalid_payload",
      "invalid_exact_evm_payload_authorization_value",
      "invalid_exact_evm_payload_authorization_value_too_low",
      "invalid_exact_evm_payload_authorization_valid_after",
      "invalid_exact_evm_payload_authorization_valid_before",
      "invalid_exact_evm_payload_authorization_typed_data_message",
      "invalid_exact_evm_payload_authorization_from_address_kyt",
      "invalid_exact_evm_payload_authorization_to_address_kyt",
      "invalid_exact_evm_payload_signature",
      "invalid_exact_evm_payload_signature_address",
      "invalid_exact_svm_payload_transaction",
      "invalid_exact_svm_payload_transaction_amount_mismatch",
      "invalid_exact_svm_payload_transaction_create_ata_instruction",
      "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee",
      "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset",
      "invalid_exact_svm_payload_transaction_instructions",
      "invalid_exact_svm_payload_transaction_instructions_length",
      "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction",
      "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction",
      "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high",
      "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked",
      "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked",
      "invalid_exact_svm_payload_transaction_not_a_transfer_instruction",
      "invalid_exact_svm_payload_transaction_cannot_derive_receiver_ata",
      "invalid_exact_svm_payload_transaction_receiver_ata_not_found",
      "invalid_exact_svm_payload_transaction_sender_ata_not_found",
      "invalid_exact_svm_payload_transaction_simulation_failed",
      "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata",
      "invalid_exact_svm_payload_transaction_fee_payer_included_in_instruction_accounts",
      "invalid_exact_svm_payload_transaction_fee_payer_transferring_funds",
      "unknown_error",
    ]),
  ),
  invalidMessage: Schema.optional(Schema.String),
  payer: Schema.String,
});
export type VerifyX402PaymentOutput = typeof VerifyX402PaymentOutput.Type;

// The operation
/**
 * Verify a payment
 *
 * Verify an x402 protocol payment with a specific scheme and network.
 */
export const verifyX402Payment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VerifyX402PaymentInput,
  outputSchema: VerifyX402PaymentOutput,
  errors: [InvalidRequest],
}));
