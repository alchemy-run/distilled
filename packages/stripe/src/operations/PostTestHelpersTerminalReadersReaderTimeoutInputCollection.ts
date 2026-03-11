import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTerminalReadersReaderTimeoutInputCollectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTerminalReadersReaderTimeoutInputCollectionInput =
  typeof PostTestHelpersTerminalReadersReaderTimeoutInputCollectionInput.Type;

// Output Schema
export const PostTestHelpersTerminalReadersReaderTimeoutInputCollectionOutput =
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
export type PostTestHelpersTerminalReadersReaderTimeoutInputCollectionOutput =
  typeof PostTestHelpersTerminalReadersReaderTimeoutInputCollectionOutput.Type;

// The operation
/**
 * Simulate an input collection timeout
 *
 * <p>Use this endpoint to complete an input collection with a timeout error on a simulated reader.</p>
 */
export const PostTestHelpersTerminalReadersReaderTimeoutInputCollection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PostTestHelpersTerminalReadersReaderTimeoutInputCollectionInput,
    outputSchema:
      PostTestHelpersTerminalReadersReaderTimeoutInputCollectionOutput,
  }));
