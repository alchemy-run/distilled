import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListJitAccessInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/v1/projects/{ref}/database/jit/list" }),
);
export type V1ListJitAccessInput = typeof V1ListJitAccessInput.Type;

// Output Schema
export const V1ListJitAccessOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  items: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type V1ListJitAccessOutput = typeof V1ListJitAccessOutput.Type;

// The operation
/**
 * List all user-id to role mappings for JIT access
 *
 * Mappings of roles a user can assume in the project database
 *
 * @param ref - Project ref
 */
export const v1ListJitAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListJitAccessInput,
  outputSchema: V1ListJitAccessOutput,
}));
