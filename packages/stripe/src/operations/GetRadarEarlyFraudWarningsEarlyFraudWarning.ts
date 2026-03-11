import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetRadarEarlyFraudWarningsEarlyFraudWarningInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    early_fraud_warning: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/radar/early_fraud_warnings/{early_fraud_warning}",
      contentType: "form-urlencoded",
    }),
  );
export type GetRadarEarlyFraudWarningsEarlyFraudWarningInput =
  typeof GetRadarEarlyFraudWarningsEarlyFraudWarningInput.Type;

// Output Schema
export const GetRadarEarlyFraudWarningsEarlyFraudWarningOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    actionable: Schema.Boolean,
    charge: Schema.Unknown,
    created: Schema.Number,
    fraud_type: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["radar.early_fraud_warning"]),
    payment_intent: Schema.optional(Schema.Unknown),
  });
export type GetRadarEarlyFraudWarningsEarlyFraudWarningOutput =
  typeof GetRadarEarlyFraudWarningsEarlyFraudWarningOutput.Type;

// The operation
/**
 * Retrieve an early fraud warning
 *
 * <p>Retrieves the details of an early fraud warning that has previously been created. </p>
 * <p>Please refer to the <a href="#early_fraud_warning_object">early fraud warning</a> object reference for more details.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetRadarEarlyFraudWarningsEarlyFraudWarning =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetRadarEarlyFraudWarningsEarlyFraudWarningInput,
    outputSchema: GetRadarEarlyFraudWarningsEarlyFraudWarningOutput,
  }));
