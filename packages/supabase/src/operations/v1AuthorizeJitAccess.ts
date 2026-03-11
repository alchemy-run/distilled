import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1AuthorizeJitAccessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    role: Schema.String,
    rhost: Schema.String,
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/database/jit" }));
export type V1AuthorizeJitAccessInput = typeof V1AuthorizeJitAccessInput.Type;

// Output Schema
export const V1AuthorizeJitAccessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    user_id: Schema.String,
    user_role: Schema.Struct({
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
  });
export type V1AuthorizeJitAccessOutput = typeof V1AuthorizeJitAccessOutput.Type;

// The operation
/**
 * Authorize user-id to role mappings for JIT access
 *
 * Authorizes the request to assume a role in the project database
 *
 * @param ref - Project ref
 */
export const v1AuthorizeJitAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1AuthorizeJitAccessInput,
    outputSchema: V1AuthorizeJitAccessOutput,
  }),
);
