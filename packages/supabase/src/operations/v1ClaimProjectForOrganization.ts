import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ClaimProjectForOrganizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    slug: Schema.String.pipe(T.PathParam()),
    token: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/organizations/{slug}/project-claim/{token}",
    }),
  );
export type V1ClaimProjectForOrganizationInput =
  typeof V1ClaimProjectForOrganizationInput.Type;

// Output Schema
export const V1ClaimProjectForOrganizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1ClaimProjectForOrganizationOutput =
  typeof V1ClaimProjectForOrganizationOutput.Type;

// The operation
/**
 * Claims project for the specified organization
 *
 * @param slug - Organization slug
 */
export const v1ClaimProjectForOrganization =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1ClaimProjectForOrganizationInput,
    outputSchema: V1ClaimProjectForOrganizationOutput,
  }));
