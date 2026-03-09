/**
 * Cloudflare CLOUD-CONNECTOR API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service cloud-connector
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// Rule
// =============================================================================

export interface ListRulesRequest {
  /** Identifier. */
  zoneId: string;
}

export const ListRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cloud_connector/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export type ListRulesResponse = {
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

export const ListRulesResponse = Schema.Array(
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
) as unknown as Schema.Schema<ListRulesResponse>;

export type ListRulesError = DefaultErrors;

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

export const PutRuleRequest = Schema.Struct({
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

export type PutRuleResponse = {
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

export const PutRuleResponse = Schema.Array(
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
) as unknown as Schema.Schema<PutRuleResponse>;

export type PutRuleError = DefaultErrors;

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
