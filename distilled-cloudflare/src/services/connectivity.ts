/**
 * Cloudflare CONNECTIVITY API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service connectivity
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
// DirectoryService
// =============================================================================

export interface GetDirectoryServiceRequest {
  serviceId: string;
  accountId: string;
}

export const GetDirectoryServiceRequest = Schema.Struct({
  serviceId: Schema.String.pipe(T.HttpPath("serviceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/connectivity/directory/services/{serviceId}",
  }),
) as unknown as Schema.Schema<GetDirectoryServiceRequest>;

export interface GetDirectoryServiceResponse {
  host:
    | { ipv4: string; network: { tunnelId: string } }
    | { ipv6: string; network: { tunnelId: string } }
    | { ipv4: string; ipv6: string; network: { tunnelId: string } }
    | {
        hostname: string;
        resolverNetwork: { tunnelId: string; resolverIps?: string[] | null };
      };
  name: string;
  type: "http";
  createdAt?: string;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string;
  updatedAt?: string;
}

export const GetDirectoryServiceResponse = Schema.Struct({
  host: Schema.Union([
    Schema.Struct({
      ipv4: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv4: Schema.String,
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      hostname: Schema.String,
      resolverNetwork: Schema.Struct({
        tunnelId: Schema.String,
        resolverIps: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          tunnelId: "tunnel_id",
          resolverIps: "resolver_ips",
        }),
      ),
    }).pipe(Schema.encodeKeys({ resolverNetwork: "resolver_network" })),
  ]),
  name: Schema.String,
  type: Schema.Literal("http"),
  createdAt: Schema.optional(Schema.String),
  httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  serviceId: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    httpPort: "http_port",
    httpsPort: "https_port",
    serviceId: "service_id",
    updatedAt: "updated_at",
  }),
) as unknown as Schema.Schema<GetDirectoryServiceResponse>;

export const getDirectoryService: (
  input: GetDirectoryServiceRequest,
) => Effect.Effect<
  GetDirectoryServiceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDirectoryServiceRequest,
  output: GetDirectoryServiceResponse,
  errors: [],
}));

export interface ListDirectoryServicesRequest {
  /** Path param: Account identifier */
  accountId: string;
  /** Query param: */
  type?: "http" | null;
}

export const ListDirectoryServicesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  type: Schema.optional(
    Schema.Union([Schema.Literal("http"), Schema.Null]),
  ).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/connectivity/directory/services",
  }),
) as unknown as Schema.Schema<ListDirectoryServicesRequest>;

export type ListDirectoryServicesResponse = {
  host:
    | { ipv4: string; network: { tunnelId: string } }
    | { ipv6: string; network: { tunnelId: string } }
    | { ipv4: string; ipv6: string; network: { tunnelId: string } }
    | {
        hostname: string;
        resolverNetwork: { tunnelId: string; resolverIps?: string[] | null };
      };
  name: string;
  type: "http";
  createdAt?: string;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string;
  updatedAt?: string;
}[];

export const ListDirectoryServicesResponse = Schema.Array(
  Schema.Struct({
    host: Schema.Union([
      Schema.Struct({
        ipv4: Schema.String,
        network: Schema.Struct({
          tunnelId: Schema.String,
        }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
      }),
      Schema.Struct({
        ipv6: Schema.String,
        network: Schema.Struct({
          tunnelId: Schema.String,
        }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
      }),
      Schema.Struct({
        ipv4: Schema.String,
        ipv6: Schema.String,
        network: Schema.Struct({
          tunnelId: Schema.String,
        }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
      }),
      Schema.Struct({
        hostname: Schema.String,
        resolverNetwork: Schema.Struct({
          tunnelId: Schema.String,
          resolverIps: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            tunnelId: "tunnel_id",
            resolverIps: "resolver_ips",
          }),
        ),
      }).pipe(Schema.encodeKeys({ resolverNetwork: "resolver_network" })),
    ]),
    name: Schema.String,
    type: Schema.Literal("http"),
    createdAt: Schema.optional(Schema.String),
    httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    serviceId: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      httpPort: "http_port",
      httpsPort: "https_port",
      serviceId: "service_id",
      updatedAt: "updated_at",
    }),
  ),
) as unknown as Schema.Schema<ListDirectoryServicesResponse>;

export const listDirectoryServices: (
  input: ListDirectoryServicesRequest,
) => Effect.Effect<
  ListDirectoryServicesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDirectoryServicesRequest,
  output: ListDirectoryServicesResponse,
  errors: [],
}));

export interface CreateDirectoryServiceRequest {
  /** Path param: Account identifier */
  accountId: string;
  /** Body param: */
  host:
    | { ipv4: string; network: { tunnelId: string } }
    | { ipv6: string; network: { tunnelId: string } }
    | { ipv4: string; ipv6: string; network: { tunnelId: string } }
    | {
        hostname: string;
        resolverNetwork: { tunnelId: string; resolverIps?: string[] | null };
      };
  /** Body param: */
  name: string;
  /** Body param: */
  type: "http";
  /** Body param: */
  httpPort?: number | null;
  /** Body param: */
  httpsPort?: number | null;
}

export const CreateDirectoryServiceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  host: Schema.Union([
    Schema.Struct({
      ipv4: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv4: Schema.String,
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      hostname: Schema.String,
      resolverNetwork: Schema.Struct({
        tunnelId: Schema.String,
        resolverIps: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          tunnelId: "tunnel_id",
          resolverIps: "resolver_ips",
        }),
      ),
    }).pipe(Schema.encodeKeys({ resolverNetwork: "resolver_network" })),
  ]),
  name: Schema.String,
  type: Schema.Literal("http"),
  httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ httpPort: "http_port", httpsPort: "https_port" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/connectivity/directory/services",
  }),
) as unknown as Schema.Schema<CreateDirectoryServiceRequest>;

export interface CreateDirectoryServiceResponse {
  host:
    | { ipv4: string; network: { tunnelId: string } }
    | { ipv6: string; network: { tunnelId: string } }
    | { ipv4: string; ipv6: string; network: { tunnelId: string } }
    | {
        hostname: string;
        resolverNetwork: { tunnelId: string; resolverIps?: string[] | null };
      };
  name: string;
  type: "http";
  createdAt?: string;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string;
  updatedAt?: string;
}

export const CreateDirectoryServiceResponse = Schema.Struct({
  host: Schema.Union([
    Schema.Struct({
      ipv4: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv4: Schema.String,
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      hostname: Schema.String,
      resolverNetwork: Schema.Struct({
        tunnelId: Schema.String,
        resolverIps: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          tunnelId: "tunnel_id",
          resolverIps: "resolver_ips",
        }),
      ),
    }).pipe(Schema.encodeKeys({ resolverNetwork: "resolver_network" })),
  ]),
  name: Schema.String,
  type: Schema.Literal("http"),
  createdAt: Schema.optional(Schema.String),
  httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  serviceId: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    httpPort: "http_port",
    httpsPort: "https_port",
    serviceId: "service_id",
    updatedAt: "updated_at",
  }),
) as unknown as Schema.Schema<CreateDirectoryServiceResponse>;

export const createDirectoryService: (
  input: CreateDirectoryServiceRequest,
) => Effect.Effect<
  CreateDirectoryServiceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDirectoryServiceRequest,
  output: CreateDirectoryServiceResponse,
  errors: [],
}));

export interface UpdateDirectoryServiceRequest {
  serviceId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  host:
    | { ipv4: string; network: { tunnelId: string } }
    | { ipv6: string; network: { tunnelId: string } }
    | { ipv4: string; ipv6: string; network: { tunnelId: string } }
    | {
        hostname: string;
        resolverNetwork: { tunnelId: string; resolverIps?: string[] | null };
      };
  /** Body param: */
  name: string;
  /** Body param: */
  type: "http";
  /** Body param: */
  httpPort?: number | null;
  /** Body param: */
  httpsPort?: number | null;
}

export const UpdateDirectoryServiceRequest = Schema.Struct({
  serviceId: Schema.String.pipe(T.HttpPath("serviceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  host: Schema.Union([
    Schema.Struct({
      ipv4: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv4: Schema.String,
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      hostname: Schema.String,
      resolverNetwork: Schema.Struct({
        tunnelId: Schema.String,
        resolverIps: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          tunnelId: "tunnel_id",
          resolverIps: "resolver_ips",
        }),
      ),
    }).pipe(Schema.encodeKeys({ resolverNetwork: "resolver_network" })),
  ]),
  name: Schema.String,
  type: Schema.Literal("http"),
  httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ httpPort: "http_port", httpsPort: "https_port" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/connectivity/directory/services/{serviceId}",
  }),
) as unknown as Schema.Schema<UpdateDirectoryServiceRequest>;

export interface UpdateDirectoryServiceResponse {
  host:
    | { ipv4: string; network: { tunnelId: string } }
    | { ipv6: string; network: { tunnelId: string } }
    | { ipv4: string; ipv6: string; network: { tunnelId: string } }
    | {
        hostname: string;
        resolverNetwork: { tunnelId: string; resolverIps?: string[] | null };
      };
  name: string;
  type: "http";
  createdAt?: string;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string;
  updatedAt?: string;
}

export const UpdateDirectoryServiceResponse = Schema.Struct({
  host: Schema.Union([
    Schema.Struct({
      ipv4: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      ipv4: Schema.String,
      ipv6: Schema.String,
      network: Schema.Struct({
        tunnelId: Schema.String,
      }).pipe(Schema.encodeKeys({ tunnelId: "tunnel_id" })),
    }),
    Schema.Struct({
      hostname: Schema.String,
      resolverNetwork: Schema.Struct({
        tunnelId: Schema.String,
        resolverIps: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          tunnelId: "tunnel_id",
          resolverIps: "resolver_ips",
        }),
      ),
    }).pipe(Schema.encodeKeys({ resolverNetwork: "resolver_network" })),
  ]),
  name: Schema.String,
  type: Schema.Literal("http"),
  createdAt: Schema.optional(Schema.String),
  httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  serviceId: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    httpPort: "http_port",
    httpsPort: "https_port",
    serviceId: "service_id",
    updatedAt: "updated_at",
  }),
) as unknown as Schema.Schema<UpdateDirectoryServiceResponse>;

export const updateDirectoryService: (
  input: UpdateDirectoryServiceRequest,
) => Effect.Effect<
  UpdateDirectoryServiceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDirectoryServiceRequest,
  output: UpdateDirectoryServiceResponse,
  errors: [],
}));

export interface DeleteDirectoryServiceRequest {
  serviceId: string;
  accountId: string;
}

export const DeleteDirectoryServiceRequest = Schema.Struct({
  serviceId: Schema.String.pipe(T.HttpPath("serviceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/connectivity/directory/services/{serviceId}",
  }),
) as unknown as Schema.Schema<DeleteDirectoryServiceRequest>;

export type DeleteDirectoryServiceResponse = unknown;

export const DeleteDirectoryServiceResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteDirectoryServiceResponse>;

export const deleteDirectoryService: (
  input: DeleteDirectoryServiceRequest,
) => Effect.Effect<
  DeleteDirectoryServiceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDirectoryServiceRequest,
  output: DeleteDirectoryServiceResponse,
  errors: [],
}));
