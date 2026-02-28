// ==========================================================================
// Network Management API (networkmanagement v1)
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
  name: "networkmanagement",
  version: "v1",
  rootUrl: "https://networkmanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ProxyConnectionInfo {
  /** IP protocol in string format, for example: "TCP", "UDP", "ICMP". */
  protocol?: string;
  /** Source IP address of an original connection. */
  oldSourceIp?: string;
  /** Destination port of an original connection. Only valid when protocol is TCP or UDP. */
  oldDestinationPort?: number;
  /** Destination IP address of an original connection */
  oldDestinationIp?: string;
  /** URI of the network where connection is proxied. */
  networkUri?: string;
  /** Destination IP address of a new connection. */
  newDestinationIp?: string;
  /** Source port of an original connection. Only valid when protocol is TCP or UDP. */
  oldSourcePort?: number;
  /** Source port of a new connection. Only valid when protocol is TCP or UDP. */
  newSourcePort?: number;
  /** Source IP address of a new connection. */
  newSourceIp?: string;
  /** Destination port of a new connection. Only valid when protocol is TCP or UDP. */
  newDestinationPort?: number;
  /** Uri of proxy subnet. */
  subnetUri?: string;
}

export const ProxyConnectionInfo: Schema.Schema<ProxyConnectionInfo> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  oldSourceIp: Schema.optional(Schema.String),
  oldDestinationPort: Schema.optional(Schema.Number),
  oldDestinationIp: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  newDestinationIp: Schema.optional(Schema.String),
  oldSourcePort: Schema.optional(Schema.Number),
  newSourcePort: Schema.optional(Schema.Number),
  newSourceIp: Schema.optional(Schema.String),
  newDestinationPort: Schema.optional(Schema.Number),
  subnetUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ProxyConnectionInfo" }) as any as Schema.Schema<ProxyConnectionInfo>;

export interface AppEngineVersionEndpoint {
  /** An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name. */
  uri?: string;
}

export const AppEngineVersionEndpoint: Schema.Schema<AppEngineVersionEndpoint> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngineVersionEndpoint" }) as any as Schema.Schema<AppEngineVersionEndpoint>;

export interface FirewallInfo {
  /** The firewall rule's type. */
  firewallRuleType?: "FIREWALL_RULE_TYPE_UNSPECIFIED" | "HIERARCHICAL_FIREWALL_POLICY_RULE" | "VPC_FIREWALL_RULE" | "IMPLIED_VPC_FIREWALL_RULE" | "SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE" | "NETWORK_FIREWALL_POLICY_RULE" | "NETWORK_REGIONAL_FIREWALL_POLICY_RULE" | "SYSTEM_NETWORK_FIREWALL_POLICY_RULE" | "SYSTEM_REGIONAL_NETWORK_FIREWALL_POLICY_RULE" | "UNSUPPORTED_FIREWALL_POLICY_RULE" | "TRACKING_STATE" | "ANALYSIS_SKIPPED" | (string & {});
  /** Possible values: ALLOW, DENY, APPLY_SECURITY_PROFILE_GROUP */
  action?: string;
  /** The priority of the firewall rule. */
  priority?: number;
  /** The URI of the firewall rule. This field is not applicable to implied VPC firewall rules. */
  uri?: string;
  /** The target tags defined by the VPC firewall rule. This field is not applicable to firewall policy rules. */
  targetTags?: Array<string>;
  /** The priority of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules. */
  policyPriority?: number;
  /** The URI of the VPC network that the firewall rule is associated with. This field is not applicable to hierarchical firewall policy rules. */
  networkUri?: string;
  /** The display name of the firewall rule. This field might be empty for firewall policy rules. */
  displayName?: string;
  /** The name of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules. */
  policy?: string;
  /** Target type of the firewall rule. */
  targetType?: "TARGET_TYPE_UNSPECIFIED" | "INSTANCES" | "INTERNAL_MANAGED_LB" | (string & {});
  /** The URI of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules. */
  policyUri?: string;
  /** Possible values: INGRESS, EGRESS */
  direction?: string;
  /** The target service accounts specified by the firewall rule. */
  targetServiceAccounts?: Array<string>;
}

export const FirewallInfo: Schema.Schema<FirewallInfo> = Schema.suspend(() => Schema.Struct({
  firewallRuleType: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  uri: Schema.optional(Schema.String),
  targetTags: Schema.optional(Schema.Array(Schema.String)),
  policyPriority: Schema.optional(Schema.Number),
  networkUri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
  targetType: Schema.optional(Schema.String),
  policyUri: Schema.optional(Schema.String),
  direction: Schema.optional(Schema.String),
  targetServiceAccounts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FirewallInfo" }) as any as Schema.Schema<FirewallInfo>;

export interface AbortInfo {
  /** Causes that the analysis is aborted. */
  cause?: "CAUSE_UNSPECIFIED" | "UNKNOWN_NETWORK" | "UNKNOWN_PROJECT" | "NO_EXTERNAL_IP" | "UNINTENDED_DESTINATION" | "SOURCE_ENDPOINT_NOT_FOUND" | "MISMATCHED_SOURCE_NETWORK" | "DESTINATION_ENDPOINT_NOT_FOUND" | "MISMATCHED_DESTINATION_NETWORK" | "UNKNOWN_IP" | "GOOGLE_MANAGED_SERVICE_UNKNOWN_IP" | "SOURCE_IP_ADDRESS_NOT_IN_SOURCE_NETWORK" | "PERMISSION_DENIED" | "PERMISSION_DENIED_NO_CLOUD_NAT_CONFIGS" | "PERMISSION_DENIED_NO_NEG_ENDPOINT_CONFIGS" | "PERMISSION_DENIED_NO_CLOUD_ROUTER_CONFIGS" | "NO_SOURCE_LOCATION" | "NO_SOURCE_GCP_NETWORK_LOCATION" | "NO_SOURCE_NON_GCP_NETWORK_LOCATION" | "NO_SOURCE_INTERNET_LOCATION" | "INVALID_ARGUMENT" | "TRACE_TOO_LONG" | "INTERNAL_ERROR" | "UNSUPPORTED" | "MISMATCHED_IP_VERSION" | "GKE_KONNECTIVITY_PROXY_UNSUPPORTED" | "RESOURCE_CONFIG_NOT_FOUND" | "VM_INSTANCE_CONFIG_NOT_FOUND" | "NETWORK_CONFIG_NOT_FOUND" | "FIREWALL_CONFIG_NOT_FOUND" | "ROUTE_CONFIG_NOT_FOUND" | "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_PSC_ENDPOINT" | "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_ENDPOINT" | "SOURCE_PSC_CLOUD_SQL_UNSUPPORTED" | "SOURCE_EXTERNAL_CLOUD_SQL_UNSUPPORTED" | "SOURCE_REDIS_CLUSTER_UNSUPPORTED" | "SOURCE_REDIS_INSTANCE_UNSUPPORTED" | "SOURCE_FORWARDING_RULE_UNSUPPORTED" | "NON_ROUTABLE_IP_ADDRESS" | "UNKNOWN_ISSUE_IN_GOOGLE_MANAGED_PROJECT" | "UNSUPPORTED_GOOGLE_MANAGED_PROJECT_CONFIG" | "NO_SERVERLESS_IP_RANGES" | "IP_VERSION_PROTOCOL_MISMATCH" | "GKE_POD_UNKNOWN_ENDPOINT_LOCATION" | (string & {});
  /** IP address that caused the abort. */
  ipAddress?: string;
  /** List of project IDs the user specified in the request but lacks access to. In this case, analysis is aborted with the PERMISSION_DENIED cause. */
  projectsMissingPermission?: Array<string>;
  /** URI of the resource that caused the abort. */
  resourceUri?: string;
}

export const AbortInfo: Schema.Schema<AbortInfo> = Schema.suspend(() => Schema.Struct({
  cause: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  projectsMissingPermission: Schema.optional(Schema.Array(Schema.String)),
  resourceUri: Schema.optional(Schema.String),
})).annotate({ identifier: "AbortInfo" }) as any as Schema.Schema<AbortInfo>;

export interface LatencyPercentile {
  /** Percentage of samples this data point applies to. */
  percent?: number;
  /** percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field. */
  latencyMicros?: string;
}

export const LatencyPercentile: Schema.Schema<LatencyPercentile> = Schema.suspend(() => Schema.Struct({
  percent: Schema.optional(Schema.Number),
  latencyMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "LatencyPercentile" }) as any as Schema.Schema<LatencyPercentile>;

export interface LatencyDistribution {
  /** Representative latency percentiles. */
  latencyPercentiles?: Array<LatencyPercentile>;
}

export const LatencyDistribution: Schema.Schema<LatencyDistribution> = Schema.suspend(() => Schema.Struct({
  latencyPercentiles: Schema.optional(Schema.Array(LatencyPercentile)),
})).annotate({ identifier: "LatencyDistribution" }) as any as Schema.Schema<LatencyDistribution>;

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

export interface ForwardInfo {
  /** URI of the resource that the packet is forwarded to. */
  resourceUri?: string;
  /** IP address of the target (if applicable). */
  ipAddress?: string;
  /** Target type where this packet is forwarded to. */
  target?: "TARGET_UNSPECIFIED" | "PEERING_VPC" | "VPN_GATEWAY" | "INTERCONNECT" | "GKE_MASTER" | "IMPORTED_CUSTOM_ROUTE_NEXT_HOP" | "CLOUD_SQL_INSTANCE" | "ANOTHER_PROJECT" | "NCC_HUB" | "ROUTER_APPLIANCE" | "SECURE_WEB_PROXY_GATEWAY" | (string & {});
}

export const ForwardInfo: Schema.Schema<ForwardInfo> = Schema.suspend(() => Schema.Struct({
  resourceUri: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "ForwardInfo" }) as any as Schema.Schema<ForwardInfo>;

export interface EffectiveVpcFlowLogsConfig {
  /** Custom metadata fields to include in the reported VPC flow logs. Can only be specified if "metadata" was set to CUSTOM_METADATA. */
  metadataFields?: Array<string>;
  /** Traffic will be logged from VMs, VPN tunnels and Interconnect Attachments within the network. Format: projects/{project_id}/global/networks/{name} */
  network?: string;
  /** The state of the VPC Flow Log configuration. Default value is ENABLED. When creating a new configuration, it must be enabled. Setting state=DISABLED will pause the log generation for this config. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Export filter used to define which VPC Flow Logs should be logged. */
  filterExpr?: string;
  /** Traffic will be logged from the Interconnect Attachment. Format: projects/{project_id}/regions/{region}/interconnectAttachments/{name} */
  interconnectAttachment?: string;
  /** Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default value is INCLUDE_ALL_METADATA. */
  metadata?: "METADATA_UNSPECIFIED" | "INCLUDE_ALL_METADATA" | "EXCLUDE_ALL_METADATA" | "CUSTOM_METADATA" | (string & {});
  /** Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name} */
  vpnTunnel?: string;
  /** The aggregation interval for the logs. Default value is INTERVAL_5_SEC. */
  aggregationInterval?: "AGGREGATION_INTERVAL_UNSPECIFIED" | "INTERVAL_5_SEC" | "INTERVAL_30_SEC" | "INTERVAL_1_MIN" | "INTERVAL_5_MIN" | "INTERVAL_10_MIN" | "INTERVAL_15_MIN" | (string & {});
  /** Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For a Compute config, the name will be the path of the subnet: `projects/{project_id}/regions/{region}/subnetworks/{subnet_id}` */
  name?: string;
  /** Specifies the scope of the config (e.g., SUBNET, NETWORK, ORGANIZATION..). */
  scope?: "SCOPE_UNSPECIFIED" | "SUBNET" | "COMPUTE_API_SUBNET" | "NETWORK" | "VPN_TUNNEL" | "INTERCONNECT_ATTACHMENT" | "ORGANIZATION" | (string & {});
  /** Determines whether to include cross project annotations in the logs. This field is available only for organization configurations. If not specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED. */
  crossProjectMetadata?: "CROSS_PROJECT_METADATA_UNSPECIFIED" | "CROSS_PROJECT_METADATA_ENABLED" | "CROSS_PROJECT_METADATA_DISABLED" | (string & {});
  /** Traffic will be logged from VMs within the subnetwork. Format: projects/{project_id}/regions/{region}/subnetworks/{name} */
  subnet?: string;
  /** The value of the field must be in (0, 1]. The sampling rate of VPC Flow Logs where 1.0 means all collected logs are reported. Setting the sampling rate to 0.0 is not allowed. If you want to disable VPC Flow Logs, use the state field instead. Default value is 1.0. */
  flowSampling?: number;
}

export const EffectiveVpcFlowLogsConfig: Schema.Schema<EffectiveVpcFlowLogsConfig> = Schema.suspend(() => Schema.Struct({
  metadataFields: Schema.optional(Schema.Array(Schema.String)),
  network: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  filterExpr: Schema.optional(Schema.String),
  interconnectAttachment: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.String),
  vpnTunnel: Schema.optional(Schema.String),
  aggregationInterval: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  crossProjectMetadata: Schema.optional(Schema.String),
  subnet: Schema.optional(Schema.String),
  flowSampling: Schema.optional(Schema.Number),
})).annotate({ identifier: "EffectiveVpcFlowLogsConfig" }) as any as Schema.Schema<EffectiveVpcFlowLogsConfig>;

export interface EndpointInfo {
  /** Destination port. Only valid when protocol is TCP or UDP. */
  destinationPort?: number;
  /** IP protocol in string format, for example: "TCP", "UDP", "ICMP". */
  protocol?: string;
  /** Destination IP address. */
  destinationIp?: string;
  /** URI of the network where this packet originates from. */
  sourceNetworkUri?: string;
  /** URI of the source telemetry agent this packet originates from. */
  sourceAgentUri?: string;
  /** Source port. Only valid when protocol is TCP or UDP. */
  sourcePort?: number;
  /** URI of the network where this packet is sent to. */
  destinationNetworkUri?: string;
  /** Source IP address. */
  sourceIp?: string;
}

export const EndpointInfo: Schema.Schema<EndpointInfo> = Schema.suspend(() => Schema.Struct({
  destinationPort: Schema.optional(Schema.Number),
  protocol: Schema.optional(Schema.String),
  destinationIp: Schema.optional(Schema.String),
  sourceNetworkUri: Schema.optional(Schema.String),
  sourceAgentUri: Schema.optional(Schema.String),
  sourcePort: Schema.optional(Schema.Number),
  destinationNetworkUri: Schema.optional(Schema.String),
  sourceIp: Schema.optional(Schema.String),
})).annotate({ identifier: "EndpointInfo" }) as any as Schema.Schema<EndpointInfo>;

export interface RedisInstanceInfo {
  /** Primary endpoint IP address of a Cloud Redis Instance. */
  primaryEndpointIp?: string;
  /** URI of a Cloud Redis Instance. */
  uri?: string;
  /** Name of a Cloud Redis Instance. */
  displayName?: string;
  /** Read endpoint IP address of a Cloud Redis Instance (if applicable). */
  readEndpointIp?: string;
  /** URI of a Cloud Redis Instance network. */
  networkUri?: string;
  /** Region in which the Cloud Redis Instance is defined. */
  region?: string;
}

export const RedisInstanceInfo: Schema.Schema<RedisInstanceInfo> = Schema.suspend(() => Schema.Struct({
  primaryEndpointIp: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  readEndpointIp: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "RedisInstanceInfo" }) as any as Schema.Schema<RedisInstanceInfo>;

export interface RedisClusterInfo {
  /** Name of a Redis Cluster. */
  displayName?: string;
  /** Name of the region in which the Redis Cluster is defined. For example, "us-central1". */
  location?: string;
  /** URI of the network containing the Redis Cluster endpoints in format "projects/{project_id}/global/networks/{network_id}". */
  networkUri?: string;
  /** Discovery endpoint IP address of a Redis Cluster. */
  discoveryEndpointIpAddress?: string;
  /** Secondary endpoint IP address of a Redis Cluster. */
  secondaryEndpointIpAddress?: string;
  /** URI of a Redis Cluster in format "projects/{project_id}/locations/{location}/clusters/{cluster_id}" */
  uri?: string;
}

export const RedisClusterInfo: Schema.Schema<RedisClusterInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  discoveryEndpointIpAddress: Schema.optional(Schema.String),
  secondaryEndpointIpAddress: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "RedisClusterInfo" }) as any as Schema.Schema<RedisClusterInfo>;

export interface CloudRunRevisionInfo {
  /** URI of Cloud Run service this revision belongs to. */
  serviceUri?: string;
  /** Location in which this revision is deployed. */
  location?: string;
  /** Name of a Cloud Run revision. */
  displayName?: string;
  /** URI of a Cloud Run revision. */
  uri?: string;
}

export const CloudRunRevisionInfo: Schema.Schema<CloudRunRevisionInfo> = Schema.suspend(() => Schema.Struct({
  serviceUri: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRunRevisionInfo" }) as any as Schema.Schema<CloudRunRevisionInfo>;

export interface NatInfo {
  /** IP protocol in string format, for example: "TCP", "UDP", "ICMP". */
  protocol?: string;
  /** Source IP address before NAT translation. */
  oldSourceIp?: string;
  /** Destination port before NAT translation. Only valid when protocol is TCP or UDP. */
  oldDestinationPort?: number;
  /** Type of NAT. */
  type?: "TYPE_UNSPECIFIED" | "INTERNAL_TO_EXTERNAL" | "EXTERNAL_TO_INTERNAL" | "CLOUD_NAT" | "PRIVATE_SERVICE_CONNECT" | "GKE_POD_IP_MASQUERADING" | (string & {});
  /** The name of Cloud NAT Gateway. Only valid when type is CLOUD_NAT. */
  natGatewayName?: string;
  /** Source IP address after NAT translation. */
  newSourceIp?: string;
  /** Destination IP address before NAT translation. */
  oldDestinationIp?: string;
  /** Type of Cloud NAT gateway. Only valid when `type` is CLOUD_NAT. */
  cloudNatGatewayType?: "CLOUD_NAT_GATEWAY_TYPE_UNSPECIFIED" | "PUBLIC_NAT44" | "PUBLIC_NAT64" | "PRIVATE_NAT_NCC" | "PRIVATE_NAT_HYBRID" | "PRIVATE_NAT64" | (string & {});
  /** Source port before NAT translation. Only valid when protocol is TCP or UDP. */
  oldSourcePort?: number;
  /** Destination IP address after NAT translation. */
  newDestinationIp?: string;
  /** Uri of the Cloud Router. Only valid when type is CLOUD_NAT. */
  routerUri?: string;
  /** URI of the network where NAT translation takes place. */
  networkUri?: string;
  /** Destination port after NAT translation. Only valid when protocol is TCP or UDP. */
  newDestinationPort?: number;
  /** Source port after NAT translation. Only valid when protocol is TCP or UDP. */
  newSourcePort?: number;
}

export const NatInfo: Schema.Schema<NatInfo> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  oldSourceIp: Schema.optional(Schema.String),
  oldDestinationPort: Schema.optional(Schema.Number),
  type: Schema.optional(Schema.String),
  natGatewayName: Schema.optional(Schema.String),
  newSourceIp: Schema.optional(Schema.String),
  oldDestinationIp: Schema.optional(Schema.String),
  cloudNatGatewayType: Schema.optional(Schema.String),
  oldSourcePort: Schema.optional(Schema.Number),
  newDestinationIp: Schema.optional(Schema.String),
  routerUri: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  newDestinationPort: Schema.optional(Schema.Number),
  newSourcePort: Schema.optional(Schema.Number),
})).annotate({ identifier: "NatInfo" }) as any as Schema.Schema<NatInfo>;

export interface NetworkInfo {
  /** The IP range of the subnet matching the source IP address of the test. */
  matchedIpRange?: string;
  /** Name of a Compute Engine network. */
  displayName?: string;
  /** URI of a Compute Engine network. */
  uri?: string;
  /** The region of the subnet matching the source IP address of the test. */
  region?: string;
  /** URI of the subnet matching the source IP address of the test. */
  matchedSubnetUri?: string;
}

export const NetworkInfo: Schema.Schema<NetworkInfo> = Schema.suspend(() => Schema.Struct({
  matchedIpRange: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  matchedSubnetUri: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkInfo" }) as any as Schema.Schema<NetworkInfo>;

export interface VpcConnectorInfo {
  /** Name of a VPC connector. */
  displayName?: string;
  /** URI of a VPC connector. */
  uri?: string;
  /** Location in which the VPC connector is deployed. */
  location?: string;
}

export const VpcConnectorInfo: Schema.Schema<VpcConnectorInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "VpcConnectorInfo" }) as any as Schema.Schema<VpcConnectorInfo>;

export interface InstanceInfo {
  /** Network tags configured on the instance. */
  networkTags?: Array<string>;
  /** Indicates whether the Compute Engine instance is running. Deprecated: use the `status` field instead. */
  running?: boolean;
  /** Internal IP address of the network interface. */
  internalIp?: string;
  /** The status of the instance. */
  status?: "STATUS_UNSPECIFIED" | "RUNNING" | "NOT_RUNNING" | (string & {});
  /** URI of a Compute Engine network. */
  networkUri?: string;
  /** Name of a Compute Engine instance. */
  displayName?: string;
  /** Service account authorized for the instance. */
  serviceAccount?: string;
  /** URI of the PSC network attachment the NIC is attached to (if relevant). */
  pscNetworkAttachmentUri?: string;
  /** Name of the network interface of a Compute Engine instance. */
  interface?: string;
  /** URI of a Compute Engine instance. */
  uri?: string;
  /** External IP address of the network interface. */
  externalIp?: string;
}

export const InstanceInfo: Schema.Schema<InstanceInfo> = Schema.suspend(() => Schema.Struct({
  networkTags: Schema.optional(Schema.Array(Schema.String)),
  running: Schema.optional(Schema.Boolean),
  internalIp: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  pscNetworkAttachmentUri: Schema.optional(Schema.String),
  interface: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  externalIp: Schema.optional(Schema.String),
})).annotate({ identifier: "InstanceInfo" }) as any as Schema.Schema<InstanceInfo>;

export interface CloudFunctionInfo {
  /** Name of a Cloud Function. */
  displayName?: string;
  /** URI of a Cloud Function. */
  uri?: string;
  /** Latest successfully deployed version id of the Cloud Function. */
  versionId?: string;
  /** Location in which the Cloud Function is deployed. */
  location?: string;
}

export const CloudFunctionInfo: Schema.Schema<CloudFunctionInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  versionId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudFunctionInfo" }) as any as Schema.Schema<CloudFunctionInfo>;

export interface LoadBalancerBackendInfo {
  /** URI of the instance group this backend belongs to (if applicable). */
  instanceGroupUri?: string;
  /** URI of the backend instance (if applicable). Populated for instance group backends, and zonal NEG backends. */
  instanceUri?: string;
  /** URI of the network endpoint group this backend belongs to (if applicable). */
  networkEndpointGroupUri?: string;
  /** Output only. Health check firewalls configuration state for the backend. This is a result of the static firewall analysis (verifying that health check traffic from required IP ranges to the backend is allowed or not). The backend might still be unhealthy even if these firewalls are configured. Please refer to the documentation for more information: https://cloud.google.com/load-balancing/docs/firewall-rules */
  healthCheckFirewallsConfigState?: "HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED" | "FIREWALLS_CONFIGURED" | "FIREWALLS_PARTIALLY_CONFIGURED" | "FIREWALLS_NOT_CONFIGURED" | "FIREWALLS_UNSUPPORTED" | (string & {});
  /** URI of the backend service this backend belongs to (if applicable). */
  backendServiceUri?: string;
  /** URI of the health check attached to this backend (if applicable). */
  healthCheckUri?: string;
  /** PSC Google API target this PSC NEG backend targets (if applicable). */
  pscGoogleApiTarget?: string;
  /** URI of the PSC service attachment this PSC NEG backend targets (if applicable). */
  pscServiceAttachmentUri?: string;
  /** Display name of the backend. For example, it might be an instance name for the instance group backends, or an IP address and port for zonal network endpoint group backends. */
  name?: string;
  /** URI of the backend bucket this backend targets (if applicable). */
  backendBucketUri?: string;
}

export const LoadBalancerBackendInfo: Schema.Schema<LoadBalancerBackendInfo> = Schema.suspend(() => Schema.Struct({
  instanceGroupUri: Schema.optional(Schema.String),
  instanceUri: Schema.optional(Schema.String),
  networkEndpointGroupUri: Schema.optional(Schema.String),
  healthCheckFirewallsConfigState: Schema.optional(Schema.String),
  backendServiceUri: Schema.optional(Schema.String),
  healthCheckUri: Schema.optional(Schema.String),
  pscGoogleApiTarget: Schema.optional(Schema.String),
  pscServiceAttachmentUri: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  backendBucketUri: Schema.optional(Schema.String),
})).annotate({ identifier: "LoadBalancerBackendInfo" }) as any as Schema.Schema<LoadBalancerBackendInfo>;

export interface RouteInfo {
  /** Region of the route. DYNAMIC, PEERING_DYNAMIC, POLICY_BASED and ADVERTISED routes only. If set for POLICY_BASED route, this is a region of VLAN attachments for Cloud Interconnect the route applies to. */
  region?: string;
  /** URI of the NCC Hub the route is advertised by. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only. */
  nccHubUri?: string;
  /** URI of a route. SUBNET, STATIC, PEERING_SUBNET (only for peering network) and POLICY_BASED routes only. */
  uri?: string;
  /** Destination port ranges of the route. POLICY_BASED routes only. */
  destPortRanges?: Array<string>;
  /** Source port ranges of the route. POLICY_BASED routes only. */
  srcPortRanges?: Array<string>;
  /** For PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub, the URI of the corresponding route in NCC Hub's routing table. */
  nccHubRouteUri?: string;
  /** Type of route. */
  routeType?: "ROUTE_TYPE_UNSPECIFIED" | "SUBNET" | "STATIC" | "DYNAMIC" | "PEERING_SUBNET" | "PEERING_STATIC" | "PEERING_DYNAMIC" | "POLICY_BASED" | "ADVERTISED" | (string & {});
  /** Source IP address range of the route. POLICY_BASED routes only. */
  srcIpRange?: string;
  /** Instance tags of the route. */
  instanceTags?: Array<string>;
  /** For PEERING_SUBNET and PEERING_STATIC routes, the URI of the originating SUBNET/STATIC route. */
  originatingRouteUri?: string;
  /** URI of the destination NCC Spoke. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only. */
  nccSpokeUri?: string;
  /** For PEERING_SUBNET, PEERING_STATIC and PEERING_DYNAMIC routes, the name of the originating SUBNET/STATIC/DYNAMIC route. */
  originatingRouteDisplayName?: string;
  /** URI of a VPC network where the next hop resource is located. */
  nextHopNetworkUri?: string;
  /** Indicates where route is applicable. Deprecated, routes with NCC_HUB scope are not included in the trace in new tests. */
  routeScope?: "ROUTE_SCOPE_UNSPECIFIED" | "NETWORK" | "NCC_HUB" | (string & {});
  /** Type of next hop. */
  nextHopType?: "NEXT_HOP_TYPE_UNSPECIFIED" | "NEXT_HOP_IP" | "NEXT_HOP_INSTANCE" | "NEXT_HOP_NETWORK" | "NEXT_HOP_PEERING" | "NEXT_HOP_INTERCONNECT" | "NEXT_HOP_VPN_TUNNEL" | "NEXT_HOP_VPN_GATEWAY" | "NEXT_HOP_INTERNET_GATEWAY" | "NEXT_HOP_BLACKHOLE" | "NEXT_HOP_ILB" | "NEXT_HOP_ROUTER_APPLIANCE" | "NEXT_HOP_NCC_HUB" | "SECURE_WEB_PROXY_GATEWAY" | (string & {});
  /** URI of the next hop resource. */
  nextHopUri?: string;
  /** Name of a route. */
  displayName?: string;
  /** URI of a VPC network where route is located. */
  networkUri?: string;
  /** String type of the next hop of the route (for example, "VPN tunnel"). Deprecated in favor of the next_hop_type and next_hop_uri fields, not used in new tests. */
  nextHop?: string;
  /** Destination IP range of the route. */
  destIpRange?: string;
  /** Protocols of the route. POLICY_BASED routes only. */
  protocols?: Array<string>;
  /** Priority of the route. */
  priority?: number;
  /** For ADVERTISED dynamic routes, the URI of the Cloud Router that advertised the corresponding IP prefix. */
  advertisedRouteSourceRouterUri?: string;
  /** For ADVERTISED routes, the URI of their next hop, i.e. the URI of the hybrid endpoint (VPN tunnel, Interconnect attachment, NCC router appliance) the advertised prefix is advertised through, or URI of the source peered network. Deprecated in favor of the next_hop_uri field, not used in new tests. */
  advertisedRouteNextHopUri?: string;
}

export const RouteInfo: Schema.Schema<RouteInfo> = Schema.suspend(() => Schema.Struct({
  region: Schema.optional(Schema.String),
  nccHubUri: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  destPortRanges: Schema.optional(Schema.Array(Schema.String)),
  srcPortRanges: Schema.optional(Schema.Array(Schema.String)),
  nccHubRouteUri: Schema.optional(Schema.String),
  routeType: Schema.optional(Schema.String),
  srcIpRange: Schema.optional(Schema.String),
  instanceTags: Schema.optional(Schema.Array(Schema.String)),
  originatingRouteUri: Schema.optional(Schema.String),
  nccSpokeUri: Schema.optional(Schema.String),
  originatingRouteDisplayName: Schema.optional(Schema.String),
  nextHopNetworkUri: Schema.optional(Schema.String),
  routeScope: Schema.optional(Schema.String),
  nextHopType: Schema.optional(Schema.String),
  nextHopUri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  nextHop: Schema.optional(Schema.String),
  destIpRange: Schema.optional(Schema.String),
  protocols: Schema.optional(Schema.Array(Schema.String)),
  priority: Schema.optional(Schema.Number),
  advertisedRouteSourceRouterUri: Schema.optional(Schema.String),
  advertisedRouteNextHopUri: Schema.optional(Schema.String),
})).annotate({ identifier: "RouteInfo" }) as any as Schema.Schema<RouteInfo>;

export interface VpnTunnelInfo {
  /** URI of the VPN gateway at local end of the tunnel. */
  sourceGateway?: string;
  /** Local VPN gateway's IP address. */
  sourceGatewayIp?: string;
  /** URI of a VPN tunnel. */
  uri?: string;
  /** Name of a Google Cloud region where this VPN tunnel is configured. */
  region?: string;
  /** URI of a VPN gateway at remote end of the tunnel. */
  remoteGateway?: string;
  /** Name of a VPN tunnel. */
  displayName?: string;
  /** Remote VPN gateway's IP address. */
  remoteGatewayIp?: string;
  /** URI of a Compute Engine network where the VPN tunnel is configured. */
  networkUri?: string;
  /** Type of the routing policy. */
  routingType?: "ROUTING_TYPE_UNSPECIFIED" | "ROUTE_BASED" | "POLICY_BASED" | "DYNAMIC" | (string & {});
}

export const VpnTunnelInfo: Schema.Schema<VpnTunnelInfo> = Schema.suspend(() => Schema.Struct({
  sourceGateway: Schema.optional(Schema.String),
  sourceGatewayIp: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  remoteGateway: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  remoteGatewayIp: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  routingType: Schema.optional(Schema.String),
})).annotate({ identifier: "VpnTunnelInfo" }) as any as Schema.Schema<VpnTunnelInfo>;

export interface DeliverInfo {
  /** Recognized type of a Google Service the packet is delivered to (if applicable). */
  googleServiceType?: "GOOGLE_SERVICE_TYPE_UNSPECIFIED" | "IAP" | "GFE_PROXY_OR_HEALTH_CHECK_PROBER" | "CLOUD_DNS" | "PRIVATE_GOOGLE_ACCESS" | "SERVERLESS_VPC_ACCESS" | (string & {});
  /** IP address of the target (if applicable). */
  ipAddress?: string;
  /** Name of the Cloud Storage Bucket the packet is delivered to (if applicable). */
  storageBucket?: string;
  /** URI of the resource that the packet is delivered to. */
  resourceUri?: string;
  /** PSC Google API target the packet is delivered to (if applicable). */
  pscGoogleApiTarget?: string;
  /** Target type where the packet is delivered to. */
  target?: "TARGET_UNSPECIFIED" | "INSTANCE" | "INTERNET" | "GOOGLE_API" | "GKE_MASTER" | "CLOUD_SQL_INSTANCE" | "PSC_PUBLISHED_SERVICE" | "PSC_GOOGLE_API" | "PSC_VPC_SC" | "SERVERLESS_NEG" | "STORAGE_BUCKET" | "PRIVATE_NETWORK" | "CLOUD_FUNCTION" | "APP_ENGINE_VERSION" | "CLOUD_RUN_REVISION" | "GOOGLE_MANAGED_SERVICE" | "REDIS_INSTANCE" | "REDIS_CLUSTER" | "GKE_POD" | (string & {});
}

export const DeliverInfo: Schema.Schema<DeliverInfo> = Schema.suspend(() => Schema.Struct({
  googleServiceType: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  storageBucket: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  pscGoogleApiTarget: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliverInfo" }) as any as Schema.Schema<DeliverInfo>;

export interface ForwardingRuleInfo {
  /** Network URI. */
  networkUri?: string;
  /** URI of the PSC service attachment this forwarding rule targets (if applicable). */
  pscServiceAttachmentUri?: string;
  /** URI of the forwarding rule. */
  uri?: string;
  /** Name of the load balancer the forwarding rule belongs to. Empty for forwarding rules not related to load balancers (like PSC forwarding rules). */
  loadBalancerName?: string;
  /** Name of the forwarding rule. */
  displayName?: string;
  /** PSC Google API target this forwarding rule targets (if applicable). */
  pscGoogleApiTarget?: string;
  /** Region of the forwarding rule. Set only for regional forwarding rules. */
  region?: string;
  /** Protocol defined in the forwarding rule that matches the packet. */
  matchedProtocol?: string;
  /** Port range defined in the forwarding rule that matches the packet. */
  matchedPortRange?: string;
  /** VIP of the forwarding rule. */
  vip?: string;
  /** Target type of the forwarding rule. */
  target?: string;
}

export const ForwardingRuleInfo: Schema.Schema<ForwardingRuleInfo> = Schema.suspend(() => Schema.Struct({
  networkUri: Schema.optional(Schema.String),
  pscServiceAttachmentUri: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  loadBalancerName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  pscGoogleApiTarget: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  matchedProtocol: Schema.optional(Schema.String),
  matchedPortRange: Schema.optional(Schema.String),
  vip: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "ForwardingRuleInfo" }) as any as Schema.Schema<ForwardingRuleInfo>;

export interface StorageBucketInfo {
  /** Cloud Storage Bucket name. */
  bucket?: string;
}

export const StorageBucketInfo: Schema.Schema<StorageBucketInfo> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "StorageBucketInfo" }) as any as Schema.Schema<StorageBucketInfo>;

export interface VpnGatewayInfo {
  /** URI of a VPN gateway. */
  uri?: string;
  /** URI of a Compute Engine network where the VPN gateway is configured. */
  networkUri?: string;
  /** Name of a Google Cloud region where this VPN gateway is configured. */
  region?: string;
  /** IP address of the VPN gateway. */
  ipAddress?: string;
  /** Name of a VPN gateway. */
  displayName?: string;
  /** A VPN tunnel that is associated with this VPN gateway. There may be multiple VPN tunnels configured on a VPN gateway, and only the one relevant to the test is displayed. */
  vpnTunnelUri?: string;
}

export const VpnGatewayInfo: Schema.Schema<VpnGatewayInfo> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  vpnTunnelUri: Schema.optional(Schema.String),
})).annotate({ identifier: "VpnGatewayInfo" }) as any as Schema.Schema<VpnGatewayInfo>;

export interface GoogleServiceInfo {
  /** Recognized type of a Google Service. */
  googleServiceType?: "GOOGLE_SERVICE_TYPE_UNSPECIFIED" | "IAP" | "GFE_PROXY_OR_HEALTH_CHECK_PROBER" | "CLOUD_DNS" | "GOOGLE_API" | "GOOGLE_API_PSC" | "GOOGLE_API_VPC_SC" | "SERVERLESS_VPC_ACCESS" | (string & {});
  /** Source IP address. */
  sourceIp?: string;
}

export const GoogleServiceInfo: Schema.Schema<GoogleServiceInfo> = Schema.suspend(() => Schema.Struct({
  googleServiceType: Schema.optional(Schema.String),
  sourceIp: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleServiceInfo" }) as any as Schema.Schema<GoogleServiceInfo>;

export interface IpMasqueradingSkippedInfo {
  /** Reason why IP masquerading was not applied. */
  reason?: "REASON_UNSPECIFIED" | "DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE" | "DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE" | "DESTINATION_ON_SAME_NODE" | "DEFAULT_SNAT_DISABLED" | "NO_MASQUERADING_FOR_IPV6" | "POD_USES_NODE_NETWORK_NAMESPACE" | "NO_MASQUERADING_FOR_RETURN_PACKET" | (string & {});
  /** The matched non-masquerade IP range. Only set if reason is DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE or DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE. */
  nonMasqueradeRange?: string;
}

export const IpMasqueradingSkippedInfo: Schema.Schema<IpMasqueradingSkippedInfo> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  nonMasqueradeRange: Schema.optional(Schema.String),
})).annotate({ identifier: "IpMasqueradingSkippedInfo" }) as any as Schema.Schema<IpMasqueradingSkippedInfo>;

export interface InterconnectAttachmentInfo {
  /** The type of interconnect attachment this is. */
  type?: "TYPE_UNSPECIFIED" | "DEDICATED" | "PARTNER" | "PARTNER_PROVIDER" | "L2_DEDICATED" | (string & {});
  /** URI of the Cloud Router to be used for dynamic routing. */
  cloudRouterUri?: string;
  /** Name of a Google Cloud region where the Interconnect attachment is configured. */
  region?: string;
  /** Appliance IP address that was matched for L2_DEDICATED attachments. */
  l2AttachmentMatchedIpAddress?: string;
  /** URI of the Interconnect where the Interconnect attachment is configured. */
  interconnectUri?: string;
  /** URI of an Interconnect attachment. */
  uri?: string;
  /** Name of an Interconnect attachment. */
  displayName?: string;
}

export const InterconnectAttachmentInfo: Schema.Schema<InterconnectAttachmentInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  cloudRouterUri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  l2AttachmentMatchedIpAddress: Schema.optional(Schema.String),
  interconnectUri: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "InterconnectAttachmentInfo" }) as any as Schema.Schema<InterconnectAttachmentInfo>;

export interface AppEngineVersionInfo {
  /** Runtime of the App Engine version. */
  runtime?: string;
  /** URI of an App Engine version. */
  uri?: string;
  /** App Engine execution environment for a version. */
  environment?: string;
  /** Name of an App Engine version. */
  displayName?: string;
}

export const AppEngineVersionInfo: Schema.Schema<AppEngineVersionInfo> = Schema.suspend(() => Schema.Struct({
  runtime: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngineVersionInfo" }) as any as Schema.Schema<AppEngineVersionInfo>;

export interface DirectVpcEgressConnectionInfo {
  /** URI of direct access network. */
  networkUri?: string;
  /** Region in which the Direct VPC egress is deployed. */
  region?: string;
  /** URI of direct access subnetwork. */
  subnetworkUri?: string;
  /** Selected IP range. */
  selectedIpRange?: string;
  /** Selected starting IP address, from the selected IP range. */
  selectedIpAddress?: string;
}

export const DirectVpcEgressConnectionInfo: Schema.Schema<DirectVpcEgressConnectionInfo> = Schema.suspend(() => Schema.Struct({
  networkUri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  subnetworkUri: Schema.optional(Schema.String),
  selectedIpRange: Schema.optional(Schema.String),
  selectedIpAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectVpcEgressConnectionInfo" }) as any as Schema.Schema<DirectVpcEgressConnectionInfo>;

export interface HybridSubnetInfo {
  /** Name of a hybrid subnet. */
  displayName?: string;
  /** URI of a hybrid subnet. */
  uri?: string;
  /** Name of a Google Cloud region where the hybrid subnet is configured. */
  region?: string;
}

export const HybridSubnetInfo: Schema.Schema<HybridSubnetInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "HybridSubnetInfo" }) as any as Schema.Schema<HybridSubnetInfo>;

export interface CloudSQLInstanceInfo {
  /** External IP address of a Cloud SQL instance. */
  externalIp?: string;
  /** Internal IP address of a Cloud SQL instance. */
  internalIp?: string;
  /** URI of a Cloud SQL instance network or empty string if the instance does not have one. */
  networkUri?: string;
  /** Name of a Cloud SQL instance. */
  displayName?: string;
  /** Region in which the Cloud SQL instance is running. */
  region?: string;
  /** URI of a Cloud SQL instance. */
  uri?: string;
}

export const CloudSQLInstanceInfo: Schema.Schema<CloudSQLInstanceInfo> = Schema.suspend(() => Schema.Struct({
  externalIp: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
  networkUri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSQLInstanceInfo" }) as any as Schema.Schema<CloudSQLInstanceInfo>;

export interface NgfwPacketInspectionInfo {
  /** URI of the security profile group associated with this firewall packet inspection. */
  securityProfileGroupUri?: string;
}

export const NgfwPacketInspectionInfo: Schema.Schema<NgfwPacketInspectionInfo> = Schema.suspend(() => Schema.Struct({
  securityProfileGroupUri: Schema.optional(Schema.String),
})).annotate({ identifier: "NgfwPacketInspectionInfo" }) as any as Schema.Schema<NgfwPacketInspectionInfo>;

export interface GkePodInfo {
  /** URI of the network containing the GKE Pod. */
  networkUri?: string;
  /** IP address of a GKE Pod. If the Pod is dual-stack, this is the IP address relevant to the trace. */
  ipAddress?: string;
  /** URI of a GKE Pod. For Pods in regional Clusters, the URI format is: `projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` For Pods in zonal Clusters, the URI format is: `projects/{project}/zones/{zone}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` */
  podUri?: string;
}

export const GkePodInfo: Schema.Schema<GkePodInfo> = Schema.suspend(() => Schema.Struct({
  networkUri: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  podUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GkePodInfo" }) as any as Schema.Schema<GkePodInfo>;

export interface LoadBalancerBackend {
  /** State of the health check firewall configuration. */
  healthCheckFirewallState?: "HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED" | "CONFIGURED" | "MISCONFIGURED" | (string & {});
  /** A list of firewall rule URIs allowing probes from health check IP ranges. */
  healthCheckAllowingFirewallRules?: Array<string>;
  /** A list of firewall rule URIs blocking probes from health check IP ranges. */
  healthCheckBlockingFirewallRules?: Array<string>;
  /** URI of a Compute Engine instance or network endpoint. */
  uri?: string;
  /** Name of a Compute Engine instance or network endpoint. */
  displayName?: string;
}

export const LoadBalancerBackend: Schema.Schema<LoadBalancerBackend> = Schema.suspend(() => Schema.Struct({
  healthCheckFirewallState: Schema.optional(Schema.String),
  healthCheckAllowingFirewallRules: Schema.optional(Schema.Array(Schema.String)),
  healthCheckBlockingFirewallRules: Schema.optional(Schema.Array(Schema.String)),
  uri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "LoadBalancerBackend" }) as any as Schema.Schema<LoadBalancerBackend>;

export interface LoadBalancerInfo {
  /** Type of the load balancer. */
  loadBalancerType?: "LOAD_BALANCER_TYPE_UNSPECIFIED" | "INTERNAL_TCP_UDP" | "NETWORK_TCP_UDP" | "HTTP_PROXY" | "TCP_PROXY" | "SSL_PROXY" | (string & {});
  /** Type of load balancer's backend configuration. */
  backendType?: "BACKEND_TYPE_UNSPECIFIED" | "BACKEND_SERVICE" | "TARGET_POOL" | "TARGET_INSTANCE" | (string & {});
  /** URI of the health check for the load balancer. Deprecated and no longer populated as different load balancer backends might have different health checks. */
  healthCheckUri?: string;
  /** Backend configuration URI. */
  backendUri?: string;
  /** Information for the loadbalancer backends. */
  backends?: Array<LoadBalancerBackend>;
}

export const LoadBalancerInfo: Schema.Schema<LoadBalancerInfo> = Schema.suspend(() => Schema.Struct({
  loadBalancerType: Schema.optional(Schema.String),
  backendType: Schema.optional(Schema.String),
  healthCheckUri: Schema.optional(Schema.String),
  backendUri: Schema.optional(Schema.String),
  backends: Schema.optional(Schema.Array(LoadBalancerBackend)),
})).annotate({ identifier: "LoadBalancerInfo" }) as any as Schema.Schema<LoadBalancerInfo>;

export interface DropInfo {
  /** Destination IP address of the dropped packet (if relevant). */
  destinationIp?: string;
  /** Region of the dropped packet (if relevant). */
  region?: string;
  /** URI of the resource that caused the drop. */
  resourceUri?: string;
  /** Source IP address of the dropped packet (if relevant). */
  sourceIp?: string;
  /** Cause that the packet is dropped. */
  cause?: "CAUSE_UNSPECIFIED" | "UNKNOWN_EXTERNAL_ADDRESS" | "FOREIGN_IP_DISALLOWED" | "FIREWALL_RULE" | "NO_ROUTE" | "ROUTE_BLACKHOLE" | "ROUTE_WRONG_NETWORK" | "ROUTE_NEXT_HOP_IP_ADDRESS_NOT_RESOLVED" | "ROUTE_NEXT_HOP_RESOURCE_NOT_FOUND" | "ROUTE_NEXT_HOP_INSTANCE_WRONG_NETWORK" | "ROUTE_NEXT_HOP_INSTANCE_NON_PRIMARY_IP" | "ROUTE_NEXT_HOP_FORWARDING_RULE_IP_MISMATCH" | "ROUTE_NEXT_HOP_VPN_TUNNEL_NOT_ESTABLISHED" | "ROUTE_NEXT_HOP_FORWARDING_RULE_TYPE_INVALID" | "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV6_ADDRESS" | "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV4_ADDRESS" | "NO_ROUTE_FROM_EXTERNAL_IPV6_SOURCE_TO_PRIVATE_IPV6_ADDRESS" | "VPN_TUNNEL_LOCAL_SELECTOR_MISMATCH" | "VPN_TUNNEL_REMOTE_SELECTOR_MISMATCH" | "PRIVATE_TRAFFIC_TO_INTERNET" | "PRIVATE_GOOGLE_ACCESS_DISALLOWED" | "PRIVATE_GOOGLE_ACCESS_VIA_VPN_TUNNEL_UNSUPPORTED" | "NO_EXTERNAL_ADDRESS" | "UNKNOWN_INTERNAL_ADDRESS" | "FORWARDING_RULE_MISMATCH" | "FORWARDING_RULE_NO_INSTANCES" | "FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK" | "INGRESS_FIREWALL_TAGS_UNSUPPORTED_BY_DIRECT_VPC_EGRESS" | "INSTANCE_NOT_RUNNING" | "GKE_CLUSTER_NOT_RUNNING" | "GKE_POD_NOT_RUNNING" | "CLOUD_SQL_INSTANCE_NOT_RUNNING" | "REDIS_INSTANCE_NOT_RUNNING" | "REDIS_CLUSTER_NOT_RUNNING" | "TRAFFIC_TYPE_BLOCKED" | "GKE_MASTER_UNAUTHORIZED_ACCESS" | "CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS" | "DROPPED_INSIDE_GKE_SERVICE" | "DROPPED_INSIDE_CLOUD_SQL_SERVICE" | "GOOGLE_MANAGED_SERVICE_NO_PEERING" | "GOOGLE_MANAGED_SERVICE_NO_PSC_ENDPOINT" | "GKE_PSC_ENDPOINT_MISSING" | "CLOUD_SQL_INSTANCE_NO_IP_ADDRESS" | "GKE_CONTROL_PLANE_REGION_MISMATCH" | "PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION" | "GKE_CONTROL_PLANE_NO_ROUTE" | "CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC" | "PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION" | "CLOUD_SQL_INSTANCE_NO_ROUTE" | "CLOUD_SQL_CONNECTOR_REQUIRED" | "CLOUD_FUNCTION_NOT_ACTIVE" | "VPC_CONNECTOR_NOT_SET" | "VPC_CONNECTOR_NOT_RUNNING" | "VPC_CONNECTOR_SERVERLESS_TRAFFIC_BLOCKED" | "VPC_CONNECTOR_HEALTH_CHECK_TRAFFIC_BLOCKED" | "FORWARDING_RULE_REGION_MISMATCH" | "PSC_CONNECTION_NOT_ACCEPTED" | "PSC_ENDPOINT_ACCESSED_FROM_PEERED_NETWORK" | "PSC_NEG_PRODUCER_ENDPOINT_NO_GLOBAL_ACCESS" | "PSC_NEG_PRODUCER_FORWARDING_RULE_MULTIPLE_PORTS" | "CLOUD_SQL_PSC_NEG_UNSUPPORTED" | "NO_NAT_SUBNETS_FOR_PSC_SERVICE_ATTACHMENT" | "PSC_TRANSITIVITY_NOT_PROPAGATED" | "HYBRID_NEG_NON_DYNAMIC_ROUTE_MATCHED" | "HYBRID_NEG_NON_LOCAL_DYNAMIC_ROUTE_MATCHED" | "CLOUD_RUN_REVISION_NOT_READY" | "DROPPED_INSIDE_PSC_SERVICE_PRODUCER" | "LOAD_BALANCER_HAS_NO_PROXY_SUBNET" | "CLOUD_NAT_NO_ADDRESSES" | "ROUTING_LOOP" | "DROPPED_INSIDE_GOOGLE_MANAGED_SERVICE" | "LOAD_BALANCER_BACKEND_INVALID_NETWORK" | "BACKEND_SERVICE_NAMED_PORT_NOT_DEFINED" | "DESTINATION_IS_PRIVATE_NAT_IP_RANGE" | "DROPPED_INSIDE_REDIS_INSTANCE_SERVICE" | "REDIS_INSTANCE_UNSUPPORTED_PORT" | "REDIS_INSTANCE_CONNECTING_FROM_PUPI_ADDRESS" | "REDIS_INSTANCE_NO_ROUTE_TO_DESTINATION_NETWORK" | "REDIS_INSTANCE_NO_EXTERNAL_IP" | "REDIS_INSTANCE_UNSUPPORTED_PROTOCOL" | "DROPPED_INSIDE_REDIS_CLUSTER_SERVICE" | "REDIS_CLUSTER_UNSUPPORTED_PORT" | "REDIS_CLUSTER_NO_EXTERNAL_IP" | "REDIS_CLUSTER_UNSUPPORTED_PROTOCOL" | "NO_ADVERTISED_ROUTE_TO_GCP_DESTINATION" | "NO_TRAFFIC_SELECTOR_TO_GCP_DESTINATION" | "NO_KNOWN_ROUTE_FROM_PEERED_NETWORK_TO_DESTINATION" | "PRIVATE_NAT_TO_PSC_ENDPOINT_UNSUPPORTED" | "PSC_PORT_MAPPING_PORT_MISMATCH" | "PSC_PORT_MAPPING_WITHOUT_PSC_CONNECTION_UNSUPPORTED" | "UNSUPPORTED_ROUTE_MATCHED_FOR_NAT64_DESTINATION" | "TRAFFIC_FROM_HYBRID_ENDPOINT_TO_INTERNET_DISALLOWED" | "NO_MATCHING_NAT64_GATEWAY" | "NO_CONFIGURED_PRIVATE_NAT64_RULE" | "LOAD_BALANCER_BACKEND_IP_VERSION_MISMATCH" | "NO_KNOWN_ROUTE_FROM_NCC_NETWORK_TO_DESTINATION" | "CLOUD_NAT_PROTOCOL_UNSUPPORTED" | "L2_INTERCONNECT_UNSUPPORTED_PROTOCOL" | "L2_INTERCONNECT_UNSUPPORTED_PORT" | "L2_INTERCONNECT_DESTINATION_IP_MISMATCH" | "NCC_ROUTE_WITHIN_HYBRID_SUBNET_UNSUPPORTED" | "HYBRID_SUBNET_REGION_MISMATCH" | "HYBRID_SUBNET_NO_ROUTE" | "NO_VALID_ROUTE_FROM_GOOGLE_MANAGED_NETWORK_TO_DESTINATION" | (string & {});
  /** Geolocation (region code) of the destination IP address (if relevant). */
  destinationGeolocationCode?: string;
  /** Geolocation (region code) of the source IP address (if relevant). */
  sourceGeolocationCode?: string;
}

export const DropInfo: Schema.Schema<DropInfo> = Schema.suspend(() => Schema.Struct({
  destinationIp: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  sourceIp: Schema.optional(Schema.String),
  cause: Schema.optional(Schema.String),
  destinationGeolocationCode: Schema.optional(Schema.String),
  sourceGeolocationCode: Schema.optional(Schema.String),
})).annotate({ identifier: "DropInfo" }) as any as Schema.Schema<DropInfo>;

export interface GKEMasterInfo {
  /** URI of a GKE cluster network. */
  clusterNetworkUri?: string;
  /** Internal IP address of a GKE cluster control plane. */
  internalIp?: string;
  /** External IP address of a GKE cluster control plane. */
  externalIp?: string;
  /** DNS endpoint of a GKE cluster control plane. */
  dnsEndpoint?: string;
  /** URI of a GKE cluster. */
  clusterUri?: string;
}

export const GKEMasterInfo: Schema.Schema<GKEMasterInfo> = Schema.suspend(() => Schema.Struct({
  clusterNetworkUri: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
  externalIp: Schema.optional(Schema.String),
  dnsEndpoint: Schema.optional(Schema.String),
  clusterUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GKEMasterInfo" }) as any as Schema.Schema<GKEMasterInfo>;

export interface ServerlessExternalConnectionInfo {
  /** Selected starting IP address, from the Google dynamic address pool. */
  selectedIpAddress?: string;
}

export const ServerlessExternalConnectionInfo: Schema.Schema<ServerlessExternalConnectionInfo> = Schema.suspend(() => Schema.Struct({
  selectedIpAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "ServerlessExternalConnectionInfo" }) as any as Schema.Schema<ServerlessExternalConnectionInfo>;

export interface ServerlessNegInfo {
  /** URI of the serverless network endpoint group. */
  negUri?: string;
}

export const ServerlessNegInfo: Schema.Schema<ServerlessNegInfo> = Schema.suspend(() => Schema.Struct({
  negUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ServerlessNegInfo" }) as any as Schema.Schema<ServerlessNegInfo>;

export interface Step {
  /** Display information of a Redis Instance. */
  redisInstance?: RedisInstanceInfo;
  /** Display information of a Redis Cluster. */
  redisCluster?: RedisClusterInfo;
  /** Display information of a Cloud Run revision. */
  cloudRunRevision?: CloudRunRevisionInfo;
  /** Display information of the final state "abort" and reason. */
  abort?: AbortInfo;
  /** Display information of a NAT. */
  nat?: NatInfo;
  /** Display information of a Google Cloud network. */
  network?: NetworkInfo;
  /** Display information of a VPC connector. */
  vpcConnector?: VpcConnectorInfo;
  /** Display information of a Compute Engine instance. */
  instance?: InstanceInfo;
  /** Display information of a Cloud Function. */
  cloudFunction?: CloudFunctionInfo;
  /** Display information of a ProxyConnection. */
  proxyConnection?: ProxyConnectionInfo;
  /** Display information of a specific load balancer backend. */
  loadBalancerBackendInfo?: LoadBalancerBackendInfo;
  /** Display information of a Compute Engine route. */
  route?: RouteInfo;
  /** Display information of a Compute Engine firewall rule. */
  firewall?: FirewallInfo;
  /** Display information of a Compute Engine VPN tunnel. */
  vpnTunnel?: VpnTunnelInfo;
  /** Display information of the final state "deliver" and reason. */
  deliver?: DeliverInfo;
  /** Display information of a Compute Engine forwarding rule. */
  forwardingRule?: ForwardingRuleInfo;
  /** Display information of a Storage Bucket. Used only for return traces. */
  storageBucket?: StorageBucketInfo;
  /** Display information of a Compute Engine VPN gateway. */
  vpnGateway?: VpnGatewayInfo;
  /** Each step is in one of the pre-defined states. */
  state?: "STATE_UNSPECIFIED" | "START_FROM_INSTANCE" | "START_FROM_INTERNET" | "START_FROM_GOOGLE_SERVICE" | "START_FROM_PRIVATE_NETWORK" | "START_FROM_GKE_MASTER" | "START_FROM_CLOUD_SQL_INSTANCE" | "START_FROM_GKE_POD" | "START_FROM_REDIS_INSTANCE" | "START_FROM_REDIS_CLUSTER" | "START_FROM_CLOUD_FUNCTION" | "START_FROM_APP_ENGINE_VERSION" | "START_FROM_CLOUD_RUN_REVISION" | "START_FROM_STORAGE_BUCKET" | "START_FROM_PSC_PUBLISHED_SERVICE" | "START_FROM_SERVERLESS_NEG" | "APPLY_INGRESS_FIREWALL_RULE" | "APPLY_EGRESS_FIREWALL_RULE" | "APPLY_ROUTE" | "APPLY_FORWARDING_RULE" | "ANALYZE_LOAD_BALANCER_BACKEND" | "SPOOFING_APPROVED" | "ARRIVE_AT_INSTANCE" | "ARRIVE_AT_INTERNAL_LOAD_BALANCER" | "ARRIVE_AT_EXTERNAL_LOAD_BALANCER" | "ARRIVE_AT_HYBRID_SUBNET" | "ARRIVE_AT_VPN_GATEWAY" | "ARRIVE_AT_VPN_TUNNEL" | "ARRIVE_AT_INTERCONNECT_ATTACHMENT" | "ARRIVE_AT_VPC_CONNECTOR" | "DIRECT_VPC_EGRESS_CONNECTION" | "SERVERLESS_EXTERNAL_CONNECTION" | "NGFW_PACKET_INSPECTION" | "NAT" | "SKIP_GKE_POD_IP_MASQUERADING" | "PROXY_CONNECTION" | "DELIVER" | "DROP" | "FORWARD" | "ABORT" | "VIEWER_PERMISSION_MISSING" | (string & {});
  /** Display information of a Google service */
  googleService?: GoogleServiceInfo;
  /** Display information of the source and destination under analysis. The endpoint information in an intermediate state may differ with the initial input, as it might be modified by state like NAT, or Connection Proxy. */
  endpoint?: EndpointInfo;
  /** Display information of the reason why GKE Pod IP masquerading was skipped. */
  ipMasqueradingSkipped?: IpMasqueradingSkippedInfo;
  /** Display information of the final state "forward" and reason. */
  forward?: ForwardInfo;
  /** Display information of an interconnect attachment. */
  interconnectAttachment?: InterconnectAttachmentInfo;
  /** Display information of an App Engine service version. */
  appEngineVersion?: AppEngineVersionInfo;
  /** Display information of a serverless direct VPC egress connection. */
  directVpcEgressConnection?: DirectVpcEgressConnectionInfo;
  /** Display information of a hybrid subnet. */
  hybridSubnet?: HybridSubnetInfo;
  /** Project ID that contains the configuration this step is validating. */
  projectId?: string;
  /** Display information of a Cloud SQL instance. */
  cloudSqlInstance?: CloudSQLInstanceInfo;
  /** Display information of a layer 7 packet inspection by the firewall. */
  ngfwPacketInspection?: NgfwPacketInspectionInfo;
  /** Display information of a Google Kubernetes Engine Pod. */
  gkePod?: GkePodInfo;
  /** Display information of the load balancers. Deprecated in favor of the `load_balancer_backend_info` field, not used in new tests. */
  loadBalancer?: LoadBalancerInfo;
  /** Display information of the final state "drop" and reason. */
  drop?: DropInfo;
  /** Display information of a Google Kubernetes Engine cluster master. */
  gkeMaster?: GKEMasterInfo;
  /** Display information of a serverless public (external) connection. */
  serverlessExternalConnection?: ServerlessExternalConnectionInfo;
  /** This is a step that leads to the final state Drop. */
  causesDrop?: boolean;
  /** Display information of a Serverless network endpoint group backend. Used only for return traces. */
  serverlessNeg?: ServerlessNegInfo;
  /** A description of the step. Usually this is a summary of the state. */
  description?: string;
}

export const Step: Schema.Schema<Step> = Schema.suspend(() => Schema.Struct({
  redisInstance: Schema.optional(RedisInstanceInfo),
  redisCluster: Schema.optional(RedisClusterInfo),
  cloudRunRevision: Schema.optional(CloudRunRevisionInfo),
  abort: Schema.optional(AbortInfo),
  nat: Schema.optional(NatInfo),
  network: Schema.optional(NetworkInfo),
  vpcConnector: Schema.optional(VpcConnectorInfo),
  instance: Schema.optional(InstanceInfo),
  cloudFunction: Schema.optional(CloudFunctionInfo),
  proxyConnection: Schema.optional(ProxyConnectionInfo),
  loadBalancerBackendInfo: Schema.optional(LoadBalancerBackendInfo),
  route: Schema.optional(RouteInfo),
  firewall: Schema.optional(FirewallInfo),
  vpnTunnel: Schema.optional(VpnTunnelInfo),
  deliver: Schema.optional(DeliverInfo),
  forwardingRule: Schema.optional(ForwardingRuleInfo),
  storageBucket: Schema.optional(StorageBucketInfo),
  vpnGateway: Schema.optional(VpnGatewayInfo),
  state: Schema.optional(Schema.String),
  googleService: Schema.optional(GoogleServiceInfo),
  endpoint: Schema.optional(EndpointInfo),
  ipMasqueradingSkipped: Schema.optional(IpMasqueradingSkippedInfo),
  forward: Schema.optional(ForwardInfo),
  interconnectAttachment: Schema.optional(InterconnectAttachmentInfo),
  appEngineVersion: Schema.optional(AppEngineVersionInfo),
  directVpcEgressConnection: Schema.optional(DirectVpcEgressConnectionInfo),
  hybridSubnet: Schema.optional(HybridSubnetInfo),
  projectId: Schema.optional(Schema.String),
  cloudSqlInstance: Schema.optional(CloudSQLInstanceInfo),
  ngfwPacketInspection: Schema.optional(NgfwPacketInspectionInfo),
  gkePod: Schema.optional(GkePodInfo),
  loadBalancer: Schema.optional(LoadBalancerInfo),
  drop: Schema.optional(DropInfo),
  gkeMaster: Schema.optional(GKEMasterInfo),
  serverlessExternalConnection: Schema.optional(ServerlessExternalConnectionInfo),
  causesDrop: Schema.optional(Schema.Boolean),
  serverlessNeg: Schema.optional(ServerlessNegInfo),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Step" }) as any as Schema.Schema<Step>;

export interface Trace {
  /** Derived from the source and destination endpoints definition specified by user request, and validated by the data plane model. If there are multiple traces starting from different source locations, then the endpoint_info may be different between traces. */
  endpointInfo?: EndpointInfo;
  /** A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them. */
  steps?: Array<Step>;
  /** ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace. */
  forwardTraceId?: number;
}

export const Trace: Schema.Schema<Trace> = Schema.suspend(() => Schema.Struct({
  endpointInfo: Schema.optional(EndpointInfo),
  steps: Schema.optional(Schema.Array(Step)),
  forwardTraceId: Schema.optional(Schema.Number),
})).annotate({ identifier: "Trace" }) as any as Schema.Schema<Trace>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface ReachabilityDetails {
  /** Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends. */
  traces?: Array<Trace>;
  /** The time of the configuration analysis. */
  verifyTime?: string;
  /** The details of a failure or a cancellation of reachability analysis. */
  error?: Status;
  /** The overall result of the test's configuration analysis. */
  result?: "RESULT_UNSPECIFIED" | "REACHABLE" | "UNREACHABLE" | "AMBIGUOUS" | "UNDETERMINED" | (string & {});
}

export const ReachabilityDetails: Schema.Schema<ReachabilityDetails> = Schema.suspend(() => Schema.Struct({
  traces: Schema.optional(Schema.Array(Trace)),
  verifyTime: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  result: Schema.optional(Schema.String),
})).annotate({ identifier: "ReachabilityDetails" }) as any as Schema.Schema<ReachabilityDetails>;

export interface CloudRunRevisionEndpoint {
  /** Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service} */
  serviceUri?: string;
  /** A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision} */
  uri?: string;
}

export const CloudRunRevisionEndpoint: Schema.Schema<CloudRunRevisionEndpoint> = Schema.suspend(() => Schema.Struct({
  serviceUri: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRunRevisionEndpoint" }) as any as Schema.Schema<CloudRunRevisionEndpoint>;

export interface CloudFunctionEndpoint {
  /** A [Cloud Function](https://cloud.google.com/functions) name. */
  uri?: string;
}

export const CloudFunctionEndpoint: Schema.Schema<CloudFunctionEndpoint> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudFunctionEndpoint" }) as any as Schema.Schema<CloudFunctionEndpoint>;

export interface Endpoint {
  /** Output only. Type of the load balancer the forwarding rule points to. */
  loadBalancerType?: "LOAD_BALANCER_TYPE_UNSPECIFIED" | "HTTPS_ADVANCED_LOAD_BALANCER" | "HTTPS_LOAD_BALANCER" | "REGIONAL_HTTPS_LOAD_BALANCER" | "INTERNAL_HTTPS_LOAD_BALANCER" | "SSL_PROXY_LOAD_BALANCER" | "TCP_PROXY_LOAD_BALANCER" | "INTERNAL_TCP_PROXY_LOAD_BALANCER" | "NETWORK_LOAD_BALANCER" | "LEGACY_NETWORK_LOAD_BALANCER" | "TCP_UDP_INTERNAL_LOAD_BALANCER" | (string & {});
  /** For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints. */
  projectId?: string;
  /** A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint. */
  redisCluster?: string;
  /** Output only. Specifies the type of the target of the forwarding rule. */
  forwardingRuleTarget?: "FORWARDING_RULE_TARGET_UNSPECIFIED" | "INSTANCE" | "LOAD_BALANCER" | "VPN_GATEWAY" | "PSC" | (string & {});
  /** A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) Applicable only to source endpoint. */
  cloudRunRevision?: CloudRunRevisionEndpoint;
  /** A [Cloud SQL](https://cloud.google.com/sql) instance URI. */
  cloudSqlInstance?: string;
  /** A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint. */
  redisInstance?: string;
  /** An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions). Applicable only to source endpoint. */
  appEngineVersion?: AppEngineVersionEndpoint;
  /** A [Cloud Function](https://cloud.google.com/functions). Applicable only to source endpoint. */
  cloudFunction?: CloudFunctionEndpoint;
  /** The IP address of the endpoint, which can be an external or internal IP. */
  ipAddress?: string;
  /** For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints. */
  networkType?: "NETWORK_TYPE_UNSPECIFIED" | "GCP_NETWORK" | "NON_GCP_NETWORK" | "INTERNET" | (string & {});
  /** A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI. */
  gkePod?: string;
  /** A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). */
  gkeMasterCluster?: string;
  /** A Compute Engine instance URI. */
  instance?: string;
  /** The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP. */
  port?: number;
  /** DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint. */
  fqdn?: string;
  /** Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers. */
  loadBalancerId?: string;
  /** A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint. */
  network?: string;
  /** A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}` */
  forwardingRule?: string;
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  loadBalancerType: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  redisCluster: Schema.optional(Schema.String),
  forwardingRuleTarget: Schema.optional(Schema.String),
  cloudRunRevision: Schema.optional(CloudRunRevisionEndpoint),
  cloudSqlInstance: Schema.optional(Schema.String),
  redisInstance: Schema.optional(Schema.String),
  appEngineVersion: Schema.optional(AppEngineVersionEndpoint),
  cloudFunction: Schema.optional(CloudFunctionEndpoint),
  ipAddress: Schema.optional(Schema.String),
  networkType: Schema.optional(Schema.String),
  gkePod: Schema.optional(Schema.String),
  gkeMasterCluster: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  fqdn: Schema.optional(Schema.String),
  loadBalancerId: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  forwardingRule: Schema.optional(Schema.String),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface EdgeLocation {
  /** Name of the metropolitan area. */
  metropolitanArea?: string;
}

export const EdgeLocation: Schema.Schema<EdgeLocation> = Schema.suspend(() => Schema.Struct({
  metropolitanArea: Schema.optional(Schema.String),
})).annotate({ identifier: "EdgeLocation" }) as any as Schema.Schema<EdgeLocation>;

export interface SingleEdgeResponse {
  /** Router name in the format '{router}.{metroshard}'. For example: pf01.aaa01, pr02.aaa01. */
  destinationRouter?: string;
  /** The overall result of active probing for this egress device. */
  result?: "PROBING_RESULT_UNSPECIFIED" | "REACHABLE" | "UNREACHABLE" | "REACHABILITY_INCONSISTENT" | "UNDETERMINED" | (string & {});
  /** Number of probes that reached the destination. */
  successfulProbeCount?: number;
  /** Latency as measured by active probing in one direction: from the source to the destination endpoint. */
  probingLatency?: LatencyDistribution;
  /** The EdgeLocation from which a packet, destined to the internet, will egress the Google network. This will only be populated for a connectivity test which has an internet destination address. The absence of this field *must not* be used as an indication that the destination is part of the Google network. */
  destinationEgressLocation?: EdgeLocation;
  /** Number of probes sent. */
  sentProbeCount?: number;
}

export const SingleEdgeResponse: Schema.Schema<SingleEdgeResponse> = Schema.suspend(() => Schema.Struct({
  destinationRouter: Schema.optional(Schema.String),
  result: Schema.optional(Schema.String),
  successfulProbeCount: Schema.optional(Schema.Number),
  probingLatency: Schema.optional(LatencyDistribution),
  destinationEgressLocation: Schema.optional(EdgeLocation),
  sentProbeCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "SingleEdgeResponse" }) as any as Schema.Schema<SingleEdgeResponse>;

export interface ProbingDetails {
  /** Number of probes sent. */
  sentProbeCount?: number;
  /** Latency as measured by active probing in one direction: from the source to the destination endpoint. */
  probingLatency?: LatencyDistribution;
  /** The time that reachability was assessed through active probing. */
  verifyTime?: string;
  /** The source and destination endpoints derived from the test input and used for active probing. */
  endpointInfo?: EndpointInfo;
  /** Details about an internal failure or the cancellation of active probing. */
  error?: Status;
  /** The reason probing was aborted. */
  abortCause?: "PROBING_ABORT_CAUSE_UNSPECIFIED" | "PERMISSION_DENIED" | "NO_SOURCE_LOCATION" | (string & {});
  /** The EdgeLocation from which a packet, destined to the internet, will egress the Google network. This will only be populated for a connectivity test which has an internet destination address. The absence of this field *must not* be used as an indication that the destination is part of the Google network. */
  destinationEgressLocation?: EdgeLocation;
  /** Probing results for all edge devices. */
  edgeResponses?: Array<SingleEdgeResponse>;
  /** Whether all relevant edge devices were probed. */
  probedAllDevices?: boolean;
  /** The overall result of active probing. */
  result?: "PROBING_RESULT_UNSPECIFIED" | "REACHABLE" | "UNREACHABLE" | "REACHABILITY_INCONSISTENT" | "UNDETERMINED" | (string & {});
  /** Number of probes that reached the destination. */
  successfulProbeCount?: number;
}

export const ProbingDetails: Schema.Schema<ProbingDetails> = Schema.suspend(() => Schema.Struct({
  sentProbeCount: Schema.optional(Schema.Number),
  probingLatency: Schema.optional(LatencyDistribution),
  verifyTime: Schema.optional(Schema.String),
  endpointInfo: Schema.optional(EndpointInfo),
  error: Schema.optional(Status),
  abortCause: Schema.optional(Schema.String),
  destinationEgressLocation: Schema.optional(EdgeLocation),
  edgeResponses: Schema.optional(Schema.Array(SingleEdgeResponse)),
  probedAllDevices: Schema.optional(Schema.Boolean),
  result: Schema.optional(Schema.String),
  successfulProbeCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProbingDetails" }) as any as Schema.Schema<ProbingDetails>;

export interface ConnectivityTest {
  /** The user-supplied description of the Connectivity Test. Maximum of 512 characters. */
  description?: string;
  /** Output only. The time the test was created. */
  createTime?: string;
  /** Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` */
  name?: string;
  /** Output only. The reachability details of this test from the latest run. The details are updated when creating a new test, updating an existing test, or triggering a one-time rerun of an existing test. */
  reachabilityDetails?: ReachabilityDetails;
  /** Whether run analysis for the return path from destination to source. Default value is false. */
  roundTrip?: boolean;
  /** IP Protocol of the test. When not provided, "TCP" is assumed. */
  protocol?: string;
  /** Required. Source specification of the Connectivity Test. You can use a combination of source IP address, URI of a supported endpoint, project ID, or VPC network to identify the source location. Reachability analysis might proceed even if the source location is ambiguous. However, the test result might include endpoints or use a source that you don't intend to test. */
  source?: Endpoint;
  /** Resource labels to represent user-provided metadata. */
  labels?: Record<string, string>;
  /** Output only. The reachability details of this test from the latest run for the return path. The details are updated when creating a new test, updating an existing test, or triggering a one-time rerun of an existing test. */
  returnReachabilityDetails?: ReachabilityDetails;
  /** Output only. The probing details of this test from the latest run, present for applicable tests only. The details are updated when creating a new test, updating an existing test, or triggering a one-time rerun of an existing test. */
  probingDetails?: ProbingDetails;
  /** Other projects that may be relevant for reachability analysis. This is applicable to scenarios where a test can cross project boundaries. */
  relatedProjects?: Array<string>;
  /** Whether the analysis should skip firewall checking. Default value is false. */
  bypassFirewallChecks?: boolean;
  /** Output only. The display name of a Connectivity Test. */
  displayName?: string;
  /** Required. Destination specification of the Connectivity Test. You can use a combination of destination IP address, URI of a supported endpoint, project ID, or VPC network to identify the destination location. Reachability analysis proceeds even if the destination location is ambiguous. However, the test result might include endpoints or use a destination that you don't intend to test. */
  destination?: Endpoint;
  /** Output only. The time the test's configuration was updated. */
  updateTime?: string;
}

export const ConnectivityTest: Schema.Schema<ConnectivityTest> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  reachabilityDetails: Schema.optional(ReachabilityDetails),
  roundTrip: Schema.optional(Schema.Boolean),
  protocol: Schema.optional(Schema.String),
  source: Schema.optional(Endpoint),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  returnReachabilityDetails: Schema.optional(ReachabilityDetails),
  probingDetails: Schema.optional(ProbingDetails),
  relatedProjects: Schema.optional(Schema.Array(Schema.String)),
  bypassFirewallChecks: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  destination: Schema.optional(Endpoint),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectivityTest" }) as any as Schema.Schema<ConnectivityTest>;

export interface Operation {
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface VpcFlowLogsConfig {
  /** Optional. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default value is INCLUDE_ALL_METADATA. */
  metadata?: "METADATA_UNSPECIFIED" | "INCLUDE_ALL_METADATA" | "EXCLUDE_ALL_METADATA" | "CUSTOM_METADATA" | (string & {});
  /** Traffic will be logged from VMs within the subnetwork. Format: projects/{project_id}/regions/{region}/subnetworks/{name} */
  subnet?: string;
  /** Optional. The user-supplied description of the VPC Flow Logs configuration. Maximum of 512 characters. */
  description?: string;
  /** Output only. The time the config was created. */
  createTime?: string;
  /** Traffic will be logged from VMs, VPN tunnels and Interconnect Attachments within the network. Format: projects/{project_id}/global/networks/{name} */
  network?: string;
  /** Output only. The time the config was updated. */
  updateTime?: string;
  /** Optional. Custom metadata fields to include in the reported VPC flow logs. Can only be specified if "metadata" was set to CUSTOM_METADATA. */
  metadataFields?: Array<string>;
  /** Optional. The state of the VPC Flow Log configuration. Default value is ENABLED. When creating a new configuration, it must be enabled. Setting state=DISABLED will pause the log generation for this config. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name} */
  vpnTunnel?: string;
  /** Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name?: string;
  /** Optional. Determines whether to include cross project annotations in the logs. This field is available only for organization configurations. If not specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED. */
  crossProjectMetadata?: "CROSS_PROJECT_METADATA_UNSPECIFIED" | "CROSS_PROJECT_METADATA_ENABLED" | "CROSS_PROJECT_METADATA_DISABLED" | (string & {});
  /** Output only. Describes the state of the configured target resource for diagnostic purposes. */
  targetResourceState?: "TARGET_RESOURCE_STATE_UNSPECIFIED" | "TARGET_RESOURCE_EXISTS" | "TARGET_RESOURCE_DOES_NOT_EXIST" | (string & {});
  /** Optional. Export filter used to define which VPC Flow Logs should be logged. */
  filterExpr?: string;
  /** Optional. The aggregation interval for the logs. Default value is INTERVAL_5_SEC. */
  aggregationInterval?: "AGGREGATION_INTERVAL_UNSPECIFIED" | "INTERVAL_5_SEC" | "INTERVAL_30_SEC" | "INTERVAL_1_MIN" | "INTERVAL_5_MIN" | "INTERVAL_10_MIN" | "INTERVAL_15_MIN" | (string & {});
  /** Traffic will be logged from the Interconnect Attachment. Format: projects/{project_id}/regions/{region}/interconnectAttachments/{name} */
  interconnectAttachment?: string;
  /** Optional. The value of the field must be in (0, 1]. The sampling rate of VPC Flow Logs where 1.0 means all collected logs are reported. Setting the sampling rate to 0.0 is not allowed. If you want to disable VPC Flow Logs, use the state field instead. Default value is 1.0. */
  flowSampling?: number;
  /** Optional. Resource labels to represent user-provided metadata. */
  labels?: Record<string, string>;
}

export const VpcFlowLogsConfig: Schema.Schema<VpcFlowLogsConfig> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.String),
  subnet: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  metadataFields: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
  vpnTunnel: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  crossProjectMetadata: Schema.optional(Schema.String),
  targetResourceState: Schema.optional(Schema.String),
  filterExpr: Schema.optional(Schema.String),
  aggregationInterval: Schema.optional(Schema.String),
  interconnectAttachment: Schema.optional(Schema.String),
  flowSampling: Schema.optional(Schema.Number),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "VpcFlowLogsConfig" }) as any as Schema.Schema<VpcFlowLogsConfig>;

export interface ListVpcFlowLogsConfigsResponse {
  /** Locations that could not be reached (when querying all locations with `-`). */
  unreachable?: Array<string>;
  /** List of VPC Flow Log configurations. */
  vpcFlowLogsConfigs?: Array<VpcFlowLogsConfig>;
  /** Page token to fetch the next set of configurations. */
  nextPageToken?: string;
}

export const ListVpcFlowLogsConfigsResponse: Schema.Schema<ListVpcFlowLogsConfigsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  vpcFlowLogsConfigs: Schema.optional(Schema.Array(VpcFlowLogsConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVpcFlowLogsConfigsResponse" }) as any as Schema.Schema<ListVpcFlowLogsConfigsResponse>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

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
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
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

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ShowEffectiveFlowLogsConfigsResponse {
  /** Page token to fetch the next set of configurations. */
  nextPageToken?: string;
  /** Locations that could not be reached (when querying all locations with `-`). */
  unreachable?: Array<string>;
  /** List of Effective Vpc Flow Logs configurations. */
  effectiveFlowLogsConfigs?: Array<EffectiveVpcFlowLogsConfig>;
}

export const ShowEffectiveFlowLogsConfigsResponse: Schema.Schema<ShowEffectiveFlowLogsConfigsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  effectiveFlowLogsConfigs: Schema.optional(Schema.Array(EffectiveVpcFlowLogsConfig)),
})).annotate({ identifier: "ShowEffectiveFlowLogsConfigsResponse" }) as any as Schema.Schema<ShowEffectiveFlowLogsConfigsResponse>;

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

export interface QueryOrgVpcFlowLogsConfigsResponse {
  /** List of VPC Flow Log configurations. */
  vpcFlowLogsConfigs?: Array<VpcFlowLogsConfig>;
  /** Locations that could not be reached (when querying all locations with `-`). */
  unreachable?: Array<string>;
  /** Page token to fetch the next set of configurations. */
  nextPageToken?: string;
}

export const QueryOrgVpcFlowLogsConfigsResponse: Schema.Schema<QueryOrgVpcFlowLogsConfigsResponse> = Schema.suspend(() => Schema.Struct({
  vpcFlowLogsConfigs: Schema.optional(Schema.Array(VpcFlowLogsConfig)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryOrgVpcFlowLogsConfigsResponse" }) as any as Schema.Schema<QueryOrgVpcFlowLogsConfigsResponse>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface RerunConnectivityTestRequest {
}

export const RerunConnectivityTestRequest: Schema.Schema<RerunConnectivityTestRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RerunConnectivityTestRequest" }) as any as Schema.Schema<RerunConnectivityTestRequest>;

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

export interface ListConnectivityTestsResponse {
  /** List of Connectivity Tests. */
  resources?: Array<ConnectivityTest>;
  /** Page token to fetch the next set of Connectivity Tests. */
  nextPageToken?: string;
  /** Locations that could not be reached (when querying all locations with `-`). */
  unreachable?: Array<string>;
}

export const ListConnectivityTestsResponse: Schema.Schema<ListConnectivityTestsResponse> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(ConnectivityTest)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConnectivityTestsResponse" }) as any as Schema.Schema<ListConnectivityTestsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface OperationMetadata {
  /** The time the operation finished running. */
  endTime?: string;
  /** The time the operation was created. */
  createTime?: string;
  /** Specifies if cancellation was requested for the operation. */
  cancelRequested?: boolean;
  /** Target of the operation - for example projects/project-1/locations/global/connectivityTests/test-1 */
  target?: string;
  /** API version. */
  apiVersion?: string;
  /** Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  target: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

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

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
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

/** Gets the details of a specific Connectivity Test. */
export interface GetProjectsLocationsGlobalConnectivityTestsRequest {
  /** Required. `ConnectivityTest` resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` */
  name: string;
}

export const GetProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalConnectivityTestsRequest>;

export type GetProjectsLocationsGlobalConnectivityTestsResponse = ConnectivityTest;
export const GetProjectsLocationsGlobalConnectivityTestsResponse = ConnectivityTest;

export type GetProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const getProjectsLocationsGlobalConnectivityTests: API.OperationMethod<GetProjectsLocationsGlobalConnectivityTestsRequest, GetProjectsLocationsGlobalConnectivityTestsResponse, GetProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalConnectivityTestsRequest,
  output: GetProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGlobalConnectivityTestsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlobalConnectivityTestsRequest>;

export type TestIamPermissionsProjectsLocationsGlobalConnectivityTestsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlobalConnectivityTestsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlobalConnectivityTests: API.OperationMethod<TestIamPermissionsProjectsLocationsGlobalConnectivityTestsRequest, TestIamPermissionsProjectsLocationsGlobalConnectivityTestsResponse, TestIamPermissionsProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlobalConnectivityTestsRequest,
  output: TestIamPermissionsProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Creates a new Connectivity Test. After you create a test, the reachability analysis is performed as part of the long running operation, which completes when the analysis completes. If the endpoint specifications in `ConnectivityTest` are invalid (for example, containing non-existent resources in the network, or you don't have read permissions to the network configurations of listed projects), then the reachability result returns a value of `UNKNOWN`. If the endpoint specifications in `ConnectivityTest` are incomplete, the reachability result returns a value of AMBIGUOUS. For more information, see the Connectivity Test documentation. */
export interface CreateProjectsLocationsGlobalConnectivityTestsRequest {
  /** Required. The parent resource of the Connectivity Test to create: `projects/{project_id}/locations/global` */
  parent: string;
  /** Required. The logical name of the Connectivity Test in your project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project */
  testId?: string;
  /** Request body */
  body?: ConnectivityTest;
}

export const CreateProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  testId: Schema.optional(Schema.String).pipe(T.HttpQuery("testId")),
  body: Schema.optional(ConnectivityTest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/connectivityTests", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalConnectivityTestsRequest>;

export type CreateProjectsLocationsGlobalConnectivityTestsResponse = Operation;
export const CreateProjectsLocationsGlobalConnectivityTestsResponse = Operation;

export type CreateProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const createProjectsLocationsGlobalConnectivityTests: API.OperationMethod<CreateProjectsLocationsGlobalConnectivityTestsRequest, CreateProjectsLocationsGlobalConnectivityTestsResponse, CreateProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlobalConnectivityTestsRequest,
  output: CreateProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Deletes a specific `ConnectivityTest`. */
export interface DeleteProjectsLocationsGlobalConnectivityTestsRequest {
  /** Required. Connectivity Test resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` */
  name: string;
}

export const DeleteProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalConnectivityTestsRequest>;

export type DeleteProjectsLocationsGlobalConnectivityTestsResponse = Operation;
export const DeleteProjectsLocationsGlobalConnectivityTestsResponse = Operation;

export type DeleteProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const deleteProjectsLocationsGlobalConnectivityTests: API.OperationMethod<DeleteProjectsLocationsGlobalConnectivityTestsRequest, DeleteProjectsLocationsGlobalConnectivityTestsResponse, DeleteProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalConnectivityTestsRequest,
  output: DeleteProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Lists all Connectivity Tests owned by a project. */
export interface ListProjectsLocationsGlobalConnectivityTestsRequest {
  /** Lists the `ConnectivityTests` that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form ` ` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/proj-1/locations/global/connectivityTests/test-1 - Filter by labels: - Resources that have a key called `foo` labels.foo:* - Resources that have a key called `foo` whose value is `bar` labels.foo = bar */
  filter?: string;
  /** Page token from an earlier query, as returned in `next_page_token`. */
  pageToken?: string;
  /** Required. The parent resource of the Connectivity Tests: `projects/{project_id}/locations/global` */
  parent: string;
  /** Field to use to sort the list. */
  orderBy?: string;
  /** Number of `ConnectivityTests` to return. */
  pageSize?: number;
}

export const ListProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/connectivityTests" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalConnectivityTestsRequest>;

export type ListProjectsLocationsGlobalConnectivityTestsResponse = ListConnectivityTestsResponse;
export const ListProjectsLocationsGlobalConnectivityTestsResponse = ListConnectivityTestsResponse;

export type ListProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const listProjectsLocationsGlobalConnectivityTests = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalConnectivityTestsRequest,
  output: ListProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest>;

export type GetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse = Policy;
export const GetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse = Policy;

export type GetIamPolicyProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const getIamPolicyProjectsLocationsGlobalConnectivityTests: API.OperationMethod<GetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest, GetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse, GetIamPolicyProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest,
  output: GetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Updates the configuration of an existing `ConnectivityTest`. After you update a test, the reachability analysis is performed as part of the long running operation, which completes when the analysis completes. The Reachability state in the test resource is updated with the new result. If the endpoint specifications in `ConnectivityTest` are invalid (for example, they contain non-existent resources in the network, or the user does not have read permissions to the network configurations of listed projects), then the reachability result returns a value of UNKNOWN. If the endpoint specifications in `ConnectivityTest` are incomplete, the reachability result returns a value of `AMBIGUOUS`. See the documentation in `ConnectivityTest` for more details. */
export interface PatchProjectsLocationsGlobalConnectivityTestsRequest {
  /** Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. */
  updateMask?: string;
  /** Request body */
  body?: ConnectivityTest;
}

export const PatchProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ConnectivityTest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalConnectivityTestsRequest>;

export type PatchProjectsLocationsGlobalConnectivityTestsResponse = Operation;
export const PatchProjectsLocationsGlobalConnectivityTestsResponse = Operation;

export type PatchProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const patchProjectsLocationsGlobalConnectivityTests: API.OperationMethod<PatchProjectsLocationsGlobalConnectivityTestsRequest, PatchProjectsLocationsGlobalConnectivityTestsResponse, PatchProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlobalConnectivityTestsRequest,
  output: PatchProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Rerun an existing `ConnectivityTest`. After the user triggers the rerun, the reachability analysis is performed as part of the long running operation, which completes when the analysis completes. Even though the test configuration remains the same, the reachability result may change due to underlying network configuration changes. If the endpoint specifications in `ConnectivityTest` become invalid (for example, specified resources are deleted in the network, or you lost read permissions to the network configurations of listed projects), then the reachability result returns a value of `UNKNOWN`. */
export interface RerunProjectsLocationsGlobalConnectivityTestsRequest {
  /** Required. Connectivity Test resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` */
  name: string;
  /** Request body */
  body?: RerunConnectivityTestRequest;
}

export const RerunProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RerunConnectivityTestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}:rerun", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RerunProjectsLocationsGlobalConnectivityTestsRequest>;

export type RerunProjectsLocationsGlobalConnectivityTestsResponse = Operation;
export const RerunProjectsLocationsGlobalConnectivityTestsResponse = Operation;

export type RerunProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const rerunProjectsLocationsGlobalConnectivityTests: API.OperationMethod<RerunProjectsLocationsGlobalConnectivityTestsRequest, RerunProjectsLocationsGlobalConnectivityTestsResponse, RerunProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RerunProjectsLocationsGlobalConnectivityTestsRequest,
  output: RerunProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/connectivityTests/{connectivityTestsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest>;

export type SetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse = Policy;
export const SetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse = Policy;

export type SetIamPolicyProjectsLocationsGlobalConnectivityTestsError = CommonErrors;

export const setIamPolicyProjectsLocationsGlobalConnectivityTests: API.OperationMethod<SetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest, SetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse, SetIamPolicyProjectsLocationsGlobalConnectivityTestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlobalConnectivityTestsRequest,
  output: SetIamPolicyProjectsLocationsGlobalConnectivityTestsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsGlobalOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalOperationsRequest>;

export type ListProjectsLocationsGlobalOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsGlobalOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsGlobalOperationsError = CommonErrors;

export const listProjectsLocationsGlobalOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalOperationsRequest,
  output: ListProjectsLocationsGlobalOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/global/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalOperationsRequest>;

export type DeleteProjectsLocationsGlobalOperationsResponse = Empty;
export const DeleteProjectsLocationsGlobalOperationsResponse = Empty;

export type DeleteProjectsLocationsGlobalOperationsError = CommonErrors;

export const deleteProjectsLocationsGlobalOperations: API.OperationMethod<DeleteProjectsLocationsGlobalOperationsRequest, DeleteProjectsLocationsGlobalOperationsResponse, DeleteProjectsLocationsGlobalOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalOperationsRequest,
  output: DeleteProjectsLocationsGlobalOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/global/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsGlobalOperationsRequest>;

export type CancelProjectsLocationsGlobalOperationsResponse = Empty;
export const CancelProjectsLocationsGlobalOperationsResponse = Empty;

export type CancelProjectsLocationsGlobalOperationsError = CommonErrors;

export const cancelProjectsLocationsGlobalOperations: API.OperationMethod<CancelProjectsLocationsGlobalOperationsRequest, CancelProjectsLocationsGlobalOperationsResponse, CancelProjectsLocationsGlobalOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsGlobalOperationsRequest,
  output: CancelProjectsLocationsGlobalOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsGlobalOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/global/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalOperationsRequest>;

export type GetProjectsLocationsGlobalOperationsResponse = Operation;
export const GetProjectsLocationsGlobalOperationsResponse = Operation;

export type GetProjectsLocationsGlobalOperationsError = CommonErrors;

export const getProjectsLocationsGlobalOperations: API.OperationMethod<GetProjectsLocationsGlobalOperationsRequest, GetProjectsLocationsGlobalOperationsResponse, GetProjectsLocationsGlobalOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalOperationsRequest,
  output: GetProjectsLocationsGlobalOperationsResponse,
  errors: [],
}));

/** Lists all `VpcFlowLogsConfigs` in a given project. */
export interface ListProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Optional. Field to use to sort the list. */
  orderBy?: string;
  /** Required. The parent resource of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` */
  parent: string;
  /** Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported [CEL logic operators] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). */
  filter?: string;
  /** Optional. Page token from an earlier query, as returned in `next_page_token`. */
  pageToken?: string;
  /** Optional. Number of `VpcFlowLogsConfigs` to return. */
  pageSize?: number;
}

export const ListProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVpcFlowLogsConfigsRequest>;

export type ListProjectsLocationsVpcFlowLogsConfigsResponse = ListVpcFlowLogsConfigsResponse;
export const ListProjectsLocationsVpcFlowLogsConfigsResponse = ListVpcFlowLogsConfigsResponse;

export type ListProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const listProjectsLocationsVpcFlowLogsConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsVpcFlowLogsConfigsRequest,
  output: ListProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** QueryOrgVpcFlowLogsConfigs returns a list of all organization-level VPC Flow Logs configurations applicable to the specified project. */
export interface QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Optional. Number of `VpcFlowLogsConfigs` to return. */
  pageSize?: number;
  /** Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported [CEL logic operators] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). */
  filter?: string;
  /** Optional. Page token from an earlier query, as returned in `next_page_token`. */
  pageToken?: string;
  /** Required. The parent resource of the VpcFlowLogsConfig, specified in the following format: `projects/{project_id}/locations/global` */
  parent: string;
}

export const QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs:queryOrgVpcFlowLogsConfigs" }),
  svc,
) as unknown as Schema.Schema<QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest>;

export type QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsResponse = QueryOrgVpcFlowLogsConfigsResponse;
export const QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsResponse = QueryOrgVpcFlowLogsConfigsResponse;

export type QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const queryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigs = API.makePaginated(() => ({
  input: QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest,
  output: QueryOrgVpcFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** ShowEffectiveFlowLogsConfigs returns a list of all VPC Flow Logs configurations applicable to a specified resource. */
export interface ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Optional. Page token from an earlier query, as returned in `next_page_token`. */
  pageToken?: string;
  /** Required. The parent resource of the VpcFlowLogsConfig, specified in the following format: `projects/{project_id}/locations/global` */
  parent: string;
  /** Optional. Lists the `EffectiveVpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported [CEL logic operators] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). */
  filter?: string;
  /** Optional. Number of `EffectiveVpcFlowLogsConfigs` to return. Default is 30. */
  pageSize?: number;
  /** Required. The resource to get the effective VPC Flow Logs configuration for. The resource must belong to the same project as the parent. The resource must be a network, subnetwork, interconnect attachment, VPN tunnel, or a project. */
  resource?: string;
}

export const ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  resource: Schema.optional(Schema.String).pipe(T.HttpQuery("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs:showEffectiveFlowLogsConfigs" }),
  svc,
) as unknown as Schema.Schema<ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest>;

export type ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsResponse = ShowEffectiveFlowLogsConfigsResponse;
export const ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsResponse = ShowEffectiveFlowLogsConfigsResponse;

export type ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const showEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigs = API.makePaginated(() => ({
  input: ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsRequest,
  output: ShowEffectiveFlowLogsConfigsProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a specific `VpcFlowLogsConfig`. */
export interface DeleteProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For a project-level resource: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For an organization-level resource: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name: string;
}

export const DeleteProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs/{vpcFlowLogsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVpcFlowLogsConfigsRequest>;

export type DeleteProjectsLocationsVpcFlowLogsConfigsResponse = Operation;
export const DeleteProjectsLocationsVpcFlowLogsConfigsResponse = Operation;

export type DeleteProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const deleteProjectsLocationsVpcFlowLogsConfigs: API.OperationMethod<DeleteProjectsLocationsVpcFlowLogsConfigsRequest, DeleteProjectsLocationsVpcFlowLogsConfigsResponse, DeleteProjectsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVpcFlowLogsConfigsRequest,
  output: DeleteProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Gets the details of a specific `VpcFlowLogsConfig`. */
export interface GetProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level resources: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name: string;
}

export const GetProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs/{vpcFlowLogsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVpcFlowLogsConfigsRequest>;

export type GetProjectsLocationsVpcFlowLogsConfigsResponse = VpcFlowLogsConfig;
export const GetProjectsLocationsVpcFlowLogsConfigsResponse = VpcFlowLogsConfig;

export type GetProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const getProjectsLocationsVpcFlowLogsConfigs: API.OperationMethod<GetProjectsLocationsVpcFlowLogsConfigsRequest, GetProjectsLocationsVpcFlowLogsConfigsResponse, GetProjectsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVpcFlowLogsConfigsRequest,
  output: GetProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Creates a new `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Creating a configuration with `state=DISABLED` will fail 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - creating another configuration with the same fields but different values for the following fields will fail as well: * name * create_time * update_time * labels * description */
export interface CreateProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Required. ID of the `VpcFlowLogsConfig`. */
  vpcFlowLogsConfigId?: string;
  /** Required. The parent resource of the VpcFlowLogsConfig to create, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` */
  parent: string;
  /** Request body */
  body?: VpcFlowLogsConfig;
}

export const CreateProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  vpcFlowLogsConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("vpcFlowLogsConfigId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(VpcFlowLogsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVpcFlowLogsConfigsRequest>;

export type CreateProjectsLocationsVpcFlowLogsConfigsResponse = Operation;
export const CreateProjectsLocationsVpcFlowLogsConfigsResponse = Operation;

export type CreateProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const createProjectsLocationsVpcFlowLogsConfigs: API.OperationMethod<CreateProjectsLocationsVpcFlowLogsConfigsRequest, CreateProjectsLocationsVpcFlowLogsConfigsResponse, CreateProjectsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVpcFlowLogsConfigsRequest,
  output: CreateProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Updates an existing `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Updating a configuration with `state=DISABLED` will fail. 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - updating another configuration with the same fields but different values for the following fields will fail as well: * name * create_time * update_time * labels * description */
export interface PatchProjectsLocationsVpcFlowLogsConfigsRequest {
  /** Required. Mask of fields to update. At least one path must be supplied in this field. For example, to change the state of the configuration to ENABLED, specify `update_mask` = `"state"`, and the `vpc_flow_logs_config` would be: `vpc_flow_logs_config = { name = "projects/my-project/locations/global/vpcFlowLogsConfigs/my-config" state = "ENABLED" }` */
  updateMask?: string;
  /** Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name: string;
  /** Request body */
  body?: VpcFlowLogsConfig;
}

export const PatchProjectsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(VpcFlowLogsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/vpcFlowLogsConfigs/{vpcFlowLogsConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVpcFlowLogsConfigsRequest>;

export type PatchProjectsLocationsVpcFlowLogsConfigsResponse = Operation;
export const PatchProjectsLocationsVpcFlowLogsConfigsResponse = Operation;

export type PatchProjectsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const patchProjectsLocationsVpcFlowLogsConfigs: API.OperationMethod<PatchProjectsLocationsVpcFlowLogsConfigsRequest, PatchProjectsLocationsVpcFlowLogsConfigsResponse, PatchProjectsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVpcFlowLogsConfigsRequest,
  output: PatchProjectsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListOrganizationsLocationsRequest {
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListOrganizationsLocationsRequest = Schema.Struct({
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsRequest>;

export type ListOrganizationsLocationsResponse = ListLocationsResponse;
export const ListOrganizationsLocationsResponse = ListLocationsResponse;

export type ListOrganizationsLocationsError = CommonErrors;

export const listOrganizationsLocations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsRequest,
  output: ListOrganizationsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetOrganizationsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsRequest>;

export type GetOrganizationsLocationsResponse = Location;
export const GetOrganizationsLocationsResponse = Location;

export type GetOrganizationsLocationsError = CommonErrors;

export const getOrganizationsLocations: API.OperationMethod<GetOrganizationsLocationsRequest, GetOrganizationsLocationsResponse, GetOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsRequest,
  output: GetOrganizationsLocationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOrganizationsLocationsGlobalOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/global/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsGlobalOperationsRequest>;

export type DeleteOrganizationsLocationsGlobalOperationsResponse = Empty;
export const DeleteOrganizationsLocationsGlobalOperationsResponse = Empty;

export type DeleteOrganizationsLocationsGlobalOperationsError = CommonErrors;

export const deleteOrganizationsLocationsGlobalOperations: API.OperationMethod<DeleteOrganizationsLocationsGlobalOperationsRequest, DeleteOrganizationsLocationsGlobalOperationsResponse, DeleteOrganizationsLocationsGlobalOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsGlobalOperationsRequest,
  output: DeleteOrganizationsLocationsGlobalOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsLocationsGlobalOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
}

export const ListOrganizationsLocationsGlobalOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/global/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsGlobalOperationsRequest>;

export type ListOrganizationsLocationsGlobalOperationsResponse = ListOperationsResponse;
export const ListOrganizationsLocationsGlobalOperationsResponse = ListOperationsResponse;

export type ListOrganizationsLocationsGlobalOperationsError = CommonErrors;

export const listOrganizationsLocationsGlobalOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsGlobalOperationsRequest,
  output: ListOrganizationsLocationsGlobalOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOrganizationsLocationsGlobalOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/global/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsGlobalOperationsRequest>;

export type CancelOrganizationsLocationsGlobalOperationsResponse = Empty;
export const CancelOrganizationsLocationsGlobalOperationsResponse = Empty;

export type CancelOrganizationsLocationsGlobalOperationsError = CommonErrors;

export const cancelOrganizationsLocationsGlobalOperations: API.OperationMethod<CancelOrganizationsLocationsGlobalOperationsRequest, CancelOrganizationsLocationsGlobalOperationsResponse, CancelOrganizationsLocationsGlobalOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsGlobalOperationsRequest,
  output: CancelOrganizationsLocationsGlobalOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsGlobalOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsGlobalOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/global/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsGlobalOperationsRequest>;

export type GetOrganizationsLocationsGlobalOperationsResponse = Operation;
export const GetOrganizationsLocationsGlobalOperationsResponse = Operation;

export type GetOrganizationsLocationsGlobalOperationsError = CommonErrors;

export const getOrganizationsLocationsGlobalOperations: API.OperationMethod<GetOrganizationsLocationsGlobalOperationsRequest, GetOrganizationsLocationsGlobalOperationsResponse, GetOrganizationsLocationsGlobalOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsGlobalOperationsRequest,
  output: GetOrganizationsLocationsGlobalOperationsResponse,
  errors: [],
}));

/** Creates a new `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Creating a configuration with `state=DISABLED` will fail 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - creating another configuration with the same fields but different values for the following fields will fail as well: * name * create_time * update_time * labels * description */
export interface CreateOrganizationsLocationsVpcFlowLogsConfigsRequest {
  /** Required. The parent resource of the VpcFlowLogsConfig to create, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` */
  parent: string;
  /** Required. ID of the `VpcFlowLogsConfig`. */
  vpcFlowLogsConfigId?: string;
  /** Request body */
  body?: VpcFlowLogsConfig;
}

export const CreateOrganizationsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  vpcFlowLogsConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("vpcFlowLogsConfigId")),
  body: Schema.optional(VpcFlowLogsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/vpcFlowLogsConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsVpcFlowLogsConfigsRequest>;

export type CreateOrganizationsLocationsVpcFlowLogsConfigsResponse = Operation;
export const CreateOrganizationsLocationsVpcFlowLogsConfigsResponse = Operation;

export type CreateOrganizationsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const createOrganizationsLocationsVpcFlowLogsConfigs: API.OperationMethod<CreateOrganizationsLocationsVpcFlowLogsConfigsRequest, CreateOrganizationsLocationsVpcFlowLogsConfigsResponse, CreateOrganizationsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsVpcFlowLogsConfigsRequest,
  output: CreateOrganizationsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Gets the details of a specific `VpcFlowLogsConfig`. */
export interface GetOrganizationsLocationsVpcFlowLogsConfigsRequest {
  /** Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level resources: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name: string;
}

export const GetOrganizationsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/vpcFlowLogsConfigs/{vpcFlowLogsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsVpcFlowLogsConfigsRequest>;

export type GetOrganizationsLocationsVpcFlowLogsConfigsResponse = VpcFlowLogsConfig;
export const GetOrganizationsLocationsVpcFlowLogsConfigsResponse = VpcFlowLogsConfig;

export type GetOrganizationsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const getOrganizationsLocationsVpcFlowLogsConfigs: API.OperationMethod<GetOrganizationsLocationsVpcFlowLogsConfigsRequest, GetOrganizationsLocationsVpcFlowLogsConfigsResponse, GetOrganizationsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsVpcFlowLogsConfigsRequest,
  output: GetOrganizationsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Lists all `VpcFlowLogsConfigs` in a given organization. */
export interface ListOrganizationsLocationsVpcFlowLogsConfigsRequest {
  /** Optional. Field to use to sort the list. */
  orderBy?: string;
  /** Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported [CEL logic operators] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). */
  filter?: string;
  /** Optional. Page token from an earlier query, as returned in `next_page_token`. */
  pageToken?: string;
  /** Optional. Number of `VpcFlowLogsConfigs` to return. */
  pageSize?: number;
  /** Required. The parent resource of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` */
  parent: string;
}

export const ListOrganizationsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/vpcFlowLogsConfigs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsVpcFlowLogsConfigsRequest>;

export type ListOrganizationsLocationsVpcFlowLogsConfigsResponse = ListVpcFlowLogsConfigsResponse;
export const ListOrganizationsLocationsVpcFlowLogsConfigsResponse = ListVpcFlowLogsConfigsResponse;

export type ListOrganizationsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const listOrganizationsLocationsVpcFlowLogsConfigs = API.makePaginated(() => ({
  input: ListOrganizationsLocationsVpcFlowLogsConfigsRequest,
  output: ListOrganizationsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Updating a configuration with `state=DISABLED` will fail 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - updating another configuration with the same fields but different values for the following fields will fail as well: * name * create_time * update_time * labels * description */
export interface PatchOrganizationsLocationsVpcFlowLogsConfigsRequest {
  /** Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name: string;
  /** Required. Mask of fields to update. At least one path must be supplied in this field. For example, to change the state of the configuration to ENABLED, specify `update_mask` = `"state"`, and the `vpc_flow_logs_config` would be: `vpc_flow_logs_config = { name = "projects/my-project/locations/global/vpcFlowLogsConfigs/my-config" state = "ENABLED" }` */
  updateMask?: string;
  /** Request body */
  body?: VpcFlowLogsConfig;
}

export const PatchOrganizationsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(VpcFlowLogsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/vpcFlowLogsConfigs/{vpcFlowLogsConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsVpcFlowLogsConfigsRequest>;

export type PatchOrganizationsLocationsVpcFlowLogsConfigsResponse = Operation;
export const PatchOrganizationsLocationsVpcFlowLogsConfigsResponse = Operation;

export type PatchOrganizationsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const patchOrganizationsLocationsVpcFlowLogsConfigs: API.OperationMethod<PatchOrganizationsLocationsVpcFlowLogsConfigsRequest, PatchOrganizationsLocationsVpcFlowLogsConfigsResponse, PatchOrganizationsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsVpcFlowLogsConfigsRequest,
  output: PatchOrganizationsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

/** Deletes a specific `VpcFlowLogsConfig`. */
export interface DeleteOrganizationsLocationsVpcFlowLogsConfigsRequest {
  /** Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For a project-level resource: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For an organization-level resource: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` */
  name: string;
}

export const DeleteOrganizationsLocationsVpcFlowLogsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/vpcFlowLogsConfigs/{vpcFlowLogsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsVpcFlowLogsConfigsRequest>;

export type DeleteOrganizationsLocationsVpcFlowLogsConfigsResponse = Operation;
export const DeleteOrganizationsLocationsVpcFlowLogsConfigsResponse = Operation;

export type DeleteOrganizationsLocationsVpcFlowLogsConfigsError = CommonErrors;

export const deleteOrganizationsLocationsVpcFlowLogsConfigs: API.OperationMethod<DeleteOrganizationsLocationsVpcFlowLogsConfigsRequest, DeleteOrganizationsLocationsVpcFlowLogsConfigsResponse, DeleteOrganizationsLocationsVpcFlowLogsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsVpcFlowLogsConfigsRequest,
  output: DeleteOrganizationsLocationsVpcFlowLogsConfigsResponse,
  errors: [],
}));

