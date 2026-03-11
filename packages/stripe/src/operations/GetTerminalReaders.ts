import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTerminalReadersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    device_type: Schema.optional(
      Schema.Literals([
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
    ),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    location: Schema.optional(Schema.String),
    serial_number: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["offline", "online"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/terminal/readers",
      contentType: "form-urlencoded",
    }),
  );
export type GetTerminalReadersInput = typeof GetTerminalReadersInput.Type;

// Output Schema
export const GetTerminalReadersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTerminalReadersOutput = typeof GetTerminalReadersOutput.Type;

// The operation
/**
 * List all Readers
 *
 * <p>Returns a list of <code>Reader</code> objects.</p>
 *
 * @param device_type - Filters readers by device type
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param location - A location ID to filter the response list to only readers at the specific location
 * @param serial_number - Filters readers by serial number
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - A status filter to filter readers to only offline or online readers
 */
export const GetTerminalReaders = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetTerminalReadersInput,
  outputSchema: GetTerminalReadersOutput,
}));
