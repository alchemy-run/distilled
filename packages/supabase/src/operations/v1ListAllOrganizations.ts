import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllOrganizationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/v1/organizations" }),
  );
export type V1ListAllOrganizationsInput =
  typeof V1ListAllOrganizationsInput.Type;

// Output Schema
export const V1ListAllOrganizationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.String,
      slug: Schema.String,
      name: Schema.String,
    }),
  );
export type V1ListAllOrganizationsOutput =
  typeof V1ListAllOrganizationsOutput.Type;

// The operation
/**
 * List all organizations
 *
 * Returns a list of organizations that you currently belong to.
 */
export const v1ListAllOrganizations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1ListAllOrganizationsInput,
    outputSchema: V1ListAllOrganizationsOutput,
  }),
);
