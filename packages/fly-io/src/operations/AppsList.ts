import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  org_slug: Schema.String,
  app_role: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/apps" }));
export type AppsListInput = typeof AppsListInput.Type;

// Output Schema
export const AppsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  apps: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        internal_numeric_id: Schema.optional(Schema.Number),
        machine_count: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
        network: Schema.optional(Schema.String),
        organization: Schema.optional(
          Schema.Struct({
            internal_numeric_id: Schema.optional(Schema.Number),
            name: Schema.optional(Schema.String),
            slug: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(Schema.String),
        volume_count: Schema.optional(Schema.Number),
      }),
    ),
  ),
  total_apps: Schema.optional(Schema.Number),
});
export type AppsListOutput = typeof AppsListOutput.Type;

// The operation
/**
 * List Apps
 *
 * List all apps with the ability to filter by organization slug.
 *
 * @param org_slug - The org slug, or 'personal', to filter apps
 * @param app_role - Filter apps by role
 */
export const AppsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsListInput,
  outputSchema: AppsListOutput,
}));
