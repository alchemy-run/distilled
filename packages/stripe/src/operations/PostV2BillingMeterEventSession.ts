import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2BillingMeterEventSessionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "POST", path: "/v2/billing/meter_event_session" }),
  );
export type PostV2BillingMeterEventSessionInput =
  typeof PostV2BillingMeterEventSessionInput.Type;

// Output Schema
export const PostV2BillingMeterEventSessionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authentication_token: Schema.String,
    created: Schema.String,
    expires_at: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.billing.meter_event_session"]),
  });
export type PostV2BillingMeterEventSessionOutput =
  typeof PostV2BillingMeterEventSessionOutput.Type;

// The operation
/**
 * Create a Meter Event Stream Authentication Session
 *
 * Creates a meter event session to send usage on the high-throughput meter event stream. Authentication tokens are only valid for 15 minutes, so you will need to create a new meter event session when your token expires.
 */
export const PostV2BillingMeterEventSession =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV2BillingMeterEventSessionInput,
    outputSchema: PostV2BillingMeterEventSessionOutput,
  }));
