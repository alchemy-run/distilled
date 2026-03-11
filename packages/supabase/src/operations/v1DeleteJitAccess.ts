import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteJitAccessInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    user_id: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/projects/{ref}/database/jit/{user_id}",
  }),
);
export type V1DeleteJitAccessInput = typeof V1DeleteJitAccessInput.Type;

// Output Schema
export const V1DeleteJitAccessOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DeleteJitAccessOutput = typeof V1DeleteJitAccessOutput.Type;

// The operation
/**
 * Delete JIT access by user-id
 *
 * Remove JIT mappings of a user, revoking all JIT database access
 *
 * @param ref - Project ref
 */
export const v1DeleteJitAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeleteJitAccessInput,
  outputSchema: V1DeleteJitAccessOutput,
}));
