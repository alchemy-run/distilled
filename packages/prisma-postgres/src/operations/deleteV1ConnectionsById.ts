import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1ConnectionsByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/v1/connections/{id}" }));
export type DeleteV1ConnectionsByIdInput =
  typeof DeleteV1ConnectionsByIdInput.Type;

// Output Schema
export const DeleteV1ConnectionsByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteV1ConnectionsByIdOutput =
  typeof DeleteV1ConnectionsByIdOutput.Type;

// The operation
/**
 * Delete connection
 *
 * Deletes the connection with the given ID.
 */
export const deleteV1ConnectionsById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteV1ConnectionsByIdInput,
    outputSchema: DeleteV1ConnectionsByIdOutput,
  }),
);
