import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Proton",
  target: "AwsProton20200720",
  version: "2020-07-20",
  sigv4: "proton",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://proton-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://proton-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://proton.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://proton.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string | redacted.Redacted<string> }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string | redacted.Redacted<string> }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string | redacted.Redacted<string> }> {}
export type EnvironmentAccountConnectionId = string;
export interface AcceptEnvironmentAccountConnectionInput {
  id: string;
}
export type EnvironmentAccountConnectionArn = string;
export type AwsAccountId = string;
export type Arn = string;
export type ResourceName = string;
export type EnvironmentAccountConnectionStatus = string;
export type RoleArn = string;
export interface EnvironmentAccountConnection {
  id: string;
  arn: string;
  managementAccountId: string;
  environmentAccountId: string;
  roleArn: string;
  environmentName: string;
  requestedAt: Date;
  lastModifiedAt: Date;
  status: string;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export interface AcceptEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export interface CancelComponentDeploymentInput {
  componentName: string;
}
export type Description = string | redacted.Redacted<string>;
export type ComponentArn = string;
export type DeploymentStatus = string;
export type StatusMessage = string | redacted.Redacted<string>;
export type SpecContents = string | redacted.Redacted<string>;
export type DeploymentId = string;
export interface Component {
  name: string;
  description?: string | redacted.Redacted<string>;
  arn: string;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  createdAt: Date;
  lastModifiedAt: Date;
  lastDeploymentAttemptedAt?: Date;
  lastDeploymentSucceededAt?: Date;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  serviceSpec?: string | redacted.Redacted<string>;
  lastClientRequestToken?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export interface CancelComponentDeploymentOutput {
  component: Component;
}
export interface CancelEnvironmentDeploymentInput {
  environmentName: string;
}
export type EnvironmentArn = string;
export type TemplateVersionPart = string;
export type Provisioning = string;
export type RepositoryArn = string;
export type RepositoryProvider = string;
export type RepositoryName = string;
export type GitBranchName = string;
export interface RepositoryBranch {
  arn: string;
  provider: string;
  name: string;
  branch: string;
}
export interface Environment {
  name: string;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  arn: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  protonServiceRoleArn?: string;
  environmentAccountConnectionId?: string;
  environmentAccountId?: string;
  spec?: string | redacted.Redacted<string>;
  provisioning?: string;
  provisioningRepository?: RepositoryBranch;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export interface CancelEnvironmentDeploymentOutput {
  environment: Environment;
}
export interface CancelServiceInstanceDeploymentInput {
  serviceInstanceName: string;
  serviceName: string;
}
export type ServiceInstanceArn = string;
export interface ServiceInstance {
  name: string;
  arn: string;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  serviceName: string;
  environmentName: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
  lastClientRequestToken?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export interface CancelServiceInstanceDeploymentOutput {
  serviceInstance: ServiceInstance;
}
export interface CancelServicePipelineDeploymentInput {
  serviceName: string;
}
export interface ServicePipeline {
  arn: string;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export interface CancelServicePipelineDeploymentOutput {
  pipeline: ServicePipeline;
}
export type TemplateFileContents = string | redacted.Redacted<string>;
export type TemplateManifestContents = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export type ClientToken = string;
export interface CreateComponentInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  serviceName?: string;
  serviceInstanceName?: string;
  environmentName?: string;
  templateFile: string | redacted.Redacted<string>;
  manifest: string | redacted.Redacted<string>;
  serviceSpec?: string | redacted.Redacted<string>;
  tags?: Tag[];
  clientToken?: string;
}
export interface CreateComponentOutput {
  component: Component;
}
export interface RepositoryBranchInput {
  provider: string;
  name: string;
  branch: string;
}
export interface CreateEnvironmentInput {
  name: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion?: string;
  description?: string | redacted.Redacted<string>;
  spec: string | redacted.Redacted<string>;
  protonServiceRoleArn?: string;
  environmentAccountConnectionId?: string;
  tags?: Tag[];
  provisioningRepository?: RepositoryBranchInput;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export interface CreateEnvironmentOutput {
  environment: Environment;
}
export interface CreateEnvironmentAccountConnectionInput {
  clientToken?: string;
  managementAccountId: string;
  roleArn?: string;
  environmentName: string;
  tags?: Tag[];
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export interface CreateEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export type DisplayName = string | redacted.Redacted<string>;
export interface CreateEnvironmentTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  encryptionKey?: string;
  provisioning?: string;
  tags?: Tag[];
}
export type EnvironmentTemplateArn = string;
export type FullTemplateVersionNumber = string;
export interface EnvironmentTemplate {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  encryptionKey?: string;
  provisioning?: string;
}
export interface CreateEnvironmentTemplateOutput {
  environmentTemplate: EnvironmentTemplate;
}
export type S3Bucket = string;
export type S3Key = string;
export interface S3ObjectSource {
  bucket: string;
  key: string;
}
export type TemplateVersionSourceInput = { s3: S3ObjectSource };
export interface CreateEnvironmentTemplateVersionInput {
  clientToken?: string;
  templateName: string;
  description?: string | redacted.Redacted<string>;
  majorVersion?: string;
  source: TemplateVersionSourceInput;
  tags?: Tag[];
}
export type TemplateVersionStatus = string;
export type EnvironmentTemplateVersionArn = string;
export type TemplateSchema = string | redacted.Redacted<string>;
export interface EnvironmentTemplateVersion {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  schema?: string | redacted.Redacted<string>;
}
export interface CreateEnvironmentTemplateVersionOutput {
  environmentTemplateVersion: EnvironmentTemplateVersion;
}
export interface CreateRepositoryInput {
  provider: string;
  name: string;
  connectionArn: string;
  encryptionKey?: string;
  tags?: Tag[];
}
export interface Repository {
  arn: string;
  provider: string;
  name: string;
  connectionArn: string;
  encryptionKey?: string;
}
export interface CreateRepositoryOutput {
  repository: Repository;
}
export type RepositoryId = string;
export interface CreateServiceInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion?: string;
  spec: string | redacted.Redacted<string>;
  repositoryConnectionArn?: string;
  repositoryId?: string;
  branchName?: string;
  tags?: Tag[];
}
export type ServiceArn = string;
export type ServiceStatus = string;
export interface Service {
  name: string;
  description?: string | redacted.Redacted<string>;
  arn: string;
  templateName: string;
  createdAt: Date;
  lastModifiedAt: Date;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  spec: string | redacted.Redacted<string>;
  pipeline?: ServicePipeline;
  repositoryConnectionArn?: string;
  repositoryId?: string;
  branchName?: string;
}
export interface CreateServiceOutput {
  service: Service;
}
export interface CreateServiceInstanceInput {
  name: string;
  serviceName: string;
  spec: string | redacted.Redacted<string>;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
  tags?: Tag[];
  clientToken?: string;
}
export interface CreateServiceInstanceOutput {
  serviceInstance: ServiceInstance;
}
export type OpsFilePath = string;
export interface CreateServiceSyncConfigInput {
  serviceName: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  filePath: string;
}
export interface ServiceSyncConfig {
  serviceName: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  filePath: string;
}
export interface CreateServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export interface CreateServiceTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  encryptionKey?: string;
  pipelineProvisioning?: string;
  tags?: Tag[];
}
export type ServiceTemplateArn = string;
export interface ServiceTemplate {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  encryptionKey?: string;
  pipelineProvisioning?: string;
}
export interface CreateServiceTemplateOutput {
  serviceTemplate: ServiceTemplate;
}
export interface CompatibleEnvironmentTemplateInput {
  templateName: string;
  majorVersion: string;
}
export type CompatibleEnvironmentTemplateInputList =
  CompatibleEnvironmentTemplateInput[];
export type ServiceTemplateSupportedComponentSourceType = string;
export type ServiceTemplateSupportedComponentSourceInputList = string[];
export interface CreateServiceTemplateVersionInput {
  clientToken?: string;
  templateName: string;
  description?: string | redacted.Redacted<string>;
  majorVersion?: string;
  source: TemplateVersionSourceInput;
  compatibleEnvironmentTemplates: CompatibleEnvironmentTemplateInput[];
  tags?: Tag[];
  supportedComponentSources?: string[];
}
export type ServiceTemplateVersionArn = string;
export interface CompatibleEnvironmentTemplate {
  templateName: string;
  majorVersion: string;
}
export type CompatibleEnvironmentTemplateList = CompatibleEnvironmentTemplate[];
export interface ServiceTemplateVersion {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  compatibleEnvironmentTemplates: CompatibleEnvironmentTemplate[];
  schema?: string | redacted.Redacted<string>;
  supportedComponentSources?: string[];
}
export interface CreateServiceTemplateVersionOutput {
  serviceTemplateVersion: ServiceTemplateVersion;
}
export type TemplateType = string;
export type Subdirectory = string;
export interface CreateTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  subdirectory?: string;
}
export interface TemplateSyncConfig {
  templateName: string;
  templateType: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  subdirectory?: string;
}
export interface CreateTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export interface DeleteComponentInput {
  name: string;
}
export interface DeleteComponentOutput {
  component?: Component;
}
export interface DeleteDeploymentInput {
  id: string;
}
export type DeploymentArn = string;
export type DeploymentTargetResourceType = string;
export type ComponentDeploymentIdList = string[];
export interface ServiceInstanceState {
  spec: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  lastSuccessfulComponentDeploymentIds?: string[];
  lastSuccessfulEnvironmentDeploymentId?: string;
  lastSuccessfulServicePipelineDeploymentId?: string;
}
export interface EnvironmentState {
  spec?: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
}
export interface ServicePipelineState {
  spec?: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
}
export type ResourceNameOrEmpty = string;
export interface ComponentState {
  serviceName?: string;
  serviceInstanceName?: string;
  serviceSpec?: string | redacted.Redacted<string>;
  templateFile?: string | redacted.Redacted<string>;
}
export type DeploymentState =
  | {
      serviceInstance: ServiceInstanceState;
      environment?: never;
      servicePipeline?: never;
      component?: never;
    }
  | {
      serviceInstance?: never;
      environment: EnvironmentState;
      servicePipeline?: never;
      component?: never;
    }
  | {
      serviceInstance?: never;
      environment?: never;
      servicePipeline: ServicePipelineState;
      component?: never;
    }
  | {
      serviceInstance?: never;
      environment?: never;
      servicePipeline?: never;
      component: ComponentState;
    };
export interface Deployment {
  id: string;
  arn: string;
  targetArn: string;
  targetResourceCreatedAt: Date;
  targetResourceType: string;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  createdAt: Date;
  lastModifiedAt: Date;
  completedAt?: Date;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
  initialState?: DeploymentState;
  targetState?: DeploymentState;
}
export interface DeleteDeploymentOutput {
  deployment?: Deployment;
}
export interface DeleteEnvironmentInput {
  name: string;
}
export interface DeleteEnvironmentOutput {
  environment?: Environment;
}
export interface DeleteEnvironmentAccountConnectionInput {
  id: string;
}
export interface DeleteEnvironmentAccountConnectionOutput {
  environmentAccountConnection?: EnvironmentAccountConnection;
}
export interface DeleteEnvironmentTemplateInput {
  name: string;
}
export interface DeleteEnvironmentTemplateOutput {
  environmentTemplate?: EnvironmentTemplate;
}
export interface DeleteEnvironmentTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export interface DeleteEnvironmentTemplateVersionOutput {
  environmentTemplateVersion?: EnvironmentTemplateVersion;
}
export interface DeleteRepositoryInput {
  provider: string;
  name: string;
}
export interface DeleteRepositoryOutput {
  repository?: Repository;
}
export interface DeleteServiceInput {
  name: string;
}
export interface DeleteServiceOutput {
  service?: Service;
}
export interface DeleteServiceSyncConfigInput {
  serviceName: string;
}
export interface DeleteServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export interface DeleteServiceTemplateInput {
  name: string;
}
export interface DeleteServiceTemplateOutput {
  serviceTemplate?: ServiceTemplate;
}
export interface DeleteServiceTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export interface DeleteServiceTemplateVersionOutput {
  serviceTemplateVersion?: ServiceTemplateVersion;
}
export interface DeleteTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
}
export interface DeleteTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export interface GetAccountSettingsInput {}
export type RoleArnOrEmptyString = string;
export interface AccountSettings {
  pipelineServiceRoleArn?: string;
  pipelineProvisioningRepository?: RepositoryBranch;
  pipelineCodebuildRoleArn?: string;
}
export interface GetAccountSettingsOutput {
  accountSettings?: AccountSettings;
}
export interface GetComponentInput {
  name: string;
}
export interface GetComponentOutput {
  component?: Component;
}
export interface GetDeploymentInput {
  id: string;
  environmentName?: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
}
export interface GetDeploymentOutput {
  deployment?: Deployment;
}
export interface GetEnvironmentInput {
  name: string;
}
export interface GetEnvironmentOutput {
  environment: Environment;
}
export interface GetEnvironmentAccountConnectionInput {
  id: string;
}
export interface GetEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export interface GetEnvironmentTemplateInput {
  name: string;
}
export interface GetEnvironmentTemplateOutput {
  environmentTemplate: EnvironmentTemplate;
}
export interface GetEnvironmentTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export interface GetEnvironmentTemplateVersionOutput {
  environmentTemplateVersion: EnvironmentTemplateVersion;
}
export interface GetRepositoryInput {
  provider: string;
  name: string;
}
export interface GetRepositoryOutput {
  repository: Repository;
}
export type SyncType = string;
export interface GetRepositorySyncStatusInput {
  repositoryName: string;
  repositoryProvider: string;
  branch: string;
  syncType: string;
}
export type RepositorySyncStatus = string;
export interface RepositorySyncEvent {
  type: string;
  externalId?: string;
  time: Date;
  event: string;
}
export type RepositorySyncEvents = RepositorySyncEvent[];
export interface RepositorySyncAttempt {
  startedAt: Date;
  status: string;
  events: RepositorySyncEvent[];
}
export interface GetRepositorySyncStatusOutput {
  latestSync?: RepositorySyncAttempt;
}
export interface GetResourcesSummaryInput {}
export interface ResourceCountsSummary {
  total: number;
  failed?: number;
  upToDate?: number;
  behindMajor?: number;
  behindMinor?: number;
}
export interface CountsSummary {
  components?: ResourceCountsSummary;
  environments?: ResourceCountsSummary;
  environmentTemplates?: ResourceCountsSummary;
  serviceInstances?: ResourceCountsSummary;
  services?: ResourceCountsSummary;
  serviceTemplates?: ResourceCountsSummary;
  pipelines?: ResourceCountsSummary;
}
export interface GetResourcesSummaryOutput {
  counts: CountsSummary;
}
export interface GetServiceInput {
  name: string;
}
export interface GetServiceOutput {
  service?: Service;
}
export interface GetServiceInstanceInput {
  name: string;
  serviceName: string;
}
export interface GetServiceInstanceOutput {
  serviceInstance: ServiceInstance;
}
export interface GetServiceInstanceSyncStatusInput {
  serviceName: string;
  serviceInstanceName: string;
}
export type SHA = string;
export interface Revision {
  repositoryName: string;
  repositoryProvider: string;
  sha: string;
  directory: string;
  branch: string;
}
export type ResourceSyncStatus = string;
export interface ResourceSyncEvent {
  type: string;
  externalId?: string;
  time: Date;
  event: string;
}
export type ResourceSyncEvents = ResourceSyncEvent[];
export interface ResourceSyncAttempt {
  initialRevision: Revision;
  targetRevision: Revision;
  target: string;
  startedAt: Date;
  status: string;
  events: ResourceSyncEvent[];
}
export interface GetServiceInstanceSyncStatusOutput {
  latestSync?: ResourceSyncAttempt;
  latestSuccessfulSync?: ResourceSyncAttempt;
  desiredState?: Revision;
}
export interface GetServiceSyncBlockerSummaryInput {
  serviceName: string;
  serviceInstanceName?: string;
}
export type BlockerType = string;
export type BlockerStatus = string;
export interface SyncBlockerContext {
  key: string;
  value: string;
}
export type SyncBlockerContexts = SyncBlockerContext[];
export interface SyncBlocker {
  id: string;
  type: string;
  status: string;
  createdReason: string;
  createdAt: Date;
  contexts?: SyncBlockerContext[];
  resolvedReason?: string;
  resolvedAt?: Date;
}
export type LatestSyncBlockers = SyncBlocker[];
export interface ServiceSyncBlockerSummary {
  serviceName: string;
  serviceInstanceName?: string;
  latestBlockers?: SyncBlocker[];
}
export interface GetServiceSyncBlockerSummaryOutput {
  serviceSyncBlockerSummary?: ServiceSyncBlockerSummary;
}
export interface GetServiceSyncConfigInput {
  serviceName: string;
}
export interface GetServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export interface GetServiceTemplateInput {
  name: string;
}
export interface GetServiceTemplateOutput {
  serviceTemplate: ServiceTemplate;
}
export interface GetServiceTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export interface GetServiceTemplateVersionOutput {
  serviceTemplateVersion: ServiceTemplateVersion;
}
export interface GetTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
}
export interface GetTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export interface GetTemplateSyncStatusInput {
  templateName: string;
  templateType: string;
  templateVersion: string;
}
export interface GetTemplateSyncStatusOutput {
  latestSync?: ResourceSyncAttempt;
  latestSuccessfulSync?: ResourceSyncAttempt;
  desiredState?: Revision;
}
export type EmptyNextToken = string;
export interface ListComponentOutputsInput {
  componentName: string;
  nextToken?: string;
  deploymentId?: string;
}
export type OutputKey = string;
export type OutputValueString = string;
export interface Output {
  key?: string;
  valueString?: string;
}
export type OutputsList = Output[];
export interface ListComponentOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export interface ListComponentProvisionedResourcesInput {
  componentName: string;
  nextToken?: string;
}
export type ProvisionedResourceName = string;
export type ProvisionedResourceIdentifier = string;
export type ProvisionedResourceEngine = string;
export interface ProvisionedResource {
  name?: string;
  identifier?: string;
  provisioningEngine?: string;
}
export type ProvisionedResourceList = ProvisionedResource[];
export interface ListComponentProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export type NextToken = string;
export type MaxPageResults = number;
export interface ListComponentsInput {
  nextToken?: string;
  environmentName?: string;
  serviceName?: string;
  serviceInstanceName?: string;
  maxResults?: number;
}
export interface ComponentSummary {
  name: string;
  arn: string;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  createdAt: Date;
  lastModifiedAt: Date;
  lastDeploymentAttemptedAt?: Date;
  lastDeploymentSucceededAt?: Date;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export type ComponentSummaryList = ComponentSummary[];
export interface ListComponentsOutput {
  nextToken?: string;
  components: ComponentSummary[];
}
export interface ListDeploymentsInput {
  nextToken?: string;
  environmentName?: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
  maxResults?: number;
}
export interface DeploymentSummary {
  id: string;
  arn: string;
  targetArn: string;
  targetResourceCreatedAt: Date;
  targetResourceType: string;
  createdAt: Date;
  lastModifiedAt: Date;
  completedAt?: Date;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
  deploymentStatus: string;
}
export type DeploymentSummaryList = DeploymentSummary[];
export interface ListDeploymentsOutput {
  nextToken?: string;
  deployments: DeploymentSummary[];
}
export type EnvironmentAccountConnectionRequesterAccountType = string;
export type EnvironmentAccountConnectionStatusList = string[];
export interface ListEnvironmentAccountConnectionsInput {
  requestedBy: string;
  environmentName?: string;
  statuses?: string[];
  nextToken?: string;
  maxResults?: number;
}
export interface EnvironmentAccountConnectionSummary {
  id: string;
  arn: string;
  managementAccountId: string;
  environmentAccountId: string;
  roleArn: string;
  environmentName: string;
  requestedAt: Date;
  lastModifiedAt: Date;
  status: string;
  componentRoleArn?: string;
}
export type EnvironmentAccountConnectionSummaryList =
  EnvironmentAccountConnectionSummary[];
export interface ListEnvironmentAccountConnectionsOutput {
  environmentAccountConnections: EnvironmentAccountConnectionSummary[];
  nextToken?: string;
}
export interface ListEnvironmentOutputsInput {
  environmentName: string;
  nextToken?: string;
  deploymentId?: string;
}
export interface ListEnvironmentOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export interface ListEnvironmentProvisionedResourcesInput {
  environmentName: string;
  nextToken?: string;
}
export interface ListEnvironmentProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export interface EnvironmentTemplateFilter {
  templateName: string;
  majorVersion: string;
}
export type EnvironmentTemplateFilterList = EnvironmentTemplateFilter[];
export interface ListEnvironmentsInput {
  nextToken?: string;
  maxResults?: number;
  environmentTemplates?: EnvironmentTemplateFilter[];
}
export interface EnvironmentSummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  arn: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  protonServiceRoleArn?: string;
  environmentAccountConnectionId?: string;
  environmentAccountId?: string;
  provisioning?: string;
  componentRoleArn?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export type EnvironmentSummaryList = EnvironmentSummary[];
export interface ListEnvironmentsOutput {
  nextToken?: string;
  environments: EnvironmentSummary[];
}
export interface ListEnvironmentTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface EnvironmentTemplateSummary {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  provisioning?: string;
}
export type EnvironmentTemplateSummaryList = EnvironmentTemplateSummary[];
export interface ListEnvironmentTemplatesOutput {
  nextToken?: string;
  templates: EnvironmentTemplateSummary[];
}
export interface ListEnvironmentTemplateVersionsInput {
  nextToken?: string;
  maxResults?: number;
  templateName: string;
  majorVersion?: string;
}
export interface EnvironmentTemplateVersionSummary {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
}
export type EnvironmentTemplateVersionSummaryList =
  EnvironmentTemplateVersionSummary[];
export interface ListEnvironmentTemplateVersionsOutput {
  nextToken?: string;
  templateVersions: EnvironmentTemplateVersionSummary[];
}
export interface ListRepositoriesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface RepositorySummary {
  arn: string;
  provider: string;
  name: string;
  connectionArn: string;
}
export type RepositorySummaryList = RepositorySummary[];
export interface ListRepositoriesOutput {
  nextToken?: string;
  repositories: RepositorySummary[];
}
export interface ListRepositorySyncDefinitionsInput {
  repositoryName: string;
  repositoryProvider: string;
  syncType: string;
  nextToken?: string;
}
export interface RepositorySyncDefinition {
  target: string;
  parent: string;
  branch: string;
  directory: string;
}
export type RepositorySyncDefinitionList = RepositorySyncDefinition[];
export interface ListRepositorySyncDefinitionsOutput {
  nextToken?: string;
  syncDefinitions: RepositorySyncDefinition[];
}
export interface ListServiceInstanceOutputsInput {
  serviceInstanceName: string;
  serviceName: string;
  nextToken?: string;
  deploymentId?: string;
}
export interface ListServiceInstanceOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export interface ListServiceInstanceProvisionedResourcesInput {
  serviceName: string;
  serviceInstanceName: string;
  nextToken?: string;
}
export interface ListServiceInstanceProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export type ListServiceInstancesFilterBy = string;
export type ListServiceInstancesFilterValue = string;
export interface ListServiceInstancesFilter {
  key?: string;
  value?: string;
}
export type ListServiceInstancesFilterList = ListServiceInstancesFilter[];
export type ListServiceInstancesSortBy = string;
export type SortOrder = string;
export interface ListServiceInstancesInput {
  serviceName?: string;
  nextToken?: string;
  maxResults?: number;
  filters?: ListServiceInstancesFilter[];
  sortBy?: string;
  sortOrder?: string;
}
export interface ServiceInstanceSummary {
  name: string;
  arn: string;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  serviceName: string;
  environmentName: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export type ServiceInstanceSummaryList = ServiceInstanceSummary[];
export interface ListServiceInstancesOutput {
  nextToken?: string;
  serviceInstances: ServiceInstanceSummary[];
}
export interface ListServicePipelineOutputsInput {
  serviceName: string;
  nextToken?: string;
  deploymentId?: string;
}
export interface ListServicePipelineOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export interface ListServicePipelineProvisionedResourcesInput {
  serviceName: string;
  nextToken?: string;
}
export interface ListServicePipelineProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export interface ListServicesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ServiceSummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  arn: string;
  templateName: string;
  createdAt: Date;
  lastModifiedAt: Date;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
}
export type ServiceSummaryList = ServiceSummary[];
export interface ListServicesOutput {
  nextToken?: string;
  services: ServiceSummary[];
}
export interface ListServiceTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ServiceTemplateSummary {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  pipelineProvisioning?: string;
}
export type ServiceTemplateSummaryList = ServiceTemplateSummary[];
export interface ListServiceTemplatesOutput {
  nextToken?: string;
  templates: ServiceTemplateSummary[];
}
export interface ListServiceTemplateVersionsInput {
  nextToken?: string;
  maxResults?: number;
  templateName: string;
  majorVersion?: string;
}
export interface ServiceTemplateVersionSummary {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
}
export type ServiceTemplateVersionSummaryList = ServiceTemplateVersionSummary[];
export interface ListServiceTemplateVersionsOutput {
  nextToken?: string;
  templateVersions: ServiceTemplateVersionSummary[];
}
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTagsForResourceOutput {
  tags: Tag[];
  nextToken?: string;
}
export type ResourceDeploymentStatus = string;
export interface NotifyResourceDeploymentStatusChangeInput {
  resourceArn: string;
  status?: string;
  outputs?: Output[];
  deploymentId?: string;
  statusMessage?: string | redacted.Redacted<string>;
}
export interface NotifyResourceDeploymentStatusChangeOutput {}
export interface RejectEnvironmentAccountConnectionInput {
  id: string;
}
export interface RejectEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateAccountSettingsInput {
  pipelineServiceRoleArn?: string;
  pipelineProvisioningRepository?: RepositoryBranchInput;
  deletePipelineProvisioningRepository?: boolean;
  pipelineCodebuildRoleArn?: string;
}
export interface UpdateAccountSettingsOutput {
  accountSettings: AccountSettings;
}
export type ComponentDeploymentUpdateType = string;
export interface UpdateComponentInput {
  name: string;
  deploymentType: string;
  description?: string | redacted.Redacted<string>;
  serviceName?: string;
  serviceInstanceName?: string;
  serviceSpec?: string | redacted.Redacted<string>;
  templateFile?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface UpdateComponentOutput {
  component: Component;
}
export type DeploymentUpdateType = string;
export interface UpdateEnvironmentInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
  protonServiceRoleArn?: string;
  deploymentType: string;
  environmentAccountConnectionId?: string;
  provisioningRepository?: RepositoryBranchInput;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export interface UpdateEnvironmentOutput {
  environment: Environment;
}
export interface UpdateEnvironmentAccountConnectionInput {
  id: string;
  roleArn?: string;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export interface UpdateEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export interface UpdateEnvironmentTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export interface UpdateEnvironmentTemplateOutput {
  environmentTemplate: EnvironmentTemplate;
}
export interface UpdateEnvironmentTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  description?: string | redacted.Redacted<string>;
  status?: string;
}
export interface UpdateEnvironmentTemplateVersionOutput {
  environmentTemplateVersion: EnvironmentTemplateVersion;
}
export interface UpdateServiceInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
}
export interface UpdateServiceOutput {
  service: Service;
}
export interface UpdateServiceInstanceInput {
  name: string;
  serviceName: string;
  deploymentType: string;
  spec?: string | redacted.Redacted<string>;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
  clientToken?: string;
}
export interface UpdateServiceInstanceOutput {
  serviceInstance: ServiceInstance;
}
export interface UpdateServicePipelineInput {
  serviceName: string;
  spec: string | redacted.Redacted<string>;
  deploymentType: string;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
}
export interface UpdateServicePipelineOutput {
  pipeline: ServicePipeline;
}
export interface UpdateServiceSyncBlockerInput {
  id: string;
  resolvedReason: string;
}
export interface UpdateServiceSyncBlockerOutput {
  serviceName: string;
  serviceInstanceName?: string;
  serviceSyncBlocker: SyncBlocker;
}
export interface UpdateServiceSyncConfigInput {
  serviceName: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  filePath: string;
}
export interface UpdateServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export interface UpdateServiceTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export interface UpdateServiceTemplateOutput {
  serviceTemplate: ServiceTemplate;
}
export interface UpdateServiceTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  description?: string | redacted.Redacted<string>;
  status?: string;
  compatibleEnvironmentTemplates?: CompatibleEnvironmentTemplateInput[];
  supportedComponentSources?: string[];
}
export interface UpdateServiceTemplateVersionOutput {
  serviceTemplateVersion: ServiceTemplateVersion;
}
export interface UpdateTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  subdirectory?: string;
}
export interface UpdateTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export type ErrorMessage = string | redacted.Redacted<string>;
export type AcceptEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In a management account, an environment account connection request is accepted. When the environment account connection request is accepted, Proton
 * can use the associated IAM role to provision environment infrastructure resources in the associated environment account.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const acceptEnvironmentAccountConnection: API.OperationMethod<
  AcceptEnvironmentAccountConnectionInput,
  AcceptEnvironmentAccountConnectionOutput,
  AcceptEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { environmentAccountConnection: o_EnvironmentAccountConnection },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptEnvironmentAccountConnection",
})) as any;

export type CancelComponentDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel a component deployment (for a component that is in the `IN_PROGRESS` deployment status).
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const cancelComponentDeployment: API.OperationMethod<
  CancelComponentDeploymentInput,
  CancelComponentDeploymentOutput,
  CancelComponentDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { componentName: 0 },
    output: { component: o_Component },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelComponentDeployment",
})) as any;

export type CancelEnvironmentDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel an environment deployment on an UpdateEnvironment action, if the deployment is `IN_PROGRESS`. For more
 * information, see Update an environment in the Proton
 * User guide.
 *
 * The following list includes potential cancellation scenarios.
 *
 * - If the cancellation attempt succeeds, the resulting deployment state is `CANCELLED`.
 *
 * - If the cancellation attempt fails, the resulting deployment state is `FAILED`.
 *
 * - If the current UpdateEnvironment action succeeds before the cancellation attempt starts, the resulting deployment state is
 * `SUCCEEDED` and the cancellation attempt has no effect.
 */
export const cancelEnvironmentDeployment: API.OperationMethod<
  CancelEnvironmentDeploymentInput,
  CancelEnvironmentDeploymentOutput,
  CancelEnvironmentDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { environmentName: 0 },
    output: { environment: o_Environment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelEnvironmentDeployment",
})) as any;

export type CancelServiceInstanceDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel a service instance deployment on an UpdateServiceInstance action, if the deployment is `IN_PROGRESS`. For
 * more information, see Update a service instance
 * in the *Proton User guide*.
 *
 * The following list includes potential cancellation scenarios.
 *
 * - If the cancellation attempt succeeds, the resulting deployment state is
 * `CANCELLED`.
 *
 * - If the cancellation attempt fails, the resulting deployment state is
 * `FAILED`.
 *
 * - If the current UpdateServiceInstance action succeeds before the
 * cancellation attempt starts, the resulting deployment state is `SUCCEEDED` and
 * the cancellation attempt has no effect.
 */
export const cancelServiceInstanceDeployment: API.OperationMethod<
  CancelServiceInstanceDeploymentInput,
  CancelServiceInstanceDeploymentOutput,
  CancelServiceInstanceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceInstanceName: 0, serviceName: 0 },
    output: { serviceInstance: o_ServiceInstance },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelServiceInstanceDeployment",
})) as any;

export type CancelServicePipelineDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel a service pipeline deployment on an UpdateServicePipeline action, if the deployment is `IN_PROGRESS`. For
 * more information, see Update a service pipeline
 * in the *Proton User guide*.
 *
 * The following list includes potential cancellation scenarios.
 *
 * - If the cancellation attempt succeeds, the resulting deployment state is
 * `CANCELLED`.
 *
 * - If the cancellation attempt fails, the resulting deployment state is
 * `FAILED`.
 *
 * - If the current UpdateServicePipeline action succeeds before the
 * cancellation attempt starts, the resulting deployment state is `SUCCEEDED` and
 * the cancellation attempt has no effect.
 */
export const cancelServicePipelineDeployment: API.OperationMethod<
  CancelServicePipelineDeploymentInput,
  CancelServicePipelineDeploymentOutput,
  CancelServicePipelineDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0 },
    output: { pipeline: o_ServicePipeline },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelServicePipelineDeployment",
})) as any;

export type CreateComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an Proton component. A component is an infrastructure extension for a service instance.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const createComponent: API.OperationMethod<
  CreateComponentInput,
  CreateComponentOutput,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      serviceName: 0,
      serviceInstanceName: 0,
      environmentName: 0,
      templateFile: 0,
      manifest: 0,
      serviceSpec: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    output: { component: o_Component },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponent",
})) as any;

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deploy a new environment. An Proton environment is created from an environment template that defines infrastructure and resources that can be
 * shared across services.
 *
 * **You can provision environments using the following methods:**
 *
 * - Amazon Web Services-managed provisioning: Proton makes direct calls to provision your resources.
 *
 * - Self-managed provisioning: Proton makes pull requests on your repository to provide compiled infrastructure as code (IaC) files that your IaC
 * engine uses to provision resources.
 *
 * For more information, see Environments and Provisioning methods in the Proton User
 * Guide.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      templateName: 0,
      templateMajorVersion: 0,
      templateMinorVersion: 0,
      description: 0,
      spec: 0,
      protonServiceRoleArn: 0,
      environmentAccountConnectionId: 0,
      tags: D.list(i_Tag),
      provisioningRepository: i_RepositoryBranchInput,
      componentRoleArn: 0,
      codebuildRoleArn: 0,
    },
    output: { environment: o_Environment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
})) as any;

export type CreateEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an environment account connection in an environment account so that environment infrastructure resources can be provisioned in the environment
 * account from a management account.
 *
 * An environment account connection is a secure bi-directional connection between a *management account* and an environment
 * account that maintains authorization and permissions. For more information, see Environment account connections in the Proton User
 * guide.
 */
export const createEnvironmentAccountConnection: API.OperationMethod<
  CreateEnvironmentAccountConnectionInput,
  CreateEnvironmentAccountConnectionOutput,
  CreateEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      managementAccountId: 0,
      roleArn: 0,
      environmentName: 0,
      tags: D.list(i_Tag),
      componentRoleArn: 0,
      codebuildRoleArn: 0,
    },
    output: { environmentAccountConnection: o_EnvironmentAccountConnection },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentAccountConnection",
})) as any;

export type CreateEnvironmentTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an environment template for Proton. For more information, see Environment Templates in the *Proton User Guide*.
 *
 * You can create an environment template in one of the two following ways:
 *
 * - Register and publish a *standard* environment template that instructs Proton to deploy and manage environment
 * infrastructure.
 *
 * - Register and publish a *customer managed* environment template that connects Proton to your existing provisioned
 * infrastructure that you manage. Proton *doesn't* manage your existing provisioned infrastructure. To create an environment
 * template for customer provisioned and managed infrastructure, include the `provisioning` parameter and set the value to
 * `CUSTOMER_MANAGED`. For more information, see Register
 * and publish an environment template in the *Proton User Guide*.
 */
export const createEnvironmentTemplate: API.OperationMethod<
  CreateEnvironmentTemplateInput,
  CreateEnvironmentTemplateOutput,
  CreateEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      displayName: 0,
      description: 0,
      encryptionKey: 0,
      provisioning: 0,
      tags: D.list(i_Tag),
    },
    output: { environmentTemplate: o_EnvironmentTemplate },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentTemplate",
})) as any;

export type CreateEnvironmentTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new major or minor version of an environment template. A major version of an environment template is a version that
 * *isn't* backwards compatible. A minor version of an environment template is a version that's backwards compatible within its major
 * version.
 */
export const createEnvironmentTemplateVersion: API.OperationMethod<
  CreateEnvironmentTemplateVersionInput,
  CreateEnvironmentTemplateVersionOutput,
  CreateEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      templateName: 0,
      description: 0,
      majorVersion: 0,
      source: i_TemplateVersionSourceInput,
      tags: D.list(i_Tag),
    },
    output: { environmentTemplateVersion: o_EnvironmentTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentTemplateVersion",
})) as any;

export type CreateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create and register a link to a repository. Proton uses the link to repeatedly access the repository, to either push to it (self-managed
 * provisioning) or pull from it (template sync). You can share a linked repository across multiple resources (like environments using self-managed
 * provisioning, or synced templates). When you create a repository link, Proton creates a service-linked role for you.
 *
 * For more information, see Self-managed provisioning, Template bundles, and
 * Template sync configurations in the Proton
 * User Guide.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryInput,
  CreateRepositoryOutput,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      provider: 0,
      name: 0,
      connectionArn: 0,
      encryptionKey: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
})) as any;

export type CreateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an Proton service. An Proton service is an instantiation of a service
 * template and often includes several service instances and pipeline. For more information, see
 * Services
 * in the *Proton User Guide*.
 */
export const createService: API.OperationMethod<
  CreateServiceInput,
  CreateServiceOutput,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      templateName: 0,
      templateMajorVersion: 0,
      templateMinorVersion: 0,
      spec: 0,
      repositoryConnectionArn: 0,
      repositoryId: 0,
      branchName: 0,
      tags: D.list(i_Tag),
    },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
})) as any;

export type CreateServiceInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a service instance.
 */
export const createServiceInstance: API.OperationMethod<
  CreateServiceInstanceInput,
  CreateServiceInstanceOutput,
  CreateServiceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      serviceName: 0,
      spec: 0,
      templateMajorVersion: 0,
      templateMinorVersion: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    output: { serviceInstance: o_ServiceInstance },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceInstance",
})) as any;

export type CreateServiceSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create the Proton Ops configuration file.
 */
export const createServiceSyncConfig: API.OperationMethod<
  CreateServiceSyncConfigInput,
  CreateServiceSyncConfigOutput,
  CreateServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      repositoryProvider: 0,
      repositoryName: 0,
      branch: 0,
      filePath: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceSyncConfig",
})) as any;

export type CreateServiceTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a service template. The administrator creates a service template to define
 * standardized infrastructure and an optional CI/CD service pipeline. Developers, in turn,
 * select the service template from Proton. If the selected service template includes a
 * service pipeline definition, they provide a link to their source code repository. Proton
 * then deploys and manages the infrastructure defined by the selected service template. For more
 * information, see Proton templates in the *Proton User Guide*.
 */
export const createServiceTemplate: API.OperationMethod<
  CreateServiceTemplateInput,
  CreateServiceTemplateOutput,
  CreateServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      displayName: 0,
      description: 0,
      encryptionKey: 0,
      pipelineProvisioning: 0,
      tags: D.list(i_Tag),
    },
    output: { serviceTemplate: o_ServiceTemplate },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceTemplate",
})) as any;

export type CreateServiceTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new major or minor version of a service template. A major version of a service
 * template is a version that *isn't* backward compatible. A minor version of
 * a service template is a version that's backward compatible within its major version.
 */
export const createServiceTemplateVersion: API.OperationMethod<
  CreateServiceTemplateVersionInput,
  CreateServiceTemplateVersionOutput,
  CreateServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      templateName: 0,
      description: 0,
      majorVersion: 0,
      source: i_TemplateVersionSourceInput,
      compatibleEnvironmentTemplates: D.list(
        i_CompatibleEnvironmentTemplateInput,
      ),
      tags: D.list(i_Tag),
      supportedComponentSources: 0,
    },
    output: { serviceTemplateVersion: o_ServiceTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceTemplateVersion",
})) as any;

export type CreateTemplateSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set up a template to create new template versions automatically by tracking a linked repository. A linked repository is a repository that has
 * been registered with Proton. For more information, see CreateRepository.
 *
 * When a commit is pushed to your linked repository, Proton checks for changes to your repository template bundles. If it detects a template
 * bundle change, a new major or minor version of its template is created, if the version doesn’t already exist. For more information, see Template sync configurations in the Proton
 * User Guide.
 */
export const createTemplateSyncConfig: API.OperationMethod<
  CreateTemplateSyncConfigInput,
  CreateTemplateSyncConfigOutput,
  CreateTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      templateName: 0,
      templateType: 0,
      repositoryProvider: 0,
      repositoryName: 0,
      branch: 0,
      subdirectory: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplateSyncConfig",
})) as any;

export type DeleteComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an Proton component resource.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentInput,
  DeleteComponentOutput,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { component: o_Component },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponent",
})) as any;

export type DeleteDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentInput,
  DeleteDeploymentOutput,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { deployment: o_Deployment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
})) as any;

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput,
  DeleteEnvironmentOutput,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { environment: o_Environment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
})) as any;

export type DeleteEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In an environment account, delete an environment account connection.
 *
 * After you delete an environment account connection that’s in use by an Proton environment, Proton *can’t* manage the
 * environment infrastructure resources until a new environment account connection is accepted for the environment account and associated environment. You're
 * responsible for cleaning up provisioned resources that remain without an environment connection.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const deleteEnvironmentAccountConnection: API.OperationMethod<
  DeleteEnvironmentAccountConnectionInput,
  DeleteEnvironmentAccountConnectionOutput,
  DeleteEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { environmentAccountConnection: o_EnvironmentAccountConnection },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentAccountConnection",
})) as any;

export type DeleteEnvironmentTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other major or minor versions of an environment template exist, delete the environment template.
 */
export const deleteEnvironmentTemplate: API.OperationMethod<
  DeleteEnvironmentTemplateInput,
  DeleteEnvironmentTemplateOutput,
  DeleteEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { environmentTemplate: o_EnvironmentTemplate },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentTemplate",
})) as any;

export type DeleteEnvironmentTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other minor versions of an environment template exist, delete a major version of the environment template if it's not the
 * `Recommended` version. Delete the `Recommended` version of the environment template if no other major versions or minor versions
 * of the environment template exist. A major version of an environment template is a version that's not backward compatible.
 *
 * Delete a minor version of an environment template if it *isn't* the `Recommended` version. Delete a
 * `Recommended` minor version of the environment template if no other minor versions of the environment template exist. A minor version of an
 * environment template is a version that's backward compatible.
 */
export const deleteEnvironmentTemplateVersion: API.OperationMethod<
  DeleteEnvironmentTemplateVersionInput,
  DeleteEnvironmentTemplateVersionOutput,
  DeleteEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { templateName: 0, majorVersion: 0, minorVersion: 0 },
    output: { environmentTemplateVersion: o_EnvironmentTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentTemplateVersion",
})) as any;

export type DeleteRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * De-register and unlink your repository.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryInput,
  DeleteRepositoryOutput,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { provider: 0, name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepository",
})) as any;

export type DeleteServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a service, with its instances and pipeline.
 *
 * You can't delete a service if it has any service instances that have components attached
 * to them.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceInput,
  DeleteServiceOutput,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
})) as any;

export type DeleteServiceSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the Proton Ops file.
 */
export const deleteServiceSyncConfig: API.OperationMethod<
  DeleteServiceSyncConfigInput,
  DeleteServiceSyncConfigOutput,
  DeleteServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { serviceName: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceSyncConfig",
})) as any;

export type DeleteServiceTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other major or minor versions of the service template exist, delete the service
 * template.
 */
export const deleteServiceTemplate: API.OperationMethod<
  DeleteServiceTemplateInput,
  DeleteServiceTemplateOutput,
  DeleteServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { serviceTemplate: o_ServiceTemplate },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceTemplate",
})) as any;

export type DeleteServiceTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other minor versions of a service template exist, delete a major version of the
 * service template if it's not the `Recommended` version. Delete the
 * `Recommended` version of the service template if no other major versions or minor
 * versions of the service template exist. A major version of a service template is a version
 * that *isn't* backwards compatible.
 *
 * Delete a minor version of a service template if it's not the `Recommended`
 * version. Delete a `Recommended` minor version of the service template if no other
 * minor versions of the service template exist. A minor version of a service template is a
 * version that's backwards compatible.
 */
export const deleteServiceTemplateVersion: API.OperationMethod<
  DeleteServiceTemplateVersionInput,
  DeleteServiceTemplateVersionOutput,
  DeleteServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { templateName: 0, majorVersion: 0, minorVersion: 0 },
    output: { serviceTemplateVersion: o_ServiceTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceTemplateVersion",
})) as any;

export type DeleteTemplateSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a template sync configuration.
 */
export const deleteTemplateSyncConfig: API.OperationMethod<
  DeleteTemplateSyncConfigInput,
  DeleteTemplateSyncConfigOutput,
  DeleteTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { templateName: 0, templateType: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplateSyncConfig",
})) as any;

export type GetAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detail data for Proton account-wide settings.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsInput,
  GetAccountSettingsOutput,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
})) as any;

export type GetComponentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a component.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const getComponent: API.OperationMethod<
  GetComponentInput,
  GetComponentOutput,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { component: o_Component },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
})) as any;

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      id: 0,
      environmentName: 0,
      serviceName: 0,
      serviceInstanceName: 0,
      componentName: 0,
    },
    output: { deployment: o_Deployment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
})) as any;

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for an environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { environment: o_Environment },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
})) as any;

export type GetEnvironmentAccountConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In an environment account, get the detailed data for an environment account connection.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const getEnvironmentAccountConnection: API.OperationMethod<
  GetEnvironmentAccountConnectionInput,
  GetEnvironmentAccountConnectionOutput,
  GetEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { environmentAccountConnection: o_EnvironmentAccountConnection },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentAccountConnection",
})) as any;

export type GetEnvironmentTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for an environment template.
 */
export const getEnvironmentTemplate: API.OperationMethod<
  GetEnvironmentTemplateInput,
  GetEnvironmentTemplateOutput,
  GetEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { environmentTemplate: o_EnvironmentTemplate },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentTemplate",
})) as any;

export type GetEnvironmentTemplateVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a major or minor version of an environment template.
 */
export const getEnvironmentTemplateVersion: API.OperationMethod<
  GetEnvironmentTemplateVersionInput,
  GetEnvironmentTemplateVersionOutput,
  GetEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { templateName: 0, majorVersion: 0, minorVersion: 0 },
    output: { environmentTemplateVersion: o_EnvironmentTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentTemplateVersion",
})) as any;

export type GetRepositoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detail data for a linked repository.
 */
export const getRepository: API.OperationMethod<
  GetRepositoryInput,
  GetRepositoryOutput,
  GetRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { provider: 0, name: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepository",
})) as any;

export type GetRepositorySyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the sync status of a repository used for Proton template sync. For more information about template sync, see .
 *
 * A repository sync status isn't tied to the Proton Repository resource (or any other Proton resource). Therefore, tags on an Proton Repository resource
 * have no effect on this action. Specifically, you can't use these tags to control access to this action using Attribute-based access control
 * (ABAC).
 *
 * For more information about ABAC, see ABAC in the Proton User
 * Guide.
 */
export const getRepositorySyncStatus: API.OperationMethod<
  GetRepositorySyncStatusInput,
  GetRepositorySyncStatusOutput,
  GetRepositorySyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, repositoryProvider: 0, branch: 0, syncType: 0 },
    output: { latestSync: { startedAt: D.ts, events: D.list({ time: D.ts }) } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositorySyncStatus",
})) as any;

export type GetResourcesSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get counts of Proton resources.
 *
 * For infrastructure-provisioning resources (environments, services, service instances, pipelines), the action returns staleness counts. A
 * resource is stale when it's behind the recommended version of the Proton template that it uses and it needs an update to become current.
 *
 * The action returns staleness counts (counts of resources that are up-to-date, behind a template major version, or behind a template minor
 * version), the total number of resources, and the number of resources that are in a failed state, grouped by resource type. Components,
 * environments, and service templates return less information - see the `components`, `environments`, and
 * `serviceTemplates` field descriptions.
 *
 * For context, the action also returns the total number of each type of Proton template in the Amazon Web Services account.
 *
 * For more information, see Proton dashboard in the
 * *Proton User Guide*.
 */
export const getResourcesSummary: API.OperationMethod<
  GetResourcesSummaryInput,
  GetResourcesSummaryOutput,
  GetResourcesSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesSummary",
})) as any;

export type GetServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a service.
 */
export const getService: API.OperationMethod<
  GetServiceInput,
  GetServiceOutput,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
})) as any;

export type GetServiceInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a service instance. A service instance is an instantiation of
 * service template and it runs in a specific environment.
 */
export const getServiceInstance: API.OperationMethod<
  GetServiceInstanceInput,
  GetServiceInstanceOutput,
  GetServiceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, serviceName: 0 },
    output: { serviceInstance: o_ServiceInstance },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceInstance",
})) as any;

export type GetServiceInstanceSyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the status of the synced service instance.
 */
export const getServiceInstanceSyncStatus: API.OperationMethod<
  GetServiceInstanceSyncStatusInput,
  GetServiceInstanceSyncStatusOutput,
  GetServiceInstanceSyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0, serviceInstanceName: 0 },
    output: {
      latestSync: o_ResourceSyncAttempt,
      latestSuccessfulSync: o_ResourceSyncAttempt,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceInstanceSyncStatus",
})) as any;

export type GetServiceSyncBlockerSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for the service sync blocker summary.
 */
export const getServiceSyncBlockerSummary: API.OperationMethod<
  GetServiceSyncBlockerSummaryInput,
  GetServiceSyncBlockerSummaryOutput,
  GetServiceSyncBlockerSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0, serviceInstanceName: 0 },
    output: {
      serviceSyncBlockerSummary: { latestBlockers: D.list(o_SyncBlocker) },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSyncBlockerSummary",
})) as any;

export type GetServiceSyncConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed information for the service sync configuration.
 */
export const getServiceSyncConfig: API.OperationMethod<
  GetServiceSyncConfigInput,
  GetServiceSyncConfigOutput,
  GetServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { serviceName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSyncConfig",
})) as any;

export type GetServiceTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a service template.
 */
export const getServiceTemplate: API.OperationMethod<
  GetServiceTemplateInput,
  GetServiceTemplateOutput,
  GetServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: { serviceTemplate: o_ServiceTemplate },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceTemplate",
})) as any;

export type GetServiceTemplateVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a major or minor version of a service template.
 */
export const getServiceTemplateVersion: API.OperationMethod<
  GetServiceTemplateVersionInput,
  GetServiceTemplateVersionOutput,
  GetServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { templateName: 0, majorVersion: 0, minorVersion: 0 },
    output: { serviceTemplateVersion: o_ServiceTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceTemplateVersion",
})) as any;

export type GetTemplateSyncConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detail data for a template sync configuration.
 */
export const getTemplateSyncConfig: API.OperationMethod<
  GetTemplateSyncConfigInput,
  GetTemplateSyncConfigOutput,
  GetTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { templateName: 0, templateType: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateSyncConfig",
})) as any;

export type GetTemplateSyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the status of a template sync.
 */
export const getTemplateSyncStatus: API.OperationMethod<
  GetTemplateSyncStatusInput,
  GetTemplateSyncStatusOutput,
  GetTemplateSyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { templateName: 0, templateType: 0, templateVersion: 0 },
    output: {
      latestSync: o_ResourceSyncAttempt,
      latestSuccessfulSync: o_ResourceSyncAttempt,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateSyncStatus",
})) as any;

export type ListComponentOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list of component Infrastructure as Code (IaC) outputs.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const listComponentOutputs: API.PaginatedOperationMethod<
  ListComponentOutputsInput,
  ListComponentOutputsOutput,
  ListComponentOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { componentName: 0, nextToken: 0, deploymentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListComponentProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List provisioned resources for a component with details.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const listComponentProvisionedResources: API.PaginatedOperationMethod<
  ListComponentProvisionedResourcesInput,
  ListComponentProvisionedResourcesOutput,
  ListComponentProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { componentName: 0, nextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List components with summary data. You can filter the result list by environment, service, or a single service instance.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsInput,
  ListComponentsOutput,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  ComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      environmentName: 0,
      serviceName: 0,
      serviceInstanceName: 0,
      maxResults: 0,
    },
    output: {
      components: D.list({
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        lastDeploymentAttemptedAt: D.ts,
        lastDeploymentSucceededAt: D.ts,
        deploymentStatusMessage: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "components",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List deployments. You can filter the result list by environment, service, or a single service instance.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      environmentName: 0,
      serviceName: 0,
      serviceInstanceName: 0,
      componentName: 0,
      maxResults: 0,
    },
    output: {
      deployments: D.list({
        targetResourceCreatedAt: D.ts,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        completedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentAccountConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * View a list of environment account connections.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const listEnvironmentAccountConnections: API.PaginatedOperationMethod<
  ListEnvironmentAccountConnectionsInput,
  ListEnvironmentAccountConnectionsOutput,
  ListEnvironmentAccountConnectionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentAccountConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      requestedBy: 0,
      environmentName: 0,
      statuses: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      environmentAccountConnections: D.list({
        requestedAt: D.ts,
        lastModifiedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentAccountConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentAccountConnections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the infrastructure as code outputs for your environment.
 */
export const listEnvironmentOutputs: API.PaginatedOperationMethod<
  ListEnvironmentOutputsInput,
  ListEnvironmentOutputsOutput,
  ListEnvironmentOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { environmentName: 0, nextToken: 0, deploymentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListEnvironmentProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the provisioned resources for your environment.
 */
export const listEnvironmentProvisionedResources: API.PaginatedOperationMethod<
  ListEnvironmentProvisionedResourcesInput,
  ListEnvironmentProvisionedResourcesOutput,
  ListEnvironmentProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { environmentName: 0, nextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List environments with detail data summaries.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      environmentTemplates: D.list({ templateName: 0, majorVersion: 0 }),
    },
    output: {
      environments: D.list({
        description: D.secret,
        createdAt: D.ts,
        lastDeploymentAttemptedAt: D.ts,
        lastDeploymentSucceededAt: D.ts,
        deploymentStatusMessage: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List environment templates.
 */
export const listEnvironmentTemplates: API.PaginatedOperationMethod<
  ListEnvironmentTemplatesInput,
  ListEnvironmentTemplatesOutput,
  ListEnvironmentTemplatesError,
  Credentials | HttpClient.HttpClient,
  EnvironmentTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: {
      templates: D.list({
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        displayName: D.secret,
        description: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentTemplateVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List major or minor versions of an environment template with detail data.
 */
export const listEnvironmentTemplateVersions: API.PaginatedOperationMethod<
  ListEnvironmentTemplateVersionsInput,
  ListEnvironmentTemplateVersionsOutput,
  ListEnvironmentTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, templateName: 0, majorVersion: 0 },
    output: {
      templateVersions: D.list({
        statusMessage: D.secret,
        description: D.secret,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List linked repositories with detail data.
 */
export const listRepositories: API.PaginatedOperationMethod<
  ListRepositoriesInput,
  ListRepositoriesOutput,
  ListRepositoriesError,
  Credentials | HttpClient.HttpClient,
  RepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositorySyncDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List repository sync definitions with detail data.
 */
export const listRepositorySyncDefinitions: API.PaginatedOperationMethod<
  ListRepositorySyncDefinitionsInput,
  ListRepositorySyncDefinitionsOutput,
  ListRepositorySyncDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RepositorySyncDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      repositoryProvider: 0,
      syncType: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositorySyncDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "syncDefinitions",
  } as const,
})) as any;

export type ListServiceInstanceOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list service of instance Infrastructure as Code (IaC) outputs.
 */
export const listServiceInstanceOutputs: API.PaginatedOperationMethod<
  ListServiceInstanceOutputsInput,
  ListServiceInstanceOutputsOutput,
  ListServiceInstanceOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceInstanceName: 0,
      serviceName: 0,
      nextToken: 0,
      deploymentId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceInstanceOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListServiceInstanceProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List provisioned resources for a service instance with details.
 */
export const listServiceInstanceProvisionedResources: API.PaginatedOperationMethod<
  ListServiceInstanceProvisionedResourcesInput,
  ListServiceInstanceProvisionedResourcesOutput,
  ListServiceInstanceProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0, serviceInstanceName: 0, nextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceInstanceProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListServiceInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List service instances with summary data. This action lists service instances of all
 * services in the Amazon Web Services account.
 */
export const listServiceInstances: API.PaginatedOperationMethod<
  ListServiceInstancesInput,
  ListServiceInstancesOutput,
  ListServiceInstancesError,
  Credentials | HttpClient.HttpClient,
  ServiceInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ key: 0, value: 0 }),
      sortBy: 0,
      sortOrder: 0,
    },
    output: {
      serviceInstances: D.list({
        createdAt: D.ts,
        lastDeploymentAttemptedAt: D.ts,
        lastDeploymentSucceededAt: D.ts,
        deploymentStatusMessage: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceInstances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicePipelineOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list of service pipeline Infrastructure as Code (IaC) outputs.
 */
export const listServicePipelineOutputs: API.PaginatedOperationMethod<
  ListServicePipelineOutputsInput,
  ListServicePipelineOutputsOutput,
  ListServicePipelineOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { serviceName: 0, nextToken: 0, deploymentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicePipelineOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListServicePipelineProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List provisioned resources for a service and pipeline with details.
 */
export const listServicePipelineProvisionedResources: API.PaginatedOperationMethod<
  ListServicePipelineProvisionedResourcesInput,
  ListServicePipelineProvisionedResourcesOutput,
  ListServicePipelineProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { serviceName: 0, nextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicePipelineProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List services with summaries of detail data.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: {
      services: D.list({
        description: D.secret,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        statusMessage: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "services",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List service templates with detail data.
 */
export const listServiceTemplates: API.PaginatedOperationMethod<
  ListServiceTemplatesInput,
  ListServiceTemplatesOutput,
  ListServiceTemplatesError,
  Credentials | HttpClient.HttpClient,
  ServiceTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: {
      templates: D.list({
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        displayName: D.secret,
        description: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceTemplateVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List major or minor versions of a service template with detail data.
 */
export const listServiceTemplateVersions: API.PaginatedOperationMethod<
  ListServiceTemplateVersionsInput,
  ListServiceTemplateVersionsOutput,
  ListServiceTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  ServiceTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, templateName: 0, majorVersion: 0 },
    output: {
      templateVersions: D.list({
        statusMessage: D.secret,
        description: D.secret,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for a resource. For more information, see Proton
 * resources and tagging in the *Proton User Guide*.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { resourceArn: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type NotifyResourceDeploymentStatusChangeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Notify Proton of status changes to a provisioned resource when you use self-managed provisioning.
 *
 * For more information, see Self-managed provisioning in the *Proton User Guide*.
 */
export const notifyResourceDeploymentStatusChange: API.OperationMethod<
  NotifyResourceDeploymentStatusChangeInput,
  NotifyResourceDeploymentStatusChangeOutput,
  NotifyResourceDeploymentStatusChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArn: 0,
      status: 0,
      outputs: D.list({ key: 0, valueString: 0 }),
      deploymentId: 0,
      statusMessage: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyResourceDeploymentStatusChange",
})) as any;

export type RejectEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In a management account, reject an environment account connection from another environment account.
 *
 * After you reject an environment account connection request, you *can't* accept or use the rejected environment account
 * connection.
 *
 * You *can’t* reject an environment account connection that's connected to an environment.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const rejectEnvironmentAccountConnection: API.OperationMethod<
  RejectEnvironmentAccountConnectionInput,
  RejectEnvironmentAccountConnectionOutput,
  RejectEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { environmentAccountConnection: o_EnvironmentAccountConnection },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectEnvironmentAccountConnection",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource. A tag is a key-value pair of metadata that you associate with an Proton resource.
 *
 * For more information, see Proton resources and tagging in
 * the *Proton User Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a customer tag from a resource. A tag is a key-value pair of metadata associated with an Proton resource.
 *
 * For more information, see Proton resources and tagging in
 * the *Proton User Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update Proton settings that are used for multiple services in the Amazon Web Services account.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsInput,
  UpdateAccountSettingsOutput,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineServiceRoleArn: 0,
      pipelineProvisioningRepository: i_RepositoryBranchInput,
      deletePipelineProvisioningRepository: 0,
      pipelineCodebuildRoleArn: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
})) as any;

export type UpdateComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a component.
 *
 * There are a few modes for updating a component. The `deploymentType` field defines the mode.
 *
 * You can't update a component while its deployment status, or the deployment status of a service instance attached to it, is
 * `IN_PROGRESS`.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const updateComponent: API.OperationMethod<
  UpdateComponentInput,
  UpdateComponentOutput,
  UpdateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      deploymentType: 0,
      description: 0,
      serviceName: 0,
      serviceInstanceName: 0,
      serviceSpec: 0,
      templateFile: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { component: o_Component },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponent",
})) as any;

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an environment.
 *
 * If the environment is associated with an environment account connection, *don't* update or include the
 * `protonServiceRoleArn` and `provisioningRepository` parameter to update or connect to an environment account connection.
 *
 * You can only update to a new environment account connection if that connection was created in the same environment account that the current
 * environment account connection was created in. The account connection must also be associated with the current environment.
 *
 * If the environment *isn't* associated with an environment account connection, *don't* update or include the
 * `environmentAccountConnectionId` parameter. You *can't* update or connect the environment to an environment account
 * connection if it *isn't* already associated with an environment connection.
 *
 * You can update either the `environmentAccountConnectionId` or `protonServiceRoleArn` parameter and value. You can’t update
 * both.
 *
 * If the environment was configured for Amazon Web Services-managed provisioning, omit the `provisioningRepository` parameter.
 *
 * If the environment was configured for self-managed provisioning, specify the `provisioningRepository` parameter and omit the
 * `protonServiceRoleArn` and `environmentAccountConnectionId` parameters.
 *
 * For more information, see Environments and Provisioning methods in the Proton User
 * Guide.
 *
 * There are four modes for updating an environment. The `deploymentType` field defines the mode.
 *
 * `NONE`
 *
 * In this mode, a deployment *doesn't* occur. Only the requested metadata parameters are updated.
 *
 * `CURRENT_VERSION`
 *
 * In this mode, the environment is deployed and updated with the new spec that you provide. Only requested parameters are updated.
 * *Don’t* include minor or major version parameters when you use this `deployment-type`.
 *
 * `MINOR_VERSION`
 *
 * In this mode, the environment is deployed and updated with the published, recommended (latest) minor version of the current major version in
 * use, by default. You can also specify a different minor version of the current major version in use.
 *
 * `MAJOR_VERSION`
 *
 * In this mode, the environment is deployed and updated with the published, recommended (latest) major and minor version of the current template,
 * by default. You can also specify a different major version that's higher than the major version in use and a minor version.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      spec: 0,
      templateMajorVersion: 0,
      templateMinorVersion: 0,
      protonServiceRoleArn: 0,
      deploymentType: 0,
      environmentAccountConnectionId: 0,
      provisioningRepository: i_RepositoryBranchInput,
      componentRoleArn: 0,
      codebuildRoleArn: 0,
    },
    output: { environment: o_Environment },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
})) as any;

export type UpdateEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In an environment account, update an environment account connection to use a new IAM role.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const updateEnvironmentAccountConnection: API.OperationMethod<
  UpdateEnvironmentAccountConnectionInput,
  UpdateEnvironmentAccountConnectionOutput,
  UpdateEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, roleArn: 0, componentRoleArn: 0, codebuildRoleArn: 0 },
    output: { environmentAccountConnection: o_EnvironmentAccountConnection },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentAccountConnection",
})) as any;

export type UpdateEnvironmentTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an environment template.
 */
export const updateEnvironmentTemplate: API.OperationMethod<
  UpdateEnvironmentTemplateInput,
  UpdateEnvironmentTemplateOutput,
  UpdateEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, displayName: 0, description: 0 },
    output: { environmentTemplate: o_EnvironmentTemplate },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentTemplate",
})) as any;

export type UpdateEnvironmentTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a major or minor version of an environment template.
 */
export const updateEnvironmentTemplateVersion: API.OperationMethod<
  UpdateEnvironmentTemplateVersionInput,
  UpdateEnvironmentTemplateVersionOutput,
  UpdateEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      templateName: 0,
      majorVersion: 0,
      minorVersion: 0,
      description: 0,
      status: 0,
    },
    output: { environmentTemplateVersion: o_EnvironmentTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentTemplateVersion",
})) as any;

export type UpdateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Edit a service description or use a spec to add and delete service instances.
 *
 * Existing service instances and the service pipeline *can't* be edited
 * using this API. They can only be deleted.
 *
 * Use the `description` parameter to modify the description.
 *
 * Edit the `spec` parameter to add or delete instances.
 *
 * You can't delete a service instance (remove it from the spec) if it has an attached
 * component.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const updateService: API.OperationMethod<
  UpdateServiceInput,
  UpdateServiceOutput,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, description: 0, spec: 0 },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
})) as any;

export type UpdateServiceInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a service instance.
 *
 * There are a few modes for updating a service instance. The `deploymentType`
 * field defines the mode.
 *
 * You can't update a service instance while its deployment status, or the deployment
 * status of a component attached to it, is `IN_PROGRESS`.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const updateServiceInstance: API.OperationMethod<
  UpdateServiceInstanceInput,
  UpdateServiceInstanceOutput,
  UpdateServiceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      serviceName: 0,
      deploymentType: 0,
      spec: 0,
      templateMajorVersion: 0,
      templateMinorVersion: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { serviceInstance: o_ServiceInstance },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceInstance",
})) as any;

export type UpdateServicePipelineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the service pipeline.
 *
 * There are four modes for updating a service pipeline. The `deploymentType`
 * field defines the mode.
 *
 * `NONE`
 *
 * In this mode, a deployment *doesn't* occur. Only the requested
 * metadata parameters are updated.
 *
 * `CURRENT_VERSION`
 *
 * In this mode, the service pipeline is deployed and updated with the new spec that
 * you provide. Only requested parameters are updated. *Don’t* include
 * major or minor version parameters when you use this `deployment-type`.
 *
 * `MINOR_VERSION`
 *
 * In this mode, the service pipeline is deployed and updated with the published,
 * recommended (latest) minor version of the current major version in use, by default. You
 * can specify a different minor version of the current major version in use.
 *
 * `MAJOR_VERSION`
 *
 * In this mode, the service pipeline is deployed and updated with the published,
 * recommended (latest) major and minor version of the current template by default. You can
 * specify a different major version that's higher than the major version in use and a
 * minor version.
 */
export const updateServicePipeline: API.OperationMethod<
  UpdateServicePipelineInput,
  UpdateServicePipelineOutput,
  UpdateServicePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      spec: 0,
      deploymentType: 0,
      templateMajorVersion: 0,
      templateMinorVersion: 0,
    },
    output: { pipeline: o_ServicePipeline },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServicePipeline",
})) as any;

export type UpdateServiceSyncBlockerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the service sync blocker by resolving it.
 */
export const updateServiceSyncBlocker: API.OperationMethod<
  UpdateServiceSyncBlockerInput,
  UpdateServiceSyncBlockerOutput,
  UpdateServiceSyncBlockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, resolvedReason: 0 },
    output: { serviceSyncBlocker: o_SyncBlocker },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSyncBlocker",
})) as any;

export type UpdateServiceSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the Proton Ops config file.
 */
export const updateServiceSyncConfig: API.OperationMethod<
  UpdateServiceSyncConfigInput,
  UpdateServiceSyncConfigOutput,
  UpdateServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceName: 0,
      repositoryProvider: 0,
      repositoryName: 0,
      branch: 0,
      filePath: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSyncConfig",
})) as any;

export type UpdateServiceTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a service template.
 */
export const updateServiceTemplate: API.OperationMethod<
  UpdateServiceTemplateInput,
  UpdateServiceTemplateOutput,
  UpdateServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, displayName: 0, description: 0 },
    output: { serviceTemplate: o_ServiceTemplate },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceTemplate",
})) as any;

export type UpdateServiceTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a major or minor version of a service template.
 */
export const updateServiceTemplateVersion: API.OperationMethod<
  UpdateServiceTemplateVersionInput,
  UpdateServiceTemplateVersionOutput,
  UpdateServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      templateName: 0,
      majorVersion: 0,
      minorVersion: 0,
      description: 0,
      status: 0,
      compatibleEnvironmentTemplates: D.list(
        i_CompatibleEnvironmentTemplateInput,
      ),
      supportedComponentSources: 0,
    },
    output: { serviceTemplateVersion: o_ServiceTemplateVersion },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceTemplateVersion",
})) as any;

export type UpdateTemplateSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update template sync configuration parameters, except for the `templateName` and `templateType`. Repository details
 * (branch, name, and provider) should be of a linked repository. A linked repository is a repository that has been registered with Proton. For
 * more information, see CreateRepository.
 */
export const updateTemplateSyncConfig: API.OperationMethod<
  UpdateTemplateSyncConfigInput,
  UpdateTemplateSyncConfigOutput,
  UpdateTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      templateName: 0,
      templateType: 0,
      repositoryProvider: 0,
      repositoryName: 0,
      branch: 0,
      subdirectory: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplateSyncConfig",
})) as any;

const i_CompatibleEnvironmentTemplateInput: D.LazyStruct = () => ({
  templateName: 0,
  majorVersion: 0,
});
const i_RepositoryBranchInput: D.LazyStruct = () => ({
  provider: 0,
  name: 0,
  branch: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TemplateVersionSourceInput: D.LazyStruct = () => ({
  s3: { bucket: 0, key: 0 },
});
const o_Component: D.LazyStruct = () => ({
  description: D.secret,
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  lastDeploymentAttemptedAt: D.ts,
  lastDeploymentSucceededAt: D.ts,
  deploymentStatusMessage: D.secret,
  serviceSpec: D.secret,
});
const o_Deployment: D.LazyStruct = () => ({
  targetResourceCreatedAt: D.ts,
  deploymentStatusMessage: D.secret,
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  completedAt: D.ts,
  initialState: o_DeploymentState,
  targetState: o_DeploymentState,
});
const o_Environment: D.LazyStruct = () => ({
  description: D.secret,
  createdAt: D.ts,
  lastDeploymentAttemptedAt: D.ts,
  lastDeploymentSucceededAt: D.ts,
  deploymentStatusMessage: D.secret,
  spec: D.secret,
});
const o_EnvironmentAccountConnection: D.LazyStruct = () => ({
  requestedAt: D.ts,
  lastModifiedAt: D.ts,
});
const o_EnvironmentTemplate: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  displayName: D.secret,
  description: D.secret,
});
const o_EnvironmentTemplateVersion: D.LazyStruct = () => ({
  statusMessage: D.secret,
  description: D.secret,
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  schema: D.secret,
});
const o_ResourceSyncAttempt: D.LazyStruct = () => ({
  startedAt: D.ts,
  events: D.list({ time: D.ts }),
});
const o_Service: D.LazyStruct = () => ({
  description: D.secret,
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  statusMessage: D.secret,
  spec: D.secret,
  pipeline: o_ServicePipeline,
});
const o_ServiceInstance: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastDeploymentAttemptedAt: D.ts,
  lastDeploymentSucceededAt: D.ts,
  deploymentStatusMessage: D.secret,
  spec: D.secret,
});
const o_ServicePipeline: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastDeploymentAttemptedAt: D.ts,
  lastDeploymentSucceededAt: D.ts,
  deploymentStatusMessage: D.secret,
  spec: D.secret,
});
const o_ServiceTemplate: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  displayName: D.secret,
  description: D.secret,
});
const o_ServiceTemplateVersion: D.LazyStruct = () => ({
  statusMessage: D.secret,
  description: D.secret,
  createdAt: D.ts,
  lastModifiedAt: D.ts,
  schema: D.secret,
});
const o_SyncBlocker: D.LazyStruct = () => ({
  createdAt: D.ts,
  resolvedAt: D.ts,
});
const o_DeploymentState: D.LazyStruct = () => ({
  serviceInstance: { spec: D.secret },
  environment: { spec: D.secret },
  servicePipeline: { spec: D.secret },
  component: { serviceSpec: D.secret, templateFile: D.secret },
});
