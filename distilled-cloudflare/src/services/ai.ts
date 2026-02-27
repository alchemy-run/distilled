/**
 * Cloudflare AI API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service ai
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
import { UploadableSchema } from "../schemas.ts";

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
  | { label?: string; score?: number }[]
  | File
  | Blob
  | { audio?: string }
  | { data?: number[][]; shape?: number[] }
  | {
      text: string;
      vtt?: string;
      wordCount?: number;
      words?: { end?: number; start?: number; word?: string }[];
    }
  | {
      box?: { xmax?: number; xmin?: number; ymax?: number; ymin?: number };
      label?: string;
      score?: number;
    }[]
  | {
      response: string;
      toolCalls?: { arguments?: unknown; name?: string }[];
      usage?: {
        completionTokens?: number;
        promptTokens?: number;
        totalTokens?: number;
      };
    }
  | { translatedText?: string }
  | { summary?: string }
  | { description?: string };

export const RunAiResponse = Schema.Union([
  Schema.Array(
    Schema.Struct({
      label: Schema.optional(Schema.String),
      score: Schema.optional(Schema.Number),
    }),
  ),
  UploadableSchema.pipe(T.HttpFormDataFile()),
  Schema.Struct({
    audio: Schema.optional(Schema.String),
  }),
  Schema.Struct({
    data: Schema.optional(Schema.Array(Schema.Array(Schema.Number))),
    shape: Schema.optional(Schema.Array(Schema.Number)),
  }),
  Schema.Struct({
    text: Schema.String,
    vtt: Schema.optional(Schema.String),
    wordCount: Schema.optional(Schema.Number),
    words: Schema.optional(
      Schema.Array(
        Schema.Struct({
          end: Schema.optional(Schema.Number),
          start: Schema.optional(Schema.Number),
          word: Schema.optional(Schema.String),
        }),
      ),
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
        Schema.Struct({
          xmax: Schema.optional(Schema.Number),
          xmin: Schema.optional(Schema.Number),
          ymax: Schema.optional(Schema.Number),
          ymin: Schema.optional(Schema.Number),
        }),
      ),
      label: Schema.optional(Schema.String),
      score: Schema.optional(Schema.Number),
    }),
  ),
  Schema.Struct({
    response: Schema.String,
    toolCalls: Schema.optional(
      Schema.Array(
        Schema.Struct({
          arguments: Schema.optional(Schema.Unknown),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    usage: Schema.optional(
      Schema.Struct({
        completionTokens: Schema.optional(Schema.Number),
        promptTokens: Schema.optional(Schema.Number),
        totalTokens: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          completionTokens: "completion_tokens",
          promptTokens: "prompt_tokens",
          totalTokens: "total_tokens",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      response: "response",
      toolCalls: "tool_calls",
      usage: "usage",
    }),
  ),
  Schema.Struct({
    translatedText: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ translatedText: "translated_text" })),
  Schema.Struct({
    summary: Schema.optional(Schema.String),
  }),
  Schema.Struct({
    description: Schema.optional(Schema.String),
  }),
]) as unknown as Schema.Schema<RunAiResponse>;

export type RunAiError = CommonErrors | ModelNotFound;

export const runAi: API.OperationMethod<
  RunAiRequest,
  RunAiResponse,
  RunAiError,
  ApiToken | HttpClient.HttpClient
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

export type ListAuthorsError = CommonErrors;

export const listAuthors: API.OperationMethod<
  ListAuthorsRequest,
  ListAuthorsResponse,
  ListAuthorsError,
  ApiToken | HttpClient.HttpClient
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
  description?: string;
}[];

export const ListFinetunesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    model: Schema.String,
    modifiedAt: Schema.String,
    name: Schema.String,
    description: Schema.optional(Schema.String),
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

export type ListFinetunesError = CommonErrors | AccountNotFound;

export const listFinetunes: API.OperationMethod<
  ListFinetunesRequest,
  ListFinetunesResponse,
  ListFinetunesError,
  ApiToken | HttpClient.HttpClient
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
  description?: string;
}

export const CreateFinetuneResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  model: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  public: Schema.Boolean,
  description: Schema.optional(Schema.String),
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
  | CommonErrors
  | ModelNotSupported
  | AccountNotFound;

export const createFinetune: API.OperationMethod<
  CreateFinetuneRequest,
  CreateFinetuneResponse,
  CreateFinetuneError,
  ApiToken | HttpClient.HttpClient
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
  | CommonErrors
  | ModelNotSupported
  | AccountNotFound;

export const createFinetuneAsset: API.OperationMethod<
  CreateFinetuneAssetRequest,
  CreateFinetuneAssetResponse,
  CreateFinetuneAssetError,
  ApiToken | HttpClient.HttpClient
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
  description?: string;
}[];

export const ListFinetunePublicsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    model: Schema.String,
    modifiedAt: Schema.String,
    name: Schema.String,
    public: Schema.Boolean,
    description: Schema.optional(Schema.String),
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

export type ListFinetunePublicsError = CommonErrors;

export const listFinetunePublics: API.OperationMethod<
  ListFinetunePublicsRequest,
  ListFinetunePublicsResponse,
  ListFinetunePublicsError,
  ApiToken | HttpClient.HttpClient
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

export type ListModelsError = CommonErrors;

export const listModels: API.OperationMethod<
  ListModelsRequest,
  ListModelsResponse,
  ListModelsError,
  ApiToken | HttpClient.HttpClient
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
  | CommonErrors
  | ModelNotSupported
  | ModelSchemaNotFound
  | AccountNotFound;

export const getModelSchema: API.OperationMethod<
  GetModelSchemaRequest,
  GetModelSchemaResponse,
  GetModelSchemaError,
  ApiToken | HttpClient.HttpClient
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

export type ListTasksError = CommonErrors;

export const listTasks: API.OperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  ApiToken | HttpClient.HttpClient
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

export type SupportedToMarkdownError = CommonErrors;

export const supportedToMarkdown: API.OperationMethod<
  SupportedToMarkdownRequest,
  SupportedToMarkdownResponse,
  SupportedToMarkdownError,
  ApiToken | HttpClient.HttpClient
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
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai/tomarkdown" }),
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

export type TransformToMarkdownError = CommonErrors;

export const transformToMarkdown: API.OperationMethod<
  TransformToMarkdownRequest,
  TransformToMarkdownResponse,
  TransformToMarkdownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TransformToMarkdownRequest,
  output: TransformToMarkdownResponse,
  errors: [],
}));
