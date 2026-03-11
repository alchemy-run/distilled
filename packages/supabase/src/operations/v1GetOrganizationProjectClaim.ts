import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetOrganizationProjectClaimInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    slug: Schema.String.pipe(T.PathParam()),
    token: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{slug}/project-claim/{token}",
    }),
  );
export type V1GetOrganizationProjectClaimInput =
  typeof V1GetOrganizationProjectClaimInput.Type;

// Output Schema
export const V1GetOrganizationProjectClaimOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project: Schema.Struct({
      ref: Schema.String,
      name: Schema.String,
    }),
    preview: Schema.Struct({
      valid: Schema.Boolean,
      warnings: Schema.Array(
        Schema.Struct({
          key: Schema.String,
          message: Schema.String,
        }),
      ),
      errors: Schema.Array(
        Schema.Struct({
          key: Schema.String,
          message: Schema.String,
        }),
      ),
      info: Schema.Array(
        Schema.Struct({
          key: Schema.String,
          message: Schema.String,
        }),
      ),
      members_exceeding_free_project_limit: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          limit: Schema.Number,
        }),
      ),
      source_subscription_plan: Schema.Literals([
        "free",
        "pro",
        "team",
        "enterprise",
        "platform",
      ]),
      target_subscription_plan: Schema.NullOr(
        Schema.Literals(["free", "pro", "team", "enterprise", "platform"]),
      ),
    }),
    expires_at: Schema.String,
    created_at: Schema.String,
    created_by: Schema.String,
  });
export type V1GetOrganizationProjectClaimOutput =
  typeof V1GetOrganizationProjectClaimOutput.Type;

// The operation
/**
 * Gets project details for the specified organization and claim token
 *
 * @param slug - Organization slug
 */
export const v1GetOrganizationProjectClaim =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1GetOrganizationProjectClaimInput,
    outputSchema: V1GetOrganizationProjectClaimOutput,
  }));
