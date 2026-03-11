import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpgradePostgresVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    target_version: Schema.String,
    release_channel: Schema.optional(
      Schema.Literals([
        "internal",
        "alpha",
        "beta",
        "ga",
        "withdrawn",
        "preview",
      ]),
    ),
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/upgrade" }));
export type V1UpgradePostgresVersionInput =
  typeof V1UpgradePostgresVersionInput.Type;

// Output Schema
export const V1UpgradePostgresVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tracking_id: Schema.String,
  });
export type V1UpgradePostgresVersionOutput =
  typeof V1UpgradePostgresVersionOutput.Type;

// The operation
/**
 * [Beta] Upgrades the project's Postgres version
 *
 * @param ref - Project ref
 */
export const v1UpgradePostgresVersion = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpgradePostgresVersionInput,
    outputSchema: V1UpgradePostgresVersionOutput,
  }),
);
