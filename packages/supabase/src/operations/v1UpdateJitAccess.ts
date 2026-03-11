import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateJitAccessInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    user_id: Schema.String,
    roles: Schema.Array(
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
  },
).pipe(T.Http({ method: "PUT", path: "/v1/projects/{ref}/database/jit" }));
export type V1UpdateJitAccessInput = typeof V1UpdateJitAccessInput.Type;

// Output Schema
export const V1UpdateJitAccessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type V1UpdateJitAccessOutput = typeof V1UpdateJitAccessOutput.Type;

// The operation
/**
 * Updates a user mapping for JIT access
 *
 * Modifies the roles that can be assumed and for how long
 *
 * @param ref - Project ref
 */
export const v1UpdateJitAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1UpdateJitAccessInput,
  outputSchema: V1UpdateJitAccessOutput,
}));
