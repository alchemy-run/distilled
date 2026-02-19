/**
 * Cloudflare D1 API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service d1
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

export class DatabaseNotFound extends Schema.TaggedError<DatabaseNotFound>()(
  "DatabaseNotFound",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7404 }])) {}

export class InternalError extends Schema.TaggedError<InternalError>()(
  "InternalError",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7500 }])) {}

export class InvalidObjectIdentifier extends Schema.TaggedError<InvalidObjectIdentifier>()(
  "InvalidObjectIdentifier",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7003 }])) {}

export class InvalidProperty extends Schema.TaggedError<InvalidProperty>()(
  "InvalidProperty",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7400 }])) {}

export class InvalidRequest extends Schema.TaggedError<InvalidRequest>()(
  "InvalidRequest",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7400 }])) {}

export class NoHistoryAvailable extends Schema.TaggedError<NoHistoryAvailable>()(
  "NoHistoryAvailable",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7500 }])) {}

export class TimestampTooOld extends Schema.TaggedError<TimestampTooOld>()(
  "TimestampTooOld",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7400 }])) {}

export class UnknownError extends Schema.TaggedError<UnknownError>()(
  "UnknownError",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 0 }])) {}

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
  jurisdiction: Schema.optional(Schema.Literal("eu", "fedramp")),
  primaryLocationHint: Schema.optional(
    Schema.Literal("wnam", "enam", "weur", "eeur", "apac", "oc"),
  ).pipe(T.JsonName("primary_location_hint")),
}).pipe(
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
    mode: Schema.Literal("auto", "disabled"),
  }).pipe(T.JsonName("read_replication")),
}).pipe(
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
      mode: Schema.Literal("auto", "disabled"),
    }),
  ).pipe(T.JsonName("read_replication")),
}).pipe(
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
  outputFormat: Schema.Literal("polling").pipe(T.JsonName("output_format")),
  currentBookmark: Schema.optional(Schema.String).pipe(
    T.JsonName("current_bookmark"),
  ),
  dumpOptions: Schema.optional(
    Schema.Struct({
      noData: Schema.optional(Schema.Boolean).pipe(T.JsonName("no_data")),
      noSchema: Schema.optional(Schema.Boolean).pipe(T.JsonName("no_schema")),
      tables: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.JsonName("dump_options")),
}).pipe(
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
  atBookmark: Schema.optional(Schema.String).pipe(T.JsonName("at_bookmark")),
  error: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(Schema.String)),
  result: Schema.optional(
    Schema.Struct({
      filename: Schema.optional(Schema.String),
      signedUrl: Schema.optional(Schema.String).pipe(T.JsonName("signed_url")),
    }),
  ),
  status: Schema.optional(Schema.Literal("complete", "error")),
  success: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.Literal("export")),
}) as unknown as Schema.Schema<ExportDatabaseResponse>;

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
}

export const ImportDatabaseRequest = Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
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
  atBookmark: Schema.optional(Schema.String).pipe(T.JsonName("at_bookmark")),
  error: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(Schema.String)),
  result: Schema.optional(
    Schema.Struct({
      finalBookmark: Schema.optional(Schema.String).pipe(
        T.JsonName("final_bookmark"),
      ),
      meta: Schema.optional(
        Schema.Struct({
          changedDb: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("changed_db"),
          ),
          changes: Schema.optional(Schema.Number),
          duration: Schema.optional(Schema.Number),
          lastRowId: Schema.optional(Schema.Number).pipe(
            T.JsonName("last_row_id"),
          ),
          rowsRead: Schema.optional(Schema.Number).pipe(
            T.JsonName("rows_read"),
          ),
          rowsWritten: Schema.optional(Schema.Number).pipe(
            T.JsonName("rows_written"),
          ),
          servedByColo: Schema.optional(Schema.String).pipe(
            T.JsonName("served_by_colo"),
          ),
          servedByPrimary: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("served_by_primary"),
          ),
          servedByRegion: Schema.optional(
            Schema.Literal("WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC"),
          ).pipe(T.JsonName("served_by_region")),
          sizeAfter: Schema.optional(Schema.Number).pipe(
            T.JsonName("size_after"),
          ),
          timings: Schema.optional(
            Schema.Struct({
              sqlDurationMs: Schema.optional(Schema.Number).pipe(
                T.JsonName("sql_duration_ms"),
              ),
            }),
          ),
        }),
      ),
      numQueries: Schema.optional(Schema.Number).pipe(
        T.JsonName("num_queries"),
      ),
    }),
  ),
  status: Schema.optional(Schema.Literal("complete", "error")),
  success: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.Literal("import")),
  uploadUrl: Schema.optional(Schema.String).pipe(T.JsonName("upload_url")),
}) as unknown as Schema.Schema<ImportDatabaseResponse>;

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
  previousBookmark: Schema.optional(Schema.String).pipe(
    T.JsonName("previous_bookmark"),
  ),
}) as unknown as Schema.Schema<RestoreDatabaseTimeTravelResponse>;

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
