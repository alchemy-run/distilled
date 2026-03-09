/**
 * Cloudflare AI API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service ai
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";
import { UploadableSchema } from "../schemas";

// =============================================================================
// Errors
// =============================================================================

export class AccountNotFound extends Schema.TaggedErrorClass<AccountNotFound>()(
  "AccountNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(AccountNotFound, [{ code: 7003 }]);

export class ModelNotFound extends Schema.TaggedErrorClass<ModelNotFound>()(
  "ModelNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ModelNotFound, [{ code: 7003 }, { code: 7000 }]);

export class ModelNotSupported extends Schema.TaggedErrorClass<ModelNotSupported>()(
  "ModelNotSupported",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ModelNotSupported, [{ code: 1000 }]);

export class ModelSchemaNotFound extends Schema.TaggedErrorClass<ModelSchemaNotFound>()(
  "ModelSchemaNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ModelSchemaNotFound, [{ code: 6002 }]);

// =============================================================================
// Ai
// =============================================================================

export interface RunAiRequest {
  modelName: string;
  /** Path param: */
  accountId: string;
  /** Body param: The text that you want to classify */
  text: string;
}

export const RunAiRequest = Schema.Struct({
  modelName: Schema.String.pipe(T.HttpPath("modelName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  text: Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/ai/run/{modelName}" }),
) as unknown as Schema.Schema<RunAiRequest>;

export type RunAiResponse =
  | { label?: string | null; score?: number | null }[]
  | File
  | Blob
  | { audio?: string | null }
  | { data?: number[][] | null; shape?: number[] | null }
  | {
      text: string;
      vtt?: string | null;
      wordCount?: number | null;
      words?:
        | { end?: number | null; start?: number | null; word?: string | null }[]
        | null;
    }
  | {
      box?: {
        xmax?: number | null;
        xmin?: number | null;
        ymax?: number | null;
        ymin?: number | null;
      } | null;
      label?: string | null;
      score?: number | null;
    }[]
  | {
      response: string;
      toolCalls?: { arguments?: unknown | null; name?: string | null }[] | null;
      usage?: {
        completionTokens?: number | null;
        promptTokens?: number | null;
        totalTokens?: number | null;
      } | null;
    }
  | { translatedText?: string | null }
  | { summary?: string | null }
  | { description?: string | null };

export const RunAiResponse = Schema.Union([
  Schema.Array(
    Schema.Struct({
      label: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      score: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }),
  ),
  UploadableSchema.pipe(T.HttpFormDataFile()),
  Schema.Struct({
    audio: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
  Schema.Struct({
    data: Schema.optional(
      Schema.Union([Schema.Array(Schema.Array(Schema.Number)), Schema.Null]),
    ),
    shape: Schema.optional(
      Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
    ),
  }),
  Schema.Struct({
    text: Schema.String,
    vtt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    wordCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    words: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            end: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            start: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            word: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      text: "text",
      vtt: "vtt",
      wordCount: "word_count",
      words: "words",
    }),
  ),
  Schema.Array(
    Schema.Struct({
      box: Schema.optional(
        Schema.Union([
          Schema.Struct({
            xmax: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            xmin: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            ymax: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            ymin: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          }),
          Schema.Null,
        ]),
      ),
      label: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      score: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }),
  ),
  Schema.Struct({
    response: Schema.String,
    toolCalls: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            arguments: Schema.optional(
              Schema.Union([Schema.Unknown, Schema.Null]),
            ),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    usage: Schema.optional(
      Schema.Union([
        Schema.Struct({
          completionTokens: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          promptTokens: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          totalTokens: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            completionTokens: "completion_tokens",
            promptTokens: "prompt_tokens",
            totalTokens: "total_tokens",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      response: "response",
      toolCalls: "tool_calls",
      usage: "usage",
    }),
  ),
  Schema.Struct({
    translatedText: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ translatedText: "translated_text" })),
  Schema.Struct({
    summary: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
  Schema.Struct({
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
]) as unknown as Schema.Schema<RunAiResponse>;

export type RunAiError = DefaultErrors | ModelNotFound;

export const runAi: API.OperationMethod<
  RunAiRequest,
  RunAiResponse,
  RunAiError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunAiRequest,
  output: RunAiResponse,
  errors: [ModelNotFound],
}));

// =============================================================================
// Author
// =============================================================================

export interface ListAuthorsRequest {
  accountId: string;
}

export const ListAuthorsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/authors/search" }),
) as unknown as Schema.Schema<ListAuthorsRequest>;

export type ListAuthorsResponse = unknown[];

export const ListAuthorsResponse = Schema.Array(
  Schema.Unknown,
) as unknown as Schema.Schema<ListAuthorsResponse>;

export type ListAuthorsError = DefaultErrors;

export const listAuthors: API.OperationMethod<
  ListAuthorsRequest,
  ListAuthorsResponse,
  ListAuthorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAuthorsRequest,
  output: ListAuthorsResponse,
  errors: [],
}));

// =============================================================================
// Finetune
// =============================================================================

export interface ListFinetunesRequest {
  accountId: string;
}

export const ListFinetunesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/finetunes" }),
) as unknown as Schema.Schema<ListFinetunesRequest>;

export type ListFinetunesResponse = {
  id: string;
  createdAt: string;
  model: string;
  modifiedAt: string;
  name: string;
  description?: string | null;
}[];

export const ListFinetunesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    model: Schema.String,
    modifiedAt: Schema.String,
    name: Schema.String,
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      model: "model",
      modifiedAt: "modified_at",
      name: "name",
      description: "description",
    }),
  ),
) as unknown as Schema.Schema<ListFinetunesResponse>;

export type ListFinetunesError = DefaultErrors | AccountNotFound;

export const listFinetunes: API.OperationMethod<
  ListFinetunesRequest,
  ListFinetunesResponse,
  ListFinetunesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListFinetunesRequest,
  output: ListFinetunesResponse,
  errors: [AccountNotFound],
}));

export interface CreateFinetuneRequest {
  /** Path param: */
  accountId: string;
  /** Body param: */
  model: string;
  /** Body param: */
  name: string;
  /** Body param: */
  description?: string;
  /** Body param: */
  public?: boolean;
}

export const CreateFinetuneRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  model: Schema.String,
  name: Schema.String,
  description: Schema.optional(Schema.String),
  public: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/ai/finetunes" }),
) as unknown as Schema.Schema<CreateFinetuneRequest>;

export interface CreateFinetuneResponse {
  id: string;
  createdAt: string;
  model: string;
  modifiedAt: string;
  name: string;
  public: boolean;
  description?: string | null;
}

export const CreateFinetuneResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  model: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  public: Schema.Boolean,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdAt: "created_at",
    model: "model",
    modifiedAt: "modified_at",
    name: "name",
    public: "public",
    description: "description",
  }),
) as unknown as Schema.Schema<CreateFinetuneResponse>;

export type CreateFinetuneError =
  | DefaultErrors
  | ModelNotSupported
  | AccountNotFound;

export const createFinetune: API.OperationMethod<
  CreateFinetuneRequest,
  CreateFinetuneResponse,
  CreateFinetuneError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateFinetuneRequest,
  output: CreateFinetuneResponse,
  errors: [ModelNotSupported, AccountNotFound],
}));

// =============================================================================
// FinetuneAsset
// =============================================================================

export interface CreateFinetuneAssetRequest {
  finetuneId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  file?: File | Blob;
  /** Body param: */
  fileName?: string;
}

export const CreateFinetuneAssetRequest = Schema.Struct({
  finetuneId: Schema.String.pipe(T.HttpPath("finetuneId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  file: Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  fileName: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ file: "file", fileName: "file_name" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai/finetunes/{finetuneId}/finetune-assets",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<CreateFinetuneAssetRequest>;

export interface CreateFinetuneAssetResponse {
  success: boolean;
}

export const CreateFinetuneAssetResponse = Schema.Struct({
  success: Schema.Boolean,
}) as unknown as Schema.Schema<CreateFinetuneAssetResponse>;

export type CreateFinetuneAssetError =
  | DefaultErrors
  | ModelNotSupported
  | AccountNotFound;

export const createFinetuneAsset: API.OperationMethod<
  CreateFinetuneAssetRequest,
  CreateFinetuneAssetResponse,
  CreateFinetuneAssetError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateFinetuneAssetRequest,
  output: CreateFinetuneAssetResponse,
  errors: [ModelNotSupported, AccountNotFound],
}));

// =============================================================================
// FinetunePublic
// =============================================================================

export interface ListFinetunePublicsRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Pagination Limit */
  limit?: number;
  /** Query param: Pagination Offset */
  offset?: number;
  /** Query param: Order By Column Name */
  orderBy?: string;
}

export const ListFinetunePublicsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/finetunes/public" }),
) as unknown as Schema.Schema<ListFinetunePublicsRequest>;

export type ListFinetunePublicsResponse = {
  id: string;
  createdAt: string;
  model: string;
  modifiedAt: string;
  name: string;
  public: boolean;
  description?: string | null;
}[];

export const ListFinetunePublicsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    model: Schema.String,
    modifiedAt: Schema.String,
    name: Schema.String,
    public: Schema.Boolean,
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      model: "model",
      modifiedAt: "modified_at",
      name: "name",
      public: "public",
      description: "description",
    }),
  ),
) as unknown as Schema.Schema<ListFinetunePublicsResponse>;

export type ListFinetunePublicsError = DefaultErrors;

export const listFinetunePublics: API.OperationMethod<
  ListFinetunePublicsRequest,
  ListFinetunePublicsResponse,
  ListFinetunePublicsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListFinetunePublicsRequest,
  output: ListFinetunePublicsResponse,
  errors: [],
}));

// =============================================================================
// Model
// =============================================================================

export interface ListModelsRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Filter by Author */
  author?: string;
  /** Query param: Filter to hide experimental models */
  hideExperimental?: boolean;
  /** Query param: Search */
  search?: string;
  /** Query param: Filter by Source Id */
  source?: number;
  /** Query param: Filter by Task Name */
  task?: string;
}

export const ListModelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  author: Schema.optional(Schema.String).pipe(T.HttpQuery("author")),
  hideExperimental: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("hide_experimental"),
  ),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  source: Schema.optional(Schema.Number).pipe(T.HttpQuery("source")),
  task: Schema.optional(Schema.String).pipe(T.HttpQuery("task")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/models/search" }),
) as unknown as Schema.Schema<ListModelsRequest>;

export type ListModelsResponse = unknown[];

export const ListModelsResponse = Schema.Array(
  Schema.Unknown,
) as unknown as Schema.Schema<ListModelsResponse>;

export type ListModelsError = DefaultErrors;

export const listModels: API.OperationMethod<
  ListModelsRequest,
  ListModelsResponse,
  ListModelsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListModelsRequest,
  output: ListModelsResponse,
  errors: [],
}));

// =============================================================================
// ModelSchema
// =============================================================================

export interface GetModelSchemaRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Model Name */
  model: string;
}

export const GetModelSchemaRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  model: Schema.String.pipe(T.HttpQuery("model")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/models/schema" }),
) as unknown as Schema.Schema<GetModelSchemaRequest>;

export type GetModelSchemaResponse = unknown;

export const GetModelSchemaResponse =
  Schema.Unknown as unknown as Schema.Schema<GetModelSchemaResponse>;

export type GetModelSchemaError =
  | DefaultErrors
  | ModelNotSupported
  | ModelSchemaNotFound
  | AccountNotFound;

export const getModelSchema: API.OperationMethod<
  GetModelSchemaRequest,
  GetModelSchemaResponse,
  GetModelSchemaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetModelSchemaRequest,
  output: GetModelSchemaResponse,
  errors: [ModelNotSupported, ModelSchemaNotFound, AccountNotFound],
}));

// =============================================================================
// Task
// =============================================================================

export interface ListTasksRequest {
  accountId: string;
}

export const ListTasksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/tasks/search" }),
) as unknown as Schema.Schema<ListTasksRequest>;

export type ListTasksResponse = unknown[];

export const ListTasksResponse = Schema.Array(
  Schema.Unknown,
) as unknown as Schema.Schema<ListTasksResponse>;

export type ListTasksError = DefaultErrors;

export const listTasks: API.OperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTasksRequest,
  output: ListTasksResponse,
  errors: [],
}));

// =============================================================================
// ToMarkdown
// =============================================================================

export interface SupportedToMarkdownRequest {
  accountId: string;
}

export const SupportedToMarkdownRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai/tomarkdown/supported",
  }),
) as unknown as Schema.Schema<SupportedToMarkdownRequest>;

export type SupportedToMarkdownResponse = {
  extension: string;
  mimeType: string;
}[];

export const SupportedToMarkdownResponse = Schema.Array(
  Schema.Struct({
    extension: Schema.String,
    mimeType: Schema.String,
  }),
) as unknown as Schema.Schema<SupportedToMarkdownResponse>;

export type SupportedToMarkdownError = DefaultErrors;

export const supportedToMarkdown: API.OperationMethod<
  SupportedToMarkdownRequest,
  SupportedToMarkdownResponse,
  SupportedToMarkdownError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SupportedToMarkdownRequest,
  output: SupportedToMarkdownResponse,
  errors: [],
}));

export interface TransformToMarkdownRequest {
  /** Path param: */
  accountId: string;
}

export const TransformToMarkdownRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/ai/tomarkdown" }),
) as unknown as Schema.Schema<TransformToMarkdownRequest>;

export type TransformToMarkdownResponse = {
  data: string;
  format: string;
  mimeType: string;
  name: string;
  tokens: string;
}[];

export const TransformToMarkdownResponse = Schema.Array(
  Schema.Struct({
    data: Schema.String,
    format: Schema.String,
    mimeType: Schema.String,
    name: Schema.String,
    tokens: Schema.String,
  }),
) as unknown as Schema.Schema<TransformToMarkdownResponse>;

export type TransformToMarkdownError = DefaultErrors;

export const transformToMarkdown: API.OperationMethod<
  TransformToMarkdownRequest,
  TransformToMarkdownResponse,
  TransformToMarkdownError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TransformToMarkdownRequest,
  output: TransformToMarkdownResponse,
  errors: [],
}));
