/**
 * Cloudflare MANAGED-TRANSFORMS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service managed-transforms
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
// ManagedTransform
// =============================================================================

export interface ListManagedTransformsRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const ListManagedTransformsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/managed_headers" }),
) as unknown as Schema.Schema<ListManagedTransformsRequest>;

export interface ListManagedTransformsResponse {
  /** The list of Managed Request Transforms. */
  managedRequestHeaders: {
    id: string;
    enabled: boolean;
    hasConflict: boolean;
    conflictsWith?: string[];
  }[];
  /** The list of Managed Response Transforms. */
  managedResponseHeaders: {
    id: string;
    enabled: boolean;
    hasConflict: boolean;
    conflictsWith?: string[];
  }[];
}

export const ListManagedTransformsResponse = Schema.Struct({
  managedRequestHeaders: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      enabled: Schema.Boolean,
      hasConflict: Schema.Boolean,
      conflictsWith: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        hasConflict: "has_conflict",
        conflictsWith: "conflicts_with",
      }),
    ),
  ),
  managedResponseHeaders: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      enabled: Schema.Boolean,
      hasConflict: Schema.Boolean,
      conflictsWith: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        hasConflict: "has_conflict",
        conflictsWith: "conflicts_with",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    managedRequestHeaders: "managed_request_headers",
    managedResponseHeaders: "managed_response_headers",
  }),
) as unknown as Schema.Schema<ListManagedTransformsResponse>;

export const listManagedTransforms: (
  input: ListManagedTransformsRequest,
) => Effect.Effect<
  ListManagedTransformsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagedTransformsRequest,
  output: ListManagedTransformsResponse,
  errors: [],
}));

export interface PatchManagedTransformRequest {
  /** Path param: The unique ID of the zone. */
  zoneId: string;
  /** Body param: The list of Managed Request Transforms. */
  managedRequestHeaders: { id: string; enabled: boolean }[];
  /** Body param: The list of Managed Response Transforms. */
  managedResponseHeaders: { id: string; enabled: boolean }[];
}

export const PatchManagedTransformRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  managedRequestHeaders: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      enabled: Schema.Boolean,
    }),
  ),
  managedResponseHeaders: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      enabled: Schema.Boolean,
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    managedRequestHeaders: "managed_request_headers",
    managedResponseHeaders: "managed_response_headers",
  }),
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/managed_headers" }),
) as unknown as Schema.Schema<PatchManagedTransformRequest>;

export interface PatchManagedTransformResponse {
  /** The list of Managed Request Transforms. */
  managedRequestHeaders: {
    id: string;
    enabled: boolean;
    hasConflict: boolean;
    conflictsWith?: string[];
  }[];
  /** The list of Managed Response Transforms. */
  managedResponseHeaders: {
    id: string;
    enabled: boolean;
    hasConflict: boolean;
    conflictsWith?: string[];
  }[];
}

export const PatchManagedTransformResponse = Schema.Struct({
  managedRequestHeaders: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      enabled: Schema.Boolean,
      hasConflict: Schema.Boolean,
      conflictsWith: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        hasConflict: "has_conflict",
        conflictsWith: "conflicts_with",
      }),
    ),
  ),
  managedResponseHeaders: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      enabled: Schema.Boolean,
      hasConflict: Schema.Boolean,
      conflictsWith: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        hasConflict: "has_conflict",
        conflictsWith: "conflicts_with",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    managedRequestHeaders: "managed_request_headers",
    managedResponseHeaders: "managed_response_headers",
  }),
) as unknown as Schema.Schema<PatchManagedTransformResponse>;

export const patchManagedTransform: (
  input: PatchManagedTransformRequest,
) => Effect.Effect<
  PatchManagedTransformResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagedTransformRequest,
  output: PatchManagedTransformResponse,
  errors: [],
}));

export interface DeleteManagedTransformRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteManagedTransformRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/managed_headers" }),
) as unknown as Schema.Schema<DeleteManagedTransformRequest>;

export type DeleteManagedTransformResponse = unknown;

export const DeleteManagedTransformResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteManagedTransformResponse>;

export const deleteManagedTransform: (
  input: DeleteManagedTransformRequest,
) => Effect.Effect<
  DeleteManagedTransformResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagedTransformRequest,
  output: DeleteManagedTransformResponse,
  errors: [],
}));
