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
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    checkType: "check_type",
    endpoint: "endpoint",
    id: "id",
    name: "name",
  }),
) as unknown as Schema.Schema<GetEndpointHealthcheckResponse>;

export type GetEndpointHealthcheckError = CommonErrors;

export const getEndpointHealthcheck: API.OperationMethod<
  GetEndpointHealthcheckRequest,
  GetEndpointHealthcheckResponse,
  GetEndpointHealthcheckError,
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
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    checkType: "check_type",
    endpoint: "endpoint",
    id: "id",
    name: "name",
  }),
) as unknown as Schema.Schema<ListEndpointHealthchecksResponse>;

export type ListEndpointHealthchecksError = CommonErrors;

export const listEndpointHealthchecks: API.OperationMethod<
  ListEndpointHealthchecksRequest,
  ListEndpointHealthchecksResponse,
  ListEndpointHealthchecksError,
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
  Schema.encodeKeys({
    checkType: "check_type",
    endpoint: "endpoint",
    name: "name",
  }),
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
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    checkType: "check_type",
    endpoint: "endpoint",
    id: "id",
    name: "name",
  }),
) as unknown as Schema.Schema<CreateEndpointHealthcheckResponse>;

export type CreateEndpointHealthcheckError = CommonErrors;

export const createEndpointHealthcheck: API.OperationMethod<
  CreateEndpointHealthcheckRequest,
  CreateEndpointHealthcheckResponse,
  CreateEndpointHealthcheckError,
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
  Schema.encodeKeys({
    checkType: "check_type",
    endpoint: "endpoint",
    name: "name",
  }),
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
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    checkType: "check_type",
    endpoint: "endpoint",
    id: "id",
    name: "name",
  }),
) as unknown as Schema.Schema<UpdateEndpointHealthcheckResponse>;

export type UpdateEndpointHealthcheckError = CommonErrors;

export const updateEndpointHealthcheck: API.OperationMethod<
  UpdateEndpointHealthcheckRequest,
  UpdateEndpointHealthcheckResponse,
  UpdateEndpointHealthcheckError,
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
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DeleteEndpointHealthcheckResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      source: Schema.optional(
        Schema.Union([
          Schema.Struct({
            pointer: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        source: "source",
      }),
    ),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      source: Schema.optional(
        Schema.Union([
          Schema.Struct({
            pointer: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        source: "source",
      }),
    ),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteEndpointHealthcheckResponse>;

export type DeleteEndpointHealthcheckError = CommonErrors;

export const deleteEndpointHealthcheck: API.OperationMethod<
  DeleteEndpointHealthcheckRequest,
  DeleteEndpointHealthcheckResponse,
  DeleteEndpointHealthcheckError,
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
        port: "port",
        waitTime: "wait_time",
      }),
    ),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/diagnostics/traceroute",
  }),
) as unknown as Schema.Schema<CreateTracerouteRequest>;

export type CreateTracerouteResponse = {
  colos?:
    | {
        colo?: { city?: string | null; name?: string | null } | null;
        error?:
          | ""
          | "Could not gather traceroute data: Code 1"
          | "Could not gather traceroute data: Code 2"
          | "Could not gather traceroute data: Code 3"
          | "Could not gather traceroute data: Code 4"
          | null;
        hops?:
          | {
              nodes?:
                | {
                    asn?: string | null;
                    ip?: string | null;
                    labels?: string[] | null;
                    maxRttMs?: number | null;
                    meanRttMs?: number | null;
                    minRttMs?: number | null;
                    name?: string | null;
                    packetCount?: number | null;
                    stdDevRttMs?: number | null;
                  }[]
                | null;
              packetsLost?: number | null;
              packetsSent?: number | null;
              packetsTtl?: number | null;
            }[]
          | null;
        targetSummary?: unknown | null;
        tracerouteTimeMs?: number | null;
      }[]
    | null;
  target?: string | null;
}[];

export const CreateTracerouteResponse = Schema.Array(
  Schema.Struct({
    colos: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            colo: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  city: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
                Schema.Null,
              ]),
            ),
            error: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "",
                  "Could not gather traceroute data: Code 1",
                  "Could not gather traceroute data: Code 2",
                  "Could not gather traceroute data: Code 3",
                  "Could not gather traceroute data: Code 4",
                ]),
                Schema.Null,
              ]),
            ),
            hops: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    nodes: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            asn: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            ip: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            labels: Schema.optional(
                              Schema.Union([
                                Schema.Array(Schema.String),
                                Schema.Null,
                              ]),
                            ),
                            maxRttMs: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            meanRttMs: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            minRttMs: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            name: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            packetCount: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            stdDevRttMs: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              asn: "asn",
                              ip: "ip",
                              labels: "labels",
                              maxRttMs: "max_rtt_ms",
                              meanRttMs: "mean_rtt_ms",
                              minRttMs: "min_rtt_ms",
                              name: "name",
                              packetCount: "packet_count",
                              stdDevRttMs: "std_dev_rtt_ms",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    packetsLost: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    packetsSent: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    packetsTtl: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      nodes: "nodes",
                      packetsLost: "packets_lost",
                      packetsSent: "packets_sent",
                      packetsTtl: "packets_ttl",
                    }),
                  ),
                ),
                Schema.Null,
              ]),
            ),
            targetSummary: Schema.optional(
              Schema.Union([Schema.Unknown, Schema.Null]),
            ),
            tracerouteTimeMs: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              colo: "colo",
              error: "error",
              hops: "hops",
              targetSummary: "target_summary",
              tracerouteTimeMs: "traceroute_time_ms",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    target: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<CreateTracerouteResponse>;

export type CreateTracerouteError = CommonErrors;

export const createTraceroute: API.OperationMethod<
  CreateTracerouteRequest,
  CreateTracerouteResponse,
  CreateTracerouteError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTracerouteRequest,
  output: CreateTracerouteResponse,
  errors: [],
}));
