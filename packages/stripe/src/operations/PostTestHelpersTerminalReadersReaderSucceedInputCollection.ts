import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTerminalReadersReaderSucceedInputCollectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    skip_non_required_inputs: Schema.optional(Schema.Literals(["all", "none"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTerminalReadersReaderSucceedInputCollectionInput =
  typeof PostTestHelpersTerminalReadersReaderSucceedInputCollectionInput.Type;

// Output Schema
export const PostTestHelpersTerminalReadersReaderSucceedInputCollectionOutput =
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
export type PostTestHelpersTerminalReadersReaderSucceedInputCollectionOutput =
  typeof PostTestHelpersTerminalReadersReaderSucceedInputCollectionOutput.Type;

// The operation
/**
 * Simulate a successful input collection
 *
 * <p>Use this endpoint to trigger a successful input collection on a simulated reader.</p>
 */
export const PostTestHelpersTerminalReadersReaderSucceedInputCollection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PostTestHelpersTerminalReadersReaderSucceedInputCollectionInput,
    outputSchema:
      PostTestHelpersTerminalReadersReaderSucceedInputCollectionOutput,
  }));
