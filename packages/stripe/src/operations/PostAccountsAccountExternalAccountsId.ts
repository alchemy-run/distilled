import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAccountsAccountExternalAccountsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    account_holder_name: Schema.optional(Schema.String),
    account_holder_type: Schema.optional(
      Schema.Literals(["", "company", "individual"]),
    ),
    account_type: Schema.optional(
      Schema.Literals(["checking", "futsu", "savings", "toza"]),
    ),
    address_city: Schema.optional(Schema.String),
    address_country: Schema.optional(Schema.String),
    address_line1: Schema.optional(Schema.String),
    address_line2: Schema.optional(Schema.String),
    address_state: Schema.optional(Schema.String),
    address_zip: Schema.optional(Schema.String),
    default_for_currency: Schema.optional(Schema.Boolean),
    documents: Schema.optional(
      Schema.Struct({
        bank_account_ownership_verification: Schema.optional(
          Schema.Struct({
            files: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      }),
    ),
    exp_month: Schema.optional(Schema.String),
    exp_year: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    name: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/accounts/{account}/external_accounts/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostAccountsAccountExternalAccountsIdInput =
  typeof PostAccountsAccountExternalAccountsIdInput.Type;

// Output Schema
export const PostAccountsAccountExternalAccountsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type PostAccountsAccountExternalAccountsIdOutput =
  typeof PostAccountsAccountExternalAccountsIdOutput.Type;

// The operation
/**
 * <p>Updates the metadata, account holder name, account holder type of a bank account belonging to
 * a connected account and optionally sets it as the default for its currency. Other bank account
 * details are not editable by design.</p>
 * <p>You can only update bank accounts when <a href="/api/accounts/object#account_object-controller-requirement_collection">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href="/connect/custom-accounts">Custom accounts</a>.</p>
 * <p>You can re-enable a disabled bank account by performing an update call without providing any
 * arguments or changes.</p>
 */
export const PostAccountsAccountExternalAccountsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostAccountsAccountExternalAccountsIdInput,
    outputSchema: PostAccountsAccountExternalAccountsIdOutput,
  }));
