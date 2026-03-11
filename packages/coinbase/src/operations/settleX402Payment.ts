import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SettleX402PaymentInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    x402Version: Schema.Literals(["1", "2"]),
    paymentPayload: Schema.Unknown,
    paymentRequirements: Schema.Unknown,
  },
).pipe(T.Http({ method: "POST", path: "/v2/x402/settle" }));
export type SettleX402PaymentInput = typeof SettleX402PaymentInput.Type;

// Output Schema
export const SettleX402PaymentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    success: Schema.Boolean,
    errorReason: Schema.optional(
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
        "invalid_exact_evm_permit2_payload_allowance_required",
        "invalid_exact_evm_permit2_payload_signature",
        "invalid_exact_evm_permit2_payload_deadline",
        "invalid_exact_evm_permit2_payload_valid_after",
        "invalid_exact_evm_permit2_payload_spender",
        "invalid_exact_evm_permit2_payload_recipient",
        "invalid_exact_evm_permit2_payload_amount",
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
        "settle_exact_evm_transaction_confirmation_timed_out",
        "settle_exact_node_failure",
        "settle_exact_failed_onchain",
        "settle_exact_svm_block_height_exceeded",
        "settle_exact_svm_transaction_confirmation_timed_out",
        "unknown_error",
      ]),
    ),
    errorMessage: Schema.optional(Schema.String),
    payer: Schema.String,
    transaction: Schema.String,
    network: Schema.String,
  });
export type SettleX402PaymentOutput = typeof SettleX402PaymentOutput.Type;

// The operation
/**
 * Settle a payment
 *
 * Settle an x402 protocol payment with a specific scheme and network.
 */
export const settleX402Payment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SettleX402PaymentInput,
  outputSchema: SettleX402PaymentOutput,
}));
