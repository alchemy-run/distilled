import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CancelBranchChangeRequestInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/resizes",
  }),
);
export type CancelBranchChangeRequestInput =
  typeof CancelBranchChangeRequestInput.Type;

// Output Schema
export const CancelBranchChangeRequestOutput = Schema.Void;
export type CancelBranchChangeRequestOutput =
  typeof CancelBranchChangeRequestOutput.Type;

// The operation
/**
 * Cancel a change request
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 */
export const cancelBranchChangeRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CancelBranchChangeRequestInput,
    outputSchema: CancelBranchChangeRequestOutput,
  }),
);
