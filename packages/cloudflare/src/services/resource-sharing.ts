/**
 * Cloudflare RESOURCE-SHARING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service resource-sharing
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Recipient
// =============================================================================

export interface GetRecipientRequest {
  shareId: string;
  recipientId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Query param: Include resources in the response. */
  includeResources?: boolean;
}

export const GetRecipientRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  recipientId: Schema.String.pipe(T.HttpPath("recipientId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  includeResources: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_resources"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/shares/{shareId}/recipients/{recipientId}",
  }),
) as unknown as Schema.Schema<GetRecipientRequest>;

export interface GetRecipientResponse {
  /** Share Recipient identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** Share Recipient association status. */
  associationStatus:
    | "associating"
    | "associated"
    | "disassociating"
    | "disassociated";
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  resources?:
    | {
        error: string;
        resourceId: string;
        resourceVersion: number;
        terminal: boolean;
      }[]
    | null;
}

export const GetRecipientResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  associationStatus: Schema.Literals([
    "associating",
    "associated",
    "disassociating",
    "disassociated",
  ]),
  created: Schema.String,
  modified: Schema.String,
  resources: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          error: Schema.String,
          resourceId: Schema.String,
          resourceVersion: Schema.Number,
          terminal: Schema.Boolean,
        }).pipe(
          Schema.encodeKeys({
            error: "error",
            resourceId: "resource_id",
            resourceVersion: "resource_version",
            terminal: "terminal",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      associationStatus: "association_status",
      created: "created",
      modified: "modified",
      resources: "resources",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetRecipientResponse>;

export type GetRecipientError = DefaultErrors;

export const getRecipient: API.OperationMethod<
  GetRecipientRequest,
  GetRecipientResponse,
  GetRecipientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecipientRequest,
  output: GetRecipientResponse,
  errors: [],
}));

export interface ListRecipientsRequest {
  shareId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Query param: Include resources in the response. */
  includeResources?: boolean;
}

export const ListRecipientsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  includeResources: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_resources"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/shares/{shareId}/recipients",
  }),
) as unknown as Schema.Schema<ListRecipientsRequest>;

export interface ListRecipientsResponse {
  result: {
    id: string;
    accountId: string;
    associationStatus:
      | "associating"
      | "associated"
      | "disassociating"
      | "disassociated";
    created: string;
    modified: string;
    resources?:
      | {
          error: string;
          resourceId: string;
          resourceVersion: number;
          terminal: boolean;
        }[]
      | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListRecipientsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        accountId: Schema.String,
        associationStatus: Schema.Literals([
          "associating",
          "associated",
          "disassociating",
          "disassociated",
        ]),
        created: Schema.String,
        modified: Schema.String,
        resources: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                error: Schema.String,
                resourceId: Schema.String,
                resourceVersion: Schema.Number,
                terminal: Schema.Boolean,
              }).pipe(
                Schema.encodeKeys({
                  error: "error",
                  resourceId: "resource_id",
                  resourceVersion: "resource_version",
                  terminal: "terminal",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          accountId: "account_id",
          associationStatus: "association_status",
          created: "created",
          modified: "modified",
          resources: "resources",
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
) as unknown as Schema.Schema<ListRecipientsResponse>;

export type ListRecipientsError = DefaultErrors;

export const listRecipients: API.PaginatedOperationMethod<
  ListRecipientsRequest,
  ListRecipientsResponse,
  ListRecipientsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListRecipientsRequest,
  ) => stream.Stream<
    ListRecipientsResponse,
    ListRecipientsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListRecipientsRequest) => stream.Stream<
    {
      id: string;
      accountId: string;
      associationStatus:
        | "associating"
        | "associated"
        | "disassociating"
        | "disassociated";
      created: string;
      modified: string;
      resources?:
        | {
            error: string;
            resourceId: string;
            resourceVersion: number;
            terminal: boolean;
          }[]
        | null;
    },
    ListRecipientsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRecipientsRequest,
  output: ListRecipientsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateRecipientRequest {
  shareId: string;
  /** Path param: Account identifier. */
  pathAccountId: string;
  /** Body param: Account identifier. */
  bodyAccountId?: string;
  /** Body param: Organization identifier. */
  organizationId?: string;
}

export const CreateRecipientRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    shareId: Schema.String.pipe(T.HttpPath("shareId")),
    pathAccountId: Schema.String.pipe(T.HttpPath("path_account_id")),
    bodyAccountId: Schema.optional(Schema.String),
    organizationId: Schema.optional(Schema.String),
  },
).pipe(
  Schema.encodeKeys({
    bodyAccountId: "body_account_id",
    organizationId: "organization_id",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{path_account_id}/shares/{shareId}/recipients",
  }),
) as unknown as Schema.Schema<CreateRecipientRequest>;

export interface CreateRecipientResponse {
  /** Share Recipient identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** Share Recipient association status. */
  associationStatus:
    | "associating"
    | "associated"
    | "disassociating"
    | "disassociated";
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  resources?:
    | {
        error: string;
        resourceId: string;
        resourceVersion: number;
        terminal: boolean;
      }[]
    | null;
}

export const CreateRecipientResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    associationStatus: Schema.Literals([
      "associating",
      "associated",
      "disassociating",
      "disassociated",
    ]),
    created: Schema.String,
    modified: Schema.String,
    resources: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            error: Schema.String,
            resourceId: Schema.String,
            resourceVersion: Schema.Number,
            terminal: Schema.Boolean,
          }).pipe(
            Schema.encodeKeys({
              error: "error",
              resourceId: "resource_id",
              resourceVersion: "resource_version",
              terminal: "terminal",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        associationStatus: "association_status",
        created: "created",
        modified: "modified",
        resources: "resources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateRecipientResponse>;

export type CreateRecipientError = DefaultErrors;

export const createRecipient: API.OperationMethod<
  CreateRecipientRequest,
  CreateRecipientResponse,
  CreateRecipientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRecipientRequest,
  output: CreateRecipientResponse,
  errors: [],
}));

export interface DeleteRecipientRequest {
  shareId: string;
  recipientId: string;
  /** Account identifier. */
  accountId: string;
}

export const DeleteRecipientRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    shareId: Schema.String.pipe(T.HttpPath("shareId")),
    recipientId: Schema.String.pipe(T.HttpPath("recipientId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/shares/{shareId}/recipients/{recipientId}",
  }),
) as unknown as Schema.Schema<DeleteRecipientRequest>;

export interface DeleteRecipientResponse {
  /** Share Recipient identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** Share Recipient association status. */
  associationStatus:
    | "associating"
    | "associated"
    | "disassociating"
    | "disassociated";
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  resources?:
    | {
        error: string;
        resourceId: string;
        resourceVersion: number;
        terminal: boolean;
      }[]
    | null;
}

export const DeleteRecipientResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    associationStatus: Schema.Literals([
      "associating",
      "associated",
      "disassociating",
      "disassociated",
    ]),
    created: Schema.String,
    modified: Schema.String,
    resources: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            error: Schema.String,
            resourceId: Schema.String,
            resourceVersion: Schema.Number,
            terminal: Schema.Boolean,
          }).pipe(
            Schema.encodeKeys({
              error: "error",
              resourceId: "resource_id",
              resourceVersion: "resource_version",
              terminal: "terminal",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        associationStatus: "association_status",
        created: "created",
        modified: "modified",
        resources: "resources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteRecipientResponse>;

export type DeleteRecipientError = DefaultErrors;

export const deleteRecipient: API.OperationMethod<
  DeleteRecipientRequest,
  DeleteRecipientResponse,
  DeleteRecipientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRecipientRequest,
  output: DeleteRecipientResponse,
  errors: [],
}));

// =============================================================================
// Resource
// =============================================================================

export interface GetResourceRequest {
  shareId: string;
  resourceId: string;
  /** Account identifier. */
  accountId: string;
}

export const GetResourceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/shares/{shareId}/resources/{resourceId}",
  }),
) as unknown as Schema.Schema<GetResourceRequest>;

export interface GetResourceResponse {
  /** Share Resource identifier. */
  id: string;
  /** When the share was created. */
  created: string;
  /** Resource Metadata. */
  meta: unknown;
  /** When the share was modified. */
  modified: string;
  /** Account identifier. */
  resourceAccountId: string;
  /** Share Resource identifier. */
  resourceId: string;
  /** Resource Type. */
  resourceType:
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching";
  /** Resource Version. */
  resourceVersion: number;
  /** Resource Status. */
  status: "active" | "deleting" | "deleted";
}

export const GetResourceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  created: Schema.String,
  meta: Schema.Unknown,
  modified: Schema.String,
  resourceAccountId: Schema.String,
  resourceId: Schema.String,
  resourceType: Schema.Literals([
    "custom-ruleset",
    "widget",
    "gateway-policy",
    "gateway-destination-ip",
    "gateway-block-page-settings",
    "gateway-extended-email-matching",
  ]),
  resourceVersion: Schema.Number,
  status: Schema.Literals(["active", "deleting", "deleted"]),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      created: "created",
      meta: "meta",
      modified: "modified",
      resourceAccountId: "resource_account_id",
      resourceId: "resource_id",
      resourceType: "resource_type",
      resourceVersion: "resource_version",
      status: "status",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetResourceResponse>;

export type GetResourceError = DefaultErrors;

export const getResource: API.OperationMethod<
  GetResourceRequest,
  GetResourceResponse,
  GetResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceRequest,
  output: GetResourceResponse,
  errors: [],
}));

export interface ListResourcesRequest {
  shareId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Query param: Filter share resources by resource_type. */
  resourceType?:
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching";
  /** Query param: Filter share resources by status. */
  status?: "active" | "deleting" | "deleted";
}

export const ListResourcesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  resourceType: Schema.optional(
    Schema.Literals([
      "custom-ruleset",
      "widget",
      "gateway-policy",
      "gateway-destination-ip",
      "gateway-block-page-settings",
      "gateway-extended-email-matching",
    ]),
  ).pipe(T.HttpQuery("resource_type")),
  status: Schema.optional(
    Schema.Literals(["active", "deleting", "deleted"]),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/shares/{shareId}/resources",
  }),
) as unknown as Schema.Schema<ListResourcesRequest>;

export interface ListResourcesResponse {
  result: {
    id: string;
    created: string;
    meta: unknown;
    modified: string;
    resourceAccountId: string;
    resourceId: string;
    resourceType:
      | "custom-ruleset"
      | "widget"
      | "gateway-policy"
      | "gateway-destination-ip"
      | "gateway-block-page-settings"
      | "gateway-extended-email-matching";
    resourceVersion: number;
    status: "active" | "deleting" | "deleted";
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListResourcesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      created: Schema.String,
      meta: Schema.Unknown,
      modified: Schema.String,
      resourceAccountId: Schema.String,
      resourceId: Schema.String,
      resourceType: Schema.Literals([
        "custom-ruleset",
        "widget",
        "gateway-policy",
        "gateway-destination-ip",
        "gateway-block-page-settings",
        "gateway-extended-email-matching",
      ]),
      resourceVersion: Schema.Number,
      status: Schema.Literals(["active", "deleting", "deleted"]),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        created: "created",
        meta: "meta",
        modified: "modified",
        resourceAccountId: "resource_account_id",
        resourceId: "resource_id",
        resourceType: "resource_type",
        resourceVersion: "resource_version",
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
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListResourcesResponse>;

export type ListResourcesError = DefaultErrors;

export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourcesRequest,
  ) => stream.Stream<
    ListResourcesResponse,
    ListResourcesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListResourcesRequest) => stream.Stream<
    {
      id: string;
      created: string;
      meta: unknown;
      modified: string;
      resourceAccountId: string;
      resourceId: string;
      resourceType:
        | "custom-ruleset"
        | "widget"
        | "gateway-policy"
        | "gateway-destination-ip"
        | "gateway-block-page-settings"
        | "gateway-extended-email-matching";
      resourceVersion: number;
      status: "active" | "deleting" | "deleted";
    },
    ListResourcesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateResourceRequest {
  shareId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Body param: Resource Metadata. */
  meta: unknown;
  /** Body param: Account identifier. */
  resourceAccountId: string;
  /** Body param: Share Resource identifier. */
  resourceId: string;
  /** Body param: Resource Type. */
  resourceType:
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching";
}

export const CreateResourceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  meta: Schema.Unknown,
  resourceAccountId: Schema.String,
  resourceId: Schema.String,
  resourceType: Schema.Literals([
    "custom-ruleset",
    "widget",
    "gateway-policy",
    "gateway-destination-ip",
    "gateway-block-page-settings",
    "gateway-extended-email-matching",
  ]),
}).pipe(
  Schema.encodeKeys({
    meta: "meta",
    resourceAccountId: "resource_account_id",
    resourceId: "resource_id",
    resourceType: "resource_type",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/shares/{shareId}/resources",
  }),
) as unknown as Schema.Schema<CreateResourceRequest>;

export interface CreateResourceResponse {
  /** Share Resource identifier. */
  id: string;
  /** When the share was created. */
  created: string;
  /** Resource Metadata. */
  meta: unknown;
  /** When the share was modified. */
  modified: string;
  /** Account identifier. */
  resourceAccountId: string;
  /** Share Resource identifier. */
  resourceId: string;
  /** Resource Type. */
  resourceType:
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching";
  /** Resource Version. */
  resourceVersion: number;
  /** Resource Status. */
  status: "active" | "deleting" | "deleted";
}

export const CreateResourceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    created: Schema.String,
    meta: Schema.Unknown,
    modified: Schema.String,
    resourceAccountId: Schema.String,
    resourceId: Schema.String,
    resourceType: Schema.Literals([
      "custom-ruleset",
      "widget",
      "gateway-policy",
      "gateway-destination-ip",
      "gateway-block-page-settings",
      "gateway-extended-email-matching",
    ]),
    resourceVersion: Schema.Number,
    status: Schema.Literals(["active", "deleting", "deleted"]),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      created: "created",
      meta: "meta",
      modified: "modified",
      resourceAccountId: "resource_account_id",
      resourceId: "resource_id",
      resourceType: "resource_type",
      resourceVersion: "resource_version",
      status: "status",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateResourceResponse>;

export type CreateResourceError = DefaultErrors;

export const createResource: API.OperationMethod<
  CreateResourceRequest,
  CreateResourceResponse,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResourceRequest,
  output: CreateResourceResponse,
  errors: [],
}));

export interface UpdateResourceRequest {
  shareId: string;
  resourceId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Body param: Resource Metadata. */
  meta: unknown;
}

export const UpdateResourceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  meta: Schema.Unknown,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/shares/{shareId}/resources/{resourceId}",
  }),
) as unknown as Schema.Schema<UpdateResourceRequest>;

export interface UpdateResourceResponse {
  /** Share Resource identifier. */
  id: string;
  /** When the share was created. */
  created: string;
  /** Resource Metadata. */
  meta: unknown;
  /** When the share was modified. */
  modified: string;
  /** Account identifier. */
  resourceAccountId: string;
  /** Share Resource identifier. */
  resourceId: string;
  /** Resource Type. */
  resourceType:
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching";
  /** Resource Version. */
  resourceVersion: number;
  /** Resource Status. */
  status: "active" | "deleting" | "deleted";
}

export const UpdateResourceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    created: Schema.String,
    meta: Schema.Unknown,
    modified: Schema.String,
    resourceAccountId: Schema.String,
    resourceId: Schema.String,
    resourceType: Schema.Literals([
      "custom-ruleset",
      "widget",
      "gateway-policy",
      "gateway-destination-ip",
      "gateway-block-page-settings",
      "gateway-extended-email-matching",
    ]),
    resourceVersion: Schema.Number,
    status: Schema.Literals(["active", "deleting", "deleted"]),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      created: "created",
      meta: "meta",
      modified: "modified",
      resourceAccountId: "resource_account_id",
      resourceId: "resource_id",
      resourceType: "resource_type",
      resourceVersion: "resource_version",
      status: "status",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateResourceResponse>;

export type UpdateResourceError = DefaultErrors;

export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  UpdateResourceResponse,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceRequest,
  output: UpdateResourceResponse,
  errors: [],
}));

export interface DeleteResourceRequest {
  shareId: string;
  resourceId: string;
  /** Account identifier. */
  accountId: string;
}

export const DeleteResourceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareId: Schema.String.pipe(T.HttpPath("shareId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/shares/{shareId}/resources/{resourceId}",
  }),
) as unknown as Schema.Schema<DeleteResourceRequest>;

export interface DeleteResourceResponse {
  /** Share Resource identifier. */
  id: string;
  /** When the share was created. */
  created: string;
  /** Resource Metadata. */
  meta: unknown;
  /** When the share was modified. */
  modified: string;
  /** Account identifier. */
  resourceAccountId: string;
  /** Share Resource identifier. */
  resourceId: string;
  /** Resource Type. */
  resourceType:
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching";
  /** Resource Version. */
  resourceVersion: number;
  /** Resource Status. */
  status: "active" | "deleting" | "deleted";
}

export const DeleteResourceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    created: Schema.String,
    meta: Schema.Unknown,
    modified: Schema.String,
    resourceAccountId: Schema.String,
    resourceId: Schema.String,
    resourceType: Schema.Literals([
      "custom-ruleset",
      "widget",
      "gateway-policy",
      "gateway-destination-ip",
      "gateway-block-page-settings",
      "gateway-extended-email-matching",
    ]),
    resourceVersion: Schema.Number,
    status: Schema.Literals(["active", "deleting", "deleted"]),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      created: "created",
      meta: "meta",
      modified: "modified",
      resourceAccountId: "resource_account_id",
      resourceId: "resource_id",
      resourceType: "resource_type",
      resourceVersion: "resource_version",
      status: "status",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteResourceResponse>;

export type DeleteResourceError = DefaultErrors;

export const deleteResource: API.OperationMethod<
  DeleteResourceRequest,
  DeleteResourceResponse,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceRequest,
  output: DeleteResourceResponse,
  errors: [],
}));

// =============================================================================
// ResourceSharing
// =============================================================================

export interface GetResourceSharingRequest {
  shareId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Query param: Include recipient counts in the response. */
  includeRecipientCounts?: boolean;
  /** Query param: Include resources in the response. */
  includeResources?: boolean;
}

export const GetResourceSharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareId: Schema.String.pipe(T.HttpPath("shareId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    includeRecipientCounts: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("include_recipient_counts"),
    ),
    includeResources: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("include_resources"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/shares/{shareId}" }),
  ) as unknown as Schema.Schema<GetResourceSharingRequest>;

export interface GetResourceSharingResponse {
  /** Share identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** The display name of an account. */
  accountName: string;
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  /** The name of the share. */
  name: string;
  /** Organization identifier. */
  organizationId: string;
  status: "active" | "deleting" | "deleted";
  targetType: "account" | "organization";
  /** The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatedRecipientCount?: number | null;
  /** The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatingRecipientCount?: number | null;
  /** The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatedRecipientCount?: number | null;
  /** The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatingRecipientCount?: number | null;
  kind?: "sent" | "received" | null;
  /** A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter. */
  resources?:
    | {
        id: string;
        created: string;
        meta: unknown;
        modified: string;
        resourceAccountId: string;
        resourceId: string;
        resourceType:
          | "custom-ruleset"
          | "widget"
          | "gateway-policy"
          | "gateway-destination-ip"
          | "gateway-block-page-settings"
          | "gateway-extended-email-matching";
        resourceVersion: number;
        status: "active" | "deleting" | "deleted";
      }[]
    | null;
}

export const GetResourceSharingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    accountName: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    organizationId: Schema.String,
    status: Schema.Literals(["active", "deleting", "deleted"]),
    targetType: Schema.Literals(["account", "organization"]),
    associatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    associatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kind: Schema.optional(
      Schema.Union([Schema.Literals(["sent", "received"]), Schema.Null]),
    ),
    resources: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            created: Schema.String,
            meta: Schema.Unknown,
            modified: Schema.String,
            resourceAccountId: Schema.String,
            resourceId: Schema.String,
            resourceType: Schema.Literals([
              "custom-ruleset",
              "widget",
              "gateway-policy",
              "gateway-destination-ip",
              "gateway-block-page-settings",
              "gateway-extended-email-matching",
            ]),
            resourceVersion: Schema.Number,
            status: Schema.Literals(["active", "deleting", "deleted"]),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              created: "created",
              meta: "meta",
              modified: "modified",
              resourceAccountId: "resource_account_id",
              resourceId: "resource_id",
              resourceType: "resource_type",
              resourceVersion: "resource_version",
              status: "status",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountName: "account_name",
        created: "created",
        modified: "modified",
        name: "name",
        organizationId: "organization_id",
        status: "status",
        targetType: "target_type",
        associatedRecipientCount: "associated_recipient_count",
        associatingRecipientCount: "associating_recipient_count",
        disassociatedRecipientCount: "disassociated_recipient_count",
        disassociatingRecipientCount: "disassociating_recipient_count",
        kind: "kind",
        resources: "resources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetResourceSharingResponse>;

export type GetResourceSharingError = DefaultErrors;

export const getResourceSharing: API.OperationMethod<
  GetResourceSharingRequest,
  GetResourceSharingResponse,
  GetResourceSharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceSharingRequest,
  output: GetResourceSharingResponse,
  errors: [],
}));

export interface ListResourceSharingsRequest {
  /** Path param: Account identifier. */
  accountId: string;
  /** Query param: Direction to sort objects. */
  direction?: "asc" | "desc";
  /** Query param: Include recipient counts in the response. */
  includeRecipientCounts?: boolean;
  /** Query param: Include resources in the response. */
  includeResources?: boolean;
  /** Query param: Filter shares by kind. */
  kind?: "sent" | "received";
  /** Query param: Order shares by values in the given field. */
  order?: "name" | "created";
  /** Query param: Filter share resources by resource_types. */
  resourceTypes?: (
    | "custom-ruleset"
    | "widget"
    | "gateway-policy"
    | "gateway-destination-ip"
    | "gateway-block-page-settings"
    | "gateway-extended-email-matching"
  )[];
  /** Query param: Filter shares by status. */
  status?: "active" | "deleting" | "deleted";
  /** Query param: Filter shares by target_type. */
  targetType?: "account" | "organization";
}

export const ListResourceSharingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
      T.HttpQuery("direction"),
    ),
    includeRecipientCounts: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("include_recipient_counts"),
    ),
    includeResources: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("include_resources"),
    ),
    kind: Schema.optional(Schema.Literals(["sent", "received"])).pipe(
      T.HttpQuery("kind"),
    ),
    order: Schema.optional(Schema.Literals(["name", "created"])).pipe(
      T.HttpQuery("order"),
    ),
    resourceTypes: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "custom-ruleset",
          "widget",
          "gateway-policy",
          "gateway-destination-ip",
          "gateway-block-page-settings",
          "gateway-extended-email-matching",
        ]),
      ),
    ).pipe(T.HttpQuery("resource_types")),
    status: Schema.optional(
      Schema.Literals(["active", "deleting", "deleted"]),
    ).pipe(T.HttpQuery("status")),
    targetType: Schema.optional(
      Schema.Literals(["account", "organization"]),
    ).pipe(T.HttpQuery("target_type")),
  }).pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/shares" }),
  ) as unknown as Schema.Schema<ListResourceSharingsRequest>;

export interface ListResourceSharingsResponse {
  result: {
    id: string;
    accountId: string;
    accountName: string;
    created: string;
    modified: string;
    name: string;
    organizationId: string;
    status: "active" | "deleting" | "deleted";
    targetType: "account" | "organization";
    associatedRecipientCount?: number | null;
    associatingRecipientCount?: number | null;
    disassociatedRecipientCount?: number | null;
    disassociatingRecipientCount?: number | null;
    kind?: "sent" | "received" | null;
    resources?:
      | {
          id: string;
          created: string;
          meta: unknown;
          modified: string;
          resourceAccountId: string;
          resourceId: string;
          resourceType:
            | "custom-ruleset"
            | "widget"
            | "gateway-policy"
            | "gateway-destination-ip"
            | "gateway-block-page-settings"
            | "gateway-extended-email-matching";
          resourceVersion: number;
          status: "active" | "deleting" | "deleted";
        }[]
      | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListResourceSharingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        accountId: Schema.String,
        accountName: Schema.String,
        created: Schema.String,
        modified: Schema.String,
        name: Schema.String,
        organizationId: Schema.String,
        status: Schema.Literals(["active", "deleting", "deleted"]),
        targetType: Schema.Literals(["account", "organization"]),
        associatedRecipientCount: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        associatingRecipientCount: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        disassociatedRecipientCount: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        disassociatingRecipientCount: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        kind: Schema.optional(
          Schema.Union([Schema.Literals(["sent", "received"]), Schema.Null]),
        ),
        resources: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                id: Schema.String,
                created: Schema.String,
                meta: Schema.Unknown,
                modified: Schema.String,
                resourceAccountId: Schema.String,
                resourceId: Schema.String,
                resourceType: Schema.Literals([
                  "custom-ruleset",
                  "widget",
                  "gateway-policy",
                  "gateway-destination-ip",
                  "gateway-block-page-settings",
                  "gateway-extended-email-matching",
                ]),
                resourceVersion: Schema.Number,
                status: Schema.Literals(["active", "deleting", "deleted"]),
              }).pipe(
                Schema.encodeKeys({
                  id: "id",
                  created: "created",
                  meta: "meta",
                  modified: "modified",
                  resourceAccountId: "resource_account_id",
                  resourceId: "resource_id",
                  resourceType: "resource_type",
                  resourceVersion: "resource_version",
                  status: "status",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          accountId: "account_id",
          accountName: "account_name",
          created: "created",
          modified: "modified",
          name: "name",
          organizationId: "organization_id",
          status: "status",
          targetType: "target_type",
          associatedRecipientCount: "associated_recipient_count",
          associatingRecipientCount: "associating_recipient_count",
          disassociatedRecipientCount: "disassociated_recipient_count",
          disassociatingRecipientCount: "disassociating_recipient_count",
          kind: "kind",
          resources: "resources",
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
  ) as unknown as Schema.Schema<ListResourceSharingsResponse>;

export type ListResourceSharingsError = DefaultErrors;

export const listResourceSharings: API.PaginatedOperationMethod<
  ListResourceSharingsRequest,
  ListResourceSharingsResponse,
  ListResourceSharingsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceSharingsRequest,
  ) => stream.Stream<
    ListResourceSharingsResponse,
    ListResourceSharingsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListResourceSharingsRequest) => stream.Stream<
    {
      id: string;
      accountId: string;
      accountName: string;
      created: string;
      modified: string;
      name: string;
      organizationId: string;
      status: "active" | "deleting" | "deleted";
      targetType: "account" | "organization";
      associatedRecipientCount?: number | null;
      associatingRecipientCount?: number | null;
      disassociatedRecipientCount?: number | null;
      disassociatingRecipientCount?: number | null;
      kind?: "sent" | "received" | null;
      resources?:
        | {
            id: string;
            created: string;
            meta: unknown;
            modified: string;
            resourceAccountId: string;
            resourceId: string;
            resourceType:
              | "custom-ruleset"
              | "widget"
              | "gateway-policy"
              | "gateway-destination-ip"
              | "gateway-block-page-settings"
              | "gateway-extended-email-matching";
            resourceVersion: number;
            status: "active" | "deleting" | "deleted";
          }[]
        | null;
    },
    ListResourceSharingsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceSharingsRequest,
  output: ListResourceSharingsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateResourceSharingRequest {
  /** Path param: Account identifier. */
  accountId: string;
  /** Body param: The name of the share. */
  name: string;
  /** Body param: */
  recipients: { accountId?: string; organizationId?: string }[];
  /** Body param: */
  resources: {
    meta: unknown;
    resourceAccountId: string;
    resourceId: string;
    resourceType:
      | "custom-ruleset"
      | "widget"
      | "gateway-policy"
      | "gateway-destination-ip"
      | "gateway-block-page-settings"
      | "gateway-extended-email-matching";
  }[];
}

export const CreateResourceSharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    recipients: Schema.Array(
      Schema.Struct({
        accountId: Schema.optional(Schema.String),
        organizationId: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          organizationId: "organization_id",
        }),
      ),
    ),
    resources: Schema.Array(
      Schema.Struct({
        meta: Schema.Unknown,
        resourceAccountId: Schema.String,
        resourceId: Schema.String,
        resourceType: Schema.Literals([
          "custom-ruleset",
          "widget",
          "gateway-policy",
          "gateway-destination-ip",
          "gateway-block-page-settings",
          "gateway-extended-email-matching",
        ]),
      }).pipe(
        Schema.encodeKeys({
          meta: "meta",
          resourceAccountId: "resource_account_id",
          resourceId: "resource_id",
          resourceType: "resource_type",
        }),
      ),
    ),
  }).pipe(
    T.Http({ method: "POST", path: "/accounts/{account_id}/shares" }),
  ) as unknown as Schema.Schema<CreateResourceSharingRequest>;

export interface CreateResourceSharingResponse {
  /** Share identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** The display name of an account. */
  accountName: string;
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  /** The name of the share. */
  name: string;
  /** Organization identifier. */
  organizationId: string;
  status: "active" | "deleting" | "deleted";
  targetType: "account" | "organization";
  /** The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatedRecipientCount?: number | null;
  /** The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatingRecipientCount?: number | null;
  /** The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatedRecipientCount?: number | null;
  /** The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatingRecipientCount?: number | null;
  kind?: "sent" | "received" | null;
  /** A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter. */
  resources?:
    | {
        id: string;
        created: string;
        meta: unknown;
        modified: string;
        resourceAccountId: string;
        resourceId: string;
        resourceType:
          | "custom-ruleset"
          | "widget"
          | "gateway-policy"
          | "gateway-destination-ip"
          | "gateway-block-page-settings"
          | "gateway-extended-email-matching";
        resourceVersion: number;
        status: "active" | "deleting" | "deleted";
      }[]
    | null;
}

export const CreateResourceSharingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    accountName: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    organizationId: Schema.String,
    status: Schema.Literals(["active", "deleting", "deleted"]),
    targetType: Schema.Literals(["account", "organization"]),
    associatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    associatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kind: Schema.optional(
      Schema.Union([Schema.Literals(["sent", "received"]), Schema.Null]),
    ),
    resources: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            created: Schema.String,
            meta: Schema.Unknown,
            modified: Schema.String,
            resourceAccountId: Schema.String,
            resourceId: Schema.String,
            resourceType: Schema.Literals([
              "custom-ruleset",
              "widget",
              "gateway-policy",
              "gateway-destination-ip",
              "gateway-block-page-settings",
              "gateway-extended-email-matching",
            ]),
            resourceVersion: Schema.Number,
            status: Schema.Literals(["active", "deleting", "deleted"]),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              created: "created",
              meta: "meta",
              modified: "modified",
              resourceAccountId: "resource_account_id",
              resourceId: "resource_id",
              resourceType: "resource_type",
              resourceVersion: "resource_version",
              status: "status",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountName: "account_name",
        created: "created",
        modified: "modified",
        name: "name",
        organizationId: "organization_id",
        status: "status",
        targetType: "target_type",
        associatedRecipientCount: "associated_recipient_count",
        associatingRecipientCount: "associating_recipient_count",
        disassociatedRecipientCount: "disassociated_recipient_count",
        disassociatingRecipientCount: "disassociating_recipient_count",
        kind: "kind",
        resources: "resources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateResourceSharingResponse>;

export type CreateResourceSharingError = DefaultErrors;

export const createResourceSharing: API.OperationMethod<
  CreateResourceSharingRequest,
  CreateResourceSharingResponse,
  CreateResourceSharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResourceSharingRequest,
  output: CreateResourceSharingResponse,
  errors: [],
}));

export interface UpdateResourceSharingRequest {
  shareId: string;
  /** Path param: Account identifier. */
  accountId: string;
  /** Body param: The name of the share. */
  name: string;
}

export const UpdateResourceSharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareId: Schema.String.pipe(T.HttpPath("shareId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
  }).pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/shares/{shareId}" }),
  ) as unknown as Schema.Schema<UpdateResourceSharingRequest>;

export interface UpdateResourceSharingResponse {
  /** Share identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** The display name of an account. */
  accountName: string;
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  /** The name of the share. */
  name: string;
  /** Organization identifier. */
  organizationId: string;
  status: "active" | "deleting" | "deleted";
  targetType: "account" | "organization";
  /** The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatedRecipientCount?: number | null;
  /** The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatingRecipientCount?: number | null;
  /** The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatedRecipientCount?: number | null;
  /** The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatingRecipientCount?: number | null;
  kind?: "sent" | "received" | null;
  /** A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter. */
  resources?:
    | {
        id: string;
        created: string;
        meta: unknown;
        modified: string;
        resourceAccountId: string;
        resourceId: string;
        resourceType:
          | "custom-ruleset"
          | "widget"
          | "gateway-policy"
          | "gateway-destination-ip"
          | "gateway-block-page-settings"
          | "gateway-extended-email-matching";
        resourceVersion: number;
        status: "active" | "deleting" | "deleted";
      }[]
    | null;
}

export const UpdateResourceSharingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    accountName: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    organizationId: Schema.String,
    status: Schema.Literals(["active", "deleting", "deleted"]),
    targetType: Schema.Literals(["account", "organization"]),
    associatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    associatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kind: Schema.optional(
      Schema.Union([Schema.Literals(["sent", "received"]), Schema.Null]),
    ),
    resources: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            created: Schema.String,
            meta: Schema.Unknown,
            modified: Schema.String,
            resourceAccountId: Schema.String,
            resourceId: Schema.String,
            resourceType: Schema.Literals([
              "custom-ruleset",
              "widget",
              "gateway-policy",
              "gateway-destination-ip",
              "gateway-block-page-settings",
              "gateway-extended-email-matching",
            ]),
            resourceVersion: Schema.Number,
            status: Schema.Literals(["active", "deleting", "deleted"]),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              created: "created",
              meta: "meta",
              modified: "modified",
              resourceAccountId: "resource_account_id",
              resourceId: "resource_id",
              resourceType: "resource_type",
              resourceVersion: "resource_version",
              status: "status",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountName: "account_name",
        created: "created",
        modified: "modified",
        name: "name",
        organizationId: "organization_id",
        status: "status",
        targetType: "target_type",
        associatedRecipientCount: "associated_recipient_count",
        associatingRecipientCount: "associating_recipient_count",
        disassociatedRecipientCount: "disassociated_recipient_count",
        disassociatingRecipientCount: "disassociating_recipient_count",
        kind: "kind",
        resources: "resources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateResourceSharingResponse>;

export type UpdateResourceSharingError = DefaultErrors;

export const updateResourceSharing: API.OperationMethod<
  UpdateResourceSharingRequest,
  UpdateResourceSharingResponse,
  UpdateResourceSharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceSharingRequest,
  output: UpdateResourceSharingResponse,
  errors: [],
}));

export interface DeleteResourceSharingRequest {
  shareId: string;
  /** Account identifier. */
  accountId: string;
}

export const DeleteResourceSharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareId: Schema.String.pipe(T.HttpPath("shareId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/shares/{shareId}",
    }),
  ) as unknown as Schema.Schema<DeleteResourceSharingRequest>;

export interface DeleteResourceSharingResponse {
  /** Share identifier tag. */
  id: string;
  /** Account identifier. */
  accountId: string;
  /** The display name of an account. */
  accountName: string;
  /** When the share was created. */
  created: string;
  /** When the share was modified. */
  modified: string;
  /** The name of the share. */
  name: string;
  /** Organization identifier. */
  organizationId: string;
  status: "active" | "deleting" | "deleted";
  targetType: "account" | "organization";
  /** The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatedRecipientCount?: number | null;
  /** The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  associatingRecipientCount?: number | null;
  /** The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatedRecipientCount?: number | null;
  /** The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parameter. */
  disassociatingRecipientCount?: number | null;
  kind?: "sent" | "received" | null;
  /** A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter. */
  resources?:
    | {
        id: string;
        created: string;
        meta: unknown;
        modified: string;
        resourceAccountId: string;
        resourceId: string;
        resourceType:
          | "custom-ruleset"
          | "widget"
          | "gateway-policy"
          | "gateway-destination-ip"
          | "gateway-block-page-settings"
          | "gateway-extended-email-matching";
        resourceVersion: number;
        status: "active" | "deleting" | "deleted";
      }[]
    | null;
}

export const DeleteResourceSharingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    accountName: Schema.String,
    created: Schema.String,
    modified: Schema.String,
    name: Schema.String,
    organizationId: Schema.String,
    status: Schema.Literals(["active", "deleting", "deleted"]),
    targetType: Schema.Literals(["account", "organization"]),
    associatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    associatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatedRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    disassociatingRecipientCount: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    kind: Schema.optional(
      Schema.Union([Schema.Literals(["sent", "received"]), Schema.Null]),
    ),
    resources: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            created: Schema.String,
            meta: Schema.Unknown,
            modified: Schema.String,
            resourceAccountId: Schema.String,
            resourceId: Schema.String,
            resourceType: Schema.Literals([
              "custom-ruleset",
              "widget",
              "gateway-policy",
              "gateway-destination-ip",
              "gateway-block-page-settings",
              "gateway-extended-email-matching",
            ]),
            resourceVersion: Schema.Number,
            status: Schema.Literals(["active", "deleting", "deleted"]),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              created: "created",
              meta: "meta",
              modified: "modified",
              resourceAccountId: "resource_account_id",
              resourceId: "resource_id",
              resourceType: "resource_type",
              resourceVersion: "resource_version",
              status: "status",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountName: "account_name",
        created: "created",
        modified: "modified",
        name: "name",
        organizationId: "organization_id",
        status: "status",
        targetType: "target_type",
        associatedRecipientCount: "associated_recipient_count",
        associatingRecipientCount: "associating_recipient_count",
        disassociatedRecipientCount: "disassociated_recipient_count",
        disassociatingRecipientCount: "disassociating_recipient_count",
        kind: "kind",
        resources: "resources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteResourceSharingResponse>;

export type DeleteResourceSharingError = DefaultErrors;

export const deleteResourceSharing: API.OperationMethod<
  DeleteResourceSharingRequest,
  DeleteResourceSharingResponse,
  DeleteResourceSharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceSharingRequest,
  output: DeleteResourceSharingResponse,
  errors: [],
}));
