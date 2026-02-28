// ==========================================================================
// Dataflow API (dataflow v1b3)
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
  name: "dataflow",
  version: "v1b3",
  rootUrl: "https://dataflow.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GetDebugConfigRequest {
  /** The worker id, i.e., VM hostname. */
  workerId?: string;
  /** The internal component id for which debug configuration is requested. */
  componentId?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location?: string;
}

export const GetDebugConfigRequest: Schema.Schema<GetDebugConfigRequest> = Schema.suspend(() => Schema.Struct({
  workerId: Schema.optional(Schema.String),
  componentId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GetDebugConfigRequest" }) as any as Schema.Schema<GetDebugConfigRequest>;

export interface GetDebugConfigResponse {
  /** The encoded debug configuration for the requested component. */
  config?: string;
}

export const GetDebugConfigResponse: Schema.Schema<GetDebugConfigResponse> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(Schema.String),
})).annotate({ identifier: "GetDebugConfigResponse" }) as any as Schema.Schema<GetDebugConfigResponse>;

export interface SendDebugCaptureRequest {
  /** The worker id, i.e., VM hostname. */
  workerId?: string;
  /** The internal component id for which debug information is sent. */
  componentId?: string;
  /** The encoded debug information. */
  data?: string;
  /** Format for the data field above (id=5). */
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "RAW" | "JSON" | "ZLIB" | "BROTLI" | (string & {});
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location?: string;
}

export const SendDebugCaptureRequest: Schema.Schema<SendDebugCaptureRequest> = Schema.suspend(() => Schema.Struct({
  workerId: Schema.optional(Schema.String),
  componentId: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "SendDebugCaptureRequest" }) as any as Schema.Schema<SendDebugCaptureRequest>;

export interface SendDebugCaptureResponse {
}

export const SendDebugCaptureResponse: Schema.Schema<SendDebugCaptureResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SendDebugCaptureResponse" }) as any as Schema.Schema<SendDebugCaptureResponse>;

export interface GetWorkerStacktracesRequest {
  /** The worker for which to get stacktraces. The returned stacktraces will be for the SDK harness running on this worker. */
  workerId?: string;
  /** The end time for the stacktrace query. The returned stacktraces will be a recent stack trace at or shortly before this time. */
  endTime?: string;
}

export const GetWorkerStacktracesRequest: Schema.Schema<GetWorkerStacktracesRequest> = Schema.suspend(() => Schema.Struct({
  workerId: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GetWorkerStacktracesRequest" }) as any as Schema.Schema<GetWorkerStacktracesRequest>;

export interface Stack {
  /** Timestamp at which the stack was captured. */
  timestamp?: string;
  /** Thread name. For example, "CommitThread-0,10,main" */
  threadName?: string;
  /** The raw stack trace. */
  stackContent?: string;
  /** The state of the thread. For example, "WAITING". */
  threadState?: string;
  /** With java thread dumps we may get collapsed stacks e.g., N threads in stack "". Instead of having to copy over the same stack trace N times, this int field captures this. */
  threadCount?: number;
}

export const Stack: Schema.Schema<Stack> = Schema.suspend(() => Schema.Struct({
  timestamp: Schema.optional(Schema.String),
  threadName: Schema.optional(Schema.String),
  stackContent: Schema.optional(Schema.String),
  threadState: Schema.optional(Schema.String),
  threadCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Stack" }) as any as Schema.Schema<Stack>;

export interface Sdk {
  /** The SDK harness id. */
  sdkId?: string;
  /** The stacktraces for the processes running on the SDK harness. */
  stacks?: Array<Stack>;
}

export const Sdk: Schema.Schema<Sdk> = Schema.suspend(() => Schema.Struct({
  sdkId: Schema.optional(Schema.String),
  stacks: Schema.optional(Schema.Array(Stack)),
})).annotate({ identifier: "Sdk" }) as any as Schema.Schema<Sdk>;

export interface GetWorkerStacktracesResponse {
  /** Repeated as unified worker may have multiple SDK processes. */
  sdks?: Array<Sdk>;
}

export const GetWorkerStacktracesResponse: Schema.Schema<GetWorkerStacktracesResponse> = Schema.suspend(() => Schema.Struct({
  sdks: Schema.optional(Schema.Array(Sdk)),
})).annotate({ identifier: "GetWorkerStacktracesResponse" }) as any as Schema.Schema<GetWorkerStacktracesResponse>;

export interface PubsubSnapshotMetadata {
  /** The name of the Pubsub topic. */
  topicName?: string;
  /** The name of the Pubsub snapshot. */
  snapshotName?: string;
  /** The expire time of the Pubsub snapshot. */
  expireTime?: string;
}

export const PubsubSnapshotMetadata: Schema.Schema<PubsubSnapshotMetadata> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
  snapshotName: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PubsubSnapshotMetadata" }) as any as Schema.Schema<PubsubSnapshotMetadata>;

export interface Snapshot {
  /** The unique ID of this snapshot. */
  id?: string;
  /** The project this snapshot belongs to. */
  projectId?: string;
  /** The job this snapshot was created from. */
  sourceJobId?: string;
  /** The time this snapshot was created. */
  creationTime?: string;
  /** The time after which this snapshot will be automatically deleted. */
  ttl?: string;
  /** State of the snapshot. */
  state?: "UNKNOWN_SNAPSHOT_STATE" | "PENDING" | "RUNNING" | "READY" | "FAILED" | "DELETED" | (string & {});
  /** Pub/Sub snapshot metadata. */
  pubsubMetadata?: Array<PubsubSnapshotMetadata>;
  /** User specified description of the snapshot. Maybe empty. */
  description?: string;
  /** The disk byte size of the snapshot. Only available for snapshots in READY state. */
  diskSizeBytes?: string;
  /** Cloud region where this snapshot lives in, e.g., "us-central1". */
  region?: string;
}

export const Snapshot: Schema.Schema<Snapshot> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  sourceJobId: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  pubsubMetadata: Schema.optional(Schema.Array(PubsubSnapshotMetadata)),
  description: Schema.optional(Schema.String),
  diskSizeBytes: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "Snapshot" }) as any as Schema.Schema<Snapshot>;

export interface DeleteSnapshotResponse {
}

export const DeleteSnapshotResponse: Schema.Schema<DeleteSnapshotResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteSnapshotResponse" }) as any as Schema.Schema<DeleteSnapshotResponse>;

export interface ListSnapshotsResponse {
  /** Returned snapshots. */
  snapshots?: Array<Snapshot>;
}

export const ListSnapshotsResponse: Schema.Schema<ListSnapshotsResponse> = Schema.suspend(() => Schema.Struct({
  snapshots: Schema.optional(Schema.Array(Snapshot)),
})).annotate({ identifier: "ListSnapshotsResponse" }) as any as Schema.Schema<ListSnapshotsResponse>;

export interface Package {
  /** The name of the package. */
  name?: string;
  /** The resource to read the package from. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket} bucket.storage.googleapis.com/ */
  location?: string;
}

export const Package: Schema.Schema<Package> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface WorkerSettings {
  /** The base URL for accessing Google Cloud APIs. When workers access Google Cloud APIs, they logically do so via relative URLs. If this field is specified, it supplies the base URL to use for resolving these relative URLs. The normative algorithm used is defined by RFC 1808, "Relative Uniform Resource Locators". If not specified, the default value is "http://www.googleapis.com/" */
  baseUrl?: string;
  /** Whether to send work progress updates to the service. */
  reportingEnabled?: boolean;
  /** The Cloud Dataflow service path relative to the root URL, for example, "dataflow/v1b3/projects". */
  servicePath?: string;
  /** The Shuffle service path relative to the root URL, for example, "shuffle/v1beta1". */
  shuffleServicePath?: string;
  /** The ID of the worker running this pipeline. */
  workerId?: string;
  /** The prefix of the resources the system should use for temporary storage. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object} */
  tempStoragePrefix?: string;
}

export const WorkerSettings: Schema.Schema<WorkerSettings> = Schema.suspend(() => Schema.Struct({
  baseUrl: Schema.optional(Schema.String),
  reportingEnabled: Schema.optional(Schema.Boolean),
  servicePath: Schema.optional(Schema.String),
  shuffleServicePath: Schema.optional(Schema.String),
  workerId: Schema.optional(Schema.String),
  tempStoragePrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkerSettings" }) as any as Schema.Schema<WorkerSettings>;

export interface TaskRunnerSettings {
  /** The UNIX user ID on the worker VM to use for tasks launched by taskrunner; e.g. "root". */
  taskUser?: string;
  /** The UNIX group ID on the worker VM to use for tasks launched by taskrunner; e.g. "wheel". */
  taskGroup?: string;
  /** The OAuth2 scopes to be requested by the taskrunner in order to access the Cloud Dataflow API. */
  oauthScopes?: Array<string>;
  /** The base URL for the taskrunner to use when accessing Google Cloud APIs. When workers access Google Cloud APIs, they logically do so via relative URLs. If this field is specified, it supplies the base URL to use for resolving these relative URLs. The normative algorithm used is defined by RFC 1808, "Relative Uniform Resource Locators". If not specified, the default value is "http://www.googleapis.com/" */
  baseUrl?: string;
  /** The API version of endpoint, e.g. "v1b3" */
  dataflowApiVersion?: string;
  /** The settings to pass to the parallel worker harness. */
  parallelWorkerSettings?: WorkerSettings;
  /** The location on the worker for task-specific subdirectories. */
  baseTaskDir?: string;
  /** Whether to continue taskrunner if an exception is hit. */
  continueOnException?: boolean;
  /** Whether to send taskrunner log info to Google Compute Engine VM serial console. */
  logToSerialconsole?: boolean;
  /** Whether to also send taskrunner log info to stderr. */
  alsologtostderr?: boolean;
  /** Indicates where to put logs. If this is not specified, the logs will not be uploaded. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object} */
  logUploadLocation?: string;
  /** The directory on the VM to store logs. */
  logDir?: string;
  /** The prefix of the resources the taskrunner should use for temporary storage. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object} */
  tempStoragePrefix?: string;
  /** The command to launch the worker harness. */
  harnessCommand?: string;
  /** The file to store the workflow in. */
  workflowFileName?: string;
  /** The file to store preprocessing commands in. */
  commandlinesFileName?: string;
  /** The ID string of the VM. */
  vmId?: string;
  /** The suggested backend language. */
  languageHint?: string;
  /** The streaming worker main class name. */
  streamingWorkerMainClass?: string;
}

export const TaskRunnerSettings: Schema.Schema<TaskRunnerSettings> = Schema.suspend(() => Schema.Struct({
  taskUser: Schema.optional(Schema.String),
  taskGroup: Schema.optional(Schema.String),
  oauthScopes: Schema.optional(Schema.Array(Schema.String)),
  baseUrl: Schema.optional(Schema.String),
  dataflowApiVersion: Schema.optional(Schema.String),
  parallelWorkerSettings: Schema.optional(WorkerSettings),
  baseTaskDir: Schema.optional(Schema.String),
  continueOnException: Schema.optional(Schema.Boolean),
  logToSerialconsole: Schema.optional(Schema.Boolean),
  alsologtostderr: Schema.optional(Schema.Boolean),
  logUploadLocation: Schema.optional(Schema.String),
  logDir: Schema.optional(Schema.String),
  tempStoragePrefix: Schema.optional(Schema.String),
  harnessCommand: Schema.optional(Schema.String),
  workflowFileName: Schema.optional(Schema.String),
  commandlinesFileName: Schema.optional(Schema.String),
  vmId: Schema.optional(Schema.String),
  languageHint: Schema.optional(Schema.String),
  streamingWorkerMainClass: Schema.optional(Schema.String),
})).annotate({ identifier: "TaskRunnerSettings" }) as any as Schema.Schema<TaskRunnerSettings>;

export interface Disk {
  /** Size of disk in GB. If zero or unspecified, the service will attempt to choose a reasonable default. */
  sizeGb?: number;
  /** Disk storage type, as defined by Google Compute Engine. This must be a disk type appropriate to the project and zone in which the workers will run. If unknown or unspecified, the service will attempt to choose a reasonable default. For example, the standard persistent disk type is a resource name typically ending in "pd-standard". If SSD persistent disks are available, the resource name typically ends with "pd-ssd". The actual valid values are defined the Google Compute Engine API, not by the Cloud Dataflow API; consult the Google Compute Engine documentation for more information about determining the set of available disk types for a particular project and zone. Google Compute Engine Disk types are local to a particular project in a particular zone, and so the resource name will typically look something like this: compute.googleapis.com/projects/project-id/zones/zone/diskTypes/pd-standard */
  diskType?: string;
  /** Directory in a VM where disk is mounted. */
  mountPoint?: string;
}

export const Disk: Schema.Schema<Disk> = Schema.suspend(() => Schema.Struct({
  sizeGb: Schema.optional(Schema.Number),
  diskType: Schema.optional(Schema.String),
  mountPoint: Schema.optional(Schema.String),
})).annotate({ identifier: "Disk" }) as any as Schema.Schema<Disk>;

export interface AutoscalingSettings {
  /** The algorithm to use for autoscaling. */
  algorithm?: "AUTOSCALING_ALGORITHM_UNKNOWN" | "AUTOSCALING_ALGORITHM_NONE" | "AUTOSCALING_ALGORITHM_BASIC" | (string & {});
  /** The maximum number of workers to cap scaling at. */
  maxNumWorkers?: number;
}

export const AutoscalingSettings: Schema.Schema<AutoscalingSettings> = Schema.suspend(() => Schema.Struct({
  algorithm: Schema.optional(Schema.String),
  maxNumWorkers: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoscalingSettings" }) as any as Schema.Schema<AutoscalingSettings>;

export interface SdkHarnessContainerImage {
  /** A docker container image that resides in Google Container Registry. */
  containerImage?: string;
  /** If true, recommends the Dataflow service to use only one core per SDK container instance with this image. If false (or unset) recommends using more than one core per SDK container instance with this image for efficiency. Note that Dataflow service may choose to override this property if needed. */
  useSingleCorePerContainer?: boolean;
  /** Environment ID for the Beam runner API proto Environment that corresponds to the current SDK Harness. */
  environmentId?: string;
  /** The set of capabilities enumerated in the above Environment proto. See also [beam_runner_api.proto](https://github.com/apache/beam/blob/master/model/pipeline/src/main/proto/org/apache/beam/model/pipeline/v1/beam_runner_api.proto) */
  capabilities?: Array<string>;
}

export const SdkHarnessContainerImage: Schema.Schema<SdkHarnessContainerImage> = Schema.suspend(() => Schema.Struct({
  containerImage: Schema.optional(Schema.String),
  useSingleCorePerContainer: Schema.optional(Schema.Boolean),
  environmentId: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SdkHarnessContainerImage" }) as any as Schema.Schema<SdkHarnessContainerImage>;

export interface WorkerPool {
  /** The kind of the worker pool; currently only `harness` and `shuffle` are supported. */
  kind?: string;
  /** Number of Google Compute Engine workers in this pool needed to execute the job. If zero or unspecified, the service will attempt to choose a reasonable default. */
  numWorkers?: number;
  /** Packages to be installed on workers. */
  packages?: Array<Package>;
  /** The default package set to install. This allows the service to select a default set of packages which are useful to worker harnesses written in a particular language. */
  defaultPackageSet?: "DEFAULT_PACKAGE_SET_UNKNOWN" | "DEFAULT_PACKAGE_SET_NONE" | "DEFAULT_PACKAGE_SET_JAVA" | "DEFAULT_PACKAGE_SET_PYTHON" | (string & {});
  /** Machine type (e.g. "n1-standard-1"). If empty or unspecified, the service will attempt to choose a reasonable default. */
  machineType?: string;
  /** Sets the policy for determining when to turndown worker pool. Allowed values are: `TEARDOWN_ALWAYS`, `TEARDOWN_ON_SUCCESS`, and `TEARDOWN_NEVER`. `TEARDOWN_ALWAYS` means workers are always torn down regardless of whether the job succeeds. `TEARDOWN_ON_SUCCESS` means workers are torn down if the job succeeds. `TEARDOWN_NEVER` means the workers are never torn down. If the workers are not torn down by the service, they will continue to run and use Google Compute Engine VM resources in the user's project until they are explicitly terminated by the user. Because of this, Google recommends using the `TEARDOWN_ALWAYS` policy except for small, manually supervised test jobs. If unknown or unspecified, the service will attempt to choose a reasonable default. */
  teardownPolicy?: "TEARDOWN_POLICY_UNKNOWN" | "TEARDOWN_ALWAYS" | "TEARDOWN_ON_SUCCESS" | "TEARDOWN_NEVER" | (string & {});
  /** Size of root disk for VMs, in GB. If zero or unspecified, the service will attempt to choose a reasonable default. */
  diskSizeGb?: number;
  /** Type of root disk for VMs. If empty or unspecified, the service will attempt to choose a reasonable default. */
  diskType?: string;
  /** Optional. IOPS provisioned for the root disk for VMs. */
  diskProvisionedIops?: string;
  /** Optional. Throughput provisioned for the root disk for VMs. */
  diskProvisionedThroughputMibps?: string;
  /** Fully qualified source image for disks. */
  diskSourceImage?: string;
  /** Zone to run the worker pools in. If empty or unspecified, the service will attempt to choose a reasonable default. */
  zone?: string;
  /** Settings passed through to Google Compute Engine workers when using the standard Dataflow task runner. Users should ignore this field. */
  taskrunnerSettings?: TaskRunnerSettings;
  /** The action to take on host maintenance, as defined by the Google Compute Engine API. */
  onHostMaintenance?: string;
  /** Data disks that are used by a VM in this workflow. */
  dataDisks?: Array<Disk>;
  /** Metadata to set on the Google Compute Engine VMs. */
  metadata?: Record<string, string>;
  /** Settings for autoscaling of this WorkerPool. */
  autoscalingSettings?: AutoscalingSettings;
  /** Extra arguments for this worker pool. */
  poolArgs?: Record<string, unknown>;
  /** Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default". */
  network?: string;
  /** Subnetwork to which VMs will be assigned, if desired. Expected to be of the form "regions/REGION/subnetworks/SUBNETWORK". */
  subnetwork?: string;
  /** Required. Docker container image that executes the Cloud Dataflow worker harness, residing in Google Container Registry. Deprecated for the Fn API path. Use sdk_harness_container_images instead. */
  workerHarnessContainerImage?: string;
  /** The number of threads per worker harness. If empty or unspecified, the service will choose a number of threads (according to the number of cores on the selected machine type for batch, or 1 by convention for streaming). */
  numThreadsPerWorker?: number;
  /** Configuration for VM IPs. */
  ipConfiguration?: "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE" | (string & {});
  /** Set of SDK harness containers needed to execute this pipeline. This will only be set in the Fn API path. For non-cross-language pipelines this should have only one entry. Cross-language pipelines will have two or more entries. */
  sdkHarnessContainerImages?: Array<SdkHarnessContainerImage>;
}

export const WorkerPool: Schema.Schema<WorkerPool> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  numWorkers: Schema.optional(Schema.Number),
  packages: Schema.optional(Schema.Array(Package)),
  defaultPackageSet: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  teardownPolicy: Schema.optional(Schema.String),
  diskSizeGb: Schema.optional(Schema.Number),
  diskType: Schema.optional(Schema.String),
  diskProvisionedIops: Schema.optional(Schema.String),
  diskProvisionedThroughputMibps: Schema.optional(Schema.String),
  diskSourceImage: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  taskrunnerSettings: Schema.optional(TaskRunnerSettings),
  onHostMaintenance: Schema.optional(Schema.String),
  dataDisks: Schema.optional(Schema.Array(Disk)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  autoscalingSettings: Schema.optional(AutoscalingSettings),
  poolArgs: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  workerHarnessContainerImage: Schema.optional(Schema.String),
  numThreadsPerWorker: Schema.optional(Schema.Number),
  ipConfiguration: Schema.optional(Schema.String),
  sdkHarnessContainerImages: Schema.optional(Schema.Array(SdkHarnessContainerImage)),
})).annotate({ identifier: "WorkerPool" }) as any as Schema.Schema<WorkerPool>;

export interface DataSamplingConfig {
  /** List of given sampling behaviors to enable. For example, specifying behaviors = [ALWAYS_ON] samples in-flight elements but does not sample exceptions. Can be used to specify multiple behaviors like, behaviors = [ALWAYS_ON, EXCEPTIONS] for specifying periodic sampling and exception sampling. If DISABLED is in the list, then sampling will be disabled and ignore the other given behaviors. Ordering does not matter. */
  behaviors?: Array<"DATA_SAMPLING_BEHAVIOR_UNSPECIFIED" | "DISABLED" | "ALWAYS_ON" | "EXCEPTIONS" | (string & {})>;
}

export const DataSamplingConfig: Schema.Schema<DataSamplingConfig> = Schema.suspend(() => Schema.Struct({
  behaviors: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DataSamplingConfig" }) as any as Schema.Schema<DataSamplingConfig>;

export interface DebugOptions {
  /** Optional. When true, enables the logging of the literal hot key to the user's Cloud Logging. */
  enableHotKeyLogging?: boolean;
  /** Configuration options for sampling elements from a running pipeline. */
  dataSampling?: DataSamplingConfig;
}

export const DebugOptions: Schema.Schema<DebugOptions> = Schema.suspend(() => Schema.Struct({
  enableHotKeyLogging: Schema.optional(Schema.Boolean),
  dataSampling: Schema.optional(DataSamplingConfig),
})).annotate({ identifier: "DebugOptions" }) as any as Schema.Schema<DebugOptions>;

export interface Environment {
  /** The prefix of the resources the system should use for temporary storage. The system will append the suffix "/temp-{JOBNAME} to this resource prefix, where {JOBNAME} is the value of the job_name field. The resulting bucket and object prefix is used as the prefix of the resources used to store temporary data needed during the job execution. NOTE: This will override the value in taskrunner_settings. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object} */
  tempStoragePrefix?: string;
  /** The type of cluster manager API to use. If unknown or unspecified, the service will attempt to choose a reasonable default. This should be in the form of the API service name, e.g. "compute.googleapis.com". */
  clusterManagerApiService?: string;
  /** The list of experiments to enable. This field should be used for SDK related experiments and not for service related experiments. The proper field for service related experiments is service_options. */
  experiments?: Array<string>;
  /** Optional. The list of service options to enable. This field should be used for service related experiments only. These experiments, when graduating to GA, should be replaced by dedicated fields or become default (i.e. always on). */
  serviceOptions?: Array<string>;
  /** Optional. If set, contains the Cloud KMS key identifier used to encrypt data at rest, AKA a Customer Managed Encryption Key (CMEK). Format: projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY */
  serviceKmsKeyName?: string;
  /** The worker pools. At least one "harness" worker pool must be specified in order for the job to have workers. */
  workerPools?: Array<WorkerPool>;
  /** Optional. A description of the process that generated the request. */
  userAgent?: Record<string, unknown>;
  /** A structure describing which components and their versions of the service are required in order to run the job. */
  version?: Record<string, unknown>;
  /** Optional. The dataset for the current project where various workflow related tables are stored. The supported resource type is: Google BigQuery: bigquery.googleapis.com/{dataset} */
  dataset?: string;
  /** The Cloud Dataflow SDK pipeline options specified by the user. These options are passed through the service and are used to recreate the SDK pipeline options on the worker in a language agnostic and platform independent way. */
  sdkPipelineOptions?: Record<string, unknown>;
  /** Experimental settings. */
  internalExperiments?: Record<string, unknown>;
  /** Optional. Identity to run virtual machines as. Defaults to the default account. */
  serviceAccountEmail?: string;
  /** Optional. Which Flexible Resource Scheduling mode to run in. */
  flexResourceSchedulingGoal?: "FLEXRS_UNSPECIFIED" | "FLEXRS_SPEED_OPTIMIZED" | "FLEXRS_COST_OPTIMIZED" | (string & {});
  /** Optional. The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane's region. */
  workerRegion?: string;
  /** Optional. The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane's region is chosen based on available capacity. */
  workerZone?: string;
  /** Output only. The shuffle mode used for the job. */
  shuffleMode?: "SHUFFLE_MODE_UNSPECIFIED" | "VM_BASED" | "SERVICE_BASED" | (string & {});
  /** Optional. Any debugging options to be supplied to the job. */
  debugOptions?: DebugOptions;
  /** Output only. Whether the job uses the Streaming Engine resource-based billing model. */
  useStreamingEngineResourceBasedBilling?: boolean;
  /** Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes). */
  streamingMode?: "STREAMING_MODE_UNSPECIFIED" | "STREAMING_MODE_EXACTLY_ONCE" | "STREAMING_MODE_AT_LEAST_ONCE" | (string & {});
  /** Optional. True when any worker pool that uses public IPs is present. */
  usePublicIps?: boolean;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  tempStoragePrefix: Schema.optional(Schema.String),
  clusterManagerApiService: Schema.optional(Schema.String),
  experiments: Schema.optional(Schema.Array(Schema.String)),
  serviceOptions: Schema.optional(Schema.Array(Schema.String)),
  serviceKmsKeyName: Schema.optional(Schema.String),
  workerPools: Schema.optional(Schema.Array(WorkerPool)),
  userAgent: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  version: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  dataset: Schema.optional(Schema.String),
  sdkPipelineOptions: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  internalExperiments: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  serviceAccountEmail: Schema.optional(Schema.String),
  flexResourceSchedulingGoal: Schema.optional(Schema.String),
  workerRegion: Schema.optional(Schema.String),
  workerZone: Schema.optional(Schema.String),
  shuffleMode: Schema.optional(Schema.String),
  debugOptions: Schema.optional(DebugOptions),
  useStreamingEngineResourceBasedBilling: Schema.optional(Schema.Boolean),
  streamingMode: Schema.optional(Schema.String),
  usePublicIps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface Step {
  /** The kind of step in the Cloud Dataflow job. */
  kind?: string;
  /** The name that identifies the step. This must be unique for each step with respect to all other steps in the Cloud Dataflow job. */
  name?: string;
  /** Named properties associated with the step. Each kind of predefined step has its own required set of properties. Must be provided on Create. Only retrieved with JOB_VIEW_ALL. */
  properties?: Record<string, unknown>;
}

export const Step: Schema.Schema<Step> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Step" }) as any as Schema.Schema<Step>;

export interface JobExecutionStageInfo {
  /** The steps associated with the execution stage. Note that stages may have several steps, and that a given step might be run by more than one stage. */
  stepName?: Array<string>;
}

export const JobExecutionStageInfo: Schema.Schema<JobExecutionStageInfo> = Schema.suspend(() => Schema.Struct({
  stepName: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "JobExecutionStageInfo" }) as any as Schema.Schema<JobExecutionStageInfo>;

export interface JobExecutionInfo {
  /** A mapping from each stage to the information about that stage. */
  stages?: Record<string, JobExecutionStageInfo>;
}

export const JobExecutionInfo: Schema.Schema<JobExecutionInfo> = Schema.suspend(() => Schema.Struct({
  stages: Schema.optional(Schema.Record(Schema.String, JobExecutionStageInfo)),
})).annotate({ identifier: "JobExecutionInfo" }) as any as Schema.Schema<JobExecutionInfo>;

export interface DisplayData {
  /** The key identifying the display data. This is intended to be used as a label for the display data when viewed in a dax monitoring system. */
  key?: string;
  /** The namespace for the key. This is usually a class name or programming language namespace (i.e. python module) which defines the display data. This allows a dax monitoring system to specially handle the data and perform custom rendering. */
  namespace?: string;
  /** Contains value if the data is of string type. */
  strValue?: string;
  /** Contains value if the data is of int64 type. */
  int64Value?: string;
  /** Contains value if the data is of float type. */
  floatValue?: number;
  /** Contains value if the data is of java class type. */
  javaClassValue?: string;
  /** Contains value if the data is of timestamp type. */
  timestampValue?: string;
  /** Contains value if the data is of duration type. */
  durationValue?: string;
  /** Contains value if the data is of a boolean type. */
  boolValue?: boolean;
  /** A possible additional shorter value to display. For example a java_class_name_value of com.mypackage.MyDoFn will be stored with MyDoFn as the short_str_value and com.mypackage.MyDoFn as the java_class_name value. short_str_value can be displayed and java_class_name_value will be displayed as a tooltip. */
  shortStrValue?: string;
  /** An optional full URL. */
  url?: string;
  /** An optional label to display in a dax UI for the element. */
  label?: string;
}

export const DisplayData: Schema.Schema<DisplayData> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  strValue: Schema.optional(Schema.String),
  int64Value: Schema.optional(Schema.String),
  floatValue: Schema.optional(Schema.Number),
  javaClassValue: Schema.optional(Schema.String),
  timestampValue: Schema.optional(Schema.String),
  durationValue: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
  shortStrValue: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "DisplayData" }) as any as Schema.Schema<DisplayData>;

export interface TransformSummary {
  /** Type of transform. */
  kind?: "UNKNOWN_KIND" | "PAR_DO_KIND" | "GROUP_BY_KEY_KIND" | "FLATTEN_KIND" | "READ_KIND" | "WRITE_KIND" | "CONSTANT_KIND" | "SINGLETON_KIND" | "SHUFFLE_KIND" | (string & {});
  /** SDK generated id of this transform instance. */
  id?: string;
  /** User provided name for this transform instance. */
  name?: string;
  /** Transform-specific display data. */
  displayData?: Array<DisplayData>;
  /** User names for all collection outputs to this transform. */
  outputCollectionName?: Array<string>;
  /** User names for all collection inputs to this transform. */
  inputCollectionName?: Array<string>;
}

export const TransformSummary: Schema.Schema<TransformSummary> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayData: Schema.optional(Schema.Array(DisplayData)),
  outputCollectionName: Schema.optional(Schema.Array(Schema.String)),
  inputCollectionName: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TransformSummary" }) as any as Schema.Schema<TransformSummary>;

export interface StageSource {
  /** Human-readable name for this source; may be user or system generated. */
  userName?: string;
  /** Dataflow service generated name for this source. */
  name?: string;
  /** User name for the original user transform or collection with which this source is most closely associated. */
  originalTransformOrCollection?: string;
  /** Size of the source, if measurable. */
  sizeBytes?: string;
}

export const StageSource: Schema.Schema<StageSource> = Schema.suspend(() => Schema.Struct({
  userName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  originalTransformOrCollection: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "StageSource" }) as any as Schema.Schema<StageSource>;

export interface ComponentTransform {
  /** Human-readable name for this transform; may be user or system generated. */
  userName?: string;
  /** Dataflow service generated name for this source. */
  name?: string;
  /** User name for the original user transform with which this transform is most closely associated. */
  originalTransform?: string;
}

export const ComponentTransform: Schema.Schema<ComponentTransform> = Schema.suspend(() => Schema.Struct({
  userName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  originalTransform: Schema.optional(Schema.String),
})).annotate({ identifier: "ComponentTransform" }) as any as Schema.Schema<ComponentTransform>;

export interface ComponentSource {
  /** Human-readable name for this transform; may be user or system generated. */
  userName?: string;
  /** Dataflow service generated name for this source. */
  name?: string;
  /** User name for the original user transform or collection with which this source is most closely associated. */
  originalTransformOrCollection?: string;
}

export const ComponentSource: Schema.Schema<ComponentSource> = Schema.suspend(() => Schema.Struct({
  userName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  originalTransformOrCollection: Schema.optional(Schema.String),
})).annotate({ identifier: "ComponentSource" }) as any as Schema.Schema<ComponentSource>;

export interface ExecutionStageSummary {
  /** Dataflow service generated name for this stage. */
  name?: string;
  /** Dataflow service generated id for this stage. */
  id?: string;
  /** Type of transform this stage is executing. */
  kind?: "UNKNOWN_KIND" | "PAR_DO_KIND" | "GROUP_BY_KEY_KIND" | "FLATTEN_KIND" | "READ_KIND" | "WRITE_KIND" | "CONSTANT_KIND" | "SINGLETON_KIND" | "SHUFFLE_KIND" | (string & {});
  /** Input sources for this stage. */
  inputSource?: Array<StageSource>;
  /** Output sources for this stage. */
  outputSource?: Array<StageSource>;
  /** Other stages that must complete before this stage can run. */
  prerequisiteStage?: Array<string>;
  /** Transforms that comprise this execution stage. */
  componentTransform?: Array<ComponentTransform>;
  /** Collections produced and consumed by component transforms of this stage. */
  componentSource?: Array<ComponentSource>;
}

export const ExecutionStageSummary: Schema.Schema<ExecutionStageSummary> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  inputSource: Schema.optional(Schema.Array(StageSource)),
  outputSource: Schema.optional(Schema.Array(StageSource)),
  prerequisiteStage: Schema.optional(Schema.Array(Schema.String)),
  componentTransform: Schema.optional(Schema.Array(ComponentTransform)),
  componentSource: Schema.optional(Schema.Array(ComponentSource)),
})).annotate({ identifier: "ExecutionStageSummary" }) as any as Schema.Schema<ExecutionStageSummary>;

export interface PipelineDescription {
  /** Description of each transform in the pipeline and collections between them. */
  originalPipelineTransform?: Array<TransformSummary>;
  /** Description of each stage of execution of the pipeline. */
  executionPipelineStage?: Array<ExecutionStageSummary>;
  /** Pipeline level display data. */
  displayData?: Array<DisplayData>;
  /** A hash value of the submitted pipeline portable graph step names if exists. */
  stepNamesHash?: string;
}

export const PipelineDescription: Schema.Schema<PipelineDescription> = Schema.suspend(() => Schema.Struct({
  originalPipelineTransform: Schema.optional(Schema.Array(TransformSummary)),
  executionPipelineStage: Schema.optional(Schema.Array(ExecutionStageSummary)),
  displayData: Schema.optional(Schema.Array(DisplayData)),
  stepNamesHash: Schema.optional(Schema.String),
})).annotate({ identifier: "PipelineDescription" }) as any as Schema.Schema<PipelineDescription>;

export interface ExecutionStageState {
  /** The name of the execution stage. */
  executionStageName?: string;
  /** Executions stage states allow the same set of values as JobState. */
  executionStageState?: "JOB_STATE_UNKNOWN" | "JOB_STATE_STOPPED" | "JOB_STATE_RUNNING" | "JOB_STATE_DONE" | "JOB_STATE_FAILED" | "JOB_STATE_CANCELLED" | "JOB_STATE_UPDATED" | "JOB_STATE_DRAINING" | "JOB_STATE_DRAINED" | "JOB_STATE_PENDING" | "JOB_STATE_CANCELLING" | "JOB_STATE_QUEUED" | "JOB_STATE_RESOURCE_CLEANING_UP" | "JOB_STATE_PAUSING" | "JOB_STATE_PAUSED" | (string & {});
  /** The time at which the stage transitioned to this state. */
  currentStateTime?: string;
}

export const ExecutionStageState: Schema.Schema<ExecutionStageState> = Schema.suspend(() => Schema.Struct({
  executionStageName: Schema.optional(Schema.String),
  executionStageState: Schema.optional(Schema.String),
  currentStateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutionStageState" }) as any as Schema.Schema<ExecutionStageState>;

export interface SdkBug {
  /** Output only. Describes the impact of this SDK bug. */
  type?: "TYPE_UNSPECIFIED" | "GENERAL" | "PERFORMANCE" | "DATALOSS" | (string & {});
  /** Output only. How severe the SDK bug is. */
  severity?: "SEVERITY_UNSPECIFIED" | "NOTICE" | "WARNING" | "SEVERE" | (string & {});
  /** Output only. Link to more information on the bug. */
  uri?: string;
}

export const SdkBug: Schema.Schema<SdkBug> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "SdkBug" }) as any as Schema.Schema<SdkBug>;

export interface SdkVersion {
  /** The version of the SDK used to run the job. */
  version?: string;
  /** A readable string describing the version of the SDK. */
  versionDisplayName?: string;
  /** The support status for this SDK version. */
  sdkSupportStatus?: "UNKNOWN" | "SUPPORTED" | "STALE" | "DEPRECATED" | "UNSUPPORTED" | (string & {});
  /** Output only. Known bugs found in this SDK version. */
  bugs?: Array<SdkBug>;
}

export const SdkVersion: Schema.Schema<SdkVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  versionDisplayName: Schema.optional(Schema.String),
  sdkSupportStatus: Schema.optional(Schema.String),
  bugs: Schema.optional(Schema.Array(SdkBug)),
})).annotate({ identifier: "SdkVersion" }) as any as Schema.Schema<SdkVersion>;

export interface SpannerIODetails {
  /** ProjectId accessed in the connection. */
  projectId?: string;
  /** InstanceId accessed in the connection. */
  instanceId?: string;
  /** DatabaseId accessed in the connection. */
  databaseId?: string;
}

export const SpannerIODetails: Schema.Schema<SpannerIODetails> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  databaseId: Schema.optional(Schema.String),
})).annotate({ identifier: "SpannerIODetails" }) as any as Schema.Schema<SpannerIODetails>;

export interface BigQueryIODetails {
  /** Table accessed in the connection. */
  table?: string;
  /** Dataset accessed in the connection. */
  dataset?: string;
  /** Project accessed in the connection. */
  projectId?: string;
  /** Query used to access data in the connection. */
  query?: string;
}

export const BigQueryIODetails: Schema.Schema<BigQueryIODetails> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(Schema.String),
  dataset: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryIODetails" }) as any as Schema.Schema<BigQueryIODetails>;

export interface BigTableIODetails {
  /** ProjectId accessed in the connection. */
  projectId?: string;
  /** InstanceId accessed in the connection. */
  instanceId?: string;
  /** TableId accessed in the connection. */
  tableId?: string;
}

export const BigTableIODetails: Schema.Schema<BigTableIODetails> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
})).annotate({ identifier: "BigTableIODetails" }) as any as Schema.Schema<BigTableIODetails>;

export interface PubSubIODetails {
  /** Topic accessed in the connection. */
  topic?: string;
  /** Subscription used in the connection. */
  subscription?: string;
}

export const PubSubIODetails: Schema.Schema<PubSubIODetails> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  subscription: Schema.optional(Schema.String),
})).annotate({ identifier: "PubSubIODetails" }) as any as Schema.Schema<PubSubIODetails>;

export interface FileIODetails {
  /** File Pattern used to access files by the connector. */
  filePattern?: string;
}

export const FileIODetails: Schema.Schema<FileIODetails> = Schema.suspend(() => Schema.Struct({
  filePattern: Schema.optional(Schema.String),
})).annotate({ identifier: "FileIODetails" }) as any as Schema.Schema<FileIODetails>;

export interface DatastoreIODetails {
  /** Namespace used in the connection. */
  namespace?: string;
  /** ProjectId accessed in the connection. */
  projectId?: string;
}

export const DatastoreIODetails: Schema.Schema<DatastoreIODetails> = Schema.suspend(() => Schema.Struct({
  namespace: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "DatastoreIODetails" }) as any as Schema.Schema<DatastoreIODetails>;

export interface JobMetadata {
  /** The SDK version used to run the job. */
  sdkVersion?: SdkVersion;
  /** Identification of a Spanner source used in the Dataflow job. */
  spannerDetails?: Array<SpannerIODetails>;
  /** Identification of a BigQuery source used in the Dataflow job. */
  bigqueryDetails?: Array<BigQueryIODetails>;
  /** Identification of a Cloud Bigtable source used in the Dataflow job. */
  bigTableDetails?: Array<BigTableIODetails>;
  /** Identification of a Pub/Sub source used in the Dataflow job. */
  pubsubDetails?: Array<PubSubIODetails>;
  /** Identification of a File source used in the Dataflow job. */
  fileDetails?: Array<FileIODetails>;
  /** Identification of a Datastore source used in the Dataflow job. */
  datastoreDetails?: Array<DatastoreIODetails>;
  /** List of display properties to help UI filter jobs. */
  userDisplayProperties?: Record<string, string>;
}

export const JobMetadata: Schema.Schema<JobMetadata> = Schema.suspend(() => Schema.Struct({
  sdkVersion: Schema.optional(SdkVersion),
  spannerDetails: Schema.optional(Schema.Array(SpannerIODetails)),
  bigqueryDetails: Schema.optional(Schema.Array(BigQueryIODetails)),
  bigTableDetails: Schema.optional(Schema.Array(BigTableIODetails)),
  pubsubDetails: Schema.optional(Schema.Array(PubSubIODetails)),
  fileDetails: Schema.optional(Schema.Array(FileIODetails)),
  datastoreDetails: Schema.optional(Schema.Array(DatastoreIODetails)),
  userDisplayProperties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "JobMetadata" }) as any as Schema.Schema<JobMetadata>;

export interface RuntimeUpdatableParams {
  /** The maximum number of workers to cap autoscaling at. This field is currently only supported for Streaming Engine jobs. */
  maxNumWorkers?: number;
  /** The minimum number of workers to scale down to. This field is currently only supported for Streaming Engine jobs. */
  minNumWorkers?: number;
  /** Target worker utilization, compared against the aggregate utilization of the worker pool by autoscaler, to determine upscaling and downscaling when absent other constraints such as backlog. For more information, see [Update an existing pipeline](https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline). */
  workerUtilizationHint?: number;
  /** Optional. Deprecated: Use `autoscaling_tier` instead. The backlog threshold duration in seconds for autoscaling. Value must be non-negative. */
  acceptableBacklogDuration?: string;
  /** Optional. The backlog threshold tier for autoscaling. Value must be one of "low-latency", "medium-latency", or "high-latency". */
  autoscalingTier?: string;
}

export const RuntimeUpdatableParams: Schema.Schema<RuntimeUpdatableParams> = Schema.suspend(() => Schema.Struct({
  maxNumWorkers: Schema.optional(Schema.Number),
  minNumWorkers: Schema.optional(Schema.Number),
  workerUtilizationHint: Schema.optional(Schema.Number),
  acceptableBacklogDuration: Schema.optional(Schema.String),
  autoscalingTier: Schema.optional(Schema.String),
})).annotate({ identifier: "RuntimeUpdatableParams" }) as any as Schema.Schema<RuntimeUpdatableParams>;

export interface ServiceResources {
  /** Output only. List of Cloud Zones being used by the Dataflow Service for this job. Example: us-central1-c */
  zones?: Array<string>;
}

export const ServiceResources: Schema.Schema<ServiceResources> = Schema.suspend(() => Schema.Struct({
  zones: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ServiceResources" }) as any as Schema.Schema<ServiceResources>;

export interface Job {
  /** The unique ID of this job. This field is set by the Dataflow service when the job is created, and is immutable for the life of the job. */
  id?: string;
  /** The ID of the Google Cloud project that the job belongs to. */
  projectId?: string;
  /** Optional. The user-specified Dataflow job name. Only one active job with a given name can exist in a project within one region at any given time. Jobs in different regions can have the same name. If a caller attempts to create a job with the same name as an active job that already exists, the attempt returns the existing job. The name must match the regular expression `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?` */
  name?: string;
  /** Optional. The type of Dataflow job. */
  type?: "JOB_TYPE_UNKNOWN" | "JOB_TYPE_BATCH" | "JOB_TYPE_STREAMING" | (string & {});
  /** Optional. The environment for the job. */
  environment?: Environment;
  /** Exactly one of step or steps_location should be specified. The top-level steps that constitute the entire job. Only retrieved with JOB_VIEW_ALL. */
  steps?: Array<Step>;
  /** The Cloud Storage location where the steps are stored. */
  stepsLocation?: string;
  /** The current state of the job. Jobs are created in the `JOB_STATE_STOPPED` state unless otherwise specified. A job in the `JOB_STATE_RUNNING` state may asynchronously enter a terminal state. After a job has reached a terminal state, no further state updates may be made. This field might be mutated by the Dataflow service; callers cannot mutate it. */
  currentState?: "JOB_STATE_UNKNOWN" | "JOB_STATE_STOPPED" | "JOB_STATE_RUNNING" | "JOB_STATE_DONE" | "JOB_STATE_FAILED" | "JOB_STATE_CANCELLED" | "JOB_STATE_UPDATED" | "JOB_STATE_DRAINING" | "JOB_STATE_DRAINED" | "JOB_STATE_PENDING" | "JOB_STATE_CANCELLING" | "JOB_STATE_QUEUED" | "JOB_STATE_RESOURCE_CLEANING_UP" | "JOB_STATE_PAUSING" | "JOB_STATE_PAUSED" | (string & {});
  /** The timestamp associated with the current state. */
  currentStateTime?: string;
  /** The job's requested state. Applies to `UpdateJob` requests. Set `requested_state` with `UpdateJob` requests to switch between the states `JOB_STATE_STOPPED` and `JOB_STATE_RUNNING`. You can also use `UpdateJob` requests to change a job's state from `JOB_STATE_RUNNING` to `JOB_STATE_CANCELLED`, `JOB_STATE_DONE`, or `JOB_STATE_DRAINED`. These states irrevocably terminate the job if it hasn't already reached a terminal state. This field has no effect on `CreateJob` requests. */
  requestedState?: "JOB_STATE_UNKNOWN" | "JOB_STATE_STOPPED" | "JOB_STATE_RUNNING" | "JOB_STATE_DONE" | "JOB_STATE_FAILED" | "JOB_STATE_CANCELLED" | "JOB_STATE_UPDATED" | "JOB_STATE_DRAINING" | "JOB_STATE_DRAINED" | "JOB_STATE_PENDING" | "JOB_STATE_CANCELLING" | "JOB_STATE_QUEUED" | "JOB_STATE_RESOURCE_CLEANING_UP" | "JOB_STATE_PAUSING" | "JOB_STATE_PAUSED" | (string & {});
  /** Deprecated. */
  executionInfo?: JobExecutionInfo;
  /** The timestamp when the job was initially created. Immutable and set by the Cloud Dataflow service. */
  createTime?: string;
  /** If this job is an update of an existing job, this field is the job ID of the job it replaced. When sending a `CreateJobRequest`, you can update a job by specifying it here. The job named here is stopped, and its intermediate state is transferred to this job. */
  replaceJobId?: string;
  /** Optional. The map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job. */
  transformNameMapping?: Record<string, string>;
  /** The client's unique identifier of the job, re-used across retried attempts. If this field is set, the service will ensure its uniqueness. The request to create a job will fail if the service has knowledge of a previously submitted job with the same client's ID and job name. The caller may use this field to ensure idempotence of job creation across retried attempts to create a job. By default, the field is empty and, in that case, the service ignores it. */
  clientRequestId?: string;
  /** If another job is an update of this job (and thus, this job is in `JOB_STATE_UPDATED`), this field contains the ID of that job. */
  replacedByJobId?: string;
  /** A set of files the system should be aware of that are used for temporary storage. These temporary files will be removed on job completion. No duplicates are allowed. No file patterns are supported. The supported files are: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object} */
  tempFiles?: Array<string>;
  /** User-defined labels for this job. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions: * Keys must conform to regexp: \p{Ll}\p{Lo}{0,62} * Values must conform to regexp: [\p{Ll}\p{Lo}\p{N}_-]{0,63} * Both keys and values are additionally constrained to be <= 128 bytes in size. */
  labels?: Record<string, string>;
  /** Optional. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location?: string;
  /** Preliminary field: The format of this data may change at any time. A description of the user pipeline and stages through which it is executed. Created by Cloud Dataflow service. Only retrieved with JOB_VIEW_DESCRIPTION or JOB_VIEW_ALL. */
  pipelineDescription?: PipelineDescription;
  /** This field may be mutated by the Cloud Dataflow service; callers cannot mutate it. */
  stageStates?: Array<ExecutionStageState>;
  /** This field is populated by the Dataflow service to support filtering jobs by the metadata values provided here. Populated for ListJobs and all GetJob views SUMMARY and higher. */
  jobMetadata?: JobMetadata;
  /** The timestamp when the job was started (transitioned to JOB_STATE_PENDING). Flexible resource scheduling jobs are started with some delay after job creation, so start_time is unset before start and is updated when the job is started by the Cloud Dataflow service. For other jobs, start_time always equals to create_time and is immutable and set by the Cloud Dataflow service. */
  startTime?: string;
  /** If this is specified, the job's initial state is populated from the given snapshot. */
  createdFromSnapshotId?: string;
  /** Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests. */
  satisfiesPzs?: boolean;
  /** This field may ONLY be modified at runtime using the projects.jobs.update method to adjust job behavior. This field has no effect when specified at job creation. */
  runtimeUpdatableParams?: RuntimeUpdatableParams;
  /** Output only. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests. */
  satisfiesPzi?: boolean;
  /** Output only. Resources used by the Dataflow Service to run the job. */
  serviceResources?: ServiceResources;
  /** Output only. Indicates whether the job can be paused. */
  pausable?: boolean;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  environment: Schema.optional(Environment),
  steps: Schema.optional(Schema.Array(Step)),
  stepsLocation: Schema.optional(Schema.String),
  currentState: Schema.optional(Schema.String),
  currentStateTime: Schema.optional(Schema.String),
  requestedState: Schema.optional(Schema.String),
  executionInfo: Schema.optional(JobExecutionInfo),
  createTime: Schema.optional(Schema.String),
  replaceJobId: Schema.optional(Schema.String),
  transformNameMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  clientRequestId: Schema.optional(Schema.String),
  replacedByJobId: Schema.optional(Schema.String),
  tempFiles: Schema.optional(Schema.Array(Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
  pipelineDescription: Schema.optional(PipelineDescription),
  stageStates: Schema.optional(Schema.Array(ExecutionStageState)),
  jobMetadata: Schema.optional(JobMetadata),
  startTime: Schema.optional(Schema.String),
  createdFromSnapshotId: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  runtimeUpdatableParams: Schema.optional(RuntimeUpdatableParams),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  serviceResources: Schema.optional(ServiceResources),
  pausable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface FailedLocation {
  /** The name of the [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that failed to respond. */
  name?: string;
}

export const FailedLocation: Schema.Schema<FailedLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "FailedLocation" }) as any as Schema.Schema<FailedLocation>;

export interface ListJobsResponse {
  /** A subset of the requested job information. */
  jobs?: Array<Job>;
  /** Set if there may be more results than fit in this response. */
  nextPageToken?: string;
  /** Zero or more messages describing the [regional endpoints] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that failed to respond. */
  failedLocation?: Array<FailedLocation>;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(Job)),
  nextPageToken: Schema.optional(Schema.String),
  failedLocation: Schema.optional(Schema.Array(FailedLocation)),
})).annotate({ identifier: "ListJobsResponse" }) as any as Schema.Schema<ListJobsResponse>;

export interface SnapshotJobRequest {
  /** TTL for the snapshot. */
  ttl?: string;
  /** The location that contains this job. */
  location?: string;
  /** If true, perform snapshots for sources which support this. */
  snapshotSources?: boolean;
  /** User specified description of the snapshot. Maybe empty. */
  description?: string;
}

export const SnapshotJobRequest: Schema.Schema<SnapshotJobRequest> = Schema.suspend(() => Schema.Struct({
  ttl: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  snapshotSources: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "SnapshotJobRequest" }) as any as Schema.Schema<SnapshotJobRequest>;

export interface RuntimeEnvironment {
  /** Optional. The initial number of Google Compute Engine instances for the job. The default value is 11. */
  numWorkers?: number;
  /** Optional. The maximum number of Google Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000. The default value is 1. */
  maxWorkers?: number;
  /** Optional. The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence. */
  zone?: string;
  /** Optional. The email address of the service account to run the job as. */
  serviceAccountEmail?: string;
  /** Required. The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  tempLocation?: string;
  /** Optional. Whether to bypass the safety checks for the job's temporary directory. Use with caution. */
  bypassTempDirValidation?: boolean;
  /** Optional. The machine type to use for the job. Defaults to the value from the template if not specified. */
  machineType?: string;
  /** Optional. Additional experiment flags for the job, specified with the `--experiments` option. */
  additionalExperiments?: Array<string>;
  /** Optional. Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default". */
  network?: string;
  /** Optional. Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL. */
  subnetwork?: string;
  /** Optional. Additional user labels to be specified for the job. Keys and values should follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }. */
  additionalUserLabels?: Record<string, string>;
  /** Optional. Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/ */
  kmsKeyName?: string;
  /** Optional. Configuration for VM IPs. */
  ipConfiguration?: "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE" | (string & {});
  /** Required. The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane's region. */
  workerRegion?: string;
  /** Optional. The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane's region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence. */
  workerZone?: string;
  /** Optional. Whether to enable Streaming Engine for the job. */
  enableStreamingEngine?: boolean;
  /** Optional. The disk size, in gigabytes, to use on each remote Compute Engine worker instance. */
  diskSizeGb?: number;
  /** Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes). */
  streamingMode?: "STREAMING_MODE_UNSPECIFIED" | "STREAMING_MODE_EXACTLY_ONCE" | "STREAMING_MODE_AT_LEAST_ONCE" | (string & {});
  /** Optional. Additional pipeline option flags for the job. */
  additionalPipelineOptions?: Array<string>;
}

export const RuntimeEnvironment: Schema.Schema<RuntimeEnvironment> = Schema.suspend(() => Schema.Struct({
  numWorkers: Schema.optional(Schema.Number),
  maxWorkers: Schema.optional(Schema.Number),
  zone: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  tempLocation: Schema.optional(Schema.String),
  bypassTempDirValidation: Schema.optional(Schema.Boolean),
  machineType: Schema.optional(Schema.String),
  additionalExperiments: Schema.optional(Schema.Array(Schema.String)),
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  additionalUserLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kmsKeyName: Schema.optional(Schema.String),
  ipConfiguration: Schema.optional(Schema.String),
  workerRegion: Schema.optional(Schema.String),
  workerZone: Schema.optional(Schema.String),
  enableStreamingEngine: Schema.optional(Schema.Boolean),
  diskSizeGb: Schema.optional(Schema.Number),
  streamingMode: Schema.optional(Schema.String),
  additionalPipelineOptions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RuntimeEnvironment" }) as any as Schema.Schema<RuntimeEnvironment>;

export interface CreateJobFromTemplateRequest {
  /** Required. The job name to use for the created job. */
  jobName?: string;
  /** Required. A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  gcsPath?: string;
  /** The runtime parameters to pass to the job. */
  parameters?: Record<string, string>;
  /** The runtime environment for the job. */
  environment?: RuntimeEnvironment;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location?: string;
}

export const CreateJobFromTemplateRequest: Schema.Schema<CreateJobFromTemplateRequest> = Schema.suspend(() => Schema.Struct({
  jobName: Schema.optional(Schema.String),
  gcsPath: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  environment: Schema.optional(RuntimeEnvironment),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateJobFromTemplateRequest" }) as any as Schema.Schema<CreateJobFromTemplateRequest>;

export interface LaunchTemplateParameters {
  /** Required. The job name to use for the created job. The name must match the regular expression `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?` */
  jobName?: string;
  /** The runtime parameters to pass to the job. */
  parameters?: Record<string, string>;
  /** The runtime environment for the job. */
  environment?: RuntimeEnvironment;
  /** If set, replace the existing pipeline with the name specified by jobName with this pipeline, preserving state. */
  update?: boolean;
  /** Only applicable when updating a pipeline. Map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job. */
  transformNameMapping?: Record<string, string>;
}

export const LaunchTemplateParameters: Schema.Schema<LaunchTemplateParameters> = Schema.suspend(() => Schema.Struct({
  jobName: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  environment: Schema.optional(RuntimeEnvironment),
  update: Schema.optional(Schema.Boolean),
  transformNameMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "LaunchTemplateParameters" }) as any as Schema.Schema<LaunchTemplateParameters>;

export interface LaunchTemplateResponse {
  /** The job that was launched, if the request was not a dry run and the job was successfully launched. */
  job?: Job;
}

export const LaunchTemplateResponse: Schema.Schema<LaunchTemplateResponse> = Schema.suspend(() => Schema.Struct({
  job: Schema.optional(Job),
})).annotate({ identifier: "LaunchTemplateResponse" }) as any as Schema.Schema<LaunchTemplateResponse>;

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

export interface ParameterMetadataEnumOption {
  /** Required. The value of the enum option. */
  value?: string;
  /** Optional. The label to display for the enum option. */
  label?: string;
  /** Optional. The description to display for the enum option. */
  description?: string;
}

export const ParameterMetadataEnumOption: Schema.Schema<ParameterMetadataEnumOption> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ParameterMetadataEnumOption" }) as any as Schema.Schema<ParameterMetadataEnumOption>;

export interface ParameterMetadata {
  /** Required. The name of the parameter. */
  name?: string;
  /** Required. The label to display for the parameter. */
  label?: string;
  /** Required. The help text to display for the parameter. */
  helpText?: string;
  /** Optional. Whether the parameter is optional. Defaults to false. */
  isOptional?: boolean;
  /** Optional. Regexes that the parameter must match. */
  regexes?: Array<string>;
  /** Optional. The type of the parameter. Used for selecting input picker. */
  paramType?: "DEFAULT" | "TEXT" | "GCS_READ_BUCKET" | "GCS_WRITE_BUCKET" | "GCS_READ_FILE" | "GCS_WRITE_FILE" | "GCS_READ_FOLDER" | "GCS_WRITE_FOLDER" | "PUBSUB_TOPIC" | "PUBSUB_SUBSCRIPTION" | "BIGQUERY_TABLE" | "JAVASCRIPT_UDF_FILE" | "SERVICE_ACCOUNT" | "MACHINE_TYPE" | "KMS_KEY_NAME" | "WORKER_REGION" | "WORKER_ZONE" | "BOOLEAN" | "ENUM" | "NUMBER" | "KAFKA_TOPIC" | "KAFKA_READ_TOPIC" | "KAFKA_WRITE_TOPIC" | (string & {});
  /** Optional. Additional metadata for describing this parameter. */
  customMetadata?: Record<string, string>;
  /** Optional. Specifies a group name for this parameter to be rendered under. Group header text will be rendered exactly as specified in this field. Only considered when parent_name is NOT provided. */
  groupName?: string;
  /** Optional. Specifies the name of the parent parameter. Used in conjunction with 'parent_trigger_values' to make this parameter conditional (will only be rendered conditionally). Should be mappable to a ParameterMetadata.name field. */
  parentName?: string;
  /** Optional. The value(s) of the 'parent_name' parameter which will trigger this parameter to be shown. If left empty, ANY non-empty value in parent_name will trigger this parameter to be shown. Only considered when this parameter is conditional (when 'parent_name' has been provided). */
  parentTriggerValues?: Array<string>;
  /** Optional. The options shown when ENUM ParameterType is specified. */
  enumOptions?: Array<ParameterMetadataEnumOption>;
  /** Optional. The default values will pre-populate the parameter with the given value from the proto. If default_value is left empty, the parameter will be populated with a default of the relevant type, e.g. false for a boolean. */
  defaultValue?: string;
  /** Optional. Whether the parameter should be hidden in the UI. */
  hiddenUi?: boolean;
}

export const ParameterMetadata: Schema.Schema<ParameterMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  helpText: Schema.optional(Schema.String),
  isOptional: Schema.optional(Schema.Boolean),
  regexes: Schema.optional(Schema.Array(Schema.String)),
  paramType: Schema.optional(Schema.String),
  customMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  groupName: Schema.optional(Schema.String),
  parentName: Schema.optional(Schema.String),
  parentTriggerValues: Schema.optional(Schema.Array(Schema.String)),
  enumOptions: Schema.optional(Schema.Array(ParameterMetadataEnumOption)),
  defaultValue: Schema.optional(Schema.String),
  hiddenUi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ParameterMetadata" }) as any as Schema.Schema<ParameterMetadata>;

export interface TemplateMetadata {
  /** Required. The name of the template. */
  name?: string;
  /** Optional. A description of the template. */
  description?: string;
  /** The parameters for the template. */
  parameters?: Array<ParameterMetadata>;
  /** Optional. Indicates if the template is streaming or not. */
  streaming?: boolean;
  /** Optional. Indicates if the streaming template supports at least once mode. */
  supportsAtLeastOnce?: boolean;
  /** Optional. Indicates if the streaming template supports exactly once mode. */
  supportsExactlyOnce?: boolean;
  /** Optional. Indicates the default streaming mode for a streaming template. Only valid if both supports_at_least_once and supports_exactly_once are true. Possible values: UNSPECIFIED, EXACTLY_ONCE and AT_LEAST_ONCE */
  defaultStreamingMode?: string;
  /** Optional. For future use. */
  yamlDefinition?: string;
}

export const TemplateMetadata: Schema.Schema<TemplateMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(ParameterMetadata)),
  streaming: Schema.optional(Schema.Boolean),
  supportsAtLeastOnce: Schema.optional(Schema.Boolean),
  supportsExactlyOnce: Schema.optional(Schema.Boolean),
  defaultStreamingMode: Schema.optional(Schema.String),
  yamlDefinition: Schema.optional(Schema.String),
})).annotate({ identifier: "TemplateMetadata" }) as any as Schema.Schema<TemplateMetadata>;

export interface SDKInfo {
  /** Required. The SDK Language. */
  language?: "UNKNOWN" | "JAVA" | "PYTHON" | "GO" | "YAML" | (string & {});
  /** Optional. The SDK version. */
  version?: string;
}

export const SDKInfo: Schema.Schema<SDKInfo> = Schema.suspend(() => Schema.Struct({
  language: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "SDKInfo" }) as any as Schema.Schema<SDKInfo>;

export interface RuntimeMetadata {
  /** SDK Info for the template. */
  sdkInfo?: SDKInfo;
  /** The parameters for the template. */
  parameters?: Array<ParameterMetadata>;
}

export const RuntimeMetadata: Schema.Schema<RuntimeMetadata> = Schema.suspend(() => Schema.Struct({
  sdkInfo: Schema.optional(SDKInfo),
  parameters: Schema.optional(Schema.Array(ParameterMetadata)),
})).annotate({ identifier: "RuntimeMetadata" }) as any as Schema.Schema<RuntimeMetadata>;

export interface GetTemplateResponse {
  /** The status of the get template request. Any problems with the request will be indicated in the error_details. */
  status?: Status;
  /** The template metadata describing the template name, available parameters, etc. */
  metadata?: TemplateMetadata;
  /** Template Type. */
  templateType?: "UNKNOWN" | "LEGACY" | "FLEX" | (string & {});
  /** Describes the runtime metadata with SDKInfo and available parameters. */
  runtimeMetadata?: RuntimeMetadata;
}

export const GetTemplateResponse: Schema.Schema<GetTemplateResponse> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Status),
  metadata: Schema.optional(TemplateMetadata),
  templateType: Schema.optional(Schema.String),
  runtimeMetadata: Schema.optional(RuntimeMetadata),
})).annotate({ identifier: "GetTemplateResponse" }) as any as Schema.Schema<GetTemplateResponse>;

export interface FlexTemplateRuntimeEnvironment {
  /** The initial number of Google Compute Engine instances for the job. */
  numWorkers?: number;
  /** The maximum number of Google Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000. */
  maxWorkers?: number;
  /** The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence. */
  zone?: string;
  /** The email address of the service account to run the job as. */
  serviceAccountEmail?: string;
  /** The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  tempLocation?: string;
  /** The machine type to use for the job. Defaults to the value from the template if not specified. */
  machineType?: string;
  /** Additional experiment flags for the job. */
  additionalExperiments?: Array<string>;
  /** Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default". */
  network?: string;
  /** Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL. */
  subnetwork?: string;
  /** Additional user labels to be specified for the job. Keys and values must follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }. */
  additionalUserLabels?: Record<string, string>;
  /** Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/ */
  kmsKeyName?: string;
  /** Configuration for VM IPs. */
  ipConfiguration?: "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE" | (string & {});
  /** The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane's region. */
  workerRegion?: string;
  /** The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane's region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence. */
  workerZone?: string;
  /** Whether to enable Streaming Engine for the job. */
  enableStreamingEngine?: boolean;
  /** Set FlexRS goal for the job. https://cloud.google.com/dataflow/docs/guides/flexrs */
  flexrsGoal?: "FLEXRS_UNSPECIFIED" | "FLEXRS_SPEED_OPTIMIZED" | "FLEXRS_COST_OPTIMIZED" | (string & {});
  /** The Cloud Storage path for staging local files. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  stagingLocation?: string;
  /** Docker registry location of container image to use for the 'worker harness. Default is the container for the version of the SDK. Note this field is only valid for portable pipelines. */
  sdkContainerImage?: string;
  /** Worker disk size, in gigabytes. */
  diskSizeGb?: number;
  /** The algorithm to use for autoscaling */
  autoscalingAlgorithm?: "AUTOSCALING_ALGORITHM_UNKNOWN" | "AUTOSCALING_ALGORITHM_NONE" | "AUTOSCALING_ALGORITHM_BASIC" | (string & {});
  /** If true, when processing time is spent almost entirely on garbage collection (GC), saves a heap dump before ending the thread or process. If false, ends the thread or process without saving a heap dump. Does not save a heap dump when the Java Virtual Machine (JVM) has an out of memory error during processing. The location of the heap file is either echoed back to the user, or the user is given the opportunity to download the heap file. */
  dumpHeapOnOom?: boolean;
  /** Cloud Storage bucket (directory) to upload heap dumps to. Enabling this field implies that `dump_heap_on_oom` is set to true. */
  saveHeapDumpsToGcsPath?: string;
  /** The machine type to use for launching the job. The default is n1-standard-1. */
  launcherMachineType?: string;
  /** If true serial port logging will be enabled for the launcher VM. */
  enableLauncherVmSerialPortLogging?: boolean;
  /** Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes). */
  streamingMode?: "STREAMING_MODE_UNSPECIFIED" | "STREAMING_MODE_EXACTLY_ONCE" | "STREAMING_MODE_AT_LEAST_ONCE" | (string & {});
  /** Optional. Additional pipeline option flags for the job. */
  additionalPipelineOptions?: Array<string>;
}

export const FlexTemplateRuntimeEnvironment: Schema.Schema<FlexTemplateRuntimeEnvironment> = Schema.suspend(() => Schema.Struct({
  numWorkers: Schema.optional(Schema.Number),
  maxWorkers: Schema.optional(Schema.Number),
  zone: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  tempLocation: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  additionalExperiments: Schema.optional(Schema.Array(Schema.String)),
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  additionalUserLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kmsKeyName: Schema.optional(Schema.String),
  ipConfiguration: Schema.optional(Schema.String),
  workerRegion: Schema.optional(Schema.String),
  workerZone: Schema.optional(Schema.String),
  enableStreamingEngine: Schema.optional(Schema.Boolean),
  flexrsGoal: Schema.optional(Schema.String),
  stagingLocation: Schema.optional(Schema.String),
  sdkContainerImage: Schema.optional(Schema.String),
  diskSizeGb: Schema.optional(Schema.Number),
  autoscalingAlgorithm: Schema.optional(Schema.String),
  dumpHeapOnOom: Schema.optional(Schema.Boolean),
  saveHeapDumpsToGcsPath: Schema.optional(Schema.String),
  launcherMachineType: Schema.optional(Schema.String),
  enableLauncherVmSerialPortLogging: Schema.optional(Schema.Boolean),
  streamingMode: Schema.optional(Schema.String),
  additionalPipelineOptions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FlexTemplateRuntimeEnvironment" }) as any as Schema.Schema<FlexTemplateRuntimeEnvironment>;

export interface ContainerSpec {
  /** Name of the docker container image. E.g., gcr.io/project/some-image */
  image?: string;
  /** Metadata describing a template including description and validation rules. */
  metadata?: TemplateMetadata;
  /** Required. SDK info of the Flex Template. */
  sdkInfo?: SDKInfo;
  /** Default runtime environment for the job. */
  defaultEnvironment?: FlexTemplateRuntimeEnvironment;
  /** Secret Manager secret id for username to authenticate to private registry. */
  imageRepositoryUsernameSecretId?: string;
  /** Secret Manager secret id for password to authenticate to private registry. */
  imageRepositoryPasswordSecretId?: string;
  /** Cloud Storage path to self-signed certificate of private registry. */
  imageRepositoryCertPath?: string;
}

export const ContainerSpec: Schema.Schema<ContainerSpec> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Schema.String),
  metadata: Schema.optional(TemplateMetadata),
  sdkInfo: Schema.optional(SDKInfo),
  defaultEnvironment: Schema.optional(FlexTemplateRuntimeEnvironment),
  imageRepositoryUsernameSecretId: Schema.optional(Schema.String),
  imageRepositoryPasswordSecretId: Schema.optional(Schema.String),
  imageRepositoryCertPath: Schema.optional(Schema.String),
})).annotate({ identifier: "ContainerSpec" }) as any as Schema.Schema<ContainerSpec>;

export interface LaunchFlexTemplateParameter {
  /** Required. The job name to use for the created job. For update job request, job name should be same as the existing running job. */
  jobName?: string;
  /** Spec about the container image to launch. */
  containerSpec?: ContainerSpec;
  /** Cloud Storage path to a file with json serialized ContainerSpec as content. */
  containerSpecGcsPath?: string;
  /** The parameters for FlexTemplate. Ex. {"num_workers":"5"} */
  parameters?: Record<string, string>;
  /** Launch options for this flex template job. This is a common set of options across languages and templates. This should not be used to pass job parameters. */
  launchOptions?: Record<string, string>;
  /** The runtime environment for the FlexTemplate job */
  environment?: FlexTemplateRuntimeEnvironment;
  /** Set this to true if you are sending a request to update a running streaming job. When set, the job name should be the same as the running job. */
  update?: boolean;
  /** Use this to pass transform_name_mappings for streaming update jobs. Ex:{"oldTransformName":"newTransformName",...}' */
  transformNameMappings?: Record<string, string>;
}

export const LaunchFlexTemplateParameter: Schema.Schema<LaunchFlexTemplateParameter> = Schema.suspend(() => Schema.Struct({
  jobName: Schema.optional(Schema.String),
  containerSpec: Schema.optional(ContainerSpec),
  containerSpecGcsPath: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  launchOptions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  environment: Schema.optional(FlexTemplateRuntimeEnvironment),
  update: Schema.optional(Schema.Boolean),
  transformNameMappings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "LaunchFlexTemplateParameter" }) as any as Schema.Schema<LaunchFlexTemplateParameter>;

export interface LaunchFlexTemplateRequest {
  /** Required. Parameter to launch a job form Flex Template. */
  launchParameter?: LaunchFlexTemplateParameter;
  /** If true, the request is validated but not actually executed. Defaults to false. */
  validateOnly?: boolean;
}

export const LaunchFlexTemplateRequest: Schema.Schema<LaunchFlexTemplateRequest> = Schema.suspend(() => Schema.Struct({
  launchParameter: Schema.optional(LaunchFlexTemplateParameter),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LaunchFlexTemplateRequest" }) as any as Schema.Schema<LaunchFlexTemplateRequest>;

export interface LaunchFlexTemplateResponse {
  /** The job that was launched, if the request was not a dry run and the job was successfully launched. */
  job?: Job;
}

export const LaunchFlexTemplateResponse: Schema.Schema<LaunchFlexTemplateResponse> = Schema.suspend(() => Schema.Struct({
  job: Schema.optional(Job),
})).annotate({ identifier: "LaunchFlexTemplateResponse" }) as any as Schema.Schema<LaunchFlexTemplateResponse>;

export interface JobMessage {
  /** Deprecated. */
  id?: string;
  /** The timestamp of the message. */
  time?: string;
  /** The text of the message. */
  messageText?: string;
  /** Importance level of the message. */
  messageImportance?: "JOB_MESSAGE_IMPORTANCE_UNKNOWN" | "JOB_MESSAGE_DEBUG" | "JOB_MESSAGE_DETAILED" | "JOB_MESSAGE_BASIC" | "JOB_MESSAGE_WARNING" | "JOB_MESSAGE_ERROR" | (string & {});
}

export const JobMessage: Schema.Schema<JobMessage> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  time: Schema.optional(Schema.String),
  messageText: Schema.optional(Schema.String),
  messageImportance: Schema.optional(Schema.String),
})).annotate({ identifier: "JobMessage" }) as any as Schema.Schema<JobMessage>;

export interface Parameter {
  /** Key or name for this parameter. */
  key?: string;
  /** Value for this parameter. */
  value?: unknown;
}

export const Parameter: Schema.Schema<Parameter> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "Parameter" }) as any as Schema.Schema<Parameter>;

export interface StructuredMessage {
  /** Human-readable version of message. */
  messageText?: string;
  /** Identifier for this message type. Used by external systems to internationalize or personalize message. */
  messageKey?: string;
  /** The structured data associated with this message. */
  parameters?: Array<Parameter>;
}

export const StructuredMessage: Schema.Schema<StructuredMessage> = Schema.suspend(() => Schema.Struct({
  messageText: Schema.optional(Schema.String),
  messageKey: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(Parameter)),
})).annotate({ identifier: "StructuredMessage" }) as any as Schema.Schema<StructuredMessage>;

export interface AutoscalingEvent {
  /** The current number of workers the job has. */
  currentNumWorkers?: string;
  /** The target number of workers the worker pool wants to resize to use. */
  targetNumWorkers?: string;
  /** The type of autoscaling event to report. */
  eventType?: "TYPE_UNKNOWN" | "TARGET_NUM_WORKERS_CHANGED" | "CURRENT_NUM_WORKERS_CHANGED" | "ACTUATION_FAILURE" | "NO_CHANGE" | (string & {});
  /** A message describing why the system decided to adjust the current number of workers, why it failed, or why the system decided to not make any changes to the number of workers. */
  description?: StructuredMessage;
  /** The time this event was emitted to indicate a new target or current num_workers value. */
  time?: string;
  /** A short and friendly name for the worker pool this event refers to. */
  workerPool?: string;
}

export const AutoscalingEvent: Schema.Schema<AutoscalingEvent> = Schema.suspend(() => Schema.Struct({
  currentNumWorkers: Schema.optional(Schema.String),
  targetNumWorkers: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  description: Schema.optional(StructuredMessage),
  time: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoscalingEvent" }) as any as Schema.Schema<AutoscalingEvent>;

export interface ListJobMessagesResponse {
  /** Messages in ascending timestamp order. */
  jobMessages?: Array<JobMessage>;
  /** The token to obtain the next page of results if there are more. */
  nextPageToken?: string;
  /** Autoscaling events in ascending timestamp order. */
  autoscalingEvents?: Array<AutoscalingEvent>;
}

export const ListJobMessagesResponse: Schema.Schema<ListJobMessagesResponse> = Schema.suspend(() => Schema.Struct({
  jobMessages: Schema.optional(Schema.Array(JobMessage)),
  nextPageToken: Schema.optional(Schema.String),
  autoscalingEvents: Schema.optional(Schema.Array(AutoscalingEvent)),
})).annotate({ identifier: "ListJobMessagesResponse" }) as any as Schema.Schema<ListJobMessagesResponse>;

export interface MetricStructuredName {
  /** Origin (namespace) of metric name. May be blank for user-define metrics; will be "dataflow" for metrics defined by the Dataflow service or SDK. */
  origin?: string;
  /** Worker-defined metric name. */
  name?: string;
  /** Zero or more labeled fields which identify the part of the job this metric is associated with, such as the name of a step or collection. For example, built-in counters associated with steps will have context['step'] = . Counters associated with PCollections in the SDK will have context['pcollection'] = . */
  context?: Record<string, string>;
}

export const MetricStructuredName: Schema.Schema<MetricStructuredName> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  context: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MetricStructuredName" }) as any as Schema.Schema<MetricStructuredName>;

export interface MetricUpdate {
  /** Name of the metric. */
  name?: MetricStructuredName;
  /** Metric aggregation kind. The possible metric aggregation kinds are "Sum", "Max", "Min", "Mean", "Set", "And", "Or", and "Distribution". The specified aggregation kind is case-insensitive. If omitted, this is not an aggregated value but instead a single metric sample value. */
  kind?: string;
  /** True if this metric is reported as the total cumulative aggregate value accumulated since the worker started working on this WorkItem. By default this is false, indicating that this metric is reported as a delta that is not associated with any WorkItem. */
  cumulative?: boolean;
  /** Worker-computed aggregate value for aggregation kinds "Sum", "Max", "Min", "And", and "Or". The possible value types are Long, Double, and Boolean. */
  scalar?: unknown;
  /** Worker-computed aggregate value for the "Mean" aggregation kind. This holds the sum of the aggregated values and is used in combination with mean_count below to obtain the actual mean aggregate value. The only possible value types are Long and Double. */
  meanSum?: unknown;
  /** Worker-computed aggregate value for the "Mean" aggregation kind. This holds the count of the aggregated values and is used in combination with mean_sum above to obtain the actual mean aggregate value. The only possible value type is Long. */
  meanCount?: unknown;
  /** Worker-computed aggregate value for the "Set" aggregation kind. The only possible value type is a list of Values whose type can be Long, Double, String, or BoundedTrie according to the metric's type. All Values in the list must be of the same type. */
  set?: unknown;
  /** Worker-computed aggregate value for the "Trie" aggregation kind. The only possible value type is a BoundedTrieNode. */
  trie?: unknown;
  /** Worker-computed aggregate value for the "Trie" aggregation kind. The only possible value type is a BoundedTrieNode. Introduced this field to avoid breaking older SDKs when Dataflow service starts to populate the `bounded_trie` field. */
  boundedTrie?: unknown;
  /** A struct value describing properties of a distribution of numeric values. */
  distribution?: unknown;
  /** A struct value describing properties of a Gauge. Metrics of gauge type show the value of a metric across time, and is aggregated based on the newest value. */
  gauge?: unknown;
  /** Worker-computed aggregate value for internal use by the Dataflow service. */
  internal?: unknown;
  /** Timestamp associated with the metric value. Optional when workers are reporting work progress; it will be filled in responses from the metrics API. */
  updateTime?: string;
}

export const MetricUpdate: Schema.Schema<MetricUpdate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(MetricStructuredName),
  kind: Schema.optional(Schema.String),
  cumulative: Schema.optional(Schema.Boolean),
  scalar: Schema.optional(Schema.Unknown),
  meanSum: Schema.optional(Schema.Unknown),
  meanCount: Schema.optional(Schema.Unknown),
  set: Schema.optional(Schema.Unknown),
  trie: Schema.optional(Schema.Unknown),
  boundedTrie: Schema.optional(Schema.Unknown),
  distribution: Schema.optional(Schema.Unknown),
  gauge: Schema.optional(Schema.Unknown),
  internal: Schema.optional(Schema.Unknown),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricUpdate" }) as any as Schema.Schema<MetricUpdate>;

export interface JobMetrics {
  /** Timestamp as of which metric values are current. */
  metricTime?: string;
  /** All metrics for this job. */
  metrics?: Array<MetricUpdate>;
}

export const JobMetrics: Schema.Schema<JobMetrics> = Schema.suspend(() => Schema.Struct({
  metricTime: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(MetricUpdate)),
})).annotate({ identifier: "JobMetrics" }) as any as Schema.Schema<JobMetrics>;

export interface Point {
  /** The timestamp of the point. */
  time?: string;
  /** The value of the point. */
  value?: number;
}

export const Point: Schema.Schema<Point> = Schema.suspend(() => Schema.Struct({
  time: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "Point" }) as any as Schema.Schema<Point>;

export interface ProgressTimeseries {
  /** The current progress of the component, in the range [0,1]. */
  currentProgress?: number;
  /** History of progress for the component. Points are sorted by time. */
  dataPoints?: Array<Point>;
}

export const ProgressTimeseries: Schema.Schema<ProgressTimeseries> = Schema.suspend(() => Schema.Struct({
  currentProgress: Schema.optional(Schema.Number),
  dataPoints: Schema.optional(Schema.Array(Point)),
})).annotate({ identifier: "ProgressTimeseries" }) as any as Schema.Schema<ProgressTimeseries>;

export interface HotKeyInfo {
  /** The age of the hot key measured from when it was first detected. */
  hotKeyAge?: string;
  /** A detected hot key that is causing limited parallelism. This field will be populated only if the following flag is set to true: "--enable_hot_key_logging". */
  key?: string;
  /** If true, then the above key is truncated and cannot be deserialized. This occurs if the key above is populated and the key size is >5MB. */
  keyTruncated?: boolean;
}

export const HotKeyInfo: Schema.Schema<HotKeyInfo> = Schema.suspend(() => Schema.Struct({
  hotKeyAge: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  keyTruncated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HotKeyInfo" }) as any as Schema.Schema<HotKeyInfo>;

export interface HotKeyDebuggingInfo {
  /** Debugging information for each detected hot key. Keyed by a hash of the key. */
  detectedHotKeys?: Record<string, HotKeyInfo>;
}

export const HotKeyDebuggingInfo: Schema.Schema<HotKeyDebuggingInfo> = Schema.suspend(() => Schema.Struct({
  detectedHotKeys: Schema.optional(Schema.Record(Schema.String, HotKeyInfo)),
})).annotate({ identifier: "HotKeyDebuggingInfo" }) as any as Schema.Schema<HotKeyDebuggingInfo>;

export interface StragglerDebuggingInfo {
  /** Hot key debugging details. */
  hotKey?: HotKeyDebuggingInfo;
}

export const StragglerDebuggingInfo: Schema.Schema<StragglerDebuggingInfo> = Schema.suspend(() => Schema.Struct({
  hotKey: Schema.optional(HotKeyDebuggingInfo),
})).annotate({ identifier: "StragglerDebuggingInfo" }) as any as Schema.Schema<StragglerDebuggingInfo>;

export interface StragglerInfo {
  /** The time when the work item attempt became a straggler. */
  startTime?: string;
  /** The straggler causes, keyed by the string representation of the StragglerCause enum and contains specialized debugging information for each straggler cause. */
  causes?: Record<string, StragglerDebuggingInfo>;
}

export const StragglerInfo: Schema.Schema<StragglerInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  causes: Schema.optional(Schema.Record(Schema.String, StragglerDebuggingInfo)),
})).annotate({ identifier: "StragglerInfo" }) as any as Schema.Schema<StragglerInfo>;

export interface StreamingStragglerInfo {
  /** Start time of this straggler. */
  startTime?: string;
  /** End time of this straggler. */
  endTime?: string;
  /** Name of the worker where the straggler was detected. */
  workerName?: string;
  /** The event-time watermark lag at the time of the straggler detection. */
  dataWatermarkLag?: string;
  /** The system watermark lag at the time of the straggler detection. */
  systemWatermarkLag?: string;
}

export const StreamingStragglerInfo: Schema.Schema<StreamingStragglerInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  workerName: Schema.optional(Schema.String),
  dataWatermarkLag: Schema.optional(Schema.String),
  systemWatermarkLag: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamingStragglerInfo" }) as any as Schema.Schema<StreamingStragglerInfo>;

export interface Straggler {
  /** Batch straggler identification and debugging information. */
  batchStraggler?: StragglerInfo;
  /** Streaming straggler identification and debugging information. */
  streamingStraggler?: StreamingStragglerInfo;
}

export const Straggler: Schema.Schema<Straggler> = Schema.suspend(() => Schema.Struct({
  batchStraggler: Schema.optional(StragglerInfo),
  streamingStraggler: Schema.optional(StreamingStragglerInfo),
})).annotate({ identifier: "Straggler" }) as any as Schema.Schema<Straggler>;

export interface StragglerSummary {
  /** The total count of stragglers. */
  totalStragglerCount?: string;
  /** Aggregated counts of straggler causes, keyed by the string representation of the StragglerCause enum. */
  stragglerCauseCount?: Record<string, string>;
  /** The most recent stragglers. */
  recentStragglers?: Array<Straggler>;
}

export const StragglerSummary: Schema.Schema<StragglerSummary> = Schema.suspend(() => Schema.Struct({
  totalStragglerCount: Schema.optional(Schema.String),
  stragglerCauseCount: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  recentStragglers: Schema.optional(Schema.Array(Straggler)),
})).annotate({ identifier: "StragglerSummary" }) as any as Schema.Schema<StragglerSummary>;

export interface StageSummary {
  /** ID of this stage */
  stageId?: string;
  /** State of this stage. */
  state?: "EXECUTION_STATE_UNKNOWN" | "EXECUTION_STATE_NOT_STARTED" | "EXECUTION_STATE_RUNNING" | "EXECUTION_STATE_SUCCEEDED" | "EXECUTION_STATE_FAILED" | "EXECUTION_STATE_CANCELLED" | (string & {});
  /** Start time of this stage. */
  startTime?: string;
  /** End time of this stage. If the work item is completed, this is the actual end time of the stage. Otherwise, it is the predicted end time. */
  endTime?: string;
  /** Progress for this stage. Only applicable to Batch jobs. */
  progress?: ProgressTimeseries;
  /** Metrics for this stage. */
  metrics?: Array<MetricUpdate>;
  /** Straggler summary for this stage. */
  stragglerSummary?: StragglerSummary;
}

export const StageSummary: Schema.Schema<StageSummary> = Schema.suspend(() => Schema.Struct({
  stageId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  progress: Schema.optional(ProgressTimeseries),
  metrics: Schema.optional(Schema.Array(MetricUpdate)),
  stragglerSummary: Schema.optional(StragglerSummary),
})).annotate({ identifier: "StageSummary" }) as any as Schema.Schema<StageSummary>;

export interface JobExecutionDetails {
  /** The stages of the job execution. */
  stages?: Array<StageSummary>;
  /** If present, this response does not contain all requested tasks. To obtain the next page of results, repeat the request with page_token set to this value. */
  nextPageToken?: string;
}

export const JobExecutionDetails: Schema.Schema<JobExecutionDetails> = Schema.suspend(() => Schema.Struct({
  stages: Schema.optional(Schema.Array(StageSummary)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "JobExecutionDetails" }) as any as Schema.Schema<JobExecutionDetails>;

export interface WorkItemDetails {
  /** Name of this work item. */
  taskId?: string;
  /** Attempt ID of this work item */
  attemptId?: string;
  /** Start time of this work item attempt. */
  startTime?: string;
  /** End time of this work item attempt. If the work item is completed, this is the actual end time of the work item. Otherwise, it is the predicted end time. */
  endTime?: string;
  /** State of this work item. */
  state?: "EXECUTION_STATE_UNKNOWN" | "EXECUTION_STATE_NOT_STARTED" | "EXECUTION_STATE_RUNNING" | "EXECUTION_STATE_SUCCEEDED" | "EXECUTION_STATE_FAILED" | "EXECUTION_STATE_CANCELLED" | (string & {});
  /** Progress of this work item. */
  progress?: ProgressTimeseries;
  /** Metrics for this work item. */
  metrics?: Array<MetricUpdate>;
  /** Information about straggler detections for this work item. */
  stragglerInfo?: StragglerInfo;
}

export const WorkItemDetails: Schema.Schema<WorkItemDetails> = Schema.suspend(() => Schema.Struct({
  taskId: Schema.optional(Schema.String),
  attemptId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  progress: Schema.optional(ProgressTimeseries),
  metrics: Schema.optional(Schema.Array(MetricUpdate)),
  stragglerInfo: Schema.optional(StragglerInfo),
})).annotate({ identifier: "WorkItemDetails" }) as any as Schema.Schema<WorkItemDetails>;

export interface WorkerDetails {
  /** Name of this worker */
  workerName?: string;
  /** Work items processed by this worker, sorted by time. */
  workItems?: Array<WorkItemDetails>;
}

export const WorkerDetails: Schema.Schema<WorkerDetails> = Schema.suspend(() => Schema.Struct({
  workerName: Schema.optional(Schema.String),
  workItems: Schema.optional(Schema.Array(WorkItemDetails)),
})).annotate({ identifier: "WorkerDetails" }) as any as Schema.Schema<WorkerDetails>;

export interface StageExecutionDetails {
  /** Workers that have done work on the stage. */
  workers?: Array<WorkerDetails>;
  /** If present, this response does not contain all requested tasks. To obtain the next page of results, repeat the request with page_token set to this value. */
  nextPageToken?: string;
}

export const StageExecutionDetails: Schema.Schema<StageExecutionDetails> = Schema.suspend(() => Schema.Struct({
  workers: Schema.optional(Schema.Array(WorkerDetails)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "StageExecutionDetails" }) as any as Schema.Schema<StageExecutionDetails>;

export interface NameAndKind {
  /** Name of the counter. */
  name?: string;
  /** Counter aggregation kind. */
  kind?: "INVALID" | "SUM" | "MAX" | "MIN" | "MEAN" | "OR" | "AND" | "SET" | "DISTRIBUTION" | "LATEST_VALUE" | (string & {});
}

export const NameAndKind: Schema.Schema<NameAndKind> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "NameAndKind" }) as any as Schema.Schema<NameAndKind>;

export interface CounterStructuredName {
  /** Counter name. Not necessarily globally-unique, but unique within the context of the other fields. Required. */
  name?: string;
  /** One of the standard Origins defined above. */
  origin?: "SYSTEM" | "USER" | (string & {});
  /** A string containing a more specific namespace of the counter's origin. */
  originNamespace?: string;
  /** System generated name of the original step in the user's graph, before optimization. */
  originalStepName?: string;
  /** Name of the optimized step being executed by the workers. */
  componentStepName?: string;
  /** Name of the stage. An execution step contains multiple component steps. */
  executionStepName?: string;
  /** ID of a particular worker. */
  workerId?: string;
  /** Portion of this counter, either key or value. */
  portion?: "ALL" | "KEY" | "VALUE" | (string & {});
  /** Index of an input collection that's being read from/written to as a side input. The index identifies a step's side inputs starting by 1 (e.g. the first side input has input_index 1, the third has input_index 3). Side inputs are identified by a pair of (original_step_name, input_index). This field helps uniquely identify them. */
  inputIndex?: number;
  /** The step name requesting an operation, such as GBK. I.e. the ParDo causing a read/write from shuffle to occur, or a read from side inputs. */
  originalRequestingStepName?: string;
}

export const CounterStructuredName: Schema.Schema<CounterStructuredName> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  origin: Schema.optional(Schema.String),
  originNamespace: Schema.optional(Schema.String),
  originalStepName: Schema.optional(Schema.String),
  componentStepName: Schema.optional(Schema.String),
  executionStepName: Schema.optional(Schema.String),
  workerId: Schema.optional(Schema.String),
  portion: Schema.optional(Schema.String),
  inputIndex: Schema.optional(Schema.Number),
  originalRequestingStepName: Schema.optional(Schema.String),
})).annotate({ identifier: "CounterStructuredName" }) as any as Schema.Schema<CounterStructuredName>;

export interface CounterMetadata {
  /** Counter aggregation kind. */
  kind?: "INVALID" | "SUM" | "MAX" | "MIN" | "MEAN" | "OR" | "AND" | "SET" | "DISTRIBUTION" | "LATEST_VALUE" | (string & {});
  /** Human-readable description of the counter semantics. */
  description?: string;
  /** System defined Units, see above enum. */
  standardUnits?: "BYTES" | "BYTES_PER_SEC" | "MILLISECONDS" | "MICROSECONDS" | "NANOSECONDS" | "TIMESTAMP_MSEC" | "TIMESTAMP_USEC" | "TIMESTAMP_NSEC" | (string & {});
  /** A string referring to the unit type. */
  otherUnits?: string;
}

export const CounterMetadata: Schema.Schema<CounterMetadata> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  standardUnits: Schema.optional(Schema.String),
  otherUnits: Schema.optional(Schema.String),
})).annotate({ identifier: "CounterMetadata" }) as any as Schema.Schema<CounterMetadata>;

export interface CounterStructuredNameAndMetadata {
  /** Structured name of the counter. */
  name?: CounterStructuredName;
  /** Metadata associated with a counter */
  metadata?: CounterMetadata;
}

export const CounterStructuredNameAndMetadata: Schema.Schema<CounterStructuredNameAndMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(CounterStructuredName),
  metadata: Schema.optional(CounterMetadata),
})).annotate({ identifier: "CounterStructuredNameAndMetadata" }) as any as Schema.Schema<CounterStructuredNameAndMetadata>;

export interface SplitInt64 {
  /** The low order bits: n & 0xffffffff. */
  lowBits?: number;
  /** The high order bits, including the sign: n >> 32. */
  highBits?: number;
}

export const SplitInt64: Schema.Schema<SplitInt64> = Schema.suspend(() => Schema.Struct({
  lowBits: Schema.optional(Schema.Number),
  highBits: Schema.optional(Schema.Number),
})).annotate({ identifier: "SplitInt64" }) as any as Schema.Schema<SplitInt64>;

export interface IntegerMean {
  /** The sum of all values being aggregated. */
  sum?: SplitInt64;
  /** The number of values being aggregated. */
  count?: SplitInt64;
}

export const IntegerMean: Schema.Schema<IntegerMean> = Schema.suspend(() => Schema.Struct({
  sum: Schema.optional(SplitInt64),
  count: Schema.optional(SplitInt64),
})).annotate({ identifier: "IntegerMean" }) as any as Schema.Schema<IntegerMean>;

export interface FloatingPointMean {
  /** The sum of all values being aggregated. */
  sum?: number;
  /** The number of values being aggregated. */
  count?: SplitInt64;
}

export const FloatingPointMean: Schema.Schema<FloatingPointMean> = Schema.suspend(() => Schema.Struct({
  sum: Schema.optional(Schema.Number),
  count: Schema.optional(SplitInt64),
})).annotate({ identifier: "FloatingPointMean" }) as any as Schema.Schema<FloatingPointMean>;

export interface IntegerList {
  /** Elements of the list. */
  elements?: Array<SplitInt64>;
}

export const IntegerList: Schema.Schema<IntegerList> = Schema.suspend(() => Schema.Struct({
  elements: Schema.optional(Schema.Array(SplitInt64)),
})).annotate({ identifier: "IntegerList" }) as any as Schema.Schema<IntegerList>;

export interface FloatingPointList {
  /** Elements of the list. */
  elements?: Array<number>;
}

export const FloatingPointList: Schema.Schema<FloatingPointList> = Schema.suspend(() => Schema.Struct({
  elements: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "FloatingPointList" }) as any as Schema.Schema<FloatingPointList>;

export interface StringList {
  /** Elements of the list. */
  elements?: Array<string>;
}

export const StringList: Schema.Schema<StringList> = Schema.suspend(() => Schema.Struct({
  elements: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StringList" }) as any as Schema.Schema<StringList>;

export interface Histogram {
  /** Counts of values in each bucket. For efficiency, prefix and trailing buckets with count = 0 are elided. Buckets can store the full range of values of an unsigned long, with ULLONG_MAX falling into the 59th bucket with range [1e19, 2e19). */
  bucketCounts?: Array<string>;
  /** Starting index of first stored bucket. The non-inclusive upper-bound of the ith bucket is given by: pow(10,(i-first_bucket_offset)/3) * (1,2,5)[(i-first_bucket_offset)%3] */
  firstBucketOffset?: number;
}

export const Histogram: Schema.Schema<Histogram> = Schema.suspend(() => Schema.Struct({
  bucketCounts: Schema.optional(Schema.Array(Schema.String)),
  firstBucketOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "Histogram" }) as any as Schema.Schema<Histogram>;

export interface DistributionUpdate {
  /** The minimum value present in the distribution. */
  min?: SplitInt64;
  /** The maximum value present in the distribution. */
  max?: SplitInt64;
  /** The count of the number of elements present in the distribution. */
  count?: SplitInt64;
  /** Use an int64 since we'd prefer the added precision. If overflow is a common problem we can detect it and use an additional int64 or a double. */
  sum?: SplitInt64;
  /** Use a double since the sum of squares is likely to overflow int64. */
  sumOfSquares?: number;
  /** (Optional) Histogram of value counts for the distribution. */
  histogram?: Histogram;
}

export const DistributionUpdate: Schema.Schema<DistributionUpdate> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(SplitInt64),
  max: Schema.optional(SplitInt64),
  count: Schema.optional(SplitInt64),
  sum: Schema.optional(SplitInt64),
  sumOfSquares: Schema.optional(Schema.Number),
  histogram: Schema.optional(Histogram),
})).annotate({ identifier: "DistributionUpdate" }) as any as Schema.Schema<DistributionUpdate>;

export interface IntegerGauge {
  /** The value of the variable represented by this gauge. */
  value?: SplitInt64;
  /** The time at which this value was measured. Measured as msecs from epoch. */
  timestamp?: string;
}

export const IntegerGauge: Schema.Schema<IntegerGauge> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(SplitInt64),
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "IntegerGauge" }) as any as Schema.Schema<IntegerGauge>;

export interface BoundedTrieNode {
  /** Whether this node has been truncated. A truncated leaf represents possibly many children with the same prefix. */
  truncated?: boolean;
  /** Children of this node. Must be empty if truncated is true. */
  children?: Record<string, BoundedTrieNode>;
}

export const BoundedTrieNode: Schema.Schema<BoundedTrieNode> = Schema.suspend(() => Schema.Struct({
  truncated: Schema.optional(Schema.Boolean),
  children: Schema.optional(Schema.Record(Schema.String, BoundedTrieNode)),
})).annotate({ identifier: "BoundedTrieNode" }) as any as Schema.Schema<BoundedTrieNode>;

export interface BoundedTrie {
  /** The maximum number of elements to store before truncation. */
  bound?: number;
  /** A compact representation of all the elements in this trie. */
  root?: BoundedTrieNode;
  /** A more efficient representation for metrics consisting of a single value. */
  singleton?: Array<string>;
}

export const BoundedTrie: Schema.Schema<BoundedTrie> = Schema.suspend(() => Schema.Struct({
  bound: Schema.optional(Schema.Number),
  root: Schema.optional(BoundedTrieNode),
  singleton: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BoundedTrie" }) as any as Schema.Schema<BoundedTrie>;

export interface CounterUpdate {
  /** Counter name and aggregation type. */
  nameAndKind?: NameAndKind;
  /** The service-generated short identifier for this counter. The short_id -> (name, metadata) mapping is constant for the lifetime of a job. */
  shortId?: string;
  /** Counter structured name and metadata. */
  structuredNameAndMetadata?: CounterStructuredNameAndMetadata;
  /** True if this counter is reported as the total cumulative aggregate value accumulated since the worker started working on this WorkItem. By default this is false, indicating that this counter is reported as a delta. */
  cumulative?: boolean;
  /** Integer value for Sum, Max, Min. */
  integer?: SplitInt64;
  /** Floating point value for Sum, Max, Min. */
  floatingPoint?: number;
  /** Boolean value for And, Or. */
  boolean?: boolean;
  /** Integer mean aggregation value for Mean. */
  integerMean?: IntegerMean;
  /** Floating point mean aggregation value for Mean. */
  floatingPointMean?: FloatingPointMean;
  /** List of integers, for Set. */
  integerList?: IntegerList;
  /** List of floating point numbers, for Set. */
  floatingPointList?: FloatingPointList;
  /** List of strings, for Set. */
  stringList?: StringList;
  /** Distribution data */
  distribution?: DistributionUpdate;
  /** Value for internally-defined counters used by the Dataflow service. */
  internal?: unknown;
  /** Gauge data */
  integerGauge?: IntegerGauge;
  /** Bounded trie data */
  boundedTrie?: BoundedTrie;
}

export const CounterUpdate: Schema.Schema<CounterUpdate> = Schema.suspend(() => Schema.Struct({
  nameAndKind: Schema.optional(NameAndKind),
  shortId: Schema.optional(Schema.String),
  structuredNameAndMetadata: Schema.optional(CounterStructuredNameAndMetadata),
  cumulative: Schema.optional(Schema.Boolean),
  integer: Schema.optional(SplitInt64),
  floatingPoint: Schema.optional(Schema.Number),
  boolean: Schema.optional(Schema.Boolean),
  integerMean: Schema.optional(IntegerMean),
  floatingPointMean: Schema.optional(FloatingPointMean),
  integerList: Schema.optional(IntegerList),
  floatingPointList: Schema.optional(FloatingPointList),
  stringList: Schema.optional(StringList),
  distribution: Schema.optional(DistributionUpdate),
  internal: Schema.optional(Schema.Unknown),
  integerGauge: Schema.optional(IntegerGauge),
  boundedTrie: Schema.optional(BoundedTrie),
})).annotate({ identifier: "CounterUpdate" }) as any as Schema.Schema<CounterUpdate>;

export interface ConcatPosition {
  /** Index of the inner source. */
  index?: number;
  /** Position within the inner source. */
  position?: Position;
}

export const ConcatPosition: Schema.Schema<ConcatPosition> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  position: Schema.optional(Position),
})).annotate({ identifier: "ConcatPosition" }) as any as Schema.Schema<ConcatPosition>;

export interface Position {
  /** Position is past all other positions. Also useful for the end position of an unbounded range. */
  end?: boolean;
  /** Position is a string key, ordered lexicographically. */
  key?: string;
  /** Position is a byte offset. */
  byteOffset?: string;
  /** Position is a record index. */
  recordIndex?: string;
  /** CloudPosition is a base64 encoded BatchShufflePosition (with FIXED sharding). */
  shufflePosition?: string;
  /** CloudPosition is a concat position. */
  concatPosition?: ConcatPosition;
}

export const Position: Schema.Schema<Position> = Schema.suspend(() => Schema.Struct({
  end: Schema.optional(Schema.Boolean),
  key: Schema.optional(Schema.String),
  byteOffset: Schema.optional(Schema.String),
  recordIndex: Schema.optional(Schema.String),
  shufflePosition: Schema.optional(Schema.String),
  concatPosition: Schema.optional(ConcatPosition),
})).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface ReportedParallelism {
  /** Specifies whether the parallelism is infinite. If true, "value" is ignored. Infinite parallelism means the service will assume that the work item can always be split into more non-empty work items by dynamic splitting. This is a work-around for lack of support for infinity by the current JSON-based Java RPC stack. */
  isInfinite?: boolean;
  /** Specifies the level of parallelism in case it is finite. */
  value?: number;
}

export const ReportedParallelism: Schema.Schema<ReportedParallelism> = Schema.suspend(() => Schema.Struct({
  isInfinite: Schema.optional(Schema.Boolean),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "ReportedParallelism" }) as any as Schema.Schema<ReportedParallelism>;

export interface ApproximateReportedProgress {
  /** A Position within the work to represent a progress. */
  position?: Position;
  /** Completion as fraction of the input consumed, from 0.0 (beginning, nothing consumed), to 1.0 (end of the input, entire input consumed). */
  fractionConsumed?: number;
  /** Total amount of parallelism in the input of this task that remains, (i.e. can be delegated to this task and any new tasks via dynamic splitting). Always at least 1 for non-finished work items and 0 for finished. "Amount of parallelism" refers to how many non-empty parts of the input can be read in parallel. This does not necessarily equal number of records. An input that can be read in parallel down to the individual records is called "perfectly splittable". An example of non-perfectly parallelizable input is a block-compressed file format where a block of records has to be read as a whole, but different blocks can be read in parallel. Examples: * If we are processing record #30 (starting at 1) out of 50 in a perfectly splittable 50-record input, this value should be 21 (20 remaining + 1 current). * If we are reading through block 3 in a block-compressed file consisting of 5 blocks, this value should be 3 (since blocks 4 and 5 can be processed in parallel by new tasks via dynamic splitting and the current task remains processing block 3). * If we are reading through the last block in a block-compressed file, or reading or processing the last record in a perfectly splittable input, this value should be 1, because apart from the current task, no additional remainder can be split off. */
  remainingParallelism?: ReportedParallelism;
  /** Total amount of parallelism in the portion of input of this task that has already been consumed and is no longer active. In the first two examples above (see remaining_parallelism), the value should be 29 or 2 respectively. The sum of remaining_parallelism and consumed_parallelism should equal the total amount of parallelism in this work item. If specified, must be finite. */
  consumedParallelism?: ReportedParallelism;
}

export const ApproximateReportedProgress: Schema.Schema<ApproximateReportedProgress> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(Position),
  fractionConsumed: Schema.optional(Schema.Number),
  remainingParallelism: Schema.optional(ReportedParallelism),
  consumedParallelism: Schema.optional(ReportedParallelism),
})).annotate({ identifier: "ApproximateReportedProgress" }) as any as Schema.Schema<ApproximateReportedProgress>;

export interface SourceMetadata {
  /** Whether this source is known to produce key/value pairs with the (encoded) keys in lexicographically sorted order. */
  producesSortedKeys?: boolean;
  /** Specifies that the size of this source is known to be infinite (this is a streaming source). */
  infinite?: boolean;
  /** An estimate of the total size (in bytes) of the data that would be read from this source. This estimate is in terms of external storage size, before any decompression or other processing done by the reader. */
  estimatedSizeBytes?: string;
}

export const SourceMetadata: Schema.Schema<SourceMetadata> = Schema.suspend(() => Schema.Struct({
  producesSortedKeys: Schema.optional(Schema.Boolean),
  infinite: Schema.optional(Schema.Boolean),
  estimatedSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceMetadata" }) as any as Schema.Schema<SourceMetadata>;

export interface Source {
  /** The source to read from, plus its parameters. */
  spec?: Record<string, unknown>;
  /** The codec to use to decode data read from the source. */
  codec?: Record<string, unknown>;
  /** While splitting, sources may specify the produced bundles as differences against another source, in order to save backend-side memory and allow bigger jobs. For details, see SourceSplitRequest. To support this use case, the full set of parameters of the source is logically obtained by taking the latest explicitly specified value of each parameter in the order: base_specs (later items win), spec (overrides anything in base_specs). */
  baseSpecs?: Array<Record<string, unknown>>;
  /** Optionally, metadata for this source can be supplied right away, avoiding a SourceGetMetadataOperation roundtrip (see SourceOperationRequest). This field is meaningful only in the Source objects populated by the user (e.g. when filling in a DerivedSource). Source objects supplied by the framework to the user don't have this field populated. */
  metadata?: SourceMetadata;
  /** Setting this value to true hints to the framework that the source doesn't need splitting, and using SourceSplitRequest on it would yield SOURCE_SPLIT_OUTCOME_USE_CURRENT. E.g. a file splitter may set this to true when splitting a single file into a set of byte ranges of appropriate size, and set this to false when splitting a filepattern into individual files. However, for efficiency, a file splitter may decide to produce file subranges directly from the filepattern to avoid a splitting round-trip. See SourceSplitRequest for an overview of the splitting process. This field is meaningful only in the Source objects populated by the user (e.g. when filling in a DerivedSource). Source objects supplied by the framework to the user don't have this field populated. */
  doesNotNeedSplitting?: boolean;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  spec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  codec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  baseSpecs: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  metadata: Schema.optional(SourceMetadata),
  doesNotNeedSplitting: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface DerivedSource {
  /** Specification of the source. */
  source?: Source;
  /** What source to base the produced source on (if any). */
  derivationMode?: "SOURCE_DERIVATION_MODE_UNKNOWN" | "SOURCE_DERIVATION_MODE_INDEPENDENT" | "SOURCE_DERIVATION_MODE_CHILD_OF_CURRENT" | "SOURCE_DERIVATION_MODE_SIBLING_OF_CURRENT" | (string & {});
}

export const DerivedSource: Schema.Schema<DerivedSource> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  derivationMode: Schema.optional(Schema.String),
})).annotate({ identifier: "DerivedSource" }) as any as Schema.Schema<DerivedSource>;

export interface DynamicSourceSplit {
  /** Primary part (continued to be processed by worker). Specified relative to the previously-current source. Becomes current. */
  primary?: DerivedSource;
  /** Residual part (returned to the pool of work). Specified relative to the previously-current source. */
  residual?: DerivedSource;
}

export const DynamicSourceSplit: Schema.Schema<DynamicSourceSplit> = Schema.suspend(() => Schema.Struct({
  primary: Schema.optional(DerivedSource),
  residual: Schema.optional(DerivedSource),
})).annotate({ identifier: "DynamicSourceSplit" }) as any as Schema.Schema<DynamicSourceSplit>;

export interface SourceSplitShard {
  /** DEPRECATED */
  source?: Source;
  /** DEPRECATED */
  derivationMode?: "SOURCE_DERIVATION_MODE_UNKNOWN" | "SOURCE_DERIVATION_MODE_INDEPENDENT" | "SOURCE_DERIVATION_MODE_CHILD_OF_CURRENT" | "SOURCE_DERIVATION_MODE_SIBLING_OF_CURRENT" | (string & {});
}

export const SourceSplitShard: Schema.Schema<SourceSplitShard> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  derivationMode: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceSplitShard" }) as any as Schema.Schema<SourceSplitShard>;

export interface SourceSplitResponse {
  /** Indicates whether splitting happened and produced a list of bundles. If this is USE_CURRENT_SOURCE_AS_IS, the current source should be processed "as is" without splitting. "bundles" is ignored in this case. If this is SPLITTING_HAPPENED, then "bundles" contains a list of bundles into which the source was split. */
  outcome?: "SOURCE_SPLIT_OUTCOME_UNKNOWN" | "SOURCE_SPLIT_OUTCOME_USE_CURRENT" | "SOURCE_SPLIT_OUTCOME_SPLITTING_HAPPENED" | (string & {});
  /** If outcome is SPLITTING_HAPPENED, then this is a list of bundles into which the source was split. Otherwise this field is ignored. This list can be empty, which means the source represents an empty input. */
  bundles?: Array<DerivedSource>;
  /** DEPRECATED in favor of bundles. */
  shards?: Array<SourceSplitShard>;
}

export const SourceSplitResponse: Schema.Schema<SourceSplitResponse> = Schema.suspend(() => Schema.Struct({
  outcome: Schema.optional(Schema.String),
  bundles: Schema.optional(Schema.Array(DerivedSource)),
  shards: Schema.optional(Schema.Array(SourceSplitShard)),
})).annotate({ identifier: "SourceSplitResponse" }) as any as Schema.Schema<SourceSplitResponse>;

export interface SourceGetMetadataResponse {
  /** The computed metadata. */
  metadata?: SourceMetadata;
}

export const SourceGetMetadataResponse: Schema.Schema<SourceGetMetadataResponse> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(SourceMetadata),
})).annotate({ identifier: "SourceGetMetadataResponse" }) as any as Schema.Schema<SourceGetMetadataResponse>;

export interface SourceOperationResponse {
  /** A response to a request to split a source. */
  split?: SourceSplitResponse;
  /** A response to a request to get metadata about a source. */
  getMetadata?: SourceGetMetadataResponse;
}

export const SourceOperationResponse: Schema.Schema<SourceOperationResponse> = Schema.suspend(() => Schema.Struct({
  split: Schema.optional(SourceSplitResponse),
  getMetadata: Schema.optional(SourceGetMetadataResponse),
})).annotate({ identifier: "SourceOperationResponse" }) as any as Schema.Schema<SourceOperationResponse>;

export interface SourceFork {
  /** DEPRECATED */
  primary?: SourceSplitShard;
  /** DEPRECATED */
  residual?: SourceSplitShard;
  /** DEPRECATED */
  primarySource?: DerivedSource;
  /** DEPRECATED */
  residualSource?: DerivedSource;
}

export const SourceFork: Schema.Schema<SourceFork> = Schema.suspend(() => Schema.Struct({
  primary: Schema.optional(SourceSplitShard),
  residual: Schema.optional(SourceSplitShard),
  primarySource: Schema.optional(DerivedSource),
  residualSource: Schema.optional(DerivedSource),
})).annotate({ identifier: "SourceFork" }) as any as Schema.Schema<SourceFork>;

export interface ApproximateProgress {
  /** Obsolete. */
  position?: Position;
  /** Obsolete. */
  percentComplete?: number;
  /** Obsolete. */
  remainingTime?: string;
}

export const ApproximateProgress: Schema.Schema<ApproximateProgress> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(Position),
  percentComplete: Schema.optional(Schema.Number),
  remainingTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ApproximateProgress" }) as any as Schema.Schema<ApproximateProgress>;

export interface WorkItemStatus {
  /** Identifies the WorkItem. */
  workItemId?: string;
  /** The report index. When a WorkItem is leased, the lease will contain an initial report index. When a WorkItem's status is reported to the system, the report should be sent with that report index, and the response will contain the index the worker should use for the next report. Reports received with unexpected index values will be rejected by the service. In order to preserve idempotency, the worker should not alter the contents of a report, even if the worker must submit the same report multiple times before getting back a response. The worker should not submit a subsequent report until the response for the previous report had been received from the service. */
  reportIndex?: string;
  /** Amount of time the worker requests for its lease. */
  requestedLeaseDuration?: string;
  /** True if the WorkItem was completed (successfully or unsuccessfully). */
  completed?: boolean;
  /** Specifies errors which occurred during processing. If errors are provided, and completed = true, then the WorkItem is considered to have failed. */
  errors?: Array<Status>;
  /** Worker output counters for this WorkItem. */
  counterUpdates?: Array<CounterUpdate>;
  /** DEPRECATED in favor of counter_updates. */
  metricUpdates?: Array<MetricUpdate>;
  /** The worker's progress through this WorkItem. */
  reportedProgress?: ApproximateReportedProgress;
  /** A worker may split an active map task in two parts, "primary" and "residual", continuing to process the primary part and returning the residual part into the pool of available work. This event is called a "dynamic split" and is critical to the dynamic work rebalancing feature. The two obtained sub-tasks are called "parts" of the split. The parts, if concatenated, must represent the same input as would be read by the current task if the split did not happen. The exact way in which the original task is decomposed into the two parts is specified either as a position demarcating them (stop_position), or explicitly as two DerivedSources, if this task consumes a user-defined source type (dynamic_source_split). The "current" task is adjusted as a result of the split: after a task with range [A, B) sends a stop_position update at C, its range is considered to be [A, C), e.g.: * Progress should be interpreted relative to the new range, e.g. "75% completed" means "75% of [A, C) completed" * The worker should interpret proposed_stop_position relative to the new range, e.g. "split at 68%" should be interpreted as "split at 68% of [A, C)". * If the worker chooses to split again using stop_position, only stop_positions in [A, C) will be accepted. * Etc. dynamic_source_split has similar semantics: e.g., if a task with source S splits using dynamic_source_split into {P, R} (where P and R must be together equivalent to S), then subsequent progress and proposed_stop_position should be interpreted relative to P, and in a potential subsequent dynamic_source_split into {P', R'}, P' and R' must be together equivalent to P, etc. */
  stopPosition?: Position;
  /** See documentation of stop_position. */
  dynamicSourceSplit?: DynamicSourceSplit;
  /** If the work item represented a SourceOperationRequest, and the work is completed, contains the result of the operation. */
  sourceOperationResponse?: SourceOperationResponse;
  /** Total time the worker spent being throttled by external systems. */
  totalThrottlerWaitTimeSeconds?: number;
  /** DEPRECATED in favor of dynamic_source_split. */
  sourceFork?: SourceFork;
  /** DEPRECATED in favor of reported_progress. */
  progress?: ApproximateProgress;
}

export const WorkItemStatus: Schema.Schema<WorkItemStatus> = Schema.suspend(() => Schema.Struct({
  workItemId: Schema.optional(Schema.String),
  reportIndex: Schema.optional(Schema.String),
  requestedLeaseDuration: Schema.optional(Schema.String),
  completed: Schema.optional(Schema.Boolean),
  errors: Schema.optional(Schema.Array(Status)),
  counterUpdates: Schema.optional(Schema.Array(CounterUpdate)),
  metricUpdates: Schema.optional(Schema.Array(MetricUpdate)),
  reportedProgress: Schema.optional(ApproximateReportedProgress),
  stopPosition: Schema.optional(Position),
  dynamicSourceSplit: Schema.optional(DynamicSourceSplit),
  sourceOperationResponse: Schema.optional(SourceOperationResponse),
  totalThrottlerWaitTimeSeconds: Schema.optional(Schema.Number),
  sourceFork: Schema.optional(SourceFork),
  progress: Schema.optional(ApproximateProgress),
})).annotate({ identifier: "WorkItemStatus" }) as any as Schema.Schema<WorkItemStatus>;

export interface ReportWorkItemStatusRequest {
  /** The ID of the worker reporting the WorkItem status. If this does not match the ID of the worker which the Dataflow service believes currently has the lease on the WorkItem, the report will be dropped (with an error response). */
  workerId?: string;
  /** The order is unimportant, except that the order of the WorkItemServiceState messages in the ReportWorkItemStatusResponse corresponds to the order of WorkItemStatus messages here. */
  workItemStatuses?: Array<WorkItemStatus>;
  /** The current timestamp at the worker. */
  currentWorkerTime?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the WorkItem's job. */
  location?: string;
  /** Untranslated bag-of-bytes WorkProgressUpdateRequest from UnifiedWorker. */
  unifiedWorkerRequest?: Record<string, unknown>;
  /** Optional. The project number of the project which owns the WorkItem's job. */
  projectNumber?: string;
}

export const ReportWorkItemStatusRequest: Schema.Schema<ReportWorkItemStatusRequest> = Schema.suspend(() => Schema.Struct({
  workerId: Schema.optional(Schema.String),
  workItemStatuses: Schema.optional(Schema.Array(WorkItemStatus)),
  currentWorkerTime: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  unifiedWorkerRequest: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  projectNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportWorkItemStatusRequest" }) as any as Schema.Schema<ReportWorkItemStatusRequest>;

export interface ApproximateSplitRequest {
  /** A Position at which to split the work item. */
  position?: Position;
  /** A fraction at which to split the work item, from 0.0 (beginning of the input) to 1.0 (end of the input). */
  fractionConsumed?: number;
  /** The fraction of the remainder of work to split the work item at, from 0.0 (split at the current position) to 1.0 (end of the input). */
  fractionOfRemainder?: number;
}

export const ApproximateSplitRequest: Schema.Schema<ApproximateSplitRequest> = Schema.suspend(() => Schema.Struct({
  position: Schema.optional(Position),
  fractionConsumed: Schema.optional(Schema.Number),
  fractionOfRemainder: Schema.optional(Schema.Number),
})).annotate({ identifier: "ApproximateSplitRequest" }) as any as Schema.Schema<ApproximateSplitRequest>;

export interface MetricShortId {
  /** The index of the corresponding metric in the ReportWorkItemStatusRequest. Required. */
  metricIndex?: number;
  /** The service-generated short identifier for the metric. */
  shortId?: string;
}

export const MetricShortId: Schema.Schema<MetricShortId> = Schema.suspend(() => Schema.Struct({
  metricIndex: Schema.optional(Schema.Number),
  shortId: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricShortId" }) as any as Schema.Schema<MetricShortId>;

export interface HotKeyDetection {
  /** The age of the hot key measured from when it was first detected. */
  hotKeyAge?: string;
  /** System-defined name of the step containing this hot key. Unique across the workflow. */
  systemName?: string;
  /** User-provided name of the step that contains this hot key. */
  userStepName?: string;
}

export const HotKeyDetection: Schema.Schema<HotKeyDetection> = Schema.suspend(() => Schema.Struct({
  hotKeyAge: Schema.optional(Schema.String),
  systemName: Schema.optional(Schema.String),
  userStepName: Schema.optional(Schema.String),
})).annotate({ identifier: "HotKeyDetection" }) as any as Schema.Schema<HotKeyDetection>;

export interface WorkItemServiceState {
  /** The progress point in the WorkItem where the Dataflow service suggests that the worker truncate the task. */
  splitRequest?: ApproximateSplitRequest;
  /** Time at which the current lease will expire. */
  leaseExpireTime?: string;
  /** New recommended reporting interval. */
  reportStatusInterval?: string;
  /** Other data returned by the service, specific to the particular worker harness. */
  harnessData?: Record<string, unknown>;
  /** The index value to use for the next report sent by the worker. Note: If the report call fails for whatever reason, the worker should reuse this index for subsequent report attempts. */
  nextReportIndex?: string;
  /** The short ids that workers should use in subsequent metric updates. Workers should strive to use short ids whenever possible, but it is ok to request the short_id again if a worker lost track of it (e.g. if the worker is recovering from a crash). NOTE: it is possible that the response may have short ids for a subset of the metrics. */
  metricShortId?: Array<MetricShortId>;
  /** A hot key is a symptom of poor data distribution in which there are enough elements mapped to a single key to impact pipeline performance. When present, this field includes metadata associated with any hot key. */
  hotKeyDetection?: HotKeyDetection;
  /** If set, a request to complete the work item with the given status. This will not be set to OK, unless supported by the specific kind of WorkItem. It can be used for the backend to indicate a WorkItem must terminate, e.g., for aborting work. */
  completeWorkStatus?: Status;
  /** Obsolete, always empty. */
  suggestedStopPosition?: Position;
  /** DEPRECATED in favor of split_request. */
  suggestedStopPoint?: ApproximateProgress;
}

export const WorkItemServiceState: Schema.Schema<WorkItemServiceState> = Schema.suspend(() => Schema.Struct({
  splitRequest: Schema.optional(ApproximateSplitRequest),
  leaseExpireTime: Schema.optional(Schema.String),
  reportStatusInterval: Schema.optional(Schema.String),
  harnessData: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  nextReportIndex: Schema.optional(Schema.String),
  metricShortId: Schema.optional(Schema.Array(MetricShortId)),
  hotKeyDetection: Schema.optional(HotKeyDetection),
  completeWorkStatus: Schema.optional(Status),
  suggestedStopPosition: Schema.optional(Position),
  suggestedStopPoint: Schema.optional(ApproximateProgress),
})).annotate({ identifier: "WorkItemServiceState" }) as any as Schema.Schema<WorkItemServiceState>;

export interface ReportWorkItemStatusResponse {
  /** A set of messages indicating the service-side state for each WorkItem whose status was reported, in the same order as the WorkItemStatus messages in the ReportWorkItemStatusRequest which resulting in this response. */
  workItemServiceStates?: Array<WorkItemServiceState>;
  /** Untranslated bag-of-bytes WorkProgressUpdateResponse for UnifiedWorker. */
  unifiedWorkerResponse?: Record<string, unknown>;
}

export const ReportWorkItemStatusResponse: Schema.Schema<ReportWorkItemStatusResponse> = Schema.suspend(() => Schema.Struct({
  workItemServiceStates: Schema.optional(Schema.Array(WorkItemServiceState)),
  unifiedWorkerResponse: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ReportWorkItemStatusResponse" }) as any as Schema.Schema<ReportWorkItemStatusResponse>;

export interface LeaseWorkItemRequest {
  /** Filter for WorkItem type. */
  workItemTypes?: Array<string>;
  /** Worker capabilities. WorkItems might be limited to workers with specific capabilities. */
  workerCapabilities?: Array<string>;
  /** The initial lease period. */
  requestedLeaseDuration?: string;
  /** The current timestamp at the worker. */
  currentWorkerTime?: string;
  /** Identifies the worker leasing work -- typically the ID of the virtual machine running the worker. */
  workerId?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the WorkItem's job. */
  location?: string;
  /** Untranslated bag-of-bytes WorkRequest from UnifiedWorker. */
  unifiedWorkerRequest?: Record<string, unknown>;
  /** Optional. The project number of the project this worker belongs to. */
  projectNumber?: string;
}

export const LeaseWorkItemRequest: Schema.Schema<LeaseWorkItemRequest> = Schema.suspend(() => Schema.Struct({
  workItemTypes: Schema.optional(Schema.Array(Schema.String)),
  workerCapabilities: Schema.optional(Schema.Array(Schema.String)),
  requestedLeaseDuration: Schema.optional(Schema.String),
  currentWorkerTime: Schema.optional(Schema.String),
  workerId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  unifiedWorkerRequest: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  projectNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "LeaseWorkItemRequest" }) as any as Schema.Schema<LeaseWorkItemRequest>;

export interface ReadInstruction {
  /** The source to read from. */
  source?: Source;
}

export const ReadInstruction: Schema.Schema<ReadInstruction> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
})).annotate({ identifier: "ReadInstruction" }) as any as Schema.Schema<ReadInstruction>;

export interface InstructionInput {
  /** The index (origin zero) of the parallel instruction that produces the output to be consumed by this input. This index is relative to the list of instructions in this input's instruction's containing MapTask. */
  producerInstructionIndex?: number;
  /** The output index (origin zero) within the producer. */
  outputNum?: number;
}

export const InstructionInput: Schema.Schema<InstructionInput> = Schema.suspend(() => Schema.Struct({
  producerInstructionIndex: Schema.optional(Schema.Number),
  outputNum: Schema.optional(Schema.Number),
})).annotate({ identifier: "InstructionInput" }) as any as Schema.Schema<InstructionInput>;

export interface Sink {
  /** The sink to write to, plus its parameters. */
  spec?: Record<string, unknown>;
  /** The codec to use to encode data written to the sink. */
  codec?: Record<string, unknown>;
}

export const Sink: Schema.Schema<Sink> = Schema.suspend(() => Schema.Struct({
  spec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  codec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Sink" }) as any as Schema.Schema<Sink>;

export interface WriteInstruction {
  /** The input. */
  input?: InstructionInput;
  /** The sink to write to. */
  sink?: Sink;
}

export const WriteInstruction: Schema.Schema<WriteInstruction> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(InstructionInput),
  sink: Schema.optional(Sink),
})).annotate({ identifier: "WriteInstruction" }) as any as Schema.Schema<WriteInstruction>;

export interface SideInputInfo {
  /** The source(s) to read element(s) from to get the value of this side input. If more than one source, then the elements are taken from the sources, in the specified order if order matters. At least one source is required. */
  sources?: Array<Source>;
  /** How to interpret the source element(s) as a side input value. */
  kind?: Record<string, unknown>;
  /** The id of the tag the user code will access this side input by; this should correspond to the tag of some MultiOutputInfo. */
  tag?: string;
}

export const SideInputInfo: Schema.Schema<SideInputInfo> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(Source)),
  kind: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "SideInputInfo" }) as any as Schema.Schema<SideInputInfo>;

export interface MultiOutputInfo {
  /** The id of the tag the user code will emit to this output by; this should correspond to the tag of some SideInputInfo. */
  tag?: string;
}

export const MultiOutputInfo: Schema.Schema<MultiOutputInfo> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "MultiOutputInfo" }) as any as Schema.Schema<MultiOutputInfo>;

export interface ParDoInstruction {
  /** The input. */
  input?: InstructionInput;
  /** Zero or more side inputs. */
  sideInputs?: Array<SideInputInfo>;
  /** The user function to invoke. */
  userFn?: Record<string, unknown>;
  /** The number of outputs. */
  numOutputs?: number;
  /** Information about each of the outputs, if user_fn is a MultiDoFn. */
  multiOutputInfos?: Array<MultiOutputInfo>;
}

export const ParDoInstruction: Schema.Schema<ParDoInstruction> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(InstructionInput),
  sideInputs: Schema.optional(Schema.Array(SideInputInfo)),
  userFn: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  numOutputs: Schema.optional(Schema.Number),
  multiOutputInfos: Schema.optional(Schema.Array(MultiOutputInfo)),
})).annotate({ identifier: "ParDoInstruction" }) as any as Schema.Schema<ParDoInstruction>;

export interface PartialGroupByKeyInstruction {
  /** Describes the input to the partial group-by-key instruction. */
  input?: InstructionInput;
  /** The codec to use for interpreting an element in the input PTable. */
  inputElementCodec?: Record<string, unknown>;
  /** The value combining function to invoke. */
  valueCombiningFn?: Record<string, unknown>;
  /** Zero or more side inputs. */
  sideInputs?: Array<SideInputInfo>;
  /** If this instruction includes a combining function, this is the name of the CombineValues instruction lifted into this instruction. */
  originalCombineValuesStepName?: string;
  /** If this instruction includes a combining function this is the name of the intermediate store between the GBK and the CombineValues. */
  originalCombineValuesInputStoreName?: string;
}

export const PartialGroupByKeyInstruction: Schema.Schema<PartialGroupByKeyInstruction> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(InstructionInput),
  inputElementCodec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  valueCombiningFn: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sideInputs: Schema.optional(Schema.Array(SideInputInfo)),
  originalCombineValuesStepName: Schema.optional(Schema.String),
  originalCombineValuesInputStoreName: Schema.optional(Schema.String),
})).annotate({ identifier: "PartialGroupByKeyInstruction" }) as any as Schema.Schema<PartialGroupByKeyInstruction>;

export interface FlattenInstruction {
  /** Describes the inputs to the flatten instruction. */
  inputs?: Array<InstructionInput>;
}

export const FlattenInstruction: Schema.Schema<FlattenInstruction> = Schema.suspend(() => Schema.Struct({
  inputs: Schema.optional(Schema.Array(InstructionInput)),
})).annotate({ identifier: "FlattenInstruction" }) as any as Schema.Schema<FlattenInstruction>;

export interface InstructionOutput {
  /** The user-provided name of this output. */
  name?: string;
  /** System-defined name of this output. Unique across the workflow. */
  systemName?: string;
  /** System-defined name for this output in the original workflow graph. Outputs that do not contribute to an original instruction do not set this. */
  originalName?: string;
  /** The codec to use to encode data being written via this output. */
  codec?: Record<string, unknown>;
  /** For system-generated byte and mean byte metrics, certain instructions should only report the key size. */
  onlyCountKeyBytes?: boolean;
  /** For system-generated byte and mean byte metrics, certain instructions should only report the value size. */
  onlyCountValueBytes?: boolean;
}

export const InstructionOutput: Schema.Schema<InstructionOutput> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  systemName: Schema.optional(Schema.String),
  originalName: Schema.optional(Schema.String),
  codec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  onlyCountKeyBytes: Schema.optional(Schema.Boolean),
  onlyCountValueBytes: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "InstructionOutput" }) as any as Schema.Schema<InstructionOutput>;

export interface ParallelInstruction {
  /** System-defined name of this operation. Unique across the workflow. */
  systemName?: string;
  /** User-provided name of this operation. */
  name?: string;
  /** System-defined name for the operation in the original workflow graph. */
  originalName?: string;
  /** Additional information for Read instructions. */
  read?: ReadInstruction;
  /** Additional information for Write instructions. */
  write?: WriteInstruction;
  /** Additional information for ParDo instructions. */
  parDo?: ParDoInstruction;
  /** Additional information for PartialGroupByKey instructions. */
  partialGroupByKey?: PartialGroupByKeyInstruction;
  /** Additional information for Flatten instructions. */
  flatten?: FlattenInstruction;
  /** Describes the outputs of the instruction. */
  outputs?: Array<InstructionOutput>;
}

export const ParallelInstruction: Schema.Schema<ParallelInstruction> = Schema.suspend(() => Schema.Struct({
  systemName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  originalName: Schema.optional(Schema.String),
  read: Schema.optional(ReadInstruction),
  write: Schema.optional(WriteInstruction),
  parDo: Schema.optional(ParDoInstruction),
  partialGroupByKey: Schema.optional(PartialGroupByKeyInstruction),
  flatten: Schema.optional(FlattenInstruction),
  outputs: Schema.optional(Schema.Array(InstructionOutput)),
})).annotate({ identifier: "ParallelInstruction" }) as any as Schema.Schema<ParallelInstruction>;

export interface MapTask {
  /** The instructions in the MapTask. */
  instructions?: Array<ParallelInstruction>;
  /** System-defined name of this MapTask. Unique across the workflow. */
  systemName?: string;
  /** System-defined name of the stage containing this MapTask. Unique across the workflow. */
  stageName?: string;
  /** Counter prefix that can be used to prefix counters. Not currently used in Dataflow. */
  counterPrefix?: string;
}

export const MapTask: Schema.Schema<MapTask> = Schema.suspend(() => Schema.Struct({
  instructions: Schema.optional(Schema.Array(ParallelInstruction)),
  systemName: Schema.optional(Schema.String),
  stageName: Schema.optional(Schema.String),
  counterPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "MapTask" }) as any as Schema.Schema<MapTask>;

export interface SeqMapTaskOutputInfo {
  /** The id of the TupleTag the user code will tag the output value by. */
  tag?: string;
  /** The sink to write the output value to. */
  sink?: Sink;
}

export const SeqMapTaskOutputInfo: Schema.Schema<SeqMapTaskOutputInfo> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  sink: Schema.optional(Sink),
})).annotate({ identifier: "SeqMapTaskOutputInfo" }) as any as Schema.Schema<SeqMapTaskOutputInfo>;

export interface SeqMapTask {
  /** Information about each of the inputs. */
  inputs?: Array<SideInputInfo>;
  /** The user function to invoke. */
  userFn?: Record<string, unknown>;
  /** Information about each of the outputs. */
  outputInfos?: Array<SeqMapTaskOutputInfo>;
  /** The user-provided name of the SeqDo operation. */
  name?: string;
  /** System-defined name of the SeqDo operation. Unique across the workflow. */
  systemName?: string;
  /** System-defined name of the stage containing the SeqDo operation. Unique across the workflow. */
  stageName?: string;
}

export const SeqMapTask: Schema.Schema<SeqMapTask> = Schema.suspend(() => Schema.Struct({
  inputs: Schema.optional(Schema.Array(SideInputInfo)),
  userFn: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputInfos: Schema.optional(Schema.Array(SeqMapTaskOutputInfo)),
  name: Schema.optional(Schema.String),
  systemName: Schema.optional(Schema.String),
  stageName: Schema.optional(Schema.String),
})).annotate({ identifier: "SeqMapTask" }) as any as Schema.Schema<SeqMapTask>;

export interface ShellTask {
  /** The shell command to run. */
  command?: string;
  /** Exit code for the task. */
  exitCode?: number;
}

export const ShellTask: Schema.Schema<ShellTask> = Schema.suspend(() => Schema.Struct({
  command: Schema.optional(Schema.String),
  exitCode: Schema.optional(Schema.Number),
})).annotate({ identifier: "ShellTask" }) as any as Schema.Schema<ShellTask>;

export interface KeyRangeLocation {
  /** The start (inclusive) of the key range. */
  start?: string;
  /** The end (exclusive) of the key range. */
  end?: string;
  /** The physical location of this range assignment to be used for streaming computation cross-worker message delivery. */
  deliveryEndpoint?: string;
  /** The name of the data disk where data for this range is stored. This name is local to the Google Cloud Platform project and uniquely identifies the disk within that project, for example "myproject-1014-104817-4c2-harness-0-disk-1". */
  dataDisk?: string;
  /** DEPRECATED. The location of the persistent state for this range, as a persistent directory in the worker local filesystem. */
  deprecatedPersistentDirectory?: string;
}

export const KeyRangeLocation: Schema.Schema<KeyRangeLocation> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.String),
  end: Schema.optional(Schema.String),
  deliveryEndpoint: Schema.optional(Schema.String),
  dataDisk: Schema.optional(Schema.String),
  deprecatedPersistentDirectory: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyRangeLocation" }) as any as Schema.Schema<KeyRangeLocation>;

export interface StreamingStageLocation {
  /** Identifies the particular stream within the streaming Dataflow job. */
  streamId?: string;
}

export const StreamingStageLocation: Schema.Schema<StreamingStageLocation> = Schema.suspend(() => Schema.Struct({
  streamId: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamingStageLocation" }) as any as Schema.Schema<StreamingStageLocation>;

export interface PubsubLocation {
  /** A pubsub topic, in the form of "pubsub.googleapis.com/topics//" */
  topic?: string;
  /** A pubsub subscription, in the form of "pubsub.googleapis.com/subscriptions//" */
  subscription?: string;
  /** If set, contains a pubsub label from which to extract record timestamps. If left empty, record timestamps will be generated upon arrival. */
  timestampLabel?: string;
  /** If set, contains a pubsub label from which to extract record ids. If left empty, record deduplication will be strictly best effort. */
  idLabel?: string;
  /** Indicates whether the pipeline allows late-arriving data. */
  dropLateData?: boolean;
  /** If set, specifies the pubsub subscription that will be used for tracking custom time timestamps for watermark estimation. */
  trackingSubscription?: string;
  /** If true, then the client has requested to get pubsub attributes. */
  withAttributes?: boolean;
  /** If true, then this location represents dynamic topics. */
  dynamicDestinations?: boolean;
}

export const PubsubLocation: Schema.Schema<PubsubLocation> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  subscription: Schema.optional(Schema.String),
  timestampLabel: Schema.optional(Schema.String),
  idLabel: Schema.optional(Schema.String),
  dropLateData: Schema.optional(Schema.Boolean),
  trackingSubscription: Schema.optional(Schema.String),
  withAttributes: Schema.optional(Schema.Boolean),
  dynamicDestinations: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PubsubLocation" }) as any as Schema.Schema<PubsubLocation>;

export interface StreamingSideInputLocation {
  /** Identifies the particular side input within the streaming Dataflow job. */
  tag?: string;
  /** Identifies the state family where this side input is stored. */
  stateFamily?: string;
}

export const StreamingSideInputLocation: Schema.Schema<StreamingSideInputLocation> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  stateFamily: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamingSideInputLocation" }) as any as Schema.Schema<StreamingSideInputLocation>;

export interface CustomSourceLocation {
  /** Whether this source is stateful. */
  stateful?: boolean;
}

export const CustomSourceLocation: Schema.Schema<CustomSourceLocation> = Schema.suspend(() => Schema.Struct({
  stateful: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CustomSourceLocation" }) as any as Schema.Schema<CustomSourceLocation>;

export interface StreamLocation {
  /** The stream is part of another computation within the current streaming Dataflow job. */
  streamingStageLocation?: StreamingStageLocation;
  /** The stream is a pubsub stream. */
  pubsubLocation?: PubsubLocation;
  /** The stream is a streaming side input. */
  sideInputLocation?: StreamingSideInputLocation;
  /** The stream is a custom source. */
  customSourceLocation?: CustomSourceLocation;
}

export const StreamLocation: Schema.Schema<StreamLocation> = Schema.suspend(() => Schema.Struct({
  streamingStageLocation: Schema.optional(StreamingStageLocation),
  pubsubLocation: Schema.optional(PubsubLocation),
  sideInputLocation: Schema.optional(StreamingSideInputLocation),
  customSourceLocation: Schema.optional(CustomSourceLocation),
})).annotate({ identifier: "StreamLocation" }) as any as Schema.Schema<StreamLocation>;

export interface StateFamilyConfig {
  /** The state family value. */
  stateFamily?: string;
  /** If true, this family corresponds to a read operation. */
  isRead?: boolean;
}

export const StateFamilyConfig: Schema.Schema<StateFamilyConfig> = Schema.suspend(() => Schema.Struct({
  stateFamily: Schema.optional(Schema.String),
  isRead: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StateFamilyConfig" }) as any as Schema.Schema<StateFamilyConfig>;

export interface ComputationTopology {
  /** The system stage name. */
  systemStageName?: string;
  /** The ID of the computation. */
  computationId?: string;
  /** The key ranges processed by the computation. */
  keyRanges?: Array<KeyRangeLocation>;
  /** The inputs to the computation. */
  inputs?: Array<StreamLocation>;
  /** The outputs from the computation. */
  outputs?: Array<StreamLocation>;
  /** The state family values. */
  stateFamilies?: Array<StateFamilyConfig>;
}

export const ComputationTopology: Schema.Schema<ComputationTopology> = Schema.suspend(() => Schema.Struct({
  systemStageName: Schema.optional(Schema.String),
  computationId: Schema.optional(Schema.String),
  keyRanges: Schema.optional(Schema.Array(KeyRangeLocation)),
  inputs: Schema.optional(Schema.Array(StreamLocation)),
  outputs: Schema.optional(Schema.Array(StreamLocation)),
  stateFamilies: Schema.optional(Schema.Array(StateFamilyConfig)),
})).annotate({ identifier: "ComputationTopology" }) as any as Schema.Schema<ComputationTopology>;

export interface DataDiskAssignment {
  /** VM instance name the data disks mounted to, for example "myproject-1014-104817-4c2-harness-0". */
  vmInstance?: string;
  /** Mounted data disks. The order is important a data disk's 0-based index in this list defines which persistent directory the disk is mounted to, for example the list of { "myproject-1014-104817-4c2-harness-0-disk-0" }, { "myproject-1014-104817-4c2-harness-0-disk-1" }. */
  dataDisks?: Array<string>;
}

export const DataDiskAssignment: Schema.Schema<DataDiskAssignment> = Schema.suspend(() => Schema.Struct({
  vmInstance: Schema.optional(Schema.String),
  dataDisks: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DataDiskAssignment" }) as any as Schema.Schema<DataDiskAssignment>;

export interface TopologyConfig {
  /** The computations associated with a streaming Dataflow job. */
  computations?: Array<ComputationTopology>;
  /** The disks assigned to a streaming Dataflow job. */
  dataDiskAssignments?: Array<DataDiskAssignment>;
  /** Maps user stage names to stable computation names. */
  userStageToComputationNameMap?: Record<string, string>;
  /** The size (in bits) of keys that will be assigned to source messages. */
  forwardingKeyBits?: number;
  /** Version number for persistent state. */
  persistentStateVersion?: number;
}

export const TopologyConfig: Schema.Schema<TopologyConfig> = Schema.suspend(() => Schema.Struct({
  computations: Schema.optional(Schema.Array(ComputationTopology)),
  dataDiskAssignments: Schema.optional(Schema.Array(DataDiskAssignment)),
  userStageToComputationNameMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  forwardingKeyBits: Schema.optional(Schema.Number),
  persistentStateVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "TopologyConfig" }) as any as Schema.Schema<TopologyConfig>;

export interface StreamingApplianceSnapshotConfig {
  /** If set, indicates the snapshot id for the snapshot being performed. */
  snapshotId?: string;
  /** Indicates which endpoint is used to import appliance state. */
  importStateEndpoint?: string;
}

export const StreamingApplianceSnapshotConfig: Schema.Schema<StreamingApplianceSnapshotConfig> = Schema.suspend(() => Schema.Struct({
  snapshotId: Schema.optional(Schema.String),
  importStateEndpoint: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamingApplianceSnapshotConfig" }) as any as Schema.Schema<StreamingApplianceSnapshotConfig>;

export interface StreamingSetupTask {
  /** The TCP port on which the worker should listen for messages from other streaming computation workers. */
  receiveWorkPort?: number;
  /** The TCP port used by the worker to communicate with the Dataflow worker harness. */
  workerHarnessPort?: number;
  /** The global topology of the streaming Dataflow job. */
  streamingComputationTopology?: TopologyConfig;
  /** The user has requested drain. */
  drain?: boolean;
  /** Configures streaming appliance snapshot. */
  snapshotConfig?: StreamingApplianceSnapshotConfig;
}

export const StreamingSetupTask: Schema.Schema<StreamingSetupTask> = Schema.suspend(() => Schema.Struct({
  receiveWorkPort: Schema.optional(Schema.Number),
  workerHarnessPort: Schema.optional(Schema.Number),
  streamingComputationTopology: Schema.optional(TopologyConfig),
  drain: Schema.optional(Schema.Boolean),
  snapshotConfig: Schema.optional(StreamingApplianceSnapshotConfig),
})).annotate({ identifier: "StreamingSetupTask" }) as any as Schema.Schema<StreamingSetupTask>;

export interface SourceSplitOptions {
  /** The source should be split into a set of bundles where the estimated size of each is approximately this many bytes. */
  desiredBundleSizeBytes?: string;
  /** DEPRECATED in favor of desired_bundle_size_bytes. */
  desiredShardSizeBytes?: string;
}

export const SourceSplitOptions: Schema.Schema<SourceSplitOptions> = Schema.suspend(() => Schema.Struct({
  desiredBundleSizeBytes: Schema.optional(Schema.String),
  desiredShardSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceSplitOptions" }) as any as Schema.Schema<SourceSplitOptions>;

export interface SourceSplitRequest {
  /** Specification of the source to be split. */
  source?: Source;
  /** Hints for tuning the splitting process. */
  options?: SourceSplitOptions;
}

export const SourceSplitRequest: Schema.Schema<SourceSplitRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  options: Schema.optional(SourceSplitOptions),
})).annotate({ identifier: "SourceSplitRequest" }) as any as Schema.Schema<SourceSplitRequest>;

export interface SourceGetMetadataRequest {
  /** Specification of the source whose metadata should be computed. */
  source?: Source;
}

export const SourceGetMetadataRequest: Schema.Schema<SourceGetMetadataRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
})).annotate({ identifier: "SourceGetMetadataRequest" }) as any as Schema.Schema<SourceGetMetadataRequest>;

export interface SourceOperationRequest {
  /** System-defined name of the Read instruction for this source. Unique across the workflow. */
  systemName?: string;
  /** User-provided name of the Read instruction for this source. */
  name?: string;
  /** System-defined name for the Read instruction for this source in the original workflow graph. */
  originalName?: string;
  /** System-defined name of the stage containing the source operation. Unique across the workflow. */
  stageName?: string;
  /** Information about a request to split a source. */
  split?: SourceSplitRequest;
  /** Information about a request to get metadata about a source. */
  getMetadata?: SourceGetMetadataRequest;
}

export const SourceOperationRequest: Schema.Schema<SourceOperationRequest> = Schema.suspend(() => Schema.Struct({
  systemName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  originalName: Schema.optional(Schema.String),
  stageName: Schema.optional(Schema.String),
  split: Schema.optional(SourceSplitRequest),
  getMetadata: Schema.optional(SourceGetMetadataRequest),
})).annotate({ identifier: "SourceOperationRequest" }) as any as Schema.Schema<SourceOperationRequest>;

export interface MountedDataDisk {
  /** The name of the data disk. This name is local to the Google Cloud Platform project and uniquely identifies the disk within that project, for example "myproject-1014-104817-4c2-harness-0-disk-1". */
  dataDisk?: string;
}

export const MountedDataDisk: Schema.Schema<MountedDataDisk> = Schema.suspend(() => Schema.Struct({
  dataDisk: Schema.optional(Schema.String),
})).annotate({ identifier: "MountedDataDisk" }) as any as Schema.Schema<MountedDataDisk>;

export interface KeyRangeDataDiskAssignment {
  /** The start (inclusive) of the key range. */
  start?: string;
  /** The end (exclusive) of the key range. */
  end?: string;
  /** The name of the data disk where data for this range is stored. This name is local to the Google Cloud Platform project and uniquely identifies the disk within that project, for example "myproject-1014-104817-4c2-harness-0-disk-1". */
  dataDisk?: string;
}

export const KeyRangeDataDiskAssignment: Schema.Schema<KeyRangeDataDiskAssignment> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.String),
  end: Schema.optional(Schema.String),
  dataDisk: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyRangeDataDiskAssignment" }) as any as Schema.Schema<KeyRangeDataDiskAssignment>;

export interface StreamingComputationRanges {
  /** The ID of the computation. */
  computationId?: string;
  /** Data disk assignments for ranges from this computation. */
  rangeAssignments?: Array<KeyRangeDataDiskAssignment>;
}

export const StreamingComputationRanges: Schema.Schema<StreamingComputationRanges> = Schema.suspend(() => Schema.Struct({
  computationId: Schema.optional(Schema.String),
  rangeAssignments: Schema.optional(Schema.Array(KeyRangeDataDiskAssignment)),
})).annotate({ identifier: "StreamingComputationRanges" }) as any as Schema.Schema<StreamingComputationRanges>;

export interface StreamingComputationTask {
  /** A type of streaming computation task. */
  taskType?: "STREAMING_COMPUTATION_TASK_UNKNOWN" | "STREAMING_COMPUTATION_TASK_STOP" | "STREAMING_COMPUTATION_TASK_START" | (string & {});
  /** Describes the set of data disks this task should apply to. */
  dataDisks?: Array<MountedDataDisk>;
  /** Contains ranges of a streaming computation this task should apply to. */
  computationRanges?: Array<StreamingComputationRanges>;
}

export const StreamingComputationTask: Schema.Schema<StreamingComputationTask> = Schema.suspend(() => Schema.Struct({
  taskType: Schema.optional(Schema.String),
  dataDisks: Schema.optional(Schema.Array(MountedDataDisk)),
  computationRanges: Schema.optional(Schema.Array(StreamingComputationRanges)),
})).annotate({ identifier: "StreamingComputationTask" }) as any as Schema.Schema<StreamingComputationTask>;

export interface StreamingComputationConfig {
  /** Unique identifier for this computation. */
  computationId?: string;
  /** System defined name for this computation. */
  systemName?: string;
  /** Stage name of this computation. */
  stageName?: string;
  /** Instructions that comprise the computation. */
  instructions?: Array<ParallelInstruction>;
  /** Map from user name of stateful transforms in this stage to their state family. */
  transformUserNameToStateFamily?: Record<string, string>;
}

export const StreamingComputationConfig: Schema.Schema<StreamingComputationConfig> = Schema.suspend(() => Schema.Struct({
  computationId: Schema.optional(Schema.String),
  systemName: Schema.optional(Schema.String),
  stageName: Schema.optional(Schema.String),
  instructions: Schema.optional(Schema.Array(ParallelInstruction)),
  transformUserNameToStateFamily: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "StreamingComputationConfig" }) as any as Schema.Schema<StreamingComputationConfig>;

export interface StreamingOperationalLimits {
  /** The maximum size for a single output element. */
  maxProductionOutputBytes?: string;
  /** The maximum size allowed for a key. */
  maxKeyBytes?: string;
  /** The maximum size for a state tag. */
  maxTagBytes?: string;
  /** The maximum size for a value state field. */
  maxValueBytes?: string;
  /** The maximum size for an element in bag state. */
  maxBagElementBytes?: string;
  /** The maximum size for an element in sorted list state. */
  maxSortedListElementBytes?: string;
  /** The maximum size for an element in global data. */
  maxGlobalDataBytes?: string;
  /** The maximum size for a source state update. */
  maxSourceStateBytes?: string;
}

export const StreamingOperationalLimits: Schema.Schema<StreamingOperationalLimits> = Schema.suspend(() => Schema.Struct({
  maxProductionOutputBytes: Schema.optional(Schema.String),
  maxKeyBytes: Schema.optional(Schema.String),
  maxTagBytes: Schema.optional(Schema.String),
  maxValueBytes: Schema.optional(Schema.String),
  maxBagElementBytes: Schema.optional(Schema.String),
  maxSortedListElementBytes: Schema.optional(Schema.String),
  maxGlobalDataBytes: Schema.optional(Schema.String),
  maxSourceStateBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamingOperationalLimits" }) as any as Schema.Schema<StreamingOperationalLimits>;

export interface StreamingConfigTask {
  /** If present, the worker must use this endpoint to communicate with Windmill Service dispatchers, otherwise the worker must continue to use whatever endpoint it had been using. */
  windmillServiceEndpoint?: string;
  /** If present, the worker must use this port to communicate with Windmill Service dispatchers. Only applicable when windmill_service_endpoint is specified. */
  windmillServicePort?: string;
  /** Set of computation configuration information. */
  streamingComputationConfigs?: Array<StreamingComputationConfig>;
  /** Map from user step names to state families. */
  userStepToStateFamilyNameMap?: Record<string, string>;
  /** Maximum size for work item commit supported windmill storage layer. */
  maxWorkItemCommitBytes?: string;
  /** Chunk size for commit streams from the harness to windmill. */
  commitStreamChunkSizeBytes?: string;
  /** Chunk size for get data streams from the harness to windmill. */
  getDataStreamChunkSizeBytes?: string;
  /** Operational limits for the streaming job. Can be used by the worker to validate outputs sent to the backend. */
  operationalLimits?: StreamingOperationalLimits;
  /** Binary encoded proto to control runtime behavior of the java runner v1 user worker. */
  userWorkerRunnerV1Settings?: string;
  /** Binary encoded proto to control runtime behavior of the runner v2 user worker. */
  userWorkerRunnerV2Settings?: string;
  /** Optional. The state tag encoding format version for streaming engine jobs. */
  streamingEngineStateTagEncodingVersion?: number;
}

export const StreamingConfigTask: Schema.Schema<StreamingConfigTask> = Schema.suspend(() => Schema.Struct({
  windmillServiceEndpoint: Schema.optional(Schema.String),
  windmillServicePort: Schema.optional(Schema.String),
  streamingComputationConfigs: Schema.optional(Schema.Array(StreamingComputationConfig)),
  userStepToStateFamilyNameMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maxWorkItemCommitBytes: Schema.optional(Schema.String),
  commitStreamChunkSizeBytes: Schema.optional(Schema.String),
  getDataStreamChunkSizeBytes: Schema.optional(Schema.String),
  operationalLimits: Schema.optional(StreamingOperationalLimits),
  userWorkerRunnerV1Settings: Schema.optional(Schema.String),
  userWorkerRunnerV2Settings: Schema.optional(Schema.String),
  streamingEngineStateTagEncodingVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "StreamingConfigTask" }) as any as Schema.Schema<StreamingConfigTask>;

export interface WorkItem {
  /** Identifies this WorkItem. */
  id?: string;
  /** Identifies the cloud project this WorkItem belongs to. */
  projectId?: string;
  /** Identifies the workflow job this WorkItem belongs to. */
  jobId?: string;
  /** Any required packages that need to be fetched in order to execute this WorkItem. */
  packages?: Array<Package>;
  /** Additional information for MapTask WorkItems. */
  mapTask?: MapTask;
  /** Additional information for SeqMapTask WorkItems. */
  seqMapTask?: SeqMapTask;
  /** Additional information for ShellTask WorkItems. */
  shellTask?: ShellTask;
  /** Additional information for StreamingSetupTask WorkItems. */
  streamingSetupTask?: StreamingSetupTask;
  /** Additional information for source operation WorkItems. */
  sourceOperationTask?: SourceOperationRequest;
  /** Additional information for StreamingComputationTask WorkItems. */
  streamingComputationTask?: StreamingComputationTask;
  /** Additional information for StreamingConfigTask WorkItems. */
  streamingConfigTask?: StreamingConfigTask;
  /** Recommended reporting interval. */
  reportStatusInterval?: string;
  /** Time when the lease on this Work will expire. */
  leaseExpireTime?: string;
  /** Work item-specific configuration as an opaque blob. */
  configuration?: string;
  /** The initial index to use when reporting the status of the WorkItem. */
  initialReportIndex?: string;
}

export const WorkItem: Schema.Schema<WorkItem> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  packages: Schema.optional(Schema.Array(Package)),
  mapTask: Schema.optional(MapTask),
  seqMapTask: Schema.optional(SeqMapTask),
  shellTask: Schema.optional(ShellTask),
  streamingSetupTask: Schema.optional(StreamingSetupTask),
  sourceOperationTask: Schema.optional(SourceOperationRequest),
  streamingComputationTask: Schema.optional(StreamingComputationTask),
  streamingConfigTask: Schema.optional(StreamingConfigTask),
  reportStatusInterval: Schema.optional(Schema.String),
  leaseExpireTime: Schema.optional(Schema.String),
  configuration: Schema.optional(Schema.String),
  initialReportIndex: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkItem" }) as any as Schema.Schema<WorkItem>;

export interface LeaseWorkItemResponse {
  /** A list of the leased WorkItems. */
  workItems?: Array<WorkItem>;
  /** Untranslated bag-of-bytes WorkResponse for UnifiedWorker. */
  unifiedWorkerResponse?: Record<string, unknown>;
}

export const LeaseWorkItemResponse: Schema.Schema<LeaseWorkItemResponse> = Schema.suspend(() => Schema.Struct({
  workItems: Schema.optional(Schema.Array(WorkItem)),
  unifiedWorkerResponse: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "LeaseWorkItemResponse" }) as any as Schema.Schema<LeaseWorkItemResponse>;

export interface WorkerHealthReport {
  /** Whether the VM is currently healthy. */
  vmIsHealthy?: boolean;
  /** Whether the VM is in a permanently broken state. Broken VMs should be abandoned or deleted ASAP to avoid assigning or completing any work. */
  vmIsBroken?: boolean;
  /** Code to describe a specific reason, if known, that a VM has reported broken state. */
  vmBrokenCode?: string;
  /** Message describing any unusual health reports. */
  msg?: string;
  /** The time the VM was booted. */
  vmStartupTime?: string;
  /** The interval at which the worker is sending health reports. The default value of 0 should be interpreted as the field is not being explicitly set by the worker. */
  reportInterval?: string;
  /** The pods running on the worker. See: http://kubernetes.io/v1.1/docs/api-reference/v1/definitions.html#_v1_pod This field is used by the worker to send the status of the indvidual containers running on each worker. */
  pods?: Array<Record<string, unknown>>;
}

export const WorkerHealthReport: Schema.Schema<WorkerHealthReport> = Schema.suspend(() => Schema.Struct({
  vmIsHealthy: Schema.optional(Schema.Boolean),
  vmIsBroken: Schema.optional(Schema.Boolean),
  vmBrokenCode: Schema.optional(Schema.String),
  msg: Schema.optional(Schema.String),
  vmStartupTime: Schema.optional(Schema.String),
  reportInterval: Schema.optional(Schema.String),
  pods: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "WorkerHealthReport" }) as any as Schema.Schema<WorkerHealthReport>;

export interface WorkerMessageCode {
  /** The code is a string intended for consumption by a machine that identifies the type of message being sent. Examples: 1. "HARNESS_STARTED" might be used to indicate the worker harness has started. 2. "GCS_DOWNLOAD_ERROR" might be used to indicate an error downloading a Cloud Storage file as part of the boot process of one of the worker containers. This is a string and not an enum to make it easy to add new codes without waiting for an API change. */
  code?: string;
  /** Parameters contains specific information about the code. This is a struct to allow parameters of different types. Examples: 1. For a "HARNESS_STARTED" message parameters might provide the name of the worker and additional data like timing information. 2. For a "GCS_DOWNLOAD_ERROR" parameters might contain fields listing the Cloud Storage objects being downloaded and fields containing errors. In general complex data structures should be avoided. If a worker needs to send a specific and complicated data structure then please consider defining a new proto and adding it to the data oneof in WorkerMessageResponse. Conventions: Parameters should only be used for information that isn't typically passed as a label. hostname and other worker identifiers should almost always be passed as labels since they will be included on most messages. */
  parameters?: Record<string, unknown>;
}

export const WorkerMessageCode: Schema.Schema<WorkerMessageCode> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "WorkerMessageCode" }) as any as Schema.Schema<WorkerMessageCode>;

export interface CPUTime {
  /** Timestamp of the measurement. */
  timestamp?: string;
  /** Total active CPU time across all cores (ie., non-idle) in milliseconds since start-up. */
  totalMs?: string;
  /** Average CPU utilization rate (% non-idle cpu / second) since previous sample. */
  rate?: number;
}

export const CPUTime: Schema.Schema<CPUTime> = Schema.suspend(() => Schema.Struct({
  timestamp: Schema.optional(Schema.String),
  totalMs: Schema.optional(Schema.String),
  rate: Schema.optional(Schema.Number),
})).annotate({ identifier: "CPUTime" }) as any as Schema.Schema<CPUTime>;

export interface GPUUtilization {
  /** Required. GPU utilization rate of any kernel over the last sample period in the range of [0, 1]. */
  rate?: number;
}

export const GPUUtilization: Schema.Schema<GPUUtilization> = Schema.suspend(() => Schema.Struct({
  rate: Schema.optional(Schema.Number),
})).annotate({ identifier: "GPUUtilization" }) as any as Schema.Schema<GPUUtilization>;

export interface GPUUsage {
  /** Required. Timestamp of the measurement. */
  timestamp?: string;
  /** Required. Utilization info about the GPU. */
  utilization?: GPUUtilization;
}

export const GPUUsage: Schema.Schema<GPUUsage> = Schema.suspend(() => Schema.Struct({
  timestamp: Schema.optional(Schema.String),
  utilization: Schema.optional(GPUUtilization),
})).annotate({ identifier: "GPUUsage" }) as any as Schema.Schema<GPUUsage>;

export interface MemInfo {
  /** Timestamp of the measurement. */
  timestamp?: string;
  /** Total memory (RSS) usage since start up in GB * ms. */
  totalGbMs?: string;
  /** Instantenous memory (RSS) size in bytes. */
  currentRssBytes?: string;
  /** Instantenous memory limit in bytes. */
  currentLimitBytes?: string;
  /** Number of Out of Memory (OOM) events recorded since the previous measurement. */
  currentOoms?: string;
}

export const MemInfo: Schema.Schema<MemInfo> = Schema.suspend(() => Schema.Struct({
  timestamp: Schema.optional(Schema.String),
  totalGbMs: Schema.optional(Schema.String),
  currentRssBytes: Schema.optional(Schema.String),
  currentLimitBytes: Schema.optional(Schema.String),
  currentOoms: Schema.optional(Schema.String),
})).annotate({ identifier: "MemInfo" }) as any as Schema.Schema<MemInfo>;

export interface ResourceUtilizationReport {
  /** CPU utilization samples. */
  cpuTime?: Array<CPUTime>;
  /** Optional. GPU usage samples. */
  gpuUsage?: Array<GPUUsage>;
  /** Memory utilization samples. */
  memoryInfo?: Array<MemInfo>;
  /** Per container information. Key: container name. */
  containers?: Record<string, ResourceUtilizationReport>;
}

export const ResourceUtilizationReport: Schema.Schema<ResourceUtilizationReport> = Schema.suspend(() => Schema.Struct({
  cpuTime: Schema.optional(Schema.Array(CPUTime)),
  gpuUsage: Schema.optional(Schema.Array(GPUUsage)),
  memoryInfo: Schema.optional(Schema.Array(MemInfo)),
  containers: Schema.optional(Schema.Record(Schema.String, ResourceUtilizationReport)),
})).annotate({ identifier: "ResourceUtilizationReport" }) as any as Schema.Schema<ResourceUtilizationReport>;

export interface WorkerShutdownNotice {
  /** The reason for the worker shutdown. Current possible values are: "UNKNOWN": shutdown reason is unknown. "PREEMPTION": shutdown reason is preemption. Other possible reasons may be added in the future. */
  reason?: string;
}

export const WorkerShutdownNotice: Schema.Schema<WorkerShutdownNotice> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkerShutdownNotice" }) as any as Schema.Schema<WorkerShutdownNotice>;

export interface WorkerLifecycleEvent {
  /** The event being reported. */
  event?: "UNKNOWN_EVENT" | "OS_START" | "CONTAINER_START" | "NETWORK_UP" | "STAGING_FILES_DOWNLOAD_START" | "STAGING_FILES_DOWNLOAD_FINISH" | "SDK_INSTALL_START" | "SDK_INSTALL_FINISH" | (string & {});
  /** Other stats that can accompany an event. E.g. { "downloaded_bytes" : "123456" } */
  metadata?: Record<string, string>;
  /** The start time of this container. All events will report this so that events can be grouped together across container/VM restarts. */
  containerStartTime?: string;
}

export const WorkerLifecycleEvent: Schema.Schema<WorkerLifecycleEvent> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  containerStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkerLifecycleEvent" }) as any as Schema.Schema<WorkerLifecycleEvent>;

export interface WorkerThreadScalingReport {
  /** Current number of active threads in a worker. */
  currentThreadCount?: number;
}

export const WorkerThreadScalingReport: Schema.Schema<WorkerThreadScalingReport> = Schema.suspend(() => Schema.Struct({
  currentThreadCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "WorkerThreadScalingReport" }) as any as Schema.Schema<WorkerThreadScalingReport>;

export interface DataSamplingReport {
  /** Optional. Delta of bytes sampled from previous report. */
  elementsSampledBytes?: string;
  /** Optional. Delta of number of elements sampled from previous report. */
  elementsSampledCount?: string;
  /** Optional. Delta of number of PCollections sampled from previous report. */
  pcollectionsSampledCount?: string;
  /** Optional. Delta of number of samples taken from user code exceptions from previous report. */
  exceptionsSampledCount?: string;
  /** Optional. Delta of bytes written to file from previous report. */
  bytesWrittenDelta?: string;
  /** Optional. Delta of errors counts from retrieving, or translating the samples from previous report. */
  translationErrorsCount?: string;
  /** Optional. Delta of errors counts from persisting the samples from previous report. */
  persistenceErrorsCount?: string;
}

export const DataSamplingReport: Schema.Schema<DataSamplingReport> = Schema.suspend(() => Schema.Struct({
  elementsSampledBytes: Schema.optional(Schema.String),
  elementsSampledCount: Schema.optional(Schema.String),
  pcollectionsSampledCount: Schema.optional(Schema.String),
  exceptionsSampledCount: Schema.optional(Schema.String),
  bytesWrittenDelta: Schema.optional(Schema.String),
  translationErrorsCount: Schema.optional(Schema.String),
  persistenceErrorsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "DataSamplingReport" }) as any as Schema.Schema<DataSamplingReport>;

export interface StreamingScalingReport {
  /** Current acive thread count. */
  activeThreadCount?: number;
  /** Maximum thread count limit. */
  maximumThreadCount?: number;
  /** Maximum bundle count. */
  maximumBundleCount?: number;
  /** Current outstanding bundle count. */
  outstandingBundleCount?: number;
  /** Current outstanding bytes. */
  outstandingBytes?: string;
  /** Maximum bytes. */
  maximumBytes?: string;
  activeBundleCount?: number;
  outstandingBytesCount?: number;
  maximumBytesCount?: number;
}

export const StreamingScalingReport: Schema.Schema<StreamingScalingReport> = Schema.suspend(() => Schema.Struct({
  activeThreadCount: Schema.optional(Schema.Number),
  maximumThreadCount: Schema.optional(Schema.Number),
  maximumBundleCount: Schema.optional(Schema.Number),
  outstandingBundleCount: Schema.optional(Schema.Number),
  outstandingBytes: Schema.optional(Schema.String),
  maximumBytes: Schema.optional(Schema.String),
  activeBundleCount: Schema.optional(Schema.Number),
  outstandingBytesCount: Schema.optional(Schema.Number),
  maximumBytesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "StreamingScalingReport" }) as any as Schema.Schema<StreamingScalingReport>;

export interface Linear {
  /** Must be greater than 0. */
  numberOfBuckets?: number;
  /** Distance between bucket boundaries. Must be greater than 0. */
  width?: number;
  /** Lower bound of the first bucket. */
  start?: number;
}

export const Linear: Schema.Schema<Linear> = Schema.suspend(() => Schema.Struct({
  numberOfBuckets: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
  start: Schema.optional(Schema.Number),
})).annotate({ identifier: "Linear" }) as any as Schema.Schema<Linear>;

export interface Base2Exponent {
  /** Must be greater than 0. */
  numberOfBuckets?: number;
  /** Must be between -3 and 3. This forces the growth factor of the bucket boundaries to be between `2^(1/8)` and `256`. */
  scale?: number;
}

export const Base2Exponent: Schema.Schema<Base2Exponent> = Schema.suspend(() => Schema.Struct({
  numberOfBuckets: Schema.optional(Schema.Number),
  scale: Schema.optional(Schema.Number),
})).annotate({ identifier: "Base2Exponent" }) as any as Schema.Schema<Base2Exponent>;

export interface BucketOptions {
  /** Bucket boundaries grow linearly. */
  linear?: Linear;
  /** Bucket boundaries grow exponentially. */
  exponential?: Base2Exponent;
}

export const BucketOptions: Schema.Schema<BucketOptions> = Schema.suspend(() => Schema.Struct({
  linear: Schema.optional(Linear),
  exponential: Schema.optional(Base2Exponent),
})).annotate({ identifier: "BucketOptions" }) as any as Schema.Schema<BucketOptions>;

export interface OutlierStats {
  /** Number of values that are smaller than the lower bound of the smallest bucket. */
  underflowCount?: string;
  /** Mean of values in the undeflow bucket. */
  underflowMean?: number;
  /** Number of values that are larger than the upper bound of the largest bucket. */
  overflowCount?: string;
  /** Mean of values in the overflow bucket. */
  overflowMean?: number;
}

export const OutlierStats: Schema.Schema<OutlierStats> = Schema.suspend(() => Schema.Struct({
  underflowCount: Schema.optional(Schema.String),
  underflowMean: Schema.optional(Schema.Number),
  overflowCount: Schema.optional(Schema.String),
  overflowMean: Schema.optional(Schema.Number),
})).annotate({ identifier: "OutlierStats" }) as any as Schema.Schema<OutlierStats>;

export interface DataflowHistogramValue {
  /** Number of values recorded in this histogram. */
  count?: string;
  /** Describes the bucket boundaries used in the histogram. */
  bucketOptions?: BucketOptions;
  /** Optional. The number of values in each bucket of the histogram, as described in `bucket_options`. `bucket_counts` should contain N values, where N is the number of buckets specified in `bucket_options`. If `bucket_counts` has fewer than N values, the remaining values are assumed to be 0. */
  bucketCounts?: Array<string>;
  /** Statistics on the values recorded in the histogram that fall out of the bucket boundaries. */
  outlierStats?: OutlierStats;
}

export const DataflowHistogramValue: Schema.Schema<DataflowHistogramValue> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  bucketOptions: Schema.optional(BucketOptions),
  bucketCounts: Schema.optional(Schema.Array(Schema.String)),
  outlierStats: Schema.optional(OutlierStats),
})).annotate({ identifier: "DataflowHistogramValue" }) as any as Schema.Schema<DataflowHistogramValue>;

export interface DataflowGaugeValue {
  /** The value of the gauge. */
  value?: string;
  /** The timestamp when the gauge was recorded. */
  measuredTime?: string;
}

export const DataflowGaugeValue: Schema.Schema<DataflowGaugeValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  measuredTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DataflowGaugeValue" }) as any as Schema.Schema<DataflowGaugeValue>;

export interface MetricValue {
  /** Base name for this metric. */
  metric?: string;
  /** Optional. Set of metric labels for this metric. */
  metricLabels?: Record<string, string>;
  /** Integer value of this metric. */
  valueInt64?: string;
  /** Histogram value of this metric. */
  valueHistogram?: DataflowHistogramValue;
  /** Non-cumulative int64 value of this metric. */
  valueGauge64?: DataflowGaugeValue;
}

export const MetricValue: Schema.Schema<MetricValue> = Schema.suspend(() => Schema.Struct({
  metric: Schema.optional(Schema.String),
  metricLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  valueInt64: Schema.optional(Schema.String),
  valueHistogram: Schema.optional(DataflowHistogramValue),
  valueGauge64: Schema.optional(DataflowGaugeValue),
})).annotate({ identifier: "MetricValue" }) as any as Schema.Schema<MetricValue>;

export interface PerStepNamespaceMetrics {
  /** The namespace of these metrics on the worker. */
  metricsNamespace?: string;
  /** The original system name of the unfused step that these metrics are reported from. */
  originalStep?: string;
  /** Optional. Metrics that are recorded for this namespace and unfused step. */
  metricValues?: Array<MetricValue>;
}

export const PerStepNamespaceMetrics: Schema.Schema<PerStepNamespaceMetrics> = Schema.suspend(() => Schema.Struct({
  metricsNamespace: Schema.optional(Schema.String),
  originalStep: Schema.optional(Schema.String),
  metricValues: Schema.optional(Schema.Array(MetricValue)),
})).annotate({ identifier: "PerStepNamespaceMetrics" }) as any as Schema.Schema<PerStepNamespaceMetrics>;

export interface PerWorkerMetrics {
  /** Optional. Metrics for a particular unfused step and namespace. */
  perStepNamespaceMetrics?: Array<PerStepNamespaceMetrics>;
}

export const PerWorkerMetrics: Schema.Schema<PerWorkerMetrics> = Schema.suspend(() => Schema.Struct({
  perStepNamespaceMetrics: Schema.optional(Schema.Array(PerStepNamespaceMetrics)),
})).annotate({ identifier: "PerWorkerMetrics" }) as any as Schema.Schema<PerWorkerMetrics>;

export interface WorkerMessage {
  /** Labels are used to group WorkerMessages. For example, a worker_message about a particular container might have the labels: { "JOB_ID": "2015-04-22", "WORKER_ID": "wordcount-vm-2015…" "CONTAINER_TYPE": "worker", "CONTAINER_ID": "ac1234def"} Label tags typically correspond to Label enum values. However, for ease of development other strings can be used as tags. LABEL_UNSPECIFIED should not be used here. */
  labels?: Record<string, string>;
  /** The timestamp of the worker_message. */
  time?: string;
  /** The health of a worker. */
  workerHealthReport?: WorkerHealthReport;
  /** A worker message code. */
  workerMessageCode?: WorkerMessageCode;
  /** Resource metrics reported by workers. */
  workerMetrics?: ResourceUtilizationReport;
  /** Shutdown notice by workers. */
  workerShutdownNotice?: WorkerShutdownNotice;
  /** Record of worker lifecycle events. */
  workerLifecycleEvent?: WorkerLifecycleEvent;
  /** Thread scaling information reported by workers. */
  workerThreadScalingReport?: WorkerThreadScalingReport;
  /** Optional. Contains metrics related to go/dataflow-data-sampling-telemetry. */
  dataSamplingReport?: DataSamplingReport;
  /** Contains per-user worker telemetry used in streaming autoscaling. */
  streamingScalingReport?: StreamingScalingReport;
  /** System defined metrics for this worker. */
  perWorkerMetrics?: PerWorkerMetrics;
}

export const WorkerMessage: Schema.Schema<WorkerMessage> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  time: Schema.optional(Schema.String),
  workerHealthReport: Schema.optional(WorkerHealthReport),
  workerMessageCode: Schema.optional(WorkerMessageCode),
  workerMetrics: Schema.optional(ResourceUtilizationReport),
  workerShutdownNotice: Schema.optional(WorkerShutdownNotice),
  workerLifecycleEvent: Schema.optional(WorkerLifecycleEvent),
  workerThreadScalingReport: Schema.optional(WorkerThreadScalingReport),
  dataSamplingReport: Schema.optional(DataSamplingReport),
  streamingScalingReport: Schema.optional(StreamingScalingReport),
  perWorkerMetrics: Schema.optional(PerWorkerMetrics),
})).annotate({ identifier: "WorkerMessage" }) as any as Schema.Schema<WorkerMessage>;

export interface SendWorkerMessagesRequest {
  /** The WorkerMessages to send. */
  workerMessages?: Array<WorkerMessage>;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job. */
  location?: string;
}

export const SendWorkerMessagesRequest: Schema.Schema<SendWorkerMessagesRequest> = Schema.suspend(() => Schema.Struct({
  workerMessages: Schema.optional(Schema.Array(WorkerMessage)),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "SendWorkerMessagesRequest" }) as any as Schema.Schema<SendWorkerMessagesRequest>;

export interface WorkerHealthReportResponse {
  /** A positive value indicates the worker should change its reporting interval to the specified value. The default value of zero means no change in report rate is requested by the server. */
  reportInterval?: string;
}

export const WorkerHealthReportResponse: Schema.Schema<WorkerHealthReportResponse> = Schema.suspend(() => Schema.Struct({
  reportInterval: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkerHealthReportResponse" }) as any as Schema.Schema<WorkerHealthReportResponse>;

export interface ResourceUtilizationReportResponse {
}

export const ResourceUtilizationReportResponse: Schema.Schema<ResourceUtilizationReportResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResourceUtilizationReportResponse" }) as any as Schema.Schema<ResourceUtilizationReportResponse>;

export interface WorkerShutdownNoticeResponse {
}

export const WorkerShutdownNoticeResponse: Schema.Schema<WorkerShutdownNoticeResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WorkerShutdownNoticeResponse" }) as any as Schema.Schema<WorkerShutdownNoticeResponse>;

export interface WorkerThreadScalingReportResponse {
  /** Recommended number of threads for a worker. */
  recommendedThreadCount?: number;
}

export const WorkerThreadScalingReportResponse: Schema.Schema<WorkerThreadScalingReportResponse> = Schema.suspend(() => Schema.Struct({
  recommendedThreadCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "WorkerThreadScalingReportResponse" }) as any as Schema.Schema<WorkerThreadScalingReportResponse>;

export interface StreamingScalingReportResponse {
  /** Maximum thread count limit; */
  maximumThreadCount?: number;
}

export const StreamingScalingReportResponse: Schema.Schema<StreamingScalingReportResponse> = Schema.suspend(() => Schema.Struct({
  maximumThreadCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "StreamingScalingReportResponse" }) as any as Schema.Schema<StreamingScalingReportResponse>;

export interface WorkerMessageResponse {
  /** The service's response to a worker's health report. */
  workerHealthReportResponse?: WorkerHealthReportResponse;
  /** Service's response to reporting worker metrics (currently empty). */
  workerMetricsResponse?: ResourceUtilizationReportResponse;
  /** Service's response to shutdown notice (currently empty). */
  workerShutdownNoticeResponse?: WorkerShutdownNoticeResponse;
  /** Service's thread scaling recommendation for workers. */
  workerThreadScalingReportResponse?: WorkerThreadScalingReportResponse;
  /** Service's streaming scaling response for workers. */
  streamingScalingReportResponse?: StreamingScalingReportResponse;
}

export const WorkerMessageResponse: Schema.Schema<WorkerMessageResponse> = Schema.suspend(() => Schema.Struct({
  workerHealthReportResponse: Schema.optional(WorkerHealthReportResponse),
  workerMetricsResponse: Schema.optional(ResourceUtilizationReportResponse),
  workerShutdownNoticeResponse: Schema.optional(WorkerShutdownNoticeResponse),
  workerThreadScalingReportResponse: Schema.optional(WorkerThreadScalingReportResponse),
  streamingScalingReportResponse: Schema.optional(StreamingScalingReportResponse),
})).annotate({ identifier: "WorkerMessageResponse" }) as any as Schema.Schema<WorkerMessageResponse>;

export interface SendWorkerMessagesResponse {
  /** The servers response to the worker messages. */
  workerMessageResponses?: Array<WorkerMessageResponse>;
}

export const SendWorkerMessagesResponse: Schema.Schema<SendWorkerMessagesResponse> = Schema.suspend(() => Schema.Struct({
  workerMessageResponses: Schema.optional(Schema.Array(WorkerMessageResponse)),
})).annotate({ identifier: "SendWorkerMessagesResponse" }) as any as Schema.Schema<SendWorkerMessagesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Deletes a snapshot. */
export interface DeleteSnapshotsProjectsRequest {
  /** The ID of the Cloud Platform project that the snapshot belongs to. */
  projectId: string;
  /** The ID of the snapshot. */
  snapshotId?: string;
  /** The location that contains this snapshot. */
  location?: string;
}

export const DeleteSnapshotsProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  snapshotId: Schema.optional(Schema.String).pipe(T.HttpQuery("snapshotId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1b3/projects/{projectId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<DeleteSnapshotsProjectsRequest>;

export type DeleteSnapshotsProjectsResponse = DeleteSnapshotResponse;
export const DeleteSnapshotsProjectsResponse = DeleteSnapshotResponse;

export type DeleteSnapshotsProjectsError = CommonErrors;

export const deleteSnapshotsProjects: API.OperationMethod<DeleteSnapshotsProjectsRequest, DeleteSnapshotsProjectsResponse, DeleteSnapshotsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSnapshotsProjectsRequest,
  output: DeleteSnapshotsProjectsResponse,
  errors: [],
}));

/** Send a worker_message to the service. */
export interface WorkerMessagesProjectsRequest {
  /** The project to send the WorkerMessages to. */
  projectId: string;
  /** Request body */
  body?: SendWorkerMessagesRequest;
}

export const WorkerMessagesProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(SendWorkerMessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/WorkerMessages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WorkerMessagesProjectsRequest>;

export type WorkerMessagesProjectsResponse = SendWorkerMessagesResponse;
export const WorkerMessagesProjectsResponse = SendWorkerMessagesResponse;

export type WorkerMessagesProjectsError = CommonErrors;

export const workerMessagesProjects: API.OperationMethod<WorkerMessagesProjectsRequest, WorkerMessagesProjectsResponse, WorkerMessagesProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WorkerMessagesProjectsRequest,
  output: WorkerMessagesProjectsResponse,
  errors: [],
}));

/** Gets information about a snapshot. */
export interface GetProjectsSnapshotsRequest {
  /** The ID of the Cloud Platform project that the snapshot belongs to. */
  projectId: string;
  /** The ID of the snapshot. */
  snapshotId: string;
  /** The location that contains this snapshot. */
  location?: string;
}

export const GetProjectsSnapshotsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  snapshotId: Schema.String.pipe(T.HttpPath("snapshotId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/snapshots/{snapshotId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSnapshotsRequest>;

export type GetProjectsSnapshotsResponse = Snapshot;
export const GetProjectsSnapshotsResponse = Snapshot;

export type GetProjectsSnapshotsError = CommonErrors;

export const getProjectsSnapshots: API.OperationMethod<GetProjectsSnapshotsRequest, GetProjectsSnapshotsResponse, GetProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSnapshotsRequest,
  output: GetProjectsSnapshotsResponse,
  errors: [],
}));

/** Lists snapshots. */
export interface ListProjectsSnapshotsRequest {
  /** The project ID to list snapshots for. */
  projectId: string;
  /** If specified, list snapshots created from this job. */
  jobId?: string;
  /** The location to list snapshots in. */
  location?: string;
}

export const ListProjectsSnapshotsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.optional(Schema.String).pipe(T.HttpQuery("jobId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSnapshotsRequest>;

export type ListProjectsSnapshotsResponse = ListSnapshotsResponse;
export const ListProjectsSnapshotsResponse = ListSnapshotsResponse;

export type ListProjectsSnapshotsError = CommonErrors;

export const listProjectsSnapshots: API.OperationMethod<ListProjectsSnapshotsRequest, ListProjectsSnapshotsResponse, ListProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsSnapshotsRequest,
  output: ListProjectsSnapshotsResponse,
  errors: [],
}));

/** Creates a Dataflow job. To create a job, we recommend using `projects.locations.jobs.create` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.create` is not recommended, as your job will always start in `us-central1`. Do not enter confidential information when you supply string values using the API. */
export interface CreateProjectsJobsRequest {
  /** The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The level of information requested in response. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
  /** Deprecated. This field is now in the Job message. */
  replaceJobId?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location?: string;
  /** Request body */
  body?: Job;
}

export const CreateProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  replaceJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("replaceJobId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsJobsRequest>;

export type CreateProjectsJobsResponse = Job;
export const CreateProjectsJobsResponse = Job;

export type CreateProjectsJobsError = CommonErrors;

export const createProjectsJobs: API.OperationMethod<CreateProjectsJobsRequest, CreateProjectsJobsResponse, CreateProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsJobsRequest,
  output: CreateProjectsJobsResponse,
  errors: [],
}));

/** Gets the state of the specified Cloud Dataflow job. To get the state of a job, we recommend using `projects.locations.jobs.get` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.get` is not recommended, as you can only get the state of jobs that are running in `us-central1`. */
export interface GetProjectsJobsRequest {
  /** The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The job ID. */
  jobId: string;
  /** The level of information requested in response. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location?: string;
}

export const GetProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/jobs/{jobId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsJobsRequest>;

export type GetProjectsJobsResponse = Job;
export const GetProjectsJobsResponse = Job;

export type GetProjectsJobsError = CommonErrors;

export const getProjectsJobs: API.OperationMethod<GetProjectsJobsRequest, GetProjectsJobsResponse, GetProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsJobsRequest,
  output: GetProjectsJobsResponse,
  errors: [],
}));

/** Updates the state of an existing Cloud Dataflow job. To update the state of an existing job, we recommend using `projects.locations.jobs.update` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.update` is not recommended, as you can only update the state of jobs that are running in `us-central1`. */
export interface UpdateProjectsJobsRequest {
  /** The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The job ID. */
  jobId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location?: string;
  /** The list of fields to update relative to Job. If empty, only RequestedJobState will be considered for update. If the FieldMask is not empty and RequestedJobState is none/empty, The fields specified in the update mask will be the only ones considered for update. If both RequestedJobState and update_mask are specified, an error will be returned as we cannot update both state and mask. */
  updateMask?: string;
  /** Request body */
  body?: Job;
}

export const UpdateProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1b3/projects/{projectId}/jobs/{jobId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsJobsRequest>;

export type UpdateProjectsJobsResponse = Job;
export const UpdateProjectsJobsResponse = Job;

export type UpdateProjectsJobsError = CommonErrors;

export const updateProjectsJobs: API.OperationMethod<UpdateProjectsJobsRequest, UpdateProjectsJobsResponse, UpdateProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsJobsRequest,
  output: UpdateProjectsJobsResponse,
  errors: [],
}));

/** List the jobs of a project. To list the jobs of a project in a region, we recommend using `projects.locations.jobs.list` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). To list the all jobs across all regions, use `projects.jobs.aggregated`. Using `projects.jobs.list` is not recommended, because you can only get the list of jobs that are running in `us-central1`. `projects.locations.jobs.list` and `projects.jobs.list` support filtering the list of jobs by name. Filtering by name isn't supported by `projects.jobs.aggregated`. */
export interface ListProjectsJobsRequest {
  /** The project which owns the jobs. */
  projectId: string;
  /** The kind of filter to use. */
  filter?: "UNKNOWN" | "ALL" | "TERMINATED" | "ACTIVE" | (string & {});
  /** Deprecated. ListJobs always returns summaries now. Use GetJob for other JobViews. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
  /** If there are many jobs, limit response to at most this many. The actual number of jobs returned will be the lesser of max_responses and an unspecified server-defined limit. */
  pageSize?: number;
  /** Set this to the 'next_page_token' field of a previous response to request additional results in a long list. */
  pageToken?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location?: string;
  /** Optional. The job name. */
  name?: string;
}

export const ListProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsJobsRequest>;

export type ListProjectsJobsResponse = ListJobsResponse;
export const ListProjectsJobsResponse = ListJobsResponse;

export type ListProjectsJobsError = CommonErrors;

export const listProjectsJobs = API.makePaginated(() => ({
  input: ListProjectsJobsRequest,
  output: ListProjectsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List the jobs of a project across all regions. **Note:** This method doesn't support filtering the list of jobs by name. */
export interface AggregatedProjectsJobsRequest {
  /** The project which owns the jobs. */
  projectId: string;
  /** The kind of filter to use. */
  filter?: "UNKNOWN" | "ALL" | "TERMINATED" | "ACTIVE" | (string & {});
  /** Deprecated. ListJobs always returns summaries now. Use GetJob for other JobViews. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
  /** If there are many jobs, limit response to at most this many. The actual number of jobs returned will be the lesser of max_responses and an unspecified server-defined limit. */
  pageSize?: number;
  /** Set this to the 'next_page_token' field of a previous response to request additional results in a long list. */
  pageToken?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location?: string;
  /** Optional. The job name. */
  name?: string;
}

export const AggregatedProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/jobs:aggregated" }),
  svc,
) as unknown as Schema.Schema<AggregatedProjectsJobsRequest>;

export type AggregatedProjectsJobsResponse = ListJobsResponse;
export const AggregatedProjectsJobsResponse = ListJobsResponse;

export type AggregatedProjectsJobsError = CommonErrors;

export const aggregatedProjectsJobs = API.makePaginated(() => ({
  input: AggregatedProjectsJobsRequest,
  output: AggregatedProjectsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Snapshot the state of a streaming job. */
export interface SnapshotProjectsJobsRequest {
  /** The project which owns the job to be snapshotted. */
  projectId: string;
  /** The job to be snapshotted. */
  jobId: string;
  /** Request body */
  body?: SnapshotJobRequest;
}

export const SnapshotProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(SnapshotJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/jobs/{jobId}:snapshot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SnapshotProjectsJobsRequest>;

export type SnapshotProjectsJobsResponse = Snapshot;
export const SnapshotProjectsJobsResponse = Snapshot;

export type SnapshotProjectsJobsError = CommonErrors;

export const snapshotProjectsJobs: API.OperationMethod<SnapshotProjectsJobsRequest, SnapshotProjectsJobsResponse, SnapshotProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SnapshotProjectsJobsRequest,
  output: SnapshotProjectsJobsResponse,
  errors: [],
}));

/** Request the job status. To request the status of a job, we recommend using `projects.locations.jobs.getMetrics` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.getMetrics` is not recommended, as you can only request the status of jobs that are running in `us-central1`. */
export interface GetMetricsProjectsJobsRequest {
  /** A project id. */
  projectId: string;
  /** The job to get metrics for. */
  jobId: string;
  /** Return only metric data that has changed since this time. Default is to return all information about all metrics for the job. */
  startTime?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location?: string;
}

export const GetMetricsProjectsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/jobs/{jobId}/metrics" }),
  svc,
) as unknown as Schema.Schema<GetMetricsProjectsJobsRequest>;

export type GetMetricsProjectsJobsResponse = JobMetrics;
export const GetMetricsProjectsJobsResponse = JobMetrics;

export type GetMetricsProjectsJobsError = CommonErrors;

export const getMetricsProjectsJobs: API.OperationMethod<GetMetricsProjectsJobsRequest, GetMetricsProjectsJobsResponse, GetMetricsProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetricsProjectsJobsRequest,
  output: GetMetricsProjectsJobsResponse,
  errors: [],
}));

/** Get encoded debug configuration for component. Not cacheable. */
export interface GetConfigProjectsJobsDebugRequest {
  /** The project id. */
  projectId: string;
  /** The job id. */
  jobId: string;
  /** Request body */
  body?: GetDebugConfigRequest;
}

export const GetConfigProjectsJobsDebugRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(GetDebugConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/jobs/{jobId}/debug/getConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsJobsDebugRequest>;

export type GetConfigProjectsJobsDebugResponse = GetDebugConfigResponse;
export const GetConfigProjectsJobsDebugResponse = GetDebugConfigResponse;

export type GetConfigProjectsJobsDebugError = CommonErrors;

export const getConfigProjectsJobsDebug: API.OperationMethod<GetConfigProjectsJobsDebugRequest, GetConfigProjectsJobsDebugResponse, GetConfigProjectsJobsDebugError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsJobsDebugRequest,
  output: GetConfigProjectsJobsDebugResponse,
  errors: [],
}));

/** Send encoded debug capture data for component. */
export interface SendCaptureProjectsJobsDebugRequest {
  /** The project id. */
  projectId: string;
  /** The job id. */
  jobId: string;
  /** Request body */
  body?: SendDebugCaptureRequest;
}

export const SendCaptureProjectsJobsDebugRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(SendDebugCaptureRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/jobs/{jobId}/debug/sendCapture", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendCaptureProjectsJobsDebugRequest>;

export type SendCaptureProjectsJobsDebugResponse = SendDebugCaptureResponse;
export const SendCaptureProjectsJobsDebugResponse = SendDebugCaptureResponse;

export type SendCaptureProjectsJobsDebugError = CommonErrors;

export const sendCaptureProjectsJobsDebug: API.OperationMethod<SendCaptureProjectsJobsDebugRequest, SendCaptureProjectsJobsDebugResponse, SendCaptureProjectsJobsDebugError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendCaptureProjectsJobsDebugRequest,
  output: SendCaptureProjectsJobsDebugResponse,
  errors: [],
}));

/** Request the job status. To request the status of a job, we recommend using `projects.locations.jobs.messages.list` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.messages.list` is not recommended, as you can only request the status of jobs that are running in `us-central1`. */
export interface ListProjectsJobsMessagesRequest {
  /** A project id. */
  projectId: string;
  /** The job to get messages about. */
  jobId: string;
  /** Filter to only get messages with importance >= level */
  minimumImportance?: "JOB_MESSAGE_IMPORTANCE_UNKNOWN" | "JOB_MESSAGE_DEBUG" | "JOB_MESSAGE_DETAILED" | "JOB_MESSAGE_BASIC" | "JOB_MESSAGE_WARNING" | "JOB_MESSAGE_ERROR" | (string & {});
  /** If specified, determines the maximum number of messages to return. If unspecified, the service may choose an appropriate default, or may return an arbitrarily large number of results. */
  pageSize?: number;
  /** If supplied, this should be the value of next_page_token returned by an earlier call. This will cause the next page of results to be returned. */
  pageToken?: string;
  /** If specified, return only messages with timestamps >= start_time. The default is the job creation time (i.e. beginning of messages). */
  startTime?: string;
  /** Return only messages with timestamps < end_time. The default is now (i.e. return up to the latest messages available). */
  endTime?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location?: string;
}

export const ListProjectsJobsMessagesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  minimumImportance: Schema.optional(Schema.String).pipe(T.HttpQuery("minimumImportance")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/jobs/{jobId}/messages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsJobsMessagesRequest>;

export type ListProjectsJobsMessagesResponse = ListJobMessagesResponse;
export const ListProjectsJobsMessagesResponse = ListJobMessagesResponse;

export type ListProjectsJobsMessagesError = CommonErrors;

export const listProjectsJobsMessages = API.makePaginated(() => ({
  input: ListProjectsJobsMessagesRequest,
  output: ListProjectsJobsMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Reports the status of dataflow WorkItems leased by a worker. */
export interface ReportStatusProjectsJobsWorkItemsRequest {
  /** The project which owns the WorkItem's job. */
  projectId: string;
  /** The job which the WorkItem is part of. */
  jobId: string;
  /** Request body */
  body?: ReportWorkItemStatusRequest;
}

export const ReportStatusProjectsJobsWorkItemsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(ReportWorkItemStatusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/jobs/{jobId}/workItems:reportStatus", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportStatusProjectsJobsWorkItemsRequest>;

export type ReportStatusProjectsJobsWorkItemsResponse = ReportWorkItemStatusResponse;
export const ReportStatusProjectsJobsWorkItemsResponse = ReportWorkItemStatusResponse;

export type ReportStatusProjectsJobsWorkItemsError = CommonErrors;

export const reportStatusProjectsJobsWorkItems: API.OperationMethod<ReportStatusProjectsJobsWorkItemsRequest, ReportStatusProjectsJobsWorkItemsResponse, ReportStatusProjectsJobsWorkItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReportStatusProjectsJobsWorkItemsRequest,
  output: ReportStatusProjectsJobsWorkItemsResponse,
  errors: [],
}));

/** Leases a dataflow WorkItem to run. */
export interface LeaseProjectsJobsWorkItemsRequest {
  /** Identifies the project this worker belongs to. */
  projectId: string;
  /** Identifies the workflow job this worker belongs to. */
  jobId: string;
  /** Request body */
  body?: LeaseWorkItemRequest;
}

export const LeaseProjectsJobsWorkItemsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(LeaseWorkItemRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/jobs/{jobId}/workItems:lease", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LeaseProjectsJobsWorkItemsRequest>;

export type LeaseProjectsJobsWorkItemsResponse = LeaseWorkItemResponse;
export const LeaseProjectsJobsWorkItemsResponse = LeaseWorkItemResponse;

export type LeaseProjectsJobsWorkItemsError = CommonErrors;

export const leaseProjectsJobsWorkItems: API.OperationMethod<LeaseProjectsJobsWorkItemsRequest, LeaseProjectsJobsWorkItemsResponse, LeaseProjectsJobsWorkItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LeaseProjectsJobsWorkItemsRequest,
  output: LeaseProjectsJobsWorkItemsResponse,
  errors: [],
}));

/** Creates a Cloud Dataflow job from a template. Do not enter confidential information when you supply string values using the API. To create a job, we recommend using `projects.locations.templates.create` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.templates.create` is not recommended, because your job will always start in `us-central1`. */
export interface CreateProjectsTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Request body */
  body?: CreateJobFromTemplateRequest;
}

export const CreateProjectsTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(CreateJobFromTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/templates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTemplatesRequest>;

export type CreateProjectsTemplatesResponse = Job;
export const CreateProjectsTemplatesResponse = Job;

export type CreateProjectsTemplatesError = CommonErrors;

export const createProjectsTemplates: API.OperationMethod<CreateProjectsTemplatesRequest, CreateProjectsTemplatesResponse, CreateProjectsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTemplatesRequest,
  output: CreateProjectsTemplatesResponse,
  errors: [],
}));

/** Launches a template. To launch a template, we recommend using `projects.locations.templates.launch` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.templates.launch` is not recommended, because jobs launched from the template will always start in `us-central1`. */
export interface LaunchProjectsTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** If true, the request is validated but not actually executed. Defaults to false. */
  validateOnly?: boolean;
  /** A Cloud Storage path to the template to use to create the job. Must be valid Cloud Storage URL, beginning with `gs://`. */
  gcsPath?: string;
  /** Path to the dynamic template specification file on Cloud Storage. The file must be a JSON serialized `DynamicTemplateFileSpec` object. */
  "dynamicTemplate.gcsPath"?: string;
  /** Cloud Storage path for staging dependencies. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  "dynamicTemplate.stagingLocation"?: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location?: string;
  /** Request body */
  body?: LaunchTemplateParameters;
}

export const LaunchProjectsTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  gcsPath: Schema.optional(Schema.String).pipe(T.HttpQuery("gcsPath")),
  "dynamicTemplate.gcsPath": Schema.optional(Schema.String).pipe(T.HttpQuery("dynamicTemplate.gcsPath")),
  "dynamicTemplate.stagingLocation": Schema.optional(Schema.String).pipe(T.HttpQuery("dynamicTemplate.stagingLocation")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  body: Schema.optional(LaunchTemplateParameters).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/templates:launch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LaunchProjectsTemplatesRequest>;

export type LaunchProjectsTemplatesResponse = LaunchTemplateResponse;
export const LaunchProjectsTemplatesResponse = LaunchTemplateResponse;

export type LaunchProjectsTemplatesError = CommonErrors;

export const launchProjectsTemplates: API.OperationMethod<LaunchProjectsTemplatesRequest, LaunchProjectsTemplatesResponse, LaunchProjectsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LaunchProjectsTemplatesRequest,
  output: LaunchProjectsTemplatesResponse,
  errors: [],
}));

/** Get the template associated with a template. To get the template, we recommend using `projects.locations.templates.get` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.templates.get` is not recommended, because only templates that are running in `us-central1` are retrieved. */
export interface GetProjectsTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Required. A Cloud Storage path to the template from which to create the job. Must be valid Cloud Storage URL, beginning with 'gs://'. */
  gcsPath?: string;
  /** The view to retrieve. Defaults to METADATA_ONLY. */
  view?: "METADATA_ONLY" | (string & {});
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location?: string;
}

export const GetProjectsTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  gcsPath: Schema.optional(Schema.String).pipe(T.HttpQuery("gcsPath")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/templates:get" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTemplatesRequest>;

export type GetProjectsTemplatesResponse = GetTemplateResponse;
export const GetProjectsTemplatesResponse = GetTemplateResponse;

export type GetProjectsTemplatesError = CommonErrors;

export const getProjectsTemplates: API.OperationMethod<GetProjectsTemplatesRequest, GetProjectsTemplatesResponse, GetProjectsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTemplatesRequest,
  output: GetProjectsTemplatesResponse,
  errors: [],
}));

/** Send a worker_message to the service. */
export interface WorkerMessagesProjectsLocationsRequest {
  /** The project to send the WorkerMessages to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job. */
  location: string;
  /** Request body */
  body?: SendWorkerMessagesRequest;
}

export const WorkerMessagesProjectsLocationsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(SendWorkerMessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/WorkerMessages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WorkerMessagesProjectsLocationsRequest>;

export type WorkerMessagesProjectsLocationsResponse = SendWorkerMessagesResponse;
export const WorkerMessagesProjectsLocationsResponse = SendWorkerMessagesResponse;

export type WorkerMessagesProjectsLocationsError = CommonErrors;

export const workerMessagesProjectsLocations: API.OperationMethod<WorkerMessagesProjectsLocationsRequest, WorkerMessagesProjectsLocationsResponse, WorkerMessagesProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WorkerMessagesProjectsLocationsRequest,
  output: WorkerMessagesProjectsLocationsResponse,
  errors: [],
}));

/** Gets information about a snapshot. */
export interface GetProjectsLocationsSnapshotsRequest {
  /** The ID of the Cloud Platform project that the snapshot belongs to. */
  projectId: string;
  /** The location that contains this snapshot. */
  location: string;
  /** The ID of the snapshot. */
  snapshotId: string;
}

export const GetProjectsLocationsSnapshotsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  snapshotId: Schema.String.pipe(T.HttpPath("snapshotId")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/snapshots/{snapshotId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSnapshotsRequest>;

export type GetProjectsLocationsSnapshotsResponse = Snapshot;
export const GetProjectsLocationsSnapshotsResponse = Snapshot;

export type GetProjectsLocationsSnapshotsError = CommonErrors;

export const getProjectsLocationsSnapshots: API.OperationMethod<GetProjectsLocationsSnapshotsRequest, GetProjectsLocationsSnapshotsResponse, GetProjectsLocationsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSnapshotsRequest,
  output: GetProjectsLocationsSnapshotsResponse,
  errors: [],
}));

/** Deletes a snapshot. */
export interface DeleteProjectsLocationsSnapshotsRequest {
  /** The ID of the Cloud Platform project that the snapshot belongs to. */
  projectId: string;
  /** The location that contains this snapshot. */
  location: string;
  /** The ID of the snapshot. */
  snapshotId: string;
}

export const DeleteProjectsLocationsSnapshotsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  snapshotId: Schema.String.pipe(T.HttpPath("snapshotId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1b3/projects/{projectId}/locations/{location}/snapshots/{snapshotId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSnapshotsRequest>;

export type DeleteProjectsLocationsSnapshotsResponse = DeleteSnapshotResponse;
export const DeleteProjectsLocationsSnapshotsResponse = DeleteSnapshotResponse;

export type DeleteProjectsLocationsSnapshotsError = CommonErrors;

export const deleteProjectsLocationsSnapshots: API.OperationMethod<DeleteProjectsLocationsSnapshotsRequest, DeleteProjectsLocationsSnapshotsResponse, DeleteProjectsLocationsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSnapshotsRequest,
  output: DeleteProjectsLocationsSnapshotsResponse,
  errors: [],
}));

/** Lists snapshots. */
export interface ListProjectsLocationsSnapshotsRequest {
  /** The project ID to list snapshots for. */
  projectId: string;
  /** The location to list snapshots in. */
  location: string;
  /** If specified, list snapshots created from this job. */
  jobId?: string;
}

export const ListProjectsLocationsSnapshotsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.optional(Schema.String).pipe(T.HttpQuery("jobId")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSnapshotsRequest>;

export type ListProjectsLocationsSnapshotsResponse = ListSnapshotsResponse;
export const ListProjectsLocationsSnapshotsResponse = ListSnapshotsResponse;

export type ListProjectsLocationsSnapshotsError = CommonErrors;

export const listProjectsLocationsSnapshots: API.OperationMethod<ListProjectsLocationsSnapshotsRequest, ListProjectsLocationsSnapshotsResponse, ListProjectsLocationsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsSnapshotsRequest,
  output: ListProjectsLocationsSnapshotsResponse,
  errors: [],
}));

/** Creates a Dataflow job. To create a job, we recommend using `projects.locations.jobs.create` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.create` is not recommended, as your job will always start in `us-central1`. Do not enter confidential information when you supply string values using the API. */
export interface CreateProjectsLocationsJobsRequest {
  /** The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location: string;
  /** The level of information requested in response. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
  /** Deprecated. This field is now in the Job message. */
  replaceJobId?: string;
  /** Request body */
  body?: Job;
}

export const CreateProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  replaceJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("replaceJobId")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsJobsRequest>;

export type CreateProjectsLocationsJobsResponse = Job;
export const CreateProjectsLocationsJobsResponse = Job;

export type CreateProjectsLocationsJobsError = CommonErrors;

export const createProjectsLocationsJobs: API.OperationMethod<CreateProjectsLocationsJobsRequest, CreateProjectsLocationsJobsResponse, CreateProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsJobsRequest,
  output: CreateProjectsLocationsJobsResponse,
  errors: [],
}));

/** Gets the state of the specified Cloud Dataflow job. To get the state of a job, we recommend using `projects.locations.jobs.get` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.get` is not recommended, as you can only get the state of jobs that are running in `us-central1`. */
export interface GetProjectsLocationsJobsRequest {
  /** The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location: string;
  /** The job ID. */
  jobId: string;
  /** The level of information requested in response. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
}

export const GetProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsJobsRequest>;

export type GetProjectsLocationsJobsResponse = Job;
export const GetProjectsLocationsJobsResponse = Job;

export type GetProjectsLocationsJobsError = CommonErrors;

export const getProjectsLocationsJobs: API.OperationMethod<GetProjectsLocationsJobsRequest, GetProjectsLocationsJobsResponse, GetProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsJobsRequest,
  output: GetProjectsLocationsJobsResponse,
  errors: [],
}));

/** Updates the state of an existing Cloud Dataflow job. To update the state of an existing job, we recommend using `projects.locations.jobs.update` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.update` is not recommended, as you can only update the state of jobs that are running in `us-central1`. */
export interface UpdateProjectsLocationsJobsRequest {
  /** The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location: string;
  /** The job ID. */
  jobId: string;
  /** The list of fields to update relative to Job. If empty, only RequestedJobState will be considered for update. If the FieldMask is not empty and RequestedJobState is none/empty, The fields specified in the update mask will be the only ones considered for update. If both RequestedJobState and update_mask are specified, an error will be returned as we cannot update both state and mask. */
  updateMask?: string;
  /** Request body */
  body?: Job;
}

export const UpdateProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsJobsRequest>;

export type UpdateProjectsLocationsJobsResponse = Job;
export const UpdateProjectsLocationsJobsResponse = Job;

export type UpdateProjectsLocationsJobsError = CommonErrors;

export const updateProjectsLocationsJobs: API.OperationMethod<UpdateProjectsLocationsJobsRequest, UpdateProjectsLocationsJobsResponse, UpdateProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsJobsRequest,
  output: UpdateProjectsLocationsJobsResponse,
  errors: [],
}));

/** List the jobs of a project. To list the jobs of a project in a region, we recommend using `projects.locations.jobs.list` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). To list the all jobs across all regions, use `projects.jobs.aggregated`. Using `projects.jobs.list` is not recommended, because you can only get the list of jobs that are running in `us-central1`. `projects.locations.jobs.list` and `projects.jobs.list` support filtering the list of jobs by name. Filtering by name isn't supported by `projects.jobs.aggregated`. */
export interface ListProjectsLocationsJobsRequest {
  /** The project which owns the jobs. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job. */
  location: string;
  /** The kind of filter to use. */
  filter?: "UNKNOWN" | "ALL" | "TERMINATED" | "ACTIVE" | (string & {});
  /** Deprecated. ListJobs always returns summaries now. Use GetJob for other JobViews. */
  view?: "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION" | (string & {});
  /** If there are many jobs, limit response to at most this many. The actual number of jobs returned will be the lesser of max_responses and an unspecified server-defined limit. */
  pageSize?: number;
  /** Set this to the 'next_page_token' field of a previous response to request additional results in a long list. */
  pageToken?: string;
  /** Optional. The job name. */
  name?: string;
}

export const ListProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobsRequest>;

export type ListProjectsLocationsJobsResponse = ListJobsResponse;
export const ListProjectsLocationsJobsResponse = ListJobsResponse;

export type ListProjectsLocationsJobsError = CommonErrors;

export const listProjectsLocationsJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsJobsRequest,
  output: ListProjectsLocationsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Snapshot the state of a streaming job. */
export interface SnapshotProjectsLocationsJobsRequest {
  /** The project which owns the job to be snapshotted. */
  projectId: string;
  /** The location that contains this job. */
  location: string;
  /** The job to be snapshotted. */
  jobId: string;
  /** Request body */
  body?: SnapshotJobRequest;
}

export const SnapshotProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(SnapshotJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}:snapshot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SnapshotProjectsLocationsJobsRequest>;

export type SnapshotProjectsLocationsJobsResponse = Snapshot;
export const SnapshotProjectsLocationsJobsResponse = Snapshot;

export type SnapshotProjectsLocationsJobsError = CommonErrors;

export const snapshotProjectsLocationsJobs: API.OperationMethod<SnapshotProjectsLocationsJobsRequest, SnapshotProjectsLocationsJobsResponse, SnapshotProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SnapshotProjectsLocationsJobsRequest,
  output: SnapshotProjectsLocationsJobsResponse,
  errors: [],
}));

/** Request the job status. To request the status of a job, we recommend using `projects.locations.jobs.getMetrics` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.getMetrics` is not recommended, as you can only request the status of jobs that are running in `us-central1`. */
export interface GetMetricsProjectsLocationsJobsRequest {
  /** A project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job to get metrics for. */
  jobId: string;
  /** Return only metric data that has changed since this time. Default is to return all information about all metrics for the job. */
  startTime?: string;
}

export const GetMetricsProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/metrics" }),
  svc,
) as unknown as Schema.Schema<GetMetricsProjectsLocationsJobsRequest>;

export type GetMetricsProjectsLocationsJobsResponse = JobMetrics;
export const GetMetricsProjectsLocationsJobsResponse = JobMetrics;

export type GetMetricsProjectsLocationsJobsError = CommonErrors;

export const getMetricsProjectsLocationsJobs: API.OperationMethod<GetMetricsProjectsLocationsJobsRequest, GetMetricsProjectsLocationsJobsResponse, GetMetricsProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetricsProjectsLocationsJobsRequest,
  output: GetMetricsProjectsLocationsJobsResponse,
  errors: [],
}));

/** Request detailed information about the execution status of the job. EXPERIMENTAL. This API is subject to change or removal without notice. */
export interface GetExecutionDetailsProjectsLocationsJobsRequest {
  /** A project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job to get execution details for. */
  jobId: string;
  /** If specified, determines the maximum number of stages to return. If unspecified, the service may choose an appropriate default, or may return an arbitrarily large number of results. */
  pageSize?: number;
  /** If supplied, this should be the value of next_page_token returned by an earlier call. This will cause the next page of results to be returned. */
  pageToken?: string;
}

export const GetExecutionDetailsProjectsLocationsJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/executionDetails" }),
  svc,
) as unknown as Schema.Schema<GetExecutionDetailsProjectsLocationsJobsRequest>;

export type GetExecutionDetailsProjectsLocationsJobsResponse = JobExecutionDetails;
export const GetExecutionDetailsProjectsLocationsJobsResponse = JobExecutionDetails;

export type GetExecutionDetailsProjectsLocationsJobsError = CommonErrors;

export const getExecutionDetailsProjectsLocationsJobs = API.makePaginated(() => ({
  input: GetExecutionDetailsProjectsLocationsJobsRequest,
  output: GetExecutionDetailsProjectsLocationsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get encoded debug configuration for component. Not cacheable. */
export interface GetConfigProjectsLocationsJobsDebugRequest {
  /** The project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job id. */
  jobId: string;
  /** Request body */
  body?: GetDebugConfigRequest;
}

export const GetConfigProjectsLocationsJobsDebugRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(GetDebugConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/debug/getConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsLocationsJobsDebugRequest>;

export type GetConfigProjectsLocationsJobsDebugResponse = GetDebugConfigResponse;
export const GetConfigProjectsLocationsJobsDebugResponse = GetDebugConfigResponse;

export type GetConfigProjectsLocationsJobsDebugError = CommonErrors;

export const getConfigProjectsLocationsJobsDebug: API.OperationMethod<GetConfigProjectsLocationsJobsDebugRequest, GetConfigProjectsLocationsJobsDebugResponse, GetConfigProjectsLocationsJobsDebugError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsLocationsJobsDebugRequest,
  output: GetConfigProjectsLocationsJobsDebugResponse,
  errors: [],
}));

/** Send encoded debug capture data for component. */
export interface SendCaptureProjectsLocationsJobsDebugRequest {
  /** The project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job id. */
  jobId: string;
  /** Request body */
  body?: SendDebugCaptureRequest;
}

export const SendCaptureProjectsLocationsJobsDebugRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(SendDebugCaptureRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/debug/sendCapture", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendCaptureProjectsLocationsJobsDebugRequest>;

export type SendCaptureProjectsLocationsJobsDebugResponse = SendDebugCaptureResponse;
export const SendCaptureProjectsLocationsJobsDebugResponse = SendDebugCaptureResponse;

export type SendCaptureProjectsLocationsJobsDebugError = CommonErrors;

export const sendCaptureProjectsLocationsJobsDebug: API.OperationMethod<SendCaptureProjectsLocationsJobsDebugRequest, SendCaptureProjectsLocationsJobsDebugResponse, SendCaptureProjectsLocationsJobsDebugError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendCaptureProjectsLocationsJobsDebugRequest,
  output: SendCaptureProjectsLocationsJobsDebugResponse,
  errors: [],
}));

/** Get worker stacktraces from debug capture. */
export interface GetWorkerStacktracesProjectsLocationsJobsDebugRequest {
  /** The project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job for which to get stacktraces. */
  jobId: string;
  /** Request body */
  body?: GetWorkerStacktracesRequest;
}

export const GetWorkerStacktracesProjectsLocationsJobsDebugRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(GetWorkerStacktracesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/debug/getWorkerStacktraces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetWorkerStacktracesProjectsLocationsJobsDebugRequest>;

export type GetWorkerStacktracesProjectsLocationsJobsDebugResponse = GetWorkerStacktracesResponse;
export const GetWorkerStacktracesProjectsLocationsJobsDebugResponse = GetWorkerStacktracesResponse;

export type GetWorkerStacktracesProjectsLocationsJobsDebugError = CommonErrors;

export const getWorkerStacktracesProjectsLocationsJobsDebug: API.OperationMethod<GetWorkerStacktracesProjectsLocationsJobsDebugRequest, GetWorkerStacktracesProjectsLocationsJobsDebugResponse, GetWorkerStacktracesProjectsLocationsJobsDebugError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetWorkerStacktracesProjectsLocationsJobsDebugRequest,
  output: GetWorkerStacktracesProjectsLocationsJobsDebugResponse,
  errors: [],
}));

/** Lists snapshots. */
export interface ListProjectsLocationsJobsSnapshotsRequest {
  /** The project ID to list snapshots for. */
  projectId: string;
  /** The location to list snapshots in. */
  location: string;
  /** If specified, list snapshots created from this job. */
  jobId: string;
}

export const ListProjectsLocationsJobsSnapshotsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobsSnapshotsRequest>;

export type ListProjectsLocationsJobsSnapshotsResponse = ListSnapshotsResponse;
export const ListProjectsLocationsJobsSnapshotsResponse = ListSnapshotsResponse;

export type ListProjectsLocationsJobsSnapshotsError = CommonErrors;

export const listProjectsLocationsJobsSnapshots: API.OperationMethod<ListProjectsLocationsJobsSnapshotsRequest, ListProjectsLocationsJobsSnapshotsResponse, ListProjectsLocationsJobsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsJobsSnapshotsRequest,
  output: ListProjectsLocationsJobsSnapshotsResponse,
  errors: [],
}));

/** Request the job status. To request the status of a job, we recommend using `projects.locations.jobs.messages.list` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.jobs.messages.list` is not recommended, as you can only request the status of jobs that are running in `us-central1`. */
export interface ListProjectsLocationsJobsMessagesRequest {
  /** A project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job to get messages about. */
  jobId: string;
  /** Filter to only get messages with importance >= level */
  minimumImportance?: "JOB_MESSAGE_IMPORTANCE_UNKNOWN" | "JOB_MESSAGE_DEBUG" | "JOB_MESSAGE_DETAILED" | "JOB_MESSAGE_BASIC" | "JOB_MESSAGE_WARNING" | "JOB_MESSAGE_ERROR" | (string & {});
  /** If specified, determines the maximum number of messages to return. If unspecified, the service may choose an appropriate default, or may return an arbitrarily large number of results. */
  pageSize?: number;
  /** If supplied, this should be the value of next_page_token returned by an earlier call. This will cause the next page of results to be returned. */
  pageToken?: string;
  /** If specified, return only messages with timestamps >= start_time. The default is the job creation time (i.e. beginning of messages). */
  startTime?: string;
  /** Return only messages with timestamps < end_time. The default is now (i.e. return up to the latest messages available). */
  endTime?: string;
}

export const ListProjectsLocationsJobsMessagesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  minimumImportance: Schema.optional(Schema.String).pipe(T.HttpQuery("minimumImportance")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/messages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobsMessagesRequest>;

export type ListProjectsLocationsJobsMessagesResponse = ListJobMessagesResponse;
export const ListProjectsLocationsJobsMessagesResponse = ListJobMessagesResponse;

export type ListProjectsLocationsJobsMessagesError = CommonErrors;

export const listProjectsLocationsJobsMessages = API.makePaginated(() => ({
  input: ListProjectsLocationsJobsMessagesRequest,
  output: ListProjectsLocationsJobsMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Request detailed information about the execution status of a stage of the job. EXPERIMENTAL. This API is subject to change or removal without notice. */
export interface GetExecutionDetailsProjectsLocationsJobsStagesRequest {
  /** A project id. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id. */
  location: string;
  /** The job to get execution details for. */
  jobId: string;
  /** The stage for which to fetch information. */
  stageId: string;
  /** If specified, determines the maximum number of work items to return. If unspecified, the service may choose an appropriate default, or may return an arbitrarily large number of results. */
  pageSize?: number;
  /** If supplied, this should be the value of next_page_token returned by an earlier call. This will cause the next page of results to be returned. */
  pageToken?: string;
  /** Lower time bound of work items to include, by start time. */
  startTime?: string;
  /** Upper time bound of work items to include, by start time. */
  endTime?: string;
}

export const GetExecutionDetailsProjectsLocationsJobsStagesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  stageId: Schema.String.pipe(T.HttpPath("stageId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/stages/{stageId}/executionDetails" }),
  svc,
) as unknown as Schema.Schema<GetExecutionDetailsProjectsLocationsJobsStagesRequest>;

export type GetExecutionDetailsProjectsLocationsJobsStagesResponse = StageExecutionDetails;
export const GetExecutionDetailsProjectsLocationsJobsStagesResponse = StageExecutionDetails;

export type GetExecutionDetailsProjectsLocationsJobsStagesError = CommonErrors;

export const getExecutionDetailsProjectsLocationsJobsStages = API.makePaginated(() => ({
  input: GetExecutionDetailsProjectsLocationsJobsStagesRequest,
  output: GetExecutionDetailsProjectsLocationsJobsStagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Reports the status of dataflow WorkItems leased by a worker. */
export interface ReportStatusProjectsLocationsJobsWorkItemsRequest {
  /** The project which owns the WorkItem's job. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the WorkItem's job. */
  location: string;
  /** The job which the WorkItem is part of. */
  jobId: string;
  /** Request body */
  body?: ReportWorkItemStatusRequest;
}

export const ReportStatusProjectsLocationsJobsWorkItemsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(ReportWorkItemStatusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/workItems:reportStatus", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportStatusProjectsLocationsJobsWorkItemsRequest>;

export type ReportStatusProjectsLocationsJobsWorkItemsResponse = ReportWorkItemStatusResponse;
export const ReportStatusProjectsLocationsJobsWorkItemsResponse = ReportWorkItemStatusResponse;

export type ReportStatusProjectsLocationsJobsWorkItemsError = CommonErrors;

export const reportStatusProjectsLocationsJobsWorkItems: API.OperationMethod<ReportStatusProjectsLocationsJobsWorkItemsRequest, ReportStatusProjectsLocationsJobsWorkItemsResponse, ReportStatusProjectsLocationsJobsWorkItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReportStatusProjectsLocationsJobsWorkItemsRequest,
  output: ReportStatusProjectsLocationsJobsWorkItemsResponse,
  errors: [],
}));

/** Leases a dataflow WorkItem to run. */
export interface LeaseProjectsLocationsJobsWorkItemsRequest {
  /** Identifies the project this worker belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the WorkItem's job. */
  location: string;
  /** Identifies the workflow job this worker belongs to. */
  jobId: string;
  /** Request body */
  body?: LeaseWorkItemRequest;
}

export const LeaseProjectsLocationsJobsWorkItemsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  body: Schema.optional(LeaseWorkItemRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/workItems:lease", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LeaseProjectsLocationsJobsWorkItemsRequest>;

export type LeaseProjectsLocationsJobsWorkItemsResponse = LeaseWorkItemResponse;
export const LeaseProjectsLocationsJobsWorkItemsResponse = LeaseWorkItemResponse;

export type LeaseProjectsLocationsJobsWorkItemsError = CommonErrors;

export const leaseProjectsLocationsJobsWorkItems: API.OperationMethod<LeaseProjectsLocationsJobsWorkItemsRequest, LeaseProjectsLocationsJobsWorkItemsResponse, LeaseProjectsLocationsJobsWorkItemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LeaseProjectsLocationsJobsWorkItemsRequest,
  output: LeaseProjectsLocationsJobsWorkItemsResponse,
  errors: [],
}));

/** Creates a Cloud Dataflow job from a template. Do not enter confidential information when you supply string values using the API. To create a job, we recommend using `projects.locations.templates.create` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.templates.create` is not recommended, because your job will always start in `us-central1`. */
export interface CreateProjectsLocationsTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location: string;
  /** Request body */
  body?: CreateJobFromTemplateRequest;
}

export const CreateProjectsLocationsTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(CreateJobFromTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/templates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTemplatesRequest>;

export type CreateProjectsLocationsTemplatesResponse = Job;
export const CreateProjectsLocationsTemplatesResponse = Job;

export type CreateProjectsLocationsTemplatesError = CommonErrors;

export const createProjectsLocationsTemplates: API.OperationMethod<CreateProjectsLocationsTemplatesRequest, CreateProjectsLocationsTemplatesResponse, CreateProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTemplatesRequest,
  output: CreateProjectsLocationsTemplatesResponse,
  errors: [],
}));

/** Launches a template. To launch a template, we recommend using `projects.locations.templates.launch` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.templates.launch` is not recommended, because jobs launched from the template will always start in `us-central1`. */
export interface LaunchProjectsLocationsTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location: string;
  /** If true, the request is validated but not actually executed. Defaults to false. */
  validateOnly?: boolean;
  /** A Cloud Storage path to the template to use to create the job. Must be valid Cloud Storage URL, beginning with `gs://`. */
  gcsPath?: string;
  /** Path to the dynamic template specification file on Cloud Storage. The file must be a JSON serialized `DynamicTemplateFileSpec` object. */
  "dynamicTemplate.gcsPath"?: string;
  /** Cloud Storage path for staging dependencies. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  "dynamicTemplate.stagingLocation"?: string;
  /** Request body */
  body?: LaunchTemplateParameters;
}

export const LaunchProjectsLocationsTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  gcsPath: Schema.optional(Schema.String).pipe(T.HttpQuery("gcsPath")),
  "dynamicTemplate.gcsPath": Schema.optional(Schema.String).pipe(T.HttpQuery("dynamicTemplate.gcsPath")),
  "dynamicTemplate.stagingLocation": Schema.optional(Schema.String).pipe(T.HttpQuery("dynamicTemplate.stagingLocation")),
  body: Schema.optional(LaunchTemplateParameters).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/templates:launch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LaunchProjectsLocationsTemplatesRequest>;

export type LaunchProjectsLocationsTemplatesResponse = LaunchTemplateResponse;
export const LaunchProjectsLocationsTemplatesResponse = LaunchTemplateResponse;

export type LaunchProjectsLocationsTemplatesError = CommonErrors;

export const launchProjectsLocationsTemplates: API.OperationMethod<LaunchProjectsLocationsTemplatesRequest, LaunchProjectsLocationsTemplatesResponse, LaunchProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LaunchProjectsLocationsTemplatesRequest,
  output: LaunchProjectsLocationsTemplatesResponse,
  errors: [],
}));

/** Get the template associated with a template. To get the template, we recommend using `projects.locations.templates.get` with a [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using `projects.templates.get` is not recommended, because only templates that are running in `us-central1` are retrieved. */
export interface GetProjectsLocationsTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location: string;
  /** Required. A Cloud Storage path to the template from which to create the job. Must be valid Cloud Storage URL, beginning with 'gs://'. */
  gcsPath?: string;
  /** The view to retrieve. Defaults to METADATA_ONLY. */
  view?: "METADATA_ONLY" | (string & {});
}

export const GetProjectsLocationsTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  gcsPath: Schema.optional(Schema.String).pipe(T.HttpQuery("gcsPath")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1b3/projects/{projectId}/locations/{location}/templates:get" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTemplatesRequest>;

export type GetProjectsLocationsTemplatesResponse = GetTemplateResponse;
export const GetProjectsLocationsTemplatesResponse = GetTemplateResponse;

export type GetProjectsLocationsTemplatesError = CommonErrors;

export const getProjectsLocationsTemplates: API.OperationMethod<GetProjectsLocationsTemplatesRequest, GetProjectsLocationsTemplatesResponse, GetProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTemplatesRequest,
  output: GetProjectsLocationsTemplatesResponse,
  errors: [],
}));

/** Launch a job with a FlexTemplate. */
export interface LaunchProjectsLocationsFlexTemplatesRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId: string;
  /** Required. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. E.g., us-central1, us-west1. */
  location: string;
  /** Request body */
  body?: LaunchFlexTemplateRequest;
}

export const LaunchProjectsLocationsFlexTemplatesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(LaunchFlexTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1b3/projects/{projectId}/locations/{location}/flexTemplates:launch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LaunchProjectsLocationsFlexTemplatesRequest>;

export type LaunchProjectsLocationsFlexTemplatesResponse = LaunchFlexTemplateResponse;
export const LaunchProjectsLocationsFlexTemplatesResponse = LaunchFlexTemplateResponse;

export type LaunchProjectsLocationsFlexTemplatesError = CommonErrors;

export const launchProjectsLocationsFlexTemplates: API.OperationMethod<LaunchProjectsLocationsFlexTemplatesRequest, LaunchProjectsLocationsFlexTemplatesResponse, LaunchProjectsLocationsFlexTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LaunchProjectsLocationsFlexTemplatesRequest,
  output: LaunchProjectsLocationsFlexTemplatesResponse,
  errors: [],
}));

