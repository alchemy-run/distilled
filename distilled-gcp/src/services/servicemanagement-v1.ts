// ==========================================================================
// Service Management API (servicemanagement v1)
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
  name: "servicemanagement",
  version: "v1",
  rootUrl: "https://servicemanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SelectiveGapicGeneration {
  /** An allowlist of the fully qualified names of RPCs that should be included on public client surfaces. */
  methods?: Array<string>;
  /** Setting this to true indicates to the client generators that methods that would be excluded from the generation should instead be generated in a way that indicates these methods should not be consumed by end users. How this is expressed is up to individual language implementations to decide. Some examples may be: added annotations, obfuscated identifiers, or other language idiomatic patterns. */
  generateOmittedAsInternal?: boolean;
}

export const SelectiveGapicGeneration: Schema.Schema<SelectiveGapicGeneration> = Schema.suspend(() => Schema.Struct({
  methods: Schema.optional(Schema.Array(Schema.String)),
  generateOmittedAsInternal: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SelectiveGapicGeneration" }) as any as Schema.Schema<SelectiveGapicGeneration>;

export interface CommonLanguageSettings {
  /** The destination where API teams want this client library to be published. */
  destinations?: Array<"CLIENT_LIBRARY_DESTINATION_UNSPECIFIED" | "GITHUB" | "PACKAGE_MANAGER" | (string & {})>;
  /** Configuration for which RPCs should be generated in the GAPIC client. */
  selectiveGapicGeneration?: SelectiveGapicGeneration;
  /** Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest */
  referenceDocsUri?: string;
}

export const CommonLanguageSettings: Schema.Schema<CommonLanguageSettings> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Schema.String)),
  selectiveGapicGeneration: Schema.optional(SelectiveGapicGeneration),
  referenceDocsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "CommonLanguageSettings" }) as any as Schema.Schema<CommonLanguageSettings>;

export interface PhpSettings {
  /** The package name to use in Php. Clobbers the php_namespace option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.php.package_name" field in gapic.yaml. API teams should use the protobuf php_namespace option where possible. Example of a YAML configuration:: publishing: library_settings: php_settings: library_package: Google\Cloud\PubSub\V1 */
  libraryPackage?: string;
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const PhpSettings: Schema.Schema<PhpSettings> = Schema.suspend(() => Schema.Struct({
  libraryPackage: Schema.optional(Schema.String),
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "PhpSettings" }) as any as Schema.Schema<PhpSettings>;

export interface TrafficPercentStrategy {
  /** Maps service configuration IDs to their corresponding traffic percentage. Key is the service configuration ID, Value is the traffic percentage which must be greater than 0.0 and the sum must equal to 100.0. */
  percentages?: Record<string, number>;
}

export const TrafficPercentStrategy: Schema.Schema<TrafficPercentStrategy> = Schema.suspend(() => Schema.Struct({
  percentages: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
})).annotate({ identifier: "TrafficPercentStrategy" }) as any as Schema.Schema<TrafficPercentStrategy>;

export interface LabelDescriptor {
  /** The label key. */
  key?: string;
  /** The type of data that can be assigned to the label. */
  valueType?: "STRING" | "BOOL" | "INT64" | (string & {});
  /** A human-readable description for the label. */
  description?: string;
}

export const LabelDescriptor: Schema.Schema<LabelDescriptor> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelDescriptor" }) as any as Schema.Schema<LabelDescriptor>;

export interface MonitoredResourceDescriptor {
  /** Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`. */
  displayName?: string;
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`. */
  labels?: Array<LabelDescriptor>;
  /** Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`. */
  name?: string;
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  name: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoredResourceDescriptor" }) as any as Schema.Schema<MonitoredResourceDescriptor>;

export interface UsageRule {
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
  /** Use this rule to configure unregistered calls for the service. Unregistered calls are calls that do not contain consumer project identity. (Example: calls that do not contain an API key). WARNING: By default, API methods do not allow unregistered calls, and each method call must be identified by a consumer project identity. */
  allowUnregisteredCalls?: boolean;
  /** If true, the selected method should skip service control and the control plane features, such as quota and billing, will not be available. This flag is used by Google Cloud Endpoints to bypass checks for internal methods, such as service health check methods. */
  skipServiceControl?: boolean;
}

export const UsageRule: Schema.Schema<UsageRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  allowUnregisteredCalls: Schema.optional(Schema.Boolean),
  skipServiceControl: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UsageRule" }) as any as Schema.Schema<UsageRule>;

export interface Usage {
  /** The full resource name of a channel used for sending notifications to the service producer. Google Service Management currently only supports [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) as a notification channel. To use Google Cloud Pub/Sub as the channel, this must be the name of a Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format documented in https://cloud.google.com/pubsub/docs/overview. */
  producerNotificationChannel?: string;
  /** A list of usage rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<UsageRule>;
  /** Requirements that must be satisfied before a consumer project can use the service. Each requirement is of the form /; for example 'serviceusage.googleapis.com/billing-enabled'. For Google APIs, a Terms of Service requirement must be included here. Google Cloud APIs must include "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include "serviceusage.googleapis.com/tos/universal". Additional ToS can be included based on the business needs. */
  requirements?: Array<string>;
}

export const Usage: Schema.Schema<Usage> = Schema.suspend(() => Schema.Struct({
  producerNotificationChannel: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(UsageRule)),
  requirements: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Usage" }) as any as Schema.Schema<Usage>;

export interface SourceInfo {
  /** All files used during config generation. */
  sourceFiles?: Array<Record<string, unknown>>;
}

export const SourceInfo: Schema.Schema<SourceInfo> = Schema.suspend(() => Schema.Struct({
  sourceFiles: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "SourceInfo" }) as any as Schema.Schema<SourceInfo>;

export interface DocumentationRule {
  /** Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element. */
  description?: string;
  /** Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`. */
  deprecationDescription?: string;
  /** The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used. */
  selector?: string;
  /** String of comma or space separated case-sensitive words for which method/field name replacement will be disabled. */
  disableReplacementWords?: string;
}

export const DocumentationRule: Schema.Schema<DocumentationRule> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  deprecationDescription: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
  disableReplacementWords: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentationRule" }) as any as Schema.Schema<DocumentationRule>;

export interface Page {
  /** The Markdown content of the page. You can use ```(== include {path} ==)``` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page. */
  content?: string;
  /** Subpages of this page. The order of subpages specified here will be honored in the generated docset. */
  subpages?: Array<Page>;
  /** The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`. */
  name?: string;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  subpages: Schema.optional(Schema.Array(Page)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface Documentation {
  /** Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions. */
  additionalIamInfo?: string;
  /** Declares a single overview page. For example: documentation: summary: ... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary: ... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field. */
  overview?: string;
  /** Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to. */
  serviceRootUrl?: string;
  /** The URL to the root of documentation. */
  documentationRootUrl?: string;
  /** A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<DocumentationRule>;
  /** Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries */
  sectionOverrides?: Array<Page>;
  /** The top level pages for the documentation set. */
  pages?: Array<Page>;
  /** A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`. */
  summary?: string;
}

export const Documentation: Schema.Schema<Documentation> = Schema.suspend(() => Schema.Struct({
  additionalIamInfo: Schema.optional(Schema.String),
  overview: Schema.optional(Schema.String),
  serviceRootUrl: Schema.optional(Schema.String),
  documentationRootUrl: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(DocumentationRule)),
  sectionOverrides: Schema.optional(Schema.Array(Page)),
  pages: Schema.optional(Schema.Array(Page)),
  summary: Schema.optional(Schema.String),
})).annotate({ identifier: "Documentation" }) as any as Schema.Schema<Documentation>;

export interface SystemParameter {
  /** Define the name of the parameter, such as "api_key" . It is case sensitive. */
  name?: string;
  /** Define the HTTP header name to use for the parameter. It is case insensitive. */
  httpHeader?: string;
  /** Define the URL query parameter name to use for the parameter. It is case sensitive. */
  urlQueryParameter?: string;
}

export const SystemParameter: Schema.Schema<SystemParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  httpHeader: Schema.optional(Schema.String),
  urlQueryParameter: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemParameter" }) as any as Schema.Schema<SystemParameter>;

export interface SystemParameterRule {
  /** Define parameters. Multiple names may be defined for a parameter. For a given method call, only one of them should be used. If multiple names are used the behavior is implementation-dependent. If none of the specified names are present the behavior is parameter-dependent. */
  parameters?: Array<SystemParameter>;
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
}

export const SystemParameterRule: Schema.Schema<SystemParameterRule> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(SystemParameter)),
  selector: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemParameterRule" }) as any as Schema.Schema<SystemParameterRule>;

export interface SystemParameters {
  /** Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<SystemParameterRule>;
}

export const SystemParameters: Schema.Schema<SystemParameters> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(SystemParameterRule)),
})).annotate({ identifier: "SystemParameters" }) as any as Schema.Schema<SystemParameters>;

export interface JwtLocation {
  /** Specifies HTTP header name to extract JWT token. */
  header?: string;
  /** Specifies cookie name to extract JWT token. */
  cookie?: string;
  /** The value prefix. The value format is "value_prefix{token}" Only applies to "in" header type. Must be empty for "in" query type. If not empty, the header value has to match (case sensitive) this prefix. If not matched, JWT will not be extracted. If matched, JWT will be extracted after the prefix is removed. For example, for "Authorization: Bearer {JWT}", value_prefix="Bearer " with a space at the end. */
  valuePrefix?: string;
  /** Specifies URL query parameter name to extract JWT token. */
  query?: string;
}

export const JwtLocation: Schema.Schema<JwtLocation> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(Schema.String),
  cookie: Schema.optional(Schema.String),
  valuePrefix: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "JwtLocation" }) as any as Schema.Schema<JwtLocation>;

export interface AuthProvider {
  /** The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
  /** Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com */
  issuer?: string;
  /** The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth". */
  id?: string;
  /** Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token */
  jwtLocations?: Array<JwtLocation>;
  /** URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs */
  jwksUri?: string;
  /** Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec. */
  authorizationUrl?: string;
}

export const AuthProvider: Schema.Schema<AuthProvider> = Schema.suspend(() => Schema.Struct({
  audiences: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  jwtLocations: Schema.optional(Schema.Array(JwtLocation)),
  jwksUri: Schema.optional(Schema.String),
  authorizationUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthProvider" }) as any as Schema.Schema<AuthProvider>;

export interface AuthRequirement {
  /** id from authentication provider. Example: provider_id: bookstore_auth */
  providerId?: string;
  /** NOTE: This will be deprecated soon, once AuthProvider.audiences is implemented and accepted in all the runtime components. The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, only JWTs with audience "https://Service_name/API_name" will be accepted. For example, if no audiences are in the setting, LibraryService API will only accept JWTs with the following audience "https://library-example.googleapis.com/google.example.library.v1.LibraryService". Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
}

export const AuthRequirement: Schema.Schema<AuthRequirement> = Schema.suspend(() => Schema.Struct({
  providerId: Schema.optional(Schema.String),
  audiences: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthRequirement" }) as any as Schema.Schema<AuthRequirement>;

export interface OAuthRequirements {
  /** The list of publicly documented OAuth scopes that are allowed access. An OAuth token containing any of these scopes will be accepted. Example: canonical_scopes: https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.read */
  canonicalScopes?: string;
}

export const OAuthRequirements: Schema.Schema<OAuthRequirements> = Schema.suspend(() => Schema.Struct({
  canonicalScopes: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuthRequirements" }) as any as Schema.Schema<OAuthRequirements>;

export interface AuthenticationRule {
  /** Requirements for additional authentication providers. */
  requirements?: Array<AuthRequirement>;
  /** The requirements for OAuth credentials. */
  oauth?: OAuthRequirements;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests. */
  allowWithoutCredential?: boolean;
}

export const AuthenticationRule: Schema.Schema<AuthenticationRule> = Schema.suspend(() => Schema.Struct({
  requirements: Schema.optional(Schema.Array(AuthRequirement)),
  oauth: Schema.optional(OAuthRequirements),
  selector: Schema.optional(Schema.String),
  allowWithoutCredential: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AuthenticationRule" }) as any as Schema.Schema<AuthenticationRule>;

export interface Authentication {
  /** Defines a set of authentication providers that a service supports. */
  providers?: Array<AuthProvider>;
  /** A list of authentication rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<AuthenticationRule>;
}

export const Authentication: Schema.Schema<Authentication> = Schema.suspend(() => Schema.Struct({
  providers: Schema.optional(Schema.Array(AuthProvider)),
  rules: Schema.optional(Schema.Array(AuthenticationRule)),
})).annotate({ identifier: "Authentication" }) as any as Schema.Schema<Authentication>;

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

export interface EnumValue {
  /** Enum value name. */
  name?: string;
  /** Enum value number. */
  number?: number;
  /** Protocol buffer options. */
  options?: Array<Option>;
}

export const EnumValue: Schema.Schema<EnumValue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
  options: Schema.optional(Schema.Array(Option)),
})).annotate({ identifier: "EnumValue" }) as any as Schema.Schema<EnumValue>;

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`. */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

export interface Enum {
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** Enum value definitions. */
  enumvalue?: Array<EnumValue>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** Enum type name. */
  name?: string;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** Protocol buffer options. */
  options?: Array<Option>;
}

export const Enum: Schema.Schema<Enum> = Schema.suspend(() => Schema.Struct({
  edition: Schema.optional(Schema.String),
  enumvalue: Schema.optional(Schema.Array(EnumValue)),
  sourceContext: Schema.optional(SourceContext),
  name: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
})).annotate({ identifier: "Enum" }) as any as Schema.Schema<Enum>;

export interface MonitoringDestination {
  /** Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section. */
  metrics?: Array<string>;
  /** The monitored resource type. The type must be defined in Service.monitored_resources section. */
  monitoredResource?: string;
}

export const MonitoringDestination: Schema.Schema<MonitoringDestination> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(Schema.String)),
  monitoredResource: Schema.optional(Schema.String),
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

export interface LongRunning {
  /** Total polling timeout. Default value: 5 minutes. */
  totalPollTimeout?: string;
  /** Multiplier to gradually increase delay between subsequent polls until it reaches max_poll_delay. Default value: 1.5. */
  pollDelayMultiplier?: number;
  /** Initial delay after which the first poll request will be made. Default value: 5 seconds. */
  initialPollDelay?: string;
  /** Maximum time between two subsequent poll requests. Default value: 45 seconds. */
  maxPollDelay?: string;
}

export const LongRunning: Schema.Schema<LongRunning> = Schema.suspend(() => Schema.Struct({
  totalPollTimeout: Schema.optional(Schema.String),
  pollDelayMultiplier: Schema.optional(Schema.Number),
  initialPollDelay: Schema.optional(Schema.String),
  maxPollDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "LongRunning" }) as any as Schema.Schema<LongRunning>;

export interface BatchingDescriptorProto {
  /** Optional. When present, indicates the field in the response message to be used to demultiplex the response into multiple response messages, in correspondence with the multiple request messages originally batched together. */
  subresponseField?: string;
  /** The repeated field in the request message to be aggregated by batching. */
  batchedField?: string;
  /** A list of the fields in the request message. Two requests will be batched together only if the values of every field specified in `request_discriminator_fields` is equal between the two requests. */
  discriminatorFields?: Array<string>;
}

export const BatchingDescriptorProto: Schema.Schema<BatchingDescriptorProto> = Schema.suspend(() => Schema.Struct({
  subresponseField: Schema.optional(Schema.String),
  batchedField: Schema.optional(Schema.String),
  discriminatorFields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchingDescriptorProto" }) as any as Schema.Schema<BatchingDescriptorProto>;

export interface BatchingSettingsProto {
  /** The behavior to take when the flow control limit is exceeded. */
  flowControlLimitExceededBehavior?: "UNSET_BEHAVIOR" | "THROW_EXCEPTION" | "BLOCK" | "IGNORE" | (string & {});
  /** The duration after which a batch should be sent, starting from the addition of the first message to that batch. */
  delayThreshold?: string;
  /** The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent. */
  elementCountThreshold?: number;
  /** The maximum number of elements collected in a batch that could be accepted by server. */
  elementCountLimit?: number;
  /** The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message. */
  requestByteThreshold?: string;
  /** The maximum size of the request that could be accepted by server. */
  requestByteLimit?: number;
  /** The maximum size of data allowed by flow control. */
  flowControlByteLimit?: number;
  /** The maximum number of elements allowed by flow control. */
  flowControlElementLimit?: number;
}

export const BatchingSettingsProto: Schema.Schema<BatchingSettingsProto> = Schema.suspend(() => Schema.Struct({
  flowControlLimitExceededBehavior: Schema.optional(Schema.String),
  delayThreshold: Schema.optional(Schema.String),
  elementCountThreshold: Schema.optional(Schema.Number),
  elementCountLimit: Schema.optional(Schema.Number),
  requestByteThreshold: Schema.optional(Schema.String),
  requestByteLimit: Schema.optional(Schema.Number),
  flowControlByteLimit: Schema.optional(Schema.Number),
  flowControlElementLimit: Schema.optional(Schema.Number),
})).annotate({ identifier: "BatchingSettingsProto" }) as any as Schema.Schema<BatchingSettingsProto>;

export interface BatchingConfigProto {
  /** The request and response fields used in batching. */
  batchDescriptor?: BatchingDescriptorProto;
  /** The thresholds which trigger a batched request to be sent. */
  thresholds?: BatchingSettingsProto;
}

export const BatchingConfigProto: Schema.Schema<BatchingConfigProto> = Schema.suspend(() => Schema.Struct({
  batchDescriptor: Schema.optional(BatchingDescriptorProto),
  thresholds: Schema.optional(BatchingSettingsProto),
})).annotate({ identifier: "BatchingConfigProto" }) as any as Schema.Schema<BatchingConfigProto>;

export interface MethodSettings {
  /** List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id */
  autoPopulatedFields?: Array<string>;
  /** The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder... */
  selector?: string;
  /** Describes settings to use for long-running operations when generating API methods for RPCs. Complements RPCs that use the annotations in google/longrunning/operations.proto. Example of a YAML configuration:: publishing: method_settings: - selector: google.cloud.speech.v2.Speech.BatchRecognize long_running: initial_poll_delay: 60s # 1 minute poll_delay_multiplier: 1.5 max_poll_delay: 360s # 6 minutes total_poll_timeout: 54000s # 90 minutes */
  longRunning?: LongRunning;
  /** Batching configuration for an API method in client libraries. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.BatchCreateExample batching: element_count_threshold: 1000 request_byte_threshold: 100000000 delay_threshold_millis: 10 */
  batching?: BatchingConfigProto;
}

export const MethodSettings: Schema.Schema<MethodSettings> = Schema.suspend(() => Schema.Struct({
  autoPopulatedFields: Schema.optional(Schema.Array(Schema.String)),
  selector: Schema.optional(Schema.String),
  longRunning: Schema.optional(LongRunning),
  batching: Schema.optional(BatchingConfigProto),
})).annotate({ identifier: "MethodSettings" }) as any as Schema.Schema<MethodSettings>;

export interface CppSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const CppSettings: Schema.Schema<CppSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "CppSettings" }) as any as Schema.Schema<CppSettings>;

export interface NodeSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const NodeSettings: Schema.Schema<NodeSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "NodeSettings" }) as any as Schema.Schema<NodeSettings>;

export interface GoSettings {
  /** Map of service names to renamed services. Keys are the package relative service names and values are the name to be used for the service client and call options. Example: publishing: go_settings: renamed_services: Publisher: TopicAdmin */
  renamedServices?: Record<string, string>;
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const GoSettings: Schema.Schema<GoSettings> = Schema.suspend(() => Schema.Struct({
  renamedServices: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "GoSettings" }) as any as Schema.Schema<GoSettings>;

export interface JavaSettings {
  /** The package name to use in Java. Clobbers the java_package option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.java.package_name" field in gapic.yaml. API teams should use the protobuf java_package option where possible. Example of a YAML configuration:: publishing: library_settings: java_settings: library_package: com.google.cloud.pubsub.v1 */
  libraryPackage?: string;
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Configure the Java class name to use instead of the service's for its corresponding generated GAPIC client. Keys are fully-qualified service names as they appear in the protobuf (including the full the language_settings.java.interface_names" field in gapic.yaml. API teams should otherwise use the service name as it appears in the protobuf. Example of a YAML configuration:: publishing: java_settings: service_class_names: - google.pubsub.v1.Publisher: TopicAdmin - google.pubsub.v1.Subscriber: SubscriptionAdmin */
  serviceClassNames?: Record<string, string>;
}

export const JavaSettings: Schema.Schema<JavaSettings> = Schema.suspend(() => Schema.Struct({
  libraryPackage: Schema.optional(Schema.String),
  common: Schema.optional(CommonLanguageSettings),
  serviceClassNames: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "JavaSettings" }) as any as Schema.Schema<JavaSettings>;

export interface DotnetSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset" */
  renamedResources?: Record<string, string>;
  /** Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision */
  forcedNamespaceAliases?: Array<string>;
  /** Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn't be generated. Snippets *calling* these methods are still generated, however. */
  handwrittenSignatures?: Array<string>;
  /** List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location" */
  ignoredResources?: Array<string>;
  /** Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi. */
  renamedServices?: Record<string, string>;
}

export const DotnetSettings: Schema.Schema<DotnetSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
  renamedResources: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  forcedNamespaceAliases: Schema.optional(Schema.Array(Schema.String)),
  handwrittenSignatures: Schema.optional(Schema.Array(Schema.String)),
  ignoredResources: Schema.optional(Schema.Array(Schema.String)),
  renamedServices: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DotnetSettings" }) as any as Schema.Schema<DotnetSettings>;

export interface ExperimentalFeatures {
  /** Enables generation of asynchronous REST clients if `rest` transport is enabled. By default, asynchronous REST clients will not be generated. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  restAsyncIoEnabled?: boolean;
  /** Enables generation of protobuf code using new types that are more Pythonic which are included in `protobuf>=5.29.x`. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  protobufPythonicTypesEnabled?: boolean;
  /** Disables generation of an unversioned Python package for this client library. This means that the module names will need to be versioned in import statements. For example `import google.cloud.library_v2` instead of `import google.cloud.library`. */
  unversionedPackageDisabled?: boolean;
}

export const ExperimentalFeatures: Schema.Schema<ExperimentalFeatures> = Schema.suspend(() => Schema.Struct({
  restAsyncIoEnabled: Schema.optional(Schema.Boolean),
  protobufPythonicTypesEnabled: Schema.optional(Schema.Boolean),
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

export interface RubySettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const RubySettings: Schema.Schema<RubySettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "RubySettings" }) as any as Schema.Schema<RubySettings>;

export interface ClientLibrarySettings {
  /** Settings for C++ client libraries. */
  cppSettings?: CppSettings;
  /** Settings for Node client libraries. */
  nodeSettings?: NodeSettings;
  /** When using transport=rest, the client request will encode enums as numbers rather than strings. */
  restNumericEnums?: boolean;
  /** Settings for PHP client libraries. */
  phpSettings?: PhpSettings;
  /** Settings for Go client libraries. */
  goSettings?: GoSettings;
  /** Launch stage of this version of the API. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1". */
  version?: string;
  /** Settings for legacy Java features, supported in the Service YAML. */
  javaSettings?: JavaSettings;
  /** Settings for .NET client libraries. */
  dotnetSettings?: DotnetSettings;
  /** Settings for Python client libraries. */
  pythonSettings?: PythonSettings;
  /** Settings for Ruby client libraries. */
  rubySettings?: RubySettings;
}

export const ClientLibrarySettings: Schema.Schema<ClientLibrarySettings> = Schema.suspend(() => Schema.Struct({
  cppSettings: Schema.optional(CppSettings),
  nodeSettings: Schema.optional(NodeSettings),
  restNumericEnums: Schema.optional(Schema.Boolean),
  phpSettings: Schema.optional(PhpSettings),
  goSettings: Schema.optional(GoSettings),
  launchStage: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  javaSettings: Schema.optional(JavaSettings),
  dotnetSettings: Schema.optional(DotnetSettings),
  pythonSettings: Schema.optional(PythonSettings),
  rubySettings: Schema.optional(RubySettings),
})).annotate({ identifier: "ClientLibrarySettings" }) as any as Schema.Schema<ClientLibrarySettings>;

export interface Publishing {
  /** Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc */
  protoReferenceDocumentationUri?: string;
  /** Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech". */
  apiShortName?: string;
  /** Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103 */
  newIssueUri?: string;
  /** A prefix used in sample code when demarking regions to be included in documentation. */
  docTagPrefix?: string;
  /** GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API. */
  codeownerGithubTeams?: Array<string>;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  githubLabel?: string;
  /** For whom the client library is being published. */
  organization?: "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED" | "CLOUD" | "ADS" | "PHOTOS" | "STREET_VIEW" | "SHOPPING" | "GEO" | "GENERATIVE_AI" | (string & {});
  /** A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern. */
  methodSettings?: Array<MethodSettings>;
  /** Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview */
  documentationUri?: string;
  /** Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded. */
  librarySettings?: Array<ClientLibrarySettings>;
  /** Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest */
  restReferenceDocumentationUri?: string;
}

export const Publishing: Schema.Schema<Publishing> = Schema.suspend(() => Schema.Struct({
  protoReferenceDocumentationUri: Schema.optional(Schema.String),
  apiShortName: Schema.optional(Schema.String),
  newIssueUri: Schema.optional(Schema.String),
  docTagPrefix: Schema.optional(Schema.String),
  codeownerGithubTeams: Schema.optional(Schema.Array(Schema.String)),
  githubLabel: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  methodSettings: Schema.optional(Schema.Array(MethodSettings)),
  documentationUri: Schema.optional(Schema.String),
  librarySettings: Schema.optional(Schema.Array(ClientLibrarySettings)),
  restReferenceDocumentationUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Publishing" }) as any as Schema.Schema<Publishing>;

export interface ContextRule {
  /** A list of full type names of requested contexts, only the requested context will be made available to the backend. */
  requested?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client. */
  allowedResponseExtensions?: Array<string>;
  /** A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension. */
  provided?: Array<string>;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend. */
  allowedRequestExtensions?: Array<string>;
}

export const ContextRule: Schema.Schema<ContextRule> = Schema.suspend(() => Schema.Struct({
  requested: Schema.optional(Schema.Array(Schema.String)),
  allowedResponseExtensions: Schema.optional(Schema.Array(Schema.String)),
  provided: Schema.optional(Schema.Array(Schema.String)),
  selector: Schema.optional(Schema.String),
  allowedRequestExtensions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContextRule" }) as any as Schema.Schema<ContextRule>;

export interface Context {
  /** A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<ContextRule>;
}

export const Context: Schema.Schema<Context> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(ContextRule)),
})).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

export interface Field {
  /** The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`. */
  typeUrl?: string;
  /** The field name. */
  name?: string;
  /** The field number. */
  number?: number;
  /** Whether to use alternative packed wire representation. */
  packed?: boolean;
  /** The field cardinality. */
  cardinality?: "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED" | (string & {});
  /** The field type. */
  kind?: "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64" | (string & {});
  /** The string value of the default value of this field. Proto2 syntax only. */
  defaultValue?: string;
  /** The field JSON name. */
  jsonName?: string;
  /** The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list. */
  oneofIndex?: number;
  /** The protocol buffer options. */
  options?: Array<Option>;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  typeUrl: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
  packed: Schema.optional(Schema.Boolean),
  cardinality: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  jsonName: Schema.optional(Schema.String),
  oneofIndex: Schema.optional(Schema.Number),
  options: Schema.optional(Schema.Array(Option)),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface Type {
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The list of fields. */
  fields?: Array<Field>;
  /** The fully qualified message name. */
  name?: string;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The list of types appearing in `oneof` definitions in this type. */
  oneofs?: Array<string>;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  sourceContext: Schema.optional(SourceContext),
  syntax: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Field)),
  name: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  oneofs: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

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

export interface BillingDestination {
  /** Names of the metrics to report to this billing destination. Each name must be defined in Service.metrics section. */
  metrics?: Array<string>;
  /** The monitored resource type. The type must be defined in Service.monitored_resources section. */
  monitoredResource?: string;
}

export const BillingDestination: Schema.Schema<BillingDestination> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(Schema.String)),
  monitoredResource: Schema.optional(Schema.String),
})).annotate({ identifier: "BillingDestination" }) as any as Schema.Schema<BillingDestination>;

export interface Billing {
  /** Billing configurations for sending metrics to the consumer project. There can be multiple consumer destinations per service, each one must have a different monitored resource type. A metric can be used in at most one consumer destination. */
  consumerDestinations?: Array<BillingDestination>;
}

export const Billing: Schema.Schema<Billing> = Schema.suspend(() => Schema.Struct({
  consumerDestinations: Schema.optional(Schema.Array(BillingDestination)),
})).annotate({ identifier: "Billing" }) as any as Schema.Schema<Billing>;

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
  /** Logging configurations for sending logs to the producer project. There can be multiple producer destinations, each one must have a different monitored resource type. A log can be used in at most one producer destination. */
  producerDestinations?: Array<LoggingDestination>;
  /** Logging configurations for sending logs to the consumer project. There can be multiple consumer destinations, each one must have a different monitored resource type. A log can be used in at most one consumer destination. */
  consumerDestinations?: Array<LoggingDestination>;
}

export const Logging: Schema.Schema<Logging> = Schema.suspend(() => Schema.Struct({
  producerDestinations: Schema.optional(Schema.Array(LoggingDestination)),
  consumerDestinations: Schema.optional(Schema.Array(LoggingDestination)),
})).annotate({ identifier: "Logging" }) as any as Schema.Schema<Logging>;

export interface Method {
  /** The simple name of this method. */
  name?: string;
  /** The URL of the output message type. */
  responseTypeUrl?: string;
  /** The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** Any metadata attached to the method. */
  options?: Array<Option>;
  /** If true, the response is streamed. */
  responseStreaming?: boolean;
  /** If true, the request is streamed. */
  requestStreaming?: boolean;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue. */
  edition?: string;
  /** A URL of the input message type. */
  requestTypeUrl?: string;
}

export const Method: Schema.Schema<Method> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  responseTypeUrl: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  responseStreaming: Schema.optional(Schema.Boolean),
  requestStreaming: Schema.optional(Schema.Boolean),
  edition: Schema.optional(Schema.String),
  requestTypeUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Method" }) as any as Schema.Schema<Method>;

export interface Mixin {
  /** If non-empty specifies a path under which inherited HTTP paths are rooted. */
  root?: string;
  /** The fully qualified name of the interface which is included. */
  name?: string;
}

export const Mixin: Schema.Schema<Mixin> = Schema.suspend(() => Schema.Struct({
  root: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Mixin" }) as any as Schema.Schema<Mixin>;

export interface Api {
  /** The methods of this interface, in unspecified order. */
  methods?: Array<Method>;
  /** Any metadata attached to the interface. */
  options?: Array<Option>;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The fully qualified name of this interface, including package name followed by the interface's simple name. */
  name?: string;
  /** A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces. */
  version?: string;
  /** The source syntax of the service. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** Source context for the protocol buffer service represented by this message. */
  sourceContext?: SourceContext;
  /** Included interfaces. See Mixin. */
  mixins?: Array<Mixin>;
}

export const Api: Schema.Schema<Api> = Schema.suspend(() => Schema.Struct({
  methods: Schema.optional(Schema.Array(Method)),
  options: Schema.optional(Schema.Array(Option)),
  edition: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  sourceContext: Schema.optional(SourceContext),
  mixins: Schema.optional(Schema.Array(Mixin)),
})).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface QuotaLimit {
  /** Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported. */
  values?: Record<string, string>;
  /** Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only. */
  maxLimit?: string;
  /** Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only. */
  duration?: string;
  /** Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters. */
  name?: string;
  /** Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only. */
  defaultLimit?: string;
  /** Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only. */
  freeTier?: string;
  /** Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax. */
  unit?: string;
  /** Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`). */
  description?: string;
  /** User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration. */
  displayName?: string;
  /** The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config. */
  metric?: string;
}

export const QuotaLimit: Schema.Schema<QuotaLimit> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maxLimit: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  defaultLimit: Schema.optional(Schema.String),
  freeTier: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
})).annotate({ identifier: "QuotaLimit" }) as any as Schema.Schema<QuotaLimit>;

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

export interface Quota {
  /** List of QuotaLimit definitions for the service. */
  limits?: Array<QuotaLimit>;
  /** List of MetricRule definitions, each one mapping a selected method to one or more metrics. */
  metricRules?: Array<MetricRule>;
}

export const Quota: Schema.Schema<Quota> = Schema.suspend(() => Schema.Struct({
  limits: Schema.optional(Schema.Array(QuotaLimit)),
  metricRules: Schema.optional(Schema.Array(MetricRule)),
})).annotate({ identifier: "Quota" }) as any as Schema.Schema<Quota>;

export interface BackendRule {
  /** no-lint */
  pathTranslation?: "PATH_TRANSLATION_UNSPECIFIED" | "CONSTANT_ADDRESS" | "APPEND_PATH_TO_ADDRESS" | (string & {});
  /** The map between request protocol and the backend address. */
  overridesByRequestProtocol?: Record<string, BackendRule>;
  /** The number of seconds to wait for the completion of a long running operation. The default is no deadline. */
  operationDeadline?: number;
  /** The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend. */
  jwtAudience?: string;
  /** The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin". */
  loadBalancingPolicy?: string;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values. */
  protocol?: string;
  /** Deprecated, do not use. */
  minDeadline?: number;
  /** The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment. */
  deadline?: number;
  /** The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version. */
  address?: string;
  /** When disable_auth is true, a JWT ID token won't be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header. */
  disableAuth?: boolean;
}

export const BackendRule: Schema.Schema<BackendRule> = Schema.suspend(() => Schema.Struct({
  pathTranslation: Schema.optional(Schema.String),
  overridesByRequestProtocol: Schema.optional(Schema.Record(Schema.String, BackendRule)),
  operationDeadline: Schema.optional(Schema.Number),
  jwtAudience: Schema.optional(Schema.String),
  loadBalancingPolicy: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  minDeadline: Schema.optional(Schema.Number),
  deadline: Schema.optional(Schema.Number),
  address: Schema.optional(Schema.String),
  disableAuth: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BackendRule" }) as any as Schema.Schema<BackendRule>;

export interface Backend {
  /** A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<BackendRule>;
}

export const Backend: Schema.Schema<Backend> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(BackendRule)),
})).annotate({ identifier: "Backend" }) as any as Schema.Schema<Backend>;

export interface MetricDescriptorMetadata {
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<"TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED" | "PROJECT" | "ORGANIZATION" | "FOLDER" | (string & {})>;
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> = Schema.suspend(() => Schema.Struct({
  samplePeriod: Schema.optional(Schema.String),
  ingestDelay: Schema.optional(Schema.String),
  timeSeriesResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricDescriptorMetadata" }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface MetricDescriptor {
  /** The resource name of the metric descriptor. */
  name?: string;
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
  /** The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent"). */
  unit?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Optional. The launch stage of the metric definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  metricKind: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
  unit: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
  metadata: Schema.optional(MetricDescriptorMetadata),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricDescriptor" }) as any as Schema.Schema<MetricDescriptor>;

export interface FieldPolicy {
  /** Selects one or more request or response message fields to apply this `FieldPolicy`. When a `FieldPolicy` is used in proto annotation, the selector must be left as empty. The service config generator will automatically fill the correct value. When a `FieldPolicy` is used in service config, the selector must be a comma-separated string with valid request or response field paths, such as "foo.bar" or "foo.bar,foo.baz". */
  selector?: string;
  /** Specifies the required permission(s) for the resource referred to by the field. It requires the field contains a valid resource reference, and the request must pass the permission checks to proceed. For example, "resourcemanager.projects.get". */
  resourcePermission?: string;
  /** Specifies the resource type for the resource referred to by the field. */
  resourceType?: string;
}

export const FieldPolicy: Schema.Schema<FieldPolicy> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  resourcePermission: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
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

export interface AspectRule {
  /** Required. Rules of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  config?: Record<string, unknown>;
  /** Required. Selects the RPC methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
}

export const AspectRule: Schema.Schema<AspectRule> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  selector: Schema.optional(Schema.String),
})).annotate({ identifier: "AspectRule" }) as any as Schema.Schema<AspectRule>;

export interface Aspect {
  /** The type of this aspect configuration. */
  kind?: string;
  /** Content of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  spec?: Record<string, unknown>;
  /** Optional. Rules of the Configuration. */
  rules?: Array<AspectRule>;
}

export const Aspect: Schema.Schema<Aspect> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  spec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  rules: Schema.optional(Schema.Array(AspectRule)),
})).annotate({ identifier: "Aspect" }) as any as Schema.Schema<Aspect>;

export interface Endpoint {
  /** The canonical name of this endpoint. */
  name?: string;
  /** The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com". */
  target?: string;
  /** Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints. */
  aliases?: Array<string>;
  /** Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed. */
  allowCors?: boolean;
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  aliases: Schema.optional(Schema.Array(Schema.String)),
  allowCors: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface CustomErrorRule {
  /** Mark this message as possible payload in error response. Otherwise, objects of this type will be filtered when they appear in error payload. */
  isErrorType?: boolean;
  /** Selects messages to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
}

export const CustomErrorRule: Schema.Schema<CustomErrorRule> = Schema.suspend(() => Schema.Struct({
  isErrorType: Schema.optional(Schema.Boolean),
  selector: Schema.optional(Schema.String),
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
  /** Maps to HTTP DELETE. Used for deleting a resource. */
  delete?: string;
  /** Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep). */
  additionalBindings?: Array<HttpRule>;
  /** Maps to HTTP PATCH. Used for updating a resource. */
  patch?: string;
  /** Maps to HTTP GET. Used for listing and getting information about resources. */
  get?: string;
  /** Selects a method to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Maps to HTTP PUT. Used for replacing a resource. */
  put?: string;
  /** The custom pattern is used for specifying an HTTP method that is not included in the `pattern` field, such as HEAD, or "*" to leave the HTTP method unspecified for this rule. The wild-card rule is useful for services that provide content to Web (HTML) clients. */
  custom?: CustomHttpPattern;
  /** Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type. */
  responseBody?: string;
  /** The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type. */
  body?: string;
  /** Maps to HTTP POST. Used for creating a resource or performing an action. */
  post?: string;
}

export const HttpRule: Schema.Schema<HttpRule> = Schema.suspend(() => Schema.Struct({
  delete: Schema.optional(Schema.String),
  additionalBindings: Schema.optional(Schema.Array(HttpRule)),
  patch: Schema.optional(Schema.String),
  get: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
  put: Schema.optional(Schema.String),
  custom: Schema.optional(CustomHttpPattern),
  responseBody: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  post: Schema.optional(Schema.String),
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

export interface Service {
  /** The product title for this service, it is the name displayed in Google Cloud Console. */
  title?: string;
  /** Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations. */
  monitoredResources?: Array<MonitoredResourceDescriptor>;
  /** Configuration controlling usage of this service. */
  usage?: Usage;
  /** The Google project that owns this service. */
  producerProjectId?: string;
  /** Output only. The source information for this configuration if available. */
  sourceInfo?: SourceInfo;
  /** Additional API documentation. */
  documentation?: Documentation;
  /** System parameter configuration. */
  systemParameters?: SystemParameters;
  /** Auth configuration. */
  authentication?: Authentication;
  /** The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name. */
  name?: string;
  /** A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum */
  enums?: Array<Enum>;
  /** Monitoring configuration. */
  monitoring?: Monitoring;
  /** Settings for [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from APIs defined as protocol buffers. */
  publishing?: Publishing;
  /** Context configuration. */
  context?: Context;
  /** A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF. */
  systemTypes?: Array<Type>;
  /** Defines the logs used by this service. */
  logs?: Array<LogDescriptor>;
  /** Billing configuration. */
  billing?: Billing;
  /** Logging configuration. */
  logging?: Logging;
  /** Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`. */
  configVersion?: number;
  /** A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32 */
  types?: Array<Type>;
  /** A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files. */
  apis?: Array<Api>;
  /** Quota configuration. */
  quota?: Quota;
  /** A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead. */
  id?: string;
  /** API backend configuration. */
  backend?: Backend;
  /** Defines the metrics used by this service. */
  metrics?: Array<MetricDescriptor>;
  /** Configuration for the service control plane. */
  control?: Control;
  /** Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners. */
  aspects?: Array<Aspect>;
  /** Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs. WARNING: Defining any entries in the `endpoints` list disables the automatic generation of default endpoint variations (e.g., `{service}.clients6.google.com`, `content-{service}.googleapis.com`, and mTLS variants like `{service}.mtls.googleapis.com`). To retain these default variations, you are required to explicitly include your main service endpoint (e.g., `myservice.googleapis.com`) in this list alongside any other custom endpoints (like REP, GFE, etc.). */
  endpoints?: Array<Endpoint>;
  /** Custom error configuration. */
  customError?: CustomError;
  /** HTTP configuration. */
  http?: Http;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  monitoredResources: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  usage: Schema.optional(Usage),
  producerProjectId: Schema.optional(Schema.String),
  sourceInfo: Schema.optional(SourceInfo),
  documentation: Schema.optional(Documentation),
  systemParameters: Schema.optional(SystemParameters),
  authentication: Schema.optional(Authentication),
  name: Schema.optional(Schema.String),
  enums: Schema.optional(Schema.Array(Enum)),
  monitoring: Schema.optional(Monitoring),
  publishing: Schema.optional(Publishing),
  context: Schema.optional(Context),
  systemTypes: Schema.optional(Schema.Array(Type)),
  logs: Schema.optional(Schema.Array(LogDescriptor)),
  billing: Schema.optional(Billing),
  logging: Schema.optional(Logging),
  configVersion: Schema.optional(Schema.Number),
  types: Schema.optional(Schema.Array(Type)),
  apis: Schema.optional(Schema.Array(Api)),
  quota: Schema.optional(Quota),
  id: Schema.optional(Schema.String),
  backend: Schema.optional(Backend),
  metrics: Schema.optional(Schema.Array(MetricDescriptor)),
  control: Schema.optional(Control),
  aspects: Schema.optional(Schema.Array(Aspect)),
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  customError: Schema.optional(CustomError),
  http: Schema.optional(Http),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface SubmitConfigSourceResponse {
  /** The generated service configuration. */
  serviceConfig?: Service;
}

export const SubmitConfigSourceResponse: Schema.Schema<SubmitConfigSourceResponse> = Schema.suspend(() => Schema.Struct({
  serviceConfig: Schema.optional(Service),
})).annotate({ identifier: "SubmitConfigSourceResponse" }) as any as Schema.Schema<SubmitConfigSourceResponse>;

export interface Advice {
  /** Useful description for why this advice was applied and what actions should be taken to mitigate any implied risks. */
  description?: string;
}

export const Advice: Schema.Schema<Advice> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Advice" }) as any as Schema.Schema<Advice>;

export interface ConfigChange {
  /** Value of the changed object in the old Service configuration, in JSON format. This field will not be populated if ChangeType == ADDED. */
  oldValue?: string;
  /** Object hierarchy path to the change, with levels separated by a '.' character. For repeated fields, an applicable unique identifier field is used for the index (usually selector, name, or id). For maps, the term 'key' is used. If the field has no unique identifier, the numeric index is used. Examples: - visibility.rules[selector=="google.LibraryService.ListBooks"].restriction - quota.metric_rules[selector=="google"].metric_costs[key=="reads"].value - logging.producer_destinations[0] */
  element?: string;
  /** Collection of advice provided for this change, useful for determining the possible impact of this change. */
  advices?: Array<Advice>;
  /** The type for this change, either ADDED, REMOVED, or MODIFIED. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "ADDED" | "REMOVED" | "MODIFIED" | (string & {});
  /** Value of the changed object in the new Service configuration, in JSON format. This field will not be populated if ChangeType == REMOVED. */
  newValue?: string;
}

export const ConfigChange: Schema.Schema<ConfigChange> = Schema.suspend(() => Schema.Struct({
  oldValue: Schema.optional(Schema.String),
  element: Schema.optional(Schema.String),
  advices: Schema.optional(Schema.Array(Advice)),
  changeType: Schema.optional(Schema.String),
  newValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigChange" }) as any as Schema.Schema<ConfigChange>;

export interface ChangeReport {
  /** List of changes between two service configurations. The changes will be alphabetically sorted based on the identifier of each change. A ConfigChange identifier is a dot separated path to the configuration. Example: visibility.rules[selector='LibraryService.CreateBook'].restriction */
  configChanges?: Array<ConfigChange>;
}

export const ChangeReport: Schema.Schema<ChangeReport> = Schema.suspend(() => Schema.Struct({
  configChanges: Schema.optional(Schema.Array(ConfigChange)),
})).annotate({ identifier: "ChangeReport" }) as any as Schema.Schema<ChangeReport>;

export interface OperationInfo {
  /** Required. The message name of the primary return type for this long-running operation. This type will be used to deserialize the LRO's response. If the response is in a different package from the rpc, a fully-qualified message name must be used (e.g. `google.protobuf.Struct`). Note: Altering this value constitutes a breaking change. */
  responseType?: string;
  /** Required. The message name of the metadata type for this long-running operation. If the response is in a different package from the rpc, a fully-qualified message name must be used (e.g. `google.protobuf.Struct`). Note: Altering this value constitutes a breaking change. */
  metadataType?: string;
}

export const OperationInfo: Schema.Schema<OperationInfo> = Schema.suspend(() => Schema.Struct({
  responseType: Schema.optional(Schema.String),
  metadataType: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationInfo" }) as any as Schema.Schema<OperationInfo>;

export interface ManagedService {
  /** The name of the service. See the [overview](https://cloud.google.com/service-infrastructure/docs/overview) for naming requirements. */
  serviceName?: string;
  /** ID of the project that produces and owns this service. */
  producerProjectId?: string;
}

export const ManagedService: Schema.Schema<ManagedService> = Schema.suspend(() => Schema.Struct({
  serviceName: Schema.optional(Schema.String),
  producerProjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedService" }) as any as Schema.Schema<ManagedService>;

export interface Step {
  /** The short description of the step. */
  description?: string;
  /** The status code. */
  status?: "STATUS_UNSPECIFIED" | "DONE" | "NOT_STARTED" | "IN_PROGRESS" | "FAILED" | "CANCELLED" | (string & {});
}

export const Step: Schema.Schema<Step> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "Step" }) as any as Schema.Schema<Step>;

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
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  done: Schema.optional(Schema.Boolean),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface DeleteServiceStrategy {
}

export const DeleteServiceStrategy: Schema.Schema<DeleteServiceStrategy> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteServiceStrategy" }) as any as Schema.Schema<DeleteServiceStrategy>;

export interface ListServicesResponse {
  /** Token that can be passed to `ListServices` to resume a paginated query. */
  nextPageToken?: string;
  /** The returned services will only have the name field set. */
  services?: Array<ManagedService>;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(ManagedService)),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface ConfigFile {
  /** The file name of the configuration file (full or relative path). */
  filePath?: string;
  /** The bytes that constitute the file. */
  fileContents?: string;
  /** The type of configuration file this represents. */
  fileType?: "FILE_TYPE_UNSPECIFIED" | "SERVICE_CONFIG_YAML" | "OPEN_API_JSON" | "OPEN_API_YAML" | "FILE_DESCRIPTOR_SET_PROTO" | "PROTO_FILE" | (string & {});
}

export const ConfigFile: Schema.Schema<ConfigFile> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
  fileContents: Schema.optional(Schema.String),
  fileType: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigFile" }) as any as Schema.Schema<ConfigFile>;

export interface ConfigSource {
  /** A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. If empty, the server may choose to generate one instead. */
  id?: string;
  /** Set of source configuration files that are used to generate a service configuration (`google.api.Service`). */
  files?: Array<ConfigFile>;
}

export const ConfigSource: Schema.Schema<ConfigSource> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  files: Schema.optional(Schema.Array(ConfigFile)),
})).annotate({ identifier: "ConfigSource" }) as any as Schema.Schema<ConfigSource>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  version: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface Diagnostic {
  /** Message describing the error or warning. */
  message?: string;
  /** File name and line number of the error or warning. */
  location?: string;
  /** The kind of diagnostic information provided. */
  kind?: "WARNING" | "ERROR" | (string & {});
}

export const Diagnostic: Schema.Schema<Diagnostic> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Diagnostic" }) as any as Schema.Schema<Diagnostic>;

export interface GenerateConfigReportResponse {
  /** ID of the service configuration this report belongs to. */
  id?: string;
  /** Name of the service this report belongs to. */
  serviceName?: string;
  /** Errors / Linter warnings associated with the service definition this report belongs to. */
  diagnostics?: Array<Diagnostic>;
  /** list of ChangeReport, each corresponding to comparison between two service configurations. */
  changeReports?: Array<ChangeReport>;
}

export const GenerateConfigReportResponse: Schema.Schema<GenerateConfigReportResponse> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  diagnostics: Schema.optional(Schema.Array(Diagnostic)),
  changeReports: Schema.optional(Schema.Array(ChangeReport)),
})).annotate({ identifier: "GenerateConfigReportResponse" }) as any as Schema.Schema<GenerateConfigReportResponse>;

export interface UndeleteServiceResponse {
  /** Revived service resource. */
  service?: ManagedService;
}

export const UndeleteServiceResponse: Schema.Schema<UndeleteServiceResponse> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(ManagedService),
})).annotate({ identifier: "UndeleteServiceResponse" }) as any as Schema.Schema<UndeleteServiceResponse>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface Rollout {
  /** Google Service Control selects service configurations based on traffic percentage. */
  trafficPercentStrategy?: TrafficPercentStrategy;
  /** Optional. Unique identifier of this Rollout. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If not specified by client, the server will generate one. The generated id will have the form of , where "date" is the create date in ISO 8601 format. "revision number" is a monotonically increasing positive number that is reset every day for each service. An example of the generated rollout_id is '2016-02-16r1' */
  rolloutId?: string;
  /** The status of this rollout. Readonly. In case of a failed rollout, the system will automatically rollback to the current Rollout version. Readonly. */
  status?: "ROLLOUT_STATUS_UNSPECIFIED" | "IN_PROGRESS" | "SUCCESS" | "CANCELLED" | "FAILED" | "PENDING" | "FAILED_ROLLED_BACK" | (string & {});
  /** The name of the service associated with this Rollout. */
  serviceName?: string;
  /** The strategy associated with a rollout to delete a `ManagedService`. Readonly. */
  deleteServiceStrategy?: DeleteServiceStrategy;
  /** The user who created the Rollout. Readonly. */
  createdBy?: string;
  /** Creation time of the rollout. Readonly. */
  createTime?: string;
}

export const Rollout: Schema.Schema<Rollout> = Schema.suspend(() => Schema.Struct({
  trafficPercentStrategy: Schema.optional(TrafficPercentStrategy),
  rolloutId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  deleteServiceStrategy: Schema.optional(DeleteServiceStrategy),
  createdBy: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Rollout" }) as any as Schema.Schema<Rollout>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface GenerateConfigReportRequest {
  /** Required. Service configuration for which we want to generate the report. For this version of API, the supported types are google.api.servicemanagement.v1.ConfigRef, google.api.servicemanagement.v1.ConfigSource, and google.api.Service */
  newConfig?: Record<string, unknown>;
  /** Optional. Service configuration against which the comparison will be done. For this version of API, the supported types are google.api.servicemanagement.v1.ConfigRef, google.api.servicemanagement.v1.ConfigSource, and google.api.Service */
  oldConfig?: Record<string, unknown>;
}

export const GenerateConfigReportRequest: Schema.Schema<GenerateConfigReportRequest> = Schema.suspend(() => Schema.Struct({
  newConfig: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  oldConfig: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GenerateConfigReportRequest" }) as any as Schema.Schema<GenerateConfigReportRequest>;

export interface FlowErrorDetails {
  /** The step that failed. */
  flowStepId?: string;
  /** The type of exception (as a class name). */
  exceptionType?: string;
}

export const FlowErrorDetails: Schema.Schema<FlowErrorDetails> = Schema.suspend(() => Schema.Struct({
  flowStepId: Schema.optional(Schema.String),
  exceptionType: Schema.optional(Schema.String),
})).annotate({ identifier: "FlowErrorDetails" }) as any as Schema.Schema<FlowErrorDetails>;

export interface OperationMetadata {
  /** The full name of the resources that this operation is directly associated with. */
  resourceNames?: Array<string>;
  /** The start time of the operation. */
  startTime?: string;
  /** Detailed status information for each step. The order is undetermined. */
  steps?: Array<Step>;
  /** Percentage of completion of this operation, ranging from 0 to 100. */
  progressPercentage?: number;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
  startTime: Schema.optional(Schema.String),
  steps: Schema.optional(Schema.Array(Step)),
  progressPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ConfigRef {
  /** Resource name of a service config. It must have the following format: "services/{service name}/configs/{config id}". */
  name?: string;
}

export const ConfigRef: Schema.Schema<ConfigRef> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigRef" }) as any as Schema.Schema<ConfigRef>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface ResourceReference {
  /** The resource type of a child collection that the annotated field references. This is useful for annotating the `parent` field that doesn't have a fixed resource type. Example: message ListLogEntriesRequest { string parent = 1 [(google.api.resource_reference) = { child_type: "logging.googleapis.com/LogEntry" }; } */
  childType?: string;
  /** The resource type that the annotated field references. Example: message Subscription { string topic = 2 [(google.api.resource_reference) = { type: "pubsub.googleapis.com/Topic" }]; } Occasionally, a field may reference an arbitrary resource. In this case, APIs use the special value * in their resource reference. Example: message GetIamPolicyRequest { string resource = 2 [(google.api.resource_reference) = { type: "*" }]; } */
  type?: string;
}

export const ResourceReference: Schema.Schema<ResourceReference> = Schema.suspend(() => Schema.Struct({
  childType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceReference" }) as any as Schema.Schema<ResourceReference>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface ListServiceConfigsResponse {
  /** The list of service configuration resources. */
  serviceConfigs?: Array<Service>;
  /** The token of the next page of results. */
  nextPageToken?: string;
}

export const ListServiceConfigsResponse: Schema.Schema<ListServiceConfigsResponse> = Schema.suspend(() => Schema.Struct({
  serviceConfigs: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServiceConfigsResponse" }) as any as Schema.Schema<ListServiceConfigsResponse>;

export interface EnableServiceResponse {
}

export const EnableServiceResponse: Schema.Schema<EnableServiceResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableServiceResponse" }) as any as Schema.Schema<EnableServiceResponse>;

export interface SetIamPolicyRequest {
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface SubmitConfigSourceRequest {
  /** Optional. If set, this will result in the generation of a `google.api.Service` configuration based on the `ConfigSource` provided, but the generated config and the sources will NOT be persisted. */
  validateOnly?: boolean;
  /** Required. The source configuration for the service. */
  configSource?: ConfigSource;
}

export const SubmitConfigSourceRequest: Schema.Schema<SubmitConfigSourceRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  configSource: Schema.optional(ConfigSource),
})).annotate({ identifier: "SubmitConfigSourceRequest" }) as any as Schema.Schema<SubmitConfigSourceRequest>;

export interface ListServiceRolloutsResponse {
  /** The list of rollout resources. */
  rollouts?: Array<Rollout>;
  /** The token of the next page of results. */
  nextPageToken?: string;
}

export const ListServiceRolloutsResponse: Schema.Schema<ListServiceRolloutsResponse> = Schema.suspend(() => Schema.Struct({
  rollouts: Schema.optional(Schema.Array(Rollout)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServiceRolloutsResponse" }) as any as Schema.Schema<ListServiceRolloutsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists service operations that match the specified filter in the request. */
export interface ListOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** A string for filtering Operations. The following filter fields are supported: * serviceName: Required. Only `=` operator is allowed. * startTime: The time this job was started, in ISO 8601 format. Allowed operators are `>=`, `>`, `<=`, and `<`. * status: Can be `done`, `in_progress`, or `failed`. Allowed operators are `=`, and `!=`. Filter expression supports conjunction (AND) and disjunction (OR) logical operators. However, the serviceName restriction must be at the top-level and can only be combined with other restrictions via the AND logical operator. Examples: * `serviceName={some-service}.googleapis.com` * `serviceName={some-service}.googleapis.com AND startTime>="2017-02-01"` * `serviceName={some-service}.googleapis.com AND status=done` * `serviceName={some-service}.googleapis.com AND (status=done OR startTime>="2017-02-01")` */
  filter?: string;
  /** The maximum number of operations to return. If unspecified, defaults to 50. The maximum value is 100. */
  pageSize?: number;
  /** Not used. */
  name?: string;
}

export const ListOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
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

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyServicesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyServicesRequest>;

export type GetIamPolicyServicesResponse = Policy;
export const GetIamPolicyServicesResponse = Policy;

export type GetIamPolicyServicesError = CommonErrors;

export const getIamPolicyServices: API.OperationMethod<GetIamPolicyServicesRequest, GetIamPolicyServicesResponse, GetIamPolicyServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyServicesRequest,
  output: GetIamPolicyServicesResponse,
  errors: [],
}));

/** Gets a service configuration (version) for a managed service. */
export interface GetConfigServicesRequest {
  /** Required. The id of the service configuration resource. This field must be specified for the server to return all fields, including `SourceInfo`. */
  configId?: string;
  /** Specifies which parts of the Service Config should be returned in the response. */
  view?: "BASIC" | "FULL" | (string & {});
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
}

export const GetConfigServicesRequest = Schema.Struct({
  configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{serviceName}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigServicesRequest>;

export type GetConfigServicesResponse = Service;
export const GetConfigServicesResponse = Service;

export type GetConfigServicesError = CommonErrors;

export const getConfigServices: API.OperationMethod<GetConfigServicesRequest, GetConfigServicesResponse, GetConfigServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigServicesRequest,
  output: GetConfigServicesResponse,
  errors: [],
}));

/** Gets a managed service. Authentication is required unless the service is public. */
export interface GetServicesRequest {
  /** Required. The name of the service. See the `ServiceManager` overview for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
}

export const GetServicesRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{serviceName}" }),
  svc,
) as unknown as Schema.Schema<GetServicesRequest>;

export type GetServicesResponse = ManagedService;
export const GetServicesResponse = ManagedService;

export type GetServicesError = CommonErrors;

export const getServices: API.OperationMethod<GetServicesRequest, GetServicesResponse, GetServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesRequest,
  output: GetServicesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsServicesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsServicesRequest>;

export type TestIamPermissionsServicesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsServicesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsServicesError = CommonErrors;

export const testIamPermissionsServices: API.OperationMethod<TestIamPermissionsServicesRequest, TestIamPermissionsServicesResponse, TestIamPermissionsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsServicesRequest,
  output: TestIamPermissionsServicesResponse,
  errors: [],
}));

/** Deletes a managed service. This method will change the service to the `Soft-Delete` state for 30 days. Within this period, service producers may call UndeleteService to restore the service. After 30 days, the service will be permanently deleted. Operation */
export interface DeleteServicesRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
}

export const DeleteServicesRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/services/{serviceName}" }),
  svc,
) as unknown as Schema.Schema<DeleteServicesRequest>;

export type DeleteServicesResponse = Operation;
export const DeleteServicesResponse = Operation;

export type DeleteServicesError = CommonErrors;

export const deleteServices: API.OperationMethod<DeleteServicesRequest, DeleteServicesResponse, DeleteServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteServicesRequest,
  output: DeleteServicesResponse,
  errors: [],
}));

/** Revives a previously deleted managed service. The method restores the service using the configuration at the time the service was deleted. The target service must exist and must have been deleted within the last 30 days. Operation */
export interface UndeleteServicesRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
}

export const UndeleteServicesRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{serviceName}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteServicesRequest>;

export type UndeleteServicesResponse = Operation;
export const UndeleteServicesResponse = Operation;

export type UndeleteServicesError = CommonErrors;

export const undeleteServices: API.OperationMethod<UndeleteServicesRequest, UndeleteServicesResponse, UndeleteServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteServicesRequest,
  output: UndeleteServicesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyServicesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyServicesRequest>;

export type SetIamPolicyServicesResponse = Policy;
export const SetIamPolicyServicesResponse = Policy;

export type SetIamPolicyServicesError = CommonErrors;

export const setIamPolicyServices: API.OperationMethod<SetIamPolicyServicesRequest, SetIamPolicyServicesResponse, SetIamPolicyServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyServicesRequest,
  output: SetIamPolicyServicesResponse,
  errors: [],
}));

/** Generates and returns a report (errors, warnings and changes from existing configurations) associated with GenerateConfigReportRequest.new_value If GenerateConfigReportRequest.old_value is specified, GenerateConfigReportRequest will contain a single ChangeReport based on the comparison between GenerateConfigReportRequest.new_value and GenerateConfigReportRequest.old_value. If GenerateConfigReportRequest.old_value is not specified, this method will compare GenerateConfigReportRequest.new_value with the last pushed service configuration. */
export interface GenerateConfigReportServicesRequest {
  /** Request body */
  body?: GenerateConfigReportRequest;
}

export const GenerateConfigReportServicesRequest = Schema.Struct({
  body: Schema.optional(GenerateConfigReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services:generateConfigReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateConfigReportServicesRequest>;

export type GenerateConfigReportServicesResponse = GenerateConfigReportResponse;
export const GenerateConfigReportServicesResponse = GenerateConfigReportResponse;

export type GenerateConfigReportServicesError = CommonErrors;

export const generateConfigReportServices: API.OperationMethod<GenerateConfigReportServicesRequest, GenerateConfigReportServicesResponse, GenerateConfigReportServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateConfigReportServicesRequest,
  output: GenerateConfigReportServicesResponse,
  errors: [],
}));

/** Creates a new managed service. A managed service is immutable, and is subject to mandatory 30-day data retention. You cannot move a service or recreate it within 30 days after deletion. One producer project can own no more than 500 services. For security and reliability purposes, a production service should be hosted in a dedicated producer project. Operation */
export interface CreateServicesRequest {
  /** Request body */
  body?: ManagedService;
}

export const CreateServicesRequest = Schema.Struct({
  body: Schema.optional(ManagedService).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesRequest>;

export type CreateServicesResponse = Operation;
export const CreateServicesResponse = Operation;

export type CreateServicesError = CommonErrors;

export const createServices: API.OperationMethod<CreateServicesRequest, CreateServicesResponse, CreateServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesRequest,
  output: CreateServicesResponse,
  errors: [],
}));

/** Lists managed services. Returns all public services. For authenticated users, also returns all services the calling user has "servicemanagement.services.get" permission for. */
export interface ListServicesRequest {
  /** Token identifying which result to start with; returned by a previous list call. */
  pageToken?: string;
  /** Include services consumed by the specified consumer. The Google Service Management implementation accepts the following forms: - project: */
  consumerId?: string;
  /** Include services produced by the specified project. */
  producerProjectId?: string;
  /** The max number of items to include in the response list. Page size is 50 if not specified. Maximum value is 500. */
  pageSize?: number;
}

export const ListServicesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  consumerId: Schema.optional(Schema.String).pipe(T.HttpQuery("consumerId")),
  producerProjectId: Schema.optional(Schema.String).pipe(T.HttpQuery("producerProjectId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services" }),
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

/** Creates a new service configuration (version) for a managed service based on user-supplied configuration source files (for example: OpenAPI Specification). This method stores the source configurations as well as the generated service configuration. To rollout the service configuration to other services, please call CreateServiceRollout. Only the 100 most recent configuration sources and ones referenced by existing service configurtions are kept for each service. The rest will be deleted eventually. Operation */
export interface SubmitServicesConfigsRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** Request body */
  body?: SubmitConfigSourceRequest;
}

export const SubmitServicesConfigsRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(SubmitConfigSourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{serviceName}/configs:submit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubmitServicesConfigsRequest>;

export type SubmitServicesConfigsResponse = Operation;
export const SubmitServicesConfigsResponse = Operation;

export type SubmitServicesConfigsError = CommonErrors;

export const submitServicesConfigs: API.OperationMethod<SubmitServicesConfigsRequest, SubmitServicesConfigsResponse, SubmitServicesConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubmitServicesConfigsRequest,
  output: SubmitServicesConfigsResponse,
  errors: [],
}));

/** Creates a new service configuration (version) for a managed service. This method only stores the service configuration. To roll out the service configuration to backend systems please call CreateServiceRollout. Only the 100 most recent service configurations and ones referenced by existing rollouts are kept for each service. The rest will be deleted eventually. */
export interface CreateServicesConfigsRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** Request body */
  body?: Service;
}

export const CreateServicesConfigsRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{serviceName}/configs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesConfigsRequest>;

export type CreateServicesConfigsResponse = Service;
export const CreateServicesConfigsResponse = Service;

export type CreateServicesConfigsError = CommonErrors;

export const createServicesConfigs: API.OperationMethod<CreateServicesConfigsRequest, CreateServicesConfigsResponse, CreateServicesConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesConfigsRequest,
  output: CreateServicesConfigsResponse,
  errors: [],
}));

/** Lists the history of the service configuration for a managed service, from the newest to the oldest. */
export interface ListServicesConfigsRequest {
  /** The max number of items to include in the response list. Page size is 50 if not specified. Maximum value is 100. */
  pageSize?: number;
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** The token of the page to retrieve. */
  pageToken?: string;
}

export const ListServicesConfigsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{serviceName}/configs" }),
  svc,
) as unknown as Schema.Schema<ListServicesConfigsRequest>;

export type ListServicesConfigsResponse = ListServiceConfigsResponse;
export const ListServicesConfigsResponse = ListServiceConfigsResponse;

export type ListServicesConfigsError = CommonErrors;

export const listServicesConfigs = API.makePaginated(() => ({
  input: ListServicesConfigsRequest,
  output: ListServicesConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a service configuration (version) for a managed service. */
export interface GetServicesConfigsRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** Required. The id of the service configuration resource. This field must be specified for the server to return all fields, including `SourceInfo`. */
  configId: string;
  /** Specifies which parts of the Service Config should be returned in the response. */
  view?: "BASIC" | "FULL" | (string & {});
}

export const GetServicesConfigsRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  configId: Schema.String.pipe(T.HttpPath("configId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{serviceName}/configs/{configId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesConfigsRequest>;

export type GetServicesConfigsResponse = Service;
export const GetServicesConfigsResponse = Service;

export type GetServicesConfigsError = CommonErrors;

export const getServicesConfigs: API.OperationMethod<GetServicesConfigsRequest, GetServicesConfigsResponse, GetServicesConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesConfigsRequest,
  output: GetServicesConfigsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyServicesConsumersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyServicesConsumersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/consumers/{consumersId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyServicesConsumersRequest>;

export type SetIamPolicyServicesConsumersResponse = Policy;
export const SetIamPolicyServicesConsumersResponse = Policy;

export type SetIamPolicyServicesConsumersError = CommonErrors;

export const setIamPolicyServicesConsumers: API.OperationMethod<SetIamPolicyServicesConsumersRequest, SetIamPolicyServicesConsumersResponse, SetIamPolicyServicesConsumersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyServicesConsumersRequest,
  output: SetIamPolicyServicesConsumersResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsServicesConsumersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsServicesConsumersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/consumers/{consumersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsServicesConsumersRequest>;

export type TestIamPermissionsServicesConsumersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsServicesConsumersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsServicesConsumersError = CommonErrors;

export const testIamPermissionsServicesConsumers: API.OperationMethod<TestIamPermissionsServicesConsumersRequest, TestIamPermissionsServicesConsumersResponse, TestIamPermissionsServicesConsumersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsServicesConsumersRequest,
  output: TestIamPermissionsServicesConsumersResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyServicesConsumersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyServicesConsumersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/consumers/{consumersId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyServicesConsumersRequest>;

export type GetIamPolicyServicesConsumersResponse = Policy;
export const GetIamPolicyServicesConsumersResponse = Policy;

export type GetIamPolicyServicesConsumersError = CommonErrors;

export const getIamPolicyServicesConsumers: API.OperationMethod<GetIamPolicyServicesConsumersRequest, GetIamPolicyServicesConsumersResponse, GetIamPolicyServicesConsumersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyServicesConsumersRequest,
  output: GetIamPolicyServicesConsumersResponse,
  errors: [],
}));

/** Lists the history of the service configuration rollouts for a managed service, from the newest to the oldest. */
export interface ListServicesRolloutsRequest {
  /** The max number of items to include in the response list. Page size is 50 if not specified. Maximum value is 100. */
  pageSize?: number;
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** Required. Use `filter` to return subset of rollouts. The following filters are supported: -- By status. For example, `filter='status=SUCCESS'` -- By strategy. For example, `filter='strategy=TrafficPercentStrategy'` */
  filter?: string;
  /** The token of the page to retrieve. */
  pageToken?: string;
}

export const ListServicesRolloutsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{serviceName}/rollouts" }),
  svc,
) as unknown as Schema.Schema<ListServicesRolloutsRequest>;

export type ListServicesRolloutsResponse = ListServiceRolloutsResponse;
export const ListServicesRolloutsResponse = ListServiceRolloutsResponse;

export type ListServicesRolloutsError = CommonErrors;

export const listServicesRollouts = API.makePaginated(() => ({
  input: ListServicesRolloutsRequest,
  output: ListServicesRolloutsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new service configuration rollout. Based on rollout, the Google Service Management will roll out the service configurations to different backend services. For example, the logging configuration will be pushed to Google Cloud Logging. Please note that any previous pending and running Rollouts and associated Operations will be automatically cancelled so that the latest Rollout will not be blocked by previous Rollouts. Only the 100 most recent (in any state) and the last 10 successful (if not already part of the set of 100 most recent) rollouts are kept for each service. The rest will be deleted eventually. Operation */
export interface CreateServicesRolloutsRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** Request body */
  body?: Rollout;
}

export const CreateServicesRolloutsRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(Rollout).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{serviceName}/rollouts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesRolloutsRequest>;

export type CreateServicesRolloutsResponse = Operation;
export const CreateServicesRolloutsResponse = Operation;

export type CreateServicesRolloutsError = CommonErrors;

export const createServicesRollouts: API.OperationMethod<CreateServicesRolloutsRequest, CreateServicesRolloutsResponse, CreateServicesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesRolloutsRequest,
  output: CreateServicesRolloutsResponse,
  errors: [],
}));

/** Gets a service configuration rollout. */
export interface GetServicesRolloutsRequest {
  /** Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`. */
  serviceName: string;
  /** Required. The id of the rollout resource. */
  rolloutId: string;
}

export const GetServicesRolloutsRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  rolloutId: Schema.String.pipe(T.HttpPath("rolloutId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{serviceName}/rollouts/{rolloutId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesRolloutsRequest>;

export type GetServicesRolloutsResponse = Rollout;
export const GetServicesRolloutsResponse = Rollout;

export type GetServicesRolloutsError = CommonErrors;

export const getServicesRollouts: API.OperationMethod<GetServicesRolloutsRequest, GetServicesRolloutsResponse, GetServicesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesRolloutsRequest,
  output: GetServicesRolloutsResponse,
  errors: [],
}));

