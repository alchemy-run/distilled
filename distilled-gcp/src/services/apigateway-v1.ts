// ==========================================================================
// API Gateway API (apigateway v1)
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
  name: "apigateway",
  version: "v1",
  rootUrl: "https://apigateway.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ApigatewayStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const ApigatewayStatus: Schema.Schema<ApigatewayStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "ApigatewayStatus" }) as any as Schema.Schema<ApigatewayStatus>;

export interface ApigatewayOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: ApigatewayStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const ApigatewayOperation: Schema.Schema<ApigatewayOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(ApigatewayStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ApigatewayOperation" }) as any as Schema.Schema<ApigatewayOperation>;

export interface ApigatewayListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<ApigatewayOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ApigatewayListOperationsResponse: Schema.Schema<ApigatewayListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(ApigatewayOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayListOperationsResponse" }) as any as Schema.Schema<ApigatewayListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ApigatewayCancelOperationRequest {
}

export const ApigatewayCancelOperationRequest: Schema.Schema<ApigatewayCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ApigatewayCancelOperationRequest" }) as any as Schema.Schema<ApigatewayCancelOperationRequest>;

export interface ApigatewayGateway {
  /** Output only. Resource name of the Gateway. Format: projects/{project}/locations/{location}/gateways/{gateway} */
  name?: string;
  /** Output only. Created time. */
  createTime?: string;
  /** Output only. Updated time. */
  updateTime?: string;
  /** Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources */
  labels?: Record<string, string>;
  /** Optional. Display name. */
  displayName?: string;
  /** Required. Resource name of the API Config for this Gateway. Format: projects/{project}/locations/global/apis/{api}/configs/{apiConfig} */
  apiConfig?: string;
  /** Output only. The current state of the Gateway. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPDATING" | (string & {});
  /** Output only. The default API Gateway host name of the form `{gateway_id}-{hash}.{region_code}.gateway.dev`. */
  defaultHostname?: string;
}

export const ApigatewayGateway: Schema.Schema<ApigatewayGateway> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  apiConfig: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  defaultHostname: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayGateway" }) as any as Schema.Schema<ApigatewayGateway>;

export interface ApigatewayListGatewaysResponse {
  /** Gateways. */
  gateways?: Array<ApigatewayGateway>;
  /** Next page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
}

export const ApigatewayListGatewaysResponse: Schema.Schema<ApigatewayListGatewaysResponse> = Schema.suspend(() => Schema.Struct({
  gateways: Schema.optional(Schema.Array(ApigatewayGateway)),
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayListGatewaysResponse" }) as any as Schema.Schema<ApigatewayListGatewaysResponse>;

export interface ApigatewayApi {
  /** Output only. Resource name of the API. Format: projects/{project}/locations/global/apis/{api} */
  name?: string;
  /** Output only. Created time. */
  createTime?: string;
  /** Output only. Updated time. */
  updateTime?: string;
  /** Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources */
  labels?: Record<string, string>;
  /** Optional. Display name. */
  displayName?: string;
  /** Optional. Immutable. The name of a Google Managed Service ( https://cloud.google.com/service-infrastructure/docs/glossary#managed). If not specified, a new Service will automatically be created in the same project as this API. */
  managedService?: string;
  /** Output only. State of the API. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPDATING" | (string & {});
}

export const ApigatewayApi: Schema.Schema<ApigatewayApi> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  managedService: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayApi" }) as any as Schema.Schema<ApigatewayApi>;

export interface ApigatewayListApisResponse {
  /** APIs. */
  apis?: Array<ApigatewayApi>;
  /** Next page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
}

export const ApigatewayListApisResponse: Schema.Schema<ApigatewayListApisResponse> = Schema.suspend(() => Schema.Struct({
  apis: Schema.optional(Schema.Array(ApigatewayApi)),
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayListApisResponse" }) as any as Schema.Schema<ApigatewayListApisResponse>;

export interface ApigatewayApiConfigFile {
  /** The file path (full or relative path). This is typically the path of the file when it is uploaded. */
  path?: string;
  /** The bytes that constitute the file. */
  contents?: string;
}

export const ApigatewayApiConfigFile: Schema.Schema<ApigatewayApiConfigFile> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  contents: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayApiConfigFile" }) as any as Schema.Schema<ApigatewayApiConfigFile>;

export interface ApigatewayApiConfigOpenApiDocument {
  /** The OpenAPI Specification document file. */
  document?: ApigatewayApiConfigFile;
}

export const ApigatewayApiConfigOpenApiDocument: Schema.Schema<ApigatewayApiConfigOpenApiDocument> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(ApigatewayApiConfigFile),
})).annotate({ identifier: "ApigatewayApiConfigOpenApiDocument" }) as any as Schema.Schema<ApigatewayApiConfigOpenApiDocument>;

export interface ApigatewayApiConfigGrpcServiceDefinition {
  /** Input only. File descriptor set, generated by protoc. To generate, use protoc with imports and source info included. For an example test.proto file, the following command would put the value in a new file named out.pb. $ protoc --include_imports --include_source_info test.proto -o out.pb */
  fileDescriptorSet?: ApigatewayApiConfigFile;
  /** Optional. Uncompiled proto files associated with the descriptor set, used for display purposes (server-side compilation is not supported). These should match the inputs to 'protoc' command used to generate file_descriptor_set. */
  source?: Array<ApigatewayApiConfigFile>;
}

export const ApigatewayApiConfigGrpcServiceDefinition: Schema.Schema<ApigatewayApiConfigGrpcServiceDefinition> = Schema.suspend(() => Schema.Struct({
  fileDescriptorSet: Schema.optional(ApigatewayApiConfigFile),
  source: Schema.optional(Schema.Array(ApigatewayApiConfigFile)),
})).annotate({ identifier: "ApigatewayApiConfigGrpcServiceDefinition" }) as any as Schema.Schema<ApigatewayApiConfigGrpcServiceDefinition>;

export interface ApigatewayApiConfig {
  /** Output only. Resource name of the API Config. Format: projects/{project}/locations/global/apis/{api}/configs/{api_config} */
  name?: string;
  /** Output only. Created time. */
  createTime?: string;
  /** Output only. Updated time. */
  updateTime?: string;
  /** Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources */
  labels?: Record<string, string>;
  /** Optional. Display name. */
  displayName?: string;
  /** Immutable. The Google Cloud IAM Service Account that Gateways serving this config should use to authenticate to other services. This may either be the Service Account's email (`{ACCOUNT_ID}@{PROJECT}.iam.gserviceaccount.com`) or its full resource name (`projects/{PROJECT}/accounts/{UNIQUE_ID}`). This is most often used when the service is a GCP resource such as a Cloud Run Service or an IAP-secured service. */
  gatewayServiceAccount?: string;
  /** Output only. The ID of the associated Service Config ( https://cloud.google.com/service-infrastructure/docs/glossary#config). */
  serviceConfigId?: string;
  /** Output only. State of the API Config. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPDATING" | "ACTIVATING" | (string & {});
  /** Optional. OpenAPI specification documents. If specified, grpc_services and managed_service_configs must not be included. */
  openapiDocuments?: Array<ApigatewayApiConfigOpenApiDocument>;
  /** Optional. gRPC service definition files. If specified, openapi_documents must not be included. */
  grpcServices?: Array<ApigatewayApiConfigGrpcServiceDefinition>;
  /** Optional. Service Configuration files. At least one must be included when using gRPC service definitions. See https://cloud.google.com/endpoints/docs/grpc/grpc-service-config#service_configuration_overview for the expected file contents. If multiple files are specified, the files are merged with the following rules: * All singular scalar fields are merged using "last one wins" semantics in the order of the files uploaded. * Repeated fields are concatenated. * Singular embedded messages are merged using these rules for nested fields. */
  managedServiceConfigs?: Array<ApigatewayApiConfigFile>;
}

export const ApigatewayApiConfig: Schema.Schema<ApigatewayApiConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  gatewayServiceAccount: Schema.optional(Schema.String),
  serviceConfigId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  openapiDocuments: Schema.optional(Schema.Array(ApigatewayApiConfigOpenApiDocument)),
  grpcServices: Schema.optional(Schema.Array(ApigatewayApiConfigGrpcServiceDefinition)),
  managedServiceConfigs: Schema.optional(Schema.Array(ApigatewayApiConfigFile)),
})).annotate({ identifier: "ApigatewayApiConfig" }) as any as Schema.Schema<ApigatewayApiConfig>;

export interface ApigatewayListApiConfigsResponse {
  /** API Configs. */
  apiConfigs?: Array<ApigatewayApiConfig>;
  /** Next page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
}

export const ApigatewayListApiConfigsResponse: Schema.Schema<ApigatewayListApiConfigsResponse> = Schema.suspend(() => Schema.Struct({
  apiConfigs: Schema.optional(Schema.Array(ApigatewayApiConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayListApiConfigsResponse" }) as any as Schema.Schema<ApigatewayListApiConfigsResponse>;

export interface ApigatewayLocation {
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

export const ApigatewayLocation: Schema.Schema<ApigatewayLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ApigatewayLocation" }) as any as Schema.Schema<ApigatewayLocation>;

export interface ApigatewayListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<ApigatewayLocation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ApigatewayListLocationsResponse: Schema.Schema<ApigatewayListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(ApigatewayLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayListLocationsResponse" }) as any as Schema.Schema<ApigatewayListLocationsResponse>;

export interface ApigatewayExpr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const ApigatewayExpr: Schema.Schema<ApigatewayExpr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayExpr" }) as any as Schema.Schema<ApigatewayExpr>;

export interface ApigatewayBinding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: ApigatewayExpr;
}

export const ApigatewayBinding: Schema.Schema<ApigatewayBinding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(ApigatewayExpr),
})).annotate({ identifier: "ApigatewayBinding" }) as any as Schema.Schema<ApigatewayBinding>;

export interface ApigatewayAuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const ApigatewayAuditLogConfig: Schema.Schema<ApigatewayAuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayAuditLogConfig" }) as any as Schema.Schema<ApigatewayAuditLogConfig>;

export interface ApigatewayAuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<ApigatewayAuditLogConfig>;
}

export const ApigatewayAuditConfig: Schema.Schema<ApigatewayAuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(ApigatewayAuditLogConfig)),
})).annotate({ identifier: "ApigatewayAuditConfig" }) as any as Schema.Schema<ApigatewayAuditConfig>;

export interface ApigatewayPolicy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<ApigatewayBinding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<ApigatewayAuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const ApigatewayPolicy: Schema.Schema<ApigatewayPolicy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(ApigatewayBinding)),
  auditConfigs: Schema.optional(Schema.Array(ApigatewayAuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayPolicy" }) as any as Schema.Schema<ApigatewayPolicy>;

export interface ApigatewaySetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: ApigatewayPolicy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const ApigatewaySetIamPolicyRequest: Schema.Schema<ApigatewaySetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(ApigatewayPolicy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewaySetIamPolicyRequest" }) as any as Schema.Schema<ApigatewaySetIamPolicyRequest>;

export interface ApigatewayTestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const ApigatewayTestIamPermissionsRequest: Schema.Schema<ApigatewayTestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayTestIamPermissionsRequest" }) as any as Schema.Schema<ApigatewayTestIamPermissionsRequest>;

export interface ApigatewayTestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const ApigatewayTestIamPermissionsResponse: Schema.Schema<ApigatewayTestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApigatewayTestIamPermissionsResponse" }) as any as Schema.Schema<ApigatewayTestIamPermissionsResponse>;

export interface ApigatewayOperationMetadataDiagnostic {
  /** Location of the diagnostic. */
  location?: string;
  /** The diagnostic message. */
  message?: string;
}

export const ApigatewayOperationMetadataDiagnostic: Schema.Schema<ApigatewayOperationMetadataDiagnostic> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "ApigatewayOperationMetadataDiagnostic" }) as any as Schema.Schema<ApigatewayOperationMetadataDiagnostic>;

export interface ApigatewayOperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Diagnostics generated during processing of configuration source files. */
  diagnostics?: Array<ApigatewayOperationMetadataDiagnostic>;
}

export const ApigatewayOperationMetadata: Schema.Schema<ApigatewayOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  diagnostics: Schema.optional(Schema.Array(ApigatewayOperationMetadataDiagnostic)),
})).annotate({ identifier: "ApigatewayOperationMetadata" }) as any as Schema.Schema<ApigatewayOperationMetadata>;

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

export type ListProjectsLocationsResponse = ApigatewayListLocationsResponse;
export const ListProjectsLocationsResponse = ApigatewayListLocationsResponse;

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

export type GetProjectsLocationsResponse = ApigatewayLocation;
export const GetProjectsLocationsResponse = ApigatewayLocation;

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

export type ListProjectsLocationsOperationsResponse = ApigatewayListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ApigatewayListOperationsResponse;

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

export type GetProjectsLocationsOperationsResponse = ApigatewayOperation;
export const GetProjectsLocationsOperationsResponse = ApigatewayOperation;

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
  body?: ApigatewayCancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApigatewayCancelOperationRequest).pipe(T.HttpBody()),
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

/** Lists Gateways in a given project and location. */
export interface ListProjectsLocationsGatewaysRequest {
  /** Required. Parent resource of the Gateway, of the form: `projects/* /locations/*` */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** Filter. */
  filter?: string;
  /** Order by parameters. */
  orderBy?: string;
}

export const ListProjectsLocationsGatewaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGatewaysRequest>;

export type ListProjectsLocationsGatewaysResponse = ApigatewayListGatewaysResponse;
export const ListProjectsLocationsGatewaysResponse = ApigatewayListGatewaysResponse;

export type ListProjectsLocationsGatewaysError = CommonErrors;

export const listProjectsLocationsGateways = API.makePaginated(() => ({
  input: ListProjectsLocationsGatewaysRequest,
  output: ListProjectsLocationsGatewaysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Gateway. */
export interface GetProjectsLocationsGatewaysRequest {
  /** Required. Resource name of the form: `projects/* /locations/* /gateways/*` */
  name: string;
}

export const GetProjectsLocationsGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways/{gatewaysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGatewaysRequest>;

export type GetProjectsLocationsGatewaysResponse = ApigatewayGateway;
export const GetProjectsLocationsGatewaysResponse = ApigatewayGateway;

export type GetProjectsLocationsGatewaysError = CommonErrors;

export const getProjectsLocationsGateways: API.OperationMethod<GetProjectsLocationsGatewaysRequest, GetProjectsLocationsGatewaysResponse, GetProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGatewaysRequest,
  output: GetProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Creates a new Gateway in a given project and location. */
export interface CreateProjectsLocationsGatewaysRequest {
  /** Required. Parent resource of the Gateway, of the form: `projects/* /locations/*` */
  parent: string;
  /** Required. Identifier to assign to the Gateway. Must be unique within scope of the parent resource. */
  gatewayId?: string;
  /** Request body */
  body?: ApigatewayGateway;
}

export const CreateProjectsLocationsGatewaysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  gatewayId: Schema.optional(Schema.String).pipe(T.HttpQuery("gatewayId")),
  body: Schema.optional(ApigatewayGateway).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGatewaysRequest>;

export type CreateProjectsLocationsGatewaysResponse = ApigatewayOperation;
export const CreateProjectsLocationsGatewaysResponse = ApigatewayOperation;

export type CreateProjectsLocationsGatewaysError = CommonErrors;

export const createProjectsLocationsGateways: API.OperationMethod<CreateProjectsLocationsGatewaysRequest, CreateProjectsLocationsGatewaysResponse, CreateProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGatewaysRequest,
  output: CreateProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Updates the parameters of a single Gateway. */
export interface PatchProjectsLocationsGatewaysRequest {
  /** Output only. Resource name of the Gateway. Format: projects/{project}/locations/{location}/gateways/{gateway} */
  name: string;
  /** Field mask is used to specify the fields to be overwritten in the Gateway resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ApigatewayGateway;
}

export const PatchProjectsLocationsGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ApigatewayGateway).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways/{gatewaysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGatewaysRequest>;

export type PatchProjectsLocationsGatewaysResponse = ApigatewayOperation;
export const PatchProjectsLocationsGatewaysResponse = ApigatewayOperation;

export type PatchProjectsLocationsGatewaysError = CommonErrors;

export const patchProjectsLocationsGateways: API.OperationMethod<PatchProjectsLocationsGatewaysRequest, PatchProjectsLocationsGatewaysResponse, PatchProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGatewaysRequest,
  output: PatchProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Deletes a single Gateway. */
export interface DeleteProjectsLocationsGatewaysRequest {
  /** Required. Resource name of the form: `projects/* /locations/* /gateways/*` */
  name: string;
}

export const DeleteProjectsLocationsGatewaysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways/{gatewaysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGatewaysRequest>;

export type DeleteProjectsLocationsGatewaysResponse = ApigatewayOperation;
export const DeleteProjectsLocationsGatewaysResponse = ApigatewayOperation;

export type DeleteProjectsLocationsGatewaysError = CommonErrors;

export const deleteProjectsLocationsGateways: API.OperationMethod<DeleteProjectsLocationsGatewaysRequest, DeleteProjectsLocationsGatewaysResponse, DeleteProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGatewaysRequest,
  output: DeleteProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsGatewaysRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: ApigatewaySetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ApigatewaySetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways/{gatewaysId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGatewaysRequest>;

export type SetIamPolicyProjectsLocationsGatewaysResponse = ApigatewayPolicy;
export const SetIamPolicyProjectsLocationsGatewaysResponse = ApigatewayPolicy;

export type SetIamPolicyProjectsLocationsGatewaysError = CommonErrors;

export const setIamPolicyProjectsLocationsGateways: API.OperationMethod<SetIamPolicyProjectsLocationsGatewaysRequest, SetIamPolicyProjectsLocationsGatewaysResponse, SetIamPolicyProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGatewaysRequest,
  output: SetIamPolicyProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGatewaysRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways/{gatewaysId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGatewaysRequest>;

export type GetIamPolicyProjectsLocationsGatewaysResponse = ApigatewayPolicy;
export const GetIamPolicyProjectsLocationsGatewaysResponse = ApigatewayPolicy;

export type GetIamPolicyProjectsLocationsGatewaysError = CommonErrors;

export const getIamPolicyProjectsLocationsGateways: API.OperationMethod<GetIamPolicyProjectsLocationsGatewaysRequest, GetIamPolicyProjectsLocationsGatewaysResponse, GetIamPolicyProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGatewaysRequest,
  output: GetIamPolicyProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGatewaysRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: ApigatewayTestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGatewaysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ApigatewayTestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/gateways/{gatewaysId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGatewaysRequest>;

export type TestIamPermissionsProjectsLocationsGatewaysResponse = ApigatewayTestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGatewaysResponse = ApigatewayTestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGatewaysError = CommonErrors;

export const testIamPermissionsProjectsLocationsGateways: API.OperationMethod<TestIamPermissionsProjectsLocationsGatewaysRequest, TestIamPermissionsProjectsLocationsGatewaysResponse, TestIamPermissionsProjectsLocationsGatewaysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGatewaysRequest,
  output: TestIamPermissionsProjectsLocationsGatewaysResponse,
  errors: [],
}));

/** Lists Apis in a given project and location. */
export interface ListProjectsLocationsApisRequest {
  /** Required. Parent resource of the API, of the form: `projects/* /locations/global` */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** Filter. */
  filter?: string;
  /** Order by parameters. */
  orderBy?: string;
}

export const ListProjectsLocationsApisRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisRequest>;

export type ListProjectsLocationsApisResponse = ApigatewayListApisResponse;
export const ListProjectsLocationsApisResponse = ApigatewayListApisResponse;

export type ListProjectsLocationsApisError = CommonErrors;

export const listProjectsLocationsApis = API.makePaginated(() => ({
  input: ListProjectsLocationsApisRequest,
  output: ListProjectsLocationsApisResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Api. */
export interface GetProjectsLocationsApisRequest {
  /** Required. Resource name of the form: `projects/* /locations/global/apis/*` */
  name: string;
}

export const GetProjectsLocationsApisRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisRequest>;

export type GetProjectsLocationsApisResponse = ApigatewayApi;
export const GetProjectsLocationsApisResponse = ApigatewayApi;

export type GetProjectsLocationsApisError = CommonErrors;

export const getProjectsLocationsApis: API.OperationMethod<GetProjectsLocationsApisRequest, GetProjectsLocationsApisResponse, GetProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisRequest,
  output: GetProjectsLocationsApisResponse,
  errors: [],
}));

/** Creates a new Api in a given project and location. */
export interface CreateProjectsLocationsApisRequest {
  /** Required. Parent resource of the API, of the form: `projects/* /locations/global` */
  parent: string;
  /** Required. Identifier to assign to the API. Must be unique within scope of the parent resource. */
  apiId?: string;
  /** Request body */
  body?: ApigatewayApi;
}

export const CreateProjectsLocationsApisRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  apiId: Schema.optional(Schema.String).pipe(T.HttpQuery("apiId")),
  body: Schema.optional(ApigatewayApi).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisRequest>;

export type CreateProjectsLocationsApisResponse = ApigatewayOperation;
export const CreateProjectsLocationsApisResponse = ApigatewayOperation;

export type CreateProjectsLocationsApisError = CommonErrors;

export const createProjectsLocationsApis: API.OperationMethod<CreateProjectsLocationsApisRequest, CreateProjectsLocationsApisResponse, CreateProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisRequest,
  output: CreateProjectsLocationsApisResponse,
  errors: [],
}));

/** Updates the parameters of a single Api. */
export interface PatchProjectsLocationsApisRequest {
  /** Output only. Resource name of the API. Format: projects/{project}/locations/global/apis/{api} */
  name: string;
  /** Field mask is used to specify the fields to be overwritten in the Api resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ApigatewayApi;
}

export const PatchProjectsLocationsApisRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ApigatewayApi).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApisRequest>;

export type PatchProjectsLocationsApisResponse = ApigatewayOperation;
export const PatchProjectsLocationsApisResponse = ApigatewayOperation;

export type PatchProjectsLocationsApisError = CommonErrors;

export const patchProjectsLocationsApis: API.OperationMethod<PatchProjectsLocationsApisRequest, PatchProjectsLocationsApisResponse, PatchProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApisRequest,
  output: PatchProjectsLocationsApisResponse,
  errors: [],
}));

/** Deletes a single Api. */
export interface DeleteProjectsLocationsApisRequest {
  /** Required. Resource name of the form: `projects/* /locations/global/apis/*` */
  name: string;
}

export const DeleteProjectsLocationsApisRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisRequest>;

export type DeleteProjectsLocationsApisResponse = ApigatewayOperation;
export const DeleteProjectsLocationsApisResponse = ApigatewayOperation;

export type DeleteProjectsLocationsApisError = CommonErrors;

export const deleteProjectsLocationsApis: API.OperationMethod<DeleteProjectsLocationsApisRequest, DeleteProjectsLocationsApisResponse, DeleteProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisRequest,
  output: DeleteProjectsLocationsApisResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsApisRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: ApigatewaySetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ApigatewaySetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisRequest>;

export type SetIamPolicyProjectsLocationsApisResponse = ApigatewayPolicy;
export const SetIamPolicyProjectsLocationsApisResponse = ApigatewayPolicy;

export type SetIamPolicyProjectsLocationsApisError = CommonErrors;

export const setIamPolicyProjectsLocationsApis: API.OperationMethod<SetIamPolicyProjectsLocationsApisRequest, SetIamPolicyProjectsLocationsApisResponse, SetIamPolicyProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisRequest,
  output: SetIamPolicyProjectsLocationsApisResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsApisRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsApisRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisRequest>;

export type GetIamPolicyProjectsLocationsApisResponse = ApigatewayPolicy;
export const GetIamPolicyProjectsLocationsApisResponse = ApigatewayPolicy;

export type GetIamPolicyProjectsLocationsApisError = CommonErrors;

export const getIamPolicyProjectsLocationsApis: API.OperationMethod<GetIamPolicyProjectsLocationsApisRequest, GetIamPolicyProjectsLocationsApisResponse, GetIamPolicyProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisRequest,
  output: GetIamPolicyProjectsLocationsApisResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsApisRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: ApigatewayTestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ApigatewayTestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisRequest>;

export type TestIamPermissionsProjectsLocationsApisResponse = ApigatewayTestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisResponse = ApigatewayTestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisError = CommonErrors;

export const testIamPermissionsProjectsLocationsApis: API.OperationMethod<TestIamPermissionsProjectsLocationsApisRequest, TestIamPermissionsProjectsLocationsApisResponse, TestIamPermissionsProjectsLocationsApisError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisRequest,
  output: TestIamPermissionsProjectsLocationsApisResponse,
  errors: [],
}));

/** Lists ApiConfigs in a given project and location. */
export interface ListProjectsLocationsApisConfigsRequest {
  /** Required. Parent resource of the API Config, of the form: `projects/* /locations/global/apis/*` */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** Filter. */
  filter?: string;
  /** Order by parameters. */
  orderBy?: string;
}

export const ListProjectsLocationsApisConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApisConfigsRequest>;

export type ListProjectsLocationsApisConfigsResponse = ApigatewayListApiConfigsResponse;
export const ListProjectsLocationsApisConfigsResponse = ApigatewayListApiConfigsResponse;

export type ListProjectsLocationsApisConfigsError = CommonErrors;

export const listProjectsLocationsApisConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsApisConfigsRequest,
  output: ListProjectsLocationsApisConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ApiConfig. */
export interface GetProjectsLocationsApisConfigsRequest {
  /** Required. Resource name of the form: `projects/* /locations/global/apis/* /configs/*` */
  name: string;
  /** Specifies which fields of the API Config are returned in the response. Defaults to `BASIC` view. */
  view?: "CONFIG_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsApisConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs/{configsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApisConfigsRequest>;

export type GetProjectsLocationsApisConfigsResponse = ApigatewayApiConfig;
export const GetProjectsLocationsApisConfigsResponse = ApigatewayApiConfig;

export type GetProjectsLocationsApisConfigsError = CommonErrors;

export const getProjectsLocationsApisConfigs: API.OperationMethod<GetProjectsLocationsApisConfigsRequest, GetProjectsLocationsApisConfigsResponse, GetProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApisConfigsRequest,
  output: GetProjectsLocationsApisConfigsResponse,
  errors: [],
}));

/** Creates a new ApiConfig in a given project and location. */
export interface CreateProjectsLocationsApisConfigsRequest {
  /** Required. Parent resource of the API Config, of the form: `projects/* /locations/global/apis/*` */
  parent: string;
  /** Required. Identifier to assign to the API Config. Must be unique within scope of the parent resource. */
  apiConfigId?: string;
  /** Request body */
  body?: ApigatewayApiConfig;
}

export const CreateProjectsLocationsApisConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  apiConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("apiConfigId")),
  body: Schema.optional(ApigatewayApiConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApisConfigsRequest>;

export type CreateProjectsLocationsApisConfigsResponse = ApigatewayOperation;
export const CreateProjectsLocationsApisConfigsResponse = ApigatewayOperation;

export type CreateProjectsLocationsApisConfigsError = CommonErrors;

export const createProjectsLocationsApisConfigs: API.OperationMethod<CreateProjectsLocationsApisConfigsRequest, CreateProjectsLocationsApisConfigsResponse, CreateProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApisConfigsRequest,
  output: CreateProjectsLocationsApisConfigsResponse,
  errors: [],
}));

/** Updates the parameters of a single ApiConfig. */
export interface PatchProjectsLocationsApisConfigsRequest {
  /** Output only. Resource name of the API Config. Format: projects/{project}/locations/global/apis/{api}/configs/{api_config} */
  name: string;
  /** Field mask is used to specify the fields to be overwritten in the ApiConfig resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ApigatewayApiConfig;
}

export const PatchProjectsLocationsApisConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ApigatewayApiConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs/{configsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApisConfigsRequest>;

export type PatchProjectsLocationsApisConfigsResponse = ApigatewayOperation;
export const PatchProjectsLocationsApisConfigsResponse = ApigatewayOperation;

export type PatchProjectsLocationsApisConfigsError = CommonErrors;

export const patchProjectsLocationsApisConfigs: API.OperationMethod<PatchProjectsLocationsApisConfigsRequest, PatchProjectsLocationsApisConfigsResponse, PatchProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApisConfigsRequest,
  output: PatchProjectsLocationsApisConfigsResponse,
  errors: [],
}));

/** Deletes a single ApiConfig. */
export interface DeleteProjectsLocationsApisConfigsRequest {
  /** Required. Resource name of the form: `projects/* /locations/global/apis/* /configs/*` */
  name: string;
}

export const DeleteProjectsLocationsApisConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs/{configsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApisConfigsRequest>;

export type DeleteProjectsLocationsApisConfigsResponse = ApigatewayOperation;
export const DeleteProjectsLocationsApisConfigsResponse = ApigatewayOperation;

export type DeleteProjectsLocationsApisConfigsError = CommonErrors;

export const deleteProjectsLocationsApisConfigs: API.OperationMethod<DeleteProjectsLocationsApisConfigsRequest, DeleteProjectsLocationsApisConfigsResponse, DeleteProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApisConfigsRequest,
  output: DeleteProjectsLocationsApisConfigsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsApisConfigsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: ApigatewaySetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApisConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ApigatewaySetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs/{configsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApisConfigsRequest>;

export type SetIamPolicyProjectsLocationsApisConfigsResponse = ApigatewayPolicy;
export const SetIamPolicyProjectsLocationsApisConfigsResponse = ApigatewayPolicy;

export type SetIamPolicyProjectsLocationsApisConfigsError = CommonErrors;

export const setIamPolicyProjectsLocationsApisConfigs: API.OperationMethod<SetIamPolicyProjectsLocationsApisConfigsRequest, SetIamPolicyProjectsLocationsApisConfigsResponse, SetIamPolicyProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApisConfigsRequest,
  output: SetIamPolicyProjectsLocationsApisConfigsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsApisConfigsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsApisConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs/{configsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApisConfigsRequest>;

export type GetIamPolicyProjectsLocationsApisConfigsResponse = ApigatewayPolicy;
export const GetIamPolicyProjectsLocationsApisConfigsResponse = ApigatewayPolicy;

export type GetIamPolicyProjectsLocationsApisConfigsError = CommonErrors;

export const getIamPolicyProjectsLocationsApisConfigs: API.OperationMethod<GetIamPolicyProjectsLocationsApisConfigsRequest, GetIamPolicyProjectsLocationsApisConfigsResponse, GetIamPolicyProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApisConfigsRequest,
  output: GetIamPolicyProjectsLocationsApisConfigsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsApisConfigsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: ApigatewayTestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApisConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(ApigatewayTestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/apis/{apisId}/configs/{configsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApisConfigsRequest>;

export type TestIamPermissionsProjectsLocationsApisConfigsResponse = ApigatewayTestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApisConfigsResponse = ApigatewayTestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApisConfigsError = CommonErrors;

export const testIamPermissionsProjectsLocationsApisConfigs: API.OperationMethod<TestIamPermissionsProjectsLocationsApisConfigsRequest, TestIamPermissionsProjectsLocationsApisConfigsResponse, TestIamPermissionsProjectsLocationsApisConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApisConfigsRequest,
  output: TestIamPermissionsProjectsLocationsApisConfigsResponse,
  errors: [],
}));

