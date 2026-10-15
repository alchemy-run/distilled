import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Proton",
  serviceShapeName: "AwsProton20200720",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "proton" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-07-20");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
            return e(`https://proton-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://proton.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://proton.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://proton.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type CompatibleEnvironmentTemplateInputList = CompatibleEnvironmentTemplateInput[];
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
export type EnvironmentAccountConnectionSummaryList = EnvironmentAccountConnectionSummary[];
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
export type EnvironmentTemplateVersionSummaryList = EnvironmentTemplateVersionSummary[];
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
  input: __S(744, __c93, 0) as any as S.Schema<AcceptEnvironmentAccountConnectionInput>,
  output: __S(760, __c95, 0) as any as S.Schema<AcceptEnvironmentAccountConnectionOutput>,
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
}));

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
  input: __S(856, __c107, 0) as any as S.Schema<CancelComponentDeploymentInput>,
  output: __S(872, __c109, 0) as any as S.Schema<CancelComponentDeploymentOutput>,
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
}));

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
  input: __S(960, __c120, 0) as any as S.Schema<CancelEnvironmentDeploymentInput>,
  output: __S(984, __c123, 0) as any as S.Schema<CancelEnvironmentDeploymentOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CancelServiceInstanceDeploymentInput>,
  output: __S(9, __c1, 1) as any as S.Schema<CancelServiceInstanceDeploymentOutput>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<CancelServicePipelineDeploymentInput>,
  output: __S(32, __c4, 0) as any as S.Schema<CancelServicePipelineDeploymentOutput>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<CreateComponentInput>,
  output: __S(872, __c109, 0) as any as S.Schema<CreateComponentOutput>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateEnvironmentInput>,
  output: __S(984, __c123, 0) as any as S.Schema<CreateEnvironmentOutput>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<CreateEnvironmentAccountConnectionInput>,
  output: __S(760, __c95, 0) as any as S.Schema<CreateEnvironmentAccountConnectionOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<CreateEnvironmentTemplateInput>,
  output: __S(96, __c12, 0) as any as S.Schema<CreateEnvironmentTemplateOutput>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<CreateEnvironmentTemplateVersionInput>,
  output: __S(128, __c16, 0) as any as S.Schema<CreateEnvironmentTemplateVersionOutput>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<CreateRepositoryInput>,
  output: __S(152, __c19, 0) as any as S.Schema<CreateRepositoryOutput>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<CreateServiceInput>,
  output: __S(176, __c22, 0) as any as S.Schema<CreateServiceOutput>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<CreateServiceInstanceInput>,
  output: __S(9, __c1, 1) as any as S.Schema<CreateServiceInstanceOutput>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<CreateServiceSyncConfigInput>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateServiceSyncConfigOutput>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<CreateServiceTemplateInput>,
  output: __S(224, __c28, 0) as any as S.Schema<CreateServiceTemplateOutput>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<CreateServiceTemplateVersionInput>,
  output: __S(264, __c33, 0) as any as S.Schema<CreateServiceTemplateVersionOutput>,
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
}));

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
 * bundle change, a new major or minor version of its template is created, if the version doesn't already exist. For more information, see Template sync configurations in the Proton
 * User Guide.
 */
export const createTemplateSyncConfig: API.OperationMethod<
  CreateTemplateSyncConfigInput,
  CreateTemplateSyncConfigOutput,
  CreateTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<CreateTemplateSyncConfigInput>,
  output: __S(281, __c35, 1) as any as S.Schema<CreateTemplateSyncConfigOutput>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeleteComponentInput>,
  output: __S(296, __c37, 0) as any as S.Schema<DeleteComponentOutput>,
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
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteDeploymentInput>,
  output: __S(317, __c39, 5) as any as S.Schema<DeleteDeploymentOutput>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DeleteEnvironmentInput>,
  output: __S(321, __c40, 1) as any as S.Schema<DeleteEnvironmentOutput>,
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
}));

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
 * After you delete an environment account connection that's in use by an Proton environment, Proton *can't* manage the
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
  input: __S(328, __c41, 0) as any as S.Schema<DeleteEnvironmentAccountConnectionInput>,
  output: __S(329, __c41, 1) as any as S.Schema<DeleteEnvironmentAccountConnectionOutput>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeleteEnvironmentTemplateInput>,
  output: __S(337, __c42, 1) as any as S.Schema<DeleteEnvironmentTemplateOutput>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DeleteEnvironmentTemplateVersionInput>,
  output: __S(345, __c43, 1) as any as S.Schema<DeleteEnvironmentTemplateVersionOutput>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DeleteRepositoryInput>,
  output: __S(353, __c44, 1) as any as S.Schema<DeleteRepositoryOutput>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DeleteServiceInput>,
  output: __S(368, __c46, 0) as any as S.Schema<DeleteServiceOutput>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<DeleteServiceSyncConfigInput>,
  output: __S(201, __c25, 1) as any as S.Schema<DeleteServiceSyncConfigOutput>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<DeleteServiceTemplateInput>,
  output: __S(385, __c48, 1) as any as S.Schema<DeleteServiceTemplateOutput>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<DeleteServiceTemplateVersionInput>,
  output: __S(393, __c49, 1) as any as S.Schema<DeleteServiceTemplateVersionOutput>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<DeleteTemplateSyncConfigInput>,
  output: __S(281, __c35, 1) as any as S.Schema<DeleteTemplateSyncConfigOutput>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<GetAccountSettingsInput>,
  output: __S(409, __c51, 1) as any as S.Schema<GetAccountSettingsOutput>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<GetComponentInput>,
  output: __S(296, __c37, 0) as any as S.Schema<GetComponentOutput>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<GetDeploymentInput>,
  output: __S(317, __c39, 5) as any as S.Schema<GetDeploymentOutput>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<GetEnvironmentInput>,
  output: __S(984, __c123, 0) as any as S.Schema<GetEnvironmentOutput>,
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
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<GetEnvironmentAccountConnectionInput>,
  output: __S(760, __c95, 0) as any as S.Schema<GetEnvironmentAccountConnectionOutput>,
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
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<GetEnvironmentTemplateInput>,
  output: __S(96, __c12, 0) as any as S.Schema<GetEnvironmentTemplateOutput>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<GetEnvironmentTemplateVersionInput>,
  output: __S(128, __c16, 0) as any as S.Schema<GetEnvironmentTemplateVersionOutput>,
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
}));

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
  input: __S(472, __c59, 0) as any as S.Schema<GetRepositoryInput>,
  output: __S(152, __c19, 0) as any as S.Schema<GetRepositoryOutput>,
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
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<GetRepositorySyncStatusInput>,
  output: __S(482, __c60, 2) as any as S.Schema<GetRepositorySyncStatusOutput>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<GetResourcesSummaryInput>,
  output: __S(499, __c62, 3) as any as S.Schema<GetResourcesSummaryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesSummary",
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<GetServiceInput>,
  output: __S(368, __c46, 0) as any as S.Schema<GetServiceOutput>,
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
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<GetServiceInstanceInput>,
  output: __S(9, __c1, 1) as any as S.Schema<GetServiceInstanceOutput>,
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
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<GetServiceInstanceSyncStatusInput>,
  output: __S(530, __c66, 2) as any as S.Schema<GetServiceInstanceSyncStatusOutput>,
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
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetServiceSyncBlockerSummaryInput>,
  output: __S(539, __c67, 3) as any as S.Schema<GetServiceSyncBlockerSummaryOutput>,
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
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<GetServiceSyncConfigInput>,
  output: __S(201, __c25, 1) as any as S.Schema<GetServiceSyncConfigOutput>,
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
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<GetServiceTemplateInput>,
  output: __S(224, __c28, 0) as any as S.Schema<GetServiceTemplateOutput>,
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
}));

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
  input: __S(568, __c71, 0) as any as S.Schema<GetServiceTemplateVersionInput>,
  output: __S(264, __c33, 0) as any as S.Schema<GetServiceTemplateVersionOutput>,
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
}));

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
  input: __S(576, __c72, 0) as any as S.Schema<GetTemplateSyncConfigInput>,
  output: __S(281, __c35, 1) as any as S.Schema<GetTemplateSyncConfigOutput>,
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
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<GetTemplateSyncStatusInput>,
  output: __S(530, __c66, 2) as any as S.Schema<GetTemplateSyncStatusOutput>,
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
}));

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
  input: __S(592, __c74, 0) as any as S.Schema<ListComponentOutputsInput>,
  output: __S(600, __c75, 0) as any as S.Schema<ListComponentOutputsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "outputs" } as const,
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
  input: __S(616, __c77, 0) as any as S.Schema<ListComponentProvisionedResourcesInput>,
  output: __S(626, __c78, 2) as any as S.Schema<ListComponentProvisionedResourcesOutput>,
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
  input: __S(632, __c79, 0) as any as S.Schema<ListComponentsInput>,
  output: __S(635, __c79, 3) as any as S.Schema<ListComponentsOutput>,
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
  input: __S(640, __c80, 0) as any as S.Schema<ListDeploymentsInput>,
  output: __S(643, __c80, 3) as any as S.Schema<ListDeploymentsOutput>,
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
  input: __S(648, __c81, 0) as any as S.Schema<ListEnvironmentAccountConnectionsInput>,
  output: __S(651, __c81, 3) as any as S.Schema<ListEnvironmentAccountConnectionsOutput>,
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
  input: __S(656, __c82, 0) as any as S.Schema<ListEnvironmentOutputsInput>,
  output: __S(600, __c75, 0) as any as S.Schema<ListEnvironmentOutputsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "outputs" } as const,
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
  input: __S(664, __c83, 0) as any as S.Schema<ListEnvironmentProvisionedResourcesInput>,
  output: __S(626, __c78, 2) as any as S.Schema<ListEnvironmentProvisionedResourcesOutput>,
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
  input: __S(672, __c84, 0) as any as S.Schema<ListEnvironmentsInput>,
  output: __S(675, __c84, 3) as any as S.Schema<ListEnvironmentsOutput>,
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
  input: __S(680, __c85, 0) as any as S.Schema<ListEnvironmentTemplatesInput>,
  output: __S(683, __c85, 3) as any as S.Schema<ListEnvironmentTemplatesOutput>,
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
  input: __S(688, __c86, 0) as any as S.Schema<ListEnvironmentTemplateVersionsInput>,
  output: __S(698, __c87, 2) as any as S.Schema<ListEnvironmentTemplateVersionsOutput>,
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
  input: __S(704, __c88, 0) as any as S.Schema<ListRepositoriesInput>,
  output: __S(707, __c88, 3) as any as S.Schema<ListRepositoriesOutput>,
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
  input: __S(712, __c89, 0) as any as S.Schema<ListRepositorySyncDefinitionsInput>,
  output: __S(715, __c89, 3) as any as S.Schema<ListRepositorySyncDefinitionsOutput>,
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
  input: __S(720, __c90, 0) as any as S.Schema<ListServiceInstanceOutputsInput>,
  output: __S(600, __c75, 0) as any as S.Schema<ListServiceInstanceOutputsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "outputs" } as const,
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
  input: __S(728, __c91, 0) as any as S.Schema<ListServiceInstanceProvisionedResourcesInput>,
  output: __S(626, __c78, 2) as any as S.Schema<ListServiceInstanceProvisionedResourcesOutput>,
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
  input: __S(738, __c92, 2) as any as S.Schema<ListServiceInstancesInput>,
  output: __S(741, __c92, 5) as any as S.Schema<ListServiceInstancesOutput>,
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
  input: __S(768, __c96, 0) as any as S.Schema<ListServicePipelineOutputsInput>,
  output: __S(600, __c75, 0) as any as S.Schema<ListServicePipelineOutputsOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "outputs" } as const,
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
  input: __S(776, __c97, 0) as any as S.Schema<ListServicePipelineProvisionedResourcesInput>,
  output: __S(626, __c78, 2) as any as S.Schema<ListServicePipelineProvisionedResourcesOutput>,
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
  input: __S(784, __c98, 0) as any as S.Schema<ListServicesInput>,
  output: __S(787, __c98, 3) as any as S.Schema<ListServicesOutput>,
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
  input: __S(792, __c99, 0) as any as S.Schema<ListServiceTemplatesInput>,
  output: __S(795, __c99, 3) as any as S.Schema<ListServiceTemplatesOutput>,
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
  input: __S(800, __c100, 0) as any as S.Schema<ListServiceTemplateVersionsInput>,
  output: __S(698, __c87, 2) as any as S.Schema<ListServiceTemplateVersionsOutput>,
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
  input: __S(808, __c101, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(809, __c101, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
  input: __S(816, __c102, 0) as any as S.Schema<NotifyResourceDeploymentStatusChangeInput>,
  output: __S(824, __c103, 0) as any as S.Schema<NotifyResourceDeploymentStatusChangeOutput>,
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
}));

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
 * You *can't* reject an environment account connection that's connected to an environment.
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
  input: __S(832, __c104, 0) as any as S.Schema<RejectEnvironmentAccountConnectionInput>,
  output: __S(760, __c95, 0) as any as S.Schema<RejectEnvironmentAccountConnectionOutput>,
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
}));

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
  input: __S(840, __c105, 0) as any as S.Schema<TagResourceInput>,
  output: __S(824, __c103, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(848, __c106, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(824, __c103, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(880, __c110, 0) as any as S.Schema<UpdateAccountSettingsInput>,
  output: __S(881, __c110, 1) as any as S.Schema<UpdateAccountSettingsOutput>,
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
}));

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
  input: __S(888, __c111, 0) as any as S.Schema<UpdateComponentInput>,
  output: __S(872, __c109, 0) as any as S.Schema<UpdateComponentOutput>,
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
}));

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
 * You can update either the `environmentAccountConnectionId` or `protonServiceRoleArn` parameter and value. You can't update
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
 * *Don't* include minor or major version parameters when you use this `deployment-type`.
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
  input: __S(896, __c112, 0) as any as S.Schema<UpdateEnvironmentInput>,
  output: __S(984, __c123, 0) as any as S.Schema<UpdateEnvironmentOutput>,
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
}));

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
  input: __S(904, __c113, 0) as any as S.Schema<UpdateEnvironmentAccountConnectionInput>,
  output: __S(760, __c95, 0) as any as S.Schema<UpdateEnvironmentAccountConnectionOutput>,
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
}));

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
  input: __S(912, __c114, 0) as any as S.Schema<UpdateEnvironmentTemplateInput>,
  output: __S(96, __c12, 0) as any as S.Schema<UpdateEnvironmentTemplateOutput>,
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
}));

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
  input: __S(920, __c115, 0) as any as S.Schema<UpdateEnvironmentTemplateVersionInput>,
  output: __S(128, __c16, 0) as any as S.Schema<UpdateEnvironmentTemplateVersionOutput>,
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
}));

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
  input: __S(928, __c116, 0) as any as S.Schema<UpdateServiceInput>,
  output: __S(176, __c22, 0) as any as S.Schema<UpdateServiceOutput>,
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
}));

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
  input: __S(936, __c117, 0) as any as S.Schema<UpdateServiceInstanceInput>,
  output: __S(9, __c1, 1) as any as S.Schema<UpdateServiceInstanceOutput>,
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
}));

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
 * you provide. Only requested parameters are updated. *Don't* include
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
  input: __S(944, __c118, 0) as any as S.Schema<UpdateServicePipelineInput>,
  output: __S(32, __c4, 0) as any as S.Schema<UpdateServicePipelineOutput>,
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
}));

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
  input: __S(952, __c119, 0) as any as S.Schema<UpdateServiceSyncBlockerInput>,
  output: __S(953, __c119, 1) as any as S.Schema<UpdateServiceSyncBlockerOutput>,
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
}));

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
  input: __S(992, __c124, 0) as any as S.Schema<UpdateServiceSyncConfigInput>,
  output: __S(201, __c25, 1) as any as S.Schema<UpdateServiceSyncConfigOutput>,
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
}));

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
  input: __S(1000, __c125, 0) as any as S.Schema<UpdateServiceTemplateInput>,
  output: __S(224, __c28, 0) as any as S.Schema<UpdateServiceTemplateOutput>,
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
}));

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
  input: __S(1008, __c126, 0) as any as S.Schema<UpdateServiceTemplateVersionInput>,
  output: __S(264, __c33, 0) as any as S.Schema<UpdateServiceTemplateVersionOutput>,
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
}));

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
  input: __S(1016, __c127, 0) as any as S.Schema<UpdateTemplateSyncConfigInput>,
  output: __S(281, __c35, 1) as any as S.Schema<UpdateTemplateSyncConfigOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceInstanceName: S.String, serviceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelServiceInstanceDeploymentInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          serviceName: S.String,
          environmentName: S.String,
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          spec: S.optional(SensitiveString),
          lastClientRequestToken: S.optional(S.String),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceInstance" });
    case 1:
      return S.suspend(() => S.Struct({ serviceInstance: __S(8, __c1, 0) })).annotate({
        identifier: "CancelServiceInstanceDeploymentOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelServicePipelineDeploymentInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          spec: S.optional(SensitiveString),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServicePipeline" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ pipeline: __S(24, __c3, 0) })).annotate({
        identifier: "CancelServicePipelineDeploymentOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          environmentName: S.optional(S.String),
          templateFile: SensitiveString,
          manifest: SensitiveString,
          serviceSpec: S.optional(SensitiveString),
          tags: S.optional(__S(49, __c6, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateComponentInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(48, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.optional(S.String),
          description: S.optional(SensitiveString),
          spec: SensitiveString,
          protonServiceRoleArn: S.optional(S.String),
          environmentAccountConnectionId: S.optional(S.String),
          tags: S.optional(__S(49, __c6, 1)),
          provisioningRepository: S.optional(__S(64, __c8, 0)),
          componentRoleArn: S.optional(S.String),
          codebuildRoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ provider: S.String, name: S.String, branch: S.String }),
      ).annotate({ identifier: "RepositoryBranchInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          managementAccountId: S.String,
          roleArn: S.optional(S.String),
          environmentName: S.String,
          tags: S.optional(__S(49, __c6, 1)),
          componentRoleArn: S.optional(S.String),
          codebuildRoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentAccountConnectionInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          encryptionKey: S.optional(S.String),
          provisioning: S.optional(S.String),
          tags: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentTemplateInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          recommendedVersion: S.optional(S.String),
          encryptionKey: S.optional(S.String),
          provisioning: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentTemplate" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ environmentTemplate: __S(88, __c11, 0) })).annotate({
        identifier: "CreateEnvironmentTemplateOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          templateName: S.String,
          description: S.optional(SensitiveString),
          majorVersion: S.optional(S.String),
          source: __S(113, __c14, 1),
          tags: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentTemplateVersionInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucket: S.String, key: S.String })).annotate({
        identifier: "S3ObjectSource",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(112, __c14, 0) })]);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          majorVersion: S.String,
          minorVersion: S.String,
          recommendedMinorVersion: S.optional(S.String),
          status: S.String,
          statusMessage: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          schema: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EnvironmentTemplateVersion" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ environmentTemplateVersion: __S(120, __c15, 0) })).annotate(
        { identifier: "CreateEnvironmentTemplateVersionOutput" },
      );
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          provider: S.String,
          name: S.String,
          connectionArn: S.String,
          encryptionKey: S.optional(S.String),
          tags: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRepositoryInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          provider: S.String,
          name: S.String,
          connectionArn: S.String,
          encryptionKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "Repository" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ repository: __S(144, __c18, 0) })).annotate({
        identifier: "CreateRepositoryOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.optional(S.String),
          spec: SensitiveString,
          repositoryConnectionArn: S.optional(S.String),
          repositoryId: S.optional(S.String),
          branchName: S.optional(S.String),
          tags: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          arn: S.String,
          templateName: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          statusMessage: S.optional(SensitiveString),
          spec: SensitiveString,
          pipeline: S.optional(__S(24, __c3, 0)),
          repositoryConnectionArn: S.optional(S.String),
          repositoryId: S.optional(S.String),
          branchName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Service" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ service: __S(168, __c21, 0) })).annotate({
        identifier: "CreateServiceOutput",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          serviceName: S.String,
          spec: SensitiveString,
          templateMajorVersion: S.optional(S.String),
          templateMinorVersion: S.optional(S.String),
          tags: S.optional(__S(49, __c6, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceInstanceInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          repositoryProvider: S.String,
          repositoryName: S.String,
          branch: S.String,
          filePath: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceSyncConfigInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          repositoryProvider: S.String,
          repositoryName: S.String,
          branch: S.String,
          filePath: S.String,
        }),
      ).annotate({ identifier: "ServiceSyncConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceSyncConfig: S.optional(__S(200, __c25, 0)) }),
      ).annotate({ identifier: "CreateServiceSyncConfigOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          encryptionKey: S.optional(S.String),
          pipelineProvisioning: S.optional(S.String),
          tags: S.optional(__S(49, __c6, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceTemplateInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          recommendedVersion: S.optional(S.String),
          encryptionKey: S.optional(S.String),
          pipelineProvisioning: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceTemplate" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ serviceTemplate: __S(216, __c27, 0) })).annotate({
        identifier: "CreateServiceTemplateOutput",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          templateName: S.String,
          description: S.optional(SensitiveString),
          majorVersion: S.optional(S.String),
          source: __S(113, __c14, 1),
          compatibleEnvironmentTemplates: __S(249, __c31, 1),
          tags: S.optional(__S(49, __c6, 1)),
          supportedComponentSources: S.optional(__S(240, __c30, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceTemplateVersionInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ templateName: S.String, majorVersion: S.String })).annotate(
        { identifier: "CompatibleEnvironmentTemplateInput" },
      );
    case 1:
      return S.Array(__S(248, __c31, 0));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          majorVersion: S.String,
          minorVersion: S.String,
          recommendedMinorVersion: S.optional(S.String),
          status: S.String,
          statusMessage: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          compatibleEnvironmentTemplates: __S(249, __c31, 1),
          schema: S.optional(SensitiveString),
          supportedComponentSources: S.optional(__S(240, __c30, 0)),
        }),
      ).annotate({ identifier: "ServiceTemplateVersion" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ serviceTemplateVersion: __S(256, __c32, 0) })).annotate({
        identifier: "CreateServiceTemplateVersionOutput",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          templateType: S.String,
          repositoryProvider: S.String,
          repositoryName: S.String,
          branch: S.String,
          subdirectory: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTemplateSyncConfigInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          templateType: S.String,
          repositoryProvider: S.String,
          repositoryName: S.String,
          branch: S.String,
          subdirectory: S.optional(S.String),
        }),
      ).annotate({ identifier: "TemplateSyncConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ templateSyncConfig: S.optional(__S(280, __c35, 0)) }),
      ).annotate({ identifier: "CreateTemplateSyncConfigOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteComponentInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ component: S.optional(__S(864, __c108, 0)) })).annotate({
        identifier: "DeleteComponentOutput",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeploymentInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spec: SensitiveString,
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
          lastSuccessfulComponentDeploymentIds: S.optional(__S(240, __c30, 0)),
          lastSuccessfulEnvironmentDeploymentId: S.optional(S.String),
          lastSuccessfulServicePipelineDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceInstanceState" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spec: S.optional(SensitiveString),
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
        }),
      ).annotate({ identifier: "EnvironmentState" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          serviceSpec: S.optional(SensitiveString),
          templateFile: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ComponentState" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ serviceInstance: __S(312, __c39, 0) }),
        /*@__PURE__*/ S.Struct({ environment: __S(313, __c39, 1) }),
        /*@__PURE__*/ S.Struct({ servicePipeline: __S(313, __c39, 1) }),
        /*@__PURE__*/ S.Struct({ component: __S(314, __c39, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          targetArn: S.String,
          targetResourceCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          targetResourceType: S.String,
          environmentName: S.String,
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          componentName: S.optional(S.String),
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
          initialState: S.optional(__S(315, __c39, 3)),
          targetState: S.optional(__S(315, __c39, 3)),
        }),
      ).annotate({ identifier: "Deployment" });
    case 5:
      return S.suspend(() => S.Struct({ deployment: S.optional(__S(316, __c39, 4)) })).annotate({
        identifier: "DeleteDeploymentOutput",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEnvironmentInput" });
    case 1:
      return S.suspend(() => S.Struct({ environment: S.optional(__S(976, __c122, 0)) })).annotate({
        identifier: "DeleteEnvironmentOutput",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEnvironmentAccountConnectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ environmentAccountConnection: S.optional(__S(752, __c94, 0)) }),
      ).annotate({ identifier: "DeleteEnvironmentAccountConnectionOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEnvironmentTemplateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ environmentTemplate: S.optional(__S(88, __c11, 0)) }),
      ).annotate({ identifier: "DeleteEnvironmentTemplateOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String, majorVersion: S.String, minorVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEnvironmentTemplateVersionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ environmentTemplateVersion: S.optional(__S(120, __c15, 0)) }),
      ).annotate({ identifier: "DeleteEnvironmentTemplateVersionOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ provider: S.String, name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRepositoryInput" });
    case 1:
      return S.suspend(() => S.Struct({ repository: S.optional(__S(144, __c18, 0)) })).annotate({
        identifier: "DeleteRepositoryOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ service: S.optional(__S(168, __c21, 0)) })).annotate({
        identifier: "DeleteServiceOutput",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceSyncConfigInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceTemplateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceTemplate: S.optional(__S(216, __c27, 0)) }),
      ).annotate({ identifier: "DeleteServiceTemplateOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String, majorVersion: S.String, minorVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceTemplateVersionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceTemplateVersion: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "DeleteServiceTemplateVersionOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String, templateType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTemplateSyncConfigInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountSettingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accountSettings: S.optional(__S(416, __c52, 0)) }),
      ).annotate({ identifier: "GetAccountSettingsOutput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineServiceRoleArn: S.optional(S.String),
          pipelineProvisioningRepository: S.optional(__S(968, __c121, 0)),
          pipelineCodebuildRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountSettings" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComponentInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          environmentName: S.optional(S.String),
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          componentName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDeploymentInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnvironmentInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnvironmentAccountConnectionInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnvironmentTemplateInput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String, majorVersion: S.String, minorVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnvironmentTemplateVersionInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ provider: S.String, name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositoryInput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          repositoryProvider: S.String,
          branch: S.String,
          syncType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRepositorySyncStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          events: __S(489, __c61, 1),
        }),
      ).annotate({ identifier: "RepositorySyncAttempt" });
    case 2:
      return S.suspend(() => S.Struct({ latestSync: S.optional(__S(481, __c60, 1)) })).annotate({
        identifier: "GetRepositorySyncStatusOutput",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          externalId: S.optional(S.String),
          time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          event: S.String,
        }),
      ).annotate({ identifier: "RepositorySyncEvent" });
    case 1:
      return S.Array(__S(488, __c61, 0));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcesSummaryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          total: S.Number,
          failed: S.optional(S.Number),
          upToDate: S.optional(S.Number),
          behindMajor: S.optional(S.Number),
          behindMinor: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResourceCountsSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          components: S.optional(__S(497, __c62, 1)),
          environments: S.optional(__S(497, __c62, 1)),
          environmentTemplates: S.optional(__S(497, __c62, 1)),
          serviceInstances: S.optional(__S(497, __c62, 1)),
          services: S.optional(__S(497, __c62, 1)),
          serviceTemplates: S.optional(__S(497, __c62, 1)),
          pipelines: S.optional(__S(497, __c62, 1)),
        }),
      ).annotate({ identifier: "CountsSummary" });
    case 3:
      return S.suspend(() => S.Struct({ counts: __S(498, __c62, 2) })).annotate({
        identifier: "GetResourcesSummaryOutput",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, serviceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceInstanceInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String, serviceInstanceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceInstanceSyncStatusInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          repositoryProvider: S.String,
          sha: S.String,
          directory: S.String,
          branch: S.String,
        }),
      ).annotate({ identifier: "Revision" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          initialRevision: __S(528, __c66, 0),
          targetRevision: __S(528, __c66, 0),
          target: S.String,
          startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          events: __S(489, __c61, 1),
        }),
      ).annotate({ identifier: "ResourceSyncAttempt" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          latestSync: S.optional(__S(529, __c66, 1)),
          latestSuccessfulSync: S.optional(__S(529, __c66, 1)),
          desiredState: S.optional(__S(528, __c66, 0)),
        }),
      ).annotate({ identifier: "GetServiceInstanceSyncStatusOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String, serviceInstanceName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceSyncBlockerSummaryInput" });
    case 1:
      return S.Array(__S(544, __c68, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          serviceInstanceName: S.optional(S.String),
          latestBlockers: S.optional(__S(537, __c67, 1)),
        }),
      ).annotate({ identifier: "ServiceSyncBlockerSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({ serviceSyncBlockerSummary: S.optional(__S(538, __c67, 2)) }),
      ).annotate({ identifier: "GetServiceSyncBlockerSummaryOutput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          status: S.String,
          createdReason: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          contexts: S.optional(__S(49, __c6, 1)),
          resolvedReason: S.optional(S.String),
          resolvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SyncBlocker" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceSyncConfigInput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceTemplateInput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String, majorVersion: S.String, minorVersion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceTemplateVersionInput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateName: S.String, templateType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTemplateSyncConfigInput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          templateType: S.String,
          templateVersion: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTemplateSyncStatusInput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentName: S.String,
          nextToken: S.optional(S.String),
          deploymentId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListComponentOutputsInput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), outputs: __S(609, __c76, 1) }),
      ).annotate({ identifier: "ListComponentOutputsOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), valueString: S.optional(S.String) }),
      ).annotate({ identifier: "Output" });
    case 1:
      return S.Array(__S(608, __c76, 0));
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ componentName: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListComponentProvisionedResourcesInput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          identifier: S.optional(S.String),
          provisioningEngine: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedResource" });
    case 1:
      return S.Array(__S(624, __c78, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), provisionedResources: __S(625, __c78, 1) }),
      ).annotate({ identifier: "ListComponentProvisionedResourcesOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          environmentName: S.optional(S.String),
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListComponentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          environmentName: S.String,
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastDeploymentSucceededAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentSummary" });
    case 2:
      return S.Array(__S(633, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), components: __S(634, __c79, 2) }),
      ).annotate({ identifier: "ListComponentsOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          environmentName: S.optional(S.String),
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          componentName: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeploymentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          targetArn: S.String,
          targetResourceCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          targetResourceType: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          environmentName: S.String,
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          componentName: S.optional(S.String),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
          deploymentStatus: S.String,
        }),
      ).annotate({ identifier: "DeploymentSummary" });
    case 2:
      return S.Array(__S(641, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), deployments: __S(642, __c80, 2) }),
      ).annotate({ identifier: "ListDeploymentsOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestedBy: S.String,
          environmentName: S.optional(S.String),
          statuses: S.optional(__S(240, __c30, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentAccountConnectionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          managementAccountId: S.String,
          environmentAccountId: S.String,
          roleArn: S.String,
          environmentName: S.String,
          requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          componentRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentAccountConnectionSummary" });
    case 2:
      return S.Array(__S(649, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          environmentAccountConnections: __S(650, __c81, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEnvironmentAccountConnectionsOutput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentName: S.String,
          nextToken: S.optional(S.String),
          deploymentId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentOutputsInput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentName: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentProvisionedResourcesInput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          environmentTemplates: S.optional(__S(249, __c31, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          arn: S.String,
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          protonServiceRoleArn: S.optional(S.String),
          environmentAccountConnectionId: S.optional(S.String),
          environmentAccountId: S.optional(S.String),
          provisioning: S.optional(S.String),
          componentRoleArn: S.optional(S.String),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentSummary" });
    case 2:
      return S.Array(__S(673, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), environments: __S(674, __c84, 2) }),
      ).annotate({ identifier: "ListEnvironmentsOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentTemplatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          recommendedVersion: S.optional(S.String),
          provisioning: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentTemplateSummary" });
    case 2:
      return S.Array(__S(681, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), templates: __S(682, __c85, 2) }),
      ).annotate({ identifier: "ListEnvironmentTemplatesOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          templateName: S.String,
          majorVersion: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentTemplateVersionsInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          majorVersion: S.String,
          minorVersion: S.String,
          recommendedMinorVersion: S.optional(S.String),
          status: S.String,
          statusMessage: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "EnvironmentTemplateVersionSummary" });
    case 1:
      return S.Array(__S(696, __c87, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), templateVersions: __S(697, __c87, 1) }),
      ).annotate({ identifier: "ListEnvironmentTemplateVersionsOutput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRepositoriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, provider: S.String, name: S.String, connectionArn: S.String }),
      ).annotate({ identifier: "RepositorySummary" });
    case 2:
      return S.Array(__S(705, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), repositories: __S(706, __c88, 2) }),
      ).annotate({ identifier: "ListRepositoriesOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          repositoryProvider: S.String,
          syncType: S.String,
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRepositorySyncDefinitionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ target: S.String, parent: S.String, branch: S.String, directory: S.String }),
      ).annotate({ identifier: "RepositorySyncDefinition" });
    case 2:
      return S.Array(__S(713, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), syncDefinitions: __S(714, __c89, 2) }),
      ).annotate({ identifier: "ListRepositorySyncDefinitionsOutput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceInstanceName: S.String,
          serviceName: S.String,
          nextToken: S.optional(S.String),
          deploymentId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceInstanceOutputsInput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          serviceInstanceName: S.String,
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceInstanceProvisionedResourcesInput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceInstancesFilter" });
    case 1:
      return S.Array(__S(736, __c92, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(737, __c92, 1)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceInstancesInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          serviceName: S.String,
          environmentName: S.String,
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceInstanceSummary" });
    case 4:
      return S.Array(__S(739, __c92, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), serviceInstances: __S(740, __c92, 4) }),
      ).annotate({ identifier: "ListServiceInstancesOutput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptEnvironmentAccountConnectionInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          managementAccountId: S.String,
          environmentAccountId: S.String,
          roleArn: S.String,
          environmentName: S.String,
          requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          componentRoleArn: S.optional(S.String),
          codebuildRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentAccountConnection" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentAccountConnection: __S(752, __c94, 0) }),
      ).annotate({ identifier: "AcceptEnvironmentAccountConnectionOutput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          nextToken: S.optional(S.String),
          deploymentId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServicePipelineOutputsInput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceName: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicePipelineProvisionedResourcesInput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          arn: S.String,
          templateName: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          statusMessage: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ServiceSummary" });
    case 2:
      return S.Array(__S(785, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), services: __S(786, __c98, 2) }),
      ).annotate({ identifier: "ListServicesOutput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServiceTemplatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          recommendedVersion: S.optional(S.String),
          pipelineProvisioning: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceTemplateSummary" });
    case 2:
      return S.Array(__S(793, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), templates: __S(794, __c99, 2) }),
      ).annotate({ identifier: "ListServiceTemplatesOutput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          templateName: S.String,
          majorVersion: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceTemplateVersionsInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: __S(49, __c6, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          status: S.optional(S.String),
          outputs: S.optional(__S(609, __c76, 1)),
          deploymentId: S.optional(S.String),
          statusMessage: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "NotifyResourceDeploymentStatusChangeInput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "NotifyResourceDeploymentStatusChangeOutput",
      });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectEnvironmentAccountConnectionInput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tags: __S(49, __c6, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tagKeys: __S(240, __c30, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ componentName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelComponentDeploymentInput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          arn: S.String,
          environmentName: S.String,
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastDeploymentSucceededAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          serviceSpec: S.optional(SensitiveString),
          lastClientRequestToken: S.optional(S.String),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Component" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ component: __S(864, __c108, 0) })).annotate({
        identifier: "CancelComponentDeploymentOutput",
      });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineServiceRoleArn: S.optional(S.String),
          pipelineProvisioningRepository: S.optional(__S(64, __c8, 0)),
          deletePipelineProvisioningRepository: S.optional(S.Boolean),
          pipelineCodebuildRoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAccountSettingsInput" });
    case 1:
      return S.suspend(() => S.Struct({ accountSettings: __S(416, __c52, 0) })).annotate({
        identifier: "UpdateAccountSettingsOutput",
      });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          deploymentType: S.String,
          description: S.optional(SensitiveString),
          serviceName: S.optional(S.String),
          serviceInstanceName: S.optional(S.String),
          serviceSpec: S.optional(SensitiveString),
          templateFile: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateComponentInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          spec: S.optional(SensitiveString),
          templateMajorVersion: S.optional(S.String),
          templateMinorVersion: S.optional(S.String),
          protonServiceRoleArn: S.optional(S.String),
          deploymentType: S.String,
          environmentAccountConnectionId: S.optional(S.String),
          provisioningRepository: S.optional(__S(64, __c8, 0)),
          componentRoleArn: S.optional(S.String),
          codebuildRoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEnvironmentInput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          roleArn: S.optional(S.String),
          componentRoleArn: S.optional(S.String),
          codebuildRoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEnvironmentAccountConnectionInput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEnvironmentTemplateInput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          majorVersion: S.String,
          minorVersion: S.String,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEnvironmentTemplateVersionInput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          spec: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceInput" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          serviceName: S.String,
          deploymentType: S.String,
          spec: S.optional(SensitiveString),
          templateMajorVersion: S.optional(S.String),
          templateMinorVersion: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceInstanceInput" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          spec: SensitiveString,
          deploymentType: S.String,
          templateMajorVersion: S.optional(S.String),
          templateMinorVersion: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServicePipelineInput" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, resolvedReason: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateServiceSyncBlockerInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          serviceInstanceName: S.optional(S.String),
          serviceSyncBlocker: __S(544, __c68, 0),
        }),
      ).annotate({ identifier: "UpdateServiceSyncBlockerOutput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelEnvironmentDeploymentInput" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, provider: S.String, name: S.String, branch: S.String }),
      ).annotate({ identifier: "RepositoryBranch" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          arn: S.String,
          templateName: S.String,
          templateMajorVersion: S.String,
          templateMinorVersion: S.String,
          deploymentStatus: S.String,
          deploymentStatusMessage: S.optional(SensitiveString),
          protonServiceRoleArn: S.optional(S.String),
          environmentAccountConnectionId: S.optional(S.String),
          environmentAccountId: S.optional(S.String),
          spec: S.optional(SensitiveString),
          provisioning: S.optional(S.String),
          provisioningRepository: S.optional(__S(968, __c121, 0)),
          componentRoleArn: S.optional(S.String),
          codebuildRoleArn: S.optional(S.String),
          lastAttemptedDeploymentId: S.optional(S.String),
          lastSucceededDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Environment" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ environment: __S(976, __c122, 0) })).annotate({
        identifier: "CancelEnvironmentDeploymentOutput",
      });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.String,
          repositoryProvider: S.String,
          repositoryName: S.String,
          branch: S.String,
          filePath: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceSyncConfigInput" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceTemplateInput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          majorVersion: S.String,
          minorVersion: S.String,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          compatibleEnvironmentTemplates: S.optional(__S(249, __c31, 1)),
          supportedComponentSources: S.optional(__S(240, __c30, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceTemplateVersionInput" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          templateType: S.String,
          repositoryProvider: S.String,
          repositoryName: S.String,
          branch: S.String,
          subdirectory: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTemplateSyncConfigInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
