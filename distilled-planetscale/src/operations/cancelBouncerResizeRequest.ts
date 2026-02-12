import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CancelBouncerResizeRequestInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  bouncer: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/bouncers/{bouncer}/resizes",
  }),
);
export type CancelBouncerResizeRequestInput =
  typeof CancelBouncerResizeRequestInput.Type;

// Output Schema
export const CancelBouncerResizeRequestOutput = Schema.Void;
export type CancelBouncerResizeRequestOutput =
  typeof CancelBouncerResizeRequestOutput.Type;

// The operation
/**
 * Cancel a resize request
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param bouncer - The name of the bouncer
 */
export const cancelBouncerResizeRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CancelBouncerResizeRequestInput,
    outputSchema: CancelBouncerResizeRequestOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
