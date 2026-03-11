import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateLoginRoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    read_only: Schema.Boolean,
  },
).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/cli/login-role" }));
export type V1CreateLoginRoleInput = typeof V1CreateLoginRoleInput.Type;

// Output Schema
export const V1CreateLoginRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    role: Schema.String,
    password: Schema.String,
    ttl_seconds: Schema.Number,
  });
export type V1CreateLoginRoleOutput = typeof V1CreateLoginRoleOutput.Type;

// The operation
/**
 * [Beta] Create a login role for CLI with temporary password
 *
 * @param ref - Project ref
 */
export const v1CreateLoginRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1CreateLoginRoleInput,
  outputSchema: V1CreateLoginRoleOutput,
}));
