import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTaxRatesTaxRateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tax_rate: Schema.String.pipe(T.PathParam()),
    active: Schema.optional(Schema.Boolean),
    country: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    display_name: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    jurisdiction: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Unknown),
    state: Schema.optional(Schema.String),
    tax_type: Schema.optional(
      Schema.Literals([
        "amusement_tax",
        "communications_tax",
        "gst",
        "hst",
        "igst",
        "jct",
        "lease_tax",
        "pst",
        "qst",
        "retail_delivery_fee",
        "rst",
        "sales_tax",
        "service_tax",
        "vat",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/tax_rates/{tax_rate}",
      contentType: "form-urlencoded",
    }),
  );
export type PostTaxRatesTaxRateInput = typeof PostTaxRatesTaxRateInput.Type;

// Output Schema
export const PostTaxRatesTaxRateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    country: Schema.NullOr(Schema.String),
    created: Schema.Number,
    description: Schema.NullOr(Schema.String),
    display_name: Schema.String,
    effective_percentage: Schema.NullOr(Schema.Number),
    flat_amount: Schema.Unknown,
    id: Schema.String,
    inclusive: Schema.Boolean,
    jurisdiction: Schema.NullOr(Schema.String),
    jurisdiction_level: Schema.NullOr(
      Schema.Literals([
        "city",
        "country",
        "county",
        "district",
        "multiple",
        "state",
      ]),
    ),
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["tax_rate"]),
    percentage: Schema.Number,
    rate_type: Schema.NullOr(Schema.Literals(["flat_amount", "percentage"])),
    state: Schema.NullOr(Schema.String),
    tax_type: Schema.NullOr(
      Schema.Literals([
        "amusement_tax",
        "communications_tax",
        "gst",
        "hst",
        "igst",
        "jct",
        "lease_tax",
        "pst",
        "qst",
        "retail_delivery_fee",
        "rst",
        "sales_tax",
        "service_tax",
        "vat",
      ]),
    ),
  });
export type PostTaxRatesTaxRateOutput = typeof PostTaxRatesTaxRateOutput.Type;

// The operation
/**
 * Update a tax rate
 *
 * <p>Updates an existing tax rate.</p>
 */
export const PostTaxRatesTaxRate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostTaxRatesTaxRateInput,
  outputSchema: PostTaxRatesTaxRateOutput,
}));
