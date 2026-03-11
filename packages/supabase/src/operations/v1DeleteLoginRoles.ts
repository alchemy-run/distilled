import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteLoginRolesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "DELETE", path: "/v1/projects/{ref}/cli/login-role" }),
  );
export type V1DeleteLoginRolesInput = typeof V1DeleteLoginRolesInput.Type;

// Output Schema
export const V1DeleteLoginRolesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.Literals(["ok"]),
  });
export type V1DeleteLoginRolesOutput = typeof V1DeleteLoginRolesOutput.Type;

// The operation
/**
 * [Beta] Delete existing login roles used by CLI
 *
 * @param ref - Project ref
 */
export const v1DeleteLoginRoles = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeleteLoginRolesInput,
  outputSchema: V1DeleteLoginRolesOutput,
}));
