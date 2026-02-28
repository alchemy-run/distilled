// ==========================================================================
// Service Networking API (servicenetworking v1)
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
  name: "servicenetworking",
  version: "v1",
  rootUrl: "https://servicenetworking.googleapis.com/",
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

export interface Connection {
  /** Required. The name of service consumer's VPC network that's connected with service producer network, in the following format: `projects/{project}/global/networks/{network}`. `{project}` is a project number, such as in `12345` that includes the VPC service consumer's VPC network. `{network}` is the name of the service consumer's VPC network. */
  network?: string;
  /** The name of one or more allocated IP address ranges for this service producer of type `PEERING`. Note that invoking CreateConnection method with a different range when connection is already established will not modify already provisioned service producer subnetworks. If CreateConnection method is invoked repeatedly to reconnect when peering connection had been disconnected on the consumer side, leaving this field empty will restore previously allocated IP ranges. */
  reservedPeeringRanges?: Array<string>;
  /** Output only. The name of the VPC Network Peering connection that was created by the service producer. */
  peering?: string;
  /** Output only. The name of the peering service that's associated with this connection, in the following format: `services/{service name}`. */
  service?: string;
}

export const Connection: Schema.Schema<Connection> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  reservedPeeringRanges: Schema.optional(Schema.Array(Schema.String)),
  peering: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "Connection" }) as any as Schema.Schema<Connection>;

export interface ListConnectionsResponse {
  /** The list of Connections. */
  connections?: Array<Connection>;
}

export const ListConnectionsResponse: Schema.Schema<ListConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  connections: Schema.optional(Schema.Array(Connection)),
})).annotate({ identifier: "ListConnectionsResponse" }) as any as Schema.Schema<ListConnectionsResponse>;

export interface DeleteConnectionRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is a project number, as in '12345' {network} is a network name. */
  consumerNetwork?: string;
}

export const DeleteConnectionRequest: Schema.Schema<DeleteConnectionRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteConnectionRequest" }) as any as Schema.Schema<DeleteConnectionRequest>;

export interface DisableVpcServiceControlsRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is a project number, as in '12345' {network} is network name. */
  consumerNetwork?: string;
}

export const DisableVpcServiceControlsRequest: Schema.Schema<DisableVpcServiceControlsRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "DisableVpcServiceControlsRequest" }) as any as Schema.Schema<DisableVpcServiceControlsRequest>;

export interface EnableVpcServiceControlsRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is a project number, as in '12345' {network} is network name. */
  consumerNetwork?: string;
}

export const EnableVpcServiceControlsRequest: Schema.Schema<EnableVpcServiceControlsRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "EnableVpcServiceControlsRequest" }) as any as Schema.Schema<EnableVpcServiceControlsRequest>;

export interface VpcServiceControls {
  /** Output only. Indicates whether the VPC Service Controls are enabled or disabled for the connection. If the consumer called the EnableVpcServiceControls method, then this is true. If the consumer called DisableVpcServiceControls, then this is false. The default is false. */
  enabled?: boolean;
}

export const VpcServiceControls: Schema.Schema<VpcServiceControls> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "VpcServiceControls" }) as any as Schema.Schema<VpcServiceControls>;

export interface SecondaryIpRangeSpec {
  /** Required. A name for the secondary IP range. The name must be 1-63 characters long, and comply with RFC1035. The name must be unique within the subnetwork. */
  rangeName?: string;
  /** Required. The prefix length of the secondary IP range. Use CIDR range notation, such as `30` to provision a secondary IP range with an `x.x.x.x/30` CIDR range. The IP address range is drawn from a pool of available ranges in the service consumer's allocated range. */
  ipPrefixLength?: number;
  /** Optional. The starting address of a range. The address must be a valid IPv4 address in the x.x.x.x format. This value combined with the IP prefix range is the CIDR range for the secondary IP range. The range must be within the allocated range that is assigned to the private connection. If the CIDR range isn't available, the call fails. */
  requestedAddress?: string;
  /** Optional. Enable outside allocation using public IP addresses. Any public IP range may be specified. If this field is provided, we will not use customer reserved ranges for this secondary IP range. */
  outsideAllocationPublicIpRange?: string;
}

export const SecondaryIpRangeSpec: Schema.Schema<SecondaryIpRangeSpec> = Schema.suspend(() => Schema.Struct({
  rangeName: Schema.optional(Schema.String),
  ipPrefixLength: Schema.optional(Schema.Number),
  requestedAddress: Schema.optional(Schema.String),
  outsideAllocationPublicIpRange: Schema.optional(Schema.String),
})).annotate({ identifier: "SecondaryIpRangeSpec" }) as any as Schema.Schema<SecondaryIpRangeSpec>;

export interface AddSubnetworkRequest {
  /** Required. The name of the service consumer's VPC network. The network must have an existing private connection that was provisioned through the connections.create method. The name must be in the following format: `projects/{project}/global/networks/{network}`, where {project} is a project number, such as `12345`. {network} is the name of a VPC network in the project. */
  consumerNetwork?: string;
  /** Required. A name for the new subnet. For information about the naming requirements, see [subnetwork](https://cloud.google.com/compute/docs/reference/rest/v1/subnetworks) in the Compute API documentation. */
  subnetwork?: string;
  /** Required. The name of a [region](https://cloud.google.com/compute/docs/regions-zones) for the subnet, such `europe-west1`. */
  region?: string;
  /** Required. The prefix length of the subnet's IP address range. Use CIDR range notation, such as `29` to provision a subnet with an `x.x.x.x/29` CIDR range. The IP address range is drawn from a pool of available ranges in the service consumer's allocated range. GCE disallows subnets with prefix_length > 29 */
  ipPrefixLength?: number;
  /** Optional. Description of the subnet. */
  description?: string;
  /** A list of members that are granted the `roles/servicenetworking.subnetworkAdmin` role on the subnet. */
  subnetworkUsers?: Array<string>;
  /** Required. A resource that represents the service consumer, such as `projects/123456`. The project number can be different from the value in the consumer network parameter. For example, the network might be part of a Shared VPC network. In those cases, Service Networking validates that this resource belongs to that Shared VPC. */
  consumer?: string;
  /** Optional. The starting address of a range. The address must be a valid IPv4 address in the x.x.x.x format. This value combined with the IP prefix range is the CIDR range for the subnet. The range must be within the allocated range that is assigned to the private connection. If the CIDR range isn't available, the call fails. */
  requestedAddress?: string;
  /** Optional. A list of secondary IP ranges to be created within the new subnetwork. */
  secondaryIpRangeSpecs?: Array<SecondaryIpRangeSpec>;
  /** Optional. The private IPv6 google access type for the VMs in this subnet. For information about the access types that can be set using this field, see [subnetwork](https://cloud.google.com/compute/docs/reference/rest/v1/subnetworks) in the Compute API documentation. */
  privateIpv6GoogleAccess?: string;
  /** Optional. The name of one or more allocated IP address ranges associated with this private service access connection. If no range names are provided all ranges associated with this connection will be considered. If a CIDR range with the specified IP prefix length is not available within these ranges, the call fails. */
  requestedRanges?: Array<string>;
  /** Optional. Enable outside allocation using public IP addresses. Any public IP range may be specified. If this field is provided, we will not use customer reserved ranges for this primary IP range. */
  outsideAllocationPublicIpRange?: string;
  /** Optional. Defines the purpose field of the subnet, e.g. 'PRIVATE_SERVICE_CONNECT'. For information about the purposes that can be set using this field, see [subnetwork](https://cloud.google.com/compute/docs/reference/rest/v1/subnetworks) in the Compute API documentation. */
  purpose?: string;
  /** Optional. The IAM permission check determines whether the consumer project has 'servicenetworking.services.use' permission or not. */
  checkServiceNetworkingUsePermission?: boolean;
  /** Optional. Specifies if Service Networking should use a custom time bucket for GCE idempotency. If false, Service Networking uses a 300 second (5 minute) GCE idempotency window. If true, Service Networking uses a custom idempotency window provided by the user in field compute_idempotency_window. */
  useCustomComputeIdempotencyWindow?: boolean;
  /** Optional. Specifies a custom time bucket for GCE subnetwork request idempotency. If two equivalent concurrent requests are made, GCE will know to ignore the request if it has already been completed or is in progress. Only requests with matching compute_idempotency_window have guaranteed idempotency. Changing this time window between requests results in undefined behavior. Zero (or empty) value with custom_compute_idempotency_window=true specifies no idempotency (i.e. no request ID is provided to GCE). Maximum value of 14 days (enforced by GCE limit). */
  computeIdempotencyWindow?: string;
  /** Optional. Defines the allowSubnetCidrRoutesOverlap field of the subnet, e.g. Available in alpha and beta according to [Compute API documentation](https://cloud.google.com/compute/docs/reference/rest/beta/subnetworks/insert) */
  allowSubnetCidrRoutesOverlap?: boolean;
  /** Optional. Defines the role field of the subnet, e.g. 'ACTIVE'. For information about the roles that can be set using this field, see [subnetwork](https://cloud.google.com/compute/docs/reference/rest/v1/subnetworks) in the Compute API documentation. */
  role?: string;
  /** Optional. The url of an Internal Range. Eg: `projects//locations/global/internalRanges/`. If specified, it means that the subnetwork cidr will be created using the combination of requested_address/ip_prefix_length. Note that the subnet cidr has to be within the cidr range of this Internal Range. */
  internalRange?: string;
  /** Optional. Skips validating if the requested_address is in use by SN VPC’s peering group. Compute Engine will still perform this check and fail the request if the requested_address is in use. Note that Compute Engine does not check for the existence of dynamic routes when performing this check. Caller of this API should make sure that there are no dynamic routes overlapping with the requested_address/prefix_length IP address range otherwise the created subnet could cause misrouting. */
  skipRequestedAddressValidation?: boolean;
}

export const AddSubnetworkRequest: Schema.Schema<AddSubnetworkRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  ipPrefixLength: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  subnetworkUsers: Schema.optional(Schema.Array(Schema.String)),
  consumer: Schema.optional(Schema.String),
  requestedAddress: Schema.optional(Schema.String),
  secondaryIpRangeSpecs: Schema.optional(Schema.Array(SecondaryIpRangeSpec)),
  privateIpv6GoogleAccess: Schema.optional(Schema.String),
  requestedRanges: Schema.optional(Schema.Array(Schema.String)),
  outsideAllocationPublicIpRange: Schema.optional(Schema.String),
  purpose: Schema.optional(Schema.String),
  checkServiceNetworkingUsePermission: Schema.optional(Schema.Boolean),
  useCustomComputeIdempotencyWindow: Schema.optional(Schema.Boolean),
  computeIdempotencyWindow: Schema.optional(Schema.String),
  allowSubnetCidrRoutesOverlap: Schema.optional(Schema.Boolean),
  role: Schema.optional(Schema.String),
  internalRange: Schema.optional(Schema.String),
  skipRequestedAddressValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AddSubnetworkRequest" }) as any as Schema.Schema<AddSubnetworkRequest>;

export interface SearchRangeRequest {
  /** Required. Network name in the consumer project. This network must have been already peered with a shared VPC network using CreateConnection method. Must be in a form 'projects/{project}/global/networks/{network}'. {project} is a project number, as in '12345' {network} is network name. */
  network?: string;
  /** Required. The prefix length of the IP range. Use usual CIDR range notation. For example, '30' to find unused x.x.x.x/30 CIDR range. Actual range will be determined using allocated range for the consumer peered network and returned in the result. */
  ipPrefixLength?: number;
}

export const SearchRangeRequest: Schema.Schema<SearchRangeRequest> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  ipPrefixLength: Schema.optional(Schema.Number),
})).annotate({ identifier: "SearchRangeRequest" }) as any as Schema.Schema<SearchRangeRequest>;

export interface ConsumerProject {
  /** Required. Project number of the consumer that is launching the service instance. It can own the network that is peered with Google or, be a service project in an XPN where the host project has the network. */
  projectNum?: string;
}

export const ConsumerProject: Schema.Schema<ConsumerProject> = Schema.suspend(() => Schema.Struct({
  projectNum: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsumerProject" }) as any as Schema.Schema<ConsumerProject>;

export interface SecondaryIpRange {
  /** Name of the secondary IP range. */
  rangeName?: string;
  /** Secondary IP CIDR range in `x.x.x.x/y` format. */
  ipCidrRange?: string;
}

export const SecondaryIpRange: Schema.Schema<SecondaryIpRange> = Schema.suspend(() => Schema.Struct({
  rangeName: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
})).annotate({ identifier: "SecondaryIpRange" }) as any as Schema.Schema<SecondaryIpRange>;

export interface Subnetwork {
  /** Subnetwork name. See https://cloud.google.com/compute/docs/vpc/ */
  name?: string;
  /** Subnetwork CIDR range in `10.x.x.x/y` format. */
  ipCidrRange?: string;
  /** In the Shared VPC host project, the VPC network that's peered with the consumer network. For example: `projects/1234321/global/networks/host-network` */
  network?: string;
  /** This is a discovered subnet that is not within the current consumer allocated ranges. */
  outsideAllocation?: boolean;
  /** List of secondary IP ranges in this subnetwork. */
  secondaryIpRanges?: Array<SecondaryIpRange>;
  /** GCP region where the subnetwork is located. */
  region?: string;
}

export const Subnetwork: Schema.Schema<Subnetwork> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  outsideAllocation: Schema.optional(Schema.Boolean),
  secondaryIpRanges: Schema.optional(Schema.Array(SecondaryIpRange)),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "Subnetwork" }) as any as Schema.Schema<Subnetwork>;

export interface RangeReservation {
  /** Required. The size of the desired subnet. Use usual CIDR range notation. For example, '29' to find unused x.x.x.x/29 CIDR range. The goal is to determine if one of the allocated ranges has enough free space for a subnet of the requested size. GCE disallows subnets with prefix_length > 29 */
  ipPrefixLength?: number;
  /** Optional. The size of the desired secondary ranges for the subnet. Use usual CIDR range notation. For example, '29' to find unused x.x.x.x/29 CIDR range. The goal is to determine that the allocated ranges have enough free space for all the requested secondary ranges. GCE disallows subnets with prefix_length > 29 */
  secondaryRangeIpPrefixLengths?: Array<number>;
  /** Optional. The name of one or more allocated IP address ranges associated with this private service access connection. If no range names are provided all ranges associated with this connection will be considered. If a CIDR range with the specified IP prefix length is not available within these ranges the validation fails. */
  requestedRanges?: Array<string>;
  /** Optional. List of subnetwork candidates to validate. The required input fields are `name`, `network`, and `region`. Subnetworks from this list which exist will be returned in the response with the `ip_cidr_range`, `secondary_ip_cider_ranges`, and `outside_allocation` fields set. */
  subnetworkCandidates?: Array<Subnetwork>;
}

export const RangeReservation: Schema.Schema<RangeReservation> = Schema.suspend(() => Schema.Struct({
  ipPrefixLength: Schema.optional(Schema.Number),
  secondaryRangeIpPrefixLengths: Schema.optional(Schema.Array(Schema.Number)),
  requestedRanges: Schema.optional(Schema.Array(Schema.String)),
  subnetworkCandidates: Schema.optional(Schema.Array(Subnetwork)),
})).annotate({ identifier: "RangeReservation" }) as any as Schema.Schema<RangeReservation>;

export interface ValidateConsumerConfigRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is a project number, as in '12345' {network} is network name. */
  consumerNetwork?: string;
  /** The validations will be performed in the order listed in the ValidationError enum. The first failure will return. If a validation is not requested, then the next one will be performed. SERVICE_NETWORKING_NOT_ENABLED and NETWORK_NOT_PEERED checks are performed for all requests where validation is requested. NETWORK_NOT_FOUND and NETWORK_DISCONNECTED checks are done for requests that have validate_network set to true. */
  validateNetwork?: boolean;
  /** NETWORK_NOT_IN_CONSUMERS_PROJECT, NETWORK_NOT_IN_CONSUMERS_HOST_PROJECT, and HOST_PROJECT_NOT_FOUND are done when consumer_project is provided. */
  consumerProject?: ConsumerProject;
  /** RANGES_EXHAUSTED, RANGES_NOT_RESERVED, and RANGES_DELETED_LATER are done when range_reservation is provided. */
  rangeReservation?: RangeReservation;
  /** Optional. The IAM permission check determines whether the consumer project has 'servicenetworking.services.use' permission or not. */
  checkServiceNetworkingUsePermission?: boolean;
}

export const ValidateConsumerConfigRequest: Schema.Schema<ValidateConsumerConfigRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  validateNetwork: Schema.optional(Schema.Boolean),
  consumerProject: Schema.optional(ConsumerProject),
  rangeReservation: Schema.optional(RangeReservation),
  checkServiceNetworkingUsePermission: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ValidateConsumerConfigRequest" }) as any as Schema.Schema<ValidateConsumerConfigRequest>;

export interface ValidateConsumerConfigResponse {
  /** Indicates whether all the requested validations passed. */
  isValid?: boolean;
  /** The first validation which failed. */
  validationError?: "VALIDATION_ERROR_UNSPECIFIED" | "VALIDATION_NOT_REQUESTED" | "SERVICE_NETWORKING_NOT_ENABLED" | "NETWORK_NOT_FOUND" | "NETWORK_NOT_PEERED" | "NETWORK_PEERING_DELETED" | "NETWORK_NOT_IN_CONSUMERS_PROJECT" | "NETWORK_NOT_IN_CONSUMERS_HOST_PROJECT" | "HOST_PROJECT_NOT_FOUND" | "CONSUMER_PROJECT_NOT_SERVICE_PROJECT" | "RANGES_EXHAUSTED" | "RANGES_NOT_RESERVED" | "RANGES_DELETED_LATER" | "COMPUTE_API_NOT_ENABLED" | "USE_PERMISSION_NOT_FOUND" | "SN_SERVICE_AGENT_PERMISSION_DENIED_ON_CONSUMER_PROJECT" | (string & {});
  /** List of subnetwork candidates from the request which exist with the `ip_cidr_range`, `secondary_ip_cider_ranges`, and `outside_allocation` fields set. */
  existingSubnetworkCandidates?: Array<Subnetwork>;
}

export const ValidateConsumerConfigResponse: Schema.Schema<ValidateConsumerConfigResponse> = Schema.suspend(() => Schema.Struct({
  isValid: Schema.optional(Schema.Boolean),
  validationError: Schema.optional(Schema.String),
  existingSubnetworkCandidates: Schema.optional(Schema.Array(Subnetwork)),
})).annotate({ identifier: "ValidateConsumerConfigResponse" }) as any as Schema.Schema<ValidateConsumerConfigResponse>;

export interface GoogleCloudServicenetworkingV1ConsumerConfigReservedRange {
  /** The name of the reserved range. */
  name?: string;
  /** The prefix length of the reserved range. */
  ipPrefixLength?: number;
  /** The starting address of the reserved range. The address must be a valid IPv4 address in the x.x.x.x format. This value combined with the IP prefix length is the CIDR range for the reserved range. */
  address?: string;
}

export const GoogleCloudServicenetworkingV1ConsumerConfigReservedRange: Schema.Schema<GoogleCloudServicenetworkingV1ConsumerConfigReservedRange> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ipPrefixLength: Schema.optional(Schema.Number),
  address: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudServicenetworkingV1ConsumerConfigReservedRange" }) as any as Schema.Schema<GoogleCloudServicenetworkingV1ConsumerConfigReservedRange>;

export interface CloudSQLConfig {
  /** Required. Peering service used for peering with the Cloud SQL project. */
  service?: string;
  /** Required. The project number of the Cloud SQL umbrella project. */
  umbrellaProject?: string;
  /** Required. The name of the umbrella network in the Cloud SQL umbrella project. */
  umbrellaNetwork?: string;
}

export const CloudSQLConfig: Schema.Schema<CloudSQLConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  umbrellaProject: Schema.optional(Schema.String),
  umbrellaNetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSQLConfig" }) as any as Schema.Schema<CloudSQLConfig>;

export interface ConsumerConfig {
  /** Output only. The VPC host network that is used to host managed service instances. In the format, projects/{project}/global/networks/{network} where {project} is the project number e.g. '12345' and {network} is the network name. */
  producerNetwork?: string;
  /** Import custom routes flag value for peering from consumer to producer. */
  consumerImportCustomRoutes?: boolean;
  /** Export custom routes flag value for peering from consumer to producer. */
  consumerExportCustomRoutes?: boolean;
  /** Import custom routes flag value for peering from producer to consumer. */
  producerImportCustomRoutes?: boolean;
  /** Export custom routes flag value for peering from producer to consumer. */
  producerExportCustomRoutes?: boolean;
  /** Import subnet routes with public ip flag value for peering from consumer to producer. */
  consumerImportSubnetRoutesWithPublicIp?: boolean;
  /** Export subnet routes with public ip flag value for peering from consumer to producer. */
  consumerExportSubnetRoutesWithPublicIp?: boolean;
  /** Import subnet routes with public ip flag value for peering from producer to consumer. */
  producerImportSubnetRoutesWithPublicIp?: boolean;
  /** Export subnet routes with public ip flag value for peering from producer to consumer. */
  producerExportSubnetRoutesWithPublicIp?: boolean;
  /** Output only. The reserved ranges associated with this private service access connection. */
  reservedRanges?: Array<GoogleCloudServicenetworkingV1ConsumerConfigReservedRange>;
  /** Output only. Indicates whether the VPC Service Controls reference architecture is configured for the producer VPC host network. */
  vpcScReferenceArchitectureEnabled?: boolean;
  /** Output only. The IP ranges already in use by consumer or producer */
  usedIpRanges?: Array<string>;
  /** Represents one or multiple Cloud SQL configurations. */
  cloudsqlConfigs?: Array<CloudSQLConfig>;
  /** Output only. If this is true, consumer peering is active. */
  consumerPeeringActive?: boolean;
}

export const ConsumerConfig: Schema.Schema<ConsumerConfig> = Schema.suspend(() => Schema.Struct({
  producerNetwork: Schema.optional(Schema.String),
  consumerImportCustomRoutes: Schema.optional(Schema.Boolean),
  consumerExportCustomRoutes: Schema.optional(Schema.Boolean),
  producerImportCustomRoutes: Schema.optional(Schema.Boolean),
  producerExportCustomRoutes: Schema.optional(Schema.Boolean),
  consumerImportSubnetRoutesWithPublicIp: Schema.optional(Schema.Boolean),
  consumerExportSubnetRoutesWithPublicIp: Schema.optional(Schema.Boolean),
  producerImportSubnetRoutesWithPublicIp: Schema.optional(Schema.Boolean),
  producerExportSubnetRoutesWithPublicIp: Schema.optional(Schema.Boolean),
  reservedRanges: Schema.optional(Schema.Array(GoogleCloudServicenetworkingV1ConsumerConfigReservedRange)),
  vpcScReferenceArchitectureEnabled: Schema.optional(Schema.Boolean),
  usedIpRanges: Schema.optional(Schema.Array(Schema.String)),
  cloudsqlConfigs: Schema.optional(Schema.Array(CloudSQLConfig)),
  consumerPeeringActive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConsumerConfig" }) as any as Schema.Schema<ConsumerConfig>;

export interface UpdateConsumerConfigRequest {
  /** Required. The updated peering config. */
  consumerConfig?: ConsumerConfig;
}

export const UpdateConsumerConfigRequest: Schema.Schema<UpdateConsumerConfigRequest> = Schema.suspend(() => Schema.Struct({
  consumerConfig: Schema.optional(ConsumerConfig),
})).annotate({ identifier: "UpdateConsumerConfigRequest" }) as any as Schema.Schema<UpdateConsumerConfigRequest>;

export interface PolicyBinding {
  /** Required. Role to apply. Only allowlisted roles can be used at the specified granularity. The role must be one of the following: - 'roles/container.hostServiceAgentUser' applied on the shared VPC host project - 'roles/compute.securityAdmin' applied on the shared VPC host project - 'roles/compute.networkAdmin' applied on the shared VPC host project - 'roles/tpu.xpnAgent' applied on the shared VPC host project - 'roles/dns.admin' applied on the shared VPC host project - 'roles/logging.admin' applied on the shared VPC host project - 'roles/monitoring.viewer' applied on the shared VPC host project - 'roles/servicemanagement.quotaViewer' applied on the shared VPC host project */
  role?: string;
  /** Required. Member to bind the role with. See /iam/docs/reference/rest/v1/Policy#Binding for how to format each member. Eg. - user:myuser@mydomain.com - serviceAccount:my-service-account@app.gserviceaccount.com */
  member?: string;
}

export const PolicyBinding: Schema.Schema<PolicyBinding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  member: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyBinding" }) as any as Schema.Schema<PolicyBinding>;

export interface AddRolesRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is a project number, as in '12345' {network} is a network name. */
  consumerNetwork?: string;
  /** Required. List of policy bindings to add to shared VPC host project. */
  policyBinding?: Array<PolicyBinding>;
}

export const AddRolesRequest: Schema.Schema<AddRolesRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  policyBinding: Schema.optional(Schema.Array(PolicyBinding)),
})).annotate({ identifier: "AddRolesRequest" }) as any as Schema.Schema<AddRolesRequest>;

export interface AddDnsZoneRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. */
  consumerNetwork?: string;
  /** Required. The name for both the private zone in the shared producer host project and the peering zone in the consumer project. Must be unique within both projects. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes. */
  name?: string;
  /** Required. The DNS name suffix for the zones e.g. `example.com.`. Cloud DNS requires that a DNS suffix ends with a trailing dot. */
  dnsSuffix?: string;
}

export const AddDnsZoneRequest: Schema.Schema<AddDnsZoneRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  dnsSuffix: Schema.optional(Schema.String),
})).annotate({ identifier: "AddDnsZoneRequest" }) as any as Schema.Schema<AddDnsZoneRequest>;

export interface RemoveDnsZoneRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. */
  consumerNetwork?: string;
  /** Required. The name for both the private zone in the shared producer host project and the peering zone in the consumer project. */
  name?: string;
}

export const RemoveDnsZoneRequest: Schema.Schema<RemoveDnsZoneRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveDnsZoneRequest" }) as any as Schema.Schema<RemoveDnsZoneRequest>;

export interface DnsZone {
  /** User assigned name for this resource. Must be unique within the project. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes. */
  name?: string;
  /** The DNS name suffix of this zone e.g. `example.com.`. Cloud DNS requires that a DNS suffix ends with a trailing dot. */
  dnsSuffix?: string;
}

export const DnsZone: Schema.Schema<DnsZone> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dnsSuffix: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsZone" }) as any as Schema.Schema<DnsZone>;

export interface DnsZonePair {
  /** The private DNS zone in the shared producer host project. */
  producerPrivateZone?: DnsZone;
  /** The DNS peering zone in the consumer project. */
  consumerPeeringZone?: DnsZone;
}

export const DnsZonePair: Schema.Schema<DnsZonePair> = Schema.suspend(() => Schema.Struct({
  producerPrivateZone: Schema.optional(DnsZone),
  consumerPeeringZone: Schema.optional(DnsZone),
})).annotate({ identifier: "DnsZonePair" }) as any as Schema.Schema<DnsZonePair>;

export interface ListDnsZonesResponse {
  /** All pairs of private DNS zones in the shared producer host project and the matching peering zones in the consumer project.. */
  dnsZonePairs?: Array<DnsZonePair>;
}

export const ListDnsZonesResponse: Schema.Schema<ListDnsZonesResponse> = Schema.suspend(() => Schema.Struct({
  dnsZonePairs: Schema.optional(Schema.Array(DnsZonePair)),
})).annotate({ identifier: "ListDnsZonesResponse" }) as any as Schema.Schema<ListDnsZonesResponse>;

export interface GetDnsZoneResponse {
  /** The private DNS zone created in the shared producer host project. */
  producerPrivateZone?: DnsZone;
  /** The DNS peering zone created in the consumer project. */
  consumerPeeringZone?: DnsZone;
}

export const GetDnsZoneResponse: Schema.Schema<GetDnsZoneResponse> = Schema.suspend(() => Schema.Struct({
  producerPrivateZone: Schema.optional(DnsZone),
  consumerPeeringZone: Schema.optional(DnsZone),
})).annotate({ identifier: "GetDnsZoneResponse" }) as any as Schema.Schema<GetDnsZoneResponse>;

export interface DnsRecordSet {
  /** Required. The DNS or domain name of the record set, e.g. `test.example.com`. Cloud DNS requires that a DNS suffix ends with a trailing dot. */
  domain?: string;
  /** Required. The identifier of a supported record type. */
  type?: string;
  /** Required. The period of time for which this RecordSet can be cached by resolvers. */
  ttl?: string;
  /** Required. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) for examples see https://cloud.google.com/dns/records/json-record. */
  data?: Array<string>;
}

export const DnsRecordSet: Schema.Schema<DnsRecordSet> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DnsRecordSet" }) as any as Schema.Schema<DnsRecordSet>;

export interface AddDnsRecordSetRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. */
  consumerNetwork?: string;
  /** Required. The name of the private DNS zone in the shared producer host project to which the record set will be added. */
  zone?: string;
  /** Required. The DNS record set to add. */
  dnsRecordSet?: DnsRecordSet;
}

export const AddDnsRecordSetRequest: Schema.Schema<AddDnsRecordSetRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  dnsRecordSet: Schema.optional(DnsRecordSet),
})).annotate({ identifier: "AddDnsRecordSetRequest" }) as any as Schema.Schema<AddDnsRecordSetRequest>;

export interface RemoveDnsRecordSetRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. */
  consumerNetwork?: string;
  /** Required. The name of the private DNS zone in the shared producer host project from which the record set will be removed. */
  zone?: string;
  /** Required. The DNS record set to remove. */
  dnsRecordSet?: DnsRecordSet;
}

export const RemoveDnsRecordSetRequest: Schema.Schema<RemoveDnsRecordSetRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  dnsRecordSet: Schema.optional(DnsRecordSet),
})).annotate({ identifier: "RemoveDnsRecordSetRequest" }) as any as Schema.Schema<RemoveDnsRecordSetRequest>;

export interface UpdateDnsRecordSetRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. */
  consumerNetwork?: string;
  /** Required. The name of the private DNS zone in the shared producer host project from which the record set will be removed. */
  zone?: string;
  /** Required. The existing DNS record set to update. */
  existingDnsRecordSet?: DnsRecordSet;
  /** Required. The new values that the DNS record set should be updated to hold. */
  newDnsRecordSet?: DnsRecordSet;
}

export const UpdateDnsRecordSetRequest: Schema.Schema<UpdateDnsRecordSetRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  existingDnsRecordSet: Schema.optional(DnsRecordSet),
  newDnsRecordSet: Schema.optional(DnsRecordSet),
})).annotate({ identifier: "UpdateDnsRecordSetRequest" }) as any as Schema.Schema<UpdateDnsRecordSetRequest>;

export interface ListDnsRecordSetsResponse {
  /** DNS record Set Resource */
  dnsRecordSets?: Array<DnsRecordSet>;
}

export const ListDnsRecordSetsResponse: Schema.Schema<ListDnsRecordSetsResponse> = Schema.suspend(() => Schema.Struct({
  dnsRecordSets: Schema.optional(Schema.Array(DnsRecordSet)),
})).annotate({ identifier: "ListDnsRecordSetsResponse" }) as any as Schema.Schema<ListDnsRecordSetsResponse>;

export interface PeeredDnsDomain {
  /** Required. User assigned name for this resource. Must be unique within the consumer network. The name must be 1-63 characters long, must begin with a letter, end with a letter or digit, and only contain lowercase letters, digits or dashes. */
  name?: string;
  /** The DNS domain name suffix e.g. `example.com.`. Cloud DNS requires that a DNS suffix ends with a trailing dot. */
  dnsSuffix?: string;
}

export const PeeredDnsDomain: Schema.Schema<PeeredDnsDomain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dnsSuffix: Schema.optional(Schema.String),
})).annotate({ identifier: "PeeredDnsDomain" }) as any as Schema.Schema<PeeredDnsDomain>;

export interface ListPeeredDnsDomainsResponse {
  /** The list of peered DNS domains. */
  peeredDnsDomains?: Array<PeeredDnsDomain>;
}

export const ListPeeredDnsDomainsResponse: Schema.Schema<ListPeeredDnsDomainsResponse> = Schema.suspend(() => Schema.Struct({
  peeredDnsDomains: Schema.optional(Schema.Array(PeeredDnsDomain)),
})).annotate({ identifier: "ListPeeredDnsDomainsResponse" }) as any as Schema.Schema<ListPeeredDnsDomainsResponse>;

export interface Option {
  /** The option's name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`. */
  name?: string;
  /** The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type. */
  value?: Record<string, unknown>;
}

export const Option: Schema.Schema<Option> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Option" }) as any as Schema.Schema<Option>;

export interface Method {
  /** The simple name of this method. */
  name?: string;
  /** A URL of the input message type. */
  requestTypeUrl?: string;
  /** If true, the request is streamed. */
  requestStreaming?: boolean;
  /** The URL of the output message type. */
  responseTypeUrl?: string;
  /** If true, the response is streamed. */
  responseStreaming?: boolean;
  /** Any metadata attached to the method. */
  options?: Array<Option>;
  /** The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue. */
  edition?: string;
}

export const Method: Schema.Schema<Method> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  requestTypeUrl: Schema.optional(Schema.String),
  requestStreaming: Schema.optional(Schema.Boolean),
  responseTypeUrl: Schema.optional(Schema.String),
  responseStreaming: Schema.optional(Schema.Boolean),
  options: Schema.optional(Schema.Array(Option)),
  syntax: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "Method" }) as any as Schema.Schema<Method>;

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`. */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

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

export interface Api {
  /** The fully qualified name of this interface, including package name followed by the interface's simple name. */
  name?: string;
  /** The methods of this interface, in unspecified order. */
  methods?: Array<Method>;
  /** Any metadata attached to the interface. */
  options?: Array<Option>;
  /** A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces. */
  version?: string;
  /** Source context for the protocol buffer service represented by this message. */
  sourceContext?: SourceContext;
  /** Included interfaces. See Mixin. */
  mixins?: Array<Mixin>;
  /** The source syntax of the service. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Api: Schema.Schema<Api> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  methods: Schema.optional(Schema.Array(Method)),
  options: Schema.optional(Schema.Array(Option)),
  version: Schema.optional(Schema.String),
  sourceContext: Schema.optional(SourceContext),
  mixins: Schema.optional(Schema.Array(Mixin)),
  syntax: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface Field {
  /** The field type. */
  kind?: "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64" | (string & {});
  /** The field cardinality. */
  cardinality?: "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED" | (string & {});
  /** The field number. */
  number?: number;
  /** The field name. */
  name?: string;
  /** The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`. */
  typeUrl?: string;
  /** The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list. */
  oneofIndex?: number;
  /** Whether to use alternative packed wire representation. */
  packed?: boolean;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The field JSON name. */
  jsonName?: string;
  /** The string value of the default value of this field. Proto2 syntax only. */
  defaultValue?: string;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  cardinality: Schema.optional(Schema.String),
  number: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  typeUrl: Schema.optional(Schema.String),
  oneofIndex: Schema.optional(Schema.Number),
  packed: Schema.optional(Schema.Boolean),
  options: Schema.optional(Schema.Array(Option)),
  jsonName: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface Type {
  /** The fully qualified message name. */
  name?: string;
  /** The list of fields. */
  fields?: Array<Field>;
  /** The list of types appearing in `oneof` definitions in this type. */
  oneofs?: Array<string>;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Field)),
  oneofs: Schema.optional(Schema.Array(Schema.String)),
  options: Schema.optional(Schema.Array(Option)),
  sourceContext: Schema.optional(SourceContext),
  syntax: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

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

export interface Enum {
  /** Enum type name. */
  name?: string;
  /** Enum value definitions. */
  enumvalue?: Array<EnumValue>;
  /** Protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source syntax. */
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Enum: Schema.Schema<Enum> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enumvalue: Schema.optional(Schema.Array(EnumValue)),
  options: Schema.optional(Schema.Array(Option)),
  sourceContext: Schema.optional(SourceContext),
  syntax: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "Enum" }) as any as Schema.Schema<Enum>;

export interface Page {
  /** The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`. */
  name?: string;
  /** The Markdown content of the page. You can use ```(== include {path} ==)``` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page. */
  content?: string;
  /** Subpages of this page. The order of subpages specified here will be honored in the generated docset. */
  subpages?: Array<Page>;
}

export const Page: Schema.Schema<Page> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  subpages: Schema.optional(Schema.Array(Page)),
})).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface DocumentationRule {
  /** The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used. */
  selector?: string;
  /** Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element. */
  description?: string;
  /** Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`. */
  deprecationDescription?: string;
  /** String of comma or space separated case-sensitive words for which method/field name replacement will be disabled. */
  disableReplacementWords?: string;
}

export const DocumentationRule: Schema.Schema<DocumentationRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  deprecationDescription: Schema.optional(Schema.String),
  disableReplacementWords: Schema.optional(Schema.String),
})).annotate({ identifier: "DocumentationRule" }) as any as Schema.Schema<DocumentationRule>;

export interface Documentation {
  /** A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`. */
  summary?: string;
  /** The top level pages for the documentation set. */
  pages?: Array<Page>;
  /** A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<DocumentationRule>;
  /** The URL to the root of documentation. */
  documentationRootUrl?: string;
  /** Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to. */
  serviceRootUrl?: string;
  /** Declares a single overview page. For example: documentation: summary: ... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary: ... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field. */
  overview?: string;
  /** Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions. */
  additionalIamInfo?: string;
  /** Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries */
  sectionOverrides?: Array<Page>;
}

export const Documentation: Schema.Schema<Documentation> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(Schema.String),
  pages: Schema.optional(Schema.Array(Page)),
  rules: Schema.optional(Schema.Array(DocumentationRule)),
  documentationRootUrl: Schema.optional(Schema.String),
  serviceRootUrl: Schema.optional(Schema.String),
  overview: Schema.optional(Schema.String),
  additionalIamInfo: Schema.optional(Schema.String),
  sectionOverrides: Schema.optional(Schema.Array(Page)),
})).annotate({ identifier: "Documentation" }) as any as Schema.Schema<Documentation>;

export interface BackendRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version. */
  address?: string;
  /** The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment. */
  deadline?: number;
  /** Deprecated, do not use. */
  minDeadline?: number;
  /** The number of seconds to wait for the completion of a long running operation. The default is no deadline. */
  operationDeadline?: number;
  /** no-lint */
  pathTranslation?: "PATH_TRANSLATION_UNSPECIFIED" | "CONSTANT_ADDRESS" | "APPEND_PATH_TO_ADDRESS" | (string & {});
  /** The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend. */
  jwtAudience?: string;
  /** When disable_auth is true, a JWT ID token won't be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header. */
  disableAuth?: boolean;
  /** The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values. */
  protocol?: string;
  /** The map between request protocol and the backend address. */
  overridesByRequestProtocol?: Record<string, BackendRule>;
  /** The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin". */
  loadBalancingPolicy?: string;
}

export const BackendRule: Schema.Schema<BackendRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  deadline: Schema.optional(Schema.Number),
  minDeadline: Schema.optional(Schema.Number),
  operationDeadline: Schema.optional(Schema.Number),
  pathTranslation: Schema.optional(Schema.String),
  jwtAudience: Schema.optional(Schema.String),
  disableAuth: Schema.optional(Schema.Boolean),
  protocol: Schema.optional(Schema.String),
  overridesByRequestProtocol: Schema.optional(Schema.Record(Schema.String, BackendRule)),
  loadBalancingPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "BackendRule" }) as any as Schema.Schema<BackendRule>;

export interface Backend {
  /** A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<BackendRule>;
}

export const Backend: Schema.Schema<Backend> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(BackendRule)),
})).annotate({ identifier: "Backend" }) as any as Schema.Schema<Backend>;

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
  /** Maps to HTTP PUT. Used for replacing a resource. */
  put?: string;
  /** Maps to HTTP POST. Used for creating a resource or performing an action. */
  post?: string;
  /** Maps to HTTP DELETE. Used for deleting a resource. */
  delete?: string;
  /** Maps to HTTP PATCH. Used for updating a resource. */
  patch?: string;
  /** The custom pattern is used for specifying an HTTP method that is not included in the `pattern` field, such as HEAD, or "*" to leave the HTTP method unspecified for this rule. The wild-card rule is useful for services that provide content to Web (HTML) clients. */
  custom?: CustomHttpPattern;
  /** The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type. */
  body?: string;
  /** Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type. */
  responseBody?: string;
  /** Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep). */
  additionalBindings?: Array<HttpRule>;
}

export const HttpRule: Schema.Schema<HttpRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  get: Schema.optional(Schema.String),
  put: Schema.optional(Schema.String),
  post: Schema.optional(Schema.String),
  delete: Schema.optional(Schema.String),
  patch: Schema.optional(Schema.String),
  custom: Schema.optional(CustomHttpPattern),
  body: Schema.optional(Schema.String),
  responseBody: Schema.optional(Schema.String),
  additionalBindings: Schema.optional(Schema.Array(HttpRule)),
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

export interface QuotaLimit {
  /** Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters. */
  name?: string;
  /** Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`). */
  description?: string;
  /** Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only. */
  defaultLimit?: string;
  /** Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only. */
  maxLimit?: string;
  /** Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only. */
  freeTier?: string;
  /** Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only. */
  duration?: string;
  /** The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config. */
  metric?: string;
  /** Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax. */
  unit?: string;
  /** Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported. */
  values?: Record<string, string>;
  /** User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration. */
  displayName?: string;
}

export const QuotaLimit: Schema.Schema<QuotaLimit> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  defaultLimit: Schema.optional(Schema.String),
  maxLimit: Schema.optional(Schema.String),
  freeTier: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "QuotaLimit" }) as any as Schema.Schema<QuotaLimit>;

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

export interface OAuthRequirements {
  /** The list of publicly documented OAuth scopes that are allowed access. An OAuth token containing any of these scopes will be accepted. Example: canonical_scopes: https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.read */
  canonicalScopes?: string;
}

export const OAuthRequirements: Schema.Schema<OAuthRequirements> = Schema.suspend(() => Schema.Struct({
  canonicalScopes: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuthRequirements" }) as any as Schema.Schema<OAuthRequirements>;

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

export interface AuthenticationRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The requirements for OAuth credentials. */
  oauth?: OAuthRequirements;
  /** If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests. */
  allowWithoutCredential?: boolean;
  /** Requirements for additional authentication providers. */
  requirements?: Array<AuthRequirement>;
}

export const AuthenticationRule: Schema.Schema<AuthenticationRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  oauth: Schema.optional(OAuthRequirements),
  allowWithoutCredential: Schema.optional(Schema.Boolean),
  requirements: Schema.optional(Schema.Array(AuthRequirement)),
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
  /** The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth". */
  id?: string;
  /** Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com */
  issuer?: string;
  /** URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs */
  jwksUri?: string;
  /** The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
  /** Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec. */
  authorizationUrl?: string;
  /** Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token */
  jwtLocations?: Array<JwtLocation>;
}

export const AuthProvider: Schema.Schema<AuthProvider> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  jwksUri: Schema.optional(Schema.String),
  audiences: Schema.optional(Schema.String),
  authorizationUrl: Schema.optional(Schema.String),
  jwtLocations: Schema.optional(Schema.Array(JwtLocation)),
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

export interface ContextRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** A list of full type names of requested contexts, only the requested context will be made available to the backend. */
  requested?: Array<string>;
  /** A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension. */
  provided?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend. */
  allowedRequestExtensions?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client. */
  allowedResponseExtensions?: Array<string>;
}

export const ContextRule: Schema.Schema<ContextRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  requested: Schema.optional(Schema.Array(Schema.String)),
  provided: Schema.optional(Schema.Array(Schema.String)),
  allowedRequestExtensions: Schema.optional(Schema.Array(Schema.String)),
  allowedResponseExtensions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContextRule" }) as any as Schema.Schema<ContextRule>;

export interface Context {
  /** A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<ContextRule>;
}

export const Context: Schema.Schema<Context> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(ContextRule)),
})).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

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

export interface Endpoint {
  /** The canonical name of this endpoint. */
  name?: string;
  /** Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints. */
  aliases?: Array<string>;
  /** The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com". */
  target?: string;
  /** Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed. */
  allowCors?: boolean;
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  aliases: Schema.optional(Schema.Array(Schema.String)),
  target: Schema.optional(Schema.String),
  allowCors: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

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

export interface LogDescriptor {
  /** The name of the log. It must be less than 512 characters long and can include the following characters: upper- and lower-case alphanumeric characters [A-Za-z0-9], and punctuation characters including slash, underscore, hyphen, period [/_-.]. */
  name?: string;
  /** The set of labels that are available to describe a specific log entry. Runtime requests that contain labels not specified here are considered invalid. */
  labels?: Array<LabelDescriptor>;
  /** A human-readable description of this log. This information appears in the documentation and can contain details. */
  description?: string;
  /** The human-readable name for this log. This information appears on the user interface and should be concise. */
  displayName?: string;
}

export const LogDescriptor: Schema.Schema<LogDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "LogDescriptor" }) as any as Schema.Schema<LogDescriptor>;

export interface MetricDescriptorMetadata {
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<"TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED" | "PROJECT" | "ORGANIZATION" | "FOLDER" | (string & {})>;
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> = Schema.suspend(() => Schema.Struct({
  launchStage: Schema.optional(Schema.String),
  samplePeriod: Schema.optional(Schema.String),
  ingestDelay: Schema.optional(Schema.String),
  timeSeriesResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MetricDescriptorMetadata" }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface MetricDescriptor {
  /** The resource name of the metric descriptor. */
  name?: string;
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent"). */
  unit?: string;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** Optional. The launch stage of the metric definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  metricKind: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(MetricDescriptorMetadata),
  launchStage: Schema.optional(Schema.String),
  monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MetricDescriptor" }) as any as Schema.Schema<MetricDescriptor>;

export interface MonitoredResourceDescriptor {
  /** Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`. */
  name?: string;
  /** Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`. */
  displayName?: string;
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`. */
  labels?: Array<LabelDescriptor>;
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoredResourceDescriptor" }) as any as Schema.Schema<MonitoredResourceDescriptor>;

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

export interface LoggingDestination {
  /** The monitored resource type. The type must be defined in the Service.monitored_resources section. */
  monitoredResource?: string;
  /** Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/". */
  logs?: Array<string>;
}

export const LoggingDestination: Schema.Schema<LoggingDestination> = Schema.suspend(() => Schema.Struct({
  monitoredResource: Schema.optional(Schema.String),
  logs: Schema.optional(Schema.Array(Schema.String)),
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
  /** Monitoring configurations for sending metrics to the producer project. There can be multiple producer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  producerDestinations?: Array<MonitoringDestination>;
  /** Monitoring configurations for sending metrics to the consumer project. There can be multiple consumer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  consumerDestinations?: Array<MonitoringDestination>;
}

export const Monitoring: Schema.Schema<Monitoring> = Schema.suspend(() => Schema.Struct({
  producerDestinations: Schema.optional(Schema.Array(MonitoringDestination)),
  consumerDestinations: Schema.optional(Schema.Array(MonitoringDestination)),
})).annotate({ identifier: "Monitoring" }) as any as Schema.Schema<Monitoring>;

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
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
  /** Define parameters. Multiple names may be defined for a parameter. For a given method call, only one of them should be used. If multiple names are used the behavior is implementation-dependent. If none of the specified names are present the behavior is parameter-dependent. */
  parameters?: Array<SystemParameter>;
}

export const SystemParameterRule: Schema.Schema<SystemParameterRule> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(SystemParameter)),
})).annotate({ identifier: "SystemParameterRule" }) as any as Schema.Schema<SystemParameterRule>;

export interface SystemParameters {
  /** Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<SystemParameterRule>;
}

export const SystemParameters: Schema.Schema<SystemParameters> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(SystemParameterRule)),
})).annotate({ identifier: "SystemParameters" }) as any as Schema.Schema<SystemParameters>;

export interface SourceInfo {
  /** All files used during config generation. */
  sourceFiles?: Array<Record<string, unknown>>;
}

export const SourceInfo: Schema.Schema<SourceInfo> = Schema.suspend(() => Schema.Struct({
  sourceFiles: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "SourceInfo" }) as any as Schema.Schema<SourceInfo>;

export interface LongRunning {
  /** Initial delay after which the first poll request will be made. Default value: 5 seconds. */
  initialPollDelay?: string;
  /** Multiplier to gradually increase delay between subsequent polls until it reaches max_poll_delay. Default value: 1.5. */
  pollDelayMultiplier?: number;
  /** Maximum time between two subsequent poll requests. Default value: 45 seconds. */
  maxPollDelay?: string;
  /** Total polling timeout. Default value: 5 minutes. */
  totalPollTimeout?: string;
}

export const LongRunning: Schema.Schema<LongRunning> = Schema.suspend(() => Schema.Struct({
  initialPollDelay: Schema.optional(Schema.String),
  pollDelayMultiplier: Schema.optional(Schema.Number),
  maxPollDelay: Schema.optional(Schema.String),
  totalPollTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "LongRunning" }) as any as Schema.Schema<LongRunning>;

export interface BatchingSettingsProto {
  /** The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent. */
  elementCountThreshold?: number;
  /** The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message. */
  requestByteThreshold?: string;
  /** The duration after which a batch should be sent, starting from the addition of the first message to that batch. */
  delayThreshold?: string;
  /** The maximum number of elements collected in a batch that could be accepted by server. */
  elementCountLimit?: number;
  /** The maximum size of the request that could be accepted by server. */
  requestByteLimit?: number;
  /** The maximum number of elements allowed by flow control. */
  flowControlElementLimit?: number;
  /** The maximum size of data allowed by flow control. */
  flowControlByteLimit?: number;
  /** The behavior to take when the flow control limit is exceeded. */
  flowControlLimitExceededBehavior?: "UNSET_BEHAVIOR" | "THROW_EXCEPTION" | "BLOCK" | "IGNORE" | (string & {});
}

export const BatchingSettingsProto: Schema.Schema<BatchingSettingsProto> = Schema.suspend(() => Schema.Struct({
  elementCountThreshold: Schema.optional(Schema.Number),
  requestByteThreshold: Schema.optional(Schema.String),
  delayThreshold: Schema.optional(Schema.String),
  elementCountLimit: Schema.optional(Schema.Number),
  requestByteLimit: Schema.optional(Schema.Number),
  flowControlElementLimit: Schema.optional(Schema.Number),
  flowControlByteLimit: Schema.optional(Schema.Number),
  flowControlLimitExceededBehavior: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchingSettingsProto" }) as any as Schema.Schema<BatchingSettingsProto>;

export interface BatchingDescriptorProto {
  /** The repeated field in the request message to be aggregated by batching. */
  batchedField?: string;
  /** A list of the fields in the request message. Two requests will be batched together only if the values of every field specified in `request_discriminator_fields` is equal between the two requests. */
  discriminatorFields?: Array<string>;
  /** Optional. When present, indicates the field in the response message to be used to demultiplex the response into multiple response messages, in correspondence with the multiple request messages originally batched together. */
  subresponseField?: string;
}

export const BatchingDescriptorProto: Schema.Schema<BatchingDescriptorProto> = Schema.suspend(() => Schema.Struct({
  batchedField: Schema.optional(Schema.String),
  discriminatorFields: Schema.optional(Schema.Array(Schema.String)),
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

export interface MethodSettings {
  /** The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder... */
  selector?: string;
  /** Describes settings to use for long-running operations when generating API methods for RPCs. Complements RPCs that use the annotations in google/longrunning/operations.proto. Example of a YAML configuration:: publishing: method_settings: - selector: google.cloud.speech.v2.Speech.BatchRecognize long_running: initial_poll_delay: 60s # 1 minute poll_delay_multiplier: 1.5 max_poll_delay: 360s # 6 minutes total_poll_timeout: 54000s # 90 minutes */
  longRunning?: LongRunning;
  /** List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id */
  autoPopulatedFields?: Array<string>;
  /** Batching configuration for an API method in client libraries. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.BatchCreateExample batching: element_count_threshold: 1000 request_byte_threshold: 100000000 delay_threshold_millis: 10 */
  batching?: BatchingConfigProto;
}

export const MethodSettings: Schema.Schema<MethodSettings> = Schema.suspend(() => Schema.Struct({
  selector: Schema.optional(Schema.String),
  longRunning: Schema.optional(LongRunning),
  autoPopulatedFields: Schema.optional(Schema.Array(Schema.String)),
  batching: Schema.optional(BatchingConfigProto),
})).annotate({ identifier: "MethodSettings" }) as any as Schema.Schema<MethodSettings>;

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
  /** Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest */
  referenceDocsUri?: string;
  /** The destination where API teams want this client library to be published. */
  destinations?: Array<"CLIENT_LIBRARY_DESTINATION_UNSPECIFIED" | "GITHUB" | "PACKAGE_MANAGER" | (string & {})>;
  /** Configuration for which RPCs should be generated in the GAPIC client. */
  selectiveGapicGeneration?: SelectiveGapicGeneration;
}

export const CommonLanguageSettings: Schema.Schema<CommonLanguageSettings> = Schema.suspend(() => Schema.Struct({
  referenceDocsUri: Schema.optional(Schema.String),
  destinations: Schema.optional(Schema.Array(Schema.String)),
  selectiveGapicGeneration: Schema.optional(SelectiveGapicGeneration),
})).annotate({ identifier: "CommonLanguageSettings" }) as any as Schema.Schema<CommonLanguageSettings>;

export interface JavaSettings {
  /** The package name to use in Java. Clobbers the java_package option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.java.package_name" field in gapic.yaml. API teams should use the protobuf java_package option where possible. Example of a YAML configuration:: publishing: library_settings: java_settings: library_package: com.google.cloud.pubsub.v1 */
  libraryPackage?: string;
  /** Configure the Java class name to use instead of the service's for its corresponding generated GAPIC client. Keys are fully-qualified service names as they appear in the protobuf (including the full the language_settings.java.interface_names" field in gapic.yaml. API teams should otherwise use the service name as it appears in the protobuf. Example of a YAML configuration:: publishing: java_settings: service_class_names: - google.pubsub.v1.Publisher: TopicAdmin - google.pubsub.v1.Subscriber: SubscriptionAdmin */
  serviceClassNames?: Record<string, string>;
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const JavaSettings: Schema.Schema<JavaSettings> = Schema.suspend(() => Schema.Struct({
  libraryPackage: Schema.optional(Schema.String),
  serviceClassNames: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "JavaSettings" }) as any as Schema.Schema<JavaSettings>;

export interface CppSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const CppSettings: Schema.Schema<CppSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "CppSettings" }) as any as Schema.Schema<CppSettings>;

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

export interface NodeSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const NodeSettings: Schema.Schema<NodeSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "NodeSettings" }) as any as Schema.Schema<NodeSettings>;

export interface DotnetSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi. */
  renamedServices?: Record<string, string>;
  /** Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset" */
  renamedResources?: Record<string, string>;
  /** List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location" */
  ignoredResources?: Array<string>;
  /** Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision */
  forcedNamespaceAliases?: Array<string>;
  /** Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn't be generated. Snippets *calling* these methods are still generated, however. */
  handwrittenSignatures?: Array<string>;
}

export const DotnetSettings: Schema.Schema<DotnetSettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
  renamedServices: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  renamedResources: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  ignoredResources: Schema.optional(Schema.Array(Schema.String)),
  forcedNamespaceAliases: Schema.optional(Schema.Array(Schema.String)),
  handwrittenSignatures: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DotnetSettings" }) as any as Schema.Schema<DotnetSettings>;

export interface RubySettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const RubySettings: Schema.Schema<RubySettings> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(CommonLanguageSettings),
})).annotate({ identifier: "RubySettings" }) as any as Schema.Schema<RubySettings>;

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

export interface ClientLibrarySettings {
  /** Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1". */
  version?: string;
  /** Launch stage of this version of the API. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** When using transport=rest, the client request will encode enums as numbers rather than strings. */
  restNumericEnums?: boolean;
  /** Settings for legacy Java features, supported in the Service YAML. */
  javaSettings?: JavaSettings;
  /** Settings for C++ client libraries. */
  cppSettings?: CppSettings;
  /** Settings for PHP client libraries. */
  phpSettings?: PhpSettings;
  /** Settings for Python client libraries. */
  pythonSettings?: PythonSettings;
  /** Settings for Node client libraries. */
  nodeSettings?: NodeSettings;
  /** Settings for .NET client libraries. */
  dotnetSettings?: DotnetSettings;
  /** Settings for Ruby client libraries. */
  rubySettings?: RubySettings;
  /** Settings for Go client libraries. */
  goSettings?: GoSettings;
}

export const ClientLibrarySettings: Schema.Schema<ClientLibrarySettings> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  launchStage: Schema.optional(Schema.String),
  restNumericEnums: Schema.optional(Schema.Boolean),
  javaSettings: Schema.optional(JavaSettings),
  cppSettings: Schema.optional(CppSettings),
  phpSettings: Schema.optional(PhpSettings),
  pythonSettings: Schema.optional(PythonSettings),
  nodeSettings: Schema.optional(NodeSettings),
  dotnetSettings: Schema.optional(DotnetSettings),
  rubySettings: Schema.optional(RubySettings),
  goSettings: Schema.optional(GoSettings),
})).annotate({ identifier: "ClientLibrarySettings" }) as any as Schema.Schema<ClientLibrarySettings>;

export interface Publishing {
  /** A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern. */
  methodSettings?: Array<MethodSettings>;
  /** Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103 */
  newIssueUri?: string;
  /** Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview */
  documentationUri?: string;
  /** Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech". */
  apiShortName?: string;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  githubLabel?: string;
  /** GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API. */
  codeownerGithubTeams?: Array<string>;
  /** A prefix used in sample code when demarking regions to be included in documentation. */
  docTagPrefix?: string;
  /** For whom the client library is being published. */
  organization?: "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED" | "CLOUD" | "ADS" | "PHOTOS" | "STREET_VIEW" | "SHOPPING" | "GEO" | "GENERATIVE_AI" | (string & {});
  /** Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded. */
  librarySettings?: Array<ClientLibrarySettings>;
  /** Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc */
  protoReferenceDocumentationUri?: string;
  /** Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest */
  restReferenceDocumentationUri?: string;
}

export const Publishing: Schema.Schema<Publishing> = Schema.suspend(() => Schema.Struct({
  methodSettings: Schema.optional(Schema.Array(MethodSettings)),
  newIssueUri: Schema.optional(Schema.String),
  documentationUri: Schema.optional(Schema.String),
  apiShortName: Schema.optional(Schema.String),
  githubLabel: Schema.optional(Schema.String),
  codeownerGithubTeams: Schema.optional(Schema.Array(Schema.String)),
  docTagPrefix: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  librarySettings: Schema.optional(Schema.Array(ClientLibrarySettings)),
  protoReferenceDocumentationUri: Schema.optional(Schema.String),
  restReferenceDocumentationUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Publishing" }) as any as Schema.Schema<Publishing>;

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

export interface Service {
  /** The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name. */
  name?: string;
  /** The product title for this service, it is the name displayed in Google Cloud Console. */
  title?: string;
  /** The Google project that owns this service. */
  producerProjectId?: string;
  /** A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead. */
  id?: string;
  /** A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files. */
  apis?: Array<Api>;
  /** A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32 */
  types?: Array<Type>;
  /** A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum */
  enums?: Array<Enum>;
  /** Additional API documentation. */
  documentation?: Documentation;
  /** API backend configuration. */
  backend?: Backend;
  /** HTTP configuration. */
  http?: Http;
  /** Quota configuration. */
  quota?: Quota;
  /** Auth configuration. */
  authentication?: Authentication;
  /** Context configuration. */
  context?: Context;
  /** Configuration controlling usage of this service. */
  usage?: Usage;
  /** Custom error configuration. */
  customError?: CustomError;
  /** Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs. WARNING: Defining any entries in the `endpoints` list disables the automatic generation of default endpoint variations (e.g., `{service}.clients6.google.com`, `content-{service}.googleapis.com`, and mTLS variants like `{service}.mtls.googleapis.com`). To retain these default variations, you are required to explicitly include your main service endpoint (e.g., `myservice.googleapis.com`) in this list alongside any other custom endpoints (like REP, GFE, etc.). */
  endpoints?: Array<Endpoint>;
  /** Configuration for the service control plane. */
  control?: Control;
  /** Defines the logs used by this service. */
  logs?: Array<LogDescriptor>;
  /** Defines the metrics used by this service. */
  metrics?: Array<MetricDescriptor>;
  /** Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations. */
  monitoredResources?: Array<MonitoredResourceDescriptor>;
  /** Billing configuration. */
  billing?: Billing;
  /** Logging configuration. */
  logging?: Logging;
  /** Monitoring configuration. */
  monitoring?: Monitoring;
  /** System parameter configuration. */
  systemParameters?: SystemParameters;
  /** Output only. The source information for this configuration if available. */
  sourceInfo?: SourceInfo;
  /** Settings for [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from APIs defined as protocol buffers. */
  publishing?: Publishing;
  /** A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF. */
  systemTypes?: Array<Type>;
  /** Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners. */
  aspects?: Array<Aspect>;
  /** Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`. */
  configVersion?: number;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  producerProjectId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  apis: Schema.optional(Schema.Array(Api)),
  types: Schema.optional(Schema.Array(Type)),
  enums: Schema.optional(Schema.Array(Enum)),
  documentation: Schema.optional(Documentation),
  backend: Schema.optional(Backend),
  http: Schema.optional(Http),
  quota: Schema.optional(Quota),
  authentication: Schema.optional(Authentication),
  context: Schema.optional(Context),
  usage: Schema.optional(Usage),
  customError: Schema.optional(CustomError),
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  control: Schema.optional(Control),
  logs: Schema.optional(Schema.Array(LogDescriptor)),
  metrics: Schema.optional(Schema.Array(MetricDescriptor)),
  monitoredResources: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  billing: Schema.optional(Billing),
  logging: Schema.optional(Logging),
  monitoring: Schema.optional(Monitoring),
  systemParameters: Schema.optional(SystemParameters),
  sourceInfo: Schema.optional(SourceInfo),
  publishing: Schema.optional(Publishing),
  systemTypes: Schema.optional(Schema.Array(Type)),
  aspects: Schema.optional(Schema.Array(Aspect)),
  configVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface GoogleCloudServicenetworkingV1betaConnection {
  /** The name of service consumer's VPC network that's connected with service producer network, in the following format: `projects/{project}/global/networks/{network}`. `{project}` is a project number, such as in `12345` that includes the VPC service consumer's VPC network. `{network}` is the name of the service consumer's VPC network. */
  network?: string;
  /** The name of one or more allocated IP address ranges for this service producer of type `PEERING`. Note that invoking this method with a different range when connection is already established will not modify already provisioned service producer subnetworks. */
  reservedPeeringRanges?: Array<string>;
  /** Output only. The name of the VPC Network Peering connection that was created by the service producer. */
  peering?: string;
  /** Output only. The name of the peering service that's associated with this connection, in the following format: `services/{service name}`. */
  service?: string;
}

export const GoogleCloudServicenetworkingV1betaConnection: Schema.Schema<GoogleCloudServicenetworkingV1betaConnection> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  reservedPeeringRanges: Schema.optional(Schema.Array(Schema.String)),
  peering: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudServicenetworkingV1betaConnection" }) as any as Schema.Schema<GoogleCloudServicenetworkingV1betaConnection>;

export interface GoogleCloudServicenetworkingV1betaSubnetwork {
  /** Subnetwork name. See https://cloud.google.com/compute/docs/vpc/ */
  name?: string;
  /** Subnetwork CIDR range in `10.x.x.x/y` format. */
  ipCidrRange?: string;
  /** In the Shared VPC host project, the VPC network that's peered with the consumer network. For example: `projects/1234321/global/networks/host-network` */
  network?: string;
  /** This is a discovered subnet that is not within the current consumer allocated ranges. */
  outsideAllocation?: boolean;
}

export const GoogleCloudServicenetworkingV1betaSubnetwork: Schema.Schema<GoogleCloudServicenetworkingV1betaSubnetwork> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  outsideAllocation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudServicenetworkingV1betaSubnetwork" }) as any as Schema.Schema<GoogleCloudServicenetworkingV1betaSubnetwork>;

export interface Range {
  /** CIDR range in "10.x.x.x/y" format that is within the allocated ranges and currently unused. */
  ipCidrRange?: string;
  /** In the Shared VPC host project, the VPC network that's peered with the consumer network. For example: `projects/1234321/global/networks/host-network` */
  network?: string;
}

export const Range: Schema.Schema<Range> = Schema.suspend(() => Schema.Struct({
  ipCidrRange: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "Range" }) as any as Schema.Schema<Range>;

export interface Route {
  /** Route name. See https://cloud.google.com/vpc/docs/routes */
  name?: string;
  /** Fully-qualified URL of the VPC network in the producer host tenant project that this route applies to. For example: `projects/123456/global/networks/host-network` */
  network?: string;
  /** Destination CIDR range that this route applies to. */
  destRange?: string;
  /** Fully-qualified URL of the gateway that should handle matching packets that this route applies to. For example: `projects/123456/global/gateways/default-internet-gateway` */
  nextHopGateway?: string;
}

export const Route: Schema.Schema<Route> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  destRange: Schema.optional(Schema.String),
  nextHopGateway: Schema.optional(Schema.String),
})).annotate({ identifier: "Route" }) as any as Schema.Schema<Route>;

export interface AddRolesResponse {
  /** Required. List of policy bindings that were added to the shared VPC host project. */
  policyBinding?: Array<PolicyBinding>;
}

export const AddRolesResponse: Schema.Schema<AddRolesResponse> = Schema.suspend(() => Schema.Struct({
  policyBinding: Schema.optional(Schema.Array(PolicyBinding)),
})).annotate({ identifier: "AddRolesResponse" }) as any as Schema.Schema<AddRolesResponse>;

export interface AddRolesMetadata {
}

export const AddRolesMetadata: Schema.Schema<AddRolesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddRolesMetadata" }) as any as Schema.Schema<AddRolesMetadata>;

export interface AddDnsZoneResponse {
  /** The private DNS zone created in the shared producer host project. */
  producerPrivateZone?: DnsZone;
  /** The DNS peering zone created in the consumer project. */
  consumerPeeringZone?: DnsZone;
}

export const AddDnsZoneResponse: Schema.Schema<AddDnsZoneResponse> = Schema.suspend(() => Schema.Struct({
  producerPrivateZone: Schema.optional(DnsZone),
  consumerPeeringZone: Schema.optional(DnsZone),
})).annotate({ identifier: "AddDnsZoneResponse" }) as any as Schema.Schema<AddDnsZoneResponse>;

export interface AddDnsZoneMetadata {
}

export const AddDnsZoneMetadata: Schema.Schema<AddDnsZoneMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddDnsZoneMetadata" }) as any as Schema.Schema<AddDnsZoneMetadata>;

export interface RemoveDnsZoneResponse {
}

export const RemoveDnsZoneResponse: Schema.Schema<RemoveDnsZoneResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveDnsZoneResponse" }) as any as Schema.Schema<RemoveDnsZoneResponse>;

export interface RemoveDnsZoneMetadata {
}

export const RemoveDnsZoneMetadata: Schema.Schema<RemoveDnsZoneMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveDnsZoneMetadata" }) as any as Schema.Schema<RemoveDnsZoneMetadata>;

export interface AddDnsRecordSetMetadata {
}

export const AddDnsRecordSetMetadata: Schema.Schema<AddDnsRecordSetMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddDnsRecordSetMetadata" }) as any as Schema.Schema<AddDnsRecordSetMetadata>;

export interface RemoveDnsRecordSetResponse {
}

export const RemoveDnsRecordSetResponse: Schema.Schema<RemoveDnsRecordSetResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveDnsRecordSetResponse" }) as any as Schema.Schema<RemoveDnsRecordSetResponse>;

export interface RemoveDnsRecordSetMetadata {
}

export const RemoveDnsRecordSetMetadata: Schema.Schema<RemoveDnsRecordSetMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveDnsRecordSetMetadata" }) as any as Schema.Schema<RemoveDnsRecordSetMetadata>;

export interface UpdateDnsRecordSetMetadata {
}

export const UpdateDnsRecordSetMetadata: Schema.Schema<UpdateDnsRecordSetMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateDnsRecordSetMetadata" }) as any as Schema.Schema<UpdateDnsRecordSetMetadata>;

export interface PeeredDnsDomainMetadata {
}

export const PeeredDnsDomainMetadata: Schema.Schema<PeeredDnsDomainMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PeeredDnsDomainMetadata" }) as any as Schema.Schema<PeeredDnsDomainMetadata>;

export interface DeletePeeredDnsDomainMetadata {
}

export const DeletePeeredDnsDomainMetadata: Schema.Schema<DeletePeeredDnsDomainMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeletePeeredDnsDomainMetadata" }) as any as Schema.Schema<DeletePeeredDnsDomainMetadata>;

export interface ConsumerConfigMetadata {
}

export const ConsumerConfigMetadata: Schema.Schema<ConsumerConfigMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ConsumerConfigMetadata" }) as any as Schema.Schema<ConsumerConfigMetadata>;

export interface DeleteConnectionMetadata {
}

export const DeleteConnectionMetadata: Schema.Schema<DeleteConnectionMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteConnectionMetadata" }) as any as Schema.Schema<DeleteConnectionMetadata>;

export interface PartialDeleteConnectionMetadata {
}

export const PartialDeleteConnectionMetadata: Schema.Schema<PartialDeleteConnectionMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PartialDeleteConnectionMetadata" }) as any as Schema.Schema<PartialDeleteConnectionMetadata>;

export interface CleanupConnectionMetadata {
}

export const CleanupConnectionMetadata: Schema.Schema<CleanupConnectionMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CleanupConnectionMetadata" }) as any as Schema.Schema<CleanupConnectionMetadata>;

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

/** Disables VPC service controls for a connection. */
export interface DisableVpcServiceControlsServicesRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: DisableVpcServiceControlsRequest;
}

export const DisableVpcServiceControlsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DisableVpcServiceControlsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/services/{servicesId}:disableVpcServiceControls", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableVpcServiceControlsServicesRequest>;

export type DisableVpcServiceControlsServicesResponse = Operation;
export const DisableVpcServiceControlsServicesResponse = Operation;

export type DisableVpcServiceControlsServicesError = CommonErrors;

export const disableVpcServiceControlsServices: API.OperationMethod<DisableVpcServiceControlsServicesRequest, DisableVpcServiceControlsServicesResponse, DisableVpcServiceControlsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableVpcServiceControlsServicesRequest,
  output: DisableVpcServiceControlsServicesResponse,
  errors: [],
}));

/** Enables VPC service controls for a connection. */
export interface EnableVpcServiceControlsServicesRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: EnableVpcServiceControlsRequest;
}

export const EnableVpcServiceControlsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EnableVpcServiceControlsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/services/{servicesId}:enableVpcServiceControls", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableVpcServiceControlsServicesRequest>;

export type EnableVpcServiceControlsServicesResponse = Operation;
export const EnableVpcServiceControlsServicesResponse = Operation;

export type EnableVpcServiceControlsServicesError = CommonErrors;

export const enableVpcServiceControlsServices: API.OperationMethod<EnableVpcServiceControlsServicesRequest, EnableVpcServiceControlsServicesResponse, EnableVpcServiceControlsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableVpcServiceControlsServicesRequest,
  output: EnableVpcServiceControlsServicesResponse,
  errors: [],
}));

/** For service producers, provisions a new subnet in a peered service's shared VPC network in the requested region and with the requested size that's expressed as a CIDR range (number of leading bits of ipV4 network mask). The method checks against the assigned allocated ranges to find a non-conflicting IP address range. The method will reuse a subnet if subsequent calls contain the same subnet name, region, and prefix length. This method will make producer's tenant project to be a shared VPC service project as needed. */
export interface AddSubnetworkServicesRequest {
  /** Required. A tenant project in the service producer organization, in the following format: services/{service}/{collection-id}/{resource-id}. {collection-id} is the cloud resource collection type that represents the tenant project. Only `projects` are supported. {resource-id} is the tenant project numeric id, such as `123456`. {service} the name of the peering service, such as `service-peering.example.com`. This service must already be enabled in the service consumer's project. */
  parent: string;
  /** Request body */
  body?: AddSubnetworkRequest;
}

export const AddSubnetworkServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddSubnetworkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/{servicesId1}/{servicesId2}:addSubnetwork", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddSubnetworkServicesRequest>;

export type AddSubnetworkServicesResponse = Operation;
export const AddSubnetworkServicesResponse = Operation;

export type AddSubnetworkServicesError = CommonErrors;

export const addSubnetworkServices: API.OperationMethod<AddSubnetworkServicesRequest, AddSubnetworkServicesResponse, AddSubnetworkServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddSubnetworkServicesRequest,
  output: AddSubnetworkServicesResponse,
  errors: [],
}));

/** Service producers can use this method to find a currently unused range within consumer allocated ranges. This returned range is not reserved, and not guaranteed to remain unused. It will validate previously provided allocated ranges, find non-conflicting sub-range of requested size (expressed in number of leading bits of ipv4 network mask, as in CIDR range notation). */
export interface SearchRangeServicesRequest {
  /** Required. This is in a form services/{service}. {service} the name of the private access management service, for example 'service-peering.example.com'. */
  parent: string;
  /** Request body */
  body?: SearchRangeRequest;
}

export const SearchRangeServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SearchRangeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}:searchRange", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchRangeServicesRequest>;

export type SearchRangeServicesResponse = Operation;
export const SearchRangeServicesResponse = Operation;

export type SearchRangeServicesError = CommonErrors;

export const searchRangeServices: API.OperationMethod<SearchRangeServicesRequest, SearchRangeServicesResponse, SearchRangeServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchRangeServicesRequest,
  output: SearchRangeServicesResponse,
  errors: [],
}));

/** Service producers use this method to validate if the consumer provided network, project and requested range are valid. This allows them to use a fail-fast mechanism for consumer requests, and not have to wait for AddSubnetwork operation completion to determine if user request is invalid. */
export interface ValidateServicesRequest {
  /** Required. This is in a form services/{service} where {service} is the name of the private access management service. For example 'service-peering.example.com'. */
  parent: string;
  /** Request body */
  body?: ValidateConsumerConfigRequest;
}

export const ValidateServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ValidateConsumerConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateServicesRequest>;

export type ValidateServicesResponse = ValidateConsumerConfigResponse;
export const ValidateServicesResponse = ValidateConsumerConfigResponse;

export type ValidateServicesError = CommonErrors;

export const validateServices: API.OperationMethod<ValidateServicesRequest, ValidateServicesResponse, ValidateServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateServicesRequest,
  output: ValidateServicesResponse,
  errors: [],
}));

/** List the private connections that are configured in a service consumer's VPC network. */
export interface ListServicesConnectionsRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. If you specify `services/-` as the parameter value, all configured peering services are listed. */
  parent: string;
  /** Required. The name of service consumer's VPC network that's connected with service producer network through a private connection. The network name must be in the following format: `projects/{project}/global/networks/{network}`. {project} is a project number, such as in `12345` that includes the VPC service consumer's VPC network. {network} is the name of the service consumer's VPC network. */
  network?: string;
}

export const ListServicesConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  network: Schema.optional(Schema.String).pipe(T.HttpQuery("network")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/connections" }),
  svc,
) as unknown as Schema.Schema<ListServicesConnectionsRequest>;

export type ListServicesConnectionsResponse = ListConnectionsResponse;
export const ListServicesConnectionsResponse = ListConnectionsResponse;

export type ListServicesConnectionsError = CommonErrors;

export const listServicesConnections: API.OperationMethod<ListServicesConnectionsRequest, ListServicesConnectionsResponse, ListServicesConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListServicesConnectionsRequest,
  output: ListServicesConnectionsResponse,
  errors: [],
}));

/** Creates a private connection that establishes a VPC Network Peering connection to a VPC network in the service producer's organization. The administrator of the service consumer's VPC network invokes this method. The administrator must assign one or more allocated IP ranges for provisioning subnetworks in the service producer's VPC network. This connection is used for all supported services in the service producer's organization, so it only needs to be invoked once. */
export interface CreateServicesConnectionsRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: Connection;
}

export const CreateServicesConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Connection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/connections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesConnectionsRequest>;

export type CreateServicesConnectionsResponse = Operation;
export const CreateServicesConnectionsResponse = Operation;

export type CreateServicesConnectionsError = CommonErrors;

export const createServicesConnections: API.OperationMethod<CreateServicesConnectionsRequest, CreateServicesConnectionsResponse, CreateServicesConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesConnectionsRequest,
  output: CreateServicesConnectionsResponse,
  errors: [],
}));

/** Deletes a private service access connection. */
export interface DeleteConnectionServicesConnectionsRequest {
  /** Required. The private service connection that connects to a service producer organization. The name includes both the private service name and the VPC network peering name in the format of `services/{peering_service_name}/connections/{vpc_peering_name}`. For Google services that support this functionality, this is `services/servicenetworking.googleapis.com/connections/servicenetworking-googleapis-com`. */
  name: string;
  /** Request body */
  body?: DeleteConnectionRequest;
}

export const DeleteConnectionServicesConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeleteConnectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/connections/{connectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteConnectionServicesConnectionsRequest>;

export type DeleteConnectionServicesConnectionsResponse = Operation;
export const DeleteConnectionServicesConnectionsResponse = Operation;

export type DeleteConnectionServicesConnectionsError = CommonErrors;

export const deleteConnectionServicesConnections: API.OperationMethod<DeleteConnectionServicesConnectionsRequest, DeleteConnectionServicesConnectionsResponse, DeleteConnectionServicesConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteConnectionServicesConnectionsRequest,
  output: DeleteConnectionServicesConnectionsResponse,
  errors: [],
}));

/** Updates the allocated ranges that are assigned to a connection. */
export interface PatchServicesConnectionsRequest {
  /** Required. The private service connection that connects to a service producer organization. The name includes both the private service name and the VPC network peering name in the format of `services/{peering_service_name}/connections/{vpc_peering_name}`. For Google services that support this functionality, this is `services/servicenetworking.googleapis.com/connections/servicenetworking-googleapis-com`. */
  name: string;
  /** The update mask. If this is omitted, it defaults to "*". You can only update the listed peering ranges. */
  updateMask?: string;
  /** If a previously defined allocated range is removed, force flag must be set to true. */
  force?: boolean;
  /** Request body */
  body?: Connection;
}

export const PatchServicesConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  body: Schema.optional(Connection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/services/{servicesId}/connections/{connectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchServicesConnectionsRequest>;

export type PatchServicesConnectionsResponse = Operation;
export const PatchServicesConnectionsResponse = Operation;

export type PatchServicesConnectionsError = CommonErrors;

export const patchServicesConnections: API.OperationMethod<PatchServicesConnectionsRequest, PatchServicesConnectionsResponse, PatchServicesConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchServicesConnectionsRequest,
  output: PatchServicesConnectionsResponse,
  errors: [],
}));

/** Consumers use this method to find out the state of VPC Service Controls. The controls could be enabled or disabled for a connection. */
export interface GetVpcServiceControlsServicesProjectsGlobalNetworksRequest {
  /** Required. Name of the VPC Service Controls config to retrieve in the format: `services/{service}/projects/{project}/global/networks/{network}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is a project number e.g. `12345` that contains the service consumer's VPC network. {network} is the name of the service consumer's VPC network. */
  name: string;
}

export const GetVpcServiceControlsServicesProjectsGlobalNetworksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}/vpcServiceControls" }),
  svc,
) as unknown as Schema.Schema<GetVpcServiceControlsServicesProjectsGlobalNetworksRequest>;

export type GetVpcServiceControlsServicesProjectsGlobalNetworksResponse = VpcServiceControls;
export const GetVpcServiceControlsServicesProjectsGlobalNetworksResponse = VpcServiceControls;

export type GetVpcServiceControlsServicesProjectsGlobalNetworksError = CommonErrors;

export const getVpcServiceControlsServicesProjectsGlobalNetworks: API.OperationMethod<GetVpcServiceControlsServicesProjectsGlobalNetworksRequest, GetVpcServiceControlsServicesProjectsGlobalNetworksResponse, GetVpcServiceControlsServicesProjectsGlobalNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVpcServiceControlsServicesProjectsGlobalNetworksRequest,
  output: GetVpcServiceControlsServicesProjectsGlobalNetworksResponse,
  errors: [],
}));

/** Service producers use this method to update the configuration of their connection including the import/export of custom routes and subnetwork routes with public IP. */
export interface UpdateConsumerConfigServicesProjectsGlobalNetworksRequest {
  /** Required. Parent resource identifying the connection for which the consumer config is being updated in the format: `services/{service}/projects/{project}/global/networks/{network}` {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is the number of the project that contains the service consumer's VPC network e.g. `12345`. {network} is the name of the service consumer's VPC network. */
  parent: string;
  /** Request body */
  body?: UpdateConsumerConfigRequest;
}

export const UpdateConsumerConfigServicesProjectsGlobalNetworksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UpdateConsumerConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}:updateConsumerConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConsumerConfigServicesProjectsGlobalNetworksRequest>;

export type UpdateConsumerConfigServicesProjectsGlobalNetworksResponse = Operation;
export const UpdateConsumerConfigServicesProjectsGlobalNetworksResponse = Operation;

export type UpdateConsumerConfigServicesProjectsGlobalNetworksError = CommonErrors;

export const updateConsumerConfigServicesProjectsGlobalNetworks: API.OperationMethod<UpdateConsumerConfigServicesProjectsGlobalNetworksRequest, UpdateConsumerConfigServicesProjectsGlobalNetworksResponse, UpdateConsumerConfigServicesProjectsGlobalNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConsumerConfigServicesProjectsGlobalNetworksRequest,
  output: UpdateConsumerConfigServicesProjectsGlobalNetworksResponse,
  errors: [],
}));

/** Service producers use this method to get the configuration of their connection including the import/export of custom routes and subnetwork routes with public IP. */
export interface GetServicesProjectsGlobalNetworksRequest {
  /** Required. Name of the consumer config to retrieve in the format: `services/{service}/projects/{project}/global/networks/{network}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is a project number e.g. `12345` that contains the service consumer's VPC network. {network} is the name of the service consumer's VPC network. */
  name: string;
  /** Optional. When true, include the used IP ranges as part of the GetConsumerConfig output. This includes routes created inside the service networking network, consumer network, peers of the consumer network, and reserved ranges inside the service networking network. By default, this is false */
  includeUsedIpRanges?: boolean;
}

export const GetServicesProjectsGlobalNetworksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  includeUsedIpRanges: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUsedIpRanges")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesProjectsGlobalNetworksRequest>;

export type GetServicesProjectsGlobalNetworksResponse = ConsumerConfig;
export const GetServicesProjectsGlobalNetworksResponse = ConsumerConfig;

export type GetServicesProjectsGlobalNetworksError = CommonErrors;

export const getServicesProjectsGlobalNetworks: API.OperationMethod<GetServicesProjectsGlobalNetworksRequest, GetServicesProjectsGlobalNetworksResponse, GetServicesProjectsGlobalNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesProjectsGlobalNetworksRequest,
  output: GetServicesProjectsGlobalNetworksResponse,
  errors: [],
}));

/** * Service producers can use this method to retrieve a list of available DNS zones in the shared producer host project and the matching peering zones in the consumer project. * */
export interface ListServicesProjectsGlobalNetworksDnsZonesRequest {
  /** Required. Parent resource identifying the connection which owns this collection of DNS zones in the format services/{service}/projects/{project}/global/networks/{network} Service: The service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. Projects: the consumer project containing the consumer network. Network: The consumer network accessible from the tenant project. */
  parent: string;
}

export const ListServicesProjectsGlobalNetworksDnsZonesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}/dnsZones:list" }),
  svc,
) as unknown as Schema.Schema<ListServicesProjectsGlobalNetworksDnsZonesRequest>;

export type ListServicesProjectsGlobalNetworksDnsZonesResponse = ListDnsZonesResponse;
export const ListServicesProjectsGlobalNetworksDnsZonesResponse = ListDnsZonesResponse;

export type ListServicesProjectsGlobalNetworksDnsZonesError = CommonErrors;

export const listServicesProjectsGlobalNetworksDnsZones: API.OperationMethod<ListServicesProjectsGlobalNetworksDnsZonesRequest, ListServicesProjectsGlobalNetworksDnsZonesResponse, ListServicesProjectsGlobalNetworksDnsZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListServicesProjectsGlobalNetworksDnsZonesRequest,
  output: ListServicesProjectsGlobalNetworksDnsZonesResponse,
  errors: [],
}));

/** Service producers can use this method to retrieve a DNS zone in the shared producer host project and the matching peering zones in consumer project */
export interface GetServicesProjectsGlobalNetworksDnsZonesRequest {
  /** Required. The network that the consumer is using to connect with services. Must be in the form of services/{service}/projects/{project}/global/networks/{network}/dnsZones/{zoneName} Where {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this {project} is the project number, as in '12345' {network} is the network name. {zoneName} is the DNS zone name */
  name: string;
}

export const GetServicesProjectsGlobalNetworksDnsZonesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}/dnsZones/{dnsZonesId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesProjectsGlobalNetworksDnsZonesRequest>;

export type GetServicesProjectsGlobalNetworksDnsZonesResponse = GetDnsZoneResponse;
export const GetServicesProjectsGlobalNetworksDnsZonesResponse = GetDnsZoneResponse;

export type GetServicesProjectsGlobalNetworksDnsZonesError = CommonErrors;

export const getServicesProjectsGlobalNetworksDnsZones: API.OperationMethod<GetServicesProjectsGlobalNetworksDnsZonesRequest, GetServicesProjectsGlobalNetworksDnsZonesResponse, GetServicesProjectsGlobalNetworksDnsZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesProjectsGlobalNetworksDnsZonesRequest,
  output: GetServicesProjectsGlobalNetworksDnsZonesResponse,
  errors: [],
}));

/** Creates a peered DNS domain which sends requests for records in given namespace originating in the service producer VPC network to the consumer VPC network to be resolved. */
export interface CreateServicesProjectsGlobalNetworksPeeredDnsDomainsRequest {
  /** Required. Parent resource identifying the connection for which the peered DNS domain will be created in the format: `services/{service}/projects/{project}/global/networks/{network}` {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is the number of the project that contains the service consumer's VPC network e.g. `12345`. {network} is the name of the service consumer's VPC network. */
  parent: string;
  /** Request body */
  body?: PeeredDnsDomain;
}

export const CreateServicesProjectsGlobalNetworksPeeredDnsDomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PeeredDnsDomain).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}/peeredDnsDomains", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesProjectsGlobalNetworksPeeredDnsDomainsRequest>;

export type CreateServicesProjectsGlobalNetworksPeeredDnsDomainsResponse = Operation;
export const CreateServicesProjectsGlobalNetworksPeeredDnsDomainsResponse = Operation;

export type CreateServicesProjectsGlobalNetworksPeeredDnsDomainsError = CommonErrors;

export const createServicesProjectsGlobalNetworksPeeredDnsDomains: API.OperationMethod<CreateServicesProjectsGlobalNetworksPeeredDnsDomainsRequest, CreateServicesProjectsGlobalNetworksPeeredDnsDomainsResponse, CreateServicesProjectsGlobalNetworksPeeredDnsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesProjectsGlobalNetworksPeeredDnsDomainsRequest,
  output: CreateServicesProjectsGlobalNetworksPeeredDnsDomainsResponse,
  errors: [],
}));

/** Deletes a peered DNS domain. */
export interface DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsRequest {
  /** Required. The name of the peered DNS domain to delete in the format: `services/{service}/projects/{project}/global/networks/{network}/peeredDnsDomains/{name}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is the number of the project that contains the service consumer's VPC network e.g. `12345`. {network} is the name of the service consumer's VPC network. {name} is the name of the peered DNS domain. */
  name: string;
}

export const DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}/peeredDnsDomains/{peeredDnsDomainsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsRequest>;

export type DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsResponse = Operation;
export const DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsResponse = Operation;

export type DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsError = CommonErrors;

export const deleteServicesProjectsGlobalNetworksPeeredDnsDomains: API.OperationMethod<DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsRequest, DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsResponse, DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsRequest,
  output: DeleteServicesProjectsGlobalNetworksPeeredDnsDomainsResponse,
  errors: [],
}));

/** Lists peered DNS domains for a connection. */
export interface ListServicesProjectsGlobalNetworksPeeredDnsDomainsRequest {
  /** Required. Parent resource identifying the connection which owns this collection of peered DNS domains in the format: `services/{service}/projects/{project}/global/networks/{network}`. {service} is the peering service that is managing connectivity for the service producer's organization. For Google services that support this functionality, this value is `servicenetworking.googleapis.com`. {project} is a project number e.g. `12345` that contains the service consumer's VPC network. {network} is the name of the service consumer's VPC network. */
  parent: string;
}

export const ListServicesProjectsGlobalNetworksPeeredDnsDomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/projects/{projectsId}/global/networks/{networksId}/peeredDnsDomains" }),
  svc,
) as unknown as Schema.Schema<ListServicesProjectsGlobalNetworksPeeredDnsDomainsRequest>;

export type ListServicesProjectsGlobalNetworksPeeredDnsDomainsResponse = ListPeeredDnsDomainsResponse;
export const ListServicesProjectsGlobalNetworksPeeredDnsDomainsResponse = ListPeeredDnsDomainsResponse;

export type ListServicesProjectsGlobalNetworksPeeredDnsDomainsError = CommonErrors;

export const listServicesProjectsGlobalNetworksPeeredDnsDomains: API.OperationMethod<ListServicesProjectsGlobalNetworksPeeredDnsDomainsRequest, ListServicesProjectsGlobalNetworksPeeredDnsDomainsResponse, ListServicesProjectsGlobalNetworksPeeredDnsDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListServicesProjectsGlobalNetworksPeeredDnsDomainsRequest,
  output: ListServicesProjectsGlobalNetworksPeeredDnsDomainsResponse,
  errors: [],
}));

/** Service producers can use this method to add roles in the shared VPC host project. Each role is bound to the provided member. Each role must be selected from within an allowlisted set of roles. Each role is applied at only the granularity specified in the allowlist. */
export interface AddServicesRolesRequest {
  /** Required. This is in a form services/{service} where {service} is the name of the private access management service. For example 'service-peering.example.com'. */
  parent: string;
  /** Request body */
  body?: AddRolesRequest;
}

export const AddServicesRolesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddRolesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/roles:add", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddServicesRolesRequest>;

export type AddServicesRolesResponse = Operation;
export const AddServicesRolesResponse = Operation;

export type AddServicesRolesError = CommonErrors;

export const addServicesRoles: API.OperationMethod<AddServicesRolesRequest, AddServicesRolesResponse, AddServicesRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddServicesRolesRequest,
  output: AddServicesRolesResponse,
  errors: [],
}));

/** Service producers can use this method to add private DNS zones in the shared producer host project and matching peering zones in the consumer project. */
export interface AddServicesDnsZonesRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: AddDnsZoneRequest;
}

export const AddServicesDnsZonesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddDnsZoneRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/dnsZones:add", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddServicesDnsZonesRequest>;

export type AddServicesDnsZonesResponse = Operation;
export const AddServicesDnsZonesResponse = Operation;

export type AddServicesDnsZonesError = CommonErrors;

export const addServicesDnsZones: API.OperationMethod<AddServicesDnsZonesRequest, AddServicesDnsZonesResponse, AddServicesDnsZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddServicesDnsZonesRequest,
  output: AddServicesDnsZonesResponse,
  errors: [],
}));

/** Service producers can use this method to remove private DNS zones in the shared producer host project and matching peering zones in the consumer project. */
export interface RemoveServicesDnsZonesRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: RemoveDnsZoneRequest;
}

export const RemoveServicesDnsZonesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RemoveDnsZoneRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/dnsZones:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveServicesDnsZonesRequest>;

export type RemoveServicesDnsZonesResponse = Operation;
export const RemoveServicesDnsZonesResponse = Operation;

export type RemoveServicesDnsZonesError = CommonErrors;

export const removeServicesDnsZones: API.OperationMethod<RemoveServicesDnsZonesRequest, RemoveServicesDnsZonesResponse, RemoveServicesDnsZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveServicesDnsZonesRequest,
  output: RemoveServicesDnsZonesResponse,
  errors: [],
}));

/** Service producers can use this method to add DNS record sets to private DNS zones in the shared producer host project. */
export interface AddServicesDnsRecordSetsRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: AddDnsRecordSetRequest;
}

export const AddServicesDnsRecordSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddDnsRecordSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/dnsRecordSets:add", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddServicesDnsRecordSetsRequest>;

export type AddServicesDnsRecordSetsResponse = Operation;
export const AddServicesDnsRecordSetsResponse = Operation;

export type AddServicesDnsRecordSetsError = CommonErrors;

export const addServicesDnsRecordSets: API.OperationMethod<AddServicesDnsRecordSetsRequest, AddServicesDnsRecordSetsResponse, AddServicesDnsRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddServicesDnsRecordSetsRequest,
  output: AddServicesDnsRecordSetsResponse,
  errors: [],
}));

/** Service producers can use this method to remove DNS record sets from private DNS zones in the shared producer host project. */
export interface RemoveServicesDnsRecordSetsRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: RemoveDnsRecordSetRequest;
}

export const RemoveServicesDnsRecordSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RemoveDnsRecordSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/dnsRecordSets:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveServicesDnsRecordSetsRequest>;

export type RemoveServicesDnsRecordSetsResponse = Operation;
export const RemoveServicesDnsRecordSetsResponse = Operation;

export type RemoveServicesDnsRecordSetsError = CommonErrors;

export const removeServicesDnsRecordSets: API.OperationMethod<RemoveServicesDnsRecordSetsRequest, RemoveServicesDnsRecordSetsResponse, RemoveServicesDnsRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveServicesDnsRecordSetsRequest,
  output: RemoveServicesDnsRecordSetsResponse,
  errors: [],
}));

/** Service producers can use this method to update DNS record sets from private DNS zones in the shared producer host project. */
export interface UpdateServicesDnsRecordSetsRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Request body */
  body?: UpdateDnsRecordSetRequest;
}

export const UpdateServicesDnsRecordSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UpdateDnsRecordSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/services/{servicesId}/dnsRecordSets:update", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateServicesDnsRecordSetsRequest>;

export type UpdateServicesDnsRecordSetsResponse = Operation;
export const UpdateServicesDnsRecordSetsResponse = Operation;

export type UpdateServicesDnsRecordSetsError = CommonErrors;

export const updateServicesDnsRecordSets: API.OperationMethod<UpdateServicesDnsRecordSetsRequest, UpdateServicesDnsRecordSetsResponse, UpdateServicesDnsRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateServicesDnsRecordSetsRequest,
  output: UpdateServicesDnsRecordSetsResponse,
  errors: [],
}));

/** Producers can use this method to retrieve information about the DNS record set added to the private zone inside the shared tenant host project associated with a consumer network. */
export interface GetServicesDnsRecordSetsRequest {
  /** Required. Parent resource identifying the connection which owns this collection of DNS zones in the format services/{service}. */
  parent: string;
  /** Required. The consumer network containing the record set. Must be in the form of projects/{project}/global/networks/{network} */
  consumerNetwork?: string;
  /** Required. The name of the zone containing the record set. */
  zone?: string;
  /** Required. The domain name of the zone containing the recordset. */
  domain?: string;
  /** Required. RecordSet Type eg. type='A'. See the list of [Supported DNS Types](https://cloud.google.com/dns/records/json-record). */
  type?: string;
}

export const GetServicesDnsRecordSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  consumerNetwork: Schema.optional(Schema.String).pipe(T.HttpQuery("consumerNetwork")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/dnsRecordSets:get" }),
  svc,
) as unknown as Schema.Schema<GetServicesDnsRecordSetsRequest>;

export type GetServicesDnsRecordSetsResponse = DnsRecordSet;
export const GetServicesDnsRecordSetsResponse = DnsRecordSet;

export type GetServicesDnsRecordSetsError = CommonErrors;

export const getServicesDnsRecordSets: API.OperationMethod<GetServicesDnsRecordSetsRequest, GetServicesDnsRecordSetsResponse, GetServicesDnsRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesDnsRecordSetsRequest,
  output: GetServicesDnsRecordSetsResponse,
  errors: [],
}));

/** Producers can use this method to retrieve a list of available DNS RecordSets available inside the private zone on the tenant host project accessible from their network. */
export interface ListServicesDnsRecordSetsRequest {
  /** Required. The service that is managing peering connectivity for a service producer's organization. For Google services that support this functionality, this value is `services/servicenetworking.googleapis.com`. */
  parent: string;
  /** Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name. */
  consumerNetwork?: string;
  /** Required. The name of the private DNS zone in the shared producer host project from which the record set will be removed. */
  zone?: string;
}

export const ListServicesDnsRecordSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  consumerNetwork: Schema.optional(Schema.String).pipe(T.HttpQuery("consumerNetwork")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/dnsRecordSets:list" }),
  svc,
) as unknown as Schema.Schema<ListServicesDnsRecordSetsRequest>;

export type ListServicesDnsRecordSetsResponse = ListDnsRecordSetsResponse;
export const ListServicesDnsRecordSetsResponse = ListDnsRecordSetsResponse;

export type ListServicesDnsRecordSetsError = CommonErrors;

export const listServicesDnsRecordSets: API.OperationMethod<ListServicesDnsRecordSetsRequest, ListServicesDnsRecordSetsResponse, ListServicesDnsRecordSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListServicesDnsRecordSetsRequest,
  output: ListServicesDnsRecordSetsResponse,
  errors: [],
}));

