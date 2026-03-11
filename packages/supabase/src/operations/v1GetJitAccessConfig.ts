import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetJitAccessConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/jit-access" }));
export type V1GetJitAccessConfigInput = typeof V1GetJitAccessConfigInput.Type;

// Output Schema
export const V1GetJitAccessConfigOutput =
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
export type V1GetJitAccessConfigOutput = typeof V1GetJitAccessConfigOutput.Type;

// The operation
/**
 * [Beta] Get project's just-in-time access configuration.
 *
 * @param ref - Project ref
 */
export const v1GetJitAccessConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetJitAccessConfigInput,
    outputSchema: V1GetJitAccessConfigOutput,
  }),
);
