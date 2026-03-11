import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAccountsAccountExternalAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    object: Schema.optional(Schema.Literals(["bank_account", "card"])),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/accounts/{account}/external_accounts",
      contentType: "form-urlencoded",
    }),
  );
export type GetAccountsAccountExternalAccountsInput =
  typeof GetAccountsAccountExternalAccountsInput.Type;

// Output Schema
export const GetAccountsAccountExternalAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(Schema.Unknown),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetAccountsAccountExternalAccountsOutput =
  typeof GetAccountsAccountExternalAccountsOutput.Type;

// The operation
/**
 * List all external accounts
 *
 * <p>List external accounts for an account.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param object - Filter external accounts according to a particular object type.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetAccountsAccountExternalAccounts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAccountsAccountExternalAccountsInput,
    outputSchema: GetAccountsAccountExternalAccountsOutput,
  }));
