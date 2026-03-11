import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPlansPlanInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  plan: Schema.String.pipe(T.PathParam()),
  active: Schema.optional(Schema.Boolean),
  expand: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Unknown),
  nickname: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  trial_period_days: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/plans/{plan}",
    contentType: "form-urlencoded",
  }),
);
export type PostPlansPlanInput = typeof PostPlansPlanInput.Type;

// Output Schema
export const PostPlansPlanOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostPlansPlanOutput = typeof PostPlansPlanOutput.Type;

// The operation
/**
 * Update a plan
 *
 * <p>Updates the specified plan by setting the values of the parameters passed. Any parameters not provided are left unchanged. By design, you cannot change a plan’s ID, amount, currency, or billing cycle.</p>
 */
export const PostPlansPlan = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostPlansPlanInput,
  outputSchema: PostPlansPlanOutput,
}));
