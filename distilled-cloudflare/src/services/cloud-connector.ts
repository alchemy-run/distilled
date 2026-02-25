/**
 * Cloudflare CLOUD-CONNECTOR API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service cloud-connector
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
  id?: string;
  description?: string;
  enabled?: boolean;
  expression?: string;
  parameters?: { host?: string };
  provider?: "aws_s3" | "cloudflare_r2" | "gcp_storage" | "azure_storage";
}[];

export const ListRulesResponse = Schema.Array(
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
) as unknown as Schema.Schema<ListRulesResponse>;

export const listRules: (
  input: ListRulesRequest,
) => Effect.Effect<
  ListRulesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [],
}));

export interface UpdateRuleRequest {
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

export const UpdateRuleRequest = Schema.Struct({
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
  T.Http({ method: "GET", path: "/zones/{zone_id}/cloud_connector/rules" }),
) as unknown as Schema.Schema<UpdateRuleRequest>;

export type UpdateRuleResponse = {
  id?: string;
  description?: string;
  enabled?: boolean;
  expression?: string;
  parameters?: { host?: string };
  provider?: "aws_s3" | "cloudflare_r2" | "gcp_storage" | "azure_storage";
}[];

export const UpdateRuleResponse = Schema.Array(
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
) as unknown as Schema.Schema<UpdateRuleResponse>;

export const updateRule: (
  input: UpdateRuleRequest,
) => Effect.Effect<
  UpdateRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [],
}));
