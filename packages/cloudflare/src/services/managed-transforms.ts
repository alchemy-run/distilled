/**
 * Cloudflare MANAGED-TRANSFORMS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service managed-transforms
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// ManagedTransform
// =============================================================================

export interface ListManagedTransformsRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const ListManagedTransformsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    conflictsWith?: string[] | null;
  }[];
  /** The list of Managed Response Transforms. */
  managedResponseHeaders: {
    id: string;
    enabled: boolean;
    hasConflict: boolean;
    conflictsWith?: string[] | null;
  }[];
}

export const ListManagedTransformsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedRequestHeaders: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        enabled: Schema.Boolean,
        hasConflict: Schema.Boolean,
        conflictsWith: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
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
        conflictsWith: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          hasConflict: "has_conflict",
          conflictsWith: "conflicts_with",
        }),
      ),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        managedRequestHeaders: "managed_request_headers",
        managedResponseHeaders: "managed_response_headers",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<ListManagedTransformsResponse>;

export type ListManagedTransformsError = DefaultErrors;

export const listManagedTransforms: API.OperationMethod<
  ListManagedTransformsRequest,
  ListManagedTransformsResponse,
  ListManagedTransformsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchManagedTransformRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    conflictsWith?: string[] | null;
  }[];
  /** The list of Managed Response Transforms. */
  managedResponseHeaders: {
    id: string;
    enabled: boolean;
    hasConflict: boolean;
    conflictsWith?: string[] | null;
  }[];
}

export const PatchManagedTransformResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedRequestHeaders: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        enabled: Schema.Boolean,
        hasConflict: Schema.Boolean,
        conflictsWith: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
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
        conflictsWith: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          hasConflict: "has_conflict",
          conflictsWith: "conflicts_with",
        }),
      ),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        managedRequestHeaders: "managed_request_headers",
        managedResponseHeaders: "managed_response_headers",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PatchManagedTransformResponse>;

export type PatchManagedTransformError = DefaultErrors;

export const patchManagedTransform: API.OperationMethod<
  PatchManagedTransformRequest,
  PatchManagedTransformResponse,
  PatchManagedTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchManagedTransformRequest,
  output: PatchManagedTransformResponse,
  errors: [],
}));

export interface DeleteManagedTransformRequest {
  /** The unique ID of the zone. */
  zoneId: string;
}

export const DeleteManagedTransformRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "/zones/{zone_id}/managed_headers" }),
  ) as unknown as Schema.Schema<DeleteManagedTransformRequest>;

export type DeleteManagedTransformResponse = unknown;

export const DeleteManagedTransformResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteManagedTransformResponse>;

export type DeleteManagedTransformError = DefaultErrors;

export const deleteManagedTransform: API.OperationMethod<
  DeleteManagedTransformRequest,
  DeleteManagedTransformResponse,
  DeleteManagedTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteManagedTransformRequest,
  output: DeleteManagedTransformResponse,
  errors: [],
}));
