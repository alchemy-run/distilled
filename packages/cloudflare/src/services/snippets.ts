/**
 * Cloudflare SNIPPETS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service snippets
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Content
// =============================================================================

export interface GetContentRequest {
  snippetName: string;
  /** The unique ID of the zone. */
  zoneId: string;
}

export const GetContentRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/snippets/{snippetName}/content",
  }),
) as unknown as Schema.Schema<GetContentRequest>;

export type GetContentResponse = unknown;

export const GetContentResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetContentResponse>;

export type GetContentError = DefaultErrors;

export const getContent: API.OperationMethod<
  GetContentRequest,
  GetContentResponse,
  GetContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetContentRequest,
  output: GetContentResponse,
  errors: [],
}));

// =============================================================================
// Rule
// =============================================================================

export interface ListRulesRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const ListRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/snippets/snippet_rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export interface ListRulesResponse {
  result: {
    id: string;
    expression: string;
    lastUpdated: string;
    snippetName: string;
    description?: string | null;
    enabled?: boolean | null;
  }[];
}

export const ListRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      expression: Schema.String,
      lastUpdated: Schema.String,
      snippetName: Schema.String,
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        expression: "expression",
        lastUpdated: "last_updated",
        snippetName: "snippet_name",
        description: "description",
        enabled: "enabled",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListRulesResponse>;

export type ListRulesError = DefaultErrors;

export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListRulesRequest,
  ) => stream.Stream<
    ListRulesResponse,
    ListRulesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListRulesRequest) => stream.Stream<
    {
      id: string;
      expression: string;
      lastUpdated: string;
      snippetName: string;
      description?: string | null;
      enabled?: boolean | null;
    },
    ListRulesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface PutRuleRequest {
  /** Path param: The unique ID of the zone. */
  zoneId: string;
  /** Body param: A list of snippet rules. */
  rules: {
    expression: string;
    snippetName: string;
    description?: string;
    enabled?: boolean;
  }[];
}

export const PutRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  rules: Schema.Array(
    Schema.Struct({
      expression: Schema.String,
      snippetName: Schema.String,
      description: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        expression: "expression",
        snippetName: "snippet_name",
        description: "description",
        enabled: "enabled",
      }),
    ),
  ),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/snippets/snippet_rules" }),
) as unknown as Schema.Schema<PutRuleRequest>;

export interface PutRuleResponse {
  result: {
    id: string;
    expression: string;
    lastUpdated: string;
    snippetName: string;
    description?: string | null;
    enabled?: boolean | null;
  }[];
}

export const PutRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      expression: Schema.String,
      lastUpdated: Schema.String,
      snippetName: Schema.String,
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        expression: "expression",
        lastUpdated: "last_updated",
        snippetName: "snippet_name",
        description: "description",
        enabled: "enabled",
      }),
    ),
  ),
}) as unknown as Schema.Schema<PutRuleResponse>;

export type PutRuleError = DefaultErrors;

export const putRule: API.PaginatedOperationMethod<
  PutRuleRequest,
  PutRuleResponse,
  PutRuleError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: PutRuleRequest,
  ) => stream.Stream<
    PutRuleResponse,
    PutRuleError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: PutRuleRequest) => stream.Stream<
    {
      id: string;
      expression: string;
      lastUpdated: string;
      snippetName: string;
      description?: string | null;
      enabled?: boolean | null;
    },
    PutRuleError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: PutRuleRequest,
  output: PutRuleResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface DeleteRuleRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/snippets/snippet_rules" }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export interface DeleteRuleResponse {
  result: {
    id: string;
    expression: string;
    lastUpdated: string;
    snippetName: string;
    description?: string | null;
    enabled?: boolean | null;
  }[];
}

export const DeleteRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      expression: Schema.String,
      lastUpdated: Schema.String,
      snippetName: Schema.String,
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        expression: "expression",
        lastUpdated: "last_updated",
        snippetName: "snippet_name",
        description: "description",
        enabled: "enabled",
      }),
    ),
  ),
}) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError = DefaultErrors;

export const deleteRule: API.PaginatedOperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: DeleteRuleRequest,
  ) => stream.Stream<
    DeleteRuleResponse,
    DeleteRuleError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: DeleteRuleRequest) => stream.Stream<
    {
      id: string;
      expression: string;
      lastUpdated: string;
      snippetName: string;
      description?: string | null;
      enabled?: boolean | null;
    },
    DeleteRuleError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Snippet
// =============================================================================

export interface GetSnippetRequest {
  snippetName: string;
  /** The unique ID of the zone. */
  zoneId: string;
}

export const GetSnippetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/snippets/{snippetName}" }),
) as unknown as Schema.Schema<GetSnippetRequest>;

export interface GetSnippetResponse {
  /** The timestamp of when the snippet was created. */
  createdOn: string;
  /** The identifying name of the snippet. */
  snippetName: string;
  /** The timestamp of when the snippet was last modified. */
  modifiedOn?: string | null;
}

export const GetSnippetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  createdOn: Schema.String,
  snippetName: Schema.String,
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      createdOn: "created_on",
      snippetName: "snippet_name",
      modifiedOn: "modified_on",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetSnippetResponse>;

export type GetSnippetError = DefaultErrors;

export const getSnippet: API.OperationMethod<
  GetSnippetRequest,
  GetSnippetResponse,
  GetSnippetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSnippetRequest,
  output: GetSnippetResponse,
  errors: [],
}));

export interface ListSnippetsRequest {
  /** Path param: The unique ID of the zone. */
  zoneId: string;
}

export const ListSnippetsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/snippets" }),
) as unknown as Schema.Schema<ListSnippetsRequest>;

export interface ListSnippetsResponse {
  result: {
    createdOn: string;
    snippetName: string;
    modifiedOn?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListSnippetsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      createdOn: Schema.String,
      snippetName: Schema.String,
      modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        createdOn: "created_on",
        snippetName: "snippet_name",
        modifiedOn: "modified_on",
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
) as unknown as Schema.Schema<ListSnippetsResponse>;

export type ListSnippetsError = DefaultErrors;

export const listSnippets: API.PaginatedOperationMethod<
  ListSnippetsRequest,
  ListSnippetsResponse,
  ListSnippetsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSnippetsRequest,
  ) => stream.Stream<
    ListSnippetsResponse,
    ListSnippetsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSnippetsRequest,
  ) => stream.Stream<
    { createdOn: string; snippetName: string; modifiedOn?: string | null },
    ListSnippetsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSnippetsRequest,
  output: ListSnippetsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface PutSnippetRequest {
  snippetName: string;
  /** Path param: The unique ID of the zone. */
  zoneId: string;
  /** Body param: Metadata about the snippet. */
  metadata: { mainModule: string };
}

export const PutSnippetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  metadata: Schema.Struct({
    mainModule: Schema.String,
  }).pipe(Schema.encodeKeys({ mainModule: "main_module" })),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/snippets/{snippetName}",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<PutSnippetRequest>;

export interface PutSnippetResponse {
  /** The timestamp of when the snippet was created. */
  createdOn: string;
  /** The identifying name of the snippet. */
  snippetName: string;
  /** The timestamp of when the snippet was last modified. */
  modifiedOn?: string | null;
}

export const PutSnippetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  createdOn: Schema.String,
  snippetName: Schema.String,
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      createdOn: "created_on",
      snippetName: "snippet_name",
      modifiedOn: "modified_on",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutSnippetResponse>;

export type PutSnippetError = DefaultErrors;

export const putSnippet: API.OperationMethod<
  PutSnippetRequest,
  PutSnippetResponse,
  PutSnippetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSnippetRequest,
  output: PutSnippetResponse,
  errors: [],
}));

export interface DeleteSnippetRequest {
  snippetName: string;
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteSnippetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/snippets/{snippetName}" }),
) as unknown as Schema.Schema<DeleteSnippetRequest>;

export type DeleteSnippetResponse = string | null;

export const DeleteSnippetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.String,
  Schema.Null,
]).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<DeleteSnippetResponse>;

export type DeleteSnippetError = DefaultErrors;

export const deleteSnippet: API.OperationMethod<
  DeleteSnippetRequest,
  DeleteSnippetResponse,
  DeleteSnippetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSnippetRequest,
  output: DeleteSnippetResponse,
  errors: [],
}));
