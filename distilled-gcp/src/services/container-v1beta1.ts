// ==========================================================================
// Kubernetes Engine API (container v1beta1)
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
  name: "container",
  version: "v1beta1",
  rootUrl: "https://container.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GPUSharingConfig {
  /** The max number of containers that can share a physical GPU. */
  maxSharedClientsPerGpu?: string;
  /** The type of GPU sharing strategy to enable on the GPU node. */
  gpuSharingStrategy?: "GPU_SHARING_STRATEGY_UNSPECIFIED" | "TIME_SHARING" | "MPS" | (string & {});
}

export const GPUSharingConfig: Schema.Schema<GPUSharingConfig> = Schema.suspend(() => Schema.Struct({
  maxSharedClientsPerGpu: Schema.optional(Schema.String),
  gpuSharingStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "GPUSharingConfig" }) as any as Schema.Schema<GPUSharingConfig>;

export interface LocalNvmeSsdBlockConfig {
  /** Number of local NVMe SSDs to use. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info. */
  localSsdCount?: number;
}

export const LocalNvmeSsdBlockConfig: Schema.Schema<LocalNvmeSsdBlockConfig> = Schema.suspend(() => Schema.Struct({
  localSsdCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "LocalNvmeSsdBlockConfig" }) as any as Schema.Schema<LocalNvmeSsdBlockConfig>;

export interface MaintenanceExclusionOptions {
  /** EndTimeBehavior specifies the behavior of the exclusion end time. */
  endTimeBehavior?: "END_TIME_BEHAVIOR_UNSPECIFIED" | "UNTIL_END_OF_SUPPORT" | (string & {});
  /** Scope specifies the upgrade scope which upgrades are blocked by the exclusion. */
  scope?: "NO_UPGRADES" | "NO_MINOR_UPGRADES" | "NO_MINOR_OR_NODE_UPGRADES" | (string & {});
}

export const MaintenanceExclusionOptions: Schema.Schema<MaintenanceExclusionOptions> = Schema.suspend(() => Schema.Struct({
  endTimeBehavior: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceExclusionOptions" }) as any as Schema.Schema<MaintenanceExclusionOptions>;

export interface TimeWindow {
  /** The time that the window ends. The end time should take place after the start time. */
  endTime?: string;
  /** MaintenanceExclusionOptions provides maintenance exclusion related options. */
  maintenanceExclusionOptions?: MaintenanceExclusionOptions;
  /** The time that the window first starts. */
  startTime?: string;
}

export const TimeWindow: Schema.Schema<TimeWindow> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  maintenanceExclusionOptions: Schema.optional(MaintenanceExclusionOptions),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeWindow" }) as any as Schema.Schema<TimeWindow>;

export interface CompleteNodePoolUpgradeRequest {
}

export const CompleteNodePoolUpgradeRequest: Schema.Schema<CompleteNodePoolUpgradeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CompleteNodePoolUpgradeRequest" }) as any as Schema.Schema<CompleteNodePoolUpgradeRequest>;

export interface StandardRolloutPolicy {
  /** Number of blue nodes to drain in a batch. */
  batchNodeCount?: number;
  /** Percentage of the blue pool nodes to drain in a batch. The range of this field should be (0.0, 1.0]. */
  batchPercentage?: number;
  /** Soak time after each batch gets drained. Default to zero. */
  batchSoakDuration?: string;
}

export const StandardRolloutPolicy: Schema.Schema<StandardRolloutPolicy> = Schema.suspend(() => Schema.Struct({
  batchNodeCount: Schema.optional(Schema.Number),
  batchPercentage: Schema.optional(Schema.Number),
  batchSoakDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "StandardRolloutPolicy" }) as any as Schema.Schema<StandardRolloutPolicy>;

export interface AutoscaledRolloutPolicy {
  /** Optional. Time to wait after cordoning the blue pool before draining the nodes. Defaults to 3 days. The value can be set between 0 and 7 days, inclusive. */
  waitForDrainDuration?: string;
}

export const AutoscaledRolloutPolicy: Schema.Schema<AutoscaledRolloutPolicy> = Schema.suspend(() => Schema.Struct({
  waitForDrainDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoscaledRolloutPolicy" }) as any as Schema.Schema<AutoscaledRolloutPolicy>;

export interface BlueGreenSettings {
  /** Standard policy for the blue-green upgrade. */
  standardRolloutPolicy?: StandardRolloutPolicy;
  /** Time needed after draining entire blue pool. After this period, blue pool will be cleaned up. */
  nodePoolSoakDuration?: string;
  /** Autoscaled policy for cluster autoscaler enabled blue-green upgrade. */
  autoscaledRolloutPolicy?: AutoscaledRolloutPolicy;
}

export const BlueGreenSettings: Schema.Schema<BlueGreenSettings> = Schema.suspend(() => Schema.Struct({
  standardRolloutPolicy: Schema.optional(StandardRolloutPolicy),
  nodePoolSoakDuration: Schema.optional(Schema.String),
  autoscaledRolloutPolicy: Schema.optional(AutoscaledRolloutPolicy),
})).annotate({ identifier: "BlueGreenSettings" }) as any as Schema.Schema<BlueGreenSettings>;

export interface UpgradeSettings {
  /** Update strategy of the node pool. */
  strategy?: "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED" | "BLUE_GREEN" | "SURGE" | "SHORT_LIVED" | (string & {});
  /** The maximum number of nodes that can be created beyond the current size of the node pool during the upgrade process. */
  maxSurge?: number;
  /** Settings for blue-green upgrade strategy. */
  blueGreenSettings?: BlueGreenSettings;
  /** The maximum number of nodes that can be simultaneously unavailable during the upgrade process. A node is considered available if its status is Ready. */
  maxUnavailable?: number;
}

export const UpgradeSettings: Schema.Schema<UpgradeSettings> = Schema.suspend(() => Schema.Struct({
  strategy: Schema.optional(Schema.String),
  maxSurge: Schema.optional(Schema.Number),
  blueGreenSettings: Schema.optional(BlueGreenSettings),
  maxUnavailable: Schema.optional(Schema.Number),
})).annotate({ identifier: "UpgradeSettings" }) as any as Schema.Schema<UpgradeSettings>;

export interface LoggingVariantConfig {
  /** Logging variant deployed on nodes. */
  variant?: "VARIANT_UNSPECIFIED" | "DEFAULT" | "MAX_THROUGHPUT" | (string & {});
}

export const LoggingVariantConfig: Schema.Schema<LoggingVariantConfig> = Schema.suspend(() => Schema.Struct({
  variant: Schema.optional(Schema.String),
})).annotate({ identifier: "LoggingVariantConfig" }) as any as Schema.Schema<LoggingVariantConfig>;

export interface NodePoolLoggingConfig {
  /** Logging variant configuration. */
  variantConfig?: LoggingVariantConfig;
}

export const NodePoolLoggingConfig: Schema.Schema<NodePoolLoggingConfig> = Schema.suspend(() => Schema.Struct({
  variantConfig: Schema.optional(LoggingVariantConfig),
})).annotate({ identifier: "NodePoolLoggingConfig" }) as any as Schema.Schema<NodePoolLoggingConfig>;

export interface GcfsConfig {
  /** Whether to use GCFS. */
  enabled?: boolean;
}

export const GcfsConfig: Schema.Schema<GcfsConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GcfsConfig" }) as any as Schema.Schema<GcfsConfig>;

export interface GCPSecretManagerCertificateConfig {
  /** Secret URI, in the form "projects/$PROJECT_ID/secrets/$SECRET_NAME/versions/$VERSION". Version can be fixed (e.g. "2") or "latest" */
  secretUri?: string;
}

export const GCPSecretManagerCertificateConfig: Schema.Schema<GCPSecretManagerCertificateConfig> = Schema.suspend(() => Schema.Struct({
  secretUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GCPSecretManagerCertificateConfig" }) as any as Schema.Schema<GCPSecretManagerCertificateConfig>;

export interface CertificateAuthorityDomainConfig {
  /** List of fully qualified domain names (FQDN). Specifying port is supported. Wildcards are NOT supported. Examples: - my.customdomain.com - 10.0.1.2:5000 */
  fqdns?: Array<string>;
  /** Secret Manager certificate configuration. */
  gcpSecretManagerCertificateConfig?: GCPSecretManagerCertificateConfig;
}

export const CertificateAuthorityDomainConfig: Schema.Schema<CertificateAuthorityDomainConfig> = Schema.suspend(() => Schema.Struct({
  fqdns: Schema.optional(Schema.Array(Schema.String)),
  gcpSecretManagerCertificateConfig: Schema.optional(GCPSecretManagerCertificateConfig),
})).annotate({ identifier: "CertificateAuthorityDomainConfig" }) as any as Schema.Schema<CertificateAuthorityDomainConfig>;

export interface PrivateRegistryAccessConfig {
  /** Private registry access configuration. */
  certificateAuthorityDomainConfig?: Array<CertificateAuthorityDomainConfig>;
  /** Private registry access is enabled. */
  enabled?: boolean;
}

export const PrivateRegistryAccessConfig: Schema.Schema<PrivateRegistryAccessConfig> = Schema.suspend(() => Schema.Struct({
  certificateAuthorityDomainConfig: Schema.optional(Schema.Array(CertificateAuthorityDomainConfig)),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PrivateRegistryAccessConfig" }) as any as Schema.Schema<PrivateRegistryAccessConfig>;

export interface WritableCgroups {
  /** Optional. Whether writable cgroups is enabled. */
  enabled?: boolean;
}

export const WritableCgroups: Schema.Schema<WritableCgroups> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WritableCgroups" }) as any as Schema.Schema<WritableCgroups>;

export interface CertificateConfig {
  /** The URI configures a secret from [Secret Manager](https://cloud.google.com/secret-manager) in the format "projects/$PROJECT_ID/secrets/$SECRET_NAME/versions/$VERSION" for global secret or "projects/$PROJECT_ID/locations/$REGION/secrets/$SECRET_NAME/versions/$VERSION" for regional secret. Version can be fixed (e.g. "2") or "latest" */
  gcpSecretManagerSecretUri?: string;
}

export const CertificateConfig: Schema.Schema<CertificateConfig> = Schema.suspend(() => Schema.Struct({
  gcpSecretManagerSecretUri: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateConfig" }) as any as Schema.Schema<CertificateConfig>;

export interface CertificateConfigPair {
  /** Key configures the client private key. Optional. */
  key?: CertificateConfig;
  /** Cert configures the client certificate. */
  cert?: CertificateConfig;
}

export const CertificateConfigPair: Schema.Schema<CertificateConfigPair> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(CertificateConfig),
  cert: Schema.optional(CertificateConfig),
})).annotate({ identifier: "CertificateConfigPair" }) as any as Schema.Schema<CertificateConfigPair>;

export interface RegistryHeader {
  /** Value configures the header value. */
  value?: Array<string>;
  /** Key configures the header key. */
  key?: string;
}

export const RegistryHeader: Schema.Schema<RegistryHeader> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.String)),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "RegistryHeader" }) as any as Schema.Schema<RegistryHeader>;

export interface HostConfig {
  /** Specifies the maximum duration allowed for a connection attempt to complete. A shorter timeout helps reduce delays when falling back to the original registry if the mirror is unreachable. Maximum allowed value is 180s. If not set, containerd sets default 30s. The value should be a decimal number of seconds with an `s` suffix. */
  dialTimeout?: string;
  /** CA configures the registry host certificate. */
  ca?: Array<CertificateConfig>;
  /** Client configures the registry host client certificate and key. */
  client?: Array<CertificateConfigPair>;
  /** Header configures the registry host headers. */
  header?: Array<RegistryHeader>;
  /** OverridePath is used to indicate the host's API root endpoint is defined in the URL path rather than by the API specification. This may be used with non-compliant OCI registries which are missing the /v2 prefix. If not set, containerd sets default false. */
  overridePath?: boolean;
  /** Host configures the registry host/mirror. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported. Wildcards are NOT supported. Examples: - my.customdomain.com - 10.0.1.2:5000 */
  host?: string;
  /** Capabilities represent the capabilities of the registry host, specifying what operations a host is capable of performing. If not set, containerd enables all capabilities by default. */
  capabilities?: Array<"HOST_CAPABILITY_UNSPECIFIED" | "HOST_CAPABILITY_PULL" | "HOST_CAPABILITY_RESOLVE" | "HOST_CAPABILITY_PUSH" | (string & {})>;
}

export const HostConfig: Schema.Schema<HostConfig> = Schema.suspend(() => Schema.Struct({
  dialTimeout: Schema.optional(Schema.String),
  ca: Schema.optional(Schema.Array(CertificateConfig)),
  client: Schema.optional(Schema.Array(CertificateConfigPair)),
  header: Schema.optional(Schema.Array(RegistryHeader)),
  overridePath: Schema.optional(Schema.Boolean),
  host: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HostConfig" }) as any as Schema.Schema<HostConfig>;

export interface RegistryHostConfig {
  /** Defines the host name of the registry server, which will be used to create configuration file as /etc/containerd/hosts.d//hosts.toml. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported. Wildcards are NOT supported. Examples: - my.customdomain.com - 10.0.1.2:5000 */
  server?: string;
  /** HostConfig configures a list of host-specific configurations for the server. Each server can have at most 10 host configurations. */
  hosts?: Array<HostConfig>;
}

export const RegistryHostConfig: Schema.Schema<RegistryHostConfig> = Schema.suspend(() => Schema.Struct({
  server: Schema.optional(Schema.String),
  hosts: Schema.optional(Schema.Array(HostConfig)),
})).annotate({ identifier: "RegistryHostConfig" }) as any as Schema.Schema<RegistryHostConfig>;

export interface ContainerdConfig {
  /** PrivateRegistryAccessConfig is used to configure access configuration for private container registries. */
  privateRegistryAccessConfig?: PrivateRegistryAccessConfig;
  /** Optional. WritableCgroups defines writable cgroups configuration for the node pool. */
  writableCgroups?: WritableCgroups;
  /** RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed. */
  registryHosts?: Array<RegistryHostConfig>;
}

export const ContainerdConfig: Schema.Schema<ContainerdConfig> = Schema.suspend(() => Schema.Struct({
  privateRegistryAccessConfig: Schema.optional(PrivateRegistryAccessConfig),
  writableCgroups: Schema.optional(WritableCgroups),
  registryHosts: Schema.optional(Schema.Array(RegistryHostConfig)),
})).annotate({ identifier: "ContainerdConfig" }) as any as Schema.Schema<ContainerdConfig>;

export interface OpportunisticMaintenanceStrategy {
  /** The amount of time that a node can remain idle (no customer owned workloads running), before triggering maintenance. */
  nodeIdleTimeWindow?: string;
  /** The minimum nodes required to be available in a pool. Blocks maintenance if it would cause the number of running nodes to dip below this value. */
  minNodesPerPool?: string;
  /** The window of time that opportunistic maintenance can run. Example: A setting of 14 days implies that opportunistic maintenance can only be ran in the 2 weeks leading up to the scheduled maintenance date. Setting 28 days allows opportunistic maintenance to run at any time in the scheduled maintenance window (all `PERIODIC` maintenance is set 28 days in advance). */
  maintenanceAvailabilityWindow?: string;
}

export const OpportunisticMaintenanceStrategy: Schema.Schema<OpportunisticMaintenanceStrategy> = Schema.suspend(() => Schema.Struct({
  nodeIdleTimeWindow: Schema.optional(Schema.String),
  minNodesPerPool: Schema.optional(Schema.String),
  maintenanceAvailabilityWindow: Schema.optional(Schema.String),
})).annotate({ identifier: "OpportunisticMaintenanceStrategy" }) as any as Schema.Schema<OpportunisticMaintenanceStrategy>;

export interface HostMaintenancePolicy {
  /** Specifies the frequency of planned maintenance events. */
  maintenanceInterval?: "MAINTENANCE_INTERVAL_UNSPECIFIED" | "AS_NEEDED" | "PERIODIC" | (string & {});
  /** Strategy that will trigger maintenance on behalf of the customer. */
  opportunisticMaintenanceStrategy?: OpportunisticMaintenanceStrategy;
}

export const HostMaintenancePolicy: Schema.Schema<HostMaintenancePolicy> = Schema.suspend(() => Schema.Struct({
  maintenanceInterval: Schema.optional(Schema.String),
  opportunisticMaintenanceStrategy: Schema.optional(OpportunisticMaintenanceStrategy),
})).annotate({ identifier: "HostMaintenancePolicy" }) as any as Schema.Schema<HostMaintenancePolicy>;

export interface TopologyManager {
  /** Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies). */
  policy?: string;
  /** The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes */
  scope?: string;
}

export const TopologyManager: Schema.Schema<TopologyManager> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "TopologyManager" }) as any as Schema.Schema<TopologyManager>;

export interface EvictionSignals {
  /** Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. Sample format: "30%". Must be >= 5%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  imagefsInodesFree?: string;
  /** Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node's memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  memoryAvailable?: string;
  /** Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  nodefsInodesFree?: string;
  /** Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Sample format: "30%". Must be >= 10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  nodefsAvailable?: string;
  /** Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Sample format: "30%". Must be >= 10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  pidAvailable?: string;
  /** Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Sample format: "30%". Must be >= 15%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  imagefsAvailable?: string;
}

export const EvictionSignals: Schema.Schema<EvictionSignals> = Schema.suspend(() => Schema.Struct({
  imagefsInodesFree: Schema.optional(Schema.String),
  memoryAvailable: Schema.optional(Schema.String),
  nodefsInodesFree: Schema.optional(Schema.String),
  nodefsAvailable: Schema.optional(Schema.String),
  pidAvailable: Schema.optional(Schema.String),
  imagefsAvailable: Schema.optional(Schema.String),
})).annotate({ identifier: "EvictionSignals" }) as any as Schema.Schema<EvictionSignals>;

export interface CrashLoopBackOffConfig {
  /** Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details. */
  maxContainerRestartPeriod?: string;
}

export const CrashLoopBackOffConfig: Schema.Schema<CrashLoopBackOffConfig> = Schema.suspend(() => Schema.Struct({
  maxContainerRestartPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "CrashLoopBackOffConfig" }) as any as Schema.Schema<CrashLoopBackOffConfig>;

export interface EvictionGracePeriod {
  /** Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  memoryAvailable?: string;
  /** Optional. Grace period for eviction due to pid available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  pidAvailable?: string;
  /** Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  imagefsAvailable?: string;
  /** Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  nodefsInodesFree?: string;
  /** Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  nodefsAvailable?: string;
  /** Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  imagefsInodesFree?: string;
}

export const EvictionGracePeriod: Schema.Schema<EvictionGracePeriod> = Schema.suspend(() => Schema.Struct({
  memoryAvailable: Schema.optional(Schema.String),
  pidAvailable: Schema.optional(Schema.String),
  imagefsAvailable: Schema.optional(Schema.String),
  nodefsInodesFree: Schema.optional(Schema.String),
  nodefsAvailable: Schema.optional(Schema.String),
  imagefsInodesFree: Schema.optional(Schema.String),
})).annotate({ identifier: "EvictionGracePeriod" }) as any as Schema.Schema<EvictionGracePeriod>;

export interface EvictionMinimumReclaim {
  /** Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  imagefsAvailable?: string;
  /** Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  pidAvailable?: string;
  /** Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  imagefsInodesFree?: string;
  /** Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  memoryAvailable?: string;
  /** Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  nodefsAvailable?: string;
  /** Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals */
  nodefsInodesFree?: string;
}

export const EvictionMinimumReclaim: Schema.Schema<EvictionMinimumReclaim> = Schema.suspend(() => Schema.Struct({
  imagefsAvailable: Schema.optional(Schema.String),
  pidAvailable: Schema.optional(Schema.String),
  imagefsInodesFree: Schema.optional(Schema.String),
  memoryAvailable: Schema.optional(Schema.String),
  nodefsAvailable: Schema.optional(Schema.String),
  nodefsInodesFree: Schema.optional(Schema.String),
})).annotate({ identifier: "EvictionMinimumReclaim" }) as any as Schema.Schema<EvictionMinimumReclaim>;

export interface MemoryManager {
  /** Controls the memory management policy on the Node. See https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#policies The following values are allowed. * "none" * "static" The default value is 'none' if unspecified. */
  policy?: string;
}

export const MemoryManager: Schema.Schema<MemoryManager> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Schema.String),
})).annotate({ identifier: "MemoryManager" }) as any as Schema.Schema<MemoryManager>;

export interface NodeKubeletConfig {
  /** Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified. */
  imageGcHighThresholdPercent?: number;
  /** Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group. */
  singleProcessOomKill?: boolean;
  /** Optional. Controls Topology Manager configuration on the node. For more information, see: https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/ */
  topologyManager?: TopologyManager;
  /** Optional. eviction_soft is a map of signal names to quantities that defines soft eviction thresholds. Each signal is compared to its corresponding threshold to determine if a pod eviction should occur. */
  evictionSoft?: EvictionSignals;
  /** Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified. */
  imageGcLowThresholdPercent?: number;
  /** Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details. */
  allowedUnsafeSysctls?: Array<string>;
  /** Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120. */
  shutdownGracePeriodSeconds?: number;
  /** Enable or disable Kubelet read only port. */
  insecureKubeletReadonlyPortEnabled?: boolean;
  /** Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is 'none' if unspecified. */
  cpuManagerPolicy?: string;
  /** Set the CPU CFS quota period value 'cpu.cfs_period_us'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive. */
  cpuCfsQuotaPeriod?: string;
  /** Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300]. */
  evictionMaxPodGracePeriodSeconds?: number;
  /** Optional. Contains configuration options to modify node-level parameters for container restart behavior. */
  crashLoopBackOff?: CrashLoopBackOffConfig;
  /** Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified. */
  cpuCfsQuota?: boolean;
  /** Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified. */
  imageMinimumGcAge?: string;
  /** Optional. eviction_soft_grace_period is a map of signal names to quantities that defines grace periods for each soft eviction signal. The grace period is the amount of time that a pod must be under pressure before an eviction occurs. */
  evictionSoftGracePeriod?: EvictionGracePeriod;
  /** Optional. eviction_minimum_reclaim is a map of signal names to quantities that defines minimum reclaims, which describe the minimum amount of a given resource the kubelet will reclaim when performing a pod eviction while that resource is under pressure. */
  evictionMinimumReclaim?: EvictionMinimumReclaim;
  /** Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified. */
  containerLogMaxSize?: string;
  /** Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120]. */
  shutdownGracePeriodCriticalPodsSeconds?: number;
  /** Optional. Controls NUMA-aware Memory Manager configuration on the node. For more information, see: https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/ */
  memoryManager?: MemoryManager;
  /** Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304. */
  podPidsLimit?: string;
  /** Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified. */
  containerLogMaxFiles?: number;
  /** Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won't be garbage collected based on being unused for too long. */
  imageMaximumGcAge?: string;
  /** Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details. */
  maxParallelImagePulls?: number;
}

export const NodeKubeletConfig: Schema.Schema<NodeKubeletConfig> = Schema.suspend(() => Schema.Struct({
  imageGcHighThresholdPercent: Schema.optional(Schema.Number),
  singleProcessOomKill: Schema.optional(Schema.Boolean),
  topologyManager: Schema.optional(TopologyManager),
  evictionSoft: Schema.optional(EvictionSignals),
  imageGcLowThresholdPercent: Schema.optional(Schema.Number),
  allowedUnsafeSysctls: Schema.optional(Schema.Array(Schema.String)),
  shutdownGracePeriodSeconds: Schema.optional(Schema.Number),
  insecureKubeletReadonlyPortEnabled: Schema.optional(Schema.Boolean),
  cpuManagerPolicy: Schema.optional(Schema.String),
  cpuCfsQuotaPeriod: Schema.optional(Schema.String),
  evictionMaxPodGracePeriodSeconds: Schema.optional(Schema.Number),
  crashLoopBackOff: Schema.optional(CrashLoopBackOffConfig),
  cpuCfsQuota: Schema.optional(Schema.Boolean),
  imageMinimumGcAge: Schema.optional(Schema.String),
  evictionSoftGracePeriod: Schema.optional(EvictionGracePeriod),
  evictionMinimumReclaim: Schema.optional(EvictionMinimumReclaim),
  containerLogMaxSize: Schema.optional(Schema.String),
  shutdownGracePeriodCriticalPodsSeconds: Schema.optional(Schema.Number),
  memoryManager: Schema.optional(MemoryManager),
  podPidsLimit: Schema.optional(Schema.String),
  containerLogMaxFiles: Schema.optional(Schema.Number),
  imageMaximumGcAge: Schema.optional(Schema.String),
  maxParallelImagePulls: Schema.optional(Schema.Number),
})).annotate({ identifier: "NodeKubeletConfig" }) as any as Schema.Schema<NodeKubeletConfig>;

export interface NodeConfigDefaults {
  /** Logging configuration for node pools. */
  loggingConfig?: NodePoolLoggingConfig;
  /** GCFS (Google Container File System, also known as Riptide) options. */
  gcfsConfig?: GcfsConfig;
  /** Parameters for containerd customization. */
  containerdConfig?: ContainerdConfig;
  /** HostMaintenancePolicy contains the desired maintenance policy for the Google Compute Engine hosts. */
  hostMaintenancePolicy?: HostMaintenancePolicy;
  /** NodeKubeletConfig controls the defaults for new node-pools. Currently only `insecure_kubelet_readonly_port_enabled` can be set here. */
  nodeKubeletConfig?: NodeKubeletConfig;
}

export const NodeConfigDefaults: Schema.Schema<NodeConfigDefaults> = Schema.suspend(() => Schema.Struct({
  loggingConfig: Schema.optional(NodePoolLoggingConfig),
  gcfsConfig: Schema.optional(GcfsConfig),
  containerdConfig: Schema.optional(ContainerdConfig),
  hostMaintenancePolicy: Schema.optional(HostMaintenancePolicy),
  nodeKubeletConfig: Schema.optional(NodeKubeletConfig),
})).annotate({ identifier: "NodeConfigDefaults" }) as any as Schema.Schema<NodeConfigDefaults>;

export interface NodePoolDefaults {
  /** Subset of NodeConfig message that has defaults. */
  nodeConfigDefaults?: NodeConfigDefaults;
}

export const NodePoolDefaults: Schema.Schema<NodePoolDefaults> = Schema.suspend(() => Schema.Struct({
  nodeConfigDefaults: Schema.optional(NodeConfigDefaults),
})).annotate({ identifier: "NodePoolDefaults" }) as any as Schema.Schema<NodePoolDefaults>;

export interface ParentProductConfig {
  /** Name of the parent product associated with the cluster. */
  productName?: string;
  /** Labels contain the configuration of the parent product. */
  labels?: Record<string, string>;
}

export const ParentProductConfig: Schema.Schema<ParentProductConfig> = Schema.suspend(() => Schema.Struct({
  productName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ParentProductConfig" }) as any as Schema.Schema<ParentProductConfig>;

export interface PrivateClusterMasterGlobalAccessConfig {
  /** Whenever master is accessible globally or not. */
  enabled?: boolean;
}

export const PrivateClusterMasterGlobalAccessConfig: Schema.Schema<PrivateClusterMasterGlobalAccessConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PrivateClusterMasterGlobalAccessConfig" }) as any as Schema.Schema<PrivateClusterMasterGlobalAccessConfig>;

export interface PrivateClusterConfig {
  /** Whether nodes have internal IP addresses only. If enabled, all nodes are given only RFC 1918 private addresses and communicate with the master via private networking. Deprecated: Use NetworkConfig.default_enable_private_nodes instead. */
  enablePrivateNodes?: boolean;
  /** Controls master global access settings. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_global_access instead. */
  masterGlobalAccessConfig?: PrivateClusterMasterGlobalAccessConfig;
  /** Output only. The peering name in the customer VPC used by this cluster. */
  peeringName?: string;
  /** Subnet to provision the master's private endpoint during cluster creation. Specified in projects/* /regions/* /subnetworks/* format. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint_subnetwork instead. */
  privateEndpointSubnetwork?: string;
  /** Whether the master's internal IP address is used as the cluster endpoint. Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true. */
  enablePrivateEndpoint?: boolean;
  /** Output only. The internal IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint instead. */
  privateEndpoint?: string;
  /** Output only. The external IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.public_endpoint instead. */
  publicEndpoint?: string;
  /** The IP range in CIDR notation to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network. */
  masterIpv4CidrBlock?: string;
}

export const PrivateClusterConfig: Schema.Schema<PrivateClusterConfig> = Schema.suspend(() => Schema.Struct({
  enablePrivateNodes: Schema.optional(Schema.Boolean),
  masterGlobalAccessConfig: Schema.optional(PrivateClusterMasterGlobalAccessConfig),
  peeringName: Schema.optional(Schema.String),
  privateEndpointSubnetwork: Schema.optional(Schema.String),
  enablePrivateEndpoint: Schema.optional(Schema.Boolean),
  privateEndpoint: Schema.optional(Schema.String),
  publicEndpoint: Schema.optional(Schema.String),
  masterIpv4CidrBlock: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateClusterConfig" }) as any as Schema.Schema<PrivateClusterConfig>;

export interface WorkloadALTSConfig {
  /** enable_alts controls whether the alts handshaker should be enabled or not for direct-path. Requires Workload Identity (workload_pool must be non-empty). */
  enableAlts?: boolean;
}

export const WorkloadALTSConfig: Schema.Schema<WorkloadALTSConfig> = Schema.suspend(() => Schema.Struct({
  enableAlts: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WorkloadALTSConfig" }) as any as Schema.Schema<WorkloadALTSConfig>;

export interface ConfidentialNodes {
  /** Whether Confidential Nodes feature is enabled. */
  enabled?: boolean;
  /** Defines the type of technology used by the confidential node. */
  confidentialInstanceType?: "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED" | "SEV" | "SEV_SNP" | "TDX" | (string & {});
}

export const ConfidentialNodes: Schema.Schema<ConfidentialNodes> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  confidentialInstanceType: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfidentialNodes" }) as any as Schema.Schema<ConfidentialNodes>;

export interface PodSecurityPolicyConfig {
  /** Enable the PodSecurityPolicy controller for this cluster. If enabled, pods must be valid under a PodSecurityPolicy to be created. */
  enabled?: boolean;
}

export const PodSecurityPolicyConfig: Schema.Schema<PodSecurityPolicyConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PodSecurityPolicyConfig" }) as any as Schema.Schema<PodSecurityPolicyConfig>;

export interface RotationConfig {
  /** Whether the rotation is enabled. */
  enabled?: boolean;
  /** The interval between two consecutive rotations. Default rotation interval is 2 minutes. */
  rotationInterval?: string;
}

export const RotationConfig: Schema.Schema<RotationConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  rotationInterval: Schema.optional(Schema.String),
})).annotate({ identifier: "RotationConfig" }) as any as Schema.Schema<RotationConfig>;

export interface SecretManagerConfig {
  /** Rotation config for secret manager. */
  rotationConfig?: RotationConfig;
  /** Enable/Disable Secret Manager Config. */
  enabled?: boolean;
}

export const SecretManagerConfig: Schema.Schema<SecretManagerConfig> = Schema.suspend(() => Schema.Struct({
  rotationConfig: Schema.optional(RotationConfig),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SecretManagerConfig" }) as any as Schema.Schema<SecretManagerConfig>;

export interface PolicyBinding {
  /** The relative resource name of the binauthz platform policy to evaluate. GKE platform policies have the following format: `projects/{project_number}/platforms/gke/policies/{policy_id}`. */
  name?: string;
}

export const PolicyBinding: Schema.Schema<PolicyBinding> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyBinding" }) as any as Schema.Schema<PolicyBinding>;

export interface BinaryAuthorization {
  /** Optional. Binauthz policies that apply to this cluster. */
  policyBindings?: Array<PolicyBinding>;
  /** This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored. */
  enabled?: boolean;
  /** Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED. */
  evaluationMode?: "EVALUATION_MODE_UNSPECIFIED" | "DISABLED" | "PROJECT_SINGLETON_POLICY_ENFORCE" | "POLICY_BINDINGS" | "POLICY_BINDINGS_AND_PROJECT_SINGLETON_POLICY_ENFORCE" | (string & {});
}

export const BinaryAuthorization: Schema.Schema<BinaryAuthorization> = Schema.suspend(() => Schema.Struct({
  policyBindings: Schema.optional(Schema.Array(PolicyBinding)),
  enabled: Schema.optional(Schema.Boolean),
  evaluationMode: Schema.optional(Schema.String),
})).annotate({ identifier: "BinaryAuthorization" }) as any as Schema.Schema<BinaryAuthorization>;

export interface Filter {
  /** Event types to allowlist. */
  eventType?: Array<"EVENT_TYPE_UNSPECIFIED" | "UPGRADE_AVAILABLE_EVENT" | "UPGRADE_EVENT" | "SECURITY_BULLETIN_EVENT" | "UPGRADE_INFO_EVENT" | (string & {})>;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface PubSub {
  /** The desired Pub/Sub topic to which notifications will be sent by GKE. Format is `projects/{project}/topics/{topic}`. */
  topic?: string;
  /** Enable notifications for Pub/Sub. */
  enabled?: boolean;
  /** Allows filtering to one or more specific event types. If no filter is specified, or if a filter is specified with no event types, all event types will be sent */
  filter?: Filter;
}

export const PubSub: Schema.Schema<PubSub> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  filter: Schema.optional(Filter),
})).annotate({ identifier: "PubSub" }) as any as Schema.Schema<PubSub>;

export interface NotificationConfig {
  /** Notification config for Pub/Sub. */
  pubsub?: PubSub;
}

export const NotificationConfig: Schema.Schema<NotificationConfig> = Schema.suspend(() => Schema.Struct({
  pubsub: Schema.optional(PubSub),
})).annotate({ identifier: "NotificationConfig" }) as any as Schema.Schema<NotificationConfig>;

export interface AnonymousAuthenticationConfig {
  /** Defines the mode of limiting anonymous access in the cluster. */
  mode?: "MODE_UNSPECIFIED" | "ENABLED" | "LIMITED" | (string & {});
}

export const AnonymousAuthenticationConfig: Schema.Schema<AnonymousAuthenticationConfig> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "AnonymousAuthenticationConfig" }) as any as Schema.Schema<AnonymousAuthenticationConfig>;

export interface AuthenticatorGroupsConfig {
  /** The name of the security group-of-groups to be used. Only relevant if enabled = true. */
  securityGroup?: string;
  /** Whether this cluster should return group membership lookups during authentication using a group of security groups. */
  enabled?: boolean;
}

export const AuthenticatorGroupsConfig: Schema.Schema<AuthenticatorGroupsConfig> = Schema.suspend(() => Schema.Struct({
  securityGroup: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AuthenticatorGroupsConfig" }) as any as Schema.Schema<AuthenticatorGroupsConfig>;

export interface NetworkTierConfig {
  /** Network tier configuration. */
  networkTier?: "NETWORK_TIER_UNSPECIFIED" | "NETWORK_TIER_DEFAULT" | "NETWORK_TIER_PREMIUM" | "NETWORK_TIER_STANDARD" | (string & {});
}

export const NetworkTierConfig: Schema.Schema<NetworkTierConfig> = Schema.suspend(() => Schema.Struct({
  networkTier: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkTierConfig" }) as any as Schema.Schema<NetworkTierConfig>;

export interface AutoIpamConfig {
  /** The flag that enables Auto IPAM on this cluster */
  enabled?: boolean;
}

export const AutoIpamConfig: Schema.Schema<AutoIpamConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AutoIpamConfig" }) as any as Schema.Schema<AutoIpamConfig>;

export interface PodCIDROverprovisionConfig {
  /** Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default. */
  disable?: boolean;
}

export const PodCIDROverprovisionConfig: Schema.Schema<PodCIDROverprovisionConfig> = Schema.suspend(() => Schema.Struct({
  disable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PodCIDROverprovisionConfig" }) as any as Schema.Schema<PodCIDROverprovisionConfig>;

export interface AdditionalIPRangesConfig {
  /** Draining status of the additional subnet. */
  status?: "STATUS_UNSPECIFIED" | "ACTIVE" | "DRAINING" | (string & {});
  /** Name of the subnetwork. This can be the full path of the subnetwork or just the name. Example1: my-subnet Example2: projects/gke-project/regions/us-central1/subnetworks/my-subnet */
  subnetwork?: string;
  /** List of secondary ranges names within this subnetwork that can be used for pod IPs. Example1: gke-pod-range1 Example2: gke-pod-range1,gke-pod-range2 */
  podIpv4RangeNames?: Array<string>;
}

export const AdditionalIPRangesConfig: Schema.Schema<AdditionalIPRangesConfig> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  podIpv4RangeNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdditionalIPRangesConfig" }) as any as Schema.Schema<AdditionalIPRangesConfig>;

export interface RangeInfo {
  /** Output only. Name of a range. */
  rangeName?: string;
  /** Output only. The utilization of the range. */
  utilization?: number;
}

export const RangeInfo: Schema.Schema<RangeInfo> = Schema.suspend(() => Schema.Struct({
  rangeName: Schema.optional(Schema.String),
  utilization: Schema.optional(Schema.Number),
})).annotate({ identifier: "RangeInfo" }) as any as Schema.Schema<RangeInfo>;

export interface AdditionalPodRangesConfig {
  /** Output only. Information for additional pod range. */
  podRangeInfo?: Array<RangeInfo>;
  /** Name for pod secondary ipv4 range which has the actual range defined ahead. */
  podRangeNames?: Array<string>;
}

export const AdditionalPodRangesConfig: Schema.Schema<AdditionalPodRangesConfig> = Schema.suspend(() => Schema.Struct({
  podRangeInfo: Schema.optional(Schema.Array(RangeInfo)),
  podRangeNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdditionalPodRangesConfig" }) as any as Schema.Schema<AdditionalPodRangesConfig>;

export interface IPAllocationPolicy {
  /** The IP address range of the services IPs in this cluster. If blank, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. */
  servicesIpv4CidrBlock?: string;
  /** This field is deprecated, use services_ipv4_cidr_block. */
  servicesIpv4Cidr?: string;
  /** Cluster-level network tier configuration is used to determine the default network tier for external IP addresses on cluster resources, such as node pools and load balancers. */
  networkTierConfig?: NetworkTierConfig;
  /** Whether a new subnetwork will be created automatically for the cluster. This field is only applicable when `use_ip_aliases` is true. */
  createSubnetwork?: boolean;
  /** The IP address range of the Cloud TPUs in this cluster. If unspecified, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. If unspecified, the range will use the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. This field is deprecated, use cluster.tpu_config.ipv4_cidr_block instead. */
  tpuIpv4CidrBlock?: string;
  /** If true, allow allocation of cluster CIDR ranges that overlap with certain kinds of network routes. By default we do not allow cluster CIDR ranges to intersect with any user declared routes. With allow_route_overlap == true, we allow overlapping with CIDR ranges that are larger than the cluster CIDR range. If this field is set to true, then cluster and services CIDRs must be fully-specified (e.g. `10.96.0.0/14`, but not `/14`), which means: 1) When `use_ip_aliases` is true, `cluster_ipv4_cidr_block` and `services_ipv4_cidr_block` must be fully-specified. 2) When `use_ip_aliases` is false, `cluster.cluster_ipv4_cidr` muse be fully-specified. */
  allowRouteOverlap?: boolean;
  /** IP stack type */
  stackType?: "STACK_TYPE_UNSPECIFIED" | "IPV4" | "IPV4_IPV6" | (string & {});
  /** This field is deprecated, use cluster_ipv4_cidr_block. */
  clusterIpv4Cidr?: string;
  /** Whether routes will be used for pod IPs in the cluster. This is used in conjunction with use_ip_aliases. It cannot be true if use_ip_aliases is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode */
  useRoutes?: boolean;
  /** Whether alias IPs will be used for pod IPs in the cluster. This is used in conjunction with use_routes. It cannot be true if use_routes is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode */
  useIpAliases?: boolean;
  /** Output only. The utilization of the cluster default IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode. */
  defaultPodIpv4RangeUtilization?: number;
  /** A custom subnetwork name to be used if `create_subnetwork` is true. If this field is empty, then an automatic name will be chosen for the new subnetwork. */
  subnetworkName?: string;
  /** This field is deprecated, use node_ipv4_cidr_block. */
  nodeIpv4Cidr?: string;
  /** Output only. The subnet's IPv6 CIDR block used by nodes and pods. */
  subnetIpv6CidrBlock?: string;
  /** Optional. AutoIpamConfig contains all information related to Auto IPAM */
  autoIpamConfig?: AutoIpamConfig;
  /** The name of the secondary range to be used as for the services CIDR block. The secondary range will be used for service ClusterIPs. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases and create_subnetwork is false. */
  servicesSecondaryRangeName?: string;
  /** [PRIVATE FIELD] Pod CIDR size overprovisioning config for the cluster. Pod CIDR size per node depends on max_pods_per_node. By default, the value of max_pods_per_node is doubled and then rounded off to next power of 2 to get the size of pod CIDR block per node. Example: max_pods_per_node of 30 would result in 64 IPs (/26). This config can disable the doubling of IPs (we still round off to next power of 2) Example: max_pods_per_node of 30 will result in 32 IPs (/27) when overprovisioning is disabled. */
  podCidrOverprovisionConfig?: PodCIDROverprovisionConfig;
  /** The name of the secondary range to be used for the cluster CIDR block. The secondary range will be used for pod IP addresses. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases and create_subnetwork is false. */
  clusterSecondaryRangeName?: string;
  /** Output only. The additional IP ranges that are added to the cluster. These IP ranges can be used by new node pools to allocate node and pod IPs automatically. Each AdditionalIPRangesConfig corresponds to a single subnetwork. Once a range is removed it will not show up in IPAllocationPolicy. */
  additionalIpRangesConfigs?: Array<AdditionalIPRangesConfig>;
  /** The IP address range of the instance IPs in this cluster. This is applicable only if `create_subnetwork` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. */
  nodeIpv4CidrBlock?: string;
  /** The ipv6 access type (internal or external) when create_subnetwork is true */
  ipv6AccessType?: "IPV6_ACCESS_TYPE_UNSPECIFIED" | "INTERNAL" | "EXTERNAL" | (string & {});
  /** Output only. The additional pod ranges that are added to the cluster. These pod ranges can be used by new node pools to allocate pod IPs automatically. Once the range is removed it will not show up in IPAllocationPolicy. */
  additionalPodRangesConfig?: AdditionalPodRangesConfig;
  /** Output only. The services IPv6 CIDR block for the cluster. */
  servicesIpv6CidrBlock?: string;
  /** The IP address range for the cluster pod IPs. If this field is set, then `cluster.cluster_ipv4_cidr` must be left blank. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. */
  clusterIpv4CidrBlock?: string;
}

export const IPAllocationPolicy: Schema.Schema<IPAllocationPolicy> = Schema.suspend(() => Schema.Struct({
  servicesIpv4CidrBlock: Schema.optional(Schema.String),
  servicesIpv4Cidr: Schema.optional(Schema.String),
  networkTierConfig: Schema.optional(NetworkTierConfig),
  createSubnetwork: Schema.optional(Schema.Boolean),
  tpuIpv4CidrBlock: Schema.optional(Schema.String),
  allowRouteOverlap: Schema.optional(Schema.Boolean),
  stackType: Schema.optional(Schema.String),
  clusterIpv4Cidr: Schema.optional(Schema.String),
  useRoutes: Schema.optional(Schema.Boolean),
  useIpAliases: Schema.optional(Schema.Boolean),
  defaultPodIpv4RangeUtilization: Schema.optional(Schema.Number),
  subnetworkName: Schema.optional(Schema.String),
  nodeIpv4Cidr: Schema.optional(Schema.String),
  subnetIpv6CidrBlock: Schema.optional(Schema.String),
  autoIpamConfig: Schema.optional(AutoIpamConfig),
  servicesSecondaryRangeName: Schema.optional(Schema.String),
  podCidrOverprovisionConfig: Schema.optional(PodCIDROverprovisionConfig),
  clusterSecondaryRangeName: Schema.optional(Schema.String),
  additionalIpRangesConfigs: Schema.optional(Schema.Array(AdditionalIPRangesConfig)),
  nodeIpv4CidrBlock: Schema.optional(Schema.String),
  ipv6AccessType: Schema.optional(Schema.String),
  additionalPodRangesConfig: Schema.optional(AdditionalPodRangesConfig),
  servicesIpv6CidrBlock: Schema.optional(Schema.String),
  clusterIpv4CidrBlock: Schema.optional(Schema.String),
})).annotate({ identifier: "IPAllocationPolicy" }) as any as Schema.Schema<IPAllocationPolicy>;

export interface K8sBetaAPIConfig {
  /** api name, e.g. storage.k8s.io/v1beta1/csistoragecapacities. */
  enabledApis?: Array<string>;
}

export const K8sBetaAPIConfig: Schema.Schema<K8sBetaAPIConfig> = Schema.suspend(() => Schema.Struct({
  enabledApis: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "K8sBetaAPIConfig" }) as any as Schema.Schema<K8sBetaAPIConfig>;

export interface RollbackSafeUpgrade {
  /** A user-defined period for the cluster remains in the rollbackable state. ex: {seconds: 21600}. */
  controlPlaneSoakDuration?: string;
}

export const RollbackSafeUpgrade: Schema.Schema<RollbackSafeUpgrade> = Schema.suspend(() => Schema.Struct({
  controlPlaneSoakDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackSafeUpgrade" }) as any as Schema.Schema<RollbackSafeUpgrade>;

export interface WorkloadConfig {
  /** Sets which mode of auditing should be used for the cluster's workloads. */
  auditMode?: "MODE_UNSPECIFIED" | "DISABLED" | "BASIC" | "BASELINE" | "RESTRICTED" | (string & {});
}

export const WorkloadConfig: Schema.Schema<WorkloadConfig> = Schema.suspend(() => Schema.Struct({
  auditMode: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadConfig" }) as any as Schema.Schema<WorkloadConfig>;

export interface ProtectConfig {
  /** Sets which mode to use for Protect workload vulnerability scanning feature. */
  workloadVulnerabilityMode?: "WORKLOAD_VULNERABILITY_MODE_UNSPECIFIED" | "DISABLED" | "BASIC" | (string & {});
  /** WorkloadConfig defines which actions are enabled for a cluster's workload configurations. */
  workloadConfig?: WorkloadConfig;
}

export const ProtectConfig: Schema.Schema<ProtectConfig> = Schema.suspend(() => Schema.Struct({
  workloadVulnerabilityMode: Schema.optional(Schema.String),
  workloadConfig: Schema.optional(WorkloadConfig),
})).annotate({ identifier: "ProtectConfig" }) as any as Schema.Schema<ProtectConfig>;

export interface ReleaseChannel {
  /** channel specifies which release channel the cluster is subscribed to. */
  channel?: "UNSPECIFIED" | "RAPID" | "REGULAR" | "STABLE" | "EXTENDED" | (string & {});
}

export const ReleaseChannel: Schema.Schema<ReleaseChannel> = Schema.suspend(() => Schema.Struct({
  channel: Schema.optional(Schema.String),
})).annotate({ identifier: "ReleaseChannel" }) as any as Schema.Schema<ReleaseChannel>;

export interface SyncRotationConfig {
  /** Whether the rotation is enabled. */
  enabled?: boolean;
  /** The interval between two consecutive rotations. Default rotation interval is 2 minutes. */
  rotationInterval?: string;
}

export const SyncRotationConfig: Schema.Schema<SyncRotationConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  rotationInterval: Schema.optional(Schema.String),
})).annotate({ identifier: "SyncRotationConfig" }) as any as Schema.Schema<SyncRotationConfig>;

export interface SecretSyncConfig {
  /** Rotation config for secret manager. */
  rotationConfig?: SyncRotationConfig;
  /** Enable/Disable Secret Sync Config. */
  enabled?: boolean;
}

export const SecretSyncConfig: Schema.Schema<SecretSyncConfig> = Schema.suspend(() => Schema.Struct({
  rotationConfig: Schema.optional(SyncRotationConfig),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SecretSyncConfig" }) as any as Schema.Schema<SecretSyncConfig>;

export interface CidrBlock {
  /** cidr_block must be specified in CIDR notation. */
  cidrBlock?: string;
  /** display_name is an optional field for users to identify CIDR blocks. */
  displayName?: string;
}

export const CidrBlock: Schema.Schema<CidrBlock> = Schema.suspend(() => Schema.Struct({
  cidrBlock: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "CidrBlock" }) as any as Schema.Schema<CidrBlock>;

export interface MasterAuthorizedNetworksConfig {
  /** Whether master authorized networks is enforced on private endpoint or not. */
  privateEndpointEnforcementEnabled?: boolean;
  /** Whether or not master authorized networks is enabled. */
  enabled?: boolean;
  /** cidr_blocks define up to 10 external networks that could access Kubernetes master through HTTPS. */
  cidrBlocks?: Array<CidrBlock>;
  /** Whether master is accessible via Google Compute Engine Public IP addresses. */
  gcpPublicCidrsAccessEnabled?: boolean;
}

export const MasterAuthorizedNetworksConfig: Schema.Schema<MasterAuthorizedNetworksConfig> = Schema.suspend(() => Schema.Struct({
  privateEndpointEnforcementEnabled: Schema.optional(Schema.Boolean),
  enabled: Schema.optional(Schema.Boolean),
  cidrBlocks: Schema.optional(Schema.Array(CidrBlock)),
  gcpPublicCidrsAccessEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MasterAuthorizedNetworksConfig" }) as any as Schema.Schema<MasterAuthorizedNetworksConfig>;

export interface IPEndpointsConfig {
  /** Controls whether the control plane allows access through a public IP. It is invalid to specify both PrivateClusterConfig.enablePrivateEndpoint and this field at the same time. */
  enablePublicEndpoint?: boolean;
  /** Controls whether to allow direct IP access. */
  enabled?: boolean;
  /** Subnet to provision the master's private endpoint during cluster creation. Specified in projects/* /regions/* /subnetworks/* format. It is invalid to specify both PrivateClusterConfig.privateEndpointSubnetwork and this field at the same time. */
  privateEndpointSubnetwork?: string;
  /** Controls whether the control plane's private endpoint is accessible from sources in other regions. It is invalid to specify both PrivateClusterMasterGlobalAccessConfig.enabled and this field at the same time. */
  globalAccess?: boolean;
  /** Configuration of authorized networks. If enabled, restricts access to the control plane based on source IP. It is invalid to specify both Cluster.masterAuthorizedNetworksConfig and this field at the same time. */
  authorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /** Output only. The external IP address of this cluster's control plane. Only populated if enabled. */
  publicEndpoint?: string;
  /** Output only. The internal IP address of this cluster's control plane. Only populated if enabled. */
  privateEndpoint?: string;
}

export const IPEndpointsConfig: Schema.Schema<IPEndpointsConfig> = Schema.suspend(() => Schema.Struct({
  enablePublicEndpoint: Schema.optional(Schema.Boolean),
  enabled: Schema.optional(Schema.Boolean),
  privateEndpointSubnetwork: Schema.optional(Schema.String),
  globalAccess: Schema.optional(Schema.Boolean),
  authorizedNetworksConfig: Schema.optional(MasterAuthorizedNetworksConfig),
  publicEndpoint: Schema.optional(Schema.String),
  privateEndpoint: Schema.optional(Schema.String),
})).annotate({ identifier: "IPEndpointsConfig" }) as any as Schema.Schema<IPEndpointsConfig>;

export interface DNSEndpointConfig {
  /** Output only. The cluster's DNS endpoint configuration. A DNS format address. This is accessible from the public internet. Ex: uid.us-central1.gke.goog. Always present, but the behavior may change according to the value of DNSEndpointConfig.allow_external_traffic. */
  endpoint?: string;
  /** Controls whether the k8s certs auth is allowed via DNS. */
  enableK8sCertsViaDns?: boolean;
  /** Controls whether user traffic is allowed over this endpoint. Note that Google-managed services may still use the endpoint even if this is false. */
  allowExternalTraffic?: boolean;
  /** Controls whether the k8s token auth is allowed via DNS. */
  enableK8sTokensViaDns?: boolean;
}

export const DNSEndpointConfig: Schema.Schema<DNSEndpointConfig> = Schema.suspend(() => Schema.Struct({
  endpoint: Schema.optional(Schema.String),
  enableK8sCertsViaDns: Schema.optional(Schema.Boolean),
  allowExternalTraffic: Schema.optional(Schema.Boolean),
  enableK8sTokensViaDns: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DNSEndpointConfig" }) as any as Schema.Schema<DNSEndpointConfig>;

export interface ControlPlaneEndpointsConfig {
  /** IP endpoints configuration. */
  ipEndpointsConfig?: IPEndpointsConfig;
  /** DNS endpoint configuration. */
  dnsEndpointConfig?: DNSEndpointConfig;
}

export const ControlPlaneEndpointsConfig: Schema.Schema<ControlPlaneEndpointsConfig> = Schema.suspend(() => Schema.Struct({
  ipEndpointsConfig: Schema.optional(IPEndpointsConfig),
  dnsEndpointConfig: Schema.optional(DNSEndpointConfig),
})).annotate({ identifier: "ControlPlaneEndpointsConfig" }) as any as Schema.Schema<ControlPlaneEndpointsConfig>;

export interface ClusterNetworkPerformanceConfig {
  /** Specifies the total network bandwidth tier for the NodePool. */
  totalEgressBandwidthTier?: "TIER_UNSPECIFIED" | "TIER_1" | (string & {});
}

export const ClusterNetworkPerformanceConfig: Schema.Schema<ClusterNetworkPerformanceConfig> = Schema.suspend(() => Schema.Struct({
  totalEgressBandwidthTier: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterNetworkPerformanceConfig" }) as any as Schema.Schema<ClusterNetworkPerformanceConfig>;

export interface DefaultSnatStatus {
  /** Disables cluster default sNAT rules. */
  disabled?: boolean;
}

export const DefaultSnatStatus: Schema.Schema<DefaultSnatStatus> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DefaultSnatStatus" }) as any as Schema.Schema<DefaultSnatStatus>;

export interface DNSConfig {
  /** cluster_dns indicates which in-cluster DNS provider should be used. */
  clusterDns?: "PROVIDER_UNSPECIFIED" | "PLATFORM_DEFAULT" | "CLOUD_DNS" | "KUBE_DNS" | (string & {});
  /** cluster_dns_scope indicates the scope of access to cluster DNS records. */
  clusterDnsScope?: "DNS_SCOPE_UNSPECIFIED" | "CLUSTER_SCOPE" | "VPC_SCOPE" | (string & {});
  /** cluster_dns_domain is the suffix used for all cluster service records. */
  clusterDnsDomain?: string;
  /** Optional. The domain used in Additive VPC scope. */
  additiveVpcScopeDnsDomain?: string;
}

export const DNSConfig: Schema.Schema<DNSConfig> = Schema.suspend(() => Schema.Struct({
  clusterDns: Schema.optional(Schema.String),
  clusterDnsScope: Schema.optional(Schema.String),
  clusterDnsDomain: Schema.optional(Schema.String),
  additiveVpcScopeDnsDomain: Schema.optional(Schema.String),
})).annotate({ identifier: "DNSConfig" }) as any as Schema.Schema<DNSConfig>;

export interface GatewayAPIConfig {
  /** The Gateway API release channel to use for Gateway API. */
  channel?: "CHANNEL_UNSPECIFIED" | "CHANNEL_DISABLED" | "CHANNEL_EXPERIMENTAL" | "CHANNEL_STANDARD" | (string & {});
}

export const GatewayAPIConfig: Schema.Schema<GatewayAPIConfig> = Schema.suspend(() => Schema.Struct({
  channel: Schema.optional(Schema.String),
})).annotate({ identifier: "GatewayAPIConfig" }) as any as Schema.Schema<GatewayAPIConfig>;

export interface ServiceExternalIPsConfig {
  /** Whether Services with ExternalIPs field are allowed or not. */
  enabled?: boolean;
}

export const ServiceExternalIPsConfig: Schema.Schema<ServiceExternalIPsConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ServiceExternalIPsConfig" }) as any as Schema.Schema<ServiceExternalIPsConfig>;

export interface NetworkConfig {
  /** Controls whether by default nodes have private IP addresses only. It is invalid to specify both PrivateClusterConfig.enablePrivateNodes and this field at the same time. To update the default setting, use ClusterUpdate.desired_default_enable_private_nodes */
  defaultEnablePrivateNodes?: boolean;
  /** Whether CiliumClusterWideNetworkPolicy is enabled on this cluster. */
  enableCiliumClusterwideNetworkPolicy?: boolean;
  /** The desired datapath provider for this cluster. By default, uses the IPTables-based kube-proxy implementation. */
  datapathProvider?: "DATAPATH_PROVIDER_UNSPECIFIED" | "LEGACY_DATAPATH" | "ADVANCED_DATAPATH" | (string & {});
  /** The desired state of IPv6 connectivity to Google Services. By default, no private IPv6 access to or from Google Services (all access will be via IPv4) */
  privateIpv6GoogleAccess?: "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED" | "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED" | "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE" | "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL" | (string & {});
  /** Specify the details of in-transit encryption. */
  inTransitEncryptionConfig?: "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED" | "IN_TRANSIT_ENCRYPTION_DISABLED" | "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT" | (string & {});
  /** Output only. The relative name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. Example: projects/my-project/global/networks/my-network */
  network?: string;
  /** Whether FQDN Network Policy is enabled on this cluster. */
  enableFqdnNetworkPolicy?: boolean;
  /** Network bandwidth tier configuration. */
  networkPerformanceConfig?: ClusterNetworkPerformanceConfig;
  /** Whether Intra-node visibility is enabled for this cluster. This makes same node pod to pod traffic visible for VPC network. */
  enableIntraNodeVisibility?: boolean;
  /** Whether multi-networking is enabled for this cluster. */
  enableMultiNetworking?: boolean;
  /** Whether L4ILB Subsetting is enabled for this cluster. */
  enableL4ilbSubsetting?: boolean;
  /** Disable L4 load balancer VPC firewalls to enable firewall policies. */
  disableL4LbFirewallReconciliation?: boolean;
  /** Output only. The relative name of the Google Compute Engine [subnetwork](https://cloud.google.com/compute/docs/vpc) to which the cluster is connected. Example: projects/my-project/regions/us-central1/subnetworks/my-subnet */
  subnetwork?: string;
  /** Whether the cluster disables default in-node sNAT rules. In-node sNAT rules will be disabled when default_snat_status is disabled. When disabled is set to false, default IP masquerade rules will be applied to the nodes to prevent sNAT on cluster internal traffic. */
  defaultSnatStatus?: DefaultSnatStatus;
  /** DNSConfig contains clusterDNS config for this cluster. */
  dnsConfig?: DNSConfig;
  /** GatewayAPIConfig contains the desired config of Gateway API on this cluster. */
  gatewayApiConfig?: GatewayAPIConfig;
  /** ServiceExternalIPsConfig specifies if services with externalIPs field are blocked or not. */
  serviceExternalIpsConfig?: ServiceExternalIPsConfig;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  defaultEnablePrivateNodes: Schema.optional(Schema.Boolean),
  enableCiliumClusterwideNetworkPolicy: Schema.optional(Schema.Boolean),
  datapathProvider: Schema.optional(Schema.String),
  privateIpv6GoogleAccess: Schema.optional(Schema.String),
  inTransitEncryptionConfig: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  enableFqdnNetworkPolicy: Schema.optional(Schema.Boolean),
  networkPerformanceConfig: Schema.optional(ClusterNetworkPerformanceConfig),
  enableIntraNodeVisibility: Schema.optional(Schema.Boolean),
  enableMultiNetworking: Schema.optional(Schema.Boolean),
  enableL4ilbSubsetting: Schema.optional(Schema.Boolean),
  disableL4LbFirewallReconciliation: Schema.optional(Schema.Boolean),
  subnetwork: Schema.optional(Schema.String),
  defaultSnatStatus: Schema.optional(DefaultSnatStatus),
  dnsConfig: Schema.optional(DNSConfig),
  gatewayApiConfig: Schema.optional(GatewayAPIConfig),
  serviceExternalIpsConfig: Schema.optional(ServiceExternalIPsConfig),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface AutopilotConversionStatus {
  /** Output only. The current state of the conversion. */
  state?: "STATE_UNSPECIFIED" | "DONE" | (string & {});
}

export const AutopilotConversionStatus: Schema.Schema<AutopilotConversionStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "AutopilotConversionStatus" }) as any as Schema.Schema<AutopilotConversionStatus>;

export interface PrivilegedAdmissionConfig {
  /** The customer allowlist Cloud Storage paths for the cluster. These paths are used with the `--autopilot-privileged-admission` flag to authorize privileged workloads in Autopilot clusters. Paths can be GKE-owned, in the format `gke:////`, or customer-owned, in the format `gs:///`. Wildcards (`*`) are supported to authorize all allowlists under specific paths or directories. Example: `gs://my-bucket/*` will authorize all allowlists under the `my-bucket` bucket. */
  allowlistPaths?: Array<string>;
}

export const PrivilegedAdmissionConfig: Schema.Schema<PrivilegedAdmissionConfig> = Schema.suspend(() => Schema.Struct({
  allowlistPaths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PrivilegedAdmissionConfig" }) as any as Schema.Schema<PrivilegedAdmissionConfig>;

export interface WorkloadPolicyConfig {
  /** If true, enables the GCW Auditor that audits workloads on standard clusters. */
  autopilotCompatibilityAuditingEnabled?: boolean;
  /** If true, workloads can use NET_ADMIN capability. */
  allowNetAdmin?: boolean;
}

export const WorkloadPolicyConfig: Schema.Schema<WorkloadPolicyConfig> = Schema.suspend(() => Schema.Struct({
  autopilotCompatibilityAuditingEnabled: Schema.optional(Schema.Boolean),
  allowNetAdmin: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WorkloadPolicyConfig" }) as any as Schema.Schema<WorkloadPolicyConfig>;

export interface Autopilot {
  /** Enable Autopilot */
  enabled?: boolean;
  /** Output only. ConversionStatus shows conversion status. */
  conversionStatus?: AutopilotConversionStatus;
  /** PrivilegedAdmissionConfig is the configuration related to privileged admission control. */
  privilegedAdmissionConfig?: PrivilegedAdmissionConfig;
  /** WorkloadPolicyConfig is the configuration related to GCW workload policy */
  workloadPolicyConfig?: WorkloadPolicyConfig;
}

export const Autopilot: Schema.Schema<Autopilot> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  conversionStatus: Schema.optional(AutopilotConversionStatus),
  privilegedAdmissionConfig: Schema.optional(PrivilegedAdmissionConfig),
  workloadPolicyConfig: Schema.optional(WorkloadPolicyConfig),
})).annotate({ identifier: "Autopilot" }) as any as Schema.Schema<Autopilot>;

export interface RBACBindingConfig {
  /** Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjets system:anonymous or system:unauthenticated. */
  enableInsecureBindingSystemUnauthenticated?: boolean;
  /** Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjects system:authenticated. */
  enableInsecureBindingSystemAuthenticated?: boolean;
}

export const RBACBindingConfig: Schema.Schema<RBACBindingConfig> = Schema.suspend(() => Schema.Struct({
  enableInsecureBindingSystemUnauthenticated: Schema.optional(Schema.Boolean),
  enableInsecureBindingSystemAuthenticated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RBACBindingConfig" }) as any as Schema.Schema<RBACBindingConfig>;

export interface LoggingComponentConfig {
  /** Select components to collect logs. An empty set would disable all logging. */
  enableComponents?: Array<"COMPONENT_UNSPECIFIED" | "SYSTEM_COMPONENTS" | "WORKLOADS" | "APISERVER" | "SCHEDULER" | "CONTROLLER_MANAGER" | "KCP_SSHD" | "KCP_CONNECTION" | "KCP_HPA" | (string & {})>;
}

export const LoggingComponentConfig: Schema.Schema<LoggingComponentConfig> = Schema.suspend(() => Schema.Struct({
  enableComponents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LoggingComponentConfig" }) as any as Schema.Schema<LoggingComponentConfig>;

export interface LoggingConfig {
  /** Logging components configuration */
  componentConfig?: LoggingComponentConfig;
}

export const LoggingConfig: Schema.Schema<LoggingConfig> = Schema.suspend(() => Schema.Struct({
  componentConfig: Schema.optional(LoggingComponentConfig),
})).annotate({ identifier: "LoggingConfig" }) as any as Schema.Schema<LoggingConfig>;

export interface WorkloadIdentityConfig {
  /** The workload pool to attach all Kubernetes service accounts to. */
  workloadPool?: string;
  /** identity provider is the third party identity provider. */
  identityProvider?: string;
  /** IAM Identity Namespace to attach all Kubernetes Service Accounts to. */
  identityNamespace?: string;
}

export const WorkloadIdentityConfig: Schema.Schema<WorkloadIdentityConfig> = Schema.suspend(() => Schema.Struct({
  workloadPool: Schema.optional(Schema.String),
  identityProvider: Schema.optional(Schema.String),
  identityNamespace: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadIdentityConfig" }) as any as Schema.Schema<WorkloadIdentityConfig>;

export interface ResourceManagerTags {
  /** Tags must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}` */
  tags?: Record<string, string>;
}

export const ResourceManagerTags: Schema.Schema<ResourceManagerTags> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ResourceManagerTags" }) as any as Schema.Schema<ResourceManagerTags>;

export interface FastSocket {
  /** Whether Fast Socket features are enabled in the node pool. */
  enabled?: boolean;
}

export const FastSocket: Schema.Schema<FastSocket> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FastSocket" }) as any as Schema.Schema<FastSocket>;

export interface BootDisk {
  /** Disk size in GB. Replaces NodeConfig.disk_size_gb */
  sizeGb?: string;
  /** Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.) */
  diskType?: string;
  /** For Hyperdisk-Balanced only, the provisioned IOPS config value. */
  provisionedIops?: string;
  /** For Hyperdisk-Balanced only, the provisioned throughput config value. */
  provisionedThroughput?: string;
}

export const BootDisk: Schema.Schema<BootDisk> = Schema.suspend(() => Schema.Struct({
  sizeGb: Schema.optional(Schema.String),
  diskType: Schema.optional(Schema.String),
  provisionedIops: Schema.optional(Schema.String),
  provisionedThroughput: Schema.optional(Schema.String),
})).annotate({ identifier: "BootDisk" }) as any as Schema.Schema<BootDisk>;

export interface EphemeralStorageLocalSsdConfig {
  /** Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info. */
  localSsdCount?: number;
  /** Number of local SSDs to use for GKE Data Cache. */
  dataCacheCount?: number;
}

export const EphemeralStorageLocalSsdConfig: Schema.Schema<EphemeralStorageLocalSsdConfig> = Schema.suspend(() => Schema.Struct({
  localSsdCount: Schema.optional(Schema.Number),
  dataCacheCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "EphemeralStorageLocalSsdConfig" }) as any as Schema.Schema<EphemeralStorageLocalSsdConfig>;

export interface NodeTaint {
  /** Effect for taint. */
  effect?: "EFFECT_UNSPECIFIED" | "NO_SCHEDULE" | "PREFER_NO_SCHEDULE" | "NO_EXECUTE" | (string & {});
  /** Value for taint. */
  value?: string;
  /** Key for taint. */
  key?: string;
}

export const NodeTaint: Schema.Schema<NodeTaint> = Schema.suspend(() => Schema.Struct({
  effect: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "NodeTaint" }) as any as Schema.Schema<NodeTaint>;

export interface SecondaryBootDiskUpdateStrategy {
}

export const SecondaryBootDiskUpdateStrategy: Schema.Schema<SecondaryBootDiskUpdateStrategy> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SecondaryBootDiskUpdateStrategy" }) as any as Schema.Schema<SecondaryBootDiskUpdateStrategy>;

export interface AdvancedMachineFeatures {
  /** The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed. */
  threadsPerCore?: string;
  /** Type of Performance Monitoring Unit (PMU) requested on node pool instances. If unset, PMU will not be available to the node. */
  performanceMonitoringUnit?: "PERFORMANCE_MONITORING_UNIT_UNSPECIFIED" | "ARCHITECTURAL" | "STANDARD" | "ENHANCED" | (string & {});
  /** Whether or not to enable nested virtualization (defaults to false). */
  enableNestedVirtualization?: boolean;
}

export const AdvancedMachineFeatures: Schema.Schema<AdvancedMachineFeatures> = Schema.suspend(() => Schema.Struct({
  threadsPerCore: Schema.optional(Schema.String),
  performanceMonitoringUnit: Schema.optional(Schema.String),
  enableNestedVirtualization: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdvancedMachineFeatures" }) as any as Schema.Schema<AdvancedMachineFeatures>;

export interface SandboxConfig {
  /** Type of the sandbox to use for the node. */
  type?: "UNSPECIFIED" | "GVISOR" | (string & {});
  /** Type of the sandbox to use for the node (e.g. 'gvisor') */
  sandboxType?: string;
}

export const SandboxConfig: Schema.Schema<SandboxConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  sandboxType: Schema.optional(Schema.String),
})).annotate({ identifier: "SandboxConfig" }) as any as Schema.Schema<SandboxConfig>;

export interface ShieldedInstanceConfig {
  /** Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails. */
  enableSecureBoot?: boolean;
  /** Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created. */
  enableIntegrityMonitoring?: boolean;
}

export const ShieldedInstanceConfig: Schema.Schema<ShieldedInstanceConfig> = Schema.suspend(() => Schema.Struct({
  enableSecureBoot: Schema.optional(Schema.Boolean),
  enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ShieldedInstanceConfig" }) as any as Schema.Schema<ShieldedInstanceConfig>;

export interface ReservationAffinity {
  /** Corresponds to the type of reservation consumption. */
  consumeReservationType?: "UNSPECIFIED" | "NO_RESERVATION" | "ANY_RESERVATION" | "SPECIFIC_RESERVATION" | (string & {});
  /** Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, specify "compute.googleapis.com/reservation-name" as the key and specify the name of your reservation as its value. */
  key?: string;
  /** Corresponds to the label value(s) of reservation resource(s). */
  values?: Array<string>;
}

export const ReservationAffinity: Schema.Schema<ReservationAffinity> = Schema.suspend(() => Schema.Struct({
  consumeReservationType: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ReservationAffinity" }) as any as Schema.Schema<ReservationAffinity>;

export interface GPUDirectConfig {
  /** The type of GPU direct strategy to enable on the node pool. */
  gpuDirectStrategy?: "GPU_DIRECT_STRATEGY_UNSPECIFIED" | "RDMA" | (string & {});
}

export const GPUDirectConfig: Schema.Schema<GPUDirectConfig> = Schema.suspend(() => Schema.Struct({
  gpuDirectStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "GPUDirectConfig" }) as any as Schema.Schema<GPUDirectConfig>;

export interface EphemeralStorageConfig {
  /** Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info. */
  localSsdCount?: number;
}

export const EphemeralStorageConfig: Schema.Schema<EphemeralStorageConfig> = Schema.suspend(() => Schema.Struct({
  localSsdCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "EphemeralStorageConfig" }) as any as Schema.Schema<EphemeralStorageConfig>;

export interface GPUDriverInstallationConfig {
  /** Mode for how the GPU driver is installed. */
  gpuDriverVersion?: "GPU_DRIVER_VERSION_UNSPECIFIED" | "INSTALLATION_DISABLED" | "DEFAULT" | "LATEST" | (string & {});
}

export const GPUDriverInstallationConfig: Schema.Schema<GPUDriverInstallationConfig> = Schema.suspend(() => Schema.Struct({
  gpuDriverVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GPUDriverInstallationConfig" }) as any as Schema.Schema<GPUDriverInstallationConfig>;

export interface AcceleratorConfig {
  /** The configuration for GPU sharing options. */
  gpuSharingConfig?: GPUSharingConfig;
  /** Size of partitions to create on the GPU. Valid values are described in the NVIDIA [mig user guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning). */
  gpuPartitionSize?: string;
  /** The number of the accelerator cards exposed to an instance. */
  acceleratorCount?: string;
  /** The configuration for auto installation of GPU driver. */
  gpuDriverInstallationConfig?: GPUDriverInstallationConfig;
  /** The accelerator type resource name. List of supported accelerators [here](https://cloud.google.com/compute/docs/gpus) */
  acceleratorType?: string;
  /** The number of time-shared GPU resources to expose for each physical GPU. */
  maxTimeSharedClientsPerGpu?: string;
}

export const AcceleratorConfig: Schema.Schema<AcceleratorConfig> = Schema.suspend(() => Schema.Struct({
  gpuSharingConfig: Schema.optional(GPUSharingConfig),
  gpuPartitionSize: Schema.optional(Schema.String),
  acceleratorCount: Schema.optional(Schema.String),
  gpuDriverInstallationConfig: Schema.optional(GPUDriverInstallationConfig),
  acceleratorType: Schema.optional(Schema.String),
  maxTimeSharedClientsPerGpu: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceleratorConfig" }) as any as Schema.Schema<AcceleratorConfig>;

export interface NodeKernelModuleLoading {
  /** Set the node module loading policy for nodes in the node pool. */
  policy?: "POLICY_UNSPECIFIED" | "ENFORCE_SIGNED_MODULES" | "DO_NOT_ENFORCE_SIGNED_MODULES" | (string & {});
}

export const NodeKernelModuleLoading: Schema.Schema<NodeKernelModuleLoading> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Schema.String),
})).annotate({ identifier: "NodeKernelModuleLoading" }) as any as Schema.Schema<NodeKernelModuleLoading>;

export interface DedicatedLocalSsdProfile {
  /** The number of physical local NVMe SSD disks to attach. */
  diskCount?: string;
}

export const DedicatedLocalSsdProfile: Schema.Schema<DedicatedLocalSsdProfile> = Schema.suspend(() => Schema.Struct({
  diskCount: Schema.optional(Schema.String),
})).annotate({ identifier: "DedicatedLocalSsdProfile" }) as any as Schema.Schema<DedicatedLocalSsdProfile>;

export interface EphemeralLocalSsdProfile {
  /** Specifies the size of the swap space as a percentage of the ephemeral local SSD capacity. */
  swapSizePercent?: number;
  /** Specifies the size of the swap space in gibibytes (GiB). */
  swapSizeGib?: string;
}

export const EphemeralLocalSsdProfile: Schema.Schema<EphemeralLocalSsdProfile> = Schema.suspend(() => Schema.Struct({
  swapSizePercent: Schema.optional(Schema.Number),
  swapSizeGib: Schema.optional(Schema.String),
})).annotate({ identifier: "EphemeralLocalSsdProfile" }) as any as Schema.Schema<EphemeralLocalSsdProfile>;

export interface BootDiskProfile {
  /** Specifies the size of the swap space as a percentage of the boot disk size. */
  swapSizePercent?: number;
  /** Specifies the size of the swap space in gibibytes (GiB). */
  swapSizeGib?: string;
}

export const BootDiskProfile: Schema.Schema<BootDiskProfile> = Schema.suspend(() => Schema.Struct({
  swapSizePercent: Schema.optional(Schema.Number),
  swapSizeGib: Schema.optional(Schema.String),
})).annotate({ identifier: "BootDiskProfile" }) as any as Schema.Schema<BootDiskProfile>;

export interface EncryptionConfig {
  /** Optional. If true, swap space will not be encrypted. Defaults to false (encrypted). */
  disabled?: boolean;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface SwapConfig {
  /** Provisions a new, separate local NVMe SSD exclusively for swap. */
  dedicatedLocalSsdProfile?: DedicatedLocalSsdProfile;
  /** Swap on the local SSD shared with pod ephemeral storage. */
  ephemeralLocalSsdProfile?: EphemeralLocalSsdProfile;
  /** Swap on the node's boot disk. */
  bootDiskProfile?: BootDiskProfile;
  /** Optional. Enables or disables swap for the node pool. */
  enabled?: boolean;
  /** Optional. If omitted, swap space is encrypted by default. */
  encryptionConfig?: EncryptionConfig;
}

export const SwapConfig: Schema.Schema<SwapConfig> = Schema.suspend(() => Schema.Struct({
  dedicatedLocalSsdProfile: Schema.optional(DedicatedLocalSsdProfile),
  ephemeralLocalSsdProfile: Schema.optional(EphemeralLocalSsdProfile),
  bootDiskProfile: Schema.optional(BootDiskProfile),
  enabled: Schema.optional(Schema.Boolean),
  encryptionConfig: Schema.optional(EncryptionConfig),
})).annotate({ identifier: "SwapConfig" }) as any as Schema.Schema<SwapConfig>;

export interface HugepagesConfig {
  /** Optional. Amount of 2M hugepages */
  hugepageSize2m?: number;
  /** Optional. Amount of 1G hugepages */
  hugepageSize1g?: number;
}

export const HugepagesConfig: Schema.Schema<HugepagesConfig> = Schema.suspend(() => Schema.Struct({
  hugepageSize2m: Schema.optional(Schema.Number),
  hugepageSize1g: Schema.optional(Schema.Number),
})).annotate({ identifier: "HugepagesConfig" }) as any as Schema.Schema<HugepagesConfig>;

export interface LinuxNodeConfig {
  /** Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details. */
  transparentHugepageDefrag?: "TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED" | "TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS" | "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER" | "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE" | "TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE" | "TRANSPARENT_HUGEPAGE_DEFRAG_NEVER" | (string & {});
  /** Optional. Configuration for kernel module loading on nodes. When enabled, the node pool will be provisioned with a Container-Optimized OS image that enforces kernel module signature verification. */
  nodeKernelModuleLoading?: NodeKernelModuleLoading;
  /** Optional. Enables and configures swap space on nodes. If omitted, swap is disabled. */
  swapConfig?: SwapConfig;
  /** cgroup_mode specifies the cgroup mode to be used on the node. */
  cgroupMode?: "CGROUP_MODE_UNSPECIFIED" | "CGROUP_MODE_V1" | "CGROUP_MODE_V2" | (string & {});
  /** The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes */
  sysctls?: Record<string, string>;
  /** Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details. */
  transparentHugepageEnabled?: "TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED" | "TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS" | "TRANSPARENT_HUGEPAGE_ENABLED_MADVISE" | "TRANSPARENT_HUGEPAGE_ENABLED_NEVER" | (string & {});
  /** Optional. Amounts for 2M and 1G hugepages */
  hugepages?: HugepagesConfig;
}

export const LinuxNodeConfig: Schema.Schema<LinuxNodeConfig> = Schema.suspend(() => Schema.Struct({
  transparentHugepageDefrag: Schema.optional(Schema.String),
  nodeKernelModuleLoading: Schema.optional(NodeKernelModuleLoading),
  swapConfig: Schema.optional(SwapConfig),
  cgroupMode: Schema.optional(Schema.String),
  sysctls: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  transparentHugepageEnabled: Schema.optional(Schema.String),
  hugepages: Schema.optional(HugepagesConfig),
})).annotate({ identifier: "LinuxNodeConfig" }) as any as Schema.Schema<LinuxNodeConfig>;

export interface SecondaryBootDisk {
  /** Fully-qualified resource ID for an existing disk image. */
  diskImage?: string;
  /** Disk mode (container image cache, etc.) */
  mode?: "MODE_UNSPECIFIED" | "CONTAINER_IMAGE_CACHE" | (string & {});
}

export const SecondaryBootDisk: Schema.Schema<SecondaryBootDisk> = Schema.suspend(() => Schema.Struct({
  diskImage: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "SecondaryBootDisk" }) as any as Schema.Schema<SecondaryBootDisk>;

export interface WorkloadMetadataConfig {
  /** NodeMetadata is the configuration for how to expose metadata to the workloads running on the node. */
  nodeMetadata?: "UNSPECIFIED" | "SECURE" | "EXPOSE" | "GKE_METADATA_SERVER" | (string & {});
  /** Mode is the configuration for how to expose metadata to workloads running on the node pool. */
  mode?: "MODE_UNSPECIFIED" | "GCE_METADATA" | "GKE_METADATA" | (string & {});
}

export const WorkloadMetadataConfig: Schema.Schema<WorkloadMetadataConfig> = Schema.suspend(() => Schema.Struct({
  nodeMetadata: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadMetadataConfig" }) as any as Schema.Schema<WorkloadMetadataConfig>;

export interface NodeAffinity {
  /** Key for NodeAffinity. */
  key?: string;
  /** Values for NodeAffinity. */
  values?: Array<string>;
  /** Operator for NodeAffinity. */
  operator?: "OPERATOR_UNSPECIFIED" | "IN" | "NOT_IN" | (string & {});
}

export const NodeAffinity: Schema.Schema<NodeAffinity> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
  operator: Schema.optional(Schema.String),
})).annotate({ identifier: "NodeAffinity" }) as any as Schema.Schema<NodeAffinity>;

export interface SoleTenantConfig {
  /** NodeAffinities used to match to a shared sole tenant node group. */
  nodeAffinities?: Array<NodeAffinity>;
  /** Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. This field can only be set if the node pool is created in a shared sole-tenant node group. */
  minNodeCpus?: number;
}

export const SoleTenantConfig: Schema.Schema<SoleTenantConfig> = Schema.suspend(() => Schema.Struct({
  nodeAffinities: Schema.optional(Schema.Array(NodeAffinity)),
  minNodeCpus: Schema.optional(Schema.Number),
})).annotate({ identifier: "SoleTenantConfig" }) as any as Schema.Schema<SoleTenantConfig>;

export interface VirtualNIC {
  /** Whether gVNIC features are enabled in the node pool. */
  enabled?: boolean;
}

export const VirtualNIC: Schema.Schema<VirtualNIC> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "VirtualNIC" }) as any as Schema.Schema<VirtualNIC>;

export interface WindowsNodeConfig {
  /** OSVersion specifies the Windows node config to be used on the node. */
  osVersion?: "OS_VERSION_UNSPECIFIED" | "OS_VERSION_LTSC2019" | "OS_VERSION_LTSC2022" | (string & {});
}

export const WindowsNodeConfig: Schema.Schema<WindowsNodeConfig> = Schema.suspend(() => Schema.Struct({
  osVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsNodeConfig" }) as any as Schema.Schema<WindowsNodeConfig>;

export interface NodeConfig {
  /** A map of resource manager tag keys and values to be attached to the nodes. */
  resourceManagerTags?: ResourceManagerTags;
  /** Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). */
  minCpuPlatform?: string;
  /** Specifies which method should be used for encrypting the Local SSDs attached to the node. */
  localSsdEncryptionMode?: "LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED" | "STANDARD_ENCRYPTION" | "EPHEMERAL_KEY_ENCRYPTION" | (string & {});
  /** Enable or disable NCCL fast socket for the node pool. */
  fastSocket?: FastSocket;
  /** GCFS (Google Container File System) configs. */
  gcfsConfig?: GcfsConfig;
  /** Logging configuration. */
  loggingConfig?: NodePoolLoggingConfig;
  /** Confidential nodes config. All the nodes in the node pool will be Confidential VM once enabled. */
  confidentialNodes?: ConfidentialNodes;
  /** Parameters for using raw-block Local NVMe SSDs. */
  localNvmeSsdBlockConfig?: LocalNvmeSsdBlockConfig;
  /** HostMaintenancePolicy contains the desired maintenance policy for the Google Compute Engine hosts. */
  hostMaintenancePolicy?: HostMaintenancePolicy;
  /** Boot disk configuration for the node pool. */
  bootDisk?: BootDisk;
  /** Parameters for the node ephemeral storage using Local SSDs. If unspecified, ephemeral storage is backed by the boot disk. This field is functionally equivalent to the ephemeral_storage_config */
  ephemeralStorageLocalSsdConfig?: EphemeralStorageLocalSsdConfig;
  /** List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/ */
  taints?: Array<NodeTaint>;
  /** The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types. */
  imageType?: string;
  /** Output only. effective_cgroup_mode is the cgroup mode actually used by the node pool. It is determined by the cgroup mode specified in the LinuxNodeConfig or the default cgroup mode based on the cluster creation version. */
  effectiveCgroupMode?: "EFFECTIVE_CGROUP_MODE_UNSPECIFIED" | "EFFECTIVE_CGROUP_MODE_V1" | "EFFECTIVE_CGROUP_MODE_V2" | (string & {});
  /** The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035. */
  tags?: Array<string>;
  /** Parameters for containerd customization. */
  containerdConfig?: ContainerdConfig;
  /** The map of Kubernetes labels (key/value pairs) to be applied to each node. These will added in addition to any default label(s) that Kubernetes may apply to the node. In case of conflict in label keys, the applied set may differ depending on the Kubernetes version -- it's best to assume the behavior is undefined and conflicts should be avoided. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/ */
  labels?: Record<string, string>;
  /** Secondary boot disk update strategy. */
  secondaryBootDiskUpdateStrategy?: SecondaryBootDiskUpdateStrategy;
  /** Advanced features for the Compute Engine VM. */
  advancedMachineFeatures?: AdvancedMachineFeatures;
  /** Sandbox configuration for this node. */
  sandboxConfig?: SandboxConfig;
  /** The name of a Google Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-types). If unspecified, the default machine type is `e2-medium`. */
  machineType?: string;
  /** Shielded Instance options. */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /** Optional. Reserved for future use. */
  enableConfidentialStorage?: boolean;
  /** Flex Start flag for enabling Flex Start VM. */
  flexStart?: boolean;
  /** The optional reservation affinity. Setting this field will apply the specified [Zonal Compute Reservation](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) to this node pool. */
  reservationAffinity?: ReservationAffinity;
  /** List of Storage Pools where boot disks are provisioned. */
  storagePools?: Array<string>;
  /** The configuration for GPU Direct */
  gpuDirectConfig?: GPUDirectConfig;
  /** Parameters for the ephemeral storage filesystem. If unspecified, ephemeral storage is backed by the boot disk. */
  ephemeralStorageConfig?: EphemeralStorageConfig;
  /** A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs. */
  accelerators?: Array<AcceleratorConfig>;
  /** The number of local SSD disks to be attached to the node. The limit for this value is dependent upon the maximum number of disks available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. */
  localSsdCount?: number;
  /** Parameters that can be configured on Linux nodes. */
  linuxNodeConfig?: LinuxNodeConfig;
  /** The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used. */
  serviceAccount?: string;
  /** Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard' */
  diskType?: string;
  /** The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-oslogin" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value's size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB. */
  metadata?: Record<string, string>;
  /** The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely. */
  maxRunDuration?: string;
  /** The resource labels for the node pool to use to annotate any related Google Compute Engine resources. */
  resourceLabels?: Record<string, string>;
  /** List of secondary boot disks attached to the nodes. */
  secondaryBootDisks?: Array<SecondaryBootDisk>;
  /** The workload metadata configuration for this node. */
  workloadMetadataConfig?: WorkloadMetadataConfig;
  /** Parameters for node pools to be backed by shared sole tenant node groups. */
  soleTenantConfig?: SoleTenantConfig;
  /** Node kubelet configs. */
  kubeletConfig?: NodeKubeletConfig;
  /** Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances. */
  preemptible?: boolean;
  /** The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: * `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. * `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with **gcr.io** (the [Artifact Registry](https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added. */
  oauthScopes?: Array<string>;
  /** Enable or disable gvnic on the node pool. */
  gvnic?: VirtualNIC;
  /** Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile. */
  consolidationDelay?: string;
  /** Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag. */
  spot?: boolean;
  /** Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on [sole tenant nodes](https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes). */
  nodeGroup?: string;
  /** Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB. */
  diskSizeGb?: number;
  /** Parameters that can be configured on Windows nodes. */
  windowsNodeConfig?: WindowsNodeConfig;
  /** The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption */
  bootDiskKmsKey?: string;
}

export const NodeConfig: Schema.Schema<NodeConfig> = Schema.suspend(() => Schema.Struct({
  resourceManagerTags: Schema.optional(ResourceManagerTags),
  minCpuPlatform: Schema.optional(Schema.String),
  localSsdEncryptionMode: Schema.optional(Schema.String),
  fastSocket: Schema.optional(FastSocket),
  gcfsConfig: Schema.optional(GcfsConfig),
  loggingConfig: Schema.optional(NodePoolLoggingConfig),
  confidentialNodes: Schema.optional(ConfidentialNodes),
  localNvmeSsdBlockConfig: Schema.optional(LocalNvmeSsdBlockConfig),
  hostMaintenancePolicy: Schema.optional(HostMaintenancePolicy),
  bootDisk: Schema.optional(BootDisk),
  ephemeralStorageLocalSsdConfig: Schema.optional(EphemeralStorageLocalSsdConfig),
  taints: Schema.optional(Schema.Array(NodeTaint)),
  imageType: Schema.optional(Schema.String),
  effectiveCgroupMode: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  containerdConfig: Schema.optional(ContainerdConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  secondaryBootDiskUpdateStrategy: Schema.optional(SecondaryBootDiskUpdateStrategy),
  advancedMachineFeatures: Schema.optional(AdvancedMachineFeatures),
  sandboxConfig: Schema.optional(SandboxConfig),
  machineType: Schema.optional(Schema.String),
  shieldedInstanceConfig: Schema.optional(ShieldedInstanceConfig),
  enableConfidentialStorage: Schema.optional(Schema.Boolean),
  flexStart: Schema.optional(Schema.Boolean),
  reservationAffinity: Schema.optional(ReservationAffinity),
  storagePools: Schema.optional(Schema.Array(Schema.String)),
  gpuDirectConfig: Schema.optional(GPUDirectConfig),
  ephemeralStorageConfig: Schema.optional(EphemeralStorageConfig),
  accelerators: Schema.optional(Schema.Array(AcceleratorConfig)),
  localSsdCount: Schema.optional(Schema.Number),
  linuxNodeConfig: Schema.optional(LinuxNodeConfig),
  serviceAccount: Schema.optional(Schema.String),
  diskType: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maxRunDuration: Schema.optional(Schema.String),
  resourceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  secondaryBootDisks: Schema.optional(Schema.Array(SecondaryBootDisk)),
  workloadMetadataConfig: Schema.optional(WorkloadMetadataConfig),
  soleTenantConfig: Schema.optional(SoleTenantConfig),
  kubeletConfig: Schema.optional(NodeKubeletConfig),
  preemptible: Schema.optional(Schema.Boolean),
  oauthScopes: Schema.optional(Schema.Array(Schema.String)),
  gvnic: Schema.optional(VirtualNIC),
  consolidationDelay: Schema.optional(Schema.String),
  spot: Schema.optional(Schema.Boolean),
  nodeGroup: Schema.optional(Schema.String),
  diskSizeGb: Schema.optional(Schema.Number),
  windowsNodeConfig: Schema.optional(WindowsNodeConfig),
  bootDiskKmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "NodeConfig" }) as any as Schema.Schema<NodeConfig>;

export interface ConsumptionMeteringConfig {
  /** Whether to enable consumption metering for this cluster. If enabled, a second BigQuery table will be created to hold resource consumption records. */
  enabled?: boolean;
}

export const ConsumptionMeteringConfig: Schema.Schema<ConsumptionMeteringConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConsumptionMeteringConfig" }) as any as Schema.Schema<ConsumptionMeteringConfig>;

export interface BigQueryDestination {
  /** The ID of a BigQuery Dataset. */
  datasetId?: string;
}

export const BigQueryDestination: Schema.Schema<BigQueryDestination> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryDestination" }) as any as Schema.Schema<BigQueryDestination>;

export interface ResourceUsageExportConfig {
  /** Whether to enable network egress metering for this cluster. If enabled, a daemonset will be created in the cluster to meter network egress traffic. */
  enableNetworkEgressMetering?: boolean;
  /** Configuration to enable resource consumption metering. */
  consumptionMeteringConfig?: ConsumptionMeteringConfig;
  /** Configuration to use BigQuery as usage export destination. */
  bigqueryDestination?: BigQueryDestination;
}

export const ResourceUsageExportConfig: Schema.Schema<ResourceUsageExportConfig> = Schema.suspend(() => Schema.Struct({
  enableNetworkEgressMetering: Schema.optional(Schema.Boolean),
  consumptionMeteringConfig: Schema.optional(ConsumptionMeteringConfig),
  bigqueryDestination: Schema.optional(BigQueryDestination),
})).annotate({ identifier: "ResourceUsageExportConfig" }) as any as Schema.Schema<ResourceUsageExportConfig>;

export interface WorkloadCertificates {
  /** enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty). */
  enableCertificates?: boolean;
}

export const WorkloadCertificates: Schema.Schema<WorkloadCertificates> = Schema.suspend(() => Schema.Struct({
  enableCertificates: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WorkloadCertificates" }) as any as Schema.Schema<WorkloadCertificates>;

export interface StatusCondition {
  /** Human-friendly representation of the condition */
  message?: string;
  /** Canonical code of the condition. */
  canonicalCode?: "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS" | (string & {});
  /** Machine-friendly representation of the condition Deprecated. Use canonical_code instead. */
  code?: "UNKNOWN" | "GCE_STOCKOUT" | "GKE_SERVICE_ACCOUNT_DELETED" | "GCE_QUOTA_EXCEEDED" | "SET_BY_OPERATOR" | "CLOUD_KMS_KEY_ERROR" | "CA_EXPIRING" | "NODE_SERVICE_ACCOUNT_MISSING_PERMISSIONS" | "CLOUD_KMS_KEY_DESTROYED" | (string & {});
}

export const StatusCondition: Schema.Schema<StatusCondition> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  canonicalCode: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "StatusCondition" }) as any as Schema.Schema<StatusCondition>;

export interface PodSnapshotConfig {
  /** Whether or not the Pod Snapshots feature is enabled. */
  enabled?: boolean;
}

export const PodSnapshotConfig: Schema.Schema<PodSnapshotConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PodSnapshotConfig" }) as any as Schema.Schema<PodSnapshotConfig>;

export interface GcsFuseCsiDriverConfig {
  /** Whether the Cloud Storage Fuse CSI driver is enabled for this cluster. */
  enabled?: boolean;
}

export const GcsFuseCsiDriverConfig: Schema.Schema<GcsFuseCsiDriverConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GcsFuseCsiDriverConfig" }) as any as Schema.Schema<GcsFuseCsiDriverConfig>;

export interface ParallelstoreCsiDriverConfig {
  /** Whether the Cloud Storage Parallelstore CSI driver is enabled for this cluster. */
  enabled?: boolean;
}

export const ParallelstoreCsiDriverConfig: Schema.Schema<ParallelstoreCsiDriverConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ParallelstoreCsiDriverConfig" }) as any as Schema.Schema<ParallelstoreCsiDriverConfig>;

export interface CloudRunConfig {
  /** Whether Cloud Run addon is enabled for this cluster. */
  disabled?: boolean;
  /** Which load balancer type is installed for Cloud Run. */
  loadBalancerType?: "LOAD_BALANCER_TYPE_UNSPECIFIED" | "LOAD_BALANCER_TYPE_EXTERNAL" | "LOAD_BALANCER_TYPE_INTERNAL" | (string & {});
}

export const CloudRunConfig: Schema.Schema<CloudRunConfig> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
  loadBalancerType: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRunConfig" }) as any as Schema.Schema<CloudRunConfig>;

export interface HttpLoadBalancing {
  /** Whether the HTTP Load Balancing controller is enabled in the cluster. When enabled, it runs a small pod in the cluster that manages the load balancers. */
  disabled?: boolean;
}

export const HttpLoadBalancing: Schema.Schema<HttpLoadBalancing> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HttpLoadBalancing" }) as any as Schema.Schema<HttpLoadBalancing>;

export interface KalmConfig {
  /** Whether KALM is enabled for this cluster. */
  enabled?: boolean;
}

export const KalmConfig: Schema.Schema<KalmConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KalmConfig" }) as any as Schema.Schema<KalmConfig>;

export interface HorizontalPodAutoscaling {
  /** Whether the Horizontal Pod Autoscaling feature is enabled in the cluster. When enabled, it ensures that metrics are collected into Stackdriver Monitoring. */
  disabled?: boolean;
}

export const HorizontalPodAutoscaling: Schema.Schema<HorizontalPodAutoscaling> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HorizontalPodAutoscaling" }) as any as Schema.Schema<HorizontalPodAutoscaling>;

export interface DnsCacheConfig {
  /** Whether NodeLocal DNSCache is enabled for this cluster. */
  enabled?: boolean;
}

export const DnsCacheConfig: Schema.Schema<DnsCacheConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DnsCacheConfig" }) as any as Schema.Schema<DnsCacheConfig>;

export interface GcePersistentDiskCsiDriverConfig {
  /** Whether the Compute Engine PD CSI driver is enabled for this cluster. */
  enabled?: boolean;
}

export const GcePersistentDiskCsiDriverConfig: Schema.Schema<GcePersistentDiskCsiDriverConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GcePersistentDiskCsiDriverConfig" }) as any as Schema.Schema<GcePersistentDiskCsiDriverConfig>;

export interface GkeBackupAgentConfig {
  /** Whether the Backup for GKE agent is enabled for this cluster. */
  enabled?: boolean;
}

export const GkeBackupAgentConfig: Schema.Schema<GkeBackupAgentConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GkeBackupAgentConfig" }) as any as Schema.Schema<GkeBackupAgentConfig>;

export interface KubernetesDashboard {
  /** Whether the Kubernetes Dashboard is enabled for this cluster. */
  disabled?: boolean;
}

export const KubernetesDashboard: Schema.Schema<KubernetesDashboard> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KubernetesDashboard" }) as any as Schema.Schema<KubernetesDashboard>;

export interface LustreCsiDriverConfig {
  /** If set to true, the Lustre CSI driver will install Lustre kernel modules using port 6988. This serves as a workaround for a port conflict with the gke-metadata-server. This field is required ONLY under the following conditions: 1. The GKE node version is older than 1.33.2-gke.4655000. 2. You're connecting to a Lustre instance that has the 'gke-support-enabled' flag. Deprecated: This flag is no longer required as of GKE node version 1.33.2-gke.4655000, unless you are connecting to a Lustre instance that has the `gke-support-enabled` flag. */
  enableLegacyLustrePort?: boolean;
  /** Whether the Lustre CSI driver is enabled for this cluster. */
  enabled?: boolean;
}

export const LustreCsiDriverConfig: Schema.Schema<LustreCsiDriverConfig> = Schema.suspend(() => Schema.Struct({
  enableLegacyLustrePort: Schema.optional(Schema.Boolean),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LustreCsiDriverConfig" }) as any as Schema.Schema<LustreCsiDriverConfig>;

export interface GcpFilestoreCsiDriverConfig {
  /** Whether the Filestore CSI driver is enabled for this cluster. */
  enabled?: boolean;
}

export const GcpFilestoreCsiDriverConfig: Schema.Schema<GcpFilestoreCsiDriverConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GcpFilestoreCsiDriverConfig" }) as any as Schema.Schema<GcpFilestoreCsiDriverConfig>;

export interface StatefulHAConfig {
  /** Whether the Stateful HA add-on is enabled for this cluster. */
  enabled?: boolean;
}

export const StatefulHAConfig: Schema.Schema<StatefulHAConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StatefulHAConfig" }) as any as Schema.Schema<StatefulHAConfig>;

export interface NetworkPolicyConfig {
  /** Whether NetworkPolicy is enabled for this cluster. */
  disabled?: boolean;
}

export const NetworkPolicyConfig: Schema.Schema<NetworkPolicyConfig> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NetworkPolicyConfig" }) as any as Schema.Schema<NetworkPolicyConfig>;

export interface IstioConfig {
  /** Whether Istio is enabled for this cluster. */
  disabled?: boolean;
  /** The specified Istio auth mode, either none, or mutual TLS. */
  auth?: "AUTH_NONE" | "AUTH_MUTUAL_TLS" | (string & {});
}

export const IstioConfig: Schema.Schema<IstioConfig> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
  auth: Schema.optional(Schema.String),
})).annotate({ identifier: "IstioConfig" }) as any as Schema.Schema<IstioConfig>;

export interface SliceControllerConfig {
  /** Optional. Indicates whether Slice Controller is enabled in the cluster. */
  enabled?: boolean;
}

export const SliceControllerConfig: Schema.Schema<SliceControllerConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SliceControllerConfig" }) as any as Schema.Schema<SliceControllerConfig>;

export interface RayClusterMonitoringConfig {
  /** Enable metrics collection for Ray clusters. */
  enabled?: boolean;
}

export const RayClusterMonitoringConfig: Schema.Schema<RayClusterMonitoringConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RayClusterMonitoringConfig" }) as any as Schema.Schema<RayClusterMonitoringConfig>;

export interface RayClusterLoggingConfig {
  /** Enable log collection for Ray clusters. */
  enabled?: boolean;
}

export const RayClusterLoggingConfig: Schema.Schema<RayClusterLoggingConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RayClusterLoggingConfig" }) as any as Schema.Schema<RayClusterLoggingConfig>;

export interface RayOperatorConfig {
  /** Optional. Monitoring configuration for Ray clusters. */
  rayClusterMonitoringConfig?: RayClusterMonitoringConfig;
  /** Optional. Logging configuration for Ray clusters. */
  rayClusterLoggingConfig?: RayClusterLoggingConfig;
  /** Whether the Ray addon is enabled for this cluster. */
  enabled?: boolean;
}

export const RayOperatorConfig: Schema.Schema<RayOperatorConfig> = Schema.suspend(() => Schema.Struct({
  rayClusterMonitoringConfig: Schema.optional(RayClusterMonitoringConfig),
  rayClusterLoggingConfig: Schema.optional(RayClusterLoggingConfig),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RayOperatorConfig" }) as any as Schema.Schema<RayOperatorConfig>;

export interface ConfigConnectorConfig {
  /** Whether Cloud Connector is enabled for this cluster. */
  enabled?: boolean;
}

export const ConfigConnectorConfig: Schema.Schema<ConfigConnectorConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConfigConnectorConfig" }) as any as Schema.Schema<ConfigConnectorConfig>;

export interface HighScaleCheckpointingConfig {
  /** Whether the High Scale Checkpointing is enabled for this cluster. */
  enabled?: boolean;
}

export const HighScaleCheckpointingConfig: Schema.Schema<HighScaleCheckpointingConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HighScaleCheckpointingConfig" }) as any as Schema.Schema<HighScaleCheckpointingConfig>;

export interface AddonsConfig {
  /** Configuration for the Pod Snapshot feature. */
  podSnapshotConfig?: PodSnapshotConfig;
  /** Configuration for the Cloud Storage Fuse CSI driver. */
  gcsFuseCsiDriverConfig?: GcsFuseCsiDriverConfig;
  /** Configuration for the Cloud Storage Parallelstore CSI driver. */
  parallelstoreCsiDriverConfig?: ParallelstoreCsiDriverConfig;
  /** Configuration for the Cloud Run addon. The `IstioConfig` addon must be enabled in order to enable Cloud Run addon. This option can only be enabled at cluster creation time. */
  cloudRunConfig?: CloudRunConfig;
  /** Configuration for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster. */
  httpLoadBalancing?: HttpLoadBalancing;
  /** Configuration for the KALM addon, which manages the lifecycle of k8s applications. */
  kalmConfig?: KalmConfig;
  /** Configuration for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods. */
  horizontalPodAutoscaling?: HorizontalPodAutoscaling;
  /** Configuration for NodeLocalDNS, a dns cache running on cluster nodes */
  dnsCacheConfig?: DnsCacheConfig;
  /** Configuration for the Compute Engine Persistent Disk CSI driver. */
  gcePersistentDiskCsiDriverConfig?: GcePersistentDiskCsiDriverConfig;
  /** Configuration for the Backup for GKE agent addon. */
  gkeBackupAgentConfig?: GkeBackupAgentConfig;
  /** Configuration for the Kubernetes Dashboard. This addon is deprecated, and will be disabled in 1.15. It is recommended to use the Cloud Console to manage and monitor your Kubernetes clusters, workloads and applications. For more information, see: https://cloud.google.com/kubernetes-engine/docs/concepts/dashboards */
  kubernetesDashboard?: KubernetesDashboard;
  /** Configuration for the Lustre CSI driver. */
  lustreCsiDriverConfig?: LustreCsiDriverConfig;
  /** Configuration for the Filestore CSI driver. */
  gcpFilestoreCsiDriverConfig?: GcpFilestoreCsiDriverConfig;
  /** Optional. Configuration for the StatefulHA add-on. */
  statefulHaConfig?: StatefulHAConfig;
  /** Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes. */
  networkPolicyConfig?: NetworkPolicyConfig;
  /** Configuration for Istio, an open platform to connect, manage, and secure microservices. */
  istioConfig?: IstioConfig;
  /** Optional. Configuration for the slice controller add-on. */
  sliceControllerConfig?: SliceControllerConfig;
  /** Optional. Configuration for Ray Operator addon. */
  rayOperatorConfig?: RayOperatorConfig;
  /** Configuration for the ConfigConnector add-on, a Kubernetes extension to manage hosted Google Cloud services through the Kubernetes API. */
  configConnectorConfig?: ConfigConnectorConfig;
  /** Configuration for the High Scale Checkpointing add-on. */
  highScaleCheckpointingConfig?: HighScaleCheckpointingConfig;
}

export const AddonsConfig: Schema.Schema<AddonsConfig> = Schema.suspend(() => Schema.Struct({
  podSnapshotConfig: Schema.optional(PodSnapshotConfig),
  gcsFuseCsiDriverConfig: Schema.optional(GcsFuseCsiDriverConfig),
  parallelstoreCsiDriverConfig: Schema.optional(ParallelstoreCsiDriverConfig),
  cloudRunConfig: Schema.optional(CloudRunConfig),
  httpLoadBalancing: Schema.optional(HttpLoadBalancing),
  kalmConfig: Schema.optional(KalmConfig),
  horizontalPodAutoscaling: Schema.optional(HorizontalPodAutoscaling),
  dnsCacheConfig: Schema.optional(DnsCacheConfig),
  gcePersistentDiskCsiDriverConfig: Schema.optional(GcePersistentDiskCsiDriverConfig),
  gkeBackupAgentConfig: Schema.optional(GkeBackupAgentConfig),
  kubernetesDashboard: Schema.optional(KubernetesDashboard),
  lustreCsiDriverConfig: Schema.optional(LustreCsiDriverConfig),
  gcpFilestoreCsiDriverConfig: Schema.optional(GcpFilestoreCsiDriverConfig),
  statefulHaConfig: Schema.optional(StatefulHAConfig),
  networkPolicyConfig: Schema.optional(NetworkPolicyConfig),
  istioConfig: Schema.optional(IstioConfig),
  sliceControllerConfig: Schema.optional(SliceControllerConfig),
  rayOperatorConfig: Schema.optional(RayOperatorConfig),
  configConnectorConfig: Schema.optional(ConfigConnectorConfig),
  highScaleCheckpointingConfig: Schema.optional(HighScaleCheckpointingConfig),
})).annotate({ identifier: "AddonsConfig" }) as any as Schema.Schema<AddonsConfig>;

export interface AdvancedDatapathObservabilityConfig {
  /** Method used to make Relay available */
  relayMode?: "RELAY_MODE_UNSPECIFIED" | "DISABLED" | "INTERNAL_VPC_LB" | "EXTERNAL_LB" | (string & {});
  /** Enable Relay component */
  enableRelay?: boolean;
  /** Expose flow metrics on nodes */
  enableMetrics?: boolean;
}

export const AdvancedDatapathObservabilityConfig: Schema.Schema<AdvancedDatapathObservabilityConfig> = Schema.suspend(() => Schema.Struct({
  relayMode: Schema.optional(Schema.String),
  enableRelay: Schema.optional(Schema.Boolean),
  enableMetrics: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdvancedDatapathObservabilityConfig" }) as any as Schema.Schema<AdvancedDatapathObservabilityConfig>;

export interface MonitoringComponentConfig {
  /** Select components to collect metrics. An empty set would disable all monitoring. */
  enableComponents?: Array<"COMPONENT_UNSPECIFIED" | "SYSTEM_COMPONENTS" | "WORKLOADS" | "APISERVER" | "SCHEDULER" | "CONTROLLER_MANAGER" | "STORAGE" | "HPA" | "POD" | "DAEMONSET" | "DEPLOYMENT" | "STATEFULSET" | "CADVISOR" | "KUBELET" | "DCGM" | "JOBSET" | (string & {})>;
}

export const MonitoringComponentConfig: Schema.Schema<MonitoringComponentConfig> = Schema.suspend(() => Schema.Struct({
  enableComponents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MonitoringComponentConfig" }) as any as Schema.Schema<MonitoringComponentConfig>;

export interface AutoMonitoringConfig {
  /** Scope for GKE Workload Auto-Monitoring. */
  scope?: "SCOPE_UNSPECIFIED" | "ALL" | "NONE" | (string & {});
}

export const AutoMonitoringConfig: Schema.Schema<AutoMonitoringConfig> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoMonitoringConfig" }) as any as Schema.Schema<AutoMonitoringConfig>;

export interface ManagedPrometheusConfig {
  /** GKE Workload Auto-Monitoring Configuration. */
  autoMonitoringConfig?: AutoMonitoringConfig;
  /** Enable Managed Collection. */
  enabled?: boolean;
}

export const ManagedPrometheusConfig: Schema.Schema<ManagedPrometheusConfig> = Schema.suspend(() => Schema.Struct({
  autoMonitoringConfig: Schema.optional(AutoMonitoringConfig),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ManagedPrometheusConfig" }) as any as Schema.Schema<ManagedPrometheusConfig>;

export interface MonitoringConfig {
  /** Configuration of Advanced Datapath Observability features. */
  advancedDatapathObservabilityConfig?: AdvancedDatapathObservabilityConfig;
  /** Monitoring components configuration */
  componentConfig?: MonitoringComponentConfig;
  /** Enable Google Cloud Managed Service for Prometheus in the cluster. */
  managedPrometheusConfig?: ManagedPrometheusConfig;
}

export const MonitoringConfig: Schema.Schema<MonitoringConfig> = Schema.suspend(() => Schema.Struct({
  advancedDatapathObservabilityConfig: Schema.optional(AdvancedDatapathObservabilityConfig),
  componentConfig: Schema.optional(MonitoringComponentConfig),
  managedPrometheusConfig: Schema.optional(ManagedPrometheusConfig),
})).annotate({ identifier: "MonitoringConfig" }) as any as Schema.Schema<MonitoringConfig>;

export interface DisruptionBudget {
  /** Optional. The minimum duration between two patch version upgrades of the control plane. */
  patchVersionDisruptionInterval?: string;
  /** Output only. The last time a minor version upgrade was performed on the control plane. */
  lastMinorVersionDisruptionTime?: string;
  /** Output only. The last time a disruption was performed on the control plane. */
  lastDisruptionTime?: string;
  /** Optional. The minimum duration between two minor version upgrades of the control plane. */
  minorVersionDisruptionInterval?: string;
}

export const DisruptionBudget: Schema.Schema<DisruptionBudget> = Schema.suspend(() => Schema.Struct({
  patchVersionDisruptionInterval: Schema.optional(Schema.String),
  lastMinorVersionDisruptionTime: Schema.optional(Schema.String),
  lastDisruptionTime: Schema.optional(Schema.String),
  minorVersionDisruptionInterval: Schema.optional(Schema.String),
})).annotate({ identifier: "DisruptionBudget" }) as any as Schema.Schema<DisruptionBudget>;

export interface RecurringTimeWindow {
  /** The window of the first recurrence. */
  window?: TimeWindow;
  /** An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window reccurs. They go on for the span of time between the start and end time. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` This specifies how frequently the window starts. Eg, if you wanted to have a 9-5 UTC-4 window every weekday, you'd use something like: ``` start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR ``` Windows can span multiple days. Eg, to make the window encompass every weekend from midnight Saturday till the last minute of Sunday UTC: ``` start time = 2019-01-05T00:00:00Z end time = 2019-01-07T23:59:00Z recurrence = FREQ=WEEKLY;BYDAY=SA ``` Note the start and end time's specific dates are largely arbitrary except to specify duration of the window and when it first starts. The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported. */
  recurrence?: string;
}

export const RecurringTimeWindow: Schema.Schema<RecurringTimeWindow> = Schema.suspend(() => Schema.Struct({
  window: Schema.optional(TimeWindow),
  recurrence: Schema.optional(Schema.String),
})).annotate({ identifier: "RecurringTimeWindow" }) as any as Schema.Schema<RecurringTimeWindow>;

export interface DailyMaintenanceWindow {
  /** Output only. Duration of the time window, automatically chosen to be smallest possible in the given scenario. */
  duration?: string;
  /** Time within the maintenance window to start the maintenance operations. It must be in format "HH:MM", where HH : [00-23] and MM : [00-59] GMT. */
  startTime?: string;
}

export const DailyMaintenanceWindow: Schema.Schema<DailyMaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  duration: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DailyMaintenanceWindow" }) as any as Schema.Schema<DailyMaintenanceWindow>;

export interface MaintenanceWindow {
  /** RecurringWindow specifies some number of recurring time periods for maintenance to occur. The time windows may be overlapping. If no maintenance windows are set, maintenance can occur at any time. */
  recurringWindow?: RecurringTimeWindow;
  /** DailyMaintenanceWindow specifies a daily maintenance operation window. */
  dailyMaintenanceWindow?: DailyMaintenanceWindow;
  /** Exceptions to maintenance window. Non-emergency maintenance should not occur in these windows. */
  maintenanceExclusions?: Record<string, TimeWindow>;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  recurringWindow: Schema.optional(RecurringTimeWindow),
  dailyMaintenanceWindow: Schema.optional(DailyMaintenanceWindow),
  maintenanceExclusions: Schema.optional(Schema.Record(Schema.String, TimeWindow)),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface MaintenancePolicy {
  /** A hash identifying the version of this policy, so that updates to fields of the policy won't accidentally undo intermediate changes (and so that users of the API unaware of some fields won't accidentally remove other fields). Make a `get()` request to the cluster to get the current resource version and include it with requests to set the policy. */
  resourceVersion?: string;
  /** Optional. The upgrade disruption budget for the cluster control plane. */
  disruptionBudget?: DisruptionBudget;
  /** Specifies the maintenance window in which maintenance may be performed. */
  window?: MaintenanceWindow;
}

export const MaintenancePolicy: Schema.Schema<MaintenancePolicy> = Schema.suspend(() => Schema.Struct({
  resourceVersion: Schema.optional(Schema.String),
  disruptionBudget: Schema.optional(DisruptionBudget),
  window: Schema.optional(MaintenanceWindow),
})).annotate({ identifier: "MaintenancePolicy" }) as any as Schema.Schema<MaintenancePolicy>;

export interface MeshCertificates {
  /** enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty). */
  enableCertificates?: boolean;
}

export const MeshCertificates: Schema.Schema<MeshCertificates> = Schema.suspend(() => Schema.Struct({
  enableCertificates: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MeshCertificates" }) as any as Schema.Schema<MeshCertificates>;

export interface NetworkPolicy {
  /** Whether network policy is enabled on the cluster. */
  enabled?: boolean;
  /** The selected network policy provider. */
  provider?: "PROVIDER_UNSPECIFIED" | "CALICO" | (string & {});
}

export const NetworkPolicy: Schema.Schema<NetworkPolicy> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  provider: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkPolicy" }) as any as Schema.Schema<NetworkPolicy>;

export interface IdentityServiceConfig {
  /** Whether to enable the Identity Service component */
  enabled?: boolean;
}

export const IdentityServiceConfig: Schema.Schema<IdentityServiceConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IdentityServiceConfig" }) as any as Schema.Schema<IdentityServiceConfig>;

export interface ManagedOpenTelemetryConfig {
  /** Scope of the Managed OpenTelemetry pipeline. */
  scope?: "SCOPE_UNSPECIFIED" | "NONE" | "COLLECTION_AND_INSTRUMENTATION_COMPONENTS" | (string & {});
}

export const ManagedOpenTelemetryConfig: Schema.Schema<ManagedOpenTelemetryConfig> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedOpenTelemetryConfig" }) as any as Schema.Schema<ManagedOpenTelemetryConfig>;

export interface TpuConfig {
  /** Whether to use service networking for Cloud TPU or not. */
  useServiceNetworking?: boolean;
  /** IPv4 CIDR block reserved for Cloud TPU in the VPC. */
  ipv4CidrBlock?: string;
  /** Whether Cloud TPU integration is enabled or not. */
  enabled?: boolean;
}

export const TpuConfig: Schema.Schema<TpuConfig> = Schema.suspend(() => Schema.Struct({
  useServiceNetworking: Schema.optional(Schema.Boolean),
  ipv4CidrBlock: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TpuConfig" }) as any as Schema.Schema<TpuConfig>;

export interface UserManagedKeysConfig {
  /** The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}` */
  serviceAccountVerificationKeys?: Array<string>;
  /** The Certificate Authority Service caPool to use for the cluster CA in this cluster. */
  clusterCa?: string;
  /** Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes. */
  controlPlaneDiskEncryptionKeyVersions?: Array<string>;
  /** Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster. */
  etcdPeerCa?: string;
  /** The Certificate Authority Service caPool to use for the aggregation CA in this cluster. */
  aggregationCa?: string;
  /** Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster. */
  etcdApiCa?: string;
  /** Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups. */
  gkeopsEtcdBackupEncryptionKey?: string;
  /** The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}` */
  serviceAccountSigningKeys?: Array<string>;
  /** The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes. */
  controlPlaneDiskEncryptionKey?: string;
}

export const UserManagedKeysConfig: Schema.Schema<UserManagedKeysConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccountVerificationKeys: Schema.optional(Schema.Array(Schema.String)),
  clusterCa: Schema.optional(Schema.String),
  controlPlaneDiskEncryptionKeyVersions: Schema.optional(Schema.Array(Schema.String)),
  etcdPeerCa: Schema.optional(Schema.String),
  aggregationCa: Schema.optional(Schema.String),
  etcdApiCa: Schema.optional(Schema.String),
  gkeopsEtcdBackupEncryptionKey: Schema.optional(Schema.String),
  serviceAccountSigningKeys: Schema.optional(Schema.Array(Schema.String)),
  controlPlaneDiskEncryptionKey: Schema.optional(Schema.String),
})).annotate({ identifier: "UserManagedKeysConfig" }) as any as Schema.Schema<UserManagedKeysConfig>;

export interface PodAutoscaling {
  /** Selected Horizontal Pod Autoscaling profile. */
  hpaProfile?: "HPA_PROFILE_UNSPECIFIED" | "NONE" | "PERFORMANCE" | (string & {});
}

export const PodAutoscaling: Schema.Schema<PodAutoscaling> = Schema.suspend(() => Schema.Struct({
  hpaProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "PodAutoscaling" }) as any as Schema.Schema<PodAutoscaling>;

export interface Fleet {
  /** The Fleet host project(project ID or project number) where this cluster will be registered to. This field cannot be changed after the cluster has been registered. */
  project?: string;
  /** Output only. The full resource name of the registered fleet membership of the cluster, in the format `//gkehub.googleapis.com/projects/* /locations/* /memberships/*`. */
  membership?: string;
  /** Output only. Whether the cluster has been registered through the fleet API. */
  preRegistered?: boolean;
  /** The type of the cluster's fleet membership. */
  membershipType?: "MEMBERSHIP_TYPE_UNSPECIFIED" | "LIGHTWEIGHT" | (string & {});
}

export const Fleet: Schema.Schema<Fleet> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  membership: Schema.optional(Schema.String),
  preRegistered: Schema.optional(Schema.Boolean),
  membershipType: Schema.optional(Schema.String),
})).annotate({ identifier: "Fleet" }) as any as Schema.Schema<Fleet>;

export interface ClusterTelemetry {
  /** Type of the integration. */
  type?: "UNSPECIFIED" | "DISABLED" | "ENABLED" | "SYSTEM_ONLY" | (string & {});
}

export const ClusterTelemetry: Schema.Schema<ClusterTelemetry> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterTelemetry" }) as any as Schema.Schema<ClusterTelemetry>;

export interface ComplianceStandard {
  /** Name of the compliance standard. */
  standard?: string;
}

export const ComplianceStandard: Schema.Schema<ComplianceStandard> = Schema.suspend(() => Schema.Struct({
  standard: Schema.optional(Schema.String),
})).annotate({ identifier: "ComplianceStandard" }) as any as Schema.Schema<ComplianceStandard>;

export interface CompliancePostureConfig {
  /** List of enabled compliance standards. */
  complianceStandards?: Array<ComplianceStandard>;
  /** Defines the enablement mode for Compliance Posture. */
  mode?: "MODE_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
}

export const CompliancePostureConfig: Schema.Schema<CompliancePostureConfig> = Schema.suspend(() => Schema.Struct({
  complianceStandards: Schema.optional(Schema.Array(ComplianceStandard)),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "CompliancePostureConfig" }) as any as Schema.Schema<CompliancePostureConfig>;

export interface NodePoolAutoscaling {
  /** Minimum number of nodes in the node pool. Must be greater than or equal to 0 and less than or equal to total_max_node_count. The total_*_node_count fields are mutually exclusive with the *_node_count fields. */
  totalMinNodeCount?: number;
  /** Is autoscaling enabled for this node pool. */
  enabled?: boolean;
  /** Minimum number of nodes for one location in the node pool. Must be greater than or equal to 0 and less than or equal to max_node_count. */
  minNodeCount?: number;
  /** Can this node pool be deleted automatically. */
  autoprovisioned?: boolean;
  /** Location policy used when scaling up a nodepool. */
  locationPolicy?: "LOCATION_POLICY_UNSPECIFIED" | "BALANCED" | "ANY" | (string & {});
  /** Maximum number of nodes for one location in the node pool. Must be >= min_node_count. There has to be enough quota to scale up the cluster. */
  maxNodeCount?: number;
  /** Maximum number of nodes in the node pool. Must be greater than or equal to total_min_node_count. There has to be enough quota to scale up the cluster. The total_*_node_count fields are mutually exclusive with the *_node_count fields. */
  totalMaxNodeCount?: number;
}

export const NodePoolAutoscaling: Schema.Schema<NodePoolAutoscaling> = Schema.suspend(() => Schema.Struct({
  totalMinNodeCount: Schema.optional(Schema.Number),
  enabled: Schema.optional(Schema.Boolean),
  minNodeCount: Schema.optional(Schema.Number),
  autoprovisioned: Schema.optional(Schema.Boolean),
  locationPolicy: Schema.optional(Schema.String),
  maxNodeCount: Schema.optional(Schema.Number),
  totalMaxNodeCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "NodePoolAutoscaling" }) as any as Schema.Schema<NodePoolAutoscaling>;

export interface NodeDrainConfig {
  /** Whether to respect PDB during node pool deletion. */
  respectPdbDuringNodePoolDeletion?: boolean;
}

export const NodeDrainConfig: Schema.Schema<NodeDrainConfig> = Schema.suspend(() => Schema.Struct({
  respectPdbDuringNodePoolDeletion: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NodeDrainConfig" }) as any as Schema.Schema<NodeDrainConfig>;

export interface AutoUpgradeOptions {
  /** Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  autoUpgradeStartTime?: string;
  /** Output only. This field is set when upgrades are about to commence with the description of the upgrade. */
  description?: string;
}

export const AutoUpgradeOptions: Schema.Schema<AutoUpgradeOptions> = Schema.suspend(() => Schema.Struct({
  autoUpgradeStartTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoUpgradeOptions" }) as any as Schema.Schema<AutoUpgradeOptions>;

export interface NodeManagement {
  /** Whether the nodes will be automatically upgraded. */
  autoUpgrade?: boolean;
  /** Specifies the Auto Upgrade knobs for the node pool. */
  upgradeOptions?: AutoUpgradeOptions;
  /** Whether the nodes will be automatically repaired. */
  autoRepair?: boolean;
}

export const NodeManagement: Schema.Schema<NodeManagement> = Schema.suspend(() => Schema.Struct({
  autoUpgrade: Schema.optional(Schema.Boolean),
  upgradeOptions: Schema.optional(AutoUpgradeOptions),
  autoRepair: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NodeManagement" }) as any as Schema.Schema<NodeManagement>;

export interface MaxPodsConstraint {
  /** Constraint enforced on the max num of pods per node. */
  maxPodsPerNode?: string;
}

export const MaxPodsConstraint: Schema.Schema<MaxPodsConstraint> = Schema.suspend(() => Schema.Struct({
  maxPodsPerNode: Schema.optional(Schema.String),
})).annotate({ identifier: "MaxPodsConstraint" }) as any as Schema.Schema<MaxPodsConstraint>;

export interface BlueGreenInfo {
  /** Current blue-green upgrade phase. */
  phase?: "PHASE_UNSPECIFIED" | "UPDATE_STARTED" | "CREATING_GREEN_POOL" | "CORDONING_BLUE_POOL" | "WAITING_TO_DRAIN_BLUE_POOL" | "DRAINING_BLUE_POOL" | "NODE_POOL_SOAKING" | "DELETING_BLUE_POOL" | "ROLLBACK_STARTED" | (string & {});
  /** The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with green pool. */
  greenInstanceGroupUrls?: Array<string>;
  /** Time to start deleting blue pool to complete blue-green upgrade, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  bluePoolDeletionStartTime?: string;
  /** Version of green pool. */
  greenPoolVersion?: string;
  /** The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with blue pool. */
  blueInstanceGroupUrls?: Array<string>;
}

export const BlueGreenInfo: Schema.Schema<BlueGreenInfo> = Schema.suspend(() => Schema.Struct({
  phase: Schema.optional(Schema.String),
  greenInstanceGroupUrls: Schema.optional(Schema.Array(Schema.String)),
  bluePoolDeletionStartTime: Schema.optional(Schema.String),
  greenPoolVersion: Schema.optional(Schema.String),
  blueInstanceGroupUrls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BlueGreenInfo" }) as any as Schema.Schema<BlueGreenInfo>;

export interface UpdateInfo {
  /** Information of a blue-green upgrade. */
  blueGreenInfo?: BlueGreenInfo;
}

export const UpdateInfo: Schema.Schema<UpdateInfo> = Schema.suspend(() => Schema.Struct({
  blueGreenInfo: Schema.optional(BlueGreenInfo),
})).annotate({ identifier: "UpdateInfo" }) as any as Schema.Schema<UpdateInfo>;

export interface PlacementPolicy {
  /** If set, refers to the name of a custom resource policy supplied by the user. The resource policy must be in the same project and region as the node pool. If not found, InvalidArgument error is returned. */
  policyName?: string;
  /** TPU placement topology for pod slice node pool. https://cloud.google.com/tpu/docs/types-topologies#tpu_topologies */
  tpuTopology?: string;
  /** The type of placement. */
  type?: "TYPE_UNSPECIFIED" | "COMPACT" | (string & {});
}

export const PlacementPolicy: Schema.Schema<PlacementPolicy> = Schema.suspend(() => Schema.Struct({
  policyName: Schema.optional(Schema.String),
  tpuTopology: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "PlacementPolicy" }) as any as Schema.Schema<PlacementPolicy>;

export interface QueuedProvisioning {
  /** Denotes that this nodepool is QRM specific, meaning nodes can be only obtained through queuing via the Cluster Autoscaler ProvisioningRequest API. */
  enabled?: boolean;
}

export const QueuedProvisioning: Schema.Schema<QueuedProvisioning> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "QueuedProvisioning" }) as any as Schema.Schema<QueuedProvisioning>;

export interface BestEffortProvisioning {
  /** Minimum number of nodes to be provisioned to be considered as succeeded, and the rest of nodes will be provisioned gradually and eventually when stockout issue has been resolved. */
  minProvisionNodes?: number;
  /** When this is enabled, cluster/node pool creations will ignore non-fatal errors like stockout to best provision as many nodes as possible right now and eventually bring up all target number of nodes */
  enabled?: boolean;
}

export const BestEffortProvisioning: Schema.Schema<BestEffortProvisioning> = Schema.suspend(() => Schema.Struct({
  minProvisionNodes: Schema.optional(Schema.Number),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BestEffortProvisioning" }) as any as Schema.Schema<BestEffortProvisioning>;

export interface AdditionalPodNetworkConfig {
  /** The maximum number of pods per node which use this pod network. */
  maxPodsPerNode?: MaxPodsConstraint;
  /** Name of the subnetwork where the additional pod network belongs. */
  subnetwork?: string;
  /** The name of the network attachment for pods to communicate to; cannot be specified along with subnetwork or secondary_pod_range. */
  networkAttachment?: string;
  /** The name of the secondary range on the subnet which provides IP address for this pod range. */
  secondaryPodRange?: string;
}

export const AdditionalPodNetworkConfig: Schema.Schema<AdditionalPodNetworkConfig> = Schema.suspend(() => Schema.Struct({
  maxPodsPerNode: Schema.optional(MaxPodsConstraint),
  subnetwork: Schema.optional(Schema.String),
  networkAttachment: Schema.optional(Schema.String),
  secondaryPodRange: Schema.optional(Schema.String),
})).annotate({ identifier: "AdditionalPodNetworkConfig" }) as any as Schema.Schema<AdditionalPodNetworkConfig>;

export interface AdditionalNodeNetworkConfig {
  /** Name of the VPC where the additional interface belongs */
  network?: string;
  /** Name of the subnetwork where the additional interface belongs */
  subnetwork?: string;
}

export const AdditionalNodeNetworkConfig: Schema.Schema<AdditionalNodeNetworkConfig> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
})).annotate({ identifier: "AdditionalNodeNetworkConfig" }) as any as Schema.Schema<AdditionalNodeNetworkConfig>;

export interface NetworkPerformanceConfig {
  /** Specifies the network bandwidth tier for the NodePool for traffic to external/public IP addresses. */
  externalIpEgressBandwidthTier?: "TIER_UNSPECIFIED" | "TIER_1" | (string & {});
  /** Specifies the total network bandwidth tier for the NodePool. */
  totalEgressBandwidthTier?: "TIER_UNSPECIFIED" | "TIER_1" | (string & {});
}

export const NetworkPerformanceConfig: Schema.Schema<NetworkPerformanceConfig> = Schema.suspend(() => Schema.Struct({
  externalIpEgressBandwidthTier: Schema.optional(Schema.String),
  totalEgressBandwidthTier: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkPerformanceConfig" }) as any as Schema.Schema<NetworkPerformanceConfig>;

export interface NodeNetworkConfig {
  /** The IP address range for pod IPs in this node pool. Only applicable if `create_pod_range` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created. */
  podIpv4CidrBlock?: string;
  /** We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node */
  additionalPodNetworkConfigs?: Array<AdditionalPodNetworkConfig>;
  /** Immutable. The accelerator network profile for the node pool. For now the only valid value is "auto". If specified, the network configuration of the nodes in this node pool will be managed by this profile for the supported machine types, zone, etc. */
  acceleratorNetworkProfile?: string;
  /** [PRIVATE FIELD] Pod CIDR size overprovisioning config for the nodepool. Pod CIDR size per node depends on max_pods_per_node. By default, the value of max_pods_per_node is rounded off to next power of 2 and we then double that to get the size of pod CIDR block per node. Example: max_pods_per_node of 30 would result in 64 IPs (/26). This config can disable the doubling of IPs (we still round off to next power of 2) Example: max_pods_per_node of 30 will result in 32 IPs (/27) when overprovisioning is disabled. */
  podCidrOverprovisionConfig?: PodCIDROverprovisionConfig;
  /** Output only. The utilization of the IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode. */
  podIpv4RangeUtilization?: number;
  /** Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created. */
  createPodRange?: boolean;
  /** We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface */
  additionalNodeNetworkConfigs?: Array<AdditionalNodeNetworkConfig>;
  /** Output only. The network tier configuration for the node pool inherits from the cluster-level configuration and remains immutable throughout the node pool's lifecycle, including during upgrades. */
  networkTierConfig?: NetworkTierConfig;
  /** Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes */
  enablePrivateNodes?: boolean;
  /** The ID of the secondary range for pod IPs. If `create_pod_range` is true, this ID is used for the new range. If `create_pod_range` is false, uses an existing secondary range with this ID. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created. */
  podRange?: string;
  /** Optional. The subnetwork name/path for the node pool. Format: projects/{project}/regions/{region}/subnetworks/{subnetwork} If the cluster is associated with multiple subnetworks, the subnetwork can be either: - A user supplied subnetwork name during node pool creation (e.g., `my-subnet`). The name must be between 1 and 63 characters long, start with a letter, contain only letters, numbers, and hyphens, and end with a letter or a number. - A full subnetwork path during node pool creation, such as `projects/gke-project/regions/us-central1/subnetworks/my-subnet` - A subnetwork path picked based on the IP utilization during node pool creation and is immutable. */
  subnetwork?: string;
  /** Network bandwidth tier configuration. */
  networkPerformanceConfig?: NetworkPerformanceConfig;
}

export const NodeNetworkConfig: Schema.Schema<NodeNetworkConfig> = Schema.suspend(() => Schema.Struct({
  podIpv4CidrBlock: Schema.optional(Schema.String),
  additionalPodNetworkConfigs: Schema.optional(Schema.Array(AdditionalPodNetworkConfig)),
  acceleratorNetworkProfile: Schema.optional(Schema.String),
  podCidrOverprovisionConfig: Schema.optional(PodCIDROverprovisionConfig),
  podIpv4RangeUtilization: Schema.optional(Schema.Number),
  createPodRange: Schema.optional(Schema.Boolean),
  additionalNodeNetworkConfigs: Schema.optional(Schema.Array(AdditionalNodeNetworkConfig)),
  networkTierConfig: Schema.optional(NetworkTierConfig),
  enablePrivateNodes: Schema.optional(Schema.Boolean),
  podRange: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  networkPerformanceConfig: Schema.optional(NetworkPerformanceConfig),
})).annotate({ identifier: "NodeNetworkConfig" }) as any as Schema.Schema<NodeNetworkConfig>;

export interface AutopilotConfig {
  /** Denotes that nodes belonging to this node pool are Autopilot nodes. */
  enabled?: boolean;
}

export const AutopilotConfig: Schema.Schema<AutopilotConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AutopilotConfig" }) as any as Schema.Schema<AutopilotConfig>;

export interface NodePool {
  /** Autoscaler configuration for this NodePool. Autoscaler is enabled only if a valid configuration is present. */
  autoscaling?: NodePoolAutoscaling;
  /** Output only. The pod CIDR block size per node in this node pool. */
  podIpv4CidrSize?: number;
  /** Specifies the node drain configuration for this node pool. */
  nodeDrainConfig?: NodeDrainConfig;
  /** Output only. Deprecated. Use conditions instead. Additional information about the current status of this node pool instance, if available. */
  statusMessage?: string;
  /** NodeManagement configuration for this NodePool. */
  management?: NodeManagement;
  /** This checksum is computed by the server based on the value of node pool fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** The constraint on the maximum number of pods that can be run simultaneously on a node in the node pool. */
  maxPodsConstraint?: MaxPodsConstraint;
  /** Output only. Update info contains relevant information during a node pool update. */
  updateInfo?: UpdateInfo;
  /** The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes should be located. If this value is unspecified during node pool creation, the [Cluster.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters#Cluster.FIELDS.locations) value will be used, instead. Warning: changing node pool locations will result in nodes being added and/or removed. */
  locations?: Array<string>;
  /** Which conditions caused the current node pool state. */
  conditions?: Array<StatusCondition>;
  /** Output only. Server-defined URL for the resource. */
  selfLink?: string;
  /** Specifies the node placement policy. */
  placementPolicy?: PlacementPolicy;
  /** Output only. The resource URLs of the [managed instance groups](https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with this node pool. During the node pool blue-green upgrade operation, the URLs contain both blue and green resources. */
  instanceGroupUrls?: Array<string>;
  /** The version of Kubernetes running on this NodePool's nodes. If unspecified, it defaults as described [here](https://cloud.google.com/kubernetes-engine/versioning#specifying_node_version). */
  version?: string;
  /** Specifies the configuration of queued provisioning. */
  queuedProvisioning?: QueuedProvisioning;
  /** The initial node count for the pool. You must ensure that your Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. */
  initialNodeCount?: number;
  /** The node configuration of the pool. */
  config?: NodeConfig;
  /** Enable best effort provisioning for nodes */
  bestEffortProvisioning?: BestEffortProvisioning;
  /** Networking configuration for this NodePool. If specified, it overrides the cluster-level defaults. */
  networkConfig?: NodeNetworkConfig;
  /** Specifies the autopilot configuration for this node pool. This field is exclusively reserved for Cluster Autoscaler. */
  autopilotConfig?: AutopilotConfig;
  /** Output only. The status of the nodes in this pool instance. */
  status?: "STATUS_UNSPECIFIED" | "PROVISIONING" | "RUNNING" | "RUNNING_WITH_ERROR" | "RECONCILING" | "STOPPING" | "ERROR" | (string & {});
  /** The name of the node pool. */
  name?: string;
  /** Upgrade settings control disruption and speed of the upgrade. */
  upgradeSettings?: UpgradeSettings;
}

export const NodePool: Schema.Schema<NodePool> = Schema.suspend(() => Schema.Struct({
  autoscaling: Schema.optional(NodePoolAutoscaling),
  podIpv4CidrSize: Schema.optional(Schema.Number),
  nodeDrainConfig: Schema.optional(NodeDrainConfig),
  statusMessage: Schema.optional(Schema.String),
  management: Schema.optional(NodeManagement),
  etag: Schema.optional(Schema.String),
  maxPodsConstraint: Schema.optional(MaxPodsConstraint),
  updateInfo: Schema.optional(UpdateInfo),
  locations: Schema.optional(Schema.Array(Schema.String)),
  conditions: Schema.optional(Schema.Array(StatusCondition)),
  selfLink: Schema.optional(Schema.String),
  placementPolicy: Schema.optional(PlacementPolicy),
  instanceGroupUrls: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
  queuedProvisioning: Schema.optional(QueuedProvisioning),
  initialNodeCount: Schema.optional(Schema.Number),
  config: Schema.optional(NodeConfig),
  bestEffortProvisioning: Schema.optional(BestEffortProvisioning),
  networkConfig: Schema.optional(NodeNetworkConfig),
  autopilotConfig: Schema.optional(AutopilotConfig),
  status: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  upgradeSettings: Schema.optional(UpgradeSettings),
})).annotate({ identifier: "NodePool" }) as any as Schema.Schema<NodePool>;

export interface ShieldedNodes {
  /** Whether Shielded Nodes features are enabled on all nodes in this cluster. */
  enabled?: boolean;
}

export const ShieldedNodes: Schema.Schema<ShieldedNodes> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ShieldedNodes" }) as any as Schema.Schema<ShieldedNodes>;

export interface CostManagementConfig {
  /** Whether the feature is enabled or not. */
  enabled?: boolean;
}

export const CostManagementConfig: Schema.Schema<CostManagementConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CostManagementConfig" }) as any as Schema.Schema<CostManagementConfig>;

export interface GkeAutoUpgradeConfig {
  /** PatchMode specifies how auto upgrade patch builds should be selected. */
  patchMode?: "PATCH_MODE_UNSPECIFIED" | "ACCELERATED" | (string & {});
}

export const GkeAutoUpgradeConfig: Schema.Schema<GkeAutoUpgradeConfig> = Schema.suspend(() => Schema.Struct({
  patchMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GkeAutoUpgradeConfig" }) as any as Schema.Schema<GkeAutoUpgradeConfig>;

export interface SecurityPostureConfig {
  /** Sets which mode to use for vulnerability scanning. */
  vulnerabilityMode?: "VULNERABILITY_MODE_UNSPECIFIED" | "VULNERABILITY_DISABLED" | "VULNERABILITY_BASIC" | "VULNERABILITY_ENTERPRISE" | (string & {});
  /** Sets which mode to use for Security Posture features. */
  mode?: "MODE_UNSPECIFIED" | "DISABLED" | "BASIC" | "ENTERPRISE" | (string & {});
}

export const SecurityPostureConfig: Schema.Schema<SecurityPostureConfig> = Schema.suspend(() => Schema.Struct({
  vulnerabilityMode: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityPostureConfig" }) as any as Schema.Schema<SecurityPostureConfig>;

export interface VerticalPodAutoscaling {
  /** Enables vertical pod autoscaling. */
  enabled?: boolean;
}

export const VerticalPodAutoscaling: Schema.Schema<VerticalPodAutoscaling> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "VerticalPodAutoscaling" }) as any as Schema.Schema<VerticalPodAutoscaling>;

export interface EnterpriseConfig {
  /** Output only. cluster_tier indicates the effective tier of the cluster. */
  clusterTier?: "CLUSTER_TIER_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | (string & {});
  /** desired_tier specifies the desired tier of the cluster. */
  desiredTier?: "CLUSTER_TIER_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | (string & {});
}

export const EnterpriseConfig: Schema.Schema<EnterpriseConfig> = Schema.suspend(() => Schema.Struct({
  clusterTier: Schema.optional(Schema.String),
  desiredTier: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseConfig" }) as any as Schema.Schema<EnterpriseConfig>;

export interface AutoprovisioningNodePoolDefaults {
  /** The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption */
  bootDiskKmsKey?: string;
  /** Upgrade settings control disruption and speed of the upgrade. */
  upgradeSettings?: UpgradeSettings;
  /** The image type to use for NAP created node. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types. */
  imageType?: string;
  /** Deprecated. Minimum CPU platform to be used for NAP created node pools. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). This field is deprecated, min_cpu_platform should be specified using `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To unset the min cpu platform field pass "automatic" as field value. */
  minCpuPlatform?: string;
  /** Shielded Instance options. */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /** DEPRECATED. Use NodePoolAutoConfig.NodeKubeletConfig instead. */
  insecureKubeletReadonlyPortEnabled?: boolean;
  /** The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: * `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. * `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with **gcr.io** (the [Artifact Registry](https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added. */
  oauthScopes?: Array<string>;
  /** Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB. */
  diskSizeGb?: number;
  /** Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard' */
  diskType?: string;
  /** The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used. */
  serviceAccount?: string;
  /** NodeManagement configuration for this NodePool. */
  management?: NodeManagement;
}

export const AutoprovisioningNodePoolDefaults: Schema.Schema<AutoprovisioningNodePoolDefaults> = Schema.suspend(() => Schema.Struct({
  bootDiskKmsKey: Schema.optional(Schema.String),
  upgradeSettings: Schema.optional(UpgradeSettings),
  imageType: Schema.optional(Schema.String),
  minCpuPlatform: Schema.optional(Schema.String),
  shieldedInstanceConfig: Schema.optional(ShieldedInstanceConfig),
  insecureKubeletReadonlyPortEnabled: Schema.optional(Schema.Boolean),
  oauthScopes: Schema.optional(Schema.Array(Schema.String)),
  diskSizeGb: Schema.optional(Schema.Number),
  diskType: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  management: Schema.optional(NodeManagement),
})).annotate({ identifier: "AutoprovisioningNodePoolDefaults" }) as any as Schema.Schema<AutoprovisioningNodePoolDefaults>;

export interface DefaultComputeClassConfig {
  /** Enables default compute class. */
  enabled?: boolean;
}

export const DefaultComputeClassConfig: Schema.Schema<DefaultComputeClassConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DefaultComputeClassConfig" }) as any as Schema.Schema<DefaultComputeClassConfig>;

export interface ResourceLimit {
  /** Resource name "cpu", "memory" or gpu-specific string. */
  resourceType?: string;
  /** Minimum amount of the resource in the cluster. */
  minimum?: string;
  /** Maximum amount of the resource in the cluster. */
  maximum?: string;
}

export const ResourceLimit: Schema.Schema<ResourceLimit> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  minimum: Schema.optional(Schema.String),
  maximum: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceLimit" }) as any as Schema.Schema<ResourceLimit>;

export interface ClusterAutoscaling {
  /** AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP. */
  autoprovisioningNodePoolDefaults?: AutoprovisioningNodePoolDefaults;
  /** Default compute class is a configuration for default compute class. */
  defaultComputeClassConfig?: DefaultComputeClassConfig;
  /** Autopilot general profile for the cluster, which defines the configuration for the cluster. */
  autopilotGeneralProfile?: "AUTOPILOT_GENERAL_PROFILE_UNSPECIFIED" | "NO_PERFORMANCE" | "NONE" | (string & {});
  /** Contains global constraints regarding minimum and maximum amount of resources in the cluster. */
  resourceLimits?: Array<ResourceLimit>;
  /** The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes can be created by NAP. */
  autoprovisioningLocations?: Array<string>;
  /** Enables automatic node pool creation and deletion. */
  enableNodeAutoprovisioning?: boolean;
  /** Defines autoscaling behaviour. */
  autoscalingProfile?: "PROFILE_UNSPECIFIED" | "OPTIMIZE_UTILIZATION" | "BALANCED" | (string & {});
}

export const ClusterAutoscaling: Schema.Schema<ClusterAutoscaling> = Schema.suspend(() => Schema.Struct({
  autoprovisioningNodePoolDefaults: Schema.optional(AutoprovisioningNodePoolDefaults),
  defaultComputeClassConfig: Schema.optional(DefaultComputeClassConfig),
  autopilotGeneralProfile: Schema.optional(Schema.String),
  resourceLimits: Schema.optional(Schema.Array(ResourceLimit)),
  autoprovisioningLocations: Schema.optional(Schema.Array(Schema.String)),
  enableNodeAutoprovisioning: Schema.optional(Schema.Boolean),
  autoscalingProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterAutoscaling" }) as any as Schema.Schema<ClusterAutoscaling>;

export interface OperationError {
  /** CloudKMS key resource that had the error. */
  keyName?: string;
  /** Time when the CloudKMS error was seen. */
  timestamp?: string;
  /** Description of the error seen during the operation. */
  errorMessage?: string;
}

export const OperationError: Schema.Schema<OperationError> = Schema.suspend(() => Schema.Struct({
  keyName: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationError" }) as any as Schema.Schema<OperationError>;

export interface DatabaseEncryption {
  /** Name of CloudKMS key to use for the encryption of secrets in etcd. Ex. projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key */
  keyName?: string;
  /** Output only. The current state of etcd encryption. */
  currentState?: "CURRENT_STATE_UNSPECIFIED" | "CURRENT_STATE_ENCRYPTED" | "CURRENT_STATE_DECRYPTED" | "CURRENT_STATE_ENCRYPTION_PENDING" | "CURRENT_STATE_ENCRYPTION_ERROR" | "CURRENT_STATE_DECRYPTION_PENDING" | "CURRENT_STATE_DECRYPTION_ERROR" | (string & {});
  /** Output only. Records errors seen during DatabaseEncryption update operations. */
  lastOperationErrors?: Array<OperationError>;
  /** Output only. Keys in use by the cluster for decrypting existing objects, in addition to the key in `key_name`. Each item is a CloudKMS key resource. */
  decryptionKeys?: Array<string>;
  /** The desired state of etcd encryption. */
  state?: "UNKNOWN" | "ENCRYPTED" | "DECRYPTED" | (string & {});
}

export const DatabaseEncryption: Schema.Schema<DatabaseEncryption> = Schema.suspend(() => Schema.Struct({
  keyName: Schema.optional(Schema.String),
  currentState: Schema.optional(Schema.String),
  lastOperationErrors: Schema.optional(Schema.Array(OperationError)),
  decryptionKeys: Schema.optional(Schema.Array(Schema.String)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseEncryption" }) as any as Schema.Schema<DatabaseEncryption>;

export interface LegacyAbac {
  /** Whether the ABAC authorizer is enabled for this cluster. When enabled, identities in the system, including service accounts, nodes, and controllers, will have statically granted permissions beyond those provided by the RBAC configuration or IAM. */
  enabled?: boolean;
}

export const LegacyAbac: Schema.Schema<LegacyAbac> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LegacyAbac" }) as any as Schema.Schema<LegacyAbac>;

export interface ClientCertificateConfig {
  /** Issue a client certificate. */
  issueClientCertificate?: boolean;
}

export const ClientCertificateConfig: Schema.Schema<ClientCertificateConfig> = Schema.suspend(() => Schema.Struct({
  issueClientCertificate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ClientCertificateConfig" }) as any as Schema.Schema<ClientCertificateConfig>;

export interface MasterAuth {
  /** Configuration for client certificate authentication on the cluster. For clusters before v1.12, if no configuration is specified, a client certificate is issued. */
  clientCertificateConfig?: ClientCertificateConfig;
  /** The username to use for HTTP basic authentication to the master endpoint. For clusters v1.6.0 and later, basic authentication can be disabled by leaving username unspecified (or setting it to the empty string). Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication */
  username?: string;
  /** Output only. Base64-encoded private key used by clients to authenticate to the cluster endpoint. */
  clientKey?: string;
  /** Output only. Base64-encoded public certificate used by clients to authenticate to the cluster endpoint. Issued only if client_certificate_config is set. */
  clientCertificate?: string;
  /** The password to use for HTTP basic authentication to the master endpoint. Because the master endpoint is open to the Internet, you should create a strong password. If a password is provided for cluster creation, username must be non-empty. Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication */
  password?: string;
  /** Output only. Base64-encoded public certificate that is the root of trust for the cluster. */
  clusterCaCertificate?: string;
}

export const MasterAuth: Schema.Schema<MasterAuth> = Schema.suspend(() => Schema.Struct({
  clientCertificateConfig: Schema.optional(ClientCertificateConfig),
  username: Schema.optional(Schema.String),
  clientKey: Schema.optional(Schema.String),
  clientCertificate: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  clusterCaCertificate: Schema.optional(Schema.String),
})).annotate({ identifier: "MasterAuth" }) as any as Schema.Schema<MasterAuth>;

export interface CompatibilityStatus {
  /** Output only. The GKE version that the cluster can be safely downgraded to if the cluster is emulating the previous minor version. It is usually the cluster's previous version before a minor version upgrade. */
  downgradableVersion?: string;
  /** Output only. Last time the control plane became available after a minor version binary upgrade with emulated version set. It indicates the last time the cluster entered the rollback safe mode. */
  emulatedVersionTime?: string;
}

export const CompatibilityStatus: Schema.Schema<CompatibilityStatus> = Schema.suspend(() => Schema.Struct({
  downgradableVersion: Schema.optional(Schema.String),
  emulatedVersionTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CompatibilityStatus" }) as any as Schema.Schema<CompatibilityStatus>;

export interface Master {
  /** Output only. The compatibility status of the control plane. It should be empty if the cluster does not have emulated version. */
  compatibilityStatus?: CompatibilityStatus;
}

export const Master: Schema.Schema<Master> = Schema.suspend(() => Schema.Struct({
  compatibilityStatus: Schema.optional(CompatibilityStatus),
})).annotate({ identifier: "Master" }) as any as Schema.Schema<Master>;

export interface NetworkTags {
  /** List of network tags. */
  tags?: Array<string>;
}

export const NetworkTags: Schema.Schema<NetworkTags> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NetworkTags" }) as any as Schema.Schema<NetworkTags>;

export interface NodePoolAutoConfig {
  /** NodeKubeletConfig controls the defaults for autoprovisioned node-pools. Currently only `insecure_kubelet_readonly_port_enabled` can be set here. */
  nodeKubeletConfig?: NodeKubeletConfig;
  /** Resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. */
  resourceManagerTags?: ResourceManagerTags;
  /** Output only. Configuration options for Linux nodes. */
  linuxNodeConfig?: LinuxNodeConfig;
  /** The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster creation. Each tag within the list must comply with RFC1035. */
  networkTags?: NetworkTags;
}

export const NodePoolAutoConfig: Schema.Schema<NodePoolAutoConfig> = Schema.suspend(() => Schema.Struct({
  nodeKubeletConfig: Schema.optional(NodeKubeletConfig),
  resourceManagerTags: Schema.optional(ResourceManagerTags),
  linuxNodeConfig: Schema.optional(LinuxNodeConfig),
  networkTags: Schema.optional(NetworkTags),
})).annotate({ identifier: "NodePoolAutoConfig" }) as any as Schema.Schema<NodePoolAutoConfig>;

export interface Cluster {
  /** Default NodePool settings for the entire cluster. These settings are overridden if specified on the specific NodePool object. */
  nodePoolDefaults?: NodePoolDefaults;
  /** The configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of the GKE cluster and take the ownership of the cluster. */
  parentProductConfig?: ParentProductConfig;
  /** Configuration for private cluster. */
  privateClusterConfig?: PrivateClusterConfig;
  /** Configuration for direct-path (via ALTS) with workload identity. This feature is not officially supported for external customers in Kubernetes Engine when using Workload Identity. */
  workloadAltsConfig?: WorkloadALTSConfig;
  /** The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This field provides a default value if [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) are not specified during node pool creation. Warning: changing cluster locations will update the [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) of all node pools and will result in nodes being added and/or removed. */
  locations?: Array<string>;
  /** The name of this cluster. The name must be unique within this project and location (e.g. zone or region), and can be up to 40 characters with the following restrictions: * Lowercase letters, numbers, and hyphens only. * Must start with a letter. * Must end with a number or a letter. */
  name?: string;
  /** Configuration of Confidential Nodes. All the nodes in the cluster will be Confidential VM once enabled. */
  confidentialNodes?: ConfidentialNodes;
  /** Configuration for the PodSecurityPolicy feature. */
  podSecurityPolicyConfig?: PodSecurityPolicyConfig;
  /** Secret CSI driver configuration. */
  secretManagerConfig?: SecretManagerConfig;
  /** Configuration for Binary Authorization. */
  binaryAuthorization?: BinaryAuthorization;
  /** Output only. Server-defined URL for the resource. */
  selfLink?: string;
  /** If this is a private cluster setup. Private clusters are clusters that, by default have no external IP addresses on the nodes and where nodes and the master communicate over private IP addresses. This field is deprecated, use private_cluster_config.enable_private_nodes instead. */
  privateCluster?: boolean;
  /** Notification configuration of the cluster. */
  notificationConfig?: NotificationConfig;
  /** Configuration for limiting anonymous access to all endpoints except the health checks. */
  anonymousAuthenticationConfig?: AnonymousAuthenticationConfig;
  /** Configuration controlling RBAC group membership information. */
  authenticatorGroupsConfig?: AuthenticatorGroupsConfig;
  /** Configuration for cluster IP allocation. */
  ipAllocationPolicy?: IPAllocationPolicy;
  /** Kubernetes open source beta apis enabled on the cluster. Only beta apis. */
  enableK8sBetaApis?: K8sBetaAPIConfig;
  /** The fingerprint of the set of labels for this cluster. */
  labelFingerprint?: string;
  /** The name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. If left unspecified, the `default` network will be used. On output this shows the network ID instead of the name. */
  network?: string;
  /** This checksum is computed by the server based on the value of cluster fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. */
  monitoringService?: string;
  /** Output only. Deprecated. Use node_pools.instance_group_urls. */
  instanceGroupUrls?: Array<string>;
  /** The rollback safe upgrade information of the cluster. This field is used when user manually triggers a rollback safe upgrade. */
  rollbackSafeUpgrade?: RollbackSafeUpgrade;
  /** Output only. The time the cluster was created, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  createTime?: string;
  /** Deprecated: Use SecurityPostureConfig instead. Enable/Disable Protect API features for the cluster. */
  protectConfig?: ProtectConfig;
  /** Release channel configuration. If left unspecified on cluster creation and a version is specified, the cluster is enrolled in the most mature release channel where the version is available (first checking STABLE, then REGULAR, and finally RAPID). Otherwise, if no release channel configuration and no version is specified, the cluster is enrolled in the REGULAR channel with its default version. */
  releaseChannel?: ReleaseChannel;
  /** Output only. The time the cluster will be automatically deleted in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  expireTime?: string;
  /** Configuration for sync Secret Manager secrets as k8s secrets. */
  secretSyncConfig?: SecretSyncConfig;
  /** Configuration for all cluster's control plane endpoints. */
  controlPlaneEndpointsConfig?: ControlPlaneEndpointsConfig;
  /** Configuration for cluster networking. */
  networkConfig?: NetworkConfig;
  /** An optional description of this cluster. */
  description?: string;
  /** Autopilot configuration for the cluster. */
  autopilot?: Autopilot;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created. */
  rbacBindingConfig?: RBACBindingConfig;
  /** Logging configuration for the cluster. */
  loggingConfig?: LoggingConfig;
  /** The IP address range of the container pods in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`). Leave blank to have one automatically chosen or specify a `/14` block in `10.0.0.0/8`. */
  clusterIpv4Cidr?: string;
  /** Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field is deprecated, use location instead. */
  zone?: string;
  /** Output only. The current emulated version of the master endpoint. The version is in minor version format, e.g. 1.30. No value or empty string means the cluster has no emulated version. */
  currentEmulatedVersion?: string;
  /** The IP prefix in CIDR notation to use for the hosted master network. This prefix will be used for assigning private IP addresses to the master or set of masters, as well as the ILB VIP. This field is deprecated, use private_cluster_config.master_ipv4_cidr_block instead. */
  masterIpv4CidrBlock?: string;
  /** Configuration for the use of Kubernetes Service Accounts in IAM policies. */
  workloadIdentityConfig?: WorkloadIdentityConfig;
  /** Parameters used in creating the cluster's nodes. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "initial_node_count") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. For responses, this field will be populated with the node configuration of the first node pool. (For configuration of each node pool, see `node_pool.config`) If unspecified, the defaults are used. This field is deprecated, use node_pool.config instead. */
  nodeConfig?: NodeConfig;
  /** Output only. The number of nodes currently in the cluster. Deprecated. Call Kubernetes API directly to retrieve node information. */
  currentNodeCount?: number;
  /** Configuration for exporting resource usages. Resource usage export is disabled when this config unspecified. */
  resourceUsageExportConfig?: ResourceUsageExportConfig;
  /** Output only. Deprecated, use [NodePool.version](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters.nodePools) instead. The current version of the node software components. If they are currently at multiple versions because they're in the process of being upgraded, this reflects the minimum version of all nodes. */
  currentNodeVersion?: string;
  /** Output only. Deprecated. Use conditions instead. Additional information about the current status of this cluster, if available. */
  statusMessage?: string;
  /** Configuration for issuance of mTLS keys and certificates to Kubernetes pods. */
  workloadCertificates?: WorkloadCertificates;
  /** The number of nodes to create in this cluster. You must ensure that your Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "node_config") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. This field is deprecated, use node_pool.initial_node_count instead. */
  initialNodeCount?: number;
  /** Output only. The IP address of this cluster's master endpoint. The endpoint can be accessed from the internet at `https://username:password@endpoint/`. See the `masterAuth` property of this resource for username and password information. */
  endpoint?: string;
  /** Which conditions caused the current cluster state. */
  conditions?: Array<StatusCondition>;
  /** The initial Kubernetes version for this cluster. Valid versions are those found in validMasterVersions returned by getServerConfig. The version can be upgraded over time; such upgrades are reflected in currentMasterVersion and currentNodeVersion. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "","-": picks the default Kubernetes version */
  initialClusterVersion?: string;
  /** Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or [region](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides. */
  location?: string;
  /** Configurations for the various addons available to run in the cluster. */
  addonsConfig?: AddonsConfig;
  /** Monitoring configuration for the cluster. */
  monitoringConfig?: MonitoringConfig;
  /** Configure the maintenance policy for this cluster. */
  maintenancePolicy?: MaintenancePolicy;
  /** The configuration options for master authorized networks feature. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.authorized_networks_config instead. */
  masterAuthorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /** Configuration for issuance of mTLS keys and certificates to Kubernetes pods. */
  meshCertificates?: MeshCertificates;
  /** Configuration options for the NetworkPolicy feature. */
  networkPolicy?: NetworkPolicy;
  /** The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. */
  loggingService?: string;
  /** Configuration for Identity Service component. */
  identityServiceConfig?: IdentityServiceConfig;
  /** Configuration for Managed OpenTelemetry pipeline. */
  managedOpentelemetryConfig?: ManagedOpenTelemetryConfig;
  /** Configuration for Cloud TPU support; This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. */
  tpuConfig?: TpuConfig;
  /** The Custom keys configuration for the cluster. */
  userManagedKeysConfig?: UserManagedKeysConfig;
  /** Output only. The current software version of the master endpoint. */
  currentMasterVersion?: string;
  /** The config for pod autoscaling. */
  podAutoscaling?: PodAutoscaling;
  /** Fleet information for the cluster. */
  fleet?: Fleet;
  /** Telemetry integration for the cluster. */
  clusterTelemetry?: ClusterTelemetry;
  /** Optional. Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. */
  compliancePostureConfig?: CompliancePostureConfig;
  /** Output only. The IP address range of the Cloud TPUs in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. */
  tpuIpv4CidrBlock?: string;
  /** The name of the Google Compute Engine [subnetwork](https://cloud.google.com/compute/docs/subnetworks) to which the cluster is connected. On output this shows the subnetwork ID instead of the name. */
  subnetwork?: string;
  /** The node pools associated with this cluster. This field should not be set if "node_config" or "initial_node_count" are specified. */
  nodePools?: Array<NodePool>;
  /** Shielded Nodes configuration. */
  shieldedNodes?: ShieldedNodes;
  /** Output only. The current status of this cluster. */
  status?: "STATUS_UNSPECIFIED" | "PROVISIONING" | "RUNNING" | "RECONCILING" | "STOPPING" | "ERROR" | "DEGRADED" | (string & {});
  /** The resource labels for the cluster to use to annotate any related Google Compute Engine resources. */
  resourceLabels?: Record<string, string>;
  /** Configuration for the fine-grained cost management feature. */
  costManagementConfig?: CostManagementConfig;
  /** Configuration for GKE auto upgrades. */
  gkeAutoUpgradeConfig?: GkeAutoUpgradeConfig;
  /** Output only. Unique id for the cluster. */
  id?: string;
  /** Kubernetes alpha features are enabled on this cluster. This includes alpha API groups (e.g. v1beta1) and features that may not be production ready in the kubernetes version of the master and nodes. The cluster has no SLA for uptime and master/node upgrades are disabled. Alpha enabled clusters are automatically deleted thirty days after creation. */
  enableKubernetesAlpha?: boolean;
  /** Optional. Enable/Disable Security Posture API features for the cluster. */
  securityPostureConfig?: SecurityPostureConfig;
  /** Cluster-level Vertical Pod Autoscaling configuration. */
  verticalPodAutoscaling?: VerticalPodAutoscaling;
  /** GKE Enterprise Configuration. Deprecated: GKE Enterprise features are now available without an Enterprise tier. */
  enterpriseConfig?: EnterpriseConfig;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** The list of user specified Kubernetes feature gates. Each string represents the activation status of a feature gate (e.g. "featureX=true" or "featureX=false") */
  alphaClusterFeatureGates?: Array<string>;
  /** Cluster-level autoscaling configuration. */
  autoscaling?: ClusterAutoscaling;
  /** Configuration of etcd encryption. */
  databaseEncryption?: DatabaseEncryption;
  /** Output only. The IP address range of the Kubernetes services in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). Service addresses are typically put in the last `/16` from the container CIDR. */
  servicesIpv4Cidr?: string;
  /** The default constraint on the maximum number of pods that can be run simultaneously on a node in the node pool of this cluster. Only honored if cluster created with IP Alias support. */
  defaultMaxPodsConstraint?: MaxPodsConstraint;
  /** Configuration for the legacy ABAC authorization mode. */
  legacyAbac?: LegacyAbac;
  /** The authentication information for accessing the master endpoint. If unspecified, the defaults are used: For clusters before v1.12, if master_auth is unspecified, `username` will be set to "admin", a random password will be generated, and a client certificate will be issued. */
  masterAuth?: MasterAuth;
  /** Enable the ability to use Cloud TPUs in this cluster. This field is deprecated, use tpu_config.enabled instead. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. */
  enableTpu?: boolean;
  /** Configuration for master components. */
  master?: Master;
  /** Node pool configs that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. */
  nodePoolAutoConfig?: NodePoolAutoConfig;
  /** Output only. The size of the address space on each node for hosting containers. This is provisioned from within the `container_ipv4_cidr` range. This field will only be set when cluster is in route-based network mode. */
  nodeIpv4CidrSize?: number;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() => Schema.Struct({
  nodePoolDefaults: Schema.optional(NodePoolDefaults),
  parentProductConfig: Schema.optional(ParentProductConfig),
  privateClusterConfig: Schema.optional(PrivateClusterConfig),
  workloadAltsConfig: Schema.optional(WorkloadALTSConfig),
  locations: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  confidentialNodes: Schema.optional(ConfidentialNodes),
  podSecurityPolicyConfig: Schema.optional(PodSecurityPolicyConfig),
  secretManagerConfig: Schema.optional(SecretManagerConfig),
  binaryAuthorization: Schema.optional(BinaryAuthorization),
  selfLink: Schema.optional(Schema.String),
  privateCluster: Schema.optional(Schema.Boolean),
  notificationConfig: Schema.optional(NotificationConfig),
  anonymousAuthenticationConfig: Schema.optional(AnonymousAuthenticationConfig),
  authenticatorGroupsConfig: Schema.optional(AuthenticatorGroupsConfig),
  ipAllocationPolicy: Schema.optional(IPAllocationPolicy),
  enableK8sBetaApis: Schema.optional(K8sBetaAPIConfig),
  labelFingerprint: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  monitoringService: Schema.optional(Schema.String),
  instanceGroupUrls: Schema.optional(Schema.Array(Schema.String)),
  rollbackSafeUpgrade: Schema.optional(RollbackSafeUpgrade),
  createTime: Schema.optional(Schema.String),
  protectConfig: Schema.optional(ProtectConfig),
  releaseChannel: Schema.optional(ReleaseChannel),
  expireTime: Schema.optional(Schema.String),
  secretSyncConfig: Schema.optional(SecretSyncConfig),
  controlPlaneEndpointsConfig: Schema.optional(ControlPlaneEndpointsConfig),
  networkConfig: Schema.optional(NetworkConfig),
  description: Schema.optional(Schema.String),
  autopilot: Schema.optional(Autopilot),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  rbacBindingConfig: Schema.optional(RBACBindingConfig),
  loggingConfig: Schema.optional(LoggingConfig),
  clusterIpv4Cidr: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  currentEmulatedVersion: Schema.optional(Schema.String),
  masterIpv4CidrBlock: Schema.optional(Schema.String),
  workloadIdentityConfig: Schema.optional(WorkloadIdentityConfig),
  nodeConfig: Schema.optional(NodeConfig),
  currentNodeCount: Schema.optional(Schema.Number),
  resourceUsageExportConfig: Schema.optional(ResourceUsageExportConfig),
  currentNodeVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  workloadCertificates: Schema.optional(WorkloadCertificates),
  initialNodeCount: Schema.optional(Schema.Number),
  endpoint: Schema.optional(Schema.String),
  conditions: Schema.optional(Schema.Array(StatusCondition)),
  initialClusterVersion: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  addonsConfig: Schema.optional(AddonsConfig),
  monitoringConfig: Schema.optional(MonitoringConfig),
  maintenancePolicy: Schema.optional(MaintenancePolicy),
  masterAuthorizedNetworksConfig: Schema.optional(MasterAuthorizedNetworksConfig),
  meshCertificates: Schema.optional(MeshCertificates),
  networkPolicy: Schema.optional(NetworkPolicy),
  loggingService: Schema.optional(Schema.String),
  identityServiceConfig: Schema.optional(IdentityServiceConfig),
  managedOpentelemetryConfig: Schema.optional(ManagedOpenTelemetryConfig),
  tpuConfig: Schema.optional(TpuConfig),
  userManagedKeysConfig: Schema.optional(UserManagedKeysConfig),
  currentMasterVersion: Schema.optional(Schema.String),
  podAutoscaling: Schema.optional(PodAutoscaling),
  fleet: Schema.optional(Fleet),
  clusterTelemetry: Schema.optional(ClusterTelemetry),
  compliancePostureConfig: Schema.optional(CompliancePostureConfig),
  tpuIpv4CidrBlock: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  nodePools: Schema.optional(Schema.Array(NodePool)),
  shieldedNodes: Schema.optional(ShieldedNodes),
  status: Schema.optional(Schema.String),
  resourceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  costManagementConfig: Schema.optional(CostManagementConfig),
  gkeAutoUpgradeConfig: Schema.optional(GkeAutoUpgradeConfig),
  id: Schema.optional(Schema.String),
  enableKubernetesAlpha: Schema.optional(Schema.Boolean),
  securityPostureConfig: Schema.optional(SecurityPostureConfig),
  verticalPodAutoscaling: Schema.optional(VerticalPodAutoscaling),
  enterpriseConfig: Schema.optional(EnterpriseConfig),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  alphaClusterFeatureGates: Schema.optional(Schema.Array(Schema.String)),
  autoscaling: Schema.optional(ClusterAutoscaling),
  databaseEncryption: Schema.optional(DatabaseEncryption),
  servicesIpv4Cidr: Schema.optional(Schema.String),
  defaultMaxPodsConstraint: Schema.optional(MaxPodsConstraint),
  legacyAbac: Schema.optional(LegacyAbac),
  masterAuth: Schema.optional(MasterAuth),
  enableTpu: Schema.optional(Schema.Boolean),
  master: Schema.optional(Master),
  nodePoolAutoConfig: Schema.optional(NodePoolAutoConfig),
  nodeIpv4CidrSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ResourceLabels {
  /** Map of node label keys and node label values. */
  labels?: Record<string, string>;
}

export const ResourceLabels: Schema.Schema<ResourceLabels> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ResourceLabels" }) as any as Schema.Schema<ResourceLabels>;

export interface NodeTaints {
  /** List of node taints. */
  taints?: Array<NodeTaint>;
}

export const NodeTaints: Schema.Schema<NodeTaints> = Schema.suspend(() => Schema.Struct({
  taints: Schema.optional(Schema.Array(NodeTaint)),
})).annotate({ identifier: "NodeTaints" }) as any as Schema.Schema<NodeTaints>;

export interface NodeLabels {
  /** Map of node label keys and node label values. */
  labels?: Record<string, string>;
}

export const NodeLabels: Schema.Schema<NodeLabels> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "NodeLabels" }) as any as Schema.Schema<NodeLabels>;

export interface UpdateNodePoolRequest {
  /** Enable or disable gvnic on the node pool. */
  gvnic?: VirtualNIC;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Upgrade settings control disruption and speed of the upgrade. */
  upgradeSettings?: UpgradeSettings;
  /** The desired containerd config for nodes in the node pool. Initiates an upgrade operation that recreates the nodes with the new config. */
  containerdConfig?: ContainerdConfig;
  /** Optional. The desired disk type for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified disk type. */
  diskType?: string;
  /** Enable or disable NCCL fast socket for the node pool. */
  fastSocket?: FastSocket;
  /** Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** Node kubelet configs. */
  kubeletConfig?: NodeKubeletConfig;
  /** The desired node drain configuration for nodes in the node pool. */
  nodeDrainConfig?: NodeDrainConfig;
  /** Confidential nodes config. All the nodes in the node pool will be Confidential VM once enabled. */
  confidentialNodes?: ConfidentialNodes;
  /** GCFS config. */
  gcfsConfig?: GcfsConfig;
  /** The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the node pool's nodes should be located. Changing the locations for a node pool will result in nodes being either created or removed from the node pool, depending on whether locations are being added or removed. Warning: It is recommended to update node pool locations in a standalone API call. Do not combine a location update with changes to other fields (such as `tags`, `labels`, `taints`, etc.) in the same request. Otherwise, the API performs a structural modification where changes to other fields will only apply to newly created nodes and will not be applied to existing nodes in the node pool. To ensure all nodes are updated consistently, use a separate API call for location changes. */
  locations?: Array<string>;
  /** Flex Start flag for enabling Flex Start VM. */
  flexStart?: boolean;
  /** Required. The desired image type for the node pool. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types. */
  imageType?: string;
  /** The resource labels for the node pool to use to annotate any related Google Compute Engine resources. */
  resourceLabels?: ResourceLabels;
  /** Required. The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version */
  nodeVersion?: string;
  /** List of Storage Pools where boot disks are provisioned. Existing Storage Pools will be replaced with storage-pools. */
  storagePools?: Array<string>;
  /** The desired boot disk config for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified boot disk config. */
  bootDisk?: BootDisk;
  /** The desired network tags to be applied to all nodes in the node pool. If this field is not present, the tags will not be changed. Otherwise, the existing network tags will be *replaced* with the provided tags. */
  tags?: NetworkTags;
  /** Logging configuration. */
  loggingConfig?: NodePoolLoggingConfig;
  /** Optional. The desired disk size for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified disk size. */
  diskSizeGb?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Parameters that can be configured on Linux nodes. */
  linuxNodeConfig?: LinuxNodeConfig;
  /** Specifies the configuration of queued provisioning. */
  queuedProvisioning?: QueuedProvisioning;
  /** Node network config. */
  nodeNetworkConfig?: NodeNetworkConfig;
  /** The desired workload metadata config for the node pool. */
  workloadMetadataConfig?: WorkloadMetadataConfig;
  /** The name (project, location, cluster, node pool) of the node pool to update. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
  /** A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs. */
  accelerators?: Array<AcceleratorConfig>;
  /** Optional. The desired machine type for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified machine type. */
  machineType?: string;
  /** The desired node taints to be applied to all nodes in the node pool. If this field is not present, the taints will not be changed. Otherwise, the existing node taints will be *replaced* with the provided taints. */
  taints?: NodeTaints;
  /** Parameters that can be configured on Windows nodes. */
  windowsNodeConfig?: WindowsNodeConfig;
  /** The current etag of the node pool. If an etag is provided and does not match the current etag of the node pool, update will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Desired resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Existing tags will be replaced with new values. */
  resourceManagerTags?: ResourceManagerTags;
  /** The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely. */
  maxRunDuration?: string;
  /** Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile. */
  consolidationDelay?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** The desired node labels to be applied to all nodes in the node pool. If this field is not present, the labels will not be changed. Otherwise, the existing node labels will be *replaced* with the provided labels. */
  labels?: NodeLabels;
}

export const UpdateNodePoolRequest: Schema.Schema<UpdateNodePoolRequest> = Schema.suspend(() => Schema.Struct({
  gvnic: Schema.optional(VirtualNIC),
  projectId: Schema.optional(Schema.String),
  upgradeSettings: Schema.optional(UpgradeSettings),
  containerdConfig: Schema.optional(ContainerdConfig),
  diskType: Schema.optional(Schema.String),
  fastSocket: Schema.optional(FastSocket),
  nodePoolId: Schema.optional(Schema.String),
  kubeletConfig: Schema.optional(NodeKubeletConfig),
  nodeDrainConfig: Schema.optional(NodeDrainConfig),
  confidentialNodes: Schema.optional(ConfidentialNodes),
  gcfsConfig: Schema.optional(GcfsConfig),
  locations: Schema.optional(Schema.Array(Schema.String)),
  flexStart: Schema.optional(Schema.Boolean),
  imageType: Schema.optional(Schema.String),
  resourceLabels: Schema.optional(ResourceLabels),
  nodeVersion: Schema.optional(Schema.String),
  storagePools: Schema.optional(Schema.Array(Schema.String)),
  bootDisk: Schema.optional(BootDisk),
  tags: Schema.optional(NetworkTags),
  loggingConfig: Schema.optional(NodePoolLoggingConfig),
  diskSizeGb: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  linuxNodeConfig: Schema.optional(LinuxNodeConfig),
  queuedProvisioning: Schema.optional(QueuedProvisioning),
  nodeNetworkConfig: Schema.optional(NodeNetworkConfig),
  workloadMetadataConfig: Schema.optional(WorkloadMetadataConfig),
  name: Schema.optional(Schema.String),
  accelerators: Schema.optional(Schema.Array(AcceleratorConfig)),
  machineType: Schema.optional(Schema.String),
  taints: Schema.optional(NodeTaints),
  windowsNodeConfig: Schema.optional(WindowsNodeConfig),
  etag: Schema.optional(Schema.String),
  resourceManagerTags: Schema.optional(ResourceManagerTags),
  maxRunDuration: Schema.optional(Schema.String),
  consolidationDelay: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  labels: Schema.optional(NodeLabels),
})).annotate({ identifier: "UpdateNodePoolRequest" }) as any as Schema.Schema<UpdateNodePoolRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SecurityBulletinEvent {
  /** This represents a version selected from the patched_versions field that the cluster receiving this notification should most likely want to upgrade to based on its current version. Note that if this notification is being received by a given cluster, it means that this version is currently available as an upgrade target in that cluster's location. */
  suggestedUpgradeTarget?: string;
  /** If this field is specified, it means there are manual steps that the user must take to make their clusters safe. */
  manualStepsRequired?: boolean;
  /** The GKE versions where this vulnerability is patched. */
  patchedVersions?: Array<string>;
  /** The GKE versions where this vulnerability is mitigated. */
  mitigatedVersions?: Array<string>;
  /** A brief description of the bulletin. See the bulletin pointed to by the bulletin_uri field for an expanded description. */
  briefDescription?: string;
  /** The CVEs associated with this bulletin. */
  cveIds?: Array<string>;
  /** The resource type (node/control plane) that has the vulnerability. Multiple notifications (1 notification per resource type) will be sent for a vulnerability that affects > 1 resource type. */
  resourceTypeAffected?: string;
  /** The URI link to the bulletin on the website for more information. */
  bulletinUri?: string;
  /** The GKE minor versions affected by this vulnerability. */
  affectedSupportedMinors?: Array<string>;
  /** The ID of the bulletin corresponding to the vulnerability. */
  bulletinId?: string;
  /** The severity of this bulletin as it relates to GKE. */
  severity?: string;
}

export const SecurityBulletinEvent: Schema.Schema<SecurityBulletinEvent> = Schema.suspend(() => Schema.Struct({
  suggestedUpgradeTarget: Schema.optional(Schema.String),
  manualStepsRequired: Schema.optional(Schema.Boolean),
  patchedVersions: Schema.optional(Schema.Array(Schema.String)),
  mitigatedVersions: Schema.optional(Schema.Array(Schema.String)),
  briefDescription: Schema.optional(Schema.String),
  cveIds: Schema.optional(Schema.Array(Schema.String)),
  resourceTypeAffected: Schema.optional(Schema.String),
  bulletinUri: Schema.optional(Schema.String),
  affectedSupportedMinors: Schema.optional(Schema.Array(Schema.String)),
  bulletinId: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityBulletinEvent" }) as any as Schema.Schema<SecurityBulletinEvent>;

export interface SetMasterAuthRequest {
  /** Required. A description of the update. */
  update?: MasterAuth;
  /** Required. The exact form of action to be taken on the master auth. */
  action?: "UNKNOWN" | "SET_PASSWORD" | "GENERATE_PASSWORD" | "SET_USERNAME" | (string & {});
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** The name (project, location, cluster) of the cluster to set auth. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
}

export const SetMasterAuthRequest: Schema.Schema<SetMasterAuthRequest> = Schema.suspend(() => Schema.Struct({
  update: Schema.optional(MasterAuth),
  action: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SetMasterAuthRequest" }) as any as Schema.Schema<SetMasterAuthRequest>;

export interface Metric {
  /** For metrics with integer value. */
  intValue?: string;
  /** For metrics with floating point value. */
  doubleValue?: number;
  /** Required. Metric name, e.g., "nodes total", "percent done". */
  name?: string;
  /** For metrics with custom values (ratios, visual progress, etc.). */
  stringValue?: string;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() => Schema.Struct({
  intValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
})).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface OperationProgress {
  /** Status of an operation stage. Unset for single-stage operations. */
  status?: "STATUS_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | "ABORTING" | (string & {});
  /** Substages of an operation or a stage. */
  stages?: Array<OperationProgress>;
  /** Progress metric bundle, for example: metrics: [{name: "nodes done", int_value: 15}, {name: "nodes total", int_value: 32}] or metrics: [{name: "progress", double_value: 0.56}, {name: "progress scale", double_value: 1.0}] */
  metrics?: Array<Metric>;
  /** A non-parameterized string describing an operation stage. Unset for single-stage operations. */
  name?: string;
}

export const OperationProgress: Schema.Schema<OperationProgress> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  stages: Schema.optional(Schema.Array(OperationProgress)),
  metrics: Schema.optional(Schema.Array(Metric)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationProgress" }) as any as Schema.Schema<OperationProgress>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** Output only. If an error has occurred, a textual description of the error. Deprecated. Use field error instead. */
  statusMessage?: string;
  /** Output only. Server-defined URI for the target of the operation. The format of this is a URI to the resource being modified (such as a cluster, node pool, or node). For node pool repairs, there may be multiple nodes being repaired, but only one will be the target. Examples: - ## `https://container.googleapis.com/v1/projects/123/locations/us-central1/clusters/my-cluster` ## `https://container.googleapis.com/v1/projects/123/zones/us-central1-c/clusters/my-cluster/nodePools/my-np` `https://container.googleapis.com/v1/projects/123/zones/us-central1-c/clusters/my-cluster/nodePools/my-np/node/my-node` */
  targetLink?: string;
  /** Output only. Server-defined URI for the operation. Example: `https://container.googleapis.com/v1alpha1/projects/123/locations/us-central1/operations/operation-123`. */
  selfLink?: string;
  /** Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or [region](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides. */
  location?: string;
  /** Which conditions caused the current node pool state. Deprecated. Use field error instead. */
  nodepoolConditions?: Array<StatusCondition>;
  /** Output only. The time the operation completed, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  endTime?: string;
  /** Output only. The operation type. */
  operationType?: "TYPE_UNSPECIFIED" | "CREATE_CLUSTER" | "DELETE_CLUSTER" | "UPGRADE_MASTER" | "UPGRADE_NODES" | "REPAIR_CLUSTER" | "UPDATE_CLUSTER" | "CREATE_NODE_POOL" | "DELETE_NODE_POOL" | "SET_NODE_POOL_MANAGEMENT" | "AUTO_REPAIR_NODES" | "AUTO_UPGRADE_NODES" | "SET_LABELS" | "SET_MASTER_AUTH" | "SET_NODE_POOL_SIZE" | "SET_NETWORK_POLICY" | "SET_MAINTENANCE_POLICY" | "RESIZE_CLUSTER" | "FLEET_FEATURE_UPGRADE" | (string & {});
  /** Output only. Progress information for an operation. */
  progress?: OperationProgress;
  /** Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the operation is taking place. This field is deprecated, use location instead. */
  zone?: string;
  /** Output only. Detailed operation progress, if available. */
  detail?: string;
  /** Output only. The time the operation started, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format. */
  startTime?: string;
  /** Output only. The server-assigned ID for the operation. */
  name?: string;
  /** Which conditions caused the current cluster state. Deprecated. Use field error instead. */
  clusterConditions?: Array<StatusCondition>;
  /** Output only. The current status of the operation. */
  status?: "STATUS_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | "ABORTING" | (string & {});
  /** The error result of the operation in case of failure. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  statusMessage: Schema.optional(Schema.String),
  targetLink: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  nodepoolConditions: Schema.optional(Schema.Array(StatusCondition)),
  endTime: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
  zone: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  clusterConditions: Schema.optional(Schema.Array(StatusCondition)),
  status: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations in the project in the specified zone. */
  operations?: Array<Operation>;
  /** If any zones are listed here, the list of operations returned may be missing the operations from those zones. */
  missingZones?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  missingZones: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface ILBSubsettingConfig {
  /** Enables l4 ILB subsetting for this cluster */
  enabled?: boolean;
}

export const ILBSubsettingConfig: Schema.Schema<ILBSubsettingConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ILBSubsettingConfig" }) as any as Schema.Schema<ILBSubsettingConfig>;

export interface SetNetworkPolicyRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Required. Configuration options for the NetworkPolicy feature. */
  networkPolicy?: NetworkPolicy;
  /** The name (project, location, cluster name) of the cluster to set networking policy. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
}

export const SetNetworkPolicyRequest: Schema.Schema<SetNetworkPolicyRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  networkPolicy: Schema.optional(NetworkPolicy),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SetNetworkPolicyRequest" }) as any as Schema.Schema<SetNetworkPolicyRequest>;

export interface Jwk {
  /** Key ID. */
  kid?: string;
  /** Permitted uses for the public keys. */
  use?: string;
  /** Used for RSA keys. */
  n?: string;
  /** Used for ECDSA keys. */
  crv?: string;
  /** Used for ECDSA keys. */
  y?: string;
  /** Used for RSA keys. */
  e?: string;
  /** Used for ECDSA keys. */
  x?: string;
  /** Algorithm. */
  alg?: string;
  /** Key Type. */
  kty?: string;
}

export const Jwk: Schema.Schema<Jwk> = Schema.suspend(() => Schema.Struct({
  kid: Schema.optional(Schema.String),
  use: Schema.optional(Schema.String),
  n: Schema.optional(Schema.String),
  crv: Schema.optional(Schema.String),
  y: Schema.optional(Schema.String),
  e: Schema.optional(Schema.String),
  x: Schema.optional(Schema.String),
  alg: Schema.optional(Schema.String),
  kty: Schema.optional(Schema.String),
})).annotate({ identifier: "Jwk" }) as any as Schema.Schema<Jwk>;

export interface AvailableVersion {
  /** Kubernetes version. */
  version?: string;
  /** Reason for availability. */
  reason?: string;
}

export const AvailableVersion: Schema.Schema<AvailableVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "AvailableVersion" }) as any as Schema.Schema<AvailableVersion>;

export interface StartIPRotationRequest {
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project, location, cluster name) of the cluster to start IP rotation. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Whether to rotate credentials during IP rotation. */
  rotateCredentials?: boolean;
}

export const StartIPRotationRequest: Schema.Schema<StartIPRotationRequest> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  rotateCredentials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StartIPRotationRequest" }) as any as Schema.Schema<StartIPRotationRequest>;

export interface PdbBlockedPod {
  /** The namespace of the pod. */
  namespace?: string;
  /** The name of the pod. */
  name?: string;
}

export const PdbBlockedPod: Schema.Schema<PdbBlockedPod> = Schema.suspend(() => Schema.Struct({
  namespace: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "PdbBlockedPod" }) as any as Schema.Schema<PdbBlockedPod>;

export interface DisruptionEvent {
  /** The type of the disruption event. */
  disruptionType?: "DISRUPTION_TYPE_UNSPECIFIED" | "POD_NOT_ENOUGH_PDB" | "POD_PDB_VIOLATION" | (string & {});
  /** The node whose drain is blocked by PDB. This field is set for both POD_PDB_VIOLATION and POD_NOT_ENOUGH_PDB event. */
  pdbBlockedNode?: string;
  /** The pods whose evictions are blocked by PDB. This field is set for both POD_PDB_VIOLATION and POD_NOT_ENOUGH_PDB event. */
  pdbBlockedPod?: Array<PdbBlockedPod>;
  /** The timeout in seconds for which the node drain is blocked by PDB. After this timeout, pods are forcefully evicted. This field is only populated when event_type is POD_PDB_VIOLATION. */
  pdbViolationTimeout?: string;
}

export const DisruptionEvent: Schema.Schema<DisruptionEvent> = Schema.suspend(() => Schema.Struct({
  disruptionType: Schema.optional(Schema.String),
  pdbBlockedNode: Schema.optional(Schema.String),
  pdbBlockedPod: Schema.optional(Schema.Array(PdbBlockedPod)),
  pdbViolationTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "DisruptionEvent" }) as any as Schema.Schema<DisruptionEvent>;

export interface Location {
  /** Contains the name of the resource requested. Specified in the format `projects/* /locations/*`. */
  name?: string;
  /** Contains the type of location this Location is for. Regional or Zonal. */
  type?: "LOCATION_TYPE_UNSPECIFIED" | "ZONE" | "REGION" | (string & {});
  /** Whether the location is recommended for GKE cluster scheduling. */
  recommended?: boolean;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  recommended: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** Only return ListLocationsResponse that occur after the page_token. This value should be populated from the ListLocationsResponse.next_page_token if that response token was set (which happens when listing more Locations than fit in a single ListLocationsResponse). */
  nextPageToken?: string;
  /** A full list of GKE locations. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface CompleteControlPlaneUpgradeRequest {
  /** API request version that initiates this operation. */
  version?: string;
}

export const CompleteControlPlaneUpgradeRequest: Schema.Schema<CompleteControlPlaneUpgradeRequest> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "CompleteControlPlaneUpgradeRequest" }) as any as Schema.Schema<CompleteControlPlaneUpgradeRequest>;

export interface IntraNodeVisibilityConfig {
  /** Enables intra node visibility for this cluster. */
  enabled?: boolean;
}

export const IntraNodeVisibilityConfig: Schema.Schema<IntraNodeVisibilityConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IntraNodeVisibilityConfig" }) as any as Schema.Schema<IntraNodeVisibilityConfig>;

export interface CancelOperationRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the operation resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** The name (project, location, operation id) of the operation to cancel. Specified in the format `projects/* /locations/* /operations/*`. */
  name?: string;
  /** Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. */
  operationId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  operationId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface CreateNodePoolRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId?: string;
  /** Required. The node pool to create. */
  nodePool?: NodePool;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. */
  zone?: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. */
  clusterId?: string;
  /** The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/* /locations/* /clusters/*`. */
  parent?: string;
}

export const CreateNodePoolRequest: Schema.Schema<CreateNodePoolRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  nodePool: Schema.optional(NodePool),
  zone: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateNodePoolRequest" }) as any as Schema.Schema<CreateNodePoolRequest>;

export interface CreateClusterRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. */
  zone?: string;
  /** Required. A [cluster resource](https://cloud.google.com/container-engine/reference/rest/v1beta1/projects.locations.clusters) */
  cluster?: Cluster;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId?: string;
  /** The parent (project and location) where the cluster will be created. Specified in the format `projects/* /locations/*`. */
  parent?: string;
}

export const CreateClusterRequest: Schema.Schema<CreateClusterRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  cluster: Schema.optional(Cluster),
  projectId: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateClusterRequest" }) as any as Schema.Schema<CreateClusterRequest>;

export interface DesiredAdditionalIPRangesConfig {
  /** List of additional IP ranges configs where each AdditionalIPRangesConfig corresponds to one subnetwork's IP ranges */
  additionalIpRangesConfigs?: Array<AdditionalIPRangesConfig>;
}

export const DesiredAdditionalIPRangesConfig: Schema.Schema<DesiredAdditionalIPRangesConfig> = Schema.suspend(() => Schema.Struct({
  additionalIpRangesConfigs: Schema.optional(Schema.Array(AdditionalIPRangesConfig)),
})).annotate({ identifier: "DesiredAdditionalIPRangesConfig" }) as any as Schema.Schema<DesiredAdditionalIPRangesConfig>;

export interface CompleteIPRotationRequest {
  /** The name (project, location, cluster name) of the cluster to complete IP rotation. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const CompleteIPRotationRequest: Schema.Schema<CompleteIPRotationRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "CompleteIPRotationRequest" }) as any as Schema.Schema<CompleteIPRotationRequest>;

export interface DesiredEnterpriseConfig {
  /** desired_tier specifies the desired tier of the cluster. */
  desiredTier?: "CLUSTER_TIER_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | (string & {});
}

export const DesiredEnterpriseConfig: Schema.Schema<DesiredEnterpriseConfig> = Schema.suspend(() => Schema.Struct({
  desiredTier: Schema.optional(Schema.String),
})).annotate({ identifier: "DesiredEnterpriseConfig" }) as any as Schema.Schema<DesiredEnterpriseConfig>;

export interface ClusterUpdate {
  /** The desired network performance config. */
  desiredNetworkPerformanceConfig?: ClusterNetworkPerformanceConfig;
  /** The desired rollback safe upgrade configuration. */
  desiredRollbackSafeUpgrade?: RollbackSafeUpgrade;
  /** The desired configuration options for the Binary Authorization feature. */
  desiredBinaryAuthorization?: BinaryAuthorization;
  /** Cluster-level autoscaling configuration. */
  desiredClusterAutoscaling?: ClusterAutoscaling;
  /** The desired logging configuration. */
  desiredLoggingConfig?: LoggingConfig;
  /** The desired private cluster configuration. master_global_access_config is the only field that can be changed via this field. See also ClusterUpdate.desired_enable_private_endpoint for modifying other fields within PrivateClusterConfig. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.global_access instead. */
  desiredPrivateClusterConfig?: PrivateClusterConfig;
  /** The desired configuration for exporting resource usage. */
  desiredResourceUsageExportConfig?: ResourceUsageExportConfig;
  /** The desired stack type of the cluster. If a stack type is provided and does not match the current stack type of the cluster, update will attempt to change the stack type to the new type. */
  desiredStackType?: "STACK_TYPE_UNSPECIFIED" | "IPV4" | "IPV4_IPV6" | (string & {});
  /** ServiceExternalIPsConfig specifies the config for the use of Services with ExternalIPs field. */
  desiredServiceExternalIpsConfig?: ServiceExternalIPsConfig;
  /** Enable/Disable private endpoint for the cluster's master. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true. */
  desiredEnablePrivateEndpoint?: boolean;
  /** The desired configuration options for the PodSecurityPolicy feature. */
  desiredPodSecurityPolicyConfig?: PodSecurityPolicyConfig;
  /** Configuration for issuance of mTLS keys and certificates to Kubernetes pods. */
  desiredMeshCertificates?: MeshCertificates;
  /** The node pool to be upgraded. This field is mandatory if "desired_node_version", "desired_image_family", "desired_node_pool_autoscaling", or "desired_workload_metadata_config" is specified and there is more than one node pool on the cluster. */
  desiredNodePoolId?: string;
  /** The additional pod ranges that are to be removed from the cluster. The pod ranges specified here must have been specified earlier in the 'additional_pod_ranges_config' argument. */
  removedAdditionalPodRangesConfig?: AdditionalPodRangesConfig;
  /** The desired release channel configuration. */
  desiredReleaseChannel?: ReleaseChannel;
  /** Configuration for limiting anonymous access to all endpoints except the health checks. */
  desiredAnonymousAuthenticationConfig?: AnonymousAuthenticationConfig;
  /** Enable/Disable Multi-Networking for the cluster */
  desiredEnableMultiNetworking?: boolean;
  /** Deprecated: Use DesiredSecurityPostureConfig instead. Enable/Disable Protect API features for the cluster. */
  desiredProtectConfig?: ProtectConfig;
  /** The desired GCFS config for the cluster. */
  desiredGcfsConfig?: GcfsConfig;
  /** The desired node kubelet config for the cluster. */
  desiredNodeKubeletConfig?: NodeKubeletConfig;
  /** Beta APIs enabled for cluster. */
  desiredK8sBetaApis?: K8sBetaAPIConfig;
  /** The desired notification configuration. */
  desiredNotificationConfig?: NotificationConfig;
  /** The desired network tags that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. */
  desiredNodePoolAutoConfigNetworkTags?: NetworkTags;
  /** Configurations for the various addons available to run in the cluster. */
  desiredAddonsConfig?: AddonsConfig;
  /** The desired node pool logging configuration defaults for the cluster. */
  desiredNodePoolLoggingConfig?: NodePoolLoggingConfig;
  /** Cluster-level Vertical Pod Autoscaling configuration. */
  desiredVerticalPodAutoscaling?: VerticalPodAutoscaling;
  /** The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. */
  desiredLoggingService?: string;
  /** Configuration for master components. */
  desiredMaster?: Master;
  /** Configuration for issuance of mTLS keys and certificates to Kubernetes pods. */
  desiredWorkloadCertificates?: WorkloadCertificates;
  /** The desired L4 Internal Load Balancer Subsetting configuration. */
  desiredL4ilbSubsettingConfig?: ILBSubsettingConfig;
  /** Enable/Disable Cilium Clusterwide Network Policy for the cluster. */
  desiredEnableCiliumClusterwideNetworkPolicy?: boolean;
  /** Enable/Disable Secret Manager Config. */
  desiredSecretManagerConfig?: SecretManagerConfig;
  /** AuthenticatorGroupsConfig specifies the config for the cluster security groups settings. */
  desiredAuthenticatorGroupsConfig?: AuthenticatorGroupsConfig;
  /** The desired configuration options for master authorized networks feature. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.authorized_networks_config instead. */
  desiredMasterAuthorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /** Enable/Disable FQDN Network Policy for the cluster. */
  desiredEnableFqdnNetworkPolicy?: boolean;
  /** Override the default setting of whether future created nodes have private IP addresses only, namely NetworkConfig.default_enable_private_nodes */
  desiredDefaultEnablePrivateNodes?: boolean;
  /** The desired image type for the node pool. NOTE: Set the "desired_node_pool" field as well. */
  desiredImageType?: string;
  /** The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. */
  desiredMonitoringService?: string;
  /** The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version */
  desiredNodeVersion?: string;
  /** Configuration for sync Secret Manager secrets as k8s secrets. */
  desiredSecretSyncConfig?: SecretSyncConfig;
  /** The desired resource manager tags that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. */
  desiredNodePoolAutoConfigResourceManagerTags?: ResourceManagerTags;
  /** Autoscaler configuration for the node pool specified in desired_node_pool_id. If there is only one pool in the cluster and desired_node_pool_id is not provided then the change applies to that single node pool. */
  desiredNodePoolAutoscaling?: NodePoolAutoscaling;
  /** Kubernetes open source beta apis enabled on the cluster. Only beta apis */
  enableK8sBetaApis?: K8sBetaAPIConfig;
  /** Configuration for Workload Identity. */
  desiredWorkloadIdentityConfig?: WorkloadIdentityConfig;
  /** DNSConfig contains clusterDNS config for this cluster. */
  desiredDnsConfig?: DNSConfig;
  /** RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created. */
  desiredRbacBindingConfig?: RBACBindingConfig;
  /** The desired state of IPv6 connectivity to Google Services. */
  desiredPrivateIpv6GoogleAccess?: "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED" | "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED" | "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE" | "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL" | (string & {});
  /** Configuration for Shielded Nodes. */
  desiredShieldedNodes?: ShieldedNodes;
  /** The desired parent product config for the cluster. */
  desiredParentProductConfig?: ParentProductConfig;
  /** The desired containerd config for the cluster. */
  desiredContainerdConfig?: ContainerdConfig;
  /** Specify the details of in-transit encryption. Now named inter-node transparent encryption. */
  desiredInTransitEncryptionConfig?: "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED" | "IN_TRANSIT_ENCRYPTION_DISABLED" | "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT" | (string & {});
  /** The Custom keys configuration for the cluster. This field is deprecated. Use ClusterUpdate.desired_user_managed_keys_config instead. */
  userManagedKeysConfig?: UserManagedKeysConfig;
  /** The desired datapath provider for the cluster. */
  desiredDatapathProvider?: "DATAPATH_PROVIDER_UNSPECIFIED" | "LEGACY_DATAPATH" | "ADVANCED_DATAPATH" | (string & {});
  /** The desired config for additional subnetworks attached to the cluster. */
  desiredAdditionalIpRangesConfig?: DesiredAdditionalIPRangesConfig;
  /** Control plane endpoints configuration. */
  desiredControlPlaneEndpointsConfig?: ControlPlaneEndpointsConfig;
  /** The desired configuration for the fine-grained cost management feature. */
  desiredCostManagementConfig?: CostManagementConfig;
  /** The desired enterprise configuration for the cluster. Deprecated: GKE Enterprise features are now available without an Enterprise tier. */
  desiredEnterpriseConfig?: DesiredEnterpriseConfig;
  /** The desired Cloud TPU configuration. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25. */
  desiredTpuConfig?: TpuConfig;
  /** The desired config of Gateway API on this cluster. */
  desiredGatewayApiConfig?: GatewayAPIConfig;
  /** The desired config for pod autoscaling. */
  desiredPodAutoscaling?: PodAutoscaling;
  /** The desired monitoring configuration. */
  desiredMonitoringConfig?: MonitoringConfig;
  /** The desired config of Intra-node visibility. */
  desiredIntraNodeVisibilityConfig?: IntraNodeVisibilityConfig;
  /** WorkloadPolicyConfig is the configuration related to GCW workload policy */
  desiredAutopilotWorkloadPolicyConfig?: WorkloadPolicyConfig;
  /** Enable/Disable Security Posture API features for the cluster. */
  desiredSecurityPostureConfig?: SecurityPostureConfig;
  /** Configuration of etcd encryption. */
  desiredDatabaseEncryption?: DatabaseEncryption;
  /** The Kubernetes version to change the master to. The only valid value is the latest supported version. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the default Kubernetes version */
  desiredMasterVersion?: string;
  /** Enable/Disable L4 LB VPC firewall reconciliation for the cluster. */
  desiredDisableL4LbFirewallReconciliation?: boolean;
  /** The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This list must always include the cluster's primary zone. Warning: changing cluster locations will update the locations of all node pools and will result in nodes being added and/or removed. */
  desiredLocations?: Array<string>;
  /** The desired managed open telemetry configuration. */
  desiredManagedOpentelemetryConfig?: ManagedOpenTelemetryConfig;
  /** AutoIpamConfig contains all information related to Auto IPAM */
  desiredAutoIpamConfig?: AutoIpamConfig;
  /** The desired user managed keys config for the cluster. */
  desiredUserManagedKeysConfig?: UserManagedKeysConfig;
  /** The desired node kubelet config for all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. */
  desiredNodePoolAutoConfigKubeletConfig?: NodeKubeletConfig;
  /** The additional pod ranges to be added to the cluster. These pod ranges can be used by node pools to allocate pod IPs. */
  additionalPodRangesConfig?: AdditionalPodRangesConfig;
  /** The desired status of whether to disable default sNAT for this cluster. */
  desiredDefaultSnatStatus?: DefaultSnatStatus;
  /** The desired Identity Service component configuration. */
  desiredIdentityServiceConfig?: IdentityServiceConfig;
  /** The desired telemetry integration for the cluster. */
  desiredClusterTelemetry?: ClusterTelemetry;
  /** The desired private cluster configuration. Has no effect. Use desired_private_cluster_config instead. */
  privateClusterConfig?: PrivateClusterConfig;
  /** HostMaintenancePolicy contains the desired maintenance policy for the Google Compute Engine hosts. */
  desiredHostMaintenancePolicy?: HostMaintenancePolicy;
  /** Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. */
  desiredCompliancePostureConfig?: CompliancePostureConfig;
  /** The desired network tier configuration for the cluster. */
  desiredNetworkTierConfig?: NetworkTierConfig;
  /** The desired Linux node config for all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters. Currently only `cgroup_mode` can be set here. */
  desiredNodePoolAutoConfigLinuxNodeConfig?: LinuxNodeConfig;
  /** The desired fleet configuration for the cluster. */
  desiredFleet?: Fleet;
  /** Configuration for GKE auto upgrade. */
  gkeAutoUpgradeConfig?: GkeAutoUpgradeConfig;
  /** The current etag of the cluster. If an etag is provided and does not match the current etag of the cluster, update will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Configuration for direct-path (via ALTS) with workload identity. This feature is not officially supported for external customers in Kubernetes Engine when using Workload Identity. */
  desiredWorkloadAltsConfig?: WorkloadALTSConfig;
  /** The desired privileged admission config for the cluster. */
  desiredPrivilegedAdmissionConfig?: PrivilegedAdmissionConfig;
}

export const ClusterUpdate: Schema.Schema<ClusterUpdate> = Schema.suspend(() => Schema.Struct({
  desiredNetworkPerformanceConfig: Schema.optional(ClusterNetworkPerformanceConfig),
  desiredRollbackSafeUpgrade: Schema.optional(RollbackSafeUpgrade),
  desiredBinaryAuthorization: Schema.optional(BinaryAuthorization),
  desiredClusterAutoscaling: Schema.optional(ClusterAutoscaling),
  desiredLoggingConfig: Schema.optional(LoggingConfig),
  desiredPrivateClusterConfig: Schema.optional(PrivateClusterConfig),
  desiredResourceUsageExportConfig: Schema.optional(ResourceUsageExportConfig),
  desiredStackType: Schema.optional(Schema.String),
  desiredServiceExternalIpsConfig: Schema.optional(ServiceExternalIPsConfig),
  desiredEnablePrivateEndpoint: Schema.optional(Schema.Boolean),
  desiredPodSecurityPolicyConfig: Schema.optional(PodSecurityPolicyConfig),
  desiredMeshCertificates: Schema.optional(MeshCertificates),
  desiredNodePoolId: Schema.optional(Schema.String),
  removedAdditionalPodRangesConfig: Schema.optional(AdditionalPodRangesConfig),
  desiredReleaseChannel: Schema.optional(ReleaseChannel),
  desiredAnonymousAuthenticationConfig: Schema.optional(AnonymousAuthenticationConfig),
  desiredEnableMultiNetworking: Schema.optional(Schema.Boolean),
  desiredProtectConfig: Schema.optional(ProtectConfig),
  desiredGcfsConfig: Schema.optional(GcfsConfig),
  desiredNodeKubeletConfig: Schema.optional(NodeKubeletConfig),
  desiredK8sBetaApis: Schema.optional(K8sBetaAPIConfig),
  desiredNotificationConfig: Schema.optional(NotificationConfig),
  desiredNodePoolAutoConfigNetworkTags: Schema.optional(NetworkTags),
  desiredAddonsConfig: Schema.optional(AddonsConfig),
  desiredNodePoolLoggingConfig: Schema.optional(NodePoolLoggingConfig),
  desiredVerticalPodAutoscaling: Schema.optional(VerticalPodAutoscaling),
  desiredLoggingService: Schema.optional(Schema.String),
  desiredMaster: Schema.optional(Master),
  desiredWorkloadCertificates: Schema.optional(WorkloadCertificates),
  desiredL4ilbSubsettingConfig: Schema.optional(ILBSubsettingConfig),
  desiredEnableCiliumClusterwideNetworkPolicy: Schema.optional(Schema.Boolean),
  desiredSecretManagerConfig: Schema.optional(SecretManagerConfig),
  desiredAuthenticatorGroupsConfig: Schema.optional(AuthenticatorGroupsConfig),
  desiredMasterAuthorizedNetworksConfig: Schema.optional(MasterAuthorizedNetworksConfig),
  desiredEnableFqdnNetworkPolicy: Schema.optional(Schema.Boolean),
  desiredDefaultEnablePrivateNodes: Schema.optional(Schema.Boolean),
  desiredImageType: Schema.optional(Schema.String),
  desiredMonitoringService: Schema.optional(Schema.String),
  desiredNodeVersion: Schema.optional(Schema.String),
  desiredSecretSyncConfig: Schema.optional(SecretSyncConfig),
  desiredNodePoolAutoConfigResourceManagerTags: Schema.optional(ResourceManagerTags),
  desiredNodePoolAutoscaling: Schema.optional(NodePoolAutoscaling),
  enableK8sBetaApis: Schema.optional(K8sBetaAPIConfig),
  desiredWorkloadIdentityConfig: Schema.optional(WorkloadIdentityConfig),
  desiredDnsConfig: Schema.optional(DNSConfig),
  desiredRbacBindingConfig: Schema.optional(RBACBindingConfig),
  desiredPrivateIpv6GoogleAccess: Schema.optional(Schema.String),
  desiredShieldedNodes: Schema.optional(ShieldedNodes),
  desiredParentProductConfig: Schema.optional(ParentProductConfig),
  desiredContainerdConfig: Schema.optional(ContainerdConfig),
  desiredInTransitEncryptionConfig: Schema.optional(Schema.String),
  userManagedKeysConfig: Schema.optional(UserManagedKeysConfig),
  desiredDatapathProvider: Schema.optional(Schema.String),
  desiredAdditionalIpRangesConfig: Schema.optional(DesiredAdditionalIPRangesConfig),
  desiredControlPlaneEndpointsConfig: Schema.optional(ControlPlaneEndpointsConfig),
  desiredCostManagementConfig: Schema.optional(CostManagementConfig),
  desiredEnterpriseConfig: Schema.optional(DesiredEnterpriseConfig),
  desiredTpuConfig: Schema.optional(TpuConfig),
  desiredGatewayApiConfig: Schema.optional(GatewayAPIConfig),
  desiredPodAutoscaling: Schema.optional(PodAutoscaling),
  desiredMonitoringConfig: Schema.optional(MonitoringConfig),
  desiredIntraNodeVisibilityConfig: Schema.optional(IntraNodeVisibilityConfig),
  desiredAutopilotWorkloadPolicyConfig: Schema.optional(WorkloadPolicyConfig),
  desiredSecurityPostureConfig: Schema.optional(SecurityPostureConfig),
  desiredDatabaseEncryption: Schema.optional(DatabaseEncryption),
  desiredMasterVersion: Schema.optional(Schema.String),
  desiredDisableL4LbFirewallReconciliation: Schema.optional(Schema.Boolean),
  desiredLocations: Schema.optional(Schema.Array(Schema.String)),
  desiredManagedOpentelemetryConfig: Schema.optional(ManagedOpenTelemetryConfig),
  desiredAutoIpamConfig: Schema.optional(AutoIpamConfig),
  desiredUserManagedKeysConfig: Schema.optional(UserManagedKeysConfig),
  desiredNodePoolAutoConfigKubeletConfig: Schema.optional(NodeKubeletConfig),
  additionalPodRangesConfig: Schema.optional(AdditionalPodRangesConfig),
  desiredDefaultSnatStatus: Schema.optional(DefaultSnatStatus),
  desiredIdentityServiceConfig: Schema.optional(IdentityServiceConfig),
  desiredClusterTelemetry: Schema.optional(ClusterTelemetry),
  privateClusterConfig: Schema.optional(PrivateClusterConfig),
  desiredHostMaintenancePolicy: Schema.optional(HostMaintenancePolicy),
  desiredCompliancePostureConfig: Schema.optional(CompliancePostureConfig),
  desiredNetworkTierConfig: Schema.optional(NetworkTierConfig),
  desiredNodePoolAutoConfigLinuxNodeConfig: Schema.optional(LinuxNodeConfig),
  desiredFleet: Schema.optional(Fleet),
  gkeAutoUpgradeConfig: Schema.optional(GkeAutoUpgradeConfig),
  etag: Schema.optional(Schema.String),
  desiredWorkloadAltsConfig: Schema.optional(WorkloadALTSConfig),
  desiredPrivilegedAdmissionConfig: Schema.optional(PrivilegedAdmissionConfig),
})).annotate({ identifier: "ClusterUpdate" }) as any as Schema.Schema<ClusterUpdate>;

export interface UpdateClusterRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Required. A description of the update. */
  update?: ClusterUpdate;
  /** The name (project, location, cluster) of the cluster to update. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const UpdateClusterRequest: Schema.Schema<UpdateClusterRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  update: Schema.optional(ClusterUpdate),
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateClusterRequest" }) as any as Schema.Schema<UpdateClusterRequest>;

export interface HttpCacheControlResponseHeader {
  /** 14.6 response cache age, in seconds since the response is generated */
  age?: string;
  /** 14.9 request and response directives */
  directive?: string;
  /** 14.21 response cache expires, in RFC 1123 date format */
  expires?: string;
}

export const HttpCacheControlResponseHeader: Schema.Schema<HttpCacheControlResponseHeader> = Schema.suspend(() => Schema.Struct({
  age: Schema.optional(Schema.String),
  directive: Schema.optional(Schema.String),
  expires: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpCacheControlResponseHeader" }) as any as Schema.Schema<HttpCacheControlResponseHeader>;

export interface GetJSONWebKeysResponse {
  /** The public component of the keys used by the cluster to sign token requests. */
  keys?: Array<Jwk>;
  /** For HTTP requests, this field is automatically extracted into the Cache-Control HTTP header. */
  cacheHeader?: HttpCacheControlResponseHeader;
}

export const GetJSONWebKeysResponse: Schema.Schema<GetJSONWebKeysResponse> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(Jwk)),
  cacheHeader: Schema.optional(HttpCacheControlResponseHeader),
})).annotate({ identifier: "GetJSONWebKeysResponse" }) as any as Schema.Schema<GetJSONWebKeysResponse>;

export interface SetLegacyAbacRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project, location, cluster name) of the cluster to set legacy abac. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Required. Whether ABAC authorization will be enabled in the cluster. */
  enabled?: boolean;
}

export const SetLegacyAbacRequest: Schema.Schema<SetLegacyAbacRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SetLegacyAbacRequest" }) as any as Schema.Schema<SetLegacyAbacRequest>;

export interface RollbackSafeUpgradeStatus {
  /** The mode of the rollback-safe upgrade. */
  mode?: "MODE_UNSPECIFIED" | "KCP_MINOR_UPGRADE_ROLLBACK_SAFE_MODE" | (string & {});
  /** The rollback-safe mode expiration time. */
  controlPlaneUpgradeRollbackEndTime?: string;
  /** The GKE version that the cluster previously used before step-one upgrade. */
  previousVersion?: string;
}

export const RollbackSafeUpgradeStatus: Schema.Schema<RollbackSafeUpgradeStatus> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
  controlPlaneUpgradeRollbackEndTime: Schema.optional(Schema.String),
  previousVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackSafeUpgradeStatus" }) as any as Schema.Schema<RollbackSafeUpgradeStatus>;

export interface UpgradeDetails {
  /** The version before the upgrade. */
  initialVersion?: string;
  /** The start type of the upgrade. */
  startType?: "START_TYPE_UNSPECIFIED" | "AUTOMATIC" | "MANUAL" | (string & {});
  /** The version after the upgrade. */
  targetVersion?: string;
  /** The start timestamp of the upgrade. */
  startTime?: string;
  /** Output only. The state of the upgrade. */
  state?: "UNKNOWN" | "FAILED" | "SUCCEEDED" | "CANCELED" | "RUNNING" | (string & {});
  /** The emulated version before the upgrade. */
  initialEmulatedVersion?: string;
  /** The emulated version after the upgrade. */
  targetEmulatedVersion?: string;
  /** The end timestamp of the upgrade. */
  endTime?: string;
}

export const UpgradeDetails: Schema.Schema<UpgradeDetails> = Schema.suspend(() => Schema.Struct({
  initialVersion: Schema.optional(Schema.String),
  startType: Schema.optional(Schema.String),
  targetVersion: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  initialEmulatedVersion: Schema.optional(Schema.String),
  targetEmulatedVersion: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpgradeDetails" }) as any as Schema.Schema<UpgradeDetails>;

export interface NodePoolUpgradeInfo {
  /** patch_target_version indicates the target version for patch upgrade. */
  patchTargetVersion?: string;
  /** The list of past auto upgrades. */
  upgradeDetails?: Array<UpgradeDetails>;
  /** The auto upgrade status. */
  autoUpgradeStatus?: Array<"UNKNOWN" | "ACTIVE" | "MINOR_UPGRADE_PAUSED" | "UPGRADE_PAUSED" | (string & {})>;
  /** The nodepool's current minor version's end of standard support timestamp. */
  endOfStandardSupportTimestamp?: string;
  /** The auto upgrade paused reason. */
  pausedReason?: Array<"AUTO_UPGRADE_PAUSED_REASON_UNSPECIFIED" | "MAINTENANCE_WINDOW" | "MAINTENANCE_EXCLUSION_NO_UPGRADES" | "MAINTENANCE_EXCLUSION_NO_MINOR_UPGRADES" | "SYSTEM_CONFIG" | (string & {})>;
  /** minor_target_version indicates the target version for minor upgrade. */
  minorTargetVersion?: string;
  /** The nodepool's current minor version's end of extended support timestamp. */
  endOfExtendedSupportTimestamp?: string;
}

export const NodePoolUpgradeInfo: Schema.Schema<NodePoolUpgradeInfo> = Schema.suspend(() => Schema.Struct({
  patchTargetVersion: Schema.optional(Schema.String),
  upgradeDetails: Schema.optional(Schema.Array(UpgradeDetails)),
  autoUpgradeStatus: Schema.optional(Schema.Array(Schema.String)),
  endOfStandardSupportTimestamp: Schema.optional(Schema.String),
  pausedReason: Schema.optional(Schema.Array(Schema.String)),
  minorTargetVersion: Schema.optional(Schema.String),
  endOfExtendedSupportTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "NodePoolUpgradeInfo" }) as any as Schema.Schema<NodePoolUpgradeInfo>;

export interface AutopilotCompatibilityIssue {
  /** The constraint type of the issue. */
  constraintType?: string;
  /** The incompatibility type of this issue. */
  incompatibilityType?: "UNSPECIFIED" | "INCOMPATIBILITY" | "ADDITIONAL_CONFIG_REQUIRED" | "PASSED_WITH_OPTIONAL_CONFIG" | (string & {});
  /** The last time when this issue was observed. */
  lastObservation?: string;
  /** The name of the resources which are subject to this issue. */
  subjects?: Array<string>;
  /** The description of the issue. */
  description?: string;
  /** A URL to a public documentation, which addresses resolving this issue. */
  documentationUrl?: string;
}

export const AutopilotCompatibilityIssue: Schema.Schema<AutopilotCompatibilityIssue> = Schema.suspend(() => Schema.Struct({
  constraintType: Schema.optional(Schema.String),
  incompatibilityType: Schema.optional(Schema.String),
  lastObservation: Schema.optional(Schema.String),
  subjects: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  documentationUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "AutopilotCompatibilityIssue" }) as any as Schema.Schema<AutopilotCompatibilityIssue>;

export interface SetNodePoolSizeRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Required. The desired node count for the pool. */
  nodeCount?: number;
  /** Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** The name (project, location, cluster, node pool id) of the node pool to set size. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const SetNodePoolSizeRequest: Schema.Schema<SetNodePoolSizeRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  nodeCount: Schema.optional(Schema.Number),
  nodePoolId: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "SetNodePoolSizeRequest" }) as any as Schema.Schema<SetNodePoolSizeRequest>;

export interface Container_Date {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const Container_Date: Schema.Schema<Container_Date> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
})).annotate({ identifier: "Container_Date" }) as any as Schema.Schema<Container_Date>;

export interface WindowsVersion {
  /** Windows server image type */
  imageType?: string;
  /** Windows server build number */
  osVersion?: string;
  /** Mainstream support end date */
  supportEndDate?: Container_Date;
}

export const WindowsVersion: Schema.Schema<WindowsVersion> = Schema.suspend(() => Schema.Struct({
  imageType: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  supportEndDate: Schema.optional(Container_Date),
})).annotate({ identifier: "WindowsVersion" }) as any as Schema.Schema<WindowsVersion>;

export interface WindowsVersions {
  /** List of Windows server versions. */
  windowsVersions?: Array<WindowsVersion>;
}

export const WindowsVersions: Schema.Schema<WindowsVersions> = Schema.suspend(() => Schema.Struct({
  windowsVersions: Schema.optional(Schema.Array(WindowsVersion)),
})).annotate({ identifier: "WindowsVersions" }) as any as Schema.Schema<WindowsVersions>;

export interface UpgradeAvailableEvent {
  /** The release version available for upgrade. */
  version?: string;
  /** The resource type of the release version. */
  resourceType?: "UPGRADE_RESOURCE_TYPE_UNSPECIFIED" | "MASTER" | "NODE_POOL" | (string & {});
  /** Windows node versions info. */
  windowsVersions?: WindowsVersions;
  /** The release channel of the version. If empty, it means a non-channel release. */
  releaseChannel?: ReleaseChannel;
  /** Optional relative path to the resource. For example, the relative path of the node pool. */
  resource?: string;
}

export const UpgradeAvailableEvent: Schema.Schema<UpgradeAvailableEvent> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  windowsVersions: Schema.optional(WindowsVersions),
  releaseChannel: Schema.optional(ReleaseChannel),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "UpgradeAvailableEvent" }) as any as Schema.Schema<UpgradeAvailableEvent>;

export interface SetLabelsRequest {
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project, location, cluster name) of the cluster to set labels. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Required. The fingerprint of the previous set of labels for this resource, used to detect conflicts. The fingerprint is initially generated by Kubernetes Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash when updating or changing labels. Make a `get()` request to the resource to get the latest fingerprint. */
  labelFingerprint?: string;
  /** Required. The labels to set for that cluster. */
  resourceLabels?: Record<string, string>;
}

export const SetLabelsRequest: Schema.Schema<SetLabelsRequest> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  labelFingerprint: Schema.optional(Schema.String),
  resourceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SetLabelsRequest" }) as any as Schema.Schema<SetLabelsRequest>;

export interface ClusterUpgradeInfo {
  /** The cluster's rollback-safe upgrade status. */
  rollbackSafeUpgradeStatus?: RollbackSafeUpgradeStatus;
  /** The auto upgrade paused reason. */
  pausedReason?: Array<"AUTO_UPGRADE_PAUSED_REASON_UNSPECIFIED" | "MAINTENANCE_WINDOW" | "MAINTENANCE_EXCLUSION_NO_UPGRADES" | "MAINTENANCE_EXCLUSION_NO_MINOR_UPGRADES" | "CLUSTER_DISRUPTION_BUDGET" | "CLUSTER_DISRUPTION_BUDGET_MINOR_UPGRADE" | "SYSTEM_CONFIG" | (string & {})>;
  /** minor_target_version indicates the target version for minor upgrade. */
  minorTargetVersion?: string;
  /** The cluster's current minor version's end of standard support timestamp. */
  endOfStandardSupportTimestamp?: string;
  /** The auto upgrade status. */
  autoUpgradeStatus?: Array<"UNKNOWN" | "ACTIVE" | "MINOR_UPGRADE_PAUSED" | "UPGRADE_PAUSED" | (string & {})>;
  /** patch_target_version indicates the target version for patch upgrade. */
  patchTargetVersion?: string;
  /** The cluster's current minor version's end of extended support timestamp. */
  endOfExtendedSupportTimestamp?: string;
  /** The list of past auto upgrades. */
  upgradeDetails?: Array<UpgradeDetails>;
}

export const ClusterUpgradeInfo: Schema.Schema<ClusterUpgradeInfo> = Schema.suspend(() => Schema.Struct({
  rollbackSafeUpgradeStatus: Schema.optional(RollbackSafeUpgradeStatus),
  pausedReason: Schema.optional(Schema.Array(Schema.String)),
  minorTargetVersion: Schema.optional(Schema.String),
  endOfStandardSupportTimestamp: Schema.optional(Schema.String),
  autoUpgradeStatus: Schema.optional(Schema.Array(Schema.String)),
  patchTargetVersion: Schema.optional(Schema.String),
  endOfExtendedSupportTimestamp: Schema.optional(Schema.String),
  upgradeDetails: Schema.optional(Schema.Array(UpgradeDetails)),
})).annotate({ identifier: "ClusterUpgradeInfo" }) as any as Schema.Schema<ClusterUpgradeInfo>;

export interface ReleaseChannelConfig {
  /** The auto upgrade target version for clusters on the channel. */
  upgradeTargetVersion?: string;
  /** The release channel this configuration applies to. */
  channel?: "UNSPECIFIED" | "RAPID" | "REGULAR" | "STABLE" | "EXTENDED" | (string & {});
  /** The default version for newly created clusters on the channel. */
  defaultVersion?: string;
  /** List of valid versions for the channel. */
  validVersions?: Array<string>;
  /** Deprecated. This field has been deprecated and replaced with the valid_versions field. */
  availableVersions?: Array<AvailableVersion>;
}

export const ReleaseChannelConfig: Schema.Schema<ReleaseChannelConfig> = Schema.suspend(() => Schema.Struct({
  upgradeTargetVersion: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  defaultVersion: Schema.optional(Schema.String),
  validVersions: Schema.optional(Schema.Array(Schema.String)),
  availableVersions: Schema.optional(Schema.Array(AvailableVersion)),
})).annotate({ identifier: "ReleaseChannelConfig" }) as any as Schema.Schema<ReleaseChannelConfig>;

export interface ServerConfig {
  /** Version of Kubernetes the service deploys by default. */
  defaultClusterVersion?: string;
  /** List of release channel configurations. */
  channels?: Array<ReleaseChannelConfig>;
  /** List of valid master versions, in descending order. */
  validMasterVersions?: Array<string>;
  /** List of valid image types. */
  validImageTypes?: Array<string>;
  /** Maps of Kubernetes version and supported Windows server versions. */
  windowsVersionMaps?: Record<string, WindowsVersions>;
  /** List of valid node upgrade target versions, in descending order. */
  validNodeVersions?: Array<string>;
  /** Default image type. */
  defaultImageType?: string;
}

export const ServerConfig: Schema.Schema<ServerConfig> = Schema.suspend(() => Schema.Struct({
  defaultClusterVersion: Schema.optional(Schema.String),
  channels: Schema.optional(Schema.Array(ReleaseChannelConfig)),
  validMasterVersions: Schema.optional(Schema.Array(Schema.String)),
  validImageTypes: Schema.optional(Schema.Array(Schema.String)),
  windowsVersionMaps: Schema.optional(Schema.Record(Schema.String, WindowsVersions)),
  validNodeVersions: Schema.optional(Schema.Array(Schema.String)),
  defaultImageType: Schema.optional(Schema.String),
})).annotate({ identifier: "ServerConfig" }) as any as Schema.Schema<ServerConfig>;

export interface UpgradeInfoEvent {
  /** The end of standard support timestamp. */
  standardSupportEndTime?: string;
  /** The target emulated version for the upgrade. */
  targetEmulatedVersion?: string;
  /** Output only. The state of the upgrade. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "SUCCEEDED" | "FAILED" | "CANCELED" | (string & {});
  /** The current emulated version before the upgrade. */
  currentEmulatedVersion?: string;
  /** The time when the operation ended. */
  endTime?: string;
  /** The operation associated with this upgrade. */
  operation?: string;
  /** The current version before the upgrade. */
  currentVersion?: string;
  /** The type of the event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "END_OF_SUPPORT" | "COS_MILESTONE_VERSION_UPDATE" | "UPGRADE_LIFECYCLE" | "DISRUPTION_EVENT" | (string & {});
  /** The resource type associated with the upgrade. */
  resourceType?: "UPGRADE_RESOURCE_TYPE_UNSPECIFIED" | "MASTER" | "NODE_POOL" | (string & {});
  /** A brief description of the event. */
  description?: string;
  /** The end of extended support timestamp. */
  extendedSupportEndTime?: string;
  /** Optional relative path to the resource. For example in node pool upgrades, the relative path of the node pool. */
  resource?: string;
  /** The time when the operation was started. */
  startTime?: string;
  /** The target version for the upgrade. */
  targetVersion?: string;
  /** The information about the disruption event. This field is only populated when event_type is DISRUPTION_EVENT. */
  disruptionEvent?: DisruptionEvent;
}

export const UpgradeInfoEvent: Schema.Schema<UpgradeInfoEvent> = Schema.suspend(() => Schema.Struct({
  standardSupportEndTime: Schema.optional(Schema.String),
  targetEmulatedVersion: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  currentEmulatedVersion: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  currentVersion: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  extendedSupportEndTime: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  targetVersion: Schema.optional(Schema.String),
  disruptionEvent: Schema.optional(DisruptionEvent),
})).annotate({ identifier: "UpgradeInfoEvent" }) as any as Schema.Schema<UpgradeInfoEvent>;

export interface SetLocationsRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** The name (project, location, cluster) of the cluster to set locations. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Required. The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. Changing the locations a cluster is in will result in nodes being either created or removed from the cluster, depending on whether locations are being added or removed. This list must always include the cluster's primary zone. */
  locations?: Array<string>;
}

export const SetLocationsRequest: Schema.Schema<SetLocationsRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SetLocationsRequest" }) as any as Schema.Schema<SetLocationsRequest>;

export interface SetNodePoolManagementRequest {
  /** Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Required. NodeManagement configuration for the node pool. */
  management?: NodeManagement;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** The name (project, location, cluster, node pool id) of the node pool to set management properties. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
}

export const SetNodePoolManagementRequest: Schema.Schema<SetNodePoolManagementRequest> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  management: Schema.optional(NodeManagement),
  projectId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  nodePoolId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SetNodePoolManagementRequest" }) as any as Schema.Schema<SetNodePoolManagementRequest>;

export interface UsableSubnetworkSecondaryRange {
  /** The name associated with this subnetwork secondary range, used when adding an alias IP range to a VM instance. */
  rangeName?: string;
  /** This field is to determine the status of the secondary range programmably. */
  status?: "UNKNOWN" | "UNUSED" | "IN_USE_SERVICE" | "IN_USE_SHAREABLE_POD" | "IN_USE_MANAGED_POD" | (string & {});
  /** The range of IP addresses belonging to this subnetwork secondary range. */
  ipCidrRange?: string;
}

export const UsableSubnetworkSecondaryRange: Schema.Schema<UsableSubnetworkSecondaryRange> = Schema.suspend(() => Schema.Struct({
  rangeName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  ipCidrRange: Schema.optional(Schema.String),
})).annotate({ identifier: "UsableSubnetworkSecondaryRange" }) as any as Schema.Schema<UsableSubnetworkSecondaryRange>;

export interface UsableSubnetwork {
  /** The range of internal addresses that are owned by this subnetwork. */
  ipCidrRange?: string;
  /** Secondary IP ranges. */
  secondaryIpRanges?: Array<UsableSubnetworkSecondaryRange>;
  /** Subnetwork Name. Example: projects/my-project/regions/us-central1/subnetworks/my-subnet */
  subnetwork?: string;
  /** Network Name. Example: projects/my-project/global/networks/my-network */
  network?: string;
  /** A human readable status message representing the reasons for cases where the caller cannot use the secondary ranges under the subnet. For example if the secondary_ip_ranges is empty due to a permission issue, an insufficient permission message will be given by status_message. */
  statusMessage?: string;
}

export const UsableSubnetwork: Schema.Schema<UsableSubnetwork> = Schema.suspend(() => Schema.Struct({
  ipCidrRange: Schema.optional(Schema.String),
  secondaryIpRanges: Schema.optional(Schema.Array(UsableSubnetworkSecondaryRange)),
  subnetwork: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "UsableSubnetwork" }) as any as Schema.Schema<UsableSubnetwork>;

export interface ListClustersResponse {
  /** If any zones are listed here, the list of clusters returned may be missing those zones. */
  missingZones?: Array<string>;
  /** A list of clusters in the project in the specified zone, or across all ones. */
  clusters?: Array<Cluster>;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> = Schema.suspend(() => Schema.Struct({
  missingZones: Schema.optional(Schema.Array(Schema.String)),
  clusters: Schema.optional(Schema.Array(Cluster)),
})).annotate({ identifier: "ListClustersResponse" }) as any as Schema.Schema<ListClustersResponse>;

export interface SetAddonsConfigRequest {
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Required. The desired configurations for the various addons available to run in the cluster. */
  addonsConfig?: AddonsConfig;
  /** The name (project, location, cluster) of the cluster to set addons. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
}

export const SetAddonsConfigRequest: Schema.Schema<SetAddonsConfigRequest> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  addonsConfig: Schema.optional(AddonsConfig),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SetAddonsConfigRequest" }) as any as Schema.Schema<SetAddonsConfigRequest>;

export interface UpgradeEvent {
  /** The current emulated version before the upgrade. */
  currentEmulatedVersion?: string;
  /** The current version before the upgrade. */
  currentVersion?: string;
  /** The target version for the upgrade. */
  targetVersion?: string;
  /** The resource type that is upgrading. */
  resourceType?: "UPGRADE_RESOURCE_TYPE_UNSPECIFIED" | "MASTER" | "NODE_POOL" | (string & {});
  /** The target emulated version for the upgrade. */
  targetEmulatedVersion?: string;
  /** The operation associated with this upgrade. */
  operation?: string;
  /** Optional relative path to the resource. For example in node pool upgrades, the relative path of the node pool. */
  resource?: string;
  /** The time when the operation was started. */
  operationStartTime?: string;
}

export const UpgradeEvent: Schema.Schema<UpgradeEvent> = Schema.suspend(() => Schema.Struct({
  currentEmulatedVersion: Schema.optional(Schema.String),
  currentVersion: Schema.optional(Schema.String),
  targetVersion: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  targetEmulatedVersion: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  operationStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpgradeEvent" }) as any as Schema.Schema<UpgradeEvent>;

export interface SetLoggingServiceRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project, location, cluster) of the cluster to set logging. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Required. The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions. */
  loggingService?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
}

export const SetLoggingServiceRequest: Schema.Schema<SetLoggingServiceRequest> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  loggingService: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
})).annotate({ identifier: "SetLoggingServiceRequest" }) as any as Schema.Schema<SetLoggingServiceRequest>;

export interface SetMaintenancePolicyRequest {
  /** Required. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). */
  projectId?: string;
  /** Required. The maintenance policy to be set for the cluster. An empty field clears the existing maintenance policy. */
  maintenancePolicy?: MaintenancePolicy;
  /** The name (project, location, cluster name) of the cluster to set maintenance policy. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Required. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. */
  zone?: string;
  /** Required. The name of the cluster to update. */
  clusterId?: string;
}

export const SetMaintenancePolicyRequest: Schema.Schema<SetMaintenancePolicyRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  maintenancePolicy: Schema.optional(MaintenancePolicy),
  name: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
})).annotate({ identifier: "SetMaintenancePolicyRequest" }) as any as Schema.Schema<SetMaintenancePolicyRequest>;

export interface ListUsableSubnetworksResponse {
  /** A list of usable subnetworks in the specified network project. */
  subnetworks?: Array<UsableSubnetwork>;
  /** This token allows you to get the next page of results for list requests. If the number of results is larger than `page_size`, use the `next_page_token` as a value for the query parameter `page_token` in the next request. The value will become empty when there are no more pages. */
  nextPageToken?: string;
}

export const ListUsableSubnetworksResponse: Schema.Schema<ListUsableSubnetworksResponse> = Schema.suspend(() => Schema.Struct({
  subnetworks: Schema.optional(Schema.Array(UsableSubnetwork)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUsableSubnetworksResponse" }) as any as Schema.Schema<ListUsableSubnetworksResponse>;

export interface RollbackNodePoolUpgradeRequest {
  /** Deprecated. The name of the cluster to rollback. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** The name (project, location, cluster, node pool id) of the node poll to rollback upgrade. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
  /** Deprecated. The name of the node pool to rollback. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** Option for rollback to ignore the PodDisruptionBudget. Default value is false. */
  respectPdb?: boolean;
}

export const RollbackNodePoolUpgradeRequest: Schema.Schema<RollbackNodePoolUpgradeRequest> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  nodePoolId: Schema.optional(Schema.String),
  respectPdb: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RollbackNodePoolUpgradeRequest" }) as any as Schema.Schema<RollbackNodePoolUpgradeRequest>;

export interface CheckAutopilotCompatibilityResponse {
  /** The summary of the autopilot compatibility response. */
  summary?: string;
  /** The list of issues for the given operation. */
  issues?: Array<AutopilotCompatibilityIssue>;
}

export const CheckAutopilotCompatibilityResponse: Schema.Schema<CheckAutopilotCompatibilityResponse> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(Schema.String),
  issues: Schema.optional(Schema.Array(AutopilotCompatibilityIssue)),
})).annotate({ identifier: "CheckAutopilotCompatibilityResponse" }) as any as Schema.Schema<CheckAutopilotCompatibilityResponse>;

export interface ListNodePoolsResponse {
  /** A list of node pools for a cluster. */
  nodePools?: Array<NodePool>;
}

export const ListNodePoolsResponse: Schema.Schema<ListNodePoolsResponse> = Schema.suspend(() => Schema.Struct({
  nodePools: Schema.optional(Schema.Array(NodePool)),
})).annotate({ identifier: "ListNodePoolsResponse" }) as any as Schema.Schema<ListNodePoolsResponse>;

export interface SetNodePoolAutoscalingRequest {
  /** Required. Autoscaling configuration for the node pool. */
  autoscaling?: NodePoolAutoscaling;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** The name (project, location, cluster, node pool) of the node pool to set autoscaler settings. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const SetNodePoolAutoscalingRequest: Schema.Schema<SetNodePoolAutoscalingRequest> = Schema.suspend(() => Schema.Struct({
  autoscaling: Schema.optional(NodePoolAutoscaling),
  clusterId: Schema.optional(Schema.String),
  nodePoolId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "SetNodePoolAutoscalingRequest" }) as any as Schema.Schema<SetNodePoolAutoscalingRequest>;

export interface UpdateMasterRequest {
  /** The name (project, location, cluster) of the cluster to update. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Required. The Kubernetes version to change the master to. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the default Kubernetes version */
  masterVersion?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const UpdateMasterRequest: Schema.Schema<UpdateMasterRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  masterVersion: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateMasterRequest" }) as any as Schema.Schema<UpdateMasterRequest>;

export interface GetOpenIDConfigResponse {
  /** Supported claims. */
  claims_supported?: Array<string>;
  /** For HTTP requests, this field is automatically extracted into the Cache-Control HTTP header. */
  cacheHeader?: HttpCacheControlResponseHeader;
  /** OIDC Issuer. */
  issuer?: string;
  /** JSON Web Key uri. */
  jwks_uri?: string;
  /** Supported grant types. */
  grant_types?: Array<string>;
  /** Supported subject types. */
  subject_types_supported?: Array<string>;
  /** supported ID Token signing Algorithms. */
  id_token_signing_alg_values_supported?: Array<string>;
  /** Supported response types. */
  response_types_supported?: Array<string>;
}

export const GetOpenIDConfigResponse: Schema.Schema<GetOpenIDConfigResponse> = Schema.suspend(() => Schema.Struct({
  claims_supported: Schema.optional(Schema.Array(Schema.String)),
  cacheHeader: Schema.optional(HttpCacheControlResponseHeader),
  issuer: Schema.optional(Schema.String),
  jwks_uri: Schema.optional(Schema.String),
  grant_types: Schema.optional(Schema.Array(Schema.String)),
  subject_types_supported: Schema.optional(Schema.Array(Schema.String)),
  id_token_signing_alg_values_supported: Schema.optional(Schema.Array(Schema.String)),
  response_types_supported: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GetOpenIDConfigResponse" }) as any as Schema.Schema<GetOpenIDConfigResponse>;

export interface SetMonitoringServiceRequest {
  /** The name (project, location, cluster) of the cluster to set monitoring. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Required. The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions. */
  monitoringService?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
}

export const SetMonitoringServiceRequest: Schema.Schema<SetMonitoringServiceRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  monitoringService: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  clusterId: Schema.optional(Schema.String),
})).annotate({ identifier: "SetMonitoringServiceRequest" }) as any as Schema.Schema<SetMonitoringServiceRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsRequest {
  /** Required. Contains the name of the resource requested. Specified in the format `projects/*`. */
  parent: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

/** Fetches locations that offer Google Kubernetes Engine. */
export const listProjectsLocations: API.OperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
}));

export interface GetServerConfigProjectsLocationsRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) to return operations for. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project and location) of the server config to get, specified in the format `projects/* /locations/*`. */
  name: string;
}

export const GetServerConfigProjectsLocationsRequest = Schema.Struct({
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/serverConfig" }),
  svc,
) as unknown as Schema.Schema<GetServerConfigProjectsLocationsRequest>;

export type GetServerConfigProjectsLocationsResponse = ServerConfig;
export const GetServerConfigProjectsLocationsResponse = ServerConfig;

export type GetServerConfigProjectsLocationsError = CommonErrors;

/** Returns configuration info about the Google Kubernetes Engine service. */
export const getServerConfigProjectsLocations: API.OperationMethod<GetServerConfigProjectsLocationsRequest, GetServerConfigProjectsLocationsResponse, GetServerConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServerConfigProjectsLocationsRequest,
  output: GetServerConfigProjectsLocationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. */
  operationId?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project, location, operation id) of the operation to get. Specified in the format `projects/* /locations/* /operations/*`. */
  name: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  operationId: Schema.optional(Schema.String).pipe(T.HttpQuery("operationId")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

/** Gets the specified operation. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId?: string;
  /** The parent (project and location) where the operations will be listed. Specified in the format `projects/* /locations/*`. Location "-" matches all zones and all regions. */
  parent: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) to return operations for, or `-` for all zones. This field has been deprecated and replaced by the parent field. */
  zone?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

/** Lists all operations in a project in the specified zone or all zones. */
export const listProjectsLocationsOperations: API.OperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name (project, location, operation id) of the operation to cancel. Specified in the format `projects/* /locations/* /operations/*`. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

/** Cancels the specified operation. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CompleteControlPlaneUpgradeProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to complete upgrade. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: CompleteControlPlaneUpgradeRequest;
}

export const CompleteControlPlaneUpgradeProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CompleteControlPlaneUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:completeControlPlaneUpgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteControlPlaneUpgradeProjectsLocationsClustersRequest>;

export type CompleteControlPlaneUpgradeProjectsLocationsClustersResponse = Operation;
export const CompleteControlPlaneUpgradeProjectsLocationsClustersResponse = Operation;

export type CompleteControlPlaneUpgradeProjectsLocationsClustersError = CommonErrors;

/** CompleteControlPlaneUpgrade completes the rollback-safe upgrade by performing the step two upgrade for a specific cluster. */
export const completeControlPlaneUpgradeProjectsLocationsClusters: API.OperationMethod<CompleteControlPlaneUpgradeProjectsLocationsClustersRequest, CompleteControlPlaneUpgradeProjectsLocationsClustersResponse, CompleteControlPlaneUpgradeProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteControlPlaneUpgradeProjectsLocationsClustersRequest,
  output: CompleteControlPlaneUpgradeProjectsLocationsClustersResponse,
  errors: [],
}));

export interface UpdateMasterProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to update. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: UpdateMasterRequest;
}

export const UpdateMasterProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateMasterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:updateMaster", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateMasterProjectsLocationsClustersRequest>;

export type UpdateMasterProjectsLocationsClustersResponse = Operation;
export const UpdateMasterProjectsLocationsClustersResponse = Operation;

export type UpdateMasterProjectsLocationsClustersError = CommonErrors;

/** Updates the master for a specific cluster. */
export const updateMasterProjectsLocationsClusters: API.OperationMethod<UpdateMasterProjectsLocationsClustersRequest, UpdateMasterProjectsLocationsClustersResponse, UpdateMasterProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateMasterProjectsLocationsClustersRequest,
  output: UpdateMasterProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetAddonsProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to set addons. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetAddonsConfigRequest;
}

export const SetAddonsProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetAddonsConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setAddons", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAddonsProjectsLocationsClustersRequest>;

export type SetAddonsProjectsLocationsClustersResponse = Operation;
export const SetAddonsProjectsLocationsClustersResponse = Operation;

export type SetAddonsProjectsLocationsClustersError = CommonErrors;

/** Sets the addons for a specific cluster. */
export const setAddonsProjectsLocationsClusters: API.OperationMethod<SetAddonsProjectsLocationsClustersRequest, SetAddonsProjectsLocationsClustersResponse, SetAddonsProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAddonsProjectsLocationsClustersRequest,
  output: SetAddonsProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetLocationsProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to set locations. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetLocationsRequest;
}

export const SetLocationsProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetLocationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setLocations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetLocationsProjectsLocationsClustersRequest>;

export type SetLocationsProjectsLocationsClustersResponse = Operation;
export const SetLocationsProjectsLocationsClustersResponse = Operation;

export type SetLocationsProjectsLocationsClustersError = CommonErrors;

/** Sets the locations for a specific cluster. Deprecated. Use [projects.locations.clusters.update](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters/update) instead. */
export const setLocationsProjectsLocationsClusters: API.OperationMethod<SetLocationsProjectsLocationsClustersRequest, SetLocationsProjectsLocationsClustersResponse, SetLocationsProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetLocationsProjectsLocationsClustersRequest,
  output: SetLocationsProjectsLocationsClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides, or "-" for all zones. This field has been deprecated and replaced by the parent field. */
  zone?: string;
  /** The parent (project and location) where the clusters will be listed. Specified in the format `projects/* /locations/*`. Location "-" matches all zones and all regions. */
  parent: string;
}

export const ListProjectsLocationsClustersRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersRequest>;

export type ListProjectsLocationsClustersResponse = ListClustersResponse;
export const ListProjectsLocationsClustersResponse = ListClustersResponse;

export type ListProjectsLocationsClustersError = CommonErrors;

/** Lists all clusters owned by a project in either the specified zone or all zones. */
export const listProjectsLocationsClusters: API.OperationMethod<ListProjectsLocationsClustersRequest, ListProjectsLocationsClustersResponse, ListProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsClustersRequest,
  output: ListProjectsLocationsClustersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsClustersRequest {
  /** The parent (project and location) where the cluster will be created. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: CreateClusterRequest;
}

export const CreateProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersRequest>;

export type CreateProjectsLocationsClustersResponse = Operation;
export const CreateProjectsLocationsClustersResponse = Operation;

export type CreateProjectsLocationsClustersError = CommonErrors;

/** Creates a cluster, consisting of the specified number and type of Google Compute Engine instances. By default, the cluster is created in the project's [default network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). One firewall is added for the cluster. After cluster creation, the kubelet creates routes for each node to allow the containers on that node to communicate with all other instances in the cluster. Finally, an entry is added to the project's global metadata indicating which CIDR range the cluster is using. */
export const createProjectsLocationsClusters: API.OperationMethod<CreateProjectsLocationsClustersRequest, CreateProjectsLocationsClustersResponse, CreateProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClustersRequest,
  output: CreateProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetMasterAuthProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to set auth. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetMasterAuthRequest;
}

export const SetMasterAuthProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetMasterAuthRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setMasterAuth", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMasterAuthProjectsLocationsClustersRequest>;

export type SetMasterAuthProjectsLocationsClustersResponse = Operation;
export const SetMasterAuthProjectsLocationsClustersResponse = Operation;

export type SetMasterAuthProjectsLocationsClustersError = CommonErrors;

/** Sets master auth materials. Currently supports changing the admin password or a specific cluster, either via password generation or explicitly setting the password. */
export const setMasterAuthProjectsLocationsClusters: API.OperationMethod<SetMasterAuthProjectsLocationsClustersRequest, SetMasterAuthProjectsLocationsClustersResponse, SetMasterAuthProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMasterAuthProjectsLocationsClustersRequest,
  output: SetMasterAuthProjectsLocationsClustersResponse,
  errors: [],
}));

export interface CompleteIpRotationProjectsLocationsClustersRequest {
  /** The name (project, location, cluster name) of the cluster to complete IP rotation. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: CompleteIPRotationRequest;
}

export const CompleteIpRotationProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CompleteIPRotationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:completeIpRotation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteIpRotationProjectsLocationsClustersRequest>;

export type CompleteIpRotationProjectsLocationsClustersResponse = Operation;
export const CompleteIpRotationProjectsLocationsClustersResponse = Operation;

export type CompleteIpRotationProjectsLocationsClustersError = CommonErrors;

/** Completes master IP rotation. */
export const completeIpRotationProjectsLocationsClusters: API.OperationMethod<CompleteIpRotationProjectsLocationsClustersRequest, CompleteIpRotationProjectsLocationsClustersResponse, CompleteIpRotationProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteIpRotationProjectsLocationsClustersRequest,
  output: CompleteIpRotationProjectsLocationsClustersResponse,
  errors: [],
}));

export interface GetProjectsLocationsClustersRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the cluster to retrieve. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
}

export const GetProjectsLocationsClustersRequest = Schema.Struct({
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersRequest>;

export type GetProjectsLocationsClustersResponse = Cluster;
export const GetProjectsLocationsClustersResponse = Cluster;

export type GetProjectsLocationsClustersError = CommonErrors;

/** Gets the details for a specific cluster. */
export const getProjectsLocationsClusters: API.OperationMethod<GetProjectsLocationsClustersRequest, GetProjectsLocationsClustersResponse, GetProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersRequest,
  output: GetProjectsLocationsClustersResponse,
  errors: [],
}));

export interface UpdateProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to update. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: UpdateClusterRequest;
}

export const UpdateProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsClustersRequest>;

export type UpdateProjectsLocationsClustersResponse = Operation;
export const UpdateProjectsLocationsClustersResponse = Operation;

export type UpdateProjectsLocationsClustersError = CommonErrors;

/** Updates the settings for a specific cluster. */
export const updateProjectsLocationsClusters: API.OperationMethod<UpdateProjectsLocationsClustersRequest, UpdateProjectsLocationsClustersResponse, UpdateProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsClustersRequest,
  output: UpdateProjectsLocationsClustersResponse,
  errors: [],
}));

export interface StartIpRotationProjectsLocationsClustersRequest {
  /** The name (project, location, cluster name) of the cluster to start IP rotation. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: StartIPRotationRequest;
}

export const StartIpRotationProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartIPRotationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:startIpRotation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartIpRotationProjectsLocationsClustersRequest>;

export type StartIpRotationProjectsLocationsClustersResponse = Operation;
export const StartIpRotationProjectsLocationsClustersResponse = Operation;

export type StartIpRotationProjectsLocationsClustersError = CommonErrors;

/** Starts master IP rotation. */
export const startIpRotationProjectsLocationsClusters: API.OperationMethod<StartIpRotationProjectsLocationsClustersRequest, StartIpRotationProjectsLocationsClustersResponse, StartIpRotationProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartIpRotationProjectsLocationsClustersRequest,
  output: StartIpRotationProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetMonitoringProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to set monitoring. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetMonitoringServiceRequest;
}

export const SetMonitoringProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetMonitoringServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setMonitoring", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMonitoringProjectsLocationsClustersRequest>;

export type SetMonitoringProjectsLocationsClustersResponse = Operation;
export const SetMonitoringProjectsLocationsClustersResponse = Operation;

export type SetMonitoringProjectsLocationsClustersError = CommonErrors;

/** Sets the monitoring service for a specific cluster. */
export const setMonitoringProjectsLocationsClusters: API.OperationMethod<SetMonitoringProjectsLocationsClustersRequest, SetMonitoringProjectsLocationsClustersResponse, SetMonitoringProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMonitoringProjectsLocationsClustersRequest,
  output: SetMonitoringProjectsLocationsClustersResponse,
  errors: [],
}));

export interface FetchClusterUpgradeInfoProjectsLocationsClustersRequest {
  /** API request version that initiates this operation. */
  version?: string;
  /** Required. The name (project, location, cluster) of the cluster to get. Specified in the format `projects/* /locations/* /clusters/*` or `projects/* /zones/* /clusters/*`. */
  name: string;
}

export const FetchClusterUpgradeInfoProjectsLocationsClustersRequest = Schema.Struct({
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:fetchClusterUpgradeInfo" }),
  svc,
) as unknown as Schema.Schema<FetchClusterUpgradeInfoProjectsLocationsClustersRequest>;

export type FetchClusterUpgradeInfoProjectsLocationsClustersResponse = ClusterUpgradeInfo;
export const FetchClusterUpgradeInfoProjectsLocationsClustersResponse = ClusterUpgradeInfo;

export type FetchClusterUpgradeInfoProjectsLocationsClustersError = CommonErrors;

/** Fetch upgrade information of a specific cluster. */
export const fetchClusterUpgradeInfoProjectsLocationsClusters: API.OperationMethod<FetchClusterUpgradeInfoProjectsLocationsClustersRequest, FetchClusterUpgradeInfoProjectsLocationsClustersResponse, FetchClusterUpgradeInfoProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchClusterUpgradeInfoProjectsLocationsClustersRequest,
  output: FetchClusterUpgradeInfoProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetLoggingProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to set logging. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetLoggingServiceRequest;
}

export const SetLoggingProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetLoggingServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setLogging", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetLoggingProjectsLocationsClustersRequest>;

export type SetLoggingProjectsLocationsClustersResponse = Operation;
export const SetLoggingProjectsLocationsClustersResponse = Operation;

export type SetLoggingProjectsLocationsClustersError = CommonErrors;

/** Sets the logging service for a specific cluster. */
export const setLoggingProjectsLocationsClusters: API.OperationMethod<SetLoggingProjectsLocationsClustersRequest, SetLoggingProjectsLocationsClustersResponse, SetLoggingProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetLoggingProjectsLocationsClustersRequest,
  output: SetLoggingProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetMaintenancePolicyProjectsLocationsClustersRequest {
  /** The name (project, location, cluster name) of the cluster to set maintenance policy. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetMaintenancePolicyRequest;
}

export const SetMaintenancePolicyProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetMaintenancePolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setMaintenancePolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMaintenancePolicyProjectsLocationsClustersRequest>;

export type SetMaintenancePolicyProjectsLocationsClustersResponse = Operation;
export const SetMaintenancePolicyProjectsLocationsClustersResponse = Operation;

export type SetMaintenancePolicyProjectsLocationsClustersError = CommonErrors;

/** Sets the maintenance policy for a cluster. */
export const setMaintenancePolicyProjectsLocationsClusters: API.OperationMethod<SetMaintenancePolicyProjectsLocationsClustersRequest, SetMaintenancePolicyProjectsLocationsClustersResponse, SetMaintenancePolicyProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMaintenancePolicyProjectsLocationsClustersRequest,
  output: SetMaintenancePolicyProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetResourceLabelsProjectsLocationsClustersRequest {
  /** The name (project, location, cluster name) of the cluster to set labels. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetLabelsRequest;
}

export const SetResourceLabelsProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetLabelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setResourceLabels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetResourceLabelsProjectsLocationsClustersRequest>;

export type SetResourceLabelsProjectsLocationsClustersResponse = Operation;
export const SetResourceLabelsProjectsLocationsClustersResponse = Operation;

export type SetResourceLabelsProjectsLocationsClustersError = CommonErrors;

/** Sets labels on a cluster. */
export const setResourceLabelsProjectsLocationsClusters: API.OperationMethod<SetResourceLabelsProjectsLocationsClustersRequest, SetResourceLabelsProjectsLocationsClustersResponse, SetResourceLabelsProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetResourceLabelsProjectsLocationsClustersRequest,
  output: SetResourceLabelsProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetNetworkPolicyProjectsLocationsClustersRequest {
  /** The name (project, location, cluster name) of the cluster to set networking policy. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetNetworkPolicyRequest;
}

export const SetNetworkPolicyProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetNetworkPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setNetworkPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetNetworkPolicyProjectsLocationsClustersRequest>;

export type SetNetworkPolicyProjectsLocationsClustersResponse = Operation;
export const SetNetworkPolicyProjectsLocationsClustersResponse = Operation;

export type SetNetworkPolicyProjectsLocationsClustersError = CommonErrors;

/** Enables or disables Network Policy for a cluster. */
export const setNetworkPolicyProjectsLocationsClusters: API.OperationMethod<SetNetworkPolicyProjectsLocationsClustersRequest, SetNetworkPolicyProjectsLocationsClustersResponse, SetNetworkPolicyProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetNetworkPolicyProjectsLocationsClustersRequest,
  output: SetNetworkPolicyProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetLegacyAbacProjectsLocationsClustersRequest {
  /** The name (project, location, cluster name) of the cluster to set legacy abac. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: SetLegacyAbacRequest;
}

export const SetLegacyAbacProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetLegacyAbacRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:setLegacyAbac", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetLegacyAbacProjectsLocationsClustersRequest>;

export type SetLegacyAbacProjectsLocationsClustersResponse = Operation;
export const SetLegacyAbacProjectsLocationsClustersResponse = Operation;

export type SetLegacyAbacProjectsLocationsClustersError = CommonErrors;

/** Enables or disables the ABAC authorization mechanism on a cluster. */
export const setLegacyAbacProjectsLocationsClusters: API.OperationMethod<SetLegacyAbacProjectsLocationsClustersRequest, SetLegacyAbacProjectsLocationsClustersResponse, SetLegacyAbacProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetLegacyAbacProjectsLocationsClustersRequest,
  output: SetLegacyAbacProjectsLocationsClustersResponse,
  errors: [],
}));

export interface GetJwksProjectsLocationsClustersRequest {
  /** The cluster (project, location, cluster name) to get keys for. Specified in the format `projects/* /locations/* /clusters/*`. */
  parent: string;
}

export const GetJwksProjectsLocationsClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/jwks" }),
  svc,
) as unknown as Schema.Schema<GetJwksProjectsLocationsClustersRequest>;

export type GetJwksProjectsLocationsClustersResponse = GetJSONWebKeysResponse;
export const GetJwksProjectsLocationsClustersResponse = GetJSONWebKeysResponse;

export type GetJwksProjectsLocationsClustersError = CommonErrors;

/** Gets the public component of the cluster signing keys in JSON Web Key format. */
export const getJwksProjectsLocationsClusters: API.OperationMethod<GetJwksProjectsLocationsClustersRequest, GetJwksProjectsLocationsClustersResponse, GetJwksProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetJwksProjectsLocationsClustersRequest,
  output: GetJwksProjectsLocationsClustersResponse,
  errors: [],
}));

export interface CheckAutopilotCompatibilityProjectsLocationsClustersRequest {
  /** The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
}

export const CheckAutopilotCompatibilityProjectsLocationsClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}:checkAutopilotCompatibility" }),
  svc,
) as unknown as Schema.Schema<CheckAutopilotCompatibilityProjectsLocationsClustersRequest>;

export type CheckAutopilotCompatibilityProjectsLocationsClustersResponse = CheckAutopilotCompatibilityResponse;
export const CheckAutopilotCompatibilityProjectsLocationsClustersResponse = CheckAutopilotCompatibilityResponse;

export type CheckAutopilotCompatibilityProjectsLocationsClustersError = CommonErrors;

/** Checks the cluster compatibility with Autopilot mode, and returns a list of compatibility issues. */
export const checkAutopilotCompatibilityProjectsLocationsClusters: API.OperationMethod<CheckAutopilotCompatibilityProjectsLocationsClustersRequest, CheckAutopilotCompatibilityProjectsLocationsClustersResponse, CheckAutopilotCompatibilityProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckAutopilotCompatibilityProjectsLocationsClustersRequest,
  output: CheckAutopilotCompatibilityProjectsLocationsClustersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsClustersRequest {
  /** Deprecated. The name of the cluster to delete. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** The name (project, location, cluster) of the cluster to delete. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
}

export const DeleteProjectsLocationsClustersRequest = Schema.Struct({
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersRequest>;

export type DeleteProjectsLocationsClustersResponse = Operation;
export const DeleteProjectsLocationsClustersResponse = Operation;

export type DeleteProjectsLocationsClustersError = CommonErrors;

/** Deletes the cluster, including the Kubernetes endpoint and all worker nodes. Firewalls and routes that were configured during cluster creation are also deleted. Other Google Compute Engine resources that might be in use by the cluster, such as load balancer resources, are not deleted if they weren't present when the cluster was initially created. */
export const deleteProjectsLocationsClusters: API.OperationMethod<DeleteProjectsLocationsClustersRequest, DeleteProjectsLocationsClustersResponse, DeleteProjectsLocationsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersRequest,
  output: DeleteProjectsLocationsClustersResponse,
  errors: [],
}));

export interface SetManagementProjectsLocationsClustersNodePoolsRequest {
  /** The name (project, location, cluster, node pool id) of the node pool to set management properties. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Request body */
  body?: SetNodePoolManagementRequest;
}

export const SetManagementProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetNodePoolManagementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}:setManagement", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetManagementProjectsLocationsClustersNodePoolsRequest>;

export type SetManagementProjectsLocationsClustersNodePoolsResponse = Operation;
export const SetManagementProjectsLocationsClustersNodePoolsResponse = Operation;

export type SetManagementProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Sets the NodeManagement options for a node pool. */
export const setManagementProjectsLocationsClustersNodePools: API.OperationMethod<SetManagementProjectsLocationsClustersNodePoolsRequest, SetManagementProjectsLocationsClustersNodePoolsResponse, SetManagementProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetManagementProjectsLocationsClustersNodePoolsRequest,
  output: SetManagementProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface CompleteUpgradeProjectsLocationsClustersNodePoolsRequest {
  /** The name (project, location, cluster, node pool id) of the node pool to complete upgrade. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Request body */
  body?: CompleteNodePoolUpgradeRequest;
}

export const CompleteUpgradeProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CompleteNodePoolUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}:completeUpgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteUpgradeProjectsLocationsClustersNodePoolsRequest>;

export type CompleteUpgradeProjectsLocationsClustersNodePoolsResponse = Empty;
export const CompleteUpgradeProjectsLocationsClustersNodePoolsResponse = Empty;

export type CompleteUpgradeProjectsLocationsClustersNodePoolsError = CommonErrors;

/** CompleteNodePoolUpgrade will signal an on-going node pool upgrade to complete. */
export const completeUpgradeProjectsLocationsClustersNodePools: API.OperationMethod<CompleteUpgradeProjectsLocationsClustersNodePoolsRequest, CompleteUpgradeProjectsLocationsClustersNodePoolsResponse, CompleteUpgradeProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteUpgradeProjectsLocationsClustersNodePoolsRequest,
  output: CompleteUpgradeProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface SetAutoscalingProjectsLocationsClustersNodePoolsRequest {
  /** The name (project, location, cluster, node pool) of the node pool to set autoscaler settings. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Request body */
  body?: SetNodePoolAutoscalingRequest;
}

export const SetAutoscalingProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetNodePoolAutoscalingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}:setAutoscaling", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAutoscalingProjectsLocationsClustersNodePoolsRequest>;

export type SetAutoscalingProjectsLocationsClustersNodePoolsResponse = Operation;
export const SetAutoscalingProjectsLocationsClustersNodePoolsResponse = Operation;

export type SetAutoscalingProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Sets the autoscaling settings of a specific node pool. */
export const setAutoscalingProjectsLocationsClustersNodePools: API.OperationMethod<SetAutoscalingProjectsLocationsClustersNodePoolsRequest, SetAutoscalingProjectsLocationsClustersNodePoolsResponse, SetAutoscalingProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAutoscalingProjectsLocationsClustersNodePoolsRequest,
  output: SetAutoscalingProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface SetSizeProjectsLocationsClustersNodePoolsRequest {
  /** The name (project, location, cluster, node pool id) of the node pool to set size. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Request body */
  body?: SetNodePoolSizeRequest;
}

export const SetSizeProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SetNodePoolSizeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}:setSize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetSizeProjectsLocationsClustersNodePoolsRequest>;

export type SetSizeProjectsLocationsClustersNodePoolsResponse = Operation;
export const SetSizeProjectsLocationsClustersNodePoolsResponse = Operation;

export type SetSizeProjectsLocationsClustersNodePoolsError = CommonErrors;

/** SetNodePoolSizeRequest sets the size of a node pool. The new size will be used for all replicas, including future replicas created by modifying NodePool.locations. */
export const setSizeProjectsLocationsClustersNodePools: API.OperationMethod<SetSizeProjectsLocationsClustersNodePoolsRequest, SetSizeProjectsLocationsClustersNodePoolsResponse, SetSizeProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetSizeProjectsLocationsClustersNodePoolsRequest,
  output: SetSizeProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsClustersNodePoolsRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** Deprecated. The name of the node pool. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** The name (project, location, cluster, node pool id) of the node pool to get. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
}

export const GetProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  nodePoolId: Schema.optional(Schema.String).pipe(T.HttpQuery("nodePoolId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsClustersNodePoolsRequest>;

export type GetProjectsLocationsClustersNodePoolsResponse = NodePool;
export const GetProjectsLocationsClustersNodePoolsResponse = NodePool;

export type GetProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Retrieves the requested node pool. */
export const getProjectsLocationsClustersNodePools: API.OperationMethod<GetProjectsLocationsClustersNodePoolsRequest, GetProjectsLocationsClustersNodePoolsResponse, GetProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsClustersNodePoolsRequest,
  output: GetProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsClustersNodePoolsRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId?: string;
  /** The name (project, location, cluster, node pool id) of the node pool to delete. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Deprecated. The name of the node pool to delete. This field has been deprecated and replaced by the name field. */
  nodePoolId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone?: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId?: string;
}

export const DeleteProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  nodePoolId: Schema.optional(Schema.String).pipe(T.HttpQuery("nodePoolId")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsClustersNodePoolsRequest>;

export type DeleteProjectsLocationsClustersNodePoolsResponse = Operation;
export const DeleteProjectsLocationsClustersNodePoolsResponse = Operation;

export type DeleteProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Deletes a node pool from a cluster. */
export const deleteProjectsLocationsClustersNodePools: API.OperationMethod<DeleteProjectsLocationsClustersNodePoolsRequest, DeleteProjectsLocationsClustersNodePoolsResponse, DeleteProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsClustersNodePoolsRequest,
  output: DeleteProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsRequest {
  /** API request version that initiates this operation. */
  version?: string;
  /** Required. The name (project, location, cluster, nodepool) of the nodepool to get. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*` or `projects/* /zones/* /clusters/* /nodePools/*`. */
  name: string;
}

export const FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}:fetchNodePoolUpgradeInfo" }),
  svc,
) as unknown as Schema.Schema<FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsRequest>;

export type FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsResponse = NodePoolUpgradeInfo;
export const FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsResponse = NodePoolUpgradeInfo;

export type FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Fetch upgrade information of a specific nodepool. */
export const fetchNodePoolUpgradeInfoProjectsLocationsClustersNodePools: API.OperationMethod<FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsRequest, FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsResponse, FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsRequest,
  output: FetchNodePoolUpgradeInfoProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface RollbackProjectsLocationsClustersNodePoolsRequest {
  /** The name (project, location, cluster, node pool id) of the node poll to rollback upgrade. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Request body */
  body?: RollbackNodePoolUpgradeRequest;
}

export const RollbackProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackNodePoolUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsLocationsClustersNodePoolsRequest>;

export type RollbackProjectsLocationsClustersNodePoolsResponse = Operation;
export const RollbackProjectsLocationsClustersNodePoolsResponse = Operation;

export type RollbackProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Rolls back a previously Aborted or Failed NodePool upgrade. This makes no changes if the last upgrade successfully completed. */
export const rollbackProjectsLocationsClustersNodePools: API.OperationMethod<RollbackProjectsLocationsClustersNodePoolsRequest, RollbackProjectsLocationsClustersNodePoolsResponse, RollbackProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsLocationsClustersNodePoolsRequest,
  output: RollbackProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsClustersNodePoolsRequest {
  /** The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/* /locations/* /clusters/*`. */
  parent: string;
  /** Request body */
  body?: CreateNodePoolRequest;
}

export const CreateProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateNodePoolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsClustersNodePoolsRequest>;

export type CreateProjectsLocationsClustersNodePoolsResponse = Operation;
export const CreateProjectsLocationsClustersNodePoolsResponse = Operation;

export type CreateProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Creates a node pool for a cluster. */
export const createProjectsLocationsClustersNodePools: API.OperationMethod<CreateProjectsLocationsClustersNodePoolsRequest, CreateProjectsLocationsClustersNodePoolsResponse, CreateProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsClustersNodePoolsRequest,
  output: CreateProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface UpdateProjectsLocationsClustersNodePoolsRequest {
  /** The name (project, location, cluster, node pool) of the node pool to update. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name: string;
  /** Request body */
  body?: UpdateNodePoolRequest;
}

export const UpdateProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateNodePoolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools/{nodePoolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsClustersNodePoolsRequest>;

export type UpdateProjectsLocationsClustersNodePoolsResponse = Operation;
export const UpdateProjectsLocationsClustersNodePoolsResponse = Operation;

export type UpdateProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Updates the version and/or image type of a specific node pool. */
export const updateProjectsLocationsClustersNodePools: API.OperationMethod<UpdateProjectsLocationsClustersNodePoolsRequest, UpdateProjectsLocationsClustersNodePoolsResponse, UpdateProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsClustersNodePoolsRequest,
  output: UpdateProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsClustersNodePoolsRequest {
  /** The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/* /locations/* /clusters/*`. */
  parent: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId?: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. */
  clusterId?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. */
  zone?: string;
}

export const ListProjectsLocationsClustersNodePoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  zone: Schema.optional(Schema.String).pipe(T.HttpQuery("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/nodePools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsClustersNodePoolsRequest>;

export type ListProjectsLocationsClustersNodePoolsResponse = ListNodePoolsResponse;
export const ListProjectsLocationsClustersNodePoolsResponse = ListNodePoolsResponse;

export type ListProjectsLocationsClustersNodePoolsError = CommonErrors;

/** Lists the node pools for a cluster. */
export const listProjectsLocationsClustersNodePools: API.OperationMethod<ListProjectsLocationsClustersNodePoolsRequest, ListProjectsLocationsClustersNodePoolsResponse, ListProjectsLocationsClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsClustersNodePoolsRequest,
  output: ListProjectsLocationsClustersNodePoolsResponse,
  errors: [],
}));

export interface GetOpenid_configurationProjectsLocationsClustersWell_knownRequest {
  /** The cluster (project, location, cluster name) to get the discovery document for. Specified in the format `projects/* /locations/* /clusters/*`. */
  parent: string;
}

export const GetOpenid_configurationProjectsLocationsClustersWell_knownRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/clusters/{clustersId}/.well-known/openid-configuration" }),
  svc,
) as unknown as Schema.Schema<GetOpenid_configurationProjectsLocationsClustersWell_knownRequest>;

export type GetOpenid_configurationProjectsLocationsClustersWell_knownResponse = GetOpenIDConfigResponse;
export const GetOpenid_configurationProjectsLocationsClustersWell_knownResponse = GetOpenIDConfigResponse;

export type GetOpenid_configurationProjectsLocationsClustersWell_knownError = CommonErrors;

/** Gets the OIDC discovery document for the cluster. See the [OpenID Connect Discovery 1.0 specification](https://openid.net/specs/openid-connect-discovery-1_0.html) for details. */
export const getOpenid_configurationProjectsLocationsClustersWell_known: API.OperationMethod<GetOpenid_configurationProjectsLocationsClustersWell_knownRequest, GetOpenid_configurationProjectsLocationsClustersWell_knownResponse, GetOpenid_configurationProjectsLocationsClustersWell_knownError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOpenid_configurationProjectsLocationsClustersWell_knownRequest,
  output: GetOpenid_configurationProjectsLocationsClustersWell_knownResponse,
  errors: [],
}));

export interface ListProjectsAggregatedUsableSubnetworksRequest {
  /** Filtering currently only supports equality on the networkProjectId and must be in the form: "networkProjectId=[PROJECTID]", where `networkProjectId` is the project which owns the listed subnetworks. This defaults to the parent project ID. */
  filter?: string;
  /** Specifies a page token to use. Set this to the nextPageToken returned by previous list requests to get the next page of results. */
  pageToken?: string;
  /** Required. The parent project where subnetworks are usable. Specified in the format `projects/*`. */
  parent: string;
  /** The max number of results per page that should be returned. If the number of available results is larger than `page_size`, a `next_page_token` is returned which can be used to get the next page of results in subsequent requests. Acceptable values are 0 to 500, inclusive. (Default: 500) */
  pageSize?: number;
}

export const ListProjectsAggregatedUsableSubnetworksRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/aggregated/usableSubnetworks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAggregatedUsableSubnetworksRequest>;

export type ListProjectsAggregatedUsableSubnetworksResponse = ListUsableSubnetworksResponse;
export const ListProjectsAggregatedUsableSubnetworksResponse = ListUsableSubnetworksResponse;

export type ListProjectsAggregatedUsableSubnetworksError = CommonErrors;

/** Lists subnetworks that can be used for creating clusters in a project. */
export const listProjectsAggregatedUsableSubnetworks: API.PaginatedOperationMethod<ListProjectsAggregatedUsableSubnetworksRequest, ListProjectsAggregatedUsableSubnetworksResponse, ListProjectsAggregatedUsableSubnetworksError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAggregatedUsableSubnetworksRequest,
  output: ListProjectsAggregatedUsableSubnetworksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetServerconfigProjectsZonesRequest {
  /** The name (project and location) of the server config to get, specified in the format `projects/* /locations/*`. */
  name?: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) to return operations for. This field has been deprecated and replaced by the name field. */
  zone: string;
}

export const GetServerconfigProjectsZonesRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/serverconfig" }),
  svc,
) as unknown as Schema.Schema<GetServerconfigProjectsZonesRequest>;

export type GetServerconfigProjectsZonesResponse = ServerConfig;
export const GetServerconfigProjectsZonesResponse = ServerConfig;

export type GetServerconfigProjectsZonesError = CommonErrors;

/** Returns configuration info about the Google Kubernetes Engine service. */
export const getServerconfigProjectsZones: API.OperationMethod<GetServerconfigProjectsZonesRequest, GetServerconfigProjectsZonesResponse, GetServerconfigProjectsZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServerconfigProjectsZonesRequest,
  output: GetServerconfigProjectsZonesResponse,
  errors: [],
}));

export interface SetNetworkPolicyProjectsZonesClustersRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Request body */
  body?: SetNetworkPolicyRequest;
}

export const SetNetworkPolicyProjectsZonesClustersRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(SetNetworkPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setNetworkPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetNetworkPolicyProjectsZonesClustersRequest>;

export type SetNetworkPolicyProjectsZonesClustersResponse = Operation;
export const SetNetworkPolicyProjectsZonesClustersResponse = Operation;

export type SetNetworkPolicyProjectsZonesClustersError = CommonErrors;

/** Enables or disables Network Policy for a cluster. */
export const setNetworkPolicyProjectsZonesClusters: API.OperationMethod<SetNetworkPolicyProjectsZonesClustersRequest, SetNetworkPolicyProjectsZonesClustersResponse, SetNetworkPolicyProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetNetworkPolicyProjectsZonesClustersRequest,
  output: SetNetworkPolicyProjectsZonesClustersResponse,
  errors: [],
}));

export interface GetProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster to retrieve. This field has been deprecated and replaced by the name field. */
  clusterId: string;
}

export const GetProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsZonesClustersRequest>;

export type GetProjectsZonesClustersResponse = Cluster;
export const GetProjectsZonesClustersResponse = Cluster;

export type GetProjectsZonesClustersError = CommonErrors;

/** Gets the details for a specific cluster. */
export const getProjectsZonesClusters: API.OperationMethod<GetProjectsZonesClustersRequest, GetProjectsZonesClustersResponse, GetProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsZonesClustersRequest,
  output: GetProjectsZonesClustersResponse,
  errors: [],
}));

export interface CompleteControlPlaneUpgradeProjectsZonesClustersRequest {
  /** The name (project, location, cluster) of the cluster to complete upgrade. Specified in the format `projects/* /locations/* /clusters/*`. */
  name: string;
  /** Request body */
  body?: CompleteControlPlaneUpgradeRequest;
}

export const CompleteControlPlaneUpgradeProjectsZonesClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CompleteControlPlaneUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/zones/{zonesId}/clusters/{clustersId}:completeControlPlaneUpgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteControlPlaneUpgradeProjectsZonesClustersRequest>;

export type CompleteControlPlaneUpgradeProjectsZonesClustersResponse = Operation;
export const CompleteControlPlaneUpgradeProjectsZonesClustersResponse = Operation;

export type CompleteControlPlaneUpgradeProjectsZonesClustersError = CommonErrors;

/** CompleteControlPlaneUpgrade completes the rollback-safe upgrade by performing the step two upgrade for a specific cluster. */
export const completeControlPlaneUpgradeProjectsZonesClusters: API.OperationMethod<CompleteControlPlaneUpgradeProjectsZonesClustersRequest, CompleteControlPlaneUpgradeProjectsZonesClustersResponse, CompleteControlPlaneUpgradeProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteControlPlaneUpgradeProjectsZonesClustersRequest,
  output: CompleteControlPlaneUpgradeProjectsZonesClustersResponse,
  errors: [],
}));

export interface FetchClusterUpgradeInfoProjectsZonesClustersRequest {
  /** Required. The name (project, location, cluster) of the cluster to get. Specified in the format `projects/* /locations/* /clusters/*` or `projects/* /zones/* /clusters/*`. */
  name: string;
  /** API request version that initiates this operation. */
  version?: string;
}

export const FetchClusterUpgradeInfoProjectsZonesClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/zones/{zonesId}/clusters/{clustersId}:fetchClusterUpgradeInfo" }),
  svc,
) as unknown as Schema.Schema<FetchClusterUpgradeInfoProjectsZonesClustersRequest>;

export type FetchClusterUpgradeInfoProjectsZonesClustersResponse = ClusterUpgradeInfo;
export const FetchClusterUpgradeInfoProjectsZonesClustersResponse = ClusterUpgradeInfo;

export type FetchClusterUpgradeInfoProjectsZonesClustersError = CommonErrors;

/** Fetch upgrade information of a specific cluster. */
export const fetchClusterUpgradeInfoProjectsZonesClusters: API.OperationMethod<FetchClusterUpgradeInfoProjectsZonesClustersRequest, FetchClusterUpgradeInfoProjectsZonesClustersResponse, FetchClusterUpgradeInfoProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchClusterUpgradeInfoProjectsZonesClustersRequest,
  output: FetchClusterUpgradeInfoProjectsZonesClustersResponse,
  errors: [],
}));

export interface UpdateProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Request body */
  body?: UpdateClusterRequest;
}

export const UpdateProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(UpdateClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsZonesClustersRequest>;

export type UpdateProjectsZonesClustersResponse = Operation;
export const UpdateProjectsZonesClustersResponse = Operation;

export type UpdateProjectsZonesClustersError = CommonErrors;

/** Updates the settings for a specific cluster. */
export const updateProjectsZonesClusters: API.OperationMethod<UpdateProjectsZonesClustersRequest, UpdateProjectsZonesClustersResponse, UpdateProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsZonesClustersRequest,
  output: UpdateProjectsZonesClustersResponse,
  errors: [],
}));

export interface ListProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides, or "-" for all zones. This field has been deprecated and replaced by the parent field. */
  zone: string;
  /** The parent (project and location) where the clusters will be listed. Specified in the format `projects/* /locations/*`. Location "-" matches all zones and all regions. */
  parent?: string;
}

export const ListProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsZonesClustersRequest>;

export type ListProjectsZonesClustersResponse = ListClustersResponse;
export const ListProjectsZonesClustersResponse = ListClustersResponse;

export type ListProjectsZonesClustersError = CommonErrors;

/** Lists all clusters owned by a project in either the specified zone or all zones. */
export const listProjectsZonesClusters: API.OperationMethod<ListProjectsZonesClustersRequest, ListProjectsZonesClustersResponse, ListProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsZonesClustersRequest,
  output: ListProjectsZonesClustersResponse,
  errors: [],
}));

export interface AddonsProjectsZonesClustersRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Request body */
  body?: SetAddonsConfigRequest;
}

export const AddonsProjectsZonesClustersRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(SetAddonsConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/addons", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddonsProjectsZonesClustersRequest>;

export type AddonsProjectsZonesClustersResponse = Operation;
export const AddonsProjectsZonesClustersResponse = Operation;

export type AddonsProjectsZonesClustersError = CommonErrors;

/** Sets the addons for a specific cluster. */
export const addonsProjectsZonesClusters: API.OperationMethod<AddonsProjectsZonesClustersRequest, AddonsProjectsZonesClustersResponse, AddonsProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddonsProjectsZonesClustersRequest,
  output: AddonsProjectsZonesClustersResponse,
  errors: [],
}));

export interface CreateProjectsZonesClustersRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId: string;
  /** Request body */
  body?: CreateClusterRequest;
}

export const CreateProjectsZonesClustersRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(CreateClusterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsZonesClustersRequest>;

export type CreateProjectsZonesClustersResponse = Operation;
export const CreateProjectsZonesClustersResponse = Operation;

export type CreateProjectsZonesClustersError = CommonErrors;

/** Creates a cluster, consisting of the specified number and type of Google Compute Engine instances. By default, the cluster is created in the project's [default network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). One firewall is added for the cluster. After cluster creation, the kubelet creates routes for each node to allow the containers on that node to communicate with all other instances in the cluster. Finally, an entry is added to the project's global metadata indicating which CIDR range the cluster is using. */
export const createProjectsZonesClusters: API.OperationMethod<CreateProjectsZonesClustersRequest, CreateProjectsZonesClustersResponse, CreateProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsZonesClustersRequest,
  output: CreateProjectsZonesClustersResponse,
  errors: [],
}));

export interface SetMasterAuthProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Request body */
  body?: SetMasterAuthRequest;
}

export const SetMasterAuthProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(SetMasterAuthRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setMasterAuth", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMasterAuthProjectsZonesClustersRequest>;

export type SetMasterAuthProjectsZonesClustersResponse = Operation;
export const SetMasterAuthProjectsZonesClustersResponse = Operation;

export type SetMasterAuthProjectsZonesClustersError = CommonErrors;

/** Sets master auth materials. Currently supports changing the admin password or a specific cluster, either via password generation or explicitly setting the password. */
export const setMasterAuthProjectsZonesClusters: API.OperationMethod<SetMasterAuthProjectsZonesClustersRequest, SetMasterAuthProjectsZonesClustersResponse, SetMasterAuthProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMasterAuthProjectsZonesClustersRequest,
  output: SetMasterAuthProjectsZonesClustersResponse,
  errors: [],
}));

export interface DeleteProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** The name (project, location, cluster) of the cluster to delete. Specified in the format `projects/* /locations/* /clusters/*`. */
  name?: string;
  /** Deprecated. The name of the cluster to delete. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
}

export const DeleteProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsZonesClustersRequest>;

export type DeleteProjectsZonesClustersResponse = Operation;
export const DeleteProjectsZonesClustersResponse = Operation;

export type DeleteProjectsZonesClustersError = CommonErrors;

/** Deletes the cluster, including the Kubernetes endpoint and all worker nodes. Firewalls and routes that were configured during cluster creation are also deleted. Other Google Compute Engine resources that might be in use by the cluster, such as load balancer resources, are not deleted if they weren't present when the cluster was initially created. */
export const deleteProjectsZonesClusters: API.OperationMethod<DeleteProjectsZonesClustersRequest, DeleteProjectsZonesClustersResponse, DeleteProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsZonesClustersRequest,
  output: DeleteProjectsZonesClustersResponse,
  errors: [],
}));

export interface MonitoringProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Request body */
  body?: SetMonitoringServiceRequest;
}

export const MonitoringProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(SetMonitoringServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/monitoring", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MonitoringProjectsZonesClustersRequest>;

export type MonitoringProjectsZonesClustersResponse = Operation;
export const MonitoringProjectsZonesClustersResponse = Operation;

export type MonitoringProjectsZonesClustersError = CommonErrors;

/** Sets the monitoring service for a specific cluster. */
export const monitoringProjectsZonesClusters: API.OperationMethod<MonitoringProjectsZonesClustersRequest, MonitoringProjectsZonesClustersResponse, MonitoringProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MonitoringProjectsZonesClustersRequest,
  output: MonitoringProjectsZonesClustersResponse,
  errors: [],
}));

export interface LegacyAbacProjectsZonesClustersRequest {
  /** Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Request body */
  body?: SetLegacyAbacRequest;
}

export const LegacyAbacProjectsZonesClustersRequest = Schema.Struct({
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(SetLegacyAbacRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/legacyAbac", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LegacyAbacProjectsZonesClustersRequest>;

export type LegacyAbacProjectsZonesClustersResponse = Operation;
export const LegacyAbacProjectsZonesClustersResponse = Operation;

export type LegacyAbacProjectsZonesClustersError = CommonErrors;

/** Enables or disables the ABAC authorization mechanism on a cluster. */
export const legacyAbacProjectsZonesClusters: API.OperationMethod<LegacyAbacProjectsZonesClustersRequest, LegacyAbacProjectsZonesClustersResponse, LegacyAbacProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LegacyAbacProjectsZonesClustersRequest,
  output: LegacyAbacProjectsZonesClustersResponse,
  errors: [],
}));

export interface LocationsProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Request body */
  body?: SetLocationsRequest;
}

export const LocationsProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(SetLocationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/locations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LocationsProjectsZonesClustersRequest>;

export type LocationsProjectsZonesClustersResponse = Operation;
export const LocationsProjectsZonesClustersResponse = Operation;

export type LocationsProjectsZonesClustersError = CommonErrors;

/** Sets the locations for a specific cluster. Deprecated. Use [projects.locations.clusters.update](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters/update) instead. */
export const locationsProjectsZonesClusters: API.OperationMethod<LocationsProjectsZonesClustersRequest, LocationsProjectsZonesClustersResponse, LocationsProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LocationsProjectsZonesClustersRequest,
  output: LocationsProjectsZonesClustersResponse,
  errors: [],
}));

export interface StartIpRotationProjectsZonesClustersRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Request body */
  body?: StartIPRotationRequest;
}

export const StartIpRotationProjectsZonesClustersRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(StartIPRotationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:startIpRotation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartIpRotationProjectsZonesClustersRequest>;

export type StartIpRotationProjectsZonesClustersResponse = Operation;
export const StartIpRotationProjectsZonesClustersResponse = Operation;

export type StartIpRotationProjectsZonesClustersError = CommonErrors;

/** Starts master IP rotation. */
export const startIpRotationProjectsZonesClusters: API.OperationMethod<StartIpRotationProjectsZonesClustersRequest, StartIpRotationProjectsZonesClustersResponse, StartIpRotationProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartIpRotationProjectsZonesClustersRequest,
  output: StartIpRotationProjectsZonesClustersResponse,
  errors: [],
}));

export interface LoggingProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Request body */
  body?: SetLoggingServiceRequest;
}

export const LoggingProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(SetLoggingServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/logging", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LoggingProjectsZonesClustersRequest>;

export type LoggingProjectsZonesClustersResponse = Operation;
export const LoggingProjectsZonesClustersResponse = Operation;

export type LoggingProjectsZonesClustersError = CommonErrors;

/** Sets the logging service for a specific cluster. */
export const loggingProjectsZonesClusters: API.OperationMethod<LoggingProjectsZonesClustersRequest, LoggingProjectsZonesClustersResponse, LoggingProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LoggingProjectsZonesClustersRequest,
  output: LoggingProjectsZonesClustersResponse,
  errors: [],
}));

export interface MasterProjectsZonesClustersRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Request body */
  body?: UpdateMasterRequest;
}

export const MasterProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(UpdateMasterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/master", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MasterProjectsZonesClustersRequest>;

export type MasterProjectsZonesClustersResponse = Operation;
export const MasterProjectsZonesClustersResponse = Operation;

export type MasterProjectsZonesClustersError = CommonErrors;

/** Updates the master for a specific cluster. */
export const masterProjectsZonesClusters: API.OperationMethod<MasterProjectsZonesClustersRequest, MasterProjectsZonesClustersResponse, MasterProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MasterProjectsZonesClustersRequest,
  output: MasterProjectsZonesClustersResponse,
  errors: [],
}));

export interface ResourceLabelsProjectsZonesClustersRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Request body */
  body?: SetLabelsRequest;
}

export const ResourceLabelsProjectsZonesClustersRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(SetLabelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/resourceLabels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResourceLabelsProjectsZonesClustersRequest>;

export type ResourceLabelsProjectsZonesClustersResponse = Operation;
export const ResourceLabelsProjectsZonesClustersResponse = Operation;

export type ResourceLabelsProjectsZonesClustersError = CommonErrors;

/** Sets labels on a cluster. */
export const resourceLabelsProjectsZonesClusters: API.OperationMethod<ResourceLabelsProjectsZonesClustersRequest, ResourceLabelsProjectsZonesClustersResponse, ResourceLabelsProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResourceLabelsProjectsZonesClustersRequest,
  output: ResourceLabelsProjectsZonesClustersResponse,
  errors: [],
}));

export interface SetMaintenancePolicyProjectsZonesClustersRequest {
  /** Required. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). */
  projectId: string;
  /** Required. The name of the cluster to update. */
  clusterId: string;
  /** Required. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. */
  zone: string;
  /** Request body */
  body?: SetMaintenancePolicyRequest;
}

export const SetMaintenancePolicyProjectsZonesClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(SetMaintenancePolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setMaintenancePolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetMaintenancePolicyProjectsZonesClustersRequest>;

export type SetMaintenancePolicyProjectsZonesClustersResponse = Operation;
export const SetMaintenancePolicyProjectsZonesClustersResponse = Operation;

export type SetMaintenancePolicyProjectsZonesClustersError = CommonErrors;

/** Sets the maintenance policy for a cluster. */
export const setMaintenancePolicyProjectsZonesClusters: API.OperationMethod<SetMaintenancePolicyProjectsZonesClustersRequest, SetMaintenancePolicyProjectsZonesClustersResponse, SetMaintenancePolicyProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetMaintenancePolicyProjectsZonesClustersRequest,
  output: SetMaintenancePolicyProjectsZonesClustersResponse,
  errors: [],
}));

export interface CompleteIpRotationProjectsZonesClustersRequest {
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Request body */
  body?: CompleteIPRotationRequest;
}

export const CompleteIpRotationProjectsZonesClustersRequest = Schema.Struct({
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(CompleteIPRotationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:completeIpRotation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteIpRotationProjectsZonesClustersRequest>;

export type CompleteIpRotationProjectsZonesClustersResponse = Operation;
export const CompleteIpRotationProjectsZonesClustersResponse = Operation;

export type CompleteIpRotationProjectsZonesClustersError = CommonErrors;

/** Completes master IP rotation. */
export const completeIpRotationProjectsZonesClusters: API.OperationMethod<CompleteIpRotationProjectsZonesClustersRequest, CompleteIpRotationProjectsZonesClustersResponse, CompleteIpRotationProjectsZonesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteIpRotationProjectsZonesClustersRequest,
  output: CompleteIpRotationProjectsZonesClustersResponse,
  errors: [],
}));

export interface FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsRequest {
  /** Required. The name (project, location, cluster, nodepool) of the nodepool to get. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*` or `projects/* /zones/* /clusters/* /nodePools/*`. */
  name: string;
  /** API request version that initiates this operation. */
  version?: string;
}

export const FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/zones/{zonesId}/clusters/{clustersId}/nodePools/{nodePoolsId}:fetchNodePoolUpgradeInfo" }),
  svc,
) as unknown as Schema.Schema<FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsRequest>;

export type FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsResponse = NodePoolUpgradeInfo;
export const FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsResponse = NodePoolUpgradeInfo;

export type FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsError = CommonErrors;

/** Fetch upgrade information of a specific nodepool. */
export const fetchNodePoolUpgradeInfoProjectsZonesClustersNodePools: API.OperationMethod<FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsRequest, FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsResponse, FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsRequest,
  output: FetchNodePoolUpgradeInfoProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface SetSizeProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Request body */
  body?: SetNodePoolSizeRequest;
}

export const SetSizeProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(SetNodePoolSizeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/setSize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetSizeProjectsZonesClustersNodePoolsRequest>;

export type SetSizeProjectsZonesClustersNodePoolsResponse = Operation;
export const SetSizeProjectsZonesClustersNodePoolsResponse = Operation;

export type SetSizeProjectsZonesClustersNodePoolsError = CommonErrors;

/** SetNodePoolSizeRequest sets the size of a node pool. The new size will be used for all replicas, including future replicas created by modifying NodePool.locations. */
export const setSizeProjectsZonesClustersNodePools: API.OperationMethod<SetSizeProjectsZonesClustersNodePoolsRequest, SetSizeProjectsZonesClustersNodePoolsResponse, SetSizeProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetSizeProjectsZonesClustersNodePoolsRequest,
  output: SetSizeProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface SetManagementProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** Request body */
  body?: SetNodePoolManagementRequest;
}

export const SetManagementProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  body: Schema.optional(SetNodePoolManagementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/setManagement", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetManagementProjectsZonesClustersNodePoolsRequest>;

export type SetManagementProjectsZonesClustersNodePoolsResponse = Operation;
export const SetManagementProjectsZonesClustersNodePoolsResponse = Operation;

export type SetManagementProjectsZonesClustersNodePoolsError = CommonErrors;

/** Sets the NodeManagement options for a node pool. */
export const setManagementProjectsZonesClustersNodePools: API.OperationMethod<SetManagementProjectsZonesClustersNodePoolsRequest, SetManagementProjectsZonesClustersNodePoolsResponse, SetManagementProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetManagementProjectsZonesClustersNodePoolsRequest,
  output: SetManagementProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface ListProjectsZonesClustersNodePoolsRequest {
  /** The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/* /locations/* /clusters/*`. */
  parent?: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. */
  clusterId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. */
  zone: string;
}

export const ListProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsZonesClustersNodePoolsRequest>;

export type ListProjectsZonesClustersNodePoolsResponse = ListNodePoolsResponse;
export const ListProjectsZonesClustersNodePoolsResponse = ListNodePoolsResponse;

export type ListProjectsZonesClustersNodePoolsError = CommonErrors;

/** Lists the node pools for a cluster. */
export const listProjectsZonesClustersNodePools: API.OperationMethod<ListProjectsZonesClustersNodePoolsRequest, ListProjectsZonesClustersNodePoolsResponse, ListProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsZonesClustersNodePoolsRequest,
  output: ListProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface DeleteProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the node pool to delete. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** The name (project, location, cluster, node pool id) of the node pool to delete. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
}

export const DeleteProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsZonesClustersNodePoolsRequest>;

export type DeleteProjectsZonesClustersNodePoolsResponse = Operation;
export const DeleteProjectsZonesClustersNodePoolsResponse = Operation;

export type DeleteProjectsZonesClustersNodePoolsError = CommonErrors;

/** Deletes a node pool from a cluster. */
export const deleteProjectsZonesClustersNodePools: API.OperationMethod<DeleteProjectsZonesClustersNodePoolsRequest, DeleteProjectsZonesClustersNodePoolsResponse, DeleteProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsZonesClustersNodePoolsRequest,
  output: DeleteProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface RollbackProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster to rollback. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the node pool to rollback. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** Request body */
  body?: RollbackNodePoolUpgradeRequest;
}

export const RollbackProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  body: Schema.optional(RollbackNodePoolUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsZonesClustersNodePoolsRequest>;

export type RollbackProjectsZonesClustersNodePoolsResponse = Operation;
export const RollbackProjectsZonesClustersNodePoolsResponse = Operation;

export type RollbackProjectsZonesClustersNodePoolsError = CommonErrors;

/** Rolls back a previously Aborted or Failed NodePool upgrade. This makes no changes if the last upgrade successfully completed. */
export const rollbackProjectsZonesClustersNodePools: API.OperationMethod<RollbackProjectsZonesClustersNodePoolsRequest, RollbackProjectsZonesClustersNodePoolsResponse, RollbackProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsZonesClustersNodePoolsRequest,
  output: RollbackProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface AutoscalingProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Request body */
  body?: SetNodePoolAutoscalingRequest;
}

export const AutoscalingProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(SetNodePoolAutoscalingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/autoscaling", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AutoscalingProjectsZonesClustersNodePoolsRequest>;

export type AutoscalingProjectsZonesClustersNodePoolsResponse = Operation;
export const AutoscalingProjectsZonesClustersNodePoolsResponse = Operation;

export type AutoscalingProjectsZonesClustersNodePoolsError = CommonErrors;

/** Sets the autoscaling settings of a specific node pool. */
export const autoscalingProjectsZonesClustersNodePools: API.OperationMethod<AutoscalingProjectsZonesClustersNodePoolsRequest, AutoscalingProjectsZonesClustersNodePoolsResponse, AutoscalingProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AutoscalingProjectsZonesClustersNodePoolsRequest,
  output: AutoscalingProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface GetProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the node pool. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** The name (project, location, cluster, node pool id) of the node pool to get. Specified in the format `projects/* /locations/* /clusters/* /nodePools/*`. */
  name?: string;
}

export const GetProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsZonesClustersNodePoolsRequest>;

export type GetProjectsZonesClustersNodePoolsResponse = NodePool;
export const GetProjectsZonesClustersNodePoolsResponse = NodePool;

export type GetProjectsZonesClustersNodePoolsError = CommonErrors;

/** Retrieves the requested node pool. */
export const getProjectsZonesClustersNodePools: API.OperationMethod<GetProjectsZonesClustersNodePoolsRequest, GetProjectsZonesClustersNodePoolsResponse, GetProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsZonesClustersNodePoolsRequest,
  output: GetProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface CreateProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId: string;
  /** Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field. */
  zone: string;
  /** Request body */
  body?: CreateNodePoolRequest;
}

export const CreateProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(CreateNodePoolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsZonesClustersNodePoolsRequest>;

export type CreateProjectsZonesClustersNodePoolsResponse = Operation;
export const CreateProjectsZonesClustersNodePoolsResponse = Operation;

export type CreateProjectsZonesClustersNodePoolsError = CommonErrors;

/** Creates a node pool for a cluster. */
export const createProjectsZonesClustersNodePools: API.OperationMethod<CreateProjectsZonesClustersNodePoolsRequest, CreateProjectsZonesClustersNodePoolsResponse, CreateProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsZonesClustersNodePoolsRequest,
  output: CreateProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface UpdateProjectsZonesClustersNodePoolsRequest {
  /** Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field. */
  nodePoolId: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field. */
  clusterId: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Request body */
  body?: UpdateNodePoolRequest;
}

export const UpdateProjectsZonesClustersNodePoolsRequest = Schema.Struct({
  nodePoolId: Schema.String.pipe(T.HttpPath("nodePoolId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  body: Schema.optional(UpdateNodePoolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools/{nodePoolId}/update", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsZonesClustersNodePoolsRequest>;

export type UpdateProjectsZonesClustersNodePoolsResponse = Operation;
export const UpdateProjectsZonesClustersNodePoolsResponse = Operation;

export type UpdateProjectsZonesClustersNodePoolsError = CommonErrors;

/** Updates the version and/or image type of a specific node pool. */
export const updateProjectsZonesClustersNodePools: API.OperationMethod<UpdateProjectsZonesClustersNodePoolsRequest, UpdateProjectsZonesClustersNodePoolsResponse, UpdateProjectsZonesClustersNodePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsZonesClustersNodePoolsRequest,
  output: UpdateProjectsZonesClustersNodePoolsResponse,
  errors: [],
}));

export interface GetProjectsZonesOperationsRequest {
  /** Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. */
  operationId: string;
  /** The name (project, location, operation id) of the operation to get. Specified in the format `projects/* /locations/* /operations/*`. */
  name?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
}

export const GetProjectsZonesOperationsRequest = Schema.Struct({
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/operations/{operationId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsZonesOperationsRequest>;

export type GetProjectsZonesOperationsResponse = Operation;
export const GetProjectsZonesOperationsResponse = Operation;

export type GetProjectsZonesOperationsError = CommonErrors;

/** Gets the specified operation. */
export const getProjectsZonesOperations: API.OperationMethod<GetProjectsZonesOperationsRequest, GetProjectsZonesOperationsResponse, GetProjectsZonesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsZonesOperationsRequest,
  output: GetProjectsZonesOperationsResponse,
  errors: [],
}));

export interface ListProjectsZonesOperationsRequest {
  /** The parent (project and location) where the operations will be listed. Specified in the format `projects/* /locations/*`. Location "-" matches all zones and all regions. */
  parent?: string;
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) to return operations for, or `-` for all zones. This field has been deprecated and replaced by the parent field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field. */
  projectId: string;
}

export const ListProjectsZonesOperationsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectId}/zones/{zone}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsZonesOperationsRequest>;

export type ListProjectsZonesOperationsResponse = ListOperationsResponse;
export const ListProjectsZonesOperationsResponse = ListOperationsResponse;

export type ListProjectsZonesOperationsError = CommonErrors;

/** Lists all operations in a project in the specified zone or all zones. */
export const listProjectsZonesOperations: API.OperationMethod<ListProjectsZonesOperationsRequest, ListProjectsZonesOperationsResponse, ListProjectsZonesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsZonesOperationsRequest,
  output: ListProjectsZonesOperationsResponse,
  errors: [],
}));

export interface CancelProjectsZonesOperationsRequest {
  /** Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the operation resides. This field has been deprecated and replaced by the name field. */
  zone: string;
  /** Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field. */
  projectId: string;
  /** Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field. */
  operationId: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsZonesOperationsRequest = Schema.Struct({
  zone: Schema.String.pipe(T.HttpPath("zone")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectId}/zones/{zone}/operations/{operationId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsZonesOperationsRequest>;

export type CancelProjectsZonesOperationsResponse = Empty;
export const CancelProjectsZonesOperationsResponse = Empty;

export type CancelProjectsZonesOperationsError = CommonErrors;

/** Cancels the specified operation. */
export const cancelProjectsZonesOperations: API.OperationMethod<CancelProjectsZonesOperationsRequest, CancelProjectsZonesOperationsResponse, CancelProjectsZonesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsZonesOperationsRequest,
  output: CancelProjectsZonesOperationsResponse,
  errors: [],
}));

