import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ActivateVanitySubdomainConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    vanity_subdomain: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/vanity-subdomain/activate",
    }),
  );
export type V1ActivateVanitySubdomainConfigInput =
  typeof V1ActivateVanitySubdomainConfigInput.Type;

// Output Schema
export const V1ActivateVanitySubdomainConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    custom_domain: Schema.String,
  });
export type V1ActivateVanitySubdomainConfigOutput =
  typeof V1ActivateVanitySubdomainConfigOutput.Type;

// The operation
/**
 * [Beta] Activates a vanity subdomain for a project.
 *
 * @param ref - Project ref
 */
export const v1ActivateVanitySubdomainConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1ActivateVanitySubdomainConfigInput,
    outputSchema: V1ActivateVanitySubdomainConfigOutput,
  }));
