import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteTerminalLocationsLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/terminal/locations/{location}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteTerminalLocationsLocationInput =
  typeof DeleteTerminalLocationsLocationInput.Type;

// Output Schema
export const DeleteTerminalLocationsLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["terminal.location"]),
  });
export type DeleteTerminalLocationsLocationOutput =
  typeof DeleteTerminalLocationsLocationOutput.Type;

// The operation
/**
 * Delete a Location
 *
 * <p>Deletes a <code>Location</code> object.</p>
 */
export const DeleteTerminalLocationsLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteTerminalLocationsLocationInput,
    outputSchema: DeleteTerminalLocationsLocationOutput,
  }));
