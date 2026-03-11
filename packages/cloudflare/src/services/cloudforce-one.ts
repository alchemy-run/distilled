/**
 * Cloudflare CLOUDFORCE-ONE API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service cloudforce-one
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";
import { UploadableSchema } from "../schemas.ts";

// =============================================================================
// BinaryStorage
// =============================================================================

export interface GetBinaryStorageRequest {
  hash: string;
  /** Account ID. */
  accountId: string;
}

export const GetBinaryStorageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hash: Schema.String.pipe(T.HttpPath("hash")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/binary/{hash}",
    }),
  ) as unknown as Schema.Schema<GetBinaryStorageRequest>;

export type GetBinaryStorageResponse = unknown;

export const GetBinaryStorageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetBinaryStorageResponse>;

export type GetBinaryStorageError = DefaultErrors;

export const getBinaryStorage: API.OperationMethod<
  GetBinaryStorageRequest,
  GetBinaryStorageResponse,
  GetBinaryStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBinaryStorageRequest,
  output: GetBinaryStorageResponse,
  errors: [],
}));

export interface CreateBinaryStorageRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: The binary file content to upload. */
  file: File | Blob;
}

export const CreateBinaryStorageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    file: UploadableSchema.pipe(T.HttpFormDataFile()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/binary",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<CreateBinaryStorageRequest>;

export interface CreateBinaryStorageResponse {
  contentType: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export const CreateBinaryStorageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    contentType: Schema.String,
    md5: Schema.String,
    sha1: Schema.String,
    sha256: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      contentType: "content_type",
      md5: "md5",
      sha1: "sha1",
      sha256: "sha256",
    }),
  ) as unknown as Schema.Schema<CreateBinaryStorageResponse>;

export type CreateBinaryStorageError = DefaultErrors;

export const createBinaryStorage: API.OperationMethod<
  CreateBinaryStorageRequest,
  CreateBinaryStorageResponse,
  CreateBinaryStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBinaryStorageRequest,
  output: CreateBinaryStorageResponse,
  errors: [],
}));

// =============================================================================
// Request
// =============================================================================

export interface GetRequestRequest {
  requestId: string;
  /** Identifier. */
  accountId: string;
}

export const GetRequestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  requestId: Schema.String.pipe(T.HttpPath("requestId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}",
  }),
) as unknown as Schema.Schema<GetRequestRequest>;

export interface GetRequestResponse {
  /** UUID. */
  id: string;
  /** Request content. */
  content: string;
  created: string;
  priority: string;
  /** Requested information from request. */
  request: string;
  /** Brief description of the request. */
  summary: string;
  /** The CISA defined Traffic Light Protocol (TLP). */
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
  updated: string;
  completed?: string | null;
  /** Tokens for the request messages. */
  messageTokens?: number | null;
  /** Readable Request ID. */
  readableId?: string | null;
  /** Request Status. */
  status?:
    | "open"
    | "accepted"
    | "reported"
    | "approved"
    | "completed"
    | "declined"
    | null;
  /** Tokens for the request. */
  tokens?: number | null;
}

export const GetRequestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  content: Schema.String,
  created: Schema.String,
  priority: Schema.String,
  request: Schema.String,
  summary: Schema.String,
  tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  updated: Schema.String,
  completed: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  messageTokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  readableId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "open",
        "accepted",
        "reported",
        "approved",
        "completed",
        "declined",
      ]),
      Schema.Null,
    ]),
  ),
  tokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    content: "content",
    created: "created",
    priority: "priority",
    request: "request",
    summary: "summary",
    tlp: "tlp",
    updated: "updated",
    completed: "completed",
    messageTokens: "message_tokens",
    readableId: "readable_id",
    status: "status",
    tokens: "tokens",
  }),
) as unknown as Schema.Schema<GetRequestResponse>;

export type GetRequestError = DefaultErrors;

export const getRequest: API.OperationMethod<
  GetRequestRequest,
  GetRequestResponse,
  GetRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRequestRequest,
  output: GetRequestResponse,
  errors: [],
}));

export interface ListRequestsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Page number of results. */
  page: number;
  /** Body param: Number of results per page. */
  perPage: number;
  /** Body param: Retrieve requests completed after this time. */
  completedAfter?: string;
  /** Body param: Retrieve requests completed before this time. */
  completedBefore?: string;
  /** Body param: Retrieve requests created after this time. */
  createdAfter?: string;
  /** Body param: Retrieve requests created before this time. */
  createdBefore?: string;
  /** Body param: Requested information from request. */
  requestType?: string;
  /** Body param: Field to sort results by. */
  sortBy?: string;
  /** Body param: Sort order (asc or desc). */
  sortOrder?: "asc" | "desc";
  /** Body param: Request Status. */
  status?:
    | "open"
    | "accepted"
    | "reported"
    | "approved"
    | "completed"
    | "declined";
}

export const ListRequestsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.Number,
  perPage: Schema.Number,
  completedAfter: Schema.optional(Schema.String),
  completedBefore: Schema.optional(Schema.String),
  createdAfter: Schema.optional(Schema.String),
  createdBefore: Schema.optional(Schema.String),
  requestType: Schema.optional(Schema.String),
  sortBy: Schema.optional(Schema.String),
  sortOrder: Schema.optional(Schema.Literals(["asc", "desc"])),
  status: Schema.optional(
    Schema.Literals([
      "open",
      "accepted",
      "reported",
      "approved",
      "completed",
      "declined",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    page: "page",
    perPage: "per_page",
    completedAfter: "completed_after",
    completedBefore: "completed_before",
    createdAfter: "created_after",
    createdBefore: "created_before",
    requestType: "request_type",
    sortBy: "sort_by",
    sortOrder: "sort_order",
    status: "status",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/cloudforce-one/requests",
  }),
) as unknown as Schema.Schema<ListRequestsRequest>;

export type ListRequestsResponse = {
  id: string;
  created: string;
  priority: "routine" | "high" | "urgent";
  request: string;
  summary: string;
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
  updated: string;
  completed?: string | null;
  messageTokens?: number | null;
  readableId?: string | null;
  status?:
    | "open"
    | "accepted"
    | "reported"
    | "approved"
    | "completed"
    | "declined"
    | null;
  tokens?: number | null;
}[];

export const ListRequestsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    priority: Schema.Literals(["routine", "high", "urgent"]),
    request: Schema.String,
    summary: Schema.String,
    tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
    updated: Schema.String,
    completed: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    messageTokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    readableId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "open",
          "accepted",
          "reported",
          "approved",
          "completed",
          "declined",
        ]),
        Schema.Null,
      ]),
    ),
    tokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      created: "created",
      priority: "priority",
      request: "request",
      summary: "summary",
      tlp: "tlp",
      updated: "updated",
      completed: "completed",
      messageTokens: "message_tokens",
      readableId: "readable_id",
      status: "status",
      tokens: "tokens",
    }),
  ),
) as unknown as Schema.Schema<ListRequestsResponse>;

export type ListRequestsError = DefaultErrors;

export const listRequests: API.OperationMethod<
  ListRequestsRequest,
  ListRequestsResponse,
  ListRequestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListRequestsRequest,
  output: ListRequestsResponse,
  errors: [],
}));

export interface CreateRequestRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Request content. */
  content?: string;
  /** Body param: Priority for analyzing the request. */
  priority?: string;
  /** Body param: Requested information from request. */
  requestType?: string;
  /** Body param: Brief description of the request. */
  summary?: string;
  /** Body param: The CISA defined Traffic Light Protocol (TLP). */
  tlp?: "clear" | "amber" | "amber-strict" | "green" | "red";
}

export const CreateRequestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  content: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  requestType: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  tlp: Schema.optional(
    Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  ),
}).pipe(
  Schema.encodeKeys({
    content: "content",
    priority: "priority",
    requestType: "request_type",
    summary: "summary",
    tlp: "tlp",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/cloudforce-one/requests/new",
  }),
) as unknown as Schema.Schema<CreateRequestRequest>;

export interface CreateRequestResponse {
  /** UUID. */
  id: string;
  /** Request content. */
  content: string;
  created: string;
  priority: string;
  /** Requested information from request. */
  request: string;
  /** Brief description of the request. */
  summary: string;
  /** The CISA defined Traffic Light Protocol (TLP). */
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
  updated: string;
  completed?: string | null;
  /** Tokens for the request messages. */
  messageTokens?: number | null;
  /** Readable Request ID. */
  readableId?: string | null;
  /** Request Status. */
  status?:
    | "open"
    | "accepted"
    | "reported"
    | "approved"
    | "completed"
    | "declined"
    | null;
  /** Tokens for the request. */
  tokens?: number | null;
}

export const CreateRequestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  content: Schema.String,
  created: Schema.String,
  priority: Schema.String,
  request: Schema.String,
  summary: Schema.String,
  tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  updated: Schema.String,
  completed: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  messageTokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  readableId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "open",
        "accepted",
        "reported",
        "approved",
        "completed",
        "declined",
      ]),
      Schema.Null,
    ]),
  ),
  tokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    content: "content",
    created: "created",
    priority: "priority",
    request: "request",
    summary: "summary",
    tlp: "tlp",
    updated: "updated",
    completed: "completed",
    messageTokens: "message_tokens",
    readableId: "readable_id",
    status: "status",
    tokens: "tokens",
  }),
) as unknown as Schema.Schema<CreateRequestResponse>;

export type CreateRequestError = DefaultErrors;

export const createRequest: API.OperationMethod<
  CreateRequestRequest,
  CreateRequestResponse,
  CreateRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRequestRequest,
  output: CreateRequestResponse,
  errors: [],
}));

export interface UpdateRequestRequest {
  requestId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Request content. */
  content?: string;
  /** Body param: Priority for analyzing the request. */
  priority?: string;
  /** Body param: Requested information from request. */
  requestType?: string;
  /** Body param: Brief description of the request. */
  summary?: string;
  /** Body param: The CISA defined Traffic Light Protocol (TLP). */
  tlp?: "clear" | "amber" | "amber-strict" | "green" | "red";
}

export const UpdateRequestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  requestId: Schema.String.pipe(T.HttpPath("requestId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  content: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  requestType: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  tlp: Schema.optional(
    Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  ),
}).pipe(
  Schema.encodeKeys({
    content: "content",
    priority: "priority",
    requestType: "request_type",
    summary: "summary",
    tlp: "tlp",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}",
  }),
) as unknown as Schema.Schema<UpdateRequestRequest>;

export interface UpdateRequestResponse {
  /** UUID. */
  id: string;
  /** Request content. */
  content: string;
  created: string;
  priority: string;
  /** Requested information from request. */
  request: string;
  /** Brief description of the request. */
  summary: string;
  /** The CISA defined Traffic Light Protocol (TLP). */
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
  updated: string;
  completed?: string | null;
  /** Tokens for the request messages. */
  messageTokens?: number | null;
  /** Readable Request ID. */
  readableId?: string | null;
  /** Request Status. */
  status?:
    | "open"
    | "accepted"
    | "reported"
    | "approved"
    | "completed"
    | "declined"
    | null;
  /** Tokens for the request. */
  tokens?: number | null;
}

export const UpdateRequestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  content: Schema.String,
  created: Schema.String,
  priority: Schema.String,
  request: Schema.String,
  summary: Schema.String,
  tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  updated: Schema.String,
  completed: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  messageTokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  readableId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "open",
        "accepted",
        "reported",
        "approved",
        "completed",
        "declined",
      ]),
      Schema.Null,
    ]),
  ),
  tokens: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    content: "content",
    created: "created",
    priority: "priority",
    request: "request",
    summary: "summary",
    tlp: "tlp",
    updated: "updated",
    completed: "completed",
    messageTokens: "message_tokens",
    readableId: "readable_id",
    status: "status",
    tokens: "tokens",
  }),
) as unknown as Schema.Schema<UpdateRequestResponse>;

export type UpdateRequestError = DefaultErrors;

export const updateRequest: API.OperationMethod<
  UpdateRequestRequest,
  UpdateRequestResponse,
  UpdateRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRequestRequest,
  output: UpdateRequestResponse,
  errors: [],
}));

export interface DeleteRequestRequest {
  requestId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteRequestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  requestId: Schema.String.pipe(T.HttpPath("requestId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}",
  }),
) as unknown as Schema.Schema<DeleteRequestRequest>;

export interface DeleteRequestResponse {
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

export const DeleteRequestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
}) as unknown as Schema.Schema<DeleteRequestResponse>;

export type DeleteRequestError = DefaultErrors;

export const deleteRequest: API.OperationMethod<
  DeleteRequestRequest,
  DeleteRequestResponse,
  DeleteRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRequestRequest,
  output: DeleteRequestResponse,
  errors: [],
}));

export interface ConstantsRequestRequest {
  /** Identifier. */
  accountId: string;
}

export const ConstantsRequestRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/requests/constants",
    }),
  ) as unknown as Schema.Schema<ConstantsRequestRequest>;

export interface ConstantsRequestResponse {
  priority?: ("routine" | "high" | "urgent")[] | null;
  status?:
    | (
        | "open"
        | "accepted"
        | "reported"
        | "approved"
        | "completed"
        | "declined"
      )[]
    | null;
  tlp?: ("clear" | "amber" | "amber-strict" | "green" | "red")[] | null;
}

export const ConstantsRequestResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    priority: Schema.optional(
      Schema.Union([
        Schema.Array(Schema.Literals(["routine", "high", "urgent"])),
        Schema.Null,
      ]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Literals([
            "open",
            "accepted",
            "reported",
            "approved",
            "completed",
            "declined",
          ]),
        ),
        Schema.Null,
      ]),
    ),
    tlp: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
        ),
        Schema.Null,
      ]),
    ),
  }) as unknown as Schema.Schema<ConstantsRequestResponse>;

export type ConstantsRequestError = DefaultErrors;

export const constantsRequest: API.OperationMethod<
  ConstantsRequestRequest,
  ConstantsRequestResponse,
  ConstantsRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ConstantsRequestRequest,
  output: ConstantsRequestResponse,
  errors: [],
}));

export interface QuotaRequestRequest {
  /** Identifier. */
  accountId: string;
}

export const QuotaRequestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/requests/quota",
  }),
) as unknown as Schema.Schema<QuotaRequestRequest>;

export interface QuotaRequestResponse {
  /** Anniversary date is when annual quota limit is refreshed. */
  anniversaryDate?: string | null;
  /** Quarter anniversary date is when quota limit is refreshed each quarter. */
  quarterAnniversaryDate?: string | null;
  /** Tokens for the quarter. */
  quota?: number | null;
  /** Tokens remaining for the quarter. */
  remaining?: number | null;
}

export const QuotaRequestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  anniversaryDate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  quarterAnniversaryDate: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  quota: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  remaining: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    anniversaryDate: "anniversary_date",
    quarterAnniversaryDate: "quarter_anniversary_date",
    quota: "quota",
    remaining: "remaining",
  }),
) as unknown as Schema.Schema<QuotaRequestResponse>;

export type QuotaRequestError = DefaultErrors;

export const quotaRequest: API.OperationMethod<
  QuotaRequestRequest,
  QuotaRequestResponse,
  QuotaRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: QuotaRequestRequest,
  output: QuotaRequestResponse,
  errors: [],
}));

export interface TypesRequestRequest {
  /** Identifier. */
  accountId: string;
}

export const TypesRequestRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/requests/types",
  }),
) as unknown as Schema.Schema<TypesRequestRequest>;

export type TypesRequestResponse = string[];

export const TypesRequestResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<TypesRequestResponse>;

export type TypesRequestError = DefaultErrors;

export const typesRequest: API.OperationMethod<
  TypesRequestRequest,
  TypesRequestResponse,
  TypesRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TypesRequestRequest,
  output: TypesRequestResponse,
  errors: [],
}));

// =============================================================================
// RequestAsset
// =============================================================================

export interface GetRequestAssetRequest {
  requestId: string;
  assetId: string;
  /** Identifier. */
  accountId: string;
}

export const GetRequestAssetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    assetId: Schema.String.pipe(T.HttpPath("assetId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/asset/{assetId}",
  }),
) as unknown as Schema.Schema<GetRequestAssetRequest>;

export type GetRequestAssetResponse = {
  id: number;
  name: string;
  created?: string | null;
  description?: string | null;
  fileType?: string | null;
}[];

export const GetRequestAssetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    fileType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      name: "name",
      created: "created",
      description: "description",
      fileType: "file_type",
    }),
  ),
) as unknown as Schema.Schema<GetRequestAssetResponse>;

export type GetRequestAssetError = DefaultErrors;

export const getRequestAsset: API.OperationMethod<
  GetRequestAssetRequest,
  GetRequestAssetResponse,
  GetRequestAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRequestAssetRequest,
  output: GetRequestAssetResponse,
  errors: [],
}));

export interface CreateRequestAssetRequest {
  requestId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Page number of results. */
  page: number;
  /** Body param: Number of results per page. */
  perPage: number;
}

export const CreateRequestAssetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    page: Schema.Number,
    perPage: Schema.Number,
  }).pipe(
    Schema.encodeKeys({ page: "page", perPage: "per_page" }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/asset",
    }),
  ) as unknown as Schema.Schema<CreateRequestAssetRequest>;

export type CreateRequestAssetResponse = {
  id: number;
  name: string;
  created?: string | null;
  description?: string | null;
  fileType?: string | null;
}[];

export const CreateRequestAssetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.Number,
      name: Schema.String,
      created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      fileType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        name: "name",
        created: "created",
        description: "description",
        fileType: "file_type",
      }),
    ),
  ) as unknown as Schema.Schema<CreateRequestAssetResponse>;

export type CreateRequestAssetError = DefaultErrors;

export const createRequestAsset: API.OperationMethod<
  CreateRequestAssetRequest,
  CreateRequestAssetResponse,
  CreateRequestAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRequestAssetRequest,
  output: CreateRequestAssetResponse,
  errors: [],
}));

export interface UpdateRequestAssetRequest {
  requestId: string;
  assetId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Asset file to upload. */
  source?: string;
}

export const UpdateRequestAssetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    assetId: Schema.String.pipe(T.HttpPath("assetId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    source: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/asset/{assetId}",
    }),
  ) as unknown as Schema.Schema<UpdateRequestAssetRequest>;

export interface UpdateRequestAssetResponse {
  /** Asset ID. */
  id: number;
  /** Asset name. */
  name: string;
  /** Defines the asset creation time. */
  created?: string | null;
  /** Asset description. */
  description?: string | null;
  /** Asset file type. */
  fileType?: string | null;
}

export const UpdateRequestAssetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    fileType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      name: "name",
      created: "created",
      description: "description",
      fileType: "file_type",
    }),
  ) as unknown as Schema.Schema<UpdateRequestAssetResponse>;

export type UpdateRequestAssetError = DefaultErrors;

export const updateRequestAsset: API.OperationMethod<
  UpdateRequestAssetRequest,
  UpdateRequestAssetResponse,
  UpdateRequestAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRequestAssetRequest,
  output: UpdateRequestAssetResponse,
  errors: [],
}));

export interface DeleteRequestAssetRequest {
  requestId: string;
  assetId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteRequestAssetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    assetId: Schema.String.pipe(T.HttpPath("assetId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/asset/{assetId}",
    }),
  ) as unknown as Schema.Schema<DeleteRequestAssetRequest>;

export interface DeleteRequestAssetResponse {
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

export const DeleteRequestAssetResponse =
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
  }) as unknown as Schema.Schema<DeleteRequestAssetResponse>;

export type DeleteRequestAssetError = DefaultErrors;

export const deleteRequestAsset: API.OperationMethod<
  DeleteRequestAssetRequest,
  DeleteRequestAssetResponse,
  DeleteRequestAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRequestAssetRequest,
  output: DeleteRequestAssetResponse,
  errors: [],
}));

// =============================================================================
// RequestMessage
// =============================================================================

export interface GetRequestMessageRequest {
  requestId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Page number of results. */
  page: number;
  /** Body param: Number of results per page. */
  perPage: number;
  /** Body param: Retrieve mes ges created after this time. */
  after?: string;
  /** Body param: Retrieve messages created before this time. */
  before?: string;
  /** Body param: Field to sort results by. */
  sortBy?: string;
  /** Body param: Sort order (asc or desc). */
  sortOrder?: "asc" | "desc";
}

export const GetRequestMessageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    page: Schema.Number,
    perPage: Schema.Number,
    after: Schema.optional(Schema.String),
    before: Schema.optional(Schema.String),
    sortBy: Schema.optional(Schema.String),
    sortOrder: Schema.optional(Schema.Literals(["asc", "desc"])),
  }).pipe(
    Schema.encodeKeys({
      page: "page",
      perPage: "per_page",
      after: "after",
      before: "before",
      sortBy: "sort_by",
      sortOrder: "sort_order",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/message",
    }),
  ) as unknown as Schema.Schema<GetRequestMessageRequest>;

export type GetRequestMessageResponse = {
  code: number;
  message: string;
  documentationUrl?: string | null;
  source?: { pointer?: string | null } | null;
}[];

export const GetRequestMessageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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
  ) as unknown as Schema.Schema<GetRequestMessageResponse>;

export type GetRequestMessageError = DefaultErrors;

export const getRequestMessage: API.OperationMethod<
  GetRequestMessageRequest,
  GetRequestMessageResponse,
  GetRequestMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRequestMessageRequest,
  output: GetRequestMessageResponse,
  errors: [],
}));

export interface CreateRequestMessageRequest {
  requestId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Content of message. */
  content?: string;
}

export const CreateRequestMessageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    content: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/message/new",
    }),
  ) as unknown as Schema.Schema<CreateRequestMessageRequest>;

export interface CreateRequestMessageResponse {
  code: number;
  message: string;
  documentationUrl?: string | null;
  source?: { pointer?: string | null } | null;
}

export const CreateRequestMessageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    code: Schema.Number,
    message: Schema.String,
    documentationUrl: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    source: Schema.optional(
      Schema.Union([
        Schema.Struct({
          pointer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ) as unknown as Schema.Schema<CreateRequestMessageResponse>;

export type CreateRequestMessageError = DefaultErrors;

export const createRequestMessage: API.OperationMethod<
  CreateRequestMessageRequest,
  CreateRequestMessageResponse,
  CreateRequestMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRequestMessageRequest,
  output: CreateRequestMessageResponse,
  errors: [],
}));

export interface UpdateRequestMessageRequest {
  requestId: string;
  messageId: number;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Content of message. */
  content?: string;
}

export const UpdateRequestMessageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    messageId: Schema.Number.pipe(T.HttpPath("messageId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    content: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/message/{messageId}",
    }),
  ) as unknown as Schema.Schema<UpdateRequestMessageRequest>;

export interface UpdateRequestMessageResponse {
  code: number;
  message: string;
  documentationUrl?: string | null;
  source?: { pointer?: string | null } | null;
}

export const UpdateRequestMessageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    code: Schema.Number,
    message: Schema.String,
    documentationUrl: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    source: Schema.optional(
      Schema.Union([
        Schema.Struct({
          pointer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ) as unknown as Schema.Schema<UpdateRequestMessageResponse>;

export type UpdateRequestMessageError = DefaultErrors;

export const updateRequestMessage: API.OperationMethod<
  UpdateRequestMessageRequest,
  UpdateRequestMessageResponse,
  UpdateRequestMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRequestMessageRequest,
  output: UpdateRequestMessageResponse,
  errors: [],
}));

export interface DeleteRequestMessageRequest {
  requestId: string;
  messageId: number;
  /** Identifier. */
  accountId: string;
}

export const DeleteRequestMessageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.String.pipe(T.HttpPath("requestId")),
    messageId: Schema.Number.pipe(T.HttpPath("messageId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/requests/{requestId}/message/{messageId}",
    }),
  ) as unknown as Schema.Schema<DeleteRequestMessageRequest>;

export interface DeleteRequestMessageResponse {
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

export const DeleteRequestMessageResponse =
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
  }) as unknown as Schema.Schema<DeleteRequestMessageResponse>;

export type DeleteRequestMessageError = DefaultErrors;

export const deleteRequestMessage: API.OperationMethod<
  DeleteRequestMessageRequest,
  DeleteRequestMessageResponse,
  DeleteRequestMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRequestMessageRequest,
  output: DeleteRequestMessageResponse,
  errors: [],
}));

// =============================================================================
// RequestPriority
// =============================================================================

export interface GetRequestPriorityRequest {
  priorityId: string;
  /** Identifier. */
  accountId: string;
}

export const GetRequestPriorityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    priorityId: Schema.String.pipe(T.HttpPath("priorityId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/requests/priority/{priorityId}",
    }),
  ) as unknown as Schema.Schema<GetRequestPriorityRequest>;

export type GetRequestPriorityResponse = unknown;

export const GetRequestPriorityResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetRequestPriorityResponse>;

export type GetRequestPriorityError = DefaultErrors;

export const getRequestPriority: API.OperationMethod<
  GetRequestPriorityRequest,
  GetRequestPriorityResponse,
  GetRequestPriorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRequestPriorityRequest,
  output: GetRequestPriorityResponse,
  errors: [],
}));

export interface CreateRequestPriorityRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: List of labels. */
  labels: string[];
  /** Body param: Priority. */
  priority: number;
  /** Body param: Requirement. */
  requirement: string;
  /** Body param: The CISA defined Traffic Light Protocol (TLP). */
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
}

export const CreateRequestPriorityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    labels: Schema.Array(Schema.String),
    priority: Schema.Number,
    requirement: Schema.String,
    tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/requests/priority/new",
    }),
  ) as unknown as Schema.Schema<CreateRequestPriorityRequest>;

export interface CreateRequestPriorityResponse {
  /** UUID. */
  id: string;
  /** Priority creation time. */
  created: string;
  /** List of labels. */
  labels: string[];
  /** Priority. */
  priority: number;
  /** Requirement. */
  requirement: string;
  /** The CISA defined Traffic Light Protocol (TLP). */
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
  /** Priority last updated time. */
  updated: string;
}

export const CreateRequestPriorityResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    created: Schema.String,
    labels: Schema.Array(Schema.String),
    priority: Schema.Number,
    requirement: Schema.String,
    tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
    updated: Schema.String,
  }) as unknown as Schema.Schema<CreateRequestPriorityResponse>;

export type CreateRequestPriorityError = DefaultErrors;

export const createRequestPriority: API.OperationMethod<
  CreateRequestPriorityRequest,
  CreateRequestPriorityResponse,
  CreateRequestPriorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRequestPriorityRequest,
  output: CreateRequestPriorityResponse,
  errors: [],
}));

export interface UpdateRequestPriorityRequest {
  priorityId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: List of labels. */
  labels: string[];
  /** Body param: Priority. */
  priority: number;
  /** Body param: Requirement. */
  requirement: string;
  /** Body param: The CISA defined Traffic Light Protocol (TLP). */
  tlp: "clear" | "amber" | "amber-strict" | "green" | "red";
}

export const UpdateRequestPriorityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    priorityId: Schema.String.pipe(T.HttpPath("priorityId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    labels: Schema.Array(Schema.String),
    priority: Schema.Number,
    requirement: Schema.String,
    tlp: Schema.Literals(["clear", "amber", "amber-strict", "green", "red"]),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/cloudforce-one/requests/priority/{priorityId}",
    }),
  ) as unknown as Schema.Schema<UpdateRequestPriorityRequest>;

export type UpdateRequestPriorityResponse = unknown;

export const UpdateRequestPriorityResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<UpdateRequestPriorityResponse>;

export type UpdateRequestPriorityError = DefaultErrors;

export const updateRequestPriority: API.OperationMethod<
  UpdateRequestPriorityRequest,
  UpdateRequestPriorityResponse,
  UpdateRequestPriorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRequestPriorityRequest,
  output: UpdateRequestPriorityResponse,
  errors: [],
}));

export interface DeleteRequestPriorityRequest {
  priorityId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteRequestPriorityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    priorityId: Schema.String.pipe(T.HttpPath("priorityId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/requests/priority/{priorityId}",
    }),
  ) as unknown as Schema.Schema<DeleteRequestPriorityRequest>;

export interface DeleteRequestPriorityResponse {
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

export const DeleteRequestPriorityResponse =
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
  }) as unknown as Schema.Schema<DeleteRequestPriorityResponse>;

export type DeleteRequestPriorityError = DefaultErrors;

export const deleteRequestPriority: API.OperationMethod<
  DeleteRequestPriorityRequest,
  DeleteRequestPriorityResponse,
  DeleteRequestPriorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRequestPriorityRequest,
  output: DeleteRequestPriorityResponse,
  errors: [],
}));

export interface QuotaRequestPriorityRequest {
  /** Identifier. */
  accountId: string;
}

export const QuotaRequestPriorityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/requests/priority/quota",
    }),
  ) as unknown as Schema.Schema<QuotaRequestPriorityRequest>;

export type QuotaRequestPriorityResponse = unknown;

export const QuotaRequestPriorityResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<QuotaRequestPriorityResponse>;

export type QuotaRequestPriorityError = DefaultErrors;

export const quotaRequestPriority: API.OperationMethod<
  QuotaRequestPriorityRequest,
  QuotaRequestPriorityResponse,
  QuotaRequestPriorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: QuotaRequestPriorityRequest,
  output: QuotaRequestPriorityResponse,
  errors: [],
}));

// =============================================================================
// ScanConfig
// =============================================================================

export interface ListScanConfigsRequest {
  /** Defines the Account ID. */
  accountId: string;
}

export const ListScanConfigsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/scans/config",
  }),
) as unknown as Schema.Schema<ListScanConfigsRequest>;

export type ListScanConfigsResponse = {
  id: string;
  accountId: string;
  frequency: number;
  ips: string[];
  ports: string[];
}[];

export const ListScanConfigsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    frequency: Schema.Number,
    ips: Schema.Array(Schema.String),
    ports: Schema.Array(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      frequency: "frequency",
      ips: "ips",
      ports: "ports",
    }),
  ),
) as unknown as Schema.Schema<ListScanConfigsResponse>;

export type ListScanConfigsError = DefaultErrors;

export const listScanConfigs: API.OperationMethod<
  ListScanConfigsRequest,
  ListScanConfigsResponse,
  ListScanConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListScanConfigsRequest,
  output: ListScanConfigsResponse,
  errors: [],
}));

export interface CreateScanConfigRequest {
  /** Path param: Defines the Account ID. */
  accountId: string;
  /** Body param: Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000. */
  ips: string[];
  /** Body param: Defines the number of days between each scan (0 = One-off scan). */
  frequency?: number;
  /** Body param: Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open  */
  ports?: string[];
}

export const CreateScanConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    ips: Schema.Array(Schema.String),
    frequency: Schema.optional(Schema.Number),
    ports: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/scans/config",
    }),
  ) as unknown as Schema.Schema<CreateScanConfigRequest>;

export interface CreateScanConfigResponse {
  /** Defines the Config ID. */
  id: string;
  accountId: string;
  /** Defines the number of days between each scan (0 = One-off scan). */
  frequency: number;
  /** Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000. */
  ips: string[];
  /** Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports. */
  ports: string[];
}

export const CreateScanConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    frequency: Schema.Number,
    ips: Schema.Array(Schema.String),
    ports: Schema.Array(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      frequency: "frequency",
      ips: "ips",
      ports: "ports",
    }),
  ) as unknown as Schema.Schema<CreateScanConfigResponse>;

export type CreateScanConfigError = DefaultErrors;

export const createScanConfig: API.OperationMethod<
  CreateScanConfigRequest,
  CreateScanConfigResponse,
  CreateScanConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScanConfigRequest,
  output: CreateScanConfigResponse,
  errors: [],
}));

export interface PatchScanConfigRequest {
  configId: string;
  /** Path param: Defines the Account ID. */
  accountId: string;
  /** Body param: Defines the number of days between each scan (0 = One-off scan). */
  frequency?: number;
  /** Body param: Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000. */
  ips?: string[];
  /** Body param: Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open  */
  ports?: string[];
}

export const PatchScanConfigRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    configId: Schema.String.pipe(T.HttpPath("configId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    frequency: Schema.optional(Schema.Number),
    ips: Schema.optional(Schema.Array(Schema.String)),
    ports: Schema.optional(Schema.Array(Schema.String)),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/cloudforce-one/scans/config/{configId}",
  }),
) as unknown as Schema.Schema<PatchScanConfigRequest>;

export interface PatchScanConfigResponse {
  /** Defines the Config ID. */
  id: string;
  accountId: string;
  /** Defines the number of days between each scan (0 = One-off scan). */
  frequency: number;
  /** Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000. */
  ips: string[];
  /** Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports. */
  ports: string[];
}

export const PatchScanConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    frequency: Schema.Number,
    ips: Schema.Array(Schema.String),
    ports: Schema.Array(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      frequency: "frequency",
      ips: "ips",
      ports: "ports",
    }),
  ) as unknown as Schema.Schema<PatchScanConfigResponse>;

export type PatchScanConfigError = DefaultErrors;

export const patchScanConfig: API.OperationMethod<
  PatchScanConfigRequest,
  PatchScanConfigResponse,
  PatchScanConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchScanConfigRequest,
  output: PatchScanConfigResponse,
  errors: [],
}));

export interface DeleteScanConfigRequest {
  configId: string;
  /** Defines the Account ID. */
  accountId: string;
}

export const DeleteScanConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configId: Schema.String.pipe(T.HttpPath("configId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/scans/config/{configId}",
    }),
  ) as unknown as Schema.Schema<DeleteScanConfigRequest>;

export type DeleteScanConfigResponse = unknown;

export const DeleteScanConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteScanConfigResponse>;

export type DeleteScanConfigError = DefaultErrors;

export const deleteScanConfig: API.OperationMethod<
  DeleteScanConfigRequest,
  DeleteScanConfigResponse,
  DeleteScanConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScanConfigRequest,
  output: DeleteScanConfigResponse,
  errors: [],
}));

// =============================================================================
// ScanResult
// =============================================================================

export interface GetScanResultRequest {
  configId: string;
  /** Defines the Account ID. */
  accountId: string;
}

export const GetScanResultRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  configId: Schema.String.pipe(T.HttpPath("configId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/scans/results/{configId}",
  }),
) as unknown as Schema.Schema<GetScanResultRequest>;

export interface GetScanResultResponse {
  "1.1.1.1": {
    number?: number | null;
    proto?: string | null;
    status?: string | null;
  }[];
}

export const GetScanResultResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "1.1.1.1": Schema.Array(
    Schema.Struct({
      number: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      proto: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ),
}) as unknown as Schema.Schema<GetScanResultResponse>;

export type GetScanResultError = DefaultErrors;

export const getScanResult: API.OperationMethod<
  GetScanResultRequest,
  GetScanResultResponse,
  GetScanResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScanResultRequest,
  output: GetScanResultResponse,
  errors: [],
}));

// =============================================================================
// ThreatEvent
// =============================================================================

export interface GetThreatEventRequest {
  eventId: string;
  /** Account ID. */
  accountId: string;
}

export const GetThreatEventRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/cloudforce-one/events/{eventId}",
  }),
) as unknown as Schema.Schema<GetThreatEventRequest>;

export interface GetThreatEventResponse {
  attacker: string;
  attackerCountry: string;
  category: string;
  date: string;
  event: string;
  hasChildren: boolean;
  indicator: string;
  indicatorType: string;
  indicatorTypeId: number;
  killChain: number;
  mitreAttack: string[];
  numReferenced: number;
  numReferences: number;
  rawId: string;
  referenced: string[];
  referencedIds: number[];
  references: string[];
  referencesIds: number[];
  tags: string[];
  targetCountry: string;
  targetIndustry: string;
  tlp: string;
  uuid: string;
  insight?: string | null;
  releasabilityId?: string | null;
}

export const GetThreatEventResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    attacker: Schema.String,
    attackerCountry: Schema.String,
    category: Schema.String,
    date: Schema.String,
    event: Schema.String,
    hasChildren: Schema.Boolean,
    indicator: Schema.String,
    indicatorType: Schema.String,
    indicatorTypeId: Schema.Number,
    killChain: Schema.Number,
    mitreAttack: Schema.Array(Schema.String),
    numReferenced: Schema.Number,
    numReferences: Schema.Number,
    rawId: Schema.String,
    referenced: Schema.Array(Schema.String),
    referencedIds: Schema.Array(Schema.Number),
    references: Schema.Array(Schema.String),
    referencesIds: Schema.Array(Schema.Number),
    tags: Schema.Array(Schema.String),
    targetCountry: Schema.String,
    targetIndustry: Schema.String,
    tlp: Schema.String,
    uuid: Schema.String,
    insight: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    releasabilityId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  },
) as unknown as Schema.Schema<GetThreatEventResponse>;

export type GetThreatEventError = DefaultErrors;

export const getThreatEvent: API.OperationMethod<
  GetThreatEventRequest,
  GetThreatEventResponse,
  GetThreatEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThreatEventRequest,
  output: GetThreatEventResponse,
  errors: [],
}));

export interface ListThreatEventsRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Query param: */
  datasetId?: string[];
  /** Query param: */
  forceRefresh?: boolean;
  /** Query param: */
  format?: "json" | "stix2";
  /** Query param: */
  order?: "asc" | "desc";
  /** Query param: */
  orderBy?: string;
  /** Query param: */
  page?: number;
  /** Query param: */
  pageSize?: number;
  /** Query param: */
  search?: {
    field?: string;
    op?:
      | "equals"
      | "not"
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "like"
      | "contains"
      | "startsWith"
      | "endsWith"
      | "in"
      | "find";
    value?: string | number | (string | number)[];
  }[];
}

export const ListThreatEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasetId: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("datasetId"),
    ),
    forceRefresh: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("forceRefresh"),
    ),
    format: Schema.optional(Schema.Literals(["json", "stix2"])).pipe(
      T.HttpQuery("format"),
    ),
    order: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
      T.HttpQuery("order"),
    ),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    search: Schema.optional(
      Schema.Array(
        Schema.Struct({
          field: Schema.optional(Schema.String),
          op: Schema.optional(
            Schema.Literals([
              "equals",
              "not",
              "gt",
              "gte",
              "lt",
              "lte",
              "like",
              "contains",
              "startsWith",
              "endsWith",
              "in",
              "find",
            ]),
          ),
          value: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Number,
              Schema.Array(Schema.Union([Schema.String, Schema.Number])),
            ]),
          ),
        }),
      ),
    ).pipe(T.HttpQuery("search")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events",
    }),
  ) as unknown as Schema.Schema<ListThreatEventsRequest>;

export type ListThreatEventsResponse = {
  attacker: string;
  attackerCountry: string;
  category: string;
  date: string;
  event: string;
  hasChildren: boolean;
  indicator: string;
  indicatorType: string;
  indicatorTypeId: number;
  killChain: number;
  mitreAttack: string[];
  numReferenced: number;
  numReferences: number;
  rawId: string;
  referenced: string[];
  referencedIds: number[];
  references: string[];
  referencesIds: number[];
  tags: string[];
  targetCountry: string;
  targetIndustry: string;
  tlp: string;
  uuid: string;
  insight?: string | null;
  releasabilityId?: string | null;
}[];

export const ListThreatEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      attacker: Schema.String,
      attackerCountry: Schema.String,
      category: Schema.String,
      date: Schema.String,
      event: Schema.String,
      hasChildren: Schema.Boolean,
      indicator: Schema.String,
      indicatorType: Schema.String,
      indicatorTypeId: Schema.Number,
      killChain: Schema.Number,
      mitreAttack: Schema.Array(Schema.String),
      numReferenced: Schema.Number,
      numReferences: Schema.Number,
      rawId: Schema.String,
      referenced: Schema.Array(Schema.String),
      referencedIds: Schema.Array(Schema.Number),
      references: Schema.Array(Schema.String),
      referencesIds: Schema.Array(Schema.Number),
      tags: Schema.Array(Schema.String),
      targetCountry: Schema.String,
      targetIndustry: Schema.String,
      tlp: Schema.String,
      uuid: Schema.String,
      insight: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      releasabilityId: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
    }),
  ) as unknown as Schema.Schema<ListThreatEventsResponse>;

export type ListThreatEventsError = DefaultErrors;

export const listThreatEvents: API.OperationMethod<
  ListThreatEventsRequest,
  ListThreatEventsResponse,
  ListThreatEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventsRequest,
  output: ListThreatEventsResponse,
  errors: [],
}));

export interface CreateThreatEventRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  category: string;
  /** Body param: */
  date: string;
  /** Body param: */
  event: string;
  /** Body param: */
  raw: { data: Record<string, unknown> | null; source?: string; tlp?: string };
  /** Body param: */
  tlp: string;
  /** Body param: */
  attacker?: string | null;
  /** Body param: */
  attackerCountry?: string;
  /** Body param: */
  datasetId?: string;
  /** Body param: */
  indicator?: string;
  /** Body param: Array of indicators for this event. Supports multiple indicators per event for complex scenarios. */
  indicators?: { indicatorType: string; value: string }[];
  /** Body param: */
  indicatorType?: string;
  /** Body param: */
  insight?: string;
  /** Body param: */
  tags?: string[];
  /** Body param: */
  targetCountry?: string;
  /** Body param: */
  targetIndustry?: string;
  /** Body param: Optional UUID for the event. Only used when preserveUuid=true in bulk create. Must be a valid UUID format. */
  uuid?: string;
}

export const CreateThreatEventRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    category: Schema.String,
    date: Schema.String,
    event: Schema.String,
    raw: Schema.Struct({
      data: Schema.Union([Schema.Struct({}), Schema.Null]),
      source: Schema.optional(Schema.String),
      tlp: Schema.optional(Schema.String),
    }),
    tlp: Schema.String,
    attacker: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    attackerCountry: Schema.optional(Schema.String),
    datasetId: Schema.optional(Schema.String),
    indicator: Schema.optional(Schema.String),
    indicators: Schema.optional(
      Schema.Array(
        Schema.Struct({
          indicatorType: Schema.String,
          value: Schema.String,
        }),
      ),
    ),
    indicatorType: Schema.optional(Schema.String),
    insight: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Array(Schema.String)),
    targetCountry: Schema.optional(Schema.String),
    targetIndustry: Schema.optional(Schema.String),
    uuid: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/events/create",
    }),
  ) as unknown as Schema.Schema<CreateThreatEventRequest>;

export interface CreateThreatEventResponse {
  attacker: string;
  attackerCountry: string;
  category: string;
  date: string;
  event: string;
  hasChildren: boolean;
  indicator: string;
  indicatorType: string;
  indicatorTypeId: number;
  killChain: number;
  mitreAttack: string[];
  numReferenced: number;
  numReferences: number;
  rawId: string;
  referenced: string[];
  referencedIds: number[];
  references: string[];
  referencesIds: number[];
  tags: string[];
  targetCountry: string;
  targetIndustry: string;
  tlp: string;
  uuid: string;
  insight?: string | null;
  releasabilityId?: string | null;
}

export const CreateThreatEventResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    attacker: Schema.String,
    attackerCountry: Schema.String,
    category: Schema.String,
    date: Schema.String,
    event: Schema.String,
    hasChildren: Schema.Boolean,
    indicator: Schema.String,
    indicatorType: Schema.String,
    indicatorTypeId: Schema.Number,
    killChain: Schema.Number,
    mitreAttack: Schema.Array(Schema.String),
    numReferenced: Schema.Number,
    numReferences: Schema.Number,
    rawId: Schema.String,
    referenced: Schema.Array(Schema.String),
    referencedIds: Schema.Array(Schema.Number),
    references: Schema.Array(Schema.String),
    referencesIds: Schema.Array(Schema.Number),
    tags: Schema.Array(Schema.String),
    targetCountry: Schema.String,
    targetIndustry: Schema.String,
    tlp: Schema.String,
    uuid: Schema.String,
    insight: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    releasabilityId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }) as unknown as Schema.Schema<CreateThreatEventResponse>;

export type CreateThreatEventError = DefaultErrors;

export const createThreatEvent: API.OperationMethod<
  CreateThreatEventRequest,
  CreateThreatEventResponse,
  CreateThreatEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateThreatEventRequest,
  output: CreateThreatEventResponse,
  errors: [],
}));

export interface PatchThreatEventRequest {
  eventId: string;
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  attacker?: string | null;
  /** Body param: */
  attackerCountry?: string;
  /** Body param: */
  category?: string;
  /** Body param: */
  createdAt?: string;
  /** Body param: */
  datasetId?: string;
  /** Body param: */
  date?: string;
  /** Body param: */
  event?: string;
  /** Body param: */
  indicator?: string;
  /** Body param: */
  indicatorType?: string;
  /** Body param: */
  insight?: string;
  /** Body param: */
  raw?: {
    data?: Record<string, unknown> | null;
    source?: string;
    tlp?: string;
  };
  /** Body param: */
  targetCountry?: string;
  /** Body param: */
  targetIndustry?: string;
  /** Body param: */
  tlp?: string;
}

export const PatchThreatEventRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    attacker: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    attackerCountry: Schema.optional(Schema.String),
    category: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    datasetId: Schema.optional(Schema.String),
    date: Schema.optional(Schema.String),
    event: Schema.optional(Schema.String),
    indicator: Schema.optional(Schema.String),
    indicatorType: Schema.optional(Schema.String),
    insight: Schema.optional(Schema.String),
    raw: Schema.optional(
      Schema.Struct({
        data: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
        source: Schema.optional(Schema.String),
        tlp: Schema.optional(Schema.String),
      }),
    ),
    targetCountry: Schema.optional(Schema.String),
    targetIndustry: Schema.optional(Schema.String),
    tlp: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/cloudforce-one/events/{eventId}",
    }),
  ) as unknown as Schema.Schema<PatchThreatEventRequest>;

export interface PatchThreatEventResponse {
  attacker: string;
  attackerCountry: string;
  category: string;
  date: string;
  event: string;
  hasChildren: boolean;
  indicator: string;
  indicatorType: string;
  indicatorTypeId: number;
  killChain: number;
  mitreAttack: string[];
  numReferenced: number;
  numReferences: number;
  rawId: string;
  referenced: string[];
  referencedIds: number[];
  references: string[];
  referencesIds: number[];
  tags: string[];
  targetCountry: string;
  targetIndustry: string;
  tlp: string;
  uuid: string;
  insight?: string | null;
  releasabilityId?: string | null;
}

export const PatchThreatEventResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    attacker: Schema.String,
    attackerCountry: Schema.String,
    category: Schema.String,
    date: Schema.String,
    event: Schema.String,
    hasChildren: Schema.Boolean,
    indicator: Schema.String,
    indicatorType: Schema.String,
    indicatorTypeId: Schema.Number,
    killChain: Schema.Number,
    mitreAttack: Schema.Array(Schema.String),
    numReferenced: Schema.Number,
    numReferences: Schema.Number,
    rawId: Schema.String,
    referenced: Schema.Array(Schema.String),
    referencedIds: Schema.Array(Schema.Number),
    references: Schema.Array(Schema.String),
    referencesIds: Schema.Array(Schema.Number),
    tags: Schema.Array(Schema.String),
    targetCountry: Schema.String,
    targetIndustry: Schema.String,
    tlp: Schema.String,
    uuid: Schema.String,
    insight: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    releasabilityId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }) as unknown as Schema.Schema<PatchThreatEventResponse>;

export type PatchThreatEventError = DefaultErrors;

export const patchThreatEvent: API.OperationMethod<
  PatchThreatEventRequest,
  PatchThreatEventResponse,
  PatchThreatEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchThreatEventRequest,
  output: PatchThreatEventResponse,
  errors: [],
}));

export interface DeleteThreatEventRequest {
  eventId: string;
  /** Account ID. */
  accountId: string;
}

export const DeleteThreatEventRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/events/{eventId}",
    }),
  ) as unknown as Schema.Schema<DeleteThreatEventRequest>;

export interface DeleteThreatEventResponse {
  uuid: string;
}

export const DeleteThreatEventResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    uuid: Schema.String,
  }) as unknown as Schema.Schema<DeleteThreatEventResponse>;

export type DeleteThreatEventError = DefaultErrors;

export const deleteThreatEvent: API.OperationMethod<
  DeleteThreatEventRequest,
  DeleteThreatEventResponse,
  DeleteThreatEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteThreatEventRequest,
  output: DeleteThreatEventResponse,
  errors: [],
}));

export interface BulkCreateThreatEventsRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  data: {
    category: string;
    date: string;
    event: string;
    raw: {
      data: Record<string, unknown> | null;
      source?: string;
      tlp?: string;
    };
    tlp: string;
    accountId?: number;
    attacker?: string | null;
    attackerCountry?: string;
    datasetId?: string;
    indicator?: string;
    indicators?: { indicatorType: string; value: string }[];
    indicatorType?: string;
    insight?: string;
    tags?: string[];
    targetCountry?: string;
    targetIndustry?: string;
    uuid?: string;
  }[];
  /** Body param: */
  datasetId: string;
  /** Body param: When true, use provided UUIDs from event data instead of generating new ones. Used for migration scenarios where original UUIDs must be preserved. Duplicate UUIDs will be skipped. */
  preserveUuid?: boolean;
}

export const BulkCreateThreatEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    data: Schema.Array(
      Schema.Struct({
        category: Schema.String,
        date: Schema.String,
        event: Schema.String,
        raw: Schema.Struct({
          data: Schema.Union([Schema.Struct({}), Schema.Null]),
          source: Schema.optional(Schema.String),
          tlp: Schema.optional(Schema.String),
        }),
        tlp: Schema.String,
        accountId: Schema.optional(Schema.Number),
        attacker: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        attackerCountry: Schema.optional(Schema.String),
        datasetId: Schema.optional(Schema.String),
        indicator: Schema.optional(Schema.String),
        indicators: Schema.optional(
          Schema.Array(
            Schema.Struct({
              indicatorType: Schema.String,
              value: Schema.String,
            }),
          ),
        ),
        indicatorType: Schema.optional(Schema.String),
        insight: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Array(Schema.String)),
        targetCountry: Schema.optional(Schema.String),
        targetIndustry: Schema.optional(Schema.String),
        uuid: Schema.optional(Schema.String),
      }),
    ),
    datasetId: Schema.String,
    preserveUuid: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/events/create/bulk",
    }),
  ) as unknown as Schema.Schema<BulkCreateThreatEventsRequest>;

export interface BulkCreateThreatEventsResponse {
  /** Number of events created */
  createdEventsCount: number;
  /** Number of new tags created in SoT */
  createdTagsCount: number;
  /** Number of errors encountered */
  errorCount: number;
  /** Number of indicators queued for async processing */
  queuedIndicatorsCount: number;
  /** Number of events skipped due to duplicate UUID (only when preserveUuid=true) */
  skippedEventsCount: number;
  /** Correlation ID for async indicator processing */
  createBulkEventsRequestId?: string | null;
  /** Array of error details */
  errors?: { error: string; eventIndex: number }[] | null;
}

export const BulkCreateThreatEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    createdEventsCount: Schema.Number,
    createdTagsCount: Schema.Number,
    errorCount: Schema.Number,
    queuedIndicatorsCount: Schema.Number,
    skippedEventsCount: Schema.Number,
    createBulkEventsRequestId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    errors: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            error: Schema.String,
            eventIndex: Schema.Number,
          }),
        ),
        Schema.Null,
      ]),
    ),
  }) as unknown as Schema.Schema<BulkCreateThreatEventsResponse>;

export type BulkCreateThreatEventsError = DefaultErrors;

export const bulkCreateThreatEvents: API.OperationMethod<
  BulkCreateThreatEventsRequest,
  BulkCreateThreatEventsResponse,
  BulkCreateThreatEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkCreateThreatEventsRequest,
  output: BulkCreateThreatEventsResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventAttacker
// =============================================================================

export interface ListThreatEventAttackersRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Query param: Array of dataset IDs to query attackers from. If not provided, uses the default dataset. */
  datasetIds?: string[];
}

export const ListThreatEventAttackersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasetIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("datasetIds"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/attackers",
    }),
  ) as unknown as Schema.Schema<ListThreatEventAttackersRequest>;

export interface ListThreatEventAttackersResponse {
  items: { type: string };
  type: string;
}

export const ListThreatEventAttackersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    items: Schema.Struct({
      type: Schema.String,
    }),
    type: Schema.String,
  }) as unknown as Schema.Schema<ListThreatEventAttackersResponse>;

export type ListThreatEventAttackersError = DefaultErrors;

export const listThreatEventAttackers: API.OperationMethod<
  ListThreatEventAttackersRequest,
  ListThreatEventAttackersResponse,
  ListThreatEventAttackersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventAttackersRequest,
  output: ListThreatEventAttackersResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventCategory
// =============================================================================

export interface GetThreatEventCategoryRequest {
  categoryId: string;
  /** Account ID. */
  accountId: string;
}

export const GetThreatEventCategoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    categoryId: Schema.String.pipe(T.HttpPath("categoryId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/categories/{categoryId}",
    }),
  ) as unknown as Schema.Schema<GetThreatEventCategoryRequest>;

export interface GetThreatEventCategoryResponse {
  killChain: number;
  name: string;
  uuid: string;
  mitreAttack?: string[] | null;
  shortname?: string | null;
}

export const GetThreatEventCategoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    killChain: Schema.Number,
    name: Schema.String,
    uuid: Schema.String,
    mitreAttack: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    shortname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<GetThreatEventCategoryResponse>;

export type GetThreatEventCategoryError = DefaultErrors;

export const getThreatEventCategory: API.OperationMethod<
  GetThreatEventCategoryRequest,
  GetThreatEventCategoryResponse,
  GetThreatEventCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThreatEventCategoryRequest,
  output: GetThreatEventCategoryResponse,
  errors: [],
}));

export interface ListThreatEventCategoriesRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Query param: Array of dataset IDs to query categories from. If not provided, uses the default dataset. */
  datasetIds?: string[];
}

export const ListThreatEventCategoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasetIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("datasetIds"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/categories",
    }),
  ) as unknown as Schema.Schema<ListThreatEventCategoriesRequest>;

export type ListThreatEventCategoriesResponse = {
  killChain: number;
  name: string;
  uuid: string;
  mitreAttack?: string[] | null;
  shortname?: string | null;
}[];

export const ListThreatEventCategoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      killChain: Schema.Number,
      name: Schema.String,
      uuid: Schema.String,
      mitreAttack: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      shortname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ) as unknown as Schema.Schema<ListThreatEventCategoriesResponse>;

export type ListThreatEventCategoriesError = DefaultErrors;

export const listThreatEventCategories: API.OperationMethod<
  ListThreatEventCategoriesRequest,
  ListThreatEventCategoriesResponse,
  ListThreatEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventCategoriesRequest,
  output: ListThreatEventCategoriesResponse,
  errors: [],
}));

export interface CreateThreatEventCategoryRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  killChain: number;
  /** Body param: */
  name: string;
  /** Body param: */
  mitreAttack?: string[];
  /** Body param: */
  shortname?: string;
}

export const CreateThreatEventCategoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    killChain: Schema.Number,
    name: Schema.String,
    mitreAttack: Schema.optional(Schema.Array(Schema.String)),
    shortname: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/events/categories/create",
    }),
  ) as unknown as Schema.Schema<CreateThreatEventCategoryRequest>;

export interface CreateThreatEventCategoryResponse {
  killChain: number;
  name: string;
  uuid: string;
  mitreAttack?: string[] | null;
  shortname?: string | null;
}

export const CreateThreatEventCategoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    killChain: Schema.Number,
    name: Schema.String,
    uuid: Schema.String,
    mitreAttack: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    shortname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<CreateThreatEventCategoryResponse>;

export type CreateThreatEventCategoryError = DefaultErrors;

export const createThreatEventCategory: API.OperationMethod<
  CreateThreatEventCategoryRequest,
  CreateThreatEventCategoryResponse,
  CreateThreatEventCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateThreatEventCategoryRequest,
  output: CreateThreatEventCategoryResponse,
  errors: [],
}));

export interface PatchThreatEventCategoryRequest {
  categoryId: string;
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  killChain?: number;
  /** Body param: */
  mitreAttack?: string[];
  /** Body param: */
  name?: string;
  /** Body param: */
  shortname?: string;
}

export const PatchThreatEventCategoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    categoryId: Schema.String.pipe(T.HttpPath("categoryId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    killChain: Schema.optional(Schema.Number),
    mitreAttack: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    shortname: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/cloudforce-one/events/categories/{categoryId}",
    }),
  ) as unknown as Schema.Schema<PatchThreatEventCategoryRequest>;

export interface PatchThreatEventCategoryResponse {
  killChain: number;
  name: string;
  uuid: string;
  mitreAttack?: string[] | null;
  shortname?: string | null;
}

export const PatchThreatEventCategoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    killChain: Schema.Number,
    name: Schema.String,
    uuid: Schema.String,
    mitreAttack: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    shortname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<PatchThreatEventCategoryResponse>;

export type PatchThreatEventCategoryError = DefaultErrors;

export const patchThreatEventCategory: API.OperationMethod<
  PatchThreatEventCategoryRequest,
  PatchThreatEventCategoryResponse,
  PatchThreatEventCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchThreatEventCategoryRequest,
  output: PatchThreatEventCategoryResponse,
  errors: [],
}));

export interface DeleteThreatEventCategoryRequest {
  categoryId: string;
  /** Account ID. */
  accountId: string;
}

export const DeleteThreatEventCategoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    categoryId: Schema.String.pipe(T.HttpPath("categoryId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/events/categories/{categoryId}",
    }),
  ) as unknown as Schema.Schema<DeleteThreatEventCategoryRequest>;

export interface DeleteThreatEventCategoryResponse {
  uuid: string;
}

export const DeleteThreatEventCategoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    uuid: Schema.String,
  }) as unknown as Schema.Schema<DeleteThreatEventCategoryResponse>;

export type DeleteThreatEventCategoryError = DefaultErrors;

export const deleteThreatEventCategory: API.OperationMethod<
  DeleteThreatEventCategoryRequest,
  DeleteThreatEventCategoryResponse,
  DeleteThreatEventCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteThreatEventCategoryRequest,
  output: DeleteThreatEventCategoryResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventCountry
// =============================================================================

export interface ListThreatEventCountriesRequest {
  /** Account ID. */
  accountId: string;
}

export const ListThreatEventCountriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/countries",
    }),
  ) as unknown as Schema.Schema<ListThreatEventCountriesRequest>;

export type ListThreatEventCountriesResponse = {
  result: { alpha3: string; name: string }[];
  success: string;
}[];

export const ListThreatEventCountriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      result: Schema.Array(
        Schema.Struct({
          alpha3: Schema.String,
          name: Schema.String,
        }),
      ),
      success: Schema.String,
    }),
  ) as unknown as Schema.Schema<ListThreatEventCountriesResponse>;

export type ListThreatEventCountriesError = DefaultErrors;

export const listThreatEventCountries: API.OperationMethod<
  ListThreatEventCountriesRequest,
  ListThreatEventCountriesResponse,
  ListThreatEventCountriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventCountriesRequest,
  output: ListThreatEventCountriesResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventDataset
// =============================================================================

export interface GetThreatEventDatasetRequest {
  datasetId: string;
  /** Account ID. */
  accountId: string;
}

export const GetThreatEventDatasetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/dataset/{datasetId}",
    }),
  ) as unknown as Schema.Schema<GetThreatEventDatasetRequest>;

export interface GetThreatEventDatasetResponse {
  isPublic: boolean;
  name: string;
  uuid: string;
}

export const GetThreatEventDatasetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isPublic: Schema.Boolean,
    name: Schema.String,
    uuid: Schema.String,
  }) as unknown as Schema.Schema<GetThreatEventDatasetResponse>;

export type GetThreatEventDatasetError = DefaultErrors;

export const getThreatEventDataset: API.OperationMethod<
  GetThreatEventDatasetRequest,
  GetThreatEventDatasetResponse,
  GetThreatEventDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThreatEventDatasetRequest,
  output: GetThreatEventDatasetResponse,
  errors: [],
}));

export interface ListThreatEventDatasetsRequest {
  /** Account ID. */
  accountId: string;
}

export const ListThreatEventDatasetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/dataset",
    }),
  ) as unknown as Schema.Schema<ListThreatEventDatasetsRequest>;

export type ListThreatEventDatasetsResponse = {
  isPublic: boolean;
  name: string;
  uuid: string;
}[];

export const ListThreatEventDatasetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      isPublic: Schema.Boolean,
      name: Schema.String,
      uuid: Schema.String,
    }),
  ) as unknown as Schema.Schema<ListThreatEventDatasetsResponse>;

export type ListThreatEventDatasetsError = DefaultErrors;

export const listThreatEventDatasets: API.OperationMethod<
  ListThreatEventDatasetsRequest,
  ListThreatEventDatasetsResponse,
  ListThreatEventDatasetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventDatasetsRequest,
  output: ListThreatEventDatasetsResponse,
  errors: [],
}));

export interface CreateThreatEventDatasetRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: If true, then anyone can search the dataset. If false, then its limited to the account. */
  isPublic: boolean;
  /** Body param: Used to describe the dataset within the account context. */
  name: string;
}

export const CreateThreatEventDatasetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    isPublic: Schema.Boolean,
    name: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/events/dataset/create",
    }),
  ) as unknown as Schema.Schema<CreateThreatEventDatasetRequest>;

export interface CreateThreatEventDatasetResponse {
  isPublic: boolean;
  name: string;
  uuid: string;
}

export const CreateThreatEventDatasetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isPublic: Schema.Boolean,
    name: Schema.String,
    uuid: Schema.String,
  }) as unknown as Schema.Schema<CreateThreatEventDatasetResponse>;

export type CreateThreatEventDatasetError = DefaultErrors;

export const createThreatEventDataset: API.OperationMethod<
  CreateThreatEventDatasetRequest,
  CreateThreatEventDatasetResponse,
  CreateThreatEventDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateThreatEventDatasetRequest,
  output: CreateThreatEventDatasetResponse,
  errors: [],
}));

export interface PatchThreatEventDatasetRequest {
  datasetId: string;
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: If true, then anyone can search the dataset. If false, then its limited to the account. */
  isPublic: boolean;
  /** Body param: Used to describe the dataset within the account context. */
  name: string;
}

export const PatchThreatEventDatasetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    isPublic: Schema.Boolean,
    name: Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/cloudforce-one/events/dataset/{datasetId}",
    }),
  ) as unknown as Schema.Schema<PatchThreatEventDatasetRequest>;

export interface PatchThreatEventDatasetResponse {
  isPublic: boolean;
  name: string;
  uuid: string;
}

export const PatchThreatEventDatasetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isPublic: Schema.Boolean,
    name: Schema.String,
    uuid: Schema.String,
  }) as unknown as Schema.Schema<PatchThreatEventDatasetResponse>;

export type PatchThreatEventDatasetError = DefaultErrors;

export const patchThreatEventDataset: API.OperationMethod<
  PatchThreatEventDatasetRequest,
  PatchThreatEventDatasetResponse,
  PatchThreatEventDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchThreatEventDatasetRequest,
  output: PatchThreatEventDatasetResponse,
  errors: [],
}));

export interface RawThreatEventDatasetRequest {
  datasetId: string;
  eventId: string;
  /** Account ID. */
  accountId: string;
}

export const RawThreatEventDatasetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/raw/{datasetId}/{eventId}",
    }),
  ) as unknown as Schema.Schema<RawThreatEventDatasetRequest>;

export interface RawThreatEventDatasetResponse {
  id: string;
  accountId: number;
  created: string;
  data: unknown;
  source: string;
  tlp: string;
}

export const RawThreatEventDatasetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.Number,
    created: Schema.String,
    data: Schema.Unknown,
    source: Schema.String,
    tlp: Schema.String,
  }) as unknown as Schema.Schema<RawThreatEventDatasetResponse>;

export type RawThreatEventDatasetError = DefaultErrors;

export const rawThreatEventDataset: API.OperationMethod<
  RawThreatEventDatasetRequest,
  RawThreatEventDatasetResponse,
  RawThreatEventDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RawThreatEventDatasetRequest,
  output: RawThreatEventDatasetResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventEventTag
// =============================================================================

export interface CreateThreatEventEventTagRequest {
  eventId: string;
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  tags: string[];
}

export const CreateThreatEventEventTagRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    tags: Schema.Array(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/events/event_tag/{eventId}/create",
    }),
  ) as unknown as Schema.Schema<CreateThreatEventEventTagRequest>;

export interface CreateThreatEventEventTagResponse {
  success: boolean;
}

export const CreateThreatEventEventTagResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    success: Schema.Boolean,
  }) as unknown as Schema.Schema<CreateThreatEventEventTagResponse>;

export type CreateThreatEventEventTagError = DefaultErrors;

export const createThreatEventEventTag: API.OperationMethod<
  CreateThreatEventEventTagRequest,
  CreateThreatEventEventTagResponse,
  CreateThreatEventEventTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateThreatEventEventTagRequest,
  output: CreateThreatEventEventTagResponse,
  errors: [],
}));

export interface DeleteThreatEventEventTagRequest {
  eventId: string;
  /** Account ID. */
  accountId: string;
}

export const DeleteThreatEventEventTagRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/events/event_tag/{eventId}",
    }),
  ) as unknown as Schema.Schema<DeleteThreatEventEventTagRequest>;

export interface DeleteThreatEventEventTagResponse {
  success: boolean;
}

export const DeleteThreatEventEventTagResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    success: Schema.Boolean,
  }) as unknown as Schema.Schema<DeleteThreatEventEventTagResponse>;

export type DeleteThreatEventEventTagError = DefaultErrors;

export const deleteThreatEventEventTag: API.OperationMethod<
  DeleteThreatEventEventTagRequest,
  DeleteThreatEventEventTagResponse,
  DeleteThreatEventEventTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteThreatEventEventTagRequest,
  output: DeleteThreatEventEventTagResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventIndicatorType
// =============================================================================

export interface ListThreatEventIndicatorTypesRequest {
  /** Account ID. */
  accountId: string;
}

export const ListThreatEventIndicatorTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/indicatorTypes",
    }),
  ) as unknown as Schema.Schema<ListThreatEventIndicatorTypesRequest>;

export interface ListThreatEventIndicatorTypesResponse {
  items: { type: string };
  type: string;
}

export const ListThreatEventIndicatorTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    items: Schema.Struct({
      type: Schema.String,
    }),
    type: Schema.String,
  }) as unknown as Schema.Schema<ListThreatEventIndicatorTypesResponse>;

export type ListThreatEventIndicatorTypesError = DefaultErrors;

export const listThreatEventIndicatorTypes: API.OperationMethod<
  ListThreatEventIndicatorTypesRequest,
  ListThreatEventIndicatorTypesResponse,
  ListThreatEventIndicatorTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventIndicatorTypesRequest,
  output: ListThreatEventIndicatorTypesResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventRaw
// =============================================================================

export interface GetThreatEventRawRequest {
  eventId: string;
  rawId: string;
  /** Account ID. */
  accountId: string;
}

export const GetThreatEventRawRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    rawId: Schema.String.pipe(T.HttpPath("rawId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/{eventId}/raw/{rawId}",
    }),
  ) as unknown as Schema.Schema<GetThreatEventRawRequest>;

export interface GetThreatEventRawResponse {
  id: string;
  accountId: number;
  created: string;
  data: unknown;
  source: string;
  tlp: string;
}

export const GetThreatEventRawResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.Number,
    created: Schema.String,
    data: Schema.Unknown,
    source: Schema.String,
    tlp: Schema.String,
  }) as unknown as Schema.Schema<GetThreatEventRawResponse>;

export type GetThreatEventRawError = DefaultErrors;

export const getThreatEventRaw: API.OperationMethod<
  GetThreatEventRawRequest,
  GetThreatEventRawResponse,
  GetThreatEventRawError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThreatEventRawRequest,
  output: GetThreatEventRawResponse,
  errors: [],
}));

export interface PatchThreatEventRawRequest {
  eventId: string;
  rawId: string;
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  data?: unknown;
  /** Body param: */
  source?: string;
  /** Body param: */
  tlp?: string;
}

export const PatchThreatEventRawRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    rawId: Schema.String.pipe(T.HttpPath("rawId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    data: Schema.optional(Schema.Unknown),
    source: Schema.optional(Schema.String),
    tlp: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/cloudforce-one/events/{eventId}/raw/{rawId}",
    }),
  ) as unknown as Schema.Schema<PatchThreatEventRawRequest>;

export interface PatchThreatEventRawResponse {
  id: string;
  data: unknown;
}

export const PatchThreatEventRawResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    data: Schema.Unknown,
  }) as unknown as Schema.Schema<PatchThreatEventRawResponse>;

export type PatchThreatEventRawError = DefaultErrors;

export const patchThreatEventRaw: API.OperationMethod<
  PatchThreatEventRawRequest,
  PatchThreatEventRawResponse,
  PatchThreatEventRawError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchThreatEventRawRequest,
  output: PatchThreatEventRawResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventRelate
// =============================================================================

export interface DeleteThreatEventRelateRequest {
  eventId: string;
  /** Account ID. */
  accountId: string;
}

export const DeleteThreatEventRelateRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventId: Schema.String.pipe(T.HttpPath("eventId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/cloudforce-one/events/relate/{eventId}",
    }),
  ) as unknown as Schema.Schema<DeleteThreatEventRelateRequest>;

export interface DeleteThreatEventRelateResponse {
  success: boolean;
}

export const DeleteThreatEventRelateResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    success: Schema.Boolean,
  }) as unknown as Schema.Schema<DeleteThreatEventRelateResponse>;

export type DeleteThreatEventRelateError = DefaultErrors;

export const deleteThreatEventRelate: API.OperationMethod<
  DeleteThreatEventRelateRequest,
  DeleteThreatEventRelateResponse,
  DeleteThreatEventRelateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteThreatEventRelateRequest,
  output: DeleteThreatEventRelateResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventTag
// =============================================================================

export interface CreateThreatEventTagRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Body param: */
  value: string;
  /** Body param: */
  activeDuration?: string;
  /** Body param: */
  actorCategory?: string;
  /** Body param: */
  aliasGroupNames?: string[];
  /** Body param: */
  aliasGroupNamesInternal?: string[];
  /** Body param: */
  analyticPriority?: number;
  /** Body param: */
  attributionConfidence?: string;
  /** Body param: */
  attributionOrganization?: string;
  /** Body param: */
  categoryUuid?: string;
  /** Body param: */
  externalReferenceLinks?: string[];
  /** Body param: */
  internalDescription?: string;
  /** Body param: */
  motive?: string;
  /** Body param: */
  opsecLevel?: string;
  /** Body param: */
  originCountryISO?: string;
  /** Body param: */
  priority?: number;
  /** Body param: */
  sophisticationLevel?: string;
}

export const CreateThreatEventTagRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    value: Schema.String,
    activeDuration: Schema.optional(Schema.String),
    actorCategory: Schema.optional(Schema.String),
    aliasGroupNames: Schema.optional(Schema.Array(Schema.String)),
    aliasGroupNamesInternal: Schema.optional(Schema.Array(Schema.String)),
    analyticPriority: Schema.optional(Schema.Number),
    attributionConfidence: Schema.optional(Schema.String),
    attributionOrganization: Schema.optional(Schema.String),
    categoryUuid: Schema.optional(Schema.String),
    externalReferenceLinks: Schema.optional(Schema.Array(Schema.String)),
    internalDescription: Schema.optional(Schema.String),
    motive: Schema.optional(Schema.String),
    opsecLevel: Schema.optional(Schema.String),
    originCountryISO: Schema.optional(Schema.String),
    priority: Schema.optional(Schema.Number),
    sophisticationLevel: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/cloudforce-one/events/tags/create",
    }),
  ) as unknown as Schema.Schema<CreateThreatEventTagRequest>;

export interface CreateThreatEventTagResponse {
  uuid: string;
  value: string;
  activeDuration?: string | null;
  actorCategory?: string | null;
  aliasGroupNames?: string[] | null;
  aliasGroupNamesInternal?: string[] | null;
  analyticPriority?: number | null;
  attributionConfidence?: string | null;
  attributionOrganization?: string | null;
  categoryName?: string | null;
  categoryUuid?: string | null;
  externalReferenceLinks?: string[] | null;
  internalDescription?: string | null;
  motive?: string | null;
  opsecLevel?: string | null;
  originCountryISO?: string | null;
  priority?: number | null;
  sophisticationLevel?: string | null;
}

export const CreateThreatEventTagResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    uuid: Schema.String,
    value: Schema.String,
    activeDuration: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    actorCategory: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    aliasGroupNames: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    aliasGroupNamesInternal: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    analyticPriority: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    attributionConfidence: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    attributionOrganization: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    categoryName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    categoryUuid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    externalReferenceLinks: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    internalDescription: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    motive: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    opsecLevel: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    originCountryISO: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    sophisticationLevel: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }) as unknown as Schema.Schema<CreateThreatEventTagResponse>;

export type CreateThreatEventTagError = DefaultErrors;

export const createThreatEventTag: API.OperationMethod<
  CreateThreatEventTagRequest,
  CreateThreatEventTagResponse,
  CreateThreatEventTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateThreatEventTagRequest,
  output: CreateThreatEventTagResponse,
  errors: [],
}));

// =============================================================================
// ThreatEventTargetIndustry
// =============================================================================

export interface ListThreatEventTargetIndustriesRequest {
  /** Path param: Account ID. */
  accountId: string;
  /** Query param: Array of dataset IDs to query target industries from. If not provided, uses the default dataset. */
  datasetIds?: string[];
}

export const ListThreatEventTargetIndustriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasetIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("datasetIds"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/cloudforce-one/events/targetIndustries",
    }),
  ) as unknown as Schema.Schema<ListThreatEventTargetIndustriesRequest>;

export interface ListThreatEventTargetIndustriesResponse {
  items: { type: string };
  type: string;
}

export const ListThreatEventTargetIndustriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    items: Schema.Struct({
      type: Schema.String,
    }),
    type: Schema.String,
  }) as unknown as Schema.Schema<ListThreatEventTargetIndustriesResponse>;

export type ListThreatEventTargetIndustriesError = DefaultErrors;

export const listThreatEventTargetIndustries: API.OperationMethod<
  ListThreatEventTargetIndustriesRequest,
  ListThreatEventTargetIndustriesResponse,
  ListThreatEventTargetIndustriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThreatEventTargetIndustriesRequest,
  output: ListThreatEventTargetIndustriesResponse,
  errors: [],
}));
