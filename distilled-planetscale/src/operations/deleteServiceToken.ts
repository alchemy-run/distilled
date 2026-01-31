import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteServiceTokenInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/service-tokens/{id}",
  }),
);
export type DeleteServiceTokenInput = typeof DeleteServiceTokenInput.Type;

// Output Schema
export const DeleteServiceTokenOutput = Schema.Void;
export type DeleteServiceTokenOutput = typeof DeleteServiceTokenOutput.Type;

// The operation
/**
 * Delete a service token
 *
 * Delete a service token from the organization.
 *
 * @param organization - The name of the organization
 * @param id - The ID of the service token
 */
export const deleteServiceToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteServiceTokenInput,
  outputSchema: DeleteServiceTokenOutput,
}));
