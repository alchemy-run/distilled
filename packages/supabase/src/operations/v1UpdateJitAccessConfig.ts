import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateJitAccessConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    state: Schema.Literals(["enabled", "disabled", "unavailable"]),
  }).pipe(T.Http({ method: "PUT", path: "/v1/projects/{ref}/jit-access" }));
export type V1UpdateJitAccessConfigInput =
  typeof V1UpdateJitAccessConfigInput.Type;

// Output Schema
export const V1UpdateJitAccessConfigOutput =
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
export type V1UpdateJitAccessConfigOutput =
  typeof V1UpdateJitAccessConfigOutput.Type;

// The operation
/**
 * [Beta] Update project's just-in-time access configuration.
 *
 * @param ref - Project ref
 */
export const v1UpdateJitAccessConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateJitAccessConfigInput,
    outputSchema: V1UpdateJitAccessConfigOutput,
  }),
);
