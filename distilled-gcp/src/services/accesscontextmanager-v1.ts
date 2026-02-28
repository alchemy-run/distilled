// ==========================================================================
// Access Context Manager API (accesscontextmanager v1)
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
  name: "accesscontextmanager",
  version: "v1",
  rootUrl: "https://accesscontextmanager.googleapis.com/",
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

export interface AccessPolicy {
  /** Output only. Identifier. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}` */
  name?: string;
  /** Required. The parent of this `AccessPolicy` in the Cloud Resource Hierarchy. Currently immutable once created. Format: `organizations/{organization_id}` */
  parent?: string;
  /** Required. Human readable title. Does not affect behavior. */
  title?: string;
  /** The scopes of the AccessPolicy. Scopes define which resources a policy can restrict and where its resources can be referenced. For example, policy A with `scopes=["folders/123"]` has the following behavior: - ServicePerimeter can only restrict projects within `folders/123`. - ServicePerimeter within policy A can only reference access levels defined within policy A. - Only one policy can include a given scope; thus, attempting to create a second policy which includes `folders/123` will result in an error. If no scopes are provided, then any resource within the organization can be restricted. Scopes cannot be modified after a policy is created. Policies can only have a single scope. Format: list of `folders/{folder_number}` or `projects/{project_number}` */
  scopes?: Array<string>;
  /** Output only. An opaque identifier for the current version of the `AccessPolicy`. This will always be a strongly validated etag, meaning that two Access Policies will be identical if and only if their etags are identical. Clients should not expect this to be in any specific format. */
  etag?: string;
}

export const AccessPolicy: Schema.Schema<AccessPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessPolicy" }) as any as Schema.Schema<AccessPolicy>;

export interface ListAccessPoliciesResponse {
  /** List of the AccessPolicy instances. */
  accessPolicies?: Array<AccessPolicy>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListAccessPoliciesResponse: Schema.Schema<ListAccessPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  accessPolicies: Schema.optional(Schema.Array(AccessPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccessPoliciesResponse" }) as any as Schema.Schema<ListAccessPoliciesResponse>;

export interface OsConstraint {
  /** Required. The allowed OS type. */
  osType?: "OS_UNSPECIFIED" | "DESKTOP_MAC" | "DESKTOP_WINDOWS" | "DESKTOP_LINUX" | "DESKTOP_CHROME_OS" | "ANDROID" | "IOS" | (string & {});
  /** The minimum allowed OS version. If not set, any version of this OS satisfies the constraint. Format: `"major.minor.patch"`. Examples: `"10.5.301"`, `"9.2.1"`. */
  minimumVersion?: string;
  /** Only allows requests from devices with a verified Chrome OS. Verifications includes requirements that the device is enterprise-managed, conformant to domain policies, and the caller has permission to call the API targeted by the request. */
  requireVerifiedChromeOs?: boolean;
}

export const OsConstraint: Schema.Schema<OsConstraint> = Schema.suspend(() => Schema.Struct({
  osType: Schema.optional(Schema.String),
  minimumVersion: Schema.optional(Schema.String),
  requireVerifiedChromeOs: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OsConstraint" }) as any as Schema.Schema<OsConstraint>;

export interface DevicePolicy {
  /** Whether or not screenlock is required for the DevicePolicy to be true. Defaults to `false`. */
  requireScreenlock?: boolean;
  /** Allowed encryptions statuses, an empty list allows all statuses. */
  allowedEncryptionStatuses?: Array<"ENCRYPTION_UNSPECIFIED" | "ENCRYPTION_UNSUPPORTED" | "UNENCRYPTED" | "ENCRYPTED" | (string & {})>;
  /** Allowed OS versions, an empty list allows all types and all versions. */
  osConstraints?: Array<OsConstraint>;
  /** Allowed device management levels, an empty list allows all management levels. */
  allowedDeviceManagementLevels?: Array<"MANAGEMENT_UNSPECIFIED" | "NONE" | "BASIC" | "COMPLETE" | (string & {})>;
  /** Whether the device needs to be approved by the customer admin. */
  requireAdminApproval?: boolean;
  /** Whether the device needs to be corp owned. */
  requireCorpOwned?: boolean;
}

export const DevicePolicy: Schema.Schema<DevicePolicy> = Schema.suspend(() => Schema.Struct({
  requireScreenlock: Schema.optional(Schema.Boolean),
  allowedEncryptionStatuses: Schema.optional(Schema.Array(Schema.String)),
  osConstraints: Schema.optional(Schema.Array(OsConstraint)),
  allowedDeviceManagementLevels: Schema.optional(Schema.Array(Schema.String)),
  requireAdminApproval: Schema.optional(Schema.Boolean),
  requireCorpOwned: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DevicePolicy" }) as any as Schema.Schema<DevicePolicy>;

export interface VpcSubNetwork {
  /** Required. Network name. If the network is not part of the organization, the `compute.network.get` permission must be granted to the caller. Format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NETWORK_NAME}` Example: `//compute.googleapis.com/projects/my-project/global/networks/network-1` */
  network?: string;
  /** CIDR block IP subnetwork specification. The IP address must be an IPv4 address and can be a public or private IP address. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is not. If empty, all IP addresses are allowed. */
  vpcIpSubnetworks?: Array<string>;
}

export const VpcSubNetwork: Schema.Schema<VpcSubNetwork> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  vpcIpSubnetworks: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VpcSubNetwork" }) as any as Schema.Schema<VpcSubNetwork>;

export interface VpcNetworkSource {
  /** Sub-segment ranges of a VPC network. */
  vpcSubnetwork?: VpcSubNetwork;
}

export const VpcNetworkSource: Schema.Schema<VpcNetworkSource> = Schema.suspend(() => Schema.Struct({
  vpcSubnetwork: Schema.optional(VpcSubNetwork),
})).annotate({ identifier: "VpcNetworkSource" }) as any as Schema.Schema<VpcNetworkSource>;

export interface Condition {
  /** CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is not. Similarly, for IPv6, "2001:db8::/32" is accepted whereas "2001:db8::1/32" is not. The originating IP of a request must be in one of the listed subnets in order for this Condition to be true. If empty, all IP addresses are allowed. */
  ipSubnetworks?: Array<string>;
  /** Device specific restrictions, all restrictions must hold for the Condition to be true. If not specified, all devices are allowed. */
  devicePolicy?: DevicePolicy;
  /** A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` which does not exist is an error. All access levels listed must be granted for the Condition to be true. Example: "`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"` */
  requiredAccessLevels?: Array<string>;
  /** Whether to negate the Condition. If true, the Condition becomes a NAND over its non-empty fields. Any non-empty field criteria evaluating to false will result in the Condition to be satisfied. Defaults to false. */
  negate?: boolean;
  /** The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user. */
  members?: Array<string>;
  /** The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes. */
  regions?: Array<string>;
  /** The request must originate from one of the provided VPC networks in Google Cloud. Cannot specify this field together with `ip_subnetworks`. */
  vpcNetworkSources?: Array<VpcNetworkSource>;
}

export const Condition: Schema.Schema<Condition> = Schema.suspend(() => Schema.Struct({
  ipSubnetworks: Schema.optional(Schema.Array(Schema.String)),
  devicePolicy: Schema.optional(DevicePolicy),
  requiredAccessLevels: Schema.optional(Schema.Array(Schema.String)),
  negate: Schema.optional(Schema.Boolean),
  members: Schema.optional(Schema.Array(Schema.String)),
  regions: Schema.optional(Schema.Array(Schema.String)),
  vpcNetworkSources: Schema.optional(Schema.Array(VpcNetworkSource)),
})).annotate({ identifier: "Condition" }) as any as Schema.Schema<Condition>;

export interface BasicLevel {
  /** Required. A list of requirements for the `AccessLevel` to be granted. */
  conditions?: Array<Condition>;
  /** How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If AND is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If OR is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is AND. */
  combiningFunction?: "AND" | "OR" | (string & {});
}

export const BasicLevel: Schema.Schema<BasicLevel> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Array(Condition)),
  combiningFunction: Schema.optional(Schema.String),
})).annotate({ identifier: "BasicLevel" }) as any as Schema.Schema<BasicLevel>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface CustomLevel {
  /** Required. A Cloud CEL expression evaluating to a boolean. */
  expr?: Expr;
}

export const CustomLevel: Schema.Schema<CustomLevel> = Schema.suspend(() => Schema.Struct({
  expr: Schema.optional(Expr),
})).annotate({ identifier: "CustomLevel" }) as any as Schema.Schema<CustomLevel>;

export interface AccessLevel {
  /** Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`. */
  name?: string;
  /** Human readable title. Must be unique within the Policy. */
  title?: string;
  /** Description of the `AccessLevel` and its use. Does not affect behavior. */
  description?: string;
  /** A `BasicLevel` composed of `Conditions`. */
  basic?: BasicLevel;
  /** A `CustomLevel` written in the Common Expression Language. */
  custom?: CustomLevel;
}

export const AccessLevel: Schema.Schema<AccessLevel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  basic: Schema.optional(BasicLevel),
  custom: Schema.optional(CustomLevel),
})).annotate({ identifier: "AccessLevel" }) as any as Schema.Schema<AccessLevel>;

export interface ListAccessLevelsResponse {
  /** List of the Access Level instances. */
  accessLevels?: Array<AccessLevel>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListAccessLevelsResponse: Schema.Schema<ListAccessLevelsResponse> = Schema.suspend(() => Schema.Struct({
  accessLevels: Schema.optional(Schema.Array(AccessLevel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccessLevelsResponse" }) as any as Schema.Schema<ListAccessLevelsResponse>;

export interface ReplaceAccessLevelsRequest {
  /** Required. The desired Access Levels that should replace all existing Access Levels in the Access Policy. */
  accessLevels?: Array<AccessLevel>;
  /** Optional. The etag for the version of the Access Policy that this replace operation is to be performed on. If, at the time of replace, the etag for the Access Policy stored in Access Context Manager is different from the specified etag, then the replace operation will not be performed and the call will fail. This field is not required. If etag is not provided, the operation will be performed as if a valid etag is provided. */
  etag?: string;
}

export const ReplaceAccessLevelsRequest: Schema.Schema<ReplaceAccessLevelsRequest> = Schema.suspend(() => Schema.Struct({
  accessLevels: Schema.optional(Schema.Array(AccessLevel)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ReplaceAccessLevelsRequest" }) as any as Schema.Schema<ReplaceAccessLevelsRequest>;

export interface VpcAccessibleServices {
  /** Whether to restrict API calls within the Service Perimeter to the list of APIs specified in 'allowed_services'. */
  enableRestriction?: boolean;
  /** The list of APIs usable within the Service Perimeter. Must be empty unless 'enable_restriction' is True. You can specify a list of individual services, as well as include the 'RESTRICTED-SERVICES' value, which automatically includes all of the services protected by the perimeter. */
  allowedServices?: Array<string>;
}

export const VpcAccessibleServices: Schema.Schema<VpcAccessibleServices> = Schema.suspend(() => Schema.Struct({
  enableRestriction: Schema.optional(Schema.Boolean),
  allowedServices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VpcAccessibleServices" }) as any as Schema.Schema<VpcAccessibleServices>;

export interface IngressSource {
  /** An AccessLevel resource name that allow resources within the ServicePerimeters to be accessed from the internet. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If no AccessLevel names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all IngressSources will be allowed. */
  accessLevel?: string;
  /** A Google Cloud resource that is allowed to ingress the perimeter. Requests from these resources will be allowed to access perimeter data. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. The project may be in any Google Cloud organization, not just the organization that the perimeter is defined in. `*` is not allowed, the case of allowing all Google Cloud resources only is not supported. */
  resource?: string;
}

export const IngressSource: Schema.Schema<IngressSource> = Schema.suspend(() => Schema.Struct({
  accessLevel: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "IngressSource" }) as any as Schema.Schema<IngressSource>;

export interface IngressFrom {
  /** Sources that this IngressPolicy authorizes access from. */
  sources?: Array<IngressSource>;
  /** A list of identities that are allowed access through [IngressPolicy]. Identities can be an individual user, service account, Google group, or third-party identity. For third-party identity, only single identities are supported and other identity types are not supported. The `v1` identities that have the prefix `user`, `group`, `serviceAccount`, and `principal` in https://cloud.google.com/iam/docs/principal-identifiers#v1 are supported. */
  identities?: Array<string>;
  /** Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. */
  identityType?: "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT" | (string & {});
}

export const IngressFrom: Schema.Schema<IngressFrom> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(IngressSource)),
  identities: Schema.optional(Schema.Array(Schema.String)),
  identityType: Schema.optional(Schema.String),
})).annotate({ identifier: "IngressFrom" }) as any as Schema.Schema<IngressFrom>;

export interface MethodSelector {
  /** A valid method name for the corresponding `service_name` in ApiOperation. If `*` is used as the value for the `method`, then ALL methods and permissions are allowed. */
  method?: string;
  /** A valid Cloud IAM permission for the corresponding `service_name` in ApiOperation. */
  permission?: string;
}

export const MethodSelector: Schema.Schema<MethodSelector> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.String),
})).annotate({ identifier: "MethodSelector" }) as any as Schema.Schema<MethodSelector>;

export interface ApiOperation {
  /** The name of the API whose methods or permissions the IngressPolicy or EgressPolicy want to allow. A single ApiOperation with `service_name` field set to `*` will allow all methods AND permissions for all services. */
  serviceName?: string;
  /** API methods or permissions to allow. Method or permission must belong to the service specified by `service_name` field. A single MethodSelector entry with `*` specified for the `method` field will allow all methods AND permissions for the service specified in `service_name`. */
  methodSelectors?: Array<MethodSelector>;
}

export const ApiOperation: Schema.Schema<ApiOperation> = Schema.suspend(() => Schema.Struct({
  serviceName: Schema.optional(Schema.String),
  methodSelectors: Schema.optional(Schema.Array(MethodSelector)),
})).annotate({ identifier: "ApiOperation" }) as any as Schema.Schema<ApiOperation>;

export interface IngressTo {
  /** A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter. */
  operations?: Array<ApiOperation>;
  /** A list of resources, currently only projects in the form `projects/`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter are allowed. */
  resources?: Array<string>;
  /** IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter. */
  roles?: Array<string>;
}

export const IngressTo: Schema.Schema<IngressTo> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(ApiOperation)),
  resources: Schema.optional(Schema.Array(Schema.String)),
  roles: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IngressTo" }) as any as Schema.Schema<IngressTo>;

export interface IngressPolicy {
  /** Defines the conditions on the source of a request causing this IngressPolicy to apply. */
  ingressFrom?: IngressFrom;
  /** Defines the conditions on the ApiOperation and request destination that cause this IngressPolicy to apply. */
  ingressTo?: IngressTo;
  /** Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. */
  title?: string;
}

export const IngressPolicy: Schema.Schema<IngressPolicy> = Schema.suspend(() => Schema.Struct({
  ingressFrom: Schema.optional(IngressFrom),
  ingressTo: Schema.optional(IngressTo),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "IngressPolicy" }) as any as Schema.Schema<IngressPolicy>;

export interface EgressSource {
  /** An AccessLevel resource name that allows protected resources inside the ServicePerimeters to access outside the ServicePerimeter boundaries. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If an AccessLevel name is not specified, only resources within the perimeter can be accessed through Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all EgressSources will be allowed. */
  accessLevel?: string;
  /** A Google Cloud resource from the service perimeter that you want to allow to access data outside the perimeter. This field supports only projects. The project format is `projects/{project_number}`. You can't use `*` in this field to allow all Google Cloud resources. */
  resource?: string;
}

export const EgressSource: Schema.Schema<EgressSource> = Schema.suspend(() => Schema.Struct({
  accessLevel: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "EgressSource" }) as any as Schema.Schema<EgressSource>;

export interface EgressFrom {
  /** A list of identities that are allowed access through [EgressPolicy]. Identities can be an individual user, service account, Google group, or third-party identity. For third-party identity, only single identities are supported and other identity types are not supported. The `v1` identities that have the prefix `user`, `group`, `serviceAccount`, and `principal` in https://cloud.google.com/iam/docs/principal-identifiers#v1 are supported. */
  identities?: Array<string>;
  /** Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. */
  identityType?: "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT" | (string & {});
  /** Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`. */
  sources?: Array<EgressSource>;
  /** Whether to enforce traffic restrictions based on `sources` field. If the `sources` fields is non-empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`. */
  sourceRestriction?: "SOURCE_RESTRICTION_UNSPECIFIED" | "SOURCE_RESTRICTION_ENABLED" | "SOURCE_RESTRICTION_DISABLED" | (string & {});
}

export const EgressFrom: Schema.Schema<EgressFrom> = Schema.suspend(() => Schema.Struct({
  identities: Schema.optional(Schema.Array(Schema.String)),
  identityType: Schema.optional(Schema.String),
  sources: Schema.optional(Schema.Array(EgressSource)),
  sourceRestriction: Schema.optional(Schema.String),
})).annotate({ identifier: "EgressFrom" }) as any as Schema.Schema<EgressFrom>;

export interface EgressTo {
  /** A list of resources, currently only projects in the form `projects/`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter. */
  resources?: Array<string>;
  /** A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list. */
  operations?: Array<ApiOperation>;
  /** A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are s3://BUCKET_NAME, s3a://BUCKET_NAME, and s3n://BUCKET_NAME. For Azure Storage, the supported format is azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches if it contains an external resource in this list (Example: s3://bucket/path). Currently '*' is not allowed. */
  externalResources?: Array<string>;
  /** IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom. are allowed to perform in this ServicePerimeter. */
  roles?: Array<string>;
}

export const EgressTo: Schema.Schema<EgressTo> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(ApiOperation)),
  externalResources: Schema.optional(Schema.Array(Schema.String)),
  roles: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EgressTo" }) as any as Schema.Schema<EgressTo>;

export interface EgressPolicy {
  /** Defines conditions on the source of a request causing this EgressPolicy to apply. */
  egressFrom?: EgressFrom;
  /** Defines the conditions on the ApiOperation and destination resources that cause this EgressPolicy to apply. */
  egressTo?: EgressTo;
  /** Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. */
  title?: string;
}

export const EgressPolicy: Schema.Schema<EgressPolicy> = Schema.suspend(() => Schema.Struct({
  egressFrom: Schema.optional(EgressFrom),
  egressTo: Schema.optional(EgressTo),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "EgressPolicy" }) as any as Schema.Schema<EgressPolicy>;

export interface ServicePerimeterConfig {
  /** A list of Google Cloud resources that are inside of the service perimeter. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. */
  resources?: Array<string>;
  /** A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty. */
  accessLevels?: Array<string>;
  /** Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions. */
  restrictedServices?: Array<string>;
  /** Configuration for APIs allowed within Perimeter. */
  vpcAccessibleServices?: VpcAccessibleServices;
  /** List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge. */
  ingressPolicies?: Array<IngressPolicy>;
  /** List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge. */
  egressPolicies?: Array<EgressPolicy>;
}

export const ServicePerimeterConfig: Schema.Schema<ServicePerimeterConfig> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Schema.String)),
  accessLevels: Schema.optional(Schema.Array(Schema.String)),
  restrictedServices: Schema.optional(Schema.Array(Schema.String)),
  vpcAccessibleServices: Schema.optional(VpcAccessibleServices),
  ingressPolicies: Schema.optional(Schema.Array(IngressPolicy)),
  egressPolicies: Schema.optional(Schema.Array(EgressPolicy)),
})).annotate({ identifier: "ServicePerimeterConfig" }) as any as Schema.Schema<ServicePerimeterConfig>;

export interface ServicePerimeter {
  /** Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`. */
  name?: string;
  /** Human readable title. Must be unique within the Policy. */
  title?: string;
  /** Description of the `ServicePerimeter` and its use. Does not affect behavior. */
  description?: string;
  /** Perimeter type indicator. A single project or VPC network is allowed to be a member of single regular perimeter, but multiple service perimeter bridges. A project cannot be a included in a perimeter bridge without being included in regular perimeter. For perimeter bridges, the restricted service list as well as access level lists must be empty. */
  perimeterType?: "PERIMETER_TYPE_REGULAR" | "PERIMETER_TYPE_BRIDGE" | (string & {});
  /** Current ServicePerimeter configuration. Specifies sets of resources, restricted services and access levels that determine perimeter content and boundaries. */
  status?: ServicePerimeterConfig;
  /** Proposed (or dry run) ServicePerimeter configuration. This configuration allows to specify and test ServicePerimeter configuration without enforcing actual access restrictions. Only allowed to be set when the "use_explicit_dry_run_spec" flag is set. */
  spec?: ServicePerimeterConfig;
  /** Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly exists for all Service Perimeters, and that spec is identical to the status for those Service Perimeters. When this flag is set, it inhibits the generation of the implicit spec, thereby allowing the user to explicitly provide a configuration ("spec") to use in a dry-run version of the Service Perimeter. This allows the user to test changes to the enforced config ("status") without actually enforcing them. This testing is done through analyzing the differences between currently enforced and suggested restrictions. use_explicit_dry_run_spec must bet set to True if any of the fields in the spec are set to non-default values. */
  useExplicitDryRunSpec?: boolean;
  /** Optional. An opaque identifier for the current version of the `ServicePerimeter`. This identifier does not follow any specific format. If an etag is not provided, the operation will be performed as if a valid etag is provided. */
  etag?: string;
}

export const ServicePerimeter: Schema.Schema<ServicePerimeter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  perimeterType: Schema.optional(Schema.String),
  status: Schema.optional(ServicePerimeterConfig),
  spec: Schema.optional(ServicePerimeterConfig),
  useExplicitDryRunSpec: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ServicePerimeter" }) as any as Schema.Schema<ServicePerimeter>;

export interface ListServicePerimetersResponse {
  /** List of the Service Perimeter instances. */
  servicePerimeters?: Array<ServicePerimeter>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListServicePerimetersResponse: Schema.Schema<ListServicePerimetersResponse> = Schema.suspend(() => Schema.Struct({
  servicePerimeters: Schema.optional(Schema.Array(ServicePerimeter)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServicePerimetersResponse" }) as any as Schema.Schema<ListServicePerimetersResponse>;

export interface ReplaceServicePerimetersRequest {
  /** Required. The desired Service Perimeters that should replace all existing Service Perimeters in the Access Policy. */
  servicePerimeters?: Array<ServicePerimeter>;
  /** Optional. The etag for the version of the Access Policy that this replace operation is to be performed on. If, at the time of replace, the etag for the Access Policy stored in Access Context Manager is different from the specified etag, then the replace operation will not be performed and the call will fail. This field is not required. If etag is not provided, the operation will be performed as if a valid etag is provided. */
  etag?: string;
}

export const ReplaceServicePerimetersRequest: Schema.Schema<ReplaceServicePerimetersRequest> = Schema.suspend(() => Schema.Struct({
  servicePerimeters: Schema.optional(Schema.Array(ServicePerimeter)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ReplaceServicePerimetersRequest" }) as any as Schema.Schema<ReplaceServicePerimetersRequest>;

export interface CommitServicePerimetersRequest {
  /** Optional. The etag for the version of the Access Policy that this commit operation is to be performed on. If, at the time of commit, the etag for the Access Policy stored in Access Context Manager is different from the specified etag, then the commit operation will not be performed and the call will fail. This field is not required. If etag is not provided, the operation will be performed as if a valid etag is provided. */
  etag?: string;
}

export const CommitServicePerimetersRequest: Schema.Schema<CommitServicePerimetersRequest> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitServicePerimetersRequest" }) as any as Schema.Schema<CommitServicePerimetersRequest>;

export interface SupportedService {
  /** The service name or address of the supported service, such as `service.googleapis.com`. */
  name?: string;
  /** The support stage of the service. */
  supportStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** True if the service is available on the restricted VIP. Services on the restricted VIP typically either support VPC Service Controls or are core infrastructure services required for the functioning of Google Cloud. */
  availableOnRestrictedVip?: boolean;
  /** The name of the supported product, such as 'Cloud Product API'. */
  title?: string;
  /** The list of the supported methods. This field exists only in response to GetSupportedService */
  supportedMethods?: Array<MethodSelector>;
  /** True if the service is supported with some limitations. Check [documentation](https://cloud.google.com/vpc-service-controls/docs/supported-products) for details. */
  knownLimitations?: boolean;
  /** The support stage of the service. */
  serviceSupportStage?: "SERVICE_SUPPORT_STAGE_UNSPECIFIED" | "GA" | "PREVIEW" | "DEPRECATED" | (string & {});
}

export const SupportedService: Schema.Schema<SupportedService> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  supportStage: Schema.optional(Schema.String),
  availableOnRestrictedVip: Schema.optional(Schema.Boolean),
  title: Schema.optional(Schema.String),
  supportedMethods: Schema.optional(Schema.Array(MethodSelector)),
  knownLimitations: Schema.optional(Schema.Boolean),
  serviceSupportStage: Schema.optional(Schema.String),
})).annotate({ identifier: "SupportedService" }) as any as Schema.Schema<SupportedService>;

export interface ListSupportedServicesResponse {
  /** List of services supported by VPC Service Controls instances. */
  supportedServices?: Array<SupportedService>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListSupportedServicesResponse: Schema.Schema<ListSupportedServicesResponse> = Schema.suspend(() => Schema.Struct({
  supportedServices: Schema.optional(Schema.Array(SupportedService)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSupportedServicesResponse" }) as any as Schema.Schema<ListSupportedServicesResponse>;

export interface SessionSettings {
  /** Optional. Session method when user's Google Cloud session is up. */
  sessionReauthMethod?: "SESSION_REAUTH_METHOD_UNSPECIFIED" | "LOGIN" | "SECURITY_KEY" | "PASSWORD" | (string & {});
  /** Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param. */
  sessionLength?: string;
  /** Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps. */
  maxInactivity?: string;
  /** Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param. */
  useOidcMaxAge?: boolean;
  /** Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. */
  sessionLengthEnabled?: boolean;
}

export const SessionSettings: Schema.Schema<SessionSettings> = Schema.suspend(() => Schema.Struct({
  sessionReauthMethod: Schema.optional(Schema.String),
  sessionLength: Schema.optional(Schema.String),
  maxInactivity: Schema.optional(Schema.String),
  useOidcMaxAge: Schema.optional(Schema.Boolean),
  sessionLengthEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SessionSettings" }) as any as Schema.Schema<SessionSettings>;

export interface Application {
  /** The OAuth client ID of the application. */
  clientId?: string;
  /** The name of the application. Example: "Cloud Console" */
  name?: string;
}

export const Application: Schema.Schema<Application> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface ClientScope {
  /** Optional. The application that is subject to this binding's scope. */
  restrictedClientApplication?: Application;
}

export const ClientScope: Schema.Schema<ClientScope> = Schema.suspend(() => Schema.Struct({
  restrictedClientApplication: Schema.optional(Application),
})).annotate({ identifier: "ClientScope" }) as any as Schema.Schema<ClientScope>;

export interface AccessScope {
  /** Optional. Client scope for this access scope. */
  clientScope?: ClientScope;
}

export const AccessScope: Schema.Schema<AccessScope> = Schema.suspend(() => Schema.Struct({
  clientScope: Schema.optional(ClientScope),
})).annotate({ identifier: "AccessScope" }) as any as Schema.Schema<AccessScope>;

export interface AccessSettings {
  /** Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted" */
  accessLevels?: Array<string>;
  /** Optional. Session settings applied to user access on a given AccessScope. */
  sessionSettings?: SessionSettings;
}

export const AccessSettings: Schema.Schema<AccessSettings> = Schema.suspend(() => Schema.Struct({
  accessLevels: Schema.optional(Schema.Array(Schema.String)),
  sessionSettings: Schema.optional(SessionSettings),
})).annotate({ identifier: "AccessSettings" }) as any as Schema.Schema<AccessSettings>;

export interface ScopedAccessSettings {
  /** Optional. Application, etc. to which the access settings will be applied to. Implicitly, this is the scoped access settings key; as such, it must be unique and non-empty. */
  scope?: AccessScope;
  /** Optional. Access settings for this scoped access settings. This field may be empty if dry_run_settings is set. */
  activeSettings?: AccessSettings;
  /** Optional. Dry-run access settings for this scoped access settings. This field may be empty if active_settings is set. */
  dryRunSettings?: AccessSettings;
}

export const ScopedAccessSettings: Schema.Schema<ScopedAccessSettings> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(AccessScope),
  activeSettings: Schema.optional(AccessSettings),
  dryRunSettings: Schema.optional(AccessSettings),
})).annotate({ identifier: "ScopedAccessSettings" }) as any as Schema.Schema<ScopedAccessSettings>;

export interface GcpUserAccessBinding {
  /** Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by [RFC 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N" */
  name?: string;
  /** Optional. Immutable. Google Group id whose users are subject to this binding's restrictions. See "id" in the [Google Workspace Directory API's Group Resource] (https://developers.google.com/admin-sdk/directory/v1/reference/groups#resource). If a group's email address/alias is changed, this resource will continue to point at the changed group. This field does not accept group email addresses or aliases. Example: "01d520gv4vjcrht" */
  groupKey?: string;
  /** Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted" */
  accessLevels?: Array<string>;
  /** Optional. Dry run access level that will be evaluated but will not be enforced. The access denial based on dry run policy will be logged. Only one access level is supported, not multiple. This list must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted" */
  dryRunAccessLevels?: Array<string>;
  /** Optional. The Google Cloud session length (GCSL) policy for the group key. */
  sessionSettings?: SessionSettings;
  /** Optional. A list of applications that are subject to this binding's restrictions. If the list is empty, the binding restrictions will universally apply to all applications. */
  restrictedClientApplications?: Array<Application>;
  /** Optional. A list of scoped access settings that set this binding's restrictions on a subset of applications. This field cannot be set if restricted_client_applications is set. */
  scopedAccessSettings?: Array<ScopedAccessSettings>;
}

export const GcpUserAccessBinding: Schema.Schema<GcpUserAccessBinding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  groupKey: Schema.optional(Schema.String),
  accessLevels: Schema.optional(Schema.Array(Schema.String)),
  dryRunAccessLevels: Schema.optional(Schema.Array(Schema.String)),
  sessionSettings: Schema.optional(SessionSettings),
  restrictedClientApplications: Schema.optional(Schema.Array(Application)),
  scopedAccessSettings: Schema.optional(Schema.Array(ScopedAccessSettings)),
})).annotate({ identifier: "GcpUserAccessBinding" }) as any as Schema.Schema<GcpUserAccessBinding>;

export interface ListGcpUserAccessBindingsResponse {
  /** GcpUserAccessBinding */
  gcpUserAccessBindings?: Array<GcpUserAccessBinding>;
  /** Token to get the next page of items. If blank, there are no more items. */
  nextPageToken?: string;
}

export const ListGcpUserAccessBindingsResponse: Schema.Schema<ListGcpUserAccessBindingsResponse> = Schema.suspend(() => Schema.Struct({
  gcpUserAccessBindings: Schema.optional(Schema.Array(GcpUserAccessBinding)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGcpUserAccessBindingsResponse" }) as any as Schema.Schema<ListGcpUserAccessBindingsResponse>;

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
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
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
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface AuthorizedOrgsDesc {
  /** Identifier. Resource name for the `AuthorizedOrgsDesc`. Format: `accessPolicies/{access_policy}/authorizedOrgsDescs/{authorized_orgs_desc}`. The `authorized_orgs_desc` component must begin with a letter, followed by alphanumeric characters or `_`. After you create an `AuthorizedOrgsDesc`, you cannot change its `name`. */
  name?: string;
  /** A granular control type for authorization levels. Valid value is `AUTHORIZATION_TYPE_TRUST`. */
  authorizationType?: "AUTHORIZATION_TYPE_UNSPECIFIED" | "AUTHORIZATION_TYPE_TRUST" | (string & {});
  /** The asset type of this authorized orgs desc. Valid values are `ASSET_TYPE_DEVICE`, and `ASSET_TYPE_CREDENTIAL_STRENGTH`. */
  assetType?: "ASSET_TYPE_UNSPECIFIED" | "ASSET_TYPE_DEVICE" | "ASSET_TYPE_CREDENTIAL_STRENGTH" | (string & {});
  /** The direction of the authorization relationship between this organization and the organizations listed in the `orgs` field. The valid values for this field include the following: `AUTHORIZATION_DIRECTION_FROM`: Allows this organization to evaluate traffic in the organizations listed in the `orgs` field. `AUTHORIZATION_DIRECTION_TO`: Allows the organizations listed in the `orgs` field to evaluate the traffic in this organization. For the authorization relationship to take effect, all of the organizations must authorize and specify the appropriate relationship direction. For example, if organization A authorized organization B and C to evaluate its traffic, by specifying `AUTHORIZATION_DIRECTION_TO` as the authorization direction, organizations B and C must specify `AUTHORIZATION_DIRECTION_FROM` as the authorization direction in their `AuthorizedOrgsDesc` resource. */
  authorizationDirection?: "AUTHORIZATION_DIRECTION_UNSPECIFIED" | "AUTHORIZATION_DIRECTION_TO" | "AUTHORIZATION_DIRECTION_FROM" | (string & {});
  /** The list of organization ids in this AuthorizedOrgsDesc. Format: `organizations/` Example: `organizations/123456` */
  orgs?: Array<string>;
}

export const AuthorizedOrgsDesc: Schema.Schema<AuthorizedOrgsDesc> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  authorizationType: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
  authorizationDirection: Schema.optional(Schema.String),
  orgs: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuthorizedOrgsDesc" }) as any as Schema.Schema<AuthorizedOrgsDesc>;

export interface ListAuthorizedOrgsDescsResponse {
  /** List of all the Authorized Orgs Desc instances. */
  authorizedOrgsDescs?: Array<AuthorizedOrgsDesc>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListAuthorizedOrgsDescsResponse: Schema.Schema<ListAuthorizedOrgsDescsResponse> = Schema.suspend(() => Schema.Struct({
  authorizedOrgsDescs: Schema.optional(Schema.Array(AuthorizedOrgsDesc)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAuthorizedOrgsDescsResponse" }) as any as Schema.Schema<ListAuthorizedOrgsDescsResponse>;

export interface ListSupportedPermissionsResponse {
  /** List of VPC-SC supported permissions. */
  supportedPermissions?: Array<string>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListSupportedPermissionsResponse: Schema.Schema<ListSupportedPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  supportedPermissions: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSupportedPermissionsResponse" }) as any as Schema.Schema<ListSupportedPermissionsResponse>;

export interface ReplaceAccessLevelsResponse {
  /** List of the Access Level instances. */
  accessLevels?: Array<AccessLevel>;
}

export const ReplaceAccessLevelsResponse: Schema.Schema<ReplaceAccessLevelsResponse> = Schema.suspend(() => Schema.Struct({
  accessLevels: Schema.optional(Schema.Array(AccessLevel)),
})).annotate({ identifier: "ReplaceAccessLevelsResponse" }) as any as Schema.Schema<ReplaceAccessLevelsResponse>;

export interface ReplaceServicePerimetersResponse {
  /** List of the Service Perimeter instances. */
  servicePerimeters?: Array<ServicePerimeter>;
}

export const ReplaceServicePerimetersResponse: Schema.Schema<ReplaceServicePerimetersResponse> = Schema.suspend(() => Schema.Struct({
  servicePerimeters: Schema.optional(Schema.Array(ServicePerimeter)),
})).annotate({ identifier: "ReplaceServicePerimetersResponse" }) as any as Schema.Schema<ReplaceServicePerimetersResponse>;

export interface CommitServicePerimetersResponse {
  /** List of all the Service Perimeter instances in the Access Policy. */
  servicePerimeters?: Array<ServicePerimeter>;
}

export const CommitServicePerimetersResponse: Schema.Schema<CommitServicePerimetersResponse> = Schema.suspend(() => Schema.Struct({
  servicePerimeters: Schema.optional(Schema.Array(ServicePerimeter)),
})).annotate({ identifier: "CommitServicePerimetersResponse" }) as any as Schema.Schema<CommitServicePerimetersResponse>;

export interface GcpUserAccessBindingOperationMetadata {
}

export const GcpUserAccessBindingOperationMetadata: Schema.Schema<GcpUserAccessBindingOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GcpUserAccessBindingOperationMetadata" }) as any as Schema.Schema<GcpUserAccessBindingOperationMetadata>;

export interface AccessContextManagerOperationMetadata {
}

export const AccessContextManagerOperationMetadata: Schema.Schema<AccessContextManagerOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AccessContextManagerOperationMetadata" }) as any as Schema.Schema<AccessContextManagerOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
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

export const ListOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
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

/** Lists all access policies in an organization. */
export interface ListAccessPoliciesRequest {
  /** Required. Resource name for the container to list AccessPolicy instances from. Format: `organizations/{org_id}` */
  parent?: string;
  /** Number of AccessPolicy instances to include in the list. Default 100. */
  pageSize?: number;
  /** Next page token for the next batch of AccessPolicy instances. Defaults to the first page of results. */
  pageToken?: string;
}

export const ListAccessPoliciesRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies" }),
  svc,
) as unknown as Schema.Schema<ListAccessPoliciesRequest>;

export type ListAccessPoliciesResponse_Op = ListAccessPoliciesResponse;
export const ListAccessPoliciesResponse_Op = ListAccessPoliciesResponse;

export type ListAccessPoliciesError = CommonErrors;

export const listAccessPolicies = API.makePaginated(() => ({
  input: ListAccessPoliciesRequest,
  output: ListAccessPoliciesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns an access policy based on the name. */
export interface GetAccessPoliciesRequest {
  /** Required. Resource name for the access policy to get. Format `accessPolicies/{policy_id}` */
  name: string;
}

export const GetAccessPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccessPoliciesRequest>;

export type GetAccessPoliciesResponse = AccessPolicy;
export const GetAccessPoliciesResponse = AccessPolicy;

export type GetAccessPoliciesError = CommonErrors;

export const getAccessPolicies: API.OperationMethod<GetAccessPoliciesRequest, GetAccessPoliciesResponse, GetAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessPoliciesRequest,
  output: GetAccessPoliciesResponse,
  errors: [],
}));

/** Creates an access policy. This method fails if the organization already has an access policy. The long-running operation has a successful status after the access policy propagates to long-lasting storage. Syntactic and basic semantic errors are returned in `metadata` as a BadRequest proto. */
export interface CreateAccessPoliciesRequest {
  /** Request body */
  body?: AccessPolicy;
}

export const CreateAccessPoliciesRequest = Schema.Struct({
  body: Schema.optional(AccessPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccessPoliciesRequest>;

export type CreateAccessPoliciesResponse = Operation;
export const CreateAccessPoliciesResponse = Operation;

export type CreateAccessPoliciesError = CommonErrors;

export const createAccessPolicies: API.OperationMethod<CreateAccessPoliciesRequest, CreateAccessPoliciesResponse, CreateAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccessPoliciesRequest,
  output: CreateAccessPoliciesResponse,
  errors: [],
}));

/** Updates an access policy. The long-running operation from this RPC has a successful status after the changes to the access policy propagate to long-lasting storage. */
export interface PatchAccessPoliciesRequest {
  /** Output only. Identifier. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}` */
  name: string;
  /** Required. Mask to control which fields get updated. Must be non-empty. */
  updateMask?: string;
  /** Request body */
  body?: AccessPolicy;
}

export const PatchAccessPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AccessPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accessPolicies/{accessPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccessPoliciesRequest>;

export type PatchAccessPoliciesResponse = Operation;
export const PatchAccessPoliciesResponse = Operation;

export type PatchAccessPoliciesError = CommonErrors;

export const patchAccessPolicies: API.OperationMethod<PatchAccessPoliciesRequest, PatchAccessPoliciesResponse, PatchAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccessPoliciesRequest,
  output: PatchAccessPoliciesResponse,
  errors: [],
}));

/** Deletes an access policy based on the resource name. The long-running operation has a successful status after the access policy is removed from long-lasting storage. */
export interface DeleteAccessPoliciesRequest {
  /** Required. Resource name for the access policy to delete. Format `accessPolicies/{policy_id}` */
  name: string;
}

export const DeleteAccessPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accessPolicies/{accessPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessPoliciesRequest>;

export type DeleteAccessPoliciesResponse = Operation;
export const DeleteAccessPoliciesResponse = Operation;

export type DeleteAccessPoliciesError = CommonErrors;

export const deleteAccessPolicies: API.OperationMethod<DeleteAccessPoliciesRequest, DeleteAccessPoliciesResponse, DeleteAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessPoliciesRequest,
  output: DeleteAccessPoliciesResponse,
  errors: [],
}));

/** Sets the IAM policy for the specified Access Context Manager access policy. This method replaces the existing IAM policy on the access policy. The IAM policy controls the set of users who can perform specific operations on the Access Context Manager access policy. */
export interface SetIamPolicyAccessPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyAccessPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyAccessPoliciesRequest>;

export type SetIamPolicyAccessPoliciesResponse = Policy;
export const SetIamPolicyAccessPoliciesResponse = Policy;

export type SetIamPolicyAccessPoliciesError = CommonErrors;

export const setIamPolicyAccessPolicies: API.OperationMethod<SetIamPolicyAccessPoliciesRequest, SetIamPolicyAccessPoliciesResponse, SetIamPolicyAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyAccessPoliciesRequest,
  output: SetIamPolicyAccessPoliciesResponse,
  errors: [],
}));

/** Gets the IAM policy for the specified Access Context Manager access policy. */
export interface GetIamPolicyAccessPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyAccessPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyAccessPoliciesRequest>;

export type GetIamPolicyAccessPoliciesResponse = Policy;
export const GetIamPolicyAccessPoliciesResponse = Policy;

export type GetIamPolicyAccessPoliciesError = CommonErrors;

export const getIamPolicyAccessPolicies: API.OperationMethod<GetIamPolicyAccessPoliciesRequest, GetIamPolicyAccessPoliciesResponse, GetIamPolicyAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyAccessPoliciesRequest,
  output: GetIamPolicyAccessPoliciesResponse,
  errors: [],
}));

/** Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources. */
export interface TestIamPermissionsAccessPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsAccessPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsAccessPoliciesRequest>;

export type TestIamPermissionsAccessPoliciesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsAccessPoliciesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsAccessPoliciesError = CommonErrors;

export const testIamPermissionsAccessPolicies: API.OperationMethod<TestIamPermissionsAccessPoliciesRequest, TestIamPermissionsAccessPoliciesResponse, TestIamPermissionsAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsAccessPoliciesRequest,
  output: TestIamPermissionsAccessPoliciesResponse,
  errors: [],
}));

/** Lists all access levels for an access policy. */
export interface ListAccessPoliciesAccessLevelsRequest {
  /** Required. Resource name for the access policy to list Access Levels from. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Number of Access Levels to include in the list. Default 100. */
  pageSize?: number;
  /** Next page token for the next batch of Access Level instances. Defaults to the first page of results. */
  pageToken?: string;
  /** Whether to return `BasicLevels` in the Cloud Common Expression language, as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning `AccessLevels` in the format they were defined. */
  accessLevelFormat?: "LEVEL_FORMAT_UNSPECIFIED" | "AS_DEFINED" | "CEL" | (string & {});
}

export const ListAccessPoliciesAccessLevelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  accessLevelFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("accessLevelFormat")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels" }),
  svc,
) as unknown as Schema.Schema<ListAccessPoliciesAccessLevelsRequest>;

export type ListAccessPoliciesAccessLevelsResponse = ListAccessLevelsResponse;
export const ListAccessPoliciesAccessLevelsResponse = ListAccessLevelsResponse;

export type ListAccessPoliciesAccessLevelsError = CommonErrors;

export const listAccessPoliciesAccessLevels = API.makePaginated(() => ({
  input: ListAccessPoliciesAccessLevelsRequest,
  output: ListAccessPoliciesAccessLevelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an access level based on the resource name. */
export interface GetAccessPoliciesAccessLevelsRequest {
  /** Required. Resource name for the Access Level. Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}` */
  name: string;
  /** Whether to return `BasicLevels` in the Cloud Common Expression Language rather than as `BasicLevels`. Defaults to AS_DEFINED, where Access Levels are returned as `BasicLevels` or `CustomLevels` based on how they were created. If set to CEL, all Access Levels are returned as `CustomLevels`. In the CEL case, `BasicLevels` are translated to equivalent `CustomLevels`. */
  accessLevelFormat?: "LEVEL_FORMAT_UNSPECIFIED" | "AS_DEFINED" | "CEL" | (string & {});
}

export const GetAccessPoliciesAccessLevelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  accessLevelFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("accessLevelFormat")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels/{accessLevelsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccessPoliciesAccessLevelsRequest>;

export type GetAccessPoliciesAccessLevelsResponse = AccessLevel;
export const GetAccessPoliciesAccessLevelsResponse = AccessLevel;

export type GetAccessPoliciesAccessLevelsError = CommonErrors;

export const getAccessPoliciesAccessLevels: API.OperationMethod<GetAccessPoliciesAccessLevelsRequest, GetAccessPoliciesAccessLevelsResponse, GetAccessPoliciesAccessLevelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessPoliciesAccessLevelsRequest,
  output: GetAccessPoliciesAccessLevelsResponse,
  errors: [],
}));

/** Creates an access level. The long-running operation from this RPC has a successful status after the access level propagates to long-lasting storage. If access levels contain errors, an error response is returned for the first error encountered. */
export interface CreateAccessPoliciesAccessLevelsRequest {
  /** Required. Resource name for the access policy which owns this Access Level. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Request body */
  body?: AccessLevel;
}

export const CreateAccessPoliciesAccessLevelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AccessLevel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccessPoliciesAccessLevelsRequest>;

export type CreateAccessPoliciesAccessLevelsResponse = Operation;
export const CreateAccessPoliciesAccessLevelsResponse = Operation;

export type CreateAccessPoliciesAccessLevelsError = CommonErrors;

export const createAccessPoliciesAccessLevels: API.OperationMethod<CreateAccessPoliciesAccessLevelsRequest, CreateAccessPoliciesAccessLevelsResponse, CreateAccessPoliciesAccessLevelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccessPoliciesAccessLevelsRequest,
  output: CreateAccessPoliciesAccessLevelsResponse,
  errors: [],
}));

/** Updates an access level. The long-running operation from this RPC has a successful status after the changes to the access level propagate to long-lasting storage. If access levels contain errors, an error response is returned for the first error encountered. */
export interface PatchAccessPoliciesAccessLevelsRequest {
  /** Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`. */
  name: string;
  /** Required. Mask to control which fields get updated. Must be non-empty. */
  updateMask?: string;
  /** Request body */
  body?: AccessLevel;
}

export const PatchAccessPoliciesAccessLevelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AccessLevel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels/{accessLevelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccessPoliciesAccessLevelsRequest>;

export type PatchAccessPoliciesAccessLevelsResponse = Operation;
export const PatchAccessPoliciesAccessLevelsResponse = Operation;

export type PatchAccessPoliciesAccessLevelsError = CommonErrors;

export const patchAccessPoliciesAccessLevels: API.OperationMethod<PatchAccessPoliciesAccessLevelsRequest, PatchAccessPoliciesAccessLevelsResponse, PatchAccessPoliciesAccessLevelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccessPoliciesAccessLevelsRequest,
  output: PatchAccessPoliciesAccessLevelsResponse,
  errors: [],
}));

/** Deletes an access level based on the resource name. The long-running operation from this RPC has a successful status after the access level has been removed from long-lasting storage. */
export interface DeleteAccessPoliciesAccessLevelsRequest {
  /** Required. Resource name for the Access Level. Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}` */
  name: string;
}

export const DeleteAccessPoliciesAccessLevelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels/{accessLevelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessPoliciesAccessLevelsRequest>;

export type DeleteAccessPoliciesAccessLevelsResponse = Operation;
export const DeleteAccessPoliciesAccessLevelsResponse = Operation;

export type DeleteAccessPoliciesAccessLevelsError = CommonErrors;

export const deleteAccessPoliciesAccessLevels: API.OperationMethod<DeleteAccessPoliciesAccessLevelsRequest, DeleteAccessPoliciesAccessLevelsResponse, DeleteAccessPoliciesAccessLevelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessPoliciesAccessLevelsRequest,
  output: DeleteAccessPoliciesAccessLevelsResponse,
  errors: [],
}));

/** Replaces all existing access levels in an access policy with the access levels provided. This is done atomically. The long-running operation from this RPC has a successful status after all replacements propagate to long-lasting storage. If the replacement contains errors, an error response is returned for the first error encountered. Upon error, the replacement is cancelled, and existing access levels are not affected. The Operation.response field contains ReplaceAccessLevelsResponse. Removing access levels contained in existing service perimeters result in an error. */
export interface ReplaceAllAccessPoliciesAccessLevelsRequest {
  /** Required. Resource name for the access policy which owns these Access Levels. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Request body */
  body?: ReplaceAccessLevelsRequest;
}

export const ReplaceAllAccessPoliciesAccessLevelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ReplaceAccessLevelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels:replaceAll", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceAllAccessPoliciesAccessLevelsRequest>;

export type ReplaceAllAccessPoliciesAccessLevelsResponse = Operation;
export const ReplaceAllAccessPoliciesAccessLevelsResponse = Operation;

export type ReplaceAllAccessPoliciesAccessLevelsError = CommonErrors;

export const replaceAllAccessPoliciesAccessLevels: API.OperationMethod<ReplaceAllAccessPoliciesAccessLevelsRequest, ReplaceAllAccessPoliciesAccessLevelsResponse, ReplaceAllAccessPoliciesAccessLevelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceAllAccessPoliciesAccessLevelsRequest,
  output: ReplaceAllAccessPoliciesAccessLevelsResponse,
  errors: [],
}));

/** Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources. */
export interface TestIamPermissionsAccessPoliciesAccessLevelsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsAccessPoliciesAccessLevelsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/accessLevels/{accessLevelsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsAccessPoliciesAccessLevelsRequest>;

export type TestIamPermissionsAccessPoliciesAccessLevelsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsAccessPoliciesAccessLevelsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsAccessPoliciesAccessLevelsError = CommonErrors;

export const testIamPermissionsAccessPoliciesAccessLevels: API.OperationMethod<TestIamPermissionsAccessPoliciesAccessLevelsRequest, TestIamPermissionsAccessPoliciesAccessLevelsResponse, TestIamPermissionsAccessPoliciesAccessLevelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsAccessPoliciesAccessLevelsRequest,
  output: TestIamPermissionsAccessPoliciesAccessLevelsResponse,
  errors: [],
}));

/** Lists all service perimeters for an access policy. */
export interface ListAccessPoliciesServicePerimetersRequest {
  /** Required. Resource name for the access policy to list Service Perimeters from. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Number of Service Perimeters to include in the list. Default 100. */
  pageSize?: number;
  /** Next page token for the next batch of Service Perimeter instances. Defaults to the first page of results. */
  pageToken?: string;
}

export const ListAccessPoliciesServicePerimetersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters" }),
  svc,
) as unknown as Schema.Schema<ListAccessPoliciesServicePerimetersRequest>;

export type ListAccessPoliciesServicePerimetersResponse = ListServicePerimetersResponse;
export const ListAccessPoliciesServicePerimetersResponse = ListServicePerimetersResponse;

export type ListAccessPoliciesServicePerimetersError = CommonErrors;

export const listAccessPoliciesServicePerimeters = API.makePaginated(() => ({
  input: ListAccessPoliciesServicePerimetersRequest,
  output: ListAccessPoliciesServicePerimetersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a service perimeter based on the resource name. */
export interface GetAccessPoliciesServicePerimetersRequest {
  /** Required. Resource name for the Service Perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}` */
  name: string;
}

export const GetAccessPoliciesServicePerimetersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters/{servicePerimetersId}" }),
  svc,
) as unknown as Schema.Schema<GetAccessPoliciesServicePerimetersRequest>;

export type GetAccessPoliciesServicePerimetersResponse = ServicePerimeter;
export const GetAccessPoliciesServicePerimetersResponse = ServicePerimeter;

export type GetAccessPoliciesServicePerimetersError = CommonErrors;

export const getAccessPoliciesServicePerimeters: API.OperationMethod<GetAccessPoliciesServicePerimetersRequest, GetAccessPoliciesServicePerimetersResponse, GetAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessPoliciesServicePerimetersRequest,
  output: GetAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Creates a service perimeter. The long-running operation from this RPC has a successful status after the service perimeter propagates to long-lasting storage. If a service perimeter contains errors, an error response is returned for the first error encountered. */
export interface CreateAccessPoliciesServicePerimetersRequest {
  /** Required. Resource name for the access policy which owns this Service Perimeter. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Request body */
  body?: ServicePerimeter;
}

export const CreateAccessPoliciesServicePerimetersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ServicePerimeter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccessPoliciesServicePerimetersRequest>;

export type CreateAccessPoliciesServicePerimetersResponse = Operation;
export const CreateAccessPoliciesServicePerimetersResponse = Operation;

export type CreateAccessPoliciesServicePerimetersError = CommonErrors;

export const createAccessPoliciesServicePerimeters: API.OperationMethod<CreateAccessPoliciesServicePerimetersRequest, CreateAccessPoliciesServicePerimetersResponse, CreateAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccessPoliciesServicePerimetersRequest,
  output: CreateAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Updates a service perimeter. The long-running operation from this RPC has a successful status after the service perimeter propagates to long-lasting storage. If a service perimeter contains errors, an error response is returned for the first error encountered. */
export interface PatchAccessPoliciesServicePerimetersRequest {
  /** Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`. */
  name: string;
  /** Required. Mask to control which fields get updated. Must be non-empty. */
  updateMask?: string;
  /** Request body */
  body?: ServicePerimeter;
}

export const PatchAccessPoliciesServicePerimetersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ServicePerimeter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters/{servicePerimetersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccessPoliciesServicePerimetersRequest>;

export type PatchAccessPoliciesServicePerimetersResponse = Operation;
export const PatchAccessPoliciesServicePerimetersResponse = Operation;

export type PatchAccessPoliciesServicePerimetersError = CommonErrors;

export const patchAccessPoliciesServicePerimeters: API.OperationMethod<PatchAccessPoliciesServicePerimetersRequest, PatchAccessPoliciesServicePerimetersResponse, PatchAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccessPoliciesServicePerimetersRequest,
  output: PatchAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Deletes a service perimeter based on the resource name. The long-running operation from this RPC has a successful status after the service perimeter is removed from long-lasting storage. */
export interface DeleteAccessPoliciesServicePerimetersRequest {
  /** Required. Resource name for the Service Perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}` */
  name: string;
}

export const DeleteAccessPoliciesServicePerimetersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters/{servicePerimetersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessPoliciesServicePerimetersRequest>;

export type DeleteAccessPoliciesServicePerimetersResponse = Operation;
export const DeleteAccessPoliciesServicePerimetersResponse = Operation;

export type DeleteAccessPoliciesServicePerimetersError = CommonErrors;

export const deleteAccessPoliciesServicePerimeters: API.OperationMethod<DeleteAccessPoliciesServicePerimetersRequest, DeleteAccessPoliciesServicePerimetersResponse, DeleteAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessPoliciesServicePerimetersRequest,
  output: DeleteAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Replace all existing service perimeters in an access policy with the service perimeters provided. This is done atomically. The long-running operation from this RPC has a successful status after all replacements propagate to long-lasting storage. Replacements containing errors result in an error response for the first error encountered. Upon an error, replacement are cancelled and existing service perimeters are not affected. The Operation.response field contains ReplaceServicePerimetersResponse. */
export interface ReplaceAllAccessPoliciesServicePerimetersRequest {
  /** Required. Resource name for the access policy which owns these Service Perimeters. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Request body */
  body?: ReplaceServicePerimetersRequest;
}

export const ReplaceAllAccessPoliciesServicePerimetersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ReplaceServicePerimetersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters:replaceAll", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceAllAccessPoliciesServicePerimetersRequest>;

export type ReplaceAllAccessPoliciesServicePerimetersResponse = Operation;
export const ReplaceAllAccessPoliciesServicePerimetersResponse = Operation;

export type ReplaceAllAccessPoliciesServicePerimetersError = CommonErrors;

export const replaceAllAccessPoliciesServicePerimeters: API.OperationMethod<ReplaceAllAccessPoliciesServicePerimetersRequest, ReplaceAllAccessPoliciesServicePerimetersResponse, ReplaceAllAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceAllAccessPoliciesServicePerimetersRequest,
  output: ReplaceAllAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Commits the dry-run specification for all the service perimeters in an access policy. A commit operation on a service perimeter involves copying its `spec` field to the `status` field of the service perimeter. Only service perimeters with `use_explicit_dry_run_spec` field set to true are affected by a commit operation. The long-running operation from this RPC has a successful status after the dry-run specifications for all the service perimeters have been committed. If a commit fails, it causes the long-running operation to return an error response and the entire commit operation is cancelled. When successful, the Operation.response field contains CommitServicePerimetersResponse. The `dry_run` and the `spec` fields are cleared after a successful commit operation. */
export interface CommitAccessPoliciesServicePerimetersRequest {
  /** Required. Resource name for the parent Access Policy which owns all Service Perimeters in scope for the commit operation. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Request body */
  body?: CommitServicePerimetersRequest;
}

export const CommitAccessPoliciesServicePerimetersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CommitServicePerimetersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitAccessPoliciesServicePerimetersRequest>;

export type CommitAccessPoliciesServicePerimetersResponse = Operation;
export const CommitAccessPoliciesServicePerimetersResponse = Operation;

export type CommitAccessPoliciesServicePerimetersError = CommonErrors;

export const commitAccessPoliciesServicePerimeters: API.OperationMethod<CommitAccessPoliciesServicePerimetersRequest, CommitAccessPoliciesServicePerimetersResponse, CommitAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitAccessPoliciesServicePerimetersRequest,
  output: CommitAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources. */
export interface TestIamPermissionsAccessPoliciesServicePerimetersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsAccessPoliciesServicePerimetersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/servicePerimeters/{servicePerimetersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsAccessPoliciesServicePerimetersRequest>;

export type TestIamPermissionsAccessPoliciesServicePerimetersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsAccessPoliciesServicePerimetersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsAccessPoliciesServicePerimetersError = CommonErrors;

export const testIamPermissionsAccessPoliciesServicePerimeters: API.OperationMethod<TestIamPermissionsAccessPoliciesServicePerimetersRequest, TestIamPermissionsAccessPoliciesServicePerimetersResponse, TestIamPermissionsAccessPoliciesServicePerimetersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsAccessPoliciesServicePerimetersRequest,
  output: TestIamPermissionsAccessPoliciesServicePerimetersResponse,
  errors: [],
}));

/** Lists all authorized orgs descs for an access policy. */
export interface ListAccessPoliciesAuthorizedOrgsDescsRequest {
  /** Required. Resource name for the access policy to list Authorized Orgs Desc from. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Number of Authorized Orgs Descs to include in the list. Default 100. */
  pageSize?: number;
  /** Next page token for the next batch of Authorized Orgs Desc instances. Defaults to the first page of results. */
  pageToken?: string;
}

export const ListAccessPoliciesAuthorizedOrgsDescsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}/authorizedOrgsDescs" }),
  svc,
) as unknown as Schema.Schema<ListAccessPoliciesAuthorizedOrgsDescsRequest>;

export type ListAccessPoliciesAuthorizedOrgsDescsResponse = ListAuthorizedOrgsDescsResponse;
export const ListAccessPoliciesAuthorizedOrgsDescsResponse = ListAuthorizedOrgsDescsResponse;

export type ListAccessPoliciesAuthorizedOrgsDescsError = CommonErrors;

export const listAccessPoliciesAuthorizedOrgsDescs = API.makePaginated(() => ({
  input: ListAccessPoliciesAuthorizedOrgsDescsRequest,
  output: ListAccessPoliciesAuthorizedOrgsDescsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an authorized orgs desc based on the resource name. */
export interface GetAccessPoliciesAuthorizedOrgsDescsRequest {
  /** Required. Resource name for the Authorized Orgs Desc. Format: `accessPolicies/{policy_id}/authorizedOrgsDescs/{authorized_orgs_descs_id}` */
  name: string;
}

export const GetAccessPoliciesAuthorizedOrgsDescsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accessPolicies/{accessPoliciesId}/authorizedOrgsDescs/{authorizedOrgsDescsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccessPoliciesAuthorizedOrgsDescsRequest>;

export type GetAccessPoliciesAuthorizedOrgsDescsResponse = AuthorizedOrgsDesc;
export const GetAccessPoliciesAuthorizedOrgsDescsResponse = AuthorizedOrgsDesc;

export type GetAccessPoliciesAuthorizedOrgsDescsError = CommonErrors;

export const getAccessPoliciesAuthorizedOrgsDescs: API.OperationMethod<GetAccessPoliciesAuthorizedOrgsDescsRequest, GetAccessPoliciesAuthorizedOrgsDescsResponse, GetAccessPoliciesAuthorizedOrgsDescsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessPoliciesAuthorizedOrgsDescsRequest,
  output: GetAccessPoliciesAuthorizedOrgsDescsResponse,
  errors: [],
}));

/** Creates an authorized orgs desc. The long-running operation from this RPC has a successful status after the authorized orgs desc propagates to long-lasting storage. If a authorized orgs desc contains errors, an error response is returned for the first error encountered. The name of this `AuthorizedOrgsDesc` will be assigned during creation. */
export interface CreateAccessPoliciesAuthorizedOrgsDescsRequest {
  /** Required. Resource name for the access policy which owns this Authorized Orgs Desc. Format: `accessPolicies/{policy_id}` */
  parent: string;
  /** Request body */
  body?: AuthorizedOrgsDesc;
}

export const CreateAccessPoliciesAuthorizedOrgsDescsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AuthorizedOrgsDesc).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accessPolicies/{accessPoliciesId}/authorizedOrgsDescs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccessPoliciesAuthorizedOrgsDescsRequest>;

export type CreateAccessPoliciesAuthorizedOrgsDescsResponse = Operation;
export const CreateAccessPoliciesAuthorizedOrgsDescsResponse = Operation;

export type CreateAccessPoliciesAuthorizedOrgsDescsError = CommonErrors;

export const createAccessPoliciesAuthorizedOrgsDescs: API.OperationMethod<CreateAccessPoliciesAuthorizedOrgsDescsRequest, CreateAccessPoliciesAuthorizedOrgsDescsResponse, CreateAccessPoliciesAuthorizedOrgsDescsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccessPoliciesAuthorizedOrgsDescsRequest,
  output: CreateAccessPoliciesAuthorizedOrgsDescsResponse,
  errors: [],
}));

/** Updates an authorized orgs desc. The long-running operation from this RPC has a successful status after the authorized orgs desc propagates to long-lasting storage. If a authorized orgs desc contains errors, an error response is returned for the first error encountered. Only the organization list in `AuthorizedOrgsDesc` can be updated. The name, authorization_type, asset_type and authorization_direction cannot be updated. */
export interface PatchAccessPoliciesAuthorizedOrgsDescsRequest {
  /** Identifier. Resource name for the `AuthorizedOrgsDesc`. Format: `accessPolicies/{access_policy}/authorizedOrgsDescs/{authorized_orgs_desc}`. The `authorized_orgs_desc` component must begin with a letter, followed by alphanumeric characters or `_`. After you create an `AuthorizedOrgsDesc`, you cannot change its `name`. */
  name: string;
  /** Required. Mask to control which fields get updated. Must be non-empty. */
  updateMask?: string;
  /** Request body */
  body?: AuthorizedOrgsDesc;
}

export const PatchAccessPoliciesAuthorizedOrgsDescsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AuthorizedOrgsDesc).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accessPolicies/{accessPoliciesId}/authorizedOrgsDescs/{authorizedOrgsDescsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccessPoliciesAuthorizedOrgsDescsRequest>;

export type PatchAccessPoliciesAuthorizedOrgsDescsResponse = Operation;
export const PatchAccessPoliciesAuthorizedOrgsDescsResponse = Operation;

export type PatchAccessPoliciesAuthorizedOrgsDescsError = CommonErrors;

export const patchAccessPoliciesAuthorizedOrgsDescs: API.OperationMethod<PatchAccessPoliciesAuthorizedOrgsDescsRequest, PatchAccessPoliciesAuthorizedOrgsDescsResponse, PatchAccessPoliciesAuthorizedOrgsDescsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccessPoliciesAuthorizedOrgsDescsRequest,
  output: PatchAccessPoliciesAuthorizedOrgsDescsResponse,
  errors: [],
}));

/** Deletes an authorized orgs desc based on the resource name. The long-running operation from this RPC has a successful status after the authorized orgs desc is removed from long-lasting storage. */
export interface DeleteAccessPoliciesAuthorizedOrgsDescsRequest {
  /** Required. Resource name for the Authorized Orgs Desc. Format: `accessPolicies/{policy_id}/authorizedOrgsDesc/{authorized_orgs_desc_id}` */
  name: string;
}

export const DeleteAccessPoliciesAuthorizedOrgsDescsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accessPolicies/{accessPoliciesId}/authorizedOrgsDescs/{authorizedOrgsDescsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessPoliciesAuthorizedOrgsDescsRequest>;

export type DeleteAccessPoliciesAuthorizedOrgsDescsResponse = Operation;
export const DeleteAccessPoliciesAuthorizedOrgsDescsResponse = Operation;

export type DeleteAccessPoliciesAuthorizedOrgsDescsError = CommonErrors;

export const deleteAccessPoliciesAuthorizedOrgsDescs: API.OperationMethod<DeleteAccessPoliciesAuthorizedOrgsDescsRequest, DeleteAccessPoliciesAuthorizedOrgsDescsResponse, DeleteAccessPoliciesAuthorizedOrgsDescsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessPoliciesAuthorizedOrgsDescsRequest,
  output: DeleteAccessPoliciesAuthorizedOrgsDescsResponse,
  errors: [],
}));

/** Lists all VPC-SC supported services. */
export interface ListServicesRequest {
  /** This flag specifies the maximum number of services to return per page. Default is 100. */
  pageSize?: number;
  /** Token to start on a later page. Default is the first page. */
  pageToken?: string;
}

export const ListServicesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services" }),
  svc,
) as unknown as Schema.Schema<ListServicesRequest>;

export type ListServicesResponse = ListSupportedServicesResponse;
export const ListServicesResponse = ListSupportedServicesResponse;

export type ListServicesError = CommonErrors;

export const listServices = API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a VPC-SC supported service based on the service name. */
export interface GetServicesRequest {
  /** The name of the service to get information about. The names must be in the same format as used in defining a service perimeter, for example, `storage.googleapis.com`. */
  name: string;
}

export const GetServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{name}" }),
  svc,
) as unknown as Schema.Schema<GetServicesRequest>;

export type GetServicesResponse = SupportedService;
export const GetServicesResponse = SupportedService;

export type GetServicesError = CommonErrors;

export const getServices: API.OperationMethod<GetServicesRequest, GetServicesResponse, GetServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesRequest,
  output: GetServicesResponse,
  errors: [],
}));

/** Lists all GcpUserAccessBindings for a Google Cloud organization. */
export interface ListOrganizationsGcpUserAccessBindingsRequest {
  /** Required. Example: "organizations/256" */
  parent: string;
  /** Optional. Maximum number of items to return. The server may return fewer items. If left blank, the server may return any number of items. */
  pageSize?: number;
  /** Optional. If left blank, returns the first page. To enumerate all items, use the next_page_token from your previous list operation. */
  pageToken?: string;
}

export const ListOrganizationsGcpUserAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/gcpUserAccessBindings" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsGcpUserAccessBindingsRequest>;

export type ListOrganizationsGcpUserAccessBindingsResponse = ListGcpUserAccessBindingsResponse;
export const ListOrganizationsGcpUserAccessBindingsResponse = ListGcpUserAccessBindingsResponse;

export type ListOrganizationsGcpUserAccessBindingsError = CommonErrors;

export const listOrganizationsGcpUserAccessBindings = API.makePaginated(() => ({
  input: ListOrganizationsGcpUserAccessBindingsRequest,
  output: ListOrganizationsGcpUserAccessBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the GcpUserAccessBinding with the given name. */
export interface GetOrganizationsGcpUserAccessBindingsRequest {
  /** Required. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N" */
  name: string;
}

export const GetOrganizationsGcpUserAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/gcpUserAccessBindings/{gcpUserAccessBindingsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsGcpUserAccessBindingsRequest>;

export type GetOrganizationsGcpUserAccessBindingsResponse = GcpUserAccessBinding;
export const GetOrganizationsGcpUserAccessBindingsResponse = GcpUserAccessBinding;

export type GetOrganizationsGcpUserAccessBindingsError = CommonErrors;

export const getOrganizationsGcpUserAccessBindings: API.OperationMethod<GetOrganizationsGcpUserAccessBindingsRequest, GetOrganizationsGcpUserAccessBindingsResponse, GetOrganizationsGcpUserAccessBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsGcpUserAccessBindingsRequest,
  output: GetOrganizationsGcpUserAccessBindingsResponse,
  errors: [],
}));

/** Creates a GcpUserAccessBinding. If the client specifies a name, the server ignores it. Fails if a resource already exists with the same group_key. Completion of this long-running operation does not necessarily signify that the new binding is deployed onto all affected users, which may take more time. */
export interface CreateOrganizationsGcpUserAccessBindingsRequest {
  /** Required. Example: "organizations/256" */
  parent: string;
  /** Request body */
  body?: GcpUserAccessBinding;
}

export const CreateOrganizationsGcpUserAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GcpUserAccessBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/gcpUserAccessBindings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsGcpUserAccessBindingsRequest>;

export type CreateOrganizationsGcpUserAccessBindingsResponse = Operation;
export const CreateOrganizationsGcpUserAccessBindingsResponse = Operation;

export type CreateOrganizationsGcpUserAccessBindingsError = CommonErrors;

export const createOrganizationsGcpUserAccessBindings: API.OperationMethod<CreateOrganizationsGcpUserAccessBindingsRequest, CreateOrganizationsGcpUserAccessBindingsResponse, CreateOrganizationsGcpUserAccessBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsGcpUserAccessBindingsRequest,
  output: CreateOrganizationsGcpUserAccessBindingsResponse,
  errors: [],
}));

/** Updates a GcpUserAccessBinding. Completion of this long-running operation does not necessarily signify that the changed binding is deployed onto all affected users, which may take more time. */
export interface PatchOrganizationsGcpUserAccessBindingsRequest {
  /** Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by [RFC 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N" */
  name: string;
  /** Required. Only the fields specified in this mask are updated. Because name and group_key cannot be changed, update_mask is required and may only contain the following fields: `access_levels`, `dry_run_access_levels`, `session_settings`, `scoped_access_settings`. update_mask { paths: "access_levels" } */
  updateMask?: string;
  /** Optional. This field controls whether or not certain repeated settings in the update request overwrite or append to existing settings on the binding. If true, then append. Otherwise overwrite. So far, only scoped_access_settings with session_settings supports appending. Global access_levels, access_levels in scoped_access_settings, dry_run_access_levels, and session_settings are not compatible with append functionality, and the request will return an error if append=true when these settings are in the update_mask. The request will also return an error if append=true when "scoped_access_settings" is not set in the update_mask. */
  append?: boolean;
  /** Request body */
  body?: GcpUserAccessBinding;
}

export const PatchOrganizationsGcpUserAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  append: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("append")),
  body: Schema.optional(GcpUserAccessBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/gcpUserAccessBindings/{gcpUserAccessBindingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsGcpUserAccessBindingsRequest>;

export type PatchOrganizationsGcpUserAccessBindingsResponse = Operation;
export const PatchOrganizationsGcpUserAccessBindingsResponse = Operation;

export type PatchOrganizationsGcpUserAccessBindingsError = CommonErrors;

export const patchOrganizationsGcpUserAccessBindings: API.OperationMethod<PatchOrganizationsGcpUserAccessBindingsRequest, PatchOrganizationsGcpUserAccessBindingsResponse, PatchOrganizationsGcpUserAccessBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsGcpUserAccessBindingsRequest,
  output: PatchOrganizationsGcpUserAccessBindingsResponse,
  errors: [],
}));

/** Deletes a GcpUserAccessBinding. Completion of this long-running operation does not necessarily signify that the binding deletion is deployed onto all affected users, which may take more time. */
export interface DeleteOrganizationsGcpUserAccessBindingsRequest {
  /** Required. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N" */
  name: string;
}

export const DeleteOrganizationsGcpUserAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/gcpUserAccessBindings/{gcpUserAccessBindingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsGcpUserAccessBindingsRequest>;

export type DeleteOrganizationsGcpUserAccessBindingsResponse = Operation;
export const DeleteOrganizationsGcpUserAccessBindingsResponse = Operation;

export type DeleteOrganizationsGcpUserAccessBindingsError = CommonErrors;

export const deleteOrganizationsGcpUserAccessBindings: API.OperationMethod<DeleteOrganizationsGcpUserAccessBindingsRequest, DeleteOrganizationsGcpUserAccessBindingsResponse, DeleteOrganizationsGcpUserAccessBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsGcpUserAccessBindingsRequest,
  output: DeleteOrganizationsGcpUserAccessBindingsResponse,
  errors: [],
}));

/** Lists all supported permissions in VPCSC Granular Controls. */
export interface ListPermissionsRequest {
  /** Optional. This flag specifies the maximum number of services to return per page. Default is 100. */
  pageSize?: number;
  /** Optional. Token to start on a later page. Default is the first page. */
  pageToken?: string;
}

export const ListPermissionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/permissions" }),
  svc,
) as unknown as Schema.Schema<ListPermissionsRequest>;

export type ListPermissionsResponse = ListSupportedPermissionsResponse;
export const ListPermissionsResponse = ListSupportedPermissionsResponse;

export type ListPermissionsError = CommonErrors;

export const listPermissions = API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

