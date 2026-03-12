/**
 * Cloudflare WORKERS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service workers
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";
import { UploadableSchema } from "../schemas.ts";

// =============================================================================
// Errors
// =============================================================================

export class ContentTypeRequired extends Schema.TaggedErrorClass<ContentTypeRequired>()(
  "ContentTypeRequired",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ContentTypeRequired, [{ code: 10001 }]);

export class DeploymentNotFound extends Schema.TaggedErrorClass<DeploymentNotFound>()(
  "DeploymentNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(DeploymentNotFound, [{ code: 10336 }]);

export class DomainNotFound extends Schema.TaggedErrorClass<DomainNotFound>()(
  "DomainNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(DomainNotFound, [{ code: 100114 }]);

export class InvalidRoute extends Schema.TaggedErrorClass<InvalidRoute>()(
  "InvalidRoute",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoute, [{ code: 7003 }]);

export class InvalidRoutePattern extends Schema.TaggedErrorClass<InvalidRoutePattern>()(
  "InvalidRoutePattern",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoutePattern, [{ code: 10022 }]);

export class InvalidWorkerScript extends Schema.TaggedErrorClass<InvalidWorkerScript>()(
  "InvalidWorkerScript",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidWorkerScript, [{ code: 10068 }]);

export class RouteNotFound extends Schema.TaggedErrorClass<RouteNotFound>()(
  "RouteNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(RouteNotFound, [{ code: 10009 }]);

export class SecretNotFound extends Schema.TaggedErrorClass<SecretNotFound>()(
  "SecretNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(SecretNotFound, [{ code: 10056 }]);

export class VersionNotFound extends Schema.TaggedErrorClass<VersionNotFound>()(
  "VersionNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(VersionNotFound, [{ code: 100146 }]);

export class WorkerNotFound extends Schema.TaggedErrorClass<WorkerNotFound>()(
  "WorkerNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WorkerNotFound, [{ code: 10007 }, { code: 10013 }]);

// =============================================================================
// AccountSetting
// =============================================================================

export interface GetAccountSettingRequest {
  /** Identifier. */
  accountId: string;
}

export const GetAccountSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/account-settings",
    }),
  ) as unknown as Schema.Schema<GetAccountSettingRequest>;

export interface GetAccountSettingResponse {
  defaultUsageModel?: string | null;
  greenCompute?: boolean | null;
}

export const GetAccountSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    defaultUsageModel: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    greenCompute: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        defaultUsageModel: "default_usage_model",
        greenCompute: "green_compute",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetAccountSettingResponse>;

export type GetAccountSettingError = DefaultErrors | InvalidRoute;

export const getAccountSetting: API.OperationMethod<
  GetAccountSettingRequest,
  GetAccountSettingResponse,
  GetAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountSettingRequest,
  output: GetAccountSettingResponse,
  errors: [InvalidRoute],
}));

export interface PutAccountSettingRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  defaultUsageModel?: string;
  /** Body param: */
  greenCompute?: boolean;
}

export const PutAccountSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    defaultUsageModel: Schema.optional(Schema.String),
    greenCompute: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      defaultUsageModel: "default_usage_model",
      greenCompute: "green_compute",
    }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/workers/account-settings",
    }),
  ) as unknown as Schema.Schema<PutAccountSettingRequest>;

export interface PutAccountSettingResponse {
  defaultUsageModel?: string | null;
  greenCompute?: boolean | null;
}

export const PutAccountSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    defaultUsageModel: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    greenCompute: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        defaultUsageModel: "default_usage_model",
        greenCompute: "green_compute",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PutAccountSettingResponse>;

export type PutAccountSettingError = DefaultErrors | InvalidRoute;

export const putAccountSetting: API.OperationMethod<
  PutAccountSettingRequest,
  PutAccountSettingResponse,
  PutAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutAccountSettingRequest,
  output: PutAccountSettingResponse,
  errors: [InvalidRoute],
}));

// =============================================================================
// AssetUpload
// =============================================================================

export interface CreateAssetUploadRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Whether the file contents are base64-encoded. Must be `true`. */
  base64: true;
  /** Body param: */
  body: Record<string, unknown>;
}

export const CreateAssetUploadRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    base64: Schema.Literal(true).pipe(T.HttpQuery("base64")),
    body: Schema.Struct({}).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/assets/upload",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<CreateAssetUploadRequest>;

export interface CreateAssetUploadResponse {
  /** A "completion" JWT which can be redeemed when creating a Worker version. */
  jwt?: string | null;
}

export const CreateAssetUploadResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jwt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateAssetUploadResponse>;

export type CreateAssetUploadError = DefaultErrors | InvalidRoute;

export const createAssetUpload: API.OperationMethod<
  CreateAssetUploadRequest,
  CreateAssetUploadResponse,
  CreateAssetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAssetUploadRequest,
  output: CreateAssetUploadResponse,
  errors: [InvalidRoute],
}));

// =============================================================================
// BetaWorker
// =============================================================================

export interface GetBetaWorkerRequest {
  workerId: string;
  /** Identifier. */
  accountId: string;
}

export const GetBetaWorkerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workerId: Schema.String.pipe(T.HttpPath("workerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/workers/{workerId}",
  }),
) as unknown as Schema.Schema<GetBetaWorkerRequest>;

export interface GetBetaWorkerResponse {
  /** ID of the referencing Worker. */
  id: string;
  /** Name of the referencing Worker. */
  name: string;
}

export const GetBetaWorkerResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  name: Schema.String,
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetBetaWorkerResponse>;

export type GetBetaWorkerError = DefaultErrors | WorkerNotFound | InvalidRoute;

export const getBetaWorker: API.OperationMethod<
  GetBetaWorkerRequest,
  GetBetaWorkerResponse,
  GetBetaWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBetaWorkerRequest,
  output: GetBetaWorkerResponse,
  errors: [WorkerNotFound, InvalidRoute],
}));

export interface ListBetaWorkersRequest {
  /** Path param: Identifier. */
  accountId: string;
}

export const ListBetaWorkersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/workers" }),
) as unknown as Schema.Schema<ListBetaWorkersRequest>;

export interface ListBetaWorkersResponse {
  result: { id: string; name: string }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListBetaWorkersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
      }),
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
  ) as unknown as Schema.Schema<ListBetaWorkersResponse>;

export type ListBetaWorkersError = DefaultErrors | InvalidRoute;

export const listBetaWorkers: API.PaginatedOperationMethod<
  ListBetaWorkersRequest,
  ListBetaWorkersResponse,
  ListBetaWorkersError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListBetaWorkersRequest,
  ) => stream.Stream<
    ListBetaWorkersResponse,
    ListBetaWorkersError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListBetaWorkersRequest,
  ) => stream.Stream<
    { id: string; name: string },
    ListBetaWorkersError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBetaWorkersRequest,
  output: ListBetaWorkersResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateBetaWorkerRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Name of the Worker. */
  name: string;
  /** Body param: Whether logpush is enabled for the Worker. */
  logpush?: boolean;
  /** Body param: Observability settings for the Worker. */
  observability?: {
    enabled?: boolean;
    headSamplingRate?: number;
    logs?: {
      enabled?: boolean;
      headSamplingRate?: number;
      invocationLogs?: boolean;
    };
  };
  /** Body param: Subdomain settings for the Worker. */
  subdomain?: { enabled?: boolean; previewsEnabled?: boolean };
  /** Body param: Tags associated with the Worker. */
  tags?: string[];
  /** Body param: Other Workers that should consume logs from the Worker. */
  tailConsumers?: { name: string }[];
}

export const CreateBetaWorkerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    logpush: Schema.optional(Schema.Boolean),
    observability: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        headSamplingRate: Schema.optional(Schema.Number),
        logs: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
            headSamplingRate: Schema.optional(Schema.Number),
            invocationLogs: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              headSamplingRate: "head_sampling_rate",
              invocationLogs: "invocation_logs",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          headSamplingRate: "head_sampling_rate",
          logs: "logs",
        }),
      ),
    ),
    subdomain: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        previewsEnabled: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          previewsEnabled: "previews_enabled",
        }),
      ),
    ),
    tags: Schema.optional(Schema.Array(Schema.String)),
    tailConsumers: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.String,
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      name: "name",
      logpush: "logpush",
      observability: "observability",
      subdomain: "subdomain",
      tags: "tags",
      tailConsumers: "tail_consumers",
    }),
    T.Http({ method: "POST", path: "/accounts/{account_id}/workers/workers" }),
  ) as unknown as Schema.Schema<CreateBetaWorkerRequest>;

export interface CreateBetaWorkerResponse {
  /** ID of the referencing Worker. */
  id: string;
  /** Name of the referencing Worker. */
  name: string;
}

export const CreateBetaWorkerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    name: Schema.String,
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateBetaWorkerResponse>;

export type CreateBetaWorkerError = DefaultErrors | InvalidRoute;

export const createBetaWorker: API.OperationMethod<
  CreateBetaWorkerRequest,
  CreateBetaWorkerResponse,
  CreateBetaWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBetaWorkerRequest,
  output: CreateBetaWorkerResponse,
  errors: [InvalidRoute],
}));

export interface UpdateBetaWorkerRequest {
  workerId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Name of the Worker. */
  name: string;
  /** Body param: Whether logpush is enabled for the Worker. */
  logpush?: boolean;
  /** Body param: Observability settings for the Worker. */
  observability?: {
    enabled?: boolean;
    headSamplingRate?: number;
    logs?: {
      enabled?: boolean;
      headSamplingRate?: number;
      invocationLogs?: boolean;
    };
  };
  /** Body param: Subdomain settings for the Worker. */
  subdomain?: { enabled?: boolean; previewsEnabled?: boolean };
  /** Body param: Tags associated with the Worker. */
  tags?: string[];
  /** Body param: Other Workers that should consume logs from the Worker. */
  tailConsumers?: { name: string }[];
}

export const UpdateBetaWorkerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    logpush: Schema.optional(Schema.Boolean),
    observability: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        headSamplingRate: Schema.optional(Schema.Number),
        logs: Schema.optional(
          Schema.Struct({
            enabled: Schema.optional(Schema.Boolean),
            headSamplingRate: Schema.optional(Schema.Number),
            invocationLogs: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              headSamplingRate: "head_sampling_rate",
              invocationLogs: "invocation_logs",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          headSamplingRate: "head_sampling_rate",
          logs: "logs",
        }),
      ),
    ),
    subdomain: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        previewsEnabled: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          previewsEnabled: "previews_enabled",
        }),
      ),
    ),
    tags: Schema.optional(Schema.Array(Schema.String)),
    tailConsumers: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.String,
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      name: "name",
      logpush: "logpush",
      observability: "observability",
      subdomain: "subdomain",
      tags: "tags",
      tailConsumers: "tail_consumers",
    }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/workers/workers/{workerId}",
    }),
  ) as unknown as Schema.Schema<UpdateBetaWorkerRequest>;

export interface UpdateBetaWorkerResponse {
  /** ID of the referencing Worker. */
  id: string;
  /** Name of the referencing Worker. */
  name: string;
}

export const UpdateBetaWorkerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    name: Schema.String,
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateBetaWorkerResponse>;

export type UpdateBetaWorkerError = DefaultErrors | WorkerNotFound;

export const updateBetaWorker: API.OperationMethod<
  UpdateBetaWorkerRequest,
  UpdateBetaWorkerResponse,
  UpdateBetaWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBetaWorkerRequest,
  output: UpdateBetaWorkerResponse,
  errors: [WorkerNotFound],
}));

export interface PatchBetaWorkerRequest {
  workerId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Whether logpush is enabled for the Worker. */
  logpush: boolean;
  /** Body param: Name of the Worker. */
  name: string;
  /** Body param: Observability settings for the Worker. */
  observability: {
    enabled?: boolean;
    headSamplingRate?: number;
    logs?: {
      enabled?: boolean;
      headSamplingRate?: number;
      invocationLogs?: boolean;
    };
  };
  /** Body param: Subdomain settings for the Worker. */
  subdomain: { enabled?: boolean; previewsEnabled?: boolean };
  /** Body param: Tags associated with the Worker. */
  tags: string[];
  /** Body param: Other Workers that should consume logs from the Worker. */
  tailConsumers: { name: string }[];
}

export const PatchBetaWorkerRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    logpush: Schema.Boolean,
    name: Schema.String,
    observability: Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      headSamplingRate: Schema.optional(Schema.Number),
      logs: Schema.optional(
        Schema.Struct({
          enabled: Schema.optional(Schema.Boolean),
          headSamplingRate: Schema.optional(Schema.Number),
          invocationLogs: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            enabled: "enabled",
            headSamplingRate: "head_sampling_rate",
            invocationLogs: "invocation_logs",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        headSamplingRate: "head_sampling_rate",
        logs: "logs",
      }),
    ),
    subdomain: Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      previewsEnabled: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        previewsEnabled: "previews_enabled",
      }),
    ),
    tags: Schema.Array(Schema.String),
    tailConsumers: Schema.Array(
      Schema.Struct({
        name: Schema.String,
      }),
    ),
  },
).pipe(
  Schema.encodeKeys({
    logpush: "logpush",
    name: "name",
    observability: "observability",
    subdomain: "subdomain",
    tags: "tags",
    tailConsumers: "tail_consumers",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/workers/workers/{workerId}",
  }),
) as unknown as Schema.Schema<PatchBetaWorkerRequest>;

export interface PatchBetaWorkerResponse {
  /** ID of the referencing Worker. */
  id: string;
  /** Name of the referencing Worker. */
  name: string;
}

export const PatchBetaWorkerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    name: Schema.String,
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchBetaWorkerResponse>;

export type PatchBetaWorkerError = DefaultErrors | WorkerNotFound;

export const patchBetaWorker: API.OperationMethod<
  PatchBetaWorkerRequest,
  PatchBetaWorkerResponse,
  PatchBetaWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchBetaWorkerRequest,
  output: PatchBetaWorkerResponse,
  errors: [WorkerNotFound],
}));

export interface DeleteBetaWorkerRequest {
  workerId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteBetaWorkerRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/workers/workers/{workerId}",
    }),
  ) as unknown as Schema.Schema<DeleteBetaWorkerRequest>;

export interface DeleteBetaWorkerResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteBetaWorkerResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteBetaWorkerResponse>;

export type DeleteBetaWorkerError = DefaultErrors | WorkerNotFound;

export const deleteBetaWorker: API.OperationMethod<
  DeleteBetaWorkerRequest,
  DeleteBetaWorkerResponse,
  DeleteBetaWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBetaWorkerRequest,
  output: DeleteBetaWorkerResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// BetaWorkerVersion
// =============================================================================

export interface GetBetaWorkerVersionRequest {
  workerId: string;
  versionId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Whether to include the `modules` property of the version in the response, which contains code and sourcemap content and may add several megabytes to the response size. */
  include?: "modules";
}

export const GetBetaWorkerVersionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    versionId: Schema.String.pipe(T.HttpPath("versionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    include: Schema.optional(Schema.Literal("modules")).pipe(
      T.HttpQuery("include"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/workers/{workerId}/versions/{versionId}",
    }),
  ) as unknown as Schema.Schema<GetBetaWorkerVersionRequest>;

export interface GetBetaWorkerVersionResponse {
  /** Version identifier. */
  id: string;
  /** When the version was created. */
  createdOn: string;
  /** The integer version number, starting from one. */
  number: number;
  /** Metadata about the version. */
  annotations?: {
    workersMessage?: string | null;
    workersTag?: string | null;
    workersTriggeredBy?: string | null;
  } | null;
  /** Configuration for assets within a Worker.  [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers.cloudflare.com/workers/st */
  assets?: {
    config?: {
      htmlHandling?:
        | "auto-trailing-slash"
        | "force-trailing-slash"
        | "drop-trailing-slash"
        | "none"
        | null;
      notFoundHandling?: "none" | "404-page" | "single-page-application" | null;
      runWorkerFirst?: string[] | boolean | null;
    } | null;
    jwt?: string | null;
  } | null;
  /** List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?:
    | (
        | { name: string; type: "ai" }
        | { dataset: string; name: string; type: "analytics_engine" }
        | { name: string; type: "assets" }
        | { name: string; type: "browser" }
        | { id: string; name: string; type: "d1" }
        | { name: string; part: string; type: "data_blob" }
        | {
            name: string;
            namespace: string;
            type: "dispatch_namespace";
            outbound?: {
              params?: string[] | null;
              worker?: {
                environment?: string | null;
                service?: string | null;
              } | null;
            } | null;
          }
        | {
            name: string;
            type: "durable_object_namespace";
            className?: string | null;
            environment?: string | null;
            namespaceId?: string | null;
            scriptName?: string | null;
          }
        | { id: string; name: string; type: "hyperdrive" }
        | {
            name: string;
            type: "inherit";
            oldName?: string | null;
            versionId?: string | null;
          }
        | { name: string; type: "images" }
        | { json: string; name: string; type: "json" }
        | { name: string; namespaceId: string; type: "kv_namespace" }
        | { certificateId: string; name: string; type: "mtls_certificate" }
        | { name: string; text: string; type: "plain_text" }
        | { name: string; pipeline: string; type: "pipelines" }
        | { name: string; queueName: string; type: "queue" }
        | {
            bucketName: string;
            name: string;
            type: "r2_bucket";
            jurisdiction?: "eu" | "fedramp" | null;
          }
        | { name: string; type: "secret_text" }
        | {
            name: string;
            type: "send_email";
            allowedDestinationAddresses?: string[] | null;
            allowedSenderAddresses?: string[] | null;
            destinationAddress?: string | null;
          }
        | {
            name: string;
            service: string;
            type: "service";
            environment?: string | null;
          }
        | { name: string; part: string; type: "text_blob" }
        | { indexName: string; name: string; type: "vectorize" }
        | { name: string; type: "version_metadata" }
        | {
            name: string;
            secretName: string;
            storeId: string;
            type: "secrets_store_secret";
          }
        | {
            algorithm: unknown;
            format: "raw" | "pkcs8" | "spki" | "jwk";
            name: string;
            type: "secret_key";
            usages: (
              | "encrypt"
              | "decrypt"
              | "sign"
              | "verify"
              | "deriveKey"
              | "deriveBits"
              | "wrapKey"
              | "unwrapKey"
            )[];
          }
        | {
            name: string;
            type: "workflow";
            workflowName: string;
            className?: string | null;
            scriptName?: string | null;
          }
        | { name: string; part: string; type: "wasm_module" }
      )[]
    | null;
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string | null;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[] | null;
  /** Resource limits enforced at runtime. */
  limits?: { cpuMs: number } | null;
  /** The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler). */
  mainModule?: string | null;
  /** Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed. */
  migrations?: unknown | null;
  /** Code, sourcemaps, and other content used at runtime.  This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers. */
  modules?:
    | { contentBase64: string; contentType: string; name: string }[]
    | null;
  /** Placement settings for the version. */
  placement?: { mode?: "smart" | null } | null;
  /** The client used to create the version. */
  source?: string | null;
  /** Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time). */
  startupTimeMs?: number | null;
  /** @deprecated Usage model for the version. */
  usageModel?: "standard" | "bundled" | "unbound" | null;
}

export const GetBetaWorkerVersionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    number: Schema.Number,
    annotations: Schema.optional(
      Schema.Union([
        Schema.Struct({
          workersMessage: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          workersTag: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          workersTriggeredBy: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            workersMessage: "workers/message",
            workersTag: "workers/tag",
            workersTriggeredBy: "workers/triggered_by",
          }),
        ),
        Schema.Null,
      ]),
    ),
    assets: Schema.optional(
      Schema.Union([
        Schema.Struct({
          config: Schema.optional(
            Schema.Union([
              Schema.Struct({
                htmlHandling: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "auto-trailing-slash",
                      "force-trailing-slash",
                      "drop-trailing-slash",
                      "none",
                    ]),
                    Schema.Null,
                  ]),
                ),
                notFoundHandling: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "none",
                      "404-page",
                      "single-page-application",
                    ]),
                    Schema.Null,
                  ]),
                ),
                runWorkerFirst: Schema.optional(
                  Schema.Union([
                    Schema.Union([Schema.Array(Schema.String), Schema.Boolean]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  htmlHandling: "html_handling",
                  notFoundHandling: "not_found_handling",
                  runWorkerFirst: "run_worker_first",
                }),
              ),
              Schema.Null,
            ]),
          ),
          jwt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    bindings: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("ai"),
            }),
            Schema.Struct({
              dataset: Schema.String,
              name: Schema.String,
              type: Schema.Literal("analytics_engine"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("assets"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("browser"),
            }),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("d1"),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("data_blob"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespace: Schema.String,
              type: Schema.Literal("dispatch_namespace"),
              outbound: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    params: Schema.optional(
                      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                    ),
                    worker: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          environment: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          service: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.Null,
                      ]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("durable_object_namespace"),
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              namespaceId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                className: "class_name",
                environment: "environment",
                namespaceId: "namespace_id",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("hyperdrive"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("inherit"),
              oldName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              versionId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                oldName: "old_name",
                versionId: "version_id",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("images"),
            }),
            Schema.Struct({
              json: Schema.String,
              name: Schema.String,
              type: Schema.Literal("json"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespaceId: Schema.String,
              type: Schema.Literal("kv_namespace"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                namespaceId: "namespace_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              certificateId: Schema.String,
              name: Schema.String,
              type: Schema.Literal("mtls_certificate"),
            }).pipe(
              Schema.encodeKeys({
                certificateId: "certificate_id",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("plain_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              pipeline: Schema.String,
              type: Schema.Literal("pipelines"),
            }),
            Schema.Struct({
              name: Schema.String,
              queueName: Schema.String,
              type: Schema.Literal("queue"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                queueName: "queue_name",
                type: "type",
              }),
            ),
            Schema.Struct({
              bucketName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("r2_bucket"),
              jurisdiction: Schema.optional(
                Schema.Union([Schema.Literals(["eu", "fedramp"]), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                bucketName: "bucket_name",
                name: "name",
                type: "type",
                jurisdiction: "jurisdiction",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("secret_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("send_email"),
              allowedDestinationAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              allowedSenderAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              destinationAddress: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                allowedDestinationAddresses: "allowed_destination_addresses",
                allowedSenderAddresses: "allowed_sender_addresses",
                destinationAddress: "destination_address",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              service: Schema.String,
              type: Schema.Literal("service"),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("text_blob"),
            }),
            Schema.Struct({
              indexName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("vectorize"),
            }).pipe(
              Schema.encodeKeys({
                indexName: "index_name",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("version_metadata"),
            }),
            Schema.Struct({
              name: Schema.String,
              secretName: Schema.String,
              storeId: Schema.String,
              type: Schema.Literal("secrets_store_secret"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                secretName: "secret_name",
                storeId: "store_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              algorithm: Schema.Unknown,
              format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
              name: Schema.String,
              type: Schema.Literal("secret_key"),
              usages: Schema.Array(
                Schema.Literals([
                  "encrypt",
                  "decrypt",
                  "sign",
                  "verify",
                  "deriveKey",
                  "deriveBits",
                  "wrapKey",
                  "unwrapKey",
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("workflow"),
              workflowName: Schema.String,
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                workflowName: "workflow_name",
                className: "class_name",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("wasm_module"),
            }),
          ]),
        ),
        Schema.Null,
      ]),
    ),
    compatibilityDate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    compatibilityFlags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    limits: Schema.optional(
      Schema.Union([
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
        Schema.Null,
      ]),
    ),
    mainModule: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    migrations: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    modules: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            contentBase64: Schema.String,
            contentType: Schema.String,
            name: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              contentBase64: "content_base64",
              contentType: "content_type",
              name: "name",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    placement: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.optional(
            Schema.Union([Schema.Literal("smart"), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    source: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    startupTimeMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    usageModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["standard", "bundled", "unbound"]),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        number: "number",
        annotations: "annotations",
        assets: "assets",
        bindings: "bindings",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        limits: "limits",
        mainModule: "main_module",
        migrations: "migrations",
        modules: "modules",
        placement: "placement",
        source: "source",
        startupTimeMs: "startup_time_ms",
        usageModel: "usage_model",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetBetaWorkerVersionResponse>;

export type GetBetaWorkerVersionError = DefaultErrors | WorkerNotFound;

export const getBetaWorkerVersion: API.OperationMethod<
  GetBetaWorkerVersionRequest,
  GetBetaWorkerVersionResponse,
  GetBetaWorkerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBetaWorkerVersionRequest,
  output: GetBetaWorkerVersionResponse,
  errors: [WorkerNotFound],
}));

export interface ListBetaWorkerVersionsRequest {
  workerId: string;
  /** Path param: Identifier. */
  accountId: string;
}

export const ListBetaWorkerVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/workers/{workerId}/versions",
    }),
  ) as unknown as Schema.Schema<ListBetaWorkerVersionsRequest>;

export interface ListBetaWorkerVersionsResponse {
  result: {
    id: string;
    createdOn: string;
    number: number;
    annotations?: {
      workersMessage?: string | null;
      workersTag?: string | null;
      workersTriggeredBy?: string | null;
    } | null;
    assets?: {
      config?: {
        htmlHandling?:
          | "auto-trailing-slash"
          | "force-trailing-slash"
          | "drop-trailing-slash"
          | "none"
          | null;
        notFoundHandling?:
          | "none"
          | "404-page"
          | "single-page-application"
          | null;
        runWorkerFirst?: string[] | boolean | null;
      } | null;
      jwt?: string | null;
    } | null;
    bindings?:
      | (
          | { name: string; type: "ai" }
          | { dataset: string; name: string; type: "analytics_engine" }
          | { name: string; type: "assets" }
          | { name: string; type: "browser" }
          | { id: string; name: string; type: "d1" }
          | { name: string; part: string; type: "data_blob" }
          | {
              name: string;
              namespace: string;
              type: "dispatch_namespace";
              outbound?: {
                params?: string[] | null;
                worker?: {
                  environment?: string | null;
                  service?: string | null;
                } | null;
              } | null;
            }
          | {
              name: string;
              type: "durable_object_namespace";
              className?: string | null;
              environment?: string | null;
              namespaceId?: string | null;
              scriptName?: string | null;
            }
          | { id: string; name: string; type: "hyperdrive" }
          | {
              name: string;
              type: "inherit";
              oldName?: string | null;
              versionId?: string | null;
            }
          | { name: string; type: "images" }
          | { json: string; name: string; type: "json" }
          | { name: string; namespaceId: string; type: "kv_namespace" }
          | { certificateId: string; name: string; type: "mtls_certificate" }
          | { name: string; text: string; type: "plain_text" }
          | { name: string; pipeline: string; type: "pipelines" }
          | { name: string; queueName: string; type: "queue" }
          | {
              bucketName: string;
              name: string;
              type: "r2_bucket";
              jurisdiction?: "eu" | "fedramp" | null;
            }
          | { name: string; type: "secret_text" }
          | {
              name: string;
              type: "send_email";
              allowedDestinationAddresses?: string[] | null;
              allowedSenderAddresses?: string[] | null;
              destinationAddress?: string | null;
            }
          | {
              name: string;
              service: string;
              type: "service";
              environment?: string | null;
            }
          | { name: string; part: string; type: "text_blob" }
          | { indexName: string; name: string; type: "vectorize" }
          | { name: string; type: "version_metadata" }
          | {
              name: string;
              secretName: string;
              storeId: string;
              type: "secrets_store_secret";
            }
          | {
              algorithm: unknown;
              format: "raw" | "pkcs8" | "spki" | "jwk";
              name: string;
              type: "secret_key";
              usages: (
                | "encrypt"
                | "decrypt"
                | "sign"
                | "verify"
                | "deriveKey"
                | "deriveBits"
                | "wrapKey"
                | "unwrapKey"
              )[];
            }
          | {
              name: string;
              type: "workflow";
              workflowName: string;
              className?: string | null;
              scriptName?: string | null;
            }
          | { name: string; part: string; type: "wasm_module" }
        )[]
      | null;
    compatibilityDate?: string | null;
    compatibilityFlags?: string[] | null;
    limits?: { cpuMs: number } | null;
    mainModule?: string | null;
    migrations?: unknown | null;
    modules?:
      | { contentBase64: string; contentType: string; name: string }[]
      | null;
    placement?: { mode?: "smart" | null } | null;
    source?: string | null;
    startupTimeMs?: number | null;
    usageModel?: "standard" | "bundled" | "unbound" | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListBetaWorkerVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        createdOn: Schema.String,
        number: Schema.Number,
        annotations: Schema.optional(
          Schema.Union([
            Schema.Struct({
              workersMessage: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              workersTag: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              workersTriggeredBy: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                workersMessage: "workers/message",
                workersTag: "workers/tag",
                workersTriggeredBy: "workers/triggered_by",
              }),
            ),
            Schema.Null,
          ]),
        ),
        assets: Schema.optional(
          Schema.Union([
            Schema.Struct({
              config: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    htmlHandling: Schema.optional(
                      Schema.Union([
                        Schema.Literals([
                          "auto-trailing-slash",
                          "force-trailing-slash",
                          "drop-trailing-slash",
                          "none",
                        ]),
                        Schema.Null,
                      ]),
                    ),
                    notFoundHandling: Schema.optional(
                      Schema.Union([
                        Schema.Literals([
                          "none",
                          "404-page",
                          "single-page-application",
                        ]),
                        Schema.Null,
                      ]),
                    ),
                    runWorkerFirst: Schema.optional(
                      Schema.Union([
                        Schema.Union([
                          Schema.Array(Schema.String),
                          Schema.Boolean,
                        ]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      htmlHandling: "html_handling",
                      notFoundHandling: "not_found_handling",
                      runWorkerFirst: "run_worker_first",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              jwt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            }),
            Schema.Null,
          ]),
        ),
        bindings: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("ai"),
                }),
                Schema.Struct({
                  dataset: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("analytics_engine"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("assets"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("browser"),
                }),
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("d1"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  part: Schema.String,
                  type: Schema.Literal("data_blob"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  namespace: Schema.String,
                  type: Schema.Literal("dispatch_namespace"),
                  outbound: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        params: Schema.optional(
                          Schema.Union([
                            Schema.Array(Schema.String),
                            Schema.Null,
                          ]),
                        ),
                        worker: Schema.optional(
                          Schema.Union([
                            Schema.Struct({
                              environment: Schema.optional(
                                Schema.Union([Schema.String, Schema.Null]),
                              ),
                              service: Schema.optional(
                                Schema.Union([Schema.String, Schema.Null]),
                              ),
                            }),
                            Schema.Null,
                          ]),
                        ),
                      }),
                      Schema.Null,
                    ]),
                  ),
                }),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("durable_object_namespace"),
                  className: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  environment: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  namespaceId: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  scriptName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    type: "type",
                    className: "class_name",
                    environment: "environment",
                    namespaceId: "namespace_id",
                    scriptName: "script_name",
                  }),
                ),
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("hyperdrive"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("inherit"),
                  oldName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  versionId: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    type: "type",
                    oldName: "old_name",
                    versionId: "version_id",
                  }),
                ),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("images"),
                }),
                Schema.Struct({
                  json: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("json"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  namespaceId: Schema.String,
                  type: Schema.Literal("kv_namespace"),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    namespaceId: "namespace_id",
                    type: "type",
                  }),
                ),
                Schema.Struct({
                  certificateId: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("mtls_certificate"),
                }).pipe(
                  Schema.encodeKeys({
                    certificateId: "certificate_id",
                    name: "name",
                    type: "type",
                  }),
                ),
                Schema.Struct({
                  name: Schema.String,
                  text: Schema.String,
                  type: Schema.Literal("plain_text"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  pipeline: Schema.String,
                  type: Schema.Literal("pipelines"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  queueName: Schema.String,
                  type: Schema.Literal("queue"),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    queueName: "queue_name",
                    type: "type",
                  }),
                ),
                Schema.Struct({
                  bucketName: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("r2_bucket"),
                  jurisdiction: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["eu", "fedramp"]),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    bucketName: "bucket_name",
                    name: "name",
                    type: "type",
                    jurisdiction: "jurisdiction",
                  }),
                ),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("secret_text"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("send_email"),
                  allowedDestinationAddresses: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  allowedSenderAddresses: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  destinationAddress: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    type: "type",
                    allowedDestinationAddresses:
                      "allowed_destination_addresses",
                    allowedSenderAddresses: "allowed_sender_addresses",
                    destinationAddress: "destination_address",
                  }),
                ),
                Schema.Struct({
                  name: Schema.String,
                  service: Schema.String,
                  type: Schema.Literal("service"),
                  environment: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
                Schema.Struct({
                  name: Schema.String,
                  part: Schema.String,
                  type: Schema.Literal("text_blob"),
                }),
                Schema.Struct({
                  indexName: Schema.String,
                  name: Schema.String,
                  type: Schema.Literal("vectorize"),
                }).pipe(
                  Schema.encodeKeys({
                    indexName: "index_name",
                    name: "name",
                    type: "type",
                  }),
                ),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("version_metadata"),
                }),
                Schema.Struct({
                  name: Schema.String,
                  secretName: Schema.String,
                  storeId: Schema.String,
                  type: Schema.Literal("secrets_store_secret"),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    secretName: "secret_name",
                    storeId: "store_id",
                    type: "type",
                  }),
                ),
                Schema.Struct({
                  algorithm: Schema.Unknown,
                  format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
                  name: Schema.String,
                  type: Schema.Literal("secret_key"),
                  usages: Schema.Array(
                    Schema.Literals([
                      "encrypt",
                      "decrypt",
                      "sign",
                      "verify",
                      "deriveKey",
                      "deriveBits",
                      "wrapKey",
                      "unwrapKey",
                    ]),
                  ),
                }),
                Schema.Struct({
                  name: Schema.String,
                  type: Schema.Literal("workflow"),
                  workflowName: Schema.String,
                  className: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  scriptName: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    type: "type",
                    workflowName: "workflow_name",
                    className: "class_name",
                    scriptName: "script_name",
                  }),
                ),
                Schema.Struct({
                  name: Schema.String,
                  part: Schema.String,
                  type: Schema.Literal("wasm_module"),
                }),
              ]),
            ),
            Schema.Null,
          ]),
        ),
        compatibilityDate: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        compatibilityFlags: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        limits: Schema.optional(
          Schema.Union([
            Schema.Struct({
              cpuMs: Schema.Number,
            }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
            Schema.Null,
          ]),
        ),
        mainModule: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        migrations: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        modules: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                contentBase64: Schema.String,
                contentType: Schema.String,
                name: Schema.String,
              }).pipe(
                Schema.encodeKeys({
                  contentBase64: "content_base64",
                  contentType: "content_type",
                  name: "name",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        placement: Schema.optional(
          Schema.Union([
            Schema.Struct({
              mode: Schema.optional(
                Schema.Union([Schema.Literal("smart"), Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        source: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        startupTimeMs: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        usageModel: Schema.optional(
          Schema.Union([
            Schema.Literals(["standard", "bundled", "unbound"]),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdOn: "created_on",
          number: "number",
          annotations: "annotations",
          assets: "assets",
          bindings: "bindings",
          compatibilityDate: "compatibility_date",
          compatibilityFlags: "compatibility_flags",
          limits: "limits",
          mainModule: "main_module",
          migrations: "migrations",
          modules: "modules",
          placement: "placement",
          source: "source",
          startupTimeMs: "startup_time_ms",
          usageModel: "usage_model",
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
  ) as unknown as Schema.Schema<ListBetaWorkerVersionsResponse>;

export type ListBetaWorkerVersionsError = DefaultErrors | WorkerNotFound;

export const listBetaWorkerVersions: API.PaginatedOperationMethod<
  ListBetaWorkerVersionsRequest,
  ListBetaWorkerVersionsResponse,
  ListBetaWorkerVersionsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListBetaWorkerVersionsRequest,
  ) => stream.Stream<
    ListBetaWorkerVersionsResponse,
    ListBetaWorkerVersionsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListBetaWorkerVersionsRequest,
  ) => stream.Stream<
    {
      id: string;
      createdOn: string;
      number: number;
      annotations?: {
        workersMessage?: string | null;
        workersTag?: string | null;
        workersTriggeredBy?: string | null;
      } | null;
      assets?: {
        config?: {
          htmlHandling?:
            | "auto-trailing-slash"
            | "force-trailing-slash"
            | "drop-trailing-slash"
            | "none"
            | null;
          notFoundHandling?:
            | "none"
            | "404-page"
            | "single-page-application"
            | null;
          runWorkerFirst?: string[] | boolean | null;
        } | null;
        jwt?: string | null;
      } | null;
      bindings?:
        | (
            | { name: string; type: "ai" }
            | { dataset: string; name: string; type: "analytics_engine" }
            | { name: string; type: "assets" }
            | { name: string; type: "browser" }
            | { id: string; name: string; type: "d1" }
            | { name: string; part: string; type: "data_blob" }
            | {
                name: string;
                namespace: string;
                type: "dispatch_namespace";
                outbound?: {
                  params?: string[] | null;
                  worker?: {
                    environment?: string | null;
                    service?: string | null;
                  } | null;
                } | null;
              }
            | {
                name: string;
                type: "durable_object_namespace";
                className?: string | null;
                environment?: string | null;
                namespaceId?: string | null;
                scriptName?: string | null;
              }
            | { id: string; name: string; type: "hyperdrive" }
            | {
                name: string;
                type: "inherit";
                oldName?: string | null;
                versionId?: string | null;
              }
            | { name: string; type: "images" }
            | { json: string; name: string; type: "json" }
            | { name: string; namespaceId: string; type: "kv_namespace" }
            | { certificateId: string; name: string; type: "mtls_certificate" }
            | { name: string; text: string; type: "plain_text" }
            | { name: string; pipeline: string; type: "pipelines" }
            | { name: string; queueName: string; type: "queue" }
            | {
                bucketName: string;
                name: string;
                type: "r2_bucket";
                jurisdiction?: "eu" | "fedramp" | null;
              }
            | { name: string; type: "secret_text" }
            | {
                name: string;
                type: "send_email";
                allowedDestinationAddresses?: string[] | null;
                allowedSenderAddresses?: string[] | null;
                destinationAddress?: string | null;
              }
            | {
                name: string;
                service: string;
                type: "service";
                environment?: string | null;
              }
            | { name: string; part: string; type: "text_blob" }
            | { indexName: string; name: string; type: "vectorize" }
            | { name: string; type: "version_metadata" }
            | {
                name: string;
                secretName: string;
                storeId: string;
                type: "secrets_store_secret";
              }
            | {
                algorithm: unknown;
                format: "raw" | "pkcs8" | "spki" | "jwk";
                name: string;
                type: "secret_key";
                usages: (
                  | "encrypt"
                  | "decrypt"
                  | "sign"
                  | "verify"
                  | "deriveKey"
                  | "deriveBits"
                  | "wrapKey"
                  | "unwrapKey"
                )[];
              }
            | {
                name: string;
                type: "workflow";
                workflowName: string;
                className?: string | null;
                scriptName?: string | null;
              }
            | { name: string; part: string; type: "wasm_module" }
          )[]
        | null;
      compatibilityDate?: string | null;
      compatibilityFlags?: string[] | null;
      limits?: { cpuMs: number } | null;
      mainModule?: string | null;
      migrations?: unknown | null;
      modules?:
        | { contentBase64: string; contentType: string; name: string }[]
        | null;
      placement?: { mode?: "smart" | null } | null;
      source?: string | null;
      startupTimeMs?: number | null;
      usageModel?: "standard" | "bundled" | "unbound" | null;
    },
    ListBetaWorkerVersionsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBetaWorkerVersionsRequest,
  output: ListBetaWorkerVersionsResponse,
  errors: [WorkerNotFound],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateBetaWorkerVersionRequest {
  workerId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: If true, a deployment will be created that sends 100% of traffic to the new version. */
  deploy?: boolean;
  /** Body param: Metadata about the version. */
  annotations?: { workersMessage?: string; workersTag?: string };
  /** Body param: Configuration for assets within a Worker.  [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers.cloudflare.co */
  assets?: {
    config?: {
      htmlHandling?:
        | "auto-trailing-slash"
        | "force-trailing-slash"
        | "drop-trailing-slash"
        | "none";
      notFoundHandling?: "none" | "404-page" | "single-page-application";
      runWorkerFirst?: string[] | boolean;
    };
    jwt?: string;
  };
  /** Body param: List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?: (
    | { name: string; type: "ai" }
    | { dataset: string; name: string; type: "analytics_engine" }
    | { name: string; type: "assets" }
    | { name: string; type: "browser" }
    | { id: string; name: string; type: "d1" }
    | { name: string; part: string; type: "data_blob" }
    | {
        name: string;
        namespace: string;
        type: "dispatch_namespace";
        outbound?: {
          params?: string[];
          worker?: { environment?: string; service?: string };
        };
      }
    | {
        name: string;
        type: "durable_object_namespace";
        className?: string;
        environment?: string;
        namespaceId?: string;
        scriptName?: string;
      }
    | { id: string; name: string; type: "hyperdrive" }
    | { name: string; type: "inherit"; oldName?: string; versionId?: string }
    | { name: string; type: "images" }
    | { json: string; name: string; type: "json" }
    | { name: string; namespaceId: string; type: "kv_namespace" }
    | { certificateId: string; name: string; type: "mtls_certificate" }
    | { name: string; text: string; type: "plain_text" }
    | { name: string; pipeline: string; type: "pipelines" }
    | { name: string; queueName: string; type: "queue" }
    | {
        bucketName: string;
        name: string;
        type: "r2_bucket";
        jurisdiction?: "eu" | "fedramp";
      }
    | { name: string; text: string; type: "secret_text" }
    | {
        name: string;
        type: "send_email";
        allowedDestinationAddresses?: string[];
        allowedSenderAddresses?: string[];
        destinationAddress?: string;
      }
    | { name: string; service: string; type: "service"; environment?: string }
    | { name: string; part: string; type: "text_blob" }
    | { indexName: string; name: string; type: "vectorize" }
    | { name: string; type: "version_metadata" }
    | {
        name: string;
        secretName: string;
        storeId: string;
        type: "secrets_store_secret";
      }
    | {
        algorithm: unknown;
        format: "raw" | "pkcs8" | "spki" | "jwk";
        name: string;
        type: "secret_key";
        usages: (
          | "encrypt"
          | "decrypt"
          | "sign"
          | "verify"
          | "deriveKey"
          | "deriveBits"
          | "wrapKey"
          | "unwrapKey"
        )[];
        keyBase64?: string;
        keyJwk?: unknown;
      }
    | {
        name: string;
        type: "workflow";
        workflowName: string;
        className?: string;
        scriptName?: string;
      }
    | { name: string; part: string; type: "wasm_module" }
  )[];
  /** Body param: Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string;
  /** Body param: Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[];
  /** Body param: Resource limits enforced at runtime. */
  limits?: { cpuMs: number };
  /** Body param: The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler). */
  mainModule?: string;
  /** Body param: Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed. */
  migrations?:
    | unknown
    | { newTag?: string; oldTag?: string; steps?: unknown[] };
  /** Body param: Code, sourcemaps, and other content used at runtime.  This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https:/ */
  modules?: { contentBase64: string; contentType: string; name: string }[];
  /** Body param: Placement settings for the version. */
  placement?: { mode?: "smart" };
  /** @deprecated Body param: Usage model for the version. */
  usageModel?: "standard" | "bundled" | "unbound";
}

export const CreateBetaWorkerVersionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    deploy: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deploy")),
    annotations: Schema.optional(
      Schema.Struct({
        workersMessage: Schema.optional(Schema.String),
        workersTag: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          workersMessage: "workers/message",
          workersTag: "workers/tag",
        }),
      ),
    ),
    assets: Schema.optional(
      Schema.Struct({
        config: Schema.optional(
          Schema.Struct({
            htmlHandling: Schema.optional(
              Schema.Literals([
                "auto-trailing-slash",
                "force-trailing-slash",
                "drop-trailing-slash",
                "none",
              ]),
            ),
            notFoundHandling: Schema.optional(
              Schema.Literals(["none", "404-page", "single-page-application"]),
            ),
            runWorkerFirst: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Boolean]),
            ),
          }).pipe(
            Schema.encodeKeys({
              htmlHandling: "html_handling",
              notFoundHandling: "not_found_handling",
              runWorkerFirst: "run_worker_first",
            }),
          ),
        ),
        jwt: Schema.optional(Schema.String),
      }),
    ),
    bindings: Schema.optional(
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("ai"),
          }),
          Schema.Struct({
            dataset: Schema.String,
            name: Schema.String,
            type: Schema.Literal("analytics_engine"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("assets"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("browser"),
          }),
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            type: Schema.Literal("d1"),
          }),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("data_blob"),
          }),
          Schema.Struct({
            name: Schema.String,
            namespace: Schema.String,
            type: Schema.Literal("dispatch_namespace"),
            outbound: Schema.optional(
              Schema.Struct({
                params: Schema.optional(Schema.Array(Schema.String)),
                worker: Schema.optional(
                  Schema.Struct({
                    environment: Schema.optional(Schema.String),
                    service: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("durable_object_namespace"),
            className: Schema.optional(Schema.String),
            environment: Schema.optional(Schema.String),
            namespaceId: Schema.optional(Schema.String),
            scriptName: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              className: "class_name",
              environment: "environment",
              namespaceId: "namespace_id",
              scriptName: "script_name",
            }),
          ),
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            type: Schema.Literal("hyperdrive"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("inherit"),
            oldName: Schema.optional(Schema.String),
            versionId: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              oldName: "old_name",
              versionId: "version_id",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("images"),
          }),
          Schema.Struct({
            json: Schema.String,
            name: Schema.String,
            type: Schema.Literal("json"),
          }),
          Schema.Struct({
            name: Schema.String,
            namespaceId: Schema.String,
            type: Schema.Literal("kv_namespace"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              namespaceId: "namespace_id",
              type: "type",
            }),
          ),
          Schema.Struct({
            certificateId: Schema.String,
            name: Schema.String,
            type: Schema.Literal("mtls_certificate"),
          }).pipe(
            Schema.encodeKeys({
              certificateId: "certificate_id",
              name: "name",
              type: "type",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            text: Schema.String,
            type: Schema.Literal("plain_text"),
          }),
          Schema.Struct({
            name: Schema.String,
            pipeline: Schema.String,
            type: Schema.Literal("pipelines"),
          }),
          Schema.Struct({
            name: Schema.String,
            queueName: Schema.String,
            type: Schema.Literal("queue"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              queueName: "queue_name",
              type: "type",
            }),
          ),
          Schema.Struct({
            bucketName: Schema.String,
            name: Schema.String,
            type: Schema.Literal("r2_bucket"),
            jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
          }).pipe(
            Schema.encodeKeys({
              bucketName: "bucket_name",
              name: "name",
              type: "type",
              jurisdiction: "jurisdiction",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            text: Schema.String,
            type: Schema.Literal("secret_text"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("send_email"),
            allowedDestinationAddresses: Schema.optional(
              Schema.Array(Schema.String),
            ),
            allowedSenderAddresses: Schema.optional(
              Schema.Array(Schema.String),
            ),
            destinationAddress: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              allowedDestinationAddresses: "allowed_destination_addresses",
              allowedSenderAddresses: "allowed_sender_addresses",
              destinationAddress: "destination_address",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            service: Schema.String,
            type: Schema.Literal("service"),
            environment: Schema.optional(Schema.String),
          }),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("text_blob"),
          }),
          Schema.Struct({
            indexName: Schema.String,
            name: Schema.String,
            type: Schema.Literal("vectorize"),
          }).pipe(
            Schema.encodeKeys({
              indexName: "index_name",
              name: "name",
              type: "type",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("version_metadata"),
          }),
          Schema.Struct({
            name: Schema.String,
            secretName: Schema.String,
            storeId: Schema.String,
            type: Schema.Literal("secrets_store_secret"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              secretName: "secret_name",
              storeId: "store_id",
              type: "type",
            }),
          ),
          Schema.Struct({
            algorithm: Schema.Unknown,
            format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
            name: Schema.String,
            type: Schema.Literal("secret_key"),
            usages: Schema.Array(
              Schema.Literals([
                "encrypt",
                "decrypt",
                "sign",
                "verify",
                "deriveKey",
                "deriveBits",
                "wrapKey",
                "unwrapKey",
              ]),
            ),
            keyBase64: Schema.optional(Schema.String),
            keyJwk: Schema.optional(Schema.Unknown),
          }).pipe(
            Schema.encodeKeys({
              algorithm: "algorithm",
              format: "format",
              name: "name",
              type: "type",
              usages: "usages",
              keyBase64: "key_base64",
              keyJwk: "key_jwk",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("workflow"),
            workflowName: Schema.String,
            className: Schema.optional(Schema.String),
            scriptName: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              workflowName: "workflow_name",
              className: "class_name",
              scriptName: "script_name",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("wasm_module"),
          }),
        ]),
      ),
    ),
    compatibilityDate: Schema.optional(Schema.String),
    compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
    limits: Schema.optional(
      Schema.Struct({
        cpuMs: Schema.Number,
      }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
    ),
    mainModule: Schema.optional(Schema.String),
    migrations: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          newTag: Schema.optional(Schema.String),
          oldTag: Schema.optional(Schema.String),
          steps: Schema.optional(Schema.Array(Schema.Unknown)),
        }).pipe(
          Schema.encodeKeys({
            newTag: "new_tag",
            oldTag: "old_tag",
            steps: "steps",
          }),
        ),
      ]),
    ),
    modules: Schema.optional(
      Schema.Array(
        Schema.Struct({
          contentBase64: Schema.String,
          contentType: Schema.String,
          name: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            contentBase64: "content_base64",
            contentType: "content_type",
            name: "name",
          }),
        ),
      ),
    ),
    placement: Schema.optional(
      Schema.Struct({
        mode: Schema.optional(Schema.Literal("smart")),
      }),
    ),
    usageModel: Schema.optional(
      Schema.Literals(["standard", "bundled", "unbound"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      annotations: "annotations",
      assets: "assets",
      bindings: "bindings",
      compatibilityDate: "compatibility_date",
      compatibilityFlags: "compatibility_flags",
      limits: "limits",
      mainModule: "main_module",
      migrations: "migrations",
      modules: "modules",
      placement: "placement",
      usageModel: "usage_model",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/workers/{workerId}/versions",
    }),
  ) as unknown as Schema.Schema<CreateBetaWorkerVersionRequest>;

export interface CreateBetaWorkerVersionResponse {
  /** Version identifier. */
  id: string;
  /** When the version was created. */
  createdOn: string;
  /** The integer version number, starting from one. */
  number: number;
  /** Metadata about the version. */
  annotations?: {
    workersMessage?: string | null;
    workersTag?: string | null;
    workersTriggeredBy?: string | null;
  } | null;
  /** Configuration for assets within a Worker.  [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers.cloudflare.com/workers/st */
  assets?: {
    config?: {
      htmlHandling?:
        | "auto-trailing-slash"
        | "force-trailing-slash"
        | "drop-trailing-slash"
        | "none"
        | null;
      notFoundHandling?: "none" | "404-page" | "single-page-application" | null;
      runWorkerFirst?: string[] | boolean | null;
    } | null;
    jwt?: string | null;
  } | null;
  /** List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?:
    | (
        | { name: string; type: "ai" }
        | { dataset: string; name: string; type: "analytics_engine" }
        | { name: string; type: "assets" }
        | { name: string; type: "browser" }
        | { id: string; name: string; type: "d1" }
        | { name: string; part: string; type: "data_blob" }
        | {
            name: string;
            namespace: string;
            type: "dispatch_namespace";
            outbound?: {
              params?: string[] | null;
              worker?: {
                environment?: string | null;
                service?: string | null;
              } | null;
            } | null;
          }
        | {
            name: string;
            type: "durable_object_namespace";
            className?: string | null;
            environment?: string | null;
            namespaceId?: string | null;
            scriptName?: string | null;
          }
        | { id: string; name: string; type: "hyperdrive" }
        | {
            name: string;
            type: "inherit";
            oldName?: string | null;
            versionId?: string | null;
          }
        | { name: string; type: "images" }
        | { json: string; name: string; type: "json" }
        | { name: string; namespaceId: string; type: "kv_namespace" }
        | { certificateId: string; name: string; type: "mtls_certificate" }
        | { name: string; text: string; type: "plain_text" }
        | { name: string; pipeline: string; type: "pipelines" }
        | { name: string; queueName: string; type: "queue" }
        | {
            bucketName: string;
            name: string;
            type: "r2_bucket";
            jurisdiction?: "eu" | "fedramp" | null;
          }
        | { name: string; type: "secret_text" }
        | {
            name: string;
            type: "send_email";
            allowedDestinationAddresses?: string[] | null;
            allowedSenderAddresses?: string[] | null;
            destinationAddress?: string | null;
          }
        | {
            name: string;
            service: string;
            type: "service";
            environment?: string | null;
          }
        | { name: string; part: string; type: "text_blob" }
        | { indexName: string; name: string; type: "vectorize" }
        | { name: string; type: "version_metadata" }
        | {
            name: string;
            secretName: string;
            storeId: string;
            type: "secrets_store_secret";
          }
        | {
            algorithm: unknown;
            format: "raw" | "pkcs8" | "spki" | "jwk";
            name: string;
            type: "secret_key";
            usages: (
              | "encrypt"
              | "decrypt"
              | "sign"
              | "verify"
              | "deriveKey"
              | "deriveBits"
              | "wrapKey"
              | "unwrapKey"
            )[];
          }
        | {
            name: string;
            type: "workflow";
            workflowName: string;
            className?: string | null;
            scriptName?: string | null;
          }
        | { name: string; part: string; type: "wasm_module" }
      )[]
    | null;
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string | null;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[] | null;
  /** Resource limits enforced at runtime. */
  limits?: { cpuMs: number } | null;
  /** The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler). */
  mainModule?: string | null;
  /** Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed. */
  migrations?: unknown | null;
  /** Code, sourcemaps, and other content used at runtime.  This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers. */
  modules?:
    | { contentBase64: string; contentType: string; name: string }[]
    | null;
  /** Placement settings for the version. */
  placement?: { mode?: "smart" | null } | null;
  /** The client used to create the version. */
  source?: string | null;
  /** Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time). */
  startupTimeMs?: number | null;
  /** @deprecated Usage model for the version. */
  usageModel?: "standard" | "bundled" | "unbound" | null;
}

export const CreateBetaWorkerVersionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    number: Schema.Number,
    annotations: Schema.optional(
      Schema.Union([
        Schema.Struct({
          workersMessage: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          workersTag: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          workersTriggeredBy: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            workersMessage: "workers/message",
            workersTag: "workers/tag",
            workersTriggeredBy: "workers/triggered_by",
          }),
        ),
        Schema.Null,
      ]),
    ),
    assets: Schema.optional(
      Schema.Union([
        Schema.Struct({
          config: Schema.optional(
            Schema.Union([
              Schema.Struct({
                htmlHandling: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "auto-trailing-slash",
                      "force-trailing-slash",
                      "drop-trailing-slash",
                      "none",
                    ]),
                    Schema.Null,
                  ]),
                ),
                notFoundHandling: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "none",
                      "404-page",
                      "single-page-application",
                    ]),
                    Schema.Null,
                  ]),
                ),
                runWorkerFirst: Schema.optional(
                  Schema.Union([
                    Schema.Union([Schema.Array(Schema.String), Schema.Boolean]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  htmlHandling: "html_handling",
                  notFoundHandling: "not_found_handling",
                  runWorkerFirst: "run_worker_first",
                }),
              ),
              Schema.Null,
            ]),
          ),
          jwt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    bindings: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("ai"),
            }),
            Schema.Struct({
              dataset: Schema.String,
              name: Schema.String,
              type: Schema.Literal("analytics_engine"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("assets"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("browser"),
            }),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("d1"),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("data_blob"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespace: Schema.String,
              type: Schema.Literal("dispatch_namespace"),
              outbound: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    params: Schema.optional(
                      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                    ),
                    worker: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          environment: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          service: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.Null,
                      ]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("durable_object_namespace"),
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              namespaceId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                className: "class_name",
                environment: "environment",
                namespaceId: "namespace_id",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("hyperdrive"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("inherit"),
              oldName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              versionId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                oldName: "old_name",
                versionId: "version_id",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("images"),
            }),
            Schema.Struct({
              json: Schema.String,
              name: Schema.String,
              type: Schema.Literal("json"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespaceId: Schema.String,
              type: Schema.Literal("kv_namespace"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                namespaceId: "namespace_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              certificateId: Schema.String,
              name: Schema.String,
              type: Schema.Literal("mtls_certificate"),
            }).pipe(
              Schema.encodeKeys({
                certificateId: "certificate_id",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("plain_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              pipeline: Schema.String,
              type: Schema.Literal("pipelines"),
            }),
            Schema.Struct({
              name: Schema.String,
              queueName: Schema.String,
              type: Schema.Literal("queue"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                queueName: "queue_name",
                type: "type",
              }),
            ),
            Schema.Struct({
              bucketName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("r2_bucket"),
              jurisdiction: Schema.optional(
                Schema.Union([Schema.Literals(["eu", "fedramp"]), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                bucketName: "bucket_name",
                name: "name",
                type: "type",
                jurisdiction: "jurisdiction",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("secret_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("send_email"),
              allowedDestinationAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              allowedSenderAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              destinationAddress: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                allowedDestinationAddresses: "allowed_destination_addresses",
                allowedSenderAddresses: "allowed_sender_addresses",
                destinationAddress: "destination_address",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              service: Schema.String,
              type: Schema.Literal("service"),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("text_blob"),
            }),
            Schema.Struct({
              indexName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("vectorize"),
            }).pipe(
              Schema.encodeKeys({
                indexName: "index_name",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("version_metadata"),
            }),
            Schema.Struct({
              name: Schema.String,
              secretName: Schema.String,
              storeId: Schema.String,
              type: Schema.Literal("secrets_store_secret"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                secretName: "secret_name",
                storeId: "store_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              algorithm: Schema.Unknown,
              format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
              name: Schema.String,
              type: Schema.Literal("secret_key"),
              usages: Schema.Array(
                Schema.Literals([
                  "encrypt",
                  "decrypt",
                  "sign",
                  "verify",
                  "deriveKey",
                  "deriveBits",
                  "wrapKey",
                  "unwrapKey",
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("workflow"),
              workflowName: Schema.String,
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                workflowName: "workflow_name",
                className: "class_name",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("wasm_module"),
            }),
          ]),
        ),
        Schema.Null,
      ]),
    ),
    compatibilityDate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    compatibilityFlags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    limits: Schema.optional(
      Schema.Union([
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
        Schema.Null,
      ]),
    ),
    mainModule: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    migrations: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    modules: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            contentBase64: Schema.String,
            contentType: Schema.String,
            name: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              contentBase64: "content_base64",
              contentType: "content_type",
              name: "name",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    placement: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.optional(
            Schema.Union([Schema.Literal("smart"), Schema.Null]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    source: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    startupTimeMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    usageModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["standard", "bundled", "unbound"]),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        number: "number",
        annotations: "annotations",
        assets: "assets",
        bindings: "bindings",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        limits: "limits",
        mainModule: "main_module",
        migrations: "migrations",
        modules: "modules",
        placement: "placement",
        source: "source",
        startupTimeMs: "startup_time_ms",
        usageModel: "usage_model",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateBetaWorkerVersionResponse>;

export type CreateBetaWorkerVersionError = DefaultErrors | WorkerNotFound;

export const createBetaWorkerVersion: API.OperationMethod<
  CreateBetaWorkerVersionRequest,
  CreateBetaWorkerVersionResponse,
  CreateBetaWorkerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBetaWorkerVersionRequest,
  output: CreateBetaWorkerVersionResponse,
  errors: [WorkerNotFound],
}));

export interface DeleteBetaWorkerVersionRequest {
  workerId: string;
  versionId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteBetaWorkerVersionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workerId: Schema.String.pipe(T.HttpPath("workerId")),
    versionId: Schema.String.pipe(T.HttpPath("versionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/workers/workers/{workerId}/versions/{versionId}",
    }),
  ) as unknown as Schema.Schema<DeleteBetaWorkerVersionRequest>;

export interface DeleteBetaWorkerVersionResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteBetaWorkerVersionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteBetaWorkerVersionResponse>;

export type DeleteBetaWorkerVersionError = DefaultErrors | WorkerNotFound;

export const deleteBetaWorkerVersion: API.OperationMethod<
  DeleteBetaWorkerVersionRequest,
  DeleteBetaWorkerVersionResponse,
  DeleteBetaWorkerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBetaWorkerVersionRequest,
  output: DeleteBetaWorkerVersionResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// Domain
// =============================================================================

export interface GetDomainRequest {
  domainId: string;
  /** Identifer of the account. */
  accountId: string;
}

export const GetDomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  domainId: Schema.String.pipe(T.HttpPath("domainId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/domains/{domainId}",
  }),
) as unknown as Schema.Schema<GetDomainRequest>;

export interface GetDomainResponse {
  /** Identifer of the Worker Domain. */
  id?: string | null;
  /** @deprecated Worker environment associated with the zone and hostname. */
  environment?: string | null;
  /** Hostname of the Worker Domain. */
  hostname?: string | null;
  /** Worker service associated with the zone and hostname. */
  service?: string | null;
  /** Identifier of the zone. */
  zoneId?: string | null;
  /** Name of the zone. */
  zoneName?: string | null;
}

export const GetDomainResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  environment: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  service: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      environment: "environment",
      hostname: "hostname",
      service: "service",
      zoneId: "zone_id",
      zoneName: "zone_name",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetDomainResponse>;

export type GetDomainError = DefaultErrors | DomainNotFound | InvalidRoute;

export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResponse,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainRequest,
  output: GetDomainResponse,
  errors: [DomainNotFound, InvalidRoute],
}));

export interface ListDomainsRequest {
  /** Path param: Identifer of the account. */
  accountId: string;
  /** Query param: Worker environment associated with the zone and hostname. */
  environment?: string;
  /** Query param: Hostname of the Worker Domain. */
  hostname?: string;
  /** Query param: Worker service associated with the zone and hostname. */
  service?: string;
  /** Query param: Identifier of the zone. */
  zoneId?: string;
  /** Query param: Name of the zone. */
  zoneName?: string;
}

export const ListDomainsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  environment: Schema.optional(Schema.String).pipe(T.HttpQuery("environment")),
  hostname: Schema.optional(Schema.String).pipe(T.HttpQuery("hostname")),
  service: Schema.optional(Schema.String).pipe(T.HttpQuery("service")),
  zoneId: Schema.optional(Schema.String).pipe(T.HttpQuery("zone_id")),
  zoneName: Schema.optional(Schema.String).pipe(T.HttpQuery("zone_name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/domains" }),
) as unknown as Schema.Schema<ListDomainsRequest>;

export interface ListDomainsResponse {
  result: {
    id?: string | null;
    environment?: string | null;
    hostname?: string | null;
    service?: string | null;
    zoneId?: string | null;
    zoneName?: string | null;
  }[];
}

export const ListDomainsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      environment: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      service: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        environment: "environment",
        hostname: "hostname",
        service: "service",
        zoneId: "zone_id",
        zoneName: "zone_name",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListDomainsResponse>;

export type ListDomainsError = DefaultErrors | InvalidRoute;

export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListDomainsRequest,
  ) => stream.Stream<
    ListDomainsResponse,
    ListDomainsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListDomainsRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      environment?: string | null;
      hostname?: string | null;
      service?: string | null;
      zoneId?: string | null;
      zoneName?: string | null;
    },
    ListDomainsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface PutDomainRequest {
  /** Path param: Identifer of the account. */
  accountId: string;
  /** Body param: Hostname of the Worker Domain. */
  hostname: string;
  /** Body param: Worker service associated with the zone and hostname. */
  service: string;
  /** Body param: Identifier of the zone. */
  zoneId: string;
  /** @deprecated Body param: Worker environment associated with the zone and hostname. */
  environment?: string;
}

export const PutDomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  hostname: Schema.String,
  service: Schema.String,
  zoneId: Schema.String,
  environment: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    hostname: "hostname",
    service: "service",
    zoneId: "zone_id",
    environment: "environment",
  }),
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/domains" }),
) as unknown as Schema.Schema<PutDomainRequest>;

export interface PutDomainResponse {
  /** Identifer of the Worker Domain. */
  id?: string | null;
  /** @deprecated Worker environment associated with the zone and hostname. */
  environment?: string | null;
  /** Hostname of the Worker Domain. */
  hostname?: string | null;
  /** Worker service associated with the zone and hostname. */
  service?: string | null;
  /** Identifier of the zone. */
  zoneId?: string | null;
  /** Name of the zone. */
  zoneName?: string | null;
}

export const PutDomainResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  environment: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  service: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      environment: "environment",
      hostname: "hostname",
      service: "service",
      zoneId: "zone_id",
      zoneName: "zone_name",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutDomainResponse>;

export type PutDomainError = DefaultErrors | WorkerNotFound | InvalidRoute;

export const putDomain: API.OperationMethod<
  PutDomainRequest,
  PutDomainResponse,
  PutDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutDomainRequest,
  output: PutDomainResponse,
  errors: [WorkerNotFound, InvalidRoute],
}));

export interface DeleteDomainRequest {
  domainId: string;
  /** Identifer of the account. */
  accountId: string;
}

export const DeleteDomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  domainId: Schema.String.pipe(T.HttpPath("domainId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/domains/{domainId}",
  }),
) as unknown as Schema.Schema<DeleteDomainRequest>;

export type DeleteDomainResponse = unknown;

export const DeleteDomainResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteDomainResponse>;

export type DeleteDomainError = DefaultErrors | DomainNotFound;

export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [DomainNotFound],
}));

// =============================================================================
// ObservabilityTelemetry
// =============================================================================

export interface KeysObservabilityTelemetryRequest {
  /** Path param: Your Cloudflare account ID. */
  accountId: string;
  /** Body param: */
  datasets?: string[];
  /** Body param: */
  filters?: {
    key: string;
    operation:
      | "includes"
      | "not_includes"
      | "starts_with"
      | "regex"
      | "exists"
      | "is_null"
      | "in"
      | "not_in"
      | "eq"
      | "neq"
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "="
      | "!="
      | ">"
      | ">="
      | "<"
      | "<="
      | "INCLUDES"
      | "DOES_NOT_INCLUDE"
      | "MATCH_REGEX"
      | "EXISTS"
      | "DOES_NOT_EXIST"
      | "IN"
      | "NOT_IN"
      | "STARTS_WITH";
    type: "string" | "number" | "boolean";
    value?: string | number | boolean;
  }[];
  /** Body param: */
  from?: number;
  /** Body param: Search for a specific substring in the keys. */
  keyNeedle?: {
    value: string | number | boolean;
    isRegex?: boolean;
    matchCase?: boolean;
  };
  /** Body param: */
  limit?: number;
  /** Body param: Search for a specific substring in any of the events */
  needle?: {
    value: string | number | boolean;
    isRegex?: boolean;
    matchCase?: boolean;
  };
  /** Body param: */
  to?: number;
}

export const KeysObservabilityTelemetryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasets: Schema.optional(Schema.Array(Schema.String)),
    filters: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.String,
          operation: Schema.Literals([
            "includes",
            "not_includes",
            "starts_with",
            "regex",
            "exists",
            "is_null",
            "in",
            "not_in",
            "eq",
            "neq",
            "gt",
            "gte",
            "lt",
            "lte",
            "=",
            "!=",
            ">",
            ">=",
            "<",
            "<=",
            "INCLUDES",
            "DOES_NOT_INCLUDE",
            "MATCH_REGEX",
            "EXISTS",
            "DOES_NOT_EXIST",
            "IN",
            "NOT_IN",
            "STARTS_WITH",
          ]),
          type: Schema.Literals(["string", "number", "boolean"]),
          value: Schema.optional(
            Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
          ),
        }),
      ),
    ),
    from: Schema.optional(Schema.Number),
    keyNeedle: Schema.optional(
      Schema.Struct({
        value: Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
        isRegex: Schema.optional(Schema.Boolean),
        matchCase: Schema.optional(Schema.Boolean),
      }),
    ),
    limit: Schema.optional(Schema.Number),
    needle: Schema.optional(
      Schema.Struct({
        value: Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
        isRegex: Schema.optional(Schema.Boolean),
        matchCase: Schema.optional(Schema.Boolean),
      }),
    ),
    to: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/observability/telemetry/keys",
    }),
  ) as unknown as Schema.Schema<KeysObservabilityTelemetryRequest>;

export interface KeysObservabilityTelemetryResponse {
  result: {
    key: string;
    lastSeenAt: number;
    type: "string" | "boolean" | "number";
  }[];
}

export const KeysObservabilityTelemetryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        key: Schema.String,
        lastSeenAt: Schema.Number,
        type: Schema.Literals(["string", "boolean", "number"]),
      }),
    ),
  }) as unknown as Schema.Schema<KeysObservabilityTelemetryResponse>;

export type KeysObservabilityTelemetryError = DefaultErrors | InvalidRoute;

export const keysObservabilityTelemetry: API.PaginatedOperationMethod<
  KeysObservabilityTelemetryRequest,
  KeysObservabilityTelemetryResponse,
  KeysObservabilityTelemetryError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: KeysObservabilityTelemetryRequest,
  ) => stream.Stream<
    KeysObservabilityTelemetryResponse,
    KeysObservabilityTelemetryError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: KeysObservabilityTelemetryRequest,
  ) => stream.Stream<
    { key: string; lastSeenAt: number; type: "string" | "boolean" | "number" },
    KeysObservabilityTelemetryError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: KeysObservabilityTelemetryRequest,
  output: KeysObservabilityTelemetryResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface QueryObservabilityTelemetryRequest {
  /** Path param: Your Cloudflare account ID. */
  accountId: string;
  /** Body param: Unique identifier for the query to execute */
  queryId: string;
  /** Body param: Time range for the query execution */
  timeframe: { from: number; to: number };
  /** Body param: Whether to include timeseties data in the response */
  chart?: boolean;
  /** Body param: Whether to include comparison data with previous time periods */
  compare?: boolean;
  /** Body param: Whether to perform a dry run without saving the results of the query. Useful for validation */
  dry?: boolean;
  /** Body param: Time granularity for aggregating results (in milliseconds). Controls the bucketing of time-series data */
  granularity?: number;
  /** Body param: Whether to ignore time-series data in the results and return only aggregated values */
  ignoreSeries?: boolean;
  /** Body param: Maximum number of events to return. */
  limit?: number;
  /** Body param: Cursor for pagination to retrieve the next set of results */
  offset?: string;
  /** Body param: Number of events to skip for pagination. Used in conjunction with offset */
  offsetBy?: number;
  /** Body param: Direction for offset-based pagination (e.g., 'next', 'prev') */
  offsetDirection?: string;
  /** Body param: Optional parameters to pass to the query execution */
  parameters?: {
    calculations?: {
      operator:
        | "uniq"
        | "count"
        | "max"
        | "min"
        | "sum"
        | "avg"
        | "median"
        | "p001"
        | "p01"
        | "p05"
        | "p10"
        | "p25"
        | "p75"
        | "p90"
        | "p95"
        | "p99"
        | "p999"
        | "stddev"
        | "variance"
        | "COUNT_DISTINCT"
        | "COUNT"
        | "MAX"
        | "MIN"
        | "SUM"
        | "AVG"
        | "MEDIAN"
        | "P001"
        | "P01"
        | "P05"
        | "P10"
        | "P25"
        | "P75"
        | "P90"
        | "P95"
        | "P99"
        | "P999"
        | "STDDEV"
        | "VARIANCE";
      alias?: string;
      key?: string;
      keyType?: "string" | "number" | "boolean";
    }[];
    datasets?: string[];
    filterCombination?: "and" | "or" | "AND" | "OR";
    filters?: {
      key: string;
      operation:
        | "includes"
        | "not_includes"
        | "starts_with"
        | "regex"
        | "exists"
        | "is_null"
        | "in"
        | "not_in"
        | "eq"
        | "neq"
        | "gt"
        | "gte"
        | "lt"
        | "lte"
        | "="
        | "!="
        | ">"
        | ">="
        | "<"
        | "<="
        | "INCLUDES"
        | "DOES_NOT_INCLUDE"
        | "MATCH_REGEX"
        | "EXISTS"
        | "DOES_NOT_EXIST"
        | "IN"
        | "NOT_IN"
        | "STARTS_WITH";
      type: "string" | "number" | "boolean";
      value?: string | number | boolean;
    }[];
    groupBys?: { type: "string" | "number" | "boolean"; value: string }[];
    havings?: {
      key: string;
      operation: "eq" | "neq" | "gt" | "gte" | "lt" | "lte";
      value: number;
    }[];
    limit?: number;
    needle?: {
      value: string | number | boolean;
      isRegex?: boolean;
      matchCase?: boolean;
    };
    orderBy?: { value: string; order?: "asc" | "desc" };
  };
  /** Body param: Type of pattern to search for when using pattern-based views */
  patternType?: "message" | "error";
  /** Body param: View type for presenting the query results. */
  view?:
    | "traces"
    | "events"
    | "calculations"
    | "invocations"
    | "requests"
    | "patterns";
}

export const QueryObservabilityTelemetryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    queryId: Schema.String,
    timeframe: Schema.Struct({
      from: Schema.Number,
      to: Schema.Number,
    }),
    chart: Schema.optional(Schema.Boolean),
    compare: Schema.optional(Schema.Boolean),
    dry: Schema.optional(Schema.Boolean),
    granularity: Schema.optional(Schema.Number),
    ignoreSeries: Schema.optional(Schema.Boolean),
    limit: Schema.optional(Schema.Number),
    offset: Schema.optional(Schema.String),
    offsetBy: Schema.optional(Schema.Number),
    offsetDirection: Schema.optional(Schema.String),
    parameters: Schema.optional(
      Schema.Struct({
        calculations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              operator: Schema.Literals([
                "uniq",
                "count",
                "max",
                "min",
                "sum",
                "avg",
                "median",
                "p001",
                "p01",
                "p05",
                "p10",
                "p25",
                "p75",
                "p90",
                "p95",
                "p99",
                "p999",
                "stddev",
                "variance",
                "COUNT_DISTINCT",
                "COUNT",
                "MAX",
                "MIN",
                "SUM",
                "AVG",
                "MEDIAN",
                "P001",
                "P01",
                "P05",
                "P10",
                "P25",
                "P75",
                "P90",
                "P95",
                "P99",
                "P999",
                "STDDEV",
                "VARIANCE",
              ]),
              alias: Schema.optional(Schema.String),
              key: Schema.optional(Schema.String),
              keyType: Schema.optional(
                Schema.Literals(["string", "number", "boolean"]),
              ),
            }),
          ),
        ),
        datasets: Schema.optional(Schema.Array(Schema.String)),
        filterCombination: Schema.optional(
          Schema.Literals(["and", "or", "AND", "OR"]),
        ),
        filters: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              operation: Schema.Literals([
                "includes",
                "not_includes",
                "starts_with",
                "regex",
                "exists",
                "is_null",
                "in",
                "not_in",
                "eq",
                "neq",
                "gt",
                "gte",
                "lt",
                "lte",
                "=",
                "!=",
                ">",
                ">=",
                "<",
                "<=",
                "INCLUDES",
                "DOES_NOT_INCLUDE",
                "MATCH_REGEX",
                "EXISTS",
                "DOES_NOT_EXIST",
                "IN",
                "NOT_IN",
                "STARTS_WITH",
              ]),
              type: Schema.Literals(["string", "number", "boolean"]),
              value: Schema.optional(
                Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
              ),
            }),
          ),
        ),
        groupBys: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.Literals(["string", "number", "boolean"]),
              value: Schema.String,
            }),
          ),
        ),
        havings: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.String,
              operation: Schema.Literals([
                "eq",
                "neq",
                "gt",
                "gte",
                "lt",
                "lte",
              ]),
              value: Schema.Number,
            }),
          ),
        ),
        limit: Schema.optional(Schema.Number),
        needle: Schema.optional(
          Schema.Struct({
            value: Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
            isRegex: Schema.optional(Schema.Boolean),
            matchCase: Schema.optional(Schema.Boolean),
          }),
        ),
        orderBy: Schema.optional(
          Schema.Struct({
            value: Schema.String,
            order: Schema.optional(Schema.Literals(["asc", "desc"])),
          }),
        ),
      }),
    ),
    patternType: Schema.optional(Schema.Literals(["message", "error"])),
    view: Schema.optional(
      Schema.Literals([
        "traces",
        "events",
        "calculations",
        "invocations",
        "requests",
        "patterns",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/observability/telemetry/query",
    }),
  ) as unknown as Schema.Schema<QueryObservabilityTelemetryRequest>;

export interface QueryObservabilityTelemetryResponse {
  /** A Workers Observability Query Object */
  run: {
    id: string;
    accountId: string;
    dry: boolean;
    environmentId: string;
    granularity: number;
    query: {
      id: string;
      created: string;
      description: string | null;
      environmentId: string;
      generated: boolean | null;
      name: string | null;
      parameters: {
        calculations?:
          | {
              operator:
                | "uniq"
                | "count"
                | "max"
                | "min"
                | "sum"
                | "avg"
                | "median"
                | "p001"
                | "p01"
                | "p05"
                | "p10"
                | "p25"
                | "p75"
                | "p90"
                | "p95"
                | "p99"
                | "p999"
                | "stddev"
                | "variance"
                | "COUNT_DISTINCT"
                | "COUNT"
                | "MAX"
                | "MIN"
                | "SUM"
                | "AVG"
                | "MEDIAN"
                | "P001"
                | "P01"
                | "P05"
                | "P10"
                | "P25"
                | "P75"
                | "P90"
                | "P95"
                | "P99"
                | "P999"
                | "STDDEV"
                | "VARIANCE";
              alias?: string | null;
              key?: string | null;
              keyType?: "string" | "number" | "boolean" | null;
            }[]
          | null;
        datasets?: string[] | null;
        filterCombination?: "and" | "or" | "AND" | "OR" | null;
        filters?:
          | {
              key: string;
              operation:
                | "includes"
                | "not_includes"
                | "starts_with"
                | "regex"
                | "exists"
                | "is_null"
                | "in"
                | "not_in"
                | "eq"
                | "neq"
                | "gt"
                | "gte"
                | "lt"
                | "lte"
                | "="
                | "!="
                | ">"
                | ">="
                | "<"
                | "<="
                | "INCLUDES"
                | "DOES_NOT_INCLUDE"
                | "MATCH_REGEX"
                | "EXISTS"
                | "DOES_NOT_EXIST"
                | "IN"
                | "NOT_IN"
                | "STARTS_WITH";
              type: "string" | "number" | "boolean";
              value?: string | number | boolean | null;
            }[]
          | null;
        groupBys?:
          | { type: "string" | "number" | "boolean"; value: string }[]
          | null;
        havings?:
          | {
              key: string;
              operation: "eq" | "neq" | "gt" | "gte" | "lt" | "lte";
              value: number;
            }[]
          | null;
        limit?: number | null;
        needle?: {
          value: string | number | boolean;
          isRegex?: boolean | null;
          matchCase?: boolean | null;
        } | null;
        orderBy?: { value: string; order?: "asc" | "desc" | null } | null;
      };
      updated: string;
      userId: string;
      workspaceId: string;
    };
    status: "STARTED" | "COMPLETED";
    timeframe: { from: number; to: number };
    userId: string;
    workspaceId: string;
    created?: string | null;
    statistics?: {
      bytesRead: number;
      elapsed: number;
      rowsRead: number;
      abrLevel?: number | null;
    } | null;
    updated?: string | null;
  };
  /** The statistics object contains information about query performance from the database, it does not include any network latency */
  statistics: {
    bytesRead: number;
    elapsed: number;
    rowsRead: number;
    abrLevel?: number | null;
  };
  calculations?:
    | {
        aggregates: {
          count: number;
          interval: number;
          sampleInterval: number;
          value: number;
          groups?: { key: string; value: string | number | boolean }[] | null;
        }[];
        calculation: string;
        series: {
          data: {
            count: number;
            interval: number;
            sampleInterval: number;
            value: number;
            groups?: { key: string; value: string | number | boolean }[] | null;
          }[];
          time: string;
        }[];
        alias?: string | null;
      }[]
    | null;
  compare?:
    | {
        aggregates: {
          count: number;
          interval: number;
          sampleInterval: number;
          value: number;
          groups?: { key: string; value: string | number | boolean }[] | null;
        }[];
        calculation: string;
        series: {
          data: {
            count: number;
            interval: number;
            sampleInterval: number;
            value: number;
            groups?: { key: string; value: string | number | boolean }[] | null;
          }[];
          time: string;
        }[];
        alias?: string | null;
      }[]
    | null;
  events?: {
    count?: number | null;
    events?:
      | {
          $metadata: {
            id: string;
            account?: string | null;
            cloudService?: string | null;
            coldStart?: number | null;
            cost?: number | null;
            duration?: number | null;
            endTime?: number | null;
            error?: string | null;
            errorTemplate?: string | null;
            fingerprint?: string | null;
            level?: string | null;
            message?: string | null;
            messageTemplate?: string | null;
            metricName?: string | null;
            origin?: string | null;
            parentSpanId?: string | null;
            provider?: string | null;
            region?: string | null;
            requestId?: string | null;
            service?: string | null;
            spanId?: string | null;
            spanName?: string | null;
            stackId?: string | null;
            startTime?: number | null;
            statusCode?: number | null;
            traceDuration?: number | null;
            traceId?: string | null;
            transactionName?: string | null;
            trigger?: string | null;
            type?: string | null;
            url?: string | null;
          };
          dataset: string;
          source: unknown;
          timestamp: number;
          $containers?: unknown | null;
          $workers?:
            | {
                eventType:
                  | "fetch"
                  | "scheduled"
                  | "alarm"
                  | "cron"
                  | "queue"
                  | "email"
                  | "tail"
                  | "rpc"
                  | "websocket"
                  | "unknown";
                requestId: string;
                scriptName: string;
                durableObjectId?: string | null;
                entrypoint?: string | null;
                event?: Record<string, unknown> | null;
                executionModel?: "durableObject" | "stateless" | null;
                outcome?: string | null;
                scriptVersion?: {
                  id?: string | null;
                  message?: string | null;
                  tag?: string | null;
                } | null;
                truncated?: boolean | null;
              }
            | {
                cpuTimeMs: number;
                eventType:
                  | "fetch"
                  | "scheduled"
                  | "alarm"
                  | "cron"
                  | "queue"
                  | "email"
                  | "tail"
                  | "rpc"
                  | "websocket"
                  | "unknown";
                outcome: string;
                requestId: string;
                scriptName: string;
                wallTimeMs: number;
                diagnosticsChannelEvents?:
                  | { channel: string; message: string; timestamp: number }[]
                  | null;
                dispatchNamespace?: string | null;
                durableObjectId?: string | null;
                entrypoint?: string | null;
                event?: Record<string, unknown> | null;
                executionModel?: "durableObject" | "stateless" | null;
                scriptVersion?: {
                  id?: string | null;
                  message?: string | null;
                  tag?: string | null;
                } | null;
                truncated?: boolean | null;
              }
            | null;
        }[]
      | null;
    fields?: { key: string; type: string }[] | null;
    series?:
      | {
          data: {
            count: number;
            interval: number;
            sampleInterval: number;
            value?: number | null;
            groups?: { key: string; value: string | number | boolean }[] | null;
          }[];
          time: string;
        }[]
      | null;
  } | null;
  invocations?: Record<string, unknown> | null;
  patterns?:
    | {
        count: number;
        pattern: string;
        series: {
          data: {
            count: number;
            interval: number;
            sampleInterval: number;
            value: number;
            groups?: { key: string; value: string | number | boolean }[] | null;
          };
          time: string;
        }[];
        service: string;
      }[]
    | null;
  traces?:
    | {
        rootSpanName: string;
        rootTransactionName: string;
        service: string[];
        spans: number;
        traceDurationMs: number;
        traceEndMs: number;
        traceId: string;
        traceStartMs: number;
        errors?: string[] | null;
      }[]
    | null;
}

export const QueryObservabilityTelemetryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    run: Schema.Struct({
      id: Schema.String,
      accountId: Schema.String,
      dry: Schema.Boolean,
      environmentId: Schema.String,
      granularity: Schema.Number,
      query: Schema.Struct({
        id: Schema.String,
        created: Schema.String,
        description: Schema.Union([Schema.String, Schema.Null]),
        environmentId: Schema.String,
        generated: Schema.Union([Schema.Boolean, Schema.Null]),
        name: Schema.Union([Schema.String, Schema.Null]),
        parameters: Schema.Struct({
          calculations: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  operator: Schema.Literals([
                    "uniq",
                    "count",
                    "max",
                    "min",
                    "sum",
                    "avg",
                    "median",
                    "p001",
                    "p01",
                    "p05",
                    "p10",
                    "p25",
                    "p75",
                    "p90",
                    "p95",
                    "p99",
                    "p999",
                    "stddev",
                    "variance",
                    "COUNT_DISTINCT",
                    "COUNT",
                    "MAX",
                    "MIN",
                    "SUM",
                    "AVG",
                    "MEDIAN",
                    "P001",
                    "P01",
                    "P05",
                    "P10",
                    "P25",
                    "P75",
                    "P90",
                    "P95",
                    "P99",
                    "P999",
                    "STDDEV",
                    "VARIANCE",
                  ]),
                  alias: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  key: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  keyType: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["string", "number", "boolean"]),
                      Schema.Null,
                    ]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
          datasets: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          filterCombination: Schema.optional(
            Schema.Union([
              Schema.Literals(["and", "or", "AND", "OR"]),
              Schema.Null,
            ]),
          ),
          filters: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operation: Schema.Literals([
                    "includes",
                    "not_includes",
                    "starts_with",
                    "regex",
                    "exists",
                    "is_null",
                    "in",
                    "not_in",
                    "eq",
                    "neq",
                    "gt",
                    "gte",
                    "lt",
                    "lte",
                    "=",
                    "!=",
                    ">",
                    ">=",
                    "<",
                    "<=",
                    "INCLUDES",
                    "DOES_NOT_INCLUDE",
                    "MATCH_REGEX",
                    "EXISTS",
                    "DOES_NOT_EXIST",
                    "IN",
                    "NOT_IN",
                    "STARTS_WITH",
                  ]),
                  type: Schema.Literals(["string", "number", "boolean"]),
                  value: Schema.optional(
                    Schema.Union([
                      Schema.Union([
                        Schema.String,
                        Schema.Number,
                        Schema.Boolean,
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
          groupBys: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  type: Schema.Literals(["string", "number", "boolean"]),
                  value: Schema.String,
                }),
              ),
              Schema.Null,
            ]),
          ),
          havings: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  operation: Schema.Literals([
                    "eq",
                    "neq",
                    "gt",
                    "gte",
                    "lt",
                    "lte",
                  ]),
                  value: Schema.Number,
                }),
              ),
              Schema.Null,
            ]),
          ),
          limit: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          needle: Schema.optional(
            Schema.Union([
              Schema.Struct({
                value: Schema.Union([
                  Schema.String,
                  Schema.Number,
                  Schema.Boolean,
                ]),
                isRegex: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                matchCase: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          orderBy: Schema.optional(
            Schema.Union([
              Schema.Struct({
                value: Schema.String,
                order: Schema.optional(
                  Schema.Union([Schema.Literals(["asc", "desc"]), Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }),
        updated: Schema.String,
        userId: Schema.String,
        workspaceId: Schema.String,
      }),
      status: Schema.Literals(["STARTED", "COMPLETED"]),
      timeframe: Schema.Struct({
        from: Schema.Number,
        to: Schema.Number,
      }),
      userId: Schema.String,
      workspaceId: Schema.String,
      created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      statistics: Schema.optional(
        Schema.Union([
          Schema.Struct({
            bytesRead: Schema.Number,
            elapsed: Schema.Number,
            rowsRead: Schema.Number,
            abrLevel: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              bytesRead: "bytes_read",
              elapsed: "elapsed",
              rowsRead: "rows_read",
              abrLevel: "abr_level",
            }),
          ),
          Schema.Null,
        ]),
      ),
      updated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    statistics: Schema.Struct({
      bytesRead: Schema.Number,
      elapsed: Schema.Number,
      rowsRead: Schema.Number,
      abrLevel: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        bytesRead: "bytes_read",
        elapsed: "elapsed",
        rowsRead: "rows_read",
        abrLevel: "abr_level",
      }),
    ),
    calculations: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            aggregates: Schema.Array(
              Schema.Struct({
                count: Schema.Number,
                interval: Schema.Number,
                sampleInterval: Schema.Number,
                value: Schema.Number,
                groups: Schema.optional(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        key: Schema.String,
                        value: Schema.Union([
                          Schema.String,
                          Schema.Number,
                          Schema.Boolean,
                        ]),
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }),
            ),
            calculation: Schema.String,
            series: Schema.Array(
              Schema.Struct({
                data: Schema.Array(
                  Schema.Struct({
                    count: Schema.Number,
                    interval: Schema.Number,
                    sampleInterval: Schema.Number,
                    value: Schema.Number,
                    groups: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            key: Schema.String,
                            value: Schema.Union([
                              Schema.String,
                              Schema.Number,
                              Schema.Boolean,
                            ]),
                          }),
                        ),
                        Schema.Null,
                      ]),
                    ),
                  }),
                ),
                time: Schema.String,
              }),
            ),
            alias: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    compare: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            aggregates: Schema.Array(
              Schema.Struct({
                count: Schema.Number,
                interval: Schema.Number,
                sampleInterval: Schema.Number,
                value: Schema.Number,
                groups: Schema.optional(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        key: Schema.String,
                        value: Schema.Union([
                          Schema.String,
                          Schema.Number,
                          Schema.Boolean,
                        ]),
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }),
            ),
            calculation: Schema.String,
            series: Schema.Array(
              Schema.Struct({
                data: Schema.Array(
                  Schema.Struct({
                    count: Schema.Number,
                    interval: Schema.Number,
                    sampleInterval: Schema.Number,
                    value: Schema.Number,
                    groups: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            key: Schema.String,
                            value: Schema.Union([
                              Schema.String,
                              Schema.Number,
                              Schema.Boolean,
                            ]),
                          }),
                        ),
                        Schema.Null,
                      ]),
                    ),
                  }),
                ),
                time: Schema.String,
              }),
            ),
            alias: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    events: Schema.optional(
      Schema.Union([
        Schema.Struct({
          count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          events: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  $metadata: Schema.Struct({
                    id: Schema.String,
                    account: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    cloudService: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    coldStart: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    cost: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    duration: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    endTime: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    error: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    errorTemplate: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    fingerprint: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    level: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    message: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    messageTemplate: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    metricName: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    origin: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    parentSpanId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    provider: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    region: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    requestId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    service: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    spanId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    spanName: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    stackId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    startTime: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    statusCode: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    traceDuration: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    traceId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    transactionName: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    trigger: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    type: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    url: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                  dataset: Schema.String,
                  source: Schema.Unknown,
                  timestamp: Schema.Number,
                  $containers: Schema.optional(
                    Schema.Union([Schema.Unknown, Schema.Null]),
                  ),
                  $workers: Schema.optional(
                    Schema.Union([
                      Schema.Union([
                        Schema.Struct({
                          eventType: Schema.Literals([
                            "fetch",
                            "scheduled",
                            "alarm",
                            "cron",
                            "queue",
                            "email",
                            "tail",
                            "rpc",
                            "websocket",
                            "unknown",
                          ]),
                          requestId: Schema.String,
                          scriptName: Schema.String,
                          durableObjectId: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          entrypoint: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          event: Schema.optional(
                            Schema.Union([Schema.Struct({}), Schema.Null]),
                          ),
                          executionModel: Schema.optional(
                            Schema.Union([
                              Schema.Literals(["durableObject", "stateless"]),
                              Schema.Null,
                            ]),
                          ),
                          outcome: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          scriptVersion: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                id: Schema.optional(
                                  Schema.Union([Schema.String, Schema.Null]),
                                ),
                                message: Schema.optional(
                                  Schema.Union([Schema.String, Schema.Null]),
                                ),
                                tag: Schema.optional(
                                  Schema.Union([Schema.String, Schema.Null]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          truncated: Schema.optional(
                            Schema.Union([Schema.Boolean, Schema.Null]),
                          ),
                        }),
                        Schema.Struct({
                          cpuTimeMs: Schema.Number,
                          eventType: Schema.Literals([
                            "fetch",
                            "scheduled",
                            "alarm",
                            "cron",
                            "queue",
                            "email",
                            "tail",
                            "rpc",
                            "websocket",
                            "unknown",
                          ]),
                          outcome: Schema.String,
                          requestId: Schema.String,
                          scriptName: Schema.String,
                          wallTimeMs: Schema.Number,
                          diagnosticsChannelEvents: Schema.optional(
                            Schema.Union([
                              Schema.Array(
                                Schema.Struct({
                                  channel: Schema.String,
                                  message: Schema.String,
                                  timestamp: Schema.Number,
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          dispatchNamespace: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          durableObjectId: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          entrypoint: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          event: Schema.optional(
                            Schema.Union([Schema.Struct({}), Schema.Null]),
                          ),
                          executionModel: Schema.optional(
                            Schema.Union([
                              Schema.Literals(["durableObject", "stateless"]),
                              Schema.Null,
                            ]),
                          ),
                          scriptVersion: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                id: Schema.optional(
                                  Schema.Union([Schema.String, Schema.Null]),
                                ),
                                message: Schema.optional(
                                  Schema.Union([Schema.String, Schema.Null]),
                                ),
                                tag: Schema.optional(
                                  Schema.Union([Schema.String, Schema.Null]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          truncated: Schema.optional(
                            Schema.Union([Schema.Boolean, Schema.Null]),
                          ),
                        }),
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
          fields: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  key: Schema.String,
                  type: Schema.String,
                }),
              ),
              Schema.Null,
            ]),
          ),
          series: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  data: Schema.Array(
                    Schema.Struct({
                      count: Schema.Number,
                      interval: Schema.Number,
                      sampleInterval: Schema.Number,
                      value: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      groups: Schema.optional(
                        Schema.Union([
                          Schema.Array(
                            Schema.Struct({
                              key: Schema.String,
                              value: Schema.Union([
                                Schema.String,
                                Schema.Number,
                                Schema.Boolean,
                              ]),
                            }),
                          ),
                          Schema.Null,
                        ]),
                      ),
                    }),
                  ),
                  time: Schema.String,
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    invocations: Schema.optional(
      Schema.Union([Schema.Struct({}), Schema.Null]),
    ),
    patterns: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            count: Schema.Number,
            pattern: Schema.String,
            series: Schema.Array(
              Schema.Struct({
                data: Schema.Struct({
                  count: Schema.Number,
                  interval: Schema.Number,
                  sampleInterval: Schema.Number,
                  value: Schema.Number,
                  groups: Schema.optional(
                    Schema.Union([
                      Schema.Array(
                        Schema.Struct({
                          key: Schema.String,
                          value: Schema.Union([
                            Schema.String,
                            Schema.Number,
                            Schema.Boolean,
                          ]),
                        }),
                      ),
                      Schema.Null,
                    ]),
                  ),
                }),
                time: Schema.String,
              }),
            ),
            service: Schema.String,
          }),
        ),
        Schema.Null,
      ]),
    ),
    traces: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            rootSpanName: Schema.String,
            rootTransactionName: Schema.String,
            service: Schema.Array(Schema.String),
            spans: Schema.Number,
            traceDurationMs: Schema.Number,
            traceEndMs: Schema.Number,
            traceId: Schema.String,
            traceStartMs: Schema.Number,
            errors: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<QueryObservabilityTelemetryResponse>;

export type QueryObservabilityTelemetryError = DefaultErrors | InvalidRoute;

export const queryObservabilityTelemetry: API.OperationMethod<
  QueryObservabilityTelemetryRequest,
  QueryObservabilityTelemetryResponse,
  QueryObservabilityTelemetryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: QueryObservabilityTelemetryRequest,
  output: QueryObservabilityTelemetryResponse,
  errors: [InvalidRoute],
}));

export interface ValuesObservabilityTelemetryRequest {
  /** Path param: Your Cloudflare account ID. */
  accountId: string;
  /** Body param: */
  datasets: string[];
  /** Body param: */
  key: string;
  /** Body param: */
  timeframe: { from: number; to: number };
  /** Body param: */
  type: "string" | "boolean" | "number";
  /** Body param: */
  filters?: {
    key: string;
    operation:
      | "includes"
      | "not_includes"
      | "starts_with"
      | "regex"
      | "exists"
      | "is_null"
      | "in"
      | "not_in"
      | "eq"
      | "neq"
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "="
      | "!="
      | ">"
      | ">="
      | "<"
      | "<="
      | "INCLUDES"
      | "DOES_NOT_INCLUDE"
      | "MATCH_REGEX"
      | "EXISTS"
      | "DOES_NOT_EXIST"
      | "IN"
      | "NOT_IN"
      | "STARTS_WITH";
    type: "string" | "number" | "boolean";
    value?: string | number | boolean;
  }[];
  /** Body param: */
  limit?: number;
  /** Body param: Search for a specific substring in the event. */
  needle?: {
    value: string | number | boolean;
    isRegex?: boolean;
    matchCase?: boolean;
  };
}

export const ValuesObservabilityTelemetryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasets: Schema.Array(Schema.String),
    key: Schema.String,
    timeframe: Schema.Struct({
      from: Schema.Number,
      to: Schema.Number,
    }),
    type: Schema.Literals(["string", "boolean", "number"]),
    filters: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.String,
          operation: Schema.Literals([
            "includes",
            "not_includes",
            "starts_with",
            "regex",
            "exists",
            "is_null",
            "in",
            "not_in",
            "eq",
            "neq",
            "gt",
            "gte",
            "lt",
            "lte",
            "=",
            "!=",
            ">",
            ">=",
            "<",
            "<=",
            "INCLUDES",
            "DOES_NOT_INCLUDE",
            "MATCH_REGEX",
            "EXISTS",
            "DOES_NOT_EXIST",
            "IN",
            "NOT_IN",
            "STARTS_WITH",
          ]),
          type: Schema.Literals(["string", "number", "boolean"]),
          value: Schema.optional(
            Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
          ),
        }),
      ),
    ),
    limit: Schema.optional(Schema.Number),
    needle: Schema.optional(
      Schema.Struct({
        value: Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
        isRegex: Schema.optional(Schema.Boolean),
        matchCase: Schema.optional(Schema.Boolean),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/observability/telemetry/values",
    }),
  ) as unknown as Schema.Schema<ValuesObservabilityTelemetryRequest>;

export interface ValuesObservabilityTelemetryResponse {
  result: {
    dataset: string;
    key: string;
    type: "string" | "boolean" | "number";
    value: string | number | boolean;
  }[];
}

export const ValuesObservabilityTelemetryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        dataset: Schema.String,
        key: Schema.String,
        type: Schema.Literals(["string", "boolean", "number"]),
        value: Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      }),
    ),
  }) as unknown as Schema.Schema<ValuesObservabilityTelemetryResponse>;

export type ValuesObservabilityTelemetryError = DefaultErrors | InvalidRoute;

export const valuesObservabilityTelemetry: API.PaginatedOperationMethod<
  ValuesObservabilityTelemetryRequest,
  ValuesObservabilityTelemetryResponse,
  ValuesObservabilityTelemetryError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ValuesObservabilityTelemetryRequest,
  ) => stream.Stream<
    ValuesObservabilityTelemetryResponse,
    ValuesObservabilityTelemetryError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ValuesObservabilityTelemetryRequest,
  ) => stream.Stream<
    {
      dataset: string;
      key: string;
      type: "string" | "boolean" | "number";
      value: string | number | boolean;
    },
    ValuesObservabilityTelemetryError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ValuesObservabilityTelemetryRequest,
  output: ValuesObservabilityTelemetryResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Route
// =============================================================================

export interface GetRouteRequest {
  routeId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/workers/routes/{routeId}" }),
) as unknown as Schema.Schema<GetRouteRequest>;

export interface GetRouteResponse {
  /** Identifier. */
  id: string;
  /** Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior). */
  pattern: string;
  /** Name of the script to run if the route matches. */
  script?: string | null;
}

export const GetRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  pattern: Schema.String,
  script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetRouteResponse>;

export type GetRouteError = DefaultErrors | WorkerNotFound | InvalidRoute;

export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResponse,
  GetRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouteRequest,
  output: GetRouteResponse,
  errors: [WorkerNotFound, InvalidRoute],
}));

export interface ListRoutesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListRoutesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/workers/routes" }),
) as unknown as Schema.Schema<ListRoutesRequest>;

export interface ListRoutesResponse {
  result: { id: string; pattern: string; script?: string | null }[];
}

export const ListRoutesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      pattern: Schema.String,
      script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ),
}) as unknown as Schema.Schema<ListRoutesResponse>;

export type ListRoutesError = DefaultErrors | InvalidRoute;

export const listRoutes: API.PaginatedOperationMethod<
  ListRoutesRequest,
  ListRoutesResponse,
  ListRoutesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListRoutesRequest,
  ) => stream.Stream<
    ListRoutesResponse,
    ListRoutesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListRoutesRequest,
  ) => stream.Stream<
    { id: string; pattern: string; script?: string | null },
    ListRoutesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRoutesRequest,
  output: ListRoutesResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateRouteRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior). */
  pattern: string;
  /** Body param: Name of the script to run if the route matches. */
  script?: string;
}

export const CreateRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  pattern: Schema.String,
  script: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/workers/routes" }),
) as unknown as Schema.Schema<CreateRouteRequest>;

export interface CreateRouteResponse {
  /** Identifier. */
  id: string;
  /** Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior). */
  pattern: string;
  /** Name of the script to run if the route matches. */
  script?: string | null;
}

export const CreateRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  pattern: Schema.String,
  script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<CreateRouteResponse>;

export type CreateRouteError =
  | DefaultErrors
  | InvalidRoutePattern
  | InvalidRoute;

export const createRoute: API.OperationMethod<
  CreateRouteRequest,
  CreateRouteResponse,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouteRequest,
  output: CreateRouteResponse,
  errors: [InvalidRoutePattern, InvalidRoute],
}));

export interface UpdateRouteRequest {
  routeId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior). */
  pattern: string;
  /** Body param: Name of the script to run if the route matches. */
  script?: string;
}

export const UpdateRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  pattern: Schema.String,
  script: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/workers/routes/{routeId}" }),
) as unknown as Schema.Schema<UpdateRouteRequest>;

export interface UpdateRouteResponse {
  /** Identifier. */
  id: string;
  /** Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior). */
  pattern: string;
  /** Name of the script to run if the route matches. */
  script?: string | null;
}

export const UpdateRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  pattern: Schema.String,
  script: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<UpdateRouteResponse>;

export type UpdateRouteError =
  | DefaultErrors
  | RouteNotFound
  | InvalidRoutePattern;

export const updateRoute: API.OperationMethod<
  UpdateRouteRequest,
  UpdateRouteResponse,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouteRequest,
  output: UpdateRouteResponse,
  errors: [RouteNotFound, InvalidRoutePattern],
}));

export interface DeleteRouteRequest {
  routeId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRouteRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  routeId: Schema.String.pipe(T.HttpPath("routeId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/workers/routes/{routeId}",
  }),
) as unknown as Schema.Schema<DeleteRouteRequest>;

export interface DeleteRouteResponse {
  /** Identifier. */
  id?: string | null;
}

export const DeleteRouteResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeleteRouteResponse>;

export type DeleteRouteError = DefaultErrors | RouteNotFound;

export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteRequest,
  output: DeleteRouteResponse,
  errors: [RouteNotFound],
}));

// =============================================================================
// Script
// =============================================================================

export interface GetScriptRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/scripts/{scriptName}",
  }),
) as unknown as Schema.Schema<GetScriptRequest>;

export type GetScriptResponse = unknown;

export const GetScriptResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetScriptResponse>;

export type GetScriptError = DefaultErrors | WorkerNotFound | InvalidRoute;

export const getScript: API.OperationMethod<
  GetScriptRequest,
  GetScriptResponse,
  GetScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptRequest,
  output: GetScriptResponse,
  errors: [WorkerNotFound, InvalidRoute],
}));

export interface ListScriptsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Filter scripts by tags. Format: comma-separated list of tag:allowed pairs where allowed is 'yes' or 'no'. */
  tags?: string;
}

export const ListScriptsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  tags: Schema.optional(Schema.String).pipe(T.HttpQuery("tags")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts" }),
) as unknown as Schema.Schema<ListScriptsRequest>;

export interface ListScriptsResponse {
  result: {
    id?: string | null;
    compatibilityDate?: string | null;
    compatibilityFlags?: string[] | null;
    createdOn?: string | null;
    etag?: string | null;
    handlers?: string[] | null;
    hasAssets?: boolean | null;
    hasModules?: boolean | null;
    lastDeployedFrom?: string | null;
    logpush?: boolean | null;
    migrationTag?: string | null;
    modifiedOn?: string | null;
    namedHandlers?:
      | { handlers?: string[] | null; name?: string | null }[]
      | null;
    observability?: {
      enabled: boolean;
      headSamplingRate?: number | null;
      logs?: {
        enabled: boolean;
        invocationLogs: boolean;
        destinations?: string[] | null;
        headSamplingRate?: number | null;
        persist?: boolean | null;
      } | null;
    } | null;
    placement?:
      | {
          mode: "smart";
          lastAnalyzedAt?: string | null;
          status?:
            | "SUCCESS"
            | "UNSUPPORTED_APPLICATION"
            | "INSUFFICIENT_INVOCATIONS"
            | null;
        }
      | {
          region: string;
          lastAnalyzedAt?: string | null;
          status?:
            | "SUCCESS"
            | "UNSUPPORTED_APPLICATION"
            | "INSUFFICIENT_INVOCATIONS"
            | null;
        }
      | {
          hostname: string;
          lastAnalyzedAt?: string | null;
          status?:
            | "SUCCESS"
            | "UNSUPPORTED_APPLICATION"
            | "INSUFFICIENT_INVOCATIONS"
            | null;
        }
      | {
          host: string;
          lastAnalyzedAt?: string | null;
          status?:
            | "SUCCESS"
            | "UNSUPPORTED_APPLICATION"
            | "INSUFFICIENT_INVOCATIONS"
            | null;
        }
      | null;
    placementMode?: "smart" | null;
    placementStatus?:
      | "SUCCESS"
      | "UNSUPPORTED_APPLICATION"
      | "INSUFFICIENT_INVOCATIONS"
      | null;
    routes?: { id: string; pattern: string; script?: string | null }[] | null;
    tag?: string | null;
    tags?: string[] | null;
    tailConsumers?: unknown[] | null;
    usageModel?: "standard" | "bundled" | "unbound" | null;
  }[];
}

export const ListScriptsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      compatibilityDate: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      compatibilityFlags: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      etag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      handlers: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      hasAssets: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      hasModules: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      lastDeployedFrom: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      migrationTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      namedHandlers: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              handlers: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            }),
          ),
          Schema.Null,
        ]),
      ),
      observability: Schema.optional(
        Schema.Union([
          Schema.Struct({
            enabled: Schema.Boolean,
            headSamplingRate: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            logs: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  enabled: Schema.Boolean,
                  invocationLogs: Schema.Boolean,
                  destinations: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                  headSamplingRate: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  persist: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    enabled: "enabled",
                    invocationLogs: "invocation_logs",
                    destinations: "destinations",
                    headSamplingRate: "head_sampling_rate",
                    persist: "persist",
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              headSamplingRate: "head_sampling_rate",
              logs: "logs",
            }),
          ),
          Schema.Null,
        ]),
      ),
      placement: Schema.optional(
        Schema.Union([
          Schema.Union([
            Schema.Struct({
              mode: Schema.Literal("smart"),
              lastAnalyzedAt: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              status: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "SUCCESS",
                    "UNSUPPORTED_APPLICATION",
                    "INSUFFICIENT_INVOCATIONS",
                  ]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                mode: "mode",
                lastAnalyzedAt: "last_analyzed_at",
                status: "status",
              }),
            ),
            Schema.Struct({
              region: Schema.String,
              lastAnalyzedAt: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              status: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "SUCCESS",
                    "UNSUPPORTED_APPLICATION",
                    "INSUFFICIENT_INVOCATIONS",
                  ]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                region: "region",
                lastAnalyzedAt: "last_analyzed_at",
                status: "status",
              }),
            ),
            Schema.Struct({
              hostname: Schema.String,
              lastAnalyzedAt: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              status: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "SUCCESS",
                    "UNSUPPORTED_APPLICATION",
                    "INSUFFICIENT_INVOCATIONS",
                  ]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                hostname: "hostname",
                lastAnalyzedAt: "last_analyzed_at",
                status: "status",
              }),
            ),
            Schema.Struct({
              host: Schema.String,
              lastAnalyzedAt: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              status: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "SUCCESS",
                    "UNSUPPORTED_APPLICATION",
                    "INSUFFICIENT_INVOCATIONS",
                  ]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                host: "host",
                lastAnalyzedAt: "last_analyzed_at",
                status: "status",
              }),
            ),
          ]),
          Schema.Null,
        ]),
      ),
      placementMode: Schema.optional(
        Schema.Union([Schema.Literal("smart"), Schema.Null]),
      ),
      placementStatus: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "SUCCESS",
            "UNSUPPORTED_APPLICATION",
            "INSUFFICIENT_INVOCATIONS",
          ]),
          Schema.Null,
        ]),
      ),
      routes: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
              pattern: Schema.String,
              script: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
          ),
          Schema.Null,
        ]),
      ),
      tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      tags: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      tailConsumers: Schema.optional(
        Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
      ),
      usageModel: Schema.optional(
        Schema.Union([
          Schema.Literals(["standard", "bundled", "unbound"]),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        createdOn: "created_on",
        etag: "etag",
        handlers: "handlers",
        hasAssets: "has_assets",
        hasModules: "has_modules",
        lastDeployedFrom: "last_deployed_from",
        logpush: "logpush",
        migrationTag: "migration_tag",
        modifiedOn: "modified_on",
        namedHandlers: "named_handlers",
        observability: "observability",
        placement: "placement",
        placementMode: "placement_mode",
        placementStatus: "placement_status",
        routes: "routes",
        tag: "tag",
        tags: "tags",
        tailConsumers: "tail_consumers",
        usageModel: "usage_model",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListScriptsResponse>;

export type ListScriptsError = DefaultErrors | InvalidRoute;

export const listScripts: API.PaginatedOperationMethod<
  ListScriptsRequest,
  ListScriptsResponse,
  ListScriptsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListScriptsRequest,
  ) => stream.Stream<
    ListScriptsResponse,
    ListScriptsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListScriptsRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      compatibilityDate?: string | null;
      compatibilityFlags?: string[] | null;
      createdOn?: string | null;
      etag?: string | null;
      handlers?: string[] | null;
      hasAssets?: boolean | null;
      hasModules?: boolean | null;
      lastDeployedFrom?: string | null;
      logpush?: boolean | null;
      migrationTag?: string | null;
      modifiedOn?: string | null;
      namedHandlers?:
        | { handlers?: string[] | null; name?: string | null }[]
        | null;
      observability?: {
        enabled: boolean;
        headSamplingRate?: number | null;
        logs?: {
          enabled: boolean;
          invocationLogs: boolean;
          destinations?: string[] | null;
          headSamplingRate?: number | null;
          persist?: boolean | null;
        } | null;
      } | null;
      placement?:
        | {
            mode: "smart";
            lastAnalyzedAt?: string | null;
            status?:
              | "SUCCESS"
              | "UNSUPPORTED_APPLICATION"
              | "INSUFFICIENT_INVOCATIONS"
              | null;
          }
        | {
            region: string;
            lastAnalyzedAt?: string | null;
            status?:
              | "SUCCESS"
              | "UNSUPPORTED_APPLICATION"
              | "INSUFFICIENT_INVOCATIONS"
              | null;
          }
        | {
            hostname: string;
            lastAnalyzedAt?: string | null;
            status?:
              | "SUCCESS"
              | "UNSUPPORTED_APPLICATION"
              | "INSUFFICIENT_INVOCATIONS"
              | null;
          }
        | {
            host: string;
            lastAnalyzedAt?: string | null;
            status?:
              | "SUCCESS"
              | "UNSUPPORTED_APPLICATION"
              | "INSUFFICIENT_INVOCATIONS"
              | null;
          }
        | null;
      placementMode?: "smart" | null;
      placementStatus?:
        | "SUCCESS"
        | "UNSUPPORTED_APPLICATION"
        | "INSUFFICIENT_INVOCATIONS"
        | null;
      routes?: { id: string; pattern: string; script?: string | null }[] | null;
      tag?: string | null;
      tags?: string[] | null;
      tailConsumers?: unknown[] | null;
      usageModel?: "standard" | "bundled" | "unbound" | null;
    },
    ListScriptsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScriptsRequest,
  output: ListScriptsResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface PutScriptRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: JSON-encoded metadata about the uploaded parts and Worker configuration. */
  metadata: {
    assets?: {
      config?: {
        headers?: string;
        redirects?: string;
        htmlHandling?:
          | "auto-trailing-slash"
          | "force-trailing-slash"
          | "drop-trailing-slash"
          | "none";
        notFoundHandling?: "none" | "404-page" | "single-page-application";
        runWorkerFirst?: string[] | boolean;
        serveDirectly?: boolean;
      };
      jwt?: string;
    };
    bindings?: (
      | { name: string; type: "ai" }
      | { dataset: string; name: string; type: "analytics_engine" }
      | { name: string; type: "assets" }
      | { name: string; type: "browser" }
      | { id: string; name: string; type: "d1" }
      | { name: string; part: string; type: "data_blob" }
      | {
          name: string;
          namespace: string;
          type: "dispatch_namespace";
          outbound?: {
            params?: string[];
            worker?: { environment?: string; service?: string };
          };
        }
      | {
          name: string;
          type: "durable_object_namespace";
          className?: string;
          environment?: string;
          namespaceId?: string;
          scriptName?: string;
        }
      | { id: string; name: string; type: "hyperdrive" }
      | { name: string; type: "inherit"; oldName?: string; versionId?: string }
      | { name: string; type: "images" }
      | { json: string; name: string; type: "json" }
      | { name: string; namespaceId: string; type: "kv_namespace" }
      | { certificateId: string; name: string; type: "mtls_certificate" }
      | { name: string; text: string; type: "plain_text" }
      | { name: string; pipeline: string; type: "pipelines" }
      | { name: string; queueName: string; type: "queue" }
      | {
          bucketName: string;
          name: string;
          type: "r2_bucket";
          jurisdiction?: "eu" | "fedramp";
        }
      | { name: string; text: string; type: "secret_text" }
      | {
          name: string;
          type: "send_email";
          allowedDestinationAddresses?: string[];
          allowedSenderAddresses?: string[];
          destinationAddress?: string;
        }
      | { name: string; service: string; type: "service"; environment?: string }
      | { name: string; part: string; type: "text_blob" }
      | { indexName: string; name: string; type: "vectorize" }
      | { name: string; type: "version_metadata" }
      | {
          name: string;
          secretName: string;
          storeId: string;
          type: "secrets_store_secret";
        }
      | {
          algorithm: unknown;
          format: "raw" | "pkcs8" | "spki" | "jwk";
          name: string;
          type: "secret_key";
          usages: (
            | "encrypt"
            | "decrypt"
            | "sign"
            | "verify"
            | "deriveKey"
            | "deriveBits"
            | "wrapKey"
            | "unwrapKey"
          )[];
          keyBase64?: string;
          keyJwk?: unknown;
        }
      | {
          name: string;
          type: "workflow";
          workflowName: string;
          className?: string;
          scriptName?: string;
        }
      | { name: string; part: string; type: "wasm_module" }
    )[];
    bodyPart?: string;
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    keepAssets?: boolean;
    keepBindings?: string[];
    limits?: { cpuMs?: number };
    logpush?: boolean;
    mainModule?: string;
    migrations?:
      | unknown
      | { newTag?: string; oldTag?: string; steps?: unknown[] };
    observability?: {
      enabled: boolean;
      headSamplingRate?: number | null;
      logs?: {
        enabled: boolean;
        invocationLogs: boolean;
        destinations?: string[];
        headSamplingRate?: number | null;
        persist?: boolean;
      } | null;
    };
    placement?:
      | { mode: "smart" }
      | { region: string }
      | { hostname: string }
      | { host: string };
    tags?: string[];
    tailConsumers?: unknown[] | null;
    usageModel?: "standard" | "bundled" | "unbound";
  };
  /** Body param: An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata as `main_module` or `body_part` by filename.<br/ */
  files?: (File | Blob)[];
}

export const PutScriptRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  metadata: Schema.Struct({
    assets: Schema.optional(
      Schema.Struct({
        config: Schema.optional(
          Schema.Struct({
            headers: Schema.optional(Schema.String),
            redirects: Schema.optional(Schema.String),
            htmlHandling: Schema.optional(
              Schema.Literals([
                "auto-trailing-slash",
                "force-trailing-slash",
                "drop-trailing-slash",
                "none",
              ]),
            ),
            notFoundHandling: Schema.optional(
              Schema.Literals(["none", "404-page", "single-page-application"]),
            ),
            runWorkerFirst: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Boolean]),
            ),
            serveDirectly: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              headers: "_headers",
              redirects: "_redirects",
              htmlHandling: "html_handling",
              notFoundHandling: "not_found_handling",
              runWorkerFirst: "run_worker_first",
              serveDirectly: "serve_directly",
            }),
          ),
        ),
        jwt: Schema.optional(Schema.String),
      }),
    ),
    bindings: Schema.optional(
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("ai"),
          }),
          Schema.Struct({
            dataset: Schema.String,
            name: Schema.String,
            type: Schema.Literal("analytics_engine"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("assets"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("browser"),
          }),
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            type: Schema.Literal("d1"),
          }),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("data_blob"),
          }),
          Schema.Struct({
            name: Schema.String,
            namespace: Schema.String,
            type: Schema.Literal("dispatch_namespace"),
            outbound: Schema.optional(
              Schema.Struct({
                params: Schema.optional(Schema.Array(Schema.String)),
                worker: Schema.optional(
                  Schema.Struct({
                    environment: Schema.optional(Schema.String),
                    service: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("durable_object_namespace"),
            className: Schema.optional(Schema.String),
            environment: Schema.optional(Schema.String),
            namespaceId: Schema.optional(Schema.String),
            scriptName: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              className: "class_name",
              environment: "environment",
              namespaceId: "namespace_id",
              scriptName: "script_name",
            }),
          ),
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            type: Schema.Literal("hyperdrive"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("inherit"),
            oldName: Schema.optional(Schema.String),
            versionId: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              oldName: "old_name",
              versionId: "version_id",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("images"),
          }),
          Schema.Struct({
            json: Schema.String,
            name: Schema.String,
            type: Schema.Literal("json"),
          }),
          Schema.Struct({
            name: Schema.String,
            namespaceId: Schema.String,
            type: Schema.Literal("kv_namespace"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              namespaceId: "namespace_id",
              type: "type",
            }),
          ),
          Schema.Struct({
            certificateId: Schema.String,
            name: Schema.String,
            type: Schema.Literal("mtls_certificate"),
          }).pipe(
            Schema.encodeKeys({
              certificateId: "certificate_id",
              name: "name",
              type: "type",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            text: Schema.String,
            type: Schema.Literal("plain_text"),
          }),
          Schema.Struct({
            name: Schema.String,
            pipeline: Schema.String,
            type: Schema.Literal("pipelines"),
          }),
          Schema.Struct({
            name: Schema.String,
            queueName: Schema.String,
            type: Schema.Literal("queue"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              queueName: "queue_name",
              type: "type",
            }),
          ),
          Schema.Struct({
            bucketName: Schema.String,
            name: Schema.String,
            type: Schema.Literal("r2_bucket"),
            jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
          }).pipe(
            Schema.encodeKeys({
              bucketName: "bucket_name",
              name: "name",
              type: "type",
              jurisdiction: "jurisdiction",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            text: Schema.String,
            type: Schema.Literal("secret_text"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("send_email"),
            allowedDestinationAddresses: Schema.optional(
              Schema.Array(Schema.String),
            ),
            allowedSenderAddresses: Schema.optional(
              Schema.Array(Schema.String),
            ),
            destinationAddress: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              allowedDestinationAddresses: "allowed_destination_addresses",
              allowedSenderAddresses: "allowed_sender_addresses",
              destinationAddress: "destination_address",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            service: Schema.String,
            type: Schema.Literal("service"),
            environment: Schema.optional(Schema.String),
          }),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("text_blob"),
          }),
          Schema.Struct({
            indexName: Schema.String,
            name: Schema.String,
            type: Schema.Literal("vectorize"),
          }).pipe(
            Schema.encodeKeys({
              indexName: "index_name",
              name: "name",
              type: "type",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("version_metadata"),
          }),
          Schema.Struct({
            name: Schema.String,
            secretName: Schema.String,
            storeId: Schema.String,
            type: Schema.Literal("secrets_store_secret"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              secretName: "secret_name",
              storeId: "store_id",
              type: "type",
            }),
          ),
          Schema.Struct({
            algorithm: Schema.Unknown,
            format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
            name: Schema.String,
            type: Schema.Literal("secret_key"),
            usages: Schema.Array(
              Schema.Literals([
                "encrypt",
                "decrypt",
                "sign",
                "verify",
                "deriveKey",
                "deriveBits",
                "wrapKey",
                "unwrapKey",
              ]),
            ),
            keyBase64: Schema.optional(Schema.String),
            keyJwk: Schema.optional(Schema.Unknown),
          }).pipe(
            Schema.encodeKeys({
              algorithm: "algorithm",
              format: "format",
              name: "name",
              type: "type",
              usages: "usages",
              keyBase64: "key_base64",
              keyJwk: "key_jwk",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("workflow"),
            workflowName: Schema.String,
            className: Schema.optional(Schema.String),
            scriptName: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              workflowName: "workflow_name",
              className: "class_name",
              scriptName: "script_name",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("wasm_module"),
          }),
        ]),
      ),
    ),
    bodyPart: Schema.optional(Schema.String),
    compatibilityDate: Schema.optional(Schema.String),
    compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
    keepAssets: Schema.optional(Schema.Boolean),
    keepBindings: Schema.optional(Schema.Array(Schema.String)),
    limits: Schema.optional(
      Schema.Struct({
        cpuMs: Schema.optional(Schema.Number),
      }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
    ),
    logpush: Schema.optional(Schema.Boolean),
    mainModule: Schema.optional(Schema.String),
    migrations: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          newTag: Schema.optional(Schema.String),
          oldTag: Schema.optional(Schema.String),
          steps: Schema.optional(Schema.Array(Schema.Unknown)),
        }).pipe(
          Schema.encodeKeys({
            newTag: "new_tag",
            oldTag: "old_tag",
            steps: "steps",
          }),
        ),
      ]),
    ),
    observability: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        headSamplingRate: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        logs: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
              invocationLogs: Schema.Boolean,
              destinations: Schema.optional(Schema.Array(Schema.String)),
              headSamplingRate: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              persist: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                enabled: "enabled",
                invocationLogs: "invocation_logs",
                destinations: "destinations",
                headSamplingRate: "head_sampling_rate",
                persist: "persist",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          headSamplingRate: "head_sampling_rate",
          logs: "logs",
        }),
      ),
    ),
    placement: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.Literal("smart"),
        }),
        Schema.Struct({
          region: Schema.String,
        }),
        Schema.Struct({
          hostname: Schema.String,
        }),
        Schema.Struct({
          host: Schema.String,
        }),
      ]),
    ),
    tags: Schema.optional(Schema.Array(Schema.String)),
    tailConsumers: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    usageModel: Schema.optional(
      Schema.Literals(["standard", "bundled", "unbound"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      assets: "assets",
      bindings: "bindings",
      bodyPart: "body_part",
      compatibilityDate: "compatibility_date",
      compatibilityFlags: "compatibility_flags",
      keepAssets: "keep_assets",
      keepBindings: "keep_bindings",
      limits: "limits",
      logpush: "logpush",
      mainModule: "main_module",
      migrations: "migrations",
      observability: "observability",
      placement: "placement",
      tags: "tags",
      tailConsumers: "tail_consumers",
      usageModel: "usage_model",
    }),
  ),
  files: Schema.optional(
    Schema.Array(UploadableSchema.pipe(T.HttpFormDataFile())),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/workers/scripts/{scriptName}",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<PutScriptRequest>;

export interface PutScriptResponse {
  startupTimeMs: number;
  /** The name used to identify the script. */
  id?: string | null;
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string | null;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[] | null;
  /** When the script was created. */
  createdOn?: string | null;
  /** The entry point for the script. */
  entryPoint?: string | null;
  /** Hashed script content, can be used in a If-None-Match header when updating. */
  etag?: string | null;
  /** The names of handlers exported as part of the default export. */
  handlers?: string[] | null;
  /** Whether a Worker contains assets. */
  hasAssets?: boolean | null;
  /** Whether a Worker contains modules. */
  hasModules?: boolean | null;
  /** The client most recently used to deploy this Worker. */
  lastDeployedFrom?: string | null;
  /** Whether Logpush is turned on for the Worker. */
  logpush?: boolean | null;
  /** The tag of the Durable Object migration that was most recently applied for this Worker. */
  migrationTag?: string | null;
  /** When the script was last modified. */
  modifiedOn?: string | null;
  /** Named exports, such as Durable Object class implementations and named entrypoints. */
  namedHandlers?: { handlers?: string[] | null; name?: string | null }[] | null;
  /** Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[] | null;
      headSamplingRate?: number | null;
      persist?: boolean | null;
    } | null;
  } | null;
  /** Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify either mode for Smart Placement, or one of region/hostname/host for targeted place */
  placement?:
    | {
        mode: "smart";
        lastAnalyzedAt?: string | null;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS"
          | null;
      }
    | {
        region: string;
        lastAnalyzedAt?: string | null;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS"
          | null;
      }
    | {
        hostname: string;
        lastAnalyzedAt?: string | null;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS"
          | null;
      }
    | {
        host: string;
        lastAnalyzedAt?: string | null;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS"
          | null;
      }
    | null;
  /** @deprecated */
  placementMode?: "smart" | null;
  /** @deprecated */
  placementStatus?:
    | "SUCCESS"
    | "UNSUPPORTED_APPLICATION"
    | "INSUFFICIENT_INVOCATIONS"
    | null;
  /** The immutable ID of the script. */
  tag?: string | null;
  /** Tags associated with the Worker. */
  tags?: string[] | null;
  /** List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
  /** Usage model for the Worker invocations. */
  usageModel?: "standard" | "bundled" | "unbound" | null;
}

export const PutScriptResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  startupTimeMs: Schema.Number,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  compatibilityDate: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  compatibilityFlags: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  entryPoint: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  etag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  handlers: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  hasAssets: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  hasModules: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lastDeployedFrom: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  migrationTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  namedHandlers: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          handlers: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  observability: Schema.optional(
    Schema.Union([
      Schema.Struct({
        enabled: Schema.Boolean,
        headSamplingRate: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        logs: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
              invocationLogs: Schema.Boolean,
              destinations: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              headSamplingRate: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              persist: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                enabled: "enabled",
                invocationLogs: "invocation_logs",
                destinations: "destinations",
                headSamplingRate: "head_sampling_rate",
                persist: "persist",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          headSamplingRate: "head_sampling_rate",
          logs: "logs",
        }),
      ),
      Schema.Null,
    ]),
  ),
  placement: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Struct({
          mode: Schema.Literal("smart"),
          lastAnalyzedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          status: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "SUCCESS",
                "UNSUPPORTED_APPLICATION",
                "INSUFFICIENT_INVOCATIONS",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            mode: "mode",
            lastAnalyzedAt: "last_analyzed_at",
            status: "status",
          }),
        ),
        Schema.Struct({
          region: Schema.String,
          lastAnalyzedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          status: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "SUCCESS",
                "UNSUPPORTED_APPLICATION",
                "INSUFFICIENT_INVOCATIONS",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            region: "region",
            lastAnalyzedAt: "last_analyzed_at",
            status: "status",
          }),
        ),
        Schema.Struct({
          hostname: Schema.String,
          lastAnalyzedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          status: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "SUCCESS",
                "UNSUPPORTED_APPLICATION",
                "INSUFFICIENT_INVOCATIONS",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            hostname: "hostname",
            lastAnalyzedAt: "last_analyzed_at",
            status: "status",
          }),
        ),
        Schema.Struct({
          host: Schema.String,
          lastAnalyzedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          status: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "SUCCESS",
                "UNSUPPORTED_APPLICATION",
                "INSUFFICIENT_INVOCATIONS",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            host: "host",
            lastAnalyzedAt: "last_analyzed_at",
            status: "status",
          }),
        ),
      ]),
      Schema.Null,
    ]),
  ),
  placementMode: Schema.optional(
    Schema.Union([Schema.Literal("smart"), Schema.Null]),
  ),
  placementStatus: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "SUCCESS",
        "UNSUPPORTED_APPLICATION",
        "INSUFFICIENT_INVOCATIONS",
      ]),
      Schema.Null,
    ]),
  ),
  tag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  tags: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  tailConsumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  usageModel: Schema.optional(
    Schema.Union([
      Schema.Literals(["standard", "bundled", "unbound"]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      startupTimeMs: "startup_time_ms",
      id: "id",
      compatibilityDate: "compatibility_date",
      compatibilityFlags: "compatibility_flags",
      createdOn: "created_on",
      entryPoint: "entry_point",
      etag: "etag",
      handlers: "handlers",
      hasAssets: "has_assets",
      hasModules: "has_modules",
      lastDeployedFrom: "last_deployed_from",
      logpush: "logpush",
      migrationTag: "migration_tag",
      modifiedOn: "modified_on",
      namedHandlers: "named_handlers",
      observability: "observability",
      placement: "placement",
      placementMode: "placement_mode",
      placementStatus: "placement_status",
      tag: "tag",
      tags: "tags",
      tailConsumers: "tail_consumers",
      usageModel: "usage_model",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutScriptResponse>;

export type PutScriptError = DefaultErrors | InvalidRoute;

export const putScript: API.OperationMethod<
  PutScriptRequest,
  PutScriptResponse,
  PutScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutScriptRequest,
  output: PutScriptResponse,
  errors: [InvalidRoute],
}));

export interface DeleteScriptRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: If set to true, delete will not be stopped by associated service binding, durable object, or other binding. Any of these associated bindings/durable objects will be deleted along with the */
  force?: boolean;
}

export const DeleteScriptRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/scripts/{scriptName}",
  }),
) as unknown as Schema.Schema<DeleteScriptRequest>;

export type DeleteScriptResponse = unknown;

export const DeleteScriptResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteScriptResponse>;

export type DeleteScriptError = DefaultErrors | WorkerNotFound;

export const deleteScript: API.OperationMethod<
  DeleteScriptRequest,
  DeleteScriptResponse,
  DeleteScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScriptRequest,
  output: DeleteScriptResponse,
  errors: [WorkerNotFound],
}));

export interface SearchScriptRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Worker ID (also called tag) to search for. Only exact matches are returned. */
  id?: string;
  /** Query param: Worker name to search for. Both exact and partial matches are returned. */
  name?: string;
  /** Query param: Property to sort results by. Results are sorted in ascending order. */
  orderBy?: "created_on" | "modified_on" | "name";
  /** Query param: Current page. */
  page?: number;
  /** Query param: Items per page. */
  perPage?: number;
}

export const SearchScriptRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  orderBy: Schema.optional(
    Schema.Literals(["created_on", "modified_on", "name"]),
  ).pipe(T.HttpQuery("order_by")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/scripts-search",
  }),
) as unknown as Schema.Schema<SearchScriptRequest>;

export type SearchScriptResponse = {
  createdOn: string;
  modifiedOn: string;
  scriptName: string;
  scriptTag?: string | null;
  environmentIsDefault?: boolean | null;
  environmentName?: string | null;
  serviceName?: string | null;
}[];

export const SearchScriptResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    createdOn: Schema.String,
    modifiedOn: Schema.String,
    scriptName: Schema.String,
    scriptTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    environmentIsDefault: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    environmentName: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    serviceName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      createdOn: "created_on",
      modifiedOn: "modified_on",
      scriptName: "script_name",
      scriptTag: "script_tag",
      environmentIsDefault: "environment_is_default",
      environmentName: "environment_name",
      serviceName: "service_name",
    }),
  ),
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<SearchScriptResponse>;

export type SearchScriptError = DefaultErrors | InvalidRoute;

export const searchScript: API.OperationMethod<
  SearchScriptRequest,
  SearchScriptResponse,
  SearchScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchScriptRequest,
  output: SearchScriptResponse,
  errors: [InvalidRoute],
}));

// =============================================================================
// ScriptAssetUpload
// =============================================================================

export interface CreateScriptAssetUploadRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A manifest ([path]: {hash, size}) map of files to upload. As an example, `/blog/hello-world.html` would be a valid path key. */
  manifest: Record<string, unknown>;
}

export const CreateScriptAssetUploadRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    manifest: Schema.Struct({}),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/assets-upload-session",
    }),
  ) as unknown as Schema.Schema<CreateScriptAssetUploadRequest>;

export interface CreateScriptAssetUploadResponse {
  /** The requests to make to upload assets. */
  buckets?: string[][] | null;
  /** A JWT to use as authentication for uploading assets. */
  jwt?: string | null;
}

export const CreateScriptAssetUploadResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    buckets: Schema.optional(
      Schema.Union([Schema.Array(Schema.Array(Schema.String)), Schema.Null]),
    ),
    jwt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateScriptAssetUploadResponse>;

export type CreateScriptAssetUploadError = DefaultErrors;

export const createScriptAssetUpload: API.OperationMethod<
  CreateScriptAssetUploadRequest,
  CreateScriptAssetUploadResponse,
  CreateScriptAssetUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScriptAssetUploadRequest,
  output: CreateScriptAssetUploadResponse,
  errors: [],
}));

// =============================================================================
// ScriptContent
// =============================================================================

export interface GetScriptContentRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptContentRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/content/v2",
    }),
  ) as unknown as Schema.Schema<GetScriptContentRequest>;

export type GetScriptContentResponse = unknown;

export const GetScriptContentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetScriptContentResponse>;

export type GetScriptContentError = DefaultErrors | WorkerNotFound;

export const getScriptContent: API.OperationMethod<
  GetScriptContentRequest,
  GetScriptContentResponse,
  GetScriptContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptContentRequest,
  output: GetScriptContentResponse,
  errors: [WorkerNotFound],
}));

export interface PutScriptContentRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Header param: The multipart name of a script upload part containing script content in service worker format. Alternative to including in a metadata part. */
  cfworkerbodypart?: string;
  /** Header param: The multipart name of a script upload part containing script content in es module format. Alternative to including in a metadata part. */
  cfworkermainmodulepart?: string;
  /** Body param: JSON-encoded metadata about the uploaded parts and Worker configuration. */
  metadata: { bodyPart?: string; mainModule?: string };
  /** Body param: An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata as `main_module` or `body_part` by filename.<br/ */
  files?: (File | Blob)[];
}

export const PutScriptContentRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    cfworkerbodypart: Schema.optional(Schema.String).pipe(
      T.HttpHeader("CF-WORKER-BODY-PART"),
    ),
    cfworkermainmodulepart: Schema.optional(Schema.String).pipe(
      T.HttpHeader("CF-WORKER-MAIN-MODULE-PART"),
    ),
    metadata: Schema.Struct({
      bodyPart: Schema.optional(Schema.String),
      mainModule: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({ bodyPart: "body_part", mainModule: "main_module" }),
    ),
    files: Schema.optional(
      Schema.Array(UploadableSchema.pipe(T.HttpFormDataFile())),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/content",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<PutScriptContentRequest>;

export type PutScriptContentResponse = unknown;

export const PutScriptContentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PutScriptContentResponse>;

export type PutScriptContentError =
  | DefaultErrors
  | WorkerNotFound
  | InvalidWorkerScript;

export const putScriptContent: API.OperationMethod<
  PutScriptContentRequest,
  PutScriptContentResponse,
  PutScriptContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutScriptContentRequest,
  output: PutScriptContentResponse,
  errors: [WorkerNotFound, InvalidWorkerScript],
}));

// =============================================================================
// ScriptDeployment
// =============================================================================

export interface GetScriptDeploymentRequest {
  scriptName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptDeploymentRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/deployments/{deploymentId}",
    }),
  ) as unknown as Schema.Schema<GetScriptDeploymentRequest>;

export interface GetScriptDeploymentResponse {
  id: string;
  createdOn: string;
  source: string;
  strategy: "percentage";
  versions: { percentage: number; versionId: string }[];
  annotations?: {
    workersMessage?: string | null;
    workersTriggeredBy?: string | null;
  } | null;
  authorEmail?: string | null;
}

export const GetScriptDeploymentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    source: Schema.String,
    strategy: Schema.Literal("percentage"),
    versions: Schema.Array(
      Schema.Struct({
        percentage: Schema.Number,
        versionId: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          percentage: "percentage",
          versionId: "version_id",
        }),
      ),
    ),
    annotations: Schema.optional(
      Schema.Union([
        Schema.Struct({
          workersMessage: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          workersTriggeredBy: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            workersMessage: "workers/message",
            workersTriggeredBy: "workers/triggered_by",
          }),
        ),
        Schema.Null,
      ]),
    ),
    authorEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        source: "source",
        strategy: "strategy",
        versions: "versions",
        annotations: "annotations",
        authorEmail: "author_email",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetScriptDeploymentResponse>;

export type GetScriptDeploymentError =
  | DefaultErrors
  | WorkerNotFound
  | DeploymentNotFound;

export const getScriptDeployment: API.OperationMethod<
  GetScriptDeploymentRequest,
  GetScriptDeploymentResponse,
  GetScriptDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptDeploymentRequest,
  output: GetScriptDeploymentResponse,
  errors: [WorkerNotFound, DeploymentNotFound],
}));

export interface ListScriptDeploymentsRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const ListScriptDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/deployments",
    }),
  ) as unknown as Schema.Schema<ListScriptDeploymentsRequest>;

export interface ListScriptDeploymentsResponse {
  deployments: {
    id: string;
    createdOn: string;
    source: string;
    strategy: "percentage";
    versions: { percentage: number; versionId: string }[];
    annotations?: {
      workersMessage?: string | null;
      workersTriggeredBy?: string | null;
    } | null;
    authorEmail?: string | null;
  }[];
}

export const ListScriptDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deployments: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        createdOn: Schema.String,
        source: Schema.String,
        strategy: Schema.Literal("percentage"),
        versions: Schema.Array(
          Schema.Struct({
            percentage: Schema.Number,
            versionId: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              percentage: "percentage",
              versionId: "version_id",
            }),
          ),
        ),
        annotations: Schema.optional(
          Schema.Union([
            Schema.Struct({
              workersMessage: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              workersTriggeredBy: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                workersMessage: "workers/message",
                workersTriggeredBy: "workers/triggered_by",
              }),
            ),
            Schema.Null,
          ]),
        ),
        authorEmail: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdOn: "created_on",
          source: "source",
          strategy: "strategy",
          versions: "versions",
          annotations: "annotations",
          authorEmail: "author_email",
        }),
      ),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListScriptDeploymentsResponse>;

export type ListScriptDeploymentsError = DefaultErrors | WorkerNotFound;

export const listScriptDeployments: API.OperationMethod<
  ListScriptDeploymentsRequest,
  ListScriptDeploymentsResponse,
  ListScriptDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListScriptDeploymentsRequest,
  output: ListScriptDeploymentsResponse,
  errors: [WorkerNotFound],
}));

export interface CreateScriptDeploymentRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: If set to true, the deployment will be created even if normally blocked by something such rolling back to an older version when a secret has changed. */
  force?: boolean;
  /** Body param: */
  strategy: "percentage";
  /** Body param: */
  versions: { percentage: number; versionId: string }[];
  /** Body param: */
  annotations?: { workersMessage?: string };
}

export const CreateScriptDeploymentRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    strategy: Schema.Literal("percentage"),
    versions: Schema.Array(
      Schema.Struct({
        percentage: Schema.Number,
        versionId: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          percentage: "percentage",
          versionId: "version_id",
        }),
      ),
    ),
    annotations: Schema.optional(
      Schema.Struct({
        workersMessage: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ workersMessage: "workers/message" })),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/deployments",
    }),
  ) as unknown as Schema.Schema<CreateScriptDeploymentRequest>;

export interface CreateScriptDeploymentResponse {
  id: string;
  createdOn?: string | null;
  source?: string | null;
  strategy?: "percentage" | null;
  versions?: { percentage: number; versionId: string }[] | null;
  annotations?: {
    workersMessage?: string | null;
    workersTriggeredBy?: string | null;
  } | null;
  authorEmail?: string | null;
}

export const CreateScriptDeploymentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    source: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    strategy: Schema.optional(
      Schema.Union([Schema.Literal("percentage"), Schema.Null]),
    ),
    versions: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            percentage: Schema.Number,
            versionId: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              percentage: "percentage",
              versionId: "version_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    annotations: Schema.optional(
      Schema.Union([
        Schema.Struct({
          workersMessage: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          workersTriggeredBy: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            workersMessage: "workers/message",
            workersTriggeredBy: "workers/triggered_by",
          }),
        ),
        Schema.Null,
      ]),
    ),
    authorEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        source: "source",
        strategy: "strategy",
        versions: "versions",
        annotations: "annotations",
        authorEmail: "author_email",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateScriptDeploymentResponse>;

export type CreateScriptDeploymentError = DefaultErrors | WorkerNotFound;

export const createScriptDeployment: API.OperationMethod<
  CreateScriptDeploymentRequest,
  CreateScriptDeploymentResponse,
  CreateScriptDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScriptDeploymentRequest,
  output: CreateScriptDeploymentResponse,
  errors: [WorkerNotFound],
}));

export interface DeleteScriptDeploymentRequest {
  scriptName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteScriptDeploymentRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/deployments/{deploymentId}",
    }),
  ) as unknown as Schema.Schema<DeleteScriptDeploymentRequest>;

export interface DeleteScriptDeploymentResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteScriptDeploymentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteScriptDeploymentResponse>;

export type DeleteScriptDeploymentError = DefaultErrors | WorkerNotFound;

export const deleteScriptDeployment: API.OperationMethod<
  DeleteScriptDeploymentRequest,
  DeleteScriptDeploymentResponse,
  DeleteScriptDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScriptDeploymentRequest,
  output: DeleteScriptDeploymentResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// ScriptSchedule
// =============================================================================

export interface GetScriptScheduleRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptScheduleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/schedules",
    }),
  ) as unknown as Schema.Schema<GetScriptScheduleRequest>;

export interface GetScriptScheduleResponse {
  schedules: {
    cron: string;
    createdOn?: string | null;
    modifiedOn?: string | null;
  }[];
}

export const GetScriptScheduleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schedules: Schema.Array(
      Schema.Struct({
        cron: Schema.String,
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          cron: "cron",
          createdOn: "created_on",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetScriptScheduleResponse>;

export type GetScriptScheduleError = DefaultErrors | WorkerNotFound;

export const getScriptSchedule: API.OperationMethod<
  GetScriptScheduleRequest,
  GetScriptScheduleResponse,
  GetScriptScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptScheduleRequest,
  output: GetScriptScheduleResponse,
  errors: [WorkerNotFound],
}));

export interface PutScriptScheduleRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: { cron: string }[];
}

export const PutScriptScheduleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(
      Schema.Struct({
        cron: Schema.String,
      }),
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/schedules",
    }),
  ) as unknown as Schema.Schema<PutScriptScheduleRequest>;

export interface PutScriptScheduleResponse {
  schedules: {
    cron: string;
    createdOn?: string | null;
    modifiedOn?: string | null;
  }[];
}

export const PutScriptScheduleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schedules: Schema.Array(
      Schema.Struct({
        cron: Schema.String,
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          cron: "cron",
          createdOn: "created_on",
          modifiedOn: "modified_on",
        }),
      ),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutScriptScheduleResponse>;

export type PutScriptScheduleError = DefaultErrors | WorkerNotFound;

export const putScriptSchedule: API.OperationMethod<
  PutScriptScheduleRequest,
  PutScriptScheduleResponse,
  PutScriptScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutScriptScheduleRequest,
  output: PutScriptScheduleResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// ScriptScriptAndVersionSetting
// =============================================================================

export interface GetScriptScriptAndVersionSettingRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptScriptAndVersionSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/settings",
    }),
  ) as unknown as Schema.Schema<GetScriptScriptAndVersionSettingRequest>;

export interface GetScriptScriptAndVersionSettingResponse {
  /** List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?:
    | (
        | { name: string; type: "ai" }
        | { dataset: string; name: string; type: "analytics_engine" }
        | { name: string; type: "assets" }
        | { name: string; type: "browser" }
        | { id: string; name: string; type: "d1" }
        | { name: string; part: string; type: "data_blob" }
        | {
            name: string;
            namespace: string;
            type: "dispatch_namespace";
            outbound?: {
              params?: string[] | null;
              worker?: {
                environment?: string | null;
                service?: string | null;
              } | null;
            } | null;
          }
        | {
            name: string;
            type: "durable_object_namespace";
            className?: string | null;
            environment?: string | null;
            namespaceId?: string | null;
            scriptName?: string | null;
          }
        | { id: string; name: string; type: "hyperdrive" }
        | {
            name: string;
            type: "inherit";
            oldName?: string | null;
            versionId?: string | null;
          }
        | { name: string; type: "images" }
        | { json: string; name: string; type: "json" }
        | { name: string; namespaceId: string; type: "kv_namespace" }
        | { certificateId: string; name: string; type: "mtls_certificate" }
        | { name: string; text: string; type: "plain_text" }
        | { name: string; pipeline: string; type: "pipelines" }
        | { name: string; queueName: string; type: "queue" }
        | {
            bucketName: string;
            name: string;
            type: "r2_bucket";
            jurisdiction?: "eu" | "fedramp" | null;
          }
        | { name: string; type: "secret_text" }
        | {
            name: string;
            type: "send_email";
            allowedDestinationAddresses?: string[] | null;
            allowedSenderAddresses?: string[] | null;
            destinationAddress?: string | null;
          }
        | {
            name: string;
            service: string;
            type: "service";
            environment?: string | null;
          }
        | { name: string; part: string; type: "text_blob" }
        | { indexName: string; name: string; type: "vectorize" }
        | { name: string; type: "version_metadata" }
        | {
            name: string;
            secretName: string;
            storeId: string;
            type: "secrets_store_secret";
          }
        | {
            algorithm: unknown;
            format: "raw" | "pkcs8" | "spki" | "jwk";
            name: string;
            type: "secret_key";
            usages: (
              | "encrypt"
              | "decrypt"
              | "sign"
              | "verify"
              | "deriveKey"
              | "deriveBits"
              | "wrapKey"
              | "unwrapKey"
            )[];
          }
        | {
            name: string;
            type: "workflow";
            workflowName: string;
            className?: string | null;
            scriptName?: string | null;
          }
        | { name: string; part: string; type: "wasm_module" }
      )[]
    | null;
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string | null;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[] | null;
  /** Limits to apply for this Worker. */
  limits?: { cpuMs?: number | null } | null;
  /** Whether Logpush is turned on for the Worker. */
  logpush?: boolean | null;
  /** Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[] | null;
      headSamplingRate?: number | null;
      persist?: boolean | null;
    } | null;
  } | null;
  /** Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify either mode for Smart Placement, or one of region/hostname/host for targeted place */
  placement?: unknown | null;
  /** Tags associated with the Worker. */
  tags?: string[] | null;
  /** List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
  /** Usage model for the Worker invocations. */
  usageModel?: "standard" | "bundled" | "unbound" | null;
}

export const GetScriptScriptAndVersionSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bindings: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("ai"),
            }),
            Schema.Struct({
              dataset: Schema.String,
              name: Schema.String,
              type: Schema.Literal("analytics_engine"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("assets"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("browser"),
            }),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("d1"),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("data_blob"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespace: Schema.String,
              type: Schema.Literal("dispatch_namespace"),
              outbound: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    params: Schema.optional(
                      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                    ),
                    worker: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          environment: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          service: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.Null,
                      ]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("durable_object_namespace"),
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              namespaceId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                className: "class_name",
                environment: "environment",
                namespaceId: "namespace_id",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("hyperdrive"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("inherit"),
              oldName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              versionId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                oldName: "old_name",
                versionId: "version_id",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("images"),
            }),
            Schema.Struct({
              json: Schema.String,
              name: Schema.String,
              type: Schema.Literal("json"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespaceId: Schema.String,
              type: Schema.Literal("kv_namespace"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                namespaceId: "namespace_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              certificateId: Schema.String,
              name: Schema.String,
              type: Schema.Literal("mtls_certificate"),
            }).pipe(
              Schema.encodeKeys({
                certificateId: "certificate_id",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("plain_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              pipeline: Schema.String,
              type: Schema.Literal("pipelines"),
            }),
            Schema.Struct({
              name: Schema.String,
              queueName: Schema.String,
              type: Schema.Literal("queue"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                queueName: "queue_name",
                type: "type",
              }),
            ),
            Schema.Struct({
              bucketName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("r2_bucket"),
              jurisdiction: Schema.optional(
                Schema.Union([Schema.Literals(["eu", "fedramp"]), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                bucketName: "bucket_name",
                name: "name",
                type: "type",
                jurisdiction: "jurisdiction",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("secret_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("send_email"),
              allowedDestinationAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              allowedSenderAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              destinationAddress: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                allowedDestinationAddresses: "allowed_destination_addresses",
                allowedSenderAddresses: "allowed_sender_addresses",
                destinationAddress: "destination_address",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              service: Schema.String,
              type: Schema.Literal("service"),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("text_blob"),
            }),
            Schema.Struct({
              indexName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("vectorize"),
            }).pipe(
              Schema.encodeKeys({
                indexName: "index_name",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("version_metadata"),
            }),
            Schema.Struct({
              name: Schema.String,
              secretName: Schema.String,
              storeId: Schema.String,
              type: Schema.Literal("secrets_store_secret"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                secretName: "secret_name",
                storeId: "store_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              algorithm: Schema.Unknown,
              format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
              name: Schema.String,
              type: Schema.Literal("secret_key"),
              usages: Schema.Array(
                Schema.Literals([
                  "encrypt",
                  "decrypt",
                  "sign",
                  "verify",
                  "deriveKey",
                  "deriveBits",
                  "wrapKey",
                  "unwrapKey",
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("workflow"),
              workflowName: Schema.String,
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                workflowName: "workflow_name",
                className: "class_name",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("wasm_module"),
            }),
          ]),
        ),
        Schema.Null,
      ]),
    ),
    compatibilityDate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    compatibilityFlags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    limits: Schema.optional(
      Schema.Union([
        Schema.Struct({
          cpuMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
        Schema.Null,
      ]),
    ),
    logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    observability: Schema.optional(
      Schema.Union([
        Schema.Struct({
          enabled: Schema.Boolean,
          headSamplingRate: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          logs: Schema.optional(
            Schema.Union([
              Schema.Struct({
                enabled: Schema.Boolean,
                invocationLogs: Schema.Boolean,
                destinations: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                headSamplingRate: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                persist: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  enabled: "enabled",
                  invocationLogs: "invocation_logs",
                  destinations: "destinations",
                  headSamplingRate: "head_sampling_rate",
                  persist: "persist",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            enabled: "enabled",
            headSamplingRate: "head_sampling_rate",
            logs: "logs",
          }),
        ),
        Schema.Null,
      ]),
    ),
    placement: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    tags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    tailConsumers: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    usageModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["standard", "bundled", "unbound"]),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        bindings: "bindings",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        limits: "limits",
        logpush: "logpush",
        observability: "observability",
        placement: "placement",
        tags: "tags",
        tailConsumers: "tail_consumers",
        usageModel: "usage_model",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetScriptScriptAndVersionSettingResponse>;

export type GetScriptScriptAndVersionSettingError =
  | DefaultErrors
  | WorkerNotFound;

export const getScriptScriptAndVersionSetting: API.OperationMethod<
  GetScriptScriptAndVersionSettingRequest,
  GetScriptScriptAndVersionSettingResponse,
  GetScriptScriptAndVersionSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptScriptAndVersionSettingRequest,
  output: GetScriptScriptAndVersionSettingResponse,
  errors: [WorkerNotFound],
}));

export interface PatchScriptScriptAndVersionSettingRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  settings?: {
    bindings?: (
      | { name: string; type: "ai" }
      | { dataset: string; name: string; type: "analytics_engine" }
      | { name: string; type: "assets" }
      | { name: string; type: "browser" }
      | { id: string; name: string; type: "d1" }
      | { name: string; part: string; type: "data_blob" }
      | {
          name: string;
          namespace: string;
          type: "dispatch_namespace";
          outbound?: {
            params?: string[];
            worker?: { environment?: string; service?: string };
          };
        }
      | {
          name: string;
          type: "durable_object_namespace";
          className?: string;
          environment?: string;
          namespaceId?: string;
          scriptName?: string;
        }
      | { id: string; name: string; type: "hyperdrive" }
      | { name: string; type: "inherit"; oldName?: string; versionId?: string }
      | { name: string; type: "images" }
      | { json: string; name: string; type: "json" }
      | { name: string; namespaceId: string; type: "kv_namespace" }
      | { certificateId: string; name: string; type: "mtls_certificate" }
      | { name: string; text: string; type: "plain_text" }
      | { name: string; pipeline: string; type: "pipelines" }
      | { name: string; queueName: string; type: "queue" }
      | {
          bucketName: string;
          name: string;
          type: "r2_bucket";
          jurisdiction?: "eu" | "fedramp";
        }
      | { name: string; text: string; type: "secret_text" }
      | {
          name: string;
          type: "send_email";
          allowedDestinationAddresses?: string[];
          allowedSenderAddresses?: string[];
          destinationAddress?: string;
        }
      | { name: string; service: string; type: "service"; environment?: string }
      | { name: string; part: string; type: "text_blob" }
      | { indexName: string; name: string; type: "vectorize" }
      | { name: string; type: "version_metadata" }
      | {
          name: string;
          secretName: string;
          storeId: string;
          type: "secrets_store_secret";
        }
      | {
          algorithm: unknown;
          format: "raw" | "pkcs8" | "spki" | "jwk";
          name: string;
          type: "secret_key";
          usages: (
            | "encrypt"
            | "decrypt"
            | "sign"
            | "verify"
            | "deriveKey"
            | "deriveBits"
            | "wrapKey"
            | "unwrapKey"
          )[];
          keyBase64?: string;
          keyJwk?: unknown;
        }
      | {
          name: string;
          type: "workflow";
          workflowName: string;
          className?: string;
          scriptName?: string;
        }
      | { name: string; part: string; type: "wasm_module" }
    )[];
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    limits?: { cpuMs?: number };
    logpush?: boolean;
    migrations?:
      | unknown
      | { newTag?: string; oldTag?: string; steps?: unknown[] };
    observability?: {
      enabled: boolean;
      headSamplingRate?: number | null;
      logs?: {
        enabled: boolean;
        invocationLogs: boolean;
        destinations?: string[];
        headSamplingRate?: number | null;
        persist?: boolean;
      } | null;
    };
    placement?:
      | { mode: "smart" }
      | { region: string }
      | { hostname: string }
      | { host: string };
    tags?: string[] | null;
    tailConsumers?: unknown[] | null;
    usageModel?: "standard" | "bundled" | "unbound";
  };
}

export const PatchScriptScriptAndVersionSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    settings: Schema.optional(
      Schema.Struct({
        bindings: Schema.optional(
          Schema.Array(
            Schema.Union([
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("ai"),
              }),
              Schema.Struct({
                dataset: Schema.String,
                name: Schema.String,
                type: Schema.Literal("analytics_engine"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("assets"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("browser"),
              }),
              Schema.Struct({
                id: Schema.String,
                name: Schema.String,
                type: Schema.Literal("d1"),
              }),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("data_blob"),
              }),
              Schema.Struct({
                name: Schema.String,
                namespace: Schema.String,
                type: Schema.Literal("dispatch_namespace"),
                outbound: Schema.optional(
                  Schema.Struct({
                    params: Schema.optional(Schema.Array(Schema.String)),
                    worker: Schema.optional(
                      Schema.Struct({
                        environment: Schema.optional(Schema.String),
                        service: Schema.optional(Schema.String),
                      }),
                    ),
                  }),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("durable_object_namespace"),
                className: Schema.optional(Schema.String),
                environment: Schema.optional(Schema.String),
                namespaceId: Schema.optional(Schema.String),
                scriptName: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  className: "class_name",
                  environment: "environment",
                  namespaceId: "namespace_id",
                  scriptName: "script_name",
                }),
              ),
              Schema.Struct({
                id: Schema.String,
                name: Schema.String,
                type: Schema.Literal("hyperdrive"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("inherit"),
                oldName: Schema.optional(Schema.String),
                versionId: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  oldName: "old_name",
                  versionId: "version_id",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("images"),
              }),
              Schema.Struct({
                json: Schema.String,
                name: Schema.String,
                type: Schema.Literal("json"),
              }),
              Schema.Struct({
                name: Schema.String,
                namespaceId: Schema.String,
                type: Schema.Literal("kv_namespace"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  namespaceId: "namespace_id",
                  type: "type",
                }),
              ),
              Schema.Struct({
                certificateId: Schema.String,
                name: Schema.String,
                type: Schema.Literal("mtls_certificate"),
              }).pipe(
                Schema.encodeKeys({
                  certificateId: "certificate_id",
                  name: "name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                text: Schema.String,
                type: Schema.Literal("plain_text"),
              }),
              Schema.Struct({
                name: Schema.String,
                pipeline: Schema.String,
                type: Schema.Literal("pipelines"),
              }),
              Schema.Struct({
                name: Schema.String,
                queueName: Schema.String,
                type: Schema.Literal("queue"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  queueName: "queue_name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                bucketName: Schema.String,
                name: Schema.String,
                type: Schema.Literal("r2_bucket"),
                jurisdiction: Schema.optional(
                  Schema.Literals(["eu", "fedramp"]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  bucketName: "bucket_name",
                  name: "name",
                  type: "type",
                  jurisdiction: "jurisdiction",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                text: Schema.String,
                type: Schema.Literal("secret_text"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("send_email"),
                allowedDestinationAddresses: Schema.optional(
                  Schema.Array(Schema.String),
                ),
                allowedSenderAddresses: Schema.optional(
                  Schema.Array(Schema.String),
                ),
                destinationAddress: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  allowedDestinationAddresses: "allowed_destination_addresses",
                  allowedSenderAddresses: "allowed_sender_addresses",
                  destinationAddress: "destination_address",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                service: Schema.String,
                type: Schema.Literal("service"),
                environment: Schema.optional(Schema.String),
              }),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("text_blob"),
              }),
              Schema.Struct({
                indexName: Schema.String,
                name: Schema.String,
                type: Schema.Literal("vectorize"),
              }).pipe(
                Schema.encodeKeys({
                  indexName: "index_name",
                  name: "name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("version_metadata"),
              }),
              Schema.Struct({
                name: Schema.String,
                secretName: Schema.String,
                storeId: Schema.String,
                type: Schema.Literal("secrets_store_secret"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  secretName: "secret_name",
                  storeId: "store_id",
                  type: "type",
                }),
              ),
              Schema.Struct({
                algorithm: Schema.Unknown,
                format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
                name: Schema.String,
                type: Schema.Literal("secret_key"),
                usages: Schema.Array(
                  Schema.Literals([
                    "encrypt",
                    "decrypt",
                    "sign",
                    "verify",
                    "deriveKey",
                    "deriveBits",
                    "wrapKey",
                    "unwrapKey",
                  ]),
                ),
                keyBase64: Schema.optional(Schema.String),
                keyJwk: Schema.optional(Schema.Unknown),
              }).pipe(
                Schema.encodeKeys({
                  algorithm: "algorithm",
                  format: "format",
                  name: "name",
                  type: "type",
                  usages: "usages",
                  keyBase64: "key_base64",
                  keyJwk: "key_jwk",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("workflow"),
                workflowName: Schema.String,
                className: Schema.optional(Schema.String),
                scriptName: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  workflowName: "workflow_name",
                  className: "class_name",
                  scriptName: "script_name",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("wasm_module"),
              }),
            ]),
          ),
        ),
        compatibilityDate: Schema.optional(Schema.String),
        compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
        limits: Schema.optional(
          Schema.Struct({
            cpuMs: Schema.optional(Schema.Number),
          }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
        ),
        logpush: Schema.optional(Schema.Boolean),
        migrations: Schema.optional(
          Schema.Union([
            Schema.Unknown,
            Schema.Struct({
              newTag: Schema.optional(Schema.String),
              oldTag: Schema.optional(Schema.String),
              steps: Schema.optional(Schema.Array(Schema.Unknown)),
            }).pipe(
              Schema.encodeKeys({
                newTag: "new_tag",
                oldTag: "old_tag",
                steps: "steps",
              }),
            ),
          ]),
        ),
        observability: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            headSamplingRate: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            logs: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  enabled: Schema.Boolean,
                  invocationLogs: Schema.Boolean,
                  destinations: Schema.optional(Schema.Array(Schema.String)),
                  headSamplingRate: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  persist: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    enabled: "enabled",
                    invocationLogs: "invocation_logs",
                    destinations: "destinations",
                    headSamplingRate: "head_sampling_rate",
                    persist: "persist",
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              headSamplingRate: "head_sampling_rate",
              logs: "logs",
            }),
          ),
        ),
        placement: Schema.optional(
          Schema.Union([
            Schema.Struct({
              mode: Schema.Literal("smart"),
            }),
            Schema.Struct({
              region: Schema.String,
            }),
            Schema.Struct({
              hostname: Schema.String,
            }),
            Schema.Struct({
              host: Schema.String,
            }),
          ]),
        ),
        tags: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        tailConsumers: Schema.optional(
          Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
        ),
        usageModel: Schema.optional(
          Schema.Literals(["standard", "bundled", "unbound"]),
        ),
      }).pipe(
        Schema.encodeKeys({
          bindings: "bindings",
          compatibilityDate: "compatibility_date",
          compatibilityFlags: "compatibility_flags",
          limits: "limits",
          logpush: "logpush",
          migrations: "migrations",
          observability: "observability",
          placement: "placement",
          tags: "tags",
          tailConsumers: "tail_consumers",
          usageModel: "usage_model",
        }),
      ),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/settings",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<PatchScriptScriptAndVersionSettingRequest>;

export interface PatchScriptScriptAndVersionSettingResponse {
  /** List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?:
    | (
        | { name: string; type: "ai" }
        | { dataset: string; name: string; type: "analytics_engine" }
        | { name: string; type: "assets" }
        | { name: string; type: "browser" }
        | { id: string; name: string; type: "d1" }
        | { name: string; part: string; type: "data_blob" }
        | {
            name: string;
            namespace: string;
            type: "dispatch_namespace";
            outbound?: {
              params?: string[] | null;
              worker?: {
                environment?: string | null;
                service?: string | null;
              } | null;
            } | null;
          }
        | {
            name: string;
            type: "durable_object_namespace";
            className?: string | null;
            environment?: string | null;
            namespaceId?: string | null;
            scriptName?: string | null;
          }
        | { id: string; name: string; type: "hyperdrive" }
        | {
            name: string;
            type: "inherit";
            oldName?: string | null;
            versionId?: string | null;
          }
        | { name: string; type: "images" }
        | { json: string; name: string; type: "json" }
        | { name: string; namespaceId: string; type: "kv_namespace" }
        | { certificateId: string; name: string; type: "mtls_certificate" }
        | { name: string; text: string; type: "plain_text" }
        | { name: string; pipeline: string; type: "pipelines" }
        | { name: string; queueName: string; type: "queue" }
        | {
            bucketName: string;
            name: string;
            type: "r2_bucket";
            jurisdiction?: "eu" | "fedramp" | null;
          }
        | { name: string; type: "secret_text" }
        | {
            name: string;
            type: "send_email";
            allowedDestinationAddresses?: string[] | null;
            allowedSenderAddresses?: string[] | null;
            destinationAddress?: string | null;
          }
        | {
            name: string;
            service: string;
            type: "service";
            environment?: string | null;
          }
        | { name: string; part: string; type: "text_blob" }
        | { indexName: string; name: string; type: "vectorize" }
        | { name: string; type: "version_metadata" }
        | {
            name: string;
            secretName: string;
            storeId: string;
            type: "secrets_store_secret";
          }
        | {
            algorithm: unknown;
            format: "raw" | "pkcs8" | "spki" | "jwk";
            name: string;
            type: "secret_key";
            usages: (
              | "encrypt"
              | "decrypt"
              | "sign"
              | "verify"
              | "deriveKey"
              | "deriveBits"
              | "wrapKey"
              | "unwrapKey"
            )[];
          }
        | {
            name: string;
            type: "workflow";
            workflowName: string;
            className?: string | null;
            scriptName?: string | null;
          }
        | { name: string; part: string; type: "wasm_module" }
      )[]
    | null;
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string | null;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[] | null;
  /** Limits to apply for this Worker. */
  limits?: { cpuMs?: number | null } | null;
  /** Whether Logpush is turned on for the Worker. */
  logpush?: boolean | null;
  /** Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[] | null;
      headSamplingRate?: number | null;
      persist?: boolean | null;
    } | null;
  } | null;
  /** Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify either mode for Smart Placement, or one of region/hostname/host for targeted place */
  placement?: unknown | null;
  /** Tags associated with the Worker. */
  tags?: string[] | null;
  /** List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
  /** Usage model for the Worker invocations. */
  usageModel?: "standard" | "bundled" | "unbound" | null;
}

export const PatchScriptScriptAndVersionSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bindings: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("ai"),
            }),
            Schema.Struct({
              dataset: Schema.String,
              name: Schema.String,
              type: Schema.Literal("analytics_engine"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("assets"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("browser"),
            }),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("d1"),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("data_blob"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespace: Schema.String,
              type: Schema.Literal("dispatch_namespace"),
              outbound: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    params: Schema.optional(
                      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                    ),
                    worker: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          environment: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                          service: Schema.optional(
                            Schema.Union([Schema.String, Schema.Null]),
                          ),
                        }),
                        Schema.Null,
                      ]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("durable_object_namespace"),
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              namespaceId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                className: "class_name",
                environment: "environment",
                namespaceId: "namespace_id",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("hyperdrive"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("inherit"),
              oldName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              versionId: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                oldName: "old_name",
                versionId: "version_id",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("images"),
            }),
            Schema.Struct({
              json: Schema.String,
              name: Schema.String,
              type: Schema.Literal("json"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespaceId: Schema.String,
              type: Schema.Literal("kv_namespace"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                namespaceId: "namespace_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              certificateId: Schema.String,
              name: Schema.String,
              type: Schema.Literal("mtls_certificate"),
            }).pipe(
              Schema.encodeKeys({
                certificateId: "certificate_id",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("plain_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              pipeline: Schema.String,
              type: Schema.Literal("pipelines"),
            }),
            Schema.Struct({
              name: Schema.String,
              queueName: Schema.String,
              type: Schema.Literal("queue"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                queueName: "queue_name",
                type: "type",
              }),
            ),
            Schema.Struct({
              bucketName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("r2_bucket"),
              jurisdiction: Schema.optional(
                Schema.Union([Schema.Literals(["eu", "fedramp"]), Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                bucketName: "bucket_name",
                name: "name",
                type: "type",
                jurisdiction: "jurisdiction",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("secret_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("send_email"),
              allowedDestinationAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              allowedSenderAddresses: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              destinationAddress: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                allowedDestinationAddresses: "allowed_destination_addresses",
                allowedSenderAddresses: "allowed_sender_addresses",
                destinationAddress: "destination_address",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              service: Schema.String,
              type: Schema.Literal("service"),
              environment: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("text_blob"),
            }),
            Schema.Struct({
              indexName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("vectorize"),
            }).pipe(
              Schema.encodeKeys({
                indexName: "index_name",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("version_metadata"),
            }),
            Schema.Struct({
              name: Schema.String,
              secretName: Schema.String,
              storeId: Schema.String,
              type: Schema.Literal("secrets_store_secret"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                secretName: "secret_name",
                storeId: "store_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              algorithm: Schema.Unknown,
              format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
              name: Schema.String,
              type: Schema.Literal("secret_key"),
              usages: Schema.Array(
                Schema.Literals([
                  "encrypt",
                  "decrypt",
                  "sign",
                  "verify",
                  "deriveKey",
                  "deriveBits",
                  "wrapKey",
                  "unwrapKey",
                ]),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("workflow"),
              workflowName: Schema.String,
              className: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              scriptName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                workflowName: "workflow_name",
                className: "class_name",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("wasm_module"),
            }),
          ]),
        ),
        Schema.Null,
      ]),
    ),
    compatibilityDate: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    compatibilityFlags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    limits: Schema.optional(
      Schema.Union([
        Schema.Struct({
          cpuMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
        Schema.Null,
      ]),
    ),
    logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    observability: Schema.optional(
      Schema.Union([
        Schema.Struct({
          enabled: Schema.Boolean,
          headSamplingRate: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          logs: Schema.optional(
            Schema.Union([
              Schema.Struct({
                enabled: Schema.Boolean,
                invocationLogs: Schema.Boolean,
                destinations: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                headSamplingRate: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                persist: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  enabled: "enabled",
                  invocationLogs: "invocation_logs",
                  destinations: "destinations",
                  headSamplingRate: "head_sampling_rate",
                  persist: "persist",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            enabled: "enabled",
            headSamplingRate: "head_sampling_rate",
            logs: "logs",
          }),
        ),
        Schema.Null,
      ]),
    ),
    placement: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    tags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    tailConsumers: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    usageModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["standard", "bundled", "unbound"]),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        bindings: "bindings",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        limits: "limits",
        logpush: "logpush",
        observability: "observability",
        placement: "placement",
        tags: "tags",
        tailConsumers: "tail_consumers",
        usageModel: "usage_model",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchScriptScriptAndVersionSettingResponse>;

export type PatchScriptScriptAndVersionSettingError =
  | DefaultErrors
  | WorkerNotFound
  | ContentTypeRequired;

export const patchScriptScriptAndVersionSetting: API.OperationMethod<
  PatchScriptScriptAndVersionSettingRequest,
  PatchScriptScriptAndVersionSettingResponse,
  PatchScriptScriptAndVersionSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchScriptScriptAndVersionSettingRequest,
  output: PatchScriptScriptAndVersionSettingResponse,
  errors: [WorkerNotFound, ContentTypeRequired],
}));

// =============================================================================
// ScriptSecret
// =============================================================================

export interface GetScriptSecretRequest {
  scriptName: string;
  secretName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Flag that indicates whether the secret name is URL encoded. */
  urlEncoded?: boolean;
}

export const GetScriptSecretRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    secretName: Schema.String.pipe(T.HttpPath("secretName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    urlEncoded: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("url_encoded"),
    ),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/scripts/{scriptName}/secrets/{secretName}",
  }),
) as unknown as Schema.Schema<GetScriptSecretRequest>;

export type GetScriptSecretResponse =
  | { name: string; type: "secret_text" }
  | {
      algorithm: unknown;
      format: "raw" | "pkcs8" | "spki" | "jwk";
      name: string;
      type: "secret_key";
      usages: (
        | "encrypt"
        | "decrypt"
        | "sign"
        | "verify"
        | "deriveKey"
        | "deriveBits"
        | "wrapKey"
        | "unwrapKey"
      )[];
    };

export const GetScriptSecretResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union(
  [
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("secret_text"),
    }),
    Schema.Struct({
      algorithm: Schema.Unknown,
      format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
      name: Schema.String,
      type: Schema.Literal("secret_key"),
      usages: Schema.Array(
        Schema.Literals([
          "encrypt",
          "decrypt",
          "sign",
          "verify",
          "deriveKey",
          "deriveBits",
          "wrapKey",
          "unwrapKey",
        ]),
      ),
    }),
  ],
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetScriptSecretResponse>;

export type GetScriptSecretError =
  | DefaultErrors
  | WorkerNotFound
  | SecretNotFound;

export const getScriptSecret: API.OperationMethod<
  GetScriptSecretRequest,
  GetScriptSecretResponse,
  GetScriptSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptSecretRequest,
  output: GetScriptSecretResponse,
  errors: [WorkerNotFound, SecretNotFound],
}));

export interface ListScriptSecretsRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const ListScriptSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/secrets",
    }),
  ) as unknown as Schema.Schema<ListScriptSecretsRequest>;

export interface ListScriptSecretsResponse {
  result: (
    | { name: string; type: "secret_text" }
    | {
        algorithm: unknown;
        format: "raw" | "pkcs8" | "spki" | "jwk";
        name: string;
        type: "secret_key";
        usages: (
          | "encrypt"
          | "decrypt"
          | "sign"
          | "verify"
          | "deriveKey"
          | "deriveBits"
          | "wrapKey"
          | "unwrapKey"
        )[];
      }
  )[];
}

export const ListScriptSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Union([
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("secret_text"),
        }),
        Schema.Struct({
          algorithm: Schema.Unknown,
          format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
          name: Schema.String,
          type: Schema.Literal("secret_key"),
          usages: Schema.Array(
            Schema.Literals([
              "encrypt",
              "decrypt",
              "sign",
              "verify",
              "deriveKey",
              "deriveBits",
              "wrapKey",
              "unwrapKey",
            ]),
          ),
        }),
      ]),
    ),
  }) as unknown as Schema.Schema<ListScriptSecretsResponse>;

export type ListScriptSecretsError = DefaultErrors | WorkerNotFound;

export const listScriptSecrets: API.PaginatedOperationMethod<
  ListScriptSecretsRequest,
  ListScriptSecretsResponse,
  ListScriptSecretsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListScriptSecretsRequest,
  ) => stream.Stream<
    ListScriptSecretsResponse,
    ListScriptSecretsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListScriptSecretsRequest,
  ) => stream.Stream<
    | { name: string; type: "secret_text" }
    | {
        algorithm: unknown;
        format: "raw" | "pkcs8" | "spki" | "jwk";
        name: string;
        type: "secret_key";
        usages: (
          | "encrypt"
          | "decrypt"
          | "sign"
          | "verify"
          | "deriveKey"
          | "deriveBits"
          | "wrapKey"
          | "unwrapKey"
        )[];
      },
    ListScriptSecretsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScriptSecretsRequest,
  output: ListScriptSecretsResponse,
  errors: [WorkerNotFound],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface PutScriptSecretRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A JavaScript variable name for the binding. */
  name: string;
  /** Body param: The secret value to use. */
  text: string;
  /** Body param: The kind of resource that the binding provides. */
  type: "secret_text";
}

export const PutScriptSecretRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    text: Schema.String,
    type: Schema.Literal("secret_text"),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/workers/scripts/{scriptName}/secrets",
  }),
) as unknown as Schema.Schema<PutScriptSecretRequest>;

export type PutScriptSecretResponse =
  | { name: string; type: "secret_text" }
  | {
      algorithm: unknown;
      format: "raw" | "pkcs8" | "spki" | "jwk";
      name: string;
      type: "secret_key";
      usages: (
        | "encrypt"
        | "decrypt"
        | "sign"
        | "verify"
        | "deriveKey"
        | "deriveBits"
        | "wrapKey"
        | "unwrapKey"
      )[];
    };

export const PutScriptSecretResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union(
  [
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("secret_text"),
    }),
    Schema.Struct({
      algorithm: Schema.Unknown,
      format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
      name: Schema.String,
      type: Schema.Literal("secret_key"),
      usages: Schema.Array(
        Schema.Literals([
          "encrypt",
          "decrypt",
          "sign",
          "verify",
          "deriveKey",
          "deriveBits",
          "wrapKey",
          "unwrapKey",
        ]),
      ),
    }),
  ],
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<PutScriptSecretResponse>;

export type PutScriptSecretError = DefaultErrors | WorkerNotFound;

export const putScriptSecret: API.OperationMethod<
  PutScriptSecretRequest,
  PutScriptSecretResponse,
  PutScriptSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutScriptSecretRequest,
  output: PutScriptSecretResponse,
  errors: [WorkerNotFound],
}));

export interface DeleteScriptSecretRequest {
  scriptName: string;
  secretName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Flag that indicates whether the secret name is URL encoded. */
  urlEncoded?: boolean;
}

export const DeleteScriptSecretRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    secretName: Schema.String.pipe(T.HttpPath("secretName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    urlEncoded: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("url_encoded"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/secrets/{secretName}",
    }),
  ) as unknown as Schema.Schema<DeleteScriptSecretRequest>;

export type DeleteScriptSecretResponse = unknown;

export const DeleteScriptSecretResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteScriptSecretResponse>;

export type DeleteScriptSecretError =
  | DefaultErrors
  | WorkerNotFound
  | SecretNotFound;

export const deleteScriptSecret: API.OperationMethod<
  DeleteScriptSecretRequest,
  DeleteScriptSecretResponse,
  DeleteScriptSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScriptSecretRequest,
  output: DeleteScriptSecretResponse,
  errors: [WorkerNotFound, SecretNotFound],
}));

// =============================================================================
// ScriptSetting
// =============================================================================

export interface GetScriptSettingRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/script-settings",
    }),
  ) as unknown as Schema.Schema<GetScriptSettingRequest>;

export type GetScriptSettingResponse = unknown;

export const GetScriptSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetScriptSettingResponse>;

export type GetScriptSettingError = DefaultErrors | WorkerNotFound;

export const getScriptSetting: API.OperationMethod<
  GetScriptSettingRequest,
  GetScriptSettingResponse,
  GetScriptSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptSettingRequest,
  output: GetScriptSettingResponse,
  errors: [WorkerNotFound],
}));

export interface PatchScriptSettingRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Whether Logpush is turned on for the Worker. */
  logpush?: boolean;
  /** Body param: Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[];
      headSamplingRate?: number | null;
      persist?: boolean;
    } | null;
  } | null;
  /** Body param: Tags associated with the Worker. */
  tags?: string[] | null;
  /** Body param: List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
}

export const PatchScriptSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    logpush: Schema.optional(Schema.Boolean),
    observability: Schema.optional(
      Schema.Union([
        Schema.Struct({
          enabled: Schema.Boolean,
          headSamplingRate: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          logs: Schema.optional(
            Schema.Union([
              Schema.Struct({
                enabled: Schema.Boolean,
                invocationLogs: Schema.Boolean,
                destinations: Schema.optional(Schema.Array(Schema.String)),
                headSamplingRate: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                persist: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  enabled: "enabled",
                  invocationLogs: "invocation_logs",
                  destinations: "destinations",
                  headSamplingRate: "head_sampling_rate",
                  persist: "persist",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            enabled: "enabled",
            headSamplingRate: "head_sampling_rate",
            logs: "logs",
          }),
        ),
        Schema.Null,
      ]),
    ),
    tags: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    tailConsumers: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      logpush: "logpush",
      observability: "observability",
      tags: "tags",
      tailConsumers: "tail_consumers",
    }),
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/script-settings",
    }),
  ) as unknown as Schema.Schema<PatchScriptSettingRequest>;

export type PatchScriptSettingResponse = unknown;

export const PatchScriptSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PatchScriptSettingResponse>;

export type PatchScriptSettingError = DefaultErrors | WorkerNotFound;

export const patchScriptSetting: API.OperationMethod<
  PatchScriptSettingRequest,
  PatchScriptSettingResponse,
  PatchScriptSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchScriptSettingRequest,
  output: PatchScriptSettingResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// ScriptSubdomain
// =============================================================================

export interface GetScriptSubdomainRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptSubdomainRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/subdomain",
    }),
  ) as unknown as Schema.Schema<GetScriptSubdomainRequest>;

export interface GetScriptSubdomainResponse {
  /** Whether the Worker is available on the workers.dev subdomain. */
  enabled: boolean;
  /** Whether the Worker's Preview URLs are available on the workers.dev subdomain. */
  previewsEnabled: boolean;
}

export const GetScriptSubdomainResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.Boolean,
    previewsEnabled: Schema.Boolean,
  })
    .pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        previewsEnabled: "previews_enabled",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetScriptSubdomainResponse>;

export type GetScriptSubdomainError = DefaultErrors | WorkerNotFound;

export const getScriptSubdomain: API.OperationMethod<
  GetScriptSubdomainRequest,
  GetScriptSubdomainResponse,
  GetScriptSubdomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptSubdomainRequest,
  output: GetScriptSubdomainResponse,
  errors: [WorkerNotFound],
}));

export interface CreateScriptSubdomainRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Whether the Worker should be available on the workers.dev subdomain. */
  enabled: boolean;
  /** Body param: Whether the Worker's Preview URLs should be available on the workers.dev subdomain. */
  previewsEnabled?: boolean;
}

export const CreateScriptSubdomainRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    enabled: Schema.Boolean,
    previewsEnabled: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      enabled: "enabled",
      previewsEnabled: "previews_enabled",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/subdomain",
    }),
  ) as unknown as Schema.Schema<CreateScriptSubdomainRequest>;

export interface CreateScriptSubdomainResponse {
  /** Whether the Worker is available on the workers.dev subdomain. */
  enabled: boolean;
  /** Whether the Worker's Preview URLs are available on the workers.dev subdomain. */
  previewsEnabled: boolean;
}

export const CreateScriptSubdomainResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.Boolean,
    previewsEnabled: Schema.Boolean,
  })
    .pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        previewsEnabled: "previews_enabled",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateScriptSubdomainResponse>;

export type CreateScriptSubdomainError = DefaultErrors | WorkerNotFound;

export const createScriptSubdomain: API.OperationMethod<
  CreateScriptSubdomainRequest,
  CreateScriptSubdomainResponse,
  CreateScriptSubdomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScriptSubdomainRequest,
  output: CreateScriptSubdomainResponse,
  errors: [WorkerNotFound],
}));

export interface DeleteScriptSubdomainRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteScriptSubdomainRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/subdomain",
    }),
  ) as unknown as Schema.Schema<DeleteScriptSubdomainRequest>;

export interface DeleteScriptSubdomainResponse {
  /** Whether the Worker is available on the workers.dev subdomain. */
  enabled: boolean;
  /** Whether the Worker's Preview URLs are available on the workers.dev subdomain. */
  previewsEnabled: boolean;
}

export const DeleteScriptSubdomainResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.Boolean,
    previewsEnabled: Schema.Boolean,
  })
    .pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        previewsEnabled: "previews_enabled",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteScriptSubdomainResponse>;

export type DeleteScriptSubdomainError = DefaultErrors | WorkerNotFound;

export const deleteScriptSubdomain: API.OperationMethod<
  DeleteScriptSubdomainRequest,
  DeleteScriptSubdomainResponse,
  DeleteScriptSubdomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScriptSubdomainRequest,
  output: DeleteScriptSubdomainResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// ScriptTail
// =============================================================================

export interface GetScriptTailRequest {
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptTailRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/scripts/{scriptName}/tails",
  }),
) as unknown as Schema.Schema<GetScriptTailRequest>;

export interface GetScriptTailResponse {
  /** Identifier. */
  id: string;
  expiresAt: string;
  url: string;
}

export const GetScriptTailResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  expiresAt: Schema.String,
  url: Schema.String,
})
  .pipe(Schema.encodeKeys({ id: "id", expiresAt: "expires_at", url: "url" }))
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetScriptTailResponse>;

export type GetScriptTailError = DefaultErrors | WorkerNotFound;

export const getScriptTail: API.OperationMethod<
  GetScriptTailRequest,
  GetScriptTailResponse,
  GetScriptTailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptTailRequest,
  output: GetScriptTailResponse,
  errors: [WorkerNotFound],
}));

export interface CreateScriptTailRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const CreateScriptTailRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Unknown.pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/tails",
    }),
  ) as unknown as Schema.Schema<CreateScriptTailRequest>;

export interface CreateScriptTailResponse {
  /** Identifier. */
  id: string;
  expiresAt: string;
  url: string;
}

export const CreateScriptTailResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    expiresAt: Schema.String,
    url: Schema.String,
  })
    .pipe(Schema.encodeKeys({ id: "id", expiresAt: "expires_at", url: "url" }))
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateScriptTailResponse>;

export type CreateScriptTailError = DefaultErrors | WorkerNotFound;

export const createScriptTail: API.OperationMethod<
  CreateScriptTailRequest,
  CreateScriptTailResponse,
  CreateScriptTailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScriptTailRequest,
  output: CreateScriptTailResponse,
  errors: [WorkerNotFound],
}));

export interface DeleteScriptTailRequest {
  scriptName: string;
  id: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteScriptTailRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    id: Schema.String.pipe(T.HttpPath("id")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/tails/{id}",
    }),
  ) as unknown as Schema.Schema<DeleteScriptTailRequest>;

export interface DeleteScriptTailResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteScriptTailResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteScriptTailResponse>;

export type DeleteScriptTailError = DefaultErrors | WorkerNotFound;

export const deleteScriptTail: API.OperationMethod<
  DeleteScriptTailRequest,
  DeleteScriptTailResponse,
  DeleteScriptTailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScriptTailRequest,
  output: DeleteScriptTailResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// ScriptVersion
// =============================================================================

export interface GetScriptVersionRequest {
  scriptName: string;
  versionId: string;
  /** Identifier. */
  accountId: string;
}

export const GetScriptVersionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    versionId: Schema.String.pipe(T.HttpPath("versionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/versions/{versionId}",
    }),
  ) as unknown as Schema.Schema<GetScriptVersionRequest>;

export interface GetScriptVersionResponse {
  resources: {
    bindings?:
      | (
          | { name: string; type: "ai" }
          | { dataset: string; name: string; type: "analytics_engine" }
          | { name: string; type: "assets" }
          | { name: string; type: "browser" }
          | { id: string; name: string; type: "d1" }
          | { name: string; part: string; type: "data_blob" }
          | {
              name: string;
              namespace: string;
              type: "dispatch_namespace";
              outbound?: {
                params?: string[] | null;
                worker?: {
                  environment?: string | null;
                  service?: string | null;
                } | null;
              } | null;
            }
          | {
              name: string;
              type: "durable_object_namespace";
              className?: string | null;
              environment?: string | null;
              namespaceId?: string | null;
              scriptName?: string | null;
            }
          | { id: string; name: string; type: "hyperdrive" }
          | {
              name: string;
              type: "inherit";
              oldName?: string | null;
              versionId?: string | null;
            }
          | { name: string; type: "images" }
          | { json: string; name: string; type: "json" }
          | { name: string; namespaceId: string; type: "kv_namespace" }
          | { certificateId: string; name: string; type: "mtls_certificate" }
          | { name: string; text: string; type: "plain_text" }
          | { name: string; pipeline: string; type: "pipelines" }
          | { name: string; queueName: string; type: "queue" }
          | {
              bucketName: string;
              name: string;
              type: "r2_bucket";
              jurisdiction?: "eu" | "fedramp" | null;
            }
          | { name: string; type: "secret_text" }
          | {
              name: string;
              type: "send_email";
              allowedDestinationAddresses?: string[] | null;
              allowedSenderAddresses?: string[] | null;
              destinationAddress?: string | null;
            }
          | {
              name: string;
              service: string;
              type: "service";
              environment?: string | null;
            }
          | { name: string; part: string; type: "text_blob" }
          | { indexName: string; name: string; type: "vectorize" }
          | { name: string; type: "version_metadata" }
          | {
              name: string;
              secretName: string;
              storeId: string;
              type: "secrets_store_secret";
            }
          | {
              algorithm: unknown;
              format: "raw" | "pkcs8" | "spki" | "jwk";
              name: string;
              type: "secret_key";
              usages: (
                | "encrypt"
                | "decrypt"
                | "sign"
                | "verify"
                | "deriveKey"
                | "deriveBits"
                | "wrapKey"
                | "unwrapKey"
              )[];
            }
          | {
              name: string;
              type: "workflow";
              workflowName: string;
              className?: string | null;
              scriptName?: string | null;
            }
          | { name: string; part: string; type: "wasm_module" }
        )[]
      | null;
    script?: {
      etag?: string | null;
      handlers?: string[] | null;
      lastDeployedFrom?: string | null;
      namedHandlers?:
        | { handlers?: string[] | null; name?: string | null }[]
        | null;
    } | null;
    scriptRuntime?: {
      compatibilityDate?: string | null;
      compatibilityFlags?: string[] | null;
      limits?: { cpuMs?: number | null } | null;
      migrationTag?: string | null;
      usageModel?: "bundled" | "unbound" | "standard" | null;
    } | null;
  };
  /** Unique identifier for the version. */
  id?: string | null;
  metadata?: {
    authorEmail?: string | null;
    authorId?: string | null;
    createdOn?: string | null;
    hasPreview?: boolean | null;
    modifiedOn?: string | null;
    source?:
      | "unknown"
      | "api"
      | "wrangler"
      | "terraform"
      | "dash"
      | "dash_template"
      | "integration"
      | "quick_editor"
      | "playground"
      | "workersci"
      | null;
  } | null;
  /** Sequential version number. */
  number?: number | null;
}

export const GetScriptVersionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resources: Schema.Struct({
      bindings: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Union([
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("ai"),
              }),
              Schema.Struct({
                dataset: Schema.String,
                name: Schema.String,
                type: Schema.Literal("analytics_engine"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("assets"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("browser"),
              }),
              Schema.Struct({
                id: Schema.String,
                name: Schema.String,
                type: Schema.Literal("d1"),
              }),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("data_blob"),
              }),
              Schema.Struct({
                name: Schema.String,
                namespace: Schema.String,
                type: Schema.Literal("dispatch_namespace"),
                outbound: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      params: Schema.optional(
                        Schema.Union([
                          Schema.Array(Schema.String),
                          Schema.Null,
                        ]),
                      ),
                      worker: Schema.optional(
                        Schema.Union([
                          Schema.Struct({
                            environment: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            service: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                          }),
                          Schema.Null,
                        ]),
                      ),
                    }),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("durable_object_namespace"),
                className: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                environment: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                namespaceId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                scriptName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  className: "class_name",
                  environment: "environment",
                  namespaceId: "namespace_id",
                  scriptName: "script_name",
                }),
              ),
              Schema.Struct({
                id: Schema.String,
                name: Schema.String,
                type: Schema.Literal("hyperdrive"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("inherit"),
                oldName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                versionId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  oldName: "old_name",
                  versionId: "version_id",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("images"),
              }),
              Schema.Struct({
                json: Schema.String,
                name: Schema.String,
                type: Schema.Literal("json"),
              }),
              Schema.Struct({
                name: Schema.String,
                namespaceId: Schema.String,
                type: Schema.Literal("kv_namespace"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  namespaceId: "namespace_id",
                  type: "type",
                }),
              ),
              Schema.Struct({
                certificateId: Schema.String,
                name: Schema.String,
                type: Schema.Literal("mtls_certificate"),
              }).pipe(
                Schema.encodeKeys({
                  certificateId: "certificate_id",
                  name: "name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                text: Schema.String,
                type: Schema.Literal("plain_text"),
              }),
              Schema.Struct({
                name: Schema.String,
                pipeline: Schema.String,
                type: Schema.Literal("pipelines"),
              }),
              Schema.Struct({
                name: Schema.String,
                queueName: Schema.String,
                type: Schema.Literal("queue"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  queueName: "queue_name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                bucketName: Schema.String,
                name: Schema.String,
                type: Schema.Literal("r2_bucket"),
                jurisdiction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["eu", "fedramp"]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  bucketName: "bucket_name",
                  name: "name",
                  type: "type",
                  jurisdiction: "jurisdiction",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("secret_text"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("send_email"),
                allowedDestinationAddresses: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                allowedSenderAddresses: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                destinationAddress: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  allowedDestinationAddresses: "allowed_destination_addresses",
                  allowedSenderAddresses: "allowed_sender_addresses",
                  destinationAddress: "destination_address",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                service: Schema.String,
                type: Schema.Literal("service"),
                environment: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("text_blob"),
              }),
              Schema.Struct({
                indexName: Schema.String,
                name: Schema.String,
                type: Schema.Literal("vectorize"),
              }).pipe(
                Schema.encodeKeys({
                  indexName: "index_name",
                  name: "name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("version_metadata"),
              }),
              Schema.Struct({
                name: Schema.String,
                secretName: Schema.String,
                storeId: Schema.String,
                type: Schema.Literal("secrets_store_secret"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  secretName: "secret_name",
                  storeId: "store_id",
                  type: "type",
                }),
              ),
              Schema.Struct({
                algorithm: Schema.Unknown,
                format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
                name: Schema.String,
                type: Schema.Literal("secret_key"),
                usages: Schema.Array(
                  Schema.Literals([
                    "encrypt",
                    "decrypt",
                    "sign",
                    "verify",
                    "deriveKey",
                    "deriveBits",
                    "wrapKey",
                    "unwrapKey",
                  ]),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("workflow"),
                workflowName: Schema.String,
                className: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                scriptName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  workflowName: "workflow_name",
                  className: "class_name",
                  scriptName: "script_name",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("wasm_module"),
              }),
            ]),
          ),
          Schema.Null,
        ]),
      ),
      script: Schema.optional(
        Schema.Union([
          Schema.Struct({
            etag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            handlers: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            lastDeployedFrom: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            namedHandlers: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    handlers: Schema.optional(
                      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                    ),
                    name: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              etag: "etag",
              handlers: "handlers",
              lastDeployedFrom: "last_deployed_from",
              namedHandlers: "named_handlers",
            }),
          ),
          Schema.Null,
        ]),
      ),
      scriptRuntime: Schema.optional(
        Schema.Union([
          Schema.Struct({
            compatibilityDate: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            compatibilityFlags: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            limits: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  cpuMs: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
                Schema.Null,
              ]),
            ),
            migrationTag: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            usageModel: Schema.optional(
              Schema.Union([
                Schema.Literals(["bundled", "unbound", "standard"]),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              compatibilityDate: "compatibility_date",
              compatibilityFlags: "compatibility_flags",
              limits: "limits",
              migrationTag: "migration_tag",
              usageModel: "usage_model",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        bindings: "bindings",
        script: "script",
        scriptRuntime: "script_runtime",
      }),
    ),
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    metadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          authorEmail: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          authorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          hasPreview: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          source: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "unknown",
                "api",
                "wrangler",
                "terraform",
                "dash",
                "dash_template",
                "integration",
                "quick_editor",
                "playground",
                "workersci",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            authorEmail: "author_email",
            authorId: "author_id",
            createdOn: "created_on",
            hasPreview: "hasPreview",
            modifiedOn: "modified_on",
            source: "source",
          }),
        ),
        Schema.Null,
      ]),
    ),
    number: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetScriptVersionResponse>;

export type GetScriptVersionError =
  | DefaultErrors
  | WorkerNotFound
  | VersionNotFound;

export const getScriptVersion: API.OperationMethod<
  GetScriptVersionRequest,
  GetScriptVersionResponse,
  GetScriptVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScriptVersionRequest,
  output: GetScriptVersionResponse,
  errors: [WorkerNotFound, VersionNotFound],
}));

export interface ListScriptVersionsRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Only return versions that can be used in a deployment. Ignores pagination. */
  deployable?: boolean;
}

export const ListScriptVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    deployable: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deployable")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/versions",
    }),
  ) as unknown as Schema.Schema<ListScriptVersionsRequest>;

export interface ListScriptVersionsResponse {
  result: {
    items?:
      | {
          id?: string | null;
          metadata?: {
            authorEmail?: string | null;
            authorId?: string | null;
            createdOn?: string | null;
            hasPreview?: boolean | null;
            modifiedOn?: string | null;
            source?:
              | "unknown"
              | "api"
              | "wrangler"
              | "terraform"
              | "dash"
              | "dash_template"
              | "integration"
              | "quick_editor"
              | "playground"
              | "workersci"
              | null;
          } | null;
          number?: number | null;
        }[]
      | null;
  };
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListScriptVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Struct({
      items: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              metadata: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    authorEmail: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    authorId: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    createdOn: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    hasPreview: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    modifiedOn: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    source: Schema.optional(
                      Schema.Union([
                        Schema.Literals([
                          "unknown",
                          "api",
                          "wrangler",
                          "terraform",
                          "dash",
                          "dash_template",
                          "integration",
                          "quick_editor",
                          "playground",
                          "workersci",
                        ]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      authorEmail: "author_email",
                      authorId: "author_id",
                      createdOn: "created_on",
                      hasPreview: "hasPreview",
                      modifiedOn: "modified_on",
                      source: "source",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              number: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
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
  ) as unknown as Schema.Schema<ListScriptVersionsResponse>;

export type ListScriptVersionsError = DefaultErrors | WorkerNotFound;

export const listScriptVersions: API.PaginatedOperationMethod<
  ListScriptVersionsRequest,
  ListScriptVersionsResponse,
  ListScriptVersionsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListScriptVersionsRequest,
  ) => stream.Stream<
    ListScriptVersionsResponse,
    ListScriptVersionsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListScriptVersionsRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      metadata?: {
        authorEmail?: string | null;
        authorId?: string | null;
        createdOn?: string | null;
        hasPreview?: boolean | null;
        modifiedOn?: string | null;
        source?:
          | "unknown"
          | "api"
          | "wrangler"
          | "terraform"
          | "dash"
          | "dash_template"
          | "integration"
          | "quick_editor"
          | "playground"
          | "workersci"
          | null;
      } | null;
      number?: number | null;
    },
    ListScriptVersionsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScriptVersionsRequest,
  output: ListScriptVersionsResponse,
  errors: [WorkerNotFound],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result.items",
    pageSize: "perPage",
  } as const,
}));

export interface CreateScriptVersionRequest {
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: JSON-encoded metadata about the uploaded parts and Worker configuration. */
  metadata: {
    mainModule: string;
    annotations?: {
      workersAlias?: string;
      workersMessage?: string;
      workersTag?: string;
    };
    bindings?: (
      | { name: string; type: "ai" }
      | { dataset: string; name: string; type: "analytics_engine" }
      | { name: string; type: "assets" }
      | { name: string; type: "browser" }
      | { id: string; name: string; type: "d1" }
      | { name: string; part: string; type: "data_blob" }
      | {
          name: string;
          namespace: string;
          type: "dispatch_namespace";
          outbound?: {
            params?: string[];
            worker?: { environment?: string; service?: string };
          };
        }
      | {
          name: string;
          type: "durable_object_namespace";
          className?: string;
          environment?: string;
          namespaceId?: string;
          scriptName?: string;
        }
      | { id: string; name: string; type: "hyperdrive" }
      | { name: string; type: "inherit"; oldName?: string; versionId?: string }
      | { name: string; type: "images" }
      | { json: string; name: string; type: "json" }
      | { name: string; namespaceId: string; type: "kv_namespace" }
      | { certificateId: string; name: string; type: "mtls_certificate" }
      | { name: string; text: string; type: "plain_text" }
      | { name: string; pipeline: string; type: "pipelines" }
      | { name: string; queueName: string; type: "queue" }
      | {
          bucketName: string;
          name: string;
          type: "r2_bucket";
          jurisdiction?: "eu" | "fedramp";
        }
      | { name: string; text: string; type: "secret_text" }
      | {
          name: string;
          type: "send_email";
          allowedDestinationAddresses?: string[];
          allowedSenderAddresses?: string[];
          destinationAddress?: string;
        }
      | { name: string; service: string; type: "service"; environment?: string }
      | { name: string; part: string; type: "text_blob" }
      | { indexName: string; name: string; type: "vectorize" }
      | { name: string; type: "version_metadata" }
      | {
          name: string;
          secretName: string;
          storeId: string;
          type: "secrets_store_secret";
        }
      | {
          algorithm: unknown;
          format: "raw" | "pkcs8" | "spki" | "jwk";
          name: string;
          type: "secret_key";
          usages: (
            | "encrypt"
            | "decrypt"
            | "sign"
            | "verify"
            | "deriveKey"
            | "deriveBits"
            | "wrapKey"
            | "unwrapKey"
          )[];
          keyBase64?: string;
          keyJwk?: unknown;
        }
      | {
          name: string;
          type: "workflow";
          workflowName: string;
          className?: string;
          scriptName?: string;
        }
      | { name: string; part: string; type: "wasm_module" }
    )[];
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    keepBindings?: string[];
    usageModel?: "standard" | "bundled" | "unbound";
  };
  /** Body param: An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata as `main_module` or `body_part` by filename.<br/ */
  files?: (File | Blob)[];
}

export const CreateScriptVersionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    metadata: Schema.Struct({
      mainModule: Schema.String,
      annotations: Schema.optional(
        Schema.Struct({
          workersAlias: Schema.optional(Schema.String),
          workersMessage: Schema.optional(Schema.String),
          workersTag: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            workersAlias: "workers/alias",
            workersMessage: "workers/message",
            workersTag: "workers/tag",
          }),
        ),
      ),
      bindings: Schema.optional(
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("ai"),
            }),
            Schema.Struct({
              dataset: Schema.String,
              name: Schema.String,
              type: Schema.Literal("analytics_engine"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("assets"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("browser"),
            }),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("d1"),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("data_blob"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespace: Schema.String,
              type: Schema.Literal("dispatch_namespace"),
              outbound: Schema.optional(
                Schema.Struct({
                  params: Schema.optional(Schema.Array(Schema.String)),
                  worker: Schema.optional(
                    Schema.Struct({
                      environment: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("durable_object_namespace"),
              className: Schema.optional(Schema.String),
              environment: Schema.optional(Schema.String),
              namespaceId: Schema.optional(Schema.String),
              scriptName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                className: "class_name",
                environment: "environment",
                namespaceId: "namespace_id",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("hyperdrive"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("inherit"),
              oldName: Schema.optional(Schema.String),
              versionId: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                oldName: "old_name",
                versionId: "version_id",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("images"),
            }),
            Schema.Struct({
              json: Schema.String,
              name: Schema.String,
              type: Schema.Literal("json"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespaceId: Schema.String,
              type: Schema.Literal("kv_namespace"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                namespaceId: "namespace_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              certificateId: Schema.String,
              name: Schema.String,
              type: Schema.Literal("mtls_certificate"),
            }).pipe(
              Schema.encodeKeys({
                certificateId: "certificate_id",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("plain_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              pipeline: Schema.String,
              type: Schema.Literal("pipelines"),
            }),
            Schema.Struct({
              name: Schema.String,
              queueName: Schema.String,
              type: Schema.Literal("queue"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                queueName: "queue_name",
                type: "type",
              }),
            ),
            Schema.Struct({
              bucketName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("r2_bucket"),
              jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
            }).pipe(
              Schema.encodeKeys({
                bucketName: "bucket_name",
                name: "name",
                type: "type",
                jurisdiction: "jurisdiction",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("secret_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("send_email"),
              allowedDestinationAddresses: Schema.optional(
                Schema.Array(Schema.String),
              ),
              allowedSenderAddresses: Schema.optional(
                Schema.Array(Schema.String),
              ),
              destinationAddress: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                allowedDestinationAddresses: "allowed_destination_addresses",
                allowedSenderAddresses: "allowed_sender_addresses",
                destinationAddress: "destination_address",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              service: Schema.String,
              type: Schema.Literal("service"),
              environment: Schema.optional(Schema.String),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("text_blob"),
            }),
            Schema.Struct({
              indexName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("vectorize"),
            }).pipe(
              Schema.encodeKeys({
                indexName: "index_name",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("version_metadata"),
            }),
            Schema.Struct({
              name: Schema.String,
              secretName: Schema.String,
              storeId: Schema.String,
              type: Schema.Literal("secrets_store_secret"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                secretName: "secret_name",
                storeId: "store_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              algorithm: Schema.Unknown,
              format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
              name: Schema.String,
              type: Schema.Literal("secret_key"),
              usages: Schema.Array(
                Schema.Literals([
                  "encrypt",
                  "decrypt",
                  "sign",
                  "verify",
                  "deriveKey",
                  "deriveBits",
                  "wrapKey",
                  "unwrapKey",
                ]),
              ),
              keyBase64: Schema.optional(Schema.String),
              keyJwk: Schema.optional(Schema.Unknown),
            }).pipe(
              Schema.encodeKeys({
                algorithm: "algorithm",
                format: "format",
                name: "name",
                type: "type",
                usages: "usages",
                keyBase64: "key_base64",
                keyJwk: "key_jwk",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("workflow"),
              workflowName: Schema.String,
              className: Schema.optional(Schema.String),
              scriptName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                workflowName: "workflow_name",
                className: "class_name",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("wasm_module"),
            }),
          ]),
        ),
      ),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      keepBindings: Schema.optional(Schema.Array(Schema.String)),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
    }).pipe(
      Schema.encodeKeys({
        mainModule: "main_module",
        annotations: "annotations",
        bindings: "bindings",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        keepBindings: "keep_bindings",
        usageModel: "usage_model",
      }),
    ),
    files: Schema.optional(
      Schema.Array(UploadableSchema.pipe(T.HttpFormDataFile())),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workers/scripts/{scriptName}/versions",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<CreateScriptVersionRequest>;

export interface CreateScriptVersionResponse {
  resources: {
    bindings?:
      | (
          | { name: string; type: "ai" }
          | { dataset: string; name: string; type: "analytics_engine" }
          | { name: string; type: "assets" }
          | { name: string; type: "browser" }
          | { id: string; name: string; type: "d1" }
          | { name: string; part: string; type: "data_blob" }
          | {
              name: string;
              namespace: string;
              type: "dispatch_namespace";
              outbound?: {
                params?: string[] | null;
                worker?: {
                  environment?: string | null;
                  service?: string | null;
                } | null;
              } | null;
            }
          | {
              name: string;
              type: "durable_object_namespace";
              className?: string | null;
              environment?: string | null;
              namespaceId?: string | null;
              scriptName?: string | null;
            }
          | { id: string; name: string; type: "hyperdrive" }
          | {
              name: string;
              type: "inherit";
              oldName?: string | null;
              versionId?: string | null;
            }
          | { name: string; type: "images" }
          | { json: string; name: string; type: "json" }
          | { name: string; namespaceId: string; type: "kv_namespace" }
          | { certificateId: string; name: string; type: "mtls_certificate" }
          | { name: string; text: string; type: "plain_text" }
          | { name: string; pipeline: string; type: "pipelines" }
          | { name: string; queueName: string; type: "queue" }
          | {
              bucketName: string;
              name: string;
              type: "r2_bucket";
              jurisdiction?: "eu" | "fedramp" | null;
            }
          | { name: string; type: "secret_text" }
          | {
              name: string;
              type: "send_email";
              allowedDestinationAddresses?: string[] | null;
              allowedSenderAddresses?: string[] | null;
              destinationAddress?: string | null;
            }
          | {
              name: string;
              service: string;
              type: "service";
              environment?: string | null;
            }
          | { name: string; part: string; type: "text_blob" }
          | { indexName: string; name: string; type: "vectorize" }
          | { name: string; type: "version_metadata" }
          | {
              name: string;
              secretName: string;
              storeId: string;
              type: "secrets_store_secret";
            }
          | {
              algorithm: unknown;
              format: "raw" | "pkcs8" | "spki" | "jwk";
              name: string;
              type: "secret_key";
              usages: (
                | "encrypt"
                | "decrypt"
                | "sign"
                | "verify"
                | "deriveKey"
                | "deriveBits"
                | "wrapKey"
                | "unwrapKey"
              )[];
            }
          | {
              name: string;
              type: "workflow";
              workflowName: string;
              className?: string | null;
              scriptName?: string | null;
            }
          | { name: string; part: string; type: "wasm_module" }
        )[]
      | null;
    script?: {
      etag?: string | null;
      handlers?: string[] | null;
      lastDeployedFrom?: string | null;
      namedHandlers?:
        | { handlers?: string[] | null; name?: string | null }[]
        | null;
    } | null;
    scriptRuntime?: {
      compatibilityDate?: string | null;
      compatibilityFlags?: string[] | null;
      limits?: { cpuMs?: number | null } | null;
      migrationTag?: string | null;
      usageModel?: "bundled" | "unbound" | "standard" | null;
    } | null;
  };
  /** Unique identifier for the version. */
  id?: string | null;
  metadata?: {
    authorEmail?: string | null;
    authorId?: string | null;
    createdOn?: string | null;
    hasPreview?: boolean | null;
    modifiedOn?: string | null;
    source?:
      | "unknown"
      | "api"
      | "wrangler"
      | "terraform"
      | "dash"
      | "dash_template"
      | "integration"
      | "quick_editor"
      | "playground"
      | "workersci"
      | null;
  } | null;
  /** Sequential version number. */
  number?: number | null;
  /** Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time). */
  startupTimeMs?: number | null;
}

export const CreateScriptVersionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resources: Schema.Struct({
      bindings: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Union([
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("ai"),
              }),
              Schema.Struct({
                dataset: Schema.String,
                name: Schema.String,
                type: Schema.Literal("analytics_engine"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("assets"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("browser"),
              }),
              Schema.Struct({
                id: Schema.String,
                name: Schema.String,
                type: Schema.Literal("d1"),
              }),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("data_blob"),
              }),
              Schema.Struct({
                name: Schema.String,
                namespace: Schema.String,
                type: Schema.Literal("dispatch_namespace"),
                outbound: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      params: Schema.optional(
                        Schema.Union([
                          Schema.Array(Schema.String),
                          Schema.Null,
                        ]),
                      ),
                      worker: Schema.optional(
                        Schema.Union([
                          Schema.Struct({
                            environment: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            service: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                          }),
                          Schema.Null,
                        ]),
                      ),
                    }),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("durable_object_namespace"),
                className: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                environment: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                namespaceId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                scriptName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  className: "class_name",
                  environment: "environment",
                  namespaceId: "namespace_id",
                  scriptName: "script_name",
                }),
              ),
              Schema.Struct({
                id: Schema.String,
                name: Schema.String,
                type: Schema.Literal("hyperdrive"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("inherit"),
                oldName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                versionId: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  oldName: "old_name",
                  versionId: "version_id",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("images"),
              }),
              Schema.Struct({
                json: Schema.String,
                name: Schema.String,
                type: Schema.Literal("json"),
              }),
              Schema.Struct({
                name: Schema.String,
                namespaceId: Schema.String,
                type: Schema.Literal("kv_namespace"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  namespaceId: "namespace_id",
                  type: "type",
                }),
              ),
              Schema.Struct({
                certificateId: Schema.String,
                name: Schema.String,
                type: Schema.Literal("mtls_certificate"),
              }).pipe(
                Schema.encodeKeys({
                  certificateId: "certificate_id",
                  name: "name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                text: Schema.String,
                type: Schema.Literal("plain_text"),
              }),
              Schema.Struct({
                name: Schema.String,
                pipeline: Schema.String,
                type: Schema.Literal("pipelines"),
              }),
              Schema.Struct({
                name: Schema.String,
                queueName: Schema.String,
                type: Schema.Literal("queue"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  queueName: "queue_name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                bucketName: Schema.String,
                name: Schema.String,
                type: Schema.Literal("r2_bucket"),
                jurisdiction: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["eu", "fedramp"]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  bucketName: "bucket_name",
                  name: "name",
                  type: "type",
                  jurisdiction: "jurisdiction",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("secret_text"),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("send_email"),
                allowedDestinationAddresses: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                allowedSenderAddresses: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
                destinationAddress: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  allowedDestinationAddresses: "allowed_destination_addresses",
                  allowedSenderAddresses: "allowed_sender_addresses",
                  destinationAddress: "destination_address",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                service: Schema.String,
                type: Schema.Literal("service"),
                environment: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("text_blob"),
              }),
              Schema.Struct({
                indexName: Schema.String,
                name: Schema.String,
                type: Schema.Literal("vectorize"),
              }).pipe(
                Schema.encodeKeys({
                  indexName: "index_name",
                  name: "name",
                  type: "type",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("version_metadata"),
              }),
              Schema.Struct({
                name: Schema.String,
                secretName: Schema.String,
                storeId: Schema.String,
                type: Schema.Literal("secrets_store_secret"),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  secretName: "secret_name",
                  storeId: "store_id",
                  type: "type",
                }),
              ),
              Schema.Struct({
                algorithm: Schema.Unknown,
                format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
                name: Schema.String,
                type: Schema.Literal("secret_key"),
                usages: Schema.Array(
                  Schema.Literals([
                    "encrypt",
                    "decrypt",
                    "sign",
                    "verify",
                    "deriveKey",
                    "deriveBits",
                    "wrapKey",
                    "unwrapKey",
                  ]),
                ),
              }),
              Schema.Struct({
                name: Schema.String,
                type: Schema.Literal("workflow"),
                workflowName: Schema.String,
                className: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                scriptName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  name: "name",
                  type: "type",
                  workflowName: "workflow_name",
                  className: "class_name",
                  scriptName: "script_name",
                }),
              ),
              Schema.Struct({
                name: Schema.String,
                part: Schema.String,
                type: Schema.Literal("wasm_module"),
              }),
            ]),
          ),
          Schema.Null,
        ]),
      ),
      script: Schema.optional(
        Schema.Union([
          Schema.Struct({
            etag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            handlers: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            lastDeployedFrom: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            namedHandlers: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    handlers: Schema.optional(
                      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                    ),
                    name: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              etag: "etag",
              handlers: "handlers",
              lastDeployedFrom: "last_deployed_from",
              namedHandlers: "named_handlers",
            }),
          ),
          Schema.Null,
        ]),
      ),
      scriptRuntime: Schema.optional(
        Schema.Union([
          Schema.Struct({
            compatibilityDate: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            compatibilityFlags: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            limits: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  cpuMs: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
                Schema.Null,
              ]),
            ),
            migrationTag: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            usageModel: Schema.optional(
              Schema.Union([
                Schema.Literals(["bundled", "unbound", "standard"]),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              compatibilityDate: "compatibility_date",
              compatibilityFlags: "compatibility_flags",
              limits: "limits",
              migrationTag: "migration_tag",
              usageModel: "usage_model",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        bindings: "bindings",
        script: "script",
        scriptRuntime: "script_runtime",
      }),
    ),
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    metadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          authorEmail: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          authorId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          createdOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          hasPreview: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          modifiedOn: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          source: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "unknown",
                "api",
                "wrangler",
                "terraform",
                "dash",
                "dash_template",
                "integration",
                "quick_editor",
                "playground",
                "workersci",
              ]),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            authorEmail: "author_email",
            authorId: "author_id",
            createdOn: "created_on",
            hasPreview: "hasPreview",
            modifiedOn: "modified_on",
            source: "source",
          }),
        ),
        Schema.Null,
      ]),
    ),
    number: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    startupTimeMs: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        resources: "resources",
        id: "id",
        metadata: "metadata",
        number: "number",
        startupTimeMs: "startup_time_ms",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateScriptVersionResponse>;

export type CreateScriptVersionError = DefaultErrors | WorkerNotFound;

export const createScriptVersion: API.OperationMethod<
  CreateScriptVersionRequest,
  CreateScriptVersionResponse,
  CreateScriptVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScriptVersionRequest,
  output: CreateScriptVersionResponse,
  errors: [WorkerNotFound],
}));

// =============================================================================
// Subdomain
// =============================================================================

export interface GetSubdomainRequest {
  /** Identifier. */
  accountId: string;
}

export const GetSubdomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/subdomain" }),
) as unknown as Schema.Schema<GetSubdomainRequest>;

export interface GetSubdomainResponse {
  subdomain: string;
}

export const GetSubdomainResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subdomain: Schema.String,
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetSubdomainResponse>;

export type GetSubdomainError = DefaultErrors | InvalidRoute;

export const getSubdomain: API.OperationMethod<
  GetSubdomainRequest,
  GetSubdomainResponse,
  GetSubdomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSubdomainRequest,
  output: GetSubdomainResponse,
  errors: [InvalidRoute],
}));

export interface PutSubdomainRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  subdomain: string;
}

export const PutSubdomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  subdomain: Schema.String,
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/subdomain" }),
) as unknown as Schema.Schema<PutSubdomainRequest>;

export interface PutSubdomainResponse {
  subdomain: string;
}

export const PutSubdomainResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subdomain: Schema.String,
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<PutSubdomainResponse>;

export type PutSubdomainError = DefaultErrors | InvalidRoute;

export const putSubdomain: API.OperationMethod<
  PutSubdomainRequest,
  PutSubdomainResponse,
  PutSubdomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSubdomainRequest,
  output: PutSubdomainResponse,
  errors: [InvalidRoute],
}));

export interface DeleteSubdomainRequest {
  /** Identifier. */
  accountId: string;
}

export const DeleteSubdomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/subdomain",
  }),
) as unknown as Schema.Schema<DeleteSubdomainRequest>;

export type DeleteSubdomainResponse = unknown;

export const DeleteSubdomainResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteSubdomainResponse>;

export type DeleteSubdomainError = DefaultErrors | InvalidRoute;

export const deleteSubdomain: API.OperationMethod<
  DeleteSubdomainRequest,
  DeleteSubdomainResponse,
  DeleteSubdomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSubdomainRequest,
  output: DeleteSubdomainResponse,
  errors: [InvalidRoute],
}));
