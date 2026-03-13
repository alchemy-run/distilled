// ==========================================================================
// Cloud Dataproc API (dataproc v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "dataproc",
  version: "v1",
  rootUrl: "https://dataproc.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestedPolicyVersion: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GetPolicyOptions",
  }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A GetPolicyOptions object for specifying options to GetIamPolicy. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(GetPolicyOptions),
    }),
  ).annotate({
    identifier: "GetIamPolicyRequest",
  }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface InputMetrics {
  bytesRead?: string;
  recordsRead?: string;
}

export const InputMetrics: Schema.Schema<InputMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bytesRead: Schema.optional(Schema.String),
      recordsRead: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InputMetrics",
  }) as any as Schema.Schema<InputMetrics>;

export interface ShufflePushReadMetrics {
  localMergedChunksFetched?: string;
  remoteMergedBlocksFetched?: string;
  remoteMergedBytesRead?: string;
  localMergedBytesRead?: string;
  localMergedBlocksFetched?: string;
  corruptMergedBlockChunks?: string;
  remoteMergedChunksFetched?: string;
  mergedFetchFallbackCount?: string;
  remoteMergedReqsDuration?: string;
}

export const ShufflePushReadMetrics: Schema.Schema<ShufflePushReadMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      localMergedChunksFetched: Schema.optional(Schema.String),
      remoteMergedBlocksFetched: Schema.optional(Schema.String),
      remoteMergedBytesRead: Schema.optional(Schema.String),
      localMergedBytesRead: Schema.optional(Schema.String),
      localMergedBlocksFetched: Schema.optional(Schema.String),
      corruptMergedBlockChunks: Schema.optional(Schema.String),
      remoteMergedChunksFetched: Schema.optional(Schema.String),
      mergedFetchFallbackCount: Schema.optional(Schema.String),
      remoteMergedReqsDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShufflePushReadMetrics",
  }) as any as Schema.Schema<ShufflePushReadMetrics>;

export interface ShuffleReadMetrics {
  remoteReqsDuration?: string;
  remoteBytesRead?: string;
  fetchWaitTimeMillis?: string;
  shufflePushReadMetrics?: ShufflePushReadMetrics;
  recordsRead?: string;
  localBlocksFetched?: string;
  localBytesRead?: string;
  remoteBytesReadToDisk?: string;
  remoteBlocksFetched?: string;
}

export const ShuffleReadMetrics: Schema.Schema<ShuffleReadMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      remoteReqsDuration: Schema.optional(Schema.String),
      remoteBytesRead: Schema.optional(Schema.String),
      fetchWaitTimeMillis: Schema.optional(Schema.String),
      shufflePushReadMetrics: Schema.optional(ShufflePushReadMetrics),
      recordsRead: Schema.optional(Schema.String),
      localBlocksFetched: Schema.optional(Schema.String),
      localBytesRead: Schema.optional(Schema.String),
      remoteBytesReadToDisk: Schema.optional(Schema.String),
      remoteBlocksFetched: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShuffleReadMetrics",
  }) as any as Schema.Schema<ShuffleReadMetrics>;

export interface OutputMetrics {
  bytesWritten?: string;
  recordsWritten?: string;
}

export const OutputMetrics: Schema.Schema<OutputMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bytesWritten: Schema.optional(Schema.String),
      recordsWritten: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OutputMetrics",
  }) as any as Schema.Schema<OutputMetrics>;

export interface ShuffleWriteMetrics {
  writeTimeNanos?: string;
  recordsWritten?: string;
  bytesWritten?: string;
}

export const ShuffleWriteMetrics: Schema.Schema<ShuffleWriteMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      writeTimeNanos: Schema.optional(Schema.String),
      recordsWritten: Schema.optional(Schema.String),
      bytesWritten: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShuffleWriteMetrics",
  }) as any as Schema.Schema<ShuffleWriteMetrics>;

export interface TaskMetrics {
  executorCpuTimeNanos?: string;
  diskBytesSpilled?: string;
  memoryBytesSpilled?: string;
  jvmGcTimeMillis?: string;
  inputMetrics?: InputMetrics;
  executorRunTimeMillis?: string;
  peakExecutionMemoryBytes?: string;
  shuffleReadMetrics?: ShuffleReadMetrics;
  outputMetrics?: OutputMetrics;
  executorDeserializeTimeMillis?: string;
  resultSize?: string;
  resultSerializationTimeMillis?: string;
  shuffleWriteMetrics?: ShuffleWriteMetrics;
  executorDeserializeCpuTimeNanos?: string;
}

export const TaskMetrics: Schema.Schema<TaskMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executorCpuTimeNanos: Schema.optional(Schema.String),
      diskBytesSpilled: Schema.optional(Schema.String),
      memoryBytesSpilled: Schema.optional(Schema.String),
      jvmGcTimeMillis: Schema.optional(Schema.String),
      inputMetrics: Schema.optional(InputMetrics),
      executorRunTimeMillis: Schema.optional(Schema.String),
      peakExecutionMemoryBytes: Schema.optional(Schema.String),
      shuffleReadMetrics: Schema.optional(ShuffleReadMetrics),
      outputMetrics: Schema.optional(OutputMetrics),
      executorDeserializeTimeMillis: Schema.optional(Schema.String),
      resultSize: Schema.optional(Schema.String),
      resultSerializationTimeMillis: Schema.optional(Schema.String),
      shuffleWriteMetrics: Schema.optional(ShuffleWriteMetrics),
      executorDeserializeCpuTimeNanos: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TaskMetrics",
  }) as any as Schema.Schema<TaskMetrics>;

export interface AccumulableInfo {
  value?: string;
  update?: string;
  accumullableInfoId?: string;
  name?: string;
}

export const AccumulableInfo: Schema.Schema<AccumulableInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      update: Schema.optional(Schema.String),
      accumullableInfoId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccumulableInfo",
  }) as any as Schema.Schema<AccumulableInfo>;

export interface TaskData {
  executorLogs?: Record<string, string>;
  taskLocality?: string;
  taskId?: string;
  taskMetrics?: TaskMetrics;
  executorId?: string;
  index?: number;
  durationMillis?: string;
  partitionId?: number;
  accumulatorUpdates?: Array<AccumulableInfo>;
  host?: string;
  schedulerDelayMillis?: string;
  stageId?: string;
  stageAttemptId?: number;
  hasMetrics?: boolean;
  gettingResultTimeMillis?: string;
  status?: string;
  errorMessage?: string;
  resultFetchStart?: string;
  speculative?: boolean;
  attempt?: number;
  launchTime?: string;
}

export const TaskData: Schema.Schema<TaskData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executorLogs: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      taskLocality: Schema.optional(Schema.String),
      taskId: Schema.optional(Schema.String),
      taskMetrics: Schema.optional(TaskMetrics),
      executorId: Schema.optional(Schema.String),
      index: Schema.optional(Schema.Number),
      durationMillis: Schema.optional(Schema.String),
      partitionId: Schema.optional(Schema.Number),
      accumulatorUpdates: Schema.optional(Schema.Array(AccumulableInfo)),
      host: Schema.optional(Schema.String),
      schedulerDelayMillis: Schema.optional(Schema.String),
      stageId: Schema.optional(Schema.String),
      stageAttemptId: Schema.optional(Schema.Number),
      hasMetrics: Schema.optional(Schema.Boolean),
      gettingResultTimeMillis: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      resultFetchStart: Schema.optional(Schema.String),
      speculative: Schema.optional(Schema.Boolean),
      attempt: Schema.optional(Schema.Number),
      launchTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TaskData" }) as any as Schema.Schema<TaskData>;

export interface TaskResourceRequest {
  amount?: number;
  resourceName?: string;
}

export const TaskResourceRequest: Schema.Schema<TaskResourceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      amount: Schema.optional(Schema.Number),
      resourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TaskResourceRequest",
  }) as any as Schema.Schema<TaskResourceRequest>;

export interface ExecutorResourceRequest {
  amount?: string;
  discoveryScript?: string;
  resourceName?: string;
  vendor?: string;
}

export const ExecutorResourceRequest: Schema.Schema<ExecutorResourceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      amount: Schema.optional(Schema.String),
      discoveryScript: Schema.optional(Schema.String),
      resourceName: Schema.optional(Schema.String),
      vendor: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExecutorResourceRequest",
  }) as any as Schema.Schema<ExecutorResourceRequest>;

export interface ResourceProfileInfo {
  taskResources?: Record<string, TaskResourceRequest>;
  executorResources?: Record<string, ExecutorResourceRequest>;
  resourceProfileId?: number;
}

export const ResourceProfileInfo: Schema.Schema<ResourceProfileInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      taskResources: Schema.optional(
        Schema.Record(Schema.String, TaskResourceRequest),
      ),
      executorResources: Schema.optional(
        Schema.Record(Schema.String, ExecutorResourceRequest),
      ),
      resourceProfileId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ResourceProfileInfo",
  }) as any as Schema.Schema<ResourceProfileInfo>;

export interface KubernetesSoftwareConfig {
  /** The components that should be installed in this Dataproc cluster. The key must be a string from the KubernetesComponent enumeration. The value is the version of the software to be installed. At least one entry must be specified. */
  componentVersion?: Record<string, string>;
  /** The properties to set on daemon config files.Property keys are specified in prefix:property format, for example spark:spark.kubernetes.container.image. The following are supported prefixes and their mappings: spark: spark-defaults.confFor more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties). */
  properties?: Record<string, string>;
}

export const KubernetesSoftwareConfig: Schema.Schema<KubernetesSoftwareConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      componentVersion: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "KubernetesSoftwareConfig",
  }) as any as Schema.Schema<KubernetesSoftwareConfig>;

export interface NamespacedGkeDeploymentTarget {
  /** Optional. A namespace within the GKE cluster to deploy into. */
  clusterNamespace?: string;
  /** Optional. The target GKE cluster to deploy to. Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}' */
  targetGkeCluster?: string;
}

export const NamespacedGkeDeploymentTarget: Schema.Schema<NamespacedGkeDeploymentTarget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterNamespace: Schema.optional(Schema.String),
      targetGkeCluster: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NamespacedGkeDeploymentTarget",
  }) as any as Schema.Schema<NamespacedGkeDeploymentTarget>;

export interface GkeNodePoolAutoscalingConfig {
  /** The minimum number of nodes in the node pool. Must be >= 0 and <= max_node_count. */
  minNodeCount?: number;
  /** The maximum number of nodes in the node pool. Must be >= min_node_count, and must be > 0. Note: Quota must be sufficient to scale up the cluster. */
  maxNodeCount?: number;
}

export const GkeNodePoolAutoscalingConfig: Schema.Schema<GkeNodePoolAutoscalingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minNodeCount: Schema.optional(Schema.Number),
      maxNodeCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GkeNodePoolAutoscalingConfig",
  }) as any as Schema.Schema<GkeNodePoolAutoscalingConfig>;

export interface GkeNodePoolAcceleratorConfig {
  /** The number of accelerator cards exposed to an instance. */
  acceleratorCount?: string;
  /** The accelerator type resource namename (see GPUs on Compute Engine). */
  acceleratorType?: string;
  /** Size of partitions to create on the GPU. Valid values are described in the NVIDIA mig user guide (https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning). */
  gpuPartitionSize?: string;
}

export const GkeNodePoolAcceleratorConfig: Schema.Schema<GkeNodePoolAcceleratorConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      acceleratorCount: Schema.optional(Schema.String),
      acceleratorType: Schema.optional(Schema.String),
      gpuPartitionSize: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GkeNodePoolAcceleratorConfig",
  }) as any as Schema.Schema<GkeNodePoolAcceleratorConfig>;

export interface GkeNodeConfig {
  /** Optional. The name of a Compute Engine machine type (https://cloud.google.com/compute/docs/machine-types). */
  machineType?: string;
  /** Optional. A list of hardware accelerators (https://cloud.google.com/compute/docs/gpus) to attach to each node. */
  accelerators?: Array<GkeNodePoolAcceleratorConfig>;
  /** Optional. Whether the nodes are created as legacy preemptible VM instances (https://cloud.google.com/compute/docs/instances/preemptible). Also see Spot VMs, preemptible VM instances without a maximum lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role). */
  preemptible?: boolean;
  /** Optional. Minimum CPU platform (https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform) to be used by this instance. The instance may be scheduled on the specified or a newer CPU platform. Specify the friendly names of CPU platforms, such as "Intel Haswell"` or Intel Sandy Bridge". */
  minCpuPlatform?: string;
  /** Optional. The number of local SSD disks to attach to the node, which is limited by the maximum number of disks allowable per zone (see Adding Local SSDs (https://cloud.google.com/compute/docs/disks/local-ssd)). */
  localSsdCount?: number;
  /** Optional. Whether the nodes are created as Spot VM instances (https://cloud.google.com/compute/docs/instances/spot). Spot VMs are the latest update to legacy preemptible VMs. Spot VMs do not have a maximum lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role is not assigned (the DEFAULT node pool will assume the CONTROLLER role). */
  spot?: boolean;
  /** Optional. The Customer Managed Encryption Key (CMEK) (https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek) used to encrypt the boot disk attached to each node in the node pool. Specify the key using the following format: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key} */
  bootDiskKmsKey?: string;
}

export const GkeNodeConfig: Schema.Schema<GkeNodeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
      accelerators: Schema.optional(Schema.Array(GkeNodePoolAcceleratorConfig)),
      preemptible: Schema.optional(Schema.Boolean),
      minCpuPlatform: Schema.optional(Schema.String),
      localSsdCount: Schema.optional(Schema.Number),
      spot: Schema.optional(Schema.Boolean),
      bootDiskKmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GkeNodeConfig",
  }) as any as Schema.Schema<GkeNodeConfig>;

export interface GkeNodePoolConfig {
  /** Optional. The list of Compute Engine zones (https://cloud.google.com/compute/docs/zones#available) where node pool nodes associated with a Dataproc on GKE virtual cluster will be located.Note: All node pools associated with a virtual cluster must be located in the same region as the virtual cluster, and they must be located in the same zone within that region.If a location is not specified during node pool creation, Dataproc on GKE will choose the zone. */
  locations?: Array<string>;
  /** Optional. The autoscaler configuration for this node pool. The autoscaler is enabled only when a valid configuration is present. */
  autoscaling?: GkeNodePoolAutoscalingConfig;
  /** Optional. The node pool configuration. */
  config?: GkeNodeConfig;
}

export const GkeNodePoolConfig: Schema.Schema<GkeNodePoolConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Schema.String)),
      autoscaling: Schema.optional(GkeNodePoolAutoscalingConfig),
      config: Schema.optional(GkeNodeConfig),
    }),
  ).annotate({
    identifier: "GkeNodePoolConfig",
  }) as any as Schema.Schema<GkeNodePoolConfig>;

export interface GkeNodePoolTarget {
  /** Required. The roles associated with the GKE node pool. */
  roles?: Array<
    | "ROLE_UNSPECIFIED"
    | "DEFAULT"
    | "CONTROLLER"
    | "SPARK_DRIVER"
    | "SPARK_EXECUTOR"
    | (string & {})
  >;
  /** Required. The target GKE node pool. Format: 'projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}' */
  nodePool?: string;
  /** Input only. The configuration for the GKE node pool.If specified, Dataproc attempts to create a node pool with the specified shape. If one with the same name already exists, it is verified against all specified fields. If a field differs, the virtual cluster creation will fail.If omitted, any node pool with the specified name is used. If a node pool with the specified name does not exist, Dataproc create a node pool with default values.This is an input only field. It will not be returned by the API. */
  nodePoolConfig?: GkeNodePoolConfig;
}

export const GkeNodePoolTarget: Schema.Schema<GkeNodePoolTarget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      roles: Schema.optional(Schema.Array(Schema.String)),
      nodePool: Schema.optional(Schema.String),
      nodePoolConfig: Schema.optional(GkeNodePoolConfig),
    }),
  ).annotate({
    identifier: "GkeNodePoolTarget",
  }) as any as Schema.Schema<GkeNodePoolTarget>;

export interface GkeClusterConfig {
  /** Optional. Deprecated. Use gkeClusterTarget. Used only for the deprecated beta. A target for the deployment. */
  namespacedGkeDeploymentTarget?: NamespacedGkeDeploymentTarget;
  /** Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}' */
  gkeClusterTarget?: string;
  /** Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT GkeNodePoolTarget.Role. If a GkeNodePoolTarget is not specified, Dataproc constructs a DEFAULT GkeNodePoolTarget. Each role can be given to only one GkeNodePoolTarget. All node pools must have the same location settings. */
  nodePoolTarget?: Array<GkeNodePoolTarget>;
}

export const GkeClusterConfig: Schema.Schema<GkeClusterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      namespacedGkeDeploymentTarget: Schema.optional(
        NamespacedGkeDeploymentTarget,
      ),
      gkeClusterTarget: Schema.optional(Schema.String),
      nodePoolTarget: Schema.optional(Schema.Array(GkeNodePoolTarget)),
    }),
  ).annotate({
    identifier: "GkeClusterConfig",
  }) as any as Schema.Schema<GkeClusterConfig>;

export interface KubernetesClusterConfig {
  /** Optional. The software configuration for this Dataproc cluster running on Kubernetes. */
  kubernetesSoftwareConfig?: KubernetesSoftwareConfig;
  /** Required. The configuration for running the Dataproc cluster on GKE. */
  gkeClusterConfig?: GkeClusterConfig;
  /** Optional. A namespace within the Kubernetes cluster to deploy into. If this namespace does not exist, it is created. If it exists, Dataproc verifies that another Dataproc VirtualCluster is not installed into it. If not specified, the name of the Dataproc Cluster is used. */
  kubernetesNamespace?: string;
}

export const KubernetesClusterConfig: Schema.Schema<KubernetesClusterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kubernetesSoftwareConfig: Schema.optional(KubernetesSoftwareConfig),
      gkeClusterConfig: Schema.optional(GkeClusterConfig),
      kubernetesNamespace: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "KubernetesClusterConfig",
  }) as any as Schema.Schema<KubernetesClusterConfig>;

export interface SparkConnectExecutionInfo {
  /** statement of the execution. */
  statement?: string;
  /** Output only. Current state of the execution. */
  state?:
    | "EXECUTION_STATE_UNKNOWN"
    | "EXECUTION_STATE_STARTED"
    | "EXECUTION_STATE_COMPILED"
    | "EXECUTION_STATE_READY"
    | "EXECUTION_STATE_CANCELED"
    | "EXECUTION_STATE_FAILED"
    | "EXECUTION_STATE_FINISHED"
    | "EXECUTION_STATE_CLOSED"
    | (string & {});
  /** Optional. Tags associated with the Spark session. */
  sparkSessionTags?: Array<string>;
  /** Required. Session ID, ties the execution to a specific Spark Connect session. */
  sessionId?: string;
  /** Optional. List of sql execution ids associated with the execution. */
  sqlExecIds?: Array<string>;
  /** Optional. List of job ids associated with the execution. */
  jobIds?: Array<string>;
  /** Timestamp when the execution finished. */
  finishTimestamp?: string;
  /** Timestamp when the execution was closed. */
  closeTimestamp?: string;
  /** User ID of the user who started the execution. */
  userId?: string;
  /** Detailed information about the execution. */
  detail?: string;
  /** Required. Job tag of the execution. */
  jobTag?: string;
  /** Unique identifier for the operation. */
  operationId?: string;
  /** Timestamp when the execution started. */
  startTimestamp?: string;
}

export const SparkConnectExecutionInfo: Schema.Schema<SparkConnectExecutionInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      statement: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      sparkSessionTags: Schema.optional(Schema.Array(Schema.String)),
      sessionId: Schema.optional(Schema.String),
      sqlExecIds: Schema.optional(Schema.Array(Schema.String)),
      jobIds: Schema.optional(Schema.Array(Schema.String)),
      finishTimestamp: Schema.optional(Schema.String),
      closeTimestamp: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      jobTag: Schema.optional(Schema.String),
      operationId: Schema.optional(Schema.String),
      startTimestamp: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkConnectExecutionInfo",
  }) as any as Schema.Schema<SparkConnectExecutionInfo>;

export interface JobPlacement {
  /** Output only. A cluster UUID generated by the Dataproc service when the job is submitted. */
  clusterUuid?: string;
  /** Optional. Cluster labels to identify a cluster where the job will be submitted. */
  clusterLabels?: Record<string, string>;
  /** Required. The name of the cluster where the job will be submitted. */
  clusterName?: string;
}

export const JobPlacement: Schema.Schema<JobPlacement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterUuid: Schema.optional(Schema.String),
      clusterLabels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      clusterName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "JobPlacement",
  }) as any as Schema.Schema<JobPlacement>;

export interface Quantiles {
  percentile25?: string;
  percentile75?: string;
  maximum?: string;
  percentile50?: string;
  count?: string;
  minimum?: string;
  sum?: string;
}

export const Quantiles: Schema.Schema<Quantiles> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      percentile25: Schema.optional(Schema.String),
      percentile75: Schema.optional(Schema.String),
      maximum: Schema.optional(Schema.String),
      percentile50: Schema.optional(Schema.String),
      count: Schema.optional(Schema.String),
      minimum: Schema.optional(Schema.String),
      sum: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Quantiles" }) as any as Schema.Schema<Quantiles>;

export interface OutputQuantileMetrics {
  recordsWritten?: Quantiles;
  bytesWritten?: Quantiles;
}

export const OutputQuantileMetrics: Schema.Schema<OutputQuantileMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recordsWritten: Schema.optional(Quantiles),
      bytesWritten: Schema.optional(Quantiles),
    }),
  ).annotate({
    identifier: "OutputQuantileMetrics",
  }) as any as Schema.Schema<OutputQuantileMetrics>;

export interface MetastoreConfig {
  /** Required. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[dataproc_region]/services/[service-name] */
  dataprocMetastoreService?: string;
}

export const MetastoreConfig: Schema.Schema<MetastoreConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataprocMetastoreService: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MetastoreConfig",
  }) as any as Schema.Schema<MetastoreConfig>;

export interface SparkHistoryServerConfig {
  /** Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name] */
  dataprocCluster?: string;
}

export const SparkHistoryServerConfig: Schema.Schema<SparkHistoryServerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataprocCluster: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkHistoryServerConfig",
  }) as any as Schema.Schema<SparkHistoryServerConfig>;

export interface AuxiliaryServicesConfig {
  /** Optional. The Hive Metastore configuration for this workload. */
  metastoreConfig?: MetastoreConfig;
  /** Optional. The Spark History Server configuration for the workload. */
  sparkHistoryServerConfig?: SparkHistoryServerConfig;
}

export const AuxiliaryServicesConfig: Schema.Schema<AuxiliaryServicesConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metastoreConfig: Schema.optional(MetastoreConfig),
      sparkHistoryServerConfig: Schema.optional(SparkHistoryServerConfig),
    }),
  ).annotate({
    identifier: "AuxiliaryServicesConfig",
  }) as any as Schema.Schema<AuxiliaryServicesConfig>;

export interface VirtualClusterConfig {
  /** Optional. Configuration of auxiliary services used by this cluster. */
  auxiliaryServicesConfig?: AuxiliaryServicesConfig;
  /** Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket. */
  stagingBucket?: string;
  /** Required. The configuration for running the Dataproc cluster on Kubernetes. */
  kubernetesClusterConfig?: KubernetesClusterConfig;
}

export const VirtualClusterConfig: Schema.Schema<VirtualClusterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      auxiliaryServicesConfig: Schema.optional(AuxiliaryServicesConfig),
      stagingBucket: Schema.optional(Schema.String),
      kubernetesClusterConfig: Schema.optional(KubernetesClusterConfig),
    }),
  ).annotate({
    identifier: "VirtualClusterConfig",
  }) as any as Schema.Schema<VirtualClusterConfig>;

export interface SqlPlanMetric {
  name?: string;
  metricType?: string;
  accumulatorId?: string;
}

export const SqlPlanMetric: Schema.Schema<SqlPlanMetric> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metricType: Schema.optional(Schema.String),
      accumulatorId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SqlPlanMetric",
  }) as any as Schema.Schema<SqlPlanMetric>;

export interface SparkPlanGraphNode {
  desc?: string;
  sparkPlanGraphNodeId?: string;
  name?: string;
  metrics?: Array<SqlPlanMetric>;
}

export const SparkPlanGraphNode: Schema.Schema<SparkPlanGraphNode> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      desc: Schema.optional(Schema.String),
      sparkPlanGraphNodeId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.Array(SqlPlanMetric)),
    }),
  ).annotate({
    identifier: "SparkPlanGraphNode",
  }) as any as Schema.Schema<SparkPlanGraphNode>;

export interface SparkPlanGraphCluster {
  desc?: string;
  sparkPlanGraphClusterId?: string;
  nodes?: Array<SparkPlanGraphNodeWrapper>;
  name?: string;
  metrics?: Array<SqlPlanMetric>;
}

export const SparkPlanGraphCluster: Schema.Schema<SparkPlanGraphCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      desc: Schema.optional(Schema.String),
      sparkPlanGraphClusterId: Schema.optional(Schema.String),
      nodes: Schema.optional(Schema.Array(SparkPlanGraphNodeWrapper)),
      name: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.Array(SqlPlanMetric)),
    }),
  ).annotate({
    identifier: "SparkPlanGraphCluster",
  }) as any as Schema.Schema<SparkPlanGraphCluster>;

export interface SparkPlanGraphNodeWrapper {
  node?: SparkPlanGraphNode;
  cluster?: SparkPlanGraphCluster;
}

export const SparkPlanGraphNodeWrapper: Schema.Schema<SparkPlanGraphNodeWrapper> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      node: Schema.optional(SparkPlanGraphNode),
      cluster: Schema.optional(SparkPlanGraphCluster),
    }),
  ).annotate({
    identifier: "SparkPlanGraphNodeWrapper",
  }) as any as Schema.Schema<SparkPlanGraphNodeWrapper>;

export interface LoggingConfig {
  /** The per-package log levels for the driver. This can include "root" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG' */
  driverLogLevels?: Record<
    string,
    | "LEVEL_UNSPECIFIED"
    | "ALL"
    | "TRACE"
    | "DEBUG"
    | "INFO"
    | "WARN"
    | "ERROR"
    | "FATAL"
    | "OFF"
    | (string & {})
  >;
}

export const LoggingConfig: Schema.Schema<LoggingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      driverLogLevels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "LoggingConfig",
  }) as any as Schema.Schema<LoggingConfig>;

export interface SparkRJob {
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** Optional. A mapping of property names to values, used to configure SparkR. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
  /** Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks. */
  fileUris?: Array<string>;
  /** Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission. */
  args?: Array<string>;
  /** Required. The HCFS URI of the main R file to use as the driver. Must be a .R file. */
  mainRFileUri?: string;
}

export const SparkRJob: Schema.Schema<SparkRJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      loggingConfig: Schema.optional(LoggingConfig),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      args: Schema.optional(Schema.Array(Schema.String)),
      mainRFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SparkRJob" }) as any as Schema.Schema<SparkRJob>;

export interface ValueValidation {
  /** Required. List of allowed values for the parameter. */
  values?: Array<string>;
}

export const ValueValidation: Schema.Schema<ValueValidation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ValueValidation",
  }) as any as Schema.Schema<ValueValidation>;

export interface JobData {
  status?:
    | "JOB_EXECUTION_STATUS_UNSPECIFIED"
    | "JOB_EXECUTION_STATUS_RUNNING"
    | "JOB_EXECUTION_STATUS_SUCCEEDED"
    | "JOB_EXECUTION_STATUS_FAILED"
    | "JOB_EXECUTION_STATUS_UNKNOWN"
    | (string & {});
  numCompletedTasks?: number;
  jobGroup?: string;
  numCompletedIndices?: number;
  numFailedStages?: number;
  numTasks?: number;
  numSkippedStages?: number;
  sqlExecutionId?: string;
  description?: string;
  numActiveStages?: number;
  skippedStages?: Array<number>;
  numActiveTasks?: number;
  killTasksSummary?: Record<string, number>;
  completionTime?: string;
  numFailedTasks?: number;
  numSkippedTasks?: number;
  numCompletedStages?: number;
  stageIds?: Array<string>;
  jobId?: string;
  submissionTime?: string;
  name?: string;
  numKilledTasks?: number;
}

export const JobData: Schema.Schema<JobData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      numCompletedTasks: Schema.optional(Schema.Number),
      jobGroup: Schema.optional(Schema.String),
      numCompletedIndices: Schema.optional(Schema.Number),
      numFailedStages: Schema.optional(Schema.Number),
      numTasks: Schema.optional(Schema.Number),
      numSkippedStages: Schema.optional(Schema.Number),
      sqlExecutionId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      numActiveStages: Schema.optional(Schema.Number),
      skippedStages: Schema.optional(Schema.Array(Schema.Number)),
      numActiveTasks: Schema.optional(Schema.Number),
      killTasksSummary: Schema.optional(
        Schema.Record(Schema.String, Schema.Number),
      ),
      completionTime: Schema.optional(Schema.String),
      numFailedTasks: Schema.optional(Schema.Number),
      numSkippedTasks: Schema.optional(Schema.Number),
      numCompletedStages: Schema.optional(Schema.Number),
      stageIds: Schema.optional(Schema.Array(Schema.String)),
      jobId: Schema.optional(Schema.String),
      submissionTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      numKilledTasks: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "JobData" }) as any as Schema.Schema<JobData>;

export interface StageAttemptTasksSummary {
  numKilledTasks?: number;
  numPendingTasks?: number;
  stageId?: string;
  numRunningTasks?: number;
  applicationId?: string;
  numTasks?: number;
  numSuccessTasks?: number;
  numFailedTasks?: number;
  stageAttemptId?: number;
}

export const StageAttemptTasksSummary: Schema.Schema<StageAttemptTasksSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      numKilledTasks: Schema.optional(Schema.Number),
      numPendingTasks: Schema.optional(Schema.Number),
      stageId: Schema.optional(Schema.String),
      numRunningTasks: Schema.optional(Schema.Number),
      applicationId: Schema.optional(Schema.String),
      numTasks: Schema.optional(Schema.Number),
      numSuccessTasks: Schema.optional(Schema.Number),
      numFailedTasks: Schema.optional(Schema.Number),
      stageAttemptId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "StageAttemptTasksSummary",
  }) as any as Schema.Schema<StageAttemptTasksSummary>;

export interface SummarizeSessionSparkApplicationStageAttemptTasksResponse {
  /** Summary of tasks for a Spark Application Stage Attempt */
  stageAttemptTasksSummary?: StageAttemptTasksSummary;
}

export const SummarizeSessionSparkApplicationStageAttemptTasksResponse: Schema.Schema<SummarizeSessionSparkApplicationStageAttemptTasksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stageAttemptTasksSummary: Schema.optional(StageAttemptTasksSummary),
    }),
  ).annotate({
    identifier: "SummarizeSessionSparkApplicationStageAttemptTasksResponse",
  }) as any as Schema.Schema<SummarizeSessionSparkApplicationStageAttemptTasksResponse>;

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

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding.If the condition evaluates to true, then this binding applies to the current request.If the condition evaluates to false, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. members can have the following values: allUsers: A special identifier that represents anyone who is on the internet; with or without a Google account. allAuthenticatedUsers: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. user:{emailid}: An email address that represents a specific Google account. For example, alice@example.com . serviceAccount:{emailid}: An email address that represents a Google service account. For example, my-other-app@appspot.gserviceaccount.com. serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, my-project.svc.id.goog[my-namespace/my-kubernetes-sa]. group:{emailid}: An email address that represents a Google group. For example, admins@example.com. domain:{domain}: The G Suite domain (primary) that represents all the users of that domain. For example, google.com or example.com. principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workforce identity pool. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}: All workforce identities in a group. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All workforce identities with a specific attribute value. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*: All identities in a workforce identity pool. principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workload identity pool. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}: A workload identity pool group. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All identities in a workload identity pool with a certain attribute. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*: All identities in a workload identity pool. deleted:user:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a user that has been recently deleted. For example, alice@example.com?uid=123456789012345678901. If the user is recovered, this value reverts to user:{emailid} and the recovered user retains the role in the binding. deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the service account is undeleted, this value reverts to serviceAccount:{emailid} and the undeleted service account retains the role in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, admins@example.com?uid=123456789012345678901. If the group is recovered, this value reverts to group:{emailid} and the recovered group retains the role in the binding. deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: Deleted single identity in a workforce identity pool. For example, deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value. */
  members?: Array<string>;
  /** Role that is assigned to the list of members, or principals. For example, roles/viewer, roles/editor, or roles/owner.For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Expr),
      members: Schema.optional(Schema.Array(Schema.String)),
      role: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Associates a list of members, or principals, with a role. Optionally, may specify a condition that determines how and when the bindings are applied. Each of the bindings must contain at least one principal.The bindings in a Policy can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the bindings grant 50 different roles to user:alice@example.com, and not to any other principal, then you can add another 1,450 principals to the bindings in the Policy. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy.Valid values are 0, 1, and 3. Requests that specify an invalid value are rejected.Any operation that affects conditional role bindings must specify version 3. This requirement applies to the following operations: Getting a policy that includes a conditional role binding Adding a conditional role binding to a policy Changing a conditional role binding in a policy Removing any role binding, with or without a condition, from a policy that includes conditionsImportant: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to getIamPolicy, and systems are expected to put that etag in the request to setIamPolicy to ensure that their change will be applied to the same version of the policy.Important: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bindings: Schema.optional(Schema.Array(Binding)),
      version: Schema.optional(Schema.Number),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface SessionStateHistory {
  /** Output only. The state of the session at this point in the session history. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "ACTIVE"
    | "TERMINATING"
    | "TERMINATED"
    | "FAILED"
    | (string & {});
  /** Output only. Details about the state at this point in the session history. */
  stateMessage?: string;
  /** Output only. The time when the session entered the historical state. */
  stateStartTime?: string;
}

export const SessionStateHistory: Schema.Schema<SessionStateHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      stateMessage: Schema.optional(Schema.String),
      stateStartTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SessionStateHistory",
  }) as any as Schema.Schema<SessionStateHistory>;

export interface JobStatus {
  /** Optional. Output only. Job state details, such as an error description if the state is ERROR. */
  details?: string;
  /** Output only. A state message specifying the overall job state. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "SETUP_DONE"
    | "RUNNING"
    | "CANCEL_PENDING"
    | "CANCEL_STARTED"
    | "CANCELLED"
    | "DONE"
    | "ERROR"
    | "ATTEMPT_FAILURE"
    | (string & {});
  /** Output only. Additional state information, which includes status reported by the agent. */
  substate?:
    | "UNSPECIFIED"
    | "SUBMITTED"
    | "QUEUED"
    | "STALE_STATUS"
    | (string & {});
  /** Output only. The time when this state was entered. */
  stateStartTime?: string;
}

export const JobStatus: Schema.Schema<JobStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      substate: Schema.optional(Schema.String),
      stateStartTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "JobStatus" }) as any as Schema.Schema<JobStatus>;

export interface JobMetadata {
  /** Output only. The job id. */
  jobId?: string;
  /** Output only. Operation type. */
  operationType?: string;
  /** Output only. Job submission time. */
  startTime?: string;
  /** Output only. Most recent job status. */
  status?: JobStatus;
}

export const JobMetadata: Schema.Schema<JobMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobId: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      status: Schema.optional(JobStatus),
    }),
  ).annotate({
    identifier: "JobMetadata",
  }) as any as Schema.Schema<JobMetadata>;

export interface RddPartitionInfo {
  memoryUsed?: string;
  blockName?: string;
  diskUsed?: string;
  executors?: Array<string>;
  storageLevel?: string;
}

export const RddPartitionInfo: Schema.Schema<RddPartitionInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memoryUsed: Schema.optional(Schema.String),
      blockName: Schema.optional(Schema.String),
      diskUsed: Schema.optional(Schema.String),
      executors: Schema.optional(Schema.Array(Schema.String)),
      storageLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RddPartitionInfo",
  }) as any as Schema.Schema<RddPartitionInfo>;

export interface RddDataDistribution {
  memoryRemaining?: string;
  offHeapMemoryUsed?: string;
  offHeapMemoryRemaining?: string;
  onHeapMemoryRemaining?: string;
  address?: string;
  memoryUsed?: string;
  onHeapMemoryUsed?: string;
  diskUsed?: string;
}

export const RddDataDistribution: Schema.Schema<RddDataDistribution> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memoryRemaining: Schema.optional(Schema.String),
      offHeapMemoryUsed: Schema.optional(Schema.String),
      offHeapMemoryRemaining: Schema.optional(Schema.String),
      onHeapMemoryRemaining: Schema.optional(Schema.String),
      address: Schema.optional(Schema.String),
      memoryUsed: Schema.optional(Schema.String),
      onHeapMemoryUsed: Schema.optional(Schema.String),
      diskUsed: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RddDataDistribution",
  }) as any as Schema.Schema<RddDataDistribution>;

export interface SearchSparkApplicationStageAttemptTasksResponse {
  /** Output only. Data corresponding to tasks created by spark. */
  sparkApplicationStageAttemptTasks?: Array<TaskData>;
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent ListSparkApplicationStageAttemptTasksRequest. */
  nextPageToken?: string;
}

export const SearchSparkApplicationStageAttemptTasksResponse: Schema.Schema<SearchSparkApplicationStageAttemptTasksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkApplicationStageAttemptTasks: Schema.optional(
        Schema.Array(TaskData),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationStageAttemptTasksResponse",
  }) as any as Schema.Schema<SearchSparkApplicationStageAttemptTasksResponse>;

export interface SparkSqlBatch {
  /** Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";). */
  queryVariables?: Record<string, string>;
  /** Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH. */
  jarFileUris?: Array<string>;
  /** Required. The HCFS URI of the script that contains Spark SQL queries to execute. */
  queryFileUri?: string;
}

export const SparkSqlBatch: Schema.Schema<SparkSqlBatch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      queryFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkSqlBatch",
  }) as any as Schema.Schema<SparkSqlBatch>;

export interface JobScheduling {
  /** Optional. Maximum number of times per hour a driver can be restarted as a result of driver exiting with non-zero code before job is reported failed.A job might be reported as thrashing if the driver exits with a non-zero code four times within a 10-minute window.Maximum value is 10.Note: This restartable job option is not supported in Dataproc workflow templates (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template). */
  maxFailuresPerHour?: number;
  /** Optional. Maximum total number of times a driver can be restarted as a result of the driver exiting with a non-zero code. After the maximum number is reached, the job will be reported as failed.Maximum value is 240.Note: Currently, this restartable job option is not supported in Dataproc workflow templates (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template). */
  maxFailuresTotal?: number;
}

export const JobScheduling: Schema.Schema<JobScheduling> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxFailuresPerHour: Schema.optional(Schema.Number),
      maxFailuresTotal: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "JobScheduling",
  }) as any as Schema.Schema<JobScheduling>;

export interface ApplicationAttemptInfo {
  appSparkVersion?: string;
  attemptId?: string;
  endTime?: string;
  sparkUser?: string;
  durationMillis?: string;
  startTime?: string;
  completed?: boolean;
  lastUpdated?: string;
}

export const ApplicationAttemptInfo: Schema.Schema<ApplicationAttemptInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appSparkVersion: Schema.optional(Schema.String),
      attemptId: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      sparkUser: Schema.optional(Schema.String),
      durationMillis: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      completed: Schema.optional(Schema.Boolean),
      lastUpdated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationAttemptInfo",
  }) as any as Schema.Schema<ApplicationAttemptInfo>;

export interface ApplicationInfo {
  applicationContextIngestionStatus?:
    | "APPLICATION_CONTEXT_INGESTION_STATUS_UNSPECIFIED"
    | "APPLICATION_CONTEXT_INGESTION_STATUS_COMPLETED"
    | (string & {});
  coresGranted?: number;
  memoryPerExecutorMb?: number;
  coresPerExecutor?: number;
  maxCores?: number;
  attempts?: Array<ApplicationAttemptInfo>;
  applicationId?: string;
  quantileDataStatus?:
    | "QUANTILE_DATA_STATUS_UNSPECIFIED"
    | "QUANTILE_DATA_STATUS_COMPLETED"
    | "QUANTILE_DATA_STATUS_FAILED"
    | (string & {});
  name?: string;
}

export const ApplicationInfo: Schema.Schema<ApplicationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicationContextIngestionStatus: Schema.optional(Schema.String),
      coresGranted: Schema.optional(Schema.Number),
      memoryPerExecutorMb: Schema.optional(Schema.Number),
      coresPerExecutor: Schema.optional(Schema.Number),
      maxCores: Schema.optional(Schema.Number),
      attempts: Schema.optional(Schema.Array(ApplicationAttemptInfo)),
      applicationId: Schema.optional(Schema.String),
      quantileDataStatus: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationInfo",
  }) as any as Schema.Schema<ApplicationInfo>;

export interface QueryList {
  /** Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } } */
  queries?: Array<string>;
}

export const QueryList: Schema.Schema<QueryList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queries: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "QueryList" }) as any as Schema.Schema<QueryList>;

export interface TrinoJob {
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** A list of queries. */
  queryList?: QueryList;
  /** Optional. The format in which query output will be displayed. See the Trino documentation for supported output formats */
  outputFormat?: string;
  /** Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries. */
  continueOnFailure?: boolean;
  /** Optional. Trino client tags to attach to this query */
  clientTags?: Array<string>;
  /** Optional. A mapping of property names to values. Used to set Trino session properties (https://trino.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Trino CLI */
  properties?: Record<string, string>;
  /** The HCFS URI of the script that contains SQL queries. */
  queryFileUri?: string;
}

export const TrinoJob: Schema.Schema<TrinoJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      loggingConfig: Schema.optional(LoggingConfig),
      queryList: Schema.optional(QueryList),
      outputFormat: Schema.optional(Schema.String),
      continueOnFailure: Schema.optional(Schema.Boolean),
      clientTags: Schema.optional(Schema.Array(Schema.String)),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      queryFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TrinoJob" }) as any as Schema.Schema<TrinoJob>;

export interface ProvisioningModelMix {
  /** Optional. The percentage of target capacity that should use Standard VM. The remaining percentage will use Spot VMs. The percentage applies only to the capacity above standard_capacity_base. eg. If 15 instances are requested and standard_capacity_base is 5 and standard_capacity_percent_above_base is 30, Dataproc will create 5 standard VMs and then start mixing spot and standard VMs for remaining 10 instances. The mix will be 30% standard and 70% spot. */
  standardCapacityPercentAboveBase?: number;
  /** Optional. The base capacity that will always use Standard VMs to avoid risk of more preemption than the minimum capacity you need. Dataproc will create only standard VMs until it reaches standard_capacity_base, then it will start using standard_capacity_percent_above_base to mix Spot with Standard VMs. eg. If 15 instances are requested and standard_capacity_base is 5, Dataproc will create 5 standard VMs and then start mixing spot and standard VMs for remaining 10 instances. */
  standardCapacityBase?: number;
}

export const ProvisioningModelMix: Schema.Schema<ProvisioningModelMix> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      standardCapacityPercentAboveBase: Schema.optional(Schema.Number),
      standardCapacityBase: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ProvisioningModelMix",
  }) as any as Schema.Schema<ProvisioningModelMix>;

export interface InstanceSelection {
  /** Optional. Preference of this instance selection. Lower number means higher preference. Dataproc will first try to create a VM based on the machine-type with priority rank and fallback to next rank based on availability. Machine types and instance selections with the same priority have the same preference. */
  rank?: number;
  /** Optional. Full machine-type names, e.g. "n1-standard-16". */
  machineTypes?: Array<string>;
}

export const InstanceSelection: Schema.Schema<InstanceSelection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rank: Schema.optional(Schema.Number),
      machineTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "InstanceSelection",
  }) as any as Schema.Schema<InstanceSelection>;

export interface InstanceSelectionResult {
  /** Output only. Number of VM provisioned with the machine_type. */
  vmCount?: number;
  /** Output only. Full machine-type names, e.g. "n1-standard-16". */
  machineType?: string;
}

export const InstanceSelectionResult: Schema.Schema<InstanceSelectionResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmCount: Schema.optional(Schema.Number),
      machineType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstanceSelectionResult",
  }) as any as Schema.Schema<InstanceSelectionResult>;

export interface InstanceFlexibilityPolicy {
  /** Optional. Defines how the Group selects the provisioning model to ensure required reliability. */
  provisioningModelMix?: ProvisioningModelMix;
  /** Optional. List of instance selection options that the group will use when creating new VMs. */
  instanceSelectionList?: Array<InstanceSelection>;
  /** Output only. A list of instance selection results in the group. */
  instanceSelectionResults?: Array<InstanceSelectionResult>;
}

export const InstanceFlexibilityPolicy: Schema.Schema<InstanceFlexibilityPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      provisioningModelMix: Schema.optional(ProvisioningModelMix),
      instanceSelectionList: Schema.optional(Schema.Array(InstanceSelection)),
      instanceSelectionResults: Schema.optional(
        Schema.Array(InstanceSelectionResult),
      ),
    }),
  ).annotate({
    identifier: "InstanceFlexibilityPolicy",
  }) as any as Schema.Schema<InstanceFlexibilityPolicy>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Status),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface ManagedGroupConfig {
  /** Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm. */
  instanceGroupManagerUri?: string;
  /** Output only. The name of the Instance Template used for the Managed Instance Group. */
  instanceTemplateName?: string;
  /** Output only. The name of the Instance Group Manager for this group. */
  instanceGroupManagerName?: string;
}

export const ManagedGroupConfig: Schema.Schema<ManagedGroupConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instanceGroupManagerUri: Schema.optional(Schema.String),
      instanceTemplateName: Schema.optional(Schema.String),
      instanceGroupManagerName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ManagedGroupConfig",
  }) as any as Schema.Schema<ManagedGroupConfig>;

export interface ShufflePushReadQuantileMetrics {
  corruptMergedBlockChunks?: Quantiles;
  localMergedBytesRead?: Quantiles;
  remoteMergedBlocksFetched?: Quantiles;
  remoteMergedReqsDuration?: Quantiles;
  remoteMergedChunksFetched?: Quantiles;
  mergedFetchFallbackCount?: Quantiles;
  localMergedBlocksFetched?: Quantiles;
  remoteMergedBytesRead?: Quantiles;
  localMergedChunksFetched?: Quantiles;
}

export const ShufflePushReadQuantileMetrics: Schema.Schema<ShufflePushReadQuantileMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      corruptMergedBlockChunks: Schema.optional(Quantiles),
      localMergedBytesRead: Schema.optional(Quantiles),
      remoteMergedBlocksFetched: Schema.optional(Quantiles),
      remoteMergedReqsDuration: Schema.optional(Quantiles),
      remoteMergedChunksFetched: Schema.optional(Quantiles),
      mergedFetchFallbackCount: Schema.optional(Quantiles),
      localMergedBlocksFetched: Schema.optional(Quantiles),
      remoteMergedBytesRead: Schema.optional(Quantiles),
      localMergedChunksFetched: Schema.optional(Quantiles),
    }),
  ).annotate({
    identifier: "ShufflePushReadQuantileMetrics",
  }) as any as Schema.Schema<ShufflePushReadQuantileMetrics>;

export interface ShuffleReadQuantileMetrics {
  fetchWaitTimeMillis?: Quantiles;
  totalBlocksFetched?: Quantiles;
  remoteReqsDuration?: Quantiles;
  readBytes?: Quantiles;
  remoteBytesReadToDisk?: Quantiles;
  localBlocksFetched?: Quantiles;
  readRecords?: Quantiles;
  remoteBlocksFetched?: Quantiles;
  remoteBytesRead?: Quantiles;
  shufflePushReadMetrics?: ShufflePushReadQuantileMetrics;
}

export const ShuffleReadQuantileMetrics: Schema.Schema<ShuffleReadQuantileMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fetchWaitTimeMillis: Schema.optional(Quantiles),
      totalBlocksFetched: Schema.optional(Quantiles),
      remoteReqsDuration: Schema.optional(Quantiles),
      readBytes: Schema.optional(Quantiles),
      remoteBytesReadToDisk: Schema.optional(Quantiles),
      localBlocksFetched: Schema.optional(Quantiles),
      readRecords: Schema.optional(Quantiles),
      remoteBlocksFetched: Schema.optional(Quantiles),
      remoteBytesRead: Schema.optional(Quantiles),
      shufflePushReadMetrics: Schema.optional(ShufflePushReadQuantileMetrics),
    }),
  ).annotate({
    identifier: "ShuffleReadQuantileMetrics",
  }) as any as Schema.Schema<ShuffleReadQuantileMetrics>;

export interface TestIamPermissionsResponse {
  /** A subset of TestPermissionsRequest.permissions that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ResourceInformation {
  name?: string;
  addresses?: Array<string>;
}

export const ResourceInformation: Schema.Schema<ResourceInformation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      addresses: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ResourceInformation",
  }) as any as Schema.Schema<ResourceInformation>;

export interface IdentityConfig {
  /** Required. Map of user to service account. */
  userServiceAccountMapping?: Record<string, string>;
}

export const IdentityConfig: Schema.Schema<IdentityConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userServiceAccountMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "IdentityConfig",
  }) as any as Schema.Schema<IdentityConfig>;

export interface ConfidentialInstanceConfig {
  /** Optional. Defines whether the instance should have confidential compute enabled. */
  enableConfidentialCompute?: boolean;
}

export const ConfidentialInstanceConfig: Schema.Schema<ConfidentialInstanceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableConfidentialCompute: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConfidentialInstanceConfig",
  }) as any as Schema.Schema<ConfidentialInstanceConfig>;

export interface ReservationAffinity {
  /** Optional. Corresponds to the label values of reservation resource. */
  values?: Array<string>;
  /** Optional. Corresponds to the label key of reservation resource. */
  key?: string;
  /** Optional. Type of reservation to consume */
  consumeReservationType?:
    | "TYPE_UNSPECIFIED"
    | "NO_RESERVATION"
    | "ANY_RESERVATION"
    | "SPECIFIC_RESERVATION"
    | (string & {});
}

export const ReservationAffinity: Schema.Schema<ReservationAffinity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
      key: Schema.optional(Schema.String),
      consumeReservationType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReservationAffinity",
  }) as any as Schema.Schema<ReservationAffinity>;

export interface ShieldedInstanceConfig {
  /** Optional. Defines whether instances have the vTPM enabled. */
  enableVtpm?: boolean;
  /** Optional. Defines whether instances have Secure Boot enabled. */
  enableSecureBoot?: boolean;
  /** Optional. Defines whether instances have integrity monitoring enabled. */
  enableIntegrityMonitoring?: boolean;
}

export const ShieldedInstanceConfig: Schema.Schema<ShieldedInstanceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableVtpm: Schema.optional(Schema.Boolean),
      enableSecureBoot: Schema.optional(Schema.Boolean),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ShieldedInstanceConfig",
  }) as any as Schema.Schema<ShieldedInstanceConfig>;

export interface NodeGroupAffinity {
  /** Required. The URI of a sole-tenant node group resource (https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups) that the cluster will be created on.A full URL, partial URI, or node group name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 node-group-1 */
  nodeGroupUri?: string;
}

export const NodeGroupAffinity: Schema.Schema<NodeGroupAffinity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nodeGroupUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NodeGroupAffinity",
  }) as any as Schema.Schema<NodeGroupAffinity>;

export interface GceClusterConfig {
  /** Optional. An optional list of Compute Engine zones where the Dataproc cluster will not be located when Auto Zone is enabled. Only one of zone_uri or auto_zone_exclude_zone_uris can be set. If both are omitted, the service will pick a zone in the cluster Compute Engine region. If auto_zone_exclude_zone_uris is set and there is more than one non-excluded zone, the service will pick one of the non-excluded zones. Otherwise, cluster creation will fail with INVALID_ARGUMENT error.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] [zone] */
  autoZoneExcludeZoneUris?: Array<string>;
  /** Optional. Confidential Instance Config for clusters using Confidential VMs (https://cloud.google.com/compute/confidential-vm/docs). */
  confidentialInstanceConfig?: ConfidentialInstanceConfig;
  /** Optional. The type of IPv6 access for a cluster. */
  privateIpv6GoogleAccess?:
    | "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED"
    | "INHERIT_FROM_SUBNETWORK"
    | "OUTBOUND"
    | "BIDIRECTIONAL"
    | (string & {});
  /** Optional. Reservation Affinity for consuming Zonal reservation. */
  reservationAffinity?: ReservationAffinity;
  /** Optional. Resource manager tags (https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing) to add to all instances (see Use secure tags in Dataproc (https://cloud.google.com/dataproc/docs/guides/use-secure-tags)). */
  resourceManagerTags?: Record<string, string>;
  /** Optional. This setting applies to subnetwork-enabled networks. It is set to true by default in clusters created with image versions 2.2.x.When set to true: All cluster VMs have internal IP addresses. Google Private Access (https://cloud.google.com/vpc/docs/private-google-access) must be enabled to access Dataproc and other Google Cloud APIs. Off-cluster dependencies must be configured to be accessible without external IP addresses.When set to false: Cluster VMs are not restricted to internal IP addresses. Ephemeral external IP addresses are assigned to each cluster VM. */
  internalIpOnly?: boolean;
  /** The Compute Engine network tags to add to all instances (see Tagging instances (https://cloud.google.com/vpc/docs/add-remove-network-tags)). */
  tags?: Array<string>;
  /** Optional. The Compute Engine metadata entries to add to all instances (see Project and instance metadata (https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)). */
  metadata?: Record<string, string>;
  /** Optional. The Compute Engine zone where the Dataproc cluster will be located. If omitted, the service will pick a zone in the cluster's Compute Engine region. On a get request, zone will always be present.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] [zone] */
  zoneUri?: string;
  /** Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network_uri.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/regions/[region]/subnetworks/sub0 projects/[project_id]/regions/[region]/subnetworks/sub0 sub0 */
  subnetworkUri?: string;
  /** Optional. Shielded Instance Config for clusters using Compute Engine Shielded VMs (https://cloud.google.com/security/shielded-cloud/shielded-vm). */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /** Optional. The URIs of service account scopes to be included in Compute Engine instances. The following base set of scopes is always included: https://www.googleapis.com/auth/cloud.useraccounts.readonly https://www.googleapis.com/auth/devstorage.read_write https://www.googleapis.com/auth/logging.writeIf no scopes are specified, the following defaults are also provided: https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/bigtable.admin.table https://www.googleapis.com/auth/bigtable.data https://www.googleapis.com/auth/devstorage.full_control */
  serviceAccountScopes?: Array<string>;
  /** Optional. The Compute Engine network to be used for machine communications. Cannot be specified with subnetwork_uri. If neither network_uri nor subnetwork_uri is specified, the "default" network of the project is used, if it exists. Cannot be a "Custom Subnet Network" (see Using Subnetworks (https://cloud.google.com/compute/docs/subnetworks) for more information).A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/networks/default projects/[project_id]/global/networks/default default */
  networkUri?: string;
  /** Optional. Node Group Affinity for sole-tenant clusters. */
  nodeGroupAffinity?: NodeGroupAffinity;
  /** Optional. The Dataproc service account (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc) (also see VM Data Plane identity (https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity)) used by Dataproc cluster VM instances to access Google Cloud Platform services.If not specified, the Compute Engine default service account (https://cloud.google.com/compute/docs/access/service-accounts#default_service_account) is used. */
  serviceAccount?: string;
}

export const GceClusterConfig: Schema.Schema<GceClusterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      autoZoneExcludeZoneUris: Schema.optional(Schema.Array(Schema.String)),
      confidentialInstanceConfig: Schema.optional(ConfidentialInstanceConfig),
      privateIpv6GoogleAccess: Schema.optional(Schema.String),
      reservationAffinity: Schema.optional(ReservationAffinity),
      resourceManagerTags: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      internalIpOnly: Schema.optional(Schema.Boolean),
      tags: Schema.optional(Schema.Array(Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      zoneUri: Schema.optional(Schema.String),
      subnetworkUri: Schema.optional(Schema.String),
      shieldedInstanceConfig: Schema.optional(ShieldedInstanceConfig),
      serviceAccountScopes: Schema.optional(Schema.Array(Schema.String)),
      networkUri: Schema.optional(Schema.String),
      nodeGroupAffinity: Schema.optional(NodeGroupAffinity),
      serviceAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GceClusterConfig",
  }) as any as Schema.Schema<GceClusterConfig>;

export interface PyPiRepositoryConfig {
  /** Optional. The PyPi repository address. Note: This field is not available for batch workloads. */
  pypiRepository?: string;
}

export const PyPiRepositoryConfig: Schema.Schema<PyPiRepositoryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pypiRepository: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PyPiRepositoryConfig",
  }) as any as Schema.Schema<PyPiRepositoryConfig>;

export interface ClusterSelector {
  /** Required. The cluster labels. Cluster must have all labels to match. */
  clusterLabels?: Record<string, string>;
  /** Optional. The zone where workflow process executes. This parameter does not affect the selection of the cluster.If unspecified, the zone of the first cluster matching the selector is used. */
  zone?: string;
}

export const ClusterSelector: Schema.Schema<ClusterSelector> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterLabels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      zone: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterSelector",
  }) as any as Schema.Schema<ClusterSelector>;

export interface Metric {
  /** Required. A standard set of metrics is collected unless metricOverrides are specified for the metric source (see Custom metrics (https://cloud.google.com/dataproc/docs/guides/dataproc-metrics#custom_metrics) for more information). */
  metricSource?:
    | "METRIC_SOURCE_UNSPECIFIED"
    | "MONITORING_AGENT_DEFAULTS"
    | "HDFS"
    | "SPARK"
    | "YARN"
    | "SPARK_HISTORY_SERVER"
    | "HIVESERVER2"
    | "HIVEMETASTORE"
    | "FLINK"
    | (string & {});
  /** Optional. Specify one or more Custom metrics (https://cloud.google.com/dataproc/docs/guides/dataproc-metrics#custom_metrics) to collect for the metric course (for the SPARK metric source (any Spark metric (https://spark.apache.org/docs/latest/monitoring.html#metrics) can be specified).Provide metrics in the following format: METRIC_SOURCE: INSTANCE:GROUP:METRIC Use camelcase as appropriate.Examples: yarn:ResourceManager:QueueMetrics:AppsCompleted spark:driver:DAGScheduler:job.allJobs sparkHistoryServer:JVM:Memory:NonHeapMemoryUsage.committed hiveserver2:JVM:Memory:NonHeapMemoryUsage.used Notes: Only the specified overridden metrics are collected for the metric source. For example, if one or more spark:executive metrics are listed as metric overrides, other SPARK metrics are not collected. The collection of the metrics for other enabled custom metric sources is unaffected. For example, if both SPARK and YARN metric sources are enabled, and overrides are provided for Spark metrics only, all YARN metrics are collected. */
  metricOverrides?: Array<string>;
}

export const Metric: Schema.Schema<Metric> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metricSource: Schema.optional(Schema.String),
      metricOverrides: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface DataprocMetricConfig {
  /** Required. Metrics sources to enable. */
  metrics?: Array<Metric>;
}

export const DataprocMetricConfig: Schema.Schema<DataprocMetricConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metrics: Schema.optional(Schema.Array(Metric)),
    }),
  ).annotate({
    identifier: "DataprocMetricConfig",
  }) as any as Schema.Schema<DataprocMetricConfig>;

export interface AutoscalingConfig {
  /** Optional. The autoscaling policy used by the cluster.Only resource names including projectid and location (region) are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id] projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]Note that the policy must be in the same project and Dataproc region. */
  policyUri?: string;
}

export const AutoscalingConfig: Schema.Schema<AutoscalingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policyUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AutoscalingConfig",
  }) as any as Schema.Schema<AutoscalingConfig>;

export interface SoftwareConfig {
  /** Optional. The properties to set on daemon config files.Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. The following are supported prefixes and their mappings: capacity-scheduler: capacity-scheduler.xml core: core-site.xml distcp: distcp-default.xml hdfs: hdfs-site.xml hive: hive-site.xml mapred: mapred-site.xml pig: pig.properties spark: spark-defaults.conf yarn: yarn-site.xmlFor more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties). */
  properties?: Record<string, string>;
  /** Optional. The version of software inside the cluster. It must be one of the supported Dataproc Versions (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported-dataproc-image-versions), such as "1.2" (including a subminor version, such as "1.2.29"), or the "preview" version (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions). If unspecified, it defaults to the latest Debian version. */
  imageVersion?: string;
  /** Optional. The set of components to activate on the cluster. */
  optionalComponents?: Array<
    | "COMPONENT_UNSPECIFIED"
    | "ANACONDA"
    | "DELTA"
    | "DOCKER"
    | "DRUID"
    | "FLINK"
    | "HBASE"
    | "HIVE_WEBHCAT"
    | "HUDI"
    | "ICEBERG"
    | "JUPYTER"
    | "PIG"
    | "PRESTO"
    | "TRINO"
    | "RANGER"
    | "SOLR"
    | "ZEPPELIN"
    | "ZOOKEEPER"
    | "JUPYTER_KERNEL_GATEWAY"
    | (string & {})
  >;
}

export const SoftwareConfig: Schema.Schema<SoftwareConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      imageVersion: Schema.optional(Schema.String),
      optionalComponents: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SoftwareConfig",
  }) as any as Schema.Schema<SoftwareConfig>;

export interface InstanceReference {
  /** The public RSA key used for sharing data with this instance. */
  publicKey?: string;
  /** The user-friendly name of the Compute Engine instance. */
  instanceName?: string;
  /** The unique identifier of the Compute Engine instance. */
  instanceId?: string;
  /** The public ECIES key used for sharing data with this instance. */
  publicEciesKey?: string;
}

export const InstanceReference: Schema.Schema<InstanceReference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      publicKey: Schema.optional(Schema.String),
      instanceName: Schema.optional(Schema.String),
      instanceId: Schema.optional(Schema.String),
      publicEciesKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstanceReference",
  }) as any as Schema.Schema<InstanceReference>;

export interface AcceleratorConfig {
  /** Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See Compute Engine AcceleratorTypes (https://cloud.google.com/compute/docs/reference/v1/acceleratorTypes).Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/acceleratorTypes/nvidia-tesla-t4 projects/[project_id]/zones/[zone]/acceleratorTypes/nvidia-tesla-t4 nvidia-tesla-t4Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the accelerator type resource, for example, nvidia-tesla-t4. */
  acceleratorTypeUri?: string;
  /** The number of the accelerator cards of this type exposed to this instance. */
  acceleratorCount?: number;
}

export const AcceleratorConfig: Schema.Schema<AcceleratorConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      acceleratorTypeUri: Schema.optional(Schema.String),
      acceleratorCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AcceleratorConfig",
  }) as any as Schema.Schema<AcceleratorConfig>;

export interface StartupConfig {
  /** Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled). */
  requiredRegistrationFraction?: number;
}

export const StartupConfig: Schema.Schema<StartupConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requiredRegistrationFraction: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "StartupConfig",
  }) as any as Schema.Schema<StartupConfig>;

export interface AttachedDiskConfig {
  /** Optional. Disk type. */
  diskType?:
    | "DISK_TYPE_UNSPECIFIED"
    | "HYPERDISK_BALANCED"
    | "HYPERDISK_EXTREME"
    | "HYPERDISK_ML"
    | "HYPERDISK_THROUGHPUT"
    | (string & {});
  /** Optional. Indicates how much throughput to provision for the attached disk. This sets the number of throughput mb per second that the disk can handle. See https://cloud.google.com/compute/docs/disks/hyperdisks#hyperdisk-features */
  provisionedThroughput?: string;
  /** Optional. Disk size in GB. */
  diskSizeGb?: number;
  /** Optional. Indicates how many IOPS to provision for the attached disk. This sets the number of I/O operations per second that the disk can handle. See https://cloud.google.com/compute/docs/disks/hyperdisks#hyperdisk-features */
  provisionedIops?: string;
}

export const AttachedDiskConfig: Schema.Schema<AttachedDiskConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskType: Schema.optional(Schema.String),
      provisionedThroughput: Schema.optional(Schema.String),
      diskSizeGb: Schema.optional(Schema.Number),
      provisionedIops: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AttachedDiskConfig",
  }) as any as Schema.Schema<AttachedDiskConfig>;

export interface DiskConfig {
  /** Optional. A list of attached disk configs for a group of VM instances. */
  attachedDiskConfigs?: Array<AttachedDiskConfig>;
  /** Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected. */
  numLocalSsds?: number;
  /** Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced. */
  bootDiskProvisionedThroughput?: string;
  /** Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced. */
  bootDiskProvisionedIops?: string;
  /** Optional. Type of the boot disk (default is "pd-standard"). Valid values: "pd-balanced" (Persistent Disk Balanced Solid State Drive), "pd-ssd" (Persistent Disk Solid State Drive), or "pd-standard" (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types). */
  bootDiskType?: string;
  /** Optional. Size in GB of the boot disk (default is 500GB). */
  bootDiskSizeGb?: number;
  /** Optional. Interface type of local SSDs (default is "scsi"). Valid values: "scsi" (Small Computer System Interface), "nvme" (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance). */
  localSsdInterface?: string;
}

export const DiskConfig: Schema.Schema<DiskConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachedDiskConfigs: Schema.optional(Schema.Array(AttachedDiskConfig)),
      numLocalSsds: Schema.optional(Schema.Number),
      bootDiskProvisionedThroughput: Schema.optional(Schema.String),
      bootDiskProvisionedIops: Schema.optional(Schema.String),
      bootDiskType: Schema.optional(Schema.String),
      bootDiskSizeGb: Schema.optional(Schema.Number),
      localSsdInterface: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DiskConfig" }) as any as Schema.Schema<DiskConfig>;

export interface InstanceGroupConfig {
  /** Output only. List of references to Compute Engine instances. */
  instanceReferences?: Array<InstanceReference>;
  /** Optional. The Compute Engine accelerator configuration for these instances. */
  accelerators?: Array<AcceleratorConfig>;
  /** Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups. */
  managedGroupConfig?: ManagedGroupConfig;
  /** Optional. Configuration to handle the startup of instances during cluster create and update process. */
  startupConfig?: StartupConfig;
  /** Optional. Instance flexibility Policy allowing a mixture of VM shapes and provisioning models. */
  instanceFlexibilityPolicy?: InstanceFlexibilityPolicy;
  /** Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default. */
  imageUri?: string;
  /** Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2. */
  machineTypeUri?: string;
  /** Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu). */
  minCpuPlatform?: string;
  /** Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE. */
  preemptibility?:
    | "PREEMPTIBILITY_UNSPECIFIED"
    | "NON_PREEMPTIBLE"
    | "PREEMPTIBLE"
    | "SPOT"
    | (string & {});
  /** Optional. Disk option config settings. */
  diskConfig?: DiskConfig;
  /** Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1. */
  numInstances?: number;
  /** Output only. Specifies that this instance group contains preemptible instances. */
  isPreemptible?: boolean;
  /** Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted. */
  minNumInstances?: number;
  /** Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group. */
  instanceNames?: Array<string>;
}

export const InstanceGroupConfig: Schema.Schema<InstanceGroupConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instanceReferences: Schema.optional(Schema.Array(InstanceReference)),
      accelerators: Schema.optional(Schema.Array(AcceleratorConfig)),
      managedGroupConfig: Schema.optional(ManagedGroupConfig),
      startupConfig: Schema.optional(StartupConfig),
      instanceFlexibilityPolicy: Schema.optional(InstanceFlexibilityPolicy),
      imageUri: Schema.optional(Schema.String),
      machineTypeUri: Schema.optional(Schema.String),
      minCpuPlatform: Schema.optional(Schema.String),
      preemptibility: Schema.optional(Schema.String),
      diskConfig: Schema.optional(DiskConfig),
      numInstances: Schema.optional(Schema.Number),
      isPreemptible: Schema.optional(Schema.Boolean),
      minNumInstances: Schema.optional(Schema.Number),
      instanceNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "InstanceGroupConfig",
  }) as any as Schema.Schema<InstanceGroupConfig>;

export interface NodeInitializationAction {
  /** Optional. Amount of time executable has to complete. Default is 10 minutes (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Cluster creation fails with an explanatory error message (the name of the executable that caused the error and the exceeded timeout period) if the executable is not completed at end of the timeout period. */
  executionTimeout?: string;
  /** Required. Cloud Storage URI of executable file. */
  executableFile?: string;
}

export const NodeInitializationAction: Schema.Schema<NodeInitializationAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executionTimeout: Schema.optional(Schema.String),
      executableFile: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NodeInitializationAction",
  }) as any as Schema.Schema<NodeInitializationAction>;

export interface KerberosConfig {
  /** Optional. The Cloud Storage URI of a KMS encrypted file containing the root principal password. */
  rootPrincipalPasswordUri?: string;
  /** Optional. The name of the on-cluster Kerberos realm. If not specified, the uppercased domain of hostnames will be the realm. */
  realm?: string;
  /** Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided keystore. For the self-signed certificate, this password is generated by Dataproc. */
  keystorePasswordUri?: string;
  /** Optional. The lifetime of the ticket granting ticket, in hours. If not specified, or user specifies 0, then default value 10 will be used. */
  tgtLifetimeHours?: number;
  /** Optional. The KDC (IP or hostname) for the remote trusted realm in a cross realm trust relationship. */
  crossRealmTrustKdc?: string;
  /** Optional. The admin server (IP or hostname) for the remote trusted realm in a cross realm trust relationship. */
  crossRealmTrustAdminServer?: string;
  /** Optional. Flag to indicate whether to Kerberize the cluster (default: false). Set this field to true to enable Kerberos on a cluster. */
  enableKerberos?: boolean;
  /** Optional. The Cloud Storage URI of a KMS encrypted file containing the shared password between the on-cluster Kerberos realm and the remote trusted realm, in a cross realm trust relationship. */
  crossRealmTrustSharedPasswordUri?: string;
  /** Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided truststore. For the self-signed certificate, this password is generated by Dataproc. */
  truststorePasswordUri?: string;
  /** Optional. The Cloud Storage URI of a KMS encrypted file containing the master key of the KDC database. */
  kdcDbKeyUri?: string;
  /** Optional. The remote realm the Dataproc on-cluster KDC will trust, should the user enable cross realm trust. */
  crossRealmTrustRealm?: string;
  /** Optional. The Cloud Storage URI of the keystore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate. */
  keystoreUri?: string;
  /** Optional. The Cloud Storage URI of the truststore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate. */
  truststoreUri?: string;
  /** Optional. The URI of the KMS key used to encrypt sensitive files. */
  kmsKeyUri?: string;
  /** Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided key. For the self-signed certificate, this password is generated by Dataproc. */
  keyPasswordUri?: string;
}

export const KerberosConfig: Schema.Schema<KerberosConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rootPrincipalPasswordUri: Schema.optional(Schema.String),
      realm: Schema.optional(Schema.String),
      keystorePasswordUri: Schema.optional(Schema.String),
      tgtLifetimeHours: Schema.optional(Schema.Number),
      crossRealmTrustKdc: Schema.optional(Schema.String),
      crossRealmTrustAdminServer: Schema.optional(Schema.String),
      enableKerberos: Schema.optional(Schema.Boolean),
      crossRealmTrustSharedPasswordUri: Schema.optional(Schema.String),
      truststorePasswordUri: Schema.optional(Schema.String),
      kdcDbKeyUri: Schema.optional(Schema.String),
      crossRealmTrustRealm: Schema.optional(Schema.String),
      keystoreUri: Schema.optional(Schema.String),
      truststoreUri: Schema.optional(Schema.String),
      kmsKeyUri: Schema.optional(Schema.String),
      keyPasswordUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "KerberosConfig",
  }) as any as Schema.Schema<KerberosConfig>;

export interface SecurityConfig {
  /** Optional. Kerberos related configuration. */
  kerberosConfig?: KerberosConfig;
  /** Optional. Identity related configuration, including service account based secure multi-tenancy user mappings. */
  identityConfig?: IdentityConfig;
}

export const SecurityConfig: Schema.Schema<SecurityConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kerberosConfig: Schema.optional(KerberosConfig),
      identityConfig: Schema.optional(IdentityConfig),
    }),
  ).annotate({
    identifier: "SecurityConfig",
  }) as any as Schema.Schema<SecurityConfig>;

export interface NodeGroup {
  /** Required. Node group roles. */
  roles?: Array<"ROLE_UNSPECIFIED" | "DRIVER" | (string & {})>;
  /** Optional. The node group instance group configuration. */
  nodeGroupConfig?: InstanceGroupConfig;
  /** Optional. Node group labels. Label keys must consist of from 1 to 63 characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty. If specified, they must consist of from 1 to 63 characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). The node group must have no more than 32 labels. */
  labels?: Record<string, string>;
  /** The Node group resource name (https://aip.dev/122). */
  name?: string;
}

export const NodeGroup: Schema.Schema<NodeGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      roles: Schema.optional(Schema.Array(Schema.String)),
      nodeGroupConfig: Schema.optional(InstanceGroupConfig),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "NodeGroup" }) as any as Schema.Schema<NodeGroup>;

export interface AuxiliaryNodeGroup {
  /** Optional. A node group ID. Generated if not specified.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of from 3 to 33 characters. */
  nodeGroupId?: string;
  /** Required. Node group configuration. */
  nodeGroup?: NodeGroup;
}

export const AuxiliaryNodeGroup: Schema.Schema<AuxiliaryNodeGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nodeGroupId: Schema.optional(Schema.String),
      nodeGroup: Schema.optional(NodeGroup),
    }),
  ).annotate({
    identifier: "AuxiliaryNodeGroup",
  }) as any as Schema.Schema<AuxiliaryNodeGroup>;

export interface EndpointConfig {
  /** Optional. If true, enable http access to specific ports on the cluster from external sources. Defaults to false. */
  enableHttpPortAccess?: boolean;
  /** Output only. The map of port descriptions to URLs. Will only be populated if enable_http_port_access is true. */
  httpPorts?: Record<string, string>;
}

export const EndpointConfig: Schema.Schema<EndpointConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableHttpPortAccess: Schema.optional(Schema.Boolean),
      httpPorts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "EndpointConfig",
  }) as any as Schema.Schema<EndpointConfig>;

export interface LifecycleConfig {
  /** Optional. The lifetime duration of the cluster. The cluster will be auto-stopped at the end of this period, calculated from the time of submission of the create or update cluster request. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  autoStopTtl?: string;
  /** Optional. The time when cluster will be auto-deleted (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  autoDeleteTime?: string;
  /** Optional. The duration to keep the cluster started while idling (when no jobs are running). Passing this threshold will cause the cluster to be stopped. Minimum value is 5 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  idleStopTtl?: string;
  /** Optional. The time when cluster will be auto-stopped (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  autoStopTime?: string;
  /** Optional. The duration to keep the cluster alive while idling (when no jobs are running). Passing this threshold will cause the cluster to be deleted. Minimum value is 5 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  idleDeleteTtl?: string;
  /** Optional. The lifetime duration of cluster. The cluster will be auto-deleted at the end of this period. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  autoDeleteTtl?: string;
  /** Output only. The time when cluster became idle (most recent job finished) and became eligible for deletion due to idleness (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  idleStartTime?: string;
}

export const LifecycleConfig: Schema.Schema<LifecycleConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      autoStopTtl: Schema.optional(Schema.String),
      autoDeleteTime: Schema.optional(Schema.String),
      idleStopTtl: Schema.optional(Schema.String),
      autoStopTime: Schema.optional(Schema.String),
      idleDeleteTtl: Schema.optional(Schema.String),
      autoDeleteTtl: Schema.optional(Schema.String),
      idleStartTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LifecycleConfig",
  }) as any as Schema.Schema<LifecycleConfig>;

export interface EncryptionConfig {
  /** Optional. The Cloud KMS key resource name to use for persistent disk encryption for all instances in the cluster. See Use CMEK with cluster data (https://cloud.google.com//dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_cluster_data) for more information. */
  gcePdKmsKeyName?: string;
  /** Optional. The Cloud KMS key resource name to use for cluster persistent disk and job argument encryption. See Use CMEK with cluster data (https://cloud.google.com//dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_cluster_data) for more information.When this key resource name is provided, the following job arguments of the following job types submitted to the cluster are encrypted using CMEK: FlinkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/FlinkJob) HadoopJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/HadoopJob) SparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkJob) SparkRJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkRJob) PySparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/PySparkJob) SparkSqlJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkSqlJob) scriptVariables and queryList.queries HiveJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/HiveJob) scriptVariables and queryList.queries PigJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PigJob) scriptVariables and queryList.queries PrestoJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PrestoJob) scriptVariables and queryList.queries */
  kmsKey?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcePdKmsKeyName: Schema.optional(Schema.String),
      kmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EncryptionConfig",
  }) as any as Schema.Schema<EncryptionConfig>;

export interface ClusterConfig {
  /** Optional. The config for Dataproc metrics. */
  dataprocMetricConfig?: DataprocMetricConfig;
  /** Optional. Autoscaling config for the policy associated with the cluster. Cluster does not autoscale if this field is unset. */
  autoscalingConfig?: AutoscalingConfig;
  /** Optional. A Cloud Storage bucket used to collect checkpoint diagnostic data (https://cloud.google.com/dataproc/docs/support/diagnose-clusters#checkpoint_diagnostic_data). If you do not specify a diagnostic bucket, Cloud Dataproc will use the Dataproc temp bucket to collect the checkpoint diagnostic data. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket. */
  diagnosticBucket?: string;
  /** Optional. The config settings for cluster software. */
  softwareConfig?: SoftwareConfig;
  /** Optional. The Compute Engine config settings for the cluster's worker instances. */
  workerConfig?: InstanceGroupConfig;
  /** Optional. Commands to execute on each node after config is completed. By default, executables are run on master and all worker nodes. You can test a node's role metadata to run an executable on a master or worker node, as shown below using curl (you can also use wget): ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ "${ROLE}" == 'Master' ]]; then ... master specific actions ... else ... worker specific actions ... fi */
  initializationActions?: Array<NodeInitializationAction>;
  /** Optional. The type of the cluster. */
  clusterType?:
    | "CLUSTER_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "SINGLE_NODE"
    | "ZERO_SCALE"
    | (string & {});
  /** Optional. The Compute Engine config settings for the cluster's master instance. */
  masterConfig?: InstanceGroupConfig;
  /** Optional. The shared Compute Engine config settings for all instances in a cluster. */
  gceClusterConfig?: GceClusterConfig;
  /** Optional. The Compute Engine config settings for a cluster's secondary worker instances */
  secondaryWorkerConfig?: InstanceGroupConfig;
  /** Optional. Security settings for the cluster. */
  securityConfig?: SecurityConfig;
  /** Optional. The node group settings. */
  auxiliaryNodeGroups?: Array<AuxiliaryNodeGroup>;
  /** Optional. BETA. The Kubernetes Engine config for Dataproc clusters deployed to The Kubernetes Engine config for Dataproc clusters deployed to Kubernetes. These config settings are mutually exclusive with Compute Engine-based options, such as gce_cluster_config, master_config, worker_config, secondary_worker_config, and autoscaling_config. */
  gkeClusterConfig?: GkeClusterConfig;
  /** Optional. Metastore configuration. */
  metastoreConfig?: MetastoreConfig;
  /** Optional. Port/endpoint configuration for this cluster */
  endpointConfig?: EndpointConfig;
  /** Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket. */
  configBucket?: string;
  /** Optional. A Cloud Storage bucket used to store ephemeral cluster and jobs data, such as Spark and MapReduce history files. If you do not specify a temp bucket, Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster's temp bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket. The default bucket has a TTL of 90 days, but you can use any TTL (or none) if you specify a bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket. */
  tempBucket?: string;
  /** Optional. The cluster tier. */
  clusterTier?:
    | "CLUSTER_TIER_UNSPECIFIED"
    | "CLUSTER_TIER_STANDARD"
    | "CLUSTER_TIER_PREMIUM"
    | (string & {});
  /** Optional. Lifecycle setting for the cluster. */
  lifecycleConfig?: LifecycleConfig;
  /** Optional. Encryption settings for the cluster. */
  encryptionConfig?: EncryptionConfig;
}

export const ClusterConfig: Schema.Schema<ClusterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataprocMetricConfig: Schema.optional(DataprocMetricConfig),
      autoscalingConfig: Schema.optional(AutoscalingConfig),
      diagnosticBucket: Schema.optional(Schema.String),
      softwareConfig: Schema.optional(SoftwareConfig),
      workerConfig: Schema.optional(InstanceGroupConfig),
      initializationActions: Schema.optional(
        Schema.Array(NodeInitializationAction),
      ),
      clusterType: Schema.optional(Schema.String),
      masterConfig: Schema.optional(InstanceGroupConfig),
      gceClusterConfig: Schema.optional(GceClusterConfig),
      secondaryWorkerConfig: Schema.optional(InstanceGroupConfig),
      securityConfig: Schema.optional(SecurityConfig),
      auxiliaryNodeGroups: Schema.optional(Schema.Array(AuxiliaryNodeGroup)),
      gkeClusterConfig: Schema.optional(GkeClusterConfig),
      metastoreConfig: Schema.optional(MetastoreConfig),
      endpointConfig: Schema.optional(EndpointConfig),
      configBucket: Schema.optional(Schema.String),
      tempBucket: Schema.optional(Schema.String),
      clusterTier: Schema.optional(Schema.String),
      lifecycleConfig: Schema.optional(LifecycleConfig),
      encryptionConfig: Schema.optional(EncryptionConfig),
    }),
  ).annotate({
    identifier: "ClusterConfig",
  }) as any as Schema.Schema<ClusterConfig>;

export interface ManagedCluster {
  /** Optional. The labels to associate with this cluster.Label keys must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}\p{N}_-{0,63}No more than 32 labels can be associated with a given cluster. */
  labels?: Record<string, string>;
  /** Required. The cluster name prefix. A unique cluster name will be formed by appending a random suffix.The name must contain only lower-case letters (a-z), numbers (0-9), and hyphens (-). Must begin with a letter. Cannot begin or end with hyphen. Must consist of between 2 and 35 characters. */
  clusterName?: string;
  /** Required. The cluster configuration. */
  config?: ClusterConfig;
}

export const ManagedCluster: Schema.Schema<ManagedCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      clusterName: Schema.optional(Schema.String),
      config: Schema.optional(ClusterConfig),
    }),
  ).annotate({
    identifier: "ManagedCluster",
  }) as any as Schema.Schema<ManagedCluster>;

export interface WorkflowTemplatePlacement {
  /** Optional. A selector that chooses target cluster for jobs based on metadata.The selector is evaluated at the time each job is submitted. */
  clusterSelector?: ClusterSelector;
  /** A cluster that is managed by the workflow. */
  managedCluster?: ManagedCluster;
}

export const WorkflowTemplatePlacement: Schema.Schema<WorkflowTemplatePlacement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterSelector: Schema.optional(ClusterSelector),
      managedCluster: Schema.optional(ManagedCluster),
    }),
  ).annotate({
    identifier: "WorkflowTemplatePlacement",
  }) as any as Schema.Schema<WorkflowTemplatePlacement>;

export interface ExecutorMetrics {
  metrics?: Record<string, string>;
}

export const ExecutorMetrics: Schema.Schema<ExecutorMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metrics: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ExecutorMetrics",
  }) as any as Schema.Schema<ExecutorMetrics>;

export interface ExecutorStageSummary {
  memoryBytesSpilled?: string;
  failedTasks?: number;
  inputRecords?: string;
  taskTimeMillis?: string;
  isExcludedForStage?: boolean;
  killedTasks?: number;
  peakMemoryMetrics?: ExecutorMetrics;
  executorId?: string;
  diskBytesSpilled?: string;
  outputBytes?: string;
  shuffleWrite?: string;
  stageAttemptId?: number;
  succeededTasks?: number;
  shuffleRead?: string;
  shuffleWriteRecords?: string;
  shuffleReadRecords?: string;
  outputRecords?: string;
  inputBytes?: string;
  stageId?: string;
}

export const ExecutorStageSummary: Schema.Schema<ExecutorStageSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memoryBytesSpilled: Schema.optional(Schema.String),
      failedTasks: Schema.optional(Schema.Number),
      inputRecords: Schema.optional(Schema.String),
      taskTimeMillis: Schema.optional(Schema.String),
      isExcludedForStage: Schema.optional(Schema.Boolean),
      killedTasks: Schema.optional(Schema.Number),
      peakMemoryMetrics: Schema.optional(ExecutorMetrics),
      executorId: Schema.optional(Schema.String),
      diskBytesSpilled: Schema.optional(Schema.String),
      outputBytes: Schema.optional(Schema.String),
      shuffleWrite: Schema.optional(Schema.String),
      stageAttemptId: Schema.optional(Schema.Number),
      succeededTasks: Schema.optional(Schema.Number),
      shuffleRead: Schema.optional(Schema.String),
      shuffleWriteRecords: Schema.optional(Schema.String),
      shuffleReadRecords: Schema.optional(Schema.String),
      outputRecords: Schema.optional(Schema.String),
      inputBytes: Schema.optional(Schema.String),
      stageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExecutorStageSummary",
  }) as any as Schema.Schema<ExecutorStageSummary>;

export interface SearchSessionSparkApplicationExecutorStageSummaryResponse {
  /** Details about executors used by the application stage. */
  sparkApplicationStageExecutors?: Array<ExecutorStageSummary>;
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationExecutorStageSummaryRequest. */
  nextPageToken?: string;
}

export const SearchSessionSparkApplicationExecutorStageSummaryResponse: Schema.Schema<SearchSessionSparkApplicationExecutorStageSummaryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkApplicationStageExecutors: Schema.optional(
        Schema.Array(ExecutorStageSummary),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationExecutorStageSummaryResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationExecutorStageSummaryResponse>;

export interface InputQuantileMetrics {
  recordsRead?: Quantiles;
  bytesRead?: Quantiles;
}

export const InputQuantileMetrics: Schema.Schema<InputQuantileMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recordsRead: Schema.optional(Quantiles),
      bytesRead: Schema.optional(Quantiles),
    }),
  ).annotate({
    identifier: "InputQuantileMetrics",
  }) as any as Schema.Schema<InputQuantileMetrics>;

export interface ShuffleWriteQuantileMetrics {
  writeRecords?: Quantiles;
  writeBytes?: Quantiles;
  writeTimeNanos?: Quantiles;
}

export const ShuffleWriteQuantileMetrics: Schema.Schema<ShuffleWriteQuantileMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      writeRecords: Schema.optional(Quantiles),
      writeBytes: Schema.optional(Quantiles),
      writeTimeNanos: Schema.optional(Quantiles),
    }),
  ).annotate({
    identifier: "ShuffleWriteQuantileMetrics",
  }) as any as Schema.Schema<ShuffleWriteQuantileMetrics>;

export interface TaskQuantileMetrics {
  inputMetrics?: InputQuantileMetrics;
  executorDeserializeTimeMillis?: Quantiles;
  outputMetrics?: OutputQuantileMetrics;
  diskBytesSpilled?: Quantiles;
  peakExecutionMemoryBytes?: Quantiles;
  shuffleWriteMetrics?: ShuffleWriteQuantileMetrics;
  durationMillis?: Quantiles;
  memoryBytesSpilled?: Quantiles;
  executorDeserializeCpuTimeNanos?: Quantiles;
  resultSerializationTimeMillis?: Quantiles;
  executorCpuTimeNanos?: Quantiles;
  shuffleReadMetrics?: ShuffleReadQuantileMetrics;
  schedulerDelayMillis?: Quantiles;
  resultSize?: Quantiles;
  gettingResultTimeMillis?: Quantiles;
  executorRunTimeMillis?: Quantiles;
  jvmGcTimeMillis?: Quantiles;
}

export const TaskQuantileMetrics: Schema.Schema<TaskQuantileMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputMetrics: Schema.optional(InputQuantileMetrics),
      executorDeserializeTimeMillis: Schema.optional(Quantiles),
      outputMetrics: Schema.optional(OutputQuantileMetrics),
      diskBytesSpilled: Schema.optional(Quantiles),
      peakExecutionMemoryBytes: Schema.optional(Quantiles),
      shuffleWriteMetrics: Schema.optional(ShuffleWriteQuantileMetrics),
      durationMillis: Schema.optional(Quantiles),
      memoryBytesSpilled: Schema.optional(Quantiles),
      executorDeserializeCpuTimeNanos: Schema.optional(Quantiles),
      resultSerializationTimeMillis: Schema.optional(Quantiles),
      executorCpuTimeNanos: Schema.optional(Quantiles),
      shuffleReadMetrics: Schema.optional(ShuffleReadQuantileMetrics),
      schedulerDelayMillis: Schema.optional(Quantiles),
      resultSize: Schema.optional(Quantiles),
      gettingResultTimeMillis: Schema.optional(Quantiles),
      executorRunTimeMillis: Schema.optional(Quantiles),
      jvmGcTimeMillis: Schema.optional(Quantiles),
    }),
  ).annotate({
    identifier: "TaskQuantileMetrics",
  }) as any as Schema.Schema<TaskQuantileMetrics>;

export interface SparkJob {
  /** The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in SparkJob.jar_file_uris. */
  mainClass?: string;
  /** Optional. A mapping of property names to values, used to configure Spark. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
  /** Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission. */
  args?: Array<string>;
  /** Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks. */
  fileUris?: Array<string>;
  /** Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Spark driver and tasks. */
  jarFileUris?: Array<string>;
  /** The HCFS URI of the jar file that contains the main class. */
  mainJarFileUri?: string;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
}

export const SparkJob: Schema.Schema<SparkJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mainClass: Schema.optional(Schema.String),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
      args: Schema.optional(Schema.Array(Schema.String)),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      mainJarFileUri: Schema.optional(Schema.String),
      loggingConfig: Schema.optional(LoggingConfig),
    }),
  ).annotate({ identifier: "SparkJob" }) as any as Schema.Schema<SparkJob>;

export interface JobsSummary {
  /** Number of completed jobs */
  completedJobs?: number;
  /** Attempts info */
  attempts?: Array<ApplicationAttemptInfo>;
  /** Spark Application Id */
  applicationId?: string;
  /** Number of failed jobs */
  failedJobs?: number;
  /** Number of active jobs */
  activeJobs?: number;
  /** Spark Scheduling mode */
  schedulingMode?: string;
}

export const JobsSummary: Schema.Schema<JobsSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      completedJobs: Schema.optional(Schema.Number),
      attempts: Schema.optional(Schema.Array(ApplicationAttemptInfo)),
      applicationId: Schema.optional(Schema.String),
      failedJobs: Schema.optional(Schema.Number),
      activeJobs: Schema.optional(Schema.Number),
      schedulingMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "JobsSummary",
  }) as any as Schema.Schema<JobsSummary>;

export interface SummarizeSparkApplicationJobsResponse {
  /** Summary of a Spark Application Jobs */
  jobsSummary?: JobsSummary;
}

export const SummarizeSparkApplicationJobsResponse: Schema.Schema<SummarizeSparkApplicationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobsSummary: Schema.optional(JobsSummary),
    }),
  ).annotate({
    identifier: "SummarizeSparkApplicationJobsResponse",
  }) as any as Schema.Schema<SummarizeSparkApplicationJobsResponse>;

export interface MemoryMetrics {
  usedOnHeapStorageMemory?: string;
  totalOffHeapStorageMemory?: string;
  totalOnHeapStorageMemory?: string;
  usedOffHeapStorageMemory?: string;
}

export const MemoryMetrics: Schema.Schema<MemoryMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      usedOnHeapStorageMemory: Schema.optional(Schema.String),
      totalOffHeapStorageMemory: Schema.optional(Schema.String),
      totalOnHeapStorageMemory: Schema.optional(Schema.String),
      usedOffHeapStorageMemory: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MemoryMetrics",
  }) as any as Schema.Schema<MemoryMetrics>;

export interface ConsolidatedExecutorSummary {
  diskUsed?: string;
  memoryUsed?: string;
  totalInputBytes?: string;
  maxMemory?: string;
  totalTasks?: number;
  completedTasks?: number;
  totalDurationMillis?: string;
  isExcluded?: number;
  activeTasks?: number;
  failedTasks?: number;
  rddBlocks?: number;
  totalShuffleWrite?: string;
  memoryMetrics?: MemoryMetrics;
  totalGcTimeMillis?: string;
  count?: number;
  totalCores?: number;
  totalShuffleRead?: string;
}

export const ConsolidatedExecutorSummary: Schema.Schema<ConsolidatedExecutorSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskUsed: Schema.optional(Schema.String),
      memoryUsed: Schema.optional(Schema.String),
      totalInputBytes: Schema.optional(Schema.String),
      maxMemory: Schema.optional(Schema.String),
      totalTasks: Schema.optional(Schema.Number),
      completedTasks: Schema.optional(Schema.Number),
      totalDurationMillis: Schema.optional(Schema.String),
      isExcluded: Schema.optional(Schema.Number),
      activeTasks: Schema.optional(Schema.Number),
      failedTasks: Schema.optional(Schema.Number),
      rddBlocks: Schema.optional(Schema.Number),
      totalShuffleWrite: Schema.optional(Schema.String),
      memoryMetrics: Schema.optional(MemoryMetrics),
      totalGcTimeMillis: Schema.optional(Schema.String),
      count: Schema.optional(Schema.Number),
      totalCores: Schema.optional(Schema.Number),
      totalShuffleRead: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConsolidatedExecutorSummary",
  }) as any as Schema.Schema<ConsolidatedExecutorSummary>;

export interface SummarizeSparkApplicationExecutorsResponse {
  /** Spark Application Id */
  applicationId?: string;
  /** Overall consolidated summary for all executors. */
  totalExecutorSummary?: ConsolidatedExecutorSummary;
  /** Consolidated summary for active executors. */
  activeExecutorSummary?: ConsolidatedExecutorSummary;
  /** Consolidated summary for dead executors. */
  deadExecutorSummary?: ConsolidatedExecutorSummary;
}

export const SummarizeSparkApplicationExecutorsResponse: Schema.Schema<SummarizeSparkApplicationExecutorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicationId: Schema.optional(Schema.String),
      totalExecutorSummary: Schema.optional(ConsolidatedExecutorSummary),
      activeExecutorSummary: Schema.optional(ConsolidatedExecutorSummary),
      deadExecutorSummary: Schema.optional(ConsolidatedExecutorSummary),
    }),
  ).annotate({
    identifier: "SummarizeSparkApplicationExecutorsResponse",
  }) as any as Schema.Schema<SummarizeSparkApplicationExecutorsResponse>;

export interface RegexValidation {
  /** Required. RE2 regular expressions used to validate the parameter's value. The value must match the regex in its entirety (substring matches are not sufficient). */
  regexes?: Array<string>;
}

export const RegexValidation: Schema.Schema<RegexValidation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regexes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RegexValidation",
  }) as any as Schema.Schema<RegexValidation>;

export interface ParameterValidation {
  /** Validation based on a list of allowed values. */
  values?: ValueValidation;
  /** Validation based on regular expressions. */
  regex?: RegexValidation;
}

export const ParameterValidation: Schema.Schema<ParameterValidation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(ValueValidation),
      regex: Schema.optional(RegexValidation),
    }),
  ).annotate({
    identifier: "ParameterValidation",
  }) as any as Schema.Schema<ParameterValidation>;

export interface TemplateParameter {
  /** Optional. Brief description of the parameter. Must not exceed 1024 characters. */
  description?: string;
  /** Required. Paths to all fields that the parameter replaces. A field is allowed to appear in at most one parameter's list of field paths.A field path is similar in syntax to a google.protobuf.FieldMask. For example, a field path that references the zone field of a workflow template's cluster selector would be specified as placement.clusterSelector.zone.Also, field paths can reference fields using the following syntax: Values in maps can be referenced by key: labels'key' placement.clusterSelector.clusterLabels'key' placement.managedCluster.labels'key' placement.clusterSelector.clusterLabels'key' jobs'step-id'.labels'key' Jobs in the jobs list can be referenced by step-id: jobs'step-id'.hadoopJob.mainJarFileUri jobs'step-id'.hiveJob.queryFileUri jobs'step-id'.pySparkJob.mainPythonFileUri jobs'step-id'.hadoopJob.jarFileUris0 jobs'step-id'.hadoopJob.archiveUris0 jobs'step-id'.hadoopJob.fileUris0 jobs'step-id'.pySparkJob.pythonFileUris0 Items in repeated fields can be referenced by a zero-based index: jobs'step-id'.sparkJob.args0 Other examples: jobs'step-id'.hadoopJob.properties'key' jobs'step-id'.hadoopJob.args0 jobs'step-id'.hiveJob.scriptVariables'key' jobs'step-id'.hadoopJob.mainJarFileUri placement.clusterSelector.zoneIt may not be possible to parameterize maps and repeated fields in their entirety since only individual map values and individual items in repeated fields can be referenced. For example, the following field paths are invalid: placement.clusterSelector.clusterLabels jobs'step-id'.sparkJob.args */
  fields?: Array<string>;
  /** Required. Parameter name. The parameter name is used as the key, and paired with the parameter value, which are passed to the template when the template is instantiated. The name must contain only capital letters (A-Z), numbers (0-9), and underscores (_), and must not start with a number. The maximum length is 40 characters. */
  name?: string;
  /** Optional. Validation rules to be applied to this parameter's value. */
  validation?: ParameterValidation;
}

export const TemplateParameter: Schema.Schema<TemplateParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      validation: Schema.optional(ParameterValidation),
    }),
  ).annotate({
    identifier: "TemplateParameter",
  }) as any as Schema.Schema<TemplateParameter>;

export interface SpeculationStageSummary {
  numKilledTasks?: number;
  numActiveTasks?: number;
  stageId?: string;
  numTasks?: number;
  numCompletedTasks?: number;
  stageAttemptId?: number;
  numFailedTasks?: number;
}

export const SpeculationStageSummary: Schema.Schema<SpeculationStageSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      numKilledTasks: Schema.optional(Schema.Number),
      numActiveTasks: Schema.optional(Schema.Number),
      stageId: Schema.optional(Schema.String),
      numTasks: Schema.optional(Schema.Number),
      numCompletedTasks: Schema.optional(Schema.Number),
      stageAttemptId: Schema.optional(Schema.Number),
      numFailedTasks: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SpeculationStageSummary",
  }) as any as Schema.Schema<SpeculationStageSummary>;

export interface ExecutorPeakMetricsDistributions {
  executorMetrics?: Array<ExecutorMetrics>;
  quantiles?: Array<number>;
}

export const ExecutorPeakMetricsDistributions: Schema.Schema<ExecutorPeakMetricsDistributions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executorMetrics: Schema.optional(Schema.Array(ExecutorMetrics)),
      quantiles: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).annotate({
    identifier: "ExecutorPeakMetricsDistributions",
  }) as any as Schema.Schema<ExecutorPeakMetricsDistributions>;

export interface ExecutorMetricsDistributions {
  failedTasks?: Array<number>;
  inputBytes?: Array<number>;
  outputBytes?: Array<number>;
  inputRecords?: Array<number>;
  killedTasks?: Array<number>;
  taskTimeMillis?: Array<number>;
  shuffleWriteRecords?: Array<number>;
  shuffleRead?: Array<number>;
  shuffleWrite?: Array<number>;
  succeededTasks?: Array<number>;
  peakMemoryMetrics?: ExecutorPeakMetricsDistributions;
  quantiles?: Array<number>;
  shuffleReadRecords?: Array<number>;
  outputRecords?: Array<number>;
  memoryBytesSpilled?: Array<number>;
  diskBytesSpilled?: Array<number>;
}

export const ExecutorMetricsDistributions: Schema.Schema<ExecutorMetricsDistributions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      failedTasks: Schema.optional(Schema.Array(Schema.Number)),
      inputBytes: Schema.optional(Schema.Array(Schema.Number)),
      outputBytes: Schema.optional(Schema.Array(Schema.Number)),
      inputRecords: Schema.optional(Schema.Array(Schema.Number)),
      killedTasks: Schema.optional(Schema.Array(Schema.Number)),
      taskTimeMillis: Schema.optional(Schema.Array(Schema.Number)),
      shuffleWriteRecords: Schema.optional(Schema.Array(Schema.Number)),
      shuffleRead: Schema.optional(Schema.Array(Schema.Number)),
      shuffleWrite: Schema.optional(Schema.Array(Schema.Number)),
      succeededTasks: Schema.optional(Schema.Array(Schema.Number)),
      peakMemoryMetrics: Schema.optional(ExecutorPeakMetricsDistributions),
      quantiles: Schema.optional(Schema.Array(Schema.Number)),
      shuffleReadRecords: Schema.optional(Schema.Array(Schema.Number)),
      outputRecords: Schema.optional(Schema.Array(Schema.Number)),
      memoryBytesSpilled: Schema.optional(Schema.Array(Schema.Number)),
      diskBytesSpilled: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).annotate({
    identifier: "ExecutorMetricsDistributions",
  }) as any as Schema.Schema<ExecutorMetricsDistributions>;

export interface StageInputMetrics {
  recordsRead?: string;
  bytesRead?: string;
}

export const StageInputMetrics: Schema.Schema<StageInputMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recordsRead: Schema.optional(Schema.String),
      bytesRead: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StageInputMetrics",
  }) as any as Schema.Schema<StageInputMetrics>;

export interface StageOutputMetrics {
  recordsWritten?: string;
  bytesWritten?: string;
}

export const StageOutputMetrics: Schema.Schema<StageOutputMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recordsWritten: Schema.optional(Schema.String),
      bytesWritten: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StageOutputMetrics",
  }) as any as Schema.Schema<StageOutputMetrics>;

export interface StageShufflePushReadMetrics {
  remoteMergedBytesRead?: string;
  remoteMergedChunksFetched?: string;
  remoteMergedBlocksFetched?: string;
  localMergedChunksFetched?: string;
  corruptMergedBlockChunks?: string;
  mergedFetchFallbackCount?: string;
  localMergedBytesRead?: string;
  localMergedBlocksFetched?: string;
  remoteMergedReqsDuration?: string;
}

export const StageShufflePushReadMetrics: Schema.Schema<StageShufflePushReadMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      remoteMergedBytesRead: Schema.optional(Schema.String),
      remoteMergedChunksFetched: Schema.optional(Schema.String),
      remoteMergedBlocksFetched: Schema.optional(Schema.String),
      localMergedChunksFetched: Schema.optional(Schema.String),
      corruptMergedBlockChunks: Schema.optional(Schema.String),
      mergedFetchFallbackCount: Schema.optional(Schema.String),
      localMergedBytesRead: Schema.optional(Schema.String),
      localMergedBlocksFetched: Schema.optional(Schema.String),
      remoteMergedReqsDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StageShufflePushReadMetrics",
  }) as any as Schema.Schema<StageShufflePushReadMetrics>;

export interface StageShuffleReadMetrics {
  remoteBytesRead?: string;
  stageShufflePushReadMetrics?: StageShufflePushReadMetrics;
  fetchWaitTimeMillis?: string;
  bytesRead?: string;
  localBlocksFetched?: string;
  remoteBytesReadToDisk?: string;
  remoteBlocksFetched?: string;
  localBytesRead?: string;
  remoteReqsDuration?: string;
  recordsRead?: string;
}

export const StageShuffleReadMetrics: Schema.Schema<StageShuffleReadMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      remoteBytesRead: Schema.optional(Schema.String),
      stageShufflePushReadMetrics: Schema.optional(StageShufflePushReadMetrics),
      fetchWaitTimeMillis: Schema.optional(Schema.String),
      bytesRead: Schema.optional(Schema.String),
      localBlocksFetched: Schema.optional(Schema.String),
      remoteBytesReadToDisk: Schema.optional(Schema.String),
      remoteBlocksFetched: Schema.optional(Schema.String),
      localBytesRead: Schema.optional(Schema.String),
      remoteReqsDuration: Schema.optional(Schema.String),
      recordsRead: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StageShuffleReadMetrics",
  }) as any as Schema.Schema<StageShuffleReadMetrics>;

export interface StageShuffleWriteMetrics {
  recordsWritten?: string;
  bytesWritten?: string;
  writeTimeNanos?: string;
}

export const StageShuffleWriteMetrics: Schema.Schema<StageShuffleWriteMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recordsWritten: Schema.optional(Schema.String),
      bytesWritten: Schema.optional(Schema.String),
      writeTimeNanos: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StageShuffleWriteMetrics",
  }) as any as Schema.Schema<StageShuffleWriteMetrics>;

export interface StageMetrics {
  resultSize?: string;
  diskBytesSpilled?: string;
  executorCpuTimeNanos?: string;
  jvmGcTimeMillis?: string;
  stageInputMetrics?: StageInputMetrics;
  peakExecutionMemoryBytes?: string;
  executorDeserializeTimeMillis?: string;
  resultSerializationTimeMillis?: string;
  memoryBytesSpilled?: string;
  stageOutputMetrics?: StageOutputMetrics;
  stageShuffleReadMetrics?: StageShuffleReadMetrics;
  executorDeserializeCpuTimeNanos?: string;
  executorRunTimeMillis?: string;
  stageShuffleWriteMetrics?: StageShuffleWriteMetrics;
}

export const StageMetrics: Schema.Schema<StageMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resultSize: Schema.optional(Schema.String),
      diskBytesSpilled: Schema.optional(Schema.String),
      executorCpuTimeNanos: Schema.optional(Schema.String),
      jvmGcTimeMillis: Schema.optional(Schema.String),
      stageInputMetrics: Schema.optional(StageInputMetrics),
      peakExecutionMemoryBytes: Schema.optional(Schema.String),
      executorDeserializeTimeMillis: Schema.optional(Schema.String),
      resultSerializationTimeMillis: Schema.optional(Schema.String),
      memoryBytesSpilled: Schema.optional(Schema.String),
      stageOutputMetrics: Schema.optional(StageOutputMetrics),
      stageShuffleReadMetrics: Schema.optional(StageShuffleReadMetrics),
      executorDeserializeCpuTimeNanos: Schema.optional(Schema.String),
      executorRunTimeMillis: Schema.optional(Schema.String),
      stageShuffleWriteMetrics: Schema.optional(StageShuffleWriteMetrics),
    }),
  ).annotate({
    identifier: "StageMetrics",
  }) as any as Schema.Schema<StageMetrics>;

export interface StageData {
  description?: string;
  peakExecutorMetrics?: ExecutorMetrics;
  resourceProfileId?: number;
  stageAttemptId?: number;
  numKilledTasks?: number;
  parentStageIds?: Array<string>;
  status?:
    | "STAGE_STATUS_UNSPECIFIED"
    | "STAGE_STATUS_ACTIVE"
    | "STAGE_STATUS_COMPLETE"
    | "STAGE_STATUS_FAILED"
    | "STAGE_STATUS_PENDING"
    | "STAGE_STATUS_SKIPPED"
    | (string & {});
  stageId?: string;
  tasks?: Record<string, TaskData>;
  shuffleMergersCount?: number;
  /** Summary metrics fields. These are included in response only if present in summary_metrics_mask field in request */
  taskQuantileMetrics?: TaskQuantileMetrics;
  numTasks?: number;
  locality?: Record<string, string>;
  numFailedTasks?: number;
  numCompletedIndices?: number;
  schedulingPool?: string;
  jobIds?: Array<string>;
  accumulatorUpdates?: Array<AccumulableInfo>;
  failureReason?: string;
  speculationSummary?: SpeculationStageSummary;
  firstTaskLaunchedTime?: string;
  completionTime?: string;
  executorSummary?: Record<string, ExecutorStageSummary>;
  rddIds?: Array<string>;
  details?: string;
  executorMetricsDistributions?: ExecutorMetricsDistributions;
  numCompleteTasks?: number;
  name?: string;
  numActiveTasks?: number;
  submissionTime?: string;
  isShufflePushEnabled?: boolean;
  stageMetrics?: StageMetrics;
  killedTasksSummary?: Record<string, number>;
}

export const StageData: Schema.Schema<StageData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      peakExecutorMetrics: Schema.optional(ExecutorMetrics),
      resourceProfileId: Schema.optional(Schema.Number),
      stageAttemptId: Schema.optional(Schema.Number),
      numKilledTasks: Schema.optional(Schema.Number),
      parentStageIds: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.String),
      stageId: Schema.optional(Schema.String),
      tasks: Schema.optional(Schema.Record(Schema.String, TaskData)),
      shuffleMergersCount: Schema.optional(Schema.Number),
      taskQuantileMetrics: Schema.optional(TaskQuantileMetrics),
      numTasks: Schema.optional(Schema.Number),
      locality: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      numFailedTasks: Schema.optional(Schema.Number),
      numCompletedIndices: Schema.optional(Schema.Number),
      schedulingPool: Schema.optional(Schema.String),
      jobIds: Schema.optional(Schema.Array(Schema.String)),
      accumulatorUpdates: Schema.optional(Schema.Array(AccumulableInfo)),
      failureReason: Schema.optional(Schema.String),
      speculationSummary: Schema.optional(SpeculationStageSummary),
      firstTaskLaunchedTime: Schema.optional(Schema.String),
      completionTime: Schema.optional(Schema.String),
      executorSummary: Schema.optional(
        Schema.Record(Schema.String, ExecutorStageSummary),
      ),
      rddIds: Schema.optional(Schema.Array(Schema.String)),
      details: Schema.optional(Schema.String),
      executorMetricsDistributions: Schema.optional(
        ExecutorMetricsDistributions,
      ),
      numCompleteTasks: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      numActiveTasks: Schema.optional(Schema.Number),
      submissionTime: Schema.optional(Schema.String),
      isShufflePushEnabled: Schema.optional(Schema.Boolean),
      stageMetrics: Schema.optional(StageMetrics),
      killedTasksSummary: Schema.optional(
        Schema.Record(Schema.String, Schema.Number),
      ),
    }),
  ).annotate({ identifier: "StageData" }) as any as Schema.Schema<StageData>;

export interface SourceProgress {
  metrics?: Record<string, string>;
  processedRowsPerSecond?: number;
  inputRowsPerSecond?: number;
  latestOffset?: string;
  numInputRows?: string;
  startOffset?: string;
  description?: string;
  endOffset?: string;
}

export const SourceProgress: Schema.Schema<SourceProgress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metrics: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      processedRowsPerSecond: Schema.optional(Schema.Number),
      inputRowsPerSecond: Schema.optional(Schema.Number),
      latestOffset: Schema.optional(Schema.String),
      numInputRows: Schema.optional(Schema.String),
      startOffset: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      endOffset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SourceProgress",
  }) as any as Schema.Schema<SourceProgress>;

export interface FallbackReason {
  /** Optional. Fallback to Spark reason. */
  fallbackReason?: string;
  /** Optional. Fallback node information. */
  fallbackNode?: string;
}

export const FallbackReason: Schema.Schema<FallbackReason> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fallbackReason: Schema.optional(Schema.String),
      fallbackNode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FallbackReason",
  }) as any as Schema.Schema<FallbackReason>;

export interface SparkRuntimeInfo {
  scalaVersion?: string;
  javaVersion?: string;
  javaHome?: string;
}

export const SparkRuntimeInfo: Schema.Schema<SparkRuntimeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scalaVersion: Schema.optional(Schema.String),
      javaVersion: Schema.optional(Schema.String),
      javaHome: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkRuntimeInfo",
  }) as any as Schema.Schema<SparkRuntimeInfo>;

export interface ApplicationEnvironmentInfo {
  systemProperties?: Record<string, string>;
  metricsProperties?: Record<string, string>;
  hadoopProperties?: Record<string, string>;
  resourceProfiles?: Array<ResourceProfileInfo>;
  sparkProperties?: Record<string, string>;
  runtime?: SparkRuntimeInfo;
  classpathEntries?: Record<string, string>;
}

export const ApplicationEnvironmentInfo: Schema.Schema<ApplicationEnvironmentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      systemProperties: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      metricsProperties: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      hadoopProperties: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      resourceProfiles: Schema.optional(Schema.Array(ResourceProfileInfo)),
      sparkProperties: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      runtime: Schema.optional(SparkRuntimeInfo),
      classpathEntries: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "ApplicationEnvironmentInfo",
  }) as any as Schema.Schema<ApplicationEnvironmentInfo>;

export interface PySparkBatch {
  /** Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
  /** Required. The HCFS URI of the main Python file to use as the Spark driver. Must be a .py file. */
  mainPythonFileUri?: string;
  /** Optional. HCFS URIs of files to be placed in the working directory of each executor. */
  fileUris?: Array<string>;
  /** Optional. The arguments to pass to the driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission. */
  args?: Array<string>;
  /** Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types: .py, .egg, and .zip. */
  pythonFileUris?: Array<string>;
  /** Optional. HCFS URIs of jar files to add to the classpath of the Spark driver and tasks. */
  jarFileUris?: Array<string>;
}

export const PySparkBatch: Schema.Schema<PySparkBatch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
      mainPythonFileUri: Schema.optional(Schema.String),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      args: Schema.optional(Schema.Array(Schema.String)),
      pythonFileUris: Schema.optional(Schema.Array(Schema.String)),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PySparkBatch",
  }) as any as Schema.Schema<PySparkBatch>;

export interface JobReference {
  /** Optional. The job ID, which must be unique within the project.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or hyphens (-). The maximum length is 100 characters.If not specified by the caller, the job ID will be provided by the server. */
  jobId?: string;
  /** Optional. The ID of the Google Cloud Platform project that the job belongs to. If specified, must match the request project ID. */
  projectId?: string;
}

export const JobReference: Schema.Schema<JobReference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobId: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "JobReference",
  }) as any as Schema.Schema<JobReference>;

export interface PrestoJob {
  /** Optional. Presto client tags to attach to this query */
  clientTags?: Array<string>;
  /** The HCFS URI of the script that contains SQL queries. */
  queryFileUri?: string;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries. */
  continueOnFailure?: boolean;
  /** Optional. A mapping of property names to values. Used to set Presto session properties (https://prestodb.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Presto CLI */
  properties?: Record<string, string>;
  /** Optional. The format in which query output will be displayed. See the Presto documentation for supported output formats */
  outputFormat?: string;
  /** A list of queries. */
  queryList?: QueryList;
}

export const PrestoJob: Schema.Schema<PrestoJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientTags: Schema.optional(Schema.Array(Schema.String)),
      queryFileUri: Schema.optional(Schema.String),
      loggingConfig: Schema.optional(LoggingConfig),
      continueOnFailure: Schema.optional(Schema.Boolean),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      outputFormat: Schema.optional(Schema.String),
      queryList: Schema.optional(QueryList),
    }),
  ).annotate({ identifier: "PrestoJob" }) as any as Schema.Schema<PrestoJob>;

export interface YarnApplication {
  /** Optional. The cumulative memory usage of the application for a job, measured in mb-seconds. */
  memoryMbSeconds?: string;
  /** Optional. The HTTP URL of the ApplicationMaster, HistoryServer, or TimelineServer that provides application-specific information. The URL uses the internal hostname, and requires a proxy server for resolution and, possibly, access. */
  trackingUrl?: string;
  /** Optional. The cumulative CPU time consumed by the application for a job, measured in vcore-seconds. */
  vcoreSeconds?: string;
  /** Required. The application state. */
  state?:
    | "STATE_UNSPECIFIED"
    | "NEW"
    | "NEW_SAVING"
    | "SUBMITTED"
    | "ACCEPTED"
    | "RUNNING"
    | "FINISHED"
    | "FAILED"
    | "KILLED"
    | (string & {});
  /** Required. The numerical progress of the application, from 1 to 100. */
  progress?: number;
  /** Required. The application name. */
  name?: string;
}

export const YarnApplication: Schema.Schema<YarnApplication> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memoryMbSeconds: Schema.optional(Schema.String),
      trackingUrl: Schema.optional(Schema.String),
      vcoreSeconds: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      progress: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "YarnApplication",
  }) as any as Schema.Schema<YarnApplication>;

export interface PigJob {
  /** Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries. */
  continueOnFailure?: boolean;
  /** Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs. */
  jarFileUris?: Array<string>;
  /** Optional. A mapping of property names to values, used to configure Pig. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/pig/conf/pig.properties, and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. Mapping of query variable names to values (equivalent to the Pig command: name=[value]). */
  scriptVariables?: Record<string, string>;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** A list of queries. */
  queryList?: QueryList;
  /** The HCFS URI of the script that contains the Pig queries. */
  queryFileUri?: string;
}

export const PigJob: Schema.Schema<PigJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      continueOnFailure: Schema.optional(Schema.Boolean),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      scriptVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      loggingConfig: Schema.optional(LoggingConfig),
      queryList: Schema.optional(QueryList),
      queryFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PigJob" }) as any as Schema.Schema<PigJob>;

export interface DriverSchedulingConfig {
  /** Required. The number of vCPUs the driver is requesting. */
  vcores?: number;
  /** Required. The amount of memory in MB the driver is requesting. */
  memoryMb?: number;
}

export const DriverSchedulingConfig: Schema.Schema<DriverSchedulingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vcores: Schema.optional(Schema.Number),
      memoryMb: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DriverSchedulingConfig",
  }) as any as Schema.Schema<DriverSchedulingConfig>;

export interface HadoopJob {
  /** The name of the driver's main class. The jar file containing the class must be in the default CLASSPATH or specified in jar_file_uris. */
  mainClass?: string;
  /** Optional. The arguments to pass to the driver. Do not include arguments, such as -libjars or -Dfoo=bar, that can be set as job properties, since a collision might occur that causes an incorrect job submission. */
  args?: Array<string>;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** Optional. A mapping of property names to values, used to configure Hadoop. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. HCFS URIs of archives to be extracted in the working directory of Hadoop drivers and tasks. Supported file types: .jar, .tar, .tar.gz, .tgz, or .zip. */
  archiveUris?: Array<string>;
  /** The HCFS URI of the jar file containing the main class. Examples: 'gs://foo-bucket/analytics-binaries/extract-useful-metrics-mr.jar' 'hdfs:/tmp/test-samples/custom-wordcount.jar' 'file:///home/usr/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar' */
  mainJarFileUri?: string;
  /** Optional. HCFS (Hadoop Compatible Filesystem) URIs of files to be copied to the working directory of Hadoop drivers and distributed tasks. Useful for naively parallel tasks. */
  fileUris?: Array<string>;
  /** Optional. Jar file URIs to add to the CLASSPATHs of the Hadoop driver and tasks. */
  jarFileUris?: Array<string>;
}

export const HadoopJob: Schema.Schema<HadoopJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mainClass: Schema.optional(Schema.String),
      args: Schema.optional(Schema.Array(Schema.String)),
      loggingConfig: Schema.optional(LoggingConfig),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
      mainJarFileUri: Schema.optional(Schema.String),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "HadoopJob" }) as any as Schema.Schema<HadoopJob>;

export interface SparkSqlJob {
  /** The HCFS URI of the script that contains SQL queries. */
  queryFileUri?: string;
  /** Optional. A mapping of property names to values, used to configure Spark SQL's SparkConf. Properties that conflict with values set by the Dataproc API might be overwritten. */
  properties?: Record<string, string>;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH. */
  jarFileUris?: Array<string>;
  /** A list of queries. */
  queryList?: QueryList;
  /** Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";). */
  scriptVariables?: Record<string, string>;
}

export const SparkSqlJob: Schema.Schema<SparkSqlJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryFileUri: Schema.optional(Schema.String),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      loggingConfig: Schema.optional(LoggingConfig),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      queryList: Schema.optional(QueryList),
      scriptVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "SparkSqlJob",
  }) as any as Schema.Schema<SparkSqlJob>;

export interface PySparkJob {
  /** Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Python driver and tasks. */
  jarFileUris?: Array<string>;
  /** Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip.Note: Spark applications must be deployed in cluster mode (https://spark.apache.org/docs/latest/cluster-overview.html) for correct environment propagation. */
  archiveUris?: Array<string>;
  /** Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks. */
  fileUris?: Array<string>;
  /** Required. The HCFS URI of the main Python file to use as the driver. Must be a .py file. */
  mainPythonFileUri?: string;
  /** Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission. */
  args?: Array<string>;
  /** Optional. A mapping of property names to values, used to configure PySpark. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types: .py, .egg, and .zip. */
  pythonFileUris?: Array<string>;
}

export const PySparkJob: Schema.Schema<PySparkJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      mainPythonFileUri: Schema.optional(Schema.String),
      args: Schema.optional(Schema.Array(Schema.String)),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      loggingConfig: Schema.optional(LoggingConfig),
      pythonFileUris: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "PySparkJob" }) as any as Schema.Schema<PySparkJob>;

export interface HiveJob {
  /** The HCFS URI of the script that contains Hive queries. */
  queryFileUri?: string;
  /** Optional. Mapping of query variable names to values (equivalent to the Hive command: SET name="value";). */
  scriptVariables?: Record<string, string>;
  /** Optional. HCFS URIs of jar files to add to the CLASSPATH of the Hive server and Hadoop MapReduce (MR) tasks. Can contain Hive SerDes and UDFs. */
  jarFileUris?: Array<string>;
  /** Optional. A mapping of property names and values, used to configure Hive. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/hive/conf/hive-site.xml, and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries. */
  continueOnFailure?: boolean;
  /** A list of queries. */
  queryList?: QueryList;
}

export const HiveJob: Schema.Schema<HiveJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryFileUri: Schema.optional(Schema.String),
      scriptVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      continueOnFailure: Schema.optional(Schema.Boolean),
      queryList: Schema.optional(QueryList),
    }),
  ).annotate({ identifier: "HiveJob" }) as any as Schema.Schema<HiveJob>;

export interface FlinkJob {
  /** Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision might occur that causes an incorrect job submission. */
  args?: Array<string>;
  /** Optional. The runtime log config for job execution. */
  loggingConfig?: LoggingConfig;
  /** Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Flink driver and tasks. */
  jarFileUris?: Array<string>;
  /** Optional. A mapping of property names to values, used to configure Flink. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/flink/conf/flink-defaults.conf and classes in user code. */
  properties?: Record<string, string>;
  /** Optional. HCFS URI of the savepoint, which contains the last saved progress for starting the current job. */
  savepointUri?: string;
  /** The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jarFileUris. */
  mainClass?: string;
  /** The HCFS URI of the jar file that contains the main class. */
  mainJarFileUri?: string;
}

export const FlinkJob: Schema.Schema<FlinkJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      args: Schema.optional(Schema.Array(Schema.String)),
      loggingConfig: Schema.optional(LoggingConfig),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      savepointUri: Schema.optional(Schema.String),
      mainClass: Schema.optional(Schema.String),
      mainJarFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "FlinkJob" }) as any as Schema.Schema<FlinkJob>;

export interface Job {
  /** Optional. Job is a SparkR job. */
  sparkRJob?: SparkRJob;
  /** Optional. Job is a Trino job. */
  trinoJob?: TrinoJob;
  /** Output only. The job status. Additional application-specific status information might be contained in the type_job and yarn_applications fields. */
  status?: JobStatus;
  /** Output only. Indicates whether the job is completed. If the value is false, the job is still in progress. If true, the job is completed, and status.state field will indicate if it was successful, failed, or cancelled. */
  done?: boolean;
  /** Output only. A URI pointing to the location of the stdout of the job's driver program. */
  driverOutputResourceUri?: string;
  /** Output only. The previous job status. */
  statusHistory?: Array<JobStatus>;
  /** Optional. The fully qualified reference to the job, which can be used to obtain the equivalent REST path of the job resource. If this property is not specified when a job is created, the server generates a job_id. */
  reference?: JobReference;
  /** Optional. Job is a Presto job. */
  prestoJob?: PrestoJob;
  /** Output only. The collection of YARN applications spun up by this job.Beta Feature: This report is available for testing purposes only. It might be changed before final release. */
  yarnApplications?: Array<YarnApplication>;
  /** Optional. The labels to associate with this job. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a job. */
  labels?: Record<string, string>;
  /** Optional. Job is a Pig job. */
  pigJob?: PigJob;
  /** Output only. If present, the location of miscellaneous control files which can be used as part of job setup and handling. If not present, control files might be placed in the same location as driver_output_uri. */
  driverControlFilesUri?: string;
  /** Optional. Job is a Spark job. */
  sparkJob?: SparkJob;
  /** Optional. Driver scheduling configuration. */
  driverSchedulingConfig?: DriverSchedulingConfig;
  /** Optional. Job is a Hadoop job. */
  hadoopJob?: HadoopJob;
  /** Output only. A UUID that uniquely identifies a job within the project over time. This is in contrast to a user-settable reference.job_id that might be reused over time. */
  jobUuid?: string;
  /** Optional. Job is a SparkSql job. */
  sparkSqlJob?: SparkSqlJob;
  /** Required. Job information, including how, when, and where to run the job. */
  placement?: JobPlacement;
  /** Optional. Job scheduling configuration. */
  scheduling?: JobScheduling;
  /** Optional. Job is a PySpark job. */
  pysparkJob?: PySparkJob;
  /** Optional. Job is a Hive job. */
  hiveJob?: HiveJob;
  /** Optional. Job is a Flink job. */
  flinkJob?: FlinkJob;
}

export const Job: Schema.Schema<Job> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkRJob: Schema.optional(SparkRJob),
      trinoJob: Schema.optional(TrinoJob),
      status: Schema.optional(JobStatus),
      done: Schema.optional(Schema.Boolean),
      driverOutputResourceUri: Schema.optional(Schema.String),
      statusHistory: Schema.optional(Schema.Array(JobStatus)),
      reference: Schema.optional(JobReference),
      prestoJob: Schema.optional(PrestoJob),
      yarnApplications: Schema.optional(Schema.Array(YarnApplication)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      pigJob: Schema.optional(PigJob),
      driverControlFilesUri: Schema.optional(Schema.String),
      sparkJob: Schema.optional(SparkJob),
      driverSchedulingConfig: Schema.optional(DriverSchedulingConfig),
      hadoopJob: Schema.optional(HadoopJob),
      jobUuid: Schema.optional(Schema.String),
      sparkSqlJob: Schema.optional(SparkSqlJob),
      placement: Schema.optional(JobPlacement),
      scheduling: Schema.optional(JobScheduling),
      pysparkJob: Schema.optional(PySparkJob),
      hiveJob: Schema.optional(HiveJob),
      flinkJob: Schema.optional(FlinkJob),
    }),
  ).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface ListJobsResponse {
  /** Output only. Jobs list. */
  jobs?: Array<Job>;
  /** Optional. This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent ListJobsRequest. */
  nextPageToken?: string;
  /** Output only. List of jobs with kms_key-encrypted parameters that could not be decrypted. A response to a jobs.get request may indicate the reason for the decryption failure for a specific job. */
  unreachable?: Array<string>;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobs: Schema.optional(Schema.Array(Job)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListJobsResponse",
  }) as any as Schema.Schema<ListJobsResponse>;

export interface AccessSparkApplicationEnvironmentInfoResponse {
  /** Details about the Environment that the application is running in. */
  applicationEnvironmentInfo?: ApplicationEnvironmentInfo;
}

export const AccessSparkApplicationEnvironmentInfoResponse: Schema.Schema<AccessSparkApplicationEnvironmentInfoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicationEnvironmentInfo: Schema.optional(ApplicationEnvironmentInfo),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationEnvironmentInfoResponse",
  }) as any as Schema.Schema<AccessSparkApplicationEnvironmentInfoResponse>;

export interface AuthenticationConfig {
  /** Optional. Authentication type for the user workload running in containers. */
  userWorkloadAuthenticationType?:
    | "AUTHENTICATION_TYPE_UNSPECIFIED"
    | "SERVICE_ACCOUNT"
    | "END_USER_CREDENTIALS"
    | (string & {});
}

export const AuthenticationConfig: Schema.Schema<AuthenticationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userWorkloadAuthenticationType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthenticationConfig",
  }) as any as Schema.Schema<AuthenticationConfig>;

export interface SearchSparkApplicationStageAttemptsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent ListSparkApplicationStageAttemptsRequest. */
  nextPageToken?: string;
  /** Output only. Data corresponding to a stage attempts */
  sparkApplicationStageAttempts?: Array<StageData>;
}

export const SearchSparkApplicationStageAttemptsResponse: Schema.Schema<SearchSparkApplicationStageAttemptsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationStageAttempts: Schema.optional(Schema.Array(StageData)),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationStageAttemptsResponse",
  }) as any as Schema.Schema<SearchSparkApplicationStageAttemptsResponse>;

export interface SparkStandaloneAutoscalingConfig {
  /** Optional. Minimum scale-up threshold as a fraction of total cluster size before scaling occurs. For example, in a 20-worker cluster, a threshold of 0.1 means the autoscaler must recommend at least a 2-worker scale-up for the cluster to scale. A threshold of 0 means the autoscaler will scale up on any recommended change.Bounds: 0.0, 1.0. Default: 0.0. */
  scaleUpMinWorkerFraction?: number;
  /** Optional. Remove only idle workers when scaling down cluster */
  removeOnlyIdleWorkers?: boolean;
  /** Required. Fraction of required executors to remove from Spark Serverless clusters. A scale-down factor of 1.0 will result in scaling down so that there are no more executors for the Spark Job.(more aggressive scaling). A scale-down factor closer to 0 will result in a smaller magnitude of scaling donw (less aggressive scaling).Bounds: 0.0, 1.0. */
  scaleDownFactor?: number;
  /** Optional. Minimum scale-down threshold as a fraction of total cluster size before scaling occurs. For example, in a 20-worker cluster, a threshold of 0.1 means the autoscaler must recommend at least a 2 worker scale-down for the cluster to scale. A threshold of 0 means the autoscaler will scale down on any recommended change.Bounds: 0.0, 1.0. Default: 0.0. */
  scaleDownMinWorkerFraction?: number;
  /** Required. Fraction of required workers to add to Spark Standalone clusters. A scale-up factor of 1.0 will result in scaling up so that there are no more required workers for the Spark Job (more aggressive scaling). A scale-up factor closer to 0 will result in a smaller magnitude of scaling up (less aggressive scaling).Bounds: 0.0, 1.0. */
  scaleUpFactor?: number;
  /** Required. Timeout for Spark graceful decommissioning of spark workers. Specifies the duration to wait for spark worker to complete spark decommissioning tasks before forcefully removing workers. Only applicable to downscaling operations.Bounds: 0s, 1d. */
  gracefulDecommissionTimeout?: string;
}

export const SparkStandaloneAutoscalingConfig: Schema.Schema<SparkStandaloneAutoscalingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scaleUpMinWorkerFraction: Schema.optional(Schema.Number),
      removeOnlyIdleWorkers: Schema.optional(Schema.Boolean),
      scaleDownFactor: Schema.optional(Schema.Number),
      scaleDownMinWorkerFraction: Schema.optional(Schema.Number),
      scaleUpFactor: Schema.optional(Schema.Number),
      gracefulDecommissionTimeout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkStandaloneAutoscalingConfig",
  }) as any as Schema.Schema<SparkStandaloneAutoscalingConfig>;

export interface BasicYarnAutoscalingConfig {
  /** Required. Fraction of average YARN pending memory in the last cooldown period for which to add workers. A scale-up factor of 1.0 will result in scaling up so that there is no pending memory remaining after the update (more aggressive scaling). A scale-up factor closer to 0 will result in a smaller magnitude of scaling up (less aggressive scaling). See How autoscaling works (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/autoscaling#how_autoscaling_works) for more information.Bounds: 0.0, 1.0. */
  scaleUpFactor?: number;
  /** Optional. Minimum scale-up threshold as a fraction of total cluster size before scaling occurs. For example, in a 20-worker cluster, a threshold of 0.1 means the autoscaler must recommend at least a 2-worker scale-up for the cluster to scale. A threshold of 0 means the autoscaler will scale up on any recommended change.Bounds: 0.0, 1.0. Default: 0.0. */
  scaleUpMinWorkerFraction?: number;
  /** Required. Fraction of average YARN pending memory in the last cooldown period for which to remove workers. A scale-down factor of 1 will result in scaling down so that there is no available memory remaining after the update (more aggressive scaling). A scale-down factor of 0 disables removing workers, which can be beneficial for autoscaling a single job. See How autoscaling works (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/autoscaling#how_autoscaling_works) for more information.Bounds: 0.0, 1.0. */
  scaleDownFactor?: number;
  /** Required. Timeout for YARN graceful decommissioning of Node Managers. Specifies the duration to wait for jobs to complete before forcefully removing workers (and potentially interrupting jobs). Only applicable to downscaling operations.Bounds: 0s, 1d. */
  gracefulDecommissionTimeout?: string;
  /** Optional. Minimum scale-down threshold as a fraction of total cluster size before scaling occurs. For example, in a 20-worker cluster, a threshold of 0.1 means the autoscaler must recommend at least a 2 worker scale-down for the cluster to scale. A threshold of 0 means the autoscaler will scale down on any recommended change.Bounds: 0.0, 1.0. Default: 0.0. */
  scaleDownMinWorkerFraction?: number;
}

export const BasicYarnAutoscalingConfig: Schema.Schema<BasicYarnAutoscalingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scaleUpFactor: Schema.optional(Schema.Number),
      scaleUpMinWorkerFraction: Schema.optional(Schema.Number),
      scaleDownFactor: Schema.optional(Schema.Number),
      gracefulDecommissionTimeout: Schema.optional(Schema.String),
      scaleDownMinWorkerFraction: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BasicYarnAutoscalingConfig",
  }) as any as Schema.Schema<BasicYarnAutoscalingConfig>;

export interface BasicAutoscalingAlgorithm {
  /** Optional. Spark Standalone autoscaling configuration */
  sparkStandaloneConfig?: SparkStandaloneAutoscalingConfig;
  /** Optional. YARN autoscaling configuration. */
  yarnConfig?: BasicYarnAutoscalingConfig;
  /** Optional. Duration between scaling events. A scaling period starts after the update operation from the previous event has completed.Bounds: 2m, 1d. Default: 2m. */
  cooldownPeriod?: string;
}

export const BasicAutoscalingAlgorithm: Schema.Schema<BasicAutoscalingAlgorithm> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkStandaloneConfig: Schema.optional(SparkStandaloneAutoscalingConfig),
      yarnConfig: Schema.optional(BasicYarnAutoscalingConfig),
      cooldownPeriod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BasicAutoscalingAlgorithm",
  }) as any as Schema.Schema<BasicAutoscalingAlgorithm>;

export interface SparkPlanGraphEdge {
  fromId?: string;
  toId?: string;
}

export const SparkPlanGraphEdge: Schema.Schema<SparkPlanGraphEdge> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fromId: Schema.optional(Schema.String),
      toId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkPlanGraphEdge",
  }) as any as Schema.Schema<SparkPlanGraphEdge>;

export interface SparkPlanGraph {
  executionId?: string;
  nodes?: Array<SparkPlanGraphNodeWrapper>;
  edges?: Array<SparkPlanGraphEdge>;
}

export const SparkPlanGraph: Schema.Schema<SparkPlanGraph> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executionId: Schema.optional(Schema.String),
      nodes: Schema.optional(Schema.Array(SparkPlanGraphNodeWrapper)),
      edges: Schema.optional(Schema.Array(SparkPlanGraphEdge)),
    }),
  ).annotate({
    identifier: "SparkPlanGraph",
  }) as any as Schema.Schema<SparkPlanGraph>;

export interface ExecutorSummary {
  executorLogs?: Record<string, string>;
  totalGcTimeMillis?: string;
  memoryUsed?: string;
  addTime?: string;
  hostPort?: string;
  removeReason?: string;
  failedTasks?: number;
  executorId?: string;
  removeTime?: string;
  resources?: Record<string, ResourceInformation>;
  resourceProfileId?: number;
  attributes?: Record<string, string>;
  maxTasks?: number;
  totalDurationMillis?: string;
  excludedInStages?: Array<string>;
  totalInputBytes?: string;
  totalShuffleRead?: string;
  maxMemory?: string;
  peakMemoryMetrics?: ExecutorMetrics;
  totalTasks?: number;
  isActive?: boolean;
  activeTasks?: number;
  completedTasks?: number;
  diskUsed?: string;
  isExcluded?: boolean;
  totalShuffleWrite?: string;
  memoryMetrics?: MemoryMetrics;
  rddBlocks?: number;
  totalCores?: number;
}

export const ExecutorSummary: Schema.Schema<ExecutorSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executorLogs: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      totalGcTimeMillis: Schema.optional(Schema.String),
      memoryUsed: Schema.optional(Schema.String),
      addTime: Schema.optional(Schema.String),
      hostPort: Schema.optional(Schema.String),
      removeReason: Schema.optional(Schema.String),
      failedTasks: Schema.optional(Schema.Number),
      executorId: Schema.optional(Schema.String),
      removeTime: Schema.optional(Schema.String),
      resources: Schema.optional(
        Schema.Record(Schema.String, ResourceInformation),
      ),
      resourceProfileId: Schema.optional(Schema.Number),
      attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      maxTasks: Schema.optional(Schema.Number),
      totalDurationMillis: Schema.optional(Schema.String),
      excludedInStages: Schema.optional(Schema.Array(Schema.String)),
      totalInputBytes: Schema.optional(Schema.String),
      totalShuffleRead: Schema.optional(Schema.String),
      maxMemory: Schema.optional(Schema.String),
      peakMemoryMetrics: Schema.optional(ExecutorMetrics),
      totalTasks: Schema.optional(Schema.Number),
      isActive: Schema.optional(Schema.Boolean),
      activeTasks: Schema.optional(Schema.Number),
      completedTasks: Schema.optional(Schema.Number),
      diskUsed: Schema.optional(Schema.String),
      isExcluded: Schema.optional(Schema.Boolean),
      totalShuffleWrite: Schema.optional(Schema.String),
      memoryMetrics: Schema.optional(MemoryMetrics),
      rddBlocks: Schema.optional(Schema.Number),
      totalCores: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ExecutorSummary",
  }) as any as Schema.Schema<ExecutorSummary>;

export interface NativeSqlExecutionUiData {
  /** Optional. Fallback node to reason. */
  fallbackNodeToReason?: Array<FallbackReason>;
  /** Optional. Number of nodes in Native. */
  numNativeNodes?: number;
  /** Optional. Description of the execution. */
  description?: string;
  /** Optional. Number of nodes fallen back to Spark. */
  numFallbackNodes?: number;
  /** Optional. Description of the fallback. */
  fallbackDescription?: string;
  /** Required. Execution ID of the Native SQL Execution. */
  executionId?: string;
}

export const NativeSqlExecutionUiData: Schema.Schema<NativeSqlExecutionUiData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fallbackNodeToReason: Schema.optional(Schema.Array(FallbackReason)),
      numNativeNodes: Schema.optional(Schema.Number),
      description: Schema.optional(Schema.String),
      numFallbackNodes: Schema.optional(Schema.Number),
      fallbackDescription: Schema.optional(Schema.String),
      executionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NativeSqlExecutionUiData",
  }) as any as Schema.Schema<NativeSqlExecutionUiData>;

export interface RddStorageInfo {
  partitions?: Array<RddPartitionInfo>;
  dataDistribution?: Array<RddDataDistribution>;
  name?: string;
  storageLevel?: string;
  memoryUsed?: string;
  diskUsed?: string;
  numCachedPartitions?: number;
  numPartitions?: number;
  rddStorageId?: number;
}

export const RddStorageInfo: Schema.Schema<RddStorageInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partitions: Schema.optional(Schema.Array(RddPartitionInfo)),
      dataDistribution: Schema.optional(Schema.Array(RddDataDistribution)),
      name: Schema.optional(Schema.String),
      storageLevel: Schema.optional(Schema.String),
      memoryUsed: Schema.optional(Schema.String),
      diskUsed: Schema.optional(Schema.String),
      numCachedPartitions: Schema.optional(Schema.Number),
      numPartitions: Schema.optional(Schema.Number),
      rddStorageId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "RddStorageInfo",
  }) as any as Schema.Schema<RddStorageInfo>;

export interface AppSummary {
  numCompletedStages?: number;
  numCompletedJobs?: number;
}

export const AppSummary: Schema.Schema<AppSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      numCompletedStages: Schema.optional(Schema.Number),
      numCompletedJobs: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "AppSummary" }) as any as Schema.Schema<AppSummary>;

export interface PoolData {
  name?: string;
  stageIds?: Array<string>;
}

export const PoolData: Schema.Schema<PoolData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      stageIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "PoolData" }) as any as Schema.Schema<PoolData>;

export interface SparkConnectSessionInfo {
  /** User ID of the user who started the session. */
  userId?: string;
  /** Optional. Total number of executions in the session. */
  totalExecution?: string;
  /** Timestamp when the session started. */
  startTimestamp?: string;
  /** Timestamp when the session finished. */
  finishTimestamp?: string;
  /** Required. Session ID of the session. */
  sessionId?: string;
}

export const SparkConnectSessionInfo: Schema.Schema<SparkConnectSessionInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userId: Schema.optional(Schema.String),
      totalExecution: Schema.optional(Schema.String),
      startTimestamp: Schema.optional(Schema.String),
      finishTimestamp: Schema.optional(Schema.String),
      sessionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkConnectSessionInfo",
  }) as any as Schema.Schema<SparkConnectSessionInfo>;

export interface StreamingQueryData {
  name?: string;
  exception?: string;
  streamingQueryId?: string;
  endTimestamp?: string;
  isActive?: boolean;
  runId?: string;
  startTimestamp?: string;
}

export const StreamingQueryData: Schema.Schema<StreamingQueryData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      exception: Schema.optional(Schema.String),
      streamingQueryId: Schema.optional(Schema.String),
      endTimestamp: Schema.optional(Schema.String),
      isActive: Schema.optional(Schema.Boolean),
      runId: Schema.optional(Schema.String),
      startTimestamp: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StreamingQueryData",
  }) as any as Schema.Schema<StreamingQueryData>;

export interface BuildInfo {
  /** Optional. Build key. */
  buildKey?: string;
  /** Optional. Build value. */
  buildValue?: string;
}

export const BuildInfo: Schema.Schema<BuildInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buildKey: Schema.optional(Schema.String),
      buildValue: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "BuildInfo" }) as any as Schema.Schema<BuildInfo>;

export interface NativeBuildInfoUiData {
  /** Optional. Build related details. */
  buildInfo?: Array<BuildInfo>;
  /** Optional. Build class of Native. */
  buildClass?: string;
}

export const NativeBuildInfoUiData: Schema.Schema<NativeBuildInfoUiData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buildInfo: Schema.optional(Schema.Array(BuildInfo)),
      buildClass: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NativeBuildInfoUiData",
  }) as any as Schema.Schema<NativeBuildInfoUiData>;

export interface SqlExecutionUiData {
  stages?: Array<string>;
  submissionTime?: string;
  metricValues?: Record<string, string>;
  metrics?: Array<SqlPlanMetric>;
  modifiedConfigs?: Record<string, string>;
  errorMessage?: string;
  physicalPlanDescription?: string;
  rootExecutionId?: string;
  details?: string;
  jobs?: Record<
    string,
    | "JOB_EXECUTION_STATUS_UNSPECIFIED"
    | "JOB_EXECUTION_STATUS_RUNNING"
    | "JOB_EXECUTION_STATUS_SUCCEEDED"
    | "JOB_EXECUTION_STATUS_FAILED"
    | "JOB_EXECUTION_STATUS_UNKNOWN"
    | (string & {})
  >;
  metricValuesIsNull?: boolean;
  executionId?: string;
  description?: string;
  completionTime?: string;
}

export const SqlExecutionUiData: Schema.Schema<SqlExecutionUiData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stages: Schema.optional(Schema.Array(Schema.String)),
      submissionTime: Schema.optional(Schema.String),
      metricValues: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      metrics: Schema.optional(Schema.Array(SqlPlanMetric)),
      modifiedConfigs: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      errorMessage: Schema.optional(Schema.String),
      physicalPlanDescription: Schema.optional(Schema.String),
      rootExecutionId: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
      jobs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      metricValuesIsNull: Schema.optional(Schema.Boolean),
      executionId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      completionTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SqlExecutionUiData",
  }) as any as Schema.Schema<SqlExecutionUiData>;

export interface StreamBlockData {
  useMemory?: boolean;
  executorId?: string;
  storageLevel?: string;
  deserialized?: boolean;
  memSize?: string;
  name?: string;
  useDisk?: boolean;
  hostPort?: string;
  diskSize?: string;
}

export const StreamBlockData: Schema.Schema<StreamBlockData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useMemory: Schema.optional(Schema.Boolean),
      executorId: Schema.optional(Schema.String),
      storageLevel: Schema.optional(Schema.String),
      deserialized: Schema.optional(Schema.Boolean),
      memSize: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      useDisk: Schema.optional(Schema.Boolean),
      hostPort: Schema.optional(Schema.String),
      diskSize: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StreamBlockData",
  }) as any as Schema.Schema<StreamBlockData>;

export interface StateOperatorProgress {
  customMetrics?: Record<string, string>;
  operatorName?: string;
  numRowsDroppedByWatermark?: string;
  numRowsUpdated?: string;
  allUpdatesTimeMs?: string;
  numRowsTotal?: string;
  numRowsRemoved?: string;
  memoryUsedBytes?: string;
  numStateStoreInstances?: string;
  allRemovalsTimeMs?: string;
  commitTimeMs?: string;
  numShufflePartitions?: string;
}

export const StateOperatorProgress: Schema.Schema<StateOperatorProgress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customMetrics: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      operatorName: Schema.optional(Schema.String),
      numRowsDroppedByWatermark: Schema.optional(Schema.String),
      numRowsUpdated: Schema.optional(Schema.String),
      allUpdatesTimeMs: Schema.optional(Schema.String),
      numRowsTotal: Schema.optional(Schema.String),
      numRowsRemoved: Schema.optional(Schema.String),
      memoryUsedBytes: Schema.optional(Schema.String),
      numStateStoreInstances: Schema.optional(Schema.String),
      allRemovalsTimeMs: Schema.optional(Schema.String),
      commitTimeMs: Schema.optional(Schema.String),
      numShufflePartitions: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StateOperatorProgress",
  }) as any as Schema.Schema<StateOperatorProgress>;

export interface SinkProgress {
  description?: string;
  metrics?: Record<string, string>;
  numOutputRows?: string;
}

export const SinkProgress: Schema.Schema<SinkProgress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      numOutputRows: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SinkProgress",
  }) as any as Schema.Schema<SinkProgress>;

export interface StreamingQueryProgress {
  durationMillis?: Record<string, string>;
  stateOperators?: Array<StateOperatorProgress>;
  sink?: SinkProgress;
  batchId?: string;
  timestamp?: string;
  runId?: string;
  sources?: Array<SourceProgress>;
  observedMetrics?: Record<string, string>;
  eventTime?: Record<string, string>;
  batchDuration?: string;
  streamingQueryProgressId?: string;
  name?: string;
}

export const StreamingQueryProgress: Schema.Schema<StreamingQueryProgress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      durationMillis: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      stateOperators: Schema.optional(Schema.Array(StateOperatorProgress)),
      sink: Schema.optional(SinkProgress),
      batchId: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      runId: Schema.optional(Schema.String),
      sources: Schema.optional(Schema.Array(SourceProgress)),
      observedMetrics: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      eventTime: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      batchDuration: Schema.optional(Schema.String),
      streamingQueryProgressId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StreamingQueryProgress",
  }) as any as Schema.Schema<StreamingQueryProgress>;

export interface RddOperationEdge {
  toId?: number;
  fromId?: number;
}

export const RddOperationEdge: Schema.Schema<RddOperationEdge> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      toId: Schema.optional(Schema.Number),
      fromId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "RddOperationEdge",
  }) as any as Schema.Schema<RddOperationEdge>;

export interface RddOperationNode {
  callsite?: string;
  name?: string;
  cached?: boolean;
  nodeId?: number;
  outputDeterministicLevel?:
    | "DETERMINISTIC_LEVEL_UNSPECIFIED"
    | "DETERMINISTIC_LEVEL_DETERMINATE"
    | "DETERMINISTIC_LEVEL_UNORDERED"
    | "DETERMINISTIC_LEVEL_INDETERMINATE"
    | (string & {});
  barrier?: boolean;
}

export const RddOperationNode: Schema.Schema<RddOperationNode> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      callsite: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      cached: Schema.optional(Schema.Boolean),
      nodeId: Schema.optional(Schema.Number),
      outputDeterministicLevel: Schema.optional(Schema.String),
      barrier: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RddOperationNode",
  }) as any as Schema.Schema<RddOperationNode>;

export interface RddOperationCluster {
  rddClusterId?: string;
  childNodes?: Array<RddOperationNode>;
  name?: string;
  childClusters?: Array<RddOperationCluster>;
}

export const RddOperationCluster: Schema.Schema<RddOperationCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rddClusterId: Schema.optional(Schema.String),
      childNodes: Schema.optional(Schema.Array(RddOperationNode)),
      name: Schema.optional(Schema.String),
      childClusters: Schema.optional(Schema.Array(RddOperationCluster)),
    }),
  ).annotate({
    identifier: "RddOperationCluster",
  }) as any as Schema.Schema<RddOperationCluster>;

export interface RddOperationGraph {
  stageId?: string;
  outgoingEdges?: Array<RddOperationEdge>;
  incomingEdges?: Array<RddOperationEdge>;
  edges?: Array<RddOperationEdge>;
  rootCluster?: RddOperationCluster;
}

export const RddOperationGraph: Schema.Schema<RddOperationGraph> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stageId: Schema.optional(Schema.String),
      outgoingEdges: Schema.optional(Schema.Array(RddOperationEdge)),
      incomingEdges: Schema.optional(Schema.Array(RddOperationEdge)),
      edges: Schema.optional(Schema.Array(RddOperationEdge)),
      rootCluster: Schema.optional(RddOperationCluster),
    }),
  ).annotate({
    identifier: "RddOperationGraph",
  }) as any as Schema.Schema<RddOperationGraph>;

export interface ProcessSummary {
  isActive?: boolean;
  processId?: string;
  hostPort?: string;
  removeTime?: string;
  totalCores?: number;
  addTime?: string;
  processLogs?: Record<string, string>;
}

export const ProcessSummary: Schema.Schema<ProcessSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isActive: Schema.optional(Schema.Boolean),
      processId: Schema.optional(Schema.String),
      hostPort: Schema.optional(Schema.String),
      removeTime: Schema.optional(Schema.String),
      totalCores: Schema.optional(Schema.Number),
      addTime: Schema.optional(Schema.String),
      processLogs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ProcessSummary",
  }) as any as Schema.Schema<ProcessSummary>;

export interface SparkWrapperObject {
  sparkPlanGraph?: SparkPlanGraph;
  /** Application Id created by Spark. */
  applicationId?: string;
  executorSummary?: ExecutorSummary;
  /** Native SQL Execution Info */
  nativeSqlExecutionUiData?: NativeSqlExecutionUiData;
  jobData?: JobData;
  rddStorageInfo?: RddStorageInfo;
  appSummary?: AppSummary;
  applicationEnvironmentInfo?: ApplicationEnvironmentInfo;
  resourceProfileInfo?: ResourceProfileInfo;
  /** VM Timestamp associated with the data object. */
  eventTimestamp?: string;
  applicationInfo?: ApplicationInfo;
  poolData?: PoolData;
  executorStageSummary?: ExecutorStageSummary;
  /** Spark Connect Session Info */
  sparkConnectSessionInfo?: SparkConnectSessionInfo;
  stageData?: StageData;
  /** Spark Connect Execution Info */
  sparkConnectExecutionInfo?: SparkConnectExecutionInfo;
  streamingQueryData?: StreamingQueryData;
  /** Native Build Info */
  nativeBuildInfoUiData?: NativeBuildInfoUiData;
  sqlExecutionUiData?: SqlExecutionUiData;
  streamBlockData?: StreamBlockData;
  streamingQueryProgress?: StreamingQueryProgress;
  taskData?: TaskData;
  speculationStageSummary?: SpeculationStageSummary;
  rddOperationGraph?: RddOperationGraph;
  processSummary?: ProcessSummary;
}

export const SparkWrapperObject: Schema.Schema<SparkWrapperObject> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkPlanGraph: Schema.optional(SparkPlanGraph),
      applicationId: Schema.optional(Schema.String),
      executorSummary: Schema.optional(ExecutorSummary),
      nativeSqlExecutionUiData: Schema.optional(NativeSqlExecutionUiData),
      jobData: Schema.optional(JobData),
      rddStorageInfo: Schema.optional(RddStorageInfo),
      appSummary: Schema.optional(AppSummary),
      applicationEnvironmentInfo: Schema.optional(ApplicationEnvironmentInfo),
      resourceProfileInfo: Schema.optional(ResourceProfileInfo),
      eventTimestamp: Schema.optional(Schema.String),
      applicationInfo: Schema.optional(ApplicationInfo),
      poolData: Schema.optional(PoolData),
      executorStageSummary: Schema.optional(ExecutorStageSummary),
      sparkConnectSessionInfo: Schema.optional(SparkConnectSessionInfo),
      stageData: Schema.optional(StageData),
      sparkConnectExecutionInfo: Schema.optional(SparkConnectExecutionInfo),
      streamingQueryData: Schema.optional(StreamingQueryData),
      nativeBuildInfoUiData: Schema.optional(NativeBuildInfoUiData),
      sqlExecutionUiData: Schema.optional(SqlExecutionUiData),
      streamBlockData: Schema.optional(StreamBlockData),
      streamingQueryProgress: Schema.optional(StreamingQueryProgress),
      taskData: Schema.optional(TaskData),
      speculationStageSummary: Schema.optional(SpeculationStageSummary),
      rddOperationGraph: Schema.optional(RddOperationGraph),
      processSummary: Schema.optional(ProcessSummary),
    }),
  ).annotate({
    identifier: "SparkWrapperObject",
  }) as any as Schema.Schema<SparkWrapperObject>;

export interface JupyterConfig {
  /** Optional. Display name, shown in the Jupyter kernelspec card. */
  displayName?: string;
  /** Optional. Kernel */
  kernel?: "KERNEL_UNSPECIFIED" | "PYTHON" | "SCALA" | (string & {});
}

export const JupyterConfig: Schema.Schema<JupyterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      kernel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "JupyterConfig",
  }) as any as Schema.Schema<JupyterConfig>;

export interface InjectCredentialsRequest {
  /** Required. The cluster UUID. */
  clusterUuid?: string;
  /** Required. The encrypted credentials being injected in to the cluster.The client is responsible for encrypting the credentials in a way that is supported by the cluster.A wrapped value is used here so that the actual contents of the encrypted credentials are not written to audit logs. */
  credentialsCiphertext?: string;
}

export const InjectCredentialsRequest: Schema.Schema<InjectCredentialsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterUuid: Schema.optional(Schema.String),
      credentialsCiphertext: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InjectCredentialsRequest",
  }) as any as Schema.Schema<InjectCredentialsRequest>;

export interface SearchSparkApplicationJobsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSparkApplicationJobsRequest. */
  nextPageToken?: string;
  /** Output only. Data corresponding to a spark job. */
  sparkApplicationJobs?: Array<JobData>;
}

export const SearchSparkApplicationJobsResponse: Schema.Schema<SearchSparkApplicationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationJobs: Schema.optional(Schema.Array(JobData)),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationJobsResponse",
  }) as any as Schema.Schema<SearchSparkApplicationJobsResponse>;

export interface WorkflowNode {
  /** Output only. The error detail. */
  error?: string;
  /** Output only. The job id; populated after the node enters RUNNING state. */
  jobId?: string;
  /** Output only. The node state. */
  state?:
    | "NODE_STATE_UNSPECIFIED"
    | "BLOCKED"
    | "RUNNABLE"
    | "RUNNING"
    | "COMPLETED"
    | "FAILED"
    | (string & {});
  /** Output only. Node's prerequisite nodes. */
  prerequisiteStepIds?: Array<string>;
  /** Output only. The name of the node. */
  stepId?: string;
}

export const WorkflowNode: Schema.Schema<WorkflowNode> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Schema.String),
      jobId: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      prerequisiteStepIds: Schema.optional(Schema.Array(Schema.String)),
      stepId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkflowNode",
  }) as any as Schema.Schema<WorkflowNode>;

export interface WorkflowGraph {
  /** Output only. The workflow nodes. */
  nodes?: Array<WorkflowNode>;
}

export const WorkflowGraph: Schema.Schema<WorkflowGraph> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nodes: Schema.optional(Schema.Array(WorkflowNode)),
    }),
  ).annotate({
    identifier: "WorkflowGraph",
  }) as any as Schema.Schema<WorkflowGraph>;

export interface ClusterToRepair {
  /** Required. Repair action to take on the cluster resource. */
  clusterRepairAction?:
    | "CLUSTER_REPAIR_ACTION_UNSPECIFIED"
    | "REPAIR_ERROR_DUE_TO_UPDATE_CLUSTER"
    | (string & {});
}

export const ClusterToRepair: Schema.Schema<ClusterToRepair> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterRepairAction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterToRepair",
  }) as any as Schema.Schema<ClusterToRepair>;

export interface NodePool {
  /** Required. A unique id of the node pool. Primary and Secondary workers can be specified using special reserved ids PRIMARY_WORKER_POOL and SECONDARY_WORKER_POOL respectively. Aux node pools can be referenced using corresponding pool id. */
  id?: string;
  /** Name of instances to be repaired. These instances must belong to specified node pool. */
  instanceNames?: Array<string>;
  /** Required. Repair action to take on specified resources of the node pool. */
  repairAction?: "REPAIR_ACTION_UNSPECIFIED" | "DELETE" | (string & {});
}

export const NodePool: Schema.Schema<NodePool> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      instanceNames: Schema.optional(Schema.Array(Schema.String)),
      repairAction: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "NodePool" }) as any as Schema.Schema<NodePool>;

export interface RepairClusterRequest {
  /** Optional. operation id of the parent operation sending the repair request */
  parentOperationId?: string;
  /** Optional. Specifying the cluster_uuid means the RPC will fail (with error NOT_FOUND) if a cluster with the specified UUID does not exist. */
  clusterUuid?: string;
  /** Optional. Cluster to be repaired */
  cluster?: ClusterToRepair;
  /** Optional. Timeout for graceful YARN decommissioning. Graceful decommissioning facilitates the removal of cluster nodes without interrupting jobs in progress. The timeout specifies the amount of time to wait for jobs finish before forcefully removing nodes. The default timeout is 0 for forceful decommissioning, and the maximum timeout period is 1 day. (see JSON Mapping—Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).graceful_decommission_timeout is supported in Dataproc image versions 1.2+. */
  gracefulDecommissionTimeout?: string;
  /** Optional. Node pools and corresponding repair action to be taken. All node pools should be unique in this request. i.e. Multiple entries for the same node pool id are not allowed. */
  nodePools?: Array<NodePool>;
  /** Optional. Whether the request is submitted by Dataproc super user. If true, IAM will check 'dataproc.clusters.repair' permission instead of 'dataproc.clusters.update' permission. This is to give Dataproc superuser the ability to repair clusters without granting the overly broad update permission. */
  dataprocSuperUser?: boolean;
  /** Optional. A unique ID used to identify the request. If the server receives two RepairClusterRequests with the same ID, the second request is ignored, and the first google.longrunning.Operation created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const RepairClusterRequest: Schema.Schema<RepairClusterRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parentOperationId: Schema.optional(Schema.String),
      clusterUuid: Schema.optional(Schema.String),
      cluster: Schema.optional(ClusterToRepair),
      gracefulDecommissionTimeout: Schema.optional(Schema.String),
      nodePools: Schema.optional(Schema.Array(NodePool)),
      dataprocSuperUser: Schema.optional(Schema.Boolean),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RepairClusterRequest",
  }) as any as Schema.Schema<RepairClusterRequest>;

export interface SearchSessionSparkApplicationStagesResponse {
  /** Output only. Data corresponding to a stage. */
  sparkApplicationStages?: Array<StageData>;
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationStages. */
  nextPageToken?: string;
}

export const SearchSessionSparkApplicationStagesResponse: Schema.Schema<SearchSessionSparkApplicationStagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkApplicationStages: Schema.optional(Schema.Array(StageData)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationStagesResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationStagesResponse>;

export interface SearchSparkApplicationExecutorsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSparkApplicationExecutorsListRequest. */
  nextPageToken?: string;
  /** Details about executors used by the application. */
  sparkApplicationExecutors?: Array<ExecutorSummary>;
}

export const SearchSparkApplicationExecutorsResponse: Schema.Schema<SearchSparkApplicationExecutorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationExecutors: Schema.optional(Schema.Array(ExecutorSummary)),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationExecutorsResponse",
  }) as any as Schema.Schema<SearchSparkApplicationExecutorsResponse>;

export interface SparkRBatch {
  /** Required. The HCFS URI of the main R file to use as the driver. Must be a .R or .r file. */
  mainRFileUri?: string;
  /** Optional. The arguments to pass to the Spark driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission. */
  args?: Array<string>;
  /** Optional. HCFS URIs of files to be placed in the working directory of each executor. */
  fileUris?: Array<string>;
  /** Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
}

export const SparkRBatch: Schema.Schema<SparkRBatch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mainRFileUri: Schema.optional(Schema.String),
      args: Schema.optional(Schema.Array(Schema.String)),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SparkRBatch",
  }) as any as Schema.Schema<SparkRBatch>;

export interface SearchSparkApplicationStagesResponse {
  /** Output only. Data corresponding to a stage. */
  sparkApplicationStages?: Array<StageData>;
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSparkApplicationStages. */
  nextPageToken?: string;
}

export const SearchSparkApplicationStagesResponse: Schema.Schema<SearchSparkApplicationStagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkApplicationStages: Schema.optional(Schema.Array(StageData)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationStagesResponse",
  }) as any as Schema.Schema<SearchSparkApplicationStagesResponse>;

export interface RepositoryConfig {
  /** Optional. Configuration for PyPi repository. */
  pypiRepositoryConfig?: PyPiRepositoryConfig;
}

export const RepositoryConfig: Schema.Schema<RepositoryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pypiRepositoryConfig: Schema.optional(PyPiRepositoryConfig),
    }),
  ).annotate({
    identifier: "RepositoryConfig",
  }) as any as Schema.Schema<RepositoryConfig>;

export interface AccessSessionSparkApplicationStageAttemptResponse {
  /** Output only. Data corresponding to a stage. */
  stageData?: StageData;
}

export const AccessSessionSparkApplicationStageAttemptResponse: Schema.Schema<AccessSessionSparkApplicationStageAttemptResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stageData: Schema.optional(StageData),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationStageAttemptResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationStageAttemptResponse>;

export interface SearchSessionSparkApplicationSqlQueriesResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationSqlQueriesRequest. */
  nextPageToken?: string;
  /** Output only. SQL Execution Data */
  sparkApplicationSqlQueries?: Array<SqlExecutionUiData>;
}

export const SearchSessionSparkApplicationSqlQueriesResponse: Schema.Schema<SearchSessionSparkApplicationSqlQueriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationSqlQueries: Schema.optional(
        Schema.Array(SqlExecutionUiData),
      ),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationSqlQueriesResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationSqlQueriesResponse>;

export interface AccessSparkApplicationStageRddOperationGraphResponse {
  /** RDD operation graph for a Spark Application Stage. */
  rddOperationGraph?: RddOperationGraph;
}

export const AccessSparkApplicationStageRddOperationGraphResponse: Schema.Schema<AccessSparkApplicationStageRddOperationGraphResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rddOperationGraph: Schema.optional(RddOperationGraph),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationStageRddOperationGraphResponse",
  }) as any as Schema.Schema<AccessSparkApplicationStageRddOperationGraphResponse>;

export interface ClusterOperationStatus {
  /** Output only. A message containing any operation metadata details. */
  details?: string;
  /** Output only. The time this state was entered. */
  stateStartTime?: string;
  /** Output only. A message containing the operation state. */
  state?: "UNKNOWN" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  /** Output only. A message containing the detailed operation state. */
  innerState?: string;
}

export const ClusterOperationStatus: Schema.Schema<ClusterOperationStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.String),
      stateStartTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      innerState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterOperationStatus",
  }) as any as Schema.Schema<ClusterOperationStatus>;

export interface SparkConnectConfig {}

export const SparkConnectConfig: Schema.Schema<SparkConnectConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SparkConnectConfig",
  }) as any as Schema.Schema<SparkConnectConfig>;

export interface AutotuningConfig {
  /** Optional. Scenarios for which tunings are applied. */
  scenarios?: Array<
    | "SCENARIO_UNSPECIFIED"
    | "SCALING"
    | "BROADCAST_HASH_JOIN"
    | "MEMORY"
    | "NONE"
    | "AUTO"
    | (string & {})
  >;
}

export const AutotuningConfig: Schema.Schema<AutotuningConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scenarios: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AutotuningConfig",
  }) as any as Schema.Schema<AutotuningConfig>;

export interface RuntimeConfig {
  /** Optional. Dependency repository configuration. */
  repositoryConfig?: RepositoryConfig;
  /** Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used. */
  containerImage?: string;
  /** Optional. Version of the batch runtime. */
  version?: string;
  /** Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs. */
  cohort?: string;
  /** Optional. Autotuning configuration of the workload. */
  autotuningConfig?: AutotuningConfig;
  /** Optional. A mapping of property names to values, which are used to configure workload execution. */
  properties?: Record<string, string>;
}

export const RuntimeConfig: Schema.Schema<RuntimeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repositoryConfig: Schema.optional(RepositoryConfig),
      containerImage: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      cohort: Schema.optional(Schema.String),
      autotuningConfig: Schema.optional(AutotuningConfig),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "RuntimeConfig",
  }) as any as Schema.Schema<RuntimeConfig>;

export interface PeripheralsConfig {
  /** Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id] */
  metastoreService?: string;
  /** Optional. The Spark History Server configuration for the workload. */
  sparkHistoryServerConfig?: SparkHistoryServerConfig;
}

export const PeripheralsConfig: Schema.Schema<PeripheralsConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metastoreService: Schema.optional(Schema.String),
      sparkHistoryServerConfig: Schema.optional(SparkHistoryServerConfig),
    }),
  ).annotate({
    identifier: "PeripheralsConfig",
  }) as any as Schema.Schema<PeripheralsConfig>;

export interface ExecutionConfig {
  /** Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first. */
  ttl?: string;
  /** Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket. */
  stagingBucket?: string;
  /** Optional. Network URI to connect workload to. */
  networkUri?: string;
  /** Optional. Subnetwork URI to connect workload to. */
  subnetworkUri?: string;
  /** Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first. */
  idleTtl?: string;
  /** Optional. The Cloud KMS key to use for encryption. */
  kmsKey?: string;
  /** Optional. Authentication configuration used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s). */
  authenticationConfig?: AuthenticationConfig;
  /** Optional. Service account that used to execute workload. */
  serviceAccount?: string;
  /** Optional. Tags used for network traffic control. */
  networkTags?: Array<string>;
}

export const ExecutionConfig: Schema.Schema<ExecutionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ttl: Schema.optional(Schema.String),
      stagingBucket: Schema.optional(Schema.String),
      networkUri: Schema.optional(Schema.String),
      subnetworkUri: Schema.optional(Schema.String),
      idleTtl: Schema.optional(Schema.String),
      kmsKey: Schema.optional(Schema.String),
      authenticationConfig: Schema.optional(AuthenticationConfig),
      serviceAccount: Schema.optional(Schema.String),
      networkTags: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ExecutionConfig",
  }) as any as Schema.Schema<ExecutionConfig>;

export interface EnvironmentConfig {
  /** Optional. Peripherals configuration that workload has access to. */
  peripheralsConfig?: PeripheralsConfig;
  /** Optional. Execution configuration for a workload. */
  executionConfig?: ExecutionConfig;
}

export const EnvironmentConfig: Schema.Schema<EnvironmentConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      peripheralsConfig: Schema.optional(PeripheralsConfig),
      executionConfig: Schema.optional(ExecutionConfig),
    }),
  ).annotate({
    identifier: "EnvironmentConfig",
  }) as any as Schema.Schema<EnvironmentConfig>;

export interface SessionTemplate {
  /** Optional. Spark connect session config. */
  sparkConnectSession?: SparkConnectConfig;
  /** Optional. Jupyter session config. */
  jupyterSession?: JupyterConfig;
  /** Output only. The time the template was last updated. */
  updateTime?: string;
  /** Optional. Brief description of the template. */
  description?: string;
  /** Output only. The time when the template was created. */
  createTime?: string;
  /** Output only. The email address of the user who created the template. */
  creator?: string;
  /** Optional. Runtime configuration for session execution. */
  runtimeConfig?: RuntimeConfig;
  /** Optional. Environment configuration for session execution. */
  environmentConfig?: EnvironmentConfig;
  /** Output only. A session template UUID (Unique Universal Identifier). The service generates this value when it creates the session template. */
  uuid?: string;
  /** Optional. Labels to associate with sessions created using this template. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty, but, if present, must contain 1 to 63 characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a session. */
  labels?: Record<string, string>;
  /** Required. Identifier. The resource name of the session template. */
  name?: string;
}

export const SessionTemplate: Schema.Schema<SessionTemplate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkConnectSession: Schema.optional(SparkConnectConfig),
      jupyterSession: Schema.optional(JupyterConfig),
      updateTime: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      creator: Schema.optional(Schema.String),
      runtimeConfig: Schema.optional(RuntimeConfig),
      environmentConfig: Schema.optional(EnvironmentConfig),
      uuid: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SessionTemplate",
  }) as any as Schema.Schema<SessionTemplate>;

export interface WriteSparkApplicationContextResponse {}

export const WriteSparkApplicationContextResponse: Schema.Schema<WriteSparkApplicationContextResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "WriteSparkApplicationContextResponse",
  }) as any as Schema.Schema<WriteSparkApplicationContextResponse>;

export interface UsageMetrics {
  /** Optional. Shuffle storage usage in (GB x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)). */
  shuffleStorageGbSeconds?: string;
  /** Optional. DCU (Dataproc Compute Units) usage in (milliDCU x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)). */
  milliDcuSeconds?: string;
  /** Optional. DEPRECATED Accelerator usage in (milliAccelerator x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)). */
  milliAcceleratorSeconds?: string;
  /** Optional. DEPRECATED Accelerator type being used, if any */
  acceleratorType?: string;
  /** Optional. The timestamp of the usage metrics. */
  updateTime?: string;
}

export const UsageMetrics: Schema.Schema<UsageMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shuffleStorageGbSeconds: Schema.optional(Schema.String),
      milliDcuSeconds: Schema.optional(Schema.String),
      milliAcceleratorSeconds: Schema.optional(Schema.String),
      acceleratorType: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UsageMetrics",
  }) as any as Schema.Schema<UsageMetrics>;

export interface InstanceGroupAutoscalingPolicyConfig {
  /** Required. Maximum number of instances for this group. Required for primary workers. Note that by default, clusters will not use secondary workers. Required for secondary workers if the minimum secondary instances is set.Primary workers - Bounds: [min_instances, ). Secondary workers - Bounds: [min_instances, ). Default: 0. */
  maxInstances?: number;
  /** Optional. Weight for the instance group, which is used to determine the fraction of total workers in the cluster from this instance group. For example, if primary workers have weight 2, and secondary workers have weight 1, the cluster will have approximately 2 primary workers for each secondary worker.The cluster may not reach the specified balance if constrained by min/max bounds or other autoscaling settings. For example, if max_instances for secondary workers is 0, then only primary workers will be added. The cluster can also be out of balance when created.If weight is not set on any instance group, the cluster will default to equal weight for all groups: the cluster will attempt to maintain an equal number of workers in each group within the configured size bounds for each group. If weight is set for one group only, the cluster will default to zero weight on the unset group. For example if weight is set only on primary workers, the cluster will use primary workers only and no secondary workers. */
  weight?: number;
  /** Optional. Minimum number of instances for this group.Primary workers - Bounds: 2, max_instances. Default: 2. Secondary workers - Bounds: 0, max_instances. Default: 0. */
  minInstances?: number;
}

export const InstanceGroupAutoscalingPolicyConfig: Schema.Schema<InstanceGroupAutoscalingPolicyConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxInstances: Schema.optional(Schema.Number),
      weight: Schema.optional(Schema.Number),
      minInstances: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "InstanceGroupAutoscalingPolicyConfig",
  }) as any as Schema.Schema<InstanceGroupAutoscalingPolicyConfig>;

export interface AutoscalingPolicy {
  /** Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name?: string;
  /** Required. The policy id.The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of between 3 and 50 characters. */
  id?: string;
  /** Required. Describes how the autoscaler will operate for primary workers. */
  workerConfig?: InstanceGroupAutoscalingPolicyConfig;
  /** Optional. The labels to associate with this autoscaling policy. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with an autoscaling policy. */
  labels?: Record<string, string>;
  basicAlgorithm?: BasicAutoscalingAlgorithm;
  /** Optional. Describes how the autoscaler will operate for secondary workers. */
  secondaryWorkerConfig?: InstanceGroupAutoscalingPolicyConfig;
  /** Optional. The type of the clusters for which this autoscaling policy is to be configured. */
  clusterType?:
    | "CLUSTER_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "ZERO_SCALE"
    | (string & {});
}

export const AutoscalingPolicy: Schema.Schema<AutoscalingPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      workerConfig: Schema.optional(InstanceGroupAutoscalingPolicyConfig),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      basicAlgorithm: Schema.optional(BasicAutoscalingAlgorithm),
      secondaryWorkerConfig: Schema.optional(
        InstanceGroupAutoscalingPolicyConfig,
      ),
      clusterType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AutoscalingPolicy",
  }) as any as Schema.Schema<AutoscalingPolicy>;

export interface SummarizeSessionSparkApplicationExecutorsResponse {
  /** Consolidated summary for active executors. */
  activeExecutorSummary?: ConsolidatedExecutorSummary;
  /** Spark Application Id */
  applicationId?: string;
  /** Overall consolidated summary for all executors. */
  totalExecutorSummary?: ConsolidatedExecutorSummary;
  /** Consolidated summary for dead executors. */
  deadExecutorSummary?: ConsolidatedExecutorSummary;
}

export const SummarizeSessionSparkApplicationExecutorsResponse: Schema.Schema<SummarizeSessionSparkApplicationExecutorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      activeExecutorSummary: Schema.optional(ConsolidatedExecutorSummary),
      applicationId: Schema.optional(Schema.String),
      totalExecutorSummary: Schema.optional(ConsolidatedExecutorSummary),
      deadExecutorSummary: Schema.optional(ConsolidatedExecutorSummary),
    }),
  ).annotate({
    identifier: "SummarizeSessionSparkApplicationExecutorsResponse",
  }) as any as Schema.Schema<SummarizeSessionSparkApplicationExecutorsResponse>;

export interface SearchSessionSparkApplicationStageAttemptsResponse {
  /** Output only. Data corresponding to a stage attempts */
  sparkApplicationStageAttempts?: Array<StageData>;
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationStageAttemptsRequest. */
  nextPageToken?: string;
}

export const SearchSessionSparkApplicationStageAttemptsResponse: Schema.Schema<SearchSessionSparkApplicationStageAttemptsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkApplicationStageAttempts: Schema.optional(Schema.Array(StageData)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationStageAttemptsResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationStageAttemptsResponse>;

export interface AccessSessionSparkApplicationSqlSparkPlanGraphResponse {
  /** SparkPlanGraph for a Spark Application execution. */
  sparkPlanGraph?: SparkPlanGraph;
}

export const AccessSessionSparkApplicationSqlSparkPlanGraphResponse: Schema.Schema<AccessSessionSparkApplicationSqlSparkPlanGraphResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkPlanGraph: Schema.optional(SparkPlanGraph),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationSqlSparkPlanGraphResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationSqlSparkPlanGraphResponse>;

export interface ClusterOperation {
  /** Output only. Error, if operation failed. */
  error?: string;
  /** Output only. Indicates the operation is done. */
  done?: boolean;
  /** Output only. The id of the cluster operation. */
  operationId?: string;
}

export const ClusterOperation: Schema.Schema<ClusterOperation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Schema.String),
      done: Schema.optional(Schema.Boolean),
      operationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterOperation",
  }) as any as Schema.Schema<ClusterOperation>;

export interface WorkflowMetadata {
  /** Output only. The name of the target cluster. */
  clusterName?: string;
  /** Output only. The version of template at the time of workflow instantiation. */
  version?: number;
  /** Output only. DAG start time, only set for workflows with dag_timeout when DAG begins. */
  dagStartTime?: string;
  /** Map from parameter names to values that were used for those parameters. */
  parameters?: Record<string, string>;
  /** Output only. The workflow state. */
  state?: "UNKNOWN" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  /** Output only. The create cluster operation metadata. */
  createCluster?: ClusterOperation;
  /** Output only. Workflow start time. */
  startTime?: string;
  /** Output only. The delete cluster operation metadata. */
  deleteCluster?: ClusterOperation;
  /** Output only. The workflow graph. */
  graph?: WorkflowGraph;
  /** Output only. Workflow end time. */
  endTime?: string;
  /** Output only. The resource name of the workflow template as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  template?: string;
  /** Output only. DAG end time, only set for workflows with dag_timeout when DAG ends. */
  dagEndTime?: string;
  /** Output only. The timeout duration for the DAG of jobs, expressed in seconds (see JSON representation of duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  dagTimeout?: string;
  /** Output only. The UUID of target cluster. */
  clusterUuid?: string;
}

export const WorkflowMetadata: Schema.Schema<WorkflowMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterName: Schema.optional(Schema.String),
      version: Schema.optional(Schema.Number),
      dagStartTime: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(Schema.String),
      createCluster: Schema.optional(ClusterOperation),
      startTime: Schema.optional(Schema.String),
      deleteCluster: Schema.optional(ClusterOperation),
      graph: Schema.optional(WorkflowGraph),
      endTime: Schema.optional(Schema.String),
      template: Schema.optional(Schema.String),
      dagEndTime: Schema.optional(Schema.String),
      dagTimeout: Schema.optional(Schema.String),
      clusterUuid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkflowMetadata",
  }) as any as Schema.Schema<WorkflowMetadata>;

export interface WriteSessionSparkApplicationContextRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. The batch of spark application context objects sent for ingestion. */
  sparkWrapperObjects?: Array<SparkWrapperObject>;
}

export const WriteSessionSparkApplicationContextRequest: Schema.Schema<WriteSessionSparkApplicationContextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      sparkWrapperObjects: Schema.optional(Schema.Array(SparkWrapperObject)),
    }),
  ).annotate({
    identifier: "WriteSessionSparkApplicationContextRequest",
  }) as any as Schema.Schema<WriteSessionSparkApplicationContextRequest>;

export interface OrderedJob {
  /** Optional. The labels to associate with this job.Label keys must be between 1 and 63 characters long, and must conform to the following regular expression: \p{Ll}\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following regular expression: \p{Ll}\p{Lo}\p{N}_-{0,63}No more than 32 labels can be associated with a given job. */
  labels?: Record<string, string>;
  /** Optional. The optional list of prerequisite job step_ids. If not specified, the job will start at the beginning of workflow. */
  prerequisiteStepIds?: Array<string>;
  /** Optional. Job is a Hadoop job. */
  hadoopJob?: HadoopJob;
  /** Optional. Job is a Flink job. */
  flinkJob?: FlinkJob;
  /** Optional. Job scheduling configuration. */
  scheduling?: JobScheduling;
  /** Optional. Job is a Hive job. */
  hiveJob?: HiveJob;
  /** Optional. Job is a Presto job. */
  prestoJob?: PrestoJob;
  /** Required. The step id. The id must be unique among all jobs within the template.The step id is used as prefix for job id, as job goog-dataproc-workflow-step-id label, and in prerequisiteStepIds field from other steps.The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of between 3 and 50 characters. */
  stepId?: string;
  /** Optional. Job is a Trino job. */
  trinoJob?: TrinoJob;
  /** Optional. Job is a PySpark job. */
  pysparkJob?: PySparkJob;
  /** Optional. Job is a SparkSql job. */
  sparkSqlJob?: SparkSqlJob;
  /** Optional. Job is a Pig job. */
  pigJob?: PigJob;
  /** Optional. Job is a Spark job. */
  sparkJob?: SparkJob;
  /** Optional. Job is a SparkR job. */
  sparkRJob?: SparkRJob;
}

export const OrderedJob: Schema.Schema<OrderedJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      prerequisiteStepIds: Schema.optional(Schema.Array(Schema.String)),
      hadoopJob: Schema.optional(HadoopJob),
      flinkJob: Schema.optional(FlinkJob),
      scheduling: Schema.optional(JobScheduling),
      hiveJob: Schema.optional(HiveJob),
      prestoJob: Schema.optional(PrestoJob),
      stepId: Schema.optional(Schema.String),
      trinoJob: Schema.optional(TrinoJob),
      pysparkJob: Schema.optional(PySparkJob),
      sparkSqlJob: Schema.optional(SparkSqlJob),
      pigJob: Schema.optional(PigJob),
      sparkJob: Schema.optional(SparkJob),
      sparkRJob: Schema.optional(SparkRJob),
    }),
  ).annotate({ identifier: "OrderedJob" }) as any as Schema.Schema<OrderedJob>;

export interface GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig {
  /** Optional. The Cloud KMS key name to use for encrypting workflow template job arguments.When this this key is provided, the following workflow template job arguments (https://cloud.google.com/dataproc/docs/concepts/workflows/use-workflows#adding_jobs_to_a_template), if present, are CMEK encrypted (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_workflow_template_data): FlinkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/FlinkJob) HadoopJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/HadoopJob) SparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkJob) SparkRJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkRJob) PySparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/PySparkJob) SparkSqlJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkSqlJob) scriptVariables and queryList.queries HiveJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/HiveJob) scriptVariables and queryList.queries PigJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PigJob) scriptVariables and queryList.queries PrestoJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PrestoJob) scriptVariables and queryList.queries */
  kmsKey?: string;
}

export const GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig: Schema.Schema<GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig",
  }) as any as Schema.Schema<GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig>;

export interface WorkflowTemplate {
  /** Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name?: string;
  /** Output only. The time template was last updated. */
  updateTime?: string;
  /** Required. The Directed Acyclic Graph of Jobs to submit. */
  jobs?: Array<OrderedJob>;
  /** Optional. Used to perform a consistent read-modify-write.This field should be left blank for a CreateWorkflowTemplate request. It is required for an UpdateWorkflowTemplate request, and must match the current server version. A typical update template flow would fetch the current template with a GetWorkflowTemplate request, which will return the current template with the version field filled in with the current server version. The user updates other fields in the template, then returns it as part of the UpdateWorkflowTemplate request. */
  version?: number;
  /** Optional. Timeout duration for the DAG of jobs, expressed in seconds (see JSON representation of duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). The timeout duration must be from 10 minutes ("600s") to 24 hours ("86400s"). The timer begins when the first job is submitted. If the workflow is running at the end of the timeout period, any remaining jobs are cancelled, the workflow is ended, and if the workflow was running on a managed cluster, the cluster is deleted. */
  dagTimeout?: string;
  /** Optional. Encryption settings for encrypting workflow template job arguments. */
  encryptionConfig?: GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig;
  /** Optional. The labels to associate with this template. These labels will be propagated to all jobs and clusters created by the workflow instance.Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).No more than 32 labels can be associated with a template. */
  labels?: Record<string, string>;
  /** Required. WorkflowTemplate scheduling information. */
  placement?: WorkflowTemplatePlacement;
  /** Optional. Template parameters whose values are substituted into the template. Values for parameters must be provided when the template is instantiated. */
  parameters?: Array<TemplateParameter>;
  id?: string;
  /** Output only. The time template was created. */
  createTime?: string;
}

export const WorkflowTemplate: Schema.Schema<WorkflowTemplate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      jobs: Schema.optional(Schema.Array(OrderedJob)),
      version: Schema.optional(Schema.Number),
      dagTimeout: Schema.optional(Schema.String),
      encryptionConfig: Schema.optional(
        GoogleCloudDataprocV1WorkflowTemplateEncryptionConfig,
      ),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      placement: Schema.optional(WorkflowTemplatePlacement),
      parameters: Schema.optional(Schema.Array(TemplateParameter)),
      id: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkflowTemplate",
  }) as any as Schema.Schema<WorkflowTemplate>;

export interface ClusterMetrics {
  /** YARN metrics. */
  yarnMetrics?: Record<string, string>;
  /** The HDFS metrics. */
  hdfsMetrics?: Record<string, string>;
}

export const ClusterMetrics: Schema.Schema<ClusterMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      yarnMetrics: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      hdfsMetrics: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ClusterMetrics",
  }) as any as Schema.Schema<ClusterMetrics>;

export interface ClusterStatus {
  /** Output only. The cluster's state. */
  state?:
    | "UNKNOWN"
    | "CREATING"
    | "RUNNING"
    | "ERROR"
    | "ERROR_DUE_TO_UPDATE"
    | "DELETING"
    | "UPDATING"
    | "STOPPING"
    | "STOPPED"
    | "STARTING"
    | "REPAIRING"
    | "SCHEDULED"
    | (string & {});
  /** Output only. Additional state information that includes status reported by the agent. */
  substate?: "UNSPECIFIED" | "UNHEALTHY" | "STALE_STATUS" | (string & {});
  /** Optional. Output only. Details of cluster's state. */
  detail?: string;
  /** Output only. Time when this state was entered (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)). */
  stateStartTime?: string;
}

export const ClusterStatus: Schema.Schema<ClusterStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      substate: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      stateStartTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterStatus",
  }) as any as Schema.Schema<ClusterStatus>;

export interface Cluster {
  /** Output only. Contains cluster daemon metrics such as HDFS and YARN stats.Beta Feature: This report is available for testing purposes only. It may be changed before final release. */
  metrics?: ClusterMetrics;
  /** Required. The Google Cloud Platform project ID that the cluster belongs to. */
  projectId?: string;
  /** Output only. A cluster UUID (Unique Universal Identifier). Dataproc generates this value when it creates the cluster. */
  clusterUuid?: string;
  /** Output only. The previous cluster status. */
  statusHistory?: Array<ClusterStatus>;
  /** Optional. The labels to associate with this cluster. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a cluster. */
  labels?: Record<string, string>;
  /** Optional. The cluster config for a cluster of Compute Engine Instances. Note that Dataproc may set default values, and values may change when clusters are updated.Exactly one of ClusterConfig or VirtualClusterConfig must be specified. */
  config?: ClusterConfig;
  /** Output only. Cluster status. */
  status?: ClusterStatus;
  /** Required. The cluster name, which must be unique within a project. The name must start with a lowercase letter, and can contain up to 51 lowercase letters, numbers, and hyphens. It cannot end with a hyphen. The name of a deleted cluster can be reused. */
  clusterName?: string;
  /** Optional. The virtual cluster config is used when creating a Dataproc cluster that does not directly control the underlying compute resources, for example, when creating a Dataproc-on-GKE cluster (https://cloud.google.com/dataproc/docs/guides/dpgke/dataproc-gke-overview). Dataproc may set default values, and values may change when clusters are updated. Exactly one of config or virtual_cluster_config must be specified. */
  virtualClusterConfig?: VirtualClusterConfig;
}

export const Cluster: Schema.Schema<Cluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metrics: Schema.optional(ClusterMetrics),
      projectId: Schema.optional(Schema.String),
      clusterUuid: Schema.optional(Schema.String),
      statusHistory: Schema.optional(Schema.Array(ClusterStatus)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      config: Schema.optional(ClusterConfig),
      status: Schema.optional(ClusterStatus),
      clusterName: Schema.optional(Schema.String),
      virtualClusterConfig: Schema.optional(VirtualClusterConfig),
    }),
  ).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ListClustersResponse {
  /** Output only. This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent ListClustersRequest. */
  nextPageToken?: string;
  /** Output only. The clusters in the project. */
  clusters?: Array<Cluster>;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      clusters: Schema.optional(Schema.Array(Cluster)),
    }),
  ).annotate({
    identifier: "ListClustersResponse",
  }) as any as Schema.Schema<ListClustersResponse>;

export interface Interval {
  /** Optional. Inclusive start of the interval.If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval.If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface SessionOperationMetadata {
  /** Labels associated with the operation. */
  labels?: Record<string, string>;
  /** Name of the session for the operation. */
  session?: string;
  /** Short description of the operation. */
  description?: string;
  /** The operation type. */
  operationType?:
    | "SESSION_OPERATION_TYPE_UNSPECIFIED"
    | "CREATE"
    | "TERMINATE"
    | "DELETE"
    | (string & {});
  /** The time when the operation was finished. */
  doneTime?: string;
  /** Session UUID for the operation. */
  sessionUuid?: string;
  /** The time when the operation was created. */
  createTime?: string;
  /** Warnings encountered during operation execution. */
  warnings?: Array<string>;
}

export const SessionOperationMetadata: Schema.Schema<SessionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      session: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      doneTime: Schema.optional(Schema.String),
      sessionUuid: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      warnings: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SessionOperationMetadata",
  }) as any as Schema.Schema<SessionOperationMetadata>;

export interface AnalyzeOperationMetadata {
  /** Output only. unique identifier of the workload typically generated by control plane. E.g. batch uuid. */
  analyzedWorkloadUuid?: string;
  /** Output only. Labels associated with the operation. */
  labels?: Record<string, string>;
  /** Output only. The time when the operation was created. */
  createTime?: string;
  /** Output only. Type of the workload being analyzed. */
  analyzedWorkloadType?: "WORKLOAD_TYPE_UNSPECIFIED" | "BATCH" | (string & {});
  /** Output only. The time when the operation finished. */
  doneTime?: string;
  /** Output only. name of the workload being analyzed. */
  analyzedWorkloadName?: string;
  /** Output only. Short description of the operation. */
  description?: string;
  /** Output only. Warnings encountered during operation execution. */
  warnings?: Array<string>;
}

export const AnalyzeOperationMetadata: Schema.Schema<AnalyzeOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      analyzedWorkloadUuid: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      analyzedWorkloadType: Schema.optional(Schema.String),
      doneTime: Schema.optional(Schema.String),
      analyzedWorkloadName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      warnings: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AnalyzeOperationMetadata",
  }) as any as Schema.Schema<AnalyzeOperationMetadata>;

export interface ValueInfo {
  /** Optional. Value which was replaced by the corresponding component. */
  overriddenValue?: string;
  /** Property value. */
  value?: string;
  /** Annotation, comment or explanation why the property was set. */
  annotation?: string;
}

export const ValueInfo: Schema.Schema<ValueInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      overriddenValue: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      annotation: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ValueInfo" }) as any as Schema.Schema<ValueInfo>;

export interface PropertiesInfo {
  /** Output only. Properties set by autotuning engine. */
  autotuningProperties?: Record<string, ValueInfo>;
}

export const PropertiesInfo: Schema.Schema<PropertiesInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      autotuningProperties: Schema.optional(
        Schema.Record(Schema.String, ValueInfo),
      ),
    }),
  ).annotate({
    identifier: "PropertiesInfo",
  }) as any as Schema.Schema<PropertiesInfo>;

export interface AccessSparkApplicationSqlQueryResponse {
  /** SQL Execution Data */
  executionData?: SqlExecutionUiData;
}

export const AccessSparkApplicationSqlQueryResponse: Schema.Schema<AccessSparkApplicationSqlQueryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executionData: Schema.optional(SqlExecutionUiData),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationSqlQueryResponse",
  }) as any as Schema.Schema<AccessSparkApplicationSqlQueryResponse>;

export interface AccessSessionSparkApplicationJobResponse {
  /** Output only. Data corresponding to a spark job. */
  jobData?: JobData;
}

export const AccessSessionSparkApplicationJobResponse: Schema.Schema<AccessSessionSparkApplicationJobResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobData: Schema.optional(JobData),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationJobResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationJobResponse>;

export interface ResizeNodeGroupRequest {
  /** Required. The number of running instances for the node group to maintain. The group adds or removes instances to maintain the number of instances specified by this parameter. */
  size?: number;
  /** Optional. operation id of the parent operation sending the resize request */
  parentOperationId?: string;
  /** Optional. Timeout for graceful YARN decommissioning. Graceful decommissioning (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/scaling-clusters#graceful_decommissioning) allows the removal of nodes from the Compute Engine node group without interrupting jobs in progress. This timeout specifies how long to wait for jobs in progress to finish before forcefully removing nodes (and potentially interrupting jobs). Default timeout is 0 (for forceful decommission), and the maximum allowed timeout is 1 day. (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only supported on Dataproc image versions 1.2 and higher. */
  gracefulDecommissionTimeout?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two ResizeNodeGroupRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.ResizeNodeGroupRequests) with the same ID, the second request is ignored and the first google.longrunning.Operation created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const ResizeNodeGroupRequest: Schema.Schema<ResizeNodeGroupRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      size: Schema.optional(Schema.Number),
      parentOperationId: Schema.optional(Schema.String),
      gracefulDecommissionTimeout: Schema.optional(Schema.String),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResizeNodeGroupRequest",
  }) as any as Schema.Schema<ResizeNodeGroupRequest>;

export interface AccessSparkApplicationStageAttemptResponse {
  /** Output only. Data corresponding to a stage. */
  stageData?: StageData;
}

export const AccessSparkApplicationStageAttemptResponse: Schema.Schema<AccessSparkApplicationStageAttemptResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stageData: Schema.optional(StageData),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationStageAttemptResponse",
  }) as any as Schema.Schema<AccessSparkApplicationStageAttemptResponse>;

export interface DiagnoseClusterResults {
  /** Output only. The Cloud Storage URI of the diagnostic output. The output report is a plain text file with a summary of collected diagnostics. */
  outputUri?: string;
}

export const DiagnoseClusterResults: Schema.Schema<DiagnoseClusterResults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      outputUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiagnoseClusterResults",
  }) as any as Schema.Schema<DiagnoseClusterResults>;

export interface ListWorkflowTemplatesResponse {
  /** Output only. This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent ListWorkflowTemplatesRequest. */
  nextPageToken?: string;
  /** Output only. List of workflow templates that could not be included in the response. Attempting to get one of these resources may indicate why it was not included in the list response. */
  unreachable?: Array<string>;
  /** Output only. WorkflowTemplates list. */
  templates?: Array<WorkflowTemplate>;
}

export const ListWorkflowTemplatesResponse: Schema.Schema<ListWorkflowTemplatesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      templates: Schema.optional(Schema.Array(WorkflowTemplate)),
    }),
  ).annotate({
    identifier: "ListWorkflowTemplatesResponse",
  }) as any as Schema.Schema<ListWorkflowTemplatesResponse>;

export interface SearchSessionSparkApplicationStageAttemptTasksResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationStageAttemptTasksRequest. */
  nextPageToken?: string;
  /** Output only. Data corresponding to tasks created by spark. */
  sparkApplicationStageAttemptTasks?: Array<TaskData>;
}

export const SearchSessionSparkApplicationStageAttemptTasksResponse: Schema.Schema<SearchSessionSparkApplicationStageAttemptTasksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationStageAttemptTasks: Schema.optional(
        Schema.Array(TaskData),
      ),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationStageAttemptTasksResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationStageAttemptTasksResponse>;

export interface AccessSessionSparkApplicationEnvironmentInfoResponse {
  /** Details about the Environment that the application is running in. */
  applicationEnvironmentInfo?: ApplicationEnvironmentInfo;
}

export const AccessSessionSparkApplicationEnvironmentInfoResponse: Schema.Schema<AccessSessionSparkApplicationEnvironmentInfoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicationEnvironmentInfo: Schema.optional(ApplicationEnvironmentInfo),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationEnvironmentInfoResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationEnvironmentInfoResponse>;

export interface StartClusterRequest {
  /** Optional. A unique ID used to identify the request. If the server receives two StartClusterRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.StartClusterRequest)s with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. Specifying the cluster_uuid means the RPC will fail (with error NOT_FOUND) if a cluster with the specified UUID does not exist. */
  clusterUuid?: string;
}

export const StartClusterRequest: Schema.Schema<StartClusterRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      clusterUuid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StartClusterRequest",
  }) as any as Schema.Schema<StartClusterRequest>;

export interface TerminateSessionRequest {
  /** Optional. A unique ID used to identify the request. If the service receives two TerminateSessionRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.TerminateSessionRequest)s with the same ID, the second request is ignored.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const TerminateSessionRequest: Schema.Schema<TerminateSessionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TerminateSessionRequest",
  }) as any as Schema.Schema<TerminateSessionRequest>;

export interface ListAutoscalingPoliciesResponse {
  /** Output only. This token is included in the response if there are more results to fetch. */
  nextPageToken?: string;
  /** Output only. Autoscaling policies list. */
  policies?: Array<AutoscalingPolicy>;
}

export const ListAutoscalingPoliciesResponse: Schema.Schema<ListAutoscalingPoliciesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      policies: Schema.optional(Schema.Array(AutoscalingPolicy)),
    }),
  ).annotate({
    identifier: "ListAutoscalingPoliciesResponse",
  }) as any as Schema.Schema<ListAutoscalingPoliciesResponse>;

export interface SparkBatch {
  /** Optional. The arguments to pass to the driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission. */
  args?: Array<string>;
  /** Optional. HCFS URIs of files to be placed in the working directory of each executor. */
  fileUris?: Array<string>;
  /** Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
  /** Optional. HCFS URIs of jar files to add to the classpath of the Spark driver and tasks. */
  jarFileUris?: Array<string>;
  /** Optional. The name of the driver main class. The jar file that contains the class must be in the classpath or specified in jar_file_uris. */
  mainClass?: string;
  /** Optional. The HCFS URI of the jar file that contains the main class. */
  mainJarFileUri?: string;
}

export const SparkBatch: Schema.Schema<SparkBatch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      args: Schema.optional(Schema.Array(Schema.String)),
      fileUris: Schema.optional(Schema.Array(Schema.String)),
      archiveUris: Schema.optional(Schema.Array(Schema.String)),
      jarFileUris: Schema.optional(Schema.Array(Schema.String)),
      mainClass: Schema.optional(Schema.String),
      mainJarFileUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SparkBatch" }) as any as Schema.Schema<SparkBatch>;

export interface UsageSnapshot {
  /** Optional. Shuffle Storage in gigabytes (GB). (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)) */
  shuffleStorageGb?: string;
  /** Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) charged at premium tier (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)). */
  milliDcuPremium?: string;
  /** Optional. Shuffle Storage in gigabytes (GB) charged at premium tier. (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)) */
  shuffleStorageGbPremium?: string;
  /** Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)). */
  milliDcu?: string;
  /** Optional. Accelerator type being used, if any */
  acceleratorType?: string;
  /** Optional. Milli (one-thousandth) accelerator. (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)) */
  milliAccelerator?: string;
  /** Optional. The timestamp of the usage snapshot. */
  snapshotTime?: string;
}

export const UsageSnapshot: Schema.Schema<UsageSnapshot> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shuffleStorageGb: Schema.optional(Schema.String),
      milliDcuPremium: Schema.optional(Schema.String),
      shuffleStorageGbPremium: Schema.optional(Schema.String),
      milliDcu: Schema.optional(Schema.String),
      acceleratorType: Schema.optional(Schema.String),
      milliAccelerator: Schema.optional(Schema.String),
      snapshotTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UsageSnapshot",
  }) as any as Schema.Schema<UsageSnapshot>;

export interface RuntimeInfo {
  /** Output only. A URI pointing to the location of the diagnostics tarball. */
  diagnosticOutputUri?: string;
  /** Output only. Map of remote access endpoints (such as web interfaces and APIs) to their URIs. */
  endpoints?: Record<string, string>;
  /** Output only. A URI pointing to the location of the stdout and stderr of the workload. */
  outputUri?: string;
  /** Output only. Approximate workload resource usage, calculated when the workload completes (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).Note: This metric calculation may change in the future, for example, to capture cumulative workload resource consumption during workload execution (see the Dataproc Serverless release notes (https://cloud.google.com/dataproc-serverless/docs/release-notes) for announcements, changes, fixes and other Dataproc developments). */
  approximateUsage?: UsageMetrics;
  /** Optional. Properties of the workload organized by origin. */
  propertiesInfo?: PropertiesInfo;
  /** Output only. Snapshot of current workload resource usage. */
  currentUsage?: UsageSnapshot;
}

export const RuntimeInfo: Schema.Schema<RuntimeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diagnosticOutputUri: Schema.optional(Schema.String),
      endpoints: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      outputUri: Schema.optional(Schema.String),
      approximateUsage: Schema.optional(UsageMetrics),
      propertiesInfo: Schema.optional(PropertiesInfo),
      currentUsage: Schema.optional(UsageSnapshot),
    }),
  ).annotate({
    identifier: "RuntimeInfo",
  }) as any as Schema.Schema<RuntimeInfo>;

export interface StateHistory {
  /** Output only. Details about the state at this point in history. */
  stateMessage?: string;
  /** Output only. The time when the batch entered the historical state. */
  stateStartTime?: string;
  /** Output only. The state of the batch at this point in history. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "CANCELLING"
    | "CANCELLED"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
}

export const StateHistory: Schema.Schema<StateHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stateMessage: Schema.optional(Schema.String),
      stateStartTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StateHistory",
  }) as any as Schema.Schema<StateHistory>;

export interface Batch {
  /** Output only. The email address of the user who created the batch. */
  creator?: string;
  /** Optional. The labels to associate with this batch. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a batch. */
  labels?: Record<string, string>;
  /** Optional. PySpark batch config. */
  pysparkBatch?: PySparkBatch;
  /** Output only. The resource name of the batch. */
  name?: string;
  /** Optional. Spark batch config. */
  sparkBatch?: SparkBatch;
  /** Output only. Runtime information about batch execution. */
  runtimeInfo?: RuntimeInfo;
  /** Output only. The time when the batch was created. */
  createTime?: string;
  /** Optional. Environment configuration for the batch execution. */
  environmentConfig?: EnvironmentConfig;
  /** Output only. The resource name of the operation associated with this batch. */
  operation?: string;
  /** Optional. Runtime configuration for the batch execution. */
  runtimeConfig?: RuntimeConfig;
  /** Output only. Batch state details, such as a failure description if the state is FAILED. */
  stateMessage?: string;
  /** Output only. The state of the batch. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "CANCELLING"
    | "CANCELLED"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
  /** Output only. A batch UUID (Unique Universal Identifier). The service generates this value when it creates the batch. */
  uuid?: string;
  /** Output only. The time when the batch entered a current state. */
  stateTime?: string;
  /** Output only. Historical state information for the batch. */
  stateHistory?: Array<StateHistory>;
  /** Optional. SparkR batch config. */
  sparkRBatch?: SparkRBatch;
  /** Optional. SparkSql batch config. */
  sparkSqlBatch?: SparkSqlBatch;
}

export const Batch: Schema.Schema<Batch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creator: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      pysparkBatch: Schema.optional(PySparkBatch),
      name: Schema.optional(Schema.String),
      sparkBatch: Schema.optional(SparkBatch),
      runtimeInfo: Schema.optional(RuntimeInfo),
      createTime: Schema.optional(Schema.String),
      environmentConfig: Schema.optional(EnvironmentConfig),
      operation: Schema.optional(Schema.String),
      runtimeConfig: Schema.optional(RuntimeConfig),
      stateMessage: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      uuid: Schema.optional(Schema.String),
      stateTime: Schema.optional(Schema.String),
      stateHistory: Schema.optional(Schema.Array(StateHistory)),
      sparkRBatch: Schema.optional(SparkRBatch),
      sparkSqlBatch: Schema.optional(SparkSqlBatch),
    }),
  ).annotate({ identifier: "Batch" }) as any as Schema.Schema<Batch>;

export interface ListBatchesResponse {
  /** Output only. The batches from the specified collection. */
  batches?: Array<Batch>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. List of Batches that could not be included in the response. Attempting to get one of these resources may indicate why it was not included in the list response. */
  unreachable?: Array<string>;
}

export const ListBatchesResponse: Schema.Schema<ListBatchesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      batches: Schema.optional(Schema.Array(Batch)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListBatchesResponse",
  }) as any as Schema.Schema<ListBatchesResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface SparkApplication {
  /** Output only. High level information corresponding to an application. */
  application?: ApplicationInfo;
  /** Identifier. Name of the spark application */
  name?: string;
}

export const SparkApplication: Schema.Schema<SparkApplication> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      application: Schema.optional(ApplicationInfo),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SparkApplication",
  }) as any as Schema.Schema<SparkApplication>;

export interface SearchSparkApplicationsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSparkApplicationsRequest. */
  nextPageToken?: string;
  /** Output only. High level information corresponding to an application. */
  sparkApplications?: Array<SparkApplication>;
}

export const SearchSparkApplicationsResponse: Schema.Schema<SearchSparkApplicationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplications: Schema.optional(Schema.Array(SparkApplication)),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationsResponse",
  }) as any as Schema.Schema<SearchSparkApplicationsResponse>;

export interface SummarizeSessionSparkApplicationJobsResponse {
  /** Summary of a Spark Application Jobs */
  jobsSummary?: JobsSummary;
}

export const SummarizeSessionSparkApplicationJobsResponse: Schema.Schema<SummarizeSessionSparkApplicationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobsSummary: Schema.optional(JobsSummary),
    }),
  ).annotate({
    identifier: "SummarizeSessionSparkApplicationJobsResponse",
  }) as any as Schema.Schema<SummarizeSessionSparkApplicationJobsResponse>;

export interface WriteSparkApplicationContextRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  sparkWrapperObjects?: Array<SparkWrapperObject>;
}

export const WriteSparkApplicationContextRequest: Schema.Schema<WriteSparkApplicationContextRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      sparkWrapperObjects: Schema.optional(Schema.Array(SparkWrapperObject)),
    }),
  ).annotate({
    identifier: "WriteSparkApplicationContextRequest",
  }) as any as Schema.Schema<WriteSparkApplicationContextRequest>;

export interface SearchSparkApplicationExecutorStageSummaryResponse {
  /** Details about executors used by the application stage. */
  sparkApplicationStageExecutors?: Array<ExecutorStageSummary>;
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSparkApplicationExecutorsListRequest. */
  nextPageToken?: string;
}

export const SearchSparkApplicationExecutorStageSummaryResponse: Schema.Schema<SearchSparkApplicationExecutorStageSummaryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkApplicationStageExecutors: Schema.optional(
        Schema.Array(ExecutorStageSummary),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationExecutorStageSummaryResponse",
  }) as any as Schema.Schema<SearchSparkApplicationExecutorStageSummaryResponse>;

export interface CancelJobRequest {}

export const CancelJobRequest: Schema.Schema<CancelJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelJobRequest",
  }) as any as Schema.Schema<CancelJobRequest>;

export interface WriteSessionSparkApplicationContextResponse {}

export const WriteSessionSparkApplicationContextResponse: Schema.Schema<WriteSessionSparkApplicationContextResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "WriteSessionSparkApplicationContextResponse",
  }) as any as Schema.Schema<WriteSessionSparkApplicationContextResponse>;

export interface AccessSparkApplicationSqlSparkPlanGraphResponse {
  /** SparkPlanGraph for a Spark Application execution. */
  sparkPlanGraph?: SparkPlanGraph;
}

export const AccessSparkApplicationSqlSparkPlanGraphResponse: Schema.Schema<AccessSparkApplicationSqlSparkPlanGraphResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sparkPlanGraph: Schema.optional(SparkPlanGraph),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationSqlSparkPlanGraphResponse",
  }) as any as Schema.Schema<AccessSparkApplicationSqlSparkPlanGraphResponse>;

export interface SearchSessionSparkApplicationsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationsRequest. */
  nextPageToken?: string;
  /** Output only. High level information corresponding to an application. */
  sparkApplications?: Array<SparkApplication>;
}

export const SearchSessionSparkApplicationsResponse: Schema.Schema<SearchSessionSparkApplicationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplications: Schema.optional(Schema.Array(SparkApplication)),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationsResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationsResponse>;

export interface Session {
  /** Output only. Session state details, such as the failure description if the state is FAILED. */
  stateMessage?: string;
  /** Optional. Runtime configuration for the session execution. */
  runtimeConfig?: RuntimeConfig;
  /** Optional. The email address of the user who owns the session. */
  user?: string;
  /** Optional. Jupyter session config. */
  jupyterSession?: JupyterConfig;
  /** Output only. Runtime information about session execution. */
  runtimeInfo?: RuntimeInfo;
  /** Output only. The time when the session was created. */
  createTime?: string;
  /** Optional. Environment configuration for the session execution. */
  environmentConfig?: EnvironmentConfig;
  /** Output only. A state of the session. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "ACTIVE"
    | "TERMINATING"
    | "TERMINATED"
    | "FAILED"
    | (string & {});
  /** Output only. The email address of the user who created the session. */
  creator?: string;
  /** Output only. Historical state information for the session. */
  stateHistory?: Array<SessionStateHistory>;
  /** Identifier. The resource name of the session. */
  name?: string;
  /** Output only. A session UUID (Unique Universal Identifier). The service generates this value when it creates the session. */
  uuid?: string;
  /** Output only. The time when the session entered the current state. */
  stateTime?: string;
  /** Optional. Spark connect session config. */
  sparkConnectSession?: SparkConnectConfig;
  /** Optional. The session template used by the session.Only resource names, including project ID and location, are valid.Example: * https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/sessionTemplates/[template_id] * projects/[project_id]/locations/[dataproc_region]/sessionTemplates/[template_id]The template must be in the same project and Dataproc region as the session. */
  sessionTemplate?: string;
  /** Optional. The labels to associate with the session. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a session. */
  labels?: Record<string, string>;
}

export const Session: Schema.Schema<Session> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stateMessage: Schema.optional(Schema.String),
      runtimeConfig: Schema.optional(RuntimeConfig),
      user: Schema.optional(Schema.String),
      jupyterSession: Schema.optional(JupyterConfig),
      runtimeInfo: Schema.optional(RuntimeInfo),
      createTime: Schema.optional(Schema.String),
      environmentConfig: Schema.optional(EnvironmentConfig),
      state: Schema.optional(Schema.String),
      creator: Schema.optional(Schema.String),
      stateHistory: Schema.optional(Schema.Array(SessionStateHistory)),
      name: Schema.optional(Schema.String),
      uuid: Schema.optional(Schema.String),
      stateTime: Schema.optional(Schema.String),
      sparkConnectSession: Schema.optional(SparkConnectConfig),
      sessionTemplate: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Session" }) as any as Schema.Schema<Session>;

export interface ListSessionsResponse {
  /** A token, which can be sent as page_token, to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. The sessions from the specified collection. */
  sessions?: Array<Session>;
}

export const ListSessionsResponse: Schema.Schema<ListSessionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sessions: Schema.optional(Schema.Array(Session)),
    }),
  ).annotate({
    identifier: "ListSessionsResponse",
  }) as any as Schema.Schema<ListSessionsResponse>;

export interface DiagnoseClusterRequest {
  /** Optional. (Optional) The access type to the diagnostic tarball. If not specified, falls back to default access of the bucket */
  tarballAccess?:
    | "TARBALL_ACCESS_UNSPECIFIED"
    | "GOOGLE_CLOUD_SUPPORT"
    | "GOOGLE_DATAPROC_DIAGNOSE"
    | (string & {});
  /** Optional. Specifies a list of yarn applications on which diagnosis is to be performed. */
  yarnApplicationIds?: Array<string>;
  /** Optional. Specifies a list of jobs on which diagnosis is to be performed. Format: projects/{project}/regions/{region}/jobs/{job} */
  jobs?: Array<string>;
  /** Optional. (Optional) The output Cloud Storage directory for the diagnostic tarball. If not specified, a task-specific directory in the cluster's staging bucket will be used. */
  tarballGcsDir?: string;
  /** Optional. DEPRECATED Specifies the yarn application on which diagnosis is to be performed. */
  yarnApplicationId?: string;
  /** Optional. Time interval in which diagnosis should be carried out on the cluster. */
  diagnosisInterval?: Interval;
  /** Optional. DEPRECATED Specifies the job on which diagnosis is to be performed. Format: projects/{project}/regions/{region}/jobs/{job} */
  job?: string;
}

export const DiagnoseClusterRequest: Schema.Schema<DiagnoseClusterRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tarballAccess: Schema.optional(Schema.String),
      yarnApplicationIds: Schema.optional(Schema.Array(Schema.String)),
      jobs: Schema.optional(Schema.Array(Schema.String)),
      tarballGcsDir: Schema.optional(Schema.String),
      yarnApplicationId: Schema.optional(Schema.String),
      diagnosisInterval: Schema.optional(Interval),
      job: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiagnoseClusterRequest",
  }) as any as Schema.Schema<DiagnoseClusterRequest>;

export interface AnalyzeBatchRequest {
  /** Optional. A unique ID used to identify the request. If the service receives two AnalyzeBatchRequest (http://cloud/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.AnalyzeBatchRequest)s with the same request_id, the second request is ignored and the Operation that corresponds to the first request created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. The requestor ID is used to identify if the request comes from a GCA investigation or the old Ask Gemini Experience. */
  requestorId?: string;
}

export const AnalyzeBatchRequest: Schema.Schema<AnalyzeBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      requestorId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AnalyzeBatchRequest",
  }) as any as Schema.Schema<AnalyzeBatchRequest>;

export interface SubmitJobRequest {
  /** Required. The job resource. */
  job?: Job;
  /** Optional. A unique id used to identify the request. If the server receives two SubmitJobRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.SubmitJobRequest)s with the same id, then the second request will be ignored and the first Job created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const SubmitJobRequest: Schema.Schema<SubmitJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      job: Schema.optional(Job),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SubmitJobRequest",
  }) as any as Schema.Schema<SubmitJobRequest>;

export interface StagesSummary {
  numActiveStages?: number;
  applicationId?: string;
  numCompletedStages?: number;
  numFailedStages?: number;
  numPendingStages?: number;
  numSkippedStages?: number;
}

export const StagesSummary: Schema.Schema<StagesSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      numActiveStages: Schema.optional(Schema.Number),
      applicationId: Schema.optional(Schema.String),
      numCompletedStages: Schema.optional(Schema.Number),
      numFailedStages: Schema.optional(Schema.Number),
      numPendingStages: Schema.optional(Schema.Number),
      numSkippedStages: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "StagesSummary",
  }) as any as Schema.Schema<StagesSummary>;

export interface SummarizeSparkApplicationStagesResponse {
  /** Summary of a Spark Application Stages */
  stagesSummary?: StagesSummary;
}

export const SummarizeSparkApplicationStagesResponse: Schema.Schema<SummarizeSparkApplicationStagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stagesSummary: Schema.optional(StagesSummary),
    }),
  ).annotate({
    identifier: "SummarizeSparkApplicationStagesResponse",
  }) as any as Schema.Schema<SummarizeSparkApplicationStagesResponse>;

export interface ListSessionTemplatesResponse {
  /** Output only. Session template list */
  sessionTemplates?: Array<SessionTemplate>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSessionTemplatesResponse: Schema.Schema<ListSessionTemplatesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionTemplates: Schema.optional(Schema.Array(SessionTemplate)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSessionTemplatesResponse",
  }) as any as Schema.Schema<ListSessionTemplatesResponse>;

export interface AccessSessionSparkApplicationSqlQueryResponse {
  /** SQL Execution Data */
  executionData?: SqlExecutionUiData;
}

export const AccessSessionSparkApplicationSqlQueryResponse: Schema.Schema<AccessSessionSparkApplicationSqlQueryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executionData: Schema.optional(SqlExecutionUiData),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationSqlQueryResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationSqlQueryResponse>;

export interface AccessSessionSparkApplicationStageRddOperationGraphResponse {
  /** RDD operation graph for a Spark Application Stage. */
  rddOperationGraph?: RddOperationGraph;
}

export const AccessSessionSparkApplicationStageRddOperationGraphResponse: Schema.Schema<AccessSessionSparkApplicationStageRddOperationGraphResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rddOperationGraph: Schema.optional(RddOperationGraph),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationStageRddOperationGraphResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationStageRddOperationGraphResponse>;

export interface StopClusterRequest {
  /** Optional. Specifying the cluster_uuid means the RPC will fail (with error NOT_FOUND) if a cluster with the specified UUID does not exist. */
  clusterUuid?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two StopClusterRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.StopClusterRequest)s with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const StopClusterRequest: Schema.Schema<StopClusterRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterUuid: Schema.optional(Schema.String),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StopClusterRequest",
  }) as any as Schema.Schema<StopClusterRequest>;

export interface SummarizeSessionSparkApplicationStagesResponse {
  /** Summary of a Spark Application Stages */
  stagesSummary?: StagesSummary;
}

export const SummarizeSessionSparkApplicationStagesResponse: Schema.Schema<SummarizeSessionSparkApplicationStagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stagesSummary: Schema.optional(StagesSummary),
    }),
  ).annotate({
    identifier: "SummarizeSessionSparkApplicationStagesResponse",
  }) as any as Schema.Schema<SummarizeSessionSparkApplicationStagesResponse>;

export interface ClusterOperationMetadata {
  /** Output only. The previous operation status. */
  statusHistory?: Array<ClusterOperationStatus>;
  /** Output only. Short description of operation. */
  description?: string;
  /** Output only. Current operation status. */
  status?: ClusterOperationStatus;
  /** Output only. Labels associated with the operation */
  labels?: Record<string, string>;
  /** Output only. The operation type. */
  operationType?: string;
  /** Output only. Cluster UUID for the operation. */
  clusterUuid?: string;
  /** Output only. Name of the cluster for the operation. */
  clusterName?: string;
  /** Output only. Child operation ids */
  childOperationIds?: Array<string>;
  /** Output only. Errors encountered during operation execution. */
  warnings?: Array<string>;
}

export const ClusterOperationMetadata: Schema.Schema<ClusterOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      statusHistory: Schema.optional(Schema.Array(ClusterOperationStatus)),
      description: Schema.optional(Schema.String),
      status: Schema.optional(ClusterOperationStatus),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      operationType: Schema.optional(Schema.String),
      clusterUuid: Schema.optional(Schema.String),
      clusterName: Schema.optional(Schema.String),
      childOperationIds: Schema.optional(Schema.Array(Schema.String)),
      warnings: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ClusterOperationMetadata",
  }) as any as Schema.Schema<ClusterOperationMetadata>;

export interface AccessSessionSparkApplicationResponse {
  /** Output only. High level information corresponding to an application. */
  application?: ApplicationInfo;
}

export const AccessSessionSparkApplicationResponse: Schema.Schema<AccessSessionSparkApplicationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      application: Schema.optional(ApplicationInfo),
    }),
  ).annotate({
    identifier: "AccessSessionSparkApplicationResponse",
  }) as any as Schema.Schema<AccessSessionSparkApplicationResponse>;

export interface BatchOperationMetadata {
  /** The time when the operation finished. */
  doneTime?: string;
  /** Warnings encountered during operation execution. */
  warnings?: Array<string>;
  /** Labels associated with the operation. */
  labels?: Record<string, string>;
  /** Batch UUID for the operation. */
  batchUuid?: string;
  /** The time when the operation was created. */
  createTime?: string;
  /** Name of the batch for the operation. */
  batch?: string;
  /** Short description of the operation. */
  description?: string;
  /** The operation type. */
  operationType?: "BATCH_OPERATION_TYPE_UNSPECIFIED" | "BATCH" | (string & {});
}

export const BatchOperationMetadata: Schema.Schema<BatchOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      doneTime: Schema.optional(Schema.String),
      warnings: Schema.optional(Schema.Array(Schema.String)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      batchUuid: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      batch: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchOperationMetadata",
  }) as any as Schema.Schema<BatchOperationMetadata>;

export interface SearchSparkApplicationSqlQueriesResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSparkApplicationSqlQueriesRequest. */
  nextPageToken?: string;
  /** Output only. SQL Execution Data */
  sparkApplicationSqlQueries?: Array<SqlExecutionUiData>;
}

export const SearchSparkApplicationSqlQueriesResponse: Schema.Schema<SearchSparkApplicationSqlQueriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationSqlQueries: Schema.optional(
        Schema.Array(SqlExecutionUiData),
      ),
    }),
  ).annotate({
    identifier: "SearchSparkApplicationSqlQueriesResponse",
  }) as any as Schema.Schema<SearchSparkApplicationSqlQueriesResponse>;

export interface SearchSessionSparkApplicationJobsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationJobsRequest. */
  nextPageToken?: string;
  /** Output only. Data corresponding to a spark job. */
  sparkApplicationJobs?: Array<JobData>;
}

export const SearchSessionSparkApplicationJobsResponse: Schema.Schema<SearchSessionSparkApplicationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationJobs: Schema.optional(Schema.Array(JobData)),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationJobsResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationJobsResponse>;

export interface SummarizeSparkApplicationStageAttemptTasksResponse {
  /** Summary of tasks for a Spark Application Stage Attempt */
  stageAttemptTasksSummary?: StageAttemptTasksSummary;
}

export const SummarizeSparkApplicationStageAttemptTasksResponse: Schema.Schema<SummarizeSparkApplicationStageAttemptTasksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stageAttemptTasksSummary: Schema.optional(StageAttemptTasksSummary),
    }),
  ).annotate({
    identifier: "SummarizeSparkApplicationStageAttemptTasksResponse",
  }) as any as Schema.Schema<SummarizeSparkApplicationStageAttemptTasksResponse>;

export interface AccessSparkApplicationJobResponse {
  /** Output only. Data corresponding to a spark job. */
  jobData?: JobData;
}

export const AccessSparkApplicationJobResponse: Schema.Schema<AccessSparkApplicationJobResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobData: Schema.optional(JobData),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationJobResponse",
  }) as any as Schema.Schema<AccessSparkApplicationJobResponse>;

export interface InstantiateWorkflowTemplateRequest {
  /** Optional. The version of workflow template to instantiate. If specified, the workflow will be instantiated only if the current version of the workflow template has the supplied version.This option cannot be used to instantiate a previous version of workflow template. */
  version?: number;
  /** Optional. Map from parameter names to values that should be used for those parameters. Values may not exceed 1000 characters. */
  parameters?: Record<string, string>;
  /** Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const InstantiateWorkflowTemplateRequest: Schema.Schema<InstantiateWorkflowTemplateRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstantiateWorkflowTemplateRequest",
  }) as any as Schema.Schema<InstantiateWorkflowTemplateRequest>;

export interface SearchSessionSparkApplicationExecutorsResponse {
  /** This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent SearchSessionSparkApplicationExecutorsRequest. */
  nextPageToken?: string;
  /** Details about executors used by the application. */
  sparkApplicationExecutors?: Array<ExecutorSummary>;
}

export const SearchSessionSparkApplicationExecutorsResponse: Schema.Schema<SearchSessionSparkApplicationExecutorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sparkApplicationExecutors: Schema.optional(Schema.Array(ExecutorSummary)),
    }),
  ).annotate({
    identifier: "SearchSessionSparkApplicationExecutorsResponse",
  }) as any as Schema.Schema<SearchSessionSparkApplicationExecutorsResponse>;

export interface RepairNodeGroupRequest {
  /** Required. Name of instances to be repaired. These instances must belong to specified node pool. */
  instanceNames?: Array<string>;
  /** Required. Repair action to take on specified resources of the node pool. */
  repairAction?: "REPAIR_ACTION_UNSPECIFIED" | "REPLACE" | (string & {});
  /** Optional. A unique ID used to identify the request. If the server receives two RepairNodeGroupRequest with the same ID, the second request is ignored and the first google.longrunning.Operation created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const RepairNodeGroupRequest: Schema.Schema<RepairNodeGroupRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instanceNames: Schema.optional(Schema.Array(Schema.String)),
      repairAction: Schema.optional(Schema.String),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RepairNodeGroupRequest",
  }) as any as Schema.Schema<RepairNodeGroupRequest>;

export interface AccessSparkApplicationResponse {
  /** Output only. High level information corresponding to an application. */
  application?: ApplicationInfo;
}

export const AccessSparkApplicationResponse: Schema.Schema<AccessSparkApplicationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      application: Schema.optional(ApplicationInfo),
    }),
  ).annotate({
    identifier: "AccessSparkApplicationResponse",
  }) as any as Schema.Schema<AccessSparkApplicationResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the resource. Permissions with wildcards (such as * or storage.*) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface NodeGroupOperationMetadata {
  /** Output only. Labels associated with the operation. */
  labels?: Record<string, string>;
  /** Output only. Errors encountered during operation execution. */
  warnings?: Array<string>;
  /** Output only. Short description of operation. */
  description?: string;
  /** Output only. Cluster UUID associated with the node group operation. */
  clusterUuid?: string;
  /** Output only. Node group ID for the operation. */
  nodeGroupId?: string;
  /** The operation type. */
  operationType?:
    | "NODE_GROUP_OPERATION_TYPE_UNSPECIFIED"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "RESIZE"
    | "REPAIR"
    | "UPDATE_LABELS"
    | "START"
    | "STOP"
    | "UPDATE_METADATA_CONFIG"
    | (string & {});
  /** Output only. Current operation status. */
  status?: ClusterOperationStatus;
  /** Output only. The previous operation status. */
  statusHistory?: Array<ClusterOperationStatus>;
}

export const NodeGroupOperationMetadata: Schema.Schema<NodeGroupOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      warnings: Schema.optional(Schema.Array(Schema.String)),
      description: Schema.optional(Schema.String),
      clusterUuid: Schema.optional(Schema.String),
      nodeGroupId: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      status: Schema.optional(ClusterOperationStatus),
      statusHistory: Schema.optional(Schema.Array(ClusterOperationStatus)),
    }),
  ).annotate({
    identifier: "NodeGroupOperationMetadata",
  }) as any as Schema.Schema<NodeGroupOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DeleteProjectsLocationsSessionTemplatesRequest {
  /** Required. The name of the session template resource to delete. */
  name: string;
}

export const DeleteProjectsLocationsSessionTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessionTemplates/{sessionTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSessionTemplatesRequest>;

export type DeleteProjectsLocationsSessionTemplatesResponse = Empty;
export const DeleteProjectsLocationsSessionTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsSessionTemplatesError = DefaultErrors;

/** Deletes a session template. */
export const deleteProjectsLocationsSessionTemplates: API.OperationMethod<
  DeleteProjectsLocationsSessionTemplatesRequest,
  DeleteProjectsLocationsSessionTemplatesResponse,
  DeleteProjectsLocationsSessionTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSessionTemplatesRequest,
  output: DeleteProjectsLocationsSessionTemplatesResponse,
  errors: [],
}));

export interface ListProjectsLocationsSessionTemplatesRequest {
  /** Optional. A filter for the session templates to return in the response. Filters are case sensitive and have the following syntax:field = value AND field = value ... */
  filter?: string;
  /** Optional. A page token received from a previous ListSessions call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. The maximum number of sessions to return in each response. The service may return fewer than this value. */
  pageSize?: number;
  /** Required. The parent that owns this collection of session templates. */
  parent: string;
}

export const ListProjectsLocationsSessionTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessionTemplates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSessionTemplatesRequest>;

export type ListProjectsLocationsSessionTemplatesResponse =
  ListSessionTemplatesResponse;
export const ListProjectsLocationsSessionTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSessionTemplatesResponse;

export type ListProjectsLocationsSessionTemplatesError = DefaultErrors;

/** Lists session templates. */
export const listProjectsLocationsSessionTemplates: API.PaginatedOperationMethod<
  ListProjectsLocationsSessionTemplatesRequest,
  ListProjectsLocationsSessionTemplatesResponse,
  ListProjectsLocationsSessionTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSessionTemplatesRequest,
  output: ListProjectsLocationsSessionTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsSessionTemplatesRequest {
  /** Required. Identifier. The resource name of the session template. */
  name: string;
  /** Request body */
  body?: SessionTemplate;
}

export const PatchProjectsLocationsSessionTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(SessionTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessionTemplates/{sessionTemplatesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSessionTemplatesRequest>;

export type PatchProjectsLocationsSessionTemplatesResponse = SessionTemplate;
export const PatchProjectsLocationsSessionTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SessionTemplate;

export type PatchProjectsLocationsSessionTemplatesError = DefaultErrors;

/** Updates the session template synchronously. */
export const patchProjectsLocationsSessionTemplates: API.OperationMethod<
  PatchProjectsLocationsSessionTemplatesRequest,
  PatchProjectsLocationsSessionTemplatesResponse,
  PatchProjectsLocationsSessionTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSessionTemplatesRequest,
  output: PatchProjectsLocationsSessionTemplatesResponse,
  errors: [],
}));

export interface GetProjectsLocationsSessionTemplatesRequest {
  /** Required. The name of the session template to retrieve. */
  name: string;
}

export const GetProjectsLocationsSessionTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessionTemplates/{sessionTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSessionTemplatesRequest>;

export type GetProjectsLocationsSessionTemplatesResponse = SessionTemplate;
export const GetProjectsLocationsSessionTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SessionTemplate;

export type GetProjectsLocationsSessionTemplatesError = DefaultErrors;

/** Gets the resource representation for a session template. */
export const getProjectsLocationsSessionTemplates: API.OperationMethod<
  GetProjectsLocationsSessionTemplatesRequest,
  GetProjectsLocationsSessionTemplatesResponse,
  GetProjectsLocationsSessionTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSessionTemplatesRequest,
  output: GetProjectsLocationsSessionTemplatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSessionTemplatesRequest {
  /** Required. The parent resource where this session template will be created. */
  parent: string;
  /** Request body */
  body?: SessionTemplate;
}

export const CreateProjectsLocationsSessionTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(SessionTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessionTemplates",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSessionTemplatesRequest>;

export type CreateProjectsLocationsSessionTemplatesResponse = SessionTemplate;
export const CreateProjectsLocationsSessionTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SessionTemplate;

export type CreateProjectsLocationsSessionTemplatesError = DefaultErrors;

/** Create a session template synchronously. */
export const createProjectsLocationsSessionTemplates: API.OperationMethod<
  CreateProjectsLocationsSessionTemplatesRequest,
  CreateProjectsLocationsSessionTemplatesResponse,
  CreateProjectsLocationsSessionTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSessionTemplatesRequest,
  output: CreateProjectsLocationsSessionTemplatesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetIamPolicyProjectsLocationsAutoscalingPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies/{autoscalingPoliciesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAutoscalingPoliciesRequest>;

export type GetIamPolicyProjectsLocationsAutoscalingPoliciesResponse = Policy;
export const GetIamPolicyProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsAutoscalingPoliciesError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  GetIamPolicyProjectsLocationsAutoscalingPoliciesRequest,
  GetIamPolicyProjectsLocationsAutoscalingPoliciesResponse,
  GetIamPolicyProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsAutoscalingPoliciesRequest,
  output: GetIamPolicyProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100. */
  pageSize?: number;
  /** Optional. The page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAutoscalingPoliciesRequest>;

export type ListProjectsLocationsAutoscalingPoliciesResponse =
  ListAutoscalingPoliciesResponse;
export const ListProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAutoscalingPoliciesResponse;

export type ListProjectsLocationsAutoscalingPoliciesError = DefaultErrors;

/** Lists autoscaling policies in the project. */
export const listProjectsLocationsAutoscalingPolicies: API.PaginatedOperationMethod<
  ListProjectsLocationsAutoscalingPoliciesRequest,
  ListProjectsLocationsAutoscalingPoliciesResponse,
  ListProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsAutoscalingPoliciesRequest,
  output: ListProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name: string;
}

export const GetProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies/{autoscalingPoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAutoscalingPoliciesRequest>;

export type GetProjectsLocationsAutoscalingPoliciesResponse = AutoscalingPolicy;
export const GetProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoscalingPolicy;

export type GetProjectsLocationsAutoscalingPoliciesError = DefaultErrors;

/** Retrieves autoscaling policy. */
export const getProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  GetProjectsLocationsAutoscalingPoliciesRequest,
  GetProjectsLocationsAutoscalingPoliciesResponse,
  GetProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAutoscalingPoliciesRequest,
  output: GetProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface UpdateProjectsLocationsAutoscalingPoliciesRequest {
  /** Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name: string;
  /** Request body */
  body?: AutoscalingPolicy;
}

export const UpdateProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(AutoscalingPolicy).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies/{autoscalingPoliciesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateProjectsLocationsAutoscalingPoliciesRequest>;

export type UpdateProjectsLocationsAutoscalingPoliciesResponse =
  AutoscalingPolicy;
export const UpdateProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoscalingPolicy;

export type UpdateProjectsLocationsAutoscalingPoliciesError = DefaultErrors;

/** Updates (replaces) autoscaling policy.Disabled check for update_mask, because all updates will be full replacements. */
export const updateProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  UpdateProjectsLocationsAutoscalingPoliciesRequest,
  UpdateProjectsLocationsAutoscalingPoliciesResponse,
  UpdateProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProjectsLocationsAutoscalingPoliciesRequest,
  output: UpdateProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsAutoscalingPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies/{autoscalingPoliciesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAutoscalingPoliciesRequest>;

export type TestIamPermissionsProjectsLocationsAutoscalingPoliciesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAutoscalingPoliciesError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  TestIamPermissionsProjectsLocationsAutoscalingPoliciesRequest,
  TestIamPermissionsProjectsLocationsAutoscalingPoliciesResponse,
  TestIamPermissionsProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAutoscalingPoliciesRequest,
  output: TestIamPermissionsProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsAutoscalingPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies/{autoscalingPoliciesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAutoscalingPoliciesRequest>;

export type SetIamPolicyProjectsLocationsAutoscalingPoliciesResponse = Policy;
export const SetIamPolicyProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsAutoscalingPoliciesError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  SetIamPolicyProjectsLocationsAutoscalingPoliciesRequest,
  SetIamPolicyProjectsLocationsAutoscalingPoliciesResponse,
  SetIamPolicyProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsAutoscalingPoliciesRequest,
  output: SetIamPolicyProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name: string;
}

export const DeleteProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies/{autoscalingPoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAutoscalingPoliciesRequest>;

export type DeleteProjectsLocationsAutoscalingPoliciesResponse = Empty;
export const DeleteProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsAutoscalingPoliciesError = DefaultErrors;

/** Deletes an autoscaling policy. It is an error to delete an autoscaling policy that is in use by one or more clusters. */
export const deleteProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  DeleteProjectsLocationsAutoscalingPoliciesRequest,
  DeleteProjectsLocationsAutoscalingPoliciesResponse,
  DeleteProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAutoscalingPoliciesRequest,
  output: DeleteProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Request body */
  body?: AutoscalingPolicy;
}

export const CreateProjectsLocationsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(AutoscalingPolicy).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/autoscalingPolicies",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAutoscalingPoliciesRequest>;

export type CreateProjectsLocationsAutoscalingPoliciesResponse =
  AutoscalingPolicy;
export const CreateProjectsLocationsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoscalingPolicy;

export type CreateProjectsLocationsAutoscalingPoliciesError = DefaultErrors;

/** Creates new autoscaling policy. */
export const createProjectsLocationsAutoscalingPolicies: API.OperationMethod<
  CreateProjectsLocationsAutoscalingPoliciesRequest,
  CreateProjectsLocationsAutoscalingPoliciesResponse,
  CreateProjectsLocationsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAutoscalingPoliciesRequest,
  output: CreateProjectsLocationsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface ListProjectsLocationsBatchesRequest {
  /** Required. The parent, which owns this collection of batches. */
  parent: string;
  /** Optional. A filter for the batches to return in the response.A filter is a logical expression constraining the values of various fields in each batch resource. Filters are case sensitive, and may contain multiple clauses combined with logical operators (AND/OR). Supported fields are batch_id, batch_uuid, state, create_time, and labels.e.g. state = RUNNING and create_time < "2023-01-01T00:00:00Z" filters for batches in state RUNNING that were created before 2023-01-01. state = RUNNING and labels.environment=production filters for batches in state in a RUNNING state that have a production environment label.See https://google.aip.dev/assets/misc/ebnf-filtering.txt for a detailed description of the filter syntax and a list of supported comparisons. */
  filter?: string;
  /** Optional. Field(s) on which to sort the list of batches.Currently the only supported sort orders are unspecified (empty) and create_time desc to sort by most recently created batches first.See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. The maximum number of batches to return in each response. The service may return fewer than this value. The default page size is 20; the maximum page size is 1000. */
  pageSize?: number;
  /** Optional. A page token received from a previous ListBatches call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsBatchesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsBatchesRequest>;

export type ListProjectsLocationsBatchesResponse = ListBatchesResponse;
export const ListProjectsLocationsBatchesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBatchesResponse;

export type ListProjectsLocationsBatchesError = DefaultErrors;

/** Lists batch workloads. */
export const listProjectsLocationsBatches: API.PaginatedOperationMethod<
  ListProjectsLocationsBatchesRequest,
  ListProjectsLocationsBatchesResponse,
  ListProjectsLocationsBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsBatchesRequest,
  output: ListProjectsLocationsBatchesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsBatchesRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID" */
  name: string;
}

export const GetProjectsLocationsBatchesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsBatchesRequest>;

export type GetProjectsLocationsBatchesResponse = Batch;
export const GetProjectsLocationsBatchesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Batch;

export type GetProjectsLocationsBatchesError = DefaultErrors;

/** Gets the batch workload resource representation. */
export const getProjectsLocationsBatches: API.OperationMethod<
  GetProjectsLocationsBatchesRequest,
  GetProjectsLocationsBatchesResponse,
  GetProjectsLocationsBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsBatchesRequest,
  output: GetProjectsLocationsBatchesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsBatchesRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID" */
  name: string;
}

export const DeleteProjectsLocationsBatchesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsBatchesRequest>;

export type DeleteProjectsLocationsBatchesResponse = Empty;
export const DeleteProjectsLocationsBatchesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsBatchesError = DefaultErrors;

/** Deletes the batch workload resource. If the batch is not in a CANCELLED, SUCCEEDED or FAILED State, the delete operation fails and the response returns FAILED_PRECONDITION. */
export const deleteProjectsLocationsBatches: API.OperationMethod<
  DeleteProjectsLocationsBatchesRequest,
  DeleteProjectsLocationsBatchesResponse,
  DeleteProjectsLocationsBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsBatchesRequest,
  output: DeleteProjectsLocationsBatchesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsBatchesRequest {
  /** Optional. A unique ID used to identify the request. If the service receives two CreateBatchRequests with the same request_id, the second request is ignored and the operation that corresponds to the first Batch created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Optional. The ID to use for the batch, which will become the final component of the batch's resource name.This value must be 4-63 characters. Valid characters are /[a-z][0-9]-/. */
  batchId?: string;
  /** Required. The parent resource where this batch will be created. */
  parent: string;
  /** Request body */
  body?: Batch;
}

export const CreateProjectsLocationsBatchesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    batchId: Schema.optional(Schema.String).pipe(T.HttpQuery("batchId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Batch).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsBatchesRequest>;

export type CreateProjectsLocationsBatchesResponse = Operation;
export const CreateProjectsLocationsBatchesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsBatchesError = DefaultErrors;

/** Creates a batch workload that executes asynchronously. */
export const createProjectsLocationsBatches: API.OperationMethod<
  CreateProjectsLocationsBatchesRequest,
  CreateProjectsLocationsBatchesResponse,
  CreateProjectsLocationsBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsBatchesRequest,
  output: CreateProjectsLocationsBatchesResponse,
  errors: [],
}));

export interface AnalyzeProjectsLocationsBatchesRequest {
  /** Required. The fully qualified name of the batch to analyze in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID" */
  name: string;
  /** Request body */
  body?: AnalyzeBatchRequest;
}

export const AnalyzeProjectsLocationsBatchesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(AnalyzeBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}:analyze",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AnalyzeProjectsLocationsBatchesRequest>;

export type AnalyzeProjectsLocationsBatchesResponse = Operation;
export const AnalyzeProjectsLocationsBatchesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type AnalyzeProjectsLocationsBatchesError = DefaultErrors;

/** Analyze a Batch for possible recommendations and insights. */
export const analyzeProjectsLocationsBatches: API.OperationMethod<
  AnalyzeProjectsLocationsBatchesRequest,
  AnalyzeProjectsLocationsBatchesResponse,
  AnalyzeProjectsLocationsBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AnalyzeProjectsLocationsBatchesRequest,
  output: AnalyzeProjectsLocationsBatchesResponse,
  errors: [],
}));

export interface SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. Maximum number of executors to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Required. Stage ID */
  stageId?: string;
  /** Optional. A page token received from a previous AccessSparkApplicationExecutorsList call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. Stage Attempt ID */
  stageAttemptId?: number;
}

export const SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchExecutorStageSummary",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationExecutorStageSummaryResponse;
export const SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationExecutorStageSummaryResponse;

export type SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain executor summary with respect to a spark stage attempt. */
export const searchExecutorStageSummaryProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsRequest,
  SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsResponse,
  SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsRequest,
  output:
    SearchExecutorStageSummaryProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface WriteProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the spark application to write data about in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Request body */
  body?: WriteSparkApplicationContextRequest;
}

export const WriteProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(WriteSparkApplicationContextRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:write",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<WriteProjectsLocationsBatchesSparkApplicationsRequest>;

export type WriteProjectsLocationsBatchesSparkApplicationsResponse =
  WriteSparkApplicationContextResponse;
export const WriteProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ WriteSparkApplicationContextResponse;

export type WriteProjectsLocationsBatchesSparkApplicationsError = DefaultErrors;

/** Write wrapper objects from dataplane to spanner */
export const writeProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  WriteProjectsLocationsBatchesSparkApplicationsRequest,
  WriteProjectsLocationsBatchesSparkApplicationsResponse,
  WriteProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WriteProjectsLocationsBatchesSparkApplicationsRequest,
  output: WriteProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface AccessSqlPlanProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Execution ID */
  executionId?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const AccessSqlPlanProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    executionId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("executionId"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:accessSqlPlan",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessSqlPlanProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessSqlPlanProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationSqlSparkPlanGraphResponse;
export const AccessSqlPlanProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationSqlSparkPlanGraphResponse;

export type AccessSqlPlanProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain Spark Plan Graph for a Spark Application SQL execution. Limits the number of clusters returned as part of the graph to 10000. */
export const accessSqlPlanProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessSqlPlanProjectsLocationsBatchesSparkApplicationsRequest,
  AccessSqlPlanProjectsLocationsBatchesSparkApplicationsResponse,
  AccessSqlPlanProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessSqlPlanProjectsLocationsBatchesSparkApplicationsRequest,
  output: AccessSqlPlanProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface SearchExecutorsProjectsLocationsBatchesSparkApplicationsRequest {
  /** Optional. Maximum number of executors to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. Filter to select whether active/ dead or all executors should be selected. */
  executorStatus?:
    | "EXECUTOR_STATUS_UNSPECIFIED"
    | "EXECUTOR_STATUS_ACTIVE"
    | "EXECUTOR_STATUS_DEAD"
    | (string & {});
  /** Optional. A page token received from a previous AccessSparkApplicationExecutorsList call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const SearchExecutorsProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    executorStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("executorStatus"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchExecutors",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchExecutorsProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchExecutorsProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationExecutorsResponse;
export const SearchExecutorsProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationExecutorsResponse;

export type SearchExecutorsProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to executors for a Spark Application. */
export const searchExecutorsProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchExecutorsProjectsLocationsBatchesSparkApplicationsRequest,
  SearchExecutorsProjectsLocationsBatchesSparkApplicationsResponse,
  SearchExecutorsProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchExecutorsProjectsLocationsBatchesSparkApplicationsRequest,
  output: SearchExecutorsProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchStagesProjectsLocationsBatchesSparkApplicationsRequest {
  /** Optional. List only stages in the given state. */
  stageStatus?:
    | "STAGE_STATUS_UNSPECIFIED"
    | "STAGE_STATUS_ACTIVE"
    | "STAGE_STATUS_COMPLETE"
    | "STAGE_STATUS_FAILED"
    | "STAGE_STATUS_PENDING"
    | "STAGE_STATUS_SKIPPED"
    | (string & {});
  /** Optional. A page token received from a previous FetchSparkApplicationStagesList call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. The list of summary metrics fields to include. Empty list will default to skip all summary metrics fields. Example, if the response should include TaskQuantileMetrics, the request should have task_quantile_metrics in summary_metrics_mask field */
  summaryMetricsMask?: string;
  /** Optional. Maximum number of stages (paging based on stage_id) to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SearchStagesProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stageStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("stageStatus"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    summaryMetricsMask: Schema.optional(Schema.String).pipe(
      T.HttpQuery("summaryMetricsMask"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchStages",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchStagesProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchStagesProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationStagesResponse;
export const SearchStagesProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationStagesResponse;

export type SearchStagesProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to stages for a Spark Application. */
export const searchStagesProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchStagesProjectsLocationsBatchesSparkApplicationsRequest,
  SearchStagesProjectsLocationsBatchesSparkApplicationsResponse,
  SearchStagesProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchStagesProjectsLocationsBatchesSparkApplicationsRequest,
  output: SearchStagesProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchJobsProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. A page token received from a previous SearchSparkApplicationJobs call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Optional. Maximum number of jobs to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. List only jobs in the specific state. */
  jobStatus?:
    | "JOB_EXECUTION_STATUS_UNSPECIFIED"
    | "JOB_EXECUTION_STATUS_RUNNING"
    | "JOB_EXECUTION_STATUS_SUCCEEDED"
    | "JOB_EXECUTION_STATUS_FAILED"
    | "JOB_EXECUTION_STATUS_UNKNOWN"
    | (string & {});
}

export const SearchJobsProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    jobStatus: Schema.optional(Schema.String).pipe(T.HttpQuery("jobStatus")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchJobsProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchJobsProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationJobsResponse;
export const SearchJobsProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationJobsResponse;

export type SearchJobsProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain list of spark jobs corresponding to a Spark Application. */
export const searchJobsProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchJobsProjectsLocationsBatchesSparkApplicationsRequest,
  SearchJobsProjectsLocationsBatchesSparkApplicationsResponse,
  SearchJobsProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchJobsProjectsLocationsBatchesSparkApplicationsRequest,
  output: SearchJobsProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SummarizeStagesProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SummarizeStagesProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:summarizeStages",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeStagesProjectsLocationsBatchesSparkApplicationsRequest>;

export type SummarizeStagesProjectsLocationsBatchesSparkApplicationsResponse =
  SummarizeSparkApplicationStagesResponse;
export const SummarizeStagesProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSparkApplicationStagesResponse;

export type SummarizeStagesProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Stages for a Spark Application */
export const summarizeStagesProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  SummarizeStagesProjectsLocationsBatchesSparkApplicationsRequest,
  SummarizeStagesProjectsLocationsBatchesSparkApplicationsResponse,
  SummarizeStagesProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummarizeStagesProjectsLocationsBatchesSparkApplicationsRequest,
  output: SummarizeStagesProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:accessEnvironmentInfo",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationEnvironmentInfoResponse;
export const AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationEnvironmentInfoResponse;

export type AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain environment details for a Spark Application */
export const accessEnvironmentInfoProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsRequest,
  AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsResponse,
  AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsRequest,
  output:
    AccessEnvironmentInfoProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:summarizeExecutors",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsRequest>;

export type SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsResponse =
  SummarizeSparkApplicationExecutorsResponse;
export const SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSparkApplicationExecutorsResponse;

export type SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Executor Summary for a Spark Application */
export const summarizeExecutorsProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsRequest,
  SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsResponse,
  SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsRequest,
  output: SummarizeExecutorsProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest {
  /** Optional. Stage ID */
  stageId?: string;
  /** Optional. A page token received from a previous ListSparkApplicationStageAttemptTasks call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Sort the tasks by runtime. */
  sortRuntime?: boolean;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. Maximum number of tasks to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. Stage Attempt ID */
  stageAttemptId?: number;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Optional. List only tasks in the state. */
  taskStatus?:
    | "TASK_STATUS_UNSPECIFIED"
    | "TASK_STATUS_RUNNING"
    | "TASK_STATUS_SUCCESS"
    | "TASK_STATUS_FAILED"
    | "TASK_STATUS_KILLED"
    | "TASK_STATUS_PENDING"
    | (string & {});
}

export const SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    sortRuntime: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("sortRuntime"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    taskStatus: Schema.optional(Schema.String).pipe(T.HttpQuery("taskStatus")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchStageAttemptTasks",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationStageAttemptTasksResponse;
export const SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationStageAttemptTasksResponse;

export type SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to tasks for a spark stage attempt for a Spark Application. */
export const searchStageAttemptTasksProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest,
  SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse,
  SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest,
  output:
    SearchStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchProjectsLocationsBatchesSparkApplicationsRequest {
  /** Optional. Latest start timestamp to list. */
  maxTime?: string;
  /** Optional. Search only applications in the chosen state. */
  applicationStatus?:
    | "APPLICATION_STATUS_UNSPECIFIED"
    | "APPLICATION_STATUS_RUNNING"
    | "APPLICATION_STATUS_COMPLETED"
    | (string & {});
  /** Optional. Earliest start timestamp to list. */
  minTime?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID" */
  parent: string;
  /** Optional. Latest end timestamp to list. */
  maxEndTime?: string;
  /** Optional. Earliest end timestamp to list. */
  minEndTime?: string;
  /** Optional. A page token received from a previous SearchSparkApplications call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Maximum number of applications to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
}

export const SearchProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    maxTime: Schema.optional(Schema.String).pipe(T.HttpQuery("maxTime")),
    applicationStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("applicationStatus"),
    ),
    minTime: Schema.optional(Schema.String).pipe(T.HttpQuery("minTime")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    maxEndTime: Schema.optional(Schema.String).pipe(T.HttpQuery("maxEndTime")),
    minEndTime: Schema.optional(Schema.String).pipe(T.HttpQuery("minEndTime")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications:search",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationsResponse;
export const SearchProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationsResponse;

export type SearchProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain high level information and list of Spark Applications corresponding to a batch */
export const searchProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchProjectsLocationsBatchesSparkApplicationsRequest,
  SearchProjectsLocationsBatchesSparkApplicationsResponse,
  SearchProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchProjectsLocationsBatchesSparkApplicationsRequest,
  output: SearchProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. Stage Attempt ID */
  stageAttemptId?: number;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Stage ID */
  stageId?: string;
}

export const SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:summarizeStageAttemptTasks",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest>;

export type SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse =
  SummarizeSparkApplicationStageAttemptTasksResponse;
export const SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSparkApplicationStageAttemptTasksResponse;

export type SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Tasks for a Spark Application Stage Attempt */
export const summarizeStageAttemptTasksProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest,
  SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse,
  SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsRequest,
  output:
    SummarizeStageAttemptTasksProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface AccessProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:access",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationResponse;
export const AccessProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationResponse;

export type AccessProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain high level information corresponding to a single Spark Application. */
export const accessProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessProjectsLocationsBatchesSparkApplicationsRequest,
  AccessProjectsLocationsBatchesSparkApplicationsResponse,
  AccessProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessProjectsLocationsBatchesSparkApplicationsRequest,
  output: AccessProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsRequest {
  /** Optional. A page token received from a previous SearchSparkApplicationSqlQueries call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Lists/ hides details of Spark plan nodes. True is set to list and false to hide. */
  details?: boolean;
  /** Optional. Maximum number of queries to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. Enables/ disables physical plan description on demand */
  planDescription?: boolean;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    details: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("details")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
    planDescription: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("planDescription"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchSqlQueries",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationSqlQueriesResponse;
export const SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationSqlQueriesResponse;

export type SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to SQL Queries for a Spark Application. */
export const searchSqlQueriesProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsRequest,
  SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsResponse,
  SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsRequest,
  output: SearchSqlQueriesProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AccessJobProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Job ID to fetch data for. */
  jobId?: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const AccessJobProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    jobId: Schema.optional(Schema.String).pipe(T.HttpQuery("jobId")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:accessJob",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessJobProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessJobProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationJobResponse;
export const AccessJobProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationJobResponse;

export type AccessJobProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a spark job for a Spark Application. */
export const accessJobProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessJobProjectsLocationsBatchesSparkApplicationsRequest,
  AccessJobProjectsLocationsBatchesSparkApplicationsResponse,
  AccessJobProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessJobProjectsLocationsBatchesSparkApplicationsRequest,
  output: AccessJobProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface AccessSqlQueryProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Execution ID */
  executionId?: string;
  /** Optional. Enables/ disables physical plan description on demand */
  planDescription?: boolean;
  /** Optional. Lists/ hides details of Spark plan nodes. True is set to list and false to hide. */
  details?: boolean;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const AccessSqlQueryProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    executionId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("executionId"),
    ),
    planDescription: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("planDescription"),
    ),
    details: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("details")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:accessSqlQuery",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessSqlQueryProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessSqlQueryProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationSqlQueryResponse;
export const AccessSqlQueryProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationSqlQueryResponse;

export type AccessSqlQueryProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a particular SQL Query for a Spark Application. */
export const accessSqlQueryProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessSqlQueryProjectsLocationsBatchesSparkApplicationsRequest,
  AccessSqlQueryProjectsLocationsBatchesSparkApplicationsResponse,
  AccessSqlQueryProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessSqlQueryProjectsLocationsBatchesSparkApplicationsRequest,
  output: AccessSqlQueryProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Stage ID */
  stageId?: string;
}

export const AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:accessStageRddGraph",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationStageRddOperationGraphResponse;
export const AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationStageRddOperationGraphResponse;

export type AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain RDD operation graph for a Spark Application Stage. Limits the number of clusters returned as part of the graph to 10000. */
export const accessStageRddGraphProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsRequest,
  AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsResponse,
  AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsRequest,
  output: AccessStageRddGraphProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface AccessStageAttemptProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. Stage ID */
  stageId?: string;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. The list of summary metrics fields to include. Empty list will default to skip all summary metrics fields. Example, if the response should include TaskQuantileMetrics, the request should have task_quantile_metrics in summary_metrics_mask field */
  summaryMetricsMask?: string;
  /** Required. Stage Attempt ID */
  stageAttemptId?: number;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const AccessStageAttemptProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    name: Schema.String.pipe(T.HttpPath("name")),
    summaryMetricsMask: Schema.optional(Schema.String).pipe(
      T.HttpQuery("summaryMetricsMask"),
    ),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:accessStageAttempt",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessStageAttemptProjectsLocationsBatchesSparkApplicationsRequest>;

export type AccessStageAttemptProjectsLocationsBatchesSparkApplicationsResponse =
  AccessSparkApplicationStageAttemptResponse;
export const AccessStageAttemptProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSparkApplicationStageAttemptResponse;

export type AccessStageAttemptProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a spark stage attempt for a Spark Application. */
export const accessStageAttemptProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  AccessStageAttemptProjectsLocationsBatchesSparkApplicationsRequest,
  AccessStageAttemptProjectsLocationsBatchesSparkApplicationsResponse,
  AccessStageAttemptProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessStageAttemptProjectsLocationsBatchesSparkApplicationsRequest,
  output: AccessStageAttemptProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsRequest {
  /** Optional. The list of summary metrics fields to include. Empty list will default to skip all summary metrics fields. Example, if the response should include TaskQuantileMetrics, the request should have task_quantile_metrics in summary_metrics_mask field */
  summaryMetricsMask?: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
  /** Optional. A page token received from a previous SearchSparkApplicationStageAttempts call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. Stage ID for which attempts are to be fetched */
  stageId?: string;
  /** Optional. Maximum number of stage attempts (paging based on stage_attempt_id) to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    summaryMetricsMask: Schema.optional(Schema.String).pipe(
      T.HttpQuery("summaryMetricsMask"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:searchStageAttempts",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsRequest>;

export type SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsResponse =
  SearchSparkApplicationStageAttemptsResponse;
export const SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSparkApplicationStageAttemptsResponse;

export type SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a spark stage attempts for a Spark Application. */
export const searchStageAttemptsProjectsLocationsBatchesSparkApplications: API.PaginatedOperationMethod<
  SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsRequest,
  SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsResponse,
  SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsRequest,
  output: SearchStageAttemptsProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SummarizeJobsProjectsLocationsBatchesSparkApplicationsRequest {
  /** Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Batch) resource reference. */
  parent?: string;
}

export const SummarizeJobsProjectsLocationsBatchesSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/batches/{batchesId}/sparkApplications/{sparkApplicationsId}:summarizeJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeJobsProjectsLocationsBatchesSparkApplicationsRequest>;

export type SummarizeJobsProjectsLocationsBatchesSparkApplicationsResponse =
  SummarizeSparkApplicationJobsResponse;
export const SummarizeJobsProjectsLocationsBatchesSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSparkApplicationJobsResponse;

export type SummarizeJobsProjectsLocationsBatchesSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Jobs for a Spark Application */
export const summarizeJobsProjectsLocationsBatchesSparkApplications: API.OperationMethod<
  SummarizeJobsProjectsLocationsBatchesSparkApplicationsRequest,
  SummarizeJobsProjectsLocationsBatchesSparkApplicationsResponse,
  SummarizeJobsProjectsLocationsBatchesSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummarizeJobsProjectsLocationsBatchesSparkApplicationsRequest,
  output: SummarizeJobsProjectsLocationsBatchesSparkApplicationsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsWorkflowTemplatesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsWorkflowTemplatesRequest>;

export type TestIamPermissionsProjectsLocationsWorkflowTemplatesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsWorkflowTemplatesError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsWorkflowTemplates: API.OperationMethod<
  TestIamPermissionsProjectsLocationsWorkflowTemplatesRequest,
  TestIamPermissionsProjectsLocationsWorkflowTemplatesResponse,
  TestIamPermissionsProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsWorkflowTemplatesRequest,
  output: TestIamPermissionsProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkflowTemplatesRequest {
  /** Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version. */
  version?: number;
  /** Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
}

export const GetProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    version: Schema.optional(Schema.Number).pipe(T.HttpQuery("version")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkflowTemplatesRequest>;

export type GetProjectsLocationsWorkflowTemplatesResponse = WorkflowTemplate;
export const GetProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkflowTemplate;

export type GetProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Retrieves the latest workflow template.Can retrieve previously instantiated template by specifying optional version parameter. */
export const getProjectsLocationsWorkflowTemplates: API.OperationMethod<
  GetProjectsLocationsWorkflowTemplatesRequest,
  GetProjectsLocationsWorkflowTemplatesResponse,
  GetProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsWorkflowTemplatesRequest,
  output: GetProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsWorkflowTemplatesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsWorkflowTemplatesRequest>;

export type GetIamPolicyProjectsLocationsWorkflowTemplatesResponse = Policy;
export const GetIamPolicyProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsWorkflowTemplates: API.OperationMethod<
  GetIamPolicyProjectsLocationsWorkflowTemplatesRequest,
  GetIamPolicyProjectsLocationsWorkflowTemplatesResponse,
  GetIamPolicyProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsWorkflowTemplatesRequest,
  output: GetIamPolicyProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkflowTemplatesRequest {
  /** Optional. The page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Optional. The maximum number of results to return in each response. */
  pageSize?: number;
  /** Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
}

export const ListProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkflowTemplatesRequest>;

export type ListProjectsLocationsWorkflowTemplatesResponse =
  ListWorkflowTemplatesResponse;
export const ListProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListWorkflowTemplatesResponse;

export type ListProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Lists workflows that match the specified filter in the request. */
export const listProjectsLocationsWorkflowTemplates: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkflowTemplatesRequest,
  ListProjectsLocationsWorkflowTemplatesResponse,
  ListProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsWorkflowTemplatesRequest,
  output: ListProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsWorkflowTemplatesRequest {
  /** Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Request body */
  body?: WorkflowTemplate;
}

export const CreateProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(WorkflowTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkflowTemplatesRequest>;

export type CreateProjectsLocationsWorkflowTemplatesResponse = WorkflowTemplate;
export const CreateProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkflowTemplate;

export type CreateProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Creates new workflow template. */
export const createProjectsLocationsWorkflowTemplates: API.OperationMethod<
  CreateProjectsLocationsWorkflowTemplatesRequest,
  CreateProjectsLocationsWorkflowTemplatesResponse,
  CreateProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsWorkflowTemplatesRequest,
  output: CreateProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface InstantiateProjectsLocationsWorkflowTemplatesRequest {
  /** Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
  /** Request body */
  body?: InstantiateWorkflowTemplateRequest;
}

export const InstantiateProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(InstantiateWorkflowTemplateRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}:instantiate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InstantiateProjectsLocationsWorkflowTemplatesRequest>;

export type InstantiateProjectsLocationsWorkflowTemplatesResponse = Operation;
export const InstantiateProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type InstantiateProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Instantiates a template and begins execution.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty. */
export const instantiateProjectsLocationsWorkflowTemplates: API.OperationMethod<
  InstantiateProjectsLocationsWorkflowTemplatesRequest,
  InstantiateProjectsLocationsWorkflowTemplatesResponse,
  InstantiateProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InstantiateProjectsLocationsWorkflowTemplatesRequest,
  output: InstantiateProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsWorkflowTemplatesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsWorkflowTemplatesRequest>;

export type SetIamPolicyProjectsLocationsWorkflowTemplatesResponse = Policy;
export const SetIamPolicyProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsLocationsWorkflowTemplates: API.OperationMethod<
  SetIamPolicyProjectsLocationsWorkflowTemplatesRequest,
  SetIamPolicyProjectsLocationsWorkflowTemplatesResponse,
  SetIamPolicyProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsWorkflowTemplatesRequest,
  output: SetIamPolicyProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkflowTemplatesRequest {
  /** Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version. */
  version?: number;
  /** Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
}

export const DeleteProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    version: Schema.optional(Schema.Number).pipe(T.HttpQuery("version")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkflowTemplatesRequest>;

export type DeleteProjectsLocationsWorkflowTemplatesResponse = Empty;
export const DeleteProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Deletes a workflow template. It does not cancel in-progress workflows. */
export const deleteProjectsLocationsWorkflowTemplates: API.OperationMethod<
  DeleteProjectsLocationsWorkflowTemplatesRequest,
  DeleteProjectsLocationsWorkflowTemplatesResponse,
  DeleteProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsWorkflowTemplatesRequest,
  output: DeleteProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface InstantiateInlineProjectsLocationsWorkflowTemplatesRequest {
  /** Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: WorkflowTemplate;
}

export const InstantiateInlineProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(WorkflowTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates:instantiateInline",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InstantiateInlineProjectsLocationsWorkflowTemplatesRequest>;

export type InstantiateInlineProjectsLocationsWorkflowTemplatesResponse =
  Operation;
export const InstantiateInlineProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type InstantiateInlineProjectsLocationsWorkflowTemplatesError =
  DefaultErrors;

/** Instantiates a template and begins execution.This method is equivalent to executing the sequence CreateWorkflowTemplate, InstantiateWorkflowTemplate, DeleteWorkflowTemplate.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty. */
export const instantiateInlineProjectsLocationsWorkflowTemplates: API.OperationMethod<
  InstantiateInlineProjectsLocationsWorkflowTemplatesRequest,
  InstantiateInlineProjectsLocationsWorkflowTemplatesResponse,
  InstantiateInlineProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InstantiateInlineProjectsLocationsWorkflowTemplatesRequest,
  output: InstantiateInlineProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface UpdateProjectsLocationsWorkflowTemplatesRequest {
  /** Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
  /** Request body */
  body?: WorkflowTemplate;
}

export const UpdateProjectsLocationsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(WorkflowTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflowTemplates/{workflowTemplatesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateProjectsLocationsWorkflowTemplatesRequest>;

export type UpdateProjectsLocationsWorkflowTemplatesResponse = WorkflowTemplate;
export const UpdateProjectsLocationsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkflowTemplate;

export type UpdateProjectsLocationsWorkflowTemplatesError = DefaultErrors;

/** Updates (replaces) workflow template. The updated template must contain version that matches the current server version. */
export const updateProjectsLocationsWorkflowTemplates: API.OperationMethod<
  UpdateProjectsLocationsWorkflowTemplatesRequest,
  UpdateProjectsLocationsWorkflowTemplatesResponse,
  UpdateProjectsLocationsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProjectsLocationsWorkflowTemplatesRequest,
  output: UpdateProjectsLocationsWorkflowTemplatesResponse,
  errors: [],
}));

export interface GetProjectsLocationsSessionsRequest {
  /** Required. The name of the session to retrieve. */
  name: string;
}

export const GetProjectsLocationsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSessionsRequest>;

export type GetProjectsLocationsSessionsResponse = Session;
export const GetProjectsLocationsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Session;

export type GetProjectsLocationsSessionsError = DefaultErrors;

/** Gets the resource representation for an interactive session. */
export const getProjectsLocationsSessions: API.OperationMethod<
  GetProjectsLocationsSessionsRequest,
  GetProjectsLocationsSessionsResponse,
  GetProjectsLocationsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSessionsRequest,
  output: GetProjectsLocationsSessionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSessionsRequest {
  /** Required. The ID to use for the session, which becomes the final component of the session's resource name.This value must be 4-63 characters. Valid characters are /a-z-/. */
  sessionId?: string;
  /** Required. The parent resource where this session will be created. */
  parent: string;
  /** Optional. A unique ID used to identify the request. If the service receives two CreateSessionRequests (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateSessionRequest)s with the same ID, the second request is ignored, and the first Session is created and stored in the backend.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: Session;
}

export const CreateProjectsLocationsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sessionId: Schema.optional(Schema.String).pipe(T.HttpQuery("sessionId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Session).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSessionsRequest>;

export type CreateProjectsLocationsSessionsResponse = Operation;
export const CreateProjectsLocationsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSessionsError = DefaultErrors;

/** Create an interactive session asynchronously. */
export const createProjectsLocationsSessions: API.OperationMethod<
  CreateProjectsLocationsSessionsRequest,
  CreateProjectsLocationsSessionsResponse,
  CreateProjectsLocationsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSessionsRequest,
  output: CreateProjectsLocationsSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSessionsRequest {
  /** Optional. A filter for the sessions to return in the response.A filter is a logical expression constraining the values of various fields in each session resource. Filters are case sensitive, and may contain multiple clauses combined with logical operators (AND, OR). Supported fields are session_id, session_uuid, state, create_time, and labels.Example: state = ACTIVE and create_time < "2023-01-01T00:00:00Z" is a filter for sessions in an ACTIVE state that were created before 2023-01-01. state = ACTIVE and labels.environment=production is a filter for sessions in an ACTIVE state that have a production environment label.See https://google.aip.dev/assets/misc/ebnf-filtering.txt for a detailed description of the filter syntax and a list of supported comparators. */
  filter?: string;
  /** Optional. A page token received from a previous ListSessions call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of sessions. */
  parent: string;
  /** Optional. The maximum number of sessions to return in each response. The service may return fewer than this value. */
  pageSize?: number;
}

export const ListProjectsLocationsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSessionsRequest>;

export type ListProjectsLocationsSessionsResponse = ListSessionsResponse;
export const ListProjectsLocationsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSessionsResponse;

export type ListProjectsLocationsSessionsError = DefaultErrors;

/** Lists interactive sessions. */
export const listProjectsLocationsSessions: API.PaginatedOperationMethod<
  ListProjectsLocationsSessionsRequest,
  ListProjectsLocationsSessionsResponse,
  ListProjectsLocationsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSessionsRequest,
  output: ListProjectsLocationsSessionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsSessionsRequest {
  /** Required. The name of the session resource to delete. */
  name: string;
  /** Optional. A unique ID used to identify the request. If the service receives two DeleteSessionRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.DeleteSessionRequest)s with the same ID, the second request is ignored.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const DeleteProjectsLocationsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSessionsRequest>;

export type DeleteProjectsLocationsSessionsResponse = Operation;
export const DeleteProjectsLocationsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsSessionsError = DefaultErrors;

/** Deletes the interactive session resource. If the session is not in terminal state, it is terminated, and then deleted. */
export const deleteProjectsLocationsSessions: API.OperationMethod<
  DeleteProjectsLocationsSessionsRequest,
  DeleteProjectsLocationsSessionsResponse,
  DeleteProjectsLocationsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSessionsRequest,
  output: DeleteProjectsLocationsSessionsResponse,
  errors: [],
}));

export interface TerminateProjectsLocationsSessionsRequest {
  /** Required. The name of the session resource to terminate. */
  name: string;
  /** Request body */
  body?: TerminateSessionRequest;
}

export const TerminateProjectsLocationsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(TerminateSessionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}:terminate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TerminateProjectsLocationsSessionsRequest>;

export type TerminateProjectsLocationsSessionsResponse = Operation;
export const TerminateProjectsLocationsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type TerminateProjectsLocationsSessionsError = DefaultErrors;

/** Terminates the interactive session. */
export const terminateProjectsLocationsSessions: API.OperationMethod<
  TerminateProjectsLocationsSessionsRequest,
  TerminateProjectsLocationsSessionsResponse,
  TerminateProjectsLocationsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TerminateProjectsLocationsSessionsRequest,
  output: TerminateProjectsLocationsSessionsResponse,
  errors: [],
}));

export interface SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. List only tasks in the state. */
  taskStatus?:
    | "TASK_STATUS_UNSPECIFIED"
    | "TASK_STATUS_RUNNING"
    | "TASK_STATUS_SUCCESS"
    | "TASK_STATUS_FAILED"
    | "TASK_STATUS_KILLED"
    | "TASK_STATUS_PENDING"
    | (string & {});
  /** Optional. A page token received from a previous SearchSessionSparkApplicationStageAttemptTasks call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Stage ID */
  stageId?: string;
  /** Optional. Stage Attempt ID */
  stageAttemptId?: number;
  /** Optional. Sort the tasks by runtime. */
  sortRuntime?: boolean;
  /** Optional. Maximum number of tasks to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    taskStatus: Schema.optional(Schema.String).pipe(T.HttpQuery("taskStatus")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    sortRuntime: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("sortRuntime"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchStageAttemptTasks",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationStageAttemptTasksResponse;
export const SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationStageAttemptTasksResponse;

export type SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to tasks for a spark stage attempt for a Spark Application. */
export const searchStageAttemptTasksProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest,
  SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse,
  SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest,
  output:
    SearchStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. Stage ID */
  stageId?: string;
  /** Required. Stage Attempt ID */
  stageAttemptId?: number;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:summarizeStageAttemptTasks",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest>;

export type SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse =
  SummarizeSessionSparkApplicationStageAttemptTasksResponse;
export const SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSessionSparkApplicationStageAttemptTasksResponse;

export type SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Tasks for a Spark Application Stage Attempt */
export const summarizeStageAttemptTasksProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest,
  SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse,
  SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsRequest,
  output:
    SummarizeStageAttemptTasksProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. A page token received from a previous SearchSessionSparkApplicationStageAttempts call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. Maximum number of stage attempts (paging based on stage_attempt_id) to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. The list of summary metrics fields to include. Empty list will default to skip all summary metrics fields. Example, if the response should include TaskQuantileMetrics, the request should have task_quantile_metrics in summary_metrics_mask field */
  summaryMetricsMask?: string;
  /** Required. Stage ID for which attempts are to be fetched */
  stageId?: string;
}

export const SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    summaryMetricsMask: Schema.optional(Schema.String).pipe(
      T.HttpQuery("summaryMetricsMask"),
    ),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchStageAttempts",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationStageAttemptsResponse;
export const SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationStageAttemptsResponse;

export type SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a spark stage attempts for a Spark Application. */
export const searchStageAttemptsProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsRequest,
  SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsResponse,
  SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsRequest,
  output: SearchStageAttemptsProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchJobsProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. Maximum number of jobs to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. A page token received from a previous SearchSessionSparkApplicationJobs call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. List of Job IDs to filter by if provided. */
  jobIds?: string[];
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Optional. List only jobs in the specific state. */
  jobStatus?:
    | "JOB_EXECUTION_STATUS_UNSPECIFIED"
    | "JOB_EXECUTION_STATUS_RUNNING"
    | "JOB_EXECUTION_STATUS_SUCCEEDED"
    | "JOB_EXECUTION_STATUS_FAILED"
    | "JOB_EXECUTION_STATUS_UNKNOWN"
    | (string & {});
}

export const SearchJobsProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
    jobIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("jobIds"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    jobStatus: Schema.optional(Schema.String).pipe(T.HttpQuery("jobStatus")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchJobsProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchJobsProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationJobsResponse;
export const SearchJobsProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationJobsResponse;

export type SearchJobsProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain list of spark jobs corresponding to a Spark Application. */
export const searchJobsProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchJobsProjectsLocationsSessionsSparkApplicationsRequest,
  SearchJobsProjectsLocationsSessionsSparkApplicationsResponse,
  SearchJobsProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchJobsProjectsLocationsSessionsSparkApplicationsRequest,
  output: SearchJobsProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:summarizeExecutors",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsRequest>;

export type SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsResponse =
  SummarizeSessionSparkApplicationExecutorsResponse;
export const SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSessionSparkApplicationExecutorsResponse;

export type SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Executor Summary for a Spark Application */
export const summarizeExecutorsProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsRequest,
  SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsResponse,
  SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsRequest,
  output: SummarizeExecutorsProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. Enables/ disables physical plan description on demand */
  planDescription?: boolean;
  /** Optional. A page token received from a previous SearchSessionSparkApplicationSqlQueries call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Maximum number of queries to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. Lists/ hides details of Spark plan nodes. True is set to list and false to hide. */
  details?: boolean;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Optional. List of Spark Connect operation IDs to filter by if provided. */
  operationIds?: string[];
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    planDescription: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("planDescription"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    details: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("details")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    operationIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("operationIds"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchSqlQueries",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationSqlQueriesResponse;
export const SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationSqlQueriesResponse;

export type SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to SQL Queries for a Spark Application. */
export const searchSqlQueriesProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsRequest,
  SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsResponse,
  SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsRequest,
  output: SearchSqlQueriesProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AccessJobProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. Job ID to fetch data for. */
  jobId?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessJobProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    jobId: Schema.optional(Schema.String).pipe(T.HttpQuery("jobId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:accessJob",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessJobProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessJobProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationJobResponse;
export const AccessJobProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationJobResponse;

export type AccessJobProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a spark job for a Spark Application. */
export const accessJobProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessJobProjectsLocationsSessionsSparkApplicationsRequest,
  AccessJobProjectsLocationsSessionsSparkApplicationsResponse,
  AccessJobProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessJobProjectsLocationsSessionsSparkApplicationsRequest,
  output: AccessJobProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface SearchProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. Latest end timestamp to list. */
  maxEndTime?: string;
  /** Optional. Maximum number of applications to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID" */
  parent: string;
  /** Optional. Latest start timestamp to list. */
  maxTime?: string;
  /** Optional. Search only applications in the chosen state. */
  applicationStatus?:
    | "APPLICATION_STATUS_UNSPECIFIED"
    | "APPLICATION_STATUS_RUNNING"
    | "APPLICATION_STATUS_COMPLETED"
    | (string & {});
  /** Optional. A page token received from a previous SearchSessionSparkApplications call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Earliest end timestamp to list. */
  minEndTime?: string;
  /** Optional. Earliest start timestamp to list. */
  minTime?: string;
}

export const SearchProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    maxEndTime: Schema.optional(Schema.String).pipe(T.HttpQuery("maxEndTime")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    maxTime: Schema.optional(Schema.String).pipe(T.HttpQuery("maxTime")),
    applicationStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("applicationStatus"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    minEndTime: Schema.optional(Schema.String).pipe(T.HttpQuery("minEndTime")),
    minTime: Schema.optional(Schema.String).pipe(T.HttpQuery("minTime")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications:search",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationsResponse;
export const SearchProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationsResponse;

export type SearchProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain high level information and list of Spark Applications corresponding to a batch */
export const searchProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchProjectsLocationsSessionsSparkApplicationsRequest,
  SearchProjectsLocationsSessionsSparkApplicationsResponse,
  SearchProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchProjectsLocationsSessionsSparkApplicationsRequest,
  output: SearchProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AccessSqlPlanProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Execution ID */
  executionId?: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessSqlPlanProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    executionId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("executionId"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:accessSqlPlan",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessSqlPlanProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessSqlPlanProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationSqlSparkPlanGraphResponse;
export const AccessSqlPlanProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationSqlSparkPlanGraphResponse;

export type AccessSqlPlanProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain Spark Plan Graph for a Spark Application SQL execution. Limits the number of clusters returned as part of the graph to 10000. */
export const accessSqlPlanProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessSqlPlanProjectsLocationsSessionsSparkApplicationsRequest,
  AccessSqlPlanProjectsLocationsSessionsSparkApplicationsResponse,
  AccessSqlPlanProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessSqlPlanProjectsLocationsSessionsSparkApplicationsRequest,
  output: AccessSqlPlanProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface SummarizeJobsProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. List of Job IDs to filter by if provided. */
  jobIds?: string[];
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
}

export const SummarizeJobsProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("jobIds"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:summarizeJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeJobsProjectsLocationsSessionsSparkApplicationsRequest>;

export type SummarizeJobsProjectsLocationsSessionsSparkApplicationsResponse =
  SummarizeSessionSparkApplicationJobsResponse;
export const SummarizeJobsProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSessionSparkApplicationJobsResponse;

export type SummarizeJobsProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Jobs for a Spark Application */
export const summarizeJobsProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  SummarizeJobsProjectsLocationsSessionsSparkApplicationsRequest,
  SummarizeJobsProjectsLocationsSessionsSparkApplicationsResponse,
  SummarizeJobsProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummarizeJobsProjectsLocationsSessionsSparkApplicationsRequest,
  output: SummarizeJobsProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface AccessSqlQueryProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Execution ID */
  executionId?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Optional. Enables/ disables physical plan description on demand */
  planDescription?: boolean;
  /** Optional. Lists/ hides details of Spark plan nodes. True is set to list and false to hide. */
  details?: boolean;
}

export const AccessSqlQueryProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    executionId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("executionId"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    planDescription: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("planDescription"),
    ),
    details: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("details")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:accessSqlQuery",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessSqlQueryProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessSqlQueryProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationSqlQueryResponse;
export const AccessSqlQueryProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationSqlQueryResponse;

export type AccessSqlQueryProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a particular SQL Query for a Spark Application. */
export const accessSqlQueryProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessSqlQueryProjectsLocationsSessionsSparkApplicationsRequest,
  AccessSqlQueryProjectsLocationsSessionsSparkApplicationsResponse,
  AccessSqlQueryProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessSqlQueryProjectsLocationsSessionsSparkApplicationsRequest,
  output: AccessSqlQueryProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface WriteProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. The fully qualified name of the spark application to write data about in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Request body */
  body?: WriteSessionSparkApplicationContextRequest;
}

export const WriteProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(WriteSessionSparkApplicationContextRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:write",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<WriteProjectsLocationsSessionsSparkApplicationsRequest>;

export type WriteProjectsLocationsSessionsSparkApplicationsResponse =
  WriteSessionSparkApplicationContextResponse;
export const WriteProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ WriteSessionSparkApplicationContextResponse;

export type WriteProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Write wrapper objects from dataplane to spanner */
export const writeProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  WriteProjectsLocationsSessionsSparkApplicationsRequest,
  WriteProjectsLocationsSessionsSparkApplicationsResponse,
  WriteProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WriteProjectsLocationsSessionsSparkApplicationsRequest,
  output: WriteProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface AccessProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:access",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationResponse;
export const AccessProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationResponse;

export type AccessProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain high level information corresponding to a single Spark Application. */
export const accessProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessProjectsLocationsSessionsSparkApplicationsRequest,
  AccessProjectsLocationsSessionsSparkApplicationsResponse,
  AccessProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessProjectsLocationsSessionsSparkApplicationsRequest,
  output: AccessProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface SearchStagesProjectsLocationsSessionsSparkApplicationsRequest {
  /** Optional. List only stages in the given state. */
  stageStatus?:
    | "STAGE_STATUS_UNSPECIFIED"
    | "STAGE_STATUS_ACTIVE"
    | "STAGE_STATUS_COMPLETE"
    | "STAGE_STATUS_FAILED"
    | "STAGE_STATUS_PENDING"
    | "STAGE_STATUS_SKIPPED"
    | (string & {});
  /** Optional. List of Stage IDs to filter by if provided. */
  stageIds?: string[];
  /** Optional. A page token received from a previous SearchSessionSparkApplicationStages call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. The list of summary metrics fields to include. Empty list will default to skip all summary metrics fields. Example, if the response should include TaskQuantileMetrics, the request should have task_quantile_metrics in summary_metrics_mask field */
  summaryMetricsMask?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Optional. Maximum number of stages (paging based on stage_id) to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
}

export const SearchStagesProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stageStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("stageStatus"),
    ),
    stageIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("stageIds"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    summaryMetricsMask: Schema.optional(Schema.String).pipe(
      T.HttpQuery("summaryMetricsMask"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchStages",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchStagesProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchStagesProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationStagesResponse;
export const SearchStagesProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationStagesResponse;

export type SearchStagesProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to stages for a Spark Application. */
export const searchStagesProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchStagesProjectsLocationsSessionsSparkApplicationsRequest,
  SearchStagesProjectsLocationsSessionsSparkApplicationsResponse,
  SearchStagesProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchStagesProjectsLocationsSessionsSparkApplicationsRequest,
  output: SearchStagesProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SummarizeStagesProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. List of Stage IDs to filter by if provided. */
  stageIds?: string[];
  /** Required. Parent (Session) resource reference. */
  parent?: string;
}

export const SummarizeStagesProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    stageIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("stageIds"),
    ),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:summarizeStages",
    }),
    svc,
  ) as unknown as Schema.Schema<SummarizeStagesProjectsLocationsSessionsSparkApplicationsRequest>;

export type SummarizeStagesProjectsLocationsSessionsSparkApplicationsResponse =
  SummarizeSessionSparkApplicationStagesResponse;
export const SummarizeStagesProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SummarizeSessionSparkApplicationStagesResponse;

export type SummarizeStagesProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain summary of Stages for a Spark Application */
export const summarizeStagesProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  SummarizeStagesProjectsLocationsSessionsSparkApplicationsRequest,
  SummarizeStagesProjectsLocationsSessionsSparkApplicationsResponse,
  SummarizeStagesProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummarizeStagesProjectsLocationsSessionsSparkApplicationsRequest,
  output: SummarizeStagesProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. Stage ID */
  stageId?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:accessStageRddGraph",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationStageRddOperationGraphResponse;
export const AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationStageRddOperationGraphResponse;

export type AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain RDD operation graph for a Spark Application Stage. Limits the number of clusters returned as part of the graph to 10000. */
export const accessStageRddGraphProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsRequest,
  AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsResponse,
  AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsRequest,
  output: AccessStageRddGraphProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface AccessStageAttemptProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Stage ID */
  stageId?: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. Stage Attempt ID */
  stageAttemptId?: number;
  /** Optional. The list of summary metrics fields to include. Empty list will default to skip all summary metrics fields. Example, if the response should include TaskQuantileMetrics, the request should have task_quantile_metrics in summary_metrics_mask field */
  summaryMetricsMask?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessStageAttemptProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    summaryMetricsMask: Schema.optional(Schema.String).pipe(
      T.HttpQuery("summaryMetricsMask"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:accessStageAttempt",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessStageAttemptProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessStageAttemptProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationStageAttemptResponse;
export const AccessStageAttemptProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationStageAttemptResponse;

export type AccessStageAttemptProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to a spark stage attempt for a Spark Application. */
export const accessStageAttemptProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessStageAttemptProjectsLocationsSessionsSparkApplicationsRequest,
  AccessStageAttemptProjectsLocationsSessionsSparkApplicationsResponse,
  AccessStageAttemptProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessStageAttemptProjectsLocationsSessionsSparkApplicationsRequest,
  output: AccessStageAttemptProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Required. Stage ID */
  stageId?: string;
  /** Required. Stage Attempt ID */
  stageAttemptId?: number;
  /** Optional. A page token received from a previous SearchSessionSparkApplicationExecutorStageSummary call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Optional. Maximum number of executors to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
}

export const SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    stageId: Schema.optional(Schema.String).pipe(T.HttpQuery("stageId")),
    stageAttemptId: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("stageAttemptId"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchExecutorStageSummary",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationExecutorStageSummaryResponse;
export const SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationExecutorStageSummaryResponse;

export type SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain executor summary with respect to a spark stage attempt. */
export const searchExecutorStageSummaryProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsRequest,
  SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsResponse,
  SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input:
    SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsRequest,
  output:
    SearchExecutorStageSummaryProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchExecutorsProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
  /** Optional. Filter to select whether active/ dead or all executors should be selected. */
  executorStatus?:
    | "EXECUTOR_STATUS_UNSPECIFIED"
    | "EXECUTOR_STATUS_ACTIVE"
    | "EXECUTOR_STATUS_DEAD"
    | (string & {});
  /** Optional. Maximum number of executors to return in each response. The service may return fewer than this. The default page size is 10; the maximum page size is 100. */
  pageSize?: number;
  /** Optional. A page token received from a previous SearchSessionSparkApplicationExecutors call. Provide this token to retrieve the subsequent page. */
  pageToken?: string;
}

export const SearchExecutorsProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
    executorStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("executorStatus"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:searchExecutors",
    }),
    svc,
  ) as unknown as Schema.Schema<SearchExecutorsProjectsLocationsSessionsSparkApplicationsRequest>;

export type SearchExecutorsProjectsLocationsSessionsSparkApplicationsResponse =
  SearchSessionSparkApplicationExecutorsResponse;
export const SearchExecutorsProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchSessionSparkApplicationExecutorsResponse;

export type SearchExecutorsProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain data corresponding to executors for a Spark Application. */
export const searchExecutorsProjectsLocationsSessionsSparkApplications: API.PaginatedOperationMethod<
  SearchExecutorsProjectsLocationsSessionsSparkApplicationsRequest,
  SearchExecutorsProjectsLocationsSessionsSparkApplicationsResponse,
  SearchExecutorsProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchExecutorsProjectsLocationsSessionsSparkApplicationsRequest,
  output: SearchExecutorsProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsRequest {
  /** Required. Parent (Session) resource reference. */
  parent?: string;
  /** Required. The fully qualified name of the session to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/sessions/SESSION_ID/sparkApplications/APPLICATION_ID" */
  name: string;
}

export const AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/sessions/{sessionsId}/sparkApplications/{sparkApplicationsId}:accessEnvironmentInfo",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsRequest>;

export type AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsResponse =
  AccessSessionSparkApplicationEnvironmentInfoResponse;
export const AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSessionSparkApplicationEnvironmentInfoResponse;

export type AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsError =
  DefaultErrors;

/** Obtain environment details for a Spark Application */
export const accessEnvironmentInfoProjectsLocationsSessionsSparkApplications: API.OperationMethod<
  AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsRequest,
  AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsResponse,
  AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsRequest,
  output:
    AccessEnvironmentInfoProjectsLocationsSessionsSparkApplicationsResponse,
  errors: [],
}));

export interface GetProjectsRegionsJobsRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Required. The job ID. */
  jobId: string;
}

export const GetProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectId}/regions/{region}/jobs/{jobId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsRegionsJobsRequest>;

export type GetProjectsRegionsJobsResponse = Job;
export const GetProjectsRegionsJobsResponse = /*@__PURE__*/ /*#__PURE__*/ Job;

export type GetProjectsRegionsJobsError = DefaultErrors;

/** Gets the resource representation for a job in a project. */
export const getProjectsRegionsJobs: API.OperationMethod<
  GetProjectsRegionsJobsRequest,
  GetProjectsRegionsJobsResponse,
  GetProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsRegionsJobsRequest,
  output: GetProjectsRegionsJobsResponse,
  errors: [],
}));

export interface SubmitAsOperationProjectsRegionsJobsRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Request body */
  body?: SubmitJobRequest;
}

export const SubmitAsOperationProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    body: Schema.optional(SubmitJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/jobs:submitAsOperation",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SubmitAsOperationProjectsRegionsJobsRequest>;

export type SubmitAsOperationProjectsRegionsJobsResponse = Operation;
export const SubmitAsOperationProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type SubmitAsOperationProjectsRegionsJobsError = DefaultErrors;

/** Submits job to a cluster. */
export const submitAsOperationProjectsRegionsJobs: API.OperationMethod<
  SubmitAsOperationProjectsRegionsJobsRequest,
  SubmitAsOperationProjectsRegionsJobsResponse,
  SubmitAsOperationProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SubmitAsOperationProjectsRegionsJobsRequest,
  output: SubmitAsOperationProjectsRegionsJobsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsRegionsJobsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/jobs/{jobsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsRegionsJobsRequest>;

export type SetIamPolicyProjectsRegionsJobsResponse = Policy;
export const SetIamPolicyProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsRegionsJobsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsRegionsJobs: API.OperationMethod<
  SetIamPolicyProjectsRegionsJobsRequest,
  SetIamPolicyProjectsRegionsJobsResponse,
  SetIamPolicyProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsRegionsJobsRequest,
  output: SetIamPolicyProjectsRegionsJobsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsRegionsJobsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/jobs/{jobsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsRegionsJobsRequest>;

export type TestIamPermissionsProjectsRegionsJobsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsRegionsJobsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsRegionsJobs: API.OperationMethod<
  TestIamPermissionsProjectsRegionsJobsRequest,
  TestIamPermissionsProjectsRegionsJobsResponse,
  TestIamPermissionsProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsRegionsJobsRequest,
  output: TestIamPermissionsProjectsRegionsJobsResponse,
  errors: [],
}));

export interface PatchProjectsRegionsJobsRequest {
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Required. The job ID. */
  jobId: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. Specifies the path, relative to Job, of the field to update. For example, to update the labels of a Job the update_mask parameter would be specified as labels, and the PATCH request body would specify the new value. *Note:* Currently, labels is the only field that can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Job;
}

export const PatchProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
    region: Schema.String.pipe(T.HttpPath("region")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Job).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectId}/regions/{region}/jobs/{jobId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsRegionsJobsRequest>;

export type PatchProjectsRegionsJobsResponse = Job;
export const PatchProjectsRegionsJobsResponse = /*@__PURE__*/ /*#__PURE__*/ Job;

export type PatchProjectsRegionsJobsError = DefaultErrors;

/** Updates a job in a project. */
export const patchProjectsRegionsJobs: API.OperationMethod<
  PatchProjectsRegionsJobsRequest,
  PatchProjectsRegionsJobsResponse,
  PatchProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsRegionsJobsRequest,
  output: PatchProjectsRegionsJobsResponse,
  errors: [],
}));

export interface SubmitProjectsRegionsJobsRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Request body */
  body?: SubmitJobRequest;
}

export const SubmitProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    body: Schema.optional(SubmitJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/jobs:submit",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SubmitProjectsRegionsJobsRequest>;

export type SubmitProjectsRegionsJobsResponse = Job;
export const SubmitProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Job;

export type SubmitProjectsRegionsJobsError = DefaultErrors;

/** Submits a job to a cluster. */
export const submitProjectsRegionsJobs: API.OperationMethod<
  SubmitProjectsRegionsJobsRequest,
  SubmitProjectsRegionsJobsResponse,
  SubmitProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SubmitProjectsRegionsJobsRequest,
  output: SubmitProjectsRegionsJobsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsRegionsJobsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/jobs/{jobsId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsRegionsJobsRequest>;

export type GetIamPolicyProjectsRegionsJobsResponse = Policy;
export const GetIamPolicyProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsRegionsJobsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsRegionsJobs: API.OperationMethod<
  GetIamPolicyProjectsRegionsJobsRequest,
  GetIamPolicyProjectsRegionsJobsResponse,
  GetIamPolicyProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsRegionsJobsRequest,
  output: GetIamPolicyProjectsRegionsJobsResponse,
  errors: [],
}));

export interface CancelProjectsRegionsJobsRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Required. The job ID. */
  jobId: string;
  /** Request body */
  body?: CancelJobRequest;
}

export const CancelProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
    body: Schema.optional(CancelJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/jobs/{jobId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsRegionsJobsRequest>;

export type CancelProjectsRegionsJobsResponse = Job;
export const CancelProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Job;

export type CancelProjectsRegionsJobsError = DefaultErrors;

/** Starts a job cancellation request. To access the job resource after cancellation, call regions/{region}/jobs.list (https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/list) or regions/{region}/jobs.get (https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/get). */
export const cancelProjectsRegionsJobs: API.OperationMethod<
  CancelProjectsRegionsJobsRequest,
  CancelProjectsRegionsJobsResponse,
  CancelProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsRegionsJobsRequest,
  output: CancelProjectsRegionsJobsResponse,
  errors: [],
}));

export interface ListProjectsRegionsJobsRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Optional. The number of results to return in each response. */
  pageSize?: number;
  /** Optional. If set, the returned jobs list includes only jobs that were submitted to the named cluster. */
  clusterName?: string;
  /** Optional. The page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Optional. Specifies enumerated categories of jobs to list. (default = match ALL jobs).If filter is provided, jobStateMatcher will be ignored. */
  jobStateMatcher?: "ALL" | "ACTIVE" | "NON_ACTIVE" | (string & {});
  /** Optional. A filter constraining the jobs to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is status.state or insertTime, or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be either ACTIVE or NON_ACTIVE. Allows insertTime to be a timestamp in RFC 3339 format in double quotes, such as 2025-01-01T00:00:00Z. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND labels.env = staging AND labels.starred = * AND insertTime <= "2025-01-01T00:00:00Z" */
  filter?: string;
}

export const ListProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    clusterName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("clusterName"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    jobStateMatcher: Schema.optional(Schema.String).pipe(
      T.HttpQuery("jobStateMatcher"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectId}/regions/{region}/jobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsRegionsJobsRequest>;

export type ListProjectsRegionsJobsResponse = ListJobsResponse;
export const ListProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListJobsResponse;

export type ListProjectsRegionsJobsError = DefaultErrors;

/** Lists regions/{region}/jobs in a project. */
export const listProjectsRegionsJobs: API.PaginatedOperationMethod<
  ListProjectsRegionsJobsRequest,
  ListProjectsRegionsJobsResponse,
  ListProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRegionsJobsRequest,
  output: ListProjectsRegionsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsRegionsJobsRequest {
  /** Required. The job ID. */
  jobId: string;
  /** Required. The ID of the Google Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
}

export const DeleteProjectsRegionsJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobId: Schema.String.pipe(T.HttpPath("jobId")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    region: Schema.String.pipe(T.HttpPath("region")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectId}/regions/{region}/jobs/{jobId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsRegionsJobsRequest>;

export type DeleteProjectsRegionsJobsResponse = Empty;
export const DeleteProjectsRegionsJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsRegionsJobsError = DefaultErrors;

/** Deletes the job from the project. If the job is active, the delete fails, and the response returns FAILED_PRECONDITION. */
export const deleteProjectsRegionsJobs: API.OperationMethod<
  DeleteProjectsRegionsJobsRequest,
  DeleteProjectsRegionsJobsResponse,
  DeleteProjectsRegionsJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsRegionsJobsRequest,
  output: DeleteProjectsRegionsJobsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsRegionsWorkflowTemplatesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsRegionsWorkflowTemplatesRequest>;

export type SetIamPolicyProjectsRegionsWorkflowTemplatesResponse = Policy;
export const SetIamPolicyProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsRegionsWorkflowTemplates: API.OperationMethod<
  SetIamPolicyProjectsRegionsWorkflowTemplatesRequest,
  SetIamPolicyProjectsRegionsWorkflowTemplatesResponse,
  SetIamPolicyProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsRegionsWorkflowTemplatesRequest,
  output: SetIamPolicyProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface ListProjectsRegionsWorkflowTemplatesRequest {
  /** Optional. The page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of results to return in each response. */
  pageSize?: number;
}

export const ListProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsRegionsWorkflowTemplatesRequest>;

export type ListProjectsRegionsWorkflowTemplatesResponse =
  ListWorkflowTemplatesResponse;
export const ListProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListWorkflowTemplatesResponse;

export type ListProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Lists workflows that match the specified filter in the request. */
export const listProjectsRegionsWorkflowTemplates: API.PaginatedOperationMethod<
  ListProjectsRegionsWorkflowTemplatesRequest,
  ListProjectsRegionsWorkflowTemplatesResponse,
  ListProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRegionsWorkflowTemplatesRequest,
  output: ListProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetIamPolicyProjectsRegionsWorkflowTemplatesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsRegionsWorkflowTemplatesRequest>;

export type GetIamPolicyProjectsRegionsWorkflowTemplatesResponse = Policy;
export const GetIamPolicyProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsRegionsWorkflowTemplates: API.OperationMethod<
  GetIamPolicyProjectsRegionsWorkflowTemplatesRequest,
  GetIamPolicyProjectsRegionsWorkflowTemplatesResponse,
  GetIamPolicyProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsRegionsWorkflowTemplatesRequest,
  output: GetIamPolicyProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface UpdateProjectsRegionsWorkflowTemplatesRequest {
  /** Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
  /** Request body */
  body?: WorkflowTemplate;
}

export const UpdateProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(WorkflowTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateProjectsRegionsWorkflowTemplatesRequest>;

export type UpdateProjectsRegionsWorkflowTemplatesResponse = WorkflowTemplate;
export const UpdateProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkflowTemplate;

export type UpdateProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Updates (replaces) workflow template. The updated template must contain version that matches the current server version. */
export const updateProjectsRegionsWorkflowTemplates: API.OperationMethod<
  UpdateProjectsRegionsWorkflowTemplatesRequest,
  UpdateProjectsRegionsWorkflowTemplatesResponse,
  UpdateProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProjectsRegionsWorkflowTemplatesRequest,
  output: UpdateProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface CreateProjectsRegionsWorkflowTemplatesRequest {
  /** Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Request body */
  body?: WorkflowTemplate;
}

export const CreateProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(WorkflowTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsRegionsWorkflowTemplatesRequest>;

export type CreateProjectsRegionsWorkflowTemplatesResponse = WorkflowTemplate;
export const CreateProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkflowTemplate;

export type CreateProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Creates new workflow template. */
export const createProjectsRegionsWorkflowTemplates: API.OperationMethod<
  CreateProjectsRegionsWorkflowTemplatesRequest,
  CreateProjectsRegionsWorkflowTemplatesResponse,
  CreateProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsRegionsWorkflowTemplatesRequest,
  output: CreateProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsRegionsWorkflowTemplatesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsRegionsWorkflowTemplatesRequest>;

export type TestIamPermissionsProjectsRegionsWorkflowTemplatesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsRegionsWorkflowTemplatesError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsRegionsWorkflowTemplates: API.OperationMethod<
  TestIamPermissionsProjectsRegionsWorkflowTemplatesRequest,
  TestIamPermissionsProjectsRegionsWorkflowTemplatesResponse,
  TestIamPermissionsProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsRegionsWorkflowTemplatesRequest,
  output: TestIamPermissionsProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface InstantiateProjectsRegionsWorkflowTemplatesRequest {
  /** Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
  /** Request body */
  body?: InstantiateWorkflowTemplateRequest;
}

export const InstantiateProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(InstantiateWorkflowTemplateRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}:instantiate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InstantiateProjectsRegionsWorkflowTemplatesRequest>;

export type InstantiateProjectsRegionsWorkflowTemplatesResponse = Operation;
export const InstantiateProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type InstantiateProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Instantiates a template and begins execution.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty. */
export const instantiateProjectsRegionsWorkflowTemplates: API.OperationMethod<
  InstantiateProjectsRegionsWorkflowTemplatesRequest,
  InstantiateProjectsRegionsWorkflowTemplatesResponse,
  InstantiateProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InstantiateProjectsRegionsWorkflowTemplatesRequest,
  output: InstantiateProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface GetProjectsRegionsWorkflowTemplatesRequest {
  /** Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version. */
  version?: number;
  /** Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
}

export const GetProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    version: Schema.optional(Schema.Number).pipe(T.HttpQuery("version")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsRegionsWorkflowTemplatesRequest>;

export type GetProjectsRegionsWorkflowTemplatesResponse = WorkflowTemplate;
export const GetProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ WorkflowTemplate;

export type GetProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Retrieves the latest workflow template.Can retrieve previously instantiated template by specifying optional version parameter. */
export const getProjectsRegionsWorkflowTemplates: API.OperationMethod<
  GetProjectsRegionsWorkflowTemplatesRequest,
  GetProjectsRegionsWorkflowTemplatesResponse,
  GetProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsRegionsWorkflowTemplatesRequest,
  output: GetProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface DeleteProjectsRegionsWorkflowTemplatesRequest {
  /** Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id} */
  name: string;
  /** Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version. */
  version?: number;
}

export const DeleteProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    version: Schema.optional(Schema.Number).pipe(T.HttpQuery("version")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates/{workflowTemplatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsRegionsWorkflowTemplatesRequest>;

export type DeleteProjectsRegionsWorkflowTemplatesResponse = Empty;
export const DeleteProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsRegionsWorkflowTemplatesError = DefaultErrors;

/** Deletes a workflow template. It does not cancel in-progress workflows. */
export const deleteProjectsRegionsWorkflowTemplates: API.OperationMethod<
  DeleteProjectsRegionsWorkflowTemplatesRequest,
  DeleteProjectsRegionsWorkflowTemplatesResponse,
  DeleteProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsRegionsWorkflowTemplatesRequest,
  output: DeleteProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface InstantiateInlineProjectsRegionsWorkflowTemplatesRequest {
  /** Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Request body */
  body?: WorkflowTemplate;
}

export const InstantiateInlineProjectsRegionsWorkflowTemplatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(WorkflowTemplate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/workflowTemplates:instantiateInline",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InstantiateInlineProjectsRegionsWorkflowTemplatesRequest>;

export type InstantiateInlineProjectsRegionsWorkflowTemplatesResponse =
  Operation;
export const InstantiateInlineProjectsRegionsWorkflowTemplatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type InstantiateInlineProjectsRegionsWorkflowTemplatesError =
  DefaultErrors;

/** Instantiates a template and begins execution.This method is equivalent to executing the sequence CreateWorkflowTemplate, InstantiateWorkflowTemplate, DeleteWorkflowTemplate.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty. */
export const instantiateInlineProjectsRegionsWorkflowTemplates: API.OperationMethod<
  InstantiateInlineProjectsRegionsWorkflowTemplatesRequest,
  InstantiateInlineProjectsRegionsWorkflowTemplatesResponse,
  InstantiateInlineProjectsRegionsWorkflowTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InstantiateInlineProjectsRegionsWorkflowTemplatesRequest,
  output: InstantiateInlineProjectsRegionsWorkflowTemplatesResponse,
  errors: [],
}));

export interface DiagnoseProjectsRegionsClustersRequest {
  /** Required. The ID of the Google Cloud Platform project that the cluster belongs to. */
  projectId: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The cluster name. */
  clusterName: string;
  /** Request body */
  body?: DiagnoseClusterRequest;
}

export const DiagnoseProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    region: Schema.String.pipe(T.HttpPath("region")),
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    body: Schema.optional(DiagnoseClusterRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}:diagnose",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DiagnoseProjectsRegionsClustersRequest>;

export type DiagnoseProjectsRegionsClustersResponse = Operation;
export const DiagnoseProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DiagnoseProjectsRegionsClustersError = DefaultErrors;

/** Gets cluster diagnostic information. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata). After the operation completes, Operation.response contains DiagnoseClusterResults (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#diagnoseclusterresults). */
export const diagnoseProjectsRegionsClusters: API.OperationMethod<
  DiagnoseProjectsRegionsClustersRequest,
  DiagnoseProjectsRegionsClustersResponse,
  DiagnoseProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DiagnoseProjectsRegionsClustersRequest,
  output: DiagnoseProjectsRegionsClustersResponse,
  errors: [],
}));

export interface StopProjectsRegionsClustersRequest {
  /** Required. The cluster name. */
  clusterName: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The ID of the Google Cloud Platform project the cluster belongs to. */
  projectId: string;
  /** Request body */
  body?: StopClusterRequest;
}

export const StopProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    region: Schema.String.pipe(T.HttpPath("region")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    body: Schema.optional(StopClusterRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}:stop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StopProjectsRegionsClustersRequest>;

export type StopProjectsRegionsClustersResponse = Operation;
export const StopProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StopProjectsRegionsClustersError = DefaultErrors;

/** Stops a cluster in a project. */
export const stopProjectsRegionsClusters: API.OperationMethod<
  StopProjectsRegionsClustersRequest,
  StopProjectsRegionsClustersResponse,
  StopProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopProjectsRegionsClustersRequest,
  output: StopProjectsRegionsClustersResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsRegionsClustersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsRegionsClustersRequest>;

export type GetIamPolicyProjectsRegionsClustersResponse = Policy;
export const GetIamPolicyProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsRegionsClustersError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsRegionsClusters: API.OperationMethod<
  GetIamPolicyProjectsRegionsClustersRequest,
  GetIamPolicyProjectsRegionsClustersResponse,
  GetIamPolicyProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsRegionsClustersRequest,
  output: GetIamPolicyProjectsRegionsClustersResponse,
  errors: [],
}));

export interface ListProjectsRegionsClustersRequest {
  /** Optional. The standard List page token. */
  pageToken?: string;
  /** Optional. A filter constraining the clusters to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is one of status.state, clusterName, or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be one of the following: ACTIVE, INACTIVE, CREATING, RUNNING, ERROR, DELETING, UPDATING, STOPPING, or STOPPED. ACTIVE contains the CREATING, UPDATING, and RUNNING states. INACTIVE contains the DELETING, ERROR, STOPPING, and STOPPED states. clusterName is the name of the cluster provided at creation time. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND clusterName = mycluster AND labels.env = staging AND labels.starred = * */
  filter?: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Optional. The standard List page size. */
  pageSize?: number;
  /** Required. The ID of the Google Cloud Platform project that the cluster belongs to. */
  projectId: string;
}

export const ListProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    region: Schema.String.pipe(T.HttpPath("region")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectId}/regions/{region}/clusters",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsRegionsClustersRequest>;

export type ListProjectsRegionsClustersResponse = ListClustersResponse;
export const ListProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListClustersResponse;

export type ListProjectsRegionsClustersError = DefaultErrors;

/** Lists all regions/{region}/clusters in a project alphabetically. */
export const listProjectsRegionsClusters: API.PaginatedOperationMethod<
  ListProjectsRegionsClustersRequest,
  ListProjectsRegionsClustersResponse,
  ListProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRegionsClustersRequest,
  output: ListProjectsRegionsClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsRegionsClustersRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The cluster name. */
  clusterName: string;
  /** Required. The ID of the Google Cloud Platform project that the cluster belongs to. */
  projectId: string;
}

export const GetProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsRegionsClustersRequest>;

export type GetProjectsRegionsClustersResponse = Cluster;
export const GetProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Cluster;

export type GetProjectsRegionsClustersError = DefaultErrors;

/** Gets the resource representation for a cluster in a project. */
export const getProjectsRegionsClusters: API.OperationMethod<
  GetProjectsRegionsClustersRequest,
  GetProjectsRegionsClustersResponse,
  GetProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsRegionsClustersRequest,
  output: GetProjectsRegionsClustersResponse,
  errors: [],
}));

export interface PatchProjectsRegionsClustersRequest {
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Optional. Timeout for graceful YARN decommissioning. Graceful decommissioning allows removing nodes from the cluster without interrupting jobs in progress. Timeout specifies how long to wait for jobs in progress to finish before forcefully removing nodes (and potentially interrupting jobs). Default timeout is 0 (for forceful decommission), and the maximum allowed timeout is 1 day. (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only supported on Dataproc image versions 1.2 and higher. */
  gracefulDecommissionTimeout?: string;
  /** Required. The cluster name. */
  clusterName: string;
  /** Required. The ID of the Google Cloud Platform project the cluster belongs to. */
  projectId: string;
  /** Required. Specifies the path, relative to Cluster, of the field to update. For example, to change the number of workers in a cluster to 5, the update_mask parameter would be specified as config.worker_config.num_instances, and the PATCH request body would specify the new value, as follows: { "config":{ "workerConfig":{ "numInstances":"5" } } } Similarly, to change the number of preemptible workers in a cluster to 5, the update_mask parameter would be config.secondary_worker_config.num_instances, and the PATCH request body would be set as follows: { "config":{ "secondaryWorkerConfig":{ "numInstances":"5" } } } *Note:* Currently, only the following fields can be updated: *Mask* *Purpose* *labels* Update labels *config.worker_config.num_instances* Resize primary worker group *config.secondary_worker_config.num_instances* Resize secondary worker group config.autoscaling_config.policy_uri Use, stop using, or change autoscaling policies */
  updateMask?: string;
  /** Optional. A unique ID used to identify the request. If the server receives two UpdateClusterRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.UpdateClusterRequest)s with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: Cluster;
}

export const PatchProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    region: Schema.String.pipe(T.HttpPath("region")),
    gracefulDecommissionTimeout: Schema.optional(Schema.String).pipe(
      T.HttpQuery("gracefulDecommissionTimeout"),
    ),
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Cluster).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsRegionsClustersRequest>;

export type PatchProjectsRegionsClustersResponse = Operation;
export const PatchProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsRegionsClustersError = DefaultErrors;

/** Updates a cluster in a project. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata). The cluster must be in a RUNNING state or an error is returned. */
export const patchProjectsRegionsClusters: API.OperationMethod<
  PatchProjectsRegionsClustersRequest,
  PatchProjectsRegionsClustersResponse,
  PatchProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsRegionsClustersRequest,
  output: PatchProjectsRegionsClustersResponse,
  errors: [],
}));

export interface CreateProjectsRegionsClustersRequest {
  /** Optional. Failure action when primary worker creation fails. */
  actionOnFailedPrimaryWorkers?:
    | "FAILURE_ACTION_UNSPECIFIED"
    | "NO_ACTION"
    | "DELETE"
    | (string & {});
  /** Required. The ID of the Google Cloud Platform project that the cluster belongs to. */
  projectId: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Optional. A unique ID used to identify the request. If the server receives two CreateClusterRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateClusterRequest)s with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: Cluster;
}

export const CreateProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    actionOnFailedPrimaryWorkers: Schema.optional(Schema.String).pipe(
      T.HttpQuery("actionOnFailedPrimaryWorkers"),
    ),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    region: Schema.String.pipe(T.HttpPath("region")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Cluster).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/clusters",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsRegionsClustersRequest>;

export type CreateProjectsRegionsClustersResponse = Operation;
export const CreateProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsRegionsClustersError = DefaultErrors;

/** Creates a cluster in a project. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata). */
export const createProjectsRegionsClusters: API.OperationMethod<
  CreateProjectsRegionsClustersRequest,
  CreateProjectsRegionsClustersResponse,
  CreateProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsRegionsClustersRequest,
  output: CreateProjectsRegionsClustersResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsRegionsClustersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsRegionsClustersRequest>;

export type TestIamPermissionsProjectsRegionsClustersResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsRegionsClustersError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsRegionsClusters: API.OperationMethod<
  TestIamPermissionsProjectsRegionsClustersRequest,
  TestIamPermissionsProjectsRegionsClustersResponse,
  TestIamPermissionsProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsRegionsClustersRequest,
  output: TestIamPermissionsProjectsRegionsClustersResponse,
  errors: [],
}));

export interface RepairProjectsRegionsClustersRequest {
  /** Required. The ID of the Google Cloud Platform project the cluster belongs to. */
  projectId: string;
  /** Required. The cluster name. */
  clusterName: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Request body */
  body?: RepairClusterRequest;
}

export const RepairProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    region: Schema.String.pipe(T.HttpPath("region")),
    body: Schema.optional(RepairClusterRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}:repair",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RepairProjectsRegionsClustersRequest>;

export type RepairProjectsRegionsClustersResponse = Operation;
export const RepairProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RepairProjectsRegionsClustersError = DefaultErrors;

/** Repairs a cluster. */
export const repairProjectsRegionsClusters: API.OperationMethod<
  RepairProjectsRegionsClustersRequest,
  RepairProjectsRegionsClustersResponse,
  RepairProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RepairProjectsRegionsClustersRequest,
  output: RepairProjectsRegionsClustersResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsRegionsClustersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsRegionsClustersRequest>;

export type SetIamPolicyProjectsRegionsClustersResponse = Policy;
export const SetIamPolicyProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsRegionsClustersError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsRegionsClusters: API.OperationMethod<
  SetIamPolicyProjectsRegionsClustersRequest,
  SetIamPolicyProjectsRegionsClustersResponse,
  SetIamPolicyProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsRegionsClustersRequest,
  output: SetIamPolicyProjectsRegionsClustersResponse,
  errors: [],
}));

export interface DeleteProjectsRegionsClustersRequest {
  /** Optional. Specifying the cluster_uuid means the RPC should fail (with error NOT_FOUND) if cluster with specified UUID does not exist. */
  clusterUuid?: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Required. The cluster name. */
  clusterName: string;
  /** Optional. The graceful termination timeout for the deletion of the cluster. Indicate the time the request will wait to complete the running jobs on the cluster before its forceful deletion. Default value is 0 indicating that the user has not enabled the graceful termination. Value can be between 60 second and 6 Hours, in case the graceful termination is enabled. (There is no separate flag to check the enabling or disabling of graceful termination, it can be checked by the values in the field). */
  gracefulTerminationTimeout?: string;
  /** Required. The ID of the Google Cloud Platform project that the cluster belongs to. */
  projectId: string;
  /** Optional. A unique ID used to identify the request. If the server receives two DeleteClusterRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.DeleteClusterRequest)s with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
}

export const DeleteProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    clusterUuid: Schema.optional(Schema.String).pipe(
      T.HttpQuery("clusterUuid"),
    ),
    region: Schema.String.pipe(T.HttpPath("region")),
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    gracefulTerminationTimeout: Schema.optional(Schema.String).pipe(
      T.HttpQuery("gracefulTerminationTimeout"),
    ),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsRegionsClustersRequest>;

export type DeleteProjectsRegionsClustersResponse = Operation;
export const DeleteProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsRegionsClustersError = DefaultErrors;

/** Deletes a cluster in a project. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata). */
export const deleteProjectsRegionsClusters: API.OperationMethod<
  DeleteProjectsRegionsClustersRequest,
  DeleteProjectsRegionsClustersResponse,
  DeleteProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsRegionsClustersRequest,
  output: DeleteProjectsRegionsClustersResponse,
  errors: [],
}));

export interface StartProjectsRegionsClustersRequest {
  /** Required. The cluster name. */
  clusterName: string;
  /** Required. The ID of the Google Cloud Platform project the cluster belongs to. */
  projectId: string;
  /** Required. The Dataproc region in which to handle the request. */
  region: string;
  /** Request body */
  body?: StartClusterRequest;
}

export const StartProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    clusterName: Schema.String.pipe(T.HttpPath("clusterName")),
    projectId: Schema.String.pipe(T.HttpPath("projectId")),
    region: Schema.String.pipe(T.HttpPath("region")),
    body: Schema.optional(StartClusterRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectId}/regions/{region}/clusters/{clusterName}:start",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StartProjectsRegionsClustersRequest>;

export type StartProjectsRegionsClustersResponse = Operation;
export const StartProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StartProjectsRegionsClustersError = DefaultErrors;

/** Starts a cluster in a project. */
export const startProjectsRegionsClusters: API.OperationMethod<
  StartProjectsRegionsClustersRequest,
  StartProjectsRegionsClustersResponse,
  StartProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartProjectsRegionsClustersRequest,
  output: StartProjectsRegionsClustersResponse,
  errors: [],
}));

export interface InjectCredentialsProjectsRegionsClustersRequest {
  /** Required. The cluster, in the form clusters/. */
  cluster: string;
  /** Required. The ID of the Google Cloud Platform project the cluster belongs to, of the form projects/. */
  project: string;
  /** Required. The region containing the cluster, of the form regions/. */
  region: string;
  /** Request body */
  body?: InjectCredentialsRequest;
}

export const InjectCredentialsProjectsRegionsClustersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cluster: Schema.String.pipe(T.HttpPath("cluster")),
    project: Schema.String.pipe(T.HttpPath("project")),
    region: Schema.String.pipe(T.HttpPath("region")),
    body: Schema.optional(InjectCredentialsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}:injectCredentials",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InjectCredentialsProjectsRegionsClustersRequest>;

export type InjectCredentialsProjectsRegionsClustersResponse = Operation;
export const InjectCredentialsProjectsRegionsClustersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type InjectCredentialsProjectsRegionsClustersError = DefaultErrors;

/** Inject encrypted credentials into all of the VMs in a cluster.The target cluster must be a personal auth cluster assigned to the user who is issuing the RPC. */
export const injectCredentialsProjectsRegionsClusters: API.OperationMethod<
  InjectCredentialsProjectsRegionsClustersRequest,
  InjectCredentialsProjectsRegionsClustersResponse,
  InjectCredentialsProjectsRegionsClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InjectCredentialsProjectsRegionsClustersRequest,
  output: InjectCredentialsProjectsRegionsClustersResponse,
  errors: [],
}));

export interface RepairProjectsRegionsClustersNodeGroupsRequest {
  /** Required. The name of the node group to resize. Format: projects/{project}/regions/{region}/clusters/{cluster}/nodeGroups/{nodeGroup} */
  name: string;
  /** Request body */
  body?: RepairNodeGroupRequest;
}

export const RepairProjectsRegionsClustersNodeGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RepairNodeGroupRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}/nodeGroups/{nodeGroupsId}:repair",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RepairProjectsRegionsClustersNodeGroupsRequest>;

export type RepairProjectsRegionsClustersNodeGroupsResponse = Operation;
export const RepairProjectsRegionsClustersNodeGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RepairProjectsRegionsClustersNodeGroupsError = DefaultErrors;

/** Repair nodes in a node group. */
export const repairProjectsRegionsClustersNodeGroups: API.OperationMethod<
  RepairProjectsRegionsClustersNodeGroupsRequest,
  RepairProjectsRegionsClustersNodeGroupsResponse,
  RepairProjectsRegionsClustersNodeGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RepairProjectsRegionsClustersNodeGroupsRequest,
  output: RepairProjectsRegionsClustersNodeGroupsResponse,
  errors: [],
}));

export interface ResizeProjectsRegionsClustersNodeGroupsRequest {
  /** Required. The name of the node group to resize. Format: projects/{project}/regions/{region}/clusters/{cluster}/nodeGroups/{nodeGroup} */
  name: string;
  /** Request body */
  body?: ResizeNodeGroupRequest;
}

export const ResizeProjectsRegionsClustersNodeGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ResizeNodeGroupRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}/nodeGroups/{nodeGroupsId}:resize",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResizeProjectsRegionsClustersNodeGroupsRequest>;

export type ResizeProjectsRegionsClustersNodeGroupsResponse = Operation;
export const ResizeProjectsRegionsClustersNodeGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ResizeProjectsRegionsClustersNodeGroupsError = DefaultErrors;

/** Resizes a node group in a cluster. The returned Operation.metadata is NodeGroupOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#nodegroupoperationmetadata). */
export const resizeProjectsRegionsClustersNodeGroups: API.OperationMethod<
  ResizeProjectsRegionsClustersNodeGroupsRequest,
  ResizeProjectsRegionsClustersNodeGroupsResponse,
  ResizeProjectsRegionsClustersNodeGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResizeProjectsRegionsClustersNodeGroupsRequest,
  output: ResizeProjectsRegionsClustersNodeGroupsResponse,
  errors: [],
}));

export interface CreateProjectsRegionsClustersNodeGroupsRequest {
  /** Optional. A unique ID used to identify the request. If the server receives two CreateNodeGroupRequest (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateNodeGroupRequest) with the same ID, the second request is ignored and the first google.longrunning.Operation created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Required. The parent resource where this node group will be created. Format: projects/{project}/regions/{region}/clusters/{cluster} */
  parent: string;
  /** Optional. An optional node group ID. Generated if not specified.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of from 3 to 33 characters. */
  nodeGroupId?: string;
  /** Optional. operation id of the parent operation sending the create request */
  parentOperationId?: string;
  /** Request body */
  body?: NodeGroup;
}

export const CreateProjectsRegionsClustersNodeGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    nodeGroupId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("nodeGroupId"),
    ),
    parentOperationId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("parentOperationId"),
    ),
    body: Schema.optional(NodeGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}/nodeGroups",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsRegionsClustersNodeGroupsRequest>;

export type CreateProjectsRegionsClustersNodeGroupsResponse = Operation;
export const CreateProjectsRegionsClustersNodeGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsRegionsClustersNodeGroupsError = DefaultErrors;

/** Creates a node group in a cluster. The returned Operation.metadata is NodeGroupOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#nodegroupoperationmetadata). */
export const createProjectsRegionsClustersNodeGroups: API.OperationMethod<
  CreateProjectsRegionsClustersNodeGroupsRequest,
  CreateProjectsRegionsClustersNodeGroupsResponse,
  CreateProjectsRegionsClustersNodeGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsRegionsClustersNodeGroupsRequest,
  output: CreateProjectsRegionsClustersNodeGroupsResponse,
  errors: [],
}));

export interface GetProjectsRegionsClustersNodeGroupsRequest {
  /** Required. The name of the node group to retrieve. Format: projects/{project}/regions/{region}/clusters/{cluster}/nodeGroups/{nodeGroup} */
  name: string;
}

export const GetProjectsRegionsClustersNodeGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/clusters/{clustersId}/nodeGroups/{nodeGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsRegionsClustersNodeGroupsRequest>;

export type GetProjectsRegionsClustersNodeGroupsResponse = NodeGroup;
export const GetProjectsRegionsClustersNodeGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ NodeGroup;

export type GetProjectsRegionsClustersNodeGroupsError = DefaultErrors;

/** Gets the resource representation for a node group in a cluster. */
export const getProjectsRegionsClustersNodeGroups: API.OperationMethod<
  GetProjectsRegionsClustersNodeGroupsRequest,
  GetProjectsRegionsClustersNodeGroupsResponse,
  GetProjectsRegionsClustersNodeGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsRegionsClustersNodeGroupsRequest,
  output: GetProjectsRegionsClustersNodeGroupsResponse,
  errors: [],
}));

export interface CancelProjectsRegionsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsRegionsOperationsRequest>;

export type CancelProjectsRegionsOperationsResponse = Empty;
export const CancelProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsRegionsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export const cancelProjectsRegionsOperations: API.OperationMethod<
  CancelProjectsRegionsOperationsRequest,
  CancelProjectsRegionsOperationsResponse,
  CancelProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsRegionsOperationsRequest,
  output: CancelProjectsRegionsOperationsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsRegionsOperationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations/{operationsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsRegionsOperationsRequest>;

export type TestIamPermissionsProjectsRegionsOperationsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsRegionsOperationsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsRegionsOperations: API.OperationMethod<
  TestIamPermissionsProjectsRegionsOperationsRequest,
  TestIamPermissionsProjectsRegionsOperationsResponse,
  TestIamPermissionsProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsRegionsOperationsRequest,
  output: TestIamPermissionsProjectsRegionsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsRegionsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsRegionsOperationsRequest>;

export type DeleteProjectsRegionsOperationsResponse = Empty;
export const DeleteProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsRegionsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. */
export const deleteProjectsRegionsOperations: API.OperationMethod<
  DeleteProjectsRegionsOperationsRequest,
  DeleteProjectsRegionsOperationsResponse,
  DeleteProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsRegionsOperationsRequest,
  output: DeleteProjectsRegionsOperationsResponse,
  errors: [],
}));

export interface ListProjectsRegionsOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsRegionsOperationsRequest>;

export type ListProjectsRegionsOperationsResponse = ListOperationsResponse;
export const ListProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsRegionsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export const listProjectsRegionsOperations: API.PaginatedOperationMethod<
  ListProjectsRegionsOperationsRequest,
  ListProjectsRegionsOperationsResponse,
  ListProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRegionsOperationsRequest,
  output: ListProjectsRegionsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsRegionsOperationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations/{operationsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsRegionsOperationsRequest>;

export type SetIamPolicyProjectsRegionsOperationsResponse = Policy;
export const SetIamPolicyProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsRegionsOperationsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsRegionsOperations: API.OperationMethod<
  SetIamPolicyProjectsRegionsOperationsRequest,
  SetIamPolicyProjectsRegionsOperationsResponse,
  SetIamPolicyProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsRegionsOperationsRequest,
  output: SetIamPolicyProjectsRegionsOperationsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsRegionsOperationsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations/{operationsId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsRegionsOperationsRequest>;

export type GetIamPolicyProjectsRegionsOperationsResponse = Policy;
export const GetIamPolicyProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsRegionsOperationsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsRegionsOperations: API.OperationMethod<
  GetIamPolicyProjectsRegionsOperationsRequest,
  GetIamPolicyProjectsRegionsOperationsResponse,
  GetIamPolicyProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsRegionsOperationsRequest,
  output: GetIamPolicyProjectsRegionsOperationsResponse,
  errors: [],
}));

export interface GetProjectsRegionsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsRegionsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsRegionsOperationsRequest>;

export type GetProjectsRegionsOperationsResponse = Operation;
export const GetProjectsRegionsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsRegionsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsRegionsOperations: API.OperationMethod<
  GetProjectsRegionsOperationsRequest,
  GetProjectsRegionsOperationsResponse,
  GetProjectsRegionsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsRegionsOperationsRequest,
  output: GetProjectsRegionsOperationsResponse,
  errors: [],
}));

export interface ListProjectsRegionsAutoscalingPoliciesRequest {
  /** Optional. The page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100. */
  pageSize?: number;
}

export const ListProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsRegionsAutoscalingPoliciesRequest>;

export type ListProjectsRegionsAutoscalingPoliciesResponse =
  ListAutoscalingPoliciesResponse;
export const ListProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAutoscalingPoliciesResponse;

export type ListProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Lists autoscaling policies in the project. */
export const listProjectsRegionsAutoscalingPolicies: API.PaginatedOperationMethod<
  ListProjectsRegionsAutoscalingPoliciesRequest,
  ListProjectsRegionsAutoscalingPoliciesResponse,
  ListProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRegionsAutoscalingPoliciesRequest,
  output: ListProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsRegionsAutoscalingPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies/{autoscalingPoliciesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsRegionsAutoscalingPoliciesRequest>;

export type SetIamPolicyProjectsRegionsAutoscalingPoliciesResponse = Policy;
export const SetIamPolicyProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export const setIamPolicyProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  SetIamPolicyProjectsRegionsAutoscalingPoliciesRequest,
  SetIamPolicyProjectsRegionsAutoscalingPoliciesResponse,
  SetIamPolicyProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsRegionsAutoscalingPoliciesRequest,
  output: SetIamPolicyProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface DeleteProjectsRegionsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name: string;
}

export const DeleteProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies/{autoscalingPoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsRegionsAutoscalingPoliciesRequest>;

export type DeleteProjectsRegionsAutoscalingPoliciesResponse = Empty;
export const DeleteProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Deletes an autoscaling policy. It is an error to delete an autoscaling policy that is in use by one or more clusters. */
export const deleteProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  DeleteProjectsRegionsAutoscalingPoliciesRequest,
  DeleteProjectsRegionsAutoscalingPoliciesResponse,
  DeleteProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsRegionsAutoscalingPoliciesRequest,
  output: DeleteProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface GetProjectsRegionsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name: string;
}

export const GetProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies/{autoscalingPoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsRegionsAutoscalingPoliciesRequest>;

export type GetProjectsRegionsAutoscalingPoliciesResponse = AutoscalingPolicy;
export const GetProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoscalingPolicy;

export type GetProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Retrieves autoscaling policy. */
export const getProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  GetProjectsRegionsAutoscalingPoliciesRequest,
  GetProjectsRegionsAutoscalingPoliciesResponse,
  GetProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsRegionsAutoscalingPoliciesRequest,
  output: GetProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface UpdateProjectsRegionsAutoscalingPoliciesRequest {
  /** Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id} */
  name: string;
  /** Request body */
  body?: AutoscalingPolicy;
}

export const UpdateProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(AutoscalingPolicy).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies/{autoscalingPoliciesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateProjectsRegionsAutoscalingPoliciesRequest>;

export type UpdateProjectsRegionsAutoscalingPoliciesResponse =
  AutoscalingPolicy;
export const UpdateProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoscalingPolicy;

export type UpdateProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Updates (replaces) autoscaling policy.Disabled check for update_mask, because all updates will be full replacements. */
export const updateProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  UpdateProjectsRegionsAutoscalingPoliciesRequest,
  UpdateProjectsRegionsAutoscalingPoliciesResponse,
  UpdateProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProjectsRegionsAutoscalingPoliciesRequest,
  output: UpdateProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsRegionsAutoscalingPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies/{autoscalingPoliciesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsRegionsAutoscalingPoliciesRequest>;

export type GetIamPolicyProjectsRegionsAutoscalingPoliciesResponse = Policy;
export const GetIamPolicyProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  GetIamPolicyProjectsRegionsAutoscalingPoliciesRequest,
  GetIamPolicyProjectsRegionsAutoscalingPoliciesResponse,
  GetIamPolicyProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsRegionsAutoscalingPoliciesRequest,
  output: GetIamPolicyProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface CreateProjectsRegionsAutoscalingPoliciesRequest {
  /** Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name of the location has the following format: projects/{project_id}/locations/{location} */
  parent: string;
  /** Request body */
  body?: AutoscalingPolicy;
}

export const CreateProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(AutoscalingPolicy).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsRegionsAutoscalingPoliciesRequest>;

export type CreateProjectsRegionsAutoscalingPoliciesResponse =
  AutoscalingPolicy;
export const CreateProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoscalingPolicy;

export type CreateProjectsRegionsAutoscalingPoliciesError = DefaultErrors;

/** Creates new autoscaling policy. */
export const createProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  CreateProjectsRegionsAutoscalingPoliciesRequest,
  CreateProjectsRegionsAutoscalingPoliciesResponse,
  CreateProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsRegionsAutoscalingPoliciesRequest,
  output: CreateProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsRegionsAutoscalingPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsRegionsAutoscalingPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/regions/{regionsId}/autoscalingPolicies/{autoscalingPoliciesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsRegionsAutoscalingPoliciesRequest>;

export type TestIamPermissionsProjectsRegionsAutoscalingPoliciesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsRegionsAutoscalingPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsRegionsAutoscalingPoliciesError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsRegionsAutoscalingPolicies: API.OperationMethod<
  TestIamPermissionsProjectsRegionsAutoscalingPoliciesRequest,
  TestIamPermissionsProjectsRegionsAutoscalingPoliciesResponse,
  TestIamPermissionsProjectsRegionsAutoscalingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsRegionsAutoscalingPoliciesRequest,
  output: TestIamPermissionsProjectsRegionsAutoscalingPoliciesResponse,
  errors: [],
}));
