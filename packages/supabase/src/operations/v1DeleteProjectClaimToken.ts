import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteProjectClaimTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/v1/projects/{ref}/claim-token" }));
export type V1DeleteProjectClaimTokenInput =
  typeof V1DeleteProjectClaimTokenInput.Type;

// Output Schema
export const V1DeleteProjectClaimTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DeleteProjectClaimTokenOutput =
  typeof V1DeleteProjectClaimTokenOutput.Type;

// The operation
/**
 * Revokes project claim token
 *
 * @param ref - Project ref
 */
export const v1DeleteProjectClaimToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1DeleteProjectClaimTokenInput,
    outputSchema: V1DeleteProjectClaimTokenOutput,
  }),
);
