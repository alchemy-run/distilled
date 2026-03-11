import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderProcessSetupIntentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    allow_redisplay: Schema.Literals(["always", "limited", "unspecified"]),
    expand: Schema.optional(Schema.Array(Schema.String)),
    process_config: Schema.optional(
      Schema.Struct({
        enable_customer_cancellation: Schema.optional(Schema.Boolean),
      }),
    ),
    setup_intent: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/process_setup_intent",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderProcessSetupIntentInput =
  typeof PostTerminalReadersReaderProcessSetupIntentInput.Type;

// Output Schema
export const PostTerminalReadersReaderProcessSetupIntentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    action: Schema.Unknown,
    device_sw_version: Schema.NullOr(Schema.String),
    device_type: Schema.Literals([
      "bbpos_chipper2x",
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "mobile_phone_reader",
      "simulated_stripe_s700",
      "simulated_stripe_s710",
      "simulated_wisepos_e",
      "stripe_m2",
      "stripe_s700",
      "stripe_s710",
      "verifone_P400",
    ]),
    id: Schema.String,
    ip_address: Schema.NullOr(Schema.String),
    label: Schema.String,
    last_seen_at: Schema.NullOr(Schema.Number),
    livemode: Schema.Boolean,
    location: Schema.Unknown,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["terminal.reader"]),
    serial_number: Schema.String,
    status: Schema.NullOr(Schema.Literals(["offline", "online"])),
  });
export type PostTerminalReadersReaderProcessSetupIntentOutput =
  typeof PostTerminalReadersReaderProcessSetupIntentOutput.Type;

// The operation
/**
 * Hand-off a SetupIntent to a Reader
 *
 * <p>Initiates a SetupIntent flow on a Reader. See <a href="/docs/terminal/features/saving-payment-details/save-directly">Save directly without charging</a> for more details.</p>
 */
export const PostTerminalReadersReaderProcessSetupIntent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderProcessSetupIntentInput,
    outputSchema: PostTerminalReadersReaderProcessSetupIntentOutput,
  }));
