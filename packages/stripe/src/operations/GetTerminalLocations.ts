import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTerminalLocationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/terminal/locations",
      contentType: "form-urlencoded",
    }),
  );
export type GetTerminalLocationsInput = typeof GetTerminalLocationsInput.Type;

// Output Schema
export const GetTerminalLocationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        address: Schema.Struct({
          city: Schema.NullOr(Schema.String),
          country: Schema.NullOr(Schema.String),
          line1: Schema.NullOr(Schema.String),
          line2: Schema.NullOr(Schema.String),
          postal_code: Schema.NullOr(Schema.String),
          state: Schema.NullOr(Schema.String),
        }),
        address_kana: Schema.optional(
          Schema.Struct({
            city: Schema.NullOr(Schema.String),
            country: Schema.NullOr(Schema.String),
            line1: Schema.NullOr(Schema.String),
            line2: Schema.NullOr(Schema.String),
            postal_code: Schema.NullOr(Schema.String),
            state: Schema.NullOr(Schema.String),
            town: Schema.NullOr(Schema.String),
          }),
        ),
        address_kanji: Schema.optional(
          Schema.Struct({
            city: Schema.NullOr(Schema.String),
            country: Schema.NullOr(Schema.String),
            line1: Schema.NullOr(Schema.String),
            line2: Schema.NullOr(Schema.String),
            postal_code: Schema.NullOr(Schema.String),
            state: Schema.NullOr(Schema.String),
            town: Schema.NullOr(Schema.String),
          }),
        ),
        configuration_overrides: Schema.optional(Schema.String),
        display_name: Schema.String,
        display_name_kana: Schema.optional(Schema.String),
        display_name_kanji: Schema.optional(Schema.String),
        id: Schema.String,
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        object: Schema.Literals(["terminal.location"]),
        phone: Schema.optional(Schema.String),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTerminalLocationsOutput = typeof GetTerminalLocationsOutput.Type;

// The operation
/**
 * List all Locations
 *
 * <p>Returns a list of <code>Location</code> objects.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetTerminalLocations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTerminalLocationsInput,
    outputSchema: GetTerminalLocationsOutput,
  }),
);
