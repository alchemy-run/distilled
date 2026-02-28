// ==========================================================================
// Service Usage API (serviceusage v1)
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
  name: "serviceusage",
  version: "v1",
  rootUrl: "https://serviceusage.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface BatchingSettingsProto {
  /** The maximum number of elements collected in a batch that could be accepted by server. */
  elementCountLimit?: number;
  /** The behavior to take when the flow control limit is exceeded. */
  flowControlLimitExceededBehavior?: "UNSET_BEHAVIOR" | "THROW_EXCEPTION" | "BLOCK" | "IGNORE" | (string & {});
  /** The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent. */
  elementCountThreshold?: number;
  /** The maximum size of the request that could be accepted by server. */
  requestByteLimit?: number;
  /** The maximum size of data allowed by flow control. */
  flowControlByteLimit?: number;
  /** The duration after which a batch should be sent, starting from the addition of the first message to that batch. */
  delayThreshold?: string;
  /** The maximum number of elements allowed by flow control. */
  flowControlElementLimit?: number;
  /** The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message. */
  requestByteThreshold?: string;
}

export const BatchingSettingsProto: Schema.Schema<BatchingSettingsProto> = Schema.suspend(() => Schema.Struct({
  elementCountLimit: Schema.optional(Schema.Number),
  flowControlLimitExceededBehavior: Schema.optional(Schema.String),
  elementCountThreshold: Schema.optional(Schema.Number),
  requestByteLimit: Schema.optional(Schema.Number),
  flowControlByteLimit: Schema.optional(Schema.Number),
  delayThreshold: Schema.optional(Schema.String),
  flowControlElementLimit: Schema.optional(Schema.Number),
  requestByteThreshold: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchingSettingsProto" }) as any as Schema.Schema<BatchingSettingsProto>;

export interface BatchingDescriptorProto {
  /** A list of the fields in the request message. Two requests will be batched together only if the values of every field specified in `request_discriminator_fields` is equal between the two requests. */
  discriminatorFields?: Array<string>;
  /** The repeated field in the request message to be aggregated by batching. */
  batchedField?: string;
  /** Optional. When present, indicates the field in the response message to be used to demultiplex the response into multiple response messages, in correspondence with the multiple request messages originally batched together. */
  subresponseField?: string;
}

export const BatchingDescriptorProto: Schema.Schema<BatchingDescriptorProto> = Schema.suspend(() => Schema.Struct({
  discriminatorFields: Schema.optional(Schema.Array(Schema.String)),
  batchedField: Schema.optional(Schema.String),
  subresponseField: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchingDescriptorProto" }) as any as Schema.Schema<BatchingDescriptorProto>;

export interface BatchingConfigProto {
  /** The thresholds which trigger a batched request to be sent. */
  thresholds?: BatchingSettingsProto;
  /** The request and response fields used in batching. */
  batchDescriptor?: BatchingDescriptorProto;
}

export const BatchingConfigProto: Schema.Schema<BatchingConfigProto> = Schema.suspend(() => Schema.Struct({
  thresholds: Schema.optional(BatchingSettingsProto),
  batchDescriptor: Schema.optional(BatchingDescriptorProto),
})).annotate({ identifier: "BatchingConfigProto" }) as any as Schema.Schema<BatchingConfigProto>;

export interface ContextRule {
  /** A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension. */
  provided?: Array<string>;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** A list of full type names of requested contexts, only the requested context will be made available to the backend. */
  requested?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client. */
  allowedResponseExtensions?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend. */
  allowedRequestExtensions?: Array<string>;
}

export const ContextRule: Schema.Schema<ContextRule> = Schema.suspend(() => Schema.Struct({
  provided: Schema.optional(Schema.Array(Schema.String)),
  selector: Schema.optional(Schema.String),
  requested: Schema.optional(Schema.Array(Schema.String)),
  allowedResponseExtensions: Schema.optional(Schema.Array(Schema.String)),
  allowedRequestExtensions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContextRule" }) as any as Schema.Schema<ContextRule>;

export interface Context {
  /** A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<ContextRule>;
}

export const Context: Schema.Schema<Context> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(ContextRule)),
})).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

export interface OAuthRequirements {
  /** The list of publicly documented OAuth scopes that are allowed access. An OAuth token containing any of these scopes will be accepted. Example: canonical_scopes: https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.read */
  canonicalScopes?: string;
}

export const OAuthRequirements: Schema.Schema<OAuthRequirements> = Schema.suspend(() => Schema.Struct({
  canonicalScopes: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuthRequirements" }) as any as Schema.Schema<OAuthRequirements>;

export interface LabelDescriptor {
  /** The type of data that can be assigned to the label. */
  valueType?: "STRING" | "BOOL" | "INT64" | (string & {});
  /** A human-readable description for the label. */
  description?: string;
  /** The label key. */
  key?: string;
}

export const LabelDescriptor: Schema.Schema<LabelDescriptor> = Schema.suspend(() => Schema.Struct({
  valueType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelDescriptor" }) as any as Schema.Schema<LabelDescriptor>;

export interface MonitoredResourceDescriptor {
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`. */
  labels?: Array<LabelDescriptor>;
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`. */
  displayName?: string;
  /** Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
  /** Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`. */
  name?: string;
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  launchStage: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoredResourceDescriptor" }) as any as Schema.Schema<MonitoredResourceDescriptor>;

export interface Mixin {
  /** The fully qualified name of the interface which is included. */
  name?: string;
  /** If non-empty specifies a path under which inherited HTTP paths are rooted. */
  root?: string;
}

export const Mixin: Schema.Schema<Mixin> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  root: Schema.optional(Schema.String),
})).annotate({ identifier: "Mixin" }) as any as Schema.Schema<Mixin>;

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`. */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

export interface Option {
  /** The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type. */
  value?: Record<string, unknown>;
  /** The option's name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`. */
  name?: string;
}

export const Option: Schema.Schema<Option> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Option" }) as any as Schema.Schema<Option>;

export interface Method {
  /** If true, the response is streamed. */
  responseStreaming?: boolean;
  /** A URL of the input message type. */
  requestTypeUrl?: string;
  /** Any metadata attached to the method. */
  options?: Array<Option>;
  /** The URL of the output message type. */
  responseTypeUrl?: string;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue. */
  edition?: string;
  /** If true, the request is streamed. */
  requestStreaming?: boolean;
  /** The simple name of this method. */
  name?: string;
  /** The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
}

export const Method: Schema.Schema<Method> = Schema.suspend(() => Schema.Struct({
  responseStreaming: Schema.optional(Schema.Boolean),
  requestTypeUrl: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  responseTypeUrl: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  requestStreaming: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
})).annotate({ identifier: "Method" }) as any as Schema.Schema<Method>;

export interface Api {
  /** Included interfaces. See Mixin. */
  mixins?: Array<Mixin>;
  /** Source context for the protocol buffer service represented by this message. */
  sourceContext?: SourceContext;
  /** Any metadata attached to the interface. */
  options?: Array<Option>;
  /** A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces. */
  version?: string;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The fully qualified name of this interface, including package name followed by the interface's simple name. */
  name?: string;
  /** The source syntax of the service. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The methods of this interface, in unspecified order. */
  methods?: Array<Method>;
}

export const Api: Schema.Schema<Api> = Schema.suspend(() => Schema.Struct({
  mixins: Schema.optional(Schema.Array(Mixin)),
  sourceContext: Schema.optional(SourceContext),
  options: Schema.optional(Schema.Array(Option)),
  version: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  methods: Schema.optional(Schema.Array(Method)),
})).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface MetricRule {
  /** Metrics to update when the selected methods are called, and the associated cost applied to each metric. The key of the map is the metric name, and the values are the amount increased for the metric against which the quota limits are defined. The value must not be negative. */
  metricCosts?: Record<string, string>;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
}

export const MetricRule: Schema.Schema<MetricRule> = Schema.suspend(() => Schema.Struct({
  metricCosts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  selector: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricRule" }) as any as Schema.Schema<MetricRule>;

export interface QuotaLimit {
  /** Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax. */
  unit?: string;
  /** User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration. */
  displayName?: string;
  /** Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`). */
  description?: string;
  /** Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only. */
  maxLimit?: string;
  /** Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported. */
  values?: Record<string, string>;
  /** Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only. */
  freeTier?: string;
  /** Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters. */
  name?: string;
  /** The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config. */
  metric?: string;
  /** Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only. */
  duration?: string;
  /** Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only. */
  defaultLimit?: string;
}

export const QuotaLimit: Schema.Schema<QuotaLimit> = Schema.suspend(() => Schema.Struct({
  unit: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  maxLimit: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  freeTier: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  defaultLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "QuotaLimit" }) as any as Schema.Schema<QuotaLimit>;

export interface Quota {
  /** List of MetricRule definitions, each one mapping a selected method to one or more metrics. */
  metricRules?: Array<MetricRule>;
  /** List of QuotaLimit definitions for the service. */
  limits?: Array<QuotaLimit>;
}

export const Quota: Schema.Schema<Quota> = Schema.suspend(() => Schema.Struct({
  metricRules: Schema.optional(Schema.Array(MetricRule)),
  limits: Schema.optional(Schema.Array(QuotaLimit)),
})).annotate({ identifier: "Quota" }) as any as Schema.Schema<Quota>;

export interface Page {
  /** Subpages of this page. The order of subpages specified here will be honored in the generated docset. */
  subpages?: Array<Page>;
  /** The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`. */
  name?: string;
  /** The Markdown content of the page. You can use ```(== include {path} ==)``` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page. */
  content?: string;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  subpages: Schema.optional(Schema.Array(Page)),
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface DocumentationRule {
  /** Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`. */
  deprecationDescription?: string;
  /** Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element. */
  description?: string;
  /** String of comma or space separated case-sensitive words for which method/field name replacement will be disabled. */
  disableReplacementWords?: string;
  /** The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used. */
  selector?: string;
}

export const DocumentationRule: Schema.Schema<DocumentationRule> = Schema.suspend(() => Schema.Struct({
  deprecationDescription: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  disableReplacementWords: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentationRule" }) as any as Schema.Schema<DocumentationRule>;

export interface Documentation {
  /** The URL to the root of documentation. */
  documentationRootUrl?: string;
  /** Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions. */
  additionalIamInfo?: string;
  /** Declares a single overview page. For example: documentation: summary: ... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary: ... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field. */
  overview?: string;
  /** Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries */
  sectionOverrides?: Array<Page>;
  /** A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<DocumentationRule>;
  /** A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`. */
  summary?: string;
  /** The top level pages for the documentation set. */
  pages?: Array<Page>;
  /** Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to. */
  serviceRootUrl?: string;
}

export const Documentation: Schema.Schema<Documentation> = Schema.suspend(() => Schema.Struct({
  documentationRootUrl: Schema.optional(Schema.String),
  additionalIamInfo: Schema.optional(Schema.String),
  overview: Schema.optional(Schema.String),
  sectionOverrides: Schema.optional(Schema.Array(Page)),
  rules: Schema.optional(Schema.Array(DocumentationRule)),
  summary: Schema.optional(Schema.String),
  pages: Schema.optional(Schema.Array(Page)),
  serviceRootUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Documentation" }) as any as Schema.Schema<Documentation>;

export interface Endpoint {
  /** Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints. */
  aliases?: Array<string>;
  /** The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com". */
  target?: string;
  /** The canonical name of this endpoint. */
  name?: string;
  /** Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed. */
  allowCors?: boolean;
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  aliases: Schema.optional(Schema.Array(Schema.String)),
  target: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  allowCors: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface AuthRequirement {
  /** NOTE: This will be deprecated soon, once AuthProvider.audiences is implemented and accepted in all the runtime components. The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, only JWTs with audience "https://Service_name/API_name" will be accepted. For example, if no audiences are in the setting, LibraryService API will only accept JWTs with the following audience "https://library-example.googleapis.com/google.example.library.v1.LibraryService". Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
  /** id from authentication provider. Example: provider_id: bookstore_auth */
  providerId?: string;
}

export const AuthRequirement: Schema.Schema<AuthRequirement> = Schema.suspend(() => Schema.Struct({
  audiences: Schema.optional(Schema.String),
  providerId: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthRequirement" }) as any as Schema.Schema<AuthRequirement>;

export interface AuthenticationRule {
  /** Requirements for additional authentication providers. */
  requirements?: Array<AuthRequirement>;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The requirements for OAuth credentials. */
  oauth?: OAuthRequirements;
  /** If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests. */
  allowWithoutCredential?: boolean;
}

export const AuthenticationRule: Schema.Schema<AuthenticationRule> = Schema.suspend(() => Schema.Struct({
  requirements: Schema.optional(Schema.Array(AuthRequirement)),
  selector: Schema.optional(Schema.String),
  oauth: Schema.optional(OAuthRequirements),
  allowWithoutCredential: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AuthenticationRule" }) as any as Schema.Schema<AuthenticationRule>;

export interface JwtLocation {
  /** Specifies HTTP header name to extract JWT token. */
  header?: string;
  /** Specifies URL query parameter name to extract JWT token. */
  query?: string;
  /** Specifies cookie name to extract JWT token. */
  cookie?: string;
  /** The value prefix. The value format is "value_prefix{token}" Only applies to "in" header type. Must be empty for "in" query type. If not empty, the header value has to match (case sensitive) this prefix. If not matched, JWT will not be extracted. If matched, JWT will be extracted after the prefix is removed. For example, for "Authorization: Bearer {JWT}", value_prefix="Bearer " with a space at the end. */
  valuePrefix?: string;
}

export const JwtLocation: Schema.Schema<JwtLocation> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  cookie: Schema.optional(Schema.String),
  valuePrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "JwtLocation" }) as any as Schema.Schema<JwtLocation>;

export interface AuthProvider {
  /** The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
  /** The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth". */
  id?: string;
  /** Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec. */
  authorizationUrl?: string;
  /** Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token */
  jwtLocations?: Array<JwtLocation>;
  /** Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com */
  issuer?: string;
  /** URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs */
  jwksUri?: string;
}

export const AuthProvider: Schema.Schema<AuthProvider> = Schema.suspend(() => Schema.Struct({
  audiences: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  authorizationUrl: Schema.optional(Schema.String),
  jwtLocations: Schema.optional(Schema.Array(JwtLocation)),
  issuer: Schema.optional(Schema.String),
  jwksUri: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthProvider" }) as any as Schema.Schema<AuthProvider>;

export interface Authentication {
  /** A list of authentication rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<AuthenticationRule>;
  /** Defines a set of authentication providers that a service supports. */
  providers?: Array<AuthProvider>;
}

export const Authentication: Schema.Schema<Authentication> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(AuthenticationRule)),
  providers: Schema.optional(Schema.Array(AuthProvider)),
})).annotate({ identifier: "Authentication" }) as any as Schema.Schema<Authentication>;

export interface UsageRule {
  /** Use this rule to configure unregistered calls for the service. Unregistered calls are calls that do not contain consumer project identity. (Example: calls that do not contain an API key). WARNING: By default, API methods do not allow unregistered calls, and each method call must be identified by a consumer project identity. */
  allowUnregisteredCalls?: boolean;
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
  /** If true, the selected method should skip service control and the control plane features, such as quota and billing, will not be available. This flag is used by Google Cloud Endpoints to bypass checks for internal methods, such as service health check methods. */
  skipServiceControl?: boolean;
}

export const UsageRule: Schema.Schema<UsageRule> = Schema.suspend(() => Schema.Struct({
  allowUnregisteredCalls: Schema.optional(Schema.Boolean),
  selector: Schema.optional(Schema.String),
  skipServiceControl: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UsageRule" }) as any as Schema.Schema<UsageRule>;

export interface Usage {
  /** Requirements that must be satisfied before a consumer project can use the service. Each requirement is of the form /; for example 'serviceusage.googleapis.com/billing-enabled'. For Google APIs, a Terms of Service requirement must be included here. Google Cloud APIs must include "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include "serviceusage.googleapis.com/tos/universal". Additional ToS can be included based on the business needs. */
  requirements?: Array<string>;
  /** A list of usage rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<UsageRule>;
  /** The full resource name of a channel used for sending notifications to the service producer. Google Service Management currently only supports [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) as a notification channel. To use Google Cloud Pub/Sub as the channel, this must be the name of a Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format documented in https://cloud.google.com/pubsub/docs/overview. */
  producerNotificationChannel?: string;
}

export const Usage: Schema.Schema<Usage> = Schema.suspend(() => Schema.Struct({
  requirements: Schema.optional(Schema.Array(Schema.String)),
  rules: Schema.optional(Schema.Array(UsageRule)),
  producerNotificationChannel: Schema.optional(Schema.String),
})).annotate({ identifier: "Usage" }) as any as Schema.Schema<Usage>;

export interface MonitoringDestination {
  /** The monitored resource type. The type must be defined in Service.monitored_resources section. */
  monitoredResource?: string;
  /** Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section. */
  metrics?: Array<string>;
}

export const MonitoringDestination: Schema.Schema<MonitoringDestination> = Schema.suspend(() => Schema.Struct({
  monitoredResource: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MonitoringDestination" }) as any as Schema.Schema<MonitoringDestination>;

export interface Monitoring {
  /** Monitoring configurations for sending metrics to the consumer project. There can be multiple consumer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  consumerDestinations?: Array<MonitoringDestination>;
  /** Monitoring configurations for sending metrics to the producer project. There can be multiple producer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  producerDestinations?: Array<MonitoringDestination>;
}

export const Monitoring: Schema.Schema<Monitoring> = Schema.suspend(() => Schema.Struct({
  consumerDestinations: Schema.optional(Schema.Array(MonitoringDestination)),
  producerDestinations: Schema.optional(Schema.Array(MonitoringDestination)),
})).annotate({ identifier: "Monitoring" }) as any as Schema.Schema<Monitoring>;

export interface GoogleApiServiceusageV1ServiceConfig {
  /** Defines the monitored resources used by this service. This is required by the Service.monitoring and Service.logging configurations. */
  monitoredResources?: Array<MonitoredResourceDescriptor>;
  /** A list of API interfaces exported by this service. Contains only the names, versions, and method names of the interfaces. */
  apis?: Array<Api>;
  /** Quota configuration. */
  quota?: Quota;
  /** Additional API documentation. Contains only the summary and the documentation URL. */
  documentation?: Documentation;
  /** Configuration for network endpoints. Contains only the names and aliases of the endpoints. */
  endpoints?: Array<Endpoint>;
  /** Auth configuration. Contains only the OAuth rules. */
  authentication?: Authentication;
  /** The product title for this service. */
  title?: string;
  /** Configuration controlling usage of this service. */
  usage?: Usage;
  /** Monitoring configuration. This should not include the 'producer_destinations' field. */
  monitoring?: Monitoring;
  /** The DNS address at which this service is available. An example DNS address would be: `calendar.googleapis.com`. */
  name?: string;
}

export const GoogleApiServiceusageV1ServiceConfig: Schema.Schema<GoogleApiServiceusageV1ServiceConfig> = Schema.suspend(() => Schema.Struct({
  monitoredResources: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  apis: Schema.optional(Schema.Array(Api)),
  quota: Schema.optional(Quota),
  documentation: Schema.optional(Documentation),
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  authentication: Schema.optional(Authentication),
  title: Schema.optional(Schema.String),
  usage: Schema.optional(Usage),
  monitoring: Schema.optional(Monitoring),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV1ServiceConfig" }) as any as Schema.Schema<GoogleApiServiceusageV1ServiceConfig>;

export interface GoogleApiServiceusageV1Service {
  /** Whether or not the service has been enabled for use by the consumer. */
  state?: "STATE_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
  /** The resource name of the consumer. A valid name would be: - projects/123 */
  parent?: string;
  /** The service configuration of the available service. Some fields may be filtered out of the configuration in responses to the `ListServices` method. These fields are present only in responses to the `GetService` method. */
  config?: GoogleApiServiceusageV1ServiceConfig;
  /** The resource name of the consumer and service. A valid name would be: - projects/123/services/serviceusage.googleapis.com */
  name?: string;
}

export const GoogleApiServiceusageV1Service: Schema.Schema<GoogleApiServiceusageV1Service> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  config: Schema.optional(GoogleApiServiceusageV1ServiceConfig),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV1Service" }) as any as Schema.Schema<GoogleApiServiceusageV1Service>;

export interface BatchGetServicesResponse {
  /** The requested Service states. */
  services?: Array<GoogleApiServiceusageV1Service>;
}

export const BatchGetServicesResponse: Schema.Schema<BatchGetServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(GoogleApiServiceusageV1Service)),
})).annotate({ identifier: "BatchGetServicesResponse" }) as any as Schema.Schema<BatchGetServicesResponse>;

export interface AnalyzeConsumerPolicyMetadata {
}

export const AnalyzeConsumerPolicyMetadata: Schema.Schema<AnalyzeConsumerPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AnalyzeConsumerPolicyMetadata" }) as any as Schema.Schema<AnalyzeConsumerPolicyMetadata>;

export interface UpdateAdminQuotaPolicyMetadata {
}

export const UpdateAdminQuotaPolicyMetadata: Schema.Schema<UpdateAdminQuotaPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateAdminQuotaPolicyMetadata" }) as any as Schema.Schema<UpdateAdminQuotaPolicyMetadata>;

export interface SelectiveGapicGeneration {
  /** Setting this to true indicates to the client generators that methods that would be excluded from the generation should instead be generated in a way that indicates these methods should not be consumed by end users. How this is expressed is up to individual language implementations to decide. Some examples may be: added annotations, obfuscated identifiers, or other language idiomatic patterns. */
  generateOmittedAsInternal?: boolean;
  /** An allowlist of the fully qualified names of RPCs that should be included on public client surfaces. */
  methods?: Array<string>;
}

export const SelectiveGapicGeneration: Schema.Schema<SelectiveGapicGeneration> = Schema.suspend(() => Schema.Struct({
  generateOmittedAsInternal: Schema.optional(Schema.Boolean),
  methods: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SelectiveGapicGeneration" }) as any as Schema.Schema<SelectiveGapicGeneration>;

export interface CommonLanguageSettings {
  /** Configuration for which RPCs should be generated in the GAPIC client. */
  selectiveGapicGeneration?: SelectiveGapicGeneration;
  /** The destination where API teams want this client library to be published. */
  destinations?: Array<"CLIENT_LIBRARY_DESTINATION_UNSPECIFIED" | "GITHUB" | "PACKAGE_MANAGER" | (string & {})>;
  /** Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest */
  referenceDocsUri?: string;
}

export const CommonLanguageSettings: Schema.Schema<CommonLanguageSettings> = Schema.suspend(() => Schema.Struct({
  selectiveGapicGeneration: Schema.optional(SelectiveGapicGeneration),
  destinations: Schema.optional(Schema.Array(Schema.String)),
  referenceDocsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "CommonLanguageSettings" }) as any as Schema.Schema<CommonLanguageSettings>;

export interface ExperimentalFeatures {
  /** Enables generation of protobuf code using new types that are more Pythonic which are included in `protobuf>=5.29.x`. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  protobufPythonicTypesEnabled?: boolean;
  /** Enables generation of asynchronous REST clients if `rest` transport is enabled. By default, asynchronous REST clients will not be generated. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  restAsyncIoEnabled?: boolean;
  /** Disables generation of an unversioned Python package for this client library. This means that the module names will need to be versioned in import statements. For example `import google.cloud.library_v2` instead of `import google.cloud.library`. */
  unversionedPackageDisabled?: boolean;
}

export const ExperimentalFeatures: Schema.Schema<ExperimentalFeatures> = Schema.suspend(() => Schema.Struct({
  protobufPythonicTypesEnabled: Schema.optional(Schema.Boolean),
  restAsyncIoEnabled: Schema.optional(Schema.Boolean),
  unversionedPackageDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ExperimentalFeatures" }) as any as Schema.Schema<ExperimentalFeatures>;

export interface PythonSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Experimental features to be included during client library generation. */
  experimentalFeatures?: ExperimentalFeatures;
}

export const PythonSettings: Schema.Schema<PythonSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
  experimentalFeatures: Schema.optional(ExperimentalFeatures),
})).annotate({ identifier: "PythonSettings" }) as any as Schema.Schema<PythonSettings>;

export interface GoogleApiServiceusageV1beta1ServiceIdentity {
  /** The unique and stable id of the service account. https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts#ServiceAccount */
  uniqueId?: string;
  /** The email address of the service account that a service producer would use to access consumer resources. */
  email?: string;
}

export const GoogleApiServiceusageV1beta1ServiceIdentity: Schema.Schema<GoogleApiServiceusageV1beta1ServiceIdentity> = Schema.suspend(() => Schema.Struct({
  uniqueId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV1beta1ServiceIdentity" }) as any as Schema.Schema<GoogleApiServiceusageV1beta1ServiceIdentity>;

export interface GoogleApiServiceusageV1beta1GetServiceIdentityResponse {
  /** Service identity that service producer can use to access consumer resources. If exists is true, it contains email and unique_id. If exists is false, it contains pre-constructed email and empty unique_id. */
  identity?: GoogleApiServiceusageV1beta1ServiceIdentity;
  /** Service identity state. */
  state?: "IDENTITY_STATE_UNSPECIFIED" | "ACTIVE" | (string & {});
}

export const GoogleApiServiceusageV1beta1GetServiceIdentityResponse: Schema.Schema<GoogleApiServiceusageV1beta1GetServiceIdentityResponse> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(GoogleApiServiceusageV1beta1ServiceIdentity),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV1beta1GetServiceIdentityResponse" }) as any as Schema.Schema<GoogleApiServiceusageV1beta1GetServiceIdentityResponse>;

export interface EnableRule {
  /** Client and resource project enable type. */
  enableType?: "ENABLE_TYPE_UNSPECIFIED" | "CLIENT" | "RESOURCE" | "V1_COMPATIBLE" | (string & {});
  /** DEPRECATED: Please use field `values`. Service group should have prefix `groups/`. The names of the service groups that are enabled (Not Implemented). Example: `groups/googleServices`. */
  groups?: Array<string>;
  /** The names of the services or service groups that are enabled. Example: `services/storage.googleapis.com`, `groups/googleServices`, `groups/allServices`. */
  values?: Array<string>;
  /** DEPRECATED: Please use field `values`. Service should have prefix `services/`. The names of the services that are enabled. Example: `storage.googleapis.com`. */
  services?: Array<string>;
}

export const EnableRule: Schema.Schema<EnableRule> = Schema.suspend(() => Schema.Struct({
  enableType: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Array(Schema.String)),
  values: Schema.optional(Schema.Array(Schema.String)),
  services: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnableRule" }) as any as Schema.Schema<EnableRule>;

export interface ContentSecurityProvider {
  /** Name of security service for content scanning, such as Google Cloud Model Armor or supported third-party ISV solutions. If it is Google 1P service, the name should be prefixed with `services/`. If it is a 3P service, the format needs to be documented. The currently supported values are: - `services/modelarmor.googleapis.com` for Google Cloud Model Armor. */
  name?: string;
}

export const ContentSecurityProvider: Schema.Schema<ContentSecurityProvider> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentSecurityProvider" }) as any as Schema.Schema<ContentSecurityProvider>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(Operation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface MetricDescriptorMetadata {
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<"TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED" | "PROJECT" | "ORGANIZATION" | "FOLDER" | (string & {})>;
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> = Schema.suspend(() => Schema.Struct({
  launchStage: Schema.optional(Schema.String),
  timeSeriesResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
  samplePeriod: Schema.optional(Schema.String),
  ingestDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricDescriptorMetadata" }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface MetricDescriptor {
  /** The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent"). */
  unit?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** Optional. The launch stage of the metric definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** The resource name of the metric descriptor. */
  name?: string;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> = Schema.suspend(() => Schema.Struct({
  unit: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metricKind: Schema.optional(Schema.String),
  metadata: Schema.optional(MetricDescriptorMetadata),
  monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  valueType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricDescriptor" }) as any as Schema.Schema<MetricDescriptor>;

export interface DotnetSettings {
  /** Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset" */
  renamedResources?: Record<string, string>;
  /** Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision */
  forcedNamespaceAliases?: Array<string>;
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location" */
  ignoredResources?: Array<string>;
  /** Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn't be generated. Snippets *calling* these methods are still generated, however. */
  handwrittenSignatures?: Array<string>;
  /** Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi. */
  renamedServices?: Record<string, string>;
}

export const DotnetSettings: Schema.Schema<DotnetSettings> = Schema.suspend(() => Schema.Struct({
  renamedResources: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  forcedNamespaceAliases: Schema.optional(Schema.Array(Schema.String)),
  common: Schema.optional(CommonLanguageSettings),
  ignoredResources: Schema.optional(Schema.Array(Schema.String)),
  handwrittenSignatures: Schema.optional(Schema.Array(Schema.String)),
  renamedServices: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DotnetSettings" }) as any as Schema.Schema<DotnetSettings>;

export interface GoogleApiServiceusageV2betaEnableRule {
  /** The names of the services that are enabled. Example: `services/storage.googleapis.com`. */
  services?: Array<string>;
}

export const GoogleApiServiceusageV2betaEnableRule: Schema.Schema<GoogleApiServiceusageV2betaEnableRule> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleApiServiceusageV2betaEnableRule" }) as any as Schema.Schema<GoogleApiServiceusageV2betaEnableRule>;

export interface ServiceIdentity {
  /** The unique and stable id of the service account. https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts#ServiceAccount */
  uniqueId?: string;
  /** The email address of the service account that a service producer would use to access consumer resources. */
  email?: string;
}

export const ServiceIdentity: Schema.Schema<ServiceIdentity> = Schema.suspend(() => Schema.Struct({
  uniqueId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceIdentity" }) as any as Schema.Schema<ServiceIdentity>;

export interface GetServiceIdentityResponse {
  /** Service identity that service producer can use to access consumer resources. If exists is true, it contains email and unique_id. If exists is false, it contains pre-constructed email and empty unique_id. */
  identity?: ServiceIdentity;
  /** Service identity state. */
  state?: "IDENTITY_STATE_UNSPECIFIED" | "ACTIVE" | (string & {});
}

export const GetServiceIdentityResponse: Schema.Schema<GetServiceIdentityResponse> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(ServiceIdentity),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GetServiceIdentityResponse" }) as any as Schema.Schema<GetServiceIdentityResponse>;

export interface DeleteAdminQuotaPolicyMetadata {
}

export const DeleteAdminQuotaPolicyMetadata: Schema.Schema<DeleteAdminQuotaPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteAdminQuotaPolicyMetadata" }) as any as Schema.Schema<DeleteAdminQuotaPolicyMetadata>;

export interface AdminQuotaPolicy {
  /** If this map is nonempty, then this policy applies only to specific values for dimensions defined in the limit unit. For example, a policy on a limit with the unit `1/{project}/{region}` could contain an entry with the key `region` and the value `us-east-1`; the policy is only applied to quota consumed in that region. This map has the following restrictions: * If `region` appears as a key, its value must be a valid Cloud region. * If `zone` appears as a key, its value must be a valid Cloud zone. * Keys other than `region` or `zone` are not valid. */
  dimensions?: Record<string, string>;
  /** The cloud resource container at which the quota policy is created. The format is `{container_type}/{container_number}` */
  container?: string;
  /** The resource name of the policy. This name is generated by the server when the policy is created. Example names would be: `organizations/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/adminQuotaPolicies/4a3f2c1d` */
  name?: string;
  /** The limit unit of the limit to which this policy applies. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** The name of the metric to which this policy applies. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The quota policy value. Can be any nonnegative integer, or -1 (unlimited quota). */
  policyValue?: string;
}

export const AdminQuotaPolicy: Schema.Schema<AdminQuotaPolicy> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  container: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  policyValue: Schema.optional(Schema.String),
})).annotate({ identifier: "AdminQuotaPolicy" }) as any as Schema.Schema<AdminQuotaPolicy>;

export interface ImportAdminQuotaPoliciesResponse {
  /** The policies that were created from the imported data. */
  policies?: Array<AdminQuotaPolicy>;
}

export const ImportAdminQuotaPoliciesResponse: Schema.Schema<ImportAdminQuotaPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(AdminQuotaPolicy)),
})).annotate({ identifier: "ImportAdminQuotaPoliciesResponse" }) as any as Schema.Schema<ImportAdminQuotaPoliciesResponse>;

export interface FieldPolicy {
  /** Specifies the resource type for the resource referred to by the field. */
  resourceType?: string;
  /** Specifies the required permission(s) for the resource referred to by the field. It requires the field contains a valid resource reference, and the request must pass the permission checks to proceed. For example, "resourcemanager.projects.get". */
  resourcePermission?: string;
  /** Selects one or more request or response message fields to apply this `FieldPolicy`. When a `FieldPolicy` is used in proto annotation, the selector must be left as empty. The service config generator will automatically fill the correct value. When a `FieldPolicy` is used in service config, the selector must be a comma-separated string with valid request or response field paths, such as "foo.bar" or "foo.bar,foo.baz". */
  selector?: string;
}

export const FieldPolicy: Schema.Schema<FieldPolicy> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  resourcePermission: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldPolicy" }) as any as Schema.Schema<FieldPolicy>;

export interface MethodPolicy {
  /** Selects a method to which these policies should be enforced, for example, "google.pubsub.v1.Subscriber.CreateSubscription". Refer to selector for syntax details. NOTE: This field must not be set in the proto annotation. It will be automatically filled by the service config compiler . */
  selector?: string;
  /** Policies that are applicable to the request message. */
  requestPolicies?: Array<FieldPolicy>;
}

export const MethodPolicy: Schema.Schema<MethodPolicy> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  requestPolicies: Schema.optional(Schema.Array(FieldPolicy)),
})).annotate({ identifier: "MethodPolicy" }) as any as Schema.Schema<MethodPolicy>;

export interface Control {
  /** The service controller environment to use. If empty, no control plane features (like quota and billing) will be enabled. The recommended value for most services is servicecontrol.googleapis.com. */
  environment?: string;
  /** Defines policies applying to the API methods of the service. */
  methodPolicies?: Array<MethodPolicy>;
}

export const Control: Schema.Schema<Control> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
  methodPolicies: Schema.optional(Schema.Array(MethodPolicy)),
})).annotate({ identifier: "Control" }) as any as Schema.Schema<Control>;

export interface UpdateContentSecurityPolicyMetadata {
}

export const UpdateContentSecurityPolicyMetadata: Schema.Schema<UpdateContentSecurityPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateContentSecurityPolicyMetadata" }) as any as Schema.Schema<UpdateContentSecurityPolicyMetadata>;

export interface SystemParameter {
  /** Define the HTTP header name to use for the parameter. It is case insensitive. */
  httpHeader?: string;
  /** Define the URL query parameter name to use for the parameter. It is case sensitive. */
  urlQueryParameter?: string;
  /** Define the name of the parameter, such as "api_key" . It is case sensitive. */
  name?: string;
}

export const SystemParameter: Schema.Schema<SystemParameter> = Schema.suspend(() => Schema.Struct({
  httpHeader: Schema.optional(Schema.String),
  urlQueryParameter: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemParameter" }) as any as Schema.Schema<SystemParameter>;

export interface SystemParameterRule {
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
  /** Define parameters. Multiple names may be defined for a parameter. For a given method call, only one of them should be used. If multiple names are used the behavior is implementation-dependent. If none of the specified names are present the behavior is parameter-dependent. */
  parameters?: Array<SystemParameter>;
}

export const SystemParameterRule: Schema.Schema<SystemParameterRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(SystemParameter)),
})).annotate({ identifier: "SystemParameterRule" }) as any as Schema.Schema<SystemParameterRule>;

export interface GoogleApiServiceusageV2betaUpdateMcpPolicyMetadata {
}

export const GoogleApiServiceusageV2betaUpdateMcpPolicyMetadata: Schema.Schema<GoogleApiServiceusageV2betaUpdateMcpPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleApiServiceusageV2betaUpdateMcpPolicyMetadata" }) as any as Schema.Schema<GoogleApiServiceusageV2betaUpdateMcpPolicyMetadata>;

export interface BillingDestination {
  /** The monitored resource type. The type must be defined in Service.monitored_resources section. */
  monitoredResource?: string;
  /** Names of the metrics to report to this billing destination. Each name must be defined in Service.metrics section. */
  metrics?: Array<string>;
}

export const BillingDestination: Schema.Schema<BillingDestination> = Schema.suspend(() => Schema.Struct({
  monitoredResource: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BillingDestination" }) as any as Schema.Schema<BillingDestination>;

export interface Billing {
  /** Billing configurations for sending metrics to the consumer project. There can be multiple consumer destinations per service, each one must have a different monitored resource type. A metric can be used in at most one consumer destination. */
  consumerDestinations?: Array<BillingDestination>;
}

export const Billing: Schema.Schema<Billing> = Schema.suspend(() => Schema.Struct({
  consumerDestinations: Schema.optional(Schema.Array(BillingDestination)),
})).annotate({ identifier: "Billing" }) as any as Schema.Schema<Billing>;

export interface RubySettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const RubySettings: Schema.Schema<RubySettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "RubySettings" }) as any as Schema.Schema<RubySettings>;

export interface NodeSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const NodeSettings: Schema.Schema<NodeSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "NodeSettings" }) as any as Schema.Schema<NodeSettings>;

export interface PhpSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** The package name to use in Php. Clobbers the php_namespace option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.php.package_name" field in gapic.yaml. API teams should use the protobuf php_namespace option where possible. Example of a YAML configuration:: publishing: library_settings: php_settings: library_package: Google\Cloud\PubSub\V1 */
  libraryPackage?: string;
}

export const PhpSettings: Schema.Schema<PhpSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
  libraryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "PhpSettings" }) as any as Schema.Schema<PhpSettings>;

export interface GoSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Map of service names to renamed services. Keys are the package relative service names and values are the name to be used for the service client and call options. Example: publishing: go_settings: renamed_services: Publisher: TopicAdmin */
  renamedServices?: Record<string, string>;
}

export const GoSettings: Schema.Schema<GoSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
  renamedServices: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoSettings" }) as any as Schema.Schema<GoSettings>;

export interface JavaSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Configure the Java class name to use instead of the service's for its corresponding generated GAPIC client. Keys are fully-qualified service names as they appear in the protobuf (including the full the language_settings.java.interface_names" field in gapic.yaml. API teams should otherwise use the service name as it appears in the protobuf. Example of a YAML configuration:: publishing: java_settings: service_class_names: - google.pubsub.v1.Publisher: TopicAdmin - google.pubsub.v1.Subscriber: SubscriptionAdmin */
  serviceClassNames?: Record<string, string>;
  /** The package name to use in Java. Clobbers the java_package option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.java.package_name" field in gapic.yaml. API teams should use the protobuf java_package option where possible. Example of a YAML configuration:: publishing: library_settings: java_settings: library_package: com.google.cloud.pubsub.v1 */
  libraryPackage?: string;
}

export const JavaSettings: Schema.Schema<JavaSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
  serviceClassNames: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  libraryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "JavaSettings" }) as any as Schema.Schema<JavaSettings>;

export interface CppSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const CppSettings: Schema.Schema<CppSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "CppSettings" }) as any as Schema.Schema<CppSettings>;

export interface ClientLibrarySettings {
  /** Settings for Ruby client libraries. */
  rubySettings?: RubySettings;
  /** Launch stage of this version of the API. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1". */
  version?: string;
  /** Settings for Node client libraries. */
  nodeSettings?: NodeSettings;
  /** Settings for PHP client libraries. */
  phpSettings?: PhpSettings;
  /** Settings for Go client libraries. */
  goSettings?: GoSettings;
  /** Settings for legacy Java features, supported in the Service YAML. */
  javaSettings?: JavaSettings;
  /** Settings for .NET client libraries. */
  dotnetSettings?: DotnetSettings;
  /** When using transport=rest, the client request will encode enums as numbers rather than strings. */
  restNumericEnums?: boolean;
  /** Settings for C++ client libraries. */
  cppSettings?: CppSettings;
  /** Settings for Python client libraries. */
  pythonSettings?: PythonSettings;
}

export const ClientLibrarySettings: Schema.Schema<ClientLibrarySettings> = Schema.suspend(() => Schema.Struct({
  rubySettings: Schema.optional(RubySettings),
  launchStage: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  nodeSettings: Schema.optional(NodeSettings),
  phpSettings: Schema.optional(PhpSettings),
  goSettings: Schema.optional(GoSettings),
  javaSettings: Schema.optional(JavaSettings),
  dotnetSettings: Schema.optional(DotnetSettings),
  restNumericEnums: Schema.optional(Schema.Boolean),
  cppSettings: Schema.optional(CppSettings),
  pythonSettings: Schema.optional(PythonSettings),
})).annotate({ identifier: "ClientLibrarySettings" }) as any as Schema.Schema<ClientLibrarySettings>;

export interface LongRunning {
  /** Maximum time between two subsequent poll requests. Default value: 45 seconds. */
  maxPollDelay?: string;
  /** Total polling timeout. Default value: 5 minutes. */
  totalPollTimeout?: string;
  /** Multiplier to gradually increase delay between subsequent polls until it reaches max_poll_delay. Default value: 1.5. */
  pollDelayMultiplier?: number;
  /** Initial delay after which the first poll request will be made. Default value: 5 seconds. */
  initialPollDelay?: string;
}

export const LongRunning: Schema.Schema<LongRunning> = Schema.suspend(() => Schema.Struct({
  maxPollDelay: Schema.optional(Schema.String),
  totalPollTimeout: Schema.optional(Schema.String),
  pollDelayMultiplier: Schema.optional(Schema.Number),
  initialPollDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "LongRunning" }) as any as Schema.Schema<LongRunning>;

export interface MethodSettings {
  /** List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id */
  autoPopulatedFields?: Array<string>;
  /** The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder... */
  selector?: string;
  /** Batching configuration for an API method in client libraries. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.BatchCreateExample batching: element_count_threshold: 1000 request_byte_threshold: 100000000 delay_threshold_millis: 10 */
  batching?: BatchingConfigProto;
  /** Describes settings to use for long-running operations when generating API methods for RPCs. Complements RPCs that use the annotations in google/longrunning/operations.proto. Example of a YAML configuration:: publishing: method_settings: - selector: google.cloud.speech.v2.Speech.BatchRecognize long_running: initial_poll_delay: 60s # 1 minute poll_delay_multiplier: 1.5 max_poll_delay: 360s # 6 minutes total_poll_timeout: 54000s # 90 minutes */
  longRunning?: LongRunning;
}

export const MethodSettings: Schema.Schema<MethodSettings> = Schema.suspend(() => Schema.Struct({
  autoPopulatedFields: Schema.optional(Schema.Array(Schema.String)),
  selector: Schema.optional(Schema.String),
  batching: Schema.optional(BatchingConfigProto),
  longRunning: Schema.optional(LongRunning),
})).annotate({ identifier: "MethodSettings" }) as any as Schema.Schema<MethodSettings>;

export interface Publishing {
  /** Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest */
  restReferenceDocumentationUri?: string;
  /** Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech". */
  apiShortName?: string;
  /** Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded. */
  librarySettings?: Array<ClientLibrarySettings>;
  /** A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern. */
  methodSettings?: Array<MethodSettings>;
  /** A prefix used in sample code when demarking regions to be included in documentation. */
  docTagPrefix?: string;
  /** Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc */
  protoReferenceDocumentationUri?: string;
  /** Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103 */
  newIssueUri?: string;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  githubLabel?: string;
  /** GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API. */
  codeownerGithubTeams?: Array<string>;
  /** For whom the client library is being published. */
  organization?: "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED" | "CLOUD" | "ADS" | "PHOTOS" | "STREET_VIEW" | "SHOPPING" | "GEO" | "GENERATIVE_AI" | (string & {});
  /** Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview */
  documentationUri?: string;
}

export const Publishing: Schema.Schema<Publishing> = Schema.suspend(() => Schema.Struct({
  restReferenceDocumentationUri: Schema.optional(Schema.String),
  apiShortName: Schema.optional(Schema.String),
  librarySettings: Schema.optional(Schema.Array(ClientLibrarySettings)),
  methodSettings: Schema.optional(Schema.Array(MethodSettings)),
  docTagPrefix: Schema.optional(Schema.String),
  protoReferenceDocumentationUri: Schema.optional(Schema.String),
  newIssueUri: Schema.optional(Schema.String),
  githubLabel: Schema.optional(Schema.String),
  codeownerGithubTeams: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
  documentationUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Publishing" }) as any as Schema.Schema<Publishing>;

export interface LogDescriptor {
  /** The name of the log. It must be less than 512 characters long and can include the following characters: upper- and lower-case alphanumeric characters [A-Za-z0-9], and punctuation characters including slash, underscore, hyphen, period [/_-.]. */
  name?: string;
  /** The human-readable name for this log. This information appears on the user interface and should be concise. */
  displayName?: string;
  /** A human-readable description of this log. This information appears in the documentation and can contain details. */
  description?: string;
  /** The set of labels that are available to describe a specific log entry. Runtime requests that contain labels not specified here are considered invalid. */
  labels?: Array<LabelDescriptor>;
}

export const LogDescriptor: Schema.Schema<LogDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
})).annotate({ identifier: "LogDescriptor" }) as any as Schema.Schema<LogDescriptor>;

export interface SourceInfo {
  /** All files used during config generation. */
  sourceFiles?: Array<Record<string, unknown>>;
}

export const SourceInfo: Schema.Schema<SourceInfo> = Schema.suspend(() => Schema.Struct({
  sourceFiles: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "SourceInfo" }) as any as Schema.Schema<SourceInfo>;

export interface CustomErrorRule {
  /** Selects messages to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Mark this message as possible payload in error response. Otherwise, objects of this type will be filtered when they appear in error payload. */
  isErrorType?: boolean;
}

export const CustomErrorRule: Schema.Schema<CustomErrorRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  isErrorType: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CustomErrorRule" }) as any as Schema.Schema<CustomErrorRule>;

export interface CustomError {
  /** The list of custom error rules that apply to individual API messages. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<CustomErrorRule>;
  /** The list of custom error detail types, e.g. 'google.foo.v1.CustomError'. */
  types?: Array<string>;
}

export const CustomError: Schema.Schema<CustomError> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(CustomErrorRule)),
  types: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomError" }) as any as Schema.Schema<CustomError>;

export interface CustomHttpPattern {
  /** The path matched by this custom verb. */
  path?: string;
  /** The name of this custom HTTP verb. */
  kind?: string;
}

export const CustomHttpPattern: Schema.Schema<CustomHttpPattern> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomHttpPattern" }) as any as Schema.Schema<CustomHttpPattern>;

export interface HttpRule {
  /** Maps to HTTP POST. Used for creating a resource or performing an action. */
  post?: string;
  /** Maps to HTTP DELETE. Used for deleting a resource. */
  delete?: string;
  /** The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type. */
  body?: string;
  /** Selects a method to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Maps to HTTP PATCH. Used for updating a resource. */
  patch?: string;
  /** Maps to HTTP PUT. Used for replacing a resource. */
  put?: string;
  /** Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep). */
  additionalBindings?: Array<HttpRule>;
  /** The custom pattern is used for specifying an HTTP method that is not included in the `pattern` field, such as HEAD, or "*" to leave the HTTP method unspecified for this rule. The wild-card rule is useful for services that provide content to Web (HTML) clients. */
  custom?: CustomHttpPattern;
  /** Maps to HTTP GET. Used for listing and getting information about resources. */
  get?: string;
  /** Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type. */
  responseBody?: string;
}

export const HttpRule: Schema.Schema<HttpRule> = Schema.suspend(() => Schema.Struct({
  post: Schema.optional(Schema.String),
  delete: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
  patch: Schema.optional(Schema.String),
  put: Schema.optional(Schema.String),
  additionalBindings: Schema.optional(Schema.Array(HttpRule)),
  custom: Schema.optional(CustomHttpPattern),
  get: Schema.optional(Schema.String),
  responseBody: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpRule" }) as any as Schema.Schema<HttpRule>;

export interface Http {
  /** When set to true, URL path parameters will be fully URI-decoded except in cases of single segment matches in reserved expansion, where "%2F" will be left encoded. The default behavior is to not decode RFC 6570 reserved characters in multi segment matches. */
  fullyDecodeReservedExpansion?: boolean;
  /** A list of HTTP configuration rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<HttpRule>;
}

export const Http: Schema.Schema<Http> = Schema.suspend(() => Schema.Struct({
  fullyDecodeReservedExpansion: Schema.optional(Schema.Boolean),
  rules: Schema.optional(Schema.Array(HttpRule)),
})).annotate({ identifier: "Http" }) as any as Schema.Schema<Http>;

export interface LoggingDestination {
  /** Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/". */
  logs?: Array<string>;
  /** The monitored resource type. The type must be defined in the Service.monitored_resources section. */
  monitoredResource?: string;
}

export const LoggingDestination: Schema.Schema<LoggingDestination> = Schema.suspend(() => Schema.Struct({
  logs: Schema.optional(Schema.Array(Schema.String)),
  monitoredResource: Schema.optional(Schema.String),
})).annotate({ identifier: "LoggingDestination" }) as any as Schema.Schema<LoggingDestination>;

export interface Logging {
  /** Logging configurations for sending logs to the consumer project. There can be multiple consumer destinations, each one must have a different monitored resource type. A log can be used in at most one consumer destination. */
  consumerDestinations?: Array<LoggingDestination>;
  /** Logging configurations for sending logs to the producer project. There can be multiple producer destinations, each one must have a different monitored resource type. A log can be used in at most one producer destination. */
  producerDestinations?: Array<LoggingDestination>;
}

export const Logging: Schema.Schema<Logging> = Schema.suspend(() => Schema.Struct({
  consumerDestinations: Schema.optional(Schema.Array(LoggingDestination)),
  producerDestinations: Schema.optional(Schema.Array(LoggingDestination)),
})).annotate({ identifier: "Logging" }) as any as Schema.Schema<Logging>;

export interface AspectRule {
  /** Required. Selects the RPC methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Required. Rules of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  config?: Record<string, unknown>;
}

export const AspectRule: Schema.Schema<AspectRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  config: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "AspectRule" }) as any as Schema.Schema<AspectRule>;

export interface Aspect {
  /** Optional. Rules of the Configuration. */
  rules?: Array<AspectRule>;
  /** Content of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  spec?: Record<string, unknown>;
  /** The type of this aspect configuration. */
  kind?: string;
}

export const Aspect: Schema.Schema<Aspect> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(AspectRule)),
  spec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Aspect" }) as any as Schema.Schema<Aspect>;

export interface Field {
  /** The field name. */
  name?: string;
  /** The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`. */
  typeUrl?: string;
  /** The field cardinality. */
  cardinality?: "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED" | (string & {});
  /** The field number. */
  number?: number;
  /** Whether to use alternative packed wire representation. */
  packed?: boolean;
  /** The field type. */
  kind?: "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64" | (string & {});
  /** The string value of the default value of this field. Proto2 syntax only. */
  defaultValue?: string;
  /** The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list. */
  oneofIndex?: number;
  /** The field JSON name. */
  jsonName?: string;
  /** The protocol buffer options. */
  options?: Array<Option>;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  typeUrl: Schema.optional(Schema.String),
  cardinality: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
  packed: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  oneofIndex: Schema.optional(Schema.Number),
  jsonName: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface Type {
  /** The list of types appearing in `oneof` definitions in this type. */
  oneofs?: Array<string>;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The list of fields. */
  fields?: Array<Field>;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The fully qualified message name. */
  name?: string;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source context. */
  sourceContext?: SourceContext;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  oneofs: Schema.optional(Schema.Array(Schema.String)),
  edition: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Field)),
  options: Schema.optional(Schema.Array(Option)),
  name: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  sourceContext: Schema.optional(SourceContext),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface EnumValue {
  /** Enum value name. */
  name?: string;
  /** Protocol buffer options. */
  options?: Array<Option>;
  /** Enum value number. */
  number?: number;
}

export const EnumValue: Schema.Schema<EnumValue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  number: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnumValue" }) as any as Schema.Schema<EnumValue>;

export interface Enum {
  /** Enum type name. */
  name?: string;
  /** Enum value definitions. */
  enumvalue?: Array<EnumValue>;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** Protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
}

export const Enum: Schema.Schema<Enum> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enumvalue: Schema.optional(Schema.Array(EnumValue)),
  edition: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  sourceContext: Schema.optional(SourceContext),
})).annotate({ identifier: "Enum" }) as any as Schema.Schema<Enum>;

export interface BackendRule {
  /** The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin". */
  loadBalancingPolicy?: string;
  /** The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values. */
  protocol?: string;
  /** The map between request protocol and the backend address. */
  overridesByRequestProtocol?: Record<string, BackendRule>;
  /** When disable_auth is true, a JWT ID token won't be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header. */
  disableAuth?: boolean;
  /** The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version. */
  address?: string;
  /** The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend. */
  jwtAudience?: string;
  /** no-lint */
  pathTranslation?: "PATH_TRANSLATION_UNSPECIFIED" | "CONSTANT_ADDRESS" | "APPEND_PATH_TO_ADDRESS" | (string & {});
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The number of seconds to wait for the completion of a long running operation. The default is no deadline. */
  operationDeadline?: number;
  /** The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment. */
  deadline?: number;
  /** Deprecated, do not use. */
  minDeadline?: number;
}

export const BackendRule: Schema.Schema<BackendRule> = Schema.suspend(() => Schema.Struct({
  loadBalancingPolicy: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  overridesByRequestProtocol: Schema.optional(Schema.Record(Schema.String, BackendRule)),
  disableAuth: Schema.optional(Schema.Boolean),
  address: Schema.optional(Schema.String),
  jwtAudience: Schema.optional(Schema.String),
  pathTranslation: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
  operationDeadline: Schema.optional(Schema.Number),
  deadline: Schema.optional(Schema.Number),
  minDeadline: Schema.optional(Schema.Number),
})).annotate({ identifier: "BackendRule" }) as any as Schema.Schema<BackendRule>;

export interface Backend {
  /** A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<BackendRule>;
}

export const Backend: Schema.Schema<Backend> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(BackendRule)),
})).annotate({ identifier: "Backend" }) as any as Schema.Schema<Backend>;

export interface SystemParameters {
  /** Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<SystemParameterRule>;
}

export const SystemParameters: Schema.Schema<SystemParameters> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(SystemParameterRule)),
})).annotate({ identifier: "SystemParameters" }) as any as Schema.Schema<SystemParameters>;

export interface GoogleApiService {
  /** Defines the metrics used by this service. */
  metrics?: Array<MetricDescriptor>;
  /** Context configuration. */
  context?: Context;
  /** Billing configuration. */
  billing?: Billing;
  /** Settings for [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from APIs defined as protocol buffers. */
  publishing?: Publishing;
  /** Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations. */
  monitoredResources?: Array<MonitoredResourceDescriptor>;
  /** Defines the logs used by this service. */
  logs?: Array<LogDescriptor>;
  /** Configuration for the service control plane. */
  control?: Control;
  /** Output only. The source information for this configuration if available. */
  sourceInfo?: SourceInfo;
  /** Custom error configuration. */
  customError?: CustomError;
  /** The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name. */
  name?: string;
  /** HTTP configuration. */
  http?: Http;
  /** Quota configuration. */
  quota?: Quota;
  /** The product title for this service, it is the name displayed in Google Cloud Console. */
  title?: string;
  /** A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead. */
  id?: string;
  /** Logging configuration. */
  logging?: Logging;
  /** Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners. */
  aspects?: Array<Aspect>;
  /** A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32 */
  types?: Array<Type>;
  /** Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs. WARNING: Defining any entries in the `endpoints` list disables the automatic generation of default endpoint variations (e.g., `{service}.clients6.google.com`, `content-{service}.googleapis.com`, and mTLS variants like `{service}.mtls.googleapis.com`). To retain these default variations, you are required to explicitly include your main service endpoint (e.g., `myservice.googleapis.com`) in this list alongside any other custom endpoints (like REP, GFE, etc.). */
  endpoints?: Array<Endpoint>;
  /** The Google project that owns this service. */
  producerProjectId?: string;
  /** A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum */
  enums?: Array<Enum>;
  /** A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF. */
  systemTypes?: Array<Type>;
  /** API backend configuration. */
  backend?: Backend;
  /** Configuration controlling usage of this service. */
  usage?: Usage;
  /** System parameter configuration. */
  systemParameters?: SystemParameters;
  /** Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`. */
  configVersion?: number;
  /** Monitoring configuration. */
  monitoring?: Monitoring;
  /** Additional API documentation. */
  documentation?: Documentation;
  /** A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files. */
  apis?: Array<Api>;
  /** Auth configuration. */
  authentication?: Authentication;
}

export const GoogleApiService: Schema.Schema<GoogleApiService> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(MetricDescriptor)),
  context: Schema.optional(Context),
  billing: Schema.optional(Billing),
  publishing: Schema.optional(Publishing),
  monitoredResources: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  logs: Schema.optional(Schema.Array(LogDescriptor)),
  control: Schema.optional(Control),
  sourceInfo: Schema.optional(SourceInfo),
  customError: Schema.optional(CustomError),
  name: Schema.optional(Schema.String),
  http: Schema.optional(Http),
  quota: Schema.optional(Quota),
  title: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  logging: Schema.optional(Logging),
  aspects: Schema.optional(Schema.Array(Aspect)),
  types: Schema.optional(Schema.Array(Type)),
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  producerProjectId: Schema.optional(Schema.String),
  enums: Schema.optional(Schema.Array(Enum)),
  systemTypes: Schema.optional(Schema.Array(Type)),
  backend: Schema.optional(Backend),
  usage: Schema.optional(Usage),
  systemParameters: Schema.optional(SystemParameters),
  configVersion: Schema.optional(Schema.Number),
  monitoring: Schema.optional(Monitoring),
  documentation: Schema.optional(Documentation),
  apis: Schema.optional(Schema.Array(Api)),
  authentication: Schema.optional(Authentication),
})).annotate({ identifier: "GoogleApiService" }) as any as Schema.Schema<GoogleApiService>;

export interface UpdateMcpPolicyMetadata {
}

export const UpdateMcpPolicyMetadata: Schema.Schema<UpdateMcpPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateMcpPolicyMetadata" }) as any as Schema.Schema<UpdateMcpPolicyMetadata>;

export interface Impact {
  /** Output only. User friendly impact detail in a free form message. */
  detail?: string;
  /** Output only. The type of impact. */
  impactType?: "IMPACT_TYPE_UNSPECIFIED" | "DEPENDENCY_MISSING_DEPENDENCIES" | "RESOURCE_EXISTENCE_PROJECT" | (string & {});
  /** The parent resource that the analysis is based on and the service name that the analysis is for. Example: `projects/100/services/compute.googleapis.com`, folders/101/services/compute.googleapis.com` and `organizations/102/services/compute.googleapis.com`. Usually, the parent resource here is same as the parent resource of the analyzed policy. However, for some analysis types, the parent can be different. For example, for resource existence analysis, if the parent resource of the analyzed policy is a folder or an organization, the parent resource here can still be the project that contains the resources. */
  parent?: string;
}

export const Impact: Schema.Schema<Impact> = Schema.suspend(() => Schema.Struct({
  detail: Schema.optional(Schema.String),
  impactType: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "Impact" }) as any as Schema.Schema<Impact>;

export interface AnalysisResult {
  /** Warning information indicating that the policy changes might be unsafe, but will not block the changes at runtime. */
  warnings?: Array<Impact>;
  /** Blocking information that would prevent the policy changes at runtime. */
  blockers?: Array<Impact>;
}

export const AnalysisResult: Schema.Schema<AnalysisResult> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(Impact)),
  blockers: Schema.optional(Schema.Array(Impact)),
})).annotate({ identifier: "AnalysisResult" }) as any as Schema.Schema<AnalysisResult>;

export interface Analysis {
  /** Output only. The type of analysis. */
  analysisType?: "ANALYSIS_TYPE_UNSPECIFIED" | "ANALYSIS_TYPE_DEPENDENCY" | "ANALYSIS_TYPE_RESOURCE_USAGE" | "ANALYSIS_TYPE_RESOURCE_EXISTENCE" | (string & {});
  /** The names of the service that has analysis result of warnings or blockers. Example: `services/storage.googleapis.com`. */
  service?: string;
  /** Output only. Analysis result of updating a policy. */
  analysis?: AnalysisResult;
  /** Output only. The user friendly display name of the analysis type. E.g. service dependency analysis, service resource usage analysis, etc. */
  displayName?: string;
}

export const Analysis: Schema.Schema<Analysis> = Schema.suspend(() => Schema.Struct({
  analysisType: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  analysis: Schema.optional(AnalysisResult),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Analysis" }) as any as Schema.Schema<Analysis>;

export interface GoogleApiServiceusageV2alphaEnableRule {
  /** The names of the services that are enabled. Example: `services/storage.googleapis.com`. */
  services?: Array<string>;
}

export const GoogleApiServiceusageV2alphaEnableRule: Schema.Schema<GoogleApiServiceusageV2alphaEnableRule> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleApiServiceusageV2alphaEnableRule" }) as any as Schema.Schema<GoogleApiServiceusageV2alphaEnableRule>;

export interface GoogleApiServiceusageV2betaMcpService {
  /** The names of the services that are enabled for MCP. Example: `services/library-example.googleapis.com` */
  service?: string;
}

export const GoogleApiServiceusageV2betaMcpService: Schema.Schema<GoogleApiServiceusageV2betaMcpService> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV2betaMcpService" }) as any as Schema.Schema<GoogleApiServiceusageV2betaMcpService>;

export interface GoogleApiServiceusageV2betaMcpEnableRule {
  /** List of enabled MCP services. */
  mcpServices?: Array<GoogleApiServiceusageV2betaMcpService>;
}

export const GoogleApiServiceusageV2betaMcpEnableRule: Schema.Schema<GoogleApiServiceusageV2betaMcpEnableRule> = Schema.suspend(() => Schema.Struct({
  mcpServices: Schema.optional(Schema.Array(GoogleApiServiceusageV2betaMcpService)),
})).annotate({ identifier: "GoogleApiServiceusageV2betaMcpEnableRule" }) as any as Schema.Schema<GoogleApiServiceusageV2betaMcpEnableRule>;

export interface GoogleApiServiceusageV2betaMcpPolicy {
  /** An opaque tag indicating the current version of the policy, used for concurrency control. */
  etag?: string;
  /** Output only. The resource name of the policy. Only the `default` policy is supported. We allow the following formats: `projects/{PROJECT_NUMBER}/mcpPolicies/default`, `projects/{PROJECT_ID}/mcpPolicies/default`, `folders/{FOLDER_ID}/mcpPolicies/default`, `organizations/{ORG_ID}/mcpPolicies/default`. */
  name?: string;
  /** Output only. The time the policy was last updated. */
  updateTime?: string;
  /** McpEnableRules contains MCP enablement related rules. */
  mcpEnableRules?: Array<GoogleApiServiceusageV2betaMcpEnableRule>;
  /** Output only. The time the policy was created. For singleton policies (such as the `default` policy), this is the first touch of the policy. */
  createTime?: string;
}

export const GoogleApiServiceusageV2betaMcpPolicy: Schema.Schema<GoogleApiServiceusageV2betaMcpPolicy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  mcpEnableRules: Schema.optional(Schema.Array(GoogleApiServiceusageV2betaMcpEnableRule)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV2betaMcpPolicy" }) as any as Schema.Schema<GoogleApiServiceusageV2betaMcpPolicy>;

export interface ImportAdminOverridesMetadata {
}

export const ImportAdminOverridesMetadata: Schema.Schema<ImportAdminOverridesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportAdminOverridesMetadata" }) as any as Schema.Schema<ImportAdminOverridesMetadata>;

export interface GoogleApiServiceusageV2betaImpact {
  /** Output only. User friendly impact detail in a free form message. */
  detail?: string;
  /** Output only. The type of impact. */
  impactType?: "IMPACT_TYPE_UNSPECIFIED" | "DEPENDENCY_MISSING_DEPENDENCIES" | (string & {});
  /** Output only. This field will be populated only for the `DEPENDENCY_MISSING_DEPENDENCIES` impact type. Example: `services/compute.googleapis.com`. Impact.detail will be in format : `missing service dependency: {missing_dependency}.` */
  missingDependency?: string;
}

export const GoogleApiServiceusageV2betaImpact: Schema.Schema<GoogleApiServiceusageV2betaImpact> = Schema.suspend(() => Schema.Struct({
  detail: Schema.optional(Schema.String),
  impactType: Schema.optional(Schema.String),
  missingDependency: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV2betaImpact" }) as any as Schema.Schema<GoogleApiServiceusageV2betaImpact>;

export interface GoogleApiServiceusageV2betaAnalysisResult {
  /** Warning information indicating that the policy changes might be unsafe, but will not block the changes at runtime. */
  warnings?: Array<GoogleApiServiceusageV2betaImpact>;
  /** Blocking information that would prevent the policy changes at runtime. */
  blockers?: Array<GoogleApiServiceusageV2betaImpact>;
}

export const GoogleApiServiceusageV2betaAnalysisResult: Schema.Schema<GoogleApiServiceusageV2betaAnalysisResult> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(GoogleApiServiceusageV2betaImpact)),
  blockers: Schema.optional(Schema.Array(GoogleApiServiceusageV2betaImpact)),
})).annotate({ identifier: "GoogleApiServiceusageV2betaAnalysisResult" }) as any as Schema.Schema<GoogleApiServiceusageV2betaAnalysisResult>;

export interface McpService {
  /** The names of the services that are enabled for MCP. Example: `services/library-example.googleapis.com` */
  service?: string;
}

export const McpService: Schema.Schema<McpService> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "McpService" }) as any as Schema.Schema<McpService>;

export interface AnalyzeConsumerPolicyResponse {
  /** The list of analyses returned from performing the intended policy update analysis. The analysis is grouped by service name and different analysis types. The empty analysis list means that the consumer policy can be updated without any warnings or blockers. */
  analysis?: Array<Analysis>;
}

export const AnalyzeConsumerPolicyResponse: Schema.Schema<AnalyzeConsumerPolicyResponse> = Schema.suspend(() => Schema.Struct({
  analysis: Schema.optional(Schema.Array(Analysis)),
})).annotate({ identifier: "AnalyzeConsumerPolicyResponse" }) as any as Schema.Schema<AnalyzeConsumerPolicyResponse>;

export interface AddEnableRulesResponse {
  /** The values added to the parent consumer policy. */
  addedValues?: Array<string>;
  /** The parent consumer policy. It can be `projects/12345/consumerPolicies/default`, or `folders/12345/consumerPolicies/default`, or `organizations/12345/consumerPolicies/default`. */
  parent?: string;
}

export const AddEnableRulesResponse: Schema.Schema<AddEnableRulesResponse> = Schema.suspend(() => Schema.Struct({
  addedValues: Schema.optional(Schema.Array(Schema.String)),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "AddEnableRulesResponse" }) as any as Schema.Schema<AddEnableRulesResponse>;

export interface DisableServiceRequest {
  /** Indicates if services that are enabled and which depend on this service should also be disabled. If not set, an error will be generated if any enabled services depend on the service to be disabled. When set, the service, and any enabled services that depend on it, will be disabled together. */
  disableDependentServices?: boolean;
  /** Defines the behavior for checking service usage when disabling a service. */
  checkIfServiceHasUsage?: "CHECK_IF_SERVICE_HAS_USAGE_UNSPECIFIED" | "SKIP" | "CHECK" | (string & {});
}

export const DisableServiceRequest: Schema.Schema<DisableServiceRequest> = Schema.suspend(() => Schema.Struct({
  disableDependentServices: Schema.optional(Schema.Boolean),
  checkIfServiceHasUsage: Schema.optional(Schema.String),
})).annotate({ identifier: "DisableServiceRequest" }) as any as Schema.Schema<DisableServiceRequest>;

export interface UpdateConsumerPolicyMetadata {
}

export const UpdateConsumerPolicyMetadata: Schema.Schema<UpdateConsumerPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateConsumerPolicyMetadata" }) as any as Schema.Schema<UpdateConsumerPolicyMetadata>;

export interface GoogleApiServiceusageV2alphaUpdateConsumerPolicyMetadata {
}

export const GoogleApiServiceusageV2alphaUpdateConsumerPolicyMetadata: Schema.Schema<GoogleApiServiceusageV2alphaUpdateConsumerPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleApiServiceusageV2alphaUpdateConsumerPolicyMetadata" }) as any as Schema.Schema<GoogleApiServiceusageV2alphaUpdateConsumerPolicyMetadata>;

export interface GoogleApiServiceusageV2betaAnalysis {
  /** The names of the service that has analysis result of warnings or blockers. Example: `services/storage.googleapis.com`. */
  service?: string;
  /** Output only. The user friendly display name of the analysis type. E.g. service dependency analysis, service resource usage analysis, etc. */
  displayName?: string;
  /** Output only. Analysis result of updating a policy. */
  analysisResult?: GoogleApiServiceusageV2betaAnalysisResult;
  /** Output only. The type of analysis. */
  analysisType?: "ANALYSIS_TYPE_UNSPECIFIED" | "ANALYSIS_TYPE_DEPENDENCY" | "ANALYSIS_TYPE_RESOURCE_USAGE" | (string & {});
}

export const GoogleApiServiceusageV2betaAnalysis: Schema.Schema<GoogleApiServiceusageV2betaAnalysis> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  analysisResult: Schema.optional(GoogleApiServiceusageV2betaAnalysisResult),
  analysisType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV2betaAnalysis" }) as any as Schema.Schema<GoogleApiServiceusageV2betaAnalysis>;

export interface GoogleApiServiceusageV2betaAnalyzeConsumerPolicyResponse {
  /** The list of analyses returned from performing the intended policy update analysis. The analysis is grouped by service name and different analysis types. The empty analysis list means that the consumer policy can be updated without any warnings or blockers. */
  analysis?: Array<GoogleApiServiceusageV2betaAnalysis>;
}

export const GoogleApiServiceusageV2betaAnalyzeConsumerPolicyResponse: Schema.Schema<GoogleApiServiceusageV2betaAnalyzeConsumerPolicyResponse> = Schema.suspend(() => Schema.Struct({
  analysis: Schema.optional(Schema.Array(GoogleApiServiceusageV2betaAnalysis)),
})).annotate({ identifier: "GoogleApiServiceusageV2betaAnalyzeConsumerPolicyResponse" }) as any as Schema.Schema<GoogleApiServiceusageV2betaAnalyzeConsumerPolicyResponse>;

export interface QuotaOverride {
  /** The resource name of the ancestor that requested the override. For example: `organizations/12345` or `folders/67890`. Used by admin overrides only. */
  adminOverrideAncestor?: string;
  /** The resource name of the override. This name is generated by the server when the override is created. Example names would be: `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/adminOverrides/4a3f2c1d` `projects/123/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/consumerOverrides/4a3f2c1d` The resource name is intended to be opaque and should not be parsed for its component strings, since its representation could change in the future. */
  name?: string;
  /** The name of the metric to which this override applies. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The limit unit of the limit to which this override applies. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** The overriding quota limit value. Can be any nonnegative integer, or -1 (unlimited quota). */
  overrideValue?: string;
  /** If this map is nonempty, then this override applies only to specific values for dimensions defined in the limit unit. For example, an override on a limit with the unit `1/{project}/{region}` could contain an entry with the key `region` and the value `us-east-1`; the override is only applied to quota consumed in that region. This map has the following restrictions: * Keys that are not defined in the limit's unit are not valid keys. Any string appearing in `{brackets}` in the unit (besides `{project}` or `{user}`) is a defined key. * `project` is not a valid key; the project is already specified in the parent resource name. * `user` is not a valid key; the API does not support quota overrides that apply only to a specific user. * If `region` appears as a key, its value must be a valid Cloud region. * If `zone` appears as a key, its value must be a valid Cloud zone. * If any valid key other than `region` or `zone` appears in the map, then all valid keys other than `region` or `zone` must also appear in the map. */
  dimensions?: Record<string, string>;
}

export const QuotaOverride: Schema.Schema<QuotaOverride> = Schema.suspend(() => Schema.Struct({
  adminOverrideAncestor: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  overrideValue: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "QuotaOverride" }) as any as Schema.Schema<QuotaOverride>;

export interface ContentSecurity {
  /** List of content security providers that are enabled for content scanning. */
  contentSecurityProviders?: Array<ContentSecurityProvider>;
}

export const ContentSecurity: Schema.Schema<ContentSecurity> = Schema.suspend(() => Schema.Struct({
  contentSecurityProviders: Schema.optional(Schema.Array(ContentSecurityProvider)),
})).annotate({ identifier: "ContentSecurity" }) as any as Schema.Schema<ContentSecurity>;

export interface ContentSecurityPolicy {
  /** Output only. The resource name of the policy. Only the `default` policy is supported. We allow the following formats: `projects/{PROJECT_NUMBER}/contentSecurityPolicies/default`, `projects/{PROJECT_ID}/contentSecurityPolicies/default`, We only support project level content security policy for now. */
  name?: string;
  /** mcp_content_security contains the content security related settings at resource level for MCP traffic. */
  mcpContentSecurity?: ContentSecurity;
}

export const ContentSecurityPolicy: Schema.Schema<ContentSecurityPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  mcpContentSecurity: Schema.optional(ContentSecurity),
})).annotate({ identifier: "ContentSecurityPolicy" }) as any as Schema.Schema<ContentSecurityPolicy>;

export interface RemoveEnableRulesMetadata {
}

export const RemoveEnableRulesMetadata: Schema.Schema<RemoveEnableRulesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveEnableRulesMetadata" }) as any as Schema.Schema<RemoveEnableRulesMetadata>;

export interface GoogleApiServiceusageV1OperationMetadata {
  /** The full name of the resources that this operation is directly associated with. */
  resourceNames?: Array<string>;
}

export const GoogleApiServiceusageV1OperationMetadata: Schema.Schema<GoogleApiServiceusageV1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleApiServiceusageV1OperationMetadata" }) as any as Schema.Schema<GoogleApiServiceusageV1OperationMetadata>;

export interface ImportConsumerOverridesResponse {
  /** The overrides that were created from the imported data. */
  overrides?: Array<QuotaOverride>;
}

export const ImportConsumerOverridesResponse: Schema.Schema<ImportConsumerOverridesResponse> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Schema.Array(QuotaOverride)),
})).annotate({ identifier: "ImportConsumerOverridesResponse" }) as any as Schema.Schema<ImportConsumerOverridesResponse>;

export interface ConsumerPolicy {
  /** Enable rules define usable services and service groups. */
  enableRules?: Array<EnableRule>;
  /** An opaque tag indicating the current version of the policy, used for concurrency control. */
  etag?: string;
  /** The last-modified time. */
  updateTime?: string;
  /** Optional. Annotations is an unstructured key-value map stored with a policy that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. [AIP-128](https://google.aip.dev/128#annotations) */
  annotations?: Record<string, string>;
  /** Output only. The resource name of the policy. We only allow consumer policy name as `default` for now: `projects/12345/consumerPolicies/default`, `folders/12345/consumerPolicies/default`, `organizations/12345/consumerPolicies/default`. */
  name?: string;
}

export const ConsumerPolicy: Schema.Schema<ConsumerPolicy> = Schema.suspend(() => Schema.Struct({
  enableRules: Schema.optional(Schema.Array(EnableRule)),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsumerPolicy" }) as any as Schema.Schema<ConsumerPolicy>;

export interface EnableFailure {
  /** The service id of a service that could not be enabled. */
  serviceId?: string;
  /** An error message describing why the service could not be enabled. */
  errorMessage?: string;
}

export const EnableFailure: Schema.Schema<EnableFailure> = Schema.suspend(() => Schema.Struct({
  serviceId: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EnableFailure" }) as any as Schema.Schema<EnableFailure>;

export interface ImportAdminOverridesResponse {
  /** The overrides that were created from the imported data. */
  overrides?: Array<QuotaOverride>;
}

export const ImportAdminOverridesResponse: Schema.Schema<ImportAdminOverridesResponse> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Schema.Array(QuotaOverride)),
})).annotate({ identifier: "ImportAdminOverridesResponse" }) as any as Schema.Schema<ImportAdminOverridesResponse>;

export interface ImportConsumerOverridesMetadata {
}

export const ImportConsumerOverridesMetadata: Schema.Schema<ImportConsumerOverridesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportConsumerOverridesMetadata" }) as any as Schema.Schema<ImportConsumerOverridesMetadata>;

export interface BatchEnableServicesRequest {
  /** The identifiers of the services to enable on the project. A valid identifier would be: serviceusage.googleapis.com Enabling services requires that each service is public or is shared with the user enabling the service. A single request can enable a maximum of 20 services at a time. If more than 20 services are specified, the request will fail, and no state changes will occur. */
  serviceIds?: Array<string>;
}

export const BatchEnableServicesRequest: Schema.Schema<BatchEnableServicesRequest> = Schema.suspend(() => Schema.Struct({
  serviceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchEnableServicesRequest" }) as any as Schema.Schema<BatchEnableServicesRequest>;

export interface GoogleApiServiceusageV2betaAnalyzeConsumerPolicyMetadata {
}

export const GoogleApiServiceusageV2betaAnalyzeConsumerPolicyMetadata: Schema.Schema<GoogleApiServiceusageV2betaAnalyzeConsumerPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleApiServiceusageV2betaAnalyzeConsumerPolicyMetadata" }) as any as Schema.Schema<GoogleApiServiceusageV2betaAnalyzeConsumerPolicyMetadata>;

export interface RemoveEnableRulesResponse {
  /** The parent consumer policy. It can be `projects/12345/consumerPolicies/default`, or `folders/12345/consumerPolicies/default`, or `organizations/12345/consumerPolicies/default`. */
  parent?: string;
  /** The values removed from the parent consumer policy. */
  removedValues?: Array<string>;
}

export const RemoveEnableRulesResponse: Schema.Schema<RemoveEnableRulesResponse> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  removedValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemoveEnableRulesResponse" }) as any as Schema.Schema<RemoveEnableRulesResponse>;

export interface DisableServiceResponse {
  /** The new state of the service after disabling. */
  service?: GoogleApiServiceusageV1Service;
}

export const DisableServiceResponse: Schema.Schema<DisableServiceResponse> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(GoogleApiServiceusageV1Service),
})).annotate({ identifier: "DisableServiceResponse" }) as any as Schema.Schema<DisableServiceResponse>;

export interface BatchCreateAdminOverridesResponse {
  /** The overrides that were created. */
  overrides?: Array<QuotaOverride>;
}

export const BatchCreateAdminOverridesResponse: Schema.Schema<BatchCreateAdminOverridesResponse> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Schema.Array(QuotaOverride)),
})).annotate({ identifier: "BatchCreateAdminOverridesResponse" }) as any as Schema.Schema<BatchCreateAdminOverridesResponse>;

export interface McpEnableRule {
  /** List of enabled MCP services. */
  mcpServices?: Array<McpService>;
}

export const McpEnableRule: Schema.Schema<McpEnableRule> = Schema.suspend(() => Schema.Struct({
  mcpServices: Schema.optional(Schema.Array(McpService)),
})).annotate({ identifier: "McpEnableRule" }) as any as Schema.Schema<McpEnableRule>;

export interface McpPolicy {
  /** McpEnableRules contains MCP enablement related rules. */
  mcpEnableRules?: Array<McpEnableRule>;
  /** An opaque tag indicating the current version of the policy, used for concurrency control. */
  etag?: string;
  /** Output only. The resource name of the policy. Only the `default` policy is supported. We allow the following formats: `projects/{PROJECT_NUMBER}/mcpPolicies/default`, `projects/{PROJECT_ID}/mcpPolicies/default`, `folders/{FOLDER_ID}/mcpPolicies/default`, `organizations/{ORG_ID}/mcpPolicies/default`. */
  name?: string;
  /** Output only. The time the policy was last updated. */
  updateTime?: string;
  /** Output only. The time the policy was created. For singleton policies (such as the `default` policy), this is the first touch of the policy. */
  createTime?: string;
}

export const McpPolicy: Schema.Schema<McpPolicy> = Schema.suspend(() => Schema.Struct({
  mcpEnableRules: Schema.optional(Schema.Array(McpEnableRule)),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "McpPolicy" }) as any as Schema.Schema<McpPolicy>;

export interface EnableServiceResponse {
  /** The new state of the service after enabling. */
  service?: GoogleApiServiceusageV1Service;
}

export const EnableServiceResponse: Schema.Schema<EnableServiceResponse> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(GoogleApiServiceusageV1Service),
})).annotate({ identifier: "EnableServiceResponse" }) as any as Schema.Schema<EnableServiceResponse>;

export interface EnableServiceRequest {
}

export const EnableServiceRequest: Schema.Schema<EnableServiceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableServiceRequest" }) as any as Schema.Schema<EnableServiceRequest>;

export interface BatchCreateConsumerOverridesResponse {
  /** The overrides that were created. */
  overrides?: Array<QuotaOverride>;
}

export const BatchCreateConsumerOverridesResponse: Schema.Schema<BatchCreateConsumerOverridesResponse> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Schema.Array(QuotaOverride)),
})).annotate({ identifier: "BatchCreateConsumerOverridesResponse" }) as any as Schema.Schema<BatchCreateConsumerOverridesResponse>;

export interface ListServicesResponse {
  /** Token that can be passed to `ListServices` to resume a paginated query. */
  nextPageToken?: string;
  /** The available services for the requested project. */
  services?: Array<GoogleApiServiceusageV1Service>;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(GoogleApiServiceusageV1Service)),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface GoogleApiServiceusageV2alphaConsumerPolicy {
  /** Optional. Annotations is an unstructured key-value map stored with a policy that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. [AIP-128](https://google.aip.dev/128#annotations) */
  annotations?: Record<string, string>;
  /** Output only. The time the policy was last updated. */
  updateTime?: string;
  /** Output only. The resource name of the policy. Only the `default` policy is supported: `projects/12345/consumerPolicies/default`, `folders/12345/consumerPolicies/default`, `organizations/12345/consumerPolicies/default`. */
  name?: string;
  /** Enable rules define usable services, groups, and categories. There can currently be at most one `EnableRule`. This restriction will be lifted in later releases. */
  enableRules?: Array<GoogleApiServiceusageV2alphaEnableRule>;
  /** Output only. An opaque tag indicating the current version of the policy, used for concurrency control. */
  etag?: string;
  /** Output only. The time the policy was created. For singleton policies, this is the first touch of the policy. */
  createTime?: string;
}

export const GoogleApiServiceusageV2alphaConsumerPolicy: Schema.Schema<GoogleApiServiceusageV2alphaConsumerPolicy> = Schema.suspend(() => Schema.Struct({
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  enableRules: Schema.optional(Schema.Array(GoogleApiServiceusageV2alphaEnableRule)),
  etag: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV2alphaConsumerPolicy" }) as any as Schema.Schema<GoogleApiServiceusageV2alphaConsumerPolicy>;

export interface CreateAdminQuotaPolicyMetadata {
}

export const CreateAdminQuotaPolicyMetadata: Schema.Schema<CreateAdminQuotaPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateAdminQuotaPolicyMetadata" }) as any as Schema.Schema<CreateAdminQuotaPolicyMetadata>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleApiServiceusageV2betaUpdateConsumerPolicyMetadata {
}

export const GoogleApiServiceusageV2betaUpdateConsumerPolicyMetadata: Schema.Schema<GoogleApiServiceusageV2betaUpdateConsumerPolicyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleApiServiceusageV2betaUpdateConsumerPolicyMetadata" }) as any as Schema.Schema<GoogleApiServiceusageV2betaUpdateConsumerPolicyMetadata>;

export interface GoogleApiServiceusageV2betaConsumerPolicy {
  /** Output only. The time the policy was created. For singleton policies, this is the first touch of the policy. */
  createTime?: string;
  /** Output only. The time the policy was last updated. */
  updateTime?: string;
  /** Enable rules define usable services, groups, and categories. There can currently be at most one `EnableRule`. This restriction will be lifted in later releases. */
  enableRules?: Array<GoogleApiServiceusageV2betaEnableRule>;
  /** Output only. The resource name of the policy. Only the `default` policy is supported: `projects/12345/consumerPolicies/default`, `folders/12345/consumerPolicies/default`, `organizations/12345/consumerPolicies/default`. */
  name?: string;
  /** An opaque tag indicating the current version of the policy, used for concurrency control. */
  etag?: string;
}

export const GoogleApiServiceusageV2betaConsumerPolicy: Schema.Schema<GoogleApiServiceusageV2betaConsumerPolicy> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  enableRules: Schema.optional(Schema.Array(GoogleApiServiceusageV2betaEnableRule)),
  name: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceusageV2betaConsumerPolicy" }) as any as Schema.Schema<GoogleApiServiceusageV2betaConsumerPolicy>;

export interface ImportAdminQuotaPoliciesMetadata {
}

export const ImportAdminQuotaPoliciesMetadata: Schema.Schema<ImportAdminQuotaPoliciesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportAdminQuotaPoliciesMetadata" }) as any as Schema.Schema<ImportAdminQuotaPoliciesMetadata>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface BatchEnableServicesResponse {
  /** If allow_partial_success is true, and one or more services could not be enabled, this field contains the details about each failure. */
  failures?: Array<EnableFailure>;
  /** The new state of the services after enabling. */
  services?: Array<GoogleApiServiceusageV1Service>;
}

export const BatchEnableServicesResponse: Schema.Schema<BatchEnableServicesResponse> = Schema.suspend(() => Schema.Struct({
  failures: Schema.optional(Schema.Array(EnableFailure)),
  services: Schema.optional(Schema.Array(GoogleApiServiceusageV1Service)),
})).annotate({ identifier: "BatchEnableServicesResponse" }) as any as Schema.Schema<BatchEnableServicesResponse>;

export interface OperationMetadata {
  /** The full name of the resources that this operation is directly associated with. */
  resourceNames?: Array<string>;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface AddEnableRulesMetadata {
}

export const AddEnableRulesMetadata: Schema.Schema<AddEnableRulesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddEnableRulesMetadata" }) as any as Schema.Schema<AddEnableRulesMetadata>;

export interface GetServiceIdentityMetadata {
}

export const GetServiceIdentityMetadata: Schema.Schema<GetServiceIdentityMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GetServiceIdentityMetadata" }) as any as Schema.Schema<GetServiceIdentityMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = Empty;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = Empty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op = ListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the service configuration and enabled state for a given service. */
export interface GetServicesRequest {
  /** Name of the consumer and service to get the `ConsumerState` for. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. */
  name: string;
}

export const GetServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesRequest>;

export type GetServicesResponse = GoogleApiServiceusageV1Service;
export const GetServicesResponse = GoogleApiServiceusageV1Service;

export type GetServicesError = CommonErrors;

export const getServices: API.OperationMethod<GetServicesRequest, GetServicesResponse, GetServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesRequest,
  output: GetServicesResponse,
  errors: [],
}));

/** Enable a service so that it can be used with a project. */
export interface EnableServicesRequest {
  /** Name of the consumer and service to enable the service on. The `EnableService` and `DisableService` methods currently only support projects. Enabling a service requires that the service is public or is shared with the user enabling the service. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. */
  name: string;
  /** Request body */
  body?: EnableServiceRequest;
}

export const EnableServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}/services/{servicesId}:enable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableServicesRequest>;

export type EnableServicesResponse = Operation;
export const EnableServicesResponse = Operation;

export type EnableServicesError = CommonErrors;

export const enableServices: API.OperationMethod<EnableServicesRequest, EnableServicesResponse, EnableServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableServicesRequest,
  output: EnableServicesResponse,
  errors: [],
}));

/** List all services available to the specified project, and the current state of those services with respect to the project. The list includes all public services, all services for which the calling user has the `servicemanagement.services.bind` permission, and all services that have already been enabled on the project. The list can be filtered to only include services in a specific state, for example to only include services enabled on the project. WARNING: If you need to query enabled services frequently or across an organization, you should use [Cloud Asset Inventory API](https://cloud.google.com/asset-inventory/docs/apis), which provides higher throughput and richer filtering capability. */
export interface ListServicesRequest {
  /** Requested size of the next page of data. Requested page size cannot exceed 200. If not set, the default page size is 50. */
  pageSize?: number;
  /** Only list services that conform to the given filter. The allowed filter strings are `state:ENABLED` and `state:DISABLED`. */
  filter?: string;
  /** Token identifying which result to start with, which is returned by a previous list call. */
  pageToken?: string;
  /** Parent to search for services on. An example name would be: `projects/123` where `123` is the project number. */
  parent: string;
}

export const ListServicesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/services" }),
  svc,
) as unknown as Schema.Schema<ListServicesRequest>;

export type ListServicesResponse_Op = ListServicesResponse;
export const ListServicesResponse_Op = ListServicesResponse;

export type ListServicesError = CommonErrors;

export const listServices = API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Enable multiple services on a project. The operation is atomic: if enabling any service fails, then the entire batch fails, and no state changes occur. To enable a single service, use the `EnableService` method instead. */
export interface BatchEnableServicesRequest_Op {
  /** Parent to enable services on. An example name would be: `projects/123` where `123` is the project number. The `BatchEnableServices` method currently only supports projects. */
  parent: string;
  /** Request body */
  body?: BatchEnableServicesRequest;
}

export const BatchEnableServicesRequest_Op = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchEnableServicesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}/services:batchEnable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchEnableServicesRequest_Op>;

export type BatchEnableServicesResponse_Op = Operation;
export const BatchEnableServicesResponse_Op = Operation;

export type BatchEnableServicesError = CommonErrors;

export const batchEnableServices: API.OperationMethod<BatchEnableServicesRequest_Op, BatchEnableServicesResponse_Op, BatchEnableServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchEnableServicesRequest_Op,
  output: BatchEnableServicesResponse_Op,
  errors: [],
}));

/** Disable a service so that it can no longer be used with a project. This prevents unintended usage that may cause unexpected billing charges or security leaks. It is not valid to call the disable method on a service that is not currently enabled. Callers will receive a `FAILED_PRECONDITION` status if the target service is not currently enabled. */
export interface DisableServicesRequest {
  /** Name of the consumer and service to disable the service on. The enable and disable methods currently only support projects. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. */
  name: string;
  /** Request body */
  body?: DisableServiceRequest;
}

export const DisableServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/{v1Id1}/services/{servicesId}:disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableServicesRequest>;

export type DisableServicesResponse = Operation;
export const DisableServicesResponse = Operation;

export type DisableServicesError = CommonErrors;

export const disableServices: API.OperationMethod<DisableServicesRequest, DisableServicesResponse, DisableServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableServicesRequest,
  output: DisableServicesResponse,
  errors: [],
}));

/** Returns the service configurations and enabled states for a given list of services. */
export interface BatchGetServicesRequest {
  /** Names of the services to retrieve. An example name would be: `projects/123/services/serviceusage.googleapis.com` where `123` is the project number. A single request can get a maximum of 30 services at a time. */
  names?: string[];
  /** Parent to retrieve services from. If this is set, the parent of all of the services specified in `names` must match this field. An example name would be: `projects/123` where `123` is the project number. The `BatchGetServices` method currently only supports projects. */
  parent: string;
}

export const BatchGetServicesRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/{v1Id}/{v1Id1}/services:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetServicesRequest>;

export type BatchGetServicesResponse_Op = BatchGetServicesResponse;
export const BatchGetServicesResponse_Op = BatchGetServicesResponse;

export type BatchGetServicesError = CommonErrors;

export const batchGetServices: API.OperationMethod<BatchGetServicesRequest, BatchGetServicesResponse_Op, BatchGetServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetServicesRequest,
  output: BatchGetServicesResponse_Op,
  errors: [],
}));

