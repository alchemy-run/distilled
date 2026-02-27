/**
 * Cloudflare API-GATEWAY API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service api-gateway
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

export class InvalidObjectIdentifier extends Schema.TaggedErrorClass<InvalidObjectIdentifier>()(
  "InvalidObjectIdentifier",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidObjectIdentifier, [{ code: 7003 }]);

export class NotEntitled extends Schema.TaggedErrorClass<NotEntitled>()(
  "NotEntitled",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(NotEntitled, [{ code: 10403 }]);

export class OperationNotFound extends Schema.TaggedErrorClass<OperationNotFound>()(
  "OperationNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(OperationNotFound, [{ code: 10404 }]);

export class SchemaNotFound extends Schema.TaggedErrorClass<SchemaNotFound>()(
  "SchemaNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(SchemaNotFound, [{ code: 19400 }]);

// =============================================================================
// Configuration
// =============================================================================

export interface GetConfigurationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Ensures that the configuration is written or retrieved in normalized fashion */
  normalize?: boolean;
}

export const GetConfigurationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  normalize: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("normalize")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/api_gateway/configuration" }),
) as unknown as Schema.Schema<GetConfigurationRequest>;

export interface GetConfigurationResponse {
  authIdCharacteristics: (
    | { name: string; type: "header" | "cookie" }
    | { name: string; type: "jwt" }
  )[];
}

export const GetConfigurationResponse = Schema.Struct({
  authIdCharacteristics: Schema.Array(
    Schema.Union([
      Schema.Struct({
        name: Schema.String,
        type: Schema.Literals(["header", "cookie"]),
      }),
      Schema.Struct({
        name: Schema.String,
        type: Schema.Literal("jwt"),
      }),
    ]),
  ),
}).pipe(
  Schema.encodeKeys({ authIdCharacteristics: "auth_id_characteristics" }),
) as unknown as Schema.Schema<GetConfigurationResponse>;

export type GetConfigurationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | NotEntitled;

export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [InvalidObjectIdentifier, NotEntitled],
}));

export interface PutConfigurationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Ensures that the configuration is written or retrieved in normalized fashion */
  normalize?: boolean;
  /** Body param: */
  authIdCharacteristics: (
    | { name: string; type: "header" | "cookie" }
    | { name: string; type: "jwt" }
  )[];
}

export const PutConfigurationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  normalize: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("normalize")),
  authIdCharacteristics: Schema.Array(
    Schema.Union([
      Schema.Struct({
        name: Schema.String,
        type: Schema.Literals(["header", "cookie"]),
      }),
      Schema.Struct({
        name: Schema.String,
        type: Schema.Literal("jwt"),
      }),
    ]),
  ),
}).pipe(
  Schema.encodeKeys({ authIdCharacteristics: "auth_id_characteristics" }),
  T.Http({ method: "PUT", path: "/zones/{zone_id}/api_gateway/configuration" }),
) as unknown as Schema.Schema<PutConfigurationRequest>;

export interface PutConfigurationResponse {
  authIdCharacteristics: (
    | { name: string; type: "header" | "cookie" }
    | { name: string; type: "jwt" }
  )[];
}

export const PutConfigurationResponse = Schema.Struct({
  authIdCharacteristics: Schema.Array(
    Schema.Union([
      Schema.Struct({
        name: Schema.String,
        type: Schema.Literals(["header", "cookie"]),
      }),
      Schema.Struct({
        name: Schema.String,
        type: Schema.Literal("jwt"),
      }),
    ]),
  ),
}).pipe(
  Schema.encodeKeys({ authIdCharacteristics: "auth_id_characteristics" }),
) as unknown as Schema.Schema<PutConfigurationResponse>;

export type PutConfigurationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | NotEntitled;

export const putConfiguration: API.OperationMethod<
  PutConfigurationRequest,
  PutConfigurationResponse,
  PutConfigurationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutConfigurationRequest,
  output: PutConfigurationResponse,
  errors: [InvalidObjectIdentifier, NotEntitled],
}));

// =============================================================================
// Discovery
// =============================================================================

export interface GetDiscoveryRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetDiscoveryRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/api_gateway/discovery" }),
) as unknown as Schema.Schema<GetDiscoveryRequest>;

export interface GetDiscoveryResponse {
  schemas: unknown[];
  timestamp: string;
}

export const GetDiscoveryResponse = Schema.Struct({
  schemas: Schema.Array(Schema.Unknown),
  timestamp: Schema.String,
}) as unknown as Schema.Schema<GetDiscoveryResponse>;

export type GetDiscoveryError =
  | CommonErrors
  | InvalidObjectIdentifier
  | NotEntitled;

export const getDiscovery: API.OperationMethod<
  GetDiscoveryRequest,
  GetDiscoveryResponse,
  GetDiscoveryError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDiscoveryRequest,
  output: GetDiscoveryResponse,
  errors: [InvalidObjectIdentifier, NotEntitled],
}));

// =============================================================================
// DiscoveryOperation
// =============================================================================

export interface ListDiscoveryOperationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: When `true`, only return API Discovery results that are not saved into API Shield Endpoint Management */
  diff?: boolean;
  /** Query param: Direction to order results. */
  direction?: "asc" | "desc";
  /** Query param: Filter results to only include endpoints containing this pattern. */
  endpoint?: string;
  /** Query param: Filter results to only include the specified hosts. */
  host?: string[];
  /** Query param: Filter results to only include the specified HTTP methods. */
  method?: string[];
  /** Query param: Field to order by */
  order?:
    | "host"
    | "method"
    | "endpoint"
    | "traffic_stats.requests"
    | "traffic_stats.last_updated";
  /** Query param: Filter results to only include discovery results sourced from a particular discovery engine  - `ML` - Discovered operations that were sourced using ML API Discovery - `SessionIdentifier`  */
  origin?: "ML" | "SessionIdentifier" | "LabelDiscovery";
  /** Query param: Filter results to only include discovery results in a particular state. States are as follows  - `review` - Discovered operations that are not saved into API Shield Endpoint Management -  */
  state?: "review" | "saved" | "ignored";
}

export const ListDiscoveryOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  diff: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("diff")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  endpoint: Schema.optional(Schema.String).pipe(T.HttpQuery("endpoint")),
  host: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("host")),
  method: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("method"),
  ),
  order: Schema.optional(
    Schema.Literals([
      "host",
      "method",
      "endpoint",
      "traffic_stats.requests",
      "traffic_stats.last_updated",
    ]),
  ).pipe(T.HttpQuery("order")),
  origin: Schema.optional(
    Schema.Literals(["ML", "SessionIdentifier", "LabelDiscovery"]),
  ).pipe(T.HttpQuery("origin")),
  state: Schema.optional(Schema.Literals(["review", "saved", "ignored"])).pipe(
    T.HttpQuery("state"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/discovery/operations",
  }),
) as unknown as Schema.Schema<ListDiscoveryOperationsRequest>;

export type ListDiscoveryOperationsResponse = unknown;

export const ListDiscoveryOperationsResponse =
  Schema.Unknown as unknown as Schema.Schema<ListDiscoveryOperationsResponse>;

export type ListDiscoveryOperationsError = CommonErrors;

export const listDiscoveryOperations: API.OperationMethod<
  ListDiscoveryOperationsRequest,
  ListDiscoveryOperationsResponse,
  ListDiscoveryOperationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDiscoveryOperationsRequest,
  output: ListDiscoveryOperationsResponse,
  errors: [],
}));

export interface PatchDiscoveryOperationRequest {
  operationId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Mark state of operation in API Discovery  - `review` - Mark operation as for review - `ignored` - Mark operation as ignored */
  state?: "review" | "ignored";
}

export const PatchDiscoveryOperationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  state: Schema.optional(Schema.Literals(["review", "ignored"])),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/api_gateway/discovery/operations/{operationId}",
  }),
) as unknown as Schema.Schema<PatchDiscoveryOperationRequest>;

export interface PatchDiscoveryOperationResponse {
  /** State of operation in API Discovery  - `review` - Operation is not saved into API Shield Endpoint Management - `saved` - Operation is saved into API Shield Endpoint Management - `ignored` - Operation  */
  state?: "review" | "saved" | "ignored";
}

export const PatchDiscoveryOperationResponse = Schema.Struct({
  state: Schema.optional(Schema.Literals(["review", "saved", "ignored"])),
}) as unknown as Schema.Schema<PatchDiscoveryOperationResponse>;

export type PatchDiscoveryOperationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | NotEntitled;

export const patchDiscoveryOperation: API.OperationMethod<
  PatchDiscoveryOperationRequest,
  PatchDiscoveryOperationResponse,
  PatchDiscoveryOperationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDiscoveryOperationRequest,
  output: PatchDiscoveryOperationResponse,
  errors: [InvalidObjectIdentifier, NotEntitled],
}));

export interface BulkPatchDiscoveryOperationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: Record<string, unknown>;
}

export const BulkPatchDiscoveryOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/api_gateway/discovery/operations",
  }),
) as unknown as Schema.Schema<BulkPatchDiscoveryOperationsRequest>;

export type BulkPatchDiscoveryOperationsResponse = Record<string, unknown>;

export const BulkPatchDiscoveryOperationsResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<BulkPatchDiscoveryOperationsResponse>;

export type BulkPatchDiscoveryOperationsError =
  | CommonErrors
  | InvalidObjectIdentifier
  | NotEntitled;

export const bulkPatchDiscoveryOperations: API.OperationMethod<
  BulkPatchDiscoveryOperationsRequest,
  BulkPatchDiscoveryOperationsResponse,
  BulkPatchDiscoveryOperationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkPatchDiscoveryOperationsRequest,
  output: BulkPatchDiscoveryOperationsResponse,
  errors: [InvalidObjectIdentifier, NotEntitled],
}));

// =============================================================================
// ExpressionTemplateFallthrough
// =============================================================================

export interface CreateExpressionTemplateFallthroughRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List of hosts to be targeted in the expression */
  hosts: string[];
}

export const CreateExpressionTemplateFallthroughRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  hosts: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/api_gateway/expression-template/fallthrough",
  }),
) as unknown as Schema.Schema<CreateExpressionTemplateFallthroughRequest>;

export interface CreateExpressionTemplateFallthroughResponse {
  /** WAF Expression for fallthrough */
  expression: string;
  /** Title for the expression */
  title: string;
}

export const CreateExpressionTemplateFallthroughResponse = Schema.Struct({
  expression: Schema.String,
  title: Schema.String,
}) as unknown as Schema.Schema<CreateExpressionTemplateFallthroughResponse>;

export type CreateExpressionTemplateFallthroughError =
  | CommonErrors
  | InvalidObjectIdentifier;

export const createExpressionTemplateFallthrough: API.OperationMethod<
  CreateExpressionTemplateFallthroughRequest,
  CreateExpressionTemplateFallthroughResponse,
  CreateExpressionTemplateFallthroughError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateExpressionTemplateFallthroughRequest,
  output: CreateExpressionTemplateFallthroughResponse,
  errors: [InvalidObjectIdentifier],
}));

// =============================================================================
// Operation
// =============================================================================

export interface GetOperationRequest {
  operationId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the spe */
  feature?: ("thresholds" | "parameter_schemas" | "schema_info")[];
}

export const GetOperationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  feature: Schema.optional(
    Schema.Array(
      Schema.Literals(["thresholds", "parameter_schemas", "schema_info"]),
    ),
  ).pipe(T.HttpQuery("feature")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/operations/{operationId}",
  }),
) as unknown as Schema.Schema<GetOperationRequest>;

export interface GetOperationResponse {
  /** The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-n */
  endpoint: string;
  /** RFC3986-compliant host. */
  host: string;
  lastUpdated: string;
  /** The HTTP method used to access the endpoint. */
  method:
    | "GET"
    | "POST"
    | "HEAD"
    | "OPTIONS"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "PATCH"
    | "TRACE";
  /** UUID. */
  operationId: string;
  features?:
    | {
        thresholds?: {
          authIdTokens?: number;
          dataPoints?: number;
          lastUpdated?: string;
          p50?: number;
          p90?: number;
          p99?: number;
          periodSeconds?: number;
          requests?: number;
          suggestedThreshold?: number;
        };
      }
    | {
        parameterSchemas: {
          lastUpdated?: string;
          parameterSchemas?: { parameters?: unknown[]; responses?: null };
        };
      }
    | { apiRouting?: { lastUpdated?: string; route?: string } }
    | {
        confidenceIntervals?: {
          lastUpdated?: string;
          suggestedThreshold?: {
            confidenceIntervals?: {
              p90?: { lower?: number; upper?: number };
              p95?: { lower?: number; upper?: number };
              p99?: { lower?: number; upper?: number };
            };
            mean?: number;
          };
        };
      }
    | {
        schemaInfo?: {
          activeSchema?: {
            id?: string;
            createdAt?: string;
            isLearned?: boolean;
            name?: string;
          };
          learnedAvailable?: boolean;
          mitigationAction?: "none" | "log" | "block" | null;
        };
      };
}

export const GetOperationResponse = Schema.Struct({
  endpoint: Schema.String,
  host: Schema.String,
  lastUpdated: Schema.String,
  method: Schema.Literals([
    "GET",
    "POST",
    "HEAD",
    "OPTIONS",
    "PUT",
    "DELETE",
    "CONNECT",
    "PATCH",
    "TRACE",
  ]),
  operationId: Schema.String,
  features: Schema.optional(
    Schema.Union([
      Schema.Struct({
        thresholds: Schema.optional(
          Schema.Struct({
            authIdTokens: Schema.optional(Schema.Number),
            dataPoints: Schema.optional(Schema.Number),
            lastUpdated: Schema.optional(Schema.String),
            p50: Schema.optional(Schema.Number),
            p90: Schema.optional(Schema.Number),
            p99: Schema.optional(Schema.Number),
            periodSeconds: Schema.optional(Schema.Number),
            requests: Schema.optional(Schema.Number),
            suggestedThreshold: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              authIdTokens: "auth_id_tokens",
              dataPoints: "data_points",
              lastUpdated: "last_updated",
              p50: "p50",
              p90: "p90",
              p99: "p99",
              periodSeconds: "period_seconds",
              requests: "requests",
              suggestedThreshold: "suggested_threshold",
            }),
          ),
        ),
      }),
      Schema.Struct({
        parameterSchemas: Schema.Struct({
          lastUpdated: Schema.optional(Schema.String),
          parameterSchemas: Schema.optional(
            Schema.Struct({
              parameters: Schema.optional(Schema.Array(Schema.Unknown)),
              responses: Schema.optional(Schema.Null),
            }),
          ),
        }).pipe(
          Schema.encodeKeys({
            lastUpdated: "last_updated",
            parameterSchemas: "parameter_schemas",
          }),
        ),
      }).pipe(Schema.encodeKeys({ parameterSchemas: "parameter_schemas" })),
      Schema.Struct({
        apiRouting: Schema.optional(
          Schema.Struct({
            lastUpdated: Schema.optional(Schema.String),
            route: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({ lastUpdated: "last_updated", route: "route" }),
          ),
        ),
      }).pipe(Schema.encodeKeys({ apiRouting: "api_routing" })),
      Schema.Struct({
        confidenceIntervals: Schema.optional(
          Schema.Struct({
            lastUpdated: Schema.optional(Schema.String),
            suggestedThreshold: Schema.optional(
              Schema.Struct({
                confidenceIntervals: Schema.optional(
                  Schema.Struct({
                    p90: Schema.optional(
                      Schema.Struct({
                        lower: Schema.optional(Schema.Number),
                        upper: Schema.optional(Schema.Number),
                      }),
                    ),
                    p95: Schema.optional(
                      Schema.Struct({
                        lower: Schema.optional(Schema.Number),
                        upper: Schema.optional(Schema.Number),
                      }),
                    ),
                    p99: Schema.optional(
                      Schema.Struct({
                        lower: Schema.optional(Schema.Number),
                        upper: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
                mean: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  confidenceIntervals: "confidence_intervals",
                  mean: "mean",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              lastUpdated: "last_updated",
              suggestedThreshold: "suggested_threshold",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({ confidenceIntervals: "confidence_intervals" }),
      ),
      Schema.Struct({
        schemaInfo: Schema.optional(
          Schema.Struct({
            activeSchema: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                createdAt: Schema.optional(Schema.String),
                isLearned: Schema.optional(Schema.Boolean),
                name: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  id: "id",
                  createdAt: "created_at",
                  isLearned: "is_learned",
                  name: "name",
                }),
              ),
            ),
            learnedAvailable: Schema.optional(Schema.Boolean),
            mitigationAction: Schema.optional(
              Schema.Union([
                Schema.Literal("none"),
                Schema.Literal("log"),
                Schema.Literal("block"),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              activeSchema: "active_schema",
              learnedAvailable: "learned_available",
              mitigationAction: "mitigation_action",
            }),
          ),
        ),
      }).pipe(Schema.encodeKeys({ schemaInfo: "schema_info" })),
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    endpoint: "endpoint",
    host: "host",
    lastUpdated: "last_updated",
    method: "method",
    operationId: "operation_id",
    features: "features",
  }),
) as unknown as Schema.Schema<GetOperationResponse>;

export type GetOperationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | OperationNotFound;

export const getOperation: API.OperationMethod<
  GetOperationRequest,
  GetOperationResponse,
  GetOperationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOperationRequest,
  output: GetOperationResponse,
  errors: [InvalidObjectIdentifier, OperationNotFound],
}));

export interface ListOperationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Direction to order results. */
  direction?: "asc" | "desc";
  /** Query param: Filter results to only include endpoints containing this pattern. */
  endpoint?: string;
  /** Query param: Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the spe */
  feature?: ("thresholds" | "parameter_schemas" | "schema_info")[];
  /** Query param: Filter results to only include the specified hosts. */
  host?: string[];
  /** Query param: Filter results to only include the specified HTTP methods. */
  method?: string[];
  /** Query param: Field to order by. When requesting a feature, the feature keys are available for ordering as well, e.g., `thresholds.suggested_threshold`. */
  order?: "method" | "host" | "endpoint" | "thresholds.$key";
}

export const ListOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  endpoint: Schema.optional(Schema.String).pipe(T.HttpQuery("endpoint")),
  feature: Schema.optional(
    Schema.Array(
      Schema.Literals(["thresholds", "parameter_schemas", "schema_info"]),
    ),
  ).pipe(T.HttpQuery("feature")),
  host: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("host")),
  method: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("method"),
  ),
  order: Schema.optional(
    Schema.Literals(["method", "host", "endpoint", "thresholds.$key"]),
  ).pipe(T.HttpQuery("order")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/api_gateway/operations" }),
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = {
  endpoint: string;
  host: string;
  lastUpdated: string;
  method:
    | "GET"
    | "POST"
    | "HEAD"
    | "OPTIONS"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "PATCH"
    | "TRACE";
  operationId: string;
  features?:
    | {
        thresholds?: {
          authIdTokens?: number;
          dataPoints?: number;
          lastUpdated?: string;
          p50?: number;
          p90?: number;
          p99?: number;
          periodSeconds?: number;
          requests?: number;
          suggestedThreshold?: number;
        };
      }
    | {
        parameterSchemas: {
          lastUpdated?: string;
          parameterSchemas?: { parameters?: unknown[]; responses?: null };
        };
      }
    | { apiRouting?: { lastUpdated?: string; route?: string } }
    | {
        confidenceIntervals?: {
          lastUpdated?: string;
          suggestedThreshold?: {
            confidenceIntervals?: {
              p90?: { lower?: number; upper?: number };
              p95?: { lower?: number; upper?: number };
              p99?: { lower?: number; upper?: number };
            };
            mean?: number;
          };
        };
      }
    | {
        schemaInfo?: {
          activeSchema?: {
            id?: string;
            createdAt?: string;
            isLearned?: boolean;
            name?: string;
          };
          learnedAvailable?: boolean;
          mitigationAction?: "none" | "log" | "block" | null;
        };
      };
}[];

export const ListOperationsResponse = Schema.Array(
  Schema.Struct({
    endpoint: Schema.String,
    host: Schema.String,
    lastUpdated: Schema.String,
    method: Schema.Literals([
      "GET",
      "POST",
      "HEAD",
      "OPTIONS",
      "PUT",
      "DELETE",
      "CONNECT",
      "PATCH",
      "TRACE",
    ]),
    operationId: Schema.String,
    features: Schema.optional(
      Schema.Union([
        Schema.Struct({
          thresholds: Schema.optional(
            Schema.Struct({
              authIdTokens: Schema.optional(Schema.Number),
              dataPoints: Schema.optional(Schema.Number),
              lastUpdated: Schema.optional(Schema.String),
              p50: Schema.optional(Schema.Number),
              p90: Schema.optional(Schema.Number),
              p99: Schema.optional(Schema.Number),
              periodSeconds: Schema.optional(Schema.Number),
              requests: Schema.optional(Schema.Number),
              suggestedThreshold: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                authIdTokens: "auth_id_tokens",
                dataPoints: "data_points",
                lastUpdated: "last_updated",
                p50: "p50",
                p90: "p90",
                p99: "p99",
                periodSeconds: "period_seconds",
                requests: "requests",
                suggestedThreshold: "suggested_threshold",
              }),
            ),
          ),
        }),
        Schema.Struct({
          parameterSchemas: Schema.Struct({
            lastUpdated: Schema.optional(Schema.String),
            parameterSchemas: Schema.optional(
              Schema.Struct({
                parameters: Schema.optional(Schema.Array(Schema.Unknown)),
                responses: Schema.optional(Schema.Null),
              }),
            ),
          }).pipe(
            Schema.encodeKeys({
              lastUpdated: "last_updated",
              parameterSchemas: "parameter_schemas",
            }),
          ),
        }).pipe(Schema.encodeKeys({ parameterSchemas: "parameter_schemas" })),
        Schema.Struct({
          apiRouting: Schema.optional(
            Schema.Struct({
              lastUpdated: Schema.optional(Schema.String),
              route: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                lastUpdated: "last_updated",
                route: "route",
              }),
            ),
          ),
        }).pipe(Schema.encodeKeys({ apiRouting: "api_routing" })),
        Schema.Struct({
          confidenceIntervals: Schema.optional(
            Schema.Struct({
              lastUpdated: Schema.optional(Schema.String),
              suggestedThreshold: Schema.optional(
                Schema.Struct({
                  confidenceIntervals: Schema.optional(
                    Schema.Struct({
                      p90: Schema.optional(
                        Schema.Struct({
                          lower: Schema.optional(Schema.Number),
                          upper: Schema.optional(Schema.Number),
                        }),
                      ),
                      p95: Schema.optional(
                        Schema.Struct({
                          lower: Schema.optional(Schema.Number),
                          upper: Schema.optional(Schema.Number),
                        }),
                      ),
                      p99: Schema.optional(
                        Schema.Struct({
                          lower: Schema.optional(Schema.Number),
                          upper: Schema.optional(Schema.Number),
                        }),
                      ),
                    }),
                  ),
                  mean: Schema.optional(Schema.Number),
                }).pipe(
                  Schema.encodeKeys({
                    confidenceIntervals: "confidence_intervals",
                    mean: "mean",
                  }),
                ),
              ),
            }).pipe(
              Schema.encodeKeys({
                lastUpdated: "last_updated",
                suggestedThreshold: "suggested_threshold",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({ confidenceIntervals: "confidence_intervals" }),
        ),
        Schema.Struct({
          schemaInfo: Schema.optional(
            Schema.Struct({
              activeSchema: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  createdAt: Schema.optional(Schema.String),
                  isLearned: Schema.optional(Schema.Boolean),
                  name: Schema.optional(Schema.String),
                }).pipe(
                  Schema.encodeKeys({
                    id: "id",
                    createdAt: "created_at",
                    isLearned: "is_learned",
                    name: "name",
                  }),
                ),
              ),
              learnedAvailable: Schema.optional(Schema.Boolean),
              mitigationAction: Schema.optional(
                Schema.Union([
                  Schema.Literal("none"),
                  Schema.Literal("log"),
                  Schema.Literal("block"),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                activeSchema: "active_schema",
                learnedAvailable: "learned_available",
                mitigationAction: "mitigation_action",
              }),
            ),
          ),
        }).pipe(Schema.encodeKeys({ schemaInfo: "schema_info" })),
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      endpoint: "endpoint",
      host: "host",
      lastUpdated: "last_updated",
      method: "method",
      operationId: "operation_id",
      features: "features",
    }),
  ),
) as unknown as Schema.Schema<ListOperationsResponse>;

export type ListOperationsError = CommonErrors;

export const listOperations: API.OperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
}));

export interface CreateOperationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be  */
  endpoint: string;
  /** Body param: RFC3986-compliant host. */
  host: string;
  /** Body param: The HTTP method used to access the endpoint. */
  method:
    | "GET"
    | "POST"
    | "HEAD"
    | "OPTIONS"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "PATCH"
    | "TRACE";
}

export const CreateOperationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  endpoint: Schema.String,
  host: Schema.String,
  method: Schema.Literals([
    "GET",
    "POST",
    "HEAD",
    "OPTIONS",
    "PUT",
    "DELETE",
    "CONNECT",
    "PATCH",
    "TRACE",
  ]),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/api_gateway/operations/item",
  }),
) as unknown as Schema.Schema<CreateOperationRequest>;

export interface CreateOperationResponse {
  /** The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-n */
  endpoint: string;
  /** RFC3986-compliant host. */
  host: string;
  lastUpdated: string;
  /** The HTTP method used to access the endpoint. */
  method:
    | "GET"
    | "POST"
    | "HEAD"
    | "OPTIONS"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "PATCH"
    | "TRACE";
  /** UUID. */
  operationId: string;
  features?:
    | {
        thresholds?: {
          authIdTokens?: number;
          dataPoints?: number;
          lastUpdated?: string;
          p50?: number;
          p90?: number;
          p99?: number;
          periodSeconds?: number;
          requests?: number;
          suggestedThreshold?: number;
        };
      }
    | {
        parameterSchemas: {
          lastUpdated?: string;
          parameterSchemas?: { parameters?: unknown[]; responses?: null };
        };
      }
    | { apiRouting?: { lastUpdated?: string; route?: string } }
    | {
        confidenceIntervals?: {
          lastUpdated?: string;
          suggestedThreshold?: {
            confidenceIntervals?: {
              p90?: { lower?: number; upper?: number };
              p95?: { lower?: number; upper?: number };
              p99?: { lower?: number; upper?: number };
            };
            mean?: number;
          };
        };
      }
    | {
        schemaInfo?: {
          activeSchema?: {
            id?: string;
            createdAt?: string;
            isLearned?: boolean;
            name?: string;
          };
          learnedAvailable?: boolean;
          mitigationAction?: "none" | "log" | "block" | null;
        };
      };
}

export const CreateOperationResponse = Schema.Struct({
  endpoint: Schema.String,
  host: Schema.String,
  lastUpdated: Schema.String,
  method: Schema.Literals([
    "GET",
    "POST",
    "HEAD",
    "OPTIONS",
    "PUT",
    "DELETE",
    "CONNECT",
    "PATCH",
    "TRACE",
  ]),
  operationId: Schema.String,
  features: Schema.optional(
    Schema.Union([
      Schema.Struct({
        thresholds: Schema.optional(
          Schema.Struct({
            authIdTokens: Schema.optional(Schema.Number),
            dataPoints: Schema.optional(Schema.Number),
            lastUpdated: Schema.optional(Schema.String),
            p50: Schema.optional(Schema.Number),
            p90: Schema.optional(Schema.Number),
            p99: Schema.optional(Schema.Number),
            periodSeconds: Schema.optional(Schema.Number),
            requests: Schema.optional(Schema.Number),
            suggestedThreshold: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              authIdTokens: "auth_id_tokens",
              dataPoints: "data_points",
              lastUpdated: "last_updated",
              p50: "p50",
              p90: "p90",
              p99: "p99",
              periodSeconds: "period_seconds",
              requests: "requests",
              suggestedThreshold: "suggested_threshold",
            }),
          ),
        ),
      }),
      Schema.Struct({
        parameterSchemas: Schema.Struct({
          lastUpdated: Schema.optional(Schema.String),
          parameterSchemas: Schema.optional(
            Schema.Struct({
              parameters: Schema.optional(Schema.Array(Schema.Unknown)),
              responses: Schema.optional(Schema.Null),
            }),
          ),
        }).pipe(
          Schema.encodeKeys({
            lastUpdated: "last_updated",
            parameterSchemas: "parameter_schemas",
          }),
        ),
      }).pipe(Schema.encodeKeys({ parameterSchemas: "parameter_schemas" })),
      Schema.Struct({
        apiRouting: Schema.optional(
          Schema.Struct({
            lastUpdated: Schema.optional(Schema.String),
            route: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({ lastUpdated: "last_updated", route: "route" }),
          ),
        ),
      }).pipe(Schema.encodeKeys({ apiRouting: "api_routing" })),
      Schema.Struct({
        confidenceIntervals: Schema.optional(
          Schema.Struct({
            lastUpdated: Schema.optional(Schema.String),
            suggestedThreshold: Schema.optional(
              Schema.Struct({
                confidenceIntervals: Schema.optional(
                  Schema.Struct({
                    p90: Schema.optional(
                      Schema.Struct({
                        lower: Schema.optional(Schema.Number),
                        upper: Schema.optional(Schema.Number),
                      }),
                    ),
                    p95: Schema.optional(
                      Schema.Struct({
                        lower: Schema.optional(Schema.Number),
                        upper: Schema.optional(Schema.Number),
                      }),
                    ),
                    p99: Schema.optional(
                      Schema.Struct({
                        lower: Schema.optional(Schema.Number),
                        upper: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
                mean: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  confidenceIntervals: "confidence_intervals",
                  mean: "mean",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              lastUpdated: "last_updated",
              suggestedThreshold: "suggested_threshold",
            }),
          ),
        ),
      }).pipe(
        Schema.encodeKeys({ confidenceIntervals: "confidence_intervals" }),
      ),
      Schema.Struct({
        schemaInfo: Schema.optional(
          Schema.Struct({
            activeSchema: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                createdAt: Schema.optional(Schema.String),
                isLearned: Schema.optional(Schema.Boolean),
                name: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  id: "id",
                  createdAt: "created_at",
                  isLearned: "is_learned",
                  name: "name",
                }),
              ),
            ),
            learnedAvailable: Schema.optional(Schema.Boolean),
            mitigationAction: Schema.optional(
              Schema.Union([
                Schema.Literal("none"),
                Schema.Literal("log"),
                Schema.Literal("block"),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              activeSchema: "active_schema",
              learnedAvailable: "learned_available",
              mitigationAction: "mitigation_action",
            }),
          ),
        ),
      }).pipe(Schema.encodeKeys({ schemaInfo: "schema_info" })),
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    endpoint: "endpoint",
    host: "host",
    lastUpdated: "last_updated",
    method: "method",
    operationId: "operation_id",
    features: "features",
  }),
) as unknown as Schema.Schema<CreateOperationResponse>;

export type CreateOperationError = CommonErrors | InvalidObjectIdentifier;

export const createOperation: API.OperationMethod<
  CreateOperationRequest,
  CreateOperationResponse,
  CreateOperationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOperationRequest,
  output: CreateOperationResponse,
  errors: [InvalidObjectIdentifier],
}));

export interface DeleteOperationRequest {
  operationId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteOperationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/api_gateway/operations/{operationId}",
  }),
) as unknown as Schema.Schema<DeleteOperationRequest>;

export interface DeleteOperationResponse {
  errors: unknown;
  messages: unknown;
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteOperationResponse = Schema.Struct({
  errors: Schema.Unknown,
  messages: Schema.Unknown,
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteOperationResponse>;

export type DeleteOperationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | OperationNotFound;

export const deleteOperation: API.OperationMethod<
  DeleteOperationRequest,
  DeleteOperationResponse,
  DeleteOperationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOperationRequest,
  output: DeleteOperationResponse,
  errors: [InvalidObjectIdentifier, OperationNotFound],
}));

export interface BulkCreateOperationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: {
    endpoint: string;
    host: string;
    method:
      | "GET"
      | "POST"
      | "HEAD"
      | "OPTIONS"
      | "PUT"
      | "DELETE"
      | "CONNECT"
      | "PATCH"
      | "TRACE";
  }[];
}

export const BulkCreateOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      endpoint: Schema.String,
      host: Schema.String,
      method: Schema.Literals([
        "GET",
        "POST",
        "HEAD",
        "OPTIONS",
        "PUT",
        "DELETE",
        "CONNECT",
        "PATCH",
        "TRACE",
      ]),
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/api_gateway/operations" }),
) as unknown as Schema.Schema<BulkCreateOperationsRequest>;

export type BulkCreateOperationsResponse = {
  endpoint: string;
  host: string;
  lastUpdated: string;
  method:
    | "GET"
    | "POST"
    | "HEAD"
    | "OPTIONS"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "PATCH"
    | "TRACE";
  operationId: string;
  features?:
    | {
        thresholds?: {
          authIdTokens?: number;
          dataPoints?: number;
          lastUpdated?: string;
          p50?: number;
          p90?: number;
          p99?: number;
          periodSeconds?: number;
          requests?: number;
          suggestedThreshold?: number;
        };
      }
    | {
        parameterSchemas: {
          lastUpdated?: string;
          parameterSchemas?: { parameters?: unknown[]; responses?: null };
        };
      }
    | { apiRouting?: { lastUpdated?: string; route?: string } }
    | {
        confidenceIntervals?: {
          lastUpdated?: string;
          suggestedThreshold?: {
            confidenceIntervals?: {
              p90?: { lower?: number; upper?: number };
              p95?: { lower?: number; upper?: number };
              p99?: { lower?: number; upper?: number };
            };
            mean?: number;
          };
        };
      }
    | {
        schemaInfo?: {
          activeSchema?: {
            id?: string;
            createdAt?: string;
            isLearned?: boolean;
            name?: string;
          };
          learnedAvailable?: boolean;
          mitigationAction?: "none" | "log" | "block" | null;
        };
      };
}[];

export const BulkCreateOperationsResponse = Schema.Array(
  Schema.Struct({
    endpoint: Schema.String,
    host: Schema.String,
    lastUpdated: Schema.String,
    method: Schema.Literals([
      "GET",
      "POST",
      "HEAD",
      "OPTIONS",
      "PUT",
      "DELETE",
      "CONNECT",
      "PATCH",
      "TRACE",
    ]),
    operationId: Schema.String,
    features: Schema.optional(
      Schema.Union([
        Schema.Struct({
          thresholds: Schema.optional(
            Schema.Struct({
              authIdTokens: Schema.optional(Schema.Number),
              dataPoints: Schema.optional(Schema.Number),
              lastUpdated: Schema.optional(Schema.String),
              p50: Schema.optional(Schema.Number),
              p90: Schema.optional(Schema.Number),
              p99: Schema.optional(Schema.Number),
              periodSeconds: Schema.optional(Schema.Number),
              requests: Schema.optional(Schema.Number),
              suggestedThreshold: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                authIdTokens: "auth_id_tokens",
                dataPoints: "data_points",
                lastUpdated: "last_updated",
                p50: "p50",
                p90: "p90",
                p99: "p99",
                periodSeconds: "period_seconds",
                requests: "requests",
                suggestedThreshold: "suggested_threshold",
              }),
            ),
          ),
        }),
        Schema.Struct({
          parameterSchemas: Schema.Struct({
            lastUpdated: Schema.optional(Schema.String),
            parameterSchemas: Schema.optional(
              Schema.Struct({
                parameters: Schema.optional(Schema.Array(Schema.Unknown)),
                responses: Schema.optional(Schema.Null),
              }),
            ),
          }).pipe(
            Schema.encodeKeys({
              lastUpdated: "last_updated",
              parameterSchemas: "parameter_schemas",
            }),
          ),
        }).pipe(Schema.encodeKeys({ parameterSchemas: "parameter_schemas" })),
        Schema.Struct({
          apiRouting: Schema.optional(
            Schema.Struct({
              lastUpdated: Schema.optional(Schema.String),
              route: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                lastUpdated: "last_updated",
                route: "route",
              }),
            ),
          ),
        }).pipe(Schema.encodeKeys({ apiRouting: "api_routing" })),
        Schema.Struct({
          confidenceIntervals: Schema.optional(
            Schema.Struct({
              lastUpdated: Schema.optional(Schema.String),
              suggestedThreshold: Schema.optional(
                Schema.Struct({
                  confidenceIntervals: Schema.optional(
                    Schema.Struct({
                      p90: Schema.optional(
                        Schema.Struct({
                          lower: Schema.optional(Schema.Number),
                          upper: Schema.optional(Schema.Number),
                        }),
                      ),
                      p95: Schema.optional(
                        Schema.Struct({
                          lower: Schema.optional(Schema.Number),
                          upper: Schema.optional(Schema.Number),
                        }),
                      ),
                      p99: Schema.optional(
                        Schema.Struct({
                          lower: Schema.optional(Schema.Number),
                          upper: Schema.optional(Schema.Number),
                        }),
                      ),
                    }),
                  ),
                  mean: Schema.optional(Schema.Number),
                }).pipe(
                  Schema.encodeKeys({
                    confidenceIntervals: "confidence_intervals",
                    mean: "mean",
                  }),
                ),
              ),
            }).pipe(
              Schema.encodeKeys({
                lastUpdated: "last_updated",
                suggestedThreshold: "suggested_threshold",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({ confidenceIntervals: "confidence_intervals" }),
        ),
        Schema.Struct({
          schemaInfo: Schema.optional(
            Schema.Struct({
              activeSchema: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  createdAt: Schema.optional(Schema.String),
                  isLearned: Schema.optional(Schema.Boolean),
                  name: Schema.optional(Schema.String),
                }).pipe(
                  Schema.encodeKeys({
                    id: "id",
                    createdAt: "created_at",
                    isLearned: "is_learned",
                    name: "name",
                  }),
                ),
              ),
              learnedAvailable: Schema.optional(Schema.Boolean),
              mitigationAction: Schema.optional(
                Schema.Union([
                  Schema.Literal("none"),
                  Schema.Literal("log"),
                  Schema.Literal("block"),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                activeSchema: "active_schema",
                learnedAvailable: "learned_available",
                mitigationAction: "mitigation_action",
              }),
            ),
          ),
        }).pipe(Schema.encodeKeys({ schemaInfo: "schema_info" })),
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      endpoint: "endpoint",
      host: "host",
      lastUpdated: "last_updated",
      method: "method",
      operationId: "operation_id",
      features: "features",
    }),
  ),
) as unknown as Schema.Schema<BulkCreateOperationsResponse>;

export type BulkCreateOperationsError = CommonErrors;

export const bulkCreateOperations: API.OperationMethod<
  BulkCreateOperationsRequest,
  BulkCreateOperationsResponse,
  BulkCreateOperationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkCreateOperationsRequest,
  output: BulkCreateOperationsResponse,
  errors: [],
}));

export interface BulkDeleteOperationsRequest {
  /** Identifier. */
  zoneId: string;
}

export const BulkDeleteOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/api_gateway/operations" }),
) as unknown as Schema.Schema<BulkDeleteOperationsRequest>;

export interface BulkDeleteOperationsResponse {
  errors: unknown;
  messages: unknown;
  /** Whether the API call was successful. */
  success: true;
}

export const BulkDeleteOperationsResponse = Schema.Struct({
  errors: Schema.Unknown,
  messages: Schema.Unknown,
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<BulkDeleteOperationsResponse>;

export type BulkDeleteOperationsError = CommonErrors | InvalidObjectIdentifier;

export const bulkDeleteOperations: API.OperationMethod<
  BulkDeleteOperationsRequest,
  BulkDeleteOperationsResponse,
  BulkDeleteOperationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkDeleteOperationsRequest,
  output: BulkDeleteOperationsResponse,
  errors: [InvalidObjectIdentifier],
}));

// =============================================================================
// OperationSchemaValidation
// =============================================================================

export interface GetOperationSchemaValidationRequest {
  operationId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetOperationSchemaValidationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/operations/{operationId}/schema_validation",
  }),
) as unknown as Schema.Schema<GetOperationSchemaValidationRequest>;

export interface GetOperationSchemaValidationResponse {
  /** When set, this applies a mitigation action to this operation  - `log` log request when request does not conform to schema for this operation - `block` deny access to the site when request does not con */
  mitigationAction?: "log" | "block" | "none" | null;
  /** UUID. */
  operationId?: string;
}

export const GetOperationSchemaValidationResponse = Schema.Struct({
  mitigationAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("block"),
      Schema.Literal("none"),
      Schema.Null,
    ]),
  ),
  operationId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    mitigationAction: "mitigation_action",
    operationId: "operation_id",
  }),
) as unknown as Schema.Schema<GetOperationSchemaValidationResponse>;

export type GetOperationSchemaValidationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | OperationNotFound;

export const getOperationSchemaValidation: API.OperationMethod<
  GetOperationSchemaValidationRequest,
  GetOperationSchemaValidationResponse,
  GetOperationSchemaValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOperationSchemaValidationRequest,
  output: GetOperationSchemaValidationResponse,
  errors: [InvalidObjectIdentifier, OperationNotFound],
}));

export interface PutOperationSchemaValidationRequest {
  operationId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: When set, this applies a mitigation action to this operation  - `log` log request when request does not conform to schema for this operation - `block` deny access to the site when request  */
  mitigationAction?: "log" | "block" | "none" | null;
}

export const PutOperationSchemaValidationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  mitigationAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("block"),
      Schema.Literal("none"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({ mitigationAction: "mitigation_action" }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/api_gateway/operations/{operationId}/schema_validation",
  }),
) as unknown as Schema.Schema<PutOperationSchemaValidationRequest>;

export interface PutOperationSchemaValidationResponse {
  /** When set, this applies a mitigation action to this operation  - `log` log request when request does not conform to schema for this operation - `block` deny access to the site when request does not con */
  mitigationAction?: "log" | "block" | "none" | null;
  /** UUID. */
  operationId?: string;
}

export const PutOperationSchemaValidationResponse = Schema.Struct({
  mitigationAction: Schema.optional(
    Schema.Union([
      Schema.Literal("log"),
      Schema.Literal("block"),
      Schema.Literal("none"),
      Schema.Null,
    ]),
  ),
  operationId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    mitigationAction: "mitigation_action",
    operationId: "operation_id",
  }),
) as unknown as Schema.Schema<PutOperationSchemaValidationResponse>;

export type PutOperationSchemaValidationError =
  | CommonErrors
  | InvalidObjectIdentifier
  | OperationNotFound;

export const putOperationSchemaValidation: API.OperationMethod<
  PutOperationSchemaValidationRequest,
  PutOperationSchemaValidationResponse,
  PutOperationSchemaValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutOperationSchemaValidationRequest,
  output: PutOperationSchemaValidationResponse,
  errors: [InvalidObjectIdentifier, OperationNotFound],
}));

export interface PatchOperationSchemaValidationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  settingsMultipleRequest: unknown;
}

export const PatchOperationSchemaValidationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  settingsMultipleRequest: Schema.Unknown,
}).pipe(
  Schema.encodeKeys({ settingsMultipleRequest: "settings_multiple_request" }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/api_gateway/operations/schema_validation",
  }),
) as unknown as Schema.Schema<PatchOperationSchemaValidationRequest>;

export type PatchOperationSchemaValidationResponse = Record<string, unknown>;

export const PatchOperationSchemaValidationResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<PatchOperationSchemaValidationResponse>;

export type PatchOperationSchemaValidationError =
  | CommonErrors
  | InvalidObjectIdentifier;

export const patchOperationSchemaValidation: API.OperationMethod<
  PatchOperationSchemaValidationRequest,
  PatchOperationSchemaValidationResponse,
  PatchOperationSchemaValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchOperationSchemaValidationRequest,
  output: PatchOperationSchemaValidationResponse,
  errors: [InvalidObjectIdentifier],
}));

// =============================================================================
// Schema
// =============================================================================

export interface ListSchemasRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the spe */
  feature?: ("thresholds" | "parameter_schemas" | "schema_info")[];
  /** Query param: Receive schema only for the given host(s). */
  host?: string[];
}

export const ListSchemasRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  feature: Schema.optional(
    Schema.Array(
      Schema.Literals(["thresholds", "parameter_schemas", "schema_info"]),
    ),
  ).pipe(T.HttpQuery("feature")),
  host: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("host")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/api_gateway/schemas" }),
) as unknown as Schema.Schema<ListSchemasRequest>;

export interface ListSchemasResponse {
  schemas?: unknown[];
  timestamp?: string;
}

export const ListSchemasResponse = Schema.Struct({
  schemas: Schema.optional(Schema.Array(Schema.Unknown)),
  timestamp: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<ListSchemasResponse>;

export type ListSchemasError = CommonErrors | InvalidObjectIdentifier;

export const listSchemas: API.OperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  ListSchemasError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSchemasRequest,
  output: ListSchemasResponse,
  errors: [InvalidObjectIdentifier],
}));

// =============================================================================
// SettingSchemaValidation
// =============================================================================

export interface GetSettingSchemaValidationRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetSettingSchemaValidationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/settings/schema_validation",
  }),
) as unknown as Schema.Schema<GetSettingSchemaValidationRequest>;

export type GetSettingSchemaValidationResponse = unknown;

export const GetSettingSchemaValidationResponse =
  Schema.Unknown as unknown as Schema.Schema<GetSettingSchemaValidationResponse>;

export type GetSettingSchemaValidationError =
  | CommonErrors
  | InvalidObjectIdentifier;

export const getSettingSchemaValidation: API.OperationMethod<
  GetSettingSchemaValidationRequest,
  GetSettingSchemaValidationResponse,
  GetSettingSchemaValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingSchemaValidationRequest,
  output: GetSettingSchemaValidationResponse,
  errors: [InvalidObjectIdentifier],
}));

export interface PutSettingSchemaValidationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The default mitigation action used when there is no mitigation action defined on the operation  Mitigation actions are as follows:  - `log` - log request when request does not conform to s */
  validationDefaultMitigationAction: "none" | "log" | "block";
  /** Body param: When set, this overrides both zone level and operation level mitigation actions.  - `none` will skip running schema validation entirely for the request - `null` indicates that no override  */
  validationOverrideMitigationAction?: "none" | "disable_override" | null;
}

export const PutSettingSchemaValidationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  validationDefaultMitigationAction: Schema.Literals(["none", "log", "block"]),
  validationOverrideMitigationAction: Schema.optional(
    Schema.Union([
      Schema.Literal("none"),
      Schema.Literal("disable_override"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/api_gateway/settings/schema_validation",
  }),
) as unknown as Schema.Schema<PutSettingSchemaValidationRequest>;

export type PutSettingSchemaValidationResponse = unknown;

export const PutSettingSchemaValidationResponse =
  Schema.Unknown as unknown as Schema.Schema<PutSettingSchemaValidationResponse>;

export type PutSettingSchemaValidationError =
  | CommonErrors
  | InvalidObjectIdentifier;

export const putSettingSchemaValidation: API.OperationMethod<
  PutSettingSchemaValidationRequest,
  PutSettingSchemaValidationResponse,
  PutSettingSchemaValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSettingSchemaValidationRequest,
  output: PutSettingSchemaValidationResponse,
  errors: [InvalidObjectIdentifier],
}));

export interface PatchSettingSchemaValidationRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The default mitigation action used when there is no mitigation action defined on the operation Mitigation actions are as follows:  - `log` - log request when request does not conform to sc */
  validationDefaultMitigationAction?: "none" | "log" | "block" | null;
  /** Body param: When set, this overrides both zone level and operation level mitigation actions.  - `none` will skip running schema validation entirely for the request  To clear any override, use the spec */
  validationOverrideMitigationAction?: "none" | "disable_override" | null;
}

export const PatchSettingSchemaValidationRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  validationDefaultMitigationAction: Schema.optional(
    Schema.Union([
      Schema.Literal("none"),
      Schema.Literal("log"),
      Schema.Literal("block"),
      Schema.Null,
    ]),
  ),
  validationOverrideMitigationAction: Schema.optional(
    Schema.Union([
      Schema.Literal("none"),
      Schema.Literal("disable_override"),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/api_gateway/settings/schema_validation",
  }),
) as unknown as Schema.Schema<PatchSettingSchemaValidationRequest>;

export type PatchSettingSchemaValidationResponse = unknown;

export const PatchSettingSchemaValidationResponse =
  Schema.Unknown as unknown as Schema.Schema<PatchSettingSchemaValidationResponse>;

export type PatchSettingSchemaValidationError =
  | CommonErrors
  | InvalidObjectIdentifier;

export const patchSettingSchemaValidation: API.OperationMethod<
  PatchSettingSchemaValidationRequest,
  PatchSettingSchemaValidationResponse,
  PatchSettingSchemaValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettingSchemaValidationRequest,
  output: PatchSettingSchemaValidationResponse,
  errors: [InvalidObjectIdentifier],
}));

// =============================================================================
// UserSchema
// =============================================================================

export interface GetUserSchemaRequest {
  schemaId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Omit the source-files of schemas and only retrieve their meta-data. */
  omitSource?: boolean;
}

export const GetUserSchemaRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  omitSource: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("omit_source")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/user_schemas/{schemaId}",
  }),
) as unknown as Schema.Schema<GetUserSchemaRequest>;

export interface GetUserSchemaResponse {
  createdAt: string;
  /** Kind of schema */
  kind: "openapi_v3";
  /** Name of the schema */
  name: string;
  /** UUID. */
  schemaId: string;
  /** Source of the schema */
  source?: string;
  /** Flag whether schema is enabled for validation. */
  validationEnabled?: boolean;
}

export const GetUserSchemaResponse = Schema.Struct({
  createdAt: Schema.String,
  kind: Schema.Literal("openapi_v3"),
  name: Schema.String,
  schemaId: Schema.String,
  source: Schema.optional(Schema.String),
  validationEnabled: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    kind: "kind",
    name: "name",
    schemaId: "schema_id",
    source: "source",
    validationEnabled: "validation_enabled",
  }),
) as unknown as Schema.Schema<GetUserSchemaResponse>;

export type GetUserSchemaError =
  | CommonErrors
  | InvalidObjectIdentifier
  | SchemaNotFound;

export const getUserSchema: API.OperationMethod<
  GetUserSchemaRequest,
  GetUserSchemaResponse,
  GetUserSchemaError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUserSchemaRequest,
  output: GetUserSchemaResponse,
  errors: [InvalidObjectIdentifier, SchemaNotFound],
}));

export interface ListUserSchemasRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Omit the source-files of schemas and only retrieve their meta-data. */
  omitSource?: boolean;
  /** Query param: Flag whether schema is enabled for validation. */
  validationEnabled?: boolean;
}

export const ListUserSchemasRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  omitSource: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("omit_source")),
  validationEnabled: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validation_enabled"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/api_gateway/user_schemas" }),
) as unknown as Schema.Schema<ListUserSchemasRequest>;

export type ListUserSchemasResponse = {
  createdAt: string;
  kind: "openapi_v3";
  name: string;
  schemaId: string;
  source?: string;
  validationEnabled?: boolean;
}[];

export const ListUserSchemasResponse = Schema.Array(
  Schema.Struct({
    createdAt: Schema.String,
    kind: Schema.Literal("openapi_v3"),
    name: Schema.String,
    schemaId: Schema.String,
    source: Schema.optional(Schema.String),
    validationEnabled: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      kind: "kind",
      name: "name",
      schemaId: "schema_id",
      source: "source",
      validationEnabled: "validation_enabled",
    }),
  ),
) as unknown as Schema.Schema<ListUserSchemasResponse>;

export type ListUserSchemasError = CommonErrors;

export const listUserSchemas: API.OperationMethod<
  ListUserSchemasRequest,
  ListUserSchemasResponse,
  ListUserSchemasError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUserSchemasRequest,
  output: ListUserSchemasResponse,
  errors: [],
}));

export interface CreateUserSchemaRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Schema file bytes */
  file: File | Blob;
  /** Body param: Kind of schema */
  kind: "openapi_v3";
  /** Body param: Name of the schema */
  name?: string;
  /** Body param: Flag whether schema is enabled for validation. */
  validationEnabled?: true | false;
}

export const CreateUserSchemaRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  file: UploadableSchema.pipe(T.HttpFormDataFile()),
  kind: Schema.Literal("openapi_v3"),
  name: Schema.optional(Schema.String),
  validationEnabled: Schema.optional(Schema.Literals([true, false])),
}).pipe(
  Schema.encodeKeys({
    file: "file",
    kind: "kind",
    name: "name",
    validationEnabled: "validation_enabled",
  }),
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/api_gateway/user_schemas",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<CreateUserSchemaRequest>;

export interface CreateUserSchemaResponse {
  schema: {
    createdAt: string;
    kind: "openapi_v3";
    name: string;
    schemaId: string;
    source?: string;
    validationEnabled?: boolean;
  };
  uploadDetails?: {
    warnings?: { code: number; locations?: string[]; message?: string }[];
  };
}

export const CreateUserSchemaResponse = Schema.Struct({
  schema: Schema.Struct({
    createdAt: Schema.String,
    kind: Schema.Literal("openapi_v3"),
    name: Schema.String,
    schemaId: Schema.String,
    source: Schema.optional(Schema.String),
    validationEnabled: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      kind: "kind",
      name: "name",
      schemaId: "schema_id",
      source: "source",
      validationEnabled: "validation_enabled",
    }),
  ),
  uploadDetails: Schema.optional(
    Schema.Struct({
      warnings: Schema.optional(
        Schema.Array(
          Schema.Struct({
            code: Schema.Number,
            locations: Schema.optional(Schema.Array(Schema.String)),
            message: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
}).pipe(
  Schema.encodeKeys({ schema: "schema", uploadDetails: "upload_details" }),
) as unknown as Schema.Schema<CreateUserSchemaResponse>;

export type CreateUserSchemaError = CommonErrors | InvalidObjectIdentifier;

export const createUserSchema: API.OperationMethod<
  CreateUserSchemaRequest,
  CreateUserSchemaResponse,
  CreateUserSchemaError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateUserSchemaRequest,
  output: CreateUserSchemaResponse,
  errors: [InvalidObjectIdentifier],
}));

export interface PatchUserSchemaRequest {
  schemaId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Flag whether schema is enabled for validation. */
  validationEnabled?: true;
}

export const PatchUserSchemaRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  validationEnabled: Schema.optional(Schema.Literal(true)),
}).pipe(
  Schema.encodeKeys({ validationEnabled: "validation_enabled" }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/api_gateway/user_schemas/{schemaId}",
  }),
) as unknown as Schema.Schema<PatchUserSchemaRequest>;

export interface PatchUserSchemaResponse {
  createdAt: string;
  /** Kind of schema */
  kind: "openapi_v3";
  /** Name of the schema */
  name: string;
  /** UUID. */
  schemaId: string;
  /** Source of the schema */
  source?: string;
  /** Flag whether schema is enabled for validation. */
  validationEnabled?: boolean;
}

export const PatchUserSchemaResponse = Schema.Struct({
  createdAt: Schema.String,
  kind: Schema.Literal("openapi_v3"),
  name: Schema.String,
  schemaId: Schema.String,
  source: Schema.optional(Schema.String),
  validationEnabled: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    kind: "kind",
    name: "name",
    schemaId: "schema_id",
    source: "source",
    validationEnabled: "validation_enabled",
  }),
) as unknown as Schema.Schema<PatchUserSchemaResponse>;

export type PatchUserSchemaError =
  | CommonErrors
  | InvalidObjectIdentifier
  | SchemaNotFound;

export const patchUserSchema: API.OperationMethod<
  PatchUserSchemaRequest,
  PatchUserSchemaResponse,
  PatchUserSchemaError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchUserSchemaRequest,
  output: PatchUserSchemaResponse,
  errors: [InvalidObjectIdentifier, SchemaNotFound],
}));

export interface DeleteUserSchemaRequest {
  schemaId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteUserSchemaRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/api_gateway/user_schemas/{schemaId}",
  }),
) as unknown as Schema.Schema<DeleteUserSchemaRequest>;

export interface DeleteUserSchemaResponse {
  errors: unknown;
  messages: unknown;
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteUserSchemaResponse = Schema.Struct({
  errors: Schema.Unknown,
  messages: Schema.Unknown,
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteUserSchemaResponse>;

export type DeleteUserSchemaError =
  | CommonErrors
  | InvalidObjectIdentifier
  | SchemaNotFound;

export const deleteUserSchema: API.OperationMethod<
  DeleteUserSchemaRequest,
  DeleteUserSchemaResponse,
  DeleteUserSchemaError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteUserSchemaRequest,
  output: DeleteUserSchemaResponse,
  errors: [InvalidObjectIdentifier, SchemaNotFound],
}));

// =============================================================================
// UserSchemaHost
// =============================================================================

export interface ListUserSchemaHostsRequest {
  /** Path param: Identifier. */
  zoneId: string;
}

export const ListUserSchemaHostsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/user_schemas/hosts",
  }),
) as unknown as Schema.Schema<ListUserSchemaHostsRequest>;

export type ListUserSchemaHostsResponse = {
  createdAt: string;
  hosts: string[];
  name: string;
  schemaId: string;
}[];

export const ListUserSchemaHostsResponse = Schema.Array(
  Schema.Struct({
    createdAt: Schema.String,
    hosts: Schema.Array(Schema.String),
    name: Schema.String,
    schemaId: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      hosts: "hosts",
      name: "name",
      schemaId: "schema_id",
    }),
  ),
) as unknown as Schema.Schema<ListUserSchemaHostsResponse>;

export type ListUserSchemaHostsError = CommonErrors;

export const listUserSchemaHosts: API.OperationMethod<
  ListUserSchemaHostsRequest,
  ListUserSchemaHostsResponse,
  ListUserSchemaHostsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUserSchemaHostsRequest,
  output: ListUserSchemaHostsResponse,
  errors: [],
}));

// =============================================================================
// UserSchemaOperation
// =============================================================================

export interface ListUserSchemaOperationsRequest {
  schemaId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Filter results to only include endpoints containing this pattern. */
  endpoint?: string;
  /** Query param: Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the spe */
  feature?: ("thresholds" | "parameter_schemas" | "schema_info")[];
  /** Query param: Filter results to only include the specified hosts. */
  host?: string[];
  /** Query param: Filter results to only include the specified HTTP methods. */
  method?: string[];
  /** Query param: Filter results by whether operations exist in API Shield Endpoint Management or not. `new` will just return operations from the schema that do not exist in API Shield Endpoint Management. */
  operationStatus?: "new" | "existing";
}

export const ListUserSchemaOperationsRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  endpoint: Schema.optional(Schema.String).pipe(T.HttpQuery("endpoint")),
  feature: Schema.optional(
    Schema.Array(
      Schema.Literals(["thresholds", "parameter_schemas", "schema_info"]),
    ),
  ).pipe(T.HttpQuery("feature")),
  host: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("host")),
  method: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("method"),
  ),
  operationStatus: Schema.optional(Schema.Literals(["new", "existing"])).pipe(
    T.HttpQuery("operation_status"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/api_gateway/user_schemas/{schemaId}/operations",
  }),
) as unknown as Schema.Schema<ListUserSchemaOperationsRequest>;

export type ListUserSchemaOperationsResponse = (
  | {
      endpoint: string;
      host: string;
      lastUpdated: string;
      method:
        | "GET"
        | "POST"
        | "HEAD"
        | "OPTIONS"
        | "PUT"
        | "DELETE"
        | "CONNECT"
        | "PATCH"
        | "TRACE";
      operationId: string;
      features?:
        | {
            thresholds?: {
              authIdTokens?: number;
              dataPoints?: number;
              lastUpdated?: string;
              p50?: number;
              p90?: number;
              p99?: number;
              periodSeconds?: number;
              requests?: number;
              suggestedThreshold?: number;
            };
          }
        | {
            parameterSchemas: {
              lastUpdated?: string;
              parameterSchemas?: { parameters?: unknown[]; responses?: null };
            };
          }
        | { apiRouting?: { lastUpdated?: string; route?: string } }
        | {
            confidenceIntervals?: {
              lastUpdated?: string;
              suggestedThreshold?: {
                confidenceIntervals?: {
                  p90?: { lower?: number; upper?: number };
                  p95?: { lower?: number; upper?: number };
                  p99?: { lower?: number; upper?: number };
                };
                mean?: number;
              };
            };
          }
        | {
            schemaInfo?: {
              activeSchema?: {
                id?: string;
                createdAt?: string;
                isLearned?: boolean;
                name?: string;
              };
              learnedAvailable?: boolean;
              mitigationAction?: "none" | "log" | "block" | null;
            };
          };
    }
  | {
      endpoint: string;
      host: string;
      method:
        | "GET"
        | "POST"
        | "HEAD"
        | "OPTIONS"
        | "PUT"
        | "DELETE"
        | "CONNECT"
        | "PATCH"
        | "TRACE";
    }
)[];

export const ListUserSchemaOperationsResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      endpoint: Schema.String,
      host: Schema.String,
      lastUpdated: Schema.String,
      method: Schema.Literals([
        "GET",
        "POST",
        "HEAD",
        "OPTIONS",
        "PUT",
        "DELETE",
        "CONNECT",
        "PATCH",
        "TRACE",
      ]),
      operationId: Schema.String,
      features: Schema.optional(
        Schema.Union([
          Schema.Struct({
            thresholds: Schema.optional(
              Schema.Struct({
                authIdTokens: Schema.optional(Schema.Number),
                dataPoints: Schema.optional(Schema.Number),
                lastUpdated: Schema.optional(Schema.String),
                p50: Schema.optional(Schema.Number),
                p90: Schema.optional(Schema.Number),
                p99: Schema.optional(Schema.Number),
                periodSeconds: Schema.optional(Schema.Number),
                requests: Schema.optional(Schema.Number),
                suggestedThreshold: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  authIdTokens: "auth_id_tokens",
                  dataPoints: "data_points",
                  lastUpdated: "last_updated",
                  p50: "p50",
                  p90: "p90",
                  p99: "p99",
                  periodSeconds: "period_seconds",
                  requests: "requests",
                  suggestedThreshold: "suggested_threshold",
                }),
              ),
            ),
          }),
          Schema.Struct({
            parameterSchemas: Schema.Struct({
              lastUpdated: Schema.optional(Schema.String),
              parameterSchemas: Schema.optional(
                Schema.Struct({
                  parameters: Schema.optional(Schema.Array(Schema.Unknown)),
                  responses: Schema.optional(Schema.Null),
                }),
              ),
            }).pipe(
              Schema.encodeKeys({
                lastUpdated: "last_updated",
                parameterSchemas: "parameter_schemas",
              }),
            ),
          }).pipe(Schema.encodeKeys({ parameterSchemas: "parameter_schemas" })),
          Schema.Struct({
            apiRouting: Schema.optional(
              Schema.Struct({
                lastUpdated: Schema.optional(Schema.String),
                route: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  lastUpdated: "last_updated",
                  route: "route",
                }),
              ),
            ),
          }).pipe(Schema.encodeKeys({ apiRouting: "api_routing" })),
          Schema.Struct({
            confidenceIntervals: Schema.optional(
              Schema.Struct({
                lastUpdated: Schema.optional(Schema.String),
                suggestedThreshold: Schema.optional(
                  Schema.Struct({
                    confidenceIntervals: Schema.optional(
                      Schema.Struct({
                        p90: Schema.optional(
                          Schema.Struct({
                            lower: Schema.optional(Schema.Number),
                            upper: Schema.optional(Schema.Number),
                          }),
                        ),
                        p95: Schema.optional(
                          Schema.Struct({
                            lower: Schema.optional(Schema.Number),
                            upper: Schema.optional(Schema.Number),
                          }),
                        ),
                        p99: Schema.optional(
                          Schema.Struct({
                            lower: Schema.optional(Schema.Number),
                            upper: Schema.optional(Schema.Number),
                          }),
                        ),
                      }),
                    ),
                    mean: Schema.optional(Schema.Number),
                  }).pipe(
                    Schema.encodeKeys({
                      confidenceIntervals: "confidence_intervals",
                      mean: "mean",
                    }),
                  ),
                ),
              }).pipe(
                Schema.encodeKeys({
                  lastUpdated: "last_updated",
                  suggestedThreshold: "suggested_threshold",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({ confidenceIntervals: "confidence_intervals" }),
          ),
          Schema.Struct({
            schemaInfo: Schema.optional(
              Schema.Struct({
                activeSchema: Schema.optional(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    createdAt: Schema.optional(Schema.String),
                    isLearned: Schema.optional(Schema.Boolean),
                    name: Schema.optional(Schema.String),
                  }).pipe(
                    Schema.encodeKeys({
                      id: "id",
                      createdAt: "created_at",
                      isLearned: "is_learned",
                      name: "name",
                    }),
                  ),
                ),
                learnedAvailable: Schema.optional(Schema.Boolean),
                mitigationAction: Schema.optional(
                  Schema.Union([
                    Schema.Literal("none"),
                    Schema.Literal("log"),
                    Schema.Literal("block"),
                    Schema.Null,
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  activeSchema: "active_schema",
                  learnedAvailable: "learned_available",
                  mitigationAction: "mitigation_action",
                }),
              ),
            ),
          }).pipe(Schema.encodeKeys({ schemaInfo: "schema_info" })),
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        endpoint: "endpoint",
        host: "host",
        lastUpdated: "last_updated",
        method: "method",
        operationId: "operation_id",
        features: "features",
      }),
    ),
    Schema.Struct({
      endpoint: Schema.String,
      host: Schema.String,
      method: Schema.Literals([
        "GET",
        "POST",
        "HEAD",
        "OPTIONS",
        "PUT",
        "DELETE",
        "CONNECT",
        "PATCH",
        "TRACE",
      ]),
    }),
  ]),
) as unknown as Schema.Schema<ListUserSchemaOperationsResponse>;

export type ListUserSchemaOperationsError = CommonErrors;

export const listUserSchemaOperations: API.OperationMethod<
  ListUserSchemaOperationsRequest,
  ListUserSchemaOperationsResponse,
  ListUserSchemaOperationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUserSchemaOperationsRequest,
  output: ListUserSchemaOperationsResponse,
  errors: [],
}));
