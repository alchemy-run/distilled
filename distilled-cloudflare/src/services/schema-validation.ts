/**
 * Cloudflare SCHEMA-VALIDATION API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service schema-validation
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
// Schema
// =============================================================================

export interface GetSchemaRequest {
  schemaId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Omit the source-files of schemas and only retrieve their meta-data. */
  omitSource?: boolean;
}

export const GetSchemaRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  omitSource: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("omit_source")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/schema_validation/schemas/{schemaId}",
  }),
) as unknown as Schema.Schema<GetSchemaRequest>;

export interface GetSchemaResponse {
  createdAt: string;
  /** The kind of the schema */
  kind: "openapi_v3";
  /** A human-readable name for the schema */
  name: string;
  /** A unique identifier of this schema */
  schemaId: string;
  /** The raw schema, e.g., the OpenAPI schema, either as JSON or YAML */
  source: string;
  /** An indicator if this schema is enabled */
  validationEnabled?: boolean;
}

export const GetSchemaResponse = Schema.Struct({
  createdAt: Schema.String,
  kind: Schema.Literal("openapi_v3"),
  name: Schema.String,
  schemaId: Schema.String,
  source: Schema.String,
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
) as unknown as Schema.Schema<GetSchemaResponse>;

export const getSchema: API.OperationMethod<
  GetSchemaRequest,
  GetSchemaResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSchemaRequest,
  output: GetSchemaResponse,
  errors: [],
}));

export interface ListSchemasRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Omit the source-files of schemas and only retrieve their meta-data. */
  omitSource?: boolean;
  /** Query param: Filter for enabled schemas */
  validationEnabled?: boolean;
}

export const ListSchemasRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  omitSource: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("omit_source")),
  validationEnabled: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validation_enabled"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/schema_validation/schemas" }),
) as unknown as Schema.Schema<ListSchemasRequest>;

export type ListSchemasResponse = {
  createdAt: string;
  kind: "openapi_v3";
  name: string;
  schemaId: string;
  source: string;
  validationEnabled?: boolean;
}[];

export const ListSchemasResponse = Schema.Array(
  Schema.Struct({
    createdAt: Schema.String,
    kind: Schema.Literal("openapi_v3"),
    name: Schema.String,
    schemaId: Schema.String,
    source: Schema.String,
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
) as unknown as Schema.Schema<ListSchemasResponse>;

export const listSchemas: API.OperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSchemasRequest,
  output: ListSchemasResponse,
  errors: [],
}));

export interface CreateSchemaRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The kind of the schema */
  kind: "openapi_v3";
  /** Body param: A human-readable name for the schema */
  name: string;
  /** Body param: The raw schema, e.g., the OpenAPI schema, either as JSON or YAML */
  source: string;
  /** Body param: An indicator if this schema is enabled */
  validationEnabled: boolean;
}

export const CreateSchemaRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  kind: Schema.Literal("openapi_v3"),
  name: Schema.String,
  source: Schema.String,
  validationEnabled: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    kind: "kind",
    name: "name",
    source: "source",
    validationEnabled: "validation_enabled",
  }),
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/schema_validation/schemas",
  }),
) as unknown as Schema.Schema<CreateSchemaRequest>;

export interface CreateSchemaResponse {
  createdAt: string;
  /** The kind of the schema */
  kind: "openapi_v3";
  /** A human-readable name for the schema */
  name: string;
  /** A unique identifier of this schema */
  schemaId: string;
  /** The raw schema, e.g., the OpenAPI schema, either as JSON or YAML */
  source: string;
  /** An indicator if this schema is enabled */
  validationEnabled?: boolean;
}

export const CreateSchemaResponse = Schema.Struct({
  createdAt: Schema.String,
  kind: Schema.Literal("openapi_v3"),
  name: Schema.String,
  schemaId: Schema.String,
  source: Schema.String,
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
) as unknown as Schema.Schema<CreateSchemaResponse>;

export const createSchema: API.OperationMethod<
  CreateSchemaRequest,
  CreateSchemaResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSchemaRequest,
  output: CreateSchemaResponse,
  errors: [],
}));

export interface PatchSchemaRequest {
  schemaId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Flag whether schema is enabled for validation. */
  validationEnabled?: boolean;
}

export const PatchSchemaRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  validationEnabled: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({ validationEnabled: "validation_enabled" }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/schema_validation/schemas/{schemaId}",
  }),
) as unknown as Schema.Schema<PatchSchemaRequest>;

export interface PatchSchemaResponse {
  createdAt: string;
  /** The kind of the schema */
  kind: "openapi_v3";
  /** A human-readable name for the schema */
  name: string;
  /** A unique identifier of this schema */
  schemaId: string;
  /** The raw schema, e.g., the OpenAPI schema, either as JSON or YAML */
  source: string;
  /** An indicator if this schema is enabled */
  validationEnabled?: boolean;
}

export const PatchSchemaResponse = Schema.Struct({
  createdAt: Schema.String,
  kind: Schema.Literal("openapi_v3"),
  name: Schema.String,
  schemaId: Schema.String,
  source: Schema.String,
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
) as unknown as Schema.Schema<PatchSchemaResponse>;

export const patchSchema: API.OperationMethod<
  PatchSchemaRequest,
  PatchSchemaResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSchemaRequest,
  output: PatchSchemaResponse,
  errors: [],
}));

export interface DeleteSchemaRequest {
  schemaId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteSchemaRequest = Schema.Struct({
  schemaId: Schema.String.pipe(T.HttpPath("schemaId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/schema_validation/schemas/{schemaId}",
  }),
) as unknown as Schema.Schema<DeleteSchemaRequest>;

export interface DeleteSchemaResponse {
  /** The ID of the schema that was just deleted */
  id: string;
}

export const DeleteSchemaResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteSchemaResponse>;

export const deleteSchema: API.OperationMethod<
  DeleteSchemaRequest,
  DeleteSchemaResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSchemaRequest,
  output: DeleteSchemaResponse,
  errors: [],
}));

// =============================================================================
// Setting
// =============================================================================

export interface GetSettingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/schema_validation/settings",
  }),
) as unknown as Schema.Schema<GetSettingRequest>;

export interface GetSettingResponse {
  /** The default mitigation action used  Mitigation actions are as follows:  - `log` - log request when request does not conform to schema - `block` - deny access to the site when request does not conform  */
  validationDefaultMitigationAction: "none" | "log" | "block";
  /** When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.  - `"none"` will skip runnin */
  validationOverrideMitigationAction?: "none";
}

export const GetSettingResponse = Schema.Struct({
  validationDefaultMitigationAction: Schema.Literals(["none", "log", "block"]),
  validationOverrideMitigationAction: Schema.optional(Schema.Literal("none")),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
) as unknown as Schema.Schema<GetSettingResponse>;

export const getSetting: API.OperationMethod<
  GetSettingRequest,
  GetSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingRequest,
  output: GetSettingResponse,
  errors: [],
}));

export interface PutSettingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The default mitigation action used Mitigation actions are as follows:  - `"log"` - log request when request does not conform to schema - `"block"` - deny access to the site when request do */
  validationDefaultMitigationAction: "none" | "log" | "block";
  /** Body param: When set, this overrides both zone level and operation level mitigation actions.  - `"none"` - skip running schema validation entirely for the request - `null` - clears any existing overri */
  validationOverrideMitigationAction?: "none" | null;
}

export const PutSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  validationDefaultMitigationAction: Schema.Literals(["none", "log", "block"]),
  validationOverrideMitigationAction: Schema.optional(
    Schema.Union([Schema.Literal("none"), Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/schema_validation/settings",
  }),
) as unknown as Schema.Schema<PutSettingRequest>;

export interface PutSettingResponse {
  /** The default mitigation action used  Mitigation actions are as follows:  - `log` - log request when request does not conform to schema - `block` - deny access to the site when request does not conform  */
  validationDefaultMitigationAction: "none" | "log" | "block";
  /** When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.  - `"none"` will skip runnin */
  validationOverrideMitigationAction?: "none";
}

export const PutSettingResponse = Schema.Struct({
  validationDefaultMitigationAction: Schema.Literals(["none", "log", "block"]),
  validationOverrideMitigationAction: Schema.optional(Schema.Literal("none")),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
) as unknown as Schema.Schema<PutSettingResponse>;

export const putSetting: API.OperationMethod<
  PutSettingRequest,
  PutSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSettingRequest,
  output: PutSettingResponse,
  errors: [],
}));

export interface PatchSettingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The default mitigation action used Mitigation actions are as follows:  - `"log"` - log request when request does not conform to schema - `"block"` - deny access to the site when request do */
  validationDefaultMitigationAction?: "none" | "log" | "block";
  /** Body param: When set, this overrides both zone level and operation level mitigation actions.  - `"none"` - skip running schema validation entirely for the request - `null` - clears any existing overri */
  validationOverrideMitigationAction?: "none" | null;
}

export const PatchSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  validationDefaultMitigationAction: Schema.optional(
    Schema.Literals(["none", "log", "block"]),
  ),
  validationOverrideMitigationAction: Schema.optional(
    Schema.Union([Schema.Literal("none"), Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/schema_validation/settings",
  }),
) as unknown as Schema.Schema<PatchSettingRequest>;

export interface PatchSettingResponse {
  /** The default mitigation action used  Mitigation actions are as follows:  - `log` - log request when request does not conform to schema - `block` - deny access to the site when request does not conform  */
  validationDefaultMitigationAction: "none" | "log" | "block";
  /** When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.  - `"none"` will skip runnin */
  validationOverrideMitigationAction?: "none";
}

export const PatchSettingResponse = Schema.Struct({
  validationDefaultMitigationAction: Schema.Literals(["none", "log", "block"]),
  validationOverrideMitigationAction: Schema.optional(Schema.Literal("none")),
}).pipe(
  Schema.encodeKeys({
    validationDefaultMitigationAction: "validation_default_mitigation_action",
    validationOverrideMitigationAction: "validation_override_mitigation_action",
  }),
) as unknown as Schema.Schema<PatchSettingResponse>;

export const patchSetting: API.OperationMethod<
  PatchSettingRequest,
  PatchSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettingRequest,
  output: PatchSettingResponse,
  errors: [],
}));

// =============================================================================
// SettingOperation
// =============================================================================

export interface GetSettingOperationRequest {
  operationId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetSettingOperationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/schema_validation/settings/operations/{operationId}",
  }),
) as unknown as Schema.Schema<GetSettingOperationRequest>;

export interface GetSettingOperationResponse {
  /** When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation  - `"log"` - log request when request does not conform to schem */
  mitigationAction: "log" | "block" | "none";
  /** UUID. */
  operationId: string;
}

export const GetSettingOperationResponse = Schema.Struct({
  mitigationAction: Schema.Literals(["log", "block", "none"]),
  operationId: Schema.String,
}).pipe(
  Schema.encodeKeys({
    mitigationAction: "mitigation_action",
    operationId: "operation_id",
  }),
) as unknown as Schema.Schema<GetSettingOperationResponse>;

export const getSettingOperation: API.OperationMethod<
  GetSettingOperationRequest,
  GetSettingOperationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingOperationRequest,
  output: GetSettingOperationResponse,
  errors: [],
}));

export interface ListSettingOperationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
}

export const ListSettingOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/schema_validation/settings/operations",
  }),
) as unknown as Schema.Schema<ListSettingOperationsRequest>;

export type ListSettingOperationsResponse = {
  mitigationAction: "log" | "block" | "none";
  operationId: string;
}[];

export const ListSettingOperationsResponse = Schema.Array(
  Schema.Struct({
    mitigationAction: Schema.Literals(["log", "block", "none"]),
    operationId: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      mitigationAction: "mitigation_action",
      operationId: "operation_id",
    }),
  ),
) as unknown as Schema.Schema<ListSettingOperationsResponse>;

export const listSettingOperations: API.OperationMethod<
  ListSettingOperationsRequest,
  ListSettingOperationsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSettingOperationsRequest,
  output: ListSettingOperationsResponse,
  errors: [],
}));

export interface PutSettingOperationRequest {
  operationId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: When set, this applies a mitigation action to this operation  - `"log"` - log request when request does not conform to schema for this operation - `"block"` - deny access to the site when  */
  mitigationAction: "log" | "block" | "none" | null;
}

export const PutSettingOperationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  mitigationAction: Schema.Union([
    Schema.Literal("log"),
    Schema.Literal("block"),
    Schema.Literal("none"),
    Schema.Null,
  ]),
}).pipe(
  Schema.encodeKeys({ mitigationAction: "mitigation_action" }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/schema_validation/settings/operations/{operationId}",
  }),
) as unknown as Schema.Schema<PutSettingOperationRequest>;

export interface PutSettingOperationResponse {
  /** When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation  - `"log"` - log request when request does not conform to schem */
  mitigationAction: "log" | "block" | "none";
  /** UUID. */
  operationId: string;
}

export const PutSettingOperationResponse = Schema.Struct({
  mitigationAction: Schema.Literals(["log", "block", "none"]),
  operationId: Schema.String,
}).pipe(
  Schema.encodeKeys({
    mitigationAction: "mitigation_action",
    operationId: "operation_id",
  }),
) as unknown as Schema.Schema<PutSettingOperationResponse>;

export const putSettingOperation: API.OperationMethod<
  PutSettingOperationRequest,
  PutSettingOperationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSettingOperationRequest,
  output: PutSettingOperationResponse,
  errors: [],
}));

export interface DeleteSettingOperationRequest {
  operationId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteSettingOperationRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/schema_validation/settings/operations/{operationId}",
  }),
) as unknown as Schema.Schema<DeleteSettingOperationRequest>;

export interface DeleteSettingOperationResponse {
  /** UUID. */
  operationId?: string;
}

export const DeleteSettingOperationResponse = Schema.Struct({
  operationId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ operationId: "operation_id" }),
) as unknown as Schema.Schema<DeleteSettingOperationResponse>;

export const deleteSettingOperation: API.OperationMethod<
  DeleteSettingOperationRequest,
  DeleteSettingOperationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSettingOperationRequest,
  output: DeleteSettingOperationResponse,
  errors: [],
}));

export interface BulkPatchSettingOperationsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: Record<string, unknown>;
}

export const BulkPatchSettingOperationsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/schema_validation/settings/operations",
  }),
) as unknown as Schema.Schema<BulkPatchSettingOperationsRequest>;

export type BulkPatchSettingOperationsResponse = Record<string, unknown>;

export const BulkPatchSettingOperationsResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<BulkPatchSettingOperationsResponse>;

export const bulkPatchSettingOperations: API.OperationMethod<
  BulkPatchSettingOperationsRequest,
  BulkPatchSettingOperationsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkPatchSettingOperationsRequest,
  output: BulkPatchSettingOperationsResponse,
  errors: [],
}));
