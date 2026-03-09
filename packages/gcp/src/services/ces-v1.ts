// ==========================================================================
// Gemini Enterprise for Customer Experience API (ces v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "ces",
  version: "v1",
  rootUrl: "https://ces.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Ces_Schema {
  /** Optional. Minimum number of the elements for Type.ARRAY. */
  minItems?: string;
  /** Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ``` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ``` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring. */
  ref?: string;
  /** Optional. Indicates if the value may be null. */
  nullable?: boolean;
  /** Optional. Minimum value for Type.INTEGER and Type.NUMBER. */
  minimum?: number;
  /** Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY. */
  uniqueItems?: boolean;
  /** Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as : {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as : {type:INTEGER, format:enum, enum:["101", "201", "301"]} */
  enum?: Array<string>;
  /** Optional. Maximum number of the elements for Type.ARRAY. */
  maxItems?: string;
  /** Optional. Required properties of Type.OBJECT. */
  required?: Array<string>;
  /** Optional. Schemas of initial elements of Type.ARRAY. */
  prefixItems?: Array<Ces_Schema>;
  /** Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema. */
  defs?: Record<string, Ces_Schema>;
  /** Optional. The title of the schema. */
  title?: string;
  /** Optional. Properties of Type.OBJECT. */
  properties?: Record<string, Ces_Schema>;
  /** Optional. Default value of the data. */
  default?: unknown;
  /** Optional. The value should be validated against any (one or more) of the subschemas in the list. */
  anyOf?: Array<Ces_Schema>;
  /** Optional. The description of the data. */
  description?: string;
  /** Optional. Maximum value for Type.INTEGER and Type.NUMBER. */
  maximum?: number;
  /** Optional. Can either be a boolean or an object, controls the presence of additional properties. */
  additionalProperties?: Ces_Schema;
  /** Optional. Schema of the elements of Type.ARRAY. */
  items?: Ces_Schema;
  /** Required. The type of the data. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "STRING"
    | "INTEGER"
    | "NUMBER"
    | "BOOLEAN"
    | "OBJECT"
    | "ARRAY"
    | (string & {});
}

export const Ces_Schema: Schema.Schema<Ces_Schema> = Schema.suspend(() =>
  Schema.Struct({
    minItems: Schema.optional(Schema.String),
    ref: Schema.optional(Schema.String),
    nullable: Schema.optional(Schema.Boolean),
    minimum: Schema.optional(Schema.Number),
    uniqueItems: Schema.optional(Schema.Boolean),
    enum: Schema.optional(Schema.Array(Schema.String)),
    maxItems: Schema.optional(Schema.String),
    required: Schema.optional(Schema.Array(Schema.String)),
    prefixItems: Schema.optional(Schema.Array(Ces_Schema)),
    defs: Schema.optional(Schema.Record(Schema.String, Ces_Schema)),
    title: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Record(Schema.String, Ces_Schema)),
    default: Schema.optional(Schema.Unknown),
    anyOf: Schema.optional(Schema.Array(Ces_Schema)),
    description: Schema.optional(Schema.String),
    maximum: Schema.optional(Schema.Number),
    additionalProperties: Schema.optional(Ces_Schema),
    items: Schema.optional(Ces_Schema),
    type: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Ces_Schema" }) as any as Schema.Schema<Ces_Schema>;

export interface ClientFunction {
  /** Optional. The schema of the function parameters. */
  parameters?: Ces_Schema;
  /** Required. The function name. */
  name?: string;
  /** Optional. The function description. */
  description?: string;
  /** Optional. The schema of the function response. */
  response?: Ces_Schema;
}

export const ClientFunction: Schema.Schema<ClientFunction> = Schema.suspend(
  () =>
    Schema.Struct({
      parameters: Schema.optional(Ces_Schema),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      response: Schema.optional(Ces_Schema),
    }),
).annotate({
  identifier: "ClientFunction",
}) as any as Schema.Schema<ClientFunction>;

export interface DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint {
  /** Optional. The value between -1 to 1 by which to boost the score if the attribute_value evaluates to the value specified above. */
  boostAmount?: number;
  /** Optional. Can be one of: 1. The numerical field value. 2. The duration spec for freshness: The value must be formatted as an XSD `dayTimeDuration` value (a restricted subset of an ISO 8601 duration value). The pattern for this is: `nDnM]`. */
  attributeValue?: string;
}

export const DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint: Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint> =
  Schema.suspend(() =>
    Schema.Struct({
      boostAmount: Schema.optional(Schema.Number),
      attributeValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint",
  }) as any as Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint>;

export interface DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec {
  /** Optional. The control points used to define the curve. The monotonic function (defined through the interpolation_type above) passes through the control points listed here. */
  controlPoints?: Array<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint>;
  /** Optional. The name of the field whose value will be used to determine the boost amount. */
  fieldName?: string;
  /** Optional. The interpolation type to be applied to connect the control points listed below. */
  interpolationType?:
    | "INTERPOLATION_TYPE_UNSPECIFIED"
    | "LINEAR"
    | (string & {});
  /** Optional. The attribute type to be used to determine the boost amount. The attribute value can be derived from the field value of the specified field_name. In the case of numerical it is straightforward i.e. attribute_value = numerical_field_value. In the case of freshness however, attribute_value = (time.now() - datetime_field_value). */
  attributeType?:
    | "ATTRIBUTE_TYPE_UNSPECIFIED"
    | "NUMERICAL"
    | "FRESHNESS"
    | (string & {});
}

export const DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec: Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPoints: Schema.optional(
        Schema.Array(
          DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint,
        ),
      ),
      fieldName: Schema.optional(Schema.String),
      interpolationType: Schema.optional(Schema.String),
      attributeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec",
  }) as any as Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec>;

export interface DataStoreToolBoostSpecConditionBoostSpec {
  /** Optional. Strength of the boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0. Setting to 1.0 gives the suggestions a big promotion. However, it does not necessarily mean that the top result will be a boosted suggestion. Setting to -1.0 gives the suggestions a big demotion. However, other suggestions that are relevant might still be shown. Setting to 0.0 means no boost applied. The boosting condition is ignored. */
  boost?: number;
  /** Optional. Complex specification for custom ranking based on customer defined attribute value. */
  boostControlSpec?: DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec;
  /** Required. An expression which specifies a boost condition. The syntax is the same as filter expression syntax. Currently, the only supported condition is a list of BCP-47 lang codes. Example: To boost suggestions in languages en or fr: (lang_code: ANY("en", "fr")) */
  condition?: string;
}

export const DataStoreToolBoostSpecConditionBoostSpec: Schema.Schema<DataStoreToolBoostSpecConditionBoostSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      boost: Schema.optional(Schema.Number),
      boostControlSpec: Schema.optional(
        DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec,
      ),
      condition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpecConditionBoostSpec",
  }) as any as Schema.Schema<DataStoreToolBoostSpecConditionBoostSpec>;

export interface DataStoreToolBoostSpec {
  /** Required. A list of boosting specifications. */
  conditionBoostSpecs?: Array<DataStoreToolBoostSpecConditionBoostSpec>;
}

export const DataStoreToolBoostSpec: Schema.Schema<DataStoreToolBoostSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      conditionBoostSpecs: Schema.optional(
        Schema.Array(DataStoreToolBoostSpecConditionBoostSpec),
      ),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpec",
  }) as any as Schema.Schema<DataStoreToolBoostSpec>;

export interface TriggerActionResponse {
  /** Required. Text for the agent to respond with. */
  text?: string;
  /** Optional. Whether the response is disabled. Disabled responses are not used by the agent. */
  disabled?: boolean;
}

export const TriggerActionResponse: Schema.Schema<TriggerActionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "TriggerActionResponse",
  }) as any as Schema.Schema<TriggerActionResponse>;

export interface TriggerActionRespondImmediately {
  /** Required. The canned responses for the agent to choose from. The response is chosen randomly. */
  responses?: Array<TriggerActionResponse>;
}

export const TriggerActionRespondImmediately: Schema.Schema<TriggerActionRespondImmediately> =
  Schema.suspend(() =>
    Schema.Struct({
      responses: Schema.optional(Schema.Array(TriggerActionResponse)),
    }),
  ).annotate({
    identifier: "TriggerActionRespondImmediately",
  }) as any as Schema.Schema<TriggerActionRespondImmediately>;

export interface ServiceDirectoryConfig {
  /** Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app. */
  service?: string;
}

export const ServiceDirectoryConfig: Schema.Schema<ServiceDirectoryConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceDirectoryConfig",
  }) as any as Schema.Schema<ServiceDirectoryConfig>;

export interface ServiceAgentIdTokenAuthConfig {}

export const ServiceAgentIdTokenAuthConfig: Schema.Schema<ServiceAgentIdTokenAuthConfig> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ServiceAgentIdTokenAuthConfig",
  }) as any as Schema.Schema<ServiceAgentIdTokenAuthConfig>;

export interface BearerTokenConfig {
  /** Required. The bearer token. Must be in the format `$context.variables.`. */
  token?: string;
}

export const BearerTokenConfig: Schema.Schema<BearerTokenConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BearerTokenConfig",
  }) as any as Schema.Schema<BearerTokenConfig>;

export interface ServiceAccountAuthConfig {
  /** Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  serviceAccount?: string;
  /** Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used. */
  scopes?: Array<string>;
}

export const ServiceAccountAuthConfig: Schema.Schema<ServiceAccountAuthConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAccount: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ServiceAccountAuthConfig",
  }) as any as Schema.Schema<ServiceAccountAuthConfig>;

export interface OAuthConfig {
  /** Required. The client ID from the OAuth provider. */
  clientId?: string;
  /** Required. OAuth grant types. */
  oauthGrantType?:
    | "OAUTH_GRANT_TYPE_UNSPECIFIED"
    | "CLIENT_CREDENTIAL"
    | (string & {});
  /** Required. The token endpoint in the OAuth provider to exchange for an access token. */
  tokenEndpoint?: string;
  /** Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  clientSecretVersion?: string;
  /** Optional. The OAuth scopes to grant. */
  scopes?: Array<string>;
}

export const OAuthConfig: Schema.Schema<OAuthConfig> = Schema.suspend(() =>
  Schema.Struct({
    clientId: Schema.optional(Schema.String),
    oauthGrantType: Schema.optional(Schema.String),
    tokenEndpoint: Schema.optional(Schema.String),
    clientSecretVersion: Schema.optional(Schema.String),
    scopes: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "OAuthConfig" }) as any as Schema.Schema<OAuthConfig>;

export interface ApiKeyConfig {
  /** Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name. */
  keyName?: string;
  /** Required. Key location in the request. */
  requestLocation?:
    | "REQUEST_LOCATION_UNSPECIFIED"
    | "HEADER"
    | "QUERY_STRING"
    | (string & {});
  /** Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  apiKeySecretVersion?: string;
}

export const ApiKeyConfig: Schema.Schema<ApiKeyConfig> = Schema.suspend(() =>
  Schema.Struct({
    keyName: Schema.optional(Schema.String),
    requestLocation: Schema.optional(Schema.String),
    apiKeySecretVersion: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ApiKeyConfig",
}) as any as Schema.Schema<ApiKeyConfig>;

export interface ApiAuthentication {
  /** Optional. Config for ID token auth generated from CES service agent. */
  serviceAgentIdTokenAuthConfig?: ServiceAgentIdTokenAuthConfig;
  /** Optional. Config for bearer token auth. */
  bearerTokenConfig?: BearerTokenConfig;
  /** Optional. Config for service account authentication. */
  serviceAccountAuthConfig?: ServiceAccountAuthConfig;
  /** Optional. Config for OAuth. */
  oauthConfig?: OAuthConfig;
  /** Optional. Config for API key auth. */
  apiKeyConfig?: ApiKeyConfig;
}

export const ApiAuthentication: Schema.Schema<ApiAuthentication> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAgentIdTokenAuthConfig: Schema.optional(
        ServiceAgentIdTokenAuthConfig,
      ),
      bearerTokenConfig: Schema.optional(BearerTokenConfig),
      serviceAccountAuthConfig: Schema.optional(ServiceAccountAuthConfig),
      oauthConfig: Schema.optional(OAuthConfig),
      apiKeyConfig: Schema.optional(ApiKeyConfig),
    }),
  ).annotate({
    identifier: "ApiAuthentication",
  }) as any as Schema.Schema<ApiAuthentication>;

export interface TlsConfigCaCert {
  /** Required. The name of the allowed custom CA certificates. This can be used to disambiguate the custom CA certificates. */
  displayName?: string;
  /** Required. The allowed custom CA certificates (in DER format) for HTTPS verification. This overrides the default SSL trust store. If this is empty or unspecified, CES will use Google's default trust store to verify certificates. N.B. Make sure the HTTPS server certificates are signed with "subject alt name". For instance a certificate can be self-signed using the following command: ``` openssl x509 -req -days 200 -in example.com.csr \ -signkey example.com.key \ -out example.com.crt \ -extfile <(printf "\nsubjectAltName='DNS:www.example.com'") ``` */
  cert?: string;
}

export const TlsConfigCaCert: Schema.Schema<TlsConfigCaCert> = Schema.suspend(
  () =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      cert: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TlsConfigCaCert",
}) as any as Schema.Schema<TlsConfigCaCert>;

export interface TlsConfig {
  /** Required. Specifies a list of allowed custom CA certificates for HTTPS verification. */
  caCerts?: Array<TlsConfigCaCert>;
}

export const TlsConfig: Schema.Schema<TlsConfig> = Schema.suspend(() =>
  Schema.Struct({
    caCerts: Schema.optional(Schema.Array(TlsConfigCaCert)),
  }),
).annotate({ identifier: "TlsConfig" }) as any as Schema.Schema<TlsConfig>;

export interface OpenApiToolset {
  /** Optional. Service Directory configuration. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. Authentication information required by the API. */
  apiAuthentication?: ApiAuthentication;
  /** Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema. */
  url?: string;
  /** Optional. If true, the agent will ignore unknown fields in the API response for all operations defined in the OpenAPI schema. */
  ignoreUnknownFields?: boolean;
  /** Required. The OpenAPI schema of the toolset. */
  openApiSchema?: string;
  /** Optional. The TLS configuration. Includes the custom server certificates */
  tlsConfig?: TlsConfig;
}

export const OpenApiToolset: Schema.Schema<OpenApiToolset> = Schema.suspend(
  () =>
    Schema.Struct({
      serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
      apiAuthentication: Schema.optional(ApiAuthentication),
      url: Schema.optional(Schema.String),
      ignoreUnknownFields: Schema.optional(Schema.Boolean),
      openApiSchema: Schema.optional(Schema.String),
      tlsConfig: Schema.optional(TlsConfig),
    }),
).annotate({
  identifier: "OpenApiToolset",
}) as any as Schema.Schema<OpenApiToolset>;

export interface CodeBlock {
  /** Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead. */
  pythonCode?: string;
}

export const CodeBlock: Schema.Schema<CodeBlock> = Schema.suspend(() =>
  Schema.Struct({
    pythonCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CodeBlock" }) as any as Schema.Schema<CodeBlock>;

export interface ToolFakeConfig {
  /** Optional. Whether the tool is using fake mode. */
  enableFakeMode?: boolean;
  /** Optional. Code block which will be executed instead of a real tool call. */
  codeBlock?: CodeBlock;
}

export const ToolFakeConfig: Schema.Schema<ToolFakeConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      enableFakeMode: Schema.optional(Schema.Boolean),
      codeBlock: Schema.optional(CodeBlock),
    }),
).annotate({
  identifier: "ToolFakeConfig",
}) as any as Schema.Schema<ToolFakeConfig>;

export interface ActionEntityOperation {
  /** Required. ID of the entity. */
  entityId?: string;
  /** Required. Operation to perform on the entity. */
  operation?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "LIST"
    | "GET"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | (string & {});
}

export const ActionEntityOperation: Schema.Schema<ActionEntityOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      entityId: Schema.optional(Schema.String),
      operation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActionEntityOperation",
  }) as any as Schema.Schema<ActionEntityOperation>;

export interface Action {
  /** Optional. Entity fields to return from the operation. If no fields are specified, all fields of the Entity will be returned. */
  outputFields?: Array<string>;
  /** Optional. Entity fields to use as inputs for the operation. If no fields are specified, all fields of the Entity will be used. */
  inputFields?: Array<string>;
  /** ID of a Connection action for the tool to use. */
  connectionActionId?: string;
  /** Entity operation configuration for the tool to use. */
  entityOperation?: ActionEntityOperation;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() =>
  Schema.Struct({
    outputFields: Schema.optional(Schema.Array(Schema.String)),
    inputFields: Schema.optional(Schema.Array(Schema.String)),
    connectionActionId: Schema.optional(Schema.String),
    entityOperation: Schema.optional(ActionEntityOperation),
  }),
).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface EndUserAuthConfigOauth2JwtBearerConfig {
  /** Required. Subject parameter name to pass through. Must be in the format `$context.variables.`. */
  subject?: string;
  /** Required. Issuer parameter name to pass through. Must be in the format `$context.variables.`. */
  issuer?: string;
  /** Required. Client parameter name to pass through. Must be in the format `$context.variables.`. */
  clientKey?: string;
}

export const EndUserAuthConfigOauth2JwtBearerConfig: Schema.Schema<EndUserAuthConfigOauth2JwtBearerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      subject: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      clientKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EndUserAuthConfigOauth2JwtBearerConfig",
  }) as any as Schema.Schema<EndUserAuthConfigOauth2JwtBearerConfig>;

export interface EndUserAuthConfigOauth2AuthCodeConfig {
  /** Required. Oauth token parameter name to pass through. Must be in the format `$context.variables.`. */
  oauthToken?: string;
}

export const EndUserAuthConfigOauth2AuthCodeConfig: Schema.Schema<EndUserAuthConfigOauth2AuthCodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      oauthToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EndUserAuthConfigOauth2AuthCodeConfig",
  }) as any as Schema.Schema<EndUserAuthConfigOauth2AuthCodeConfig>;

export interface EndUserAuthConfig {
  /** JWT Profile Oauth 2.0 Authorization Grant authentication. */
  oauth2JwtBearerConfig?: EndUserAuthConfigOauth2JwtBearerConfig;
  /** Oauth 2.0 Authorization Code authentication. */
  oauth2AuthCodeConfig?: EndUserAuthConfigOauth2AuthCodeConfig;
}

export const EndUserAuthConfig: Schema.Schema<EndUserAuthConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      oauth2JwtBearerConfig: Schema.optional(
        EndUserAuthConfigOauth2JwtBearerConfig,
      ),
      oauth2AuthCodeConfig: Schema.optional(
        EndUserAuthConfigOauth2AuthCodeConfig,
      ),
    }),
  ).annotate({
    identifier: "EndUserAuthConfig",
  }) as any as Schema.Schema<EndUserAuthConfig>;

export interface ConnectorToolset {
  /** Required. The list of connector actions/entity operations to generate tools for. */
  connectorActions?: Array<Action>;
  /** Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}` */
  connection?: string;
  /** Optional. Configures how authentication is handled in Integration Connectors. By default, an admin authentication is passed in the Integration Connectors API requests. You can override it with a different end-user authentication config. **Note**: The Connection must have authentication override enabled in order to specify an EUC configuration here - otherwise, the Toolset creation will fail. See: https://cloud.google.com/application-integration/docs/configure-connectors-task#configure-authentication-override */
  authConfig?: EndUserAuthConfig;
}

export const ConnectorToolset: Schema.Schema<ConnectorToolset> = Schema.suspend(
  () =>
    Schema.Struct({
      connectorActions: Schema.optional(Schema.Array(Action)),
      connection: Schema.optional(Schema.String),
      authConfig: Schema.optional(EndUserAuthConfig),
    }),
).annotate({
  identifier: "ConnectorToolset",
}) as any as Schema.Schema<ConnectorToolset>;

export interface McpToolset {
  /** Optional. Service Directory configuration for VPC-SC, used to resolve service names within a perimeter. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. The TLS configuration. Includes the custom server certificates that the client should trust. */
  tlsConfig?: TlsConfig;
  /** Optional. Authentication information required to access tools and execute a tool against the MCP server. For bearer token authentication, the token applies only to tool execution, not to listing tools. This requires that tools can be listed without authentication. */
  apiAuthentication?: ApiAuthentication;
  /** Required. The address of the MCP server, for example, "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details. */
  serverAddress?: string;
}

export const McpToolset: Schema.Schema<McpToolset> = Schema.suspend(() =>
  Schema.Struct({
    serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
    tlsConfig: Schema.optional(TlsConfig),
    apiAuthentication: Schema.optional(ApiAuthentication),
    serverAddress: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "McpToolset" }) as any as Schema.Schema<McpToolset>;

export interface Toolset {
  /** Optional. A toolset that contains a list of tools that are defined by an OpenAPI schema. */
  openApiToolset?: OpenApiToolset;
  /** Optional. Configuration for tools behavior in fake mode. */
  toolFakeConfig?: ToolFakeConfig;
  /** Output only. Timestamp when the toolset was created. */
  createTime?: string;
  /** ETag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. The display name of the toolset. Must be unique within the same app. */
  displayName?: string;
  /** Output only. Timestamp when the toolset was last updated. */
  updateTime?: string;
  /** Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  name?: string;
  /** Optional. The execution type of the tools in the toolset. */
  executionType?:
    | "EXECUTION_TYPE_UNSPECIFIED"
    | "SYNCHRONOUS"
    | "ASYNCHRONOUS"
    | (string & {});
  /** Optional. The description of the toolset. */
  description?: string;
  /** Optional. A toolset that generates tools from an Integration Connectors Connection. */
  connectorToolset?: ConnectorToolset;
  /** Optional. A toolset that contains a list of tools that are offered by the MCP server. */
  mcpToolset?: McpToolset;
}

export const Toolset: Schema.Schema<Toolset> = Schema.suspend(() =>
  Schema.Struct({
    openApiToolset: Schema.optional(OpenApiToolset),
    toolFakeConfig: Schema.optional(ToolFakeConfig),
    createTime: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    executionType: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    connectorToolset: Schema.optional(ConnectorToolset),
    mcpToolset: Schema.optional(McpToolset),
  }),
).annotate({ identifier: "Toolset" }) as any as Schema.Schema<Toolset>;

export interface FileSearchTool {
  /** Optional. The tool description. */
  description?: string;
  /** Optional. The corpus where files are stored. Format: projects/{project}/locations/{location}/ragCorpora/{rag_corpus} */
  fileCorpus?: string;
  /** Optional. The type of the corpus. Default is FULLY_MANAGED. */
  corpusType?:
    | "CORPUS_TYPE_UNSPECIFIED"
    | "USER_OWNED"
    | "FULLY_MANAGED"
    | (string & {});
  /** Required. The tool name. */
  name?: string;
}

export const FileSearchTool: Schema.Schema<FileSearchTool> = Schema.suspend(
  () =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      fileCorpus: Schema.optional(Schema.String),
      corpusType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FileSearchTool",
}) as any as Schema.Schema<FileSearchTool>;

export interface PythonFunction {
  /** Output only. The description of the Python function, parsed from the python code's docstring. */
  description?: string;
  /** Optional. The Python code to execute for the tool. */
  pythonCode?: string;
  /** Optional. The name of the Python function to execute. Must match a Python function name defined in the python code. Case sensitive. If the name is not provided, the first function defined in the python code will be used. */
  name?: string;
}

export const PythonFunction: Schema.Schema<PythonFunction> = Schema.suspend(
  () =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      pythonCode: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PythonFunction",
}) as any as Schema.Schema<PythonFunction>;

export interface DataStoreConnectorConfig {
  /** Display name of the collection the data store belongs to. */
  collectionDisplayName?: string;
  /** The name of the data source. Example: `salesforce`, `jira`, `confluence`, `bigquery`. */
  dataSource?: string;
  /** Resource name of the collection the data store belongs to. */
  collection?: string;
}

export const DataStoreConnectorConfig: Schema.Schema<DataStoreConnectorConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      collectionDisplayName: Schema.optional(Schema.String),
      dataSource: Schema.optional(Schema.String),
      collection: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreConnectorConfig",
  }) as any as Schema.Schema<DataStoreConnectorConfig>;

export interface DataStore {
  /** Output only. Timestamp when the data store was created. */
  createTime?: string;
  /** Required. Full resource name of the DataStore. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{dataStore}` */
  name?: string;
  /** Output only. The connector config for the data store connection. */
  connectorConfig?: DataStoreConnectorConfig;
  /** Output only. The type of the data store. This field is readonly and populated by the server. */
  type?:
    | "DATA_STORE_TYPE_UNSPECIFIED"
    | "PUBLIC_WEB"
    | "UNSTRUCTURED"
    | "FAQ"
    | "CONNECTOR"
    | (string & {});
  /** Output only. The document processing mode for the data store connection. Only set for PUBLIC_WEB and UNSTRUCTURED data stores. */
  documentProcessingMode?:
    | "DOCUMENT_PROCESSING_MODE_UNSPECIFIED"
    | "DOCUMENTS"
    | "CHUNKS"
    | (string & {});
  /** Output only. The display name of the data store. */
  displayName?: string;
}

export const DataStore: Schema.Schema<DataStore> = Schema.suspend(() =>
  Schema.Struct({
    createTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    connectorConfig: Schema.optional(DataStoreConnectorConfig),
    type: Schema.optional(Schema.String),
    documentProcessingMode: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DataStore" }) as any as Schema.Schema<DataStore>;

export interface DataStoreToolDataStoreSource {
  /** Optional. Filter specification for the DataStore. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata */
  filter?: string;
  /** Optional. The data store. */
  dataStore?: DataStore;
}

export const DataStoreToolDataStoreSource: Schema.Schema<DataStoreToolDataStoreSource> =
  Schema.suspend(() =>
    Schema.Struct({
      filter: Schema.optional(Schema.String),
      dataStore: Schema.optional(DataStore),
    }),
  ).annotate({
    identifier: "DataStoreToolDataStoreSource",
  }) as any as Schema.Schema<DataStoreToolDataStoreSource>;

export interface DataStoreToolGroundingConfig {
  /** Optional. The groundedness threshold of the answer based on the retrieved sources. The value has a configurable range of [1, 5]. The level is used to threshold the groundedness of the answer, meaning that all responses with a groundedness score below the threshold will fall back to returning relevant snippets only. For example, a level of 3 means that the groundedness score must be 3 or higher for the response to be returned. */
  groundingLevel?: number;
  /** Optional. Whether grounding is disabled. */
  disabled?: boolean;
}

export const DataStoreToolGroundingConfig: Schema.Schema<DataStoreToolGroundingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      groundingLevel: Schema.optional(Schema.Number),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DataStoreToolGroundingConfig",
  }) as any as Schema.Schema<DataStoreToolGroundingConfig>;

export interface ModelSettings {
  /** Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent. */
  model?: string;
  /** Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative. */
  temperature?: number;
}

export const ModelSettings: Schema.Schema<ModelSettings> = Schema.suspend(() =>
  Schema.Struct({
    model: Schema.optional(Schema.String),
    temperature: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "ModelSettings",
}) as any as Schema.Schema<ModelSettings>;

export interface DataStoreToolSummarizationConfig {
  /** Optional. The prompt definition. If not set, default prompt will be used. */
  prompt?: string;
  /** Optional. Whether summarization is disabled. */
  disabled?: boolean;
  /** Optional. Configurations for the LLM model. */
  modelSettings?: ModelSettings;
}

export const DataStoreToolSummarizationConfig: Schema.Schema<DataStoreToolSummarizationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      prompt: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      modelSettings: Schema.optional(ModelSettings),
    }),
  ).annotate({
    identifier: "DataStoreToolSummarizationConfig",
  }) as any as Schema.Schema<DataStoreToolSummarizationConfig>;

export interface DataStoreToolRewriterConfig {
  /** Required. Configurations for the LLM model. */
  modelSettings?: ModelSettings;
  /** Optional. Whether the rewriter is disabled. */
  disabled?: boolean;
  /** Optional. The prompt definition. If not set, default prompt will be used. */
  prompt?: string;
}

export const DataStoreToolRewriterConfig: Schema.Schema<DataStoreToolRewriterConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      modelSettings: Schema.optional(ModelSettings),
      disabled: Schema.optional(Schema.Boolean),
      prompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreToolRewriterConfig",
  }) as any as Schema.Schema<DataStoreToolRewriterConfig>;

export interface DataStoreToolModalityConfig {
  /** Optional. The grounding configuration. */
  groundingConfig?: DataStoreToolGroundingConfig;
  /** Optional. The summarization config. */
  summarizationConfig?: DataStoreToolSummarizationConfig;
  /** Required. The modality type. */
  modalityType?: "MODALITY_TYPE_UNSPECIFIED" | "TEXT" | "AUDIO" | (string & {});
  /** Optional. The rewriter config. */
  rewriterConfig?: DataStoreToolRewriterConfig;
}

export const DataStoreToolModalityConfig: Schema.Schema<DataStoreToolModalityConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      groundingConfig: Schema.optional(DataStoreToolGroundingConfig),
      summarizationConfig: Schema.optional(DataStoreToolSummarizationConfig),
      modalityType: Schema.optional(Schema.String),
      rewriterConfig: Schema.optional(DataStoreToolRewriterConfig),
    }),
  ).annotate({
    identifier: "DataStoreToolModalityConfig",
  }) as any as Schema.Schema<DataStoreToolModalityConfig>;

export interface DataStoreToolEngineSource {
  /** Optional. Use to target specific DataStores within the Engine. If empty, the search applies to all DataStores associated with the Engine. */
  dataStoreSources?: Array<DataStoreToolDataStoreSource>;
  /** Optional. A filter applied to the search across the Engine. Not relevant and not used if 'data_store_sources' is provided. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata */
  filter?: string;
  /** Required. Full resource name of the Engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}` */
  engine?: string;
}

export const DataStoreToolEngineSource: Schema.Schema<DataStoreToolEngineSource> =
  Schema.suspend(() =>
    Schema.Struct({
      dataStoreSources: Schema.optional(
        Schema.Array(DataStoreToolDataStoreSource),
      ),
      filter: Schema.optional(Schema.String),
      engine: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreToolEngineSource",
  }) as any as Schema.Schema<DataStoreToolEngineSource>;

export interface DataStoreToolBoostSpecs {
  /** Required. A list of boosting specifications. */
  spec?: Array<DataStoreToolBoostSpec>;
  /** Required. The Data Store where the boosting configuration is applied. Full resource name of DataStore, such as projects/{project}/locations/{location}/collections/{collection}/dataStores/{dataStore}. */
  dataStores?: Array<string>;
}

export const DataStoreToolBoostSpecs: Schema.Schema<DataStoreToolBoostSpecs> =
  Schema.suspend(() =>
    Schema.Struct({
      spec: Schema.optional(Schema.Array(DataStoreToolBoostSpec)),
      dataStores: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpecs",
  }) as any as Schema.Schema<DataStoreToolBoostSpecs>;

export interface DataStoreTool {
  /** Required. The data store tool name. */
  name?: string;
  /** Optional. The tool description. */
  description?: string;
  /** Optional. Search within a single specific DataStore. */
  dataStoreSource?: DataStoreToolDataStoreSource;
  /** Optional. The filter parameter behavior. */
  filterParameterBehavior?:
    | "FILTER_PARAMETER_BEHAVIOR_UNSPECIFIED"
    | "ALWAYS_INCLUDE"
    | "NEVER_INCLUDE"
    | (string & {});
  /** Optional. The modality configs for the data store. */
  modalityConfigs?: Array<DataStoreToolModalityConfig>;
  /** Optional. Search within an Engine (potentially across multiple DataStores). */
  engineSource?: DataStoreToolEngineSource;
  /** Optional. Boost specification to boost certain documents. */
  boostSpecs?: Array<DataStoreToolBoostSpecs>;
}

export const DataStoreTool: Schema.Schema<DataStoreTool> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    dataStoreSource: Schema.optional(DataStoreToolDataStoreSource),
    filterParameterBehavior: Schema.optional(Schema.String),
    modalityConfigs: Schema.optional(Schema.Array(DataStoreToolModalityConfig)),
    engineSource: Schema.optional(DataStoreToolEngineSource),
    boostSpecs: Schema.optional(Schema.Array(DataStoreToolBoostSpecs)),
  }),
).annotate({
  identifier: "DataStoreTool",
}) as any as Schema.Schema<DataStoreTool>;

export interface SystemTool {
  /** Output only. The description of the system tool. */
  description?: string;
  /** Required. The name of the system tool. */
  name?: string;
}

export const SystemTool: Schema.Schema<SystemTool> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SystemTool" }) as any as Schema.Schema<SystemTool>;

export interface ConnectorTool {
  /** Optional. Configures how authentication is handled in Integration Connectors. By default, an admin authentication is passed in the Integration Connectors API requests. You can override it with a different end-user authentication config. **Note**: The Connection must have authentication override enabled in order to specify an EUC configuration here - otherwise, the ConnectorTool creation will fail. See https://cloud.google.com/application-integration/docs/configure-connectors-task#configure-authentication-override for details. */
  authConfig?: EndUserAuthConfig;
  /** Optional. The description of the tool that can be used by the Agent to decide whether to call this ConnectorTool. */
  description?: string;
  /** Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}` */
  connection?: string;
  /** Required. Action for the tool to use. */
  action?: Action;
  /** Optional. The name of the tool that can be used by the Agent to decide whether to call this ConnectorTool. */
  name?: string;
}

export const ConnectorTool: Schema.Schema<ConnectorTool> = Schema.suspend(() =>
  Schema.Struct({
    authConfig: Schema.optional(EndUserAuthConfig),
    description: Schema.optional(Schema.String),
    connection: Schema.optional(Schema.String),
    action: Schema.optional(Action),
    name: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ConnectorTool",
}) as any as Schema.Schema<ConnectorTool>;

export interface GoogleSearchToolPromptConfig {
  /** Optional. Defines the prompt used for the system instructions when interacting with the agent in chat conversations. If not set, default prompt will be used. */
  textPrompt?: string;
  /** Optional. Defines the prompt used for the system instructions when interacting with the agent in voice conversations. If not set, default prompt will be used. */
  voicePrompt?: string;
}

export const GoogleSearchToolPromptConfig: Schema.Schema<GoogleSearchToolPromptConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      textPrompt: Schema.optional(Schema.String),
      voicePrompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleSearchToolPromptConfig",
  }) as any as Schema.Schema<GoogleSearchToolPromptConfig>;

export interface GoogleSearchTool {
  /** Optional. Description of the tool's purpose. */
  description?: string;
  /** Optional. Specifies domains to restrict search results to. Example: "example.com", "another.site". A maximum of 20 domains can be specified. */
  preferredDomains?: Array<string>;
  /** Optional. Prompt instructions passed to planner on how the search results should be processed for text and voice. */
  promptConfig?: GoogleSearchToolPromptConfig;
  /** Optional. List of domains to be excluded from the search results. Example: "example.com". A maximum of 2000 domains can be excluded. */
  excludeDomains?: Array<string>;
  /** Required. The name of the tool. */
  name?: string;
  /** Optional. Content will be fetched directly from these URLs for context and grounding. Example: "https://example.com/path.html". A maximum of 20 URLs are allowed. */
  contextUrls?: Array<string>;
}

export const GoogleSearchTool: Schema.Schema<GoogleSearchTool> = Schema.suspend(
  () =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      preferredDomains: Schema.optional(Schema.Array(Schema.String)),
      promptConfig: Schema.optional(GoogleSearchToolPromptConfig),
      excludeDomains: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      contextUrls: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "GoogleSearchTool",
}) as any as Schema.Schema<GoogleSearchTool>;

export interface OpenApiTool {
  /** Optional. The description of the tool. If not provided, the description of the tool will be derived from the OpenAPI schema, from `operation.description` or `operation.summary`. */
  description?: string;
  /** Optional. Authentication information required by the API. */
  apiAuthentication?: ApiAuthentication;
  /** Optional. Service Directory configuration. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. If true, the agent will ignore unknown fields in the API response. */
  ignoreUnknownFields?: boolean;
  /** Optional. The server URL of the Open API schema. This field is only set in tools in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema. */
  url?: string;
  /** Optional. The name of the tool. If not provided, the name of the tool will be derived from the OpenAPI schema, from `operation.operationId`. */
  name?: string;
  /** Required. The OpenAPI schema in JSON or YAML format. */
  openApiSchema?: string;
  /** Optional. The TLS configuration. Includes the custom server certificates that the client will trust. */
  tlsConfig?: TlsConfig;
}

export const OpenApiTool: Schema.Schema<OpenApiTool> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    apiAuthentication: Schema.optional(ApiAuthentication),
    serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
    ignoreUnknownFields: Schema.optional(Schema.Boolean),
    url: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    openApiSchema: Schema.optional(Schema.String),
    tlsConfig: Schema.optional(TlsConfig),
  }),
).annotate({ identifier: "OpenApiTool" }) as any as Schema.Schema<OpenApiTool>;

export interface WidgetTool {
  /** Optional. The type of the widget tool. If not specified, the default type will be CUSTOMIZED. */
  widgetType?:
    | "WIDGET_TYPE_UNSPECIFIED"
    | "CUSTOM"
    | "PRODUCT_CAROUSEL"
    | "PRODUCT_DETAILS"
    | "QUICK_ACTIONS"
    | "PRODUCT_COMPARISON"
    | "ADVANCED_PRODUCT_DETAILS"
    | "SHORT_FORM"
    | "OVERALL_SATISFACTION"
    | "ORDER_SUMMARY"
    | "APPOINTMENT_DETAILS"
    | "APPOINTMENT_SCHEDULER"
    | "CONTACT_FORM"
    | (string & {});
  /** Optional. The description of the widget tool. */
  description?: string;
  /** Required. The display name of the widget tool. */
  name?: string;
  /** Optional. The input parameters of the widget tool. */
  parameters?: Ces_Schema;
}

export const WidgetTool: Schema.Schema<WidgetTool> = Schema.suspend(() =>
  Schema.Struct({
    widgetType: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    parameters: Schema.optional(Ces_Schema),
  }),
).annotate({ identifier: "WidgetTool" }) as any as Schema.Schema<WidgetTool>;

export interface McpTool {
  /** Optional. The schema of the input arguments of the MCP tool. */
  inputSchema?: Ces_Schema;
  /** Optional. Service Directory configuration for VPC-SC, used to resolve service names within a perimeter. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. The description of the MCP tool. */
  description?: string;
  /** Required. The server address of the MCP server, e.g., "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. This is the same as the server_address in the McpToolset. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details. */
  serverAddress?: string;
  /** Optional. The TLS configuration. Includes the custom server certificates that the client should trust. */
  tlsConfig?: TlsConfig;
  /** Optional. The schema of the output arguments of the MCP tool. */
  outputSchema?: Ces_Schema;
  /** Required. The name of the MCP tool. */
  name?: string;
  /** Optional. Authentication information required to execute the tool against the MCP server. For bearer token authentication, the token applies only to tool execution, not to listing tools. This requires that tools can be listed without authentication. */
  apiAuthentication?: ApiAuthentication;
}

export const McpTool: Schema.Schema<McpTool> = Schema.suspend(() =>
  Schema.Struct({
    inputSchema: Schema.optional(Ces_Schema),
    serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
    description: Schema.optional(Schema.String),
    serverAddress: Schema.optional(Schema.String),
    tlsConfig: Schema.optional(TlsConfig),
    outputSchema: Schema.optional(Ces_Schema),
    name: Schema.optional(Schema.String),
    apiAuthentication: Schema.optional(ApiAuthentication),
  }),
).annotate({ identifier: "McpTool" }) as any as Schema.Schema<McpTool>;

export interface Tool {
  /** Optional. The file search tool. */
  fileSearchTool?: FileSearchTool;
  /** Optional. The python function tool. */
  pythonFunction?: PythonFunction;
  /** Output only. Timestamp when the tool was created. */
  createTime?: string;
  /** Optional. The data store tool. */
  dataStoreTool?: DataStoreTool;
  /** Optional. Configuration for tool behavior in fake mode. */
  toolFakeConfig?: ToolFakeConfig;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. The system tool. */
  systemTool?: SystemTool;
  /** Optional. The Integration Connector tool. */
  connectorTool?: ConnectorTool;
  /** Optional. The google search tool. */
  googleSearchTool?: GoogleSearchTool;
  /** Identifier. The resource name of the tool. Format: * `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` for standalone tools. * `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}/tools/{tool}` for tools retrieved from a toolset. These tools are dynamic and output-only; they cannot be referenced directly where a tool is expected. */
  name?: string;
  /** Optional. The open API tool. */
  openApiTool?: OpenApiTool;
  /** Output only. Timestamp when the tool was last updated. */
  updateTime?: string;
  /** Optional. The widget tool. */
  widgetTool?: WidgetTool;
  /** Output only. If the tool is generated by the LLM assistant, this field contains a descriptive summary of the generation. */
  generatedSummary?: string;
  /** Output only. The display name of the tool, derived based on the tool's type. For example, display name of a ClientFunction is derived from its `name` property. */
  displayName?: string;
  /** Optional. The execution type of the tool. */
  executionType?:
    | "EXECUTION_TYPE_UNSPECIFIED"
    | "SYNCHRONOUS"
    | "ASYNCHRONOUS"
    | (string & {});
  /** Optional. The MCP tool. An MCP tool cannot be created or updated directly and is managed by the MCP toolset. */
  mcpTool?: McpTool;
  /** Optional. The client function. */
  clientFunction?: ClientFunction;
}

export const Tool: Schema.Schema<Tool> = Schema.suspend(() =>
  Schema.Struct({
    fileSearchTool: Schema.optional(FileSearchTool),
    pythonFunction: Schema.optional(PythonFunction),
    createTime: Schema.optional(Schema.String),
    dataStoreTool: Schema.optional(DataStoreTool),
    toolFakeConfig: Schema.optional(ToolFakeConfig),
    etag: Schema.optional(Schema.String),
    systemTool: Schema.optional(SystemTool),
    connectorTool: Schema.optional(ConnectorTool),
    googleSearchTool: Schema.optional(GoogleSearchTool),
    name: Schema.optional(Schema.String),
    openApiTool: Schema.optional(OpenApiTool),
    updateTime: Schema.optional(Schema.String),
    widgetTool: Schema.optional(WidgetTool),
    generatedSummary: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    executionType: Schema.optional(Schema.String),
    mcpTool: Schema.optional(McpTool),
    clientFunction: Schema.optional(ClientFunction),
  }),
).annotate({ identifier: "Tool" }) as any as Schema.Schema<Tool>;

export interface AppVariableDeclaration {
  /** Required. The description of the variable. */
  description?: string;
  /** Required. The schema of the variable. */
  schema?: Ces_Schema;
  /** Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores. */
  name?: string;
}

export const AppVariableDeclaration: Schema.Schema<AppVariableDeclaration> =
  Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      schema: Schema.optional(Ces_Schema),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AppVariableDeclaration",
  }) as any as Schema.Schema<AppVariableDeclaration>;

export interface ErrorHandlingSettings {
  /** Optional. The strategy to use for error handling. */
  errorHandlingStrategy?:
    | "ERROR_HANDLING_STRATEGY_UNSPECIFIED"
    | "NONE"
    | "FALLBACK_RESPONSE"
    | (string & {});
}

export const ErrorHandlingSettings: Schema.Schema<ErrorHandlingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      errorHandlingStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ErrorHandlingSettings",
  }) as any as Schema.Schema<ErrorHandlingSettings>;

export interface EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds {
  /** Optional. The success threshold for individual tool invocation parameter correctness. Must be a float between 0 and 1. Default is 1.0. */
  toolInvocationParameterCorrectnessThreshold?: number;
}

export const EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds: Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      toolInvocationParameterCorrectnessThreshold: Schema.optional(
        Schema.Number,
      ),
    }),
  ).annotate({
    identifier:
      "EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds>;

export interface EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds {
  /** Optional. The success threshold for semantic similarity. Must be an integer between 0 and 4. Default is >= 3. */
  semanticSimilaritySuccessThreshold?: number;
  /** Optional. The success threshold for overall tool invocation correctness. Must be a float between 0 and 1. Default is 1.0. */
  overallToolInvocationCorrectnessThreshold?: number;
  /** Optional. The semantic similarity channel to use for evaluation. */
  semanticSimilarityChannel?:
    | "SEMANTIC_SIMILARITY_CHANNEL_UNSPECIFIED"
    | "TEXT"
    | "AUDIO"
    | (string & {});
}

export const EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds: Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      semanticSimilaritySuccessThreshold: Schema.optional(Schema.Number),
      overallToolInvocationCorrectnessThreshold: Schema.optional(Schema.Number),
      semanticSimilarityChannel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds>;

export interface EvaluationMetricsThresholdsToolMatchingSettings {
  /** Optional. Behavior for extra tool calls. Defaults to FAIL. */
  extraToolCallBehavior?:
    | "EXTRA_TOOL_CALL_BEHAVIOR_UNSPECIFIED"
    | "FAIL"
    | "ALLOW"
    | (string & {});
}

export const EvaluationMetricsThresholdsToolMatchingSettings: Schema.Schema<EvaluationMetricsThresholdsToolMatchingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      extraToolCallBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationMetricsThresholdsToolMatchingSettings",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsToolMatchingSettings>;

export interface EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds {
  /** Optional. The expectation level metrics thresholds. */
  expectationLevelMetricsThresholds?: EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds;
  /** Optional. The turn level metrics thresholds. */
  turnLevelMetricsThresholds?: EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds;
  /** Optional. The tool matching settings. An extra tool call is a tool call that is present in the execution but does not match any tool call in the golden expectation. */
  toolMatchingSettings?: EvaluationMetricsThresholdsToolMatchingSettings;
}

export const EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds: Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      expectationLevelMetricsThresholds: Schema.optional(
        EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds,
      ),
      turnLevelMetricsThresholds: Schema.optional(
        EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds,
      ),
      toolMatchingSettings: Schema.optional(
        EvaluationMetricsThresholdsToolMatchingSettings,
      ),
    }),
  ).annotate({
    identifier: "EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds>;

export interface EvaluationMetricsThresholds {
  /** Optional. The hallucination metric behavior for golden evaluations. */
  goldenHallucinationMetricBehavior?:
    | "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
  /** Optional. Deprecated: Use `golden_hallucination_metric_behavior` instead. The hallucination metric behavior is currently used for golden evaluations. */
  hallucinationMetricBehavior?:
    | "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
  /** Optional. The golden evaluation metrics thresholds. */
  goldenEvaluationMetricsThresholds?: EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds;
  /** Optional. The hallucination metric behavior for scenario evaluations. */
  scenarioHallucinationMetricBehavior?:
    | "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
}

export const EvaluationMetricsThresholds: Schema.Schema<EvaluationMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      goldenHallucinationMetricBehavior: Schema.optional(Schema.String),
      hallucinationMetricBehavior: Schema.optional(Schema.String),
      goldenEvaluationMetricsThresholds: Schema.optional(
        EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds,
      ),
      scenarioHallucinationMetricBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholds>;

export interface AmbientSoundConfig {
  /** Optional. Deprecated: `prebuilt_ambient_noise` is deprecated in favor of `prebuilt_ambient_sound`. */
  prebuiltAmbientNoise?:
    | "PREBUILT_AMBIENT_NOISE_UNSPECIFIED"
    | "RETAIL_STORE"
    | "CONVENTION_HALL"
    | "OUTDOOR"
    | (string & {});
  /** Optional. Name of the prebuilt ambient sound. Valid values are: - "coffee_shop" - "keyboard" - "keypad" - "hum" - "office_1" - "office_2" - "office_3" - "room_1" - "room_2" - "room_3" - "room_4" - "room_5" - "air_conditioner" */
  prebuiltAmbientSound?: string;
  /** Optional. Ambient noise as a mono-channel, 16kHz WAV file stored in [Cloud Storage](https://cloud.google.com/storage). Note: Please make sure the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com` has `storage.objects.get` permission to the Cloud Storage object. */
  gcsUri?: string;
  /** Optional. Volume gain (in dB) of the normal native volume supported by ambient noise, in the range [-96.0, 16.0]. If unset, or set to a value of 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB) will play at approximately half the amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at approximately twice the amplitude of the normal native signal amplitude. We strongly recommend not to exceed +10 (dB) as there's usually no effective increase in loudness for any value greater than that. */
  volumeGainDb?: number;
}

export const AmbientSoundConfig: Schema.Schema<AmbientSoundConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      prebuiltAmbientNoise: Schema.optional(Schema.String),
      prebuiltAmbientSound: Schema.optional(Schema.String),
      gcsUri: Schema.optional(Schema.String),
      volumeGainDb: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AmbientSoundConfig",
  }) as any as Schema.Schema<AmbientSoundConfig>;

export interface SynthesizeSpeechConfig {
  /** Optional. The name of the voice. If not set, the service will choose a voice based on the other parameters such as language_code. For the list of available voices, please refer to [Supported voices and languages](https://cloud.google.com/text-to-speech/docs/voices) from Cloud Text-to-Speech. */
  voice?: string;
  /** Optional. The speaking rate/speed in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. Values outside of the range [0.25, 2.0] will return an error. */
  speakingRate?: number;
}

export const SynthesizeSpeechConfig: Schema.Schema<SynthesizeSpeechConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      voice: Schema.optional(Schema.String),
      speakingRate: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SynthesizeSpeechConfig",
  }) as any as Schema.Schema<SynthesizeSpeechConfig>;

export interface BargeInConfig {
  /** Optional. Disables user barge-in while the agent is speaking. If true, user input during agent response playback will be ignored. Deprecated: `disable_barge_in` is deprecated in favor of `disable_barge_in_control` in ChannelProfile. */
  disableBargeIn?: boolean;
  /** Optional. If enabled, the agent will adapt its next response based on the assumption that the user hasn't heard the full preceding agent message. This should not be used in scenarios where agent responses are displayed visually. */
  bargeInAwareness?: boolean;
}

export const BargeInConfig: Schema.Schema<BargeInConfig> = Schema.suspend(() =>
  Schema.Struct({
    disableBargeIn: Schema.optional(Schema.Boolean),
    bargeInAwareness: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "BargeInConfig",
}) as any as Schema.Schema<BargeInConfig>;

export interface AudioProcessingConfig {
  /** Optional. Configuration for the ambient sound to be played with the synthesized agent response, to enhance the naturalness of the conversation. */
  ambientSoundConfig?: AmbientSoundConfig;
  /** Optional. The duration of user inactivity (no speech or interaction) before the agent prompts the user for reengagement. If not set, the agent will not prompt the user for reengagement. */
  inactivityTimeout?: string;
  /** Optional. Configuration of how the agent response should be synthesized, mapping from the language code to SynthesizeSpeechConfig. If the configuration for the specified language code is not found, the configuration for the root language code will be used. For example, if the map contains "en-us" and "en", and the specified language code is "en-gb", then "en" configuration will be used. Note: Language code is case-insensitive. */
  synthesizeSpeechConfigs?: Record<string, SynthesizeSpeechConfig>;
  /** Optional. Configures the agent behavior for the user barge-in activities. */
  bargeInConfig?: BargeInConfig;
}

export const AudioProcessingConfig: Schema.Schema<AudioProcessingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      ambientSoundConfig: Schema.optional(AmbientSoundConfig),
      inactivityTimeout: Schema.optional(Schema.String),
      synthesizeSpeechConfigs: Schema.optional(
        Schema.Record(Schema.String, SynthesizeSpeechConfig),
      ),
      bargeInConfig: Schema.optional(BargeInConfig),
    }),
  ).annotate({
    identifier: "AudioProcessingConfig",
  }) as any as Schema.Schema<AudioProcessingConfig>;

export interface TimeZoneSettings {
  /** Optional. The time zone of the app from the [time zone database](https://www.iana.org/time-zones), e.g., America/Los_Angeles, Europe/Paris. */
  timeZone?: string;
}

export const TimeZoneSettings: Schema.Schema<TimeZoneSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      timeZone: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TimeZoneSettings",
}) as any as Schema.Schema<TimeZoneSettings>;

export interface ClientCertificateSettings {
  /** Optional. The name of the SecretManager secret version resource storing the passphrase to decrypt the private key. Should be left unset if the private key is not encrypted. Format: `projects/{project}/secrets/{secret}/versions/{version}` */
  passphrase?: string;
  /** Required. The name of the SecretManager secret version resource storing the private key encoded in PEM format. Format: `projects/{project}/secrets/{secret}/versions/{version}` */
  privateKey?: string;
  /** Required. The TLS certificate encoded in PEM format. This string must include the begin header and end footer lines. */
  tlsCertificate?: string;
}

export const ClientCertificateSettings: Schema.Schema<ClientCertificateSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      passphrase: Schema.optional(Schema.String),
      privateKey: Schema.optional(Schema.String),
      tlsCertificate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClientCertificateSettings",
  }) as any as Schema.Schema<ClientCertificateSettings>;

export interface LanguageSettings {
  /** Optional. List of languages codes supported by the app, in addition to the `default_language_code`. */
  supportedLanguageCodes?: Array<string>;
  /** Optional. The action to perform when an agent receives input in an unsupported language. This can be a predefined action or a custom tool call. Valid values are: - A tool's full resource name, which triggers a specific tool execution. - A predefined system action, such as "escalate" or "exit", which triggers an EndSession signal with corresponding metadata to terminate the conversation. */
  fallbackAction?: string;
  /** Optional. Enables multilingual support. If true, agents in the app will use pre-built instructions to improve handling of multilingual input. */
  enableMultilingualSupport?: boolean;
  /** Optional. The default language code of the app. */
  defaultLanguageCode?: string;
}

export const LanguageSettings: Schema.Schema<LanguageSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      supportedLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
      fallbackAction: Schema.optional(Schema.String),
      enableMultilingualSupport: Schema.optional(Schema.Boolean),
      defaultLanguageCode: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LanguageSettings",
}) as any as Schema.Schema<LanguageSettings>;

export interface AudioRecordingConfig {
  /** Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  gcsBucket?: string;
  /** Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used. */
  gcsPathPrefix?: string;
}

export const AudioRecordingConfig: Schema.Schema<AudioRecordingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      gcsBucket: Schema.optional(Schema.String),
      gcsPathPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AudioRecordingConfig",
  }) as any as Schema.Schema<AudioRecordingConfig>;

export interface RedactionConfig {
  /** Optional. [DLP](https://cloud.google.com/dlp/docs) inspect template name to configure detection of sensitive data types. Format: `projects/{project}/locations/{location}/inspectTemplates/{inspect_template}` */
  inspectTemplate?: string;
  /** Optional. If true, redaction will be applied in various logging scenarios, including conversation history, Cloud Logging and audio recording. */
  enableRedaction?: boolean;
  /** Optional. [DLP](https://cloud.google.com/dlp/docs) deidentify template name to instruct on how to de-identify content. Format: `projects/{project}/locations/{location}/deidentifyTemplates/{deidentify_template}` */
  deidentifyTemplate?: string;
}

export const RedactionConfig: Schema.Schema<RedactionConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      inspectTemplate: Schema.optional(Schema.String),
      enableRedaction: Schema.optional(Schema.Boolean),
      deidentifyTemplate: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RedactionConfig",
}) as any as Schema.Schema<RedactionConfig>;

export interface BigQueryExportSettings {
  /** Optional. Indicates whether the BigQuery export is enabled. */
  enabled?: boolean;
  /** Optional. The project ID of the BigQuery dataset to export the data to. Note: If the BigQuery dataset is in a different project from the app, you should grant `roles/bigquery.admin` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  project?: string;
  /** Optional. The BigQuery dataset to export the data to. */
  dataset?: string;
}

export const BigQueryExportSettings: Schema.Schema<BigQueryExportSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      project: Schema.optional(Schema.String),
      dataset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BigQueryExportSettings",
  }) as any as Schema.Schema<BigQueryExportSettings>;

export interface ConversationLoggingSettings {
  /** Optional. Whether to disable conversation logging for the sessions. */
  disableConversationLogging?: boolean;
}

export const ConversationLoggingSettings: Schema.Schema<ConversationLoggingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      disableConversationLogging: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConversationLoggingSettings",
  }) as any as Schema.Schema<ConversationLoggingSettings>;

export interface MetricAnalysisSettings {
  /** Optional. Whether to collect conversation data for llm analysis metrics. If true, conversation data will not be collected for llm analysis metrics; otherwise, conversation data will be collected. */
  llmMetricsOptedOut?: boolean;
}

export const MetricAnalysisSettings: Schema.Schema<MetricAnalysisSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      llmMetricsOptedOut: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MetricAnalysisSettings",
  }) as any as Schema.Schema<MetricAnalysisSettings>;

export interface CloudLoggingSettings {
  /** Optional. Whether to enable Cloud Logging for the sessions. */
  enableCloudLogging?: boolean;
}

export const CloudLoggingSettings: Schema.Schema<CloudLoggingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      enableCloudLogging: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CloudLoggingSettings",
  }) as any as Schema.Schema<CloudLoggingSettings>;

export interface LoggingSettings {
  /** Optional. Configuration for how audio interactions should be recorded for the evaluation. By default, audio recording is not enabled for evaluation sessions. */
  evaluationAudioRecordingConfig?: AudioRecordingConfig;
  /** Optional. Configuration for how sensitive data should be redacted. */
  redactionConfig?: RedactionConfig;
  /** Optional. Settings to describe the BigQuery export behaviors for the app. The conversation data will be exported to BigQuery tables if it is enabled. */
  bigqueryExportSettings?: BigQueryExportSettings;
  /** Optional. Settings to describe the conversation logging behaviors for the app. */
  conversationLoggingSettings?: ConversationLoggingSettings;
  /** Optional. Configuration for how audio interactions should be recorded. */
  audioRecordingConfig?: AudioRecordingConfig;
  /** Optional. Settings to describe the conversation data collection behaviors for the LLM analysis pipeline for the app. */
  metricAnalysisSettings?: MetricAnalysisSettings;
  /** Optional. Settings to describe the Cloud Logging behaviors for the app. */
  cloudLoggingSettings?: CloudLoggingSettings;
}

export const LoggingSettings: Schema.Schema<LoggingSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      evaluationAudioRecordingConfig: Schema.optional(AudioRecordingConfig),
      redactionConfig: Schema.optional(RedactionConfig),
      bigqueryExportSettings: Schema.optional(BigQueryExportSettings),
      conversationLoggingSettings: Schema.optional(ConversationLoggingSettings),
      audioRecordingConfig: Schema.optional(AudioRecordingConfig),
      metricAnalysisSettings: Schema.optional(MetricAnalysisSettings),
      cloudLoggingSettings: Schema.optional(CloudLoggingSettings),
    }),
).annotate({
  identifier: "LoggingSettings",
}) as any as Schema.Schema<LoggingSettings>;

export interface DataStoreSettingsEngine {
  /** Output only. The type of the engine. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "ENGINE_TYPE_SEARCH"
    | "ENGINE_TYPE_CHAT"
    | (string & {});
  /** Output only. The resource name of the engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}` */
  name?: string;
}

export const DataStoreSettingsEngine: Schema.Schema<DataStoreSettingsEngine> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreSettingsEngine",
  }) as any as Schema.Schema<DataStoreSettingsEngine>;

export interface DataStoreSettings {
  /** Output only. The engines for the app. */
  engines?: Array<DataStoreSettingsEngine>;
}

export const DataStoreSettings: Schema.Schema<DataStoreSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      engines: Schema.optional(Schema.Array(DataStoreSettingsEngine)),
    }),
  ).annotate({
    identifier: "DataStoreSettings",
  }) as any as Schema.Schema<DataStoreSettings>;

export interface ChannelProfilePersonaProperty {
  /** Optional. The persona of the channel. */
  persona?: "UNKNOWN" | "CONCISE" | "CHATTY" | (string & {});
}

export const ChannelProfilePersonaProperty: Schema.Schema<ChannelProfilePersonaProperty> =
  Schema.suspend(() =>
    Schema.Struct({
      persona: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelProfilePersonaProperty",
  }) as any as Schema.Schema<ChannelProfilePersonaProperty>;

export interface ChannelProfileWebWidgetConfigSecuritySettings {
  /** Optional. Indicates whether public access to the web widget is enabled. If `true`, the web widget will be publicly accessible. If `false`, the web widget must be integrated with your own authentication and authorization system to return valid credentials for accessing the CES agent. */
  enablePublicAccess?: boolean;
  /** Optional. The origins that are allowed to host the web widget. An origin is defined by RFC 6454. If empty, all origins are allowed. A maximum of 100 origins is allowed. Example: "https://example.com" */
  allowedOrigins?: Array<string>;
  /** Optional. Indicates whether reCAPTCHA verification for the web widget is enabled. */
  enableRecaptcha?: boolean;
  /** Optional. Indicates whether origin check for the web widget is enabled. If `true`, the web widget will check the origin of the website that loads the web widget and only allow it to be loaded in the same origin or any of the allowed origins. */
  enableOriginCheck?: boolean;
}

export const ChannelProfileWebWidgetConfigSecuritySettings: Schema.Schema<ChannelProfileWebWidgetConfigSecuritySettings> =
  Schema.suspend(() =>
    Schema.Struct({
      enablePublicAccess: Schema.optional(Schema.Boolean),
      allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
      enableRecaptcha: Schema.optional(Schema.Boolean),
      enableOriginCheck: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelProfileWebWidgetConfigSecuritySettings",
  }) as any as Schema.Schema<ChannelProfileWebWidgetConfigSecuritySettings>;

export interface ChannelProfileWebWidgetConfig {
  /** Optional. The modality of the web widget. */
  modality?:
    | "MODALITY_UNSPECIFIED"
    | "CHAT_AND_VOICE"
    | "VOICE_ONLY"
    | "CHAT_ONLY"
    | (string & {});
  /** Optional. The title of the web widget. */
  webWidgetTitle?: string;
  /** Optional. The security settings of the web widget. */
  securitySettings?: ChannelProfileWebWidgetConfigSecuritySettings;
  /** Optional. The theme of the web widget. */
  theme?: "THEME_UNSPECIFIED" | "LIGHT" | "DARK" | (string & {});
}

export const ChannelProfileWebWidgetConfig: Schema.Schema<ChannelProfileWebWidgetConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      modality: Schema.optional(Schema.String),
      webWidgetTitle: Schema.optional(Schema.String),
      securitySettings: Schema.optional(
        ChannelProfileWebWidgetConfigSecuritySettings,
      ),
      theme: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelProfileWebWidgetConfig",
  }) as any as Schema.Schema<ChannelProfileWebWidgetConfig>;

export interface ChannelProfile {
  /** Optional. The unique identifier of the channel profile. */
  profileId?: string;
  /** Optional. The noise suppression level of the channel profile. Available values are "low", "moderate", "high", "very_high". */
  noiseSuppressionLevel?: string;
  /** Optional. The persona property of the channel profile. */
  personaProperty?: ChannelProfilePersonaProperty;
  /** Optional. Whether to disable DTMF (dual-tone multi-frequency). */
  disableDtmf?: boolean;
  /** Optional. Whether to disable user barge-in control in the conversation. - **true**: User interruptions are disabled while the agent is speaking. - **false**: The agent retains automatic control over when the user can interrupt. */
  disableBargeInControl?: boolean;
  /** Optional. The configuration for the web widget. */
  webWidgetConfig?: ChannelProfileWebWidgetConfig;
  /** Optional. The type of the channel profile. */
  channelType?:
    | "UNKNOWN"
    | "WEB_UI"
    | "API"
    | "TWILIO"
    | "GOOGLE_TELEPHONY_PLATFORM"
    | "CONTACT_CENTER_AS_A_SERVICE"
    | "FIVE9"
    | "CONTACT_CENTER_INTEGRATION"
    | (string & {});
}

export const ChannelProfile: Schema.Schema<ChannelProfile> = Schema.suspend(
  () =>
    Schema.Struct({
      profileId: Schema.optional(Schema.String),
      noiseSuppressionLevel: Schema.optional(Schema.String),
      personaProperty: Schema.optional(ChannelProfilePersonaProperty),
      disableDtmf: Schema.optional(Schema.Boolean),
      disableBargeInControl: Schema.optional(Schema.Boolean),
      webWidgetConfig: Schema.optional(ChannelProfileWebWidgetConfig),
      channelType: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ChannelProfile",
}) as any as Schema.Schema<ChannelProfile>;

export interface App {
  /** Optional. Metadata about the app. This field can be used to store additional information relevant to the app's details or intended usages. */
  metadata?: Record<string, string>;
  /** Optional. Whether the app is pinned in the app list. */
  pinned?: boolean;
  /** Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  name?: string;
  /** Optional. The root agent is the entry point of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  rootAgent?: string;
  /** Optional. Instructions for all the agents in the app. You can use this instruction to set up a stable identity or personality across all the agents. */
  globalInstruction?: string;
  /** Optional. Human-readable description of the app. */
  description?: string;
  /** Optional. List of guardrails for the app. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  guardrails?: Array<string>;
  /** Output only. Timestamp when the app was last updated. */
  updateTime?: string;
  /** Output only. The declarations of predefined variables for the app. */
  predefinedVariableDeclarations?: Array<AppVariableDeclaration>;
  /** Optional. Error handling settings of the app. */
  errorHandlingSettings?: ErrorHandlingSettings;
  /** Optional. The evaluation thresholds for the app. */
  evaluationMetricsThresholds?: EvaluationMetricsThresholds;
  /** Optional. Indicates whether the app is locked for changes. If the app is locked, modifications to the app resources will be rejected. */
  locked?: boolean;
  /** Optional. Audio processing configuration of the app. */
  audioProcessingConfig?: AudioProcessingConfig;
  /** Output only. Timestamp when the app was created. */
  createTime?: string;
  /** Optional. The default LLM model settings for the app. Individual resources (e.g. agents, guardrails) can override these configurations as needed. */
  modelSettings?: ModelSettings;
  /** Optional. TimeZone settings of the app. */
  timeZoneSettings?: TimeZoneSettings;
  /** Optional. The default client certificate settings for the app. */
  clientCertificateSettings?: ClientCertificateSettings;
  /** Optional. The declarations of the variables. */
  variableDeclarations?: Array<AppVariableDeclaration>;
  /** Optional. Language settings of the app. */
  languageSettings?: LanguageSettings;
  /** Optional. The tool execution mode for the app. If not provided, will default to PARALLEL. */
  toolExecutionMode?:
    | "TOOL_EXECUTION_MODE_UNSPECIFIED"
    | "PARALLEL"
    | "SEQUENTIAL"
    | (string & {});
  /** Required. Display name of the app. */
  displayName?: string;
  /** Optional. Logging settings of the app. */
  loggingSettings?: LoggingSettings;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Output only. Number of deployments in the app. */
  deploymentCount?: number;
  /** Optional. The data store settings for the app. */
  dataStoreSettings?: DataStoreSettings;
  /** Optional. The default channel profile used by the app. */
  defaultChannelProfile?: ChannelProfile;
}

export const App: Schema.Schema<App> = Schema.suspend(() =>
  Schema.Struct({
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    pinned: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    rootAgent: Schema.optional(Schema.String),
    globalInstruction: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    guardrails: Schema.optional(Schema.Array(Schema.String)),
    updateTime: Schema.optional(Schema.String),
    predefinedVariableDeclarations: Schema.optional(
      Schema.Array(AppVariableDeclaration),
    ),
    errorHandlingSettings: Schema.optional(ErrorHandlingSettings),
    evaluationMetricsThresholds: Schema.optional(EvaluationMetricsThresholds),
    locked: Schema.optional(Schema.Boolean),
    audioProcessingConfig: Schema.optional(AudioProcessingConfig),
    createTime: Schema.optional(Schema.String),
    modelSettings: Schema.optional(ModelSettings),
    timeZoneSettings: Schema.optional(TimeZoneSettings),
    clientCertificateSettings: Schema.optional(ClientCertificateSettings),
    variableDeclarations: Schema.optional(Schema.Array(AppVariableDeclaration)),
    languageSettings: Schema.optional(LanguageSettings),
    toolExecutionMode: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    loggingSettings: Schema.optional(LoggingSettings),
    etag: Schema.optional(Schema.String),
    deploymentCount: Schema.optional(Schema.Number),
    dataStoreSettings: Schema.optional(DataStoreSettings),
    defaultChannelProfile: Schema.optional(ChannelProfile),
  }),
).annotate({ identifier: "App" }) as any as Schema.Schema<App>;

export interface GuardrailLlmPromptSecurityDefaultSecuritySettings {
  /** Output only. The default prompt template used by the system. This field is for display purposes to show the user what prompt the system uses by default. It is OUTPUT_ONLY. */
  defaultPromptTemplate?: string;
}

export const GuardrailLlmPromptSecurityDefaultSecuritySettings: Schema.Schema<GuardrailLlmPromptSecurityDefaultSecuritySettings> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultPromptTemplate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuardrailLlmPromptSecurityDefaultSecuritySettings",
  }) as any as Schema.Schema<GuardrailLlmPromptSecurityDefaultSecuritySettings>;

export interface GuardrailLlmPolicy {
  /** Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail. */
  failOpen?: boolean;
  /** Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped. */
  allowShortUtterance?: boolean;
  /** Optional. Model settings. */
  modelSettings?: ModelSettings;
  /** Required. Policy prompt. */
  prompt?: string;
  /** Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond. */
  policyScope?:
    | "POLICY_SCOPE_UNSPECIFIED"
    | "USER_QUERY"
    | "AGENT_RESPONSE"
    | "USER_QUERY_AND_AGENT_RESPONSE"
    | (string & {});
  /** Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used. */
  maxConversationMessages?: number;
}

export const GuardrailLlmPolicy: Schema.Schema<GuardrailLlmPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      failOpen: Schema.optional(Schema.Boolean),
      allowShortUtterance: Schema.optional(Schema.Boolean),
      modelSettings: Schema.optional(ModelSettings),
      prompt: Schema.optional(Schema.String),
      policyScope: Schema.optional(Schema.String),
      maxConversationMessages: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GuardrailLlmPolicy",
  }) as any as Schema.Schema<GuardrailLlmPolicy>;

export interface GuardrailLlmPromptSecurity {
  /** Optional. Determines the behavior when the guardrail encounters an LLM error. - If true: the guardrail is bypassed. - If false (default): the guardrail triggers/blocks. Note: If a custom policy is provided, this field is ignored in favor of the policy's 'fail_open' configuration. */
  failOpen?: boolean;
  /** Optional. Use the system's predefined default security settings. To select this mode, include an empty 'default_settings' message in the request. The 'default_prompt_template' field within will be populated by the server in the response. */
  defaultSettings?: GuardrailLlmPromptSecurityDefaultSecuritySettings;
  /** Optional. Use a user-defined LlmPolicy to configure the security guardrail. */
  customPolicy?: GuardrailLlmPolicy;
}

export const GuardrailLlmPromptSecurity: Schema.Schema<GuardrailLlmPromptSecurity> =
  Schema.suspend(() =>
    Schema.Struct({
      failOpen: Schema.optional(Schema.Boolean),
      defaultSettings: Schema.optional(
        GuardrailLlmPromptSecurityDefaultSecuritySettings,
      ),
      customPolicy: Schema.optional(GuardrailLlmPolicy),
    }),
  ).annotate({
    identifier: "GuardrailLlmPromptSecurity",
  }) as any as Schema.Schema<GuardrailLlmPromptSecurity>;

export interface GuardrailModelSafetySafetySetting {
  /** Required. The harm block threshold. */
  threshold?:
    | "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
    | "BLOCK_LOW_AND_ABOVE"
    | "BLOCK_MEDIUM_AND_ABOVE"
    | "BLOCK_ONLY_HIGH"
    | "BLOCK_NONE"
    | "OFF"
    | (string & {});
  /** Required. The harm category. */
  category?:
    | "HARM_CATEGORY_UNSPECIFIED"
    | "HARM_CATEGORY_HATE_SPEECH"
    | "HARM_CATEGORY_DANGEROUS_CONTENT"
    | "HARM_CATEGORY_HARASSMENT"
    | "HARM_CATEGORY_SEXUALLY_EXPLICIT"
    | (string & {});
}

export const GuardrailModelSafetySafetySetting: Schema.Schema<GuardrailModelSafetySafetySetting> =
  Schema.suspend(() =>
    Schema.Struct({
      threshold: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuardrailModelSafetySafetySetting",
  }) as any as Schema.Schema<GuardrailModelSafetySafetySetting>;

export interface GuardrailModelSafety {
  /** Required. List of safety settings. */
  safetySettings?: Array<GuardrailModelSafetySafetySetting>;
}

export const GuardrailModelSafety: Schema.Schema<GuardrailModelSafety> =
  Schema.suspend(() =>
    Schema.Struct({
      safetySettings: Schema.optional(
        Schema.Array(GuardrailModelSafetySafetySetting),
      ),
    }),
  ).annotate({
    identifier: "GuardrailModelSafety",
  }) as any as Schema.Schema<GuardrailModelSafety>;

export interface GuardrailContentFilter {
  /** Optional. List of banned phrases. Applies only to agent responses. */
  bannedContentsInAgentResponse?: Array<string>;
  /** Required. Match type for the content filter. */
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "SIMPLE_STRING_MATCH"
    | "WORD_BOUNDARY_STRING_MATCH"
    | "REGEXP_MATCH"
    | (string & {});
  /** Optional. If true, diacritics are ignored during matching. */
  disregardDiacritics?: boolean;
  /** Optional. List of banned phrases. Applies to both user inputs and agent responses. */
  bannedContents?: Array<string>;
  /** Optional. List of banned phrases. Applies only to user inputs. */
  bannedContentsInUserInput?: Array<string>;
}

export const GuardrailContentFilter: Schema.Schema<GuardrailContentFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      bannedContentsInAgentResponse: Schema.optional(
        Schema.Array(Schema.String),
      ),
      matchType: Schema.optional(Schema.String),
      disregardDiacritics: Schema.optional(Schema.Boolean),
      bannedContents: Schema.optional(Schema.Array(Schema.String)),
      bannedContentsInUserInput: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GuardrailContentFilter",
  }) as any as Schema.Schema<GuardrailContentFilter>;

export interface Callback {
  /** Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations. */
  proactiveExecutionEnabled?: boolean;
  /** Optional. Human-readable description of the callback. */
  description?: string;
  /** Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent. */
  disabled?: boolean;
  /** Required. The python code to execute for the callback. */
  pythonCode?: string;
}

export const Callback: Schema.Schema<Callback> = Schema.suspend(() =>
  Schema.Struct({
    proactiveExecutionEnabled: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    pythonCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Callback" }) as any as Schema.Schema<Callback>;

export interface GuardrailCodeCallback {
  /** Optional. The callback to execute after the agent is called. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  afterAgentCallback?: Callback;
  /** Optional. The callback to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  afterModelCallback?: Callback;
  /** Optional. The callback to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  beforeModelCallback?: Callback;
  /** Optional. The callback to execute before the agent is called. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  beforeAgentCallback?: Callback;
}

export const GuardrailCodeCallback: Schema.Schema<GuardrailCodeCallback> =
  Schema.suspend(() =>
    Schema.Struct({
      afterAgentCallback: Schema.optional(Callback),
      afterModelCallback: Schema.optional(Callback),
      beforeModelCallback: Schema.optional(Callback),
      beforeAgentCallback: Schema.optional(Callback),
    }),
  ).annotate({
    identifier: "GuardrailCodeCallback",
  }) as any as Schema.Schema<GuardrailCodeCallback>;

export interface TriggerActionTransferAgent {
  /** Required. The name of the agent to transfer the conversation to. The agent must be in the same app as the current agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  agent?: string;
}

export const TriggerActionTransferAgent: Schema.Schema<TriggerActionTransferAgent> =
  Schema.suspend(() =>
    Schema.Struct({
      agent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TriggerActionTransferAgent",
  }) as any as Schema.Schema<TriggerActionTransferAgent>;

export interface TriggerActionGenerativeAnswer {
  /** Required. The prompt to use for the generative answer. */
  prompt?: string;
}

export const TriggerActionGenerativeAnswer: Schema.Schema<TriggerActionGenerativeAnswer> =
  Schema.suspend(() =>
    Schema.Struct({
      prompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TriggerActionGenerativeAnswer",
  }) as any as Schema.Schema<TriggerActionGenerativeAnswer>;

export interface TriggerAction {
  /** Optional. Immediately respond with a preconfigured response. */
  respondImmediately?: TriggerActionRespondImmediately;
  /** Optional. Transfer the conversation to a different agent. */
  transferAgent?: TriggerActionTransferAgent;
  /** Optional. Respond with a generative answer. */
  generativeAnswer?: TriggerActionGenerativeAnswer;
}

export const TriggerAction: Schema.Schema<TriggerAction> = Schema.suspend(() =>
  Schema.Struct({
    respondImmediately: Schema.optional(TriggerActionRespondImmediately),
    transferAgent: Schema.optional(TriggerActionTransferAgent),
    generativeAnswer: Schema.optional(TriggerActionGenerativeAnswer),
  }),
).annotate({
  identifier: "TriggerAction",
}) as any as Schema.Schema<TriggerAction>;

export interface Guardrail {
  /** Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  name?: string;
  /** Output only. Timestamp when the guardrail was created. */
  createTime?: string;
  /** Output only. Timestamp when the guardrail was last updated. */
  updateTime?: string;
  /** Optional. Guardrail that blocks the conversation if the prompt is considered unsafe based on the LLM classification. */
  llmPromptSecurity?: GuardrailLlmPromptSecurity;
  /** Optional. Guardrail that blocks the conversation if the LLM response is considered unsafe based on the model safety settings. */
  modelSafety?: GuardrailModelSafety;
  /** Optional. Description of the guardrail. */
  description?: string;
  /** Optional. Guardrail that bans certain content from being used in the conversation. */
  contentFilter?: GuardrailContentFilter;
  /** Optional. Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification. */
  llmPolicy?: GuardrailLlmPolicy;
  /** Optional. Guardrail that potentially blocks the conversation based on the result of the callback execution. */
  codeCallback?: GuardrailCodeCallback;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. Action to take when the guardrail is triggered. */
  action?: TriggerAction;
  /** Optional. Whether the guardrail is enabled. */
  enabled?: boolean;
  /** Required. Display name of the guardrail. */
  displayName?: string;
}

export const Guardrail: Schema.Schema<Guardrail> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    llmPromptSecurity: Schema.optional(GuardrailLlmPromptSecurity),
    modelSafety: Schema.optional(GuardrailModelSafety),
    description: Schema.optional(Schema.String),
    contentFilter: Schema.optional(GuardrailContentFilter),
    llmPolicy: Schema.optional(GuardrailLlmPolicy),
    codeCallback: Schema.optional(GuardrailCodeCallback),
    etag: Schema.optional(Schema.String),
    action: Schema.optional(TriggerAction),
    enabled: Schema.optional(Schema.Boolean),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Guardrail" }) as any as Schema.Schema<Guardrail>;

export interface AgentAgentToolset {
  /** Optional. The tools IDs to filter the toolset. */
  toolIds?: Array<string>;
  /** Required. The resource name of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  toolset?: string;
}

export const AgentAgentToolset: Schema.Schema<AgentAgentToolset> =
  Schema.suspend(() =>
    Schema.Struct({
      toolIds: Schema.optional(Schema.Array(Schema.String)),
      toolset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AgentAgentToolset",
  }) as any as Schema.Schema<AgentAgentToolset>;

export interface AgentRemoteDialogflowAgent {
  /** Optional. The environment ID of the Dialogflow agent to be used for the agent execution. If not specified, the draft environment will be used. */
  environmentId?: string;
  /** Required. The [Dialogflow](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent resource name. Format: `projects/{project}/locations/{location}/agents/{agent}` */
  agent?: string;
  /** Optional. The flow ID of the flow in the Dialogflow agent. */
  flowId?: string;
  /** Optional. Indicates whether to respect the message-level interruption settings configured in the Dialogflow agent. * If false: all response messages from the Dialogflow agent follow the app-level barge-in settings. * If true: only response messages with [`allow_playback_interruption`](https://docs.cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#text) set to true will be interruptable, all other messages follow the app-level barge-in settings. */
  respectResponseInterruptionSettings?: boolean;
  /** Optional. The mapping of the app variables names to the Dialogflow session parameters names to be sent to the Dialogflow agent as input. */
  inputVariableMapping?: Record<string, string>;
  /** Optional. The mapping of the Dialogflow session parameters names to the app variables names to be sent back to the CES agent after the Dialogflow agent execution ends. */
  outputVariableMapping?: Record<string, string>;
}

export const AgentRemoteDialogflowAgent: Schema.Schema<AgentRemoteDialogflowAgent> =
  Schema.suspend(() =>
    Schema.Struct({
      environmentId: Schema.optional(Schema.String),
      agent: Schema.optional(Schema.String),
      flowId: Schema.optional(Schema.String),
      respectResponseInterruptionSettings: Schema.optional(Schema.Boolean),
      inputVariableMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      outputVariableMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "AgentRemoteDialogflowAgent",
  }) as any as Schema.Schema<AgentRemoteDialogflowAgent>;

export interface AgentLlmAgent {}

export const AgentLlmAgent: Schema.Schema<AgentLlmAgent> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({
  identifier: "AgentLlmAgent",
}) as any as Schema.Schema<AgentLlmAgent>;

export interface ExpressionCondition {
  /** Required. The string representation of cloud.api.Expression condition. */
  expression?: string;
}

export const ExpressionCondition: Schema.Schema<ExpressionCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExpressionCondition",
  }) as any as Schema.Schema<ExpressionCondition>;

export interface TransferRuleDisablePlannerTransfer {
  /** Required. If the condition evaluates to true, planner will not be allowed to transfer to the target agent. */
  expressionCondition?: ExpressionCondition;
}

export const TransferRuleDisablePlannerTransfer: Schema.Schema<TransferRuleDisablePlannerTransfer> =
  Schema.suspend(() =>
    Schema.Struct({
      expressionCondition: Schema.optional(ExpressionCondition),
    }),
  ).annotate({
    identifier: "TransferRuleDisablePlannerTransfer",
  }) as any as Schema.Schema<TransferRuleDisablePlannerTransfer>;

export interface PythonCodeCondition {
  /** Required. The python code to execute. */
  pythonCode?: string;
}

export const PythonCodeCondition: Schema.Schema<PythonCodeCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      pythonCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PythonCodeCondition",
  }) as any as Schema.Schema<PythonCodeCondition>;

export interface TransferRuleDeterministicTransfer {
  /** Optional. A rule that uses Python code block to evaluate the conditions. If the condition evaluates to true, the transfer occurs. */
  pythonCodeCondition?: PythonCodeCondition;
  /** Optional. A rule that evaluates a session state condition. If the condition evaluates to true, the transfer occurs. */
  expressionCondition?: ExpressionCondition;
}

export const TransferRuleDeterministicTransfer: Schema.Schema<TransferRuleDeterministicTransfer> =
  Schema.suspend(() =>
    Schema.Struct({
      pythonCodeCondition: Schema.optional(PythonCodeCondition),
      expressionCondition: Schema.optional(ExpressionCondition),
    }),
  ).annotate({
    identifier: "TransferRuleDeterministicTransfer",
  }) as any as Schema.Schema<TransferRuleDeterministicTransfer>;

export interface TransferRule {
  /** Required. The direction of the transfer. */
  direction?:
    | "DIRECTION_UNSPECIFIED"
    | "PARENT_TO_CHILD"
    | "CHILD_TO_PARENT"
    | (string & {});
  /** Required. The resource name of the child agent the rule applies to. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  childAgent?: string;
  /** Optional. Rule that prevents the planner from transferring to the target agent. */
  disablePlannerTransfer?: TransferRuleDisablePlannerTransfer;
  /** Optional. A rule that immediately transfers to the target agent when the condition is met. */
  deterministicTransfer?: TransferRuleDeterministicTransfer;
}

export const TransferRule: Schema.Schema<TransferRule> = Schema.suspend(() =>
  Schema.Struct({
    direction: Schema.optional(Schema.String),
    childAgent: Schema.optional(Schema.String),
    disablePlannerTransfer: Schema.optional(TransferRuleDisablePlannerTransfer),
    deterministicTransfer: Schema.optional(TransferRuleDeterministicTransfer),
  }),
).annotate({
  identifier: "TransferRule",
}) as any as Schema.Schema<TransferRule>;

export interface Agent {
  /** Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  name?: string;
  /** Required. Display name of the agent. */
  displayName?: string;
  /** Output only. If the agent is generated by the LLM assistant, this field contains a descriptive summary of the generation. */
  generatedSummary?: string;
  /** Optional. The callbacks to execute after the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  afterAgentCallbacks?: Array<Callback>;
  /** Optional. The callbacks to execute before the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  beforeToolCallbacks?: Array<Callback>;
  /** Optional. List of available tools for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tools?: Array<string>;
  /** Optional. Instructions for the LLM model to guide the agent's behavior. */
  instruction?: string;
  /** Output only. Timestamp when the agent was created. */
  createTime?: string;
  /** Output only. Timestamp when the agent was last updated. */
  updateTime?: string;
  /** Optional. List of guardrails for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  guardrails?: Array<string>;
  /** Optional. List of toolsets for the agent. */
  toolsets?: Array<AgentAgentToolset>;
  /** Optional. The callbacks to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  afterModelCallbacks?: Array<Callback>;
  /** Optional. The callbacks to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  beforeModelCallbacks?: Array<Callback>;
  /** Optional. The callbacks to execute after the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  afterToolCallbacks?: Array<Callback>;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. The remote [Dialogflow](https://cloud.google.com/dialogflow/cx/docs/concept/console-conversational-agents) agent to be used for the agent execution. If this field is set, all other agent level properties will be ignored. Note: If the Dialogflow agent is in a different project from the app, you should grant `roles/dialogflow.client` to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  remoteDialogflowAgent?: AgentRemoteDialogflowAgent;
  /** Optional. Human-readable description of the agent. */
  description?: string;
  /** Optional. List of child agents in the agent tree. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  childAgents?: Array<string>;
  /** Optional. Configurations for the LLM model. */
  modelSettings?: ModelSettings;
  /** Optional. The default agent type. */
  llmAgent?: AgentLlmAgent;
  /** Optional. The callbacks to execute before the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  beforeAgentCallbacks?: Array<Callback>;
  /** Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used. */
  transferRules?: Array<TransferRule>;
}

export const Agent: Schema.Schema<Agent> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    generatedSummary: Schema.optional(Schema.String),
    afterAgentCallbacks: Schema.optional(Schema.Array(Callback)),
    beforeToolCallbacks: Schema.optional(Schema.Array(Callback)),
    tools: Schema.optional(Schema.Array(Schema.String)),
    instruction: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    guardrails: Schema.optional(Schema.Array(Schema.String)),
    toolsets: Schema.optional(Schema.Array(AgentAgentToolset)),
    afterModelCallbacks: Schema.optional(Schema.Array(Callback)),
    beforeModelCallbacks: Schema.optional(Schema.Array(Callback)),
    afterToolCallbacks: Schema.optional(Schema.Array(Callback)),
    etag: Schema.optional(Schema.String),
    remoteDialogflowAgent: Schema.optional(AgentRemoteDialogflowAgent),
    description: Schema.optional(Schema.String),
    childAgents: Schema.optional(Schema.Array(Schema.String)),
    modelSettings: Schema.optional(ModelSettings),
    llmAgent: Schema.optional(AgentLlmAgent),
    beforeAgentCallbacks: Schema.optional(Schema.Array(Callback)),
    transferRules: Schema.optional(Schema.Array(TransferRule)),
  }),
).annotate({ identifier: "Agent" }) as any as Schema.Schema<Agent>;

export interface Image {
  /** Required. The IANA standard MIME type of the source data. Supported image types includes: * image/png * image/jpeg * image/webp */
  mimeType?: string;
  /** Required. Raw bytes of the image. */
  data?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() =>
  Schema.Struct({
    mimeType: Schema.optional(Schema.String),
    data: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface ToolsetTool {
  /** Optional. The tool ID to filter the tools to retrieve the schema for. */
  toolId?: string;
  /** Required. The resource name of the Toolset from which this tool is derived. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  toolset?: string;
}

export const ToolsetTool: Schema.Schema<ToolsetTool> = Schema.suspend(() =>
  Schema.Struct({
    toolId: Schema.optional(Schema.String),
    toolset: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ToolsetTool" }) as any as Schema.Schema<ToolsetTool>;

export interface ToolResponse {
  /** Output only. Display name of the tool. */
  displayName?: string;
  /** Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
  /** Required. The tool execution result in JSON object format. Use "output" key to specify tool response and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as tool execution result. */
  response?: Record<string, unknown>;
  /** Optional. The toolset tool that got executed. */
  toolsetTool?: ToolsetTool;
  /** Optional. The matching ID of the tool call the response is for. */
  id?: string;
}

export const ToolResponse: Schema.Schema<ToolResponse> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    tool: Schema.optional(Schema.String),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    toolsetTool: Schema.optional(ToolsetTool),
    id: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ToolResponse",
}) as any as Schema.Schema<ToolResponse>;

export interface ToolCall {
  /** Optional. The unique identifier of the tool call. If populated, the client should return the execution result with the matching ID in ToolResponse. */
  id?: string;
  /** Optional. The toolset tool to execute. */
  toolsetTool?: ToolsetTool;
  /** Output only. Display name of the tool. */
  displayName?: string;
  /** Optional. The input parameters and values for the tool in JSON object format. */
  args?: Record<string, unknown>;
  /** Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
}

export const ToolCall: Schema.Schema<ToolCall> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    toolsetTool: Schema.optional(ToolsetTool),
    displayName: Schema.optional(Schema.String),
    args: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    tool: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ToolCall" }) as any as Schema.Schema<ToolCall>;

export interface Blob {
  /** Required. The IANA standard MIME type of the source data. */
  mimeType?: string;
  /** Required. Raw bytes of the blob. */
  data?: string;
}

export const Blob: Schema.Schema<Blob> = Schema.suspend(() =>
  Schema.Struct({
    mimeType: Schema.optional(Schema.String),
    data: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Blob" }) as any as Schema.Schema<Blob>;

export interface AgentTransfer {
  /** Output only. Display name of the agent. */
  displayName?: string;
  /** Required. The agent to which the conversation is being transferred. The agent will handle the conversation from this point forward. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  targetAgent?: string;
}

export const AgentTransfer: Schema.Schema<AgentTransfer> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    targetAgent: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "AgentTransfer",
}) as any as Schema.Schema<AgentTransfer>;

export interface Chunk {
  /** A struct represents variables that were updated in the conversation, keyed by variable names. */
  updatedVariables?: Record<string, unknown>;
  /** A struct represents default variables at the start of the conversation, keyed by variable names. */
  defaultVariables?: Record<string, unknown>;
  /** Optional. Transcript associated with the audio. */
  transcript?: string;
  /** Optional. Image data. */
  image?: Image;
  /** Optional. Tool execution response. */
  toolResponse?: ToolResponse;
  /** Optional. Tool execution request. */
  toolCall?: ToolCall;
  /** Optional. Text data. */
  text?: string;
  /** Optional. Blob data. */
  blob?: Blob;
  /** Optional. Agent transfer event. */
  agentTransfer?: AgentTransfer;
  /** Optional. Custom payload data. */
  payload?: Record<string, unknown>;
}

export const Chunk: Schema.Schema<Chunk> = Schema.suspend(() =>
  Schema.Struct({
    updatedVariables: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    defaultVariables: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    transcript: Schema.optional(Schema.String),
    image: Schema.optional(Image),
    toolResponse: Schema.optional(ToolResponse),
    toolCall: Schema.optional(ToolCall),
    text: Schema.optional(Schema.String),
    blob: Schema.optional(Blob),
    agentTransfer: Schema.optional(AgentTransfer),
    payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Chunk" }) as any as Schema.Schema<Chunk>;

export interface Message {
  /** Optional. Timestamp when the message was sent or received. Should not be used if the message is part of an example. */
  eventTime?: string;
  /** Optional. The role within the conversation, e.g., user, agent. */
  role?: string;
  /** Optional. Content of the message as a series of chunks. */
  chunks?: Array<Chunk>;
}

export const Message: Schema.Schema<Message> = Schema.suspend(() =>
  Schema.Struct({
    eventTime: Schema.optional(Schema.String),
    role: Schema.optional(Schema.String),
    chunks: Schema.optional(Schema.Array(Chunk)),
  }),
).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface Example {
  /** Optional. The collection of messages that make up the conversation. */
  messages?: Array<Message>;
  /** Optional. Human-readable description of the example. */
  description?: string;
  /** Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}` */
  name?: string;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. The agent that initially handles the conversation. If not specified, the example represents a conversation that is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  entryAgent?: string;
  /** Output only. The example may become invalid if referencing resources are deleted. Invalid examples will not be used as few-shot examples. */
  invalid?: boolean;
  /** Required. Display name of the example. */
  displayName?: string;
  /** Output only. Timestamp when the example was last updated. */
  updateTime?: string;
  /** Output only. Timestamp when the example was created. */
  createTime?: string;
}

export const Example: Schema.Schema<Example> = Schema.suspend(() =>
  Schema.Struct({
    messages: Schema.optional(Schema.Array(Message)),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    entryAgent: Schema.optional(Schema.String),
    invalid: Schema.optional(Schema.Boolean),
    displayName: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Example" }) as any as Schema.Schema<Example>;

export interface AppSnapshot {
  /** Optional. List of toolsets in the app. */
  toolsets?: Array<Toolset>;
  /** Optional. List of tools in the app. */
  tools?: Array<Tool>;
  /** Optional. The basic settings for the app. */
  app?: App;
  /** Optional. List of guardrails in the app. */
  guardrails?: Array<Guardrail>;
  /** Optional. List of agents in the app. */
  agents?: Array<Agent>;
  /** Optional. List of examples in the app. */
  examples?: Array<Example>;
}

export const AppSnapshot: Schema.Schema<AppSnapshot> = Schema.suspend(() =>
  Schema.Struct({
    toolsets: Schema.optional(Schema.Array(Toolset)),
    tools: Schema.optional(Schema.Array(Tool)),
    app: Schema.optional(App),
    guardrails: Schema.optional(Schema.Array(Guardrail)),
    agents: Schema.optional(Schema.Array(Agent)),
    examples: Schema.optional(Schema.Array(Example)),
  }),
).annotate({ identifier: "AppSnapshot" }) as any as Schema.Schema<AppSnapshot>;

export interface ExportAppRequest {
  /** Optional. The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to which to export the app. The format of this URI must be `gs:///`. The exported app archive will be written directly to the specified GCS object. */
  gcsUri?: string;
  /** Required. The format to export the app in. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const ExportAppRequest: Schema.Schema<ExportAppRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      exportFormat: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ExportAppRequest",
}) as any as Schema.Schema<ExportAppRequest>;

export interface Span {
  /** Output only. The end time of the span. */
  endTime?: string;
  /** Output only. Key-value attributes associated with the span. */
  attributes?: Record<string, unknown>;
  /** Output only. The child spans that are nested under this span. */
  childSpans?: Array<Span>;
  /** Output only. The duration of the span. */
  duration?: string;
  /** Output only. The name of the span. */
  name?: string;
  /** Output only. The start time of the span. */
  startTime?: string;
}

export const Span: Schema.Schema<Span> = Schema.suspend(() =>
  Schema.Struct({
    endTime: Schema.optional(Schema.String),
    attributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    childSpans: Schema.optional(Schema.Array(Span)),
    duration: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Span" }) as any as Schema.Schema<Span>;

export interface InputAudioConfig {
  /** Required. The sample rate (in Hertz) of the input audio data. */
  sampleRateHertz?: number;
  /** Required. The encoding of the input audio data. */
  audioEncoding?:
    | "AUDIO_ENCODING_UNSPECIFIED"
    | "LINEAR16"
    | "MULAW"
    | "ALAW"
    | (string & {});
  /** Optional. Whether to enable noise suppression on the input audio. Available values are "low", "moderate", "high", "very_high". */
  noiseSuppressionLevel?: string;
}

export const InputAudioConfig: Schema.Schema<InputAudioConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      sampleRateHertz: Schema.optional(Schema.Number),
      audioEncoding: Schema.optional(Schema.String),
      noiseSuppressionLevel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "InputAudioConfig",
}) as any as Schema.Schema<InputAudioConfig>;

export interface GenerateChatTokenRequest {
  /** Required. The deployment of the app to use for the session. Format: projects/{project}/locations/{location}/apps/{app}/deployments/{deployment} */
  deployment?: string;
  /** Optional. The reCAPTCHA token generated by the client-side chat widget. */
  recaptchaToken?: string;
}

export const GenerateChatTokenRequest: Schema.Schema<GenerateChatTokenRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      deployment: Schema.optional(Schema.String),
      recaptchaToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateChatTokenRequest",
  }) as any as Schema.Schema<GenerateChatTokenRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ToolResponses {
  /** Optional. The list of tool execution results. */
  toolResponses?: Array<ToolResponse>;
}

export const ToolResponses: Schema.Schema<ToolResponses> = Schema.suspend(() =>
  Schema.Struct({
    toolResponses: Schema.optional(Schema.Array(ToolResponse)),
  }),
).annotate({
  identifier: "ToolResponses",
}) as any as Schema.Schema<ToolResponses>;

export interface Event {
  /** Required. The name of the event. */
  event?: string;
}

export const Event: Schema.Schema<Event> = Schema.suspend(() =>
  Schema.Struct({
    event: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface SessionInput {
  /** Optional. A flag to indicate if the current message is a fragment of a larger input in the bidi streaming session. When set to `true`, the agent defers processing until it receives a subsequent message where `will_continue` is `false`, or until the system detects an endpoint in the audio input. NOTE: This field does not apply to audio and DTMF inputs, as they are always processed automatically based on the endpointing signal. */
  willContinue?: boolean;
  /** Optional. Audio data from the end user. */
  audio?: string;
  /** Optional. Contextual variables for the session, keyed by name. Only variables declared in the app will be used by the CES agent. Unrecognized variables will still be sent to the Dialogflow agent as additional session parameters. */
  variables?: Record<string, unknown>;
  /** Optional. Image data from the end user. */
  image?: Image;
  /** Optional. Execution results for the tool calls from the client. */
  toolResponses?: ToolResponses;
  /** Optional. Event input. */
  event?: Event;
  /** Optional. DTMF digits from the end user. */
  dtmf?: string;
  /** Optional. Text data from the end user. */
  text?: string;
  /** Optional. Blob data from the end user. */
  blob?: Blob;
}

export const SessionInput: Schema.Schema<SessionInput> = Schema.suspend(() =>
  Schema.Struct({
    willContinue: Schema.optional(Schema.Boolean),
    audio: Schema.optional(Schema.String),
    variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    image: Schema.optional(Image),
    toolResponses: Schema.optional(ToolResponses),
    event: Schema.optional(Event),
    dtmf: Schema.optional(Schema.String),
    text: Schema.optional(Schema.String),
    blob: Schema.optional(Blob),
  }),
).annotate({
  identifier: "SessionInput",
}) as any as Schema.Schema<SessionInput>;

export interface ConversationTurn {
  /** Optional. The root span of the action processing. */
  rootSpan?: Span;
  /** Optional. List of messages in the conversation turn, including user input, agent responses and intermediate events during the processing. */
  messages?: Array<Message>;
}

export const ConversationTurn: Schema.Schema<ConversationTurn> = Schema.suspend(
  () =>
    Schema.Struct({
      rootSpan: Schema.optional(Span),
      messages: Schema.optional(Schema.Array(Message)),
    }),
).annotate({
  identifier: "ConversationTurn",
}) as any as Schema.Schema<ConversationTurn>;

export interface Conversation {
  /** Output only. Timestamp when the conversation was completed. */
  endTime?: string;
  /** Output only. The language code of the conversation. */
  languageCode?: string;
  /** Output only. The version of the app used for processing the conversation. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  appVersion?: string;
  /** Output only. The input types of the conversation. */
  inputTypes?: Array<
    | "INPUT_TYPE_UNSPECIFIED"
    | "INPUT_TYPE_TEXT"
    | "INPUT_TYPE_AUDIO"
    | "INPUT_TYPE_IMAGE"
    | "INPUT_TYPE_BLOB"
    | "INPUT_TYPE_TOOL_RESPONSE"
    | "INPUT_TYPE_VARIABLES"
    | (string & {})
  >;
  /** Output only. The number of turns in the conversation. */
  turnCount?: number;
  /** Output only. The agent that initially handles the conversation. If not specified, the conversation is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  entryAgent?: string;
  /** Deprecated. Use turns instead. */
  messages?: Array<Message>;
  /** Output only. Timestamp when the conversation was created. */
  startTime?: string;
  /** DEPRECATED. Please use input_types instead. */
  channelType?:
    | "CHANNEL_TYPE_UNSPECIFIED"
    | "TEXT"
    | "AUDIO"
    | "MULTIMODAL"
    | (string & {});
  /** Output only. The deployment of the app used for processing the conversation. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  deployment?: string;
  /** Output only. Indicate the source of the conversation. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
  /** Required. The turns in the conversation. */
  turns?: Array<ConversationTurn>;
  /** Identifier. The unique identifier of the conversation. Format: `projects/{project}/locations/{location}/apps/{app}/conversations/{conversation}` */
  name?: string;
}

export const Conversation: Schema.Schema<Conversation> = Schema.suspend(() =>
  Schema.Struct({
    endTime: Schema.optional(Schema.String),
    languageCode: Schema.optional(Schema.String),
    appVersion: Schema.optional(Schema.String),
    inputTypes: Schema.optional(Schema.Array(Schema.String)),
    turnCount: Schema.optional(Schema.Number),
    entryAgent: Schema.optional(Schema.String),
    messages: Schema.optional(Schema.Array(Message)),
    startTime: Schema.optional(Schema.String),
    channelType: Schema.optional(Schema.String),
    deployment: Schema.optional(Schema.String),
    source: Schema.optional(Schema.String),
    turns: Schema.optional(Schema.Array(ConversationTurn)),
    name: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Conversation",
}) as any as Schema.Schema<Conversation>;

export interface OmnichannelIntegrationConfigWhatsappConfig {
  /** The customer's WhatsApp Business Account (WABA) ID. */
  whatsappBusinessAccountId?: string;
  /** The verify token configured in the Meta App Dashboard for webhook verification. */
  webhookVerifyToken?: string;
  /** The phone number used for sending/receiving messages. */
  phoneNumber?: string;
  /** The Phone Number ID associated with the WhatsApp Business Account. */
  phoneNumberId?: string;
  /** The Meta Business Portfolio (MBP) ID. https://www.facebook.com/business/help/1710077379203657 */
  metaBusinessPortfolioId?: string;
  /** The access token for authenticating API calls to the WhatsApp Cloud API. https://developers.facebook.com/docs/whatsapp/business-management-api/get-started/#business-integration-system-user-access-tokens */
  whatsappBusinessToken?: string;
}

export const OmnichannelIntegrationConfigWhatsappConfig: Schema.Schema<OmnichannelIntegrationConfigWhatsappConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      whatsappBusinessAccountId: Schema.optional(Schema.String),
      webhookVerifyToken: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
      phoneNumberId: Schema.optional(Schema.String),
      metaBusinessPortfolioId: Schema.optional(Schema.String),
      whatsappBusinessToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigWhatsappConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigWhatsappConfig>;

export interface EndpointControlPolicy {
  /** Optional. The scope in which this policy's allowed_origins list is enforced. */
  enforcementScope?:
    | "ENFORCEMENT_SCOPE_UNSPECIFIED"
    | "VPCSC_ONLY"
    | "ALWAYS"
    | (string & {});
  /** Optional. The allowed HTTP(s) origins that tools in the App are able to directly call. The enforcement depends on the value of enforcement_scope and the VPC-SC status of the project. If a port number is not provided, all ports will be allowed. Otherwise, the port number must match exactly. For example, "https://example.com" will match "https://example.com:443" and any other port. "https://example.com:443" will only match "https://example.com:443". */
  allowedOrigins?: Array<string>;
}

export const EndpointControlPolicy: Schema.Schema<EndpointControlPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      enforcementScope: Schema.optional(Schema.String),
      allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "EndpointControlPolicy",
  }) as any as Schema.Schema<EndpointControlPolicy>;

export interface SecuritySettings {
  /** Optional. Endpoint control related settings. */
  endpointControlPolicy?: EndpointControlPolicy;
  /** Output only. Create time of the security settings. */
  createTime?: string;
  /** Output only. Last update time of the security settings. */
  updateTime?: string;
  /** Output only. Etag of the security settings. */
  etag?: string;
  /** Identifier. The unique identifier of the security settings. Format: `projects/{project}/locations/{location}/securitySettings` */
  name?: string;
}

export const SecuritySettings: Schema.Schema<SecuritySettings> = Schema.suspend(
  () =>
    Schema.Struct({
      endpointControlPolicy: Schema.optional(EndpointControlPolicy),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SecuritySettings",
}) as any as Schema.Schema<SecuritySettings>;

export interface OmnichannelIntegrationConfigChannelConfig {
  /** WhatsApp config. */
  whatsappConfig?: OmnichannelIntegrationConfigWhatsappConfig;
}

export const OmnichannelIntegrationConfigChannelConfig: Schema.Schema<OmnichannelIntegrationConfigChannelConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      whatsappConfig: Schema.optional(
        OmnichannelIntegrationConfigWhatsappConfig,
      ),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigChannelConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigChannelConfig>;

export interface OmnichannelIntegrationConfigRoutingConfig {
  /** The key of the subscriber. */
  subscriberKey?: string;
}

export const OmnichannelIntegrationConfigRoutingConfig: Schema.Schema<OmnichannelIntegrationConfigRoutingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      subscriberKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigRoutingConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigRoutingConfig>;

export interface OmnichannelIntegrationConfigCesAppConfig {
  /** The unique identifier of the CES app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  app?: string;
}

export const OmnichannelIntegrationConfigCesAppConfig: Schema.Schema<OmnichannelIntegrationConfigCesAppConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      app: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigCesAppConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigCesAppConfig>;

export interface OmnichannelIntegrationConfigSubscriberConfig {
  /** Ces app config. */
  cesAppConfig?: OmnichannelIntegrationConfigCesAppConfig;
}

export const OmnichannelIntegrationConfigSubscriberConfig: Schema.Schema<OmnichannelIntegrationConfigSubscriberConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      cesAppConfig: Schema.optional(OmnichannelIntegrationConfigCesAppConfig),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigSubscriberConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigSubscriberConfig>;

export interface OmnichannelIntegrationConfig {
  /** Optional. Various of configuration for handling App events. */
  channelConfigs?: Record<string, OmnichannelIntegrationConfigChannelConfig>;
  /** Optional. The key of routing_configs is a key of `app_configs`, value is a `RoutingConfig`, which contains subscriber's key. */
  routingConfigs?: Record<string, OmnichannelIntegrationConfigRoutingConfig>;
  /** Optional. Various of subscribers configs. */
  subscriberConfigs?: Record<
    string,
    OmnichannelIntegrationConfigSubscriberConfig
  >;
}

export const OmnichannelIntegrationConfig: Schema.Schema<OmnichannelIntegrationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      channelConfigs: Schema.optional(
        Schema.Record(Schema.String, OmnichannelIntegrationConfigChannelConfig),
      ),
      routingConfigs: Schema.optional(
        Schema.Record(Schema.String, OmnichannelIntegrationConfigRoutingConfig),
      ),
      subscriberConfigs: Schema.optional(
        Schema.Record(
          Schema.String,
          OmnichannelIntegrationConfigSubscriberConfig,
        ),
      ),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfig>;

export interface Omnichannel {
  /** Optional. The integration config for the omnichannel resource. */
  integrationConfig?: OmnichannelIntegrationConfig;
  /** Output only. Timestamp when the omnichannel resource was last updated. */
  updateTime?: string;
  /** Optional. Human-readable description of the omnichannel resource. */
  description?: string;
  /** Output only. Timestamp when the omnichannel resource was created. */
  createTime?: string;
  /** Identifier. The unique identifier of the omnichannel resource. Format: `projects/{project}/locations/{location}/omnichannels/{omnichannel}` */
  name?: string;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. */
  etag?: string;
  /** Required. Display name of the omnichannel resource. */
  displayName?: string;
}

export const Omnichannel: Schema.Schema<Omnichannel> = Schema.suspend(() =>
  Schema.Struct({
    integrationConfig: Schema.optional(OmnichannelIntegrationConfig),
    updateTime: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Omnichannel" }) as any as Schema.Schema<Omnichannel>;

export interface EndSession {
  /** Optional. Provides additional information about the end session signal, such as the reason for ending the session. */
  metadata?: Record<string, unknown>;
}

export const EndSession: Schema.Schema<EndSession> = Schema.suspend(() =>
  Schema.Struct({
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "EndSession" }) as any as Schema.Schema<EndSession>;

export interface OmnichannelOperationMetadata {
  /** Output only. Identifies whether the user has requested cancellation of the operation. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
}

export const OmnichannelOperationMetadata: Schema.Schema<OmnichannelOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      requestedCancellation: Schema.optional(Schema.Boolean),
      statusMessage: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelOperationMetadata",
  }) as any as Schema.Schema<OmnichannelOperationMetadata>;

export interface ExecuteToolResponse {
  /** The tool execution result in JSON object format. Use "output" key to specify tool response and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as tool execution result. */
  response?: Record<string, unknown>;
  /** The variable values at the end of the tool execution. */
  variables?: Record<string, unknown>;
  /** The toolset tool that got executed. */
  toolsetTool?: ToolsetTool;
  /** The name of the tool that got executed. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
}

export const ExecuteToolResponse: Schema.Schema<ExecuteToolResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      toolsetTool: Schema.optional(ToolsetTool),
      tool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExecuteToolResponse",
  }) as any as Schema.Schema<ExecuteToolResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface ImportAppRequestImportOptions {
  /** Optional. The strategy to use when resolving conflicts during import. */
  conflictResolutionStrategy?:
    | "CONFLICT_RESOLUTION_STRATEGY_UNSPECIFIED"
    | "REPLACE"
    | "OVERWRITE"
    | (string & {});
}

export const ImportAppRequestImportOptions: Schema.Schema<ImportAppRequestImportOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      conflictResolutionStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImportAppRequestImportOptions",
  }) as any as Schema.Schema<ImportAppRequestImportOptions>;

export interface ImportAppResponse {
  /** The resource name of the app that was imported. */
  name?: string;
  /** Warning messages generated during the import process. If errors occur for specific resources, they will not be included in the imported app and the error will be mentioned here. */
  warnings?: Array<string>;
}

export const ImportAppResponse: Schema.Schema<ImportAppResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      warnings: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ImportAppResponse",
  }) as any as Schema.Schema<ImportAppResponse>;

export interface ExportAppResponse {
  /** The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to which the app was exported. */
  appUri?: string;
  /** App folder compressed as a zip file. */
  appContent?: string;
}

export const ExportAppResponse: Schema.Schema<ExportAppResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      appUri: Schema.optional(Schema.String),
      appContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExportAppResponse",
  }) as any as Schema.Schema<ExportAppResponse>;

export interface AppVersion {
  /** Optional. The description of the app version. */
  description?: string;
  /** Optional. The display name of the app version. */
  displayName?: string;
  /** Identifier. The unique identifier of the app version. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  name?: string;
  /** Output only. The snapshot of the app when the version is created. */
  snapshot?: AppSnapshot;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Output only. Email of the user who created the app version. */
  creator?: string;
  /** Output only. Timestamp when the app version was created. */
  createTime?: string;
}

export const AppVersion: Schema.Schema<AppVersion> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    snapshot: Schema.optional(AppSnapshot),
    etag: Schema.optional(Schema.String),
    creator: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AppVersion" }) as any as Schema.Schema<AppVersion>;

export interface ListAppVersionsResponse {
  /** A token that can be sent as ListAppVersionsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of app versions. */
  appVersions?: Array<AppVersion>;
}

export const ListAppVersionsResponse: Schema.Schema<ListAppVersionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      appVersions: Schema.optional(Schema.Array(AppVersion)),
    }),
  ).annotate({
    identifier: "ListAppVersionsResponse",
  }) as any as Schema.Schema<ListAppVersionsResponse>;

export interface ListAgentsResponse {
  /** The list of agents. */
  agents?: Array<Agent>;
  /** A token that can be sent as ListAgentsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAgentsResponse: Schema.Schema<ListAgentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      agents: Schema.optional(Schema.Array(Agent)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAgentsResponse",
  }) as any as Schema.Schema<ListAgentsResponse>;

export interface ListConversationsResponse {
  /** A token that can be sent as ListConversationsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of conversations. */
  conversations?: Array<Conversation>;
}

export const ListConversationsResponse: Schema.Schema<ListConversationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      conversations: Schema.optional(Schema.Array(Conversation)),
    }),
  ).annotate({
    identifier: "ListConversationsResponse",
  }) as any as Schema.Schema<ListConversationsResponse>;

export interface SessionOutputDiagnosticInfo {
  /** A trace of the entire request processing, represented as a root span. This span can contain nested child spans for specific operations. */
  rootSpan?: Span;
  /** List of the messages that happened during the processing. */
  messages?: Array<Message>;
}

export const SessionOutputDiagnosticInfo: Schema.Schema<SessionOutputDiagnosticInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      rootSpan: Schema.optional(Span),
      messages: Schema.optional(Schema.Array(Message)),
    }),
  ).annotate({
    identifier: "SessionOutputDiagnosticInfo",
  }) as any as Schema.Schema<SessionOutputDiagnosticInfo>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    locationId: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface Deployment {
  /** Required. The channel profile used in the deployment. */
  channelProfile?: ChannelProfile;
  /** Output only. Timestamp when this deployment was last updated. */
  updateTime?: string;
  /** Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name?: string;
  /** Optional. The resource name of the app version to deploy. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` Use `projects/{project}/locations/{location}/apps/{app}/versions/-` to use the draft app. */
  appVersion?: string;
  /** Required. Display name of the deployment. */
  displayName?: string;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Output only. Timestamp when this deployment was created. */
  createTime?: string;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() =>
  Schema.Struct({
    channelProfile: Schema.optional(ChannelProfile),
    updateTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    appVersion: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface ListDeploymentsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of deployments. */
  deployments?: Array<Deployment>;
}

export const ListDeploymentsResponse: Schema.Schema<ListDeploymentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      deployments: Schema.optional(Schema.Array(Deployment)),
    }),
  ).annotate({
    identifier: "ListDeploymentsResponse",
  }) as any as Schema.Schema<ListDeploymentsResponse>;

export interface CitationsCitedChunk {
  /** URI used for citation. */
  uri?: string;
  /** Title of the cited document. */
  title?: string;
  /** Text used for citation. */
  text?: string;
}

export const CitationsCitedChunk: Schema.Schema<CitationsCitedChunk> =
  Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CitationsCitedChunk",
  }) as any as Schema.Schema<CitationsCitedChunk>;

export interface Citations {
  /** List of cited pieces of information. */
  citedChunks?: Array<CitationsCitedChunk>;
}

export const Citations: Schema.Schema<Citations> = Schema.suspend(() =>
  Schema.Struct({
    citedChunks: Schema.optional(Schema.Array(CitationsCitedChunk)),
  }),
).annotate({ identifier: "Citations" }) as any as Schema.Schema<Citations>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    code: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    error: Schema.optional(Status),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    name: Schema.optional(Schema.String),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface BatchDeleteConversationsRequest {
  /** Required. The resource names of the conversations to delete. */
  conversations?: Array<string>;
}

export const BatchDeleteConversationsRequest: Schema.Schema<BatchDeleteConversationsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      conversations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BatchDeleteConversationsRequest",
  }) as any as Schema.Schema<BatchDeleteConversationsRequest>;

export interface Changelog {
  /** Output only. Display name of the change. It typically should be the display name of the resource that was changed. */
  displayName?: string;
  /** Output only. The monotonically increasing sequence number of the changelog. */
  sequenceNumber?: string;
  /** Output only. The action that was performed on the resource. */
  action?: string;
  /** Output only. The new resource after the change. */
  newResource?: Record<string, unknown>;
  /** Output only. Description of the change. which typically captures the changed fields in the resource. */
  description?: string;
  /** Output only. The dependent resources that were changed. */
  dependentResources?: Array<Record<string, unknown>>;
  /** Output only. The type of the resource that was changed. */
  resourceType?: string;
  /** Output only. Email address of the change author. */
  author?: string;
  /** Output only. The time when the change was made. */
  createTime?: string;
  /** Output only. The original resource before the change. */
  originalResource?: Record<string, unknown>;
  /** Output only. The resource that was changed. */
  resource?: string;
  /** Identifier. The unique identifier of the changelog. Format: `projects/{project}/locations/{location}/apps/{app}/changelogs/{changelog}` */
  name?: string;
}

export const Changelog: Schema.Schema<Changelog> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    sequenceNumber: Schema.optional(Schema.String),
    action: Schema.optional(Schema.String),
    newResource: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    description: Schema.optional(Schema.String),
    dependentResources: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    resourceType: Schema.optional(Schema.String),
    author: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    originalResource: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    resource: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Changelog" }) as any as Schema.Schema<Changelog>;

export interface ToolCalls {
  /** Optional. The list of tool calls to execute. */
  toolCalls?: Array<ToolCall>;
}

export const ToolCalls: Schema.Schema<ToolCalls> = Schema.suspend(() =>
  Schema.Struct({
    toolCalls: Schema.optional(Schema.Array(ToolCall)),
  }),
).annotate({ identifier: "ToolCalls" }) as any as Schema.Schema<ToolCalls>;

export interface WebSearchQuery {
  /** The search query text. */
  query?: string;
  /** The URI to the Google Search results page for the query. */
  uri?: string;
}

export const WebSearchQuery: Schema.Schema<WebSearchQuery> = Schema.suspend(
  () =>
    Schema.Struct({
      query: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "WebSearchQuery",
}) as any as Schema.Schema<WebSearchQuery>;

export interface GoogleSearchSuggestions {
  /** Compliant HTML and CSS styling for search suggestions. The provided HTML and CSS automatically adapts to your device settings, displaying in either light or dark mode indicated by `@media(prefers-color-scheme)`. */
  htmls?: Array<string>;
  /** List of queries used to perform the google search along with the search result URIs forming the search suggestions. */
  webSearchQueries?: Array<WebSearchQuery>;
}

export const GoogleSearchSuggestions: Schema.Schema<GoogleSearchSuggestions> =
  Schema.suspend(() =>
    Schema.Struct({
      htmls: Schema.optional(Schema.Array(Schema.String)),
      webSearchQueries: Schema.optional(Schema.Array(WebSearchQuery)),
    }),
  ).annotate({
    identifier: "GoogleSearchSuggestions",
  }) as any as Schema.Schema<GoogleSearchSuggestions>;

export interface SessionOutput {
  /** Request for the client to execute the tools. */
  toolCalls?: ToolCalls;
  /** Indicates the sequential order of conversation turn to which this output belongs to, starting from 1. */
  turnIndex?: number;
  /** Output text from the CES agent. */
  text?: string;
  /** Custom payload with structured output from the CES agent. */
  payload?: Record<string, unknown>;
  /** Indicates the session has ended. */
  endSession?: EndSession;
  /** If true, the CES agent has detected the end of the current conversation turn and will provide no further output for this turn. */
  turnCompleted?: boolean;
  /** Citations that provide the source information for the agent's generated text. */
  citations?: Citations;
  /** Output audio from the CES agent. */
  audio?: string;
  /** The suggestions returned from Google Search as a result of invoking the GoogleSearchTool. */
  googleSearchSuggestions?: GoogleSearchSuggestions;
  /** Optional. Diagnostic information contains execution details during the processing of the input. Only populated in the last SessionOutput (with `turn_completed=true`) for each turn. */
  diagnosticInfo?: SessionOutputDiagnosticInfo;
}

export const SessionOutput: Schema.Schema<SessionOutput> = Schema.suspend(() =>
  Schema.Struct({
    toolCalls: Schema.optional(ToolCalls),
    turnIndex: Schema.optional(Schema.Number),
    text: Schema.optional(Schema.String),
    payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    endSession: Schema.optional(EndSession),
    turnCompleted: Schema.optional(Schema.Boolean),
    citations: Schema.optional(Citations),
    audio: Schema.optional(Schema.String),
    googleSearchSuggestions: Schema.optional(GoogleSearchSuggestions),
    diagnosticInfo: Schema.optional(SessionOutputDiagnosticInfo),
  }),
).annotate({
  identifier: "SessionOutput",
}) as any as Schema.Schema<SessionOutput>;

export interface RunSessionResponse {
  /** Outputs for the session. */
  outputs?: Array<SessionOutput>;
}

export const RunSessionResponse: Schema.Schema<RunSessionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      outputs: Schema.optional(Schema.Array(SessionOutput)),
    }),
  ).annotate({
    identifier: "RunSessionResponse",
  }) as any as Schema.Schema<RunSessionResponse>;

export interface ListChangelogsResponse {
  /** A token that can be sent as ListChangelogsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of changelogs. */
  changelogs?: Array<Changelog>;
}

export const ListChangelogsResponse: Schema.Schema<ListChangelogsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      changelogs: Schema.optional(Schema.Array(Changelog)),
    }),
  ).annotate({
    identifier: "ListChangelogsResponse",
  }) as any as Schema.Schema<ListChangelogsResponse>;

export interface SessionConfigRemoteDialogflowQueryParameters {
  /** Optional. The payload to be sent in [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters). */
  payload?: Record<string, unknown>;
  /** Optional. The end user metadata to be sent in [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters). */
  endUserMetadata?: Record<string, unknown>;
  /** Optional. The HTTP headers to be sent as webhook_headers in [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters). */
  webhookHeaders?: Record<string, string>;
}

export const SessionConfigRemoteDialogflowQueryParameters: Schema.Schema<SessionConfigRemoteDialogflowQueryParameters> =
  Schema.suspend(() =>
    Schema.Struct({
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      endUserMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      webhookHeaders: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "SessionConfigRemoteDialogflowQueryParameters",
  }) as any as Schema.Schema<SessionConfigRemoteDialogflowQueryParameters>;

export interface ListAppsResponse {
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The list of apps. */
  apps?: Array<App>;
  /** A token that can be sent as ListAppsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAppsResponse: Schema.Schema<ListAppsResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      apps: Schema.optional(Schema.Array(App)),
      nextPageToken: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ListAppsResponse",
}) as any as Schema.Schema<ListAppsResponse>;

export interface RetrieveToolsRequest {
  /** Optional. The identifiers of the tools to retrieve from the toolset. If empty, all tools in the toolset will be returned. */
  toolIds?: Array<string>;
}

export const RetrieveToolsRequest: Schema.Schema<RetrieveToolsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      toolIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RetrieveToolsRequest",
  }) as any as Schema.Schema<RetrieveToolsRequest>;

export interface GenerateChatTokenResponse {
  /** The time at which the chat token expires. */
  expireTime?: string;
  /** The session scoped token for chat widget to authenticate with Session APIs. */
  chatToken?: string;
}

export const GenerateChatTokenResponse: Schema.Schema<GenerateChatTokenResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      expireTime: Schema.optional(Schema.String),
      chatToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateChatTokenResponse",
  }) as any as Schema.Schema<GenerateChatTokenResponse>;

export interface OutputAudioConfig {
  /** Required. The sample rate (in Hertz) of the output audio data. */
  sampleRateHertz?: number;
  /** Required. The encoding of the output audio data. */
  audioEncoding?:
    | "AUDIO_ENCODING_UNSPECIFIED"
    | "LINEAR16"
    | "MULAW"
    | "ALAW"
    | (string & {});
}

export const OutputAudioConfig: Schema.Schema<OutputAudioConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      sampleRateHertz: Schema.optional(Schema.Number),
      audioEncoding: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OutputAudioConfig",
  }) as any as Schema.Schema<OutputAudioConfig>;

export interface SessionConfig {
  /** Optional. The historical context of the session, including user inputs, agent responses, and other messages. Typically, CES agent would manage session automatically so client doesn't need to explicitly populate this field. However, client can optionally override the historical contexts to force the session start from certain state. */
  historicalContexts?: Array<Message>;
  /** Optional. Configuration for processing the input audio. */
  inputAudioConfig?: InputAudioConfig;
  /** Optional. The time zone of the user. If provided, the agent will use the time zone for date and time related variables. Otherwise, the agent will use the time zone specified in the App.time_zone_settings. The format is the IANA Time Zone Database time zone, e.g. "America/Los_Angeles". */
  timeZone?: string;
  /** Optional. The deployment of the app to use for the session. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  deployment?: string;
  /** Optional. Whether to use tool fakes for the session. If this field is set, the agent will attempt use tool fakes instead of calling the real tools. */
  useToolFakes?: boolean;
  /** Optional. [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters) to send to the remote [Dialogflow](https://cloud.google.com/dialogflow/cx/docs/concept/console-conversational-agents) agent when the session control is transferred to the remote agent. */
  remoteDialogflowQueryParameters?: SessionConfigRemoteDialogflowQueryParameters;
  /** Optional. Configuration for generating the output audio. */
  outputAudioConfig?: OutputAudioConfig;
  /** Optional. The entry agent to handle the session. If not specified, the session will be handled by the root agent of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  entryAgent?: string;
}

export const SessionConfig: Schema.Schema<SessionConfig> = Schema.suspend(() =>
  Schema.Struct({
    historicalContexts: Schema.optional(Schema.Array(Message)),
    inputAudioConfig: Schema.optional(InputAudioConfig),
    timeZone: Schema.optional(Schema.String),
    deployment: Schema.optional(Schema.String),
    useToolFakes: Schema.optional(Schema.Boolean),
    remoteDialogflowQueryParameters: Schema.optional(
      SessionConfigRemoteDialogflowQueryParameters,
    ),
    outputAudioConfig: Schema.optional(OutputAudioConfig),
    entryAgent: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SessionConfig",
}) as any as Schema.Schema<SessionConfig>;

export interface RunSessionRequest {
  /** Required. Inputs for the session. */
  inputs?: Array<SessionInput>;
  /** Required. The configuration for the session. */
  config?: SessionConfig;
}

export const RunSessionRequest: Schema.Schema<RunSessionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      inputs: Schema.optional(Schema.Array(SessionInput)),
      config: Schema.optional(SessionConfig),
    }),
  ).annotate({
    identifier: "RunSessionRequest",
  }) as any as Schema.Schema<RunSessionRequest>;

export interface ImportAppRequest {
  /** The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI from which to import app. The format of this URI must be `gs:///`. */
  gcsUri?: string;
  /** Optional. Flag for overriding the app lock during import. If set to true, the import process will ignore the app lock. */
  ignoreAppLock?: boolean;
  /** Raw bytes representing the compressed zip file with the app folder structure. */
  appContent?: string;
  /** Optional. The ID to use for the imported app. * If not specified, a unique ID will be automatically assigned for the app. * Otherwise, the imported app will use this ID as the final component of its resource name. If an app with the same ID already exists at the specified location in the project, the content of the existing app will be replaced. */
  appId?: string;
  /** Optional. Options governing the import process for the app. */
  importOptions?: ImportAppRequestImportOptions;
  /** Optional. The display name of the app to import. * If the app is created on import, and the display name is specified, the imported app will use this display name. If a conflict is detected with an existing app, a timestamp will be appended to the display name to make it unique. * If the app is a reimport, this field should not be set. Providing a display name during reimport will result in an INVALID_ARGUMENT error. */
  displayName?: string;
}

export const ImportAppRequest: Schema.Schema<ImportAppRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      ignoreAppLock: Schema.optional(Schema.Boolean),
      appContent: Schema.optional(Schema.String),
      appId: Schema.optional(Schema.String),
      importOptions: Schema.optional(ImportAppRequestImportOptions),
      displayName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ImportAppRequest",
}) as any as Schema.Schema<ImportAppRequest>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface RestoreAppVersionRequest {}

export const RestoreAppVersionRequest: Schema.Schema<RestoreAppVersionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RestoreAppVersionRequest",
  }) as any as Schema.Schema<RestoreAppVersionRequest>;

export interface RetrieveToolsResponse {
  /** The list of tools that are included in the specified toolset. */
  tools?: Array<Tool>;
}

export const RetrieveToolsResponse: Schema.Schema<RetrieveToolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      tools: Schema.optional(Schema.Array(Tool)),
    }),
  ).annotate({
    identifier: "RetrieveToolsResponse",
  }) as any as Schema.Schema<RetrieveToolsResponse>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface ListToolsResponse {
  /** A token that can be sent as ListToolsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of tools. */
  tools?: Array<Tool>;
}

export const ListToolsResponse: Schema.Schema<ListToolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      tools: Schema.optional(Schema.Array(Tool)),
    }),
  ).annotate({
    identifier: "ListToolsResponse",
  }) as any as Schema.Schema<ListToolsResponse>;

export interface RetrieveToolSchemaRequest {
  /** Optional. The toolset tool to retrieve the schema for. Only one tool should match the predicate from the toolset. Otherwise, an error will be returned. */
  toolsetTool?: ToolsetTool;
  /** Optional. The name of the tool to retrieve the schema for. Format: projects/{project}/locations/{location}/apps/{app}/tools/{tool} */
  tool?: string;
}

export const RetrieveToolSchemaRequest: Schema.Schema<RetrieveToolSchemaRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      toolsetTool: Schema.optional(ToolsetTool),
      tool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RetrieveToolSchemaRequest",
  }) as any as Schema.Schema<RetrieveToolSchemaRequest>;

export interface ListGuardrailsResponse {
  /** The list of guardrails. */
  guardrails?: Array<Guardrail>;
  /** A token that can be sent as ListGuardrailsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListGuardrailsResponse: Schema.Schema<ListGuardrailsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      guardrails: Schema.optional(Schema.Array(Guardrail)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListGuardrailsResponse",
  }) as any as Schema.Schema<ListGuardrailsResponse>;

export interface ExecuteToolRequest {
  /** Optional. The [ToolCallContext](https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/python#environment for details) to be passed to the Python tool. */
  context?: Record<string, unknown>;
  /** Optional. The variables that are available for the tool execution. */
  variables?: Record<string, unknown>;
  /** Optional. The toolset tool to execute. Only one tool should match the predicate from the toolset. Otherwise, an error will be returned. */
  toolsetTool?: ToolsetTool;
  /** Optional. The name of the tool to execute. Format: projects/{project}/locations/{location}/apps/{app}/tools/{tool} */
  tool?: string;
  /** Optional. The input parameters and values for the tool in JSON object format. */
  args?: Record<string, unknown>;
}

export const ExecuteToolRequest: Schema.Schema<ExecuteToolRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      context: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      toolsetTool: Schema.optional(ToolsetTool),
      tool: Schema.optional(Schema.String),
      args: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "ExecuteToolRequest",
  }) as any as Schema.Schema<ExecuteToolRequest>;

export interface ListExamplesResponse {
  /** A token that can be sent as ListExamplesRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of examples. */
  examples?: Array<Example>;
}

export const ListExamplesResponse: Schema.Schema<ListExamplesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      examples: Schema.optional(Schema.Array(Example)),
    }),
  ).annotate({
    identifier: "ListExamplesResponse",
  }) as any as Schema.Schema<ListExamplesResponse>;

export interface RetrieveToolSchemaResponse {
  /** The name of the tool that the schema is for. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
  /** The schema of the tool input parameters. */
  inputSchema?: Ces_Schema;
  /** The toolset tool that the schema is for. */
  toolsetTool?: ToolsetTool;
  /** The schema of the tool output parameters. */
  outputSchema?: Ces_Schema;
}

export const RetrieveToolSchemaResponse: Schema.Schema<RetrieveToolSchemaResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      inputSchema: Schema.optional(Ces_Schema),
      toolsetTool: Schema.optional(ToolsetTool),
      outputSchema: Schema.optional(Ces_Schema),
    }),
  ).annotate({
    identifier: "RetrieveToolSchemaResponse",
  }) as any as Schema.Schema<RetrieveToolSchemaResponse>;

export interface ListToolsetsResponse {
  /** A token that can be sent as ListToolsetsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of toolsets. */
  toolsets?: Array<Toolset>;
}

export const ListToolsetsResponse: Schema.Schema<ListToolsetsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      toolsets: Schema.optional(Schema.Array(Toolset)),
    }),
  ).annotate({
    identifier: "ListToolsetsResponse",
  }) as any as Schema.Schema<ListToolsetsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page token. */
  pageToken?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsRequest {
  /** Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: App;
}

export const PatchProjectsLocationsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(App).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsRequest>;

export type PatchProjectsLocationsAppsResponse = App;
export const PatchProjectsLocationsAppsResponse = App;

export type PatchProjectsLocationsAppsError = DefaultErrors;

/** Updates the specified app. */
export const patchProjectsLocationsApps: API.OperationMethod<
  PatchProjectsLocationsAppsRequest,
  PatchProjectsLocationsAppsResponse,
  PatchProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsRequest,
  output: PatchProjectsLocationsAppsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsRequest {
  /** Optional. The current etag of the app. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the app, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the app to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsRequest>;

export type DeleteProjectsLocationsAppsResponse = Operation;
export const DeleteProjectsLocationsAppsResponse = Operation;

export type DeleteProjectsLocationsAppsError = DefaultErrors;

/** Deletes the specified app. */
export const deleteProjectsLocationsApps: API.OperationMethod<
  DeleteProjectsLocationsAppsRequest,
  DeleteProjectsLocationsAppsResponse,
  DeleteProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsRequest,
  output: DeleteProjectsLocationsAppsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsRequest {
  /** Required. The resource name of the app to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsRequest>;

export type GetProjectsLocationsAppsResponse = App;
export const GetProjectsLocationsAppsResponse = App;

export type GetProjectsLocationsAppsError = DefaultErrors;

/** Gets details of the specified app. */
export const getProjectsLocationsApps: API.OperationMethod<
  GetProjectsLocationsAppsRequest,
  GetProjectsLocationsAppsResponse,
  GetProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsRequest,
  output: GetProjectsLocationsAppsResponse,
  errors: [],
}));

export interface RetrieveToolSchemaProjectsLocationsAppsRequest {
  /** Required. The resource name of the app which the tool/toolset belongs to. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: RetrieveToolSchemaRequest;
}

export const RetrieveToolSchemaProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RetrieveToolSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:retrieveToolSchema",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RetrieveToolSchemaProjectsLocationsAppsRequest>;

export type RetrieveToolSchemaProjectsLocationsAppsResponse =
  RetrieveToolSchemaResponse;
export const RetrieveToolSchemaProjectsLocationsAppsResponse =
  RetrieveToolSchemaResponse;

export type RetrieveToolSchemaProjectsLocationsAppsError = DefaultErrors;

/** Retrieve the schema of the given tool. The schema is computed on the fly for the given instance of the tool. */
export const retrieveToolSchemaProjectsLocationsApps: API.OperationMethod<
  RetrieveToolSchemaProjectsLocationsAppsRequest,
  RetrieveToolSchemaProjectsLocationsAppsResponse,
  RetrieveToolSchemaProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RetrieveToolSchemaProjectsLocationsAppsRequest,
  output: RetrieveToolSchemaProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ImportAppProjectsLocationsAppsRequest {
  /** Required. The parent resource name with the location of the app to import. */
  parent: string;
  /** Request body */
  body?: ImportAppRequest;
}

export const ImportAppProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps:importApp",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportAppProjectsLocationsAppsRequest>;

export type ImportAppProjectsLocationsAppsResponse = Operation;
export const ImportAppProjectsLocationsAppsResponse = Operation;

export type ImportAppProjectsLocationsAppsError = DefaultErrors;

/** Imports the specified app. */
export const importAppProjectsLocationsApps: API.OperationMethod<
  ImportAppProjectsLocationsAppsRequest,
  ImportAppProjectsLocationsAppsResponse,
  ImportAppProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportAppProjectsLocationsAppsRequest,
  output: ImportAppProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsRequest {
  /** Optional. The next_page_token value returned from a previous list AgentService.ListApps call. */
  pageToken?: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter to be applied when listing the apps. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The resource name of the location to list apps from. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsAppsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsRequest>;

export type ListProjectsLocationsAppsResponse = ListAppsResponse;
export const ListProjectsLocationsAppsResponse = ListAppsResponse;

export type ListProjectsLocationsAppsError = DefaultErrors;

/** Lists apps in the given project and location. */
export const listProjectsLocationsApps: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsRequest,
  ListProjectsLocationsAppsResponse,
  ListProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsRequest,
  output: ListProjectsLocationsAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsRequest {
  /** Required. The resource name of the location to create an app in. */
  parent: string;
  /** Optional. The ID to use for the app, which will become the final component of the app's resource name. If not provided, a unique ID will be automatically assigned for the app. */
  appId?: string;
  /** Request body */
  body?: App;
}

export const CreateProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  appId: Schema.optional(Schema.String).pipe(T.HttpQuery("appId")),
  body: Schema.optional(App).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsRequest>;

export type CreateProjectsLocationsAppsResponse = Operation;
export const CreateProjectsLocationsAppsResponse = Operation;

export type CreateProjectsLocationsAppsError = DefaultErrors;

/** Creates a new app in the given project and location. */
export const createProjectsLocationsApps: API.OperationMethod<
  CreateProjectsLocationsAppsRequest,
  CreateProjectsLocationsAppsResponse,
  CreateProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsRequest,
  output: CreateProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ExecuteToolProjectsLocationsAppsRequest {
  /** Required. The resource name of the app which the tool/toolset belongs to. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: ExecuteToolRequest;
}

export const ExecuteToolProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExecuteToolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:executeTool",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExecuteToolProjectsLocationsAppsRequest>;

export type ExecuteToolProjectsLocationsAppsResponse = ExecuteToolResponse;
export const ExecuteToolProjectsLocationsAppsResponse = ExecuteToolResponse;

export type ExecuteToolProjectsLocationsAppsError = DefaultErrors;

/** Executes the given tool with the given arguments. */
export const executeToolProjectsLocationsApps: API.OperationMethod<
  ExecuteToolProjectsLocationsAppsRequest,
  ExecuteToolProjectsLocationsAppsResponse,
  ExecuteToolProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExecuteToolProjectsLocationsAppsRequest,
  output: ExecuteToolProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ExportAppProjectsLocationsAppsRequest {
  /** Required. The resource name of the app to export. */
  name: string;
  /** Request body */
  body?: ExportAppRequest;
}

export const ExportAppProjectsLocationsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:exportApp",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExportAppProjectsLocationsAppsRequest>;

export type ExportAppProjectsLocationsAppsResponse = Operation;
export const ExportAppProjectsLocationsAppsResponse = Operation;

export type ExportAppProjectsLocationsAppsError = DefaultErrors;

/** Exports the specified app. */
export const exportAppProjectsLocationsApps: API.OperationMethod<
  ExportAppProjectsLocationsAppsRequest,
  ExportAppProjectsLocationsAppsResponse,
  ExportAppProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportAppProjectsLocationsAppsRequest,
  output: ExportAppProjectsLocationsAppsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsDeploymentsRequest {
  /** Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Deployment;
}

export const PatchProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments/{deploymentsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsDeploymentsRequest>;

export type PatchProjectsLocationsAppsDeploymentsResponse = Deployment;
export const PatchProjectsLocationsAppsDeploymentsResponse = Deployment;

export type PatchProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Updates the specified deployment. */
export const patchProjectsLocationsAppsDeployments: API.OperationMethod<
  PatchProjectsLocationsAppsDeploymentsRequest,
  PatchProjectsLocationsAppsDeploymentsResponse,
  PatchProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsDeploymentsRequest,
  output: PatchProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsDeploymentsRequest {
  /** Optional. The etag of the deployment. If an etag is provided and does not match the current etag of the deployment, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The name of the deployment to delete. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name: string;
}

export const DeleteProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsDeploymentsRequest>;

export type DeleteProjectsLocationsAppsDeploymentsResponse = Empty;
export const DeleteProjectsLocationsAppsDeploymentsResponse = Empty;

export type DeleteProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Deletes the specified deployment. */
export const deleteProjectsLocationsAppsDeployments: API.OperationMethod<
  DeleteProjectsLocationsAppsDeploymentsRequest,
  DeleteProjectsLocationsAppsDeploymentsResponse,
  DeleteProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsDeploymentsRequest,
  output: DeleteProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsDeploymentsRequest {
  /** Required. The parent app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Optional. The ID to use for the deployment, which will become the final component of the deployment's resource name. If not provided, a unique ID will be automatically assigned for the deployment. */
  deploymentId?: string;
  /** Request body */
  body?: Deployment;
}

export const CreateProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  deploymentId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("deploymentId"),
  ),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsDeploymentsRequest>;

export type CreateProjectsLocationsAppsDeploymentsResponse = Deployment;
export const CreateProjectsLocationsAppsDeploymentsResponse = Deployment;

export type CreateProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Creates a new deployment in the given app. */
export const createProjectsLocationsAppsDeployments: API.OperationMethod<
  CreateProjectsLocationsAppsDeploymentsRequest,
  CreateProjectsLocationsAppsDeploymentsResponse,
  CreateProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsDeploymentsRequest,
  output: CreateProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsDeploymentsRequest {
  /** Optional. The maximum number of deployments to return. The service may return fewer than this value. If unspecified, at most 50 deployments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDeployments` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The parent app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
}

export const ListProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsDeploymentsRequest>;

export type ListProjectsLocationsAppsDeploymentsResponse =
  ListDeploymentsResponse;
export const ListProjectsLocationsAppsDeploymentsResponse =
  ListDeploymentsResponse;

export type ListProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Lists deployments in the given app. */
export const listProjectsLocationsAppsDeployments: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsDeploymentsRequest,
  ListProjectsLocationsAppsDeploymentsResponse,
  ListProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsDeploymentsRequest,
  output: ListProjectsLocationsAppsDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsDeploymentsRequest {
  /** Required. The name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name: string;
}

export const GetProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsDeploymentsRequest>;

export type GetProjectsLocationsAppsDeploymentsResponse = Deployment;
export const GetProjectsLocationsAppsDeploymentsResponse = Deployment;

export type GetProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Gets details of the specified deployment. */
export const getProjectsLocationsAppsDeployments: API.OperationMethod<
  GetProjectsLocationsAppsDeploymentsRequest,
  GetProjectsLocationsAppsDeploymentsResponse,
  GetProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsDeploymentsRequest,
  output: GetProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsExamplesRequest {
  /** Required. The resource name of the example to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples/{examplesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsExamplesRequest>;

export type GetProjectsLocationsAppsExamplesResponse = Example;
export const GetProjectsLocationsAppsExamplesResponse = Example;

export type GetProjectsLocationsAppsExamplesError = DefaultErrors;

/** Gets details of the specified example. */
export const getProjectsLocationsAppsExamples: API.OperationMethod<
  GetProjectsLocationsAppsExamplesRequest,
  GetProjectsLocationsAppsExamplesResponse,
  GetProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsExamplesRequest,
  output: GetProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsExamplesRequest {
  /** Required. The resource name of the app to create an example in. */
  parent: string;
  /** Optional. The ID to use for the example, which will become the final component of the example's resource name. If not provided, a unique ID will be automatically assigned for the example. */
  exampleId?: string;
  /** Request body */
  body?: Example;
}

export const CreateProjectsLocationsAppsExamplesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  exampleId: Schema.optional(Schema.String).pipe(T.HttpQuery("exampleId")),
  body: Schema.optional(Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsExamplesRequest>;

export type CreateProjectsLocationsAppsExamplesResponse = Example;
export const CreateProjectsLocationsAppsExamplesResponse = Example;

export type CreateProjectsLocationsAppsExamplesError = DefaultErrors;

/** Creates a new example in the given app. */
export const createProjectsLocationsAppsExamples: API.OperationMethod<
  CreateProjectsLocationsAppsExamplesRequest,
  CreateProjectsLocationsAppsExamplesResponse,
  CreateProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsExamplesRequest,
  output: CreateProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsExamplesRequest {
  /** Required. The resource name of the app to list examples from. */
  parent: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter to be applied when listing the examples. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListExamples call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsExamplesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsExamplesRequest>;

export type ListProjectsLocationsAppsExamplesResponse = ListExamplesResponse;
export const ListProjectsLocationsAppsExamplesResponse = ListExamplesResponse;

export type ListProjectsLocationsAppsExamplesError = DefaultErrors;

/** Lists examples in the given app. */
export const listProjectsLocationsAppsExamples: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsExamplesRequest,
  ListProjectsLocationsAppsExamplesResponse,
  ListProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsExamplesRequest,
  output: ListProjectsLocationsAppsExamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsAppsExamplesRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}` */
  name: string;
  /** Request body */
  body?: Example;
}

export const PatchProjectsLocationsAppsExamplesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples/{examplesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsExamplesRequest>;

export type PatchProjectsLocationsAppsExamplesResponse = Example;
export const PatchProjectsLocationsAppsExamplesResponse = Example;

export type PatchProjectsLocationsAppsExamplesError = DefaultErrors;

/** Updates the specified example. */
export const patchProjectsLocationsAppsExamples: API.OperationMethod<
  PatchProjectsLocationsAppsExamplesRequest,
  PatchProjectsLocationsAppsExamplesResponse,
  PatchProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsExamplesRequest,
  output: PatchProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsExamplesRequest {
  /** Optional. The current etag of the example. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the example, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the example to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsExamplesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples/{examplesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsExamplesRequest>;

export type DeleteProjectsLocationsAppsExamplesResponse = Empty;
export const DeleteProjectsLocationsAppsExamplesResponse = Empty;

export type DeleteProjectsLocationsAppsExamplesError = DefaultErrors;

/** Deletes the specified example. */
export const deleteProjectsLocationsAppsExamples: API.OperationMethod<
  DeleteProjectsLocationsAppsExamplesRequest,
  DeleteProjectsLocationsAppsExamplesResponse,
  DeleteProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsExamplesRequest,
  output: DeleteProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsToolsetsRequest {
  /** Required. The resource name of the toolset to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsToolsetsRequest>;

export type GetProjectsLocationsAppsToolsetsResponse = Toolset;
export const GetProjectsLocationsAppsToolsetsResponse = Toolset;

export type GetProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Gets details of the specified toolset. */
export const getProjectsLocationsAppsToolsets: API.OperationMethod<
  GetProjectsLocationsAppsToolsetsRequest,
  GetProjectsLocationsAppsToolsetsResponse,
  GetProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsToolsetsRequest,
  output: GetProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsToolsetsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  name: string;
  /** Request body */
  body?: Toolset;
}

export const PatchProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Toolset).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsToolsetsRequest>;

export type PatchProjectsLocationsAppsToolsetsResponse = Toolset;
export const PatchProjectsLocationsAppsToolsetsResponse = Toolset;

export type PatchProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Updates the specified toolset. */
export const patchProjectsLocationsAppsToolsets: API.OperationMethod<
  PatchProjectsLocationsAppsToolsetsRequest,
  PatchProjectsLocationsAppsToolsetsResponse,
  PatchProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsToolsetsRequest,
  output: PatchProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface RetrieveToolsProjectsLocationsAppsToolsetsRequest {
  /** Required. The name of the toolset to retrieve the tools for. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  toolset: string;
  /** Request body */
  body?: RetrieveToolsRequest;
}

export const RetrieveToolsProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  toolset: Schema.String.pipe(T.HttpPath("toolset")),
  body: Schema.optional(RetrieveToolsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}:retrieveTools",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RetrieveToolsProjectsLocationsAppsToolsetsRequest>;

export type RetrieveToolsProjectsLocationsAppsToolsetsResponse =
  RetrieveToolsResponse;
export const RetrieveToolsProjectsLocationsAppsToolsetsResponse =
  RetrieveToolsResponse;

export type RetrieveToolsProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Retrieve the list of tools included in the specified toolset. */
export const retrieveToolsProjectsLocationsAppsToolsets: API.OperationMethod<
  RetrieveToolsProjectsLocationsAppsToolsetsRequest,
  RetrieveToolsProjectsLocationsAppsToolsetsResponse,
  RetrieveToolsProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RetrieveToolsProjectsLocationsAppsToolsetsRequest,
  output: RetrieveToolsProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsToolsetsRequest {
  /** Required. The resource name of the toolset to delete. */
  name: string;
  /** Optional. The current etag of the toolset. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the toolset, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. Indicates whether to forcefully delete the toolset, even if it is still referenced by app/agents. * If `force = false`, the deletion fails if any agents still reference the toolset. * If `force = true`, all existing references from agents will be removed and the toolset will be deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsToolsetsRequest>;

export type DeleteProjectsLocationsAppsToolsetsResponse = Empty;
export const DeleteProjectsLocationsAppsToolsetsResponse = Empty;

export type DeleteProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Deletes the specified toolset. */
export const deleteProjectsLocationsAppsToolsets: API.OperationMethod<
  DeleteProjectsLocationsAppsToolsetsRequest,
  DeleteProjectsLocationsAppsToolsetsResponse,
  DeleteProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsToolsetsRequest,
  output: DeleteProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsToolsetsRequest {
  /** Required. The resource name of the app to create a toolset in. */
  parent: string;
  /** Optional. The ID to use for the toolset, which will become the final component of the toolset's resource name. If not provided, a unique ID will be automatically assigned for the toolset. */
  toolsetId?: string;
  /** Request body */
  body?: Toolset;
}

export const CreateProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  toolsetId: Schema.optional(Schema.String).pipe(T.HttpQuery("toolsetId")),
  body: Schema.optional(Toolset).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsToolsetsRequest>;

export type CreateProjectsLocationsAppsToolsetsResponse = Toolset;
export const CreateProjectsLocationsAppsToolsetsResponse = Toolset;

export type CreateProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Creates a new toolset in the given app. */
export const createProjectsLocationsAppsToolsets: API.OperationMethod<
  CreateProjectsLocationsAppsToolsetsRequest,
  CreateProjectsLocationsAppsToolsetsResponse,
  CreateProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsToolsetsRequest,
  output: CreateProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsToolsetsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListToolsets call. */
  pageToken?: string;
  /** Optional. Filter to be applied when listing the toolsets. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The resource name of the app to list toolsets from. */
  parent: string;
}

export const ListProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsToolsetsRequest>;

export type ListProjectsLocationsAppsToolsetsResponse = ListToolsetsResponse;
export const ListProjectsLocationsAppsToolsetsResponse = ListToolsetsResponse;

export type ListProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Lists toolsets in the given app. */
export const listProjectsLocationsAppsToolsets: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsToolsetsRequest,
  ListProjectsLocationsAppsToolsetsResponse,
  ListProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsToolsetsRequest,
  output: ListProjectsLocationsAppsToolsetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAppsToolsRequest {
  /** Optional. Indicates whether to forcefully delete the tool, even if it is still referenced by agents/examples. * If `force = false`, the deletion will fail if any agents still reference the tool. * If `force = true`, all existing references from agents will be removed and the tool will be deleted. */
  force?: boolean;
  /** Required. The resource name of the tool to delete. */
  name: string;
  /** Optional. The current etag of the tool. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the tool, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsAppsToolsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools/{toolsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsToolsRequest>;

export type DeleteProjectsLocationsAppsToolsResponse = Empty;
export const DeleteProjectsLocationsAppsToolsResponse = Empty;

export type DeleteProjectsLocationsAppsToolsError = DefaultErrors;

/** Deletes the specified tool. */
export const deleteProjectsLocationsAppsTools: API.OperationMethod<
  DeleteProjectsLocationsAppsToolsRequest,
  DeleteProjectsLocationsAppsToolsResponse,
  DeleteProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsToolsRequest,
  output: DeleteProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsToolsRequest {
  /** Identifier. The resource name of the tool. Format: * `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` for standalone tools. * `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}/tools/{tool}` for tools retrieved from a toolset. These tools are dynamic and output-only; they cannot be referenced directly where a tool is expected. */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Tool;
}

export const PatchProjectsLocationsAppsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools/{toolsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsToolsRequest>;

export type PatchProjectsLocationsAppsToolsResponse = Tool;
export const PatchProjectsLocationsAppsToolsResponse = Tool;

export type PatchProjectsLocationsAppsToolsError = DefaultErrors;

/** Updates the specified tool. */
export const patchProjectsLocationsAppsTools: API.OperationMethod<
  PatchProjectsLocationsAppsToolsRequest,
  PatchProjectsLocationsAppsToolsResponse,
  PatchProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsToolsRequest,
  output: PatchProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsToolsRequest {
  /** Required. The resource name of the tool to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools/{toolsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsToolsRequest>;

export type GetProjectsLocationsAppsToolsResponse = Tool;
export const GetProjectsLocationsAppsToolsResponse = Tool;

export type GetProjectsLocationsAppsToolsError = DefaultErrors;

/** Gets details of the specified tool. */
export const getProjectsLocationsAppsTools: API.OperationMethod<
  GetProjectsLocationsAppsToolsRequest,
  GetProjectsLocationsAppsToolsResponse,
  GetProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsToolsRequest,
  output: GetProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsToolsRequest {
  /** Required. The resource name of the app to create a tool in. */
  parent: string;
  /** Optional. The ID to use for the tool, which will become the final component of the tool's resource name. If not provided, a unique ID will be automatically assigned for the tool. */
  toolId?: string;
  /** Request body */
  body?: Tool;
}

export const CreateProjectsLocationsAppsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  toolId: Schema.optional(Schema.String).pipe(T.HttpQuery("toolId")),
  body: Schema.optional(Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsToolsRequest>;

export type CreateProjectsLocationsAppsToolsResponse = Tool;
export const CreateProjectsLocationsAppsToolsResponse = Tool;

export type CreateProjectsLocationsAppsToolsError = DefaultErrors;

/** Creates a new tool in the given app. */
export const createProjectsLocationsAppsTools: API.OperationMethod<
  CreateProjectsLocationsAppsToolsRequest,
  CreateProjectsLocationsAppsToolsResponse,
  CreateProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsToolsRequest,
  output: CreateProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsToolsRequest {
  /** Optional. The next_page_token value returned from a previous list AgentService.ListTools call. */
  pageToken?: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter to be applied when listing the tools. Use "include_system_tools=true" to include system tools in the response. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. The resource name of the app to list tools from. */
  parent: string;
}

export const ListProjectsLocationsAppsToolsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsToolsRequest>;

export type ListProjectsLocationsAppsToolsResponse = ListToolsResponse;
export const ListProjectsLocationsAppsToolsResponse = ListToolsResponse;

export type ListProjectsLocationsAppsToolsError = DefaultErrors;

/** Lists tools in the given app. */
export const listProjectsLocationsAppsTools: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsToolsRequest,
  ListProjectsLocationsAppsToolsResponse,
  ListProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsToolsRequest,
  output: ListProjectsLocationsAppsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteProjectsLocationsAppsConversationsRequest {
  /** Required. The resource name of the app to delete conversations from. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: BatchDeleteConversationsRequest;
}

export const BatchDeleteProjectsLocationsAppsConversationsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchDeleteConversationsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations:batchDelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAppsConversationsRequest>;

export type BatchDeleteProjectsLocationsAppsConversationsResponse = Operation;
export const BatchDeleteProjectsLocationsAppsConversationsResponse = Operation;

export type BatchDeleteProjectsLocationsAppsConversationsError = DefaultErrors;

/** Batch deletes the specified conversations. */
export const batchDeleteProjectsLocationsAppsConversations: API.OperationMethod<
  BatchDeleteProjectsLocationsAppsConversationsRequest,
  BatchDeleteProjectsLocationsAppsConversationsResponse,
  BatchDeleteProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAppsConversationsRequest,
  output: BatchDeleteProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsConversationsRequest {
  /** Optional. Indicate the sources of the conversations. If not set, all available sources will be applied by default. */
  sources?:
    | "SOURCE_UNSPECIFIED"
    | "LIVE"
    | "SIMULATOR"
    | "EVAL"
    | (string & {})[];
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Indicate the source of the conversation. If not set, Source.Live will be applied by default. Will be deprecated in favor of `sources` field. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
  /** Optional. The next_page_token value returned from a previous list AgentService.ListConversations call. */
  pageToken?: string;
  /** Required. The resource name of the app to list conversations from. */
  parent: string;
  /** Optional. Filter to be applied when listing the conversations. See https://google.aip.dev/160 for more details. */
  filter?: string;
}

export const ListProjectsLocationsAppsConversationsRequest = Schema.Struct({
  sources: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("sources"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsConversationsRequest>;

export type ListProjectsLocationsAppsConversationsResponse =
  ListConversationsResponse;
export const ListProjectsLocationsAppsConversationsResponse =
  ListConversationsResponse;

export type ListProjectsLocationsAppsConversationsError = DefaultErrors;

/** Lists conversations in the given app. */
export const listProjectsLocationsAppsConversations: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsConversationsRequest,
  ListProjectsLocationsAppsConversationsResponse,
  ListProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsConversationsRequest,
  output: ListProjectsLocationsAppsConversationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsConversationsRequest {
  /** Required. The resource name of the conversation to retrieve. */
  name: string;
  /** Optional. Indicate the source of the conversation. If not set, all source will be searched. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
}

export const GetProjectsLocationsAppsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations/{conversationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsConversationsRequest>;

export type GetProjectsLocationsAppsConversationsResponse = Conversation;
export const GetProjectsLocationsAppsConversationsResponse = Conversation;

export type GetProjectsLocationsAppsConversationsError = DefaultErrors;

/** Gets details of the specified conversation. */
export const getProjectsLocationsAppsConversations: API.OperationMethod<
  GetProjectsLocationsAppsConversationsRequest,
  GetProjectsLocationsAppsConversationsResponse,
  GetProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsConversationsRequest,
  output: GetProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsConversationsRequest {
  /** Optional. Indicate the source of the conversation. If not set, Source.Live will be applied by default. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
  /** Required. The resource name of the conversation to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsConversationsRequest = Schema.Struct({
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations/{conversationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsConversationsRequest>;

export type DeleteProjectsLocationsAppsConversationsResponse = Empty;
export const DeleteProjectsLocationsAppsConversationsResponse = Empty;

export type DeleteProjectsLocationsAppsConversationsError = DefaultErrors;

/** Deletes the specified conversation. */
export const deleteProjectsLocationsAppsConversations: API.OperationMethod<
  DeleteProjectsLocationsAppsConversationsRequest,
  DeleteProjectsLocationsAppsConversationsResponse,
  DeleteProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsConversationsRequest,
  output: DeleteProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsAgentsRequest {
  /** Required. The resource name of the agent to delete. */
  name: string;
  /** Optional. Indicates whether to forcefully delete the agent, even if it is still referenced by other app/agents/examples. * If `force = false`, the deletion fails if other agents/examples reference it. * If `force = true`, delete the agent and remove it from all referencing apps/agents/examples. */
  force?: boolean;
  /** Optional. The current etag of the agent. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the agent, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsAppsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents/{agentsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsAgentsRequest>;

export type DeleteProjectsLocationsAppsAgentsResponse = Empty;
export const DeleteProjectsLocationsAppsAgentsResponse = Empty;

export type DeleteProjectsLocationsAppsAgentsError = DefaultErrors;

/** Deletes the specified agent. */
export const deleteProjectsLocationsAppsAgents: API.OperationMethod<
  DeleteProjectsLocationsAppsAgentsRequest,
  DeleteProjectsLocationsAppsAgentsResponse,
  DeleteProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsAgentsRequest,
  output: DeleteProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsAgentsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Filter to be applied when listing the agents. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The resource name of the app to list agents from. */
  parent: string;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListAgents call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsAgentsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsAgentsRequest>;

export type ListProjectsLocationsAppsAgentsResponse = ListAgentsResponse;
export const ListProjectsLocationsAppsAgentsResponse = ListAgentsResponse;

export type ListProjectsLocationsAppsAgentsError = DefaultErrors;

/** Lists agents in the given app. */
export const listProjectsLocationsAppsAgents: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsAgentsRequest,
  ListProjectsLocationsAppsAgentsResponse,
  ListProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsAgentsRequest,
  output: ListProjectsLocationsAppsAgentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsAgentsRequest {
  /** Optional. The ID to use for the agent, which will become the final component of the agent's resource name. If not provided, a unique ID will be automatically assigned for the agent. */
  agentId?: string;
  /** Required. The resource name of the app to create an agent in. */
  parent: string;
  /** Request body */
  body?: Agent;
}

export const CreateProjectsLocationsAppsAgentsRequest = Schema.Struct({
  agentId: Schema.optional(Schema.String).pipe(T.HttpQuery("agentId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsAgentsRequest>;

export type CreateProjectsLocationsAppsAgentsResponse = Agent;
export const CreateProjectsLocationsAppsAgentsResponse = Agent;

export type CreateProjectsLocationsAppsAgentsError = DefaultErrors;

/** Creates a new agent in the given app. */
export const createProjectsLocationsAppsAgents: API.OperationMethod<
  CreateProjectsLocationsAppsAgentsRequest,
  CreateProjectsLocationsAppsAgentsResponse,
  CreateProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsAgentsRequest,
  output: CreateProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsAgentsRequest {
  /** Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Agent;
}

export const PatchProjectsLocationsAppsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents/{agentsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsAgentsRequest>;

export type PatchProjectsLocationsAppsAgentsResponse = Agent;
export const PatchProjectsLocationsAppsAgentsResponse = Agent;

export type PatchProjectsLocationsAppsAgentsError = DefaultErrors;

/** Updates the specified agent. */
export const patchProjectsLocationsAppsAgents: API.OperationMethod<
  PatchProjectsLocationsAppsAgentsRequest,
  PatchProjectsLocationsAppsAgentsResponse,
  PatchProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsAgentsRequest,
  output: PatchProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsAgentsRequest {
  /** Required. The resource name of the agent to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents/{agentsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsAgentsRequest>;

export type GetProjectsLocationsAppsAgentsResponse = Agent;
export const GetProjectsLocationsAppsAgentsResponse = Agent;

export type GetProjectsLocationsAppsAgentsError = DefaultErrors;

/** Gets details of the specified agent. */
export const getProjectsLocationsAppsAgents: API.OperationMethod<
  GetProjectsLocationsAppsAgentsRequest,
  GetProjectsLocationsAppsAgentsResponse,
  GetProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsAgentsRequest,
  output: GetProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsVersionsRequest {
  /** Optional. Filter to be applied when listing the app versions. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The resource name of the app to list app versions from. */
  parent: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListAppVersions call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsVersionsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsVersionsRequest>;

export type ListProjectsLocationsAppsVersionsResponse = ListAppVersionsResponse;
export const ListProjectsLocationsAppsVersionsResponse =
  ListAppVersionsResponse;

export type ListProjectsLocationsAppsVersionsError = DefaultErrors;

/** Lists all app versions in the given app. */
export const listProjectsLocationsAppsVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsVersionsRequest,
  ListProjectsLocationsAppsVersionsResponse,
  ListProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsVersionsRequest,
  output: ListProjectsLocationsAppsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsVersionsRequest {
  /** Required. The resource name of the app version to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions/{versionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsVersionsRequest>;

export type GetProjectsLocationsAppsVersionsResponse = AppVersion;
export const GetProjectsLocationsAppsVersionsResponse = AppVersion;

export type GetProjectsLocationsAppsVersionsError = DefaultErrors;

/** Gets details of the specified app version. */
export const getProjectsLocationsAppsVersions: API.OperationMethod<
  GetProjectsLocationsAppsVersionsRequest,
  GetProjectsLocationsAppsVersionsResponse,
  GetProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsVersionsRequest,
  output: GetProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsVersionsRequest {
  /** Required. The resource name of the app to create an app version in. */
  parent: string;
  /** Optional. The ID to use for the app version, which will become the final component of the app version's resource name. If not provided, a unique ID will be automatically assigned for the app version. */
  appVersionId?: string;
  /** Request body */
  body?: AppVersion;
}

export const CreateProjectsLocationsAppsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  appVersionId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("appVersionId"),
  ),
  body: Schema.optional(AppVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsVersionsRequest>;

export type CreateProjectsLocationsAppsVersionsResponse = AppVersion;
export const CreateProjectsLocationsAppsVersionsResponse = AppVersion;

export type CreateProjectsLocationsAppsVersionsError = DefaultErrors;

/** Creates a new app version in the given app. */
export const createProjectsLocationsAppsVersions: API.OperationMethod<
  CreateProjectsLocationsAppsVersionsRequest,
  CreateProjectsLocationsAppsVersionsResponse,
  CreateProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsVersionsRequest,
  output: CreateProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAppsVersionsRequest {
  /** Required. The resource name of the app version to restore. */
  name: string;
  /** Request body */
  body?: RestoreAppVersionRequest;
}

export const RestoreProjectsLocationsAppsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreAppVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions/{versionsId}:restore",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAppsVersionsRequest>;

export type RestoreProjectsLocationsAppsVersionsResponse = Operation;
export const RestoreProjectsLocationsAppsVersionsResponse = Operation;

export type RestoreProjectsLocationsAppsVersionsError = DefaultErrors;

/** Restores the specified app version. This will create a new app version from the current draft app and overwrite the current draft with the specified app version. */
export const restoreProjectsLocationsAppsVersions: API.OperationMethod<
  RestoreProjectsLocationsAppsVersionsRequest,
  RestoreProjectsLocationsAppsVersionsResponse,
  RestoreProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreProjectsLocationsAppsVersionsRequest,
  output: RestoreProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsVersionsRequest {
  /** Optional. The current etag of the app version. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the app version, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the app version to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsVersionsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions/{versionsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsVersionsRequest>;

export type DeleteProjectsLocationsAppsVersionsResponse = Empty;
export const DeleteProjectsLocationsAppsVersionsResponse = Empty;

export type DeleteProjectsLocationsAppsVersionsError = DefaultErrors;

/** Deletes the specified app version. */
export const deleteProjectsLocationsAppsVersions: API.OperationMethod<
  DeleteProjectsLocationsAppsVersionsRequest,
  DeleteProjectsLocationsAppsVersionsResponse,
  DeleteProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsVersionsRequest,
  output: DeleteProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsChangelogsRequest {
  /** Required. The resource name of the changelog to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsChangelogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/changelogs/{changelogsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsChangelogsRequest>;

export type GetProjectsLocationsAppsChangelogsResponse = Changelog;
export const GetProjectsLocationsAppsChangelogsResponse = Changelog;

export type GetProjectsLocationsAppsChangelogsError = DefaultErrors;

/** Gets the specified changelog. */
export const getProjectsLocationsAppsChangelogs: API.OperationMethod<
  GetProjectsLocationsAppsChangelogsRequest,
  GetProjectsLocationsAppsChangelogsResponse,
  GetProjectsLocationsAppsChangelogsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsChangelogsRequest,
  output: GetProjectsLocationsAppsChangelogsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsChangelogsRequest {
  /** Optional. The next_page_token value returned from a previous list AgentService.ListChangelogs call. */
  pageToken?: string;
  /** Optional. Filter to be applied when listing the changelogs. See https://google.aip.dev/160 for more details. The filter string can be used to filter by `action`, `resource_type`, `resource_name`, `author`, and `create_time`. The `:` comparator can be used for case-insensitive partial matching on string fields, while `=` performs an exact case-sensitive match. Examples: * `action:update` (case-insensitive partial match) * `action="Create"` (case-sensitive exact match) * `resource_type:agent` * `resource_name:my-agent` * `author:me@example.com` * `create_time > "2025-01-01T00:00:00Z"` * `create_time <= "2025-01-01T00:00:00Z" AND resource_type:tool` */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list changelogs from. */
  parent: string;
}

export const ListProjectsLocationsAppsChangelogsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/changelogs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsChangelogsRequest>;

export type ListProjectsLocationsAppsChangelogsResponse =
  ListChangelogsResponse;
export const ListProjectsLocationsAppsChangelogsResponse =
  ListChangelogsResponse;

export type ListProjectsLocationsAppsChangelogsError = DefaultErrors;

/** Lists the changelogs of the specified app. */
export const listProjectsLocationsAppsChangelogs: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsChangelogsRequest,
  ListProjectsLocationsAppsChangelogsResponse,
  ListProjectsLocationsAppsChangelogsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsChangelogsRequest,
  output: ListProjectsLocationsAppsChangelogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GenerateChatTokenProjectsLocationsAppsSessionsRequest {
  /** Required. The session name to generate the chat token for. Format: projects/{project}/locations/{location}/apps/{app}/sessions/{session} */
  name: string;
  /** Request body */
  body?: GenerateChatTokenRequest;
}

export const GenerateChatTokenProjectsLocationsAppsSessionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GenerateChatTokenRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/sessions/{sessionsId}:generateChatToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateChatTokenProjectsLocationsAppsSessionsRequest>;

export type GenerateChatTokenProjectsLocationsAppsSessionsResponse =
  GenerateChatTokenResponse;
export const GenerateChatTokenProjectsLocationsAppsSessionsResponse =
  GenerateChatTokenResponse;

export type GenerateChatTokenProjectsLocationsAppsSessionsError = DefaultErrors;

/** Generates a session scoped token for chat widget to authenticate with Session APIs. */
export const generateChatTokenProjectsLocationsAppsSessions: API.OperationMethod<
  GenerateChatTokenProjectsLocationsAppsSessionsRequest,
  GenerateChatTokenProjectsLocationsAppsSessionsResponse,
  GenerateChatTokenProjectsLocationsAppsSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateChatTokenProjectsLocationsAppsSessionsRequest,
  output: GenerateChatTokenProjectsLocationsAppsSessionsResponse,
  errors: [],
}));

export interface RunSessionProjectsLocationsAppsSessionsRequest {
  /** Required. The unique identifier of the session. Format: `projects/{project}/locations/{location}/apps/{app}/sessions/{session}` */
  session: string;
  /** Request body */
  body?: RunSessionRequest;
}

export const RunSessionProjectsLocationsAppsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(RunSessionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/sessions/{sessionsId}:runSession",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RunSessionProjectsLocationsAppsSessionsRequest>;

export type RunSessionProjectsLocationsAppsSessionsResponse =
  RunSessionResponse;
export const RunSessionProjectsLocationsAppsSessionsResponse =
  RunSessionResponse;

export type RunSessionProjectsLocationsAppsSessionsError = DefaultErrors;

/** Initiates a single turn interaction with the CES agent within a session. */
export const runSessionProjectsLocationsAppsSessions: API.OperationMethod<
  RunSessionProjectsLocationsAppsSessionsRequest,
  RunSessionProjectsLocationsAppsSessionsResponse,
  RunSessionProjectsLocationsAppsSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunSessionProjectsLocationsAppsSessionsRequest,
  output: RunSessionProjectsLocationsAppsSessionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsGuardrailsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  name: string;
  /** Request body */
  body?: Guardrail;
}

export const PatchProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Guardrail).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails/{guardrailsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsGuardrailsRequest>;

export type PatchProjectsLocationsAppsGuardrailsResponse = Guardrail;
export const PatchProjectsLocationsAppsGuardrailsResponse = Guardrail;

export type PatchProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Updates the specified guardrail. */
export const patchProjectsLocationsAppsGuardrails: API.OperationMethod<
  PatchProjectsLocationsAppsGuardrailsRequest,
  PatchProjectsLocationsAppsGuardrailsResponse,
  PatchProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsGuardrailsRequest,
  output: PatchProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsGuardrailsRequest {
  /** Optional. Indicates whether to forcefully delete the guardrail, even if it is still referenced by app/agents. * If `force = false`, the deletion fails if any apps/agents still reference the guardrail. * If `force = true`, all existing references from apps/agents will be removed and the guardrail will be deleted. */
  force?: boolean;
  /** Optional. The current etag of the guardrail. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the guardrail, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the guardrail to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails/{guardrailsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsGuardrailsRequest>;

export type DeleteProjectsLocationsAppsGuardrailsResponse = Empty;
export const DeleteProjectsLocationsAppsGuardrailsResponse = Empty;

export type DeleteProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Deletes the specified guardrail. */
export const deleteProjectsLocationsAppsGuardrails: API.OperationMethod<
  DeleteProjectsLocationsAppsGuardrailsRequest,
  DeleteProjectsLocationsAppsGuardrailsResponse,
  DeleteProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsGuardrailsRequest,
  output: DeleteProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsGuardrailsRequest {
  /** Optional. Filter to be applied when listing the guardrails. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListGuardrails call. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. The resource name of the app to list guardrails from. */
  parent: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsGuardrailsRequest>;

export type ListProjectsLocationsAppsGuardrailsResponse =
  ListGuardrailsResponse;
export const ListProjectsLocationsAppsGuardrailsResponse =
  ListGuardrailsResponse;

export type ListProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Lists guardrails in the given app. */
export const listProjectsLocationsAppsGuardrails: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsGuardrailsRequest,
  ListProjectsLocationsAppsGuardrailsResponse,
  ListProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsGuardrailsRequest,
  output: ListProjectsLocationsAppsGuardrailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsGuardrailsRequest {
  /** Required. The resource name of the app to create a guardrail in. */
  parent: string;
  /** Optional. The ID to use for the guardrail, which will become the final component of the guardrail's resource name. If not provided, a unique ID will be automatically assigned for the guardrail. */
  guardrailId?: string;
  /** Request body */
  body?: Guardrail;
}

export const CreateProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  guardrailId: Schema.optional(Schema.String).pipe(T.HttpQuery("guardrailId")),
  body: Schema.optional(Guardrail).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsGuardrailsRequest>;

export type CreateProjectsLocationsAppsGuardrailsResponse = Guardrail;
export const CreateProjectsLocationsAppsGuardrailsResponse = Guardrail;

export type CreateProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Creates a new guardrail in the given app. */
export const createProjectsLocationsAppsGuardrails: API.OperationMethod<
  CreateProjectsLocationsAppsGuardrailsRequest,
  CreateProjectsLocationsAppsGuardrailsResponse,
  CreateProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsGuardrailsRequest,
  output: CreateProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsGuardrailsRequest {
  /** Required. The resource name of the guardrail to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails/{guardrailsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsGuardrailsRequest>;

export type GetProjectsLocationsAppsGuardrailsResponse = Guardrail;
export const GetProjectsLocationsAppsGuardrailsResponse = Guardrail;

export type GetProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Gets details of the specified guardrail. */
export const getProjectsLocationsAppsGuardrails: API.OperationMethod<
  GetProjectsLocationsAppsGuardrailsRequest,
  GetProjectsLocationsAppsGuardrailsResponse,
  GetProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsGuardrailsRequest,
  output: GetProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));
