// ==========================================================================
// Firebase Data Connect API (firebasedataconnect v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "firebasedataconnect",
  version: "v1",
  rootUrl: "https://firebasedataconnect.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ExecuteQueryRequest {
  /** Required. The name of the GraphQL operation name. Required because all Connector operations must be named. See https://graphql.org/learn/queries/#operation-name. */
  operationName?: string;
  /** Optional. Values for GraphQL variables provided in this request. */
  variables?: Record<string, unknown>;
}

export const ExecuteQueryRequest: Schema.Schema<ExecuteQueryRequest> = Schema.suspend(() => Schema.Struct({
  operationName: Schema.optional(Schema.String),
  variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ExecuteQueryRequest" }) as any as Schema.Schema<ExecuteQueryRequest>;

export interface SourceLocation {
  /** Line number starting at 1. */
  line?: number;
  /** Column number starting at 1. */
  column?: number;
}

export const SourceLocation: Schema.Schema<SourceLocation> = Schema.suspend(() => Schema.Struct({
  line: Schema.optional(Schema.Number),
  column: Schema.optional(Schema.Number),
})).annotate({ identifier: "SourceLocation" }) as any as Schema.Schema<SourceLocation>;

export interface Workaround {
  /** Description of this workaround. */
  description?: string;
  /** Why would this workaround address the error and warning. */
  reason?: string;
  /** A suggested code snippet to fix the error and warning. */
  replace?: string;
}

export const Workaround: Schema.Schema<Workaround> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  replace: Schema.optional(Schema.String),
})).annotate({ identifier: "Workaround" }) as any as Schema.Schema<Workaround>;

export interface GraphqlErrorExtensions {
  /** The source file name where the error occurred. Included only for `UpdateSchema` and `UpdateConnector`, it corresponds to `File.path` of the provided `Source`. */
  file?: string;
  /** Maps to canonical gRPC codes. If not specified, it represents `Code.INTERNAL`. */
  code?: "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS" | (string & {});
  /** More detailed error message to assist debugging. It contains application business logic that are inappropriate to leak publicly. In the emulator, Data Connect API always includes it to assist local development and debugging. In the backend, ConnectorService always hides it. GraphqlService without impersonation always include it. GraphqlService with impersonation includes it only if explicitly opted-in with `include_debug_details` in `GraphqlRequestExtensions`. */
  debugDetails?: string;
  /** Warning level describes the severity and required action to suppress this warning when Firebase CLI run into it. */
  warningLevel?: "WARNING_LEVEL_UNKNOWN" | "LOG_ONLY" | "INTERACTIVE_ACK" | "REQUIRE_ACK" | "REQUIRE_FORCE" | (string & {});
  /** Workarounds provide suggestions to address the compile errors or warnings. */
  workarounds?: Array<Workaround>;
}

export const GraphqlErrorExtensions: Schema.Schema<GraphqlErrorExtensions> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  debugDetails: Schema.optional(Schema.String),
  warningLevel: Schema.optional(Schema.String),
  workarounds: Schema.optional(Schema.Array(Workaround)),
})).annotate({ identifier: "GraphqlErrorExtensions" }) as any as Schema.Schema<GraphqlErrorExtensions>;

export interface GraphqlError {
  /** The detailed error message. The message should help developer understand the underlying problem without leaking internal data. */
  message?: string;
  /** The source locations where the error occurred. Locations should help developers and toolings identify the source of error quickly. Included in admin endpoints (`ExecuteGraphql`, `ExecuteGraphqlRead`, `IntrospectGraphql`, `ImpersonateQuery`, `ImpersonateMutation`, `UpdateSchema` and `UpdateConnector`) to reference the provided GraphQL GQL document. Omitted in `ExecuteMutation` and `ExecuteQuery` since the caller shouldn't have access access the underlying GQL source. */
  locations?: Array<SourceLocation>;
  /** The result field which could not be populated due to error. Clients can use path to identify whether a null result is intentional or caused by a runtime error. It should be a list of string or index from the root of GraphQL query document. */
  path?: Array<unknown>;
  /** Additional error information. */
  extensions?: GraphqlErrorExtensions;
}

export const GraphqlError: Schema.Schema<GraphqlError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(SourceLocation)),
  path: Schema.optional(Schema.Array(Schema.Unknown)),
  extensions: Schema.optional(GraphqlErrorExtensions),
})).annotate({ identifier: "GraphqlError" }) as any as Schema.Schema<GraphqlError>;

export interface DataConnectProperties {
  /** The path under response.data where the rest of the fields apply. Each element may be a string (field name) or number (array index). The root of response.data is denoted by the empty list `[]`. */
  path?: Array<unknown>;
  /** A single Entity ID. Set if the path points to a single entity. */
  entityId?: string;
  /** A list of Entity IDs. Set if the path points to an array of entities. An ID is present for each element of the array at the corresponding index. */
  entityIds?: Array<string>;
  /** The server-suggested duration before data under path is considered stale. */
  maxAge?: string;
}

export const DataConnectProperties: Schema.Schema<DataConnectProperties> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.Array(Schema.Unknown)),
  entityId: Schema.optional(Schema.String),
  entityIds: Schema.optional(Schema.Array(Schema.String)),
  maxAge: Schema.optional(Schema.String),
})).annotate({ identifier: "DataConnectProperties" }) as any as Schema.Schema<DataConnectProperties>;

export interface GraphqlResponseExtensions {
  /** Data Connect specific GraphQL extension, a list of paths and properties. */
  dataConnect?: Array<DataConnectProperties>;
}

export const GraphqlResponseExtensions: Schema.Schema<GraphqlResponseExtensions> = Schema.suspend(() => Schema.Struct({
  dataConnect: Schema.optional(Schema.Array(DataConnectProperties)),
})).annotate({ identifier: "GraphqlResponseExtensions" }) as any as Schema.Schema<GraphqlResponseExtensions>;

export interface ExecuteQueryResponse {
  /** The result of executing the requested operation. */
  data?: Record<string, unknown>;
  /** Errors of this response. */
  errors?: Array<GraphqlError>;
  /** Additional response information. */
  extensions?: GraphqlResponseExtensions;
}

export const ExecuteQueryResponse: Schema.Schema<ExecuteQueryResponse> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  errors: Schema.optional(Schema.Array(GraphqlError)),
  extensions: Schema.optional(GraphqlResponseExtensions),
})).annotate({ identifier: "ExecuteQueryResponse" }) as any as Schema.Schema<ExecuteQueryResponse>;

export interface ExecuteMutationRequest {
  /** Required. The name of the GraphQL operation name. Required because all Connector operations must be named. See https://graphql.org/learn/queries/#operation-name. */
  operationName?: string;
  /** Optional. Values for GraphQL variables provided in this request. */
  variables?: Record<string, unknown>;
}

export const ExecuteMutationRequest: Schema.Schema<ExecuteMutationRequest> = Schema.suspend(() => Schema.Struct({
  operationName: Schema.optional(Schema.String),
  variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ExecuteMutationRequest" }) as any as Schema.Schema<ExecuteMutationRequest>;

export interface ExecuteMutationResponse {
  /** The result of executing the requested operation. */
  data?: Record<string, unknown>;
  /** Errors of this response. */
  errors?: Array<GraphqlError>;
  /** Additional response information. */
  extensions?: GraphqlResponseExtensions;
}

export const ExecuteMutationResponse: Schema.Schema<ExecuteMutationResponse> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  errors: Schema.optional(Schema.Array(GraphqlError)),
  extensions: Schema.optional(GraphqlResponseExtensions),
})).annotate({ identifier: "ExecuteMutationResponse" }) as any as Schema.Schema<ExecuteMutationResponse>;

export interface Impersonation {
  /** Evaluate the auth policy as an unauthenticated request. Can only be set to true. */
  unauthenticated?: boolean;
  /** Evaluate the auth policy with a customized JWT auth token. Should follow the Firebase Auth token format. https://firebase.google.com/docs/rules/rules-and-auth For example: a verified user may have auth_claims of {"sub": , "email_verified": true} */
  authClaims?: Record<string, unknown>;
  /** Optional. If set, include debug details in GraphQL error extensions. */
  includeDebugDetails?: boolean;
}

export const Impersonation: Schema.Schema<Impersonation> = Schema.suspend(() => Schema.Struct({
  unauthenticated: Schema.optional(Schema.Boolean),
  authClaims: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  includeDebugDetails: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Impersonation" }) as any as Schema.Schema<Impersonation>;

export interface GraphqlRequestExtensions {
  /** Optional. If set, impersonate a request with given Firebase Auth context and evaluate the auth policies on the operation. If omitted, bypass any defined auth policies. */
  impersonate?: Impersonation;
}

export const GraphqlRequestExtensions: Schema.Schema<GraphqlRequestExtensions> = Schema.suspend(() => Schema.Struct({
  impersonate: Schema.optional(Impersonation),
})).annotate({ identifier: "GraphqlRequestExtensions" }) as any as Schema.Schema<GraphqlRequestExtensions>;

export interface GraphqlRequest {
  /** Required. The GraphQL query document source. */
  query?: string;
  /** Optional. The name of the GraphQL operation name. Required only if `query` contains multiple operations. See https://graphql.org/learn/queries/#operation-name. */
  operationName?: string;
  /** Optional. Values for GraphQL variables provided in this request. */
  variables?: Record<string, unknown>;
  /** Optional. Additional GraphQL request information. */
  extensions?: GraphqlRequestExtensions;
}

export const GraphqlRequest: Schema.Schema<GraphqlRequest> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  operationName: Schema.optional(Schema.String),
  variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  extensions: Schema.optional(GraphqlRequestExtensions),
})).annotate({ identifier: "GraphqlRequest" }) as any as Schema.Schema<GraphqlRequest>;

export interface GraphqlResponse {
  /** The result of the execution of the requested operation. If an error was raised before execution begins, the data entry should not be present in the result. (a request error: https://spec.graphql.org/draft/#sec-Errors.Request-Errors) If an error was raised during the execution that prevented a valid response, the data entry in the response should be null. (a field error: https://spec.graphql.org/draft/#sec-Errors.Error-Result-Format) */
  data?: Record<string, unknown>;
  /** Errors of this response. If the data entry in the response is not present, the errors entry must be present. It conforms to https://spec.graphql.org/draft/#sec-Errors . */
  errors?: Array<GraphqlError>;
  /** Additional response information. It conforms to https://spec.graphql.org/draft/#sec-Extensions . */
  extensions?: GraphqlResponseExtensions;
}

export const GraphqlResponse: Schema.Schema<GraphqlResponse> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  errors: Schema.optional(Schema.Array(GraphqlError)),
  extensions: Schema.optional(GraphqlResponseExtensions),
})).annotate({ identifier: "GraphqlResponse" }) as any as Schema.Schema<GraphqlResponse>;

export interface ImpersonateRequest {
  /** Required. The name of the GraphQL operation name. Required because all Connector operations must be named. See https://graphql.org/learn/queries/#operation-name. */
  operationName?: string;
  /** Optional. Values for GraphQL variables provided in this request. */
  variables?: Record<string, unknown>;
  /** Optional. Additional GraphQL request information. */
  extensions?: GraphqlRequestExtensions;
}

export const ImpersonateRequest: Schema.Schema<ImpersonateRequest> = Schema.suspend(() => Schema.Struct({
  operationName: Schema.optional(Schema.String),
  variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  extensions: Schema.optional(GraphqlRequestExtensions),
})).annotate({ identifier: "ImpersonateRequest" }) as any as Schema.Schema<ImpersonateRequest>;

export interface Service {
  /** Identifier. The relative resource name of the Firebase Data Connect service, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` Note that the service ID is specific to Firebase Data Connect and does not correspond to any of the instance IDs of the underlying data source connections. */
  name?: string;
  /** Output only. [Output only] Create time stamp. */
  createTime?: string;
  /** Output only. [Output only] Update time stamp. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Optional. Stores small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. A field that if true, indicates that the system is working update the service. */
  reconciling?: boolean;
  /** Optional. Mutable human-readable name. 63 character limit. */
  displayName?: string;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. [AIP-154](https://google.aip.dev/154) */
  etag?: string;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** The list of Services. */
  services?: Array<Service>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface CloudSqlInstance {
  /** Required. Name of the CloudSQL instance, in the format: ``` projects/{project}/locations/{location}/instances/{instance} ``` */
  instance?: string;
}

export const CloudSqlInstance: Schema.Schema<CloudSqlInstance> = Schema.suspend(() => Schema.Struct({
  instance: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlInstance" }) as any as Schema.Schema<CloudSqlInstance>;

export interface PostgreSql {
  /** Optional. Configure how much Postgresql schema validation to perform. */
  schemaValidation?: "SQL_SCHEMA_VALIDATION_UNSPECIFIED" | "NONE" | "STRICT" | "COMPATIBLE" | (string & {});
  /** Optional. Configure how to perform Postgresql schema migration. */
  schemaMigration?: "SQL_SCHEMA_MIGRATION_UNSPECIFIED" | "MIGRATE_COMPATIBLE" | (string & {});
  /** No Postgres data source is linked. If set, don't allow `database` and `schema_validation` to be configured. */
  unlinked?: boolean;
  /** Cloud SQL configurations. */
  cloudSql?: CloudSqlInstance;
  /** Required. Name of the PostgreSQL database. */
  database?: string;
  /** Output only. Ephemeral is true if this data connect service is served from temporary in-memory emulation of Postgres. While Cloud SQL is being provisioned, the data connect service provides the ephemeral service to help developers get started. Once the Cloud SQL is provisioned, Data Connect service will transfer its data on a best-effort basis to the Cloud SQL instance. WARNING: Ephemeral data sources will expire after 24 hour. The data will be lost if they aren't transferred to the Cloud SQL instance. WARNING: When `ephemeral=true`, mutations to the database are not guaranteed to be durably persisted, even if an OK status code is returned. All or parts of the data may be lost or reverted to earlier versions. */
  ephemeral?: boolean;
}

export const PostgreSql: Schema.Schema<PostgreSql> = Schema.suspend(() => Schema.Struct({
  schemaValidation: Schema.optional(Schema.String),
  schemaMigration: Schema.optional(Schema.String),
  unlinked: Schema.optional(Schema.Boolean),
  cloudSql: Schema.optional(CloudSqlInstance),
  database: Schema.optional(Schema.String),
  ephemeral: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PostgreSql" }) as any as Schema.Schema<PostgreSql>;

export interface HttpGraphql {
  /** Required. The endpoint of the HTTP GraphQL server. */
  uri?: string;
  /** Optional. Timeout duration for the HTTP request. */
  timeout?: string;
}

export const HttpGraphql: Schema.Schema<HttpGraphql> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpGraphql" }) as any as Schema.Schema<HttpGraphql>;

export interface Datasource {
  /** PostgreSQL configurations. */
  postgresql?: PostgreSql;
  /** HTTP GraphQL server webhook configurations. */
  httpGraphql?: HttpGraphql;
}

export const Datasource: Schema.Schema<Datasource> = Schema.suspend(() => Schema.Struct({
  postgresql: Schema.optional(PostgreSql),
  httpGraphql: Schema.optional(HttpGraphql),
})).annotate({ identifier: "Datasource" }) as any as Schema.Schema<Datasource>;

export interface File {
  /** Required. The file name including folder path, if applicable. The path should be relative to a local workspace (e.g. dataconnect/(schema|connector)/*.gql) and not an absolute path (e.g. /absolute/path/(schema|connector)/*.gql). */
  path?: string;
  /** Required. The file's textual content. */
  content?: string;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface Source {
  /** Required. The files that comprise the source set. */
  files?: Array<File>;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(File)),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface Firebasedataconnect_Schema {
  /** Identifier. The relative resource name of the schema, in the format: ``` projects/{project}/locations/{location}/services/{service}/schemas/{schema} ``` Right now, the only supported schema is "main". */
  name?: string;
  /** Output only. [Output only] Create time stamp. */
  createTime?: string;
  /** Output only. [Output only] Update time stamp. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Optional. Stores small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Required. The data sources linked in the schema. */
  datasources?: Array<Datasource>;
  /** Required. The source files that comprise the application schema. */
  source?: Source;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. A field that if true, indicates that the system is working to compile and deploy the schema. */
  reconciling?: boolean;
  /** Optional. Mutable human-readable name. 63 character limit. */
  displayName?: string;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. [AIP-154](https://google.aip.dev/154) */
  etag?: string;
}

export const Firebasedataconnect_Schema: Schema.Schema<Firebasedataconnect_Schema> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  datasources: Schema.optional(Schema.Array(Datasource)),
  source: Schema.optional(Source),
  uid: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Firebasedataconnect_Schema" }) as any as Schema.Schema<Firebasedataconnect_Schema>;

export interface ListSchemasResponse {
  /** The list of Schemas. */
  schemas?: Array<Firebasedataconnect_Schema>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSchemasResponse: Schema.Schema<ListSchemasResponse> = Schema.suspend(() => Schema.Struct({
  schemas: Schema.optional(Schema.Array(Firebasedataconnect_Schema)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSchemasResponse" }) as any as Schema.Schema<ListSchemasResponse>;

export interface ClientCache {
  /** Optional. A field that, if true, enables stricter validation on the connector source code to make sure the operation response shapes are suitable for client-side caching. This can include additional errors and warnings. For example, using the same alias for different fields is disallowed, as it may cause conflicts or confusion with normalized caching. (This field is off by default for compatibility, but enabling it is highly recommended to catch common caching pitfalls.) */
  strictValidationEnabled?: boolean;
  /** Optional. A field that, if true, means that responses served by this connector will include entityIds in GraphQL response extensions. This helps the client SDK cache responses in an improved way, known as "normalized caching", if caching is enabled on the client. Each entityId is a stable key based on primary key values. Therefore, this field should only be set to true if the primary keys of accessed tables do not contain sensitive information. */
  entityIdIncluded?: boolean;
}

export const ClientCache: Schema.Schema<ClientCache> = Schema.suspend(() => Schema.Struct({
  strictValidationEnabled: Schema.optional(Schema.Boolean),
  entityIdIncluded: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ClientCache" }) as any as Schema.Schema<ClientCache>;

export interface Connector {
  /** Identifier. The relative resource name of the connector, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name?: string;
  /** Output only. [Output only] Create time stamp. */
  createTime?: string;
  /** Output only. [Output only] Update time stamp. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Optional. Stores small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Required. The source files that comprise the connector. */
  source?: Source;
  /** Output only. System-assigned, unique identifier. */
  uid?: string;
  /** Output only. A field that if true, indicates that the system is working to compile and deploy the connector. */
  reconciling?: boolean;
  /** Optional. Mutable human-readable name. 63 character limit. */
  displayName?: string;
  /** Optional. The client cache settings of the connector. */
  clientCache?: ClientCache;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. [AIP-154](https://google.aip.dev/154) */
  etag?: string;
}

export const Connector: Schema.Schema<Connector> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  source: Schema.optional(Source),
  uid: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  clientCache: Schema.optional(ClientCache),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Connector" }) as any as Schema.Schema<Connector>;

export interface ListConnectorsResponse {
  /** The list of Connectors. */
  connectors?: Array<Connector>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConnectorsResponse: Schema.Schema<ListConnectorsResponse> = Schema.suspend(() => Schema.Struct({
  connectors: Schema.optional(Schema.Array(Connector)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConnectorsResponse" }) as any as Schema.Schema<ListConnectorsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Execute any GraphQL query and mutation against the Firebase Data Connect's generated GraphQL schema. Grants full read and write access to the connected data sources. Note: Use introspection query to explore the generated GraphQL schema. */
export interface ExecuteGraphqlProjectsLocationsServicesRequest {
  /** Required. The relative resource name of Firebase Data Connect service, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` */
  name: string;
  /** Request body */
  body?: GraphqlRequest;
}

export const ExecuteGraphqlProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GraphqlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:executeGraphql", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteGraphqlProjectsLocationsServicesRequest>;

export type ExecuteGraphqlProjectsLocationsServicesResponse = GraphqlResponse;
export const ExecuteGraphqlProjectsLocationsServicesResponse = GraphqlResponse;

export type ExecuteGraphqlProjectsLocationsServicesError = CommonErrors;

export const executeGraphqlProjectsLocationsServices: API.OperationMethod<ExecuteGraphqlProjectsLocationsServicesRequest, ExecuteGraphqlProjectsLocationsServicesResponse, ExecuteGraphqlProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteGraphqlProjectsLocationsServicesRequest,
  output: ExecuteGraphqlProjectsLocationsServicesResponse,
  errors: [],
}));

/** Execute any GraphQL query against the Firebase Data Connect's generated GraphQL schema. Grants full read to the connected data sources. `ExecuteGraphqlRead` is identical to `ExecuteGraphql` except it only accepts read-only query. */
export interface ExecuteGraphqlReadProjectsLocationsServicesRequest {
  /** Required. The relative resource name of Firebase Data Connect service, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` */
  name: string;
  /** Request body */
  body?: GraphqlRequest;
}

export const ExecuteGraphqlReadProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GraphqlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:executeGraphqlRead", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteGraphqlReadProjectsLocationsServicesRequest>;

export type ExecuteGraphqlReadProjectsLocationsServicesResponse = GraphqlResponse;
export const ExecuteGraphqlReadProjectsLocationsServicesResponse = GraphqlResponse;

export type ExecuteGraphqlReadProjectsLocationsServicesError = CommonErrors;

export const executeGraphqlReadProjectsLocationsServices: API.OperationMethod<ExecuteGraphqlReadProjectsLocationsServicesRequest, ExecuteGraphqlReadProjectsLocationsServicesResponse, ExecuteGraphqlReadProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteGraphqlReadProjectsLocationsServicesRequest,
  output: ExecuteGraphqlReadProjectsLocationsServicesResponse,
  errors: [],
}));

/** Execute introspection query against the Firebase Data Connect's generated GraphQL schema. GraphQL introspection query provides metadata such as what tables the schema have, what queries and mutations can be performed on the schema, and so on. Read more at https://graphql.org/learn/introspection. IntrospectGraphql can read schema metadata but cannot read rows from Cloud SQL instance, which can be done via ExecuteGraphqlRead. */
export interface IntrospectGraphqlProjectsLocationsServicesRequest {
  /** Required. The relative resource name of Firebase Data Connect service, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` */
  name: string;
  /** Request body */
  body?: GraphqlRequest;
}

export const IntrospectGraphqlProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GraphqlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:introspectGraphql", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IntrospectGraphqlProjectsLocationsServicesRequest>;

export type IntrospectGraphqlProjectsLocationsServicesResponse = GraphqlResponse;
export const IntrospectGraphqlProjectsLocationsServicesResponse = GraphqlResponse;

export type IntrospectGraphqlProjectsLocationsServicesError = CommonErrors;

export const introspectGraphqlProjectsLocationsServices: API.OperationMethod<IntrospectGraphqlProjectsLocationsServicesRequest, IntrospectGraphqlProjectsLocationsServicesResponse, IntrospectGraphqlProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IntrospectGraphqlProjectsLocationsServicesRequest,
  output: IntrospectGraphqlProjectsLocationsServicesResponse,
  errors: [],
}));

/** Lists Services in a given project and location. */
export interface ListProjectsLocationsServicesRequest {
  /** Required. Value of parent. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListServices` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListServices` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesRequest>;

export type ListProjectsLocationsServicesResponse = ListServicesResponse;
export const ListProjectsLocationsServicesResponse = ListServicesResponse;

export type ListProjectsLocationsServicesError = CommonErrors;

export const listProjectsLocationsServices = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesRequest,
  output: ListProjectsLocationsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Service. */
export interface GetProjectsLocationsServicesRequest {
  /** Required. The name of the service to retrieve, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` */
  name: string;
}

export const GetProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesRequest>;

export type GetProjectsLocationsServicesResponse = Service;
export const GetProjectsLocationsServicesResponse = Service;

export type GetProjectsLocationsServicesError = CommonErrors;

export const getProjectsLocationsServices: API.OperationMethod<GetProjectsLocationsServicesRequest, GetProjectsLocationsServicesResponse, GetProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesRequest,
  output: GetProjectsLocationsServicesResponse,
  errors: [],
}));

/** Creates a new Service in a given project and location. */
export interface CreateProjectsLocationsServicesRequest {
  /** Required. Value of parent. */
  parent: string;
  /** Required. The ID to use for the service, which will become the final component of the service's resource name. */
  serviceId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request and preview the Service, but do not actually create it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Service;
}

export const CreateProjectsLocationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesRequest>;

export type CreateProjectsLocationsServicesResponse = Operation;
export const CreateProjectsLocationsServicesResponse = Operation;

export type CreateProjectsLocationsServicesError = CommonErrors;

export const createProjectsLocationsServices: API.OperationMethod<CreateProjectsLocationsServicesRequest, CreateProjectsLocationsServicesResponse, CreateProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesRequest,
  output: CreateProjectsLocationsServicesResponse,
  errors: [],
}));

/** Updates the parameters of a single Service. */
export interface PatchProjectsLocationsServicesRequest {
  /** Identifier. The relative resource name of the Firebase Data Connect service, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` Note that the service ID is specific to Firebase Data Connect and does not correspond to any of the instance IDs of the underlying data source connections. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Service resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If true and the Service is not found, a new Service will be created. In this case, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the Service, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Service;
}

export const PatchProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServicesRequest>;

export type PatchProjectsLocationsServicesResponse = Operation;
export const PatchProjectsLocationsServicesResponse = Operation;

export type PatchProjectsLocationsServicesError = CommonErrors;

export const patchProjectsLocationsServices: API.OperationMethod<PatchProjectsLocationsServicesRequest, PatchProjectsLocationsServicesResponse, PatchProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServicesRequest,
  output: PatchProjectsLocationsServicesResponse,
  errors: [],
}));

/** Deletes a single Service. */
export interface DeleteProjectsLocationsServicesRequest {
  /** Required. The name of the service to delete, in the format: ``` projects/{project}/locations/{location}/services/{service} ``` */
  name: string;
  /** Optional. If set to true, any child resources (i.e. Schema, SchemaRevisions, Connectors, and ConnectorRevisions) will also be deleted. Otherwise, the request will only work if the Service has no child resources. */
  force?: boolean;
  /** Optional. The etag of the Service. If this is provided, it must match the server's etag. */
  etag?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If true and the Service is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the Service, but do not actually delete it. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesRequest>;

export type DeleteProjectsLocationsServicesResponse = Operation;
export const DeleteProjectsLocationsServicesResponse = Operation;

export type DeleteProjectsLocationsServicesError = CommonErrors;

export const deleteProjectsLocationsServices: API.OperationMethod<DeleteProjectsLocationsServicesRequest, DeleteProjectsLocationsServicesResponse, DeleteProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesRequest,
  output: DeleteProjectsLocationsServicesResponse,
  errors: [],
}));

/** Execute a predefined query in a Connector. */
export interface ExecuteQueryProjectsLocationsServicesConnectorsRequest {
  /** Required. The resource name of the connector to find the predefined query, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
  /** Request body */
  body?: ExecuteQueryRequest;
}

export const ExecuteQueryProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExecuteQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}:executeQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteQueryProjectsLocationsServicesConnectorsRequest>;

export type ExecuteQueryProjectsLocationsServicesConnectorsResponse = ExecuteQueryResponse;
export const ExecuteQueryProjectsLocationsServicesConnectorsResponse = ExecuteQueryResponse;

export type ExecuteQueryProjectsLocationsServicesConnectorsError = CommonErrors;

export const executeQueryProjectsLocationsServicesConnectors: API.OperationMethod<ExecuteQueryProjectsLocationsServicesConnectorsRequest, ExecuteQueryProjectsLocationsServicesConnectorsResponse, ExecuteQueryProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteQueryProjectsLocationsServicesConnectorsRequest,
  output: ExecuteQueryProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Execute a predefined mutation in a Connector. */
export interface ExecuteMutationProjectsLocationsServicesConnectorsRequest {
  /** Required. The resource name of the connector to find the predefined mutation, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
  /** Request body */
  body?: ExecuteMutationRequest;
}

export const ExecuteMutationProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExecuteMutationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}:executeMutation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteMutationProjectsLocationsServicesConnectorsRequest>;

export type ExecuteMutationProjectsLocationsServicesConnectorsResponse = ExecuteMutationResponse;
export const ExecuteMutationProjectsLocationsServicesConnectorsResponse = ExecuteMutationResponse;

export type ExecuteMutationProjectsLocationsServicesConnectorsError = CommonErrors;

export const executeMutationProjectsLocationsServicesConnectors: API.OperationMethod<ExecuteMutationProjectsLocationsServicesConnectorsRequest, ExecuteMutationProjectsLocationsServicesConnectorsResponse, ExecuteMutationProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteMutationProjectsLocationsServicesConnectorsRequest,
  output: ExecuteMutationProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Impersonate a query defined on a Firebase Data Connect connector. It grants the admin SDK access to queries defined in the given connector. The caller can choose to impersonate a particular Firebase Auth user, or skip @auth completely. */
export interface ImpersonateQueryProjectsLocationsServicesConnectorsRequest {
  /** Required. The resource name of the connector to find the predefined query/mutation, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
  /** Request body */
  body?: ImpersonateRequest;
}

export const ImpersonateQueryProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImpersonateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}:impersonateQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImpersonateQueryProjectsLocationsServicesConnectorsRequest>;

export type ImpersonateQueryProjectsLocationsServicesConnectorsResponse = GraphqlResponse;
export const ImpersonateQueryProjectsLocationsServicesConnectorsResponse = GraphqlResponse;

export type ImpersonateQueryProjectsLocationsServicesConnectorsError = CommonErrors;

export const impersonateQueryProjectsLocationsServicesConnectors: API.OperationMethod<ImpersonateQueryProjectsLocationsServicesConnectorsRequest, ImpersonateQueryProjectsLocationsServicesConnectorsResponse, ImpersonateQueryProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImpersonateQueryProjectsLocationsServicesConnectorsRequest,
  output: ImpersonateQueryProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Impersonate a mutation defined on a Firebase Data Connect connector. It grants the admin SDK access to mutations defined in the given connector. The caller can choose to impersonate a particular Firebase Auth user, or skip @auth completely. */
export interface ImpersonateMutationProjectsLocationsServicesConnectorsRequest {
  /** Required. The resource name of the connector to find the predefined query/mutation, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
  /** Request body */
  body?: ImpersonateRequest;
}

export const ImpersonateMutationProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImpersonateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}:impersonateMutation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImpersonateMutationProjectsLocationsServicesConnectorsRequest>;

export type ImpersonateMutationProjectsLocationsServicesConnectorsResponse = GraphqlResponse;
export const ImpersonateMutationProjectsLocationsServicesConnectorsResponse = GraphqlResponse;

export type ImpersonateMutationProjectsLocationsServicesConnectorsError = CommonErrors;

export const impersonateMutationProjectsLocationsServicesConnectors: API.OperationMethod<ImpersonateMutationProjectsLocationsServicesConnectorsRequest, ImpersonateMutationProjectsLocationsServicesConnectorsResponse, ImpersonateMutationProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImpersonateMutationProjectsLocationsServicesConnectorsRequest,
  output: ImpersonateMutationProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Lists Connectors in a given project and location. */
export interface ListProjectsLocationsServicesConnectorsRequest {
  /** Required. Value of parent. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListConnectors` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectors` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesConnectorsRequest>;

export type ListProjectsLocationsServicesConnectorsResponse = ListConnectorsResponse;
export const ListProjectsLocationsServicesConnectorsResponse = ListConnectorsResponse;

export type ListProjectsLocationsServicesConnectorsError = CommonErrors;

export const listProjectsLocationsServicesConnectors = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesConnectorsRequest,
  output: ListProjectsLocationsServicesConnectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Connector. */
export interface GetProjectsLocationsServicesConnectorsRequest {
  /** Required. The name of the connector to retrieve, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
}

export const GetProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesConnectorsRequest>;

export type GetProjectsLocationsServicesConnectorsResponse = Connector;
export const GetProjectsLocationsServicesConnectorsResponse = Connector;

export type GetProjectsLocationsServicesConnectorsError = CommonErrors;

export const getProjectsLocationsServicesConnectors: API.OperationMethod<GetProjectsLocationsServicesConnectorsRequest, GetProjectsLocationsServicesConnectorsResponse, GetProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesConnectorsRequest,
  output: GetProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Creates a new Connector in a given project and location. The operations are validated against and must be compatible with the active schema. If the operations and schema are not compatible or if the schema is not present, this will result in an error. */
export interface CreateProjectsLocationsServicesConnectorsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. The ID to use for the connector, which will become the final component of the connector's resource name. */
  connectorId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request and preview the Connector, but do not actually create it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Connector;
}

export const CreateProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Connector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesConnectorsRequest>;

export type CreateProjectsLocationsServicesConnectorsResponse = Operation;
export const CreateProjectsLocationsServicesConnectorsResponse = Operation;

export type CreateProjectsLocationsServicesConnectorsError = CommonErrors;

export const createProjectsLocationsServicesConnectors: API.OperationMethod<CreateProjectsLocationsServicesConnectorsRequest, CreateProjectsLocationsServicesConnectorsResponse, CreateProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesConnectorsRequest,
  output: CreateProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Updates the parameters of a single Connector, and creates a new ConnectorRevision with the updated Connector. The operations are validated against and must be compatible with the live schema. If the operations and schema are not compatible or if the schema is not present, this will result in an error. */
export interface PatchProjectsLocationsServicesConnectorsRequest {
  /** Identifier. The relative resource name of the connector, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Connector resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If true and the Connector is not found, a new Connector will be created. In this case, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the Connector, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Connector;
}

export const PatchProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Connector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServicesConnectorsRequest>;

export type PatchProjectsLocationsServicesConnectorsResponse = Operation;
export const PatchProjectsLocationsServicesConnectorsResponse = Operation;

export type PatchProjectsLocationsServicesConnectorsError = CommonErrors;

export const patchProjectsLocationsServicesConnectors: API.OperationMethod<PatchProjectsLocationsServicesConnectorsRequest, PatchProjectsLocationsServicesConnectorsResponse, PatchProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServicesConnectorsRequest,
  output: PatchProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Deletes a single Connector. */
export interface DeleteProjectsLocationsServicesConnectorsRequest {
  /** Required. The name of the connector to delete, in the format: ``` projects/{project}/locations/{location}/services/{service}/connectors/{connector} ``` */
  name: string;
  /** Optional. If set to true, any child resources (i.e. ConnectorRevisions) will also be deleted. Otherwise, the request will only work if the Connector has no child resources. */
  force?: boolean;
  /** Optional. The etag of the Connector. If this is provided, it must match the server's etag. */
  etag?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If true and the Connector is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the Connector, but do not actually delete it. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsServicesConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/connectors/{connectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesConnectorsRequest>;

export type DeleteProjectsLocationsServicesConnectorsResponse = Operation;
export const DeleteProjectsLocationsServicesConnectorsResponse = Operation;

export type DeleteProjectsLocationsServicesConnectorsError = CommonErrors;

export const deleteProjectsLocationsServicesConnectors: API.OperationMethod<DeleteProjectsLocationsServicesConnectorsRequest, DeleteProjectsLocationsServicesConnectorsResponse, DeleteProjectsLocationsServicesConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesConnectorsRequest,
  output: DeleteProjectsLocationsServicesConnectorsResponse,
  errors: [],
}));

/** Gets details of a single Schema. */
export interface GetProjectsLocationsServicesSchemasRequest {
  /** Required. The name of the schema to retrieve, in the format: ``` projects/{project}/locations/{location}/services/{service}/schemas/{schema} ``` */
  name: string;
}

export const GetProjectsLocationsServicesSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesSchemasRequest>;

export type GetProjectsLocationsServicesSchemasResponse = Firebasedataconnect_Schema;
export const GetProjectsLocationsServicesSchemasResponse = Firebasedataconnect_Schema;

export type GetProjectsLocationsServicesSchemasError = CommonErrors;

export const getProjectsLocationsServicesSchemas: API.OperationMethod<GetProjectsLocationsServicesSchemasRequest, GetProjectsLocationsServicesSchemasResponse, GetProjectsLocationsServicesSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesSchemasRequest,
  output: GetProjectsLocationsServicesSchemasResponse,
  errors: [],
}));

/** Lists Schemas in a given project and location. */
export interface ListProjectsLocationsServicesSchemasRequest {
  /** Required. Value of parent. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListSchemas` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSchemas` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsServicesSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/schemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesSchemasRequest>;

export type ListProjectsLocationsServicesSchemasResponse = ListSchemasResponse;
export const ListProjectsLocationsServicesSchemasResponse = ListSchemasResponse;

export type ListProjectsLocationsServicesSchemasError = CommonErrors;

export const listProjectsLocationsServicesSchemas = API.makePaginated(() => ({
  input: ListProjectsLocationsServicesSchemasRequest,
  output: ListProjectsLocationsServicesSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new Schema in a given project and location. Only creation of `schemas/main` is supported and calling create with any other schema ID will result in an error. */
export interface CreateProjectsLocationsServicesSchemasRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. The ID to use for the schema, which will become the final component of the schema's resource name. Currently, only `main` is supported and any other schema ID will result in an error. */
  schemaId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request and preview the Schema, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Firebasedataconnect_Schema;
}

export const CreateProjectsLocationsServicesSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  schemaId: Schema.optional(Schema.String).pipe(T.HttpQuery("schemaId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Firebasedataconnect_Schema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/schemas", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesSchemasRequest>;

export type CreateProjectsLocationsServicesSchemasResponse = Operation;
export const CreateProjectsLocationsServicesSchemasResponse = Operation;

export type CreateProjectsLocationsServicesSchemasError = CommonErrors;

export const createProjectsLocationsServicesSchemas: API.OperationMethod<CreateProjectsLocationsServicesSchemasRequest, CreateProjectsLocationsServicesSchemasResponse, CreateProjectsLocationsServicesSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesSchemasRequest,
  output: CreateProjectsLocationsServicesSchemasResponse,
  errors: [],
}));

/** Updates the parameters of a single Schema, and creates a new SchemaRevision with the updated Schema. */
export interface PatchProjectsLocationsServicesSchemasRequest {
  /** Identifier. The relative resource name of the schema, in the format: ``` projects/{project}/locations/{location}/services/{service}/schemas/{schema} ``` Right now, the only supported schema is "main". */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Schema resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If true and the Schema is not found, a new Schema will be created. In this case, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the Schema, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Firebasedataconnect_Schema;
}

export const PatchProjectsLocationsServicesSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Firebasedataconnect_Schema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/schemas/{schemasId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServicesSchemasRequest>;

export type PatchProjectsLocationsServicesSchemasResponse = Operation;
export const PatchProjectsLocationsServicesSchemasResponse = Operation;

export type PatchProjectsLocationsServicesSchemasError = CommonErrors;

export const patchProjectsLocationsServicesSchemas: API.OperationMethod<PatchProjectsLocationsServicesSchemasRequest, PatchProjectsLocationsServicesSchemasResponse, PatchProjectsLocationsServicesSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServicesSchemasRequest,
  output: PatchProjectsLocationsServicesSchemasResponse,
  errors: [],
}));

/** Deletes a single Schema. Because the schema and connectors must be compatible at all times, if this is called while any connectors are active, this will result in an error. */
export interface DeleteProjectsLocationsServicesSchemasRequest {
  /** Required. The name of the schema to delete, in the format: ``` projects/{project}/locations/{location}/services/{service}/schemas/{schema} ``` */
  name: string;
  /** Optional. If set to true, any child resources (i.e. SchemaRevisions) will also be deleted. */
  force?: boolean;
  /** Optional. The etag of the Schema. If this is provided, it must match the server's etag. */
  etag?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If true and the Schema is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the Schema, but do not actually delete it. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsServicesSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesSchemasRequest>;

export type DeleteProjectsLocationsServicesSchemasResponse = Operation;
export const DeleteProjectsLocationsServicesSchemasResponse = Operation;

export type DeleteProjectsLocationsServicesSchemasError = CommonErrors;

export const deleteProjectsLocationsServicesSchemas: API.OperationMethod<DeleteProjectsLocationsServicesSchemasRequest, DeleteProjectsLocationsServicesSchemasResponse, DeleteProjectsLocationsServicesSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesSchemasRequest,
  output: DeleteProjectsLocationsServicesSchemasResponse,
  errors: [],
}));

