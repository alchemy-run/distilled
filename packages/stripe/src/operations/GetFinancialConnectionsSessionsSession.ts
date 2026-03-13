import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const GetFinancialConnectionsSessionsSessionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/financial_connections/sessions/{session}",
      contentType: "form-urlencoded",
    }),
  );
export type GetFinancialConnectionsSessionsSessionInput =
  typeof GetFinancialConnectionsSessionsSessionInput.Type;

// Output Schema
export const GetFinancialConnectionsSessionsSessionOutput =
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
    client_secret: SensitiveNullableString,
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
export type GetFinancialConnectionsSessionsSessionOutput =
  typeof GetFinancialConnectionsSessionsSessionOutput.Type;

// The operation
/**
 * Retrieve a Session
 *
 * <p>Retrieves the details of a Financial Connections <code>Session</code></p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetFinancialConnectionsSessionsSession =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFinancialConnectionsSessionsSessionInput,
    outputSchema: GetFinancialConnectionsSessionsSessionOutput,
  }));
