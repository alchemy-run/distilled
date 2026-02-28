// ==========================================================================
// Managed Service for Apache Kafka API (managedkafka v1)
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
  name: "managedkafka",
  version: "v1",
  rootUrl: "https://managedkafka.googleapis.com/",
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

export interface NetworkConfig {
  /** Required. Name of the VPC subnet in which to create Private Service Connect (PSC) endpoints for the Kafka brokers and bootstrap address. Structured like: projects/{project}/regions/{region}/subnetworks/{subnet_id} The subnet must be located in the same region as the Kafka cluster. The project may differ. Multiple subnets from the same parent network must not be specified. */
  subnet?: string;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  subnet: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface AccessConfig {
  /** Required. Virtual Private Cloud (VPC) networks that must be granted direct access to the Kafka cluster. Minimum of 1 network is required. Maximum 10 networks can be specified. */
  networkConfigs?: Array<NetworkConfig>;
}

export const AccessConfig: Schema.Schema<AccessConfig> = Schema.suspend(() => Schema.Struct({
  networkConfigs: Schema.optional(Schema.Array(NetworkConfig)),
})).annotate({ identifier: "AccessConfig" }) as any as Schema.Schema<AccessConfig>;

export interface GcpConfig {
  /** Required. Access configuration for the Kafka cluster. */
  accessConfig?: AccessConfig;
  /** Optional. Immutable. The Cloud KMS Key name to use for encryption. The key must be located in the same region as the cluster and cannot be changed. Structured like: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}. */
  kmsKey?: string;
}

export const GcpConfig: Schema.Schema<GcpConfig> = Schema.suspend(() => Schema.Struct({
  accessConfig: Schema.optional(AccessConfig),
  kmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GcpConfig" }) as any as Schema.Schema<GcpConfig>;

export interface CapacityConfig {
  /** Required. The number of vCPUs to provision for the cluster. Minimum: 3. */
  vcpuCount?: string;
  /** Required. The memory to provision for the cluster in bytes. The CPU:memory ratio (vCPU:GiB) must be between 1:1 and 1:8. Minimum: 3221225472 (3 GiB). */
  memoryBytes?: string;
}

export const CapacityConfig: Schema.Schema<CapacityConfig> = Schema.suspend(() => Schema.Struct({
  vcpuCount: Schema.optional(Schema.String),
  memoryBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "CapacityConfig" }) as any as Schema.Schema<CapacityConfig>;

export interface RebalanceConfig {
  /** Optional. The rebalance behavior for the cluster. When not specified, defaults to `NO_REBALANCE`. */
  mode?: "MODE_UNSPECIFIED" | "NO_REBALANCE" | "AUTO_REBALANCE_ON_SCALE_UP" | (string & {});
}

export const RebalanceConfig: Schema.Schema<RebalanceConfig> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "RebalanceConfig" }) as any as Schema.Schema<RebalanceConfig>;

export interface CertificateAuthorityServiceConfig {
  /** Required. The name of the CA pool to pull CA certificates from. Structured like: projects/{project}/locations/{location}/caPools/{ca_pool}. The CA pool does not need to be in the same project or location as the Kafka cluster. */
  caPool?: string;
}

export const CertificateAuthorityServiceConfig: Schema.Schema<CertificateAuthorityServiceConfig> = Schema.suspend(() => Schema.Struct({
  caPool: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateAuthorityServiceConfig" }) as any as Schema.Schema<CertificateAuthorityServiceConfig>;

export interface TrustConfig {
  /** Optional. Configuration for the Google Certificate Authority Service. Maximum 10. */
  casConfigs?: Array<CertificateAuthorityServiceConfig>;
}

export const TrustConfig: Schema.Schema<TrustConfig> = Schema.suspend(() => Schema.Struct({
  casConfigs: Schema.optional(Schema.Array(CertificateAuthorityServiceConfig)),
})).annotate({ identifier: "TrustConfig" }) as any as Schema.Schema<TrustConfig>;

export interface TlsConfig {
  /** Optional. The configuration of the broker truststore. If specified, clients can use mTLS for authentication. */
  trustConfig?: TrustConfig;
  /** Optional. A list of rules for mapping from SSL principal names to short names. These are applied in order by Kafka. Refer to the Apache Kafka documentation for `ssl.principal.mapping.rules` for the precise formatting details and syntax. Example: "RULE:^CN=(.*?),OU=ServiceUsers.*$/$1@example.com/,DEFAULT" This is a static Kafka broker configuration. Setting or modifying this field will trigger a rolling restart of the Kafka brokers to apply the change. An empty string means no rules are applied (Kafka default). */
  sslPrincipalMappingRules?: string;
}

export const TlsConfig: Schema.Schema<TlsConfig> = Schema.suspend(() => Schema.Struct({
  trustConfig: Schema.optional(TrustConfig),
  sslPrincipalMappingRules: Schema.optional(Schema.String),
})).annotate({ identifier: "TlsConfig" }) as any as Schema.Schema<TlsConfig>;

export interface UpdateOptions {
  /** Optional. If true, allows an update operation that increases the total vCPU and/or memory allocation of the cluster to significantly decrease the per-broker vCPU and/or memory allocation. This can result in reduced performance and availability. By default, the update operation will fail if an upscale request results in a vCPU or memory allocation for the brokers that is smaller than 90% of the current broker size. */
  allowBrokerDownscaleOnClusterUpscale?: boolean;
}

export const UpdateOptions: Schema.Schema<UpdateOptions> = Schema.suspend(() => Schema.Struct({
  allowBrokerDownscaleOnClusterUpscale: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UpdateOptions" }) as any as Schema.Schema<UpdateOptions>;

export interface BrokerDetails {
  /** Output only. The index of the broker. */
  brokerIndex?: string;
  /** Output only. The node id of the broker. */
  nodeId?: string;
  /** Output only. The rack of the broker. */
  rack?: string;
}

export const BrokerDetails: Schema.Schema<BrokerDetails> = Schema.suspend(() => Schema.Struct({
  brokerIndex: Schema.optional(Schema.String),
  nodeId: Schema.optional(Schema.String),
  rack: Schema.optional(Schema.String),
})).annotate({ identifier: "BrokerDetails" }) as any as Schema.Schema<BrokerDetails>;

export interface Cluster {
  /** Required. Configuration properties for a Kafka cluster deployed to Google Cloud Platform. */
  gcpConfig?: GcpConfig;
  /** Identifier. The name of the cluster. Structured like: projects/{project_number}/locations/{location}/clusters/{cluster_id} */
  name?: string;
  /** Output only. The time when the cluster was created. */
  createTime?: string;
  /** Output only. The time when the cluster was last updated. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Required. Capacity configuration for the Kafka cluster. */
  capacityConfig?: CapacityConfig;
  /** Optional. Rebalance configuration for the Kafka cluster. */
  rebalanceConfig?: RebalanceConfig;
  /** Output only. The current state of the cluster. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Optional. TLS configuration for the Kafka cluster. */
  tlsConfig?: TlsConfig;
  /** Optional. UpdateOptions represents options that control how updates to the cluster are applied. */
  updateOptions?: UpdateOptions;
  /** Output only. Only populated when FULL view is requested. The Kafka version of the cluster. */
  kafkaVersion?: string;
  /** Output only. Only populated when FULL view is requested. Details of each broker in the cluster. */
  brokerDetails?: Array<BrokerDetails>;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() => Schema.Struct({
  gcpConfig: Schema.optional(GcpConfig),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  capacityConfig: Schema.optional(CapacityConfig),
  rebalanceConfig: Schema.optional(RebalanceConfig),
  state: Schema.optional(Schema.String),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  tlsConfig: Schema.optional(TlsConfig),
  updateOptions: Schema.optional(UpdateOptions),
  kafkaVersion: Schema.optional(Schema.String),
  brokerDetails: Schema.optional(Schema.Array(BrokerDetails)),
})).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ListClustersResponse {
  /** The list of Clusters in the requested parent. */
  clusters?: Array<Cluster>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> = Schema.suspend(() => Schema.Struct({
  clusters: Schema.optional(Schema.Array(Cluster)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListClustersResponse" }) as any as Schema.Schema<ListClustersResponse>;

export interface Topic {
  /** Identifier. The name of the topic. The `topic` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic} */
  name?: string;
  /** Required. The number of partitions this topic has. The partition count can only be increased, not decreased. Please note that if partitions are increased for a topic that has a key, the partitioning logic or the ordering of the messages will be affected. */
  partitionCount?: number;
  /** Required. Immutable. The number of replicas of each partition. A replication factor of 3 is recommended for high availability. */
  replicationFactor?: number;
  /** Optional. Configurations for the topic that are overridden from the cluster defaults. The key of the map is a Kafka topic property name, for example: `cleanup.policy`, `compression.type`. */
  configs?: Record<string, string>;
}

export const Topic: Schema.Schema<Topic> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  partitionCount: Schema.optional(Schema.Number),
  replicationFactor: Schema.optional(Schema.Number),
  configs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface ListTopicsResponse {
  /** The list of topics in the requested parent. The order of the topics is unspecified. */
  topics?: Array<Topic>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListTopicsResponse: Schema.Schema<ListTopicsResponse> = Schema.suspend(() => Schema.Struct({
  topics: Schema.optional(Schema.Array(Topic)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTopicsResponse" }) as any as Schema.Schema<ListTopicsResponse>;

export interface ConsumerPartitionMetadata {
  /** Required. The current offset for this partition, or 0 if no offset has been committed. */
  offset?: string;
  /** Optional. The associated metadata for this partition, or empty if it does not exist. */
  metadata?: string;
}

export const ConsumerPartitionMetadata: Schema.Schema<ConsumerPartitionMetadata> = Schema.suspend(() => Schema.Struct({
  offset: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsumerPartitionMetadata" }) as any as Schema.Schema<ConsumerPartitionMetadata>;

export interface ConsumerTopicMetadata {
  /** Optional. Metadata for this consumer group and topic for all partition indexes it has metadata for. */
  partitions?: Record<string, ConsumerPartitionMetadata>;
}

export const ConsumerTopicMetadata: Schema.Schema<ConsumerTopicMetadata> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Record(Schema.String, ConsumerPartitionMetadata)),
})).annotate({ identifier: "ConsumerTopicMetadata" }) as any as Schema.Schema<ConsumerTopicMetadata>;

export interface ConsumerGroup {
  /** Identifier. The name of the consumer group. The `consumer_group` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumer_group} */
  name?: string;
  /** Optional. Metadata for this consumer group for all topics it has metadata for. The key of the map is a topic name, structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic} */
  topics?: Record<string, ConsumerTopicMetadata>;
}

export const ConsumerGroup: Schema.Schema<ConsumerGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  topics: Schema.optional(Schema.Record(Schema.String, ConsumerTopicMetadata)),
})).annotate({ identifier: "ConsumerGroup" }) as any as Schema.Schema<ConsumerGroup>;

export interface ListConsumerGroupsResponse {
  /** The list of consumer group in the requested parent. The order of the consumer groups is unspecified. */
  consumerGroups?: Array<ConsumerGroup>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListConsumerGroupsResponse: Schema.Schema<ListConsumerGroupsResponse> = Schema.suspend(() => Schema.Struct({
  consumerGroups: Schema.optional(Schema.Array(ConsumerGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConsumerGroupsResponse" }) as any as Schema.Schema<ListConsumerGroupsResponse>;

export interface AclEntry {
  /** Required. The principal. Specified as Google Cloud account, with the Kafka StandardAuthorizer prefix "User:". For example: "User:test-kafka-client@test-project.iam.gserviceaccount.com". Can be the wildcard "User:*" to refer to all users. */
  principal?: string;
  /** Required. The permission type. Accepted values are (case insensitive): ALLOW, DENY. */
  permissionType?: string;
  /** Required. The operation type. Allowed values are (case insensitive): ALL, READ, WRITE, CREATE, DELETE, ALTER, DESCRIBE, CLUSTER_ACTION, DESCRIBE_CONFIGS, ALTER_CONFIGS, and IDEMPOTENT_WRITE. See https://kafka.apache.org/documentation/#operations_resources_and_protocols for valid combinations of resource_type and operation for different Kafka API requests. */
  operation?: string;
  /** Required. The host. Must be set to "*" for Managed Service for Apache Kafka. */
  host?: string;
}

export const AclEntry: Schema.Schema<AclEntry> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(Schema.String),
  permissionType: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
})).annotate({ identifier: "AclEntry" }) as any as Schema.Schema<AclEntry>;

export interface Acl {
  /** Identifier. The name for the acl. Represents a single Resource Pattern. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id} The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. `acl_id` is structured like one of the following: For acls on the cluster: `cluster` For acls on a single resource within the cluster: `topic/{resource_name}` `consumerGroup/{resource_name}` `transactionalId/{resource_name}` For acls on all resources that match a prefix: `topicPrefixed/{resource_name}` `consumerGroupPrefixed/{resource_name}` `transactionalIdPrefixed/{resource_name}` For acls on all resources of a given type (i.e. the wildcard literal "*"): `allTopics` (represents `topic/*`) `allConsumerGroups` (represents `consumerGroup/*`) `allTransactionalIds` (represents `transactionalId/*`) */
  name?: string;
  /** Required. The ACL entries that apply to the resource pattern. The maximum number of allowed entries 100. */
  aclEntries?: Array<AclEntry>;
  /** Optional. `etag` is used for concurrency control. An `etag` is returned in the response to `GetAcl` and `CreateAcl`. Callers are required to put that etag in the request to `UpdateAcl` to ensure that their change will be applied to the same version of the acl that exists in the Kafka Cluster. A terminal 'T' character in the etag indicates that the AclEntries were truncated; more entries for the Acl exist on the Kafka Cluster, but can't be returned in the Acl due to repeated field limits. */
  etag?: string;
  /** Output only. The ACL resource type derived from the name. One of: CLUSTER, TOPIC, GROUP, TRANSACTIONAL_ID. */
  resourceType?: string;
  /** Output only. The ACL resource name derived from the name. For cluster resource_type, this is always "kafka-cluster". Can be the wildcard literal "*". */
  resourceName?: string;
  /** Output only. The ACL pattern type derived from the name. One of: LITERAL, PREFIXED. */
  patternType?: string;
}

export const Acl: Schema.Schema<Acl> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  aclEntries: Schema.optional(Schema.Array(AclEntry)),
  etag: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  patternType: Schema.optional(Schema.String),
})).annotate({ identifier: "Acl" }) as any as Schema.Schema<Acl>;

export interface ListAclsResponse {
  /** The list of acls in the requested parent. The order of the acls is unspecified. */
  acls?: Array<Acl>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListAclsResponse: Schema.Schema<ListAclsResponse> = Schema.suspend(() => Schema.Struct({
  acls: Schema.optional(Schema.Array(Acl)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAclsResponse" }) as any as Schema.Schema<ListAclsResponse>;

export interface AddAclEntryResponse {
  /** The updated acl. */
  acl?: Acl;
  /** Whether the acl was created as a result of adding the acl entry. */
  aclCreated?: boolean;
}

export const AddAclEntryResponse: Schema.Schema<AddAclEntryResponse> = Schema.suspend(() => Schema.Struct({
  acl: Schema.optional(Acl),
  aclCreated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AddAclEntryResponse" }) as any as Schema.Schema<AddAclEntryResponse>;

export interface RemoveAclEntryResponse {
  /** The updated acl. Returned if the removed acl entry was not the last entry in the acl. */
  acl?: Acl;
  /** Returned with value true if the removed acl entry was the last entry in the acl, resulting in acl deletion. */
  aclDeleted?: boolean;
}

export const RemoveAclEntryResponse: Schema.Schema<RemoveAclEntryResponse> = Schema.suspend(() => Schema.Struct({
  acl: Schema.optional(Acl),
  aclDeleted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemoveAclEntryResponse" }) as any as Schema.Schema<RemoveAclEntryResponse>;

export interface ConnectNetworkConfig {
  /** Required. VPC subnet to make available to the Kafka Connect cluster. Structured like: projects/{project}/regions/{region}/subnetworks/{subnet_id} It is used to create a Private Service Connect (PSC) interface for the Kafka Connect workers. It must be located in the same region as the Kafka Connect cluster. The CIDR range of the subnet must be within the IPv4 address ranges for private networks, as specified in RFC 1918. The primary subnet CIDR range must have a minimum size of /22 (1024 addresses). */
  primarySubnet?: string;
  /** Optional. Deprecated: Managed Kafka Connect clusters can now reach any endpoint accessible from the primary subnet without the need to define additional subnets. Please see https://cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster#worker-subnet for more information. */
  additionalSubnets?: Array<string>;
  /** Optional. Additional DNS domain names from the subnet's network to be made visible to the Connect Cluster. When using MirrorMaker2, it's necessary to add the bootstrap address's dns domain name of the target cluster to make it visible to the connector. For example: my-kafka-cluster.us-central1.managedkafka.my-project.cloud.goog */
  dnsDomainNames?: Array<string>;
}

export const ConnectNetworkConfig: Schema.Schema<ConnectNetworkConfig> = Schema.suspend(() => Schema.Struct({
  primarySubnet: Schema.optional(Schema.String),
  additionalSubnets: Schema.optional(Schema.Array(Schema.String)),
  dnsDomainNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ConnectNetworkConfig" }) as any as Schema.Schema<ConnectNetworkConfig>;

export interface ConnectAccessConfig {
  /** Required. Virtual Private Cloud (VPC) networks that must be granted direct access to the Kafka Connect cluster. Minimum of 1 network is required. Maximum 10 networks can be specified. */
  networkConfigs?: Array<ConnectNetworkConfig>;
}

export const ConnectAccessConfig: Schema.Schema<ConnectAccessConfig> = Schema.suspend(() => Schema.Struct({
  networkConfigs: Schema.optional(Schema.Array(ConnectNetworkConfig)),
})).annotate({ identifier: "ConnectAccessConfig" }) as any as Schema.Schema<ConnectAccessConfig>;

export interface ConnectGcpConfig {
  /** Required. Access configuration for the Kafka Connect cluster. */
  accessConfig?: ConnectAccessConfig;
  /** Optional. Secrets to load into workers. Exact SecretVersions from Secret Manager must be provided -- aliases are not supported. Up to 32 secrets may be loaded into one cluster. Format: projects//secrets//versions/ */
  secretPaths?: Array<string>;
}

export const ConnectGcpConfig: Schema.Schema<ConnectGcpConfig> = Schema.suspend(() => Schema.Struct({
  accessConfig: Schema.optional(ConnectAccessConfig),
  secretPaths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ConnectGcpConfig" }) as any as Schema.Schema<ConnectGcpConfig>;

export interface ConnectCluster {
  /** Required. Configuration properties for a Kafka Connect cluster deployed to Google Cloud Platform. */
  gcpConfig?: ConnectGcpConfig;
  /** Identifier. The name of the Kafka Connect cluster. Structured like: projects/{project_number}/locations/{location}/connectClusters/{connect_cluster_id} */
  name?: string;
  /** Required. Immutable. The name of the Kafka cluster this Kafka Connect cluster is attached to. Structured like: projects/{project}/locations/{location}/clusters/{cluster} */
  kafkaCluster?: string;
  /** Output only. The time when the cluster was created. */
  createTime?: string;
  /** Output only. The time when the cluster was last updated. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Required. Capacity configuration for the Kafka Connect cluster. */
  capacityConfig?: CapacityConfig;
  /** Output only. The current state of the Kafka Connect cluster. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "DETACHED" | (string & {});
  /** Optional. Configurations for the worker that are overridden from the defaults. The key of the map is a Kafka Connect worker property name, for example: `exactly.once.source.support`. */
  config?: Record<string, string>;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
}

export const ConnectCluster: Schema.Schema<ConnectCluster> = Schema.suspend(() => Schema.Struct({
  gcpConfig: Schema.optional(ConnectGcpConfig),
  name: Schema.optional(Schema.String),
  kafkaCluster: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  capacityConfig: Schema.optional(CapacityConfig),
  state: Schema.optional(Schema.String),
  config: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  satisfiesPzs: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConnectCluster" }) as any as Schema.Schema<ConnectCluster>;

export interface ListConnectClustersResponse {
  /** The list of Connect clusters in the requested parent. */
  connectClusters?: Array<ConnectCluster>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConnectClustersResponse: Schema.Schema<ListConnectClustersResponse> = Schema.suspend(() => Schema.Struct({
  connectClusters: Schema.optional(Schema.Array(ConnectCluster)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConnectClustersResponse" }) as any as Schema.Schema<ListConnectClustersResponse>;

export interface TaskRetryPolicy {
  /** Optional. The minimum amount of time to wait before retrying a failed task. This sets a lower bound for the backoff delay. */
  minimumBackoff?: string;
  /** Optional. The maximum amount of time to wait before retrying a failed task. This sets an upper bound for the backoff delay. */
  maximumBackoff?: string;
  /** Optional. If true, task retry is disabled. */
  taskRetryDisabled?: boolean;
}

export const TaskRetryPolicy: Schema.Schema<TaskRetryPolicy> = Schema.suspend(() => Schema.Struct({
  minimumBackoff: Schema.optional(Schema.String),
  maximumBackoff: Schema.optional(Schema.String),
  taskRetryDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TaskRetryPolicy" }) as any as Schema.Schema<TaskRetryPolicy>;

export interface Connector {
  /** Optional. Restarts the individual tasks of a Connector. */
  taskRestartPolicy?: TaskRetryPolicy;
  /** Identifier. The name of the connector. Structured like: projects/{project}/locations/{location}/connectClusters/{connect_cluster}/connectors/{connector} */
  name?: string;
  /** Optional. Connector config as keys/values. The keys of the map are connector property names, for example: `connector.class`, `tasks.max`, `key.converter`. */
  configs?: Record<string, string>;
  /** Output only. The current state of the connector. */
  state?: "STATE_UNSPECIFIED" | "UNASSIGNED" | "RUNNING" | "PAUSED" | "FAILED" | "RESTARTING" | "STOPPED" | (string & {});
}

export const Connector: Schema.Schema<Connector> = Schema.suspend(() => Schema.Struct({
  taskRestartPolicy: Schema.optional(TaskRetryPolicy),
  name: Schema.optional(Schema.String),
  configs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Connector" }) as any as Schema.Schema<Connector>;

export interface ListConnectorsResponse {
  /** The list of connectors in the requested parent. */
  connectors?: Array<Connector>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListConnectorsResponse: Schema.Schema<ListConnectorsResponse> = Schema.suspend(() => Schema.Struct({
  connectors: Schema.optional(Schema.Array(Connector)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConnectorsResponse" }) as any as Schema.Schema<ListConnectorsResponse>;

export interface PauseConnectorRequest {
}

export const PauseConnectorRequest: Schema.Schema<PauseConnectorRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PauseConnectorRequest" }) as any as Schema.Schema<PauseConnectorRequest>;

export interface PauseConnectorResponse {
}

export const PauseConnectorResponse: Schema.Schema<PauseConnectorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PauseConnectorResponse" }) as any as Schema.Schema<PauseConnectorResponse>;

export interface ResumeConnectorRequest {
}

export const ResumeConnectorRequest: Schema.Schema<ResumeConnectorRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeConnectorRequest" }) as any as Schema.Schema<ResumeConnectorRequest>;

export interface ResumeConnectorResponse {
}

export const ResumeConnectorResponse: Schema.Schema<ResumeConnectorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeConnectorResponse" }) as any as Schema.Schema<ResumeConnectorResponse>;

export interface RestartConnectorRequest {
}

export const RestartConnectorRequest: Schema.Schema<RestartConnectorRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestartConnectorRequest" }) as any as Schema.Schema<RestartConnectorRequest>;

export interface RestartConnectorResponse {
}

export const RestartConnectorResponse: Schema.Schema<RestartConnectorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestartConnectorResponse" }) as any as Schema.Schema<RestartConnectorResponse>;

export interface StopConnectorRequest {
}

export const StopConnectorRequest: Schema.Schema<StopConnectorRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopConnectorRequest" }) as any as Schema.Schema<StopConnectorRequest>;

export interface StopConnectorResponse {
}

export const StopConnectorResponse: Schema.Schema<StopConnectorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopConnectorResponse" }) as any as Schema.Schema<StopConnectorResponse>;

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

export interface SchemaRegistry {
  /** Identifier. The name of the schema registry instance. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` The instance name {schema_registry} can contain the following: * Up to 255 characters. * Letters (uppercase or lowercase), numbers, and underscores. */
  name?: string;
  /** Output only. The contexts of the schema registry instance. */
  contexts?: Array<string>;
}

export const SchemaRegistry: Schema.Schema<SchemaRegistry> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  contexts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SchemaRegistry" }) as any as Schema.Schema<SchemaRegistry>;

export interface ListSchemaRegistriesResponse {
  /** The schema registry instances. */
  schemaRegistries?: Array<SchemaRegistry>;
}

export const ListSchemaRegistriesResponse: Schema.Schema<ListSchemaRegistriesResponse> = Schema.suspend(() => Schema.Struct({
  schemaRegistries: Schema.optional(Schema.Array(SchemaRegistry)),
})).annotate({ identifier: "ListSchemaRegistriesResponse" }) as any as Schema.Schema<ListSchemaRegistriesResponse>;

export interface CreateSchemaRegistryRequest {
  /** Required. The schema registry instance ID to use for this schema registry. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores (-). The maximum length is 63 characters. The ID must not start with a number. */
  schemaRegistryId?: string;
  /** Required. The schema registry instance to create. The name field is ignored. */
  schemaRegistry?: SchemaRegistry;
}

export const CreateSchemaRegistryRequest: Schema.Schema<CreateSchemaRegistryRequest> = Schema.suspend(() => Schema.Struct({
  schemaRegistryId: Schema.optional(Schema.String),
  schemaRegistry: Schema.optional(SchemaRegistry),
})).annotate({ identifier: "CreateSchemaRegistryRequest" }) as any as Schema.Schema<CreateSchemaRegistryRequest>;

export interface Context {
  /** Identifier. The name of the context. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` The context name {context} can contain the following: * Up to 255 characters. * Allowed characters: letters (uppercase or lowercase), numbers, and the following special characters: `.`, `-`, `_`, `+`, `%`, and `~`. */
  name?: string;
  /** Optional. The subjects of the context. */
  subjects?: Array<string>;
}

export const Context: Schema.Schema<Context> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  subjects: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface SchemaReference {
  /** Required. The name of the reference. */
  name?: string;
  /** Required. The subject of the reference. */
  subject?: string;
  /** Required. The version of the reference. */
  version?: number;
}

export const SchemaReference: Schema.Schema<SchemaReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "SchemaReference" }) as any as Schema.Schema<SchemaReference>;

export interface Managedkafka_Schema {
  /** Optional. The schema type of the schema. */
  schemaType?: "SCHEMA_TYPE_UNSPECIFIED" | "AVRO" | "JSON" | "PROTOBUF" | (string & {});
  /** The schema payload. */
  schema?: string;
  /** Optional. The schema references used by the schema. */
  references?: Array<SchemaReference>;
}

export const Managedkafka_Schema: Schema.Schema<Managedkafka_Schema> = Schema.suspend(() => Schema.Struct({
  schemaType: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(SchemaReference)),
})).annotate({ identifier: "Managedkafka_Schema" }) as any as Schema.Schema<Managedkafka_Schema>;

export interface LookupVersionRequest {
  /** Optional. The schema type of the schema. */
  schemaType?: "SCHEMA_TYPE_UNSPECIFIED" | "AVRO" | "JSON" | "PROTOBUF" | (string & {});
  /** Required. The schema payload */
  schema?: string;
  /** Optional. The schema references used by the schema. */
  references?: Array<SchemaReference>;
  /** Optional. If true, the schema will be normalized before being looked up. The default is false. */
  normalize?: boolean;
  /** Optional. If true, soft-deleted versions will be included in lookup, no matter if the subject is active or soft-deleted. If false, soft-deleted versions will be excluded. The default is false. */
  deleted?: boolean;
}

export const LookupVersionRequest: Schema.Schema<LookupVersionRequest> = Schema.suspend(() => Schema.Struct({
  schemaType: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(SchemaReference)),
  normalize: Schema.optional(Schema.Boolean),
  deleted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LookupVersionRequest" }) as any as Schema.Schema<LookupVersionRequest>;

export interface SchemaVersion {
  /** Required. The subject of the version. */
  subject?: string;
  /** Required. The version ID */
  version?: number;
  /** Required. The schema ID. */
  id?: number;
  /** Optional. The schema type of the schema. */
  schemaType?: "SCHEMA_TYPE_UNSPECIFIED" | "AVRO" | "JSON" | "PROTOBUF" | (string & {});
  /** Required. The schema payload. */
  schema?: string;
  /** Optional. The schema references used by the schema. */
  references?: Array<SchemaReference>;
}

export const SchemaVersion: Schema.Schema<SchemaVersion> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.Number),
  schemaType: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(SchemaReference)),
})).annotate({ identifier: "SchemaVersion" }) as any as Schema.Schema<SchemaVersion>;

export interface CreateVersionRequest {
  /** Optional. The version to create. It is optional. If not specified, the version will be created with the max version ID of the subject increased by 1. If the version ID is specified, it will be used as the new version ID and must not be used by an existing version of the subject. */
  version?: number;
  /** Optional. The schema ID of the schema. If not specified, the schema ID will be generated by the server. If the schema ID is specified, it must not be used by an existing schema that is different from the schema to be created. */
  id?: number;
  /** Optional. The type of the schema. It is optional. If not specified, the schema type will be AVRO. */
  schemaType?: "SCHEMA_TYPE_UNSPECIFIED" | "AVRO" | "JSON" | "PROTOBUF" | (string & {});
  /** Required. The schema payload */
  schema?: string;
  /** Optional. The schema references used by the schema. */
  references?: Array<SchemaReference>;
  /** Optional. If true, the schema will be normalized before being stored. The default is false. */
  normalize?: boolean;
}

export const CreateVersionRequest: Schema.Schema<CreateVersionRequest> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.Number),
  schemaType: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(SchemaReference)),
  normalize: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CreateVersionRequest" }) as any as Schema.Schema<CreateVersionRequest>;

export interface CreateVersionResponse {
  /** The unique identifier of the schema created. */
  id?: number;
}

export const CreateVersionResponse: Schema.Schema<CreateVersionResponse> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.Number),
})).annotate({ identifier: "CreateVersionResponse" }) as any as Schema.Schema<CreateVersionResponse>;

export interface CheckCompatibilityRequest {
  /** Optional. The schema type of the schema. */
  schemaType?: "SCHEMA_TYPE_UNSPECIFIED" | "AVRO" | "JSON" | "PROTOBUF" | (string & {});
  /** Required. The schema payload */
  schema?: string;
  /** Optional. The schema references used by the schema. */
  references?: Array<SchemaReference>;
  /** Optional. If true, the response will contain the compatibility check result with reasons for failed checks. The default is false. */
  verbose?: boolean;
}

export const CheckCompatibilityRequest: Schema.Schema<CheckCompatibilityRequest> = Schema.suspend(() => Schema.Struct({
  schemaType: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  references: Schema.optional(Schema.Array(SchemaReference)),
  verbose: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckCompatibilityRequest" }) as any as Schema.Schema<CheckCompatibilityRequest>;

export interface CheckCompatibilityResponse {
  /** The compatibility check result. If true, the schema is compatible with the resource. */
  is_compatible?: boolean;
  /** Failure reasons if verbose = true. */
  messages?: Array<string>;
}

export const CheckCompatibilityResponse: Schema.Schema<CheckCompatibilityResponse> = Schema.suspend(() => Schema.Struct({
  is_compatible: Schema.optional(Schema.Boolean),
  messages: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CheckCompatibilityResponse" }) as any as Schema.Schema<CheckCompatibilityResponse>;

export interface SchemaConfig {
  /** Required. The compatibility type of the schema. The default value is BACKWARD. If unset in a SchemaSubject-level SchemaConfig, defaults to the global value. If unset in a SchemaRegistry-level SchemaConfig, reverts to the default value. */
  compatibility?: "NONE" | "BACKWARD" | "BACKWARD_TRANSITIVE" | "FORWARD" | "FORWARD_TRANSITIVE" | "FULL" | "FULL_TRANSITIVE" | (string & {});
  /** Optional. If true, the schema will be normalized before being stored or looked up. The default is false. If unset in a SchemaSubject-level SchemaConfig, the global value will be used. If unset in a SchemaRegistry-level SchemaConfig, reverts to the default value. */
  normalize?: boolean;
  /** Optional. The subject to which this subject is an alias of. Only applicable for subject config. */
  alias?: string;
}

export const SchemaConfig: Schema.Schema<SchemaConfig> = Schema.suspend(() => Schema.Struct({
  compatibility: Schema.optional(Schema.String),
  normalize: Schema.optional(Schema.Boolean),
  alias: Schema.optional(Schema.String),
})).annotate({ identifier: "SchemaConfig" }) as any as Schema.Schema<SchemaConfig>;

export interface UpdateSchemaConfigRequest {
  /** Required. The compatibility type of the schemas. Cannot be unset for a SchemaRegistry-level SchemaConfig. If unset on a SchemaSubject-level SchemaConfig, removes the compatibility field for the SchemaConfig. */
  compatibility?: "NONE" | "BACKWARD" | "BACKWARD_TRANSITIVE" | "FORWARD" | "FORWARD_TRANSITIVE" | "FULL" | "FULL_TRANSITIVE" | (string & {});
  /** Optional. If true, the schema will be normalized before being stored or looked up. The default is false. Cannot be unset for a SchemaRegistry-level SchemaConfig. If unset on a SchemaSubject-level SchemaConfig, removes the normalize field for the SchemaConfig. */
  normalize?: boolean;
}

export const UpdateSchemaConfigRequest: Schema.Schema<UpdateSchemaConfigRequest> = Schema.suspend(() => Schema.Struct({
  compatibility: Schema.optional(Schema.String),
  normalize: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UpdateSchemaConfigRequest" }) as any as Schema.Schema<UpdateSchemaConfigRequest>;

export interface SchemaMode {
  /** Required. The mode type of a schema registry (READWRITE by default) or of a subject (unset by default, which means use the global schema registry setting). */
  mode?: "NONE" | "READONLY" | "READWRITE" | "IMPORT" | (string & {});
}

export const SchemaMode: Schema.Schema<SchemaMode> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "SchemaMode" }) as any as Schema.Schema<SchemaMode>;

export interface UpdateSchemaModeRequest {
  /** Required. The mode type. */
  mode?: "NONE" | "READONLY" | "READWRITE" | "IMPORT" | (string & {});
}

export const UpdateSchemaModeRequest: Schema.Schema<UpdateSchemaModeRequest> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateSchemaModeRequest" }) as any as Schema.Schema<UpdateSchemaModeRequest>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
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

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

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

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

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
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
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

/** Lists the clusters in a given project and location. */
export interface ListProjectsLocationsClustersRequest {
  /** Required. The parent location whose clusters are to be listed. Structured like `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. The maximum number of clusters to return. The service may return fewer than this value. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListClusters` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter expression for the result. */
  filter?: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersRequest>;

export type ListProjectsLocationsClustersResponse = ListClustersResponse;
export const ListProjectsLocationsClustersResponse = ListClustersResponse;

export type ListProjectsLocationsClustersError = CommonErrors;

export const listProjectsLocationsClusters = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersRequest,
  output: ListProjectsLocationsClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the properties of a single cluster. */
export interface GetProjectsLocationsClustersRequest {
  /** Required. The name of the cluster whose configuration to return. */
  name: string;
  /** Optional. Specifies the view of the Cluster resource to be returned. Defaults to CLUSTER_VIEW_BASIC. See the ClusterView enum for possible values. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "CLUSTER_VIEW_BASIC" | "CLUSTER_VIEW_FULL" | (string & {});
}

export const GetProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersRequest>;

export type GetProjectsLocationsClustersResponse = Cluster;
export const GetProjectsLocationsClustersResponse = Cluster;

export type GetProjectsLocationsClustersError = CommonErrors;

export const getProjectsLocationsClusters: API.OperationMethod<GetProjectsLocationsClustersRequest, GetProjectsLocationsClustersResponse, GetProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersRequest,
  output: GetProjectsLocationsClustersResponse,
  errors: [],
}));

/** Creates a new cluster in a given project and location. */
export interface CreateProjectsLocationsClustersRequest {
  /** Required. The parent region in which to create the cluster. Structured like `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. The ID to use for the cluster, which will become the final component of the cluster's name. The ID must be 1-63 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` to comply with RFC 1035. This value is structured like: `my-cluster-id`. */
  clusterId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Cluster;
}

export const CreateProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersRequest>;

export type CreateProjectsLocationsClustersResponse = Operation;
export const CreateProjectsLocationsClustersResponse = Operation;

export type CreateProjectsLocationsClustersError = CommonErrors;

export const createProjectsLocationsClusters: API.OperationMethod<CreateProjectsLocationsClustersRequest, CreateProjectsLocationsClustersResponse, CreateProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClustersRequest,
  output: CreateProjectsLocationsClustersResponse,
  errors: [],
}));

/** Updates the properties of a single cluster. */
export interface PatchProjectsLocationsClustersRequest {
  /** Identifier. The name of the cluster. Structured like: projects/{project_number}/locations/{location}/clusters/{cluster_id} */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of * will update all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Cluster;
}

export const PatchProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersRequest>;

export type PatchProjectsLocationsClustersResponse = Operation;
export const PatchProjectsLocationsClustersResponse = Operation;

export type PatchProjectsLocationsClustersError = CommonErrors;

export const patchProjectsLocationsClusters: API.OperationMethod<PatchProjectsLocationsClustersRequest, PatchProjectsLocationsClustersResponse, PatchProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsClustersRequest,
  output: PatchProjectsLocationsClustersResponse,
  errors: [],
}));

/** Deletes a single cluster. */
export interface DeleteProjectsLocationsClustersRequest {
  /** Required. The name of the cluster to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersRequest>;

export type DeleteProjectsLocationsClustersResponse = Operation;
export const DeleteProjectsLocationsClustersResponse = Operation;

export type DeleteProjectsLocationsClustersError = CommonErrors;

export const deleteProjectsLocationsClusters: API.OperationMethod<DeleteProjectsLocationsClustersRequest, DeleteProjectsLocationsClustersResponse, DeleteProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersRequest,
  output: DeleteProjectsLocationsClustersResponse,
  errors: [],
}));

/** Lists the topics in a given cluster. */
export interface ListProjectsLocationsClustersTopicsRequest {
  /** Required. The parent cluster whose topics are to be listed. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. */
  parent: string;
  /** Optional. The maximum number of topics to return. The service may return fewer than this value. If unset or zero, all topics for the parent is returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListTopics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTopics` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsClustersTopicsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/topics" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersTopicsRequest>;

export type ListProjectsLocationsClustersTopicsResponse = ListTopicsResponse;
export const ListProjectsLocationsClustersTopicsResponse = ListTopicsResponse;

export type ListProjectsLocationsClustersTopicsError = CommonErrors;

export const listProjectsLocationsClustersTopics = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersTopicsRequest,
  output: ListProjectsLocationsClustersTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the properties of a single topic. */
export interface GetProjectsLocationsClustersTopicsRequest {
  /** Required. The name of the topic whose configuration to return. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic}. */
  name: string;
}

export const GetProjectsLocationsClustersTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersTopicsRequest>;

export type GetProjectsLocationsClustersTopicsResponse = Topic;
export const GetProjectsLocationsClustersTopicsResponse = Topic;

export type GetProjectsLocationsClustersTopicsError = CommonErrors;

export const getProjectsLocationsClustersTopics: API.OperationMethod<GetProjectsLocationsClustersTopicsRequest, GetProjectsLocationsClustersTopicsResponse, GetProjectsLocationsClustersTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersTopicsRequest,
  output: GetProjectsLocationsClustersTopicsResponse,
  errors: [],
}));

/** Creates a new topic in a given project and location. */
export interface CreateProjectsLocationsClustersTopicsRequest {
  /** Required. The parent cluster in which to create the topic. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. */
  parent: string;
  /** Required. The ID to use for the topic, which will become the final component of the topic's name. This value is structured like: `my-topic-name`. */
  topicId?: string;
  /** Request body */
  body?: Topic;
}

export const CreateProjectsLocationsClustersTopicsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  topicId: Schema.optional(Schema.String).pipe(T.HttpQuery("topicId")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/topics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersTopicsRequest>;

export type CreateProjectsLocationsClustersTopicsResponse = Topic;
export const CreateProjectsLocationsClustersTopicsResponse = Topic;

export type CreateProjectsLocationsClustersTopicsError = CommonErrors;

export const createProjectsLocationsClustersTopics: API.OperationMethod<CreateProjectsLocationsClustersTopicsRequest, CreateProjectsLocationsClustersTopicsResponse, CreateProjectsLocationsClustersTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClustersTopicsRequest,
  output: CreateProjectsLocationsClustersTopicsResponse,
  errors: [],
}));

/** Updates the properties of a single topic. */
export interface PatchProjectsLocationsClustersTopicsRequest {
  /** Identifier. The name of the topic. The `topic` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic} */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Topic resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of * will update all fields. */
  updateMask?: string;
  /** Request body */
  body?: Topic;
}

export const PatchProjectsLocationsClustersTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/topics/{topicsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersTopicsRequest>;

export type PatchProjectsLocationsClustersTopicsResponse = Topic;
export const PatchProjectsLocationsClustersTopicsResponse = Topic;

export type PatchProjectsLocationsClustersTopicsError = CommonErrors;

export const patchProjectsLocationsClustersTopics: API.OperationMethod<PatchProjectsLocationsClustersTopicsRequest, PatchProjectsLocationsClustersTopicsResponse, PatchProjectsLocationsClustersTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsClustersTopicsRequest,
  output: PatchProjectsLocationsClustersTopicsResponse,
  errors: [],
}));

/** Deletes a single topic. */
export interface DeleteProjectsLocationsClustersTopicsRequest {
  /** Required. The name of the topic to delete. `projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic}`. */
  name: string;
}

export const DeleteProjectsLocationsClustersTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersTopicsRequest>;

export type DeleteProjectsLocationsClustersTopicsResponse = Empty;
export const DeleteProjectsLocationsClustersTopicsResponse = Empty;

export type DeleteProjectsLocationsClustersTopicsError = CommonErrors;

export const deleteProjectsLocationsClustersTopics: API.OperationMethod<DeleteProjectsLocationsClustersTopicsRequest, DeleteProjectsLocationsClustersTopicsResponse, DeleteProjectsLocationsClustersTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersTopicsRequest,
  output: DeleteProjectsLocationsClustersTopicsResponse,
  errors: [],
}));

/** Lists the consumer groups in a given cluster. */
export interface ListProjectsLocationsClustersConsumerGroupsRequest {
  /** Required. The parent cluster whose consumer groups are to be listed. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. */
  parent: string;
  /** Optional. The maximum number of consumer groups to return. The service may return fewer than this value. If unset or zero, all consumer groups for the parent is returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListConsumerGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConsumerGroups` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Specifies the view (BASIC or FULL) of the ConsumerGroup resource to be returned in the response. Defaults to FULL view. */
  view?: "CONSUMER_GROUP_VIEW_UNSPECIFIED" | "CONSUMER_GROUP_VIEW_BASIC" | "CONSUMER_GROUP_VIEW_FULL" | (string & {});
  /** Optional. Filter expression for the result. Only supports filtering by topic name as a key in the `topics` map. */
  filter?: string;
}

export const ListProjectsLocationsClustersConsumerGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/consumerGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersConsumerGroupsRequest>;

export type ListProjectsLocationsClustersConsumerGroupsResponse = ListConsumerGroupsResponse;
export const ListProjectsLocationsClustersConsumerGroupsResponse = ListConsumerGroupsResponse;

export type ListProjectsLocationsClustersConsumerGroupsError = CommonErrors;

export const listProjectsLocationsClustersConsumerGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersConsumerGroupsRequest,
  output: ListProjectsLocationsClustersConsumerGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the properties of a single consumer group. */
export interface GetProjectsLocationsClustersConsumerGroupsRequest {
  /** Required. The name of the consumer group whose configuration to return. `projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumerGroup}`. */
  name: string;
}

export const GetProjectsLocationsClustersConsumerGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/consumerGroups/{consumerGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersConsumerGroupsRequest>;

export type GetProjectsLocationsClustersConsumerGroupsResponse = ConsumerGroup;
export const GetProjectsLocationsClustersConsumerGroupsResponse = ConsumerGroup;

export type GetProjectsLocationsClustersConsumerGroupsError = CommonErrors;

export const getProjectsLocationsClustersConsumerGroups: API.OperationMethod<GetProjectsLocationsClustersConsumerGroupsRequest, GetProjectsLocationsClustersConsumerGroupsResponse, GetProjectsLocationsClustersConsumerGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersConsumerGroupsRequest,
  output: GetProjectsLocationsClustersConsumerGroupsResponse,
  errors: [],
}));

/** Updates the properties of a single consumer group. */
export interface PatchProjectsLocationsClustersConsumerGroupsRequest {
  /** Identifier. The name of the consumer group. The `consumer_group` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumer_group} */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the ConsumerGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of * will update all fields. */
  updateMask?: string;
  /** Request body */
  body?: ConsumerGroup;
}

export const PatchProjectsLocationsClustersConsumerGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ConsumerGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/consumerGroups/{consumerGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersConsumerGroupsRequest>;

export type PatchProjectsLocationsClustersConsumerGroupsResponse = ConsumerGroup;
export const PatchProjectsLocationsClustersConsumerGroupsResponse = ConsumerGroup;

export type PatchProjectsLocationsClustersConsumerGroupsError = CommonErrors;

export const patchProjectsLocationsClustersConsumerGroups: API.OperationMethod<PatchProjectsLocationsClustersConsumerGroupsRequest, PatchProjectsLocationsClustersConsumerGroupsResponse, PatchProjectsLocationsClustersConsumerGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsClustersConsumerGroupsRequest,
  output: PatchProjectsLocationsClustersConsumerGroupsResponse,
  errors: [],
}));

/** Deletes a single consumer group. */
export interface DeleteProjectsLocationsClustersConsumerGroupsRequest {
  /** Required. The name of the consumer group to delete. `projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumerGroup}`. */
  name: string;
}

export const DeleteProjectsLocationsClustersConsumerGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/consumerGroups/{consumerGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersConsumerGroupsRequest>;

export type DeleteProjectsLocationsClustersConsumerGroupsResponse = Empty;
export const DeleteProjectsLocationsClustersConsumerGroupsResponse = Empty;

export type DeleteProjectsLocationsClustersConsumerGroupsError = CommonErrors;

export const deleteProjectsLocationsClustersConsumerGroups: API.OperationMethod<DeleteProjectsLocationsClustersConsumerGroupsRequest, DeleteProjectsLocationsClustersConsumerGroupsResponse, DeleteProjectsLocationsClustersConsumerGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersConsumerGroupsRequest,
  output: DeleteProjectsLocationsClustersConsumerGroupsResponse,
  errors: [],
}));

/** Lists the acls in a given cluster. */
export interface ListProjectsLocationsClustersAclsRequest {
  /** Required. The parent cluster whose acls are to be listed. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. */
  parent: string;
  /** Optional. The maximum number of acls to return. The service may return fewer than this value. If unset or zero, all acls for the parent is returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListAcls` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAcls` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsClustersAclsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersAclsRequest>;

export type ListProjectsLocationsClustersAclsResponse = ListAclsResponse;
export const ListProjectsLocationsClustersAclsResponse = ListAclsResponse;

export type ListProjectsLocationsClustersAclsError = CommonErrors;

export const listProjectsLocationsClustersAcls = API.makePaginated(() => ({
  input: ListProjectsLocationsClustersAclsRequest,
  output: ListProjectsLocationsClustersAclsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the properties of a single acl. */
export interface GetProjectsLocationsClustersAclsRequest {
  /** Required. The name of the acl to return. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. */
  name: string;
}

export const GetProjectsLocationsClustersAclsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls/{aclsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersAclsRequest>;

export type GetProjectsLocationsClustersAclsResponse = Acl;
export const GetProjectsLocationsClustersAclsResponse = Acl;

export type GetProjectsLocationsClustersAclsError = CommonErrors;

export const getProjectsLocationsClustersAcls: API.OperationMethod<GetProjectsLocationsClustersAclsRequest, GetProjectsLocationsClustersAclsResponse, GetProjectsLocationsClustersAclsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersAclsRequest,
  output: GetProjectsLocationsClustersAclsResponse,
  errors: [],
}));

/** Creates a new acl in the given project, location, and cluster. */
export interface CreateProjectsLocationsClustersAclsRequest {
  /** Required. The parent cluster in which to create the acl. Structured like `projects/{project}/locations/{location}/clusters/{cluster}`. */
  parent: string;
  /** Required. The ID to use for the acl, which will become the final component of the acl's name. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. `acl_id` is structured like one of the following: For acls on the cluster: `cluster` For acls on a single resource within the cluster: `topic/{resource_name}` `consumerGroup/{resource_name}` `transactionalId/{resource_name}` For acls on all resources that match a prefix: `topicPrefixed/{resource_name}` `consumerGroupPrefixed/{resource_name}` `transactionalIdPrefixed/{resource_name}` For acls on all resources of a given type (i.e. the wildcard literal "*"): `allTopics` (represents `topic/*`) `allConsumerGroups` (represents `consumerGroup/*`) `allTransactionalIds` (represents `transactionalId/*`) */
  aclId?: string;
  /** Request body */
  body?: Acl;
}

export const CreateProjectsLocationsClustersAclsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  aclId: Schema.optional(Schema.String).pipe(T.HttpQuery("aclId")),
  body: Schema.optional(Acl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersAclsRequest>;

export type CreateProjectsLocationsClustersAclsResponse = Acl;
export const CreateProjectsLocationsClustersAclsResponse = Acl;

export type CreateProjectsLocationsClustersAclsError = CommonErrors;

export const createProjectsLocationsClustersAcls: API.OperationMethod<CreateProjectsLocationsClustersAclsRequest, CreateProjectsLocationsClustersAclsResponse, CreateProjectsLocationsClustersAclsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClustersAclsRequest,
  output: CreateProjectsLocationsClustersAclsResponse,
  errors: [],
}));

/** Updates the properties of a single acl. */
export interface PatchProjectsLocationsClustersAclsRequest {
  /** Identifier. The name for the acl. Represents a single Resource Pattern. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id} The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. `acl_id` is structured like one of the following: For acls on the cluster: `cluster` For acls on a single resource within the cluster: `topic/{resource_name}` `consumerGroup/{resource_name}` `transactionalId/{resource_name}` For acls on all resources that match a prefix: `topicPrefixed/{resource_name}` `consumerGroupPrefixed/{resource_name}` `transactionalIdPrefixed/{resource_name}` For acls on all resources of a given type (i.e. the wildcard literal "*"): `allTopics` (represents `topic/*`) `allConsumerGroups` (represents `consumerGroup/*`) `allTransactionalIds` (represents `transactionalId/*`) */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Acl resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. */
  updateMask?: string;
  /** Request body */
  body?: Acl;
}

export const PatchProjectsLocationsClustersAclsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Acl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls/{aclsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsClustersAclsRequest>;

export type PatchProjectsLocationsClustersAclsResponse = Acl;
export const PatchProjectsLocationsClustersAclsResponse = Acl;

export type PatchProjectsLocationsClustersAclsError = CommonErrors;

export const patchProjectsLocationsClustersAcls: API.OperationMethod<PatchProjectsLocationsClustersAclsRequest, PatchProjectsLocationsClustersAclsResponse, PatchProjectsLocationsClustersAclsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsClustersAclsRequest,
  output: PatchProjectsLocationsClustersAclsResponse,
  errors: [],
}));

/** Deletes an acl. */
export interface DeleteProjectsLocationsClustersAclsRequest {
  /** Required. The name of the acl to delete. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. */
  name: string;
}

export const DeleteProjectsLocationsClustersAclsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls/{aclsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersAclsRequest>;

export type DeleteProjectsLocationsClustersAclsResponse = Empty;
export const DeleteProjectsLocationsClustersAclsResponse = Empty;

export type DeleteProjectsLocationsClustersAclsError = CommonErrors;

export const deleteProjectsLocationsClustersAcls: API.OperationMethod<DeleteProjectsLocationsClustersAclsRequest, DeleteProjectsLocationsClustersAclsResponse, DeleteProjectsLocationsClustersAclsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersAclsRequest,
  output: DeleteProjectsLocationsClustersAclsResponse,
  errors: [],
}));

/** Incremental update: Adds an acl entry to an acl. Creates the acl if it does not exist yet. */
export interface AddAclEntryProjectsLocationsClustersAclsRequest {
  /** Required. The name of the acl to add the acl entry to. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. */
  acl: string;
  /** Request body */
  body?: AclEntry;
}

export const AddAclEntryProjectsLocationsClustersAclsRequest = Schema.Struct({
  acl: Schema.String.pipe(T.HttpPath("acl")),
  body: Schema.optional(AclEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls/{aclsId}:addAclEntry", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddAclEntryProjectsLocationsClustersAclsRequest>;

export type AddAclEntryProjectsLocationsClustersAclsResponse = AddAclEntryResponse;
export const AddAclEntryProjectsLocationsClustersAclsResponse = AddAclEntryResponse;

export type AddAclEntryProjectsLocationsClustersAclsError = CommonErrors;

export const addAclEntryProjectsLocationsClustersAcls: API.OperationMethod<AddAclEntryProjectsLocationsClustersAclsRequest, AddAclEntryProjectsLocationsClustersAclsResponse, AddAclEntryProjectsLocationsClustersAclsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddAclEntryProjectsLocationsClustersAclsRequest,
  output: AddAclEntryProjectsLocationsClustersAclsResponse,
  errors: [],
}));

/** Incremental update: Removes an acl entry from an acl. Deletes the acl if its acl entries become empty (i.e. if the removed entry was the last one in the acl). */
export interface RemoveAclEntryProjectsLocationsClustersAclsRequest {
  /** Required. The name of the acl to remove the acl entry from. Structured like: `projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id}`. The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. See `Acl.name` for details. */
  acl: string;
  /** Request body */
  body?: AclEntry;
}

export const RemoveAclEntryProjectsLocationsClustersAclsRequest = Schema.Struct({
  acl: Schema.String.pipe(T.HttpPath("acl")),
  body: Schema.optional(AclEntry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/acls/{aclsId}:removeAclEntry", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveAclEntryProjectsLocationsClustersAclsRequest>;

export type RemoveAclEntryProjectsLocationsClustersAclsResponse = RemoveAclEntryResponse;
export const RemoveAclEntryProjectsLocationsClustersAclsResponse = RemoveAclEntryResponse;

export type RemoveAclEntryProjectsLocationsClustersAclsError = CommonErrors;

export const removeAclEntryProjectsLocationsClustersAcls: API.OperationMethod<RemoveAclEntryProjectsLocationsClustersAclsRequest, RemoveAclEntryProjectsLocationsClustersAclsResponse, RemoveAclEntryProjectsLocationsClustersAclsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveAclEntryProjectsLocationsClustersAclsRequest,
  output: RemoveAclEntryProjectsLocationsClustersAclsResponse,
  errors: [],
}));

/** Lists the Kafka Connect clusters in a given project and location. */
export interface ListProjectsLocationsConnectClustersRequest {
  /** Required. The parent project/location whose Connect clusters are to be listed. Structured like `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. The maximum number of Connect clusters to return. The service may return fewer than this value. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListConnectClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectClusters` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter expression for the result. */
  filter?: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsConnectClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectClustersRequest>;

export type ListProjectsLocationsConnectClustersResponse = ListConnectClustersResponse;
export const ListProjectsLocationsConnectClustersResponse = ListConnectClustersResponse;

export type ListProjectsLocationsConnectClustersError = CommonErrors;

export const listProjectsLocationsConnectClusters = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectClustersRequest,
  output: ListProjectsLocationsConnectClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the properties of a single Kafka Connect cluster. */
export interface GetProjectsLocationsConnectClustersRequest {
  /** Required. The name of the Kafka Connect cluster whose configuration to return. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. */
  name: string;
}

export const GetProjectsLocationsConnectClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectClustersRequest>;

export type GetProjectsLocationsConnectClustersResponse = ConnectCluster;
export const GetProjectsLocationsConnectClustersResponse = ConnectCluster;

export type GetProjectsLocationsConnectClustersError = CommonErrors;

export const getProjectsLocationsConnectClusters: API.OperationMethod<GetProjectsLocationsConnectClustersRequest, GetProjectsLocationsConnectClustersResponse, GetProjectsLocationsConnectClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectClustersRequest,
  output: GetProjectsLocationsConnectClustersResponse,
  errors: [],
}));

/** Creates a new Kafka Connect cluster in a given project and location. */
export interface CreateProjectsLocationsConnectClustersRequest {
  /** Required. The parent project/location in which to create the Kafka Connect cluster. Structured like `projects/{project}/locations/{location}/`. */
  parent: string;
  /** Required. The ID to use for the Connect cluster, which will become the final component of the cluster's name. The ID must be 1-63 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` to comply with RFC 1035. This value is structured like: `my-cluster-id`. */
  connectClusterId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ConnectCluster;
}

export const CreateProjectsLocationsConnectClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectClusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectClusterId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ConnectCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectClustersRequest>;

export type CreateProjectsLocationsConnectClustersResponse = Operation;
export const CreateProjectsLocationsConnectClustersResponse = Operation;

export type CreateProjectsLocationsConnectClustersError = CommonErrors;

export const createProjectsLocationsConnectClusters: API.OperationMethod<CreateProjectsLocationsConnectClustersRequest, CreateProjectsLocationsConnectClustersResponse, CreateProjectsLocationsConnectClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectClustersRequest,
  output: CreateProjectsLocationsConnectClustersResponse,
  errors: [],
}));

/** Updates the properties of a single Kafka Connect cluster. */
export interface PatchProjectsLocationsConnectClustersRequest {
  /** Identifier. The name of the Kafka Connect cluster. Structured like: projects/{project_number}/locations/{location}/connectClusters/{connect_cluster_id} */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of * will update all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ConnectCluster;
}

export const PatchProjectsLocationsConnectClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ConnectCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectClustersRequest>;

export type PatchProjectsLocationsConnectClustersResponse = Operation;
export const PatchProjectsLocationsConnectClustersResponse = Operation;

export type PatchProjectsLocationsConnectClustersError = CommonErrors;

export const patchProjectsLocationsConnectClusters: API.OperationMethod<PatchProjectsLocationsConnectClustersRequest, PatchProjectsLocationsConnectClustersResponse, PatchProjectsLocationsConnectClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectClustersRequest,
  output: PatchProjectsLocationsConnectClustersResponse,
  errors: [],
}));

/** Deletes a single Connect cluster. */
export interface DeleteProjectsLocationsConnectClustersRequest {
  /** Required. The name of the Kafka Connect cluster to delete. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID to avoid duplication of requests. If a request times out or fails, retrying with the same ID allows the server to recognize the previous attempt. For at least 60 minutes, the server ignores duplicate requests bearing the same ID. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID within 60 minutes of the last request, the server checks if an original operation with the same request ID was received. If so, the server ignores the second request. The request ID must be a valid UUID. A zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsConnectClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectClustersRequest>;

export type DeleteProjectsLocationsConnectClustersResponse = Operation;
export const DeleteProjectsLocationsConnectClustersResponse = Operation;

export type DeleteProjectsLocationsConnectClustersError = CommonErrors;

export const deleteProjectsLocationsConnectClusters: API.OperationMethod<DeleteProjectsLocationsConnectClustersRequest, DeleteProjectsLocationsConnectClustersResponse, DeleteProjectsLocationsConnectClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectClustersRequest,
  output: DeleteProjectsLocationsConnectClustersResponse,
  errors: [],
}));

/** Lists the connectors in a given Connect cluster. */
export interface ListProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The parent Connect cluster whose connectors are to be listed. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. */
  parent: string;
  /** Optional. The maximum number of connectors to return. The service may return fewer than this value. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListConnectors` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectors` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectClustersConnectorsRequest>;

export type ListProjectsLocationsConnectClustersConnectorsResponse = ListConnectorsResponse;
export const ListProjectsLocationsConnectClustersConnectorsResponse = ListConnectorsResponse;

export type ListProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const listProjectsLocationsConnectClustersConnectors = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectClustersConnectorsRequest,
  output: ListProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the properties of a single connector. */
export interface GetProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The name of the connector whose configuration to return. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} */
  name: string;
}

export const GetProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectClustersConnectorsRequest>;

export type GetProjectsLocationsConnectClustersConnectorsResponse = Connector;
export const GetProjectsLocationsConnectClustersConnectorsResponse = Connector;

export type GetProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const getProjectsLocationsConnectClustersConnectors: API.OperationMethod<GetProjectsLocationsConnectClustersConnectorsRequest, GetProjectsLocationsConnectClustersConnectorsResponse, GetProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectClustersConnectorsRequest,
  output: GetProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Creates a new connector in a given Connect cluster. */
export interface CreateProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The parent Connect cluster in which to create the connector. Structured like `projects/{project}/locations/{location}/connectClusters/{connect_cluster_id}`. */
  parent: string;
  /** Required. The ID to use for the connector, which will become the final component of the connector's name. The ID must be 1-63 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` to comply with RFC 1035. This value is structured like: `my-connector-id`. */
  connectorId?: string;
  /** Request body */
  body?: Connector;
}

export const CreateProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectorId")),
  body: Schema.optional(Connector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectClustersConnectorsRequest>;

export type CreateProjectsLocationsConnectClustersConnectorsResponse = Connector;
export const CreateProjectsLocationsConnectClustersConnectorsResponse = Connector;

export type CreateProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const createProjectsLocationsConnectClustersConnectors: API.OperationMethod<CreateProjectsLocationsConnectClustersConnectorsRequest, CreateProjectsLocationsConnectClustersConnectorsResponse, CreateProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectClustersConnectorsRequest,
  output: CreateProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Updates the properties of a connector. */
export interface PatchProjectsLocationsConnectClustersConnectorsRequest {
  /** Identifier. The name of the connector. Structured like: projects/{project}/locations/{location}/connectClusters/{connect_cluster}/connectors/{connector} */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The mask is required and a value of * will update all fields. */
  updateMask?: string;
  /** Request body */
  body?: Connector;
}

export const PatchProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Connector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectClustersConnectorsRequest>;

export type PatchProjectsLocationsConnectClustersConnectorsResponse = Connector;
export const PatchProjectsLocationsConnectClustersConnectorsResponse = Connector;

export type PatchProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const patchProjectsLocationsConnectClustersConnectors: API.OperationMethod<PatchProjectsLocationsConnectClustersConnectorsRequest, PatchProjectsLocationsConnectClustersConnectorsResponse, PatchProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectClustersConnectorsRequest,
  output: PatchProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Deletes a connector. */
export interface DeleteProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The name of the connector to delete. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} */
  name: string;
}

export const DeleteProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectClustersConnectorsRequest>;

export type DeleteProjectsLocationsConnectClustersConnectorsResponse = Empty;
export const DeleteProjectsLocationsConnectClustersConnectorsResponse = Empty;

export type DeleteProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const deleteProjectsLocationsConnectClustersConnectors: API.OperationMethod<DeleteProjectsLocationsConnectClustersConnectorsRequest, DeleteProjectsLocationsConnectClustersConnectorsResponse, DeleteProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectClustersConnectorsRequest,
  output: DeleteProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Pauses the connector and its tasks. */
export interface PauseProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The name of the connector to pause. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} */
  name: string;
  /** Request body */
  body?: PauseConnectorRequest;
}

export const PauseProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseConnectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseProjectsLocationsConnectClustersConnectorsRequest>;

export type PauseProjectsLocationsConnectClustersConnectorsResponse = PauseConnectorResponse;
export const PauseProjectsLocationsConnectClustersConnectorsResponse = PauseConnectorResponse;

export type PauseProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const pauseProjectsLocationsConnectClustersConnectors: API.OperationMethod<PauseProjectsLocationsConnectClustersConnectorsRequest, PauseProjectsLocationsConnectClustersConnectorsResponse, PauseProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseProjectsLocationsConnectClustersConnectorsRequest,
  output: PauseProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Resumes the connector and its tasks. */
export interface ResumeProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The name of the connector to pause. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} */
  name: string;
  /** Request body */
  body?: ResumeConnectorRequest;
}

export const ResumeProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeConnectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsConnectClustersConnectorsRequest>;

export type ResumeProjectsLocationsConnectClustersConnectorsResponse = ResumeConnectorResponse;
export const ResumeProjectsLocationsConnectClustersConnectorsResponse = ResumeConnectorResponse;

export type ResumeProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const resumeProjectsLocationsConnectClustersConnectors: API.OperationMethod<ResumeProjectsLocationsConnectClustersConnectorsRequest, ResumeProjectsLocationsConnectClustersConnectorsResponse, ResumeProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsConnectClustersConnectorsRequest,
  output: ResumeProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Restarts the connector. */
export interface RestartProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The name of the connector to restart. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} */
  name: string;
  /** Request body */
  body?: RestartConnectorRequest;
}

export const RestartProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestartConnectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}:restart", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestartProjectsLocationsConnectClustersConnectorsRequest>;

export type RestartProjectsLocationsConnectClustersConnectorsResponse = RestartConnectorResponse;
export const RestartProjectsLocationsConnectClustersConnectorsResponse = RestartConnectorResponse;

export type RestartProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const restartProjectsLocationsConnectClustersConnectors: API.OperationMethod<RestartProjectsLocationsConnectClustersConnectorsRequest, RestartProjectsLocationsConnectClustersConnectorsResponse, RestartProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestartProjectsLocationsConnectClustersConnectorsRequest,
  output: RestartProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Stops the connector. */
export interface StopProjectsLocationsConnectClustersConnectorsRequest {
  /** Required. The name of the connector to stop. Structured like: projects/{project}/locations/{location}/connectClusters/{connectCluster}/connectors/{connector} */
  name: string;
  /** Request body */
  body?: StopConnectorRequest;
}

export const StopProjectsLocationsConnectClustersConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopConnectorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connectClusters/{connectClustersId}/connectors/{connectorsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsConnectClustersConnectorsRequest>;

export type StopProjectsLocationsConnectClustersConnectorsResponse = StopConnectorResponse;
export const StopProjectsLocationsConnectClustersConnectorsResponse = StopConnectorResponse;

export type StopProjectsLocationsConnectClustersConnectorsError = CommonErrors;

export const stopProjectsLocationsConnectClustersConnectors: API.OperationMethod<StopProjectsLocationsConnectClustersConnectorsRequest, StopProjectsLocationsConnectClustersConnectorsResponse, StopProjectsLocationsConnectClustersConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsConnectClustersConnectorsRequest,
  output: StopProjectsLocationsConnectClustersConnectorsResponse,
  errors: [],
}));

/** Get the schema registry instance. */
export interface GetProjectsLocationsSchemaRegistriesRequest {
  /** Required. The name of the schema registry instance to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` */
  name: string;
}

export const GetProjectsLocationsSchemaRegistriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesRequest>;

export type GetProjectsLocationsSchemaRegistriesResponse = SchemaRegistry;
export const GetProjectsLocationsSchemaRegistriesResponse = SchemaRegistry;

export type GetProjectsLocationsSchemaRegistriesError = CommonErrors;

export const getProjectsLocationsSchemaRegistries: API.OperationMethod<GetProjectsLocationsSchemaRegistriesRequest, GetProjectsLocationsSchemaRegistriesResponse, GetProjectsLocationsSchemaRegistriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesRequest,
  output: GetProjectsLocationsSchemaRegistriesResponse,
  errors: [],
}));

/** List schema registries. */
export interface ListProjectsLocationsSchemaRegistriesRequest {
  /** Required. The parent whose schema registry instances are to be listed. Structured like: `projects/{project}/locations/{location}` */
  parent: string;
  /** Optional. Specifies the view to return for the schema registry instances. If not specified, the default view is SCHEMA_REGISTRY_VIEW_BASIC. */
  view?: "SCHEMA_REGISTRY_VIEW_UNSPECIFIED" | "SCHEMA_REGISTRY_VIEW_BASIC" | "SCHEMA_REGISTRY_VIEW_FULL" | (string & {});
}

export const ListProjectsLocationsSchemaRegistriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesRequest>;

export type ListProjectsLocationsSchemaRegistriesResponse = ListSchemaRegistriesResponse;
export const ListProjectsLocationsSchemaRegistriesResponse = ListSchemaRegistriesResponse;

export type ListProjectsLocationsSchemaRegistriesError = CommonErrors;

export const listProjectsLocationsSchemaRegistries: API.OperationMethod<ListProjectsLocationsSchemaRegistriesRequest, ListProjectsLocationsSchemaRegistriesResponse, ListProjectsLocationsSchemaRegistriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesRequest,
  output: ListProjectsLocationsSchemaRegistriesResponse,
  errors: [],
}));

/** Create a schema registry instance. */
export interface CreateProjectsLocationsSchemaRegistriesRequest {
  /** Required. The parent whose schema registry instance is to be created. Structured like: `projects/{project}/locations/{location}` */
  parent: string;
  /** Request body */
  body?: CreateSchemaRegistryRequest;
}

export const CreateProjectsLocationsSchemaRegistriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateSchemaRegistryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSchemaRegistriesRequest>;

export type CreateProjectsLocationsSchemaRegistriesResponse = SchemaRegistry;
export const CreateProjectsLocationsSchemaRegistriesResponse = SchemaRegistry;

export type CreateProjectsLocationsSchemaRegistriesError = CommonErrors;

export const createProjectsLocationsSchemaRegistries: API.OperationMethod<CreateProjectsLocationsSchemaRegistriesRequest, CreateProjectsLocationsSchemaRegistriesResponse, CreateProjectsLocationsSchemaRegistriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSchemaRegistriesRequest,
  output: CreateProjectsLocationsSchemaRegistriesResponse,
  errors: [],
}));

/** Delete a schema registry instance. */
export interface DeleteProjectsLocationsSchemaRegistriesRequest {
  /** Required. The name of the schema registry instance to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` */
  name: string;
}

export const DeleteProjectsLocationsSchemaRegistriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesRequest>;

export type DeleteProjectsLocationsSchemaRegistriesResponse = Empty;
export const DeleteProjectsLocationsSchemaRegistriesResponse = Empty;

export type DeleteProjectsLocationsSchemaRegistriesError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistries: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesRequest, DeleteProjectsLocationsSchemaRegistriesResponse, DeleteProjectsLocationsSchemaRegistriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesRequest,
  output: DeleteProjectsLocationsSchemaRegistriesResponse,
  errors: [],
}));

/** Get the context. */
export interface GetProjectsLocationsSchemaRegistriesContextsRequest {
  /** Required. The name of the context to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` */
  name: string;
}

export const GetProjectsLocationsSchemaRegistriesContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesContextsRequest>;

export type GetProjectsLocationsSchemaRegistriesContextsResponse = Context;
export const GetProjectsLocationsSchemaRegistriesContextsResponse = Context;

export type GetProjectsLocationsSchemaRegistriesContextsError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesContexts: API.OperationMethod<GetProjectsLocationsSchemaRegistriesContextsRequest, GetProjectsLocationsSchemaRegistriesContextsResponse, GetProjectsLocationsSchemaRegistriesContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesContextsRequest,
  output: GetProjectsLocationsSchemaRegistriesContextsResponse,
  errors: [],
}));

/** List contexts for a schema registry. */
export interface ListProjectsLocationsSchemaRegistriesContextsRequest {
  /** Required. The parent of the contexts. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` */
  parent: string;
}

export const ListProjectsLocationsSchemaRegistriesContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContexts: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsRequest, ListProjectsLocationsSchemaRegistriesContextsResponse, ListProjectsLocationsSchemaRegistriesContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsResponse,
  errors: [],
}));

/** Get the schema for the given schema id. */
export interface GetProjectsLocationsSchemaRegistriesContextsSchemasRequest {
  /** Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` */
  name: string;
  /** Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. */
  subject?: string;
}

export const GetProjectsLocationsSchemaRegistriesContextsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesContextsSchemasRequest>;

export type GetProjectsLocationsSchemaRegistriesContextsSchemasResponse = Managedkafka_Schema;
export const GetProjectsLocationsSchemaRegistriesContextsSchemasResponse = Managedkafka_Schema;

export type GetProjectsLocationsSchemaRegistriesContextsSchemasError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesContextsSchemas: API.OperationMethod<GetProjectsLocationsSchemaRegistriesContextsSchemasRequest, GetProjectsLocationsSchemaRegistriesContextsSchemasResponse, GetProjectsLocationsSchemaRegistriesContextsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesContextsSchemasRequest,
  output: GetProjectsLocationsSchemaRegistriesContextsSchemasResponse,
  errors: [],
}));

/** Get the schema string for the given schema id. The response will be the schema string. */
export interface GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasRequest {
  /** Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` */
  name: string;
  /** Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. */
  subject?: string;
}

export const GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/schemas/{schemasId}/schema" }),
  svc,
) as unknown as Schema.Schema<GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasRequest>;

export type GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasResponse = HttpBody;
export const GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasResponse = HttpBody;

export type GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasError = CommonErrors;

export const getSchemaProjectsLocationsSchemaRegistriesContextsSchemas: API.OperationMethod<GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasRequest, GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasResponse, GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasRequest,
  output: GetSchemaProjectsLocationsSchemaRegistriesContextsSchemasResponse,
  errors: [],
}));

/** List the schema versions for the given schema id. The response will be an array of subject-version pairs as: [{"subject":"subject1", "version":1}, {"subject":"subject2", "version":2}]. */
export interface ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsRequest {
  /** Required. The schema whose schema versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` */
  parent: string;
  /** Optional. The subject to filter the subjects by. */
  subject?: string;
  /** Optional. If true, the response will include soft-deleted versions of the schema, even if the subject is soft-deleted. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/schemas/{schemasId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContextsSchemasVersions: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsRequest, ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsResponse, ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsSchemasVersionsResponse,
  errors: [],
}));

/** List the supported schema types. The response will be an array of schema types. */
export interface ListProjectsLocationsSchemaRegistriesContextsSchemasTypesRequest {
  /** Required. The parent schema registry whose schema types are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` */
  parent: string;
}

export const ListProjectsLocationsSchemaRegistriesContextsSchemasTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/schemas/types" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsSchemasTypesRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsSchemasTypesResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsSchemasTypesResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsSchemasTypesError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContextsSchemasTypes: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsSchemasTypesRequest, ListProjectsLocationsSchemaRegistriesContextsSchemasTypesResponse, ListProjectsLocationsSchemaRegistriesContextsSchemasTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsSchemasTypesRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsSchemasTypesResponse,
  errors: [],
}));

/** List subjects which reference a particular schema id. The response will be an array of subject names. */
export interface ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsRequest {
  /** Required. The schema resource whose associated subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` */
  parent: string;
  /** Optional. The subject to filter the subjects by. */
  subject?: string;
  /** Optional. If true, the response will include soft-deleted subjects. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/schemas/{schemasId}/subjects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContextsSchemasSubjects: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsRequest, ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsResponse, ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsSchemasSubjectsResponse,
  errors: [],
}));

/** List subjects in the schema registry. The response will be an array of subject names. */
export interface ListProjectsLocationsSchemaRegistriesContextsSubjectsRequest {
  /** Required. The parent schema registry/context whose subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` */
  parent: string;
  /** Optional. The context to filter the subjects by, in the format of `:.{context}:`. If unset, all subjects in the registry are returned. Set to empty string or add as '?subjectPrefix=' at the end of this request to list subjects in the default context. */
  subjectPrefix?: string;
  /** Optional. If true, the response will include soft-deleted subjects. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesContextsSubjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subjectPrefix: Schema.optional(Schema.String).pipe(T.HttpQuery("subjectPrefix")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsSubjectsRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsSubjectsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsSubjectsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsSubjectsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContextsSubjects: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsSubjectsRequest, ListProjectsLocationsSchemaRegistriesContextsSubjectsResponse, ListProjectsLocationsSchemaRegistriesContextsSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsSubjectsRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsSubjectsResponse,
  errors: [],
}));

/** Delete a subject. The response will be an array of versions of the deleted subject. */
export interface DeleteProjectsLocationsSchemaRegistriesContextsSubjectsRequest {
  /** Required. The name of the subject to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  name: string;
  /** Optional. If true, the subject and all associated metadata including the schema ID will be deleted permanently. Otherwise, only the subject is soft-deleted. The default is false. Soft-deleted subjects can still be searched in ListSubjects API call with deleted=true query parameter. A soft-delete of a subject must be performed before a hard-delete. */
  permanent?: boolean;
}

export const DeleteProjectsLocationsSchemaRegistriesContextsSubjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  permanent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("permanent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesContextsSubjectsRequest>;

export type DeleteProjectsLocationsSchemaRegistriesContextsSubjectsResponse = HttpBody;
export const DeleteProjectsLocationsSchemaRegistriesContextsSubjectsResponse = HttpBody;

export type DeleteProjectsLocationsSchemaRegistriesContextsSubjectsError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesContextsSubjects: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesContextsSubjectsRequest, DeleteProjectsLocationsSchemaRegistriesContextsSubjectsResponse, DeleteProjectsLocationsSchemaRegistriesContextsSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesContextsSubjectsRequest,
  output: DeleteProjectsLocationsSchemaRegistriesContextsSubjectsResponse,
  errors: [],
}));

/** Lookup a schema under the specified subject. */
export interface LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsRequest {
  /** Required. The subject to lookup the schema in. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  parent: string;
  /** Request body */
  body?: LookupVersionRequest;
}

export const LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LookupVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsRequest>;

export type LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsResponse = SchemaVersion;
export const LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsResponse = SchemaVersion;

export type LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsError = CommonErrors;

export const lookupVersionProjectsLocationsSchemaRegistriesContextsSubjects: API.OperationMethod<LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsRequest, LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsResponse, LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsRequest,
  output: LookupVersionProjectsLocationsSchemaRegistriesContextsSubjectsResponse,
  errors: [],
}));

/** Get a versioned schema (schema with subject/version) of a subject. */
export interface GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest {
  /** Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  name: string;
  /** Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. */
  deleted?: boolean;
}

export const GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest>;

export type GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = SchemaVersion;
export const GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = SchemaVersion;

export type GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesContextsSubjectsVersions: API.OperationMethod<GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest, GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse, GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest,
  output: GetProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse,
  errors: [],
}));

/** Get the schema string only for a version of a subject. The response will be the schema string. */
export interface GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest {
  /** Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  name: string;
  /** Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. */
  deleted?: boolean;
}

export const GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}/versions/{versionsId}/schema" }),
  svc,
) as unknown as Schema.Schema<GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest>;

export type GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = HttpBody;
export const GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = HttpBody;

export type GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError = CommonErrors;

export const getSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersions: API.OperationMethod<GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest, GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse, GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest,
  output: GetSchemaProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse,
  errors: [],
}));

/** Get all versions of a subject. The response will be an array of versions of the subject. */
export interface ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest {
  /** Required. The subject whose versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  parent: string;
  /** Optional. If true, the response will include soft-deleted versions of an active or soft-deleted subject. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContextsSubjectsVersions: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest, ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse, ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse,
  errors: [],
}));

/** Register a new version under a given subject with the given schema. */
export interface CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest {
  /** Required. The subject to create the version for. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  parent: string;
  /** Request body */
  body?: CreateVersionRequest;
}

export const CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest>;

export type CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = CreateVersionResponse;
export const CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = CreateVersionResponse;

export type CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError = CommonErrors;

export const createProjectsLocationsSchemaRegistriesContextsSubjectsVersions: API.OperationMethod<CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest, CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse, CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest,
  output: CreateProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse,
  errors: [],
}));

/** Delete a version of a subject. The response will be the deleted version id. */
export interface DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest {
  /** Required. The name of the subject version to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  name: string;
  /** Optional. If true, both the version and the referenced schema ID will be permanently deleted. The default is false. If false, the version will be deleted but the schema ID will be retained. Soft-deleted versions can still be searched in ListVersions API call with deleted=true query parameter. A soft-delete of a version must be performed before a hard-delete. */
  permanent?: boolean;
}

export const DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  permanent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("permanent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest>;

export type DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = HttpBody;
export const DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse = HttpBody;

export type DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesContextsSubjectsVersions: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest, DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse, DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsRequest,
  output: DeleteProjectsLocationsSchemaRegistriesContextsSubjectsVersionsResponse,
  errors: [],
}));

/** Get a list of IDs of schemas that reference the schema with the given subject and version. */
export interface ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyRequest {
  /** Required. The version to list referenced by. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  parent: string;
}

export const ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/subjects/{subjectsId}/versions/{versionsId}/referencedby" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyRequest>;

export type ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedby: API.OperationMethod<ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyRequest, ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyResponse, ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyRequest,
  output: ListProjectsLocationsSchemaRegistriesContextsSubjectsVersionsReferencedbyResponse,
  errors: [],
}));

/** Check compatibility of a schema with all versions or a specific version of a subject. */
export interface CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityRequest {
  /** Required. The name of the resource to check compatibility for. The format is either of following: * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/* /versions: Check compatibility with one or more versions of the specified subject. * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/{subject}/versions/{version}: Check compatibility with a specific version of the subject. */
  name: string;
  /** Request body */
  body?: CheckCompatibilityRequest;
}

export const CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CheckCompatibilityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/compatibility/{compatibilityId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityRequest>;

export type CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityResponse = CheckCompatibilityResponse;
export const CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityResponse = CheckCompatibilityResponse;

export type CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityError = CommonErrors;

export const checkCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibility: API.OperationMethod<CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityRequest, CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityResponse, CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityRequest,
  output: CheckCompatibilityProjectsLocationsSchemaRegistriesContextsCompatibilityResponse,
  errors: [],
}));

/** Get schema config at global level or for a subject. */
export interface GetProjectsLocationsSchemaRegistriesContextsConfigRequest {
  /** Required. The resource name to get the config for. It can be either of following: * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Get config at global level. * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Get config for a specific subject. */
  name: string;
  /** Optional. If true, the config will fall back to the config at the global level if no subject level config is found. */
  defaultToGlobal?: boolean;
}

export const GetProjectsLocationsSchemaRegistriesContextsConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  defaultToGlobal: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("defaultToGlobal")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/config/{configId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesContextsConfigRequest>;

export type GetProjectsLocationsSchemaRegistriesContextsConfigResponse = SchemaConfig;
export const GetProjectsLocationsSchemaRegistriesContextsConfigResponse = SchemaConfig;

export type GetProjectsLocationsSchemaRegistriesContextsConfigError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesContextsConfig: API.OperationMethod<GetProjectsLocationsSchemaRegistriesContextsConfigRequest, GetProjectsLocationsSchemaRegistriesContextsConfigResponse, GetProjectsLocationsSchemaRegistriesContextsConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesContextsConfigRequest,
  output: GetProjectsLocationsSchemaRegistriesContextsConfigResponse,
  errors: [],
}));

/** Update config at global level or for a subject. Creates a SchemaSubject-level SchemaConfig if it does not exist. */
export interface UpdateProjectsLocationsSchemaRegistriesContextsConfigRequest {
  /** Required. The resource name to update the config for. It can be either of following: * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Update config at global level. * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Update config for a specific subject. */
  name: string;
  /** Request body */
  body?: UpdateSchemaConfigRequest;
}

export const UpdateProjectsLocationsSchemaRegistriesContextsConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSchemaConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/config/{configId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsSchemaRegistriesContextsConfigRequest>;

export type UpdateProjectsLocationsSchemaRegistriesContextsConfigResponse = SchemaConfig;
export const UpdateProjectsLocationsSchemaRegistriesContextsConfigResponse = SchemaConfig;

export type UpdateProjectsLocationsSchemaRegistriesContextsConfigError = CommonErrors;

export const updateProjectsLocationsSchemaRegistriesContextsConfig: API.OperationMethod<UpdateProjectsLocationsSchemaRegistriesContextsConfigRequest, UpdateProjectsLocationsSchemaRegistriesContextsConfigResponse, UpdateProjectsLocationsSchemaRegistriesContextsConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsSchemaRegistriesContextsConfigRequest,
  output: UpdateProjectsLocationsSchemaRegistriesContextsConfigResponse,
  errors: [],
}));

/** Delete schema config for a subject. */
export interface DeleteProjectsLocationsSchemaRegistriesContextsConfigRequest {
  /** Required. The resource name of subject to delete the config for. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject} */
  name: string;
}

export const DeleteProjectsLocationsSchemaRegistriesContextsConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/config/{configId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesContextsConfigRequest>;

export type DeleteProjectsLocationsSchemaRegistriesContextsConfigResponse = SchemaConfig;
export const DeleteProjectsLocationsSchemaRegistriesContextsConfigResponse = SchemaConfig;

export type DeleteProjectsLocationsSchemaRegistriesContextsConfigError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesContextsConfig: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesContextsConfigRequest, DeleteProjectsLocationsSchemaRegistriesContextsConfigResponse, DeleteProjectsLocationsSchemaRegistriesContextsConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesContextsConfigRequest,
  output: DeleteProjectsLocationsSchemaRegistriesContextsConfigResponse,
  errors: [],
}));

/** Get mode at global level or for a subject. */
export interface GetProjectsLocationsSchemaRegistriesContextsModeRequest {
  /** Required. The resource name of the mode. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context */
  name: string;
}

export const GetProjectsLocationsSchemaRegistriesContextsModeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/mode/{modeId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesContextsModeRequest>;

export type GetProjectsLocationsSchemaRegistriesContextsModeResponse = SchemaMode;
export const GetProjectsLocationsSchemaRegistriesContextsModeResponse = SchemaMode;

export type GetProjectsLocationsSchemaRegistriesContextsModeError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesContextsMode: API.OperationMethod<GetProjectsLocationsSchemaRegistriesContextsModeRequest, GetProjectsLocationsSchemaRegistriesContextsModeResponse, GetProjectsLocationsSchemaRegistriesContextsModeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesContextsModeRequest,
  output: GetProjectsLocationsSchemaRegistriesContextsModeResponse,
  errors: [],
}));

/** Update mode at global level or for a subject. */
export interface UpdateProjectsLocationsSchemaRegistriesContextsModeRequest {
  /** Required. The resource name of the mode. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context */
  name: string;
  /** Request body */
  body?: UpdateSchemaModeRequest;
}

export const UpdateProjectsLocationsSchemaRegistriesContextsModeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSchemaModeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/mode/{modeId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsSchemaRegistriesContextsModeRequest>;

export type UpdateProjectsLocationsSchemaRegistriesContextsModeResponse = SchemaMode;
export const UpdateProjectsLocationsSchemaRegistriesContextsModeResponse = SchemaMode;

export type UpdateProjectsLocationsSchemaRegistriesContextsModeError = CommonErrors;

export const updateProjectsLocationsSchemaRegistriesContextsMode: API.OperationMethod<UpdateProjectsLocationsSchemaRegistriesContextsModeRequest, UpdateProjectsLocationsSchemaRegistriesContextsModeResponse, UpdateProjectsLocationsSchemaRegistriesContextsModeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsSchemaRegistriesContextsModeRequest,
  output: UpdateProjectsLocationsSchemaRegistriesContextsModeResponse,
  errors: [],
}));

/** Delete schema mode for a subject. */
export interface DeleteProjectsLocationsSchemaRegistriesContextsModeRequest {
  /** Required. The resource name of subject to delete the mode for. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject} * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject} */
  name: string;
}

export const DeleteProjectsLocationsSchemaRegistriesContextsModeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/contexts/{contextsId}/mode/{modeId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesContextsModeRequest>;

export type DeleteProjectsLocationsSchemaRegistriesContextsModeResponse = SchemaMode;
export const DeleteProjectsLocationsSchemaRegistriesContextsModeResponse = SchemaMode;

export type DeleteProjectsLocationsSchemaRegistriesContextsModeError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesContextsMode: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesContextsModeRequest, DeleteProjectsLocationsSchemaRegistriesContextsModeResponse, DeleteProjectsLocationsSchemaRegistriesContextsModeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesContextsModeRequest,
  output: DeleteProjectsLocationsSchemaRegistriesContextsModeResponse,
  errors: [],
}));

/** Get the schema for the given schema id. */
export interface GetProjectsLocationsSchemaRegistriesSchemasRequest {
  /** Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` */
  name: string;
  /** Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. */
  subject?: string;
}

export const GetProjectsLocationsSchemaRegistriesSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesSchemasRequest>;

export type GetProjectsLocationsSchemaRegistriesSchemasResponse = Managedkafka_Schema;
export const GetProjectsLocationsSchemaRegistriesSchemasResponse = Managedkafka_Schema;

export type GetProjectsLocationsSchemaRegistriesSchemasError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesSchemas: API.OperationMethod<GetProjectsLocationsSchemaRegistriesSchemasRequest, GetProjectsLocationsSchemaRegistriesSchemasResponse, GetProjectsLocationsSchemaRegistriesSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesSchemasRequest,
  output: GetProjectsLocationsSchemaRegistriesSchemasResponse,
  errors: [],
}));

/** Get the schema string for the given schema id. The response will be the schema string. */
export interface GetSchemaProjectsLocationsSchemaRegistriesSchemasRequest {
  /** Required. The name of the schema to return. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` */
  name: string;
  /** Optional. Used to limit the search for the schema ID to a specific subject, otherwise the schema ID will be searched for in all subjects in the given specified context. */
  subject?: string;
}

export const GetSchemaProjectsLocationsSchemaRegistriesSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/schemas/{schemasId}/schema" }),
  svc,
) as unknown as Schema.Schema<GetSchemaProjectsLocationsSchemaRegistriesSchemasRequest>;

export type GetSchemaProjectsLocationsSchemaRegistriesSchemasResponse = HttpBody;
export const GetSchemaProjectsLocationsSchemaRegistriesSchemasResponse = HttpBody;

export type GetSchemaProjectsLocationsSchemaRegistriesSchemasError = CommonErrors;

export const getSchemaProjectsLocationsSchemaRegistriesSchemas: API.OperationMethod<GetSchemaProjectsLocationsSchemaRegistriesSchemasRequest, GetSchemaProjectsLocationsSchemaRegistriesSchemasResponse, GetSchemaProjectsLocationsSchemaRegistriesSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSchemaProjectsLocationsSchemaRegistriesSchemasRequest,
  output: GetSchemaProjectsLocationsSchemaRegistriesSchemasResponse,
  errors: [],
}));

/** List the schema versions for the given schema id. The response will be an array of subject-version pairs as: [{"subject":"subject1", "version":1}, {"subject":"subject2", "version":2}]. */
export interface ListProjectsLocationsSchemaRegistriesSchemasVersionsRequest {
  /** Required. The schema whose schema versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` */
  parent: string;
  /** Optional. The subject to filter the subjects by. */
  subject?: string;
  /** Optional. If true, the response will include soft-deleted versions of the schema, even if the subject is soft-deleted. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesSchemasVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/schemas/{schemasId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesSchemasVersionsRequest>;

export type ListProjectsLocationsSchemaRegistriesSchemasVersionsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesSchemasVersionsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesSchemasVersionsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesSchemasVersions: API.OperationMethod<ListProjectsLocationsSchemaRegistriesSchemasVersionsRequest, ListProjectsLocationsSchemaRegistriesSchemasVersionsResponse, ListProjectsLocationsSchemaRegistriesSchemasVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesSchemasVersionsRequest,
  output: ListProjectsLocationsSchemaRegistriesSchemasVersionsResponse,
  errors: [],
}));

/** List the supported schema types. The response will be an array of schema types. */
export interface ListProjectsLocationsSchemaRegistriesSchemasTypesRequest {
  /** Required. The parent schema registry whose schema types are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` */
  parent: string;
}

export const ListProjectsLocationsSchemaRegistriesSchemasTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/schemas/types" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesSchemasTypesRequest>;

export type ListProjectsLocationsSchemaRegistriesSchemasTypesResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesSchemasTypesResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesSchemasTypesError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesSchemasTypes: API.OperationMethod<ListProjectsLocationsSchemaRegistriesSchemasTypesRequest, ListProjectsLocationsSchemaRegistriesSchemasTypesResponse, ListProjectsLocationsSchemaRegistriesSchemasTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesSchemasTypesRequest,
  output: ListProjectsLocationsSchemaRegistriesSchemasTypesResponse,
  errors: [],
}));

/** List subjects which reference a particular schema id. The response will be an array of subject names. */
export interface ListProjectsLocationsSchemaRegistriesSchemasSubjectsRequest {
  /** Required. The schema resource whose associated subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/schemas/ids/{schema}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/schemas/ids/{schema}` */
  parent: string;
  /** Optional. The subject to filter the subjects by. */
  subject?: string;
  /** Optional. If true, the response will include soft-deleted subjects. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesSchemasSubjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subject: Schema.optional(Schema.String).pipe(T.HttpQuery("subject")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/schemas/{schemasId}/subjects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesSchemasSubjectsRequest>;

export type ListProjectsLocationsSchemaRegistriesSchemasSubjectsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesSchemasSubjectsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesSchemasSubjectsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesSchemasSubjects: API.OperationMethod<ListProjectsLocationsSchemaRegistriesSchemasSubjectsRequest, ListProjectsLocationsSchemaRegistriesSchemasSubjectsResponse, ListProjectsLocationsSchemaRegistriesSchemasSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesSchemasSubjectsRequest,
  output: ListProjectsLocationsSchemaRegistriesSchemasSubjectsResponse,
  errors: [],
}));

/** List subjects in the schema registry. The response will be an array of subject names. */
export interface ListProjectsLocationsSchemaRegistriesSubjectsRequest {
  /** Required. The parent schema registry/context whose subjects are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` */
  parent: string;
  /** Optional. The context to filter the subjects by, in the format of `:.{context}:`. If unset, all subjects in the registry are returned. Set to empty string or add as '?subjectPrefix=' at the end of this request to list subjects in the default context. */
  subjectPrefix?: string;
  /** Optional. If true, the response will include soft-deleted subjects. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesSubjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subjectPrefix: Schema.optional(Schema.String).pipe(T.HttpQuery("subjectPrefix")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesSubjectsRequest>;

export type ListProjectsLocationsSchemaRegistriesSubjectsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesSubjectsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesSubjectsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesSubjects: API.OperationMethod<ListProjectsLocationsSchemaRegistriesSubjectsRequest, ListProjectsLocationsSchemaRegistriesSubjectsResponse, ListProjectsLocationsSchemaRegistriesSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesSubjectsRequest,
  output: ListProjectsLocationsSchemaRegistriesSubjectsResponse,
  errors: [],
}));

/** Delete a subject. The response will be an array of versions of the deleted subject. */
export interface DeleteProjectsLocationsSchemaRegistriesSubjectsRequest {
  /** Required. The name of the subject to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  name: string;
  /** Optional. If true, the subject and all associated metadata including the schema ID will be deleted permanently. Otherwise, only the subject is soft-deleted. The default is false. Soft-deleted subjects can still be searched in ListSubjects API call with deleted=true query parameter. A soft-delete of a subject must be performed before a hard-delete. */
  permanent?: boolean;
}

export const DeleteProjectsLocationsSchemaRegistriesSubjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  permanent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("permanent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesSubjectsRequest>;

export type DeleteProjectsLocationsSchemaRegistriesSubjectsResponse = HttpBody;
export const DeleteProjectsLocationsSchemaRegistriesSubjectsResponse = HttpBody;

export type DeleteProjectsLocationsSchemaRegistriesSubjectsError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesSubjects: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesSubjectsRequest, DeleteProjectsLocationsSchemaRegistriesSubjectsResponse, DeleteProjectsLocationsSchemaRegistriesSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesSubjectsRequest,
  output: DeleteProjectsLocationsSchemaRegistriesSubjectsResponse,
  errors: [],
}));

/** Lookup a schema under the specified subject. */
export interface LookupVersionProjectsLocationsSchemaRegistriesSubjectsRequest {
  /** Required. The subject to lookup the schema in. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  parent: string;
  /** Request body */
  body?: LookupVersionRequest;
}

export const LookupVersionProjectsLocationsSchemaRegistriesSubjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LookupVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupVersionProjectsLocationsSchemaRegistriesSubjectsRequest>;

export type LookupVersionProjectsLocationsSchemaRegistriesSubjectsResponse = SchemaVersion;
export const LookupVersionProjectsLocationsSchemaRegistriesSubjectsResponse = SchemaVersion;

export type LookupVersionProjectsLocationsSchemaRegistriesSubjectsError = CommonErrors;

export const lookupVersionProjectsLocationsSchemaRegistriesSubjects: API.OperationMethod<LookupVersionProjectsLocationsSchemaRegistriesSubjectsRequest, LookupVersionProjectsLocationsSchemaRegistriesSubjectsResponse, LookupVersionProjectsLocationsSchemaRegistriesSubjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupVersionProjectsLocationsSchemaRegistriesSubjectsRequest,
  output: LookupVersionProjectsLocationsSchemaRegistriesSubjectsResponse,
  errors: [],
}));

/** Get a versioned schema (schema with subject/version) of a subject. */
export interface GetProjectsLocationsSchemaRegistriesSubjectsVersionsRequest {
  /** Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  name: string;
  /** Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. */
  deleted?: boolean;
}

export const GetProjectsLocationsSchemaRegistriesSubjectsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesSubjectsVersionsRequest>;

export type GetProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = SchemaVersion;
export const GetProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = SchemaVersion;

export type GetProjectsLocationsSchemaRegistriesSubjectsVersionsError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesSubjectsVersions: API.OperationMethod<GetProjectsLocationsSchemaRegistriesSubjectsVersionsRequest, GetProjectsLocationsSchemaRegistriesSubjectsVersionsResponse, GetProjectsLocationsSchemaRegistriesSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesSubjectsVersionsRequest,
  output: GetProjectsLocationsSchemaRegistriesSubjectsVersionsResponse,
  errors: [],
}));

/** Get the schema string only for a version of a subject. The response will be the schema string. */
export interface GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsRequest {
  /** Required. The name of the subject to return versions. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  name: string;
  /** Optional. If true, no matter if the subject/version is soft-deleted or not, it returns the version details. If false, it returns NOT_FOUND error if the subject/version is soft-deleted. The default is false. */
  deleted?: boolean;
}

export const GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}/versions/{versionsId}/schema" }),
  svc,
) as unknown as Schema.Schema<GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsRequest>;

export type GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = HttpBody;
export const GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = HttpBody;

export type GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsError = CommonErrors;

export const getSchemaProjectsLocationsSchemaRegistriesSubjectsVersions: API.OperationMethod<GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsRequest, GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsResponse, GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsRequest,
  output: GetSchemaProjectsLocationsSchemaRegistriesSubjectsVersionsResponse,
  errors: [],
}));

/** Get all versions of a subject. The response will be an array of versions of the subject. */
export interface ListProjectsLocationsSchemaRegistriesSubjectsVersionsRequest {
  /** Required. The subject whose versions are to be listed. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  parent: string;
  /** Optional. If true, the response will include soft-deleted versions of an active or soft-deleted subject. The default is false. */
  deleted?: boolean;
}

export const ListProjectsLocationsSchemaRegistriesSubjectsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesSubjectsVersionsRequest>;

export type ListProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesSubjectsVersionsError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesSubjectsVersions: API.OperationMethod<ListProjectsLocationsSchemaRegistriesSubjectsVersionsRequest, ListProjectsLocationsSchemaRegistriesSubjectsVersionsResponse, ListProjectsLocationsSchemaRegistriesSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesSubjectsVersionsRequest,
  output: ListProjectsLocationsSchemaRegistriesSubjectsVersionsResponse,
  errors: [],
}));

/** Register a new version under a given subject with the given schema. */
export interface CreateProjectsLocationsSchemaRegistriesSubjectsVersionsRequest {
  /** Required. The subject to create the version for. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` */
  parent: string;
  /** Request body */
  body?: CreateVersionRequest;
}

export const CreateProjectsLocationsSchemaRegistriesSubjectsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSchemaRegistriesSubjectsVersionsRequest>;

export type CreateProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = CreateVersionResponse;
export const CreateProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = CreateVersionResponse;

export type CreateProjectsLocationsSchemaRegistriesSubjectsVersionsError = CommonErrors;

export const createProjectsLocationsSchemaRegistriesSubjectsVersions: API.OperationMethod<CreateProjectsLocationsSchemaRegistriesSubjectsVersionsRequest, CreateProjectsLocationsSchemaRegistriesSubjectsVersionsResponse, CreateProjectsLocationsSchemaRegistriesSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSchemaRegistriesSubjectsVersionsRequest,
  output: CreateProjectsLocationsSchemaRegistriesSubjectsVersionsResponse,
  errors: [],
}));

/** Delete a version of a subject. The response will be the deleted version id. */
export interface DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsRequest {
  /** Required. The name of the subject version to delete. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  name: string;
  /** Optional. If true, both the version and the referenced schema ID will be permanently deleted. The default is false. If false, the version will be deleted but the schema ID will be retained. Soft-deleted versions can still be searched in ListVersions API call with deleted=true query parameter. A soft-delete of a version must be performed before a hard-delete. */
  permanent?: boolean;
}

export const DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  permanent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("permanent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsRequest>;

export type DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = HttpBody;
export const DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsResponse = HttpBody;

export type DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesSubjectsVersions: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsRequest, DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsResponse, DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsRequest,
  output: DeleteProjectsLocationsSchemaRegistriesSubjectsVersionsResponse,
  errors: [],
}));

/** Get a list of IDs of schemas that reference the schema with the given subject and version. */
export interface ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyRequest {
  /** Required. The version to list referenced by. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}/versions/{version}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}/versions/{version}` */
  parent: string;
}

export const ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/subjects/{subjectsId}/versions/{versionsId}/referencedby" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyRequest>;

export type ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyResponse = HttpBody;
export const ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyResponse = HttpBody;

export type ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyError = CommonErrors;

export const listProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedby: API.OperationMethod<ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyRequest, ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyResponse, ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyRequest,
  output: ListProjectsLocationsSchemaRegistriesSubjectsVersionsReferencedbyResponse,
  errors: [],
}));

/** Check compatibility of a schema with all versions or a specific version of a subject. */
export interface CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityRequest {
  /** Required. The name of the resource to check compatibility for. The format is either of following: * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/* /versions: Check compatibility with one or more versions of the specified subject. * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/compatibility/subjects/{subject}/versions/{version}: Check compatibility with a specific version of the subject. */
  name: string;
  /** Request body */
  body?: CheckCompatibilityRequest;
}

export const CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CheckCompatibilityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/compatibility/{compatibilityId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityRequest>;

export type CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityResponse = CheckCompatibilityResponse;
export const CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityResponse = CheckCompatibilityResponse;

export type CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityError = CommonErrors;

export const checkCompatibilityProjectsLocationsSchemaRegistriesCompatibility: API.OperationMethod<CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityRequest, CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityResponse, CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityRequest,
  output: CheckCompatibilityProjectsLocationsSchemaRegistriesCompatibilityResponse,
  errors: [],
}));

/** Get schema config at global level or for a subject. */
export interface GetProjectsLocationsSchemaRegistriesConfigRequest {
  /** Required. The resource name to get the config for. It can be either of following: * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Get config at global level. * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Get config for a specific subject. */
  name: string;
  /** Optional. If true, the config will fall back to the config at the global level if no subject level config is found. */
  defaultToGlobal?: boolean;
}

export const GetProjectsLocationsSchemaRegistriesConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  defaultToGlobal: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("defaultToGlobal")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/config/{configId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesConfigRequest>;

export type GetProjectsLocationsSchemaRegistriesConfigResponse = SchemaConfig;
export const GetProjectsLocationsSchemaRegistriesConfigResponse = SchemaConfig;

export type GetProjectsLocationsSchemaRegistriesConfigError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesConfig: API.OperationMethod<GetProjectsLocationsSchemaRegistriesConfigRequest, GetProjectsLocationsSchemaRegistriesConfigResponse, GetProjectsLocationsSchemaRegistriesConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesConfigRequest,
  output: GetProjectsLocationsSchemaRegistriesConfigResponse,
  errors: [],
}));

/** Update config at global level or for a subject. Creates a SchemaSubject-level SchemaConfig if it does not exist. */
export interface UpdateProjectsLocationsSchemaRegistriesConfigRequest {
  /** Required. The resource name to update the config for. It can be either of following: * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config: Update config at global level. * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject}: Update config for a specific subject. */
  name: string;
  /** Request body */
  body?: UpdateSchemaConfigRequest;
}

export const UpdateProjectsLocationsSchemaRegistriesConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSchemaConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/config/{configId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsSchemaRegistriesConfigRequest>;

export type UpdateProjectsLocationsSchemaRegistriesConfigResponse = SchemaConfig;
export const UpdateProjectsLocationsSchemaRegistriesConfigResponse = SchemaConfig;

export type UpdateProjectsLocationsSchemaRegistriesConfigError = CommonErrors;

export const updateProjectsLocationsSchemaRegistriesConfig: API.OperationMethod<UpdateProjectsLocationsSchemaRegistriesConfigRequest, UpdateProjectsLocationsSchemaRegistriesConfigResponse, UpdateProjectsLocationsSchemaRegistriesConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsSchemaRegistriesConfigRequest,
  output: UpdateProjectsLocationsSchemaRegistriesConfigResponse,
  errors: [],
}));

/** Delete schema config for a subject. */
export interface DeleteProjectsLocationsSchemaRegistriesConfigRequest {
  /** Required. The resource name of subject to delete the config for. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/config/{subject} */
  name: string;
}

export const DeleteProjectsLocationsSchemaRegistriesConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/config/{configId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesConfigRequest>;

export type DeleteProjectsLocationsSchemaRegistriesConfigResponse = SchemaConfig;
export const DeleteProjectsLocationsSchemaRegistriesConfigResponse = SchemaConfig;

export type DeleteProjectsLocationsSchemaRegistriesConfigError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesConfig: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesConfigRequest, DeleteProjectsLocationsSchemaRegistriesConfigResponse, DeleteProjectsLocationsSchemaRegistriesConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesConfigRequest,
  output: DeleteProjectsLocationsSchemaRegistriesConfigResponse,
  errors: [],
}));

/** Get mode at global level or for a subject. */
export interface GetProjectsLocationsSchemaRegistriesModeRequest {
  /** Required. The resource name of the mode. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context */
  name: string;
}

export const GetProjectsLocationsSchemaRegistriesModeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/mode/{modeId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSchemaRegistriesModeRequest>;

export type GetProjectsLocationsSchemaRegistriesModeResponse = SchemaMode;
export const GetProjectsLocationsSchemaRegistriesModeResponse = SchemaMode;

export type GetProjectsLocationsSchemaRegistriesModeError = CommonErrors;

export const getProjectsLocationsSchemaRegistriesMode: API.OperationMethod<GetProjectsLocationsSchemaRegistriesModeRequest, GetProjectsLocationsSchemaRegistriesModeResponse, GetProjectsLocationsSchemaRegistriesModeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSchemaRegistriesModeRequest,
  output: GetProjectsLocationsSchemaRegistriesModeResponse,
  errors: [],
}));

/** Update mode at global level or for a subject. */
export interface UpdateProjectsLocationsSchemaRegistriesModeRequest {
  /** Required. The resource name of the mode. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject}: mode for a schema registry, or * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject}: mode for a specific subject in a specific context */
  name: string;
  /** Request body */
  body?: UpdateSchemaModeRequest;
}

export const UpdateProjectsLocationsSchemaRegistriesModeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSchemaModeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/mode/{modeId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsSchemaRegistriesModeRequest>;

export type UpdateProjectsLocationsSchemaRegistriesModeResponse = SchemaMode;
export const UpdateProjectsLocationsSchemaRegistriesModeResponse = SchemaMode;

export type UpdateProjectsLocationsSchemaRegistriesModeError = CommonErrors;

export const updateProjectsLocationsSchemaRegistriesMode: API.OperationMethod<UpdateProjectsLocationsSchemaRegistriesModeRequest, UpdateProjectsLocationsSchemaRegistriesModeResponse, UpdateProjectsLocationsSchemaRegistriesModeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsSchemaRegistriesModeRequest,
  output: UpdateProjectsLocationsSchemaRegistriesModeResponse,
  errors: [],
}));

/** Delete schema mode for a subject. */
export interface DeleteProjectsLocationsSchemaRegistriesModeRequest {
  /** Required. The resource name of subject to delete the mode for. The format is * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/mode/{subject} * projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/mode/{subject} */
  name: string;
}

export const DeleteProjectsLocationsSchemaRegistriesModeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/schemaRegistries/{schemaRegistriesId}/mode/{modeId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSchemaRegistriesModeRequest>;

export type DeleteProjectsLocationsSchemaRegistriesModeResponse = SchemaMode;
export const DeleteProjectsLocationsSchemaRegistriesModeResponse = SchemaMode;

export type DeleteProjectsLocationsSchemaRegistriesModeError = CommonErrors;

export const deleteProjectsLocationsSchemaRegistriesMode: API.OperationMethod<DeleteProjectsLocationsSchemaRegistriesModeRequest, DeleteProjectsLocationsSchemaRegistriesModeResponse, DeleteProjectsLocationsSchemaRegistriesModeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSchemaRegistriesModeRequest,
  output: DeleteProjectsLocationsSchemaRegistriesModeResponse,
  errors: [],
}));

