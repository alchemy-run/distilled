import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderCancelActionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/cancel_action",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderCancelActionInput =
  typeof PostTerminalReadersReaderCancelActionInput.Type;

// Output Schema
export const PostTerminalReadersReaderCancelActionOutput =
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
export type PostTerminalReadersReaderCancelActionOutput =
  typeof PostTerminalReadersReaderCancelActionOutput.Type;

// The operation
/**
 * Cancel the current reader action
 *
 * <p>Cancels the current reader action. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven#programmatic-cancellation">Programmatic Cancellation</a> for more details.</p>
 */
export const PostTerminalReadersReaderCancelAction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderCancelActionInput,
    outputSchema: PostTerminalReadersReaderCancelActionOutput,
  }));
