import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ApplyProjectAddonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    addon_variant: Schema.Unknown,
    addon_type: Schema.Literals([
      "custom_domain",
      "compute_instance",
      "pitr",
      "ipv4",
      "auth_mfa_phone",
      "auth_mfa_web_authn",
      "log_drain",
    ]),
  }).pipe(
    T.Http({ method: "PATCH", path: "/v1/projects/{ref}/billing/addons" }),
  );
export type V1ApplyProjectAddonInput = typeof V1ApplyProjectAddonInput.Type;

// Output Schema
export const V1ApplyProjectAddonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1ApplyProjectAddonOutput = typeof V1ApplyProjectAddonOutput.Type;

// The operation
/**
 * Apply or update billing addons, including compute instance size
 *
 * Selects an addon variant, for example scaling the project’s compute instance up or down, and applies it to the project.
 *
 * @param ref - Project ref
 */
export const v1ApplyProjectAddon = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ApplyProjectAddonInput,
  outputSchema: V1ApplyProjectAddonOutput,
}));
