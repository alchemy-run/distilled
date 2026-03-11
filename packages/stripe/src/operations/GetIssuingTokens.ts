import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingTokensInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  card: Schema.String,
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Literals(["active", "deleted", "requested", "suspended"]),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/issuing/tokens",
    contentType: "form-urlencoded",
  }),
);
export type GetIssuingTokensInput = typeof GetIssuingTokensInput.Type;

// Output Schema
export const GetIssuingTokensOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
        card: Schema.Unknown,
        created: Schema.Number,
        device_fingerprint: Schema.NullOr(Schema.String),
        id: Schema.String,
        last4: Schema.optional(Schema.String),
        livemode: Schema.Boolean,
        network: Schema.Literals(["mastercard", "visa"]),
        network_data: Schema.optional(
          Schema.Struct({
            device: Schema.optional(
              Schema.Struct({
                device_fingerprint: Schema.optional(Schema.String),
                ip_address: Schema.optional(Schema.String),
                location: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                phone_number: Schema.optional(Schema.String),
                type: Schema.optional(
                  Schema.Literals(["other", "phone", "watch"]),
                ),
              }),
            ),
            mastercard: Schema.optional(
              Schema.Struct({
                card_reference_id: Schema.optional(Schema.String),
                token_reference_id: Schema.String,
                token_requestor_id: Schema.String,
                token_requestor_name: Schema.optional(Schema.String),
              }),
            ),
            type: Schema.Literals(["mastercard", "visa"]),
            visa: Schema.optional(
              Schema.Struct({
                card_reference_id: Schema.String,
                token_reference_id: Schema.String,
                token_requestor_id: Schema.String,
                token_risk_score: Schema.optional(Schema.String),
              }),
            ),
            wallet_provider: Schema.optional(
              Schema.Struct({
                account_id: Schema.optional(Schema.String),
                account_trust_score: Schema.optional(Schema.Number),
                card_number_source: Schema.optional(
                  Schema.Literals(["app", "manual", "on_file", "other"]),
                ),
                cardholder_address: Schema.optional(
                  Schema.Struct({
                    line1: Schema.String,
                    postal_code: Schema.String,
                  }),
                ),
                cardholder_name: Schema.optional(Schema.String),
                device_trust_score: Schema.optional(Schema.Number),
                hashed_account_email_address: Schema.optional(Schema.String),
                reason_codes: Schema.optional(
                  Schema.Array(
                    Schema.Literals([
                      "account_card_too_new",
                      "account_recently_changed",
                      "account_too_new",
                      "account_too_new_since_launch",
                      "additional_device",
                      "data_expired",
                      "defer_id_v_decision",
                      "device_recently_lost",
                      "good_activity_history",
                      "has_suspended_tokens",
                      "high_risk",
                      "inactive_account",
                      "long_account_tenure",
                      "low_account_score",
                      "low_device_score",
                      "low_phone_number_score",
                      "network_service_error",
                      "outside_home_territory",
                      "provisioning_cardholder_mismatch",
                      "provisioning_device_and_cardholder_mismatch",
                      "provisioning_device_mismatch",
                      "same_device_no_prior_authentication",
                      "same_device_successful_prior_authentication",
                      "software_update",
                      "suspicious_activity",
                      "too_many_different_cardholders",
                      "too_many_recent_attempts",
                      "too_many_recent_tokens",
                    ]),
                  ),
                ),
                suggested_decision: Schema.optional(
                  Schema.Literals(["approve", "decline", "require_auth"]),
                ),
                suggested_decision_version: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        network_updated_at: Schema.Number,
        object: Schema.Literals(["issuing.token"]),
        status: Schema.Literals([
          "active",
          "deleted",
          "requested",
          "suspended",
        ]),
        wallet_provider: Schema.optional(
          Schema.Literals(["apple_pay", "google_pay", "samsung_pay"]),
        ),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetIssuingTokensOutput = typeof GetIssuingTokensOutput.Type;

// The operation
/**
 * List all issuing tokens for card
 *
 * <p>Lists all Issuing <code>Token</code> objects for a given card.</p>
 *
 * @param card - The Issuing card identifier to list tokens for.
 * @param created - Only return Issuing tokens that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Select Issuing tokens with the given status.
 */
export const GetIssuingTokens = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetIssuingTokensInput,
  outputSchema: GetIssuingTokensOutput,
}));
