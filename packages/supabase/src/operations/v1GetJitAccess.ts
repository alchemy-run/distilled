import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetJitAccessInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/database/jit" }));
export type V1GetJitAccessInput = typeof V1GetJitAccessInput.Type;

// Output Schema
export const V1GetJitAccessOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  user_id: Schema.String,
  user_roles: Schema.Array(
    Schema.Struct({
      role: Schema.String,
      expires_at: Schema.optional(Schema.Number),
      allowed_networks: Schema.optional(
        Schema.Struct({
          allowed_cidrs: Schema.optional(
            Schema.Array(
              Schema.Struct({
                cidr: Schema.String,
              }),
            ),
          ),
          allowed_cidrs_v6: Schema.optional(
            Schema.Array(
              Schema.Struct({
                cidr: Schema.String,
              }),
            ),
          ),
        }),
      ),
    }),
  ),
});
export type V1GetJitAccessOutput = typeof V1GetJitAccessOutput.Type;

// The operation
/**
 * Get user-id to role mappings for JIT access
 *
 * Mappings of roles a user can assume in the project database
 *
 * @param ref - Project ref
 */
export const v1GetJitAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetJitAccessInput,
  outputSchema: V1GetJitAccessOutput,
}));
