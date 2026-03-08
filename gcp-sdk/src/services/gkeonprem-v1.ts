// ==========================================================================
// GKE On-Prem API (gkeonprem v1)
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
  name: "gkeonprem",
  version: "v1",
  rootUrl: "https://gkeonprem.googleapis.com/",
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

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface BareMetalIslandModeCidrConfig {
  /** Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field is mutable after creation starting with version 1.15. */
  serviceAddressCidrBlocks?: Array<string>;
  /** Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation. */
  podAddressCidrBlocks?: Array<string>;
}

export const BareMetalIslandModeCidrConfig: Schema.Schema<BareMetalIslandModeCidrConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
      podAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalIslandModeCidrConfig",
  }) as any as Schema.Schema<BareMetalIslandModeCidrConfig>;

export interface BareMetalMultipleNetworkInterfacesConfig {
  /** Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true. */
  enabled?: boolean;
}

export const BareMetalMultipleNetworkInterfacesConfig: Schema.Schema<BareMetalMultipleNetworkInterfacesConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalMultipleNetworkInterfacesConfig",
  }) as any as Schema.Schema<BareMetalMultipleNetworkInterfacesConfig>;

export interface BareMetalSrIovConfig {
  /** Whether to install the SR-IOV operator. */
  enabled?: boolean;
}

export const BareMetalSrIovConfig: Schema.Schema<BareMetalSrIovConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalSrIovConfig",
  }) as any as Schema.Schema<BareMetalSrIovConfig>;

export interface BareMetalNetworkConfig {
  /** Configuration for island mode CIDR. In an island-mode network, nodes have unique IP addresses, but pods don't have unique addresses across clusters. This doesn't cause problems because pods in one cluster never directly communicate with pods in another cluster. Instead, there are gateways that mediate between a pod in one cluster and a pod in another cluster. */
  islandModeCidr?: BareMetalIslandModeCidrConfig;
  /** Enables the use of advanced Anthos networking features, such as Bundled Load Balancing with BGP or the egress NAT gateway. Setting configuration for advanced networking features will automatically set this flag. */
  advancedNetworking?: boolean;
  /** Configuration for multiple network interfaces. */
  multipleNetworkInterfacesConfig?: BareMetalMultipleNetworkInterfacesConfig;
  /** Configuration for SR-IOV. */
  srIovConfig?: BareMetalSrIovConfig;
}

export const BareMetalNetworkConfig: Schema.Schema<BareMetalNetworkConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      islandModeCidr: Schema.optional(BareMetalIslandModeCidrConfig),
      advancedNetworking: Schema.optional(Schema.Boolean),
      multipleNetworkInterfacesConfig: Schema.optional(
        BareMetalMultipleNetworkInterfacesConfig,
      ),
      srIovConfig: Schema.optional(BareMetalSrIovConfig),
    }),
  ).annotate({
    identifier: "BareMetalNetworkConfig",
  }) as any as Schema.Schema<BareMetalNetworkConfig>;

export interface BareMetalNodeConfig {
  /** The default IPv4 address for SSH access and Kubernetes node. Example: 192.168.0.1 */
  nodeIp?: string;
  /** The labels assigned to this node. An object containing a list of key/value pairs. The labels here, unioned with the labels set on BareMetalNodePoolConfig are the set of labels that will be applied to the node. If there are any conflicts, the BareMetalNodeConfig labels take precedence. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. */
  labels?: Record<string, string>;
}

export const BareMetalNodeConfig: Schema.Schema<BareMetalNodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeIp: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalNodeConfig",
  }) as any as Schema.Schema<BareMetalNodeConfig>;

export interface NodeTaint {
  /** Key associated with the effect. */
  key?: string;
  /** Value associated with the effect. */
  value?: string;
  /** The taint effect. */
  effect?:
    | "EFFECT_UNSPECIFIED"
    | "NO_SCHEDULE"
    | "PREFER_NO_SCHEDULE"
    | "NO_EXECUTE"
    | (string & {});
}

export const NodeTaint: Schema.Schema<NodeTaint> = Schema.suspend(() =>
  Schema.Struct({
    key: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
    effect: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "NodeTaint" }) as any as Schema.Schema<NodeTaint>;

export interface BareMetalKubeletConfig {
  /** The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5. */
  registryPullQps?: number;
  /** The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10. */
  registryBurst?: number;
  /** Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details. */
  serializeImagePullsDisabled?: boolean;
}

export const BareMetalKubeletConfig: Schema.Schema<BareMetalKubeletConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      registryPullQps: Schema.optional(Schema.Number),
      registryBurst: Schema.optional(Schema.Number),
      serializeImagePullsDisabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalKubeletConfig",
  }) as any as Schema.Schema<BareMetalKubeletConfig>;

export interface BareMetalNodePoolConfig {
  /** Required. The list of machine addresses in the bare metal node pool. */
  nodeConfigs?: Array<BareMetalNodeConfig>;
  /** Specifies the nodes operating system (default: LINUX). */
  operatingSystem?: "OPERATING_SYSTEM_UNSPECIFIED" | "LINUX" | (string & {});
  /** The initial taints assigned to nodes of this node pool. */
  taints?: Array<NodeTaint>;
  /** The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. */
  labels?: Record<string, string>;
  /** The modifiable kubelet configurations for the bare metal machines. */
  kubeletConfig?: BareMetalKubeletConfig;
}

export const BareMetalNodePoolConfig: Schema.Schema<BareMetalNodePoolConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeConfigs: Schema.optional(Schema.Array(BareMetalNodeConfig)),
      operatingSystem: Schema.optional(Schema.String),
      taints: Schema.optional(Schema.Array(NodeTaint)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      kubeletConfig: Schema.optional(BareMetalKubeletConfig),
    }),
  ).annotate({
    identifier: "BareMetalNodePoolConfig",
  }) as any as Schema.Schema<BareMetalNodePoolConfig>;

export interface BareMetalControlPlaneNodePoolConfig {
  /** Required. The generic configuration for a node pool running the control plane. */
  nodePoolConfig?: BareMetalNodePoolConfig;
}

export const BareMetalControlPlaneNodePoolConfig: Schema.Schema<BareMetalControlPlaneNodePoolConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      nodePoolConfig: Schema.optional(BareMetalNodePoolConfig),
    }),
  ).annotate({
    identifier: "BareMetalControlPlaneNodePoolConfig",
  }) as any as Schema.Schema<BareMetalControlPlaneNodePoolConfig>;

export interface BareMetalApiServerArgument {
  /** Required. The argument name as it appears on the API Server command line, make sure to remove the leading dashes. */
  argument?: string;
  /** Required. The value of the arg as it will be passed to the API Server command line. */
  value?: string;
}

export const BareMetalApiServerArgument: Schema.Schema<BareMetalApiServerArgument> =
  Schema.suspend(() =>
    Schema.Struct({
      argument: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalApiServerArgument",
  }) as any as Schema.Schema<BareMetalApiServerArgument>;

export interface BareMetalControlPlaneConfig {
  /** Required. Configures the node pool running the control plane. */
  controlPlaneNodePoolConfig?: BareMetalControlPlaneNodePoolConfig;
  /** Customizes the default API server args. Only a subset of customized flags are supported. For the exact format, refer to the [API server documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/). */
  apiServerArgs?: Array<BareMetalApiServerArgument>;
}

export const BareMetalControlPlaneConfig: Schema.Schema<BareMetalControlPlaneConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneNodePoolConfig: Schema.optional(
        BareMetalControlPlaneNodePoolConfig,
      ),
      apiServerArgs: Schema.optional(Schema.Array(BareMetalApiServerArgument)),
    }),
  ).annotate({
    identifier: "BareMetalControlPlaneConfig",
  }) as any as Schema.Schema<BareMetalControlPlaneConfig>;

export interface BareMetalVipConfig {
  /** The VIP which you previously set aside for the Kubernetes API of this bare metal user cluster. */
  controlPlaneVip?: string;
  /** The VIP which you previously set aside for ingress traffic into this bare metal user cluster. */
  ingressVip?: string;
}

export const BareMetalVipConfig: Schema.Schema<BareMetalVipConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneVip: Schema.optional(Schema.String),
      ingressVip: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalVipConfig",
  }) as any as Schema.Schema<BareMetalVipConfig>;

export interface BareMetalPortConfig {
  /** The port that control plane hosted load balancers will listen on. */
  controlPlaneLoadBalancerPort?: number;
}

export const BareMetalPortConfig: Schema.Schema<BareMetalPortConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneLoadBalancerPort: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BareMetalPortConfig",
  }) as any as Schema.Schema<BareMetalPortConfig>;

export interface BareMetalLoadBalancerAddressPool {
  /** Required. The name of the address pool. */
  pool?: string;
  /** Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5). */
  addresses?: Array<string>;
  /** If true, avoid using IPs ending in .0 or .255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses. */
  avoidBuggyIps?: boolean;
  /** If true, prevent IP addresses from being automatically assigned. */
  manualAssign?: boolean;
}

export const BareMetalLoadBalancerAddressPool: Schema.Schema<BareMetalLoadBalancerAddressPool> =
  Schema.suspend(() =>
    Schema.Struct({
      pool: Schema.optional(Schema.String),
      addresses: Schema.optional(Schema.Array(Schema.String)),
      avoidBuggyIps: Schema.optional(Schema.Boolean),
      manualAssign: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalLoadBalancerAddressPool",
  }) as any as Schema.Schema<BareMetalLoadBalancerAddressPool>;

export interface BareMetalLoadBalancerNodePoolConfig {
  /** The generic configuration for a node pool running a load balancer. */
  nodePoolConfig?: BareMetalNodePoolConfig;
}

export const BareMetalLoadBalancerNodePoolConfig: Schema.Schema<BareMetalLoadBalancerNodePoolConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      nodePoolConfig: Schema.optional(BareMetalNodePoolConfig),
    }),
  ).annotate({
    identifier: "BareMetalLoadBalancerNodePoolConfig",
  }) as any as Schema.Schema<BareMetalLoadBalancerNodePoolConfig>;

export interface BareMetalMetalLbConfig {
  /** Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. */
  addressPools?: Array<BareMetalLoadBalancerAddressPool>;
  /** Specifies the node pool running the load balancer. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used as the load balancer pool. */
  loadBalancerNodePoolConfig?: BareMetalLoadBalancerNodePoolConfig;
}

export const BareMetalMetalLbConfig: Schema.Schema<BareMetalMetalLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      addressPools: Schema.optional(
        Schema.Array(BareMetalLoadBalancerAddressPool),
      ),
      loadBalancerNodePoolConfig: Schema.optional(
        BareMetalLoadBalancerNodePoolConfig,
      ),
    }),
  ).annotate({
    identifier: "BareMetalMetalLbConfig",
  }) as any as Schema.Schema<BareMetalMetalLbConfig>;

export interface BareMetalManualLbConfig {
  /** Whether manual load balancing is enabled. */
  enabled?: boolean;
}

export const BareMetalManualLbConfig: Schema.Schema<BareMetalManualLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalManualLbConfig",
  }) as any as Schema.Schema<BareMetalManualLbConfig>;

export interface BareMetalBgpPeerConfig {
  /** Required. BGP autonomous system number (ASN) for the network that contains the external peer device. */
  asn?: string;
  /** Required. The IP address of the external peer device. */
  ipAddress?: string;
  /** The IP address of the control plane node that connects to the external peer. If you don't specify any control plane nodes, all control plane nodes can connect to the external peer. If you specify one or more IP addresses, only the nodes specified participate in peering sessions. */
  controlPlaneNodes?: Array<string>;
}

export const BareMetalBgpPeerConfig: Schema.Schema<BareMetalBgpPeerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      asn: Schema.optional(Schema.String),
      ipAddress: Schema.optional(Schema.String),
      controlPlaneNodes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalBgpPeerConfig",
  }) as any as Schema.Schema<BareMetalBgpPeerConfig>;

export interface BareMetalBgpLbConfig {
  /** Required. BGP autonomous system number (ASN) of the cluster. This field can be updated after cluster creation. */
  asn?: string;
  /** Required. The list of BGP peers that the cluster will connect to. At least one peer must be configured for each control plane node. Control plane nodes will connect to these peers to advertise the control plane VIP. The Services load balancer also uses these peers by default. This field can be updated after cluster creation. */
  bgpPeerConfigs?: Array<BareMetalBgpPeerConfig>;
  /** Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. */
  addressPools?: Array<BareMetalLoadBalancerAddressPool>;
  /** Specifies the node pool running data plane load balancing. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used for data plane load balancing. */
  loadBalancerNodePoolConfig?: BareMetalLoadBalancerNodePoolConfig;
}

export const BareMetalBgpLbConfig: Schema.Schema<BareMetalBgpLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      asn: Schema.optional(Schema.String),
      bgpPeerConfigs: Schema.optional(Schema.Array(BareMetalBgpPeerConfig)),
      addressPools: Schema.optional(
        Schema.Array(BareMetalLoadBalancerAddressPool),
      ),
      loadBalancerNodePoolConfig: Schema.optional(
        BareMetalLoadBalancerNodePoolConfig,
      ),
    }),
  ).annotate({
    identifier: "BareMetalBgpLbConfig",
  }) as any as Schema.Schema<BareMetalBgpLbConfig>;

export interface BareMetalLoadBalancerConfig {
  /** The VIPs used by the load balancer. */
  vipConfig?: BareMetalVipConfig;
  /** Configures the ports that the load balancer will listen on. */
  portConfig?: BareMetalPortConfig;
  /** Configuration for MetalLB load balancers. */
  metalLbConfig?: BareMetalMetalLbConfig;
  /** Manually configured load balancers. */
  manualLbConfig?: BareMetalManualLbConfig;
  /** Configuration for BGP typed load balancers. When set network_config.advanced_networking is automatically set to true. */
  bgpLbConfig?: BareMetalBgpLbConfig;
}

export const BareMetalLoadBalancerConfig: Schema.Schema<BareMetalLoadBalancerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      vipConfig: Schema.optional(BareMetalVipConfig),
      portConfig: Schema.optional(BareMetalPortConfig),
      metalLbConfig: Schema.optional(BareMetalMetalLbConfig),
      manualLbConfig: Schema.optional(BareMetalManualLbConfig),
      bgpLbConfig: Schema.optional(BareMetalBgpLbConfig),
    }),
  ).annotate({
    identifier: "BareMetalLoadBalancerConfig",
  }) as any as Schema.Schema<BareMetalLoadBalancerConfig>;

export interface BareMetalLvpConfig {
  /** Required. The host machine path. */
  path?: string;
  /** Required. The StorageClass name that PVs will be created with. */
  storageClass?: string;
}

export const BareMetalLvpConfig: Schema.Schema<BareMetalLvpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      path: Schema.optional(Schema.String),
      storageClass: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalLvpConfig",
  }) as any as Schema.Schema<BareMetalLvpConfig>;

export interface BareMetalLvpShareConfig {
  /** Required. Defines the machine path and storage class for the LVP Share. */
  lvpConfig?: BareMetalLvpConfig;
  /** The number of subdirectories to create under path. */
  sharedPathPvCount?: number;
}

export const BareMetalLvpShareConfig: Schema.Schema<BareMetalLvpShareConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      lvpConfig: Schema.optional(BareMetalLvpConfig),
      sharedPathPvCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BareMetalLvpShareConfig",
  }) as any as Schema.Schema<BareMetalLvpShareConfig>;

export interface BareMetalStorageConfig {
  /** Required. Specifies the config for local PersistentVolumes backed by subdirectories in a shared filesystem. These subdirectores are automatically created during cluster creation. */
  lvpShareConfig?: BareMetalLvpShareConfig;
  /** Required. Specifies the config for local PersistentVolumes backed by mounted node disks. These disks need to be formatted and mounted by the user, which can be done before or after cluster creation. */
  lvpNodeMountsConfig?: BareMetalLvpConfig;
}

export const BareMetalStorageConfig: Schema.Schema<BareMetalStorageConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      lvpShareConfig: Schema.optional(BareMetalLvpShareConfig),
      lvpNodeMountsConfig: Schema.optional(BareMetalLvpConfig),
    }),
  ).annotate({
    identifier: "BareMetalStorageConfig",
  }) as any as Schema.Schema<BareMetalStorageConfig>;

export interface BareMetalProxyConfig {
  /** Required. Specifies the address of your proxy server. Examples: `http://domain` Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server. */
  uri?: string;
  /** A list of IPs, hostnames, and domains that should skip the proxy. Examples: ["127.0.0.1", "example.com", ".corp", "localhost"]. */
  noProxy?: Array<string>;
}

export const BareMetalProxyConfig: Schema.Schema<BareMetalProxyConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      noProxy: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalProxyConfig",
  }) as any as Schema.Schema<BareMetalProxyConfig>;

export interface BareMetalClusterOperationsConfig {
  /** Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics). */
  enableApplicationLogs?: boolean;
}

export const BareMetalClusterOperationsConfig: Schema.Schema<BareMetalClusterOperationsConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enableApplicationLogs: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalClusterOperationsConfig",
  }) as any as Schema.Schema<BareMetalClusterOperationsConfig>;

export interface BareMetalMaintenanceConfig {
  /** Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource. */
  maintenanceAddressCidrBlocks?: Array<string>;
}

export const BareMetalMaintenanceConfig: Schema.Schema<BareMetalMaintenanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      maintenanceAddressCidrBlocks: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "BareMetalMaintenanceConfig",
  }) as any as Schema.Schema<BareMetalMaintenanceConfig>;

export interface BareMetalWorkloadNodeConfig {
  /** The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter. */
  maxPodsPerNode?: string;
  /** Specifies which container runtime will be used. */
  containerRuntime?:
    | "CONTAINER_RUNTIME_UNSPECIFIED"
    | "CONTAINERD"
    | (string & {});
}

export const BareMetalWorkloadNodeConfig: Schema.Schema<BareMetalWorkloadNodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      maxPodsPerNode: Schema.optional(Schema.String),
      containerRuntime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalWorkloadNodeConfig",
  }) as any as Schema.Schema<BareMetalWorkloadNodeConfig>;

export interface Fleet {
  /** Output only. The name of the managed fleet Membership resource associated to this cluster. Membership names are formatted as `projects//locations//memberships/`. */
  membership?: string;
}

export const Fleet: Schema.Schema<Fleet> = Schema.suspend(() =>
  Schema.Struct({
    membership: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Fleet" }) as any as Schema.Schema<Fleet>;

export interface ResourceCondition {
  /** Type of the condition. (e.g., ClusterRunning, NodePoolRunning or ServerSidePreflightReady) */
  type?: string;
  /** Machine-readable message indicating details about last transition. */
  reason?: string;
  /** Human-readable message indicating details about last transition. */
  message?: string;
  /** Last time the condition transit from one status to another. */
  lastTransitionTime?: string;
  /** state of the condition. */
  state?:
    | "STATE_UNSPECIFIED"
    | "STATE_TRUE"
    | "STATE_FALSE"
    | "STATE_UNKNOWN"
    | (string & {});
}

export const ResourceCondition: Schema.Schema<ResourceCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
      lastTransitionTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceCondition",
  }) as any as Schema.Schema<ResourceCondition>;

export interface Version {
  /** Resource version. */
  version?: string;
  /** Number of machines under the above version. */
  count?: string;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.String),
    count: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface Versions {
  /** Shows the mapping of a given version to the number of machines under this version. */
  versions?: Array<Version>;
}

export const Versions: Schema.Schema<Versions> = Schema.suspend(() =>
  Schema.Struct({
    versions: Schema.optional(Schema.Array(Version)),
  }),
).annotate({ identifier: "Versions" }) as any as Schema.Schema<Versions>;

export interface ResourceStatus {
  /** Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention. */
  errorMessage?: string;
  /** ResourceCondition provide a standard mechanism for higher-level status reporting from controller. */
  conditions?: Array<ResourceCondition>;
  /** Reflect current version of the resource. */
  version?: string;
  /** Shows the mapping of a given version to the number of machines under this version. */
  versions?: Versions;
}

export const ResourceStatus: Schema.Schema<ResourceStatus> = Schema.suspend(
  () =>
    Schema.Struct({
      errorMessage: Schema.optional(Schema.String),
      conditions: Schema.optional(Schema.Array(ResourceCondition)),
      version: Schema.optional(Schema.String),
      versions: Schema.optional(Versions),
    }),
).annotate({
  identifier: "ResourceStatus",
}) as any as Schema.Schema<ResourceStatus>;

export interface ValidationCheckResult {
  /** The validation check state. */
  state?:
    | "STATE_UNKNOWN"
    | "STATE_FAILURE"
    | "STATE_SKIPPED"
    | "STATE_FATAL"
    | "STATE_WARNING"
    | (string & {});
  /** The description of the validation check. */
  description?: string;
  /** The category of the validation. */
  category?: string;
  /** A human-readable message of the check failure. */
  reason?: string;
  /** Detailed failure information, which might be unformatted. */
  details?: string;
}

export const ValidationCheckResult: Schema.Schema<ValidationCheckResult> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ValidationCheckResult",
  }) as any as Schema.Schema<ValidationCheckResult>;

export interface ValidationCheckStatus {
  /** Individual checks which failed as part of the Preflight check execution. */
  result?: Array<ValidationCheckResult>;
}

export const ValidationCheckStatus: Schema.Schema<ValidationCheckStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(Schema.Array(ValidationCheckResult)),
    }),
  ).annotate({
    identifier: "ValidationCheckStatus",
  }) as any as Schema.Schema<ValidationCheckStatus>;

export interface ValidationCheck {
  /** Options used for the validation check */
  option?:
    | "OPTIONS_UNSPECIFIED"
    | "SKIP_VALIDATION_CHECK_BLOCKING"
    | "SKIP_VALIDATION_ALL"
    | (string & {});
  /** Output only. The detailed validation check status. */
  status?: ValidationCheckStatus;
  /** Output only. The scenario when the preflight checks were run. */
  scenario?: "SCENARIO_UNSPECIFIED" | "CREATE" | "UPDATE" | (string & {});
}

export const ValidationCheck: Schema.Schema<ValidationCheck> = Schema.suspend(
  () =>
    Schema.Struct({
      option: Schema.optional(Schema.String),
      status: Schema.optional(ValidationCheckStatus),
      scenario: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ValidationCheck",
}) as any as Schema.Schema<ValidationCheck>;

export interface ClusterUser {
  /** Required. The name of the user, e.g. `my-gcp-id@gmail.com`. */
  username?: string;
}

export const ClusterUser: Schema.Schema<ClusterUser> = Schema.suspend(() =>
  Schema.Struct({
    username: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ClusterUser" }) as any as Schema.Schema<ClusterUser>;

export interface Authorization {
  /** For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access. */
  adminUsers?: Array<ClusterUser>;
}

export const Authorization: Schema.Schema<Authorization> = Schema.suspend(() =>
  Schema.Struct({
    adminUsers: Schema.optional(Schema.Array(ClusterUser)),
  }),
).annotate({
  identifier: "Authorization",
}) as any as Schema.Schema<Authorization>;

export interface BareMetalSecurityConfig {
  /** Configures user access to the user cluster. */
  authorization?: Authorization;
}

export const BareMetalSecurityConfig: Schema.Schema<BareMetalSecurityConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      authorization: Schema.optional(Authorization),
    }),
  ).annotate({
    identifier: "BareMetalSecurityConfig",
  }) as any as Schema.Schema<BareMetalSecurityConfig>;

export interface BareMetalDrainingMachine {
  /** Draining machine IP address. */
  nodeIp?: string;
  /** The count of pods yet to drain. */
  podCount?: number;
}

export const BareMetalDrainingMachine: Schema.Schema<BareMetalDrainingMachine> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeIp: Schema.optional(Schema.String),
      podCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BareMetalDrainingMachine",
  }) as any as Schema.Schema<BareMetalDrainingMachine>;

export interface BareMetalDrainedMachine {
  /** Drained machine IP address. */
  nodeIp?: string;
}

export const BareMetalDrainedMachine: Schema.Schema<BareMetalDrainedMachine> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeIp: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalDrainedMachine",
  }) as any as Schema.Schema<BareMetalDrainedMachine>;

export interface BareMetalMachineDrainStatus {
  /** The list of draning machines. */
  drainingMachines?: Array<BareMetalDrainingMachine>;
  /** The list of drained machines. */
  drainedMachines?: Array<BareMetalDrainedMachine>;
}

export const BareMetalMachineDrainStatus: Schema.Schema<BareMetalMachineDrainStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      drainingMachines: Schema.optional(Schema.Array(BareMetalDrainingMachine)),
      drainedMachines: Schema.optional(Schema.Array(BareMetalDrainedMachine)),
    }),
  ).annotate({
    identifier: "BareMetalMachineDrainStatus",
  }) as any as Schema.Schema<BareMetalMachineDrainStatus>;

export interface BareMetalMaintenanceStatus {
  /** The maintenance status of node machines. */
  machineDrainStatus?: BareMetalMachineDrainStatus;
}

export const BareMetalMaintenanceStatus: Schema.Schema<BareMetalMaintenanceStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      machineDrainStatus: Schema.optional(BareMetalMachineDrainStatus),
    }),
  ).annotate({
    identifier: "BareMetalMaintenanceStatus",
  }) as any as Schema.Schema<BareMetalMaintenanceStatus>;

export interface BareMetalNodeAccessConfig {
  /** LoginUser is the user name used to access node machines. It defaults to "root" if not set. */
  loginUser?: string;
}

export const BareMetalNodeAccessConfig: Schema.Schema<BareMetalNodeAccessConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      loginUser: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalNodeAccessConfig",
  }) as any as Schema.Schema<BareMetalNodeAccessConfig>;

export interface BareMetalOsEnvironmentConfig {
  /** Whether the package repo should not be included when initializing bare metal machines. */
  packageRepoExcluded?: boolean;
}

export const BareMetalOsEnvironmentConfig: Schema.Schema<BareMetalOsEnvironmentConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      packageRepoExcluded: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalOsEnvironmentConfig",
  }) as any as Schema.Schema<BareMetalOsEnvironmentConfig>;

export interface BinaryAuthorization {
  /** Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED. */
  evaluationMode?:
    | "EVALUATION_MODE_UNSPECIFIED"
    | "DISABLED"
    | "PROJECT_SINGLETON_POLICY_ENFORCE"
    | (string & {});
}

export const BinaryAuthorization: Schema.Schema<BinaryAuthorization> =
  Schema.suspend(() =>
    Schema.Struct({
      evaluationMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BinaryAuthorization",
  }) as any as Schema.Schema<BinaryAuthorization>;

export interface BareMetalClusterUpgradePolicy {
  /** Specifies which upgrade policy to use. */
  policy?:
    | "NODE_POOL_POLICY_UNSPECIFIED"
    | "SERIAL"
    | "CONCURRENT"
    | (string & {});
  /** Output only. Pause is used to show the upgrade pause status. It's view only for now. */
  pause?: boolean;
}

export const BareMetalClusterUpgradePolicy: Schema.Schema<BareMetalClusterUpgradePolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Schema.String),
      pause: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalClusterUpgradePolicy",
  }) as any as Schema.Schema<BareMetalClusterUpgradePolicy>;

export interface BareMetalCluster {
  /** Immutable. The bare metal user cluster resource name. */
  name?: string;
  /** Required. The admin cluster this bare metal user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. */
  adminClusterMembership?: string;
  /** A human readable description of this bare metal user cluster. */
  description?: string;
  /** Required. The Anthos clusters on bare metal version for your user cluster. */
  bareMetalVersion?: string;
  /** Output only. The unique identifier of the bare metal user cluster. */
  uid?: string;
  /** Output only. The current state of the bare metal user cluster. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PROVISIONING"
    | "RUNNING"
    | "RECONCILING"
    | "STOPPING"
    | "ERROR"
    | "DEGRADED"
    | (string & {});
  /** Output only. The IP address of the bare metal user cluster's API server. */
  endpoint?: string;
  /** Output only. If set, there are currently changes in flight to the bare metal user cluster. */
  reconciling?: boolean;
  /** Output only. The time when the bare metal user cluster was created. */
  createTime?: string;
  /** Output only. The time when the bare metal user cluster was last updated. */
  updateTime?: string;
  /** Output only. The time when the bare metal user cluster was deleted. If the resource is not deleted, this must be empty */
  deleteTime?: string;
  /** Output only. The object name of the bare metal user cluster custom resource on the associated admin cluster. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the name in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. When the local name and cluster name differ, the local name is used in the admin cluster controller logs. You use the cluster name when accessing the cluster using bmctl and kubectl. */
  localName?: string;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. */
  etag?: string;
  /** Annotations on the bare metal user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** Required. Network configuration. */
  networkConfig?: BareMetalNetworkConfig;
  /** Required. Control plane configuration. */
  controlPlane?: BareMetalControlPlaneConfig;
  /** Required. Load balancer configuration. */
  loadBalancer?: BareMetalLoadBalancerConfig;
  /** Required. Storage configuration. */
  storage?: BareMetalStorageConfig;
  /** Proxy configuration. */
  proxy?: BareMetalProxyConfig;
  /** Cluster operations configuration. */
  clusterOperations?: BareMetalClusterOperationsConfig;
  /** Maintenance configuration. */
  maintenanceConfig?: BareMetalMaintenanceConfig;
  /** Workload node configuration. */
  nodeConfig?: BareMetalWorkloadNodeConfig;
  /** Output only. Fleet configuration for the cluster. */
  fleet?: Fleet;
  /** Output only. Detailed cluster status. */
  status?: ResourceStatus;
  /** Output only. The result of the preflight check. */
  validationCheck?: ValidationCheck;
  /** Security related setting configuration. */
  securityConfig?: BareMetalSecurityConfig;
  /** Output only. Status of on-going maintenance tasks. */
  maintenanceStatus?: BareMetalMaintenanceStatus;
  /** Output only. The resource name of the bare metal admin cluster managing this user cluster. */
  adminClusterName?: string;
  /** Node access related configurations. */
  nodeAccessConfig?: BareMetalNodeAccessConfig;
  /** OS environment related configurations. */
  osEnvironmentConfig?: BareMetalOsEnvironmentConfig;
  /** Binary Authorization related configurations. */
  binaryAuthorization?: BinaryAuthorization;
  /** The cluster upgrade policy. */
  upgradePolicy?: BareMetalClusterUpgradePolicy;
  /** Output only. The namespace of the cluster. */
  localNamespace?: string;
}

export const BareMetalCluster: Schema.Schema<BareMetalCluster> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      adminClusterMembership: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      bareMetalVersion: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      endpoint: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      localName: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      networkConfig: Schema.optional(BareMetalNetworkConfig),
      controlPlane: Schema.optional(BareMetalControlPlaneConfig),
      loadBalancer: Schema.optional(BareMetalLoadBalancerConfig),
      storage: Schema.optional(BareMetalStorageConfig),
      proxy: Schema.optional(BareMetalProxyConfig),
      clusterOperations: Schema.optional(BareMetalClusterOperationsConfig),
      maintenanceConfig: Schema.optional(BareMetalMaintenanceConfig),
      nodeConfig: Schema.optional(BareMetalWorkloadNodeConfig),
      fleet: Schema.optional(Fleet),
      status: Schema.optional(ResourceStatus),
      validationCheck: Schema.optional(ValidationCheck),
      securityConfig: Schema.optional(BareMetalSecurityConfig),
      maintenanceStatus: Schema.optional(BareMetalMaintenanceStatus),
      adminClusterName: Schema.optional(Schema.String),
      nodeAccessConfig: Schema.optional(BareMetalNodeAccessConfig),
      osEnvironmentConfig: Schema.optional(BareMetalOsEnvironmentConfig),
      binaryAuthorization: Schema.optional(BinaryAuthorization),
      upgradePolicy: Schema.optional(BareMetalClusterUpgradePolicy),
      localNamespace: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "BareMetalCluster",
}) as any as Schema.Schema<BareMetalCluster>;

export interface EnrollBareMetalClusterRequest {
  /** User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all bare metal clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. */
  bareMetalClusterId?: string;
  /** Optional. The object name of the bare metal cluster custom resource on the associated admin cluster. This field is used to support conflicting resource names when enrolling existing clusters to the API. When not provided, this field will resolve to the bare_metal_cluster_id. Otherwise, it must match the object name of the bare metal cluster custom resource. It is not modifiable outside / beyond the enrollment operation. */
  localName?: string;
  /** Required. The admin cluster this bare metal user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources. */
  adminClusterMembership?: string;
  /** Optional. The namespace of the cluster. */
  localNamespace?: string;
}

export const EnrollBareMetalClusterRequest: Schema.Schema<EnrollBareMetalClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      bareMetalClusterId: Schema.optional(Schema.String),
      localName: Schema.optional(Schema.String),
      adminClusterMembership: Schema.optional(Schema.String),
      localNamespace: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnrollBareMetalClusterRequest",
  }) as any as Schema.Schema<EnrollBareMetalClusterRequest>;

export interface ListBareMetalClustersResponse {
  /** The list of bare metal Clusters. */
  bareMetalClusters?: Array<BareMetalCluster>;
  /** A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBareMetalClustersResponse: Schema.Schema<ListBareMetalClustersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      bareMetalClusters: Schema.optional(Schema.Array(BareMetalCluster)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListBareMetalClustersResponse",
  }) as any as Schema.Schema<ListBareMetalClustersResponse>;

export interface UpgradeDependency {
  /** Resource name of the dependency. */
  resourceName?: string;
  /** Current version of the dependency e.g. 1.15.0. */
  currentVersion?: string;
  /** Target version of the dependency e.g. 1.16.1. This is the version the dependency needs to be upgraded to before a resource can be upgraded. */
  targetVersion?: string;
  /** Membership names are formatted as `projects//locations//memberships/`. */
  membership?: string;
}

export const UpgradeDependency: Schema.Schema<UpgradeDependency> =
  Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
      currentVersion: Schema.optional(Schema.String),
      targetVersion: Schema.optional(Schema.String),
      membership: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeDependency",
  }) as any as Schema.Schema<UpgradeDependency>;

export interface BareMetalVersionInfo {
  /** Version number e.g. 1.13.1. */
  version?: string;
  /** If set, the cluster dependencies (e.g. the admin cluster, other user clusters managed by the same admin cluster, version skew policy, etc) must be upgraded before this version can be installed or upgraded to. */
  hasDependencies?: boolean;
  /** The list of upgrade dependencies for this version. */
  dependencies?: Array<UpgradeDependency>;
}

export const BareMetalVersionInfo: Schema.Schema<BareMetalVersionInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      hasDependencies: Schema.optional(Schema.Boolean),
      dependencies: Schema.optional(Schema.Array(UpgradeDependency)),
    }),
  ).annotate({
    identifier: "BareMetalVersionInfo",
  }) as any as Schema.Schema<BareMetalVersionInfo>;

export interface QueryBareMetalVersionConfigResponse {
  /** List of available versions to install or to upgrade to. */
  versions?: Array<BareMetalVersionInfo>;
}

export const QueryBareMetalVersionConfigResponse: Schema.Schema<QueryBareMetalVersionConfigResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(BareMetalVersionInfo)),
    }),
  ).annotate({
    identifier: "QueryBareMetalVersionConfigResponse",
  }) as any as Schema.Schema<QueryBareMetalVersionConfigResponse>;

export interface EnrollVmwareClusterRequest {
  /** User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all GKE on-prem clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. */
  vmwareClusterId?: string;
  /** Optional. The object name of the VMware OnPremUserCluster custom resource on the associated admin cluster. This field is used to support conflicting resource names when enrolling existing clusters to the API. When not provided, this field will resolve to the vmware_cluster_id. Otherwise, it must match the object name of the VMware OnPremUserCluster custom resource. It is not modifiable outside / beyond the enrollment operation. */
  localName?: string;
  /** Required. The admin cluster this VMware user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources. */
  adminClusterMembership?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
}

export const EnrollVmwareClusterRequest: Schema.Schema<EnrollVmwareClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      vmwareClusterId: Schema.optional(Schema.String),
      localName: Schema.optional(Schema.String),
      adminClusterMembership: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "EnrollVmwareClusterRequest",
  }) as any as Schema.Schema<EnrollVmwareClusterRequest>;

export interface VmwareAutoResizeConfig {
  /** Whether to enable controle plane node auto resizing. */
  enabled?: boolean;
}

export const VmwareAutoResizeConfig: Schema.Schema<VmwareAutoResizeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareAutoResizeConfig",
  }) as any as Schema.Schema<VmwareAutoResizeConfig>;

export interface VmwareControlPlaneVsphereConfig {
  /** The Vsphere datastore used by the control plane Node. */
  datastore?: string;
  /** The Vsphere storage policy used by the control plane Node. */
  storagePolicyName?: string;
}

export const VmwareControlPlaneVsphereConfig: Schema.Schema<VmwareControlPlaneVsphereConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      datastore: Schema.optional(Schema.String),
      storagePolicyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareControlPlaneVsphereConfig",
  }) as any as Schema.Schema<VmwareControlPlaneVsphereConfig>;

export interface VmwareControlPlaneNodeConfig {
  /** The number of CPUs for each admin cluster node that serve as control planes for this VMware user cluster. (default: 4 CPUs) */
  cpus?: string;
  /** The megabytes of memory for each admin cluster node that serves as a control plane for this VMware user cluster (default: 8192 MB memory). */
  memory?: string;
  /** The number of control plane nodes for this VMware user cluster. (default: 1 replica). */
  replicas?: string;
  /** AutoResizeConfig provides auto resizing configurations. */
  autoResizeConfig?: VmwareAutoResizeConfig;
  /** Vsphere-specific config. */
  vsphereConfig?: VmwareControlPlaneVsphereConfig;
}

export const VmwareControlPlaneNodeConfig: Schema.Schema<VmwareControlPlaneNodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      cpus: Schema.optional(Schema.String),
      memory: Schema.optional(Schema.String),
      replicas: Schema.optional(Schema.String),
      autoResizeConfig: Schema.optional(VmwareAutoResizeConfig),
      vsphereConfig: Schema.optional(VmwareControlPlaneVsphereConfig),
    }),
  ).annotate({
    identifier: "VmwareControlPlaneNodeConfig",
  }) as any as Schema.Schema<VmwareControlPlaneNodeConfig>;

export interface VmwareAAGConfig {
  /** Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default. */
  aagConfigDisabled?: boolean;
}

export const VmwareAAGConfig: Schema.Schema<VmwareAAGConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      aagConfigDisabled: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "VmwareAAGConfig",
}) as any as Schema.Schema<VmwareAAGConfig>;

export interface VmwareStorageConfig {
  /** Whether or not to deploy vSphere CSI components in the VMware user cluster. Enabled by default. */
  vsphereCsiDisabled?: boolean;
}

export const VmwareStorageConfig: Schema.Schema<VmwareStorageConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      vsphereCsiDisabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareStorageConfig",
  }) as any as Schema.Schema<VmwareStorageConfig>;

export interface VmwareHostIp {
  /** IP could be an IP address (like 1.2.3.4) or a CIDR (like 1.2.3.0/24). */
  ip?: string;
  /** Hostname of the machine. VM's name will be used if this field is empty. */
  hostname?: string;
}

export const VmwareHostIp: Schema.Schema<VmwareHostIp> = Schema.suspend(() =>
  Schema.Struct({
    ip: Schema.optional(Schema.String),
    hostname: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "VmwareHostIp",
}) as any as Schema.Schema<VmwareHostIp>;

export interface VmwareIpBlock {
  /** The netmask used by the VMware user cluster. */
  netmask?: string;
  /** The network gateway used by the VMware user cluster. */
  gateway?: string;
  /** The node's network configurations used by the VMware user cluster. */
  ips?: Array<VmwareHostIp>;
}

export const VmwareIpBlock: Schema.Schema<VmwareIpBlock> = Schema.suspend(() =>
  Schema.Struct({
    netmask: Schema.optional(Schema.String),
    gateway: Schema.optional(Schema.String),
    ips: Schema.optional(Schema.Array(VmwareHostIp)),
  }),
).annotate({
  identifier: "VmwareIpBlock",
}) as any as Schema.Schema<VmwareIpBlock>;

export interface VmwareStaticIpConfig {
  /** Represents the configuration values for static IP allocation to nodes. */
  ipBlocks?: Array<VmwareIpBlock>;
}

export const VmwareStaticIpConfig: Schema.Schema<VmwareStaticIpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      ipBlocks: Schema.optional(Schema.Array(VmwareIpBlock)),
    }),
  ).annotate({
    identifier: "VmwareStaticIpConfig",
  }) as any as Schema.Schema<VmwareStaticIpConfig>;

export interface VmwareDhcpIpConfig {
  /** enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters. */
  enabled?: boolean;
}

export const VmwareDhcpIpConfig: Schema.Schema<VmwareDhcpIpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareDhcpIpConfig",
  }) as any as Schema.Schema<VmwareDhcpIpConfig>;

export interface VmwareHostConfig {
  /** DNS servers. */
  dnsServers?: Array<string>;
  /** NTP servers. */
  ntpServers?: Array<string>;
  /** DNS search domains. */
  dnsSearchDomains?: Array<string>;
}

export const VmwareHostConfig: Schema.Schema<VmwareHostConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      dnsServers: Schema.optional(Schema.Array(Schema.String)),
      ntpServers: Schema.optional(Schema.Array(Schema.String)),
      dnsSearchDomains: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "VmwareHostConfig",
}) as any as Schema.Schema<VmwareHostConfig>;

export interface VmwareControlPlaneV2Config {
  /** Static IP addresses for the control plane nodes. */
  controlPlaneIpBlock?: VmwareIpBlock;
}

export const VmwareControlPlaneV2Config: Schema.Schema<VmwareControlPlaneV2Config> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneIpBlock: Schema.optional(VmwareIpBlock),
    }),
  ).annotate({
    identifier: "VmwareControlPlaneV2Config",
  }) as any as Schema.Schema<VmwareControlPlaneV2Config>;

export interface VmwareNetworkConfig {
  /** Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. */
  serviceAddressCidrBlocks?: Array<string>;
  /** Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. */
  podAddressCidrBlocks?: Array<string>;
  /** Configuration settings for a static IP configuration. */
  staticIpConfig?: VmwareStaticIpConfig;
  /** Configuration settings for a DHCP IP configuration. */
  dhcpIpConfig?: VmwareDhcpIpConfig;
  /** vcenter_network specifies vCenter network name. Inherited from the admin cluster. */
  vcenterNetwork?: string;
  /** Represents common network settings irrespective of the host's IP address. */
  hostConfig?: VmwareHostConfig;
  /** Configuration for control plane V2 mode. */
  controlPlaneV2Config?: VmwareControlPlaneV2Config;
}

export const VmwareNetworkConfig: Schema.Schema<VmwareNetworkConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
      podAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
      staticIpConfig: Schema.optional(VmwareStaticIpConfig),
      dhcpIpConfig: Schema.optional(VmwareDhcpIpConfig),
      vcenterNetwork: Schema.optional(Schema.String),
      hostConfig: Schema.optional(VmwareHostConfig),
      controlPlaneV2Config: Schema.optional(VmwareControlPlaneV2Config),
    }),
  ).annotate({
    identifier: "VmwareNetworkConfig",
  }) as any as Schema.Schema<VmwareNetworkConfig>;

export interface VmwareVipConfig {
  /** The VIP which you previously set aside for the Kubernetes API of this cluster. */
  controlPlaneVip?: string;
  /** The VIP which you previously set aside for ingress traffic into this cluster. */
  ingressVip?: string;
}

export const VmwareVipConfig: Schema.Schema<VmwareVipConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      controlPlaneVip: Schema.optional(Schema.String),
      ingressVip: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "VmwareVipConfig",
}) as any as Schema.Schema<VmwareVipConfig>;

export interface VmwareF5BigIpConfig {
  /** The load balancer's IP address. */
  address?: string;
  /** The preexisting partition to be used by the load balancer. This partition is usually created for the admin cluster for example: 'my-f5-admin-partition'. */
  partition?: string;
  /** The pool name. Only necessary, if using SNAT. */
  snatPool?: string;
}

export const VmwareF5BigIpConfig: Schema.Schema<VmwareF5BigIpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      address: Schema.optional(Schema.String),
      partition: Schema.optional(Schema.String),
      snatPool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareF5BigIpConfig",
  }) as any as Schema.Schema<VmwareF5BigIpConfig>;

export interface VmwareManualLbConfig {
  /** NodePort for ingress service's http. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 32527). */
  ingressHttpNodePort?: number;
  /** NodePort for ingress service's https. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 30139). */
  ingressHttpsNodePort?: number;
  /** NodePort for control plane service. The Kubernetes API server in the admin cluster is implemented as a Service of type NodePort (ex. 30968). */
  controlPlaneNodePort?: number;
  /** NodePort for konnectivity server service running as a sidecar in each kube-apiserver pod (ex. 30564). */
  konnectivityServerNodePort?: number;
}

export const VmwareManualLbConfig: Schema.Schema<VmwareManualLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      ingressHttpNodePort: Schema.optional(Schema.Number),
      ingressHttpsNodePort: Schema.optional(Schema.Number),
      controlPlaneNodePort: Schema.optional(Schema.Number),
      konnectivityServerNodePort: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "VmwareManualLbConfig",
  }) as any as Schema.Schema<VmwareManualLbConfig>;

export interface VmwareSeesawConfig {
  /** Required. In general the following format should be used for the Seesaw group name: seesaw-for-[cluster_name]. */
  group?: string;
  /** Required. MasterIP is the IP announced by the master of Seesaw group. */
  masterIp?: string;
  /** Required. The IP Blocks to be used by the Seesaw load balancer */
  ipBlocks?: Array<VmwareIpBlock>;
  /** Enable two load balancer VMs to achieve a highly-available Seesaw load balancer. */
  enableHa?: boolean;
  /** Names of the VMs created for this Seesaw group. */
  vms?: Array<string>;
  /** Name to be used by Stackdriver. */
  stackdriverName?: string;
}

export const VmwareSeesawConfig: Schema.Schema<VmwareSeesawConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      group: Schema.optional(Schema.String),
      masterIp: Schema.optional(Schema.String),
      ipBlocks: Schema.optional(Schema.Array(VmwareIpBlock)),
      enableHa: Schema.optional(Schema.Boolean),
      vms: Schema.optional(Schema.Array(Schema.String)),
      stackdriverName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareSeesawConfig",
  }) as any as Schema.Schema<VmwareSeesawConfig>;

export interface VmwareAddressPool {
  /** Required. The name of the address pool. */
  pool?: string;
  /** Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5). */
  addresses?: Array<string>;
  /** If true, avoid using IPs ending in .0 or .255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses. */
  avoidBuggyIps?: boolean;
  /** If true, prevent IP addresses from being automatically assigned. */
  manualAssign?: boolean;
}

export const VmwareAddressPool: Schema.Schema<VmwareAddressPool> =
  Schema.suspend(() =>
    Schema.Struct({
      pool: Schema.optional(Schema.String),
      addresses: Schema.optional(Schema.Array(Schema.String)),
      avoidBuggyIps: Schema.optional(Schema.Boolean),
      manualAssign: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareAddressPool",
  }) as any as Schema.Schema<VmwareAddressPool>;

export interface VmwareMetalLbConfig {
  /** Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. */
  addressPools?: Array<VmwareAddressPool>;
}

export const VmwareMetalLbConfig: Schema.Schema<VmwareMetalLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      addressPools: Schema.optional(Schema.Array(VmwareAddressPool)),
    }),
  ).annotate({
    identifier: "VmwareMetalLbConfig",
  }) as any as Schema.Schema<VmwareMetalLbConfig>;

export interface VmwareLoadBalancerConfig {
  /** The VIPs used by the load balancer. */
  vipConfig?: VmwareVipConfig;
  /** Configuration for F5 Big IP typed load balancers. */
  f5Config?: VmwareF5BigIpConfig;
  /** Manually configured load balancers. */
  manualLbConfig?: VmwareManualLbConfig;
  /** Output only. Configuration for Seesaw typed load balancers. */
  seesawConfig?: VmwareSeesawConfig;
  /** Configuration for MetalLB typed load balancers. */
  metalLbConfig?: VmwareMetalLbConfig;
}

export const VmwareLoadBalancerConfig: Schema.Schema<VmwareLoadBalancerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      vipConfig: Schema.optional(VmwareVipConfig),
      f5Config: Schema.optional(VmwareF5BigIpConfig),
      manualLbConfig: Schema.optional(VmwareManualLbConfig),
      seesawConfig: Schema.optional(VmwareSeesawConfig),
      metalLbConfig: Schema.optional(VmwareMetalLbConfig),
    }),
  ).annotate({
    identifier: "VmwareLoadBalancerConfig",
  }) as any as Schema.Schema<VmwareLoadBalancerConfig>;

export interface VmwareVCenterConfig {
  /** The name of the vCenter resource pool for the user cluster. */
  resourcePool?: string;
  /** The name of the vCenter datastore for the user cluster. */
  datastore?: string;
  /** The name of the vCenter datacenter for the user cluster. */
  datacenter?: string;
  /** The name of the vCenter cluster for the user cluster. */
  cluster?: string;
  /** The name of the vCenter folder for the user cluster. */
  folder?: string;
  /** Contains the vCenter CA certificate public key for SSL verification. */
  caCertData?: string;
  /** Output only. The vCenter IP address. */
  address?: string;
  /** The name of the vCenter storage policy for the user cluster. */
  storagePolicyName?: string;
}

export const VmwareVCenterConfig: Schema.Schema<VmwareVCenterConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      resourcePool: Schema.optional(Schema.String),
      datastore: Schema.optional(Schema.String),
      datacenter: Schema.optional(Schema.String),
      cluster: Schema.optional(Schema.String),
      folder: Schema.optional(Schema.String),
      caCertData: Schema.optional(Schema.String),
      address: Schema.optional(Schema.String),
      storagePolicyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareVCenterConfig",
  }) as any as Schema.Schema<VmwareVCenterConfig>;

export interface VmwareDataplaneV2Config {
  /** Enables Dataplane V2. */
  dataplaneV2Enabled?: boolean;
  /** Enable Dataplane V2 for clusters with Windows nodes. */
  windowsDataplaneV2Enabled?: boolean;
  /** Enable advanced networking which requires dataplane_v2_enabled to be set true. */
  advancedNetworking?: boolean;
  /** Configure ForwardMode for Dataplane v2. */
  forwardMode?: string;
}

export const VmwareDataplaneV2Config: Schema.Schema<VmwareDataplaneV2Config> =
  Schema.suspend(() =>
    Schema.Struct({
      dataplaneV2Enabled: Schema.optional(Schema.Boolean),
      windowsDataplaneV2Enabled: Schema.optional(Schema.Boolean),
      advancedNetworking: Schema.optional(Schema.Boolean),
      forwardMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareDataplaneV2Config",
  }) as any as Schema.Schema<VmwareDataplaneV2Config>;

export interface VmwareAutoRepairConfig {
  /** Whether auto repair is enabled. */
  enabled?: boolean;
}

export const VmwareAutoRepairConfig: Schema.Schema<VmwareAutoRepairConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareAutoRepairConfig",
  }) as any as Schema.Schema<VmwareAutoRepairConfig>;

export interface VmwareClusterUpgradePolicy {
  /** Controls whether the upgrade applies to the control plane only. */
  controlPlaneOnly?: boolean;
}

export const VmwareClusterUpgradePolicy: Schema.Schema<VmwareClusterUpgradePolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareClusterUpgradePolicy",
  }) as any as Schema.Schema<VmwareClusterUpgradePolicy>;

export interface VmwareCluster {
  /** Immutable. The VMware user cluster resource name. */
  name?: string;
  /** Required. The admin cluster this VMware user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources. */
  adminClusterMembership?: string;
  /** A human readable description of this VMware user cluster. */
  description?: string;
  /** Required. The Anthos clusters on the VMware version for your user cluster. */
  onPremVersion?: string;
  /** Output only. The unique identifier of the VMware user cluster. */
  uid?: string;
  /** Output only. The current state of VMware user cluster. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PROVISIONING"
    | "RUNNING"
    | "RECONCILING"
    | "STOPPING"
    | "ERROR"
    | "DEGRADED"
    | (string & {});
  /** Output only. The DNS name of VMware user cluster's API server. */
  endpoint?: string;
  /** Output only. If set, there are currently changes in flight to the VMware user cluster. */
  reconciling?: boolean;
  /** Output only. The time at which VMware user cluster was created. */
  createTime?: string;
  /** Output only. The time at which VMware user cluster was last updated. */
  updateTime?: string;
  /** Output only. The object name of the VMware OnPremUserCluster custom resource on the associated admin cluster. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the ID in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. All users should use this name to access their cluster using gkectl or kubectl and should expect to see the local name when viewing admin cluster controller logs. */
  localName?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. */
  etag?: string;
  /** Annotations on the VMware user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** VMware user cluster control plane nodes must have either 1 or 3 replicas. */
  controlPlaneNode?: VmwareControlPlaneNodeConfig;
  /** AAGConfig specifies whether to spread VMware user cluster nodes across at least three physical hosts in the datacenter. */
  antiAffinityGroups?: VmwareAAGConfig;
  /** Storage configuration. */
  storage?: VmwareStorageConfig;
  /** The VMware user cluster network configuration. */
  networkConfig?: VmwareNetworkConfig;
  /** Load balancer configuration. */
  loadBalancer?: VmwareLoadBalancerConfig;
  /** VmwareVCenterConfig specifies vCenter config for the user cluster. If unspecified, it is inherited from the admin cluster. */
  vcenter?: VmwareVCenterConfig;
  /** Output only. ResourceStatus representing detailed cluster state. */
  status?: ResourceStatus;
  /** VmwareDataplaneV2Config specifies configuration for Dataplane V2. */
  dataplaneV2?: VmwareDataplaneV2Config;
  /** Enable VM tracking. */
  vmTrackingEnabled?: boolean;
  /** Configuration for auto repairing. */
  autoRepairConfig?: VmwareAutoRepairConfig;
  /** Output only. Fleet configuration for the cluster. */
  fleet?: Fleet;
  /** RBAC policy that will be applied and managed by the Anthos On-Prem API. */
  authorization?: Authorization;
  /** Output only. The time at which VMware user cluster was deleted. */
  deleteTime?: string;
  /** Output only. ValidationCheck represents the result of the preflight check job. */
  validationCheck?: ValidationCheck;
  /** Output only. The resource name of the VMware admin cluster hosting this user cluster. */
  adminClusterName?: string;
  /** Enable control plane V2. Default to false. */
  enableControlPlaneV2?: boolean;
  /** Binary Authorization related configurations. */
  binaryAuthorization?: BinaryAuthorization;
  /** Specifies upgrade policy for the cluster. */
  upgradePolicy?: VmwareClusterUpgradePolicy;
  /** Disable bundled ingress. */
  disableBundledIngress?: boolean;
  /** Enable advanced cluster. */
  enableAdvancedCluster?: boolean;
}

export const VmwareCluster: Schema.Schema<VmwareCluster> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    adminClusterMembership: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    onPremVersion: Schema.optional(Schema.String),
    uid: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    endpoint: Schema.optional(Schema.String),
    reconciling: Schema.optional(Schema.Boolean),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    localName: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    controlPlaneNode: Schema.optional(VmwareControlPlaneNodeConfig),
    antiAffinityGroups: Schema.optional(VmwareAAGConfig),
    storage: Schema.optional(VmwareStorageConfig),
    networkConfig: Schema.optional(VmwareNetworkConfig),
    loadBalancer: Schema.optional(VmwareLoadBalancerConfig),
    vcenter: Schema.optional(VmwareVCenterConfig),
    status: Schema.optional(ResourceStatus),
    dataplaneV2: Schema.optional(VmwareDataplaneV2Config),
    vmTrackingEnabled: Schema.optional(Schema.Boolean),
    autoRepairConfig: Schema.optional(VmwareAutoRepairConfig),
    fleet: Schema.optional(Fleet),
    authorization: Schema.optional(Authorization),
    deleteTime: Schema.optional(Schema.String),
    validationCheck: Schema.optional(ValidationCheck),
    adminClusterName: Schema.optional(Schema.String),
    enableControlPlaneV2: Schema.optional(Schema.Boolean),
    binaryAuthorization: Schema.optional(BinaryAuthorization),
    upgradePolicy: Schema.optional(VmwareClusterUpgradePolicy),
    disableBundledIngress: Schema.optional(Schema.Boolean),
    enableAdvancedCluster: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "VmwareCluster",
}) as any as Schema.Schema<VmwareCluster>;

export interface ListVmwareClustersResponse {
  /** The list of VMware Cluster. */
  vmwareClusters?: Array<VmwareCluster>;
  /** A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListVmwareClustersResponse: Schema.Schema<ListVmwareClustersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      vmwareClusters: Schema.optional(Schema.Array(VmwareCluster)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListVmwareClustersResponse",
  }) as any as Schema.Schema<ListVmwareClustersResponse>;

export interface BareMetalParallelUpgradeConfig {
  /** The maximum number of nodes that can be upgraded at once. */
  concurrentNodes?: number;
  /** The minimum number of nodes that should be healthy and available during an upgrade. If set to the default value of 0, it is possible that none of the nodes will be available during an upgrade. */
  minimumAvailableNodes?: number;
}

export const BareMetalParallelUpgradeConfig: Schema.Schema<BareMetalParallelUpgradeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      concurrentNodes: Schema.optional(Schema.Number),
      minimumAvailableNodes: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BareMetalParallelUpgradeConfig",
  }) as any as Schema.Schema<BareMetalParallelUpgradeConfig>;

export interface BareMetalNodePoolUpgradePolicy {
  /** The parallel upgrade settings for worker node pools. */
  parallelUpgradeConfig?: BareMetalParallelUpgradeConfig;
}

export const BareMetalNodePoolUpgradePolicy: Schema.Schema<BareMetalNodePoolUpgradePolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      parallelUpgradeConfig: Schema.optional(BareMetalParallelUpgradeConfig),
    }),
  ).annotate({
    identifier: "BareMetalNodePoolUpgradePolicy",
  }) as any as Schema.Schema<BareMetalNodePoolUpgradePolicy>;

export interface BareMetalNodePool {
  /** Immutable. The bare metal node pool resource name. */
  name?: string;
  /** The display name for the bare metal node pool. */
  displayName?: string;
  /** Output only. The unique identifier of the bare metal node pool. */
  uid?: string;
  /** Output only. The current state of the bare metal node pool. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PROVISIONING"
    | "RUNNING"
    | "RECONCILING"
    | "STOPPING"
    | "ERROR"
    | "DEGRADED"
    | (string & {});
  /** Output only. If set, there are currently changes in flight to the bare metal node pool. */
  reconciling?: boolean;
  /** Output only. The time at which this bare metal node pool was created. */
  createTime?: string;
  /** Output only. The time at which this bare metal node pool was last updated. */
  updateTime?: string;
  /** Output only. The time at which this bare metal node pool was deleted. If the resource is not deleted, this must be empty */
  deleteTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. */
  etag?: string;
  /** Annotations on the bare metal node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** Required. Node pool configuration. */
  nodePoolConfig?: BareMetalNodePoolConfig;
  /** Output only. ResourceStatus representing the detailed node pool status. */
  status?: ResourceStatus;
  /** The worker node pool upgrade policy. */
  upgradePolicy?: BareMetalNodePoolUpgradePolicy;
}

export const BareMetalNodePool: Schema.Schema<BareMetalNodePool> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      nodePoolConfig: Schema.optional(BareMetalNodePoolConfig),
      status: Schema.optional(ResourceStatus),
      upgradePolicy: Schema.optional(BareMetalNodePoolUpgradePolicy),
    }),
  ).annotate({
    identifier: "BareMetalNodePool",
  }) as any as Schema.Schema<BareMetalNodePool>;

export interface EnrollBareMetalNodePoolRequest {
  /** User provided OnePlatform identifier that is used as part of the resource name. (https://tools.ietf.org/html/rfc1123) format. */
  bareMetalNodePoolId?: string;
  /** If set, only validate the request, but do not actually enroll the node pool. */
  validateOnly?: boolean;
}

export const EnrollBareMetalNodePoolRequest: Schema.Schema<EnrollBareMetalNodePoolRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      bareMetalNodePoolId: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "EnrollBareMetalNodePoolRequest",
  }) as any as Schema.Schema<EnrollBareMetalNodePoolRequest>;

export interface ListBareMetalNodePoolsResponse {
  /** The node pools from the specified parent resource. */
  bareMetalNodePools?: Array<BareMetalNodePool>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBareMetalNodePoolsResponse: Schema.Schema<ListBareMetalNodePoolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      bareMetalNodePools: Schema.optional(Schema.Array(BareMetalNodePool)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListBareMetalNodePoolsResponse",
  }) as any as Schema.Schema<ListBareMetalNodePoolsResponse>;

export interface VmwareNodePoolAutoscalingConfig {
  /** Minimum number of replicas in the NodePool. */
  minReplicas?: number;
  /** Maximum number of replicas in the NodePool. */
  maxReplicas?: number;
}

export const VmwareNodePoolAutoscalingConfig: Schema.Schema<VmwareNodePoolAutoscalingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      minReplicas: Schema.optional(Schema.Number),
      maxReplicas: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "VmwareNodePoolAutoscalingConfig",
  }) as any as Schema.Schema<VmwareNodePoolAutoscalingConfig>;

export interface VmwareVsphereTag {
  /** The Vsphere tag category. */
  category?: string;
  /** The Vsphere tag name. */
  tag?: string;
}

export const VmwareVsphereTag: Schema.Schema<VmwareVsphereTag> = Schema.suspend(
  () =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "VmwareVsphereTag",
}) as any as Schema.Schema<VmwareVsphereTag>;

export interface VmwareVsphereConfig {
  /** The name of the vCenter datastore. Inherited from the user cluster. */
  datastore?: string;
  /** Tags to apply to VMs. */
  tags?: Array<VmwareVsphereTag>;
  /** Vsphere host groups to apply to all VMs in the node pool */
  hostGroups?: Array<string>;
}

export const VmwareVsphereConfig: Schema.Schema<VmwareVsphereConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      datastore: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(VmwareVsphereTag)),
      hostGroups: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VmwareVsphereConfig",
  }) as any as Schema.Schema<VmwareVsphereConfig>;

export interface VmwareNodeConfig {
  /** The number of CPUs for each node in the node pool. */
  cpus?: string;
  /** The megabytes of memory for each node in the node pool. */
  memoryMb?: string;
  /** The number of nodes in the node pool. */
  replicas?: string;
  /** Required. The OS image to be used for each node in a node pool. Currently `cos`, `cos_cgv2`, `ubuntu`, `ubuntu_cgv2`, `ubuntu_containerd` and `windows` are supported. */
  imageType?: string;
  /** The OS image name in vCenter, only valid when using Windows. */
  image?: string;
  /** VMware disk size to be used during creation. */
  bootDiskSizeGb?: string;
  /** The initial taints assigned to nodes of this node pool. */
  taints?: Array<NodeTaint>;
  /** The map of Kubernetes labels (key/value pairs) to be applied to each node. These will added in addition to any default label(s) that Kubernetes may apply to the node. In case of conflict in label keys, the applied set may differ depending on the Kubernetes version -- it's best to assume the behavior is undefined and conflicts should be avoided. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/ */
  labels?: Record<string, string>;
  /** Specifies the vSphere config for node pool. */
  vsphereConfig?: VmwareVsphereConfig;
  /** Allow node pool traffic to be load balanced. Only works for clusters with MetalLB load balancers. */
  enableLoadBalancer?: boolean;
}

export const VmwareNodeConfig: Schema.Schema<VmwareNodeConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      cpus: Schema.optional(Schema.String),
      memoryMb: Schema.optional(Schema.String),
      replicas: Schema.optional(Schema.String),
      imageType: Schema.optional(Schema.String),
      image: Schema.optional(Schema.String),
      bootDiskSizeGb: Schema.optional(Schema.String),
      taints: Schema.optional(Schema.Array(NodeTaint)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      vsphereConfig: Schema.optional(VmwareVsphereConfig),
      enableLoadBalancer: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "VmwareNodeConfig",
}) as any as Schema.Schema<VmwareNodeConfig>;

export interface VmwareNodePool {
  /** Immutable. The resource name of this node pool. */
  name?: string;
  /** The display name for the node pool. */
  displayName?: string;
  /** Output only. The unique identifier of the node pool. */
  uid?: string;
  /** Output only. The current state of the node pool. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PROVISIONING"
    | "RUNNING"
    | "RECONCILING"
    | "STOPPING"
    | "ERROR"
    | "DEGRADED"
    | (string & {});
  /** Output only. If set, there are currently changes in flight to the node pool. */
  reconciling?: boolean;
  /** Output only. The time at which this node pool was created. */
  createTime?: string;
  /** Output only. The time at which this node pool was last updated. */
  updateTime?: string;
  /** Output only. The time at which this node pool was deleted. If the resource is not deleted, this must be empty */
  deleteTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. */
  etag?: string;
  /** Annotations on the node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** Node pool autoscaling config for the node pool. */
  nodePoolAutoscaling?: VmwareNodePoolAutoscalingConfig;
  /** Required. The node configuration of the node pool. */
  config?: VmwareNodeConfig;
  /** Output only. ResourceStatus representing the detailed VMware node pool state. */
  status?: ResourceStatus;
  /** Anthos version for the node pool. Defaults to the user cluster version. */
  onPremVersion?: string;
}

export const VmwareNodePool: Schema.Schema<VmwareNodePool> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      nodePoolAutoscaling: Schema.optional(VmwareNodePoolAutoscalingConfig),
      config: Schema.optional(VmwareNodeConfig),
      status: Schema.optional(ResourceStatus),
      onPremVersion: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "VmwareNodePool",
}) as any as Schema.Schema<VmwareNodePool>;

export interface ListVmwareNodePoolsResponse {
  /** The node pools from the specified parent resource. */
  vmwareNodePools?: Array<VmwareNodePool>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListVmwareNodePoolsResponse: Schema.Schema<ListVmwareNodePoolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      vmwareNodePools: Schema.optional(Schema.Array(VmwareNodePool)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListVmwareNodePoolsResponse",
  }) as any as Schema.Schema<ListVmwareNodePoolsResponse>;

export interface EnrollVmwareNodePoolRequest {
  /** The target node pool id to be enrolled. */
  vmwareNodePoolId?: string;
}

export const EnrollVmwareNodePoolRequest: Schema.Schema<EnrollVmwareNodePoolRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      vmwareNodePoolId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnrollVmwareNodePoolRequest",
  }) as any as Schema.Schema<EnrollVmwareNodePoolRequest>;

export interface VmwareAdminVCenterConfig {
  /** The name of the vCenter resource pool for the admin cluster. */
  resourcePool?: string;
  /** The name of the vCenter datastore for the admin cluster. */
  datastore?: string;
  /** The name of the vCenter datacenter for the admin cluster. */
  datacenter?: string;
  /** The name of the vCenter cluster for the admin cluster. */
  cluster?: string;
  /** The name of the vCenter folder for the admin cluster. */
  folder?: string;
  /** Contains the vCenter CA certificate public key for SSL verification. */
  caCertData?: string;
  /** The vCenter IP address. */
  address?: string;
  /** The name of the virtual machine disk (VMDK) for the admin cluster. */
  dataDisk?: string;
  /** The name of the vCenter storage policy for the user cluster. */
  storagePolicyName?: string;
}

export const VmwareAdminVCenterConfig: Schema.Schema<VmwareAdminVCenterConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      resourcePool: Schema.optional(Schema.String),
      datastore: Schema.optional(Schema.String),
      datacenter: Schema.optional(Schema.String),
      cluster: Schema.optional(Schema.String),
      folder: Schema.optional(Schema.String),
      caCertData: Schema.optional(Schema.String),
      address: Schema.optional(Schema.String),
      dataDisk: Schema.optional(Schema.String),
      storagePolicyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareAdminVCenterConfig",
  }) as any as Schema.Schema<VmwareAdminVCenterConfig>;

export interface VmwareAdminHAControlPlaneConfig {
  /** Static IP addresses for the admin control plane nodes. */
  controlPlaneIpBlock?: VmwareIpBlock;
}

export const VmwareAdminHAControlPlaneConfig: Schema.Schema<VmwareAdminHAControlPlaneConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneIpBlock: Schema.optional(VmwareIpBlock),
    }),
  ).annotate({
    identifier: "VmwareAdminHAControlPlaneConfig",
  }) as any as Schema.Schema<VmwareAdminHAControlPlaneConfig>;

export interface VmwareAdminNetworkConfig {
  /** Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. */
  serviceAddressCidrBlocks?: Array<string>;
  /** Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation. */
  podAddressCidrBlocks?: Array<string>;
  /** Configuration settings for a static IP configuration. */
  staticIpConfig?: VmwareStaticIpConfig;
  /** Configuration settings for a DHCP IP configuration. */
  dhcpIpConfig?: VmwareDhcpIpConfig;
  /** vcenter_network specifies vCenter network name. */
  vcenterNetwork?: string;
  /** Represents common network settings irrespective of the host's IP address. */
  hostConfig?: VmwareHostConfig;
  /** Configuration for HA admin cluster control plane. */
  haControlPlaneConfig?: VmwareAdminHAControlPlaneConfig;
}

export const VmwareAdminNetworkConfig: Schema.Schema<VmwareAdminNetworkConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
      podAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
      staticIpConfig: Schema.optional(VmwareStaticIpConfig),
      dhcpIpConfig: Schema.optional(VmwareDhcpIpConfig),
      vcenterNetwork: Schema.optional(Schema.String),
      hostConfig: Schema.optional(VmwareHostConfig),
      haControlPlaneConfig: Schema.optional(VmwareAdminHAControlPlaneConfig),
    }),
  ).annotate({
    identifier: "VmwareAdminNetworkConfig",
  }) as any as Schema.Schema<VmwareAdminNetworkConfig>;

export interface VmwareAdminVipConfig {
  /** The VIP which you previously set aside for the Kubernetes API of the admin cluster. */
  controlPlaneVip?: string;
  /** The VIP to configure the load balancer for add-ons. */
  addonsVip?: string;
}

export const VmwareAdminVipConfig: Schema.Schema<VmwareAdminVipConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneVip: Schema.optional(Schema.String),
      addonsVip: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareAdminVipConfig",
  }) as any as Schema.Schema<VmwareAdminVipConfig>;

export interface VmwareAdminF5BigIpConfig {
  /** The load balancer's IP address. */
  address?: string;
  /** The preexisting partition to be used by the load balancer. This partition is usually created for the admin cluster for example: 'my-f5-admin-partition'. */
  partition?: string;
  /** The pool name. Only necessary, if using SNAT. */
  snatPool?: string;
}

export const VmwareAdminF5BigIpConfig: Schema.Schema<VmwareAdminF5BigIpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      address: Schema.optional(Schema.String),
      partition: Schema.optional(Schema.String),
      snatPool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareAdminF5BigIpConfig",
  }) as any as Schema.Schema<VmwareAdminF5BigIpConfig>;

export interface VmwareAdminManualLbConfig {
  /** NodePort for ingress service's http. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 32527). */
  ingressHttpNodePort?: number;
  /** NodePort for ingress service's https. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 30139). */
  ingressHttpsNodePort?: number;
  /** NodePort for control plane service. The Kubernetes API server in the admin cluster is implemented as a Service of type NodePort (ex. 30968). */
  controlPlaneNodePort?: number;
  /** NodePort for konnectivity server service running as a sidecar in each kube-apiserver pod (ex. 30564). */
  konnectivityServerNodePort?: number;
  /** NodePort for add-ons server in the admin cluster. */
  addonsNodePort?: number;
}

export const VmwareAdminManualLbConfig: Schema.Schema<VmwareAdminManualLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      ingressHttpNodePort: Schema.optional(Schema.Number),
      ingressHttpsNodePort: Schema.optional(Schema.Number),
      controlPlaneNodePort: Schema.optional(Schema.Number),
      konnectivityServerNodePort: Schema.optional(Schema.Number),
      addonsNodePort: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "VmwareAdminManualLbConfig",
  }) as any as Schema.Schema<VmwareAdminManualLbConfig>;

export interface VmwareAdminMetalLbConfig {
  /** Whether MetalLB is enabled. */
  enabled?: boolean;
}

export const VmwareAdminMetalLbConfig: Schema.Schema<VmwareAdminMetalLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareAdminMetalLbConfig",
  }) as any as Schema.Schema<VmwareAdminMetalLbConfig>;

export interface VmwareAdminSeesawConfig {
  /** In general the following format should be used for the Seesaw group name: seesaw-for-[cluster_name]. */
  group?: string;
  /** MasterIP is the IP announced by the master of Seesaw group. */
  masterIp?: string;
  /** The IP Blocks to be used by the Seesaw load balancer */
  ipBlocks?: Array<VmwareIpBlock>;
  /** Enable two load balancer VMs to achieve a highly-available Seesaw load balancer. */
  enableHa?: boolean;
  /** Names of the VMs created for this Seesaw group. */
  vms?: Array<string>;
  /** Name to be used by Stackdriver. */
  stackdriverName?: string;
}

export const VmwareAdminSeesawConfig: Schema.Schema<VmwareAdminSeesawConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      group: Schema.optional(Schema.String),
      masterIp: Schema.optional(Schema.String),
      ipBlocks: Schema.optional(Schema.Array(VmwareIpBlock)),
      enableHa: Schema.optional(Schema.Boolean),
      vms: Schema.optional(Schema.Array(Schema.String)),
      stackdriverName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareAdminSeesawConfig",
  }) as any as Schema.Schema<VmwareAdminSeesawConfig>;

export interface VmwareAdminLoadBalancerConfig {
  /** The VIPs used by the load balancer. */
  vipConfig?: VmwareAdminVipConfig;
  /** Configuration for F5 Big IP typed load balancers. */
  f5Config?: VmwareAdminF5BigIpConfig;
  /** Manually configured load balancers. */
  manualLbConfig?: VmwareAdminManualLbConfig;
  /** MetalLB load balancers. */
  metalLbConfig?: VmwareAdminMetalLbConfig;
  /** Output only. Configuration for Seesaw typed load balancers. */
  seesawConfig?: VmwareAdminSeesawConfig;
}

export const VmwareAdminLoadBalancerConfig: Schema.Schema<VmwareAdminLoadBalancerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      vipConfig: Schema.optional(VmwareAdminVipConfig),
      f5Config: Schema.optional(VmwareAdminF5BigIpConfig),
      manualLbConfig: Schema.optional(VmwareAdminManualLbConfig),
      metalLbConfig: Schema.optional(VmwareAdminMetalLbConfig),
      seesawConfig: Schema.optional(VmwareAdminSeesawConfig),
    }),
  ).annotate({
    identifier: "VmwareAdminLoadBalancerConfig",
  }) as any as Schema.Schema<VmwareAdminLoadBalancerConfig>;

export interface VmwareAdminControlPlaneNodeConfig {
  /** The number of vCPUs for the control-plane node of the admin cluster. */
  cpus?: string;
  /** The number of mebibytes of memory for the control-plane node of the admin cluster. */
  memory?: string;
  /** The number of control plane nodes for this VMware admin cluster. (default: 1 replica). */
  replicas?: string;
}

export const VmwareAdminControlPlaneNodeConfig: Schema.Schema<VmwareAdminControlPlaneNodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      cpus: Schema.optional(Schema.String),
      memory: Schema.optional(Schema.String),
      replicas: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareAdminControlPlaneNodeConfig",
  }) as any as Schema.Schema<VmwareAdminControlPlaneNodeConfig>;

export interface VmwareAdminAddonNodeConfig {
  /** VmwareAutoResizeConfig config specifies auto resize config. */
  autoResizeConfig?: VmwareAutoResizeConfig;
}

export const VmwareAdminAddonNodeConfig: Schema.Schema<VmwareAdminAddonNodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      autoResizeConfig: Schema.optional(VmwareAutoResizeConfig),
    }),
  ).annotate({
    identifier: "VmwareAdminAddonNodeConfig",
  }) as any as Schema.Schema<VmwareAdminAddonNodeConfig>;

export interface VmwareBundleConfig {
  /** The version of the bundle. */
  version?: string;
  /** Output only. Resource status for the bundle. */
  status?: ResourceStatus;
}

export const VmwareBundleConfig: Schema.Schema<VmwareBundleConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      status: Schema.optional(ResourceStatus),
    }),
  ).annotate({
    identifier: "VmwareBundleConfig",
  }) as any as Schema.Schema<VmwareBundleConfig>;

export interface VmwarePlatformConfig {
  /** Input only. The required platform version e.g. 1.13.1. If the current platform version is lower than the target version, the platform version will be updated to the target version. If the target version is not installed in the platform (bundle versions), download the target version bundle. */
  requiredPlatformVersion?: string;
  /** Output only. The platform version e.g. 1.13.2. */
  platformVersion?: string;
  /** Output only. The list of bundles installed in the admin cluster. */
  bundles?: Array<VmwareBundleConfig>;
  /** Output only. Resource status for the platform. */
  status?: ResourceStatus;
}

export const VmwarePlatformConfig: Schema.Schema<VmwarePlatformConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      requiredPlatformVersion: Schema.optional(Schema.String),
      platformVersion: Schema.optional(Schema.String),
      bundles: Schema.optional(Schema.Array(VmwareBundleConfig)),
      status: Schema.optional(ResourceStatus),
    }),
  ).annotate({
    identifier: "VmwarePlatformConfig",
  }) as any as Schema.Schema<VmwarePlatformConfig>;

export interface VmwareAdminPreparedSecretsConfig {
  /** Whether prepared secrets is enabled. */
  enabled?: boolean;
}

export const VmwareAdminPreparedSecretsConfig: Schema.Schema<VmwareAdminPreparedSecretsConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VmwareAdminPreparedSecretsConfig",
  }) as any as Schema.Schema<VmwareAdminPreparedSecretsConfig>;

export interface VmwareAdminAuthorizationConfig {
  /** For VMware admin clusters, users will be granted the cluster-viewer role on the cluster. */
  viewerUsers?: Array<ClusterUser>;
}

export const VmwareAdminAuthorizationConfig: Schema.Schema<VmwareAdminAuthorizationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      viewerUsers: Schema.optional(Schema.Array(ClusterUser)),
    }),
  ).annotate({
    identifier: "VmwareAdminAuthorizationConfig",
  }) as any as Schema.Schema<VmwareAdminAuthorizationConfig>;

export interface VmwareAdminPrivateRegistryConfig {
  /** The registry address. */
  address?: string;
  /** When the container runtime pulls an image from private registry, the registry must prove its identity by presenting a certificate. The registry's certificate is signed by a certificate authority (CA). The container runtime uses the CA's certificate to validate the registry's certificate. */
  caCert?: string;
}

export const VmwareAdminPrivateRegistryConfig: Schema.Schema<VmwareAdminPrivateRegistryConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      address: Schema.optional(Schema.String),
      caCert: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareAdminPrivateRegistryConfig",
  }) as any as Schema.Schema<VmwareAdminPrivateRegistryConfig>;

export interface VmwareAdminProxy {
  /** The HTTP address of proxy server. */
  url?: string;
  /** A comma-separated list of IP addresses, IP address ranges, host names, and domain names that should not go through the proxy server. When Google Distributed Cloud sends a request to one of these addresses, hosts, or domains, the request is sent directly. */
  noProxy?: string;
}

export const VmwareAdminProxy: Schema.Schema<VmwareAdminProxy> = Schema.suspend(
  () =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      noProxy: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "VmwareAdminProxy",
}) as any as Schema.Schema<VmwareAdminProxy>;

export interface VmwareAdminCluster {
  /** Immutable. The VMware admin cluster resource name. */
  name?: string;
  /** A human readable description of this VMware admin cluster. */
  description?: string;
  /** Output only. The unique identifier of the VMware admin cluster. */
  uid?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. */
  etag?: string;
  /** Output only. The time at which VMware admin cluster was created. */
  createTime?: string;
  /** Output only. The time at which VMware admin cluster was last updated. */
  updateTime?: string;
  /** Annotations on the VMware admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** Output only. The current state of VMware admin cluster. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PROVISIONING"
    | "RUNNING"
    | "RECONCILING"
    | "STOPPING"
    | "ERROR"
    | "DEGRADED"
    | (string & {});
  /** Output only. The DNS name of VMware admin cluster's API server. */
  endpoint?: string;
  /** Output only. If set, there are currently changes in flight to the VMware admin cluster. */
  reconciling?: boolean;
  /** Output only. The object name of the VMware OnPremAdminCluster custom resource. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the ID in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. All users should use this name to access their cluster using gkectl or kubectl and should expect to see the local name when viewing admin cluster controller logs. */
  localName?: string;
  /** The bootstrap cluster this VMware admin cluster belongs to. */
  bootstrapClusterMembership?: string;
  /** The Anthos clusters on the VMware version for the admin cluster. */
  onPremVersion?: string;
  /** Output only. Fleet configuration for the cluster. */
  fleet?: Fleet;
  /** The OS image type for the VMware admin cluster. */
  imageType?: string;
  /** The VMware admin cluster VCenter configuration. */
  vcenter?: VmwareAdminVCenterConfig;
  /** The VMware admin cluster network configuration. */
  networkConfig?: VmwareAdminNetworkConfig;
  /** The VMware admin cluster load balancer configuration. */
  loadBalancer?: VmwareAdminLoadBalancerConfig;
  /** The VMware admin cluster control plane node configuration. */
  controlPlaneNode?: VmwareAdminControlPlaneNodeConfig;
  /** The VMware admin cluster addon node configuration. */
  addonNode?: VmwareAdminAddonNodeConfig;
  /** The VMware admin cluster anti affinity group configuration. */
  antiAffinityGroups?: VmwareAAGConfig;
  /** The VMware admin cluster auto repair configuration. */
  autoRepairConfig?: VmwareAutoRepairConfig;
  /** Output only. ResourceStatus representing detailed cluster state. */
  status?: ResourceStatus;
  /** The VMware platform configuration. */
  platformConfig?: VmwarePlatformConfig;
  /** Output only. The VMware admin cluster prepared secrets configuration. It should always be enabled by the Central API, instead of letting users set it. */
  preparedSecrets?: VmwareAdminPreparedSecretsConfig;
  /** The VMware admin cluster authorization configuration. */
  authorization?: VmwareAdminAuthorizationConfig;
  /** Output only. ValidationCheck represents the result of the preflight check job. */
  validationCheck?: ValidationCheck;
  /** Enable advanced cluster. */
  enableAdvancedCluster?: boolean;
  /** Configuration for registry. */
  privateRegistryConfig?: VmwareAdminPrivateRegistryConfig;
  /** Configuration for proxy. */
  proxy?: VmwareAdminProxy;
}

export const VmwareAdminCluster: Schema.Schema<VmwareAdminCluster> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(Schema.String),
      endpoint: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      localName: Schema.optional(Schema.String),
      bootstrapClusterMembership: Schema.optional(Schema.String),
      onPremVersion: Schema.optional(Schema.String),
      fleet: Schema.optional(Fleet),
      imageType: Schema.optional(Schema.String),
      vcenter: Schema.optional(VmwareAdminVCenterConfig),
      networkConfig: Schema.optional(VmwareAdminNetworkConfig),
      loadBalancer: Schema.optional(VmwareAdminLoadBalancerConfig),
      controlPlaneNode: Schema.optional(VmwareAdminControlPlaneNodeConfig),
      addonNode: Schema.optional(VmwareAdminAddonNodeConfig),
      antiAffinityGroups: Schema.optional(VmwareAAGConfig),
      autoRepairConfig: Schema.optional(VmwareAutoRepairConfig),
      status: Schema.optional(ResourceStatus),
      platformConfig: Schema.optional(VmwarePlatformConfig),
      preparedSecrets: Schema.optional(VmwareAdminPreparedSecretsConfig),
      authorization: Schema.optional(VmwareAdminAuthorizationConfig),
      validationCheck: Schema.optional(ValidationCheck),
      enableAdvancedCluster: Schema.optional(Schema.Boolean),
      privateRegistryConfig: Schema.optional(VmwareAdminPrivateRegistryConfig),
      proxy: Schema.optional(VmwareAdminProxy),
    }),
  ).annotate({
    identifier: "VmwareAdminCluster",
  }) as any as Schema.Schema<VmwareAdminCluster>;

export interface ListVmwareAdminClustersResponse {
  /** The list of VMware admin cluster. */
  vmwareAdminClusters?: Array<VmwareAdminCluster>;
  /** A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListVmwareAdminClustersResponse: Schema.Schema<ListVmwareAdminClustersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      vmwareAdminClusters: Schema.optional(Schema.Array(VmwareAdminCluster)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListVmwareAdminClustersResponse",
  }) as any as Schema.Schema<ListVmwareAdminClustersResponse>;

export interface EnrollVmwareAdminClusterRequest {
  /** User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all GKE on-prem clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. */
  vmwareAdminClusterId?: string;
  /** Required. This is the full resource name of this admin cluster's fleet membership. */
  membership?: string;
}

export const EnrollVmwareAdminClusterRequest: Schema.Schema<EnrollVmwareAdminClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      vmwareAdminClusterId: Schema.optional(Schema.String),
      membership: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnrollVmwareAdminClusterRequest",
  }) as any as Schema.Schema<EnrollVmwareAdminClusterRequest>;

export interface VmwareVersionInfo {
  /** Version number e.g. 1.13.1-gke.1000. */
  version?: string;
  /** If set, the cluster dependencies (e.g. the admin cluster, other user clusters managed by the same admin cluster) must be upgraded before this version can be installed or upgraded to. */
  hasDependencies?: boolean;
  /** If set, the version is installed in the admin cluster. Otherwise, the version bundle must be downloaded and installed before a user cluster can be created at or upgraded to this version. */
  isInstalled?: boolean;
  /** The list of upgrade dependencies for this version. */
  dependencies?: Array<UpgradeDependency>;
}

export const VmwareVersionInfo: Schema.Schema<VmwareVersionInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      hasDependencies: Schema.optional(Schema.Boolean),
      isInstalled: Schema.optional(Schema.Boolean),
      dependencies: Schema.optional(Schema.Array(UpgradeDependency)),
    }),
  ).annotate({
    identifier: "VmwareVersionInfo",
  }) as any as Schema.Schema<VmwareVersionInfo>;

export interface QueryVmwareVersionConfigResponse {
  /** List of available versions to install or to upgrade to. */
  versions?: Array<VmwareVersionInfo>;
}

export const QueryVmwareVersionConfigResponse: Schema.Schema<QueryVmwareVersionConfigResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(VmwareVersionInfo)),
    }),
  ).annotate({
    identifier: "QueryVmwareVersionConfigResponse",
  }) as any as Schema.Schema<QueryVmwareVersionConfigResponse>;

export interface BareMetalAdminIslandModeCidrConfig {
  /** Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation. */
  serviceAddressCidrBlocks?: Array<string>;
  /** Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation. */
  podAddressCidrBlocks?: Array<string>;
}

export const BareMetalAdminIslandModeCidrConfig: Schema.Schema<BareMetalAdminIslandModeCidrConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
      podAddressCidrBlocks: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalAdminIslandModeCidrConfig",
  }) as any as Schema.Schema<BareMetalAdminIslandModeCidrConfig>;

export interface BareMetalAdminMultipleNetworkInterfacesConfig {
  /** Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true. */
  enabled?: boolean;
}

export const BareMetalAdminMultipleNetworkInterfacesConfig: Schema.Schema<BareMetalAdminMultipleNetworkInterfacesConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalAdminMultipleNetworkInterfacesConfig",
  }) as any as Schema.Schema<BareMetalAdminMultipleNetworkInterfacesConfig>;

export interface BareMetalAdminNetworkConfig {
  /** Configuration for Island mode CIDR. */
  islandModeCidr?: BareMetalAdminIslandModeCidrConfig;
  /** Enables the use of advanced Anthos networking features, such as Bundled Load Balancing with BGP or the egress NAT gateway. Setting configuration for advanced networking features will automatically set this flag. */
  advancedNetworking?: boolean;
  /** Configuration for multiple network interfaces. */
  multipleNetworkInterfacesConfig?: BareMetalAdminMultipleNetworkInterfacesConfig;
}

export const BareMetalAdminNetworkConfig: Schema.Schema<BareMetalAdminNetworkConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      islandModeCidr: Schema.optional(BareMetalAdminIslandModeCidrConfig),
      advancedNetworking: Schema.optional(Schema.Boolean),
      multipleNetworkInterfacesConfig: Schema.optional(
        BareMetalAdminMultipleNetworkInterfacesConfig,
      ),
    }),
  ).annotate({
    identifier: "BareMetalAdminNetworkConfig",
  }) as any as Schema.Schema<BareMetalAdminNetworkConfig>;

export interface BareMetalAdminControlPlaneNodePoolConfig {
  /** Required. The generic configuration for a node pool running the control plane. */
  nodePoolConfig?: BareMetalNodePoolConfig;
}

export const BareMetalAdminControlPlaneNodePoolConfig: Schema.Schema<BareMetalAdminControlPlaneNodePoolConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      nodePoolConfig: Schema.optional(BareMetalNodePoolConfig),
    }),
  ).annotate({
    identifier: "BareMetalAdminControlPlaneNodePoolConfig",
  }) as any as Schema.Schema<BareMetalAdminControlPlaneNodePoolConfig>;

export interface BareMetalAdminApiServerArgument {
  /** Required. The argument name as it appears on the API Server command line please make sure to remove the leading dashes. */
  argument?: string;
  /** Required. The value of the arg as it will be passed to the API Server command line. */
  value?: string;
}

export const BareMetalAdminApiServerArgument: Schema.Schema<BareMetalAdminApiServerArgument> =
  Schema.suspend(() =>
    Schema.Struct({
      argument: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalAdminApiServerArgument",
  }) as any as Schema.Schema<BareMetalAdminApiServerArgument>;

export interface BareMetalAdminControlPlaneConfig {
  /** Required. Configures the node pool running the control plane. If specified the corresponding NodePool will be created for the cluster's control plane. The NodePool will have the same name and namespace as the cluster. */
  controlPlaneNodePoolConfig?: BareMetalAdminControlPlaneNodePoolConfig;
  /** Customizes the default API server args. Only a subset of customized flags are supported. Please refer to the API server documentation below to know the exact format: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/ */
  apiServerArgs?: Array<BareMetalAdminApiServerArgument>;
}

export const BareMetalAdminControlPlaneConfig: Schema.Schema<BareMetalAdminControlPlaneConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneNodePoolConfig: Schema.optional(
        BareMetalAdminControlPlaneNodePoolConfig,
      ),
      apiServerArgs: Schema.optional(
        Schema.Array(BareMetalAdminApiServerArgument),
      ),
    }),
  ).annotate({
    identifier: "BareMetalAdminControlPlaneConfig",
  }) as any as Schema.Schema<BareMetalAdminControlPlaneConfig>;

export interface BareMetalAdminVipConfig {
  /** The VIP which you previously set aside for the Kubernetes API of this bare metal admin cluster. */
  controlPlaneVip?: string;
}

export const BareMetalAdminVipConfig: Schema.Schema<BareMetalAdminVipConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneVip: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalAdminVipConfig",
  }) as any as Schema.Schema<BareMetalAdminVipConfig>;

export interface BareMetalAdminPortConfig {
  /** The port that control plane hosted load balancers will listen on. */
  controlPlaneLoadBalancerPort?: number;
}

export const BareMetalAdminPortConfig: Schema.Schema<BareMetalAdminPortConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      controlPlaneLoadBalancerPort: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BareMetalAdminPortConfig",
  }) as any as Schema.Schema<BareMetalAdminPortConfig>;

export interface BareMetalAdminManualLbConfig {
  /** Whether manual load balancing is enabled. */
  enabled?: boolean;
}

export const BareMetalAdminManualLbConfig: Schema.Schema<BareMetalAdminManualLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalAdminManualLbConfig",
  }) as any as Schema.Schema<BareMetalAdminManualLbConfig>;

export interface BareMetalAdminBgpPeerConfig {
  /** Required. BGP autonomous system number (ASN) for the network that contains the external peer device. */
  asn?: string;
  /** Required. The IP address of the external peer device. */
  ipAddress?: string;
  /** The IP address of the control plane node that connects to the external peer. If you don't specify any control plane nodes, all control plane nodes can connect to the external peer. If you specify one or more IP addresses, only the nodes specified participate in peering sessions. */
  controlPlaneNodes?: Array<string>;
}

export const BareMetalAdminBgpPeerConfig: Schema.Schema<BareMetalAdminBgpPeerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      asn: Schema.optional(Schema.String),
      ipAddress: Schema.optional(Schema.String),
      controlPlaneNodes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalAdminBgpPeerConfig",
  }) as any as Schema.Schema<BareMetalAdminBgpPeerConfig>;

export interface BareMetalAdminLoadBalancerAddressPool {
  /** Required. The name of the address pool. */
  pool?: string;
  /** Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5). */
  addresses?: Array<string>;
  /** If true, avoid using IPs ending in .0 or .255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses. */
  avoidBuggyIps?: boolean;
  /** If true, prevent IP addresses from being automatically assigned. */
  manualAssign?: boolean;
}

export const BareMetalAdminLoadBalancerAddressPool: Schema.Schema<BareMetalAdminLoadBalancerAddressPool> =
  Schema.suspend(() =>
    Schema.Struct({
      pool: Schema.optional(Schema.String),
      addresses: Schema.optional(Schema.Array(Schema.String)),
      avoidBuggyIps: Schema.optional(Schema.Boolean),
      manualAssign: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalAdminLoadBalancerAddressPool",
  }) as any as Schema.Schema<BareMetalAdminLoadBalancerAddressPool>;

export interface BareMetalAdminLoadBalancerNodePoolConfig {
  /** The generic configuration for a node pool running a load balancer. */
  nodePoolConfig?: BareMetalNodePoolConfig;
}

export const BareMetalAdminLoadBalancerNodePoolConfig: Schema.Schema<BareMetalAdminLoadBalancerNodePoolConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      nodePoolConfig: Schema.optional(BareMetalNodePoolConfig),
    }),
  ).annotate({
    identifier: "BareMetalAdminLoadBalancerNodePoolConfig",
  }) as any as Schema.Schema<BareMetalAdminLoadBalancerNodePoolConfig>;

export interface BareMetalAdminBgpLbConfig {
  /** Required. BGP autonomous system number (ASN) of the cluster. This field can be updated after cluster creation. */
  asn?: string;
  /** Required. The list of BGP peers that the cluster will connect to. At least one peer must be configured for each control plane node. Control plane nodes will connect to these peers to advertise the control plane VIP. The Services load balancer also uses these peers by default. This field can be updated after cluster creation. */
  bgpPeerConfigs?: Array<BareMetalAdminBgpPeerConfig>;
  /** Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools. */
  addressPools?: Array<BareMetalAdminLoadBalancerAddressPool>;
  /** Specifies the node pool running data plane load balancing. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used for data plane load balancing. */
  loadBalancerNodePoolConfig?: BareMetalAdminLoadBalancerNodePoolConfig;
}

export const BareMetalAdminBgpLbConfig: Schema.Schema<BareMetalAdminBgpLbConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      asn: Schema.optional(Schema.String),
      bgpPeerConfigs: Schema.optional(
        Schema.Array(BareMetalAdminBgpPeerConfig),
      ),
      addressPools: Schema.optional(
        Schema.Array(BareMetalAdminLoadBalancerAddressPool),
      ),
      loadBalancerNodePoolConfig: Schema.optional(
        BareMetalAdminLoadBalancerNodePoolConfig,
      ),
    }),
  ).annotate({
    identifier: "BareMetalAdminBgpLbConfig",
  }) as any as Schema.Schema<BareMetalAdminBgpLbConfig>;

export interface BareMetalAdminLoadBalancerConfig {
  /** The VIPs used by the load balancer. */
  vipConfig?: BareMetalAdminVipConfig;
  /** Configures the ports that the load balancer will listen on. */
  portConfig?: BareMetalAdminPortConfig;
  /** Manually configured load balancers. */
  manualLbConfig?: BareMetalAdminManualLbConfig;
  /** Configuration for BGP typed load balancers. */
  bgpLbConfig?: BareMetalAdminBgpLbConfig;
}

export const BareMetalAdminLoadBalancerConfig: Schema.Schema<BareMetalAdminLoadBalancerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      vipConfig: Schema.optional(BareMetalAdminVipConfig),
      portConfig: Schema.optional(BareMetalAdminPortConfig),
      manualLbConfig: Schema.optional(BareMetalAdminManualLbConfig),
      bgpLbConfig: Schema.optional(BareMetalAdminBgpLbConfig),
    }),
  ).annotate({
    identifier: "BareMetalAdminLoadBalancerConfig",
  }) as any as Schema.Schema<BareMetalAdminLoadBalancerConfig>;

export interface BareMetalAdminStorageConfig {
  /** Required. Specifies the config for local PersistentVolumes backed by subdirectories in a shared filesystem. These subdirectores are automatically created during cluster creation. */
  lvpShareConfig?: BareMetalLvpShareConfig;
  /** Required. Specifies the config for local PersistentVolumes backed by mounted node disks. These disks need to be formatted and mounted by the user, which can be done before or after cluster creation. */
  lvpNodeMountsConfig?: BareMetalLvpConfig;
}

export const BareMetalAdminStorageConfig: Schema.Schema<BareMetalAdminStorageConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      lvpShareConfig: Schema.optional(BareMetalLvpShareConfig),
      lvpNodeMountsConfig: Schema.optional(BareMetalLvpConfig),
    }),
  ).annotate({
    identifier: "BareMetalAdminStorageConfig",
  }) as any as Schema.Schema<BareMetalAdminStorageConfig>;

export interface BareMetalAdminClusterOperationsConfig {
  /** Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics). */
  enableApplicationLogs?: boolean;
}

export const BareMetalAdminClusterOperationsConfig: Schema.Schema<BareMetalAdminClusterOperationsConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enableApplicationLogs: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalAdminClusterOperationsConfig",
  }) as any as Schema.Schema<BareMetalAdminClusterOperationsConfig>;

export interface BareMetalAdminMaintenanceConfig {
  /** Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource. */
  maintenanceAddressCidrBlocks?: Array<string>;
}

export const BareMetalAdminMaintenanceConfig: Schema.Schema<BareMetalAdminMaintenanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      maintenanceAddressCidrBlocks: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "BareMetalAdminMaintenanceConfig",
  }) as any as Schema.Schema<BareMetalAdminMaintenanceConfig>;

export interface BareMetalAdminDrainingMachine {
  /** Draining machine IP address. */
  nodeIp?: string;
  /** The count of pods yet to drain. */
  podCount?: number;
}

export const BareMetalAdminDrainingMachine: Schema.Schema<BareMetalAdminDrainingMachine> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeIp: Schema.optional(Schema.String),
      podCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BareMetalAdminDrainingMachine",
  }) as any as Schema.Schema<BareMetalAdminDrainingMachine>;

export interface BareMetalAdminDrainedMachine {
  /** Drained machine IP address. */
  nodeIp?: string;
}

export const BareMetalAdminDrainedMachine: Schema.Schema<BareMetalAdminDrainedMachine> =
  Schema.suspend(() =>
    Schema.Struct({
      nodeIp: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalAdminDrainedMachine",
  }) as any as Schema.Schema<BareMetalAdminDrainedMachine>;

export interface BareMetalAdminMachineDrainStatus {
  /** The list of draning machines. */
  drainingMachines?: Array<BareMetalAdminDrainingMachine>;
  /** The list of drained machines. */
  drainedMachines?: Array<BareMetalAdminDrainedMachine>;
}

export const BareMetalAdminMachineDrainStatus: Schema.Schema<BareMetalAdminMachineDrainStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      drainingMachines: Schema.optional(
        Schema.Array(BareMetalAdminDrainingMachine),
      ),
      drainedMachines: Schema.optional(
        Schema.Array(BareMetalAdminDrainedMachine),
      ),
    }),
  ).annotate({
    identifier: "BareMetalAdminMachineDrainStatus",
  }) as any as Schema.Schema<BareMetalAdminMachineDrainStatus>;

export interface BareMetalAdminMaintenanceStatus {
  /** Represents the status of draining and drained machine nodes. This is used to show the progress of cluster upgrade. */
  machineDrainStatus?: BareMetalAdminMachineDrainStatus;
}

export const BareMetalAdminMaintenanceStatus: Schema.Schema<BareMetalAdminMaintenanceStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      machineDrainStatus: Schema.optional(BareMetalAdminMachineDrainStatus),
    }),
  ).annotate({
    identifier: "BareMetalAdminMaintenanceStatus",
  }) as any as Schema.Schema<BareMetalAdminMaintenanceStatus>;

export interface BareMetalAdminWorkloadNodeConfig {
  /** The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter. By default 110 Pods are created per Node. Upper bound is 250 for both HA and non-HA admin cluster. Lower bound is 64 for non-HA admin cluster and 32 for HA admin cluster. */
  maxPodsPerNode?: string;
}

export const BareMetalAdminWorkloadNodeConfig: Schema.Schema<BareMetalAdminWorkloadNodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      maxPodsPerNode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalAdminWorkloadNodeConfig",
  }) as any as Schema.Schema<BareMetalAdminWorkloadNodeConfig>;

export interface BareMetalAdminProxyConfig {
  /** Required. Specifies the address of your proxy server. Examples: `http://domain` WARNING: Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server. */
  uri?: string;
  /** A list of IPs, hostnames, and domains that should skip the proxy. Examples: ["127.0.0.1", "example.com", ".corp", "localhost"]. */
  noProxy?: Array<string>;
}

export const BareMetalAdminProxyConfig: Schema.Schema<BareMetalAdminProxyConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      noProxy: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BareMetalAdminProxyConfig",
  }) as any as Schema.Schema<BareMetalAdminProxyConfig>;

export interface BareMetalAdminSecurityConfig {
  /** Configures user access to the admin cluster. */
  authorization?: Authorization;
}

export const BareMetalAdminSecurityConfig: Schema.Schema<BareMetalAdminSecurityConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      authorization: Schema.optional(Authorization),
    }),
  ).annotate({
    identifier: "BareMetalAdminSecurityConfig",
  }) as any as Schema.Schema<BareMetalAdminSecurityConfig>;

export interface BareMetalAdminNodeAccessConfig {
  /** Required. LoginUser is the user name used to access node machines. It defaults to "root" if not set. */
  loginUser?: string;
}

export const BareMetalAdminNodeAccessConfig: Schema.Schema<BareMetalAdminNodeAccessConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      loginUser: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BareMetalAdminNodeAccessConfig",
  }) as any as Schema.Schema<BareMetalAdminNodeAccessConfig>;

export interface BareMetalAdminOsEnvironmentConfig {
  /** Whether the package repo should be added when initializing bare metal machines. */
  packageRepoExcluded?: boolean;
}

export const BareMetalAdminOsEnvironmentConfig: Schema.Schema<BareMetalAdminOsEnvironmentConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      packageRepoExcluded: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BareMetalAdminOsEnvironmentConfig",
  }) as any as Schema.Schema<BareMetalAdminOsEnvironmentConfig>;

export interface BareMetalAdminCluster {
  /** Immutable. The bare metal admin cluster resource name. */
  name?: string;
  /** A human readable description of this bare metal admin cluster. */
  description?: string;
  /** Output only. The unique identifier of the bare metal admin cluster. */
  uid?: string;
  /** The Anthos clusters on bare metal version for the bare metal admin cluster. */
  bareMetalVersion?: string;
  /** Output only. The current state of the bare metal admin cluster. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PROVISIONING"
    | "RUNNING"
    | "RECONCILING"
    | "STOPPING"
    | "ERROR"
    | "DEGRADED"
    | (string & {});
  /** Output only. The IP address name of bare metal admin cluster's API server. */
  endpoint?: string;
  /** Output only. If set, there are currently changes in flight to the bare metal Admin Cluster. */
  reconciling?: boolean;
  /** Output only. The time at which this bare metal admin cluster was created. */
  createTime?: string;
  /** Output only. The time at which this bare metal admin cluster was last updated. */
  updateTime?: string;
  /** Output only. The time at which this bare metal admin cluster was deleted. If the resource is not deleted, this must be empty */
  deleteTime?: string;
  /** Output only. The object name of the bare metal cluster custom resource. This field is used to support conflicting names when enrolling existing clusters to the API. When used as a part of cluster enrollment, this field will differ from the ID in the resource name. For new clusters, this field will match the user provided cluster name and be visible in the last component of the resource name. It is not modifiable. All users should use this name to access their cluster using gkectl or kubectl and should expect to see the local name when viewing admin cluster controller logs. */
  localName?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Allows clients to perform consistent read-modify-writes through optimistic concurrency control. */
  etag?: string;
  /** Annotations on the bare metal admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** Network configuration. */
  networkConfig?: BareMetalAdminNetworkConfig;
  /** Control plane configuration. */
  controlPlane?: BareMetalAdminControlPlaneConfig;
  /** Load balancer configuration. */
  loadBalancer?: BareMetalAdminLoadBalancerConfig;
  /** Storage configuration. */
  storage?: BareMetalAdminStorageConfig;
  /** Output only. Fleet configuration for the cluster. */
  fleet?: Fleet;
  /** Cluster operations configuration. */
  clusterOperations?: BareMetalAdminClusterOperationsConfig;
  /** Output only. ResourceStatus representing detailed cluster status. */
  status?: ResourceStatus;
  /** Maintenance configuration. */
  maintenanceConfig?: BareMetalAdminMaintenanceConfig;
  /** Output only. MaintenanceStatus representing state of maintenance. */
  maintenanceStatus?: BareMetalAdminMaintenanceStatus;
  /** Output only. ValidationCheck representing the result of the preflight check. */
  validationCheck?: ValidationCheck;
  /** Workload node configuration. */
  nodeConfig?: BareMetalAdminWorkloadNodeConfig;
  /** Proxy configuration. */
  proxy?: BareMetalAdminProxyConfig;
  /** Security related configuration. */
  securityConfig?: BareMetalAdminSecurityConfig;
  /** Node access related configurations. */
  nodeAccessConfig?: BareMetalAdminNodeAccessConfig;
  /** OS environment related configurations. */
  osEnvironmentConfig?: BareMetalAdminOsEnvironmentConfig;
  /** Binary Authorization related configurations. */
  binaryAuthorization?: BinaryAuthorization;
}

export const BareMetalAdminCluster: Schema.Schema<BareMetalAdminCluster> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      bareMetalVersion: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      endpoint: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      localName: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      networkConfig: Schema.optional(BareMetalAdminNetworkConfig),
      controlPlane: Schema.optional(BareMetalAdminControlPlaneConfig),
      loadBalancer: Schema.optional(BareMetalAdminLoadBalancerConfig),
      storage: Schema.optional(BareMetalAdminStorageConfig),
      fleet: Schema.optional(Fleet),
      clusterOperations: Schema.optional(BareMetalAdminClusterOperationsConfig),
      status: Schema.optional(ResourceStatus),
      maintenanceConfig: Schema.optional(BareMetalAdminMaintenanceConfig),
      maintenanceStatus: Schema.optional(BareMetalAdminMaintenanceStatus),
      validationCheck: Schema.optional(ValidationCheck),
      nodeConfig: Schema.optional(BareMetalAdminWorkloadNodeConfig),
      proxy: Schema.optional(BareMetalAdminProxyConfig),
      securityConfig: Schema.optional(BareMetalAdminSecurityConfig),
      nodeAccessConfig: Schema.optional(BareMetalAdminNodeAccessConfig),
      osEnvironmentConfig: Schema.optional(BareMetalAdminOsEnvironmentConfig),
      binaryAuthorization: Schema.optional(BinaryAuthorization),
    }),
  ).annotate({
    identifier: "BareMetalAdminCluster",
  }) as any as Schema.Schema<BareMetalAdminCluster>;

export interface ListBareMetalAdminClustersResponse {
  /** The list of bare metal admin cluster. */
  bareMetalAdminClusters?: Array<BareMetalAdminCluster>;
  /** A token identifying a page of results the server should return. If the token is not empty this means that more results are available and should be retrieved by repeating the request with the provided page token. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListBareMetalAdminClustersResponse: Schema.Schema<ListBareMetalAdminClustersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      bareMetalAdminClusters: Schema.optional(
        Schema.Array(BareMetalAdminCluster),
      ),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListBareMetalAdminClustersResponse",
  }) as any as Schema.Schema<ListBareMetalAdminClustersResponse>;

export interface EnrollBareMetalAdminClusterRequest {
  /** User provided OnePlatform identifier that is used as part of the resource name. This must be unique among all GKE on-prem clusters within a project and location and will return a 409 if the cluster already exists. (https://tools.ietf.org/html/rfc1123) format. */
  bareMetalAdminClusterId?: string;
  /** Required. This is the full resource name of this admin cluster's fleet membership. */
  membership?: string;
}

export const EnrollBareMetalAdminClusterRequest: Schema.Schema<EnrollBareMetalAdminClusterRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      bareMetalAdminClusterId: Schema.optional(Schema.String),
      membership: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnrollBareMetalAdminClusterRequest",
  }) as any as Schema.Schema<EnrollBareMetalAdminClusterRequest>;

export interface QueryBareMetalAdminVersionConfigResponse {
  /** List of available versions to install or to upgrade to. */
  versions?: Array<BareMetalVersionInfo>;
}

export const QueryBareMetalAdminVersionConfigResponse: Schema.Schema<QueryBareMetalAdminVersionConfigResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(BareMetalVersionInfo)),
    }),
  ).annotate({
    identifier: "QueryBareMetalAdminVersionConfigResponse",
  }) as any as Schema.Schema<QueryBareMetalAdminVersionConfigResponse>;

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

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    locationId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    expression: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    members: Schema.optional(Schema.Array(Schema.String)),
    condition: Schema.optional(Expr),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.Number),
    bindings: Schema.optional(Schema.Array(Binding)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Metric {
  /** Required. The metric name. */
  metric?:
    | "METRIC_ID_UNSPECIFIED"
    | "NODES_TOTAL"
    | "NODES_DRAINING"
    | "NODES_UPGRADING"
    | "NODES_PENDING_UPGRADE"
    | "NODES_UPGRADED"
    | "NODES_FAILED"
    | "NODES_HEALTHY"
    | "NODES_RECONCILING"
    | "NODES_IN_MAINTENANCE"
    | "PREFLIGHTS_COMPLETED"
    | "PREFLIGHTS_RUNNING"
    | "PREFLIGHTS_FAILED"
    | "PREFLIGHTS_TOTAL"
    | (string & {});
  /** For metrics with integer value. */
  intValue?: string;
  /** For metrics with floating point value. */
  doubleValue?: number;
  /** For metrics with custom values (ratios, visual progress, etc.). */
  stringValue?: string;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() =>
  Schema.Struct({
    metric: Schema.optional(Schema.String),
    intValue: Schema.optional(Schema.String),
    doubleValue: Schema.optional(Schema.Number),
    stringValue: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface OperationStage {
  /** The high-level stage of the operation. */
  stage?:
    | "STAGE_UNSPECIFIED"
    | "PREFLIGHT_CHECK"
    | "CONFIGURE"
    | "DEPLOY"
    | "HEALTH_CHECK"
    | "UPDATE"
    | (string & {});
  /** Progress metric bundle. */
  metrics?: Array<Metric>;
  /** Time the stage started. */
  startTime?: string;
  /** Time the stage ended. */
  endTime?: string;
  /** Output only. State of the stage. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
}

export const OperationStage: Schema.Schema<OperationStage> = Schema.suspend(
  () =>
    Schema.Struct({
      stage: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.Array(Metric)),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "OperationStage",
}) as any as Schema.Schema<OperationStage>;

export interface OperationProgress {
  /** The stages of the operation. */
  stages?: Array<OperationStage>;
}

export const OperationProgress: Schema.Schema<OperationProgress> =
  Schema.suspend(() =>
    Schema.Struct({
      stages: Schema.optional(Schema.Array(OperationStage)),
    }),
  ).annotate({
    identifier: "OperationProgress",
  }) as any as Schema.Schema<OperationProgress>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have [Operation.error] value with a [google.rpc.Status.code] of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Type of operation being executed. */
  type?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "CREATE"
    | "DELETE"
    | "UPDATE"
    | "UPGRADE"
    | "PLATFORM_UPGRADE"
    | (string & {});
  /** Output only. Detailed progress information for the operation. */
  progress?: OperationProgress;
  /** Output only. Denotes if the local managing cluster's control plane is currently disconnected. This is expected to occur temporarily during self-managed cluster upgrades. */
  controlPlaneDisconnected?: boolean;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      progress: Schema.optional(OperationProgress),
      controlPlaneDisconnected: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

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
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
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
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
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
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBareMetalClustersRequest {
  /** Required. The parent of the project and location where the cluster is created in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/ */
  bareMetalClusterId?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. */
  allowPreflightFailure?: boolean;
  /** Request body */
  body?: BareMetalCluster;
}

export const CreateProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  bareMetalClusterId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("bareMetalClusterId"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  allowPreflightFailure: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowPreflightFailure"),
  ),
  body: Schema.optional(BareMetalCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsBareMetalClustersRequest>;

export type CreateProjectsLocationsBareMetalClustersResponse = Operation;
export const CreateProjectsLocationsBareMetalClustersResponse = Operation;

export type CreateProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Creates a new bare metal cluster in a given project and location. */
export const createProjectsLocationsBareMetalClusters: API.OperationMethod<
  CreateProjectsLocationsBareMetalClustersRequest,
  CreateProjectsLocationsBareMetalClustersResponse,
  CreateProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsBareMetalClustersRequest,
  output: CreateProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsBareMetalClustersRequest {
  /** Required. Name of the bare metal user cluster to be deleted. Format: "projects/{project}/locations/{location}/bareMetalClusters/{bare_metal_cluster}" */
  name: string;
  /** The current etag of the bare metal Cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the bare metal cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** If set to true, any node pools from the cluster will also be deleted. */
  force?: boolean;
  /** If set to true, the deletion of a bare metal user cluster resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's cluster resource and the on-prem admin cluster that hosts your user cluster is disconnected / unreachable or deleted. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP user cluster but an existing on-prem user cluster. */
  ignoreErrors?: boolean;
}

export const DeleteProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  ignoreErrors: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreErrors"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsBareMetalClustersRequest>;

export type DeleteProjectsLocationsBareMetalClustersResponse = Operation;
export const DeleteProjectsLocationsBareMetalClustersResponse = Operation;

export type DeleteProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Deletes a single bare metal Cluster. */
export const deleteProjectsLocationsBareMetalClusters: API.OperationMethod<
  DeleteProjectsLocationsBareMetalClustersRequest,
  DeleteProjectsLocationsBareMetalClustersResponse,
  DeleteProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsBareMetalClustersRequest,
  output: DeleteProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface EnrollProjectsLocationsBareMetalClustersRequest {
  /** Required. The parent of the project and location where the cluster is enrolled in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Request body */
  body?: EnrollBareMetalClusterRequest;
}

export const EnrollProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EnrollBareMetalClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters:enroll",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnrollProjectsLocationsBareMetalClustersRequest>;

export type EnrollProjectsLocationsBareMetalClustersResponse = Operation;
export const EnrollProjectsLocationsBareMetalClustersResponse = Operation;

export type EnrollProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Enrolls an existing bare metal user cluster and its node pools to the Anthos On-Prem API within a given project and location. Through enrollment, an existing cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster and/or its node pools will be expected to be performed through the API. */
export const enrollProjectsLocationsBareMetalClusters: API.OperationMethod<
  EnrollProjectsLocationsBareMetalClustersRequest,
  EnrollProjectsLocationsBareMetalClustersResponse,
  EnrollProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnrollProjectsLocationsBareMetalClustersRequest,
  output: EnrollProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface GetProjectsLocationsBareMetalClustersRequest {
  /** Required. Name of the bare metal user cluster to get. Format: "projects/{project}/locations/{location}/bareMetalClusters/{bare_metal_cluster}" */
  name: string;
  /** View for bare metal user cluster. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return BareMetal Cluster including the one that only exists in RMS. */
  allowMissing?: boolean;
}

export const GetProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBareMetalClustersRequest>;

export type GetProjectsLocationsBareMetalClustersResponse = BareMetalCluster;
export const GetProjectsLocationsBareMetalClustersResponse = BareMetalCluster;

export type GetProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Gets details of a single bare metal Cluster. */
export const getProjectsLocationsBareMetalClusters: API.OperationMethod<
  GetProjectsLocationsBareMetalClustersRequest,
  GetProjectsLocationsBareMetalClustersResponse,
  GetProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsBareMetalClustersRequest,
  output: GetProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsBareMetalClustersRequest {
  /** Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** A resource filtering expression following https://google.aip.dev/160. When non-empty, only resource's whose attributes field matches the filter are returned. */
  filter?: string;
  /** View for bare metal Clusters. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return list of BareMetal Clusters including the ones that only exists in RMS. */
  allowMissing?: boolean;
}

export const ListProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBareMetalClustersRequest>;

export type ListProjectsLocationsBareMetalClustersResponse =
  ListBareMetalClustersResponse;
export const ListProjectsLocationsBareMetalClustersResponse =
  ListBareMetalClustersResponse;

export type ListProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Lists bare metal clusters in a given project and location. */
export const listProjectsLocationsBareMetalClusters: API.PaginatedOperationMethod<
  ListProjectsLocationsBareMetalClustersRequest,
  ListProjectsLocationsBareMetalClustersResponse,
  ListProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsBareMetalClustersRequest,
  output: ListProjectsLocationsBareMetalClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UnenrollProjectsLocationsBareMetalClustersRequest {
  /** Required. Name of the bare metal user cluster to be unenrolled. Format: "projects/{project}/locations/{location}/bareMetalClusters/{cluster}" */
  name: string;
  /** The current etag of the bare metal Cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the bare metal cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** This is required if the cluster has any associated node pools. When set, any child node pools will also be unenrolled. */
  force?: boolean;
}

export const UnenrollProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}:unenroll",
  }),
  svc,
) as unknown as Schema.Schema<UnenrollProjectsLocationsBareMetalClustersRequest>;

export type UnenrollProjectsLocationsBareMetalClustersResponse = Operation;
export const UnenrollProjectsLocationsBareMetalClustersResponse = Operation;

export type UnenrollProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Unenrolls an existing bare metal user cluster and its node pools from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters and node pools will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or its clients. */
export const unenrollProjectsLocationsBareMetalClusters: API.OperationMethod<
  UnenrollProjectsLocationsBareMetalClustersRequest,
  UnenrollProjectsLocationsBareMetalClustersResponse,
  UnenrollProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnenrollProjectsLocationsBareMetalClustersRequest,
  output: UnenrollProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsBareMetalClustersRequest {
  /** Immutable. The bare metal user cluster resource name. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the BareMetalCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the BareMetalCluster message will be updated. Empty fields will be ignored unless a field mask is used. */
  updateMask?: string;
  /** If set to true, and the bare metal cluster is not found, the request will create a new bare metal cluster with the provided configuration. The user must have both create and update permission to call Update with allow_missing set to true. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Request body */
  body?: BareMetalCluster;
}

export const PatchProjectsLocationsBareMetalClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(BareMetalCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsBareMetalClustersRequest>;

export type PatchProjectsLocationsBareMetalClustersResponse = Operation;
export const PatchProjectsLocationsBareMetalClustersResponse = Operation;

export type PatchProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Updates the parameters of a single bare metal Cluster. */
export const patchProjectsLocationsBareMetalClusters: API.OperationMethod<
  PatchProjectsLocationsBareMetalClustersRequest,
  PatchProjectsLocationsBareMetalClustersResponse,
  PatchProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsBareMetalClustersRequest,
  output: PatchProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface QueryVersionConfigProjectsLocationsBareMetalClustersRequest {
  /** Required. The parent of the project and location to query for version config. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** The admin cluster membership. This is the full resource name of the admin cluster's fleet membership. Format: "projects/{project}/locations/{location}/memberships/{membership}" */
  "createConfig.adminClusterMembership"?: string;
  /** The admin cluster resource name. This is the full resource name of the admin cluster resource. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{bare_metal_admin_cluster}" */
  "createConfig.adminClusterName"?: string;
  /** The user cluster resource name. This is the full resource name of the user cluster resource. Format: "projects/{project}/locations/{location}/bareMetalClusters/{bare_metal_cluster}" */
  "upgradeConfig.clusterName"?: string;
}

export const QueryVersionConfigProjectsLocationsBareMetalClustersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    "createConfig.adminClusterMembership": Schema.optional(Schema.String).pipe(
      T.HttpQuery("createConfig.adminClusterMembership"),
    ),
    "createConfig.adminClusterName": Schema.optional(Schema.String).pipe(
      T.HttpQuery("createConfig.adminClusterName"),
    ),
    "upgradeConfig.clusterName": Schema.optional(Schema.String).pipe(
      T.HttpQuery("upgradeConfig.clusterName"),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters:queryVersionConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<QueryVersionConfigProjectsLocationsBareMetalClustersRequest>;

export type QueryVersionConfigProjectsLocationsBareMetalClustersResponse =
  QueryBareMetalVersionConfigResponse;
export const QueryVersionConfigProjectsLocationsBareMetalClustersResponse =
  QueryBareMetalVersionConfigResponse;

export type QueryVersionConfigProjectsLocationsBareMetalClustersError =
  DefaultErrors;

/** Queries the bare metal user cluster version config. */
export const queryVersionConfigProjectsLocationsBareMetalClusters: API.OperationMethod<
  QueryVersionConfigProjectsLocationsBareMetalClustersRequest,
  QueryVersionConfigProjectsLocationsBareMetalClustersResponse,
  QueryVersionConfigProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryVersionConfigProjectsLocationsBareMetalClustersRequest,
  output: QueryVersionConfigProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsBareMetalClustersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBareMetalClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBareMetalClustersRequest>;

export type SetIamPolicyProjectsLocationsBareMetalClustersResponse = Policy;
export const SetIamPolicyProjectsLocationsBareMetalClustersResponse = Policy;

export type SetIamPolicyProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsBareMetalClusters: API.OperationMethod<
  SetIamPolicyProjectsLocationsBareMetalClustersRequest,
  SetIamPolicyProjectsLocationsBareMetalClustersResponse,
  SetIamPolicyProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsBareMetalClustersRequest,
  output: SetIamPolicyProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsBareMetalClustersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsBareMetalClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBareMetalClustersRequest>;

export type GetIamPolicyProjectsLocationsBareMetalClustersResponse = Policy;
export const GetIamPolicyProjectsLocationsBareMetalClustersResponse = Policy;

export type GetIamPolicyProjectsLocationsBareMetalClustersError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsBareMetalClusters: API.OperationMethod<
  GetIamPolicyProjectsLocationsBareMetalClustersRequest,
  GetIamPolicyProjectsLocationsBareMetalClustersResponse,
  GetIamPolicyProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsBareMetalClustersRequest,
  output: GetIamPolicyProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsBareMetalClustersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBareMetalClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBareMetalClustersRequest>;

export type TestIamPermissionsProjectsLocationsBareMetalClustersResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBareMetalClustersResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBareMetalClustersError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsBareMetalClusters: API.OperationMethod<
  TestIamPermissionsProjectsLocationsBareMetalClustersRequest,
  TestIamPermissionsProjectsLocationsBareMetalClustersResponse,
  TestIamPermissionsProjectsLocationsBareMetalClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBareMetalClustersRequest,
  output: TestIamPermissionsProjectsLocationsBareMetalClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsBareMetalClustersOperationsRequest {
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

export const ListProjectsLocationsBareMetalClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBareMetalClustersOperationsRequest>;

export type ListProjectsLocationsBareMetalClustersOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsBareMetalClustersOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsBareMetalClustersOperationsError =
  DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsBareMetalClustersOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsBareMetalClustersOperationsRequest,
  ListProjectsLocationsBareMetalClustersOperationsResponse,
  ListProjectsLocationsBareMetalClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsBareMetalClustersOperationsRequest,
  output: ListProjectsLocationsBareMetalClustersOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsBareMetalClustersOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsBareMetalClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBareMetalClustersOperationsRequest>;

export type GetProjectsLocationsBareMetalClustersOperationsResponse = Operation;
export const GetProjectsLocationsBareMetalClustersOperationsResponse =
  Operation;

export type GetProjectsLocationsBareMetalClustersOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsBareMetalClustersOperations: API.OperationMethod<
  GetProjectsLocationsBareMetalClustersOperationsRequest,
  GetProjectsLocationsBareMetalClustersOperationsResponse,
  GetProjectsLocationsBareMetalClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsBareMetalClustersOperationsRequest,
  output: GetProjectsLocationsBareMetalClustersOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Required. The parent resource where this node pool will be created. projects/{project}/locations/{location}/bareMetalClusters/{cluster} */
  parent: string;
  /** The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 63 characters, and valid characters are /a-z-/. The value must not be permitted to be a UUID (or UUID-like: anything matching /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i). */
  bareMetalNodePoolId?: string;
  /** If set, only validate the request, but do not actually create the node pool. */
  validateOnly?: boolean;
  /** Request body */
  body?: BareMetalNodePool;
}

export const CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    bareMetalNodePoolId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("bareMetalNodePoolId"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(BareMetalNodePool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;
export const CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;

export type CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Creates a new bare metal node pool in a given project, location and Bare Metal cluster. */
export const createProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: CreateProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Required. The name of the node pool to delete. Format: projects/{project}/locations/{location}/bareMetalClusters/{cluster}/bareMetalNodePools/{nodepool} */
  name: string;
  /** The current etag of the BareMetalNodePool. If an etag is provided and does not match the current etag of the node pool, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the bare metal node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** If set, only validate the request, but do not actually delete the node pool. */
  validateOnly?: boolean;
  /** If set to true, the deletion of a bare metal node pool resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's node pool resource and you've already deleted the on-prem admin cluster that hosted your node pool. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP node pool but an existing on-prem node pool. */
  ignoreErrors?: boolean;
}

export const DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    ignoreErrors: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("ignoreErrors"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;
export const DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;

export type DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Deletes a single bare metal node pool. */
export const deleteProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: DeleteProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Required. The parent resource where this node pool will be created. projects/{project}/locations/{location}/bareMetalClusters/{cluster} */
  parent: string;
  /** Request body */
  body?: EnrollBareMetalNodePoolRequest;
}

export const EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(EnrollBareMetalNodePoolRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools:enroll",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;
export const EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;

export type EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Enrolls an existing bare metal node pool to the Anthos On-Prem API within a given project and location. Through enrollment, an existing node pool will become Anthos On-Prem API managed. The corresponding GCP resources will be created. */
export const enrollProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: EnrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Required. The name of the node pool to retrieve. projects/{project}/locations/{location}/bareMetalClusters/{cluster}/bareMetalNodePools/{nodepool} */
  name: string;
  /** View for bare metal node pool. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete node pool configuration details. */
  view?: "NODE_POOL_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type GetProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  BareMetalNodePool;
export const GetProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  BareMetalNodePool;

export type GetProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Gets details of a single bare metal node pool. */
export const getProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  GetProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  GetProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  GetProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: GetProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Required. The parent, which owns this collection of node pools. Format: projects/{project}/locations/{location}/bareMetalClusters/{bareMetalCluster} */
  parent: string;
  /** The maximum number of node pools to return. The service may return fewer than this value. If unspecified, at most 50 node pools will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListBareMetalNodePools` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBareMetalNodePools` must match the call that provided the page token. */
  pageToken?: string;
  /** View for bare metal node pools. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete node pool configuration details. */
  view?: "NODE_POOL_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type ListProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  ListBareMetalNodePoolsResponse;
export const ListProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  ListBareMetalNodePoolsResponse;

export type ListProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Lists bare metal node pools in a given project, location and bare metal cluster. */
export const listProjectsLocationsBareMetalClustersBareMetalNodePools: API.PaginatedOperationMethod<
  ListProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  ListProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  ListProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: ListProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Required. The name of the node pool to unenroll. Format: projects/{project}/locations/{location}/bareMetalClusters/{cluster}/bareMetalNodePools/{nodepool} */
  name: string;
  /** The current etag of the bare metal node pool. If an etag is provided and does not match the current etag of node pool, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the bare metal node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** If set, only validate the request, but do not actually unenroll the node pool. */
  validateOnly?: boolean;
}

export const UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}:unenroll",
    }),
    svc,
  ) as unknown as Schema.Schema<UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;
export const UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;

export type UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Unenrolls a bare metal node pool from Anthos On-Prem API. */
export const unenrollProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: UnenrollProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** Immutable. The bare metal node pool resource name. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the BareMetalNodePool resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the BareMetalNodePool message will be updated. Empty fields will be ignored unless a field mask is used. */
  updateMask?: string;
  /** If set to true, and the bare metal node pool is not found, the request will create a new bare metal node pool with the provided configuration. The user must have both create and update permission to call Update with allow_missing set to true. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Request body */
  body?: BareMetalNodePool;
}

export const PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(BareMetalNodePool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;
export const PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Operation;

export type PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Updates the parameters of a single bare metal node pool. */
export const patchProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output: PatchProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Policy;
export const SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Policy;

export type SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output:
    SetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Policy;
export const GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  Policy;

export type GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output:
    GetIamPolicyProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest>;

export type TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePools: API.OperationMethod<
  TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsRequest,
  output:
    TestIamPermissionsProjectsLocationsBareMetalClustersBareMetalNodePoolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest {
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

export const ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest>;

export type ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsError =
  DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsBareMetalClustersBareMetalNodePoolsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest,
  ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse,
  ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input:
    ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest,
  output:
    ListProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalClusters/{bareMetalClustersId}/bareMetalNodePools/{bareMetalNodePoolsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest>;

export type GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse =
  Operation;
export const GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse =
  Operation;

export type GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsBareMetalClustersBareMetalNodePoolsOperations: API.OperationMethod<
  GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest,
  GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse,
  GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsRequest,
  output:
    GetProjectsLocationsBareMetalClustersBareMetalNodePoolsOperationsResponse,
  errors: [],
}));

export interface EnrollProjectsLocationsVmwareClustersRequest {
  /** Required. The parent of the project and location where the cluster is Enrolled in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Request body */
  body?: EnrollVmwareClusterRequest;
}

export const EnrollProjectsLocationsVmwareClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EnrollVmwareClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters:enroll",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnrollProjectsLocationsVmwareClustersRequest>;

export type EnrollProjectsLocationsVmwareClustersResponse = Operation;
export const EnrollProjectsLocationsVmwareClustersResponse = Operation;

export type EnrollProjectsLocationsVmwareClustersError = DefaultErrors;

/** Enrolls an existing VMware user cluster and its node pools to the Anthos On-Prem API within a given project and location. Through enrollment, an existing cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster and/or its node pools will be expected to be performed through the API. */
export const enrollProjectsLocationsVmwareClusters: API.OperationMethod<
  EnrollProjectsLocationsVmwareClustersRequest,
  EnrollProjectsLocationsVmwareClustersResponse,
  EnrollProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnrollProjectsLocationsVmwareClustersRequest,
  output: EnrollProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface UnenrollProjectsLocationsVmwareClustersRequest {
  /** Required. Name of the VMware user cluster to be unenrolled. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" */
  name: string;
  /** The current etag of the VMware Cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the VMware cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** This is required if the cluster has any associated node pools. When set, any child node pools will also be unenrolled. */
  force?: boolean;
}

export const UnenrollProjectsLocationsVmwareClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}:unenroll",
  }),
  svc,
) as unknown as Schema.Schema<UnenrollProjectsLocationsVmwareClustersRequest>;

export type UnenrollProjectsLocationsVmwareClustersResponse = Operation;
export const UnenrollProjectsLocationsVmwareClustersResponse = Operation;

export type UnenrollProjectsLocationsVmwareClustersError = DefaultErrors;

/** Unenrolls an existing VMware user cluster and its node pools from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters and node pools will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or UI. */
export const unenrollProjectsLocationsVmwareClusters: API.OperationMethod<
  UnenrollProjectsLocationsVmwareClustersRequest,
  UnenrollProjectsLocationsVmwareClustersResponse,
  UnenrollProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnenrollProjectsLocationsVmwareClustersRequest,
  output: UnenrollProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsVmwareClustersRequest {
  /** Required. The parent of the project and location where this cluster is created in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** User provided identifier that is used as part of the resource name; This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format. */
  vmwareClusterId?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. */
  allowPreflightFailure?: boolean;
  /** Optional. List of validations to skip during cluster creation. */
  skipValidations?: string[];
  /** Request body */
  body?: VmwareCluster;
}

export const CreateProjectsLocationsVmwareClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  vmwareClusterId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("vmwareClusterId"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  allowPreflightFailure: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowPreflightFailure"),
  ),
  skipValidations: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("skipValidations"),
  ),
  body: Schema.optional(VmwareCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVmwareClustersRequest>;

export type CreateProjectsLocationsVmwareClustersResponse = Operation;
export const CreateProjectsLocationsVmwareClustersResponse = Operation;

export type CreateProjectsLocationsVmwareClustersError = DefaultErrors;

/** Creates a new VMware user cluster in a given project and location. */
export const createProjectsLocationsVmwareClusters: API.OperationMethod<
  CreateProjectsLocationsVmwareClustersRequest,
  CreateProjectsLocationsVmwareClustersResponse,
  CreateProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsVmwareClustersRequest,
  output: CreateProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsVmwareClustersRequest {
  /** Required. Name of the VMware user cluster to be deleted. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" */
  name: string;
  /** The current etag of the VMware cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the VMware cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** If set to true, any node pools from the cluster will also be deleted. */
  force?: boolean;
  /** If set to true, the deletion of a VMware user cluster resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's cluster resource and the on-prem admin cluster that hosts your user cluster is disconnected / unreachable or deleted. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP user cluster but an existing on-prem user cluster. */
  ignoreErrors?: boolean;
}

export const DeleteProjectsLocationsVmwareClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  ignoreErrors: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreErrors"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVmwareClustersRequest>;

export type DeleteProjectsLocationsVmwareClustersResponse = Operation;
export const DeleteProjectsLocationsVmwareClustersResponse = Operation;

export type DeleteProjectsLocationsVmwareClustersError = DefaultErrors;

/** Deletes a single VMware Cluster. */
export const deleteProjectsLocationsVmwareClusters: API.OperationMethod<
  DeleteProjectsLocationsVmwareClustersRequest,
  DeleteProjectsLocationsVmwareClustersResponse,
  DeleteProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsVmwareClustersRequest,
  output: DeleteProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface GetProjectsLocationsVmwareClustersRequest {
  /** Required. Name of the VMware user cluster to be returned. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" */
  name: string;
  /** View for VMware user cluster. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return Vmware Cluster including the one that only exists in RMS. */
  allowMissing?: boolean;
}

export const GetProjectsLocationsVmwareClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVmwareClustersRequest>;

export type GetProjectsLocationsVmwareClustersResponse = VmwareCluster;
export const GetProjectsLocationsVmwareClustersResponse = VmwareCluster;

export type GetProjectsLocationsVmwareClustersError = DefaultErrors;

/** Gets details of a single VMware Cluster. */
export const getProjectsLocationsVmwareClusters: API.OperationMethod<
  GetProjectsLocationsVmwareClustersRequest,
  GetProjectsLocationsVmwareClustersResponse,
  GetProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsVmwareClustersRequest,
  output: GetProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsVmwareClustersRequest {
  /** Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** A resource filtering expression following https://google.aip.dev/160. When non-empty, only resource's whose attributes field matches the filter are returned. */
  filter?: string;
  /** View for VMware clusters. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return list of Vmware Clusters including the ones that only exists in RMS. */
  allowMissing?: boolean;
}

export const ListProjectsLocationsVmwareClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVmwareClustersRequest>;

export type ListProjectsLocationsVmwareClustersResponse =
  ListVmwareClustersResponse;
export const ListProjectsLocationsVmwareClustersResponse =
  ListVmwareClustersResponse;

export type ListProjectsLocationsVmwareClustersError = DefaultErrors;

/** Lists VMware Clusters in a given project and location. */
export const listProjectsLocationsVmwareClusters: API.PaginatedOperationMethod<
  ListProjectsLocationsVmwareClustersRequest,
  ListProjectsLocationsVmwareClustersResponse,
  ListProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareClustersRequest,
  output: ListProjectsLocationsVmwareClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsVmwareClustersRequest {
  /** Immutable. The VMware user cluster resource name. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the VMwareCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the VmwareCluster message will be updated. Empty fields will be ignored unless a field mask is used. */
  updateMask?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  skipValidations?: string[];
  /** Request body */
  body?: VmwareCluster;
}

export const PatchProjectsLocationsVmwareClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  skipValidations: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("skipValidations"),
  ),
  body: Schema.optional(VmwareCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVmwareClustersRequest>;

export type PatchProjectsLocationsVmwareClustersResponse = Operation;
export const PatchProjectsLocationsVmwareClustersResponse = Operation;

export type PatchProjectsLocationsVmwareClustersError = DefaultErrors;

/** Updates the parameters of a single VMware cluster. */
export const patchProjectsLocationsVmwareClusters: API.OperationMethod<
  PatchProjectsLocationsVmwareClustersRequest,
  PatchProjectsLocationsVmwareClustersResponse,
  PatchProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsVmwareClustersRequest,
  output: PatchProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface QueryVersionConfigProjectsLocationsVmwareClustersRequest {
  /** Required. The parent of the project and location to query for version config. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** The admin cluster membership. This is the full resource name of the admin cluster's fleet membership. Format: "projects/{project}/locations/{location}/memberships/{membership}" */
  "createConfig.adminClusterMembership"?: string;
  /** The admin cluster resource name. This is the full resource name of the admin cluster resource. Format: "projects/{project}/locations/{location}/vmwareAdminClusters/{vmware_admin_cluster}" */
  "createConfig.adminClusterName"?: string;
  /** The user cluster resource name. This is the full resource name of the user cluster resource. Format: "projects/{project}/locations/{location}/vmwareClusters/{vmware_cluster}" */
  "upgradeConfig.clusterName"?: string;
}

export const QueryVersionConfigProjectsLocationsVmwareClustersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    "createConfig.adminClusterMembership": Schema.optional(Schema.String).pipe(
      T.HttpQuery("createConfig.adminClusterMembership"),
    ),
    "createConfig.adminClusterName": Schema.optional(Schema.String).pipe(
      T.HttpQuery("createConfig.adminClusterName"),
    ),
    "upgradeConfig.clusterName": Schema.optional(Schema.String).pipe(
      T.HttpQuery("upgradeConfig.clusterName"),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters:queryVersionConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<QueryVersionConfigProjectsLocationsVmwareClustersRequest>;

export type QueryVersionConfigProjectsLocationsVmwareClustersResponse =
  QueryVmwareVersionConfigResponse;
export const QueryVersionConfigProjectsLocationsVmwareClustersResponse =
  QueryVmwareVersionConfigResponse;

export type QueryVersionConfigProjectsLocationsVmwareClustersError =
  DefaultErrors;

/** Queries the VMware user cluster version config. */
export const queryVersionConfigProjectsLocationsVmwareClusters: API.OperationMethod<
  QueryVersionConfigProjectsLocationsVmwareClustersRequest,
  QueryVersionConfigProjectsLocationsVmwareClustersResponse,
  QueryVersionConfigProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryVersionConfigProjectsLocationsVmwareClustersRequest,
  output: QueryVersionConfigProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsVmwareClustersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsVmwareClustersRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsVmwareClustersRequest>;

export type SetIamPolicyProjectsLocationsVmwareClustersResponse = Policy;
export const SetIamPolicyProjectsLocationsVmwareClustersResponse = Policy;

export type SetIamPolicyProjectsLocationsVmwareClustersError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsVmwareClusters: API.OperationMethod<
  SetIamPolicyProjectsLocationsVmwareClustersRequest,
  SetIamPolicyProjectsLocationsVmwareClustersResponse,
  SetIamPolicyProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsVmwareClustersRequest,
  output: SetIamPolicyProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsVmwareClustersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsVmwareClustersRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsVmwareClustersRequest>;

export type GetIamPolicyProjectsLocationsVmwareClustersResponse = Policy;
export const GetIamPolicyProjectsLocationsVmwareClustersResponse = Policy;

export type GetIamPolicyProjectsLocationsVmwareClustersError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsVmwareClusters: API.OperationMethod<
  GetIamPolicyProjectsLocationsVmwareClustersRequest,
  GetIamPolicyProjectsLocationsVmwareClustersResponse,
  GetIamPolicyProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsVmwareClustersRequest,
  output: GetIamPolicyProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsVmwareClustersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsVmwareClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsVmwareClustersRequest>;

export type TestIamPermissionsProjectsLocationsVmwareClustersResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsVmwareClustersResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsVmwareClustersError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsVmwareClusters: API.OperationMethod<
  TestIamPermissionsProjectsLocationsVmwareClustersRequest,
  TestIamPermissionsProjectsLocationsVmwareClustersResponse,
  TestIamPermissionsProjectsLocationsVmwareClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsVmwareClustersRequest,
  output: TestIamPermissionsProjectsLocationsVmwareClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsVmwareClustersOperationsRequest {
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

export const ListProjectsLocationsVmwareClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsVmwareClustersOperationsRequest>;

export type ListProjectsLocationsVmwareClustersOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsVmwareClustersOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsVmwareClustersOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsVmwareClustersOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsVmwareClustersOperationsRequest,
  ListProjectsLocationsVmwareClustersOperationsResponse,
  ListProjectsLocationsVmwareClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareClustersOperationsRequest,
  output: ListProjectsLocationsVmwareClustersOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsVmwareClustersOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsVmwareClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsVmwareClustersOperationsRequest>;

export type GetProjectsLocationsVmwareClustersOperationsResponse = Operation;
export const GetProjectsLocationsVmwareClustersOperationsResponse = Operation;

export type GetProjectsLocationsVmwareClustersOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsVmwareClustersOperations: API.OperationMethod<
  GetProjectsLocationsVmwareClustersOperationsRequest,
  GetProjectsLocationsVmwareClustersOperationsResponse,
  GetProjectsLocationsVmwareClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsVmwareClustersOperationsRequest,
  output: GetProjectsLocationsVmwareClustersOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Required. The parent resource where this node pool will be created. projects/{project}/locations/{location}/vmwareClusters/{cluster} */
  parent: string;
  /** The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format. The value must not be permitted to be a UUID (or UUID-like: anything matching /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i). */
  vmwareNodePoolId?: string;
  /** If set, only validate the request, but do not actually create the node pool. */
  validateOnly?: boolean;
  /** Request body */
  body?: VmwareNodePool;
}

export const CreateProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    vmwareNodePoolId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("vmwareNodePoolId"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(VmwareNodePool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type CreateProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;
export const CreateProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;

export type CreateProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Creates a new VMware node pool in a given project, location and VMWare cluster. */
export const createProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  CreateProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  CreateProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  CreateProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: CreateProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Required. The name of the node pool to delete. Format: projects/{project}/locations/{location}/vmwareClusters/{cluster}/vmwareNodePools/{nodepool} */
  name: string;
  /** The current etag of the VmwareNodePool. If an etag is provided and does not match the current etag of the node pool, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the VMware node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** If set, only validate the request, but do not actually delete the node pool. */
  validateOnly?: boolean;
  /** If set to true, the deletion of a VMware node pool resource will succeed even if errors occur during deletion. This parameter can be used when you want to delete GCP's node pool resource and you've already deleted the on-prem admin cluster that hosted your node pool. WARNING: Using this parameter when your user cluster still exists may result in a deleted GCP node pool but an existing on-prem node pool. */
  ignoreErrors?: boolean;
}

export const DeleteProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    ignoreErrors: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("ignoreErrors"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type DeleteProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;
export const DeleteProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;

export type DeleteProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Deletes a single VMware node pool. */
export const deleteProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  DeleteProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  DeleteProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  DeleteProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: DeleteProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Required. The name of the node pool to retrieve. projects/{project}/locations/{location}/vmwareClusters/{cluster}/vmwareNodePools/{nodepool} */
  name: string;
  /** View for VMware node pool. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete node pool configuration details. */
  view?: "NODE_POOL_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type GetProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  VmwareNodePool;
export const GetProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  VmwareNodePool;

export type GetProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Gets details of a single VMware node pool. */
export const getProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  GetProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  GetProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  GetProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: GetProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Required. The parent, which owns this collection of node pools. Format: projects/{project}/locations/{location}/vmwareClusters/{vmwareCluster} */
  parent: string;
  /** The maximum number of node pools to return. The service may return fewer than this value. If unspecified, at most 50 node pools will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListVmwareNodePools` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListVmwareNodePools` must match the call that provided the page token. */
  pageToken?: string;
  /** View for VMware node pools. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete node pool configuration details. */
  view?: "NODE_POOL_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type ListProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  ListVmwareNodePoolsResponse;
export const ListProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  ListVmwareNodePoolsResponse;

export type ListProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Lists VMware node pools in a given project, location and VMWare cluster. */
export const listProjectsLocationsVmwareClustersVmwareNodePools: API.PaginatedOperationMethod<
  ListProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  ListProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  ListProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: ListProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Immutable. The resource name of this node pool. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the VMwareNodePool resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the VMwareNodePool message will be updated. Empty fields will be ignored unless a field mask is used. */
  updateMask?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Request body */
  body?: VmwareNodePool;
}

export const PatchProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(VmwareNodePool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type PatchProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;
export const PatchProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;

export type PatchProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Updates the parameters of a single VMware node pool. */
export const patchProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  PatchProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  PatchProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  PatchProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: PatchProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface EnrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Required. The parent resource where the node pool is enrolled in. */
  parent: string;
  /** Request body */
  body?: EnrollVmwareNodePoolRequest;
}

export const EnrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(EnrollVmwareNodePoolRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools:enroll",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type EnrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;
export const EnrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;

export type EnrollProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Enrolls a VMware node pool to Anthos On-Prem API */
export const enrollProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  EnrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  EnrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  EnrollProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: EnrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** Required. The name of the node pool to unenroll. Format: projects/{project}/locations/{location}/vmwareClusters/{cluster}/vmwareNodePools/{nodepool} */
  name: string;
  /** The current etag of the VMware node pool. If an etag is provided and does not match the current etag of node pool, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the VMware node pool is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** If set, only validate the request, but do not actually unenroll the node pool. */
  validateOnly?: boolean;
}

export const UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}:unenroll",
    }),
    svc,
  ) as unknown as Schema.Schema<UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;
export const UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Operation;

export type UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Unenrolls a VMware node pool to Anthos On-Prem API */
export const unenrollProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: UnenrollProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Policy;
export const SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Policy;

export type SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: SetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Policy;
export const GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  Policy;

export type GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output: GetIamPolicyProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsRequest>;

export type TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsVmwareClustersVmwareNodePools: API.OperationMethod<
  TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsRequest,
  output:
    TestIamPermissionsProjectsLocationsVmwareClustersVmwareNodePoolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest {
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

export const ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest>;

export type ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsError =
  DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsVmwareClustersVmwareNodePoolsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest,
  ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse,
  ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest,
  output: ListProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareClusters/{vmwareClustersId}/vmwareNodePools/{vmwareNodePoolsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest>;

export type GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse =
  Operation;
export const GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse =
  Operation;

export type GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsVmwareClustersVmwareNodePoolsOperations: API.OperationMethod<
  GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest,
  GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse,
  GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsRequest,
  output: GetProjectsLocationsVmwareClustersVmwareNodePoolsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsVmwareAdminClustersRequest {
  /** Required. The parent of the project and location where the cluster is created in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/ */
  vmwareAdminClusterId?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. */
  allowPreflightFailure?: boolean;
  /** Optional. If set, skip the specified validations. */
  skipValidations?: string[];
  /** Request body */
  body?: VmwareAdminCluster;
}

export const CreateProjectsLocationsVmwareAdminClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  vmwareAdminClusterId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("vmwareAdminClusterId"),
  ),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  allowPreflightFailure: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowPreflightFailure"),
  ),
  skipValidations: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("skipValidations"),
  ),
  body: Schema.optional(VmwareAdminCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVmwareAdminClustersRequest>;

export type CreateProjectsLocationsVmwareAdminClustersResponse = Operation;
export const CreateProjectsLocationsVmwareAdminClustersResponse = Operation;

export type CreateProjectsLocationsVmwareAdminClustersError = DefaultErrors;

/** Creates a new VMware admin cluster in a given project and location. The API needs to be combined with creating a bootstrap cluster to work. */
export const createProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  CreateProjectsLocationsVmwareAdminClustersRequest,
  CreateProjectsLocationsVmwareAdminClustersResponse,
  CreateProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsVmwareAdminClustersRequest,
  output: CreateProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsVmwareAdminClustersRequest {
  /** Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** View for VMware admin clusters. When `BASIC` is specified, only the admin cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete admin cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return list of Vmware Admin Clusters including the ones that only exists in RMS. */
  allowMissing?: boolean;
}

export const ListProjectsLocationsVmwareAdminClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVmwareAdminClustersRequest>;

export type ListProjectsLocationsVmwareAdminClustersResponse =
  ListVmwareAdminClustersResponse;
export const ListProjectsLocationsVmwareAdminClustersResponse =
  ListVmwareAdminClustersResponse;

export type ListProjectsLocationsVmwareAdminClustersError = DefaultErrors;

/** Lists VMware admin clusters in a given project and location. */
export const listProjectsLocationsVmwareAdminClusters: API.PaginatedOperationMethod<
  ListProjectsLocationsVmwareAdminClustersRequest,
  ListProjectsLocationsVmwareAdminClustersResponse,
  ListProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareAdminClustersRequest,
  output: ListProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsVmwareAdminClustersRequest {
  /** Required. Name of the VMware admin cluster to be returned. Format: "projects/{project}/locations/{location}/vmwareAdminClusters/{vmware_admin_cluster}" */
  name: string;
  /** View for VMware admin cluster. When `BASIC` is specified, only the cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return Vmware Admin Cluster including the one that only exists in RMS. */
  allowMissing?: boolean;
}

export const GetProjectsLocationsVmwareAdminClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVmwareAdminClustersRequest>;

export type GetProjectsLocationsVmwareAdminClustersResponse =
  VmwareAdminCluster;
export const GetProjectsLocationsVmwareAdminClustersResponse =
  VmwareAdminCluster;

export type GetProjectsLocationsVmwareAdminClustersError = DefaultErrors;

/** Gets details of a single VMware admin cluster. */
export const getProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  GetProjectsLocationsVmwareAdminClustersRequest,
  GetProjectsLocationsVmwareAdminClustersResponse,
  GetProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsVmwareAdminClustersRequest,
  output: GetProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface EnrollProjectsLocationsVmwareAdminClustersRequest {
  /** Required. The parent of the project and location where the cluster is enrolled in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Request body */
  body?: EnrollVmwareAdminClusterRequest;
}

export const EnrollProjectsLocationsVmwareAdminClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EnrollVmwareAdminClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters:enroll",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnrollProjectsLocationsVmwareAdminClustersRequest>;

export type EnrollProjectsLocationsVmwareAdminClustersResponse = Operation;
export const EnrollProjectsLocationsVmwareAdminClustersResponse = Operation;

export type EnrollProjectsLocationsVmwareAdminClustersError = DefaultErrors;

/** Enrolls an existing VMware admin cluster to the Anthos On-Prem API within a given project and location. Through enrollment, an existing admin cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster will be expected to be performed through the API. */
export const enrollProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  EnrollProjectsLocationsVmwareAdminClustersRequest,
  EnrollProjectsLocationsVmwareAdminClustersResponse,
  EnrollProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnrollProjectsLocationsVmwareAdminClustersRequest,
  output: EnrollProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface UnenrollProjectsLocationsVmwareAdminClustersRequest {
  /** Required. Name of the VMware admin cluster to be unenrolled. Format: "projects/{project}/locations/{location}/vmwareAdminClusters/{cluster}" */
  name: string;
  /** The current etag of the VMware admin cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the VMware admin cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Optional. If set to true, the unenrollment of a vmware admin cluster resource will succeed even if errors occur during unenrollment. This parameter can be used when you want to unenroll admin cluster resource and the on-prem admin cluster is disconnected / unreachable. WARNING: Using this parameter when your admin cluster still exists may result in a deleted GCP admin cluster but existing resourcelink in on-prem admin cluster and membership. */
  ignoreErrors?: boolean;
}

export const UnenrollProjectsLocationsVmwareAdminClustersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    ignoreErrors: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("ignoreErrors"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}:unenroll",
    }),
    svc,
  ) as unknown as Schema.Schema<UnenrollProjectsLocationsVmwareAdminClustersRequest>;

export type UnenrollProjectsLocationsVmwareAdminClustersResponse = Operation;
export const UnenrollProjectsLocationsVmwareAdminClustersResponse = Operation;

export type UnenrollProjectsLocationsVmwareAdminClustersError = DefaultErrors;

/** Unenrolls an existing VMware admin cluster from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or its clients. */
export const unenrollProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  UnenrollProjectsLocationsVmwareAdminClustersRequest,
  UnenrollProjectsLocationsVmwareAdminClustersResponse,
  UnenrollProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnenrollProjectsLocationsVmwareAdminClustersRequest,
  output: UnenrollProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsVmwareAdminClustersRequest {
  /** Immutable. The VMware admin cluster resource name. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the VMwareAdminCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the VmwareAdminCluster message will be updated. Empty fields will be ignored unless a field mask is used. */
  updateMask?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Optional. If set, the server-side preflight checks will be skipped. */
  skipValidations?: string[];
  /** Request body */
  body?: VmwareAdminCluster;
}

export const PatchProjectsLocationsVmwareAdminClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  skipValidations: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("skipValidations"),
  ),
  body: Schema.optional(VmwareAdminCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVmwareAdminClustersRequest>;

export type PatchProjectsLocationsVmwareAdminClustersResponse = Operation;
export const PatchProjectsLocationsVmwareAdminClustersResponse = Operation;

export type PatchProjectsLocationsVmwareAdminClustersError = DefaultErrors;

/** Updates the parameters of a single VMware admin cluster. */
export const patchProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  PatchProjectsLocationsVmwareAdminClustersRequest,
  PatchProjectsLocationsVmwareAdminClustersResponse,
  PatchProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsVmwareAdminClustersRequest,
  output: PatchProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsVmwareAdminClustersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsVmwareAdminClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsVmwareAdminClustersRequest>;

export type SetIamPolicyProjectsLocationsVmwareAdminClustersResponse = Policy;
export const SetIamPolicyProjectsLocationsVmwareAdminClustersResponse = Policy;

export type SetIamPolicyProjectsLocationsVmwareAdminClustersError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  SetIamPolicyProjectsLocationsVmwareAdminClustersRequest,
  SetIamPolicyProjectsLocationsVmwareAdminClustersResponse,
  SetIamPolicyProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsVmwareAdminClustersRequest,
  output: SetIamPolicyProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsVmwareAdminClustersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsVmwareAdminClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsVmwareAdminClustersRequest>;

export type GetIamPolicyProjectsLocationsVmwareAdminClustersResponse = Policy;
export const GetIamPolicyProjectsLocationsVmwareAdminClustersResponse = Policy;

export type GetIamPolicyProjectsLocationsVmwareAdminClustersError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  GetIamPolicyProjectsLocationsVmwareAdminClustersRequest,
  GetIamPolicyProjectsLocationsVmwareAdminClustersResponse,
  GetIamPolicyProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsVmwareAdminClustersRequest,
  output: GetIamPolicyProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsVmwareAdminClustersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsVmwareAdminClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsVmwareAdminClustersRequest>;

export type TestIamPermissionsProjectsLocationsVmwareAdminClustersResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsVmwareAdminClustersResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsVmwareAdminClustersError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsVmwareAdminClusters: API.OperationMethod<
  TestIamPermissionsProjectsLocationsVmwareAdminClustersRequest,
  TestIamPermissionsProjectsLocationsVmwareAdminClustersResponse,
  TestIamPermissionsProjectsLocationsVmwareAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsVmwareAdminClustersRequest,
  output: TestIamPermissionsProjectsLocationsVmwareAdminClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsVmwareAdminClustersOperationsRequest {
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

export const ListProjectsLocationsVmwareAdminClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsVmwareAdminClustersOperationsRequest>;

export type ListProjectsLocationsVmwareAdminClustersOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsVmwareAdminClustersOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsVmwareAdminClustersOperationsError =
  DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsVmwareAdminClustersOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsVmwareAdminClustersOperationsRequest,
  ListProjectsLocationsVmwareAdminClustersOperationsResponse,
  ListProjectsLocationsVmwareAdminClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsVmwareAdminClustersOperationsRequest,
  output: ListProjectsLocationsVmwareAdminClustersOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsVmwareAdminClustersOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsVmwareAdminClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/vmwareAdminClusters/{vmwareAdminClustersId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsVmwareAdminClustersOperationsRequest>;

export type GetProjectsLocationsVmwareAdminClustersOperationsResponse =
  Operation;
export const GetProjectsLocationsVmwareAdminClustersOperationsResponse =
  Operation;

export type GetProjectsLocationsVmwareAdminClustersOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsVmwareAdminClustersOperations: API.OperationMethod<
  GetProjectsLocationsVmwareAdminClustersOperationsRequest,
  GetProjectsLocationsVmwareAdminClustersOperationsResponse,
  GetProjectsLocationsVmwareAdminClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsVmwareAdminClustersOperationsRequest,
  output: GetProjectsLocationsVmwareAdminClustersOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBareMetalAdminClustersRequest {
  /** Required. The parent of the project and location where the cluster is created in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/ */
  bareMetalAdminClusterId?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster. */
  allowPreflightFailure?: boolean;
  /** Request body */
  body?: BareMetalAdminCluster;
}

export const CreateProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    bareMetalAdminClusterId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("bareMetalAdminClusterId"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    allowPreflightFailure: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowPreflightFailure"),
    ),
    body: Schema.optional(BareMetalAdminCluster).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsBareMetalAdminClustersRequest>;

export type CreateProjectsLocationsBareMetalAdminClustersResponse = Operation;
export const CreateProjectsLocationsBareMetalAdminClustersResponse = Operation;

export type CreateProjectsLocationsBareMetalAdminClustersError = DefaultErrors;

/** Creates a new bare metal admin cluster in a given project and location. The API needs to be combined with creating a bootstrap cluster to work. See: https://cloud.google.com/anthos/clusters/docs/bare-metal/latest/installing/creating-clusters/create-admin-cluster-api#prepare_bootstrap_environment */
export const createProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  CreateProjectsLocationsBareMetalAdminClustersRequest,
  CreateProjectsLocationsBareMetalAdminClustersResponse,
  CreateProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsBareMetalAdminClustersRequest,
  output: CreateProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsBareMetalAdminClustersRequest {
  /** Required. The parent of the project and location where the clusters are listed in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** View for bare metal admin clusters. When `BASIC` is specified, only the admin cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete admin cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return list of BareMetal Admin Clusters including the ones that only exists in RMS. */
  allowMissing?: boolean;
}

export const ListProjectsLocationsBareMetalAdminClustersRequest = Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsBareMetalAdminClustersRequest>;

export type ListProjectsLocationsBareMetalAdminClustersResponse =
  ListBareMetalAdminClustersResponse;
export const ListProjectsLocationsBareMetalAdminClustersResponse =
  ListBareMetalAdminClustersResponse;

export type ListProjectsLocationsBareMetalAdminClustersError = DefaultErrors;

/** Lists bare metal admin clusters in a given project and location. */
export const listProjectsLocationsBareMetalAdminClusters: API.PaginatedOperationMethod<
  ListProjectsLocationsBareMetalAdminClustersRequest,
  ListProjectsLocationsBareMetalAdminClustersResponse,
  ListProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsBareMetalAdminClustersRequest,
  output: ListProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsBareMetalAdminClustersRequest {
  /** Required. Name of the bare metal admin cluster to get. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{bare_metal_admin_cluster}" */
  name: string;
  /** View for bare metal admin cluster. When `BASIC` is specified, only the cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details. */
  view?: "CLUSTER_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. If true, return BareMetal Admin Cluster including the one that only exists in RMS. */
  allowMissing?: boolean;
}

export const GetProjectsLocationsBareMetalAdminClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsBareMetalAdminClustersRequest>;

export type GetProjectsLocationsBareMetalAdminClustersResponse =
  BareMetalAdminCluster;
export const GetProjectsLocationsBareMetalAdminClustersResponse =
  BareMetalAdminCluster;

export type GetProjectsLocationsBareMetalAdminClustersError = DefaultErrors;

/** Gets details of a single bare metal admin cluster. */
export const getProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  GetProjectsLocationsBareMetalAdminClustersRequest,
  GetProjectsLocationsBareMetalAdminClustersResponse,
  GetProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsBareMetalAdminClustersRequest,
  output: GetProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface EnrollProjectsLocationsBareMetalAdminClustersRequest {
  /** Required. The parent of the project and location where the cluster is enrolled in. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** Request body */
  body?: EnrollBareMetalAdminClusterRequest;
}

export const EnrollProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(EnrollBareMetalAdminClusterRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters:enroll",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnrollProjectsLocationsBareMetalAdminClustersRequest>;

export type EnrollProjectsLocationsBareMetalAdminClustersResponse = Operation;
export const EnrollProjectsLocationsBareMetalAdminClustersResponse = Operation;

export type EnrollProjectsLocationsBareMetalAdminClustersError = DefaultErrors;

/** Enrolls an existing bare metal admin cluster to the Anthos On-Prem API within a given project and location. Through enrollment, an existing admin cluster will become Anthos On-Prem API managed. The corresponding GCP resources will be created and all future modifications to the cluster will be expected to be performed through the API. */
export const enrollProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  EnrollProjectsLocationsBareMetalAdminClustersRequest,
  EnrollProjectsLocationsBareMetalAdminClustersResponse,
  EnrollProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnrollProjectsLocationsBareMetalAdminClustersRequest,
  output: EnrollProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface UnenrollProjectsLocationsBareMetalAdminClustersRequest {
  /** Required. Name of the bare metal admin cluster to be unenrolled. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{cluster}" */
  name: string;
  /** The current etag of the bare metal admin cluster. If an etag is provided and does not match the current etag of the cluster, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** If set to true, and the bare metal admin cluster is not found, the request will succeed but no action will be taken on the server and return a completed LRO. */
  allowMissing?: boolean;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** If set to true, the unenrollment of a bare metal admin cluster resource will succeed even if errors occur during unenrollment. This parameter can be used when you want to unenroll admin cluster resource and the on-prem admin cluster is disconnected / unreachable. WARNING: Using this parameter when your admin cluster still exists may result in a deleted GCP admin cluster but existing resourcelink in on-prem admin cluster and membership. */
  ignoreErrors?: boolean;
}

export const UnenrollProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    ignoreErrors: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("ignoreErrors"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}:unenroll",
    }),
    svc,
  ) as unknown as Schema.Schema<UnenrollProjectsLocationsBareMetalAdminClustersRequest>;

export type UnenrollProjectsLocationsBareMetalAdminClustersResponse = Operation;
export const UnenrollProjectsLocationsBareMetalAdminClustersResponse =
  Operation;

export type UnenrollProjectsLocationsBareMetalAdminClustersError =
  DefaultErrors;

/** Unenrolls an existing bare metal admin cluster from the Anthos On-Prem API within a given project and location. Unenrollment removes the Cloud reference to the cluster without modifying the underlying OnPrem Resources. Clusters will continue to run; however, they will no longer be accessible through the Anthos On-Prem API or its clients. */
export const unenrollProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  UnenrollProjectsLocationsBareMetalAdminClustersRequest,
  UnenrollProjectsLocationsBareMetalAdminClustersResponse,
  UnenrollProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnenrollProjectsLocationsBareMetalAdminClustersRequest,
  output: UnenrollProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsBareMetalAdminClustersRequest {
  /** Immutable. The bare metal admin cluster resource name. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the BareMetalAdminCluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all populated fields in the BareMetalAdminCluster message will be updated. Empty fields will be ignored unless a field mask is used. */
  updateMask?: string;
  /** Validate the request without actually doing any updates. */
  validateOnly?: boolean;
  /** Request body */
  body?: BareMetalAdminCluster;
}

export const PatchProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(BareMetalAdminCluster).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsBareMetalAdminClustersRequest>;

export type PatchProjectsLocationsBareMetalAdminClustersResponse = Operation;
export const PatchProjectsLocationsBareMetalAdminClustersResponse = Operation;

export type PatchProjectsLocationsBareMetalAdminClustersError = DefaultErrors;

/** Updates the parameters of a single bare metal admin cluster. */
export const patchProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  PatchProjectsLocationsBareMetalAdminClustersRequest,
  PatchProjectsLocationsBareMetalAdminClustersResponse,
  PatchProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsBareMetalAdminClustersRequest,
  output: PatchProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface QueryVersionConfigProjectsLocationsBareMetalAdminClustersRequest {
  /** Required. The parent of the project and location to query for version config. Format: "projects/{project}/locations/{location}" */
  parent: string;
  /** The admin cluster resource name. This is the full resource name of the admin cluster resource. Format: "projects/{project}/locations/{location}/bareMetalAdminClusters/{bare_metal_admin_cluster}" */
  "upgradeConfig.clusterName"?: string;
}

export const QueryVersionConfigProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    "upgradeConfig.clusterName": Schema.optional(Schema.String).pipe(
      T.HttpQuery("upgradeConfig.clusterName"),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters:queryVersionConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<QueryVersionConfigProjectsLocationsBareMetalAdminClustersRequest>;

export type QueryVersionConfigProjectsLocationsBareMetalAdminClustersResponse =
  QueryBareMetalAdminVersionConfigResponse;
export const QueryVersionConfigProjectsLocationsBareMetalAdminClustersResponse =
  QueryBareMetalAdminVersionConfigResponse;

export type QueryVersionConfigProjectsLocationsBareMetalAdminClustersError =
  DefaultErrors;

/** Queries the bare metal admin cluster version config. */
export const queryVersionConfigProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  QueryVersionConfigProjectsLocationsBareMetalAdminClustersRequest,
  QueryVersionConfigProjectsLocationsBareMetalAdminClustersResponse,
  QueryVersionConfigProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryVersionConfigProjectsLocationsBareMetalAdminClustersRequest,
  output: QueryVersionConfigProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsBareMetalAdminClustersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsBareMetalAdminClustersRequest>;

export type SetIamPolicyProjectsLocationsBareMetalAdminClustersResponse =
  Policy;
export const SetIamPolicyProjectsLocationsBareMetalAdminClustersResponse =
  Policy;

export type SetIamPolicyProjectsLocationsBareMetalAdminClustersError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  SetIamPolicyProjectsLocationsBareMetalAdminClustersRequest,
  SetIamPolicyProjectsLocationsBareMetalAdminClustersResponse,
  SetIamPolicyProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsBareMetalAdminClustersRequest,
  output: SetIamPolicyProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsBareMetalAdminClustersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsBareMetalAdminClustersRequest>;

export type GetIamPolicyProjectsLocationsBareMetalAdminClustersResponse =
  Policy;
export const GetIamPolicyProjectsLocationsBareMetalAdminClustersResponse =
  Policy;

export type GetIamPolicyProjectsLocationsBareMetalAdminClustersError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  GetIamPolicyProjectsLocationsBareMetalAdminClustersRequest,
  GetIamPolicyProjectsLocationsBareMetalAdminClustersResponse,
  GetIamPolicyProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsBareMetalAdminClustersRequest,
  output: GetIamPolicyProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsBareMetalAdminClustersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsBareMetalAdminClustersRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsBareMetalAdminClustersRequest>;

export type TestIamPermissionsProjectsLocationsBareMetalAdminClustersResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsBareMetalAdminClustersResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsBareMetalAdminClustersError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsBareMetalAdminClusters: API.OperationMethod<
  TestIamPermissionsProjectsLocationsBareMetalAdminClustersRequest,
  TestIamPermissionsProjectsLocationsBareMetalAdminClustersResponse,
  TestIamPermissionsProjectsLocationsBareMetalAdminClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsBareMetalAdminClustersRequest,
  output: TestIamPermissionsProjectsLocationsBareMetalAdminClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsBareMetalAdminClustersOperationsRequest {
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

export const ListProjectsLocationsBareMetalAdminClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBareMetalAdminClustersOperationsRequest>;

export type ListProjectsLocationsBareMetalAdminClustersOperationsResponse =
  ListOperationsResponse;
export const ListProjectsLocationsBareMetalAdminClustersOperationsResponse =
  ListOperationsResponse;

export type ListProjectsLocationsBareMetalAdminClustersOperationsError =
  DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsBareMetalAdminClustersOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsBareMetalAdminClustersOperationsRequest,
  ListProjectsLocationsBareMetalAdminClustersOperationsResponse,
  ListProjectsLocationsBareMetalAdminClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsBareMetalAdminClustersOperationsRequest,
  output: ListProjectsLocationsBareMetalAdminClustersOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsBareMetalAdminClustersOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsBareMetalAdminClustersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/bareMetalAdminClusters/{bareMetalAdminClustersId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBareMetalAdminClustersOperationsRequest>;

export type GetProjectsLocationsBareMetalAdminClustersOperationsResponse =
  Operation;
export const GetProjectsLocationsBareMetalAdminClustersOperationsResponse =
  Operation;

export type GetProjectsLocationsBareMetalAdminClustersOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsBareMetalAdminClustersOperations: API.OperationMethod<
  GetProjectsLocationsBareMetalAdminClustersOperationsRequest,
  GetProjectsLocationsBareMetalAdminClustersOperationsResponse,
  GetProjectsLocationsBareMetalAdminClustersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsBareMetalAdminClustersOperationsRequest,
  output: GetProjectsLocationsBareMetalAdminClustersOperationsResponse,
  errors: [],
}));
