import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "imagebuilder",
  target: "imagebuilder",
  version: "2019-12-02",
  sigv4: "imagebuilder",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://imagebuilder.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://imagebuilder.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class CallRateLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CallRateLimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ClientException
  extends /*@__PURE__*/ TE.TaggedError("ClientException", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class DryRunOperationException
  extends /*@__PURE__*/ TE.TaggedError("DryRunOperationException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotentParameterMismatchException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPaginationTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidVersionNumberException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidVersionNumberException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceDependencyException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceDependencyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
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
}
export interface CreateInfrastructureConfigurationResponse {
  requestId?: string;
  clientToken?: string;
  infrastructureConfigurationArn?: string;
}
export type LifecyclePolicyStatus = "DISABLED" | "ENABLED" | (string & {});
export type LifecyclePolicyResourceType =
  | "AMI_IMAGE"
  | "CONTAINER_IMAGE"
  | (string & {});
export type LifecyclePolicyDetailActionType =
  | "DELETE"
  | "DEPRECATE"
  | "DISABLE"
  | (string & {});
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
export type LifecyclePolicyTimeUnit =
  | "DAYS"
  | "WEEKS"
  | "MONTHS"
  | "YEARS"
  | (string & {});
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
export type LifecyclePolicyResourceSelectionRecipes =
  LifecyclePolicyResourceSelectionRecipe[];
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
export type ComponentStatus =
  | "DEPRECATED"
  | "DISABLED"
  | "ACTIVE"
  | (string & {});
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
export interface ImageState {
  status?: ImageStatus;
  reason?: string;
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
export type BuildType =
  | "USER_INITIATED"
  | "SCHEDULED"
  | "IMPORT"
  | "IMPORT_ISO"
  | (string & {});
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
export type MarketplaceResourceType =
  | "COMPONENT_DATA"
  | "COMPONENT_ARTIFACT"
  | (string & {});
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
export type WorkflowExecutionId = string;
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
export type WorkflowStepExecutionId = string;
export interface GetWorkflowStepExecutionRequest {
  stepExecutionId: string;
}
export type WorkflowStepName = string;
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
export type DistributionConfigurationSummaryList =
  DistributionConfigurationSummary[];
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
export type InfrastructureConfigurationSummaryList =
  InfrastructureConfigurationSummary[];
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
export type LifecycleExecutionSnapshotResourceList =
  LifecycleExecutionSnapshotResource[];
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
export type WorkflowNameArn = string;
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
export type WorkflowVersionArn = string;
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
export type ResourceStatus =
  | "AVAILABLE"
  | "DELETED"
  | "DEPRECATED"
  | "DISABLED"
  | (string & {});
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
 * CancelImageCreation cancels the creation of Image. This operation can only be used on
 * images in a non-terminal state.
 */
export const cancelImageCreation: API.OperationMethod<
  CancelImageCreationRequest,
  CancelImageCreationResponse,
  CancelImageCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CancelImageCreation",
    input: { imageBuildVersionArn: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
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
})) as any;

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
 * Cancel a specific image lifecycle policy runtime instance.
 */
export const cancelLifecycleExecution: API.OperationMethod<
  CancelLifecycleExecutionRequest,
  CancelLifecycleExecutionResponse,
  CancelLifecycleExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CancelLifecycleExecution",
    input: { lifecycleExecutionId: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
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
})) as any;

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
 */
export const createComponent: API.OperationMethod<
  CreateComponentRequest,
  CreateComponentResponse,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CreateComponent",
    input: {
      name: 0,
      semanticVersion: 0,
      description: 0,
      changeDescription: 0,
      platform: 0,
      supportedOsVersions: 0,
      data: 0,
      uri: 0,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      dryRun: 0,
    },
    body: true,
  },
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
})) as any;

export type CreateContainerRecipeError =
  | CallRateLimitExceededException
  | ClientException
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
  descriptor: {
    service: svc,
    http: "PUT /CreateContainerRecipe",
    input: {
      containerType: 0,
      name: 0,
      description: 0,
      semanticVersion: 0,
      components: D.list(i_ComponentConfiguration),
      instanceConfiguration: {
        image: 0,
        blockDeviceMappings: D.list(i_InstanceBlockDeviceMapping),
      },
      dockerfileTemplateData: 0,
      dockerfileTemplateUri: 0,
      platformOverride: 0,
      imageOsVersionOverride: 0,
      parentImage: 0,
      tags: 0,
      workingDirectory: 0,
      targetRepository: i_TargetContainerRepository,
      kmsKeyId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    CallRateLimitExceededException,
    ClientException,
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
})) as any;

export type CreateDistributionConfigurationError =
  | CallRateLimitExceededException
  | ClientException
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
 * Creates a new distribution configuration. Distribution configurations define and
 * configure the outputs of your pipeline.
 */
export const createDistributionConfiguration: API.OperationMethod<
  CreateDistributionConfigurationRequest,
  CreateDistributionConfigurationResponse,
  CreateDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CreateDistributionConfiguration",
    input: {
      name: 0,
      description: 0,
      distributions: D.list(i_Distribution),
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    CallRateLimitExceededException,
    ClientException,
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
})) as any;

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
 * Creates a new image. This request will create a new image along with all of the
 * configured output resources defined in the distribution configuration. You must specify
 * exactly one recipe for your image, using either a ContainerRecipeArn or an
 * ImageRecipeArn.
 */
export const createImage: API.OperationMethod<
  CreateImageRequest,
  CreateImageResponse,
  CreateImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CreateImage",
    input: {
      imageRecipeArn: 0,
      containerRecipeArn: 0,
      distributionConfigurationArn: 0,
      infrastructureConfigurationArn: 0,
      imageTestsConfiguration: i_ImageTestsConfiguration,
      enhancedImageMetadataEnabled: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      imageScanningConfiguration: i_ImageScanningConfiguration,
      workflows: D.list(i_WorkflowConfiguration),
      executionRole: 0,
      loggingConfiguration: i_ImageLoggingConfiguration,
    },
    body: true,
  },
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
})) as any;

export type CreateImagePipelineError =
  | CallRateLimitExceededException
  | ClientException
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
 * Creates a new image pipeline. Image pipelines enable you to automate the creation and
 * distribution of images.
 */
export const createImagePipeline: API.OperationMethod<
  CreateImagePipelineRequest,
  CreateImagePipelineResponse,
  CreateImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CreateImagePipeline",
    input: {
      name: 0,
      description: 0,
      imageRecipeArn: 0,
      containerRecipeArn: 0,
      infrastructureConfigurationArn: 0,
      distributionConfigurationArn: 0,
      imageTestsConfiguration: i_ImageTestsConfiguration,
      enhancedImageMetadataEnabled: 0,
      schedule: i_Schedule,
      status: 0,
      tags: 0,
      imageTags: 0,
      clientToken: D.m({ idempotency: true }),
      imageScanningConfiguration: i_ImageScanningConfiguration,
      workflows: D.list(i_WorkflowConfiguration),
      executionRole: 0,
      loggingConfiguration: i_PipelineLoggingConfiguration,
    },
    body: true,
  },
  errors: [
    CallRateLimitExceededException,
    ClientException,
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
})) as any;

export type CreateImageRecipeError =
  | CallRateLimitExceededException
  | ClientException
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
  descriptor: {
    service: svc,
    http: "PUT /CreateImageRecipe",
    input: {
      name: 0,
      description: 0,
      semanticVersion: 0,
      components: D.list(i_ComponentConfiguration),
      parentImage: 0,
      blockDeviceMappings: D.list(i_InstanceBlockDeviceMapping),
      tags: 0,
      workingDirectory: 0,
      additionalInstanceConfiguration: {
        systemsManagerAgent: { uninstallAfterBuild: 0 },
        userDataOverride: 0,
      },
      amiTags: 0,
      amiWatermarks: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    CallRateLimitExceededException,
    ClientException,
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
})) as any;

export type CreateInfrastructureConfigurationError =
  | CallRateLimitExceededException
  | ClientException
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
  descriptor: {
    service: svc,
    http: "PUT /CreateInfrastructureConfiguration",
    input: {
      name: 0,
      description: 0,
      instanceTypes: 0,
      instanceProfileName: 0,
      securityGroupIds: 0,
      subnetId: 0,
      logging: i_Logging,
      keyPair: 0,
      terminateInstanceOnFailure: 0,
      snsTopicArn: 0,
      resourceTags: 0,
      instanceMetadataOptions: i_InstanceMetadataOptions,
      tags: 0,
      placement: i_Placement,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    CallRateLimitExceededException,
    ClientException,
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
})) as any;

export type CreateLifecyclePolicyError =
  | CallRateLimitExceededException
  | ClientException
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
 * Create a lifecycle policy resource.
 */
export const createLifecyclePolicy: API.OperationMethod<
  CreateLifecyclePolicyRequest,
  CreateLifecyclePolicyResponse,
  CreateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CreateLifecyclePolicy",
    input: {
      name: 0,
      description: 0,
      status: 0,
      executionRole: 0,
      resourceType: 0,
      policyDetails: D.list(i_LifecyclePolicyDetail),
      resourceSelection: i_LifecyclePolicyResourceSelection,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    CallRateLimitExceededException,
    ClientException,
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
})) as any;

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
 * Create a new workflow or a new version of an existing workflow.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /CreateWorkflow",
    input: {
      name: 0,
      semanticVersion: 0,
      description: 0,
      changeDescription: 0,
      data: 0,
      uri: 0,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      type: 0,
      dryRun: 0,
    },
    body: true,
  },
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
})) as any;

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
 * Deletes a component build version.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteComponent",
    input: {
      componentBuildVersionArn: D.m({ query: "componentBuildVersionArn" }),
    },
  },
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
})) as any;

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
 * Deletes a container recipe.
 */
export const deleteContainerRecipe: API.OperationMethod<
  DeleteContainerRecipeRequest,
  DeleteContainerRecipeResponse,
  DeleteContainerRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteContainerRecipe",
    input: { containerRecipeArn: D.m({ query: "containerRecipeArn" }) },
  },
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
})) as any;

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
 * Deletes a distribution configuration.
 */
export const deleteDistributionConfiguration: API.OperationMethod<
  DeleteDistributionConfigurationRequest,
  DeleteDistributionConfigurationResponse,
  DeleteDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteDistributionConfiguration",
    input: {
      distributionConfigurationArn: D.m({
        query: "distributionConfigurationArn",
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /DeleteImage",
    input: { imageBuildVersionArn: D.m({ query: "imageBuildVersionArn" }) },
  },
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
})) as any;

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
 * Deletes an image pipeline.
 */
export const deleteImagePipeline: API.OperationMethod<
  DeleteImagePipelineRequest,
  DeleteImagePipelineResponse,
  DeleteImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteImagePipeline",
    input: { imagePipelineArn: D.m({ query: "imagePipelineArn" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /DeleteImageRecipe",
    input: { imageRecipeArn: D.m({ query: "imageRecipeArn" }) },
  },
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
})) as any;

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
 * Deletes an infrastructure configuration.
 */
export const deleteInfrastructureConfiguration: API.OperationMethod<
  DeleteInfrastructureConfigurationRequest,
  DeleteInfrastructureConfigurationResponse,
  DeleteInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteInfrastructureConfiguration",
    input: {
      infrastructureConfigurationArn: D.m({
        query: "infrastructureConfigurationArn",
      }),
    },
  },
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
})) as any;

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
 * Delete the specified lifecycle policy resource.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyRequest,
  DeleteLifecyclePolicyResponse,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteLifecyclePolicy",
    input: { lifecyclePolicyArn: D.m({ query: "lifecyclePolicyArn" }) },
  },
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
})) as any;

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
 * Deletes a specific workflow resource.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteWorkflow",
    input: {
      workflowBuildVersionArn: D.m({ query: "workflowBuildVersionArn" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /DistributeImage",
    input: {
      sourceImage: 0,
      distributionConfigurationArn: 0,
      executionRole: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      loggingConfiguration: i_ImageLoggingConfiguration,
    },
    body: true,
  },
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
})) as any;

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
 * Gets a component object.
 */
export const getComponent: API.OperationMethod<
  GetComponentRequest,
  GetComponentResponse,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetComponent",
    input: {
      componentBuildVersionArn: D.m({ query: "componentBuildVersionArn" }),
    },
  },
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
})) as any;

export type GetComponentPolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets a component policy.
 */
export const getComponentPolicy: API.OperationMethod<
  GetComponentPolicyRequest,
  GetComponentPolicyResponse,
  GetComponentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetComponentPolicy",
    input: { componentArn: D.m({ query: "componentArn" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /GetContainerRecipe",
    input: { containerRecipeArn: D.m({ query: "containerRecipeArn" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /GetContainerRecipePolicy",
    input: { containerRecipeArn: D.m({ query: "containerRecipeArn" }) },
  },
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
})) as any;

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
 * Gets a distribution configuration.
 */
export const getDistributionConfiguration: API.OperationMethod<
  GetDistributionConfigurationRequest,
  GetDistributionConfigurationResponse,
  GetDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetDistributionConfiguration",
    input: {
      distributionConfigurationArn: D.m({
        query: "distributionConfigurationArn",
      }),
    },
  },
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
})) as any;

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
 * Gets an image.
 */
export const getImage: API.OperationMethod<
  GetImageRequest,
  GetImageResponse,
  GetImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetImage",
    input: { imageBuildVersionArn: D.m({ query: "imageBuildVersionArn" }) },
    output: { image: { deprecationTime: D.ts } },
  },
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
})) as any;

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
 * Gets an image pipeline.
 */
export const getImagePipeline: API.OperationMethod<
  GetImagePipelineRequest,
  GetImagePipelineResponse,
  GetImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetImagePipeline",
    input: { imagePipelineArn: D.m({ query: "imagePipelineArn" }) },
  },
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
})) as any;

export type GetImagePolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets an image policy.
 */
export const getImagePolicy: API.OperationMethod<
  GetImagePolicyRequest,
  GetImagePolicyResponse,
  GetImagePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetImagePolicy",
    input: { imageArn: D.m({ query: "imageArn" }) },
  },
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
})) as any;

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
 * Gets an image recipe.
 */
export const getImageRecipe: API.OperationMethod<
  GetImageRecipeRequest,
  GetImageRecipeResponse,
  GetImageRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetImageRecipe",
    input: { imageRecipeArn: D.m({ query: "imageRecipeArn" }) },
  },
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
})) as any;

export type GetImageRecipePolicyError =
  | CallRateLimitExceededException
  | ForbiddenException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets an image recipe policy.
 */
export const getImageRecipePolicy: API.OperationMethod<
  GetImageRecipePolicyRequest,
  GetImageRecipePolicyResponse,
  GetImageRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetImageRecipePolicy",
    input: { imageRecipeArn: D.m({ query: "imageRecipeArn" }) },
  },
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
})) as any;

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
 * Gets an infrastructure configuration.
 */
export const getInfrastructureConfiguration: API.OperationMethod<
  GetInfrastructureConfigurationRequest,
  GetInfrastructureConfigurationResponse,
  GetInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetInfrastructureConfiguration",
    input: {
      infrastructureConfigurationArn: D.m({
        query: "infrastructureConfigurationArn",
      }),
    },
  },
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
})) as any;

export type GetLifecycleExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Get the runtime information that was logged for a specific runtime instance of the lifecycle policy.
 */
export const getLifecycleExecution: API.OperationMethod<
  GetLifecycleExecutionRequest,
  GetLifecycleExecutionResponse,
  GetLifecycleExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetLifecycleExecution",
    input: { lifecycleExecutionId: D.m({ query: "lifecycleExecutionId" }) },
    output: { lifecycleExecution: o_LifecycleExecution },
  },
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
})) as any;

export type GetLifecyclePolicyError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Get details for the specified image lifecycle policy.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyRequest,
  GetLifecyclePolicyResponse,
  GetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetLifecyclePolicy",
    input: { lifecyclePolicyArn: D.m({ query: "lifecyclePolicyArn" }) },
    output: {
      lifecyclePolicy: {
        dateCreated: D.ts,
        dateUpdated: D.ts,
        dateLastRun: D.ts,
      },
    },
  },
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
})) as any;

export type GetMarketplaceResourceError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Verify the subscription and perform resource dependency checks on the requested
 * Amazon Web Services Marketplace resource. For Amazon Web Services Marketplace components, the response contains fields to download the
 * components and their artifacts.
 */
export const getMarketplaceResource: API.OperationMethod<
  GetMarketplaceResourceRequest,
  GetMarketplaceResourceResponse,
  GetMarketplaceResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetMarketplaceResource",
    input: { resourceType: 0, resourceArn: 0, resourceLocation: 0 },
    body: true,
  },
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
})) as any;

export type GetWorkflowError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Get a workflow resource object.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetWorkflow",
    input: {
      workflowBuildVersionArn: D.m({ query: "workflowBuildVersionArn" }),
    },
  },
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
})) as any;

export type GetWorkflowExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Get the runtime information that was logged for a specific runtime instance
 * of the workflow.
 */
export const getWorkflowExecution: API.OperationMethod<
  GetWorkflowExecutionRequest,
  GetWorkflowExecutionResponse,
  GetWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetWorkflowExecution",
    input: { workflowExecutionId: D.m({ query: "workflowExecutionId" }) },
  },
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
})) as any;

export type GetWorkflowStepExecutionError =
  | CallRateLimitExceededException
  | ClientException
  | ForbiddenException
  | InvalidRequestException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Get the runtime information that was logged for a specific runtime instance of
 * the workflow step.
 */
export const getWorkflowStepExecution: API.OperationMethod<
  GetWorkflowStepExecutionRequest,
  GetWorkflowStepExecutionResponse,
  GetWorkflowStepExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetWorkflowStepExecution",
    input: { stepExecutionId: D.m({ query: "stepExecutionId" }) },
  },
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
})) as any;

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
 * Imports a component and transforms its data into a component document.
 */
export const importComponent: API.OperationMethod<
  ImportComponentRequest,
  ImportComponentResponse,
  ImportComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /ImportComponent",
    input: {
      name: 0,
      semanticVersion: 0,
      description: 0,
      changeDescription: 0,
      type: 0,
      format: 0,
      platform: 0,
      data: 0,
      uri: 0,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

export type ImportDiskImageError =
  | AccessDeniedException
  | ClientException
  | ServiceException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Import a Windows operating system image from a verified Microsoft ISO disk
 * file. The following disk images are supported:
 *
 * - Windows 11 Enterprise
 */
export const importDiskImage: API.OperationMethod<
  ImportDiskImageRequest,
  ImportDiskImageResponse,
  ImportDiskImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /ImportDiskImage",
    input: {
      name: 0,
      semanticVersion: 0,
      description: 0,
      platform: 0,
      osVersion: 0,
      executionRole: 0,
      infrastructureConfigurationArn: 0,
      uri: 0,
      loggingConfiguration: i_ImageLoggingConfiguration,
      tags: 0,
      registerImageOptions: { secureBootEnabled: 0, uefiData: 0 },
      windowsConfiguration: { imageIndex: 0 },
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

export type ImportVmImageError =
  | ClientException
  | ServiceException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * When you export your virtual machine (VM) from its virtualization environment, that
 * process creates a set of one or more disk container files that act as snapshots of your
 * VM’s environment, settings, and data. The Amazon EC2 API ImportImage
 * action uses those files to import your VM and create an AMI. To import using the CLI
 * command, see import-image
 *
 * You can reference the task ID from the VM import to pull in the AMI that the import
 * created as the base image for your Image Builder recipe.
 */
export const importVmImage: API.OperationMethod<
  ImportVmImageRequest,
  ImportVmImageResponse,
  ImportVmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /ImportVmImage",
    input: {
      name: 0,
      semanticVersion: 0,
      description: 0,
      platform: 0,
      osVersion: 0,
      vmImportTaskId: 0,
      loggingConfiguration: i_ImageLoggingConfiguration,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [ClientException, ServiceException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportVmImage",
})) as any;

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
 * Returns the list of component build versions for the specified component
 * version Amazon Resource Name (ARN).
 */
export const listComponentBuildVersions: API.PaginatedOperationMethod<
  ListComponentBuildVersionsRequest,
  ListComponentBuildVersionsResponse,
  ListComponentBuildVersionsError,
  Credentials | HttpClient.HttpClient,
  ComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListComponentBuildVersions",
    input: { componentVersionArn: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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
 * Returns the list of components that can be filtered by name, or by using the listed
 * `filters` to streamline results. Newly created components can take up to
 * two minutes to appear in the ListComponents API Results.
 *
 * The semantic version has four nodes: ../.
 * You can assign values for the first three, and can filter on all of them.
 *
 * **Filtering:** With semantic versioning, you have the flexibility to use wildcards (x)
 * to specify the most recent versions or nodes when selecting the base image or components for your
 * recipe. When you use a wildcard in any node, all nodes to the right of the first wildcard must also be
 * wildcards.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  ComponentVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListComponents",
    input: {
      owner: 0,
      filters: D.list(i_Filter),
      byName: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListContainerRecipes",
    input: { owner: 0, filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListDistributionConfigurations",
    input: { filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListImageBuildVersions",
    input: {
      imageVersionArn: 0,
      filters: D.list(i_Filter),
      maxResults: 0,
      nextToken: 0,
    },
    output: { imageSummaryList: D.list(o_ImageSummary) },
    body: true,
  },
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
 * List the Packages that are associated with an Image Build Version, as determined by
 * Amazon Web Services Systems Manager Inventory at build time.
 */
export const listImagePackages: API.PaginatedOperationMethod<
  ListImagePackagesRequest,
  ListImagePackagesResponse,
  ListImagePackagesError,
  Credentials | HttpClient.HttpClient,
  ImagePackage
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListImagePackages",
    input: { imageBuildVersionArn: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListImagePipelineImages",
    input: {
      imagePipelineArn: 0,
      filters: D.list(i_Filter),
      maxResults: 0,
      nextToken: 0,
    },
    output: { imageSummaryList: D.list(o_ImageSummary) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListImagePipelines",
    input: { filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListImageRecipes",
    input: { owner: 0, filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    body: true,
  },
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
 * Returns the list of images that you have access to. Newly created images can take up
 * to two minutes to appear in the ListImages API Results.
 */
export const listImages: API.PaginatedOperationMethod<
  ListImagesRequest,
  ListImagesResponse,
  ListImagesError,
  Credentials | HttpClient.HttpClient,
  ImageVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListImages",
    input: {
      owner: 0,
      filters: D.list(i_Filter),
      byName: 0,
      maxResults: 0,
      nextToken: 0,
      includeDeprecated: 0,
    },
    body: true,
  },
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
 * - `accountId`
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
  descriptor: {
    service: svc,
    http: "POST /ListImageScanFindingAggregations",
    input: { filter: i_Filter, nextToken: 0 },
    body: true,
  },
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
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "responses",
  } as const,
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
 * Returns a list of image scan findings for your account.
 */
export const listImageScanFindings: API.PaginatedOperationMethod<
  ListImageScanFindingsRequest,
  ListImageScanFindingsResponse,
  ListImageScanFindingsError,
  Credentials | HttpClient.HttpClient,
  ImageScanFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListImageScanFindings",
    input: {
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      findings: D.list({
        firstObservedAt: D.ts,
        updatedAt: D.ts,
        packageVulnerabilityDetails: {
          vendorCreatedAt: D.ts,
          vendorUpdatedAt: D.ts,
        },
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListInfrastructureConfigurations",
    input: { filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    body: true,
  },
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
 * List resources that the runtime instance of the image lifecycle identified for lifecycle actions.
 */
export const listLifecycleExecutionResources: API.PaginatedOperationMethod<
  ListLifecycleExecutionResourcesRequest,
  ListLifecycleExecutionResourcesResponse,
  ListLifecycleExecutionResourcesError,
  Credentials | HttpClient.HttpClient,
  LifecycleExecutionResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLifecycleExecutionResources",
    input: {
      lifecycleExecutionId: 0,
      parentResourceId: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { resources: D.list({ startTime: D.ts, endTime: D.ts }) },
    body: true,
  },
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
 * Get the lifecycle runtime history for the specified resource.
 */
export const listLifecycleExecutions: API.PaginatedOperationMethod<
  ListLifecycleExecutionsRequest,
  ListLifecycleExecutionsResponse,
  ListLifecycleExecutionsError,
  Credentials | HttpClient.HttpClient,
  LifecycleExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLifecycleExecutions",
    input: { maxResults: 0, nextToken: 0, resourceArn: 0 },
    output: { lifecycleExecutions: D.list(o_LifecycleExecution) },
    body: true,
  },
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
 * Get a list of lifecycle policies in your Amazon Web Services account.
 */
export const listLifecyclePolicies: API.PaginatedOperationMethod<
  ListLifecyclePoliciesRequest,
  ListLifecyclePoliciesResponse,
  ListLifecyclePoliciesError,
  Credentials | HttpClient.HttpClient,
  LifecyclePolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLifecyclePolicies",
    input: { filters: D.list(i_Filter), maxResults: 0, nextToken: 0 },
    output: {
      lifecyclePolicySummaryList: D.list({
        dateCreated: D.ts,
        dateUpdated: D.ts,
        dateLastRun: D.ts,
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
 * Get a list of workflow steps that are waiting for action for workflows
 * in your Amazon Web Services account.
 */
export const listWaitingWorkflowSteps: API.PaginatedOperationMethod<
  ListWaitingWorkflowStepsRequest,
  ListWaitingWorkflowStepsResponse,
  ListWaitingWorkflowStepsError,
  Credentials | HttpClient.HttpClient,
  WorkflowStepExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListWaitingWorkflowSteps",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListWorkflowBuildVersions",
    input: { workflowVersionArn: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListWorkflowExecutions",
    input: { maxResults: 0, nextToken: 0, imageBuildVersionArn: 0 },
    body: true,
  },
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
 * Lists workflow build versions based on filtering parameters.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListWorkflows",
    input: {
      owner: 0,
      filters: D.list(i_Filter),
      byName: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListWorkflowStepExecutions",
    input: { maxResults: 0, nextToken: 0, workflowExecutionId: 0 },
    body: true,
  },
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
 * Applies a policy to a component. We recommend that you call the RAM API CreateResourceShare to share resources. If you call the Image Builder API
 * `PutComponentPolicy`, you must also call the RAM API PromoteResourceShareCreatedFromPolicy in order for the resource to be
 * visible to all principals with whom the resource is shared.
 */
export const putComponentPolicy: API.OperationMethod<
  PutComponentPolicyRequest,
  PutComponentPolicyResponse,
  PutComponentPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /PutComponentPolicy",
    input: { componentArn: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
 * Applies a policy to a container image. We recommend that you call the RAM API
 * CreateResourceShare
 * (https://docs.aws.amazon.com//ram/latest/APIReference/API_CreateResourceShare.html) to share
 * resources. If you call the Image Builder API `PutContainerImagePolicy`, you must also
 * call the RAM API PromoteResourceShareCreatedFromPolicy
 * (https://docs.aws.amazon.com//ram/latest/APIReference/API_PromoteResourceShareCreatedFromPolicy.html)
 * in order for the resource to be visible to all principals with whom the resource is
 * shared.
 */
export const putContainerRecipePolicy: API.OperationMethod<
  PutContainerRecipePolicyRequest,
  PutContainerRecipePolicyResponse,
  PutContainerRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /PutContainerRecipePolicy",
    input: { containerRecipeArn: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
 * Applies a policy to an image. We recommend that you call the RAM API CreateResourceShare to share resources. If you call the Image Builder API
 * `PutImagePolicy`, you must also call the RAM API PromoteResourceShareCreatedFromPolicy in order for the resource to be
 * visible to all principals with whom the resource is shared.
 */
export const putImagePolicy: API.OperationMethod<
  PutImagePolicyRequest,
  PutImagePolicyResponse,
  PutImagePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /PutImagePolicy",
    input: { imageArn: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
 * Applies a policy to an image recipe. We recommend that you call the RAM API CreateResourceShare to share resources. If you call the Image Builder API
 * `PutImageRecipePolicy`, you must also call the RAM API PromoteResourceShareCreatedFromPolicy in order for the resource to be
 * visible to all principals with whom the resource is shared.
 */
export const putImageRecipePolicy: API.OperationMethod<
  PutImageRecipePolicyRequest,
  PutImageRecipePolicyResponse,
  PutImageRecipePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /PutImageRecipePolicy",
    input: { imageRecipeArn: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
 * RetryImage retries an image distribution without rebuilding the image.
 */
export const retryImage: API.OperationMethod<
  RetryImageRequest,
  RetryImageResponse,
  RetryImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /RetryImage",
    input: { imageBuildVersionArn: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
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
})) as any;

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
 * Pauses or resumes image creation when the associated workflow runs a
 * `WaitForAction` step.
 */
export const sendWorkflowStepAction: API.OperationMethod<
  SendWorkflowStepActionRequest,
  SendWorkflowStepActionResponse,
  SendWorkflowStepActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /SendWorkflowStepAction",
    input: {
      stepExecutionId: 0,
      imageBuildVersionArn: 0,
      action: 0,
      reason: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
 * Manually triggers a pipeline to create an image.
 */
export const startImagePipelineExecution: API.OperationMethod<
  StartImagePipelineExecutionRequest,
  StartImagePipelineExecutionResponse,
  StartImagePipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /StartImagePipelineExecution",
    input: {
      imagePipelineArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
 * Begin asynchronous resource state update for lifecycle changes to the
 * specified image resources.
 */
export const startResourceStateUpdate: API.OperationMethod<
  StartResourceStateUpdateRequest,
  StartResourceStateUpdateResponse,
  StartResourceStateUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /StartResourceStateUpdate",
    input: {
      resourceArn: 0,
      state: { status: 0 },
      executionRole: 0,
      includeResources: { amis: 0, snapshots: 0, containers: 0 },
      exclusionRules: { amis: i_LifecyclePolicyDetailExclusionRulesAmis },
      updateAt: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InvalidParameterException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
 * Updates a new distribution configuration. Distribution configurations define and
 * configure the outputs of your pipeline.
 */
export const updateDistributionConfiguration: API.OperationMethod<
  UpdateDistributionConfigurationRequest,
  UpdateDistributionConfigurationResponse,
  UpdateDistributionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /UpdateDistributionConfiguration",
    input: {
      distributionConfigurationArn: 0,
      description: 0,
      distributions: D.list(i_Distribution),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
 * Updates an image pipeline. Image pipelines enable you to automate the creation and
 * distribution of images. You must specify exactly one recipe for your image, using either
 * a `containerRecipeArn` or an `imageRecipeArn`.
 *
 * UpdateImagePipeline does not support selective updates for the pipeline. You must
 * specify all of the required properties in the update request, not just the
 * properties that have changed.
 */
export const updateImagePipeline: API.OperationMethod<
  UpdateImagePipelineRequest,
  UpdateImagePipelineResponse,
  UpdateImagePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /UpdateImagePipeline",
    input: {
      imagePipelineArn: 0,
      description: 0,
      imageRecipeArn: 0,
      containerRecipeArn: 0,
      infrastructureConfigurationArn: 0,
      distributionConfigurationArn: 0,
      imageTestsConfiguration: i_ImageTestsConfiguration,
      enhancedImageMetadataEnabled: 0,
      schedule: i_Schedule,
      status: 0,
      clientToken: D.m({ idempotency: true }),
      imageScanningConfiguration: i_ImageScanningConfiguration,
      workflows: D.list(i_WorkflowConfiguration),
      loggingConfiguration: i_PipelineLoggingConfiguration,
      executionRole: 0,
      imageTags: 0,
    },
    body: true,
  },
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
})) as any;

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
 * Updates a new infrastructure configuration. An infrastructure configuration defines
 * the environment in which your image will be built and tested.
 */
export const updateInfrastructureConfiguration: API.OperationMethod<
  UpdateInfrastructureConfigurationRequest,
  UpdateInfrastructureConfigurationResponse,
  UpdateInfrastructureConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /UpdateInfrastructureConfiguration",
    input: {
      infrastructureConfigurationArn: 0,
      description: 0,
      instanceTypes: 0,
      instanceProfileName: 0,
      securityGroupIds: 0,
      subnetId: 0,
      logging: i_Logging,
      keyPair: 0,
      terminateInstanceOnFailure: 0,
      snsTopicArn: 0,
      resourceTags: 0,
      instanceMetadataOptions: i_InstanceMetadataOptions,
      placement: i_Placement,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
 * Update the specified lifecycle policy.
 */
export const updateLifecyclePolicy: API.OperationMethod<
  UpdateLifecyclePolicyRequest,
  UpdateLifecyclePolicyResponse,
  UpdateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /UpdateLifecyclePolicy",
    input: {
      lifecyclePolicyArn: 0,
      description: 0,
      status: 0,
      executionRole: 0,
      resourceType: 0,
      policyDetails: D.list(i_LifecyclePolicyDetail),
      resourceSelection: i_LifecyclePolicyResourceSelection,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

const i_ComponentConfiguration: D.LazyStruct = () => ({
  componentArn: 0,
  parameters: D.list({ name: 0, value: 0 }),
});
const i_Distribution: D.LazyStruct = () => ({
  region: 0,
  amiDistributionConfiguration: {
    name: 0,
    description: 0,
    targetAccountIds: 0,
    amiTags: 0,
    kmsKeyId: 0,
    launchPermission: {
      userIds: 0,
      userGroups: 0,
      organizationArns: 0,
      organizationalUnitArns: 0,
    },
  },
  containerDistributionConfiguration: {
    description: 0,
    containerTags: 0,
    targetRepository: i_TargetContainerRepository,
  },
  licenseConfigurationArns: 0,
  launchTemplateConfigurations: D.list({
    launchTemplateId: 0,
    accountId: 0,
    setDefaultVersion: 0,
  }),
  s3ExportConfiguration: {
    roleName: 0,
    diskImageFormat: 0,
    s3Bucket: 0,
    s3Prefix: 0,
  },
  fastLaunchConfigurations: D.list({
    enabled: 0,
    snapshotConfiguration: { targetResourceCount: 0 },
    maxParallelLaunches: 0,
    launchTemplate: {
      launchTemplateId: 0,
      launchTemplateName: 0,
      launchTemplateVersion: 0,
    },
    accountId: 0,
  }),
  ssmParameterConfigurations: D.list({
    amiAccountId: 0,
    parameterName: 0,
    dataType: 0,
  }),
});
const i_Filter: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_ImageLoggingConfiguration: D.LazyStruct = () => ({ logGroupName: 0 });
const i_ImageScanningConfiguration: D.LazyStruct = () => ({
  imageScanningEnabled: 0,
  ecrConfiguration: { repositoryName: 0, containerTags: 0 },
});
const i_ImageTestsConfiguration: D.LazyStruct = () => ({
  imageTestsEnabled: 0,
  timeoutMinutes: 0,
});
const i_InstanceBlockDeviceMapping: D.LazyStruct = () => ({
  deviceName: 0,
  ebs: {
    encrypted: 0,
    deleteOnTermination: 0,
    iops: 0,
    kmsKeyId: 0,
    snapshotId: 0,
    volumeSize: 0,
    volumeType: 0,
    throughput: 0,
  },
  virtualName: 0,
  noDevice: 0,
});
const i_InstanceMetadataOptions: D.LazyStruct = () => ({
  httpTokens: 0,
  httpPutResponseHopLimit: 0,
});
const i_LifecyclePolicyDetail: D.LazyStruct = () => ({
  action: {
    type: 0,
    includeResources: { amis: 0, snapshots: 0, containers: 0 },
  },
  filter: { type: 0, value: 0, unit: 0, retainAtLeast: 0 },
  exclusionRules: {
    tagMap: 0,
    amis: i_LifecyclePolicyDetailExclusionRulesAmis,
  },
});
const i_LifecyclePolicyDetailExclusionRulesAmis: D.LazyStruct = () => ({
  isPublic: 0,
  regions: 0,
  sharedAccounts: 0,
  lastLaunched: { value: 0, unit: 0 },
  tagMap: 0,
});
const i_LifecyclePolicyResourceSelection: D.LazyStruct = () => ({
  recipes: D.list({ name: 0, semanticVersion: 0 }),
  tagMap: 0,
});
const i_Logging: D.LazyStruct = () => ({
  s3Logs: { s3BucketName: 0, s3KeyPrefix: 0 },
});
const i_PipelineLoggingConfiguration: D.LazyStruct = () => ({
  imageLogGroupName: 0,
  pipelineLogGroupName: 0,
});
const i_Placement: D.LazyStruct = () => ({
  availabilityZone: 0,
  tenancy: 0,
  hostId: 0,
  hostResourceGroupArn: 0,
});
const i_Schedule: D.LazyStruct = () => ({
  scheduleExpression: 0,
  timezone: 0,
  pipelineExecutionStartCondition: 0,
  autoDisablePolicy: { failureCount: 0 },
});
const i_TargetContainerRepository: D.LazyStruct = () => ({
  service: 0,
  repositoryName: 0,
});
const i_WorkflowConfiguration: D.LazyStruct = () => ({
  workflowArn: 0,
  parameters: D.list({ name: 0, value: 0 }),
  parallelGroup: 0,
  onFailure: 0,
});
const o_ImageSummary: D.LazyStruct = () => ({ deprecationTime: D.ts });
const o_LifecycleExecution: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
});
