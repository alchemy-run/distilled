import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderSetReaderDisplayInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    cart: Schema.optional(
      Schema.Struct({
        currency: Schema.String,
        line_items: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            description: Schema.String,
            quantity: Schema.Number,
          }),
        ),
        tax: Schema.optional(Schema.Number),
        total: Schema.Number,
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    type: Schema.Literals(["cart"]),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/set_reader_display",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderSetReaderDisplayInput =
  typeof PostTerminalReadersReaderSetReaderDisplayInput.Type;

// Output Schema
export const PostTerminalReadersReaderSetReaderDisplayOutput =
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
export type PostTerminalReadersReaderSetReaderDisplayOutput =
  typeof PostTerminalReadersReaderSetReaderDisplayOutput.Type;

// The operation
/**
 * Set reader display
 *
 * <p>Sets the reader display to show <a href="/docs/terminal/features/display">cart details</a>.</p>
 */
export const PostTerminalReadersReaderSetReaderDisplay =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderSetReaderDisplayInput,
    outputSchema: PostTerminalReadersReaderSetReaderDisplayOutput,
  }));
