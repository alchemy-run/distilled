import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCurrentUserInfoInput = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/users/me" }),
);
export type GetCurrentUserInfoInput = typeof GetCurrentUserInfoInput.Type;

// Output Schema
export const GetCurrentUserInfoOutput = Schema.Struct({
  active_seconds_limit: Schema.Number,
  billing_account: Schema.optional(
    Schema.Struct({
      state: Schema.Literals([
        "UNKNOWN",
        "active",
        "suspended",
        "deactivated",
        "deleted",
      ]),
      payment_source: Schema.Struct({
        type: Schema.String,
        card: Schema.optional(
          Schema.Struct({
            last4: Schema.String,
            brand: Schema.optional(
              Schema.Literals([
                "amex",
                "diners",
                "discover",
                "jcb",
                "mastercard",
                "unionpay",
                "unknown",
                "visa",
              ]),
            ),
            exp_month: Schema.optional(Schema.Number),
            exp_year: Schema.optional(Schema.Number),
          }),
        ),
      }),
      subscription_type: Schema.Literals([
        "UNKNOWN",
        "direct_sales",
        "direct_sales_v3",
        "aws_marketplace",
        "free_v2",
        "free_v3",
        "launch",
        "launch_v3",
        "scale",
        "scale_v3",
        "business",
        "vercel_pg_legacy",
      ]),
      payment_method: Schema.Literals([
        "UNKNOWN",
        "none",
        "stripe",
        "direct_payment",
        "aws_mp",
        "azure_mp",
        "vercel_mp",
        "staff",
        "trial",
        "sponsorship",
      ]),
      quota_reset_at_last: Schema.String,
      name: Schema.String,
      email: Schema.String,
      address_city: Schema.String,
      address_country: Schema.String,
      address_country_name: Schema.optional(Schema.String),
      address_line1: Schema.String,
      address_line2: Schema.String,
      address_postal_code: Schema.String,
      address_state: Schema.String,
      orb_portal_url: Schema.optional(Schema.String),
      tax_id: Schema.optional(Schema.String),
      tax_id_type: Schema.optional(Schema.String),
      plan_details: Schema.optional(
        Schema.Struct({
          name: Schema.String,
          version: Schema.optional(
            Schema.Struct({
              major: Schema.Number,
              minor: Schema.Number,
            }),
          ),
        }),
      ),
    }),
  ),
  auth_accounts: Schema.Array(
    Schema.Struct({
      email: Schema.String,
      image: Schema.String,
      login: Schema.String,
      name: Schema.String,
      provider: Schema.Literals([
        "github",
        "google",
        "hasura",
        "microsoft",
        "microsoftv2",
        "vercelmp",
        "keycloak",
      ]),
    }),
  ),
  email: Schema.String,
  id: Schema.String,
  image: Schema.String,
  login: Schema.String,
  name: Schema.String,
  last_name: Schema.String,
  projects_limit: Schema.Number,
  branches_limit: Schema.Number,
  max_autoscaling_limit: Schema.Number,
  compute_seconds_limit: Schema.optional(Schema.Number),
  plan: Schema.String,
});
export type GetCurrentUserInfoOutput = typeof GetCurrentUserInfoOutput.Type;

// The operation
/**
 * Retrieve current user details
 *
 * Retrieves information about the current Neon user account.
 */
export const getCurrentUserInfo = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetCurrentUserInfoInput,
  outputSchema: GetCurrentUserInfoOutput,
}));
