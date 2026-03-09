import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1ProjectsByIdInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/v1/projects/{id}" }));
export type DeleteV1ProjectsByIdInput = typeof DeleteV1ProjectsByIdInput.Type;

// Output Schema
export const DeleteV1ProjectsByIdOutput = Schema.Void;
export type DeleteV1ProjectsByIdOutput = typeof DeleteV1ProjectsByIdOutput.Type;

// The operation
/**
 * Delete project
 *
 * Deletes the project with the given ID.
 */
export const deleteV1ProjectsById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteV1ProjectsByIdInput,
    outputSchema: DeleteV1ProjectsByIdOutput,
  }),
);
