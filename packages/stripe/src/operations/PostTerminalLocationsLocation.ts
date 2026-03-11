import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalLocationsLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    address: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
      }),
    ),
    address_kana: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
        town: Schema.optional(Schema.String),
      }),
    ),
    address_kanji: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
        town: Schema.optional(Schema.String),
      }),
    ),
    configuration_overrides: Schema.optional(Schema.Unknown),
    display_name: Schema.optional(Schema.Unknown),
    display_name_kana: Schema.optional(Schema.Unknown),
    display_name_kanji: Schema.optional(Schema.Unknown),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    phone: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/locations/{location}",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalLocationsLocationInput =
  typeof PostTerminalLocationsLocationInput.Type;

// Output Schema
export const PostTerminalLocationsLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type PostTerminalLocationsLocationOutput =
  typeof PostTerminalLocationsLocationOutput.Type;

// The operation
/**
 * Update a Location
 *
 * <p>Updates a <code>Location</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 */
export const PostTerminalLocationsLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalLocationsLocationInput,
    outputSchema: PostTerminalLocationsLocationOutput,
  }));
