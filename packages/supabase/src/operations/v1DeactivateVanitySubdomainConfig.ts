import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeactivateVanitySubdomainConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "DELETE", path: "/v1/projects/{ref}/vanity-subdomain" }),
  );
export type V1DeactivateVanitySubdomainConfigInput =
  typeof V1DeactivateVanitySubdomainConfigInput.Type;

// Output Schema
export const V1DeactivateVanitySubdomainConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DeactivateVanitySubdomainConfigOutput =
  typeof V1DeactivateVanitySubdomainConfigOutput.Type;

// The operation
/**
 * [Beta] Deletes a project's vanity subdomain configuration
 *
 * @param ref - Project ref
 */
export const v1DeactivateVanitySubdomainConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1DeactivateVanitySubdomainConfigInput,
    outputSchema: V1DeactivateVanitySubdomainConfigOutput,
  }));
