import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetVanitySubdomainConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/vanity-subdomain" }),
  );
export type V1GetVanitySubdomainConfigInput =
  typeof V1GetVanitySubdomainConfigInput.Type;

// Output Schema
export const V1GetVanitySubdomainConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.Literals(["not-used", "custom-domain-used", "active"]),
    custom_domain: Schema.optional(Schema.String),
  });
export type V1GetVanitySubdomainConfigOutput =
  typeof V1GetVanitySubdomainConfigOutput.Type;

// The operation
/**
 * [Beta] Gets current vanity subdomain config
 *
 * @param ref - Project ref
 */
export const v1GetVanitySubdomainConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetVanitySubdomainConfigInput,
    outputSchema: V1GetVanitySubdomainConfigOutput,
  }),
);
