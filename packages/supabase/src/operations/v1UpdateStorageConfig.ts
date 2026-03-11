import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateStorageConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    fileSizeLimit: Schema.optional(Schema.Number),
    features: Schema.optional(
      Schema.Struct({
        imageTransformation: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
          }),
        ),
        s3Protocol: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
          }),
        ),
        icebergCatalog: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            maxNamespaces: Schema.Number,
            maxTables: Schema.Number,
            maxCatalogs: Schema.Number,
          }),
        ),
        vectorBuckets: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            maxBuckets: Schema.Number,
            maxIndexes: Schema.Number,
          }),
        ),
      }),
    ),
    external: Schema.optional(
      Schema.Struct({
        upstreamTarget: Schema.Literals(["main", "canary"]),
      }),
    ),
  }).pipe(
    T.Http({ method: "PATCH", path: "/v1/projects/{ref}/config/storage" }),
  );
export type V1UpdateStorageConfigInput = typeof V1UpdateStorageConfigInput.Type;

// Output Schema
export const V1UpdateStorageConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1UpdateStorageConfigOutput =
  typeof V1UpdateStorageConfigOutput.Type;

// The operation
/**
 * Updates project's storage config
 *
 * @param ref - Project ref
 */
export const v1UpdateStorageConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateStorageConfigInput,
    outputSchema: V1UpdateStorageConfigOutput,
  }),
);
