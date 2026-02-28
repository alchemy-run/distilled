// ==========================================================================
// Infrastructure Manager API (config v1)
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
  name: "config",
  version: "v1",
  rootUrl: "https://config.googleapis.com/",
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

export interface GitSource {
  /** Optional. Repository URL. Example: 'https://github.com/kubernetes/examples.git' */
  repo?: string;
  /** Optional. Subdirectory inside the repository. Example: 'staging/my-package' */
  directory?: string;
  /** Optional. Git reference (e.g. branch or tag). */
  ref?: string;
}

export const GitSource: Schema.Schema<GitSource> = Schema.suspend(() => Schema.Struct({
  repo: Schema.optional(Schema.String),
  directory: Schema.optional(Schema.String),
  ref: Schema.optional(Schema.String),
})).annotate({ identifier: "GitSource" }) as any as Schema.Schema<GitSource>;

export interface TerraformVariable {
  /** Optional. Input variable value. */
  inputValue?: unknown;
}

export const TerraformVariable: Schema.Schema<TerraformVariable> = Schema.suspend(() => Schema.Struct({
  inputValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "TerraformVariable" }) as any as Schema.Schema<TerraformVariable>;

export interface TerraformBlueprint {
  /** URI of an object in Google Cloud Storage. Format: `gs://{bucket}/{object}` URI may also specify an object version for zipped objects. Format: `gs://{bucket}/{object}#{version}` */
  gcsSource?: string;
  /** URI of a public Git repo. */
  gitSource?: GitSource;
  /** Optional. Input variable values for the Terraform blueprint. */
  inputValues?: Record<string, TerraformVariable>;
}

export const TerraformBlueprint: Schema.Schema<TerraformBlueprint> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(Schema.String),
  gitSource: Schema.optional(GitSource),
  inputValues: Schema.optional(Schema.Record(Schema.String, TerraformVariable)),
})).annotate({ identifier: "TerraformBlueprint" }) as any as Schema.Schema<TerraformBlueprint>;

export interface TerraformOutput {
  /** Identifies whether Terraform has set this output as a potential sensitive value. */
  sensitive?: boolean;
  /** Value of output. */
  value?: unknown;
}

export const TerraformOutput: Schema.Schema<TerraformOutput> = Schema.suspend(() => Schema.Struct({
  sensitive: Schema.optional(Schema.Boolean),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "TerraformOutput" }) as any as Schema.Schema<TerraformOutput>;

export interface ApplyResults {
  /** Location of a blueprint copy and other manifests in Google Cloud Storage. Format: `gs://{bucket}/{object}` */
  content?: string;
  /** Location of artifacts (e.g. logs) in Google Cloud Storage. Format: `gs://{bucket}/{object}` */
  artifacts?: string;
  /** Map of output name to output info. */
  outputs?: Record<string, TerraformOutput>;
}

export const ApplyResults: Schema.Schema<ApplyResults> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  artifacts: Schema.optional(Schema.String),
  outputs: Schema.optional(Schema.Record(Schema.String, TerraformOutput)),
})).annotate({ identifier: "ApplyResults" }) as any as Schema.Schema<ApplyResults>;

export interface TerraformError {
  /** Address of the resource associated with the error, e.g. `google_compute_network.vpc_network`. */
  resourceAddress?: string;
  /** HTTP response code returned from Google Cloud Platform APIs when Terraform fails to provision the resource. If unset or 0, no HTTP response code was returned by Terraform. */
  httpResponseCode?: number;
  /** A human-readable error description. */
  errorDescription?: string;
  /** Output only. Original error response from underlying Google API, if available. */
  error?: Status;
}

export const TerraformError: Schema.Schema<TerraformError> = Schema.suspend(() => Schema.Struct({
  resourceAddress: Schema.optional(Schema.String),
  httpResponseCode: Schema.optional(Schema.Number),
  errorDescription: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "TerraformError" }) as any as Schema.Schema<TerraformError>;

export interface ProviderConfig {
  /** Optional. ProviderSource specifies the source type of the provider. */
  sourceType?: "PROVIDER_SOURCE_UNSPECIFIED" | "SERVICE_MAINTAINED" | (string & {});
}

export const ProviderConfig: Schema.Schema<ProviderConfig> = Schema.suspend(() => Schema.Struct({
  sourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "ProviderConfig" }) as any as Schema.Schema<ProviderConfig>;

export interface Deployment {
  /** A blueprint described using Terraform's HashiCorp Configuration Language as a root module. */
  terraformBlueprint?: TerraformBlueprint;
  /** Identifier. Resource name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}` */
  name?: string;
  /** Output only. Time when the deployment was created. */
  createTime?: string;
  /** Output only. Time when the deployment was last modified. */
  updateTime?: string;
  /** Optional. User-defined metadata for the deployment. */
  labels?: Record<string, string>;
  /** Output only. Current state of the deployment. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "FAILED" | "SUSPENDED" | "DELETED" | (string & {});
  /** Output only. Revision name that was most recently applied. Format: `projects/{project}/locations/{location}/deployments/{deployment}/ revisions/{revision}` */
  latestRevision?: string;
  /** Output only. Additional information regarding the current state. */
  stateDetail?: string;
  /** Output only. Error code describing errors that may have occurred. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "REVISION_FAILED" | "CLOUD_BUILD_PERMISSION_DENIED" | "DELETE_BUILD_API_FAILED" | "DELETE_BUILD_RUN_FAILED" | "BUCKET_CREATION_PERMISSION_DENIED" | "BUCKET_CREATION_FAILED" | "EXTERNAL_VALUE_SOURCE_IMPORT_FAILED" | (string & {});
  /** Output only. Location of artifacts from a DeleteDeployment operation. */
  deleteResults?: ApplyResults;
  /** Output only. Cloud Build instance UUID associated with deleting this deployment. */
  deleteBuild?: string;
  /** Output only. Location of Cloud Build logs in Google Cloud Storage, populated when deleting this deployment. Format: `gs://{bucket}/{object}`. */
  deleteLogs?: string;
  /** Output only. Errors encountered when deleting this deployment. Errors are truncated to 10 entries, see `delete_results` and `error_logs` for full details. */
  tfErrors?: Array<TerraformError>;
  /** Output only. Location of Terraform error logs in Google Cloud Storage. Format: `gs://{bucket}/{object}`. */
  errorLogs?: string;
  /** Optional. User-defined location of Cloud Build logs and artifacts in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty. Default bucket format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` - The field cannot be updated, including changing its presence */
  artifactsGcsBucket?: string;
  /** Required. User-specified Service Account (SA) credentials to be used when actuating resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` */
  serviceAccount?: string;
  /** By default, Infra Manager will return a failure when Terraform encounters a 409 code (resource conflict error) during actuation. If this flag is set to true, Infra Manager will instead attempt to automatically import the resource into the Terraform state (for supported resource types) and continue actuation. Not all resource types are supported, refer to documentation. */
  importExistingResources?: boolean;
  /** Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used. */
  workerPool?: string;
  /** Output only. Current lock state of the deployment. */
  lockState?: "LOCK_STATE_UNSPECIFIED" | "LOCKED" | "UNLOCKED" | "LOCKING" | "UNLOCKING" | "LOCK_FAILED" | "UNLOCK_FAILED" | (string & {});
  /** Optional. The user-specified Terraform version constraint. Example: "=1.3.10". */
  tfVersionConstraint?: string;
  /** Output only. The current Terraform version set on the deployment. It is in the format of "Major.Minor.Patch", for example, "1.3.10". */
  tfVersion?: string;
  /** Optional. Input to control quota checks for resources in terraform configuration files. There are limited resources on which quota validation applies. */
  quotaValidation?: "QUOTA_VALIDATION_UNSPECIFIED" | "ENABLED" | "ENFORCED" | (string & {});
  /** Optional. Arbitrary key-value metadata storage e.g. to help client tools identify deployments during automation. See https://google.aip.dev/148#annotations for details on format and size limitations. */
  annotations?: Record<string, string>;
  /** Optional. This field specifies the provider configurations. */
  providerConfig?: ProviderConfig;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() => Schema.Struct({
  terraformBlueprint: Schema.optional(TerraformBlueprint),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  latestRevision: Schema.optional(Schema.String),
  stateDetail: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  deleteResults: Schema.optional(ApplyResults),
  deleteBuild: Schema.optional(Schema.String),
  deleteLogs: Schema.optional(Schema.String),
  tfErrors: Schema.optional(Schema.Array(TerraformError)),
  errorLogs: Schema.optional(Schema.String),
  artifactsGcsBucket: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  importExistingResources: Schema.optional(Schema.Boolean),
  workerPool: Schema.optional(Schema.String),
  lockState: Schema.optional(Schema.String),
  tfVersionConstraint: Schema.optional(Schema.String),
  tfVersion: Schema.optional(Schema.String),
  quotaValidation: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  providerConfig: Schema.optional(ProviderConfig),
})).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface ListDeploymentsResponse {
  /** List of Deployments. */
  deployments?: Array<Deployment>;
  /** Token to be supplied to the next ListDeployments request via `page_token` to obtain the next set of results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDeploymentsResponse: Schema.Schema<ListDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  deployments: Schema.optional(Schema.Array(Deployment)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDeploymentsResponse" }) as any as Schema.Schema<ListDeploymentsResponse>;

export interface Revision {
  /** Output only. A blueprint described using Terraform's HashiCorp Configuration Language as a root module. */
  terraformBlueprint?: TerraformBlueprint;
  /** Revision name. Format: `projects/{project}/locations/{location}/deployments/{deployment}/ revisions/{revision}` */
  name?: string;
  /** Output only. Time when the revision was created. */
  createTime?: string;
  /** Output only. Time when the revision was last modified. */
  updateTime?: string;
  /** Output only. The action which created this revision */
  action?: "ACTION_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** Output only. Current state of the revision. */
  state?: "STATE_UNSPECIFIED" | "APPLYING" | "APPLIED" | "FAILED" | (string & {});
  /** Output only. Outputs and artifacts from applying a deployment. */
  applyResults?: ApplyResults;
  /** Output only. Additional info regarding the current state. */
  stateDetail?: string;
  /** Output only. Code describing any errors that may have occurred. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "CLOUD_BUILD_PERMISSION_DENIED" | "APPLY_BUILD_API_FAILED" | "APPLY_BUILD_RUN_FAILED" | "QUOTA_VALIDATION_FAILED" | "EXTERNAL_VALUE_SOURCE_IMPORT_FAILED" | (string & {});
  /** Output only. Cloud Build instance UUID associated with this revision. */
  build?: string;
  /** Output only. Location of Revision operation logs in `gs://{bucket}/{object}` format. */
  logs?: string;
  /** Output only. Errors encountered when creating or updating this deployment. Errors are truncated to 10 entries, see `delete_results` and `error_logs` for full details. */
  tfErrors?: Array<TerraformError>;
  /** Output only. Location of Terraform error logs in Google Cloud Storage. Format: `gs://{bucket}/{object}`. */
  errorLogs?: string;
  /** Output only. User-specified Service Account (SA) to be used as credential to manage resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` */
  serviceAccount?: string;
  /** Output only. By default, Infra Manager will return a failure when Terraform encounters a 409 code (resource conflict error) during actuation. If this flag is set to true, Infra Manager will instead attempt to automatically import the resource into the Terraform state (for supported resource types) and continue actuation. Not all resource types are supported, refer to documentation. */
  importExistingResources?: boolean;
  /** Output only. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used. */
  workerPool?: string;
  /** Output only. The user-specified Terraform version constraint. Example: "=1.3.10". */
  tfVersionConstraint?: string;
  /** Output only. The version of Terraform used to create the Revision. It is in the format of "Major.Minor.Patch", for example, "1.3.10". */
  tfVersion?: string;
  /** Output only. Cloud Storage path containing quota validation results. This field is set when a user sets Deployment.quota_validation field to ENABLED or ENFORCED. Format: `gs://{bucket}/{object}`. */
  quotaValidationResults?: string;
  /** Optional. Input to control quota checks for resources in terraform configuration files. There are limited resources on which quota validation applies. */
  quotaValidation?: "QUOTA_VALIDATION_UNSPECIFIED" | "ENABLED" | "ENFORCED" | (string & {});
  /** Output only. This field specifies the provider configurations. */
  providerConfig?: ProviderConfig;
}

export const Revision: Schema.Schema<Revision> = Schema.suspend(() => Schema.Struct({
  terraformBlueprint: Schema.optional(TerraformBlueprint),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  applyResults: Schema.optional(ApplyResults),
  stateDetail: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  build: Schema.optional(Schema.String),
  logs: Schema.optional(Schema.String),
  tfErrors: Schema.optional(Schema.Array(TerraformError)),
  errorLogs: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  importExistingResources: Schema.optional(Schema.Boolean),
  workerPool: Schema.optional(Schema.String),
  tfVersionConstraint: Schema.optional(Schema.String),
  tfVersion: Schema.optional(Schema.String),
  quotaValidationResults: Schema.optional(Schema.String),
  quotaValidation: Schema.optional(Schema.String),
  providerConfig: Schema.optional(ProviderConfig),
})).annotate({ identifier: "Revision" }) as any as Schema.Schema<Revision>;

export interface ListRevisionsResponse {
  /** List of Revisions. */
  revisions?: Array<Revision>;
  /** A token to request the next page of resources from the 'ListRevisions' method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRevisionsResponse: Schema.Schema<ListRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  revisions: Schema.optional(Schema.Array(Revision)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRevisionsResponse" }) as any as Schema.Schema<ListRevisionsResponse>;

export interface ResourceTerraformInfo {
  /** TF resource address that uniquely identifies this resource within this deployment. */
  address?: string;
  /** TF resource type */
  type?: string;
  /** ID attribute of the TF resource */
  id?: string;
}

export const ResourceTerraformInfo: Schema.Schema<ResourceTerraformInfo> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceTerraformInfo" }) as any as Schema.Schema<ResourceTerraformInfo>;

export interface ResourceCAIInfo {
  /** CAI resource name in the format following https://cloud.google.com/apis/design/resource_names#full_resource_name */
  fullResourceName?: string;
}

export const ResourceCAIInfo: Schema.Schema<ResourceCAIInfo> = Schema.suspend(() => Schema.Struct({
  fullResourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceCAIInfo" }) as any as Schema.Schema<ResourceCAIInfo>;

export interface Resource {
  /** Output only. Resource name. Format: `projects/{project}/locations/{location}/deployments/{deployment}/revisions/{revision}/resources/{resource}` */
  name?: string;
  /** Output only. Terraform-specific info if this resource was created using Terraform. */
  terraformInfo?: ResourceTerraformInfo;
  /** Output only. Map of Cloud Asset Inventory (CAI) type to CAI info (e.g. CAI ID). CAI type format follows https://cloud.google.com/asset-inventory/docs/supported-asset-types */
  caiAssets?: Record<string, ResourceCAIInfo>;
  /** Output only. Intent of the resource. */
  intent?: "INTENT_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "RECREATE" | "UNCHANGED" | (string & {});
  /** Output only. Current state of the resource. */
  state?: "STATE_UNSPECIFIED" | "PLANNED" | "IN_PROGRESS" | "RECONCILED" | "FAILED" | (string & {});
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  terraformInfo: Schema.optional(ResourceTerraformInfo),
  caiAssets: Schema.optional(Schema.Record(Schema.String, ResourceCAIInfo)),
  intent: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface ListResourcesResponse {
  /** List of Resources. */
  resources?: Array<Resource>;
  /** A token to request the next page of resources from the 'ListResources' method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListResourcesResponse: Schema.Schema<ListResourcesResponse> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Resource)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListResourcesResponse" }) as any as Schema.Schema<ListResourcesResponse>;

export interface ExportDeploymentStatefileRequest {
  /** Optional. If this flag is set to true, the exported deployment state file will be the draft state. This will enable the draft file to be validated before copying it over to the working state on unlock. */
  draft?: boolean;
}

export const ExportDeploymentStatefileRequest: Schema.Schema<ExportDeploymentStatefileRequest> = Schema.suspend(() => Schema.Struct({
  draft: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ExportDeploymentStatefileRequest" }) as any as Schema.Schema<ExportDeploymentStatefileRequest>;

export interface Statefile {
  /** Output only. Cloud Storage signed URI used for downloading or uploading the state file. */
  signedUri?: string;
}

export const Statefile: Schema.Schema<Statefile> = Schema.suspend(() => Schema.Struct({
  signedUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Statefile" }) as any as Schema.Schema<Statefile>;

export interface ExportRevisionStatefileRequest {
}

export const ExportRevisionStatefileRequest: Schema.Schema<ExportRevisionStatefileRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportRevisionStatefileRequest" }) as any as Schema.Schema<ExportRevisionStatefileRequest>;

export interface ImportStatefileRequest {
  /** Required. Lock ID of the lock file to verify that the user who is importing the state file previously locked the Deployment. */
  lockId?: string;
}

export const ImportStatefileRequest: Schema.Schema<ImportStatefileRequest> = Schema.suspend(() => Schema.Struct({
  lockId: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportStatefileRequest" }) as any as Schema.Schema<ImportStatefileRequest>;

export interface DeleteStatefileRequest {
  /** Required. Lock ID of the lock file to verify that the user who is deleting the state file previously locked the Deployment. */
  lockId?: string;
}

export const DeleteStatefileRequest: Schema.Schema<DeleteStatefileRequest> = Schema.suspend(() => Schema.Struct({
  lockId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteStatefileRequest" }) as any as Schema.Schema<DeleteStatefileRequest>;

export interface LockDeploymentRequest {
}

export const LockDeploymentRequest: Schema.Schema<LockDeploymentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LockDeploymentRequest" }) as any as Schema.Schema<LockDeploymentRequest>;

export interface UnlockDeploymentRequest {
  /** Required. Lock ID of the lock file to be unlocked. */
  lockId?: string;
}

export const UnlockDeploymentRequest: Schema.Schema<UnlockDeploymentRequest> = Schema.suspend(() => Schema.Struct({
  lockId: Schema.optional(Schema.String),
})).annotate({ identifier: "UnlockDeploymentRequest" }) as any as Schema.Schema<UnlockDeploymentRequest>;

export interface LockInfo {
  /** Unique ID for the lock to be overridden with generation ID in the backend. */
  lockId?: string;
  /** Terraform operation, provided by the caller. */
  operation?: string;
  /** Extra information to store with the lock, provided by the caller. */
  info?: string;
  /** user@hostname when available */
  who?: string;
  /** Terraform version */
  version?: string;
  /** Time that the lock was taken. */
  createTime?: string;
}

export const LockInfo: Schema.Schema<LockInfo> = Schema.suspend(() => Schema.Struct({
  lockId: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  info: Schema.optional(Schema.String),
  who: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "LockInfo" }) as any as Schema.Schema<LockInfo>;

export interface PreviewArtifacts {
  /** Output only. Location of a blueprint copy and other content in Google Cloud Storage. Format: `gs://{bucket}/{object}` */
  content?: string;
  /** Output only. Location of artifacts in Google Cloud Storage. Format: `gs://{bucket}/{object}` */
  artifacts?: string;
}

export const PreviewArtifacts: Schema.Schema<PreviewArtifacts> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  artifacts: Schema.optional(Schema.String),
})).annotate({ identifier: "PreviewArtifacts" }) as any as Schema.Schema<PreviewArtifacts>;

export interface Preview {
  /** The terraform blueprint to preview. */
  terraformBlueprint?: TerraformBlueprint;
  /** Identifier. Resource name of the preview. Resource name can be user provided or server generated ID if unspecified. Format: `projects/{project}/locations/{location}/previews/{preview}` */
  name?: string;
  /** Output only. Time the preview was created. */
  createTime?: string;
  /** Optional. User-defined labels for the preview. */
  labels?: Record<string, string>;
  /** Output only. Current state of the preview. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "SUCCEEDED" | "APPLYING" | "STALE" | "DELETING" | "FAILED" | "DELETED" | (string & {});
  /** Optional. Optional deployment reference. If specified, the preview will be performed using the provided deployment's current state and use any relevant fields from the deployment unless explicitly specified in the preview create request. */
  deployment?: string;
  /** Optional. Current mode of preview. */
  previewMode?: "PREVIEW_MODE_UNSPECIFIED" | "DEFAULT" | "DELETE" | (string & {});
  /** Required. User-specified Service Account (SA) credentials to be used when previewing resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` */
  serviceAccount?: string;
  /** Optional. User-defined location of Cloud Build logs, artifacts, and in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty Default Bucket Format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` If omitted and deployment resource ref provided has artifacts_gcs_bucket defined, that artifact bucket is used. */
  artifactsGcsBucket?: string;
  /** Optional. The user-specified Worker Pool resource in which the Cloud Build job will execute. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} If this field is unspecified, the default Cloud Build worker pool will be used. If omitted and deployment resource ref provided has worker_pool defined, that worker pool is used. */
  workerPool?: string;
  /** Output only. Code describing any errors that may have occurred. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "CLOUD_BUILD_PERMISSION_DENIED" | "BUCKET_CREATION_PERMISSION_DENIED" | "BUCKET_CREATION_FAILED" | "DEPLOYMENT_LOCK_ACQUIRE_FAILED" | "PREVIEW_BUILD_API_FAILED" | "PREVIEW_BUILD_RUN_FAILED" | "EXTERNAL_VALUE_SOURCE_IMPORT_FAILED" | (string & {});
  /** Output only. Additional information regarding the current state. */
  errorStatus?: Status;
  /** Output only. Cloud Build instance UUID associated with this preview. */
  build?: string;
  /** Output only. Summary of errors encountered during Terraform preview. It has a size limit of 10, i.e. only top 10 errors will be summarized here. */
  tfErrors?: Array<TerraformError>;
  /** Output only. Link to tf-error.ndjson file, which contains the full list of the errors encountered during a Terraform preview. Format: `gs://{bucket}/{object}`. */
  errorLogs?: string;
  /** Output only. Artifacts from preview. */
  previewArtifacts?: PreviewArtifacts;
  /** Output only. Location of preview logs in `gs://{bucket}/{object}` format. */
  logs?: string;
  /** Output only. The current Terraform version set on the preview. It is in the format of "Major.Minor.Patch", for example, "1.3.10". */
  tfVersion?: string;
  /** Optional. The user-specified Terraform version constraint. Example: "=1.3.10". */
  tfVersionConstraint?: string;
  /** Optional. Arbitrary key-value metadata storage e.g. to help client tools identify preview during automation. See https://google.aip.dev/148#annotations for details on format and size limitations. */
  annotations?: Record<string, string>;
  /** Optional. This field specifies the provider configurations. */
  providerConfig?: ProviderConfig;
}

export const Preview: Schema.Schema<Preview> = Schema.suspend(() => Schema.Struct({
  terraformBlueprint: Schema.optional(TerraformBlueprint),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  deployment: Schema.optional(Schema.String),
  previewMode: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  artifactsGcsBucket: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  errorStatus: Schema.optional(Status),
  build: Schema.optional(Schema.String),
  tfErrors: Schema.optional(Schema.Array(TerraformError)),
  errorLogs: Schema.optional(Schema.String),
  previewArtifacts: Schema.optional(PreviewArtifacts),
  logs: Schema.optional(Schema.String),
  tfVersion: Schema.optional(Schema.String),
  tfVersionConstraint: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  providerConfig: Schema.optional(ProviderConfig),
})).annotate({ identifier: "Preview" }) as any as Schema.Schema<Preview>;

export interface ListPreviewsResponse {
  /** List of Previews. */
  previews?: Array<Preview>;
  /** Token to be supplied to the next ListPreviews request via `page_token` to obtain the next set of results. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListPreviewsResponse: Schema.Schema<ListPreviewsResponse> = Schema.suspend(() => Schema.Struct({
  previews: Schema.optional(Schema.Array(Preview)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPreviewsResponse" }) as any as Schema.Schema<ListPreviewsResponse>;

export interface ExportPreviewResultRequest {
}

export const ExportPreviewResultRequest: Schema.Schema<ExportPreviewResultRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportPreviewResultRequest" }) as any as Schema.Schema<ExportPreviewResultRequest>;

export interface PreviewResult {
  /** Output only. Plan binary signed URL */
  binarySignedUri?: string;
  /** Output only. Plan JSON signed URL */
  jsonSignedUri?: string;
}

export const PreviewResult: Schema.Schema<PreviewResult> = Schema.suspend(() => Schema.Struct({
  binarySignedUri: Schema.optional(Schema.String),
  jsonSignedUri: Schema.optional(Schema.String),
})).annotate({ identifier: "PreviewResult" }) as any as Schema.Schema<PreviewResult>;

export interface ExportPreviewResultResponse {
  /** Output only. Signed URLs for accessing the plan files. */
  result?: PreviewResult;
}

export const ExportPreviewResultResponse: Schema.Schema<ExportPreviewResultResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(PreviewResult),
})).annotate({ identifier: "ExportPreviewResultResponse" }) as any as Schema.Schema<ExportPreviewResultResponse>;

export interface TerraformVersion {
  /** Identifier. The version name is in the format: 'projects/{project_id}/locations/{location}/terraformVersions/{terraform_version}'. */
  name?: string;
  /** Output only. The state of the version, ACTIVE, DEPRECATED or OBSOLETE. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DEPRECATED" | "OBSOLETE" | (string & {});
  /** Output only. When the version is supported. */
  supportTime?: string;
  /** Output only. When the version is deprecated. */
  deprecateTime?: string;
  /** Output only. When the version is obsolete. */
  obsoleteTime?: string;
}

export const TerraformVersion: Schema.Schema<TerraformVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  supportTime: Schema.optional(Schema.String),
  deprecateTime: Schema.optional(Schema.String),
  obsoleteTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TerraformVersion" }) as any as Schema.Schema<TerraformVersion>;

export interface ListTerraformVersionsResponse {
  /** List of TerraformVersions. */
  terraformVersions?: Array<TerraformVersion>;
  /** Token to be supplied to the next ListTerraformVersions request via `page_token` to obtain the next set of results. */
  nextPageToken?: string;
  /** Unreachable resources, if any. */
  unreachable?: Array<string>;
}

export const ListTerraformVersionsResponse: Schema.Schema<ListTerraformVersionsResponse> = Schema.suspend(() => Schema.Struct({
  terraformVersions: Schema.optional(Schema.Array(TerraformVersion)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListTerraformVersionsResponse" }) as any as Schema.Schema<ListTerraformVersionsResponse>;

export interface ResourceChangeTerraformInfo {
  /** Output only. TF resource address that uniquely identifies the resource. */
  address?: string;
  /** Output only. TF resource type. */
  type?: string;
  /** Output only. TF resource name. */
  resourceName?: string;
  /** Output only. TF resource provider. */
  provider?: string;
  /** Output only. TF resource actions. */
  actions?: Array<string>;
}

export const ResourceChangeTerraformInfo: Schema.Schema<ResourceChangeTerraformInfo> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResourceChangeTerraformInfo" }) as any as Schema.Schema<ResourceChangeTerraformInfo>;

export interface PropertyChange {
  /** Output only. The path of the property change. */
  path?: string;
  /** Output only. The paths of sensitive fields in `before`. Paths are relative to `path`. */
  beforeSensitivePaths?: Array<string>;
  /** Output only. Representations of the object value before the actions. */
  before?: unknown;
  /** Output only. The paths of sensitive fields in `after`. Paths are relative to `path`. */
  afterSensitivePaths?: Array<string>;
  /** Output only. Representations of the object value after the actions. */
  after?: unknown;
}

export const PropertyChange: Schema.Schema<PropertyChange> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  beforeSensitivePaths: Schema.optional(Schema.Array(Schema.String)),
  before: Schema.optional(Schema.Unknown),
  afterSensitivePaths: Schema.optional(Schema.Array(Schema.String)),
  after: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "PropertyChange" }) as any as Schema.Schema<PropertyChange>;

export interface ResourceChange {
  /** Identifier. The name of the resource change. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceChanges/{resource_change}'. */
  name?: string;
  /** Output only. Terraform info of the resource change. */
  terraformInfo?: ResourceChangeTerraformInfo;
  /** Output only. The intent of the resource change. */
  intent?: "INTENT_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "RECREATE" | "UNCHANGED" | (string & {});
  /** Output only. The property changes of the resource change. */
  propertyChanges?: Array<PropertyChange>;
}

export const ResourceChange: Schema.Schema<ResourceChange> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  terraformInfo: Schema.optional(ResourceChangeTerraformInfo),
  intent: Schema.optional(Schema.String),
  propertyChanges: Schema.optional(Schema.Array(PropertyChange)),
})).annotate({ identifier: "ResourceChange" }) as any as Schema.Schema<ResourceChange>;

export interface ListResourceChangesResponse {
  /** List of ResourceChanges. */
  resourceChanges?: Array<ResourceChange>;
  /** A token to request the next page of resources from the 'ListResourceChanges' method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** Unreachable resources, if any. */
  unreachable?: Array<string>;
}

export const ListResourceChangesResponse: Schema.Schema<ListResourceChangesResponse> = Schema.suspend(() => Schema.Struct({
  resourceChanges: Schema.optional(Schema.Array(ResourceChange)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListResourceChangesResponse" }) as any as Schema.Schema<ListResourceChangesResponse>;

export interface ResourceDriftTerraformInfo {
  /** Output only. The address of the drifted resource. */
  address?: string;
  /** Output only. The type of the drifted resource. */
  type?: string;
  /** Output only. TF resource name. */
  resourceName?: string;
  /** Output only. The provider of the drifted resource. */
  provider?: string;
}

export const ResourceDriftTerraformInfo: Schema.Schema<ResourceDriftTerraformInfo> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceDriftTerraformInfo" }) as any as Schema.Schema<ResourceDriftTerraformInfo>;

export interface PropertyDrift {
  /** Output only. The path of the property drift. */
  path?: string;
  /** Output only. The paths of sensitive fields in `before`. Paths are relative to `path`. */
  beforeSensitivePaths?: Array<string>;
  /** Output only. Representations of the object value before the actions. */
  before?: unknown;
  /** Output only. The paths of sensitive fields in `after`. Paths are relative to `path`. */
  afterSensitivePaths?: Array<string>;
  /** Output only. Representations of the object value after the actions. */
  after?: unknown;
}

export const PropertyDrift: Schema.Schema<PropertyDrift> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  beforeSensitivePaths: Schema.optional(Schema.Array(Schema.String)),
  before: Schema.optional(Schema.Unknown),
  afterSensitivePaths: Schema.optional(Schema.Array(Schema.String)),
  after: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "PropertyDrift" }) as any as Schema.Schema<PropertyDrift>;

export interface ResourceDrift {
  /** Identifier. The name of the resource drift. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceDrifts/{resource_drift}'. */
  name?: string;
  /** Output only. Terraform info of the resource drift. */
  terraformInfo?: ResourceDriftTerraformInfo;
  /** Output only. The property drifts of the resource drift. */
  propertyDrifts?: Array<PropertyDrift>;
}

export const ResourceDrift: Schema.Schema<ResourceDrift> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  terraformInfo: Schema.optional(ResourceDriftTerraformInfo),
  propertyDrifts: Schema.optional(Schema.Array(PropertyDrift)),
})).annotate({ identifier: "ResourceDrift" }) as any as Schema.Schema<ResourceDrift>;

export interface ListResourceDriftsResponse {
  /** List of ResourceDrifts. */
  resourceDrifts?: Array<ResourceDrift>;
  /** A token to request the next page of resources from the 'ListResourceDrifts' method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** Unreachable resources, if any. */
  unreachable?: Array<string>;
}

export const ListResourceDriftsResponse: Schema.Schema<ListResourceDriftsResponse> = Schema.suspend(() => Schema.Struct({
  resourceDrifts: Schema.optional(Schema.Array(ResourceDrift)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListResourceDriftsResponse" }) as any as Schema.Schema<ListResourceDriftsResponse>;

export interface AutoMigrationConfig {
  /** Identifier. The name of the AutoMigrationConfig. Format: 'projects/{project_id}/locations/{location}/AutoMigrationConfig'. */
  name?: string;
  /** Output only. Time the AutoMigrationConfig was last updated. */
  updateTime?: string;
  /** Optional. Whether the auto migration is enabled for the project. */
  autoMigrationEnabled?: boolean;
}

export const AutoMigrationConfig: Schema.Schema<AutoMigrationConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  autoMigrationEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AutoMigrationConfig" }) as any as Schema.Schema<AutoMigrationConfig>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

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
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
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

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface DeploymentOperationMetadata {
  /** The current step the deployment operation is running. */
  step?: "DEPLOYMENT_STEP_UNSPECIFIED" | "PREPARING_STORAGE_BUCKET" | "DOWNLOADING_BLUEPRINT" | "RUNNING_TF_INIT" | "RUNNING_TF_PLAN" | "RUNNING_TF_APPLY" | "RUNNING_TF_DESTROY" | "RUNNING_TF_VALIDATE" | "UNLOCKING_DEPLOYMENT" | "SUCCEEDED" | "FAILED" | "VALIDATING_REPOSITORY" | "RUNNING_QUOTA_VALIDATION" | (string & {});
  /** Outputs and artifacts from applying a deployment. */
  applyResults?: ApplyResults;
  /** Output only. Cloud Build instance UUID associated with this operation. */
  build?: string;
  /** Output only. Location of Deployment operations logs in `gs://{bucket}/{object}` format. */
  logs?: string;
}

export const DeploymentOperationMetadata: Schema.Schema<DeploymentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  applyResults: Schema.optional(ApplyResults),
  build: Schema.optional(Schema.String),
  logs: Schema.optional(Schema.String),
})).annotate({ identifier: "DeploymentOperationMetadata" }) as any as Schema.Schema<DeploymentOperationMetadata>;

export interface PreviewOperationMetadata {
  /** The current step the preview operation is running. */
  step?: "PREVIEW_STEP_UNSPECIFIED" | "PREPARING_STORAGE_BUCKET" | "DOWNLOADING_BLUEPRINT" | "RUNNING_TF_INIT" | "RUNNING_TF_PLAN" | "FETCHING_DEPLOYMENT" | "LOCKING_DEPLOYMENT" | "UNLOCKING_DEPLOYMENT" | "SUCCEEDED" | "FAILED" | "VALIDATING_REPOSITORY" | (string & {});
  /** Artifacts from preview. */
  previewArtifacts?: PreviewArtifacts;
  /** Output only. Location of preview logs in `gs://{bucket}/{object}` format. */
  logs?: string;
  /** Output only. Cloud Build instance UUID associated with this preview. */
  build?: string;
}

export const PreviewOperationMetadata: Schema.Schema<PreviewOperationMetadata> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  previewArtifacts: Schema.optional(PreviewArtifacts),
  logs: Schema.optional(Schema.String),
  build: Schema.optional(Schema.String),
})).annotate({ identifier: "PreviewOperationMetadata" }) as any as Schema.Schema<PreviewOperationMetadata>;

export interface OperationMetadata {
  /** Output only. Metadata about the deployment operation state. */
  deploymentMetadata?: DeploymentOperationMetadata;
  /** Output only. Metadata about the preview operation state. */
  previewMetadata?: PreviewOperationMetadata;
  /** Output only. Time when the operation was created. */
  createTime?: string;
  /** Output only. Time when the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  deploymentMetadata: Schema.optional(DeploymentOperationMetadata),
  previewMetadata: Schema.optional(PreviewOperationMetadata),
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

/** Get the AutoMigrationConfig for a given project and location. */
export interface GetAutoMigrationConfigProjectsLocationsRequest {
  /** Required. The name of the AutoMigrationConfig. Format: 'projects/{project_id}/locations/{location}/AutoMigrationConfig'. */
  name: string;
}

export const GetAutoMigrationConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/autoMigrationConfig" }),
  svc,
) as unknown as Schema.Schema<GetAutoMigrationConfigProjectsLocationsRequest>;

export type GetAutoMigrationConfigProjectsLocationsResponse = AutoMigrationConfig;
export const GetAutoMigrationConfigProjectsLocationsResponse = AutoMigrationConfig;

export type GetAutoMigrationConfigProjectsLocationsError = CommonErrors;

export const getAutoMigrationConfigProjectsLocations: API.OperationMethod<GetAutoMigrationConfigProjectsLocationsRequest, GetAutoMigrationConfigProjectsLocationsResponse, GetAutoMigrationConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAutoMigrationConfigProjectsLocationsRequest,
  output: GetAutoMigrationConfigProjectsLocationsResponse,
  errors: [],
}));

/** Updates the AutoMigrationConfig for a given project and location. */
export interface UpdateAutoMigrationConfigProjectsLocationsRequest {
  /** Identifier. The name of the AutoMigrationConfig. Format: 'projects/{project_id}/locations/{location}/AutoMigrationConfig'. */
  name: string;
  /** Optional. The update mask applies to the resource. See google.protobuf.FieldMask. */
  updateMask?: string;
  /** Request body */
  body?: AutoMigrationConfig;
}

export const UpdateAutoMigrationConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AutoMigrationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/autoMigrationConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAutoMigrationConfigProjectsLocationsRequest>;

export type UpdateAutoMigrationConfigProjectsLocationsResponse = Operation;
export const UpdateAutoMigrationConfigProjectsLocationsResponse = Operation;

export type UpdateAutoMigrationConfigProjectsLocationsError = CommonErrors;

export const updateAutoMigrationConfigProjectsLocations: API.OperationMethod<UpdateAutoMigrationConfigProjectsLocationsRequest, UpdateAutoMigrationConfigProjectsLocationsResponse, UpdateAutoMigrationConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAutoMigrationConfigProjectsLocationsRequest,
  output: UpdateAutoMigrationConfigProjectsLocationsResponse,
  errors: [],
}));

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

/** Lists Deployments in a given project and location. */
export interface ListProjectsLocationsDeploymentsRequest {
  /** Required. The parent in whose context the Deployments are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}'. */
  parent: string;
  /** When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Token returned by previous call to 'ListDeployments' which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Lists the Deployments that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/bar - Filter by labels: - Resources that have a key called 'foo' labels.foo:* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - Deployments in CREATING state. state=CREATING */
  filter?: string;
  /** Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeploymentsRequest>;

export type ListProjectsLocationsDeploymentsResponse = ListDeploymentsResponse;
export const ListProjectsLocationsDeploymentsResponse = ListDeploymentsResponse;

export type ListProjectsLocationsDeploymentsError = CommonErrors;

export const listProjectsLocationsDeployments = API.makePaginated(() => ({
  input: ListProjectsLocationsDeploymentsRequest,
  output: ListProjectsLocationsDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about a Deployment. */
export interface GetProjectsLocationsDeploymentsRequest {
  /** Required. The name of the deployment. Format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  name: string;
}

export const GetProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeploymentsRequest>;

export type GetProjectsLocationsDeploymentsResponse = Deployment;
export const GetProjectsLocationsDeploymentsResponse = Deployment;

export type GetProjectsLocationsDeploymentsError = CommonErrors;

export const getProjectsLocationsDeployments: API.OperationMethod<GetProjectsLocationsDeploymentsRequest, GetProjectsLocationsDeploymentsResponse, GetProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeploymentsRequest,
  output: GetProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Creates a Deployment. */
export interface CreateProjectsLocationsDeploymentsRequest {
  /** Required. The parent in whose context the Deployment is created. The parent value is in the format: 'projects/{project_id}/locations/{location}'. */
  parent: string;
  /** Required. The Deployment ID. */
  deploymentId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Deployment;
}

export const CreateProjectsLocationsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  deploymentId: Schema.optional(Schema.String).pipe(T.HttpQuery("deploymentId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDeploymentsRequest>;

export type CreateProjectsLocationsDeploymentsResponse = Operation;
export const CreateProjectsLocationsDeploymentsResponse = Operation;

export type CreateProjectsLocationsDeploymentsError = CommonErrors;

export const createProjectsLocationsDeployments: API.OperationMethod<CreateProjectsLocationsDeploymentsRequest, CreateProjectsLocationsDeploymentsResponse, CreateProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDeploymentsRequest,
  output: CreateProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Updates a Deployment. */
export interface PatchProjectsLocationsDeploymentsRequest {
  /** Identifier. Resource name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}` */
  name: string;
  /** Optional. Field mask used to specify the fields to be overwritten in the Deployment resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Deployment;
}

export const PatchProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDeploymentsRequest>;

export type PatchProjectsLocationsDeploymentsResponse = Operation;
export const PatchProjectsLocationsDeploymentsResponse = Operation;

export type PatchProjectsLocationsDeploymentsError = CommonErrors;

export const patchProjectsLocationsDeployments: API.OperationMethod<PatchProjectsLocationsDeploymentsRequest, PatchProjectsLocationsDeploymentsResponse, PatchProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDeploymentsRequest,
  output: PatchProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Deletes a Deployment. */
export interface DeleteProjectsLocationsDeploymentsRequest {
  /** Required. The name of the Deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, any revisions for this deployment will also be deleted. (Otherwise, the request will only work if the deployment has no revisions.) */
  force?: boolean;
  /** Optional. Policy on how resources actuated by the deployment should be deleted. If unspecified, the default behavior is to delete the underlying resources. */
  deletePolicy?: "DELETE_POLICY_UNSPECIFIED" | "DELETE" | "ABANDON" | (string & {});
}

export const DeleteProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  deletePolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("deletePolicy")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDeploymentsRequest>;

export type DeleteProjectsLocationsDeploymentsResponse = Operation;
export const DeleteProjectsLocationsDeploymentsResponse = Operation;

export type DeleteProjectsLocationsDeploymentsError = CommonErrors;

export const deleteProjectsLocationsDeployments: API.OperationMethod<DeleteProjectsLocationsDeploymentsRequest, DeleteProjectsLocationsDeploymentsResponse, DeleteProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDeploymentsRequest,
  output: DeleteProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Exports Terraform state file from a given deployment. */
export interface ExportStateProjectsLocationsDeploymentsRequest {
  /** Required. The parent in whose context the statefile is listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  parent: string;
  /** Request body */
  body?: ExportDeploymentStatefileRequest;
}

export const ExportStateProjectsLocationsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExportDeploymentStatefileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:exportState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportStateProjectsLocationsDeploymentsRequest>;

export type ExportStateProjectsLocationsDeploymentsResponse = Statefile;
export const ExportStateProjectsLocationsDeploymentsResponse = Statefile;

export type ExportStateProjectsLocationsDeploymentsError = CommonErrors;

export const exportStateProjectsLocationsDeployments: API.OperationMethod<ExportStateProjectsLocationsDeploymentsRequest, ExportStateProjectsLocationsDeploymentsResponse, ExportStateProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportStateProjectsLocationsDeploymentsRequest,
  output: ExportStateProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Imports Terraform state file in a given deployment. The state file does not take effect until the Deployment has been unlocked. */
export interface ImportStateProjectsLocationsDeploymentsRequest {
  /** Required. The parent in whose context the statefile is listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  parent: string;
  /** Request body */
  body?: ImportStatefileRequest;
}

export const ImportStateProjectsLocationsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportStatefileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:importState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportStateProjectsLocationsDeploymentsRequest>;

export type ImportStateProjectsLocationsDeploymentsResponse = Statefile;
export const ImportStateProjectsLocationsDeploymentsResponse = Statefile;

export type ImportStateProjectsLocationsDeploymentsError = CommonErrors;

export const importStateProjectsLocationsDeployments: API.OperationMethod<ImportStateProjectsLocationsDeploymentsRequest, ImportStateProjectsLocationsDeploymentsResponse, ImportStateProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportStateProjectsLocationsDeploymentsRequest,
  output: ImportStateProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Deletes Terraform state file in a given deployment. */
export interface DeleteStateProjectsLocationsDeploymentsRequest {
  /** Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  name: string;
  /** Request body */
  body?: DeleteStatefileRequest;
}

export const DeleteStateProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeleteStatefileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:deleteState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteStateProjectsLocationsDeploymentsRequest>;

export type DeleteStateProjectsLocationsDeploymentsResponse = Empty;
export const DeleteStateProjectsLocationsDeploymentsResponse = Empty;

export type DeleteStateProjectsLocationsDeploymentsError = CommonErrors;

export const deleteStateProjectsLocationsDeployments: API.OperationMethod<DeleteStateProjectsLocationsDeploymentsRequest, DeleteStateProjectsLocationsDeploymentsResponse, DeleteStateProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteStateProjectsLocationsDeploymentsRequest,
  output: DeleteStateProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Locks a deployment. */
export interface LockProjectsLocationsDeploymentsRequest {
  /** Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  name: string;
  /** Request body */
  body?: LockDeploymentRequest;
}

export const LockProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(LockDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:lock", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LockProjectsLocationsDeploymentsRequest>;

export type LockProjectsLocationsDeploymentsResponse = Operation;
export const LockProjectsLocationsDeploymentsResponse = Operation;

export type LockProjectsLocationsDeploymentsError = CommonErrors;

export const lockProjectsLocationsDeployments: API.OperationMethod<LockProjectsLocationsDeploymentsRequest, LockProjectsLocationsDeploymentsResponse, LockProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LockProjectsLocationsDeploymentsRequest,
  output: LockProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Unlocks a locked deployment. */
export interface UnlockProjectsLocationsDeploymentsRequest {
  /** Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  name: string;
  /** Request body */
  body?: UnlockDeploymentRequest;
}

export const UnlockProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnlockDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:unlock", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnlockProjectsLocationsDeploymentsRequest>;

export type UnlockProjectsLocationsDeploymentsResponse = Operation;
export const UnlockProjectsLocationsDeploymentsResponse = Operation;

export type UnlockProjectsLocationsDeploymentsError = CommonErrors;

export const unlockProjectsLocationsDeployments: API.OperationMethod<UnlockProjectsLocationsDeploymentsRequest, UnlockProjectsLocationsDeploymentsResponse, UnlockProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnlockProjectsLocationsDeploymentsRequest,
  output: UnlockProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Exports the lock info on a locked deployment. */
export interface ExportLockProjectsLocationsDeploymentsRequest {
  /** Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  name: string;
}

export const ExportLockProjectsLocationsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:exportLock" }),
  svc,
) as unknown as Schema.Schema<ExportLockProjectsLocationsDeploymentsRequest>;

export type ExportLockProjectsLocationsDeploymentsResponse = LockInfo;
export const ExportLockProjectsLocationsDeploymentsResponse = LockInfo;

export type ExportLockProjectsLocationsDeploymentsError = CommonErrors;

export const exportLockProjectsLocationsDeployments: API.OperationMethod<ExportLockProjectsLocationsDeploymentsRequest, ExportLockProjectsLocationsDeploymentsResponse, ExportLockProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportLockProjectsLocationsDeploymentsRequest,
  output: ExportLockProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDeploymentsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDeploymentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDeploymentsRequest>;

export type SetIamPolicyProjectsLocationsDeploymentsResponse = Policy;
export const SetIamPolicyProjectsLocationsDeploymentsResponse = Policy;

export type SetIamPolicyProjectsLocationsDeploymentsError = CommonErrors;

export const setIamPolicyProjectsLocationsDeployments: API.OperationMethod<SetIamPolicyProjectsLocationsDeploymentsRequest, SetIamPolicyProjectsLocationsDeploymentsResponse, SetIamPolicyProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDeploymentsRequest,
  output: SetIamPolicyProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDeploymentsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDeploymentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDeploymentsRequest>;

export type GetIamPolicyProjectsLocationsDeploymentsResponse = Policy;
export const GetIamPolicyProjectsLocationsDeploymentsResponse = Policy;

export type GetIamPolicyProjectsLocationsDeploymentsError = CommonErrors;

export const getIamPolicyProjectsLocationsDeployments: API.OperationMethod<GetIamPolicyProjectsLocationsDeploymentsRequest, GetIamPolicyProjectsLocationsDeploymentsResponse, GetIamPolicyProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDeploymentsRequest,
  output: GetIamPolicyProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDeploymentsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDeploymentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDeploymentsRequest>;

export type TestIamPermissionsProjectsLocationsDeploymentsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDeploymentsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDeploymentsError = CommonErrors;

export const testIamPermissionsProjectsLocationsDeployments: API.OperationMethod<TestIamPermissionsProjectsLocationsDeploymentsRequest, TestIamPermissionsProjectsLocationsDeploymentsResponse, TestIamPermissionsProjectsLocationsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDeploymentsRequest,
  output: TestIamPermissionsProjectsLocationsDeploymentsResponse,
  errors: [],
}));

/** Lists Revisions of a deployment. */
export interface ListProjectsLocationsDeploymentsRevisionsRequest {
  /** Required. The parent in whose context the Revisions are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. */
  parent: string;
  /** When requesting a page of resources, `page_size` specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Token returned by previous call to 'ListRevisions' which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Lists the Revisions that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/dep/revisions/bar - Filter by labels: - Resources that have a key called 'foo' labels.foo:* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - Revisions in CREATING state. state=CREATING */
  filter?: string;
  /** Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsDeploymentsRevisionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeploymentsRevisionsRequest>;

export type ListProjectsLocationsDeploymentsRevisionsResponse = ListRevisionsResponse;
export const ListProjectsLocationsDeploymentsRevisionsResponse = ListRevisionsResponse;

export type ListProjectsLocationsDeploymentsRevisionsError = CommonErrors;

export const listProjectsLocationsDeploymentsRevisions = API.makePaginated(() => ({
  input: ListProjectsLocationsDeploymentsRevisionsRequest,
  output: ListProjectsLocationsDeploymentsRevisionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about a Revision. */
export interface GetProjectsLocationsDeploymentsRevisionsRequest {
  /** Required. The name of the Revision in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}'. */
  name: string;
}

export const GetProjectsLocationsDeploymentsRevisionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/revisions/{revisionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeploymentsRevisionsRequest>;

export type GetProjectsLocationsDeploymentsRevisionsResponse = Revision;
export const GetProjectsLocationsDeploymentsRevisionsResponse = Revision;

export type GetProjectsLocationsDeploymentsRevisionsError = CommonErrors;

export const getProjectsLocationsDeploymentsRevisions: API.OperationMethod<GetProjectsLocationsDeploymentsRevisionsRequest, GetProjectsLocationsDeploymentsRevisionsResponse, GetProjectsLocationsDeploymentsRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeploymentsRevisionsRequest,
  output: GetProjectsLocationsDeploymentsRevisionsResponse,
  errors: [],
}));

/** Exports Terraform state file from a given revision. */
export interface ExportStateProjectsLocationsDeploymentsRevisionsRequest {
  /** Required. The parent in whose context the statefile is listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}'. */
  parent: string;
  /** Request body */
  body?: ExportRevisionStatefileRequest;
}

export const ExportStateProjectsLocationsDeploymentsRevisionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExportRevisionStatefileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/revisions/{revisionsId}:exportState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportStateProjectsLocationsDeploymentsRevisionsRequest>;

export type ExportStateProjectsLocationsDeploymentsRevisionsResponse = Statefile;
export const ExportStateProjectsLocationsDeploymentsRevisionsResponse = Statefile;

export type ExportStateProjectsLocationsDeploymentsRevisionsError = CommonErrors;

export const exportStateProjectsLocationsDeploymentsRevisions: API.OperationMethod<ExportStateProjectsLocationsDeploymentsRevisionsRequest, ExportStateProjectsLocationsDeploymentsRevisionsResponse, ExportStateProjectsLocationsDeploymentsRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportStateProjectsLocationsDeploymentsRevisionsRequest,
  output: ExportStateProjectsLocationsDeploymentsRevisionsResponse,
  errors: [],
}));

/** Gets details about a Resource deployed by Infra Manager. */
export interface GetProjectsLocationsDeploymentsRevisionsResourcesRequest {
  /** Required. The name of the Resource in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}/resource/{resource}'. */
  name: string;
}

export const GetProjectsLocationsDeploymentsRevisionsResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/revisions/{revisionsId}/resources/{resourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDeploymentsRevisionsResourcesRequest>;

export type GetProjectsLocationsDeploymentsRevisionsResourcesResponse = Resource;
export const GetProjectsLocationsDeploymentsRevisionsResourcesResponse = Resource;

export type GetProjectsLocationsDeploymentsRevisionsResourcesError = CommonErrors;

export const getProjectsLocationsDeploymentsRevisionsResources: API.OperationMethod<GetProjectsLocationsDeploymentsRevisionsResourcesRequest, GetProjectsLocationsDeploymentsRevisionsResourcesResponse, GetProjectsLocationsDeploymentsRevisionsResourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDeploymentsRevisionsResourcesRequest,
  output: GetProjectsLocationsDeploymentsRevisionsResourcesResponse,
  errors: [],
}));

/** Lists Resources in a given revision. */
export interface ListProjectsLocationsDeploymentsRevisionsResourcesRequest {
  /** Required. The parent in whose context the Resources are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}'. */
  parent: string;
  /** When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Token returned by previous call to 'ListResources' which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Lists the Resources that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/dep/revisions/bar/resources/baz */
  filter?: string;
  /** Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsDeploymentsRevisionsResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/deployments/{deploymentsId}/revisions/{revisionsId}/resources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDeploymentsRevisionsResourcesRequest>;

export type ListProjectsLocationsDeploymentsRevisionsResourcesResponse = ListResourcesResponse;
export const ListProjectsLocationsDeploymentsRevisionsResourcesResponse = ListResourcesResponse;

export type ListProjectsLocationsDeploymentsRevisionsResourcesError = CommonErrors;

export const listProjectsLocationsDeploymentsRevisionsResources = API.makePaginated(() => ({
  input: ListProjectsLocationsDeploymentsRevisionsResourcesRequest,
  output: ListProjectsLocationsDeploymentsRevisionsResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a Preview. */
export interface CreateProjectsLocationsPreviewsRequest {
  /** Required. The parent in whose context the Preview is created. The parent value is in the format: 'projects/{project_id}/locations/{location}'. */
  parent: string;
  /** Optional. The preview ID. */
  previewId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Preview;
}

export const CreateProjectsLocationsPreviewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  previewId: Schema.optional(Schema.String).pipe(T.HttpQuery("previewId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Preview).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/previews", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPreviewsRequest>;

export type CreateProjectsLocationsPreviewsResponse = Operation;
export const CreateProjectsLocationsPreviewsResponse = Operation;

export type CreateProjectsLocationsPreviewsError = CommonErrors;

export const createProjectsLocationsPreviews: API.OperationMethod<CreateProjectsLocationsPreviewsRequest, CreateProjectsLocationsPreviewsResponse, CreateProjectsLocationsPreviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPreviewsRequest,
  output: CreateProjectsLocationsPreviewsResponse,
  errors: [],
}));

/** Gets details about a Preview. */
export interface GetProjectsLocationsPreviewsRequest {
  /** Required. The name of the preview. Format: 'projects/{project_id}/locations/{location}/previews/{preview}'. */
  name: string;
}

export const GetProjectsLocationsPreviewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPreviewsRequest>;

export type GetProjectsLocationsPreviewsResponse = Preview;
export const GetProjectsLocationsPreviewsResponse = Preview;

export type GetProjectsLocationsPreviewsError = CommonErrors;

export const getProjectsLocationsPreviews: API.OperationMethod<GetProjectsLocationsPreviewsRequest, GetProjectsLocationsPreviewsResponse, GetProjectsLocationsPreviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPreviewsRequest,
  output: GetProjectsLocationsPreviewsResponse,
  errors: [],
}));

/** Lists Previews in a given project and location. */
export interface ListProjectsLocationsPreviewsRequest {
  /** Required. The parent in whose context the Previews are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}'. */
  parent: string;
  /** Optional. When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Optional. Token returned by previous call to 'ListDeployments' which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Optional. Lists the Deployments that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/bar - Filter by labels: - Resources that have a key called 'foo' labels.foo:* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - Deployments in CREATING state. state=CREATING */
  filter?: string;
  /** Optional. Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsPreviewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/previews" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPreviewsRequest>;

export type ListProjectsLocationsPreviewsResponse = ListPreviewsResponse;
export const ListProjectsLocationsPreviewsResponse = ListPreviewsResponse;

export type ListProjectsLocationsPreviewsError = CommonErrors;

export const listProjectsLocationsPreviews = API.makePaginated(() => ({
  input: ListProjectsLocationsPreviewsRequest,
  output: ListProjectsLocationsPreviewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a Preview. */
export interface DeleteProjectsLocationsPreviewsRequest {
  /** Required. The name of the Preview in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsPreviewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPreviewsRequest>;

export type DeleteProjectsLocationsPreviewsResponse = Operation;
export const DeleteProjectsLocationsPreviewsResponse = Operation;

export type DeleteProjectsLocationsPreviewsError = CommonErrors;

export const deleteProjectsLocationsPreviews: API.OperationMethod<DeleteProjectsLocationsPreviewsRequest, DeleteProjectsLocationsPreviewsResponse, DeleteProjectsLocationsPreviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPreviewsRequest,
  output: DeleteProjectsLocationsPreviewsResponse,
  errors: [],
}));

/** Export Preview results. */
export interface ExportProjectsLocationsPreviewsRequest {
  /** Required. The preview whose results should be exported. The preview value is in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. */
  parent: string;
  /** Request body */
  body?: ExportPreviewResultRequest;
}

export const ExportProjectsLocationsPreviewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExportPreviewResultRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsPreviewsRequest>;

export type ExportProjectsLocationsPreviewsResponse = ExportPreviewResultResponse;
export const ExportProjectsLocationsPreviewsResponse = ExportPreviewResultResponse;

export type ExportProjectsLocationsPreviewsError = CommonErrors;

export const exportProjectsLocationsPreviews: API.OperationMethod<ExportProjectsLocationsPreviewsRequest, ExportProjectsLocationsPreviewsResponse, ExportProjectsLocationsPreviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsPreviewsRequest,
  output: ExportProjectsLocationsPreviewsResponse,
  errors: [],
}));

/** Lists ResourceChanges for a given preview. */
export interface ListProjectsLocationsPreviewsResourceChangesRequest {
  /** Required. The parent in whose context the ResourceChanges are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. */
  parent: string;
  /** Optional. When requesting a page of resource changes, 'page_size' specifies number of resource changes to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Optional. Token returned by previous call to 'ListResourceChanges' which specifies the position in the list from where to continue listing the resource changes. */
  pageToken?: string;
  /** Optional. Lists the resource changes that match the filter expression. A filter expression filters the resource changes listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/previews/dep/resourceChanges/baz */
  filter?: string;
  /** Optional. Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsPreviewsResourceChangesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}/resourceChanges" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPreviewsResourceChangesRequest>;

export type ListProjectsLocationsPreviewsResourceChangesResponse = ListResourceChangesResponse;
export const ListProjectsLocationsPreviewsResourceChangesResponse = ListResourceChangesResponse;

export type ListProjectsLocationsPreviewsResourceChangesError = CommonErrors;

export const listProjectsLocationsPreviewsResourceChanges = API.makePaginated(() => ({
  input: ListProjectsLocationsPreviewsResourceChangesRequest,
  output: ListProjectsLocationsPreviewsResourceChangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a ResourceChange for a given preview. */
export interface GetProjectsLocationsPreviewsResourceChangesRequest {
  /** Required. The name of the resource change to retrieve. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceChanges/{resource_change}'. */
  name: string;
}

export const GetProjectsLocationsPreviewsResourceChangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}/resourceChanges/{resourceChangesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPreviewsResourceChangesRequest>;

export type GetProjectsLocationsPreviewsResourceChangesResponse = ResourceChange;
export const GetProjectsLocationsPreviewsResourceChangesResponse = ResourceChange;

export type GetProjectsLocationsPreviewsResourceChangesError = CommonErrors;

export const getProjectsLocationsPreviewsResourceChanges: API.OperationMethod<GetProjectsLocationsPreviewsResourceChangesRequest, GetProjectsLocationsPreviewsResourceChangesResponse, GetProjectsLocationsPreviewsResourceChangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPreviewsResourceChangesRequest,
  output: GetProjectsLocationsPreviewsResourceChangesResponse,
  errors: [],
}));

/** List ResourceDrifts for a given preview. */
export interface ListProjectsLocationsPreviewsResourceDriftsRequest {
  /** Required. The parent in whose context the ResourceDrifts are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. */
  parent: string;
  /** Optional. When requesting a page of resource drifts, 'page_size' specifies number of resource drifts to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Optional. Token returned by previous call to 'ListResourceDrifts' which specifies the position in the list from where to continue listing the resource drifts. */
  pageToken?: string;
  /** Optional. Lists the resource drifts that match the filter expression. A filter expression filters the resource drifts listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/previews/dep/resourceDrifts/baz */
  filter?: string;
  /** Optional. Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsPreviewsResourceDriftsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}/resourceDrifts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPreviewsResourceDriftsRequest>;

export type ListProjectsLocationsPreviewsResourceDriftsResponse = ListResourceDriftsResponse;
export const ListProjectsLocationsPreviewsResourceDriftsResponse = ListResourceDriftsResponse;

export type ListProjectsLocationsPreviewsResourceDriftsError = CommonErrors;

export const listProjectsLocationsPreviewsResourceDrifts = API.makePaginated(() => ({
  input: ListProjectsLocationsPreviewsResourceDriftsRequest,
  output: ListProjectsLocationsPreviewsResourceDriftsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a ResourceDrift for a given preview. */
export interface GetProjectsLocationsPreviewsResourceDriftsRequest {
  /** Required. The name of the resource drift to retrieve. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceDrifts/{resource_drift}'. */
  name: string;
}

export const GetProjectsLocationsPreviewsResourceDriftsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/previews/{previewsId}/resourceDrifts/{resourceDriftsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPreviewsResourceDriftsRequest>;

export type GetProjectsLocationsPreviewsResourceDriftsResponse = ResourceDrift;
export const GetProjectsLocationsPreviewsResourceDriftsResponse = ResourceDrift;

export type GetProjectsLocationsPreviewsResourceDriftsError = CommonErrors;

export const getProjectsLocationsPreviewsResourceDrifts: API.OperationMethod<GetProjectsLocationsPreviewsResourceDriftsRequest, GetProjectsLocationsPreviewsResourceDriftsResponse, GetProjectsLocationsPreviewsResourceDriftsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPreviewsResourceDriftsRequest,
  output: GetProjectsLocationsPreviewsResourceDriftsResponse,
  errors: [],
}));

/** Lists TerraformVersions in a given project and location. */
export interface ListProjectsLocationsTerraformVersionsRequest {
  /** Required. The parent in whose context the TerraformVersions are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}'. */
  parent: string;
  /** Optional. When requesting a page of terraform versions, 'page_size' specifies number of terraform versions to return. If unspecified, at most 500 will be returned. The maximum value is 1000. */
  pageSize?: number;
  /** Optional. Token returned by previous call to 'ListTerraformVersions' which specifies the position in the list from where to continue listing the terraform versions. */
  pageToken?: string;
  /** Optional. Lists the TerraformVersions that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. */
  filter?: string;
  /** Optional. Field to use to sort the list. */
  orderBy?: string;
}

export const ListProjectsLocationsTerraformVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/terraformVersions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTerraformVersionsRequest>;

export type ListProjectsLocationsTerraformVersionsResponse = ListTerraformVersionsResponse;
export const ListProjectsLocationsTerraformVersionsResponse = ListTerraformVersionsResponse;

export type ListProjectsLocationsTerraformVersionsError = CommonErrors;

export const listProjectsLocationsTerraformVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsTerraformVersionsRequest,
  output: ListProjectsLocationsTerraformVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details about a TerraformVersion. */
export interface GetProjectsLocationsTerraformVersionsRequest {
  /** Required. The name of the TerraformVersion. Format: 'projects/{project_id}/locations/{location}/terraformVersions/{terraform_version}' */
  name: string;
}

export const GetProjectsLocationsTerraformVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/terraformVersions/{terraformVersionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTerraformVersionsRequest>;

export type GetProjectsLocationsTerraformVersionsResponse = TerraformVersion;
export const GetProjectsLocationsTerraformVersionsResponse = TerraformVersion;

export type GetProjectsLocationsTerraformVersionsError = CommonErrors;

export const getProjectsLocationsTerraformVersions: API.OperationMethod<GetProjectsLocationsTerraformVersionsRequest, GetProjectsLocationsTerraformVersionsResponse, GetProjectsLocationsTerraformVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTerraformVersionsRequest,
  output: GetProjectsLocationsTerraformVersionsResponse,
  errors: [],
}));

