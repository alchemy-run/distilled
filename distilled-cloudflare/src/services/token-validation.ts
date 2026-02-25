/**
 * Cloudflare TOKEN-VALIDATION API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service token-validation
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
// Configuration
// =============================================================================

export interface GetConfigurationRequest {
  configId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetConfigurationRequest = Schema.Struct({
  configId: Schema.String.pipe(T.HttpPath("configId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/token_validation/config/{configId}",
  }),
) as unknown as Schema.Schema<GetConfigurationRequest>;

export interface GetConfigurationResponse {
  /** UUID. */
  id: string;
  createdAt: string;
  credentials: {
    keys: (
      | {
          alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512";
          e: string;
          kid: string;
          kty: "RSA";
          n: string;
        }
      | {
          alg: "ES256";
          crv: "P-256";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
      | {
          alg: "ES384";
          crv: "P-384";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
    )[];
  };
  description: string;
  lastUpdated: string;
  title: string;
  tokenSources: string[];
  tokenType: "JWT";
}

export const GetConfigurationResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  credentials: Schema.Struct({
    keys: Schema.Array(
      Schema.Union([
        Schema.Struct({
          alg: Schema.Literals([
            "RS256",
            "RS384",
            "RS512",
            "PS256",
            "PS384",
            "PS512",
          ]),
          e: Schema.String,
          kid: Schema.String,
          kty: Schema.Literal("RSA"),
          n: Schema.String,
        }),
        Schema.Struct({
          alg: Schema.Literal("ES256"),
          crv: Schema.Literal("P-256"),
          kid: Schema.String,
          kty: Schema.Literal("EC"),
          x: Schema.String,
          y: Schema.String,
        }),
        Schema.Struct({
          alg: Schema.Literal("ES384"),
          crv: Schema.Literal("P-384"),
          kid: Schema.String,
          kty: Schema.Literal("EC"),
          x: Schema.String,
          y: Schema.String,
        }),
      ]),
    ),
  }),
  description: Schema.String,
  lastUpdated: Schema.String,
  title: Schema.String,
  tokenSources: Schema.Array(Schema.String),
  tokenType: Schema.Literal("JWT"),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    lastUpdated: "last_updated",
    tokenSources: "token_sources",
    tokenType: "token_type",
  }),
) as unknown as Schema.Schema<GetConfigurationResponse>;

export const getConfiguration: (
  input: GetConfigurationRequest,
) => Effect.Effect<
  GetConfigurationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [],
}));

export interface ListConfigurationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
}

export const ListConfigurationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/token_validation/config" }),
) as unknown as Schema.Schema<ListConfigurationsRequest>;

export type ListConfigurationsResponse = {
  id: string;
  createdAt: string;
  credentials: {
    keys: (
      | {
          alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512";
          e: string;
          kid: string;
          kty: "RSA";
          n: string;
        }
      | {
          alg: "ES256";
          crv: "P-256";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
      | {
          alg: "ES384";
          crv: "P-384";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
    )[];
  };
  description: string;
  lastUpdated: string;
  title: string;
  tokenSources: string[];
  tokenType: "JWT";
}[];

export const ListConfigurationsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String,
    credentials: Schema.Struct({
      keys: Schema.Array(
        Schema.Union([
          Schema.Struct({
            alg: Schema.Literals([
              "RS256",
              "RS384",
              "RS512",
              "PS256",
              "PS384",
              "PS512",
            ]),
            e: Schema.String,
            kid: Schema.String,
            kty: Schema.Literal("RSA"),
            n: Schema.String,
          }),
          Schema.Struct({
            alg: Schema.Literal("ES256"),
            crv: Schema.Literal("P-256"),
            kid: Schema.String,
            kty: Schema.Literal("EC"),
            x: Schema.String,
            y: Schema.String,
          }),
          Schema.Struct({
            alg: Schema.Literal("ES384"),
            crv: Schema.Literal("P-384"),
            kid: Schema.String,
            kty: Schema.Literal("EC"),
            x: Schema.String,
            y: Schema.String,
          }),
        ]),
      ),
    }),
    description: Schema.String,
    lastUpdated: Schema.String,
    title: Schema.String,
    tokenSources: Schema.Array(Schema.String),
    tokenType: Schema.Literal("JWT"),
  }).pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      lastUpdated: "last_updated",
      tokenSources: "token_sources",
      tokenType: "token_type",
    }),
  ),
) as unknown as Schema.Schema<ListConfigurationsResponse>;

export const listConfigurations: (
  input: ListConfigurationsRequest,
) => Effect.Effect<
  ListConfigurationsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListConfigurationsRequest,
  output: ListConfigurationsResponse,
  errors: [],
}));

export interface CreateConfigurationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  credentials: {
    keys: (
      | {
          alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512";
          e: string;
          kid: string;
          kty: "RSA";
          n: string;
        }
      | {
          alg: "ES256";
          crv: "P-256";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
      | {
          alg: "ES384";
          crv: "P-384";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
    )[];
  };
  /** Body param: */
  description: string;
  /** Body param: */
  title: string;
  /** Body param: */
  tokenSources: string[];
  /** Body param: */
  tokenType: "JWT";
}

export const CreateConfigurationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  credentials: Schema.Struct({
    keys: Schema.Array(
      Schema.Union([
        Schema.Struct({
          alg: Schema.Literals([
            "RS256",
            "RS384",
            "RS512",
            "PS256",
            "PS384",
            "PS512",
          ]),
          e: Schema.String,
          kid: Schema.String,
          kty: Schema.Literal("RSA"),
          n: Schema.String,
        }),
        Schema.Struct({
          alg: Schema.Literal("ES256"),
          crv: Schema.Literal("P-256"),
          kid: Schema.String,
          kty: Schema.Literal("EC"),
          x: Schema.String,
          y: Schema.String,
        }),
        Schema.Struct({
          alg: Schema.Literal("ES384"),
          crv: Schema.Literal("P-384"),
          kid: Schema.String,
          kty: Schema.Literal("EC"),
          x: Schema.String,
          y: Schema.String,
        }),
      ]),
    ),
  }),
  description: Schema.String,
  title: Schema.String,
  tokenSources: Schema.Array(Schema.String),
  tokenType: Schema.Literal("JWT"),
}).pipe(
  Schema.encodeKeys({ tokenSources: "token_sources", tokenType: "token_type" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/token_validation/config" }),
) as unknown as Schema.Schema<CreateConfigurationRequest>;

export interface CreateConfigurationResponse {
  /** UUID. */
  id: string;
  createdAt: string;
  credentials: {
    keys: (
      | {
          alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512";
          e: string;
          kid: string;
          kty: "RSA";
          n: string;
        }
      | {
          alg: "ES256";
          crv: "P-256";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
      | {
          alg: "ES384";
          crv: "P-384";
          kid: string;
          kty: "EC";
          x: string;
          y: string;
        }
    )[];
  };
  description: string;
  lastUpdated: string;
  title: string;
  tokenSources: string[];
  tokenType: "JWT";
}

export const CreateConfigurationResponse = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  credentials: Schema.Struct({
    keys: Schema.Array(
      Schema.Union([
        Schema.Struct({
          alg: Schema.Literals([
            "RS256",
            "RS384",
            "RS512",
            "PS256",
            "PS384",
            "PS512",
          ]),
          e: Schema.String,
          kid: Schema.String,
          kty: Schema.Literal("RSA"),
          n: Schema.String,
        }),
        Schema.Struct({
          alg: Schema.Literal("ES256"),
          crv: Schema.Literal("P-256"),
          kid: Schema.String,
          kty: Schema.Literal("EC"),
          x: Schema.String,
          y: Schema.String,
        }),
        Schema.Struct({
          alg: Schema.Literal("ES384"),
          crv: Schema.Literal("P-384"),
          kid: Schema.String,
          kty: Schema.Literal("EC"),
          x: Schema.String,
          y: Schema.String,
        }),
      ]),
    ),
  }),
  description: Schema.String,
  lastUpdated: Schema.String,
  title: Schema.String,
  tokenSources: Schema.Array(Schema.String),
  tokenType: Schema.Literal("JWT"),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    lastUpdated: "last_updated",
    tokenSources: "token_sources",
    tokenType: "token_type",
  }),
) as unknown as Schema.Schema<CreateConfigurationResponse>;

export const createConfiguration: (
  input: CreateConfigurationRequest,
) => Effect.Effect<
  CreateConfigurationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateConfigurationRequest,
  output: CreateConfigurationResponse,
  errors: [],
}));

export interface PatchConfigurationRequest {
  configId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  description?: string;
  /** Body param: */
  title?: string;
  /** Body param: */
  tokenSources?: string[];
}

export const PatchConfigurationRequest = Schema.Struct({
  configId: Schema.String.pipe(T.HttpPath("configId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  tokenSources: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({ tokenSources: "token_sources" }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/token_validation/config/{configId}",
  }),
) as unknown as Schema.Schema<PatchConfigurationRequest>;

export interface PatchConfigurationResponse {
  description?: string;
  title?: string;
  tokenSources?: string[];
}

export const PatchConfigurationResponse = Schema.Struct({
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  tokenSources: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({ tokenSources: "token_sources" }),
) as unknown as Schema.Schema<PatchConfigurationResponse>;

export const patchConfiguration: (
  input: PatchConfigurationRequest,
) => Effect.Effect<
  PatchConfigurationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchConfigurationRequest,
  output: PatchConfigurationResponse,
  errors: [],
}));

export interface DeleteConfigurationRequest {
  configId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteConfigurationRequest = Schema.Struct({
  configId: Schema.String.pipe(T.HttpPath("configId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/token_validation/config/{configId}",
  }),
) as unknown as Schema.Schema<DeleteConfigurationRequest>;

export interface DeleteConfigurationResponse {
  /** UUID. */
  id?: string;
}

export const DeleteConfigurationResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteConfigurationResponse>;

export const deleteConfiguration: (
  input: DeleteConfigurationRequest,
) => Effect.Effect<
  DeleteConfigurationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteConfigurationRequest,
  output: DeleteConfigurationResponse,
  errors: [],
}));

// =============================================================================
// ConfigurationCredential
// =============================================================================

export interface PutConfigurationCredentialRequest {
  configId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  keys: (
    | {
        alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512";
        e: string;
        kid: string;
        kty: "RSA";
        n: string;
      }
    | {
        alg: "ES256";
        crv: "P-256";
        kid: string;
        kty: "EC";
        x: string;
        y: string;
      }
    | {
        alg: "ES384";
        crv: "P-384";
        kid: string;
        kty: "EC";
        x: string;
        y: string;
      }
  )[];
}

export const PutConfigurationCredentialRequest = Schema.Struct({
  configId: Schema.String.pipe(T.HttpPath("configId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  keys: Schema.Array(
    Schema.Union([
      Schema.Struct({
        alg: Schema.Literals([
          "RS256",
          "RS384",
          "RS512",
          "PS256",
          "PS384",
          "PS512",
        ]),
        e: Schema.String,
        kid: Schema.String,
        kty: Schema.Literal("RSA"),
        n: Schema.String,
      }),
      Schema.Struct({
        alg: Schema.Literal("ES256"),
        crv: Schema.Literal("P-256"),
        kid: Schema.String,
        kty: Schema.Literal("EC"),
        x: Schema.String,
        y: Schema.String,
      }),
      Schema.Struct({
        alg: Schema.Literal("ES384"),
        crv: Schema.Literal("P-384"),
        kid: Schema.String,
        kty: Schema.Literal("EC"),
        x: Schema.String,
        y: Schema.String,
      }),
    ]),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/token_validation/config/{configId}/credentials",
  }),
) as unknown as Schema.Schema<PutConfigurationCredentialRequest>;

export interface PutConfigurationCredentialResponse {
  errors: unknown;
  keys: (
    | {
        alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512";
        e: string;
        kid: string;
        kty: "RSA";
        n: string;
      }
    | {
        alg: "ES256";
        crv: "P-256";
        kid: string;
        kty: "EC";
        x: string;
        y: string;
      }
    | {
        alg: "ES384";
        crv: "P-384";
        kid: string;
        kty: "EC";
        x: string;
        y: string;
      }
  )[];
  messages: unknown;
  /** Whether the API call was successful. */
  success: true;
}

export const PutConfigurationCredentialResponse = Schema.Struct({
  errors: Schema.Unknown,
  keys: Schema.Array(
    Schema.Union([
      Schema.Struct({
        alg: Schema.Literals([
          "RS256",
          "RS384",
          "RS512",
          "PS256",
          "PS384",
          "PS512",
        ]),
        e: Schema.String,
        kid: Schema.String,
        kty: Schema.Literal("RSA"),
        n: Schema.String,
      }),
      Schema.Struct({
        alg: Schema.Literal("ES256"),
        crv: Schema.Literal("P-256"),
        kid: Schema.String,
        kty: Schema.Literal("EC"),
        x: Schema.String,
        y: Schema.String,
      }),
      Schema.Struct({
        alg: Schema.Literal("ES384"),
        crv: Schema.Literal("P-384"),
        kid: Schema.String,
        kty: Schema.Literal("EC"),
        x: Schema.String,
        y: Schema.String,
      }),
    ]),
  ),
  messages: Schema.Unknown,
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<PutConfigurationCredentialResponse>;

export const putConfigurationCredential: (
  input: PutConfigurationCredentialRequest,
) => Effect.Effect<
  PutConfigurationCredentialResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutConfigurationCredentialRequest,
  output: PutConfigurationCredentialResponse,
  errors: [],
}));

// =============================================================================
// EditRule
// =============================================================================

export interface BulkEditRulesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: {
    id: string;
    action?: "log" | "block";
    description?: string;
    enabled?: boolean;
    expression?: string;
    position?: { index: number } | { before?: string } | { after?: string };
    selector?: {
      exclude?: { operationIds?: string[] }[] | null;
      include?: { host?: string[] }[] | null;
    };
    title?: string;
  }[];
}

export const BulkEditRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      action: Schema.optional(Schema.Literals(["log", "block"])),
      description: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
      expression: Schema.optional(Schema.String),
      position: Schema.optional(
        Schema.Union([
          Schema.Struct({
            index: Schema.Number,
          }),
          Schema.Struct({
            before: Schema.optional(Schema.String),
          }),
          Schema.Struct({
            after: Schema.optional(Schema.String),
          }),
        ]),
      ),
      selector: Schema.optional(
        Schema.Struct({
          exclude: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  operationIds: Schema.optional(Schema.Array(Schema.String)),
                }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
              ),
              Schema.Null,
            ]),
          ),
          include: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  host: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
      ),
      title: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/token_validation/rules/bulk",
  }),
) as unknown as Schema.Schema<BulkEditRulesRequest>;

export type BulkEditRulesResponse = {
  action: "log" | "block";
  description: string;
  enabled: boolean;
  expression: string;
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  title: string;
  id?: string;
  createdAt?: string;
  lastUpdated?: string;
}[];

export const BulkEditRulesResponse = Schema.Array(
  Schema.Struct({
    action: Schema.Literals(["log", "block"]),
    description: Schema.String,
    enabled: Schema.Boolean,
    expression: Schema.String,
    selector: Schema.Struct({
      exclude: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              operationIds: Schema.optional(Schema.Array(Schema.String)),
            }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
          ),
          Schema.Null,
        ]),
      ),
      include: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    title: Schema.String,
    id: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({ createdAt: "created_at", lastUpdated: "last_updated" }),
  ),
) as unknown as Schema.Schema<BulkEditRulesResponse>;

export const bulkEditRules: (
  input: BulkEditRulesRequest,
) => Effect.Effect<
  BulkEditRulesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkEditRulesRequest,
  output: BulkEditRulesResponse,
  errors: [],
}));

// =============================================================================
// Rule
// =============================================================================

export interface GetRuleRequest {
  ruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/token_validation/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<GetRuleRequest>;

export interface GetRuleResponse {
  /** Action to take on requests that match operations included in `selector` and fail `expression`. */
  action: "log" | "block";
  /** A human-readable description that gives more details than `title`. */
  description: string;
  /** Toggle rule on or off. */
  enabled: boolean;
  /** Rule expression. Requests that fail to match this expression will be subject to `action`.  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/j */
  expression: string;
  /** Select operations covered by this rule.  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/). */
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  /** A human-readable name for the rule. */
  title: string;
  /** UUID. */
  id?: string;
  createdAt?: string;
  lastUpdated?: string;
}

export const GetRuleResponse = Schema.Struct({
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(Schema.Array(Schema.String)),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
  id: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ createdAt: "created_at", lastUpdated: "last_updated" }),
) as unknown as Schema.Schema<GetRuleResponse>;

export const getRule: (
  input: GetRuleRequest,
) => Effect.Effect<
  GetRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [],
}));

export interface ListRulesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Select rules with these IDs. */
  id?: string;
  /** Query param: Action to take on requests that match operations included in `selector` and fail `expression`. */
  action?: "log" | "block";
  /** Query param: Toggle rule on or off. */
  enabled?: boolean;
  /** Query param: Select rules with this host in `include`. */
  host?: string;
  /** Query param: Select rules with this host in `include`. */
  hostname?: string;
  /** Query param: Select rules with these IDs. */
  ruleId?: string;
  /** Query param: Select rules using any of these token configurations. */
  tokenConfiguration?: string[];
}

export const ListRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  action: Schema.optional(Schema.Literals(["log", "block"])).pipe(
    T.HttpQuery("action"),
  ),
  enabled: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enabled")),
  host: Schema.optional(Schema.String).pipe(T.HttpQuery("host")),
  hostname: Schema.optional(Schema.String).pipe(T.HttpQuery("hostname")),
  ruleId: Schema.optional(Schema.String).pipe(T.HttpQuery("rule_id")),
  tokenConfiguration: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("token_configuration"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/token_validation/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export type ListRulesResponse = {
  action: "log" | "block";
  description: string;
  enabled: boolean;
  expression: string;
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  title: string;
  id?: string;
  createdAt?: string;
  lastUpdated?: string;
}[];

export const ListRulesResponse = Schema.Array(
  Schema.Struct({
    action: Schema.Literals(["log", "block"]),
    description: Schema.String,
    enabled: Schema.Boolean,
    expression: Schema.String,
    selector: Schema.Struct({
      exclude: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              operationIds: Schema.optional(Schema.Array(Schema.String)),
            }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
          ),
          Schema.Null,
        ]),
      ),
      include: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    title: Schema.String,
    id: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({ createdAt: "created_at", lastUpdated: "last_updated" }),
  ),
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

export interface CreateRuleRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Action to take on requests that match operations included in `selector` and fail `expression`. */
  action: "log" | "block";
  /** Body param: A human-readable description that gives more details than `title`. */
  description: string;
  /** Body param: Toggle rule on or off. */
  enabled: boolean;
  /** Body param: Rule expression. Requests that fail to match this expression will be subject to `action`.  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shiel */
  expression: string;
  /** Body param: Select operations covered by this rule.  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/). */
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  /** Body param: A human-readable name for the rule. */
  title: string;
}

export const CreateRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(Schema.Array(Schema.String)),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/token_validation/rules" }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export interface CreateRuleResponse {
  /** Action to take on requests that match operations included in `selector` and fail `expression`. */
  action: "log" | "block";
  /** A human-readable description that gives more details than `title`. */
  description: string;
  /** Toggle rule on or off. */
  enabled: boolean;
  /** Rule expression. Requests that fail to match this expression will be subject to `action`.  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/j */
  expression: string;
  /** Select operations covered by this rule.  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/). */
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  /** A human-readable name for the rule. */
  title: string;
  /** UUID. */
  id?: string;
  createdAt?: string;
  lastUpdated?: string;
}

export const CreateRuleResponse = Schema.Struct({
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(Schema.Array(Schema.String)),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
  id: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ createdAt: "created_at", lastUpdated: "last_updated" }),
) as unknown as Schema.Schema<CreateRuleResponse>;

export const createRule: (
  input: CreateRuleRequest,
) => Effect.Effect<
  CreateRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [],
}));

export interface PatchRuleRequest {
  ruleId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Action to take on requests that match operations included in `selector` and fail `expression`. */
  action?: "log" | "block";
  /** Body param: A human-readable description that gives more details than `title`. */
  description?: string;
  /** Body param: Toggle rule on or off. */
  enabled?: boolean;
  /** Body param: Rule expression. Requests that fail to match this expression will be subject to `action`.  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shiel */
  expression?: string;
  /** Body param: Update rule order among zone rules. */
  position?: { index: number } | { before?: string } | { after?: string };
  /** Body param: Select operations covered by this rule.  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/). */
  selector?: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  /** Body param: A human-readable name for the rule. */
  title?: string;
}

export const PatchRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.optional(Schema.Literals(["log", "block"])),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  expression: Schema.optional(Schema.String),
  position: Schema.optional(
    Schema.Union([
      Schema.Struct({
        index: Schema.Number,
      }),
      Schema.Struct({
        before: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        after: Schema.optional(Schema.String),
      }),
    ]),
  ),
  selector: Schema.optional(
    Schema.Struct({
      exclude: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              operationIds: Schema.optional(Schema.Array(Schema.String)),
            }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
          ),
          Schema.Null,
        ]),
      ),
      include: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
  ),
  title: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/token_validation/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<PatchRuleRequest>;

export interface PatchRuleResponse {
  /** Action to take on requests that match operations included in `selector` and fail `expression`. */
  action: "log" | "block";
  /** A human-readable description that gives more details than `title`. */
  description: string;
  /** Toggle rule on or off. */
  enabled: boolean;
  /** Rule expression. Requests that fail to match this expression will be subject to `action`.  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/j */
  expression: string;
  /** Select operations covered by this rule.  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/). */
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  /** A human-readable name for the rule. */
  title: string;
  /** UUID. */
  id?: string;
  createdAt?: string;
  lastUpdated?: string;
}

export const PatchRuleResponse = Schema.Struct({
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(Schema.Array(Schema.String)),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
  id: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ createdAt: "created_at", lastUpdated: "last_updated" }),
) as unknown as Schema.Schema<PatchRuleResponse>;

export const patchRule: (
  input: PatchRuleRequest,
) => Effect.Effect<
  PatchRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchRuleRequest,
  output: PatchRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  ruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/token_validation/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export type DeleteRuleResponse = unknown;

export const DeleteRuleResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteRuleResponse>;

export const deleteRule: (
  input: DeleteRuleRequest,
) => Effect.Effect<
  DeleteRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));

export interface BulkCreateRulesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: {
    action: "log" | "block";
    description: string;
    enabled: boolean;
    expression: string;
    selector: {
      exclude?: { operationIds?: string[] }[] | null;
      include?: { host?: string[] }[] | null;
    };
    title: string;
  }[];
}

export const BulkCreateRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      action: Schema.Literals(["log", "block"]),
      description: Schema.String,
      enabled: Schema.Boolean,
      expression: Schema.String,
      selector: Schema.Struct({
        exclude: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                operationIds: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
            ),
            Schema.Null,
          ]),
        ),
        include: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                host: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      title: Schema.String,
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/token_validation/rules/bulk",
  }),
) as unknown as Schema.Schema<BulkCreateRulesRequest>;

export type BulkCreateRulesResponse = {
  action: "log" | "block";
  description: string;
  enabled: boolean;
  expression: string;
  selector: {
    exclude?: { operationIds?: string[] }[] | null;
    include?: { host?: string[] }[] | null;
  };
  title: string;
  id?: string;
  createdAt?: string;
  lastUpdated?: string;
}[];

export const BulkCreateRulesResponse = Schema.Array(
  Schema.Struct({
    action: Schema.Literals(["log", "block"]),
    description: Schema.String,
    enabled: Schema.Boolean,
    expression: Schema.String,
    selector: Schema.Struct({
      exclude: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              operationIds: Schema.optional(Schema.Array(Schema.String)),
            }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
          ),
          Schema.Null,
        ]),
      ),
      include: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              host: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    title: Schema.String,
    id: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({ createdAt: "created_at", lastUpdated: "last_updated" }),
  ),
) as unknown as Schema.Schema<BulkCreateRulesResponse>;

export const bulkCreateRules: (
  input: BulkCreateRulesRequest,
) => Effect.Effect<
  BulkCreateRulesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkCreateRulesRequest,
  output: BulkCreateRulesResponse,
  errors: [],
}));
