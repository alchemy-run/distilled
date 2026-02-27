/**
 * Cloudflare IAM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service iam
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
// PermissionGroup
// =============================================================================

export interface GetPermissionGroupRequest {
  permissionGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetPermissionGroupRequest = Schema.Struct({
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
  meta?: { key?: string; value?: string };
  /** Name of the permission group. */
  name?: string;
}

export const GetPermissionGroupResponse = Schema.Struct({
  id: Schema.String,
  meta: Schema.optional(
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  name: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetPermissionGroupResponse>;

export const getPermissionGroup: API.OperationMethod<
  GetPermissionGroupRequest,
  GetPermissionGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListPermissionGroupsRequest = Schema.Struct({
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

export type ListPermissionGroupsResponse = {
  id: string;
  meta?: { key?: string; value?: string };
  name?: string;
}[];

export const ListPermissionGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    meta: Schema.optional(
      Schema.Struct({
        key: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
    name: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListPermissionGroupsResponse>;

export const listPermissionGroups: API.OperationMethod<
  ListPermissionGroupsRequest,
  ListPermissionGroupsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPermissionGroupsRequest,
  output: ListPermissionGroupsResponse,
  errors: [],
}));

// =============================================================================
// ResourceGroup
// =============================================================================

export interface GetResourceGroupRequest {
  resourceGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetResourceGroupRequest = Schema.Struct({
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
  scope: { key: string; objects: { key: string }[] }[];
  /** Attributes associated to the resource group. */
  meta?: { key?: string; value?: string };
  /** Name of the resource group. */
  name?: string;
}

export const GetResourceGroupResponse = Schema.Struct({
  id: Schema.String,
  scope: Schema.Array(
    Schema.Struct({
      key: Schema.String,
      objects: Schema.Array(
        Schema.Struct({
          key: Schema.String,
        }),
      ),
    }),
  ),
  meta: Schema.optional(
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  name: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetResourceGroupResponse>;

export const getResourceGroup: API.OperationMethod<
  GetResourceGroupRequest,
  GetResourceGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListResourceGroupsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/iam/resource_groups" }),
) as unknown as Schema.Schema<ListResourceGroupsRequest>;

export type ListResourceGroupsResponse = {
  id: string;
  scope: { key: string; objects: { key: string }[] }[];
  meta?: { key?: string; value?: string };
  name?: string;
}[];

export const ListResourceGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    scope: Schema.Array(
      Schema.Struct({
        key: Schema.String,
        objects: Schema.Array(
          Schema.Struct({
            key: Schema.String,
          }),
        ),
      }),
    ),
    meta: Schema.optional(
      Schema.Struct({
        key: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
    name: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListResourceGroupsResponse>;

export const listResourceGroups: API.OperationMethod<
  ListResourceGroupsRequest,
  ListResourceGroupsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListResourceGroupsRequest,
  output: ListResourceGroupsResponse,
  errors: [],
}));

export interface CreateResourceGroupRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Name of the resource group */
  name: string;
  /** Body param: A scope is a combination of scope objects which provides additional context. */
  scope: { key: string; objects: { key: string }[] };
}

export const CreateResourceGroupRequest = Schema.Struct({
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
  scope: { key: string; objects: { key: string }[] }[];
  /** Attributes associated to the resource group. */
  meta?: { key?: string; value?: string };
  /** Name of the resource group. */
  name?: string;
}

export const CreateResourceGroupResponse = Schema.Struct({
  id: Schema.String,
  scope: Schema.Array(
    Schema.Struct({
      key: Schema.String,
      objects: Schema.Array(
        Schema.Struct({
          key: Schema.String,
        }),
      ),
    }),
  ),
  meta: Schema.optional(
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  name: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateResourceGroupResponse>;

export const createResourceGroup: API.OperationMethod<
  CreateResourceGroupRequest,
  CreateResourceGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateResourceGroupRequest = Schema.Struct({
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
  scope: { key: string; objects: { key: string }[] }[];
  /** Attributes associated to the resource group. */
  meta?: { key?: string; value?: string };
  /** Name of the resource group. */
  name?: string;
}

export const UpdateResourceGroupResponse = Schema.Struct({
  id: Schema.String,
  scope: Schema.Array(
    Schema.Struct({
      key: Schema.String,
      objects: Schema.Array(
        Schema.Struct({
          key: Schema.String,
        }),
      ),
    }),
  ),
  meta: Schema.optional(
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  name: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<UpdateResourceGroupResponse>;

export const updateResourceGroup: API.OperationMethod<
  UpdateResourceGroupRequest,
  UpdateResourceGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateResourceGroupRequest,
  output: UpdateResourceGroupResponse,
  errors: [],
}));

export interface DeleteResourceGroupRequest {
  resourceGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteResourceGroupRequest = Schema.Struct({
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

export const DeleteResourceGroupResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteResourceGroupResponse>;

export const deleteResourceGroup: API.OperationMethod<
  DeleteResourceGroupRequest,
  DeleteResourceGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetSsoRequest = Schema.Struct({
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
  id?: string;
  /** Timestamp for the creation of the SSO connector */
  createdOn?: string;
  emailDomain?: string;
  enabled?: boolean;
  /** Timestamp for the last update of the SSO connector */
  updatedOn?: string;
  /** Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean;
  verification?: {
    code?: string;
    status?: "awaiting" | "pending" | "failed" | "verified";
  };
}

export const GetSsoResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  emailDomain: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  updatedOn: Schema.optional(Schema.String),
  useFedrampLanguage: Schema.optional(Schema.Boolean),
  verification: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["awaiting", "pending", "failed", "verified"]),
      ),
    }),
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
) as unknown as Schema.Schema<GetSsoResponse>;

export const getSso: API.OperationMethod<
  GetSsoRequest,
  GetSsoResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSsoRequest,
  output: GetSsoResponse,
  errors: [],
}));

export interface ListSsosRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const ListSsosRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/sso_connectors" }),
) as unknown as Schema.Schema<ListSsosRequest>;

export type ListSsosResponse = {
  id?: string;
  createdOn?: string;
  emailDomain?: string;
  enabled?: boolean;
  updatedOn?: string;
  useFedrampLanguage?: boolean;
  verification?: {
    code?: string;
    status?: "awaiting" | "pending" | "failed" | "verified";
  };
}[];

export const ListSsosResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    emailDomain: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    updatedOn: Schema.optional(Schema.String),
    useFedrampLanguage: Schema.optional(Schema.Boolean),
    verification: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals(["awaiting", "pending", "failed", "verified"]),
        ),
      }),
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
) as unknown as Schema.Schema<ListSsosResponse>;

export const listSsos: API.OperationMethod<
  ListSsosRequest,
  ListSsosResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSsosRequest,
  output: ListSsosResponse,
  errors: [],
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

export const CreateSsoRequest = Schema.Struct({
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
  id?: string;
  /** Timestamp for the creation of the SSO connector */
  createdOn?: string;
  emailDomain?: string;
  enabled?: boolean;
  /** Timestamp for the last update of the SSO connector */
  updatedOn?: string;
  /** Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean;
  verification?: {
    code?: string;
    status?: "awaiting" | "pending" | "failed" | "verified";
  };
}

export const CreateSsoResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  emailDomain: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  updatedOn: Schema.optional(Schema.String),
  useFedrampLanguage: Schema.optional(Schema.Boolean),
  verification: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["awaiting", "pending", "failed", "verified"]),
      ),
    }),
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
) as unknown as Schema.Schema<CreateSsoResponse>;

export const createSso: API.OperationMethod<
  CreateSsoRequest,
  CreateSsoResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PatchSsoRequest = Schema.Struct({
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
  id?: string;
  /** Timestamp for the creation of the SSO connector */
  createdOn?: string;
  emailDomain?: string;
  enabled?: boolean;
  /** Timestamp for the last update of the SSO connector */
  updatedOn?: string;
  /** Controls the display of FedRAMP language to the user during SSO login */
  useFedrampLanguage?: boolean;
  verification?: {
    code?: string;
    status?: "awaiting" | "pending" | "failed" | "verified";
  };
}

export const PatchSsoResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  emailDomain: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  updatedOn: Schema.optional(Schema.String),
  useFedrampLanguage: Schema.optional(Schema.Boolean),
  verification: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["awaiting", "pending", "failed", "verified"]),
      ),
    }),
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
) as unknown as Schema.Schema<PatchSsoResponse>;

export const patchSso: API.OperationMethod<
  PatchSsoRequest,
  PatchSsoResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSsoRequest,
  output: PatchSsoResponse,
  errors: [],
}));

export interface DeleteSsoRequest {
  ssoConnectorId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteSsoRequest = Schema.Struct({
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

export const DeleteSsoResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteSsoResponse>;

export const deleteSso: API.OperationMethod<
  DeleteSsoRequest,
  DeleteSsoResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetUserGroupRequest = Schema.Struct({
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
  policies?: {
    id?: string;
    access?: "allow" | "deny";
    permissionGroups?: { id: string }[];
    resourceGroups?: { id: string }[];
  }[];
}

export const GetUserGroupResponse = Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  policies: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        access: Schema.optional(Schema.Literals(["allow", "deny"])),
        permissionGroups: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
        ),
        resourceGroups: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
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
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    name: "name",
    policies: "policies",
  }),
) as unknown as Schema.Schema<GetUserGroupResponse>;

export const getUserGroup: API.OperationMethod<
  GetUserGroupRequest,
  GetUserGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListUserGroupsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  direction: Schema.optional(Schema.String).pipe(T.HttpQuery("direction")),
  fuzzyName: Schema.optional(Schema.String).pipe(T.HttpQuery("fuzzyName")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/iam/user_groups" }),
) as unknown as Schema.Schema<ListUserGroupsRequest>;

export type ListUserGroupsResponse = {
  id: string;
  createdOn: string;
  modifiedOn: string;
  name: string;
  policies?: {
    id?: string;
    access?: "allow" | "deny";
    permissionGroups?: { id: string }[];
    resourceGroups?: { id: string }[];
  }[];
}[];

export const ListUserGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    modifiedOn: Schema.String,
    name: Schema.String,
    policies: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          access: Schema.optional(Schema.Literals(["allow", "deny"])),
          permissionGroups: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.String,
              }),
            ),
          ),
          resourceGroups: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.String,
              }),
            ),
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
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      modifiedOn: "modified_on",
      name: "name",
      policies: "policies",
    }),
  ),
) as unknown as Schema.Schema<ListUserGroupsResponse>;

export const listUserGroups: API.OperationMethod<
  ListUserGroupsRequest,
  ListUserGroupsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUserGroupsRequest,
  output: ListUserGroupsResponse,
  errors: [],
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

export const CreateUserGroupRequest = Schema.Struct({
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
}).pipe(
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
  policies?: {
    id?: string;
    access?: "allow" | "deny";
    permissionGroups?: { id: string }[];
    resourceGroups?: { id: string }[];
  }[];
}

export const CreateUserGroupResponse = Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  policies: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        access: Schema.optional(Schema.Literals(["allow", "deny"])),
        permissionGroups: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
        ),
        resourceGroups: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
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
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    name: "name",
    policies: "policies",
  }),
) as unknown as Schema.Schema<CreateUserGroupResponse>;

export const createUserGroup: API.OperationMethod<
  CreateUserGroupRequest,
  CreateUserGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateUserGroupRequest = Schema.Struct({
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
}).pipe(
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
  policies?: {
    id?: string;
    access?: "allow" | "deny";
    permissionGroups?: { id: string }[];
    resourceGroups?: { id: string }[];
  }[];
}

export const UpdateUserGroupResponse = Schema.Struct({
  id: Schema.String,
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  name: Schema.String,
  policies: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        access: Schema.optional(Schema.Literals(["allow", "deny"])),
        permissionGroups: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
        ),
        resourceGroups: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
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
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    name: "name",
    policies: "policies",
  }),
) as unknown as Schema.Schema<UpdateUserGroupResponse>;

export const updateUserGroup: API.OperationMethod<
  UpdateUserGroupRequest,
  UpdateUserGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateUserGroupRequest,
  output: UpdateUserGroupResponse,
  errors: [],
}));

export interface DeleteUserGroupRequest {
  userGroupId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteUserGroupRequest = Schema.Struct({
  userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/iam/user_groups/{userGroupId}",
  }),
) as unknown as Schema.Schema<DeleteUserGroupRequest>;

export interface DeleteUserGroupResponse {
  /** Identifier */
  id: string;
}

export const DeleteUserGroupResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteUserGroupResponse>;

export const deleteUserGroup: API.OperationMethod<
  DeleteUserGroupRequest,
  DeleteUserGroupResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListUserGroupMembersRequest = Schema.Struct({
  userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/iam/user_groups/{userGroupId}/members",
  }),
) as unknown as Schema.Schema<ListUserGroupMembersRequest>;

export type ListUserGroupMembersResponse = {
  id: string;
  email?: string;
  status?: "accepted" | "pending";
}[];

export const ListUserGroupMembersResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    email: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["accepted", "pending"])),
  }),
) as unknown as Schema.Schema<ListUserGroupMembersResponse>;

export const listUserGroupMembers: API.OperationMethod<
  ListUserGroupMembersRequest,
  ListUserGroupMembersResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUserGroupMembersRequest,
  output: ListUserGroupMembersResponse,
  errors: [],
}));

export interface CreateUserGroupMemberRequest {
  userGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: */
  body: { id: string }[];
}

export const CreateUserGroupMemberRequest = Schema.Struct({
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
  email?: string;
  /** The member's status in the account. */
  status?: "accepted" | "pending";
}

export const CreateUserGroupMemberResponse = Schema.Struct({
  id: Schema.String,
  email: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literals(["accepted", "pending"])),
}) as unknown as Schema.Schema<CreateUserGroupMemberResponse>;

export const createUserGroupMember: API.OperationMethod<
  CreateUserGroupMemberRequest,
  CreateUserGroupMemberResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateUserGroupMemberRequest,
  output: CreateUserGroupMemberResponse,
  errors: [],
}));

export interface UpdateUserGroupMemberRequest {
  userGroupId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Set/Replace members to a user group. */
  body: { id: string }[];
}

export const UpdateUserGroupMemberRequest = Schema.Struct({
  userGroupId: Schema.String.pipe(T.HttpPath("userGroupId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      id: Schema.String,
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/iam/user_groups/{userGroupId}/members",
  }),
) as unknown as Schema.Schema<UpdateUserGroupMemberRequest>;

export type UpdateUserGroupMemberResponse = {
  id: string;
  email?: string;
  status?: "accepted" | "pending";
}[];

export const UpdateUserGroupMemberResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    email: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["accepted", "pending"])),
  }),
) as unknown as Schema.Schema<UpdateUserGroupMemberResponse>;

export const updateUserGroupMember: API.OperationMethod<
  UpdateUserGroupMemberRequest,
  UpdateUserGroupMemberResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateUserGroupMemberRequest,
  output: UpdateUserGroupMemberResponse,
  errors: [],
}));

export interface DeleteUserGroupMemberRequest {
  userGroupId: string;
  memberId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteUserGroupMemberRequest = Schema.Struct({
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
  email?: string;
  /** The member's status in the account. */
  status?: "accepted" | "pending";
}

export const DeleteUserGroupMemberResponse = Schema.Struct({
  id: Schema.String,
  email: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literals(["accepted", "pending"])),
}) as unknown as Schema.Schema<DeleteUserGroupMemberResponse>;

export const deleteUserGroupMember: API.OperationMethod<
  DeleteUserGroupMemberRequest,
  DeleteUserGroupMemberResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteUserGroupMemberRequest,
  output: DeleteUserGroupMemberResponse,
  errors: [],
}));

// =============================================================================
// VerificationSso
// =============================================================================

export interface BeginVerificationSsoRequest {
  ssoConnectorId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const BeginVerificationSsoRequest = Schema.Struct({
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
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const BeginVerificationSsoResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
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
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
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

export const beginVerificationSso: API.OperationMethod<
  BeginVerificationSsoRequest,
  BeginVerificationSsoResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BeginVerificationSsoRequest,
  output: BeginVerificationSsoResponse,
  errors: [],
}));
