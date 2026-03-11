import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetPostgresUpgradeEligibilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/upgrade/eligibility" }),
  );
export type V1GetPostgresUpgradeEligibilityInput =
  typeof V1GetPostgresUpgradeEligibilityInput.Type;

// Output Schema
export const V1GetPostgresUpgradeEligibilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eligible: Schema.Boolean,
    current_app_version: Schema.String,
    current_app_version_release_channel: Schema.Literals([
      "internal",
      "alpha",
      "beta",
      "ga",
      "withdrawn",
      "preview",
    ]),
    latest_app_version: Schema.String,
    target_upgrade_versions: Schema.Array(
      Schema.Struct({
        postgres_version: Schema.Literals([
          "13",
          "14",
          "15",
          "17",
          "17-oriole",
        ]),
        release_channel: Schema.Literals([
          "internal",
          "alpha",
          "beta",
          "ga",
          "withdrawn",
          "preview",
        ]),
        app_version: Schema.String,
      }),
    ),
    duration_estimate_hours: Schema.Number,
    legacy_auth_custom_roles: Schema.Array(Schema.String),
    objects_to_be_dropped: Schema.Array(Schema.String),
    unsupported_extensions: Schema.Array(Schema.String),
    user_defined_objects_in_internal_schemas: Schema.Array(Schema.String),
    validation_errors: Schema.Array(Schema.Unknown),
  });
export type V1GetPostgresUpgradeEligibilityOutput =
  typeof V1GetPostgresUpgradeEligibilityOutput.Type;

// The operation
/**
 * [Beta] Returns the project's eligibility for upgrades
 *
 * @param ref - Project ref
 */
export const v1GetPostgresUpgradeEligibility =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1GetPostgresUpgradeEligibilityInput,
    outputSchema: V1GetPostgresUpgradeEligibilityOutput,
  }));
