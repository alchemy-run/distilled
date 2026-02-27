/**
 * Cloudflare R2-DATA-CATALOG API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service r2-data-catalog
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
// Errors
// =============================================================================

export class InvalidCredential extends Schema.TaggedErrorClass<InvalidCredential>()(
  "InvalidCredential",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidCredential, [{ code: 30004 }]);

export class InvalidRoute extends Schema.TaggedErrorClass<InvalidRoute>()(
  "InvalidRoute",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoute, [{ code: 7003 }]);

export class NoSuchBucket extends Schema.TaggedErrorClass<NoSuchBucket>()(
  "NoSuchBucket",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NoSuchBucket, [{ code: 10006 }]);

export class TableNotFound extends Schema.TaggedErrorClass<TableNotFound>()(
  "TableNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(TableNotFound, [{ code: 10001 }, { code: 40403 }]);

export class WarehouseInactive extends Schema.TaggedErrorClass<WarehouseInactive>()(
  "WarehouseInactive",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WarehouseInactive, [{ code: 40402 }]);

export class WarehouseNotFound extends Schema.TaggedErrorClass<WarehouseNotFound>()(
  "WarehouseNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WarehouseNotFound, [{ code: 40401 }]);

// =============================================================================
// Credential
// =============================================================================

export interface CreateCredentialRequest {
  bucketName: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Body param: Provides the Cloudflare API token for accessing R2. */
  token: string;
}

export const CreateCredentialRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  token: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/credential",
  }),
) as unknown as Schema.Schema<CreateCredentialRequest>;

export type CreateCredentialResponse = unknown;

export const CreateCredentialResponse =
  Schema.Unknown as unknown as Schema.Schema<CreateCredentialResponse>;

export type CreateCredentialError =
  | CommonErrors
  | InvalidRoute
  | InvalidCredential;

export const createCredential: API.OperationMethod<
  CreateCredentialRequest,
  CreateCredentialResponse,
  CreateCredentialError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCredentialRequest,
  output: CreateCredentialResponse,
  errors: [InvalidRoute, InvalidCredential],
}));

// =============================================================================
// MaintenanceConfig
// =============================================================================

export interface GetMaintenanceConfigRequest {
  bucketName: string;
  /** Use this to identify the account. */
  accountId: string;
}

export const GetMaintenanceConfigRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/maintenance-configs",
  }),
) as unknown as Schema.Schema<GetMaintenanceConfigRequest>;

export interface GetMaintenanceConfigResponse {
  /** Shows the credential configuration status. */
  credentialStatus: "present" | "absent";
  /** Configures maintenance for the catalog. */
  maintenanceConfig: {
    compaction?: {
      state: "enabled" | "disabled";
      targetSizeMb: "64" | "128" | "256" | "512";
    };
    snapshotExpiration?: {
      maxSnapshotAge: string;
      minSnapshotsToKeep: number;
      state: "enabled" | "disabled";
    };
  };
}

export const GetMaintenanceConfigResponse = Schema.Struct({
  credentialStatus: Schema.Literals(["present", "absent"]),
  maintenanceConfig: Schema.Struct({
    compaction: Schema.optional(
      Schema.Struct({
        state: Schema.Literals(["enabled", "disabled"]),
        targetSizeMb: Schema.Literals(["64", "128", "256", "512"]),
      }).pipe(
        Schema.encodeKeys({ state: "state", targetSizeMb: "target_size_mb" }),
      ),
    ),
    snapshotExpiration: Schema.optional(
      Schema.Struct({
        maxSnapshotAge: Schema.String,
        minSnapshotsToKeep: Schema.Number,
        state: Schema.Literals(["enabled", "disabled"]),
      }).pipe(
        Schema.encodeKeys({
          maxSnapshotAge: "max_snapshot_age",
          minSnapshotsToKeep: "min_snapshots_to_keep",
          state: "state",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      compaction: "compaction",
      snapshotExpiration: "snapshot_expiration",
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    credentialStatus: "credential_status",
    maintenanceConfig: "maintenance_config",
  }),
) as unknown as Schema.Schema<GetMaintenanceConfigResponse>;

export type GetMaintenanceConfigError =
  | CommonErrors
  | InvalidRoute
  | WarehouseInactive
  | WarehouseNotFound;

export const getMaintenanceConfig: API.OperationMethod<
  GetMaintenanceConfigRequest,
  GetMaintenanceConfigResponse,
  GetMaintenanceConfigError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMaintenanceConfigRequest,
  output: GetMaintenanceConfigResponse,
  errors: [InvalidRoute, WarehouseInactive, WarehouseNotFound],
}));

export interface UpdateMaintenanceConfigRequest {
  bucketName: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Body param: Updates compaction configuration (all fields optional). */
  compaction?: {
    state?: "enabled" | "disabled";
    targetSizeMb?: "64" | "128" | "256" | "512";
  };
  /** Body param: Updates snapshot expiration configuration (all fields optional). */
  snapshotExpiration?: {
    maxSnapshotAge?: string;
    minSnapshotsToKeep?: number;
    state?: "enabled" | "disabled";
  };
}

export const UpdateMaintenanceConfigRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.optional(Schema.Literals(["enabled", "disabled"])),
      targetSizeMb: Schema.optional(
        Schema.Literals(["64", "128", "256", "512"]),
      ),
    }).pipe(
      Schema.encodeKeys({ state: "state", targetSizeMb: "target_size_mb" }),
    ),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.optional(Schema.String),
      minSnapshotsToKeep: Schema.optional(Schema.Number),
      state: Schema.optional(Schema.Literals(["enabled", "disabled"])),
    }).pipe(
      Schema.encodeKeys({
        maxSnapshotAge: "max_snapshot_age",
        minSnapshotsToKeep: "min_snapshots_to_keep",
        state: "state",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    compaction: "compaction",
    snapshotExpiration: "snapshot_expiration",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/maintenance-configs",
  }),
) as unknown as Schema.Schema<UpdateMaintenanceConfigRequest>;

export interface UpdateMaintenanceConfigResponse {
  /** Configures compaction for catalog maintenance. */
  compaction?: {
    state: "enabled" | "disabled";
    targetSizeMb: "64" | "128" | "256" | "512";
  };
  /** Configures snapshot expiration settings. */
  snapshotExpiration?: {
    maxSnapshotAge: string;
    minSnapshotsToKeep: number;
    state: "enabled" | "disabled";
  };
}

export const UpdateMaintenanceConfigResponse = Schema.Struct({
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.Literals(["enabled", "disabled"]),
      targetSizeMb: Schema.Literals(["64", "128", "256", "512"]),
    }).pipe(
      Schema.encodeKeys({ state: "state", targetSizeMb: "target_size_mb" }),
    ),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.String,
      minSnapshotsToKeep: Schema.Number,
      state: Schema.Literals(["enabled", "disabled"]),
    }).pipe(
      Schema.encodeKeys({
        maxSnapshotAge: "max_snapshot_age",
        minSnapshotsToKeep: "min_snapshots_to_keep",
        state: "state",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    compaction: "compaction",
    snapshotExpiration: "snapshot_expiration",
  }),
) as unknown as Schema.Schema<UpdateMaintenanceConfigResponse>;

export type UpdateMaintenanceConfigError =
  | CommonErrors
  | InvalidRoute
  | WarehouseInactive;

export const updateMaintenanceConfig: API.OperationMethod<
  UpdateMaintenanceConfigRequest,
  UpdateMaintenanceConfigResponse,
  UpdateMaintenanceConfigError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMaintenanceConfigRequest,
  output: UpdateMaintenanceConfigResponse,
  errors: [InvalidRoute, WarehouseInactive],
}));

// =============================================================================
// Namespace
// =============================================================================

export interface ListNamespacesRequest {
  bucketName: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Query param: Maximum number of namespaces to return per page. Defaults to 100, maximum 1000. */
  pageSize?: number;
  /** Query param: Opaque pagination token from a previous response. Use this to fetch the next page of results. */
  pageToken?: string;
  /** Query param: Parent namespace to filter by. Only returns direct children of this namespace. For nested namespaces, use %1F as separator (e.g., "bronze%1Fanalytics"). Omit this parameter to list top-le */
  parent?: string;
  /** Query param: Whether to include additional metadata (timestamps). When true, response includes created_at and updated_at arrays. */
  returnDetails?: boolean;
  /** Query param: Whether to include namespace UUIDs in the response. Set to true to receive the namespace_uuids array. */
  returnUuids?: boolean;
}

export const ListNamespacesRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_size")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("page_token")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  returnDetails: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("return_details"),
  ),
  returnUuids: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("return_uuids"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/namespaces",
  }),
) as unknown as Schema.Schema<ListNamespacesRequest>;

export interface ListNamespacesResponse {
  /** Lists namespaces in the catalog. */
  namespaces: string[][];
  /** Contains detailed metadata for each namespace when return_details is true. Each object includes the namespace, UUID, and timestamps. */
  details?:
    | {
        namespace: string[];
        namespaceUuid: string;
        createdAt?: string | null;
        updatedAt?: string | null;
      }[]
    | null;
  /** Contains UUIDs for each namespace when return_uuids is true. The order corresponds to the namespaces array. */
  namespaceUuids?: string[] | null;
  /** Use this opaque token to fetch the next page of results. A null or absent value indicates the last page. */
  nextPageToken?: string | null;
}

export const ListNamespacesResponse = Schema.Struct({
  namespaces: Schema.Array(Schema.Array(Schema.String)),
  details: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          namespace: Schema.Array(Schema.String),
          namespaceUuid: Schema.String,
          createdAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          updatedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            namespace: "namespace",
            namespaceUuid: "namespace_uuid",
            createdAt: "created_at",
            updatedAt: "updated_at",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  namespaceUuids: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  nextPageToken: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    namespaces: "namespaces",
    details: "details",
    namespaceUuids: "namespace_uuids",
    nextPageToken: "next_page_token",
  }),
) as unknown as Schema.Schema<ListNamespacesResponse>;

export type ListNamespacesError =
  | CommonErrors
  | InvalidRoute
  | WarehouseInactive
  | WarehouseNotFound;

export const listNamespaces: API.OperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [InvalidRoute, WarehouseInactive, WarehouseNotFound],
}));

// =============================================================================
// NamespaceTable
// =============================================================================

export interface ListNamespaceTablesRequest {
  bucketName: string;
  namespace: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Query param: Maximum number of tables to return per page. Defaults to 100, maximum 1000. */
  pageSize?: number;
  /** Query param: Opaque pagination token from a previous response. Use this to fetch the next page of results. */
  pageToken?: string;
  /** Query param: Whether to include additional metadata (timestamps, locations). When true, response includes created_at, updated_at, metadata_locations, and locations arrays. */
  returnDetails?: boolean;
  /** Query param: Whether to include table UUIDs in the response. Set to true to receive the table_uuids array. */
  returnUuids?: boolean;
}

export const ListNamespaceTablesRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_size")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("page_token")),
  returnDetails: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("return_details"),
  ),
  returnUuids: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("return_uuids"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/namespaces/{namespace}/tables",
  }),
) as unknown as Schema.Schema<ListNamespaceTablesRequest>;

export interface ListNamespaceTablesResponse {
  /** Lists tables in the namespace. */
  identifiers: { name: string; namespace: string[] }[];
  /** Contains detailed metadata for each table when return_details is true. Each object includes identifier, UUID, timestamps, and locations. */
  details?:
    | {
        identifier: { name: string; namespace: string[] };
        tableUuid: string;
        createdAt?: string | null;
        location?: string | null;
        metadataLocation?: string | null;
        updatedAt?: string | null;
      }[]
    | null;
  /** Use this opaque token to fetch the next page of results. A null or absent value indicates the last page. */
  nextPageToken?: string | null;
  /** Contains UUIDs for each table when return_uuids is true. The order corresponds to the identifiers array. */
  tableUuids?: string[] | null;
}

export const ListNamespaceTablesResponse = Schema.Struct({
  identifiers: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      namespace: Schema.Array(Schema.String),
    }),
  ),
  details: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          identifier: Schema.Struct({
            name: Schema.String,
            namespace: Schema.Array(Schema.String),
          }),
          tableUuid: Schema.String,
          createdAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          location: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          metadataLocation: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          updatedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            identifier: "identifier",
            tableUuid: "table_uuid",
            createdAt: "created_at",
            location: "location",
            metadataLocation: "metadata_location",
            updatedAt: "updated_at",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  nextPageToken: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  tableUuids: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    identifiers: "identifiers",
    details: "details",
    nextPageToken: "next_page_token",
    tableUuids: "table_uuids",
  }),
) as unknown as Schema.Schema<ListNamespaceTablesResponse>;

export type ListNamespaceTablesError =
  | CommonErrors
  | InvalidRoute
  | WarehouseInactive;

export const listNamespaceTables: API.OperationMethod<
  ListNamespaceTablesRequest,
  ListNamespaceTablesResponse,
  ListNamespaceTablesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespaceTablesRequest,
  output: ListNamespaceTablesResponse,
  errors: [InvalidRoute, WarehouseInactive],
}));

// =============================================================================
// NamespaceTableMaintenanceConfig
// =============================================================================

export interface GetNamespaceTableMaintenanceConfigRequest {
  bucketName: string;
  namespace: string;
  tableName: string;
  /** Use this to identify the account. */
  accountId: string;
}

export const GetNamespaceTableMaintenanceConfigRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  tableName: Schema.String.pipe(T.HttpPath("tableName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs",
  }),
) as unknown as Schema.Schema<GetNamespaceTableMaintenanceConfigRequest>;

export interface GetNamespaceTableMaintenanceConfigResponse {
  /** Configures maintenance for the table. */
  maintenanceConfig: {
    compaction?: {
      state: "enabled" | "disabled";
      targetSizeMb: "64" | "128" | "256" | "512";
    };
    snapshotExpiration?: {
      maxSnapshotAge: string;
      minSnapshotsToKeep: number;
      state: "enabled" | "disabled";
    };
  };
}

export const GetNamespaceTableMaintenanceConfigResponse = Schema.Struct({
  maintenanceConfig: Schema.Struct({
    compaction: Schema.optional(
      Schema.Struct({
        state: Schema.Literals(["enabled", "disabled"]),
        targetSizeMb: Schema.Literals(["64", "128", "256", "512"]),
      }).pipe(
        Schema.encodeKeys({ state: "state", targetSizeMb: "target_size_mb" }),
      ),
    ),
    snapshotExpiration: Schema.optional(
      Schema.Struct({
        maxSnapshotAge: Schema.String,
        minSnapshotsToKeep: Schema.Number,
        state: Schema.Literals(["enabled", "disabled"]),
      }).pipe(
        Schema.encodeKeys({
          maxSnapshotAge: "max_snapshot_age",
          minSnapshotsToKeep: "min_snapshots_to_keep",
          state: "state",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      compaction: "compaction",
      snapshotExpiration: "snapshot_expiration",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ maintenanceConfig: "maintenance_config" }),
) as unknown as Schema.Schema<GetNamespaceTableMaintenanceConfigResponse>;

export type GetNamespaceTableMaintenanceConfigError =
  | CommonErrors
  | TableNotFound
  | InvalidRoute
  | WarehouseInactive;

export const getNamespaceTableMaintenanceConfig: API.OperationMethod<
  GetNamespaceTableMaintenanceConfigRequest,
  GetNamespaceTableMaintenanceConfigResponse,
  GetNamespaceTableMaintenanceConfigError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNamespaceTableMaintenanceConfigRequest,
  output: GetNamespaceTableMaintenanceConfigResponse,
  errors: [TableNotFound, InvalidRoute, WarehouseInactive],
}));

export interface UpdateNamespaceTableMaintenanceConfigRequest {
  bucketName: string;
  namespace: string;
  tableName: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Body param: Updates compaction configuration (all fields optional). */
  compaction?: {
    state?: "enabled" | "disabled";
    targetSizeMb?: "64" | "128" | "256" | "512";
  };
  /** Body param: Updates snapshot expiration configuration (all fields optional). */
  snapshotExpiration?: {
    maxSnapshotAge?: string;
    minSnapshotsToKeep?: number;
    state?: "enabled" | "disabled";
  };
}

export const UpdateNamespaceTableMaintenanceConfigRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  tableName: Schema.String.pipe(T.HttpPath("tableName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.optional(Schema.Literals(["enabled", "disabled"])),
      targetSizeMb: Schema.optional(
        Schema.Literals(["64", "128", "256", "512"]),
      ),
    }).pipe(
      Schema.encodeKeys({ state: "state", targetSizeMb: "target_size_mb" }),
    ),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.optional(Schema.String),
      minSnapshotsToKeep: Schema.optional(Schema.Number),
      state: Schema.optional(Schema.Literals(["enabled", "disabled"])),
    }).pipe(
      Schema.encodeKeys({
        maxSnapshotAge: "max_snapshot_age",
        minSnapshotsToKeep: "min_snapshots_to_keep",
        state: "state",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    compaction: "compaction",
    snapshotExpiration: "snapshot_expiration",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs",
  }),
) as unknown as Schema.Schema<UpdateNamespaceTableMaintenanceConfigRequest>;

export interface UpdateNamespaceTableMaintenanceConfigResponse {
  /** Configures compaction settings for table optimization. */
  compaction?: {
    state: "enabled" | "disabled";
    targetSizeMb: "64" | "128" | "256" | "512";
  };
  /** Configures snapshot expiration settings. */
  snapshotExpiration?: {
    maxSnapshotAge: string;
    minSnapshotsToKeep: number;
    state: "enabled" | "disabled";
  };
}

export const UpdateNamespaceTableMaintenanceConfigResponse = Schema.Struct({
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.Literals(["enabled", "disabled"]),
      targetSizeMb: Schema.Literals(["64", "128", "256", "512"]),
    }).pipe(
      Schema.encodeKeys({ state: "state", targetSizeMb: "target_size_mb" }),
    ),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.String,
      minSnapshotsToKeep: Schema.Number,
      state: Schema.Literals(["enabled", "disabled"]),
    }).pipe(
      Schema.encodeKeys({
        maxSnapshotAge: "max_snapshot_age",
        minSnapshotsToKeep: "min_snapshots_to_keep",
        state: "state",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    compaction: "compaction",
    snapshotExpiration: "snapshot_expiration",
  }),
) as unknown as Schema.Schema<UpdateNamespaceTableMaintenanceConfigResponse>;

export type UpdateNamespaceTableMaintenanceConfigError =
  | CommonErrors
  | TableNotFound
  | InvalidRoute
  | WarehouseInactive;

export const updateNamespaceTableMaintenanceConfig: API.OperationMethod<
  UpdateNamespaceTableMaintenanceConfigRequest,
  UpdateNamespaceTableMaintenanceConfigResponse,
  UpdateNamespaceTableMaintenanceConfigError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateNamespaceTableMaintenanceConfigRequest,
  output: UpdateNamespaceTableMaintenanceConfigResponse,
  errors: [TableNotFound, InvalidRoute, WarehouseInactive],
}));

// =============================================================================
// R2DataCatalog
// =============================================================================

export interface GetR2DataCatalogRequest {
  bucketName: string;
  /** Use this to identify the account. */
  accountId: string;
}

export const GetR2DataCatalogRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}",
  }),
) as unknown as Schema.Schema<GetR2DataCatalogRequest>;

export interface GetR2DataCatalogResponse {
  /** Use this to uniquely identify the catalog. */
  id: string;
  /** Specifies the associated R2 bucket name. */
  bucket: string;
  /** Specifies the catalog name (generated from account and bucket name). */
  name: string;
  /** Indicates the status of the catalog. */
  status: "active" | "inactive";
  /** Shows the credential configuration status. */
  credentialStatus?: "present" | "absent" | null;
  /** Configures maintenance for the catalog. */
  maintenanceConfig?: {
    compaction?: {
      state: "enabled" | "disabled";
      targetSizeMb: "64" | "128" | "256" | "512";
    };
    snapshotExpiration?: {
      maxSnapshotAge: string;
      minSnapshotsToKeep: number;
      state: "enabled" | "disabled";
    };
  } | null;
}

export const GetR2DataCatalogResponse = Schema.Struct({
  id: Schema.String,
  bucket: Schema.String,
  name: Schema.String,
  status: Schema.Literals(["active", "inactive"]),
  credentialStatus: Schema.optional(
    Schema.Union([
      Schema.Literal("present"),
      Schema.Literal("absent"),
      Schema.Null,
    ]),
  ),
  maintenanceConfig: Schema.optional(
    Schema.Union([
      Schema.Struct({
        compaction: Schema.optional(
          Schema.Struct({
            state: Schema.Literals(["enabled", "disabled"]),
            targetSizeMb: Schema.Literals(["64", "128", "256", "512"]),
          }).pipe(
            Schema.encodeKeys({
              state: "state",
              targetSizeMb: "target_size_mb",
            }),
          ),
        ),
        snapshotExpiration: Schema.optional(
          Schema.Struct({
            maxSnapshotAge: Schema.String,
            minSnapshotsToKeep: Schema.Number,
            state: Schema.Literals(["enabled", "disabled"]),
          }).pipe(
            Schema.encodeKeys({
              maxSnapshotAge: "max_snapshot_age",
              minSnapshotsToKeep: "min_snapshots_to_keep",
              state: "state",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({
          compaction: "compaction",
          snapshotExpiration: "snapshot_expiration",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    bucket: "bucket",
    name: "name",
    status: "status",
    credentialStatus: "credential_status",
    maintenanceConfig: "maintenance_config",
  }),
) as unknown as Schema.Schema<GetR2DataCatalogResponse>;

export type GetR2DataCatalogError = CommonErrors | NoSuchBucket | InvalidRoute;

export const getR2DataCatalog: API.OperationMethod<
  GetR2DataCatalogRequest,
  GetR2DataCatalogResponse,
  GetR2DataCatalogError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetR2DataCatalogRequest,
  output: GetR2DataCatalogResponse,
  errors: [NoSuchBucket, InvalidRoute],
}));

export interface ListR2DataCatalogsRequest {
  /** Use this to identify the account. */
  accountId: string;
}

export const ListR2DataCatalogsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog" }),
) as unknown as Schema.Schema<ListR2DataCatalogsRequest>;

export interface ListR2DataCatalogsResponse {
  /** Lists catalogs in the account. */
  warehouses: {
    id: string;
    bucket: string;
    name: string;
    status: "active" | "inactive";
    credentialStatus?: "present" | "absent" | null;
    maintenanceConfig?: {
      compaction?: {
        state: "enabled" | "disabled";
        targetSizeMb: "64" | "128" | "256" | "512";
      };
      snapshotExpiration?: {
        maxSnapshotAge: string;
        minSnapshotsToKeep: number;
        state: "enabled" | "disabled";
      };
    } | null;
  }[];
}

export const ListR2DataCatalogsResponse = Schema.Struct({
  warehouses: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      bucket: Schema.String,
      name: Schema.String,
      status: Schema.Literals(["active", "inactive"]),
      credentialStatus: Schema.optional(
        Schema.Union([
          Schema.Literal("present"),
          Schema.Literal("absent"),
          Schema.Null,
        ]),
      ),
      maintenanceConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            compaction: Schema.optional(
              Schema.Struct({
                state: Schema.Literals(["enabled", "disabled"]),
                targetSizeMb: Schema.Literals(["64", "128", "256", "512"]),
              }).pipe(
                Schema.encodeKeys({
                  state: "state",
                  targetSizeMb: "target_size_mb",
                }),
              ),
            ),
            snapshotExpiration: Schema.optional(
              Schema.Struct({
                maxSnapshotAge: Schema.String,
                minSnapshotsToKeep: Schema.Number,
                state: Schema.Literals(["enabled", "disabled"]),
              }).pipe(
                Schema.encodeKeys({
                  maxSnapshotAge: "max_snapshot_age",
                  minSnapshotsToKeep: "min_snapshots_to_keep",
                  state: "state",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              compaction: "compaction",
              snapshotExpiration: "snapshot_expiration",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        bucket: "bucket",
        name: "name",
        status: "status",
        credentialStatus: "credential_status",
        maintenanceConfig: "maintenance_config",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListR2DataCatalogsResponse>;

export type ListR2DataCatalogsError = CommonErrors | InvalidRoute;

export const listR2DataCatalogs: API.OperationMethod<
  ListR2DataCatalogsRequest,
  ListR2DataCatalogsResponse,
  ListR2DataCatalogsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListR2DataCatalogsRequest,
  output: ListR2DataCatalogsResponse,
  errors: [InvalidRoute],
}));

export interface EnableR2DataCatalogRequest {
  bucketName: string;
  /** Use this to identify the account. */
  accountId: string;
}

export const EnableR2DataCatalogRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/enable",
  }),
) as unknown as Schema.Schema<EnableR2DataCatalogRequest>;

export interface EnableR2DataCatalogResponse {
  /** Use this to uniquely identify the activated catalog. */
  id?: string;
  /** Specifies the name of the activated catalog. */
  name: string;
}

export const EnableR2DataCatalogResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.String,
}) as unknown as Schema.Schema<EnableR2DataCatalogResponse>;

export type EnableR2DataCatalogError =
  | CommonErrors
  | NoSuchBucket
  | InvalidRoute;

export const enableR2DataCatalog: API.OperationMethod<
  EnableR2DataCatalogRequest,
  EnableR2DataCatalogResponse,
  EnableR2DataCatalogError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableR2DataCatalogRequest,
  output: EnableR2DataCatalogResponse,
  errors: [NoSuchBucket, InvalidRoute],
}));

export interface DisableR2DataCatalogRequest {
  bucketName: string;
  /** Use this to identify the account. */
  accountId: string;
}

export const DisableR2DataCatalogRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/disable",
  }),
) as unknown as Schema.Schema<DisableR2DataCatalogRequest>;

export type DisableR2DataCatalogResponse = unknown;

export const DisableR2DataCatalogResponse =
  Schema.Unknown as unknown as Schema.Schema<DisableR2DataCatalogResponse>;

export type DisableR2DataCatalogError =
  | CommonErrors
  | NoSuchBucket
  | InvalidRoute;

export const disableR2DataCatalog: API.OperationMethod<
  DisableR2DataCatalogRequest,
  DisableR2DataCatalogResponse,
  DisableR2DataCatalogError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableR2DataCatalogRequest,
  output: DisableR2DataCatalogResponse,
  errors: [NoSuchBucket, InvalidRoute],
}));
