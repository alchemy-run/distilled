/**
 * Cloudflare AISEARCH API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service aisearch
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

export class InvalidRoute extends Schema.TaggedErrorClass<InvalidRoute>()(
  "InvalidRoute",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoute, [{ code: 7003 }]);

export class NotFound extends Schema.TaggedErrorClass<NotFound>()("NotFound", {
  code: Schema.Number,
  message: Schema.String,
}) {}
T.applyErrorMatchers(NotFound, [{ code: 7002 }]);

export class SyncInCooldown extends Schema.TaggedErrorClass<SyncInCooldown>()(
  "SyncInCooldown",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(SyncInCooldown, [{ code: 7020 }]);

export class UnableToConnect extends Schema.TaggedErrorClass<UnableToConnect>()(
  "UnableToConnect",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(UnableToConnect, [{ code: 7017 }]);

export class ValidationError extends Schema.TaggedErrorClass<ValidationError>()(
  "ValidationError",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ValidationError, [{ code: 7001 }]);

// =============================================================================
// Instance
// =============================================================================

export interface ListInstancesRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Search by id */
  search?: string;
}

export const ListInstancesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai-search/instances" }),
) as unknown as Schema.Schema<ListInstancesRequest>;

export type ListInstancesResponse = {
  id: string;
  accountId?: string;
  accountTag?: string;
  createdAt: string;
  internalId?: string;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string;
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  cache?: boolean;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean;
  chunkOverlap?: number;
  chunkSize?: number;
  createdBy?: string;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  enable?: boolean;
  engineVersion?: number;
  hybridSearchEnabled?: boolean;
  lastActivity?: string | null;
  maxNumResults?: number;
  metadata?: {
    createdFromAisearchWizard?: boolean;
    workerDomain?: string;
  } | null;
  modifiedBy?: string;
  paused?: boolean;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  } | null;
  reranking?: boolean;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  rewriteQuery?: boolean;
  scoreThreshold?: number;
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  } | null;
  status?: string;
  summarization?: boolean;
  summarizationModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}[];

export const ListInstancesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
    accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    internalId: Schema.optional(Schema.String).pipe(T.JsonName("internal_id")),
    modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
    source: Schema.String,
    tokenId: Schema.String.pipe(T.JsonName("token_id")),
    type: Schema.Literals(["r2", "web-crawler"]),
    vectorizeName: Schema.String.pipe(T.JsonName("vectorize_name")),
    aiGatewayId: Schema.optional(Schema.String).pipe(
      T.JsonName("ai_gateway_id"),
    ),
    aiSearchModel: Schema.optional(
      Schema.Literals([
        "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        "@cf/meta/llama-3.1-8b-instruct-fast",
        "@cf/meta/llama-3.1-8b-instruct-fp8",
        "@cf/meta/llama-4-scout-17b-16e-instruct",
        "@cf/qwen/qwen3-30b-a3b-fp8",
        "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
        "@cf/moonshotai/kimi-k2-instruct",
        "anthropic/claude-3-7-sonnet",
        "anthropic/claude-sonnet-4",
        "anthropic/claude-opus-4",
        "anthropic/claude-3-5-haiku",
        "cerebras/qwen-3-235b-a22b-instruct",
        "cerebras/qwen-3-235b-a22b-thinking",
        "cerebras/llama-3.3-70b",
        "cerebras/llama-4-maverick-17b-128e-instruct",
        "cerebras/llama-4-scout-17b-16e-instruct",
        "cerebras/gpt-oss-120b",
        "google-ai-studio/gemini-2.5-flash",
        "google-ai-studio/gemini-2.5-pro",
        "grok/grok-4",
        "groq/llama-3.3-70b-versatile",
        "groq/llama-3.1-8b-instant",
        "openai/gpt-5",
        "openai/gpt-5-mini",
        "openai/gpt-5-nano",
        "",
      ]),
    ).pipe(T.JsonName("ai_search_model")),
    cache: Schema.optional(Schema.Boolean),
    cacheThreshold: Schema.optional(
      Schema.Union([
        Schema.Literal("super_strict_match"),
        Schema.Literal("close_enough"),
        Schema.Literal("flexible_friend"),
        Schema.Literal("anything_goes"),
        Schema.Null,
      ]),
    ).pipe(T.JsonName("cache_threshold")),
    chunk: Schema.optional(Schema.Boolean),
    chunkOverlap: Schema.optional(Schema.Number).pipe(
      T.JsonName("chunk_overlap"),
    ),
    chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
    createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
    embeddingModel: Schema.optional(
      Schema.Literals([
        "@cf/baai/bge-m3",
        "@cf/baai/bge-large-en-v1.5",
        "@cf/google/embeddinggemma-300m",
        "@cf/qwen/qwen3-embedding-0.6b",
        "google-ai-studio/gemini-embedding-001",
        "openai/text-embedding-3-small",
        "openai/text-embedding-3-large",
        "",
      ]),
    ).pipe(T.JsonName("embedding_model")),
    enable: Schema.optional(Schema.Boolean),
    engineVersion: Schema.optional(Schema.Number).pipe(
      T.JsonName("engine_version"),
    ),
    hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
      T.JsonName("hybrid_search_enabled"),
    ),
    lastActivity: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ).pipe(T.JsonName("last_activity")),
    maxNumResults: Schema.optional(Schema.Number).pipe(
      T.JsonName("max_num_results"),
    ),
    metadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("created_from_aisearch_wizard"),
          ),
          workerDomain: Schema.optional(Schema.String).pipe(
            T.JsonName("worker_domain"),
          ),
        }),
        Schema.Null,
      ]),
    ),
    modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
    paused: Schema.optional(Schema.Boolean),
    publicEndpointId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ).pipe(T.JsonName("public_endpoint_id")),
    publicEndpointParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
            T.JsonName("authorized_hosts"),
          ),
          chatCompletionsEndpoint: Schema.optional(
            Schema.Struct({
              disabled: Schema.optional(Schema.Boolean),
            }),
          ).pipe(T.JsonName("chat_completions_endpoint")),
          enabled: Schema.optional(Schema.Boolean),
          mcp: Schema.optional(
            Schema.Struct({
              disabled: Schema.optional(Schema.Boolean),
            }),
          ),
          rateLimit: Schema.optional(
            Schema.Struct({
              periodMs: Schema.optional(Schema.Number).pipe(
                T.JsonName("period_ms"),
              ),
              requests: Schema.optional(Schema.Number),
              technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
            }),
          ).pipe(T.JsonName("rate_limit")),
          searchEndpoint: Schema.optional(
            Schema.Struct({
              disabled: Schema.optional(Schema.Boolean),
            }),
          ).pipe(T.JsonName("search_endpoint")),
        }),
        Schema.Null,
      ]),
    ).pipe(T.JsonName("public_endpoint_params")),
    reranking: Schema.optional(Schema.Boolean),
    rerankingModel: Schema.optional(
      Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
    ).pipe(T.JsonName("reranking_model")),
    rewriteModel: Schema.optional(
      Schema.Literals([
        "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        "@cf/meta/llama-3.1-8b-instruct-fast",
        "@cf/meta/llama-3.1-8b-instruct-fp8",
        "@cf/meta/llama-4-scout-17b-16e-instruct",
        "@cf/qwen/qwen3-30b-a3b-fp8",
        "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
        "@cf/moonshotai/kimi-k2-instruct",
        "anthropic/claude-3-7-sonnet",
        "anthropic/claude-sonnet-4",
        "anthropic/claude-opus-4",
        "anthropic/claude-3-5-haiku",
        "cerebras/qwen-3-235b-a22b-instruct",
        "cerebras/qwen-3-235b-a22b-thinking",
        "cerebras/llama-3.3-70b",
        "cerebras/llama-4-maverick-17b-128e-instruct",
        "cerebras/llama-4-scout-17b-16e-instruct",
        "cerebras/gpt-oss-120b",
        "google-ai-studio/gemini-2.5-flash",
        "google-ai-studio/gemini-2.5-pro",
        "grok/grok-4",
        "groq/llama-3.3-70b-versatile",
        "groq/llama-3.1-8b-instant",
        "openai/gpt-5",
        "openai/gpt-5-mini",
        "openai/gpt-5-nano",
        "",
      ]),
    ).pipe(T.JsonName("rewrite_model")),
    rewriteQuery: Schema.optional(Schema.Boolean).pipe(
      T.JsonName("rewrite_query"),
    ),
    scoreThreshold: Schema.optional(Schema.Number).pipe(
      T.JsonName("score_threshold"),
    ),
    sourceParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
            T.JsonName("exclude_items"),
          ),
          includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
            T.JsonName("include_items"),
          ),
          prefix: Schema.optional(Schema.String),
          r2Jurisdiction: Schema.optional(Schema.String).pipe(
            T.JsonName("r2_jurisdiction"),
          ),
          webCrawler: Schema.optional(
            Schema.Struct({
              parseOptions: Schema.optional(
                Schema.Struct({
                  includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                    T.JsonName("include_headers"),
                  ),
                  includeImages: Schema.optional(Schema.Boolean).pipe(
                    T.JsonName("include_images"),
                  ),
                  useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                    T.JsonName("use_browser_rendering"),
                  ),
                }),
              ).pipe(T.JsonName("parse_options")),
              parseType: Schema.optional(
                Schema.Literals(["sitemap", "feed-rss"]),
              ).pipe(T.JsonName("parse_type")),
              storeOptions: Schema.optional(
                Schema.Struct({
                  storageId: Schema.String.pipe(T.JsonName("storage_id")),
                  r2Jurisdiction: Schema.optional(Schema.String).pipe(
                    T.JsonName("r2_jurisdiction"),
                  ),
                  storageType: Schema.optional(Schema.Literal("r2")).pipe(
                    T.JsonName("storage_type"),
                  ),
                }),
              ).pipe(T.JsonName("store_options")),
            }),
          ).pipe(T.JsonName("web_crawler")),
        }),
        Schema.Null,
      ]),
    ).pipe(T.JsonName("source_params")),
    status: Schema.optional(Schema.String),
    summarization: Schema.optional(Schema.Boolean),
    summarizationModel: Schema.optional(
      Schema.Literals([
        "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        "@cf/meta/llama-3.1-8b-instruct-fast",
        "@cf/meta/llama-3.1-8b-instruct-fp8",
        "@cf/meta/llama-4-scout-17b-16e-instruct",
        "@cf/qwen/qwen3-30b-a3b-fp8",
        "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
        "@cf/moonshotai/kimi-k2-instruct",
        "anthropic/claude-3-7-sonnet",
        "anthropic/claude-sonnet-4",
        "anthropic/claude-opus-4",
        "anthropic/claude-3-5-haiku",
        "cerebras/qwen-3-235b-a22b-instruct",
        "cerebras/qwen-3-235b-a22b-thinking",
        "cerebras/llama-3.3-70b",
        "cerebras/llama-4-maverick-17b-128e-instruct",
        "cerebras/llama-4-scout-17b-16e-instruct",
        "cerebras/gpt-oss-120b",
        "google-ai-studio/gemini-2.5-flash",
        "google-ai-studio/gemini-2.5-pro",
        "grok/grok-4",
        "groq/llama-3.3-70b-versatile",
        "groq/llama-3.1-8b-instant",
        "openai/gpt-5",
        "openai/gpt-5-mini",
        "openai/gpt-5-nano",
        "",
      ]),
    ).pipe(T.JsonName("summarization_model")),
    systemPromptAiSearch: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ).pipe(T.JsonName("system_prompt_ai_search")),
    systemPromptIndexSummarization: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ).pipe(T.JsonName("system_prompt_index_summarization")),
    systemPromptRewriteQuery: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ).pipe(T.JsonName("system_prompt_rewrite_query")),
    vectorizeActiveNamespace: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ).pipe(T.JsonName("vectorize_active_namespace")),
  }),
) as unknown as Schema.Schema<ListInstancesResponse>;

export const listInstances: (
  input: ListInstancesRequest,
) => Effect.Effect<
  ListInstancesResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [InvalidRoute],
}));

export interface CreateInstanceRequest {
  /** Path param: */
  accountId: string;
  /** Body param: Use your AI Search ID. */
  id: string;
  /** Body param: */
  source: string;
  /** Body param: */
  tokenId: string;
  /** Body param: */
  type: "r2" | "web-crawler";
  /** Body param: */
  aiGatewayId?: string;
  /** Body param: */
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  /** Body param: */
  chunk?: boolean;
  /** Body param: */
  chunkOverlap?: number;
  /** Body param: */
  chunkSize?: number;
  /** Body param: */
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  /** Body param: */
  hybridSearchEnabled?: boolean;
  /** Body param: */
  maxNumResults?: number;
  /** Body param: */
  metadata?: { createdFromAisearchWizard?: boolean; workerDomain?: string };
  /** Body param: */
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  };
  /** Body param: */
  reranking?: boolean;
  /** Body param: */
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  /** Body param: */
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  /** Body param: */
  rewriteQuery?: boolean;
  /** Body param: */
  scoreThreshold?: number;
  /** Body param: */
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  };
}

export const CreateInstanceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String,
  source: Schema.String,
  tokenId: Schema.String.pipe(T.JsonName("token_id")),
  type: Schema.Literals(["r2", "web-crawler"]),
  aiGatewayId: Schema.optional(Schema.String).pipe(T.JsonName("ai_gateway_id")),
  aiSearchModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("ai_search_model")),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number).pipe(
    T.JsonName("chunk_overlap"),
  ),
  chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
  embeddingModel: Schema.optional(
    Schema.Literals([
      "@cf/baai/bge-m3",
      "@cf/baai/bge-large-en-v1.5",
      "@cf/google/embeddinggemma-300m",
      "@cf/qwen/qwen3-embedding-0.6b",
      "google-ai-studio/gemini-embedding-001",
      "openai/text-embedding-3-small",
      "openai/text-embedding-3-large",
      "",
    ]),
  ).pipe(T.JsonName("embedding_model")),
  hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("hybrid_search_enabled"),
  ),
  maxNumResults: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_num_results"),
  ),
  metadata: Schema.optional(
    Schema.Struct({
      createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("created_from_aisearch_wizard"),
      ),
      workerDomain: Schema.optional(Schema.String).pipe(
        T.JsonName("worker_domain"),
      ),
    }),
  ),
  publicEndpointParams: Schema.optional(
    Schema.Struct({
      authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
        T.JsonName("authorized_hosts"),
      ),
      chatCompletionsEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ).pipe(T.JsonName("chat_completions_endpoint")),
      enabled: Schema.optional(Schema.Boolean),
      mcp: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
      rateLimit: Schema.optional(
        Schema.Struct({
          periodMs: Schema.optional(Schema.Number).pipe(
            T.JsonName("period_ms"),
          ),
          requests: Schema.optional(Schema.Number),
          technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
        }),
      ).pipe(T.JsonName("rate_limit")),
      searchEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ).pipe(T.JsonName("search_endpoint")),
    }),
  ).pipe(T.JsonName("public_endpoint_params")),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ).pipe(T.JsonName("reranking_model")),
  rewriteModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("rewrite_model")),
  rewriteQuery: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("rewrite_query"),
  ),
  scoreThreshold: Schema.optional(Schema.Number).pipe(
    T.JsonName("score_threshold"),
  ),
  sourceParams: Schema.optional(
    Schema.Struct({
      excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
        T.JsonName("exclude_items"),
      ),
      includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
        T.JsonName("include_items"),
      ),
      prefix: Schema.optional(Schema.String),
      r2Jurisdiction: Schema.optional(Schema.String).pipe(
        T.JsonName("r2_jurisdiction"),
      ),
      webCrawler: Schema.optional(
        Schema.Struct({
          parseOptions: Schema.optional(
            Schema.Struct({
              includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                T.JsonName("include_headers"),
              ),
              includeImages: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("include_images"),
              ),
              useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("use_browser_rendering"),
              ),
            }),
          ).pipe(T.JsonName("parse_options")),
          parseType: Schema.optional(
            Schema.Literals(["sitemap", "feed-rss"]),
          ).pipe(T.JsonName("parse_type")),
          storeOptions: Schema.optional(
            Schema.Struct({
              storageId: Schema.String.pipe(T.JsonName("storage_id")),
              r2Jurisdiction: Schema.optional(Schema.String).pipe(
                T.JsonName("r2_jurisdiction"),
              ),
              storageType: Schema.optional(Schema.Literal("r2")).pipe(
                T.JsonName("storage_type"),
              ),
            }),
          ).pipe(T.JsonName("store_options")),
        }),
      ).pipe(T.JsonName("web_crawler")),
    }),
  ).pipe(T.JsonName("source_params")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-search/instances",
  }),
) as unknown as Schema.Schema<CreateInstanceRequest>;

export interface CreateInstanceResponse {
  /** Use your AI Search ID. */
  id: string;
  accountId?: string;
  accountTag?: string;
  createdAt: string;
  internalId?: string;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string;
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  cache?: boolean;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean;
  chunkOverlap?: number;
  chunkSize?: number;
  createdBy?: string;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  enable?: boolean;
  engineVersion?: number;
  hybridSearchEnabled?: boolean;
  lastActivity?: string | null;
  maxNumResults?: number;
  metadata?: {
    createdFromAisearchWizard?: boolean;
    workerDomain?: string;
  } | null;
  modifiedBy?: string;
  paused?: boolean;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  } | null;
  reranking?: boolean;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  rewriteQuery?: boolean;
  scoreThreshold?: number;
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  } | null;
  status?: string;
  summarization?: boolean;
  summarizationModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const CreateInstanceResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  internalId: Schema.optional(Schema.String).pipe(T.JsonName("internal_id")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  source: Schema.String,
  tokenId: Schema.String.pipe(T.JsonName("token_id")),
  type: Schema.Literals(["r2", "web-crawler"]),
  vectorizeName: Schema.String.pipe(T.JsonName("vectorize_name")),
  aiGatewayId: Schema.optional(Schema.String).pipe(T.JsonName("ai_gateway_id")),
  aiSearchModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("ai_search_model")),
  cache: Schema.optional(Schema.Boolean),
  cacheThreshold: Schema.optional(
    Schema.Union([
      Schema.Literal("super_strict_match"),
      Schema.Literal("close_enough"),
      Schema.Literal("flexible_friend"),
      Schema.Literal("anything_goes"),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("cache_threshold")),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number).pipe(
    T.JsonName("chunk_overlap"),
  ),
  chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  embeddingModel: Schema.optional(
    Schema.Literals([
      "@cf/baai/bge-m3",
      "@cf/baai/bge-large-en-v1.5",
      "@cf/google/embeddinggemma-300m",
      "@cf/qwen/qwen3-embedding-0.6b",
      "google-ai-studio/gemini-embedding-001",
      "openai/text-embedding-3-small",
      "openai/text-embedding-3-large",
      "",
    ]),
  ).pipe(T.JsonName("embedding_model")),
  enable: Schema.optional(Schema.Boolean),
  engineVersion: Schema.optional(Schema.Number).pipe(
    T.JsonName("engine_version"),
  ),
  hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("hybrid_search_enabled"),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("last_activity"),
  ),
  maxNumResults: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_num_results"),
  ),
  metadata: Schema.optional(
    Schema.Union([
      Schema.Struct({
        createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("created_from_aisearch_wizard"),
        ),
        workerDomain: Schema.optional(Schema.String).pipe(
          T.JsonName("worker_domain"),
        ),
      }),
      Schema.Null,
    ]),
  ),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  paused: Schema.optional(Schema.Boolean),
  publicEndpointId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("public_endpoint_id")),
  publicEndpointParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("authorized_hosts"),
        ),
        chatCompletionsEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("chat_completions_endpoint")),
        enabled: Schema.optional(Schema.Boolean),
        mcp: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ),
        rateLimit: Schema.optional(
          Schema.Struct({
            periodMs: Schema.optional(Schema.Number).pipe(
              T.JsonName("period_ms"),
            ),
            requests: Schema.optional(Schema.Number),
            technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
          }),
        ).pipe(T.JsonName("rate_limit")),
        searchEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("search_endpoint")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("public_endpoint_params")),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ).pipe(T.JsonName("reranking_model")),
  rewriteModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("rewrite_model")),
  rewriteQuery: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("rewrite_query"),
  ),
  scoreThreshold: Schema.optional(Schema.Number).pipe(
    T.JsonName("score_threshold"),
  ),
  sourceParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("exclude_items"),
        ),
        includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("include_items"),
        ),
        prefix: Schema.optional(Schema.String),
        r2Jurisdiction: Schema.optional(Schema.String).pipe(
          T.JsonName("r2_jurisdiction"),
        ),
        webCrawler: Schema.optional(
          Schema.Struct({
            parseOptions: Schema.optional(
              Schema.Struct({
                includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                  T.JsonName("include_headers"),
                ),
                includeImages: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("include_images"),
                ),
                useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("use_browser_rendering"),
                ),
              }),
            ).pipe(T.JsonName("parse_options")),
            parseType: Schema.optional(
              Schema.Literals(["sitemap", "feed-rss"]),
            ).pipe(T.JsonName("parse_type")),
            storeOptions: Schema.optional(
              Schema.Struct({
                storageId: Schema.String.pipe(T.JsonName("storage_id")),
                r2Jurisdiction: Schema.optional(Schema.String).pipe(
                  T.JsonName("r2_jurisdiction"),
                ),
                storageType: Schema.optional(Schema.Literal("r2")).pipe(
                  T.JsonName("storage_type"),
                ),
              }),
            ).pipe(T.JsonName("store_options")),
          }),
        ).pipe(T.JsonName("web_crawler")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("source_params")),
  status: Schema.optional(Schema.String),
  summarization: Schema.optional(Schema.Boolean),
  summarizationModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("summarization_model")),
  systemPromptAiSearch: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_ai_search")),
  systemPromptIndexSummarization: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_index_summarization")),
  systemPromptRewriteQuery: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_rewrite_query")),
  vectorizeActiveNamespace: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("vectorize_active_namespace")),
}) as unknown as Schema.Schema<CreateInstanceResponse>;

export const createInstance: (
  input: CreateInstanceRequest,
) => Effect.Effect<
  CreateInstanceResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateInstanceRequest,
  output: CreateInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface UpdateInstanceRequest {
  id: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  aiGatewayId?: string;
  /** Body param: */
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  /** Body param: */
  cache?: boolean;
  /** Body param: */
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes";
  /** Body param: */
  chunk?: boolean;
  /** Body param: */
  chunkOverlap?: number;
  /** Body param: */
  chunkSize?: number;
  /** Body param: */
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  /** Body param: */
  hybridSearchEnabled?: boolean;
  /** Body param: */
  maxNumResults?: number;
  /** Body param: */
  metadata?: { createdFromAisearchWizard?: boolean; workerDomain?: string };
  /** Body param: */
  paused?: boolean;
  /** Body param: */
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  };
  /** Body param: */
  reranking?: boolean;
  /** Body param: */
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  /** Body param: */
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  /** Body param: */
  rewriteQuery?: boolean;
  /** Body param: */
  scoreThreshold?: number;
  /** Body param: */
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  };
  /** Body param: */
  summarization?: boolean;
  /** Body param: */
  summarizationModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  /** Body param: */
  systemPromptAiSearch?: string;
  /** Body param: */
  systemPromptIndexSummarization?: string;
  /** Body param: */
  systemPromptRewriteQuery?: string;
  /** Body param: */
  tokenId?: string;
}

export const UpdateInstanceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  aiGatewayId: Schema.optional(Schema.String).pipe(T.JsonName("ai_gateway_id")),
  aiSearchModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("ai_search_model")),
  cache: Schema.optional(Schema.Boolean),
  cacheThreshold: Schema.optional(
    Schema.Literals([
      "super_strict_match",
      "close_enough",
      "flexible_friend",
      "anything_goes",
    ]),
  ).pipe(T.JsonName("cache_threshold")),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number).pipe(
    T.JsonName("chunk_overlap"),
  ),
  chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
  embeddingModel: Schema.optional(
    Schema.Literals([
      "@cf/baai/bge-m3",
      "@cf/baai/bge-large-en-v1.5",
      "@cf/google/embeddinggemma-300m",
      "@cf/qwen/qwen3-embedding-0.6b",
      "google-ai-studio/gemini-embedding-001",
      "openai/text-embedding-3-small",
      "openai/text-embedding-3-large",
      "",
    ]),
  ).pipe(T.JsonName("embedding_model")),
  hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("hybrid_search_enabled"),
  ),
  maxNumResults: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_num_results"),
  ),
  metadata: Schema.optional(
    Schema.Struct({
      createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("created_from_aisearch_wizard"),
      ),
      workerDomain: Schema.optional(Schema.String).pipe(
        T.JsonName("worker_domain"),
      ),
    }),
  ),
  paused: Schema.optional(Schema.Boolean),
  publicEndpointParams: Schema.optional(
    Schema.Struct({
      authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
        T.JsonName("authorized_hosts"),
      ),
      chatCompletionsEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ).pipe(T.JsonName("chat_completions_endpoint")),
      enabled: Schema.optional(Schema.Boolean),
      mcp: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
      rateLimit: Schema.optional(
        Schema.Struct({
          periodMs: Schema.optional(Schema.Number).pipe(
            T.JsonName("period_ms"),
          ),
          requests: Schema.optional(Schema.Number),
          technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
        }),
      ).pipe(T.JsonName("rate_limit")),
      searchEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ).pipe(T.JsonName("search_endpoint")),
    }),
  ).pipe(T.JsonName("public_endpoint_params")),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ).pipe(T.JsonName("reranking_model")),
  rewriteModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("rewrite_model")),
  rewriteQuery: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("rewrite_query"),
  ),
  scoreThreshold: Schema.optional(Schema.Number).pipe(
    T.JsonName("score_threshold"),
  ),
  sourceParams: Schema.optional(
    Schema.Struct({
      excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
        T.JsonName("exclude_items"),
      ),
      includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
        T.JsonName("include_items"),
      ),
      prefix: Schema.optional(Schema.String),
      r2Jurisdiction: Schema.optional(Schema.String).pipe(
        T.JsonName("r2_jurisdiction"),
      ),
      webCrawler: Schema.optional(
        Schema.Struct({
          parseOptions: Schema.optional(
            Schema.Struct({
              includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                T.JsonName("include_headers"),
              ),
              includeImages: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("include_images"),
              ),
              useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("use_browser_rendering"),
              ),
            }),
          ).pipe(T.JsonName("parse_options")),
          parseType: Schema.optional(
            Schema.Literals(["sitemap", "feed-rss"]),
          ).pipe(T.JsonName("parse_type")),
          storeOptions: Schema.optional(
            Schema.Struct({
              storageId: Schema.String.pipe(T.JsonName("storage_id")),
              r2Jurisdiction: Schema.optional(Schema.String).pipe(
                T.JsonName("r2_jurisdiction"),
              ),
              storageType: Schema.optional(Schema.Literal("r2")).pipe(
                T.JsonName("storage_type"),
              ),
            }),
          ).pipe(T.JsonName("store_options")),
        }),
      ).pipe(T.JsonName("web_crawler")),
    }),
  ).pipe(T.JsonName("source_params")),
  summarization: Schema.optional(Schema.Boolean),
  summarizationModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("summarization_model")),
  systemPromptAiSearch: Schema.optional(Schema.String).pipe(
    T.JsonName("system_prompt_ai_search"),
  ),
  systemPromptIndexSummarization: Schema.optional(Schema.String).pipe(
    T.JsonName("system_prompt_index_summarization"),
  ),
  systemPromptRewriteQuery: Schema.optional(Schema.String).pipe(
    T.JsonName("system_prompt_rewrite_query"),
  ),
  tokenId: Schema.optional(Schema.String).pipe(T.JsonName("token_id")),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/ai-search/instances/{id}",
  }),
) as unknown as Schema.Schema<UpdateInstanceRequest>;

export interface UpdateInstanceResponse {
  /** Use your AI Search ID. */
  id: string;
  accountId?: string;
  accountTag?: string;
  createdAt: string;
  internalId?: string;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string;
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  cache?: boolean;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean;
  chunkOverlap?: number;
  chunkSize?: number;
  createdBy?: string;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  enable?: boolean;
  engineVersion?: number;
  hybridSearchEnabled?: boolean;
  lastActivity?: string | null;
  maxNumResults?: number;
  metadata?: {
    createdFromAisearchWizard?: boolean;
    workerDomain?: string;
  } | null;
  modifiedBy?: string;
  paused?: boolean;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  } | null;
  reranking?: boolean;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  rewriteQuery?: boolean;
  scoreThreshold?: number;
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  } | null;
  status?: string;
  summarization?: boolean;
  summarizationModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const UpdateInstanceResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  internalId: Schema.optional(Schema.String).pipe(T.JsonName("internal_id")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  source: Schema.String,
  tokenId: Schema.String.pipe(T.JsonName("token_id")),
  type: Schema.Literals(["r2", "web-crawler"]),
  vectorizeName: Schema.String.pipe(T.JsonName("vectorize_name")),
  aiGatewayId: Schema.optional(Schema.String).pipe(T.JsonName("ai_gateway_id")),
  aiSearchModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("ai_search_model")),
  cache: Schema.optional(Schema.Boolean),
  cacheThreshold: Schema.optional(
    Schema.Union([
      Schema.Literal("super_strict_match"),
      Schema.Literal("close_enough"),
      Schema.Literal("flexible_friend"),
      Schema.Literal("anything_goes"),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("cache_threshold")),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number).pipe(
    T.JsonName("chunk_overlap"),
  ),
  chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  embeddingModel: Schema.optional(
    Schema.Literals([
      "@cf/baai/bge-m3",
      "@cf/baai/bge-large-en-v1.5",
      "@cf/google/embeddinggemma-300m",
      "@cf/qwen/qwen3-embedding-0.6b",
      "google-ai-studio/gemini-embedding-001",
      "openai/text-embedding-3-small",
      "openai/text-embedding-3-large",
      "",
    ]),
  ).pipe(T.JsonName("embedding_model")),
  enable: Schema.optional(Schema.Boolean),
  engineVersion: Schema.optional(Schema.Number).pipe(
    T.JsonName("engine_version"),
  ),
  hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("hybrid_search_enabled"),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("last_activity"),
  ),
  maxNumResults: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_num_results"),
  ),
  metadata: Schema.optional(
    Schema.Union([
      Schema.Struct({
        createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("created_from_aisearch_wizard"),
        ),
        workerDomain: Schema.optional(Schema.String).pipe(
          T.JsonName("worker_domain"),
        ),
      }),
      Schema.Null,
    ]),
  ),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  paused: Schema.optional(Schema.Boolean),
  publicEndpointId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("public_endpoint_id")),
  publicEndpointParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("authorized_hosts"),
        ),
        chatCompletionsEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("chat_completions_endpoint")),
        enabled: Schema.optional(Schema.Boolean),
        mcp: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ),
        rateLimit: Schema.optional(
          Schema.Struct({
            periodMs: Schema.optional(Schema.Number).pipe(
              T.JsonName("period_ms"),
            ),
            requests: Schema.optional(Schema.Number),
            technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
          }),
        ).pipe(T.JsonName("rate_limit")),
        searchEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("search_endpoint")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("public_endpoint_params")),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ).pipe(T.JsonName("reranking_model")),
  rewriteModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("rewrite_model")),
  rewriteQuery: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("rewrite_query"),
  ),
  scoreThreshold: Schema.optional(Schema.Number).pipe(
    T.JsonName("score_threshold"),
  ),
  sourceParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("exclude_items"),
        ),
        includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("include_items"),
        ),
        prefix: Schema.optional(Schema.String),
        r2Jurisdiction: Schema.optional(Schema.String).pipe(
          T.JsonName("r2_jurisdiction"),
        ),
        webCrawler: Schema.optional(
          Schema.Struct({
            parseOptions: Schema.optional(
              Schema.Struct({
                includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                  T.JsonName("include_headers"),
                ),
                includeImages: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("include_images"),
                ),
                useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("use_browser_rendering"),
                ),
              }),
            ).pipe(T.JsonName("parse_options")),
            parseType: Schema.optional(
              Schema.Literals(["sitemap", "feed-rss"]),
            ).pipe(T.JsonName("parse_type")),
            storeOptions: Schema.optional(
              Schema.Struct({
                storageId: Schema.String.pipe(T.JsonName("storage_id")),
                r2Jurisdiction: Schema.optional(Schema.String).pipe(
                  T.JsonName("r2_jurisdiction"),
                ),
                storageType: Schema.optional(Schema.Literal("r2")).pipe(
                  T.JsonName("storage_type"),
                ),
              }),
            ).pipe(T.JsonName("store_options")),
          }),
        ).pipe(T.JsonName("web_crawler")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("source_params")),
  status: Schema.optional(Schema.String),
  summarization: Schema.optional(Schema.Boolean),
  summarizationModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("summarization_model")),
  systemPromptAiSearch: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_ai_search")),
  systemPromptIndexSummarization: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_index_summarization")),
  systemPromptRewriteQuery: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_rewrite_query")),
  vectorizeActiveNamespace: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("vectorize_active_namespace")),
}) as unknown as Schema.Schema<UpdateInstanceResponse>;

export const updateInstance: (
  input: UpdateInstanceRequest,
) => Effect.Effect<
  UpdateInstanceResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateInstanceRequest,
  output: UpdateInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface DeleteInstanceRequest {
  id: string;
  accountId: string;
}

export const DeleteInstanceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-search/instances/{id}",
  }),
) as unknown as Schema.Schema<DeleteInstanceRequest>;

export interface DeleteInstanceResponse {
  /** Use your AI Search ID. */
  id: string;
  accountId?: string;
  accountTag?: string;
  createdAt: string;
  internalId?: string;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string;
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  cache?: boolean;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean;
  chunkOverlap?: number;
  chunkSize?: number;
  createdBy?: string;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  enable?: boolean;
  engineVersion?: number;
  hybridSearchEnabled?: boolean;
  lastActivity?: string | null;
  maxNumResults?: number;
  metadata?: {
    createdFromAisearchWizard?: boolean;
    workerDomain?: string;
  } | null;
  modifiedBy?: string;
  paused?: boolean;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  } | null;
  reranking?: boolean;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  rewriteQuery?: boolean;
  scoreThreshold?: number;
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  } | null;
  status?: string;
  summarization?: boolean;
  summarizationModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const DeleteInstanceResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  internalId: Schema.optional(Schema.String).pipe(T.JsonName("internal_id")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  source: Schema.String,
  tokenId: Schema.String.pipe(T.JsonName("token_id")),
  type: Schema.Literals(["r2", "web-crawler"]),
  vectorizeName: Schema.String.pipe(T.JsonName("vectorize_name")),
  aiGatewayId: Schema.optional(Schema.String).pipe(T.JsonName("ai_gateway_id")),
  aiSearchModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("ai_search_model")),
  cache: Schema.optional(Schema.Boolean),
  cacheThreshold: Schema.optional(
    Schema.Union([
      Schema.Literal("super_strict_match"),
      Schema.Literal("close_enough"),
      Schema.Literal("flexible_friend"),
      Schema.Literal("anything_goes"),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("cache_threshold")),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number).pipe(
    T.JsonName("chunk_overlap"),
  ),
  chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  embeddingModel: Schema.optional(
    Schema.Literals([
      "@cf/baai/bge-m3",
      "@cf/baai/bge-large-en-v1.5",
      "@cf/google/embeddinggemma-300m",
      "@cf/qwen/qwen3-embedding-0.6b",
      "google-ai-studio/gemini-embedding-001",
      "openai/text-embedding-3-small",
      "openai/text-embedding-3-large",
      "",
    ]),
  ).pipe(T.JsonName("embedding_model")),
  enable: Schema.optional(Schema.Boolean),
  engineVersion: Schema.optional(Schema.Number).pipe(
    T.JsonName("engine_version"),
  ),
  hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("hybrid_search_enabled"),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("last_activity"),
  ),
  maxNumResults: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_num_results"),
  ),
  metadata: Schema.optional(
    Schema.Union([
      Schema.Struct({
        createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("created_from_aisearch_wizard"),
        ),
        workerDomain: Schema.optional(Schema.String).pipe(
          T.JsonName("worker_domain"),
        ),
      }),
      Schema.Null,
    ]),
  ),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  paused: Schema.optional(Schema.Boolean),
  publicEndpointId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("public_endpoint_id")),
  publicEndpointParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("authorized_hosts"),
        ),
        chatCompletionsEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("chat_completions_endpoint")),
        enabled: Schema.optional(Schema.Boolean),
        mcp: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ),
        rateLimit: Schema.optional(
          Schema.Struct({
            periodMs: Schema.optional(Schema.Number).pipe(
              T.JsonName("period_ms"),
            ),
            requests: Schema.optional(Schema.Number),
            technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
          }),
        ).pipe(T.JsonName("rate_limit")),
        searchEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("search_endpoint")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("public_endpoint_params")),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ).pipe(T.JsonName("reranking_model")),
  rewriteModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("rewrite_model")),
  rewriteQuery: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("rewrite_query"),
  ),
  scoreThreshold: Schema.optional(Schema.Number).pipe(
    T.JsonName("score_threshold"),
  ),
  sourceParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("exclude_items"),
        ),
        includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("include_items"),
        ),
        prefix: Schema.optional(Schema.String),
        r2Jurisdiction: Schema.optional(Schema.String).pipe(
          T.JsonName("r2_jurisdiction"),
        ),
        webCrawler: Schema.optional(
          Schema.Struct({
            parseOptions: Schema.optional(
              Schema.Struct({
                includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                  T.JsonName("include_headers"),
                ),
                includeImages: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("include_images"),
                ),
                useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("use_browser_rendering"),
                ),
              }),
            ).pipe(T.JsonName("parse_options")),
            parseType: Schema.optional(
              Schema.Literals(["sitemap", "feed-rss"]),
            ).pipe(T.JsonName("parse_type")),
            storeOptions: Schema.optional(
              Schema.Struct({
                storageId: Schema.String.pipe(T.JsonName("storage_id")),
                r2Jurisdiction: Schema.optional(Schema.String).pipe(
                  T.JsonName("r2_jurisdiction"),
                ),
                storageType: Schema.optional(Schema.Literal("r2")).pipe(
                  T.JsonName("storage_type"),
                ),
              }),
            ).pipe(T.JsonName("store_options")),
          }),
        ).pipe(T.JsonName("web_crawler")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("source_params")),
  status: Schema.optional(Schema.String),
  summarization: Schema.optional(Schema.Boolean),
  summarizationModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("summarization_model")),
  systemPromptAiSearch: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_ai_search")),
  systemPromptIndexSummarization: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_index_summarization")),
  systemPromptRewriteQuery: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_rewrite_query")),
  vectorizeActiveNamespace: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("vectorize_active_namespace")),
}) as unknown as Schema.Schema<DeleteInstanceResponse>;

export const deleteInstance: (
  input: DeleteInstanceRequest,
) => Effect.Effect<
  DeleteInstanceResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteInstanceRequest,
  output: DeleteInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ReadInstanceRequest {
  id: string;
  accountId: string;
}

export const ReadInstanceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}",
  }),
) as unknown as Schema.Schema<ReadInstanceRequest>;

export interface ReadInstanceResponse {
  /** Use your AI Search ID. */
  id: string;
  accountId?: string;
  accountTag?: string;
  createdAt: string;
  internalId?: string;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string;
  aiSearchModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  cache?: boolean;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean;
  chunkOverlap?: number;
  chunkSize?: number;
  createdBy?: string;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | "";
  enable?: boolean;
  engineVersion?: number;
  hybridSearchEnabled?: boolean;
  lastActivity?: string | null;
  maxNumResults?: number;
  metadata?: {
    createdFromAisearchWizard?: boolean;
    workerDomain?: string;
  } | null;
  modifiedBy?: string;
  paused?: boolean;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[];
    chatCompletionsEndpoint?: { disabled?: boolean };
    enabled?: boolean;
    mcp?: { disabled?: boolean };
    rateLimit?: {
      periodMs?: number;
      requests?: number;
      technique?: "fixed" | "sliding";
    };
    searchEndpoint?: { disabled?: boolean };
  } | null;
  reranking?: boolean;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "";
  rewriteModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  rewriteQuery?: boolean;
  scoreThreshold?: number;
  sourceParams?: {
    excludeItems?: string[];
    includeItems?: string[];
    prefix?: string;
    r2Jurisdiction?: string;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown>;
        includeImages?: boolean;
        useBrowserRendering?: boolean;
      };
      parseType?: "sitemap" | "feed-rss";
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string;
        storageType?: "r2";
      };
    };
  } | null;
  status?: string;
  summarization?: boolean;
  summarizationModel?:
    | "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fast"
    | "@cf/meta/llama-3.1-8b-instruct-fp8"
    | "@cf/meta/llama-4-scout-17b-16e-instruct"
    | "@cf/qwen/qwen3-30b-a3b-fp8"
    | "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"
    | "@cf/moonshotai/kimi-k2-instruct"
    | "anthropic/claude-3-7-sonnet"
    | "anthropic/claude-sonnet-4"
    | "anthropic/claude-opus-4"
    | "anthropic/claude-3-5-haiku"
    | "cerebras/qwen-3-235b-a22b-instruct"
    | "cerebras/qwen-3-235b-a22b-thinking"
    | "cerebras/llama-3.3-70b"
    | "cerebras/llama-4-maverick-17b-128e-instruct"
    | "cerebras/llama-4-scout-17b-16e-instruct"
    | "cerebras/gpt-oss-120b"
    | "google-ai-studio/gemini-2.5-flash"
    | "google-ai-studio/gemini-2.5-pro"
    | "grok/grok-4"
    | "groq/llama-3.3-70b-versatile"
    | "groq/llama-3.1-8b-instant"
    | "openai/gpt-5"
    | "openai/gpt-5-mini"
    | "openai/gpt-5-nano"
    | "";
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const ReadInstanceResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  internalId: Schema.optional(Schema.String).pipe(T.JsonName("internal_id")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  source: Schema.String,
  tokenId: Schema.String.pipe(T.JsonName("token_id")),
  type: Schema.Literals(["r2", "web-crawler"]),
  vectorizeName: Schema.String.pipe(T.JsonName("vectorize_name")),
  aiGatewayId: Schema.optional(Schema.String).pipe(T.JsonName("ai_gateway_id")),
  aiSearchModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("ai_search_model")),
  cache: Schema.optional(Schema.Boolean),
  cacheThreshold: Schema.optional(
    Schema.Union([
      Schema.Literal("super_strict_match"),
      Schema.Literal("close_enough"),
      Schema.Literal("flexible_friend"),
      Schema.Literal("anything_goes"),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("cache_threshold")),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number).pipe(
    T.JsonName("chunk_overlap"),
  ),
  chunkSize: Schema.optional(Schema.Number).pipe(T.JsonName("chunk_size")),
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  embeddingModel: Schema.optional(
    Schema.Literals([
      "@cf/baai/bge-m3",
      "@cf/baai/bge-large-en-v1.5",
      "@cf/google/embeddinggemma-300m",
      "@cf/qwen/qwen3-embedding-0.6b",
      "google-ai-studio/gemini-embedding-001",
      "openai/text-embedding-3-small",
      "openai/text-embedding-3-large",
      "",
    ]),
  ).pipe(T.JsonName("embedding_model")),
  enable: Schema.optional(Schema.Boolean),
  engineVersion: Schema.optional(Schema.Number).pipe(
    T.JsonName("engine_version"),
  ),
  hybridSearchEnabled: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("hybrid_search_enabled"),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("last_activity"),
  ),
  maxNumResults: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_num_results"),
  ),
  metadata: Schema.optional(
    Schema.Union([
      Schema.Struct({
        createdFromAisearchWizard: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("created_from_aisearch_wizard"),
        ),
        workerDomain: Schema.optional(Schema.String).pipe(
          T.JsonName("worker_domain"),
        ),
      }),
      Schema.Null,
    ]),
  ),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  paused: Schema.optional(Schema.Boolean),
  publicEndpointId: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("public_endpoint_id")),
  publicEndpointParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorizedHosts: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("authorized_hosts"),
        ),
        chatCompletionsEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("chat_completions_endpoint")),
        enabled: Schema.optional(Schema.Boolean),
        mcp: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ),
        rateLimit: Schema.optional(
          Schema.Struct({
            periodMs: Schema.optional(Schema.Number).pipe(
              T.JsonName("period_ms"),
            ),
            requests: Schema.optional(Schema.Number),
            technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
          }),
        ).pipe(T.JsonName("rate_limit")),
        searchEndpoint: Schema.optional(
          Schema.Struct({
            disabled: Schema.optional(Schema.Boolean),
          }),
        ).pipe(T.JsonName("search_endpoint")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("public_endpoint_params")),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ).pipe(T.JsonName("reranking_model")),
  rewriteModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("rewrite_model")),
  rewriteQuery: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("rewrite_query"),
  ),
  scoreThreshold: Schema.optional(Schema.Number).pipe(
    T.JsonName("score_threshold"),
  ),
  sourceParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        excludeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("exclude_items"),
        ),
        includeItems: Schema.optional(Schema.Array(Schema.String)).pipe(
          T.JsonName("include_items"),
        ),
        prefix: Schema.optional(Schema.String),
        r2Jurisdiction: Schema.optional(Schema.String).pipe(
          T.JsonName("r2_jurisdiction"),
        ),
        webCrawler: Schema.optional(
          Schema.Struct({
            parseOptions: Schema.optional(
              Schema.Struct({
                includeHeaders: Schema.optional(Schema.Struct({})).pipe(
                  T.JsonName("include_headers"),
                ),
                includeImages: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("include_images"),
                ),
                useBrowserRendering: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("use_browser_rendering"),
                ),
              }),
            ).pipe(T.JsonName("parse_options")),
            parseType: Schema.optional(
              Schema.Literals(["sitemap", "feed-rss"]),
            ).pipe(T.JsonName("parse_type")),
            storeOptions: Schema.optional(
              Schema.Struct({
                storageId: Schema.String.pipe(T.JsonName("storage_id")),
                r2Jurisdiction: Schema.optional(Schema.String).pipe(
                  T.JsonName("r2_jurisdiction"),
                ),
                storageType: Schema.optional(Schema.Literal("r2")).pipe(
                  T.JsonName("storage_type"),
                ),
              }),
            ).pipe(T.JsonName("store_options")),
          }),
        ).pipe(T.JsonName("web_crawler")),
      }),
      Schema.Null,
    ]),
  ).pipe(T.JsonName("source_params")),
  status: Schema.optional(Schema.String),
  summarization: Schema.optional(Schema.Boolean),
  summarizationModel: Schema.optional(
    Schema.Literals([
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/meta/llama-3.1-8b-instruct-fast",
      "@cf/meta/llama-3.1-8b-instruct-fp8",
      "@cf/meta/llama-4-scout-17b-16e-instruct",
      "@cf/qwen/qwen3-30b-a3b-fp8",
      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
      "@cf/moonshotai/kimi-k2-instruct",
      "anthropic/claude-3-7-sonnet",
      "anthropic/claude-sonnet-4",
      "anthropic/claude-opus-4",
      "anthropic/claude-3-5-haiku",
      "cerebras/qwen-3-235b-a22b-instruct",
      "cerebras/qwen-3-235b-a22b-thinking",
      "cerebras/llama-3.3-70b",
      "cerebras/llama-4-maverick-17b-128e-instruct",
      "cerebras/llama-4-scout-17b-16e-instruct",
      "cerebras/gpt-oss-120b",
      "google-ai-studio/gemini-2.5-flash",
      "google-ai-studio/gemini-2.5-pro",
      "grok/grok-4",
      "groq/llama-3.3-70b-versatile",
      "groq/llama-3.1-8b-instant",
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "",
    ]),
  ).pipe(T.JsonName("summarization_model")),
  systemPromptAiSearch: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_ai_search")),
  systemPromptIndexSummarization: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_index_summarization")),
  systemPromptRewriteQuery: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("system_prompt_rewrite_query")),
  vectorizeActiveNamespace: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ).pipe(T.JsonName("vectorize_active_namespace")),
}) as unknown as Schema.Schema<ReadInstanceResponse>;

export const readInstance: (
  input: ReadInstanceRequest,
) => Effect.Effect<
  ReadInstanceResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ReadInstanceRequest,
  output: ReadInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface StatsInstanceRequest {
  id: string;
  accountId: string;
}

export const StatsInstanceRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/stats",
  }),
) as unknown as Schema.Schema<StatsInstanceRequest>;

export interface StatsInstanceResponse {
  completed?: number;
  error?: number;
  fileEmbedErrors?: Record<string, unknown>;
  indexSourceErrors?: Record<string, unknown>;
  lastActivity?: string | null;
  queued?: number;
  running?: number;
  skipped?: number;
}

export const StatsInstanceResponse = Schema.Struct({
  completed: Schema.optional(Schema.Number),
  error: Schema.optional(Schema.Number),
  fileEmbedErrors: Schema.optional(Schema.Struct({})).pipe(
    T.JsonName("file_embed_errors"),
  ),
  indexSourceErrors: Schema.optional(Schema.Struct({})).pipe(
    T.JsonName("index_source_errors"),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("last_activity"),
  ),
  queued: Schema.optional(Schema.Number),
  running: Schema.optional(Schema.Number),
  skipped: Schema.optional(Schema.Number),
}) as unknown as Schema.Schema<StatsInstanceResponse>;

export const statsInstance: (
  input: StatsInstanceRequest,
) => Effect.Effect<
  StatsInstanceResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StatsInstanceRequest,
  output: StatsInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

// =============================================================================
// InstanceItem
// =============================================================================

export interface GetInstanceItemRequest {
  id: string;
  itemId: string;
  accountId: string;
}

export const GetInstanceItemRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  itemId: Schema.String.pipe(T.HttpPath("itemId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/items/{itemId}",
  }),
) as unknown as Schema.Schema<GetInstanceItemRequest>;

export interface GetInstanceItemResponse {
  id: string;
  key: string;
  status: "queued" | "running" | "completed" | "error" | "skipped";
  error?: string;
  lastSeenAt?: string;
  nextAction?: string;
}

export const GetInstanceItemResponse = Schema.Struct({
  id: Schema.String,
  key: Schema.String,
  status: Schema.Literals(["queued", "running", "completed", "error", "skipped"]),
  error: Schema.optional(Schema.String),
  lastSeenAt: Schema.optional(Schema.String).pipe(T.JsonName("last_seen_at")),
  nextAction: Schema.optional(Schema.String).pipe(T.JsonName("next_action")),
}) as unknown as Schema.Schema<GetInstanceItemResponse>;

export const getInstanceItem: (
  input: GetInstanceItemRequest,
) => Effect.Effect<
  GetInstanceItemResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInstanceItemRequest,
  output: GetInstanceItemResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ListInstanceItemsRequest {
  id: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  search?: string;
  /** Query param: */
  status?: "queued" | "running" | "completed" | "error" | "skipped";
}

export const ListInstanceItemsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  status: Schema.optional(
    Schema.Literals(["queued", "running", "completed", "error", "skipped"]),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/items",
  }),
) as unknown as Schema.Schema<ListInstanceItemsRequest>;

export type ListInstanceItemsResponse = {
  id: string;
  key: string;
  status: "queued" | "running" | "completed" | "error" | "skipped";
  error?: string;
  lastSeenAt?: string;
  nextAction?: string;
}[];

export const ListInstanceItemsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    key: Schema.String,
    status: Schema.Literals([
      "queued",
      "running",
      "completed",
      "error",
      "skipped",
    ]),
    error: Schema.optional(Schema.String),
    lastSeenAt: Schema.optional(Schema.String).pipe(T.JsonName("last_seen_at")),
    nextAction: Schema.optional(Schema.String).pipe(T.JsonName("next_action")),
  }),
) as unknown as Schema.Schema<ListInstanceItemsResponse>;

export const listInstanceItems: (
  input: ListInstanceItemsRequest,
) => Effect.Effect<
  ListInstanceItemsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInstanceItemsRequest,
  output: ListInstanceItemsResponse,
  errors: [],
}));

// =============================================================================
// InstanceJob
// =============================================================================

export interface GetInstanceJobRequest {
  id: string;
  jobId: string;
  accountId: string;
}

export const GetInstanceJobRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/jobs/{jobId}",
  }),
) as unknown as Schema.Schema<GetInstanceJobRequest>;

export interface GetInstanceJobResponse {
  id: string;
  source: "user" | "schedule";
  endReason?: string;
  endedAt?: string;
  lastSeenAt?: string;
  startedAt?: string;
}

export const GetInstanceJobResponse = Schema.Struct({
  id: Schema.String,
  source: Schema.Literals(["user", "schedule"]),
  endReason: Schema.optional(Schema.String).pipe(T.JsonName("end_reason")),
  endedAt: Schema.optional(Schema.String).pipe(T.JsonName("ended_at")),
  lastSeenAt: Schema.optional(Schema.String).pipe(T.JsonName("last_seen_at")),
  startedAt: Schema.optional(Schema.String).pipe(T.JsonName("started_at")),
}) as unknown as Schema.Schema<GetInstanceJobResponse>;

export const getInstanceJob: (
  input: GetInstanceJobRequest,
) => Effect.Effect<
  GetInstanceJobResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInstanceJobRequest,
  output: GetInstanceJobResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ListInstanceJobsRequest {
  id: string;
  /** Path param: */
  accountId: string;
}

export const ListInstanceJobsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/jobs",
  }),
) as unknown as Schema.Schema<ListInstanceJobsRequest>;

export type ListInstanceJobsResponse = {
  id: string;
  source: "user" | "schedule";
  endReason?: string;
  endedAt?: string;
  lastSeenAt?: string;
  startedAt?: string;
}[];

export const ListInstanceJobsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    source: Schema.Literals(["user", "schedule"]),
    endReason: Schema.optional(Schema.String).pipe(T.JsonName("end_reason")),
    endedAt: Schema.optional(Schema.String).pipe(T.JsonName("ended_at")),
    lastSeenAt: Schema.optional(Schema.String).pipe(T.JsonName("last_seen_at")),
    startedAt: Schema.optional(Schema.String).pipe(T.JsonName("started_at")),
  }),
) as unknown as Schema.Schema<ListInstanceJobsResponse>;

export const listInstanceJobs: (
  input: ListInstanceJobsRequest,
) => Effect.Effect<
  ListInstanceJobsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInstanceJobsRequest,
  output: ListInstanceJobsResponse,
  errors: [],
}));

export interface CreateInstanceJobRequest {
  id: string;
  accountId: string;
}

export const CreateInstanceJobRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-search/instances/{id}/jobs",
  }),
) as unknown as Schema.Schema<CreateInstanceJobRequest>;

export interface CreateInstanceJobResponse {
  id: string;
  source: "user" | "schedule";
  endReason?: string | null;
  endedAt?: string | null;
  lastSeenAt?: string;
  startedAt?: string;
}

export const CreateInstanceJobResponse = Schema.Struct({
  id: Schema.String,
  source: Schema.Literals(["user", "schedule"]),
  endReason: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("end_reason"),
  ),
  endedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("ended_at"),
  ),
  lastSeenAt: Schema.optional(Schema.String).pipe(T.JsonName("last_seen_at")),
  startedAt: Schema.optional(Schema.String).pipe(T.JsonName("started_at")),
}) as unknown as Schema.Schema<CreateInstanceJobResponse>;

export const createInstanceJob: (
  input: CreateInstanceJobRequest,
) => Effect.Effect<
  CreateInstanceJobResponse,
  | CommonErrors
  | ValidationError
  | NotFound
  | InvalidRoute
  | UnableToConnect
  | SyncInCooldown,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateInstanceJobRequest,
  output: CreateInstanceJobResponse,
  errors: [
    ValidationError,
    NotFound,
    InvalidRoute,
    UnableToConnect,
    SyncInCooldown,
  ],
}));

export interface LogsInstanceJobRequest {
  id: string;
  jobId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  page?: number;
  /** Query param: */
  perPage?: number;
}

export const LogsInstanceJobRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/jobs/{jobId}/logs",
  }),
) as unknown as Schema.Schema<LogsInstanceJobRequest>;

export type LogsInstanceJobResponse = {
  id: number;
  createdAt: number;
  message: string;
  messageType: number;
}[];

export const LogsInstanceJobResponse = Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    createdAt: Schema.Number.pipe(T.JsonName("created_at")),
    message: Schema.String,
    messageType: Schema.Number.pipe(T.JsonName("message_type")),
  }),
) as unknown as Schema.Schema<LogsInstanceJobResponse>;

export const logsInstanceJob: (
  input: LogsInstanceJobRequest,
) => Effect.Effect<
  LogsInstanceJobResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LogsInstanceJobRequest,
  output: LogsInstanceJobResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

// =============================================================================
// Token
// =============================================================================

export interface ListTokensRequest {
  /** Path param: */
  accountId: string;
}

export const ListTokensRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai-search/tokens" }),
) as unknown as Schema.Schema<ListTokensRequest>;

export type ListTokensResponse = {
  id: string;
  accountId?: string;
  accountTag?: string;
  cfApiId: string;
  cfApiKey?: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string;
  enabled?: boolean;
  legacy?: boolean;
  modifiedBy?: string;
  syncedAt?: string;
}[];

export const ListTokensResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
    accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
    cfApiId: Schema.String.pipe(T.JsonName("cf_api_id")),
    cfApiKey: Schema.optional(Schema.String).pipe(T.JsonName("cf_api_key")),
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
    name: Schema.String,
    createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
    enabled: Schema.optional(Schema.Boolean),
    legacy: Schema.optional(Schema.Boolean),
    modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
    syncedAt: Schema.optional(Schema.String).pipe(T.JsonName("synced_at")),
  }),
) as unknown as Schema.Schema<ListTokensResponse>;

export const listTokens: (
  input: ListTokensRequest,
) => Effect.Effect<
  ListTokensResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [InvalidRoute],
}));

export interface CreateTokenRequest {
  /** Path param: */
  accountId: string;
  /** Body param: */
  cfApiId: string;
  /** Body param: */
  cfApiKey: string;
  /** Body param: */
  name: string;
  /** Body param: */
  legacy?: boolean;
}

export const CreateTokenRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cfApiId: Schema.String.pipe(T.JsonName("cf_api_id")),
  cfApiKey: Schema.String.pipe(T.JsonName("cf_api_key")),
  name: Schema.String,
  legacy: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/ai-search/tokens" }),
) as unknown as Schema.Schema<CreateTokenRequest>;

export interface CreateTokenResponse {
  id: string;
  accountId?: string;
  accountTag?: string;
  cfApiId: string;
  cfApiKey?: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string;
  enabled?: boolean;
  legacy?: boolean;
  modifiedBy?: string;
  syncedAt?: string;
}

export const CreateTokenResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  cfApiId: Schema.String.pipe(T.JsonName("cf_api_id")),
  cfApiKey: Schema.optional(Schema.String).pipe(T.JsonName("cf_api_key")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  name: Schema.String,
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  enabled: Schema.optional(Schema.Boolean),
  legacy: Schema.optional(Schema.Boolean),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  syncedAt: Schema.optional(Schema.String).pipe(T.JsonName("synced_at")),
}) as unknown as Schema.Schema<CreateTokenResponse>;

export const createToken: (
  input: CreateTokenRequest,
) => Effect.Effect<
  CreateTokenResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface UpdateTokenRequest {
  id: string;
  accountId: string;
}

export const UpdateTokenRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-search/tokens/{id}",
  }),
) as unknown as Schema.Schema<UpdateTokenRequest>;

export interface UpdateTokenResponse {
  id: string;
  accountId: string;
  accountTag: string;
  cfApiId: string;
  cfApiKey: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string;
  enabled?: boolean;
  legacy?: boolean;
  modifiedBy?: string;
  syncedAt?: string;
}

export const UpdateTokenResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String.pipe(T.JsonName("account_id")),
  accountTag: Schema.String.pipe(T.JsonName("account_tag")),
  cfApiId: Schema.String.pipe(T.JsonName("cf_api_id")),
  cfApiKey: Schema.String.pipe(T.JsonName("cf_api_key")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  name: Schema.String,
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  enabled: Schema.optional(Schema.Boolean),
  legacy: Schema.optional(Schema.Boolean),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  syncedAt: Schema.optional(Schema.String).pipe(T.JsonName("synced_at")),
}) as unknown as Schema.Schema<UpdateTokenResponse>;

export const updateToken: (
  input: UpdateTokenRequest,
) => Effect.Effect<
  UpdateTokenResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTokenRequest,
  output: UpdateTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface DeleteTokenRequest {
  id: string;
  accountId: string;
}

export const DeleteTokenRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-search/tokens/{id}",
  }),
) as unknown as Schema.Schema<DeleteTokenRequest>;

export interface DeleteTokenResponse {
  id: string;
  accountId?: string;
  accountTag?: string;
  cfApiId: string;
  cfApiKey?: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string;
  enabled?: boolean;
  legacy?: boolean;
  modifiedBy?: string;
  syncedAt?: string;
}

export const DeleteTokenResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  cfApiId: Schema.String.pipe(T.JsonName("cf_api_id")),
  cfApiKey: Schema.optional(Schema.String).pipe(T.JsonName("cf_api_key")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  name: Schema.String,
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  enabled: Schema.optional(Schema.Boolean),
  legacy: Schema.optional(Schema.Boolean),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  syncedAt: Schema.optional(Schema.String).pipe(T.JsonName("synced_at")),
}) as unknown as Schema.Schema<DeleteTokenResponse>;

export const deleteToken: (
  input: DeleteTokenRequest,
) => Effect.Effect<
  DeleteTokenResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ReadTokenRequest {
  id: string;
  accountId: string;
}

export const ReadTokenRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-search/tokens/{id}",
  }),
) as unknown as Schema.Schema<ReadTokenRequest>;

export interface ReadTokenResponse {
  id: string;
  accountId?: string;
  accountTag?: string;
  cfApiId: string;
  cfApiKey?: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string;
  enabled?: boolean;
  legacy?: boolean;
  modifiedBy?: string;
  syncedAt?: string;
}

export const ReadTokenResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.String).pipe(T.JsonName("account_id")),
  accountTag: Schema.optional(Schema.String).pipe(T.JsonName("account_tag")),
  cfApiId: Schema.String.pipe(T.JsonName("cf_api_id")),
  cfApiKey: Schema.optional(Schema.String).pipe(T.JsonName("cf_api_key")),
  createdAt: Schema.String.pipe(T.JsonName("created_at")),
  modifiedAt: Schema.String.pipe(T.JsonName("modified_at")),
  name: Schema.String,
  createdBy: Schema.optional(Schema.String).pipe(T.JsonName("created_by")),
  enabled: Schema.optional(Schema.Boolean),
  legacy: Schema.optional(Schema.Boolean),
  modifiedBy: Schema.optional(Schema.String).pipe(T.JsonName("modified_by")),
  syncedAt: Schema.optional(Schema.String).pipe(T.JsonName("synced_at")),
}) as unknown as Schema.Schema<ReadTokenResponse>;

export const readToken: (
  input: ReadTokenRequest,
) => Effect.Effect<
  ReadTokenResponse,
  CommonErrors | ValidationError | NotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ReadTokenRequest,
  output: ReadTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));
