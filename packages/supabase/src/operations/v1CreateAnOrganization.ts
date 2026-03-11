import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateAnOrganizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String,
  }).pipe(T.Http({ method: "POST", path: "/v1/organizations" }));
export type V1CreateAnOrganizationInput =
  typeof V1CreateAnOrganizationInput.Type;

// Output Schema
export const V1CreateAnOrganizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    slug: Schema.String,
    name: Schema.String,
  });
export type V1CreateAnOrganizationOutput =
  typeof V1CreateAnOrganizationOutput.Type;

// The operation
/**
 * Create an organization
 */
export const v1CreateAnOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CreateAnOrganizationInput,
    outputSchema: V1CreateAnOrganizationOutput,
  }),
);
