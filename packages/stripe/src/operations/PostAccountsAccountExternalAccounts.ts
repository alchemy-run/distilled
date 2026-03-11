import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAccountsAccountExternalAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    default_for_currency: Schema.optional(Schema.Boolean),
    expand: Schema.optional(Schema.Array(Schema.String)),
    external_account: Schema.String,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/accounts/{account}/external_accounts",
      contentType: "form-urlencoded",
    }),
  );
export type PostAccountsAccountExternalAccountsInput =
  typeof PostAccountsAccountExternalAccountsInput.Type;

// Output Schema
export const PostAccountsAccountExternalAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type PostAccountsAccountExternalAccountsOutput =
  typeof PostAccountsAccountExternalAccountsOutput.Type;

// The operation
/**
 * Create an external account
 *
 * <p>Create an external account for a given account.</p>
 */
export const PostAccountsAccountExternalAccounts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostAccountsAccountExternalAccountsInput,
    outputSchema: PostAccountsAccountExternalAccountsOutput,
  }));
