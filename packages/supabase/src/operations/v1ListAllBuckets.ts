import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllBucketsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/storage/buckets" }));
export type V1ListAllBucketsInput = typeof V1ListAllBucketsInput.Type;

// Output Schema
export const V1ListAllBucketsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    owner: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    public: Schema.Boolean,
  }),
);
export type V1ListAllBucketsOutput = typeof V1ListAllBucketsOutput.Type;

// The operation
/**
 * Lists all buckets
 *
 * @param ref - Project ref
 */
export const v1ListAllBuckets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllBucketsInput,
  outputSchema: V1ListAllBucketsOutput,
}));
