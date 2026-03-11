import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTaxSettingsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  defaults: Schema.optional(
    Schema.Struct({
      tax_behavior: Schema.optional(
        Schema.Literals(["exclusive", "inclusive", "inferred_by_currency"]),
      ),
      tax_code: Schema.optional(Schema.String),
    }),
  ),
  expand: Schema.optional(Schema.Array(Schema.String)),
  head_office: Schema.optional(
    Schema.Struct({
      address: Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
      }),
    }),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/tax/settings",
    contentType: "form-urlencoded",
  }),
);
export type PostTaxSettingsInput = typeof PostTaxSettingsInput.Type;

// Output Schema
export const PostTaxSettingsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostTaxSettingsOutput = typeof PostTaxSettingsOutput.Type;

// The operation
/**
 * Update settings
 *
 * <p>Updates Tax <code>Settings</code> parameters used in tax calculations. All parameters are editable but none can be removed once set.</p>
 */
export const PostTaxSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostTaxSettingsInput,
  outputSchema: PostTaxSettingsOutput,
}));
