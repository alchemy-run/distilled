// ==========================================================================
// Network Connectivity API (networkconnectivity v1)
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
  name: "networkconnectivity",
  version: "v1",
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

export interface AutomatedDnsCreationSpec {
  /** Required. The hostname (the first label of the FQDN) to use for the DNS record. This should be a valid DNS label as per RFC 1035. Generally, this means the hostname can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-instance", "db-1" */
  hostname?: string;
  /** Required. The DNS suffix to use for the DNS record. Must end with a dot. This should be a valid DNS domain name as per RFC 1035. Each label (between dots) can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-service.example.com.", "internal." */
  dnsSuffix?: string;
  /** Optional. The Time To Live for the DNS record, in seconds. If not provided, a default of 30 seconds will be used. */
  ttl?: string;
}

export const AutomatedDnsCreationSpec: Schema.Schema<AutomatedDnsCreationSpec> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  dnsSuffix: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "AutomatedDnsCreationSpec" }) as any as Schema.Schema<AutomatedDnsCreationSpec>;

export interface ProducerPscConfig {
  /** The resource path of a service attachment. Example: projects/{projectNumOrId}/regions/{region}/serviceAttachments/{resourceId}. */
  serviceAttachmentUri?: string;
  /** Optional. The specification for automatically creating a DNS record for this PSC connection. */
  automatedDnsCreationSpec?: AutomatedDnsCreationSpec;
}

export const ProducerPscConfig: Schema.Schema<ProducerPscConfig> = Schema.suspend(() => Schema.Struct({
  serviceAttachmentUri: Schema.optional(Schema.String),
  automatedDnsCreationSpec: Schema.optional(AutomatedDnsCreationSpec),
})).annotate({ identifier: "ProducerPscConfig" }) as any as Schema.Schema<ProducerPscConfig>;

export interface ConsumerPscConfig {
  /** The consumer project where PSC connections are allowed to be created in. */
  project?: string;
  /** The resource path of the consumer network where PSC connections are allowed to be created in. Note, this network does not need be in the ConsumerPscConfig.project in the case of SharedVPC. Example: projects/{projectNumOrId}/global/networks/{networkId}. */
  network?: string;
  /** This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region. */
  disableGlobalAccess?: boolean;
  /** Output only. Overall state of PSC Connections management for this consumer psc config. */
  state?: "STATE_UNSPECIFIED" | "VALID" | "CONNECTION_POLICY_MISSING" | "POLICY_LIMIT_REACHED" | "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED" | (string & {});
  /** Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance. */
  producerInstanceId?: string;
  /** Optional. A map to store mapping between customer vip and target service attachment. This field can be used to specify a static IP address for a PSC connection. */
  serviceAttachmentIpAddressMap?: Record<string, string>;
  /** Required. The project ID or project number of the consumer project. This project is the one that the consumer uses to interact with the producer instance. From the perspective of a consumer who's created a producer instance, this is the project of the producer instance. Format: 'projects/' Eg. 'projects/consumer-project' or 'projects/1234' */
  consumerInstanceProject?: string;
  /** Immutable. An immutable map for the producer instance metadata. */
  producerInstanceMetadata?: Record<string, string>;
  /** The requested IP version for the PSC connection. */
  ipVersion?: "IP_VERSION_UNSPECIFIED" | "IPV4" | "IPV6" | (string & {});
}

export const ConsumerPscConfig: Schema.Schema<ConsumerPscConfig> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  disableGlobalAccess: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  producerInstanceId: Schema.optional(Schema.String),
  serviceAttachmentIpAddressMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  consumerInstanceProject: Schema.optional(Schema.String),
  producerInstanceMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  ipVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsumerPscConfig" }) as any as Schema.Schema<ConsumerPscConfig>;

export interface GoogleRpcErrorInfo {
  /** The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. */
  reason?: string;
  /** The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". */
  domain?: string;
  /** Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. */
  metadata?: Record<string, string>;
}

export const GoogleRpcErrorInfo: Schema.Schema<GoogleRpcErrorInfo> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleRpcErrorInfo" }) as any as Schema.Schema<GoogleRpcErrorInfo>;

export interface DnsAutomationStatus {
  /** Output only. The current state of DNS automation. */
  state?: "STATE_UNSPECIFIED" | "PENDING_CREATE" | "ACTIVE" | "PENDING_DELETE" | "CREATE_FAILED" | "DELETE_FAILED" | (string & {});
  /** Output only. The fully qualified domain name of the DNS record. */
  fqdn?: string;
  /** Output only. The error details if the state is CREATE_FAILED or DELETE_FAILED. */
  error?: GoogleRpcStatus;
}

export const DnsAutomationStatus: Schema.Schema<DnsAutomationStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  fqdn: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "DnsAutomationStatus" }) as any as Schema.Schema<DnsAutomationStatus>;

export interface ConsumerPscConnection {
  /** The URI of a service attachment which is the target of the PSC connection. */
  serviceAttachmentUri?: string;
  /** The state of the PSC connection. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "FAILED" | "CREATING" | "DELETING" | "CREATE_REPAIRING" | "DELETE_REPAIRING" | (string & {});
  /** The consumer project whose PSC forwarding rule is connected to the service attachments in this service connection map. */
  project?: string;
  /** The consumer network whose PSC forwarding rule is connected to the service attachments in this service connection map. Note that the network could be on a different project (shared VPC). */
  network?: string;
  /** The PSC connection id of the PSC forwarding rule connected to the service attachments in this service connection map. */
  pscConnectionId?: string;
  /** The IP literal allocated on the consumer network for the PSC forwarding rule that is created to connect to the producer service attachment in this service connection map. */
  ip?: string;
  /** The error type indicates whether the error is consumer facing, producer facing or system internal. */
  errorType?: "CONNECTION_ERROR_TYPE_UNSPECIFIED" | "ERROR_INTERNAL" | "ERROR_CONSUMER_SIDE" | "ERROR_PRODUCER_SIDE" | (string & {});
  /** The most recent error during operating this connection. */
  error?: GoogleRpcStatus;
  /** The last Compute Engine operation to setup PSC connection. */
  gceOperation?: string;
  /** The URI of the consumer forwarding rule created. Example: projects/{projectNumOrId}/regions/us-east1/networks/{resourceId}. */
  forwardingRule?: string;
  /** Output only. The error info for the latest error during operating this connection. */
  errorInfo?: GoogleRpcErrorInfo;
  /** Output only. The URI of the selected subnetwork selected to allocate IP address for this connection. */
  selectedSubnetwork?: string;
  /** Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance. */
  producerInstanceId?: string;
  /** Immutable. An immutable map for the producer instance metadata. */
  producerInstanceMetadata?: Record<string, string>;
  /** The requested IP version for the PSC connection. */
  ipVersion?: "IP_VERSION_UNSPECIFIED" | "IPV4" | "IPV6" | (string & {});
  /** Output only. The status of DNS automation for this PSC connection. */
  dnsAutomationStatus?: DnsAutomationStatus;
}

export const ConsumerPscConnection: Schema.Schema<ConsumerPscConnection> = Schema.suspend(() => Schema.Struct({
  serviceAttachmentUri: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  pscConnectionId: Schema.optional(Schema.String),
  ip: Schema.optional(Schema.String),
  errorType: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
  gceOperation: Schema.optional(Schema.String),
  forwardingRule: Schema.optional(Schema.String),
  errorInfo: Schema.optional(GoogleRpcErrorInfo),
  selectedSubnetwork: Schema.optional(Schema.String),
  producerInstanceId: Schema.optional(Schema.String),
  producerInstanceMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  ipVersion: Schema.optional(Schema.String),
  dnsAutomationStatus: Schema.optional(DnsAutomationStatus),
})).annotate({ identifier: "ConsumerPscConnection" }) as any as Schema.Schema<ConsumerPscConnection>;

export interface ServiceConnectionMap {
  /** Immutable. The name of a ServiceConnectionMap. Format: projects/{project}/locations/{location}/serviceConnectionMaps/{service_connection_map} See: https://google.aip.dev/122#fields-representing-resource-names */
  name?: string;
  /** Output only. Time when the ServiceConnectionMap was created. */
  createTime?: string;
  /** Output only. Time when the ServiceConnectionMap was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** A description of this resource. */
  description?: string;
  /** The service class identifier this ServiceConnectionMap is for. The user of ServiceConnectionMap create API needs to have networkconnectivity.serviceClasses.use IAM permission for the service class. */
  serviceClass?: string;
  /** Output only. The service class uri this ServiceConnectionMap is for. */
  serviceClassUri?: string;
  /** Output only. The infrastructure used for connections between consumers/producers. */
  infrastructure?: "INFRASTRUCTURE_UNSPECIFIED" | "PSC" | (string & {});
  /** The PSC configurations on producer side. */
  producerPscConfigs?: Array<ProducerPscConfig>;
  /** The PSC configurations on consumer side. */
  consumerPscConfigs?: Array<ConsumerPscConfig>;
  /** Output only. PSC connection details on consumer side. */
  consumerPscConnections?: Array<ConsumerPscConnection>;
  /** The token provided by the consumer. This token authenticates that the consumer can create a connection within the specified project and network. */
  token?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const ServiceConnectionMap: Schema.Schema<ServiceConnectionMap> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  serviceClass: Schema.optional(Schema.String),
  serviceClassUri: Schema.optional(Schema.String),
  infrastructure: Schema.optional(Schema.String),
  producerPscConfigs: Schema.optional(Schema.Array(ProducerPscConfig)),
  consumerPscConfigs: Schema.optional(Schema.Array(ConsumerPscConfig)),
  consumerPscConnections: Schema.optional(Schema.Array(ConsumerPscConnection)),
  token: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceConnectionMap" }) as any as Schema.Schema<ServiceConnectionMap>;

export interface ListServiceConnectionMapsResponse {
  /** ServiceConnectionMaps to be returned. */
  serviceConnectionMaps?: Array<ServiceConnectionMap>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServiceConnectionMapsResponse: Schema.Schema<ListServiceConnectionMapsResponse> = Schema.suspend(() => Schema.Struct({
  serviceConnectionMaps: Schema.optional(Schema.Array(ServiceConnectionMap)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServiceConnectionMapsResponse" }) as any as Schema.Schema<ListServiceConnectionMapsResponse>;

export interface PscConfig {
  /** The resource paths of subnetworks to use for IP address management. Example: projects/{projectNumOrId}/regions/{region}/subnetworks/{resourceId}. */
  subnetworks?: Array<string>;
  /** Optional. Max number of PSC connections for this policy. */
  limit?: string;
  /** Optional. ProducerInstanceLocation is used to specify which authorization mechanism to use to determine which projects the Producer instance can be within. */
  producerInstanceLocation?: "PRODUCER_INSTANCE_LOCATION_UNSPECIFIED" | "CUSTOM_RESOURCE_HIERARCHY_LEVELS" | (string & {});
  /** Optional. List of Projects, Folders, or Organizations from where the Producer instance can be within. For example, a network administrator can provide both 'organizations/foo' and 'projects/bar' as allowed_google_producers_resource_hierarchy_levels. This allowlists this network to connect with any Producer instance within the 'foo' organization or the 'bar' project. By default, allowed_google_producers_resource_hierarchy_level is empty. The format for each allowed_google_producers_resource_hierarchy_level is / where is one of 'projects', 'folders', or 'organizations' and is either the ID or the number of the resource type. Format for each allowed_google_producers_resource_hierarchy_level value: 'projects/' or 'folders/' or 'organizations/' Eg. [projects/my-project-id, projects/567, folders/891, organizations/123] */
  allowedGoogleProducersResourceHierarchyLevel?: Array<string>;
}

export const PscConfig: Schema.Schema<PscConfig> = Schema.suspend(() => Schema.Struct({
  subnetworks: Schema.optional(Schema.Array(Schema.String)),
  limit: Schema.optional(Schema.String),
  producerInstanceLocation: Schema.optional(Schema.String),
  allowedGoogleProducersResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PscConfig" }) as any as Schema.Schema<PscConfig>;

export interface PscConnection {
  /** State of the PSC Connection */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "FAILED" | "CREATING" | "DELETING" | "CREATE_REPAIRING" | "DELETE_REPAIRING" | (string & {});
  /** The resource reference of the PSC Forwarding Rule within the consumer VPC. */
  consumerForwardingRule?: string;
  /** The resource reference of the consumer address. */
  consumerAddress?: string;
  /** The error type indicates whether the error is consumer facing, producer facing or system internal. */
  errorType?: "CONNECTION_ERROR_TYPE_UNSPECIFIED" | "ERROR_INTERNAL" | "ERROR_CONSUMER_SIDE" | "ERROR_PRODUCER_SIDE" | (string & {});
  /** The most recent error during operating this connection. Deprecated, please use error_info instead. */
  error?: GoogleRpcStatus;
  /** The last Compute Engine operation to setup PSC connection. */
  gceOperation?: string;
  /** The project where the PSC connection is created. */
  consumerTargetProject?: string;
  /** The PSC connection id of the PSC forwarding rule. */
  pscConnectionId?: string;
  /** Output only. The error info for the latest error during operating this connection. */
  errorInfo?: GoogleRpcErrorInfo;
  /** Output only. The URI of the subnetwork selected to allocate IP address for this connection. */
  selectedSubnetwork?: string;
  /** Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance. */
  producerInstanceId?: string;
  /** Immutable. An immutable map for the producer instance metadata. */
  producerInstanceMetadata?: Record<string, string>;
  /** Output only. [Output only] The service class associated with this PSC Connection. The value is derived from the SCPolicy and matches the service class name provided by the customer. */
  serviceClass?: string;
  /** The requested IP version for the PSC connection. */
  ipVersion?: "IP_VERSION_UNSPECIFIED" | "IPV4" | "IPV6" | (string & {});
}

export const PscConnection: Schema.Schema<PscConnection> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  consumerForwardingRule: Schema.optional(Schema.String),
  consumerAddress: Schema.optional(Schema.String),
  errorType: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
  gceOperation: Schema.optional(Schema.String),
  consumerTargetProject: Schema.optional(Schema.String),
  pscConnectionId: Schema.optional(Schema.String),
  errorInfo: Schema.optional(GoogleRpcErrorInfo),
  selectedSubnetwork: Schema.optional(Schema.String),
  producerInstanceId: Schema.optional(Schema.String),
  producerInstanceMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  serviceClass: Schema.optional(Schema.String),
  ipVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "PscConnection" }) as any as Schema.Schema<PscConnection>;

export interface AutoCreatedSubnetworkInfo {
  /** Output only. URI of the automatically created Internal Range. Only set if the subnetwork mode is AUTO_CREATED during creation. */
  internalRange?: string;
  /** Output only. URI of the automatically created Internal Range reference. Only set if the subnetwork mode is AUTO_CREATED during creation. */
  internalRangeRef?: string;
  /** Output only. URI of the automatically created subnetwork. Only set if the subnetwork mode is AUTO_CREATED during creation. */
  subnetwork?: string;
  /** Output only. URI of the automatically created subnetwork reference. Only set if the subnetwork mode is AUTO_CREATED during creation. */
  subnetworkRef?: string;
  /** Output only. Indicates whether the subnetwork is delinked from the Service Connection Policy. Only set if the subnetwork mode is AUTO_CREATED during creation. */
  delinked?: boolean;
}

export const AutoCreatedSubnetworkInfo: Schema.Schema<AutoCreatedSubnetworkInfo> = Schema.suspend(() => Schema.Struct({
  internalRange: Schema.optional(Schema.String),
  internalRangeRef: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  subnetworkRef: Schema.optional(Schema.String),
  delinked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AutoCreatedSubnetworkInfo" }) as any as Schema.Schema<AutoCreatedSubnetworkInfo>;

export interface ServiceConnectionPolicy {
  /** Immutable. The name of a ServiceConnectionPolicy. Format: projects/{project}/locations/{location}/serviceConnectionPolicies/{service_connection_policy} See: https://google.aip.dev/122#fields-representing-resource-names */
  name?: string;
  /** Output only. Time when the ServiceConnectionPolicy was created. */
  createTime?: string;
  /** Output only. Time when the ServiceConnectionPolicy was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** A description of this resource. */
  description?: string;
  /** The resource path of the consumer network. Example: - projects/{projectNumOrId}/global/networks/{resourceId}. */
  network?: string;
  /** The service class identifier for which this ServiceConnectionPolicy is for. The service class identifier is a unique, symbolic representation of a ServiceClass. It is provided by the Service Producer. Google services have a prefix of gcp or google-cloud. For example, gcp-memorystore-redis or google-cloud-sql. 3rd party services do not. For example, test-service-a3dfcx. */
  serviceClass?: string;
  /** Output only. The type of underlying resources used to create the connection. */
  infrastructure?: "INFRASTRUCTURE_UNSPECIFIED" | "PSC" | (string & {});
  /** Configuration used for Private Service Connect connections. Used when Infrastructure is PSC. */
  pscConfig?: PscConfig;
  /** Output only. [Output only] Information about each Private Service Connect connection. */
  pscConnections?: Array<PscConnection>;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Information for the automatically created subnetwork and its associated IR. */
  autoCreatedSubnetInfo?: AutoCreatedSubnetworkInfo;
}

export const ServiceConnectionPolicy: Schema.Schema<ServiceConnectionPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  serviceClass: Schema.optional(Schema.String),
  infrastructure: Schema.optional(Schema.String),
  pscConfig: Schema.optional(PscConfig),
  pscConnections: Schema.optional(Schema.Array(PscConnection)),
  etag: Schema.optional(Schema.String),
  autoCreatedSubnetInfo: Schema.optional(AutoCreatedSubnetworkInfo),
})).annotate({ identifier: "ServiceConnectionPolicy" }) as any as Schema.Schema<ServiceConnectionPolicy>;

export interface ListServiceConnectionPoliciesResponse {
  /** ServiceConnectionPolicies to be returned. */
  serviceConnectionPolicies?: Array<ServiceConnectionPolicy>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServiceConnectionPoliciesResponse: Schema.Schema<ListServiceConnectionPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  serviceConnectionPolicies: Schema.optional(Schema.Array(ServiceConnectionPolicy)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServiceConnectionPoliciesResponse" }) as any as Schema.Schema<ListServiceConnectionPoliciesResponse>;

export interface ServiceClass {
  /** Immutable. The name of a ServiceClass resource. Format: projects/{project}/locations/{location}/serviceClasses/{service_class} See: https://google.aip.dev/122#fields-representing-resource-names */
  name?: string;
  /** Output only. The generated service class name. Use this name to refer to the Service class in Service Connection Maps and Service Connection Policies. */
  serviceClass?: string;
  /** Output only. Time when the ServiceClass was created. */
  createTime?: string;
  /** Output only. Time when the ServiceClass was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** A description of this resource. */
  description?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const ServiceClass: Schema.Schema<ServiceClass> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceClass: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceClass" }) as any as Schema.Schema<ServiceClass>;

export interface ListServiceClassesResponse {
  /** ServiceClasses to be returned. */
  serviceClasses?: Array<ServiceClass>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServiceClassesResponse: Schema.Schema<ListServiceClassesResponse> = Schema.suspend(() => Schema.Struct({
  serviceClasses: Schema.optional(Schema.Array(ServiceClass)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServiceClassesResponse" }) as any as Schema.Schema<ListServiceClassesResponse>;

export interface ServiceConnectionToken {
  /** Immutable. The name of a ServiceConnectionToken. Format: projects/{project}/locations/{location}/ServiceConnectionTokens/{service_connection_token} See: https://google.aip.dev/122#fields-representing-resource-names */
  name?: string;
  /** Output only. Time when the ServiceConnectionToken was created. */
  createTime?: string;
  /** Output only. Time when the ServiceConnectionToken was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** A description of this resource. */
  description?: string;
  /** The resource path of the network associated with this token. Example: projects/{projectNumOrId}/global/networks/{resourceId}. */
  network?: string;
  /** Output only. The token generated by Automation. */
  token?: string;
  /** Output only. The time to which this token is valid. */
  expireTime?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const ServiceConnectionToken: Schema.Schema<ServiceConnectionToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceConnectionToken" }) as any as Schema.Schema<ServiceConnectionToken>;

export interface ListServiceConnectionTokensResponse {
  /** ServiceConnectionTokens to be returned. */
  serviceConnectionTokens?: Array<ServiceConnectionToken>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServiceConnectionTokensResponse: Schema.Schema<ListServiceConnectionTokensResponse> = Schema.suspend(() => Schema.Struct({
  serviceConnectionTokens: Schema.optional(Schema.Array(ServiceConnectionToken)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServiceConnectionTokensResponse" }) as any as Schema.Schema<ListServiceConnectionTokensResponse>;

export interface CheckConsumerConfigRequest {
  /** Required. Full resource name of the consumer network. Example: - projects/{project}/global/networks/{network}. */
  consumerNetwork?: string;
  /** Required. The service class identifier of the producer. */
  serviceClass?: string;
  /** The requested IP Version */
  requestedIpVersion?: "IP_VERSION_UNSPECIFIED" | "IPV4" | "IPV6" | (string & {});
  /** The project number or ID where the PSC endpoint is to be created. */
  endpointProject?: string;
}

export const CheckConsumerConfigRequest: Schema.Schema<CheckConsumerConfigRequest> = Schema.suspend(() => Schema.Struct({
  consumerNetwork: Schema.optional(Schema.String),
  serviceClass: Schema.optional(Schema.String),
  requestedIpVersion: Schema.optional(Schema.String),
  endpointProject: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckConsumerConfigRequest" }) as any as Schema.Schema<CheckConsumerConfigRequest>;

export interface CheckConsumerConfigResponse {
  /** List of validation errors. If the list is empty, the consumer config is valid. */
  errors?: Array<"ERROR_UNSPECIFIED" | "NETWORK_PROJECT_INVALID" | "NETWORK_PROJECT_APIS_NOT_ENABLED" | "NETWORK_INVALID" | "CONNECTION_POLICY_MISSING" | "IP_VERSION_NOT_SUPPORTED" | "NETWORK_PROJECT_SERVICE_AGENT_NOT_FOUND" | "ENDPOINT_PROJECT_INVALID" | "ENDPOINT_PROJECT_API_NOT_ENABLED" | "ENDPOINT_PROJECT_IS_NOT_SERVICE_PROJECT" | (string & {})>;
}

export const CheckConsumerConfigResponse: Schema.Schema<CheckConsumerConfigResponse> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CheckConsumerConfigResponse" }) as any as Schema.Schema<CheckConsumerConfigResponse>;

export interface Config {
  /** Required. Number of seconds that this DNS record can be cached by resolvers. */
  ttl?: string;
  /** Required. The list of resource record data strings. The content and format of these strings depend on the AutomatedDnsRecord.type. For many common record types, this list may contain multiple strings. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. Examples: A record: ["192.0.2.1"] or ["192.0.2.1", "192.0.2.2"] TXT record: ["This is a text record"] CNAME record: ["target.example.com."] AAAA record: ["::1"] or ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:0db8:85a3:0000:0000:8a2e:0370:7335"] */
  rrdatas?: Array<string>;
}

export const Config: Schema.Schema<Config> = Schema.suspend(() => Schema.Struct({
  ttl: Schema.optional(Schema.String),
  rrdatas: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Config" }) as any as Schema.Schema<Config>;

export interface AutomatedDnsRecord {
  /** Immutable. Identifier. The name of an AutomatedDnsRecord. Format: projects/{project}/locations/{location}/automatedDnsRecords/{automated_dns_record} See: https://google.aip.dev/122#fields-representing-resource-names */
  name?: string;
  /** Required. Immutable. The hostname for the DNS record. This value will be prepended to the `dns_suffix` to create the full domain name (FQDN) for the record. For example, if `hostname` is "corp.db" and `dns_suffix` is "example.com.", the resulting record will be "corp.db.example.com.". Should not include a trailing dot. */
  hostname?: string;
  /** Required. Immutable. The dns suffix for this record to use in longest-suffix matching. Requires a trailing dot. Example: "example.com." */
  dnsSuffix?: string;
  /** Required. Immutable. The identifier of a supported record type. */
  recordType?: "RECORD_TYPE_UNSPECIFIED" | "A" | "AAAA" | "TXT" | "CNAME" | (string & {});
  /** Output only. The timestamp of when the record was created. */
  createTime?: string;
  /** Output only. The timestamp of when the record was updated. */
  updateTime?: string;
  /** Required. Immutable. The service class identifier which authorizes this AutomatedDnsRecord. Any API calls targeting this AutomatedDnsRecord must have `networkconnectivity.serviceclasses.use` IAM permission for the provided service class. */
  serviceClass?: string;
  /** Required. Immutable. The full resource path of the consumer network this AutomatedDnsRecord is visible to. Example: "projects/{projectNumOrId}/global/networks/{networkName}". */
  consumerNetwork?: string;
  /** Required. Immutable. The configuration settings used to create this DNS record. These settings define the desired state of the record as specified by the producer. */
  originalConfig?: Config;
  /** Output only. The current settings for this record as identified by (`hostname`, `dns_suffix`, `type`) in Cloud DNS. The `current_config` field reflects the actual settings of the DNS record in Cloud DNS based on the `hostname`, `dns_suffix`, and `type`. * **Absence:** If `current_config` is unset, it means a DNS record with the specified `hostname`, `dns_suffix`, and `type` does not currently exist in Cloud DNS. This could be because the `AutomatedDnsRecord` has never been successfully programmed, has been deleted, or there was an error during provisioning. * **Presence:** If `current_config` is present: * It can be different from the `original_config`. This can happen due to several reasons: * Out-of-band changes: A consumer might have directly modified the DNS record in Cloud DNS. * `OVERWRITE` operations from other `AutomatedDnsRecord` resources: Another `AutomatedDnsRecord` with the same identifying attributes (`hostname`, `dns_suffix`, `type`) but a different configuration might have overwritten the record using `insert_mode: OVERWRITE`. Therefore, the presence of `current_config` indicates that a corresponding DNS record exists, but its values (TTL and RRData) might not always align with the `original_config` of the AutomatedDnsRecord. */
  currentConfig?: Config;
  /** Output only. The FQDN created by combining the hostname and dns suffix. Should include a trailing dot. */
  fqdn?: string;
  /** Output only. The current operational state of this AutomatedDnsRecord as managed by Service Connectivity Automation. */
  state?: "STATE_UNSPECIFIED" | "PROGRAMMED" | "FAILED_DEPROGRAMMING" | "CREATING" | "DELETING" | (string & {});
  /** Output only. A human-readable message providing more context about the current state, such as an error description if the state is `FAILED_DEPROGRAMMING`. */
  stateDetails?: string;
  /** A human-readable description of the record. */
  description?: string;
  /** Output only. DnsZone is the DNS zone managed by automation. Format: projects/{project}/managedZones/{managedZone} */
  dnsZone?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. User-defined labels. */
  labels?: Record<string, string>;
  /** Required. Immutable. The creation mode of the AutomatedDnsRecord. This field is immutable. */
  creationMode?: "CREATION_MODE_UNSPECIFIED" | "CONSUMER_API" | "SERVICE_CONNECTION_MAP" | (string & {});
}

export const AutomatedDnsRecord: Schema.Schema<AutomatedDnsRecord> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  dnsSuffix: Schema.optional(Schema.String),
  recordType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  serviceClass: Schema.optional(Schema.String),
  consumerNetwork: Schema.optional(Schema.String),
  originalConfig: Schema.optional(Config),
  currentConfig: Schema.optional(Config),
  fqdn: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dnsZone: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  creationMode: Schema.optional(Schema.String),
})).annotate({ identifier: "AutomatedDnsRecord" }) as any as Schema.Schema<AutomatedDnsRecord>;

export interface ListAutomatedDnsRecordsResponse {
  /** AutomatedDnsRecords to be returned. */
  automatedDnsRecords?: Array<AutomatedDnsRecord>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAutomatedDnsRecordsResponse: Schema.Schema<ListAutomatedDnsRecordsResponse> = Schema.suspend(() => Schema.Struct({
  automatedDnsRecords: Schema.optional(Schema.Array(AutomatedDnsRecord)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAutomatedDnsRecordsResponse" }) as any as Schema.Schema<ListAutomatedDnsRecordsResponse>;

export interface StateMetadata {
  /** Output only. The state of the resource. */
  state?: "STATE_UNSPECIFIED" | "ADDING" | "ACTIVE" | "DELETING" | "SUSPENDING" | "SUSPENDED" | (string & {});
  /** Output only. Accompanies only the transient states, which include `ADDING`, `DELETING`, and `SUSPENDING`, to denote the time until which the transient state of the resource will be effective. For instance, if the state is `ADDING`, this field shows the time when the resource state transitions to `ACTIVE`. */
  effectiveTime?: string;
}

export const StateMetadata: Schema.Schema<StateMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  effectiveTime: Schema.optional(Schema.String),
})).annotate({ identifier: "StateMetadata" }) as any as Schema.Schema<StateMetadata>;

export interface StateTimeline {
  /** Output only. The state and activation time details of the resource state. */
  states?: Array<StateMetadata>;
}

export const StateTimeline: Schema.Schema<StateTimeline> = Schema.suspend(() => Schema.Struct({
  states: Schema.optional(Schema.Array(StateMetadata)),
})).annotate({ identifier: "StateTimeline" }) as any as Schema.Schema<StateTimeline>;

export interface MulticloudDataTransferConfig {
  /** Identifier. The name of the `MulticloudDataTransferConfig` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}`. */
  name?: string;
  /** Output only. Time when the `MulticloudDataTransferConfig` resource was created. */
  createTime?: string;
  /** Output only. Time when the `MulticloudDataTransferConfig` resource was updated. */
  updateTime?: string;
  /** Optional. User-defined labels. */
  labels?: Record<string, string>;
  /** The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. A description of this resource. */
  description?: string;
  /** Output only. The number of `Destination` resources configured for the `MulticloudDataTransferConfig` resource. */
  destinationsCount?: number;
  /** Output only. The number of `Destination` resources in use with the `MulticloudDataTransferConfig` resource. */
  destinationsActiveCount?: number;
  /** Optional. Maps services to their current or planned states. Service names are keys, and the associated values describe the state of the service. If a state change is expected, the value is either `ADDING` or `DELETING`, depending on the actions taken. Sample output: "services": { "big-query": { "states": [ { "effectiveTime": "2024-12-12T08:00:00Z" "state": "ADDING", }, ] }, "cloud-storage": { "states": [ { "state": "ACTIVE", } ] } } */
  services?: Record<string, StateTimeline>;
  /** Output only. The Google-generated unique ID for the `MulticloudDataTransferConfig` resource. This value is unique across all `MulticloudDataTransferConfig` resources. If a resource is deleted and another with the same name is created, the new resource is assigned a different and unique ID. */
  uid?: string;
}

export const MulticloudDataTransferConfig: Schema.Schema<MulticloudDataTransferConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  destinationsCount: Schema.optional(Schema.Number),
  destinationsActiveCount: Schema.optional(Schema.Number),
  services: Schema.optional(Schema.Record(Schema.String, StateTimeline)),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "MulticloudDataTransferConfig" }) as any as Schema.Schema<MulticloudDataTransferConfig>;

export interface ListMulticloudDataTransferConfigsResponse {
  /** The list of `MulticloudDataTransferConfig` resources to be listed. */
  multicloudDataTransferConfigs?: Array<MulticloudDataTransferConfig>;
  /** The next page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListMulticloudDataTransferConfigsResponse: Schema.Schema<ListMulticloudDataTransferConfigsResponse> = Schema.suspend(() => Schema.Struct({
  multicloudDataTransferConfigs: Schema.optional(Schema.Array(MulticloudDataTransferConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListMulticloudDataTransferConfigsResponse" }) as any as Schema.Schema<ListMulticloudDataTransferConfigsResponse>;

export interface DestinationEndpoint {
  /** Required. The ASN of the remote IP prefix. */
  asn?: string;
  /** Required. The CSP of the remote IP prefix. */
  csp?: string;
  /** Output only. The state of the `DestinationEndpoint` resource. */
  state?: "STATE_UNSPECIFIED" | "VALID" | "INVALID" | (string & {});
  /** Output only. Time when the `DestinationEndpoint` resource was updated. */
  updateTime?: string;
}

export const DestinationEndpoint: Schema.Schema<DestinationEndpoint> = Schema.suspend(() => Schema.Struct({
  asn: Schema.optional(Schema.String),
  csp: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationEndpoint" }) as any as Schema.Schema<DestinationEndpoint>;

export interface Destination {
  /** Identifier. The name of the `Destination` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}`. */
  name?: string;
  /** Output only. Time when the `Destination` resource was created. */
  createTime?: string;
  /** Output only. Time when the `Destination` resource was updated. */
  updateTime?: string;
  /** Optional. User-defined labels. */
  labels?: Record<string, string>;
  /** The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. A description of this resource. */
  description?: string;
  /** Required. Immutable. The IP prefix that represents your workload on another CSP. */
  ipPrefix?: string;
  /** Required. Unordered list. The list of `DestinationEndpoint` resources configured for the IP prefix. */
  endpoints?: Array<DestinationEndpoint>;
  /** Output only. The timeline of the expected `Destination` states or the current rest state. If a state change is expected, the value is `ADDING`, `DELETING` or `SUSPENDING`, depending on the action specified. Example: "state_timeline": { "states": [ { // The time when the `Destination` resource will be activated. "effectiveTime": "2024-12-01T08:00:00Z", "state": "ADDING" }, { // The time when the `Destination` resource will be suspended. "effectiveTime": "2024-12-01T20:00:00Z", "state": "SUSPENDING" } ] } */
  stateTimeline?: StateTimeline;
  /** Output only. The Google-generated unique ID for the `Destination` resource. This value is unique across all `Destination` resources. If a resource is deleted and another with the same name is created, the new resource is assigned a different and unique ID. */
  uid?: string;
}

export const Destination: Schema.Schema<Destination> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  ipPrefix: Schema.optional(Schema.String),
  endpoints: Schema.optional(Schema.Array(DestinationEndpoint)),
  stateTimeline: Schema.optional(StateTimeline),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "Destination" }) as any as Schema.Schema<Destination>;

export interface ListDestinationsResponse {
  /** The list of `Destination` resources to be listed. */
  destinations?: Array<Destination>;
  /** The next page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDestinationsResponse: Schema.Schema<ListDestinationsResponse> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Destination)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDestinationsResponse" }) as any as Schema.Schema<ListDestinationsResponse>;

export interface ServiceConfig {
  /** Output only. The eligibility criteria for the service. */
  eligibilityCriteria?: "ELIGIBILITY_CRITERIA_UNSPECIFIED" | "NETWORK_SERVICE_TIER_PREMIUM_ONLY" | "NETWORK_SERVICE_TIER_STANDARD_ONLY" | "REQUEST_ENDPOINT_REGIONAL_ENDPOINT_ONLY" | (string & {});
  /** Output only. The end time for eligibility criteria support. If not specified, no planned end time is set. */
  supportEndTime?: string;
}

export const ServiceConfig: Schema.Schema<ServiceConfig> = Schema.suspend(() => Schema.Struct({
  eligibilityCriteria: Schema.optional(Schema.String),
  supportEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceConfig" }) as any as Schema.Schema<ServiceConfig>;

export interface MulticloudDataTransferSupportedService {
  /** Identifier. The name of the service. */
  name?: string;
  /** Output only. The network service tier or regional endpoint supported for the service. */
  serviceConfigs?: Array<ServiceConfig>;
}

export const MulticloudDataTransferSupportedService: Schema.Schema<MulticloudDataTransferSupportedService> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceConfigs: Schema.optional(Schema.Array(ServiceConfig)),
})).annotate({ identifier: "MulticloudDataTransferSupportedService" }) as any as Schema.Schema<MulticloudDataTransferSupportedService>;

export interface ListMulticloudDataTransferSupportedServicesResponse {
  /** The list of supported services. */
  multicloudDataTransferSupportedServices?: Array<MulticloudDataTransferSupportedService>;
  /** The next page token. */
  nextPageToken?: string;
}

export const ListMulticloudDataTransferSupportedServicesResponse: Schema.Schema<ListMulticloudDataTransferSupportedServicesResponse> = Schema.suspend(() => Schema.Struct({
  multicloudDataTransferSupportedServices: Schema.optional(Schema.Array(MulticloudDataTransferSupportedService)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMulticloudDataTransferSupportedServicesResponse" }) as any as Schema.Schema<ListMulticloudDataTransferSupportedServicesResponse>;

export interface RoutingVPC {
  /** The URI of the VPC network. */
  uri?: string;
  /** Output only. If true, indicates that this VPC network is currently associated with spokes that use the data transfer feature (spokes where the site_to_site_data_transfer field is set to true). If you create new spokes that use data transfer, they must be associated with this VPC network. At most, one VPC network will have this field set to true. */
  requiredForNewSiteToSiteDataTransferSpokes?: boolean;
}

export const RoutingVPC: Schema.Schema<RoutingVPC> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  requiredForNewSiteToSiteDataTransferSpokes: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RoutingVPC" }) as any as Schema.Schema<RoutingVPC>;

export interface SpokeTypeCount {
  /** Output only. The type of the spokes. */
  spokeType?: "SPOKE_TYPE_UNSPECIFIED" | "VPN_TUNNEL" | "INTERCONNECT_ATTACHMENT" | "ROUTER_APPLIANCE" | "VPC_NETWORK" | "PRODUCER_VPC_NETWORK" | (string & {});
  /** Output only. The total number of spokes of this type that are associated with the hub. */
  count?: string;
}

export const SpokeTypeCount: Schema.Schema<SpokeTypeCount> = Schema.suspend(() => Schema.Struct({
  spokeType: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "SpokeTypeCount" }) as any as Schema.Schema<SpokeTypeCount>;

export interface SpokeStateCount {
  /** Output only. The state of the spokes. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ACCEPTING" | "REJECTING" | "UPDATING" | "INACTIVE" | "OBSOLETE" | "FAILED" | (string & {});
  /** Output only. The total number of spokes that are in this state and associated with a given hub. */
  count?: string;
}

export const SpokeStateCount: Schema.Schema<SpokeStateCount> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "SpokeStateCount" }) as any as Schema.Schema<SpokeStateCount>;

export interface SpokeStateReasonCount {
  /** Output only. The reason that a spoke is inactive. */
  stateReasonCode?: "CODE_UNSPECIFIED" | "PENDING_REVIEW" | "REJECTED" | "PAUSED" | "FAILED" | "UPDATE_PENDING_REVIEW" | "UPDATE_REJECTED" | "UPDATE_FAILED" | (string & {});
  /** Output only. The total number of spokes that are inactive for a particular reason and associated with a given hub. */
  count?: string;
}

export const SpokeStateReasonCount: Schema.Schema<SpokeStateReasonCount> = Schema.suspend(() => Schema.Struct({
  stateReasonCode: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "SpokeStateReasonCount" }) as any as Schema.Schema<SpokeStateReasonCount>;

export interface SpokeSummary {
  /** Output only. Counts the number of spokes of each type that are associated with a specific hub. */
  spokeTypeCounts?: Array<SpokeTypeCount>;
  /** Output only. Counts the number of spokes that are in each state and associated with a given hub. */
  spokeStateCounts?: Array<SpokeStateCount>;
  /** Output only. Counts the number of spokes that are inactive for each possible reason and associated with a given hub. */
  spokeStateReasonCounts?: Array<SpokeStateReasonCount>;
}

export const SpokeSummary: Schema.Schema<SpokeSummary> = Schema.suspend(() => Schema.Struct({
  spokeTypeCounts: Schema.optional(Schema.Array(SpokeTypeCount)),
  spokeStateCounts: Schema.optional(Schema.Array(SpokeStateCount)),
  spokeStateReasonCounts: Schema.optional(Schema.Array(SpokeStateReasonCount)),
})).annotate({ identifier: "SpokeSummary" }) as any as Schema.Schema<SpokeSummary>;

export interface Hub {
  /** Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}` */
  name?: string;
  /** Output only. The time the hub was created. */
  createTime?: string;
  /** Output only. The time the hub was last updated. */
  updateTime?: string;
  /** Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). */
  labels?: Record<string, string>;
  /** Optional. An optional description of the hub. */
  description?: string;
  /** Output only. The Google-generated UUID for the hub. This value is unique across all hub resources. If a hub is deleted and another with the same name is created, the new hub is assigned a different unique_id. */
  uniqueId?: string;
  /** Output only. The current lifecycle state of this hub. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ACCEPTING" | "REJECTING" | "UPDATING" | "INACTIVE" | "OBSOLETE" | "FAILED" | (string & {});
  /** Output only. The VPC networks associated with this hub's spokes. This field is read-only. Network Connectivity Center automatically populates it based on the set of spokes attached to the hub. */
  routingVpcs?: Array<RoutingVPC>;
  /** Output only. The route tables that belong to this hub. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}` This field is read-only. Network Connectivity Center automatically populates it based on the route tables nested under the hub. */
  routeTables?: Array<string>;
  /** Output only. A summary of the spokes associated with a hub. The summary includes a count of spokes according to type and according to state. If any spokes are inactive, the summary also lists the reasons they are inactive, including a count for each reason. */
  spokeSummary?: SpokeSummary;
  /** Optional. The policy mode of this hub. This field can be either PRESET or CUSTOM. If unspecified, the policy_mode defaults to PRESET. */
  policyMode?: "POLICY_MODE_UNSPECIFIED" | "PRESET" | (string & {});
  /** Optional. The topology implemented in this hub. Currently, this field is only used when policy_mode = PRESET. The available preset topologies are MESH and STAR. If preset_topology is unspecified and policy_mode = PRESET, the preset_topology defaults to MESH. When policy_mode = CUSTOM, the preset_topology is set to PRESET_TOPOLOGY_UNSPECIFIED. */
  presetTopology?: "PRESET_TOPOLOGY_UNSPECIFIED" | "MESH" | "STAR" | (string & {});
  /** Optional. Whether Private Service Connect connection propagation is enabled for the hub. If true, Private Service Connect endpoints in VPC spokes attached to the hub are made accessible to other VPC spokes attached to the hub. The default value is false. */
  exportPsc?: boolean;
}

export const Hub: Schema.Schema<Hub> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  uniqueId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  routingVpcs: Schema.optional(Schema.Array(RoutingVPC)),
  routeTables: Schema.optional(Schema.Array(Schema.String)),
  spokeSummary: Schema.optional(SpokeSummary),
  policyMode: Schema.optional(Schema.String),
  presetTopology: Schema.optional(Schema.String),
  exportPsc: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Hub" }) as any as Schema.Schema<Hub>;

export interface ListHubsResponse {
  /** The requested hubs. */
  hubs?: Array<Hub>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListHubsResponse: Schema.Schema<ListHubsResponse> = Schema.suspend(() => Schema.Struct({
  hubs: Schema.optional(Schema.Array(Hub)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListHubsResponse" }) as any as Schema.Schema<ListHubsResponse>;

export interface LinkedVpnTunnels {
  /** The URIs of linked VPN tunnel resources. */
  uris?: Array<string>;
  /** A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). */
  siteToSiteDataTransfer?: boolean;
  /** Output only. The VPC network where these VPN tunnels are located. */
  vpcNetwork?: string;
  /** Optional. Hub routes fully encompassed by include import ranges are included during import from hub. */
  includeImportRanges?: Array<string>;
}

export const LinkedVpnTunnels: Schema.Schema<LinkedVpnTunnels> = Schema.suspend(() => Schema.Struct({
  uris: Schema.optional(Schema.Array(Schema.String)),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
  vpcNetwork: Schema.optional(Schema.String),
  includeImportRanges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LinkedVpnTunnels" }) as any as Schema.Schema<LinkedVpnTunnels>;

export interface LinkedInterconnectAttachments {
  /** The URIs of linked interconnect attachment resources */
  uris?: Array<string>;
  /** A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). */
  siteToSiteDataTransfer?: boolean;
  /** Output only. The VPC network where these VLAN attachments are located. */
  vpcNetwork?: string;
  /** Optional. Hub routes fully encompassed by include import ranges are included during import from hub. */
  includeImportRanges?: Array<string>;
}

export const LinkedInterconnectAttachments: Schema.Schema<LinkedInterconnectAttachments> = Schema.suspend(() => Schema.Struct({
  uris: Schema.optional(Schema.Array(Schema.String)),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
  vpcNetwork: Schema.optional(Schema.String),
  includeImportRanges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LinkedInterconnectAttachments" }) as any as Schema.Schema<LinkedInterconnectAttachments>;

export interface RouterApplianceInstance {
  /** The URI of the VM. */
  virtualMachine?: string;
  /** The IP address on the VM to use for peering. */
  ipAddress?: string;
}

export const RouterApplianceInstance: Schema.Schema<RouterApplianceInstance> = Schema.suspend(() => Schema.Struct({
  virtualMachine: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "RouterApplianceInstance" }) as any as Schema.Schema<RouterApplianceInstance>;

export interface LinkedRouterApplianceInstances {
  /** The list of router appliance instances. */
  instances?: Array<RouterApplianceInstance>;
  /** A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). */
  siteToSiteDataTransfer?: boolean;
  /** Output only. The VPC network where these router appliance instances are located. */
  vpcNetwork?: string;
  /** Optional. Hub routes fully encompassed by include import ranges are included during import from hub. */
  includeImportRanges?: Array<string>;
}

export const LinkedRouterApplianceInstances: Schema.Schema<LinkedRouterApplianceInstances> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(RouterApplianceInstance)),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
  vpcNetwork: Schema.optional(Schema.String),
  includeImportRanges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LinkedRouterApplianceInstances" }) as any as Schema.Schema<LinkedRouterApplianceInstances>;

export interface LinkedVpcNetwork {
  /** Required. The URI of the VPC network resource. */
  uri?: string;
  /** Optional. IP ranges encompassing the subnets to be excluded from peering. */
  excludeExportRanges?: Array<string>;
  /** Optional. IP ranges allowed to be included from peering. */
  includeExportRanges?: Array<string>;
  /** Output only. The proposed include export IP ranges waiting for hub administrator's approval. */
  proposedIncludeExportRanges?: Array<string>;
  /** Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. */
  proposedExcludeExportRanges?: Array<string>;
  /** Output only. The list of Producer VPC spokes that this VPC spoke is a service consumer VPC spoke for. These producer VPCs are connected through VPC peering to this spoke's backing VPC network. Because they are directly connected through VPC peering, NCC export filters do not apply between the service consumer VPC spoke and any of its producer VPC spokes. This VPC spoke cannot be deleted as long as any of these producer VPC spokes are connected to the NCC Hub. */
  producerVpcSpokes?: Array<string>;
}

export const LinkedVpcNetwork: Schema.Schema<LinkedVpcNetwork> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  excludeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  includeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  proposedIncludeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  proposedExcludeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  producerVpcSpokes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LinkedVpcNetwork" }) as any as Schema.Schema<LinkedVpcNetwork>;

export interface LinkedProducerVpcNetwork {
  /** Immutable. The URI of the Service Consumer VPC that the Producer VPC is peered with. */
  network?: string;
  /** Output only. The Service Consumer Network spoke. */
  serviceConsumerVpcSpoke?: string;
  /** Immutable. The name of the VPC peering between the Service Consumer VPC and the Producer VPC (defined in the Tenant project) which is added to the NCC hub. This peering must be in ACTIVE state. */
  peering?: string;
  /** Output only. The URI of the Producer VPC. */
  producerNetwork?: string;
  /** Optional. IP ranges encompassing the subnets to be excluded from peering. */
  excludeExportRanges?: Array<string>;
  /** Optional. IP ranges allowed to be included from peering. */
  includeExportRanges?: Array<string>;
  /** Output only. The proposed include export IP ranges waiting for hub administrator's approval. */
  proposedIncludeExportRanges?: Array<string>;
  /** Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. */
  proposedExcludeExportRanges?: Array<string>;
}

export const LinkedProducerVpcNetwork: Schema.Schema<LinkedProducerVpcNetwork> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  serviceConsumerVpcSpoke: Schema.optional(Schema.String),
  peering: Schema.optional(Schema.String),
  producerNetwork: Schema.optional(Schema.String),
  excludeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  includeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  proposedIncludeExportRanges: Schema.optional(Schema.Array(Schema.String)),
  proposedExcludeExportRanges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LinkedProducerVpcNetwork" }) as any as Schema.Schema<LinkedProducerVpcNetwork>;

export interface StateReason {
  /** The code associated with this reason. */
  code?: "CODE_UNSPECIFIED" | "PENDING_REVIEW" | "REJECTED" | "PAUSED" | "FAILED" | "UPDATE_PENDING_REVIEW" | "UPDATE_REJECTED" | "UPDATE_FAILED" | (string & {});
  /** Human-readable details about this reason. */
  message?: string;
  /** Additional information provided by the user in the RejectSpoke call. */
  userDetails?: string;
}

export const StateReason: Schema.Schema<StateReason> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  userDetails: Schema.optional(Schema.String),
})).annotate({ identifier: "StateReason" }) as any as Schema.Schema<StateReason>;

export interface Spoke {
  /** Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}` */
  name?: string;
  /** Output only. The time the spoke was created. */
  createTime?: string;
  /** Output only. The time the spoke was last updated. */
  updateTime?: string;
  /** Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). */
  labels?: Record<string, string>;
  /** Optional. An optional description of the spoke. */
  description?: string;
  /** Immutable. The name of the hub that this spoke is attached to. */
  hub?: string;
  /** Optional. The name of the group that this spoke is associated with. */
  group?: string;
  /** Optional. VPN tunnels that are associated with the spoke. */
  linkedVpnTunnels?: LinkedVpnTunnels;
  /** Optional. VLAN attachments that are associated with the spoke. */
  linkedInterconnectAttachments?: LinkedInterconnectAttachments;
  /** Optional. Router appliance instances that are associated with the spoke. */
  linkedRouterApplianceInstances?: LinkedRouterApplianceInstances;
  /** Optional. VPC network that is associated with the spoke. */
  linkedVpcNetwork?: LinkedVpcNetwork;
  /** Optional. The linked producer VPC that is associated with the spoke. */
  linkedProducerVpcNetwork?: LinkedProducerVpcNetwork;
  /** Output only. The Google-generated UUID for the spoke. This value is unique across all spoke resources. If a spoke is deleted and another with the same name is created, the new spoke is assigned a different `unique_id`. */
  uniqueId?: string;
  /** Output only. The current lifecycle state of this spoke. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ACCEPTING" | "REJECTING" | "UPDATING" | "INACTIVE" | "OBSOLETE" | "FAILED" | (string & {});
  /** Output only. The reasons for current state of the spoke. */
  reasons?: Array<StateReason>;
  /** Output only. The type of resource associated with the spoke. */
  spokeType?: "SPOKE_TYPE_UNSPECIFIED" | "VPN_TUNNEL" | "INTERCONNECT_ATTACHMENT" | "ROUTER_APPLIANCE" | "VPC_NETWORK" | "PRODUCER_VPC_NETWORK" | (string & {});
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. The list of fields waiting for hub administrator's approval. */
  fieldPathsPendingUpdate?: Array<string>;
}

export const Spoke: Schema.Schema<Spoke> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  hub: Schema.optional(Schema.String),
  group: Schema.optional(Schema.String),
  linkedVpnTunnels: Schema.optional(LinkedVpnTunnels),
  linkedInterconnectAttachments: Schema.optional(LinkedInterconnectAttachments),
  linkedRouterApplianceInstances: Schema.optional(LinkedRouterApplianceInstances),
  linkedVpcNetwork: Schema.optional(LinkedVpcNetwork),
  linkedProducerVpcNetwork: Schema.optional(LinkedProducerVpcNetwork),
  uniqueId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  reasons: Schema.optional(Schema.Array(StateReason)),
  spokeType: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  fieldPathsPendingUpdate: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Spoke" }) as any as Schema.Schema<Spoke>;

export interface ListHubSpokesResponse {
  /** The requested spokes. The spoke fields can be partially populated based on the `view` field in the request message. */
  spokes?: Array<Spoke>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListHubSpokesResponse: Schema.Schema<ListHubSpokesResponse> = Schema.suspend(() => Schema.Struct({
  spokes: Schema.optional(Schema.Array(Spoke)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListHubSpokesResponse" }) as any as Schema.Schema<ListHubSpokesResponse>;

export interface PscPropagationStatus {
  /** The name of the spoke that the source forwarding rule belongs to. */
  sourceSpoke?: string;
  /** The name of the group that the source spoke belongs to. */
  sourceGroup?: string;
  /** The name of the forwarding rule exported to the hub. */
  sourceForwardingRule?: string;
  /** The name of the spoke that the source forwarding rule propagates to. */
  targetSpoke?: string;
  /** The name of the group that the target spoke belongs to. */
  targetGroup?: string;
  /** The propagation status. */
  code?: "CODE_UNSPECIFIED" | "READY" | "PROPAGATING" | "ERROR_PRODUCER_PROPAGATED_CONNECTION_LIMIT_EXCEEDED" | "ERROR_PRODUCER_NAT_IP_SPACE_EXHAUSTED" | "ERROR_PRODUCER_QUOTA_EXCEEDED" | "ERROR_CONSUMER_QUOTA_EXCEEDED" | (string & {});
  /** The human-readable summary of the Private Service Connect connection propagation status. */
  message?: string;
}

export const PscPropagationStatus: Schema.Schema<PscPropagationStatus> = Schema.suspend(() => Schema.Struct({
  sourceSpoke: Schema.optional(Schema.String),
  sourceGroup: Schema.optional(Schema.String),
  sourceForwardingRule: Schema.optional(Schema.String),
  targetSpoke: Schema.optional(Schema.String),
  targetGroup: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "PscPropagationStatus" }) as any as Schema.Schema<PscPropagationStatus>;

export interface HubStatusEntry {
  /** The number of propagated Private Service Connect connections with this status. If the `group_by` field was not set in the request message, the value of this field is 1. */
  count?: number;
  /** The fields that this entry is grouped by. This has the same value as the `group_by` field in the request message. */
  groupBy?: string;
  /** The Private Service Connect propagation status. */
  pscPropagationStatus?: PscPropagationStatus;
}

export const HubStatusEntry: Schema.Schema<HubStatusEntry> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.Number),
  groupBy: Schema.optional(Schema.String),
  pscPropagationStatus: Schema.optional(PscPropagationStatus),
})).annotate({ identifier: "HubStatusEntry" }) as any as Schema.Schema<HubStatusEntry>;

export interface QueryHubStatusResponse {
  /** The list of hub status. */
  hubStatusEntries?: Array<HubStatusEntry>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
}

export const QueryHubStatusResponse: Schema.Schema<QueryHubStatusResponse> = Schema.suspend(() => Schema.Struct({
  hubStatusEntries: Schema.optional(Schema.Array(HubStatusEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryHubStatusResponse" }) as any as Schema.Schema<QueryHubStatusResponse>;

export interface ListSpokesResponse {
  /** The requested spokes. */
  spokes?: Array<Spoke>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSpokesResponse: Schema.Schema<ListSpokesResponse> = Schema.suspend(() => Schema.Struct({
  spokes: Schema.optional(Schema.Array(Spoke)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSpokesResponse" }) as any as Schema.Schema<ListSpokesResponse>;

export interface RejectHubSpokeRequest {
  /** Required. The URI of the spoke to reject from the hub. */
  spokeUri?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Additional information provided by the hub administrator. */
  details?: string;
}

export const RejectHubSpokeRequest: Schema.Schema<RejectHubSpokeRequest> = Schema.suspend(() => Schema.Struct({
  spokeUri: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "RejectHubSpokeRequest" }) as any as Schema.Schema<RejectHubSpokeRequest>;

export interface AcceptHubSpokeRequest {
  /** Required. The URI of the spoke to accept into the hub. */
  spokeUri?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const AcceptHubSpokeRequest: Schema.Schema<AcceptHubSpokeRequest> = Schema.suspend(() => Schema.Struct({
  spokeUri: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceptHubSpokeRequest" }) as any as Schema.Schema<AcceptHubSpokeRequest>;

export interface AcceptSpokeUpdateRequest {
  /** Required. The URI of the spoke to accept update. */
  spokeUri?: string;
  /** Required. The etag of the spoke to accept update. */
  spokeEtag?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const AcceptSpokeUpdateRequest: Schema.Schema<AcceptSpokeUpdateRequest> = Schema.suspend(() => Schema.Struct({
  spokeUri: Schema.optional(Schema.String),
  spokeEtag: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceptSpokeUpdateRequest" }) as any as Schema.Schema<AcceptSpokeUpdateRequest>;

export interface RejectSpokeUpdateRequest {
  /** Required. The URI of the spoke to reject update. */
  spokeUri?: string;
  /** Required. The etag of the spoke to reject update. */
  spokeEtag?: string;
  /** Optional. Additional information provided by the hub administrator. */
  details?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RejectSpokeUpdateRequest: Schema.Schema<RejectSpokeUpdateRequest> = Schema.suspend(() => Schema.Struct({
  spokeUri: Schema.optional(Schema.String),
  spokeEtag: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RejectSpokeUpdateRequest" }) as any as Schema.Schema<RejectSpokeUpdateRequest>;

export interface RouteTable {
  /** Immutable. The name of the route table. Route table names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/routeTables/{route_table_id}` */
  name?: string;
  /** Output only. The time the route table was created. */
  createTime?: string;
  /** Output only. The time the route table was last updated. */
  updateTime?: string;
  /** Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). */
  labels?: Record<string, string>;
  /** An optional description of the route table. */
  description?: string;
  /** Output only. The Google-generated UUID for the route table. This value is unique across all route table resources. If a route table is deleted and another with the same name is created, the new route table is assigned a different `uid`. */
  uid?: string;
  /** Output only. The current lifecycle state of this route table. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ACCEPTING" | "REJECTING" | "UPDATING" | "INACTIVE" | "OBSOLETE" | "FAILED" | (string & {});
}

export const RouteTable: Schema.Schema<RouteTable> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "RouteTable" }) as any as Schema.Schema<RouteTable>;

export interface NextHopVpcNetwork {
  /** The URI of the VPC network resource */
  uri?: string;
}

export const NextHopVpcNetwork: Schema.Schema<NextHopVpcNetwork> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "NextHopVpcNetwork" }) as any as Schema.Schema<NextHopVpcNetwork>;

export interface NextHopVPNTunnel {
  /** The URI of the VPN tunnel resource. */
  uri?: string;
  /** The VPC network where this VPN tunnel is located. */
  vpcNetwork?: string;
  /** Indicates whether site-to-site data transfer is allowed for this VPN tunnel resource. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). */
  siteToSiteDataTransfer?: boolean;
}

export const NextHopVPNTunnel: Schema.Schema<NextHopVPNTunnel> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  vpcNetwork: Schema.optional(Schema.String),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NextHopVPNTunnel" }) as any as Schema.Schema<NextHopVPNTunnel>;

export interface NextHopRouterApplianceInstance {
  /** The URI of the Router appliance instance. */
  uri?: string;
  /** The VPC network where this VM is located. */
  vpcNetwork?: string;
  /** Indicates whether site-to-site data transfer is allowed for this Router appliance instance resource. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). */
  siteToSiteDataTransfer?: boolean;
}

export const NextHopRouterApplianceInstance: Schema.Schema<NextHopRouterApplianceInstance> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  vpcNetwork: Schema.optional(Schema.String),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NextHopRouterApplianceInstance" }) as any as Schema.Schema<NextHopRouterApplianceInstance>;

export interface NextHopInterconnectAttachment {
  /** The URI of the interconnect attachment resource. */
  uri?: string;
  /** The VPC network where this interconnect attachment is located. */
  vpcNetwork?: string;
  /** Indicates whether site-to-site data transfer is allowed for this interconnect attachment resource. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). */
  siteToSiteDataTransfer?: boolean;
}

export const NextHopInterconnectAttachment: Schema.Schema<NextHopInterconnectAttachment> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  vpcNetwork: Schema.optional(Schema.String),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NextHopInterconnectAttachment" }) as any as Schema.Schema<NextHopInterconnectAttachment>;

export interface NextHopSpoke {
  /** The URI of the spoke resource. */
  uri?: string;
  /** Indicates whether site-to-site data transfer is allowed for this spoke resource. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). Whether this route is accessible to other hybrid spokes with site-to-site data transfer enabled. If this is false, the route is only accessible to VPC spokes of the connected Hub. */
  siteToSiteDataTransfer?: boolean;
}

export const NextHopSpoke: Schema.Schema<NextHopSpoke> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  siteToSiteDataTransfer: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NextHopSpoke" }) as any as Schema.Schema<NextHopSpoke>;

export interface Route {
  /** Immutable. The name of the route. Route names must be unique. Route names use the following form: `projects/{project_number}/locations/global/hubs/{hub}/routeTables/{route_table_id}/routes/{route_id}` */
  name?: string;
  /** Output only. The time the route was created. */
  createTime?: string;
  /** Output only. The time the route was last updated. */
  updateTime?: string;
  /** The destination IP address range. */
  ipCidrRange?: string;
  /** Output only. The route's type. Its type is determined by the properties of its IP address range. */
  type?: "ROUTE_TYPE_UNSPECIFIED" | "VPC_PRIMARY_SUBNET" | "VPC_SECONDARY_SUBNET" | "DYNAMIC_ROUTE" | (string & {});
  /** Immutable. The destination VPC network for packets on this route. */
  nextHopVpcNetwork?: NextHopVpcNetwork;
  /** Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). */
  labels?: Record<string, string>;
  /** An optional description of the route. */
  description?: string;
  /** Output only. The Google-generated UUID for the route. This value is unique across all Network Connectivity Center route resources. If a route is deleted and another with the same name is created, the new route is assigned a different `uid`. */
  uid?: string;
  /** Output only. The current lifecycle state of the route. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ACCEPTING" | "REJECTING" | "UPDATING" | "INACTIVE" | "OBSOLETE" | "FAILED" | (string & {});
  /** Immutable. The spoke that this route leads to. Example: projects/12345/locations/global/spokes/SPOKE */
  spoke?: string;
  /** Output only. The origin location of the route. Uses the following form: "projects/{project}/locations/{location}" Example: projects/1234/locations/us-central1 */
  location?: string;
  /** Output only. The priority of this route. Priority is used to break ties in cases where a destination matches more than one route. In these cases the route with the lowest-numbered priority value wins. */
  priority?: string;
  /** Immutable. The next-hop VPN tunnel for packets on this route. */
  nextHopVpnTunnel?: NextHopVPNTunnel;
  /** Immutable. The next-hop Router appliance instance for packets on this route. */
  nextHopRouterApplianceInstance?: NextHopRouterApplianceInstance;
  /** Immutable. The next-hop VLAN attachment for packets on this route. */
  nextHopInterconnectAttachment?: NextHopInterconnectAttachment;
  /** Immutable. The next-hop spoke for packets on this route. */
  nextHopSpoke?: NextHopSpoke;
}

export const Route: Schema.Schema<Route> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  nextHopVpcNetwork: Schema.optional(NextHopVpcNetwork),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  spoke: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  nextHopVpnTunnel: Schema.optional(NextHopVPNTunnel),
  nextHopRouterApplianceInstance: Schema.optional(NextHopRouterApplianceInstance),
  nextHopInterconnectAttachment: Schema.optional(NextHopInterconnectAttachment),
  nextHopSpoke: Schema.optional(NextHopSpoke),
})).annotate({ identifier: "Route" }) as any as Schema.Schema<Route>;

export interface ListRoutesResponse {
  /** The requested routes. */
  routes?: Array<Route>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
  /** RouteTables that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRoutesResponse: Schema.Schema<ListRoutesResponse> = Schema.suspend(() => Schema.Struct({
  routes: Schema.optional(Schema.Array(Route)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRoutesResponse" }) as any as Schema.Schema<ListRoutesResponse>;

export interface ListRouteTablesResponse {
  /** The requested route tables. */
  routeTables?: Array<RouteTable>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
  /** Hubs that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRouteTablesResponse: Schema.Schema<ListRouteTablesResponse> = Schema.suspend(() => Schema.Struct({
  routeTables: Schema.optional(Schema.Array(RouteTable)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRouteTablesResponse" }) as any as Schema.Schema<ListRouteTablesResponse>;

export interface AutoAccept {
  /** Optional. A list of project ids or project numbers for which you want to enable auto-accept. The auto-accept setting is applied to spokes being created or updated in these projects. */
  autoAcceptProjects?: Array<string>;
}

export const AutoAccept: Schema.Schema<AutoAccept> = Schema.suspend(() => Schema.Struct({
  autoAcceptProjects: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AutoAccept" }) as any as Schema.Schema<AutoAccept>;

export interface Group {
  /** Immutable. The name of the group. Group names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/groups/{group_id}` */
  name?: string;
  /** Output only. The time the group was created. */
  createTime?: string;
  /** Output only. The time the group was last updated. */
  updateTime?: string;
  /** Optional. Labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). */
  labels?: Record<string, string>;
  /** Optional. The description of the group. */
  description?: string;
  /** Output only. The Google-generated UUID for the group. This value is unique across all group resources. If a group is deleted and another with the same name is created, the new route table is assigned a different unique_id. */
  uid?: string;
  /** Output only. The current lifecycle state of this group. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "ACCEPTING" | "REJECTING" | "UPDATING" | "INACTIVE" | "OBSOLETE" | "FAILED" | (string & {});
  /** Optional. The auto-accept setting for this group. */
  autoAccept?: AutoAccept;
  /** Output only. The name of the route table that corresponds to this group. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}` */
  routeTable?: string;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  autoAccept: Schema.optional(AutoAccept),
  routeTable: Schema.optional(Schema.String),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface ListGroupsResponse {
  /** The requested groups. */
  groups?: Array<Group>;
  /** The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. */
  nextPageToken?: string;
  /** Hubs that could not be reached. */
  unreachable?: Array<string>;
}

export const ListGroupsResponse: Schema.Schema<ListGroupsResponse> = Schema.suspend(() => Schema.Struct({
  groups: Schema.optional(Schema.Array(Group)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListGroupsResponse" }) as any as Schema.Schema<ListGroupsResponse>;

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
  /** Optional. Allocation strategy Not setting this field when the allocation is requested means an implementation defined strategy is used. */
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
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** Optional. A description of this resource. */
  description?: string;
  /** Optional. The IP range that this internal range defines. NOTE: IPv6 ranges are limited to usage=EXTERNAL_TO_VPC and peering=FOR_SELF. NOTE: For IPv6 Ranges this field is compulsory, i.e. the address range must be specified explicitly. */
  ipCidrRange?: string;
  /** Immutable. The URL or resource ID of the network in which to reserve the internal range. The network cannot be deleted if there are any reserved internal ranges referring to it. Legacy networks are not supported. For example: https://www.googleapis.com/compute/v1/projects/{project}/locations/global/networks/{network} projects/{project}/locations/global/networks/{network} {network} */
  network?: string;
  /** Optional. The type of usage set for this InternalRange. */
  usage?: "USAGE_UNSPECIFIED" | "FOR_VPC" | "EXTERNAL_TO_VPC" | "FOR_MIGRATION" | (string & {});
  /** Optional. The type of peering set for this internal range. */
  peering?: "PEERING_UNSPECIFIED" | "FOR_SELF" | "FOR_PEER" | "NOT_SHARED" | (string & {});
  /** Optional. An alternate to ip_cidr_range. Can be set when trying to create an IPv4 reservation that automatically finds a free range of the given size. If both ip_cidr_range and prefix_length are set, there is an error if the range sizes do not match. Can also be used during updates to change the range size. NOTE: For IPv6 this field only works if ip_cidr_range is set as well, and both fields must match. In other words, with IPv6 this field only works as a redundant parameter. */
  prefixLength?: number;
  /** Optional. Can be set to narrow down or pick a different address space while searching for a free range. If not set, defaults to the ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"] address space (for auto-mode networks, the "10.0.0.0/9" range is used instead of "10.0.0.0/8"). This can be used to target the search in other rfc-1918 address spaces like "172.16.0.0/12" and "192.168.0.0/16" or non-rfc-1918 address spaces used in the VPC. */
  targetCidrRange?: Array<string>;
  /** Output only. The list of resources that refer to this internal range. Resources that use the internal range for their range allocation are referred to as users of the range. Other resources mark themselves as users while doing so by creating a reference to this internal range. Having a user, based on this reference, prevents deletion of the internal range referred to. Can be empty. */
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
  /** Internal ranges to be returned. */
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

export interface VirtualMachine {
  /** Optional. A list of VM instance tags that this policy-based route applies to. VM instances that have ANY of tags specified here installs this PBR. */
  tags?: Array<string>;
}

export const VirtualMachine: Schema.Schema<VirtualMachine> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VirtualMachine" }) as any as Schema.Schema<VirtualMachine>;

export interface InterconnectAttachment {
  /** Optional. Cloud region to install this policy-based route on interconnect attachment. Use `all` to install it on all interconnect attachments. */
  region?: string;
}

export const InterconnectAttachment: Schema.Schema<InterconnectAttachment> = Schema.suspend(() => Schema.Struct({
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "InterconnectAttachment" }) as any as Schema.Schema<InterconnectAttachment>;

export interface Filter {
  /** Optional. The IP protocol that this policy-based route applies to. Valid values are 'TCP', 'UDP', and 'ALL'. Default is 'ALL'. */
  ipProtocol?: string;
  /** Optional. The source IP range of outgoing packets that this policy-based route applies to. Default is "0.0.0.0/0" if protocol version is IPv4 and "::/0" if protocol version is IPv6. */
  srcRange?: string;
  /** Optional. The destination IP range of outgoing packets that this policy-based route applies to. Default is "0.0.0.0/0" if protocol version is IPv4 and "::/0" if protocol version is IPv6. */
  destRange?: string;
  /** Required. Internet protocol versions this policy-based route applies to. IPV4 and IPV6 is supported. */
  protocolVersion?: "PROTOCOL_VERSION_UNSPECIFIED" | "IPV4" | "IPV6" | (string & {});
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  ipProtocol: Schema.optional(Schema.String),
  srcRange: Schema.optional(Schema.String),
  destRange: Schema.optional(Schema.String),
  protocolVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface Warnings {
  /** Output only. A warning code, if applicable. */
  code?: "WARNING_UNSPECIFIED" | "RESOURCE_NOT_ACTIVE" | "RESOURCE_BEING_MODIFIED" | (string & {});
  /** Output only. Metadata about this warning in key: value format. The key should provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be scope and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement. */
  data?: Record<string, string>;
  /** Output only. A human-readable description of the warning code. */
  warningMessage?: string;
}

export const Warnings: Schema.Schema<Warnings> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  warningMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "Warnings" }) as any as Schema.Schema<Warnings>;

export interface PolicyBasedRoute {
  /** Optional. VM instances that this policy-based route applies to. */
  virtualMachine?: VirtualMachine;
  /** Optional. The interconnect attachments that this policy-based route applies to. */
  interconnectAttachment?: InterconnectAttachment;
  /** Optional. The IP address of a global-access-enabled L4 ILB that is the next hop for matching packets. For this version, only nextHopIlbIp is supported. */
  nextHopIlbIp?: string;
  /** Optional. Other routes that will be referenced to determine the next hop of the packet. */
  nextHopOtherRoutes?: "OTHER_ROUTES_UNSPECIFIED" | "DEFAULT_ROUTING" | (string & {});
  /** Immutable. Identifier. A unique name of the resource in the form of `projects/{project_number}/locations/global/PolicyBasedRoutes/{policy_based_route_id}` */
  name?: string;
  /** Output only. Time when the policy-based route was created. */
  createTime?: string;
  /** Output only. Time when the policy-based route was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** Optional. An optional description of this resource. Provide this field when you create the resource. */
  description?: string;
  /** Required. Fully-qualified URL of the network that this route applies to, for example: projects/my-project/global/networks/my-network. */
  network?: string;
  /** Required. The filter to match L4 traffic. */
  filter?: Filter;
  /** Optional. The priority of this policy-based route. Priority is used to break ties in cases where there are more than one matching policy-based routes found. In cases where multiple policy-based routes are matched, the one with the lowest-numbered priority value wins. The default value is 1000. The priority value must be from 1 to 65535, inclusive. */
  priority?: number;
  /** Output only. If potential misconfigurations are detected for this route, this field will be populated with warning messages. */
  warnings?: Array<Warnings>;
  /** Output only. Server-defined fully-qualified URL for this resource. */
  selfLink?: string;
  /** Output only. Type of this resource. Always networkconnectivity#policyBasedRoute for policy-based Route resources. */
  kind?: string;
}

export const PolicyBasedRoute: Schema.Schema<PolicyBasedRoute> = Schema.suspend(() => Schema.Struct({
  virtualMachine: Schema.optional(VirtualMachine),
  interconnectAttachment: Schema.optional(InterconnectAttachment),
  nextHopIlbIp: Schema.optional(Schema.String),
  nextHopOtherRoutes: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  filter: Schema.optional(Filter),
  priority: Schema.optional(Schema.Number),
  warnings: Schema.optional(Schema.Array(Warnings)),
  selfLink: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyBasedRoute" }) as any as Schema.Schema<PolicyBasedRoute>;

export interface ListPolicyBasedRoutesResponse {
  /** Policy-based routes to be returned. */
  policyBasedRoutes?: Array<PolicyBasedRoute>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListPolicyBasedRoutesResponse: Schema.Schema<ListPolicyBasedRoutesResponse> = Schema.suspend(() => Schema.Struct({
  policyBasedRoutes: Schema.optional(Schema.Array(PolicyBasedRoute)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPolicyBasedRoutesResponse" }) as any as Schema.Schema<ListPolicyBasedRoutesResponse>;

export interface RegionalEndpoint {
  /** Output only. The name of a RegionalEndpoint. Pattern: `projects/{project}/locations/{location}/regionalEndpoints/^[-a-z0-9](?:[-a-z0-9]{0,44})[a-z0-9]$`. */
  name?: string;
  /** Output only. Time when the RegionalEndpoint was created. */
  createTime?: string;
  /** Output only. Time when the RegionalEndpoint was updated. */
  updateTime?: string;
  /** User-defined labels. */
  labels?: Record<string, string>;
  /** Optional. A description of this resource. */
  description?: string;
  /** Required. The service endpoint this private regional endpoint connects to. Format: `{apiname}.{region}.p.rep.googleapis.com` Example: "cloudkms.us-central1.p.rep.googleapis.com". */
  targetGoogleApi?: string;
  /** Optional. The name of the VPC network for this private regional endpoint. Format: `projects/{project}/global/networks/{network}` */
  network?: string;
  /** Optional. The name of the subnetwork from which the IP address will be allocated. Format: `projects/{project}/regions/{region}/subnetworks/{subnetwork}` */
  subnetwork?: string;
  /** Required. The access type of this regional endpoint. This field is reflected in the PSC Forwarding Rule configuration to enable global access. */
  accessType?: "ACCESS_TYPE_UNSPECIFIED" | "GLOBAL" | "REGIONAL" | (string & {});
  /** Output only. The resource reference of the PSC Forwarding Rule created on behalf of the customer. Format: `//compute.googleapis.com/projects/{project}/regions/{region}/forwardingRules/{forwarding_rule_name}` */
  pscForwardingRule?: string;
  /** Output only. The literal IP address of the PSC Forwarding Rule created on behalf of the customer. This field is deprecated. Use address instead. */
  ipAddress?: string;
  /** Optional. The IP Address of the Regional Endpoint. When no address is provided, an IP from the subnetwork is allocated. Use one of the following formats: * IPv4 address as in `10.0.0.1` * Address resource URI as in `projects/{project}/regions/{region}/addresses/{address_name}` for an IPv4 or IPv6 address. */
  address?: string;
}

export const RegionalEndpoint: Schema.Schema<RegionalEndpoint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  targetGoogleApi: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  accessType: Schema.optional(Schema.String),
  pscForwardingRule: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalEndpoint" }) as any as Schema.Schema<RegionalEndpoint>;

export interface ListRegionalEndpointsResponse {
  /** Regional endpoints to be returned. */
  regionalEndpoints?: Array<RegionalEndpoint>;
  /** The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRegionalEndpointsResponse: Schema.Schema<ListRegionalEndpointsResponse> = Schema.suspend(() => Schema.Struct({
  regionalEndpoints: Schema.optional(Schema.Array(RegionalEndpoint)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRegionalEndpointsResponse" }) as any as Schema.Schema<ListRegionalEndpointsResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
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

export interface LocationMetadata {
  /** List of supported features */
  locationFeatures?: Array<"LOCATION_FEATURE_UNSPECIFIED" | "SITE_TO_CLOUD_SPOKES" | "SITE_TO_SITE_SPOKES" | "GATEWAY_SPOKES" | (string & {})>;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  locationFeatures: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

export interface AcceptHubSpokeResponse {
  /** The spoke that was operated on. */
  spoke?: Spoke;
}

export const AcceptHubSpokeResponse: Schema.Schema<AcceptHubSpokeResponse> = Schema.suspend(() => Schema.Struct({
  spoke: Schema.optional(Spoke),
})).annotate({ identifier: "AcceptHubSpokeResponse" }) as any as Schema.Schema<AcceptHubSpokeResponse>;

export interface RejectHubSpokeResponse {
  /** The spoke that was operated on. */
  spoke?: Spoke;
}

export const RejectHubSpokeResponse: Schema.Schema<RejectHubSpokeResponse> = Schema.suspend(() => Schema.Struct({
  spoke: Schema.optional(Spoke),
})).annotate({ identifier: "RejectHubSpokeResponse" }) as any as Schema.Schema<RejectHubSpokeResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** CheckConsumerConfig validates the consumer network and project for potential PSC connection creation. This method performs several checks, including: - Validating the existence and permissions of the service class. - Ensuring the consumer network exists and is accessible. - Verifying XPN relationships if applicable. - Checking for compatible IP versions between the consumer network and the requested version. This method performs a dynamic IAM check for the `networkconnectivity.serviceClasses.use` permission on the service class resource in the Prepare phase. */
export interface CheckConsumerConfigProjectsLocationsRequest {
  /** Required. The location resource path. Example: - projects/{project}/locations/{location} */
  location: string;
  /** Request body */
  body?: CheckConsumerConfigRequest;
}

export const CheckConsumerConfigProjectsLocationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(CheckConsumerConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:checkConsumerConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckConsumerConfigProjectsLocationsRequest>;

export type CheckConsumerConfigProjectsLocationsResponse = CheckConsumerConfigResponse;
export const CheckConsumerConfigProjectsLocationsResponse = CheckConsumerConfigResponse;

export type CheckConsumerConfigProjectsLocationsError = CommonErrors;

export const checkConsumerConfigProjectsLocations: API.OperationMethod<CheckConsumerConfigProjectsLocationsRequest, CheckConsumerConfigProjectsLocationsResponse, CheckConsumerConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckConsumerConfigProjectsLocationsRequest,
  output: CheckConsumerConfigProjectsLocationsResponse,
  errors: [],
}));

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

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

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

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

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
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
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

/** Lists ServiceConnectionMaps in a given project and location. */
export interface ListProjectsLocationsServiceConnectionMapsRequest {
  /** Required. The parent resource's name. ex. projects/123/locations/us-east1 */
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

export const ListProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServiceConnectionMapsRequest>;

export type ListProjectsLocationsServiceConnectionMapsResponse = ListServiceConnectionMapsResponse;
export const ListProjectsLocationsServiceConnectionMapsResponse = ListServiceConnectionMapsResponse;

export type ListProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const listProjectsLocationsServiceConnectionMaps = API.makePaginated(() => ({
  input: ListProjectsLocationsServiceConnectionMapsRequest,
  output: ListProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ServiceConnectionMap. */
export interface GetProjectsLocationsServiceConnectionMapsRequest {
  /** Required. Name of the ServiceConnectionMap to get. */
  name: string;
}

export const GetProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps/{serviceConnectionMapsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServiceConnectionMapsRequest>;

export type GetProjectsLocationsServiceConnectionMapsResponse = ServiceConnectionMap;
export const GetProjectsLocationsServiceConnectionMapsResponse = ServiceConnectionMap;

export type GetProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const getProjectsLocationsServiceConnectionMaps: API.OperationMethod<GetProjectsLocationsServiceConnectionMapsRequest, GetProjectsLocationsServiceConnectionMapsResponse, GetProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServiceConnectionMapsRequest,
  output: GetProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Creates a new ServiceConnectionMap in a given project and location. */
export interface CreateProjectsLocationsServiceConnectionMapsRequest {
  /** Required. The parent resource's name of the ServiceConnectionMap. ex. projects/123/locations/us-east1 */
  parent: string;
  /** Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/serviceConnectionMaps/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated. */
  serviceConnectionMapId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ServiceConnectionMap;
}

export const CreateProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceConnectionMapId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceConnectionMapId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ServiceConnectionMap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServiceConnectionMapsRequest>;

export type CreateProjectsLocationsServiceConnectionMapsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsServiceConnectionMapsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const createProjectsLocationsServiceConnectionMaps: API.OperationMethod<CreateProjectsLocationsServiceConnectionMapsRequest, CreateProjectsLocationsServiceConnectionMapsResponse, CreateProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServiceConnectionMapsRequest,
  output: CreateProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Updates the parameters of a single ServiceConnectionMap. */
export interface PatchProjectsLocationsServiceConnectionMapsRequest {
  /** Immutable. The name of a ServiceConnectionMap. Format: projects/{project}/locations/{location}/serviceConnectionMaps/{service_connection_map} See: https://google.aip.dev/122#fields-representing-resource-names */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the ServiceConnectionMap resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ServiceConnectionMap;
}

export const PatchProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ServiceConnectionMap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps/{serviceConnectionMapsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServiceConnectionMapsRequest>;

export type PatchProjectsLocationsServiceConnectionMapsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsServiceConnectionMapsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const patchProjectsLocationsServiceConnectionMaps: API.OperationMethod<PatchProjectsLocationsServiceConnectionMapsRequest, PatchProjectsLocationsServiceConnectionMapsResponse, PatchProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServiceConnectionMapsRequest,
  output: PatchProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Deletes a single ServiceConnectionMap. */
export interface DeleteProjectsLocationsServiceConnectionMapsRequest {
  /** Required. The name of the ServiceConnectionMap to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps/{serviceConnectionMapsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServiceConnectionMapsRequest>;

export type DeleteProjectsLocationsServiceConnectionMapsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsServiceConnectionMapsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const deleteProjectsLocationsServiceConnectionMaps: API.OperationMethod<DeleteProjectsLocationsServiceConnectionMapsRequest, DeleteProjectsLocationsServiceConnectionMapsResponse, DeleteProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServiceConnectionMapsRequest,
  output: DeleteProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsServiceConnectionMapsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps/{serviceConnectionMapsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServiceConnectionMapsRequest>;

export type SetIamPolicyProjectsLocationsServiceConnectionMapsResponse = Policy;
export const SetIamPolicyProjectsLocationsServiceConnectionMapsResponse = Policy;

export type SetIamPolicyProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const setIamPolicyProjectsLocationsServiceConnectionMaps: API.OperationMethod<SetIamPolicyProjectsLocationsServiceConnectionMapsRequest, SetIamPolicyProjectsLocationsServiceConnectionMapsResponse, SetIamPolicyProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServiceConnectionMapsRequest,
  output: SetIamPolicyProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServiceConnectionMapsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps/{serviceConnectionMapsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServiceConnectionMapsRequest>;

export type GetIamPolicyProjectsLocationsServiceConnectionMapsResponse = Policy;
export const GetIamPolicyProjectsLocationsServiceConnectionMapsResponse = Policy;

export type GetIamPolicyProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const getIamPolicyProjectsLocationsServiceConnectionMaps: API.OperationMethod<GetIamPolicyProjectsLocationsServiceConnectionMapsRequest, GetIamPolicyProjectsLocationsServiceConnectionMapsResponse, GetIamPolicyProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServiceConnectionMapsRequest,
  output: GetIamPolicyProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsServiceConnectionMapsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsServiceConnectionMapsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionMaps/{serviceConnectionMapsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsServiceConnectionMapsRequest>;

export type TestIamPermissionsProjectsLocationsServiceConnectionMapsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsServiceConnectionMapsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsServiceConnectionMapsError = CommonErrors;

export const testIamPermissionsProjectsLocationsServiceConnectionMaps: API.OperationMethod<TestIamPermissionsProjectsLocationsServiceConnectionMapsRequest, TestIamPermissionsProjectsLocationsServiceConnectionMapsResponse, TestIamPermissionsProjectsLocationsServiceConnectionMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsServiceConnectionMapsRequest,
  output: TestIamPermissionsProjectsLocationsServiceConnectionMapsResponse,
  errors: [],
}));

/** Lists ServiceConnectionPolicies in a given project and location. */
export interface ListProjectsLocationsServiceConnectionPoliciesRequest {
  /** Required. The parent resource's name. ex. projects/123/locations/us-east1 */
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

export const ListProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServiceConnectionPoliciesRequest>;

export type ListProjectsLocationsServiceConnectionPoliciesResponse = ListServiceConnectionPoliciesResponse;
export const ListProjectsLocationsServiceConnectionPoliciesResponse = ListServiceConnectionPoliciesResponse;

export type ListProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const listProjectsLocationsServiceConnectionPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsServiceConnectionPoliciesRequest,
  output: ListProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ServiceConnectionPolicy. */
export interface GetProjectsLocationsServiceConnectionPoliciesRequest {
  /** Required. Name of the ServiceConnectionPolicy to get. */
  name: string;
}

export const GetProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies/{serviceConnectionPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServiceConnectionPoliciesRequest>;

export type GetProjectsLocationsServiceConnectionPoliciesResponse = ServiceConnectionPolicy;
export const GetProjectsLocationsServiceConnectionPoliciesResponse = ServiceConnectionPolicy;

export type GetProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const getProjectsLocationsServiceConnectionPolicies: API.OperationMethod<GetProjectsLocationsServiceConnectionPoliciesRequest, GetProjectsLocationsServiceConnectionPoliciesResponse, GetProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServiceConnectionPoliciesRequest,
  output: GetProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Creates a new ServiceConnectionPolicy in a given project and location. */
export interface CreateProjectsLocationsServiceConnectionPoliciesRequest {
  /** Required. The parent resource's name of the ServiceConnectionPolicy. ex. projects/123/locations/us-east1 */
  parent: string;
  /** Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/serviceConnectionPolicies/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. */
  serviceConnectionPolicyId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If this field is not set, USER_PROVIDED is the inferred value to use. */
  subnetworkMode?: "SUBNETWORK_MODE_UNSPECIFIED" | "USER_PROVIDED" | "AUTO_CREATED" | (string & {});
  /** Optional. The requested IP stack for the subnetwork. If not specified, IPv4 is used. */
  "autoSubnetworkConfig.ipStack"?: "SUBNET_IP_STACK_UNSPECIFIED" | "IPV4_ONLY" | "IPV6_ONLY" | "IPV4_IPV6" | (string & {});
  /** Optional. The desired prefix length for the subnet's IP address range. E.g., 24 for a /24. The actual range is allocated from available space. If not specified, 24 is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork. */
  "autoSubnetworkConfig.prefixLength"?: number;
  /** Optional. The space where we search for a free range to create a subnetwork. It can be narrow down or pick a different space. This is in standard CIDR format. If not specified, “10.0.0.0/8” is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork. */
  "autoSubnetworkConfig.allocRangeSpace"?: string[];
  /** Request body */
  body?: ServiceConnectionPolicy;
}

export const CreateProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceConnectionPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceConnectionPolicyId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  subnetworkMode: Schema.optional(Schema.String).pipe(T.HttpQuery("subnetworkMode")),
  "autoSubnetworkConfig.ipStack": Schema.optional(Schema.String).pipe(T.HttpQuery("autoSubnetworkConfig.ipStack")),
  "autoSubnetworkConfig.prefixLength": Schema.optional(Schema.Number).pipe(T.HttpQuery("autoSubnetworkConfig.prefixLength")),
  "autoSubnetworkConfig.allocRangeSpace": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("autoSubnetworkConfig.allocRangeSpace")),
  body: Schema.optional(ServiceConnectionPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServiceConnectionPoliciesRequest>;

export type CreateProjectsLocationsServiceConnectionPoliciesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsServiceConnectionPoliciesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const createProjectsLocationsServiceConnectionPolicies: API.OperationMethod<CreateProjectsLocationsServiceConnectionPoliciesRequest, CreateProjectsLocationsServiceConnectionPoliciesResponse, CreateProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServiceConnectionPoliciesRequest,
  output: CreateProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Updates the parameters of a single ServiceConnectionPolicy. */
export interface PatchProjectsLocationsServiceConnectionPoliciesRequest {
  /** Immutable. The name of a ServiceConnectionPolicy. Format: projects/{project}/locations/{location}/serviceConnectionPolicies/{service_connection_policy} See: https://google.aip.dev/122#fields-representing-resource-names */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the ServiceConnectionPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ServiceConnectionPolicy;
}

export const PatchProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ServiceConnectionPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies/{serviceConnectionPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServiceConnectionPoliciesRequest>;

export type PatchProjectsLocationsServiceConnectionPoliciesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsServiceConnectionPoliciesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const patchProjectsLocationsServiceConnectionPolicies: API.OperationMethod<PatchProjectsLocationsServiceConnectionPoliciesRequest, PatchProjectsLocationsServiceConnectionPoliciesResponse, PatchProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServiceConnectionPoliciesRequest,
  output: PatchProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Deletes a single ServiceConnectionPolicy. */
export interface DeleteProjectsLocationsServiceConnectionPoliciesRequest {
  /** Required. The name of the ServiceConnectionPolicy to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies/{serviceConnectionPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServiceConnectionPoliciesRequest>;

export type DeleteProjectsLocationsServiceConnectionPoliciesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsServiceConnectionPoliciesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const deleteProjectsLocationsServiceConnectionPolicies: API.OperationMethod<DeleteProjectsLocationsServiceConnectionPoliciesRequest, DeleteProjectsLocationsServiceConnectionPoliciesResponse, DeleteProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServiceConnectionPoliciesRequest,
  output: DeleteProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies/{serviceConnectionPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest>;

export type SetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse = Policy;
export const SetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse = Policy;

export type SetIamPolicyProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsServiceConnectionPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest, SetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse, SetIamPolicyProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest,
  output: SetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies/{serviceConnectionPoliciesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest>;

export type GetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse = Policy;
export const GetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse = Policy;

export type GetIamPolicyProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsServiceConnectionPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest, GetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse, GetIamPolicyProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServiceConnectionPoliciesRequest,
  output: GetIamPolicyProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsServiceConnectionPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsServiceConnectionPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionPolicies/{serviceConnectionPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsServiceConnectionPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsServiceConnectionPoliciesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsServiceConnectionPoliciesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsServiceConnectionPoliciesError = CommonErrors;

export const testIamPermissionsProjectsLocationsServiceConnectionPolicies: API.OperationMethod<TestIamPermissionsProjectsLocationsServiceConnectionPoliciesRequest, TestIamPermissionsProjectsLocationsServiceConnectionPoliciesResponse, TestIamPermissionsProjectsLocationsServiceConnectionPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsServiceConnectionPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsServiceConnectionPoliciesResponse,
  errors: [],
}));

/** Lists ServiceClasses in a given project and location. */
export interface ListProjectsLocationsServiceClassesRequest {
  /** Required. The parent resource's name. ex. projects/123/locations/us-east1 */
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

export const ListProjectsLocationsServiceClassesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServiceClassesRequest>;

export type ListProjectsLocationsServiceClassesResponse = ListServiceClassesResponse;
export const ListProjectsLocationsServiceClassesResponse = ListServiceClassesResponse;

export type ListProjectsLocationsServiceClassesError = CommonErrors;

export const listProjectsLocationsServiceClasses = API.makePaginated(() => ({
  input: ListProjectsLocationsServiceClassesRequest,
  output: ListProjectsLocationsServiceClassesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ServiceClass. */
export interface GetProjectsLocationsServiceClassesRequest {
  /** Required. Name of the ServiceClass to get. */
  name: string;
}

export const GetProjectsLocationsServiceClassesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses/{serviceClassesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServiceClassesRequest>;

export type GetProjectsLocationsServiceClassesResponse = ServiceClass;
export const GetProjectsLocationsServiceClassesResponse = ServiceClass;

export type GetProjectsLocationsServiceClassesError = CommonErrors;

export const getProjectsLocationsServiceClasses: API.OperationMethod<GetProjectsLocationsServiceClassesRequest, GetProjectsLocationsServiceClassesResponse, GetProjectsLocationsServiceClassesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServiceClassesRequest,
  output: GetProjectsLocationsServiceClassesResponse,
  errors: [],
}));

/** Updates the parameters of a single ServiceClass. */
export interface PatchProjectsLocationsServiceClassesRequest {
  /** Immutable. The name of a ServiceClass resource. Format: projects/{project}/locations/{location}/serviceClasses/{service_class} See: https://google.aip.dev/122#fields-representing-resource-names */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the ServiceClass resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ServiceClass;
}

export const PatchProjectsLocationsServiceClassesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ServiceClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses/{serviceClassesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsServiceClassesRequest>;

export type PatchProjectsLocationsServiceClassesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsServiceClassesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsServiceClassesError = CommonErrors;

export const patchProjectsLocationsServiceClasses: API.OperationMethod<PatchProjectsLocationsServiceClassesRequest, PatchProjectsLocationsServiceClassesResponse, PatchProjectsLocationsServiceClassesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsServiceClassesRequest,
  output: PatchProjectsLocationsServiceClassesResponse,
  errors: [],
}));

/** Deletes a single ServiceClass. */
export interface DeleteProjectsLocationsServiceClassesRequest {
  /** Required. The name of the ServiceClass to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsServiceClassesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses/{serviceClassesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServiceClassesRequest>;

export type DeleteProjectsLocationsServiceClassesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsServiceClassesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsServiceClassesError = CommonErrors;

export const deleteProjectsLocationsServiceClasses: API.OperationMethod<DeleteProjectsLocationsServiceClassesRequest, DeleteProjectsLocationsServiceClassesResponse, DeleteProjectsLocationsServiceClassesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServiceClassesRequest,
  output: DeleteProjectsLocationsServiceClassesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsServiceClassesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServiceClassesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses/{serviceClassesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServiceClassesRequest>;

export type SetIamPolicyProjectsLocationsServiceClassesResponse = Policy;
export const SetIamPolicyProjectsLocationsServiceClassesResponse = Policy;

export type SetIamPolicyProjectsLocationsServiceClassesError = CommonErrors;

export const setIamPolicyProjectsLocationsServiceClasses: API.OperationMethod<SetIamPolicyProjectsLocationsServiceClassesRequest, SetIamPolicyProjectsLocationsServiceClassesResponse, SetIamPolicyProjectsLocationsServiceClassesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServiceClassesRequest,
  output: SetIamPolicyProjectsLocationsServiceClassesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsServiceClassesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServiceClassesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses/{serviceClassesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServiceClassesRequest>;

export type GetIamPolicyProjectsLocationsServiceClassesResponse = Policy;
export const GetIamPolicyProjectsLocationsServiceClassesResponse = Policy;

export type GetIamPolicyProjectsLocationsServiceClassesError = CommonErrors;

export const getIamPolicyProjectsLocationsServiceClasses: API.OperationMethod<GetIamPolicyProjectsLocationsServiceClassesRequest, GetIamPolicyProjectsLocationsServiceClassesResponse, GetIamPolicyProjectsLocationsServiceClassesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServiceClassesRequest,
  output: GetIamPolicyProjectsLocationsServiceClassesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsServiceClassesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsServiceClassesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceClasses/{serviceClassesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsServiceClassesRequest>;

export type TestIamPermissionsProjectsLocationsServiceClassesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsServiceClassesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsServiceClassesError = CommonErrors;

export const testIamPermissionsProjectsLocationsServiceClasses: API.OperationMethod<TestIamPermissionsProjectsLocationsServiceClassesRequest, TestIamPermissionsProjectsLocationsServiceClassesResponse, TestIamPermissionsProjectsLocationsServiceClassesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsServiceClassesRequest,
  output: TestIamPermissionsProjectsLocationsServiceClassesResponse,
  errors: [],
}));

/** Gets details of a single ServiceConnectionToken. */
export interface GetProjectsLocationsServiceConnectionTokensRequest {
  /** Required. Name of the ServiceConnectionToken to get. */
  name: string;
}

export const GetProjectsLocationsServiceConnectionTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionTokens/{serviceConnectionTokensId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServiceConnectionTokensRequest>;

export type GetProjectsLocationsServiceConnectionTokensResponse = ServiceConnectionToken;
export const GetProjectsLocationsServiceConnectionTokensResponse = ServiceConnectionToken;

export type GetProjectsLocationsServiceConnectionTokensError = CommonErrors;

export const getProjectsLocationsServiceConnectionTokens: API.OperationMethod<GetProjectsLocationsServiceConnectionTokensRequest, GetProjectsLocationsServiceConnectionTokensResponse, GetProjectsLocationsServiceConnectionTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServiceConnectionTokensRequest,
  output: GetProjectsLocationsServiceConnectionTokensResponse,
  errors: [],
}));

/** Lists ServiceConnectionTokens in a given project and location. */
export interface ListProjectsLocationsServiceConnectionTokensRequest {
  /** Required. The parent resource's name. ex. projects/123/locations/us-east1 */
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

export const ListProjectsLocationsServiceConnectionTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionTokens" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServiceConnectionTokensRequest>;

export type ListProjectsLocationsServiceConnectionTokensResponse = ListServiceConnectionTokensResponse;
export const ListProjectsLocationsServiceConnectionTokensResponse = ListServiceConnectionTokensResponse;

export type ListProjectsLocationsServiceConnectionTokensError = CommonErrors;

export const listProjectsLocationsServiceConnectionTokens = API.makePaginated(() => ({
  input: ListProjectsLocationsServiceConnectionTokensRequest,
  output: ListProjectsLocationsServiceConnectionTokensResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new ServiceConnectionToken in a given project and location. */
export interface CreateProjectsLocationsServiceConnectionTokensRequest {
  /** Required. The parent resource's name of the ServiceConnectionToken. ex. projects/123/locations/us-east1 */
  parent: string;
  /** Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/ServiceConnectionTokens/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated. */
  serviceConnectionTokenId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ServiceConnectionToken;
}

export const CreateProjectsLocationsServiceConnectionTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceConnectionTokenId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceConnectionTokenId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ServiceConnectionToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionTokens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServiceConnectionTokensRequest>;

export type CreateProjectsLocationsServiceConnectionTokensResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsServiceConnectionTokensResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsServiceConnectionTokensError = CommonErrors;

export const createProjectsLocationsServiceConnectionTokens: API.OperationMethod<CreateProjectsLocationsServiceConnectionTokensRequest, CreateProjectsLocationsServiceConnectionTokensResponse, CreateProjectsLocationsServiceConnectionTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServiceConnectionTokensRequest,
  output: CreateProjectsLocationsServiceConnectionTokensResponse,
  errors: [],
}));

/** Deletes a single ServiceConnectionToken. */
export interface DeleteProjectsLocationsServiceConnectionTokensRequest {
  /** Required. The name of the ServiceConnectionToken to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsServiceConnectionTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceConnectionTokens/{serviceConnectionTokensId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServiceConnectionTokensRequest>;

export type DeleteProjectsLocationsServiceConnectionTokensResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsServiceConnectionTokensResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsServiceConnectionTokensError = CommonErrors;

export const deleteProjectsLocationsServiceConnectionTokens: API.OperationMethod<DeleteProjectsLocationsServiceConnectionTokensRequest, DeleteProjectsLocationsServiceConnectionTokensResponse, DeleteProjectsLocationsServiceConnectionTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServiceConnectionTokensRequest,
  output: DeleteProjectsLocationsServiceConnectionTokensResponse,
  errors: [],
}));

/** Lists AutomatedDnsRecords in a given project and location. */
export interface ListProjectsLocationsAutomatedDnsRecordsRequest {
  /** Required. The parent resource's name. ex. projects/123/locations/us-east1 */
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

export const ListProjectsLocationsAutomatedDnsRecordsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/automatedDnsRecords" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAutomatedDnsRecordsRequest>;

export type ListProjectsLocationsAutomatedDnsRecordsResponse = ListAutomatedDnsRecordsResponse;
export const ListProjectsLocationsAutomatedDnsRecordsResponse = ListAutomatedDnsRecordsResponse;

export type ListProjectsLocationsAutomatedDnsRecordsError = CommonErrors;

export const listProjectsLocationsAutomatedDnsRecords = API.makePaginated(() => ({
  input: ListProjectsLocationsAutomatedDnsRecordsRequest,
  output: ListProjectsLocationsAutomatedDnsRecordsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single AutomatedDnsRecord. */
export interface GetProjectsLocationsAutomatedDnsRecordsRequest {
  /** Required. Name of the AutomatedDnsRecord to get. Format: projects/{project}/locations/{location}/automatedDnsRecords/{automated_dns_record} */
  name: string;
}

export const GetProjectsLocationsAutomatedDnsRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/automatedDnsRecords/{automatedDnsRecordsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAutomatedDnsRecordsRequest>;

export type GetProjectsLocationsAutomatedDnsRecordsResponse = AutomatedDnsRecord;
export const GetProjectsLocationsAutomatedDnsRecordsResponse = AutomatedDnsRecord;

export type GetProjectsLocationsAutomatedDnsRecordsError = CommonErrors;

export const getProjectsLocationsAutomatedDnsRecords: API.OperationMethod<GetProjectsLocationsAutomatedDnsRecordsRequest, GetProjectsLocationsAutomatedDnsRecordsResponse, GetProjectsLocationsAutomatedDnsRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAutomatedDnsRecordsRequest,
  output: GetProjectsLocationsAutomatedDnsRecordsResponse,
  errors: [],
}));

/** Creates a new AutomatedDnsRecord in a given project and location. */
export interface CreateProjectsLocationsAutomatedDnsRecordsRequest {
  /** Required. The parent resource's name of the AutomatedDnsRecord. ex. projects/123/locations/us-east1 */
  parent: string;
  /** Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/automatedDnsRecords/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated. */
  automatedDnsRecordId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The insert mode when creating AutomatedDnsRecord. */
  insertMode?: "INSERT_MODE_UNSPECIFIED" | "FAIL_IF_EXISTS" | "OVERWRITE" | (string & {});
  /** Request body */
  body?: AutomatedDnsRecord;
}

export const CreateProjectsLocationsAutomatedDnsRecordsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  automatedDnsRecordId: Schema.optional(Schema.String).pipe(T.HttpQuery("automatedDnsRecordId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  insertMode: Schema.optional(Schema.String).pipe(T.HttpQuery("insertMode")),
  body: Schema.optional(AutomatedDnsRecord).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/automatedDnsRecords", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAutomatedDnsRecordsRequest>;

export type CreateProjectsLocationsAutomatedDnsRecordsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAutomatedDnsRecordsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAutomatedDnsRecordsError = CommonErrors;

export const createProjectsLocationsAutomatedDnsRecords: API.OperationMethod<CreateProjectsLocationsAutomatedDnsRecordsRequest, CreateProjectsLocationsAutomatedDnsRecordsResponse, CreateProjectsLocationsAutomatedDnsRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAutomatedDnsRecordsRequest,
  output: CreateProjectsLocationsAutomatedDnsRecordsResponse,
  errors: [],
}));

/** Deletes a single AutomatedDnsRecord. */
export interface DeleteProjectsLocationsAutomatedDnsRecordsRequest {
  /** Required. The name of the AutomatedDnsRecord to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Delete mode when deleting AutomatedDnsRecord. If set to DEPROGRAM, the record will be deprogrammed in Cloud DNS. If set to SKIP_DEPROGRAMMING, the record will not be deprogrammed in Cloud DNS. */
  deleteMode?: "DELETE_MODE_UNSPECIFIED" | "DEPROGRAM" | "SKIP_DEPROGRAMMING" | (string & {});
}

export const DeleteProjectsLocationsAutomatedDnsRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  deleteMode: Schema.optional(Schema.String).pipe(T.HttpQuery("deleteMode")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/automatedDnsRecords/{automatedDnsRecordsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAutomatedDnsRecordsRequest>;

export type DeleteProjectsLocationsAutomatedDnsRecordsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsAutomatedDnsRecordsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsAutomatedDnsRecordsError = CommonErrors;

export const deleteProjectsLocationsAutomatedDnsRecords: API.OperationMethod<DeleteProjectsLocationsAutomatedDnsRecordsRequest, DeleteProjectsLocationsAutomatedDnsRecordsResponse, DeleteProjectsLocationsAutomatedDnsRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAutomatedDnsRecordsRequest,
  output: DeleteProjectsLocationsAutomatedDnsRecordsResponse,
  errors: [],
}));

/** Lists the `MulticloudDataTransferConfig` resources in a specified project and location. */
export interface ListProjectsLocationsMulticloudDataTransferConfigsRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Optional. The maximum number of results listed per page. */
  pageSize?: number;
  /** Optional. The page token. */
  pageToken?: string;
  /** Optional. An expression that filters the results listed in the response. */
  filter?: string;
  /** Optional. The sort order of the results. */
  orderBy?: string;
  /** Optional. If `true`, allows partial responses for multi-regional aggregated list requests. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsMulticloudDataTransferConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMulticloudDataTransferConfigsRequest>;

export type ListProjectsLocationsMulticloudDataTransferConfigsResponse = ListMulticloudDataTransferConfigsResponse;
export const ListProjectsLocationsMulticloudDataTransferConfigsResponse = ListMulticloudDataTransferConfigsResponse;

export type ListProjectsLocationsMulticloudDataTransferConfigsError = CommonErrors;

export const listProjectsLocationsMulticloudDataTransferConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsMulticloudDataTransferConfigsRequest,
  output: ListProjectsLocationsMulticloudDataTransferConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a `MulticloudDataTransferConfig` resource. */
export interface GetProjectsLocationsMulticloudDataTransferConfigsRequest {
  /** Required. The name of the `MulticloudDataTransferConfig` resource to get. */
  name: string;
}

export const GetProjectsLocationsMulticloudDataTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMulticloudDataTransferConfigsRequest>;

export type GetProjectsLocationsMulticloudDataTransferConfigsResponse = MulticloudDataTransferConfig;
export const GetProjectsLocationsMulticloudDataTransferConfigsResponse = MulticloudDataTransferConfig;

export type GetProjectsLocationsMulticloudDataTransferConfigsError = CommonErrors;

export const getProjectsLocationsMulticloudDataTransferConfigs: API.OperationMethod<GetProjectsLocationsMulticloudDataTransferConfigsRequest, GetProjectsLocationsMulticloudDataTransferConfigsResponse, GetProjectsLocationsMulticloudDataTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMulticloudDataTransferConfigsRequest,
  output: GetProjectsLocationsMulticloudDataTransferConfigsResponse,
  errors: [],
}));

/** Creates a `MulticloudDataTransferConfig` resource in a specified project and location. */
export interface CreateProjectsLocationsMulticloudDataTransferConfigsRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Required. The ID to use for the `MulticloudDataTransferConfig` resource, which becomes the final component of the `MulticloudDataTransferConfig` resource name. */
  multicloudDataTransferConfigId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `MulticloudDataTransferConfig` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. */
  requestId?: string;
  /** Request body */
  body?: MulticloudDataTransferConfig;
}

export const CreateProjectsLocationsMulticloudDataTransferConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  multicloudDataTransferConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("multicloudDataTransferConfigId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MulticloudDataTransferConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMulticloudDataTransferConfigsRequest>;

export type CreateProjectsLocationsMulticloudDataTransferConfigsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsMulticloudDataTransferConfigsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsMulticloudDataTransferConfigsError = CommonErrors;

export const createProjectsLocationsMulticloudDataTransferConfigs: API.OperationMethod<CreateProjectsLocationsMulticloudDataTransferConfigsRequest, CreateProjectsLocationsMulticloudDataTransferConfigsResponse, CreateProjectsLocationsMulticloudDataTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMulticloudDataTransferConfigsRequest,
  output: CreateProjectsLocationsMulticloudDataTransferConfigsResponse,
  errors: [],
}));

/** Updates a `MulticloudDataTransferConfig` resource in a specified project and location. */
export interface PatchProjectsLocationsMulticloudDataTransferConfigsRequest {
  /** Identifier. The name of the `MulticloudDataTransferConfig` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}`. */
  name: string;
  /** Optional. `FieldMask` is used to specify the fields in the `MulticloudDataTransferConfig` resource to be overwritten by the update. The fields specified in `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If you don't specify a mask, all fields are overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `MulticloudDataTransferConfig` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. */
  requestId?: string;
  /** Request body */
  body?: MulticloudDataTransferConfig;
}

export const PatchProjectsLocationsMulticloudDataTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(MulticloudDataTransferConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMulticloudDataTransferConfigsRequest>;

export type PatchProjectsLocationsMulticloudDataTransferConfigsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsMulticloudDataTransferConfigsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsMulticloudDataTransferConfigsError = CommonErrors;

export const patchProjectsLocationsMulticloudDataTransferConfigs: API.OperationMethod<PatchProjectsLocationsMulticloudDataTransferConfigsRequest, PatchProjectsLocationsMulticloudDataTransferConfigsResponse, PatchProjectsLocationsMulticloudDataTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMulticloudDataTransferConfigsRequest,
  output: PatchProjectsLocationsMulticloudDataTransferConfigsResponse,
  errors: [],
}));

/** Deletes a `MulticloudDataTransferConfig` resource. */
export interface DeleteProjectsLocationsMulticloudDataTransferConfigsRequest {
  /** Required. The name of the `MulticloudDataTransferConfig` resource to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `MulticloudDataTransferConfig` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. */
  requestId?: string;
  /** Optional. The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsMulticloudDataTransferConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMulticloudDataTransferConfigsRequest>;

export type DeleteProjectsLocationsMulticloudDataTransferConfigsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsMulticloudDataTransferConfigsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsMulticloudDataTransferConfigsError = CommonErrors;

export const deleteProjectsLocationsMulticloudDataTransferConfigs: API.OperationMethod<DeleteProjectsLocationsMulticloudDataTransferConfigsRequest, DeleteProjectsLocationsMulticloudDataTransferConfigsResponse, DeleteProjectsLocationsMulticloudDataTransferConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMulticloudDataTransferConfigsRequest,
  output: DeleteProjectsLocationsMulticloudDataTransferConfigsResponse,
  errors: [],
}));

/** Lists the `Destination` resources in a specified project and location. */
export interface ListProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Optional. The maximum number of results listed per page. */
  pageSize?: number;
  /** Optional. The page token. */
  pageToken?: string;
  /** Optional. An expression that filters the results listed in the response. */
  filter?: string;
  /** Optional. The sort order of the results. */
  orderBy?: string;
  /** Optional. If `true`, allow partial responses for multi-regional aggregated list requests. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}/destinations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest>;

export type ListProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = ListDestinationsResponse;
export const ListProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = ListDestinationsResponse;

export type ListProjectsLocationsMulticloudDataTransferConfigsDestinationsError = CommonErrors;

export const listProjectsLocationsMulticloudDataTransferConfigsDestinations = API.makePaginated(() => ({
  input: ListProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest,
  output: ListProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a `Destination` resource. */
export interface GetProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest {
  /** Required. The name of the `Destination` resource to get. */
  name: string;
}

export const GetProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}/destinations/{destinationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest>;

export type GetProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = Destination;
export const GetProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = Destination;

export type GetProjectsLocationsMulticloudDataTransferConfigsDestinationsError = CommonErrors;

export const getProjectsLocationsMulticloudDataTransferConfigsDestinations: API.OperationMethod<GetProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest, GetProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse, GetProjectsLocationsMulticloudDataTransferConfigsDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest,
  output: GetProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse,
  errors: [],
}));

/** Creates a `Destination` resource in a specified project and location. */
export interface CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Required. The ID to use for the `Destination` resource, which becomes the final component of the `Destination` resource name. */
  destinationId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `Destination` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. */
  requestId?: string;
  /** Request body */
  body?: Destination;
}

export const CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  destinationId: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Destination).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}/destinations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest>;

export type CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsError = CommonErrors;

export const createProjectsLocationsMulticloudDataTransferConfigsDestinations: API.OperationMethod<CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest, CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse, CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest,
  output: CreateProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse,
  errors: [],
}));

/** Updates a `Destination` resource in a specified project and location. */
export interface PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest {
  /** Identifier. The name of the `Destination` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}`. */
  name: string;
  /** Optional. `FieldMask is used to specify the fields to be overwritten in the `Destination` resource by the update. The fields specified in `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If you don't specify a mask, all fields are overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. */
  requestId?: string;
  /** Request body */
  body?: Destination;
}

export const PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Destination).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}/destinations/{destinationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest>;

export type PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsError = CommonErrors;

export const patchProjectsLocationsMulticloudDataTransferConfigsDestinations: API.OperationMethod<PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest, PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse, PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest,
  output: PatchProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse,
  errors: [],
}));

/** Deletes a `Destination` resource. */
export interface DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest {
  /** Required. The name of the `Destination` resource to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. */
  requestId?: string;
  /** Optional. The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferConfigs/{multicloudDataTransferConfigsId}/destinations/{destinationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest>;

export type DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsError = CommonErrors;

export const deleteProjectsLocationsMulticloudDataTransferConfigsDestinations: API.OperationMethod<DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest, DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse, DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsRequest,
  output: DeleteProjectsLocationsMulticloudDataTransferConfigsDestinationsResponse,
  errors: [],
}));

/** Gets the details of a service that is supported for Data Transfer Essentials. */
export interface GetProjectsLocationsMulticloudDataTransferSupportedServicesRequest {
  /** Required. The name of the service. */
  name: string;
}

export const GetProjectsLocationsMulticloudDataTransferSupportedServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferSupportedServices/{multicloudDataTransferSupportedServicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMulticloudDataTransferSupportedServicesRequest>;

export type GetProjectsLocationsMulticloudDataTransferSupportedServicesResponse = MulticloudDataTransferSupportedService;
export const GetProjectsLocationsMulticloudDataTransferSupportedServicesResponse = MulticloudDataTransferSupportedService;

export type GetProjectsLocationsMulticloudDataTransferSupportedServicesError = CommonErrors;

export const getProjectsLocationsMulticloudDataTransferSupportedServices: API.OperationMethod<GetProjectsLocationsMulticloudDataTransferSupportedServicesRequest, GetProjectsLocationsMulticloudDataTransferSupportedServicesResponse, GetProjectsLocationsMulticloudDataTransferSupportedServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMulticloudDataTransferSupportedServicesRequest,
  output: GetProjectsLocationsMulticloudDataTransferSupportedServicesResponse,
  errors: [],
}));

/** Lists the services in the project for a region that are supported for Data Transfer Essentials. */
export interface ListProjectsLocationsMulticloudDataTransferSupportedServicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Optional. The maximum number of results listed per page. */
  pageSize?: number;
  /** Optional. The page token. */
  pageToken?: string;
}

export const ListProjectsLocationsMulticloudDataTransferSupportedServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/multicloudDataTransferSupportedServices" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMulticloudDataTransferSupportedServicesRequest>;

export type ListProjectsLocationsMulticloudDataTransferSupportedServicesResponse = ListMulticloudDataTransferSupportedServicesResponse;
export const ListProjectsLocationsMulticloudDataTransferSupportedServicesResponse = ListMulticloudDataTransferSupportedServicesResponse;

export type ListProjectsLocationsMulticloudDataTransferSupportedServicesError = CommonErrors;

export const listProjectsLocationsMulticloudDataTransferSupportedServices = API.makePaginated(() => ({
  input: ListProjectsLocationsMulticloudDataTransferSupportedServicesRequest,
  output: ListProjectsLocationsMulticloudDataTransferSupportedServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the Network Connectivity Center hubs associated with a given project. */
export interface ListProjectsLocationsGlobalHubsRequest {
  /** Required. The parent resource's name. */
  parent: string;
  /** The maximum number of results per page to return. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** An expression that filters the list of results. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalHubsRequest>;

export type ListProjectsLocationsGlobalHubsResponse = ListHubsResponse;
export const ListProjectsLocationsGlobalHubsResponse = ListHubsResponse;

export type ListProjectsLocationsGlobalHubsError = CommonErrors;

export const listProjectsLocationsGlobalHubs = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalHubsRequest,
  output: ListProjectsLocationsGlobalHubsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about a Network Connectivity Center hub. */
export interface GetProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub resource to get. */
  name: string;
}

export const GetProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalHubsRequest>;

export type GetProjectsLocationsGlobalHubsResponse = Hub;
export const GetProjectsLocationsGlobalHubsResponse = Hub;

export type GetProjectsLocationsGlobalHubsError = CommonErrors;

export const getProjectsLocationsGlobalHubs: API.OperationMethod<GetProjectsLocationsGlobalHubsRequest, GetProjectsLocationsGlobalHubsResponse, GetProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalHubsRequest,
  output: GetProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Creates a new Network Connectivity Center hub in the specified project. */
export interface CreateProjectsLocationsGlobalHubsRequest {
  /** Required. The parent resource. */
  parent: string;
  /** Required. A unique identifier for the hub. */
  hubId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalHubsRequest>;

export type CreateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsGlobalHubsError = CommonErrors;

export const createProjectsLocationsGlobalHubs: API.OperationMethod<CreateProjectsLocationsGlobalHubsRequest, CreateProjectsLocationsGlobalHubsResponse, CreateProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlobalHubsRequest,
  output: CreateProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Updates the description and/or labels of a Network Connectivity Center hub. */
export interface PatchProjectsLocationsGlobalHubsRequest {
  /** Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}` */
  name: string;
  /** Optional. In the case of an update to an existing hub, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
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
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalHubsRequest>;

export type PatchProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsGlobalHubsError = CommonErrors;

export const patchProjectsLocationsGlobalHubs: API.OperationMethod<PatchProjectsLocationsGlobalHubsRequest, PatchProjectsLocationsGlobalHubsResponse, PatchProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlobalHubsRequest,
  output: PatchProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Deletes a Network Connectivity Center hub. */
export interface DeleteProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalHubsRequest>;

export type DeleteProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsGlobalHubsError = CommonErrors;

export const deleteProjectsLocationsGlobalHubs: API.OperationMethod<DeleteProjectsLocationsGlobalHubsRequest, DeleteProjectsLocationsGlobalHubsResponse, DeleteProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalHubsRequest,
  output: DeleteProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Lists the Network Connectivity Center spokes associated with a specified hub and location. The list includes both spokes that are attached to the hub and spokes that have been proposed but not yet accepted. */
export interface ListSpokesProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub. */
  name: string;
  /** A list of locations. Specify one of the following: `[global]`, a single region (for example, `[us-central1]`), or a combination of values (for example, `[global, us-central1, us-west1]`). If the spoke_locations field is populated, the list of results includes only spokes in the specified location. If the spoke_locations field is not populated, the list of results includes spokes in all locations. */
  spokeLocations?: string[];
  /** The maximum number of results to return per page. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** An expression that filters the list of results. */
  filter?: string;
  /** Sort the results by name or create_time. */
  orderBy?: string;
  /** The view of the spoke to return. The view that you use determines which spoke fields are included in the response. */
  view?: "SPOKE_VIEW_UNSPECIFIED" | "BASIC" | "DETAILED" | (string & {});
}

export const ListSpokesProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  spokeLocations: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("spokeLocations")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:listSpokes" }),
  svc,
) as unknown as Schema.Schema<ListSpokesProjectsLocationsGlobalHubsRequest>;

export type ListSpokesProjectsLocationsGlobalHubsResponse = ListHubSpokesResponse;
export const ListSpokesProjectsLocationsGlobalHubsResponse = ListHubSpokesResponse;

export type ListSpokesProjectsLocationsGlobalHubsError = CommonErrors;

export const listSpokesProjectsLocationsGlobalHubs = API.makePaginated(() => ({
  input: ListSpokesProjectsLocationsGlobalHubsRequest,
  output: ListSpokesProjectsLocationsGlobalHubsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Query the Private Service Connect propagation status of a Network Connectivity Center hub. */
export interface QueryStatusProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub. */
  name: string;
  /** Optional. The maximum number of results to return per page. */
  pageSize?: number;
  /** Optional. The page token. */
  pageToken?: string;
  /** Optional. An expression that filters the list of results. The filter can be used to filter the results by the following fields: * `psc_propagation_status.source_spoke` * `psc_propagation_status.source_group` * `psc_propagation_status.source_forwarding_rule` * `psc_propagation_status.target_spoke` * `psc_propagation_status.target_group` * `psc_propagation_status.code` * `psc_propagation_status.message` */
  filter?: string;
  /** Optional. Sort the results in ascending order by the specified fields. A comma-separated list of any of these fields: * `psc_propagation_status.source_spoke` * `psc_propagation_status.source_group` * `psc_propagation_status.source_forwarding_rule` * `psc_propagation_status.target_spoke` * `psc_propagation_status.target_group` * `psc_propagation_status.code` If `group_by` is set, the value of the `order_by` field must be the same as or a subset of the `group_by` field. */
  orderBy?: string;
  /** Optional. Aggregate the results by the specified fields. A comma-separated list of any of these fields: * `psc_propagation_status.source_spoke` * `psc_propagation_status.source_group` * `psc_propagation_status.source_forwarding_rule` * `psc_propagation_status.target_spoke` * `psc_propagation_status.target_group` * `psc_propagation_status.code` */
  groupBy?: string;
}

export const QueryStatusProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  groupBy: Schema.optional(Schema.String).pipe(T.HttpQuery("groupBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:queryStatus" }),
  svc,
) as unknown as Schema.Schema<QueryStatusProjectsLocationsGlobalHubsRequest>;

export type QueryStatusProjectsLocationsGlobalHubsResponse = QueryHubStatusResponse;
export const QueryStatusProjectsLocationsGlobalHubsResponse = QueryHubStatusResponse;

export type QueryStatusProjectsLocationsGlobalHubsError = CommonErrors;

export const queryStatusProjectsLocationsGlobalHubs = API.makePaginated(() => ({
  input: QueryStatusProjectsLocationsGlobalHubsRequest,
  output: QueryStatusProjectsLocationsGlobalHubsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Rejects a Network Connectivity Center spoke from being attached to a hub. If the spoke was previously in the `ACTIVE` state, it transitions to the `INACTIVE` state and is no longer able to connect to other spokes that are attached to the hub. */
export interface RejectSpokeProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub from which to reject the spoke. */
  name: string;
  /** Request body */
  body?: RejectHubSpokeRequest;
}

export const RejectSpokeProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectHubSpokeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:rejectSpoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejectSpokeProjectsLocationsGlobalHubsRequest>;

export type RejectSpokeProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const RejectSpokeProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type RejectSpokeProjectsLocationsGlobalHubsError = CommonErrors;

export const rejectSpokeProjectsLocationsGlobalHubs: API.OperationMethod<RejectSpokeProjectsLocationsGlobalHubsRequest, RejectSpokeProjectsLocationsGlobalHubsResponse, RejectSpokeProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejectSpokeProjectsLocationsGlobalHubsRequest,
  output: RejectSpokeProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Accepts a proposal to attach a Network Connectivity Center spoke to a hub. */
export interface AcceptSpokeProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub into which to accept the spoke. */
  name: string;
  /** Request body */
  body?: AcceptHubSpokeRequest;
}

export const AcceptSpokeProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AcceptHubSpokeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:acceptSpoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptSpokeProjectsLocationsGlobalHubsRequest>;

export type AcceptSpokeProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const AcceptSpokeProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type AcceptSpokeProjectsLocationsGlobalHubsError = CommonErrors;

export const acceptSpokeProjectsLocationsGlobalHubs: API.OperationMethod<AcceptSpokeProjectsLocationsGlobalHubsRequest, AcceptSpokeProjectsLocationsGlobalHubsResponse, AcceptSpokeProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptSpokeProjectsLocationsGlobalHubsRequest,
  output: AcceptSpokeProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Accepts a proposal to update a Network Connectivity Center spoke in a hub. */
export interface AcceptSpokeUpdateProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub to accept spoke update. */
  name: string;
  /** Request body */
  body?: AcceptSpokeUpdateRequest;
}

export const AcceptSpokeUpdateProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AcceptSpokeUpdateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:acceptSpokeUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptSpokeUpdateProjectsLocationsGlobalHubsRequest>;

export type AcceptSpokeUpdateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const AcceptSpokeUpdateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type AcceptSpokeUpdateProjectsLocationsGlobalHubsError = CommonErrors;

export const acceptSpokeUpdateProjectsLocationsGlobalHubs: API.OperationMethod<AcceptSpokeUpdateProjectsLocationsGlobalHubsRequest, AcceptSpokeUpdateProjectsLocationsGlobalHubsResponse, AcceptSpokeUpdateProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptSpokeUpdateProjectsLocationsGlobalHubsRequest,
  output: AcceptSpokeUpdateProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Rejects a proposal to update a Network Connectivity Center spoke in a hub. */
export interface RejectSpokeUpdateProjectsLocationsGlobalHubsRequest {
  /** Required. The name of the hub to reject spoke update. */
  name: string;
  /** Request body */
  body?: RejectSpokeUpdateRequest;
}

export const RejectSpokeUpdateProjectsLocationsGlobalHubsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectSpokeUpdateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:rejectSpokeUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejectSpokeUpdateProjectsLocationsGlobalHubsRequest>;

export type RejectSpokeUpdateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;
export const RejectSpokeUpdateProjectsLocationsGlobalHubsResponse = GoogleLongrunningOperation;

export type RejectSpokeUpdateProjectsLocationsGlobalHubsError = CommonErrors;

export const rejectSpokeUpdateProjectsLocationsGlobalHubs: API.OperationMethod<RejectSpokeUpdateProjectsLocationsGlobalHubsRequest, RejectSpokeUpdateProjectsLocationsGlobalHubsResponse, RejectSpokeUpdateProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejectSpokeUpdateProjectsLocationsGlobalHubsRequest,
  output: RejectSpokeUpdateProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalHubsRequest>;

export type SetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalHubsError = CommonErrors;

export const setIamPolicyProjectsLocationsGlobalHubs: API.OperationMethod<SetIamPolicyProjectsLocationsGlobalHubsRequest, SetIamPolicyProjectsLocationsGlobalHubsResponse, SetIamPolicyProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalHubsRequest,
  output: SetIamPolicyProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalHubsRequest>;

export type GetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalHubsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalHubsError = CommonErrors;

export const getIamPolicyProjectsLocationsGlobalHubs: API.OperationMethod<GetIamPolicyProjectsLocationsGlobalHubsRequest, GetIamPolicyProjectsLocationsGlobalHubsResponse, GetIamPolicyProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalHubsRequest,
  output: GetIamPolicyProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalHubsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalHubsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalHubsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalHubsError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlobalHubs: API.OperationMethod<TestIamPermissionsProjectsLocationsGlobalHubsRequest, TestIamPermissionsProjectsLocationsGlobalHubsResponse, TestIamPermissionsProjectsLocationsGlobalHubsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalHubsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalHubsResponse,
  errors: [],
}));

/** Gets details about a Network Connectivity Center route table. */
export interface GetProjectsLocationsGlobalHubsRouteTablesRequest {
  /** Required. The name of the route table resource. */
  name: string;
}

export const GetProjectsLocationsGlobalHubsRouteTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/routeTables/{routeTablesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalHubsRouteTablesRequest>;

export type GetProjectsLocationsGlobalHubsRouteTablesResponse = RouteTable;
export const GetProjectsLocationsGlobalHubsRouteTablesResponse = RouteTable;

export type GetProjectsLocationsGlobalHubsRouteTablesError = CommonErrors;

export const getProjectsLocationsGlobalHubsRouteTables: API.OperationMethod<GetProjectsLocationsGlobalHubsRouteTablesRequest, GetProjectsLocationsGlobalHubsRouteTablesResponse, GetProjectsLocationsGlobalHubsRouteTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalHubsRouteTablesRequest,
  output: GetProjectsLocationsGlobalHubsRouteTablesResponse,
  errors: [],
}));

/** Lists route tables in a given hub. */
export interface ListProjectsLocationsGlobalHubsRouteTablesRequest {
  /** Required. The parent resource's name. */
  parent: string;
  /** The maximum number of results to return per page. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** An expression that filters the list of results. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalHubsRouteTablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/routeTables" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalHubsRouteTablesRequest>;

export type ListProjectsLocationsGlobalHubsRouteTablesResponse = ListRouteTablesResponse;
export const ListProjectsLocationsGlobalHubsRouteTablesResponse = ListRouteTablesResponse;

export type ListProjectsLocationsGlobalHubsRouteTablesError = CommonErrors;

export const listProjectsLocationsGlobalHubsRouteTables = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalHubsRouteTablesRequest,
  output: ListProjectsLocationsGlobalHubsRouteTablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about the specified route. */
export interface GetProjectsLocationsGlobalHubsRouteTablesRoutesRequest {
  /** Required. The name of the route resource. */
  name: string;
}

export const GetProjectsLocationsGlobalHubsRouteTablesRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/routeTables/{routeTablesId}/routes/{routesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalHubsRouteTablesRoutesRequest>;

export type GetProjectsLocationsGlobalHubsRouteTablesRoutesResponse = Route;
export const GetProjectsLocationsGlobalHubsRouteTablesRoutesResponse = Route;

export type GetProjectsLocationsGlobalHubsRouteTablesRoutesError = CommonErrors;

export const getProjectsLocationsGlobalHubsRouteTablesRoutes: API.OperationMethod<GetProjectsLocationsGlobalHubsRouteTablesRoutesRequest, GetProjectsLocationsGlobalHubsRouteTablesRoutesResponse, GetProjectsLocationsGlobalHubsRouteTablesRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalHubsRouteTablesRoutesRequest,
  output: GetProjectsLocationsGlobalHubsRouteTablesRoutesResponse,
  errors: [],
}));

/** Lists routes in a given route table. */
export interface ListProjectsLocationsGlobalHubsRouteTablesRoutesRequest {
  /** Required. The parent resource's name. */
  parent: string;
  /** The maximum number of results to return per page. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** An expression that filters the list of results. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalHubsRouteTablesRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/routeTables/{routeTablesId}/routes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalHubsRouteTablesRoutesRequest>;

export type ListProjectsLocationsGlobalHubsRouteTablesRoutesResponse = ListRoutesResponse;
export const ListProjectsLocationsGlobalHubsRouteTablesRoutesResponse = ListRoutesResponse;

export type ListProjectsLocationsGlobalHubsRouteTablesRoutesError = CommonErrors;

export const listProjectsLocationsGlobalHubsRouteTablesRoutes = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalHubsRouteTablesRoutesRequest,
  output: ListProjectsLocationsGlobalHubsRouteTablesRoutesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about a Network Connectivity Center group. */
export interface GetProjectsLocationsGlobalHubsGroupsRequest {
  /** Required. The name of the route table resource. */
  name: string;
}

export const GetProjectsLocationsGlobalHubsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalHubsGroupsRequest>;

export type GetProjectsLocationsGlobalHubsGroupsResponse = Group;
export const GetProjectsLocationsGlobalHubsGroupsResponse = Group;

export type GetProjectsLocationsGlobalHubsGroupsError = CommonErrors;

export const getProjectsLocationsGlobalHubsGroups: API.OperationMethod<GetProjectsLocationsGlobalHubsGroupsRequest, GetProjectsLocationsGlobalHubsGroupsResponse, GetProjectsLocationsGlobalHubsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalHubsGroupsRequest,
  output: GetProjectsLocationsGlobalHubsGroupsResponse,
  errors: [],
}));

/** Lists groups in a given hub. */
export interface ListProjectsLocationsGlobalHubsGroupsRequest {
  /** Required. The parent resource's name. */
  parent: string;
  /** The maximum number of results to return per page. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** An expression that filters the list of results. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalHubsGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/groups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalHubsGroupsRequest>;

export type ListProjectsLocationsGlobalHubsGroupsResponse = ListGroupsResponse;
export const ListProjectsLocationsGlobalHubsGroupsResponse = ListGroupsResponse;

export type ListProjectsLocationsGlobalHubsGroupsError = CommonErrors;

export const listProjectsLocationsGlobalHubsGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalHubsGroupsRequest,
  output: ListProjectsLocationsGlobalHubsGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the parameters of a Network Connectivity Center group. */
export interface PatchProjectsLocationsGlobalHubsGroupsRequest {
  /** Immutable. The name of the group. Group names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/groups/{group_id}` */
  name: string;
  /** Optional. In the case of an update to an existing group, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Group;
}

export const PatchProjectsLocationsGlobalHubsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalHubsGroupsRequest>;

export type PatchProjectsLocationsGlobalHubsGroupsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsGlobalHubsGroupsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsGlobalHubsGroupsError = CommonErrors;

export const patchProjectsLocationsGlobalHubsGroups: API.OperationMethod<PatchProjectsLocationsGlobalHubsGroupsRequest, PatchProjectsLocationsGlobalHubsGroupsResponse, PatchProjectsLocationsGlobalHubsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlobalHubsGroupsRequest,
  output: PatchProjectsLocationsGlobalHubsGroupsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsGlobalHubsGroupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalHubsGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/groups/{groupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalHubsGroupsRequest>;

export type SetIamPolicyProjectsLocationsGlobalHubsGroupsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalHubsGroupsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalHubsGroupsError = CommonErrors;

export const setIamPolicyProjectsLocationsGlobalHubsGroups: API.OperationMethod<SetIamPolicyProjectsLocationsGlobalHubsGroupsRequest, SetIamPolicyProjectsLocationsGlobalHubsGroupsResponse, SetIamPolicyProjectsLocationsGlobalHubsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalHubsGroupsRequest,
  output: SetIamPolicyProjectsLocationsGlobalHubsGroupsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGlobalHubsGroupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalHubsGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/groups/{groupsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalHubsGroupsRequest>;

export type GetIamPolicyProjectsLocationsGlobalHubsGroupsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalHubsGroupsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalHubsGroupsError = CommonErrors;

export const getIamPolicyProjectsLocationsGlobalHubsGroups: API.OperationMethod<GetIamPolicyProjectsLocationsGlobalHubsGroupsRequest, GetIamPolicyProjectsLocationsGlobalHubsGroupsResponse, GetIamPolicyProjectsLocationsGlobalHubsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalHubsGroupsRequest,
  output: GetIamPolicyProjectsLocationsGlobalHubsGroupsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGlobalHubsGroupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalHubsGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/hubs/{hubsId}/groups/{groupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalHubsGroupsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalHubsGroupsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalHubsGroupsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalHubsGroupsError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlobalHubsGroups: API.OperationMethod<TestIamPermissionsProjectsLocationsGlobalHubsGroupsRequest, TestIamPermissionsProjectsLocationsGlobalHubsGroupsResponse, TestIamPermissionsProjectsLocationsGlobalHubsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalHubsGroupsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalHubsGroupsResponse,
  errors: [],
}));

/** Lists policy-based routes in a given project and location. */
export interface ListProjectsLocationsGlobalPolicyBasedRoutesRequest {
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

export const ListProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type ListProjectsLocationsGlobalPolicyBasedRoutesResponse = ListPolicyBasedRoutesResponse;
export const ListProjectsLocationsGlobalPolicyBasedRoutesResponse = ListPolicyBasedRoutesResponse;

export type ListProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const listProjectsLocationsGlobalPolicyBasedRoutes = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: ListProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single policy-based route. */
export interface GetProjectsLocationsGlobalPolicyBasedRoutesRequest {
  /** Required. Name of the PolicyBasedRoute resource to get. */
  name: string;
}

export const GetProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes/{policyBasedRoutesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type GetProjectsLocationsGlobalPolicyBasedRoutesResponse = PolicyBasedRoute;
export const GetProjectsLocationsGlobalPolicyBasedRoutesResponse = PolicyBasedRoute;

export type GetProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const getProjectsLocationsGlobalPolicyBasedRoutes: API.OperationMethod<GetProjectsLocationsGlobalPolicyBasedRoutesRequest, GetProjectsLocationsGlobalPolicyBasedRoutesResponse, GetProjectsLocationsGlobalPolicyBasedRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: GetProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
}));

/** Creates a new policy-based route in a given project and location. */
export interface CreateProjectsLocationsGlobalPolicyBasedRoutesRequest {
  /** Required. The parent resource's name of the PolicyBasedRoute. */
  parent: string;
  /** Required. Unique id for the policy-based route to create. Provided by the client when the resource is created. The name must comply with https://google.aip.dev/122#resource-id-segments. Specifically, the name must be 1-63 characters long and match the regular expression [a-z]([a-z0-9-]*[a-z0-9])?. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. */
  policyBasedRouteId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: PolicyBasedRoute;
}

export const CreateProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  policyBasedRouteId: Schema.optional(Schema.String).pipe(T.HttpQuery("policyBasedRouteId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(PolicyBasedRoute).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type CreateProjectsLocationsGlobalPolicyBasedRoutesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsGlobalPolicyBasedRoutesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const createProjectsLocationsGlobalPolicyBasedRoutes: API.OperationMethod<CreateProjectsLocationsGlobalPolicyBasedRoutesRequest, CreateProjectsLocationsGlobalPolicyBasedRoutesResponse, CreateProjectsLocationsGlobalPolicyBasedRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: CreateProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
}));

/** Deletes a single policy-based route. */
export interface DeleteProjectsLocationsGlobalPolicyBasedRoutesRequest {
  /** Required. Name of the policy-based route resource to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes/{policyBasedRoutesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type DeleteProjectsLocationsGlobalPolicyBasedRoutesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsGlobalPolicyBasedRoutesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const deleteProjectsLocationsGlobalPolicyBasedRoutes: API.OperationMethod<DeleteProjectsLocationsGlobalPolicyBasedRoutesRequest, DeleteProjectsLocationsGlobalPolicyBasedRoutesResponse, DeleteProjectsLocationsGlobalPolicyBasedRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: DeleteProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes/{policyBasedRoutesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const setIamPolicyProjectsLocationsGlobalPolicyBasedRoutes: API.OperationMethod<SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest, SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse, SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: SetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes/{policyBasedRoutesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const getIamPolicyProjectsLocationsGlobalPolicyBasedRoutes: API.OperationMethod<GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest, GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse, GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: GetIamPolicyProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/policyBasedRoutes/{policyBasedRoutesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesRequest>;

export type TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlobalPolicyBasedRoutes: API.OperationMethod<TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesRequest, TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesResponse, TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesRequest,
  output: TestIamPermissionsProjectsLocationsGlobalPolicyBasedRoutesResponse,
  errors: [],
}));

/** Lists the Network Connectivity Center spokes in a specified project and location. */
export interface ListProjectsLocationsSpokesRequest {
  /** Required. The parent resource. */
  parent: string;
  /** The maximum number of results to return per page. */
  pageSize?: number;
  /** The page token. */
  pageToken?: string;
  /** An expression that filters the list of results. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSpokesRequest>;

export type ListProjectsLocationsSpokesResponse = ListSpokesResponse;
export const ListProjectsLocationsSpokesResponse = ListSpokesResponse;

export type ListProjectsLocationsSpokesError = CommonErrors;

export const listProjectsLocationsSpokes = API.makePaginated(() => ({
  input: ListProjectsLocationsSpokesRequest,
  output: ListProjectsLocationsSpokesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about a Network Connectivity Center spoke. */
export interface GetProjectsLocationsSpokesRequest {
  /** Required. The name of the spoke resource. */
  name: string;
}

export const GetProjectsLocationsSpokesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSpokesRequest>;

export type GetProjectsLocationsSpokesResponse = Spoke;
export const GetProjectsLocationsSpokesResponse = Spoke;

export type GetProjectsLocationsSpokesError = CommonErrors;

export const getProjectsLocationsSpokes: API.OperationMethod<GetProjectsLocationsSpokesRequest, GetProjectsLocationsSpokesResponse, GetProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSpokesRequest,
  output: GetProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Creates a Network Connectivity Center spoke. */
export interface CreateProjectsLocationsSpokesRequest {
  /** Required. The parent resource. */
  parent: string;
  /** Required. Unique id for the spoke to create. */
  spokeId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSpokesRequest>;

export type CreateProjectsLocationsSpokesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsSpokesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsSpokesError = CommonErrors;

export const createProjectsLocationsSpokes: API.OperationMethod<CreateProjectsLocationsSpokesRequest, CreateProjectsLocationsSpokesResponse, CreateProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSpokesRequest,
  output: CreateProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Updates the parameters of a Network Connectivity Center spoke. */
export interface PatchProjectsLocationsSpokesRequest {
  /** Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}` */
  name: string;
  /** Optional. In the case of an update to an existing spoke, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
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
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSpokesRequest>;

export type PatchProjectsLocationsSpokesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsSpokesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsSpokesError = CommonErrors;

export const patchProjectsLocationsSpokes: API.OperationMethod<PatchProjectsLocationsSpokesRequest, PatchProjectsLocationsSpokesResponse, PatchProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSpokesRequest,
  output: PatchProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Deletes a Network Connectivity Center spoke. */
export interface DeleteProjectsLocationsSpokesRequest {
  /** Required. The name of the spoke to delete. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsSpokesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSpokesRequest>;

export type DeleteProjectsLocationsSpokesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsSpokesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsSpokesError = CommonErrors;

export const deleteProjectsLocationsSpokes: API.OperationMethod<DeleteProjectsLocationsSpokesRequest, DeleteProjectsLocationsSpokesResponse, DeleteProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSpokesRequest,
  output: DeleteProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsSpokesRequest>;

export type SetIamPolicyProjectsLocationsSpokesResponse = Policy;
export const SetIamPolicyProjectsLocationsSpokesResponse = Policy;

export type SetIamPolicyProjectsLocationsSpokesError = CommonErrors;

export const setIamPolicyProjectsLocationsSpokes: API.OperationMethod<SetIamPolicyProjectsLocationsSpokesRequest, SetIamPolicyProjectsLocationsSpokesResponse, SetIamPolicyProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsSpokesRequest,
  output: SetIamPolicyProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsSpokesRequest>;

export type GetIamPolicyProjectsLocationsSpokesResponse = Policy;
export const GetIamPolicyProjectsLocationsSpokesResponse = Policy;

export type GetIamPolicyProjectsLocationsSpokesError = CommonErrors;

export const getIamPolicyProjectsLocationsSpokes: API.OperationMethod<GetIamPolicyProjectsLocationsSpokesRequest, GetIamPolicyProjectsLocationsSpokesResponse, GetIamPolicyProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsSpokesRequest,
  output: GetIamPolicyProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/spokes/{spokesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsSpokesRequest>;

export type TestIamPermissionsProjectsLocationsSpokesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsSpokesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsSpokesError = CommonErrors;

export const testIamPermissionsProjectsLocationsSpokes: API.OperationMethod<TestIamPermissionsProjectsLocationsSpokesRequest, TestIamPermissionsProjectsLocationsSpokesResponse, TestIamPermissionsProjectsLocationsSpokesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsSpokesRequest,
  output: TestIamPermissionsProjectsLocationsSpokesResponse,
  errors: [],
}));

/** Lists internal ranges in a given project and location. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInternalRangesRequest>;

export type ListProjectsLocationsInternalRangesResponse = ListInternalRangesResponse;
export const ListProjectsLocationsInternalRangesResponse = ListInternalRangesResponse;

export type ListProjectsLocationsInternalRangesError = CommonErrors;

export const listProjectsLocationsInternalRanges = API.makePaginated(() => ({
  input: ListProjectsLocationsInternalRangesRequest,
  output: ListProjectsLocationsInternalRangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single internal range. */
export interface GetProjectsLocationsInternalRangesRequest {
  /** Required. Name of the InternalRange to get. */
  name: string;
}

export const GetProjectsLocationsInternalRangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInternalRangesRequest>;

export type GetProjectsLocationsInternalRangesResponse = InternalRange;
export const GetProjectsLocationsInternalRangesResponse = InternalRange;

export type GetProjectsLocationsInternalRangesError = CommonErrors;

export const getProjectsLocationsInternalRanges: API.OperationMethod<GetProjectsLocationsInternalRangesRequest, GetProjectsLocationsInternalRangesResponse, GetProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInternalRangesRequest,
  output: GetProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Creates a new internal range in a given project and location. */
export interface CreateProjectsLocationsInternalRangesRequest {
  /** Required. The parent resource's name of the internal range. */
  parent: string;
  /** Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/internalRanges/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. */
  internalRangeId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInternalRangesRequest>;

export type CreateProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsInternalRangesError = CommonErrors;

export const createProjectsLocationsInternalRanges: API.OperationMethod<CreateProjectsLocationsInternalRangesRequest, CreateProjectsLocationsInternalRangesResponse, CreateProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInternalRangesRequest,
  output: CreateProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Updates the parameters of a single internal range. */
export interface PatchProjectsLocationsInternalRangesRequest {
  /** Identifier. The name of an internal range. Format: projects/{project}/locations/{location}/internalRanges/{internal_range} See: https://google.aip.dev/122#fields-representing-resource-names */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the InternalRange resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
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
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInternalRangesRequest>;

export type PatchProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsInternalRangesError = CommonErrors;

export const patchProjectsLocationsInternalRanges: API.OperationMethod<PatchProjectsLocationsInternalRangesRequest, PatchProjectsLocationsInternalRangesResponse, PatchProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInternalRangesRequest,
  output: PatchProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Deletes a single internal range. */
export interface DeleteProjectsLocationsInternalRangesRequest {
  /** Required. The name of the internal range to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsInternalRangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInternalRangesRequest>;

export type DeleteProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsInternalRangesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsInternalRangesError = CommonErrors;

export const deleteProjectsLocationsInternalRanges: API.OperationMethod<DeleteProjectsLocationsInternalRangesRequest, DeleteProjectsLocationsInternalRangesResponse, DeleteProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInternalRangesRequest,
  output: DeleteProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInternalRangesRequest>;

export type SetIamPolicyProjectsLocationsInternalRangesResponse = Policy;
export const SetIamPolicyProjectsLocationsInternalRangesResponse = Policy;

export type SetIamPolicyProjectsLocationsInternalRangesError = CommonErrors;

export const setIamPolicyProjectsLocationsInternalRanges: API.OperationMethod<SetIamPolicyProjectsLocationsInternalRangesRequest, SetIamPolicyProjectsLocationsInternalRangesResponse, SetIamPolicyProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsInternalRangesRequest,
  output: SetIamPolicyProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInternalRangesRequest>;

export type GetIamPolicyProjectsLocationsInternalRangesResponse = Policy;
export const GetIamPolicyProjectsLocationsInternalRangesResponse = Policy;

export type GetIamPolicyProjectsLocationsInternalRangesError = CommonErrors;

export const getIamPolicyProjectsLocationsInternalRanges: API.OperationMethod<GetIamPolicyProjectsLocationsInternalRangesRequest, GetIamPolicyProjectsLocationsInternalRangesResponse, GetIamPolicyProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsInternalRangesRequest,
  output: GetIamPolicyProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/internalRanges/{internalRangesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInternalRangesRequest>;

export type TestIamPermissionsProjectsLocationsInternalRangesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInternalRangesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInternalRangesError = CommonErrors;

export const testIamPermissionsProjectsLocationsInternalRanges: API.OperationMethod<TestIamPermissionsProjectsLocationsInternalRangesRequest, TestIamPermissionsProjectsLocationsInternalRangesResponse, TestIamPermissionsProjectsLocationsInternalRangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInternalRangesRequest,
  output: TestIamPermissionsProjectsLocationsInternalRangesResponse,
  errors: [],
}));

/** Lists RegionalEndpoints in a given project and location. */
export interface ListProjectsLocationsRegionalEndpointsRequest {
  /** Required. The parent resource's name of the RegionalEndpoint. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A page token. */
  pageToken?: string;
  /** A filter expression that filters the results listed in the response. */
  filter?: string;
  /** Sort the results by a certain order. */
  orderBy?: string;
}

export const ListProjectsLocationsRegionalEndpointsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/regionalEndpoints" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRegionalEndpointsRequest>;

export type ListProjectsLocationsRegionalEndpointsResponse = ListRegionalEndpointsResponse;
export const ListProjectsLocationsRegionalEndpointsResponse = ListRegionalEndpointsResponse;

export type ListProjectsLocationsRegionalEndpointsError = CommonErrors;

export const listProjectsLocationsRegionalEndpoints = API.makePaginated(() => ({
  input: ListProjectsLocationsRegionalEndpointsRequest,
  output: ListProjectsLocationsRegionalEndpointsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single RegionalEndpoint. */
export interface GetProjectsLocationsRegionalEndpointsRequest {
  /** Required. Name of the RegionalEndpoint resource to get. Format: `projects/{project}/locations/{location}/regionalEndpoints/{regional_endpoint}` */
  name: string;
}

export const GetProjectsLocationsRegionalEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/regionalEndpoints/{regionalEndpointsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRegionalEndpointsRequest>;

export type GetProjectsLocationsRegionalEndpointsResponse = RegionalEndpoint;
export const GetProjectsLocationsRegionalEndpointsResponse = RegionalEndpoint;

export type GetProjectsLocationsRegionalEndpointsError = CommonErrors;

export const getProjectsLocationsRegionalEndpoints: API.OperationMethod<GetProjectsLocationsRegionalEndpointsRequest, GetProjectsLocationsRegionalEndpointsResponse, GetProjectsLocationsRegionalEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRegionalEndpointsRequest,
  output: GetProjectsLocationsRegionalEndpointsResponse,
  errors: [],
}));

/** Creates a new RegionalEndpoint in a given project and location. */
export interface CreateProjectsLocationsRegionalEndpointsRequest {
  /** Required. The parent resource's name of the RegionalEndpoint. */
  parent: string;
  /** Required. Unique id of the Regional Endpoint to be created. @pattern: ^[-a-z0-9](?:[-a-z0-9]{0,44})[a-z0-9]$ */
  regionalEndpointId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: RegionalEndpoint;
}

export const CreateProjectsLocationsRegionalEndpointsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  regionalEndpointId: Schema.optional(Schema.String).pipe(T.HttpQuery("regionalEndpointId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(RegionalEndpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/regionalEndpoints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRegionalEndpointsRequest>;

export type CreateProjectsLocationsRegionalEndpointsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsRegionalEndpointsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsRegionalEndpointsError = CommonErrors;

export const createProjectsLocationsRegionalEndpoints: API.OperationMethod<CreateProjectsLocationsRegionalEndpointsRequest, CreateProjectsLocationsRegionalEndpointsResponse, CreateProjectsLocationsRegionalEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRegionalEndpointsRequest,
  output: CreateProjectsLocationsRegionalEndpointsResponse,
  errors: [],
}));

/** Deletes a single RegionalEndpoint. */
export interface DeleteProjectsLocationsRegionalEndpointsRequest {
  /** Required. The name of the RegionalEndpoint to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsRegionalEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/regionalEndpoints/{regionalEndpointsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRegionalEndpointsRequest>;

export type DeleteProjectsLocationsRegionalEndpointsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsRegionalEndpointsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsRegionalEndpointsError = CommonErrors;

export const deleteProjectsLocationsRegionalEndpoints: API.OperationMethod<DeleteProjectsLocationsRegionalEndpointsRequest, DeleteProjectsLocationsRegionalEndpointsResponse, DeleteProjectsLocationsRegionalEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRegionalEndpointsRequest,
  output: DeleteProjectsLocationsRegionalEndpointsResponse,
  errors: [],
}));

