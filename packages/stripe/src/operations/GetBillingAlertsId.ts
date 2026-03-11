import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingAlertsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/alerts/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingAlertsIdInput = typeof GetBillingAlertsIdInput.Type;

// Output Schema
export const GetBillingAlertsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    alert_type: Schema.Literals(["usage_threshold"]),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.alert"]),
    status: Schema.NullOr(Schema.Literals(["active", "archived", "inactive"])),
    title: Schema.String,
    usage_threshold: Schema.Unknown,
  });
export type GetBillingAlertsIdOutput = typeof GetBillingAlertsIdOutput.Type;

// The operation
/**
 * Retrieve a billing alert
 *
 * <p>Retrieves a billing alert given an ID</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetBillingAlertsId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBillingAlertsIdInput,
  outputSchema: GetBillingAlertsIdOutput,
}));
