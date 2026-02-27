/**
 * Cloudflare WEB3 API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service web3
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
// Hostname
// =============================================================================

export interface GetHostnameRequest {
  identifier: string;
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const GetHostnameRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/web3/hostnames/{identifier}",
  }),
) as unknown as Schema.Schema<GetHostnameRequest>;

export interface GetHostnameResponse {
  /** Specify the identifier of the hostname. */
  id?: string;
  createdOn?: string;
  /** Specify an optional description of the hostname. */
  description?: string;
  /** Specify the DNSLink value used if the target is ipfs. */
  dnslink?: string;
  modifiedOn?: string;
  /** Specify the hostname that points to the target gateway via CNAME. */
  name?: string;
  /** Specifies the status of the hostname's activation. */
  status?: "active" | "pending" | "deleting" | "error";
  /** Specify the target gateway of the hostname. */
  target?: "ethereum" | "ipfs" | "ipfs_universal_path";
}

export const GetHostnameResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dnslink: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Literals(["active", "pending", "deleting", "error"]),
  ),
  target: Schema.optional(
    Schema.Literals(["ethereum", "ipfs", "ipfs_universal_path"]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    description: "description",
    dnslink: "dnslink",
    modifiedOn: "modified_on",
    name: "name",
    status: "status",
    target: "target",
  }),
) as unknown as Schema.Schema<GetHostnameResponse>;

export type GetHostnameError = CommonErrors;

export const getHostname: API.OperationMethod<
  GetHostnameRequest,
  GetHostnameResponse,
  GetHostnameError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHostnameRequest,
  output: GetHostnameResponse,
  errors: [],
}));

export interface ListHostnamesRequest {
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const ListHostnamesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/web3/hostnames" }),
) as unknown as Schema.Schema<ListHostnamesRequest>;

export type ListHostnamesResponse = {
  id?: string;
  createdOn?: string;
  description?: string;
  dnslink?: string;
  modifiedOn?: string;
  name?: string;
  status?: "active" | "pending" | "deleting" | "error";
  target?: "ethereum" | "ipfs" | "ipfs_universal_path";
}[];

export const ListHostnamesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    dnslink: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["active", "pending", "deleting", "error"]),
    ),
    target: Schema.optional(
      Schema.Literals(["ethereum", "ipfs", "ipfs_universal_path"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      description: "description",
      dnslink: "dnslink",
      modifiedOn: "modified_on",
      name: "name",
      status: "status",
      target: "target",
    }),
  ),
) as unknown as Schema.Schema<ListHostnamesResponse>;

export type ListHostnamesError = CommonErrors;

export const listHostnames: API.OperationMethod<
  ListHostnamesRequest,
  ListHostnamesResponse,
  ListHostnamesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListHostnamesRequest,
  output: ListHostnamesResponse,
  errors: [],
}));

export interface CreateHostnameRequest {
  /** Path param: Specify the identifier of the hostname. */
  zoneId: string;
  /** Body param: Specify the hostname that points to the target gateway via CNAME. */
  name: string;
  /** Body param: Specify the target gateway of the hostname. */
  target: "ethereum" | "ipfs" | "ipfs_universal_path";
  /** Body param: Specify an optional description of the hostname. */
  description?: string;
  /** Body param: Specify the DNSLink value used if the target is ipfs. */
  dnslink?: string;
}

export const CreateHostnameRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.String,
  target: Schema.Literals(["ethereum", "ipfs", "ipfs_universal_path"]),
  description: Schema.optional(Schema.String),
  dnslink: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/web3/hostnames" }),
) as unknown as Schema.Schema<CreateHostnameRequest>;

export interface CreateHostnameResponse {
  /** Specify the identifier of the hostname. */
  id?: string;
  createdOn?: string;
  /** Specify an optional description of the hostname. */
  description?: string;
  /** Specify the DNSLink value used if the target is ipfs. */
  dnslink?: string;
  modifiedOn?: string;
  /** Specify the hostname that points to the target gateway via CNAME. */
  name?: string;
  /** Specifies the status of the hostname's activation. */
  status?: "active" | "pending" | "deleting" | "error";
  /** Specify the target gateway of the hostname. */
  target?: "ethereum" | "ipfs" | "ipfs_universal_path";
}

export const CreateHostnameResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dnslink: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Literals(["active", "pending", "deleting", "error"]),
  ),
  target: Schema.optional(
    Schema.Literals(["ethereum", "ipfs", "ipfs_universal_path"]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    description: "description",
    dnslink: "dnslink",
    modifiedOn: "modified_on",
    name: "name",
    status: "status",
    target: "target",
  }),
) as unknown as Schema.Schema<CreateHostnameResponse>;

export type CreateHostnameError = CommonErrors;

export const createHostname: API.OperationMethod<
  CreateHostnameRequest,
  CreateHostnameResponse,
  CreateHostnameError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateHostnameRequest,
  output: CreateHostnameResponse,
  errors: [],
}));

export interface PatchHostnameRequest {
  identifier: string;
  /** Path param: Specify the identifier of the hostname. */
  zoneId: string;
  /** Body param: Specify an optional description of the hostname. */
  description?: string;
  /** Body param: Specify the DNSLink value used if the target is ipfs. */
  dnslink?: string;
}

export const PatchHostnameRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String),
  dnslink: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/web3/hostnames/{identifier}",
  }),
) as unknown as Schema.Schema<PatchHostnameRequest>;

export interface PatchHostnameResponse {
  /** Specify the identifier of the hostname. */
  id?: string;
  createdOn?: string;
  /** Specify an optional description of the hostname. */
  description?: string;
  /** Specify the DNSLink value used if the target is ipfs. */
  dnslink?: string;
  modifiedOn?: string;
  /** Specify the hostname that points to the target gateway via CNAME. */
  name?: string;
  /** Specifies the status of the hostname's activation. */
  status?: "active" | "pending" | "deleting" | "error";
  /** Specify the target gateway of the hostname. */
  target?: "ethereum" | "ipfs" | "ipfs_universal_path";
}

export const PatchHostnameResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dnslink: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Literals(["active", "pending", "deleting", "error"]),
  ),
  target: Schema.optional(
    Schema.Literals(["ethereum", "ipfs", "ipfs_universal_path"]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdOn: "created_on",
    description: "description",
    dnslink: "dnslink",
    modifiedOn: "modified_on",
    name: "name",
    status: "status",
    target: "target",
  }),
) as unknown as Schema.Schema<PatchHostnameResponse>;

export type PatchHostnameError = CommonErrors;

export const patchHostname: API.OperationMethod<
  PatchHostnameRequest,
  PatchHostnameResponse,
  PatchHostnameError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchHostnameRequest,
  output: PatchHostnameResponse,
  errors: [],
}));

export interface DeleteHostnameRequest {
  identifier: string;
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const DeleteHostnameRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/web3/hostnames/{identifier}",
  }),
) as unknown as Schema.Schema<DeleteHostnameRequest>;

export interface DeleteHostnameResponse {
  /** Specify the identifier of the hostname. */
  id: string;
}

export const DeleteHostnameResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteHostnameResponse>;

export type DeleteHostnameError = CommonErrors;

export const deleteHostname: API.OperationMethod<
  DeleteHostnameRequest,
  DeleteHostnameResponse,
  DeleteHostnameError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteHostnameRequest,
  output: DeleteHostnameResponse,
  errors: [],
}));

// =============================================================================
// HostnameIpfsUniversalPathContentList
// =============================================================================

export interface GetHostnameIpfsUniversalPathContentListRequest {
  identifier: string;
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const GetHostnameIpfsUniversalPathContentListRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list",
  }),
) as unknown as Schema.Schema<GetHostnameIpfsUniversalPathContentListRequest>;

export interface GetHostnameIpfsUniversalPathContentListResponse {
  /** Behavior of the content list. */
  action?: "block";
}

export const GetHostnameIpfsUniversalPathContentListResponse = Schema.Struct({
  action: Schema.optional(Schema.Literal("block")),
}) as unknown as Schema.Schema<GetHostnameIpfsUniversalPathContentListResponse>;

export type GetHostnameIpfsUniversalPathContentListError = CommonErrors;

export const getHostnameIpfsUniversalPathContentList: API.OperationMethod<
  GetHostnameIpfsUniversalPathContentListRequest,
  GetHostnameIpfsUniversalPathContentListResponse,
  GetHostnameIpfsUniversalPathContentListError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHostnameIpfsUniversalPathContentListRequest,
  output: GetHostnameIpfsUniversalPathContentListResponse,
  errors: [],
}));

export interface PutHostnameIpfsUniversalPathContentListRequest {
  identifier: string;
  /** Path param: Specify the identifier of the hostname. */
  zoneId: string;
  /** Body param: Behavior of the content list. */
  action: "block";
  /** Body param: Provides content list entries. */
  entries: {
    content?: string;
    description?: string;
    type?: "cid" | "content_path";
  }[];
}

export const PutHostnameIpfsUniversalPathContentListRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.Literal("block"),
  entries: Schema.Array(
    Schema.Struct({
      content: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["cid", "content_path"])),
    }),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list",
  }),
) as unknown as Schema.Schema<PutHostnameIpfsUniversalPathContentListRequest>;

export interface PutHostnameIpfsUniversalPathContentListResponse {
  /** Behavior of the content list. */
  action?: "block";
}

export const PutHostnameIpfsUniversalPathContentListResponse = Schema.Struct({
  action: Schema.optional(Schema.Literal("block")),
}) as unknown as Schema.Schema<PutHostnameIpfsUniversalPathContentListResponse>;

export type PutHostnameIpfsUniversalPathContentListError = CommonErrors;

export const putHostnameIpfsUniversalPathContentList: API.OperationMethod<
  PutHostnameIpfsUniversalPathContentListRequest,
  PutHostnameIpfsUniversalPathContentListResponse,
  PutHostnameIpfsUniversalPathContentListError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutHostnameIpfsUniversalPathContentListRequest,
  output: PutHostnameIpfsUniversalPathContentListResponse,
  errors: [],
}));

// =============================================================================
// HostnameIpfsUniversalPathContentListEntry
// =============================================================================

export interface GetHostnameIpfsUniversalPathContentListEntryRequest {
  identifier: string;
  contentListEntryIdentifier: string;
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const GetHostnameIpfsUniversalPathContentListEntryRequest =
  Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    contentListEntryIdentifier: Schema.String.pipe(
      T.HttpPath("contentListEntryIdentifier"),
    ),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{contentListEntryIdentifier}",
    }),
  ) as unknown as Schema.Schema<GetHostnameIpfsUniversalPathContentListEntryRequest>;

export interface GetHostnameIpfsUniversalPathContentListEntryResponse {
  /** Specify the identifier of the hostname. */
  id?: string;
  /** Specify the CID or content path of content to block. */
  content?: string;
  createdOn?: string;
  /** Specify an optional description of the content list entry. */
  description?: string;
  modifiedOn?: string;
  /** Specify the type of content list entry to block. */
  type?: "cid" | "content_path";
}

export const GetHostnameIpfsUniversalPathContentListEntryResponse =
  Schema.Struct({
    id: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["cid", "content_path"])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      content: "content",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      type: "type",
    }),
  ) as unknown as Schema.Schema<GetHostnameIpfsUniversalPathContentListEntryResponse>;

export type GetHostnameIpfsUniversalPathContentListEntryError = CommonErrors;

export const getHostnameIpfsUniversalPathContentListEntry: API.OperationMethod<
  GetHostnameIpfsUniversalPathContentListEntryRequest,
  GetHostnameIpfsUniversalPathContentListEntryResponse,
  GetHostnameIpfsUniversalPathContentListEntryError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHostnameIpfsUniversalPathContentListEntryRequest,
  output: GetHostnameIpfsUniversalPathContentListEntryResponse,
  errors: [],
}));

export interface ListHostnameIpfsUniversalPathContentListEntriesRequest {
  identifier: string;
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const ListHostnameIpfsUniversalPathContentListEntriesRequest =
  Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries",
    }),
  ) as unknown as Schema.Schema<ListHostnameIpfsUniversalPathContentListEntriesRequest>;

export interface ListHostnameIpfsUniversalPathContentListEntriesResponse {
  /** Provides content list entries. */
  entries?: {
    id?: string;
    content?: string;
    createdOn?: string;
    description?: string;
    modifiedOn?: string;
    type?: "cid" | "content_path";
  }[];
}

export const ListHostnameIpfsUniversalPathContentListEntriesResponse =
  Schema.Struct({
    entries: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          content: Schema.optional(Schema.String),
          createdOn: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          modifiedOn: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literals(["cid", "content_path"])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            content: "content",
            createdOn: "created_on",
            description: "description",
            modifiedOn: "modified_on",
            type: "type",
          }),
        ),
      ),
    ),
  }) as unknown as Schema.Schema<ListHostnameIpfsUniversalPathContentListEntriesResponse>;

export type ListHostnameIpfsUniversalPathContentListEntriesError = CommonErrors;

export const listHostnameIpfsUniversalPathContentListEntries: API.OperationMethod<
  ListHostnameIpfsUniversalPathContentListEntriesRequest,
  ListHostnameIpfsUniversalPathContentListEntriesResponse,
  ListHostnameIpfsUniversalPathContentListEntriesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListHostnameIpfsUniversalPathContentListEntriesRequest,
  output: ListHostnameIpfsUniversalPathContentListEntriesResponse,
  errors: [],
}));

export interface CreateHostnameIpfsUniversalPathContentListEntryRequest {
  identifier: string;
  /** Path param: Specify the identifier of the hostname. */
  zoneId: string;
  /** Body param: Specify the CID or content path of content to block. */
  content: string;
  /** Body param: Specify the type of content list entry to block. */
  type: "cid" | "content_path";
  /** Body param: Specify an optional description of the content list entry. */
  description?: string;
}

export const CreateHostnameIpfsUniversalPathContentListEntryRequest =
  Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    content: Schema.String,
    type: Schema.Literals(["cid", "content_path"]),
    description: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries",
    }),
  ) as unknown as Schema.Schema<CreateHostnameIpfsUniversalPathContentListEntryRequest>;

export interface CreateHostnameIpfsUniversalPathContentListEntryResponse {
  /** Specify the identifier of the hostname. */
  id?: string;
  /** Specify the CID or content path of content to block. */
  content?: string;
  createdOn?: string;
  /** Specify an optional description of the content list entry. */
  description?: string;
  modifiedOn?: string;
  /** Specify the type of content list entry to block. */
  type?: "cid" | "content_path";
}

export const CreateHostnameIpfsUniversalPathContentListEntryResponse =
  Schema.Struct({
    id: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["cid", "content_path"])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      content: "content",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      type: "type",
    }),
  ) as unknown as Schema.Schema<CreateHostnameIpfsUniversalPathContentListEntryResponse>;

export type CreateHostnameIpfsUniversalPathContentListEntryError = CommonErrors;

export const createHostnameIpfsUniversalPathContentListEntry: API.OperationMethod<
  CreateHostnameIpfsUniversalPathContentListEntryRequest,
  CreateHostnameIpfsUniversalPathContentListEntryResponse,
  CreateHostnameIpfsUniversalPathContentListEntryError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateHostnameIpfsUniversalPathContentListEntryRequest,
  output: CreateHostnameIpfsUniversalPathContentListEntryResponse,
  errors: [],
}));

export interface UpdateHostnameIpfsUniversalPathContentListEntryRequest {
  identifier: string;
  contentListEntryIdentifier: string;
  /** Path param: Specify the identifier of the hostname. */
  zoneId: string;
  /** Body param: Specify the CID or content path of content to block. */
  content: string;
  /** Body param: Specify the type of content list entry to block. */
  type: "cid" | "content_path";
  /** Body param: Specify an optional description of the content list entry. */
  description?: string;
}

export const UpdateHostnameIpfsUniversalPathContentListEntryRequest =
  Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    contentListEntryIdentifier: Schema.String.pipe(
      T.HttpPath("contentListEntryIdentifier"),
    ),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    content: Schema.String,
    type: Schema.Literals(["cid", "content_path"]),
    description: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{contentListEntryIdentifier}",
    }),
  ) as unknown as Schema.Schema<UpdateHostnameIpfsUniversalPathContentListEntryRequest>;

export interface UpdateHostnameIpfsUniversalPathContentListEntryResponse {
  /** Specify the identifier of the hostname. */
  id?: string;
  /** Specify the CID or content path of content to block. */
  content?: string;
  createdOn?: string;
  /** Specify an optional description of the content list entry. */
  description?: string;
  modifiedOn?: string;
  /** Specify the type of content list entry to block. */
  type?: "cid" | "content_path";
}

export const UpdateHostnameIpfsUniversalPathContentListEntryResponse =
  Schema.Struct({
    id: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["cid", "content_path"])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      content: "content",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      type: "type",
    }),
  ) as unknown as Schema.Schema<UpdateHostnameIpfsUniversalPathContentListEntryResponse>;

export type UpdateHostnameIpfsUniversalPathContentListEntryError = CommonErrors;

export const updateHostnameIpfsUniversalPathContentListEntry: API.OperationMethod<
  UpdateHostnameIpfsUniversalPathContentListEntryRequest,
  UpdateHostnameIpfsUniversalPathContentListEntryResponse,
  UpdateHostnameIpfsUniversalPathContentListEntryError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateHostnameIpfsUniversalPathContentListEntryRequest,
  output: UpdateHostnameIpfsUniversalPathContentListEntryResponse,
  errors: [],
}));

export interface DeleteHostnameIpfsUniversalPathContentListEntryRequest {
  identifier: string;
  contentListEntryIdentifier: string;
  /** Specify the identifier of the hostname. */
  zoneId: string;
}

export const DeleteHostnameIpfsUniversalPathContentListEntryRequest =
  Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    contentListEntryIdentifier: Schema.String.pipe(
      T.HttpPath("contentListEntryIdentifier"),
    ),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{contentListEntryIdentifier}",
    }),
  ) as unknown as Schema.Schema<DeleteHostnameIpfsUniversalPathContentListEntryRequest>;

export interface DeleteHostnameIpfsUniversalPathContentListEntryResponse {
  /** Specify the identifier of the hostname. */
  id: string;
}

export const DeleteHostnameIpfsUniversalPathContentListEntryResponse =
  Schema.Struct({
    id: Schema.String,
  }) as unknown as Schema.Schema<DeleteHostnameIpfsUniversalPathContentListEntryResponse>;

export type DeleteHostnameIpfsUniversalPathContentListEntryError = CommonErrors;

export const deleteHostnameIpfsUniversalPathContentListEntry: API.OperationMethod<
  DeleteHostnameIpfsUniversalPathContentListEntryRequest,
  DeleteHostnameIpfsUniversalPathContentListEntryResponse,
  DeleteHostnameIpfsUniversalPathContentListEntryError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteHostnameIpfsUniversalPathContentListEntryRequest,
  output: DeleteHostnameIpfsUniversalPathContentListEntryResponse,
  errors: [],
}));
