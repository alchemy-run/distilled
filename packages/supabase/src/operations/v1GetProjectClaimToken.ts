import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectClaimTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/claim-token" }));
export type V1GetProjectClaimTokenInput =
  typeof V1GetProjectClaimTokenInput.Type;

// Output Schema
export const V1GetProjectClaimTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    token_alias: Schema.String,
    expires_at: Schema.String,
    created_at: Schema.String,
    created_by: Schema.String,
  });
export type V1GetProjectClaimTokenOutput =
  typeof V1GetProjectClaimTokenOutput.Type;

// The operation
/**
 * Gets project claim token
 *
 * @param ref - Project ref
 */
export const v1GetProjectClaimToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectClaimTokenInput,
    outputSchema: V1GetProjectClaimTokenOutput,
  }),
);
