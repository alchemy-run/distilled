import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTokensTokenInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  token: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/tokens/{token}",
    contentType: "form-urlencoded",
  }),
);
export type GetTokensTokenInput = typeof GetTokensTokenInput.Type;

// Output Schema
export const GetTokensTokenOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  bank_account: Schema.optional(
    Schema.Struct({
      account: Schema.optional(Schema.Unknown),
      account_holder_name: Schema.NullOr(Schema.String),
      account_holder_type: Schema.NullOr(Schema.String),
      account_type: Schema.NullOr(Schema.String),
      available_payout_methods: Schema.optional(
        Schema.NullOr(Schema.Array(Schema.Literals(["instant", "standard"]))),
      ),
      bank_name: Schema.NullOr(Schema.String),
      country: Schema.String,
      currency: Schema.String,
      customer: Schema.optional(Schema.Unknown),
      default_for_currency: Schema.optional(Schema.NullOr(Schema.Boolean)),
      fingerprint: Schema.NullOr(Schema.String),
      future_requirements: Schema.optional(Schema.Unknown),
      id: Schema.String,
      last4: Schema.String,
      metadata: Schema.optional(
        Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
      ),
      object: Schema.Literals(["bank_account"]),
      requirements: Schema.optional(Schema.Unknown),
      routing_number: Schema.NullOr(Schema.String),
      status: Schema.String,
    }),
  ),
  card: Schema.optional(
    Schema.Struct({
      account: Schema.optional(Schema.Unknown),
      address_city: Schema.NullOr(Schema.String),
      address_country: Schema.NullOr(Schema.String),
      address_line1: Schema.NullOr(Schema.String),
      address_line1_check: Schema.NullOr(Schema.String),
      address_line2: Schema.NullOr(Schema.String),
      address_state: Schema.NullOr(Schema.String),
      address_zip: Schema.NullOr(Schema.String),
      address_zip_check: Schema.NullOr(Schema.String),
      allow_redisplay: Schema.optional(
        Schema.NullOr(Schema.Literals(["always", "limited", "unspecified"])),
      ),
      available_payout_methods: Schema.optional(
        Schema.NullOr(Schema.Array(Schema.Literals(["instant", "standard"]))),
      ),
      brand: Schema.String,
      country: Schema.NullOr(Schema.String),
      currency: Schema.optional(Schema.NullOr(Schema.String)),
      customer: Schema.optional(Schema.Unknown),
      cvc_check: Schema.NullOr(Schema.String),
      default_for_currency: Schema.optional(Schema.NullOr(Schema.Boolean)),
      description: Schema.optional(Schema.String),
      dynamic_last4: Schema.NullOr(Schema.String),
      exp_month: Schema.Number,
      exp_year: Schema.Number,
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      funding: Schema.String,
      id: Schema.String,
      iin: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      last4: Schema.String,
      metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
      name: Schema.NullOr(Schema.String),
      networks: Schema.optional(
        Schema.Struct({
          preferred: Schema.NullOr(Schema.String),
        }),
      ),
      object: Schema.Literals(["card"]),
      regulated_status: Schema.NullOr(
        Schema.Literals(["regulated", "unregulated"]),
      ),
      status: Schema.optional(Schema.NullOr(Schema.String)),
      tokenization_method: Schema.NullOr(Schema.String),
    }),
  ),
  client_ip: Schema.NullOr(Schema.String),
  created: Schema.Number,
  id: Schema.String,
  livemode: Schema.Boolean,
  object: Schema.Literals(["token"]),
  type: Schema.String,
  used: Schema.Boolean,
});
export type GetTokensTokenOutput = typeof GetTokensTokenOutput.Type;

// The operation
/**
 * Retrieve a token
 *
 * <p>Retrieves the token with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTokensToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetTokensTokenInput,
  outputSchema: GetTokensTokenOutput,
}));
