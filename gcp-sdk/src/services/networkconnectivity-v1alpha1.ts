// ==========================================================================
// Network Connectivity API (networkconnectivity v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "networkconnectivity",
  version: "v1alpha1",
  rootUrl: "https://networkconnectivity.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

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

export interface Hub {
  /** Immutable. The name of a Hub resource. */
  name?: string;
  /** Time when the Hub was created. */
  createTime?: string;
  /** Time when the Hub was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** Short description of the hub resource. */
  description?: string;
  /** Output only. A list of the URIs of all attached spokes. This field is deprecated and will not be included in future API versions. Call ListSpokes on each region instead. */
  spokes?: Array<string>;
  /** Output only. Google-generated UUID for this resource. This is unique across all Hub resources. If a Hub resource is deleted and another with the same name is created, it gets a different unique_id. */
  uniqueId?: string;
  /** Output only. The current lifecycle state of this Hub. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING" | "FAILED" | (string & {});
}

export const Hub: Schema.Schema<Hub> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  spokes: Schema.optional(Schema.Array(Schema.String)),
  uniqueId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Hub" }) as any as Schema.Schema<Hub>;

export interface ListHubsResponse {
  /** Hubs to be returned. */
  hubs?: Array<Hub>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListHubsResponse: Schema.Schema<ListHubsResponse> = Schema.suspend(() => Schema.Struct({
  hubs: Schema.optional(Schema.Array(Hub)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListHubsResponse" }) as any as Schema.Schema<ListHubsResponse>;

export interface RouterApplianceInstance {
  /** The URI of the virtual machine resource */
  virtualMachine?: string;
  /** The IP address of the network interface to use for peering. */
  ipAddress?: string;
  networkInterface?: string;
}

export const RouterApplianceInstance: Schema.Schema<RouterApplianceInstance> = Schema.suspend(() => Schema.Struct({
  virtualMachine: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  networkInterface: Schema.optional(Schema.String),
})).annotate({ identifier: "RouterApplianceInstance" }) as any as Schema.Schema<RouterApplianceInstance>;

export interface Spoke {
  /** Immutable. The name of a Spoke resource. */
  name?: string;
  /** The time when the Spoke was created. */
  createTime?: string;
  /** The time when the Spoke was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** Short description of the spoke resource */
  description?: string;
  /** The resource URL of the hub resource that the spoke is attached to */
  hub?: string;
  /** The URIs of linked VPN tunnel resources */
  linkedVpnTunnels?: Array<string>;
  /** The URIs of linked interconnect attachment resources */
  linkedInterconnectAttachments?: Array<string>;
  /** The URIs of linked Router appliance resources */
  linkedRouterApplianceInstances?: Array<RouterApplianceInstance>;
  /** Output only. Google-generated UUID for this resource. This is unique across all Spoke resources. If a Spoke resource is deleted and another with the same name is created, it gets a different unique_id. */
  uniqueId?: string;
  /** Output only. The current lifecycle state of this Hub. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING" | "FAILED" | (string & {});
}

export const Spoke: Schema.Schema<Spoke> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  hub: Schema.optional(Schema.String),
  linkedVpnTunnels: Schema.optional(Schema.Array(Schema.String)),
  linkedInterconnectAttachments: Schema.optional(Schema.Array(Schema.String)),
  linkedRouterApplianceInstances: Schema.optional(Schema.Array(RouterApplianceInstance)),
  uniqueId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Spoke" }) as any as Schema.Schema<Spoke>;

export interface ListSpokesResponse {
  /** Spokes to be returned. */
  spokes?: Array<Spoke>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSpokesResponse: Schema.Schema<ListSpokesResponse> = Schema.suspend(() => Schema.Struct({
  spokes: Schema.optional(Schema.Array(Spoke)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSpokesResponse" }) as any as Schema.Schema<ListSpokesResponse>;

export interface Migration {
  /** Immutable. Resource path as an URI of the source resource, for example a subnet. The project for the source resource should match the project for the InternalRange. An example: /projects/{project}/regions/{region}/subnetworks/{subnet} */
  source?: string;
  /** Immutable. Resource path of the target resource. The target project can be different, as in the cases when migrating to peer networks. For example: /projects/{project}/regions/{region}/subnetworks/{subnet} */
  target?: string;
}

export const Migration: Schema.Schema<Migration> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "Migration" }) as any as Schema.Schema<Migration>;

export interface AllocationOptions {
  /** Optional. Allocation strategy. Not setting this field when the allocation is requested means an implementation defined strategy is used. */
  allocationStrategy?: "ALLOCATION_STRATEGY_UNSPECIFIED" | "RANDOM" | "FIRST_AVAILABLE" | "RANDOM_FIRST_N_AVAILABLE" | "FIRST_SMALLEST_FITTING" | (string & {});
  /** Optional. This field must be set only when allocation_strategy is set to RANDOM_FIRST_N_AVAILABLE. The value should be the maximum expected parallelism of range creation requests issued to the same space of peered netwroks. */
  firstAvailableRangesLookupSize?: number;
}

export const AllocationOptions: Schema.Schema<AllocationOptions> = Schema.suspend(() => Schema.Struct({
  allocationStrategy: Schema.optional(Schema.String),
  firstAvailableRangesLookupSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "AllocationOptions" }) as any as Schema.Schema<AllocationOptions>;

export interface InternalRange {
  /** Identifier. The name of an internal range. Format: projects/{project}/locations/{location}/internalRanges/{internal_range} See: https://google.aip.dev/122#fields-representing-resource-names */
  name?: string;
  /** Output only. Time when the internal range was created. */
  createTime?: string;
  /** Output only. Time when the internal range was updated. */
  updateTime?: string;
  /** Optional. User-defined labels. */
  labels?: Record<string, string>;
  /** Optional. A description of this resource. */
  description?: string;
  /** Optional. IP range that this internal range defines. NOTE: IPv6 ranges are limited to usage=EXTERNAL_TO_VPC and peering=FOR_SELF. NOTE: For IPv6 Ranges this field is compulsory, i.e. the address range must be specified explicitly. */
  ipCidrRange?: string;
  /** Optional. The URL or resource ID of the network in which to reserve the internal range. The network cannot be deleted if there are any reserved internal ranges referring to it. Legacy networks are not supported. For example: https://www.googleapis.com/compute/v1/projects/{project}/locations/global/networks/{network} projects/{project}/locations/global/networks/{network} {network} */
  network?: string;
  /** Optional. The type of usage set for this internal range. */
  usage?: "USAGE_UNSPECIFIED" | "FOR_VPC" | "EXTERNAL_TO_VPC" | "FOR_MIGRATION" | (string & {});
  /** Optional. The type of peering set for this internal range. */
  peering?: "PEERING_UNSPECIFIED" | "FOR_SELF" | "FOR_PEER" | "NOT_SHARED" | (string & {});
  /** Optional. An alternative to ip_cidr_range. Can be set when trying to create an IPv4 reservation that automatically finds a free range of the given size. If both ip_cidr_range and prefix_length are set, there is an error if the range sizes do not match. Can also be used during updates to change the range size. NOTE: For IPv6 this field only works if ip_cidr_range is set as well, and both fields must match. In other words, with IPv6 this field only works as a redundant parameter. */
  prefixLength?: number;
  /** Optional. Can be set to narrow down or pick a different address space while searching for a free range. If not set, defaults to the ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"] address space (for auto-mode networks, the "10.0.0.0/9" range is used instead of "10.0.0.0/8"). This can be used to target the search in other rfc-1918 address spaces like "172.16.0.0/12" and "192.168.0.0/16" or non-rfc-1918 address spaces used in the VPC. */
  targetCidrRange?: Array<string>;
  /** Output only. The list of resources that refer to this internal range. Resources that use the internal range for their range allocation are referred to as users of the range. Other resources mark themselves as users while doing so by creating a reference to this internal range. Having a user, based on this reference, prevents deletion of the internal range that is referred to. Can be empty. */
  users?: Array<string>;
  /** Optional. Types of resources that are allowed to overlap with the current internal range. */
  overlaps?: Array<"OVERLAP_UNSPECIFIED" | "OVERLAP_ROUTE_RANGE" | "OVERLAP_EXISTING_SUBNET_RANGE" | (string & {})>;
  /** Optional. Must be present if usage is set to FOR_MIGRATION. */
  migration?: Migration;
  /** Optional. Immutable ranges cannot have their fields modified, except for labels and description. */
  immutable?: boolean;
  /** Optional. Range auto-allocation options, may be set only when auto-allocation is selected by not setting ip_cidr_range (and setting prefix_length). */
  allocationOptions?: AllocationOptions;
  /** Optional. ExcludeCidrRanges flag. Specifies a set of CIDR blocks that allows exclusion of particular CIDR ranges from the auto-allocation process, without having to reserve these blocks */
  excludeCidrRanges?: Array<string>;
}

export const InternalRange: Schema.Schema<InternalRange> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  usage: Schema.optional(Schema.String),
  peering: Schema.optional(Schema.String),
  prefixLength: Schema.optional(Schema.Number),
  targetCidrRange: Schema.optional(Schema.Array(Schema.String)),
  users: Schema.optional(Schema.Array(Schema.String)),
  overlaps: Schema.optional(Schema.Array(Schema.String)),
  migration: Schema.optional(Migration),
  immutable: Schema.optional(Schema.Boolean),
  allocationOptions: Schema.optional(AllocationOptions),
  excludeCidrRanges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InternalRange" }) as any as Schema.Schema<InternalRange>;

export interface ListInternalRangesResponse {
  /** Internal range to be returned. */
  internalRanges?: Array<InternalRange>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInternalRangesResponse: Schema.Schema<ListInternalRangesResponse> = Schema.suspend(() => Schema.Struct({
  internalRanges: Schema.optional(Schema.Array(InternalRange)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInternalRangesResponse" }) as any as Schema.Schema<ListInternalRangesResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
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
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
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
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGlobalHubsRequest {
  /** Required. The parent resource's name. */
  parent: string;
  /** The maximum number of results per page that should be returned. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** A filter expression that filters the results listed in the response. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalHubsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/global/hubs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalHubsRequest>;

export type ListProjectsLocationsGlobalHubsResponse = ListHubsResponse;
export const ListProjectsLocationsGlobalHubsResponse = ListHubsResponse;

export type ListProjectsLocationsGlobalHubsError = DefaultErrors;

/** Lists the Network Connectivity Center hubs associated with a given project. */
export const listProjectsLocationsGlobalHubs: API.PaginatedOperationMethod<ListProjectsLocationsGlobalHubsRequest, ListProjectsLocationsGlobalHubsResponse, ListProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalHubsRequest,
  output: ListProjectsLocationsGlobalHubsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGlobalHubsRequest {
  /** Required. Name of the Hub resource to get. */
  name: string;
}

export const GetProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/global/hubs/{hubsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalHubsRequest>;

export type GetProjectsLocationsGlobalHubsResponse = Hub;
export const GetProjectsLocationsGlobalHubsResponse = Hub;

export type GetProjectsLocationsGlobalHubsError = DefaultErrors;

/** Gets details about a Network Connectivity Center hub. */
export const getProjectsLocationsGlobalHubs: API.OperationMethod<GetProjectsLocationsGlobalHubsRequest, GetProjectsLocationsGlobalHubsResponse, GetProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalHubsRequest,
  output: GetProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGlobalHubsRequest {
  /** Required. The parent resource's name of the Hub. */
  parent: string;
  /** Optional. Unique id for the Hub to create. */
  hubId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Hub;
}

export const CreateProjectsLocationsGlobalHubsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  hubId: Schema.optional(Schema.String).pipe(T.HttpQuery("hubId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Hub).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/global/hubs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalHubsRequest>;

export type CreateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsGlobalHubsError = DefaultErrors;

/** Creates a new Network Connectivity Center hub in the specified project. */
export const createProjectsLocationsGlobalHubs: API.OperationMethod<CreateProjectsLocationsGlobalHubsRequest, CreateProjectsLocationsGlobalHubsResponse, CreateProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlobalHubsRequest,
  output: CreateProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGlobalHubsRequest {
  /** Immutable. The name of a Hub resource. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Hub resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Hub;
}

export const PatchProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Hub).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/global/hubs/{hubsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalHubsRequest>;

export type PatchProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsGlobalHubsError = DefaultErrors;

/** Updates the description and/or labels of a Network Connectivity Center hub. */
export const patchProjectsLocationsGlobalHubs: API.OperationMethod<PatchProjectsLocationsGlobalHubsRequest, PatchProjectsLocationsGlobalHubsResponse, PatchProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlobalHubsRequest,
  output: PatchProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the Hub to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/global/hubs/{hubsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalHubsRequest>;

export type DeleteProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsGlobalHubsError = DefaultErrors;

/** Deletes a Network Connectivity Center hub. */
export const deleteProjectsLocationsGlobalHubs: API.OperationMethod<DeleteProjectsLocationsGlobalHubsRequest, DeleteProjectsLocationsGlobalHubsResponse, DeleteProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalHubsRequest,
  output: DeleteProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsGlobalHubsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalHubsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/global/hubs/{hubsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalHubsRequest>;

export type SetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalHubsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsGlobalHubs: API.OperationMethod<SetIamPolicyProjectsLocationsGlobalHubsRequest, SetIamPolicyProjectsLocationsGlobalHubsResponse, SetIamPolicyProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalHubsRequest,
  output: SetIamPolicyProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsGlobalHubsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalHubsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/global/hubs/{hubsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalHubsRequest>;

export type GetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalHubsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsGlobalHubs: API.OperationMethod<GetIamPolicyProjectsLocationsGlobalHubsRequest, GetIamPolicyProjectsLocationsGlobalHubsResponse, GetIamPolicyProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalHubsRequest,
  output: GetIamPolicyProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsGlobalHubsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalHubsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/global/hubs/{hubsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalHubsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalHubsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalHubsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalHubsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsGlobalHubs: API.OperationMethod<TestIamPermissionsProjectsLocationsGlobalHubsRequest, TestIamPermissionsProjectsLocationsGlobalHubsResponse, TestIamPermissionsProjectsLocationsGlobalHubsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalHubsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSpokesRequest {
  /** Required. The parent's resource name. */
  parent: string;
  /** The maximum number of results per page that should be returned. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** A filter expression that filters the results listed in the response. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsSpokesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSpokesRequest>;

export type ListProjectsLocationsSpokesResponse = ListSpokesResponse;
export const ListProjectsLocationsSpokesResponse = ListSpokesResponse;

export type ListProjectsLocationsSpokesError = DefaultErrors;

/** Lists the Network Connectivity Center spokes in a specified project and location. */
export const listProjectsLocationsSpokes: API.PaginatedOperationMethod<ListProjectsLocationsSpokesRequest, ListProjectsLocationsSpokesResponse, ListProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSpokesRequest,
  output: ListProjectsLocationsSpokesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSpokesRequest {
  /** Required. The name of Spoke resource. */
  name: string;
}

export const GetProjectsLocationsSpokesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSpokesRequest>;

export type GetProjectsLocationsSpokesResponse = Spoke;
export const GetProjectsLocationsSpokesResponse = Spoke;

export type GetProjectsLocationsSpokesError = DefaultErrors;

/** Gets details about a Network Connectivity Center spoke. */
export const getProjectsLocationsSpokes: API.OperationMethod<GetProjectsLocationsSpokesRequest, GetProjectsLocationsSpokesResponse, GetProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSpokesRequest,
  output: GetProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSpokesRequest {
  /** Required. The parent's resource name of the Spoke. */
  parent: string;
  /** Optional. Unique id for the Spoke to create. */
  spokeId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Spoke;
}

export const CreateProjectsLocationsSpokesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  spokeId: Schema.optional(Schema.String).pipe(T.HttpQuery("spokeId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Spoke).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSpokesRequest>;

export type CreateProjectsLocationsSpokesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsSpokesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsSpokesError = DefaultErrors;

/** Creates a Network Connectivity Center spoke. */
export const createProjectsLocationsSpokes: API.OperationMethod<CreateProjectsLocationsSpokesRequest, CreateProjectsLocationsSpokesResponse, CreateProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSpokesRequest,
  output: CreateProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSpokesRequest {
  /** Immutable. The name of a Spoke resource. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Spoke resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Spoke;
}

export const PatchProjectsLocationsSpokesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Spoke).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSpokesRequest>;

export type PatchProjectsLocationsSpokesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsSpokesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsSpokesError = DefaultErrors;

/** Updates the parameters of a Network Connectivity Center spoke. */
export const patchProjectsLocationsSpokes: API.OperationMethod<PatchProjectsLocationsSpokesRequest, PatchProjectsLocationsSpokesResponse, PatchProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSpokesRequest,
  output: PatchProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSpokesRequest {
  /** Required. The name of the Spoke to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsSpokesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSpokesRequest>;

export type DeleteProjectsLocationsSpokesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsSpokesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsSpokesError = DefaultErrors;

/** Deletes a Network Connectivity Center spoke. */
export const deleteProjectsLocationsSpokes: API.OperationMethod<DeleteProjectsLocationsSpokesRequest, DeleteProjectsLocationsSpokesResponse, DeleteProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSpokesRequest,
  output: DeleteProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsSpokesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsSpokesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsSpokesRequest>;

export type SetIamPolicyProjectsLocationsSpokesResponse = Policy;
export const SetIamPolicyProjectsLocationsSpokesResponse = Policy;

export type SetIamPolicyProjectsLocationsSpokesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsSpokes: API.OperationMethod<SetIamPolicyProjectsLocationsSpokesRequest, SetIamPolicyProjectsLocationsSpokesResponse, SetIamPolicyProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsSpokesRequest,
  output: SetIamPolicyProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsSpokesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsSpokesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsSpokesRequest>;

export type GetIamPolicyProjectsLocationsSpokesResponse = Policy;
export const GetIamPolicyProjectsLocationsSpokesResponse = Policy;

export type GetIamPolicyProjectsLocationsSpokesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsSpokes: API.OperationMethod<GetIamPolicyProjectsLocationsSpokesRequest, GetIamPolicyProjectsLocationsSpokesResponse, GetIamPolicyProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsSpokesRequest,
  output: GetIamPolicyProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsSpokesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsSpokesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsSpokesRequest>;

export type TestIamPermissionsProjectsLocationsSpokesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsSpokesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsSpokesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsSpokes: API.OperationMethod<TestIamPermissionsProjectsLocationsSpokesRequest, TestIamPermissionsProjectsLocationsSpokesResponse, TestIamPermissionsProjectsLocationsSpokesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsSpokesRequest,
  output: TestIamPermissionsProjectsLocationsSpokesResponse,
  errors: [],
}));

export interface ListProjectsLocationsInternalRangesRequest {
  /** Required. The parent resource's name. */
  parent: string;
  /** The maximum number of results per page that should be returned. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** A filter expression that filters the results listed in the response. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsInternalRangesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInternalRangesRequest>;

export type ListProjectsLocationsInternalRangesResponse = ListInternalRangesResponse;
export const ListProjectsLocationsInternalRangesResponse = ListInternalRangesResponse;

export type ListProjectsLocationsInternalRangesError = DefaultErrors;

/** Lists internal ranges in a given project and location. */
export const listProjectsLocationsInternalRanges: API.PaginatedOperationMethod<ListProjectsLocationsInternalRangesRequest, ListProjectsLocationsInternalRangesResponse, ListProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsInternalRangesRequest,
  output: ListProjectsLocationsInternalRangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInternalRangesRequest {
  /** Required. Name of the InternalRange to get. */
  name: string;
}

export const GetProjectsLocationsInternalRangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInternalRangesRequest>;

export type GetProjectsLocationsInternalRangesResponse = InternalRange;
export const GetProjectsLocationsInternalRangesResponse = InternalRange;

export type GetProjectsLocationsInternalRangesError = DefaultErrors;

/** Gets details of a single internal range. */
export const getProjectsLocationsInternalRanges: API.OperationMethod<GetProjectsLocationsInternalRangesRequest, GetProjectsLocationsInternalRangesResponse, GetProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInternalRangesRequest,
  output: GetProjectsLocationsInternalRangesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsInternalRangesRequest {
  /** Required. The parent resource's name of the InternalRange. */
  parent: string;
  /** Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/internalRanges/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. */
  internalRangeId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: InternalRange;
}

export const CreateProjectsLocationsInternalRangesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  internalRangeId: Schema.optional(Schema.String).pipe(T.HttpQuery("internalRangeId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(InternalRange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInternalRangesRequest>;

export type CreateProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsInternalRangesError = DefaultErrors;

/** Creates a new internal range in a given project and location. */
export const createProjectsLocationsInternalRanges: API.OperationMethod<CreateProjectsLocationsInternalRangesRequest, CreateProjectsLocationsInternalRangesResponse, CreateProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInternalRangesRequest,
  output: CreateProjectsLocationsInternalRangesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsInternalRangesRequest {
  /** Identifier. The name of an internal range. Format: projects/{project}/locations/{location}/internalRanges/{internal_range} See: https://google.aip.dev/122#fields-representing-resource-names */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the internal range resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: InternalRange;
}

export const PatchProjectsLocationsInternalRangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(InternalRange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInternalRangesRequest>;

export type PatchProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsInternalRangesError = DefaultErrors;

/** Updates the parameters of a single internal range. */
export const patchProjectsLocationsInternalRanges: API.OperationMethod<PatchProjectsLocationsInternalRangesRequest, PatchProjectsLocationsInternalRangesResponse, PatchProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInternalRangesRequest,
  output: PatchProjectsLocationsInternalRangesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsInternalRangesRequest {
  /** Required. The name of the InternalRange to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsInternalRangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInternalRangesRequest>;

export type DeleteProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsInternalRangesError = DefaultErrors;

/** Deletes a single internal range. */
export const deleteProjectsLocationsInternalRanges: API.OperationMethod<DeleteProjectsLocationsInternalRangesRequest, DeleteProjectsLocationsInternalRangesResponse, DeleteProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInternalRangesRequest,
  output: DeleteProjectsLocationsInternalRangesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsInternalRangesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsInternalRangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInternalRangesRequest>;

export type SetIamPolicyProjectsLocationsInternalRangesResponse = Policy;
export const SetIamPolicyProjectsLocationsInternalRangesResponse = Policy;

export type SetIamPolicyProjectsLocationsInternalRangesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsInternalRanges: API.OperationMethod<SetIamPolicyProjectsLocationsInternalRangesRequest, SetIamPolicyProjectsLocationsInternalRangesResponse, SetIamPolicyProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsInternalRangesRequest,
  output: SetIamPolicyProjectsLocationsInternalRangesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsInternalRangesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsInternalRangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInternalRangesRequest>;

export type GetIamPolicyProjectsLocationsInternalRangesResponse = Policy;
export const GetIamPolicyProjectsLocationsInternalRangesResponse = Policy;

export type GetIamPolicyProjectsLocationsInternalRangesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsInternalRanges: API.OperationMethod<GetIamPolicyProjectsLocationsInternalRangesRequest, GetIamPolicyProjectsLocationsInternalRangesResponse, GetIamPolicyProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsInternalRangesRequest,
  output: GetIamPolicyProjectsLocationsInternalRangesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsInternalRangesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsInternalRangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInternalRangesRequest>;

export type TestIamPermissionsProjectsLocationsInternalRangesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInternalRangesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInternalRangesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsInternalRanges: API.OperationMethod<TestIamPermissionsProjectsLocationsInternalRangesRequest, TestIamPermissionsProjectsLocationsInternalRangesResponse, TestIamPermissionsProjectsLocationsInternalRangesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInternalRangesRequest,
  output: TestIamPermissionsProjectsLocationsInternalRangesResponse,
  errors: [],
}));

