import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV2CoreEventDestinationsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "DELETE", path: "/v2/core/event_destinations/{id}" }),
  );
export type DeleteV2CoreEventDestinationsIdInput =
  typeof DeleteV2CoreEventDestinationsIdInput.Type;

// Output Schema
export const DeleteV2CoreEventDestinationsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    object: Schema.optional(Schema.String),
  });
export type DeleteV2CoreEventDestinationsIdOutput =
  typeof DeleteV2CoreEventDestinationsIdOutput.Type;

// The operation
/**
 * Delete an Event Destination
 *
 * Delete an event destination.
 *
 * @param id - Identifier for the event destination to delete.
 */
export const DeleteV2CoreEventDestinationsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteV2CoreEventDestinationsIdInput,
    outputSchema: DeleteV2CoreEventDestinationsIdOutput,
  }));
