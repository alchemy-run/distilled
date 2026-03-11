import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateProjectClaimTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/claim-token" }));
export type V1CreateProjectClaimTokenInput =
  typeof V1CreateProjectClaimTokenInput.Type;

// Output Schema
export const V1CreateProjectClaimTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    token: Schema.String,
    token_alias: Schema.String,
    expires_at: Schema.String,
    created_at: Schema.String,
    created_by: Schema.String,
  });
export type V1CreateProjectClaimTokenOutput =
  typeof V1CreateProjectClaimTokenOutput.Type;

// The operation
/**
 * Creates project claim token
 *
 * @param ref - Project ref
 */
export const v1CreateProjectClaimToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CreateProjectClaimTokenInput,
    outputSchema: V1CreateProjectClaimTokenOutput,
  }),
);
