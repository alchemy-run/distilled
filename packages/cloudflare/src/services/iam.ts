/**
 * Cloudflare IAM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service iam
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

export class InvalidMember extends Schema.TaggedErrorClass<InvalidMember>()(
  "InvalidMember",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidMember, [{ code: 400 }]);

// =============================================================================
// PermissionGroup
// =============================================================================

export interface GetPermissionGroupRequest {
  permissionGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetPermissionGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    permissionGroupId: Schema.String.pipe(T.HttpPath("permissionGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/iam/permission_groups/{permissionGroupId}",
    }),
  ) as unknown as Schema.Schema<GetPermissionGroupRequest>;

export interface GetPermissionGroupResponse {
  /** Identifier of the permission group. */
  id: string;
  /** Attributes associated to the permission group. */
  meta?: { key?: string | null; value?: string | null } | null;
  /** Name of the permission group. */
  name?: string | null;
}

export const GetPermissionGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    meta: Schema.optional(
      Schema.Union([
        Schema.Struct({
          key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetPermissionGroupResponse>;

export type GetPermissionGroupError = DefaultErrors;

export const getPermissionGroup: API.OperationMethod<
  GetPermissionGroupRequest,
  GetPermissionGroupResponse,
  GetPermissionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPermissionGroupRequest,
  output: GetPermissionGroupResponse,
  errors: [],
}));

export interface ListPermissionGroupsRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: ID of the permission group to be fetched. */
  id?: string;
  /** Query param: Label of the permission group to be fetched. */
  label?: string;
  /** Query param: Name of the permission group to be fetched. */
  name?: string;
}

export const ListPermissionGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
    label: Schema.optional(Schema.String).pipe(T.HttpQuery("label")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/iam/permission_groups",
    }),
  ) as unknown as Schema.Schema<ListPermissionGroupsRequest>;

export interface ListPermissionGroupsResponse {
  result: {
    id: string;
    meta?: { key?: string | null; value?: string | null } | null;
    name?: string | null;
  }[];
  resultInfo?: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  } | null;
}

export const ListPermissionGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        meta: Schema.optional(
          Schema.Union([
            Schema.Struct({
              key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              value: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
    resultInfo: Schema.optional(
      Schema.Union([
        Schema.Struct({
          count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          totalCount: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            count: "count",
            page: "page",
            perPage: "per_page",
            totalCount: "total_count",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
  ) as unknown as Schema.Schema<ListPermissionGroupsResponse>;

export type ListPermissionGroupsError = DefaultErrors;

export const listPermissionGroups: API.PaginatedOperationMethod<
  ListPermissionGroupsRequest,
  ListPermissionGroupsResponse,
  ListPermissionGroupsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListPermissionGroupsRequest,
  ) => stream.Stream<
    ListPermissionGroupsResponse,
    ListPermissionGroupsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListPermissionGroupsRequest,
  ) => stream.Stream<
    {
      id: string;
      meta?: { key?: string | null; value?: string | null } | null;
      name?: string | null;
    },
    ListPermissionGroupsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionGroupsRequest,
  output: ListPermissionGroupsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

// =============================================================================
// ResourceGroup
// =============================================================================

export interface GetResourceGroupRequest {
  resourceGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetResourceGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupId: Schema.String.pipe(T.HttpPath("resourceGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/iam/resource_groups/{resourceGroupId}",
    }),
  ) as unknown as Schema.Schema<GetResourceGroupRequest>;

export interface GetResourceGroupResponse {
  /** Identifier of the resource group. */
  id: string;
  /** The scope associated to the resource group */
  scope: unknown;
  /** Attributes associated to the resource group. */
  meta?: { key?: string | null; value?: string | null } | null;
  /** Name of the resource group. */
  name?: string | null;
}

export const GetResourceGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    scope: Schema.Unknown,
    meta: Schema.optional(
      Schema.Union([
        Schema.Struct({
          key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetResourceGroupResponse>;

export type GetResourceGroupError = DefaultErrors;

export const getResourceGroup: API.OperationMethod<
  GetResourceGroupRequest,
  GetResourceGroupResponse,
  GetResourceGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceGroupRequest,
  output: GetResourceGroupResponse,
  errors: [],
}));

export interface ListResourceGroupsRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: ID of the resource group to be fetched. */
  id?: string;
  /** Query param: Name of the resource group to be fetched. */
  name?: string;
}

export const ListResourceGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/iam/resource_groups",
    }),
  ) as unknown as Schema.Schema<ListResourceGroupsRequest>;

export interface ListResourceGroupsResponse {
  result: {
    id: string;
    scope: unknown;
    meta?: { key?: string | null; value?: string | null } | null;
    name?: string | null;
  }[];
}

export const ListResourceGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        scope: Schema.Unknown,
        meta: Schema.optional(
          Schema.Union([
            Schema.Struct({
              key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              value: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
  }) as unknown as Schema.Schema<ListResourceGroupsResponse>;

export type ListResourceGroupsError = DefaultErrors;

export const listResourceGroups: API.PaginatedOperationMethod<
  ListResourceGroupsRequest,
  ListResourceGroupsResponse,
  ListResourceGroupsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourceGroupsRequest,
  ) => stream.Stream<
    ListResourceGroupsResponse,
    ListResourceGroupsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceGroupsRequest,
  ) => stream.Stream<
    {
      id: string;
      scope: { key: string; objects: { key: string }[] }[];
      meta?: { key?: string | null; value?: string | null } | null;
      name?: string | null;
    },
    ListResourceGroupsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceGroupsRequest,
  output: ListResourceGroupsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateResourceGroupRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Name of the resource group */
  name: string;
  /** Body param: A scope is a combination of scope objects which provides additional context. */
  scope: { key: string; objects: { key: string }[] };
}

export const CreateResourceGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    scope: Schema.Struct({
      key: Schema.String,
      objects: Schema.Array(
        Schema.Struct({
          key: Schema.String,
        }),
      ),
    }),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/iam/resource_groups",
    }),
  ) as unknown as Schema.Schema<CreateResourceGroupRequest>;

export interface CreateResourceGroupResponse {
  /** Identifier of the resource group. */
  id: string;
  /** The scope associated to the resource group */
  scope: unknown;
  /** Attributes associated to the resource group. */
  meta?: { key?: string | null; value?: string | null } | null;
  /** Name of the resource group. */
  name?: string | null;
}

export const CreateResourceGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    scope: Schema.Unknown,
    meta: Schema.optional(
      Schema.Union([
        Schema.Struct({
          key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateResourceGroupResponse>;

export type CreateResourceGroupError = DefaultErrors;

export const createResourceGroup: API.OperationMethod<
  CreateResourceGroupRequest,
  CreateResourceGroupResponse,
  CreateResourceGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResourceGroupRequest,
  output: CreateResourceGroupResponse,
  errors: [],
}));

export interface UpdateResourceGroupRequest {
  resourceGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Name of the resource group */
  name?: string;
  /** Body param: A scope is a combination of scope objects which provides additional context. */
  scope?: { key: string; objects: { key: string }[] };
}

export const UpdateResourceGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupId: Schema.String.pipe(T.HttpPath("resourceGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.optional(Schema.String),
    scope: Schema.optional(
      Schema.Struct({
        key: Schema.String,
        objects: Schema.Array(
          Schema.Struct({
            key: Schema.String,
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/iam/resource_groups/{resourceGroupId}",
    }),
  ) as unknown as Schema.Schema<UpdateResourceGroupRequest>;

export interface UpdateResourceGroupResponse {
  /** Identifier of the resource group. */
  id: string;
  /** The scope associated to the resource group */
  scope: unknown;
  /** Attributes associated to the resource group. */
  meta?: { key?: string | null; value?: string | null } | null;
  /** Name of the resource group. */
  name?: string | null;
}

export const UpdateResourceGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    scope: Schema.Unknown,
    meta: Schema.optional(
      Schema.Union([
        Schema.Struct({
          key: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateResourceGroupResponse>;

export type UpdateResourceGroupError = DefaultErrors;

export const updateResourceGroup: API.OperationMethod<
  UpdateResourceGroupRequest,
  UpdateResourceGroupResponse,
  UpdateResourceGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceGroupRequest,
  output: UpdateResourceGroupResponse,
  errors: [],
}));

export interface DeleteResourceGroupRequest {
  resourceGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteResourceGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupId: Schema.String.pipe(T.HttpPath("resourceGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/iam/resource_groups/{resourceGroupId}",
    }),
  ) as unknown as Schema.Schema<DeleteResourceGroupRequest>;

export interface DeleteResourceGroupResponse {
  /** Identifier */
  id: string;
}

export const DeleteResourceGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteResourceGroupResponse>;

export type DeleteResourceGroupError = DefaultErrors;

export const deleteResourceGroup: API.OperationMethod<
  DeleteResourceGroupRequest,
  DeleteResourceGroupResponse,
  DeleteResourceGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceGroupRequest,
  output: DeleteResourceGroupResponse,
  errors: [],
}));

// =============================================================================
// Sso
// =============================================================================

export interface GetSsoRequest {
  ssoConnectorId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetSsoRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ssoConnectorId: Schema.String.pipe(T.HttpPath("ssoConnectorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/sso_connectors/{ssoConnectorId}",
  }),
) as unknown as Schema.Schema<GetSsoRequest>;

export interface GetSsoResponse {
  /** SSO Connector identifier tag. */
  id?: string | null;
  /** Timestamp for the creation of the SSO connector */
  createdOn?: string | null;
  emailDomain?: string | null;
  enabled?: boolean | null;
  /** Timestamp for the last update of the SSO connector */
  updatedOn?: string | null;
  /** Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean | null;
  verification?: {
    code?: string | null;
    status?: "awaiting" | "pending" | "failed" | "verified" | null;
  } | null;
}

export const GetSsoResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  emailDomain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  updatedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  useFedrampLanguage: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  verification: Schema.optional(
    Schema.Union([
      Schema.Struct({
        code: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals(["awaiting", "pending", "failed", "verified"]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      emailDomain: "email_domain",
      enabled: "enabled",
      updatedOn: "updated_on",
      useFedrampLanguage: "use_fedramp_language",
      verification: "verification",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetSsoResponse>;

export type GetSsoError = DefaultErrors;

export const getSso: API.OperationMethod<
  GetSsoRequest,
  GetSsoResponse,
  GetSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSsoRequest,
  output: GetSsoResponse,
  errors: [],
}));

export interface ListSsosRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const ListSsosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/sso_connectors" }),
) as unknown as Schema.Schema<ListSsosRequest>;

export interface ListSsosResponse {
  result: {
    id?: string | null;
    createdOn?: string | null;
    emailDomain?: string | null;
    enabled?: boolean | null;
    updatedOn?: string | null;
    useFedrampLanguage?: boolean | null;
    verification?: {
      code?: string | null;
      status?: "awaiting" | "pending" | "failed" | "verified" | null;
    } | null;
  }[];
}

export const ListSsosResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      emailDomain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      updatedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      useFedrampLanguage: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      verification: Schema.optional(
        Schema.Union([
          Schema.Struct({
            code: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            status: Schema.optional(
              Schema.Union([
                Schema.Literals(["awaiting", "pending", "failed", "verified"]),
                Schema.Null,
              ]),
            ),
          }),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        emailDomain: "email_domain",
        enabled: "enabled",
        updatedOn: "updated_on",
        useFedrampLanguage: "use_fedramp_language",
        verification: "verification",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListSsosResponse>;

export type ListSsosError = DefaultErrors;

export const listSsos: API.PaginatedOperationMethod<
  ListSsosRequest,
  ListSsosResponse,
  ListSsosError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSsosRequest,
  ) => stream.Stream<
    ListSsosResponse,
    ListSsosError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSsosRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      createdOn?: string | null;
      emailDomain?: string | null;
      enabled?: boolean | null;
      updatedOn?: string | null;
      useFedrampLanguage?: boolean | null;
      verification?: {
        code?: string | null;
        status?: "awaiting" | "pending" | "failed" | "verified" | null;
      } | null;
    },
    ListSsosError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSsosRequest,
  output: ListSsosResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateSsoRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Email domain of the new SSO connector */
  emailDomain: string;
  /** Body param: Begin the verification process after creation */
  beginVerification?: boolean;
  /** Body param: Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean;
}

export const CreateSsoRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  emailDomain: Schema.String,
  beginVerification: Schema.optional(Schema.Boolean),
  useFedrampLanguage: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    emailDomain: "email_domain",
    beginVerification: "begin_verification",
    useFedrampLanguage: "use_fedramp_language",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/sso_connectors" }),
) as unknown as Schema.Schema<CreateSsoRequest>;

export interface CreateSsoResponse {
  /** SSO Connector identifier tag. */
  id?: string | null;
  /** Timestamp for the creation of the SSO connector */
  createdOn?: string | null;
  emailDomain?: string | null;
  enabled?: boolean | null;
  /** Timestamp for the last update of the SSO connector */
  updatedOn?: string | null;
  /** Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean | null;
  verification?: {
    code?: string | null;
    status?: "awaiting" | "pending" | "failed" | "verified" | null;
  } | null;
}

export const CreateSsoResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  emailDomain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  updatedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  useFedrampLanguage: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  verification: Schema.optional(
    Schema.Union([
      Schema.Struct({
        code: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals(["awaiting", "pending", "failed", "verified"]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      emailDomain: "email_domain",
      enabled: "enabled",
      updatedOn: "updated_on",
      useFedrampLanguage: "use_fedramp_language",
      verification: "verification",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateSsoResponse>;

export type CreateSsoError = DefaultErrors;

export const createSso: API.OperationMethod<
  CreateSsoRequest,
  CreateSsoResponse,
  CreateSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSsoRequest,
  output: CreateSsoResponse,
  errors: [],
}));

export interface PatchSsoRequest {
  ssoConnectorId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: SSO Connector enabled state */
  enabled?: boolean;
  /** Body param: Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean;
}

export const PatchSsoRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ssoConnectorId: Schema.String.pipe(T.HttpPath("ssoConnectorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  enabled: Schema.optional(Schema.Boolean),
  useFedrampLanguage: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    enabled: "enabled",
    useFedrampLanguage: "use_fedramp_language",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/sso_connectors/{ssoConnectorId}",
  }),
) as unknown as Schema.Schema<PatchSsoRequest>;

export interface PatchSsoResponse {
  /** SSO Connector identifier tag. */
  id?: string | null;
  /** Timestamp for the creation of the SSO connector */
  createdOn?: string | null;
  emailDomain?: string | null;
  enabled?: boolean | null;
  /** Timestamp for the last update of the SSO connector */
  updatedOn?: string | null;
  /** Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean | null;
  verification?: {
    code?: string | null;
    status?: "awaiting" | "pending" | "failed" | "verified" | null;
  } | null;
}

export const PatchSsoResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  emailDomain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  updatedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  useFedrampLanguage: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  verification: Schema.optional(
    Schema.Union([
      Schema.Struct({
        code: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals(["awaiting", "pending", "failed", "verified"]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      emailDomain: "email_domain",
      enabled: "enabled",
      updatedOn: "updated_on",
      useFedrampLanguage: "use_fedramp_language",
      verification: "verification",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<PatchSsoResponse>;

export type PatchSsoError = DefaultErrors;

export const patchSso: API.OperationMethod<
  PatchSsoRequest,
  PatchSsoResponse,
  PatchSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSsoRequest,
  output: PatchSsoResponse,
  errors: [],
}));

export interface DeleteSsoRequest {
  ssoConnectorId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteSsoRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ssoConnectorId: Schema.String.pipe(T.HttpPath("ssoConnectorId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/sso_connectors/{ssoConnectorId}",
  }),
) as unknown as Schema.Schema<DeleteSsoRequest>;

export interface DeleteSsoResponse {
  /** Identifier */
  id: string;
}

export const DeleteSsoResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeleteSsoResponse>;

export type DeleteSsoError = DefaultErrors;

export const deleteSso: API.OperationMethod<
  DeleteSsoRequest,
  DeleteSsoResponse,
  DeleteSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSsoRequest,
  output: DeleteSsoResponse,
  errors: [],
}));

// =============================================================================
// UserGroup
// =============================================================================

export interface GetUserGroupRequest {
  userGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetUserGroupRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/iam/user_groups/{userGroupId}",
  }),
) as unknown as Schema.Schema<GetUserGroupRequest>;

export interface GetUserGroupResponse {
  /** User Group identifier tag. */
  id: string;
  /** Timestamp for the creation of the user group */
  createdOn: string;
  /** Last time the user group was modified. */
  modifiedOn: string;
  /** Name of the user group. */
  name: string;
  /** Policies attached to the User group */
  policies?:
    | {
        id?: string | null;
        access?: "allow" | "deny" | null;
        permissionGroups?: { id: string }[] | null;
        resourceGroups?: { id: string }[] | null;
      }[]
    | null;
}

export const GetUserGroupResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  policies: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          access: Schema.optional(
            Schema.Union([Schema.Literals(["allow", "deny"]), Schema.Null]),
          ),
          permissionGroups: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                }),
              ),
              Schema.Null,
            ]),
          ),
          resourceGroups: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            access: "access",
            permissionGroups: "permission_groups",
            resourceGroups: "resource_groups",
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
      createdOn: "created_on",
      modifiedOn: "modified_on",
      name: "name",
      policies: "policies",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetUserGroupResponse>;

export type GetUserGroupError = DefaultErrors;

export const getUserGroup: API.OperationMethod<
  GetUserGroupRequest,
  GetUserGroupResponse,
  GetUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUserGroupRequest,
  output: GetUserGroupResponse,
  errors: [],
}));

export interface ListUserGroupsRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: ID of the user group to be fetched. */
  id?: string;
  /** Query param: The sort order of returned user groups by name. Default sort order is ascending. To switch to descending, set this parameter to "desc" */
  direction?: string;
  /** Query param: A string used for searching for user groups containing that substring. */
  fuzzyName?: string;
  /** Query param: Name of the user group to be fetched. */
  name?: string;
}

export const ListUserGroupsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  direction: Schema.optional(Schema.String).pipe(T.HttpQuery("direction")),
  fuzzyName: Schema.optional(Schema.String).pipe(T.HttpQuery("fuzzyName")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/iam/user_groups" }),
) as unknown as Schema.Schema<ListUserGroupsRequest>;

export interface ListUserGroupsResponse {
  result: {
    id: string;
    createdOn: string;
    modifiedOn: string;
    name: string;
    policies?:
      | {
          id?: string | null;
          access?: "allow" | "deny" | null;
          permissionGroups?: { id: string }[] | null;
          resourceGroups?: { id: string }[] | null;
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

export const ListUserGroupsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        createdOn: Schema.String,
        modifiedOn: Schema.String,
        name: Schema.String,
        policies: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
                access: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["allow", "deny"]),
                    Schema.Null,
                  ]),
                ),
                permissionGroups: Schema.optional(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.String,
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
                resourceGroups: Schema.optional(
                  Schema.Union([
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.String,
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  id: "id",
                  access: "access",
                  permissionGroups: "permission_groups",
                  resourceGroups: "resource_groups",
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdOn: "created_on",
          modifiedOn: "modified_on",
          name: "name",
          policies: "policies",
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
) as unknown as Schema.Schema<ListUserGroupsResponse>;

export type ListUserGroupsError = DefaultErrors;

export const listUserGroups: API.PaginatedOperationMethod<
  ListUserGroupsRequest,
  ListUserGroupsResponse,
  ListUserGroupsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListUserGroupsRequest,
  ) => stream.Stream<
    ListUserGroupsResponse,
    ListUserGroupsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListUserGroupsRequest,
  ) => stream.Stream<
    {
      id: string;
      createdOn: string;
      modifiedOn: string;
      name: string;
      policies?:
        | {
            id?: string | null;
            access?: "allow" | "deny" | null;
            permissionGroups?: { id: string }[] | null;
            resourceGroups?: { id: string }[] | null;
          }[]
        | null;
    },
    ListUserGroupsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUserGroupsRequest,
  output: ListUserGroupsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateUserGroupRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Name of the User group. */
  name: string;
  /** Body param: Policies attached to the User group */
  policies: {
    access: "allow" | "deny";
    permissionGroups: { id: string }[];
    resourceGroups: { id: string }[];
  }[];
}

export const CreateUserGroupRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.String,
    policies: Schema.Array(
      Schema.Struct({
        access: Schema.Literals(["allow", "deny"]),
        permissionGroups: Schema.Array(
          Schema.Struct({
            id: Schema.String,
          }),
        ),
        resourceGroups: Schema.Array(
          Schema.Struct({
            id: Schema.String,
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          access: "access",
          permissionGroups: "permission_groups",
          resourceGroups: "resource_groups",
        }),
      ),
    ),
  },
).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/iam/user_groups" }),
) as unknown as Schema.Schema<CreateUserGroupRequest>;

export interface CreateUserGroupResponse {
  /** User Group identifier tag. */
  id: string;
  /** Timestamp for the creation of the user group */
  createdOn: string;
  /** Last time the user group was modified. */
  modifiedOn: string;
  /** Name of the user group. */
  name: string;
  /** Policies attached to the User group */
  policies?:
    | {
        id?: string | null;
        access?: "allow" | "deny" | null;
        permissionGroups?: { id: string }[] | null;
        resourceGroups?: { id: string }[] | null;
      }[]
    | null;
}

export const CreateUserGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    modifiedOn: Schema.String,
    name: Schema.String,
    policies: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            access: Schema.optional(
              Schema.Union([Schema.Literals(["allow", "deny"]), Schema.Null]),
            ),
            permissionGroups: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.String,
                  }),
                ),
                Schema.Null,
              ]),
            ),
            resourceGroups: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.String,
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              access: "access",
              permissionGroups: "permission_groups",
              resourceGroups: "resource_groups",
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
        createdOn: "created_on",
        modifiedOn: "modified_on",
        name: "name",
        policies: "policies",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateUserGroupResponse>;

export type CreateUserGroupError = DefaultErrors;

export const createUserGroup: API.OperationMethod<
  CreateUserGroupRequest,
  CreateUserGroupResponse,
  CreateUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUserGroupRequest,
  output: CreateUserGroupResponse,
  errors: [],
}));

export interface UpdateUserGroupRequest {
  userGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Name of the User group. */
  name?: string;
  /** Body param: Policies attached to the User group */
  policies?: {
    id: string;
    access: "allow" | "deny";
    permissionGroups: { id: string }[];
    resourceGroups: { id: string }[];
  }[];
}

export const UpdateUserGroupRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.optional(Schema.String),
    policies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          access: Schema.Literals(["allow", "deny"]),
          permissionGroups: Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
          resourceGroups: Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            access: "access",
            permissionGroups: "permission_groups",
            resourceGroups: "resource_groups",
          }),
        ),
      ),
    ),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/iam/user_groups/{userGroupId}",
  }),
) as unknown as Schema.Schema<UpdateUserGroupRequest>;

export interface UpdateUserGroupResponse {
  /** User Group identifier tag. */
  id: string;
  /** Timestamp for the creation of the user group */
  createdOn: string;
  /** Last time the user group was modified. */
  modifiedOn: string;
  /** Name of the user group. */
  name: string;
  /** Policies attached to the User group */
  policies?:
    | {
        id?: string | null;
        access?: "allow" | "deny" | null;
        permissionGroups?: { id: string }[] | null;
        resourceGroups?: { id: string }[] | null;
      }[]
    | null;
}

export const UpdateUserGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    modifiedOn: Schema.String,
    name: Schema.String,
    policies: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            access: Schema.optional(
              Schema.Union([Schema.Literals(["allow", "deny"]), Schema.Null]),
            ),
            permissionGroups: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.String,
                  }),
                ),
                Schema.Null,
              ]),
            ),
            resourceGroups: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.String,
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              access: "access",
              permissionGroups: "permission_groups",
              resourceGroups: "resource_groups",
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
        createdOn: "created_on",
        modifiedOn: "modified_on",
        name: "name",
        policies: "policies",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateUserGroupResponse>;

export type UpdateUserGroupError = DefaultErrors;

export const updateUserGroup: API.OperationMethod<
  UpdateUserGroupRequest,
  UpdateUserGroupResponse,
  UpdateUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUserGroupRequest,
  output: UpdateUserGroupResponse,
  errors: [],
}));

export interface DeleteUserGroupRequest {
  userGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteUserGroupRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/iam/user_groups/{userGroupId}",
  }),
) as unknown as Schema.Schema<DeleteUserGroupRequest>;

export interface DeleteUserGroupResponse {
  /** Identifier */
  id: string;
}

export const DeleteUserGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteUserGroupResponse>;

export type DeleteUserGroupError = DefaultErrors;

export const deleteUserGroup: API.OperationMethod<
  DeleteUserGroupRequest,
  DeleteUserGroupResponse,
  DeleteUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUserGroupRequest,
  output: DeleteUserGroupResponse,
  errors: [],
}));

// =============================================================================
// UserGroupMember
// =============================================================================

export interface ListUserGroupMembersRequest {
  userGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
}

export const ListUserGroupMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/iam/user_groups/{userGroupId}/members",
    }),
  ) as unknown as Schema.Schema<ListUserGroupMembersRequest>;

export interface ListUserGroupMembersResponse {
  result: {
    id: string;
    email?: string | null;
    status?: "accepted" | "pending" | null;
  }[];
  resultInfo?: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  } | null;
}

export const ListUserGroupMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(
          Schema.Union([Schema.Literals(["accepted", "pending"]), Schema.Null]),
        ),
      }),
    ),
    resultInfo: Schema.optional(
      Schema.Union([
        Schema.Struct({
          count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          totalCount: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            count: "count",
            page: "page",
            perPage: "per_page",
            totalCount: "total_count",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
  ) as unknown as Schema.Schema<ListUserGroupMembersResponse>;

export type ListUserGroupMembersError = DefaultErrors;

export const listUserGroupMembers: API.PaginatedOperationMethod<
  ListUserGroupMembersRequest,
  ListUserGroupMembersResponse,
  ListUserGroupMembersError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListUserGroupMembersRequest,
  ) => stream.Stream<
    ListUserGroupMembersResponse,
    ListUserGroupMembersError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListUserGroupMembersRequest,
  ) => stream.Stream<
    {
      id: string;
      email?: string | null;
      status?: "accepted" | "pending" | null;
    },
    ListUserGroupMembersError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUserGroupMembersRequest,
  output: ListUserGroupMembersResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateUserGroupMemberRequest {
  userGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: */
  body: { id: string }[];
}

export const CreateUserGroupMemberRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(
      Schema.Struct({
        id: Schema.String,
      }),
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/iam/user_groups/{userGroupId}/members",
    }),
  ) as unknown as Schema.Schema<CreateUserGroupMemberRequest>;

export interface CreateUserGroupMemberResponse {
  /** Account member identifier. */
  id: string;
  /** The contact email address of the user. */
  email?: string | null;
  /** The member's status in the account. */
  status?: "accepted" | "pending" | null;
}

export const CreateUserGroupMemberResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([Schema.Literals(["accepted", "pending"]), Schema.Null]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateUserGroupMemberResponse>;

export type CreateUserGroupMemberError = DefaultErrors | InvalidMember;

export const createUserGroupMember: API.OperationMethod<
  CreateUserGroupMemberRequest,
  CreateUserGroupMemberResponse,
  CreateUserGroupMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUserGroupMemberRequest,
  output: CreateUserGroupMemberResponse,
  errors: [InvalidMember],
}));

export interface UpdateUserGroupMemberRequest {
  userGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Set/Replace members to a user group. */
  body: { id: string }[];
}

export const UpdateUserGroupMemberRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.Array(
      Schema.Struct({
        id: Schema.String,
      }),
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/iam/user_groups/{userGroupId}/members",
    }),
  ) as unknown as Schema.Schema<UpdateUserGroupMemberRequest>;

export interface UpdateUserGroupMemberResponse {
  result: {
    id: string;
    email?: string | null;
    status?: "accepted" | "pending" | null;
  }[];
}

export const UpdateUserGroupMemberResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        status: Schema.optional(
          Schema.Union([Schema.Literals(["accepted", "pending"]), Schema.Null]),
        ),
      }),
    ),
  }) as unknown as Schema.Schema<UpdateUserGroupMemberResponse>;

export type UpdateUserGroupMemberError = DefaultErrors;

export const updateUserGroupMember: API.PaginatedOperationMethod<
  UpdateUserGroupMemberRequest,
  UpdateUserGroupMemberResponse,
  UpdateUserGroupMemberError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: UpdateUserGroupMemberRequest,
  ) => stream.Stream<
    UpdateUserGroupMemberResponse,
    UpdateUserGroupMemberError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: UpdateUserGroupMemberRequest,
  ) => stream.Stream<
    {
      id: string;
      email?: string | null;
      status?: "accepted" | "pending" | null;
    },
    UpdateUserGroupMemberError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: UpdateUserGroupMemberRequest,
  output: UpdateUserGroupMemberResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface DeleteUserGroupMemberRequest {
  userGroupId: string;
  memberId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteUserGroupMemberRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
    memberId: Schema.String.pipe(T.HttpPath("memberId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/iam/user_groups/{userGroupId}/members/{memberId}",
    }),
  ) as unknown as Schema.Schema<DeleteUserGroupMemberRequest>;

export interface DeleteUserGroupMemberResponse {
  /** Account member identifier. */
  id: string;
  /** The contact email address of the user. */
  email?: string | null;
  /** The member's status in the account. */
  status?: "accepted" | "pending" | null;
}

export const DeleteUserGroupMemberResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([Schema.Literals(["accepted", "pending"]), Schema.Null]),
    ),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteUserGroupMemberResponse>;

export type DeleteUserGroupMemberError = DefaultErrors | InvalidMember;

export const deleteUserGroupMember: API.OperationMethod<
  DeleteUserGroupMemberRequest,
  DeleteUserGroupMemberResponse,
  DeleteUserGroupMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUserGroupMemberRequest,
  output: DeleteUserGroupMemberResponse,
  errors: [InvalidMember],
}));

// =============================================================================
// VerificationSso
// =============================================================================

export interface BeginVerificationSsoRequest {
  ssoConnectorId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const BeginVerificationSsoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ssoConnectorId: Schema.String.pipe(T.HttpPath("ssoConnectorId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/sso_connectors/{ssoConnectorId}/begin_verification",
    }),
  ) as unknown as Schema.Schema<BeginVerificationSsoRequest>;

export interface BeginVerificationSsoResponse {
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

export const BeginVerificationSsoResponse =
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
  }) as unknown as Schema.Schema<BeginVerificationSsoResponse>;

export type BeginVerificationSsoError = DefaultErrors;

export const beginVerificationSso: API.OperationMethod<
  BeginVerificationSsoRequest,
  BeginVerificationSsoResponse,
  BeginVerificationSsoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BeginVerificationSsoRequest,
  output: BeginVerificationSsoResponse,
  errors: [],
}));
