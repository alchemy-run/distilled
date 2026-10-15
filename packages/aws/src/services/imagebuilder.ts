import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "imagebuilder",
  serviceShapeName: "imagebuilder",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "imagebuilder" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-02");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://imagebuilder-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://imagebuilder.${Region}.amazonaws.com`);
            }
            return e(
              `https://imagebuilder-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://imagebuilder.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://imagebuilder.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://imagebuilder.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class CallRateLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CallRateLimitExceededException>()(
    "CallRateLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()(
    "ClientException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DryRunOperationException
  extends /*@__PURE__*/ S.TaggedError<DryRunOperationException>()(
    "DryRunOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidVersionNumberException
  extends /*@__PURE__*/ S.TaggedError<InvalidVersionNumberException>()(
    "InvalidVersionNumberException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ResourceDependencyException
  extends /*@__PURE__*/ S.TaggedError<ResourceDependencyException>()(
    "ResourceDependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type ImageBuildVersionArn = string;
export type ClientToken = string;
export interface CancelImageCreationRequest {
  imageBuildVersionArn: string;
  clientToken: string;
}
export type NonEmptyString = string;
export interface CancelImageCreationResponse {
  requestId?: string;
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export type LifecycleExecutionId = string;
export interface CancelLifecycleExecutionRequest {
  lifecycleExecutionId: string;
  clientToken: string;
}
export interface CancelLifecycleExecutionResponse {
  lifecycleExecutionId?: string;
}
export type ResourceName = string;
export type VersionNumber = string;
export type Platform = "Windows" | "Linux" | "macOS" | (string & {});
export type OsVersion = string;
export type OsVersionList = string[];
export type InlineComponentData = string;
export type Uri = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateComponentRequest {
  name: string;
  semanticVersion: string;
  description?: string;
  changeDescription?: string;
  platform: Platform;
  supportedOsVersions?: string[];
  data?: string;
  uri?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  dryRun?: boolean;
}
export type ComponentBuildVersionArn = string;
export type ImageBuilderArn = string;
export interface LatestVersionReferences {
  latestVersionArn?: string;
  latestMajorVersionArn?: string;
  latestMinorVersionArn?: string;
  latestPatchVersionArn?: string;
}
export interface CreateComponentResponse {
  requestId?: string;
  clientToken?: string;
  componentBuildVersionArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export type ContainerType = "DOCKER" | (string & {});
export type WildcardVersionNumber = string;
export type ComponentVersionArnOrBuildVersionArn = string;
export type ComponentParameterName = string;
export type ComponentParameterValue = string;
export type ComponentParameterValueList = string[];
export interface ComponentParameter {
  name: string;
  value: string[];
}
export type ComponentParameterList = ComponentParameter[];
export interface ComponentConfiguration {
  componentArn: string;
  parameters?: ComponentParameter[];
}
export type ComponentConfigurationList = ComponentConfiguration[];
export type EbsIopsInteger = number;
export type EbsVolumeSizeInteger = number;
export type EbsVolumeType =
  | "standard"
  | "io1"
  | "io2"
  | "gp2"
  | "gp3"
  | "sc1"
  | "st1"
  | (string & {});
export type EbsVolumeThroughput = number;
export interface EbsInstanceBlockDeviceSpecification {
  encrypted?: boolean;
  deleteOnTermination?: boolean;
  iops?: number;
  kmsKeyId?: string;
  snapshotId?: string;
  volumeSize?: number;
  volumeType?: EbsVolumeType;
  throughput?: number;
}
export type EmptyString = string;
export interface InstanceBlockDeviceMapping {
  deviceName?: string;
  ebs?: EbsInstanceBlockDeviceSpecification;
  virtualName?: string;
  noDevice?: string;
}
export type InstanceBlockDeviceMappings = InstanceBlockDeviceMapping[];
export interface InstanceConfiguration {
  image?: string;
  blockDeviceMappings?: InstanceBlockDeviceMapping[];
}
export type InlineDockerFileTemplate = string;
export type ContainerRepositoryService = "ECR" | (string & {});
export interface TargetContainerRepository {
  service: ContainerRepositoryService;
  repositoryName: string;
}
export interface CreateContainerRecipeRequest {
  containerType: ContainerType;
  name: string;
  description?: string;
  semanticVersion: string;
  components?: ComponentConfiguration[];
  instanceConfiguration?: InstanceConfiguration;
  dockerfileTemplateData?: string;
  dockerfileTemplateUri?: string;
  platformOverride?: Platform;
  imageOsVersionOverride?: string;
  parentImage: string;
  tags?: { [key: string]: string | undefined };
  workingDirectory?: string;
  targetRepository: TargetContainerRepository;
  kmsKeyId?: string;
  clientToken: string;
  dryRun?: boolean;
}
export type ContainerRecipeArn = string;
export interface CreateContainerRecipeResponse {
  requestId?: string;
  clientToken?: string;
  containerRecipeArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export type AmiNameString = string;
export type AccountId = string;
export type AccountList = string[];
export type StringList = string[];
export type OrganizationArn = string;
export type OrganizationArnList = string[];
export type OrganizationalUnitArn = string;
export type OrganizationalUnitArnList = string[];
export interface LaunchPermissionConfiguration {
  userIds?: string[];
  userGroups?: string[];
  organizationArns?: string[];
  organizationalUnitArns?: string[];
}
export interface AmiDistributionConfiguration {
  name?: string;
  description?: string;
  targetAccountIds?: string[];
  amiTags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
  launchPermission?: LaunchPermissionConfiguration;
}
export interface ContainerDistributionConfiguration {
  description?: string;
  containerTags?: string[];
  targetRepository: TargetContainerRepository;
}
export type LicenseConfigurationArn = string;
export type LicenseConfigurationArnList = string[];
export type LaunchTemplateId = string;
export interface LaunchTemplateConfiguration {
  launchTemplateId: string;
  accountId?: string;
  setDefaultVersion?: boolean;
}
export type LaunchTemplateConfigurationList = LaunchTemplateConfiguration[];
export type DiskImageFormat = "VMDK" | "RAW" | "VHD" | (string & {});
export interface S3ExportConfiguration {
  roleName: string;
  diskImageFormat: DiskImageFormat;
  s3Bucket: string;
  s3Prefix?: string;
}
export type TargetResourceCount = number;
export interface FastLaunchSnapshotConfiguration {
  targetResourceCount?: number;
}
export type MaxParallelLaunches = number;
export interface FastLaunchLaunchTemplateSpecification {
  launchTemplateId?: string;
  launchTemplateName?: string;
  launchTemplateVersion?: string;
}
export interface FastLaunchConfiguration {
  enabled: boolean;
  snapshotConfiguration?: FastLaunchSnapshotConfiguration;
  maxParallelLaunches?: number;
  launchTemplate?: FastLaunchLaunchTemplateSpecification;
  accountId?: string;
}
export type FastLaunchConfigurationList = FastLaunchConfiguration[];
export type SsmParameterName = string;
export type SsmParameterDataType = "text" | "aws:ec2:image" | (string & {});
export interface SsmParameterConfiguration {
  amiAccountId?: string;
  parameterName: string;
  dataType?: SsmParameterDataType;
}
export type SsmParameterConfigurationList = SsmParameterConfiguration[];
export interface Distribution {
  region: string;
  amiDistributionConfiguration?: AmiDistributionConfiguration;
  containerDistributionConfiguration?: ContainerDistributionConfiguration;
  licenseConfigurationArns?: string[];
  launchTemplateConfigurations?: LaunchTemplateConfiguration[];
  s3ExportConfiguration?: S3ExportConfiguration;
  fastLaunchConfigurations?: FastLaunchConfiguration[];
  ssmParameterConfigurations?: SsmParameterConfiguration[];
}
export type DistributionList = Distribution[];
export interface CreateDistributionConfigurationRequest {
  name: string;
  description?: string;
  distributions: Distribution[];
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  dryRun?: boolean;
}
export type DistributionConfigurationArn = string;
export interface CreateDistributionConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  distributionConfigurationArn?: string;
}
export type ImageRecipeArn = string;
export type InfrastructureConfigurationArn = string;
export type ImageTestsTimeoutMinutes = number;
export interface ImageTestsConfiguration {
  imageTestsEnabled?: boolean;
  timeoutMinutes?: number;
}
export interface EcrConfiguration {
  repositoryName?: string;
  containerTags?: string[];
}
export interface ImageScanningConfiguration {
  imageScanningEnabled?: boolean;
  ecrConfiguration?: EcrConfiguration;
}
export type WorkflowVersionArnOrBuildVersionArn = string;
export type WorkflowParameterName = string;
export type WorkflowParameterValue = string;
export type WorkflowParameterValueList = string[];
export interface WorkflowParameter {
  name: string;
  value: string[];
}
export type WorkflowParameterList = WorkflowParameter[];
export type ParallelGroup = string;
export type OnWorkflowFailure = "CONTINUE" | "ABORT" | (string & {});
export interface WorkflowConfiguration {
  workflowArn: string;
  parameters?: WorkflowParameter[];
  parallelGroup?: string;
  onFailure?: OnWorkflowFailure;
}
export type WorkflowConfigurationList = WorkflowConfiguration[];
export type RoleNameOrArn = string;
export type LogGroupName = string;
export interface ImageLoggingConfiguration {
  logGroupName?: string;
}
export interface CreateImageRequest {
  imageRecipeArn?: string;
  containerRecipeArn?: string;
  distributionConfigurationArn?: string;
  infrastructureConfigurationArn: string;
  imageTestsConfiguration?: ImageTestsConfiguration;
  enhancedImageMetadataEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  imageScanningConfiguration?: ImageScanningConfiguration;
  workflows?: WorkflowConfiguration[];
  executionRole?: string;
  loggingConfiguration?: ImageLoggingConfiguration;
}
export interface CreateImageResponse {
  requestId?: string;
  clientToken?: string;
  imageBuildVersionArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export type Timezone = string;
export type PipelineExecutionStartCondition =
  | "EXPRESSION_MATCH_ONLY"
  | "EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE"
  | (string & {});
export type AutoDisableFailureCount = number;
export interface AutoDisablePolicy {
  failureCount: number;
}
export interface Schedule {
  scheduleExpression?: string;
  timezone?: string;
  pipelineExecutionStartCondition?: PipelineExecutionStartCondition;
  autoDisablePolicy?: AutoDisablePolicy;
}
export type PipelineStatus = "DISABLED" | "ENABLED" | (string & {});
export interface PipelineLoggingConfiguration {
  imageLogGroupName?: string;
  pipelineLogGroupName?: string;
}
export interface CreateImagePipelineRequest {
  name: string;
  description?: string;
  imageRecipeArn?: string;
  containerRecipeArn?: string;
  infrastructureConfigurationArn: string;
  distributionConfigurationArn?: string;
  imageTestsConfiguration?: ImageTestsConfiguration;
  enhancedImageMetadataEnabled?: boolean;
  schedule?: Schedule;
  status?: PipelineStatus;
  tags?: { [key: string]: string | undefined };
  imageTags?: { [key: string]: string | undefined };
  clientToken: string;
  imageScanningConfiguration?: ImageScanningConfiguration;
  workflows?: WorkflowConfiguration[];
  executionRole?: string;
  loggingConfiguration?: PipelineLoggingConfiguration;
  dryRun?: boolean;
}
export type ImagePipelineArn = string;
export interface CreateImagePipelineResponse {
  requestId?: string;
  clientToken?: string;
  imagePipelineArn?: string;
}
export interface SystemsManagerAgent {
  uninstallAfterBuild?: boolean;
}
export type UserDataOverride = string;
export interface AdditionalInstanceConfiguration {
  systemsManagerAgent?: SystemsManagerAgent;
  userDataOverride?: string;
}
export type AmiWatermarkName = string;
export type AmiWatermarksList = string[];
export interface CreateImageRecipeRequest {
  name: string;
  description?: string;
  semanticVersion: string;
  components?: ComponentConfiguration[];
  parentImage: string;
  blockDeviceMappings?: InstanceBlockDeviceMapping[];
  tags?: { [key: string]: string | undefined };
  workingDirectory?: string;
  additionalInstanceConfiguration?: AdditionalInstanceConfiguration;
  amiTags?: { [key: string]: string | undefined };
  amiWatermarks?: string[];
  clientToken: string;
  dryRun?: boolean;
}
export interface CreateImageRecipeResponse {
  requestId?: string;
  clientToken?: string;
  imageRecipeArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export type InstanceType = string;
export type InstanceTypeList = string[];
export type InstanceProfileNameType = string;
export type SecurityGroupIds = string[];
export interface S3Logs {
  s3BucketName?: string;
  s3KeyPrefix?: string;
}
export interface Logging {
  s3Logs?: S3Logs;
}
export type SnsTopicArn = string;
export type ResourceTagMap = { [key: string]: string | undefined };
export type HttpTokens = string;
export type HttpPutResponseHopLimit = number;
export interface InstanceMetadataOptions {
  httpTokens?: string;
  httpPutResponseHopLimit?: number;
}
export type TenancyType = "default" | "dedicated" | "host" | (string & {});
export interface Placement {
  availabilityZone?: string;
  tenancy?: TenancyType;
  hostId?: string;
  hostResourceGroupArn?: string;
}
export interface CreateInfrastructureConfigurationRequest {
  name: string;
  description?: string;
  instanceTypes?: string[];
  instanceProfileName: string;
  securityGroupIds?: string[];
  subnetId?: string;
  logging?: Logging;
  keyPair?: string;
  terminateInstanceOnFailure?: boolean;
  snsTopicArn?: string;
  resourceTags?: { [key: string]: string | undefined };
  instanceMetadataOptions?: InstanceMetadataOptions;
  tags?: { [key: string]: string | undefined };
  placement?: Placement;
  clientToken: string;
  dryRun?: boolean;
}
export interface CreateInfrastructureConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  infrastructureConfigurationArn?: string;
}
export type LifecyclePolicyStatus = "DISABLED" | "ENABLED" | (string & {});
export type LifecyclePolicyResourceType = "AMI_IMAGE" | "CONTAINER_IMAGE" | (string & {});
export type LifecyclePolicyDetailActionType = "DELETE" | "DEPRECATE" | "DISABLE" | (string & {});
export interface LifecyclePolicyDetailActionIncludeResources {
  amis?: boolean;
  snapshots?: boolean;
  containers?: boolean;
}
export interface LifecyclePolicyDetailAction {
  type: LifecyclePolicyDetailActionType;
  includeResources?: LifecyclePolicyDetailActionIncludeResources;
}
export type LifecyclePolicyDetailFilterType = "AGE" | "COUNT" | (string & {});
export type LifecyclePolicyDetailFilterValue = number;
export type LifecyclePolicyTimeUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS" | (string & {});
export type LifecyclePolicyDetailFilterRetainAtLeast = number;
export interface LifecyclePolicyDetailFilter {
  type: LifecyclePolicyDetailFilterType;
  value: number;
  unit?: LifecyclePolicyTimeUnit;
  retainAtLeast?: number;
}
export type LifecyclePolicyDetailExclusionRulesAmisLastLaunchedValue = number;
export interface LifecyclePolicyDetailExclusionRulesAmisLastLaunched {
  value: number;
  unit: LifecyclePolicyTimeUnit;
}
export interface LifecyclePolicyDetailExclusionRulesAmis {
  isPublic?: boolean;
  regions?: string[];
  sharedAccounts?: string[];
  lastLaunched?: LifecyclePolicyDetailExclusionRulesAmisLastLaunched;
  tagMap?: { [key: string]: string | undefined };
}
export interface LifecyclePolicyDetailExclusionRules {
  tagMap?: { [key: string]: string | undefined };
  amis?: LifecyclePolicyDetailExclusionRulesAmis;
}
export interface LifecyclePolicyDetail {
  action: LifecyclePolicyDetailAction;
  filter: LifecyclePolicyDetailFilter;
  exclusionRules?: LifecyclePolicyDetailExclusionRules;
}
export type LifecyclePolicyDetails = LifecyclePolicyDetail[];
export interface LifecyclePolicyResourceSelectionRecipe {
  name: string;
  semanticVersion: string;
}
export type LifecyclePolicyResourceSelectionRecipes = LifecyclePolicyResourceSelectionRecipe[];
export interface LifecyclePolicyResourceSelection {
  recipes?: LifecyclePolicyResourceSelectionRecipe[];
  tagMap?: { [key: string]: string | undefined };
}
export interface CreateLifecyclePolicyRequest {
  name: string;
  description?: string;
  status?: LifecyclePolicyStatus;
  executionRole: string;
  resourceType: LifecyclePolicyResourceType;
  policyDetails: LifecyclePolicyDetail[];
  resourceSelection: LifecyclePolicyResourceSelection;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  dryRun?: boolean;
}
export type LifecyclePolicyArn = string;
export interface CreateLifecyclePolicyResponse {
  clientToken?: string;
  lifecyclePolicyArn?: string;
}
export type InlineWorkflowData = string;
export type WorkflowType = "BUILD" | "TEST" | "DISTRIBUTION" | (string & {});
export interface CreateWorkflowRequest {
  name: string;
  semanticVersion: string;
  description?: string;
  changeDescription?: string;
  data?: string;
  uri?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  type: WorkflowType;
  dryRun?: boolean;
}
export type WorkflowBuildVersionArn = string;
export interface CreateWorkflowResponse {
  clientToken?: string;
  workflowBuildVersionArn?: string;
  latestVersionReferences?: LatestVersionReferences;
}
export interface DeleteComponentRequest {
  componentBuildVersionArn: string;
}
export interface DeleteComponentResponse {
  requestId?: string;
  componentBuildVersionArn?: string;
}
export interface DeleteContainerRecipeRequest {
  containerRecipeArn: string;
}
export interface DeleteContainerRecipeResponse {
  requestId?: string;
  containerRecipeArn?: string;
}
export interface DeleteDistributionConfigurationRequest {
  distributionConfigurationArn: string;
}
export interface DeleteDistributionConfigurationResponse {
  requestId?: string;
  distributionConfigurationArn?: string;
}
export interface DeleteImageRequest {
  imageBuildVersionArn: string;
}
export interface DeleteImageResponse {
  requestId?: string;
  imageBuildVersionArn?: string;
}
export interface DeleteImagePipelineRequest {
  imagePipelineArn: string;
}
export interface DeleteImagePipelineResponse {
  requestId?: string;
  imagePipelineArn?: string;
}
export interface DeleteImageRecipeRequest {
  imageRecipeArn: string;
}
export interface DeleteImageRecipeResponse {
  requestId?: string;
  imageRecipeArn?: string;
}
export interface DeleteInfrastructureConfigurationRequest {
  infrastructureConfigurationArn: string;
}
export interface DeleteInfrastructureConfigurationResponse {
  requestId?: string;
  infrastructureConfigurationArn?: string;
}
export interface DeleteLifecyclePolicyRequest {
  lifecyclePolicyArn: string;
}
export interface DeleteLifecyclePolicyResponse {
  lifecyclePolicyArn?: string;
}
export interface DeleteWorkflowRequest {
  workflowBuildVersionArn: string;
}
export interface DeleteWorkflowResponse {
  workflowBuildVersionArn?: string;
}
export interface DistributeImageRequest {
  sourceImage: string;
  distributionConfigurationArn: string;
  executionRole: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
  loggingConfiguration?: ImageLoggingConfiguration;
}
export interface DistributeImageResponse {
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export interface GetComponentRequest {
  componentBuildVersionArn: string;
}
export type ComponentType = "BUILD" | "TEST" | (string & {});
export type ComponentStatus = "DEPRECATED" | "DISABLED" | "ACTIVE" | (string & {});
export interface ComponentState {
  status?: ComponentStatus;
  reason?: string;
}
export type ComponentParameterType = string;
export type ComponentParameterDescription = string;
export interface ComponentParameterDetail {
  name: string;
  type: string;
  defaultValue?: string[];
  description?: string;
}
export type ComponentParameterDetailList = ComponentParameterDetail[];
export type ComponentData = string;
export type ProductCodeId = string;
export type ProductCodeType = "marketplace" | (string & {});
export interface ProductCodeListItem {
  productCodeId: string;
  productCodeType: ProductCodeType;
}
export type ProductCodeList = ProductCodeListItem[];
export interface Component {
  arn?: string;
  name?: string;
  version?: string;
  description?: string;
  changeDescription?: string;
  type?: ComponentType;
  platform?: Platform;
  supportedOsVersions?: string[];
  state?: ComponentState;
  parameters?: ComponentParameterDetail[];
  owner?: string;
  data?: string;
  kmsKeyId?: string;
  encrypted?: boolean;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
  publisher?: string;
  obfuscate?: boolean;
  productCodes?: ProductCodeListItem[];
}
export interface GetComponentResponse {
  requestId?: string;
  component?: Component;
  latestVersionReferences?: LatestVersionReferences;
}
export interface GetComponentPolicyRequest {
  componentArn: string;
}
export type ResourcePolicyDocument = string;
export interface GetComponentPolicyResponse {
  requestId?: string;
  policy?: string;
}
export interface GetContainerRecipeRequest {
  containerRecipeArn: string;
}
export type DockerFileTemplate = string;
export interface ContainerRecipe {
  arn?: string;
  containerType?: ContainerType;
  name?: string;
  description?: string;
  platform?: Platform;
  owner?: string;
  version?: string;
  components?: ComponentConfiguration[];
  instanceConfiguration?: InstanceConfiguration;
  dockerfileTemplateData?: string;
  kmsKeyId?: string;
  encrypted?: boolean;
  parentImage?: string;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
  workingDirectory?: string;
  targetRepository?: TargetContainerRepository;
}
export interface GetContainerRecipeResponse {
  requestId?: string;
  containerRecipe?: ContainerRecipe;
  latestVersionReferences?: LatestVersionReferences;
}
export interface GetContainerRecipePolicyRequest {
  containerRecipeArn: string;
}
export interface GetContainerRecipePolicyResponse {
  requestId?: string;
  policy?: string;
}
export interface GetDistributionConfigurationRequest {
  distributionConfigurationArn: string;
}
export type DistributionTimeoutMinutes = number;
export interface DistributionConfiguration {
  arn?: string;
  name?: string;
  description?: string;
  distributions?: Distribution[];
  timeoutMinutes?: number;
  dateCreated?: string;
  dateUpdated?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetDistributionConfigurationResponse {
  requestId?: string;
  distributionConfiguration?: DistributionConfiguration;
}
export type ImageVersionArnOrBuildVersionArn = string;
export interface GetImageRequest {
  imageBuildVersionArn: string;
}
export type ImageType = "AMI" | "DOCKER" | (string & {});
export type VersionNumberWithBuild = string;
export type ImageStatus =
  | "PENDING"
  | "CREATING"
  | "BUILDING"
  | "TESTING"
  | "DISTRIBUTING"
  | "INTEGRATING"
  | "AVAILABLE"
  | "CANCELLED"
  | "FAILED"
  | "DEPRECATED"
  | "DELETED"
  | "DISABLED"
  | (string & {});
export type WorkflowExecutionId = string;
export type WorkflowStepExecutionId = string;
export type WorkflowStepName = string;
export type NonEmptyMaxLengthString = string;
export interface ComponentFailureContext {
  componentArn?: string;
  phaseName?: string;
  stepName?: string;
  action?: string;
  errorMessage?: string;
}
export type RegionFailureStatus = "FAILED" | "CANCELLED" | "TIMED_OUT" | (string & {});
export type ImageConfigurationStep =
  | "ASSOCIATE_LICENSES"
  | "UPDATE_LAUNCH_TEMPLATES"
  | "PUT_SSM_PARAMETERS"
  | "UPDATE_FAST_LAUNCH_CONFIGURATIONS"
  | "EXPORT_AMI"
  | (string & {});
export interface RegionFailure {
  region?: string;
  status?: RegionFailureStatus;
  imageConfigurationStep?: ImageConfigurationStep;
  errorMessage?: string;
  targetAccountId?: string;
}
export type RegionFailureList = RegionFailure[];
export interface DistributionFailureContext {
  errorMessage?: string;
  regionFailures?: RegionFailure[];
}
export interface ImageFailureContext {
  imageStatus?: ImageStatus;
  workflowExecutionId?: string;
  workflowArn?: string;
  stepExecutionId?: string;
  failedStep?: string;
  componentFailure?: ComponentFailureContext;
  distributionFailure?: DistributionFailureContext;
}
export interface ImageState {
  status?: ImageStatus;
  reason?: string;
  failureContext?: ImageFailureContext;
}
export interface ImageRecipe {
  arn?: string;
  type?: ImageType;
  name?: string;
  description?: string;
  platform?: Platform;
  owner?: string;
  version?: string;
  components?: ComponentConfiguration[];
  parentImage?: string;
  blockDeviceMappings?: InstanceBlockDeviceMapping[];
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
  workingDirectory?: string;
  additionalInstanceConfiguration?: AdditionalInstanceConfiguration;
  amiTags?: { [key: string]: string | undefined };
  amiWatermarks?: string[];
}
export type Arn = string;
export interface InfrastructureConfiguration {
  arn?: string;
  name?: string;
  description?: string;
  instanceTypes?: string[];
  instanceProfileName?: string;
  securityGroupIds?: string[];
  subnetId?: string;
  logging?: Logging;
  keyPair?: string;
  terminateInstanceOnFailure?: boolean;
  snsTopicArn?: string;
  dateCreated?: string;
  dateUpdated?: string;
  resourceTags?: { [key: string]: string | undefined };
  instanceMetadataOptions?: InstanceMetadataOptions;
  tags?: { [key: string]: string | undefined };
  placement?: Placement;
}
export interface Ami {
  region?: string;
  image?: string;
  name?: string;
  description?: string;
  state?: ImageState;
  accountId?: string;
}
export type AmiList = Ami[];
export interface Container {
  region?: string;
  imageUris?: string[];
}
export type ContainerList = Container[];
export interface OutputResources {
  amis?: Ami[];
  containers?: Container[];
}
export type BuildType = "USER_INITIATED" | "SCHEDULED" | "IMPORT" | "IMPORT_ISO" | (string & {});
export type ImageSource =
  | "AMAZON_MANAGED"
  | "AWS_MARKETPLACE"
  | "IMPORTED"
  | "CUSTOM"
  | (string & {});
export type ImageScanStatus =
  | "PENDING"
  | "SCANNING"
  | "COLLECTING"
  | "COMPLETED"
  | "ABANDONED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export interface ImageScanState {
  status?: ImageScanStatus;
  reason?: string;
}
export type DateTimeTimestamp = Date;
export interface Image {
  arn?: string;
  type?: ImageType;
  name?: string;
  version?: string;
  platform?: Platform;
  enhancedImageMetadataEnabled?: boolean;
  osVersion?: string;
  state?: ImageState;
  imageRecipe?: ImageRecipe;
  containerRecipe?: ContainerRecipe;
  sourcePipelineName?: string;
  sourcePipelineArn?: string;
  infrastructureConfiguration?: InfrastructureConfiguration;
  distributionConfiguration?: DistributionConfiguration;
  imageTestsConfiguration?: ImageTestsConfiguration;
  dateCreated?: string;
  outputResources?: OutputResources;
  tags?: { [key: string]: string | undefined };
  buildType?: BuildType;
  imageSource?: ImageSource;
  scanState?: ImageScanState;
  imageScanningConfiguration?: ImageScanningConfiguration;
  deprecationTime?: Date;
  lifecycleExecutionId?: string;
  executionRole?: string;
  workflows?: WorkflowConfiguration[];
  loggingConfiguration?: ImageLoggingConfiguration;
}
export interface GetImageResponse {
  requestId?: string;
  image?: Image;
  latestVersionReferences?: LatestVersionReferences;
}
export interface GetImagePipelineRequest {
  imagePipelineArn: string;
}
export type ConsecutiveFailures = number;
export interface ImagePipeline {
  arn?: string;
  name?: string;
  description?: string;
  platform?: Platform;
  enhancedImageMetadataEnabled?: boolean;
  imageRecipeArn?: string;
  containerRecipeArn?: string;
  infrastructureConfigurationArn?: string;
  distributionConfigurationArn?: string;
  imageTestsConfiguration?: ImageTestsConfiguration;
  schedule?: Schedule;
  status?: PipelineStatus;
  dateCreated?: string;
  dateUpdated?: string;
  dateLastRun?: string;
  lastRunStatus?: ImageStatus;
  dateNextRun?: string;
  tags?: { [key: string]: string | undefined };
  imageScanningConfiguration?: ImageScanningConfiguration;
  imageTags?: { [key: string]: string | undefined };
  executionRole?: string;
  workflows?: WorkflowConfiguration[];
  loggingConfiguration?: PipelineLoggingConfiguration;
  consecutiveFailures?: number;
}
export interface GetImagePipelineResponse {
  requestId?: string;
  imagePipeline?: ImagePipeline;
}
export interface GetImagePolicyRequest {
  imageArn: string;
}
export interface GetImagePolicyResponse {
  requestId?: string;
  policy?: string;
}
export interface GetImageRecipeRequest {
  imageRecipeArn: string;
}
export interface GetImageRecipeResponse {
  requestId?: string;
  imageRecipe?: ImageRecipe;
  latestVersionReferences?: LatestVersionReferences;
}
export interface GetImageRecipePolicyRequest {
  imageRecipeArn: string;
}
export interface GetImageRecipePolicyResponse {
  requestId?: string;
  policy?: string;
}
export interface GetInfrastructureConfigurationRequest {
  infrastructureConfigurationArn: string;
}
export interface GetInfrastructureConfigurationResponse {
  requestId?: string;
  infrastructureConfiguration?: InfrastructureConfiguration;
}
export interface GetLifecycleExecutionRequest {
  lifecycleExecutionId: string;
}
export interface LifecycleExecutionResourcesImpactedSummary {
  hasImpactedResources?: boolean;
}
export type LifecycleExecutionStatus =
  | "IN_PROGRESS"
  | "CANCELLED"
  | "CANCELLING"
  | "FAILED"
  | "SUCCESS"
  | "PENDING"
  | (string & {});
export interface LifecycleExecutionState {
  status?: LifecycleExecutionStatus;
  reason?: string;
}
export interface LifecycleExecution {
  lifecycleExecutionId?: string;
  lifecyclePolicyArn?: string;
  resourcesImpactedSummary?: LifecycleExecutionResourcesImpactedSummary;
  state?: LifecycleExecutionState;
  startTime?: Date;
  endTime?: Date;
}
export interface GetLifecycleExecutionResponse {
  lifecycleExecution?: LifecycleExecution;
}
export interface GetLifecyclePolicyRequest {
  lifecyclePolicyArn: string;
}
export interface LifecyclePolicy {
  arn?: string;
  name?: string;
  description?: string;
  status?: LifecyclePolicyStatus;
  executionRole?: string;
  resourceType?: LifecyclePolicyResourceType;
  policyDetails?: LifecyclePolicyDetail[];
  resourceSelection?: LifecyclePolicyResourceSelection;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateLastRun?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetLifecyclePolicyResponse {
  lifecyclePolicy?: LifecyclePolicy;
}
export type MarketplaceResourceType = "COMPONENT_DATA" | "COMPONENT_ARTIFACT" | (string & {});
export type MarketplaceResourceLocation = string;
export interface GetMarketplaceResourceRequest {
  resourceType: MarketplaceResourceType;
  resourceArn: string;
  resourceLocation?: string;
}
export interface GetMarketplaceResourceResponse {
  resourceArn?: string;
  url?: string;
  data?: string;
}
export interface GetWorkflowRequest {
  workflowBuildVersionArn: string;
}
export type WorkflowStatus = "DEPRECATED" | (string & {});
export interface WorkflowState {
  status?: WorkflowStatus;
  reason?: string;
}
export type WorkflowData = string;
export type WorkflowParameterType = string;
export type WorkflowParameterDescription = string;
export interface WorkflowParameterDetail {
  name: string;
  type: string;
  defaultValue?: string[];
  description?: string;
}
export type WorkflowParameterDetailList = WorkflowParameterDetail[];
export interface Workflow {
  arn?: string;
  name?: string;
  version?: string;
  description?: string;
  changeDescription?: string;
  type?: WorkflowType;
  state?: WorkflowState;
  owner?: string;
  data?: string;
  kmsKeyId?: string;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
  parameters?: WorkflowParameterDetail[];
}
export interface GetWorkflowResponse {
  workflow?: Workflow;
  latestVersionReferences?: LatestVersionReferences;
}
export interface GetWorkflowExecutionRequest {
  workflowExecutionId: string;
}
export type WorkflowExecutionStatus =
  | "PENDING"
  | "SKIPPED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETED"
  | "CANCELLED"
  | (string & {});
export type WorkflowExecutionMessage = string;
export type WorkflowStepCount = number;
export interface GetWorkflowExecutionResponse {
  requestId?: string;
  workflowBuildVersionArn?: string;
  workflowExecutionId?: string;
  imageBuildVersionArn?: string;
  type?: WorkflowType;
  status?: WorkflowExecutionStatus;
  message?: string;
  totalStepCount?: number;
  totalStepsSucceeded?: number;
  totalStepsFailed?: number;
  totalStepsSkipped?: number;
  startTime?: string;
  endTime?: string;
  parallelGroup?: string;
}
export interface GetWorkflowStepExecutionRequest {
  stepExecutionId: string;
}
export type WorkflowStepDescription = string;
export type WorkflowStepAction = string;
export type WorkflowStepExecutionStatus =
  | "PENDING"
  | "SKIPPED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export type WorkflowStepExecutionRollbackStatus =
  | "RUNNING"
  | "COMPLETED"
  | "SKIPPED"
  | "FAILED"
  | (string & {});
export type WorkflowStepMessage = string;
export type WorkflowStepInputs = string;
export type WorkflowStepOutputs = string;
export type WorkflowStepTimeoutSecondsInteger = number;
export type WorkflowStepAttemptCount = number;
export interface GetWorkflowStepExecutionResponse {
  requestId?: string;
  stepExecutionId?: string;
  workflowBuildVersionArn?: string;
  workflowExecutionId?: string;
  imageBuildVersionArn?: string;
  name?: string;
  description?: string;
  action?: string;
  status?: WorkflowStepExecutionStatus;
  rollbackStatus?: WorkflowStepExecutionRollbackStatus;
  message?: string;
  inputs?: string;
  outputs?: string;
  startTime?: string;
  endTime?: string;
  onFailure?: string;
  timeoutSeconds?: number;
  attemptNumber?: number;
  maxAttempts?: number;
}
export type ComponentFormat = "SHELL" | (string & {});
export interface ImportComponentRequest {
  name: string;
  semanticVersion: string;
  description?: string;
  changeDescription?: string;
  type: ComponentType;
  format: ComponentFormat;
  platform: Platform;
  data?: string;
  uri?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export interface ImportComponentResponse {
  requestId?: string;
  clientToken?: string;
  componentBuildVersionArn?: string;
}
export type UefiData = string;
export interface RegisterImageOptions {
  secureBootEnabled?: boolean;
  uefiData?: string;
}
export type WindowsConfigurationImageIndex = number;
export interface WindowsConfiguration {
  imageIndex: number;
}
export interface ImportDiskImageRequest {
  name: string;
  semanticVersion: string;
  description?: string;
  platform: string;
  osVersion: string;
  executionRole?: string;
  infrastructureConfigurationArn: string;
  uri: string;
  loggingConfiguration?: ImageLoggingConfiguration;
  tags?: { [key: string]: string | undefined };
  registerImageOptions?: RegisterImageOptions;
  windowsConfiguration?: WindowsConfiguration;
  clientToken: string;
}
export interface ImportDiskImageResponse {
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export interface ImportVmImageRequest {
  name: string;
  semanticVersion: string;
  description?: string;
  platform: Platform;
  osVersion?: string;
  vmImportTaskId: string;
  loggingConfiguration?: ImageLoggingConfiguration;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export interface ImportVmImageResponse {
  requestId?: string;
  imageArn?: string;
  clientToken?: string;
}
export type ComponentVersionArn = string;
export type RestrictedInteger = number;
export type PaginationToken = string;
export interface ListComponentBuildVersionsRequest {
  componentVersionArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ComponentSummary {
  arn?: string;
  name?: string;
  version?: string;
  platform?: Platform;
  supportedOsVersions?: string[];
  state?: ComponentState;
  type?: ComponentType;
  owner?: string;
  description?: string;
  changeDescription?: string;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
  publisher?: string;
  obfuscate?: boolean;
}
export type ComponentSummaryList = ComponentSummary[];
export interface ListComponentBuildVersionsResponse {
  requestId?: string;
  componentSummaryList?: ComponentSummary[];
  nextToken?: string;
}
export type Ownership =
  | "Self"
  | "Shared"
  | "Amazon"
  | "ThirdParty"
  | "AWSMarketplace"
  | (string & {});
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export interface Filter {
  name?: string;
  values?: string[];
}
export type FilterList = Filter[];
export interface ListComponentsRequest {
  owner?: Ownership;
  filters?: Filter[];
  byName?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export interface ComponentVersion {
  arn?: string;
  name?: string;
  version?: string;
  description?: string;
  platform?: Platform;
  supportedOsVersions?: string[];
  type?: ComponentType;
  owner?: string;
  dateCreated?: string;
  status?: ComponentStatus;
  productCodes?: ProductCodeListItem[];
}
export type ComponentVersionList = ComponentVersion[];
export interface ListComponentsResponse {
  requestId?: string;
  componentVersionList?: ComponentVersion[];
  nextToken?: string;
}
export interface ListContainerRecipesRequest {
  owner?: Ownership;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface ContainerRecipeSummary {
  arn?: string;
  containerType?: ContainerType;
  name?: string;
  platform?: Platform;
  owner?: string;
  parentImage?: string;
  dateCreated?: string;
  instanceImage?: string;
  tags?: { [key: string]: string | undefined };
}
export type ContainerRecipeSummaryList = ContainerRecipeSummary[];
export interface ListContainerRecipesResponse {
  requestId?: string;
  containerRecipeSummaryList?: ContainerRecipeSummary[];
  nextToken?: string;
}
export interface ListDistributionConfigurationsRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export type RegionList = string[];
export interface DistributionConfigurationSummary {
  arn?: string;
  name?: string;
  description?: string;
  dateCreated?: string;
  dateUpdated?: string;
  tags?: { [key: string]: string | undefined };
  regions?: string[];
}
export type DistributionConfigurationSummaryList = DistributionConfigurationSummary[];
export interface ListDistributionConfigurationsResponse {
  requestId?: string;
  distributionConfigurationSummaryList?: DistributionConfigurationSummary[];
  nextToken?: string;
}
export type ImageVersionArn = string;
export interface ListImageBuildVersionsRequest {
  imageVersionArn?: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface ImageSummary {
  arn?: string;
  name?: string;
  type?: ImageType;
  version?: string;
  platform?: Platform;
  osVersion?: string;
  state?: ImageState;
  owner?: string;
  dateCreated?: string;
  outputResources?: OutputResources;
  tags?: { [key: string]: string | undefined };
  buildType?: BuildType;
  imageSource?: ImageSource;
  deprecationTime?: Date;
  lifecycleExecutionId?: string;
  loggingConfiguration?: ImageLoggingConfiguration;
}
export type ImageSummaryList = ImageSummary[];
export interface ListImageBuildVersionsResponse {
  requestId?: string;
  imageSummaryList?: ImageSummary[];
  nextToken?: string;
}
export interface ListImagePackagesRequest {
  imageBuildVersionArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ImagePackage {
  packageName?: string;
  packageVersion?: string;
}
export type ImagePackageList = ImagePackage[];
export interface ListImagePackagesResponse {
  requestId?: string;
  imagePackageList?: ImagePackage[];
  nextToken?: string;
}
export interface ListImagePipelineImagesRequest {
  imagePipelineArn: string;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface ListImagePipelineImagesResponse {
  requestId?: string;
  imageSummaryList?: ImageSummary[];
  nextToken?: string;
}
export interface ListImagePipelinesRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export type ImagePipelineList = ImagePipeline[];
export interface ListImagePipelinesResponse {
  requestId?: string;
  imagePipelineList?: ImagePipeline[];
  nextToken?: string;
}
export interface ListImageRecipesRequest {
  owner?: Ownership;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface ImageRecipeSummary {
  arn?: string;
  name?: string;
  platform?: Platform;
  owner?: string;
  parentImage?: string;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
}
export type ImageRecipeSummaryList = ImageRecipeSummary[];
export interface ListImageRecipesResponse {
  requestId?: string;
  imageRecipeSummaryList?: ImageRecipeSummary[];
  nextToken?: string;
}
export interface ListImagesRequest {
  owner?: Ownership;
  filters?: Filter[];
  byName?: boolean;
  maxResults?: number;
  nextToken?: string;
  includeDeprecated?: boolean;
}
export interface ImageVersion {
  arn?: string;
  name?: string;
  type?: ImageType;
  version?: string;
  platform?: Platform;
  osVersion?: string;
  owner?: string;
  dateCreated?: string;
  buildType?: BuildType;
  imageSource?: ImageSource;
}
export type ImageVersionList = ImageVersion[];
export interface ListImagesResponse {
  requestId?: string;
  imageVersionList?: ImageVersion[];
  nextToken?: string;
}
export interface ListImageScanFindingAggregationsRequest {
  filter?: Filter;
  nextToken?: string;
}
export type SeverityCountNumber = number;
export interface SeverityCounts {
  all?: number;
  critical?: number;
  high?: number;
  medium?: number;
}
export interface AccountAggregation {
  accountId?: string;
  severityCounts?: SeverityCounts;
}
export interface ImageAggregation {
  imageBuildVersionArn?: string;
  severityCounts?: SeverityCounts;
}
export interface ImagePipelineAggregation {
  imagePipelineArn?: string;
  severityCounts?: SeverityCounts;
}
export interface VulnerabilityIdAggregation {
  vulnerabilityId?: string;
  severityCounts?: SeverityCounts;
}
export interface ImageScanFindingAggregation {
  accountAggregation?: AccountAggregation;
  imageAggregation?: ImageAggregation;
  imagePipelineAggregation?: ImagePipelineAggregation;
  vulnerabilityIdAggregation?: VulnerabilityIdAggregation;
}
export type ImageScanFindingAggregationsList = ImageScanFindingAggregation[];
export interface ListImageScanFindingAggregationsResponse {
  requestId?: string;
  aggregationType?: string;
  responses?: ImageScanFindingAggregation[];
  nextToken?: string;
}
export type ImageScanFindingsFilterValues = string[];
export interface ImageScanFindingsFilter {
  name?: string;
  values?: string[];
}
export type ImageScanFindingsFilterList = ImageScanFindingsFilter[];
export interface ListImageScanFindingsRequest {
  filters?: ImageScanFindingsFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface RemediationRecommendation {
  text?: string;
  url?: string;
}
export interface Remediation {
  recommendation?: RemediationRecommendation;
}
export type NonNegativeDouble = number;
export interface CvssScoreAdjustment {
  metric?: string;
  reason?: string;
}
export type CvssScoreAdjustmentList = CvssScoreAdjustment[];
export interface CvssScoreDetails {
  scoreSource?: string;
  cvssSource?: string;
  version?: string;
  score?: number;
  scoringVector?: string;
  adjustments?: CvssScoreAdjustment[];
}
export interface InspectorScoreDetails {
  adjustedCvss?: CvssScoreDetails;
}
export type VulnerabilityId = string;
export type SourceLayerHash = string;
export type PackageEpoch = number;
export type PackageArchitecture = string;
export interface VulnerablePackage {
  name?: string;
  version?: string;
  sourceLayerHash?: string;
  epoch?: number;
  release?: string;
  arch?: string;
  packageManager?: string;
  filePath?: string;
  fixedInVersion?: string;
  remediation?: string;
}
export type VulnerablePackageList = VulnerablePackage[];
export interface CvssScore {
  baseScore?: number;
  scoringVector?: string;
  version?: string;
  source?: string;
}
export type CvssScoreList = CvssScore[];
export type VulnerabilityIdList = string[];
export type NonEmptyStringList = string[];
export interface PackageVulnerabilityDetails {
  vulnerabilityId: string;
  vulnerablePackages?: VulnerablePackage[];
  source?: string;
  cvss?: CvssScore[];
  relatedVulnerabilities?: string[];
  sourceUrl?: string;
  vendorSeverity?: string;
  vendorCreatedAt?: Date;
  vendorUpdatedAt?: Date;
  referenceUrls?: string[];
}
export interface ImageScanFinding {
  awsAccountId?: string;
  imageBuildVersionArn?: string;
  imagePipelineArn?: string;
  type?: string;
  description?: string;
  title?: string;
  remediation?: Remediation;
  severity?: string;
  firstObservedAt?: Date;
  updatedAt?: Date;
  inspectorScore?: number;
  inspectorScoreDetails?: InspectorScoreDetails;
  packageVulnerabilityDetails?: PackageVulnerabilityDetails;
  fixAvailable?: string;
}
export type ImageScanFindingsList = ImageScanFinding[];
export interface ListImageScanFindingsResponse {
  requestId?: string;
  findings?: ImageScanFinding[];
  nextToken?: string;
}
export interface ListInfrastructureConfigurationsRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface InfrastructureConfigurationSummary {
  arn?: string;
  name?: string;
  description?: string;
  dateCreated?: string;
  dateUpdated?: string;
  resourceTags?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  instanceTypes?: string[];
  instanceProfileName?: string;
  placement?: Placement;
}
export type InfrastructureConfigurationSummaryList = InfrastructureConfigurationSummary[];
export interface ListInfrastructureConfigurationsResponse {
  requestId?: string;
  infrastructureConfigurationSummaryList?: InfrastructureConfigurationSummary[];
  nextToken?: string;
}
export interface ListLifecycleExecutionResourcesRequest {
  lifecycleExecutionId: string;
  parentResourceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type LifecycleExecutionResourceStatus =
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | "SUCCESS"
  | (string & {});
export interface LifecycleExecutionResourceState {
  status?: LifecycleExecutionResourceStatus;
  reason?: string;
}
export type LifecycleExecutionResourceActionName =
  | "AVAILABLE"
  | "DELETE"
  | "DEPRECATE"
  | "DISABLE"
  | (string & {});
export interface LifecycleExecutionResourceAction {
  name?: LifecycleExecutionResourceActionName;
  reason?: string;
}
export interface LifecycleExecutionSnapshotResource {
  snapshotId?: string;
  state?: LifecycleExecutionResourceState;
}
export type LifecycleExecutionSnapshotResourceList = LifecycleExecutionSnapshotResource[];
export interface LifecycleExecutionResource {
  accountId?: string;
  resourceId?: string;
  state?: LifecycleExecutionResourceState;
  action?: LifecycleExecutionResourceAction;
  region?: string;
  snapshots?: LifecycleExecutionSnapshotResource[];
  imageUris?: string[];
  startTime?: Date;
  endTime?: Date;
}
export type LifecycleExecutionResourceList = LifecycleExecutionResource[];
export interface ListLifecycleExecutionResourcesResponse {
  lifecycleExecutionId?: string;
  lifecycleExecutionState?: LifecycleExecutionState;
  resources?: LifecycleExecutionResource[];
  nextToken?: string;
}
export interface ListLifecycleExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  resourceArn: string;
}
export type LifecycleExecutionsList = LifecycleExecution[];
export interface ListLifecycleExecutionsResponse {
  lifecycleExecutions?: LifecycleExecution[];
  nextToken?: string;
}
export interface ListLifecyclePoliciesRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface LifecyclePolicySummary {
  arn?: string;
  name?: string;
  description?: string;
  status?: LifecyclePolicyStatus;
  executionRole?: string;
  resourceType?: LifecyclePolicyResourceType;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateLastRun?: Date;
  tags?: { [key: string]: string | undefined };
}
export type LifecyclePolicySummaryList = LifecyclePolicySummary[];
export interface ListLifecyclePoliciesResponse {
  lifecyclePolicySummaryList?: LifecyclePolicySummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListWaitingWorkflowStepsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface WorkflowStepExecution {
  stepExecutionId?: string;
  imageBuildVersionArn?: string;
  workflowExecutionId?: string;
  workflowBuildVersionArn?: string;
  name?: string;
  action?: string;
  startTime?: string;
}
export type WorkflowStepExecutionList = WorkflowStepExecution[];
export interface ListWaitingWorkflowStepsResponse {
  steps?: WorkflowStepExecution[];
  nextToken?: string;
}
export type WorkflowWildcardVersionArn = string;
export interface ListWorkflowBuildVersionsRequest {
  workflowVersionArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface WorkflowSummary {
  arn?: string;
  name?: string;
  version?: string;
  description?: string;
  changeDescription?: string;
  type?: WorkflowType;
  owner?: string;
  state?: WorkflowState;
  dateCreated?: string;
  tags?: { [key: string]: string | undefined };
}
export type WorkflowSummaryList = WorkflowSummary[];
export interface ListWorkflowBuildVersionsResponse {
  workflowSummaryList?: WorkflowSummary[];
  nextToken?: string;
}
export interface ListWorkflowExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  imageBuildVersionArn: string;
}
export interface WorkflowExecutionMetadata {
  workflowBuildVersionArn?: string;
  workflowExecutionId?: string;
  type?: WorkflowType;
  status?: WorkflowExecutionStatus;
  message?: string;
  totalStepCount?: number;
  totalStepsSucceeded?: number;
  totalStepsFailed?: number;
  totalStepsSkipped?: number;
  startTime?: string;
  endTime?: string;
  parallelGroup?: string;
  retried?: boolean;
}
export type WorkflowExecutionsList = WorkflowExecutionMetadata[];
export type ImageBuildMessage = string;
export interface ListWorkflowExecutionsResponse {
  requestId?: string;
  workflowExecutions?: WorkflowExecutionMetadata[];
  imageBuildVersionArn?: string;
  message?: string;
  nextToken?: string;
}
export interface ListWorkflowsRequest {
  owner?: Ownership;
  filters?: Filter[];
  byName?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export interface WorkflowVersion {
  arn?: string;
  name?: string;
  version?: string;
  description?: string;
  type?: WorkflowType;
  owner?: string;
  dateCreated?: string;
}
export type WorkflowVersionList = WorkflowVersion[];
export interface ListWorkflowsResponse {
  workflowVersionList?: WorkflowVersion[];
  nextToken?: string;
}
export interface ListWorkflowStepExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  workflowExecutionId: string;
}
export interface WorkflowStepMetadata {
  stepExecutionId?: string;
  name?: string;
  description?: string;
  action?: string;
  status?: WorkflowStepExecutionStatus;
  rollbackStatus?: WorkflowStepExecutionRollbackStatus;
  message?: string;
  inputs?: string;
  outputs?: string;
  startTime?: string;
  endTime?: string;
  attemptNumber?: number;
  maxAttempts?: number;
}
export type WorkflowStepExecutionsList = WorkflowStepMetadata[];
export interface ListWorkflowStepExecutionsResponse {
  requestId?: string;
  steps?: WorkflowStepMetadata[];
  workflowBuildVersionArn?: string;
  workflowExecutionId?: string;
  imageBuildVersionArn?: string;
  message?: string;
  nextToken?: string;
}
export interface PutComponentPolicyRequest {
  componentArn: string;
  policy: string;
}
export interface PutComponentPolicyResponse {
  requestId?: string;
  componentArn?: string;
}
export interface PutContainerRecipePolicyRequest {
  containerRecipeArn: string;
  policy: string;
}
export interface PutContainerRecipePolicyResponse {
  requestId?: string;
  containerRecipeArn?: string;
}
export interface PutImagePolicyRequest {
  imageArn: string;
  policy: string;
}
export interface PutImagePolicyResponse {
  requestId?: string;
  imageArn?: string;
}
export interface PutImageRecipePolicyRequest {
  imageRecipeArn: string;
  policy: string;
}
export interface PutImageRecipePolicyResponse {
  requestId?: string;
  imageRecipeArn?: string;
}
export interface RetryImageRequest {
  imageBuildVersionArn: string;
  clientToken: string;
}
export interface RetryImageResponse {
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export type WorkflowStepActionType = "RESUME" | "STOP" | (string & {});
export interface SendWorkflowStepActionRequest {
  stepExecutionId: string;
  imageBuildVersionArn: string;
  action: WorkflowStepActionType;
  reason?: string;
  clientToken: string;
}
export interface SendWorkflowStepActionResponse {
  stepExecutionId?: string;
  imageBuildVersionArn?: string;
  clientToken?: string;
}
export interface StartImagePipelineExecutionRequest {
  imagePipelineArn: string;
  clientToken: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartImagePipelineExecutionResponse {
  requestId?: string;
  clientToken?: string;
  imageBuildVersionArn?: string;
}
export type ResourceStatus = "AVAILABLE" | "DELETED" | "DEPRECATED" | "DISABLED" | (string & {});
export interface ResourceState {
  status?: ResourceStatus;
}
export interface ResourceStateUpdateIncludeResources {
  amis?: boolean;
  snapshots?: boolean;
  containers?: boolean;
}
export interface ResourceStateUpdateExclusionRules {
  amis?: LifecyclePolicyDetailExclusionRulesAmis;
}
export interface StartResourceStateUpdateRequest {
  resourceArn: string;
  state: ResourceState;
  executionRole?: string;
  includeResources?: ResourceStateUpdateIncludeResources;
  exclusionRules?: ResourceStateUpdateExclusionRules;
  updateAt?: Date;
  clientToken: string;
}
export interface StartResourceStateUpdateResponse {
  lifecycleExecutionId?: string;
  resourceArn?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDistributionConfigurationRequest {
  distributionConfigurationArn: string;
  description?: string;
  distributions: Distribution[];
  clientToken: string;
}
export interface UpdateDistributionConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  distributionConfigurationArn?: string;
}
export interface UpdateImagePipelineRequest {
  imagePipelineArn: string;
  description?: string;
  imageRecipeArn?: string;
  containerRecipeArn?: string;
  infrastructureConfigurationArn: string;
  distributionConfigurationArn?: string;
  imageTestsConfiguration?: ImageTestsConfiguration;
  enhancedImageMetadataEnabled?: boolean;
  schedule?: Schedule;
  status?: PipelineStatus;
  clientToken: string;
  imageScanningConfiguration?: ImageScanningConfiguration;
  workflows?: WorkflowConfiguration[];
  loggingConfiguration?: PipelineLoggingConfiguration;
  executionRole?: string;
  imageTags?: { [key: string]: string | undefined };
}
export interface UpdateImagePipelineResponse {
  requestId?: string;
  clientToken?: string;
  imagePipelineArn?: string;
}
export interface UpdateInfrastructureConfigurationRequest {
  infrastructureConfigurationArn: string;
  description?: string;
  instanceTypes?: string[];
  instanceProfileName: string;
  securityGroupIds?: string[];
  subnetId?: string;
  logging?: Logging;
  keyPair?: string;
  terminateInstanceOnFailure?: boolean;
  snsTopicArn?: string;
  resourceTags?: { [key: string]: string | undefined };
  instanceMetadataOptions?: InstanceMetadataOptions;
  placement?: Placement;
  clientToken: string;
}
export interface UpdateInfrastructureConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  infrastructureConfigurationArn?: string;
}
export interface UpdateLifecyclePolicyRequest {
  lifecyclePolicyArn: string;
  description?: string;
  status?: LifecyclePolicyStatus;
  executionRole: string;
  resourceType: LifecyclePolicyResourceType;
  policyDetails: LifecyclePolicyDetail[];
  resourceSelection: LifecyclePolicyResourceSelection;
  clientToken: string;
}
export interface UpdateLifecyclePolicyResponse {
  lifecyclePolicyArn?: string;
}
export type ErrorMessage = string;
export type CancelImageCreationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels the creation of an image. This operation can only be used on
 * images in a non-terminal state. Cancellation is asynchronous: the request
 * returns immediately, then Image Builder stops the running build and moves the image
 * to the `CANCELLED` state. Output resources that the build already
 * created, such as AMIs and snapshots, aren't removed.
 */
export const cancelImageCreation: API.OperationMethod<
  CancelImageCreationRequest,
  CancelImageCreationResponse,
  CancelImageCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelImageCreationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CancelImageCreationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelImageCreation",
}));

export type CancelLifecycleExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Cancels a lifecycle execution - a single run of lifecycle actions that a
 * lifecycle policy or a StartResourceStateUpdate request
 * started. You can only cancel an execution that hasn't reached a
 * terminal state. Cancellation is asynchronous and doesn't undo
 * completed lifecycle actions.
 */
export const cancelLifecycleExecution: API.OperationMethod<
  CancelLifecycleExecutionRequest,
  CancelLifecycleExecutionResponse,
  CancelLifecycleExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CancelLifecycleExecutionRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<CancelLifecycleExecutionResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelLifecycleExecution",
}));

export type CreateComponentError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterCombinationException
  | InvalidRequestException
  | InvalidVersionNumberException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new component that can be used to build, validate, test, and assess your
 * image. The component is based on a YAML document that you specify using exactly one of
 * the following methods:
 *
 * - Inline, using the `data` property in the request body.
 *
 * - A URL that points to a YAML document file stored in Amazon S3, using the
 * `uri` property in the request body.
 *
 * Image Builder determines the component type from the document. If the document
 * contains a single phase named `test`, the component type is
 * `TEST`. Otherwise, the component type is `BUILD`.
 */
export const createComponent: API.OperationMethod<
  CreateComponentRequest,
  CreateComponentResponse,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateComponentRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateComponentResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterCombinationException,
    InvalidRequestException,
    InvalidVersionNumberException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponent",
}));

export type CreateContainerRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | InvalidVersionNumberException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new container recipe. Container recipes define how images are configured,
 * tested, and assessed.
 */
export const createContainerRecipe: API.OperationMethod<
  CreateContainerRecipeRequest,
  CreateContainerRecipeResponse,
  CreateContainerRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateContainerRecipeRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CreateContainerRecipeResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    InvalidVersionNumberException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerRecipe",
}));

export type CreateDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterCombinationException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new distribution configuration. Distribution configurations define
 * and configure the outputs for your images, including the target Regions,
 * accounts, and settings for each Region.
 */
export const createDistributionConfiguration: API.OperationMethod<
  CreateDistributionConfigurationRequest,
  CreateDistributionConfigurationResponse,
  CreateDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateDistributionConfigurationRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<CreateDistributionConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterCombinationException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDistributionConfiguration",
}));

export type CreateImageError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new image along with all configured output resources defined in the
 * distribution configuration. You must specify exactly one recipe for your image, using
 * either a `containerRecipeArn` or an `imageRecipeArn`.
 *
 * The response returns as soon as Image Builder creates the new image resource.
 * The image build process runs asynchronously. To check its progress, call
 * GetImage and check the image status.
 */
export const createImage: API.OperationMethod<
  CreateImageRequest,
  CreateImageResponse,
  CreateImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<CreateImageRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<CreateImageResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImage",
}));

export type CreateImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new image pipeline. Use image pipelines to automate the creation and
 * distribution of images. You must specify exactly one recipe for the pipeline,
 * using either a `containerRecipeArn` or an
 * `imageRecipeArn`.
 */
export const createImagePipeline: API.OperationMethod<
  CreateImagePipelineRequest,
  CreateImagePipelineResponse,
  CreateImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreateImagePipelineRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<CreateImagePipelineResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImagePipeline",
}));

export type CreateImageRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | InvalidVersionNumberException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new image recipe. Image recipes define how images are configured, tested,
 * and assessed.
 */
export const createImageRecipe: API.OperationMethod<
  CreateImageRecipeRequest,
  CreateImageRecipeResponse,
  CreateImageRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateImageRecipeRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateImageRecipeResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    InvalidVersionNumberException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageRecipe",
}));

export type CreateInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Creates a new infrastructure configuration. An infrastructure configuration defines
 * the environment in which your image will be built and tested.
 */
export const createInfrastructureConfiguration: API.OperationMethod<
  CreateInfrastructureConfigurationRequest,
  CreateInfrastructureConfigurationResponse,
  CreateInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<CreateInfrastructureConfigurationRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<CreateInfrastructureConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInfrastructureConfiguration",
}));

export type CreateLifecyclePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a lifecycle policy resource.
 */
export const createLifecyclePolicy: API.OperationMethod<
  CreateLifecyclePolicyRequest,
  CreateLifecyclePolicyResponse,
  CreateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<CreateLifecyclePolicyRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<CreateLifecyclePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLifecyclePolicy",
}));

export type CreateWorkflowError =
  | CallRateLimitExceededException
  | ClientException
  | DryRunOperationException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterCombinationException
  | InvalidRequestException
  | InvalidVersionNumberException
  | ResourceInUseException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a new workflow or a new version of an existing workflow. If a workflow
 * with the same name and semantic version already exists, and your request changes
 * its configuration, Image Builder creates a new build version.
 * If the configuration is identical to the latest build version, the request
 * fails because that workflow configuration already exists.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<CreateWorkflowRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<CreateWorkflowResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    DryRunOperationException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterCombinationException,
    InvalidRequestException,
    InvalidVersionNumberException,
    ResourceInUseException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
}));

export type DeleteComponentError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a component build version. The request fails with
 * `ResourceDependencyException` if an image recipe or container
 * recipe references this component version. It also fails if the component
 * build version is shared with other accounts.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteComponentRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<DeleteComponentResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponent",
}));

export type DeleteContainerRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a container recipe. The request fails with
 * `ResourceDependencyException` if the recipe is shared with other
 * accounts, or if an image pipeline references it.
 */
export const deleteContainerRecipe: API.OperationMethod<
  DeleteContainerRecipeRequest,
  DeleteContainerRecipeResponse,
  DeleteContainerRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteContainerRecipeRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<DeleteContainerRecipeResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerRecipe",
}));

export type DeleteDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a distribution configuration. You can't delete a configuration
 * that an image pipeline still references. The request fails with
 * `ResourceDependencyException`. Update or delete the referencing
 * pipelines first.
 */
export const deleteDistributionConfiguration: API.OperationMethod<
  DeleteDistributionConfigurationRequest,
  DeleteDistributionConfigurationResponse,
  DeleteDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<DeleteDistributionConfigurationRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<DeleteDistributionConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDistributionConfiguration",
}));

export type DeleteImageError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Image Builder image resource. This does not delete any EC2 AMIs or ECR container
 * images that are created during the image build process. You must clean those up
 * separately, using the appropriate Amazon EC2 or Amazon ECR console actions, or API or CLI
 * commands.
 *
 * The request fails with `ResourceDependencyException` if the image
 * is shared with other accounts, or if other resources depend on it. It also
 * fails while the image build is still running. Cancel an in-progress build
 * with CancelImageCreation before you delete the image.
 *
 * - To deregister an EC2 Linux AMI, see Deregister your
 * Linux AMI in the
 * *Amazon EC2 User Guide*
 * .
 *
 * - To deregister an EC2 Windows AMI, see Deregister your
 * Windows AMI in the
 * *Amazon EC2 Windows Guide*
 * .
 *
 * - To delete a container image from Amazon ECR, see Deleting
 * an image in the *Amazon ECR User Guide*.
 */
export const deleteImage: API.OperationMethod<
  DeleteImageRequest,
  DeleteImageResponse,
  DeleteImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DeleteImageRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<DeleteImageResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImage",
}));

export type DeleteImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an image pipeline. Images that the pipeline created aren't
 * deleted - remove those separately with DeleteImage. You
 * can delete a pipeline while a build that it started is still running. The
 * build continues independently.
 */
export const deleteImagePipeline: API.OperationMethod<
  DeleteImagePipelineRequest,
  DeleteImagePipelineResponse,
  DeleteImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<DeleteImagePipelineRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<DeleteImagePipelineResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImagePipeline",
}));

export type DeleteImageRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an image recipe.
 */
export const deleteImageRecipe: API.OperationMethod<
  DeleteImageRecipeRequest,
  DeleteImageRecipeResponse,
  DeleteImageRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<DeleteImageRecipeRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<DeleteImageRecipeResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImageRecipe",
}));

export type DeleteInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an infrastructure configuration. You can't delete a configuration
 * that an image pipeline still references. The request fails with
 * `ResourceDependencyException`. Update or delete the referencing
 * pipelines first.
 */
export const deleteInfrastructureConfiguration: API.OperationMethod<
  DeleteInfrastructureConfigurationRequest,
  DeleteInfrastructureConfigurationResponse,
  DeleteInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DeleteInfrastructureConfigurationRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<DeleteInfrastructureConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInfrastructureConfiguration",
}));

export type DeleteLifecyclePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes the specified lifecycle policy resource. Deleting the policy removes
 * its schedule, so no further lifecycle runs occur for that policy. If a
 * lifecycle execution is in progress for the policy, Image Builder cancels it. Deletion
 * doesn't revert actions that the policy already applied to your
 * resources.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyRequest,
  DeleteLifecyclePolicyResponse,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DeleteLifecyclePolicyRequest>,
  output: __S(656, __c41, 0) as any as S.Schema<DeleteLifecyclePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
}));

export type DeleteWorkflowError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ResourceDependencyException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a specific workflow resource. You can't delete a workflow build
 * version while an image pipeline references it. The request fails with
 * `ResourceDependencyException`.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<DeleteWorkflowRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<DeleteWorkflowResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ResourceDependencyException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
}));

export type DistributeImageError =
  | AccessDeniedException
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Distributes an existing AMI to target Regions and accounts without running
 * the full image build process. This operation only runs the distribution
 * phase on an image that has already been built.
 */
export const distributeImage: API.OperationMethod<
  DistributeImageRequest,
  DistributeImageResponse,
  DistributeImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DistributeImageRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<DistributeImageResponse>,
  errors: [
    AccessDeniedException,
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DistributeImage",
}));

export type GetComponentError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a component object.
 */
export const getComponent: API.OperationMethod<
  GetComponentRequest,
  GetComponentResponse,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<GetComponentRequest>,
  output: __S(722, __c45, 2) as any as S.Schema<GetComponentResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
}));

export type GetComponentPolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a component policy.
 */
export const getComponentPolicy: API.OperationMethod<
  GetComponentPolicyRequest,
  GetComponentPolicyResponse,
  GetComponentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<GetComponentPolicyRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetComponentPolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponentPolicy",
}));

export type GetContainerRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a container recipe.
 */
export const getContainerRecipe: API.OperationMethod<
  GetContainerRecipeRequest,
  GetContainerRecipeResponse,
  GetContainerRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<GetContainerRecipeRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<GetContainerRecipeResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerRecipe",
}));

export type GetContainerRecipePolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the policy for a container recipe.
 */
export const getContainerRecipePolicy: API.OperationMethod<
  GetContainerRecipePolicyRequest,
  GetContainerRecipePolicyResponse,
  GetContainerRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<GetContainerRecipePolicyRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetContainerRecipePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerRecipePolicy",
}));

export type GetDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a distribution configuration.
 */
export const getDistributionConfiguration: API.OperationMethod<
  GetDistributionConfigurationRequest,
  GetDistributionConfigurationResponse,
  GetDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<GetDistributionConfigurationRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<GetDistributionConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDistributionConfiguration",
}));

export type GetImageError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves an image.
 */
export const getImage: API.OperationMethod<
  GetImageRequest,
  GetImageResponse,
  GetImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<GetImageRequest>,
  output: __S(898, __c56, 2) as any as S.Schema<GetImageResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImage",
}));

export type GetImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves an image pipeline.
 */
export const getImagePipeline: API.OperationMethod<
  GetImagePipelineRequest,
  GetImagePipelineResponse,
  GetImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<GetImagePipelineRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<GetImagePipelineResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImagePipeline",
}));

export type GetImagePolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves an image policy.
 */
export const getImagePolicy: API.OperationMethod<
  GetImagePolicyRequest,
  GetImagePolicyResponse,
  GetImagePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<GetImagePolicyRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetImagePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImagePolicy",
}));

export type GetImageRecipeError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves an image recipe.
 */
export const getImageRecipe: API.OperationMethod<
  GetImageRecipeRequest,
  GetImageRecipeResponse,
  GetImageRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<GetImageRecipeRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<GetImageRecipeResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImageRecipe",
}));

export type GetImageRecipePolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves an image recipe policy.
 */
export const getImageRecipePolicy: API.OperationMethod<
  GetImageRecipePolicyRequest,
  GetImageRecipePolicyResponse,
  GetImageRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<GetImageRecipePolicyRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetImageRecipePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ForbiddenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImageRecipePolicy",
}));

export type GetInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves an infrastructure configuration.
 */
export const getInfrastructureConfiguration: API.OperationMethod<
  GetInfrastructureConfigurationRequest,
  GetInfrastructureConfigurationResponse,
  GetInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<GetInfrastructureConfigurationRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<GetInfrastructureConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInfrastructureConfiguration",
}));

export type GetLifecycleExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves runtime information for a lifecycle execution - a single run of
 * lifecycle actions that a lifecycle policy or a
 * StartResourceStateUpdate request started.
 */
export const getLifecycleExecution: API.OperationMethod<
  GetLifecycleExecutionRequest,
  GetLifecycleExecutionResponse,
  GetLifecycleExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<GetLifecycleExecutionRequest>,
  output: __S(1057, __c66, 1) as any as S.Schema<GetLifecycleExecutionResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecycleExecution",
}));

export type GetLifecyclePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves details for the specified image lifecycle policy.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyRequest,
  GetLifecyclePolicyResponse,
  GetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<GetLifecyclePolicyRequest>,
  output: __S(1090, __c68, 2) as any as S.Schema<GetLifecyclePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
}));

export type GetMarketplaceResourceError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Verifies the subscription and performs resource dependency checks on the
 * requested Amazon Web Services Marketplace resource. The caller must be entitled to the resource. For
 * Amazon Web Services Marketplace components, the response contains fields to download the components
 * and their artifacts.
 */
export const getMarketplaceResource: API.OperationMethod<
  GetMarketplaceResourceRequest,
  GetMarketplaceResourceResponse,
  GetMarketplaceResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<GetMarketplaceResourceRequest>,
  output: __S(1105, __c69, 1) as any as S.Schema<GetMarketplaceResourceResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMarketplaceResource",
}));

export type GetWorkflowError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a workflow resource object.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<GetWorkflowRequest>,
  output: __S(1122, __c70, 2) as any as S.Schema<GetWorkflowResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
}));

export type GetWorkflowExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves runtime information for a specific runtime instance
 * of the workflow.
 */
export const getWorkflowExecution: API.OperationMethod<
  GetWorkflowExecutionRequest,
  GetWorkflowExecutionResponse,
  GetWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<GetWorkflowExecutionRequest>,
  output: __S(1137, __c71, 1) as any as S.Schema<GetWorkflowExecutionResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowExecution",
}));

export type GetWorkflowStepExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves runtime information for a specific runtime instance of
 * the workflow step.
 */
export const getWorkflowStepExecution: API.OperationMethod<
  GetWorkflowStepExecutionRequest,
  GetWorkflowStepExecutionResponse,
  GetWorkflowStepExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<GetWorkflowStepExecutionRequest>,
  output: __S(1153, __c72, 1) as any as S.Schema<GetWorkflowStepExecutionResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowStepExecution",
}));

export type ImportComponentError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterCombinationException
  | InvalidRequestException
  | InvalidVersionNumberException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Imports a component and transforms its data into a component document. For
 * the `SHELL` format, Image Builder wraps your script in a component
 * document with a single step that runs the script.
 */
export const importComponent: API.OperationMethod<
  ImportComponentRequest,
  ImportComponentResponse,
  ImportComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<ImportComponentRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<ImportComponentResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterCombinationException,
    InvalidRequestException,
    InvalidVersionNumberException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportComponent",
}));

export type ImportDiskImageError =
  | AccessDeniedException
  | ClientException
  | ServiceException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports a Windows operating system image from a verified Microsoft ISO disk
 * file. The following disk images are supported:
 *
 * - Windows 11 Enterprise
 *
 * The response returns as soon as Image Builder creates the new image resource in the
 * `PENDING` state. The conversion from ISO file to AMI then runs
 * asynchronously on an EC2 instance that Image Builder launches with the specified
 * infrastructure configuration.
 */
export const importDiskImage: API.OperationMethod<
  ImportDiskImageRequest,
  ImportDiskImageResponse,
  ImportDiskImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1186, __c74, 2) as any as S.Schema<ImportDiskImageRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<ImportDiskImageResponse>,
  errors: [
    AccessDeniedException,
    ClientException,
    ServiceException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDiskImage",
}));

export type ImportVmImageError =
  | ClientException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates an Image Builder image resource from an Amazon EC2 VM import task. The response
 * returns as soon as Image Builder creates the image resource in the
 * `PENDING` state. Image Builder then monitors the import task
 * asynchronously. When the task completes, Image Builder records the AMI that it
 * produced as the new image's output resource and marks the image
 * `AVAILABLE`. You can then use the imported image as the base
 * image for your recipes.
 *
 * To create the VM import task, use the Amazon EC2 API ImportImage
 * operation, or the import-image
 * CLI command.
 */
export const importVmImage: API.OperationMethod<
  ImportVmImageRequest,
  ImportVmImageResponse,
  ImportVmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<ImportVmImageRequest>,
  output: __S(1201, __c75, 1) as any as S.Schema<ImportVmImageResponse>,
  errors: [ClientException, ServiceException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportVmImage",
}));

export type ListComponentBuildVersionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of component build versions for the specified component
 * version ARN. You can only list build versions for components that your
 * account owns. Deprecated build versions aren't included in the
 * results.
 */
export const listComponentBuildVersions: API.PaginatedOperationMethod<
  ListComponentBuildVersionsRequest,
  ListComponentBuildVersionsResponse,
  ListComponentBuildVersionsError,
  Credentials | HttpClient.HttpClient,
  ComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<ListComponentBuildVersionsRequest>,
  output: __S(1219, __c76, 3) as any as S.Schema<ListComponentBuildVersionsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentBuildVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "componentSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the list of components that you have access to. By default, the
 * response doesn't include components in the
 * `DEPRECATED` state. To list deprecated components, use the
 * `status` filter with the value `DEPRECATED`.
 *
 * The semantic version has four nodes: ../.
 * You can assign values for the first three, and can filter on all of them.
 *
 * **Filtering:** You can use wildcards (x) to specify the most recent versions or nodes when
 * selecting the base image or components for your recipe. When you use a wildcard in any node, all nodes
 * to the right of the first wildcard must also be wildcards.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  ComponentVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<ListComponentsRequest>,
  output: __S(1235, __c77, 3) as any as S.Schema<ListComponentsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "componentVersionList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContainerRecipesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of container recipes.
 */
export const listContainerRecipes: API.PaginatedOperationMethod<
  ListContainerRecipesRequest,
  ListContainerRecipesResponse,
  ListContainerRecipesError,
  Credentials | HttpClient.HttpClient,
  ContainerRecipeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<ListContainerRecipesRequest>,
  output: __S(1283, __c80, 3) as any as S.Schema<ListContainerRecipesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerRecipes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "containerRecipeSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDistributionConfigurationsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of distribution configurations.
 */
export const listDistributionConfigurations: API.PaginatedOperationMethod<
  ListDistributionConfigurationsRequest,
  ListDistributionConfigurationsResponse,
  ListDistributionConfigurationsError,
  Credentials | HttpClient.HttpClient,
  DistributionConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<ListDistributionConfigurationsRequest>,
  output: __S(1299, __c81, 3) as any as S.Schema<ListDistributionConfigurationsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributionConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "distributionConfigurationSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImageBuildVersionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of image build versions.
 */
export const listImageBuildVersions: API.PaginatedOperationMethod<
  ListImageBuildVersionsRequest,
  ListImageBuildVersionsResponse,
  ListImageBuildVersionsError,
  Credentials | HttpClient.HttpClient,
  ImageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<ListImageBuildVersionsRequest>,
  output: __S(1330, __c83, 2) as any as S.Schema<ListImageBuildVersionsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImageBuildVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImagePackagesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the packages that are associated with an image build version, as determined by
 * Amazon Web Services Systems Manager Inventory at build time.
 */
export const listImagePackages: API.PaginatedOperationMethod<
  ListImagePackagesRequest,
  ListImagePackagesResponse,
  ListImagePackagesError,
  Credentials | HttpClient.HttpClient,
  ImagePackage
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<ListImagePackagesRequest>,
  output: __S(1347, __c84, 3) as any as S.Schema<ListImagePackagesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImagePackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imagePackageList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImagePipelineImagesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of images created by the specified pipeline.
 */
export const listImagePipelineImages: API.PaginatedOperationMethod<
  ListImagePipelineImagesRequest,
  ListImagePipelineImagesResponse,
  ListImagePipelineImagesError,
  Credentials | HttpClient.HttpClient,
  ImageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<ListImagePipelineImagesRequest>,
  output: __S(1330, __c83, 2) as any as S.Schema<ListImagePipelineImagesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImagePipelineImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImagePipelinesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of image pipelines.
 */
export const listImagePipelines: API.PaginatedOperationMethod<
  ListImagePipelinesRequest,
  ListImagePipelinesResponse,
  ListImagePipelinesError,
  Credentials | HttpClient.HttpClient,
  ImagePipeline
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<ListImagePipelinesRequest>,
  output: __S(1378, __c86, 2) as any as S.Schema<ListImagePipelinesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImagePipelines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imagePipelineList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImageRecipesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of image recipes.
 */
export const listImageRecipes: API.PaginatedOperationMethod<
  ListImageRecipesRequest,
  ListImageRecipesResponse,
  ListImageRecipesError,
  Credentials | HttpClient.HttpClient,
  ImageRecipeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<ListImageRecipesRequest>,
  output: __S(1395, __c87, 3) as any as S.Schema<ListImageRecipesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImageRecipes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageRecipeSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImagesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns the list of images that you have access to.
 */
export const listImages: API.PaginatedOperationMethod<
  ListImagesRequest,
  ListImagesResponse,
  ListImagesError,
  Credentials | HttpClient.HttpClient,
  ImageVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<ListImagesRequest>,
  output: __S(1411, __c88, 3) as any as S.Schema<ListImagesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageVersionList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImageScanFindingAggregationsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of image scan aggregations for your account. You can filter by the type
 * of key that Image Builder uses to group results. For example, if you want to get a list of
 * findings by severity level for one of your pipelines, you might specify your pipeline
 * with the `imagePipelineArn` filter. If you don't specify a filter, Image Builder
 * returns an aggregation for your account.
 *
 * To streamline results, you can use the following filters in your request:
 *
 * - `imageBuildVersionArn`
 *
 * - `imagePipelineArn`
 *
 * - `vulnerabilityId`
 */
export const listImageScanFindingAggregations: API.PaginatedOperationMethod<
  ListImageScanFindingAggregationsRequest,
  ListImageScanFindingAggregationsResponse,
  ListImageScanFindingAggregationsError,
  Credentials | HttpClient.HttpClient,
  ImageScanFindingAggregation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<ListImageScanFindingAggregationsRequest>,
  output: __S(1432, __c89, 8) as any as S.Schema<ListImageScanFindingAggregationsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImageScanFindingAggregations",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "responses" } as const,
})) as any;

export type ListImageScanFindingsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of image scan findings for your account. Amazon Inspector generates the
 * findings when it scans images that have scanning enabled.
 */
export const listImageScanFindings: API.PaginatedOperationMethod<
  ListImageScanFindingsRequest,
  ListImageScanFindingsResponse,
  ListImageScanFindingsError,
  Credentials | HttpClient.HttpClient,
  ImageScanFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<ListImageScanFindingsRequest>,
  output: __S(1454, __c90, 14) as any as S.Schema<ListImageScanFindingsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImageScanFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInfrastructureConfigurationsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of infrastructure configurations.
 */
export const listInfrastructureConfigurations: API.PaginatedOperationMethod<
  ListInfrastructureConfigurationsRequest,
  ListInfrastructureConfigurationsResponse,
  ListInfrastructureConfigurationsError,
  Credentials | HttpClient.HttpClient,
  InfrastructureConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<ListInfrastructureConfigurationsRequest>,
  output: __S(1459, __c91, 3) as any as S.Schema<ListInfrastructureConfigurationsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInfrastructureConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "infrastructureConfigurationSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLifecycleExecutionResourcesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists resources that the runtime instance of the image lifecycle identified for lifecycle actions.
 */
export const listLifecycleExecutionResources: API.PaginatedOperationMethod<
  ListLifecycleExecutionResourcesRequest,
  ListLifecycleExecutionResourcesResponse,
  ListLifecycleExecutionResourcesError,
  Credentials | HttpClient.HttpClient,
  LifecycleExecutionResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<ListLifecycleExecutionResourcesRequest>,
  output: __S(1478, __c92, 6) as any as S.Schema<ListLifecycleExecutionResourcesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLifecycleExecutionResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLifecycleExecutionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the lifecycle runtime history for the specified resource.
 */
export const listLifecycleExecutions: API.PaginatedOperationMethod<
  ListLifecycleExecutionsRequest,
  ListLifecycleExecutionsResponse,
  ListLifecycleExecutionsError,
  Credentials | HttpClient.HttpClient,
  LifecycleExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<ListLifecycleExecutionsRequest>,
  output: __S(1490, __c93, 2) as any as S.Schema<ListLifecycleExecutionsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLifecycleExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "lifecycleExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLifecyclePoliciesError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a list of lifecycle policies in your Amazon Web Services account.
 */
export const listLifecyclePolicies: API.PaginatedOperationMethod<
  ListLifecyclePoliciesRequest,
  ListLifecyclePoliciesResponse,
  ListLifecyclePoliciesError,
  Credentials | HttpClient.HttpClient,
  LifecyclePolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<ListLifecyclePoliciesRequest>,
  output: __S(1507, __c94, 3) as any as S.Schema<ListLifecyclePoliciesResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLifecyclePolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "lifecyclePolicySummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * Returns the list of tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1521, __c95, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWaitingWorkflowStepsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the workflow steps in your Amazon Web Services account that have paused at a
 * `WaitForAction` step, and are waiting for you to respond. To send
 * a response, call SendWorkflowStepAction.
 */
export const listWaitingWorkflowSteps: API.PaginatedOperationMethod<
  ListWaitingWorkflowStepsRequest,
  ListWaitingWorkflowStepsResponse,
  ListWaitingWorkflowStepsError,
  Credentials | HttpClient.HttpClient,
  WorkflowStepExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<ListWaitingWorkflowStepsRequest>,
  output: __S(1539, __c96, 3) as any as S.Schema<ListWaitingWorkflowStepsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWaitingWorkflowSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "steps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowBuildVersionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of build versions for a specific workflow resource.
 */
export const listWorkflowBuildVersions: API.PaginatedOperationMethod<
  ListWorkflowBuildVersionsRequest,
  ListWorkflowBuildVersionsResponse,
  ListWorkflowBuildVersionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<ListWorkflowBuildVersionsRequest>,
  output: __S(1555, __c97, 3) as any as S.Schema<ListWorkflowBuildVersionsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowBuildVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowExecutionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of workflow runtime instance metadata objects for a specific image build
 * version.
 */
export const listWorkflowExecutions: API.PaginatedOperationMethod<
  ListWorkflowExecutionsRequest,
  ListWorkflowExecutionsResponse,
  ListWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowExecutionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<ListWorkflowExecutionsRequest>,
  output: __S(1571, __c98, 3) as any as S.Schema<ListWorkflowExecutionsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists workflow versions based on filtering parameters. To list the build
 * versions of a specific workflow version, call
 * ListWorkflowBuildVersions.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(1587, __c99, 3) as any as S.Schema<ListWorkflowsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowVersionList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowStepExecutionsError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidPaginationTokenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns runtime data for each step in a runtime instance of the workflow
 * that you specify in the request.
 */
export const listWorkflowStepExecutions: API.PaginatedOperationMethod<
  ListWorkflowStepExecutionsRequest,
  ListWorkflowStepExecutionsResponse,
  ListWorkflowStepExecutionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowStepMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<ListWorkflowStepExecutionsRequest>,
  output: __S(1603, __c100, 3) as any as S.Schema<ListWorkflowStepExecutionsResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidPaginationTokenException,
    InvalidRequestException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowStepExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "steps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutComponentPolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies a policy to a component. The preferred way to share resources is with
 * the RAM API CreateResourceShare. If you use the PutComponentPolicy operation instead, you
 * must also call the RAM API PromoteResourceShareCreatedFromPolicy. Otherwise, the resource
 * isn't visible to the principals that it's shared with.
 */
export const putComponentPolicy: API.OperationMethod<
  PutComponentPolicyRequest,
  PutComponentPolicyResponse,
  PutComponentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<PutComponentPolicyRequest>,
  output: __S(1617, __c101, 1) as any as S.Schema<PutComponentPolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutComponentPolicy",
}));

export type PutContainerRecipePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies a policy to a container recipe. The preferred way to share resources is with
 * the RAM API CreateResourceShare. If you use the PutContainerRecipePolicy operation instead, you
 * must also call the RAM API PromoteResourceShareCreatedFromPolicy. Otherwise, the resource
 * isn't visible to the principals that it's shared with.
 */
export const putContainerRecipePolicy: API.OperationMethod<
  PutContainerRecipePolicyRequest,
  PutContainerRecipePolicyResponse,
  PutContainerRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<PutContainerRecipePolicyRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<PutContainerRecipePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContainerRecipePolicy",
}));

export type PutImagePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies a policy to an image. The preferred way to share resources is with
 * the RAM API CreateResourceShare. If you use the PutImagePolicy operation instead, you
 * must also call the RAM API PromoteResourceShareCreatedFromPolicy. Otherwise, the resource
 * isn't visible to the principals that it's shared with.
 */
export const putImagePolicy: API.OperationMethod<
  PutImagePolicyRequest,
  PutImagePolicyResponse,
  PutImagePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<PutImagePolicyRequest>,
  output: __S(1649, __c103, 1) as any as S.Schema<PutImagePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImagePolicy",
}));

export type PutImageRecipePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies a policy to an image recipe. The preferred way to share resources is with
 * the RAM API CreateResourceShare. If you use the PutImageRecipePolicy operation instead, you
 * must also call the RAM API PromoteResourceShareCreatedFromPolicy. Otherwise, the resource
 * isn't visible to the principals that it's shared with.
 */
export const putImageRecipePolicy: API.OperationMethod<
  PutImageRecipePolicyRequest,
  PutImageRecipePolicyResponse,
  PutImageRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<PutImageRecipePolicyRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<PutImageRecipePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImageRecipePolicy",
}));

export type RetryImageError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retries a failed or canceled image build without rebuilding the phases
 * that already completed. The image re-runs asynchronously in place: the same
 * build version returns to the test or distribution phase where it failed and
 * continues from there. No new image build version is created. Retry is only
 * supported for AMI-based images.
 */
export const retryImage: API.OperationMethod<
  RetryImageRequest,
  RetryImageResponse,
  RetryImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<RetryImageRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<RetryImageResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryImage",
}));

export type SendWorkflowStepActionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sends an action to a workflow step that has paused at a
 * `WaitForAction` step, so that image creation can continue.
 * To find the steps that are waiting for an action, call
 * ListWaitingWorkflowSteps.
 */
export const sendWorkflowStepAction: API.OperationMethod<
  SendWorkflowStepActionRequest,
  SendWorkflowStepActionResponse,
  SendWorkflowStepActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<SendWorkflowStepActionRequest>,
  output: __S(1697, __c106, 1) as any as S.Schema<SendWorkflowStepActionResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWorkflowStepAction",
}));

export type StartImagePipelineExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Manually triggers a pipeline to create an image. You can start a build
 * this way whether the pipeline is enabled or disabled. The response returns
 * as soon as Image Builder creates the new image resource and queues the build. Use
 * the returned `imageBuildVersionArn` with
 * GetImage to track build progress.
 */
export const startImagePipelineExecution: API.OperationMethod<
  StartImagePipelineExecutionRequest,
  StartImagePipelineExecutionResponse,
  StartImagePipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<StartImagePipelineExecutionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<StartImagePipelineExecutionResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImagePipelineExecution",
}));

export type StartResourceStateUpdateError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Begins an ad-hoc state change for the specified image build version.
 * This is a one-time operation - if you schedule the update, it runs only
 * once. If the
 * request includes underlying resources, or schedules the update far enough in
 * the future, Image Builder runs the update as an asynchronous lifecycle execution and
 * returns its identifier. Otherwise, for target states other than
 * `DELETED`, the state change applies immediately. If a request
 * that starts a lifecycle execution arrives while the image already has one in
 * progress, Image Builder rejects it.
 */
export const startResourceStateUpdate: API.OperationMethod<
  StartResourceStateUpdateRequest,
  StartResourceStateUpdateResponse,
  StartResourceStateUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1730, __c108, 2) as any as S.Schema<StartResourceStateUpdateRequest>,
  output: __S(1731, __c108, 3) as any as S.Schema<StartResourceStateUpdateResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartResourceStateUpdate",
}));

export type TagResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * Adds a tag to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1760, __c110, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidParameterException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1760, __c110, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InvalidParameterException, ResourceNotFoundException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterCombinationException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a distribution configuration. Distribution configurations define and
 * configure the outputs for your images, including the target Regions,
 * accounts, and settings for each Region.
 *
 * This operation doesn't support selective updates. The request
 * replaces the stored configuration, so include every setting that you
 * want to keep.
 */
export const updateDistributionConfiguration: API.OperationMethod<
  UpdateDistributionConfigurationRequest,
  UpdateDistributionConfigurationResponse,
  UpdateDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<UpdateDistributionConfigurationRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<UpdateDistributionConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterCombinationException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDistributionConfiguration",
}));

export type UpdateImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an image pipeline. Use image pipelines to automate the creation and
 * distribution of images. You must specify exactly one recipe for your image, using either
 * a `containerRecipeArn` or an `imageRecipeArn`. The
 * recipe must be the same type, image or container, as the pipeline's current
 * recipe.
 *
 * UpdateImagePipeline does not support selective updates. The request
 * replaces the pipeline's entire configuration, so include every setting
 * that you want to keep. Any optional property that you omit is removed
 * or reset to its default.
 */
export const updateImagePipeline: API.OperationMethod<
  UpdateImagePipelineRequest,
  UpdateImagePipelineResponse,
  UpdateImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<UpdateImagePipelineRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<UpdateImagePipelineResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImagePipeline",
}));

export type UpdateInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | ResourceNotFoundException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Updates an infrastructure configuration. An infrastructure configuration defines
 * the environment in which Image Builder builds and tests your image.
 *
 * This operation doesn't support selective updates.
 * The request replaces the configuration, so include every setting that
 * you want to keep. Omitted optional properties are cleared.
 */
export const updateInfrastructureConfiguration: API.OperationMethod<
  UpdateInfrastructureConfigurationRequest,
  UpdateInfrastructureConfigurationResponse,
  UpdateInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<UpdateInfrastructureConfigurationRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateInfrastructureConfigurationResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
    ResourceNotFoundException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInfrastructureConfiguration",
}));

export type UpdateLifecyclePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | IdempotentParameterMismatchException
  | InvalidParameterCombinationException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the specified lifecycle policy. The request replaces the existing
 * policy configuration rather than merging changes, so re-specify every setting
 * that you want to keep. The `resourceType` must match the existing
 * policy's value.
 */
export const updateLifecyclePolicy: API.OperationMethod<
  UpdateLifecyclePolicyRequest,
  UpdateLifecyclePolicyResponse,
  UpdateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<UpdateLifecyclePolicyRequest>,
  output: __S(656, __c41, 0) as any as S.Schema<UpdateLifecyclePolicyResponse>,
  errors: [
    CallRateLimitExceededException,
    ClientException,
    ForbiddenException,
    IdempotentParameterMismatchException,
    InvalidParameterCombinationException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLifecyclePolicy",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageBuildVersionArn: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CancelImageCreation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelImageCreationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CancelImageCreationResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lifecycleExecutionId: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CancelLifecycleExecution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelLifecycleExecutionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ lifecycleExecutionId: S.optional(S.String) })).annotate({
        identifier: "CancelLifecycleExecutionResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          semanticVersion: S.String,
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          platform: S.String,
          supportedOsVersions: S.optional(__S(80, __c5, 0)),
          data: S.optional(S.String),
          uri: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/CreateComponent" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateComponentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          componentBuildVersionArn: S.optional(S.String),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateComponentResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          latestVersionArn: S.optional(S.String),
          latestMajorVersionArn: S.optional(S.String),
          latestMinorVersionArn: S.optional(S.String),
          latestPatchVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "LatestVersionReferences" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containerType: S.String,
          name: S.String,
          description: S.optional(S.String),
          semanticVersion: S.String,
          components: S.optional(__S(161, __c10, 1)),
          instanceConfiguration: S.optional(__S(176, __c11, 0)),
          dockerfileTemplateData: S.optional(S.String),
          dockerfileTemplateUri: S.optional(S.String),
          platformOverride: S.optional(S.String),
          imageOsVersionOverride: S.optional(S.String),
          parentImage: S.String,
          tags: S.optional(__S(64, __c4, 0)),
          workingDirectory: S.optional(S.String),
          targetRepository: __S(128, __c8, 0),
          kmsKeyId: S.optional(S.String),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CreateContainerRecipe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContainerRecipeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          containerRecipeArn: S.optional(S.String),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateContainerRecipeResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ service: S.String, repositoryName: S.String })).annotate({
        identifier: "TargetContainerRepository",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: __S(80, __c5, 0) })).annotate({
        identifier: "ComponentParameter",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ componentArn: S.String, parameters: S.optional(__S(145, __c9, 1)) }),
      ).annotate({ identifier: "ComponentConfiguration" });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          encrypted: S.optional(S.Boolean),
          deleteOnTermination: S.optional(S.Boolean),
          iops: S.optional(S.Number),
          kmsKeyId: S.optional(S.String),
          snapshotId: S.optional(S.String),
          volumeSize: S.optional(S.Number),
          volumeType: S.optional(S.String),
          throughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EbsInstanceBlockDeviceSpecification" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          deviceName: S.optional(S.String),
          ebs: S.optional(__S(162, __c10, 2)),
          virtualName: S.optional(S.String),
          noDevice: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceBlockDeviceMapping" });
    case 4:
      return S.Array(__S(163, __c10, 3));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          image: S.optional(S.String),
          blockDeviceMappings: S.optional(__S(164, __c10, 4)),
        }),
      ).annotate({ identifier: "InstanceConfiguration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          distributions: __S(221, __c13, 13),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CreateDistributionConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDistributionConfigurationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userIds: S.optional(__S(80, __c5, 0)),
          userGroups: S.optional(__S(80, __c5, 0)),
          organizationArns: S.optional(__S(80, __c5, 0)),
          organizationalUnitArns: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "LaunchPermissionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          targetAccountIds: S.optional(__S(80, __c5, 0)),
          amiTags: S.optional(__S(64, __c4, 0)),
          kmsKeyId: S.optional(S.String),
          launchPermission: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "AmiDistributionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          containerTags: S.optional(__S(80, __c5, 0)),
          targetRepository: __S(128, __c8, 0),
        }),
      ).annotate({ identifier: "ContainerDistributionConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          launchTemplateId: S.String,
          accountId: S.optional(S.String),
          setDefaultVersion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LaunchTemplateConfiguration" });
    case 4:
      return S.Array(__S(211, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          roleName: S.String,
          diskImageFormat: S.String,
          s3Bucket: S.String,
          s3Prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ExportConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ targetResourceCount: S.optional(S.Number) })).annotate({
        identifier: "FastLaunchSnapshotConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          launchTemplateId: S.optional(S.String),
          launchTemplateName: S.optional(S.String),
          launchTemplateVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "FastLaunchLaunchTemplateSpecification" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          snapshotConfiguration: S.optional(__S(214, __c13, 6)),
          maxParallelLaunches: S.optional(S.Number),
          launchTemplate: S.optional(__S(215, __c13, 7)),
          accountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "FastLaunchConfiguration" });
    case 9:
      return S.Array(__S(216, __c13, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          amiAccountId: S.optional(S.String),
          parameterName: S.String,
          dataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SsmParameterConfiguration" });
    case 11:
      return S.Array(__S(218, __c13, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          region: S.String,
          amiDistributionConfiguration: S.optional(__S(209, __c13, 1)),
          containerDistributionConfiguration: S.optional(__S(210, __c13, 2)),
          licenseConfigurationArns: S.optional(__S(80, __c5, 0)),
          launchTemplateConfigurations: S.optional(__S(212, __c13, 4)),
          s3ExportConfiguration: S.optional(__S(213, __c13, 5)),
          fastLaunchConfigurations: S.optional(__S(217, __c13, 9)),
          ssmParameterConfigurations: S.optional(__S(219, __c13, 11)),
        }),
      ).annotate({ identifier: "Distribution" });
    case 13:
      return S.Array(__S(220, __c13, 12));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          distributionConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDistributionConfigurationResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageRecipeArn: S.optional(S.String),
          containerRecipeArn: S.optional(S.String),
          distributionConfigurationArn: S.optional(S.String),
          infrastructureConfigurationArn: S.String,
          imageTestsConfiguration: S.optional(__S(256, __c16, 0)),
          enhancedImageMetadataEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          imageScanningConfiguration: S.optional(__S(258, __c16, 2)),
          workflows: S.optional(__S(260, __c16, 4)),
          executionRole: S.optional(S.String),
          loggingConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/CreateImage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateImageResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageTestsEnabled: S.optional(S.Boolean),
          timeoutMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImageTestsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          containerTags: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "EcrConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          imageScanningEnabled: S.optional(S.Boolean),
          ecrConfiguration: S.optional(__S(257, __c16, 1)),
        }),
      ).annotate({ identifier: "ImageScanningConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowArn: S.String,
          parameters: S.optional(__S(145, __c9, 1)),
          parallelGroup: S.optional(S.String),
          onFailure: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowConfiguration" });
    case 4:
      return S.Array(__S(259, __c16, 3));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ logGroupName: S.optional(S.String) })).annotate({
        identifier: "ImageLoggingConfiguration",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          imageRecipeArn: S.optional(S.String),
          containerRecipeArn: S.optional(S.String),
          infrastructureConfigurationArn: S.String,
          distributionConfigurationArn: S.optional(S.String),
          imageTestsConfiguration: S.optional(__S(256, __c16, 0)),
          enhancedImageMetadataEnabled: S.optional(S.Boolean),
          schedule: S.optional(__S(305, __c19, 1)),
          status: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          imageTags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          imageScanningConfiguration: S.optional(__S(258, __c16, 2)),
          workflows: S.optional(__S(260, __c16, 4)),
          executionRole: S.optional(S.String),
          loggingConfiguration: S.optional(__S(306, __c19, 2)),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CreateImagePipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateImagePipelineRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ failureCount: S.Number })).annotate({
        identifier: "AutoDisablePolicy",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scheduleExpression: S.optional(S.String),
          timezone: S.optional(S.String),
          pipelineExecutionStartCondition: S.optional(S.String),
          autoDisablePolicy: S.optional(__S(304, __c19, 0)),
        }),
      ).annotate({ identifier: "Schedule" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          imageLogGroupName: S.optional(S.String),
          pipelineLogGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PipelineLoggingConfiguration" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          imagePipelineArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateImagePipelineResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          semanticVersion: S.String,
          components: S.optional(__S(161, __c10, 1)),
          parentImage: S.String,
          blockDeviceMappings: S.optional(__S(164, __c10, 4)),
          tags: S.optional(__S(64, __c4, 0)),
          workingDirectory: S.optional(S.String),
          additionalInstanceConfiguration: S.optional(__S(353, __c22, 1)),
          amiTags: S.optional(__S(64, __c4, 0)),
          amiWatermarks: S.optional(__S(80, __c5, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/CreateImageRecipe" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateImageRecipeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          imageRecipeArn: S.optional(S.String),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateImageRecipeResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ uninstallAfterBuild: S.optional(S.Boolean) })).annotate({
        identifier: "SystemsManagerAgent",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          systemsManagerAgent: S.optional(__S(352, __c22, 0)),
          userDataOverride: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdditionalInstanceConfiguration" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          instanceTypes: S.optional(__S(80, __c5, 0)),
          instanceProfileName: S.String,
          securityGroupIds: S.optional(__S(80, __c5, 0)),
          subnetId: S.optional(S.String),
          logging: S.optional(__S(401, __c25, 1)),
          keyPair: S.optional(S.String),
          terminateInstanceOnFailure: S.optional(S.Boolean),
          snsTopicArn: S.optional(S.String),
          resourceTags: S.optional(__S(64, __c4, 0)),
          instanceMetadataOptions: S.optional(__S(402, __c25, 2)),
          tags: S.optional(__S(64, __c4, 0)),
          placement: S.optional(__S(384, __c24, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CreateInfrastructureConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInfrastructureConfigurationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          availabilityZone: S.optional(S.String),
          tenancy: S.optional(S.String),
          hostId: S.optional(S.String),
          hostResourceGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Placement" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ s3BucketName: S.optional(S.String), s3KeyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Logs" });
    case 1:
      return S.suspend(() => S.Struct({ s3Logs: S.optional(__S(400, __c25, 0)) })).annotate({
        identifier: "Logging",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          httpTokens: S.optional(S.String),
          httpPutResponseHopLimit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceMetadataOptions" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          infrastructureConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateInfrastructureConfigurationResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          status: S.optional(S.String),
          executionRole: S.String,
          resourceType: S.String,
          policyDetails: __S(468, __c29, 4),
          resourceSelection: __S(471, __c29, 7),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/CreateLifecyclePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLifecyclePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ clientToken: S.optional(S.String), lifecyclePolicyArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateLifecyclePolicyResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          amis: S.optional(S.Boolean),
          snapshots: S.optional(S.Boolean),
          containers: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LifecyclePolicyDetailActionIncludeResources" });
    case 1:
      return S.suspend(() => S.Struct({ value: S.Number, unit: S.String })).annotate({
        identifier: "LifecyclePolicyDetailExclusionRulesAmisLastLaunched",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          isPublic: S.optional(S.Boolean),
          regions: S.optional(__S(80, __c5, 0)),
          sharedAccounts: S.optional(__S(80, __c5, 0)),
          lastLaunched: S.optional(__S(449, __c28, 1)),
          tagMap: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "LifecyclePolicyDetailExclusionRulesAmis" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.String, includeResources: S.optional(__S(448, __c28, 0)) }),
      ).annotate({ identifier: "LifecyclePolicyDetailAction" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          value: S.Number,
          unit: S.optional(S.String),
          retainAtLeast: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LifecyclePolicyDetailFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({ tagMap: S.optional(__S(64, __c4, 0)), amis: S.optional(__S(450, __c28, 2)) }),
      ).annotate({ identifier: "LifecyclePolicyDetailExclusionRules" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          action: __S(464, __c29, 0),
          filter: __S(465, __c29, 1),
          exclusionRules: S.optional(__S(466, __c29, 2)),
        }),
      ).annotate({ identifier: "LifecyclePolicyDetail" });
    case 4:
      return S.Array(__S(467, __c29, 3));
    case 5:
      return S.suspend(() => S.Struct({ name: S.String, semanticVersion: S.String })).annotate({
        identifier: "LifecyclePolicyResourceSelectionRecipe",
      });
    case 6:
      return S.Array(__S(469, __c29, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ recipes: S.optional(__S(470, __c29, 6)), tagMap: S.optional(__S(64, __c4, 0)) }),
      ).annotate({ identifier: "LifecyclePolicyResourceSelection" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          semanticVersion: S.String,
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          data: S.optional(S.String),
          uri: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          type: S.String,
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/CreateWorkflow" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String),
          workflowBuildVersionArn: S.optional(S.String),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateWorkflowResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentBuildVersionArn: S.String.pipe(T.HttpQuery("componentBuildVersionArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteComponent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteComponentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          componentBuildVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteComponentResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerRecipeArn: S.String.pipe(T.HttpQuery("containerRecipeArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteContainerRecipe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContainerRecipeRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), containerRecipeArn: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteContainerRecipeResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          distributionConfigurationArn: S.String.pipe(T.HttpQuery("distributionConfigurationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteDistributionConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDistributionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          distributionConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteDistributionConfigurationResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageBuildVersionArn: S.String.pipe(T.HttpQuery("imageBuildVersionArn")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/DeleteImage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), imageBuildVersionArn: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteImageResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imagePipelineArn: S.String.pipe(T.HttpQuery("imagePipelineArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteImagePipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteImagePipelineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), imagePipelineArn: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteImagePipelineResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageRecipeArn: S.String.pipe(T.HttpQuery("imageRecipeArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteImageRecipe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteImageRecipeRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), imageRecipeArn: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteImageRecipeResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          infrastructureConfigurationArn: S.String.pipe(
            T.HttpQuery("infrastructureConfigurationArn"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteInfrastructureConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInfrastructureConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          infrastructureConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteInfrastructureConfigurationResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lifecyclePolicyArn: S.String.pipe(T.HttpQuery("lifecyclePolicyArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/DeleteLifecyclePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLifecyclePolicyRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ lifecyclePolicyArn: S.optional(S.String) })).annotate({
        identifier: "DeleteLifecyclePolicyResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowBuildVersionArn: S.String.pipe(T.HttpQuery("workflowBuildVersionArn")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/DeleteWorkflow" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWorkflowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ workflowBuildVersionArn: S.optional(S.String) })).annotate({
        identifier: "DeleteWorkflowResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceImage: S.String,
          distributionConfigurationArn: S.String,
          executionRole: S.String,
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          loggingConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/DistributeImage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DistributeImageRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clientToken: S.optional(S.String), imageBuildVersionArn: S.optional(S.String) }),
      ).annotate({ identifier: "DistributeImageResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentBuildVersionArn: S.String.pipe(T.HttpQuery("componentBuildVersionArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/GetComponent" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComponentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          type: S.optional(S.String),
          platform: S.optional(S.String),
          supportedOsVersions: S.optional(__S(80, __c5, 0)),
          state: S.optional(__S(736, __c46, 0)),
          parameters: S.optional(__S(753, __c47, 1)),
          owner: S.optional(S.String),
          data: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          encrypted: S.optional(S.Boolean),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          publisher: S.optional(S.String),
          obfuscate: S.optional(S.Boolean),
          productCodes: S.optional(__S(769, __c48, 1)),
        }),
      ).annotate({ identifier: "Component" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          component: S.optional(__S(721, __c45, 1)),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "GetComponentResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "ComponentState" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          defaultValue: S.optional(__S(80, __c5, 0)),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentParameterDetail" });
    case 1:
      return S.Array(__S(752, __c47, 0));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productCodeId: S.String, productCodeType: S.String }),
      ).annotate({ identifier: "ProductCodeListItem" });
    case 1:
      return S.Array(__S(768, __c48, 0));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ componentArn: S.String.pipe(T.HttpQuery("componentArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetComponentPolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetComponentPolicyRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), policy: S.optional(S.String) }),
      ).annotate({ identifier: "GetComponentPolicyResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerRecipeArn: S.String.pipe(T.HttpQuery("containerRecipeArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetContainerRecipe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerRecipeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          containerRecipe: S.optional(__S(832, __c52, 0)),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "GetContainerRecipeResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          containerType: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          platform: S.optional(S.String),
          owner: S.optional(S.String),
          version: S.optional(S.String),
          components: S.optional(__S(161, __c10, 1)),
          instanceConfiguration: S.optional(__S(176, __c11, 0)),
          dockerfileTemplateData: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          encrypted: S.optional(S.Boolean),
          parentImage: S.optional(S.String),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          workingDirectory: S.optional(S.String),
          targetRepository: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "ContainerRecipe" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerRecipeArn: S.String.pipe(T.HttpQuery("containerRecipeArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetContainerRecipePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContainerRecipePolicyRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          distributionConfigurationArn: S.String.pipe(T.HttpQuery("distributionConfigurationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetDistributionConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDistributionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          distributionConfiguration: S.optional(__S(880, __c55, 0)),
        }),
      ).annotate({ identifier: "GetDistributionConfigurationResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          distributions: S.optional(__S(221, __c13, 13)),
          timeoutMinutes: S.optional(S.Number),
          dateCreated: S.optional(S.String),
          dateUpdated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "DistributionConfiguration" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageBuildVersionArn: S.String.pipe(T.HttpQuery("imageBuildVersionArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/GetImage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          type: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          platform: S.optional(S.String),
          enhancedImageMetadataEnabled: S.optional(S.Boolean),
          osVersion: S.optional(S.String),
          state: S.optional(__S(949, __c59, 5)),
          imageRecipe: S.optional(__S(912, __c57, 0)),
          containerRecipe: S.optional(__S(832, __c52, 0)),
          sourcePipelineName: S.optional(S.String),
          sourcePipelineArn: S.optional(S.String),
          infrastructureConfiguration: S.optional(__S(928, __c58, 0)),
          distributionConfiguration: S.optional(__S(880, __c55, 0)),
          imageTestsConfiguration: S.optional(__S(256, __c16, 0)),
          dateCreated: S.optional(S.String),
          outputResources: S.optional(__S(954, __c59, 10)),
          tags: S.optional(__S(64, __c4, 0)),
          buildType: S.optional(S.String),
          imageSource: S.optional(S.String),
          scanState: S.optional(__S(736, __c46, 0)),
          imageScanningConfiguration: S.optional(__S(258, __c16, 2)),
          deprecationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleExecutionId: S.optional(S.String),
          executionRole: S.optional(S.String),
          workflows: S.optional(__S(260, __c16, 4)),
          loggingConfiguration: S.optional(__S(272, __c17, 0)),
        }),
      ).annotate({ identifier: "Image" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          image: S.optional(__S(897, __c56, 1)),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "GetImageResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          type: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          platform: S.optional(S.String),
          owner: S.optional(S.String),
          version: S.optional(S.String),
          components: S.optional(__S(161, __c10, 1)),
          parentImage: S.optional(S.String),
          blockDeviceMappings: S.optional(__S(164, __c10, 4)),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          workingDirectory: S.optional(S.String),
          additionalInstanceConfiguration: S.optional(__S(353, __c22, 1)),
          amiTags: S.optional(__S(64, __c4, 0)),
          amiWatermarks: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "ImageRecipe" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          instanceTypes: S.optional(__S(80, __c5, 0)),
          instanceProfileName: S.optional(S.String),
          securityGroupIds: S.optional(__S(80, __c5, 0)),
          subnetId: S.optional(S.String),
          logging: S.optional(__S(401, __c25, 1)),
          keyPair: S.optional(S.String),
          terminateInstanceOnFailure: S.optional(S.Boolean),
          snsTopicArn: S.optional(S.String),
          dateCreated: S.optional(S.String),
          dateUpdated: S.optional(S.String),
          resourceTags: S.optional(__S(64, __c4, 0)),
          instanceMetadataOptions: S.optional(__S(402, __c25, 2)),
          tags: S.optional(__S(64, __c4, 0)),
          placement: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "InfrastructureConfiguration" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentArn: S.optional(S.String),
          phaseName: S.optional(S.String),
          stepName: S.optional(S.String),
          action: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComponentFailureContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          region: S.optional(S.String),
          status: S.optional(S.String),
          imageConfigurationStep: S.optional(S.String),
          errorMessage: S.optional(S.String),
          targetAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegionFailure" });
    case 2:
      return S.Array(__S(945, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          errorMessage: S.optional(S.String),
          regionFailures: S.optional(__S(946, __c59, 2)),
        }),
      ).annotate({ identifier: "DistributionFailureContext" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          imageStatus: S.optional(S.String),
          workflowExecutionId: S.optional(S.String),
          workflowArn: S.optional(S.String),
          stepExecutionId: S.optional(S.String),
          failedStep: S.optional(S.String),
          componentFailure: S.optional(__S(944, __c59, 0)),
          distributionFailure: S.optional(__S(947, __c59, 3)),
        }),
      ).annotate({ identifier: "ImageFailureContext" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          reason: S.optional(S.String),
          failureContext: S.optional(__S(948, __c59, 4)),
        }),
      ).annotate({ identifier: "ImageState" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          region: S.optional(S.String),
          image: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          state: S.optional(__S(949, __c59, 5)),
          accountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ami" });
    case 7:
      return S.Array(__S(950, __c59, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ region: S.optional(S.String), imageUris: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "Container" });
    case 9:
      return S.Array(__S(952, __c59, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          amis: S.optional(__S(951, __c59, 7)),
          containers: S.optional(__S(953, __c59, 9)),
        }),
      ).annotate({ identifier: "OutputResources" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imagePipelineArn: S.String.pipe(T.HttpQuery("imagePipelineArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/GetImagePipeline" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetImagePipelineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imagePipeline: S.optional(__S(976, __c61, 0)),
        }),
      ).annotate({ identifier: "GetImagePipelineResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          platform: S.optional(S.String),
          enhancedImageMetadataEnabled: S.optional(S.Boolean),
          imageRecipeArn: S.optional(S.String),
          containerRecipeArn: S.optional(S.String),
          infrastructureConfigurationArn: S.optional(S.String),
          distributionConfigurationArn: S.optional(S.String),
          imageTestsConfiguration: S.optional(__S(256, __c16, 0)),
          schedule: S.optional(__S(305, __c19, 1)),
          status: S.optional(S.String),
          dateCreated: S.optional(S.String),
          dateUpdated: S.optional(S.String),
          dateLastRun: S.optional(S.String),
          lastRunStatus: S.optional(S.String),
          dateNextRun: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          imageScanningConfiguration: S.optional(__S(258, __c16, 2)),
          imageTags: S.optional(__S(64, __c4, 0)),
          executionRole: S.optional(S.String),
          workflows: S.optional(__S(260, __c16, 4)),
          loggingConfiguration: S.optional(__S(306, __c19, 2)),
          consecutiveFailures: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ImagePipeline" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageArn: S.String.pipe(T.HttpQuery("imageArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/GetImagePolicy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetImagePolicyRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageRecipeArn: S.String.pipe(T.HttpQuery("imageRecipeArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/GetImageRecipe" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetImageRecipeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imageRecipe: S.optional(__S(912, __c57, 0)),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "GetImageRecipeResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageRecipeArn: S.String.pipe(T.HttpQuery("imageRecipeArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetImageRecipePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImageRecipePolicyRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          infrastructureConfigurationArn: S.String.pipe(
            T.HttpQuery("infrastructureConfigurationArn"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetInfrastructureConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInfrastructureConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          infrastructureConfiguration: S.optional(__S(928, __c58, 0)),
        }),
      ).annotate({ identifier: "GetInfrastructureConfigurationResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lifecycleExecutionId: S.String.pipe(T.HttpQuery("lifecycleExecutionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetLifecycleExecution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLifecycleExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ lifecycleExecution: S.optional(__S(1073, __c67, 1)) }),
      ).annotate({ identifier: "GetLifecycleExecutionResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ hasImpactedResources: S.optional(S.Boolean) })).annotate({
        identifier: "LifecycleExecutionResourcesImpactedSummary",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lifecycleExecutionId: S.optional(S.String),
          lifecyclePolicyArn: S.optional(S.String),
          resourcesImpactedSummary: S.optional(__S(1072, __c67, 0)),
          state: S.optional(__S(736, __c46, 0)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LifecycleExecution" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lifecyclePolicyArn: S.String.pipe(T.HttpQuery("lifecyclePolicyArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetLifecyclePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLifecyclePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          executionRole: S.optional(S.String),
          resourceType: S.optional(S.String),
          policyDetails: S.optional(__S(468, __c29, 4)),
          resourceSelection: S.optional(__S(471, __c29, 7)),
          dateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          dateUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          dateLastRun: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "LifecyclePolicy" });
    case 2:
      return S.suspend(() =>
        S.Struct({ lifecyclePolicy: S.optional(__S(1089, __c68, 1)) }),
      ).annotate({ identifier: "GetLifecyclePolicyResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          resourceArn: S.String,
          resourceLocation: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetMarketplaceResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMarketplaceResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          url: S.optional(S.String),
          data: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMarketplaceResourceResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowBuildVersionArn: S.String.pipe(T.HttpQuery("workflowBuildVersionArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/GetWorkflow" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          type: S.optional(S.String),
          state: S.optional(__S(736, __c46, 0)),
          owner: S.optional(S.String),
          data: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          parameters: S.optional(__S(753, __c47, 1)),
        }),
      ).annotate({ identifier: "Workflow" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          workflow: S.optional(__S(1121, __c70, 1)),
          latestVersionReferences: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "GetWorkflowResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workflowExecutionId: S.String.pipe(T.HttpQuery("workflowExecutionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetWorkflowExecution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          workflowBuildVersionArn: S.optional(S.String),
          workflowExecutionId: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          message: S.optional(S.String),
          totalStepCount: S.optional(S.Number),
          totalStepsSucceeded: S.optional(S.Number),
          totalStepsFailed: S.optional(S.Number),
          totalStepsSkipped: S.optional(S.Number),
          startTime: S.optional(S.String),
          endTime: S.optional(S.String),
          parallelGroup: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWorkflowExecutionResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ stepExecutionId: S.String.pipe(T.HttpQuery("stepExecutionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/GetWorkflowStepExecution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowStepExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          stepExecutionId: S.optional(S.String),
          workflowBuildVersionArn: S.optional(S.String),
          workflowExecutionId: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          action: S.optional(S.String),
          status: S.optional(S.String),
          rollbackStatus: S.optional(S.String),
          message: S.optional(S.String),
          inputs: S.optional(S.String),
          outputs: S.optional(S.String),
          startTime: S.optional(S.String),
          endTime: S.optional(S.String),
          onFailure: S.optional(S.String),
          timeoutSeconds: S.optional(S.Number),
          attemptNumber: S.optional(S.Number),
          maxAttempts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetWorkflowStepExecutionResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          semanticVersion: S.String,
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          type: S.String,
          format: S.String,
          platform: S.String,
          data: S.optional(S.String),
          uri: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/ImportComponent" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportComponentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          clientToken: S.optional(S.String),
          componentBuildVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportComponentResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ secureBootEnabled: S.optional(S.Boolean), uefiData: S.optional(S.String) }),
      ).annotate({ identifier: "RegisterImageOptions" });
    case 1:
      return S.suspend(() => S.Struct({ imageIndex: S.Number })).annotate({
        identifier: "WindowsConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          semanticVersion: S.String,
          description: S.optional(S.String),
          platform: S.String,
          osVersion: S.String,
          executionRole: S.optional(S.String),
          infrastructureConfigurationArn: S.String,
          uri: S.String,
          loggingConfiguration: S.optional(__S(272, __c17, 0)),
          tags: S.optional(__S(64, __c4, 0)),
          registerImageOptions: S.optional(__S(1184, __c74, 0)),
          windowsConfiguration: S.optional(__S(1185, __c74, 1)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/ImportDiskImage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportDiskImageRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          semanticVersion: S.String,
          description: S.optional(S.String),
          platform: S.String,
          osVersion: S.optional(S.String),
          vmImportTaskId: S.String,
          loggingConfiguration: S.optional(__S(272, __c17, 0)),
          tags: S.optional(__S(64, __c4, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/ImportVmImage" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportVmImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imageArn: S.optional(S.String),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportVmImageResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          componentVersionArn: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListComponentBuildVersions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListComponentBuildVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          platform: S.optional(S.String),
          supportedOsVersions: S.optional(__S(80, __c5, 0)),
          state: S.optional(__S(736, __c46, 0)),
          type: S.optional(S.String),
          owner: S.optional(S.String),
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          publisher: S.optional(S.String),
          obfuscate: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ComponentSummary" });
    case 2:
      return S.Array(__S(1217, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          componentSummaryList: S.optional(__S(1218, __c76, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListComponentBuildVersionsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          owner: S.optional(S.String),
          filters: S.optional(__S(1264, __c79, 0)),
          byName: S.optional(S.Boolean),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListComponents" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListComponentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          description: S.optional(S.String),
          platform: S.optional(S.String),
          supportedOsVersions: S.optional(__S(80, __c5, 0)),
          type: S.optional(S.String),
          owner: S.optional(S.String),
          dateCreated: S.optional(S.String),
          status: S.optional(S.String),
          productCodes: S.optional(__S(769, __c48, 1)),
        }),
      ).annotate({ identifier: "ComponentVersion" });
    case 2:
      return S.Array(__S(1233, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          componentVersionList: S.optional(__S(1234, __c77, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListComponentsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "Filter" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1248, __c78, 0));
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          owner: S.optional(S.String),
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListContainerRecipes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContainerRecipesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          containerType: S.optional(S.String),
          name: S.optional(S.String),
          platform: S.optional(S.String),
          owner: S.optional(S.String),
          parentImage: S.optional(S.String),
          dateCreated: S.optional(S.String),
          instanceImage: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "ContainerRecipeSummary" });
    case 2:
      return S.Array(__S(1281, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          containerRecipeSummaryList: S.optional(__S(1282, __c80, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListContainerRecipesResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListDistributionConfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDistributionConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          dateCreated: S.optional(S.String),
          dateUpdated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
          regions: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "DistributionConfigurationSummary" });
    case 2:
      return S.Array(__S(1297, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          distributionConfigurationSummaryList: S.optional(__S(1298, __c81, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDistributionConfigurationsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageVersionArn: S.optional(S.String),
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListImageBuildVersions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImageBuildVersionsRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          version: S.optional(S.String),
          platform: S.optional(S.String),
          osVersion: S.optional(S.String),
          state: S.optional(__S(949, __c59, 5)),
          owner: S.optional(S.String),
          dateCreated: S.optional(S.String),
          outputResources: S.optional(__S(954, __c59, 10)),
          tags: S.optional(__S(64, __c4, 0)),
          buildType: S.optional(S.String),
          imageSource: S.optional(S.String),
          deprecationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lifecycleExecutionId: S.optional(S.String),
          loggingConfiguration: S.optional(__S(272, __c17, 0)),
        }),
      ).annotate({ identifier: "ImageSummary" });
    case 1:
      return S.Array(__S(1328, __c83, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imageSummaryList: S.optional(__S(1329, __c83, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImageBuildVersionsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageBuildVersionArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListImagePackages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImagePackagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ packageName: S.optional(S.String), packageVersion: S.optional(S.String) }),
      ).annotate({ identifier: "ImagePackage" });
    case 2:
      return S.Array(__S(1345, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imagePackageList: S.optional(__S(1346, __c84, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImagePackagesResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imagePipelineArn: S.String,
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListImagePipelineImages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImagePipelineImagesRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListImagePipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImagePipelinesRequest" });
    case 1:
      return S.Array(__S(976, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imagePipelineList: S.optional(__S(1377, __c86, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImagePipelinesResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          owner: S.optional(S.String),
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListImageRecipes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListImageRecipesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          platform: S.optional(S.String),
          owner: S.optional(S.String),
          parentImage: S.optional(S.String),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "ImageRecipeSummary" });
    case 2:
      return S.Array(__S(1393, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imageRecipeSummaryList: S.optional(__S(1394, __c87, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImageRecipesResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          owner: S.optional(S.String),
          filters: S.optional(__S(1264, __c79, 0)),
          byName: S.optional(S.Boolean),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          includeDeprecated: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListImages" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListImagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          version: S.optional(S.String),
          platform: S.optional(S.String),
          osVersion: S.optional(S.String),
          owner: S.optional(S.String),
          dateCreated: S.optional(S.String),
          buildType: S.optional(S.String),
          imageSource: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImageVersion" });
    case 2:
      return S.Array(__S(1409, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          imageVersionList: S.optional(__S(1410, __c88, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImagesResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filter: S.optional(__S(1248, __c78, 0)), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListImageScanFindingAggregations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImageScanFindingAggregationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          all: S.optional(S.Number),
          critical: S.optional(S.Number),
          high: S.optional(S.Number),
          medium: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SeverityCounts" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          severityCounts: S.optional(__S(1425, __c89, 1)),
        }),
      ).annotate({ identifier: "AccountAggregation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          imageBuildVersionArn: S.optional(S.String),
          severityCounts: S.optional(__S(1425, __c89, 1)),
        }),
      ).annotate({ identifier: "ImageAggregation" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          imagePipelineArn: S.optional(S.String),
          severityCounts: S.optional(__S(1425, __c89, 1)),
        }),
      ).annotate({ identifier: "ImagePipelineAggregation" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          vulnerabilityId: S.optional(S.String),
          severityCounts: S.optional(__S(1425, __c89, 1)),
        }),
      ).annotate({ identifier: "VulnerabilityIdAggregation" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          accountAggregation: S.optional(__S(1426, __c89, 2)),
          imageAggregation: S.optional(__S(1427, __c89, 3)),
          imagePipelineAggregation: S.optional(__S(1428, __c89, 4)),
          vulnerabilityIdAggregation: S.optional(__S(1429, __c89, 5)),
        }),
      ).annotate({ identifier: "ImageScanFindingAggregation" });
    case 7:
      return S.Array(__S(1430, __c89, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          aggregationType: S.optional(S.String),
          responses: S.optional(__S(1431, __c89, 7)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImageScanFindingAggregationsResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListImageScanFindings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImageScanFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ text: S.optional(S.String), url: S.optional(S.String) }),
      ).annotate({ identifier: "RemediationRecommendation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ recommendation: S.optional(__S(1441, __c90, 1)) }),
      ).annotate({ identifier: "Remediation" });
    case 3:
      return S.suspend(() =>
        S.Struct({ metric: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "CvssScoreAdjustment" });
    case 4:
      return S.Array(__S(1443, __c90, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          scoreSource: S.optional(S.String),
          cvssSource: S.optional(S.String),
          version: S.optional(S.String),
          score: S.optional(S.Number),
          scoringVector: S.optional(S.String),
          adjustments: S.optional(__S(1444, __c90, 4)),
        }),
      ).annotate({ identifier: "CvssScoreDetails" });
    case 6:
      return S.suspend(() => S.Struct({ adjustedCvss: S.optional(__S(1445, __c90, 5)) })).annotate({
        identifier: "InspectorScoreDetails",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          version: S.optional(S.String),
          sourceLayerHash: S.optional(S.String),
          epoch: S.optional(S.Number),
          release: S.optional(S.String),
          arch: S.optional(S.String),
          packageManager: S.optional(S.String),
          filePath: S.optional(S.String),
          fixedInVersion: S.optional(S.String),
          remediation: S.optional(S.String),
        }),
      ).annotate({ identifier: "VulnerablePackage" });
    case 8:
      return S.Array(__S(1447, __c90, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          baseScore: S.optional(S.Number),
          scoringVector: S.optional(S.String),
          version: S.optional(S.String),
          source: S.optional(S.String),
        }),
      ).annotate({ identifier: "CvssScore" });
    case 10:
      return S.Array(__S(1449, __c90, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          vulnerabilityId: S.String,
          vulnerablePackages: S.optional(__S(1448, __c90, 8)),
          source: S.optional(S.String),
          cvss: S.optional(__S(1450, __c90, 10)),
          relatedVulnerabilities: S.optional(__S(80, __c5, 0)),
          sourceUrl: S.optional(S.String),
          vendorSeverity: S.optional(S.String),
          vendorCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vendorUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          referenceUrls: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "PackageVulnerabilityDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          awsAccountId: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          imagePipelineArn: S.optional(S.String),
          type: S.optional(S.String),
          description: S.optional(S.String),
          title: S.optional(S.String),
          remediation: S.optional(__S(1442, __c90, 2)),
          severity: S.optional(S.String),
          firstObservedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inspectorScore: S.optional(S.Number),
          inspectorScoreDetails: S.optional(__S(1446, __c90, 6)),
          packageVulnerabilityDetails: S.optional(__S(1451, __c90, 11)),
          fixAvailable: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImageScanFinding" });
    case 13:
      return S.Array(__S(1452, __c90, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          findings: S.optional(__S(1453, __c90, 13)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListImageScanFindingsResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListInfrastructureConfigurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInfrastructureConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          dateCreated: S.optional(S.String),
          dateUpdated: S.optional(S.String),
          resourceTags: S.optional(__S(64, __c4, 0)),
          tags: S.optional(__S(64, __c4, 0)),
          instanceTypes: S.optional(__S(80, __c5, 0)),
          instanceProfileName: S.optional(S.String),
          placement: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "InfrastructureConfigurationSummary" });
    case 2:
      return S.Array(__S(1457, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          infrastructureConfigurationSummaryList: S.optional(__S(1458, __c91, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListInfrastructureConfigurationsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lifecycleExecutionId: S.String,
          parentResourceId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListLifecycleExecutionResources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLifecycleExecutionResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "LifecycleExecutionResourceAction" });
    case 2:
      return S.suspend(() =>
        S.Struct({ snapshotId: S.optional(S.String), state: S.optional(__S(736, __c46, 0)) }),
      ).annotate({ identifier: "LifecycleExecutionSnapshotResource" });
    case 3:
      return S.Array(__S(1474, __c92, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          resourceId: S.optional(S.String),
          state: S.optional(__S(736, __c46, 0)),
          action: S.optional(__S(1473, __c92, 1)),
          region: S.optional(S.String),
          snapshots: S.optional(__S(1475, __c92, 3)),
          imageUris: S.optional(__S(80, __c5, 0)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LifecycleExecutionResource" });
    case 5:
      return S.Array(__S(1476, __c92, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          lifecycleExecutionId: S.optional(S.String),
          lifecycleExecutionState: S.optional(__S(736, __c46, 0)),
          resources: S.optional(__S(1477, __c92, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLifecycleExecutionResourcesResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          resourceArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListLifecycleExecutions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLifecycleExecutionsRequest" });
    case 1:
      return S.Array(__S(1073, __c67, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          lifecycleExecutions: S.optional(__S(1489, __c93, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLifecycleExecutionsResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1264, __c79, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListLifecyclePolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLifecyclePoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          executionRole: S.optional(S.String),
          resourceType: S.optional(S.String),
          dateCreated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          dateUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          dateLastRun: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "LifecyclePolicySummary" });
    case 2:
      return S.Array(__S(1505, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          lifecyclePolicySummaryList: S.optional(__S(1506, __c94, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLifecyclePoliciesResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(64, __c4, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListWaitingWorkflowSteps" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWaitingWorkflowStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepExecutionId: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          workflowExecutionId: S.optional(S.String),
          workflowBuildVersionArn: S.optional(S.String),
          name: S.optional(S.String),
          action: S.optional(S.String),
          startTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowStepExecution" });
    case 2:
      return S.Array(__S(1537, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ steps: S.optional(__S(1538, __c96, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWaitingWorkflowStepsResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowVersionArn: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListWorkflowBuildVersions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowBuildVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          description: S.optional(S.String),
          changeDescription: S.optional(S.String),
          type: S.optional(S.String),
          owner: S.optional(S.String),
          state: S.optional(__S(736, __c46, 0)),
          dateCreated: S.optional(S.String),
          tags: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "WorkflowSummary" });
    case 2:
      return S.Array(__S(1553, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowSummaryList: S.optional(__S(1554, __c97, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkflowBuildVersionsResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          imageBuildVersionArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListWorkflowExecutions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowBuildVersionArn: S.optional(S.String),
          workflowExecutionId: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          message: S.optional(S.String),
          totalStepCount: S.optional(S.Number),
          totalStepsSucceeded: S.optional(S.Number),
          totalStepsFailed: S.optional(S.Number),
          totalStepsSkipped: S.optional(S.Number),
          startTime: S.optional(S.String),
          endTime: S.optional(S.String),
          parallelGroup: S.optional(S.String),
          retried: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "WorkflowExecutionMetadata" });
    case 2:
      return S.Array(__S(1569, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          workflowExecutions: S.optional(__S(1570, __c98, 2)),
          imageBuildVersionArn: S.optional(S.String),
          message: S.optional(S.String),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkflowExecutionsResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          owner: S.optional(S.String),
          filters: S.optional(__S(1264, __c79, 0)),
          byName: S.optional(S.Boolean),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListWorkflows" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          version: S.optional(S.String),
          description: S.optional(S.String),
          type: S.optional(S.String),
          owner: S.optional(S.String),
          dateCreated: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowVersion" });
    case 2:
      return S.Array(__S(1585, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowVersionList: S.optional(__S(1586, __c99, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          workflowExecutionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListWorkflowStepExecutions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowStepExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepExecutionId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          action: S.optional(S.String),
          status: S.optional(S.String),
          rollbackStatus: S.optional(S.String),
          message: S.optional(S.String),
          inputs: S.optional(S.String),
          outputs: S.optional(S.String),
          startTime: S.optional(S.String),
          endTime: S.optional(S.String),
          attemptNumber: S.optional(S.Number),
          maxAttempts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WorkflowStepMetadata" });
    case 2:
      return S.Array(__S(1601, __c100, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          steps: S.optional(__S(1602, __c100, 2)),
          workflowBuildVersionArn: S.optional(S.String),
          workflowExecutionId: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          message: S.optional(S.String),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkflowStepExecutionsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ componentArn: S.String, policy: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/PutComponentPolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutComponentPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), componentArn: S.optional(S.String) }),
      ).annotate({ identifier: "PutComponentPolicyResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerRecipeArn: S.String, policy: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/PutContainerRecipePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutContainerRecipePolicyRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageArn: S.String, policy: S.String }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/PutImagePolicy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutImagePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ requestId: S.optional(S.String), imageArn: S.optional(S.String) }),
      ).annotate({ identifier: "PutImagePolicyResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ imageRecipeArn: S.String, policy: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/PutImageRecipePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutImageRecipePolicyRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageBuildVersionArn: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/RetryImage" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RetryImageRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          stepExecutionId: S.String,
          imageBuildVersionArn: S.String,
          action: S.String,
          reason: S.optional(S.String),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/SendWorkflowStepAction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendWorkflowStepActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepExecutionId: S.optional(S.String),
          imageBuildVersionArn: S.optional(S.String),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SendWorkflowStepActionResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imagePipelineArn: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
          tags: S.optional(__S(64, __c4, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/StartImagePipelineExecution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartImagePipelineExecutionRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "ResourceState",
      });
    case 1:
      return S.suspend(() => S.Struct({ amis: S.optional(__S(450, __c28, 2)) })).annotate({
        identifier: "ResourceStateUpdateExclusionRules",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          state: __S(1728, __c108, 0),
          executionRole: S.optional(S.String),
          includeResources: S.optional(__S(448, __c28, 0)),
          exclusionRules: S.optional(__S(1729, __c108, 1)),
          updateAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/StartResourceStateUpdate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartResourceStateUpdateRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ lifecycleExecutionId: S.optional(S.String), resourceArn: S.optional(S.String) }),
      ).annotate({ identifier: "StartResourceStateUpdateResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(64, __c4, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(80, __c5, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          distributionConfigurationArn: S.String,
          description: S.optional(S.String),
          distributions: __S(221, __c13, 13),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/UpdateDistributionConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDistributionConfigurationRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imagePipelineArn: S.String,
          description: S.optional(S.String),
          imageRecipeArn: S.optional(S.String),
          containerRecipeArn: S.optional(S.String),
          infrastructureConfigurationArn: S.String,
          distributionConfigurationArn: S.optional(S.String),
          imageTestsConfiguration: S.optional(__S(256, __c16, 0)),
          enhancedImageMetadataEnabled: S.optional(S.Boolean),
          schedule: S.optional(__S(305, __c19, 1)),
          status: S.optional(S.String),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          imageScanningConfiguration: S.optional(__S(258, __c16, 2)),
          workflows: S.optional(__S(260, __c16, 4)),
          loggingConfiguration: S.optional(__S(306, __c19, 2)),
          executionRole: S.optional(S.String),
          imageTags: S.optional(__S(64, __c4, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/UpdateImagePipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateImagePipelineRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          infrastructureConfigurationArn: S.String,
          description: S.optional(S.String),
          instanceTypes: S.optional(__S(80, __c5, 0)),
          instanceProfileName: S.String,
          securityGroupIds: S.optional(__S(80, __c5, 0)),
          subnetId: S.optional(S.String),
          logging: S.optional(__S(401, __c25, 1)),
          keyPair: S.optional(S.String),
          terminateInstanceOnFailure: S.optional(S.Boolean),
          snsTopicArn: S.optional(S.String),
          resourceTags: S.optional(__S(64, __c4, 0)),
          instanceMetadataOptions: S.optional(__S(402, __c25, 2)),
          placement: S.optional(__S(384, __c24, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/UpdateInfrastructureConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateInfrastructureConfigurationRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lifecyclePolicyArn: S.String,
          description: S.optional(S.String),
          status: S.optional(S.String),
          executionRole: S.String,
          resourceType: S.String,
          policyDetails: __S(468, __c29, 4),
          resourceSelection: __S(471, __c29, 7),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/UpdateLifecyclePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLifecyclePolicyRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
