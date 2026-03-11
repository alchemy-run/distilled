/**
 * Cloudflare CONNECTIVITY API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service connectivity
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// DirectoryService
// =============================================================================

export interface GetDirectoryServiceRequest {
  serviceId: string;
  accountId: string;
}

export const GetDirectoryServiceRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  createdAt?: string | null;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string | null;
  updatedAt?: string | null;
}

export const GetDirectoryServiceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }).pipe(
        Schema.encodeKeys({
          hostname: "hostname",
          resolverNetwork: "resolver_network",
        }),
      ),
    ]),
    name: Schema.String,
    type: Schema.Literal("http"),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    serviceId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      host: "host",
      name: "name",
      type: "type",
      createdAt: "created_at",
      httpPort: "http_port",
      httpsPort: "https_port",
      serviceId: "service_id",
      updatedAt: "updated_at",
    }),
  ) as unknown as Schema.Schema<GetDirectoryServiceResponse>;

export type GetDirectoryServiceError = DefaultErrors;

export const getDirectoryService: API.OperationMethod<
  GetDirectoryServiceRequest,
  GetDirectoryServiceResponse,
  GetDirectoryServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListDirectoryServicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  createdAt?: string | null;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string | null;
  updatedAt?: string | null;
}[];

export const ListDirectoryServicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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
        }).pipe(
          Schema.encodeKeys({
            hostname: "hostname",
            resolverNetwork: "resolver_network",
          }),
        ),
      ]),
      name: Schema.String,
      type: Schema.Literal("http"),
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      serviceId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        host: "host",
        name: "name",
        type: "type",
        createdAt: "created_at",
        httpPort: "http_port",
        httpsPort: "https_port",
        serviceId: "service_id",
        updatedAt: "updated_at",
      }),
    ),
  ) as unknown as Schema.Schema<ListDirectoryServicesResponse>;

export type ListDirectoryServicesError = DefaultErrors;

export const listDirectoryServices: API.OperationMethod<
  ListDirectoryServicesRequest,
  ListDirectoryServicesResponse,
  ListDirectoryServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateDirectoryServiceRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }).pipe(
        Schema.encodeKeys({
          hostname: "hostname",
          resolverNetwork: "resolver_network",
        }),
      ),
    ]),
    name: Schema.String,
    type: Schema.Literal("http"),
    httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      host: "host",
      name: "name",
      type: "type",
      httpPort: "http_port",
      httpsPort: "https_port",
    }),
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
  createdAt?: string | null;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string | null;
  updatedAt?: string | null;
}

export const CreateDirectoryServiceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }).pipe(
        Schema.encodeKeys({
          hostname: "hostname",
          resolverNetwork: "resolver_network",
        }),
      ),
    ]),
    name: Schema.String,
    type: Schema.Literal("http"),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    serviceId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      host: "host",
      name: "name",
      type: "type",
      createdAt: "created_at",
      httpPort: "http_port",
      httpsPort: "https_port",
      serviceId: "service_id",
      updatedAt: "updated_at",
    }),
  ) as unknown as Schema.Schema<CreateDirectoryServiceResponse>;

export type CreateDirectoryServiceError = DefaultErrors;

export const createDirectoryService: API.OperationMethod<
  CreateDirectoryServiceRequest,
  CreateDirectoryServiceResponse,
  CreateDirectoryServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateDirectoryServiceRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }).pipe(
        Schema.encodeKeys({
          hostname: "hostname",
          resolverNetwork: "resolver_network",
        }),
      ),
    ]),
    name: Schema.String,
    type: Schema.Literal("http"),
    httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      host: "host",
      name: "name",
      type: "type",
      httpPort: "http_port",
      httpsPort: "https_port",
    }),
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
  createdAt?: string | null;
  httpPort?: number | null;
  httpsPort?: number | null;
  serviceId?: string | null;
  updatedAt?: string | null;
}

export const UpdateDirectoryServiceResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }).pipe(
        Schema.encodeKeys({
          hostname: "hostname",
          resolverNetwork: "resolver_network",
        }),
      ),
    ]),
    name: Schema.String,
    type: Schema.Literal("http"),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    httpPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    httpsPort: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    serviceId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      host: "host",
      name: "name",
      type: "type",
      createdAt: "created_at",
      httpPort: "http_port",
      httpsPort: "https_port",
      serviceId: "service_id",
      updatedAt: "updated_at",
    }),
  ) as unknown as Schema.Schema<UpdateDirectoryServiceResponse>;

export type UpdateDirectoryServiceError = DefaultErrors;

export const updateDirectoryService: API.OperationMethod<
  UpdateDirectoryServiceRequest,
  UpdateDirectoryServiceResponse,
  UpdateDirectoryServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDirectoryServiceRequest,
  output: UpdateDirectoryServiceResponse,
  errors: [],
}));

export interface DeleteDirectoryServiceRequest {
  serviceId: string;
  accountId: string;
}

export const DeleteDirectoryServiceRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteDirectoryServiceResponse>;

export type DeleteDirectoryServiceError = DefaultErrors;

export const deleteDirectoryService: API.OperationMethod<
  DeleteDirectoryServiceRequest,
  DeleteDirectoryServiceResponse,
  DeleteDirectoryServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDirectoryServiceRequest,
  output: DeleteDirectoryServiceResponse,
  errors: [],
}));
