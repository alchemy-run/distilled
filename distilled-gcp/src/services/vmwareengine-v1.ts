// ==========================================================================
// VMware Engine API (vmwareengine v1)
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
  name: "vmwareengine",
  version: "v1",
  rootUrl: "https://vmwareengine.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface StretchedClusterConfig {
  /** Required. Zone that will remain operational when connection between the two zones is lost. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-a` where `{project}` can either be a project number or a project ID. */
  preferredLocation?: string;
  /** Required. Additional zone for a higher level of availability and load balancing. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-b` where `{project}` can either be a project number or a project ID. */
  secondaryLocation?: string;
}

export const StretchedClusterConfig: Schema.Schema<StretchedClusterConfig> = Schema.suspend(() => Schema.Struct({
  preferredLocation: Schema.optional(Schema.String),
  secondaryLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "StretchedClusterConfig" }) as any as Schema.Schema<StretchedClusterConfig>;

export interface NodeTypeConfig {
  /** Required. The number of nodes of this type in the cluster */
  nodeCount?: number;
  /** Optional. Customized number of cores available to each node of the type. This number must always be one of `nodeType.availableCustomCoreCounts`. If zero is provided max value from `nodeType.availableCustomCoreCounts` will be used. */
  customCoreCount?: number;
}

export const NodeTypeConfig: Schema.Schema<NodeTypeConfig> = Schema.suspend(() => Schema.Struct({
  nodeCount: Schema.optional(Schema.Number),
  customCoreCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "NodeTypeConfig" }) as any as Schema.Schema<NodeTypeConfig>;

export interface ManagementCluster {
  /** Optional. Configuration of a stretched cluster. Required for STRETCHED private clouds. */
  stretchedClusterConfig?: StretchedClusterConfig;
  /** Required. The map of cluster node types in this cluster, where the key is canonical identifier of the node type (corresponds to the `NodeType`). */
  nodeTypeConfigs?: Record<string, NodeTypeConfig>;
  /** Required. The user-provided identifier of the new `Cluster`. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  clusterId?: string;
}

export const ManagementCluster: Schema.Schema<ManagementCluster> = Schema.suspend(() => Schema.Struct({
  stretchedClusterConfig: Schema.optional(StretchedClusterConfig),
  nodeTypeConfigs: Schema.optional(Schema.Record(Schema.String, NodeTypeConfig)),
  clusterId: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagementCluster" }) as any as Schema.Schema<ManagementCluster>;

export interface LoggingServer {
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Required. Protocol used by vCenter to send logs to a logging server. */
  protocol?: "PROTOCOL_UNSPECIFIED" | "UDP" | "TCP" | "TLS" | "SSL" | "RELP" | (string & {});
  /** Output only. The resource name of this logging server. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/loggingServers/my-logging-server` */
  name?: string;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Required. Fully-qualified domain name (FQDN) or IP Address of the logging server. */
  hostname?: string;
  /** Required. Port number at which the logging server receives logs. */
  port?: number;
  /** Required. The type of component that produces logs that will be forwarded to this logging server. */
  sourceType?: "SOURCE_TYPE_UNSPECIFIED" | "ESXI" | "VCSA" | (string & {});
  /** Output only. Last update time of this resource. */
  updateTime?: string;
}

export const LoggingServer: Schema.Schema<LoggingServer> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  sourceType: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "LoggingServer" }) as any as Schema.Schema<LoggingServer>;

export interface ExternalAddress {
  /** User-provided description for this resource. */
  description?: string;
  /** Output only. Identifier. The resource name of this external IP address. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/externalAddresses/my-address` */
  name?: string;
  /** Output only. The external IP address of a workload VM. */
  externalIp?: string;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Output only. The state of the resource. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "UPDATING" | "DELETING" | (string & {});
  /** The internal IP address of a workload VM. */
  internalIp?: string;
}

export const ExternalAddress: Schema.Schema<ExternalAddress> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  externalIp: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalAddress" }) as any as Schema.Schema<ExternalAddress>;

export interface Thresholds {
  /** Required. The utilization triggering the scale-in operation in percent. */
  scaleIn?: number;
  /** Required. The utilization triggering the scale-out operation in percent. */
  scaleOut?: number;
}

export const Thresholds: Schema.Schema<Thresholds> = Schema.suspend(() => Schema.Struct({
  scaleIn: Schema.optional(Schema.Number),
  scaleOut: Schema.optional(Schema.Number),
})).annotate({ identifier: "Thresholds" }) as any as Schema.Schema<Thresholds>;

export interface AutoscalingPolicy {
  /** Optional. Utilization thresholds pertaining to amount of consumed storage. */
  storageThresholds?: Thresholds;
  /** Optional. Utilization thresholds pertaining to amount of granted memory. */
  grantedMemoryThresholds?: Thresholds;
  /** Required. The canonical identifier of the node type to add or remove. Corresponds to the `NodeType`. */
  nodeTypeId?: string;
  /** Required. Number of nodes to add to a cluster during a scale-out operation. Must be divisible by 2 for stretched clusters. During a scale-in operation only one node (or 2 for stretched clusters) are removed in a single iteration. */
  scaleOutSize?: number;
  /** Optional. Utilization thresholds pertaining to CPU utilization. */
  cpuThresholds?: Thresholds;
  /** Optional. Utilization thresholds pertaining to amount of consumed memory. */
  consumedMemoryThresholds?: Thresholds;
}

export const AutoscalingPolicy: Schema.Schema<AutoscalingPolicy> = Schema.suspend(() => Schema.Struct({
  storageThresholds: Schema.optional(Thresholds),
  grantedMemoryThresholds: Schema.optional(Thresholds),
  nodeTypeId: Schema.optional(Schema.String),
  scaleOutSize: Schema.optional(Schema.Number),
  cpuThresholds: Schema.optional(Thresholds),
  consumedMemoryThresholds: Schema.optional(Thresholds),
})).annotate({ identifier: "AutoscalingPolicy" }) as any as Schema.Schema<AutoscalingPolicy>;

export interface IpRange {
  /** A single IP address. For example: `10.0.0.5`. */
  ipAddress?: string;
  /** The name of an `ExternalAddress` resource. The external address must have been reserved in the scope of this external access rule's parent network policy. Provide the external address name in the form of `projects/{project}/locations/{location}/privateClouds/{private_cloud}/externalAddresses/{external_address}`. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/externalAddresses/my-address`. */
  externalAddress?: string;
  /** An IP address range in the CIDR format. For example: `10.0.0.0/24`. */
  ipAddressRange?: string;
}

export const IpRange: Schema.Schema<IpRange> = Schema.suspend(() => Schema.Struct({
  ipAddress: Schema.optional(Schema.String),
  externalAddress: Schema.optional(Schema.String),
  ipAddressRange: Schema.optional(Schema.String),
})).annotate({ identifier: "IpRange" }) as any as Schema.Schema<IpRange>;

export interface ExternalAccessRule {
  /** External access rule priority, which determines the external access rule to use when multiple rules apply. If multiple rules have the same priority, their ordering is non-deterministic. If specific ordering is required, assign unique priorities to enforce such ordering. The external access rule priority is an integer from 100 to 4096, both inclusive. Lower integers indicate higher precedence. For example, a rule with priority `100` has higher precedence than a rule with priority `101`. */
  priority?: number;
  /** A list of source ports to which the external access rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. For example: `["22"]`, `["80","443"]`, or `["12345-12349"]`. To match all source ports, specify `["0-65535"]`. */
  sourcePorts?: Array<string>;
  /** If destination ranges are specified, the external access rule applies only to the traffic that has a destination IP address in these ranges. The specified IP addresses must have reserved external IP addresses in the scope of the parent network policy. To match all external IP addresses in the scope of the parent network policy, specify `0.0.0.0/0`. To match a specific external IP address, specify it using the `IpRange.external_address` property. */
  destinationIpRanges?: Array<IpRange>;
  /** The action that the external access rule performs. */
  action?: "ACTION_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Output only. The resource name of this external access rule. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy/externalAccessRules/my-rule` */
  name?: string;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** User-provided description for this external access rule. */
  description?: string;
  /** The IP protocol to which the external access rule applies. This value can be one of the following three protocol strings (not case-sensitive): `tcp`, `udp`, or `icmp`. */
  ipProtocol?: string;
  /** If source ranges are specified, the external access rule applies only to traffic that has a source IP address in these ranges. These ranges can either be expressed in the CIDR format or as an IP address. As only inbound rules are supported, `ExternalAddress` resources cannot be the source IP addresses of an external access rule. To match all source addresses, specify `0.0.0.0/0`. */
  sourceIpRanges?: Array<IpRange>;
  /** Output only. The state of the resource. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "UPDATING" | "DELETING" | (string & {});
  /** A list of destination ports to which the external access rule applies. This field is only applicable for the UDP or TCP protocol. Each entry must be either an integer or a range. For example: `["22"]`, `["80","443"]`, or `["12345-12349"]`. To match all destination ports, specify `["0-65535"]`. */
  destinationPorts?: Array<string>;
}

export const ExternalAccessRule: Schema.Schema<ExternalAccessRule> = Schema.suspend(() => Schema.Struct({
  priority: Schema.optional(Schema.Number),
  sourcePorts: Schema.optional(Schema.Array(Schema.String)),
  destinationIpRanges: Schema.optional(Schema.Array(IpRange)),
  action: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  ipProtocol: Schema.optional(Schema.String),
  sourceIpRanges: Schema.optional(Schema.Array(IpRange)),
  state: Schema.optional(Schema.String),
  destinationPorts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExternalAccessRule" }) as any as Schema.Schema<ExternalAccessRule>;

export interface Node {
  /** Output only. The version number of the VMware ESXi management component in this cluster. */
  version?: string;
  /** Output only. Customized number of cores */
  customCoreCount?: string;
  /** Output only. The canonical identifier of the node type (corresponds to the `NodeType`). For example: standard-72. */
  nodeTypeId?: string;
  /** Output only. Internal IP address of the node. */
  internalIp?: string;
  /** Output only. Fully qualified domain name of the node. */
  fqdn?: string;
  /** Output only. The state of the appliance. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "FAILED" | "UPGRADING" | (string & {});
  /** Output only. The resource name of this node. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster/nodes/my-node */
  name?: string;
}

export const Node: Schema.Schema<Node> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  customCoreCount: Schema.optional(Schema.String),
  nodeTypeId: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
  fqdn: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Node" }) as any as Schema.Schema<Node>;

export interface VpcNetwork {
  /** Output only. Type of VPC network (INTRANET, INTERNET, or GOOGLE_CLOUD) */
  type?: "TYPE_UNSPECIFIED" | "INTRANET" | "INTERNET" | "GOOGLE_CLOUD" | (string & {});
  /** Output only. The relative resource name of the service VPC network this VMware Engine network is attached to. For example: `projects/123123/global/networks/my-network` */
  network?: string;
}

export const VpcNetwork: Schema.Schema<VpcNetwork> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "VpcNetwork" }) as any as Schema.Schema<VpcNetwork>;

export interface VmwareEngineNetwork {
  /** Output only. State of the VMware Engine network. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | (string & {});
  /** Output only. VMware Engine service VPC networks that provide connectivity from a private cloud to customer projects, the internet, and other Google Cloud services. */
  vpcNetworks?: Array<VpcNetwork>;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Checksum that may be sent on update and delete requests to ensure that the user-provided value is up to date before the server processes a request. The server computes checksums based on the value of other fields in the request. */
  etag?: string;
  /** Output only. Identifier. The resource name of the VMware Engine network. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/vmwareEngineNetworks/my-network` */
  name?: string;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Required. VMware Engine network type. */
  type?: "TYPE_UNSPECIFIED" | "LEGACY" | "STANDARD" | (string & {});
  /** User-provided description for this VMware Engine network. */
  description?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
}

export const VmwareEngineNetwork: Schema.Schema<VmwareEngineNetwork> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  vpcNetworks: Schema.optional(Schema.Array(VpcNetwork)),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "VmwareEngineNetwork" }) as any as Schema.Schema<VmwareEngineNetwork>;

export interface NetworkConfig {
  /** Output only. The IP address layout version of the management IP address range. Possible versions include: * `managementIpAddressLayoutVersion=1`: Indicates the legacy IP address layout used by some existing private clouds. This is no longer supported for new private clouds as it does not support all features. * `managementIpAddressLayoutVersion=2`: Indicates the latest IP address layout used by all newly created private clouds. This version supports all current features. */
  managementIpAddressLayoutVersion?: number;
  /** Output only. The canonical name of the VMware Engine network in the form: `projects/{project_number}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` */
  vmwareEngineNetworkCanonical?: string;
  /** Optional. The relative resource name of the VMware Engine network attached to the private cloud. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID. */
  vmwareEngineNetwork?: string;
  /** Output only. DNS Server IP of the Private Cloud. All DNS queries can be forwarded to this address for name resolution of Private Cloud's management entities like vCenter, NSX-T Manager and ESXi hosts. */
  dnsServerIp?: string;
  /** Required. Management CIDR used by VMware management appliances. */
  managementCidr?: string;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  managementIpAddressLayoutVersion: Schema.optional(Schema.Number),
  vmwareEngineNetworkCanonical: Schema.optional(Schema.String),
  vmwareEngineNetwork: Schema.optional(Schema.String),
  dnsServerIp: Schema.optional(Schema.String),
  managementCidr: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface Nsx {
  /** Version of the appliance. */
  version?: string;
  /** Internal IP address of the appliance. */
  internalIp?: string;
  /** Fully qualified domain name of the appliance. */
  fqdn?: string;
  /** Output only. The state of the appliance. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | (string & {});
}

export const Nsx: Schema.Schema<Nsx> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
  fqdn: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Nsx" }) as any as Schema.Schema<Nsx>;

export interface Hcx {
  /** Fully qualified domain name of the appliance. */
  fqdn?: string;
  /** Output only. The state of the appliance. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "ACTIVATING" | (string & {});
  /** Version of the appliance. */
  version?: string;
  /** Internal IP address of the appliance. */
  internalIp?: string;
}

export const Hcx: Schema.Schema<Hcx> = Schema.suspend(() => Schema.Struct({
  fqdn: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
})).annotate({ identifier: "Hcx" }) as any as Schema.Schema<Hcx>;

export interface Vcenter {
  /** Output only. The state of the appliance. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | (string & {});
  /** Fully qualified domain name of the appliance. */
  fqdn?: string;
  /** Version of the appliance. */
  version?: string;
  /** Internal IP address of the appliance. */
  internalIp?: string;
}

export const Vcenter: Schema.Schema<Vcenter> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  fqdn: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  internalIp: Schema.optional(Schema.String),
})).annotate({ identifier: "Vcenter" }) as any as Schema.Schema<Vcenter>;

export interface PrivateCloud {
  /** User-provided description for this private cloud. */
  description?: string;
  /** Output only. Identifier. The resource name of this private cloud. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  name?: string;
  /** Output only. Time when the resource will be irreversibly deleted. */
  expireTime?: string;
  /** Required. Network configuration of the private cloud. */
  networkConfig?: NetworkConfig;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Output only. State of the resource. New values may be added to this enum when appropriate. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "UPDATING" | "FAILED" | "DELETED" | "PURGING" | (string & {});
  /** Output only. NSX appliance. */
  nsx?: Nsx;
  /** Output only. Time when the resource was scheduled for deletion. */
  deleteTime?: string;
  /** Output only. HCX appliance. */
  hcx?: Hcx;
  /** Output only. Vcenter appliance. */
  vcenter?: Vcenter;
  /** Optional. Type of the private cloud. Defaults to STANDARD. */
  type?: "STANDARD" | "TIME_LIMITED" | "STRETCHED" | (string & {});
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Required. Input only. The management cluster for this private cloud. This field is required during creation of the private cloud to provide details for the default cluster. The following fields can't be changed after private cloud creation: `ManagementCluster.clusterId`, `ManagementCluster.nodeTypeId`. */
  managementCluster?: ManagementCluster;
}

export const PrivateCloud: Schema.Schema<PrivateCloud> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  networkConfig: Schema.optional(NetworkConfig),
  createTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  nsx: Schema.optional(Nsx),
  deleteTime: Schema.optional(Schema.String),
  hcx: Schema.optional(Hcx),
  vcenter: Schema.optional(Vcenter),
  type: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  managementCluster: Schema.optional(ManagementCluster),
})).annotate({ identifier: "PrivateCloud" }) as any as Schema.Schema<PrivateCloud>;

export interface ListPrivateCloudsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of private clouds. */
  privateClouds?: Array<PrivateCloud>;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
}

export const ListPrivateCloudsResponse: Schema.Schema<ListPrivateCloudsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  privateClouds: Schema.optional(Schema.Array(PrivateCloud)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPrivateCloudsResponse" }) as any as Schema.Schema<ListPrivateCloudsResponse>;

export interface ListLoggingServersResponse {
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
  /** A token, which can be send as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of Logging Servers. */
  loggingServers?: Array<LoggingServer>;
}

export const ListLoggingServersResponse: Schema.Schema<ListLoggingServersResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  loggingServers: Schema.optional(Schema.Array(LoggingServer)),
})).annotate({ identifier: "ListLoggingServersResponse" }) as any as Schema.Schema<ListLoggingServersResponse>;

export interface ManagementDnsZoneBinding {
  /** Output only. The state of the resource. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "UPDATING" | "DELETING" | "FAILED" | (string & {});
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Network to bind is a standard consumer VPC. Specify the name in the following form for consumer VPC network: `projects/{project}/global/networks/{network_id}`. `{project}` can either be a project number or a project ID. */
  vpcNetwork?: string;
  /** Output only. The resource name of this binding. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/managementDnsZoneBindings/my-management-dns-zone-binding` */
  name?: string;
  /** Network to bind is a VMware Engine network. Specify the name in the following form for VMware engine network: `projects/{project}/locations/global/vmwareEngineNetworks/{vmware_engine_network_id}`. `{project}` can either be a project number or a project ID. */
  vmwareEngineNetwork?: string;
  /** User-provided description for this resource. */
  description?: string;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
}

export const ManagementDnsZoneBinding: Schema.Schema<ManagementDnsZoneBinding> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  vpcNetwork: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  vmwareEngineNetwork: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagementDnsZoneBinding" }) as any as Schema.Schema<ManagementDnsZoneBinding>;

export interface ThirdPartyFileService {
  /** Required. Server IP addresses of the NFS file service. NFS v3, provide a single IP address or DNS name. Multiple servers can be supported in future when NFS 4.1 protocol support is enabled. */
  servers?: Array<string>;
  /** Required. Required Mount Folder name */
  fileShare?: string;
  /** Required. Required to identify vpc peering used for NFS access network name of NFS's vpc e.g. projects/project-id/global/networks/my-network_id */
  network?: string;
}

export const ThirdPartyFileService: Schema.Schema<ThirdPartyFileService> = Schema.suspend(() => Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  fileShare: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "ThirdPartyFileService" }) as any as Schema.Schema<ThirdPartyFileService>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Principal {
  /** The user who needs to be granted permission. */
  user?: string;
  /** The service account which needs to be granted the permission. */
  serviceAccount?: string;
}

export const Principal: Schema.Schema<Principal> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "Principal" }) as any as Schema.Schema<Principal>;

export interface GrantDnsBindPermissionRequest {
  /** Required. The consumer provided user/service account which needs to be granted permission to bind with the intranet VPC corresponding to the consumer project. */
  principal?: Principal;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const GrantDnsBindPermissionRequest: Schema.Schema<GrantDnsBindPermissionRequest> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(Principal),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GrantDnsBindPermissionRequest" }) as any as Schema.Schema<GrantDnsBindPermissionRequest>;

export interface PeeringRoute {
  /** Output only. Region containing the next hop of the peering route. This field only applies to dynamic routes in the peer VPC network. */
  nextHopRegion?: string;
  /** Output only. Direction of the routes exchanged with the peer network, from the VMware Engine network perspective: * Routes of direction `INCOMING` are imported from the peer network. * Routes of direction `OUTGOING` are exported from the intranet VPC network of the VMware Engine network. */
  direction?: "DIRECTION_UNSPECIFIED" | "INCOMING" | "OUTGOING" | (string & {});
  /** Output only. True if the peering route has been imported from a peered VPC network; false otherwise. The import happens if the field `NetworkPeering.importCustomRoutes` is true for this network, `NetworkPeering.exportCustomRoutes` is true for the peer VPC network, and the import does not result in a route conflict. */
  imported?: boolean;
  /** Output only. Type of the route in the peer VPC network. */
  type?: "TYPE_UNSPECIFIED" | "DYNAMIC_PEERING_ROUTE" | "STATIC_PEERING_ROUTE" | "SUBNET_PEERING_ROUTE" | (string & {});
  /** Output only. Destination range of the peering route in CIDR notation. */
  destRange?: string;
  /** Output only. The priority of the peering route. */
  priority?: string;
}

export const PeeringRoute: Schema.Schema<PeeringRoute> = Schema.suspend(() => Schema.Struct({
  nextHopRegion: Schema.optional(Schema.String),
  direction: Schema.optional(Schema.String),
  imported: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  destRange: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
})).annotate({ identifier: "PeeringRoute" }) as any as Schema.Schema<PeeringRoute>;

export interface ListPeeringRoutesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of peering routes. */
  peeringRoutes?: Array<PeeringRoute>;
}

export const ListPeeringRoutesResponse: Schema.Schema<ListPeeringRoutesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  peeringRoutes: Schema.optional(Schema.Array(PeeringRoute)),
})).annotate({ identifier: "ListPeeringRoutesResponse" }) as any as Schema.Schema<ListPeeringRoutesResponse>;

export interface VmwareUpgradeComponent {
  /** Output only. Component's upgrade state. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "PAUSED" | "SUCCEEDED" | "FAILED" | "NOT_STARTED" | "NOT_APPLICABLE" | (string & {});
  /** Output only. Type of component */
  componentType?: "VMWARE_COMPONENT_TYPE_UNSPECIFIED" | "VCENTER" | "ESXI" | "NSXT_UC" | "NSXT_EDGE" | "NSXT_MGR" | "HCX" | "VSAN" | "DVS" | "NAMESERVER_VM" | "KMS_VM" | "WITNESS_VM" | "NSXT" | "CLUSTER" | "VM_TOOLS" | (string & {});
}

export const VmwareUpgradeComponent: Schema.Schema<VmwareUpgradeComponent> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  componentType: Schema.optional(Schema.String),
})).annotate({ identifier: "VmwareUpgradeComponent" }) as any as Schema.Schema<VmwareUpgradeComponent>;

export interface Expr {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Expr),
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface FetchNetworkPolicyExternalAddressesResponse {
  /** A list of external IP addresses assigned to VMware workload VMs within the scope of the given network policy. */
  externalAddresses?: Array<ExternalAddress>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchNetworkPolicyExternalAddressesResponse: Schema.Schema<FetchNetworkPolicyExternalAddressesResponse> = Schema.suspend(() => Schema.Struct({
  externalAddresses: Schema.optional(Schema.Array(ExternalAddress)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchNetworkPolicyExternalAddressesResponse" }) as any as Schema.Schema<FetchNetworkPolicyExternalAddressesResponse>;

export interface Credentials {
  /** Initial username. */
  username?: string;
  /** Initial password. */
  password?: string;
}

export const Credentials: Schema.Schema<Credentials> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
})).annotate({ identifier: "Credentials" }) as any as Schema.Schema<Credentials>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface TimeWindow {
  /** Required. Day of the week for this window. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. The duration of the window. The max allowed duration for any window is 24 hours. */
  duration?: string;
  /** Required. Time in UTC when the window starts. */
  startTime?: TimeOfDay;
}

export const TimeWindow: Schema.Schema<TimeWindow> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "TimeWindow" }) as any as Schema.Schema<TimeWindow>;

export interface Interval {
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface WeeklyTimeInterval {
  /** Output only. The day on which the interval ends. Can be same as start day. */
  endDay?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Output only. The time on the start day at which the interval starts. */
  startTime?: TimeOfDay;
  /** Output only. The time on the end day at which the interval ends. */
  endTime?: TimeOfDay;
  /** Output only. The day on which the interval starts. */
  startDay?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
}

export const WeeklyTimeInterval: Schema.Schema<WeeklyTimeInterval> = Schema.suspend(() => Schema.Struct({
  endDay: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
  endTime: Schema.optional(TimeOfDay),
  startDay: Schema.optional(Schema.String),
})).annotate({ identifier: "WeeklyTimeInterval" }) as any as Schema.Schema<WeeklyTimeInterval>;

export interface Constraints {
  /** Output only. Minimum number of hours must be allotted for the upgrade activities for each selected day. This is a minimum; the upgrade schedule can allot more hours for the given day. */
  minHoursDay?: number;
  /** Output only. Output Only. The user can only reschedule an upgrade that starts within this range. */
  rescheduleDateRange?: Interval;
  /** Output only. Output Only. A list of intervals in which maintenance windows are not allowed. Any time window that overlaps with any of these intervals will be considered invalid. */
  disallowedIntervals?: Array<WeeklyTimeInterval>;
  /** Output only. The minimum number of weekly hours must be allotted for the upgrade activities. This is just a minimum; the schedule can assign more weekly hours. */
  minHoursWeek?: number;
}

export const Constraints: Schema.Schema<Constraints> = Schema.suspend(() => Schema.Struct({
  minHoursDay: Schema.optional(Schema.Number),
  rescheduleDateRange: Schema.optional(Interval),
  disallowedIntervals: Schema.optional(Schema.Array(WeeklyTimeInterval)),
  minHoursWeek: Schema.optional(Schema.Number),
})).annotate({ identifier: "Constraints" }) as any as Schema.Schema<Constraints>;

export interface Schedule {
  /** Output only. Output Only. Indicates who most recently edited the upgrade schedule. The value is updated whenever the upgrade is rescheduled. */
  lastEditor?: "EDITOR_UNSPECIFIED" | "SYSTEM" | "USER" | (string & {});
  /** Required. The scheduled start time for the upgrade. */
  startTime?: string;
  /** Required. Weekly time windows for upgrade activities. The server performs upgrade activities during these time windows to minimize disruptions. */
  weeklyWindows?: Array<TimeWindow>;
  /** Output only. Output Only. Constraints applied to the schedule. These constraints should be applicable at the time of any rescheduling. */
  constraints?: Constraints;
  /** Output only. Output Only. The schedule is open for edits during this time interval or window. */
  editWindow?: Interval;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() => Schema.Struct({
  lastEditor: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  weeklyWindows: Schema.optional(Schema.Array(TimeWindow)),
  constraints: Schema.optional(Constraints),
  editWindow: Schema.optional(Interval),
})).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface Upgrade {
  /** Output only. Output Only. The type of upgrade. */
  type?: "TYPE_UNSPECIFIED" | "VSPHERE_UPGRADE" | "VSPHERE_PATCH" | "WORKAROUND" | "FIRMWARE_UPGRADE" | "SWITCH_UPGRADE" | "OTHER" | "INFRASTRUCTURE_UPGRADE" | (string & {});
  /** Output only. Output Only. The description of the upgrade. This is used to provide additional information about the private cloud upgrade, such as the upgrade's purpose, the changes included in the upgrade, or any other relevant information about the upgrade. */
  description?: string;
  /** Schedule details for the upgrade. */
  schedule?: Schedule;
  /** Output only. Output Only. The start version */
  startVersion?: string;
  /** Output only. Output Only. The list of component upgrades. */
  componentUpgrades?: Array<VmwareUpgradeComponent>;
  /** Output only. */
  version?: string;
  /** Output only. Output Only. Last update time of this resource. */
  updateTime?: string;
  /** The etag for the upgrade resource. If this is provided on update, it must match the server's etag. */
  etag?: string;
  /** Output only. Output Only. Creation time of this resource. */
  createTime?: string;
  /** Output only. Output Only. The target version */
  targetVersion?: string;
  /** Output only. The current state of the upgrade. */
  state?: "STATE_UNSPECIFIED" | "SCHEDULED" | "ONGOING" | "SUCCEEDED" | "PAUSED" | "FAILED" | "CANCELLING" | "CANCELLED" | "RESCHEDULING" | (string & {});
  /** Output only. Identifier. The resource name of the private cloud `Upgrade`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/privateClouds/my-cloud/upgrades/my-upgrade` */
  name?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Output only. Output Only. End time of the upgrade. */
  endTime?: string;
  /** Output only. Output Only. The estimated total duration of the upgrade. This information can be used to plan or schedule upgrades to minimize disruptions. Please note that the estimated duration is only an estimate. The actual upgrade duration may vary. */
  estimatedDuration?: string;
}

export const Upgrade: Schema.Schema<Upgrade> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  schedule: Schema.optional(Schedule),
  startVersion: Schema.optional(Schema.String),
  componentUpgrades: Schema.optional(Schema.Array(VmwareUpgradeComponent)),
  version: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  targetVersion: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  estimatedDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "Upgrade" }) as any as Schema.Schema<Upgrade>;

export interface ListUpgradesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** List of unreachable resources. */
  unreachable?: Array<string>;
  /** A list of `Upgrades`. */
  upgrades?: Array<Upgrade>;
}

export const ListUpgradesResponse: Schema.Schema<ListUpgradesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  upgrades: Schema.optional(Schema.Array(Upgrade)),
})).annotate({ identifier: "ListUpgradesResponse" }) as any as Schema.Schema<ListUpgradesResponse>;

export interface GoogleVmwareFileService {
}

export const GoogleVmwareFileService: Schema.Schema<GoogleVmwareFileService> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleVmwareFileService" }) as any as Schema.Schema<GoogleVmwareFileService>;

export interface GoogleFileService {
  /** Google filestore instance resource name e.g. projects/my-project/locations/me-west1-b/instances/my-instance */
  filestoreInstance?: string;
  /** Google netapp volume resource name e.g. projects/my-project/locations/me-west1-b/volumes/my-volume */
  netappVolume?: string;
}

export const GoogleFileService: Schema.Schema<GoogleFileService> = Schema.suspend(() => Schema.Struct({
  filestoreInstance: Schema.optional(Schema.String),
  netappVolume: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFileService" }) as any as Schema.Schema<GoogleFileService>;

export interface NfsDatastore {
  /** Third party file service configuration */
  thirdPartyFileService?: ThirdPartyFileService;
  /** GCVE file service configuration */
  googleVmwareFileService?: GoogleVmwareFileService;
  /** Google file service configuration */
  googleFileService?: GoogleFileService;
}

export const NfsDatastore: Schema.Schema<NfsDatastore> = Schema.suspend(() => Schema.Struct({
  thirdPartyFileService: Schema.optional(ThirdPartyFileService),
  googleVmwareFileService: Schema.optional(GoogleVmwareFileService),
  googleFileService: Schema.optional(GoogleFileService),
})).annotate({ identifier: "NfsDatastore" }) as any as Schema.Schema<NfsDatastore>;

export interface Datastore {
  /** Output only. Identifier. The resource name of this datastore. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/datastores/datastore` */
  name?: string;
  /** Output only. Clusters to which the datastore is attached. */
  clusters?: Array<string>;
  /** Required. Settings for the NFS datastore. */
  nfsDatastore?: NfsDatastore;
  /** Optional. User-provided description for this datastore */
  description?: string;
  /** Optional. Checksum that may be sent on update and delete requests to ensure that the user-provided value is up to date before the server processes a request. The server computes checksums based on the value of other fields in the request. */
  etag?: string;
  /** Output only. The state of the Datastore. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | (string & {});
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
}

export const Datastore: Schema.Schema<Datastore> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  clusters: Schema.optional(Schema.Array(Schema.String)),
  nfsDatastore: Schema.optional(NfsDatastore),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "Datastore" }) as any as Schema.Schema<Datastore>;

export interface DnsBindPermission {
  /** Required. Output only. The name of the resource which stores the users/service accounts having the permission to bind to the corresponding intranet VPC of the consumer project. DnsBindPermission is a global resource and location can only be global. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/dnsBindPermission` */
  name?: string;
  /** Output only. Users/Service accounts which have access for binding on the intranet VPC project corresponding to the consumer project. */
  principals?: Array<Principal>;
}

export const DnsBindPermission: Schema.Schema<DnsBindPermission> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  principals: Schema.optional(Schema.Array(Principal)),
})).annotate({ identifier: "DnsBindPermission" }) as any as Schema.Schema<DnsBindPermission>;

export interface AutoscalingSettings {
  /** Required. The map with autoscaling policies applied to the cluster. The key is the identifier of the policy. It must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) Currently there map must contain only one element that describes the autoscaling policy for compute nodes. */
  autoscalingPolicies?: Record<string, AutoscalingPolicy>;
  /** Optional. Maximum number of nodes of any type in a cluster. If not specified the default limits apply. */
  maxClusterNodeCount?: number;
  /** Optional. Minimum number of nodes of any type in a cluster. If not specified the default limits apply. */
  minClusterNodeCount?: number;
  /** Optional. The minimum duration between consecutive autoscale operations. It starts once addition or removal of nodes is fully completed. Defaults to 30 minutes if not specified. Cool down period must be in whole minutes (for example, 30, 31, 50, 180 minutes). */
  coolDownPeriod?: string;
}

export const AutoscalingSettings: Schema.Schema<AutoscalingSettings> = Schema.suspend(() => Schema.Struct({
  autoscalingPolicies: Schema.optional(Schema.Record(Schema.String, AutoscalingPolicy)),
  maxClusterNodeCount: Schema.optional(Schema.Number),
  minClusterNodeCount: Schema.optional(Schema.Number),
  coolDownPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoscalingSettings" }) as any as Schema.Schema<AutoscalingSettings>;

export interface DatastoreNetwork {
  /** Output only. The resource name of the network peering, used to access the file share by clients on private cloud. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. e.g. projects/my-project/locations/us-central1/networkPeerings/my-network-peering */
  networkPeering?: string;
  /** Optional. connection_count is used to set multiple connections from NFS client on ESXi host to NFS server. A higher number of connections results in better performance on datastores. In MountDatastore API by default max 4 connections are configured. User can set value of connection_count between 1 to 4. Connection_count is supported from vsphere 8.0u1 for earlier version 1 connection count is set on the ESXi hosts. */
  connectionCount?: number;
  /** Optional. MTU value is set on the VMKernel adapter for the NFS traffic. By default standard 1500 MTU size is set in MountDatastore API which is good for typical setups. However google VPC networks supports jumbo MTU 8896. We recommend to tune this value based on the NFS traffic performance. Performance can be determined using benchmarking I/O tools like fio (Flexible I/O Tester) utility. */
  mtu?: number;
  /** Required. The resource name of the subnet Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. e.g. projects/my-project/locations/us-central1/subnets/my-subnet */
  subnet?: string;
}

export const DatastoreNetwork: Schema.Schema<DatastoreNetwork> = Schema.suspend(() => Schema.Struct({
  networkPeering: Schema.optional(Schema.String),
  connectionCount: Schema.optional(Schema.Number),
  mtu: Schema.optional(Schema.Number),
  subnet: Schema.optional(Schema.String),
})).annotate({ identifier: "DatastoreNetwork" }) as any as Schema.Schema<DatastoreNetwork>;

export interface DatastoreMountConfig {
  /** Required. The resource name of the datastore to mount. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/datastores/my-datastore` */
  datastore?: string;
  /** Output only. Server IP addresses of the NFS volume. For NFS 3, you can only provide a single server IP address or DNS names. */
  servers?: Array<string>;
  /** Optional. The access mode of the NFS volume. Optional. Default value used will be READ_WRITE */
  accessMode?: "ACCESS_MODE_UNSPECIFIED" | "READ_ONLY" | "READ_WRITE" | (string & {});
  /** Output only. File share name. */
  fileShare?: string;
  /** Required. The network configuration for the datastore. */
  datastoreNetwork?: DatastoreNetwork;
  /** Optional. The NFS protocol supported by the NFS volume. Default value used will be NFS_V3 */
  nfsVersion?: "NFS_VERSION_UNSPECIFIED" | "NFS_V3" | (string & {});
}

export const DatastoreMountConfig: Schema.Schema<DatastoreMountConfig> = Schema.suspend(() => Schema.Struct({
  datastore: Schema.optional(Schema.String),
  servers: Schema.optional(Schema.Array(Schema.String)),
  accessMode: Schema.optional(Schema.String),
  fileShare: Schema.optional(Schema.String),
  datastoreNetwork: Schema.optional(DatastoreNetwork),
  nfsVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "DatastoreMountConfig" }) as any as Schema.Schema<DatastoreMountConfig>;

export interface Cluster {
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Output only. Identifier. The resource name of this cluster. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  name?: string;
  /** Output only. State of the resource. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "UPDATING" | "DELETING" | "REPAIRING" | (string & {});
  /** Required. The map of cluster node types in this cluster, where the key is canonical identifier of the node type (corresponds to the `NodeType`). */
  nodeTypeConfigs?: Record<string, NodeTypeConfig>;
  /** Optional. Configuration of the autoscaling applied to this cluster. */
  autoscalingSettings?: AutoscalingSettings;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Optional. Configuration of a stretched cluster. Required for clusters that belong to a STRETCHED private cloud. */
  stretchedClusterConfig?: StretchedClusterConfig;
  /** Output only. True if the cluster is a management cluster; false otherwise. There can only be one management cluster in a private cloud and it has to be the first one. */
  management?: boolean;
  /** Output only. Configuration of a mounted datastore. */
  datastoreMountConfig?: Array<DatastoreMountConfig>;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  nodeTypeConfigs: Schema.optional(Schema.Record(Schema.String, NodeTypeConfig)),
  autoscalingSettings: Schema.optional(AutoscalingSettings),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  stretchedClusterConfig: Schema.optional(StretchedClusterConfig),
  management: Schema.optional(Schema.Boolean),
  datastoreMountConfig: Schema.optional(Schema.Array(DatastoreMountConfig)),
})).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ListClustersResponse {
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
  /** A list of private cloud clusters. */
  clusters?: Array<Cluster>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  clusters: Schema.optional(Schema.Array(Cluster)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClustersResponse" }) as any as Schema.Schema<ListClustersResponse>;

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
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface NetworkPeering {
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Output only. Output Only. Details about the current state of the network peering. */
  stateDetails?: string;
  /** Optional. True if custom routes are imported from the peered network; false otherwise. The default value is true. */
  importCustomRoutes?: boolean;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Required. The relative resource name of the VMware Engine network. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID. */
  vmwareEngineNetwork?: string;
  /** Optional. True if full mesh connectivity is created and managed automatically between peered networks; false otherwise. Currently this field is always true because Google Compute Engine automatically creates and manages subnetwork routes between two VPC networks when peering state is 'ACTIVE'. */
  exchangeSubnetRoutes?: boolean;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Optional. User-provided description for this network peering. */
  description?: string;
  /** Required. The relative resource name of the network to peer with a standard VMware Engine network. The provided network can be a consumer VPC network or another standard VMware Engine network. If the `peer_network_type` is VMWARE_ENGINE_NETWORK, specify the name in the form: `projects/{project}/locations/global/vmwareEngineNetworks/{vmware_engine_network_id}`. Otherwise specify the name in the form: `projects/{project}/global/networks/{network_id}`, where `{project}` can either be a project number or a project ID. */
  peerNetwork?: string;
  /** Optional. True if custom routes are exported to the peered network; false otherwise. The default value is true. */
  exportCustomRoutes?: boolean;
  /** Required. The type of the network to peer with the VMware Engine network. */
  peerNetworkType?: "PEER_NETWORK_TYPE_UNSPECIFIED" | "STANDARD" | "VMWARE_ENGINE_NETWORK" | "PRIVATE_SERVICES_ACCESS" | "NETAPP_CLOUD_VOLUMES" | "THIRD_PARTY_SERVICE" | "DELL_POWERSCALE" | "GOOGLE_CLOUD_NETAPP_VOLUMES" | "GOOGLE_CLOUD_FILESTORE_INSTANCES" | (string & {});
  /** Optional. True if all subnet routes with a public IP address range are exported; false otherwise. The default value is true. IPv4 special-use ranges (https://en.wikipedia.org/wiki/IPv4#Special_addresses) are always exported to peers and are not controlled by this field. */
  exportCustomRoutesWithPublicIp?: boolean;
  /** Optional. Maximum transmission unit (MTU) in bytes. The default value is `1500`. If a value of `0` is provided for this field, VMware Engine uses the default value instead. */
  peerMtu?: number;
  /** Output only. State of the network peering. This field has a value of 'ACTIVE' when there's a matching configuration in the peer network. New values may be added to this enum when appropriate. */
  state?: "STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "CREATING" | "DELETING" | (string & {});
  /** Output only. Identifier. The resource name of the network peering. NetworkPeering is a global resource and location can only be global. Resource names are scheme-less URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/networkPeerings/my-peering` */
  name?: string;
  /** Optional. True if all subnet routes with public IP address range are imported; false otherwise. The default value is true. IPv4 special-use ranges (https://en.wikipedia.org/wiki/IPv4#Special_addresses) are always imported to peers and are not controlled by this field. */
  importCustomRoutesWithPublicIp?: boolean;
}

export const NetworkPeering: Schema.Schema<NetworkPeering> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  stateDetails: Schema.optional(Schema.String),
  importCustomRoutes: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
  vmwareEngineNetwork: Schema.optional(Schema.String),
  exchangeSubnetRoutes: Schema.optional(Schema.Boolean),
  uid: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  peerNetwork: Schema.optional(Schema.String),
  exportCustomRoutes: Schema.optional(Schema.Boolean),
  peerNetworkType: Schema.optional(Schema.String),
  exportCustomRoutesWithPublicIp: Schema.optional(Schema.Boolean),
  peerMtu: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  importCustomRoutesWithPublicIp: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NetworkPeering" }) as any as Schema.Schema<NetworkPeering>;

export interface LocationMetadata {
  /** Output only. Capabilities of this location. */
  capabilities?: Array<"CAPABILITY_UNSPECIFIED" | "STRETCHED_CLUSTERS" | (string & {})>;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  capabilities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface ListExternalAddressesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
  /** A list of external IP addresses. */
  externalAddresses?: Array<ExternalAddress>;
}

export const ListExternalAddressesResponse: Schema.Schema<ListExternalAddressesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  externalAddresses: Schema.optional(Schema.Array(ExternalAddress)),
})).annotate({ identifier: "ListExternalAddressesResponse" }) as any as Schema.Schema<ListExternalAddressesResponse>;

export interface ResetNsxCredentialsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const ResetNsxCredentialsRequest: Schema.Schema<ResetNsxCredentialsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "ResetNsxCredentialsRequest" }) as any as Schema.Schema<ResetNsxCredentialsRequest>;

export interface Announcement {
  /** Output only. Additional structured details about this announcement. */
  metadata?: Record<string, string>;
  /** Output only. State of the resource. New values may be added to this enum when appropriate. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | "DELETING" | "CREATING" | (string & {});
  /** Required. Code of the announcement. Indicates the presence of a VMware Engine related announcement and corresponds to a related message in the `description` field. */
  code?: string;
  /** Optional. Activity type of the announcement There can be only one active announcement for a given activity type and target resource. */
  activityType?: string;
  /** A Cluster resource name. */
  cluster?: string;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. The resource name of the announcement. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/announcements/my-announcement-id` */
  name?: string;
  /** A Private Cloud resource name. */
  privateCloud?: string;
  /** Output only. Creation time of this resource. It also serves as start time of notification. */
  createTime?: string;
  /** Output only. Target Resource Type defines the type of the target for the announcement */
  targetResourceType?: string;
  /** Output only. Description of the announcement. */
  description?: string;
}

export const Announcement: Schema.Schema<Announcement> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  activityType: Schema.optional(Schema.String),
  cluster: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  privateCloud: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  targetResourceType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Announcement" }) as any as Schema.Schema<Announcement>;

export interface ListAnnouncementsResponse {
  /** list of unreachable locations */
  unreachable?: Array<string>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of announcement runs. */
  announcements?: Array<Announcement>;
}

export const ListAnnouncementsResponse: Schema.Schema<ListAnnouncementsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  announcements: Schema.optional(Schema.Array(Announcement)),
})).annotate({ identifier: "ListAnnouncementsResponse" }) as any as Schema.Schema<ListAnnouncementsResponse>;

export interface NetworkService {
  /** Output only. State of the service. New values may be added to this enum when appropriate. */
  state?: "STATE_UNSPECIFIED" | "UNPROVISIONED" | "RECONCILING" | "ACTIVE" | (string & {});
  /** True if the service is enabled; false otherwise. */
  enabled?: boolean;
}

export const NetworkService: Schema.Schema<NetworkService> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NetworkService" }) as any as Schema.Schema<NetworkService>;

export interface NetworkPolicy {
  /** Required. IP address range in CIDR notation used to create internet access and external IP access. An RFC 1918 CIDR block, with a "/26" prefix, is required. The range cannot overlap with any prefixes either in the consumer VPC network or in use by the private clouds attached to that VPC network. */
  edgeServicesCidr?: string;
  /** Network service that allows External IP addresses to be assigned to VMware workloads. This service can only be enabled when `internet_access` is also enabled. */
  externalIp?: NetworkService;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Optional. The relative resource name of the VMware Engine network. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}` can either be a project number or a project ID. */
  vmwareEngineNetwork?: string;
  /** Network service that allows VMware workloads to access the internet. */
  internetAccess?: NetworkService;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Optional. User-provided description for this network policy. */
  description?: string;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Output only. The canonical name of the VMware Engine network in the form: `projects/{project_number}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` */
  vmwareEngineNetworkCanonical?: string;
  /** Output only. Identifier. The resource name of this network policy. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-network-policy` */
  name?: string;
}

export const NetworkPolicy: Schema.Schema<NetworkPolicy> = Schema.suspend(() => Schema.Struct({
  edgeServicesCidr: Schema.optional(Schema.String),
  externalIp: Schema.optional(NetworkService),
  updateTime: Schema.optional(Schema.String),
  vmwareEngineNetwork: Schema.optional(Schema.String),
  internetAccess: Schema.optional(NetworkService),
  uid: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  vmwareEngineNetworkCanonical: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkPolicy" }) as any as Schema.Schema<NetworkPolicy>;

export interface ListNetworkPoliciesResponse {
  /** A token, which can be send as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
  /** A list of network policies. */
  networkPolicies?: Array<NetworkPolicy>;
}

export const ListNetworkPoliciesResponse: Schema.Schema<ListNetworkPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  networkPolicies: Schema.optional(Schema.Array(NetworkPolicy)),
})).annotate({ identifier: "ListNetworkPoliciesResponse" }) as any as Schema.Schema<ListNetworkPoliciesResponse>;

export interface MountDatastoreRequest {
  /** Optional. If set to true, the colocation requirement will be ignored. If set to false, the colocation requirement will be enforced. If not set, the colocation requirement will be enforced. Colocation requirement is the requirement that the cluster must be in the same region/zone of datastore(regional/zonal datastore). */
  ignoreColocation?: boolean;
  /** Required. The datastore mount configuration. */
  datastoreMountConfig?: DatastoreMountConfig;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const MountDatastoreRequest: Schema.Schema<MountDatastoreRequest> = Schema.suspend(() => Schema.Struct({
  ignoreColocation: Schema.optional(Schema.Boolean),
  datastoreMountConfig: Schema.optional(DatastoreMountConfig),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "MountDatastoreRequest" }) as any as Schema.Schema<MountDatastoreRequest>;

export interface ListNodesResponse {
  /** The nodes. */
  nodes?: Array<Node>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListNodesResponse: Schema.Schema<ListNodesResponse> = Schema.suspend(() => Schema.Struct({
  nodes: Schema.optional(Schema.Array(Node)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNodesResponse" }) as any as Schema.Schema<ListNodesResponse>;

export interface PrivateConnection {
  /** Optional. Routing Mode. Default value is set to GLOBAL. For type = PRIVATE_SERVICE_ACCESS, this field can be set to GLOBAL or REGIONAL, for other types only GLOBAL is supported. */
  routingMode?: "ROUTING_MODE_UNSPECIFIED" | "GLOBAL" | "REGIONAL" | (string & {});
  /** Output only. The resource name of the private connection. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateConnections/my-connection` */
  name?: string;
  /** Required. Service network to create private connection. Specify the name in the following form: `projects/{project}/global/networks/{network_id}` For type = PRIVATE_SERVICE_ACCESS, this field represents servicenetworking VPC, e.g. projects/project-tp/global/networks/servicenetworking. For type = NETAPP_CLOUD_VOLUME, this field represents NetApp service VPC, e.g. projects/project-tp/global/networks/netapp-tenant-vpc. For type = DELL_POWERSCALE, this field represent Dell service VPC, e.g. projects/project-tp/global/networks/dell-tenant-vpc. For type= THIRD_PARTY_SERVICE, this field could represent a consumer VPC or any other producer VPC to which the VMware Engine Network needs to be connected, e.g. projects/project/global/networks/vpc. */
  serviceNetwork?: string;
  /** Optional. User-provided description for this private connection. */
  description?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
  /** Output only. Peering state between service network and VMware Engine network. */
  peeringState?: "PEERING_STATE_UNSPECIFIED" | "PEERING_ACTIVE" | "PEERING_INACTIVE" | (string & {});
  /** Output only. The canonical name of the VMware Engine network in the form: `projects/{project_number}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` */
  vmwareEngineNetworkCanonical?: string;
  /** Output only. State of the private connection. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "UNPROVISIONED" | "FAILED" | (string & {});
  /** Output only. VPC network peering id between given network VPC and VMwareEngineNetwork. */
  peeringId?: string;
  /** Required. The relative resource name of Legacy VMware Engine network. Specify the name in the following form: `projects/{project}/locations/{location}/vmwareEngineNetworks/{vmware_engine_network_id}` where `{project}`, `{location}` will be same as specified in private connection resource name and `{vmware_engine_network_id}` will be in the form of `{location}`-default e.g. projects/project/locations/us-central1/vmwareEngineNetworks/us-central1-default. */
  vmwareEngineNetwork?: string;
  /** Required. Private connection type. */
  type?: "TYPE_UNSPECIFIED" | "PRIVATE_SERVICE_ACCESS" | "NETAPP_CLOUD_VOLUMES" | "DELL_POWERSCALE" | "THIRD_PARTY_SERVICE" | (string & {});
  /** Output only. Creation time of this resource. */
  createTime?: string;
}

export const PrivateConnection: Schema.Schema<PrivateConnection> = Schema.suspend(() => Schema.Struct({
  routingMode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  serviceNetwork: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  peeringState: Schema.optional(Schema.String),
  vmwareEngineNetworkCanonical: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  peeringId: Schema.optional(Schema.String),
  vmwareEngineNetwork: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateConnection" }) as any as Schema.Schema<PrivateConnection>;

export interface ListPrivateConnectionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of private connections. */
  privateConnections?: Array<PrivateConnection>;
  /** Unreachable resources. */
  unreachable?: Array<string>;
}

export const ListPrivateConnectionsResponse: Schema.Schema<ListPrivateConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  privateConnections: Schema.optional(Schema.Array(PrivateConnection)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPrivateConnectionsResponse" }) as any as Schema.Schema<ListPrivateConnectionsResponse>;

export interface AcceleratePrivateCloudDeletionRequest {
  /** Optional. Checksum used to ensure that the user-provided value is up to date before the server processes the request. The server compares provided checksum with the current checksum of the resource. If the user-provided value is out of date, this request returns an `ABORTED` error. */
  etag?: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const AcceleratePrivateCloudDeletionRequest: Schema.Schema<AcceleratePrivateCloudDeletionRequest> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceleratePrivateCloudDeletionRequest" }) as any as Schema.Schema<AcceleratePrivateCloudDeletionRequest>;

export interface ForwardingRule {
  /** Required. List of DNS servers to use for domain resolution */
  nameServers?: Array<string>;
  /** Required. Domain used to resolve a `name_servers` list. */
  domain?: string;
}

export const ForwardingRule: Schema.Schema<ForwardingRule> = Schema.suspend(() => Schema.Struct({
  nameServers: Schema.optional(Schema.Array(Schema.String)),
  domain: Schema.optional(Schema.String),
})).annotate({ identifier: "ForwardingRule" }) as any as Schema.Schema<ForwardingRule>;

export interface ListNetworkPeeringsResponse {
  /** A list of network peerings. */
  networkPeerings?: Array<NetworkPeering>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Unreachable resources. */
  unreachable?: Array<string>;
}

export const ListNetworkPeeringsResponse: Schema.Schema<ListNetworkPeeringsResponse> = Schema.suspend(() => Schema.Struct({
  networkPeerings: Schema.optional(Schema.Array(NetworkPeering)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListNetworkPeeringsResponse" }) as any as Schema.Schema<ListNetworkPeeringsResponse>;

export interface ListVmwareEngineNetworksResponse {
  /** A list of VMware Engine networks. */
  vmwareEngineNetworks?: Array<VmwareEngineNetwork>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Unreachable resources. */
  unreachable?: Array<string>;
}

export const ListVmwareEngineNetworksResponse: Schema.Schema<ListVmwareEngineNetworksResponse> = Schema.suspend(() => Schema.Struct({
  vmwareEngineNetworks: Schema.optional(Schema.Array(VmwareEngineNetwork)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListVmwareEngineNetworksResponse" }) as any as Schema.Schema<ListVmwareEngineNetworksResponse>;

export interface ListExternalAccessRulesResponse {
  /** A list of external access firewall rules. */
  externalAccessRules?: Array<ExternalAccessRule>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
}

export const ListExternalAccessRulesResponse: Schema.Schema<ListExternalAccessRulesResponse> = Schema.suspend(() => Schema.Struct({
  externalAccessRules: Schema.optional(Schema.Array(ExternalAccessRule)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListExternalAccessRulesResponse" }) as any as Schema.Schema<ListExternalAccessRulesResponse>;

export interface RevokeDnsBindPermissionRequest {
  /** Required. The consumer provided user/service account which needs to be granted permission to bind with the intranet VPC corresponding to the consumer project. */
  principal?: Principal;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RevokeDnsBindPermissionRequest: Schema.Schema<RevokeDnsBindPermissionRequest> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(Principal),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RevokeDnsBindPermissionRequest" }) as any as Schema.Schema<RevokeDnsBindPermissionRequest>;

export interface DnsForwarding {
  /** Output only. Identifier. The resource name of this DNS profile. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/dnsForwarding` */
  name?: string;
  /** Output only. Creation time of this resource. */
  createTime?: string;
  /** Required. List of domain mappings to configure */
  forwardingRules?: Array<ForwardingRule>;
  /** Output only. Last update time of this resource. */
  updateTime?: string;
}

export const DnsForwarding: Schema.Schema<DnsForwarding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  forwardingRules: Schema.optional(Schema.Array(ForwardingRule)),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsForwarding" }) as any as Schema.Schema<DnsForwarding>;

export interface OperationMetadata {
  /** Output only. True if the user has requested cancellation of the operation; false otherwise. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  requestedCancellation: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface NodeType {
  /** Output only. The amount of storage available, defined in GB. */
  diskSizeGb?: number;
  /** Output only. The friendly name for this node type. For example: ve1-standard-72 */
  displayName?: string;
  /** Output only. The resource name of this node type. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-proj/locations/us-central1-a/nodeTypes/standard-72` */
  name?: string;
  /** Output only. List of possible values of custom core count. */
  availableCustomCoreCounts?: Array<number>;
  /** Output only. The type of the resource. */
  kind?: "KIND_UNSPECIFIED" | "STANDARD" | "STORAGE_ONLY" | (string & {});
  /** Output only. Capabilities of this node type. */
  capabilities?: Array<"CAPABILITY_UNSPECIFIED" | "STRETCHED_CLUSTERS" | (string & {})>;
  /** Output only. The amount of physical memory available, defined in GB. */
  memoryGb?: number;
  /** Output only. The total number of CPU cores in a single node. */
  totalCoreCount?: number;
  /** Output only. The canonical identifier of the node type (corresponds to the `NodeType`). For example: standard-72. */
  nodeTypeId?: string;
  /** Output only. The total number of virtual CPUs in a single node. */
  virtualCpuCount?: number;
  /** Output only. Families of the node type. For node types to be in the same cluster they must share at least one element in the `families`. */
  families?: Array<string>;
}

export const NodeType: Schema.Schema<NodeType> = Schema.suspend(() => Schema.Struct({
  diskSizeGb: Schema.optional(Schema.Number),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  availableCustomCoreCounts: Schema.optional(Schema.Array(Schema.Number)),
  kind: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Array(Schema.String)),
  memoryGb: Schema.optional(Schema.Number),
  totalCoreCount: Schema.optional(Schema.Number),
  nodeTypeId: Schema.optional(Schema.String),
  virtualCpuCount: Schema.optional(Schema.Number),
  families: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NodeType" }) as any as Schema.Schema<NodeType>;

export interface ListNodeTypesResponse {
  /** A list of Node Types. */
  nodeTypes?: Array<NodeType>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
}

export const ListNodeTypesResponse: Schema.Schema<ListNodeTypesResponse> = Schema.suspend(() => Schema.Struct({
  nodeTypes: Schema.optional(Schema.Array(NodeType)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListNodeTypesResponse" }) as any as Schema.Schema<ListNodeTypesResponse>;

export interface RepairManagementDnsZoneBindingRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RepairManagementDnsZoneBindingRequest: Schema.Schema<RepairManagementDnsZoneBindingRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RepairManagementDnsZoneBindingRequest" }) as any as Schema.Schema<RepairManagementDnsZoneBindingRequest>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListDatastoresResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A list of Datastores. */
  datastores?: Array<Datastore>;
  /** Unreachable resources. */
  unreachable?: Array<string>;
}

export const ListDatastoresResponse: Schema.Schema<ListDatastoresResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  datastores: Schema.optional(Schema.Array(Datastore)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDatastoresResponse" }) as any as Schema.Schema<ListDatastoresResponse>;

export interface UndeletePrivateCloudRequest {
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const UndeletePrivateCloudRequest: Schema.Schema<UndeletePrivateCloudRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeletePrivateCloudRequest" }) as any as Schema.Schema<UndeletePrivateCloudRequest>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

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

export interface ResetVcenterCredentialsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The username of the user to be to reset the credentials. The default value of this field is CloudOwner@gve.local. The provided value should be one of the following: solution-user-01@gve.local, solution-user-02@gve.local, solution-user-03@gve.local, solution-user-04@gve.local, solution-user-05@gve.local, zertoadmin@gve.local. */
  username?: string;
}

export const ResetVcenterCredentialsRequest: Schema.Schema<ResetVcenterCredentialsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "ResetVcenterCredentialsRequest" }) as any as Schema.Schema<ResetVcenterCredentialsRequest>;

export interface Subnet {
  /** The IP address range of the subnet in CIDR format '10.0.0.0/24'. */
  ipCidrRange?: string;
  /** Output only. The state of the resource. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "UPDATING" | "DELETING" | "RECONCILING" | "FAILED" | (string & {});
  /** Output only. The type of the subnet. For example "management" or "userDefined". */
  type?: string;
  /** The IP address of the gateway of this subnet. Must fall within the IP prefix defined above. */
  gatewayIp?: string;
  /** Output only. VLAN ID of the VLAN on which the subnet is configured */
  vlanId?: number;
  /** Output only. Identifier. The resource name of this subnet. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/subnets/my-subnet` */
  name?: string;
}

export const Subnet: Schema.Schema<Subnet> = Schema.suspend(() => Schema.Struct({
  ipCidrRange: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  gatewayIp: Schema.optional(Schema.String),
  vlanId: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Subnet" }) as any as Schema.Schema<Subnet>;

export interface ListManagementDnsZoneBindingsResponse {
  /** A list of management DNS zone bindings. */
  managementDnsZoneBindings?: Array<ManagementDnsZoneBinding>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
}

export const ListManagementDnsZoneBindingsResponse: Schema.Schema<ListManagementDnsZoneBindingsResponse> = Schema.suspend(() => Schema.Struct({
  managementDnsZoneBindings: Schema.optional(Schema.Array(ManagementDnsZoneBinding)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListManagementDnsZoneBindingsResponse" }) as any as Schema.Schema<ListManagementDnsZoneBindingsResponse>;

export interface ListSubnetsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
  /** A list of subnets. */
  subnets?: Array<Subnet>;
}

export const ListSubnetsResponse: Schema.Schema<ListSubnetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  subnets: Schema.optional(Schema.Array(Subnet)),
})).annotate({ identifier: "ListSubnetsResponse" }) as any as Schema.Schema<ListSubnetsResponse>;

export interface ListPrivateConnectionPeeringRoutesResponse {
  /** A list of peering routes. */
  peeringRoutes?: Array<PeeringRoute>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPrivateConnectionPeeringRoutesResponse: Schema.Schema<ListPrivateConnectionPeeringRoutesResponse> = Schema.suspend(() => Schema.Struct({
  peeringRoutes: Schema.optional(Schema.Array(PeeringRoute)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPrivateConnectionPeeringRoutesResponse" }) as any as Schema.Schema<ListPrivateConnectionPeeringRoutesResponse>;

export interface HcxActivationKey {
  /** Output only. Creation time of HCX activation key. */
  createTime?: string;
  /** Output only. System-generated unique identifier for the resource. */
  uid?: string;
  /** Output only. State of HCX activation key. */
  state?: "STATE_UNSPECIFIED" | "AVAILABLE" | "CONSUMED" | "CREATING" | (string & {});
  /** Output only. The resource name of this HcxActivationKey. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateClouds/my-cloud/hcxActivationKeys/my-key` */
  name?: string;
  /** Output only. HCX activation key. */
  activationKey?: string;
}

export const HcxActivationKey: Schema.Schema<HcxActivationKey> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  activationKey: Schema.optional(Schema.String),
})).annotate({ identifier: "HcxActivationKey" }) as any as Schema.Schema<HcxActivationKey>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(Operation)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface ListHcxActivationKeysResponse {
  /** List of HCX activation keys. */
  hcxActivationKeys?: Array<HcxActivationKey>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached when making an aggregated query using wildcards. */
  unreachable?: Array<string>;
}

export const ListHcxActivationKeysResponse: Schema.Schema<ListHcxActivationKeysResponse> = Schema.suspend(() => Schema.Struct({
  hcxActivationKeys: Schema.optional(Schema.Array(HcxActivationKey)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListHcxActivationKeysResponse" }) as any as Schema.Schema<ListHcxActivationKeysResponse>;

export interface UnmountDatastoreRequest {
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the datastore to unmount. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/datastores/my-datastore` */
  datastore?: string;
}

export const UnmountDatastoreRequest: Schema.Schema<UnmountDatastoreRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  datastore: Schema.optional(Schema.String),
})).annotate({ identifier: "UnmountDatastoreRequest" }) as any as Schema.Schema<UnmountDatastoreRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
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

/** Gets all the principals having bind permission on the intranet VPC associated with the consumer project granted by the Grant API. DnsBindPermission is a global resource and location can only be global. */
export interface GetDnsBindPermissionProjectsLocationsRequest {
  /** Required. The name of the resource which stores the users/service accounts having the permission to bind to the corresponding intranet VPC of the consumer project. DnsBindPermission is a global resource. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/dnsBindPermission` */
  name: string;
}

export const GetDnsBindPermissionProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsBindPermission" }),
  svc,
) as unknown as Schema.Schema<GetDnsBindPermissionProjectsLocationsRequest>;

export type GetDnsBindPermissionProjectsLocationsResponse = DnsBindPermission;
export const GetDnsBindPermissionProjectsLocationsResponse = DnsBindPermission;

export type GetDnsBindPermissionProjectsLocationsError = CommonErrors;

export const getDnsBindPermissionProjectsLocations: API.OperationMethod<GetDnsBindPermissionProjectsLocationsRequest, GetDnsBindPermissionProjectsLocationsResponse, GetDnsBindPermissionProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDnsBindPermissionProjectsLocationsRequest,
  output: GetDnsBindPermissionProjectsLocationsResponse,
  errors: [],
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

/** Accelerates the deletion of a private cloud that is currently in soft deletion A `PrivateCloud` resource in soft deletion has `PrivateCloud.state` set to `SOFT_DELETED` and `PrivateCloud.expireTime` set to the time when deletion can no longer be reversed. */
export interface PrivateCloudDeletionNowProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of the private cloud in softdeletion. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  name: string;
  /** Request body */
  body?: AcceleratePrivateCloudDeletionRequest;
}

export const PrivateCloudDeletionNowProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AcceleratePrivateCloudDeletionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:privateCloudDeletionNow", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PrivateCloudDeletionNowProjectsLocationsPrivateCloudsRequest>;

export type PrivateCloudDeletionNowProjectsLocationsPrivateCloudsResponse = Operation;
export const PrivateCloudDeletionNowProjectsLocationsPrivateCloudsResponse = Operation;

export type PrivateCloudDeletionNowProjectsLocationsPrivateCloudsError = CommonErrors;

export const privateCloudDeletionNowProjectsLocationsPrivateClouds: API.OperationMethod<PrivateCloudDeletionNowProjectsLocationsPrivateCloudsRequest, PrivateCloudDeletionNowProjectsLocationsPrivateCloudsResponse, PrivateCloudDeletionNowProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PrivateCloudDeletionNowProjectsLocationsPrivateCloudsRequest,
  output: PrivateCloudDeletionNowProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Creates a new `PrivateCloud` resource in a given project and location. Private clouds of type `STANDARD` and `TIME_LIMITED` are zonal resources, `STRETCHED` private clouds are regional. Creating a private cloud also creates a [management cluster](https://cloud.google.com/vmware-engine/docs/concepts-vmware-components) for that private cloud. */
export interface CreateProjectsLocationsPrivateCloudsRequest {
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. True if you want the request to be validated and not executed; false otherwise. */
  validateOnly?: boolean;
  /** Required. The resource name of the location to create the new private cloud in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a` */
  parent: string;
  /** Required. The user-provided identifier of the private cloud to be created. This identifier must be unique among each `PrivateCloud` within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  privateCloudId?: string;
  /** Request body */
  body?: PrivateCloud;
}

export const CreateProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  privateCloudId: Schema.optional(Schema.String).pipe(T.HttpQuery("privateCloudId")),
  body: Schema.optional(PrivateCloud).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateCloudsRequest>;

export type CreateProjectsLocationsPrivateCloudsResponse = Operation;
export const CreateProjectsLocationsPrivateCloudsResponse = Operation;

export type CreateProjectsLocationsPrivateCloudsError = CommonErrors;

export const createProjectsLocationsPrivateClouds: API.OperationMethod<CreateProjectsLocationsPrivateCloudsRequest, CreateProjectsLocationsPrivateCloudsResponse, CreateProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateCloudsRequest,
  output: CreateProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Schedules a `PrivateCloud` resource for deletion. A `PrivateCloud` resource scheduled for deletion has `PrivateCloud.state` set to `DELETED` and `expireTime` set to the time when deletion is final and can no longer be reversed. The delete operation is marked as done as soon as the `PrivateCloud` is successfully scheduled for deletion (this also applies when `delayHours` is set to zero), and the operation is not kept in pending state until `PrivateCloud` is purged. `PrivateCloud` can be restored using `UndeletePrivateCloud` method before the `expireTime` elapses. When `expireTime` is reached, deletion is final and all private cloud resources are irreversibly removed and billing stops. During the final removal process, `PrivateCloud.state` is set to `PURGING`. `PrivateCloud` can be polled using standard `GET` method for the whole period of deletion and purging. It will not be returned only when it is completely purged. */
export interface DeleteProjectsLocationsPrivateCloudsRequest {
  /** Optional. Time delay of the deletion specified in hours. The default value is `3`. Specifying a non-zero value for this field changes the value of `PrivateCloud.state` to `DELETED` and sets `expire_time` to the planned deletion time. Deletion can be cancelled before `expire_time` elapses using VmwareEngine.UndeletePrivateCloud. Specifying a value of `0` for this field instead begins the deletion process and ceases billing immediately. During the final deletion process, the value of `PrivateCloud.state` becomes `PURGING`. */
  delayHours?: number;
  /** Required. The resource name of the private cloud to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  name: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, cascade delete is enabled and all children of this private cloud resource are also deleted. When this flag is set to false, the private cloud will not be deleted if there are any children other than the management cluster. The management cluster is always deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  delayHours: Schema.optional(Schema.Number).pipe(T.HttpQuery("delayHours")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateCloudsRequest>;

export type DeleteProjectsLocationsPrivateCloudsResponse = Operation;
export const DeleteProjectsLocationsPrivateCloudsResponse = Operation;

export type DeleteProjectsLocationsPrivateCloudsError = CommonErrors;

export const deleteProjectsLocationsPrivateClouds: API.OperationMethod<DeleteProjectsLocationsPrivateCloudsRequest, DeleteProjectsLocationsPrivateCloudsResponse, DeleteProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateCloudsRequest,
  output: DeleteProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Gets details of the `DnsForwarding` config. */
export interface GetDnsForwardingProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of a `DnsForwarding` to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/dnsForwarding` */
  name: string;
}

export const GetDnsForwardingProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/dnsForwarding" }),
  svc,
) as unknown as Schema.Schema<GetDnsForwardingProjectsLocationsPrivateCloudsRequest>;

export type GetDnsForwardingProjectsLocationsPrivateCloudsResponse = DnsForwarding;
export const GetDnsForwardingProjectsLocationsPrivateCloudsResponse = DnsForwarding;

export type GetDnsForwardingProjectsLocationsPrivateCloudsError = CommonErrors;

export const getDnsForwardingProjectsLocationsPrivateClouds: API.OperationMethod<GetDnsForwardingProjectsLocationsPrivateCloudsRequest, GetDnsForwardingProjectsLocationsPrivateCloudsResponse, GetDnsForwardingProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDnsForwardingProjectsLocationsPrivateCloudsRequest,
  output: GetDnsForwardingProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Restores a private cloud that was previously scheduled for deletion by `DeletePrivateCloud`. A `PrivateCloud` resource scheduled for deletion has `PrivateCloud.state` set to `DELETED` and `PrivateCloud.expireTime` set to the time when deletion can no longer be reversed. */
export interface UndeleteProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of the private cloud scheduled for deletion. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  name: string;
  /** Request body */
  body?: UndeletePrivateCloudRequest;
}

export const UndeleteProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeletePrivateCloudRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsLocationsPrivateCloudsRequest>;

export type UndeleteProjectsLocationsPrivateCloudsResponse = Operation;
export const UndeleteProjectsLocationsPrivateCloudsResponse = Operation;

export type UndeleteProjectsLocationsPrivateCloudsError = CommonErrors;

export const undeleteProjectsLocationsPrivateClouds: API.OperationMethod<UndeleteProjectsLocationsPrivateCloudsRequest, UndeleteProjectsLocationsPrivateCloudsResponse, UndeleteProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsLocationsPrivateCloudsRequest,
  output: UndeleteProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsPrivateCloudsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsPrivateCloudsRequest>;

export type TestIamPermissionsProjectsLocationsPrivateCloudsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsPrivateCloudsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsPrivateCloudsError = CommonErrors;

export const testIamPermissionsProjectsLocationsPrivateClouds: API.OperationMethod<TestIamPermissionsProjectsLocationsPrivateCloudsRequest, TestIamPermissionsProjectsLocationsPrivateCloudsResponse, TestIamPermissionsProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsPrivateCloudsRequest,
  output: TestIamPermissionsProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Gets details of credentials for NSX appliance. */
export interface ShowNsxCredentialsProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of the private cloud to be queried for credentials. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  privateCloud: string;
}

export const ShowNsxCredentialsProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  privateCloud: Schema.String.pipe(T.HttpPath("privateCloud")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:showNsxCredentials" }),
  svc,
) as unknown as Schema.Schema<ShowNsxCredentialsProjectsLocationsPrivateCloudsRequest>;

export type ShowNsxCredentialsProjectsLocationsPrivateCloudsResponse = Credentials;
export const ShowNsxCredentialsProjectsLocationsPrivateCloudsResponse = Credentials;

export type ShowNsxCredentialsProjectsLocationsPrivateCloudsError = CommonErrors;

export const showNsxCredentialsProjectsLocationsPrivateClouds: API.OperationMethod<ShowNsxCredentialsProjectsLocationsPrivateCloudsRequest, ShowNsxCredentialsProjectsLocationsPrivateCloudsResponse, ShowNsxCredentialsProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ShowNsxCredentialsProjectsLocationsPrivateCloudsRequest,
  output: ShowNsxCredentialsProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsPrivateCloudsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsPrivateCloudsRequest>;

export type SetIamPolicyProjectsLocationsPrivateCloudsResponse = Policy;
export const SetIamPolicyProjectsLocationsPrivateCloudsResponse = Policy;

export type SetIamPolicyProjectsLocationsPrivateCloudsError = CommonErrors;

export const setIamPolicyProjectsLocationsPrivateClouds: API.OperationMethod<SetIamPolicyProjectsLocationsPrivateCloudsRequest, SetIamPolicyProjectsLocationsPrivateCloudsResponse, SetIamPolicyProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsPrivateCloudsRequest,
  output: SetIamPolicyProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Updates the parameters of the `DnsForwarding` config, like associated domains. Only fields specified in `update_mask` are applied. */
export interface UpdateDnsForwardingProjectsLocationsPrivateCloudsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the `DnsForwarding` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. Identifier. The resource name of this DNS profile. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/dnsForwarding` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: DnsForwarding;
}

export const UpdateDnsForwardingProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(DnsForwarding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/dnsForwarding", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDnsForwardingProjectsLocationsPrivateCloudsRequest>;

export type UpdateDnsForwardingProjectsLocationsPrivateCloudsResponse = Operation;
export const UpdateDnsForwardingProjectsLocationsPrivateCloudsResponse = Operation;

export type UpdateDnsForwardingProjectsLocationsPrivateCloudsError = CommonErrors;

export const updateDnsForwardingProjectsLocationsPrivateClouds: API.OperationMethod<UpdateDnsForwardingProjectsLocationsPrivateCloudsRequest, UpdateDnsForwardingProjectsLocationsPrivateCloudsResponse, UpdateDnsForwardingProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDnsForwardingProjectsLocationsPrivateCloudsRequest,
  output: UpdateDnsForwardingProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Resets credentials of the NSX appliance. */
export interface ResetNsxCredentialsProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of the private cloud to reset credentials for. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  privateCloud: string;
  /** Request body */
  body?: ResetNsxCredentialsRequest;
}

export const ResetNsxCredentialsProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  privateCloud: Schema.String.pipe(T.HttpPath("privateCloud")),
  body: Schema.optional(ResetNsxCredentialsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:resetNsxCredentials", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetNsxCredentialsProjectsLocationsPrivateCloudsRequest>;

export type ResetNsxCredentialsProjectsLocationsPrivateCloudsResponse = Operation;
export const ResetNsxCredentialsProjectsLocationsPrivateCloudsResponse = Operation;

export type ResetNsxCredentialsProjectsLocationsPrivateCloudsError = CommonErrors;

export const resetNsxCredentialsProjectsLocationsPrivateClouds: API.OperationMethod<ResetNsxCredentialsProjectsLocationsPrivateCloudsRequest, ResetNsxCredentialsProjectsLocationsPrivateCloudsResponse, ResetNsxCredentialsProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetNsxCredentialsProjectsLocationsPrivateCloudsRequest,
  output: ResetNsxCredentialsProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Retrieves a `PrivateCloud` resource by its resource name. */
export interface GetProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of the private cloud to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsRequest>;

export type GetProjectsLocationsPrivateCloudsResponse = PrivateCloud;
export const GetProjectsLocationsPrivateCloudsResponse = PrivateCloud;

export type GetProjectsLocationsPrivateCloudsError = CommonErrors;

export const getProjectsLocationsPrivateClouds: API.OperationMethod<GetProjectsLocationsPrivateCloudsRequest, GetProjectsLocationsPrivateCloudsResponse, GetProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsRequest,
  output: GetProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Modifies a `PrivateCloud` resource. Only the following fields can be updated: `description`. Only fields specified in `updateMask` are applied. During operation processing, the resource is temporarily in the `ACTIVE` state before the operation fully completes. For that period of time, you can't update the resource. Use the operation status to determine when the processing fully completes. */
export interface PatchProjectsLocationsPrivateCloudsRequest {
  /** Output only. Identifier. The resource name of this private cloud. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  name: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `PrivateCloud` resource by the update. The fields specified in `updateMask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: PrivateCloud;
}

export const PatchProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PrivateCloud).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsRequest>;

export type PatchProjectsLocationsPrivateCloudsResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsError = CommonErrors;

export const patchProjectsLocationsPrivateClouds: API.OperationMethod<PatchProjectsLocationsPrivateCloudsRequest, PatchProjectsLocationsPrivateCloudsResponse, PatchProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsRequest,
  output: PatchProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Gets details of credentials for Vcenter appliance. */
export interface ShowVcenterCredentialsProjectsLocationsPrivateCloudsRequest {
  /** Optional. The username of the user to be queried for credentials. The default value of this field is CloudOwner@gve.local. The provided value must be one of the following: CloudOwner@gve.local, solution-user-01@gve.local, solution-user-02@gve.local, solution-user-03@gve.local, solution-user-04@gve.local, solution-user-05@gve.local, zertoadmin@gve.local. */
  username?: string;
  /** Required. The resource name of the private cloud to be queried for credentials. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  privateCloud: string;
}

export const ShowVcenterCredentialsProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  username: Schema.optional(Schema.String).pipe(T.HttpQuery("username")),
  privateCloud: Schema.String.pipe(T.HttpPath("privateCloud")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:showVcenterCredentials" }),
  svc,
) as unknown as Schema.Schema<ShowVcenterCredentialsProjectsLocationsPrivateCloudsRequest>;

export type ShowVcenterCredentialsProjectsLocationsPrivateCloudsResponse = Credentials;
export const ShowVcenterCredentialsProjectsLocationsPrivateCloudsResponse = Credentials;

export type ShowVcenterCredentialsProjectsLocationsPrivateCloudsError = CommonErrors;

export const showVcenterCredentialsProjectsLocationsPrivateClouds: API.OperationMethod<ShowVcenterCredentialsProjectsLocationsPrivateCloudsRequest, ShowVcenterCredentialsProjectsLocationsPrivateCloudsResponse, ShowVcenterCredentialsProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ShowVcenterCredentialsProjectsLocationsPrivateCloudsRequest,
  output: ShowVcenterCredentialsProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsPrivateCloudsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsPrivateCloudsRequest>;

export type GetIamPolicyProjectsLocationsPrivateCloudsResponse = Policy;
export const GetIamPolicyProjectsLocationsPrivateCloudsResponse = Policy;

export type GetIamPolicyProjectsLocationsPrivateCloudsError = CommonErrors;

export const getIamPolicyProjectsLocationsPrivateClouds: API.OperationMethod<GetIamPolicyProjectsLocationsPrivateCloudsRequest, GetIamPolicyProjectsLocationsPrivateCloudsResponse, GetIamPolicyProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsPrivateCloudsRequest,
  output: GetIamPolicyProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Resets credentials of the Vcenter appliance. */
export interface ResetVcenterCredentialsProjectsLocationsPrivateCloudsRequest {
  /** Required. The resource name of the private cloud to reset credentials for. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  privateCloud: string;
  /** Request body */
  body?: ResetVcenterCredentialsRequest;
}

export const ResetVcenterCredentialsProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  privateCloud: Schema.String.pipe(T.HttpPath("privateCloud")),
  body: Schema.optional(ResetVcenterCredentialsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}:resetVcenterCredentials", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetVcenterCredentialsProjectsLocationsPrivateCloudsRequest>;

export type ResetVcenterCredentialsProjectsLocationsPrivateCloudsResponse = Operation;
export const ResetVcenterCredentialsProjectsLocationsPrivateCloudsResponse = Operation;

export type ResetVcenterCredentialsProjectsLocationsPrivateCloudsError = CommonErrors;

export const resetVcenterCredentialsProjectsLocationsPrivateClouds: API.OperationMethod<ResetVcenterCredentialsProjectsLocationsPrivateCloudsRequest, ResetVcenterCredentialsProjectsLocationsPrivateCloudsResponse, ResetVcenterCredentialsProjectsLocationsPrivateCloudsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetVcenterCredentialsProjectsLocationsPrivateCloudsRequest,
  output: ResetVcenterCredentialsProjectsLocationsPrivateCloudsResponse,
  errors: [],
}));

/** Lists `PrivateCloud` resources in a given project and location. */
export interface ListProjectsLocationsPrivateCloudsRequest {
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** Required. The resource name of the private cloud to be queried for clusters. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a` */
  parent: string;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of private clouds, you can exclude the ones named `example-pc` by specifying `name != "example-pc"`. You can also filter nested fields. For example, you could specify `networkConfig.managementCidr = "192.168.0.0/24"` to include private clouds only if they have a matching address in their network configuration. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-pc") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "private-cloud-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "private-cloud-2") ``` */
  filter?: string;
  /** The maximum number of private clouds to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListPrivateClouds` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPrivateClouds` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPrivateCloudsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsRequest>;

export type ListProjectsLocationsPrivateCloudsResponse = ListPrivateCloudsResponse;
export const ListProjectsLocationsPrivateCloudsResponse = ListPrivateCloudsResponse;

export type ListProjectsLocationsPrivateCloudsError = CommonErrors;

export const listProjectsLocationsPrivateClouds = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsRequest,
  output: ListProjectsLocationsPrivateCloudsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsPrivateCloudsClustersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsPrivateCloudsClustersRequest>;

export type TestIamPermissionsProjectsLocationsPrivateCloudsClustersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsPrivateCloudsClustersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const testIamPermissionsProjectsLocationsPrivateCloudsClusters: API.OperationMethod<TestIamPermissionsProjectsLocationsPrivateCloudsClustersRequest, TestIamPermissionsProjectsLocationsPrivateCloudsClustersResponse, TestIamPermissionsProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsPrivateCloudsClustersRequest,
  output: TestIamPermissionsProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Lists `Cluster` resources in a given private cloud. */
export interface ListProjectsLocationsPrivateCloudsClustersRequest {
  /** The maximum number of clusters to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListClusters` must match the call that provided the page token. */
  pageToken?: string;
  /** To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-cluster") (nodeCount = "3") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-cluster-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-cluster-2") ``` */
  filter?: string;
  /** Required. The resource name of the private cloud to query for clusters. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
}

export const ListProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsClustersRequest>;

export type ListProjectsLocationsPrivateCloudsClustersResponse = ListClustersResponse;
export const ListProjectsLocationsPrivateCloudsClustersResponse = ListClustersResponse;

export type ListProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const listProjectsLocationsPrivateCloudsClusters = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsClustersRequest,
  output: ListProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsPrivateCloudsClustersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsPrivateCloudsClustersRequest>;

export type SetIamPolicyProjectsLocationsPrivateCloudsClustersResponse = Policy;
export const SetIamPolicyProjectsLocationsPrivateCloudsClustersResponse = Policy;

export type SetIamPolicyProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const setIamPolicyProjectsLocationsPrivateCloudsClusters: API.OperationMethod<SetIamPolicyProjectsLocationsPrivateCloudsClustersRequest, SetIamPolicyProjectsLocationsPrivateCloudsClustersResponse, SetIamPolicyProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsPrivateCloudsClustersRequest,
  output: SetIamPolicyProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Creates a new cluster in a given private cloud. Creating a new cluster provides additional nodes for use in the parent private cloud and requires sufficient [node quota](https://cloud.google.com/vmware-engine/quotas). */
export interface CreateProjectsLocationsPrivateCloudsClustersRequest {
  /** Optional. True if you want the request to be validated and not executed; false otherwise. */
  validateOnly?: boolean;
  /** Required. The user-provided identifier of the new `Cluster`. This identifier must be unique among clusters within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  clusterId?: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the private cloud to create a new cluster in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** Request body */
  body?: Cluster;
}

export const CreateProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateCloudsClustersRequest>;

export type CreateProjectsLocationsPrivateCloudsClustersResponse = Operation;
export const CreateProjectsLocationsPrivateCloudsClustersResponse = Operation;

export type CreateProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const createProjectsLocationsPrivateCloudsClusters: API.OperationMethod<CreateProjectsLocationsPrivateCloudsClustersRequest, CreateProjectsLocationsPrivateCloudsClustersResponse, CreateProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateCloudsClustersRequest,
  output: CreateProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Mounts a `Datastore` on a cluster resource */
export interface MountDatastoreProjectsLocationsPrivateCloudsClustersRequest {
  /** Required. The resource name of the cluster to mount the datastore. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  name: string;
  /** Request body */
  body?: MountDatastoreRequest;
}

export const MountDatastoreProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MountDatastoreRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}:mountDatastore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MountDatastoreProjectsLocationsPrivateCloudsClustersRequest>;

export type MountDatastoreProjectsLocationsPrivateCloudsClustersResponse = Operation;
export const MountDatastoreProjectsLocationsPrivateCloudsClustersResponse = Operation;

export type MountDatastoreProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const mountDatastoreProjectsLocationsPrivateCloudsClusters: API.OperationMethod<MountDatastoreProjectsLocationsPrivateCloudsClustersRequest, MountDatastoreProjectsLocationsPrivateCloudsClustersResponse, MountDatastoreProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MountDatastoreProjectsLocationsPrivateCloudsClustersRequest,
  output: MountDatastoreProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsPrivateCloudsClustersRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsPrivateCloudsClustersRequest>;

export type GetIamPolicyProjectsLocationsPrivateCloudsClustersResponse = Policy;
export const GetIamPolicyProjectsLocationsPrivateCloudsClustersResponse = Policy;

export type GetIamPolicyProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const getIamPolicyProjectsLocationsPrivateCloudsClusters: API.OperationMethod<GetIamPolicyProjectsLocationsPrivateCloudsClustersRequest, GetIamPolicyProjectsLocationsPrivateCloudsClustersResponse, GetIamPolicyProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsPrivateCloudsClustersRequest,
  output: GetIamPolicyProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Retrieves a `Cluster` resource by its resource name. */
export interface GetProjectsLocationsPrivateCloudsClustersRequest {
  /** Required. The cluster resource name to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsClustersRequest>;

export type GetProjectsLocationsPrivateCloudsClustersResponse = Cluster;
export const GetProjectsLocationsPrivateCloudsClustersResponse = Cluster;

export type GetProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const getProjectsLocationsPrivateCloudsClusters: API.OperationMethod<GetProjectsLocationsPrivateCloudsClustersRequest, GetProjectsLocationsPrivateCloudsClustersResponse, GetProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsClustersRequest,
  output: GetProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Modifies a `Cluster` resource. Only fields specified in `updateMask` are applied. During operation processing, the resource is temporarily in the `ACTIVE` state before the operation fully completes. For that period of time, you can't update the resource. Use the operation status to determine when the processing fully completes. */
export interface PatchProjectsLocationsPrivateCloudsClustersRequest {
  /** Optional. True if you want the request to be validated and not executed; false otherwise. */
  validateOnly?: boolean;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Cluster` resource by the update. The fields specified in the `updateMask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. Identifier. The resource name of this cluster. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  name: string;
  /** Request body */
  body?: Cluster;
}

export const PatchProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsClustersRequest>;

export type PatchProjectsLocationsPrivateCloudsClustersResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsClustersResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const patchProjectsLocationsPrivateCloudsClusters: API.OperationMethod<PatchProjectsLocationsPrivateCloudsClustersRequest, PatchProjectsLocationsPrivateCloudsClustersResponse, PatchProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsClustersRequest,
  output: PatchProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Unmounts a `Datastore` on a cluster resource */
export interface UnmountDatastoreProjectsLocationsPrivateCloudsClustersRequest {
  /** Required. The resource name of the cluster to unmount the datastore. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  name: string;
  /** Request body */
  body?: UnmountDatastoreRequest;
}

export const UnmountDatastoreProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnmountDatastoreRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}:unmountDatastore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnmountDatastoreProjectsLocationsPrivateCloudsClustersRequest>;

export type UnmountDatastoreProjectsLocationsPrivateCloudsClustersResponse = Operation;
export const UnmountDatastoreProjectsLocationsPrivateCloudsClustersResponse = Operation;

export type UnmountDatastoreProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const unmountDatastoreProjectsLocationsPrivateCloudsClusters: API.OperationMethod<UnmountDatastoreProjectsLocationsPrivateCloudsClustersRequest, UnmountDatastoreProjectsLocationsPrivateCloudsClustersResponse, UnmountDatastoreProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnmountDatastoreProjectsLocationsPrivateCloudsClustersRequest,
  output: UnmountDatastoreProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Deletes a `Cluster` resource. To avoid unintended data loss, migrate or gracefully shut down any workloads running on the cluster before deletion. You cannot delete the management cluster of a private cloud using this method. */
export interface DeleteProjectsLocationsPrivateCloudsClustersRequest {
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the cluster to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  name: string;
}

export const DeleteProjectsLocationsPrivateCloudsClustersRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateCloudsClustersRequest>;

export type DeleteProjectsLocationsPrivateCloudsClustersResponse = Operation;
export const DeleteProjectsLocationsPrivateCloudsClustersResponse = Operation;

export type DeleteProjectsLocationsPrivateCloudsClustersError = CommonErrors;

export const deleteProjectsLocationsPrivateCloudsClusters: API.OperationMethod<DeleteProjectsLocationsPrivateCloudsClustersRequest, DeleteProjectsLocationsPrivateCloudsClustersResponse, DeleteProjectsLocationsPrivateCloudsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateCloudsClustersRequest,
  output: DeleteProjectsLocationsPrivateCloudsClustersResponse,
  errors: [],
}));

/** Gets details of a single node. */
export interface GetProjectsLocationsPrivateCloudsClustersNodesRequest {
  /** Required. The resource name of the node to retrieve. For example: `projects/{project}/locations/{location}/privateClouds/{private_cloud}/clusters/{cluster}/nodes/{node}` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsClustersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}/nodes/{nodesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsClustersNodesRequest>;

export type GetProjectsLocationsPrivateCloudsClustersNodesResponse = Node;
export const GetProjectsLocationsPrivateCloudsClustersNodesResponse = Node;

export type GetProjectsLocationsPrivateCloudsClustersNodesError = CommonErrors;

export const getProjectsLocationsPrivateCloudsClustersNodes: API.OperationMethod<GetProjectsLocationsPrivateCloudsClustersNodesRequest, GetProjectsLocationsPrivateCloudsClustersNodesResponse, GetProjectsLocationsPrivateCloudsClustersNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsClustersNodesRequest,
  output: GetProjectsLocationsPrivateCloudsClustersNodesResponse,
  errors: [],
}));

/** Lists nodes in a given cluster. */
export interface ListProjectsLocationsPrivateCloudsClustersNodesRequest {
  /** Required. The resource name of the cluster to be queried for nodes. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/clusters/my-cluster` */
  parent: string;
  /** The maximum number of nodes to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListNodes` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListNodes` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPrivateCloudsClustersNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/clusters/{clustersId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsClustersNodesRequest>;

export type ListProjectsLocationsPrivateCloudsClustersNodesResponse = ListNodesResponse;
export const ListProjectsLocationsPrivateCloudsClustersNodesResponse = ListNodesResponse;

export type ListProjectsLocationsPrivateCloudsClustersNodesError = CommonErrors;

export const listProjectsLocationsPrivateCloudsClustersNodes = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsClustersNodesRequest,
  output: ListProjectsLocationsPrivateCloudsClustersNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single external IP address. When you delete an external IP address, connectivity between the external IP address and the corresponding internal IP address is lost. */
export interface DeleteProjectsLocationsPrivateCloudsExternalAddressesRequest {
  /** Required. The resource name of the external IP address to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/externalAddresses/my-ip` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsPrivateCloudsExternalAddressesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/externalAddresses/{externalAddressesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateCloudsExternalAddressesRequest>;

export type DeleteProjectsLocationsPrivateCloudsExternalAddressesResponse = Operation;
export const DeleteProjectsLocationsPrivateCloudsExternalAddressesResponse = Operation;

export type DeleteProjectsLocationsPrivateCloudsExternalAddressesError = CommonErrors;

export const deleteProjectsLocationsPrivateCloudsExternalAddresses: API.OperationMethod<DeleteProjectsLocationsPrivateCloudsExternalAddressesRequest, DeleteProjectsLocationsPrivateCloudsExternalAddressesResponse, DeleteProjectsLocationsPrivateCloudsExternalAddressesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateCloudsExternalAddressesRequest,
  output: DeleteProjectsLocationsPrivateCloudsExternalAddressesResponse,
  errors: [],
}));

/** Lists external IP addresses assigned to VMware workload VMs in a given private cloud. */
export interface ListProjectsLocationsPrivateCloudsExternalAddressesRequest {
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of IP addresses, you can exclude the ones named `example-ip` by specifying `name != "example-ip"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-ip") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-ip-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-ip-2") ``` */
  filter?: string;
  /** A page token, received from a previous `ListExternalAddresses` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListExternalAddresses` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of external IP addresses to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** Required. The resource name of the private cloud to be queried for external IP addresses. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
}

export const ListProjectsLocationsPrivateCloudsExternalAddressesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/externalAddresses" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsExternalAddressesRequest>;

export type ListProjectsLocationsPrivateCloudsExternalAddressesResponse = ListExternalAddressesResponse;
export const ListProjectsLocationsPrivateCloudsExternalAddressesResponse = ListExternalAddressesResponse;

export type ListProjectsLocationsPrivateCloudsExternalAddressesError = CommonErrors;

export const listProjectsLocationsPrivateCloudsExternalAddresses = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsExternalAddressesRequest,
  output: ListProjectsLocationsPrivateCloudsExternalAddressesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the parameters of a single external IP address. Only fields specified in `update_mask` are applied. During operation processing, the resource is temporarily in the `ACTIVE` state before the operation fully completes. For that period of time, you can't update the resource. Use the operation status to determine when the processing fully completes. */
export interface PatchProjectsLocationsPrivateCloudsExternalAddressesRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the `ExternalAddress` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. Identifier. The resource name of this external IP address. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/externalAddresses/my-address` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ExternalAddress;
}

export const PatchProjectsLocationsPrivateCloudsExternalAddressesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ExternalAddress).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/externalAddresses/{externalAddressesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsExternalAddressesRequest>;

export type PatchProjectsLocationsPrivateCloudsExternalAddressesResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsExternalAddressesResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsExternalAddressesError = CommonErrors;

export const patchProjectsLocationsPrivateCloudsExternalAddresses: API.OperationMethod<PatchProjectsLocationsPrivateCloudsExternalAddressesRequest, PatchProjectsLocationsPrivateCloudsExternalAddressesResponse, PatchProjectsLocationsPrivateCloudsExternalAddressesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsExternalAddressesRequest,
  output: PatchProjectsLocationsPrivateCloudsExternalAddressesResponse,
  errors: [],
}));

/** Creates a new `ExternalAddress` resource in a given private cloud. The network policy that corresponds to the private cloud must have the external IP address network service enabled (`NetworkPolicy.external_ip`). */
export interface CreateProjectsLocationsPrivateCloudsExternalAddressesRequest {
  /** Required. The resource name of the private cloud to create a new external IP address in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** Required. The user-provided identifier of the `ExternalAddress` to be created. This identifier must be unique among `ExternalAddress` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  externalAddressId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ExternalAddress;
}

export const CreateProjectsLocationsPrivateCloudsExternalAddressesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  externalAddressId: Schema.optional(Schema.String).pipe(T.HttpQuery("externalAddressId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ExternalAddress).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/externalAddresses", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateCloudsExternalAddressesRequest>;

export type CreateProjectsLocationsPrivateCloudsExternalAddressesResponse = Operation;
export const CreateProjectsLocationsPrivateCloudsExternalAddressesResponse = Operation;

export type CreateProjectsLocationsPrivateCloudsExternalAddressesError = CommonErrors;

export const createProjectsLocationsPrivateCloudsExternalAddresses: API.OperationMethod<CreateProjectsLocationsPrivateCloudsExternalAddressesRequest, CreateProjectsLocationsPrivateCloudsExternalAddressesResponse, CreateProjectsLocationsPrivateCloudsExternalAddressesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateCloudsExternalAddressesRequest,
  output: CreateProjectsLocationsPrivateCloudsExternalAddressesResponse,
  errors: [],
}));

/** Gets details of a single external IP address. */
export interface GetProjectsLocationsPrivateCloudsExternalAddressesRequest {
  /** Required. The resource name of the external IP address to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/externalAddresses/my-ip` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsExternalAddressesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/externalAddresses/{externalAddressesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsExternalAddressesRequest>;

export type GetProjectsLocationsPrivateCloudsExternalAddressesResponse = ExternalAddress;
export const GetProjectsLocationsPrivateCloudsExternalAddressesResponse = ExternalAddress;

export type GetProjectsLocationsPrivateCloudsExternalAddressesError = CommonErrors;

export const getProjectsLocationsPrivateCloudsExternalAddresses: API.OperationMethod<GetProjectsLocationsPrivateCloudsExternalAddressesRequest, GetProjectsLocationsPrivateCloudsExternalAddressesResponse, GetProjectsLocationsPrivateCloudsExternalAddressesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsExternalAddressesRequest,
  output: GetProjectsLocationsPrivateCloudsExternalAddressesResponse,
  errors: [],
}));

/** Gets details of a single subnet. */
export interface GetProjectsLocationsPrivateCloudsSubnetsRequest {
  /** Required. The resource name of the subnet to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/subnets/my-subnet` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsSubnetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/subnets/{subnetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsSubnetsRequest>;

export type GetProjectsLocationsPrivateCloudsSubnetsResponse = Subnet;
export const GetProjectsLocationsPrivateCloudsSubnetsResponse = Subnet;

export type GetProjectsLocationsPrivateCloudsSubnetsError = CommonErrors;

export const getProjectsLocationsPrivateCloudsSubnets: API.OperationMethod<GetProjectsLocationsPrivateCloudsSubnetsRequest, GetProjectsLocationsPrivateCloudsSubnetsResponse, GetProjectsLocationsPrivateCloudsSubnetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsSubnetsRequest,
  output: GetProjectsLocationsPrivateCloudsSubnetsResponse,
  errors: [],
}));

/** Updates the parameters of a single subnet. Only fields specified in `update_mask` are applied. *Note*: This API is synchronous and always returns a successful `google.longrunning.Operation` (LRO). The returned LRO will only have `done` and `response` fields. */
export interface PatchProjectsLocationsPrivateCloudsSubnetsRequest {
  /** Output only. Identifier. The resource name of this subnet. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/subnets/my-subnet` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Subnet` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Subnet;
}

export const PatchProjectsLocationsPrivateCloudsSubnetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Subnet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/subnets/{subnetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsSubnetsRequest>;

export type PatchProjectsLocationsPrivateCloudsSubnetsResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsSubnetsResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsSubnetsError = CommonErrors;

export const patchProjectsLocationsPrivateCloudsSubnets: API.OperationMethod<PatchProjectsLocationsPrivateCloudsSubnetsRequest, PatchProjectsLocationsPrivateCloudsSubnetsResponse, PatchProjectsLocationsPrivateCloudsSubnetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsSubnetsRequest,
  output: PatchProjectsLocationsPrivateCloudsSubnetsResponse,
  errors: [],
}));

/** Lists subnets in a given private cloud. */
export interface ListProjectsLocationsPrivateCloudsSubnetsRequest {
  /** Required. The resource name of the private cloud to be queried for subnets. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** The maximum number of subnets to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListSubnetsRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubnetsRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPrivateCloudsSubnetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/subnets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsSubnetsRequest>;

export type ListProjectsLocationsPrivateCloudsSubnetsResponse = ListSubnetsResponse;
export const ListProjectsLocationsPrivateCloudsSubnetsResponse = ListSubnetsResponse;

export type ListProjectsLocationsPrivateCloudsSubnetsError = CommonErrors;

export const listProjectsLocationsPrivateCloudsSubnets = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsSubnetsRequest,
  output: ListProjectsLocationsPrivateCloudsSubnetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists past, ongoing and upcoming `Upgrades` for the given private cloud. */
export interface ListProjectsLocationsPrivateCloudsUpgradesRequest {
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of upgrades, you can exclude the ones named `example-upgrade1` by specifying `name != "example-upgrade1"`. You can also filter nested fields. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-upgrade") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "upgrade-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "upgrade-2") ``` */
  filter?: string;
  /** A page token, received from a previous `ListUpgrades` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUpgrades` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of `Upgrades` to return in one page. The service may return fewer resources than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** Required. Query a list of `Upgrades` for the given private cloud resource name. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/privateClouds/my-cloud` */
  parent: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
}

export const ListProjectsLocationsPrivateCloudsUpgradesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/upgrades" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsUpgradesRequest>;

export type ListProjectsLocationsPrivateCloudsUpgradesResponse = ListUpgradesResponse;
export const ListProjectsLocationsPrivateCloudsUpgradesResponse = ListUpgradesResponse;

export type ListProjectsLocationsPrivateCloudsUpgradesError = CommonErrors;

export const listProjectsLocationsPrivateCloudsUpgrades = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsUpgradesRequest,
  output: ListProjectsLocationsPrivateCloudsUpgradesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a private cloud `Upgrade` resource by its resource name. */
export interface GetProjectsLocationsPrivateCloudsUpgradesRequest {
  /** Required. The name of the `Upgrade` resource to be retrieved. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/privateClouds/my-cloud/upgrades/my-upgrade` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsUpgradesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/upgrades/{upgradesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsUpgradesRequest>;

export type GetProjectsLocationsPrivateCloudsUpgradesResponse = Upgrade;
export const GetProjectsLocationsPrivateCloudsUpgradesResponse = Upgrade;

export type GetProjectsLocationsPrivateCloudsUpgradesError = CommonErrors;

export const getProjectsLocationsPrivateCloudsUpgrades: API.OperationMethod<GetProjectsLocationsPrivateCloudsUpgradesRequest, GetProjectsLocationsPrivateCloudsUpgradesResponse, GetProjectsLocationsPrivateCloudsUpgradesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsUpgradesRequest,
  output: GetProjectsLocationsPrivateCloudsUpgradesResponse,
  errors: [],
}));

/** Update the private cloud `Upgrade` resource. Only `schedule` field can updated. The schedule can only be updated when the upgrade has not started and schedule edit window is open. Only fields specified in `update_mask` are considered. */
export interface PatchProjectsLocationsPrivateCloudsUpgradesRequest {
  /** Output only. Identifier. The resource name of the private cloud `Upgrade`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/privateClouds/my-cloud/upgrades/my-upgrade` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Upgrade` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Upgrade;
}

export const PatchProjectsLocationsPrivateCloudsUpgradesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Upgrade).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/upgrades/{upgradesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsUpgradesRequest>;

export type PatchProjectsLocationsPrivateCloudsUpgradesResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsUpgradesResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsUpgradesError = CommonErrors;

export const patchProjectsLocationsPrivateCloudsUpgrades: API.OperationMethod<PatchProjectsLocationsPrivateCloudsUpgradesRequest, PatchProjectsLocationsPrivateCloudsUpgradesResponse, PatchProjectsLocationsPrivateCloudsUpgradesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsUpgradesRequest,
  output: PatchProjectsLocationsPrivateCloudsUpgradesResponse,
  errors: [],
}));

/** Updates a `ManagementDnsZoneBinding` resource. Only fields specified in `update_mask` are applied. */
export interface PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Output only. The resource name of this binding. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/managementDnsZoneBindings/my-management-dns-zone-binding` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `ManagementDnsZoneBinding` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ManagementDnsZoneBinding;
}

export const PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ManagementDnsZoneBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/managementDnsZoneBindings/{managementDnsZoneBindingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest>;

export type PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError = CommonErrors;

export const patchProjectsLocationsPrivateCloudsManagementDnsZoneBindings: API.OperationMethod<PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest, PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse, PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest,
  output: PatchProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse,
  errors: [],
}));

/** Creates a new `ManagementDnsZoneBinding` resource in a private cloud. This RPC creates the DNS binding and the resource that represents the DNS binding of the consumer VPC network to the management DNS zone. A management DNS zone is the Cloud DNS cross-project binding zone that VMware Engine creates for each private cloud. It contains FQDNs and corresponding IP addresses for the private cloud's ESXi hosts and management VM appliances like vCenter and NSX Manager. */
export interface CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest {
  /** Required. The resource name of the private cloud to create a new management DNS zone binding for. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The user-provided identifier of the `ManagementDnsZoneBinding` resource to be created. This identifier must be unique among `ManagementDnsZoneBinding` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  managementDnsZoneBindingId?: string;
  /** Request body */
  body?: ManagementDnsZoneBinding;
}

export const CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  managementDnsZoneBindingId: Schema.optional(Schema.String).pipe(T.HttpQuery("managementDnsZoneBindingId")),
  body: Schema.optional(ManagementDnsZoneBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/managementDnsZoneBindings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest>;

export type CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;
export const CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;

export type CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError = CommonErrors;

export const createProjectsLocationsPrivateCloudsManagementDnsZoneBindings: API.OperationMethod<CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest, CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse, CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest,
  output: CreateProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse,
  errors: [],
}));

/** Retrieves a 'ManagementDnsZoneBinding' resource by its resource name. */
export interface GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest {
  /** Required. The resource name of the management DNS zone binding to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/managementDnsZoneBindings/my-management-dns-zone-binding` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/managementDnsZoneBindings/{managementDnsZoneBindingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest>;

export type GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = ManagementDnsZoneBinding;
export const GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = ManagementDnsZoneBinding;

export type GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError = CommonErrors;

export const getProjectsLocationsPrivateCloudsManagementDnsZoneBindings: API.OperationMethod<GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest, GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse, GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest,
  output: GetProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse,
  errors: [],
}));

/** Lists Consumer VPCs bound to Management DNS Zone of a given private cloud. */
export interface ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest {
  /** A page token, received from a previous `ListManagementDnsZoneBindings` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListManagementDnsZoneBindings` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the private cloud to be queried for management DNS zone bindings. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** The maximum number of management DNS zone bindings to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of Management DNS Zone Bindings, you can exclude the ones named `example-management-dns-zone-binding` by specifying `name != "example-management-dns-zone-binding"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-management-dns-zone-binding") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-management-dns-zone-binding-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-management-dns-zone-binding-2") ``` */
  filter?: string;
}

export const ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/managementDnsZoneBindings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest>;

export type ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = ListManagementDnsZoneBindingsResponse;
export const ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = ListManagementDnsZoneBindingsResponse;

export type ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError = CommonErrors;

export const listProjectsLocationsPrivateCloudsManagementDnsZoneBindings = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest,
  output: ListProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retries to create a `ManagementDnsZoneBinding` resource that is in failed state. */
export interface RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest {
  /** Required. The resource name of the management DNS zone binding to repair. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/managementDnsZoneBindings/my-management-dns-zone-binding` */
  name: string;
  /** Request body */
  body?: RepairManagementDnsZoneBindingRequest;
}

export const RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RepairManagementDnsZoneBindingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/managementDnsZoneBindings/{managementDnsZoneBindingsId}:repair", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest>;

export type RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;
export const RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;

export type RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError = CommonErrors;

export const repairProjectsLocationsPrivateCloudsManagementDnsZoneBindings: API.OperationMethod<RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest, RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse, RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest,
  output: RepairProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse,
  errors: [],
}));

/** Deletes a `ManagementDnsZoneBinding` resource. When a management DNS zone binding is deleted, the corresponding consumer VPC network is no longer bound to the management DNS zone. */
export interface DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest {
  /** Required. The resource name of the management DNS zone binding to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/managementDnsZoneBindings/my-management-dns-zone-binding` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/managementDnsZoneBindings/{managementDnsZoneBindingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest>;

export type DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;
export const DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse = Operation;

export type DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError = CommonErrors;

export const deleteProjectsLocationsPrivateCloudsManagementDnsZoneBindings: API.OperationMethod<DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest, DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse, DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsRequest,
  output: DeleteProjectsLocationsPrivateCloudsManagementDnsZoneBindingsResponse,
  errors: [],
}));

/** Creates a new HCX activation key in a given private cloud. */
export interface CreateProjectsLocationsPrivateCloudsHcxActivationKeysRequest {
  /** Required. The user-provided identifier of the `HcxActivationKey` to be created. This identifier must be unique among `HcxActivationKey` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  hcxActivationKeyId?: string;
  /** Required. The resource name of the private cloud to create the key for. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateClouds/my-cloud` */
  parent: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: HcxActivationKey;
}

export const CreateProjectsLocationsPrivateCloudsHcxActivationKeysRequest = Schema.Struct({
  hcxActivationKeyId: Schema.optional(Schema.String).pipe(T.HttpQuery("hcxActivationKeyId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(HcxActivationKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/hcxActivationKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateCloudsHcxActivationKeysRequest>;

export type CreateProjectsLocationsPrivateCloudsHcxActivationKeysResponse = Operation;
export const CreateProjectsLocationsPrivateCloudsHcxActivationKeysResponse = Operation;

export type CreateProjectsLocationsPrivateCloudsHcxActivationKeysError = CommonErrors;

export const createProjectsLocationsPrivateCloudsHcxActivationKeys: API.OperationMethod<CreateProjectsLocationsPrivateCloudsHcxActivationKeysRequest, CreateProjectsLocationsPrivateCloudsHcxActivationKeysResponse, CreateProjectsLocationsPrivateCloudsHcxActivationKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateCloudsHcxActivationKeysRequest,
  output: CreateProjectsLocationsPrivateCloudsHcxActivationKeysResponse,
  errors: [],
}));

/** Retrieves a `HcxActivationKey` resource by its resource name. */
export interface GetProjectsLocationsPrivateCloudsHcxActivationKeysRequest {
  /** Required. The resource name of the HCX activation key to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateClouds/my-cloud/hcxActivationKeys/my-key` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsHcxActivationKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/hcxActivationKeys/{hcxActivationKeysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsHcxActivationKeysRequest>;

export type GetProjectsLocationsPrivateCloudsHcxActivationKeysResponse = HcxActivationKey;
export const GetProjectsLocationsPrivateCloudsHcxActivationKeysResponse = HcxActivationKey;

export type GetProjectsLocationsPrivateCloudsHcxActivationKeysError = CommonErrors;

export const getProjectsLocationsPrivateCloudsHcxActivationKeys: API.OperationMethod<GetProjectsLocationsPrivateCloudsHcxActivationKeysRequest, GetProjectsLocationsPrivateCloudsHcxActivationKeysResponse, GetProjectsLocationsPrivateCloudsHcxActivationKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsHcxActivationKeysRequest,
  output: GetProjectsLocationsPrivateCloudsHcxActivationKeysResponse,
  errors: [],
}));

/** Lists `HcxActivationKey` resources in a given private cloud. */
export interface ListProjectsLocationsPrivateCloudsHcxActivationKeysRequest {
  /** A page token, received from a previous `ListHcxActivationKeys` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListHcxActivationKeys` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the private cloud to be queried for HCX activation keys. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateClouds/my-cloud` */
  parent: string;
  /** The maximum number of HCX activation keys to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
}

export const ListProjectsLocationsPrivateCloudsHcxActivationKeysRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/hcxActivationKeys" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsHcxActivationKeysRequest>;

export type ListProjectsLocationsPrivateCloudsHcxActivationKeysResponse = ListHcxActivationKeysResponse;
export const ListProjectsLocationsPrivateCloudsHcxActivationKeysResponse = ListHcxActivationKeysResponse;

export type ListProjectsLocationsPrivateCloudsHcxActivationKeysError = CommonErrors;

export const listProjectsLocationsPrivateCloudsHcxActivationKeys = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsHcxActivationKeysRequest,
  output: ListProjectsLocationsPrivateCloudsHcxActivationKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/hcxActivationKeys/{hcxActivationKeysId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest>;

export type GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse = Policy;
export const GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse = Policy;

export type GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysError = CommonErrors;

export const getIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeys: API.OperationMethod<GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest, GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse, GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest,
  output: GetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/hcxActivationKeys/{hcxActivationKeysId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest>;

export type SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse = Policy;
export const SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse = Policy;

export type SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysError = CommonErrors;

export const setIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeys: API.OperationMethod<SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest, SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse, SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysRequest,
  output: SetIamPolicyProjectsLocationsPrivateCloudsHcxActivationKeysResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/hcxActivationKeys/{hcxActivationKeysId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysRequest>;

export type TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysError = CommonErrors;

export const testIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeys: API.OperationMethod<TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysRequest, TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysResponse, TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysRequest,
  output: TestIamPermissionsProjectsLocationsPrivateCloudsHcxActivationKeysResponse,
  errors: [],
}));

/** Create a new logging server for a given private cloud. */
export interface CreateProjectsLocationsPrivateCloudsLoggingServersRequest {
  /** Required. The user-provided identifier of the `LoggingServer` to be created. This identifier must be unique among `LoggingServer` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  loggingServerId?: string;
  /** Required. The resource name of the private cloud to create a new Logging Server in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: LoggingServer;
}

export const CreateProjectsLocationsPrivateCloudsLoggingServersRequest = Schema.Struct({
  loggingServerId: Schema.optional(Schema.String).pipe(T.HttpQuery("loggingServerId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(LoggingServer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/loggingServers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateCloudsLoggingServersRequest>;

export type CreateProjectsLocationsPrivateCloudsLoggingServersResponse = Operation;
export const CreateProjectsLocationsPrivateCloudsLoggingServersResponse = Operation;

export type CreateProjectsLocationsPrivateCloudsLoggingServersError = CommonErrors;

export const createProjectsLocationsPrivateCloudsLoggingServers: API.OperationMethod<CreateProjectsLocationsPrivateCloudsLoggingServersRequest, CreateProjectsLocationsPrivateCloudsLoggingServersResponse, CreateProjectsLocationsPrivateCloudsLoggingServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateCloudsLoggingServersRequest,
  output: CreateProjectsLocationsPrivateCloudsLoggingServersResponse,
  errors: [],
}));

/** Gets details of a logging server. */
export interface GetProjectsLocationsPrivateCloudsLoggingServersRequest {
  /** Required. The resource name of the Logging Server to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/loggingServers/my-logging-server` */
  name: string;
}

export const GetProjectsLocationsPrivateCloudsLoggingServersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/loggingServers/{loggingServersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateCloudsLoggingServersRequest>;

export type GetProjectsLocationsPrivateCloudsLoggingServersResponse = LoggingServer;
export const GetProjectsLocationsPrivateCloudsLoggingServersResponse = LoggingServer;

export type GetProjectsLocationsPrivateCloudsLoggingServersError = CommonErrors;

export const getProjectsLocationsPrivateCloudsLoggingServers: API.OperationMethod<GetProjectsLocationsPrivateCloudsLoggingServersRequest, GetProjectsLocationsPrivateCloudsLoggingServersResponse, GetProjectsLocationsPrivateCloudsLoggingServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateCloudsLoggingServersRequest,
  output: GetProjectsLocationsPrivateCloudsLoggingServersResponse,
  errors: [],
}));

/** Updates the parameters of a single logging server. Only fields specified in `update_mask` are applied. */
export interface PatchProjectsLocationsPrivateCloudsLoggingServersRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the `LoggingServer` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Output only. The resource name of this logging server. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/loggingServers/my-logging-server` */
  name: string;
  /** Request body */
  body?: LoggingServer;
}

export const PatchProjectsLocationsPrivateCloudsLoggingServersRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(LoggingServer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/loggingServers/{loggingServersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateCloudsLoggingServersRequest>;

export type PatchProjectsLocationsPrivateCloudsLoggingServersResponse = Operation;
export const PatchProjectsLocationsPrivateCloudsLoggingServersResponse = Operation;

export type PatchProjectsLocationsPrivateCloudsLoggingServersError = CommonErrors;

export const patchProjectsLocationsPrivateCloudsLoggingServers: API.OperationMethod<PatchProjectsLocationsPrivateCloudsLoggingServersRequest, PatchProjectsLocationsPrivateCloudsLoggingServersResponse, PatchProjectsLocationsPrivateCloudsLoggingServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateCloudsLoggingServersRequest,
  output: PatchProjectsLocationsPrivateCloudsLoggingServersResponse,
  errors: [],
}));

/** Lists logging servers configured for a given private cloud. */
export interface ListProjectsLocationsPrivateCloudsLoggingServersRequest {
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** The maximum number of logging servers to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of logging servers, you can exclude the ones named `example-server` by specifying `name != "example-server"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-server") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-server-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-server-2") ``` */
  filter?: string;
  /** Required. The resource name of the private cloud to be queried for logging servers. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud` */
  parent: string;
  /** A page token, received from a previous `ListLoggingServersRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListLoggingServersRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPrivateCloudsLoggingServersRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/loggingServers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateCloudsLoggingServersRequest>;

export type ListProjectsLocationsPrivateCloudsLoggingServersResponse = ListLoggingServersResponse;
export const ListProjectsLocationsPrivateCloudsLoggingServersResponse = ListLoggingServersResponse;

export type ListProjectsLocationsPrivateCloudsLoggingServersError = CommonErrors;

export const listProjectsLocationsPrivateCloudsLoggingServers = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateCloudsLoggingServersRequest,
  output: ListProjectsLocationsPrivateCloudsLoggingServersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single logging server. */
export interface DeleteProjectsLocationsPrivateCloudsLoggingServersRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the logging server to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a/privateClouds/my-cloud/loggingServers/my-logging-server` */
  name: string;
}

export const DeleteProjectsLocationsPrivateCloudsLoggingServersRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateClouds/{privateCloudsId}/loggingServers/{loggingServersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateCloudsLoggingServersRequest>;

export type DeleteProjectsLocationsPrivateCloudsLoggingServersResponse = Operation;
export const DeleteProjectsLocationsPrivateCloudsLoggingServersResponse = Operation;

export type DeleteProjectsLocationsPrivateCloudsLoggingServersError = CommonErrors;

export const deleteProjectsLocationsPrivateCloudsLoggingServers: API.OperationMethod<DeleteProjectsLocationsPrivateCloudsLoggingServersRequest, DeleteProjectsLocationsPrivateCloudsLoggingServersResponse, DeleteProjectsLocationsPrivateCloudsLoggingServersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateCloudsLoggingServersRequest,
  output: DeleteProjectsLocationsPrivateCloudsLoggingServersResponse,
  errors: [],
}));

/** Retrieves a `Announcement` by its resource name. */
export interface GetProjectsLocationsAnnouncementsRequest {
  /** Required. The resource name of the announcement to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a/announcements/announcement-uuid` */
  name: string;
}

export const GetProjectsLocationsAnnouncementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/announcements/{announcementsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAnnouncementsRequest>;

export type GetProjectsLocationsAnnouncementsResponse = Announcement;
export const GetProjectsLocationsAnnouncementsResponse = Announcement;

export type GetProjectsLocationsAnnouncementsError = CommonErrors;

export const getProjectsLocationsAnnouncements: API.OperationMethod<GetProjectsLocationsAnnouncementsRequest, GetProjectsLocationsAnnouncementsResponse, GetProjectsLocationsAnnouncementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAnnouncementsRequest,
  output: GetProjectsLocationsAnnouncementsResponse,
  errors: [],
}));

/** Lists `Announcements` for a given region and project */
export interface ListProjectsLocationsAnnouncementsRequest {
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** A page token, received from a previous `ListAnnouncements` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAnnouncements` must match the call that provided the page token. */
  pageToken?: string;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of announcement runs, you can exclude the ones named `example-announcement` by specifying `name != "example-announcement"`. You can also filter nested fields. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-announcement") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "announcement-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "announcement-2") ``` */
  filter?: string;
  /** Required. The resource name of the location to be queried for announcements. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1-a` */
  parent: string;
  /** The maximum number of announcements to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
}

export const ListProjectsLocationsAnnouncementsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/announcements" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAnnouncementsRequest>;

export type ListProjectsLocationsAnnouncementsResponse = ListAnnouncementsResponse;
export const ListProjectsLocationsAnnouncementsResponse = ListAnnouncementsResponse;

export type ListProjectsLocationsAnnouncementsError = CommonErrors;

export const listProjectsLocationsAnnouncements = API.makePaginated(() => ({
  input: ListProjectsLocationsAnnouncementsRequest,
  output: ListProjectsLocationsAnnouncementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a `NetworkPeering` resource. When a network peering is deleted for a VMware Engine network, the peer network becomes inaccessible to that VMware Engine network. NetworkPeering is a global resource and location can only be global. */
export interface DeleteProjectsLocationsNetworkPeeringsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the network peering to be deleted. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/networkPeerings/my-peering` */
  name: string;
}

export const DeleteProjectsLocationsNetworkPeeringsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPeerings/{networkPeeringsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNetworkPeeringsRequest>;

export type DeleteProjectsLocationsNetworkPeeringsResponse = Operation;
export const DeleteProjectsLocationsNetworkPeeringsResponse = Operation;

export type DeleteProjectsLocationsNetworkPeeringsError = CommonErrors;

export const deleteProjectsLocationsNetworkPeerings: API.OperationMethod<DeleteProjectsLocationsNetworkPeeringsRequest, DeleteProjectsLocationsNetworkPeeringsResponse, DeleteProjectsLocationsNetworkPeeringsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNetworkPeeringsRequest,
  output: DeleteProjectsLocationsNetworkPeeringsResponse,
  errors: [],
}));

/** Modifies a `NetworkPeering` resource. Only the `description` field can be updated. Only fields specified in `updateMask` are applied. NetworkPeering is a global resource and location can only be global. */
export interface PatchProjectsLocationsNetworkPeeringsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the `NetworkPeering` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. Identifier. The resource name of the network peering. NetworkPeering is a global resource and location can only be global. Resource names are scheme-less URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/networkPeerings/my-peering` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: NetworkPeering;
}

export const PatchProjectsLocationsNetworkPeeringsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(NetworkPeering).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPeerings/{networkPeeringsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNetworkPeeringsRequest>;

export type PatchProjectsLocationsNetworkPeeringsResponse = Operation;
export const PatchProjectsLocationsNetworkPeeringsResponse = Operation;

export type PatchProjectsLocationsNetworkPeeringsError = CommonErrors;

export const patchProjectsLocationsNetworkPeerings: API.OperationMethod<PatchProjectsLocationsNetworkPeeringsRequest, PatchProjectsLocationsNetworkPeeringsResponse, PatchProjectsLocationsNetworkPeeringsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNetworkPeeringsRequest,
  output: PatchProjectsLocationsNetworkPeeringsResponse,
  errors: [],
}));

/** Creates a new network peering between the peer network and VMware Engine network provided in a `NetworkPeering` resource. NetworkPeering is a global resource and location can only be global. */
export interface CreateProjectsLocationsNetworkPeeringsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the location to create the new network peering in. This value is always `global`, because `NetworkPeering` is a global resource. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global` */
  parent: string;
  /** Required. The user-provided identifier of the new `NetworkPeering`. This identifier must be unique among `NetworkPeering` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  networkPeeringId?: string;
  /** Request body */
  body?: NetworkPeering;
}

export const CreateProjectsLocationsNetworkPeeringsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  networkPeeringId: Schema.optional(Schema.String).pipe(T.HttpQuery("networkPeeringId")),
  body: Schema.optional(NetworkPeering).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPeerings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNetworkPeeringsRequest>;

export type CreateProjectsLocationsNetworkPeeringsResponse = Operation;
export const CreateProjectsLocationsNetworkPeeringsResponse = Operation;

export type CreateProjectsLocationsNetworkPeeringsError = CommonErrors;

export const createProjectsLocationsNetworkPeerings: API.OperationMethod<CreateProjectsLocationsNetworkPeeringsRequest, CreateProjectsLocationsNetworkPeeringsResponse, CreateProjectsLocationsNetworkPeeringsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNetworkPeeringsRequest,
  output: CreateProjectsLocationsNetworkPeeringsResponse,
  errors: [],
}));

/** Retrieves a `NetworkPeering` resource by its resource name. The resource contains details of the network peering, such as peered networks, import and export custom route configurations, and peering state. NetworkPeering is a global resource and location can only be global. */
export interface GetProjectsLocationsNetworkPeeringsRequest {
  /** Required. The resource name of the network peering to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/networkPeerings/my-peering` */
  name: string;
}

export const GetProjectsLocationsNetworkPeeringsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPeerings/{networkPeeringsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNetworkPeeringsRequest>;

export type GetProjectsLocationsNetworkPeeringsResponse = NetworkPeering;
export const GetProjectsLocationsNetworkPeeringsResponse = NetworkPeering;

export type GetProjectsLocationsNetworkPeeringsError = CommonErrors;

export const getProjectsLocationsNetworkPeerings: API.OperationMethod<GetProjectsLocationsNetworkPeeringsRequest, GetProjectsLocationsNetworkPeeringsResponse, GetProjectsLocationsNetworkPeeringsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNetworkPeeringsRequest,
  output: GetProjectsLocationsNetworkPeeringsResponse,
  errors: [],
}));

/** Lists `NetworkPeering` resources in a given project. NetworkPeering is a global resource and location can only be global. */
export interface ListProjectsLocationsNetworkPeeringsRequest {
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of network peerings, you can exclude the ones named `example-peering` by specifying `name != "example-peering"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-peering") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-peering-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-peering-2") ``` */
  filter?: string;
  /** A page token, received from a previous `ListNetworkPeerings` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListNetworkPeerings` must match the call that provided the page token. */
  pageToken?: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** Required. The resource name of the location (global) to query for network peerings. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global` */
  parent: string;
  /** The maximum number of network peerings to return in one page. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
}

export const ListProjectsLocationsNetworkPeeringsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPeerings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNetworkPeeringsRequest>;

export type ListProjectsLocationsNetworkPeeringsResponse = ListNetworkPeeringsResponse;
export const ListProjectsLocationsNetworkPeeringsResponse = ListNetworkPeeringsResponse;

export type ListProjectsLocationsNetworkPeeringsError = CommonErrors;

export const listProjectsLocationsNetworkPeerings = API.makePaginated(() => ({
  input: ListProjectsLocationsNetworkPeeringsRequest,
  output: ListProjectsLocationsNetworkPeeringsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the network peering routes exchanged over a peering connection. NetworkPeering is a global resource and location can only be global. */
export interface ListProjectsLocationsNetworkPeeringsPeeringRoutesRequest {
  /** A page token, received from a previous `ListPeeringRoutes` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPeeringRoutes` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the network peering to retrieve peering routes from. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/networkPeerings/my-peering` */
  parent: string;
  /** A filter expression that matches resources returned in the response. Currently, only filtering on the `direction` field is supported. To return routes imported from the peer network, provide "direction=INCOMING". To return routes exported from the VMware Engine network, provide "direction=OUTGOING". Other filter expressions return an error. */
  filter?: string;
  /** The maximum number of peering routes to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
}

export const ListProjectsLocationsNetworkPeeringsPeeringRoutesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPeerings/{networkPeeringsId}/peeringRoutes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNetworkPeeringsPeeringRoutesRequest>;

export type ListProjectsLocationsNetworkPeeringsPeeringRoutesResponse = ListPeeringRoutesResponse;
export const ListProjectsLocationsNetworkPeeringsPeeringRoutesResponse = ListPeeringRoutesResponse;

export type ListProjectsLocationsNetworkPeeringsPeeringRoutesError = CommonErrors;

export const listProjectsLocationsNetworkPeeringsPeeringRoutes = API.makePaginated(() => ({
  input: ListProjectsLocationsNetworkPeeringsPeeringRoutesRequest,
  output: ListProjectsLocationsNetworkPeeringsPeeringRoutesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new VMware Engine network that can be used by a private cloud. */
export interface CreateProjectsLocationsVmwareEngineNetworksRequest {
  /** Required. The user-provided identifier of the new VMware Engine network. This identifier must be unique among VMware Engine network resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * For networks of type LEGACY, adheres to the format: `{region-id}-default`. Replace `{region-id}` with the region where you want to create the VMware Engine network. For example, "us-central1-default". * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  vmwareEngineNetworkId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the location to create the new VMware Engine network in. A VMware Engine network of type `LEGACY` is a regional resource, and a VMware Engine network of type `STANDARD` is a global resource. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global` */
  parent: string;
  /** Request body */
  body?: VmwareEngineNetwork;
}

export const CreateProjectsLocationsVmwareEngineNetworksRequest = Schema.Struct({
  vmwareEngineNetworkId: Schema.optional(Schema.String).pipe(T.HttpQuery("vmwareEngineNetworkId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(VmwareEngineNetwork).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareEngineNetworks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVmwareEngineNetworksRequest>;

export type CreateProjectsLocationsVmwareEngineNetworksResponse = Operation;
export const CreateProjectsLocationsVmwareEngineNetworksResponse = Operation;

export type CreateProjectsLocationsVmwareEngineNetworksError = CommonErrors;

export const createProjectsLocationsVmwareEngineNetworks: API.OperationMethod<CreateProjectsLocationsVmwareEngineNetworksRequest, CreateProjectsLocationsVmwareEngineNetworksResponse, CreateProjectsLocationsVmwareEngineNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVmwareEngineNetworksRequest,
  output: CreateProjectsLocationsVmwareEngineNetworksResponse,
  errors: [],
}));

/** Retrieves a `VmwareEngineNetwork` resource by its resource name. The resource contains details of the VMware Engine network, such as its VMware Engine network type, peered networks in a service project, and state (for example, `CREATING`, `ACTIVE`, `DELETING`). */
export interface GetProjectsLocationsVmwareEngineNetworksRequest {
  /** Required. The resource name of the VMware Engine network to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/vmwareEngineNetworks/my-network` */
  name: string;
}

export const GetProjectsLocationsVmwareEngineNetworksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareEngineNetworks/{vmwareEngineNetworksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVmwareEngineNetworksRequest>;

export type GetProjectsLocationsVmwareEngineNetworksResponse = VmwareEngineNetwork;
export const GetProjectsLocationsVmwareEngineNetworksResponse = VmwareEngineNetwork;

export type GetProjectsLocationsVmwareEngineNetworksError = CommonErrors;

export const getProjectsLocationsVmwareEngineNetworks: API.OperationMethod<GetProjectsLocationsVmwareEngineNetworksRequest, GetProjectsLocationsVmwareEngineNetworksResponse, GetProjectsLocationsVmwareEngineNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVmwareEngineNetworksRequest,
  output: GetProjectsLocationsVmwareEngineNetworksResponse,
  errors: [],
}));

/** Modifies a VMware Engine network resource. Only the following fields can be updated: `description`. Only fields specified in `updateMask` are applied. */
export interface PatchProjectsLocationsVmwareEngineNetworksRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the VMware Engine network resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. Only the following fields can be updated: `description`. */
  updateMask?: string;
  /** Output only. Identifier. The resource name of the VMware Engine network. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/vmwareEngineNetworks/my-network` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: VmwareEngineNetwork;
}

export const PatchProjectsLocationsVmwareEngineNetworksRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(VmwareEngineNetwork).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareEngineNetworks/{vmwareEngineNetworksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVmwareEngineNetworksRequest>;

export type PatchProjectsLocationsVmwareEngineNetworksResponse = Operation;
export const PatchProjectsLocationsVmwareEngineNetworksResponse = Operation;

export type PatchProjectsLocationsVmwareEngineNetworksError = CommonErrors;

export const patchProjectsLocationsVmwareEngineNetworks: API.OperationMethod<PatchProjectsLocationsVmwareEngineNetworksRequest, PatchProjectsLocationsVmwareEngineNetworksResponse, PatchProjectsLocationsVmwareEngineNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVmwareEngineNetworksRequest,
  output: PatchProjectsLocationsVmwareEngineNetworksResponse,
  errors: [],
}));

/** Deletes a `VmwareEngineNetwork` resource. You can only delete a VMware Engine network after all resources that refer to it are deleted. For example, a private cloud, a network peering, and a network policy can all refer to the same VMware Engine network. */
export interface DeleteProjectsLocationsVmwareEngineNetworksRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Checksum used to ensure that the user-provided value is up to date before the server processes the request. The server compares provided checksum with the current checksum of the resource. If the user-provided value is out of date, this request returns an `ABORTED` error. */
  etag?: string;
  /** Required. The resource name of the VMware Engine network to be deleted. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/vmwareEngineNetworks/my-network` */
  name: string;
}

export const DeleteProjectsLocationsVmwareEngineNetworksRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareEngineNetworks/{vmwareEngineNetworksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVmwareEngineNetworksRequest>;

export type DeleteProjectsLocationsVmwareEngineNetworksResponse = Operation;
export const DeleteProjectsLocationsVmwareEngineNetworksResponse = Operation;

export type DeleteProjectsLocationsVmwareEngineNetworksError = CommonErrors;

export const deleteProjectsLocationsVmwareEngineNetworks: API.OperationMethod<DeleteProjectsLocationsVmwareEngineNetworksRequest, DeleteProjectsLocationsVmwareEngineNetworksResponse, DeleteProjectsLocationsVmwareEngineNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVmwareEngineNetworksRequest,
  output: DeleteProjectsLocationsVmwareEngineNetworksResponse,
  errors: [],
}));

/** Lists `VmwareEngineNetwork` resources in a given project and location. */
export interface ListProjectsLocationsVmwareEngineNetworksRequest {
  /** Required. The resource name of the location to query for VMware Engine networks. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global` */
  parent: string;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of network peerings, you can exclude the ones named `example-network` by specifying `name != "example-network"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-network") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-network-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-network-2") ``` */
  filter?: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** The maximum number of results to return in one page. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListVmwareEngineNetworks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListVmwareEngineNetworks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsVmwareEngineNetworksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareEngineNetworks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVmwareEngineNetworksRequest>;

export type ListProjectsLocationsVmwareEngineNetworksResponse = ListVmwareEngineNetworksResponse;
export const ListProjectsLocationsVmwareEngineNetworksResponse = ListVmwareEngineNetworksResponse;

export type ListProjectsLocationsVmwareEngineNetworksError = CommonErrors;

export const listProjectsLocationsVmwareEngineNetworks = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareEngineNetworksRequest,
  output: ListProjectsLocationsVmwareEngineNetworksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Modifies a `NetworkPolicy` resource. Only the following fields can be updated: `internet_access`, `external_ip`, `edge_services_cidr`. Only fields specified in `updateMask` are applied. When updating a network policy, the external IP network service can only be disabled if there are no external IP addresses present in the scope of the policy. Also, a `NetworkService` cannot be updated when `NetworkService.state` is set to `RECONCILING`. During operation processing, the resource is temporarily in the `ACTIVE` state before the operation fully completes. For that period of time, you can't update the resource. Use the operation status to determine when the processing fully completes. */
export interface PatchProjectsLocationsNetworkPoliciesRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `NetworkPolicy` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. Identifier. The resource name of this network policy. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-network-policy` */
  name: string;
  /** Request body */
  body?: NetworkPolicy;
}

export const PatchProjectsLocationsNetworkPoliciesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(NetworkPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNetworkPoliciesRequest>;

export type PatchProjectsLocationsNetworkPoliciesResponse = Operation;
export const PatchProjectsLocationsNetworkPoliciesResponse = Operation;

export type PatchProjectsLocationsNetworkPoliciesError = CommonErrors;

export const patchProjectsLocationsNetworkPolicies: API.OperationMethod<PatchProjectsLocationsNetworkPoliciesRequest, PatchProjectsLocationsNetworkPoliciesResponse, PatchProjectsLocationsNetworkPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNetworkPoliciesRequest,
  output: PatchProjectsLocationsNetworkPoliciesResponse,
  errors: [],
}));

/** Deletes a `NetworkPolicy` resource. A network policy cannot be deleted when `NetworkService.state` is set to `RECONCILING` for either its external IP or internet access service. */
export interface DeleteProjectsLocationsNetworkPoliciesRequest {
  /** Required. The resource name of the network policy to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-network-policy` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsNetworkPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNetworkPoliciesRequest>;

export type DeleteProjectsLocationsNetworkPoliciesResponse = Operation;
export const DeleteProjectsLocationsNetworkPoliciesResponse = Operation;

export type DeleteProjectsLocationsNetworkPoliciesError = CommonErrors;

export const deleteProjectsLocationsNetworkPolicies: API.OperationMethod<DeleteProjectsLocationsNetworkPoliciesRequest, DeleteProjectsLocationsNetworkPoliciesResponse, DeleteProjectsLocationsNetworkPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNetworkPoliciesRequest,
  output: DeleteProjectsLocationsNetworkPoliciesResponse,
  errors: [],
}));

/** Lists `NetworkPolicy` resources in a specified project and location. */
export interface ListProjectsLocationsNetworkPoliciesRequest {
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of network policies, you can exclude the ones named `example-policy` by specifying `name != "example-policy"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-policy") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-policy-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-policy-2") ``` */
  filter?: string;
  /** Required. The resource name of the location (region) to query for network policies. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1` */
  parent: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** The maximum number of network policies to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListNetworkPolicies` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListNetworkPolicies` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsNetworkPoliciesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNetworkPoliciesRequest>;

export type ListProjectsLocationsNetworkPoliciesResponse = ListNetworkPoliciesResponse;
export const ListProjectsLocationsNetworkPoliciesResponse = ListNetworkPoliciesResponse;

export type ListProjectsLocationsNetworkPoliciesError = CommonErrors;

export const listProjectsLocationsNetworkPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsNetworkPoliciesRequest,
  output: ListProjectsLocationsNetworkPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a `NetworkPolicy` resource by its resource name. */
export interface GetProjectsLocationsNetworkPoliciesRequest {
  /** Required. The resource name of the network policy to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-network-policy` */
  name: string;
}

export const GetProjectsLocationsNetworkPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNetworkPoliciesRequest>;

export type GetProjectsLocationsNetworkPoliciesResponse = NetworkPolicy;
export const GetProjectsLocationsNetworkPoliciesResponse = NetworkPolicy;

export type GetProjectsLocationsNetworkPoliciesError = CommonErrors;

export const getProjectsLocationsNetworkPolicies: API.OperationMethod<GetProjectsLocationsNetworkPoliciesRequest, GetProjectsLocationsNetworkPoliciesResponse, GetProjectsLocationsNetworkPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNetworkPoliciesRequest,
  output: GetProjectsLocationsNetworkPoliciesResponse,
  errors: [],
}));

/** Creates a new network policy in a given VMware Engine network of a project and location (region). A new network policy cannot be created if another network policy already exists in the same scope. */
export interface CreateProjectsLocationsNetworkPoliciesRequest {
  /** Required. The resource name of the location (region) to create the new network policy in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1` */
  parent: string;
  /** Required. The user-provided identifier of the network policy to be created. This identifier must be unique within parent `projects/{my-project}/locations/{us-central1}/networkPolicies` and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  networkPolicyId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: NetworkPolicy;
}

export const CreateProjectsLocationsNetworkPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  networkPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("networkPolicyId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(NetworkPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNetworkPoliciesRequest>;

export type CreateProjectsLocationsNetworkPoliciesResponse = Operation;
export const CreateProjectsLocationsNetworkPoliciesResponse = Operation;

export type CreateProjectsLocationsNetworkPoliciesError = CommonErrors;

export const createProjectsLocationsNetworkPolicies: API.OperationMethod<CreateProjectsLocationsNetworkPoliciesRequest, CreateProjectsLocationsNetworkPoliciesResponse, CreateProjectsLocationsNetworkPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNetworkPoliciesRequest,
  output: CreateProjectsLocationsNetworkPoliciesResponse,
  errors: [],
}));

/** Lists external IP addresses assigned to VMware workload VMs within the scope of the given network policy. */
export interface FetchExternalAddressesProjectsLocationsNetworkPoliciesRequest {
  /** Required. The resource name of the network policy to query for assigned external IP addresses. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy` */
  networkPolicy: string;
  /** The maximum number of external IP addresses to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `FetchNetworkPolicyExternalAddresses` call. Provide this to retrieve the subsequent page. When paginating, all parameters provided to `FetchNetworkPolicyExternalAddresses`, except for `page_size` and `page_token`, must match the call that provided the page token. */
  pageToken?: string;
}

export const FetchExternalAddressesProjectsLocationsNetworkPoliciesRequest = Schema.Struct({
  networkPolicy: Schema.String.pipe(T.HttpPath("networkPolicy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}:fetchExternalAddresses" }),
  svc,
) as unknown as Schema.Schema<FetchExternalAddressesProjectsLocationsNetworkPoliciesRequest>;

export type FetchExternalAddressesProjectsLocationsNetworkPoliciesResponse = FetchNetworkPolicyExternalAddressesResponse;
export const FetchExternalAddressesProjectsLocationsNetworkPoliciesResponse = FetchNetworkPolicyExternalAddressesResponse;

export type FetchExternalAddressesProjectsLocationsNetworkPoliciesError = CommonErrors;

export const fetchExternalAddressesProjectsLocationsNetworkPolicies = API.makePaginated(() => ({
  input: FetchExternalAddressesProjectsLocationsNetworkPoliciesRequest,
  output: FetchExternalAddressesProjectsLocationsNetworkPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single external access rule. */
export interface GetProjectsLocationsNetworkPoliciesExternalAccessRulesRequest {
  /** Required. The resource name of the external access firewall rule to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy/externalAccessRules/my-rule` */
  name: string;
}

export const GetProjectsLocationsNetworkPoliciesExternalAccessRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}/externalAccessRules/{externalAccessRulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNetworkPoliciesExternalAccessRulesRequest>;

export type GetProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = ExternalAccessRule;
export const GetProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = ExternalAccessRule;

export type GetProjectsLocationsNetworkPoliciesExternalAccessRulesError = CommonErrors;

export const getProjectsLocationsNetworkPoliciesExternalAccessRules: API.OperationMethod<GetProjectsLocationsNetworkPoliciesExternalAccessRulesRequest, GetProjectsLocationsNetworkPoliciesExternalAccessRulesResponse, GetProjectsLocationsNetworkPoliciesExternalAccessRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNetworkPoliciesExternalAccessRulesRequest,
  output: GetProjectsLocationsNetworkPoliciesExternalAccessRulesResponse,
  errors: [],
}));

/** Deletes a single external access rule. */
export interface DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the external access firewall rule to delete. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy/externalAccessRules/my-rule` */
  name: string;
}

export const DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}/externalAccessRules/{externalAccessRulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesRequest>;

export type DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = Operation;
export const DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = Operation;

export type DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesError = CommonErrors;

export const deleteProjectsLocationsNetworkPoliciesExternalAccessRules: API.OperationMethod<DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesRequest, DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesResponse, DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesRequest,
  output: DeleteProjectsLocationsNetworkPoliciesExternalAccessRulesResponse,
  errors: [],
}));

/** Lists `ExternalAccessRule` resources in the specified network policy. */
export interface ListProjectsLocationsNetworkPoliciesExternalAccessRulesRequest {
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** Required. The resource name of the network policy to query for external access firewall rules. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy` */
  parent: string;
  /** The maximum number of external access rules to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListExternalAccessRulesRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListExternalAccessRulesRequest` must match the call that provided the page token. */
  pageToken?: string;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of external access rules, you can exclude the ones named `example-rule` by specifying `name != "example-rule"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-rule") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-rule-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-rule-2") ``` */
  filter?: string;
}

export const ListProjectsLocationsNetworkPoliciesExternalAccessRulesRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}/externalAccessRules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNetworkPoliciesExternalAccessRulesRequest>;

export type ListProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = ListExternalAccessRulesResponse;
export const ListProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = ListExternalAccessRulesResponse;

export type ListProjectsLocationsNetworkPoliciesExternalAccessRulesError = CommonErrors;

export const listProjectsLocationsNetworkPoliciesExternalAccessRules = API.makePaginated(() => ({
  input: ListProjectsLocationsNetworkPoliciesExternalAccessRulesRequest,
  output: ListProjectsLocationsNetworkPoliciesExternalAccessRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new external access rule in a given network policy. */
export interface CreateProjectsLocationsNetworkPoliciesExternalAccessRulesRequest {
  /** Required. The resource name of the network policy to create a new external access firewall rule in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy` */
  parent: string;
  /** Required. The user-provided identifier of the `ExternalAccessRule` to be created. This identifier must be unique among `ExternalAccessRule` resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  externalAccessRuleId?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ExternalAccessRule;
}

export const CreateProjectsLocationsNetworkPoliciesExternalAccessRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  externalAccessRuleId: Schema.optional(Schema.String).pipe(T.HttpQuery("externalAccessRuleId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ExternalAccessRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}/externalAccessRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNetworkPoliciesExternalAccessRulesRequest>;

export type CreateProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = Operation;
export const CreateProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = Operation;

export type CreateProjectsLocationsNetworkPoliciesExternalAccessRulesError = CommonErrors;

export const createProjectsLocationsNetworkPoliciesExternalAccessRules: API.OperationMethod<CreateProjectsLocationsNetworkPoliciesExternalAccessRulesRequest, CreateProjectsLocationsNetworkPoliciesExternalAccessRulesResponse, CreateProjectsLocationsNetworkPoliciesExternalAccessRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNetworkPoliciesExternalAccessRulesRequest,
  output: CreateProjectsLocationsNetworkPoliciesExternalAccessRulesResponse,
  errors: [],
}));

/** Updates the parameters of a single external access rule. Only fields specified in `update_mask` are applied. */
export interface PatchProjectsLocationsNetworkPoliciesExternalAccessRulesRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Output only. The resource name of this external access rule. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/networkPolicies/my-policy/externalAccessRules/my-rule` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `ExternalAccessRule` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: ExternalAccessRule;
}

export const PatchProjectsLocationsNetworkPoliciesExternalAccessRulesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ExternalAccessRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/networkPolicies/{networkPoliciesId}/externalAccessRules/{externalAccessRulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNetworkPoliciesExternalAccessRulesRequest>;

export type PatchProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = Operation;
export const PatchProjectsLocationsNetworkPoliciesExternalAccessRulesResponse = Operation;

export type PatchProjectsLocationsNetworkPoliciesExternalAccessRulesError = CommonErrors;

export const patchProjectsLocationsNetworkPoliciesExternalAccessRules: API.OperationMethod<PatchProjectsLocationsNetworkPoliciesExternalAccessRulesRequest, PatchProjectsLocationsNetworkPoliciesExternalAccessRulesResponse, PatchProjectsLocationsNetworkPoliciesExternalAccessRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNetworkPoliciesExternalAccessRulesRequest,
  output: PatchProjectsLocationsNetworkPoliciesExternalAccessRulesResponse,
  errors: [],
}));

/** Lists node types */
export interface ListProjectsLocationsNodeTypesRequest {
  /** The maximum number of node types to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListNodeTypes` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListNodeTypes` must match the call that provided the page token. */
  pageToken?: string;
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of node types, you can exclude the ones named `standard-72` by specifying `name != "standard-72"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "standard-72") (virtual_cpu_count > 2) ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "standard-96") AND (virtual_cpu_count > 2) OR (name = "standard-72") ``` */
  filter?: string;
  /** Required. The resource name of the location to be queried for node types. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1-a` */
  parent: string;
}

export const ListProjectsLocationsNodeTypesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/nodeTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNodeTypesRequest>;

export type ListProjectsLocationsNodeTypesResponse = ListNodeTypesResponse;
export const ListProjectsLocationsNodeTypesResponse = ListNodeTypesResponse;

export type ListProjectsLocationsNodeTypesError = CommonErrors;

export const listProjectsLocationsNodeTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsNodeTypesRequest,
  output: ListProjectsLocationsNodeTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single `NodeType`. */
export interface GetProjectsLocationsNodeTypesRequest {
  /** Required. The resource name of the node type to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-proj/locations/us-central1-a/nodeTypes/standard-72` */
  name: string;
}

export const GetProjectsLocationsNodeTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/nodeTypes/{nodeTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNodeTypesRequest>;

export type GetProjectsLocationsNodeTypesResponse = NodeType;
export const GetProjectsLocationsNodeTypesResponse = NodeType;

export type GetProjectsLocationsNodeTypesError = CommonErrors;

export const getProjectsLocationsNodeTypes: API.OperationMethod<GetProjectsLocationsNodeTypesRequest, GetProjectsLocationsNodeTypesResponse, GetProjectsLocationsNodeTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNodeTypesRequest,
  output: GetProjectsLocationsNodeTypesResponse,
  errors: [],
}));

/** Creates a new `Datastore` resource in a given project and location. */
export interface CreateProjectsLocationsDatastoresRequest {
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the location to create the new datastore in. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1` */
  parent: string;
  /** Required. The user-provided identifier of the datastore to be created. This identifier must be unique among each `Datastore` within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  datastoreId?: string;
  /** Request body */
  body?: Datastore;
}

export const CreateProjectsLocationsDatastoresRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  datastoreId: Schema.optional(Schema.String).pipe(T.HttpQuery("datastoreId")),
  body: Schema.optional(Datastore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datastores", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatastoresRequest>;

export type CreateProjectsLocationsDatastoresResponse = Operation;
export const CreateProjectsLocationsDatastoresResponse = Operation;

export type CreateProjectsLocationsDatastoresError = CommonErrors;

export const createProjectsLocationsDatastores: API.OperationMethod<CreateProjectsLocationsDatastoresRequest, CreateProjectsLocationsDatastoresResponse, CreateProjectsLocationsDatastoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatastoresRequest,
  output: CreateProjectsLocationsDatastoresResponse,
  errors: [],
}));

/** Deletes a `Datastore` resource. You can only delete a Datastore after all resources that refer to it are deleted. For example, multiple clusters of the same private cloud or different private clouds can refer to the same datastore. */
export interface DeleteProjectsLocationsDatastoresRequest {
  /** Required. The resource name of the Datastore to be deleted. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/datastore/my-datastore` */
  name: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. Checksum used to ensure that the user-provided value is up to date before the server processes the request. The server compares provided checksum with the current checksum of the resource. If the user-provided value is out of date, this request returns an `ABORTED` error. */
  etag?: string;
}

export const DeleteProjectsLocationsDatastoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datastores/{datastoresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatastoresRequest>;

export type DeleteProjectsLocationsDatastoresResponse = Operation;
export const DeleteProjectsLocationsDatastoresResponse = Operation;

export type DeleteProjectsLocationsDatastoresError = CommonErrors;

export const deleteProjectsLocationsDatastores: API.OperationMethod<DeleteProjectsLocationsDatastoresRequest, DeleteProjectsLocationsDatastoresResponse, DeleteProjectsLocationsDatastoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatastoresRequest,
  output: DeleteProjectsLocationsDatastoresResponse,
  errors: [],
}));

/** Lists `Datastore` resources in a given project and location. */
export interface ListProjectsLocationsDatastoresRequest {
  /** Required. The resource name of the location to query for Datastores. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1` */
  parent: string;
  /** Optional. A page token, received from a previous `ListDatastores` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDatastores` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of datastores, you can exclude the ones named `example-datastore` by specifying `name != "example-datastore"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-datastore") (createTime > "2021-04-12T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-datastore-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-datastore-2") ``` */
  filter?: string;
  /** Optional. The maximum number of results to return in one page. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** Optional. Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const ListProjectsLocationsDatastoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datastores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatastoresRequest>;

export type ListProjectsLocationsDatastoresResponse = ListDatastoresResponse;
export const ListProjectsLocationsDatastoresResponse = ListDatastoresResponse;

export type ListProjectsLocationsDatastoresError = CommonErrors;

export const listProjectsLocationsDatastores = API.makePaginated(() => ({
  input: ListProjectsLocationsDatastoresRequest,
  output: ListProjectsLocationsDatastoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a `Datastore` resource by its resource name. The resource contains details of the Datastore, such as its description, subnets, type, and more. */
export interface GetProjectsLocationsDatastoresRequest {
  /** Required. The resource name of the Datastore to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/datastores/my-datastore` */
  name: string;
}

export const GetProjectsLocationsDatastoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datastores/{datastoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatastoresRequest>;

export type GetProjectsLocationsDatastoresResponse = Datastore;
export const GetProjectsLocationsDatastoresResponse = Datastore;

export type GetProjectsLocationsDatastoresError = CommonErrors;

export const getProjectsLocationsDatastores: API.OperationMethod<GetProjectsLocationsDatastoresRequest, GetProjectsLocationsDatastoresResponse, GetProjectsLocationsDatastoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatastoresRequest,
  output: GetProjectsLocationsDatastoresResponse,
  errors: [],
}));

/** Modifies a Datastore resource. Only fields specified in `updateMask` are applied. */
export interface PatchProjectsLocationsDatastoresRequest {
  /** Output only. Identifier. The resource name of this datastore. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/datastores/datastore` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Datastore resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Datastore;
}

export const PatchProjectsLocationsDatastoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Datastore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datastores/{datastoresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatastoresRequest>;

export type PatchProjectsLocationsDatastoresResponse = Operation;
export const PatchProjectsLocationsDatastoresResponse = Operation;

export type PatchProjectsLocationsDatastoresError = CommonErrors;

export const patchProjectsLocationsDatastores: API.OperationMethod<PatchProjectsLocationsDatastoresRequest, PatchProjectsLocationsDatastoresResponse, PatchProjectsLocationsDatastoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatastoresRequest,
  output: PatchProjectsLocationsDatastoresResponse,
  errors: [],
}));

/** Lists `PrivateConnection` resources in a given project and location. */
export interface ListProjectsLocationsPrivateConnectionsRequest {
  /** A filter expression that matches resources returned in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be `=`, `!=`, `>`, or `<`. For example, if you are filtering a list of private connections, you can exclude the ones named `example-connection` by specifying `name != "example-connection"`. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (name = "example-connection") (createTime > "2022-09-22T08:15:10.40Z") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (name = "example-connection-1") AND (createTime > "2021-04-12T08:15:10.40Z") OR (name = "example-connection-2") ``` */
  filter?: string;
  /** The maximum number of private connections to return in one page. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListPrivateConnections` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPrivateConnections` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the location to query for private connections. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1` */
  parent: string;
  /** Sorts list results by a certain order. By default, returned results are ordered by `name` in ascending order. You can also sort results in descending order based on the `name` value using `orderBy="name desc"`. Currently, only ordering by `name` is supported. */
  orderBy?: string;
}

export const ListProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateConnectionsRequest>;

export type ListProjectsLocationsPrivateConnectionsResponse = ListPrivateConnectionsResponse;
export const ListProjectsLocationsPrivateConnectionsResponse = ListPrivateConnectionsResponse;

export type ListProjectsLocationsPrivateConnectionsError = CommonErrors;

export const listProjectsLocationsPrivateConnections = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateConnectionsRequest,
  output: ListProjectsLocationsPrivateConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a `PrivateConnection` resource. When a private connection is deleted for a VMware Engine network, the connected network becomes inaccessible to that VMware Engine network. */
export interface DeleteProjectsLocationsPrivateConnectionsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the private connection to be deleted. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateConnections/my-connection` */
  name: string;
}

export const DeleteProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPrivateConnectionsRequest>;

export type DeleteProjectsLocationsPrivateConnectionsResponse = Operation;
export const DeleteProjectsLocationsPrivateConnectionsResponse = Operation;

export type DeleteProjectsLocationsPrivateConnectionsError = CommonErrors;

export const deleteProjectsLocationsPrivateConnections: API.OperationMethod<DeleteProjectsLocationsPrivateConnectionsRequest, DeleteProjectsLocationsPrivateConnectionsResponse, DeleteProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPrivateConnectionsRequest,
  output: DeleteProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Creates a new private connection that can be used for accessing private Clouds. */
export interface CreateProjectsLocationsPrivateConnectionsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the location to create the new private connection in. Private connection is a regional resource. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1` */
  parent: string;
  /** Required. The user-provided identifier of the new private connection. This identifier must be unique among private connection resources within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) */
  privateConnectionId?: string;
  /** Request body */
  body?: PrivateConnection;
}

export const CreateProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  privateConnectionId: Schema.optional(Schema.String).pipe(T.HttpQuery("privateConnectionId")),
  body: Schema.optional(PrivateConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPrivateConnectionsRequest>;

export type CreateProjectsLocationsPrivateConnectionsResponse = Operation;
export const CreateProjectsLocationsPrivateConnectionsResponse = Operation;

export type CreateProjectsLocationsPrivateConnectionsError = CommonErrors;

export const createProjectsLocationsPrivateConnections: API.OperationMethod<CreateProjectsLocationsPrivateConnectionsRequest, CreateProjectsLocationsPrivateConnectionsResponse, CreateProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPrivateConnectionsRequest,
  output: CreateProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Modifies a `PrivateConnection` resource. Only `description` and `routing_mode` fields can be updated. Only fields specified in `updateMask` are applied. */
export interface PatchProjectsLocationsPrivateConnectionsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the `PrivateConnection` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Output only. The resource name of the private connection. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateConnections/my-connection` */
  name: string;
  /** Request body */
  body?: PrivateConnection;
}

export const PatchProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PrivateConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPrivateConnectionsRequest>;

export type PatchProjectsLocationsPrivateConnectionsResponse = Operation;
export const PatchProjectsLocationsPrivateConnectionsResponse = Operation;

export type PatchProjectsLocationsPrivateConnectionsError = CommonErrors;

export const patchProjectsLocationsPrivateConnections: API.OperationMethod<PatchProjectsLocationsPrivateConnectionsRequest, PatchProjectsLocationsPrivateConnectionsResponse, PatchProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPrivateConnectionsRequest,
  output: PatchProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Retrieves a `PrivateConnection` resource by its resource name. The resource contains details of the private connection, such as connected network, routing mode and state. */
export interface GetProjectsLocationsPrivateConnectionsRequest {
  /** Required. The resource name of the private connection to retrieve. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-central1/privateConnections/my-connection` */
  name: string;
}

export const GetProjectsLocationsPrivateConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPrivateConnectionsRequest>;

export type GetProjectsLocationsPrivateConnectionsResponse = PrivateConnection;
export const GetProjectsLocationsPrivateConnectionsResponse = PrivateConnection;

export type GetProjectsLocationsPrivateConnectionsError = CommonErrors;

export const getProjectsLocationsPrivateConnections: API.OperationMethod<GetProjectsLocationsPrivateConnectionsRequest, GetProjectsLocationsPrivateConnectionsResponse, GetProjectsLocationsPrivateConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPrivateConnectionsRequest,
  output: GetProjectsLocationsPrivateConnectionsResponse,
  errors: [],
}));

/** Lists the private connection routes exchanged over a peering connection. */
export interface ListProjectsLocationsPrivateConnectionsPeeringRoutesRequest {
  /** Required. The resource name of the private connection to retrieve peering routes from. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/us-west1/privateConnections/my-connection` */
  parent: string;
  /** The maximum number of peering routes to return in one page. The service may return fewer than this value. The maximum value is coerced to 1000. The default value of this field is 500. */
  pageSize?: number;
  /** A page token, received from a previous `ListPrivateConnectionPeeringRoutes` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPrivateConnectionPeeringRoutes` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPrivateConnectionsPeeringRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/privateConnections/{privateConnectionsId}/peeringRoutes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPrivateConnectionsPeeringRoutesRequest>;

export type ListProjectsLocationsPrivateConnectionsPeeringRoutesResponse = ListPrivateConnectionPeeringRoutesResponse;
export const ListProjectsLocationsPrivateConnectionsPeeringRoutesResponse = ListPrivateConnectionPeeringRoutesResponse;

export type ListProjectsLocationsPrivateConnectionsPeeringRoutesError = CommonErrors;

export const listProjectsLocationsPrivateConnectionsPeeringRoutes = API.makePaginated(() => ({
  input: ListProjectsLocationsPrivateConnectionsPeeringRoutesRequest,
  output: ListProjectsLocationsPrivateConnectionsPeeringRoutesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Grants the bind permission to the customer provided principal(user / service account) to bind their DNS zone with the intranet VPC associated with the project. DnsBindPermission is a global resource and location can only be global. */
export interface GrantProjectsLocationsDnsBindPermissionRequest {
  /** Required. The name of the resource which stores the users/service accounts having the permission to bind to the corresponding intranet VPC of the consumer project. DnsBindPermission is a global resource. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/dnsBindPermission` */
  name: string;
  /** Request body */
  body?: GrantDnsBindPermissionRequest;
}

export const GrantProjectsLocationsDnsBindPermissionRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GrantDnsBindPermissionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsBindPermission:grant", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GrantProjectsLocationsDnsBindPermissionRequest>;

export type GrantProjectsLocationsDnsBindPermissionResponse = Operation;
export const GrantProjectsLocationsDnsBindPermissionResponse = Operation;

export type GrantProjectsLocationsDnsBindPermissionError = CommonErrors;

export const grantProjectsLocationsDnsBindPermission: API.OperationMethod<GrantProjectsLocationsDnsBindPermissionRequest, GrantProjectsLocationsDnsBindPermissionResponse, GrantProjectsLocationsDnsBindPermissionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GrantProjectsLocationsDnsBindPermissionRequest,
  output: GrantProjectsLocationsDnsBindPermissionResponse,
  errors: [],
}));

/** Revokes the bind permission from the customer provided principal(user / service account) on the intranet VPC associated with the consumer project. DnsBindPermission is a global resource and location can only be global. */
export interface RevokeProjectsLocationsDnsBindPermissionRequest {
  /** Required. The name of the resource which stores the users/service accounts having the permission to bind to the corresponding intranet VPC of the consumer project. DnsBindPermission is a global resource. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. For example: `projects/my-project/locations/global/dnsBindPermission` */
  name: string;
  /** Request body */
  body?: RevokeDnsBindPermissionRequest;
}

export const RevokeProjectsLocationsDnsBindPermissionRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RevokeDnsBindPermissionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dnsBindPermission:revoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokeProjectsLocationsDnsBindPermissionRequest>;

export type RevokeProjectsLocationsDnsBindPermissionResponse = Operation;
export const RevokeProjectsLocationsDnsBindPermissionResponse = Operation;

export type RevokeProjectsLocationsDnsBindPermissionError = CommonErrors;

export const revokeProjectsLocationsDnsBindPermission: API.OperationMethod<RevokeProjectsLocationsDnsBindPermissionRequest, RevokeProjectsLocationsDnsBindPermissionResponse, RevokeProjectsLocationsDnsBindPermissionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokeProjectsLocationsDnsBindPermissionRequest,
  output: RevokeProjectsLocationsDnsBindPermissionResponse,
  errors: [],
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
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

