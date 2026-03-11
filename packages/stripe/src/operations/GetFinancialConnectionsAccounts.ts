import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFinancialConnectionsAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account_holder: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    session: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/financial_connections/accounts",
      contentType: "form-urlencoded",
    }),
  );
export type GetFinancialConnectionsAccountsInput =
  typeof GetFinancialConnectionsAccountsInput.Type;

// Output Schema
export const GetFinancialConnectionsAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetFinancialConnectionsAccountsOutput =
  typeof GetFinancialConnectionsAccountsOutput.Type;

// The operation
/**
 * List Accounts
 *
 * <p>Returns a list of Financial Connections <code>Account</code> objects.</p>
 *
 * @param account_holder - If present, only return accounts that belong to the specified account holder. `account_holder[customer]` and `account_holder[account]` are mutually exclusive.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param session - If present, only return accounts that were collected as part of the given session.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetFinancialConnectionsAccounts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFinancialConnectionsAccountsInput,
    outputSchema: GetFinancialConnectionsAccountsOutput,
  }));
