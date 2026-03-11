import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostFinancialConnectionsSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account_holder: Schema.Struct({
      account: Schema.optional(Schema.String),
      customer: Schema.optional(Schema.String),
      customer_account: Schema.optional(Schema.String),
      type: Schema.Literals(["account", "customer"]),
    }),
    expand: Schema.optional(Schema.Array(Schema.String)),
    filters: Schema.optional(
      Schema.Struct({
        account_subcategories: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "checking",
              "credit_card",
              "line_of_credit",
              "mortgage",
              "savings",
            ]),
          ),
        ),
        countries: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    permissions: Schema.Array(
      Schema.Literals([
        "balances",
        "ownership",
        "payment_method",
        "transactions",
      ]),
    ),
    prefetch: Schema.optional(
      Schema.Array(Schema.Literals(["balances", "ownership", "transactions"])),
    ),
    return_url: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/financial_connections/sessions",
      contentType: "form-urlencoded",
    }),
  );
export type PostFinancialConnectionsSessionsInput =
  typeof PostFinancialConnectionsSessionsInput.Type;

// Output Schema
export const PostFinancialConnectionsSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account_holder: Schema.Unknown,
    accounts: Schema.Struct({
      data: Schema.Array(
        Schema.Struct({
          account_holder: Schema.Unknown,
          account_numbers: Schema.NullOr(
            Schema.Array(
              Schema.Struct({
                expected_expiry_date: Schema.NullOr(Schema.Number),
                identifier_type: Schema.Literals([
                  "account_number",
                  "tokenized_account_number",
                ]),
                status: Schema.Literals(["deactivated", "transactable"]),
                supported_networks: Schema.Array(Schema.Literals(["ach"])),
              }),
            ),
          ),
          balance: Schema.Unknown,
          balance_refresh: Schema.Unknown,
          category: Schema.Literals(["cash", "credit", "investment", "other"]),
          created: Schema.Number,
          display_name: Schema.NullOr(Schema.String),
          id: Schema.String,
          institution_name: Schema.String,
          last4: Schema.NullOr(Schema.String),
          livemode: Schema.Boolean,
          object: Schema.Literals(["financial_connections.account"]),
          ownership: Schema.Unknown,
          ownership_refresh: Schema.Unknown,
          permissions: Schema.NullOr(
            Schema.Array(
              Schema.Literals([
                "balances",
                "ownership",
                "payment_method",
                "transactions",
              ]),
            ),
          ),
          status: Schema.Literals(["active", "disconnected", "inactive"]),
          subcategory: Schema.Literals([
            "checking",
            "credit_card",
            "line_of_credit",
            "mortgage",
            "other",
            "savings",
          ]),
          subscriptions: Schema.NullOr(
            Schema.Array(Schema.Literals(["transactions"])),
          ),
          supported_payment_method_types: Schema.Array(
            Schema.Literals(["link", "us_bank_account"]),
          ),
          transaction_refresh: Schema.Unknown,
        }),
      ),
      has_more: Schema.Boolean,
      object: Schema.Literals(["list"]),
      url: Schema.String,
    }),
    client_secret: Schema.NullOr(Schema.String),
    filters: Schema.optional(
      Schema.Struct({
        account_subcategories: Schema.NullOr(
          Schema.Array(
            Schema.Literals([
              "checking",
              "credit_card",
              "line_of_credit",
              "mortgage",
              "savings",
            ]),
          ),
        ),
        countries: Schema.NullOr(Schema.Array(Schema.String)),
      }),
    ),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["financial_connections.session"]),
    permissions: Schema.Array(
      Schema.Literals([
        "balances",
        "ownership",
        "payment_method",
        "transactions",
      ]),
    ),
    prefetch: Schema.NullOr(
      Schema.Array(Schema.Literals(["balances", "ownership", "transactions"])),
    ),
    return_url: Schema.optional(Schema.String),
  });
export type PostFinancialConnectionsSessionsOutput =
  typeof PostFinancialConnectionsSessionsOutput.Type;

// The operation
/**
 * Create a Session
 *
 * <p>To launch the Financial Connections authorization flow, create a <code>Session</code>. The session’s <code>client_secret</code> can be used to launch the flow using Stripe.js.</p>
 */
export const PostFinancialConnectionsSessions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostFinancialConnectionsSessionsInput,
    outputSchema: PostFinancialConnectionsSessionsOutput,
  }));
