import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CancelBranchChangeRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export const CancelBranchChangeRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CancelBranchChangeRequestOutput =
  typeof CancelBranchChangeRequestOutput.Type;

// The operation
/**
 * Cancel a change request
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param database - Database name slug from `list_databases`. Example: `app-db`.
 * @param branch - Branch name from `list_branches`. Example: `main`.
 */
export const cancelBranchChangeRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CancelBranchChangeRequestInput,
    outputSchema: CancelBranchChangeRequestOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
