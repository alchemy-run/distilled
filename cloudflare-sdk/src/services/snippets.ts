/**
 * Cloudflare SNIPPETS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service snippets
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import {
  type DefaultErrors,
} from "../errors";

// =============================================================================
// Content
// =============================================================================

export interface GetContentRequest {
  snippetName: string;
  /** The unique ID of the zone. */
  zoneId: string;
}

export const GetContentRequest = Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id"))
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/snippets/{snippetName}/content" })) as unknown as Schema.Schema<GetContentRequest>;

export type GetContentResponse = unknown;

export const GetContentResponse = Schema.Unknown as unknown as Schema.Schema<GetContentResponse>;

export type GetContentError =
  | DefaultErrors;

export const getContent: API.OperationMethod<
  GetContentRequest,
  GetContentResponse,
  GetContentError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id"))
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/snippets/snippet_rules" })) as unknown as Schema.Schema<ListRulesRequest>;

export type ListRulesResponse = { id: string; expression: string; lastUpdated: string; snippetName: string; description?: string; enabled?: boolean }[];

export const ListRulesResponse = Schema.Array(Schema.Struct({
  id: Schema.String,
  expression: Schema.String,
  lastUpdated: Schema.String,
  snippetName: Schema.String,
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean)
}).pipe(Schema.encodeKeys({ id: "id", expression: "expression", lastUpdated: "last_updated", snippetName: "snippet_name", description: "description", enabled: "enabled" }))) as unknown as Schema.Schema<ListRulesResponse>;

export type ListRulesError =
  | DefaultErrors;

export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [],
}));

export interface PutRuleRequest {
  /** Path param: The unique ID of the zone. */
  zoneId: string;
  /** Body param: A list of snippet rules. */
  rules: { expression: string; snippetName: string; description?: string; enabled?: boolean }[];
}

export const PutRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  rules: Schema.Array(Schema.Struct({
  expression: Schema.String,
  snippetName: Schema.String,
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean)
}).pipe(Schema.encodeKeys({ expression: "expression", snippetName: "snippet_name", description: "description", enabled: "enabled" })))
})
  .pipe(T.Http({ method: "PUT", path: "/zones/{zone_id}/snippets/snippet_rules" })) as unknown as Schema.Schema<PutRuleRequest>;

export type PutRuleResponse = { id: string; expression: string; lastUpdated: string; snippetName: string; description?: string; enabled?: boolean }[];

export const PutRuleResponse = Schema.Array(Schema.Struct({
  id: Schema.String,
  expression: Schema.String,
  lastUpdated: Schema.String,
  snippetName: Schema.String,
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean)
}).pipe(Schema.encodeKeys({ id: "id", expression: "expression", lastUpdated: "last_updated", snippetName: "snippet_name", description: "description", enabled: "enabled" }))) as unknown as Schema.Schema<PutRuleResponse>;

export type PutRuleError =
  | DefaultErrors;

export const putRule: API.OperationMethod<
  PutRuleRequest,
  PutRuleResponse,
  PutRuleError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutRuleRequest,
  output: PutRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id"))
})
  .pipe(T.Http({ method: "DELETE", path: "/zones/{zone_id}/snippets/snippet_rules" })) as unknown as Schema.Schema<DeleteRuleRequest>;

export type DeleteRuleResponse = { id: string; expression: string; lastUpdated: string; snippetName: string; description?: string; enabled?: boolean }[];

export const DeleteRuleResponse = Schema.Array(Schema.Struct({
  id: Schema.String,
  expression: Schema.String,
  lastUpdated: Schema.String,
  snippetName: Schema.String,
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean)
}).pipe(Schema.encodeKeys({ id: "id", expression: "expression", lastUpdated: "last_updated", snippetName: "snippet_name", description: "description", enabled: "enabled" }))) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError =
  | DefaultErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));


// =============================================================================
// Snippet
// =============================================================================

export interface GetSnippetRequest {
  snippetName: string;
  /** The unique ID of the zone. */
  zoneId: string;
}

export const GetSnippetRequest = Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id"))
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/snippets/{snippetName}" })) as unknown as Schema.Schema<GetSnippetRequest>;

export interface GetSnippetResponse {
  /** The timestamp of when the snippet was created. */
  createdOn: string;
  /** The identifying name of the snippet. */
  snippetName: string;
  /** The timestamp of when the snippet was last modified. */
  modifiedOn?: string;
}

export const GetSnippetResponse = Schema.Struct({
  createdOn: Schema.String,
  snippetName: Schema.String,
  modifiedOn: Schema.optional(Schema.String)
}).pipe(Schema.encodeKeys({ createdOn: "created_on", snippetName: "snippet_name", modifiedOn: "modified_on" })) as unknown as Schema.Schema<GetSnippetResponse>;

export type GetSnippetError =
  | DefaultErrors;

export const getSnippet: API.OperationMethod<
  GetSnippetRequest,
  GetSnippetResponse,
  GetSnippetError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSnippetRequest,
  output: GetSnippetResponse,
  errors: [],
}));

export interface ListSnippetsRequest {
  /** Path param: The unique ID of the zone. */
  zoneId: string;
}

export const ListSnippetsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id"))
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/snippets" })) as unknown as Schema.Schema<ListSnippetsRequest>;

export type ListSnippetsResponse = { createdOn: string; snippetName: string; modifiedOn?: string }[];

export const ListSnippetsResponse = Schema.Array(Schema.Struct({
  createdOn: Schema.String,
  snippetName: Schema.String,
  modifiedOn: Schema.optional(Schema.String)
}).pipe(Schema.encodeKeys({ createdOn: "created_on", snippetName: "snippet_name", modifiedOn: "modified_on" }))) as unknown as Schema.Schema<ListSnippetsResponse>;

export type ListSnippetsError =
  | DefaultErrors;

export const listSnippets: API.OperationMethod<
  ListSnippetsRequest,
  ListSnippetsResponse,
  ListSnippetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSnippetsRequest,
  output: ListSnippetsResponse,
  errors: [],
}));

export interface PutSnippetRequest {
  snippetName: string;
  /** Path param: The unique ID of the zone. */
  zoneId: string;
  /** Body param: Metadata about the snippet. */
  metadata: { mainModule: string };
}

export const PutSnippetRequest = Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  metadata: Schema.Struct({
  mainModule: Schema.String
}).pipe(Schema.encodeKeys({ mainModule: "main_module" }))
})
  .pipe(T.Http({ method: "PUT", path: "/zones/{zone_id}/snippets/{snippetName}", contentType: "multipart" })) as unknown as Schema.Schema<PutSnippetRequest>;

export interface PutSnippetResponse {
  /** The timestamp of when the snippet was created. */
  createdOn: string;
  /** The identifying name of the snippet. */
  snippetName: string;
  /** The timestamp of when the snippet was last modified. */
  modifiedOn?: string;
}

export const PutSnippetResponse = Schema.Struct({
  createdOn: Schema.String,
  snippetName: Schema.String,
  modifiedOn: Schema.optional(Schema.String)
}).pipe(Schema.encodeKeys({ createdOn: "created_on", snippetName: "snippet_name", modifiedOn: "modified_on" })) as unknown as Schema.Schema<PutSnippetResponse>;

export type PutSnippetError =
  | DefaultErrors;

export const putSnippet: API.OperationMethod<
  PutSnippetRequest,
  PutSnippetResponse,
  PutSnippetError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSnippetRequest,
  output: PutSnippetResponse,
  errors: [],
}));

export interface DeleteSnippetRequest {
  snippetName: string;
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteSnippetRequest = Schema.Struct({
  snippetName: Schema.String.pipe(T.HttpPath("snippetName")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id"))
})
  .pipe(T.Http({ method: "DELETE", path: "/zones/{zone_id}/snippets/{snippetName}" })) as unknown as Schema.Schema<DeleteSnippetRequest>;

export type DeleteSnippetResponse = string | null;

export const DeleteSnippetResponse = Schema.Union([Schema.String, Schema.Null]) as unknown as Schema.Schema<DeleteSnippetResponse>;

export type DeleteSnippetError =
  | DefaultErrors;

export const deleteSnippet: API.OperationMethod<
  DeleteSnippetRequest,
  DeleteSnippetResponse,
  DeleteSnippetError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSnippetRequest,
  output: DeleteSnippetResponse,
  errors: [],
}));
