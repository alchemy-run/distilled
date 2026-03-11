import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListProjectAddonsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/billing/addons" }));
export type V1ListProjectAddonsInput = typeof V1ListProjectAddonsInput.Type;

// Output Schema
export const V1ListProjectAddonsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    selected_addons: Schema.Array(
      Schema.Struct({
        type: Schema.Literals([
          "custom_domain",
          "compute_instance",
          "pitr",
          "ipv4",
          "auth_mfa_phone",
          "auth_mfa_web_authn",
          "log_drain",
        ]),
        variant: Schema.Struct({
          id: Schema.Unknown,
          name: Schema.String,
          price: Schema.Struct({
            description: Schema.String,
            type: Schema.Literals(["fixed", "usage"]),
            interval: Schema.Literals(["monthly", "hourly"]),
            amount: Schema.Number,
          }),
          meta: Schema.optional(Schema.Unknown),
        }),
      }),
    ),
    available_addons: Schema.Array(
      Schema.Struct({
        type: Schema.Literals([
          "custom_domain",
          "compute_instance",
          "pitr",
          "ipv4",
          "auth_mfa_phone",
          "auth_mfa_web_authn",
          "log_drain",
        ]),
        name: Schema.String,
        variants: Schema.Array(
          Schema.Struct({
            id: Schema.Unknown,
            name: Schema.String,
            price: Schema.Struct({
              description: Schema.String,
              type: Schema.Literals(["fixed", "usage"]),
              interval: Schema.Literals(["monthly", "hourly"]),
              amount: Schema.Number,
            }),
            meta: Schema.optional(Schema.Unknown),
          }),
        ),
      }),
    ),
  });
export type V1ListProjectAddonsOutput = typeof V1ListProjectAddonsOutput.Type;

// The operation
/**
 * List billing addons and compute instance selections
 *
 * Returns the billing addons that are currently applied, including the active compute instance size, and lists every addon option that can be provisioned with pricing metadata.
 *
 * @param ref - Project ref
 */
export const v1ListProjectAddons = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListProjectAddonsInput,
  outputSchema: V1ListProjectAddonsOutput,
}));
