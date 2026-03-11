import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTaxSettingsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/tax/settings",
    contentType: "form-urlencoded",
  }),
);
export type GetTaxSettingsInput = typeof GetTaxSettingsInput.Type;

// Output Schema
export const GetTaxSettingsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  defaults: Schema.Struct({
    provider: Schema.Literals(["anrok", "avalara", "sphere", "stripe"]),
    tax_behavior: Schema.NullOr(
      Schema.Literals(["exclusive", "inclusive", "inferred_by_currency"]),
    ),
    tax_code: Schema.NullOr(Schema.String),
  }),
  head_office: Schema.Unknown,
  livemode: Schema.Boolean,
  object: Schema.Literals(["tax.settings"]),
  status: Schema.Literals(["active", "pending"]),
  status_details: Schema.Struct({
    active: Schema.optional(Schema.Struct({})),
    pending: Schema.optional(
      Schema.Struct({
        missing_fields: Schema.NullOr(Schema.Array(Schema.String)),
      }),
    ),
  }),
});
export type GetTaxSettingsOutput = typeof GetTaxSettingsOutput.Type;

// The operation
/**
 * Retrieve settings
 *
 * <p>Retrieves Tax <code>Settings</code> for a merchant.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTaxSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetTaxSettingsInput,
  outputSchema: GetTaxSettingsOutput,
}));
