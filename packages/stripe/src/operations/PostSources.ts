import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostSourcesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.optional(Schema.Number),
  currency: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.Array(Schema.String)),
  flow: Schema.optional(
    Schema.Literals(["code_verification", "none", "receiver", "redirect"]),
  ),
  mandate: Schema.optional(
    Schema.Struct({
      acceptance: Schema.optional(
        Schema.Struct({
          date: Schema.optional(Schema.Number),
          ip: Schema.optional(Schema.String),
          offline: Schema.optional(
            Schema.Struct({
              contact_email: Schema.String,
            }),
          ),
          online: Schema.optional(
            Schema.Struct({
              date: Schema.optional(Schema.Number),
              ip: Schema.optional(Schema.String),
              user_agent: Schema.optional(Schema.String),
            }),
          ),
          status: Schema.Literals([
            "accepted",
            "pending",
            "refused",
            "revoked",
          ]),
          type: Schema.optional(Schema.Literals(["offline", "online"])),
          user_agent: Schema.optional(Schema.String),
        }),
      ),
      amount: Schema.optional(Schema.Unknown),
      currency: Schema.optional(Schema.String),
      interval: Schema.optional(
        Schema.Literals(["one_time", "scheduled", "variable"]),
      ),
      notification_method: Schema.optional(
        Schema.Literals([
          "deprecated_none",
          "email",
          "manual",
          "none",
          "stripe_email",
        ]),
      ),
    }),
  ),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  original_source: Schema.optional(Schema.String),
  owner: Schema.optional(
    Schema.Struct({
      address: Schema.optional(
        Schema.Struct({
          city: Schema.optional(Schema.String),
          country: Schema.optional(Schema.String),
          line1: Schema.optional(Schema.String),
          line2: Schema.optional(Schema.String),
          postal_code: Schema.optional(Schema.String),
          state: Schema.optional(Schema.String),
        }),
      ),
      email: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      phone: Schema.optional(Schema.String),
    }),
  ),
  receiver: Schema.optional(
    Schema.Struct({
      refund_attributes_method: Schema.optional(
        Schema.Literals(["email", "manual", "none"]),
      ),
    }),
  ),
  redirect: Schema.optional(
    Schema.Struct({
      return_url: Schema.String,
    }),
  ),
  source_order: Schema.optional(
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(
          Schema.Struct({
            amount: Schema.optional(Schema.Number),
            currency: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
            parent: Schema.optional(Schema.String),
            quantity: Schema.optional(Schema.Number),
            type: Schema.optional(
              Schema.Literals(["discount", "shipping", "sku", "tax"]),
            ),
          }),
        ),
      ),
      shipping: Schema.optional(
        Schema.Struct({
          address: Schema.Struct({
            city: Schema.optional(Schema.String),
            country: Schema.optional(Schema.String),
            line1: Schema.String,
            line2: Schema.optional(Schema.String),
            postal_code: Schema.optional(Schema.String),
            state: Schema.optional(Schema.String),
          }),
          carrier: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.String),
          tracking_number: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  statement_descriptor: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  usage: Schema.optional(Schema.Literals(["reusable", "single_use"])),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/sources",
    contentType: "form-urlencoded",
  }),
);
export type PostSourcesInput = typeof PostSourcesInput.Type;

// Output Schema
export const PostSourcesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ach_credit_transfer: Schema.optional(
    Schema.Struct({
      account_number: Schema.optional(Schema.NullOr(Schema.String)),
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      refund_account_holder_name: Schema.optional(Schema.NullOr(Schema.String)),
      refund_account_holder_type: Schema.optional(Schema.NullOr(Schema.String)),
      refund_routing_number: Schema.optional(Schema.NullOr(Schema.String)),
      routing_number: Schema.optional(Schema.NullOr(Schema.String)),
      swift_code: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  ach_debit: Schema.optional(
    Schema.Struct({
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
      routing_number: Schema.optional(Schema.NullOr(Schema.String)),
      type: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  acss_debit: Schema.optional(
    Schema.Struct({
      bank_address_city: Schema.optional(Schema.NullOr(Schema.String)),
      bank_address_line_1: Schema.optional(Schema.NullOr(Schema.String)),
      bank_address_line_2: Schema.optional(Schema.NullOr(Schema.String)),
      bank_address_postal_code: Schema.optional(Schema.NullOr(Schema.String)),
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      category: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
      routing_number: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  alipay: Schema.optional(
    Schema.Struct({
      data_string: Schema.optional(Schema.NullOr(Schema.String)),
      native_url: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  allow_redisplay: Schema.NullOr(
    Schema.Literals(["always", "limited", "unspecified"]),
  ),
  amount: Schema.NullOr(Schema.Number),
  au_becs_debit: Schema.optional(
    Schema.Struct({
      bsb_number: Schema.optional(Schema.NullOr(Schema.String)),
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  bancontact: Schema.optional(
    Schema.Struct({
      bank_code: Schema.optional(Schema.NullOr(Schema.String)),
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      bic: Schema.optional(Schema.NullOr(Schema.String)),
      iban_last4: Schema.optional(Schema.NullOr(Schema.String)),
      preferred_language: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  card: Schema.optional(
    Schema.Struct({
      address_line1_check: Schema.optional(Schema.NullOr(Schema.String)),
      address_zip_check: Schema.optional(Schema.NullOr(Schema.String)),
      brand: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      cvc_check: Schema.optional(Schema.NullOr(Schema.String)),
      description: Schema.optional(Schema.String),
      dynamic_last4: Schema.optional(Schema.NullOr(Schema.String)),
      exp_month: Schema.optional(Schema.NullOr(Schema.Number)),
      exp_year: Schema.optional(Schema.NullOr(Schema.Number)),
      fingerprint: Schema.optional(Schema.String),
      funding: Schema.optional(Schema.NullOr(Schema.String)),
      iin: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      three_d_secure: Schema.optional(Schema.String),
      tokenization_method: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  card_present: Schema.optional(
    Schema.Struct({
      application_cryptogram: Schema.optional(Schema.String),
      application_preferred_name: Schema.optional(Schema.String),
      authorization_code: Schema.optional(Schema.NullOr(Schema.String)),
      authorization_response_code: Schema.optional(Schema.String),
      brand: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      cvm_type: Schema.optional(Schema.String),
      data_type: Schema.optional(Schema.NullOr(Schema.String)),
      dedicated_file_name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      emv_auth_data: Schema.optional(Schema.String),
      evidence_customer_signature: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      evidence_transaction_certificate: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      exp_month: Schema.optional(Schema.NullOr(Schema.Number)),
      exp_year: Schema.optional(Schema.NullOr(Schema.Number)),
      fingerprint: Schema.optional(Schema.String),
      funding: Schema.optional(Schema.NullOr(Schema.String)),
      iin: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
      pos_device_id: Schema.optional(Schema.NullOr(Schema.String)),
      pos_entry_mode: Schema.optional(Schema.String),
      read_method: Schema.optional(Schema.NullOr(Schema.String)),
      reader: Schema.optional(Schema.NullOr(Schema.String)),
      terminal_verification_results: Schema.optional(Schema.String),
      transaction_status_information: Schema.optional(Schema.String),
    }),
  ),
  client_secret: SensitiveString,
  code_verification: Schema.optional(
    Schema.Struct({
      attempts_remaining: Schema.Number,
      status: Schema.String,
    }),
  ),
  created: Schema.Number,
  currency: Schema.NullOr(Schema.String),
  customer: Schema.optional(Schema.String),
  eps: Schema.optional(
    Schema.Struct({
      reference: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  flow: Schema.String,
  giropay: Schema.optional(
    Schema.Struct({
      bank_code: Schema.optional(Schema.NullOr(Schema.String)),
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      bic: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  id: Schema.String,
  ideal: Schema.optional(
    Schema.Struct({
      bank: Schema.optional(Schema.NullOr(Schema.String)),
      bic: Schema.optional(Schema.NullOr(Schema.String)),
      iban_last4: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  klarna: Schema.optional(
    Schema.Struct({
      background_image_url: Schema.optional(Schema.String),
      client_token: Schema.optional(Schema.NullOr(Schema.String)),
      first_name: Schema.optional(Schema.String),
      last_name: Schema.optional(Schema.String),
      locale: Schema.optional(Schema.String),
      logo_url: Schema.optional(Schema.String),
      page_title: Schema.optional(Schema.String),
      pay_later_asset_urls_descriptive: Schema.optional(Schema.String),
      pay_later_asset_urls_standard: Schema.optional(Schema.String),
      pay_later_name: Schema.optional(Schema.String),
      pay_later_redirect_url: Schema.optional(Schema.String),
      pay_now_asset_urls_descriptive: Schema.optional(Schema.String),
      pay_now_asset_urls_standard: Schema.optional(Schema.String),
      pay_now_name: Schema.optional(Schema.String),
      pay_now_redirect_url: Schema.optional(Schema.String),
      pay_over_time_asset_urls_descriptive: Schema.optional(Schema.String),
      pay_over_time_asset_urls_standard: Schema.optional(Schema.String),
      pay_over_time_name: Schema.optional(Schema.String),
      pay_over_time_redirect_url: Schema.optional(Schema.String),
      payment_method_categories: Schema.optional(Schema.String),
      purchase_country: Schema.optional(Schema.String),
      purchase_type: Schema.optional(Schema.String),
      redirect_url: Schema.optional(Schema.String),
      shipping_delay: Schema.optional(Schema.Number),
      shipping_first_name: Schema.optional(Schema.String),
      shipping_last_name: Schema.optional(Schema.String),
    }),
  ),
  livemode: Schema.Boolean,
  metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  multibanco: Schema.optional(
    Schema.Struct({
      entity: Schema.optional(Schema.NullOr(Schema.String)),
      reference: Schema.optional(Schema.NullOr(Schema.String)),
      refund_account_holder_address_city: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_country: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_line1: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_line2: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_postal_code: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_state: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_name: Schema.optional(Schema.NullOr(Schema.String)),
      refund_iban: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  object: Schema.Literals(["source"]),
  owner: Schema.Unknown,
  p24: Schema.optional(
    Schema.Struct({
      reference: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  receiver: Schema.optional(
    Schema.Struct({
      address: Schema.NullOr(Schema.String),
      amount_charged: Schema.Number,
      amount_received: Schema.Number,
      amount_returned: Schema.Number,
      refund_attributes_method: Schema.String,
      refund_attributes_status: Schema.String,
    }),
  ),
  redirect: Schema.optional(
    Schema.Struct({
      failure_reason: Schema.NullOr(Schema.String),
      return_url: Schema.String,
      status: Schema.String,
      url: Schema.String,
    }),
  ),
  sepa_credit_transfer: Schema.optional(
    Schema.Struct({
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      bic: Schema.optional(Schema.NullOr(Schema.String)),
      iban: Schema.optional(Schema.NullOr(Schema.String)),
      refund_account_holder_address_city: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_country: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_line1: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_line2: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_postal_code: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_address_state: Schema.optional(
        Schema.NullOr(Schema.String),
      ),
      refund_account_holder_name: Schema.optional(Schema.NullOr(Schema.String)),
      refund_iban: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  sepa_debit: Schema.optional(
    Schema.Struct({
      bank_code: Schema.optional(Schema.NullOr(Schema.String)),
      branch_code: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
      mandate_reference: Schema.optional(Schema.NullOr(Schema.String)),
      mandate_url: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  sofort: Schema.optional(
    Schema.Struct({
      bank_code: Schema.optional(Schema.NullOr(Schema.String)),
      bank_name: Schema.optional(Schema.NullOr(Schema.String)),
      bic: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      iban_last4: Schema.optional(Schema.NullOr(Schema.String)),
      preferred_language: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  source_order: Schema.optional(
    Schema.Struct({
      amount: Schema.Number,
      currency: Schema.String,
      email: Schema.optional(Schema.String),
      items: Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            amount: Schema.NullOr(Schema.Number),
            currency: Schema.NullOr(Schema.String),
            description: Schema.NullOr(Schema.String),
            parent: Schema.NullOr(Schema.String),
            quantity: Schema.optional(Schema.Number),
            type: Schema.NullOr(Schema.String),
          }),
        ),
      ),
      shipping: Schema.optional(
        Schema.Struct({
          address: Schema.optional(
            Schema.Struct({
              city: Schema.NullOr(Schema.String),
              country: Schema.NullOr(Schema.String),
              line1: Schema.NullOr(Schema.String),
              line2: Schema.NullOr(Schema.String),
              postal_code: Schema.NullOr(Schema.String),
              state: Schema.NullOr(Schema.String),
            }),
          ),
          carrier: Schema.optional(Schema.NullOr(Schema.String)),
          name: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.NullOr(Schema.String)),
          tracking_number: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    }),
  ),
  statement_descriptor: Schema.NullOr(Schema.String),
  status: Schema.String,
  three_d_secure: Schema.optional(
    Schema.Struct({
      address_line1_check: Schema.optional(Schema.NullOr(Schema.String)),
      address_zip_check: Schema.optional(Schema.NullOr(Schema.String)),
      authenticated: Schema.optional(Schema.NullOr(Schema.Boolean)),
      brand: Schema.optional(Schema.NullOr(Schema.String)),
      card: Schema.optional(Schema.NullOr(Schema.String)),
      country: Schema.optional(Schema.NullOr(Schema.String)),
      customer: Schema.optional(Schema.NullOr(Schema.String)),
      cvc_check: Schema.optional(Schema.NullOr(Schema.String)),
      description: Schema.optional(Schema.String),
      dynamic_last4: Schema.optional(Schema.NullOr(Schema.String)),
      exp_month: Schema.optional(Schema.NullOr(Schema.Number)),
      exp_year: Schema.optional(Schema.NullOr(Schema.Number)),
      fingerprint: Schema.optional(Schema.String),
      funding: Schema.optional(Schema.NullOr(Schema.String)),
      iin: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      last4: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      three_d_secure: Schema.optional(Schema.String),
      tokenization_method: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
  type: Schema.Literals([
    "ach_credit_transfer",
    "ach_debit",
    "acss_debit",
    "alipay",
    "au_becs_debit",
    "bancontact",
    "card",
    "card_present",
    "eps",
    "giropay",
    "ideal",
    "klarna",
    "multibanco",
    "p24",
    "sepa_credit_transfer",
    "sepa_debit",
    "sofort",
    "three_d_secure",
    "wechat",
  ]),
  usage: Schema.NullOr(Schema.String),
  wechat: Schema.optional(
    Schema.Struct({
      prepay_id: Schema.optional(Schema.String),
      qr_code_url: Schema.optional(Schema.NullOr(Schema.String)),
      statement_descriptor: Schema.optional(Schema.String),
    }),
  ),
});
export type PostSourcesOutput = typeof PostSourcesOutput.Type;

// The operation
/**
 * Shares a source
 *
 * <p>Creates a new source object.</p>
 */
export const PostSources = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostSourcesInput,
  outputSchema: PostSourcesOutput,
}));
