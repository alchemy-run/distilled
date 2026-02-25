/**
 * Cloudflare D1 API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service d1
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

export class DatabaseNotFound extends Schema.TaggedErrorClass<DatabaseNotFound>()(
  "DatabaseNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(DatabaseNotFound, [{ code: 7404 }]);

export class InternalError extends Schema.TaggedErrorClass<InternalError>()(
  "InternalError",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InternalError, [{ code: 7500 }]);

export class InvalidObjectIdentifier extends Schema.TaggedErrorClass<InvalidObjectIdentifier>()(
  "InvalidObjectIdentifier",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidObjectIdentifier, [{ code: 7003 }]);

export class InvalidProperty extends Schema.TaggedErrorClass<InvalidProperty>()(
  "InvalidProperty",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidProperty, [{ code: 7400 }]);

export class InvalidRequest extends Schema.TaggedErrorClass<InvalidRequest>()(
  "InvalidRequest",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRequest, [{ code: 7400 }]);

export class NoHistoryAvailable extends Schema.TaggedErrorClass<NoHistoryAvailable>()(
  "NoHistoryAvailable",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NoHistoryAvailable, [{ code: 7500 }]);

export class TimestampTooOld extends Schema.TaggedErrorClass<TimestampTooOld>()(
  "TimestampTooOld",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(TimestampTooOld, [{ code: 7400 }]);

export class UnknownError extends Schema.TaggedErrorClass<UnknownError>()(
  "UnknownError",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(UnknownError, [{ code: 0 }]);

// =============================================================================
// BookmarkDatabaseTimeTravel
// =============================================================================

export interface GetBookmarkDatabaseTimeTravelRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: An optional ISO 8601 timestamp. If provided, returns the nearest available bookmark at or before this timestamp. If omitted, returns the current bookmark. */
  timestamp?: string;
}

export const GetBookmarkDatabaseTimeTravelRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  timestamp: Schema.optional(Schema.String).pipe(T.HttpQuery("timestamp")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/d1/database/{databaseId}/time_travel/bookmark",
  }),
) as unknown as Schema.Schema<GetBookmarkDatabaseTimeTravelRequest>;

export interface GetBookmarkDatabaseTimeTravelResponse {
  /** A bookmark representing a specific state of the database at a specific point in time. */
  bookmark?: string;
}

export const GetBookmarkDatabaseTimeTravelResponse = Schema.Struct({
  bookmark: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetBookmarkDatabaseTimeTravelResponse>;

export const getBookmarkDatabaseTimeTravel: (
  input: GetBookmarkDatabaseTimeTravelRequest,
) => Effect.Effect<
  GetBookmarkDatabaseTimeTravelResponse,
  | CommonErrors
  | InvalidObjectIdentifier
  | NoHistoryAvailable
  | TimestampTooOld
  | DatabaseNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBookmarkDatabaseTimeTravelRequest,
  output: GetBookmarkDatabaseTimeTravelResponse,
  errors: [
    InvalidObjectIdentifier,
    NoHistoryAvailable,
    TimestampTooOld,
    DatabaseNotFound,
  ],
}));

// =============================================================================
// Databas
// =============================================================================

export interface ListDatabasesRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: a database name to search for. */
  name?: string;
}

export const ListDatabasesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/d1/database" }),
) as unknown as Schema.Schema<ListDatabasesRequest>;

export type ListDatabasesResponse = {
  createdAt?: string;
  name?: string;
  uuid?: string;
  version?: string;
}[];

export const ListDatabasesResponse = Schema.Array(
  Schema.Struct({
    createdAt: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    uuid: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ createdAt: "created_at" })),
) as unknown as Schema.Schema<ListDatabasesResponse>;

export const listDatabases: (
  input: ListDatabasesRequest,
) => Effect.Effect<
  ListDatabasesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDatabasesRequest,
  output: ListDatabasesResponse,
  errors: [],
}));

// =============================================================================
// Database
// =============================================================================

export interface GetDatabaseRequest {
  databaseId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/d1/database/{databaseId}",
  }),
) as unknown as Schema.Schema<GetDatabaseRequest>;

export type GetDatabaseResponse = unknown;

export const GetDatabaseResponse =
  Schema.Unknown as unknown as Schema.Schema<GetDatabaseResponse>;

export const getDatabase: (
  input: GetDatabaseRequest,
) => Effect.Effect<
  GetDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier | DatabaseNotFound | UnknownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDatabaseRequest,
  output: GetDatabaseResponse,
  errors: [InvalidObjectIdentifier, DatabaseNotFound, UnknownError],
}));

export interface CreateDatabaseRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: D1 database name. */
  name: string;
  /** Body param: Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored. */
  jurisdiction?: "eu" | "fedramp";
  /** Body param: Specify the region to create the D1 primary, if available. If this option is omitted, the D1 will be created as close as possible to the current user. */
  primaryLocationHint?: "wnam" | "enam" | "weur" | "eeur" | "apac" | "oc";
}

export const CreateDatabaseRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
  primaryLocationHint: Schema.optional(
    Schema.Literals(["wnam", "enam", "weur", "eeur", "apac", "oc"]),
  ),
}).pipe(
  Schema.encodeKeys({ primaryLocationHint: "primary_location_hint" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database" }),
) as unknown as Schema.Schema<CreateDatabaseRequest>;

export type CreateDatabaseResponse = unknown;

export const CreateDatabaseResponse =
  Schema.Unknown as unknown as Schema.Schema<CreateDatabaseResponse>;

export const createDatabase: (
  input: CreateDatabaseRequest,
) => Effect.Effect<
  CreateDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier | InvalidProperty,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDatabaseRequest,
  output: CreateDatabaseResponse,
  errors: [InvalidObjectIdentifier, InvalidProperty],
}));

export interface UpdateDatabaseRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Configuration for D1 read replication. */
  readReplication: { mode: "auto" | "disabled" };
}

export const UpdateDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  readReplication: Schema.Struct({
    mode: Schema.Literals(["auto", "disabled"]),
  }),
}).pipe(
  Schema.encodeKeys({ readReplication: "read_replication" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/d1/database/{databaseId}",
  }),
) as unknown as Schema.Schema<UpdateDatabaseRequest>;

export type UpdateDatabaseResponse = unknown;

export const UpdateDatabaseResponse =
  Schema.Unknown as unknown as Schema.Schema<UpdateDatabaseResponse>;

export const updateDatabase: (
  input: UpdateDatabaseRequest,
) => Effect.Effect<
  UpdateDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier | InternalError | DatabaseNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDatabaseRequest,
  output: UpdateDatabaseResponse,
  errors: [InvalidObjectIdentifier, InternalError, DatabaseNotFound],
}));

export interface PatchDatabaseRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Configuration for D1 read replication. */
  readReplication?: { mode: "auto" | "disabled" };
}

export const PatchDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  readReplication: Schema.optional(
    Schema.Struct({
      mode: Schema.Literals(["auto", "disabled"]),
    }),
  ),
}).pipe(
  Schema.encodeKeys({ readReplication: "read_replication" }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/d1/database/{databaseId}",
  }),
) as unknown as Schema.Schema<PatchDatabaseRequest>;

export type PatchDatabaseResponse = unknown;

export const PatchDatabaseResponse =
  Schema.Unknown as unknown as Schema.Schema<PatchDatabaseResponse>;

export const patchDatabase: (
  input: PatchDatabaseRequest,
) => Effect.Effect<
  PatchDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier | InternalError | DatabaseNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDatabaseRequest,
  output: PatchDatabaseResponse,
  errors: [InvalidObjectIdentifier, InternalError, DatabaseNotFound],
}));

export interface DeleteDatabaseRequest {
  databaseId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/d1/database/{databaseId}",
  }),
) as unknown as Schema.Schema<DeleteDatabaseRequest>;

export type DeleteDatabaseResponse = unknown;

export const DeleteDatabaseResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteDatabaseResponse>;

export const deleteDatabase: (
  input: DeleteDatabaseRequest,
) => Effect.Effect<
  DeleteDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier | DatabaseNotFound | UnknownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDatabaseRequest,
  output: DeleteDatabaseResponse,
  errors: [InvalidObjectIdentifier, DatabaseNotFound, UnknownError],
}));

export interface ExportDatabaseRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Specifies that you will poll this endpoint until the export completes */
  outputFormat: "polling";
  /** Body param: To poll an in-progress export, provide the current bookmark (returned by your first polling response) */
  currentBookmark?: string;
  /** Body param: */
  dumpOptions?: { noData?: boolean; noSchema?: boolean; tables?: string[] };
}

export const ExportDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  outputFormat: Schema.Literal("polling"),
  currentBookmark: Schema.optional(Schema.String),
  dumpOptions: Schema.optional(
    Schema.Struct({
      noData: Schema.optional(Schema.Boolean),
      noSchema: Schema.optional(Schema.Boolean),
      tables: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(Schema.encodeKeys({ noData: "no_data", noSchema: "no_schema" })),
  ),
}).pipe(
  Schema.encodeKeys({
    outputFormat: "output_format",
    currentBookmark: "current_bookmark",
    dumpOptions: "dump_options",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/d1/database/{databaseId}/export",
  }),
) as unknown as Schema.Schema<ExportDatabaseRequest>;

export interface ExportDatabaseResponse {
  /** The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the export task. */
  atBookmark?: string;
  /** Only present when status = 'error'. Contains the error message. */
  error?: string;
  /** Logs since the last time you polled */
  messages?: string[];
  /** Only present when status = 'complete' */
  result?: { filename?: string; signedUrl?: string };
  status?: "complete" | "error";
  success?: boolean;
  type?: "export";
}

export const ExportDatabaseResponse = Schema.Struct({
  atBookmark: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(Schema.String)),
  result: Schema.optional(
    Schema.Struct({
      filename: Schema.optional(Schema.String),
      signedUrl: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ signedUrl: "signed_url" })),
  ),
  status: Schema.optional(Schema.Literals(["complete", "error"])),
  success: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.Literal("export")),
}).pipe(
  Schema.encodeKeys({ atBookmark: "at_bookmark" }),
) as unknown as Schema.Schema<ExportDatabaseResponse>;

export const exportDatabase: (
  input: ExportDatabaseRequest,
) => Effect.Effect<
  ExportDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier | InvalidRequest | DatabaseNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportDatabaseRequest,
  output: ExportDatabaseResponse,
  errors: [InvalidObjectIdentifier, InvalidRequest, DatabaseNotFound],
}));

export interface ImportDatabaseRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Indicates you have a new SQL file to upload. */
  action: "init";
  /** Body param: Required when action is 'init' or 'ingest'. An md5 hash of the file you're uploading. Used to check if it already exists, and validate its contents before ingesting. */
  etag: string;
}

export const ImportDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  action: Schema.Literal("init"),
  etag: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/d1/database/{databaseId}/import",
  }),
) as unknown as Schema.Schema<ImportDatabaseRequest>;

export interface ImportDatabaseResponse {
  /** The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the import. Only returned if an import process is currently running or recently finished. */
  atBookmark?: string;
  /** Only present when status = 'error'. Contains the error message that prevented the import from succeeding. */
  error?: string;
  /** Derived from the database ID and etag, to use in avoiding repeated uploads. Only returned when for the 'init' action. */
  filename?: string;
  /** Logs since the last time you polled */
  messages?: string[];
  /** Only present when status = 'complete' */
  result?: {
    finalBookmark?: string;
    meta?: {
      changedDb?: boolean;
      changes?: number;
      duration?: number;
      lastRowId?: number;
      rowsRead?: number;
      rowsWritten?: number;
      servedByColo?: string;
      servedByPrimary?: boolean;
      servedByRegion?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC";
      sizeAfter?: number;
      timings?: { sqlDurationMs?: number };
    };
    numQueries?: number;
  };
  status?: "complete" | "error";
  success?: boolean;
  type?: "import";
  /** The R2 presigned URL to use for uploading. Only returned when for the 'init' action. */
  uploadUrl?: string;
}

export const ImportDatabaseResponse = Schema.Struct({
  atBookmark: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(Schema.String)),
  result: Schema.optional(
    Schema.Struct({
      finalBookmark: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          changedDb: Schema.optional(Schema.Boolean),
          changes: Schema.optional(Schema.Number),
          duration: Schema.optional(Schema.Number),
          lastRowId: Schema.optional(Schema.Number),
          rowsRead: Schema.optional(Schema.Number),
          rowsWritten: Schema.optional(Schema.Number),
          servedByColo: Schema.optional(Schema.String),
          servedByPrimary: Schema.optional(Schema.Boolean),
          servedByRegion: Schema.optional(
            Schema.Literals(["WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC"]),
          ),
          sizeAfter: Schema.optional(Schema.Number),
          timings: Schema.optional(
            Schema.Struct({
              sqlDurationMs: Schema.optional(Schema.Number),
            }).pipe(Schema.encodeKeys({ sqlDurationMs: "sql_duration_ms" })),
          ),
        }).pipe(
          Schema.encodeKeys({
            changedDb: "changed_db",
            lastRowId: "last_row_id",
            rowsRead: "rows_read",
            rowsWritten: "rows_written",
            servedByColo: "served_by_colo",
            servedByPrimary: "served_by_primary",
            servedByRegion: "served_by_region",
            sizeAfter: "size_after",
          }),
        ),
      ),
      numQueries: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        finalBookmark: "final_bookmark",
        numQueries: "num_queries",
      }),
    ),
  ),
  status: Schema.optional(Schema.Literals(["complete", "error"])),
  success: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.Literal("import")),
  uploadUrl: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ atBookmark: "at_bookmark", uploadUrl: "upload_url" }),
) as unknown as Schema.Schema<ImportDatabaseResponse>;

export const importDatabase: (
  input: ImportDatabaseRequest,
) => Effect.Effect<
  ImportDatabaseResponse,
  CommonErrors | InvalidObjectIdentifier,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportDatabaseRequest,
  output: ImportDatabaseResponse,
  errors: [InvalidObjectIdentifier],
}));

export interface QueryDatabaseRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch. */
  sql: string;
  /** Body param: */
  params?: string[];
}

export const QueryDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  sql: Schema.String,
  params: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/d1/database/{databaseId}/query",
  }),
) as unknown as Schema.Schema<QueryDatabaseRequest>;

export type QueryDatabaseResponse = {
  meta?: {
    changedDb?: boolean;
    changes?: number;
    duration?: number;
    lastRowId?: number;
    rowsRead?: number;
    rowsWritten?: number;
    servedByColo?: string;
    servedByPrimary?: boolean;
    servedByRegion?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC";
    sizeAfter?: number;
    timings?: { sqlDurationMs?: number };
  };
  results?: unknown[];
  success?: boolean;
}[];

export const QueryDatabaseResponse = Schema.Array(
  Schema.Struct({
    meta: Schema.optional(
      Schema.Struct({
        changedDb: Schema.optional(Schema.Boolean),
        changes: Schema.optional(Schema.Number),
        duration: Schema.optional(Schema.Number),
        lastRowId: Schema.optional(Schema.Number),
        rowsRead: Schema.optional(Schema.Number),
        rowsWritten: Schema.optional(Schema.Number),
        servedByColo: Schema.optional(Schema.String),
        servedByPrimary: Schema.optional(Schema.Boolean),
        servedByRegion: Schema.optional(
          Schema.Literals(["WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC"]),
        ),
        sizeAfter: Schema.optional(Schema.Number),
        timings: Schema.optional(
          Schema.Struct({
            sqlDurationMs: Schema.optional(Schema.Number),
          }).pipe(Schema.encodeKeys({ sqlDurationMs: "sql_duration_ms" })),
        ),
      }).pipe(
        Schema.encodeKeys({
          changedDb: "changed_db",
          lastRowId: "last_row_id",
          rowsRead: "rows_read",
          rowsWritten: "rows_written",
          servedByColo: "served_by_colo",
          servedByPrimary: "served_by_primary",
          servedByRegion: "served_by_region",
          sizeAfter: "size_after",
        }),
      ),
    ),
    results: Schema.optional(Schema.Array(Schema.Unknown)),
    success: Schema.optional(Schema.Boolean),
  }),
) as unknown as Schema.Schema<QueryDatabaseResponse>;

export const queryDatabase: (
  input: QueryDatabaseRequest,
) => Effect.Effect<
  QueryDatabaseResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryDatabaseRequest,
  output: QueryDatabaseResponse,
  errors: [],
}));

export interface RawDatabaseRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch. */
  sql: string;
  /** Body param: */
  params?: string[];
}

export const RawDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  sql: Schema.String,
  params: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/d1/database/{databaseId}/raw",
  }),
) as unknown as Schema.Schema<RawDatabaseRequest>;

export type RawDatabaseResponse = {
  meta?: {
    changedDb?: boolean;
    changes?: number;
    duration?: number;
    lastRowId?: number;
    rowsRead?: number;
    rowsWritten?: number;
    servedByColo?: string;
    servedByPrimary?: boolean;
    servedByRegion?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC";
    sizeAfter?: number;
    timings?: { sqlDurationMs?: number };
  };
  results?: { columns?: string[]; rows?: (number | string)[][] };
  success?: boolean;
}[];

export const RawDatabaseResponse = Schema.Array(
  Schema.Struct({
    meta: Schema.optional(
      Schema.Struct({
        changedDb: Schema.optional(Schema.Boolean),
        changes: Schema.optional(Schema.Number),
        duration: Schema.optional(Schema.Number),
        lastRowId: Schema.optional(Schema.Number),
        rowsRead: Schema.optional(Schema.Number),
        rowsWritten: Schema.optional(Schema.Number),
        servedByColo: Schema.optional(Schema.String),
        servedByPrimary: Schema.optional(Schema.Boolean),
        servedByRegion: Schema.optional(
          Schema.Literals(["WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC"]),
        ),
        sizeAfter: Schema.optional(Schema.Number),
        timings: Schema.optional(
          Schema.Struct({
            sqlDurationMs: Schema.optional(Schema.Number),
          }).pipe(Schema.encodeKeys({ sqlDurationMs: "sql_duration_ms" })),
        ),
      }).pipe(
        Schema.encodeKeys({
          changedDb: "changed_db",
          lastRowId: "last_row_id",
          rowsRead: "rows_read",
          rowsWritten: "rows_written",
          servedByColo: "served_by_colo",
          servedByPrimary: "served_by_primary",
          servedByRegion: "served_by_region",
          sizeAfter: "size_after",
        }),
      ),
    ),
    results: Schema.optional(
      Schema.Struct({
        columns: Schema.optional(Schema.Array(Schema.String)),
        rows: Schema.optional(
          Schema.Array(
            Schema.Array(Schema.Union([Schema.Number, Schema.String])),
          ),
        ),
      }),
    ),
    success: Schema.optional(Schema.Boolean),
  }),
) as unknown as Schema.Schema<RawDatabaseResponse>;

export const rawDatabase: (
  input: RawDatabaseRequest,
) => Effect.Effect<
  RawDatabaseResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RawDatabaseRequest,
  output: RawDatabaseResponse,
  errors: [],
}));

// =============================================================================
// DatabaseTimeTravel
// =============================================================================

export interface RestoreDatabaseTimeTravelRequest {
  databaseId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: A bookmark to restore the database to. Required if `timestamp` is not provided. */
  bookmark?: string;
  /** Query param: An ISO 8601 timestamp to restore the database to. Required if `bookmark` is not provided. */
  timestamp?: string;
}

export const RestoreDatabaseTimeTravelRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  bookmark: Schema.optional(Schema.String).pipe(T.HttpQuery("bookmark")),
  timestamp: Schema.optional(Schema.String).pipe(T.HttpQuery("timestamp")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/d1/database/{databaseId}/time_travel/restore",
  }),
) as unknown as Schema.Schema<RestoreDatabaseTimeTravelRequest>;

export interface RestoreDatabaseTimeTravelResponse {
  /** The new bookmark representing the state of the database after the restore operation. */
  bookmark?: string;
  /** A message describing the result of the restore operation. */
  message?: string;
  /** The bookmark representing the state of the database before the restore operation. Can be used to undo the restore if needed. */
  previousBookmark?: string;
}

export const RestoreDatabaseTimeTravelResponse = Schema.Struct({
  bookmark: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  previousBookmark: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ previousBookmark: "previous_bookmark" }),
) as unknown as Schema.Schema<RestoreDatabaseTimeTravelResponse>;

export const restoreDatabaseTimeTravel: (
  input: RestoreDatabaseTimeTravelRequest,
) => Effect.Effect<
  RestoreDatabaseTimeTravelResponse,
  | CommonErrors
  | InvalidObjectIdentifier
  | NoHistoryAvailable
  | DatabaseNotFound
  | InvalidProperty,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreDatabaseTimeTravelRequest,
  output: RestoreDatabaseTimeTravelResponse,
  errors: [
    InvalidObjectIdentifier,
    NoHistoryAvailable,
    DatabaseNotFound,
    InvalidProperty,
  ],
}));
