import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPlansPlanInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  plan: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/plans/{plan}",
    contentType: "form-urlencoded",
  }),
);
export type GetPlansPlanInput = typeof GetPlansPlanInput.Type;

// Output Schema
export const GetPlansPlanOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type GetPlansPlanOutput = typeof GetPlansPlanOutput.Type;

// The operation
/**
 * Retrieve a plan
 *
 * <p>Retrieves the plan with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetPlansPlan = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPlansPlanInput,
  outputSchema: GetPlansPlanOutput,
}));
