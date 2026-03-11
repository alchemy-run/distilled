import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetStorageConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/config/storage" }));
export type V1GetStorageConfigInput = typeof V1GetStorageConfigInput.Type;

// Output Schema
export const V1GetStorageConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileSizeLimit: Schema.Number,
    features: Schema.Struct({
      imageTransformation: Schema.Struct({
        enabled: Schema.Boolean,
      }),
      s3Protocol: Schema.Struct({
        enabled: Schema.Boolean,
      }),
      icebergCatalog: Schema.Struct({
        enabled: Schema.Boolean,
        maxNamespaces: Schema.Number,
        maxTables: Schema.Number,
        maxCatalogs: Schema.Number,
      }),
      vectorBuckets: Schema.Struct({
        enabled: Schema.Boolean,
        maxBuckets: Schema.Number,
        maxIndexes: Schema.Number,
      }),
    }),
    capabilities: Schema.Struct({
      list_v2: Schema.Boolean,
      iceberg_catalog: Schema.Boolean,
    }),
    external: Schema.Struct({
      upstreamTarget: Schema.Literals(["main", "canary"]),
    }),
    migrationVersion: Schema.String,
    databasePoolMode: Schema.String,
  });
export type V1GetStorageConfigOutput = typeof V1GetStorageConfigOutput.Type;

// The operation
/**
 * Gets project's storage config
 *
 * @param ref - Project ref
 */
export const v1GetStorageConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetStorageConfigInput,
  outputSchema: V1GetStorageConfigOutput,
}));
