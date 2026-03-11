import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFinancialConnectionsAccountsAccountOwnersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    ownership: Schema.String,
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/financial_connections/accounts/{account}/owners",
      contentType: "form-urlencoded",
    }),
  );
export type GetFinancialConnectionsAccountsAccountOwnersInput =
  typeof GetFinancialConnectionsAccountsAccountOwnersInput.Type;

// Output Schema
export const GetFinancialConnectionsAccountsAccountOwnersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        email: Schema.NullOr(Schema.String),
        id: Schema.String,
        name: Schema.String,
        object: Schema.Literals(["financial_connections.account_owner"]),
        ownership: Schema.String,
        phone: Schema.NullOr(Schema.String),
        raw_address: Schema.NullOr(Schema.String),
        refreshed_at: Schema.NullOr(Schema.Number),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetFinancialConnectionsAccountsAccountOwnersOutput =
  typeof GetFinancialConnectionsAccountsAccountOwnersOutput.Type;

// The operation
/**
 * List Account Owners
 *
 * <p>Lists all owners for a given <code>Account</code></p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param ownership - The ID of the ownership object to fetch owners from.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetFinancialConnectionsAccountsAccountOwners =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFinancialConnectionsAccountsAccountOwnersInput,
    outputSchema: GetFinancialConnectionsAccountsAccountOwnersOutput,
  }));
