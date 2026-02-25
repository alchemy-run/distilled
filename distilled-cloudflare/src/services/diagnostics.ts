/**
 * Cloudflare DIAGNOSTICS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service diagnostics
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
// EndpointHealthcheck
// =============================================================================

export interface GetEndpointHealthcheckRequest {
  id: string;
  /** Identifier */
  accountId: string;
}

export const GetEndpointHealthcheckRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}",
  }),
) as unknown as Schema.Schema<GetEndpointHealthcheckRequest>;

export interface GetEndpointHealthcheckResponse {
  /** type of check to perform */
  checkType: "icmp";
  /** the IP address of the host to perform checks against */
  endpoint: string;
  /** UUID. */
  id?: string;
  /** Optional name associated with this check */
  name?: string;
}

export const GetEndpointHealthcheckResponse = Schema.Struct({
  checkType: Schema.Literal("icmp"),
  endpoint: Schema.String,
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ checkType: "check_type" }),
) as unknown as Schema.Schema<GetEndpointHealthcheckResponse>;

export const getEndpointHealthcheck: (
  input: GetEndpointHealthcheckRequest,
) => Effect.Effect<
  GetEndpointHealthcheckResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEndpointHealthcheckRequest,
  output: GetEndpointHealthcheckResponse,
  errors: [],
}));

export interface ListEndpointHealthchecksRequest {
  /** Identifier */
  accountId: string;
}

export const ListEndpointHealthchecksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/diagnostics/endpoint-healthchecks",
  }),
) as unknown as Schema.Schema<ListEndpointHealthchecksRequest>;

export interface ListEndpointHealthchecksResponse {
  /** type of check to perform */
  checkType: "icmp";
  /** the IP address of the host to perform checks against */
  endpoint: string;
  /** UUID. */
  id?: string;
  /** Optional name associated with this check */
  name?: string;
}

export const ListEndpointHealthchecksResponse = Schema.Struct({
  checkType: Schema.Literal("icmp"),
  endpoint: Schema.String,
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ checkType: "check_type" }),
) as unknown as Schema.Schema<ListEndpointHealthchecksResponse>;

export const listEndpointHealthchecks: (
  input: ListEndpointHealthchecksRequest,
) => Effect.Effect<
  ListEndpointHealthchecksResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListEndpointHealthchecksRequest,
  output: ListEndpointHealthchecksResponse,
  errors: [],
}));

export interface CreateEndpointHealthcheckRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: type of check to perform */
  checkType: "icmp";
  /** Body param: the IP address of the host to perform checks against */
  endpoint: string;
  /** Body param: Optional name associated with this check */
  name?: string;
}

export const CreateEndpointHealthcheckRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  checkType: Schema.Literal("icmp"),
  endpoint: Schema.String,
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ checkType: "check_type" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/diagnostics/endpoint-healthchecks",
  }),
) as unknown as Schema.Schema<CreateEndpointHealthcheckRequest>;

export interface CreateEndpointHealthcheckResponse {
  /** type of check to perform */
  checkType: "icmp";
  /** the IP address of the host to perform checks against */
  endpoint: string;
  /** UUID. */
  id?: string;
  /** Optional name associated with this check */
  name?: string;
}

export const CreateEndpointHealthcheckResponse = Schema.Struct({
  checkType: Schema.Literal("icmp"),
  endpoint: Schema.String,
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ checkType: "check_type" }),
) as unknown as Schema.Schema<CreateEndpointHealthcheckResponse>;

export const createEndpointHealthcheck: (
  input: CreateEndpointHealthcheckRequest,
) => Effect.Effect<
  CreateEndpointHealthcheckResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateEndpointHealthcheckRequest,
  output: CreateEndpointHealthcheckResponse,
  errors: [],
}));

export interface UpdateEndpointHealthcheckRequest {
  id: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: type of check to perform */
  checkType: "icmp";
  /** Body param: the IP address of the host to perform checks against */
  endpoint: string;
  /** Body param: Optional name associated with this check */
  name?: string;
}

export const UpdateEndpointHealthcheckRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  checkType: Schema.Literal("icmp"),
  endpoint: Schema.String,
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ checkType: "check_type" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}",
  }),
) as unknown as Schema.Schema<UpdateEndpointHealthcheckRequest>;

export interface UpdateEndpointHealthcheckResponse {
  /** type of check to perform */
  checkType: "icmp";
  /** the IP address of the host to perform checks against */
  endpoint: string;
  /** UUID. */
  id?: string;
  /** Optional name associated with this check */
  name?: string;
}

export const UpdateEndpointHealthcheckResponse = Schema.Struct({
  checkType: Schema.Literal("icmp"),
  endpoint: Schema.String,
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ checkType: "check_type" }),
) as unknown as Schema.Schema<UpdateEndpointHealthcheckResponse>;

export const updateEndpointHealthcheck: (
  input: UpdateEndpointHealthcheckRequest,
) => Effect.Effect<
  UpdateEndpointHealthcheckResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEndpointHealthcheckRequest,
  output: UpdateEndpointHealthcheckResponse,
  errors: [],
}));

export interface DeleteEndpointHealthcheckRequest {
  id: string;
  /** Identifier */
  accountId: string;
}

export const DeleteEndpointHealthcheckRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}",
  }),
) as unknown as Schema.Schema<DeleteEndpointHealthcheckRequest>;

export interface DeleteEndpointHealthcheckResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteEndpointHealthcheckResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteEndpointHealthcheckResponse>;

export const deleteEndpointHealthcheck: (
  input: DeleteEndpointHealthcheckRequest,
) => Effect.Effect<
  DeleteEndpointHealthcheckResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteEndpointHealthcheckRequest,
  output: DeleteEndpointHealthcheckResponse,
  errors: [],
}));

// =============================================================================
// Traceroute
// =============================================================================

export interface CreateTracerouteRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  targets: string[];
  /** Body param: If no source colo names specified, all colos will be used. China colos are unavailable for traceroutes. */
  colos?: string[];
  /** Body param: */
  options?: {
    maxTtl?: number;
    packetType?: "icmp" | "tcp" | "udp" | "gre" | "gre+icmp";
    packetsPerTtl?: number;
    port?: number;
    waitTime?: number;
  };
}

export const CreateTracerouteRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  targets: Schema.Array(Schema.String),
  colos: Schema.optional(Schema.Array(Schema.String)),
  options: Schema.optional(
    Schema.Struct({
      maxTtl: Schema.optional(Schema.Number),
      packetType: Schema.optional(
        Schema.Literals(["icmp", "tcp", "udp", "gre", "gre+icmp"]),
      ),
      packetsPerTtl: Schema.optional(Schema.Number),
      port: Schema.optional(Schema.Number),
      waitTime: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        maxTtl: "max_ttl",
        packetType: "packet_type",
        packetsPerTtl: "packets_per_ttl",
        waitTime: "wait_time",
      }),
    ),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/diagnostics/traceroute",
  }),
) as unknown as Schema.Schema<CreateTracerouteRequest>;

export type CreateTracerouteResponse = {
  colos?: {
    colo?: { city?: string; name?: string };
    error?:
      | ""
      | "Could not gather traceroute data: Code 1"
      | "Could not gather traceroute data: Code 2"
      | "Could not gather traceroute data: Code 3"
      | "Could not gather traceroute data: Code 4";
    hops?: {
      nodes?: {
        asn?: string;
        ip?: string;
        labels?: string[];
        maxRttMs?: number;
        meanRttMs?: number;
        minRttMs?: number;
        name?: string;
        packetCount?: number;
        stdDevRttMs?: number;
      }[];
      packetsLost?: number;
      packetsSent?: number;
      packetsTtl?: number;
    }[];
    targetSummary?: unknown;
    tracerouteTimeMs?: number;
  }[];
  target?: string;
}[];

export const CreateTracerouteResponse = Schema.Array(
  Schema.Struct({
    colos: Schema.optional(
      Schema.Array(
        Schema.Struct({
          colo: Schema.optional(
            Schema.Struct({
              city: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
            }),
          ),
          error: Schema.optional(
            Schema.Literals([
              "",
              "Could not gather traceroute data: Code 1",
              "Could not gather traceroute data: Code 2",
              "Could not gather traceroute data: Code 3",
              "Could not gather traceroute data: Code 4",
            ]),
          ),
          hops: Schema.optional(
            Schema.Array(
              Schema.Struct({
                nodes: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      asn: Schema.optional(Schema.String),
                      ip: Schema.optional(Schema.String),
                      labels: Schema.optional(Schema.Array(Schema.String)),
                      maxRttMs: Schema.optional(Schema.Number),
                      meanRttMs: Schema.optional(Schema.Number),
                      minRttMs: Schema.optional(Schema.Number),
                      name: Schema.optional(Schema.String),
                      packetCount: Schema.optional(Schema.Number),
                      stdDevRttMs: Schema.optional(Schema.Number),
                    }).pipe(
                      Schema.encodeKeys({
                        maxRttMs: "max_rtt_ms",
                        meanRttMs: "mean_rtt_ms",
                        minRttMs: "min_rtt_ms",
                        packetCount: "packet_count",
                        stdDevRttMs: "std_dev_rtt_ms",
                      }),
                    ),
                  ),
                ),
                packetsLost: Schema.optional(Schema.Number),
                packetsSent: Schema.optional(Schema.Number),
                packetsTtl: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  packetsLost: "packets_lost",
                  packetsSent: "packets_sent",
                  packetsTtl: "packets_ttl",
                }),
              ),
            ),
          ),
          targetSummary: Schema.optional(Schema.Unknown),
          tracerouteTimeMs: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            targetSummary: "target_summary",
            tracerouteTimeMs: "traceroute_time_ms",
          }),
        ),
      ),
    ),
    target: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<CreateTracerouteResponse>;

export const createTraceroute: (
  input: CreateTracerouteRequest,
) => Effect.Effect<
  CreateTracerouteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTracerouteRequest,
  output: CreateTracerouteResponse,
  errors: [],
}));
