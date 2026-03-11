import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    label: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Unknown),
    registration_code: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersInput = typeof PostTerminalReadersInput.Type;

// Output Schema
export const PostTerminalReadersOutput =
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
export type PostTerminalReadersOutput = typeof PostTerminalReadersOutput.Type;

// The operation
/**
 * Create a Reader
 *
 * <p>Creates a new <code>Reader</code> object.</p>
 */
export const PostTerminalReaders = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostTerminalReadersInput,
  outputSchema: PostTerminalReadersOutput,
}));
