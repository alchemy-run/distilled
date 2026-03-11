import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostFinancialConnectionsAccountsAccountRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    features: Schema.Array(
      Schema.Literals(["balance", "ownership", "transactions"]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/financial_connections/accounts/{account}/refresh",
      contentType: "form-urlencoded",
    }),
  );
export type PostFinancialConnectionsAccountsAccountRefreshInput =
  typeof PostFinancialConnectionsAccountsAccountRefreshInput.Type;

// Output Schema
export const PostFinancialConnectionsAccountsAccountRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostFinancialConnectionsAccountsAccountRefreshOutput =
  typeof PostFinancialConnectionsAccountsAccountRefreshOutput.Type;

// The operation
/**
 * Refresh Account data
 *
 * <p>Refreshes the data associated with a Financial Connections <code>Account</code>.</p>
 */
export const PostFinancialConnectionsAccountsAccountRefresh =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostFinancialConnectionsAccountsAccountRefreshInput,
    outputSchema: PostFinancialConnectionsAccountsAccountRefreshOutput,
  }));
