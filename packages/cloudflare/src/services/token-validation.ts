/**
 * Cloudflare TOKEN-VALIDATION API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service token-validation
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Configuration
// =============================================================================

export interface GetConfigurationRequest {
  configId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetConfigurationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetConfigurationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        credentials: "credentials",
        description: "description",
        lastUpdated: "last_updated",
        title: "title",
        tokenSources: "token_sources",
        tokenType: "token_type",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetConfigurationResponse>;

export type GetConfigurationError = DefaultErrors;

export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [],
}));

export interface ListConfigurationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
}

export const ListConfigurationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/token_validation/config" }),
  ) as unknown as Schema.Schema<ListConfigurationsRequest>;

export interface ListConfigurationsResponse {
  result: {
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
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListConfigurationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
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
          id: "id",
          createdAt: "created_at",
          credentials: "credentials",
          description: "description",
          lastUpdated: "last_updated",
          title: "title",
          tokenSources: "token_sources",
          tokenType: "token_type",
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
  ) as unknown as Schema.Schema<ListConfigurationsResponse>;

export type ListConfigurationsError = DefaultErrors;

export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListConfigurationsRequest,
  ) => stream.Stream<
    ListConfigurationsResponse,
    ListConfigurationsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListConfigurationsRequest,
  ) => stream.Stream<
    {
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
    },
    ListConfigurationsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationsRequest,
  output: ListConfigurationsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateConfigurationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    Schema.encodeKeys({
      credentials: "credentials",
      description: "description",
      title: "title",
      tokenSources: "token_sources",
      tokenType: "token_type",
    }),
    T.Http({
      method: "POST",
      path: "/zones/{zone_id}/token_validation/config",
    }),
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

export const CreateConfigurationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        credentials: "credentials",
        description: "description",
        lastUpdated: "last_updated",
        title: "title",
        tokenSources: "token_sources",
        tokenType: "token_type",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateConfigurationResponse>;

export type CreateConfigurationError = DefaultErrors;

export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  CreateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchConfigurationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configId: Schema.String.pipe(T.HttpPath("configId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    description: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    tokenSources: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      description: "description",
      title: "title",
      tokenSources: "token_sources",
    }),
    T.Http({
      method: "PATCH",
      path: "/zones/{zone_id}/token_validation/config/{configId}",
    }),
  ) as unknown as Schema.Schema<PatchConfigurationRequest>;

export interface PatchConfigurationResponse {
  description?: string | null;
  title?: string | null;
  tokenSources?: string[] | null;
}

export const PatchConfigurationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    title: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    tokenSources: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        description: "description",
        title: "title",
        tokenSources: "token_sources",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchConfigurationResponse>;

export type PatchConfigurationError = DefaultErrors;

export const patchConfiguration: API.OperationMethod<
  PatchConfigurationRequest,
  PatchConfigurationResponse,
  PatchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchConfigurationRequest,
  output: PatchConfigurationResponse,
  errors: [],
}));

export interface DeleteConfigurationRequest {
  configId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteConfigurationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const DeleteConfigurationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteConfigurationResponse>;

export type DeleteConfigurationError = DefaultErrors;

export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  DeleteConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PutConfigurationCredentialRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const PutConfigurationCredentialResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export type PutConfigurationCredentialError = DefaultErrors;

export const putConfigurationCredential: API.OperationMethod<
  PutConfigurationCredentialRequest,
  PutConfigurationCredentialResponse,
  PutConfigurationCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutConfigurationCredentialRequest,
  output: PutConfigurationCredentialResponse,
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

export const GetRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    exclude?: { operationIds?: string[] | null }[] | null;
    include?: { host?: string[] | null }[] | null;
  };
  /** A human-readable name for the rule. */
  title: string;
  /** UUID. */
  id?: string | null;
  createdAt?: string | null;
  lastUpdated?: string | null;
}

export const GetRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      selector: "selector",
      title: "title",
      id: "id",
      createdAt: "created_at",
      lastUpdated: "last_updated",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetRuleResponse>;

export type GetRuleError = DefaultErrors;

export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export interface ListRulesResponse {
  result: {
    action: "log" | "block";
    description: string;
    enabled: boolean;
    expression: string;
    selector: {
      exclude?: { operationIds?: string[] | null }[] | null;
      include?: { host?: string[] | null }[] | null;
    };
    title: string;
    id?: string | null;
    createdAt?: string | null;
    lastUpdated?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
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
                operationIds: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
              }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
            ),
            Schema.Null,
          ]),
        ),
        include: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                host: Schema.optional(
                  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                ),
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      title: Schema.String,
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        action: "action",
        description: "description",
        enabled: "enabled",
        expression: "expression",
        selector: "selector",
        title: "title",
        id: "id",
        createdAt: "created_at",
        lastUpdated: "last_updated",
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
) as unknown as Schema.Schema<ListRulesResponse>;

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
      action: "log" | "block";
      description: string;
      enabled: boolean;
      expression: string;
      selector: {
        exclude?: { operationIds?: string[] | null }[] | null;
        include?: { host?: string[] | null }[] | null;
      };
      title: string;
      id?: string | null;
      createdAt?: string | null;
      lastUpdated?: string | null;
    },
    ListRulesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    exclude?: { operationIds?: string[] | null }[] | null;
    include?: { host?: string[] | null }[] | null;
  };
  /** A human-readable name for the rule. */
  title: string;
  /** UUID. */
  id?: string | null;
  createdAt?: string | null;
  lastUpdated?: string | null;
}

export const CreateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      selector: "selector",
      title: "title",
      id: "id",
      createdAt: "created_at",
      lastUpdated: "last_updated",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateRuleResponse>;

export type CreateRuleError = DefaultErrors;

export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    exclude?: { operationIds?: string[] | null }[] | null;
    include?: { host?: string[] | null }[] | null;
  };
  /** A human-readable name for the rule. */
  title: string;
  /** UUID. */
  id?: string | null;
  createdAt?: string | null;
  lastUpdated?: string | null;
}

export const PatchRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  action: Schema.Literals(["log", "block"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  selector: Schema.Struct({
    exclude: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            operationIds: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
        ),
        Schema.Null,
      ]),
    ),
    include: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            host: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  title: Schema.String,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  lastUpdated: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      action: "action",
      description: "description",
      enabled: "enabled",
      expression: "expression",
      selector: "selector",
      title: "title",
      id: "id",
      createdAt: "created_at",
      lastUpdated: "last_updated",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PatchRuleResponse>;

export type PatchRuleError = DefaultErrors;

export const patchRule: API.OperationMethod<
  PatchRuleRequest,
  PatchRuleResponse,
  PatchRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchRuleRequest,
  output: PatchRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  ruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError = DefaultErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const BulkCreateRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/token_validation/rules/bulk",
  }),
) as unknown as Schema.Schema<BulkCreateRulesRequest>;

export interface BulkCreateRulesResponse {
  result: {
    action: "log" | "block";
    description: string;
    enabled: boolean;
    expression: string;
    selector: {
      exclude?: { operationIds?: string[] | null }[] | null;
      include?: { host?: string[] | null }[] | null;
    };
    title: string;
    id?: string | null;
    createdAt?: string | null;
    lastUpdated?: string | null;
  }[];
}

export const BulkCreateRulesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
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
                  operationIds: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
              ),
              Schema.Null,
            ]),
          ),
          include: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  host: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        title: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lastUpdated: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          action: "action",
          description: "description",
          enabled: "enabled",
          expression: "expression",
          selector: "selector",
          title: "title",
          id: "id",
          createdAt: "created_at",
          lastUpdated: "last_updated",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<BulkCreateRulesResponse>;

export type BulkCreateRulesError = DefaultErrors;

export const bulkCreateRules: API.PaginatedOperationMethod<
  BulkCreateRulesRequest,
  BulkCreateRulesResponse,
  BulkCreateRulesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: BulkCreateRulesRequest,
  ) => stream.Stream<
    BulkCreateRulesResponse,
    BulkCreateRulesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: BulkCreateRulesRequest,
  ) => stream.Stream<
    {
      action: "log" | "block";
      description: string;
      enabled: boolean;
      expression: string;
      selector: {
        exclude?: { operationIds?: string[] | null }[] | null;
        include?: { host?: string[] | null }[] | null;
      };
      title: string;
      id?: string | null;
      createdAt?: string | null;
      lastUpdated?: string | null;
    },
    BulkCreateRulesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: BulkCreateRulesRequest,
  output: BulkCreateRulesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface BulkPatchRulesRequest {
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

export const BulkPatchRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    method: "PATCH",
    path: "/zones/{zone_id}/token_validation/rules/bulk",
  }),
) as unknown as Schema.Schema<BulkPatchRulesRequest>;

export interface BulkPatchRulesResponse {
  result: {
    action: "log" | "block";
    description: string;
    enabled: boolean;
    expression: string;
    selector: {
      exclude?: { operationIds?: string[] | null }[] | null;
      include?: { host?: string[] | null }[] | null;
    };
    title: string;
    id?: string | null;
    createdAt?: string | null;
    lastUpdated?: string | null;
  }[];
}

export const BulkPatchRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
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
                  operationIds: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }).pipe(Schema.encodeKeys({ operationIds: "operation_ids" })),
              ),
              Schema.Null,
            ]),
          ),
          include: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  host: Schema.optional(
                    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        title: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lastUpdated: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          action: "action",
          description: "description",
          enabled: "enabled",
          expression: "expression",
          selector: "selector",
          title: "title",
          id: "id",
          createdAt: "created_at",
          lastUpdated: "last_updated",
        }),
      ),
    ),
  },
) as unknown as Schema.Schema<BulkPatchRulesResponse>;

export type BulkPatchRulesError = DefaultErrors;

export const bulkPatchRules: API.PaginatedOperationMethod<
  BulkPatchRulesRequest,
  BulkPatchRulesResponse,
  BulkPatchRulesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: BulkPatchRulesRequest,
  ) => stream.Stream<
    BulkPatchRulesResponse,
    BulkPatchRulesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: BulkPatchRulesRequest,
  ) => stream.Stream<
    {
      action: "log" | "block";
      description: string;
      enabled: boolean;
      expression: string;
      selector: {
        exclude?: { operationIds?: string[] | null }[] | null;
        include?: { host?: string[] | null }[] | null;
      };
      title: string;
      id?: string | null;
      createdAt?: string | null;
      lastUpdated?: string | null;
    },
    BulkPatchRulesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: BulkPatchRulesRequest,
  output: BulkPatchRulesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));
