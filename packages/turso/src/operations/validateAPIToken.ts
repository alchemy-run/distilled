import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ValidateAPITokenInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "GET", path: "/v1/auth/validate" }));
export type ValidateAPITokenInput = typeof ValidateAPITokenInput.Type;

// Output Schema
export const ValidateAPITokenOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    exp: Schema.optional(Schema.Number),
  },
);
export type ValidateAPITokenOutput = typeof ValidateAPITokenOutput.Type;

// The operation
/**
 * Validate API Token
 *
 * Validates an API token belonging to a user.
 */
export const validateAPIToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ValidateAPITokenInput,
  outputSchema: ValidateAPITokenOutput,
}));
