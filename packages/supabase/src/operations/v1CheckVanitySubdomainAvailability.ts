import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CheckVanitySubdomainAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    vanity_subdomain: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/vanity-subdomain/check-availability",
    }),
  );
export type V1CheckVanitySubdomainAvailabilityInput =
  typeof V1CheckVanitySubdomainAvailabilityInput.Type;

// Output Schema
export const V1CheckVanitySubdomainAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    available: Schema.Boolean,
  });
export type V1CheckVanitySubdomainAvailabilityOutput =
  typeof V1CheckVanitySubdomainAvailabilityOutput.Type;

// The operation
/**
 * [Beta] Checks vanity subdomain availability
 *
 * @param ref - Project ref
 */
export const v1CheckVanitySubdomainAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1CheckVanitySubdomainAvailabilityInput,
    outputSchema: V1CheckVanitySubdomainAvailabilityOutput,
  }));
