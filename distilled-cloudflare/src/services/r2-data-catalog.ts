/**
 * Cloudflare R2-DATA-CATALOG API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service r2-data-catalog
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
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

export class NoSuchBucket extends Schema.TaggedError<NoSuchBucket>()(
  "NoSuchBucket",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 10006 }])) {}

export class TableNotFound extends Schema.TaggedError<TableNotFound>()(
  "TableNotFound",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 10001 }, { code: 40403 }])) {}

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

export const createCredential: (
  input: CreateCredentialRequest,
) => Effect.Effect<
  CreateCredentialResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCredentialRequest,
  output: CreateCredentialResponse,
  errors: [],
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
  credentialStatus: "present" | "PRESENT" | "absent" | "ABSENT";
  /** Configures maintenance for the catalog. */
  maintenanceConfig: {
    compaction?: {
      state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
      targetSizeMb?: "64" | "128" | "256" | "512";
    };
    snapshotExpiration?: {
      maxSnapshotAge?: string;
      minSnapshotsToKeep?: number;
      state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    };
  };
}

export const GetMaintenanceConfigResponse = Schema.Struct({
  credentialStatus: Schema.Literal(
    "present",
    "PRESENT",
    "absent",
    "ABSENT",
  ).pipe(T.JsonName("credential_status")),
  maintenanceConfig: Schema.Struct({
    compaction: Schema.optional(
      Schema.Struct({
        state: Schema.optional(
          Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
        ),
        targetSizeMb: Schema.optional(
          Schema.Literal("64", "128", "256", "512"),
        ).pipe(T.JsonName("target_size_mb")),
      }),
    ),
    snapshotExpiration: Schema.optional(
      Schema.Struct({
        maxSnapshotAge: Schema.optional(Schema.String).pipe(
          T.JsonName("max_snapshot_age"),
        ),
        minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
          T.JsonName("min_snapshots_to_keep"),
        ),
        state: Schema.optional(
          Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
        ),
      }),
    ).pipe(T.JsonName("snapshot_expiration")),
  }).pipe(T.JsonName("maintenance_config")),
}) as unknown as Schema.Schema<GetMaintenanceConfigResponse>;

export const getMaintenanceConfig: (
  input: GetMaintenanceConfigRequest,
) => Effect.Effect<
  GetMaintenanceConfigResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMaintenanceConfigRequest,
  output: GetMaintenanceConfigResponse,
  errors: [],
}));

export interface UpdateMaintenanceConfigRequest {
  bucketName: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Body param: Updates compaction configuration (all fields optional). */
  compaction?: {
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    targetSizeMb?: "64" | "128" | "256" | "512";
  };
  /** Body param: Updates snapshot expiration configuration (all fields optional). */
  snapshotExpiration?: {
    maxSnapshotAge?: string;
    minSnapshotsToKeep?: number;
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
  };
}

export const UpdateMaintenanceConfigRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
      targetSizeMb: Schema.optional(
        Schema.Literal("64", "128", "256", "512"),
      ).pipe(T.JsonName("target_size_mb")),
    }),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.optional(Schema.String).pipe(
        T.JsonName("max_snapshot_age"),
      ),
      minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
        T.JsonName("min_snapshots_to_keep"),
      ),
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
    }),
  ).pipe(T.JsonName("snapshot_expiration")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/maintenance-configs",
  }),
) as unknown as Schema.Schema<UpdateMaintenanceConfigRequest>;

export interface UpdateMaintenanceConfigResponse {
  /** Configures compaction for catalog maintenance. */
  compaction?: {
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    targetSizeMb?: "64" | "128" | "256" | "512";
  };
  /** Configures snapshot expiration settings. */
  snapshotExpiration?: {
    maxSnapshotAge?: string;
    minSnapshotsToKeep?: number;
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
  };
}

export const UpdateMaintenanceConfigResponse = Schema.Struct({
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
      targetSizeMb: Schema.optional(
        Schema.Literal("64", "128", "256", "512"),
      ).pipe(T.JsonName("target_size_mb")),
    }),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.optional(Schema.String).pipe(
        T.JsonName("max_snapshot_age"),
      ),
      minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
        T.JsonName("min_snapshots_to_keep"),
      ),
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
    }),
  ).pipe(T.JsonName("snapshot_expiration")),
}) as unknown as Schema.Schema<UpdateMaintenanceConfigResponse>;

export const updateMaintenanceConfig: (
  input: UpdateMaintenanceConfigRequest,
) => Effect.Effect<
  UpdateMaintenanceConfigResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMaintenanceConfigRequest,
  output: UpdateMaintenanceConfigResponse,
  errors: [],
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
        namespace?: string[];
        namespaceUuid?: string;
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
    Schema.Union(
      Schema.Array(
        Schema.Struct({
          namespace: Schema.optional(Schema.Array(Schema.String)),
          namespaceUuid: Schema.optional(Schema.String).pipe(
            T.JsonName("namespace_uuid"),
          ),
          createdAt: Schema.optional(
            Schema.Union(Schema.String, Schema.Null),
          ).pipe(T.JsonName("created_at")),
          updatedAt: Schema.optional(
            Schema.Union(Schema.String, Schema.Null),
          ).pipe(T.JsonName("updated_at")),
        }),
      ),
      Schema.Null,
    ),
  ),
  namespaceUuids: Schema.optional(
    Schema.Union(Schema.Array(Schema.String), Schema.Null),
  ).pipe(T.JsonName("namespace_uuids")),
  nextPageToken: Schema.optional(Schema.Union(Schema.String, Schema.Null)).pipe(
    T.JsonName("next_page_token"),
  ),
}) as unknown as Schema.Schema<ListNamespacesResponse>;

export const listNamespaces: (
  input: ListNamespacesRequest,
) => Effect.Effect<
  ListNamespacesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [],
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
  identifiers: { name?: string; namespace?: string[] }[];
  /** Contains detailed metadata for each table when return_details is true. Each object includes identifier, UUID, timestamps, and locations. */
  details?:
    | {
        identifier?: { name?: string; namespace?: string[] };
        tableUuid?: string;
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
      name: Schema.optional(Schema.String),
      namespace: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
  details: Schema.optional(
    Schema.Union(
      Schema.Array(
        Schema.Struct({
          identifier: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              namespace: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          tableUuid: Schema.optional(Schema.String).pipe(
            T.JsonName("table_uuid"),
          ),
          createdAt: Schema.optional(
            Schema.Union(Schema.String, Schema.Null),
          ).pipe(T.JsonName("created_at")),
          location: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
          metadataLocation: Schema.optional(
            Schema.Union(Schema.String, Schema.Null),
          ).pipe(T.JsonName("metadata_location")),
          updatedAt: Schema.optional(
            Schema.Union(Schema.String, Schema.Null),
          ).pipe(T.JsonName("updated_at")),
        }),
      ),
      Schema.Null,
    ),
  ),
  nextPageToken: Schema.optional(Schema.Union(Schema.String, Schema.Null)).pipe(
    T.JsonName("next_page_token"),
  ),
  tableUuids: Schema.optional(
    Schema.Union(Schema.Array(Schema.String), Schema.Null),
  ).pipe(T.JsonName("table_uuids")),
}) as unknown as Schema.Schema<ListNamespaceTablesResponse>;

export const listNamespaceTables: (
  input: ListNamespaceTablesRequest,
) => Effect.Effect<
  ListNamespaceTablesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespaceTablesRequest,
  output: ListNamespaceTablesResponse,
  errors: [],
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
      state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
      targetSizeMb?: "64" | "128" | "256" | "512";
    };
    snapshotExpiration?: {
      maxSnapshotAge?: string;
      minSnapshotsToKeep?: number;
      state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    };
  };
}

export const GetNamespaceTableMaintenanceConfigResponse = Schema.Struct({
  maintenanceConfig: Schema.Struct({
    compaction: Schema.optional(
      Schema.Struct({
        state: Schema.optional(
          Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
        ),
        targetSizeMb: Schema.optional(
          Schema.Literal("64", "128", "256", "512"),
        ).pipe(T.JsonName("target_size_mb")),
      }),
    ),
    snapshotExpiration: Schema.optional(
      Schema.Struct({
        maxSnapshotAge: Schema.optional(Schema.String).pipe(
          T.JsonName("max_snapshot_age"),
        ),
        minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
          T.JsonName("min_snapshots_to_keep"),
        ),
        state: Schema.optional(
          Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
        ),
      }),
    ).pipe(T.JsonName("snapshot_expiration")),
  }).pipe(T.JsonName("maintenance_config")),
}) as unknown as Schema.Schema<GetNamespaceTableMaintenanceConfigResponse>;

export const getNamespaceTableMaintenanceConfig: (
  input: GetNamespaceTableMaintenanceConfigRequest,
) => Effect.Effect<
  GetNamespaceTableMaintenanceConfigResponse,
  CommonErrors | TableNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNamespaceTableMaintenanceConfigRequest,
  output: GetNamespaceTableMaintenanceConfigResponse,
  errors: [TableNotFound],
}));

export interface UpdateNamespaceTableMaintenanceConfigRequest {
  bucketName: string;
  namespace: string;
  tableName: string;
  /** Path param: Use this to identify the account. */
  accountId: string;
  /** Body param: Updates compaction configuration (all fields optional). */
  compaction?: {
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    targetSizeMb?: "64" | "128" | "256" | "512";
  };
  /** Body param: Updates snapshot expiration configuration (all fields optional). */
  snapshotExpiration?: {
    maxSnapshotAge?: string;
    minSnapshotsToKeep?: number;
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
  };
}

export const UpdateNamespaceTableMaintenanceConfigRequest = Schema.Struct({
  bucketName: Schema.String.pipe(T.HttpPath("bucketName")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  tableName: Schema.String.pipe(T.HttpPath("tableName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
      targetSizeMb: Schema.optional(
        Schema.Literal("64", "128", "256", "512"),
      ).pipe(T.JsonName("target_size_mb")),
    }),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.optional(Schema.String).pipe(
        T.JsonName("max_snapshot_age"),
      ),
      minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
        T.JsonName("min_snapshots_to_keep"),
      ),
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
    }),
  ).pipe(T.JsonName("snapshot_expiration")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/r2-catalog/{bucketName}/namespaces/{namespace}/tables/{tableName}/maintenance-configs",
  }),
) as unknown as Schema.Schema<UpdateNamespaceTableMaintenanceConfigRequest>;

export interface UpdateNamespaceTableMaintenanceConfigResponse {
  /** Configures compaction settings for table optimization. */
  compaction?: {
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    targetSizeMb?: "64" | "128" | "256" | "512";
  };
  /** Configures snapshot expiration settings. */
  snapshotExpiration?: {
    maxSnapshotAge?: string;
    minSnapshotsToKeep?: number;
    state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
  };
}

export const UpdateNamespaceTableMaintenanceConfigResponse = Schema.Struct({
  compaction: Schema.optional(
    Schema.Struct({
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
      targetSizeMb: Schema.optional(
        Schema.Literal("64", "128", "256", "512"),
      ).pipe(T.JsonName("target_size_mb")),
    }),
  ),
  snapshotExpiration: Schema.optional(
    Schema.Struct({
      maxSnapshotAge: Schema.optional(Schema.String).pipe(
        T.JsonName("max_snapshot_age"),
      ),
      minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
        T.JsonName("min_snapshots_to_keep"),
      ),
      state: Schema.optional(
        Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
      ),
    }),
  ).pipe(T.JsonName("snapshot_expiration")),
}) as unknown as Schema.Schema<UpdateNamespaceTableMaintenanceConfigResponse>;

export const updateNamespaceTableMaintenanceConfig: (
  input: UpdateNamespaceTableMaintenanceConfigRequest,
) => Effect.Effect<
  UpdateNamespaceTableMaintenanceConfigResponse,
  CommonErrors | TableNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateNamespaceTableMaintenanceConfigRequest,
  output: UpdateNamespaceTableMaintenanceConfigResponse,
  errors: [TableNotFound],
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
  status: "active" | "ACTIVE" | "inactive" | "INACTIVE";
  /** Shows the credential configuration status. */
  credentialStatus?: "present" | "PRESENT" | "absent" | "ABSENT" | null;
  /** Configures maintenance for the catalog. */
  maintenanceConfig?: {
    compaction?: {
      state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
      targetSizeMb?: "64" | "128" | "256" | "512";
    };
    snapshotExpiration?: {
      maxSnapshotAge?: string;
      minSnapshotsToKeep?: number;
      state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
    };
  } | null;
}

export const GetR2DataCatalogResponse = Schema.Struct({
  id: Schema.String,
  bucket: Schema.String,
  name: Schema.String,
  status: Schema.Literal("active", "ACTIVE", "inactive", "INACTIVE"),
  credentialStatus: Schema.optional(
    Schema.Union(
      Schema.Literal("present"),
      Schema.Literal("absent"),
      Schema.Null,
    ),
  ).pipe(T.JsonName("credential_status")),
  maintenanceConfig: Schema.optional(
    Schema.Union(
      Schema.Struct({
        compaction: Schema.optional(
          Schema.Struct({
            state: Schema.optional(
              Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
            ),
            targetSizeMb: Schema.optional(
              Schema.Literal("64", "128", "256", "512"),
            ).pipe(T.JsonName("target_size_mb")),
          }),
        ),
        snapshotExpiration: Schema.optional(
          Schema.Struct({
            maxSnapshotAge: Schema.optional(Schema.String).pipe(
              T.JsonName("max_snapshot_age"),
            ),
            minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
              T.JsonName("min_snapshots_to_keep"),
            ),
            state: Schema.optional(
              Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
            ),
          }),
        ).pipe(T.JsonName("snapshot_expiration")),
      }),
      Schema.Null,
    ),
  ).pipe(T.JsonName("maintenance_config")),
}) as unknown as Schema.Schema<GetR2DataCatalogResponse>;

export const getR2DataCatalog: (
  input: GetR2DataCatalogRequest,
) => Effect.Effect<
  GetR2DataCatalogResponse,
  CommonErrors | NoSuchBucket,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetR2DataCatalogRequest,
  output: GetR2DataCatalogResponse,
  errors: [NoSuchBucket],
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
    id?: string;
    bucket?: string;
    name?: string;
    status?: "active" | "ACTIVE" | "inactive" | "INACTIVE";
    credentialStatus?: "present" | "PRESENT" | "absent" | "ABSENT" | null;
    maintenanceConfig?: {
      compaction?: {
        state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
        targetSizeMb?: "64" | "128" | "256" | "512";
      };
      snapshotExpiration?: {
        maxSnapshotAge?: string;
        minSnapshotsToKeep?: number;
        state?: "enabled" | "ENABLED" | "disabled" | "DISABLED";
      };
    } | null;
  }[];
}

export const ListR2DataCatalogsResponse = Schema.Struct({
  warehouses: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literal("active", "ACTIVE", "inactive", "INACTIVE"),
      ),
      credentialStatus: Schema.optional(
        Schema.Union(
          Schema.Literal("present"),
          Schema.Literal("absent"),
          Schema.Null,
        ),
      ).pipe(T.JsonName("credential_status")),
      maintenanceConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            compaction: Schema.optional(
              Schema.Struct({
                state: Schema.optional(
                  Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
                ),
                targetSizeMb: Schema.optional(
                  Schema.Literal("64", "128", "256", "512"),
                ).pipe(T.JsonName("target_size_mb")),
              }),
            ),
            snapshotExpiration: Schema.optional(
              Schema.Struct({
                maxSnapshotAge: Schema.optional(Schema.String).pipe(
                  T.JsonName("max_snapshot_age"),
                ),
                minSnapshotsToKeep: Schema.optional(Schema.Number).pipe(
                  T.JsonName("min_snapshots_to_keep"),
                ),
                state: Schema.optional(
                  Schema.Literal("enabled", "ENABLED", "disabled", "DISABLED"),
                ),
              }),
            ).pipe(T.JsonName("snapshot_expiration")),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("maintenance_config")),
    }),
  ),
}) as unknown as Schema.Schema<ListR2DataCatalogsResponse>;

export const listR2DataCatalogs: (
  input: ListR2DataCatalogsRequest,
) => Effect.Effect<
  ListR2DataCatalogsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListR2DataCatalogsRequest,
  output: ListR2DataCatalogsResponse,
  errors: [],
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
  id: string;
  /** Specifies the name of the activated catalog. */
  name: string;
}

export const EnableR2DataCatalogResponse = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
}) as unknown as Schema.Schema<EnableR2DataCatalogResponse>;

export const enableR2DataCatalog: (
  input: EnableR2DataCatalogRequest,
) => Effect.Effect<
  EnableR2DataCatalogResponse,
  CommonErrors | NoSuchBucket,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableR2DataCatalogRequest,
  output: EnableR2DataCatalogResponse,
  errors: [NoSuchBucket],
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

export const disableR2DataCatalog: (
  input: DisableR2DataCatalogRequest,
) => Effect.Effect<
  DisableR2DataCatalogResponse,
  CommonErrors | NoSuchBucket,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableR2DataCatalogRequest,
  output: DisableR2DataCatalogResponse,
  errors: [NoSuchBucket],
}));
