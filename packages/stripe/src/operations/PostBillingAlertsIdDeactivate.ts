import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingAlertsIdDeactivateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/alerts/{id}/deactivate",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingAlertsIdDeactivateInput =
  typeof PostBillingAlertsIdDeactivateInput.Type;

// Output Schema
export const PostBillingAlertsIdDeactivateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    alert_type: Schema.Literals(["usage_threshold"]),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.alert"]),
    status: Schema.NullOr(Schema.Literals(["active", "archived", "inactive"])),
    title: Schema.String,
    usage_threshold: Schema.Unknown,
  });
export type PostBillingAlertsIdDeactivateOutput =
  typeof PostBillingAlertsIdDeactivateOutput.Type;

// The operation
/**
 * Deactivate a billing alert
 *
 * <p>Deactivates this alert, preventing it from triggering.</p>
 */
export const PostBillingAlertsIdDeactivate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostBillingAlertsIdDeactivateInput,
    outputSchema: PostBillingAlertsIdDeactivateOutput,
  }));
