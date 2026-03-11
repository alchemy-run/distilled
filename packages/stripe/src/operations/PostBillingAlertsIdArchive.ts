import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingAlertsIdArchiveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/alerts/{id}/archive",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingAlertsIdArchiveInput =
  typeof PostBillingAlertsIdArchiveInput.Type;

// Output Schema
export const PostBillingAlertsIdArchiveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    alert_type: Schema.Literals(["usage_threshold"]),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.alert"]),
    status: Schema.NullOr(Schema.Literals(["active", "archived", "inactive"])),
    title: Schema.String,
    usage_threshold: Schema.Unknown,
  });
export type PostBillingAlertsIdArchiveOutput =
  typeof PostBillingAlertsIdArchiveOutput.Type;

// The operation
/**
 * Archive a billing alert
 *
 * <p>Archives this alert, removing it from the list view and APIs. This is non-reversible.</p>
 */
export const PostBillingAlertsIdArchive = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostBillingAlertsIdArchiveInput,
    outputSchema: PostBillingAlertsIdArchiveOutput,
  }),
);
