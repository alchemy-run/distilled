// ==========================================================================
// AI Platform Training & Prediction API (ml v1)
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
  name: "ml",
  version: "v1",
  rootUrl: "https://ml.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudMlV1__IntegratedGradientsAttribution {
  /** Number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. */
  numIntegralSteps?: number;
}

export const GoogleCloudMlV1__IntegratedGradientsAttribution: Schema.Schema<GoogleCloudMlV1__IntegratedGradientsAttribution> = Schema.suspend(() => Schema.Struct({
  numIntegralSteps: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__IntegratedGradientsAttribution" }) as any as Schema.Schema<GoogleCloudMlV1__IntegratedGradientsAttribution>;

export interface GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric {
  /** The global training step for this metric. */
  trainingStep?: string;
  /** The objective value at this training step. */
  objectiveValue?: number;
}

export const GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric: Schema.Schema<GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric> = Schema.suspend(() => Schema.Struct({
  trainingStep: Schema.optional(Schema.String),
  objectiveValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric" }) as any as Schema.Schema<GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric>;

export interface GoogleCloudMlV1__BuiltInAlgorithmOutput {
  /** AI Platform runtime version on which the built-in algorithm was trained. */
  runtimeVersion?: string;
  /** Framework on which the built-in algorithm was trained. */
  framework?: string;
  /** Python version on which the built-in algorithm was trained. */
  pythonVersion?: string;
  /** The Cloud Storage path to the `model/` directory where the training job saves the trained model. Only set for successful jobs that don't use hyperparameter tuning. */
  modelPath?: string;
}

export const GoogleCloudMlV1__BuiltInAlgorithmOutput: Schema.Schema<GoogleCloudMlV1__BuiltInAlgorithmOutput> = Schema.suspend(() => Schema.Struct({
  runtimeVersion: Schema.optional(Schema.String),
  framework: Schema.optional(Schema.String),
  pythonVersion: Schema.optional(Schema.String),
  modelPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__BuiltInAlgorithmOutput" }) as any as Schema.Schema<GoogleCloudMlV1__BuiltInAlgorithmOutput>;

export interface GoogleCloudMlV1__HyperparameterOutput {
  /** All recorded object metrics for this trial. This field is not currently populated. */
  allMetrics?: Array<GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric>;
  /** The trial id for these results. */
  trialId?: string;
  /** True if the trial is stopped early. */
  isTrialStoppedEarly?: boolean;
  /** Details related to built-in algorithms jobs. Only set for trials of built-in algorithms jobs that have succeeded. */
  builtInAlgorithmOutput?: GoogleCloudMlV1__BuiltInAlgorithmOutput;
  /** Output only. Start time for the trial. */
  startTime?: string;
  /** The hyperparameters given to this trial. */
  hyperparameters?: Record<string, string>;
  /** The final objective metric seen for this trial. */
  finalMetric?: GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric;
  /** Output only. End time for the trial. */
  endTime?: string;
  /** Output only. The detailed state of the trial. */
  state?: "STATE_UNSPECIFIED" | "QUEUED" | "PREPARING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLING" | "CANCELLED" | (string & {});
  /** URIs for accessing [interactive shells](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell) (one URI for each training node). Only available if this trial is part of a hyperparameter tuning job and the job's training_input.enable_web_access is `true`. The keys are names of each node in the training job; for example, `master-replica-0` for the master node, `worker-replica-0` for the first worker, and `ps-replica-0` for the first parameter server. The values are the URIs for each node's interactive shell. */
  webAccessUris?: Record<string, string>;
}

export const GoogleCloudMlV1__HyperparameterOutput: Schema.Schema<GoogleCloudMlV1__HyperparameterOutput> = Schema.suspend(() => Schema.Struct({
  allMetrics: Schema.optional(Schema.Array(GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric)),
  trialId: Schema.optional(Schema.String),
  isTrialStoppedEarly: Schema.optional(Schema.Boolean),
  builtInAlgorithmOutput: Schema.optional(GoogleCloudMlV1__BuiltInAlgorithmOutput),
  startTime: Schema.optional(Schema.String),
  hyperparameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  finalMetric: Schema.optional(GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric),
  endTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  webAccessUris: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudMlV1__HyperparameterOutput" }) as any as Schema.Schema<GoogleCloudMlV1__HyperparameterOutput>;

export interface GoogleCloudMlV1__TrainingOutput {
  /** The amount of ML units consumed by the job. */
  consumedMLUnits?: number;
  /** The number of hyperparameter tuning trials that completed successfully. Only set for hyperparameter tuning jobs. */
  completedTrialCount?: string;
  /** Output only. URIs for accessing [interactive shells](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell) (one URI for each training node). Only available if training_input.enable_web_access is `true`. The keys are names of each node in the training job; for example, `master-replica-0` for the master node, `worker-replica-0` for the first worker, and `ps-replica-0` for the first parameter server. The values are the URIs for each node's interactive shell. */
  webAccessUris?: Record<string, string>;
  /** Whether this job is a hyperparameter tuning job. */
  isHyperparameterTuningJob?: boolean;
  /** The TensorFlow summary tag name used for optimizing hyperparameter tuning trials. See [`HyperparameterSpec.hyperparameterMetricTag`](#HyperparameterSpec.FIELDS.hyperparameter_metric_tag) for more information. Only set for hyperparameter tuning jobs. */
  hyperparameterMetricTag?: string;
  /** Whether this job is a built-in Algorithm job. */
  isBuiltInAlgorithmJob?: boolean;
  /** Results for individual Hyperparameter trials. Only set for hyperparameter tuning jobs. */
  trials?: Array<GoogleCloudMlV1__HyperparameterOutput>;
  /** Details related to built-in algorithms jobs. Only set for built-in algorithms jobs. */
  builtInAlgorithmOutput?: GoogleCloudMlV1__BuiltInAlgorithmOutput;
}

export const GoogleCloudMlV1__TrainingOutput: Schema.Schema<GoogleCloudMlV1__TrainingOutput> = Schema.suspend(() => Schema.Struct({
  consumedMLUnits: Schema.optional(Schema.Number),
  completedTrialCount: Schema.optional(Schema.String),
  webAccessUris: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  isHyperparameterTuningJob: Schema.optional(Schema.Boolean),
  hyperparameterMetricTag: Schema.optional(Schema.String),
  isBuiltInAlgorithmJob: Schema.optional(Schema.Boolean),
  trials: Schema.optional(Schema.Array(GoogleCloudMlV1__HyperparameterOutput)),
  builtInAlgorithmOutput: Schema.optional(GoogleCloudMlV1__BuiltInAlgorithmOutput),
})).annotate({ identifier: "GoogleCloudMlV1__TrainingOutput" }) as any as Schema.Schema<GoogleCloudMlV1__TrainingOutput>;

export interface GoogleApi__HttpBody {
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
}

export const GoogleApi__HttpBody: Schema.Schema<GoogleApi__HttpBody> = Schema.suspend(() => Schema.Struct({
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApi__HttpBody" }) as any as Schema.Schema<GoogleApi__HttpBody>;

export interface GoogleCloudMlV1_Measurement_Metric {
  /** Required. The value for this metric. */
  value?: number;
  /** Required. Metric name. */
  metric?: string;
}

export const GoogleCloudMlV1_Measurement_Metric: Schema.Schema<GoogleCloudMlV1_Measurement_Metric> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  metric: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1_Measurement_Metric" }) as any as Schema.Schema<GoogleCloudMlV1_Measurement_Metric>;

export interface GoogleCloudMlV1__MetricSpec {
  /** metric name. */
  name?: "METRIC_NAME_UNSPECIFIED" | "CPU_USAGE" | "GPU_DUTY_CYCLE" | (string & {});
  /** Target specifies the target value for the given metric; once real metric deviates from the threshold by a certain percentage, the node count changes. */
  target?: number;
}

export const GoogleCloudMlV1__MetricSpec: Schema.Schema<GoogleCloudMlV1__MetricSpec> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  target: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__MetricSpec" }) as any as Schema.Schema<GoogleCloudMlV1__MetricSpec>;

export interface GoogleCloudMlV1__AutoScaling {
  /** MetricSpec contains the specifications to use to calculate the desired nodes count. */
  metrics?: Array<GoogleCloudMlV1__MetricSpec>;
  /** The maximum number of nodes to scale this model under load. The actual value will depend on resource quota and availability. */
  maxNodes?: number;
  /** Optional. The minimum number of nodes to allocate for this model. These nodes are always up, starting from the time the model is deployed. Therefore, the cost of operating this model will be at least `rate` * `min_nodes` * number of hours since last billing cycle, where `rate` is the cost per node-hour as documented in the [pricing guide](/ml-engine/docs/pricing), even if no predictions are performed. There is additional cost for each prediction performed. Unlike manual scaling, if the load gets too heavy for the nodes that are up, the service will automatically add nodes to handle the increased load as well as scale back as traffic drops, always maintaining at least `min_nodes`. You will be charged for the time in which additional nodes are used. If `min_nodes` is not specified and AutoScaling is used with a [legacy (MLS1) machine type](/ml-engine/docs/machine-types-online-prediction), `min_nodes` defaults to 0, in which case, when traffic to a model stops (and after a cool-down period), nodes will be shut down and no charges will be incurred until traffic to the model resumes. If `min_nodes` is not specified and AutoScaling is used with a [Compute Engine (N1) machine type](/ml-engine/docs/machine-types-online-prediction), `min_nodes` defaults to 1. `min_nodes` must be at least 1 for use with a Compute Engine machine type. You can set `min_nodes` when creating the model version, and you can also update `min_nodes` for an existing version: update_body.json: { 'autoScaling': { 'minNodes': 5 } } HTTP request: PATCH https://ml.googleapis.com/v1/{name=projects/* /models/* /versions/*}?update_mask=autoScaling.minNodes -d @./update_body.json */
  minNodes?: number;
}

export const GoogleCloudMlV1__AutoScaling: Schema.Schema<GoogleCloudMlV1__AutoScaling> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(GoogleCloudMlV1__MetricSpec)),
  maxNodes: Schema.optional(Schema.Number),
  minNodes: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__AutoScaling" }) as any as Schema.Schema<GoogleCloudMlV1__AutoScaling>;

export interface GoogleCloudMlV1__XraiAttribution {
  /** Number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. */
  numIntegralSteps?: number;
}

export const GoogleCloudMlV1__XraiAttribution: Schema.Schema<GoogleCloudMlV1__XraiAttribution> = Schema.suspend(() => Schema.Struct({
  numIntegralSteps: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__XraiAttribution" }) as any as Schema.Schema<GoogleCloudMlV1__XraiAttribution>;

export interface GoogleCloudMlV1__SampledShapleyAttribution {
  /** The number of feature permutations to consider when approximating the Shapley values. */
  numPaths?: number;
}

export const GoogleCloudMlV1__SampledShapleyAttribution: Schema.Schema<GoogleCloudMlV1__SampledShapleyAttribution> = Schema.suspend(() => Schema.Struct({
  numPaths: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__SampledShapleyAttribution" }) as any as Schema.Schema<GoogleCloudMlV1__SampledShapleyAttribution>;

export interface GoogleCloudMlV1__ExplanationConfig {
  /** Attributes credit by computing the XRAI taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1906.02825 Currently only implemented for models with natural image inputs. */
  xraiAttribution?: GoogleCloudMlV1__XraiAttribution;
  /** An attribution method that approximates Shapley values for features that contribute to the label being predicted. A sampling strategy is used to approximate the value rather than considering all subsets of features. */
  sampledShapleyAttribution?: GoogleCloudMlV1__SampledShapleyAttribution;
  /** Attributes credit by computing the Aumann-Shapley value taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1703.01365 */
  integratedGradientsAttribution?: GoogleCloudMlV1__IntegratedGradientsAttribution;
}

export const GoogleCloudMlV1__ExplanationConfig: Schema.Schema<GoogleCloudMlV1__ExplanationConfig> = Schema.suspend(() => Schema.Struct({
  xraiAttribution: Schema.optional(GoogleCloudMlV1__XraiAttribution),
  sampledShapleyAttribution: Schema.optional(GoogleCloudMlV1__SampledShapleyAttribution),
  integratedGradientsAttribution: Schema.optional(GoogleCloudMlV1__IntegratedGradientsAttribution),
})).annotate({ identifier: "GoogleCloudMlV1__ExplanationConfig" }) as any as Schema.Schema<GoogleCloudMlV1__ExplanationConfig>;

export interface GoogleCloudMlV1__ManualScaling {
  /** The number of nodes to allocate for this model. These nodes are always up, starting from the time the model is deployed, so the cost of operating this model will be proportional to `nodes` * number of hours since last billing cycle plus the cost for each prediction performed. */
  nodes?: number;
}

export const GoogleCloudMlV1__ManualScaling: Schema.Schema<GoogleCloudMlV1__ManualScaling> = Schema.suspend(() => Schema.Struct({
  nodes: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__ManualScaling" }) as any as Schema.Schema<GoogleCloudMlV1__ManualScaling>;

export interface GoogleCloudMlV1__RouteMap {
  /** HTTP path on the container to send prediction requests to. AI Platform Prediction forwards requests sent using projects.predict to this path on the container's IP address and port. AI Platform Prediction then returns the container's response in the API response. For example, if you set this field to `/foo`, then when AI Platform Prediction receives a prediction request, it forwards the request body in a POST request to the `/foo` path on the port of your container specified by the first value of Version.container.ports. If you don't specify this field, it defaults to the following value: /v1/models/MODEL/versions/VERSION:predict The placeholders in this value are replaced as follows: * MODEL: The name of the parent Model. This does not include the "projects/PROJECT_ID/models/" prefix that the API returns in output; it is the bare model name, as provided to projects.models.create. * VERSION: The name of the model version. This does not include the "projects/PROJECT_ID/models/MODEL/versions/" prefix that the API returns in output; it is the bare version name, as provided to projects.models.versions.create. */
  predict?: string;
  /** HTTP path on the container to send health checkss to. AI Platform Prediction intermittently sends GET requests to this path on the container's IP address and port to check that the container is healthy. Read more about [health checks](/ai-platform/prediction/docs/custom-container-requirements#checks). For example, if you set this field to `/bar`, then AI Platform Prediction intermittently sends a GET request to the `/bar` path on the port of your container specified by the first value of Version.container.ports. If you don't specify this field, it defaults to the following value: /v1/models/ MODEL/versions/VERSION The placeholders in this value are replaced as follows: * MODEL: The name of the parent Model. This does not include the "projects/PROJECT_ID/models/" prefix that the API returns in output; it is the bare model name, as provided to projects.models.create. * VERSION: The name of the model version. This does not include the "projects/PROJECT_ID /models/MODEL/versions/" prefix that the API returns in output; it is the bare version name, as provided to projects.models.versions.create. */
  health?: string;
}

export const GoogleCloudMlV1__RouteMap: Schema.Schema<GoogleCloudMlV1__RouteMap> = Schema.suspend(() => Schema.Struct({
  predict: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__RouteMap" }) as any as Schema.Schema<GoogleCloudMlV1__RouteMap>;

export interface GoogleCloudMlV1__AcceleratorConfig {
  /** The number of accelerators to attach to each machine running the job. */
  count?: string;
  /** The type of accelerator to use. */
  type?: "ACCELERATOR_TYPE_UNSPECIFIED" | "NVIDIA_TESLA_K80" | "NVIDIA_TESLA_P100" | "NVIDIA_TESLA_V100" | "NVIDIA_TESLA_P4" | "NVIDIA_TESLA_T4" | "NVIDIA_TESLA_A100" | "TPU_V2" | "TPU_V3" | "TPU_V2_POD" | "TPU_V3_POD" | "TPU_V4_POD" | (string & {});
}

export const GoogleCloudMlV1__AcceleratorConfig: Schema.Schema<GoogleCloudMlV1__AcceleratorConfig> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__AcceleratorConfig" }) as any as Schema.Schema<GoogleCloudMlV1__AcceleratorConfig>;

export interface GoogleCloudMlV1__EnvVar {
  /** Name of the environment variable. Must be a [valid C identifier](https://github.com/kubernetes/kubernetes/blob/v1.18.8/staging/src/k8s.io/apimachinery/pkg/util/validation/validation.go#L258) and must not begin with the prefix `AIP_`. */
  name?: string;
  /** Value of the environment variable. Defaults to an empty string. In this field, you can reference [environment variables set by AI Platform Prediction](/ai-platform/prediction/docs/custom-container-requirements#aip-variables) and environment variables set earlier in the same env field as where this message occurs. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $(VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) */
  value?: string;
}

export const GoogleCloudMlV1__EnvVar: Schema.Schema<GoogleCloudMlV1__EnvVar> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__EnvVar" }) as any as Schema.Schema<GoogleCloudMlV1__EnvVar>;

export interface GoogleCloudMlV1__ContainerPort {
  /** Number of the port to expose on the container. This must be a valid port number: 0 < PORT_NUMBER < 65536. */
  containerPort?: number;
}

export const GoogleCloudMlV1__ContainerPort: Schema.Schema<GoogleCloudMlV1__ContainerPort> = Schema.suspend(() => Schema.Struct({
  containerPort: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__ContainerPort" }) as any as Schema.Schema<GoogleCloudMlV1__ContainerPort>;

export interface GoogleCloudMlV1__ContainerSpec {
  /** Immutable. List of environment variables to set in the container. After the container starts running, code running in the container can read these environment variables. Additionally, the command and args fields can reference these variables. Later entries in this list can also reference earlier entries. For example, the following example sets the variable `VAR_2` to have the value `foo bar`: ```json [ { "name": "VAR_1", "value": "foo" }, { "name": "VAR_2", "value": "$(VAR_1) bar" } ] ``` If you switch the order of the variables in the example, then the expansion does not occur. This field corresponds to the `env` field of the [Kubernetes Containers v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core). */
  env?: Array<GoogleCloudMlV1__EnvVar>;
  /** Immutable. Specifies arguments for the command that runs when the container starts. This overrides the container's [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd). Specify this field as an array of executable and arguments, similar to a Docker `CMD`'s "default parameters" form. If you don't specify this field but do specify the command field, then the command from the `command` field runs without any additional arguments. See the [Kubernetes documentation about how the `command` and `args` fields interact with a container's `ENTRYPOINT` and `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes). If you don't specify this field and don't specify the `commmand` field, then the container's [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#cmd) and `CMD` determine what runs based on their default behavior. See the [Docker documentation about how `CMD` and `ENTRYPOINT` interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact). In this field, you can reference [environment variables set by AI Platform Prediction](/ai-platform/prediction/docs/custom-container-requirements#aip-variables) and environment variables set in the env field. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $( VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field corresponds to the `args` field of the [Kubernetes Containers v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core). */
  args?: Array<string>;
  /** Immutable. List of ports to expose from the container. AI Platform Prediction sends any prediction requests that it receives to the first port on this list. AI Platform Prediction also sends [liveness and health checks](/ai-platform/prediction/docs/custom-container-requirements#health) to this port. If you do not specify this field, it defaults to following value: ```json [ { "containerPort": 8080 } ] ``` AI Platform Prediction does not use ports other than the first one listed. This field corresponds to the `ports` field of the [Kubernetes Containers v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core). */
  ports?: Array<GoogleCloudMlV1__ContainerPort>;
  /** Immutable. Specifies the command that runs when the container starts. This overrides the container's [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint). Specify this field as an array of executable and arguments, similar to a Docker `ENTRYPOINT`'s "exec" form, not its "shell" form. If you do not specify this field, then the container's `ENTRYPOINT` runs, in conjunction with the args field or the container's [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd), if either exists. If this field is not specified and the container does not have an `ENTRYPOINT`, then refer to the [Docker documentation about how `CMD` and `ENTRYPOINT` interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact). If you specify this field, then you can also specify the `args` field to provide additional arguments for this command. However, if you specify this field, then the container's `CMD` is ignored. See the [Kubernetes documentation about how the `command` and `args` fields interact with a container's `ENTRYPOINT` and `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes). In this field, you can reference [environment variables set by AI Platform Prediction](/ai-platform/prediction/docs/custom-container-requirements#aip-variables) and environment variables set in the env field. You cannot reference environment variables set in the Docker image. In order for environment variables to be expanded, reference them by using the following syntax: $( VARIABLE_NAME) Note that this differs from Bash variable expansion, which does not use parentheses. If a variable cannot be resolved, the reference in the input string is used unchanged. To avoid variable expansion, you can escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field corresponds to the `command` field of the [Kubernetes Containers v1 core API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core). */
  command?: Array<string>;
  /** URI of the Docker image to be used as the custom container for serving predictions. This URI must identify [an image in Artifact Registry](/artifact-registry/docs/overview) and begin with the hostname `{REGION}-docker.pkg.dev`, where `{REGION}` is replaced by the region that matches AI Platform Prediction [regional endpoint](/ai-platform/prediction/docs/regional-endpoints) that you are using. For example, if you are using the `us-central1-ml.googleapis.com` endpoint, then this URI must begin with `us-central1-docker.pkg.dev`. To use a custom container, the [AI Platform Google-managed service account](/ai-platform/prediction/docs/custom-service-account#default) must have permission to pull (read) the Docker image at this URI. The AI Platform Google-managed service account has the following format: `service-{PROJECT_NUMBER}@cloud-ml.google.com.iam.gserviceaccount.com` {PROJECT_NUMBER} is replaced by your Google Cloud project number. By default, this service account has necessary permissions to pull an Artifact Registry image in the same Google Cloud project where you are using AI Platform Prediction. In this case, no configuration is necessary. If you want to use an image from a different Google Cloud project, learn how to [grant the Artifact Registry Reader (roles/artifactregistry.reader) role for a repository](/artifact-registry/docs/access-control#grant-repo) to your projet's AI Platform Google-managed service account. To learn about the requirements for the Docker image itself, read [Custom container requirements](/ai-platform/prediction/docs/custom-container-requirements). */
  image?: string;
}

export const GoogleCloudMlV1__ContainerSpec: Schema.Schema<GoogleCloudMlV1__ContainerSpec> = Schema.suspend(() => Schema.Struct({
  env: Schema.optional(Schema.Array(GoogleCloudMlV1__EnvVar)),
  args: Schema.optional(Schema.Array(Schema.String)),
  ports: Schema.optional(Schema.Array(GoogleCloudMlV1__ContainerPort)),
  command: Schema.optional(Schema.Array(Schema.String)),
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__ContainerSpec" }) as any as Schema.Schema<GoogleCloudMlV1__ContainerSpec>;

export interface GoogleCloudMlV1__RequestLoggingConfig {
  /** Required. Fully qualified BigQuery table name in the following format: " project_id.dataset_name.table_name" The specified table must already exist, and the "Cloud ML Service Agent" for your project must have permission to write to it. The table must have the following [schema](/bigquery/docs/schemas): Field name Type Mode model STRING REQUIRED model_version STRING REQUIRED time TIMESTAMP REQUIRED raw_data STRING REQUIRED raw_prediction STRING NULLABLE groundtruth STRING NULLABLE */
  bigqueryTableName?: string;
  /** Percentage of requests to be logged, expressed as a fraction from 0 to 1. For example, if you want to log 10% of requests, enter `0.1`. The sampling window is the lifetime of the model version. Defaults to 0. */
  samplingPercentage?: number;
}

export const GoogleCloudMlV1__RequestLoggingConfig: Schema.Schema<GoogleCloudMlV1__RequestLoggingConfig> = Schema.suspend(() => Schema.Struct({
  bigqueryTableName: Schema.optional(Schema.String),
  samplingPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__RequestLoggingConfig" }) as any as Schema.Schema<GoogleCloudMlV1__RequestLoggingConfig>;

export interface GoogleCloudMlV1__Version {
  /** Optional. The description specified for the version when it was created. */
  description?: string;
  /** Optional. Specifies the service account for resource access control. If you specify this field, then you must also specify either the `containerSpec` or the `predictionClass` field. Learn more about [using a custom service account](/ai-platform/prediction/docs/custom-service-account). */
  serviceAccount?: string;
  /** Automatically scale the number of nodes used to serve the model in response to increases and decreases in traffic. Care should be taken to ramp up traffic according to the model's ability to scale or you will start seeing increases in latency and 429 response codes. */
  autoScaling?: GoogleCloudMlV1__AutoScaling;
  /** Output only. The state of a version. */
  state?: "UNKNOWN" | "READY" | "CREATING" | "FAILED" | "DELETING" | "UPDATING" | (string & {});
  /** Optional. Configures explainability features on the model's version. Some explanation features require additional metadata to be loaded as part of the model payload. */
  explanationConfig?: GoogleCloudMlV1__ExplanationConfig;
  /** Required. The version of Python used in prediction. The following Python versions are available: * Python '3.7' is available when `runtime_version` is set to '1.15' or later. * Python '3.5' is available when `runtime_version` is set to a version from '1.4' to '1.14'. * Python '2.7' is available when `runtime_version` is set to '1.15' or earlier. Read more about the Python versions available for [each runtime version](/ml-engine/docs/runtime-version-list). */
  pythonVersion?: string;
  /** Output only. The details of a failure or a cancellation. */
  errorMessage?: string;
  /** Output only. If true, this version will be used to handle prediction requests that do not specify a version. You can change the default version by calling projects.methods.versions.setDefault. */
  isDefault?: boolean;
  /** Output only. The time the version was created. */
  createTime?: string;
  /** The Cloud Storage URI of a directory containing trained model artifacts to be used to create the model version. See the [guide to deploying models](/ai-platform/prediction/docs/deploying-models) for more information. The total number of files under this directory must not exceed 1000. During projects.models.versions.create, AI Platform Prediction copies all files from the specified directory to a location managed by the service. From then on, AI Platform Prediction uses these copies of the model artifacts to serve predictions, not the original files in Cloud Storage, so this location is useful only as a historical record. If you specify container, then this field is optional. Otherwise, it is required. Learn [how to use this field with a custom container](/ai-platform/prediction/docs/custom-container-requirements#artifacts). */
  deploymentUri?: string;
  /** Manually select the number of nodes to use for serving the model. You should generally use `auto_scaling` with an appropriate `min_nodes` instead, but this option is available if you want more predictable billing. Beware that latency and error rates will increase if the traffic exceeds that capability of the system to serve it based on the selected number of nodes. */
  manualScaling?: GoogleCloudMlV1__ManualScaling;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a model from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform model updates in order to avoid race conditions: An `etag` is returned in the response to `GetVersion`, and systems are expected to put that etag in the request to `UpdateVersion` to ensure that their change will be applied to the model as intended. */
  etag?: string;
  /** Optional. Specifies paths on a custom container's HTTP server where AI Platform Prediction sends certain requests. If you specify this field, then you must also specify the `container` field. If you specify the `container` field and do not specify this field, it defaults to the following: ```json { "predict": "/v1/models/MODEL/versions/VERSION:predict", "health": "/v1/models/MODEL/versions/VERSION" } ``` See RouteMap for more details about these default values. */
  routes?: GoogleCloudMlV1__RouteMap;
  /** Output only. The time the version was last used for prediction. */
  lastUseTime?: string;
  /** Optional. Cloud Storage paths (`gs://…`) of packages for [custom prediction routines](/ml-engine/docs/tensorflow/custom-prediction-routines) or [scikit-learn pipelines with custom code](/ml-engine/docs/scikit/exporting-for-prediction#custom-pipeline-code). For a custom prediction routine, one of these packages must contain your Predictor class (see [`predictionClass`](#Version.FIELDS.prediction_class)). Additionally, include any dependencies used by your Predictor or scikit-learn pipeline uses that are not already included in your selected [runtime version](/ml-engine/docs/tensorflow/runtime-version-list). If you specify this field, you must also set [`runtimeVersion`](#Version.FIELDS.runtime_version) to 1.4 or greater. */
  packageUris?: Array<string>;
  /** Output only. The [AI Platform (Unified) `Model`](https://cloud.google.com/ai-platform-unified/docs/reference/rest/v1beta1/projects.locations.models) ID for the last [model migration](https://cloud.google.com/ai-platform-unified/docs/start/migrating-to-ai-platform-unified). */
  lastMigrationModelId?: string;
  /** Optional. The type of machine on which to serve the model. Currently only applies to online prediction service. To learn about valid values for this field, read [Choosing a machine type for online prediction](/ai-platform/prediction/docs/machine-types-online-prediction). If this field is not specified and you are using a [regional endpoint](/ai-platform/prediction/docs/regional-endpoints), then the machine type defaults to `n1-standard-2`. If this field is not specified and you are using the global endpoint (`ml.googleapis.com`), then the machine type defaults to `mls1-c1-m2`. */
  machineType?: string;
  /** Optional. One or more labels that you can add, to organize your model versions. Each label is a key-value pair, where both the key and the value are arbitrary strings that you supply. For more information, see the documentation on using labels. Note that this field is not updatable for mls1* models. */
  labels?: Record<string, string>;
  /** Optional. Accelerator config for using GPUs for online prediction (beta). Only specify this field if you have specified a Compute Engine (N1) machine type in the `machineType` field. Learn more about [using GPUs for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus). */
  acceleratorConfig?: GoogleCloudMlV1__AcceleratorConfig;
  /** Optional. The machine learning framework AI Platform uses to train this version of the model. Valid values are `TENSORFLOW`, `SCIKIT_LEARN`, `XGBOOST`. If you do not specify a framework, AI Platform will analyze files in the deployment_uri to determine a framework. If you choose `SCIKIT_LEARN` or `XGBOOST`, you must also set the runtime version of the model to 1.4 or greater. Do **not** specify a framework if you're deploying a [custom prediction routine](/ai-platform/prediction/docs/custom-prediction-routines) or if you're using a [custom container](/ai-platform/prediction/docs/use-custom-container). */
  framework?: "FRAMEWORK_UNSPECIFIED" | "TENSORFLOW" | "SCIKIT_LEARN" | "XGBOOST" | (string & {});
  /** Output only. The last time this version was successfully [migrated to AI Platform (Unified)](https://cloud.google.com/ai-platform-unified/docs/start/migrating-to-ai-platform-unified). */
  lastMigrationTime?: string;
  /** Optional. The fully qualified name (module_name.class_name) of a class that implements the Predictor interface described in this reference field. The module containing this class should be included in a package provided to the [`packageUris` field](#Version.FIELDS.package_uris). Specify this field if and only if you are deploying a [custom prediction routine (beta)](/ml-engine/docs/tensorflow/custom-prediction-routines). If you specify this field, you must set [`runtimeVersion`](#Version.FIELDS.runtime_version) to 1.4 or greater and you must set `machineType` to a [legacy (MLS1) machine type](/ml-engine/docs/machine-types-online-prediction). The following code sample provides the Predictor interface: class Predictor(object): """Interface for constructing custom predictors.""" def predict(self, instances, **kwargs): """Performs custom prediction. Instances are the decoded values from the request. They have already been deserialized from JSON. Args: instances: A list of prediction input instances. **kwargs: A dictionary of keyword args provided as additional fields on the predict request body. Returns: A list of outputs containing the prediction results. This list must be JSON serializable. """ raise NotImplementedError() @classmethod def from_path(cls, model_dir): """Creates an instance of Predictor using the given path. Loading of the predictor should be done in this method. Args: model_dir: The local directory that contains the exported model file along with any additional files uploaded when creating the version resource. Returns: An instance implementing this Predictor class. """ raise NotImplementedError() Learn more about [the Predictor interface and custom prediction routines](/ml-engine/docs/tensorflow/custom-prediction-routines). */
  predictionClass?: string;
  /** Required. The name specified for the version when it was created. The version name must be unique within the model it is created in. */
  name?: string;
  /** Required. The AI Platform runtime version to use for this deployment. For more information, see the [runtime version list](/ml-engine/docs/runtime-version-list) and [how to manage runtime versions](/ml-engine/docs/versioning). */
  runtimeVersion?: string;
  /** Optional. Specifies a custom container to use for serving predictions. If you specify this field, then `machineType` is required. If you specify this field, then `deploymentUri` is optional. If you specify this field, then you must not specify `runtimeVersion`, `packageUris`, `framework`, `pythonVersion`, or `predictionClass`. */
  container?: GoogleCloudMlV1__ContainerSpec;
  /** Optional. *Only* specify this field in a projects.models.versions.patch request. Specifying it in a projects.models.versions.create request has no effect. Configures the request-response pair logging on predictions from this Version. */
  requestLoggingConfig?: GoogleCloudMlV1__RequestLoggingConfig;
}

export const GoogleCloudMlV1__Version: Schema.Schema<GoogleCloudMlV1__Version> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  autoScaling: Schema.optional(GoogleCloudMlV1__AutoScaling),
  state: Schema.optional(Schema.String),
  explanationConfig: Schema.optional(GoogleCloudMlV1__ExplanationConfig),
  pythonVersion: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  deploymentUri: Schema.optional(Schema.String),
  manualScaling: Schema.optional(GoogleCloudMlV1__ManualScaling),
  etag: Schema.optional(Schema.String),
  routes: Schema.optional(GoogleCloudMlV1__RouteMap),
  lastUseTime: Schema.optional(Schema.String),
  packageUris: Schema.optional(Schema.Array(Schema.String)),
  lastMigrationModelId: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  acceleratorConfig: Schema.optional(GoogleCloudMlV1__AcceleratorConfig),
  framework: Schema.optional(Schema.String),
  lastMigrationTime: Schema.optional(Schema.String),
  predictionClass: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  runtimeVersion: Schema.optional(Schema.String),
  container: Schema.optional(GoogleCloudMlV1__ContainerSpec),
  requestLoggingConfig: Schema.optional(GoogleCloudMlV1__RequestLoggingConfig),
})).annotate({ identifier: "GoogleCloudMlV1__Version" }) as any as Schema.Schema<GoogleCloudMlV1__Version>;

export interface GoogleCloudMlV1__ListVersionsResponse {
  /** Optional. Pass this token as the `page_token` field of the request for a subsequent call. */
  nextPageToken?: string;
  /** The list of versions. */
  versions?: Array<GoogleCloudMlV1__Version>;
}

export const GoogleCloudMlV1__ListVersionsResponse: Schema.Schema<GoogleCloudMlV1__ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  versions: Schema.optional(Schema.Array(GoogleCloudMlV1__Version)),
})).annotate({ identifier: "GoogleCloudMlV1__ListVersionsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListVersionsResponse>;

export interface GoogleCloudMlV1__Model {
  /** Optional. The description specified for the model when it was created. */
  description?: string;
  /** Required. The name specified for the model when it was created. The model name must be unique within the project it is created in. */
  name?: string;
  /** Optional. If true, online prediction nodes send `stderr` and `stdout` streams to Cloud Logging. These can be more verbose than the standard access logs (see `onlinePredictionLogging`) and can incur higher cost. However, they are helpful for debugging. Note that [logs may incur a cost](/stackdriver/pricing), especially if your project receives prediction requests at a high QPS. Estimate your costs before enabling this option. Default is false. */
  onlinePredictionConsoleLogging?: boolean;
  /** Optional. If true, online prediction access logs are sent to Cloud Logging. These logs are like standard server access logs, containing information like timestamp and latency for each request. Note that [logs may incur a cost](/stackdriver/pricing), especially if your project receives prediction requests at a high queries per second rate (QPS). Estimate your costs before enabling this option. Default is false. */
  onlinePredictionLogging?: boolean;
  /** Optional. One or more labels that you can add, to organize your models. Each label is a key-value pair, where both the key and the value are arbitrary strings that you supply. For more information, see the documentation on using labels. Note that this field is not updatable for mls1* models. */
  labels?: Record<string, string>;
  /** Optional. The list of regions where the model is going to be deployed. Only one region per model is supported. Defaults to 'us-central1' if nothing is set. See the available regions for AI Platform services. Note: * No matter where a model is deployed, it can always be accessed by users from anywhere, both for online and batch prediction. * The region for a batch prediction job is set by the region field when submitting the batch prediction job and does not take its value from this field. */
  regions?: Array<string>;
  /** Output only. The default version of the model. This version will be used to handle prediction requests that do not specify a version. You can change the default version by calling projects.models.versions.setDefault. */
  defaultVersion?: GoogleCloudMlV1__Version;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a model from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform model updates in order to avoid race conditions: An `etag` is returned in the response to `GetModel`, and systems are expected to put that etag in the request to `UpdateModel` to ensure that their change will be applied to the model as intended. */
  etag?: string;
}

export const GoogleCloudMlV1__Model: Schema.Schema<GoogleCloudMlV1__Model> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  onlinePredictionConsoleLogging: Schema.optional(Schema.Boolean),
  onlinePredictionLogging: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  regions: Schema.optional(Schema.Array(Schema.String)),
  defaultVersion: Schema.optional(GoogleCloudMlV1__Version),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Model" }) as any as Schema.Schema<GoogleCloudMlV1__Model>;

export interface GoogleCloudMlV1__Measurement {
  /** The number of steps a machine learning model has been trained for. Must be non-negative. */
  stepCount?: string;
  /** Output only. Time that the trial has been running at the point of this measurement. */
  elapsedTime?: string;
  /** Provides a list of metrics that act as inputs into the objective function. */
  metrics?: Array<GoogleCloudMlV1_Measurement_Metric>;
}

export const GoogleCloudMlV1__Measurement: Schema.Schema<GoogleCloudMlV1__Measurement> = Schema.suspend(() => Schema.Struct({
  stepCount: Schema.optional(Schema.String),
  elapsedTime: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(GoogleCloudMlV1_Measurement_Metric)),
})).annotate({ identifier: "GoogleCloudMlV1__Measurement" }) as any as Schema.Schema<GoogleCloudMlV1__Measurement>;

export interface GoogleIamV1__TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const GoogleIamV1__TestIamPermissionsRequest: Schema.Schema<GoogleIamV1__TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1__TestIamPermissionsRequest" }) as any as Schema.Schema<GoogleIamV1__TestIamPermissionsRequest>;

export interface GoogleCloudMlV1__DiskConfig {
  /** Size in GB of the boot disk (default is 100GB). */
  bootDiskSizeGb?: number;
  /** Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive). */
  bootDiskType?: string;
}

export const GoogleCloudMlV1__DiskConfig: Schema.Schema<GoogleCloudMlV1__DiskConfig> = Schema.suspend(() => Schema.Struct({
  bootDiskSizeGb: Schema.optional(Schema.Number),
  bootDiskType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__DiskConfig" }) as any as Schema.Schema<GoogleCloudMlV1__DiskConfig>;

export interface GoogleCloudMlV1__ReplicaConfig {
  /** Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time. */
  containerArgs?: Array<string>;
  /** Represents the configuration of disk options. */
  diskConfig?: GoogleCloudMlV1__DiskConfig;
  /** The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`. */
  tpuTfVersion?: string;
  /** The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time. */
  containerCommand?: Array<string>;
  /** Represents the type and number of accelerators used by the replica. [Learn about restrictions on accelerator configurations for training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu) */
  acceleratorConfig?: GoogleCloudMlV1__AcceleratorConfig;
  /** The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers). */
  imageUri?: string;
}

export const GoogleCloudMlV1__ReplicaConfig: Schema.Schema<GoogleCloudMlV1__ReplicaConfig> = Schema.suspend(() => Schema.Struct({
  containerArgs: Schema.optional(Schema.Array(Schema.String)),
  diskConfig: Schema.optional(GoogleCloudMlV1__DiskConfig),
  tpuTfVersion: Schema.optional(Schema.String),
  containerCommand: Schema.optional(Schema.Array(Schema.String)),
  acceleratorConfig: Schema.optional(GoogleCloudMlV1__AcceleratorConfig),
  imageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__ReplicaConfig" }) as any as Schema.Schema<GoogleCloudMlV1__ReplicaConfig>;

export interface GoogleCloudMlV1__Config {
  /** The service account Cloud ML uses to run on TPU node. */
  tpuServiceAccount?: string;
}

export const GoogleCloudMlV1__Config: Schema.Schema<GoogleCloudMlV1__Config> = Schema.suspend(() => Schema.Struct({
  tpuServiceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Config" }) as any as Schema.Schema<GoogleCloudMlV1__Config>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec {
  /** Matches values of the parent parameter with type 'INTEGER'. All values must lie in `integer_value_spec` of parent parameter. */
  values?: Array<string>;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec>;

export interface GoogleCloudMlV1__EncryptionConfig {
  /** The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource, such as a training job. It has the following format: `projects/{PROJECT_ID}/locations/{REGION}/keyRings/{KEY_RING_NAME}/cryptoKeys/{KEY_NAME}` */
  kmsKeyName?: string;
}

export const GoogleCloudMlV1__EncryptionConfig: Schema.Schema<GoogleCloudMlV1__EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__EncryptionConfig" }) as any as Schema.Schema<GoogleCloudMlV1__EncryptionConfig>;

export interface GoogleCloudMlV1__Capability {
  type?: "TYPE_UNSPECIFIED" | "TRAINING" | "BATCH_PREDICTION" | "ONLINE_PREDICTION" | (string & {});
  /** Available accelerators for the capability. */
  availableAccelerators?: Array<"ACCELERATOR_TYPE_UNSPECIFIED" | "NVIDIA_TESLA_K80" | "NVIDIA_TESLA_P100" | "NVIDIA_TESLA_V100" | "NVIDIA_TESLA_P4" | "NVIDIA_TESLA_T4" | "NVIDIA_TESLA_A100" | "TPU_V2" | "TPU_V3" | "TPU_V2_POD" | "TPU_V3_POD" | "TPU_V4_POD" | (string & {})>;
}

export const GoogleCloudMlV1__Capability: Schema.Schema<GoogleCloudMlV1__Capability> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  availableAccelerators: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudMlV1__Capability" }) as any as Schema.Schema<GoogleCloudMlV1__Capability>;

export interface GoogleCloudMlV1__Location {
  /** Capabilities available in the location. */
  capabilities?: Array<GoogleCloudMlV1__Capability>;
  name?: string;
}

export const GoogleCloudMlV1__Location: Schema.Schema<GoogleCloudMlV1__Location> = Schema.suspend(() => Schema.Struct({
  capabilities: Schema.optional(Schema.Array(GoogleCloudMlV1__Capability)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Location" }) as any as Schema.Schema<GoogleCloudMlV1__Location>;

export interface GoogleCloudMlV1__CompleteTrialRequest {
  /** Optional. A human readable reason why the trial was infeasible. This should only be provided if `trial_infeasible` is true. */
  infeasibleReason?: string;
  /** Optional. If provided, it will be used as the completed trial's final_measurement; Otherwise, the service will auto-select a previously reported measurement as the final-measurement */
  finalMeasurement?: GoogleCloudMlV1__Measurement;
  /** Optional. True if the trial cannot be run with the given Parameter, and final_measurement will be ignored. */
  trialInfeasible?: boolean;
}

export const GoogleCloudMlV1__CompleteTrialRequest: Schema.Schema<GoogleCloudMlV1__CompleteTrialRequest> = Schema.suspend(() => Schema.Struct({
  infeasibleReason: Schema.optional(Schema.String),
  finalMeasurement: Schema.optional(GoogleCloudMlV1__Measurement),
  trialInfeasible: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudMlV1__CompleteTrialRequest" }) as any as Schema.Schema<GoogleCloudMlV1__CompleteTrialRequest>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec {
  /** Must be specified if type is `DOUBLE`. Minimum value of the parameter. */
  minValue?: number;
  /** Must be specified if type is `DOUBLE`. Maximum value of the parameter. */
  maxValue?: number;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec> = Schema.suspend(() => Schema.Struct({
  minValue: Schema.optional(Schema.Number),
  maxValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec>;

export interface GoogleCloudMlV1__CancelJobRequest {
}

export const GoogleCloudMlV1__CancelJobRequest: Schema.Schema<GoogleCloudMlV1__CancelJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudMlV1__CancelJobRequest" }) as any as Schema.Schema<GoogleCloudMlV1__CancelJobRequest>;

export interface GoogleCloudMlV1_Trial_Parameter {
  /** Must be set if ParameterTypeis CATEGORICAL */
  stringValue?: string;
  /** The name of the parameter. */
  parameter?: string;
  /** Must be set if ParameterType is DOUBLE or DISCRETE. */
  floatValue?: number;
  /** Must be set if ParameterType is INTEGER */
  intValue?: string;
}

export const GoogleCloudMlV1_Trial_Parameter: Schema.Schema<GoogleCloudMlV1_Trial_Parameter> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.String),
  floatValue: Schema.optional(Schema.Number),
  intValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1_Trial_Parameter" }) as any as Schema.Schema<GoogleCloudMlV1_Trial_Parameter>;

export interface GoogleCloudMlV1__Trial {
  /** Output only. The identifier of the client that originally requested this trial. */
  clientId?: string;
  /** Output only. A human readable string describing why the trial is infeasible. This should only be set if trial_infeasible is true. */
  infeasibleReason?: string;
  /** A list of measurements that are strictly lexicographically ordered by their induced tuples (steps, elapsed_time). These are used for early stopping computations. */
  measurements?: Array<GoogleCloudMlV1__Measurement>;
  /** Output only. If true, the parameters in this trial are not attempted again. */
  trialInfeasible?: boolean;
  /** The parameters of the trial. */
  parameters?: Array<GoogleCloudMlV1_Trial_Parameter>;
  /** Output only. Name of the trial assigned by the service. */
  name?: string;
  /** The detailed state of a trial. */
  state?: "STATE_UNSPECIFIED" | "REQUESTED" | "ACTIVE" | "COMPLETED" | "STOPPING" | (string & {});
  /** Output only. Time at which the trial was started. */
  startTime?: string;
  /** The final measurement containing the objective value. */
  finalMeasurement?: GoogleCloudMlV1__Measurement;
  /** Output only. Time at which the trial's status changed to COMPLETED. */
  endTime?: string;
}

export const GoogleCloudMlV1__Trial: Schema.Schema<GoogleCloudMlV1__Trial> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  infeasibleReason: Schema.optional(Schema.String),
  measurements: Schema.optional(Schema.Array(GoogleCloudMlV1__Measurement)),
  trialInfeasible: Schema.optional(Schema.Boolean),
  parameters: Schema.optional(Schema.Array(GoogleCloudMlV1_Trial_Parameter)),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  finalMeasurement: Schema.optional(GoogleCloudMlV1__Measurement),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Trial" }) as any as Schema.Schema<GoogleCloudMlV1__Trial>;

export interface GoogleCloudMlV1__ListTrialsResponse {
  /** The trials associated with the study. */
  trials?: Array<GoogleCloudMlV1__Trial>;
}

export const GoogleCloudMlV1__ListTrialsResponse: Schema.Schema<GoogleCloudMlV1__ListTrialsResponse> = Schema.suspend(() => Schema.Struct({
  trials: Schema.optional(Schema.Array(GoogleCloudMlV1__Trial)),
})).annotate({ identifier: "GoogleCloudMlV1__ListTrialsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListTrialsResponse>;

export interface GoogleIamV1__TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const GoogleIamV1__TestIamPermissionsResponse: Schema.Schema<GoogleIamV1__TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1__TestIamPermissionsResponse" }) as any as Schema.Schema<GoogleIamV1__TestIamPermissionsResponse>;

export interface GoogleRpc__Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const GoogleRpc__Status: Schema.Schema<GoogleRpc__Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleRpc__Status" }) as any as Schema.Schema<GoogleRpc__Status>;

export interface GoogleProtobuf__Empty {
}

export const GoogleProtobuf__Empty: Schema.Schema<GoogleProtobuf__Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobuf__Empty" }) as any as Schema.Schema<GoogleProtobuf__Empty>;

export interface GoogleCloudMlV1_StudyConfig_MetricSpec {
  /** Required. The optimization goal of the metric. */
  goal?: "GOAL_TYPE_UNSPECIFIED" | "MAXIMIZE" | "MINIMIZE" | (string & {});
  /** Required. The name of the metric. */
  metric?: string;
}

export const GoogleCloudMlV1_StudyConfig_MetricSpec: Schema.Schema<GoogleCloudMlV1_StudyConfig_MetricSpec> = Schema.suspend(() => Schema.Struct({
  goal: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfig_MetricSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfig_MetricSpec>;

export interface GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata {
  /** The trial name. */
  trial?: string;
  /** The time at which the operation was submitted. */
  createTime?: string;
  /** The name of the study that the trial belongs to. */
  study?: string;
}

export const GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata: Schema.Schema<GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata> = Schema.suspend(() => Schema.Struct({
  trial: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  study: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata" }) as any as Schema.Schema<GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata>;

export interface GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest {
}

export const GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest: Schema.Schema<GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest" }) as any as Schema.Schema<GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest>;

export interface GoogleCloudMlV1__SuggestTrialsRequest {
  /** Required. The number of suggestions requested. */
  suggestionCount?: number;
  /** Required. The identifier of the client that is requesting the suggestion. If multiple SuggestTrialsRequests have the same `client_id`, the service will return the identical suggested trial if the trial is pending, and provide a new trial if the last suggested trial was completed. */
  clientId?: string;
}

export const GoogleCloudMlV1__SuggestTrialsRequest: Schema.Schema<GoogleCloudMlV1__SuggestTrialsRequest> = Schema.suspend(() => Schema.Struct({
  suggestionCount: Schema.optional(Schema.Number),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__SuggestTrialsRequest" }) as any as Schema.Schema<GoogleCloudMlV1__SuggestTrialsRequest>;

export interface GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse {
  /** The time at which the operation was started. */
  startTime?: string;
  /** The time at which operation processing completed. */
  endTime?: string;
  /** True if the Trial should stop. */
  shouldStop?: boolean;
}

export const GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse: Schema.Schema<GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  shouldStop: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse" }) as any as Schema.Schema<GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse>;

export interface GoogleCloudMlV1__ListOptimalTrialsResponse {
  /** The pareto-optimal trials for multiple objective study or the optimal trial for single objective study. The definition of pareto-optimal can be checked in wiki page. https://en.wikipedia.org/wiki/Pareto_efficiency */
  trials?: Array<GoogleCloudMlV1__Trial>;
}

export const GoogleCloudMlV1__ListOptimalTrialsResponse: Schema.Schema<GoogleCloudMlV1__ListOptimalTrialsResponse> = Schema.suspend(() => Schema.Struct({
  trials: Schema.optional(Schema.Array(GoogleCloudMlV1__Trial)),
})).annotate({ identifier: "GoogleCloudMlV1__ListOptimalTrialsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListOptimalTrialsResponse>;

export interface GoogleCloudMlV1__SetDefaultVersionRequest {
}

export const GoogleCloudMlV1__SetDefaultVersionRequest: Schema.Schema<GoogleCloudMlV1__SetDefaultVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudMlV1__SetDefaultVersionRequest" }) as any as Schema.Schema<GoogleCloudMlV1__SetDefaultVersionRequest>;

export interface GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig {
  /** If true, measurement.elapsed_time is used as the x-axis of each Trials Decay Curve. Otherwise, Measurement.steps will be used as the x-axis. */
  useElapsedTime?: boolean;
}

export const GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig: Schema.Schema<GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig> = Schema.suspend(() => Schema.Struct({
  useElapsedTime: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig" }) as any as Schema.Schema<GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig>;

export interface GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig {
  /** If true, the median automated stopping rule applies to measurement.use_elapsed_time, which means the elapsed_time field of the current trial's latest measurement is used to compute the median objective value for each completed trial. */
  useElapsedTime?: boolean;
}

export const GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig: Schema.Schema<GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig> = Schema.suspend(() => Schema.Struct({
  useElapsedTime: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig" }) as any as Schema.Schema<GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig>;

export interface GoogleCloudMlV1__AutomatedStoppingConfig {
  decayCurveStoppingConfig?: GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig;
  medianAutomatedStoppingConfig?: GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig;
}

export const GoogleCloudMlV1__AutomatedStoppingConfig: Schema.Schema<GoogleCloudMlV1__AutomatedStoppingConfig> = Schema.suspend(() => Schema.Struct({
  decayCurveStoppingConfig: Schema.optional(GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig),
  medianAutomatedStoppingConfig: Schema.optional(GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig),
})).annotate({ identifier: "GoogleCloudMlV1__AutomatedStoppingConfig" }) as any as Schema.Schema<GoogleCloudMlV1__AutomatedStoppingConfig>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec {
  /** Matches values of the parent parameter with type 'DISCRETE'. All values must exist in `discrete_value_spec` of parent parameter. */
  values?: Array<number>;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec {
  /** Must be specified if type is `DISCRETE`. A list of feasible points. The list should be in strictly increasing order. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values. */
  values?: Array<number>;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec {
  /** Must be specified if type is `INTEGER`. Maximum value of the parameter. */
  maxValue?: string;
  /** Must be specified if type is `INTEGER`. Minimum value of the parameter. */
  minValue?: string;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec> = Schema.suspend(() => Schema.Struct({
  maxValue: Schema.optional(Schema.String),
  minValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec {
  /** Must be specified if type is `CATEGORICAL`. The list of possible categories. */
  values?: Array<string>;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec>;

export interface GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec {
  /** Matches values of the parent parameter with type 'CATEGORICAL'. All values must exist in `categorical_value_spec` of parent parameter. */
  values?: Array<string>;
}

export const GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec: Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec>;

export interface GoogleCloudMlV1_StudyConfig_ParameterSpec {
  /** The value spec for a 'DOUBLE' parameter. */
  doubleValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec;
  parentDiscreteValues?: GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec;
  /** How the parameter should be scaled. Leave unset for categorical parameters. */
  scaleType?: "SCALE_TYPE_UNSPECIFIED" | "UNIT_LINEAR_SCALE" | "UNIT_LOG_SCALE" | "UNIT_REVERSE_LOG_SCALE" | (string & {});
  /** The value spec for a 'DISCRETE' parameter. */
  discreteValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec;
  /** Required. The parameter name must be unique amongst all ParameterSpecs. */
  parameter?: string;
  parentIntValues?: GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec;
  /** The value spec for an 'INTEGER' parameter. */
  integerValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec;
  /** Required. The type of the parameter. */
  type?: "PARAMETER_TYPE_UNSPECIFIED" | "DOUBLE" | "INTEGER" | "CATEGORICAL" | "DISCRETE" | (string & {});
  /** The value spec for a 'CATEGORICAL' parameter. */
  categoricalValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec;
  /** A child node is active if the parameter's value matches the child node's matching_parent_values. If two items in child_parameter_specs have the same name, they must have disjoint matching_parent_values. */
  childParameterSpecs?: Array<GoogleCloudMlV1_StudyConfig_ParameterSpec>;
  parentCategoricalValues?: GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec;
}

export const GoogleCloudMlV1_StudyConfig_ParameterSpec: Schema.Schema<GoogleCloudMlV1_StudyConfig_ParameterSpec> = Schema.suspend(() => Schema.Struct({
  doubleValueSpec: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec),
  parentDiscreteValues: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec),
  scaleType: Schema.optional(Schema.String),
  discreteValueSpec: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec),
  parameter: Schema.optional(Schema.String),
  parentIntValues: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec),
  integerValueSpec: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec),
  type: Schema.optional(Schema.String),
  categoricalValueSpec: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec),
  childParameterSpecs: Schema.optional(Schema.Array(GoogleCloudMlV1_StudyConfig_ParameterSpec)),
  parentCategoricalValues: Schema.optional(GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec),
})).annotate({ identifier: "GoogleCloudMlV1_StudyConfig_ParameterSpec" }) as any as Schema.Schema<GoogleCloudMlV1_StudyConfig_ParameterSpec>;

export interface GoogleCloudMlV1__StudyConfig {
  /** Configuration for automated stopping of unpromising Trials. */
  automatedStoppingConfig?: GoogleCloudMlV1__AutomatedStoppingConfig;
  /** The search algorithm specified for the study. */
  algorithm?: "ALGORITHM_UNSPECIFIED" | "GAUSSIAN_PROCESS_BANDIT" | "GRID_SEARCH" | "RANDOM_SEARCH" | (string & {});
  /** Metric specs for the study. */
  metrics?: Array<GoogleCloudMlV1_StudyConfig_MetricSpec>;
  /** Required. The set of parameters to tune. */
  parameters?: Array<GoogleCloudMlV1_StudyConfig_ParameterSpec>;
}

export const GoogleCloudMlV1__StudyConfig: Schema.Schema<GoogleCloudMlV1__StudyConfig> = Schema.suspend(() => Schema.Struct({
  automatedStoppingConfig: Schema.optional(GoogleCloudMlV1__AutomatedStoppingConfig),
  algorithm: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(GoogleCloudMlV1_StudyConfig_MetricSpec)),
  parameters: Schema.optional(Schema.Array(GoogleCloudMlV1_StudyConfig_ParameterSpec)),
})).annotate({ identifier: "GoogleCloudMlV1__StudyConfig" }) as any as Schema.Schema<GoogleCloudMlV1__StudyConfig>;

export interface GoogleCloudMlV1__Study {
  /** Output only. A human readable reason why the Study is inactive. This should be empty if a study is ACTIVE or COMPLETED. */
  inactiveReason?: string;
  /** Output only. The name of a study. */
  name?: string;
  /** Required. Configuration of the study. */
  studyConfig?: GoogleCloudMlV1__StudyConfig;
  /** Output only. The detailed state of a study. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | "COMPLETED" | (string & {});
  /** Output only. Time at which the study was created. */
  createTime?: string;
}

export const GoogleCloudMlV1__Study: Schema.Schema<GoogleCloudMlV1__Study> = Schema.suspend(() => Schema.Struct({
  inactiveReason: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  studyConfig: Schema.optional(GoogleCloudMlV1__StudyConfig),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Study" }) as any as Schema.Schema<GoogleCloudMlV1__Study>;

export interface GoogleCloudMlV1__ParameterSpec {
  /** Optional. How the parameter should be scaled to the hypercube. Leave unset for categorical parameters. Some kind of scaling is strongly recommended for real or integral parameters (e.g., `UNIT_LINEAR_SCALE`). */
  scaleType?: "NONE" | "UNIT_LINEAR_SCALE" | "UNIT_LOG_SCALE" | "UNIT_REVERSE_LOG_SCALE" | (string & {});
  /** Required if type is `CATEGORICAL`. The list of possible categories. */
  categoricalValues?: Array<string>;
  /** Required if type is `DOUBLE` or `INTEGER`. This field should be unset if type is `CATEGORICAL`. This value should be integers if type is `INTEGER`. */
  maxValue?: number;
  /** Required if type is `DISCRETE`. A list of feasible points. The list should be in strictly increasing order. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values. */
  discreteValues?: Array<number>;
  /** Required if type is `DOUBLE` or `INTEGER`. This field should be unset if type is `CATEGORICAL`. This value should be integers if type is INTEGER. */
  minValue?: number;
  /** Required. The type of the parameter. */
  type?: "PARAMETER_TYPE_UNSPECIFIED" | "DOUBLE" | "INTEGER" | "CATEGORICAL" | "DISCRETE" | (string & {});
  /** Required. The parameter name must be unique amongst all ParameterConfigs in a HyperparameterSpec message. E.g., "learning_rate". */
  parameterName?: string;
}

export const GoogleCloudMlV1__ParameterSpec: Schema.Schema<GoogleCloudMlV1__ParameterSpec> = Schema.suspend(() => Schema.Struct({
  scaleType: Schema.optional(Schema.String),
  categoricalValues: Schema.optional(Schema.Array(Schema.String)),
  maxValue: Schema.optional(Schema.Number),
  discreteValues: Schema.optional(Schema.Array(Schema.Number)),
  minValue: Schema.optional(Schema.Number),
  type: Schema.optional(Schema.String),
  parameterName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__ParameterSpec" }) as any as Schema.Schema<GoogleCloudMlV1__ParameterSpec>;

export interface GoogleIamV1__AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const GoogleIamV1__AuditLogConfig: Schema.Schema<GoogleIamV1__AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1__AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1__AuditLogConfig>;

export interface GoogleIamV1__AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1__AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const GoogleIamV1__AuditConfig: Schema.Schema<GoogleIamV1__AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1__AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1__AuditConfig" }) as any as Schema.Schema<GoogleIamV1__AuditConfig>;

export interface GoogleCloudMlV1__PredictionInput {
  /** Optional. Number of records per batch, defaults to 64. The service will buffer batch_size number of records in memory before invoking one Tensorflow prediction call internally. So take the record size and memory available into consideration when setting this parameter. */
  batchSize?: string;
  /** Required. The output Google Cloud Storage location. */
  outputPath?: string;
  /** Optional. Format of the output data files, defaults to JSON. */
  outputDataFormat?: "DATA_FORMAT_UNSPECIFIED" | "JSON" | "TEXT" | "TF_RECORD" | "TF_RECORD_GZIP" | "CSV" | (string & {});
  /** Use this field if you want to specify a version of the model to use. The string is formatted the same way as `model_version`, with the addition of the version information: `"projects/YOUR_PROJECT/models/YOUR_MODEL/versions/YOUR_VERSION"` */
  versionName?: string;
  /** Optional. The name of the signature defined in the SavedModel to use for this job. Please refer to [SavedModel](https://tensorflow.github.io/serving/serving_basic.html) for information about how to use signatures. Defaults to [DEFAULT_SERVING_SIGNATURE_DEF_KEY](https://www.tensorflow.org/api_docs/python/tf/saved_model/signature_constants) , which is "serving_default". */
  signatureName?: string;
  /** Optional. The maximum number of workers to be used for parallel processing. Defaults to 10 if not specified. */
  maxWorkerCount?: string;
  /** Optional. The AI Platform runtime version to use for this batch prediction. If not set, AI Platform will pick the runtime version used during the CreateVersion request for this model version, or choose the latest stable version when model version information is not available such as when the model is specified by uri. */
  runtimeVersion?: string;
  /** Required. The Google Compute Engine region to run the prediction job in. See the available regions for AI Platform services. */
  region?: string;
  /** Use this field if you want to specify a Google Cloud Storage path for the model to use. */
  uri?: string;
  /** Use this field if you want to use the default version for the specified model. The string must use the following format: `"projects/YOUR_PROJECT/models/YOUR_MODEL"` */
  modelName?: string;
  /** Required. The format of the input data files. */
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "JSON" | "TEXT" | "TF_RECORD" | "TF_RECORD_GZIP" | "CSV" | (string & {});
  /** Required. The Cloud Storage location of the input data files. May contain wildcards. */
  inputPaths?: Array<string>;
}

export const GoogleCloudMlV1__PredictionInput: Schema.Schema<GoogleCloudMlV1__PredictionInput> = Schema.suspend(() => Schema.Struct({
  batchSize: Schema.optional(Schema.String),
  outputPath: Schema.optional(Schema.String),
  outputDataFormat: Schema.optional(Schema.String),
  versionName: Schema.optional(Schema.String),
  signatureName: Schema.optional(Schema.String),
  maxWorkerCount: Schema.optional(Schema.String),
  runtimeVersion: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  modelName: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
  inputPaths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudMlV1__PredictionInput" }) as any as Schema.Schema<GoogleCloudMlV1__PredictionInput>;

export interface GoogleCloudMlV1__PredictionOutput {
  /** The output Google Cloud Storage location provided at the job creation time. */
  outputPath?: string;
  /** The number of generated predictions. */
  predictionCount?: string;
  /** Node hours used by the batch prediction job. */
  nodeHours?: number;
  /** The number of data instances which resulted in errors. */
  errorCount?: string;
}

export const GoogleCloudMlV1__PredictionOutput: Schema.Schema<GoogleCloudMlV1__PredictionOutput> = Schema.suspend(() => Schema.Struct({
  outputPath: Schema.optional(Schema.String),
  predictionCount: Schema.optional(Schema.String),
  nodeHours: Schema.optional(Schema.Number),
  errorCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__PredictionOutput" }) as any as Schema.Schema<GoogleCloudMlV1__PredictionOutput>;

export interface GoogleCloudMlV1__Scheduling {
  /** Optional. Job scheduling will be based on this priority, which in the range [0, 1000]. The bigger the number, the higher the priority. Default to 0 if not set. If there are multiple jobs requesting same type of accelerators, the high priority job will be scheduled prior to ones with low priority. */
  priority?: number;
  /** Optional. The maximum job wait time, expressed in seconds. The field can contain up to nine fractional digits, terminated by `s`. If not specified, there is no limit to the wait time. The minimum for this field is `1800s` (30 minutes). If the training job has not entered the `RUNNING` state after this duration, AI Platform Training cancels it. After the job begins running, it can no longer be cancelled due to the maximum wait time. Therefore the duration limited by this field does not overlap with the duration limited by Scheduling.max_running_time. For example, if the job temporarily stops running and retries due to a [VM restart](/ai-platform/training/docs/overview#restarts), this cannot lead to a maximum wait time cancellation. However, independently of this constraint, AI Platform Training might stop a job if there are too many retries due to exhausted resources in a region. The following example describes how you might use this field: To cancel your job if it doesn't start running within 1 hour, set this field to `3600s` (1 hour * 60 minutes / hour * 60 seconds / minute). If the job is still in the `QUEUED` or `PREPARING` state after an hour of waiting, AI Platform Training cancels the job. If you submit your training job using the `gcloud` tool, you can [specify this field in a `config.yaml` file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters). For example: ```yaml trainingInput: scheduling: maxWaitTime: 3600s ``` */
  maxWaitTime?: string;
  /** Optional. The maximum job running time, expressed in seconds. The field can contain up to nine fractional digits, terminated by `s`. If not specified, this field defaults to `604800s` (seven days). If the training job is still running after this duration, AI Platform Training cancels it. The duration is measured from when the job enters the `RUNNING` state; therefore it does not overlap with the duration limited by Scheduling.max_wait_time. For example, if you want to ensure your job runs for no more than 2 hours, set this field to `7200s` (2 hours * 60 minutes / hour * 60 seconds / minute). If you submit your training job using the `gcloud` tool, you can [specify this field in a `config.yaml` file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters). For example: ```yaml trainingInput: scheduling: maxRunningTime: 7200s ``` */
  maxRunningTime?: string;
}

export const GoogleCloudMlV1__Scheduling: Schema.Schema<GoogleCloudMlV1__Scheduling> = Schema.suspend(() => Schema.Struct({
  priority: Schema.optional(Schema.Number),
  maxWaitTime: Schema.optional(Schema.String),
  maxRunningTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Scheduling" }) as any as Schema.Schema<GoogleCloudMlV1__Scheduling>;

export interface GoogleCloudMlV1__HyperparameterSpec {
  /** Required. The type of goal to use for tuning. Available types are `MAXIMIZE` and `MINIMIZE`. Defaults to `MAXIMIZE`. */
  goal?: "GOAL_TYPE_UNSPECIFIED" | "MAXIMIZE" | "MINIMIZE" | (string & {});
  /** Optional. The search algorithm specified for the hyperparameter tuning job. Uses the default AI Platform hyperparameter tuning algorithm if unspecified. */
  algorithm?: "ALGORITHM_UNSPECIFIED" | "GRID_SEARCH" | "RANDOM_SEARCH" | (string & {});
  /** Optional. The number of failed trials that need to be seen before failing the hyperparameter tuning job. You can specify this field to override the default failing criteria for AI Platform hyperparameter tuning jobs. Defaults to zero, which means the service decides when a hyperparameter job should fail. */
  maxFailedTrials?: number;
  /** Optional. The prior hyperparameter tuning job id that users hope to continue with. The job id will be used to find the corresponding vizier study guid and resume the study. */
  resumePreviousJobId?: string;
  /** Optional. Indicates if the hyperparameter tuning job enables auto trial early stopping. */
  enableTrialEarlyStopping?: boolean;
  /** Required. The set of parameters to tune. */
  params?: Array<GoogleCloudMlV1__ParameterSpec>;
  /** Optional. The TensorFlow summary tag name to use for optimizing trials. For current versions of TensorFlow, this tag name should exactly match what is shown in TensorBoard, including all scopes. For versions of TensorFlow prior to 0.12, this should be only the tag passed to tf.Summary. By default, "training/hptuning/metric" will be used. */
  hyperparameterMetricTag?: string;
  /** Optional. The number of training trials to run concurrently. You can reduce the time it takes to perform hyperparameter tuning by adding trials in parallel. However, each trail only benefits from the information gained in completed trials. That means that a trial does not get access to the results of trials running at the same time, which could reduce the quality of the overall optimization. Each trial will use the same scale tier and machine types. Defaults to one. */
  maxParallelTrials?: number;
  /** Optional. How many training trials should be attempted to optimize the specified hyperparameters. Defaults to one. */
  maxTrials?: number;
}

export const GoogleCloudMlV1__HyperparameterSpec: Schema.Schema<GoogleCloudMlV1__HyperparameterSpec> = Schema.suspend(() => Schema.Struct({
  goal: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
  maxFailedTrials: Schema.optional(Schema.Number),
  resumePreviousJobId: Schema.optional(Schema.String),
  enableTrialEarlyStopping: Schema.optional(Schema.Boolean),
  params: Schema.optional(Schema.Array(GoogleCloudMlV1__ParameterSpec)),
  hyperparameterMetricTag: Schema.optional(Schema.String),
  maxParallelTrials: Schema.optional(Schema.Number),
  maxTrials: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudMlV1__HyperparameterSpec" }) as any as Schema.Schema<GoogleCloudMlV1__HyperparameterSpec>;

export interface GoogleCloudMlV1__TrainingInput {
  /** Optional. The configuration for workers. You should only set `workerConfig.acceleratorConfig` if `workerType` is set to a Compute Engine machine type. [Learn about restrictions on accelerator configurations for training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu) Set `workerConfig.imageUri` only if you build a custom image for your worker. If `workerConfig.imageUri` has not been set, AI Platform uses the value of `masterConfig.imageUri`. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers). */
  workerConfig?: GoogleCloudMlV1__ReplicaConfig;
  /** Optional. Scheduling options for a training job. */
  scheduling?: GoogleCloudMlV1__Scheduling;
  /** Optional. A Google Cloud Storage path in which to store training outputs and other data needed for training. This path is passed to your TensorFlow program as the '--job-dir' command-line argument. The benefit of specifying this field is that Cloud ML validates the path for use in training. */
  jobDir?: string;
  /** Optional. The version of Python used in training. You must either specify this field or specify `masterConfig.imageUri`. The following Python versions are available: * Python '3.7' is available when `runtime_version` is set to '1.15' or later. * Python '3.5' is available when `runtime_version` is set to a version from '1.4' to '1.14'. * Python '2.7' is available when `runtime_version` is set to '1.15' or earlier. Read more about the Python versions available for [each runtime version](/ml-engine/docs/runtime-version-list). */
  pythonVersion?: string;
  /** Optional. The number of worker replicas to use for the training job. Each replica in the cluster will be of the type specified in `worker_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `worker_type`. The default value is zero. */
  workerCount?: string;
  /** Optional. Command-line arguments passed to the training application when it starts. If your job uses a custom container, then the arguments are passed to the container's `ENTRYPOINT` command. */
  args?: Array<string>;
  /** Required. The region to run the training job in. See the [available regions](/ai-platform/training/docs/regions) for AI Platform Training. */
  region?: string;
  /** Optional. Specifies the type of virtual machine to use for your training job's parameter server. The supported values are the same as those described in the entry for `master_type`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. This value must be present when `scaleTier` is set to `CUSTOM` and `parameter_server_count` is greater than zero. */
  parameterServerType?: string;
  /** Optional. Use `chief` instead of `master` in the `TF_CONFIG` environment variable when training with a custom container. Defaults to `false`. [Learn more about this field.](/ai-platform/training/docs/distributed-training-details#chief-versus-master) This field has no effect for training jobs that don't use a custom container. */
  useChiefInTfConfig?: boolean;
  /** Optional. Specifies the type of virtual machine to use for your training job's worker nodes. The supported values are the same as those described in the entry for `masterType`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. If you use `cloud_tpu` for this value, see special instructions for [configuring a custom TPU machine](/ml-engine/docs/tensorflow/using-tpus#configuring_a_custom_tpu_machine). This value must be present when `scaleTier` is set to `CUSTOM` and `workerCount` is greater than zero. */
  workerType?: string;
  /** Required. Specifies the machine types, the number of replicas for workers and parameter servers. */
  scaleTier?: "BASIC" | "STANDARD_1" | "PREMIUM_1" | "BASIC_GPU" | "BASIC_TPU" | "CUSTOM" | (string & {});
  /** Optional. The number of evaluator replicas to use for the training job. Each replica in the cluster will be of the type specified in `evaluator_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `evaluator_type`. The default value is zero. */
  evaluatorCount?: string;
  /** Optional. The configuration for evaluators. You should only set `evaluatorConfig.acceleratorConfig` if `evaluatorType` is set to a Compute Engine machine type. [Learn about restrictions on accelerator configurations for training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu) Set `evaluatorConfig.imageUri` only if you build a custom image for your evaluator. If `evaluatorConfig.imageUri` has not been set, AI Platform uses the value of `masterConfig.imageUri`. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers). */
  evaluatorConfig?: GoogleCloudMlV1__ReplicaConfig;
  /** Optional. Specifies the type of virtual machine to use for your training job's evaluator nodes. The supported values are the same as those described in the entry for `masterType`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. This value must be present when `scaleTier` is set to `CUSTOM` and `evaluatorCount` is greater than zero. */
  evaluatorType?: string;
  /** Optional. The configuration for your master worker. You should only set `masterConfig.acceleratorConfig` if `masterType` is set to a Compute Engine machine type. Learn about [restrictions on accelerator configurations for training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu) Set `masterConfig.imageUri` only if you build a custom image. Only one of `masterConfig.imageUri` and `runtimeVersion` should be set. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers). */
  masterConfig?: GoogleCloudMlV1__ReplicaConfig;
  /** Optional. The number of parameter server replicas to use for the training job. Each replica in the cluster will be of the type specified in `parameter_server_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `parameter_server_type`. The default value is zero. */
  parameterServerCount?: string;
  /** Optional. The email address of a service account to use when running the training appplication. You must have the `iam.serviceAccounts.actAs` permission for the specified service account. In addition, the AI Platform Training Google-managed service account must have the `roles/iam.serviceAccountAdmin` role for the specified service account. [Learn more about configuring a service account.](/ai-platform/training/docs/custom-service-account) If not specified, the AI Platform Training Google-managed service account is used by default. */
  serviceAccount?: string;
  /** Optional. Specifies the type of virtual machine to use for your training job's master worker. You must specify this field when `scaleTier` is set to `CUSTOM`. You can use certain Compute Engine machine types directly in this field. See the [list of compatible Compute Engine machine types](/ai-platform/training/docs/machine-types#compute-engine-machine-types). Alternatively, you can use the certain legacy machine types in this field. See the [list of legacy machine types](/ai-platform/training/docs/machine-types#legacy-machine-types). Finally, if you want to use a TPU for training, specify `cloud_tpu` in this field. Learn more about the [special configuration options for training with TPUs](/ai-platform/training/docs/using-tpus#configuring_a_custom_tpu_machine). */
  masterType?: string;
  /** Optional. Whether you want AI Platform Training to enable [interactive shell access](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by TrainingOutput.web_access_uris or HyperparameterOutput.web_access_uris (within TrainingOutput.trials). */
  enableWebAccess?: boolean;
  /** Required. The Google Cloud Storage location of the packages with the training program and any additional dependencies. The maximum number of package URIs is 100. */
  packageUris?: Array<string>;
  /** Optional. The full name of the [Compute Engine network](/vpc/docs/vpc) to which the Job is peered. For example, `projects/12345/global/networks/myVPC`. The format of this field is `projects/{project}/global/networks/{network}`, where {project} is a project number (like `12345`) and {network} is network name. Private services access must already be configured for the network. If left unspecified, the Job is not peered with any network. [Learn about using VPC Network Peering.](/ai-platform/training/docs/vpc-peering). */
  network?: string;
  /** Optional. The configuration for parameter servers. You should only set `parameterServerConfig.acceleratorConfig` if `parameterServerType` is set to a Compute Engine machine type. [Learn about restrictions on accelerator configurations for training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu) Set `parameterServerConfig.imageUri` only if you build a custom image for your parameter server. If `parameterServerConfig.imageUri` has not been set, AI Platform uses the value of `masterConfig.imageUri`. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers). */
  parameterServerConfig?: GoogleCloudMlV1__ReplicaConfig;
  /** Optional. The AI Platform runtime version to use for training. You must either specify this field or specify `masterConfig.imageUri`. For more information, see the [runtime version list](/ai-platform/training/docs/runtime-version-list) and learn [how to manage runtime versions](/ai-platform/training/docs/versioning). */
  runtimeVersion?: string;
  /** Optional. Options for using customer-managed encryption keys (CMEK) to protect resources created by a training job, instead of using Google's default encryption. If this is set, then all resources created by the training job will be encrypted with the customer-managed encryption key that you specify. [Learn how and when to use CMEK with AI Platform Training](/ai-platform/training/docs/cmek). */
  encryptionConfig?: GoogleCloudMlV1__EncryptionConfig;
  /** Optional. The set of Hyperparameters to tune. */
  hyperparameters?: GoogleCloudMlV1__HyperparameterSpec;
  /** Required. The Python module name to run after installing the packages. */
  pythonModule?: string;
}

export const GoogleCloudMlV1__TrainingInput: Schema.Schema<GoogleCloudMlV1__TrainingInput> = Schema.suspend(() => Schema.Struct({
  workerConfig: Schema.optional(GoogleCloudMlV1__ReplicaConfig),
  scheduling: Schema.optional(GoogleCloudMlV1__Scheduling),
  jobDir: Schema.optional(Schema.String),
  pythonVersion: Schema.optional(Schema.String),
  workerCount: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Schema.String)),
  region: Schema.optional(Schema.String),
  parameterServerType: Schema.optional(Schema.String),
  useChiefInTfConfig: Schema.optional(Schema.Boolean),
  workerType: Schema.optional(Schema.String),
  scaleTier: Schema.optional(Schema.String),
  evaluatorCount: Schema.optional(Schema.String),
  evaluatorConfig: Schema.optional(GoogleCloudMlV1__ReplicaConfig),
  evaluatorType: Schema.optional(Schema.String),
  masterConfig: Schema.optional(GoogleCloudMlV1__ReplicaConfig),
  parameterServerCount: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  masterType: Schema.optional(Schema.String),
  enableWebAccess: Schema.optional(Schema.Boolean),
  packageUris: Schema.optional(Schema.Array(Schema.String)),
  network: Schema.optional(Schema.String),
  parameterServerConfig: Schema.optional(GoogleCloudMlV1__ReplicaConfig),
  runtimeVersion: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(GoogleCloudMlV1__EncryptionConfig),
  hyperparameters: Schema.optional(GoogleCloudMlV1__HyperparameterSpec),
  pythonModule: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__TrainingInput" }) as any as Schema.Schema<GoogleCloudMlV1__TrainingInput>;

export interface GoogleCloudMlV1__Job {
  /** Output only. The details of a failure or a cancellation. */
  errorMessage?: string;
  /** Input parameters to create a prediction job. */
  predictionInput?: GoogleCloudMlV1__PredictionInput;
  /** The current prediction job result. */
  predictionOutput?: GoogleCloudMlV1__PredictionOutput;
  /** Output only. When the job processing was started. */
  startTime?: string;
  /** Output only. When the job was created. */
  createTime?: string;
  /** Input parameters to create a training job. */
  trainingInput?: GoogleCloudMlV1__TrainingInput;
  /** Output only. When the job processing was completed. */
  endTime?: string;
  /** Optional. One or more labels that you can add, to organize your jobs. Each label is a key-value pair, where both the key and the value are arbitrary strings that you supply. For more information, see the documentation on using labels. */
  labels?: Record<string, string>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a job from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform job updates in order to avoid race conditions: An `etag` is returned in the response to `GetJob`, and systems are expected to put that etag in the request to `UpdateJob` to ensure that their change will be applied to the same version of the job. */
  etag?: string;
  /** Output only. The detailed state of a job. */
  state?: "STATE_UNSPECIFIED" | "QUEUED" | "PREPARING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLING" | "CANCELLED" | (string & {});
  /** Required. The user-specified id of the job. */
  jobId?: string;
  /** The current training job result. */
  trainingOutput?: GoogleCloudMlV1__TrainingOutput;
  /** Output only. It's only effect when the job is in QUEUED state. If it's positive, it indicates the job's position in the job scheduler. It's 0 when the job is already scheduled. */
  jobPosition?: string;
}

export const GoogleCloudMlV1__Job: Schema.Schema<GoogleCloudMlV1__Job> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
  predictionInput: Schema.optional(GoogleCloudMlV1__PredictionInput),
  predictionOutput: Schema.optional(GoogleCloudMlV1__PredictionOutput),
  startTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  trainingInput: Schema.optional(GoogleCloudMlV1__TrainingInput),
  endTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  trainingOutput: Schema.optional(GoogleCloudMlV1__TrainingOutput),
  jobPosition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__Job" }) as any as Schema.Schema<GoogleCloudMlV1__Job>;

export interface GoogleCloudMlV1__ListJobsResponse {
  /** Optional. Pass this token as the `page_token` field of the request for a subsequent call. */
  nextPageToken?: string;
  /** The list of jobs. */
  jobs?: Array<GoogleCloudMlV1__Job>;
}

export const GoogleCloudMlV1__ListJobsResponse: Schema.Schema<GoogleCloudMlV1__ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  jobs: Schema.optional(Schema.Array(GoogleCloudMlV1__Job)),
})).annotate({ identifier: "GoogleCloudMlV1__ListJobsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListJobsResponse>;

export interface GoogleType__Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const GoogleType__Expr: Schema.Schema<GoogleType__Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleType__Expr" }) as any as Schema.Schema<GoogleType__Expr>;

export interface GoogleCloudMlV1__AddTrialMeasurementRequest {
  /** Required. The measurement to be added to a trial. */
  measurement?: GoogleCloudMlV1__Measurement;
}

export const GoogleCloudMlV1__AddTrialMeasurementRequest: Schema.Schema<GoogleCloudMlV1__AddTrialMeasurementRequest> = Schema.suspend(() => Schema.Struct({
  measurement: Schema.optional(GoogleCloudMlV1__Measurement),
})).annotate({ identifier: "GoogleCloudMlV1__AddTrialMeasurementRequest" }) as any as Schema.Schema<GoogleCloudMlV1__AddTrialMeasurementRequest>;

export interface GoogleCloudMlV1__StopTrialRequest {
}

export const GoogleCloudMlV1__StopTrialRequest: Schema.Schema<GoogleCloudMlV1__StopTrialRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudMlV1__StopTrialRequest" }) as any as Schema.Schema<GoogleCloudMlV1__StopTrialRequest>;

export interface GoogleCloudMlV1__SuggestTrialsMetadata {
  /** The time operation was submitted. */
  createTime?: string;
  /** The name of the study that the trial belongs to. */
  study?: string;
  /** The number of suggestions requested. */
  suggestionCount?: number;
  /** The identifier of the client that is requesting the suggestion. */
  clientId?: string;
}

export const GoogleCloudMlV1__SuggestTrialsMetadata: Schema.Schema<GoogleCloudMlV1__SuggestTrialsMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  study: Schema.optional(Schema.String),
  suggestionCount: Schema.optional(Schema.Number),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__SuggestTrialsMetadata" }) as any as Schema.Schema<GoogleCloudMlV1__SuggestTrialsMetadata>;

export interface GoogleCloudMlV1__ListStudiesResponse {
  /** The studies associated with the project. */
  studies?: Array<GoogleCloudMlV1__Study>;
}

export const GoogleCloudMlV1__ListStudiesResponse: Schema.Schema<GoogleCloudMlV1__ListStudiesResponse> = Schema.suspend(() => Schema.Struct({
  studies: Schema.optional(Schema.Array(GoogleCloudMlV1__Study)),
})).annotate({ identifier: "GoogleCloudMlV1__ListStudiesResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListStudiesResponse>;

export interface GoogleCloudMlV1__GetConfigResponse {
  /** The project number for `service_account`. */
  serviceAccountProject?: string;
  config?: GoogleCloudMlV1__Config;
  /** The service account Cloud ML uses to access resources in the project. */
  serviceAccount?: string;
}

export const GoogleCloudMlV1__GetConfigResponse: Schema.Schema<GoogleCloudMlV1__GetConfigResponse> = Schema.suspend(() => Schema.Struct({
  serviceAccountProject: Schema.optional(Schema.String),
  config: Schema.optional(GoogleCloudMlV1__Config),
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__GetConfigResponse" }) as any as Schema.Schema<GoogleCloudMlV1__GetConfigResponse>;

export interface GoogleIamV1__Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleType__Expr;
}

export const GoogleIamV1__Binding: Schema.Schema<GoogleIamV1__Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(GoogleType__Expr),
})).annotate({ identifier: "GoogleIamV1__Binding" }) as any as Schema.Schema<GoogleIamV1__Binding>;

export interface GoogleIamV1__Policy {
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1__AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1__Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const GoogleIamV1__Policy: Schema.Schema<GoogleIamV1__Policy> = Schema.suspend(() => Schema.Struct({
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1__AuditConfig)),
  bindings: Schema.optional(Schema.Array(GoogleIamV1__Binding)),
  version: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1__Policy" }) as any as Schema.Schema<GoogleIamV1__Policy>;

export interface GoogleCloudMlV1__ListOptimalTrialsRequest {
}

export const GoogleCloudMlV1__ListOptimalTrialsRequest: Schema.Schema<GoogleCloudMlV1__ListOptimalTrialsRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudMlV1__ListOptimalTrialsRequest" }) as any as Schema.Schema<GoogleCloudMlV1__ListOptimalTrialsRequest>;

export interface GoogleLongrunning__Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpc__Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const GoogleLongrunning__Operation: Schema.Schema<GoogleLongrunning__Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(GoogleRpc__Status),
  done: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleLongrunning__Operation" }) as any as Schema.Schema<GoogleLongrunning__Operation>;

export interface GoogleCloudMlV1__SuggestTrialsResponse {
  /** The time at which operation processing completed. */
  endTime?: string;
  /** The time at which the operation was started. */
  startTime?: string;
  /** The state of the study. */
  studyState?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | "COMPLETED" | (string & {});
  /** A list of trials. */
  trials?: Array<GoogleCloudMlV1__Trial>;
}

export const GoogleCloudMlV1__SuggestTrialsResponse: Schema.Schema<GoogleCloudMlV1__SuggestTrialsResponse> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  studyState: Schema.optional(Schema.String),
  trials: Schema.optional(Schema.Array(GoogleCloudMlV1__Trial)),
})).annotate({ identifier: "GoogleCloudMlV1__SuggestTrialsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__SuggestTrialsResponse>;

export interface GoogleIamV1__SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: GoogleIamV1__Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const GoogleIamV1__SetIamPolicyRequest: Schema.Schema<GoogleIamV1__SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1__Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1__SetIamPolicyRequest" }) as any as Schema.Schema<GoogleIamV1__SetIamPolicyRequest>;

export interface GoogleCloudMlV1__ExplainRequest {
  /** Required. The explanation request body. */
  httpBody?: GoogleApi__HttpBody;
}

export const GoogleCloudMlV1__ExplainRequest: Schema.Schema<GoogleCloudMlV1__ExplainRequest> = Schema.suspend(() => Schema.Struct({
  httpBody: Schema.optional(GoogleApi__HttpBody),
})).annotate({ identifier: "GoogleCloudMlV1__ExplainRequest" }) as any as Schema.Schema<GoogleCloudMlV1__ExplainRequest>;

export interface GoogleLongrunning__ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunning__Operation>;
}

export const GoogleLongrunning__ListOperationsResponse: Schema.Schema<GoogleLongrunning__ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(GoogleLongrunning__Operation)),
})).annotate({ identifier: "GoogleLongrunning__ListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunning__ListOperationsResponse>;

export interface GoogleCloudMlV1__ListLocationsResponse {
  /** Locations where at least one type of CMLE capability is available. */
  locations?: Array<GoogleCloudMlV1__Location>;
  /** Optional. Pass this token as the `page_token` field of the request for a subsequent call. */
  nextPageToken?: string;
}

export const GoogleCloudMlV1__ListLocationsResponse: Schema.Schema<GoogleCloudMlV1__ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(GoogleCloudMlV1__Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMlV1__ListLocationsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListLocationsResponse>;

export interface GoogleCloudMlV1__OperationMetadata {
  /** The time operation processing completed. */
  endTime?: string;
  /** Contains the project number associated with the operation. */
  projectNumber?: string;
  /** Contains the name of the model associated with the operation. */
  modelName?: string;
  /** Contains the version associated with the operation. */
  version?: GoogleCloudMlV1__Version;
  /** The time the operation was submitted. */
  createTime?: string;
  /** The time operation processing started. */
  startTime?: string;
  /** The operation type. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "CREATE_VERSION" | "DELETE_VERSION" | "DELETE_MODEL" | "UPDATE_MODEL" | "UPDATE_VERSION" | "UPDATE_CONFIG" | (string & {});
  /** The user labels, inherited from the model or the model version being operated on. */
  labels?: Record<string, string>;
  /** Indicates whether a request to cancel this operation has been made. */
  isCancellationRequested?: boolean;
}

export const GoogleCloudMlV1__OperationMetadata: Schema.Schema<GoogleCloudMlV1__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  projectNumber: Schema.optional(Schema.String),
  modelName: Schema.optional(Schema.String),
  version: Schema.optional(GoogleCloudMlV1__Version),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  isCancellationRequested: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudMlV1__OperationMetadata" }) as any as Schema.Schema<GoogleCloudMlV1__OperationMetadata>;

export interface GoogleCloudMlV1__ListModelsResponse {
  /** Optional. Pass this token as the `page_token` field of the request for a subsequent call. */
  nextPageToken?: string;
  /** The list of models. */
  models?: Array<GoogleCloudMlV1__Model>;
}

export const GoogleCloudMlV1__ListModelsResponse: Schema.Schema<GoogleCloudMlV1__ListModelsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  models: Schema.optional(Schema.Array(GoogleCloudMlV1__Model)),
})).annotate({ identifier: "GoogleCloudMlV1__ListModelsResponse" }) as any as Schema.Schema<GoogleCloudMlV1__ListModelsResponse>;

export interface GoogleCloudMlV1__PredictRequest {
  /** Required. The prediction request body. Refer to the [request body details section](#request-body-details) for more information on how to structure your request. */
  httpBody?: GoogleApi__HttpBody;
}

export const GoogleCloudMlV1__PredictRequest: Schema.Schema<GoogleCloudMlV1__PredictRequest> = Schema.suspend(() => Schema.Struct({
  httpBody: Schema.optional(GoogleApi__HttpBody),
})).annotate({ identifier: "GoogleCloudMlV1__PredictRequest" }) as any as Schema.Schema<GoogleCloudMlV1__PredictRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Performs online prediction on the data in the request. {% dynamic include "/ai-platform/includes/___predict-request" %} */
export interface PredictProjectsRequest {
  /** Required. The resource name of a model or a version. Authorization: requires the `predict` permission on the specified resource. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__PredictRequest;
}

export const PredictProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__PredictRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:predict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PredictProjectsRequest>;

export type PredictProjectsResponse = GoogleApi__HttpBody;
export const PredictProjectsResponse = GoogleApi__HttpBody;

export type PredictProjectsError = CommonErrors;

export const predictProjects: API.OperationMethod<PredictProjectsRequest, PredictProjectsResponse, PredictProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PredictProjectsRequest,
  output: PredictProjectsResponse,
  errors: [],
}));

/** Get the service account information associated with your project. You need this information in order to grant the service account permissions for the Google Cloud Storage location where you put your model training code for training the model with Google Cloud Machine Learning. */
export interface GetConfigProjectsRequest {
  /** Required. The project name. */
  name: string;
}

export const GetConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}:getConfig" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsRequest>;

export type GetConfigProjectsResponse = GoogleCloudMlV1__GetConfigResponse;
export const GetConfigProjectsResponse = GoogleCloudMlV1__GetConfigResponse;

export type GetConfigProjectsError = CommonErrors;

export const getConfigProjects: API.OperationMethod<GetConfigProjectsRequest, GetConfigProjectsResponse, GetConfigProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsRequest,
  output: GetConfigProjectsResponse,
  errors: [],
}));

/** Performs explanation on the data in the request. {% dynamic include "/ai-platform/includes/___explain-request" %} */
export interface ExplainProjectsRequest {
  /** Required. The resource name of a model or a version. Authorization: requires the `predict` permission on the specified resource. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__ExplainRequest;
}

export const ExplainProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__ExplainRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:explain", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExplainProjectsRequest>;

export type ExplainProjectsResponse = GoogleApi__HttpBody;
export const ExplainProjectsResponse = GoogleApi__HttpBody;

export type ExplainProjectsError = CommonErrors;

export const explainProjects: API.OperationMethod<ExplainProjectsRequest, ExplainProjectsResponse, ExplainProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExplainProjectsRequest,
  output: ExplainProjectsResponse,
  errors: [],
}));

/** Get the complete list of CMLE capabilities in a location, along with their location-specific properties. */
export interface GetProjectsLocationsRequest {
  /** Required. The name of the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudMlV1__Location;
export const GetProjectsLocationsResponse = GoogleCloudMlV1__Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** List all locations that provides at least one type of CMLE capability. */
export interface ListProjectsLocationsRequest {
  /** Optional. The number of locations to retrieve per "page" of results. If there are more remaining results than this number, the response message will contain a valid value in the `next_page_token` field. The default value is 20, and the maximum page size is 100. */
  pageSize?: number;
  /** Required. The name of the project for which available locations are to be listed (since some locations might be whitelisted for specific projects). */
  parent: string;
  /** Optional. A page token to request the next page of results. You get the token from the `next_page_token` field of the response from the previous call. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = GoogleCloudMlV1__ListLocationsResponse;
export const ListProjectsLocationsResponse = GoogleCloudMlV1__ListLocationsResponse;

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

/** Gets a study. */
export interface GetProjectsLocationsStudiesRequest {
  /** Required. The study name. */
  name: string;
}

export const GetProjectsLocationsStudiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsStudiesRequest>;

export type GetProjectsLocationsStudiesResponse = GoogleCloudMlV1__Study;
export const GetProjectsLocationsStudiesResponse = GoogleCloudMlV1__Study;

export type GetProjectsLocationsStudiesError = CommonErrors;

export const getProjectsLocationsStudies: API.OperationMethod<GetProjectsLocationsStudiesRequest, GetProjectsLocationsStudiesResponse, GetProjectsLocationsStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsStudiesRequest,
  output: GetProjectsLocationsStudiesResponse,
  errors: [],
}));

/** Deletes a study. */
export interface DeleteProjectsLocationsStudiesRequest {
  /** Required. The study name. */
  name: string;
}

export const DeleteProjectsLocationsStudiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsStudiesRequest>;

export type DeleteProjectsLocationsStudiesResponse = GoogleProtobuf__Empty;
export const DeleteProjectsLocationsStudiesResponse = GoogleProtobuf__Empty;

export type DeleteProjectsLocationsStudiesError = CommonErrors;

export const deleteProjectsLocationsStudies: API.OperationMethod<DeleteProjectsLocationsStudiesRequest, DeleteProjectsLocationsStudiesResponse, DeleteProjectsLocationsStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsStudiesRequest,
  output: DeleteProjectsLocationsStudiesResponse,
  errors: [],
}));

/** Lists all the studies in a region for an associated project. */
export interface ListProjectsLocationsStudiesRequest {
  /** Required. The project and location that the study belongs to. Format: projects/{project}/locations/{location} */
  parent: string;
}

export const ListProjectsLocationsStudiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/studies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsStudiesRequest>;

export type ListProjectsLocationsStudiesResponse = GoogleCloudMlV1__ListStudiesResponse;
export const ListProjectsLocationsStudiesResponse = GoogleCloudMlV1__ListStudiesResponse;

export type ListProjectsLocationsStudiesError = CommonErrors;

export const listProjectsLocationsStudies: API.OperationMethod<ListProjectsLocationsStudiesRequest, ListProjectsLocationsStudiesResponse, ListProjectsLocationsStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsStudiesRequest,
  output: ListProjectsLocationsStudiesResponse,
  errors: [],
}));

/** Creates a study. */
export interface CreateProjectsLocationsStudiesRequest {
  /** Required. The project and location that the study belongs to. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The ID to use for the study, which will become the final component of the study's resource name. */
  studyId?: string;
  /** Request body */
  body?: GoogleCloudMlV1__Study;
}

export const CreateProjectsLocationsStudiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  studyId: Schema.optional(Schema.String).pipe(T.HttpQuery("studyId")),
  body: Schema.optional(GoogleCloudMlV1__Study).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsStudiesRequest>;

export type CreateProjectsLocationsStudiesResponse = GoogleCloudMlV1__Study;
export const CreateProjectsLocationsStudiesResponse = GoogleCloudMlV1__Study;

export type CreateProjectsLocationsStudiesError = CommonErrors;

export const createProjectsLocationsStudies: API.OperationMethod<CreateProjectsLocationsStudiesRequest, CreateProjectsLocationsStudiesResponse, CreateProjectsLocationsStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsStudiesRequest,
  output: CreateProjectsLocationsStudiesResponse,
  errors: [],
}));

/** Adds a user provided trial to a study. */
export interface CreateProjectsLocationsStudiesTrialsRequest {
  /** Required. The name of the study that the trial belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudMlV1__Trial;
}

export const CreateProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudMlV1__Trial).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsStudiesTrialsRequest>;

export type CreateProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;
export const CreateProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;

export type CreateProjectsLocationsStudiesTrialsError = CommonErrors;

export const createProjectsLocationsStudiesTrials: API.OperationMethod<CreateProjectsLocationsStudiesTrialsRequest, CreateProjectsLocationsStudiesTrialsResponse, CreateProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsStudiesTrialsRequest,
  output: CreateProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Lists the pareto-optimal trials for multi-objective study or the optimal trials for single-objective study. The definition of pareto-optimal can be checked in wiki page. https://en.wikipedia.org/wiki/Pareto_efficiency */
export interface ListOptimalTrialsProjectsLocationsStudiesTrialsRequest {
  /** Required. The name of the study that the pareto-optimal trial belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudMlV1__ListOptimalTrialsRequest;
}

export const ListOptimalTrialsProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudMlV1__ListOptimalTrialsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials:listOptimalTrials", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListOptimalTrialsProjectsLocationsStudiesTrialsRequest>;

export type ListOptimalTrialsProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__ListOptimalTrialsResponse;
export const ListOptimalTrialsProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__ListOptimalTrialsResponse;

export type ListOptimalTrialsProjectsLocationsStudiesTrialsError = CommonErrors;

export const listOptimalTrialsProjectsLocationsStudiesTrials: API.OperationMethod<ListOptimalTrialsProjectsLocationsStudiesTrialsRequest, ListOptimalTrialsProjectsLocationsStudiesTrialsResponse, ListOptimalTrialsProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOptimalTrialsProjectsLocationsStudiesTrialsRequest,
  output: ListOptimalTrialsProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Stops a trial. */
export interface StopProjectsLocationsStudiesTrialsRequest {
  /** Required. The trial name. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__StopTrialRequest;
}

export const StopProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__StopTrialRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials/{trialsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsStudiesTrialsRequest>;

export type StopProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;
export const StopProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;

export type StopProjectsLocationsStudiesTrialsError = CommonErrors;

export const stopProjectsLocationsStudiesTrials: API.OperationMethod<StopProjectsLocationsStudiesTrialsRequest, StopProjectsLocationsStudiesTrialsResponse, StopProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsStudiesTrialsRequest,
  output: StopProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Lists the trials associated with a study. */
export interface ListProjectsLocationsStudiesTrialsRequest {
  /** Required. The name of the study that the trial belongs to. */
  parent: string;
}

export const ListProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsStudiesTrialsRequest>;

export type ListProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__ListTrialsResponse;
export const ListProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__ListTrialsResponse;

export type ListProjectsLocationsStudiesTrialsError = CommonErrors;

export const listProjectsLocationsStudiesTrials: API.OperationMethod<ListProjectsLocationsStudiesTrialsRequest, ListProjectsLocationsStudiesTrialsResponse, ListProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsStudiesTrialsRequest,
  output: ListProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Checks whether a trial should stop or not. Returns a long-running operation. When the operation is successful, it will contain a CheckTrialEarlyStoppingStateResponse. */
export interface CheckEarlyStoppingStateProjectsLocationsStudiesTrialsRequest {
  /** Required. The trial name. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest;
}

export const CheckEarlyStoppingStateProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials/{trialsId}:checkEarlyStoppingState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckEarlyStoppingStateProjectsLocationsStudiesTrialsRequest>;

export type CheckEarlyStoppingStateProjectsLocationsStudiesTrialsResponse = GoogleLongrunning__Operation;
export const CheckEarlyStoppingStateProjectsLocationsStudiesTrialsResponse = GoogleLongrunning__Operation;

export type CheckEarlyStoppingStateProjectsLocationsStudiesTrialsError = CommonErrors;

export const checkEarlyStoppingStateProjectsLocationsStudiesTrials: API.OperationMethod<CheckEarlyStoppingStateProjectsLocationsStudiesTrialsRequest, CheckEarlyStoppingStateProjectsLocationsStudiesTrialsResponse, CheckEarlyStoppingStateProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckEarlyStoppingStateProjectsLocationsStudiesTrialsRequest,
  output: CheckEarlyStoppingStateProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Gets a trial. */
export interface GetProjectsLocationsStudiesTrialsRequest {
  /** Required. The trial name. */
  name: string;
}

export const GetProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials/{trialsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsStudiesTrialsRequest>;

export type GetProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;
export const GetProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;

export type GetProjectsLocationsStudiesTrialsError = CommonErrors;

export const getProjectsLocationsStudiesTrials: API.OperationMethod<GetProjectsLocationsStudiesTrialsRequest, GetProjectsLocationsStudiesTrialsResponse, GetProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsStudiesTrialsRequest,
  output: GetProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Adds one or more trials to a study, with parameter values suggested by AI Platform Vizier. Returns a long-running operation associated with the generation of trial suggestions. When this long-running operation succeeds, it will contain a SuggestTrialsResponse. */
export interface SuggestProjectsLocationsStudiesTrialsRequest {
  /** Required. The name of the study that the trial belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudMlV1__SuggestTrialsRequest;
}

export const SuggestProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudMlV1__SuggestTrialsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials:suggest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestProjectsLocationsStudiesTrialsRequest>;

export type SuggestProjectsLocationsStudiesTrialsResponse = GoogleLongrunning__Operation;
export const SuggestProjectsLocationsStudiesTrialsResponse = GoogleLongrunning__Operation;

export type SuggestProjectsLocationsStudiesTrialsError = CommonErrors;

export const suggestProjectsLocationsStudiesTrials: API.OperationMethod<SuggestProjectsLocationsStudiesTrialsRequest, SuggestProjectsLocationsStudiesTrialsResponse, SuggestProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestProjectsLocationsStudiesTrialsRequest,
  output: SuggestProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Deletes a trial. */
export interface DeleteProjectsLocationsStudiesTrialsRequest {
  /** Required. The trial name. */
  name: string;
}

export const DeleteProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials/{trialsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsStudiesTrialsRequest>;

export type DeleteProjectsLocationsStudiesTrialsResponse = GoogleProtobuf__Empty;
export const DeleteProjectsLocationsStudiesTrialsResponse = GoogleProtobuf__Empty;

export type DeleteProjectsLocationsStudiesTrialsError = CommonErrors;

export const deleteProjectsLocationsStudiesTrials: API.OperationMethod<DeleteProjectsLocationsStudiesTrialsRequest, DeleteProjectsLocationsStudiesTrialsResponse, DeleteProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsStudiesTrialsRequest,
  output: DeleteProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Adds a measurement of the objective metrics to a trial. This measurement is assumed to have been taken before the trial is complete. */
export interface AddMeasurementProjectsLocationsStudiesTrialsRequest {
  /** Required. The trial name. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__AddTrialMeasurementRequest;
}

export const AddMeasurementProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__AddTrialMeasurementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials/{trialsId}:addMeasurement", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddMeasurementProjectsLocationsStudiesTrialsRequest>;

export type AddMeasurementProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;
export const AddMeasurementProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;

export type AddMeasurementProjectsLocationsStudiesTrialsError = CommonErrors;

export const addMeasurementProjectsLocationsStudiesTrials: API.OperationMethod<AddMeasurementProjectsLocationsStudiesTrialsRequest, AddMeasurementProjectsLocationsStudiesTrialsResponse, AddMeasurementProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddMeasurementProjectsLocationsStudiesTrialsRequest,
  output: AddMeasurementProjectsLocationsStudiesTrialsResponse,
  errors: [],
}));

/** Marks a trial as complete. */
export interface CompleteProjectsLocationsStudiesTrialsRequest {
  /** Required. The trial name.metat */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__CompleteTrialRequest;
}

export const CompleteProjectsLocationsStudiesTrialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__CompleteTrialRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/studies/{studiesId}/trials/{trialsId}:complete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteProjectsLocationsStudiesTrialsRequest>;

export type CompleteProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;
export const CompleteProjectsLocationsStudiesTrialsResponse = GoogleCloudMlV1__Trial;

export type CompleteProjectsLocationsStudiesTrialsError = CommonErrors;

export const completeProjectsLocationsStudiesTrials: API.OperationMethod<CompleteProjectsLocationsStudiesTrialsRequest, CompleteProjectsLocationsStudiesTrialsResponse, CompleteProjectsLocationsStudiesTrialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteProjectsLocationsStudiesTrialsRequest,
  output: CompleteProjectsLocationsStudiesTrialsResponse,
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

export type GetProjectsLocationsOperationsResponse = GoogleLongrunning__Operation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunning__Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobuf__Empty;
export const CancelProjectsLocationsOperationsResponse = GoogleProtobuf__Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListProjectsOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse = GoogleLongrunning__ListOperationsResponse;
export const ListProjectsOperationsResponse = GoogleLongrunning__ListOperationsResponse;

export type ListProjectsOperationsError = CommonErrors;

export const listProjectsOperations = API.makePaginated(() => ({
  input: ListProjectsOperationsRequest,
  output: ListProjectsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunning__Operation;
export const GetProjectsOperationsResponse = GoogleLongrunning__Operation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsOperationsRequest>;

export type CancelProjectsOperationsResponse = GoogleProtobuf__Empty;
export const CancelProjectsOperationsResponse = GoogleProtobuf__Empty;

export type CancelProjectsOperationsError = CommonErrors;

export const cancelProjectsOperations: API.OperationMethod<CancelProjectsOperationsRequest, CancelProjectsOperationsResponse, CancelProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsOperationsRequest,
  output: CancelProjectsOperationsResponse,
  errors: [],
}));

/** Lists the jobs in the project. If there are no jobs that match the request parameters, the list request returns an empty response body: {}. */
export interface ListProjectsJobsRequest {
  /** Optional. A page token to request the next page of results. You get the token from the `next_page_token` field of the response from the previous call. */
  pageToken?: string;
  /** Required. The name of the project for which to list jobs. */
  parent: string;
  /** Optional. The number of jobs to retrieve per "page" of results. If there are more remaining results than this number, the response message will contain a valid value in the `next_page_token` field. The default value is 20, and the maximum page size is 100. */
  pageSize?: number;
  /** Optional. Specifies the subset of jobs to retrieve. You can filter on the value of one or more attributes of the job object. For example, retrieve jobs with a job identifier that starts with 'census': gcloud ai-platform jobs list --filter='jobId:census*' List all failed jobs with names that start with 'rnn': gcloud ai-platform jobs list --filter='jobId:rnn* AND state:FAILED' For more examples, see the guide to monitoring jobs. */
  filter?: string;
}

export const ListProjectsJobsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsJobsRequest>;

export type ListProjectsJobsResponse = GoogleCloudMlV1__ListJobsResponse;
export const ListProjectsJobsResponse = GoogleCloudMlV1__ListJobsResponse;

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

/** Describes a job. */
export interface GetProjectsJobsRequest {
  /** Required. The name of the job to get the description of. */
  name: string;
}

export const GetProjectsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsJobsRequest>;

export type GetProjectsJobsResponse = GoogleCloudMlV1__Job;
export const GetProjectsJobsResponse = GoogleCloudMlV1__Job;

export type GetProjectsJobsError = CommonErrors;

export const getProjectsJobs: API.OperationMethod<GetProjectsJobsRequest, GetProjectsJobsResponse, GetProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsJobsRequest,
  output: GetProjectsJobsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsJobsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/jobs/{jobsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsJobsRequest>;

export type GetIamPolicyProjectsJobsResponse = GoogleIamV1__Policy;
export const GetIamPolicyProjectsJobsResponse = GoogleIamV1__Policy;

export type GetIamPolicyProjectsJobsError = CommonErrors;

export const getIamPolicyProjectsJobs: API.OperationMethod<GetIamPolicyProjectsJobsRequest, GetIamPolicyProjectsJobsResponse, GetIamPolicyProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsJobsRequest,
  output: GetIamPolicyProjectsJobsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsJobsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1__SetIamPolicyRequest;
}

export const SetIamPolicyProjectsJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1__SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/jobs/{jobsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsJobsRequest>;

export type SetIamPolicyProjectsJobsResponse = GoogleIamV1__Policy;
export const SetIamPolicyProjectsJobsResponse = GoogleIamV1__Policy;

export type SetIamPolicyProjectsJobsError = CommonErrors;

export const setIamPolicyProjectsJobs: API.OperationMethod<SetIamPolicyProjectsJobsRequest, SetIamPolicyProjectsJobsResponse, SetIamPolicyProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsJobsRequest,
  output: SetIamPolicyProjectsJobsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsJobsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1__TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1__TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/jobs/{jobsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsJobsRequest>;

export type TestIamPermissionsProjectsJobsResponse = GoogleIamV1__TestIamPermissionsResponse;
export const TestIamPermissionsProjectsJobsResponse = GoogleIamV1__TestIamPermissionsResponse;

export type TestIamPermissionsProjectsJobsError = CommonErrors;

export const testIamPermissionsProjectsJobs: API.OperationMethod<TestIamPermissionsProjectsJobsRequest, TestIamPermissionsProjectsJobsResponse, TestIamPermissionsProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsJobsRequest,
  output: TestIamPermissionsProjectsJobsResponse,
  errors: [],
}));

/** Cancels a running job. */
export interface CancelProjectsJobsRequest {
  /** Required. The name of the job to cancel. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__CancelJobRequest;
}

export const CancelProjectsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__CancelJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/jobs/{jobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsJobsRequest>;

export type CancelProjectsJobsResponse = GoogleProtobuf__Empty;
export const CancelProjectsJobsResponse = GoogleProtobuf__Empty;

export type CancelProjectsJobsError = CommonErrors;

export const cancelProjectsJobs: API.OperationMethod<CancelProjectsJobsRequest, CancelProjectsJobsResponse, CancelProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsJobsRequest,
  output: CancelProjectsJobsResponse,
  errors: [],
}));

/** Creates a training or a batch prediction job. */
export interface CreateProjectsJobsRequest {
  /** Required. The project name. */
  parent: string;
  /** Request body */
  body?: GoogleCloudMlV1__Job;
}

export const CreateProjectsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudMlV1__Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsJobsRequest>;

export type CreateProjectsJobsResponse = GoogleCloudMlV1__Job;
export const CreateProjectsJobsResponse = GoogleCloudMlV1__Job;

export type CreateProjectsJobsError = CommonErrors;

export const createProjectsJobs: API.OperationMethod<CreateProjectsJobsRequest, CreateProjectsJobsResponse, CreateProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsJobsRequest,
  output: CreateProjectsJobsResponse,
  errors: [],
}));

/** Updates a specific job resource. Currently the only supported fields to update are `labels`. */
export interface PatchProjectsJobsRequest {
  /** Required. The job name. */
  name: string;
  /** Required. Specifies the path, relative to `Job`, of the field to update. To adopt etag mechanism, include `etag` field in the mask, and include the `etag` value in your job resource. For example, to change the labels of a job, the `update_mask` parameter would be specified as `labels`, `etag`, and the `PATCH` request body would specify the new value, as follows: { "labels": { "owner": "Google", "color": "Blue" } "etag": "33a64df551425fcc55e4d42a148795d9f25f89d4" } If `etag` matches the one on the server, the labels of the job will be replaced with the given ones, and the server end `etag` will be recalculated. Currently the only supported update masks are `labels` and `etag`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudMlV1__Job;
}

export const PatchProjectsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudMlV1__Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/jobs/{jobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsJobsRequest>;

export type PatchProjectsJobsResponse = GoogleCloudMlV1__Job;
export const PatchProjectsJobsResponse = GoogleCloudMlV1__Job;

export type PatchProjectsJobsError = CommonErrors;

export const patchProjectsJobs: API.OperationMethod<PatchProjectsJobsRequest, PatchProjectsJobsResponse, PatchProjectsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsJobsRequest,
  output: PatchProjectsJobsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsModelsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1__TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsModelsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1__TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/models/{modelsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsModelsRequest>;

export type TestIamPermissionsProjectsModelsResponse = GoogleIamV1__TestIamPermissionsResponse;
export const TestIamPermissionsProjectsModelsResponse = GoogleIamV1__TestIamPermissionsResponse;

export type TestIamPermissionsProjectsModelsError = CommonErrors;

export const testIamPermissionsProjectsModels: API.OperationMethod<TestIamPermissionsProjectsModelsRequest, TestIamPermissionsProjectsModelsResponse, TestIamPermissionsProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsModelsRequest,
  output: TestIamPermissionsProjectsModelsResponse,
  errors: [],
}));

/** Creates a model which will later contain one or more versions. You must add at least one version before you can request predictions from the model. Add versions by calling projects.models.versions.create. */
export interface CreateProjectsModelsRequest {
  /** Required. The project name. */
  parent: string;
  /** Request body */
  body?: GoogleCloudMlV1__Model;
}

export const CreateProjectsModelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudMlV1__Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/models", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsModelsRequest>;

export type CreateProjectsModelsResponse = GoogleCloudMlV1__Model;
export const CreateProjectsModelsResponse = GoogleCloudMlV1__Model;

export type CreateProjectsModelsError = CommonErrors;

export const createProjectsModels: API.OperationMethod<CreateProjectsModelsRequest, CreateProjectsModelsResponse, CreateProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsModelsRequest,
  output: CreateProjectsModelsResponse,
  errors: [],
}));

/** Updates a specific model resource. Currently the only supported fields to update are `description` and `default_version.name`. */
export interface PatchProjectsModelsRequest {
  /** Required. Specifies the path, relative to `Model`, of the field to update. For example, to change the description of a model to "foo" and set its default version to "version_1", the `update_mask` parameter would be specified as `description`, `default_version.name`, and the `PATCH` request body would specify the new value, as follows: { "description": "foo", "defaultVersion": { "name":"version_1" } } Currently the supported update masks are `description` and `default_version.name`. */
  updateMask?: string;
  /** Required. The project name. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__Model;
}

export const PatchProjectsModelsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/models/{modelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsModelsRequest>;

export type PatchProjectsModelsResponse = GoogleLongrunning__Operation;
export const PatchProjectsModelsResponse = GoogleLongrunning__Operation;

export type PatchProjectsModelsError = CommonErrors;

export const patchProjectsModels: API.OperationMethod<PatchProjectsModelsRequest, PatchProjectsModelsResponse, PatchProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsModelsRequest,
  output: PatchProjectsModelsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsModelsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1__SetIamPolicyRequest;
}

export const SetIamPolicyProjectsModelsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1__SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/models/{modelsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsModelsRequest>;

export type SetIamPolicyProjectsModelsResponse = GoogleIamV1__Policy;
export const SetIamPolicyProjectsModelsResponse = GoogleIamV1__Policy;

export type SetIamPolicyProjectsModelsError = CommonErrors;

export const setIamPolicyProjectsModels: API.OperationMethod<SetIamPolicyProjectsModelsRequest, SetIamPolicyProjectsModelsResponse, SetIamPolicyProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsModelsRequest,
  output: SetIamPolicyProjectsModelsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsModelsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsModelsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/models/{modelsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsModelsRequest>;

export type GetIamPolicyProjectsModelsResponse = GoogleIamV1__Policy;
export const GetIamPolicyProjectsModelsResponse = GoogleIamV1__Policy;

export type GetIamPolicyProjectsModelsError = CommonErrors;

export const getIamPolicyProjectsModels: API.OperationMethod<GetIamPolicyProjectsModelsRequest, GetIamPolicyProjectsModelsResponse, GetIamPolicyProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsModelsRequest,
  output: GetIamPolicyProjectsModelsResponse,
  errors: [],
}));

/** Deletes a model. You can only delete a model if there are no versions in it. You can delete versions by calling projects.models.versions.delete. */
export interface DeleteProjectsModelsRequest {
  /** Required. The name of the model. */
  name: string;
}

export const DeleteProjectsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsModelsRequest>;

export type DeleteProjectsModelsResponse = GoogleLongrunning__Operation;
export const DeleteProjectsModelsResponse = GoogleLongrunning__Operation;

export type DeleteProjectsModelsError = CommonErrors;

export const deleteProjectsModels: API.OperationMethod<DeleteProjectsModelsRequest, DeleteProjectsModelsResponse, DeleteProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsModelsRequest,
  output: DeleteProjectsModelsResponse,
  errors: [],
}));

/** Gets information about a model, including its name, the description (if set), and the default version (if at least one version of the model has been deployed). */
export interface GetProjectsModelsRequest {
  /** Required. The name of the model. */
  name: string;
}

export const GetProjectsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsModelsRequest>;

export type GetProjectsModelsResponse = GoogleCloudMlV1__Model;
export const GetProjectsModelsResponse = GoogleCloudMlV1__Model;

export type GetProjectsModelsError = CommonErrors;

export const getProjectsModels: API.OperationMethod<GetProjectsModelsRequest, GetProjectsModelsResponse, GetProjectsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsModelsRequest,
  output: GetProjectsModelsResponse,
  errors: [],
}));

/** Lists the models in a project. Each project can contain multiple models, and each model can have multiple versions. If there are no models that match the request parameters, the list request returns an empty response body: {}. */
export interface ListProjectsModelsRequest {
  /** Optional. Specifies the subset of models to retrieve. */
  filter?: string;
  /** Optional. The number of models to retrieve per "page" of results. If there are more remaining results than this number, the response message will contain a valid value in the `next_page_token` field. The default value is 20, and the maximum page size is 100. */
  pageSize?: number;
  /** Optional. A page token to request the next page of results. You get the token from the `next_page_token` field of the response from the previous call. */
  pageToken?: string;
  /** Required. The name of the project whose models are to be listed. */
  parent: string;
}

export const ListProjectsModelsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/models" }),
  svc,
) as unknown as Schema.Schema<ListProjectsModelsRequest>;

export type ListProjectsModelsResponse = GoogleCloudMlV1__ListModelsResponse;
export const ListProjectsModelsResponse = GoogleCloudMlV1__ListModelsResponse;

export type ListProjectsModelsError = CommonErrors;

export const listProjectsModels = API.makePaginated(() => ({
  input: ListProjectsModelsRequest,
  output: ListProjectsModelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a model version. Each model can have multiple versions deployed and in use at any given time. Use this method to remove a single version. Note: You cannot delete the version that is set as the default version of the model unless it is the only remaining version. */
export interface DeleteProjectsModelsVersionsRequest {
  /** Required. The name of the version. You can get the names of all the versions of a model by calling projects.models.versions.list. */
  name: string;
}

export const DeleteProjectsModelsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/models/{modelsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsModelsVersionsRequest>;

export type DeleteProjectsModelsVersionsResponse = GoogleLongrunning__Operation;
export const DeleteProjectsModelsVersionsResponse = GoogleLongrunning__Operation;

export type DeleteProjectsModelsVersionsError = CommonErrors;

export const deleteProjectsModelsVersions: API.OperationMethod<DeleteProjectsModelsVersionsRequest, DeleteProjectsModelsVersionsResponse, DeleteProjectsModelsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsModelsVersionsRequest,
  output: DeleteProjectsModelsVersionsResponse,
  errors: [],
}));

/** Creates a new version of a model from a trained TensorFlow model. If the version created in the cloud by this call is the first deployed version of the specified model, it will be made the default version of the model. When you add a version to a model that already has one or more versions, the default version does not automatically change. If you want a new version to be the default, you must call projects.models.versions.setDefault. */
export interface CreateProjectsModelsVersionsRequest {
  /** Required. The name of the model. */
  parent: string;
  /** Request body */
  body?: GoogleCloudMlV1__Version;
}

export const CreateProjectsModelsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudMlV1__Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/models/{modelsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsModelsVersionsRequest>;

export type CreateProjectsModelsVersionsResponse = GoogleLongrunning__Operation;
export const CreateProjectsModelsVersionsResponse = GoogleLongrunning__Operation;

export type CreateProjectsModelsVersionsError = CommonErrors;

export const createProjectsModelsVersions: API.OperationMethod<CreateProjectsModelsVersionsRequest, CreateProjectsModelsVersionsResponse, CreateProjectsModelsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsModelsVersionsRequest,
  output: CreateProjectsModelsVersionsResponse,
  errors: [],
}));

/** Updates the specified Version resource. Currently the only update-able fields are `description`, `requestLoggingConfig`, `autoScaling.minNodes`, and `manualScaling.nodes`. */
export interface PatchProjectsModelsVersionsRequest {
  /** Required. The name of the model. */
  name: string;
  /** Required. Specifies the path, relative to `Version`, of the field to update. Must be present and non-empty. For example, to change the description of a version to "foo", the `update_mask` parameter would be specified as `description`, and the `PATCH` request body would specify the new value, as follows: ``` { "description": "foo" } ``` Currently the only supported update mask fields are `description`, `requestLoggingConfig`, `autoScaling.minNodes`, and `manualScaling.nodes`. However, you can only update `manualScaling.nodes` if the version uses a [Compute Engine (N1) machine type](/ml-engine/docs/machine-types-online-prediction). */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudMlV1__Version;
}

export const PatchProjectsModelsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudMlV1__Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/models/{modelsId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsModelsVersionsRequest>;

export type PatchProjectsModelsVersionsResponse = GoogleLongrunning__Operation;
export const PatchProjectsModelsVersionsResponse = GoogleLongrunning__Operation;

export type PatchProjectsModelsVersionsError = CommonErrors;

export const patchProjectsModelsVersions: API.OperationMethod<PatchProjectsModelsVersionsRequest, PatchProjectsModelsVersionsResponse, PatchProjectsModelsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsModelsVersionsRequest,
  output: PatchProjectsModelsVersionsResponse,
  errors: [],
}));

/** Gets information about a model version. Models can have multiple versions. You can call projects.models.versions.list to get the same information that this method returns for all of the versions of a model. */
export interface GetProjectsModelsVersionsRequest {
  /** Required. The name of the version. */
  name: string;
}

export const GetProjectsModelsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/models/{modelsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsModelsVersionsRequest>;

export type GetProjectsModelsVersionsResponse = GoogleCloudMlV1__Version;
export const GetProjectsModelsVersionsResponse = GoogleCloudMlV1__Version;

export type GetProjectsModelsVersionsError = CommonErrors;

export const getProjectsModelsVersions: API.OperationMethod<GetProjectsModelsVersionsRequest, GetProjectsModelsVersionsResponse, GetProjectsModelsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsModelsVersionsRequest,
  output: GetProjectsModelsVersionsResponse,
  errors: [],
}));

/** Designates a version to be the default for the model. The default version is used for prediction requests made against the model that don't specify a version. The first version to be created for a model is automatically set as the default. You must make any subsequent changes to the default version setting manually using this method. */
export interface SetDefaultProjectsModelsVersionsRequest {
  /** Required. The name of the version to make the default for the model. You can get the names of all the versions of a model by calling projects.models.versions.list. */
  name: string;
  /** Request body */
  body?: GoogleCloudMlV1__SetDefaultVersionRequest;
}

export const SetDefaultProjectsModelsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudMlV1__SetDefaultVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/models/{modelsId}/versions/{versionsId}:setDefault", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetDefaultProjectsModelsVersionsRequest>;

export type SetDefaultProjectsModelsVersionsResponse = GoogleCloudMlV1__Version;
export const SetDefaultProjectsModelsVersionsResponse = GoogleCloudMlV1__Version;

export type SetDefaultProjectsModelsVersionsError = CommonErrors;

export const setDefaultProjectsModelsVersions: API.OperationMethod<SetDefaultProjectsModelsVersionsRequest, SetDefaultProjectsModelsVersionsResponse, SetDefaultProjectsModelsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetDefaultProjectsModelsVersionsRequest,
  output: SetDefaultProjectsModelsVersionsResponse,
  errors: [],
}));

/** Gets basic information about all the versions of a model. If you expect that a model has many versions, or if you need to handle only a limited number of results at a time, you can request that the list be retrieved in batches (called pages). If there are no versions that match the request parameters, the list request returns an empty response body: {}. */
export interface ListProjectsModelsVersionsRequest {
  /** Optional. Specifies the subset of versions to retrieve. */
  filter?: string;
  /** Optional. The number of versions to retrieve per "page" of results. If there are more remaining results than this number, the response message will contain a valid value in the `next_page_token` field. The default value is 20, and the maximum page size is 100. */
  pageSize?: number;
  /** Optional. A page token to request the next page of results. You get the token from the `next_page_token` field of the response from the previous call. */
  pageToken?: string;
  /** Required. The name of the model for which to list the version. */
  parent: string;
}

export const ListProjectsModelsVersionsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/models/{modelsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsModelsVersionsRequest>;

export type ListProjectsModelsVersionsResponse = GoogleCloudMlV1__ListVersionsResponse;
export const ListProjectsModelsVersionsResponse = GoogleCloudMlV1__ListVersionsResponse;

export type ListProjectsModelsVersionsError = CommonErrors;

export const listProjectsModelsVersions = API.makePaginated(() => ({
  input: ListProjectsModelsVersionsRequest,
  output: ListProjectsModelsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

