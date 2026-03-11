import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostProductsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.optional(Schema.Boolean),
  default_price_data: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      currency_options: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            custom_unit_amount: Schema.optional(
              Schema.Struct({
                enabled: Schema.Boolean,
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                preset: Schema.optional(Schema.Number),
              }),
            ),
            tax_behavior: Schema.optional(
              Schema.Literals(["exclusive", "inclusive", "unspecified"]),
            ),
            tiers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  flat_amount: Schema.optional(Schema.Number),
                  flat_amount_decimal: Schema.optional(Schema.String),
                  unit_amount: Schema.optional(Schema.Number),
                  unit_amount_decimal: Schema.optional(Schema.String),
                  up_to: Schema.Unknown,
                }),
              ),
            ),
            unit_amount: Schema.optional(Schema.Number),
            unit_amount_decimal: Schema.optional(Schema.String),
          }),
        ),
      ),
      custom_unit_amount: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
          maximum: Schema.optional(Schema.Number),
          minimum: Schema.optional(Schema.Number),
          preset: Schema.optional(Schema.Number),
        }),
      ),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      recurring: Schema.optional(
        Schema.Struct({
          interval: Schema.Literals(["day", "month", "week", "year"]),
          interval_count: Schema.optional(Schema.Number),
        }),
      ),
      tax_behavior: Schema.optional(
        Schema.Literals(["exclusive", "inclusive", "unspecified"]),
      ),
      unit_amount: Schema.optional(Schema.Number),
      unit_amount_decimal: Schema.optional(Schema.String),
    }),
  ),
  description: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(Schema.String)),
  marketing_features: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
      }),
    ),
  ),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.String,
  package_dimensions: Schema.optional(
    Schema.Struct({
      height: Schema.Number,
      length: Schema.Number,
      weight: Schema.Number,
      width: Schema.Number,
    }),
  ),
  shippable: Schema.optional(Schema.Boolean),
  statement_descriptor: Schema.optional(Schema.String),
  tax_code: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literals(["good", "service"])),
  unit_label: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/products",
    contentType: "form-urlencoded",
  }),
);
export type PostProductsInput = typeof PostProductsInput.Type;

// Output Schema
export const PostProductsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.Boolean,
  created: Schema.Number,
  default_price: Schema.optional(Schema.Unknown),
  description: Schema.NullOr(Schema.String),
  id: Schema.String,
  images: Schema.Array(Schema.String),
  livemode: Schema.Boolean,
  marketing_features: Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ),
  metadata: Schema.Record(Schema.String, Schema.String),
  name: Schema.String,
  object: Schema.Literals(["product"]),
  package_dimensions: Schema.Unknown,
  shippable: Schema.NullOr(Schema.Boolean),
  statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
  tax_code: Schema.optional(Schema.Unknown),
  type: Schema.Literals(["good", "service"]),
  unit_label: Schema.optional(Schema.NullOr(Schema.String)),
  updated: Schema.Number,
  url: Schema.NullOr(Schema.String),
});
export type PostProductsOutput = typeof PostProductsOutput.Type;

// The operation
/**
 * Create a product
 *
 * <p>Creates a new product object.</p>
 */
export const PostProducts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostProductsInput,
  outputSchema: PostProductsOutput,
}));
