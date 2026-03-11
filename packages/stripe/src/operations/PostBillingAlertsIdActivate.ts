import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingAlertsIdActivateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/alerts/{id}/activate",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingAlertsIdActivateInput =
  typeof PostBillingAlertsIdActivateInput.Type;

// Output Schema
export const PostBillingAlertsIdActivateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    alert_type: Schema.Literals(["usage_threshold"]),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.alert"]),
    status: Schema.NullOr(Schema.Literals(["active", "archived", "inactive"])),
    title: Schema.String,
    usage_threshold: Schema.Unknown,
  });
export type PostBillingAlertsIdActivateOutput =
  typeof PostBillingAlertsIdActivateOutput.Type;

// The operation
/**
 * Activate a billing alert
 *
 * <p>Reactivates this alert, allowing it to trigger again.</p>
 */
export const PostBillingAlertsIdActivate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostBillingAlertsIdActivateInput,
    outputSchema: PostBillingAlertsIdActivateOutput,
  }),
);
