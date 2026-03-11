import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetAnOrganizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    slug: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/organizations/{slug}" }));
export type V1GetAnOrganizationInput = typeof V1GetAnOrganizationInput.Type;

// Output Schema
export const V1GetAnOrganizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    plan: Schema.optional(
      Schema.Literals(["free", "pro", "team", "enterprise", "platform"]),
    ),
    opt_in_tags: Schema.Array(
      Schema.Literals([
        "AI_SQL_GENERATOR_OPT_IN",
        "AI_DATA_GENERATOR_OPT_IN",
        "AI_LOG_GENERATOR_OPT_IN",
      ]),
    ),
    allowed_release_channels: Schema.Array(
      Schema.Literals([
        "internal",
        "alpha",
        "beta",
        "ga",
        "withdrawn",
        "preview",
      ]),
    ),
  });
export type V1GetAnOrganizationOutput = typeof V1GetAnOrganizationOutput.Type;

// The operation
/**
 * Gets information about the organization
 *
 * @param slug - Organization slug
 */
export const v1GetAnOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetAnOrganizationInput,
  outputSchema: V1GetAnOrganizationOutput,
}));
