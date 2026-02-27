/**
 * Cloudflare PIPELINES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service pipelines
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// Pipeline
// =============================================================================

export interface GetPipelineRequest {
  pipelineName: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetPipelineRequest = Schema.Struct({
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
  };
  /** Indicates the endpoint URL to send traffic. */
  endpoint: string;
  /** Defines the name of the pipeline. */
  name: string;
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean;
        cors?: { origins?: string[] };
      }
    | { format: "json"; type: string }
  )[];
  /** Indicates the version number of last saved configuration. */
  version: number;
}

export const GetPipelineResponse = Schema.Struct({
  id: Schema.String,
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
  }),
  endpoint: Schema.String,
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
  version: Schema.Number,
}) as unknown as Schema.Schema<GetPipelineResponse>;

export type GetPipelineError = CommonErrors;

export const getPipeline: API.OperationMethod<
  GetPipelineRequest,
  GetPipelineResponse,
  GetPipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPipelineRequest,
  output: GetPipelineResponse,
  errors: [],
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

export const ListPipelinesRequest = Schema.Struct({
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
    };
    endpoint: string;
    name: string;
    source: (
      | {
          format: "json";
          type: string;
          authentication?: boolean;
          cors?: { origins?: string[] };
        }
      | { format: "json"; type: string }
    )[];
    version: number;
  }[];
  /** Indicates whether the API call was successful. */
  success: boolean;
}

export const ListPipelinesResponse = Schema.Struct({
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
      }),
      endpoint: Schema.String,
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

export type ListPipelinesError = CommonErrors;

export const listPipelines: API.OperationMethod<
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListPipelinesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreatePipelineRequest = Schema.Struct({
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
  };
  /** Indicates the endpoint URL to send traffic. */
  endpoint: string;
  /** Defines the name of the pipeline. */
  name: string;
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean;
        cors?: { origins?: string[] };
      }
    | { format: "json"; type: string }
  )[];
  /** Indicates the version number of last saved configuration. */
  version: number;
}

export const CreatePipelineResponse = Schema.Struct({
  id: Schema.String,
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
  }),
  endpoint: Schema.String,
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
  version: Schema.Number,
}) as unknown as Schema.Schema<CreatePipelineResponse>;

export type CreatePipelineError = CommonErrors;

export const createPipeline: API.OperationMethod<
  CreatePipelineRequest,
  CreatePipelineResponse,
  CreatePipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdatePipelineRequest = Schema.Struct({
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
  };
  /** Indicates the endpoint URL to send traffic. */
  endpoint: string;
  /** Defines the name of the pipeline. */
  name: string;
  source: (
    | {
        format: "json";
        type: string;
        authentication?: boolean;
        cors?: { origins?: string[] };
      }
    | { format: "json"; type: string }
  )[];
  /** Indicates the version number of last saved configuration. */
  version: number;
}

export const UpdatePipelineResponse = Schema.Struct({
  id: Schema.String,
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
  }),
  endpoint: Schema.String,
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
  version: Schema.Number,
}) as unknown as Schema.Schema<UpdatePipelineResponse>;

export type UpdatePipelineError = CommonErrors;

export const updatePipeline: API.OperationMethod<
  UpdatePipelineRequest,
  UpdatePipelineResponse,
  UpdatePipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePipelineRequest,
  output: UpdatePipelineResponse,
  errors: [],
}));

export interface DeletePipelineRequest {
  pipelineName: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const DeletePipelineRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DeletePipelineResponse>;

export type DeletePipelineError = CommonErrors;

export const deletePipeline: API.OperationMethod<
  DeletePipelineRequest,
  DeletePipelineResponse,
  DeletePipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePipelineRequest,
  output: DeletePipelineResponse,
  errors: [],
}));

// =============================================================================
// Sink
// =============================================================================

export interface GetSinkRequest {
  sinkId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetSinkRequest = Schema.Struct({
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

export const GetSinkResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  modifiedAt: Schema.String,
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
) as unknown as Schema.Schema<GetSinkResponse>;

export type GetSinkError = CommonErrors;

export const getSink: API.OperationMethod<
  GetSinkRequest,
  GetSinkResponse,
  GetSinkError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSinkRequest,
  output: GetSinkResponse,
  errors: [],
}));

export interface ListSinksRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: */
  pipelineId?: string;
}

export const ListSinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pipelineId: Schema.optional(Schema.String).pipe(T.HttpQuery("pipeline_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pipelines/v1/sinks" }),
) as unknown as Schema.Schema<ListSinksRequest>;

export type ListSinksResponse = {
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
}[];

export const ListSinksResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    modifiedAt: Schema.String,
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
) as unknown as Schema.Schema<ListSinksResponse>;

export type ListSinksError = CommonErrors;

export const listSinks: API.OperationMethod<
  ListSinksRequest,
  ListSinksResponse,
  ListSinksError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSinksRequest,
  output: ListSinksResponse,
  errors: [],
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

export const CreateSinkRequest = Schema.Struct({
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

export const CreateSinkResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  modifiedAt: Schema.String,
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
) as unknown as Schema.Schema<CreateSinkResponse>;

export type CreateSinkError = CommonErrors;

export const createSink: API.OperationMethod<
  CreateSinkRequest,
  CreateSinkResponse,
  CreateSinkError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteSinkRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DeleteSinkResponse>;

export type DeleteSinkError = CommonErrors;

export const deleteSink: API.OperationMethod<
  DeleteSinkRequest,
  DeleteSinkResponse,
  DeleteSinkError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ValidateSqlPipelineRequest = Schema.Struct({
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
  };
}

export const ValidateSqlPipelineResponse = Schema.Struct({
  tables: Schema.Struct({}),
  graph: Schema.optional(
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
  ),
}) as unknown as Schema.Schema<ValidateSqlPipelineResponse>;

export type ValidateSqlPipelineError = CommonErrors;

export const validateSqlPipeline: API.OperationMethod<
  ValidateSqlPipelineRequest,
  ValidateSqlPipelineResponse,
  ValidateSqlPipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ValidateSqlPipelineRequest,
  output: ValidateSqlPipelineResponse,
  errors: [],
}));

// =============================================================================
// Stream
// =============================================================================

export interface GetStreamRequest {
  streamId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetStreamRequest = Schema.Struct({
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
    cors?: { origins?: string[] };
  };
  modifiedAt: string;
  /** Indicates the name of the Stream. */
  name: string;
  /** Indicates the current version of this stream. */
  version: number;
  workerBinding: { enabled: boolean };
  /** Indicates the endpoint URL of this stream. */
  endpoint?: string;
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

export const GetStreamResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  http: Schema.Struct({
    authentication: Schema.Boolean,
    enabled: Schema.Boolean,
    cors: Schema.optional(
      Schema.Struct({
        origins: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  }),
  modifiedAt: Schema.String,
  name: Schema.String,
  version: Schema.Number,
  workerBinding: Schema.Struct({
    enabled: Schema.Boolean,
  }),
  endpoint: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<GetStreamResponse>;

export type GetStreamError = CommonErrors;

export const getStream: API.OperationMethod<
  GetStreamRequest,
  GetStreamResponse,
  GetStreamError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetStreamRequest,
  output: GetStreamResponse,
  errors: [],
}));

export interface ListStreamsRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: Specifies the public ID of the pipeline. */
  pipelineId?: string;
}

export const ListStreamsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pipelineId: Schema.optional(Schema.String).pipe(T.HttpQuery("pipeline_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/streams",
  }),
) as unknown as Schema.Schema<ListStreamsRequest>;

export type ListStreamsResponse = {
  id: string;
  createdAt: string;
  http: {
    authentication: boolean;
    enabled: boolean;
    cors?: { origins?: string[] };
  };
  modifiedAt: string;
  name: string;
  version: number;
  workerBinding: { enabled: boolean };
  endpoint?: string;
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
}[];

export const ListStreamsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    http: Schema.Struct({
      authentication: Schema.Boolean,
      enabled: Schema.Boolean,
      cors: Schema.optional(
        Schema.Struct({
          origins: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
    modifiedAt: Schema.String,
    name: Schema.String,
    version: Schema.Number,
    workerBinding: Schema.Struct({
      enabled: Schema.Boolean,
    }),
    endpoint: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListStreamsResponse>;

export type ListStreamsError = CommonErrors;

export const listStreams: API.OperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListStreamsRequest,
  output: ListStreamsResponse,
  errors: [],
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

export const CreateStreamRequest = Schema.Struct({
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
    cors?: { origins?: string[] };
  };
  modifiedAt: string;
  /** Indicates the name of the Stream. */
  name: string;
  /** Indicates the current version of this stream. */
  version: number;
  workerBinding: { enabled: boolean };
  /** Indicates the endpoint URL of this stream. */
  endpoint?: string;
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

export const CreateStreamResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  http: Schema.Struct({
    authentication: Schema.Boolean,
    enabled: Schema.Boolean,
    cors: Schema.optional(
      Schema.Struct({
        origins: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  }),
  modifiedAt: Schema.String,
  name: Schema.String,
  version: Schema.Number,
  workerBinding: Schema.Struct({
    enabled: Schema.Boolean,
  }),
  endpoint: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<CreateStreamResponse>;

export type CreateStreamError = CommonErrors;

export const createStream: API.OperationMethod<
  CreateStreamRequest,
  CreateStreamResponse,
  CreateStreamError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateStreamRequest,
  output: CreateStreamResponse,
  errors: [],
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

export const PatchStreamRequest = Schema.Struct({
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
    cors?: { origins?: string[] };
  };
  modifiedAt: string;
  /** Indicates the name of the Stream. */
  name: string;
  /** Indicates the current version of this stream. */
  version: number;
  workerBinding: { enabled: boolean };
  /** Indicates the endpoint URL of this stream. */
  endpoint?: string;
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
}

export const PatchStreamResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  http: Schema.Struct({
    authentication: Schema.Boolean,
    enabled: Schema.Boolean,
    cors: Schema.optional(
      Schema.Struct({
        origins: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  }),
  modifiedAt: Schema.String,
  name: Schema.String,
  version: Schema.Number,
  workerBinding: Schema.Struct({
    enabled: Schema.Boolean,
  }),
  endpoint: Schema.optional(Schema.String),
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
  }),
) as unknown as Schema.Schema<PatchStreamResponse>;

export type PatchStreamError = CommonErrors;

export const patchStream: API.OperationMethod<
  PatchStreamRequest,
  PatchStreamResponse,
  PatchStreamError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchStreamRequest,
  output: PatchStreamResponse,
  errors: [],
}));

export interface DeleteStreamRequest {
  streamId: string;
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Query param: Delete stream forcefully, including deleting any dependent pipelines. */
  force?: string;
}

export const DeleteStreamRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DeleteStreamResponse>;

export type DeleteStreamError = CommonErrors;

export const deleteStream: API.OperationMethod<
  DeleteStreamRequest,
  DeleteStreamResponse,
  DeleteStreamError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteStreamRequest,
  output: DeleteStreamResponse,
  errors: [],
}));

// =============================================================================
// V1Pipeline
// =============================================================================

export interface GetV1PipelineRequest {
  pipelineId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const GetV1PipelineRequest = Schema.Struct({
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

export const GetV1PipelineResponse = Schema.Struct({
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
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdAt: "created_at",
    modifiedAt: "modified_at",
    name: "name",
    sql: "sql",
    status: "status",
    tables: "tables",
  }),
) as unknown as Schema.Schema<GetV1PipelineResponse>;

export type GetV1PipelineError = CommonErrors;

export const getV1Pipeline: API.OperationMethod<
  GetV1PipelineRequest,
  GetV1PipelineResponse,
  GetV1PipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetV1PipelineRequest,
  output: GetV1PipelineResponse,
  errors: [],
}));

export interface ListV1PipelineRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
}

export const ListV1PipelineRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pipelines/v1/pipelines",
  }),
) as unknown as Schema.Schema<ListV1PipelineRequest>;

export type ListV1PipelineResponse = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  sql: string;
  status: string;
}[];

export const ListV1PipelineResponse = Schema.Array(
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
) as unknown as Schema.Schema<ListV1PipelineResponse>;

export type ListV1PipelineError = CommonErrors;

export const listV1Pipeline: API.OperationMethod<
  ListV1PipelineRequest,
  ListV1PipelineResponse,
  ListV1PipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListV1PipelineRequest,
  output: ListV1PipelineResponse,
  errors: [],
}));

export interface CreateV1PipelineRequest {
  /** Path param: Specifies the public ID of the account. */
  accountId: string;
  /** Body param: Specifies the name of the Pipeline. */
  name: string;
  /** Body param: Specifies SQL for the Pipeline processing flow. */
  sql: string;
}

export const CreateV1PipelineRequest = Schema.Struct({
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

export const CreateV1PipelineResponse = Schema.Struct({
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
) as unknown as Schema.Schema<CreateV1PipelineResponse>;

export type CreateV1PipelineError = CommonErrors;

export const createV1Pipeline: API.OperationMethod<
  CreateV1PipelineRequest,
  CreateV1PipelineResponse,
  CreateV1PipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateV1PipelineRequest,
  output: CreateV1PipelineResponse,
  errors: [],
}));

export interface DeleteV1PipelineRequest {
  pipelineId: string;
  /** Specifies the public ID of the account. */
  accountId: string;
}

export const DeleteV1PipelineRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DeleteV1PipelineResponse>;

export type DeleteV1PipelineError = CommonErrors;

export const deleteV1Pipeline: API.OperationMethod<
  DeleteV1PipelineRequest,
  DeleteV1PipelineResponse,
  DeleteV1PipelineError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteV1PipelineRequest,
  output: DeleteV1PipelineResponse,
  errors: [],
}));
