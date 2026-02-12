import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AcceptProjectTransferRequestInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  request_id: Schema.String.pipe(T.PathParam()),
  org_id: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/projects/{project_id}/transfer_requests/{request_id}" }));
export type AcceptProjectTransferRequestInput = typeof AcceptProjectTransferRequestInput.Type;

// Output Schema
export const AcceptProjectTransferRequestOutput = Schema.Void;
export type AcceptProjectTransferRequestOutput = typeof AcceptProjectTransferRequestOutput.Type;

// The operation
/**
 * Accept a project transfer request
 *
 * Accepts a transfer request for the specified project, transferring it to the specified organization
 * or user. If org_id is not passed, the project will be transferred to the current user or organization account.
 *
 * @param project_id - The Neon project ID
 * @param request_id - The Neon project transfer request ID
 */
export const acceptProjectTransferRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AcceptProjectTransferRequestInput,
  outputSchema: AcceptProjectTransferRequestOutput,
}));
