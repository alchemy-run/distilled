import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTerminalLocationsLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/terminal/locations/{location}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTerminalLocationsLocationInput =
  typeof GetTerminalLocationsLocationInput.Type;

// Output Schema
export const GetTerminalLocationsLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetTerminalLocationsLocationOutput =
  typeof GetTerminalLocationsLocationOutput.Type;

// The operation
/**
 * Retrieve a Location
 *
 * <p>Retrieves a <code>Location</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTerminalLocationsLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTerminalLocationsLocationInput,
    outputSchema: GetTerminalLocationsLocationOutput,
  }));
