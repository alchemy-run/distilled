import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateProjectTransferRequestInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  ttl_seconds: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "POST", path: "/projects/{project_id}/transfer_requests" }),
);
export type CreateProjectTransferRequestInput =
  typeof CreateProjectTransferRequestInput.Type;

// Output Schema
export const CreateProjectTransferRequestOutput = Schema.Struct({
  id: Schema.String,
  project_id: Schema.String,
  created_at: Schema.String,
  expires_at: Schema.String,
});
export type CreateProjectTransferRequestOutput =
  typeof CreateProjectTransferRequestOutput.Type;

// The operation
/**
 * Create a project transfer request
 *
 * Creates a transfer request for the specified project. A transfer request allows
 * the project to be transferred to another account or organization. The request
 * has an expiration time after which it can no longer be used. To accept/claim
 * the transfer request, the recipient user/organization must call the
 * `/projects/{project_id}/transfer_requests/{request_id}` API endpoint, or visit
 * `https://console.neon.tech/app/claim?p={project_id}&tr={request_id}&ru={redirect_url}`
 * in the Neon Console. The `ru` parameter is optional and can be used to redirect
 * the user after accepting the transfer request.
 *
 * @param project_id - The Neon project ID
 */
export const createProjectTransferRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateProjectTransferRequestInput,
    outputSchema: CreateProjectTransferRequestOutput,
  }));
