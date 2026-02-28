// ==========================================================================
// Data pipelines API (datapipelines v1)
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
  name: "datapipelines",
  version: "v1",
  rootUrl: "https://datapipelines.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudDatapipelinesV1RuntimeEnvironment {
  /** The initial number of Compute Engine instances for the job. */
  numWorkers?: number;
  /** The maximum number of Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000. */
  maxWorkers?: number;
  /** The Compute Engine [availability zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones) for launching worker instances to run your pipeline. In the future, worker_zone will take precedence. */
  zone?: string;
  /** The email address of the service account to run the job as. */
  serviceAccountEmail?: string;
  /** The Cloud Storage path to use for temporary files. Must be a valid Cloud Storage URL, beginning with `gs://`. */
  tempLocation?: string;
  /** Whether to bypass the safety checks for the job's temporary directory. Use with caution. */
  bypassTempDirValidation?: boolean;
  /** The machine type to use for the job. Defaults to the value from the template if not specified. */
  machineType?: string;
  /** Additional experiment flags for the job. */
  additionalExperiments?: Array<string>;
  /** Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default". */
  network?: string;
  /** Subnetwork to which VMs will be assigned, if desired. You can specify a subnetwork using either a complete URL or an abbreviated path. Expected to be of the form "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK" or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in a Shared VPC network, you must use the complete URL. */
  subnetwork?: string;
  /** Additional user labels to be specified for the job. Keys and values should follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions) page. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1kg", "count": "3" }. */
  additionalUserLabels?: Record<string, string>;
  /** Name for the Cloud KMS key for the job. The key format is: projects//locations//keyRings//cryptoKeys/ */
  kmsKeyName?: string;
  /** Configuration for VM IPs. */
  ipConfiguration?: "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE" | (string & {});
  /** The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane's region. */
  workerRegion?: string;
  /** The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane's region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence. */
  workerZone?: string;
  /** Whether to enable Streaming Engine for the job. */
  enableStreamingEngine?: boolean;
}

export const GoogleCloudDatapipelinesV1RuntimeEnvironment: Schema.Schema<GoogleCloudDatapipelinesV1RuntimeEnvironment> = Schema.suspend(() => Schema.Struct({
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
})).annotate({ identifier: "GoogleCloudDatapipelinesV1RuntimeEnvironment" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1RuntimeEnvironment>;

export interface GoogleCloudDatapipelinesV1LaunchTemplateParameters {
  /** Required. The job name to use for the created job. */
  jobName?: string;
  /** The runtime parameters to pass to the job. */
  parameters?: Record<string, string>;
  /** The runtime environment for the job. */
  environment?: GoogleCloudDatapipelinesV1RuntimeEnvironment;
  /** If set, replace the existing pipeline with the name specified by jobName with this pipeline, preserving state. */
  update?: boolean;
  /** Map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job. Only applicable when updating a pipeline. */
  transformNameMapping?: Record<string, string>;
}

export const GoogleCloudDatapipelinesV1LaunchTemplateParameters: Schema.Schema<GoogleCloudDatapipelinesV1LaunchTemplateParameters> = Schema.suspend(() => Schema.Struct({
  jobName: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  environment: Schema.optional(GoogleCloudDatapipelinesV1RuntimeEnvironment),
  update: Schema.optional(Schema.Boolean),
  transformNameMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1LaunchTemplateParameters" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1LaunchTemplateParameters>;

export interface GoogleCloudDatapipelinesV1LaunchTemplateRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId?: string;
  /** If true, the request is validated but not actually executed. Defaults to false. */
  validateOnly?: boolean;
  /** A Cloud Storage path to the template from which to create the job. Must be a valid Cloud Storage URL, beginning with 'gs://'. */
  gcsPath?: string;
  /** The parameters of the template to launch. This should be part of the body of the POST request. */
  launchParameters?: GoogleCloudDatapipelinesV1LaunchTemplateParameters;
  /** The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. */
  location?: string;
}

export const GoogleCloudDatapipelinesV1LaunchTemplateRequest: Schema.Schema<GoogleCloudDatapipelinesV1LaunchTemplateRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  validateOnly: Schema.optional(Schema.Boolean),
  gcsPath: Schema.optional(Schema.String),
  launchParameters: Schema.optional(GoogleCloudDatapipelinesV1LaunchTemplateParameters),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1LaunchTemplateRequest" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1LaunchTemplateRequest>;

export interface GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment {
  /** The initial number of Compute Engine instances for the job. */
  numWorkers?: number;
  /** The maximum number of Compute Engine instances to be made available to your pipeline during execution, from 1 to 1000. */
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
  /** Additional user labels to be specified for the job. Keys and values must follow the restrictions specified in the [labeling restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions). An object containing a list of key/value pairs. Example: `{ "name": "wrench", "mass": "1kg", "count": "3" }`. */
  additionalUserLabels?: Record<string, string>;
  /** Name for the Cloud KMS key for the job. Key format is: projects//locations//keyRings//cryptoKeys/ */
  kmsKeyName?: string;
  /** Configuration for VM IPs. */
  ipConfiguration?: "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE" | (string & {});
  /** The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, defaults to the control plane region. */
  workerRegion?: string;
  /** The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane region is chosen based on available capacity. If both `worker_zone` and `zone` are set, `worker_zone` takes precedence. */
  workerZone?: string;
  /** Whether to enable Streaming Engine for the job. */
  enableStreamingEngine?: boolean;
  /** Set FlexRS goal for the job. https://cloud.google.com/dataflow/docs/guides/flexrs */
  flexrsGoal?: "FLEXRS_UNSPECIFIED" | "FLEXRS_SPEED_OPTIMIZED" | "FLEXRS_COST_OPTIMIZED" | (string & {});
}

export const GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment: Schema.Schema<GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment> = Schema.suspend(() => Schema.Struct({
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
})).annotate({ identifier: "GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment>;

export interface GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter {
  /** Required. The job name to use for the created job. For an update job request, the job name should be the same as the existing running job. */
  jobName?: string;
  /** Cloud Storage path to a file with a JSON-serialized ContainerSpec as content. */
  containerSpecGcsPath?: string;
  /** The parameters for the Flex Template. Example: `{"num_workers":"5"}` */
  parameters?: Record<string, string>;
  /** Launch options for this Flex Template job. This is a common set of options across languages and templates. This should not be used to pass job parameters. */
  launchOptions?: Record<string, string>;
  /** The runtime environment for the Flex Template job. */
  environment?: GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment;
  /** Set this to true if you are sending a request to update a running streaming job. When set, the job name should be the same as the running job. */
  update?: boolean;
  /** Use this to pass transform name mappings for streaming update jobs. Example: `{"oldTransformName":"newTransformName",...}` */
  transformNameMappings?: Record<string, string>;
}

export const GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter: Schema.Schema<GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter> = Schema.suspend(() => Schema.Struct({
  jobName: Schema.optional(Schema.String),
  containerSpecGcsPath: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  launchOptions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  environment: Schema.optional(GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment),
  update: Schema.optional(Schema.Boolean),
  transformNameMappings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter>;

export interface GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest {
  /** Required. The ID of the Cloud Platform project that the job belongs to. */
  projectId?: string;
  /** Required. Parameter to launch a job from a Flex Template. */
  launchParameter?: GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter;
  /** Required. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. For example, `us-central1`, `us-west1`. */
  location?: string;
  /** If true, the request is validated but not actually executed. Defaults to false. */
  validateOnly?: boolean;
}

export const GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest: Schema.Schema<GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  launchParameter: Schema.optional(GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter),
  location: Schema.optional(Schema.String),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest>;

export interface GoogleCloudDatapipelinesV1Workload {
  /** Template information and additional parameters needed to launch a Dataflow job using the standard launch API. */
  dataflowLaunchTemplateRequest?: GoogleCloudDatapipelinesV1LaunchTemplateRequest;
  /** Template information and additional parameters needed to launch a Dataflow job using the flex launch API. */
  dataflowFlexTemplateRequest?: GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest;
}

export const GoogleCloudDatapipelinesV1Workload: Schema.Schema<GoogleCloudDatapipelinesV1Workload> = Schema.suspend(() => Schema.Struct({
  dataflowLaunchTemplateRequest: Schema.optional(GoogleCloudDatapipelinesV1LaunchTemplateRequest),
  dataflowFlexTemplateRequest: Schema.optional(GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1Workload" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1Workload>;

export interface GoogleCloudDatapipelinesV1ScheduleSpec {
  /** Unix-cron format of the schedule. This information is retrieved from the linked Cloud Scheduler. */
  schedule?: string;
  /** Timezone ID. This matches the timezone IDs used by the Cloud Scheduler API. If empty, UTC time is assumed. */
  timeZone?: string;
  /** Output only. When the next Scheduler job is going to run. */
  nextJobTime?: string;
}

export const GoogleCloudDatapipelinesV1ScheduleSpec: Schema.Schema<GoogleCloudDatapipelinesV1ScheduleSpec> = Schema.suspend(() => Schema.Struct({
  schedule: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  nextJobTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1ScheduleSpec" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1ScheduleSpec>;

export interface GoogleCloudDatapipelinesV1Pipeline {
  /** The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), and periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects). * `LOCATION_ID` is the canonical ID for the pipeline's location. The list of available locations can be obtained by calling `google.cloud.location.Locations.ListLocations`. Note that the Data Pipelines service is not available in all regions. It depends on Cloud Scheduler, an App Engine application, so it's only available in [App Engine regions](https://cloud.google.com/about/locations#region). * `PIPELINE_ID` is the ID of the pipeline. Must be unique for the selected project and location. */
  name?: string;
  /** Required. The display name of the pipeline. It can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), and underscores (_). */
  displayName?: string;
  /** Required. The type of the pipeline. This field affects the scheduling of the pipeline and the type of metrics to show for the pipeline. */
  type?: "PIPELINE_TYPE_UNSPECIFIED" | "PIPELINE_TYPE_BATCH" | "PIPELINE_TYPE_STREAMING" | (string & {});
  /** Required. The state of the pipeline. When the pipeline is created, the state is set to 'PIPELINE_STATE_ACTIVE' by default. State changes can be requested by setting the state to stopping, paused, or resuming. State cannot be changed through UpdatePipeline requests. */
  state?: "STATE_UNSPECIFIED" | "STATE_RESUMING" | "STATE_ACTIVE" | "STATE_STOPPING" | "STATE_ARCHIVED" | "STATE_PAUSED" | (string & {});
  /** Output only. Immutable. The timestamp when the pipeline was initially created. Set by the Data Pipelines service. */
  createTime?: string;
  /** Output only. Immutable. The timestamp when the pipeline was last modified. Set by the Data Pipelines service. */
  lastUpdateTime?: string;
  /** Workload information for creating new jobs. */
  workload?: GoogleCloudDatapipelinesV1Workload;
  /** Internal scheduling information for a pipeline. If this information is provided, periodic jobs will be created per the schedule. If not, users are responsible for creating jobs externally. */
  scheduleInfo?: GoogleCloudDatapipelinesV1ScheduleSpec;
  /** Output only. Number of jobs. */
  jobCount?: number;
  /** Optional. A service account email to be used with the Cloud Scheduler job. If not specified, the default compute engine service account will be used. */
  schedulerServiceAccountEmail?: string;
  /** Immutable. The sources of the pipeline (for example, Dataplex). The keys and values are set by the corresponding sources during pipeline creation. */
  pipelineSources?: Record<string, string>;
}

export const GoogleCloudDatapipelinesV1Pipeline: Schema.Schema<GoogleCloudDatapipelinesV1Pipeline> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  workload: Schema.optional(GoogleCloudDatapipelinesV1Workload),
  scheduleInfo: Schema.optional(GoogleCloudDatapipelinesV1ScheduleSpec),
  jobCount: Schema.optional(Schema.Number),
  schedulerServiceAccountEmail: Schema.optional(Schema.String),
  pipelineSources: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1Pipeline" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1Pipeline>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudDatapipelinesV1ListPipelinesResponse {
  /** Results that matched the filter criteria and were accessible to the caller. Results are always in descending order of pipeline creation date. */
  pipelines?: Array<GoogleCloudDatapipelinesV1Pipeline>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDatapipelinesV1ListPipelinesResponse: Schema.Schema<GoogleCloudDatapipelinesV1ListPipelinesResponse> = Schema.suspend(() => Schema.Struct({
  pipelines: Schema.optional(Schema.Array(GoogleCloudDatapipelinesV1Pipeline)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1ListPipelinesResponse" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1ListPipelinesResponse>;

export interface GoogleCloudDatapipelinesV1StopPipelineRequest {
}

export const GoogleCloudDatapipelinesV1StopPipelineRequest: Schema.Schema<GoogleCloudDatapipelinesV1StopPipelineRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDatapipelinesV1StopPipelineRequest" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1StopPipelineRequest>;

export interface GoogleCloudDatapipelinesV1RunPipelineRequest {
}

export const GoogleCloudDatapipelinesV1RunPipelineRequest: Schema.Schema<GoogleCloudDatapipelinesV1RunPipelineRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDatapipelinesV1RunPipelineRequest" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1RunPipelineRequest>;

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

export interface GoogleCloudDatapipelinesV1SdkVersion {
  /** The version of the SDK used to run the job. */
  version?: string;
  /** A readable string describing the version of the SDK. */
  versionDisplayName?: string;
  /** The support status for this SDK version. */
  sdkSupportStatus?: "UNKNOWN" | "SUPPORTED" | "STALE" | "DEPRECATED" | "UNSUPPORTED" | (string & {});
}

export const GoogleCloudDatapipelinesV1SdkVersion: Schema.Schema<GoogleCloudDatapipelinesV1SdkVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  versionDisplayName: Schema.optional(Schema.String),
  sdkSupportStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1SdkVersion" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1SdkVersion>;

export interface GoogleCloudDatapipelinesV1DataflowJobDetails {
  /** Output only. The SDK version used to run the job. */
  sdkVersion?: GoogleCloudDatapipelinesV1SdkVersion;
  /** Output only. The current number of workers used to run the jobs. Only set to a value if the job is still running. */
  currentWorkers?: number;
  /** Cached version of all the metrics of interest for the job. This value gets stored here when the job is terminated. As long as the job is running, this field is populated from the Dataflow API. */
  resourceInfo?: Record<string, number>;
}

export const GoogleCloudDatapipelinesV1DataflowJobDetails: Schema.Schema<GoogleCloudDatapipelinesV1DataflowJobDetails> = Schema.suspend(() => Schema.Struct({
  sdkVersion: Schema.optional(GoogleCloudDatapipelinesV1SdkVersion),
  currentWorkers: Schema.optional(Schema.Number),
  resourceInfo: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1DataflowJobDetails" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1DataflowJobDetails>;

export interface GoogleCloudDatapipelinesV1Job {
  /** Required. The fully qualified resource name for the job. */
  name?: string;
  /** Output only. The internal ID for the job. */
  id?: string;
  /** Output only. The time of job creation. */
  createTime?: string;
  /** Output only. The time of job termination. This is absent if the job is still running. */
  endTime?: string;
  /** The current state of the job. */
  state?: "STATE_UNSPECIFIED" | "STATE_PENDING" | "STATE_RUNNING" | "STATE_DONE" | "STATE_FAILED" | "STATE_CANCELLED" | (string & {});
  /** Status capturing any error code or message related to job creation or execution. */
  status?: GoogleRpcStatus;
  /** All the details that are specific to a Dataflow job. */
  dataflowJobDetails?: GoogleCloudDatapipelinesV1DataflowJobDetails;
}

export const GoogleCloudDatapipelinesV1Job: Schema.Schema<GoogleCloudDatapipelinesV1Job> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  dataflowJobDetails: Schema.optional(GoogleCloudDatapipelinesV1DataflowJobDetails),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1Job" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1Job>;

export interface GoogleCloudDatapipelinesV1RunPipelineResponse {
  /** Job that was created as part of RunPipeline operation. */
  job?: GoogleCloudDatapipelinesV1Job;
}

export const GoogleCloudDatapipelinesV1RunPipelineResponse: Schema.Schema<GoogleCloudDatapipelinesV1RunPipelineResponse> = Schema.suspend(() => Schema.Struct({
  job: Schema.optional(GoogleCloudDatapipelinesV1Job),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1RunPipelineResponse" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1RunPipelineResponse>;

export interface GoogleCloudDatapipelinesV1ListJobsResponse {
  /** Results that were accessible to the caller. Results are always in descending order of job creation date. */
  jobs?: Array<GoogleCloudDatapipelinesV1Job>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDatapipelinesV1ListJobsResponse: Schema.Schema<GoogleCloudDatapipelinesV1ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(GoogleCloudDatapipelinesV1Job)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDatapipelinesV1ListJobsResponse" }) as any as Schema.Schema<GoogleCloudDatapipelinesV1ListJobsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a pipeline. For a batch pipeline, you can pass scheduler information. Data Pipelines uses the scheduler information to create an internal scheduler that runs jobs periodically. If the internal scheduler is not configured, you can use RunPipeline to run jobs. */
export interface CreateProjectsLocationsPipelinesRequest {
  /** Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatapipelinesV1Pipeline;
}

export const CreateProjectsLocationsPipelinesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDatapipelinesV1Pipeline).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPipelinesRequest>;

export type CreateProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;
export const CreateProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;

export type CreateProjectsLocationsPipelinesError = CommonErrors;

export const createProjectsLocationsPipelines: API.OperationMethod<CreateProjectsLocationsPipelinesRequest, CreateProjectsLocationsPipelinesResponse, CreateProjectsLocationsPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPipelinesRequest,
  output: CreateProjectsLocationsPipelinesResponse,
  errors: [],
}));

/** Updates a pipeline. If successful, the updated Pipeline is returned. Returns `NOT_FOUND` if the pipeline doesn't exist. If UpdatePipeline does not return successfully, you can retry the UpdatePipeline request until you receive a successful response. */
export interface PatchProjectsLocationsPipelinesRequest {
  /** The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), and periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects). * `LOCATION_ID` is the canonical ID for the pipeline's location. The list of available locations can be obtained by calling `google.cloud.location.Locations.ListLocations`. Note that the Data Pipelines service is not available in all regions. It depends on Cloud Scheduler, an App Engine application, so it's only available in [App Engine regions](https://cloud.google.com/about/locations#region). * `PIPELINE_ID` is the ID of the pipeline. Must be unique for the selected project and location. */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDatapipelinesV1Pipeline;
}

export const PatchProjectsLocationsPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDatapipelinesV1Pipeline).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines/{pipelinesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPipelinesRequest>;

export type PatchProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;
export const PatchProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;

export type PatchProjectsLocationsPipelinesError = CommonErrors;

export const patchProjectsLocationsPipelines: API.OperationMethod<PatchProjectsLocationsPipelinesRequest, PatchProjectsLocationsPipelinesResponse, PatchProjectsLocationsPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPipelinesRequest,
  output: PatchProjectsLocationsPipelinesResponse,
  errors: [],
}));

/** Deletes a pipeline. If a scheduler job is attached to the pipeline, it will be deleted. */
export interface DeleteProjectsLocationsPipelinesRequest {
  /** Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. */
  name: string;
}

export const DeleteProjectsLocationsPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines/{pipelinesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPipelinesRequest>;

export type DeleteProjectsLocationsPipelinesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsPipelinesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsPipelinesError = CommonErrors;

export const deleteProjectsLocationsPipelines: API.OperationMethod<DeleteProjectsLocationsPipelinesRequest, DeleteProjectsLocationsPipelinesResponse, DeleteProjectsLocationsPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPipelinesRequest,
  output: DeleteProjectsLocationsPipelinesResponse,
  errors: [],
}));

/** Lists pipelines. Returns a "FORBIDDEN" error if the caller doesn't have permission to access it. */
export interface ListProjectsLocationsPipelinesRequest {
  /** Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`. */
  parent: string;
  /** An expression for filtering the results of the request. If unspecified, all pipelines will be returned. Multiple filters can be applied and must be comma separated. Fields eligible for filtering are: + `type`: The type of the pipeline (streaming or batch). Allowed values are `ALL`, `BATCH`, and `STREAMING`. + `status`: The activity status of the pipeline. Allowed values are `ALL`, `ACTIVE`, `ARCHIVED`, and `PAUSED`. For example, to limit results to active batch processing pipelines: type:BATCH,status:ACTIVE */
  filter?: string;
  /** The maximum number of entities to return. The service may return fewer than this value, even if there are additional pages. If unspecified, the max limit is yet to be determined by the backend implementation. */
  pageSize?: number;
  /** A page token, received from a previous `ListPipelines` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPipelines` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPipelinesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPipelinesRequest>;

export type ListProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1ListPipelinesResponse;
export const ListProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1ListPipelinesResponse;

export type ListProjectsLocationsPipelinesError = CommonErrors;

export const listProjectsLocationsPipelines = API.makePaginated(() => ({
  input: ListProjectsLocationsPipelinesRequest,
  output: ListProjectsLocationsPipelinesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Looks up a single pipeline. Returns a "NOT_FOUND" error if no such pipeline exists. Returns a "FORBIDDEN" error if the caller doesn't have permission to access it. */
export interface GetProjectsLocationsPipelinesRequest {
  /** Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. */
  name: string;
}

export const GetProjectsLocationsPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines/{pipelinesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPipelinesRequest>;

export type GetProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;
export const GetProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;

export type GetProjectsLocationsPipelinesError = CommonErrors;

export const getProjectsLocationsPipelines: API.OperationMethod<GetProjectsLocationsPipelinesRequest, GetProjectsLocationsPipelinesResponse, GetProjectsLocationsPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPipelinesRequest,
  output: GetProjectsLocationsPipelinesResponse,
  errors: [],
}));

/** Freezes pipeline execution permanently. If there's a corresponding scheduler entry, it's deleted, and the pipeline state is changed to "ARCHIVED". However, pipeline metadata is retained. */
export interface StopProjectsLocationsPipelinesRequest {
  /** Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. */
  name: string;
  /** Request body */
  body?: GoogleCloudDatapipelinesV1StopPipelineRequest;
}

export const StopProjectsLocationsPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDatapipelinesV1StopPipelineRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines/{pipelinesId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsPipelinesRequest>;

export type StopProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;
export const StopProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1Pipeline;

export type StopProjectsLocationsPipelinesError = CommonErrors;

export const stopProjectsLocationsPipelines: API.OperationMethod<StopProjectsLocationsPipelinesRequest, StopProjectsLocationsPipelinesResponse, StopProjectsLocationsPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsPipelinesRequest,
  output: StopProjectsLocationsPipelinesResponse,
  errors: [],
}));

/** Creates a job for the specified pipeline directly. You can use this method when the internal scheduler is not configured and you want to trigger the job directly or through an external system. Returns a "NOT_FOUND" error if the pipeline doesn't exist. Returns a "FORBIDDEN" error if the user doesn't have permission to access the pipeline or run jobs for the pipeline. */
export interface RunProjectsLocationsPipelinesRequest {
  /** Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. */
  name: string;
  /** Request body */
  body?: GoogleCloudDatapipelinesV1RunPipelineRequest;
}

export const RunProjectsLocationsPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDatapipelinesV1RunPipelineRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines/{pipelinesId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsPipelinesRequest>;

export type RunProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1RunPipelineResponse;
export const RunProjectsLocationsPipelinesResponse = GoogleCloudDatapipelinesV1RunPipelineResponse;

export type RunProjectsLocationsPipelinesError = CommonErrors;

export const runProjectsLocationsPipelines: API.OperationMethod<RunProjectsLocationsPipelinesRequest, RunProjectsLocationsPipelinesResponse, RunProjectsLocationsPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsPipelinesRequest,
  output: RunProjectsLocationsPipelinesResponse,
  errors: [],
}));

/** Lists jobs for a given pipeline. Throws a "FORBIDDEN" error if the caller doesn't have permission to access it. */
export interface ListProjectsLocationsPipelinesJobsRequest {
  /** Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. */
  parent: string;
  /** The maximum number of entities to return. The service may return fewer than this value, even if there are additional pages. If unspecified, the max limit will be determined by the backend implementation. */
  pageSize?: number;
  /** A page token, received from a previous `ListJobs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListJobs` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPipelinesJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/pipelines/{pipelinesId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPipelinesJobsRequest>;

export type ListProjectsLocationsPipelinesJobsResponse = GoogleCloudDatapipelinesV1ListJobsResponse;
export const ListProjectsLocationsPipelinesJobsResponse = GoogleCloudDatapipelinesV1ListJobsResponse;

export type ListProjectsLocationsPipelinesJobsError = CommonErrors;

export const listProjectsLocationsPipelinesJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsPipelinesJobsRequest,
  output: ListProjectsLocationsPipelinesJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

