// ==========================================================================
// Service Consumer Management API (serviceconsumermanagement v1)
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
  name: "serviceconsumermanagement",
  version: "v1",
  rootUrl: "https://serviceconsumermanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`. */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

export interface QuotaLimit {
  /** Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters. */
  name?: string;
  /** Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only. */
  defaultLimit?: string;
  /** Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only. */
  duration?: string;
  /** Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only. */
  maxLimit?: string;
  /** Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported. */
  values?: Record<string, string>;
  /** User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration. */
  displayName?: string;
  /** The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config. */
  metric?: string;
  /** Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax. */
  unit?: string;
  /** Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only. */
  freeTier?: string;
  /** Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`). */
  description?: string;
}

export const QuotaLimit: Schema.Schema<QuotaLimit> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  defaultLimit: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  maxLimit: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  freeTier: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "QuotaLimit" }) as any as Schema.Schema<QuotaLimit>;

export interface BatchingSettingsProto {
  /** The maximum size of data allowed by flow control. */
  flowControlByteLimit?: number;
  /** The maximum number of elements collected in a batch that could be accepted by server. */
  elementCountLimit?: number;
  /** The behavior to take when the flow control limit is exceeded. */
  flowControlLimitExceededBehavior?: "UNSET_BEHAVIOR" | "THROW_EXCEPTION" | "BLOCK" | "IGNORE" | (string & {});
  /** The maximum number of elements allowed by flow control. */
  flowControlElementLimit?: number;
  /** The duration after which a batch should be sent, starting from the addition of the first message to that batch. */
  delayThreshold?: string;
  /** The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message. */
  requestByteThreshold?: string;
  /** The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent. */
  elementCountThreshold?: number;
  /** The maximum size of the request that could be accepted by server. */
  requestByteLimit?: number;
}

export const BatchingSettingsProto: Schema.Schema<BatchingSettingsProto> = Schema.suspend(() => Schema.Struct({
  flowControlByteLimit: Schema.optional(Schema.Number),
  elementCountLimit: Schema.optional(Schema.Number),
  flowControlLimitExceededBehavior: Schema.optional(Schema.String),
  flowControlElementLimit: Schema.optional(Schema.Number),
  delayThreshold: Schema.optional(Schema.String),
  requestByteThreshold: Schema.optional(Schema.String),
  elementCountThreshold: Schema.optional(Schema.Number),
  requestByteLimit: Schema.optional(Schema.Number),
})).annotate({ identifier: "BatchingSettingsProto" }) as any as Schema.Schema<BatchingSettingsProto>;

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

export interface DocumentationRule {
  /** String of comma or space separated case-sensitive words for which method/field name replacement will be disabled. */
  disableReplacementWords?: string;
  /** Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`. */
  deprecationDescription?: string;
  /** The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used. */
  selector?: string;
  /** Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element. */
  description?: string;
}

export const DocumentationRule: Schema.Schema<DocumentationRule> = Schema.suspend(() => Schema.Struct({
  disableReplacementWords: Schema.optional(Schema.String),
  deprecationDescription: Schema.optional(Schema.String),
  selector: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentationRule" }) as any as Schema.Schema<DocumentationRule>;

export interface Page {
  /** Subpages of this page. The order of subpages specified here will be honored in the generated docset. */
  subpages?: Array<Page>;
  /** The Markdown content of the page. You can use ```(== include {path} ==)``` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page. */
  content?: string;
  /** The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`. */
  name?: string;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  subpages: Schema.optional(Schema.Array(Page)),
  content: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface Documentation {
  /** Declares a single overview page. For example: documentation: summary: ... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary: ... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field. */
  overview?: string;
  /** A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<DocumentationRule>;
  /** Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to. */
  serviceRootUrl?: string;
  /** A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`. */
  summary?: string;
  /** The URL to the root of documentation. */
  documentationRootUrl?: string;
  /** Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions. */
  additionalIamInfo?: string;
  /** The top level pages for the documentation set. */
  pages?: Array<Page>;
  /** Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries */
  sectionOverrides?: Array<Page>;
}

export const Documentation: Schema.Schema<Documentation> = Schema.suspend(() => Schema.Struct({
  overview: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(DocumentationRule)),
  serviceRootUrl: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  documentationRootUrl: Schema.optional(Schema.String),
  additionalIamInfo: Schema.optional(Schema.String),
  pages: Schema.optional(Schema.Array(Page)),
  sectionOverrides: Schema.optional(Schema.Array(Page)),
})).annotate({ identifier: "Documentation" }) as any as Schema.Schema<Documentation>;

export interface RemoveTenantProjectRequest {
  /** Required. Tag of the resource within the tenancy unit. */
  tag?: string;
}

export const RemoveTenantProjectRequest: Schema.Schema<RemoveTenantProjectRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveTenantProjectRequest" }) as any as Schema.Schema<RemoveTenantProjectRequest>;

export interface PolicyBinding {
  /** Role. (https://cloud.google.com/iam/docs/understanding-roles) For example, `roles/viewer`, `roles/editor`, or `roles/owner`. */
  role?: string;
  /** Uses the same format as in IAM policy. `member` must include both a prefix and ID. For example, `user:{emailId}`, `serviceAccount:{emailId}`, `group:{emailId}`. */
  members?: Array<string>;
}

export const PolicyBinding: Schema.Schema<PolicyBinding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PolicyBinding" }) as any as Schema.Schema<PolicyBinding>;

export interface TenantProjectPolicy {
  /** Policy bindings to be applied to the tenant project, in addition to the 'roles/owner' role granted to the Service Consumer Management service account. */
  policyBindings?: Array<PolicyBinding>;
}

export const TenantProjectPolicy: Schema.Schema<TenantProjectPolicy> = Schema.suspend(() => Schema.Struct({
  policyBindings: Schema.optional(Schema.Array(PolicyBinding)),
})).annotate({ identifier: "TenantProjectPolicy" }) as any as Schema.Schema<TenantProjectPolicy>;

export interface V1Beta1QuotaOverride {
  /** The overriding quota limit value. Can be any nonnegative integer, or -1 (unlimited quota). */
  overrideValue?: string;
  /** The name of the metric to which this override applies. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The limit unit of the limit to which this override applies. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** The resource name of the ancestor that requested the override. For example: "organizations/12345" or "folders/67890". Used by admin overrides only. */
  adminOverrideAncestor?: string;
  /** If this map is nonempty, then this override applies only to specific values for dimensions defined in the limit unit. For example, an override on a limit with the unit 1/{project}/{region} could contain an entry with the key "region" and the value "us-east-1"; the override is only applied to quota consumed in that region. This map has the following restrictions: * Keys that are not defined in the limit's unit are not valid keys. Any string appearing in {brackets} in the unit (besides {project} or {user}) is a defined key. * "project" is not a valid key; the project is already specified in the parent resource name. * "user" is not a valid key; the API does not support quota overrides that apply only to a specific user. * If "region" appears as a key, its value must be a valid Cloud region. * If "zone" appears as a key, its value must be a valid Cloud zone. * If any valid key other than "region" or "zone" appears in the map, then all valid keys other than "region" or "zone" must also appear in the map. */
  dimensions?: Record<string, string>;
  /** The resource name of the producer override. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerOverrides/4a3f2c1d` */
  name?: string;
}

export const V1Beta1QuotaOverride: Schema.Schema<V1Beta1QuotaOverride> = Schema.suspend(() => Schema.Struct({
  overrideValue: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  adminOverrideAncestor: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "V1Beta1QuotaOverride" }) as any as Schema.Schema<V1Beta1QuotaOverride>;

export interface MetricDescriptorMetadata {
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<"TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED" | "PROJECT" | "ORGANIZATION" | "FOLDER" | (string & {})>;
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> = Schema.suspend(() => Schema.Struct({
  ingestDelay: Schema.optional(Schema.String),
  samplePeriod: Schema.optional(Schema.String),
  timeSeriesResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricDescriptorMetadata" }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface V1Beta1ProducerQuotaPolicy {
  /** If this map is nonempty, then this policy applies only to specific values for dimensions defined in the limit unit. For example, a policy on a limit with the unit 1/{project}/{region} could contain an entry with the key "region" and the value "us-east-1"; the policy is only applied to quota consumed in that region. This map has the following restrictions: * Keys that are not defined in the limit's unit are not valid keys. Any string appearing in {brackets} in the unit (besides {project} or {user}) is a defined key. * "project" is not a valid key; the project is already specified in the parent resource name. * "user" is not a valid key; the API does not support quota polcies that apply only to a specific user. * If "region" appears as a key, its value must be a valid Cloud region. * If "zone" appears as a key, its value must be a valid Cloud zone. * If any valid key other than "region" or "zone" appears in the map, then all valid keys other than "region" or "zone" must also appear in the map. */
  dimensions?: Record<string, string>;
  /** The cloud resource container at which the quota policy is created. The format is {container_type}/{container_number} */
  container?: string;
  /** The quota policy value. Can be any nonnegative integer, or -1 (unlimited quota). */
  policyValue?: string;
  /** The limit unit of the limit to which this policy applies. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** The name of the metric to which this policy applies. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The resource name of the producer policy. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerQuotaPolicies/4a3f2c1d` */
  name?: string;
}

export const V1Beta1ProducerQuotaPolicy: Schema.Schema<V1Beta1ProducerQuotaPolicy> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  container: Schema.optional(Schema.String),
  policyValue: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "V1Beta1ProducerQuotaPolicy" }) as any as Schema.Schema<V1Beta1ProducerQuotaPolicy>;

export interface V1Beta1ImportProducerQuotaPoliciesResponse {
  /** The policies that were created from the imported data. */
  policies?: Array<V1Beta1ProducerQuotaPolicy>;
}

export const V1Beta1ImportProducerQuotaPoliciesResponse: Schema.Schema<V1Beta1ImportProducerQuotaPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(V1Beta1ProducerQuotaPolicy)),
})).annotate({ identifier: "V1Beta1ImportProducerQuotaPoliciesResponse" }) as any as Schema.Schema<V1Beta1ImportProducerQuotaPoliciesResponse>;

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
  /** If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests. */
  allowWithoutCredential?: boolean;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Requirements for additional authentication providers. */
  requirements?: Array<AuthRequirement>;
  /** The requirements for OAuth credentials. */
  oauth?: OAuthRequirements;
}

export const AuthenticationRule: Schema.Schema<AuthenticationRule> = Schema.suspend(() => Schema.Struct({
  allowWithoutCredential: Schema.optional(Schema.Boolean),
  selector: Schema.optional(Schema.String),
  requirements: Schema.optional(Schema.Array(AuthRequirement)),
  oauth: Schema.optional(OAuthRequirements),
})).annotate({ identifier: "AuthenticationRule" }) as any as Schema.Schema<AuthenticationRule>;

export interface ContextRule {
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client. */
  allowedResponseExtensions?: Array<string>;
  /** A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension. */
  provided?: Array<string>;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend. */
  allowedRequestExtensions?: Array<string>;
  /** A list of full type names of requested contexts, only the requested context will be made available to the backend. */
  requested?: Array<string>;
}

export const ContextRule: Schema.Schema<ContextRule> = Schema.suspend(() => Schema.Struct({
  allowedResponseExtensions: Schema.optional(Schema.Array(Schema.String)),
  provided: Schema.optional(Schema.Array(Schema.String)),
  selector: Schema.optional(Schema.String),
  allowedRequestExtensions: Schema.optional(Schema.Array(Schema.String)),
  requested: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContextRule" }) as any as Schema.Schema<ContextRule>;

export interface Context {
  /** A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<ContextRule>;
}

export const Context: Schema.Schema<Context> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(ContextRule)),
})).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

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
  /** The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** Any metadata attached to the method. */
  options?: Array<Option>;
  /** The simple name of this method. */
  name?: string;
  /** The URL of the output message type. */
  responseTypeUrl?: string;
  /** If true, the request is streamed. */
  requestStreaming?: boolean;
  /** A URL of the input message type. */
  requestTypeUrl?: string;
  /** If true, the response is streamed. */
  responseStreaming?: boolean;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue. */
  edition?: string;
}

export const Method: Schema.Schema<Method> = Schema.suspend(() => Schema.Struct({
  syntax: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  name: Schema.optional(Schema.String),
  responseTypeUrl: Schema.optional(Schema.String),
  requestStreaming: Schema.optional(Schema.Boolean),
  requestTypeUrl: Schema.optional(Schema.String),
  responseStreaming: Schema.optional(Schema.Boolean),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "Method" }) as any as Schema.Schema<Method>;

export interface CustomHttpPattern {
  /** The name of this custom HTTP verb. */
  kind?: string;
  /** The path matched by this custom verb. */
  path?: string;
}

export const CustomHttpPattern: Schema.Schema<CustomHttpPattern> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomHttpPattern" }) as any as Schema.Schema<CustomHttpPattern>;

export interface HttpRule {
  /** Selects a method to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Maps to HTTP GET. Used for listing and getting information about resources. */
  get?: string;
  /** The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type. */
  body?: string;
  /** Maps to HTTP PUT. Used for replacing a resource. */
  put?: string;
  /** Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep). */
  additionalBindings?: Array<HttpRule>;
  /** Maps to HTTP POST. Used for creating a resource or performing an action. */
  post?: string;
  /** Maps to HTTP DELETE. Used for deleting a resource. */
  delete?: string;
  /** Maps to HTTP PATCH. Used for updating a resource. */
  patch?: string;
  /** Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type. */
  responseBody?: string;
  /** The custom pattern is used for specifying an HTTP method that is not included in the `pattern` field, such as HEAD, or "*" to leave the HTTP method unspecified for this rule. The wild-card rule is useful for services that provide content to Web (HTML) clients. */
  custom?: CustomHttpPattern;
}

export const HttpRule: Schema.Schema<HttpRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  get: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  put: Schema.optional(Schema.String),
  additionalBindings: Schema.optional(Schema.Array(HttpRule)),
  post: Schema.optional(Schema.String),
  delete: Schema.optional(Schema.String),
  patch: Schema.optional(Schema.String),
  responseBody: Schema.optional(Schema.String),
  custom: Schema.optional(CustomHttpPattern),
})).annotate({ identifier: "HttpRule" }) as any as Schema.Schema<HttpRule>;

export interface Http {
  /** A list of HTTP configuration rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<HttpRule>;
  /** When set to true, URL path parameters will be fully URI-decoded except in cases of single segment matches in reserved expansion, where "%2F" will be left encoded. The default behavior is to not decode RFC 6570 reserved characters in multi segment matches. */
  fullyDecodeReservedExpansion?: boolean;
}

export const Http: Schema.Schema<Http> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(HttpRule)),
  fullyDecodeReservedExpansion: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Http" }) as any as Schema.Schema<Http>;

export interface CreateTenancyUnitRequest {
  /** Optional. Optional service producer-provided identifier of the tenancy unit. Must be no longer than 40 characters and preferably URI friendly. If it isn't provided, a UID for the tenancy unit is automatically generated. The identifier must be unique across a managed service. If the tenancy unit already exists for the managed service and service consumer pair, calling `CreateTenancyUnit` returns the existing tenancy unit if the provided identifier is identical or empty, otherwise the call fails. */
  tenancyUnitId?: string;
}

export const CreateTenancyUnitRequest: Schema.Schema<CreateTenancyUnitRequest> = Schema.suspend(() => Schema.Struct({
  tenancyUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateTenancyUnitRequest" }) as any as Schema.Schema<CreateTenancyUnitRequest>;

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
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface BillingConfig {
  /** Name of the billing account. For example `billingAccounts/012345-567890-ABCDEF`. */
  billingAccount?: string;
}

export const BillingConfig: Schema.Schema<BillingConfig> = Schema.suspend(() => Schema.Struct({
  billingAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "BillingConfig" }) as any as Schema.Schema<BillingConfig>;

export interface JwtLocation {
  /** The value prefix. The value format is "value_prefix{token}" Only applies to "in" header type. Must be empty for "in" query type. If not empty, the header value has to match (case sensitive) this prefix. If not matched, JWT will not be extracted. If matched, JWT will be extracted after the prefix is removed. For example, for "Authorization: Bearer {JWT}", value_prefix="Bearer " with a space at the end. */
  valuePrefix?: string;
  /** Specifies cookie name to extract JWT token. */
  cookie?: string;
  /** Specifies URL query parameter name to extract JWT token. */
  query?: string;
  /** Specifies HTTP header name to extract JWT token. */
  header?: string;
}

export const JwtLocation: Schema.Schema<JwtLocation> = Schema.suspend(() => Schema.Struct({
  valuePrefix: Schema.optional(Schema.String),
  cookie: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  header: Schema.optional(Schema.String),
})).annotate({ identifier: "JwtLocation" }) as any as Schema.Schema<JwtLocation>;

export interface AuthProvider {
  /** Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec. */
  authorizationUrl?: string;
  /** URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs */
  jwksUri?: string;
  /** Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token */
  jwtLocations?: Array<JwtLocation>;
  /** The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth". */
  id?: string;
  /** Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com */
  issuer?: string;
  /** The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
}

export const AuthProvider: Schema.Schema<AuthProvider> = Schema.suspend(() => Schema.Struct({
  authorizationUrl: Schema.optional(Schema.String),
  jwksUri: Schema.optional(Schema.String),
  jwtLocations: Schema.optional(Schema.Array(JwtLocation)),
  id: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  audiences: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthProvider" }) as any as Schema.Schema<AuthProvider>;

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

export interface MetricDescriptor {
  /** The resource name of the metric descriptor. */
  name?: string;
  /** The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent"). */
  unit?: string;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
  /** Optional. The launch stage of the metric definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  metricKind: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
  metadata: Schema.optional(MetricDescriptorMetadata),
  valueType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
})).annotate({ identifier: "MetricDescriptor" }) as any as Schema.Schema<MetricDescriptor>;

export interface UndeleteTenantProjectRequest {
  /** Required. Tag of the resource within the tenancy unit. */
  tag?: string;
}

export const UndeleteTenantProjectRequest: Schema.Schema<UndeleteTenantProjectRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteTenantProjectRequest" }) as any as Schema.Schema<UndeleteTenantProjectRequest>;

export interface V1Beta1ServiceIdentity {
  /** The email address of the service identity. */
  email?: string;
  /** The unique and stable id of the service identity. */
  uniqueId?: string;
  /** The project-level IAM role defined in the service agent's grant configuration. This is the standard role intended for this service agent. This field is populated regardless of the `skip_role_attach` option in the request. If `skip_role_attach` is true, the caller can use this value to know which role they are responsible for granting. */
  projectRole?: string;
  /** The P4 service identity configuration tag. This must be defined in activation_grants. If not specified when creating the account, the tag is set to "default". */
  tag?: string;
  /** P4 service identity resource name. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/serviceIdentities/default` */
  name?: string;
}

export const V1Beta1ServiceIdentity: Schema.Schema<V1Beta1ServiceIdentity> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  uniqueId: Schema.optional(Schema.String),
  projectRole: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "V1Beta1ServiceIdentity" }) as any as Schema.Schema<V1Beta1ServiceIdentity>;

export interface AttachTenantProjectRequest {
  /** When attaching an external project, this is in the format of `projects/{project_number}`. */
  externalResource?: string;
  /** Required. Tag of the tenant resource after attachment. Must be less than 128 characters. Required. */
  tag?: string;
  /** When attaching a reserved project already in tenancy units, this is the tag of a tenant resource under the tenancy unit for the managed service's service producer project. The reserved tenant resource must be in an active state. */
  reservedResource?: string;
}

export const AttachTenantProjectRequest: Schema.Schema<AttachTenantProjectRequest> = Schema.suspend(() => Schema.Struct({
  externalResource: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  reservedResource: Schema.optional(Schema.String),
})).annotate({ identifier: "AttachTenantProjectRequest" }) as any as Schema.Schema<AttachTenantProjectRequest>;

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
  /** Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest */
  referenceDocsUri?: string;
  /** Configuration for which RPCs should be generated in the GAPIC client. */
  selectiveGapicGeneration?: SelectiveGapicGeneration;
}

export const CommonLanguageSettings: Schema.Schema<CommonLanguageSettings> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Schema.String)),
  referenceDocsUri: Schema.optional(Schema.String),
  selectiveGapicGeneration: Schema.optional(SelectiveGapicGeneration),
})).annotate({ identifier: "CommonLanguageSettings" }) as any as Schema.Schema<CommonLanguageSettings>;

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

export interface MethodPolicy {
  /** Policies that are applicable to the request message. */
  requestPolicies?: Array<FieldPolicy>;
  /** Selects a method to which these policies should be enforced, for example, "google.pubsub.v1.Subscriber.CreateSubscription". Refer to selector for syntax details. NOTE: This field must not be set in the proto annotation. It will be automatically filled by the service config compiler . */
  selector?: string;
}

export const MethodPolicy: Schema.Schema<MethodPolicy> = Schema.suspend(() => Schema.Struct({
  requestPolicies: Schema.optional(Schema.Array(FieldPolicy)),
  selector: Schema.optional(Schema.String),
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

export interface Field {
  /** The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list. */
  oneofIndex?: number;
  /** The field number. */
  number?: number;
  /** The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`. */
  typeUrl?: string;
  /** The field cardinality. */
  cardinality?: "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED" | (string & {});
  /** The field JSON name. */
  jsonName?: string;
  /** The field name. */
  name?: string;
  /** The string value of the default value of this field. Proto2 syntax only. */
  defaultValue?: string;
  /** The field type. */
  kind?: "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64" | (string & {});
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** Whether to use alternative packed wire representation. */
  packed?: boolean;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  oneofIndex: Schema.optional(Schema.Number),
  number: Schema.optional(Schema.Number),
  typeUrl: Schema.optional(Schema.String),
  cardinality: Schema.optional(Schema.String),
  jsonName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  packed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface Type {
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The list of fields. */
  fields?: Array<Field>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The fully qualified message name. */
  name?: string;
  /** The list of types appearing in `oneof` definitions in this type. */
  oneofs?: Array<string>;
  /** The protocol buffer options. */
  options?: Array<Option>;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  syntax: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Field)),
  sourceContext: Schema.optional(SourceContext),
  edition: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  oneofs: Schema.optional(Schema.Array(Schema.String)),
  options: Schema.optional(Schema.Array(Option)),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

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

export interface NodeSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const NodeSettings: Schema.Schema<NodeSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "NodeSettings" }) as any as Schema.Schema<NodeSettings>;

export interface ServiceAccountConfig {
  /** ID of the IAM service account to be created in tenant project. The email format of the service account is "@.iam.gserviceaccount.com". This account ID must be unique within tenant project and service producers have to guarantee it. The ID must be 6-30 characters long, and match the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])`. */
  accountId?: string;
  /** Roles for the associated service account for the tenant project. */
  tenantProjectRoles?: Array<string>;
}

export const ServiceAccountConfig: Schema.Schema<ServiceAccountConfig> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  tenantProjectRoles: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ServiceAccountConfig" }) as any as Schema.Schema<ServiceAccountConfig>;

export interface TenantResource {
  /** Output only. @OutputOnly Identifier of the tenant resource. For cloud projects, it is in the form 'projects/{number}'. For example 'projects/123456'. */
  resource?: string;
  /** Output only. The newly created regional resource name of the tenant project that has been migrated from a global service. This field is only set for migrated tenant projects. Format: `services//{collection_id}/{RESOURCE_ID}/locations/{LOCATION}/tenantProjects/{TENANT_ID}`. */
  migratedTenantProject?: string;
  /** Status of tenant resource. */
  status?: "STATUS_UNSPECIFIED" | "PENDING_CREATE" | "ACTIVE" | "PENDING_DELETE" | "FAILED" | "DELETED" | (string & {});
  /** Unique per single tenancy unit. */
  tag?: string;
}

export const TenantResource: Schema.Schema<TenantResource> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  migratedTenantProject: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "TenantResource" }) as any as Schema.Schema<TenantResource>;

export interface TenancyUnit {
  /** Output only. Google Cloud API name of the managed service owning this tenancy unit. For example 'serviceconsumermanagement.googleapis.com'. */
  service?: string;
  /** Output only. @OutputOnly Cloud resource name of the consumer of this service. For example 'projects/123456'. */
  consumer?: string;
  /** Resources constituting the tenancy unit. There can be at most 512 tenant resources in a tenancy unit. */
  tenantResources?: Array<TenantResource>;
  /** Globally unique identifier of this tenancy unit "services/{service}/{collection id}/{resource id}/tenancyUnits/{unit}" */
  name?: string;
  /** Output only. @OutputOnly The time this tenancy unit was created. */
  createTime?: string;
}

export const TenancyUnit: Schema.Schema<TenancyUnit> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  consumer: Schema.optional(Schema.String),
  tenantResources: Schema.optional(Schema.Array(TenantResource)),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TenancyUnit" }) as any as Schema.Schema<TenancyUnit>;

export interface ListTenancyUnitsResponse {
  /** Tenancy units matching the request. */
  tenancyUnits?: Array<TenancyUnit>;
  /** Pagination token for large results. */
  nextPageToken?: string;
}

export const ListTenancyUnitsResponse: Schema.Schema<ListTenancyUnitsResponse> = Schema.suspend(() => Schema.Struct({
  tenancyUnits: Schema.optional(Schema.Array(TenancyUnit)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTenancyUnitsResponse" }) as any as Schema.Schema<ListTenancyUnitsResponse>;

export interface SourceInfo {
  /** All files used during config generation. */
  sourceFiles?: Array<Record<string, unknown>>;
}

export const SourceInfo: Schema.Schema<SourceInfo> = Schema.suspend(() => Schema.Struct({
  sourceFiles: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "SourceInfo" }) as any as Schema.Schema<SourceInfo>;

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

export interface MethodSettings {
  /** Describes settings to use for long-running operations when generating API methods for RPCs. Complements RPCs that use the annotations in google/longrunning/operations.proto. Example of a YAML configuration:: publishing: method_settings: - selector: google.cloud.speech.v2.Speech.BatchRecognize long_running: initial_poll_delay: 60s # 1 minute poll_delay_multiplier: 1.5 max_poll_delay: 360s # 6 minutes total_poll_timeout: 54000s # 90 minutes */
  longRunning?: LongRunning;
  /** The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder... */
  selector?: string;
  /** List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id */
  autoPopulatedFields?: Array<string>;
  /** Batching configuration for an API method in client libraries. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.BatchCreateExample batching: element_count_threshold: 1000 request_byte_threshold: 100000000 delay_threshold_millis: 10 */
  batching?: BatchingConfigProto;
}

export const MethodSettings: Schema.Schema<MethodSettings> = Schema.suspend(() => Schema.Struct({
  longRunning: Schema.optional(LongRunning),
  selector: Schema.optional(Schema.String),
  autoPopulatedFields: Schema.optional(Schema.Array(Schema.String)),
  batching: Schema.optional(BatchingConfigProto),
})).annotate({ identifier: "MethodSettings" }) as any as Schema.Schema<MethodSettings>;

export interface ExperimentalFeatures {
  /** Enables generation of asynchronous REST clients if `rest` transport is enabled. By default, asynchronous REST clients will not be generated. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  restAsyncIoEnabled?: boolean;
  /** Disables generation of an unversioned Python package for this client library. This means that the module names will need to be versioned in import statements. For example `import google.cloud.library_v2` instead of `import google.cloud.library`. */
  unversionedPackageDisabled?: boolean;
  /** Enables generation of protobuf code using new types that are more Pythonic which are included in `protobuf>=5.29.x`. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  protobufPythonicTypesEnabled?: boolean;
}

export const ExperimentalFeatures: Schema.Schema<ExperimentalFeatures> = Schema.suspend(() => Schema.Struct({
  restAsyncIoEnabled: Schema.optional(Schema.Boolean),
  unversionedPackageDisabled: Schema.optional(Schema.Boolean),
  protobufPythonicTypesEnabled: Schema.optional(Schema.Boolean),
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

export interface DotnetSettings {
  /** Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset" */
  renamedResources?: Record<string, string>;
  /** Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision */
  forcedNamespaceAliases?: Array<string>;
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi. */
  renamedServices?: Record<string, string>;
  /** Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn't be generated. Snippets *calling* these methods are still generated, however. */
  handwrittenSignatures?: Array<string>;
  /** List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location" */
  ignoredResources?: Array<string>;
}

export const DotnetSettings: Schema.Schema<DotnetSettings> = Schema.suspend(() => Schema.Struct({
  renamedResources: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  forcedNamespaceAliases: Schema.optional(Schema.Array(Schema.String)),
  common: Schema.optional(CommonLanguageSettings),
  renamedServices: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  handwrittenSignatures: Schema.optional(Schema.Array(Schema.String)),
  ignoredResources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DotnetSettings" }) as any as Schema.Schema<DotnetSettings>;

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

export interface CppSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const CppSettings: Schema.Schema<CppSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "CppSettings" }) as any as Schema.Schema<CppSettings>;

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

export interface RubySettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const RubySettings: Schema.Schema<RubySettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "RubySettings" }) as any as Schema.Schema<RubySettings>;

export interface ClientLibrarySettings {
  /** Settings for Python client libraries. */
  pythonSettings?: PythonSettings;
  /** Settings for Node client libraries. */
  nodeSettings?: NodeSettings;
  /** When using transport=rest, the client request will encode enums as numbers rather than strings. */
  restNumericEnums?: boolean;
  /** Settings for .NET client libraries. */
  dotnetSettings?: DotnetSettings;
  /** Settings for PHP client libraries. */
  phpSettings?: PhpSettings;
  /** Settings for legacy Java features, supported in the Service YAML. */
  javaSettings?: JavaSettings;
  /** Settings for C++ client libraries. */
  cppSettings?: CppSettings;
  /** Settings for Go client libraries. */
  goSettings?: GoSettings;
  /** Settings for Ruby client libraries. */
  rubySettings?: RubySettings;
  /** Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1". */
  version?: string;
  /** Launch stage of this version of the API. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const ClientLibrarySettings: Schema.Schema<ClientLibrarySettings> = Schema.suspend(() => Schema.Struct({
  pythonSettings: Schema.optional(PythonSettings),
  nodeSettings: Schema.optional(NodeSettings),
  restNumericEnums: Schema.optional(Schema.Boolean),
  dotnetSettings: Schema.optional(DotnetSettings),
  phpSettings: Schema.optional(PhpSettings),
  javaSettings: Schema.optional(JavaSettings),
  cppSettings: Schema.optional(CppSettings),
  goSettings: Schema.optional(GoSettings),
  rubySettings: Schema.optional(RubySettings),
  version: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientLibrarySettings" }) as any as Schema.Schema<ClientLibrarySettings>;

export interface Publishing {
  /** Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103 */
  newIssueUri?: string;
  /** Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview */
  documentationUri?: string;
  /** Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc */
  protoReferenceDocumentationUri?: string;
  /** A prefix used in sample code when demarking regions to be included in documentation. */
  docTagPrefix?: string;
  /** For whom the client library is being published. */
  organization?: "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED" | "CLOUD" | "ADS" | "PHOTOS" | "STREET_VIEW" | "SHOPPING" | "GEO" | "GENERATIVE_AI" | (string & {});
  /** Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest */
  restReferenceDocumentationUri?: string;
  /** A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern. */
  methodSettings?: Array<MethodSettings>;
  /** Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded. */
  librarySettings?: Array<ClientLibrarySettings>;
  /** Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech". */
  apiShortName?: string;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  githubLabel?: string;
  /** GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API. */
  codeownerGithubTeams?: Array<string>;
}

export const Publishing: Schema.Schema<Publishing> = Schema.suspend(() => Schema.Struct({
  newIssueUri: Schema.optional(Schema.String),
  documentationUri: Schema.optional(Schema.String),
  protoReferenceDocumentationUri: Schema.optional(Schema.String),
  docTagPrefix: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  restReferenceDocumentationUri: Schema.optional(Schema.String),
  methodSettings: Schema.optional(Schema.Array(MethodSettings)),
  librarySettings: Schema.optional(Schema.Array(ClientLibrarySettings)),
  apiShortName: Schema.optional(Schema.String),
  githubLabel: Schema.optional(Schema.String),
  codeownerGithubTeams: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Publishing" }) as any as Schema.Schema<Publishing>;

export interface V1Beta1RefreshConsumerResponse {
}

export const V1Beta1RefreshConsumerResponse: Schema.Schema<V1Beta1RefreshConsumerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V1Beta1RefreshConsumerResponse" }) as any as Schema.Schema<V1Beta1RefreshConsumerResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface BackendRule {
  /** When disable_auth is true, a JWT ID token won't be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header. */
  disableAuth?: boolean;
  /** The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend. */
  jwtAudience?: string;
  /** The number of seconds to wait for the completion of a long running operation. The default is no deadline. */
  operationDeadline?: number;
  /** no-lint */
  pathTranslation?: "PATH_TRANSLATION_UNSPECIFIED" | "CONSTANT_ADDRESS" | "APPEND_PATH_TO_ADDRESS" | (string & {});
  /** The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values. */
  protocol?: string;
  /** The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin". */
  loadBalancingPolicy?: string;
  /** The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version. */
  address?: string;
  /** Deprecated, do not use. */
  minDeadline?: number;
  /** The map between request protocol and the backend address. */
  overridesByRequestProtocol?: Record<string, BackendRule>;
  /** The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment. */
  deadline?: number;
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
}

export const BackendRule: Schema.Schema<BackendRule> = Schema.suspend(() => Schema.Struct({
  disableAuth: Schema.optional(Schema.Boolean),
  jwtAudience: Schema.optional(Schema.String),
  operationDeadline: Schema.optional(Schema.Number),
  pathTranslation: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  loadBalancingPolicy: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  minDeadline: Schema.optional(Schema.Number),
  overridesByRequestProtocol: Schema.optional(Schema.Record(Schema.String, BackendRule)),
  deadline: Schema.optional(Schema.Number),
  selector: Schema.optional(Schema.String),
})).annotate({ identifier: "BackendRule" }) as any as Schema.Schema<BackendRule>;

export interface Backend {
  /** A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<BackendRule>;
}

export const Backend: Schema.Schema<Backend> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(BackendRule)),
})).annotate({ identifier: "Backend" }) as any as Schema.Schema<Backend>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

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

export interface SystemParameter {
  /** Define the HTTP header name to use for the parameter. It is case insensitive. */
  httpHeader?: string;
  /** Define the name of the parameter, such as "api_key" . It is case sensitive. */
  name?: string;
  /** Define the URL query parameter name to use for the parameter. It is case sensitive. */
  urlQueryParameter?: string;
}

export const SystemParameter: Schema.Schema<SystemParameter> = Schema.suspend(() => Schema.Struct({
  httpHeader: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
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

export interface Billing {
  /** Billing configurations for sending metrics to the consumer project. There can be multiple consumer destinations per service, each one must have a different monitored resource type. A metric can be used in at most one consumer destination. */
  consumerDestinations?: Array<BillingDestination>;
}

export const Billing: Schema.Schema<Billing> = Schema.suspend(() => Schema.Struct({
  consumerDestinations: Schema.optional(Schema.Array(BillingDestination)),
})).annotate({ identifier: "Billing" }) as any as Schema.Schema<Billing>;

export interface V1Beta1BatchCreateProducerOverridesResponse {
  /** The overrides that were created. */
  overrides?: Array<V1Beta1QuotaOverride>;
}

export const V1Beta1BatchCreateProducerOverridesResponse: Schema.Schema<V1Beta1BatchCreateProducerOverridesResponse> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Schema.Array(V1Beta1QuotaOverride)),
})).annotate({ identifier: "V1Beta1BatchCreateProducerOverridesResponse" }) as any as Schema.Schema<V1Beta1BatchCreateProducerOverridesResponse>;

export interface V1ServiceAccount {
  /** The email address of the service account. */
  email?: string;
  /** The P4 SA configuration tag. This must be defined in activation_grants. If not specified when creating the account, the tag is set to "default". */
  tag?: string;
  /** Deprecated. See b/136209818. */
  iamAccountName?: string;
  /** P4 SA resource name. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/serviceAccounts/default` */
  name?: string;
  /** The unique and stable id of the service account. */
  uniqueId?: string;
}

export const V1ServiceAccount: Schema.Schema<V1ServiceAccount> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  iamAccountName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  uniqueId: Schema.optional(Schema.String),
})).annotate({ identifier: "V1ServiceAccount" }) as any as Schema.Schema<V1ServiceAccount>;

export interface V1GenerateServiceAccountResponse {
  /** ServiceAccount that was created or retrieved. */
  account?: V1ServiceAccount;
}

export const V1GenerateServiceAccountResponse: Schema.Schema<V1GenerateServiceAccountResponse> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(V1ServiceAccount),
})).annotate({ identifier: "V1GenerateServiceAccountResponse" }) as any as Schema.Schema<V1GenerateServiceAccountResponse>;

export interface TenantProjectConfig {
  /** Billing account properties. The billing account must be specified. */
  billingConfig?: BillingConfig;
  /** Google Cloud API names of services that are activated on this project during provisioning. If any of these services can't be activated, the request fails. For example: 'compute.googleapis.com','cloudfunctions.googleapis.com' */
  services?: Array<string>;
  /** Folder where project in this tenancy unit must be located This folder must have been previously created with the required permissions for the caller to create and configure a project in it. Valid folder resource names have the format `folders/{folder_number}` (for example, `folders/123456`). */
  folder?: string;
  /** Labels that are applied to this project. */
  labels?: Record<string, string>;
  /** Describes ownership and policies for the new tenant project. */
  tenantProjectPolicy?: TenantProjectPolicy;
  /** Configuration for the IAM service account on the tenant project. */
  serviceAccountConfig?: ServiceAccountConfig;
}

export const TenantProjectConfig: Schema.Schema<TenantProjectConfig> = Schema.suspend(() => Schema.Struct({
  billingConfig: Schema.optional(BillingConfig),
  services: Schema.optional(Schema.Array(Schema.String)),
  folder: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tenantProjectPolicy: Schema.optional(TenantProjectPolicy),
  serviceAccountConfig: Schema.optional(ServiceAccountConfig),
})).annotate({ identifier: "TenantProjectConfig" }) as any as Schema.Schema<TenantProjectConfig>;

export interface AddTenantProjectRequest {
  /** Configuration of the new tenant project to be added to tenancy unit resources. */
  projectConfig?: TenantProjectConfig;
  /** Required. Tag of the added project. Must be less than 128 characters. Required. */
  tag?: string;
}

export const AddTenantProjectRequest: Schema.Schema<AddTenantProjectRequest> = Schema.suspend(() => Schema.Struct({
  projectConfig: Schema.optional(TenantProjectConfig),
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "AddTenantProjectRequest" }) as any as Schema.Schema<AddTenantProjectRequest>;

export interface SystemParameters {
  /** Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<SystemParameterRule>;
}

export const SystemParameters: Schema.Schema<SystemParameters> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(SystemParameterRule)),
})).annotate({ identifier: "SystemParameters" }) as any as Schema.Schema<SystemParameters>;

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

export interface V1DefaultIdentity {
  /** Default identity resource name. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/defaultIdentity` */
  name?: string;
  /** The email address of the default identity. Calling GenerateDefaultIdentity with a deleted or purged default identity should expect does_not_exist@invalid-project.iam.gserviceaccount.com placeholder email. */
  email?: string;
  /** The unique and stable id of the default identity. */
  uniqueId?: string;
  /** The Default Identity tag. If specified when creating the account, the tag must be present in activation_grants. If not specified when creating the account, the tag is set to the tag specified in activation_grants. */
  tag?: string;
}

export const V1DefaultIdentity: Schema.Schema<V1DefaultIdentity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  uniqueId: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "V1DefaultIdentity" }) as any as Schema.Schema<V1DefaultIdentity>;

export interface V1GenerateDefaultIdentityResponse {
  /** DefaultIdentity that was created or retrieved. */
  identity?: V1DefaultIdentity;
  /** Role attached to consumer project. Empty if not attached in this request. (Under development, currently always return empty.) */
  role?: string;
  /** Status of the role attachment. Under development (go/si-attach-role), currently always return ATTACH_STATUS_UNSPECIFIED) */
  attachStatus?: "ATTACH_STATUS_UNSPECIFIED" | "ATTACHED" | "ATTACH_SKIPPED" | "PREVIOUSLY_ATTACHED" | "ATTACH_DENIED_BY_ORG_POLICY" | (string & {});
}

export const V1GenerateDefaultIdentityResponse: Schema.Schema<V1GenerateDefaultIdentityResponse> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(V1DefaultIdentity),
  role: Schema.optional(Schema.String),
  attachStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "V1GenerateDefaultIdentityResponse" }) as any as Schema.Schema<V1GenerateDefaultIdentityResponse>;

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

export interface MetricRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Metrics to update when the selected methods are called, and the associated cost applied to each metric. The key of the map is the metric name, and the values are the amount increased for the metric against which the quota limits are defined. The value must not be negative. */
  metricCosts?: Record<string, string>;
}

export const MetricRule: Schema.Schema<MetricRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  metricCosts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MetricRule" }) as any as Schema.Schema<MetricRule>;

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

export interface V1RefreshConsumerResponse {
}

export const V1RefreshConsumerResponse: Schema.Schema<V1RefreshConsumerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V1RefreshConsumerResponse" }) as any as Schema.Schema<V1RefreshConsumerResponse>;

export interface V1Beta1ImportProducerOverridesResponse {
  /** The overrides that were created from the imported data. */
  overrides?: Array<V1Beta1QuotaOverride>;
}

export const V1Beta1ImportProducerOverridesResponse: Schema.Schema<V1Beta1ImportProducerOverridesResponse> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Schema.Array(V1Beta1QuotaOverride)),
})).annotate({ identifier: "V1Beta1ImportProducerOverridesResponse" }) as any as Schema.Schema<V1Beta1ImportProducerOverridesResponse>;

export interface DeleteTenantProjectRequest {
  /** Required. Tag of the resource within the tenancy unit. */
  tag?: string;
}

export const DeleteTenantProjectRequest: Schema.Schema<DeleteTenantProjectRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteTenantProjectRequest" }) as any as Schema.Schema<DeleteTenantProjectRequest>;

export interface ApplyTenantProjectConfigRequest {
  /** Required. Tag of the project. Must be less than 128 characters. Required. */
  tag?: string;
  /** Configuration that should be applied to the existing tenant project. */
  projectConfig?: TenantProjectConfig;
}

export const ApplyTenantProjectConfigRequest: Schema.Schema<ApplyTenantProjectConfigRequest> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  projectConfig: Schema.optional(TenantProjectConfig),
})).annotate({ identifier: "ApplyTenantProjectConfigRequest" }) as any as Schema.Schema<ApplyTenantProjectConfigRequest>;

export interface V1Beta1EnableConsumerResponse {
}

export const V1Beta1EnableConsumerResponse: Schema.Schema<V1Beta1EnableConsumerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V1Beta1EnableConsumerResponse" }) as any as Schema.Schema<V1Beta1EnableConsumerResponse>;

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

export interface V1Beta1GenerateServiceIdentityResponse {
  /** ServiceIdentity that was created or retrieved. */
  identity?: V1Beta1ServiceIdentity;
}

export const V1Beta1GenerateServiceIdentityResponse: Schema.Schema<V1Beta1GenerateServiceIdentityResponse> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(V1Beta1ServiceIdentity),
})).annotate({ identifier: "V1Beta1GenerateServiceIdentityResponse" }) as any as Schema.Schema<V1Beta1GenerateServiceIdentityResponse>;

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

export interface V1AddVisibilityLabelsResponse {
  /** The updated set of visibility labels for this consumer on this service. */
  labels?: Array<string>;
}

export const V1AddVisibilityLabelsResponse: Schema.Schema<V1AddVisibilityLabelsResponse> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "V1AddVisibilityLabelsResponse" }) as any as Schema.Schema<V1AddVisibilityLabelsResponse>;

export interface Monitoring {
  /** Monitoring configurations for sending metrics to the producer project. There can be multiple producer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  producerDestinations?: Array<MonitoringDestination>;
  /** Monitoring configurations for sending metrics to the consumer project. There can be multiple consumer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  consumerDestinations?: Array<MonitoringDestination>;
}

export const Monitoring: Schema.Schema<Monitoring> = Schema.suspend(() => Schema.Struct({
  producerDestinations: Schema.optional(Schema.Array(MonitoringDestination)),
  consumerDestinations: Schema.optional(Schema.Array(MonitoringDestination)),
})).annotate({ identifier: "Monitoring" }) as any as Schema.Schema<Monitoring>;

export interface SearchTenancyUnitsResponse {
  /** Tenancy Units matching the request. */
  tenancyUnits?: Array<TenancyUnit>;
  /** Pagination token for large results. */
  nextPageToken?: string;
}

export const SearchTenancyUnitsResponse: Schema.Schema<SearchTenancyUnitsResponse> = Schema.suspend(() => Schema.Struct({
  tenancyUnits: Schema.optional(Schema.Array(TenancyUnit)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchTenancyUnitsResponse" }) as any as Schema.Schema<SearchTenancyUnitsResponse>;

export interface V1Beta1DisableConsumerResponse {
}

export const V1Beta1DisableConsumerResponse: Schema.Schema<V1Beta1DisableConsumerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V1Beta1DisableConsumerResponse" }) as any as Schema.Schema<V1Beta1DisableConsumerResponse>;

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
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The source syntax of the service. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** Included interfaces. See Mixin. */
  mixins?: Array<Mixin>;
  /** Source context for the protocol buffer service represented by this message. */
  sourceContext?: SourceContext;
  /** A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces. */
  version?: string;
  /** The methods of this interface, in unspecified order. */
  methods?: Array<Method>;
  /** Any metadata attached to the interface. */
  options?: Array<Option>;
  /** The fully qualified name of this interface, including package name followed by the interface's simple name. */
  name?: string;
}

export const Api: Schema.Schema<Api> = Schema.suspend(() => Schema.Struct({
  edition: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
  mixins: Schema.optional(Schema.Array(Mixin)),
  sourceContext: Schema.optional(SourceContext),
  version: Schema.optional(Schema.String),
  methods: Schema.optional(Schema.Array(Method)),
  options: Schema.optional(Schema.Array(Option)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface V1DisableConsumerResponse {
}

export const V1DisableConsumerResponse: Schema.Schema<V1DisableConsumerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V1DisableConsumerResponse" }) as any as Schema.Schema<V1DisableConsumerResponse>;

export interface Endpoint {
  /** Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed. */
  allowCors?: boolean;
  /** The canonical name of this endpoint. */
  name?: string;
  /** The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com". */
  target?: string;
  /** Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints. */
  aliases?: Array<string>;
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  allowCors: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  aliases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface V1EnableConsumerResponse {
}

export const V1EnableConsumerResponse: Schema.Schema<V1EnableConsumerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "V1EnableConsumerResponse" }) as any as Schema.Schema<V1EnableConsumerResponse>;

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

export interface Enum {
  /** Enum value definitions. */
  enumvalue?: Array<EnumValue>;
  /** Enum type name. */
  name?: string;
  /** Protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
}

export const Enum: Schema.Schema<Enum> = Schema.suspend(() => Schema.Struct({
  enumvalue: Schema.optional(Schema.Array(EnumValue)),
  name: Schema.optional(Schema.String),
  options: Schema.optional(Schema.Array(Option)),
  sourceContext: Schema.optional(SourceContext),
  edition: Schema.optional(Schema.String),
  syntax: Schema.optional(Schema.String),
})).annotate({ identifier: "Enum" }) as any as Schema.Schema<Enum>;

export interface LogDescriptor {
  /** The set of labels that are available to describe a specific log entry. Runtime requests that contain labels not specified here are considered invalid. */
  labels?: Array<LabelDescriptor>;
  /** The human-readable name for this log. This information appears on the user interface and should be concise. */
  displayName?: string;
  /** The name of the log. It must be less than 512 characters long and can include the following characters: upper- and lower-case alphanumeric characters [A-Za-z0-9], and punctuation characters including slash, underscore, hyphen, period [/_-.]. */
  name?: string;
  /** A human-readable description of this log. This information appears in the documentation and can contain details. */
  description?: string;
}

export const LogDescriptor: Schema.Schema<LogDescriptor> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "LogDescriptor" }) as any as Schema.Schema<LogDescriptor>;

export interface Aspect {
  /** The type of this aspect configuration. */
  kind?: string;
  /** Optional. Rules of the Configuration. */
  rules?: Array<AspectRule>;
  /** Content of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  spec?: Record<string, unknown>;
}

export const Aspect: Schema.Schema<Aspect> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(AspectRule)),
  spec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Aspect" }) as any as Schema.Schema<Aspect>;

export interface MonitoredResourceDescriptor {
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`. */
  displayName?: string;
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`. */
  labels?: Array<LabelDescriptor>;
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
  /** Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`. */
  name?: string;
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoredResourceDescriptor" }) as any as Schema.Schema<MonitoredResourceDescriptor>;

export interface Service {
  /** A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF. */
  systemTypes?: Array<Type>;
  /** Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`. */
  configVersion?: number;
  /** Custom error configuration. */
  customError?: CustomError;
  /** Settings for [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from APIs defined as protocol buffers. */
  publishing?: Publishing;
  /** Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs. WARNING: Defining any entries in the `endpoints` list disables the automatic generation of default endpoint variations (e.g., `{service}.clients6.google.com`, `content-{service}.googleapis.com`, and mTLS variants like `{service}.mtls.googleapis.com`). To retain these default variations, you are required to explicitly include your main service endpoint (e.g., `myservice.googleapis.com`) in this list alongside any other custom endpoints (like REP, GFE, etc.). */
  endpoints?: Array<Endpoint>;
  /** Defines the metrics used by this service. */
  metrics?: Array<MetricDescriptor>;
  /** Configuration controlling usage of this service. */
  usage?: Usage;
  /** Configuration for the service control plane. */
  control?: Control;
  /** A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum */
  enums?: Array<Enum>;
  /** Monitoring configuration. */
  monitoring?: Monitoring;
  /** The product title for this service, it is the name displayed in Google Cloud Console. */
  title?: string;
  /** Defines the logs used by this service. */
  logs?: Array<LogDescriptor>;
  /** HTTP configuration. */
  http?: Http;
  /** Quota configuration. */
  quota?: Quota;
  /** A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead. */
  id?: string;
  /** Additional API documentation. */
  documentation?: Documentation;
  /** The Google project that owns this service. */
  producerProjectId?: string;
  /** Auth configuration. */
  authentication?: Authentication;
  /** Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners. */
  aspects?: Array<Aspect>;
  /** Logging configuration. */
  logging?: Logging;
  /** API backend configuration. */
  backend?: Backend;
  /** Billing configuration. */
  billing?: Billing;
  /** The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name. */
  name?: string;
  /** Context configuration. */
  context?: Context;
  /** A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files. */
  apis?: Array<Api>;
  /** A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32 */
  types?: Array<Type>;
  /** Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations. */
  monitoredResources?: Array<MonitoredResourceDescriptor>;
  /** Output only. The source information for this configuration if available. */
  sourceInfo?: SourceInfo;
  /** System parameter configuration. */
  systemParameters?: SystemParameters;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  systemTypes: Schema.optional(Schema.Array(Type)),
  configVersion: Schema.optional(Schema.Number),
  customError: Schema.optional(CustomError),
  publishing: Schema.optional(Publishing),
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  metrics: Schema.optional(Schema.Array(MetricDescriptor)),
  usage: Schema.optional(Usage),
  control: Schema.optional(Control),
  enums: Schema.optional(Schema.Array(Enum)),
  monitoring: Schema.optional(Monitoring),
  title: Schema.optional(Schema.String),
  logs: Schema.optional(Schema.Array(LogDescriptor)),
  http: Schema.optional(Http),
  quota: Schema.optional(Quota),
  id: Schema.optional(Schema.String),
  documentation: Schema.optional(Documentation),
  producerProjectId: Schema.optional(Schema.String),
  authentication: Schema.optional(Authentication),
  aspects: Schema.optional(Schema.Array(Aspect)),
  logging: Schema.optional(Logging),
  backend: Schema.optional(Backend),
  billing: Schema.optional(Billing),
  name: Schema.optional(Schema.String),
  context: Schema.optional(Context),
  apis: Schema.optional(Schema.Array(Api)),
  types: Schema.optional(Schema.Array(Type)),
  monitoredResources: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  sourceInfo: Schema.optional(SourceInfo),
  systemParameters: Schema.optional(SystemParameters),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface V1RemoveVisibilityLabelsResponse {
  /** The updated set of visibility labels for this consumer on this service. */
  labels?: Array<string>;
}

export const V1RemoveVisibilityLabelsResponse: Schema.Schema<V1RemoveVisibilityLabelsResponse> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "V1RemoveVisibilityLabelsResponse" }) as any as Schema.Schema<V1RemoveVisibilityLabelsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
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

/** Search tenancy units for a managed service. */
export interface SearchServicesRequest {
  /** Optional. Set a query `{expression}` for querying tenancy units. Your `{expression}` must be in the format: `field_name=literal_string`. The `field_name` is the name of the field you want to compare. Supported fields are `tenant_resources.tag` and `tenant_resources.resource`. For example, to search tenancy units that contain at least one tenant resource with a given tag 'xyz', use the query `tenant_resources.tag=xyz`. To search tenancy units that contain at least one tenant resource with a given resource name 'projects/123456', use the query `tenant_resources.resource=projects/123456`. Multiple expressions can be joined with `AND`s. Tenancy units must match all expressions to be included in the result set. For example, `tenant_resources.tag=xyz AND tenant_resources.resource=projects/123456` */
  query?: string;
  /** Optional. The maximum number of results returned by this request. Currently, the default maximum is set to 256. If `page_size` <= 256, the request proceeds. Else, the request fails with an `TU_INVALID_PAGE_SIZE` error. */
  pageSize?: number;
  /** Optional. The continuation token, which is used to page through large result sets. To get the next page of results, set this parameter to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** Required. Service for which search is performed. services/{service} {service} the name of a service, for example 'service.googleapis.com'. */
  parent: string;
}

export const SearchServicesRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}:search" }),
  svc,
) as unknown as Schema.Schema<SearchServicesRequest>;

export type SearchServicesResponse = SearchTenancyUnitsResponse;
export const SearchServicesResponse = SearchTenancyUnitsResponse;

export type SearchServicesError = CommonErrors;

export const searchServices = API.makePaginated(() => ({
  input: SearchServicesRequest,
  output: SearchServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Apply a configuration to an existing tenant project. This project must exist in an active state and have the original owner account. The caller must have permission to add a project to the given tenancy unit. The configuration is applied, but any existing settings on the project aren't modified. Specified policy bindings are applied. Existing bindings aren't modified. Specified services are activated. No service is deactivated. If specified, new billing configuration is applied. Omit a billing configuration to keep the existing one. A service account in the project is created if previously non existed. Specified labels will be appended to tenant project, note that the value of existing label key will be updated if the same label key is requested. The specified folder is ignored, as moving a tenant project to a different folder isn't supported. The operation fails if any of the steps fail, but no rollback of already applied configuration changes is attempted. Operation. */
export interface ApplyProjectConfigServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. */
  name: string;
  /** Request body */
  body?: ApplyTenantProjectConfigRequest;
}

export const ApplyProjectConfigServicesTenancyUnitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApplyTenantProjectConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}:applyProjectConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApplyProjectConfigServicesTenancyUnitsRequest>;

export type ApplyProjectConfigServicesTenancyUnitsResponse = Operation;
export const ApplyProjectConfigServicesTenancyUnitsResponse = Operation;

export type ApplyProjectConfigServicesTenancyUnitsError = CommonErrors;

export const applyProjectConfigServicesTenancyUnits: API.OperationMethod<ApplyProjectConfigServicesTenancyUnitsRequest, ApplyProjectConfigServicesTenancyUnitsResponse, ApplyProjectConfigServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApplyProjectConfigServicesTenancyUnitsRequest,
  output: ApplyProjectConfigServicesTenancyUnitsResponse,
  errors: [],
}));

/** Creates a tenancy unit with no tenant resources. If tenancy unit already exists, it will be returned, however, in this case, returned TenancyUnit does not have tenant_resources field set and ListTenancyUnits has to be used to get a complete TenancyUnit with all fields populated. */
export interface CreateServicesTenancyUnitsRequest {
  /** Required. services/{service}/{collection id}/{resource id} {collection id} is the cloud resource collection type representing the service consumer, for example 'projects', or 'organizations'. {resource id} is the consumer numeric id, such as project number: '123456'. {service} the name of a managed service, such as 'service.googleapis.com'. Enables service binding using the new tenancy unit. */
  parent: string;
  /** Request body */
  body?: CreateTenancyUnitRequest;
}

export const CreateServicesTenancyUnitsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateTenancyUnitRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesTenancyUnitsRequest>;

export type CreateServicesTenancyUnitsResponse = TenancyUnit;
export const CreateServicesTenancyUnitsResponse = TenancyUnit;

export type CreateServicesTenancyUnitsError = CommonErrors;

export const createServicesTenancyUnits: API.OperationMethod<CreateServicesTenancyUnitsRequest, CreateServicesTenancyUnitsResponse, CreateServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesTenancyUnitsRequest,
  output: CreateServicesTenancyUnitsResponse,
  errors: [],
}));

/** Find the tenancy unit for a managed service and service consumer. This method shouldn't be used in a service producer's runtime path, for example to find the tenant project number when creating VMs. Service producers must persist the tenant project's information after the project is created. */
export interface ListServicesTenancyUnitsRequest {
  /** Optional. The continuation token, which is used to page through large result sets. To get the next page of results, set this parameter to the value of `nextPageToken` from the previous response. */
  pageToken?: string;
  /** Optional. Filter expression over tenancy resources field. Optional. */
  filter?: string;
  /** Optional. The maximum number of results returned by this request. */
  pageSize?: number;
  /** Required. Managed service and service consumer. Required. services/{service}/{collection id}/{resource id} {collection id} is the cloud resource collection type representing the service consumer, for example 'projects', or 'organizations'. {resource id} is the consumer numeric id, such as project number: '123456'. {service} the name of a service, such as 'service.googleapis.com'. */
  parent: string;
}

export const ListServicesTenancyUnitsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits" }),
  svc,
) as unknown as Schema.Schema<ListServicesTenancyUnitsRequest>;

export type ListServicesTenancyUnitsResponse = ListTenancyUnitsResponse;
export const ListServicesTenancyUnitsResponse = ListTenancyUnitsResponse;

export type ListServicesTenancyUnitsError = CommonErrors;

export const listServicesTenancyUnits = API.makePaginated(() => ({
  input: ListServicesTenancyUnitsRequest,
  output: ListServicesTenancyUnitsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Attempts to undelete a previously deleted tenant project. The project must be in a DELETED state. There are no guarantees that an undeleted project will be in a fully restored and functional state. Call the `ApplyTenantProjectConfig` method to update its configuration and then validate all managed service resources. Operation. */
export interface UndeleteProjectServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. */
  name: string;
  /** Request body */
  body?: UndeleteTenantProjectRequest;
}

export const UndeleteProjectServicesTenancyUnitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteTenantProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}:undeleteProject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectServicesTenancyUnitsRequest>;

export type UndeleteProjectServicesTenancyUnitsResponse = Operation;
export const UndeleteProjectServicesTenancyUnitsResponse = Operation;

export type UndeleteProjectServicesTenancyUnitsError = CommonErrors;

export const undeleteProjectServicesTenancyUnits: API.OperationMethod<UndeleteProjectServicesTenancyUnitsRequest, UndeleteProjectServicesTenancyUnitsResponse, UndeleteProjectServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectServicesTenancyUnitsRequest,
  output: UndeleteProjectServicesTenancyUnitsResponse,
  errors: [],
}));

/** Deletes the specified project resource identified by a tenant resource tag. The mothod removes a project lien with a 'TenantManager' origin if that was added. It will then attempt to delete the project. If that operation fails, this method also fails. After the project has been deleted, the tenant resource state is set to DELETED. To permanently remove resource metadata, call the `RemoveTenantProject` method. New resources with the same tag can't be added if there are existing resources in a DELETED state. Operation. */
export interface DeleteProjectServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. */
  name: string;
  /** Request body */
  body?: DeleteTenantProjectRequest;
}

export const DeleteProjectServicesTenancyUnitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeleteTenantProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}:deleteProject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteProjectServicesTenancyUnitsRequest>;

export type DeleteProjectServicesTenancyUnitsResponse = Operation;
export const DeleteProjectServicesTenancyUnitsResponse = Operation;

export type DeleteProjectServicesTenancyUnitsError = CommonErrors;

export const deleteProjectServicesTenancyUnits: API.OperationMethod<DeleteProjectServicesTenancyUnitsRequest, DeleteProjectServicesTenancyUnitsResponse, DeleteProjectServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectServicesTenancyUnitsRequest,
  output: DeleteProjectServicesTenancyUnitsResponse,
  errors: [],
}));

/** Attach an existing project to the tenancy unit as a new tenant resource. The project could either be the tenant project reserved by calling `AddTenantProject` under a tenancy unit of a service producer's project of a managed service, or from a separate project. The caller is checked against a set of permissions as if calling `AddTenantProject` on the same service consumer. To trigger the attachment, the targeted tenant project must be in a folder. Make sure the ServiceConsumerManagement service account is the owner of that project. These two requirements are already met if the project is reserved by calling `AddTenantProject`. Operation. */
export interface AttachProjectServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit that the project will be attached to. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. */
  name: string;
  /** Request body */
  body?: AttachTenantProjectRequest;
}

export const AttachProjectServicesTenancyUnitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AttachTenantProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}:attachProject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AttachProjectServicesTenancyUnitsRequest>;

export type AttachProjectServicesTenancyUnitsResponse = Operation;
export const AttachProjectServicesTenancyUnitsResponse = Operation;

export type AttachProjectServicesTenancyUnitsError = CommonErrors;

export const attachProjectServicesTenancyUnits: API.OperationMethod<AttachProjectServicesTenancyUnitsRequest, AttachProjectServicesTenancyUnitsResponse, AttachProjectServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AttachProjectServicesTenancyUnitsRequest,
  output: AttachProjectServicesTenancyUnitsResponse,
  errors: [],
}));

/** Add a new tenant project to the tenancy unit. There can be a maximum of 1024 tenant projects in a tenancy unit. If there are previously failed `AddTenantProject` calls, you might need to call `RemoveTenantProject` first to resolve them before you can make another call to `AddTenantProject` with the same tag. Operation. */
export interface AddProjectServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. */
  parent: string;
  /** Request body */
  body?: AddTenantProjectRequest;
}

export const AddProjectServicesTenancyUnitsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddTenantProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}:addProject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddProjectServicesTenancyUnitsRequest>;

export type AddProjectServicesTenancyUnitsResponse = Operation;
export const AddProjectServicesTenancyUnitsResponse = Operation;

export type AddProjectServicesTenancyUnitsError = CommonErrors;

export const addProjectServicesTenancyUnits: API.OperationMethod<AddProjectServicesTenancyUnitsRequest, AddProjectServicesTenancyUnitsResponse, AddProjectServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddProjectServicesTenancyUnitsRequest,
  output: AddProjectServicesTenancyUnitsResponse,
  errors: [],
}));

/** Removes the specified project resource identified by a tenant resource tag. The method removes the project lien with 'TenantManager' origin if that was added. It then attempts to delete the project. If that operation fails, this method also fails. Calls to remove already removed or non-existent tenant project succeed. After the project has been deleted, or if was already in a DELETED state, resource metadata is permanently removed from the tenancy unit. Operation. */
export interface RemoveProjectServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit. Such as 'services/service.googleapis.com/projects/12345/tenancyUnits/abcd'. */
  name: string;
  /** Request body */
  body?: RemoveTenantProjectRequest;
}

export const RemoveProjectServicesTenancyUnitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemoveTenantProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}:removeProject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveProjectServicesTenancyUnitsRequest>;

export type RemoveProjectServicesTenancyUnitsResponse = Operation;
export const RemoveProjectServicesTenancyUnitsResponse = Operation;

export type RemoveProjectServicesTenancyUnitsError = CommonErrors;

export const removeProjectServicesTenancyUnits: API.OperationMethod<RemoveProjectServicesTenancyUnitsRequest, RemoveProjectServicesTenancyUnitsResponse, RemoveProjectServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveProjectServicesTenancyUnitsRequest,
  output: RemoveProjectServicesTenancyUnitsResponse,
  errors: [],
}));

/** Delete a tenancy unit. Before you delete the tenancy unit, there should be no tenant resources in it that aren't in a DELETED state. Operation. */
export interface DeleteServicesTenancyUnitsRequest {
  /** Required. Name of the tenancy unit to be deleted. */
  name: string;
}

export const DeleteServicesTenancyUnitsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}/tenancyUnits/{tenancyUnitsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteServicesTenancyUnitsRequest>;

export type DeleteServicesTenancyUnitsResponse = Operation;
export const DeleteServicesTenancyUnitsResponse = Operation;

export type DeleteServicesTenancyUnitsError = CommonErrors;

export const deleteServicesTenancyUnits: API.OperationMethod<DeleteServicesTenancyUnitsRequest, DeleteServicesTenancyUnitsResponse, DeleteServicesTenancyUnitsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteServicesTenancyUnitsRequest,
  output: DeleteServicesTenancyUnitsResponse,
  errors: [],
}));

