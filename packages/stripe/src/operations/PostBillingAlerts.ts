import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingAlertsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    alert_type: Schema.Literals(["usage_threshold"]),
    expand: Schema.optional(Schema.Array(Schema.String)),
    title: Schema.String,
    usage_threshold: Schema.optional(
      Schema.Struct({
        filters: Schema.optional(
          Schema.Array(
            Schema.Struct({
              customer: Schema.optional(Schema.String),
              type: Schema.Literals(["customer"]),
            }),
          ),
        ),
        gte: Schema.Number,
        meter: Schema.String,
        recurrence: Schema.Literals(["one_time"]),
      }),
    ),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/billing/alerts",
    contentType: "form-urlencoded",
  }),
);
export type PostBillingAlertsInput = typeof PostBillingAlertsInput.Type;

// Output Schema
export const PostBillingAlertsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    alert_type: Schema.Literals(["usage_threshold"]),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.alert"]),
    status: Schema.NullOr(Schema.Literals(["active", "archived", "inactive"])),
    title: Schema.String,
    usage_threshold: Schema.Unknown,
  });
export type PostBillingAlertsOutput = typeof PostBillingAlertsOutput.Type;

// The operation
/**
 * Create a billing alert
 *
 * <p>Creates a billing alert</p>
 */
export const PostBillingAlerts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostBillingAlertsInput,
  outputSchema: PostBillingAlertsOutput,
}));
