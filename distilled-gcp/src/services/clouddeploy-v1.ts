// ==========================================================================
// Cloud Deploy API (clouddeploy v1)
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
  name: "clouddeploy",
  version: "v1",
  rootUrl: "https://clouddeploy.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PhaseArtifact {
  /** Output only. File path of the directory of rendered job manifests relative to the URI. This is only set if it is applicable. */
  jobManifestsPath?: string;
  /** Output only. File path of the rendered manifest relative to the URI. */
  manifestPath?: string;
  /** Output only. File path of the resolved Skaffold configuration relative to the URI. */
  skaffoldConfigPath?: string;
}

export const PhaseArtifact: Schema.Schema<PhaseArtifact> = Schema.suspend(() => Schema.Struct({
  jobManifestsPath: Schema.optional(Schema.String),
  manifestPath: Schema.optional(Schema.String),
  skaffoldConfigPath: Schema.optional(Schema.String),
})).annotate({ identifier: "PhaseArtifact" }) as any as Schema.Schema<PhaseArtifact>;

export interface TargetArtifact {
  /** Output only. Map from the phase ID to the phase artifacts for the `Target`. */
  phaseArtifacts?: Record<string, PhaseArtifact>;
  /** Output only. File path of the rendered manifest relative to the URI for the stable phase. */
  manifestPath?: string;
  /** Output only. File path of the resolved Skaffold configuration for the stable phase, relative to the URI. */
  skaffoldConfigPath?: string;
  /** Output only. URI of a directory containing the artifacts. This contains deployment configuration used by Skaffold during a rollout, and all paths are relative to this location. */
  artifactUri?: string;
}

export const TargetArtifact: Schema.Schema<TargetArtifact> = Schema.suspend(() => Schema.Struct({
  phaseArtifacts: Schema.optional(Schema.Record(Schema.String, PhaseArtifact)),
  manifestPath: Schema.optional(Schema.String),
  skaffoldConfigPath: Schema.optional(Schema.String),
  artifactUri: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetArtifact" }) as any as Schema.Schema<TargetArtifact>;

export interface SkaffoldGitSource {
  /** Optional. Git branch or tag to use when cloning the repository. */
  ref?: string;
  /** Required. Git repository the package should be cloned from. */
  repo?: string;
  /** Optional. Relative path from the repository root to the Skaffold file. */
  path?: string;
}

export const SkaffoldGitSource: Schema.Schema<SkaffoldGitSource> = Schema.suspend(() => Schema.Struct({
  ref: Schema.optional(Schema.String),
  repo: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "SkaffoldGitSource" }) as any as Schema.Schema<SkaffoldGitSource>;

export interface SkaffoldGCSSource {
  /** Required. Cloud Storage source paths to copy recursively. For example, providing "gs://my-bucket/dir/configs/*" will result in Skaffold copying all files within the "dir/configs" directory in the bucket "my-bucket". */
  source?: string;
  /** Optional. Relative path from the source to the Skaffold file. */
  path?: string;
}

export const SkaffoldGCSSource: Schema.Schema<SkaffoldGCSSource> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "SkaffoldGCSSource" }) as any as Schema.Schema<SkaffoldGCSSource>;

export interface SkaffoldGCBRepoSource {
  /** Optional. Relative path from the repository root to the Skaffold Config file. */
  path?: string;
  /** Optional. Branch or tag to use when cloning the repository. */
  ref?: string;
  /** Required. Name of the Cloud Build V2 Repository. Format is projects/{project}/locations/{location}/connections/{connection}/repositories/{repository}. */
  repository?: string;
}

export const SkaffoldGCBRepoSource: Schema.Schema<SkaffoldGCBRepoSource> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  ref: Schema.optional(Schema.String),
  repository: Schema.optional(Schema.String),
})).annotate({ identifier: "SkaffoldGCBRepoSource" }) as any as Schema.Schema<SkaffoldGCBRepoSource>;

export interface SkaffoldModules {
  /** Optional. Remote git repository containing the Skaffold Config modules. */
  git?: SkaffoldGitSource;
  /** Optional. The Skaffold Config modules to use from the specified source. */
  configs?: Array<string>;
  /** Optional. Cloud Storage bucket containing the Skaffold Config modules. */
  googleCloudStorage?: SkaffoldGCSSource;
  /** Optional. Cloud Build V2 repository containing the Skaffold Config modules. */
  googleCloudBuildRepo?: SkaffoldGCBRepoSource;
}

export const SkaffoldModules: Schema.Schema<SkaffoldModules> = Schema.suspend(() => Schema.Struct({
  git: Schema.optional(SkaffoldGitSource),
  configs: Schema.optional(Schema.Array(Schema.String)),
  googleCloudStorage: Schema.optional(SkaffoldGCSSource),
  googleCloudBuildRepo: Schema.optional(SkaffoldGCBRepoSource),
})).annotate({ identifier: "SkaffoldModules" }) as any as Schema.Schema<SkaffoldModules>;

export interface CustomTargetSkaffoldActions {
  /** Optional. List of Skaffold modules Cloud Deploy will include in the Skaffold Config as required before performing diagnose. */
  includeSkaffoldModules?: Array<SkaffoldModules>;
  /** Required. The Skaffold custom action responsible for deploy operations. */
  deployAction?: string;
  /** Optional. The Skaffold custom action responsible for render operations. If not provided then Cloud Deploy will perform the render operations via `skaffold render`. */
  renderAction?: string;
}

export const CustomTargetSkaffoldActions: Schema.Schema<CustomTargetSkaffoldActions> = Schema.suspend(() => Schema.Struct({
  includeSkaffoldModules: Schema.optional(Schema.Array(SkaffoldModules)),
  deployAction: Schema.optional(Schema.String),
  renderAction: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomTargetSkaffoldActions" }) as any as Schema.Schema<CustomTargetSkaffoldActions>;

export interface CustomTargetType {
  /** Output only. Unique identifier of the `CustomTargetType`. */
  uid?: string;
  /** Optional. Configures render and deploy for the `CustomTargetType` using Skaffold custom actions. */
  customActions?: CustomTargetSkaffoldActions;
  /** Output only. Resource id of the `CustomTargetType`. */
  customTargetTypeId?: string;
  /** Output only. Most recent time at which the `CustomTargetType` was updated. */
  updateTime?: string;
  /** Optional. Description of the `CustomTargetType`. Max length is 255 characters. */
  description?: string;
  /** Output only. Time at which the `CustomTargetType` was created. */
  createTime?: string;
  /** Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Identifier. Name of the `CustomTargetType`. Format is `projects/{project}/locations/{location}/customTargetTypes/{customTargetType}`. The `customTargetType` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
}

export const CustomTargetType: Schema.Schema<CustomTargetType> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  customActions: Schema.optional(CustomTargetSkaffoldActions),
  customTargetTypeId: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CustomTargetType" }) as any as Schema.Schema<CustomTargetType>;

export interface CustomMetadata {
  /** Output only. Key-value pairs provided by the user-defined operation. */
  values?: Record<string, string>;
}

export const CustomMetadata: Schema.Schema<CustomMetadata> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CustomMetadata" }) as any as Schema.Schema<CustomMetadata>;

export interface CloudRunRenderMetadata {
  /** Output only. The name of the Cloud Run Service in the rendered manifest. Format is `projects/{project}/locations/{location}/services/{service}`. */
  service?: string;
  /** Output only. The name of the Cloud Run Worker Pool in the rendered manifest. Format is `projects/{project}/locations/{location}/workerPools/{worker_pool}`. */
  workerPool?: string;
}

export const CloudRunRenderMetadata: Schema.Schema<CloudRunRenderMetadata> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRunRenderMetadata" }) as any as Schema.Schema<CloudRunRenderMetadata>;

export interface RenderMetadata {
  /** Output only. Custom metadata provided by user-defined render operation. */
  custom?: CustomMetadata;
  /** Output only. Metadata associated with rendering for Cloud Run. */
  cloudRun?: CloudRunRenderMetadata;
}

export const RenderMetadata: Schema.Schema<RenderMetadata> = Schema.suspend(() => Schema.Struct({
  custom: Schema.optional(CustomMetadata),
  cloudRun: Schema.optional(CloudRunRenderMetadata),
})).annotate({ identifier: "RenderMetadata" }) as any as Schema.Schema<RenderMetadata>;

export interface TargetRender {
  /** Output only. Reason this render failed. This will always be unspecified while the render in progress. */
  failureCause?: "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "CLOUD_BUILD_REQUEST_FAILED" | "VERIFICATION_CONFIG_NOT_FOUND" | "CUSTOM_ACTION_NOT_FOUND" | "DEPLOYMENT_STRATEGY_NOT_SUPPORTED" | "RENDER_FEATURE_NOT_SUPPORTED" | (string & {});
  /** Output only. Current state of the render operation for this Target. */
  renderingState?: "TARGET_RENDER_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
  /** Output only. The resource name of the Cloud Build `Build` object that is used to render the manifest for this target. Format is `projects/{project}/locations/{location}/builds/{build}`. */
  renderingBuild?: string;
  /** Output only. Metadata related to the `Release` render for this Target. */
  metadata?: RenderMetadata;
  /** Output only. Additional information about the render failure, if available. */
  failureMessage?: string;
}

export const TargetRender: Schema.Schema<TargetRender> = Schema.suspend(() => Schema.Struct({
  failureCause: Schema.optional(Schema.String),
  renderingState: Schema.optional(Schema.String),
  renderingBuild: Schema.optional(Schema.String),
  metadata: Schema.optional(RenderMetadata),
  failureMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetRender" }) as any as Schema.Schema<TargetRender>;

export interface TargetsTypeCondition {
  /** True if the targets are all a comparable type. For example this is true if all targets are GKE clusters. This is false if some targets are Cloud Run targets and others are GKE clusters. */
  status?: boolean;
  /** Human readable error message. */
  errorDetails?: string;
}

export const TargetsTypeCondition: Schema.Schema<TargetsTypeCondition> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Boolean),
  errorDetails: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetsTypeCondition" }) as any as Schema.Schema<TargetsTypeCondition>;

export interface TargetsPresentCondition {
  /** True if there aren't any missing Targets. */
  status?: boolean;
  /** Last time the condition was updated. */
  updateTime?: string;
  /** The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`. */
  missingTargets?: Array<string>;
}

export const TargetsPresentCondition: Schema.Schema<TargetsPresentCondition> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
  missingTargets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TargetsPresentCondition" }) as any as Schema.Schema<TargetsPresentCondition>;

export interface PipelineReadyCondition {
  /** True if the Pipeline is in a valid state. Otherwise at least one condition in `PipelineCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Pipeline. */
  status?: boolean;
  /** Last time the condition was updated. */
  updateTime?: string;
}

export const PipelineReadyCondition: Schema.Schema<PipelineReadyCondition> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PipelineReadyCondition" }) as any as Schema.Schema<PipelineReadyCondition>;

export interface PipelineCondition {
  /** Details on the whether the targets enumerated in the pipeline are of the same type. */
  targetsTypeCondition?: TargetsTypeCondition;
  /** Details around targets enumerated in the pipeline. */
  targetsPresentCondition?: TargetsPresentCondition;
  /** Details around the Pipeline's overall status. */
  pipelineReadyCondition?: PipelineReadyCondition;
}

export const PipelineCondition: Schema.Schema<PipelineCondition> = Schema.suspend(() => Schema.Struct({
  targetsTypeCondition: Schema.optional(TargetsTypeCondition),
  targetsPresentCondition: Schema.optional(TargetsPresentCondition),
  pipelineReadyCondition: Schema.optional(PipelineReadyCondition),
})).annotate({ identifier: "PipelineCondition" }) as any as Schema.Schema<PipelineCondition>;

export interface DeployParameters {
  /** Optional. Deploy parameters are applied to targets with match labels. If unspecified, deploy parameters are applied to all targets (including child targets of a multi-target). */
  matchTargetLabels?: Record<string, string>;
  /** Required. Values are deploy parameters in key-value pairs. */
  values?: Record<string, string>;
}

export const DeployParameters: Schema.Schema<DeployParameters> = Schema.suspend(() => Schema.Struct({
  matchTargetLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DeployParameters" }) as any as Schema.Schema<DeployParameters>;

export interface Postdeploy {
  /** Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job. */
  actions?: Array<string>;
}

export const Postdeploy: Schema.Schema<Postdeploy> = Schema.suspend(() => Schema.Struct({
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Postdeploy" }) as any as Schema.Schema<Postdeploy>;

export interface Predeploy {
  /** Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job. */
  actions?: Array<string>;
}

export const Predeploy: Schema.Schema<Predeploy> = Schema.suspend(() => Schema.Struct({
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Predeploy" }) as any as Schema.Schema<Predeploy>;

export interface Standard {
  /** Optional. Whether to verify a deployment via `skaffold verify`. */
  verify?: boolean;
  /** Optional. Configuration for the postdeploy job. If this is not configured, the postdeploy job will not be present. */
  postdeploy?: Postdeploy;
  /** Optional. Configuration for the predeploy job. If this is not configured, the predeploy job will not be present. */
  predeploy?: Predeploy;
}

export const Standard: Schema.Schema<Standard> = Schema.suspend(() => Schema.Struct({
  verify: Schema.optional(Schema.Boolean),
  postdeploy: Schema.optional(Postdeploy),
  predeploy: Schema.optional(Predeploy),
})).annotate({ identifier: "Standard" }) as any as Schema.Schema<Standard>;

export interface PhaseConfig {
  /** Optional. Configuration for the predeploy job of this phase. If this is not configured, there will be no predeploy job for this phase. */
  predeploy?: Predeploy;
  /** Optional. Skaffold profiles to use when rendering the manifest for this phase. These are in addition to the profiles list specified in the `DeliveryPipeline` stage. */
  profiles?: Array<string>;
  /** Optional. Whether to run verify tests after the deployment via `skaffold verify`. */
  verify?: boolean;
  /** Required. The ID to assign to the `Rollout` phase. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. */
  phaseId?: string;
  /** Required. Percentage deployment for the phase. */
  percentage?: number;
  /** Optional. Configuration for the postdeploy job of this phase. If this is not configured, there will be no postdeploy job for this phase. */
  postdeploy?: Postdeploy;
}

export const PhaseConfig: Schema.Schema<PhaseConfig> = Schema.suspend(() => Schema.Struct({
  predeploy: Schema.optional(Predeploy),
  profiles: Schema.optional(Schema.Array(Schema.String)),
  verify: Schema.optional(Schema.Boolean),
  phaseId: Schema.optional(Schema.String),
  percentage: Schema.optional(Schema.Number),
  postdeploy: Schema.optional(Postdeploy),
})).annotate({ identifier: "PhaseConfig" }) as any as Schema.Schema<PhaseConfig>;

export interface CustomCanaryDeployment {
  /** Required. Configuration for each phase in the canary deployment in the order executed. */
  phaseConfigs?: Array<PhaseConfig>;
}

export const CustomCanaryDeployment: Schema.Schema<CustomCanaryDeployment> = Schema.suspend(() => Schema.Struct({
  phaseConfigs: Schema.optional(Schema.Array(PhaseConfig)),
})).annotate({ identifier: "CustomCanaryDeployment" }) as any as Schema.Schema<CustomCanaryDeployment>;

export interface CanaryDeployment {
  /** Required. The percentage based deployments that will occur as a part of a `Rollout`. List is expected in ascending order and each integer n is 0 <= n < 100. If the GatewayServiceMesh is configured for Kubernetes, then the range for n is 0 <= n <= 100. */
  percentages?: Array<number>;
  /** Optional. Whether to run verify tests after each percentage deployment via `skaffold verify`. */
  verify?: boolean;
  /** Optional. Configuration for the predeploy job of the first phase. If this is not configured, there will be no predeploy job for this phase. */
  predeploy?: Predeploy;
  /** Optional. Configuration for the postdeploy job of the last phase. If this is not configured, there will be no postdeploy job for this phase. */
  postdeploy?: Postdeploy;
}

export const CanaryDeployment: Schema.Schema<CanaryDeployment> = Schema.suspend(() => Schema.Struct({
  percentages: Schema.optional(Schema.Array(Schema.Number)),
  verify: Schema.optional(Schema.Boolean),
  predeploy: Schema.optional(Predeploy),
  postdeploy: Schema.optional(Postdeploy),
})).annotate({ identifier: "CanaryDeployment" }) as any as Schema.Schema<CanaryDeployment>;

export interface ServiceNetworking {
  /** Optional. The label to use when selecting Pods for the Deployment resource. This label must already be present in the Deployment. */
  podSelectorLabel?: string;
  /** Required. Name of the Kubernetes Deployment whose traffic is managed by the specified Service. */
  deployment?: string;
  /** Optional. Whether to disable Pod overprovisioning. If Pod overprovisioning is disabled then Cloud Deploy will limit the number of total Pods used for the deployment strategy to the number of Pods the Deployment has on the cluster. */
  disablePodOverprovisioning?: boolean;
  /** Required. Name of the Kubernetes Service. */
  service?: string;
}

export const ServiceNetworking: Schema.Schema<ServiceNetworking> = Schema.suspend(() => Schema.Struct({
  podSelectorLabel: Schema.optional(Schema.String),
  deployment: Schema.optional(Schema.String),
  disablePodOverprovisioning: Schema.optional(Schema.Boolean),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceNetworking" }) as any as Schema.Schema<ServiceNetworking>;

export interface RouteDestinations {
  /** Optional. Whether to propagate the Kubernetes Service to the route destination clusters. The Service will always be deployed to the Target cluster even if the HTTPRoute is not. This option may be used to facilitate successful DNS lookup in the route destination clusters. Can only be set to true if destinations are specified. */
  propagateService?: boolean;
  /** Required. The clusters where the Gateway API HTTPRoute resource will be deployed to. Valid entries include the associated entities IDs configured in the Target resource and "@self" to include the Target cluster. */
  destinationIds?: Array<string>;
}

export const RouteDestinations: Schema.Schema<RouteDestinations> = Schema.suspend(() => Schema.Struct({
  propagateService: Schema.optional(Schema.Boolean),
  destinationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RouteDestinations" }) as any as Schema.Schema<RouteDestinations>;

export interface GatewayServiceMesh {
  /** Required. Name of the Kubernetes Service. */
  service?: string;
  /** Optional. Route destinations allow configuring the Gateway API HTTPRoute to be deployed to additional clusters. This option is available for multi-cluster service mesh set ups that require the route to exist in the clusters that call the service. If unspecified, the HTTPRoute will only be deployed to the Target cluster. */
  routeDestinations?: RouteDestinations;
  /** Required. Name of the Kubernetes Deployment whose traffic is managed by the specified HTTPRoute and Service. */
  deployment?: string;
  /** Required. Name of the Gateway API HTTPRoute. */
  httpRoute?: string;
  /** Optional. The amount of time to migrate traffic back from the canary Service to the original Service during the stable phase deployment. If specified, must be between 15s and 3600s. If unspecified, there is no cutback time. */
  stableCutbackDuration?: string;
  /** Optional. The time to wait for route updates to propagate. The maximum configurable time is 3 hours, in seconds format. If unspecified, there is no wait time. */
  routeUpdateWaitTime?: string;
  /** Optional. The label to use when selecting Pods for the Deployment and Service resources. This label must already be present in both resources. */
  podSelectorLabel?: string;
}

export const GatewayServiceMesh: Schema.Schema<GatewayServiceMesh> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  routeDestinations: Schema.optional(RouteDestinations),
  deployment: Schema.optional(Schema.String),
  httpRoute: Schema.optional(Schema.String),
  stableCutbackDuration: Schema.optional(Schema.String),
  routeUpdateWaitTime: Schema.optional(Schema.String),
  podSelectorLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "GatewayServiceMesh" }) as any as Schema.Schema<GatewayServiceMesh>;

export interface KubernetesConfig {
  /** Optional. Kubernetes Service networking configuration. */
  serviceNetworking?: ServiceNetworking;
  /** Optional. Kubernetes Gateway API service mesh configuration. */
  gatewayServiceMesh?: GatewayServiceMesh;
}

export const KubernetesConfig: Schema.Schema<KubernetesConfig> = Schema.suspend(() => Schema.Struct({
  serviceNetworking: Schema.optional(ServiceNetworking),
  gatewayServiceMesh: Schema.optional(GatewayServiceMesh),
})).annotate({ identifier: "KubernetesConfig" }) as any as Schema.Schema<KubernetesConfig>;

export interface CloudRunConfig {
  /** Optional. Whether Cloud Deploy should update the traffic stanza in a Cloud Run Service on the user's behalf to facilitate traffic splitting. This is required to be true for CanaryDeployments, but optional for CustomCanaryDeployments. */
  automaticTrafficControl?: boolean;
  /** Optional. A list of tags that are added to the final stable revision when the stable phase is applied. */
  stableRevisionTags?: Array<string>;
  /** Optional. A list of tags that are added to the prior revision while the canary phase is in progress. */
  priorRevisionTags?: Array<string>;
  /** Optional. A list of tags that are added to the canary revision while the canary phase is in progress. */
  canaryRevisionTags?: Array<string>;
}

export const CloudRunConfig: Schema.Schema<CloudRunConfig> = Schema.suspend(() => Schema.Struct({
  automaticTrafficControl: Schema.optional(Schema.Boolean),
  stableRevisionTags: Schema.optional(Schema.Array(Schema.String)),
  priorRevisionTags: Schema.optional(Schema.Array(Schema.String)),
  canaryRevisionTags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CloudRunConfig" }) as any as Schema.Schema<CloudRunConfig>;

export interface RuntimeConfig {
  /** Optional. Kubernetes runtime configuration. */
  kubernetes?: KubernetesConfig;
  /** Optional. Cloud Run runtime configuration. */
  cloudRun?: CloudRunConfig;
}

export const RuntimeConfig: Schema.Schema<RuntimeConfig> = Schema.suspend(() => Schema.Struct({
  kubernetes: Schema.optional(KubernetesConfig),
  cloudRun: Schema.optional(CloudRunConfig),
})).annotate({ identifier: "RuntimeConfig" }) as any as Schema.Schema<RuntimeConfig>;

export interface Canary {
  /** Optional. Configures the progressive based deployment for a Target, but allows customizing at the phase level where a phase represents each of the percentage deployments. */
  customCanaryDeployment?: CustomCanaryDeployment;
  /** Optional. Configures the progressive based deployment for a Target. */
  canaryDeployment?: CanaryDeployment;
  /** Optional. Runtime specific configurations for the deployment strategy. The runtime configuration is used to determine how Cloud Deploy will split traffic to enable a progressive deployment. */
  runtimeConfig?: RuntimeConfig;
}

export const Canary: Schema.Schema<Canary> = Schema.suspend(() => Schema.Struct({
  customCanaryDeployment: Schema.optional(CustomCanaryDeployment),
  canaryDeployment: Schema.optional(CanaryDeployment),
  runtimeConfig: Schema.optional(RuntimeConfig),
})).annotate({ identifier: "Canary" }) as any as Schema.Schema<Canary>;

export interface Strategy {
  /** Optional. Standard deployment strategy executes a single deploy and allows verifying the deployment. */
  standard?: Standard;
  /** Optional. Canary deployment strategy provides progressive percentage based deployments to a Target. */
  canary?: Canary;
}

export const Strategy: Schema.Schema<Strategy> = Schema.suspend(() => Schema.Struct({
  standard: Schema.optional(Standard),
  canary: Schema.optional(Canary),
})).annotate({ identifier: "Strategy" }) as any as Schema.Schema<Strategy>;

export interface Stage {
  /** Optional. Skaffold profiles to use when rendering the manifest for this stage's `Target`. */
  profiles?: Array<string>;
  /** Optional. The target_id to which this stage points. This field refers exclusively to the last segment of a target name. For example, this field would just be `my-target` (rather than `projects/project/locations/location/targets/my-target`). The location of the `Target` is inferred to be the same as the location of the `DeliveryPipeline` that contains this `Stage`. */
  targetId?: string;
  /** Optional. The deploy parameters to use for the target in this stage. */
  deployParameters?: Array<DeployParameters>;
  /** Optional. The strategy to use for a `Rollout` to this stage. */
  strategy?: Strategy;
}

export const Stage: Schema.Schema<Stage> = Schema.suspend(() => Schema.Struct({
  profiles: Schema.optional(Schema.Array(Schema.String)),
  targetId: Schema.optional(Schema.String),
  deployParameters: Schema.optional(Schema.Array(DeployParameters)),
  strategy: Schema.optional(Strategy),
})).annotate({ identifier: "Stage" }) as any as Schema.Schema<Stage>;

export interface SerialPipeline {
  /** Optional. Each stage specifies configuration for a `Target`. The ordering of this list defines the promotion flow. */
  stages?: Array<Stage>;
}

export const SerialPipeline: Schema.Schema<SerialPipeline> = Schema.suspend(() => Schema.Struct({
  stages: Schema.optional(Schema.Array(Stage)),
})).annotate({ identifier: "SerialPipeline" }) as any as Schema.Schema<SerialPipeline>;

export interface DeliveryPipeline {
  /** Output only. Time at which the pipeline was created. */
  createTime?: string;
  /** Optional. When suspended, no new releases or rollouts can be created, but in-progress ones will complete. */
  suspended?: boolean;
  /** Optional. Description of the `DeliveryPipeline`. Max length is 255 characters. */
  description?: string;
  /** Output only. Information around the state of the Delivery Pipeline. */
  condition?: PipelineCondition;
  /** Output only. Unique identifier of the `DeliveryPipeline`. */
  uid?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. */
  annotations?: Record<string, string>;
  /** Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name?: string;
  /** Optional. SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`. */
  serialPipeline?: SerialPipeline;
  /** Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Most recent time at which the pipeline was updated. */
  updateTime?: string;
}

export const DeliveryPipeline: Schema.Schema<DeliveryPipeline> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  suspended: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  condition: Schema.optional(PipelineCondition),
  uid: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  serialPipeline: Schema.optional(SerialPipeline),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryPipeline" }) as any as Schema.Schema<DeliveryPipeline>;

export interface BuildArtifact {
  /** Optional. Image tag to use. This will generally be the full path to an image, such as "gcr.io/my-project/busybox:1.2.3" or "gcr.io/my-project/busybox@sha256:abc123". */
  tag?: string;
  /** Optional. Image name in Skaffold configuration. */
  image?: string;
}

export const BuildArtifact: Schema.Schema<BuildArtifact> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildArtifact" }) as any as Schema.Schema<BuildArtifact>;

export interface ToolVersionSupportedCondition {
  /** Output only. True if the version of Tool used by this release is supported. */
  status?: boolean;
  /** Output only. The tool support state for this release's version of the tool. */
  toolVersionSupportState?: "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED" | "TOOL_VERSION_SUPPORT_STATE_SUPPORTED" | "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE" | "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED" | (string & {});
  /** Output only. The time at which this release's version of the tool will no longer be supported. */
  supportExpirationTime?: string;
  /** Output only. The time at which this release's version of the tool will enter maintenance mode. */
  maintenanceModeTime?: string;
}

export const ToolVersionSupportedCondition: Schema.Schema<ToolVersionSupportedCondition> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Boolean),
  toolVersionSupportState: Schema.optional(Schema.String),
  supportExpirationTime: Schema.optional(Schema.String),
  maintenanceModeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ToolVersionSupportedCondition" }) as any as Schema.Schema<ToolVersionSupportedCondition>;

export interface ReleaseReadyCondition {
  /** True if the Release is in a valid state. Otherwise at least one condition in `ReleaseCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Release. */
  status?: boolean;
}

export const ReleaseReadyCondition: Schema.Schema<ReleaseReadyCondition> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ReleaseReadyCondition" }) as any as Schema.Schema<ReleaseReadyCondition>;

export interface SkaffoldSupportedCondition {
  /** The time at which this release's version of Skaffold will no longer be supported. */
  supportExpirationTime?: string;
  /** True if the version of Skaffold used by this release is supported. */
  status?: boolean;
  /** The Skaffold support state for this release's version of Skaffold. */
  skaffoldSupportState?: "SKAFFOLD_SUPPORT_STATE_UNSPECIFIED" | "SKAFFOLD_SUPPORT_STATE_SUPPORTED" | "SKAFFOLD_SUPPORT_STATE_MAINTENANCE_MODE" | "SKAFFOLD_SUPPORT_STATE_UNSUPPORTED" | (string & {});
  /** The time at which this release's version of Skaffold will enter maintenance mode. */
  maintenanceModeTime?: string;
}

export const SkaffoldSupportedCondition: Schema.Schema<SkaffoldSupportedCondition> = Schema.suspend(() => Schema.Struct({
  supportExpirationTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Boolean),
  skaffoldSupportState: Schema.optional(Schema.String),
  maintenanceModeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SkaffoldSupportedCondition" }) as any as Schema.Schema<SkaffoldSupportedCondition>;

export interface ReleaseCondition {
  /** Output only. Details around the support state of the release's Kubectl version. */
  kubectlVersionSupportedCondition?: ToolVersionSupportedCondition;
  /** Output only. Details around the support state of the release's kpt version. */
  kptVersionSupportedCondition?: ToolVersionSupportedCondition;
  /** Output only. Details around the support state of the release's Docker version. */
  dockerVersionSupportedCondition?: ToolVersionSupportedCondition;
  /** Output only. Details around the support state of the release's Helm version. */
  helmVersionSupportedCondition?: ToolVersionSupportedCondition;
  /** Details around the Releases's overall status. */
  releaseReadyCondition?: ReleaseReadyCondition;
  /** Output only. Details around the support state of the release's Skaffold version. */
  skaffoldVersionSupportedCondition?: ToolVersionSupportedCondition;
  /** Details around the support state of the release's Skaffold version. */
  skaffoldSupportedCondition?: SkaffoldSupportedCondition;
  /** Output only. Details around the support state of the release's Kustomize version. */
  kustomizeVersionSupportedCondition?: ToolVersionSupportedCondition;
}

export const ReleaseCondition: Schema.Schema<ReleaseCondition> = Schema.suspend(() => Schema.Struct({
  kubectlVersionSupportedCondition: Schema.optional(ToolVersionSupportedCondition),
  kptVersionSupportedCondition: Schema.optional(ToolVersionSupportedCondition),
  dockerVersionSupportedCondition: Schema.optional(ToolVersionSupportedCondition),
  helmVersionSupportedCondition: Schema.optional(ToolVersionSupportedCondition),
  releaseReadyCondition: Schema.optional(ReleaseReadyCondition),
  skaffoldVersionSupportedCondition: Schema.optional(ToolVersionSupportedCondition),
  skaffoldSupportedCondition: Schema.optional(SkaffoldSupportedCondition),
  kustomizeVersionSupportedCondition: Schema.optional(ToolVersionSupportedCondition),
})).annotate({ identifier: "ReleaseCondition" }) as any as Schema.Schema<ReleaseCondition>;

export interface AnthosCluster {
  /** Optional. Membership of the GKE Hub-registered cluster to which to apply the Skaffold configuration. Format is `projects/{project}/locations/{location}/memberships/{membership_name}`. */
  membership?: string;
}

export const AnthosCluster: Schema.Schema<AnthosCluster> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Schema.String),
})).annotate({ identifier: "AnthosCluster" }) as any as Schema.Schema<AnthosCluster>;

export interface CloudRunLocation {
  /** Required. The location for the Cloud Run Service. Format must be `projects/{project}/locations/{location}`. */
  location?: string;
}

export const CloudRunLocation: Schema.Schema<CloudRunLocation> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRunLocation" }) as any as Schema.Schema<CloudRunLocation>;

export interface MultiTarget {
  /** Required. The target_ids of this multiTarget. */
  targetIds?: Array<string>;
}

export const MultiTarget: Schema.Schema<MultiTarget> = Schema.suspend(() => Schema.Struct({
  targetIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MultiTarget" }) as any as Schema.Schema<MultiTarget>;

export interface CustomTarget {
  /** Required. The name of the CustomTargetType. Format must be `projects/{project}/locations/{location}/customTargetTypes/{custom_target_type}`. */
  customTargetType?: string;
}

export const CustomTarget: Schema.Schema<CustomTarget> = Schema.suspend(() => Schema.Struct({
  customTargetType: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomTarget" }) as any as Schema.Schema<CustomTarget>;

export interface GkeCluster {
  /** Optional. If true, `cluster` is accessed using the private IP address of the control plane endpoint. Otherwise, the default IP address of the control plane endpoint is used. The default IP address is the private IP address for clusters with private control-plane endpoints and the public IP address otherwise. Only specify this option when `cluster` is a [private GKE cluster](https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept). Note that `internal_ip` and `dns_endpoint` cannot both be set to true. */
  internalIp?: boolean;
  /** Optional. If set, used to configure a [proxy](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#proxy) to the Kubernetes server. */
  proxyUrl?: string;
  /** Optional. If set, the cluster will be accessed using the DNS endpoint. Note that both `dns_endpoint` and `internal_ip` cannot be set to true. */
  dnsEndpoint?: boolean;
  /** Optional. Information specifying a GKE Cluster. Format is `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}`. */
  cluster?: string;
}

export const GkeCluster: Schema.Schema<GkeCluster> = Schema.suspend(() => Schema.Struct({
  internalIp: Schema.optional(Schema.Boolean),
  proxyUrl: Schema.optional(Schema.String),
  dnsEndpoint: Schema.optional(Schema.Boolean),
  cluster: Schema.optional(Schema.String),
})).annotate({ identifier: "GkeCluster" }) as any as Schema.Schema<GkeCluster>;

export interface AssociatedEntities {
  /** Optional. Information specifying Anthos clusters as associated entities. */
  anthosClusters?: Array<AnthosCluster>;
  /** Optional. Information specifying GKE clusters as associated entities. */
  gkeClusters?: Array<GkeCluster>;
}

export const AssociatedEntities: Schema.Schema<AssociatedEntities> = Schema.suspend(() => Schema.Struct({
  anthosClusters: Schema.optional(Schema.Array(AnthosCluster)),
  gkeClusters: Schema.optional(Schema.Array(GkeCluster)),
})).annotate({ identifier: "AssociatedEntities" }) as any as Schema.Schema<AssociatedEntities>;

export interface PrivatePool {
  /** Optional. Google service account to use for execution. If unspecified, the project execution service account (-compute@developer.gserviceaccount.com) will be used. */
  serviceAccount?: string;
  /** Optional. Cloud Storage location where execution outputs should be stored. This can either be a bucket ("gs://my-bucket") or a path within a bucket ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the same region will be used. */
  artifactStorage?: string;
  /** Required. Resource name of the Cloud Build worker pool to use. The format is `projects/{project}/locations/{location}/workerPools/{pool}`. */
  workerPool?: string;
}

export const PrivatePool: Schema.Schema<PrivatePool> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
  artifactStorage: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivatePool" }) as any as Schema.Schema<PrivatePool>;

export interface DefaultPool {
  /** Optional. Google service account to use for execution. If unspecified, the project execution service account (-compute@developer.gserviceaccount.com) will be used. */
  serviceAccount?: string;
  /** Optional. Cloud Storage location where execution outputs should be stored. This can either be a bucket ("gs://my-bucket") or a path within a bucket ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the same region will be used. */
  artifactStorage?: string;
}

export const DefaultPool: Schema.Schema<DefaultPool> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
  artifactStorage: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultPool" }) as any as Schema.Schema<DefaultPool>;

export interface ExecutionConfig {
  /** Optional. If true, additional logging will be enabled when running builds in this execution environment. */
  verbose?: boolean;
  /** Optional. Use private Cloud Build pool. */
  privatePool?: PrivatePool;
  /** Required. Usages when this configuration should be applied. */
  usages?: Array<"EXECUTION_ENVIRONMENT_USAGE_UNSPECIFIED" | "RENDER" | "DEPLOY" | "VERIFY" | "PREDEPLOY" | "POSTDEPLOY" | (string & {})>;
  /** Optional. Google service account to use for execution. If unspecified, the project execution service account (-compute@developer.gserviceaccount.com) is used. */
  serviceAccount?: string;
  /** Optional. Cloud Storage location in which to store execution outputs. This can either be a bucket ("gs://my-bucket") or a path within a bucket ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the same region will be used. */
  artifactStorage?: string;
  /** Optional. Use default Cloud Build pool. */
  defaultPool?: DefaultPool;
  /** Optional. Execution timeout for a Cloud Build Execution. This must be between 10m and 24h in seconds format. If unspecified, a default timeout of 1h is used. */
  executionTimeout?: string;
  /** Optional. The resource name of the `WorkerPool`, with the format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. If this optional field is unspecified, the default Cloud Build pool will be used. */
  workerPool?: string;
}

export const ExecutionConfig: Schema.Schema<ExecutionConfig> = Schema.suspend(() => Schema.Struct({
  verbose: Schema.optional(Schema.Boolean),
  privatePool: Schema.optional(PrivatePool),
  usages: Schema.optional(Schema.Array(Schema.String)),
  serviceAccount: Schema.optional(Schema.String),
  artifactStorage: Schema.optional(Schema.String),
  defaultPool: Schema.optional(DefaultPool),
  executionTimeout: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutionConfig" }) as any as Schema.Schema<ExecutionConfig>;

export interface Target {
  /** Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** Optional. Description of the `Target`. Max length is 255 characters. */
  description?: string;
  /** Optional. Information specifying an Anthos Cluster. */
  anthosCluster?: AnthosCluster;
  /** Identifier. Name of the `Target`. Format is `projects/{project}/locations/{location}/targets/{target}`. The `target` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name?: string;
  /** Output only. Unique identifier of the `Target`. */
  uid?: string;
  /** Optional. Information specifying a Cloud Run deployment target. */
  run?: CloudRunLocation;
  /** Optional. The deploy parameters to use for this target. */
  deployParameters?: Record<string, string>;
  /** Optional. Information specifying a multiTarget. */
  multiTarget?: MultiTarget;
  /** Output only. Time at which the `Target` was created. */
  createTime?: string;
  /** Optional. Information specifying a Custom Target. */
  customTarget?: CustomTarget;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Whether or not the `Target` requires approval. */
  requireApproval?: boolean;
  /** Output only. Resource id of the `Target`. */
  targetId?: string;
  /** Optional. Information specifying a GKE Cluster. */
  gke?: GkeCluster;
  /** Output only. Most recent time at which the `Target` was updated. */
  updateTime?: string;
  /** Optional. Map of entity IDs to their associated entities. Associated entities allows specifying places other than the deployment target for specific features. For example, the Gateway API canary can be configured to deploy the HTTPRoute to a different cluster(s) than the deployment cluster using associated entities. An entity ID must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. */
  associatedEntities?: Record<string, AssociatedEntities>;
  /** Optional. Configurations for all execution that relates to this `Target`. Each `ExecutionEnvironmentUsage` value may only be used in a single configuration; using the same value multiple times is an error. When one or more configurations are specified, they must include the `RENDER` and `DEPLOY` `ExecutionEnvironmentUsage` values. When no configurations are specified, execution will use the default specified in `DefaultPool`. */
  executionConfigs?: Array<ExecutionConfig>;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
}

export const Target: Schema.Schema<Target> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  anthosCluster: Schema.optional(AnthosCluster),
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  run: Schema.optional(CloudRunLocation),
  deployParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  multiTarget: Schema.optional(MultiTarget),
  createTime: Schema.optional(Schema.String),
  customTarget: Schema.optional(CustomTarget),
  etag: Schema.optional(Schema.String),
  requireApproval: Schema.optional(Schema.Boolean),
  targetId: Schema.optional(Schema.String),
  gke: Schema.optional(GkeCluster),
  updateTime: Schema.optional(Schema.String),
  associatedEntities: Schema.optional(Schema.Record(Schema.String, AssociatedEntities)),
  executionConfigs: Schema.optional(Schema.Array(ExecutionConfig)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Target" }) as any as Schema.Schema<Target>;

export interface ToolVersions {
  /** Optional. The Kustomize version to use for Cloud Deploy operations. */
  kustomize?: string;
  /** Optional. The kpt version to use for Cloud Deploy operations. */
  kpt?: string;
  /** Optional. The Helm version to use for Cloud Deploy operations. */
  helm?: string;
  /** Optional. The Kubectl version to use for Cloud Deploy operations. */
  kubectl?: string;
  /** Optional. The Skaffold version to use for Cloud Deploy operations. */
  skaffold?: string;
  /** Optional. The Docker version to use for Cloud Deploy operations. */
  docker?: string;
}

export const ToolVersions: Schema.Schema<ToolVersions> = Schema.suspend(() => Schema.Struct({
  kustomize: Schema.optional(Schema.String),
  kpt: Schema.optional(Schema.String),
  helm: Schema.optional(Schema.String),
  kubectl: Schema.optional(Schema.String),
  skaffold: Schema.optional(Schema.String),
  docker: Schema.optional(Schema.String),
})).annotate({ identifier: "ToolVersions" }) as any as Schema.Schema<ToolVersions>;

export interface Release {
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Map from target ID to the target artifacts created during the render operation. */
  targetArtifacts?: Record<string, TargetArtifact>;
  /** Output only. Snapshot of the custom target types referenced by the targets taken at release creation time. */
  customTargetTypeSnapshots?: Array<CustomTargetType>;
  /** Optional. Description of the `Release`. Max length is 255 characters. */
  description?: string;
  /** Output only. Time at which the `Release` was created. */
  createTime?: string;
  /** Output only. Map from target ID to details of the render operation for that target. */
  targetRenders?: Record<string, TargetRender>;
  /** Output only. Snapshot of the parent pipeline taken at release creation time. */
  deliveryPipelineSnapshot?: DeliveryPipeline;
  /** Optional. List of artifacts to pass through to Skaffold command. */
  buildArtifacts?: Array<BuildArtifact>;
  /** Identifier. Name of the `Release`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. The `release` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name?: string;
  /** Output only. Current state of the render operation. */
  renderState?: "RENDER_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
  /** Output only. Indicates whether this is an abandoned release. */
  abandoned?: boolean;
  /** Output only. Information around the state of the Release. */
  condition?: ReleaseCondition;
  /** Output only. Snapshot of the targets taken at release creation time. */
  targetSnapshots?: Array<Target>;
  /** Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** Optional. The Skaffold version to use when operating on this release, such as "1.20.0". Not all versions are valid; Cloud Deploy supports a specific set of versions. If unset, the most recent supported Skaffold version will be used. */
  skaffoldVersion?: string;
  /** Optional. Filepath of the Skaffold config inside of the config URI. */
  skaffoldConfigPath?: string;
  /** Optional. The tool versions to use for this release and all subsequent operations involving this release. If unset, tool versions are frozen when the release is created. */
  toolVersions?: ToolVersions;
  /** Output only. Unique identifier of the `Release`. */
  uid?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
  /** Optional. The deploy parameters to use for all targets in this release. */
  deployParameters?: Record<string, string>;
  /** Optional. Cloud Storage URI of tar.gz archive containing Skaffold configuration. */
  skaffoldConfigUri?: string;
  /** Output only. Time at which the render completed. */
  renderEndTime?: string;
  /** Output only. Time at which the render began. */
  renderStartTime?: string;
}

export const Release: Schema.Schema<Release> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  targetArtifacts: Schema.optional(Schema.Record(Schema.String, TargetArtifact)),
  customTargetTypeSnapshots: Schema.optional(Schema.Array(CustomTargetType)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  targetRenders: Schema.optional(Schema.Record(Schema.String, TargetRender)),
  deliveryPipelineSnapshot: Schema.optional(DeliveryPipeline),
  buildArtifacts: Schema.optional(Schema.Array(BuildArtifact)),
  name: Schema.optional(Schema.String),
  renderState: Schema.optional(Schema.String),
  abandoned: Schema.optional(Schema.Boolean),
  condition: Schema.optional(ReleaseCondition),
  targetSnapshots: Schema.optional(Schema.Array(Target)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  skaffoldVersion: Schema.optional(Schema.String),
  skaffoldConfigPath: Schema.optional(Schema.String),
  toolVersions: Schema.optional(ToolVersions),
  uid: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  deployParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  skaffoldConfigUri: Schema.optional(Schema.String),
  renderEndTime: Schema.optional(Schema.String),
  renderStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Release" }) as any as Schema.Schema<Release>;

export interface ListReleasesResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The `Release` objects. */
  releases?: Array<Release>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListReleasesResponse: Schema.Schema<ListReleasesResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  releases: Schema.optional(Schema.Array(Release)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReleasesResponse" }) as any as Schema.Schema<ListReleasesResponse>;

export interface Targets {
  /** Optional. The source target ID. */
  sourceTargetId?: string;
  /** Optional. The destination target ID. */
  destinationTargetId?: string;
}

export const Targets: Schema.Schema<Targets> = Schema.suspend(() => Schema.Struct({
  sourceTargetId: Schema.optional(Schema.String),
  destinationTargetId: Schema.optional(Schema.String),
})).annotate({ identifier: "Targets" }) as any as Schema.Schema<Targets>;

export interface TimedPromoteReleaseCondition {
  /** Output only. When the next scheduled promotion(s) will occur. */
  nextPromotionTime?: string;
  /** Output only. A list of targets involved in the upcoming timed promotion(s). */
  targetsList?: Array<Targets>;
}

export const TimedPromoteReleaseCondition: Schema.Schema<TimedPromoteReleaseCondition> = Schema.suspend(() => Schema.Struct({
  nextPromotionTime: Schema.optional(Schema.String),
  targetsList: Schema.optional(Schema.Array(Targets)),
})).annotate({ identifier: "TimedPromoteReleaseCondition" }) as any as Schema.Schema<TimedPromoteReleaseCondition>;

export interface TargetAttribute {
  /** Target labels. */
  labels?: Record<string, string>;
  /** Optional. ID of the `Target`. The value of this field could be one of the following: * The last segment of a target name * "*", all targets in a location */
  id?: string;
}

export const TargetAttribute: Schema.Schema<TargetAttribute> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetAttribute" }) as any as Schema.Schema<TargetAttribute>;

export interface DeliveryPipelineAttribute {
  /** DeliveryPipeline labels. */
  labels?: Record<string, string>;
  /** Optional. ID of the `DeliveryPipeline`. The value of this field could be one of the following: * The last segment of a pipeline name * "*", all delivery pipelines in a location */
  id?: string;
}

export const DeliveryPipelineAttribute: Schema.Schema<DeliveryPipelineAttribute> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryPipelineAttribute" }) as any as Schema.Schema<DeliveryPipelineAttribute>;

export interface DeployPolicyResourceSelector {
  /** Optional. Contains attributes about a target. */
  target?: TargetAttribute;
  /** Optional. Contains attributes about a delivery pipeline. */
  deliveryPipeline?: DeliveryPipelineAttribute;
}

export const DeployPolicyResourceSelector: Schema.Schema<DeployPolicyResourceSelector> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(TargetAttribute),
  deliveryPipeline: Schema.optional(DeliveryPipelineAttribute),
})).annotate({ identifier: "DeployPolicyResourceSelector" }) as any as Schema.Schema<DeployPolicyResourceSelector>;

export interface Clouddeploy_Date {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const Clouddeploy_Date: Schema.Schema<Clouddeploy_Date> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  year: Schema.optional(Schema.Number),
})).annotate({ identifier: "Clouddeploy_Date" }) as any as Schema.Schema<Clouddeploy_Date>;

export interface TimeOfDay {
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface OneTimeWindow {
  /** Required. End date. */
  endDate?: Clouddeploy_Date;
  /** Required. Start date. */
  startDate?: Clouddeploy_Date;
  /** Required. End time (exclusive). You may use 24:00 for the end of the day. */
  endTime?: TimeOfDay;
  /** Required. Start time (inclusive). Use 00:00 for the beginning of the day. */
  startTime?: TimeOfDay;
}

export const OneTimeWindow: Schema.Schema<OneTimeWindow> = Schema.suspend(() => Schema.Struct({
  endDate: Schema.optional(Clouddeploy_Date),
  startDate: Schema.optional(Clouddeploy_Date),
  endTime: Schema.optional(TimeOfDay),
  startTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "OneTimeWindow" }) as any as Schema.Schema<OneTimeWindow>;

export interface WeeklyWindow {
  /** Optional. Days of week. If left empty, all days of the week will be included. */
  daysOfWeek?: Array<"DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {})>;
  /** Optional. Start time (inclusive). Use 00:00 for the beginning of the day. If you specify start_time you must also specify end_time. If left empty, this will block for the entire day for the days specified in days_of_week. */
  startTime?: TimeOfDay;
  /** Optional. End time (exclusive). Use 24:00 to indicate midnight. If you specify end_time you must also specify start_time. If left empty, this will block for the entire day for the days specified in days_of_week. */
  endTime?: TimeOfDay;
}

export const WeeklyWindow: Schema.Schema<WeeklyWindow> = Schema.suspend(() => Schema.Struct({
  daysOfWeek: Schema.optional(Schema.Array(Schema.String)),
  startTime: Schema.optional(TimeOfDay),
  endTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "WeeklyWindow" }) as any as Schema.Schema<WeeklyWindow>;

export interface TimeWindows {
  /** Optional. One-time windows within which actions are restricted. */
  oneTimeWindows?: Array<OneTimeWindow>;
  /** Required. The time zone in IANA format [IANA Time Zone Database](https://www.iana.org/time-zones) (e.g. America/New_York). */
  timeZone?: string;
  /** Optional. Recurring weekly windows within which actions are restricted. */
  weeklyWindows?: Array<WeeklyWindow>;
}

export const TimeWindows: Schema.Schema<TimeWindows> = Schema.suspend(() => Schema.Struct({
  oneTimeWindows: Schema.optional(Schema.Array(OneTimeWindow)),
  timeZone: Schema.optional(Schema.String),
  weeklyWindows: Schema.optional(Schema.Array(WeeklyWindow)),
})).annotate({ identifier: "TimeWindows" }) as any as Schema.Schema<TimeWindows>;

export interface RolloutRestriction {
  /** Required. Time window within which actions are restricted. */
  timeWindows?: TimeWindows;
  /** Required. Restriction rule ID. Required and must be unique within a DeployPolicy. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  id?: string;
  /** Optional. What invoked the action. If left empty, all invoker types will be restricted. */
  invokers?: Array<"INVOKER_UNSPECIFIED" | "USER" | "DEPLOY_AUTOMATION" | (string & {})>;
  /** Optional. Rollout actions to be restricted as part of the policy. If left empty, all actions will be restricted. */
  actions?: Array<"ROLLOUT_ACTIONS_UNSPECIFIED" | "ADVANCE" | "APPROVE" | "CANCEL" | "CREATE" | "IGNORE_JOB" | "RETRY_JOB" | "ROLLBACK" | "TERMINATE_JOBRUN" | (string & {})>;
}

export const RolloutRestriction: Schema.Schema<RolloutRestriction> = Schema.suspend(() => Schema.Struct({
  timeWindows: Schema.optional(TimeWindows),
  id: Schema.optional(Schema.String),
  invokers: Schema.optional(Schema.Array(Schema.String)),
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RolloutRestriction" }) as any as Schema.Schema<RolloutRestriction>;

export interface PolicyRule {
  /** Optional. Rollout restrictions. */
  rolloutRestriction?: RolloutRestriction;
}

export const PolicyRule: Schema.Schema<PolicyRule> = Schema.suspend(() => Schema.Struct({
  rolloutRestriction: Schema.optional(RolloutRestriction),
})).annotate({ identifier: "PolicyRule" }) as any as Schema.Schema<PolicyRule>;

export interface DeployPolicy {
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. Annotations must meet the following constraints: * Annotations are key/value pairs. * Valid annotation keys have two segments: an optional prefix and name, separated by a slash (`/`). * The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. * The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots(`.`), not longer than 253 characters in total, followed by a slash (`/`). See https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set for more details. */
  annotations?: Record<string, string>;
  /** Optional. When suspended, the policy will not prevent actions from occurring, even if the action violates the policy. */
  suspended?: boolean;
  /** Output only. Time at which the deploy policy was created. */
  createTime?: string;
  /** Output only. Most recent time at which the deploy policy was updated. */
  updateTime?: string;
  /** Required. Selected resources to which the policy will be applied. At least one selector is required. If one selector matches the resource the policy applies. For example, if there are two selectors and the action being attempted matches one of them, the policy will apply to that action. */
  selectors?: Array<DeployPolicyResourceSelector>;
  /** Optional. Description of the `DeployPolicy`. Max length is 255 characters. */
  description?: string;
  /** Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** Output only. Unique identifier of the `DeployPolicy`. */
  uid?: string;
  /** Required. Rules to apply. At least one rule must be present. */
  rules?: Array<PolicyRule>;
  /** Output only. Name of the `DeployPolicy`. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. The `deployPolicy` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name?: string;
  /** The weak etag of the `DeployPolicy` resource. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeployPolicy: Schema.Schema<DeployPolicy> = Schema.suspend(() => Schema.Struct({
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  suspended: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  selectors: Schema.optional(Schema.Array(DeployPolicyResourceSelector)),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(PolicyRule)),
  name: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "DeployPolicy" }) as any as Schema.Schema<DeployPolicy>;

export interface ListDeployPoliciesResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The `DeployPolicy` objects. */
  deployPolicies?: Array<DeployPolicy>;
}

export const ListDeployPoliciesResponse: Schema.Schema<ListDeployPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  deployPolicies: Schema.optional(Schema.Array(DeployPolicy)),
})).annotate({ identifier: "ListDeployPoliciesResponse" }) as any as Schema.Schema<ListDeployPoliciesResponse>;

export interface ReleaseRenderEvent {
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
  /** The state of the release render. */
  releaseRenderState?: "RENDER_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | (string & {});
  /** The name of the release. release_uid is not in this log message because we write some of these log messages at release creation time, before we've generated the uid. */
  release?: string;
  /** Type of this notification, e.g. for a release render state change event. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** Debug message for when a render transition occurs. Provides further details as rendering progresses through render states. */
  message?: string;
}

export const ReleaseRenderEvent: Schema.Schema<ReleaseRenderEvent> = Schema.suspend(() => Schema.Struct({
  pipelineUid: Schema.optional(Schema.String),
  releaseRenderState: Schema.optional(Schema.String),
  release: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "ReleaseRenderEvent" }) as any as Schema.Schema<ReleaseRenderEvent>;

export interface RetryAttempt {
  /** Output only. The index of this retry attempt. */
  attempt?: string;
  /** Output only. Description of the state of the Retry. */
  stateDesc?: string;
  /** Output only. How long the operation will be paused. */
  wait?: string;
  /** Output only. Valid state of this retry action. */
  state?: "REPAIR_STATE_UNSPECIFIED" | "REPAIR_STATE_SUCCEEDED" | "REPAIR_STATE_CANCELLED" | "REPAIR_STATE_FAILED" | "REPAIR_STATE_IN_PROGRESS" | "REPAIR_STATE_PENDING" | "REPAIR_STATE_ABORTED" | (string & {});
}

export const RetryAttempt: Schema.Schema<RetryAttempt> = Schema.suspend(() => Schema.Struct({
  attempt: Schema.optional(Schema.String),
  stateDesc: Schema.optional(Schema.String),
  wait: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryAttempt" }) as any as Schema.Schema<RetryAttempt>;

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

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
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

export interface RetryPhase {
  /** Output only. The pattern of how the wait time of the retry attempt is calculated. */
  backoffMode?: "BACKOFF_MODE_UNSPECIFIED" | "BACKOFF_MODE_LINEAR" | "BACKOFF_MODE_EXPONENTIAL" | (string & {});
  /** Output only. Detail of a retry action. */
  attempts?: Array<RetryAttempt>;
  /** Output only. The number of attempts that have been made. */
  totalAttempts?: string;
}

export const RetryPhase: Schema.Schema<RetryPhase> = Schema.suspend(() => Schema.Struct({
  backoffMode: Schema.optional(Schema.String),
  attempts: Schema.optional(Schema.Array(RetryAttempt)),
  totalAttempts: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryPhase" }) as any as Schema.Schema<RetryPhase>;

export interface AutomationRuleCondition {
  /** Optional. Details around targets enumerated in the rule. */
  targetsPresentCondition?: TargetsPresentCondition;
  /** Optional. TimedPromoteReleaseCondition contains rule conditions specific to a an Automation with a timed promote release rule defined. */
  timedPromoteReleaseCondition?: TimedPromoteReleaseCondition;
}

export const AutomationRuleCondition: Schema.Schema<AutomationRuleCondition> = Schema.suspend(() => Schema.Struct({
  targetsPresentCondition: Schema.optional(TargetsPresentCondition),
  timedPromoteReleaseCondition: Schema.optional(TimedPromoteReleaseCondition),
})).annotate({ identifier: "AutomationRuleCondition" }) as any as Schema.Schema<AutomationRuleCondition>;

export interface PromoteReleaseRule {
  /** Optional. How long the release need to be paused until being promoted to the next target. */
  wait?: string;
  /** Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: * The last segment of a target name * "@next", the next target in the promotion sequence */
  destinationTargetId?: string;
  /** Output only. Information around the state of the Automation rule. */
  condition?: AutomationRuleCondition;
  /** Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  id?: string;
  /** Optional. The starting phase of the rollout created by this operation. Default to the first phase. */
  destinationPhase?: string;
}

export const PromoteReleaseRule: Schema.Schema<PromoteReleaseRule> = Schema.suspend(() => Schema.Struct({
  wait: Schema.optional(Schema.String),
  destinationTargetId: Schema.optional(Schema.String),
  condition: Schema.optional(AutomationRuleCondition),
  id: Schema.optional(Schema.String),
  destinationPhase: Schema.optional(Schema.String),
})).annotate({ identifier: "PromoteReleaseRule" }) as any as Schema.Schema<PromoteReleaseRule>;

export interface AdvanceRolloutRule {
  /** Optional. Proceeds only after phase name matched any one in the list. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. */
  sourcePhases?: Array<string>;
  /** Output only. Information around the state of the Automation rule. */
  condition?: AutomationRuleCondition;
  /** Optional. How long to wait after a rollout is finished. */
  wait?: string;
  /** Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  id?: string;
}

export const AdvanceRolloutRule: Schema.Schema<AdvanceRolloutRule> = Schema.suspend(() => Schema.Struct({
  sourcePhases: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(AutomationRuleCondition),
  wait: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvanceRolloutRule" }) as any as Schema.Schema<AdvanceRolloutRule>;

export interface Rollback {
  /** Optional. If pending rollout exists on the target, the rollback operation will be aborted. */
  disableRollbackIfRolloutPending?: boolean;
  /** Optional. The starting phase ID for the `Rollout`. If unspecified, the `Rollout` will start in the stable phase. */
  destinationPhase?: string;
}

export const Rollback: Schema.Schema<Rollback> = Schema.suspend(() => Schema.Struct({
  disableRollbackIfRolloutPending: Schema.optional(Schema.Boolean),
  destinationPhase: Schema.optional(Schema.String),
})).annotate({ identifier: "Rollback" }) as any as Schema.Schema<Rollback>;

export interface Retry {
  /** Optional. How long to wait for the first retry. Default is 0, and the maximum value is 14d. */
  wait?: string;
  /** Required. Total number of retries. Retry is skipped if set to 0; The minimum value is 1, and the maximum value is 10. */
  attempts?: string;
  /** Optional. The pattern of how wait time will be increased. Default is linear. Backoff mode will be ignored if `wait` is 0. */
  backoffMode?: "BACKOFF_MODE_UNSPECIFIED" | "BACKOFF_MODE_LINEAR" | "BACKOFF_MODE_EXPONENTIAL" | (string & {});
}

export const Retry: Schema.Schema<Retry> = Schema.suspend(() => Schema.Struct({
  wait: Schema.optional(Schema.String),
  attempts: Schema.optional(Schema.String),
  backoffMode: Schema.optional(Schema.String),
})).annotate({ identifier: "Retry" }) as any as Schema.Schema<Retry>;

export interface RepairPhaseConfig {
  /** Optional. Rolls back a `Rollout`. */
  rollback?: Rollback;
  /** Optional. Retries a failed job. */
  retry?: Retry;
}

export const RepairPhaseConfig: Schema.Schema<RepairPhaseConfig> = Schema.suspend(() => Schema.Struct({
  rollback: Schema.optional(Rollback),
  retry: Schema.optional(Retry),
})).annotate({ identifier: "RepairPhaseConfig" }) as any as Schema.Schema<RepairPhaseConfig>;

export interface RepairRolloutRule {
  /** Required. Defines the types of automatic repair phases for failed jobs. */
  repairPhases?: Array<RepairPhaseConfig>;
  /** Optional. Phases within which jobs are subject to automatic repair actions on failure. Proceeds only after phase name matched any one in the list, or for all phases if unspecified. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. */
  phases?: Array<string>;
  /** Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  id?: string;
  /** Output only. Information around the state of the 'Automation' rule. */
  condition?: AutomationRuleCondition;
  /** Optional. Jobs to repair. Proceeds only after job name matched any one in the list, or for all jobs if unspecified or empty. The phase that includes the job must match the phase ID specified in `source_phase`. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. */
  jobs?: Array<string>;
}

export const RepairRolloutRule: Schema.Schema<RepairRolloutRule> = Schema.suspend(() => Schema.Struct({
  repairPhases: Schema.optional(Schema.Array(RepairPhaseConfig)),
  phases: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  condition: Schema.optional(AutomationRuleCondition),
  jobs: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RepairRolloutRule" }) as any as Schema.Schema<RepairRolloutRule>;

export interface TimedPromoteReleaseRule {
  /** Required. The time zone in IANA format [IANA Time Zone Database](https://www.iana.org/time-zones) (e.g. America/New_York). */
  timeZone?: string;
  /** Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: * The last segment of a target name * "@next", the next target in the promotion sequence */
  destinationTargetId?: string;
  /** Required. ID of the rule. This ID must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  id?: string;
  /** Output only. Information around the state of the Automation rule. */
  condition?: AutomationRuleCondition;
  /** Required. Schedule in crontab format. e.g. "0 9 * * 1" for every Monday at 9am. */
  schedule?: string;
  /** Optional. The starting phase of the rollout created by this rule. Default to the first phase. */
  destinationPhase?: string;
}

export const TimedPromoteReleaseRule: Schema.Schema<TimedPromoteReleaseRule> = Schema.suspend(() => Schema.Struct({
  timeZone: Schema.optional(Schema.String),
  destinationTargetId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  condition: Schema.optional(AutomationRuleCondition),
  schedule: Schema.optional(Schema.String),
  destinationPhase: Schema.optional(Schema.String),
})).annotate({ identifier: "TimedPromoteReleaseRule" }) as any as Schema.Schema<TimedPromoteReleaseRule>;

export interface AutomationRule {
  /** Optional. `PromoteReleaseRule` will automatically promote a release from the current target to a specified target. */
  promoteReleaseRule?: PromoteReleaseRule;
  /** Optional. The `AdvanceRolloutRule` will automatically advance a successful Rollout. */
  advanceRolloutRule?: AdvanceRolloutRule;
  /** Optional. The `RepairRolloutRule` will automatically repair a failed rollout. */
  repairRolloutRule?: RepairRolloutRule;
  /** Optional. The `TimedPromoteReleaseRule` will automatically promote a release from the current target(s) to the specified target(s) on a configured schedule. */
  timedPromoteReleaseRule?: TimedPromoteReleaseRule;
}

export const AutomationRule: Schema.Schema<AutomationRule> = Schema.suspend(() => Schema.Struct({
  promoteReleaseRule: Schema.optional(PromoteReleaseRule),
  advanceRolloutRule: Schema.optional(AdvanceRolloutRule),
  repairRolloutRule: Schema.optional(RepairRolloutRule),
  timedPromoteReleaseRule: Schema.optional(TimedPromoteReleaseRule),
})).annotate({ identifier: "AutomationRule" }) as any as Schema.Schema<AutomationRule>;

export interface DeployArtifact {
  /** Output only. URI of a directory containing the artifacts. All paths are relative to this location. */
  artifactUri?: string;
  /** Output only. File paths of the manifests applied during the deploy operation relative to the URI. */
  manifestPaths?: Array<string>;
}

export const DeployArtifact: Schema.Schema<DeployArtifact> = Schema.suspend(() => Schema.Struct({
  artifactUri: Schema.optional(Schema.String),
  manifestPaths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeployArtifact" }) as any as Schema.Schema<DeployArtifact>;

export interface CustomTargetDeployMetadata {
  /** Output only. Skip message provided in the results of a custom deploy operation. */
  skipMessage?: string;
}

export const CustomTargetDeployMetadata: Schema.Schema<CustomTargetDeployMetadata> = Schema.suspend(() => Schema.Struct({
  skipMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomTargetDeployMetadata" }) as any as Schema.Schema<CustomTargetDeployMetadata>;

export interface CloudRunMetadata {
  /** Output only. The Cloud Run Revision id associated with a `Rollout`. */
  revision?: string;
  /** Output only. The name of the Cloud Run Service that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/services/{service}`. */
  service?: string;
  /** Output only. The Cloud Run worker pool associated with a `Rollout`. Format is `projects/{project}/locations/{location}/workerPools/{worker_pool}`. */
  workerPool?: string;
  /** Output only. The Cloud Run Service urls that are associated with a `Rollout`. */
  serviceUrls?: Array<string>;
  /** Output only. The name of the Cloud Run job that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/jobs/{job_name}`. */
  job?: string;
}

export const CloudRunMetadata: Schema.Schema<CloudRunMetadata> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
  serviceUrls: Schema.optional(Schema.Array(Schema.String)),
  job: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRunMetadata" }) as any as Schema.Schema<CloudRunMetadata>;

export interface DeployJobRunMetadata {
  /** Output only. Custom Target metadata associated with a `DeployJobRun`. */
  customTarget?: CustomTargetDeployMetadata;
  /** Output only. Custom metadata provided by user-defined deploy operation. */
  custom?: CustomMetadata;
  /** Output only. The name of the Cloud Run Service that is associated with a `DeployJobRun`. */
  cloudRun?: CloudRunMetadata;
}

export const DeployJobRunMetadata: Schema.Schema<DeployJobRunMetadata> = Schema.suspend(() => Schema.Struct({
  customTarget: Schema.optional(CustomTargetDeployMetadata),
  custom: Schema.optional(CustomMetadata),
  cloudRun: Schema.optional(CloudRunMetadata),
})).annotate({ identifier: "DeployJobRunMetadata" }) as any as Schema.Schema<DeployJobRunMetadata>;

export interface DeployJobRun {
  /** Output only. The resource name of the Cloud Build `Build` object that is used to deploy. Format is `projects/{project}/locations/{location}/builds/{build}`. */
  build?: string;
  /** Output only. Additional information about the deploy failure, if available. */
  failureMessage?: string;
  /** Output only. The artifact of a deploy job run, if available. */
  artifact?: DeployArtifact;
  /** Output only. The reason the deploy failed. This will always be unspecified while the deploy is in progress or if it succeeded. */
  failureCause?: "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "MISSING_RESOURCES_FOR_CANARY" | "CLOUD_BUILD_REQUEST_FAILED" | "DEPLOY_FEATURE_NOT_SUPPORTED" | (string & {});
  /** Output only. Metadata containing information about the deploy job run. */
  metadata?: DeployJobRunMetadata;
}

export const DeployJobRun: Schema.Schema<DeployJobRun> = Schema.suspend(() => Schema.Struct({
  build: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
  artifact: Schema.optional(DeployArtifact),
  failureCause: Schema.optional(Schema.String),
  metadata: Schema.optional(DeployJobRunMetadata),
})).annotate({ identifier: "DeployJobRun" }) as any as Schema.Schema<DeployJobRun>;

export interface AdvanceRolloutOperation {
  /** Output only. The phase of a deployment that initiated the operation. */
  sourcePhase?: string;
  /** Output only. The phase the rollout will be advanced to. */
  destinationPhase?: string;
  /** Output only. The name of the rollout that initiates the `AutomationRun`. */
  rollout?: string;
  /** Output only. How long the operation will be paused. */
  wait?: string;
}

export const AdvanceRolloutOperation: Schema.Schema<AdvanceRolloutOperation> = Schema.suspend(() => Schema.Struct({
  sourcePhase: Schema.optional(Schema.String),
  destinationPhase: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
  wait: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvanceRolloutOperation" }) as any as Schema.Schema<AdvanceRolloutOperation>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

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

export interface RollbackAttempt {
  /** Output only. ID of the rollback `Rollout` to create. */
  rolloutId?: string;
  /** Output only. Description of the state of the Rollback. */
  stateDesc?: string;
  /** Output only. The phase to which the rollout will be rolled back to. */
  destinationPhase?: string;
  /** Output only. If active rollout exists on the target, abort this rollback. */
  disableRollbackIfRolloutPending?: boolean;
  /** Output only. Valid state of this rollback action. */
  state?: "REPAIR_STATE_UNSPECIFIED" | "REPAIR_STATE_SUCCEEDED" | "REPAIR_STATE_CANCELLED" | "REPAIR_STATE_FAILED" | "REPAIR_STATE_IN_PROGRESS" | "REPAIR_STATE_PENDING" | "REPAIR_STATE_ABORTED" | (string & {});
}

export const RollbackAttempt: Schema.Schema<RollbackAttempt> = Schema.suspend(() => Schema.Struct({
  rolloutId: Schema.optional(Schema.String),
  stateDesc: Schema.optional(Schema.String),
  destinationPhase: Schema.optional(Schema.String),
  disableRollbackIfRolloutPending: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackAttempt" }) as any as Schema.Schema<RollbackAttempt>;

export interface RepairPhase {
  /** Output only. Rollback attempt for rollback repair mode . */
  rollback?: RollbackAttempt;
  /** Output only. Records of the retry attempts for retry repair mode. */
  retry?: RetryPhase;
}

export const RepairPhase: Schema.Schema<RepairPhase> = Schema.suspend(() => Schema.Struct({
  rollback: Schema.optional(RollbackAttempt),
  retry: Schema.optional(RetryPhase),
})).annotate({ identifier: "RepairPhase" }) as any as Schema.Schema<RepairPhase>;

export interface TimedPromoteReleaseOperation {
  /** Output only. The ID of the target that represents the promotion stage to which the release will be promoted. The value of this field is the last segment of a target name. */
  targetId?: string;
  /** Output only. The starting phase of the rollout created by this operation. */
  phase?: string;
  /** Output only. The name of the release to be promoted. */
  release?: string;
}

export const TimedPromoteReleaseOperation: Schema.Schema<TimedPromoteReleaseOperation> = Schema.suspend(() => Schema.Struct({
  targetId: Schema.optional(Schema.String),
  phase: Schema.optional(Schema.String),
  release: Schema.optional(Schema.String),
})).annotate({ identifier: "TimedPromoteReleaseOperation" }) as any as Schema.Schema<TimedPromoteReleaseOperation>;

export interface AutomationResourceSelector {
  /** Optional. Contains attributes about a target. */
  targets?: Array<TargetAttribute>;
}

export const AutomationResourceSelector: Schema.Schema<AutomationResourceSelector> = Schema.suspend(() => Schema.Struct({
  targets: Schema.optional(Schema.Array(TargetAttribute)),
})).annotate({ identifier: "AutomationResourceSelector" }) as any as Schema.Schema<AutomationResourceSelector>;

export interface Automation {
  /** Output only. Time at which the automation was updated. */
  updateTime?: string;
  /** Required. List of Automation rules associated with the Automation resource. Must have at least one rule and limited to 250 rules per Delivery Pipeline. Note: the order of the rules here is not the same as the order of execution. */
  rules?: Array<AutomationRule>;
  /** Optional. Description of the `Automation`. Max length is 255 characters. */
  description?: string;
  /** Optional. When Suspended, automation is deactivated from execution. */
  suspended?: boolean;
  /** Output only. Unique identifier of the `Automation`. */
  uid?: string;
  /** Output only. Time at which the automation was created. */
  createTime?: string;
  /** Output only. Name of the `Automation`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automations/{automation}`. */
  name?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. Annotations must meet the following constraints: * Annotations are key/value pairs. * Valid annotation keys have two segments: an optional prefix and name, separated by a slash (`/`). * The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. * The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots(`.`), not longer than 253 characters in total, followed by a slash (`/`). See https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set for more details. */
  annotations?: Record<string, string>;
  /** Required. Email address of the user-managed IAM service account that creates Cloud Deploy release and rollout resources. */
  serviceAccount?: string;
  /** Required. Selected resources to which the automation will be applied. */
  selector?: AutomationResourceSelector;
  /** Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 63 characters. */
  labels?: Record<string, string>;
  /** Optional. The weak etag of the `Automation` resource. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const Automation: Schema.Schema<Automation> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(AutomationRule)),
  description: Schema.optional(Schema.String),
  suspended: Schema.optional(Schema.Boolean),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  serviceAccount: Schema.optional(Schema.String),
  selector: Schema.optional(AutomationResourceSelector),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Automation" }) as any as Schema.Schema<Automation>;

export interface PromoteReleaseOperation {
  /** Output only. The ID of the target that represents the promotion stage to which the release will be promoted. The value of this field is the last segment of a target name. */
  targetId?: string;
  /** Output only. The starting phase of the rollout created by this operation. */
  phase?: string;
  /** Output only. The name of the rollout that initiates the `AutomationRun`. */
  rollout?: string;
  /** Output only. How long the operation will be paused. */
  wait?: string;
}

export const PromoteReleaseOperation: Schema.Schema<PromoteReleaseOperation> = Schema.suspend(() => Schema.Struct({
  targetId: Schema.optional(Schema.String),
  phase: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
  wait: Schema.optional(Schema.String),
})).annotate({ identifier: "PromoteReleaseOperation" }) as any as Schema.Schema<PromoteReleaseOperation>;

export interface PolicyViolationDetails {
  /** Id of the rule that triggered the policy violation. */
  ruleId?: string;
  /** User readable message about why the request violated a policy. This is not intended for machine parsing. */
  failureMessage?: string;
  /** Name of the policy that was violated. Policy resource will be in the format of `projects/{project}/locations/{location}/policies/{policy}`. */
  policy?: string;
}

export const PolicyViolationDetails: Schema.Schema<PolicyViolationDetails> = Schema.suspend(() => Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyViolationDetails" }) as any as Schema.Schema<PolicyViolationDetails>;

export interface PolicyViolation {
  /** Policy violation details. */
  policyViolationDetails?: Array<PolicyViolationDetails>;
}

export const PolicyViolation: Schema.Schema<PolicyViolation> = Schema.suspend(() => Schema.Struct({
  policyViolationDetails: Schema.optional(Schema.Array(PolicyViolationDetails)),
})).annotate({ identifier: "PolicyViolation" }) as any as Schema.Schema<PolicyViolation>;

export interface RepairRolloutOperation {
  /** Output only. The index of the current repair action in the repair sequence. */
  currentRepairPhaseIndex?: string;
  /** Output only. The name of the rollout that initiates the `AutomationRun`. */
  rollout?: string;
  /** Output only. The job ID for the Job to repair. */
  jobId?: string;
  /** Output only. Records of the repair attempts. Each repair phase may have multiple retry attempts or single rollback attempt. */
  repairPhases?: Array<RepairPhase>;
  /** Output only. The phase ID of the phase that includes the job being repaired. */
  phaseId?: string;
}

export const RepairRolloutOperation: Schema.Schema<RepairRolloutOperation> = Schema.suspend(() => Schema.Struct({
  currentRepairPhaseIndex: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  repairPhases: Schema.optional(Schema.Array(RepairPhase)),
  phaseId: Schema.optional(Schema.String),
})).annotate({ identifier: "RepairRolloutOperation" }) as any as Schema.Schema<RepairRolloutOperation>;

export interface AutomationRun {
  /** Output only. Explains the current state of the `AutomationRun`. Present only when an explanation is needed. */
  stateDescription?: string;
  /** Output only. Time the `AutomationRun` expires. An `AutomationRun` expires after 14 days from its creation date. */
  expireTime?: string;
  /** Output only. Promotes a release to a specified 'Target' as defined in a Timed Promote Release rule. */
  timedPromoteReleaseOperation?: TimedPromoteReleaseOperation;
  /** Output only. The ID of the source target that initiates the `AutomationRun`. The value of this field is the last segment of a target name. */
  targetId?: string;
  /** Output only. The ID of the automation rule that initiated the operation. */
  ruleId?: string;
  /** Output only. Snapshot of the Automation taken at AutomationRun creation time. */
  automationSnapshot?: Automation;
  /** Output only. Time at which the automationRun was updated. */
  updateTime?: string;
  /** Output only. Promotes a release to a specified 'Target'. */
  promoteReleaseOperation?: PromoteReleaseOperation;
  /** Output only. Current state of the `AutomationRun`. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "CANCELLED" | "FAILED" | "IN_PROGRESS" | "PENDING" | "ABORTED" | (string & {});
  /** Output only. The weak etag of the `AutomationRun` resource. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Contains information about what policies prevented the `AutomationRun` from proceeding. */
  policyViolation?: PolicyViolation;
  /** Output only. The ID of the automation that initiated the operation. */
  automationId?: string;
  /** Output only. Earliest time the `AutomationRun` will attempt to resume. Wait-time is configured by `wait` in automation rule. */
  waitUntilTime?: string;
  /** Output only. Email address of the user-managed IAM service account that performs the operations against Cloud Deploy resources. */
  serviceAccount?: string;
  /** Output only. Repairs a failed 'Rollout'. */
  repairRolloutOperation?: RepairRolloutOperation;
  /** Output only. Time at which the `AutomationRun` was created. */
  createTime?: string;
  /** Output only. Name of the `AutomationRun`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automationRuns/{automation_run}`. */
  name?: string;
  /** Output only. Advances a rollout to the next phase. */
  advanceRolloutOperation?: AdvanceRolloutOperation;
  /** Output only. Unique identifier of the `AutomationRun`. */
  uid?: string;
}

export const AutomationRun: Schema.Schema<AutomationRun> = Schema.suspend(() => Schema.Struct({
  stateDescription: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  timedPromoteReleaseOperation: Schema.optional(TimedPromoteReleaseOperation),
  targetId: Schema.optional(Schema.String),
  ruleId: Schema.optional(Schema.String),
  automationSnapshot: Schema.optional(Automation),
  updateTime: Schema.optional(Schema.String),
  promoteReleaseOperation: Schema.optional(PromoteReleaseOperation),
  state: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  policyViolation: Schema.optional(PolicyViolation),
  automationId: Schema.optional(Schema.String),
  waitUntilTime: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  repairRolloutOperation: Schema.optional(RepairRolloutOperation),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  advanceRolloutOperation: Schema.optional(AdvanceRolloutOperation),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "AutomationRun" }) as any as Schema.Schema<AutomationRun>;

export interface ListAutomationRunsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The `AutomationRuns` objects. */
  automationRuns?: Array<AutomationRun>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAutomationRunsResponse: Schema.Schema<ListAutomationRunsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  automationRuns: Schema.optional(Schema.Array(AutomationRun)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAutomationRunsResponse" }) as any as Schema.Schema<ListAutomationRunsResponse>;

export interface SkaffoldVersion {
  /** The time at which this version of Skaffold will enter maintenance mode. */
  maintenanceModeTime?: string;
  /** Release version number. For example, "1.20.3". */
  version?: string;
  /** Date when this version is expected to no longer be supported. */
  supportEndDate?: Clouddeploy_Date;
  /** The time at which this version of Skaffold will no longer be supported. */
  supportExpirationTime?: string;
}

export const SkaffoldVersion: Schema.Schema<SkaffoldVersion> = Schema.suspend(() => Schema.Struct({
  maintenanceModeTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  supportEndDate: Schema.optional(Clouddeploy_Date),
  supportExpirationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SkaffoldVersion" }) as any as Schema.Schema<SkaffoldVersion>;

export interface Config {
  /** All supported versions of Skaffold. */
  supportedVersions?: Array<SkaffoldVersion>;
  /** Name of the configuration. */
  name?: string;
  /** Output only. Default tool versions. These tool versions are assigned when a Release is created without specifying tool versions. */
  defaultToolVersions?: ToolVersions;
  /** Default Skaffold version that is assigned when a Release is created without specifying a Skaffold version. */
  defaultSkaffoldVersion?: string;
}

export const Config: Schema.Schema<Config> = Schema.suspend(() => Schema.Struct({
  supportedVersions: Schema.optional(Schema.Array(SkaffoldVersion)),
  name: Schema.optional(Schema.String),
  defaultToolVersions: Schema.optional(ToolVersions),
  defaultSkaffoldVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "Config" }) as any as Schema.Schema<Config>;

export interface AdvanceChildRolloutJob {
}

export const AdvanceChildRolloutJob: Schema.Schema<AdvanceChildRolloutJob> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AdvanceChildRolloutJob" }) as any as Schema.Schema<AdvanceChildRolloutJob>;

export interface PostdeployJob {
  /** Output only. The custom actions that the postdeploy Job executes. */
  actions?: Array<string>;
}

export const PostdeployJob: Schema.Schema<PostdeployJob> = Schema.suspend(() => Schema.Struct({
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PostdeployJob" }) as any as Schema.Schema<PostdeployJob>;

export interface DeployJob {
}

export const DeployJob: Schema.Schema<DeployJob> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeployJob" }) as any as Schema.Schema<DeployJob>;

export interface CreateChildRolloutJob {
}

export const CreateChildRolloutJob: Schema.Schema<CreateChildRolloutJob> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateChildRolloutJob" }) as any as Schema.Schema<CreateChildRolloutJob>;

export interface PredeployJob {
  /** Output only. The custom actions that the predeploy Job executes. */
  actions?: Array<string>;
}

export const PredeployJob: Schema.Schema<PredeployJob> = Schema.suspend(() => Schema.Struct({
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PredeployJob" }) as any as Schema.Schema<PredeployJob>;

export interface VerifyJob {
}

export const VerifyJob: Schema.Schema<VerifyJob> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "VerifyJob" }) as any as Schema.Schema<VerifyJob>;

export interface Job {
  /** Output only. An advanceChildRollout Job. */
  advanceChildRolloutJob?: AdvanceChildRolloutJob;
  /** Output only. A postdeploy Job. */
  postdeployJob?: PostdeployJob;
  /** Output only. A deploy Job. */
  deployJob?: DeployJob;
  /** Output only. A createChildRollout Job. */
  createChildRolloutJob?: CreateChildRolloutJob;
  /** Output only. The ID of the Job. */
  id?: string;
  /** Output only. The name of the `JobRun` responsible for the most recent invocation of this Job. */
  jobRun?: string;
  /** Output only. A predeploy Job. */
  predeployJob?: PredeployJob;
  /** Output only. Additional information on why the Job was skipped, if available. */
  skipMessage?: string;
  /** Output only. The current state of the Job. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "DISABLED" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "ABORTED" | "SKIPPED" | "IGNORED" | (string & {});
  /** Output only. A verify Job. */
  verifyJob?: VerifyJob;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  advanceChildRolloutJob: Schema.optional(AdvanceChildRolloutJob),
  postdeployJob: Schema.optional(PostdeployJob),
  deployJob: Schema.optional(DeployJob),
  createChildRolloutJob: Schema.optional(CreateChildRolloutJob),
  id: Schema.optional(Schema.String),
  jobRun: Schema.optional(Schema.String),
  predeployJob: Schema.optional(PredeployJob),
  skipMessage: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  verifyJob: Schema.optional(VerifyJob),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface TerminateJobRunResponse {
}

export const TerminateJobRunResponse: Schema.Schema<TerminateJobRunResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TerminateJobRunResponse" }) as any as Schema.Schema<TerminateJobRunResponse>;

export interface ChildRolloutJobs {
  /** Output only. List of CreateChildRolloutJobs */
  createRolloutJobs?: Array<Job>;
  /** Output only. List of AdvanceChildRolloutJobs */
  advanceRolloutJobs?: Array<Job>;
}

export const ChildRolloutJobs: Schema.Schema<ChildRolloutJobs> = Schema.suspend(() => Schema.Struct({
  createRolloutJobs: Schema.optional(Schema.Array(Job)),
  advanceRolloutJobs: Schema.optional(Schema.Array(Job)),
})).annotate({ identifier: "ChildRolloutJobs" }) as any as Schema.Schema<ChildRolloutJobs>;

export interface PostdeployJobRun {
  /** Output only. The resource name of the Cloud Build `Build` object that is used to execute the custom actions associated with the postdeploy Job. Format is `projects/{project}/locations/{location}/builds/{build}`. */
  build?: string;
  /** Output only. The reason the postdeploy failed. This will always be unspecified while the postdeploy is in progress or if it succeeded. */
  failureCause?: "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "CLOUD_BUILD_REQUEST_FAILED" | (string & {});
  /** Output only. Additional information about the postdeploy failure, if available. */
  failureMessage?: string;
}

export const PostdeployJobRun: Schema.Schema<PostdeployJobRun> = Schema.suspend(() => Schema.Struct({
  build: Schema.optional(Schema.String),
  failureCause: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "PostdeployJobRun" }) as any as Schema.Schema<PostdeployJobRun>;

export interface IgnoreJobRequest {
  /** Required. The phase ID the Job to ignore belongs to. */
  phaseId?: string;
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: Array<string>;
  /** Required. The job ID for the Job to ignore. */
  jobId?: string;
}

export const IgnoreJobRequest: Schema.Schema<IgnoreJobRequest> = Schema.suspend(() => Schema.Struct({
  phaseId: Schema.optional(Schema.String),
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
  jobId: Schema.optional(Schema.String),
})).annotate({ identifier: "IgnoreJobRequest" }) as any as Schema.Schema<IgnoreJobRequest>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  statusMessage: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface RolloutNotificationEvent {
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** Unique identifier of the `Rollout`. */
  rolloutUid?: string;
  /** Unique identifier of the `Release`. */
  releaseUid?: string;
  /** Debug message for when a notification fails to send. */
  message?: string;
  /** ID of the `Target` that the rollout is deployed to. */
  targetId?: string;
  /** The name of the `Rollout`. */
  rollout?: string;
  /** The name of the `Release`. */
  release?: string;
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
}

export const RolloutNotificationEvent: Schema.Schema<RolloutNotificationEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  rolloutUid: Schema.optional(Schema.String),
  releaseUid: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  targetId: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
  release: Schema.optional(Schema.String),
  pipelineUid: Schema.optional(Schema.String),
})).annotate({ identifier: "RolloutNotificationEvent" }) as any as Schema.Schema<RolloutNotificationEvent>;

export interface AutomationRunEvent {
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
  /** The name of the `AutomationRun`. */
  automationRun?: string;
  /** Identifier of the `Automation` rule. */
  ruleId?: string;
  /** Identifier of the `Automation`. */
  automationId?: string;
  /** ID of the `Target` to which the `AutomationRun` is created. */
  destinationTargetId?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** Debug message for when there is an update on the AutomationRun. Provides further details about the resource creation or state change. */
  message?: string;
}

export const AutomationRunEvent: Schema.Schema<AutomationRunEvent> = Schema.suspend(() => Schema.Struct({
  pipelineUid: Schema.optional(Schema.String),
  automationRun: Schema.optional(Schema.String),
  ruleId: Schema.optional(Schema.String),
  automationId: Schema.optional(Schema.String),
  destinationTargetId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "AutomationRunEvent" }) as any as Schema.Schema<AutomationRunEvent>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ListTargetsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The `Target` objects. */
  targets?: Array<Target>;
}

export const ListTargetsResponse: Schema.Schema<ListTargetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  targets: Schema.optional(Schema.Array(Target)),
})).annotate({ identifier: "ListTargetsResponse" }) as any as Schema.Schema<ListTargetsResponse>;

export interface DeploymentJobs {
  /** Output only. The deploy Job. This is the deploy job in the phase. */
  deployJob?: Job;
  /** Output only. The predeploy Job, which is the first job on the phase. */
  predeployJob?: Job;
  /** Output only. The verify Job. Runs after a deploy if the deploy succeeds. */
  verifyJob?: Job;
  /** Output only. The postdeploy Job, which is the last job on the phase. */
  postdeployJob?: Job;
}

export const DeploymentJobs: Schema.Schema<DeploymentJobs> = Schema.suspend(() => Schema.Struct({
  deployJob: Schema.optional(Job),
  predeployJob: Schema.optional(Job),
  verifyJob: Schema.optional(Job),
  postdeployJob: Schema.optional(Job),
})).annotate({ identifier: "DeploymentJobs" }) as any as Schema.Schema<DeploymentJobs>;

export interface Phase {
  /** Output only. The ID of the Phase. */
  id?: string;
  /** Output only. Additional information on why the Phase was skipped, if available. */
  skipMessage?: string;
  /** Output only. Deployment job composition. */
  deploymentJobs?: DeploymentJobs;
  /** Output only. Current state of the Phase. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "ABORTED" | "SKIPPED" | (string & {});
  /** Output only. ChildRollout job composition. */
  childRolloutJobs?: ChildRolloutJobs;
}

export const Phase: Schema.Schema<Phase> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  skipMessage: Schema.optional(Schema.String),
  deploymentJobs: Schema.optional(DeploymentJobs),
  state: Schema.optional(Schema.String),
  childRolloutJobs: Schema.optional(ChildRolloutJobs),
})).annotate({ identifier: "Phase" }) as any as Schema.Schema<Phase>;

export interface AutomationRolloutMetadata {
  /** Output only. The name of the AutomationRun initiated by a promote release rule. */
  promoteAutomationRun?: string;
  /** Output only. The names of the AutomationRuns initiated by an advance rollout rule. */
  advanceAutomationRuns?: Array<string>;
  /** Output only. The names of the AutomationRuns initiated by a repair rollout rule. */
  repairAutomationRuns?: Array<string>;
}

export const AutomationRolloutMetadata: Schema.Schema<AutomationRolloutMetadata> = Schema.suspend(() => Schema.Struct({
  promoteAutomationRun: Schema.optional(Schema.String),
  advanceAutomationRuns: Schema.optional(Schema.Array(Schema.String)),
  repairAutomationRuns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AutomationRolloutMetadata" }) as any as Schema.Schema<AutomationRolloutMetadata>;

export interface ListDeliveryPipelinesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The `DeliveryPipeline` objects. */
  deliveryPipelines?: Array<DeliveryPipeline>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDeliveryPipelinesResponse: Schema.Schema<ListDeliveryPipelinesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  deliveryPipelines: Schema.optional(Schema.Array(DeliveryPipeline)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDeliveryPipelinesResponse" }) as any as Schema.Schema<ListDeliveryPipelinesResponse>;

export interface JobRunNotificationEvent {
  /** Unique identifier of the `Rollout`. */
  rolloutUid?: string;
  /** The name of the `JobRun`. */
  jobRun?: string;
  /** The name of the `Rollout`. */
  rollout?: string;
  /** ID of the `Target`. */
  targetId?: string;
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
  /** The name of the `Release`. */
  release?: string;
  /** Unique identifier of the `Release`. */
  releaseUid?: string;
  /** Debug message for when a notification fails to send. */
  message?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
}

export const JobRunNotificationEvent: Schema.Schema<JobRunNotificationEvent> = Schema.suspend(() => Schema.Struct({
  rolloutUid: Schema.optional(Schema.String),
  jobRun: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
  targetId: Schema.optional(Schema.String),
  pipelineUid: Schema.optional(Schema.String),
  release: Schema.optional(Schema.String),
  releaseUid: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "JobRunNotificationEvent" }) as any as Schema.Schema<JobRunNotificationEvent>;

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
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Expr),
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
  bindings: Schema.optional(Schema.Array(Binding)),
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

export interface Metadata {
  /** Output only. Custom metadata provided by user-defined `Rollout` operations. */
  custom?: CustomMetadata;
  /** Output only. AutomationRolloutMetadata contains the information about the interactions between Automation service and this rollout. */
  automation?: AutomationRolloutMetadata;
  /** Output only. The name of the Cloud Run Service that is associated with a `Rollout`. */
  cloudRun?: CloudRunMetadata;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  custom: Schema.optional(CustomMetadata),
  automation: Schema.optional(AutomationRolloutMetadata),
  cloudRun: Schema.optional(CloudRunMetadata),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface RolloutUpdateEvent {
  /** The name of the rollout. rollout_uid is not in this log message because we write some of these log messages at rollout creation time, before we've generated the uid. */
  rollout?: string;
  /** Type of this notification, e.g. for a rollout update event. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** ID of the target. */
  targetId?: string;
  /** The name of the `Release`. */
  release?: string;
  /** Debug message for when a rollout update event occurs. */
  message?: string;
  /** Unique identifier of the release. */
  releaseUid?: string;
  /** Unique identifier of the pipeline. */
  pipelineUid?: string;
  /** The type of the rollout update. */
  rolloutUpdateType?: "ROLLOUT_UPDATE_TYPE_UNSPECIFIED" | "PENDING" | "PENDING_RELEASE" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "HALTED" | "SUCCEEDED" | "FAILED" | "APPROVAL_REQUIRED" | "APPROVED" | "REJECTED" | "ADVANCE_REQUIRED" | "ADVANCED" | (string & {});
}

export const RolloutUpdateEvent: Schema.Schema<RolloutUpdateEvent> = Schema.suspend(() => Schema.Struct({
  rollout: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  targetId: Schema.optional(Schema.String),
  release: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  releaseUid: Schema.optional(Schema.String),
  pipelineUid: Schema.optional(Schema.String),
  rolloutUpdateType: Schema.optional(Schema.String),
})).annotate({ identifier: "RolloutUpdateEvent" }) as any as Schema.Schema<RolloutUpdateEvent>;

export interface Rollout {
  /** Output only. Time at which the `Rollout` finished deploying. */
  deployEndTime?: string;
  /** Output only. Time at which the `Rollout` was approved. */
  approveTime?: string;
  /** Output only. The resource name of the Cloud Build `Build` object that is used to deploy the Rollout. Format is `projects/{project}/locations/{location}/builds/{build}`. */
  deployingBuild?: string;
  /** Output only. Time at which the `Rollout` was enqueued. */
  enqueueTime?: string;
  /** Output only. The reason this rollout failed. This will always be unspecified while the rollout is in progress. */
  deployFailureCause?: "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "RELEASE_FAILED" | "RELEASE_ABANDONED" | "VERIFICATION_CONFIG_NOT_FOUND" | "CLOUD_BUILD_REQUEST_FAILED" | "OPERATION_FEATURE_NOT_SUPPORTED" | (string & {});
  /** Output only. Unique identifier of the `Rollout`. */
  uid?: string;
  /** Output only. Names of `Rollouts` that rolled back this `Rollout`. */
  rolledBackByRollouts?: Array<string>;
  /** Output only. Name of the `Rollout` that is rolled back by this `Rollout`. Empty if this `Rollout` wasn't created as a rollback. */
  rollbackOfRollout?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
  /** Output only. Time at which the `Rollout` was created. */
  createTime?: string;
  /** Output only. Additional information about the rollout failure, if available. */
  failureReason?: string;
  /** Optional. Description of the `Rollout` for user purposes. Max length is 255 characters. */
  description?: string;
  /** Output only. Name of the `ControllerRollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  controllerRollout?: string;
  /** Output only. The phases that represent the workflows of this `Rollout`. */
  phases?: Array<Phase>;
  /** Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** Required. The ID of Target to which this `Rollout` is deploying. */
  targetId?: string;
  /** Output only. The AutomationRun actively repairing the rollout. */
  activeRepairAutomationRun?: string;
  /** Output only. Metadata contains information about the rollout. */
  metadata?: Metadata;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Approval state of the `Rollout`. */
  approvalState?: "APPROVAL_STATE_UNSPECIFIED" | "NEEDS_APPROVAL" | "DOES_NOT_NEED_APPROVAL" | "APPROVED" | "REJECTED" | (string & {});
  /** Output only. Current state of the `Rollout`. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | "PENDING_APPROVAL" | "APPROVAL_REJECTED" | "PENDING" | "PENDING_RELEASE" | "CANCELLING" | "CANCELLED" | "HALTED" | (string & {});
  /** Identifier. Name of the `Rollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. The `rollout` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name?: string;
  /** Output only. Time at which the `Rollout` started deploying. */
  deployStartTime?: string;
}

export const Rollout: Schema.Schema<Rollout> = Schema.suspend(() => Schema.Struct({
  deployEndTime: Schema.optional(Schema.String),
  approveTime: Schema.optional(Schema.String),
  deployingBuild: Schema.optional(Schema.String),
  enqueueTime: Schema.optional(Schema.String),
  deployFailureCause: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  rolledBackByRollouts: Schema.optional(Schema.Array(Schema.String)),
  rollbackOfRollout: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  controllerRollout: Schema.optional(Schema.String),
  phases: Schema.optional(Schema.Array(Phase)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  targetId: Schema.optional(Schema.String),
  activeRepairAutomationRun: Schema.optional(Schema.String),
  metadata: Schema.optional(Metadata),
  etag: Schema.optional(Schema.String),
  approvalState: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  deployStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Rollout" }) as any as Schema.Schema<Rollout>;

export interface ListRolloutsResponse {
  /** The `Rollout` objects. */
  rollouts?: Array<Rollout>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRolloutsResponse: Schema.Schema<ListRolloutsResponse> = Schema.suspend(() => Schema.Struct({
  rollouts: Schema.optional(Schema.Array(Rollout)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRolloutsResponse" }) as any as Schema.Schema<ListRolloutsResponse>;

export interface TargetNotificationEvent {
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** Debug message for when a notification fails to send. */
  message?: string;
  /** The name of the `Target`. */
  target?: string;
}

export const TargetNotificationEvent: Schema.Schema<TargetNotificationEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetNotificationEvent" }) as any as Schema.Schema<TargetNotificationEvent>;

export interface TerminateJobRunRequest {
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: Array<string>;
}

export const TerminateJobRunRequest: Schema.Schema<TerminateJobRunRequest> = Schema.suspend(() => Schema.Struct({
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TerminateJobRunRequest" }) as any as Schema.Schema<TerminateJobRunRequest>;

export interface ListCustomTargetTypesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The `CustomTargetType` objects. */
  customTargetTypes?: Array<CustomTargetType>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCustomTargetTypesResponse: Schema.Schema<ListCustomTargetTypesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  customTargetTypes: Schema.optional(Schema.Array(CustomTargetType)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCustomTargetTypesResponse" }) as any as Schema.Schema<ListCustomTargetTypesResponse>;

export interface AdvanceChildRolloutJobRun {
  /** Output only. the ID of the ChildRollout's Phase. */
  rolloutPhaseId?: string;
  /** Output only. Name of the `ChildRollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  rollout?: string;
}

export const AdvanceChildRolloutJobRun: Schema.Schema<AdvanceChildRolloutJobRun> = Schema.suspend(() => Schema.Struct({
  rolloutPhaseId: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvanceChildRolloutJobRun" }) as any as Schema.Schema<AdvanceChildRolloutJobRun>;

export interface VerifyJobRun {
  /** Output only. The resource name of the Cloud Build `Build` object that is used to verify. Format is `projects/{project}/locations/{location}/builds/{build}`. */
  build?: string;
  /** Output only. The reason the verify failed. This will always be unspecified while the verify is in progress or if it succeeded. */
  failureCause?: "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "VERIFICATION_CONFIG_NOT_FOUND" | "CLOUD_BUILD_REQUEST_FAILED" | (string & {});
  /** Output only. File path of the Skaffold event log relative to the artifact URI. */
  eventLogPath?: string;
  /** Output only. URI of a directory containing the verify artifacts. This contains the Skaffold event log. */
  artifactUri?: string;
  /** Output only. Additional information about the verify failure, if available. */
  failureMessage?: string;
}

export const VerifyJobRun: Schema.Schema<VerifyJobRun> = Schema.suspend(() => Schema.Struct({
  build: Schema.optional(Schema.String),
  failureCause: Schema.optional(Schema.String),
  eventLogPath: Schema.optional(Schema.String),
  artifactUri: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyJobRun" }) as any as Schema.Schema<VerifyJobRun>;

export interface PredeployJobRun {
  /** Output only. The resource name of the Cloud Build `Build` object that is used to execute the custom actions associated with the predeploy Job. Format is `projects/{project}/locations/{location}/builds/{build}`. */
  build?: string;
  /** Output only. Additional information about the predeploy failure, if available. */
  failureMessage?: string;
  /** Output only. The reason the predeploy failed. This will always be unspecified while the predeploy is in progress or if it succeeded. */
  failureCause?: "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "CLOUD_BUILD_REQUEST_FAILED" | (string & {});
}

export const PredeployJobRun: Schema.Schema<PredeployJobRun> = Schema.suspend(() => Schema.Struct({
  build: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
  failureCause: Schema.optional(Schema.String),
})).annotate({ identifier: "PredeployJobRun" }) as any as Schema.Schema<PredeployJobRun>;

export interface CreateChildRolloutJobRun {
  /** Output only. The ID of the childRollout Phase initiated by this JobRun. */
  rolloutPhaseId?: string;
  /** Output only. Name of the `ChildRollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  rollout?: string;
}

export const CreateChildRolloutJobRun: Schema.Schema<CreateChildRolloutJobRun> = Schema.suspend(() => Schema.Struct({
  rolloutPhaseId: Schema.optional(Schema.String),
  rollout: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateChildRolloutJobRun" }) as any as Schema.Schema<CreateChildRolloutJobRun>;

export interface JobRun {
  /** Output only. Time at which the `JobRun` was started. */
  startTime?: string;
  /** Output only. ID of the `Rollout` phase this `JobRun` belongs in. */
  phaseId?: string;
  /** Output only. Information specific to a deploy `JobRun`. */
  deployJobRun?: DeployJobRun;
  /** Output only. Time at which the `JobRun` was created. */
  createTime?: string;
  /** Output only. Information specific to an advanceChildRollout `JobRun` */
  advanceChildRolloutJobRun?: AdvanceChildRolloutJobRun;
  /** Output only. The current state of the `JobRun`. */
  state?: "STATE_UNSPECIFIED" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "TERMINATING" | "TERMINATED" | (string & {});
  /** Output only. Information specific to a verify `JobRun`. */
  verifyJobRun?: VerifyJobRun;
  /** Output only. Unique identifier of the `JobRun`. */
  uid?: string;
  /** Output only. Name of the `JobRun`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{releases}/rollouts/{rollouts}/jobRuns/{uuid}`. */
  name?: string;
  /** Output only. Time at which the `JobRun` ended. */
  endTime?: string;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Information specific to a predeploy `JobRun`. */
  predeployJobRun?: PredeployJobRun;
  /** Output only. Information specific to a postdeploy `JobRun`. */
  postdeployJobRun?: PostdeployJobRun;
  /** Output only. Information specific to a createChildRollout `JobRun`. */
  createChildRolloutJobRun?: CreateChildRolloutJobRun;
  /** Output only. ID of the `Rollout` job this `JobRun` corresponds to. */
  jobId?: string;
}

export const JobRun: Schema.Schema<JobRun> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  phaseId: Schema.optional(Schema.String),
  deployJobRun: Schema.optional(DeployJobRun),
  createTime: Schema.optional(Schema.String),
  advanceChildRolloutJobRun: Schema.optional(AdvanceChildRolloutJobRun),
  state: Schema.optional(Schema.String),
  verifyJobRun: Schema.optional(VerifyJobRun),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  predeployJobRun: Schema.optional(PredeployJobRun),
  postdeployJobRun: Schema.optional(PostdeployJobRun),
  createChildRolloutJobRun: Schema.optional(CreateChildRolloutJobRun),
  jobId: Schema.optional(Schema.String),
})).annotate({ identifier: "JobRun" }) as any as Schema.Schema<JobRun>;

export interface ListJobRunsResponse {
  /** The `JobRun` objects. */
  jobRuns?: Array<JobRun>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached */
  unreachable?: Array<string>;
}

export const ListJobRunsResponse: Schema.Schema<ListJobRunsResponse> = Schema.suspend(() => Schema.Struct({
  jobRuns: Schema.optional(Schema.Array(JobRun)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListJobRunsResponse" }) as any as Schema.Schema<ListJobRunsResponse>;

export interface CancelRolloutResponse {
}

export const CancelRolloutResponse: Schema.Schema<CancelRolloutResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelRolloutResponse" }) as any as Schema.Schema<CancelRolloutResponse>;

export interface AdvanceRolloutRequest {
  /** Required. The phase ID to advance the `Rollout` to. */
  phaseId?: string;
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: Array<string>;
}

export const AdvanceRolloutRequest: Schema.Schema<AdvanceRolloutRequest> = Schema.suspend(() => Schema.Struct({
  phaseId: Schema.optional(Schema.String),
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdvanceRolloutRequest" }) as any as Schema.Schema<AdvanceRolloutRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface CancelAutomationRunResponse {
}

export const CancelAutomationRunResponse: Schema.Schema<CancelAutomationRunResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelAutomationRunResponse" }) as any as Schema.Schema<CancelAutomationRunResponse>;

export interface CancelAutomationRunRequest {
}

export const CancelAutomationRunRequest: Schema.Schema<CancelAutomationRunRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelAutomationRunRequest" }) as any as Schema.Schema<CancelAutomationRunRequest>;

export interface CustomTargetTypeNotificationEvent {
  /** The name of the `CustomTargetType`. */
  customTargetType?: string;
  /** Unique identifier of the `CustomTargetType`. */
  customTargetTypeUid?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** Debug message for when a notification fails to send. */
  message?: string;
}

export const CustomTargetTypeNotificationEvent: Schema.Schema<CustomTargetTypeNotificationEvent> = Schema.suspend(() => Schema.Struct({
  customTargetType: Schema.optional(Schema.String),
  customTargetTypeUid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomTargetTypeNotificationEvent" }) as any as Schema.Schema<CustomTargetTypeNotificationEvent>;

export interface CancelRolloutRequest {
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: Array<string>;
}

export const CancelRolloutRequest: Schema.Schema<CancelRolloutRequest> = Schema.suspend(() => Schema.Struct({
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CancelRolloutRequest" }) as any as Schema.Schema<CancelRolloutRequest>;

export interface RetryJobRequest {
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: Array<string>;
  /** Required. The phase ID the Job to retry belongs to. */
  phaseId?: string;
  /** Required. The job ID for the Job to retry. */
  jobId?: string;
}

export const RetryJobRequest: Schema.Schema<RetryJobRequest> = Schema.suspend(() => Schema.Struct({
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
  phaseId: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryJobRequest" }) as any as Schema.Schema<RetryJobRequest>;

export interface RollbackTargetConfig {
  /** Optional. The starting phase ID for the `Rollout`. If unspecified, the `Rollout` will start in the stable phase. */
  startingPhaseId?: string;
  /** Optional. The rollback `Rollout` to create. */
  rollout?: Rollout;
}

export const RollbackTargetConfig: Schema.Schema<RollbackTargetConfig> = Schema.suspend(() => Schema.Struct({
  startingPhaseId: Schema.optional(Schema.String),
  rollout: Schema.optional(Rollout),
})).annotate({ identifier: "RollbackTargetConfig" }) as any as Schema.Schema<RollbackTargetConfig>;

export interface RollbackTargetRequest {
  /** Optional. Configs for the rollback `Rollout`. */
  rollbackConfig?: RollbackTargetConfig;
  /** Optional. If set to true, the request is validated and the user is provided with a `RollbackTargetResponse`. */
  validateOnly?: boolean;
  /** Required. ID of the `Target` that is being rolled back. */
  targetId?: string;
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deploy_policy}`. */
  overrideDeployPolicy?: Array<string>;
  /** Optional. If provided, this must be the latest `Rollout` that is on the `Target`. */
  rolloutToRollBack?: string;
  /** Required. ID of the rollback `Rollout` to create. */
  rolloutId?: string;
  /** Optional. ID of the `Release` to roll back to. If this isn't specified, the previous successful `Rollout` to the specified target will be used to determine the `Release`. */
  releaseId?: string;
}

export const RollbackTargetRequest: Schema.Schema<RollbackTargetRequest> = Schema.suspend(() => Schema.Struct({
  rollbackConfig: Schema.optional(RollbackTargetConfig),
  validateOnly: Schema.optional(Schema.Boolean),
  targetId: Schema.optional(Schema.String),
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
  rolloutToRollBack: Schema.optional(Schema.String),
  rolloutId: Schema.optional(Schema.String),
  releaseId: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackTargetRequest" }) as any as Schema.Schema<RollbackTargetRequest>;

export interface AbandonReleaseResponse {
}

export const AbandonReleaseResponse: Schema.Schema<AbandonReleaseResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AbandonReleaseResponse" }) as any as Schema.Schema<AbandonReleaseResponse>;

export interface ListAutomationsResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The `Automation` objects. */
  automations?: Array<Automation>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAutomationsResponse: Schema.Schema<ListAutomationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  automations: Schema.optional(Schema.Array(Automation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAutomationsResponse" }) as any as Schema.Schema<ListAutomationsResponse>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface IgnoreJobResponse {
}

export const IgnoreJobResponse: Schema.Schema<IgnoreJobResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IgnoreJobResponse" }) as any as Schema.Schema<IgnoreJobResponse>;

export interface ReleaseNotificationEvent {
  /** Unique identifier of the `Release`. */
  releaseUid?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** The name of the `Release`. */
  release?: string;
  /** Debug message for when a notification fails to send. */
  message?: string;
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
}

export const ReleaseNotificationEvent: Schema.Schema<ReleaseNotificationEvent> = Schema.suspend(() => Schema.Struct({
  releaseUid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  release: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  pipelineUid: Schema.optional(Schema.String),
})).annotate({ identifier: "ReleaseNotificationEvent" }) as any as Schema.Schema<ReleaseNotificationEvent>;

export interface AdvanceRolloutResponse {
}

export const AdvanceRolloutResponse: Schema.Schema<AdvanceRolloutResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AdvanceRolloutResponse" }) as any as Schema.Schema<AdvanceRolloutResponse>;

export interface ApproveRolloutRequest {
  /** Required. True = approve; false = reject */
  approved?: boolean;
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: Array<string>;
}

export const ApproveRolloutRequest: Schema.Schema<ApproveRolloutRequest> = Schema.suspend(() => Schema.Struct({
  approved: Schema.optional(Schema.Boolean),
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApproveRolloutRequest" }) as any as Schema.Schema<ApproveRolloutRequest>;

export interface RollbackTargetResponse {
  /** The config of the rollback `Rollout` created or will be created. */
  rollbackConfig?: RollbackTargetConfig;
}

export const RollbackTargetResponse: Schema.Schema<RollbackTargetResponse> = Schema.suspend(() => Schema.Struct({
  rollbackConfig: Schema.optional(RollbackTargetConfig),
})).annotate({ identifier: "RollbackTargetResponse" }) as any as Schema.Schema<RollbackTargetResponse>;

export interface DeliveryPipelineNotificationEvent {
  /** Debug message for when a notification fails to send. */
  message?: string;
  /** The name of the `Delivery Pipeline`. */
  deliveryPipeline?: string;
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
}

export const DeliveryPipelineNotificationEvent: Schema.Schema<DeliveryPipelineNotificationEvent> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  deliveryPipeline: Schema.optional(Schema.String),
  pipelineUid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryPipelineNotificationEvent" }) as any as Schema.Schema<DeliveryPipelineNotificationEvent>;

export interface DeployPolicyNotificationEvent {
  /** Debug message for when a deploy policy fails to send a pub/sub notification. */
  message?: string;
  /** Unique identifier of the deploy policy. */
  deployPolicyUid?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** The name of the `DeployPolicy`. */
  deployPolicy?: string;
}

export const DeployPolicyNotificationEvent: Schema.Schema<DeployPolicyNotificationEvent> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  deployPolicyUid: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  deployPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "DeployPolicyNotificationEvent" }) as any as Schema.Schema<DeployPolicyNotificationEvent>;

export interface AbandonReleaseRequest {
}

export const AbandonReleaseRequest: Schema.Schema<AbandonReleaseRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AbandonReleaseRequest" }) as any as Schema.Schema<AbandonReleaseRequest>;

export interface RetryJobResponse {
}

export const RetryJobResponse: Schema.Schema<RetryJobResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RetryJobResponse" }) as any as Schema.Schema<RetryJobResponse>;

export interface ApproveRolloutResponse {
}

export const ApproveRolloutResponse: Schema.Schema<ApproveRolloutResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ApproveRolloutResponse" }) as any as Schema.Schema<ApproveRolloutResponse>;

export interface DeployPolicyEvaluationEvent {
  /** Unique identifier of the `Target`. This is an optional field, as a `Target` may not always be applicable to a policy. */
  targetUid?: string;
  /** Rule type (e.g. Restrict Rollouts). */
  ruleType?: string;
  /** The name of the `Target`. This is an optional field, as a `Target` may not always be applicable to a policy. */
  target?: string;
  /** Whether the request is allowed. Allowed is set as true if: (1) the request complies with the policy; or (2) the request doesn't comply with the policy but the policy was overridden; or (3) the request doesn't comply with the policy but the policy was suspended */
  allowed?: boolean;
  /** The policy verdict of the request. */
  verdict?: "POLICY_VERDICT_UNSPECIFIED" | "ALLOWED_BY_POLICY" | "DENIED_BY_POLICY" | (string & {});
  /** Unique identifier of the `DeployPolicy`. */
  deployPolicyUid?: string;
  /** Things that could have overridden the policy verdict. Overrides together with verdict decide whether the request is allowed. */
  overrides?: Array<"POLICY_VERDICT_OVERRIDE_UNSPECIFIED" | "POLICY_OVERRIDDEN" | "POLICY_SUSPENDED" | (string & {})>;
  /** Unique identifier of the `Delivery Pipeline`. */
  pipelineUid?: string;
  /** The name of the `Delivery Pipeline`. */
  deliveryPipeline?: string;
  /** What invoked the action (e.g. a user or automation). */
  invoker?: "INVOKER_UNSPECIFIED" | "USER" | "DEPLOY_AUTOMATION" | (string & {});
  /** Debug message for when a deploy policy event occurs. */
  message?: string;
  /** The name of the `DeployPolicy`. */
  deployPolicy?: string;
  /** Rule id. */
  rule?: string;
}

export const DeployPolicyEvaluationEvent: Schema.Schema<DeployPolicyEvaluationEvent> = Schema.suspend(() => Schema.Struct({
  targetUid: Schema.optional(Schema.String),
  ruleType: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  allowed: Schema.optional(Schema.Boolean),
  verdict: Schema.optional(Schema.String),
  deployPolicyUid: Schema.optional(Schema.String),
  overrides: Schema.optional(Schema.Array(Schema.String)),
  pipelineUid: Schema.optional(Schema.String),
  deliveryPipeline: Schema.optional(Schema.String),
  invoker: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  deployPolicy: Schema.optional(Schema.String),
  rule: Schema.optional(Schema.String),
})).annotate({ identifier: "DeployPolicyEvaluationEvent" }) as any as Schema.Schema<DeployPolicyEvaluationEvent>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AutomationEvent {
  /** Debug message for when there is an update on the AutomationRun. Provides further details about the resource creation or state change. */
  message?: string;
  /** Type of this notification, e.g. for a Pub/Sub failure. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RESOURCE_STATE_CHANGE" | "TYPE_PROCESS_ABORTED" | "TYPE_RESTRICTION_VIOLATED" | "TYPE_RESOURCE_DELETED" | "TYPE_ROLLOUT_UPDATE" | "TYPE_DEPLOY_POLICY_EVALUATION" | "TYPE_RENDER_STATUES_CHANGE" | (string & {});
  /** The name of the `AutomationRun`. */
  automation?: string;
  /** Unique identifier of the `DeliveryPipeline`. */
  pipelineUid?: string;
}

export const AutomationEvent: Schema.Schema<AutomationEvent> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  automation: Schema.optional(Schema.String),
  pipelineUid: Schema.optional(Schema.String),
})).annotate({ identifier: "AutomationEvent" }) as any as Schema.Schema<AutomationEvent>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
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

/** Gets the configuration for a location. */
export interface GetConfigProjectsLocationsRequest {
  /** Required. Name of requested configuration. */
  name: string;
}

export const GetConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsLocationsRequest>;

export type GetConfigProjectsLocationsResponse = Config;
export const GetConfigProjectsLocationsResponse = Config;

export type GetConfigProjectsLocationsError = CommonErrors;

export const getConfigProjectsLocations: API.OperationMethod<GetConfigProjectsLocationsRequest, GetConfigProjectsLocationsResponse, GetConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsLocationsRequest,
  output: GetConfigProjectsLocationsResponse,
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

/** Deletes a single DeployPolicy. */
export interface DeleteProjectsLocationsDeployPoliciesRequest {
  /** Optional. If set, validate the request and preview the review, but do not actually post it. */
  validateOnly?: boolean;
  /** Required. The name of the `DeployPolicy` to delete. The format is `projects/{project_id}/locations/{location_name}/deployPolicies/{deploy_policy_name}`. */
  name: string;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. If set to true, then deleting an already deleted or non-existing `DeployPolicy` will succeed. */
  allowMissing?: boolean;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies/{deployPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeployPoliciesRequest>;

export type DeleteProjectsLocationsDeployPoliciesResponse = Operation;
export const DeleteProjectsLocationsDeployPoliciesResponse = Operation;

export type DeleteProjectsLocationsDeployPoliciesError = CommonErrors;

export const deleteProjectsLocationsDeployPolicies: API.OperationMethod<DeleteProjectsLocationsDeployPoliciesRequest, DeleteProjectsLocationsDeployPoliciesResponse, DeleteProjectsLocationsDeployPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeployPoliciesRequest,
  output: DeleteProjectsLocationsDeployPoliciesResponse,
  errors: [],
}));

/** Gets details of a single DeployPolicy. */
export interface GetProjectsLocationsDeployPoliciesRequest {
  /** Required. Name of the `DeployPolicy`. Format must be `projects/{project_id}/locations/{location_name}/deployPolicies/{deploy_policy_name}`. */
  name: string;
}

export const GetProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies/{deployPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeployPoliciesRequest>;

export type GetProjectsLocationsDeployPoliciesResponse = DeployPolicy;
export const GetProjectsLocationsDeployPoliciesResponse = DeployPolicy;

export type GetProjectsLocationsDeployPoliciesError = CommonErrors;

export const getProjectsLocationsDeployPolicies: API.OperationMethod<GetProjectsLocationsDeployPoliciesRequest, GetProjectsLocationsDeployPoliciesResponse, GetProjectsLocationsDeployPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeployPoliciesRequest,
  output: GetProjectsLocationsDeployPoliciesResponse,
  errors: [],
}));

/** Creates a new DeployPolicy in a given project and location. */
export interface CreateProjectsLocationsDeployPoliciesRequest {
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent collection in which the `DeployPolicy` must be created. The format is `projects/{project_id}/locations/{location_name}`. */
  parent: string;
  /** Required. ID of the `DeployPolicy`. */
  deployPolicyId?: string;
  /** Request body */
  body?: DeployPolicy;
}

export const CreateProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  deployPolicyId: Schema.optional(Schema.String).pipe(T.HttpQuery("deployPolicyId")),
  body: Schema.optional(DeployPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeployPoliciesRequest>;

export type CreateProjectsLocationsDeployPoliciesResponse = Operation;
export const CreateProjectsLocationsDeployPoliciesResponse = Operation;

export type CreateProjectsLocationsDeployPoliciesError = CommonErrors;

export const createProjectsLocationsDeployPolicies: API.OperationMethod<CreateProjectsLocationsDeployPoliciesRequest, CreateProjectsLocationsDeployPoliciesResponse, CreateProjectsLocationsDeployPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeployPoliciesRequest,
  output: CreateProjectsLocationsDeployPoliciesResponse,
  errors: [],
}));

/** Lists DeployPolicies in a given project and location. */
export interface ListProjectsLocationsDeployPoliciesRequest {
  /** Required. The parent, which owns this collection of deploy policies. Format must be `projects/{project_id}/locations/{location_name}`. */
  parent: string;
  /** The maximum number of deploy policies to return. The service may return fewer than this value. If unspecified, at most 50 deploy policies will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Filter deploy policies to be returned. See https://google.aip.dev/160 for more details. All fields can be used in the filter. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** A page token, received from a previous `ListDeployPolicies` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeployPoliciesRequest>;

export type ListProjectsLocationsDeployPoliciesResponse = ListDeployPoliciesResponse;
export const ListProjectsLocationsDeployPoliciesResponse = ListDeployPoliciesResponse;

export type ListProjectsLocationsDeployPoliciesError = CommonErrors;

export const listProjectsLocationsDeployPolicies = API.makePaginated(() => ({
  input: ListProjectsLocationsDeployPoliciesRequest,
  output: ListProjectsLocationsDeployPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the parameters of a single DeployPolicy. */
export interface PatchProjectsLocationsDeployPoliciesRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the `DeployPolicy` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. */
  updateMask?: string;
  /** Output only. Name of the `DeployPolicy`. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. The `deployPolicy` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name: string;
  /** Optional. If set to true, updating a `DeployPolicy` that does not exist will result in the creation of a new `DeployPolicy`. */
  allowMissing?: boolean;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Request body */
  body?: DeployPolicy;
}

export const PatchProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(DeployPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies/{deployPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDeployPoliciesRequest>;

export type PatchProjectsLocationsDeployPoliciesResponse = Operation;
export const PatchProjectsLocationsDeployPoliciesResponse = Operation;

export type PatchProjectsLocationsDeployPoliciesError = CommonErrors;

export const patchProjectsLocationsDeployPolicies: API.OperationMethod<PatchProjectsLocationsDeployPoliciesRequest, PatchProjectsLocationsDeployPoliciesResponse, PatchProjectsLocationsDeployPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDeployPoliciesRequest,
  output: PatchProjectsLocationsDeployPoliciesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDeployPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies/{deployPoliciesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDeployPoliciesRequest>;

export type SetIamPolicyProjectsLocationsDeployPoliciesResponse = Policy;
export const SetIamPolicyProjectsLocationsDeployPoliciesResponse = Policy;

export type SetIamPolicyProjectsLocationsDeployPoliciesError = CommonErrors;

export const setIamPolicyProjectsLocationsDeployPolicies: API.OperationMethod<SetIamPolicyProjectsLocationsDeployPoliciesRequest, SetIamPolicyProjectsLocationsDeployPoliciesResponse, SetIamPolicyProjectsLocationsDeployPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDeployPoliciesRequest,
  output: SetIamPolicyProjectsLocationsDeployPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDeployPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDeployPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployPolicies/{deployPoliciesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDeployPoliciesRequest>;

export type GetIamPolicyProjectsLocationsDeployPoliciesResponse = Policy;
export const GetIamPolicyProjectsLocationsDeployPoliciesResponse = Policy;

export type GetIamPolicyProjectsLocationsDeployPoliciesError = CommonErrors;

export const getIamPolicyProjectsLocationsDeployPolicies: API.OperationMethod<GetIamPolicyProjectsLocationsDeployPoliciesRequest, GetIamPolicyProjectsLocationsDeployPoliciesResponse, GetIamPolicyProjectsLocationsDeployPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDeployPoliciesRequest,
  output: GetIamPolicyProjectsLocationsDeployPoliciesResponse,
  errors: [],
}));

/** Lists DeliveryPipelines in a given project and location. */
export interface ListProjectsLocationsDeliveryPipelinesRequest {
  /** A page token, received from a previous `ListDeliveryPipelines` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** The maximum number of pipelines to return. The service may return fewer than this value. If unspecified, at most 50 pipelines will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Filter pipelines to be returned. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The parent, which owns this collection of pipelines. Format must be `projects/{project_id}/locations/{location_name}`. */
  parent: string;
}

export const ListProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeliveryPipelinesRequest>;

export type ListProjectsLocationsDeliveryPipelinesResponse = ListDeliveryPipelinesResponse;
export const ListProjectsLocationsDeliveryPipelinesResponse = ListDeliveryPipelinesResponse;

export type ListProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const listProjectsLocationsDeliveryPipelines = API.makePaginated(() => ({
  input: ListProjectsLocationsDeliveryPipelinesRequest,
  output: ListProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single DeliveryPipeline. */
export interface GetProjectsLocationsDeliveryPipelinesRequest {
  /** Required. Name of the `DeliveryPipeline`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. */
  name: string;
}

export const GetProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeliveryPipelinesRequest>;

export type GetProjectsLocationsDeliveryPipelinesResponse = DeliveryPipeline;
export const GetProjectsLocationsDeliveryPipelinesResponse = DeliveryPipeline;

export type GetProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const getProjectsLocationsDeliveryPipelines: API.OperationMethod<GetProjectsLocationsDeliveryPipelinesRequest, GetProjectsLocationsDeliveryPipelinesResponse, GetProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeliveryPipelinesRequest,
  output: GetProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Updates the parameters of a single DeliveryPipeline. */
export interface PatchProjectsLocationsDeliveryPipelinesRequest {
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the `DeliveryPipeline` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. */
  updateMask?: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, updating a `DeliveryPipeline` that does not exist will result in the creation of a new `DeliveryPipeline`. */
  allowMissing?: boolean;
  /** Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name: string;
  /** Request body */
  body?: DeliveryPipeline;
}

export const PatchProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeliveryPipeline).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDeliveryPipelinesRequest>;

export type PatchProjectsLocationsDeliveryPipelinesResponse = Operation;
export const PatchProjectsLocationsDeliveryPipelinesResponse = Operation;

export type PatchProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const patchProjectsLocationsDeliveryPipelines: API.OperationMethod<PatchProjectsLocationsDeliveryPipelinesRequest, PatchProjectsLocationsDeliveryPipelinesResponse, PatchProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDeliveryPipelinesRequest,
  output: PatchProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDeliveryPipelinesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDeliveryPipelinesRequest>;

export type TestIamPermissionsProjectsLocationsDeliveryPipelinesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDeliveryPipelinesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const testIamPermissionsProjectsLocationsDeliveryPipelines: API.OperationMethod<TestIamPermissionsProjectsLocationsDeliveryPipelinesRequest, TestIamPermissionsProjectsLocationsDeliveryPipelinesResponse, TestIamPermissionsProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDeliveryPipelinesRequest,
  output: TestIamPermissionsProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Deletes a single DeliveryPipeline. */
export interface DeleteProjectsLocationsDeliveryPipelinesRequest {
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The name of the `DeliveryPipeline` to delete. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. */
  name: string;
  /** Optional. If set to true, all child resources under this pipeline will also be deleted. Otherwise, the request will only work if the pipeline has no child resources. */
  force?: boolean;
  /** Optional. If set to true, then deleting an already deleted or non-existing `DeliveryPipeline` will succeed. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the review, but do not actually post it. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeliveryPipelinesRequest>;

export type DeleteProjectsLocationsDeliveryPipelinesResponse = Operation;
export const DeleteProjectsLocationsDeliveryPipelinesResponse = Operation;

export type DeleteProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const deleteProjectsLocationsDeliveryPipelines: API.OperationMethod<DeleteProjectsLocationsDeliveryPipelinesRequest, DeleteProjectsLocationsDeliveryPipelinesResponse, DeleteProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeliveryPipelinesRequest,
  output: DeleteProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDeliveryPipelinesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDeliveryPipelinesRequest>;

export type SetIamPolicyProjectsLocationsDeliveryPipelinesResponse = Policy;
export const SetIamPolicyProjectsLocationsDeliveryPipelinesResponse = Policy;

export type SetIamPolicyProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const setIamPolicyProjectsLocationsDeliveryPipelines: API.OperationMethod<SetIamPolicyProjectsLocationsDeliveryPipelinesRequest, SetIamPolicyProjectsLocationsDeliveryPipelinesResponse, SetIamPolicyProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDeliveryPipelinesRequest,
  output: SetIamPolicyProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDeliveryPipelinesRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDeliveryPipelinesRequest>;

export type GetIamPolicyProjectsLocationsDeliveryPipelinesResponse = Policy;
export const GetIamPolicyProjectsLocationsDeliveryPipelinesResponse = Policy;

export type GetIamPolicyProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const getIamPolicyProjectsLocationsDeliveryPipelines: API.OperationMethod<GetIamPolicyProjectsLocationsDeliveryPipelinesRequest, GetIamPolicyProjectsLocationsDeliveryPipelinesResponse, GetIamPolicyProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDeliveryPipelinesRequest,
  output: GetIamPolicyProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Creates a new DeliveryPipeline in a given project and location. */
export interface CreateProjectsLocationsDeliveryPipelinesRequest {
  /** Required. ID of the `DeliveryPipeline`. */
  deliveryPipelineId?: string;
  /** Required. The parent collection in which the `DeliveryPipeline` must be created. The format is `projects/{project_id}/locations/{location_name}`. */
  parent: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Request body */
  body?: DeliveryPipeline;
}

export const CreateProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  deliveryPipelineId: Schema.optional(Schema.String).pipe(T.HttpQuery("deliveryPipelineId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(DeliveryPipeline).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeliveryPipelinesRequest>;

export type CreateProjectsLocationsDeliveryPipelinesResponse = Operation;
export const CreateProjectsLocationsDeliveryPipelinesResponse = Operation;

export type CreateProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const createProjectsLocationsDeliveryPipelines: API.OperationMethod<CreateProjectsLocationsDeliveryPipelinesRequest, CreateProjectsLocationsDeliveryPipelinesResponse, CreateProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeliveryPipelinesRequest,
  output: CreateProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Creates a `Rollout` to roll back the specified target. */
export interface RollbackTargetProjectsLocationsDeliveryPipelinesRequest {
  /** Required. The `DeliveryPipeline` for which the rollback `Rollout` must be created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. */
  name: string;
  /** Request body */
  body?: RollbackTargetRequest;
}

export const RollbackTargetProjectsLocationsDeliveryPipelinesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackTargetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}:rollbackTarget", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackTargetProjectsLocationsDeliveryPipelinesRequest>;

export type RollbackTargetProjectsLocationsDeliveryPipelinesResponse = RollbackTargetResponse;
export const RollbackTargetProjectsLocationsDeliveryPipelinesResponse = RollbackTargetResponse;

export type RollbackTargetProjectsLocationsDeliveryPipelinesError = CommonErrors;

export const rollbackTargetProjectsLocationsDeliveryPipelines: API.OperationMethod<RollbackTargetProjectsLocationsDeliveryPipelinesRequest, RollbackTargetProjectsLocationsDeliveryPipelinesResponse, RollbackTargetProjectsLocationsDeliveryPipelinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackTargetProjectsLocationsDeliveryPipelinesRequest,
  output: RollbackTargetProjectsLocationsDeliveryPipelinesResponse,
  errors: [],
}));

/** Gets details of a single Release. */
export interface GetProjectsLocationsDeliveryPipelinesReleasesRequest {
  /** Required. Name of the `Release`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}`. */
  name: string;
}

export const GetProjectsLocationsDeliveryPipelinesReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeliveryPipelinesReleasesRequest>;

export type GetProjectsLocationsDeliveryPipelinesReleasesResponse = Release;
export const GetProjectsLocationsDeliveryPipelinesReleasesResponse = Release;

export type GetProjectsLocationsDeliveryPipelinesReleasesError = CommonErrors;

export const getProjectsLocationsDeliveryPipelinesReleases: API.OperationMethod<GetProjectsLocationsDeliveryPipelinesReleasesRequest, GetProjectsLocationsDeliveryPipelinesReleasesResponse, GetProjectsLocationsDeliveryPipelinesReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeliveryPipelinesReleasesRequest,
  output: GetProjectsLocationsDeliveryPipelinesReleasesResponse,
  errors: [],
}));

/** Lists Releases in a given project and location. */
export interface ListProjectsLocationsDeliveryPipelinesReleasesRequest {
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListReleases` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of `Release` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Release` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Required. The `DeliveryPipeline` which owns this collection of `Release` objects. */
  parent: string;
  /** Optional. Filter releases to be returned. See https://google.aip.dev/160 for more details. */
  filter?: string;
}

export const ListProjectsLocationsDeliveryPipelinesReleasesRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeliveryPipelinesReleasesRequest>;

export type ListProjectsLocationsDeliveryPipelinesReleasesResponse = ListReleasesResponse;
export const ListProjectsLocationsDeliveryPipelinesReleasesResponse = ListReleasesResponse;

export type ListProjectsLocationsDeliveryPipelinesReleasesError = CommonErrors;

export const listProjectsLocationsDeliveryPipelinesReleases = API.makePaginated(() => ({
  input: ListProjectsLocationsDeliveryPipelinesReleasesRequest,
  output: ListProjectsLocationsDeliveryPipelinesReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new Release in a given project and location. */
export interface CreateProjectsLocationsDeliveryPipelinesReleasesRequest {
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: string[];
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. ID of the `Release`. */
  releaseId?: string;
  /** Required. The parent collection in which the `Release` is created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. */
  parent: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Request body */
  body?: Release;
}

export const CreateProjectsLocationsDeliveryPipelinesReleasesRequest = Schema.Struct({
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("overrideDeployPolicy")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  releaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("releaseId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Release).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeliveryPipelinesReleasesRequest>;

export type CreateProjectsLocationsDeliveryPipelinesReleasesResponse = Operation;
export const CreateProjectsLocationsDeliveryPipelinesReleasesResponse = Operation;

export type CreateProjectsLocationsDeliveryPipelinesReleasesError = CommonErrors;

export const createProjectsLocationsDeliveryPipelinesReleases: API.OperationMethod<CreateProjectsLocationsDeliveryPipelinesReleasesRequest, CreateProjectsLocationsDeliveryPipelinesReleasesResponse, CreateProjectsLocationsDeliveryPipelinesReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeliveryPipelinesReleasesRequest,
  output: CreateProjectsLocationsDeliveryPipelinesReleasesResponse,
  errors: [],
}));

/** Abandons a Release in the Delivery Pipeline. */
export interface AbandonProjectsLocationsDeliveryPipelinesReleasesRequest {
  /** Required. Name of the Release. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. */
  name: string;
  /** Request body */
  body?: AbandonReleaseRequest;
}

export const AbandonProjectsLocationsDeliveryPipelinesReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AbandonReleaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}:abandon", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AbandonProjectsLocationsDeliveryPipelinesReleasesRequest>;

export type AbandonProjectsLocationsDeliveryPipelinesReleasesResponse = AbandonReleaseResponse;
export const AbandonProjectsLocationsDeliveryPipelinesReleasesResponse = AbandonReleaseResponse;

export type AbandonProjectsLocationsDeliveryPipelinesReleasesError = CommonErrors;

export const abandonProjectsLocationsDeliveryPipelinesReleases: API.OperationMethod<AbandonProjectsLocationsDeliveryPipelinesReleasesRequest, AbandonProjectsLocationsDeliveryPipelinesReleasesResponse, AbandonProjectsLocationsDeliveryPipelinesReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AbandonProjectsLocationsDeliveryPipelinesReleasesRequest,
  output: AbandonProjectsLocationsDeliveryPipelinesReleasesResponse,
  errors: [],
}));

/** Lists Rollouts in a given project and location. */
export interface ListProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Optional. The maximum number of `Rollout` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Rollout` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListRollouts` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The `Release` which owns this collection of `Rollout` objects. */
  parent: string;
  /** Optional. Filter rollouts to be returned. See https://google.aip.dev/160 for more details. */
  filter?: string;
}

export const ListProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type ListProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = ListRolloutsResponse;
export const ListProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = ListRolloutsResponse;

export type ListProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const listProjectsLocationsDeliveryPipelinesReleasesRollouts = API.makePaginated(() => ({
  input: ListProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: ListProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retries the specified Job in a Rollout. */
export interface RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  rollout: string;
  /** Request body */
  body?: RetryJobRequest;
}

export const RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  rollout: Schema.String.pipe(T.HttpPath("rollout")),
  body: Schema.optional(RetryJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}:retryJob", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = RetryJobResponse;
export const RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = RetryJobResponse;

export type RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const retryJobProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: RetryJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Ignores the specified Job in a Rollout. */
export interface IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  rollout: string;
  /** Request body */
  body?: IgnoreJobRequest;
}

export const IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  rollout: Schema.String.pipe(T.HttpPath("rollout")),
  body: Schema.optional(IgnoreJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}:ignoreJob", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = IgnoreJobResponse;
export const IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = IgnoreJobResponse;

export type IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const ignoreJobProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: IgnoreJobProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Advances a Rollout in a given project and location. */
export interface AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  name: string;
  /** Request body */
  body?: AdvanceRolloutRequest;
}

export const AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AdvanceRolloutRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}:advance", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = AdvanceRolloutResponse;
export const AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = AdvanceRolloutResponse;

export type AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const advanceProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: AdvanceProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Gets details of a single Rollout. */
export interface GetProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Required. Name of the `Rollout`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}/rollouts/{rollout_name}`. */
  name: string;
}

export const GetProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type GetProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = Rollout;
export const GetProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = Rollout;

export type GetProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const getProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<GetProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, GetProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, GetProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: GetProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Creates a new Rollout in a given project and location. */
export interface CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. */
  overrideDeployPolicy?: string[];
  /** Required. The parent collection in which the `Rollout` must be created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}`. */
  parent: string;
  /** Required. ID of the `Rollout`. */
  rolloutId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The starting phase ID for the `Rollout`. If empty the `Rollout` will start at the first phase. */
  startingPhaseId?: string;
  /** Request body */
  body?: Rollout;
}

export const CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  overrideDeployPolicy: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("overrideDeployPolicy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  rolloutId: Schema.optional(Schema.String).pipe(T.HttpQuery("rolloutId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  startingPhaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("startingPhaseId")),
  body: Schema.optional(Rollout).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = Operation;
export const CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = Operation;

export type CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const createProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: CreateProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Approves a Rollout. */
export interface ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  name: string;
  /** Request body */
  body?: ApproveRolloutRequest;
}

export const ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveRolloutRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = ApproveRolloutResponse;
export const ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = ApproveRolloutResponse;

export type ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const approveProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: ApproveProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Cancels a Rollout in a given project and location. */
export interface CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest {
  /** Required. Name of the Rollout. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. */
  name: string;
  /** Request body */
  body?: CancelRolloutRequest;
}

export const CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelRolloutRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest>;

export type CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = CancelRolloutResponse;
export const CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse = CancelRolloutResponse;

export type CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsError = CommonErrors;

export const cancelProjectsLocationsDeliveryPipelinesReleasesRollouts: API.OperationMethod<CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest, CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse, CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsRequest,
  output: CancelProjectsLocationsDeliveryPipelinesReleasesRolloutsResponse,
  errors: [],
}));

/** Lists JobRuns in a given project and location. */
export interface ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest {
  /** Optional. The maximum number of `JobRun` objects to return. The service may return fewer than this value. If unspecified, at most 50 `JobRun` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Optional. Filter results to be returned. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The `Rollout` which owns this collection of `JobRun` objects. */
  parent: string;
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListJobRuns` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}/jobRuns" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest>;

export type ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse = ListJobRunsResponse;
export const ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse = ListJobRunsResponse;

export type ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsError = CommonErrors;

export const listProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRuns = API.makePaginated(() => ({
  input: ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest,
  output: ListProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single JobRun. */
export interface GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest {
  /** Required. Name of the `JobRun`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}/rollouts/{rollout_name}/jobRuns/{job_run_name}`. */
  name: string;
}

export const GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}/jobRuns/{jobRunsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest>;

export type GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse = JobRun;
export const GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse = JobRun;

export type GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsError = CommonErrors;

export const getProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRuns: API.OperationMethod<GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest, GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse, GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest,
  output: GetProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse,
  errors: [],
}));

/** Terminates a Job Run in a given project and location. */
export interface TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest {
  /** Required. Name of the `JobRun`. Format must be `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}/jobRuns/{jobRun}`. */
  name: string;
  /** Request body */
  body?: TerminateJobRunRequest;
}

export const TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TerminateJobRunRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/releases/{releasesId}/rollouts/{rolloutsId}/jobRuns/{jobRunsId}:terminate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest>;

export type TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse = TerminateJobRunResponse;
export const TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse = TerminateJobRunResponse;

export type TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsError = CommonErrors;

export const terminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRuns: API.OperationMethod<TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest, TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse, TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsRequest,
  output: TerminateProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsResponse,
  errors: [],
}));

/** Lists AutomationRuns in a given project and location. */
export interface ListProjectsLocationsDeliveryPipelinesAutomationRunsRequest {
  /** The maximum number of automationRuns to return. The service may return fewer than this value. If unspecified, at most 50 automationRuns will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Field to sort by. */
  orderBy?: string;
  /** Filter automationRuns to be returned. All fields can be used in the filter. */
  filter?: string;
  /** A page token, received from a previous `ListAutomationRuns` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent `Delivery Pipeline`, which owns this collection of automationRuns. Format must be `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}`. */
  parent: string;
}

export const ListProjectsLocationsDeliveryPipelinesAutomationRunsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automationRuns" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeliveryPipelinesAutomationRunsRequest>;

export type ListProjectsLocationsDeliveryPipelinesAutomationRunsResponse = ListAutomationRunsResponse;
export const ListProjectsLocationsDeliveryPipelinesAutomationRunsResponse = ListAutomationRunsResponse;

export type ListProjectsLocationsDeliveryPipelinesAutomationRunsError = CommonErrors;

export const listProjectsLocationsDeliveryPipelinesAutomationRuns = API.makePaginated(() => ({
  input: ListProjectsLocationsDeliveryPipelinesAutomationRunsRequest,
  output: ListProjectsLocationsDeliveryPipelinesAutomationRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Cancels an AutomationRun. The `state` of the `AutomationRun` after cancelling is `CANCELLED`. `CancelAutomationRun` can be called on AutomationRun in the state `IN_PROGRESS` and `PENDING`; AutomationRun in a different state returns an `FAILED_PRECONDITION` error. */
export interface CancelProjectsLocationsDeliveryPipelinesAutomationRunsRequest {
  /** Required. Name of the `AutomationRun`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automationRuns/{automation_run}`. */
  name: string;
  /** Request body */
  body?: CancelAutomationRunRequest;
}

export const CancelProjectsLocationsDeliveryPipelinesAutomationRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelAutomationRunRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automationRuns/{automationRunsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsDeliveryPipelinesAutomationRunsRequest>;

export type CancelProjectsLocationsDeliveryPipelinesAutomationRunsResponse = CancelAutomationRunResponse;
export const CancelProjectsLocationsDeliveryPipelinesAutomationRunsResponse = CancelAutomationRunResponse;

export type CancelProjectsLocationsDeliveryPipelinesAutomationRunsError = CommonErrors;

export const cancelProjectsLocationsDeliveryPipelinesAutomationRuns: API.OperationMethod<CancelProjectsLocationsDeliveryPipelinesAutomationRunsRequest, CancelProjectsLocationsDeliveryPipelinesAutomationRunsResponse, CancelProjectsLocationsDeliveryPipelinesAutomationRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsDeliveryPipelinesAutomationRunsRequest,
  output: CancelProjectsLocationsDeliveryPipelinesAutomationRunsResponse,
  errors: [],
}));

/** Gets details of a single AutomationRun. */
export interface GetProjectsLocationsDeliveryPipelinesAutomationRunsRequest {
  /** Required. Name of the `AutomationRun`. Format must be `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automationRuns/{automation_run}`. */
  name: string;
}

export const GetProjectsLocationsDeliveryPipelinesAutomationRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automationRuns/{automationRunsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeliveryPipelinesAutomationRunsRequest>;

export type GetProjectsLocationsDeliveryPipelinesAutomationRunsResponse = AutomationRun;
export const GetProjectsLocationsDeliveryPipelinesAutomationRunsResponse = AutomationRun;

export type GetProjectsLocationsDeliveryPipelinesAutomationRunsError = CommonErrors;

export const getProjectsLocationsDeliveryPipelinesAutomationRuns: API.OperationMethod<GetProjectsLocationsDeliveryPipelinesAutomationRunsRequest, GetProjectsLocationsDeliveryPipelinesAutomationRunsResponse, GetProjectsLocationsDeliveryPipelinesAutomationRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeliveryPipelinesAutomationRunsRequest,
  output: GetProjectsLocationsDeliveryPipelinesAutomationRunsResponse,
  errors: [],
}));

/** Updates the parameters of a single Automation resource. */
export interface PatchProjectsLocationsDeliveryPipelinesAutomationsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Optional. If set to true, updating a `Automation` that does not exist will result in the creation of a new `Automation`. */
  allowMissing?: boolean;
  /** Output only. Name of the `Automation`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automations/{automation}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the `Automation` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Automation;
}

export const PatchProjectsLocationsDeliveryPipelinesAutomationsRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Automation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automations/{automationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDeliveryPipelinesAutomationsRequest>;

export type PatchProjectsLocationsDeliveryPipelinesAutomationsResponse = Operation;
export const PatchProjectsLocationsDeliveryPipelinesAutomationsResponse = Operation;

export type PatchProjectsLocationsDeliveryPipelinesAutomationsError = CommonErrors;

export const patchProjectsLocationsDeliveryPipelinesAutomations: API.OperationMethod<PatchProjectsLocationsDeliveryPipelinesAutomationsRequest, PatchProjectsLocationsDeliveryPipelinesAutomationsResponse, PatchProjectsLocationsDeliveryPipelinesAutomationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDeliveryPipelinesAutomationsRequest,
  output: PatchProjectsLocationsDeliveryPipelinesAutomationsResponse,
  errors: [],
}));

/** Deletes a single Automation resource. */
export interface DeleteProjectsLocationsDeliveryPipelinesAutomationsRequest {
  /** Optional. The weak etag of the request. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, then deleting an already deleted or non-existing `Automation` will succeed. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and verify whether the resource exists, but do not actually post it. */
  validateOnly?: boolean;
  /** Required. The name of the `Automation` to delete. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/automations/{automation_name}`. */
  name: string;
}

export const DeleteProjectsLocationsDeliveryPipelinesAutomationsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automations/{automationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeliveryPipelinesAutomationsRequest>;

export type DeleteProjectsLocationsDeliveryPipelinesAutomationsResponse = Operation;
export const DeleteProjectsLocationsDeliveryPipelinesAutomationsResponse = Operation;

export type DeleteProjectsLocationsDeliveryPipelinesAutomationsError = CommonErrors;

export const deleteProjectsLocationsDeliveryPipelinesAutomations: API.OperationMethod<DeleteProjectsLocationsDeliveryPipelinesAutomationsRequest, DeleteProjectsLocationsDeliveryPipelinesAutomationsResponse, DeleteProjectsLocationsDeliveryPipelinesAutomationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeliveryPipelinesAutomationsRequest,
  output: DeleteProjectsLocationsDeliveryPipelinesAutomationsResponse,
  errors: [],
}));

/** Gets details of a single Automation. */
export interface GetProjectsLocationsDeliveryPipelinesAutomationsRequest {
  /** Required. Name of the `Automation`. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/automations/{automation_name}`. */
  name: string;
}

export const GetProjectsLocationsDeliveryPipelinesAutomationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automations/{automationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeliveryPipelinesAutomationsRequest>;

export type GetProjectsLocationsDeliveryPipelinesAutomationsResponse = Automation;
export const GetProjectsLocationsDeliveryPipelinesAutomationsResponse = Automation;

export type GetProjectsLocationsDeliveryPipelinesAutomationsError = CommonErrors;

export const getProjectsLocationsDeliveryPipelinesAutomations: API.OperationMethod<GetProjectsLocationsDeliveryPipelinesAutomationsRequest, GetProjectsLocationsDeliveryPipelinesAutomationsResponse, GetProjectsLocationsDeliveryPipelinesAutomationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeliveryPipelinesAutomationsRequest,
  output: GetProjectsLocationsDeliveryPipelinesAutomationsResponse,
  errors: [],
}));

/** Lists Automations in a given project and location. */
export interface ListProjectsLocationsDeliveryPipelinesAutomationsRequest {
  /** The maximum number of automations to return. The service may return fewer than this value. If unspecified, at most 50 automations will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Filter automations to be returned. All fields can be used in the filter. */
  filter?: string;
  /** Field to sort by. */
  orderBy?: string;
  /** A page token, received from a previous `ListAutomations` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent `Delivery Pipeline`, which owns this collection of automations. Format must be `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. */
  parent: string;
}

export const ListProjectsLocationsDeliveryPipelinesAutomationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeliveryPipelinesAutomationsRequest>;

export type ListProjectsLocationsDeliveryPipelinesAutomationsResponse = ListAutomationsResponse;
export const ListProjectsLocationsDeliveryPipelinesAutomationsResponse = ListAutomationsResponse;

export type ListProjectsLocationsDeliveryPipelinesAutomationsError = CommonErrors;

export const listProjectsLocationsDeliveryPipelinesAutomations = API.makePaginated(() => ({
  input: ListProjectsLocationsDeliveryPipelinesAutomationsRequest,
  output: ListProjectsLocationsDeliveryPipelinesAutomationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new Automation in a given project and location. */
export interface CreateProjectsLocationsDeliveryPipelinesAutomationsRequest {
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Required. The parent collection in which the `Automation` must be created. The format is `projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}`. */
  parent: string;
  /** Required. ID of the `Automation`. */
  automationId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Automation;
}

export const CreateProjectsLocationsDeliveryPipelinesAutomationsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  automationId: Schema.optional(Schema.String).pipe(T.HttpQuery("automationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Automation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deliveryPipelines/{deliveryPipelinesId}/automations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeliveryPipelinesAutomationsRequest>;

export type CreateProjectsLocationsDeliveryPipelinesAutomationsResponse = Operation;
export const CreateProjectsLocationsDeliveryPipelinesAutomationsResponse = Operation;

export type CreateProjectsLocationsDeliveryPipelinesAutomationsError = CommonErrors;

export const createProjectsLocationsDeliveryPipelinesAutomations: API.OperationMethod<CreateProjectsLocationsDeliveryPipelinesAutomationsRequest, CreateProjectsLocationsDeliveryPipelinesAutomationsResponse, CreateProjectsLocationsDeliveryPipelinesAutomationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeliveryPipelinesAutomationsRequest,
  output: CreateProjectsLocationsDeliveryPipelinesAutomationsResponse,
  errors: [],
}));

/** Updates a single CustomTargetType. */
export interface PatchProjectsLocationsCustomTargetTypesRequest {
  /** Optional. If set to true, updating a `CustomTargetType` that does not exist will result in the creation of a new `CustomTargetType`. */
  allowMissing?: boolean;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the `CustomTargetType` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Identifier. Name of the `CustomTargetType`. Format is `projects/{project}/locations/{location}/customTargetTypes/{customTargetType}`. The `customTargetType` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name: string;
  /** Request body */
  body?: CustomTargetType;
}

export const PatchProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CustomTargetType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes/{customTargetTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCustomTargetTypesRequest>;

export type PatchProjectsLocationsCustomTargetTypesResponse = Operation;
export const PatchProjectsLocationsCustomTargetTypesResponse = Operation;

export type PatchProjectsLocationsCustomTargetTypesError = CommonErrors;

export const patchProjectsLocationsCustomTargetTypes: API.OperationMethod<PatchProjectsLocationsCustomTargetTypesRequest, PatchProjectsLocationsCustomTargetTypesResponse, PatchProjectsLocationsCustomTargetTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCustomTargetTypesRequest,
  output: PatchProjectsLocationsCustomTargetTypesResponse,
  errors: [],
}));

/** Lists CustomTargetTypes in a given project and location. */
export interface ListProjectsLocationsCustomTargetTypesRequest {
  /** Optional. The maximum number of `CustomTargetType` objects to return. The service may return fewer than this value. If unspecified, at most 50 `CustomTargetType` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListCustomTargetTypes` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter custom target types to be returned. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The parent that owns this collection of custom target types. Format must be `projects/{project_id}/locations/{location_name}`. */
  parent: string;
}

export const ListProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCustomTargetTypesRequest>;

export type ListProjectsLocationsCustomTargetTypesResponse = ListCustomTargetTypesResponse;
export const ListProjectsLocationsCustomTargetTypesResponse = ListCustomTargetTypesResponse;

export type ListProjectsLocationsCustomTargetTypesError = CommonErrors;

export const listProjectsLocationsCustomTargetTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsCustomTargetTypesRequest,
  output: ListProjectsLocationsCustomTargetTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single CustomTargetType. */
export interface DeleteProjectsLocationsCustomTargetTypesRequest {
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. If set to true, then deleting an already deleted or non-existing `CustomTargetType` will succeed. */
  allowMissing?: boolean;
  /** Optional. If set to true, the request is validated but no actual change is made. */
  validateOnly?: boolean;
  /** Required. The name of the `CustomTargetType` to delete. Format must be `projects/{project_id}/locations/{location_name}/customTargetTypes/{custom_target_type}`. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes/{customTargetTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCustomTargetTypesRequest>;

export type DeleteProjectsLocationsCustomTargetTypesResponse = Operation;
export const DeleteProjectsLocationsCustomTargetTypesResponse = Operation;

export type DeleteProjectsLocationsCustomTargetTypesError = CommonErrors;

export const deleteProjectsLocationsCustomTargetTypes: API.OperationMethod<DeleteProjectsLocationsCustomTargetTypesRequest, DeleteProjectsLocationsCustomTargetTypesResponse, DeleteProjectsLocationsCustomTargetTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCustomTargetTypesRequest,
  output: DeleteProjectsLocationsCustomTargetTypesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsCustomTargetTypesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes/{customTargetTypesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsCustomTargetTypesRequest>;

export type GetIamPolicyProjectsLocationsCustomTargetTypesResponse = Policy;
export const GetIamPolicyProjectsLocationsCustomTargetTypesResponse = Policy;

export type GetIamPolicyProjectsLocationsCustomTargetTypesError = CommonErrors;

export const getIamPolicyProjectsLocationsCustomTargetTypes: API.OperationMethod<GetIamPolicyProjectsLocationsCustomTargetTypesRequest, GetIamPolicyProjectsLocationsCustomTargetTypesResponse, GetIamPolicyProjectsLocationsCustomTargetTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsCustomTargetTypesRequest,
  output: GetIamPolicyProjectsLocationsCustomTargetTypesResponse,
  errors: [],
}));

/** Gets details of a single CustomTargetType. */
export interface GetProjectsLocationsCustomTargetTypesRequest {
  /** Required. Name of the `CustomTargetType`. Format must be `projects/{project_id}/locations/{location_name}/customTargetTypes/{custom_target_type}`. */
  name: string;
}

export const GetProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes/{customTargetTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCustomTargetTypesRequest>;

export type GetProjectsLocationsCustomTargetTypesResponse = CustomTargetType;
export const GetProjectsLocationsCustomTargetTypesResponse = CustomTargetType;

export type GetProjectsLocationsCustomTargetTypesError = CommonErrors;

export const getProjectsLocationsCustomTargetTypes: API.OperationMethod<GetProjectsLocationsCustomTargetTypesRequest, GetProjectsLocationsCustomTargetTypesResponse, GetProjectsLocationsCustomTargetTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCustomTargetTypesRequest,
  output: GetProjectsLocationsCustomTargetTypesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsCustomTargetTypesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes/{customTargetTypesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsCustomTargetTypesRequest>;

export type SetIamPolicyProjectsLocationsCustomTargetTypesResponse = Policy;
export const SetIamPolicyProjectsLocationsCustomTargetTypesResponse = Policy;

export type SetIamPolicyProjectsLocationsCustomTargetTypesError = CommonErrors;

export const setIamPolicyProjectsLocationsCustomTargetTypes: API.OperationMethod<SetIamPolicyProjectsLocationsCustomTargetTypesRequest, SetIamPolicyProjectsLocationsCustomTargetTypesResponse, SetIamPolicyProjectsLocationsCustomTargetTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsCustomTargetTypesRequest,
  output: SetIamPolicyProjectsLocationsCustomTargetTypesResponse,
  errors: [],
}));

/** Creates a new CustomTargetType in a given project and location. */
export interface CreateProjectsLocationsCustomTargetTypesRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent collection in which the `CustomTargetType` must be created. The format is `projects/{project_id}/locations/{location_name}`. */
  parent: string;
  /** Required. ID of the `CustomTargetType`. */
  customTargetTypeId?: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Request body */
  body?: CustomTargetType;
}

export const CreateProjectsLocationsCustomTargetTypesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  customTargetTypeId: Schema.optional(Schema.String).pipe(T.HttpQuery("customTargetTypeId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(CustomTargetType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/customTargetTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCustomTargetTypesRequest>;

export type CreateProjectsLocationsCustomTargetTypesResponse = Operation;
export const CreateProjectsLocationsCustomTargetTypesResponse = Operation;

export type CreateProjectsLocationsCustomTargetTypesError = CommonErrors;

export const createProjectsLocationsCustomTargetTypes: API.OperationMethod<CreateProjectsLocationsCustomTargetTypesRequest, CreateProjectsLocationsCustomTargetTypesResponse, CreateProjectsLocationsCustomTargetTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCustomTargetTypesRequest,
  output: CreateProjectsLocationsCustomTargetTypesResponse,
  errors: [],
}));

/** Creates a new Target in a given project and location. */
export interface CreateProjectsLocationsTargetsRequest {
  /** Required. The parent collection in which the `Target` must be created. The format is `projects/{project_id}/locations/{location_name}`. */
  parent: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. ID of the `Target`. */
  targetId?: string;
  /** Request body */
  body?: Target;
}

export const CreateProjectsLocationsTargetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  targetId: Schema.optional(Schema.String).pipe(T.HttpQuery("targetId")),
  body: Schema.optional(Target).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/targets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTargetsRequest>;

export type CreateProjectsLocationsTargetsResponse = Operation;
export const CreateProjectsLocationsTargetsResponse = Operation;

export type CreateProjectsLocationsTargetsError = CommonErrors;

export const createProjectsLocationsTargets: API.OperationMethod<CreateProjectsLocationsTargetsRequest, CreateProjectsLocationsTargetsResponse, CreateProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTargetsRequest,
  output: CreateProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsTargetsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsTargetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/targets/{targetsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsTargetsRequest>;

export type GetIamPolicyProjectsLocationsTargetsResponse = Policy;
export const GetIamPolicyProjectsLocationsTargetsResponse = Policy;

export type GetIamPolicyProjectsLocationsTargetsError = CommonErrors;

export const getIamPolicyProjectsLocationsTargets: API.OperationMethod<GetIamPolicyProjectsLocationsTargetsRequest, GetIamPolicyProjectsLocationsTargetsResponse, GetIamPolicyProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsTargetsRequest,
  output: GetIamPolicyProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Lists Targets in a given project and location. */
export interface ListProjectsLocationsTargetsRequest {
  /** Optional. The maximum number of `Target` objects to return. The service may return fewer than this value. If unspecified, at most 50 `Target` objects will be returned. The maximum value is 1000; values above 1000 will be set to 1000. */
  pageSize?: number;
  /** Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListTargets` call. Provide this to retrieve the subsequent page. When paginating, all other provided parameters match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter targets to be returned. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The parent, which owns this collection of targets. Format must be `projects/{project_id}/locations/{location_name}`. */
  parent: string;
}

export const ListProjectsLocationsTargetsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/targets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTargetsRequest>;

export type ListProjectsLocationsTargetsResponse = ListTargetsResponse;
export const ListProjectsLocationsTargetsResponse = ListTargetsResponse;

export type ListProjectsLocationsTargetsError = CommonErrors;

export const listProjectsLocationsTargets = API.makePaginated(() => ({
  input: ListProjectsLocationsTargetsRequest,
  output: ListProjectsLocationsTargetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single Target. */
export interface DeleteProjectsLocationsTargetsRequest {
  /** Required. The name of the `Target` to delete. The format is `projects/{project_id}/locations/{location_name}/targets/{target_name}`. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request and preview the review, but do not actually post it. */
  validateOnly?: boolean;
  /** Optional. If set to true, then deleting an already deleted or non-existing `Target` will succeed. */
  allowMissing?: boolean;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsTargetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/targets/{targetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTargetsRequest>;

export type DeleteProjectsLocationsTargetsResponse = Operation;
export const DeleteProjectsLocationsTargetsResponse = Operation;

export type DeleteProjectsLocationsTargetsError = CommonErrors;

export const deleteProjectsLocationsTargets: API.OperationMethod<DeleteProjectsLocationsTargetsRequest, DeleteProjectsLocationsTargetsResponse, DeleteProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTargetsRequest,
  output: DeleteProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Gets details of a single Target. */
export interface GetProjectsLocationsTargetsRequest {
  /** Required. Name of the `Target`. Format must be `projects/{project_id}/locations/{location_name}/targets/{target_name}`. */
  name: string;
}

export const GetProjectsLocationsTargetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/targets/{targetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTargetsRequest>;

export type GetProjectsLocationsTargetsResponse = Target;
export const GetProjectsLocationsTargetsResponse = Target;

export type GetProjectsLocationsTargetsError = CommonErrors;

export const getProjectsLocationsTargets: API.OperationMethod<GetProjectsLocationsTargetsRequest, GetProjectsLocationsTargetsResponse, GetProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTargetsRequest,
  output: GetProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsTargetsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsTargetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/targets/{targetsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsTargetsRequest>;

export type TestIamPermissionsProjectsLocationsTargetsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsTargetsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsTargetsError = CommonErrors;

export const testIamPermissionsProjectsLocationsTargets: API.OperationMethod<TestIamPermissionsProjectsLocationsTargetsRequest, TestIamPermissionsProjectsLocationsTargetsResponse, TestIamPermissionsProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsTargetsRequest,
  output: TestIamPermissionsProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Updates the parameters of a single Target. */
export interface PatchProjectsLocationsTargetsRequest {
  /** Required. Field mask is used to specify the fields to be overwritten by the update in the `Target` resource. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it's in the mask. If the user doesn't provide a mask then all fields are overwritten. */
  updateMask?: string;
  /** Identifier. Name of the `Target`. Format is `projects/{project}/locations/{location}/targets/{target}`. The `target` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Optional. If set to true, updating a `Target` that does not exist will result in the creation of a new `Target`. */
  allowMissing?: boolean;
  /** Request body */
  body?: Target;
}

export const PatchProjectsLocationsTargetsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(Target).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/targets/{targetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsTargetsRequest>;

export type PatchProjectsLocationsTargetsResponse = Operation;
export const PatchProjectsLocationsTargetsResponse = Operation;

export type PatchProjectsLocationsTargetsError = CommonErrors;

export const patchProjectsLocationsTargets: API.OperationMethod<PatchProjectsLocationsTargetsRequest, PatchProjectsLocationsTargetsResponse, PatchProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsTargetsRequest,
  output: PatchProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsTargetsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsTargetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/targets/{targetsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsTargetsRequest>;

export type SetIamPolicyProjectsLocationsTargetsResponse = Policy;
export const SetIamPolicyProjectsLocationsTargetsResponse = Policy;

export type SetIamPolicyProjectsLocationsTargetsError = CommonErrors;

export const setIamPolicyProjectsLocationsTargets: API.OperationMethod<SetIamPolicyProjectsLocationsTargetsRequest, SetIamPolicyProjectsLocationsTargetsResponse, SetIamPolicyProjectsLocationsTargetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsTargetsRequest,
  output: SetIamPolicyProjectsLocationsTargetsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
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

