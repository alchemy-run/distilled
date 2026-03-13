/**
 * Cloudflare CLOUD-CONNECTOR API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service cloud-connector
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Rule
// =============================================================================

export interface ListRulesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cloud_connector/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export interface ListRulesResponse {
  result: {
    id?: string | null;
    description?: string | null;
    enabled?: boolean | null;
    expression?: string | null;
    parameters?: { host?: string | null } | null;
    provider?:
      | "aws_s3"
      | "cloudflare_r2"
      | "gcp_storage"
      | "azure_storage"
      | null;
  }[];
}

export const ListRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      parameters: Schema.optional(
        Schema.Union([
          Schema.Struct({
            host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
          Schema.Null,
        ]),
      ),
      provider: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "aws_s3",
            "cloudflare_r2",
            "gcp_storage",
            "azure_storage",
          ]),
          Schema.Null,
        ]),
      ),
    }),
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
  items: (
    input: ListRulesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      description?: string | null;
      enabled?: boolean | null;
      expression?: string | null;
      parameters?: { host?: string | null } | null;
      provider?:
        | "aws_s3"
        | "cloudflare_r2"
        | "gcp_storage"
        | "azure_storage"
        | null;
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
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  rules?: {
    id?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
    parameters?: { host?: string };
    provider?: "aws_s3" | "cloudflare_r2" | "gcp_storage" | "azure_storage";
  }[];
}

export const PutRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  rules: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        expression: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Struct({
            host: Schema.optional(Schema.String),
          }),
        ),
        provider: Schema.optional(
          Schema.Literals([
            "aws_s3",
            "cloudflare_r2",
            "gcp_storage",
            "azure_storage",
          ]),
        ),
      }),
    ),
  ),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/cloud_connector/rules" }),
) as unknown as Schema.Schema<PutRuleRequest>;

export interface PutRuleResponse {
  result: {
    id?: string | null;
    description?: string | null;
    enabled?: boolean | null;
    expression?: string | null;
    parameters?: { host?: string | null } | null;
    provider?:
      | "aws_s3"
      | "cloudflare_r2"
      | "gcp_storage"
      | "azure_storage"
      | null;
  }[];
}

export const PutRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      parameters: Schema.optional(
        Schema.Union([
          Schema.Struct({
            host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
          Schema.Null,
        ]),
      ),
      provider: Schema.optional(
        Schema.Union([
          Schema.Literals([
            "aws_s3",
            "cloudflare_r2",
            "gcp_storage",
            "azure_storage",
          ]),
          Schema.Null,
        ]),
      ),
    }),
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
  items: (
    input: PutRuleRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      description?: string | null;
      enabled?: boolean | null;
      expression?: string | null;
      parameters?: { host?: string | null } | null;
      provider?:
        | "aws_s3"
        | "cloudflare_r2"
        | "gcp_storage"
        | "azure_storage"
        | null;
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
