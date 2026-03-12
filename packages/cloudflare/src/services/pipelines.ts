/**
 * Cloudflare PIPELINES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service pipelines
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Errors
// =============================================================================

export class InvalidSinkId extends Schema.TaggedErrorClass<InvalidSinkId>()(
  "InvalidSinkId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidSinkId, [{ code: 2 }]);

export class InvalidStreamId extends Schema.TaggedErrorClass<InvalidStreamId>()(
  "InvalidStreamId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidStreamId, [{ code: 2 }]);

export class InvalidStreamName extends Schema.TaggedErrorClass<InvalidStreamName>()(
  "InvalidStreamName",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidStreamName, [{ code: 2 }]);

export class PipelineNotExists extends Schema.TaggedErrorClass<PipelineNotExists>()(
  "PipelineNotExists",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(PipelineNotExists, [{ code: 1000 }]);

export class SinkNotFound extends Schema.TaggedErrorClass<SinkNotFound>()(
  "SinkNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(SinkNotFound, [{ code: 1015 }]);

export class StreamAlreadyExists extends Schema.TaggedErrorClass<StreamAlreadyExists>()(
  "StreamAlreadyExists",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(StreamAlreadyExists, [{ code: 1003 }]);

export class StreamNotFound extends Schema.TaggedErrorClass<StreamNotFound>()(
  "StreamNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(StreamNotFound, [{ code: 1016 }]);

export class TableNotFound extends Schema.TaggedErrorClass<TableNotFound>()(
  "TableNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(TableNotFound, [{ code: 1014 }]);

// =============================================================================
// Pipeline
// =============================================================================

export interface GetPipelineRequest {
  pipelineName: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetPipelineRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pipelineName: Schema.String.pipe(T.HttpPath("pipelineName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/{pipelineName}",
  }),
) as unknown as Schema.Schema<GetPipelineRequest>;

export interface GetPipelineResponse {
  /** Specifies the pipeline identifier. */
  id: string;
  destination: {
    batch: {
      maxBytes?: number | null;
      maxDurationS?: number | null;
      maxRows?: number | null;
    };
    compression: { type?: "none" | "gzip" | "deflate" | null };
    format: "json";
    path: {
      bucket: string;
      filename?: string | null;
      filepath?: string | null;
      prefix?: string | null;
    };
    type: "r2";
  };
  /** Indicates the endpoint URL to send traffic. */
  endpoint: string;
  /** Defines the name of the pipeline. */
  name: string;
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean | null;
        cors?: { origins?: string[] | null } | null;
      }
    | { format: "json"; type: string }
  )[];
  /** Indicates the version number of last saved configuration. */
  version: number;
}

export const GetPipelineResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  destination: Schema.Struct({
    batch: Schema.Struct({
      maxBytes: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      maxDurationS: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      maxRows: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        maxBytes: "max_bytes",
        maxDurationS: "max_duration_s",
        maxRows: "max_rows",
      }),
    ),
    compression: Schema.Struct({
      type: Schema.optional(
        Schema.Union([
          Schema.Literals(["none", "gzip", "deflate"]),
          Schema.Null,
        ]),
      ),
    }),
    format: Schema.Literal("json"),
    path: Schema.Struct({
      bucket: Schema.String,
      filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      filepath: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    type: Schema.Literal("r2"),
  }),
  endpoint: Schema.String,
  name: Schema.String,
  source: Schema.Array(
    Schema.Union([
      Schema.Struct({
        format: Schema.Literal("json"),
        type: Schema.String,
        authentication: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        cors: Schema.optional(
          Schema.Union([
            Schema.Struct({
              origins: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Struct({
        format: Schema.Literal("json"),
        type: Schema.String,
      }),
    ]),
  ),
  version: Schema.Number,
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetPipelineResponse>;

export type GetPipelineError = DefaultErrors | PipelineNotExists;

export const getPipeline: API.OperationMethod<
  GetPipelineRequest,
  GetPipelineResponse,
  GetPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPipelineRequest,
  output: GetPipelineResponse,
  errors: [PipelineNotExists],
}));

export interface ListPipelinesRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: Specifies which page to retrieve. */
  page?: string;
  /** Query param: Specifies the number of pipelines per page. */
  perPage?: string;
  /** Query param: Specifies the prefix of pipeline name to search. */
  search?: string;
}

export const ListPipelinesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.String).pipe(T.HttpQuery("page")),
  perPage: Schema.optional(Schema.String).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pipelines" }),
) as unknown as Schema.Schema<ListPipelinesRequest>;

export interface ListPipelinesResponse {
  resultInfo: {
    count: number;
    page: number;
    perPage: number;
    totalCount: number;
  };
  results: {
    id: string;
    destination: {
      batch: {
        maxBytes?: number | null;
        maxDurationS?: number | null;
        maxRows?: number | null;
      };
      compression: { type?: "none" | "gzip" | "deflate" | null };
      format: "json";
      path: {
        bucket: string;
        filename?: string | null;
        filepath?: string | null;
        prefix?: string | null;
      };
      type: "r2";
    };
    endpoint: string;
    name: string;
    source: (
      | {
          format: "json";
          type: string;
          authentication?: boolean | null;
          cors?: { origins?: string[] | null } | null;
        }
      | { format: "json"; type: string }
    )[];
    version: number;
  }[];
  /** Indicates whether the API call was successful. */
  success: boolean;
}

export const ListPipelinesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resultInfo: Schema.Struct({
    count: Schema.Number,
    page: Schema.Number,
    perPage: Schema.Number,
    totalCount: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
  results: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      destination: Schema.Struct({
        batch: Schema.Struct({
          maxBytes: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          maxDurationS: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          maxRows: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            maxBytes: "max_bytes",
            maxDurationS: "max_duration_s",
            maxRows: "max_rows",
          }),
        ),
        compression: Schema.Struct({
          type: Schema.optional(
            Schema.Union([
              Schema.Literals(["none", "gzip", "deflate"]),
              Schema.Null,
            ]),
          ),
        }),
        format: Schema.Literal("json"),
        path: Schema.Struct({
          bucket: Schema.String,
          filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          filepath: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        type: Schema.Literal("r2"),
      }),
      endpoint: Schema.String,
      name: Schema.String,
      source: Schema.Array(
        Schema.Union([
          Schema.Struct({
            format: Schema.Literal("json"),
            type: Schema.String,
            authentication: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            cors: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  origins: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
          }),
          Schema.Struct({
            format: Schema.Literal("json"),
            type: Schema.String,
          }),
        ]),
      ),
      version: Schema.Number,
    }),
  ),
  success: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    resultInfo: "result_info",
    results: "results",
    success: "success",
  }),
) as unknown as Schema.Schema<ListPipelinesResponse>;

export type ListPipelinesError = DefaultErrors;

export const listPipelines: API.OperationMethod<
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListPipelinesRequest,
  output: ListPipelinesResponse,
  errors: [],
}));

export interface CreatePipelineRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: */
  destination: {
    batch: { maxBytes?: number; maxDurationS?: number; maxRows?: number };
    compression: { type?: "none" | "gzip" | "deflate" };
    credentials: {
      accessKeyId: string;
      endpoint: string;
      secretAccessKey: string;
    };
    format: "json";
    path: {
      bucket: string;
      filename?: string;
      filepath?: string;
      prefix?: string;
    };
    type: "r2";
  };
  /** Body param: Defines the name of the pipeline. */
  name: string;
  /** Body param: */
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean;
        cors?: { origins?: string[] };
      }
    | { format: "json"; type: string }
  )[];
}

export const CreatePipelineRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  destination: Schema.Struct({
    batch: Schema.Struct({
      maxBytes: Schema.optional(Schema.Number),
      maxDurationS: Schema.optional(Schema.Number),
      maxRows: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        maxBytes: "max_bytes",
        maxDurationS: "max_duration_s",
        maxRows: "max_rows",
      }),
    ),
    compression: Schema.Struct({
      type: Schema.optional(Schema.Literals(["none", "gzip", "deflate"])),
    }),
    credentials: Schema.Struct({
      accessKeyId: Schema.String,
      endpoint: Schema.String,
      secretAccessKey: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        accessKeyId: "access_key_id",
        endpoint: "endpoint",
        secretAccessKey: "secret_access_key",
      }),
    ),
    format: Schema.Literal("json"),
    path: Schema.Struct({
      bucket: Schema.String,
      filename: Schema.optional(Schema.String),
      filepath: Schema.optional(Schema.String),
      prefix: Schema.optional(Schema.String),
    }),
    type: Schema.Literal("r2"),
  }),
  name: Schema.String,
  source: Schema.Array(
    Schema.Union([
      Schema.Struct({
        format: Schema.Literal("json"),
        type: Schema.String,
        authentication: Schema.optional(Schema.Boolean),
        cors: Schema.optional(
          Schema.Struct({
            origins: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      }),
      Schema.Struct({
        format: Schema.Literal("json"),
        type: Schema.String,
      }),
    ]),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pipelines" }),
) as unknown as Schema.Schema<CreatePipelineRequest>;

export interface CreatePipelineResponse {
  /** Specifies the pipeline identifier. */
  id: string;
  destination: {
    batch: {
      maxBytes?: number | null;
      maxDurationS?: number | null;
      maxRows?: number | null;
    };
    compression: { type?: "none" | "gzip" | "deflate" | null };
    format: "json";
    path: {
      bucket: string;
      filename?: string | null;
      filepath?: string | null;
      prefix?: string | null;
    };
    type: "r2";
  };
  /** Indicates the endpoint URL to send traffic. */
  endpoint: string;
  /** Defines the name of the pipeline. */
  name: string;
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean | null;
        cors?: { origins?: string[] | null } | null;
      }
    | { format: "json"; type: string }
  )[];
  /** Indicates the version number of last saved configuration. */
  version: number;
}

export const CreatePipelineResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    destination: Schema.Struct({
      batch: Schema.Struct({
        maxBytes: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        maxDurationS: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        maxRows: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          maxBytes: "max_bytes",
          maxDurationS: "max_duration_s",
          maxRows: "max_rows",
        }),
      ),
      compression: Schema.Struct({
        type: Schema.optional(
          Schema.Union([
            Schema.Literals(["none", "gzip", "deflate"]),
            Schema.Null,
          ]),
        ),
      }),
      format: Schema.Literal("json"),
      path: Schema.Struct({
        bucket: Schema.String,
        filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        filepath: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      type: Schema.Literal("r2"),
    }),
    endpoint: Schema.String,
    name: Schema.String,
    source: Schema.Array(
      Schema.Union([
        Schema.Struct({
          format: Schema.Literal("json"),
          type: Schema.String,
          authentication: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          cors: Schema.optional(
            Schema.Union([
              Schema.Struct({
                origins: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Struct({
          format: Schema.Literal("json"),
          type: Schema.String,
        }),
      ]),
    ),
    version: Schema.Number,
  },
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<CreatePipelineResponse>;

export type CreatePipelineError = DefaultErrors;

export const createPipeline: API.OperationMethod<
  CreatePipelineRequest,
  CreatePipelineResponse,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePipelineRequest,
  output: CreatePipelineResponse,
  errors: [],
}));

export interface UpdatePipelineRequest {
  pipelineName: string;
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: */
  destination: {
    batch: { maxBytes?: number; maxDurationS?: number; maxRows?: number };
    compression: { type?: "none" | "gzip" | "deflate" };
    format: "json";
    path: {
      bucket: string;
      filename?: string;
      filepath?: string;
      prefix?: string;
    };
    type: "r2";
    credentials?: {
      accessKeyId: string;
      endpoint: string;
      secretAccessKey: string;
    };
  };
  /** Body param: Defines the name of the pipeline. */
  name: string;
  /** Body param: */
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean;
        cors?: { origins?: string[] };
      }
    | { format: "json"; type: string }
  )[];
}

export const UpdatePipelineRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pipelineName: Schema.String.pipe(T.HttpPath("pipelineName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  destination: Schema.Struct({
    batch: Schema.Struct({
      maxBytes: Schema.optional(Schema.Number),
      maxDurationS: Schema.optional(Schema.Number),
      maxRows: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        maxBytes: "max_bytes",
        maxDurationS: "max_duration_s",
        maxRows: "max_rows",
      }),
    ),
    compression: Schema.Struct({
      type: Schema.optional(Schema.Literals(["none", "gzip", "deflate"])),
    }),
    format: Schema.Literal("json"),
    path: Schema.Struct({
      bucket: Schema.String,
      filename: Schema.optional(Schema.String),
      filepath: Schema.optional(Schema.String),
      prefix: Schema.optional(Schema.String),
    }),
    type: Schema.Literal("r2"),
    credentials: Schema.optional(
      Schema.Struct({
        accessKeyId: Schema.String,
        endpoint: Schema.String,
        secretAccessKey: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          accessKeyId: "access_key_id",
          endpoint: "endpoint",
          secretAccessKey: "secret_access_key",
        }),
      ),
    ),
  }),
  name: Schema.String,
  source: Schema.Array(
    Schema.Union([
      Schema.Struct({
        format: Schema.Literal("json"),
        type: Schema.String,
        authentication: Schema.optional(Schema.Boolean),
        cors: Schema.optional(
          Schema.Struct({
            origins: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      }),
      Schema.Struct({
        format: Schema.Literal("json"),
        type: Schema.String,
      }),
    ]),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/pipelines/{pipelineName}",
  }),
) as unknown as Schema.Schema<UpdatePipelineRequest>;

export interface UpdatePipelineResponse {
  /** Specifies the pipeline identifier. */
  id: string;
  destination: {
    batch: {
      maxBytes?: number | null;
      maxDurationS?: number | null;
      maxRows?: number | null;
    };
    compression: { type?: "none" | "gzip" | "deflate" | null };
    format: "json";
    path: {
      bucket: string;
      filename?: string | null;
      filepath?: string | null;
      prefix?: string | null;
    };
    type: "r2";
  };
  /** Indicates the endpoint URL to send traffic. */
  endpoint: string;
  /** Defines the name of the pipeline. */
  name: string;
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean | null;
        cors?: { origins?: string[] | null } | null;
      }
    | { format: "json"; type: string }
  )[];
  /** Indicates the version number of last saved configuration. */
  version: number;
}

export const UpdatePipelineResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    destination: Schema.Struct({
      batch: Schema.Struct({
        maxBytes: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        maxDurationS: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        maxRows: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          maxBytes: "max_bytes",
          maxDurationS: "max_duration_s",
          maxRows: "max_rows",
        }),
      ),
      compression: Schema.Struct({
        type: Schema.optional(
          Schema.Union([
            Schema.Literals(["none", "gzip", "deflate"]),
            Schema.Null,
          ]),
        ),
      }),
      format: Schema.Literal("json"),
      path: Schema.Struct({
        bucket: Schema.String,
        filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        filepath: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      type: Schema.Literal("r2"),
    }),
    endpoint: Schema.String,
    name: Schema.String,
    source: Schema.Array(
      Schema.Union([
        Schema.Struct({
          format: Schema.Literal("json"),
          type: Schema.String,
          authentication: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          cors: Schema.optional(
            Schema.Union([
              Schema.Struct({
                origins: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Struct({
          format: Schema.Literal("json"),
          type: Schema.String,
        }),
      ]),
    ),
    version: Schema.Number,
  },
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<UpdatePipelineResponse>;

export type UpdatePipelineError = DefaultErrors | PipelineNotExists;

export const updatePipeline: API.OperationMethod<
  UpdatePipelineRequest,
  UpdatePipelineResponse,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePipelineRequest,
  output: UpdatePipelineResponse,
  errors: [PipelineNotExists],
}));

export interface DeletePipelineRequest {
  pipelineName: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const DeletePipelineRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pipelineName: Schema.String.pipe(T.HttpPath("pipelineName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/pipelines/{pipelineName}",
  }),
) as unknown as Schema.Schema<DeletePipelineRequest>;

export type DeletePipelineResponse = unknown;

export const DeletePipelineResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeletePipelineResponse>;

export type DeletePipelineError = DefaultErrors | PipelineNotExists;

export const deletePipeline: API.OperationMethod<
  DeletePipelineRequest,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePipelineRequest,
  output: DeletePipelineResponse,
  errors: [PipelineNotExists],
}));

// =============================================================================
// Sink
// =============================================================================

export interface GetSinkRequest {
  sinkId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetSinkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  sinkId: Schema.String.pipe(T.HttpPath("sinkId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/sinks/{sinkId}",
  }),
) as unknown as Schema.Schema<GetSinkRequest>;

export interface GetSinkResponse {
  /** Indicates a unique identifier for this sink. */
  id: string;
  createdAt: string;
  modifiedAt: string;
  /** Defines the name of the Sink. */
  name: string;
  /** Specifies the type of sink. */
  type: "r2" | "r2_data_catalog";
  /** Defines the configuration of the R2 Sink. */
  config?:
    | {
        accountId: string;
        bucket: string;
        credentials: { accessKeyId: string; secretAccessKey: string };
        fileNaming?: {
          prefix?: string | null;
          strategy?: "serial" | "uuid" | "uuid_v7" | "ulid" | null;
          suffix?: string | null;
        } | null;
        jurisdiction?: string | null;
        partitioning?: { timePattern?: string | null } | null;
        path?: string | null;
        rollingPolicy?: {
          fileSizeBytes?: number | null;
          inactivitySeconds?: number | null;
          intervalSeconds?: number | null;
        } | null;
      }
    | {
        token: string;
        accountId: string;
        bucket: string;
        tableName: string;
        namespace?: string | null;
        rollingPolicy?: {
          fileSizeBytes?: number | null;
          inactivitySeconds?: number | null;
          intervalSeconds?: number | null;
        } | null;
      }
    | null;
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes" | null;
        timestampFormat?: "rfc3339" | "unix_millis" | null;
        unstructured?: boolean | null;
      }
    | {
        type: "parquet";
        compression?:
          | "uncompressed"
          | "snappy"
          | "gzip"
          | "zstd"
          | "lz4"
          | null;
        rowGroupBytes?: number | null;
      }
    | null;
  schema?: {
    fields?:
      | (
          | {
              type: "int32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "int64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "bool";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "string";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "binary";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "timestamp";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
              unit?:
                | "second"
                | "millisecond"
                | "microsecond"
                | "nanosecond"
                | null;
            }
          | {
              type: "json";
              decimalEncoding?: "number" | "string" | "bytes" | null;
              timestampFormat?: "rfc3339" | "unix_millis" | null;
              unstructured?: boolean | null;
            }
          | unknown
        )[]
      | null;
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes" | null;
          timestampFormat?: "rfc3339" | "unix_millis" | null;
          unstructured?: boolean | null;
        }
      | {
          type: "parquet";
          compression?:
            | "uncompressed"
            | "snappy"
            | "gzip"
            | "zstd"
            | "lz4"
            | null;
          rowGroupBytes?: number | null;
        }
      | null;
    inferred?: boolean | null;
  } | null;
}

export const GetSinkResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  type: Schema.Literals(["r2", "r2_data_catalog"]),
  config: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          accountId: Schema.String,
          bucket: Schema.String,
          credentials: Schema.Struct({
            accessKeyId: Schema.String,
            secretAccessKey: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              accessKeyId: "access_key_id",
              secretAccessKey: "secret_access_key",
            }),
          ),
          fileNaming: Schema.optional(
            Schema.Union([
              Schema.Struct({
                prefix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                strategy: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["serial", "uuid", "uuid_v7", "ulid"]),
                    Schema.Null,
                  ]),
                ),
                suffix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          jurisdiction: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          partitioning: Schema.optional(
            Schema.Union([
              Schema.Struct({
                timePattern: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ timePattern: "time_pattern" })),
              Schema.Null,
            ]),
          ),
          path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          rollingPolicy: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fileSizeBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                inactivitySeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                intervalSeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  fileSizeBytes: "file_size_bytes",
                  inactivitySeconds: "inactivity_seconds",
                  intervalSeconds: "interval_seconds",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            accountId: "account_id",
            bucket: "bucket",
            credentials: "credentials",
            fileNaming: "file_naming",
            jurisdiction: "jurisdiction",
            partitioning: "partitioning",
            path: "path",
            rollingPolicy: "rolling_policy",
          }),
        ),
        Schema.Struct({
          token: Schema.String,
          accountId: Schema.String,
          bucket: Schema.String,
          tableName: Schema.String,
          namespace: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          rollingPolicy: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fileSizeBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                inactivitySeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                intervalSeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  fileSizeBytes: "file_size_bytes",
                  inactivitySeconds: "inactivity_seconds",
                  intervalSeconds: "interval_seconds",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            token: "token",
            accountId: "account_id",
            bucket: "bucket",
            tableName: "table_name",
            namespace: "namespace",
            rollingPolicy: "rolling_policy",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  format: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          type: Schema.Literal("json"),
          decimalEncoding: Schema.optional(
            Schema.Union([
              Schema.Literals(["number", "string", "bytes"]),
              Schema.Null,
            ]),
          ),
          timestampFormat: Schema.optional(
            Schema.Union([
              Schema.Literals(["rfc3339", "unix_millis"]),
              Schema.Null,
            ]),
          ),
          unstructured: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            decimalEncoding: "decimal_encoding",
            timestampFormat: "timestamp_format",
            unstructured: "unstructured",
          }),
        ),
        Schema.Struct({
          type: Schema.Literal("parquet"),
          compression: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
              Schema.Null,
            ]),
          ),
          rowGroupBytes: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            compression: "compression",
            rowGroupBytes: "row_group_bytes",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  schema: Schema.optional(
    Schema.Union([
      Schema.Struct({
        fields: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literal("int32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("int64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("bool"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("string"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("binary"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("timestamp"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  unit: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "second",
                        "millisecond",
                        "microsecond",
                        "nanosecond",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                    unit: "unit",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("json"),
                  decimalEncoding: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["number", "string", "bytes"]),
                      Schema.Null,
                    ]),
                  ),
                  timestampFormat: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["rfc3339", "unix_millis"]),
                      Schema.Null,
                    ]),
                  ),
                  unstructured: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    decimalEncoding: "decimal_encoding",
                    timestampFormat: "timestamp_format",
                    unstructured: "unstructured",
                  }),
                ),
                Schema.Unknown,
              ]),
            ),
            Schema.Null,
          ]),
        ),
        format: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                type: Schema.Literal("json"),
                decimalEncoding: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["number", "string", "bytes"]),
                    Schema.Null,
                  ]),
                ),
                timestampFormat: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["rfc3339", "unix_millis"]),
                    Schema.Null,
                  ]),
                ),
                unstructured: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  decimalEncoding: "decimal_encoding",
                  timestampFormat: "timestamp_format",
                  unstructured: "unstructured",
                }),
              ),
              Schema.Struct({
                type: Schema.Literal("parquet"),
                compression: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "uncompressed",
                      "snappy",
                      "gzip",
                      "zstd",
                      "lz4",
                    ]),
                    Schema.Null,
                  ]),
                ),
                rowGroupBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  compression: "compression",
                  rowGroupBytes: "row_group_bytes",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        inferred: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      type: "type",
      config: "config",
      format: "format",
      schema: "schema",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetSinkResponse>;

export type GetSinkError = DefaultErrors | SinkNotFound | InvalidSinkId;

export const getSink: API.OperationMethod<
  GetSinkRequest,
  GetSinkResponse,
  GetSinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSinkRequest,
  output: GetSinkResponse,
  errors: [SinkNotFound, InvalidSinkId],
}));

export interface ListSinksRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: */
  pipelineId?: string;
}

export const ListSinksRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pipelineId: Schema.optional(Schema.String).pipe(T.HttpQuery("pipeline_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pipelines/v1/sinks" }),
) as unknown as Schema.Schema<ListSinksRequest>;

export interface ListSinksResponse {
  result: {
    id: string;
    createdAt: string;
    modifiedAt: string;
    name: string;
    type: "r2" | "r2_data_catalog";
    config?:
      | {
          accountId: string;
          bucket: string;
          credentials: { accessKeyId: string; secretAccessKey: string };
          fileNaming?: {
            prefix?: string | null;
            strategy?: "serial" | "uuid" | "uuid_v7" | "ulid" | null;
            suffix?: string | null;
          } | null;
          jurisdiction?: string | null;
          partitioning?: { timePattern?: string | null } | null;
          path?: string | null;
          rollingPolicy?: {
            fileSizeBytes?: number | null;
            inactivitySeconds?: number | null;
            intervalSeconds?: number | null;
          } | null;
        }
      | {
          token: string;
          accountId: string;
          bucket: string;
          tableName: string;
          namespace?: string | null;
          rollingPolicy?: {
            fileSizeBytes?: number | null;
            inactivitySeconds?: number | null;
            intervalSeconds?: number | null;
          } | null;
        }
      | null;
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes" | null;
          timestampFormat?: "rfc3339" | "unix_millis" | null;
          unstructured?: boolean | null;
        }
      | {
          type: "parquet";
          compression?:
            | "uncompressed"
            | "snappy"
            | "gzip"
            | "zstd"
            | "lz4"
            | null;
          rowGroupBytes?: number | null;
        }
      | null;
    schema?: {
      fields?:
        | (
            | {
                type: "int32";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "int64";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "float32";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "float64";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "bool";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "string";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "binary";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "timestamp";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
                unit?:
                  | "second"
                  | "millisecond"
                  | "microsecond"
                  | "nanosecond"
                  | null;
              }
            | {
                type: "json";
                decimalEncoding?: "number" | "string" | "bytes" | null;
                timestampFormat?: "rfc3339" | "unix_millis" | null;
                unstructured?: boolean | null;
              }
            | unknown
          )[]
        | null;
      format?:
        | {
            type: "json";
            decimalEncoding?: "number" | "string" | "bytes" | null;
            timestampFormat?: "rfc3339" | "unix_millis" | null;
            unstructured?: boolean | null;
          }
        | {
            type: "parquet";
            compression?:
              | "uncompressed"
              | "snappy"
              | "gzip"
              | "zstd"
              | "lz4"
              | null;
            rowGroupBytes?: number | null;
          }
        | null;
      inferred?: boolean | null;
    } | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListSinksResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String,
      modifiedAt: Schema.String,
      name: Schema.String,
      type: Schema.Literals(["r2", "r2_data_catalog"]),
      config: Schema.optional(
        Schema.Union([
          Schema.Union([
            Schema.Struct({
              accountId: Schema.String,
              bucket: Schema.String,
              credentials: Schema.Struct({
                accessKeyId: Schema.String,
                secretAccessKey: Schema.String,
              }).pipe(
                Schema.encodeKeys({
                  accessKeyId: "access_key_id",
                  secretAccessKey: "secret_access_key",
                }),
              ),
              fileNaming: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    prefix: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    strategy: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["serial", "uuid", "uuid_v7", "ulid"]),
                        Schema.Null,
                      ]),
                    ),
                    suffix: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              jurisdiction: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              partitioning: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    timePattern: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }).pipe(Schema.encodeKeys({ timePattern: "time_pattern" })),
                  Schema.Null,
                ]),
              ),
              path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              rollingPolicy: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    fileSizeBytes: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    inactivitySeconds: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    intervalSeconds: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      fileSizeBytes: "file_size_bytes",
                      inactivitySeconds: "inactivity_seconds",
                      intervalSeconds: "interval_seconds",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                accountId: "account_id",
                bucket: "bucket",
                credentials: "credentials",
                fileNaming: "file_naming",
                jurisdiction: "jurisdiction",
                partitioning: "partitioning",
                path: "path",
                rollingPolicy: "rolling_policy",
              }),
            ),
            Schema.Struct({
              token: Schema.String,
              accountId: Schema.String,
              bucket: Schema.String,
              tableName: Schema.String,
              namespace: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              rollingPolicy: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    fileSizeBytes: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    inactivitySeconds: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    intervalSeconds: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      fileSizeBytes: "file_size_bytes",
                      inactivitySeconds: "inactivity_seconds",
                      intervalSeconds: "interval_seconds",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                token: "token",
                accountId: "account_id",
                bucket: "bucket",
                tableName: "table_name",
                namespace: "namespace",
                rollingPolicy: "rolling_policy",
              }),
            ),
          ]),
          Schema.Null,
        ]),
      ),
      format: Schema.optional(
        Schema.Union([
          Schema.Union([
            Schema.Struct({
              type: Schema.Literal("json"),
              decimalEncoding: Schema.optional(
                Schema.Union([
                  Schema.Literals(["number", "string", "bytes"]),
                  Schema.Null,
                ]),
              ),
              timestampFormat: Schema.optional(
                Schema.Union([
                  Schema.Literals(["rfc3339", "unix_millis"]),
                  Schema.Null,
                ]),
              ),
              unstructured: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                decimalEncoding: "decimal_encoding",
                timestampFormat: "timestamp_format",
                unstructured: "unstructured",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("parquet"),
              compression: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "uncompressed",
                    "snappy",
                    "gzip",
                    "zstd",
                    "lz4",
                  ]),
                  Schema.Null,
                ]),
              ),
              rowGroupBytes: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                compression: "compression",
                rowGroupBytes: "row_group_bytes",
              }),
            ),
          ]),
          Schema.Null,
        ]),
      ),
      schema: Schema.optional(
        Schema.Union([
          Schema.Struct({
            fields: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literal("int32"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("int64"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("float32"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("float64"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("bool"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("string"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("binary"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("timestamp"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      unit: Schema.optional(
                        Schema.Union([
                          Schema.Literals([
                            "second",
                            "millisecond",
                            "microsecond",
                            "nanosecond",
                          ]),
                          Schema.Null,
                        ]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                        unit: "unit",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("json"),
                      decimalEncoding: Schema.optional(
                        Schema.Union([
                          Schema.Literals(["number", "string", "bytes"]),
                          Schema.Null,
                        ]),
                      ),
                      timestampFormat: Schema.optional(
                        Schema.Union([
                          Schema.Literals(["rfc3339", "unix_millis"]),
                          Schema.Null,
                        ]),
                      ),
                      unstructured: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        decimalEncoding: "decimal_encoding",
                        timestampFormat: "timestamp_format",
                        unstructured: "unstructured",
                      }),
                    ),
                    Schema.Unknown,
                  ]),
                ),
                Schema.Null,
              ]),
            ),
            format: Schema.optional(
              Schema.Union([
                Schema.Union([
                  Schema.Struct({
                    type: Schema.Literal("json"),
                    decimalEncoding: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["number", "string", "bytes"]),
                        Schema.Null,
                      ]),
                    ),
                    timestampFormat: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["rfc3339", "unix_millis"]),
                        Schema.Null,
                      ]),
                    ),
                    unstructured: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      type: "type",
                      decimalEncoding: "decimal_encoding",
                      timestampFormat: "timestamp_format",
                      unstructured: "unstructured",
                    }),
                  ),
                  Schema.Struct({
                    type: Schema.Literal("parquet"),
                    compression: Schema.optional(
                      Schema.Union([
                        Schema.Literals([
                          "uncompressed",
                          "snappy",
                          "gzip",
                          "zstd",
                          "lz4",
                        ]),
                        Schema.Null,
                      ]),
                    ),
                    rowGroupBytes: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      type: "type",
                      compression: "compression",
                      rowGroupBytes: "row_group_bytes",
                    }),
                  ),
                ]),
                Schema.Null,
              ]),
            ),
            inferred: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        modifiedAt: "modified_at",
        name: "name",
        type: "type",
        config: "config",
        format: "format",
        schema: "schema",
      }),
    ),
  ),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListSinksResponse>;

export type ListSinksError = DefaultErrors;

export const listSinks: API.PaginatedOperationMethod<
  ListSinksRequest,
  ListSinksResponse,
  ListSinksError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSinksRequest,
  ) => stream.Stream<
    ListSinksResponse,
    ListSinksError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListSinksRequest) => stream.Stream<
    {
      id: string;
      createdAt: string;
      modifiedAt: string;
      name: string;
      type: "r2" | "r2_data_catalog";
      config?:
        | {
            accountId: string;
            bucket: string;
            credentials: { accessKeyId: string; secretAccessKey: string };
            fileNaming?: {
              prefix?: string | null;
              strategy?: "serial" | "uuid" | "uuid_v7" | "ulid" | null;
              suffix?: string | null;
            } | null;
            jurisdiction?: string | null;
            partitioning?: { timePattern?: string | null } | null;
            path?: string | null;
            rollingPolicy?: {
              fileSizeBytes?: number | null;
              inactivitySeconds?: number | null;
              intervalSeconds?: number | null;
            } | null;
          }
        | {
            token: string;
            accountId: string;
            bucket: string;
            tableName: string;
            namespace?: string | null;
            rollingPolicy?: {
              fileSizeBytes?: number | null;
              inactivitySeconds?: number | null;
              intervalSeconds?: number | null;
            } | null;
          }
        | null;
      format?:
        | {
            type: "json";
            decimalEncoding?: "number" | "string" | "bytes" | null;
            timestampFormat?: "rfc3339" | "unix_millis" | null;
            unstructured?: boolean | null;
          }
        | {
            type: "parquet";
            compression?:
              | "uncompressed"
              | "snappy"
              | "gzip"
              | "zstd"
              | "lz4"
              | null;
            rowGroupBytes?: number | null;
          }
        | null;
      schema?: {
        fields?:
          | (
              | {
                  type: "int32";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "int64";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "float32";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "float64";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "bool";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "string";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "binary";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "timestamp";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                  unit?:
                    | "second"
                    | "millisecond"
                    | "microsecond"
                    | "nanosecond"
                    | null;
                }
              | {
                  type: "json";
                  decimalEncoding?: "number" | "string" | "bytes" | null;
                  timestampFormat?: "rfc3339" | "unix_millis" | null;
                  unstructured?: boolean | null;
                }
              | unknown
            )[]
          | null;
        format?:
          | {
              type: "json";
              decimalEncoding?: "number" | "string" | "bytes" | null;
              timestampFormat?: "rfc3339" | "unix_millis" | null;
              unstructured?: boolean | null;
            }
          | {
              type: "parquet";
              compression?:
                | "uncompressed"
                | "snappy"
                | "gzip"
                | "zstd"
                | "lz4"
                | null;
              rowGroupBytes?: number | null;
            }
          | null;
        inferred?: boolean | null;
      } | null;
    },
    ListSinksError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSinksRequest,
  output: ListSinksResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateSinkRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: Defines the name of the Sink. */
  name: string;
  /** Body param: Specifies the type of sink. */
  type: "r2" | "r2_data_catalog";
  /** Body param: Defines the configuration of the R2 Sink. */
  config?:
    | {
        accountId: string;
        bucket: string;
        credentials: { accessKeyId: string; secretAccessKey: string };
        fileNaming?: {
          prefix?: string;
          strategy?: "serial" | "uuid" | "uuid_v7" | "ulid";
          suffix?: string;
        };
        jurisdiction?: string;
        partitioning?: { timePattern?: string };
        path?: string;
        rollingPolicy?: {
          fileSizeBytes?: number;
          inactivitySeconds?: number;
          intervalSeconds?: number;
        };
      }
    | {
        token: string;
        accountId: string;
        bucket: string;
        tableName: string;
        namespace?: string;
        rollingPolicy?: {
          fileSizeBytes?: number;
          inactivitySeconds?: number;
          intervalSeconds?: number;
        };
      };
  /** Body param: */
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes";
        timestampFormat?: "rfc3339" | "unix_millis";
        unstructured?: boolean;
      }
    | {
        type: "parquet";
        compression?: "uncompressed" | "snappy" | "gzip" | "zstd" | "lz4";
        rowGroupBytes?: number | null;
      };
  /** Body param: */
  schema?: {
    fields?: (
      | {
          type: "int32";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "int64";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "float32";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "float64";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "bool";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "string";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "binary";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "timestamp";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
          unit?: "second" | "millisecond" | "microsecond" | "nanosecond";
        }
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes";
          timestampFormat?: "rfc3339" | "unix_millis";
          unstructured?: boolean;
        }
      | unknown
    )[];
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes";
          timestampFormat?: "rfc3339" | "unix_millis";
          unstructured?: boolean;
        }
      | {
          type: "parquet";
          compression?: "uncompressed" | "snappy" | "gzip" | "zstd" | "lz4";
          rowGroupBytes?: number | null;
        };
    inferred?: boolean | null;
  };
}

export const CreateSinkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  type: Schema.Literals(["r2", "r2_data_catalog"]),
  config: Schema.optional(
    Schema.Union([
      Schema.Struct({
        accountId: Schema.String,
        bucket: Schema.String,
        credentials: Schema.Struct({
          accessKeyId: Schema.String,
          secretAccessKey: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            accessKeyId: "access_key_id",
            secretAccessKey: "secret_access_key",
          }),
        ),
        fileNaming: Schema.optional(
          Schema.Struct({
            prefix: Schema.optional(Schema.String),
            strategy: Schema.optional(
              Schema.Literals(["serial", "uuid", "uuid_v7", "ulid"]),
            ),
            suffix: Schema.optional(Schema.String),
          }),
        ),
        jurisdiction: Schema.optional(Schema.String),
        partitioning: Schema.optional(
          Schema.Struct({
            timePattern: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ timePattern: "time_pattern" })),
        ),
        path: Schema.optional(Schema.String),
        rollingPolicy: Schema.optional(
          Schema.Struct({
            fileSizeBytes: Schema.optional(Schema.Number),
            inactivitySeconds: Schema.optional(Schema.Number),
            intervalSeconds: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              fileSizeBytes: "file_size_bytes",
              inactivitySeconds: "inactivity_seconds",
              intervalSeconds: "interval_seconds",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          bucket: "bucket",
          credentials: "credentials",
          fileNaming: "file_naming",
          jurisdiction: "jurisdiction",
          partitioning: "partitioning",
          path: "path",
          rollingPolicy: "rolling_policy",
        }),
      ),
      Schema.Struct({
        token: Schema.String,
        accountId: Schema.String,
        bucket: Schema.String,
        tableName: Schema.String,
        namespace: Schema.optional(Schema.String),
        rollingPolicy: Schema.optional(
          Schema.Struct({
            fileSizeBytes: Schema.optional(Schema.Number),
            inactivitySeconds: Schema.optional(Schema.Number),
            intervalSeconds: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              fileSizeBytes: "file_size_bytes",
              inactivitySeconds: "inactivity_seconds",
              intervalSeconds: "interval_seconds",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({
          token: "token",
          accountId: "account_id",
          bucket: "bucket",
          tableName: "table_name",
          namespace: "namespace",
          rollingPolicy: "rolling_policy",
        }),
      ),
    ]),
  ),
  format: Schema.optional(
    Schema.Union([
      Schema.Struct({
        type: Schema.Literal("json"),
        decimalEncoding: Schema.optional(
          Schema.Literals(["number", "string", "bytes"]),
        ),
        timestampFormat: Schema.optional(
          Schema.Literals(["rfc3339", "unix_millis"]),
        ),
        unstructured: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          type: "type",
          decimalEncoding: "decimal_encoding",
          timestampFormat: "timestamp_format",
          unstructured: "unstructured",
        }),
      ),
      Schema.Struct({
        type: Schema.Literal("parquet"),
        compression: Schema.optional(
          Schema.Literals(["uncompressed", "snappy", "gzip", "zstd", "lz4"]),
        ),
        rowGroupBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          type: "type",
          compression: "compression",
          rowGroupBytes: "row_group_bytes",
        }),
      ),
    ]),
  ),
  schema: Schema.optional(
    Schema.Struct({
      fields: Schema.optional(
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              type: Schema.Literal("int32"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("int64"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("float32"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("float64"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("bool"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("string"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("binary"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("timestamp"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
              unit: Schema.optional(
                Schema.Literals([
                  "second",
                  "millisecond",
                  "microsecond",
                  "nanosecond",
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
                unit: "unit",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("json"),
              decimalEncoding: Schema.optional(
                Schema.Literals(["number", "string", "bytes"]),
              ),
              timestampFormat: Schema.optional(
                Schema.Literals(["rfc3339", "unix_millis"]),
              ),
              unstructured: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                decimalEncoding: "decimal_encoding",
                timestampFormat: "timestamp_format",
                unstructured: "unstructured",
              }),
            ),
            Schema.Unknown,
          ]),
        ),
      ),
      format: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literal("json"),
            decimalEncoding: Schema.optional(
              Schema.Literals(["number", "string", "bytes"]),
            ),
            timestampFormat: Schema.optional(
              Schema.Literals(["rfc3339", "unix_millis"]),
            ),
            unstructured: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              decimalEncoding: "decimal_encoding",
              timestampFormat: "timestamp_format",
              unstructured: "unstructured",
            }),
          ),
          Schema.Struct({
            type: Schema.Literal("parquet"),
            compression: Schema.optional(
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
            ),
            rowGroupBytes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              compression: "compression",
              rowGroupBytes: "row_group_bytes",
            }),
          ),
        ]),
      ),
      inferred: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pipelines/v1/sinks" }),
) as unknown as Schema.Schema<CreateSinkRequest>;

export interface CreateSinkResponse {
  /** Indicates a unique identifier for this sink. */
  id: string;
  createdAt: string;
  modifiedAt: string;
  /** Defines the name of the Sink. */
  name: string;
  /** Specifies the type of sink. */
  type: "r2" | "r2_data_catalog";
  /** R2 Data Catalog Sink */
  config?:
    | {
        accountId: string;
        bucket: string;
        credentials: { accessKeyId: string; secretAccessKey: string };
        fileNaming?: {
          prefix?: string | null;
          strategy?: "serial" | "uuid" | "uuid_v7" | "ulid" | null;
          suffix?: string | null;
        } | null;
        jurisdiction?: string | null;
        partitioning?: { timePattern?: string | null } | null;
        path?: string | null;
        rollingPolicy?: {
          fileSizeBytes?: number | null;
          inactivitySeconds?: number | null;
          intervalSeconds?: number | null;
        } | null;
      }
    | {
        token: string;
        accountId: string;
        bucket: string;
        tableName: string;
        namespace?: string | null;
        rollingPolicy?: {
          fileSizeBytes?: number | null;
          inactivitySeconds?: number | null;
          intervalSeconds?: number | null;
        } | null;
      }
    | null;
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes" | null;
        timestampFormat?: "rfc3339" | "unix_millis" | null;
        unstructured?: boolean | null;
      }
    | {
        type: "parquet";
        compression?:
          | "uncompressed"
          | "snappy"
          | "gzip"
          | "zstd"
          | "lz4"
          | null;
        rowGroupBytes?: number | null;
      }
    | null;
  schema?: {
    fields?:
      | (
          | {
              type: "int32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "int64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "bool";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "string";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "binary";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "timestamp";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
              unit?:
                | "second"
                | "millisecond"
                | "microsecond"
                | "nanosecond"
                | null;
            }
          | {
              type: "json";
              decimalEncoding?: "number" | "string" | "bytes" | null;
              timestampFormat?: "rfc3339" | "unix_millis" | null;
              unstructured?: boolean | null;
            }
          | unknown
        )[]
      | null;
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes" | null;
          timestampFormat?: "rfc3339" | "unix_millis" | null;
          unstructured?: boolean | null;
        }
      | {
          type: "parquet";
          compression?:
            | "uncompressed"
            | "snappy"
            | "gzip"
            | "zstd"
            | "lz4"
            | null;
          rowGroupBytes?: number | null;
        }
      | null;
    inferred?: boolean | null;
  } | null;
}

export const CreateSinkResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  type: Schema.Literals(["r2", "r2_data_catalog"]),
  config: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          accountId: Schema.String,
          bucket: Schema.String,
          credentials: Schema.Struct({
            accessKeyId: Schema.String,
            secretAccessKey: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              accessKeyId: "access_key_id",
              secretAccessKey: "secret_access_key",
            }),
          ),
          fileNaming: Schema.optional(
            Schema.Union([
              Schema.Struct({
                prefix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                strategy: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["serial", "uuid", "uuid_v7", "ulid"]),
                    Schema.Null,
                  ]),
                ),
                suffix: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          jurisdiction: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          partitioning: Schema.optional(
            Schema.Union([
              Schema.Struct({
                timePattern: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ timePattern: "time_pattern" })),
              Schema.Null,
            ]),
          ),
          path: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          rollingPolicy: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fileSizeBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                inactivitySeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                intervalSeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  fileSizeBytes: "file_size_bytes",
                  inactivitySeconds: "inactivity_seconds",
                  intervalSeconds: "interval_seconds",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            accountId: "account_id",
            bucket: "bucket",
            credentials: "credentials",
            fileNaming: "file_naming",
            jurisdiction: "jurisdiction",
            partitioning: "partitioning",
            path: "path",
            rollingPolicy: "rolling_policy",
          }),
        ),
        Schema.Struct({
          token: Schema.String,
          accountId: Schema.String,
          bucket: Schema.String,
          tableName: Schema.String,
          namespace: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          rollingPolicy: Schema.optional(
            Schema.Union([
              Schema.Struct({
                fileSizeBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                inactivitySeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                intervalSeconds: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  fileSizeBytes: "file_size_bytes",
                  inactivitySeconds: "inactivity_seconds",
                  intervalSeconds: "interval_seconds",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            token: "token",
            accountId: "account_id",
            bucket: "bucket",
            tableName: "table_name",
            namespace: "namespace",
            rollingPolicy: "rolling_policy",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  format: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          type: Schema.Literal("json"),
          decimalEncoding: Schema.optional(
            Schema.Union([
              Schema.Literals(["number", "string", "bytes"]),
              Schema.Null,
            ]),
          ),
          timestampFormat: Schema.optional(
            Schema.Union([
              Schema.Literals(["rfc3339", "unix_millis"]),
              Schema.Null,
            ]),
          ),
          unstructured: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            decimalEncoding: "decimal_encoding",
            timestampFormat: "timestamp_format",
            unstructured: "unstructured",
          }),
        ),
        Schema.Struct({
          type: Schema.Literal("parquet"),
          compression: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
              Schema.Null,
            ]),
          ),
          rowGroupBytes: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            compression: "compression",
            rowGroupBytes: "row_group_bytes",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  schema: Schema.optional(
    Schema.Union([
      Schema.Struct({
        fields: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literal("int32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("int64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("bool"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("string"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("binary"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("timestamp"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  unit: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "second",
                        "millisecond",
                        "microsecond",
                        "nanosecond",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                    unit: "unit",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("json"),
                  decimalEncoding: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["number", "string", "bytes"]),
                      Schema.Null,
                    ]),
                  ),
                  timestampFormat: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["rfc3339", "unix_millis"]),
                      Schema.Null,
                    ]),
                  ),
                  unstructured: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    decimalEncoding: "decimal_encoding",
                    timestampFormat: "timestamp_format",
                    unstructured: "unstructured",
                  }),
                ),
                Schema.Unknown,
              ]),
            ),
            Schema.Null,
          ]),
        ),
        format: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                type: Schema.Literal("json"),
                decimalEncoding: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["number", "string", "bytes"]),
                    Schema.Null,
                  ]),
                ),
                timestampFormat: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["rfc3339", "unix_millis"]),
                    Schema.Null,
                  ]),
                ),
                unstructured: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  decimalEncoding: "decimal_encoding",
                  timestampFormat: "timestamp_format",
                  unstructured: "unstructured",
                }),
              ),
              Schema.Struct({
                type: Schema.Literal("parquet"),
                compression: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "uncompressed",
                      "snappy",
                      "gzip",
                      "zstd",
                      "lz4",
                    ]),
                    Schema.Null,
                  ]),
                ),
                rowGroupBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  compression: "compression",
                  rowGroupBytes: "row_group_bytes",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        inferred: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      type: "type",
      config: "config",
      format: "format",
      schema: "schema",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateSinkResponse>;

export type CreateSinkError = DefaultErrors;

export const createSink: API.OperationMethod<
  CreateSinkRequest,
  CreateSinkResponse,
  CreateSinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSinkRequest,
  output: CreateSinkResponse,
  errors: [],
}));

export interface DeleteSinkRequest {
  sinkId: string;
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: Delete sink forcefully, including deleting any dependent pipelines. */
  force?: string;
}

export const DeleteSinkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  sinkId: Schema.String.pipe(T.HttpPath("sinkId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  force: Schema.optional(Schema.String).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/pipelines/v1/sinks/{sinkId}",
  }),
) as unknown as Schema.Schema<DeleteSinkRequest>;

export type DeleteSinkResponse = unknown;

export const DeleteSinkResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteSinkResponse>;

export type DeleteSinkError = DefaultErrors;

export const deleteSink: API.OperationMethod<
  DeleteSinkRequest,
  DeleteSinkResponse,
  DeleteSinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSinkRequest,
  output: DeleteSinkResponse,
  errors: [],
}));

// =============================================================================
// SqlPipeline
// =============================================================================

export interface ValidateSqlPipelineRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: Specifies SQL to validate. */
  sql: string;
}

export const ValidateSqlPipelineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    sql: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/pipelines/v1/validate_sql",
    }),
  ) as unknown as Schema.Schema<ValidateSqlPipelineRequest>;

export interface ValidateSqlPipelineResponse {
  /** Indicates tables involved in the processing. */
  tables: Record<string, unknown>;
  graph?: {
    edges: {
      destId: number;
      edgeType: string;
      keyType: string;
      srcId: number;
      valueType: string;
    }[];
    nodes: {
      description: string;
      nodeId: number;
      operator: string;
      parallelism: number;
    }[];
  } | null;
}

export const ValidateSqlPipelineResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tables: Schema.Struct({}),
    graph: Schema.optional(
      Schema.Union([
        Schema.Struct({
          edges: Schema.Array(
            Schema.Struct({
              destId: Schema.Number,
              edgeType: Schema.String,
              keyType: Schema.String,
              srcId: Schema.Number,
              valueType: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                destId: "dest_id",
                edgeType: "edge_type",
                keyType: "key_type",
                srcId: "src_id",
                valueType: "value_type",
              }),
            ),
          ),
          nodes: Schema.Array(
            Schema.Struct({
              description: Schema.String,
              nodeId: Schema.Number,
              operator: Schema.String,
              parallelism: Schema.Number,
            }).pipe(
              Schema.encodeKeys({
                description: "description",
                nodeId: "node_id",
                operator: "operator",
                parallelism: "parallelism",
              }),
            ),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ValidateSqlPipelineResponse>;

export type ValidateSqlPipelineError = DefaultErrors | TableNotFound;

export const validateSqlPipeline: API.OperationMethod<
  ValidateSqlPipelineRequest,
  ValidateSqlPipelineResponse,
  ValidateSqlPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ValidateSqlPipelineRequest,
  output: ValidateSqlPipelineResponse,
  errors: [TableNotFound],
}));

// =============================================================================
// Stream
// =============================================================================

export interface GetStreamRequest {
  streamId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  streamId: Schema.String.pipe(T.HttpPath("streamId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/streams/{streamId}",
  }),
) as unknown as Schema.Schema<GetStreamRequest>;

export interface GetStreamResponse {
  /** Indicates a unique identifier for this stream. */
  id: string;
  createdAt: string;
  http: {
    authentication: boolean;
    enabled: boolean;
    cors?: { origins?: string[] | null } | null;
  };
  modifiedAt: string;
  /** Indicates the name of the Stream. */
  name: string;
  /** Indicates the current version of this stream. */
  version: number;
  workerBinding: { enabled: boolean };
  /** Indicates the endpoint URL of this stream. */
  endpoint?: string | null;
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes" | null;
        timestampFormat?: "rfc3339" | "unix_millis" | null;
        unstructured?: boolean | null;
      }
    | {
        type: "parquet";
        compression?:
          | "uncompressed"
          | "snappy"
          | "gzip"
          | "zstd"
          | "lz4"
          | null;
        rowGroupBytes?: number | null;
      }
    | null;
  schema?: {
    fields?:
      | (
          | {
              type: "int32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "int64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "bool";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "string";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "binary";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "timestamp";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
              unit?:
                | "second"
                | "millisecond"
                | "microsecond"
                | "nanosecond"
                | null;
            }
          | {
              type: "json";
              decimalEncoding?: "number" | "string" | "bytes" | null;
              timestampFormat?: "rfc3339" | "unix_millis" | null;
              unstructured?: boolean | null;
            }
          | unknown
        )[]
      | null;
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes" | null;
          timestampFormat?: "rfc3339" | "unix_millis" | null;
          unstructured?: boolean | null;
        }
      | {
          type: "parquet";
          compression?:
            | "uncompressed"
            | "snappy"
            | "gzip"
            | "zstd"
            | "lz4"
            | null;
          rowGroupBytes?: number | null;
        }
      | null;
    inferred?: boolean | null;
  } | null;
}

export const GetStreamResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  http: Schema.Struct({
    authentication: Schema.Boolean,
    enabled: Schema.Boolean,
    cors: Schema.optional(
      Schema.Union([
        Schema.Struct({
          origins: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }),
  modifiedAt: Schema.String,
  name: Schema.String,
  version: Schema.Number,
  workerBinding: Schema.Struct({
    enabled: Schema.Boolean,
  }),
  endpoint: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  format: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          type: Schema.Literal("json"),
          decimalEncoding: Schema.optional(
            Schema.Union([
              Schema.Literals(["number", "string", "bytes"]),
              Schema.Null,
            ]),
          ),
          timestampFormat: Schema.optional(
            Schema.Union([
              Schema.Literals(["rfc3339", "unix_millis"]),
              Schema.Null,
            ]),
          ),
          unstructured: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            decimalEncoding: "decimal_encoding",
            timestampFormat: "timestamp_format",
            unstructured: "unstructured",
          }),
        ),
        Schema.Struct({
          type: Schema.Literal("parquet"),
          compression: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
              Schema.Null,
            ]),
          ),
          rowGroupBytes: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            compression: "compression",
            rowGroupBytes: "row_group_bytes",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  schema: Schema.optional(
    Schema.Union([
      Schema.Struct({
        fields: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literal("int32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("int64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("bool"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("string"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("binary"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("timestamp"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  unit: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "second",
                        "millisecond",
                        "microsecond",
                        "nanosecond",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                    unit: "unit",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("json"),
                  decimalEncoding: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["number", "string", "bytes"]),
                      Schema.Null,
                    ]),
                  ),
                  timestampFormat: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["rfc3339", "unix_millis"]),
                      Schema.Null,
                    ]),
                  ),
                  unstructured: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    decimalEncoding: "decimal_encoding",
                    timestampFormat: "timestamp_format",
                    unstructured: "unstructured",
                  }),
                ),
                Schema.Unknown,
              ]),
            ),
            Schema.Null,
          ]),
        ),
        format: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                type: Schema.Literal("json"),
                decimalEncoding: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["number", "string", "bytes"]),
                    Schema.Null,
                  ]),
                ),
                timestampFormat: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["rfc3339", "unix_millis"]),
                    Schema.Null,
                  ]),
                ),
                unstructured: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  decimalEncoding: "decimal_encoding",
                  timestampFormat: "timestamp_format",
                  unstructured: "unstructured",
                }),
              ),
              Schema.Struct({
                type: Schema.Literal("parquet"),
                compression: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "uncompressed",
                      "snappy",
                      "gzip",
                      "zstd",
                      "lz4",
                    ]),
                    Schema.Null,
                  ]),
                ),
                rowGroupBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  compression: "compression",
                  rowGroupBytes: "row_group_bytes",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        inferred: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      http: "http",
      modifiedAt: "modified_at",
      name: "name",
      version: "version",
      workerBinding: "worker_binding",
      endpoint: "endpoint",
      format: "format",
      schema: "schema",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetStreamResponse>;

export type GetStreamError = DefaultErrors | StreamNotFound | InvalidStreamId;

export const getStream: API.OperationMethod<
  GetStreamRequest,
  GetStreamResponse,
  GetStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStreamRequest,
  output: GetStreamResponse,
  errors: [StreamNotFound, InvalidStreamId],
}));

export interface ListStreamsRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: Specifies the public ID of the pipeline. */
  pipelineId?: string;
}

export const ListStreamsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pipelineId: Schema.optional(Schema.String).pipe(T.HttpQuery("pipeline_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/streams",
  }),
) as unknown as Schema.Schema<ListStreamsRequest>;

export interface ListStreamsResponse {
  result: {
    id: string;
    createdAt: string;
    http: {
      authentication: boolean;
      enabled: boolean;
      cors?: { origins?: string[] | null } | null;
    };
    modifiedAt: string;
    name: string;
    version: number;
    workerBinding: { enabled: boolean };
    endpoint?: string | null;
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes" | null;
          timestampFormat?: "rfc3339" | "unix_millis" | null;
          unstructured?: boolean | null;
        }
      | {
          type: "parquet";
          compression?:
            | "uncompressed"
            | "snappy"
            | "gzip"
            | "zstd"
            | "lz4"
            | null;
          rowGroupBytes?: number | null;
        }
      | null;
    schema?: {
      fields?:
        | (
            | {
                type: "int32";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "int64";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "float32";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "float64";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "bool";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "string";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "binary";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
              }
            | {
                type: "timestamp";
                metadataKey?: string | null;
                name?: string | null;
                required?: boolean | null;
                sqlName?: string | null;
                unit?:
                  | "second"
                  | "millisecond"
                  | "microsecond"
                  | "nanosecond"
                  | null;
              }
            | {
                type: "json";
                decimalEncoding?: "number" | "string" | "bytes" | null;
                timestampFormat?: "rfc3339" | "unix_millis" | null;
                unstructured?: boolean | null;
              }
            | unknown
          )[]
        | null;
      format?:
        | {
            type: "json";
            decimalEncoding?: "number" | "string" | "bytes" | null;
            timestampFormat?: "rfc3339" | "unix_millis" | null;
            unstructured?: boolean | null;
          }
        | {
            type: "parquet";
            compression?:
              | "uncompressed"
              | "snappy"
              | "gzip"
              | "zstd"
              | "lz4"
              | null;
            rowGroupBytes?: number | null;
          }
        | null;
      inferred?: boolean | null;
    } | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListStreamsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String,
      http: Schema.Struct({
        authentication: Schema.Boolean,
        enabled: Schema.Boolean,
        cors: Schema.optional(
          Schema.Union([
            Schema.Struct({
              origins: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }),
      modifiedAt: Schema.String,
      name: Schema.String,
      version: Schema.Number,
      workerBinding: Schema.Struct({
        enabled: Schema.Boolean,
      }),
      endpoint: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      format: Schema.optional(
        Schema.Union([
          Schema.Union([
            Schema.Struct({
              type: Schema.Literal("json"),
              decimalEncoding: Schema.optional(
                Schema.Union([
                  Schema.Literals(["number", "string", "bytes"]),
                  Schema.Null,
                ]),
              ),
              timestampFormat: Schema.optional(
                Schema.Union([
                  Schema.Literals(["rfc3339", "unix_millis"]),
                  Schema.Null,
                ]),
              ),
              unstructured: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                decimalEncoding: "decimal_encoding",
                timestampFormat: "timestamp_format",
                unstructured: "unstructured",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("parquet"),
              compression: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "uncompressed",
                    "snappy",
                    "gzip",
                    "zstd",
                    "lz4",
                  ]),
                  Schema.Null,
                ]),
              ),
              rowGroupBytes: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                compression: "compression",
                rowGroupBytes: "row_group_bytes",
              }),
            ),
          ]),
          Schema.Null,
        ]),
      ),
      schema: Schema.optional(
        Schema.Union([
          Schema.Struct({
            fields: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literal("int32"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("int64"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("float32"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("float64"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("bool"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("string"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("binary"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("timestamp"),
                      metadataKey: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      required: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      sqlName: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      unit: Schema.optional(
                        Schema.Union([
                          Schema.Literals([
                            "second",
                            "millisecond",
                            "microsecond",
                            "nanosecond",
                          ]),
                          Schema.Null,
                        ]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        metadataKey: "metadata_key",
                        name: "name",
                        required: "required",
                        sqlName: "sql_name",
                        unit: "unit",
                      }),
                    ),
                    Schema.Struct({
                      type: Schema.Literal("json"),
                      decimalEncoding: Schema.optional(
                        Schema.Union([
                          Schema.Literals(["number", "string", "bytes"]),
                          Schema.Null,
                        ]),
                      ),
                      timestampFormat: Schema.optional(
                        Schema.Union([
                          Schema.Literals(["rfc3339", "unix_millis"]),
                          Schema.Null,
                        ]),
                      ),
                      unstructured: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        type: "type",
                        decimalEncoding: "decimal_encoding",
                        timestampFormat: "timestamp_format",
                        unstructured: "unstructured",
                      }),
                    ),
                    Schema.Unknown,
                  ]),
                ),
                Schema.Null,
              ]),
            ),
            format: Schema.optional(
              Schema.Union([
                Schema.Union([
                  Schema.Struct({
                    type: Schema.Literal("json"),
                    decimalEncoding: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["number", "string", "bytes"]),
                        Schema.Null,
                      ]),
                    ),
                    timestampFormat: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["rfc3339", "unix_millis"]),
                        Schema.Null,
                      ]),
                    ),
                    unstructured: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      type: "type",
                      decimalEncoding: "decimal_encoding",
                      timestampFormat: "timestamp_format",
                      unstructured: "unstructured",
                    }),
                  ),
                  Schema.Struct({
                    type: Schema.Literal("parquet"),
                    compression: Schema.optional(
                      Schema.Union([
                        Schema.Literals([
                          "uncompressed",
                          "snappy",
                          "gzip",
                          "zstd",
                          "lz4",
                        ]),
                        Schema.Null,
                      ]),
                    ),
                    rowGroupBytes: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      type: "type",
                      compression: "compression",
                      rowGroupBytes: "row_group_bytes",
                    }),
                  ),
                ]),
                Schema.Null,
              ]),
            ),
            inferred: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
          }),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        http: "http",
        modifiedAt: "modified_at",
        name: "name",
        version: "version",
        workerBinding: "worker_binding",
        endpoint: "endpoint",
        format: "format",
        schema: "schema",
      }),
    ),
  ),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListStreamsResponse>;

export type ListStreamsError = DefaultErrors;

export const listStreams: API.PaginatedOperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListStreamsRequest,
  ) => stream.Stream<
    ListStreamsResponse,
    ListStreamsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListStreamsRequest) => stream.Stream<
    {
      id: string;
      createdAt: string;
      http: {
        authentication: boolean;
        enabled: boolean;
        cors?: { origins?: string[] | null } | null;
      };
      modifiedAt: string;
      name: string;
      version: number;
      workerBinding: { enabled: boolean };
      endpoint?: string | null;
      format?:
        | {
            type: "json";
            decimalEncoding?: "number" | "string" | "bytes" | null;
            timestampFormat?: "rfc3339" | "unix_millis" | null;
            unstructured?: boolean | null;
          }
        | {
            type: "parquet";
            compression?:
              | "uncompressed"
              | "snappy"
              | "gzip"
              | "zstd"
              | "lz4"
              | null;
            rowGroupBytes?: number | null;
          }
        | null;
      schema?: {
        fields?:
          | (
              | {
                  type: "int32";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "int64";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "float32";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "float64";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "bool";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "string";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "binary";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                }
              | {
                  type: "timestamp";
                  metadataKey?: string | null;
                  name?: string | null;
                  required?: boolean | null;
                  sqlName?: string | null;
                  unit?:
                    | "second"
                    | "millisecond"
                    | "microsecond"
                    | "nanosecond"
                    | null;
                }
              | {
                  type: "json";
                  decimalEncoding?: "number" | "string" | "bytes" | null;
                  timestampFormat?: "rfc3339" | "unix_millis" | null;
                  unstructured?: boolean | null;
                }
              | unknown
            )[]
          | null;
        format?:
          | {
              type: "json";
              decimalEncoding?: "number" | "string" | "bytes" | null;
              timestampFormat?: "rfc3339" | "unix_millis" | null;
              unstructured?: boolean | null;
            }
          | {
              type: "parquet";
              compression?:
                | "uncompressed"
                | "snappy"
                | "gzip"
                | "zstd"
                | "lz4"
                | null;
              rowGroupBytes?: number | null;
            }
          | null;
        inferred?: boolean | null;
      } | null;
    },
    ListStreamsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListStreamsRequest,
  output: ListStreamsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateStreamRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: Specifies the name of the Stream. */
  name: string;
  /** Body param: */
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes";
        timestampFormat?: "rfc3339" | "unix_millis";
        unstructured?: boolean;
      }
    | {
        type: "parquet";
        compression?: "uncompressed" | "snappy" | "gzip" | "zstd" | "lz4";
        rowGroupBytes?: number | null;
      };
  /** Body param: */
  http?: {
    authentication: boolean;
    enabled: boolean;
    cors?: { origins?: string[] };
  };
  /** Body param: */
  schema?: {
    fields?: (
      | {
          type: "int32";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "int64";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "float32";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "float64";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "bool";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "string";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "binary";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
        }
      | {
          type: "timestamp";
          metadataKey?: string | null;
          name?: string;
          required?: boolean;
          sqlName?: string;
          unit?: "second" | "millisecond" | "microsecond" | "nanosecond";
        }
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes";
          timestampFormat?: "rfc3339" | "unix_millis";
          unstructured?: boolean;
        }
      | unknown
    )[];
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes";
          timestampFormat?: "rfc3339" | "unix_millis";
          unstructured?: boolean;
        }
      | {
          type: "parquet";
          compression?: "uncompressed" | "snappy" | "gzip" | "zstd" | "lz4";
          rowGroupBytes?: number | null;
        };
    inferred?: boolean | null;
  };
  /** Body param: */
  workerBinding?: { enabled: boolean };
}

export const CreateStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  format: Schema.optional(
    Schema.Union([
      Schema.Struct({
        type: Schema.Literal("json"),
        decimalEncoding: Schema.optional(
          Schema.Literals(["number", "string", "bytes"]),
        ),
        timestampFormat: Schema.optional(
          Schema.Literals(["rfc3339", "unix_millis"]),
        ),
        unstructured: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          type: "type",
          decimalEncoding: "decimal_encoding",
          timestampFormat: "timestamp_format",
          unstructured: "unstructured",
        }),
      ),
      Schema.Struct({
        type: Schema.Literal("parquet"),
        compression: Schema.optional(
          Schema.Literals(["uncompressed", "snappy", "gzip", "zstd", "lz4"]),
        ),
        rowGroupBytes: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          type: "type",
          compression: "compression",
          rowGroupBytes: "row_group_bytes",
        }),
      ),
    ]),
  ),
  http: Schema.optional(
    Schema.Struct({
      authentication: Schema.Boolean,
      enabled: Schema.Boolean,
      cors: Schema.optional(
        Schema.Struct({
          origins: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  ),
  schema: Schema.optional(
    Schema.Struct({
      fields: Schema.optional(
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              type: Schema.Literal("int32"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("int64"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("float32"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("float64"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("bool"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("string"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("binary"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("timestamp"),
              metadataKey: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              name: Schema.optional(Schema.String),
              required: Schema.optional(Schema.Boolean),
              sqlName: Schema.optional(Schema.String),
              unit: Schema.optional(
                Schema.Literals([
                  "second",
                  "millisecond",
                  "microsecond",
                  "nanosecond",
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                metadataKey: "metadata_key",
                name: "name",
                required: "required",
                sqlName: "sql_name",
                unit: "unit",
              }),
            ),
            Schema.Struct({
              type: Schema.Literal("json"),
              decimalEncoding: Schema.optional(
                Schema.Literals(["number", "string", "bytes"]),
              ),
              timestampFormat: Schema.optional(
                Schema.Literals(["rfc3339", "unix_millis"]),
              ),
              unstructured: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                type: "type",
                decimalEncoding: "decimal_encoding",
                timestampFormat: "timestamp_format",
                unstructured: "unstructured",
              }),
            ),
            Schema.Unknown,
          ]),
        ),
      ),
      format: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literal("json"),
            decimalEncoding: Schema.optional(
              Schema.Literals(["number", "string", "bytes"]),
            ),
            timestampFormat: Schema.optional(
              Schema.Literals(["rfc3339", "unix_millis"]),
            ),
            unstructured: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              decimalEncoding: "decimal_encoding",
              timestampFormat: "timestamp_format",
              unstructured: "unstructured",
            }),
          ),
          Schema.Struct({
            type: Schema.Literal("parquet"),
            compression: Schema.optional(
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
            ),
            rowGroupBytes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              compression: "compression",
              rowGroupBytes: "row_group_bytes",
            }),
          ),
        ]),
      ),
      inferred: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }),
  ),
  workerBinding: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    format: "format",
    http: "http",
    schema: "schema",
    workerBinding: "worker_binding",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/pipelines/v1/streams",
  }),
) as unknown as Schema.Schema<CreateStreamRequest>;

export interface CreateStreamResponse {
  /** Indicates a unique identifier for this stream. */
  id: string;
  createdAt: string;
  http: {
    authentication: boolean;
    enabled: boolean;
    cors?: { origins?: string[] | null } | null;
  };
  modifiedAt: string;
  /** Indicates the name of the Stream. */
  name: string;
  /** Indicates the current version of this stream. */
  version: number;
  workerBinding: { enabled: boolean };
  /** Indicates the endpoint URL of this stream. */
  endpoint?: string | null;
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes" | null;
        timestampFormat?: "rfc3339" | "unix_millis" | null;
        unstructured?: boolean | null;
      }
    | {
        type: "parquet";
        compression?:
          | "uncompressed"
          | "snappy"
          | "gzip"
          | "zstd"
          | "lz4"
          | null;
        rowGroupBytes?: number | null;
      }
    | null;
  schema?: {
    fields?:
      | (
          | {
              type: "int32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "int64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float32";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "float64";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "bool";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "string";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "binary";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
            }
          | {
              type: "timestamp";
              metadataKey?: string | null;
              name?: string | null;
              required?: boolean | null;
              sqlName?: string | null;
              unit?:
                | "second"
                | "millisecond"
                | "microsecond"
                | "nanosecond"
                | null;
            }
          | {
              type: "json";
              decimalEncoding?: "number" | "string" | "bytes" | null;
              timestampFormat?: "rfc3339" | "unix_millis" | null;
              unstructured?: boolean | null;
            }
          | unknown
        )[]
      | null;
    format?:
      | {
          type: "json";
          decimalEncoding?: "number" | "string" | "bytes" | null;
          timestampFormat?: "rfc3339" | "unix_millis" | null;
          unstructured?: boolean | null;
        }
      | {
          type: "parquet";
          compression?:
            | "uncompressed"
            | "snappy"
            | "gzip"
            | "zstd"
            | "lz4"
            | null;
          rowGroupBytes?: number | null;
        }
      | null;
    inferred?: boolean | null;
  } | null;
}

export const CreateStreamResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  http: Schema.Struct({
    authentication: Schema.Boolean,
    enabled: Schema.Boolean,
    cors: Schema.optional(
      Schema.Union([
        Schema.Struct({
          origins: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }),
  modifiedAt: Schema.String,
  name: Schema.String,
  version: Schema.Number,
  workerBinding: Schema.Struct({
    enabled: Schema.Boolean,
  }),
  endpoint: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  format: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          type: Schema.Literal("json"),
          decimalEncoding: Schema.optional(
            Schema.Union([
              Schema.Literals(["number", "string", "bytes"]),
              Schema.Null,
            ]),
          ),
          timestampFormat: Schema.optional(
            Schema.Union([
              Schema.Literals(["rfc3339", "unix_millis"]),
              Schema.Null,
            ]),
          ),
          unstructured: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            decimalEncoding: "decimal_encoding",
            timestampFormat: "timestamp_format",
            unstructured: "unstructured",
          }),
        ),
        Schema.Struct({
          type: Schema.Literal("parquet"),
          compression: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
              Schema.Null,
            ]),
          ),
          rowGroupBytes: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            compression: "compression",
            rowGroupBytes: "row_group_bytes",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  schema: Schema.optional(
    Schema.Union([
      Schema.Struct({
        fields: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literal("int32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("int64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float32"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("float64"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("bool"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("string"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("binary"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("timestamp"),
                  metadataKey: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  required: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                  sqlName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  unit: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "second",
                        "millisecond",
                        "microsecond",
                        "nanosecond",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    metadataKey: "metadata_key",
                    name: "name",
                    required: "required",
                    sqlName: "sql_name",
                    unit: "unit",
                  }),
                ),
                Schema.Struct({
                  type: Schema.Literal("json"),
                  decimalEncoding: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["number", "string", "bytes"]),
                      Schema.Null,
                    ]),
                  ),
                  timestampFormat: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["rfc3339", "unix_millis"]),
                      Schema.Null,
                    ]),
                  ),
                  unstructured: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    type: "type",
                    decimalEncoding: "decimal_encoding",
                    timestampFormat: "timestamp_format",
                    unstructured: "unstructured",
                  }),
                ),
                Schema.Unknown,
              ]),
            ),
            Schema.Null,
          ]),
        ),
        format: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                type: Schema.Literal("json"),
                decimalEncoding: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["number", "string", "bytes"]),
                    Schema.Null,
                  ]),
                ),
                timestampFormat: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["rfc3339", "unix_millis"]),
                    Schema.Null,
                  ]),
                ),
                unstructured: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  decimalEncoding: "decimal_encoding",
                  timestampFormat: "timestamp_format",
                  unstructured: "unstructured",
                }),
              ),
              Schema.Struct({
                type: Schema.Literal("parquet"),
                compression: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "uncompressed",
                      "snappy",
                      "gzip",
                      "zstd",
                      "lz4",
                    ]),
                    Schema.Null,
                  ]),
                ),
                rowGroupBytes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  compression: "compression",
                  rowGroupBytes: "row_group_bytes",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        inferred: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      http: "http",
      modifiedAt: "modified_at",
      name: "name",
      version: "version",
      workerBinding: "worker_binding",
      endpoint: "endpoint",
      format: "format",
      schema: "schema",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateStreamResponse>;

export type CreateStreamError =
  | DefaultErrors
  | InvalidStreamName
  | StreamAlreadyExists;

export const createStream: API.OperationMethod<
  CreateStreamRequest,
  CreateStreamResponse,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateStreamRequest,
  output: CreateStreamResponse,
  errors: [InvalidStreamName, StreamAlreadyExists],
}));

export interface PatchStreamRequest {
  streamId: string;
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: */
  http?: {
    authentication: boolean;
    enabled: boolean;
    cors?: { origins?: string[] };
  };
  /** Body param: */
  workerBinding?: { enabled: boolean };
}

export const PatchStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  streamId: Schema.String.pipe(T.HttpPath("streamId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  http: Schema.optional(
    Schema.Struct({
      authentication: Schema.Boolean,
      enabled: Schema.Boolean,
      cors: Schema.optional(
        Schema.Struct({
          origins: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  ),
  workerBinding: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
    }),
  ),
}).pipe(
  Schema.encodeKeys({ http: "http", workerBinding: "worker_binding" }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/pipelines/v1/streams/{streamId}",
  }),
) as unknown as Schema.Schema<PatchStreamRequest>;

export interface PatchStreamResponse {
  /** Indicates a unique identifier for this stream. */
  id: string;
  createdAt: string;
  http: {
    authentication: boolean;
    enabled: boolean;
    cors?: { origins?: string[] | null } | null;
  };
  modifiedAt: string;
  /** Indicates the name of the Stream. */
  name: string;
  /** Indicates the current version of this stream. */
  version: number;
  workerBinding: { enabled: boolean };
  /** Indicates the endpoint URL of this stream. */
  endpoint?: string | null;
  format?:
    | {
        type: "json";
        decimalEncoding?: "number" | "string" | "bytes" | null;
        timestampFormat?: "rfc3339" | "unix_millis" | null;
        unstructured?: boolean | null;
      }
    | {
        type: "parquet";
        compression?:
          | "uncompressed"
          | "snappy"
          | "gzip"
          | "zstd"
          | "lz4"
          | null;
        rowGroupBytes?: number | null;
      }
    | null;
}

export const PatchStreamResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  http: Schema.Struct({
    authentication: Schema.Boolean,
    enabled: Schema.Boolean,
    cors: Schema.optional(
      Schema.Union([
        Schema.Struct({
          origins: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }),
  modifiedAt: Schema.String,
  name: Schema.String,
  version: Schema.Number,
  workerBinding: Schema.Struct({
    enabled: Schema.Boolean,
  }),
  endpoint: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  format: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          type: Schema.Literal("json"),
          decimalEncoding: Schema.optional(
            Schema.Union([
              Schema.Literals(["number", "string", "bytes"]),
              Schema.Null,
            ]),
          ),
          timestampFormat: Schema.optional(
            Schema.Union([
              Schema.Literals(["rfc3339", "unix_millis"]),
              Schema.Null,
            ]),
          ),
          unstructured: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            decimalEncoding: "decimal_encoding",
            timestampFormat: "timestamp_format",
            unstructured: "unstructured",
          }),
        ),
        Schema.Struct({
          type: Schema.Literal("parquet"),
          compression: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "uncompressed",
                "snappy",
                "gzip",
                "zstd",
                "lz4",
              ]),
              Schema.Null,
            ]),
          ),
          rowGroupBytes: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            type: "type",
            compression: "compression",
            rowGroupBytes: "row_group_bytes",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      http: "http",
      modifiedAt: "modified_at",
      name: "name",
      version: "version",
      workerBinding: "worker_binding",
      endpoint: "endpoint",
      format: "format",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchStreamResponse>;

export type PatchStreamError = DefaultErrors | StreamNotFound;

export const patchStream: API.OperationMethod<
  PatchStreamRequest,
  PatchStreamResponse,
  PatchStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchStreamRequest,
  output: PatchStreamResponse,
  errors: [StreamNotFound],
}));

export interface DeleteStreamRequest {
  streamId: string;
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: Delete stream forcefully, including deleting any dependent pipelines. */
  force?: string;
}

export const DeleteStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  streamId: Schema.String.pipe(T.HttpPath("streamId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  force: Schema.optional(Schema.String).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/pipelines/v1/streams/{streamId}",
  }),
) as unknown as Schema.Schema<DeleteStreamRequest>;

export type DeleteStreamResponse = unknown;

export const DeleteStreamResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteStreamResponse>;

export type DeleteStreamError = DefaultErrors | PipelineNotExists;

export const deleteStream: API.OperationMethod<
  DeleteStreamRequest,
  DeleteStreamResponse,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteStreamRequest,
  output: DeleteStreamResponse,
  errors: [PipelineNotExists],
}));

// =============================================================================
// V1Pipeline
// =============================================================================

export interface GetV1PipelineRequest {
  pipelineId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetV1PipelineRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pipelineId: Schema.String.pipe(T.HttpPath("pipelineId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/pipelines/{pipelineId}",
  }),
) as unknown as Schema.Schema<GetV1PipelineRequest>;

export interface GetV1PipelineResponse {
  /** Indicates a unique identifier for this pipeline. */
  id: string;
  createdAt: string;
  modifiedAt: string;
  /** Indicates the name of the Pipeline. */
  name: string;
  /** Specifies SQL for the Pipeline processing flow. */
  sql: string;
  /** Indicates the current status of the Pipeline. */
  status: string;
  /** List of streams and sinks used by this pipeline. */
  tables: {
    id: string;
    latest: number;
    name: string;
    type: "stream" | "sink";
    version: number;
  }[];
}

export const GetV1PipelineResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  sql: Schema.String,
  status: Schema.String,
  tables: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      latest: Schema.Number,
      name: Schema.String,
      type: Schema.Literals(["stream", "sink"]),
      version: Schema.Number,
    }),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      sql: "sql",
      status: "status",
      tables: "tables",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetV1PipelineResponse>;

export type GetV1PipelineError = DefaultErrors;

export const getV1Pipeline: API.OperationMethod<
  GetV1PipelineRequest,
  GetV1PipelineResponse,
  GetV1PipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetV1PipelineRequest,
  output: GetV1PipelineResponse,
  errors: [],
}));

export interface ListV1PipelineRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
}

export const ListV1PipelineRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/pipelines",
  }),
) as unknown as Schema.Schema<ListV1PipelineRequest>;

export interface ListV1PipelineResponse {
  result: {
    id: string;
    createdAt: string;
    modifiedAt: string;
    name: string;
    sql: string;
    status: string;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListV1PipelineResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        createdAt: Schema.String,
        modifiedAt: Schema.String,
        name: Schema.String,
        sql: Schema.String,
        status: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdAt: "created_at",
          modifiedAt: "modified_at",
          name: "name",
          sql: "sql",
          status: "status",
        }),
      ),
    ),
    resultInfo: Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        page: "page",
        perPage: "per_page",
        totalCount: "total_count",
      }),
    ),
  },
).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListV1PipelineResponse>;

export type ListV1PipelineError = DefaultErrors;

export const listV1Pipeline: API.PaginatedOperationMethod<
  ListV1PipelineRequest,
  ListV1PipelineResponse,
  ListV1PipelineError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListV1PipelineRequest,
  ) => stream.Stream<
    ListV1PipelineResponse,
    ListV1PipelineError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListV1PipelineRequest) => stream.Stream<
    {
      id: string;
      createdAt: string;
      modifiedAt: string;
      name: string;
      sql: string;
      status: string;
    },
    ListV1PipelineError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListV1PipelineRequest,
  output: ListV1PipelineResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateV1PipelineRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: Specifies the name of the Pipeline. */
  name: string;
  /** Body param: Specifies SQL for the Pipeline processing flow. */
  sql: string;
}

export const CreateV1PipelineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    sql: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/pipelines/v1/pipelines",
    }),
  ) as unknown as Schema.Schema<CreateV1PipelineRequest>;

export interface CreateV1PipelineResponse {
  /** Indicates a unique identifier for this pipeline. */
  id: string;
  createdAt: string;
  modifiedAt: string;
  /** Indicates the name of the Pipeline. */
  name: string;
  /** Specifies SQL for the Pipeline processing flow. */
  sql: string;
  /** Indicates the current status of the Pipeline. */
  status: string;
}

export const CreateV1PipelineResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    modifiedAt: Schema.String,
    name: Schema.String,
    sql: Schema.String,
    status: Schema.String,
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        modifiedAt: "modified_at",
        name: "name",
        sql: "sql",
        status: "status",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateV1PipelineResponse>;

export type CreateV1PipelineError = DefaultErrors;

export const createV1Pipeline: API.OperationMethod<
  CreateV1PipelineRequest,
  CreateV1PipelineResponse,
  CreateV1PipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateV1PipelineRequest,
  output: CreateV1PipelineResponse,
  errors: [],
}));

export interface DeleteV1PipelineRequest {
  pipelineId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const DeleteV1PipelineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pipelineId: Schema.String.pipe(T.HttpPath("pipelineId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/pipelines/v1/pipelines/{pipelineId}",
    }),
  ) as unknown as Schema.Schema<DeleteV1PipelineRequest>;

export type DeleteV1PipelineResponse = unknown;

export const DeleteV1PipelineResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteV1PipelineResponse>;

export type DeleteV1PipelineError = DefaultErrors;

export const deleteV1Pipeline: API.OperationMethod<
  DeleteV1PipelineRequest,
  DeleteV1PipelineResponse,
  DeleteV1PipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteV1PipelineRequest,
  output: DeleteV1PipelineResponse,
  errors: [],
}));
