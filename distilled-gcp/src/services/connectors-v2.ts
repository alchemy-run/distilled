// ==========================================================================
// Connectors API (connectors v2)
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
  name: "connectors",
  version: "v2",
  rootUrl: "https://connectors.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ExecutionConfig {
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  headers?: string;
}

export const ExecutionConfig: Schema.Schema<ExecutionConfig> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutionConfig" }) as any as Schema.Schema<ExecutionConfig>;

export interface ExecuteActionRequest {
  /** Parameters for executing the action. The parameters can be key/value pairs or nested structs. */
  parameters?: Record<string, unknown>;
  /** Execution config for the request. */
  executionConfig?: ExecutionConfig;
}

export const ExecuteActionRequest: Schema.Schema<ExecuteActionRequest> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  executionConfig: Schema.optional(ExecutionConfig),
})).annotate({ identifier: "ExecuteActionRequest" }) as any as Schema.Schema<ExecuteActionRequest>;

export interface ExecuteActionResponse {
  /** In the case of successful invocation of the specified action, the results Struct contains values based on the response of the action invoked. 1. If the action execution produces any entities as a result, they are returned as an array of Structs with the 'key' being the field name and the 'value' being the value of that field in each result row. { 'results': [{'key': 'value'}, ...] } */
  results?: Array<Record<string, unknown>>;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ExecuteActionResponse: Schema.Schema<ExecuteActionResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ExecuteActionResponse" }) as any as Schema.Schema<ExecuteActionResponse>;

export interface JsonSchema {
  /** A description of this schema. */
  description?: string;
  /** The default value of the field or object described by this schema. */
  default?: unknown;
  /** Whether this property is required. */
  required?: Array<string>;
  /** JSON Schema Validation: A Vocabulary for Structural Validation of JSON */
  type?: Array<string>;
  /** Schema that applies to array values, applicable only if this is of type `array`. */
  items?: JsonSchema;
  /** The child schemas, applicable only if this is of type `object`. The key is the name of the property and the value is the json schema that describes that property */
  properties?: Record<string, JsonSchema>;
  /** Possible values for an enumeration. This works in conjunction with `type` to represent types with a fixed set of legal values */
  enum?: Array<unknown>;
  /** JDBC datatype of the field. */
  jdbcType?: "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE" | (string & {});
  /** Format of the value as per https://json-schema.org/understanding-json-schema/reference/string.html#format */
  format?: string;
  /** Additional details apart from standard json schema fields, this gives flexibility to store metadata about the schema */
  additionalDetails?: Record<string, unknown>;
}

export const JsonSchema: Schema.Schema<JsonSchema> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  default: Schema.optional(Schema.Unknown),
  required: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.Array(Schema.String)),
  items: Schema.optional(JsonSchema),
  properties: Schema.optional(Schema.Record(Schema.String, JsonSchema)),
  enum: Schema.optional(Schema.Array(Schema.Unknown)),
  jdbcType: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  additionalDetails: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "JsonSchema" }) as any as Schema.Schema<JsonSchema>;

export interface InputParameter {
  /** Name of the Parameter. */
  name?: string;
  /** A brief description of the Parameter. */
  description?: string;
  /** The data type of the Parameter */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE" | (string & {});
  /** Specifies whether a null value is allowed. */
  nullable?: boolean;
  /** The following field specifies the default value of the Parameter provided by the external system if a value is not provided. */
  defaultValue?: unknown;
  /** JsonSchema of the parameter, applicable only if parameter is of type `STRUCT` */
  jsonSchema?: JsonSchema;
  /** The following map contains fields that are not explicitly mentioned above,this give connectors the flexibility to add new metadata fields. */
  additionalDetails?: Record<string, unknown>;
}

export const InputParameter: Schema.Schema<InputParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  nullable: Schema.optional(Schema.Boolean),
  defaultValue: Schema.optional(Schema.Unknown),
  jsonSchema: Schema.optional(JsonSchema),
  additionalDetails: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "InputParameter" }) as any as Schema.Schema<InputParameter>;

export interface ResultMetadata {
  /** Name of the metadata field. */
  name?: string;
  /** A brief description of the metadata field. */
  description?: string;
  /** The data type of the metadata field */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE" | (string & {});
  /** JsonSchema of the result, applicable only if parameter is of type `STRUCT` */
  jsonSchema?: JsonSchema;
  /** Specifies whether a null value is allowed. */
  nullable?: boolean;
  /** The following field specifies the default value of the Parameter provided by the external system if a value is not provided. */
  defaultValue?: unknown;
}

export const ResultMetadata: Schema.Schema<ResultMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  jsonSchema: Schema.optional(JsonSchema),
  nullable: Schema.optional(Schema.Boolean),
  defaultValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "ResultMetadata" }) as any as Schema.Schema<ResultMetadata>;

export interface Action {
  /** Name of the action. */
  name?: string;
  /** List containing input parameter metadata. */
  inputParameters?: Array<InputParameter>;
  /** List containing the metadata of result fields. */
  resultMetadata?: Array<ResultMetadata>;
  /** JsonSchema representation of this actions's input schema */
  inputJsonSchema?: JsonSchema;
  /** JsonSchema representation of this actions's result schema */
  resultJsonSchema?: JsonSchema;
  /** Display Name of action to be shown on client side */
  displayName?: string;
  /** Brief Description of action */
  description?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Array(InputParameter)),
  resultMetadata: Schema.optional(Schema.Array(ResultMetadata)),
  inputJsonSchema: Schema.optional(JsonSchema),
  resultJsonSchema: Schema.optional(JsonSchema),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface ListActionsResponse {
  /** List of action metadata. */
  actions?: Array<Action>;
  /** List of actions which contain unsupported Datatypes. Check datatype.proto for more information. */
  unsupportedActionNames?: Array<string>;
  /** Next page token if more actions available. */
  nextPageToken?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ListActionsResponse: Schema.Schema<ListActionsResponse> = Schema.suspend(() => Schema.Struct({
  actions: Schema.optional(Schema.Array(Action)),
  unsupportedActionNames: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ListActionsResponse" }) as any as Schema.Schema<ListActionsResponse>;

export interface CheckStatusResponse {
  /** State of the connector. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "ERROR" | "AUTH_ERROR" | (string & {});
  /** When the connector is not in ACTIVE state, the description must be populated to specify the reason why it's not in ACTIVE state. */
  description?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const CheckStatusResponse: Schema.Schema<CheckStatusResponse> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "CheckStatusResponse" }) as any as Schema.Schema<CheckStatusResponse>;

export interface CheckReadinessResponse {
  status?: string;
}

export const CheckReadinessResponse: Schema.Schema<CheckReadinessResponse> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckReadinessResponse" }) as any as Schema.Schema<CheckReadinessResponse>;

export interface AuthCodeData {
  /** OAuth authorization code. */
  authCode?: string;
  /** OAuth PKCE verifier, needed if PKCE is enabled for this particular connection. */
  pkceVerifier?: string;
  /** OAuth redirect URI passed in during the auth code flow, required by some OAuth backends. */
  redirectUri?: string;
  /** Scopes the connection will request when the user performs the auth code flow. */
  scopes?: Array<string>;
}

export const AuthCodeData: Schema.Schema<AuthCodeData> = Schema.suspend(() => Schema.Struct({
  authCode: Schema.optional(Schema.String),
  pkceVerifier: Schema.optional(Schema.String),
  redirectUri: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuthCodeData" }) as any as Schema.Schema<AuthCodeData>;

export interface OAuth2Config {
  /** Client ID for the OAuth2 flow. */
  clientId?: string;
  /** Client secret for the OAuth2 flow. */
  clientSecret?: string;
  /** Authorization Server URL/Token Endpoint for Authorization Code Flow */
  authUri?: string;
}

export const OAuth2Config: Schema.Schema<OAuth2Config> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  authUri: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuth2Config" }) as any as Schema.Schema<OAuth2Config>;

export interface ExchangeAuthCodeRequest {
  /** Optional. AuthCodeData contains the data the runtime requires to exchange for access and refresh tokens. If the data is not provided, the runtime will read the data from the secret manager. */
  authCodeData?: AuthCodeData;
  /** ExecutionConfig contains the configuration for the execution of the request. */
  executionConfig?: ExecutionConfig;
  /** OAuth2Config contains the OAuth2 config for the connection. */
  oauth2Config?: OAuth2Config;
}

export const ExchangeAuthCodeRequest: Schema.Schema<ExchangeAuthCodeRequest> = Schema.suspend(() => Schema.Struct({
  authCodeData: Schema.optional(AuthCodeData),
  executionConfig: Schema.optional(ExecutionConfig),
  oauth2Config: Schema.optional(OAuth2Config),
})).annotate({ identifier: "ExchangeAuthCodeRequest" }) as any as Schema.Schema<ExchangeAuthCodeRequest>;

export interface AccessCredentials {
  /** OAuth access token. */
  accessToken?: string;
  /** OAuth refresh token. */
  refreshToken?: string;
  /** Duration till the access token expires. */
  expiresIn?: string;
}

export const AccessCredentials: Schema.Schema<AccessCredentials> = Schema.suspend(() => Schema.Struct({
  accessToken: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessCredentials" }) as any as Schema.Schema<AccessCredentials>;

export interface ExchangeAuthCodeResponse {
  accessCredentials?: AccessCredentials;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ExchangeAuthCodeResponse: Schema.Schema<ExchangeAuthCodeResponse> = Schema.suspend(() => Schema.Struct({
  accessCredentials: Schema.optional(AccessCredentials),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ExchangeAuthCodeResponse" }) as any as Schema.Schema<ExchangeAuthCodeResponse>;

export interface RefreshAccessTokenRequest {
  /** Optional. Refresh Token String. If the Refresh Token is not provided, the runtime will read the data from the secret manager. */
  refreshToken?: string;
  /** ExecutionConfig contains the configuration for the execution of the request. */
  executionConfig?: ExecutionConfig;
  /** OAuth2Config contains the OAuth2 config for the connection. */
  oauth2Config?: OAuth2Config;
}

export const RefreshAccessTokenRequest: Schema.Schema<RefreshAccessTokenRequest> = Schema.suspend(() => Schema.Struct({
  refreshToken: Schema.optional(Schema.String),
  executionConfig: Schema.optional(ExecutionConfig),
  oauth2Config: Schema.optional(OAuth2Config),
})).annotate({ identifier: "RefreshAccessTokenRequest" }) as any as Schema.Schema<RefreshAccessTokenRequest>;

export interface RefreshAccessTokenResponse {
  accessCredentials?: AccessCredentials;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const RefreshAccessTokenResponse: Schema.Schema<RefreshAccessTokenResponse> = Schema.suspend(() => Schema.Struct({
  accessCredentials: Schema.optional(AccessCredentials),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "RefreshAccessTokenResponse" }) as any as Schema.Schema<RefreshAccessTokenResponse>;

export interface ToolAnnotations {
  /** If true, the tool may perform destructive updates to its environment. If false, the tool performs only additive updates. (This property is meaningful only when `read_only_hint == false`) */
  destructiveHint?: boolean;
  /** If true, calling the tool repeatedly with the same arguments will have no additional effect on the environment. (This property is meaningful only when `read_only_hint == false`) */
  idempotentHint?: boolean;
  /** If true, this tool may interact with an "open world" of external entities. If false, the tool's domain of interaction is closed. For example, the world of a web search tool is open, whereas that of a memory tool is not. */
  openWorldHint?: boolean;
  /** If true, the tool does not modify its environment. */
  readOnlyHint?: boolean;
  /** A human-readable title for the tool. */
  title?: string;
}

export const ToolAnnotations: Schema.Schema<ToolAnnotations> = Schema.suspend(() => Schema.Struct({
  destructiveHint: Schema.optional(Schema.Boolean),
  idempotentHint: Schema.optional(Schema.Boolean),
  openWorldHint: Schema.optional(Schema.Boolean),
  readOnlyHint: Schema.optional(Schema.Boolean),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "ToolAnnotations" }) as any as Schema.Schema<ToolAnnotations>;

export interface Tool {
  /** Name of the tool. */
  name?: string;
  /** Description of the tool. */
  description?: string;
  /** JSON schema for the input parameters of the tool. */
  inputSchema?: JsonSchema;
  /** JSON schema for the output of the tool. */
  outputSchema?: JsonSchema;
  /** List of tool names that this tool depends on. */
  dependsOn?: Array<string>;
  /** Annotations for the tool. */
  annotations?: ToolAnnotations;
}

export const Tool: Schema.Schema<Tool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  inputSchema: Schema.optional(JsonSchema),
  outputSchema: Schema.optional(JsonSchema),
  dependsOn: Schema.optional(Schema.Array(Schema.String)),
  annotations: Schema.optional(ToolAnnotations),
})).annotate({ identifier: "Tool" }) as any as Schema.Schema<Tool>;

export interface ListToolsResponse {
  /** List of available tools. */
  tools?: Array<Tool>;
  /** Next page token. */
  nextPageToken?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ListToolsResponse: Schema.Schema<ListToolsResponse> = Schema.suspend(() => Schema.Struct({
  tools: Schema.optional(Schema.Array(Tool)),
  nextPageToken: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ListToolsResponse" }) as any as Schema.Schema<ListToolsResponse>;

export interface ExecuteToolRequest {
  /** Input parameters for the tool. */
  parameters?: Record<string, unknown>;
  /** execution config for the request. */
  executionConfig?: ExecutionConfig;
  /** Tool definition for the tool to be executed. */
  toolDefinition?: Record<string, unknown>;
}

export const ExecuteToolRequest: Schema.Schema<ExecuteToolRequest> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  executionConfig: Schema.optional(ExecutionConfig),
  toolDefinition: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ExecuteToolRequest" }) as any as Schema.Schema<ExecuteToolRequest>;

export interface ExecuteToolResponse {
  /** Output from the tool execution. */
  result?: Record<string, unknown>;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ExecuteToolResponse: Schema.Schema<ExecuteToolResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ExecuteToolResponse" }) as any as Schema.Schema<ExecuteToolResponse>;

export interface ToolSpec {
  /** List of tool definitions. */
  toolDefinitions?: Array<Record<string, unknown>>;
  /** Version of the tool spec. Format: providerId/connectorId/versionId/toolSpecId */
  toolSpecVersion?: string;
}

export const ToolSpec: Schema.Schema<ToolSpec> = Schema.suspend(() => Schema.Struct({
  toolDefinitions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  toolSpecVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ToolSpec" }) as any as Schema.Schema<ToolSpec>;

export interface ListToolsPostRequest {
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** execution config for the request. */
  executionConfig?: ExecutionConfig;
  /** List of tool specifications. */
  toolSpec?: ToolSpec;
}

export const ListToolsPostRequest: Schema.Schema<ListToolsPostRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  executionConfig: Schema.optional(ExecutionConfig),
  toolSpec: Schema.optional(ToolSpec),
})).annotate({ identifier: "ListToolsPostRequest" }) as any as Schema.Schema<ListToolsPostRequest>;

export interface Resource {
  /** The URI of this resource. */
  uri?: string;
  /** A human-readable name for this resource. */
  name?: string;
  /** A description of what this resource represents. */
  description?: string;
  /** The MIME type of this resource, if known. */
  mimeType?: string;
  /** The size of the raw resource content, in bytes, if known. */
  size?: string;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
})).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface ListResourcesResponse {
  /** List of available resources. */
  resources?: Array<Resource>;
  /** Next page token if more resources available. */
  nextPageToken?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ListResourcesResponse: Schema.Schema<ListResourcesResponse> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Resource)),
  nextPageToken: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ListResourcesResponse" }) as any as Schema.Schema<ListResourcesResponse>;

export interface GetResourceResponse {
  /** The content of the resource. */
  data?: string;
  /** The MIME type of the resource. */
  mimeType?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const GetResourceResponse: Schema.Schema<GetResourceResponse> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GetResourceResponse" }) as any as Schema.Schema<GetResourceResponse>;

export interface GetResourcePostRequest {
  /** execution config for the request. */
  executionConfig?: ExecutionConfig;
  /** List of tool specifications. */
  toolSpec?: ToolSpec;
}

export const GetResourcePostRequest: Schema.Schema<GetResourcePostRequest> = Schema.suspend(() => Schema.Struct({
  executionConfig: Schema.optional(ExecutionConfig),
  toolSpec: Schema.optional(ToolSpec),
})).annotate({ identifier: "GetResourcePostRequest" }) as any as Schema.Schema<GetResourcePostRequest>;

export interface ToolName {
  /** Tool name that was generated in the list tools call. */
  name?: string;
  /** Entity name for which the tool was generated. */
  entityName?: string;
  /** Operation for which the tool was generated. */
  operation?: "OPERATION_UNSPECIFIED" | "LIST" | "GET" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
}

export const ToolName: Schema.Schema<ToolName> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entityName: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
})).annotate({ identifier: "ToolName" }) as any as Schema.Schema<ToolName>;

export interface GenerateCustomToolspecRequest {
  /** list of tools to be generated. */
  toolNames?: Array<ToolName>;
}

export const GenerateCustomToolspecRequest: Schema.Schema<GenerateCustomToolspecRequest> = Schema.suspend(() => Schema.Struct({
  toolNames: Schema.optional(Schema.Array(ToolName)),
})).annotate({ identifier: "GenerateCustomToolspecRequest" }) as any as Schema.Schema<GenerateCustomToolspecRequest>;

export interface GenerateCustomToolspecResponse {
  /** tool spec that has tool_defitions array containing the tools for all sted tool_names. */
  toolSpec?: ToolSpec;
}

export const GenerateCustomToolspecResponse: Schema.Schema<GenerateCustomToolspecResponse> = Schema.suspend(() => Schema.Struct({
  toolSpec: Schema.optional(ToolSpec),
})).annotate({ identifier: "GenerateCustomToolspecResponse" }) as any as Schema.Schema<GenerateCustomToolspecResponse>;

export interface ListCustomToolNamesResponse {
  /** List of custom tools. */
  toolNames?: Array<ToolName>;
}

export const ListCustomToolNamesResponse: Schema.Schema<ListCustomToolNamesResponse> = Schema.suspend(() => Schema.Struct({
  toolNames: Schema.optional(Schema.Array(ToolName)),
})).annotate({ identifier: "ListCustomToolNamesResponse" }) as any as Schema.Schema<ListCustomToolNamesResponse>;

export interface Reference {
  /** Name of reference entity type. */
  type?: string;
  /** Name of the reference field. */
  name?: string;
}

export const Reference: Schema.Schema<Reference> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Reference" }) as any as Schema.Schema<Reference>;

export interface Field {
  /** Name of the Field. */
  name?: string;
  /** A brief description of the Field. */
  description?: string;
  /** The data type of the Field. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE" | (string & {});
  /** The following boolean field specifies if the current Field acts as a primary key or id if the parent is of type entity. */
  key?: boolean;
  /** Specifies whether a null value is allowed. */
  nullable?: boolean;
  /** The following field specifies the default value of the Field provided by the external system if a value is not provided. */
  defaultValue?: unknown;
  /** The following map contains fields that are not explicitly mentioned above,this give connectors the flexibility to add new metadata fields. */
  additionalDetails?: Record<string, unknown>;
  /** Reference captures the association between two different entity types. Value links to the reference of another entity type. */
  reference?: Reference;
  /** JsonSchema of the field, applicable only if field is of type `STRUCT` */
  jsonSchema?: JsonSchema;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  key: Schema.optional(Schema.Boolean),
  nullable: Schema.optional(Schema.Boolean),
  defaultValue: Schema.optional(Schema.Unknown),
  additionalDetails: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  reference: Schema.optional(Reference),
  jsonSchema: Schema.optional(JsonSchema),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface EntityType {
  /** The name of the entity type. */
  name?: string;
  /** List containing metadata information about each field of the entity type. */
  fields?: Array<Field>;
  /** JsonSchema representation of this entity's schema */
  jsonSchema?: JsonSchema;
  operations?: Array<"OPERATION_UNSPECIFIED" | "LIST" | "GET" | "CREATE" | "UPDATE" | "DELETE" | (string & {})>;
  defaultSortBy?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const EntityType: Schema.Schema<EntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Field)),
  jsonSchema: Schema.optional(JsonSchema),
  operations: Schema.optional(Schema.Array(Schema.String)),
  defaultSortBy: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "EntityType" }) as any as Schema.Schema<EntityType>;

export interface ListEntityTypesResponse {
  /** List of metadata related to all entity types. */
  types?: Array<EntityType>;
  /** Next page token if more entity types available. */
  nextPageToken?: string;
  /** List of entity type names which contain unsupported Datatypes. Check datatype.proto for more information. */
  unsupportedTypeNames?: Array<string>;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ListEntityTypesResponse: Schema.Schema<ListEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  types: Schema.optional(Schema.Array(EntityType)),
  nextPageToken: Schema.optional(Schema.String),
  unsupportedTypeNames: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ListEntityTypesResponse" }) as any as Schema.Schema<ListEntityTypesResponse>;

export interface Entity {
  /** Output only. Resource name of the Entity. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} */
  name?: string;
  /** Fields of the entity. The key is name of the field and the value contains the applicable `google.protobuf.Value` entry for this field. */
  fields?: Record<string, unknown>;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const Entity: Schema.Schema<Entity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Entity" }) as any as Schema.Schema<Entity>;

export interface ListEntitiesResponse {
  /** List containing entity rows. */
  entities?: Array<Entity>;
  /** Next page token if more records are available. */
  nextPageToken?: string;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const ListEntitiesResponse: Schema.Schema<ListEntitiesResponse> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(Entity)),
  nextPageToken: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ListEntitiesResponse" }) as any as Schema.Schema<ListEntitiesResponse>;

export interface UpdateEntitiesWithConditionsResponse {
  /** Response returned by the external system. */
  response?: Record<string, unknown>;
  /** Metadata like service latency, etc. */
  metadata?: Record<string, Record<string, unknown>>;
}

export const UpdateEntitiesWithConditionsResponse: Schema.Schema<UpdateEntitiesWithConditionsResponse> = Schema.suspend(() => Schema.Struct({
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "UpdateEntitiesWithConditionsResponse" }) as any as Schema.Schema<UpdateEntitiesWithConditionsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface QueryParameter {
  value?: unknown;
  dataType?: "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE" | (string & {});
}

export const QueryParameter: Schema.Schema<QueryParameter> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  dataType: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryParameter" }) as any as Schema.Schema<QueryParameter>;

export interface Query {
  /** Required. Sql query to execute. */
  query?: string;
  /** Sets the number of seconds the driver will wait for a query to execute. */
  timeout?: string;
  /** Sets the limit for the maximum number of rows returned after the query execution. */
  maxRows?: string;
  /** In the struct, the value corresponds to the value of query parameter and date type corresponds to the date type of the query parameter. */
  queryParameters?: Array<QueryParameter>;
}

export const Query: Schema.Schema<Query> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  maxRows: Schema.optional(Schema.String),
  queryParameters: Schema.optional(Schema.Array(QueryParameter)),
})).annotate({ identifier: "Query" }) as any as Schema.Schema<Query>;

export interface ExecuteSqlQueryRequest {
  /** Required. SQL statement passed by clients like Integration Platform, the query is passed as-is to the driver used for interfacing with external systems. */
  query?: Query;
}

export const ExecuteSqlQueryRequest: Schema.Schema<ExecuteSqlQueryRequest> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Query),
})).annotate({ identifier: "ExecuteSqlQueryRequest" }) as any as Schema.Schema<ExecuteSqlQueryRequest>;

export interface ExecuteSqlQueryResponse {
  /** In the case of successful execution of the query the response contains results returned by the external system. For example, the result rows of the query are contained in the 'results' Struct list - "results": [ { "field1": "val1", "field2": "val2",.. },.. ] Each Struct row can contain fields any type of like nested Structs or lists. */
  results?: Array<Record<string, unknown>>;
}

export const ExecuteSqlQueryResponse: Schema.Schema<ExecuteSqlQueryResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ExecuteSqlQueryResponse" }) as any as Schema.Schema<ExecuteSqlQueryResponse>;

export interface ProvisionedResource {
  /** Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. */
  resourceType?: string;
  /** URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". */
  resourceUrl?: string;
}

export const ProvisionedResource: Schema.Schema<ProvisionedResource> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  resourceUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ProvisionedResource" }) as any as Schema.Schema<ProvisionedResource>;

export interface SloEligibility {
  /** Whether an instance is eligible or ineligible. */
  eligible?: boolean;
  /** User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. */
  reason?: string;
}

export const SloEligibility: Schema.Schema<SloEligibility> = Schema.suspend(() => Schema.Struct({
  eligible: Schema.optional(Schema.Boolean),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "SloEligibility" }) as any as Schema.Schema<SloEligibility>;

export interface PerSliSloEligibility {
  /** An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. */
  eligibilities?: Record<string, SloEligibility>;
}

export const PerSliSloEligibility: Schema.Schema<PerSliSloEligibility> = Schema.suspend(() => Schema.Struct({
  eligibilities: Schema.optional(Schema.Record(Schema.String, SloEligibility)),
})).annotate({ identifier: "PerSliSloEligibility" }) as any as Schema.Schema<PerSliSloEligibility>;

export interface NodeSloMetadata {
  /** The id of the node. This should be equal to SaasInstanceNode.node_id. */
  nodeId?: string;
  /** The location of the node, if different from instance location. */
  location?: string;
  /** If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. */
  perSliEligibility?: PerSliSloEligibility;
}

export const NodeSloMetadata: Schema.Schema<NodeSloMetadata> = Schema.suspend(() => Schema.Struct({
  nodeId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  perSliEligibility: Schema.optional(PerSliSloEligibility),
})).annotate({ identifier: "NodeSloMetadata" }) as any as Schema.Schema<NodeSloMetadata>;

export interface SloMetadata {
  /** Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. */
  tier?: string;
  /** Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. */
  nodes?: Array<NodeSloMetadata>;
  /** Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. */
  perSliEligibility?: PerSliSloEligibility;
}

export const SloMetadata: Schema.Schema<SloMetadata> = Schema.suspend(() => Schema.Struct({
  tier: Schema.optional(Schema.String),
  nodes: Schema.optional(Schema.Array(NodeSloMetadata)),
  perSliEligibility: Schema.optional(PerSliSloEligibility),
})).annotate({ identifier: "SloMetadata" }) as any as Schema.Schema<SloMetadata>;

export interface MaintenanceSchedule {
  /** The scheduled start time for the maintenance. */
  startTime?: string;
  /** The scheduled end time for the maintenance. */
  endTime?: string;
  /** This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. */
  canReschedule?: boolean;
  /** The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. */
  rolloutManagementPolicy?: string;
  /** schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. */
  scheduleDeadlineTime?: string;
}

export const MaintenanceSchedule: Schema.Schema<MaintenanceSchedule> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  canReschedule: Schema.optional(Schema.Boolean),
  rolloutManagementPolicy: Schema.optional(Schema.String),
  scheduleDeadlineTime: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceSchedule" }) as any as Schema.Schema<MaintenanceSchedule>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DailyCycle {
  /** Time within the day to start the operations. */
  startTime?: TimeOfDay;
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
}

export const DailyCycle: Schema.Schema<DailyCycle> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(TimeOfDay),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "DailyCycle" }) as any as Schema.Schema<DailyCycle>;

export interface Schedule {
  /** Allows to define schedule that runs specified day of the week. */
  day?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Time within the window to start the operations. */
  startTime?: TimeOfDay;
  /** Output only. Duration of the time window, set by service producer. */
  duration?: string;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface WeeklyCycle {
  /** User can specify multiple windows in a week. Minimum of 1 window. */
  schedule?: Array<Schedule>;
}

export const WeeklyCycle: Schema.Schema<WeeklyCycle> = Schema.suspend(() => Schema.Struct({
  schedule: Schema.optional(Schema.Array(Schedule)),
})).annotate({ identifier: "WeeklyCycle" }) as any as Schema.Schema<WeeklyCycle>;

export interface MaintenanceWindow {
  /** Daily cycle. */
  dailyCycle?: DailyCycle;
  /** Weekly cycle. */
  weeklyCycle?: WeeklyCycle;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  dailyCycle: Schema.optional(DailyCycle),
  weeklyCycle: Schema.optional(WeeklyCycle),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface Connectors_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Connectors_Date: Schema.Schema<Connectors_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Connectors_Date" }) as any as Schema.Schema<Connectors_Date>;

export interface DenyMaintenancePeriod {
  /** Deny period start date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. */
  startDate?: Connectors_Date;
  /** Deny period end date. This can be: * A full date, with non-zero year, month and day values. * A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. */
  endDate?: Connectors_Date;
  /** Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: * Full time. * All zeros for 00:00:00 UTC */
  time?: TimeOfDay;
}

export const DenyMaintenancePeriod: Schema.Schema<DenyMaintenancePeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Connectors_Date),
  endDate: Schema.optional(Connectors_Date),
  time: Schema.optional(TimeOfDay),
})).annotate({ identifier: "DenyMaintenancePeriod" }) as any as Schema.Schema<DenyMaintenancePeriod>;

export interface UpdatePolicy {
  /** Optional. Maintenance window that is applied to resources covered by this policy. */
  window?: MaintenanceWindow;
  /** Optional. Relative scheduling channel applied to resource. */
  channel?: "UPDATE_CHANNEL_UNSPECIFIED" | "EARLIER" | "LATER" | "WEEK1" | "WEEK2" | "WEEK5" | (string & {});
  /** Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. */
  denyMaintenancePeriods?: Array<DenyMaintenancePeriod>;
}

export const UpdatePolicy: Schema.Schema<UpdatePolicy> = Schema.suspend(() => Schema.Struct({
  window: Schema.optional(MaintenanceWindow),
  channel: Schema.optional(Schema.String),
  denyMaintenancePeriods: Schema.optional(Schema.Array(DenyMaintenancePeriod)),
})).annotate({ identifier: "UpdatePolicy" }) as any as Schema.Schema<UpdatePolicy>;

export interface MaintenancePolicy {
  /** Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. */
  name?: string;
  /** Output only. The time when the resource was created. */
  createTime?: string;
  /** Output only. The time when the resource was updated. */
  updateTime?: string;
  /** Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. */
  description?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Optional. The state of the policy. */
  state?: "STATE_UNSPECIFIED" | "READY" | "DELETING" | (string & {});
  /** Maintenance policy applicable to instance update. */
  updatePolicy?: UpdatePolicy;
}

export const MaintenancePolicy: Schema.Schema<MaintenancePolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  updatePolicy: Schema.optional(UpdatePolicy),
})).annotate({ identifier: "MaintenancePolicy" }) as any as Schema.Schema<MaintenancePolicy>;

export interface MaintenanceSettings {
  /** Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. */
  exclude?: boolean;
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. */
  maintenancePolicies?: Record<string, MaintenancePolicy>;
  /** Optional. If the update call is triggered from rollback, set the value as true. */
  isRollback?: boolean;
}

export const MaintenanceSettings: Schema.Schema<MaintenanceSettings> = Schema.suspend(() => Schema.Struct({
  exclude: Schema.optional(Schema.Boolean),
  maintenancePolicies: Schema.optional(Schema.Record(Schema.String, MaintenancePolicy)),
  isRollback: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MaintenanceSettings" }) as any as Schema.Schema<MaintenanceSettings>;

export interface NotificationParameter {
  /** Optional. Array of string values. e.g. instance's replica information. */
  values?: Array<string>;
}

export const NotificationParameter: Schema.Schema<NotificationParameter> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NotificationParameter" }) as any as Schema.Schema<NotificationParameter>;

export interface Instance {
  /** Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout (go/wipeout) compliance. See go/elysium/project_ids#storage-guidance for more details. */
  name?: string;
  /** Output only. Timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the resource was last modified. */
  updateTime?: string;
  /** Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. */
  labels?: Record<string, string>;
  /** Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "REPAIRING" | "DELETING" | "ERROR" | (string & {});
  /** Software versions that are used to deploy this instance. This can be mutated by rollout services. */
  softwareVersions?: Record<string, string>;
  /** Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to go/mr-user-guide. Should not be set if maintenance_settings.maintenance_policies is set. */
  maintenancePolicyNames?: Record<string, string>;
  /** Output only. ID of the associated GCP tenant project. See go/get-instance-metadata. */
  tenantProjectId?: string;
  /** Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See go/get-instance-metadata. */
  producerMetadata?: Record<string, string>;
  /** Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See go/get-instance-metadata. */
  provisionedResources?: Array<ProvisionedResource>;
  /** Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See go/cloud-ssa-standard-slo for feature description. */
  sloMetadata?: SloMetadata;
  /** The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. */
  maintenanceSchedules?: Record<string, MaintenanceSchedule>;
  /** consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications (go/slm-rollout-maintenance-policies#prerequisites). */
  consumerDefinedName?: string;
  /** Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. */
  slmInstanceTemplate?: string;
  /** Optional. The MaintenanceSettings associated with instance. */
  maintenanceSettings?: MaintenanceSettings;
  /** Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. */
  instanceType?: string;
  /** Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. */
  notificationParameters?: Record<string, NotificationParameter>;
  /** Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. */
  consumerProjectNumber?: string;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  softwareVersions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maintenancePolicyNames: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tenantProjectId: Schema.optional(Schema.String),
  producerMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  provisionedResources: Schema.optional(Schema.Array(ProvisionedResource)),
  sloMetadata: Schema.optional(SloMetadata),
  maintenanceSchedules: Schema.optional(Schema.Record(Schema.String, MaintenanceSchedule)),
  consumerDefinedName: Schema.optional(Schema.String),
  slmInstanceTemplate: Schema.optional(Schema.String),
  maintenanceSettings: Schema.optional(MaintenanceSettings),
  instanceType: Schema.optional(Schema.String),
  notificationParameters: Schema.optional(Schema.Record(Schema.String, NotificationParameter)),
  consumerProjectNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

// ==========================================================================
// Operations
// ==========================================================================

/** Reports the status of the connection. Note that when the connection is in a state that is not ACTIVE, the implementation of this RPC method must return a Status with the corresponding State instead of returning a gRPC status code that is not "OK", which indicates that ConnectionStatus itself, not the connection, failed. */
export interface CheckStatusProjectsLocationsConnectionsRequest {
  name: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const CheckStatusProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:checkStatus" }),
  svc,
) as unknown as Schema.Schema<CheckStatusProjectsLocationsConnectionsRequest>;

export type CheckStatusProjectsLocationsConnectionsResponse = CheckStatusResponse;
export const CheckStatusProjectsLocationsConnectionsResponse = CheckStatusResponse;

export type CheckStatusProjectsLocationsConnectionsError = CommonErrors;

export const checkStatusProjectsLocationsConnections: API.OperationMethod<CheckStatusProjectsLocationsConnectionsRequest, CheckStatusProjectsLocationsConnectionsResponse, CheckStatusProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckStatusProjectsLocationsConnectionsRequest,
  output: CheckStatusProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Reports readiness status of the connector. Similar logic to GetStatus but modified for kubernetes health check to understand. */
export interface CheckReadinessProjectsLocationsConnectionsRequest {
  name: string;
}

export const CheckReadinessProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:checkReadiness" }),
  svc,
) as unknown as Schema.Schema<CheckReadinessProjectsLocationsConnectionsRequest>;

export type CheckReadinessProjectsLocationsConnectionsResponse = CheckReadinessResponse;
export const CheckReadinessProjectsLocationsConnectionsResponse = CheckReadinessResponse;

export type CheckReadinessProjectsLocationsConnectionsError = CommonErrors;

export const checkReadinessProjectsLocationsConnections: API.OperationMethod<CheckReadinessProjectsLocationsConnectionsRequest, CheckReadinessProjectsLocationsConnectionsResponse, CheckReadinessProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckReadinessProjectsLocationsConnectionsRequest,
  output: CheckReadinessProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** ExchangeAuthCode exchanges the OAuth authorization code (and other necessary data) for an access token (and associated credentials). */
export interface ExchangeAuthCodeProjectsLocationsConnectionsRequest {
  name: string;
  /** Request body */
  body?: ExchangeAuthCodeRequest;
}

export const ExchangeAuthCodeProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExchangeAuthCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:exchangeAuthCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeAuthCodeProjectsLocationsConnectionsRequest>;

export type ExchangeAuthCodeProjectsLocationsConnectionsResponse = ExchangeAuthCodeResponse;
export const ExchangeAuthCodeProjectsLocationsConnectionsResponse = ExchangeAuthCodeResponse;

export type ExchangeAuthCodeProjectsLocationsConnectionsError = CommonErrors;

export const exchangeAuthCodeProjectsLocationsConnections: API.OperationMethod<ExchangeAuthCodeProjectsLocationsConnectionsRequest, ExchangeAuthCodeProjectsLocationsConnectionsResponse, ExchangeAuthCodeProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeAuthCodeProjectsLocationsConnectionsRequest,
  output: ExchangeAuthCodeProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** RefreshAccessToken exchanges the OAuth refresh token (and other necessary data) for a new access token (and new associated credentials). */
export interface RefreshAccessTokenProjectsLocationsConnectionsRequest {
  name: string;
  /** Request body */
  body?: RefreshAccessTokenRequest;
}

export const RefreshAccessTokenProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RefreshAccessTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:refreshAccessToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RefreshAccessTokenProjectsLocationsConnectionsRequest>;

export type RefreshAccessTokenProjectsLocationsConnectionsResponse = RefreshAccessTokenResponse;
export const RefreshAccessTokenProjectsLocationsConnectionsResponse = RefreshAccessTokenResponse;

export type RefreshAccessTokenProjectsLocationsConnectionsError = CommonErrors;

export const refreshAccessTokenProjectsLocationsConnections: API.OperationMethod<RefreshAccessTokenProjectsLocationsConnectionsRequest, RefreshAccessTokenProjectsLocationsConnectionsResponse, RefreshAccessTokenProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RefreshAccessTokenProjectsLocationsConnectionsRequest,
  output: RefreshAccessTokenProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Lists all available tools with POST. */
export interface ToolsProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Request body */
  body?: ListToolsPostRequest;
}

export const ToolsProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ListToolsPostRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/tools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ToolsProjectsLocationsConnectionsRequest>;

export type ToolsProjectsLocationsConnectionsResponse = ListToolsResponse;
export const ToolsProjectsLocationsConnectionsResponse = ListToolsResponse;

export type ToolsProjectsLocationsConnectionsError = CommonErrors;

export const toolsProjectsLocationsConnections: API.OperationMethod<ToolsProjectsLocationsConnectionsRequest, ToolsProjectsLocationsConnectionsResponse, ToolsProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ToolsProjectsLocationsConnectionsRequest,
  output: ToolsProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Generate toolspec override for the given list of toolNames. */
export interface GenerateConnectionToolspecOverrideProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  name: string;
  /** Request body */
  body?: GenerateCustomToolspecRequest;
}

export const GenerateConnectionToolspecOverrideProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateCustomToolspecRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:generateConnectionToolspecOverride", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateConnectionToolspecOverrideProjectsLocationsConnectionsRequest>;

export type GenerateConnectionToolspecOverrideProjectsLocationsConnectionsResponse = GenerateCustomToolspecResponse;
export const GenerateConnectionToolspecOverrideProjectsLocationsConnectionsResponse = GenerateCustomToolspecResponse;

export type GenerateConnectionToolspecOverrideProjectsLocationsConnectionsError = CommonErrors;

export const generateConnectionToolspecOverrideProjectsLocationsConnections: API.OperationMethod<GenerateConnectionToolspecOverrideProjectsLocationsConnectionsRequest, GenerateConnectionToolspecOverrideProjectsLocationsConnectionsResponse, GenerateConnectionToolspecOverrideProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateConnectionToolspecOverrideProjectsLocationsConnectionsRequest,
  output: GenerateConnectionToolspecOverrideProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Lists custom tool names. */
export interface ListCustomToolNamesProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  name: string;
}

export const ListCustomToolNamesProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:listCustomToolNames" }),
  svc,
) as unknown as Schema.Schema<ListCustomToolNamesProjectsLocationsConnectionsRequest>;

export type ListCustomToolNamesProjectsLocationsConnectionsResponse = ListCustomToolNamesResponse;
export const ListCustomToolNamesProjectsLocationsConnectionsResponse = ListCustomToolNamesResponse;

export type ListCustomToolNamesProjectsLocationsConnectionsError = CommonErrors;

export const listCustomToolNamesProjectsLocationsConnections: API.OperationMethod<ListCustomToolNamesProjectsLocationsConnectionsRequest, ListCustomToolNamesProjectsLocationsConnectionsResponse, ListCustomToolNamesProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCustomToolNamesProjectsLocationsConnectionsRequest,
  output: ListCustomToolNamesProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Executes a SQL statement specified in the body of the request. An example of this SQL statement in the case of Salesforce connector would be 'select * from Account a, Order o where a.Id = o.AccountId'. */
export interface ExecuteSqlQueryProjectsLocationsConnectionsRequest {
  /** Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  connection: string;
  /** Request body */
  body?: ExecuteSqlQueryRequest;
}

export const ExecuteSqlQueryProjectsLocationsConnectionsRequest = Schema.Struct({
  connection: Schema.String.pipe(T.HttpPath("connection")),
  body: Schema.optional(ExecuteSqlQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:executeSqlQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteSqlQueryProjectsLocationsConnectionsRequest>;

export type ExecuteSqlQueryProjectsLocationsConnectionsResponse = ExecuteSqlQueryResponse;
export const ExecuteSqlQueryProjectsLocationsConnectionsResponse = ExecuteSqlQueryResponse;

export type ExecuteSqlQueryProjectsLocationsConnectionsError = CommonErrors;

export const executeSqlQueryProjectsLocationsConnections: API.OperationMethod<ExecuteSqlQueryProjectsLocationsConnectionsRequest, ExecuteSqlQueryProjectsLocationsConnectionsResponse, ExecuteSqlQueryProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteSqlQueryProjectsLocationsConnectionsRequest,
  output: ExecuteSqlQueryProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Executes an action with the name specified in the request. The input parameters for executing the action are passed through the body of the ExecuteAction request. */
export interface ExecuteProjectsLocationsConnectionsActionsRequest {
  /** Required. Resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection}/actions/{action} */
  name: string;
  /** Request body */
  body?: ExecuteActionRequest;
}

export const ExecuteProjectsLocationsConnectionsActionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExecuteActionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/actions/{actionsId}:execute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteProjectsLocationsConnectionsActionsRequest>;

export type ExecuteProjectsLocationsConnectionsActionsResponse = ExecuteActionResponse;
export const ExecuteProjectsLocationsConnectionsActionsResponse = ExecuteActionResponse;

export type ExecuteProjectsLocationsConnectionsActionsError = CommonErrors;

export const executeProjectsLocationsConnectionsActions: API.OperationMethod<ExecuteProjectsLocationsConnectionsActionsRequest, ExecuteProjectsLocationsConnectionsActionsResponse, ExecuteProjectsLocationsConnectionsActionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteProjectsLocationsConnectionsActionsRequest,
  output: ExecuteProjectsLocationsConnectionsActionsResponse,
  errors: [],
}));

/** Gets the schema of all the actions supported by the connector. */
export interface ListProjectsLocationsConnectionsActionsRequest {
  /** Required. Parent resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Number of Actions to return. Defaults to 25. */
  pageSize?: number;
  /** Page token, return from a previous ListActions call, that can be used retrieve the next page of content. If unspecified, the request returns the first page of actions. */
  pageToken?: string;
  /** Specifies which fields of the Action are returned in the response. */
  view?: "ACTION_VIEW_UNSPECIFIED" | "ACTION_VIEW_BASIC" | "ACTION_VIEW_FULL" | (string & {});
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const ListProjectsLocationsConnectionsActionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/actions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsActionsRequest>;

export type ListProjectsLocationsConnectionsActionsResponse = ListActionsResponse;
export const ListProjectsLocationsConnectionsActionsResponse = ListActionsResponse;

export type ListProjectsLocationsConnectionsActionsError = CommonErrors;

export const listProjectsLocationsConnectionsActions = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsActionsRequest,
  output: ListProjectsLocationsConnectionsActionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the schema of the given action. */
export interface GetProjectsLocationsConnectionsActionsRequest {
  /** Required. Resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection}/actions/{action} */
  name: string;
  /** Specified view of the action schema. */
  view?: "ACTION_SCHEMA_VIEW_UNSPECIFIED" | "ACTION_SCHEMA_VIEW_BASIC" | "ACTION_SCHEMA_VIEW_ENRICHED" | (string & {});
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const GetProjectsLocationsConnectionsActionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/actions/{actionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsActionsRequest>;

export type GetProjectsLocationsConnectionsActionsResponse = Action;
export const GetProjectsLocationsConnectionsActionsResponse = Action;

export type GetProjectsLocationsConnectionsActionsError = CommonErrors;

export const getProjectsLocationsConnectionsActions: API.OperationMethod<GetProjectsLocationsConnectionsActionsRequest, GetProjectsLocationsConnectionsActionsResponse, GetProjectsLocationsConnectionsActionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsActionsRequest,
  output: GetProjectsLocationsConnectionsActionsResponse,
  errors: [],
}));

/** Lists all available tools. */
export interface ListProjectsLocationsConnectionsToolsRequest {
  /** Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const ListProjectsLocationsConnectionsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/tools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsToolsRequest>;

export type ListProjectsLocationsConnectionsToolsResponse = ListToolsResponse;
export const ListProjectsLocationsConnectionsToolsResponse = ListToolsResponse;

export type ListProjectsLocationsConnectionsToolsError = CommonErrors;

export const listProjectsLocationsConnectionsTools = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsToolsRequest,
  output: ListProjectsLocationsConnectionsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Executes a specific tool. */
export interface ExecuteProjectsLocationsConnectionsToolsRequest {
  /** Required. Resource name of the Tool. Format: projects/{project}/locations/{location}/connections/{connection}/tools/{tool} */
  name: string;
  /** Request body */
  body?: ExecuteToolRequest;
}

export const ExecuteProjectsLocationsConnectionsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExecuteToolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/tools/{toolsId}:execute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteProjectsLocationsConnectionsToolsRequest>;

export type ExecuteProjectsLocationsConnectionsToolsResponse = ExecuteToolResponse;
export const ExecuteProjectsLocationsConnectionsToolsResponse = ExecuteToolResponse;

export type ExecuteProjectsLocationsConnectionsToolsError = CommonErrors;

export const executeProjectsLocationsConnectionsTools: API.OperationMethod<ExecuteProjectsLocationsConnectionsToolsRequest, ExecuteProjectsLocationsConnectionsToolsResponse, ExecuteProjectsLocationsConnectionsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteProjectsLocationsConnectionsToolsRequest,
  output: ExecuteProjectsLocationsConnectionsToolsResponse,
  errors: [],
}));

/** Lists all available resources. */
export interface ListProjectsLocationsConnectionsResourcesRequest {
  /** Required. Resource name of the connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Optional. Page size for the request. */
  pageSize?: number;
  /** Optional. Page token for the request. */
  pageToken?: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const ListProjectsLocationsConnectionsResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/resources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsResourcesRequest>;

export type ListProjectsLocationsConnectionsResourcesResponse = ListResourcesResponse;
export const ListProjectsLocationsConnectionsResourcesResponse = ListResourcesResponse;

export type ListProjectsLocationsConnectionsResourcesError = CommonErrors;

export const listProjectsLocationsConnectionsResources = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsResourcesRequest,
  output: ListProjectsLocationsConnectionsResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a specific resource. */
export interface GetProjectsLocationsConnectionsResourcesRequest {
  /** Required. Resource name of the Resource. Format: projects/{project}/locations/{location}/connections/{connection}/resources/{resource} */
  name: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const GetProjectsLocationsConnectionsResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/resources/{resourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsResourcesRequest>;

export type GetProjectsLocationsConnectionsResourcesResponse = GetResourceResponse;
export const GetProjectsLocationsConnectionsResourcesResponse = GetResourceResponse;

export type GetProjectsLocationsConnectionsResourcesError = CommonErrors;

export const getProjectsLocationsConnectionsResources: API.OperationMethod<GetProjectsLocationsConnectionsResourcesRequest, GetProjectsLocationsConnectionsResourcesResponse, GetProjectsLocationsConnectionsResourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsResourcesRequest,
  output: GetProjectsLocationsConnectionsResourcesResponse,
  errors: [],
}));

/** Gets a specific resource with POST. */
export interface GetResourcePostProjectsLocationsConnectionsResourcesRequest {
  /** Required. Resource name of the Resource. Format: projects/{project}/locations/{location}/connections/{connection}/resources/{resource} */
  name: string;
  /** Request body */
  body?: GetResourcePostRequest;
}

export const GetResourcePostProjectsLocationsConnectionsResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GetResourcePostRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/resources/{resourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetResourcePostProjectsLocationsConnectionsResourcesRequest>;

export type GetResourcePostProjectsLocationsConnectionsResourcesResponse = GetResourceResponse;
export const GetResourcePostProjectsLocationsConnectionsResourcesResponse = GetResourceResponse;

export type GetResourcePostProjectsLocationsConnectionsResourcesError = CommonErrors;

export const getResourcePostProjectsLocationsConnectionsResources: API.OperationMethod<GetResourcePostProjectsLocationsConnectionsResourcesRequest, GetResourcePostProjectsLocationsConnectionsResourcesResponse, GetResourcePostProjectsLocationsConnectionsResourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetResourcePostProjectsLocationsConnectionsResourcesRequest,
  output: GetResourcePostProjectsLocationsConnectionsResourcesResponse,
  errors: [],
}));

/** Gets metadata of given entity type */
export interface GetProjectsLocationsConnectionsEntityTypesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{entityType} */
  name: string;
  /** Specifies view for entity type schema. */
  view?: "ENTITY_TYPE_SCHEMA_VIEW_UNSPECIFIED" | "ENTITY_TYPE_SCHEMA_VIEW_BASIC" | "ENTITY_TYPE_SCHEMA_VIEW_ENRICHED" | (string & {});
  /** Context metadata for request could be used to fetch customization of entity type schema. */
  contextMetadata?: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const GetProjectsLocationsConnectionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  contextMetadata: Schema.optional(Schema.String).pipe(T.HttpQuery("contextMetadata")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsEntityTypesRequest>;

export type GetProjectsLocationsConnectionsEntityTypesResponse = EntityType;
export const GetProjectsLocationsConnectionsEntityTypesResponse = EntityType;

export type GetProjectsLocationsConnectionsEntityTypesError = CommonErrors;

export const getProjectsLocationsConnectionsEntityTypes: API.OperationMethod<GetProjectsLocationsConnectionsEntityTypesRequest, GetProjectsLocationsConnectionsEntityTypesResponse, GetProjectsLocationsConnectionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsEntityTypesRequest,
  output: GetProjectsLocationsConnectionsEntityTypesResponse,
  errors: [],
}));

/** Lists metadata related to all entity types present in the external system. */
export interface ListProjectsLocationsConnectionsEntityTypesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Number of entity types to return. Defaults to 25. */
  pageSize?: number;
  /** Page token, return from a previous ListEntityTypes call, that can be used retrieve the next page of content. If unspecified, the request returns the first page of entity types. */
  pageToken?: string;
  /** Specifies which fields of the Entity Type are returned in the response. */
  view?: "ENTITY_TYPE_VIEW_UNSPECIFIED" | "ENTITY_TYPE_VIEW_BASIC" | "ENTITY_TYPE_VIEW_FULL" | (string & {});
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const ListProjectsLocationsConnectionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsEntityTypesRequest>;

export type ListProjectsLocationsConnectionsEntityTypesResponse = ListEntityTypesResponse;
export const ListProjectsLocationsConnectionsEntityTypesResponse = ListEntityTypesResponse;

export type ListProjectsLocationsConnectionsEntityTypesError = CommonErrors;

export const listProjectsLocationsConnectionsEntityTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsEntityTypesRequest,
  output: ListProjectsLocationsConnectionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists entity rows of a particular entity type contained in the request. Note: 1. Currently, only max of one 'sort_by' column is supported. 2. If no 'sort_by' column is provided, the primary key of the table is used. If zero or more than one primary key is available, we default to the unpaginated list entities logic which only returns the first page. 3. The values of the 'sort_by' columns must uniquely identify an entity row, otherwise undefined behaviors may be observed during pagination. 4. Since transactions are not supported, any updates, inserts or deletes during pagination can lead to stale data being returned or other unexpected behaviors. */
export interface ListProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} */
  parent: string;
  /** Number of entity rows to return. Defaults page size = 25. Max page size = 200. */
  pageSize?: number;
  /** Page token value if available from a previous request. */
  pageToken?: string;
  /** List of 'sort_by' columns to use when returning the results. */
  sortBy?: string[];
  /** List of 'sort_order' columns to use when returning the results. */
  sortOrder?: string[];
  /** Conditions to be used when listing entities. From a proto standpoint, There are no restrictions on what can be passed using this field. The connector documentation should have information about what format of filters/conditions are supported. */
  conditions?: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const ListProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortBy: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sortBy")),
  sortOrder: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sortOrder")),
  conditions: Schema.optional(Schema.String).pipe(T.HttpQuery("conditions")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type ListProjectsLocationsConnectionsEntityTypesEntitiesResponse = ListEntitiesResponse;
export const ListProjectsLocationsConnectionsEntityTypesEntitiesResponse = ListEntitiesResponse;

export type ListProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const listProjectsLocationsConnectionsEntityTypesEntities = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: ListProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single entity row matching the entity type and entity id specified in the request. */
export interface GetProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} */
  name: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const GetProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities/{entitiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type GetProjectsLocationsConnectionsEntityTypesEntitiesResponse = Entity;
export const GetProjectsLocationsConnectionsEntityTypesEntitiesResponse = Entity;

export type GetProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const getProjectsLocationsConnectionsEntityTypesEntities: API.OperationMethod<GetProjectsLocationsConnectionsEntityTypesEntitiesRequest, GetProjectsLocationsConnectionsEntityTypesEntitiesResponse, GetProjectsLocationsConnectionsEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: GetProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
}));

/** Creates a new entity row of the specified entity type in the external system. The field values for creating the row are contained in the body of the request. The response message contains a `Entity` message object returned as a response by the external system. */
export interface CreateProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} */
  parent: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
  /** Request body */
  body?: Entity;
}

export const CreateProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
  body: Schema.optional(Entity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type CreateProjectsLocationsConnectionsEntityTypesEntitiesResponse = Entity;
export const CreateProjectsLocationsConnectionsEntityTypesEntitiesResponse = Entity;

export type CreateProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const createProjectsLocationsConnectionsEntityTypesEntities: API.OperationMethod<CreateProjectsLocationsConnectionsEntityTypesEntitiesRequest, CreateProjectsLocationsConnectionsEntityTypesEntitiesResponse, CreateProjectsLocationsConnectionsEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: CreateProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
}));

/** Updates an existing entity row matching the entity type and entity id specified in the request. The fields in the entity row that need to be modified are contained in the body of the request. All unspecified fields are left unchanged. The response message contains a `Entity` message object returned as a response by the external system. */
export interface PatchProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Output only. Resource name of the Entity. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} */
  name: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
  /** Request body */
  body?: Entity;
}

export const PatchProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
  body: Schema.optional(Entity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities/{entitiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type PatchProjectsLocationsConnectionsEntityTypesEntitiesResponse = Entity;
export const PatchProjectsLocationsConnectionsEntityTypesEntitiesResponse = Entity;

export type PatchProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const patchProjectsLocationsConnectionsEntityTypesEntities: API.OperationMethod<PatchProjectsLocationsConnectionsEntityTypesEntitiesRequest, PatchProjectsLocationsConnectionsEntityTypesEntitiesResponse, PatchProjectsLocationsConnectionsEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: PatchProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
}));

/** Updates entities based on conditions specified in the request and not on entity id. */
export interface UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} */
  entityType: string;
  /** Required. Conditions to be used when updating entities. From a proto standpoint, There are no restrictions on what can be passed using this field. The connector documentation should have information about what format of filters/conditions are supported. Note: If this conditions field is left empty, an exception is thrown. We don't want to consider 'empty conditions' to be a match-all case. Connector developers can determine and document what a match-all case constraint would be. */
  conditions?: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
  /** Request body */
  body?: Entity;
}

export const UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  entityType: Schema.String.pipe(T.HttpPath("entityType")),
  conditions: Schema.optional(Schema.String).pipe(T.HttpQuery("conditions")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
  body: Schema.optional(Entity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities:updateEntitiesWithConditions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse = UpdateEntitiesWithConditionsResponse;
export const UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse = UpdateEntitiesWithConditionsResponse;

export type UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const updateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntities: API.OperationMethod<UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest, UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse, UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: UpdateEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
}));

/** Deletes an existing entity row matching the entity type and entity id specified in the request. */
export interface DeleteProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} */
  name: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const DeleteProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities/{entitiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type DeleteProjectsLocationsConnectionsEntityTypesEntitiesResponse = Empty;
export const DeleteProjectsLocationsConnectionsEntityTypesEntitiesResponse = Empty;

export type DeleteProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const deleteProjectsLocationsConnectionsEntityTypesEntities: API.OperationMethod<DeleteProjectsLocationsConnectionsEntityTypesEntitiesRequest, DeleteProjectsLocationsConnectionsEntityTypesEntitiesResponse, DeleteProjectsLocationsConnectionsEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: DeleteProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
}));

/** Deletes entities based on conditions specified in the request and not on entity id. */
export interface DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest {
  /** Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type} */
  entityType: string;
  /** Required. Conditions to be used when deleting entities. From a proto standpoint, There are no restrictions on what can be passed using this field. The connector documentation should have information about what format of filters/conditions are supported. Note: If this conditions field is left empty, an exception is thrown. We don't want to consider 'empty conditions' to be a match-all case. Connector developers can determine and document what a match-all case constraint would be. */
  conditions?: string;
  /** headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' */
  "executionConfig.headers"?: string;
}

export const DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest = Schema.Struct({
  entityType: Schema.String.pipe(T.HttpPath("entityType")),
  conditions: Schema.optional(Schema.String).pipe(T.HttpQuery("conditions")),
  "executionConfig.headers": Schema.optional(Schema.String).pipe(T.HttpQuery("executionConfig.headers")),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/entityTypes/{entityTypesId}/entities:deleteEntitiesWithConditions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest>;

export type DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse = Empty;
export const DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse = Empty;

export type DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesError = CommonErrors;

export const deleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntities: API.OperationMethod<DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest, DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse, DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesRequest,
  output: DeleteEntitiesWithConditionsProjectsLocationsConnectionsEntityTypesEntitiesResponse,
  errors: [],
}));

