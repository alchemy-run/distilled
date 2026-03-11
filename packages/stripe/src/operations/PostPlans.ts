import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPlansInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.optional(Schema.Boolean),
  amount: Schema.optional(Schema.Number),
  amount_decimal: Schema.optional(Schema.String),
  billing_scheme: Schema.optional(Schema.Literals(["per_unit", "tiered"])),
  currency: Schema.String,
  expand: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  interval: Schema.Literals(["day", "month", "week", "year"]),
  interval_count: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Unknown),
  meter: Schema.optional(Schema.String),
  nickname: Schema.optional(Schema.String),
  product: Schema.optional(Schema.Unknown),
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
  tiers_mode: Schema.optional(Schema.Literals(["graduated", "volume"])),
  transform_usage: Schema.optional(
    Schema.Struct({
      divide_by: Schema.Number,
      round: Schema.Literals(["down", "up"]),
    }),
  ),
  trial_period_days: Schema.optional(Schema.Number),
  usage_type: Schema.optional(Schema.Literals(["licensed", "metered"])),
}).pipe(
  T.Http({ method: "POST", path: "/v1/plans", contentType: "form-urlencoded" }),
);
export type PostPlansInput = typeof PostPlansInput.Type;

// Output Schema
export const PostPlansOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.Boolean,
  amount: Schema.NullOr(Schema.Number),
  amount_decimal: Schema.NullOr(Schema.String),
  billing_scheme: Schema.Literals(["per_unit", "tiered"]),
  created: Schema.Number,
  currency: Schema.String,
  id: Schema.String,
  interval: Schema.Literals(["day", "month", "week", "year"]),
  interval_count: Schema.Number,
  livemode: Schema.Boolean,
  metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  meter: Schema.NullOr(Schema.String),
  nickname: Schema.NullOr(Schema.String),
  object: Schema.Literals(["plan"]),
  product: Schema.Unknown,
  tiers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        flat_amount: Schema.NullOr(Schema.Number),
        flat_amount_decimal: Schema.NullOr(Schema.String),
        unit_amount: Schema.NullOr(Schema.Number),
        unit_amount_decimal: Schema.NullOr(Schema.String),
        up_to: Schema.NullOr(Schema.Number),
      }),
    ),
  ),
  tiers_mode: Schema.NullOr(Schema.Literals(["graduated", "volume"])),
  transform_usage: Schema.Unknown,
  trial_period_days: Schema.NullOr(Schema.Number),
  usage_type: Schema.Literals(["licensed", "metered"]),
});
export type PostPlansOutput = typeof PostPlansOutput.Type;

// The operation
/**
 * Create a plan
 *
 * <p>You can now model subscriptions more flexibly using the <a href="#prices">Prices API</a>. It replaces the Plans API and is backwards compatible to simplify your migration.</p>
 */
export const PostPlans = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostPlansInput,
  outputSchema: PostPlansOutput,
}));
