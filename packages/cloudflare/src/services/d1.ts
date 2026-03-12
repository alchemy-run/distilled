/**
 * Cloudflare D1 API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service d1
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

export const GetBookmarkDatabaseTimeTravelRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  bookmark?: string | null;
}

export const GetBookmarkDatabaseTimeTravelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bookmark: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetBookmarkDatabaseTimeTravelResponse>;

export type GetBookmarkDatabaseTimeTravelError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | NoHistoryAvailable
  | TimestampTooOld
  | DatabaseNotFound;

export const getBookmarkDatabaseTimeTravel: API.OperationMethod<
  GetBookmarkDatabaseTimeTravelRequest,
  GetBookmarkDatabaseTimeTravelResponse,
  GetBookmarkDatabaseTimeTravelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListDatabasesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/d1/database" }),
) as unknown as Schema.Schema<ListDatabasesRequest>;

export interface ListDatabasesResponse {
  result: {
    createdAt?: string | null;
    name?: string | null;
    uuid?: string | null;
    version?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListDatabasesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      uuid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      version: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        name: "name",
        uuid: "uuid",
        version: "version",
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
) as unknown as Schema.Schema<ListDatabasesResponse>;

export type ListDatabasesError = DefaultErrors;

export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesRequest,
  ListDatabasesResponse,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListDatabasesRequest,
  ) => stream.Stream<
    ListDatabasesResponse,
    ListDatabasesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListDatabasesRequest) => stream.Stream<
    {
      createdAt?: string | null;
      name?: string | null;
      uuid?: string | null;
      version?: string | null;
    },
    ListDatabasesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatabasesRequest,
  output: ListDatabasesResponse,
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
// Database
// =============================================================================

export interface GetDatabaseRequest {
  databaseId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetDatabaseResponse>;

export type GetDatabaseError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | DatabaseNotFound
  | UnknownError;

export const getDatabase: API.OperationMethod<
  GetDatabaseRequest,
  GetDatabaseResponse,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
  primaryLocationHint: Schema.optional(
    Schema.Literals(["wnam", "enam", "weur", "eeur", "apac", "oc"]),
  ),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    jurisdiction: "jurisdiction",
    primaryLocationHint: "primary_location_hint",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database" }),
) as unknown as Schema.Schema<CreateDatabaseRequest>;

export type CreateDatabaseResponse = unknown;

export const CreateDatabaseResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<CreateDatabaseResponse>;

export type CreateDatabaseError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | InvalidProperty;

export const createDatabase: API.OperationMethod<
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  CreateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<UpdateDatabaseResponse>;

export type UpdateDatabaseError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | InternalError
  | DatabaseNotFound;

export const updateDatabase: API.OperationMethod<
  UpdateDatabaseRequest,
  UpdateDatabaseResponse,
  UpdateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PatchDatabaseResponse>;

export type PatchDatabaseError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | InternalError
  | DatabaseNotFound;

export const patchDatabase: API.OperationMethod<
  PatchDatabaseRequest,
  PatchDatabaseResponse,
  PatchDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchDatabaseRequest,
  output: PatchDatabaseResponse,
  errors: [InvalidObjectIdentifier, InternalError, DatabaseNotFound],
}));

export interface DeleteDatabaseRequest {
  databaseId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteDatabaseResponse>;

export type DeleteDatabaseError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | DatabaseNotFound
  | UnknownError;

export const deleteDatabase: API.OperationMethod<
  DeleteDatabaseRequest,
  DeleteDatabaseResponse,
  DeleteDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ExportDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  outputFormat: Schema.Literal("polling"),
  currentBookmark: Schema.optional(Schema.String),
  dumpOptions: Schema.optional(
    Schema.Struct({
      noData: Schema.optional(Schema.Boolean),
      noSchema: Schema.optional(Schema.Boolean),
      tables: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        noData: "no_data",
        noSchema: "no_schema",
        tables: "tables",
      }),
    ),
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
  atBookmark?: string | null;
  /** Only present when status = 'error'. Contains the error message. */
  error?: string | null;
  /** Logs since the last time you polled */
  messages?: string[] | null;
  /** Only present when status = 'complete' */
  result?: { filename?: string | null; signedUrl?: string | null } | null;
  status?: "complete" | "error" | "active" | null;
  success?: boolean | null;
  type?: "export" | null;
}

export const ExportDatabaseResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    atBookmark: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    error: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    messages: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    result: Schema.optional(
      Schema.Union([
        Schema.Struct({
          filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          signedUrl: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({ filename: "filename", signedUrl: "signed_url" }),
        ),
        Schema.Null,
      ]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["complete", "error", "active"]),
        Schema.Null,
      ]),
    ),
    success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    type: Schema.optional(
      Schema.Union([Schema.Literal("export"), Schema.Null]),
    ),
  },
)
  .pipe(
    Schema.encodeKeys({
      atBookmark: "at_bookmark",
      error: "error",
      messages: "messages",
      result: "result",
      status: "status",
      success: "success",
      type: "type",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ExportDatabaseResponse>;

export type ExportDatabaseError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | InvalidRequest
  | DatabaseNotFound;

export const exportDatabase: API.OperationMethod<
  ExportDatabaseRequest,
  ExportDatabaseResponse,
  ExportDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ImportDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  atBookmark?: string | null;
  /** Only present when status = 'error'. Contains the error message that prevented the import from succeeding. */
  error?: string | null;
  /** Derived from the database ID and etag, to use in avoiding repeated uploads. Only returned when for the 'init' action. */
  filename?: string | null;
  /** Logs since the last time you polled */
  messages?: string[] | null;
  /** Only present when status = 'complete' */
  result?: {
    finalBookmark?: string | null;
    meta?: {
      changedDb?: boolean | null;
      changes?: number | null;
      duration?: number | null;
      lastRowId?: number | null;
      rowsRead?: number | null;
      rowsWritten?: number | null;
      servedByColo?: string | null;
      servedByPrimary?: boolean | null;
      servedByRegion?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC" | null;
      sizeAfter?: number | null;
      timings?: { sqlDurationMs?: number | null } | null;
    } | null;
    numQueries?: number | null;
  } | null;
  status?: "complete" | "error" | null;
  success?: boolean | null;
  type?: "import" | null;
  /** The R2 presigned URL to use for uploading. Only returned when for the 'init' action. */
  uploadUrl?: string | null;
}

export const ImportDatabaseResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    atBookmark: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    error: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    messages: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    result: Schema.optional(
      Schema.Union([
        Schema.Struct({
          finalBookmark: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          meta: Schema.optional(
            Schema.Union([
              Schema.Struct({
                changedDb: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                changes: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                duration: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                lastRowId: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                rowsRead: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                rowsWritten: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                servedByColo: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                servedByPrimary: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                servedByRegion: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "WNAM",
                      "ENAM",
                      "WEUR",
                      "EEUR",
                      "APAC",
                      "OC",
                    ]),
                    Schema.Null,
                  ]),
                ),
                sizeAfter: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                timings: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      sqlDurationMs: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({ sqlDurationMs: "sql_duration_ms" }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  changedDb: "changed_db",
                  changes: "changes",
                  duration: "duration",
                  lastRowId: "last_row_id",
                  rowsRead: "rows_read",
                  rowsWritten: "rows_written",
                  servedByColo: "served_by_colo",
                  servedByPrimary: "served_by_primary",
                  servedByRegion: "served_by_region",
                  sizeAfter: "size_after",
                  timings: "timings",
                }),
              ),
              Schema.Null,
            ]),
          ),
          numQueries: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            finalBookmark: "final_bookmark",
            meta: "meta",
            numQueries: "num_queries",
          }),
        ),
        Schema.Null,
      ]),
    ),
    status: Schema.optional(
      Schema.Union([Schema.Literals(["complete", "error"]), Schema.Null]),
    ),
    success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    type: Schema.optional(
      Schema.Union([Schema.Literal("import"), Schema.Null]),
    ),
    uploadUrl: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
)
  .pipe(
    Schema.encodeKeys({
      atBookmark: "at_bookmark",
      error: "error",
      filename: "filename",
      messages: "messages",
      result: "result",
      status: "status",
      success: "success",
      type: "type",
      uploadUrl: "upload_url",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ImportDatabaseResponse>;

export type ImportDatabaseError = DefaultErrors | InvalidObjectIdentifier;

export const importDatabase: API.OperationMethod<
  ImportDatabaseRequest,
  ImportDatabaseResponse,
  ImportDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const QueryDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  sql: Schema.String,
  params: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/d1/database/{databaseId}/query",
  }),
) as unknown as Schema.Schema<QueryDatabaseRequest>;

export interface QueryDatabaseResponse {
  result: {
    meta?: {
      changedDb?: boolean | null;
      changes?: number | null;
      duration?: number | null;
      lastRowId?: number | null;
      rowsRead?: number | null;
      rowsWritten?: number | null;
      servedByColo?: string | null;
      servedByPrimary?: boolean | null;
      servedByRegion?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC" | null;
      sizeAfter?: number | null;
      timings?: { sqlDurationMs?: number | null } | null;
    } | null;
    results?: unknown[] | null;
    success?: boolean | null;
  }[];
}

export const QueryDatabaseResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      meta: Schema.optional(
        Schema.Union([
          Schema.Struct({
            changedDb: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            changes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            duration: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            lastRowId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            rowsRead: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            rowsWritten: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            servedByColo: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            servedByPrimary: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            servedByRegion: Schema.optional(
              Schema.Union([
                Schema.Literals(["WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC"]),
                Schema.Null,
              ]),
            ),
            sizeAfter: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            timings: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  sqlDurationMs: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({ sqlDurationMs: "sql_duration_ms" }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              changedDb: "changed_db",
              changes: "changes",
              duration: "duration",
              lastRowId: "last_row_id",
              rowsRead: "rows_read",
              rowsWritten: "rows_written",
              servedByColo: "served_by_colo",
              servedByPrimary: "served_by_primary",
              servedByRegion: "served_by_region",
              sizeAfter: "size_after",
              timings: "timings",
            }),
          ),
          Schema.Null,
        ]),
      ),
      results: Schema.optional(
        Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
      ),
      success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }),
  ),
}) as unknown as Schema.Schema<QueryDatabaseResponse>;

export type QueryDatabaseError = DefaultErrors;

export const queryDatabase: API.PaginatedOperationMethod<
  QueryDatabaseRequest,
  QueryDatabaseResponse,
  QueryDatabaseError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: QueryDatabaseRequest,
  ) => stream.Stream<
    QueryDatabaseResponse,
    QueryDatabaseError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: QueryDatabaseRequest) => stream.Stream<
    {
      meta?: {
        changedDb?: boolean | null;
        changes?: number | null;
        duration?: number | null;
        lastRowId?: number | null;
        rowsRead?: number | null;
        rowsWritten?: number | null;
        servedByColo?: string | null;
        servedByPrimary?: boolean | null;
        servedByRegion?:
          | "WNAM"
          | "ENAM"
          | "WEUR"
          | "EEUR"
          | "APAC"
          | "OC"
          | null;
        sizeAfter?: number | null;
        timings?: { sqlDurationMs?: number | null } | null;
      } | null;
      results?: unknown[] | null;
      success?: boolean | null;
    },
    QueryDatabaseError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: QueryDatabaseRequest,
  output: QueryDatabaseResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const RawDatabaseRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  databaseId: Schema.String.pipe(T.HttpPath("databaseId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  sql: Schema.String,
  params: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/d1/database/{databaseId}/raw",
  }),
) as unknown as Schema.Schema<RawDatabaseRequest>;

export interface RawDatabaseResponse {
  result: {
    meta?: {
      changedDb?: boolean | null;
      changes?: number | null;
      duration?: number | null;
      lastRowId?: number | null;
      rowsRead?: number | null;
      rowsWritten?: number | null;
      servedByColo?: string | null;
      servedByPrimary?: boolean | null;
      servedByRegion?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC" | null;
      sizeAfter?: number | null;
      timings?: { sqlDurationMs?: number | null } | null;
    } | null;
    results?: {
      columns?: string[] | null;
      rows?: (number | string)[][] | null;
    } | null;
    success?: boolean | null;
  }[];
}

export const RawDatabaseResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      meta: Schema.optional(
        Schema.Union([
          Schema.Struct({
            changedDb: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            changes: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            duration: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            lastRowId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            rowsRead: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            rowsWritten: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            servedByColo: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            servedByPrimary: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            servedByRegion: Schema.optional(
              Schema.Union([
                Schema.Literals(["WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC"]),
                Schema.Null,
              ]),
            ),
            sizeAfter: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            timings: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  sqlDurationMs: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({ sqlDurationMs: "sql_duration_ms" }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              changedDb: "changed_db",
              changes: "changes",
              duration: "duration",
              lastRowId: "last_row_id",
              rowsRead: "rows_read",
              rowsWritten: "rows_written",
              servedByColo: "served_by_colo",
              servedByPrimary: "served_by_primary",
              servedByRegion: "served_by_region",
              sizeAfter: "size_after",
              timings: "timings",
            }),
          ),
          Schema.Null,
        ]),
      ),
      results: Schema.optional(
        Schema.Union([
          Schema.Struct({
            columns: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            rows: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Array(Schema.Union([Schema.Number, Schema.String])),
                ),
                Schema.Null,
              ]),
            ),
          }),
          Schema.Null,
        ]),
      ),
      success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }),
  ),
}) as unknown as Schema.Schema<RawDatabaseResponse>;

export type RawDatabaseError = DefaultErrors;

export const rawDatabase: API.PaginatedOperationMethod<
  RawDatabaseRequest,
  RawDatabaseResponse,
  RawDatabaseError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: RawDatabaseRequest,
  ) => stream.Stream<
    RawDatabaseResponse,
    RawDatabaseError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: RawDatabaseRequest) => stream.Stream<
    {
      meta?: {
        changedDb?: boolean | null;
        changes?: number | null;
        duration?: number | null;
        lastRowId?: number | null;
        rowsRead?: number | null;
        rowsWritten?: number | null;
        servedByColo?: string | null;
        servedByPrimary?: boolean | null;
        servedByRegion?:
          | "WNAM"
          | "ENAM"
          | "WEUR"
          | "EEUR"
          | "APAC"
          | "OC"
          | null;
        sizeAfter?: number | null;
        timings?: { sqlDurationMs?: number | null } | null;
      } | null;
      results?: {
        columns?: string[] | null;
        rows?: (number | string)[][] | null;
      } | null;
      success?: boolean | null;
    },
    RawDatabaseError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: RawDatabaseRequest,
  output: RawDatabaseResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const RestoreDatabaseTimeTravelRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  bookmark?: string | null;
  /** A message describing the result of the restore operation. */
  message?: string | null;
  /** The bookmark representing the state of the database before the restore operation. Can be used to undo the restore if needed. */
  previousBookmark?: string | null;
}

export const RestoreDatabaseTimeTravelResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bookmark: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    message: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    previousBookmark: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        bookmark: "bookmark",
        message: "message",
        previousBookmark: "previous_bookmark",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<RestoreDatabaseTimeTravelResponse>;

export type RestoreDatabaseTimeTravelError =
  | DefaultErrors
  | InvalidObjectIdentifier
  | NoHistoryAvailable
  | DatabaseNotFound
  | InvalidProperty;

export const restoreDatabaseTimeTravel: API.OperationMethod<
  RestoreDatabaseTimeTravelRequest,
  RestoreDatabaseTimeTravelResponse,
  RestoreDatabaseTimeTravelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestoreDatabaseTimeTravelRequest,
  output: RestoreDatabaseTimeTravelResponse,
  errors: [
    InvalidObjectIdentifier,
    NoHistoryAvailable,
    DatabaseNotFound,
    InvalidProperty,
  ],
}));
