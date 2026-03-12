/**
 * Cloudflare AISEARCH API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service aisearch
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

export const ListInstancesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai-search/instances" }),
) as unknown as Schema.Schema<ListInstancesRequest>;

export interface ListInstancesResponse {
  result: {
    id: string;
    accountId: string;
    accountTag: string;
    createdAt: string;
    internalId: string;
    modifiedAt: string;
    source: string;
    tokenId: string;
    type: "r2" | "web-crawler";
    vectorizeName: string;
    aiGatewayId?: string | null;
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
      | ""
      | null;
    cache?: boolean | null;
    cacheThreshold?:
      | "super_strict_match"
      | "close_enough"
      | "flexible_friend"
      | "anything_goes"
      | null;
    chunk?: boolean | null;
    chunkOverlap?: number | null;
    chunkSize?: number | null;
    createdBy?: string | null;
    embeddingModel?:
      | "@cf/baai/bge-m3"
      | "@cf/baai/bge-large-en-v1.5"
      | "@cf/google/embeddinggemma-300m"
      | "@cf/qwen/qwen3-embedding-0.6b"
      | "google-ai-studio/gemini-embedding-001"
      | "openai/text-embedding-3-small"
      | "openai/text-embedding-3-large"
      | ""
      | null;
    enable?: boolean | null;
    engineVersion?: number | null;
    hybridSearchEnabled?: boolean | null;
    lastActivity?: string | null;
    maxNumResults?: number | null;
    metadata?: {
      createdFromAisearchWizard?: boolean | null;
      workerDomain?: string | null;
    } | null;
    modifiedBy?: string | null;
    paused?: boolean | null;
    publicEndpointId?: string | null;
    publicEndpointParams?: {
      authorizedHosts?: string[] | null;
      chatCompletionsEndpoint?: { disabled?: boolean | null } | null;
      enabled?: boolean | null;
      mcp?: { disabled?: boolean | null } | null;
      rateLimit?: {
        periodMs?: number | null;
        requests?: number | null;
        technique?: "fixed" | "sliding" | null;
      } | null;
      searchEndpoint?: { disabled?: boolean | null } | null;
    } | null;
    reranking?: boolean | null;
    rerankingModel?: "@cf/baai/bge-reranker-base" | "" | null;
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
      | ""
      | null;
    rewriteQuery?: boolean | null;
    scoreThreshold?: number | null;
    sourceParams?: {
      excludeItems?: string[] | null;
      includeItems?: string[] | null;
      prefix?: string | null;
      r2Jurisdiction?: string | null;
      webCrawler?: {
        parseOptions?: {
          includeHeaders?: Record<string, unknown> | null;
          includeImages?: boolean | null;
          useBrowserRendering?: boolean | null;
        } | null;
        parseType?: "sitemap" | "feed-rss" | null;
        storeOptions?: {
          storageId: string;
          r2Jurisdiction?: string | null;
          storageType?: "r2" | null;
        } | null;
      } | null;
    } | null;
    status?: string | null;
    summarization?: boolean | null;
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
      | ""
      | null;
    systemPromptAiSearch?: string | null;
    systemPromptIndexSummarization?: string | null;
    systemPromptRewriteQuery?: string | null;
    vectorizeActiveNamespace?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListInstancesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      accountId: Schema.String,
      accountTag: Schema.String,
      createdAt: Schema.String,
      internalId: Schema.String,
      modifiedAt: Schema.String,
      source: Schema.String,
      tokenId: Schema.String,
      type: Schema.Literals(["r2", "web-crawler"]),
      vectorizeName: Schema.String,
      aiGatewayId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      aiSearchModel: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      cache: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      cacheThreshold: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "super_strict_match",
            "close_enough",
            "flexible_friend",
            "anything_goes",
          ]),
          Schema.Null,
        ]),
      ),
      chunk: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      chunkOverlap: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      chunkSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      embeddingModel: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      enable: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      engineVersion: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      hybridSearchEnabled: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      maxNumResults: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      metadata: Schema.optional(
        Schema.Union([
          Schema.Struct({
            createdFromAisearchWizard: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            workerDomain: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              createdFromAisearchWizard: "created_from_aisearch_wizard",
              workerDomain: "worker_domain",
            }),
          ),
          Schema.Null,
        ]),
      ),
      modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      publicEndpointId: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      publicEndpointParams: Schema.optional(
        Schema.Union([
          Schema.Struct({
            authorizedHosts: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            chatCompletionsEndpoint: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  disabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            enabled: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            mcp: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  disabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            rateLimit: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  periodMs: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  requests: Schema.optional(
                    Schema.Union([Schema.Number, Schema.Null]),
                  ),
                  technique: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["fixed", "sliding"]),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    periodMs: "period_ms",
                    requests: "requests",
                    technique: "technique",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            searchEndpoint: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  disabled: Schema.optional(
                    Schema.Union([Schema.Boolean, Schema.Null]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              authorizedHosts: "authorized_hosts",
              chatCompletionsEndpoint: "chat_completions_endpoint",
              enabled: "enabled",
              mcp: "mcp",
              rateLimit: "rate_limit",
              searchEndpoint: "search_endpoint",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reranking: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      rerankingModel: Schema.optional(
        Schema.Union([
          Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
          Schema.Null,
        ]),
      ),
      rewriteModel: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      rewriteQuery: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      scoreThreshold: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      sourceParams: Schema.optional(
        Schema.Union([
          Schema.Struct({
            excludeItems: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            includeItems: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            r2Jurisdiction: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            webCrawler: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  parseOptions: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        includeHeaders: Schema.optional(
                          Schema.Union([Schema.Struct({}), Schema.Null]),
                        ),
                        includeImages: Schema.optional(
                          Schema.Union([Schema.Boolean, Schema.Null]),
                        ),
                        useBrowserRendering: Schema.optional(
                          Schema.Union([Schema.Boolean, Schema.Null]),
                        ),
                      }).pipe(
                        Schema.encodeKeys({
                          includeHeaders: "include_headers",
                          includeImages: "include_images",
                          useBrowserRendering: "use_browser_rendering",
                        }),
                      ),
                      Schema.Null,
                    ]),
                  ),
                  parseType: Schema.optional(
                    Schema.Union([
                      Schema.Literals(["sitemap", "feed-rss"]),
                      Schema.Null,
                    ]),
                  ),
                  storeOptions: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        storageId: Schema.String,
                        r2Jurisdiction: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        storageType: Schema.optional(
                          Schema.Union([Schema.Literal("r2"), Schema.Null]),
                        ),
                      }).pipe(
                        Schema.encodeKeys({
                          storageId: "storage_id",
                          r2Jurisdiction: "r2_jurisdiction",
                          storageType: "storage_type",
                        }),
                      ),
                      Schema.Null,
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    parseOptions: "parse_options",
                    parseType: "parse_type",
                    storeOptions: "store_options",
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              excludeItems: "exclude_items",
              includeItems: "include_items",
              prefix: "prefix",
              r2Jurisdiction: "r2_jurisdiction",
              webCrawler: "web_crawler",
            }),
          ),
          Schema.Null,
        ]),
      ),
      status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      summarization: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      summarizationModel: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      systemPromptAiSearch: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      systemPromptIndexSummarization: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      systemPromptRewriteQuery: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      vectorizeActiveNamespace: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        internalId: "internal_id",
        modifiedAt: "modified_at",
        source: "source",
        tokenId: "token_id",
        type: "type",
        vectorizeName: "vectorize_name",
        aiGatewayId: "ai_gateway_id",
        aiSearchModel: "ai_search_model",
        cache: "cache",
        cacheThreshold: "cache_threshold",
        chunk: "chunk",
        chunkOverlap: "chunk_overlap",
        chunkSize: "chunk_size",
        createdBy: "created_by",
        embeddingModel: "embedding_model",
        enable: "enable",
        engineVersion: "engine_version",
        hybridSearchEnabled: "hybrid_search_enabled",
        lastActivity: "last_activity",
        maxNumResults: "max_num_results",
        metadata: "metadata",
        modifiedBy: "modified_by",
        paused: "paused",
        publicEndpointId: "public_endpoint_id",
        publicEndpointParams: "public_endpoint_params",
        reranking: "reranking",
        rerankingModel: "reranking_model",
        rewriteModel: "rewrite_model",
        rewriteQuery: "rewrite_query",
        scoreThreshold: "score_threshold",
        sourceParams: "source_params",
        status: "status",
        summarization: "summarization",
        summarizationModel: "summarization_model",
        systemPromptAiSearch: "system_prompt_ai_search",
        systemPromptIndexSummarization: "system_prompt_index_summarization",
        systemPromptRewriteQuery: "system_prompt_rewrite_query",
        vectorizeActiveNamespace: "vectorize_active_namespace",
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
) as unknown as Schema.Schema<ListInstancesResponse>;

export type ListInstancesError = DefaultErrors | InvalidRoute;

export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListInstancesRequest,
  ) => stream.Stream<
    ListInstancesResponse,
    ListInstancesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListInstancesRequest,
  ) => stream.Stream<
    {
      id: string;
      accountId: string;
      accountTag: string;
      createdAt: string;
      internalId: string;
      modifiedAt: string;
      source: string;
      tokenId: string;
      type: "r2" | "web-crawler";
      vectorizeName: string;
      aiGatewayId?: string | null;
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
        | ""
        | null;
      cache?: boolean | null;
      cacheThreshold?:
        | "super_strict_match"
        | "close_enough"
        | "flexible_friend"
        | "anything_goes"
        | null;
      chunk?: boolean | null;
      chunkOverlap?: number | null;
      chunkSize?: number | null;
      createdBy?: string | null;
      embeddingModel?:
        | "@cf/baai/bge-m3"
        | "@cf/baai/bge-large-en-v1.5"
        | "@cf/google/embeddinggemma-300m"
        | "@cf/qwen/qwen3-embedding-0.6b"
        | "google-ai-studio/gemini-embedding-001"
        | "openai/text-embedding-3-small"
        | "openai/text-embedding-3-large"
        | ""
        | null;
      enable?: boolean | null;
      engineVersion?: number | null;
      hybridSearchEnabled?: boolean | null;
      lastActivity?: string | null;
      maxNumResults?: number | null;
      metadata?: {
        createdFromAisearchWizard?: boolean | null;
        workerDomain?: string | null;
      } | null;
      modifiedBy?: string | null;
      paused?: boolean | null;
      publicEndpointId?: string | null;
      publicEndpointParams?: {
        authorizedHosts?: string[] | null;
        chatCompletionsEndpoint?: { disabled?: boolean | null } | null;
        enabled?: boolean | null;
        mcp?: { disabled?: boolean | null } | null;
        rateLimit?: {
          periodMs?: number | null;
          requests?: number | null;
          technique?: "fixed" | "sliding" | null;
        } | null;
        searchEndpoint?: { disabled?: boolean | null } | null;
      } | null;
      reranking?: boolean | null;
      rerankingModel?: "@cf/baai/bge-reranker-base" | "" | null;
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
        | ""
        | null;
      rewriteQuery?: boolean | null;
      scoreThreshold?: number | null;
      sourceParams?: {
        excludeItems?: string[] | null;
        includeItems?: string[] | null;
        prefix?: string | null;
        r2Jurisdiction?: string | null;
        webCrawler?: {
          parseOptions?: {
            includeHeaders?: Record<string, unknown> | null;
            includeImages?: boolean | null;
            useBrowserRendering?: boolean | null;
          } | null;
          parseType?: "sitemap" | "feed-rss" | null;
          storeOptions?: {
            storageId: string;
            r2Jurisdiction?: string | null;
            storageType?: "r2" | null;
          } | null;
        } | null;
      } | null;
      status?: string | null;
      summarization?: boolean | null;
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
        | ""
        | null;
      systemPromptAiSearch?: string | null;
      systemPromptIndexSummarization?: string | null;
      systemPromptRewriteQuery?: string | null;
      vectorizeActiveNamespace?: string | null;
    },
    ListInstancesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String,
  source: Schema.String,
  tokenId: Schema.String,
  type: Schema.Literals(["r2", "web-crawler"]),
  aiGatewayId: Schema.optional(Schema.String),
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
  ),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number),
  chunkSize: Schema.optional(Schema.Number),
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
  ),
  hybridSearchEnabled: Schema.optional(Schema.Boolean),
  maxNumResults: Schema.optional(Schema.Number),
  metadata: Schema.optional(
    Schema.Struct({
      createdFromAisearchWizard: Schema.optional(Schema.Boolean),
      workerDomain: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        createdFromAisearchWizard: "created_from_aisearch_wizard",
        workerDomain: "worker_domain",
      }),
    ),
  ),
  publicEndpointParams: Schema.optional(
    Schema.Struct({
      authorizedHosts: Schema.optional(Schema.Array(Schema.String)),
      chatCompletionsEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
      enabled: Schema.optional(Schema.Boolean),
      mcp: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
      rateLimit: Schema.optional(
        Schema.Struct({
          periodMs: Schema.optional(Schema.Number),
          requests: Schema.optional(Schema.Number),
          technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
        }).pipe(
          Schema.encodeKeys({
            periodMs: "period_ms",
            requests: "requests",
            technique: "technique",
          }),
        ),
      ),
      searchEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
    }).pipe(
      Schema.encodeKeys({
        authorizedHosts: "authorized_hosts",
        chatCompletionsEndpoint: "chat_completions_endpoint",
        enabled: "enabled",
        mcp: "mcp",
        rateLimit: "rate_limit",
        searchEndpoint: "search_endpoint",
      }),
    ),
  ),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ),
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
  ),
  rewriteQuery: Schema.optional(Schema.Boolean),
  scoreThreshold: Schema.optional(Schema.Number),
  sourceParams: Schema.optional(
    Schema.Struct({
      excludeItems: Schema.optional(Schema.Array(Schema.String)),
      includeItems: Schema.optional(Schema.Array(Schema.String)),
      prefix: Schema.optional(Schema.String),
      r2Jurisdiction: Schema.optional(Schema.String),
      webCrawler: Schema.optional(
        Schema.Struct({
          parseOptions: Schema.optional(
            Schema.Struct({
              includeHeaders: Schema.optional(Schema.Struct({})),
              includeImages: Schema.optional(Schema.Boolean),
              useBrowserRendering: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                includeHeaders: "include_headers",
                includeImages: "include_images",
                useBrowserRendering: "use_browser_rendering",
              }),
            ),
          ),
          parseType: Schema.optional(Schema.Literals(["sitemap", "feed-rss"])),
          storeOptions: Schema.optional(
            Schema.Struct({
              storageId: Schema.String,
              r2Jurisdiction: Schema.optional(Schema.String),
              storageType: Schema.optional(Schema.Literal("r2")),
            }).pipe(
              Schema.encodeKeys({
                storageId: "storage_id",
                r2Jurisdiction: "r2_jurisdiction",
                storageType: "storage_type",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({
            parseOptions: "parse_options",
            parseType: "parse_type",
            storeOptions: "store_options",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        excludeItems: "exclude_items",
        includeItems: "include_items",
        prefix: "prefix",
        r2Jurisdiction: "r2_jurisdiction",
        webCrawler: "web_crawler",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    source: "source",
    tokenId: "token_id",
    type: "type",
    aiGatewayId: "ai_gateway_id",
    aiSearchModel: "ai_search_model",
    chunk: "chunk",
    chunkOverlap: "chunk_overlap",
    chunkSize: "chunk_size",
    embeddingModel: "embedding_model",
    hybridSearchEnabled: "hybrid_search_enabled",
    maxNumResults: "max_num_results",
    metadata: "metadata",
    publicEndpointParams: "public_endpoint_params",
    reranking: "reranking",
    rerankingModel: "reranking_model",
    rewriteModel: "rewrite_model",
    rewriteQuery: "rewrite_query",
    scoreThreshold: "score_threshold",
    sourceParams: "source_params",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-search/instances",
  }),
) as unknown as Schema.Schema<CreateInstanceRequest>;

export interface CreateInstanceResponse {
  /** Use your AI Search ID. */
  id: string;
  accountId?: string | null;
  accountTag?: string | null;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string | null;
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
    | ""
    | null;
  cache?: boolean | null;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean | null;
  chunkOverlap?: number | null;
  chunkSize?: number | null;
  createdBy?: string | null;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | ""
    | null;
  enable?: boolean | null;
  engineVersion?: number | null;
  hybridSearchEnabled?: boolean | null;
  lastActivity?: string | null;
  maxNumResults?: number | null;
  metadata?: {
    createdFromAisearchWizard?: boolean | null;
    workerDomain?: string | null;
  } | null;
  modifiedBy?: string | null;
  paused?: boolean | null;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[] | null;
    chatCompletionsEndpoint?: { disabled?: boolean | null } | null;
    enabled?: boolean | null;
    mcp?: { disabled?: boolean | null } | null;
    rateLimit?: {
      periodMs?: number | null;
      requests?: number | null;
      technique?: "fixed" | "sliding" | null;
    } | null;
    searchEndpoint?: { disabled?: boolean | null } | null;
  } | null;
  reranking?: boolean | null;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "" | null;
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
    | ""
    | null;
  rewriteQuery?: boolean | null;
  scoreThreshold?: number | null;
  sourceParams?: {
    excludeItems?: string[] | null;
    includeItems?: string[] | null;
    prefix?: string | null;
    r2Jurisdiction?: string | null;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown> | null;
        includeImages?: boolean | null;
        useBrowserRendering?: boolean | null;
      } | null;
      parseType?: "sitemap" | "feed-rss" | null;
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string | null;
        storageType?: "r2" | null;
      } | null;
    } | null;
  } | null;
  status?: string | null;
  summarization?: boolean | null;
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
    | ""
    | null;
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const CreateInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdAt: Schema.String,
    internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.String,
    source: Schema.String,
    tokenId: Schema.String,
    type: Schema.Literals(["r2", "web-crawler"]),
    vectorizeName: Schema.String,
    aiGatewayId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    aiSearchModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    cache: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    cacheThreshold: Schema.optional(
      Schema.Union([
        Schema.Literal("super_strict_match"),
        Schema.Literal("close_enough"),
        Schema.Literal("flexible_friend"),
        Schema.Literal("anything_goes"),
        Schema.Null,
      ]),
    ),
    chunk: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    chunkOverlap: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    chunkSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    embeddingModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    enable: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    engineVersion: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    hybridSearchEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    maxNumResults: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    metadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          createdFromAisearchWizard: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          workerDomain: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            createdFromAisearchWizard: "created_from_aisearch_wizard",
            workerDomain: "worker_domain",
          }),
        ),
        Schema.Null,
      ]),
    ),
    modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    publicEndpointId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    publicEndpointParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          authorizedHosts: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          chatCompletionsEndpoint: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          mcp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          rateLimit: Schema.optional(
            Schema.Union([
              Schema.Struct({
                periodMs: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requests: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                technique: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["fixed", "sliding"]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  periodMs: "period_ms",
                  requests: "requests",
                  technique: "technique",
                }),
              ),
              Schema.Null,
            ]),
          ),
          searchEndpoint: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            authorizedHosts: "authorized_hosts",
            chatCompletionsEndpoint: "chat_completions_endpoint",
            enabled: "enabled",
            mcp: "mcp",
            rateLimit: "rate_limit",
            searchEndpoint: "search_endpoint",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reranking: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    rerankingModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
        Schema.Null,
      ]),
    ),
    rewriteModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    rewriteQuery: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    scoreThreshold: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    sourceParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          excludeItems: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          includeItems: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          r2Jurisdiction: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          webCrawler: Schema.optional(
            Schema.Union([
              Schema.Struct({
                parseOptions: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      includeHeaders: Schema.optional(
                        Schema.Union([Schema.Struct({}), Schema.Null]),
                      ),
                      includeImages: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      useBrowserRendering: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        includeHeaders: "include_headers",
                        includeImages: "include_images",
                        useBrowserRendering: "use_browser_rendering",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
                parseType: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["sitemap", "feed-rss"]),
                    Schema.Null,
                  ]),
                ),
                storeOptions: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      storageId: Schema.String,
                      r2Jurisdiction: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      storageType: Schema.optional(
                        Schema.Union([Schema.Literal("r2"), Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        storageId: "storage_id",
                        r2Jurisdiction: "r2_jurisdiction",
                        storageType: "storage_type",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  parseOptions: "parse_options",
                  parseType: "parse_type",
                  storeOptions: "store_options",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            excludeItems: "exclude_items",
            includeItems: "include_items",
            prefix: "prefix",
            r2Jurisdiction: "r2_jurisdiction",
            webCrawler: "web_crawler",
          }),
        ),
        Schema.Null,
      ]),
    ),
    status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    summarization: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    summarizationModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    systemPromptAiSearch: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    systemPromptIndexSummarization: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    systemPromptRewriteQuery: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    vectorizeActiveNamespace: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      internalId: "internal_id",
      modifiedAt: "modified_at",
      source: "source",
      tokenId: "token_id",
      type: "type",
      vectorizeName: "vectorize_name",
      aiGatewayId: "ai_gateway_id",
      aiSearchModel: "ai_search_model",
      cache: "cache",
      cacheThreshold: "cache_threshold",
      chunk: "chunk",
      chunkOverlap: "chunk_overlap",
      chunkSize: "chunk_size",
      createdBy: "created_by",
      embeddingModel: "embedding_model",
      enable: "enable",
      engineVersion: "engine_version",
      hybridSearchEnabled: "hybrid_search_enabled",
      lastActivity: "last_activity",
      maxNumResults: "max_num_results",
      metadata: "metadata",
      modifiedBy: "modified_by",
      paused: "paused",
      publicEndpointId: "public_endpoint_id",
      publicEndpointParams: "public_endpoint_params",
      reranking: "reranking",
      rerankingModel: "reranking_model",
      rewriteModel: "rewrite_model",
      rewriteQuery: "rewrite_query",
      scoreThreshold: "score_threshold",
      sourceParams: "source_params",
      status: "status",
      summarization: "summarization",
      summarizationModel: "summarization_model",
      systemPromptAiSearch: "system_prompt_ai_search",
      systemPromptIndexSummarization: "system_prompt_index_summarization",
      systemPromptRewriteQuery: "system_prompt_rewrite_query",
      vectorizeActiveNamespace: "vectorize_active_namespace",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateInstanceResponse>;

export type CreateInstanceError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  aiGatewayId: Schema.optional(Schema.String),
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
  ),
  cache: Schema.optional(Schema.Boolean),
  cacheThreshold: Schema.optional(
    Schema.Literals([
      "super_strict_match",
      "close_enough",
      "flexible_friend",
      "anything_goes",
    ]),
  ),
  chunk: Schema.optional(Schema.Boolean),
  chunkOverlap: Schema.optional(Schema.Number),
  chunkSize: Schema.optional(Schema.Number),
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
  ),
  hybridSearchEnabled: Schema.optional(Schema.Boolean),
  maxNumResults: Schema.optional(Schema.Number),
  metadata: Schema.optional(
    Schema.Struct({
      createdFromAisearchWizard: Schema.optional(Schema.Boolean),
      workerDomain: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        createdFromAisearchWizard: "created_from_aisearch_wizard",
        workerDomain: "worker_domain",
      }),
    ),
  ),
  paused: Schema.optional(Schema.Boolean),
  publicEndpointParams: Schema.optional(
    Schema.Struct({
      authorizedHosts: Schema.optional(Schema.Array(Schema.String)),
      chatCompletionsEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
      enabled: Schema.optional(Schema.Boolean),
      mcp: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
      rateLimit: Schema.optional(
        Schema.Struct({
          periodMs: Schema.optional(Schema.Number),
          requests: Schema.optional(Schema.Number),
          technique: Schema.optional(Schema.Literals(["fixed", "sliding"])),
        }).pipe(
          Schema.encodeKeys({
            periodMs: "period_ms",
            requests: "requests",
            technique: "technique",
          }),
        ),
      ),
      searchEndpoint: Schema.optional(
        Schema.Struct({
          disabled: Schema.optional(Schema.Boolean),
        }),
      ),
    }).pipe(
      Schema.encodeKeys({
        authorizedHosts: "authorized_hosts",
        chatCompletionsEndpoint: "chat_completions_endpoint",
        enabled: "enabled",
        mcp: "mcp",
        rateLimit: "rate_limit",
        searchEndpoint: "search_endpoint",
      }),
    ),
  ),
  reranking: Schema.optional(Schema.Boolean),
  rerankingModel: Schema.optional(
    Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
  ),
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
  ),
  rewriteQuery: Schema.optional(Schema.Boolean),
  scoreThreshold: Schema.optional(Schema.Number),
  sourceParams: Schema.optional(
    Schema.Struct({
      excludeItems: Schema.optional(Schema.Array(Schema.String)),
      includeItems: Schema.optional(Schema.Array(Schema.String)),
      prefix: Schema.optional(Schema.String),
      r2Jurisdiction: Schema.optional(Schema.String),
      webCrawler: Schema.optional(
        Schema.Struct({
          parseOptions: Schema.optional(
            Schema.Struct({
              includeHeaders: Schema.optional(Schema.Struct({})),
              includeImages: Schema.optional(Schema.Boolean),
              useBrowserRendering: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                includeHeaders: "include_headers",
                includeImages: "include_images",
                useBrowserRendering: "use_browser_rendering",
              }),
            ),
          ),
          parseType: Schema.optional(Schema.Literals(["sitemap", "feed-rss"])),
          storeOptions: Schema.optional(
            Schema.Struct({
              storageId: Schema.String,
              r2Jurisdiction: Schema.optional(Schema.String),
              storageType: Schema.optional(Schema.Literal("r2")),
            }).pipe(
              Schema.encodeKeys({
                storageId: "storage_id",
                r2Jurisdiction: "r2_jurisdiction",
                storageType: "storage_type",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({
            parseOptions: "parse_options",
            parseType: "parse_type",
            storeOptions: "store_options",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        excludeItems: "exclude_items",
        includeItems: "include_items",
        prefix: "prefix",
        r2Jurisdiction: "r2_jurisdiction",
        webCrawler: "web_crawler",
      }),
    ),
  ),
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
  ),
  systemPromptAiSearch: Schema.optional(Schema.String),
  systemPromptIndexSummarization: Schema.optional(Schema.String),
  systemPromptRewriteQuery: Schema.optional(Schema.String),
  tokenId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    aiGatewayId: "ai_gateway_id",
    aiSearchModel: "ai_search_model",
    cache: "cache",
    cacheThreshold: "cache_threshold",
    chunk: "chunk",
    chunkOverlap: "chunk_overlap",
    chunkSize: "chunk_size",
    embeddingModel: "embedding_model",
    hybridSearchEnabled: "hybrid_search_enabled",
    maxNumResults: "max_num_results",
    metadata: "metadata",
    paused: "paused",
    publicEndpointParams: "public_endpoint_params",
    reranking: "reranking",
    rerankingModel: "reranking_model",
    rewriteModel: "rewrite_model",
    rewriteQuery: "rewrite_query",
    scoreThreshold: "score_threshold",
    sourceParams: "source_params",
    summarization: "summarization",
    summarizationModel: "summarization_model",
    systemPromptAiSearch: "system_prompt_ai_search",
    systemPromptIndexSummarization: "system_prompt_index_summarization",
    systemPromptRewriteQuery: "system_prompt_rewrite_query",
    tokenId: "token_id",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/ai-search/instances/{id}",
  }),
) as unknown as Schema.Schema<UpdateInstanceRequest>;

export interface UpdateInstanceResponse {
  /** Use your AI Search ID. */
  id: string;
  accountId?: string | null;
  accountTag?: string | null;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string | null;
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
    | ""
    | null;
  cache?: boolean | null;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean | null;
  chunkOverlap?: number | null;
  chunkSize?: number | null;
  createdBy?: string | null;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | ""
    | null;
  enable?: boolean | null;
  engineVersion?: number | null;
  hybridSearchEnabled?: boolean | null;
  lastActivity?: string | null;
  maxNumResults?: number | null;
  metadata?: {
    createdFromAisearchWizard?: boolean | null;
    workerDomain?: string | null;
  } | null;
  modifiedBy?: string | null;
  paused?: boolean | null;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[] | null;
    chatCompletionsEndpoint?: { disabled?: boolean | null } | null;
    enabled?: boolean | null;
    mcp?: { disabled?: boolean | null } | null;
    rateLimit?: {
      periodMs?: number | null;
      requests?: number | null;
      technique?: "fixed" | "sliding" | null;
    } | null;
    searchEndpoint?: { disabled?: boolean | null } | null;
  } | null;
  reranking?: boolean | null;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "" | null;
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
    | ""
    | null;
  rewriteQuery?: boolean | null;
  scoreThreshold?: number | null;
  sourceParams?: {
    excludeItems?: string[] | null;
    includeItems?: string[] | null;
    prefix?: string | null;
    r2Jurisdiction?: string | null;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown> | null;
        includeImages?: boolean | null;
        useBrowserRendering?: boolean | null;
      } | null;
      parseType?: "sitemap" | "feed-rss" | null;
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string | null;
        storageType?: "r2" | null;
      } | null;
    } | null;
  } | null;
  status?: string | null;
  summarization?: boolean | null;
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
    | ""
    | null;
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const UpdateInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdAt: Schema.String,
    internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.String,
    source: Schema.String,
    tokenId: Schema.String,
    type: Schema.Literals(["r2", "web-crawler"]),
    vectorizeName: Schema.String,
    aiGatewayId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    aiSearchModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    cache: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    cacheThreshold: Schema.optional(
      Schema.Union([
        Schema.Literal("super_strict_match"),
        Schema.Literal("close_enough"),
        Schema.Literal("flexible_friend"),
        Schema.Literal("anything_goes"),
        Schema.Null,
      ]),
    ),
    chunk: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    chunkOverlap: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    chunkSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    embeddingModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    enable: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    engineVersion: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    hybridSearchEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    maxNumResults: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    metadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          createdFromAisearchWizard: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          workerDomain: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            createdFromAisearchWizard: "created_from_aisearch_wizard",
            workerDomain: "worker_domain",
          }),
        ),
        Schema.Null,
      ]),
    ),
    modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    publicEndpointId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    publicEndpointParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          authorizedHosts: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          chatCompletionsEndpoint: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          mcp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          rateLimit: Schema.optional(
            Schema.Union([
              Schema.Struct({
                periodMs: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requests: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                technique: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["fixed", "sliding"]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  periodMs: "period_ms",
                  requests: "requests",
                  technique: "technique",
                }),
              ),
              Schema.Null,
            ]),
          ),
          searchEndpoint: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            authorizedHosts: "authorized_hosts",
            chatCompletionsEndpoint: "chat_completions_endpoint",
            enabled: "enabled",
            mcp: "mcp",
            rateLimit: "rate_limit",
            searchEndpoint: "search_endpoint",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reranking: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    rerankingModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
        Schema.Null,
      ]),
    ),
    rewriteModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    rewriteQuery: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    scoreThreshold: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    sourceParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          excludeItems: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          includeItems: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          r2Jurisdiction: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          webCrawler: Schema.optional(
            Schema.Union([
              Schema.Struct({
                parseOptions: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      includeHeaders: Schema.optional(
                        Schema.Union([Schema.Struct({}), Schema.Null]),
                      ),
                      includeImages: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      useBrowserRendering: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        includeHeaders: "include_headers",
                        includeImages: "include_images",
                        useBrowserRendering: "use_browser_rendering",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
                parseType: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["sitemap", "feed-rss"]),
                    Schema.Null,
                  ]),
                ),
                storeOptions: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      storageId: Schema.String,
                      r2Jurisdiction: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      storageType: Schema.optional(
                        Schema.Union([Schema.Literal("r2"), Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        storageId: "storage_id",
                        r2Jurisdiction: "r2_jurisdiction",
                        storageType: "storage_type",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  parseOptions: "parse_options",
                  parseType: "parse_type",
                  storeOptions: "store_options",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            excludeItems: "exclude_items",
            includeItems: "include_items",
            prefix: "prefix",
            r2Jurisdiction: "r2_jurisdiction",
            webCrawler: "web_crawler",
          }),
        ),
        Schema.Null,
      ]),
    ),
    status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    summarization: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    summarizationModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    systemPromptAiSearch: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    systemPromptIndexSummarization: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    systemPromptRewriteQuery: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    vectorizeActiveNamespace: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      internalId: "internal_id",
      modifiedAt: "modified_at",
      source: "source",
      tokenId: "token_id",
      type: "type",
      vectorizeName: "vectorize_name",
      aiGatewayId: "ai_gateway_id",
      aiSearchModel: "ai_search_model",
      cache: "cache",
      cacheThreshold: "cache_threshold",
      chunk: "chunk",
      chunkOverlap: "chunk_overlap",
      chunkSize: "chunk_size",
      createdBy: "created_by",
      embeddingModel: "embedding_model",
      enable: "enable",
      engineVersion: "engine_version",
      hybridSearchEnabled: "hybrid_search_enabled",
      lastActivity: "last_activity",
      maxNumResults: "max_num_results",
      metadata: "metadata",
      modifiedBy: "modified_by",
      paused: "paused",
      publicEndpointId: "public_endpoint_id",
      publicEndpointParams: "public_endpoint_params",
      reranking: "reranking",
      rerankingModel: "reranking_model",
      rewriteModel: "rewrite_model",
      rewriteQuery: "rewrite_query",
      scoreThreshold: "score_threshold",
      sourceParams: "source_params",
      status: "status",
      summarization: "summarization",
      summarizationModel: "summarization_model",
      systemPromptAiSearch: "system_prompt_ai_search",
      systemPromptIndexSummarization: "system_prompt_index_summarization",
      systemPromptRewriteQuery: "system_prompt_rewrite_query",
      vectorizeActiveNamespace: "vectorize_active_namespace",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateInstanceResponse>;

export type UpdateInstanceError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const updateInstance: API.OperationMethod<
  UpdateInstanceRequest,
  UpdateInstanceResponse,
  UpdateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateInstanceRequest,
  output: UpdateInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface DeleteInstanceRequest {
  id: string;
  accountId: string;
}

export const DeleteInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  accountId?: string | null;
  accountTag?: string | null;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string | null;
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
    | ""
    | null;
  cache?: boolean | null;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean | null;
  chunkOverlap?: number | null;
  chunkSize?: number | null;
  createdBy?: string | null;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | ""
    | null;
  enable?: boolean | null;
  engineVersion?: number | null;
  hybridSearchEnabled?: boolean | null;
  lastActivity?: string | null;
  maxNumResults?: number | null;
  metadata?: {
    createdFromAisearchWizard?: boolean | null;
    workerDomain?: string | null;
  } | null;
  modifiedBy?: string | null;
  paused?: boolean | null;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[] | null;
    chatCompletionsEndpoint?: { disabled?: boolean | null } | null;
    enabled?: boolean | null;
    mcp?: { disabled?: boolean | null } | null;
    rateLimit?: {
      periodMs?: number | null;
      requests?: number | null;
      technique?: "fixed" | "sliding" | null;
    } | null;
    searchEndpoint?: { disabled?: boolean | null } | null;
  } | null;
  reranking?: boolean | null;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "" | null;
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
    | ""
    | null;
  rewriteQuery?: boolean | null;
  scoreThreshold?: number | null;
  sourceParams?: {
    excludeItems?: string[] | null;
    includeItems?: string[] | null;
    prefix?: string | null;
    r2Jurisdiction?: string | null;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown> | null;
        includeImages?: boolean | null;
        useBrowserRendering?: boolean | null;
      } | null;
      parseType?: "sitemap" | "feed-rss" | null;
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string | null;
        storageType?: "r2" | null;
      } | null;
    } | null;
  } | null;
  status?: string | null;
  summarization?: boolean | null;
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
    | ""
    | null;
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const DeleteInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdAt: Schema.String,
    internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.String,
    source: Schema.String,
    tokenId: Schema.String,
    type: Schema.Literals(["r2", "web-crawler"]),
    vectorizeName: Schema.String,
    aiGatewayId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    aiSearchModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    cache: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    cacheThreshold: Schema.optional(
      Schema.Union([
        Schema.Literal("super_strict_match"),
        Schema.Literal("close_enough"),
        Schema.Literal("flexible_friend"),
        Schema.Literal("anything_goes"),
        Schema.Null,
      ]),
    ),
    chunk: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    chunkOverlap: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    chunkSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    embeddingModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    enable: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    engineVersion: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    hybridSearchEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    maxNumResults: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    metadata: Schema.optional(
      Schema.Union([
        Schema.Struct({
          createdFromAisearchWizard: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          workerDomain: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            createdFromAisearchWizard: "created_from_aisearch_wizard",
            workerDomain: "worker_domain",
          }),
        ),
        Schema.Null,
      ]),
    ),
    modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    publicEndpointId: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    publicEndpointParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          authorizedHosts: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          chatCompletionsEndpoint: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          mcp: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
          rateLimit: Schema.optional(
            Schema.Union([
              Schema.Struct({
                periodMs: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requests: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                technique: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["fixed", "sliding"]),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  periodMs: "period_ms",
                  requests: "requests",
                  technique: "technique",
                }),
              ),
              Schema.Null,
            ]),
          ),
          searchEndpoint: Schema.optional(
            Schema.Union([
              Schema.Struct({
                disabled: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            authorizedHosts: "authorized_hosts",
            chatCompletionsEndpoint: "chat_completions_endpoint",
            enabled: "enabled",
            mcp: "mcp",
            rateLimit: "rate_limit",
            searchEndpoint: "search_endpoint",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reranking: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    rerankingModel: Schema.optional(
      Schema.Union([
        Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
        Schema.Null,
      ]),
    ),
    rewriteModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    rewriteQuery: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    scoreThreshold: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    sourceParams: Schema.optional(
      Schema.Union([
        Schema.Struct({
          excludeItems: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          includeItems: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          r2Jurisdiction: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          webCrawler: Schema.optional(
            Schema.Union([
              Schema.Struct({
                parseOptions: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      includeHeaders: Schema.optional(
                        Schema.Union([Schema.Struct({}), Schema.Null]),
                      ),
                      includeImages: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                      useBrowserRendering: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        includeHeaders: "include_headers",
                        includeImages: "include_images",
                        useBrowserRendering: "use_browser_rendering",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
                parseType: Schema.optional(
                  Schema.Union([
                    Schema.Literals(["sitemap", "feed-rss"]),
                    Schema.Null,
                  ]),
                ),
                storeOptions: Schema.optional(
                  Schema.Union([
                    Schema.Struct({
                      storageId: Schema.String,
                      r2Jurisdiction: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      storageType: Schema.optional(
                        Schema.Union([Schema.Literal("r2"), Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        storageId: "storage_id",
                        r2Jurisdiction: "r2_jurisdiction",
                        storageType: "storage_type",
                      }),
                    ),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  parseOptions: "parse_options",
                  parseType: "parse_type",
                  storeOptions: "store_options",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            excludeItems: "exclude_items",
            includeItems: "include_items",
            prefix: "prefix",
            r2Jurisdiction: "r2_jurisdiction",
            webCrawler: "web_crawler",
          }),
        ),
        Schema.Null,
      ]),
    ),
    status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    summarization: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    summarizationModel: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    systemPromptAiSearch: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    systemPromptIndexSummarization: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    systemPromptRewriteQuery: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    vectorizeActiveNamespace: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      internalId: "internal_id",
      modifiedAt: "modified_at",
      source: "source",
      tokenId: "token_id",
      type: "type",
      vectorizeName: "vectorize_name",
      aiGatewayId: "ai_gateway_id",
      aiSearchModel: "ai_search_model",
      cache: "cache",
      cacheThreshold: "cache_threshold",
      chunk: "chunk",
      chunkOverlap: "chunk_overlap",
      chunkSize: "chunk_size",
      createdBy: "created_by",
      embeddingModel: "embedding_model",
      enable: "enable",
      engineVersion: "engine_version",
      hybridSearchEnabled: "hybrid_search_enabled",
      lastActivity: "last_activity",
      maxNumResults: "max_num_results",
      metadata: "metadata",
      modifiedBy: "modified_by",
      paused: "paused",
      publicEndpointId: "public_endpoint_id",
      publicEndpointParams: "public_endpoint_params",
      reranking: "reranking",
      rerankingModel: "reranking_model",
      rewriteModel: "rewrite_model",
      rewriteQuery: "rewrite_query",
      scoreThreshold: "score_threshold",
      sourceParams: "source_params",
      status: "status",
      summarization: "summarization",
      summarizationModel: "summarization_model",
      systemPromptAiSearch: "system_prompt_ai_search",
      systemPromptIndexSummarization: "system_prompt_index_summarization",
      systemPromptRewriteQuery: "system_prompt_rewrite_query",
      vectorizeActiveNamespace: "vectorize_active_namespace",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteInstanceResponse>;

export type DeleteInstanceError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResponse,
  DeleteInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInstanceRequest,
  output: DeleteInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ReadInstanceRequest {
  id: string;
  accountId: string;
}

export const ReadInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  accountId?: string | null;
  accountTag?: string | null;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  source: string;
  tokenId: string;
  type: "r2" | "web-crawler";
  vectorizeName: string;
  aiGatewayId?: string | null;
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
    | ""
    | null;
  cache?: boolean | null;
  cacheThreshold?:
    | "super_strict_match"
    | "close_enough"
    | "flexible_friend"
    | "anything_goes"
    | null;
  chunk?: boolean | null;
  chunkOverlap?: number | null;
  chunkSize?: number | null;
  createdBy?: string | null;
  embeddingModel?:
    | "@cf/baai/bge-m3"
    | "@cf/baai/bge-large-en-v1.5"
    | "@cf/google/embeddinggemma-300m"
    | "@cf/qwen/qwen3-embedding-0.6b"
    | "google-ai-studio/gemini-embedding-001"
    | "openai/text-embedding-3-small"
    | "openai/text-embedding-3-large"
    | ""
    | null;
  enable?: boolean | null;
  engineVersion?: number | null;
  hybridSearchEnabled?: boolean | null;
  lastActivity?: string | null;
  maxNumResults?: number | null;
  metadata?: {
    createdFromAisearchWizard?: boolean | null;
    workerDomain?: string | null;
  } | null;
  modifiedBy?: string | null;
  paused?: boolean | null;
  publicEndpointId?: string | null;
  publicEndpointParams?: {
    authorizedHosts?: string[] | null;
    chatCompletionsEndpoint?: { disabled?: boolean | null } | null;
    enabled?: boolean | null;
    mcp?: { disabled?: boolean | null } | null;
    rateLimit?: {
      periodMs?: number | null;
      requests?: number | null;
      technique?: "fixed" | "sliding" | null;
    } | null;
    searchEndpoint?: { disabled?: boolean | null } | null;
  } | null;
  reranking?: boolean | null;
  rerankingModel?: "@cf/baai/bge-reranker-base" | "" | null;
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
    | ""
    | null;
  rewriteQuery?: boolean | null;
  scoreThreshold?: number | null;
  sourceParams?: {
    excludeItems?: string[] | null;
    includeItems?: string[] | null;
    prefix?: string | null;
    r2Jurisdiction?: string | null;
    webCrawler?: {
      parseOptions?: {
        includeHeaders?: Record<string, unknown> | null;
        includeImages?: boolean | null;
        useBrowserRendering?: boolean | null;
      } | null;
      parseType?: "sitemap" | "feed-rss" | null;
      storeOptions?: {
        storageId: string;
        r2Jurisdiction?: string | null;
        storageType?: "r2" | null;
      } | null;
    } | null;
  } | null;
  status?: string | null;
  summarization?: boolean | null;
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
    | ""
    | null;
  systemPromptAiSearch?: string | null;
  systemPromptIndexSummarization?: string | null;
  systemPromptRewriteQuery?: string | null;
  vectorizeActiveNamespace?: string | null;
}

export const ReadInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.String,
  internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedAt: Schema.String,
  source: Schema.String,
  tokenId: Schema.String,
  type: Schema.Literals(["r2", "web-crawler"]),
  vectorizeName: Schema.String,
  aiGatewayId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  aiSearchModel: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  cache: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  cacheThreshold: Schema.optional(
    Schema.Union([
      Schema.Literal("super_strict_match"),
      Schema.Literal("close_enough"),
      Schema.Literal("flexible_friend"),
      Schema.Literal("anything_goes"),
      Schema.Null,
    ]),
  ),
  chunk: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  chunkOverlap: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  chunkSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  embeddingModel: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  enable: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  engineVersion: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  hybridSearchEnabled: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  maxNumResults: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  metadata: Schema.optional(
    Schema.Union([
      Schema.Struct({
        createdFromAisearchWizard: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        workerDomain: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          createdFromAisearchWizard: "created_from_aisearch_wizard",
          workerDomain: "worker_domain",
        }),
      ),
      Schema.Null,
    ]),
  ),
  modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  publicEndpointId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  publicEndpointParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorizedHosts: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        chatCompletionsEndpoint: Schema.optional(
          Schema.Union([
            Schema.Struct({
              disabled: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        mcp: Schema.optional(
          Schema.Union([
            Schema.Struct({
              disabled: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        rateLimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              periodMs: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requests: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              technique: Schema.optional(
                Schema.Union([
                  Schema.Literals(["fixed", "sliding"]),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                periodMs: "period_ms",
                requests: "requests",
                technique: "technique",
              }),
            ),
            Schema.Null,
          ]),
        ),
        searchEndpoint: Schema.optional(
          Schema.Union([
            Schema.Struct({
              disabled: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          authorizedHosts: "authorized_hosts",
          chatCompletionsEndpoint: "chat_completions_endpoint",
          enabled: "enabled",
          mcp: "mcp",
          rateLimit: "rate_limit",
          searchEndpoint: "search_endpoint",
        }),
      ),
      Schema.Null,
    ]),
  ),
  reranking: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  rerankingModel: Schema.optional(
    Schema.Union([
      Schema.Literals(["@cf/baai/bge-reranker-base", ""]),
      Schema.Null,
    ]),
  ),
  rewriteModel: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  rewriteQuery: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  scoreThreshold: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  sourceParams: Schema.optional(
    Schema.Union([
      Schema.Struct({
        excludeItems: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        includeItems: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        prefix: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        r2Jurisdiction: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        webCrawler: Schema.optional(
          Schema.Union([
            Schema.Struct({
              parseOptions: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    includeHeaders: Schema.optional(
                      Schema.Union([Schema.Struct({}), Schema.Null]),
                    ),
                    includeImages: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    useBrowserRendering: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      includeHeaders: "include_headers",
                      includeImages: "include_images",
                      useBrowserRendering: "use_browser_rendering",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              parseType: Schema.optional(
                Schema.Union([
                  Schema.Literals(["sitemap", "feed-rss"]),
                  Schema.Null,
                ]),
              ),
              storeOptions: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    storageId: Schema.String,
                    r2Jurisdiction: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    storageType: Schema.optional(
                      Schema.Union([Schema.Literal("r2"), Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      storageId: "storage_id",
                      r2Jurisdiction: "r2_jurisdiction",
                      storageType: "storage_type",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                parseOptions: "parse_options",
                parseType: "parse_type",
                storeOptions: "store_options",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          excludeItems: "exclude_items",
          includeItems: "include_items",
          prefix: "prefix",
          r2Jurisdiction: "r2_jurisdiction",
          webCrawler: "web_crawler",
        }),
      ),
      Schema.Null,
    ]),
  ),
  status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  summarization: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  summarizationModel: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  systemPromptAiSearch: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  systemPromptIndexSummarization: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  systemPromptRewriteQuery: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  vectorizeActiveNamespace: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      internalId: "internal_id",
      modifiedAt: "modified_at",
      source: "source",
      tokenId: "token_id",
      type: "type",
      vectorizeName: "vectorize_name",
      aiGatewayId: "ai_gateway_id",
      aiSearchModel: "ai_search_model",
      cache: "cache",
      cacheThreshold: "cache_threshold",
      chunk: "chunk",
      chunkOverlap: "chunk_overlap",
      chunkSize: "chunk_size",
      createdBy: "created_by",
      embeddingModel: "embedding_model",
      enable: "enable",
      engineVersion: "engine_version",
      hybridSearchEnabled: "hybrid_search_enabled",
      lastActivity: "last_activity",
      maxNumResults: "max_num_results",
      metadata: "metadata",
      modifiedBy: "modified_by",
      paused: "paused",
      publicEndpointId: "public_endpoint_id",
      publicEndpointParams: "public_endpoint_params",
      reranking: "reranking",
      rerankingModel: "reranking_model",
      rewriteModel: "rewrite_model",
      rewriteQuery: "rewrite_query",
      scoreThreshold: "score_threshold",
      sourceParams: "source_params",
      status: "status",
      summarization: "summarization",
      summarizationModel: "summarization_model",
      systemPromptAiSearch: "system_prompt_ai_search",
      systemPromptIndexSummarization: "system_prompt_index_summarization",
      systemPromptRewriteQuery: "system_prompt_rewrite_query",
      vectorizeActiveNamespace: "vectorize_active_namespace",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ReadInstanceResponse>;

export type ReadInstanceError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const readInstance: API.OperationMethod<
  ReadInstanceRequest,
  ReadInstanceResponse,
  ReadInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReadInstanceRequest,
  output: ReadInstanceResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface StatsInstanceRequest {
  id: string;
  accountId: string;
}

export const StatsInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/stats",
  }),
) as unknown as Schema.Schema<StatsInstanceRequest>;

export interface StatsInstanceResponse {
  completed?: number | null;
  error?: number | null;
  fileEmbedErrors?: Record<string, unknown> | null;
  indexSourceErrors?: Record<string, unknown> | null;
  lastActivity?: string | null;
  queued?: number | null;
  running?: number | null;
  skipped?: number | null;
}

export const StatsInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  completed: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  error: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  fileEmbedErrors: Schema.optional(
    Schema.Union([Schema.Struct({}), Schema.Null]),
  ),
  indexSourceErrors: Schema.optional(
    Schema.Union([Schema.Struct({}), Schema.Null]),
  ),
  lastActivity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  queued: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  running: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  skipped: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      completed: "completed",
      error: "error",
      fileEmbedErrors: "file_embed_errors",
      indexSourceErrors: "index_source_errors",
      lastActivity: "last_activity",
      queued: "queued",
      running: "running",
      skipped: "skipped",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<StatsInstanceResponse>;

export type StatsInstanceError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const statsInstance: API.OperationMethod<
  StatsInstanceRequest,
  StatsInstanceResponse,
  StatsInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetInstanceItemRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String.pipe(T.HttpPath("id")),
    itemId: Schema.String.pipe(T.HttpPath("itemId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-search/instances/{id}/items/{itemId}",
  }),
) as unknown as Schema.Schema<GetInstanceItemRequest>;

export interface GetInstanceItemResponse {
  id: string;
  key: string;
  status: "queued" | "running" | "completed" | "error" | "skipped";
  error?: string | null;
  lastSeenAt?: string | null;
  nextAction?: string | null;
}

export const GetInstanceItemResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    key: Schema.String,
    status: Schema.Literals([
      "queued",
      "running",
      "completed",
      "error",
      "skipped",
    ]),
    error: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    nextAction: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        key: "key",
        status: "status",
        error: "error",
        lastSeenAt: "last_seen_at",
        nextAction: "next_action",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetInstanceItemResponse>;

export type GetInstanceItemError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const getInstanceItem: API.OperationMethod<
  GetInstanceItemRequest,
  GetInstanceItemResponse,
  GetInstanceItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListInstanceItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export interface ListInstanceItemsResponse {
  result: {
    id: string;
    key: string;
    status: "queued" | "running" | "completed" | "error" | "skipped";
    error?: string | null;
    lastSeenAt?: string | null;
    nextAction?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListInstanceItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
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
        error: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lastSeenAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        nextAction: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          key: "key",
          status: "status",
          error: "error",
          lastSeenAt: "last_seen_at",
          nextAction: "next_action",
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
  ) as unknown as Schema.Schema<ListInstanceItemsResponse>;

export type ListInstanceItemsError = DefaultErrors;

export const listInstanceItems: API.PaginatedOperationMethod<
  ListInstanceItemsRequest,
  ListInstanceItemsResponse,
  ListInstanceItemsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListInstanceItemsRequest,
  ) => stream.Stream<
    ListInstanceItemsResponse,
    ListInstanceItemsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListInstanceItemsRequest,
  ) => stream.Stream<
    {
      id: string;
      key: string;
      status: "queued" | "running" | "completed" | "error" | "skipped";
      error?: string | null;
      lastSeenAt?: string | null;
      nextAction?: string | null;
    },
    ListInstanceItemsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInstanceItemsRequest,
  output: ListInstanceItemsResponse,
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
// InstanceJob
// =============================================================================

export interface GetInstanceJobRequest {
  id: string;
  jobId: string;
  accountId: string;
}

export const GetInstanceJobRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  endReason?: string | null;
  endedAt?: string | null;
  lastSeenAt?: string | null;
  startedAt?: string | null;
}

export const GetInstanceJobResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    source: Schema.Literals(["user", "schedule"]),
    endReason: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    endedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    startedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      source: "source",
      endReason: "end_reason",
      endedAt: "ended_at",
      lastSeenAt: "last_seen_at",
      startedAt: "started_at",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetInstanceJobResponse>;

export type GetInstanceJobError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const getInstanceJob: API.OperationMethod<
  GetInstanceJobRequest,
  GetInstanceJobResponse,
  GetInstanceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInstanceJobRequest,
  output: GetInstanceJobResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ListInstanceJobsRequest {
  id: string;
  /** Path param: */
  accountId: string;
}

export const ListInstanceJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/ai-search/instances/{id}/jobs",
    }),
  ) as unknown as Schema.Schema<ListInstanceJobsRequest>;

export interface ListInstanceJobsResponse {
  result: {
    id: string;
    source: "user" | "schedule";
    endReason?: string | null;
    endedAt?: string | null;
    lastSeenAt?: string | null;
    startedAt?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListInstanceJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        source: Schema.Literals(["user", "schedule"]),
        endReason: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        endedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lastSeenAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        startedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          source: "source",
          endReason: "end_reason",
          endedAt: "ended_at",
          lastSeenAt: "last_seen_at",
          startedAt: "started_at",
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
  ) as unknown as Schema.Schema<ListInstanceJobsResponse>;

export type ListInstanceJobsError = DefaultErrors;

export const listInstanceJobs: API.PaginatedOperationMethod<
  ListInstanceJobsRequest,
  ListInstanceJobsResponse,
  ListInstanceJobsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListInstanceJobsRequest,
  ) => stream.Stream<
    ListInstanceJobsResponse,
    ListInstanceJobsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListInstanceJobsRequest,
  ) => stream.Stream<
    {
      id: string;
      source: "user" | "schedule";
      endReason?: string | null;
      endedAt?: string | null;
      lastSeenAt?: string | null;
      startedAt?: string | null;
    },
    ListInstanceJobsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInstanceJobsRequest,
  output: ListInstanceJobsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateInstanceJobRequest {
  id: string;
  accountId: string;
}

export const CreateInstanceJobRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  lastSeenAt?: string | null;
  startedAt?: string | null;
}

export const CreateInstanceJobResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    source: Schema.Literals(["user", "schedule"]),
    endReason: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    endedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSeenAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    startedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        source: "source",
        endReason: "end_reason",
        endedAt: "ended_at",
        lastSeenAt: "last_seen_at",
        startedAt: "started_at",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateInstanceJobResponse>;

export type CreateInstanceJobError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute
  | UnableToConnect
  | SyncInCooldown;

export const createInstanceJob: API.OperationMethod<
  CreateInstanceJobRequest,
  CreateInstanceJobResponse,
  CreateInstanceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const LogsInstanceJobRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String.pipe(T.HttpPath("id")),
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
    perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  },
).pipe(
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

export const LogsInstanceJobResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    createdAt: Schema.Number,
    message: Schema.String,
    messageType: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      message: "message",
      messageType: "message_type",
    }),
  ),
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<LogsInstanceJobResponse>;

export type LogsInstanceJobError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const logsInstanceJob: API.OperationMethod<
  LogsInstanceJobRequest,
  LogsInstanceJobResponse,
  LogsInstanceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListTokensRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai-search/tokens" }),
) as unknown as Schema.Schema<ListTokensRequest>;

export interface ListTokensResponse {
  result: {
    id: string;
    accountId: string;
    accountTag: string;
    cfApiId: string;
    cfApiKey: string;
    createdAt: string;
    modifiedAt: string;
    name: string;
    createdBy?: string | null;
    enabled?: boolean | null;
    legacy?: boolean | null;
    modifiedBy?: string | null;
    syncedAt?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListTokensResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      accountId: Schema.String,
      accountTag: Schema.String,
      cfApiId: Schema.String,
      cfApiKey: Schema.String,
      createdAt: Schema.String,
      modifiedAt: Schema.String,
      name: Schema.String,
      createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      legacy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      syncedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountTag: "account_tag",
        cfApiId: "cf_api_id",
        cfApiKey: "cf_api_key",
        createdAt: "created_at",
        modifiedAt: "modified_at",
        name: "name",
        createdBy: "created_by",
        enabled: "enabled",
        legacy: "legacy",
        modifiedBy: "modified_by",
        syncedAt: "synced_at",
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
) as unknown as Schema.Schema<ListTokensResponse>;

export type ListTokensError = DefaultErrors | InvalidRoute;

export const listTokens: API.PaginatedOperationMethod<
  ListTokensRequest,
  ListTokensResponse,
  ListTokensError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListTokensRequest,
  ) => stream.Stream<
    ListTokensResponse,
    ListTokensError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListTokensRequest,
  ) => stream.Stream<
    {
      id: string;
      accountId: string;
      accountTag: string;
      cfApiId: string;
      cfApiKey: string;
      createdAt: string;
      modifiedAt: string;
      name: string;
      createdBy?: string | null;
      enabled?: boolean | null;
      legacy?: boolean | null;
      modifiedBy?: string | null;
      syncedAt?: string | null;
    },
    ListTokensError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [InvalidRoute],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateTokenRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cfApiId: Schema.String,
  cfApiKey: Schema.String,
  name: Schema.String,
  legacy: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    cfApiId: "cf_api_id",
    cfApiKey: "cf_api_key",
    name: "name",
    legacy: "legacy",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/ai-search/tokens" }),
) as unknown as Schema.Schema<CreateTokenRequest>;

export interface CreateTokenResponse {
  id: string;
  accountId?: string | null;
  accountTag?: string | null;
  cfApiId: string;
  cfApiKey?: string | null;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string | null;
  enabled?: boolean | null;
  legacy?: boolean | null;
  modifiedBy?: string | null;
  syncedAt?: string | null;
}

export const CreateTokenResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  cfApiId: Schema.String,
  cfApiKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  legacy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  syncedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      cfApiId: "cf_api_id",
      cfApiKey: "cf_api_key",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      createdBy: "created_by",
      enabled: "enabled",
      legacy: "legacy",
      modifiedBy: "modified_by",
      syncedAt: "synced_at",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateTokenResponse>;

export type CreateTokenError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface UpdateTokenRequest {
  id: string;
  accountId: string;
}

export const UpdateTokenRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  createdBy?: string | null;
  enabled?: boolean | null;
  legacy?: boolean | null;
  modifiedBy?: string | null;
  syncedAt?: string | null;
}

export const UpdateTokenResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  cfApiId: Schema.String,
  cfApiKey: Schema.String,
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  legacy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  syncedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      cfApiId: "cf_api_id",
      cfApiKey: "cf_api_key",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      createdBy: "created_by",
      enabled: "enabled",
      legacy: "legacy",
      modifiedBy: "modified_by",
      syncedAt: "synced_at",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateTokenResponse>;

export type UpdateTokenError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const updateToken: API.OperationMethod<
  UpdateTokenRequest,
  UpdateTokenResponse,
  UpdateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTokenRequest,
  output: UpdateTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface DeleteTokenRequest {
  id: string;
  accountId: string;
}

export const DeleteTokenRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  accountId?: string | null;
  accountTag?: string | null;
  cfApiId: string;
  cfApiKey?: string | null;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string | null;
  enabled?: boolean | null;
  legacy?: boolean | null;
  modifiedBy?: string | null;
  syncedAt?: string | null;
}

export const DeleteTokenResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  cfApiId: Schema.String,
  cfApiKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  legacy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  syncedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      cfApiId: "cf_api_id",
      cfApiKey: "cf_api_key",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      createdBy: "created_by",
      enabled: "enabled",
      legacy: "legacy",
      modifiedBy: "modified_by",
      syncedAt: "synced_at",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteTokenResponse>;

export type DeleteTokenError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  DeleteTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));

export interface ReadTokenRequest {
  id: string;
  accountId: string;
}

export const ReadTokenRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  accountId?: string | null;
  accountTag?: string | null;
  cfApiId: string;
  cfApiKey?: string | null;
  createdAt: string;
  modifiedAt: string;
  name: string;
  createdBy?: string | null;
  enabled?: boolean | null;
  legacy?: boolean | null;
  modifiedBy?: string | null;
  syncedAt?: string | null;
}

export const ReadTokenResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  cfApiId: Schema.String,
  cfApiKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  createdBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  legacy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  modifiedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  syncedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      cfApiId: "cf_api_id",
      cfApiKey: "cf_api_key",
      createdAt: "created_at",
      modifiedAt: "modified_at",
      name: "name",
      createdBy: "created_by",
      enabled: "enabled",
      legacy: "legacy",
      modifiedBy: "modified_by",
      syncedAt: "synced_at",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ReadTokenResponse>;

export type ReadTokenError =
  | DefaultErrors
  | ValidationError
  | NotFound
  | InvalidRoute;

export const readToken: API.OperationMethod<
  ReadTokenRequest,
  ReadTokenResponse,
  ReadTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReadTokenRequest,
  output: ReadTokenResponse,
  errors: [ValidationError, NotFound, InvalidRoute],
}));
